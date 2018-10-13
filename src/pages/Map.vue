<template>
  <v-container fluid pa-2 fill-height>
    <v-layout wrap row>
      <v-flex :xl8="markerSelected" :xl12="!markerSelected"
              :lg8="markerSelected" :lg12="!markerSelected"
              :md12="!markerSelected" :md8="markerSelected"
              sm12 xs12 pa-2 fill-height class="map-transition">
        <GmapMap
          :center="mapConf.coordinates"
          :zoom="mapConf.zoom"
          style="width: 100%; height: 100%;">
          <GmapMarker
            :key="index"
            v-for="(el, index) in mapPointsList"
            :position="{ lat: parseFloat(el.latitude), lng: parseFloat(el.longitude) }"
            @click="markerClickHandler(el.id)"
          />
        </GmapMap>
      </v-flex>
      <transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutRight">
        <v-flex xl4 lg4 md4 sm12 xs12 pa-2 fill-height v-if="markerSelected">
        <v-card>
          <v-card-title primary class="title justify-center pb-2">{{selectedPoint.mapPoint.companyName}}</v-card-title>
          <div class="text-xs-center">
            <v-rating readonly v-model="starsRating" class="pb-1"></v-rating>
          </div>
          <v-card-text class="py-0">
            <div>{{selectedPoint.mapPoint.address}}</div>
            <div>{{selectedPoint.mapPoint.zipCode}} {{selectedPoint.mapPoint.city}}</div>
            <div>tel.: {{selectedPoint.mapPoint.phone}}</div>
            <div class="mt-2">
              <div>
                <span class="font-weight-bold">Średnia ocen: </span><span>{{selectedPoint.ratingCount}}</span>
              </div>
              <div>
                <span class="font-weight-bold">Opinie: </span><span>{{selectedPoint.averageRating}}</span>
              </div>
            </div>
            <div class="text-xs-center title">Opinie</div>
            <div class="mt-2">
              <v-card v-for="rating in selectedPoint.ratings.content" :key="rating.id" @click="" flat
                      class="rating">
                <v-card-title class="pa-0">
                  <div class="font-weight-medium">{{rating.header}}</div>
                </v-card-title>
                <v-card-text class="px-3 py-0 font-italic">{{rating.comment}}</v-card-text>
                <v-card-actions class="pa-0">
                  <div class="caption">
                    <span>dodano: 20.10.2018, przez: panczo12d</span>
                  </div>
                  <v-spacer/>
                  <v-btn small depressed @click="markerSelected = false">dyskusja</v-btn>
                </v-card-actions>
              </v-card>
              <v-container class="pa-0 py-2">
                <v-layout row wrap align-center>
                  <v-flex class="text-xs-center">
                    <v-pagination
                      class="pa-2"
                      v-model="actualRatingsPage"
                      :length="selectedPoint.ratings.totalPages"
                    ></v-pagination>
                  </v-flex>
                </v-layout>
              </v-container>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
      </transition>
    </v-layout>
  </v-container>
</template>

<script>
import swal from 'sweetalert2';
import endpoints from '@/api/endpoints';
import 'animate.css/animate.min.css';

export default {
  data() {
    return {
      markerSelected: false,
      mapConf: {
        zoom: 6,
        coordinates: {
          lat: 52.240889,
          lng: 19.427853,
        },
      },
      mapPointsList: [],
      selectedPoint: null,
      actualRatingsPage: 0,
    };
  },
  computed: {
    starsRating() {
      if (this.selectedPoint === null) return 0;
      return Math.round(this.selectedPoint.averageRating);
    },
  },
  methods: {
    fetchMapPoints() {
      this.$http.get(endpoints.MAP)
        .then((response) => {
          this.mapPointsList = response.data;
        })
        .catch((error) => {
          const code = error.response.status;
          let message = 'Wystąpił nieznany błąd.';
          if (code >= 500) {
            message = 'Wystąpił błąd serwera, skontaktuj się z administratorem.';
          }
          swal({
            type: 'error',
            title: 'Złe dane',
            text: message,
            timer: 5000,
          });
        });
    },
    markerClickHandler(id) {
      this.$http.get(`${endpoints.MAP}/${id}`)
        .then((response) => {
          this.markerSelected = true;
          this.selectedPoint = response.data;
        })
        .catch((error) => {
          const code = error.response.status;
          let message = 'Wystąpił nieznany błąd.';
          if (code >= 500) {
            message = 'Wystąpił błąd serwera, skontaktuj się z administratorem.';
          }
          swal({
            type: 'error',
            title: 'Złe dane',
            text: message,
            timer: 5000,
          });
        });
    },
  },
  mounted() {
    this.fetchMapPoints();
  },
};
</script>

<style scoped>
.map-transition {
  transition: all .4s;
}

</style>

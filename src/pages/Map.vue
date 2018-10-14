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
          class="map">
          <GmapMarker
            :key="index"
            v-for="(el, index) in mapPointsList"
            :position="{ lat: parseFloat(el.latitude), lng: parseFloat(el.longitude) }"
            @click="markerClickHandler(el.id)"
          />
        </GmapMap>
      </v-flex>
      <transition enter-active-class="animated bounceInRight">
        <v-flex xl4 lg4 md4 sm12 xs12 pa-2 fill-height v-if="markerSelected">
        <map-right-pane :selectedPoint="selectedPoint"
                        @ratingChanged="fetchMapPoint(selectedPoint.mapPoint.id)" />
      </v-flex>
      </transition>
    </v-layout>
  </v-container>
</template>

<script>
import swal from 'sweetalert2';
import 'animate.css/animate.min.css';
import endpoints from '@/api/endpoints';
import mapRightPane from '@/components/MapRightPane';

export default {
  components: {
    mapRightPane,
  },
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
    };
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
            title: 'Błąd',
            text: message,
            timer: 5000,
          });
        });
    },
    markerClickHandler(id) {
      if (this.markerSelected === true && this.selectedPoint.mapPoint.id === id) {
        this.markerSelected = false;
        return;
      }
      this.fetchMapPoint(id);
    },
    fetchMapPoint(id) {
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
            title: 'Błąd',
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
.map {
  width: 100%;
  height: 100%;
}
.map-transition {
  transition: all .4s;
}
</style>

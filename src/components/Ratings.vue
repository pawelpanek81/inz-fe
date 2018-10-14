<template>
  <div>
    <transition leave-active-class="animated bounceOutUp" enter-active-class="animated bounceInUp" mode="out-in">
      <v-card v-if="displayRatings">
        <v-card-title primary class="title justify-center pb-2">
          {{selectedPoint.mapPoint.companyName}}
        </v-card-title>
        <div class="text-xs-center">
          <v-rating readonly half-increments v-model="starsRating" class="pb-1"></v-rating>
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
          <v-btn class="pa-0 ma-0 mt-2" flat color="primary" @click="addNewRating">twoja opinia</v-btn>
          <div class="text-xs-center title">Opinie</div>
          <div class="mt-2">
            <v-card v-for="rating in ratings.content" :key="rating.id" @click="" flat>
              <v-card-title class="pa-0">
                <v-flex xl6 lg6 md6 sm6 xs4 class="wordWrap">
                  <div class="font-weight-medium">{{rating.header}}</div>
                </v-flex>
                <v-spacer />
                <v-rating
                  v-model="rating.rating"
                  background-color="primary lighten-3"
                  color="primary"
                  readonly
                  small
                ></v-rating>
              </v-card-title>
              <v-card-text class="px-3 py-0 font-italic wordWrap">{{rating.comment}}</v-card-text>
              <v-card-actions class="pa-0">
                <div class="caption">
                  <span>dodano: {{rating.addedAt.substring(0, 10)}}, przez: {{rating.addedBy}}</span>
                </div>
                <v-spacer/>
                <v-btn small flat @click="ratingCommentClickHandler(rating)">dyskusja</v-btn>
              </v-card-actions>
            </v-card>
            <v-container class="pa-0 py-2">
              <v-layout row wrap align-center>
                <v-flex class="text-xs-center">
                  <v-pagination
                    class="pa-2"
                    v-model="actualDisplayedPage"
                    :length="ratings.totalPages"
                  ></v-pagination>
                </v-flex>
              </v-layout>
            </v-container>
          </div>
        </v-card-text>
      </v-card>
      <comments-component v-if="!displayRatings" :mapPointId="selectedPoint.mapPoint.id" :rating="selectedRatingDiscuss"
                         @showRatingsAgain="displayRatings = true"/>
    </transition>
    <user-rating-component :displayNewRating="displayNewRating"
                        :mapPointId="selectedPoint.mapPoint.id"
                        @closeNewRatingDialog="displayNewRating = false"
                        @ratingChanged="handleRatingAdded"/>
  </div>
</template>

<script>
import endpoints from '@/api/endpoints';
import 'animate.css/animate.min.css';
import commentsComponent from '@/components/Comments';
import UserRatingComponent from '@/components/UserRating';
import swal from 'sweetalert2';

export default {
  props: ['selectedPoint'],
  components: {
    commentsComponent,
    UserRatingComponent,
  },
  data() {
    return {
      displayNewRating: false,
      selectedRatingDiscuss: null,
      ratings: [],
      displayRatings: true,
      actualDisplayedPage: 1,
    };
  },
  watch: {
    actualDisplayedPage(newRatingPage) {
      this.fetchRatings(this.selectedPoint.mapPoint.id, newRatingPage - 1);
    },
  },
  computed: {
    starsRating() {
      if (this.selectedPoint === null) return 0;
      return this.selectedPoint.averageRating;
    },
  },
  methods: {
    fetchRatings(mapPointId, ratingsPage) {
      this.$http.get(`${endpoints.MAP}/${mapPointId}/ratings?size=3&page=${ratingsPage}&sort=addedAt,id,desc`)
        .then((response) => {
          this.ratings = response.data;
          if (ratingsPage === 1 && this.ratings.content.length === 0) {
            this.actualDisplayedPage = 1;
            this.fetchMapPoint(mapPointId, 0);
          }
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
    ratingCommentClickHandler(rating) {
      this.selectedRatingDiscuss = rating;
      this.displayRatings = false;
    },
    addNewRating() {
      this.displayNewRating = true;
    },
    handleRatingAdded() {
      this.fetchRatings(this.selectedPoint.mapPoint.id, this.actualDisplayedPage - 1);
      this.$emit('ratingChanged');
    },
  },
  mounted() {
    this.fetchRatings(this.selectedPoint.mapPoint.id, this.actualDisplayedPage - 1);
  },
};
</script>

<style scoped>
.wordWrap {
  word-wrap: break-word;
}
</style>

<template>
  <div>
    <transition leave-active-class="animated bounceOutUp" enter-active-class="animated bounceInUp" mode="out-in">
      <v-card v-if="!showComments">
        <v-layout>
          <v-flex class="text-xs-center">
            <v-card-title primary class="title justify-center pb-2">
            {{selectedPoint.mapPoint.companyName}}
          </v-card-title>
            <div class="text-xs-center">
              <v-rating readonly v-model="starsRating" class="pb-1"></v-rating>
            </div>
          </v-flex>
          <v-flex class="text-xs-right">
            <v-btn flat fab  @click="emitHideRatings" class="mt-3 ml-3 mr-3 mb-2 ">
              <v-icon>chevron_right</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
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
          <v-btn class="pa-0 ma-0 mt-2" flat color="primary">dodaj opinie</v-btn>
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
                <v-btn small depressed @click="ratingCommentClickHandler(rating.id)">dyskusja</v-btn>
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
      <commentsComponent v-if="showComments" @showRatingsAgain="showComments = false"/>
    </transition>
  </div>
</template>

<script>
import 'animate.css/animate.min.css';
import commentsComponent from '@/components/Comments';

export default {
  props: ['selectedPoint'],
  components: {
    commentsComponent,
  },
  data() {
    return {
      showComments: false,
      actualRatingsPage: 0,
      ratingsPerPage: 3,
    };
  },
  computed: {
    starsRating() {
      if (this.selectedPoint === null) return 0;
      return Math.round(this.selectedPoint.averageRating);
    },
  },
  methods: {
    ratingCommentClickHandler(id) {
      this.showComments = true;
    },
    emitHideRatings() {
      this.$emit('hideRatings');
    },
  },
};
</script>

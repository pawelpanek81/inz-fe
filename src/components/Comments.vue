<template>
  <v-card>
    <v-btn flat @click="backToRatings" class="pl-1 mt-2">
      <v-icon>arrow_back_ios</v-icon>Wróć
    </v-btn>
    <v-card-title primary class="title justify-center pb-2">Dyskusja pod komentarzem</v-card-title>

      <v-card flat>
      <v-card-title class="">
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


    <v-card-text class="py-0">
      <div>lorem</div>
      <div>{{comments}}</div>
      <div>lorem</div>
      <div class="mt-2">
        <div>
          <span class="font-weight-bold">Średnia ocen: </span><span>lorem</span>
        </div>
        <div>
          <span class="font-weight-bold">Opinie: </span><span>lorem</span>
        </div>
      </div>
      <div class="text-xs-center title">Opinie</div>
      <!--<div class="mt-2">-->
        <!--<v-card v-for="rating in selectedPoint.ratings.content" :key="rating.id" @click="" flat-->
                <!--class="rating">-->
          <!--<v-card-title class="pa-0">-->
            <!--<div class="font-weight-medium">{{rating.header}}</div>-->
          <!--</v-card-title>-->
          <!--<v-card-text class="px-3 py-0 font-italic">{{rating.comment}}</v-card-text>-->
          <!--<v-card-actions class="pa-0">-->
            <!--<div class="caption">-->
              <!--<span>dodano: 20.10.2018, przez: panczo12d</span>-->
            <!--</div>-->
            <!--<v-spacer/>-->
            <!--<v-btn small depressed @click="ratingCommentClickHandler(rating.id)">dyskusja</v-btn>-->
          <!--</v-card-actions>-->
        <!--</v-card>-->
        <!--<v-container class="pa-0 py-2">-->
          <!--<v-layout row wrap align-center>-->
            <!--<v-flex class="text-xs-center">-->
              <!--<v-pagination-->
                <!--class="pa-2"-->
                <!--v-model="actualRatingsPage"-->
                <!--:length="selectedPoint.ratings.totalPages"-->
              <!--&gt;</v-pagination>-->
            <!--</v-flex>-->
          <!--</v-layout>-->
        <!--</v-container>-->
      <!--</div>-->
    </v-card-text>
  </v-card>
</template>

<script>
import endpoints from '@/api/endpoints';
import swal from 'sweetalert2';

export default {
  props: ['mapPointId', 'rating'],
  data() {
    return {
      comments: [],
    };
  },
  methods: {
    backToRatings() {
      this.$emit('showRatingsAgain');
    },
    fetchComments(mapPointId, ratingId) {
      this.$http.get(`${endpoints.MAP}/${mapPointId}/ratings/${ratingId}/comments`)
        .then((response) => {
          this.comments = response.data;
        })
        .catch(() => {
          swal({
            type: 'error',
            title: 'Złe dane',
            text: 'Wystąpił błąd serwera, skontaktuj się z administratorem.',
            timer: 5000,
          });
        });
    },
  },
  mounted() {
    this.fetchComments(this.mapPointId, this.rating.id);
  },
};
</script>

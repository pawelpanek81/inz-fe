<template>
  <v-card>
    <v-btn flat @click="backToRatings" class="pl-1 mt-2">
      <v-icon>arrow_back_ios</v-icon>Wróć
    </v-btn>
    <v-card-title primary class="title justify-center pb-2">lorem</v-card-title>
    <div class="text-xs-center">
      lorem
    </div>
    <v-card-text class="py-0">
      <div>lorem</div>
      <div>lorem</div>
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
  export default {
    methods: {
      backToRatings() {
        this.$emit('showRatingsAgain');
      },
    },
  };
</script>

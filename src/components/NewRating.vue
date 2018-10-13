<template>
  <div>
    <v-btn flat @click="backToRatings">
      <v-icon>keyboard_arrow_up</v-icon>Wróć
    </v-btn>
    <div class="title text-xs-center">Nowa opinia</div>
    <v-form class="pt-2">
      <div class="text-xs-center mt-5">
        <v-rating
          v-model="newRatingDTO.rating"
          color="red darken-3"
          background-color="grey darken-1"
          hover></v-rating>
      </div>
      <v-text-field
        v-model="newRatingDTO.header"
        v-validate="'required|min:2|max:36'"
        :counter="36"
        data-vv-name="header"
        data-vv-as="tytuł"
        :error-messages="errors.collect('header')"
        name="header"
        label="Tytuł opinii"
        prepend-icon="title"
      ></v-text-field>
      <v-textarea
        v-model="newRatingDTO.comment"
        v-validate="'required|min:10|max:600'"
        :counter="600"
        data-vv-name="comment"
        data-vv-as="komentarz"
        :error-messages="errors.collect('comment')"
        name="comment"
        label="Komentarz do opinii"
        prepend-icon="textsms">
      </v-textarea>

      <div class="text-xs-right">
        <v-btn color="primary" @click="validateForm">Dodaj</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import swal from 'sweetalert2';

export default {
  data() {
    return {
      newRatingDTO: {
        header: null,
        comment: null,
        rating: null,
      },
    };
  },
  methods: {
    backToRatings() {
      this.$emit('showRatingsAgain');
    },
    validateForm() {
      if (this.newRatingDTO.rating === null) {
        swal(
          'Błąd',
          'Uzupełnij ocenę naciskając odpowiednią gwiazdkę',
          'error',
        );
        return;
      }
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.addNewRating(this.newRatingDTO);
        }
      });
    },
    addNewRating(ratingDTO) {
    },
  },
};
</script>

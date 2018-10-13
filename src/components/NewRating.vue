<template>
  <v-card>
    <v-btn flat @click="backToRatings" class="pl-1 mt-2">
      <v-icon>arrow_back_ios</v-icon>Wróć
    </v-btn>
    <v-card-title class="title justify-center">
      Nowa opinia
    </v-card-title>
    <v-card-text>
      <v-form>
        <div class="text-xs-center mt-3">
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
    </v-card-text>
  </v-card>
</template>

<script>
import swal from 'sweetalert2';
import endpoints from '@/api/endpoints';

export default {
  props: ['mapPointId'],
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
      this.$http.post(`${endpoints.MAP}/${this.mapPointId}/ratings`, ratingDTO)
        .then(() => {
          swal({
            type: 'success',
            title: 'Dziękujemy',
            text: 'Twoja opinia została dodana',
            timer: 5000,
          });
          this.newRatingDTO = {
            header: null,
            comment: null,
            rating: null,
          };
          this.$validator.reset();
          this.backToRatings();
        })
        .catch(() => {
          swal({
            type: 'error',
            title: 'Błąd',
            text: 'Wystąpił błąd serwera, skontaktuj się z administratorem.',
            timer: 5000,
          });
        });
    },
  },
};
</script>

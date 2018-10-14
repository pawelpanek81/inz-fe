<template>
  <v-layout row justify-center>
    <v-dialog v-model="displayNewRating" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Nowa opinia</span>
        </v-card-title>
        <v-card-text>
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
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="emitCloseDialog">Close</v-btn>
          <v-btn color="primary" flat @click="validateForm">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import swal from 'sweetalert2';
import endpoints from '@/api/endpoints';

export default {
  props: ['displayNewRating', 'mapPointId'],
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
          this.emitCloseDialog();
          swal({
            type: 'success',
            title: 'Dziękujemy',
            text: 'Twoja opinia została dodana',
            timer: 5000,
          });
          this.clearDataAndValidator();
          this.backToRatings();
          this.$emit('addedRating');
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
    clearDataAndValidator() {
      this.newRatingDTO = {
        header: null,
        comment: null,
        rating: null,
      };
      this.$validator.reset();
    },
    emitCloseDialog() {
      this.clearDataAndValidator();
      this.$emit('closeNewRatingDialog');
    },
  },
};
</script>

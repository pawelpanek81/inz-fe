<template>
  <v-layout row justify-center >
    <v-dialog @keydown.esc="abortRatingChange" v-model="displayNewRating" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Nowa opinia</span>
        </v-card-title>
        <v-card-text>
            <div class="text-xs-center mt-3">
              <v-rating
                v-model="ratingDTO.rating"
                color="red darken-3"
                background-color="grey darken-1"
                hover
                @input="handleDataChanged"></v-rating>
            </div>
            <v-text-field
              v-model="ratingDTO.header"
              v-validate="'required|min:2|max:36'"
              :counter="36"
              data-vv-name="header"
              data-vv-as="tytuł"
              :error-messages="errors.collect('header')"
              name="header"
              label="Tytuł opinii"
              prepend-icon="title"
              @input="handleDataChanged"
            ></v-text-field>
            <v-textarea
              v-model="ratingDTO.comment"
              v-validate="'required|min:10|max:600'"
              :counter="600"
              data-vv-name="comment"
              data-vv-as="komentarz"
              :error-messages="errors.collect('comment')"
              name="comment"
              label="Komentarz do opinii"
              prepend-icon="textsms"
              @input="handleDataChanged">
            </v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" flat :disabled="!ratingEditMode" @click="removeRating">Usuń opinię</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="abortRatingChange">Odrzuć zmiany</v-btn>
          <v-btn color="primary" flat :disabled="!dataChanged" @click="validateForm">Zapisz</v-btn>
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
      ratingEditMode: false,
      dataChanged: false,
      ratingDTO: {
        id: null,
        header: null,
        comment: null,
        rating: null,
      },
    };
  },
  methods: {
    clearValidator() {
      this.$validator.reset();
    },
    abortRatingChange() {
      this.clearValidator();
      this.emitCloseDialog();
    },
    emitCloseDialog() {
      this.$emit('closeNewRatingDialog');
    },
    handleDataChanged() {
      this.dataChanged = true;
    },
    validateForm() {
      if (this.ratingDTO.rating === null) {
        swal(
          'Błąd',
          'Uzupełnij ocenę naciskając odpowiednią gwiazdkę',
          'error',
        );
        return;
      }
      this.$validator.validateAll().then((result) => {
        if (result) {
          if (this.ratingEditMode === true) {
            this.editRating(this.ratingDTO);
          } else {
            this.addNewRating(this.ratingDTO);
          }
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
          this.fetchRatingIfExists(this.mapPointId);
          this.clearValidator();
          this.ratingEditMode = true;
          this.dataChanged = false;
          this.$emit('ratingChanged');
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
    editRating(ratingDTO) {
      this.$http.put(`${endpoints.MAP}/${this.mapPointId}/ratings/${ratingDTO.id}`, ratingDTO)
        .then(() => {
          this.emitCloseDialog();
          swal({
            type: 'success',
            title: 'Dziękujemy',
            text: 'Twoja opinia została zaktualizowana',
            timer: 5000,
          });
          this.clearValidator();
          this.dataChanged = false;
          this.$emit('ratingChanged');
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
    removeRating() {
      swal({
        title: 'Czy na pewno chcesz usunąć?',
        text: 'Tej akcji nie można cofnąć',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Usuń',
      }).then((result) => {
        if (result.value) {
          this.$http.delete(`${endpoints.MAP}/${this.mapPointId}/ratings/${this.ratingDTO.id}`)
            .then(() => {
              this.emitCloseDialog();
              swal({
                type: 'success',
                title: 'Dziękujemy',
                text: 'Twoja opinia została usunięta',
                timer: 5000,
              });
              this.clearValidator();
              this.dataChanged = false;
              this.$emit('ratingChanged');
              this.ratingDTO = {
                id: null,
                header: null,
                comment: null,
                rating: null,
              };
              this.ratingEditMode = false;
            })
            .catch(() => {
              swal({
                type: 'error',
                title: 'Błąd',
                text: 'Wystąpił błąd serwera, skontaktuj się z administratorem.',
                timer: 5000,
              });
            });
        }
      });
    },
    fetchRatingIfExists(mapPointId) {
      this.$http.get(`${endpoints.MAP}/${mapPointId}/my-rating`)
        .then((response) => {
          this.ratingEditMode = true;
          this.ratingDTO = response.data;
        })
        .catch((error) => {
          const code = error.response.status;
          if (code !== 404) {
            swal({
              type: 'error',
              title: 'Błąd',
              text: 'Wystąpił błąd serwera, skontaktuj się z administratorem.',
              timer: 5000,
            });
          }
        });
    },
  },
  mounted() {
    this.fetchRatingIfExists(this.mapPointId);
  },
};
</script>

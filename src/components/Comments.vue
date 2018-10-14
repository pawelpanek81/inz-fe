<template>
  <div>
    <v-card>
      <v-btn flat @click="backToRatings" class="pl-1 mt-2">
        <v-icon>keyboard_arrow_up</v-icon>
        Wróć
      </v-btn>
      <v-card-text>
        <v-card flat>
          <v-card-title class="pa-0">
            <v-flex xl6 lg6 md6 sm6 xs4 class="wordWrap">
              <div class="font-weight-medium">{{rating.header}}</div>
            </v-flex>
            <v-spacer/>
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
            <span class="caption py-1">dodano: {{rating.addedAt.substring(0, 10)}}, przez: {{rating.addedBy}}</span>
          </v-card-actions>
        </v-card>
        <div class="text-xs-right">
          <v-btn small class="pa-0 ma-0" flat color="primary" @click="displayNewCommentDialog = true">dodaj komentarz</v-btn>
        </div>
        <div class="mt-2">
          <v-card v-for="comment in comments.content" :key="comment.id" flat>
            <v-card-text class="px-3 py-0 font-italic">
              &gt; {{comment.comment}}
            </v-card-text>
            <div class="caption">
              <span class="caption grey--text text--lighten-1">dodano: {{comment.addedAt.substring(0, 10)}}, przez: {{comment.addedBy}}</span>
            </div>
          </v-card>
          <v-container class="pa-0 py-2">
            <v-layout row wrap align-center>
              <v-flex class="text-xs-center">
                <v-pagination
                  class="pa-2"
                  v-model="actualDisplayedPage"
                  :length="comments.totalPages">
                </v-pagination>
              </v-flex>
            </v-layout>
          </v-container>
        </div>
      </v-card-text>
    </v-card>
    <v-layout row justify-center >
      <v-dialog @keydown.esc="resetValidatorAndCloseDialog" v-model="displayNewCommentDialog" persistent max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Nowy komentarz</span>
          </v-card-title>
          <v-card-text>
            <v-textarea
              v-model="newCommentDTO.comment"
              v-validate="'required|min:10|max:1000'"
              :counter="1000"
              data-vv-name="comment"
              data-vv-as="komentarz"
              :error-messages="errors.collect('comment')"
              name="comment"
              label="Komentarz"
              prepend-icon="textsms"
              @input="handleDataChanged">
            </v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" flat @click="resetValidatorAndCloseDialog">Anuluj</v-btn>
            <v-btn color="primary" flat :disabled="!dataChanged" @click="validateForm">Zapisz</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
import endpoints from '@/api/endpoints';
import swal from 'sweetalert2';

export default {
  props: ['mapPointId', 'rating'],
  data() {
    return {
      actualDisplayedPage: 1,
      comments: [],
      displayNewCommentDialog: false,
      newCommentDTO: {
        comment: null,
      },
      dataChanged: false,
    };
  },
  watch: {
    actualDisplayedPage(newCommentsPage) {
      this.fetchComments(this.mapPointId, this.rating.id, newCommentsPage - 1);
    },
  },
  methods: {
    backToRatings() {
      this.$emit('showRatingsAgain');
    },
    fetchComments(mapPointId, ratingId, fetchedPage) {
      this.$http.get(`${endpoints.MAP}/${mapPointId}/ratings/${ratingId}/comments?size=6&page=${fetchedPage}&sort=addedAt,id,desc`)
        .then((response) => {
          this.comments = response.data;
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
    addNewRating(commentDTO) {
      this.$http.post(`${endpoints.MAP}/${this.mapPointId}/ratings/${this.rating.id}/comments`, commentDTO)
        .then(() => {
          swal({
            type: 'success',
            title: 'Dziękujemy',
            text: 'Twój komentarz został dodany',
            timer: 5000,
          });
          this.resetValidatorAndCloseDialog();
          this.fetchComments(this.mapPointId, this.rating.id, this.actualCommentsPage - 1);
          this.dataChanged = false;
          this.newCommentDTO = {
            comment: null,
          };
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
    handleDataChanged() {
      this.dataChanged = true;
    },
    resetValidatorAndCloseDialog() {
      this.$validator.reset();
      this.displayNewCommentDialog = false;
    },
    validateForm() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.addNewRating(this.newCommentDTO);
        }
      });
    },
  },
  mounted() {
    this.fetchComments(this.mapPointId, this.rating.id, this.actualCommentsPage - 1);
  },
};
</script>

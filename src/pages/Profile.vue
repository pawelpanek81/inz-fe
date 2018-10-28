<template>
  <v-container fluid class="pa-2">
    <v-layout wrap>
      <v-flex xs12 sm6 class="pa-2">
        <v-card>
          <v-card-title primary-title>
            <span class="title">Twoje konto</span>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-layout wrap>
                <v-flex>
                  <v-text-field
                    disabled
                    v-model="user.name"
                    prepend-icon="face"
                    label="Imię">
                  </v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field
                    disabled
                    v-model="user.surname"
                    prepend-icon="perm_identity"
                    label="Nazwisko">
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-text-field
                disabled
                v-model="user.username"
                prepend-icon="account_circle"
                label="Nazwa użytkownika">
              </v-text-field>
              <v-text-field
                disabled
                v-model="user.email"
                prepend-icon="alternate_email"
                label="Email">
              </v-text-field>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 class="pa-2">
        <v-img height="300px" src="/static/eugene-mckenna-1088650-unsplash.jpg"></v-img>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import endpoints from '@/api/endpoints';
import swal from 'sweetalert2';

export default {
  data() {
    return {
      user: {
        name: '',
        surname: '',
        username: '',
        email: '',
      },
    };
  },
  methods: {
    fetchData() {
      this.$http.get(endpoints.USER_INFO)
        .then((response) => {
          this.user = response.data;
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
    this.fetchData();
  },
};
</script>

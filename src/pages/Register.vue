<template>
  <v-container fluid fill-height class="bg">
    <v-layout align-center justify-center>
      <v-flex xs12 sm10 md9 lg8 xl7>
        <v-card class="elevation-12 login-card">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Rejestracja</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-container grid-list-xl fluid class="pb-0">
              <v-layout wrap>
                <v-flex xs12 sm6 class="py-0">
                  <v-text-field
                  v-model="formData.name"
                  v-validate="'required|min:3|max:12'"
                  :counter="12"
                  data-vv-name="name"
                  data-vv-as="imię"
                  :error-messages="errors.collect('name')"
                  name="name" type="text" label="Imię" prepend-icon="person"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 class="py-0">
                  <v-text-field
                  v-model="formData.surname"
                  v-validate="'min:3|max:32'"
                  :counter="32"
                  name="surname" type="text" label="Nazwisko" prepend-icon="person"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 class="py-0">
                  <v-text-field
                  v-model="formData.username"
                  v-validate="'required|min:3|max:16'"
                  :counter="16"
                  data-vv-name="login"
                  data-vv-as="login"
                  :error-messages="errors.collect('login')"
                  name="login" type="text" label="Login" prepend-icon="people"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 class="py-0">
                  <v-text-field
                  v-model="formData.email"
                  v-validate="'required|email'"
                  data-vv-name="email"
                  data-vv-as="email"
                  :error-messages="errors.collect('email')"
                  name="email" type="text" label="Email" prepend-icon="alternate_email"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 class="py-0">
                  <v-text-field
                  id="password"
                  v-model="formData.password"
                  v-validate="'required|min:4'"
                  data-vv-name="password"
                  data-vv-as="hasło"
                  ref="password"
                  :error-messages="errors.collect('password')"
                  :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                  name="password" label="Hasło" prepend-icon="lock"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 class="py-0">
                  <v-text-field
                  v-model="repassword"
                  v-validate="'required|confirmed:password'"
                  data-vv-name="repassword"
                  data-vv-as="powtórz hasło"
                  :error-messages="errors.collect('repassword')"
                  :append-icon="showRepassword ? 'visibility_off' : 'visibility'"
                  :type="showRepassword ? 'text' : 'password'"
                  @click:append="showRepassword = !showRepassword"
                  name="repassword" label="Powtórz hasło" prepend-icon="lock"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 class="py-0">
                  <v-text-field
                  v-model="formData.city"
                  v-validate="'required'"
                  data-vv-name="city"
                  ref="cityAutocomplete"
                  data-vv-as="miasto"
                  :error-messages="errors.collect('city')"
                  name="city" type="text" label="Miejscowość" prepend-icon="location_city"></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 class="py-0">
                  <v-checkbox type="checkbox"
                  v-model="rulesChecked"
                  v-validate="'required:true'"
                  data-vv-name="rules"
                  data-vv-as="regulamin"
                  :error-messages="errors.collect('rules')">
                    <div slot="label">
                      Akceptuję
                      <v-tooltip bottom>
                        <a slot="activator" target="_blank" href="http://vuetifyjs.com" @click.stop>regulamin</a>
                        Otwiera regulamin w nowym oknie
                      </v-tooltip>
                    </div>
                  </v-checkbox>
                </v-flex>
              </v-layout>
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-layout column class="ml-2">
              <div>
                <span>Posiadasz już konto?</span>
                <v-btn to="login" small flat color="secondary" class="pa-0">Zaloguj się</v-btn>
              </div>
            </v-layout>
            <v-spacer></v-spacer>
            <v-btn @click="validateForm" color="primary" class="mr-2 mb-2">Rejestruj</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import swal from 'sweetalert2';

export default {
  mounted() {
    this.initCityAutocomplete();
  },
  created() {
    this.redirectIfUserLoggedIn();
  },
  data() {
    return {
      showPassword: false,
      showRepassword: false,
      rulesChecked: null,
      repassword: null,
      formData: {
        name: null,
        surname: null,
        username: null,
        email: null,
        password: null,
        city: null,
      },
    };
  },
  methods: {
    validateForm() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.register(this.formData);
        }
      });
    },
    register(formData) {
      this.$store.dispatch('register', formData)
        .then(() => {
          this.$router.push({ path: '/login' });
          swal({
            type: 'success',
            title: 'Sukces',
            text: 'Konto zostało założone, teraz możesz się zalogować',
            timer: 5000,
          });
        })
        .catch((error) => {
          const code = error.response.status;
          let message = 'Wystąpił nieznany błąd.';
          if (code === 409) {
            message = 'Login lub email zajęty.';
          } else if (code === 400) {
            message = 'Serwer nie przyjmuje podanych danych.';
          } else if (code >= 500) {
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
    redirectIfUserLoggedIn() {
      if (this.isUserLoggedIn) {
        this.$router.push({ path: '/' });
      }
    },
    initCityAutocomplete() {
      this.$gmapApiPromiseLazy().then(() => {
        const cityInput = this.$refs.cityAutocomplete.$refs.input;
        const options = {
          types: ['(regions)'],
        };
        // eslint-disable-next-line
        const autoComplete = new google.maps.places.Autocomplete(cityInput, options);
        cityInput.placeholder = '';

        autoComplete.addListener('place_changed', () => {
          const place = autoComplete.getPlace();
          const ac = place.address_components;
          const city = ac[0].short_name;
          this.formData.city = city;
        });
      });
    },
  },
  computed: {
    ...mapGetters([
      'isUserLoggedIn',
    ]),
  },
};
</script>


<style scoped>
.bg {
  background-image: url("/static/chuttersnap-299121-unsplash.jpg");
  background-repeat: no-repeat;
  background-attachment: scroll;
  background-position-y: 50%;
  background-size: cover;
  height: 100%;
}
.login-card {
  border-radius: 6px;
  opacity: 0.94;
}
</style>

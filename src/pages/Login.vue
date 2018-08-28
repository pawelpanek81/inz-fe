<template>
  <v-container fluid fill-height class="bg" v-on:keyup.enter="validateForm">
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4 lg3 xl2>
        <v-card class="elevation-12 login-card">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Logowanie</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field v-model="credential.username"
              v-validate="'required'"
              data-vv-name="login"
              data-vv-as="login"
              :error-messages="errors.collect('login')"
              prepend-icon="person" name="login" label="Login" type="text"></v-text-field>
              <v-text-field v-model="credential.password" 
              v-validate="'required'"
              data-vv-name="password"
              data-vv-as="hasło"
              :error-messages="errors.collect('password')"
              id="password" prepend-icon="lock" name="password" label="Hasło" type="password"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-layout column>
              <div><v-btn @click="forgotPassword" small flat color="secondary">Nie pamiętam hasła</v-btn></div>
              <div><v-btn to="register" small flat color="secondary">Zarejestruj się</v-btn></div>
            </v-layout>
            <v-spacer></v-spacer>
            <v-btn @click="validateForm" color="primary" class="mr-2">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import swal from 'sweetalert2';
import { mapGetters } from 'vuex';

export default {
  created() {
    this.redirectIfUserLoggedIn();
  },
  data() {
    return {
      credential: {
        username: null,
        password: null,
      },
    };
  },
  methods: {
    validateForm() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.login(this.credential);
        }
      });
    },
    login(credential) {
      this.$store.dispatch('login', credential)
        .then(() => {
          this.$router.push({ path: '/' });
          // this.toast('success', 'Zostales zalogowany');
          swal({
            type: 'success',
            title: 'Ok',
            text: 'Zostałeś zalogowany',
            timer: 2000,
            showConfirmButton: false,
            toast: true,
            position: 'top-end',
          });
        })
        .catch(() => {
          swal({
            type: 'error',
            title: 'Złe dane',
            text: 'Podane dane są błędne',
            timer: 3000,
          });
        });
    },
    forgotPassword() {
      // eslint-disable-next-line
      alert('trudno ¯\\_(ツ)_/¯');
    },
    redirectIfUserLoggedIn() {
      if (this.isUserLoggedIn) {
        this.$router.push({ path: '/' });
      }
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
  background-position: center;
  background-size: cover;
  height: 100%;
}
.login-card {
  border-radius: 6px;
  opacity: 0.94;
}
</style>

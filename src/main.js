// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vuetify from 'vuetify';
import VeeValidate, { Validator } from 'vee-validate';
import * as VueGoogleMaps from 'vue2-google-maps';
import pl from 'vee-validate/dist/locale/pl';
import 'vuetify/dist/vuetify.min.css';
import colors from 'vuetify/es5/util/colors';
import App from './App';
import router from './router';
import store from './store';
import apiConfig from './api/config';

Vue.use(Vuetify, {
  theme: {
    primary: colors.red.darken3,
    secondary: colors.red.lighten1,
    accent: colors.red.accent4,
  },
});
Validator.localize('pl', pl);
Vue.use(VeeValidate);
Vue.use(VueAxios, axios);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBL0B3DQeGfDD6kyjtlbNbeRJEHNt_9giA',
    libraries: 'places',
  },
});

Vue.config.productionTip = false;

axios.defaults.baseURL = apiConfig.BASE_URL;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
});

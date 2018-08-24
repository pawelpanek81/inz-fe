// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vuetify from 'vuetify';
import VeeValidate, { Validator } from 'vee-validate';
import pl from 'vee-validate/dist/locale/pl';
import 'vuetify/dist/vuetify.min.css';
import colors from 'vuetify/es5/util/colors';
import App from './App';
import router from './router';
import store from './store';

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

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
});

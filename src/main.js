// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuetify from 'vuetify';
import VeeValidate from 'vee-validate';
import 'vuetify/dist/vuetify.min.css';
import colors from 'vuetify/es5/util/colors'
import App from './App';
import router from './router';
import store from './store';

Vue.use(Vuetify, {
  theme: {
    primary: colors.red.darken3,
    secondary: colors.red.lighten1,
    accent: colors.red.accent4,
  }
});
Vue.use(VeeValidate);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
});

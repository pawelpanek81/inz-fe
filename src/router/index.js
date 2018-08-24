import Vue from 'vue';
import Router from 'vue-router';
import Navigation from './navigation';

Vue.use(Router);

export default new Router({
  routes: [
    Navigation.HELLOWORD,
    Navigation.MAP,
    Navigation.LOGIN,
    Navigation.REGISTER,
  ],
});

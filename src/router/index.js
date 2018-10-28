import Vue from 'vue';
import Router from 'vue-router';
import Navigation from './navigation';

Vue.use(Router);

export default new Router({
  routes: [
    Navigation.HELLOWORD,
    Navigation.PROFILE,
    Navigation.CAR_DETAILS,
    Navigation.ADD_CAR,
    Navigation.MAP,
    Navigation.ADD_MAP_POINT,
    Navigation.SERVICE,
    Navigation.EXAMINATION,
    Navigation.INSURANCE,
    Navigation.NOTIFICATIONS,
    Navigation.LOGIN,
    Navigation.REGISTER,
  ],
});

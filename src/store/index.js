import Vue from 'vue';
import Vuex from 'vuex';
import rootState from './state';
import rootGetters from './getters';
import rootMutations from './mutations';
import rootActions from './actions';
import userModule from './modules/user/index';
import notificationModule from './modules/notification/index';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: rootState,
  getters: rootGetters,
  mutations: rootMutations,
  actions: rootActions,
  modules: {
    userModule,
    notificationModule,
  },
});

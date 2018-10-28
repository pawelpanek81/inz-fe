import endpoints from '@/api/endpoints';
import Vue from 'vue';
import MT from './mutation-types';


export default {
  fetchUnreadNotifications({ commit }) {
    return Vue.axios.get(endpoints.UNREAD_NOTIFICATIONS)
      .then((response) => {
        commit(MT.SET_UNREAD_NOTIFICATIONS, response.data.notifications);
        commit(MT.SET_UNREAD_COUNT, response.data.count);
      })
      .catch(error => Promise.reject(error));
  },
  makeElementRead({ dispatch }, element) {
    if (element.read === false) {
      return Vue.axios.put(`${endpoints.NOTIFICATIONS}/${element.id}`, {
        read: 'true',
      }).then(() => {
        dispatch('fetchUnreadNotifications');
      });
    }
    return Promise.resolve();
  },
};

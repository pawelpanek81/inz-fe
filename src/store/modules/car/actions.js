import endpoints from '@/api/endpoints';
import Vue from 'vue';
import MT from './mutation-types';

export default {
  setSelectedCar({ commit }, carId) {
    return Vue.axios.get(`${endpoints.CARS}/${carId}`)
      .then((response) => {
        commit(MT.SET_SELECTED_CAR, response.data);
      })
      .catch(() => Promise.reject());
  },
  addNewCar({ dispatch }, dto) {
    return Vue.axios.post(endpoints.CARS, dto)
      .then((response) => {
        dispatch('setSelectedCar', response.data.id);
        dispatch('getAllCars');
      })
      .catch(() => Promise.reject());
  },
  getAllCars({ commit }) {
    return Vue.axios.get(endpoints.CARS)
      .then((response) => {
        commit(MT.SET_CARS, response.data);
      })
      .catch(() => Promise.reject());
  },
};

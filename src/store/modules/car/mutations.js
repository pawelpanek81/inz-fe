import MT from './mutation-types';

export default {
  [MT.SET_SELECTED_CAR](state, car) {
    state.selectedCar = car;
  },
  [MT.SET_CARS](state, cars) {
    state.cars = cars;
  },
};

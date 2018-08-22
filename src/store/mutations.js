import MT from './mutation-types';

export default {
  [MT.SET_DRAWER](state, newValue) {
    state.drawer = newValue;
  },
  [MT.SET_MINI_VARIANT](state, newValue) {
    state.miniVariant = newValue;
  },
  [MT.SET_TOOLBAR_TITLE](state, newValue) {
    state.toolbarTitle = newValue;
  },
};

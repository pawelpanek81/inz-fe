import MT from './mutation-types';

export default {
  setDrawer({ commit }, newValue) {
    commit(MT.SET_DRAWER, newValue);
  },
  setMiniVariant({ commit }, newValue) {
    commit(MT.SET_MINI_VARIANT, newValue);
  },
  setToolbarTitle({ commit }, newValue) {
    commit(MT.SET_TOOLBAR_TITLE, newValue);
  },
};

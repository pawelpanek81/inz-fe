import Vue from 'vue';
import jwtDecode from 'jwt-decode';
import endpoints from '@/api/endpoints';
import USER_MUTATION_TYPES from './mutation-types';

const LOCALSTORAGE_TOKEN = 'token';

export default {
  login({ dispatch }, credential) {
    return Vue.axios.post(endpoints.LOGIN, credential)
      .then((response) => {
        const rawToken = response.headers.authorization;
        localStorage.setItem(LOCALSTORAGE_TOKEN, rawToken);
        dispatch('authorizeWithToken', rawToken);
        dispatch('fetchUnreadNotifications');
      })
      .catch(error => Promise.reject(error));
  },
  authorizeWithToken({ commit }, token) {
    commit(USER_MUTATION_TYPES.SET_JWT_TOKEN, token);
    commit(USER_MUTATION_TYPES.SET_LOGGED, true);
    const decodedToken = jwtDecode(token);
    commit(USER_MUTATION_TYPES.SET_JWT_SUB, decodedToken.sub);
    commit(USER_MUTATION_TYPES.SET_JWT_AUTHORITIES, decodedToken.authorities);
    commit(USER_MUTATION_TYPES.SET_JWT_EXP, decodedToken.exp);
  },
  logout({ commit }) {
    localStorage.removeItem(LOCALSTORAGE_TOKEN);
    commit(USER_MUTATION_TYPES.SET_JWT_TOKEN, null);
    commit(USER_MUTATION_TYPES.SET_LOGGED, false);
    commit(USER_MUTATION_TYPES.SET_JWT_SUB, null);
    commit(USER_MUTATION_TYPES.SET_JWT_AUTHORITIES, []);
    commit(USER_MUTATION_TYPES.SET_JWT_EXP, null);
  },
  restoreUserCredentialsIfLogged({ dispatch }) {
    const token = localStorage.getItem(LOCALSTORAGE_TOKEN);
    if (token !== null) {
      dispatch('authorizeWithToken', token);
    }
    return Promise.resolve();
  },
  // eslint-disable-next-line
  register({}, registrationData) {
    return Vue.axios.post(endpoints.REGISTER, registrationData)
      .catch(error => Promise.reject(error));
  },
};

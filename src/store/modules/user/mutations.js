import MT from './mutation-types';

export default {
  [MT.SET_LOGGED](state, logged) {
    state.isUserLoggedIn = logged;
  },
  [MT.SET_JWT_TOKEN](state, rawToken) {
    state.jwtData.rawToken = rawToken;
  },
  [MT.SET_JWT_SUB](state, sub) {
    state.jwtData.sub = sub;
  },
  [MT.SET_JWT_AUTHORITIES](state, authList) {
    state.jwtData.authorities = authList;
  },
  [MT.SET_JWT_EXP](state, exp) {
    state.jwtData.exp = exp;
  },
};

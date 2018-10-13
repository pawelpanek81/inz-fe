export default {
  isUserLoggedIn: state => state.isUserLoggedIn,
  getRawToken: state => state.jwtData.rawToken,
};

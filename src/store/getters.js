export default {
  // toolbar
  toolbarTitle: state => state.toolbarTitle,
  toolbarVisible: state => state.toolbarVisible,

  // navigation drawer
  clipped: state => state.clipped,
  drawer: state => state.drawer,
  miniVariant: state => state.miniVariant,
  fixed: state => state.fixed,

  // authentication and authorization
  isUserLoggedIn: state => state.isUserLoggedIn,
};

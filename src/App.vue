<template>
  <v-app>
    <app-navigation-draver />
    <app-toolbar />
    <v-content>
      <v-slide-y-transition mode="out-in">
        <router-view/>
      </v-slide-y-transition>
    </v-content>
    <app-footer />
  </v-app>
</template>

<script>
import navigationDraver from '@/components/NavigationDraver';
import toolbar from '@/components/Toolbar';
import footer from '@/components/Footer';
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    appNavigationDraver: navigationDraver,
    appToolbar: toolbar,
    appFooter: footer,
  },
  watch: {
    $route(to) {
      this.redirectIfNotLogged(to.path);
    },
  },
  methods: {
    redirectIfNotLogged(nextRoute) {
      if (!this.isUserLoggedIn && !(['/login', '/register'].includes(nextRoute))) {
        this.$router.push({ path: '/login' });
      }
    },
  },
  computed: {
    ...mapGetters([
      'isUserLoggedIn',
    ]),
  },
  created() {
    this.$store.dispatch('restoreUserCredentialsIfLogged')
      .then(() => {
        const initRoute = this.$route.path;
        this.redirectIfNotLogged(initRoute);
      });
  },
  mounted() {
    if (this.isUserLoggedIn) {
      this.$store.dispatch('fetchUnreadNotifications');
      this.$store.dispatch('getAllCars');
    }
    setInterval(() => {
      if (this.isUserLoggedIn) {
        this.$store.dispatch('fetchUnreadNotifications');
      }
    }, 10000);
  },
};
</script>

<style>
body {
  font-family: Roboto,sans-serif;
}
</style>

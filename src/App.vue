<template>
  <v-app>
    <app-navigation-draver />
    <app-toolbar />
    <v-content>
      <router-view/>
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
    $route (to, form) {
      this.redirectIfNotLogged(to.path);
    }
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
    ])
  },
  created() {
    this.$store.dispatch('restoreUserCredentialsIfLogged')
      .then(() => {
        const initRoute = this.$route.path;
        this.redirectIfNotLogged(initRoute);
      });
  },
};
</script>

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

export default {
  name: 'App',
  components: {
    appNavigationDraver: navigationDraver,
    appToolbar: toolbar,
    appFooter: footer,
  },
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

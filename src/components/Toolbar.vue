<template>
  <v-toolbar
      v-if="isUserLoggedIn"
      app
      :clipped-left="clipped">
      <v-btn v-if="!isMobile" icon @click.stop="changeMiniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-toolbar-side-icon @click.stop="changeDrawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <v-btn style="box-shadow: none;"
          slot="activator"
          :icon="isMobile">
          <span v-if="!isMobile">5 powiadomień</span>
          <v-icon :right="!isMobile">notifications</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile
            v-for="(notification, index) in notifications"
            :key="index"
            @click=""
          >
            <v-list-tile-title>{{ notification.text }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-menu offset-y>
        <v-btn
        icon
        slot="activator">
          <v-icon>account_circle</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile>
            <v-list-tile-title>Profil</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="logout">
            <v-list-tile-title>Wyloguj</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
</template>

<script>
import { mapGetters } from 'vuex';
import swal from 'sweetalert2';

export default {
  data() {
    return {
      notifications: [{
        text: 'Powiadomienie 1',
      }, {
        text: 'Powiadomienie 2',
      }, {
        text: 'Powiadomienie 3',
      }, {
        text: 'Powiadomienie 4',
      }, {
        text: 'Powiadomienie 5',
      },
      ],
    };
  },
  methods: {
    changeMiniVariant() {
      this.$store.dispatch('setMiniVariant', !this.miniVariant);
    },
    changeDrawer() {
      this.$store.dispatch('setDrawer', !this.drawer);
    },
    logout() {
      this.$store.dispatch('logout');
      swal({
        type: 'success',
            title: 'Ok',
            text: 'Zostałeś wylogowany',
            timer: 2000,
            showConfirmButton: false,
            toast: true,
            position: 'top-end',
          });
      this.$router.push({ path: '/login' });
    },
  },
  computed: {
    ...mapGetters([
      'clipped',
      'drawer',
      'miniVariant',
      'isUserLoggedIn',
    ]),
    ...mapGetters({
      title: 'toolbarTitle',
    }),
    isMobile() {
      return this.$vuetify.breakpoint.xsOnly;
    },
  },
};
</script>

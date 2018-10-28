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
        <span v-if="!isMobile">{{newNotificationsCount === 0 ? 'Brak': newNotificationsCount}} powiadomień</span>
        <v-icon :right="!isMobile">notifications</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile
          v-for="(notification, index) in notifications"
          :key="index"
          @click="notificationClickHandler(notification)">
          <v-icon class="pr-2">info</v-icon>
          {{ notification.header }}
          <v-spacer/>
          <v-btn v-if="!isMobile" small flat color="primary">odczytaj</v-btn>
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
        <v-list-tile @click="profileClickHandler">
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
    profileClickHandler() {
      this.$store.dispatch('setToolbarTitle', 'Profil');
      this.$router.push({ path: '/profile' });
    },
    notificationClickHandler(notification) {
      this.$store.dispatch('makeElementRead', notification)
        .catch((error) => {
          const code = error.response.status;
          let message = 'Wystąpił nieznany błąd.';
          if (code >= 500) {
            message = 'Wystąpił błąd serwera, skontaktuj się z administratorem.';
          }
          swal({
            type: 'error',
            title: 'Błąd',
            text: message,
            timer: 5000,
          });
        });
    },
    fetchUnreadNotifications() {
      this.$store.dispatch('fetchUnreadNotifications')
        .catch((error) => {
          const code = error.response.status;
          let message = 'Wystąpił nieznany błąd.';
          if (code >= 500) {
            message = 'Wystąpił błąd serwera, skontaktuj się z administratorem.';
          }
          swal({
            type: 'error',
            title: 'Błąd',
            text: message,
            timer: 5000,
          });
        });
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
      notifications: 'getUnreadNotifications',
      newNotificationsCount: 'getUnreadCount',
    }),
    isMobile() {
      return this.$vuetify.breakpoint.xsOnly;
    },
  },
  mounted() {
    setInterval(() => this.fetchUnreadNotifications(), 10000);
  },
};
</script>

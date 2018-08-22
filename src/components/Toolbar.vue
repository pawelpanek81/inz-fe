<template>
  <v-toolbar
      app
      :clipped-left="clipped">
      <v-btn icon @click.stop="changeMiniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-toolbar-side-icon @click.stop="changeDrawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <v-btn style="box-shadow: none;"
          slot="activator">
          5 powiadomień
          <v-icon right>notifications</v-icon>
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

export default {
  data() {
    return {
      title: 'Vuetify.js',
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
      // alert('13');
    },
  },
  computed: {
    ...mapGetters([
      'clipped',
      'drawer',
      'miniVariant',
    ]),
  },
};
</script>

<template>
  <v-navigation-drawer
      persistent
      :mini-variant="miniVariant && !this.isMobile"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
      v-if="isUserLoggedIn">
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
          @click="navigationItemChanged(item)"
          :to="item.route"
          >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" v-if="item.type !== 'combobox'"></v-list-tile-title>
            <v-combobox
              v-else
              v-model="selectedCar"
              :items="cars"
              item-text="text"
              label="Wybierz auto"
              @change="carSelectedChange"
            ></v-combobox>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      items: [
        {
          icon: 'bubble_chart',
          title: 'Profil',
          route: '/profile',
        },
        {
          icon: 'directions_car',
          type: 'combobox',
        },
        // {
        //   icon: 'insert_chart_outlined',
        //   title: 'Kokpit',
        //   route: '/dashboard',
        // },
        // {
        //   icon: 'opacity',
        //   title: 'Tankowanie',
        //   route: '/fuel',
        // },
        {
          icon: 'map',
          title: 'Mapa',
          route: '/map',
        },
        {
          icon: 'build',
          title: 'Książka serwisowa',
          route: '/service',
        },
        // {
        //   icon: 'attach_money',
        //   title: 'Inne wydatki',
        //   route: '/expense',
        // },
        // {
        //   icon: 'description',
        //   title: 'Raport',
        //   route: '/report',
        // },
        // {
        //   icon: 'calendar_today',
        //   title: 'Kalendarz',
        //   route: '/calendar',
        // },
        {
          icon: 'settings_input_hdmi',
          title: 'Przegląd rejestracyjny',
          route: '/inspection',
        },
        {
          icon: 'verified_user',
          title: 'Ubezpieczenie',
          route: '/insurance',
        },
        {
          icon: 'notifications',
          title: 'Powiadomienia',
          route: '/notifications',
        },
        // {
        //   icon: 'settings',
        //   title: 'Ustawienia',
        //   route: '/settings',
        // },
      ],
      cars: [
        {
          text: 'Mercedes 190E',
        },
        {
          text: 'Dodaj nowe',
        },
      ],
      selectedCar: null,
    };
  },
  methods: {
    navigationItemChanged(item) {
      if (item.title !== undefined) {
        this.$store.dispatch('setToolbarTitle', item.title);
      }

      // if (item.title === 'Zaloguj') {
      //   this.$store.dispatch('setDrawer', false);
      //   this.$store.dispatch('setToolbarVisible', false);
      // } else {
      //   this.$store.dispatch('setDrawer', null);
      //   this.$store.dispatch('setToolbarVisible', true);
      // }
    },
    carSelectedChange() {
      // console.log(this.selectedCar.text);
    },

  },
  computed: {
    drawer: {
      get() {
        return this.$store.getters.drawer;
      },
      set(val) {
        if (val !== this.drawer) {
          this.$store.dispatch('setDrawer', val);
        }
      },
    },
    isMobile() {
      return this.$vuetify.breakpoint.xsOnly;
    },
    ...mapGetters([
      'clipped',
      'miniVariant',
      'fixed',
      'loginPageActive',
      'registerPageActive',
      'isUserLoggedIn',
    ]),
  },
};
</script>

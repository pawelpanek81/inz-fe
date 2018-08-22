<template>
  <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app>
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
          :to="item.route">
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
        {
          icon: 'lock_open',
          title: 'Zaloguj',
          route: '/login',
        },
        {
          icon: 'fiber_new',
          title: 'Rejestracja',
          route: '/register',
        },
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
    carSelectedChange() {
      // console.log(this.selectedCar.text);
    },
  },
  computed: {
    drawer: {
      get() {
        return this.$store.getters.drawer;
      },
      set(newValue) {
        this.$store.dispatch('setDrawer', newValue);
      },
    },
    ...mapGetters([
      'clipped',
      'miniVariant',
      'fixed',
    ]),
  },
};
</script>

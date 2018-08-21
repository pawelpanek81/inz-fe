<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
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
    <v-toolbar
      app
      :clipped-left="clipped"
    >
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <v-btn icon
          slot="activator">
          <v-icon>notifications</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile
            v-for="(item, index) in items"
            :key="index"
            @click=""
          >
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-btn icon>
        <v-icon>account_circle</v-icon>
      </v-btn>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile @click="right = !right">
          <v-list-tile-action>
            <v-icon>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Profil',
        route: '/profile',
      }, {
        icon: 'directions_car',
        type: 'combobox',
      }, {
        icon: 'show_chart',
        title: 'Kokpit',
        route: '/dashboard',
      }, {
        icon: 'opacity',
        title: 'Tankowanie',
        route: '/fuel',
      }, {
        icon: 'map',
        title: 'Mapa',
        route: '/map',
      }, {
        icon: 'build',
        title: 'Serwis',
        route: '/service',
      }, {
        icon: 'description',
        title: 'Raport',
        route: '/report',
      }, {
        icon: 'calendar_today',
        title: 'Kalendarz',
        route: '/calendar',
      }, {
        icon: 'notifications',
        title: 'Powiadomienia',
        route: '/notifications',
      }, {
        icon: 'settings',
        title: 'Ustawienia',
        route: '/settings',
      }, {
        icon: 'lock_open',
        title: 'Zaloguj',
        route: '/login',
      }, {
        icon: 'fiber_new',
        title: 'Rejestracja',
        route: '/register',
      }],
      selectedCar: null,
      cars: [{
        text: 'Mercedes',
      }, {
        text: 'Dodaj nowe',
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    };
  },
  methods: {
    carSelectedChange() {
      console.log(this.selectedCar.text);
    },

  },
  name: 'App',
};
</script>

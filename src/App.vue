<template>
  <v-app>
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
    <v-toolbar
      app
      :clipped-left="clipped">
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
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
    <v-content>
      <router-view/>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span class="ml-2">&copy; 2018 Paweł Panek</span>
      <v-spacer></v-spacer>
      wersja: v1.0
      <v-spacer></v-spacer>
      <v-btn small style="box-shadow: none;">
        Zgłoś błąd
        <v-icon>bug_report</v-icon>
      </v-btn>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      title: 'Vuetify.js',
      clipped: false,
      drawer: true,
      fixed: false,
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
      selectedCar: null,
      cars: [
        {
          text: 'Mercedes 190E',
        },
        {
          text: 'Dodaj nowe',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      notifications: [
        {
          text: 'Powiadomienie 1',
        },
        {
          text: 'Powiadomienie 2',
        },
        {
          text: 'Powiadomienie 3',
        },
        {
          text: 'Powiadomienie 4',
        },
        {
          text: 'Powiadomienie 5',
        },
      ],
    };
  },
  methods: {
    carSelectedChange() {
      // console.log(this.selectedCar.text);
    },
    logout() {
      // alert('13');
    },
  },
  name: 'App',
};
</script>

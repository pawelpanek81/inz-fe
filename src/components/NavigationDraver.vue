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
        <v-list-tile value="true" @click="navigationItemChanged('Profil')" to="/profile">
          <v-list-tile-action><v-icon>bubble_chart</v-icon></v-list-tile-action>
          <v-list-tile-content><v-list-tile-title>Profil</v-list-tile-title></v-list-tile-content>
        </v-list-tile>

        <v-list-tile value="true" @click="navigationItemChanged()" to="">
          <v-list-tile-action><v-icon>directions_car</v-icon></v-list-tile-action>
          <v-list-tile-content>
            <v-select
              v-model="selectedCar"
              :items="cars"
              item-text="text"
              label="Wybierz auto"
              @change="carSelectedChange">
            </v-select>
          </v-list-tile-content>
        </v-list-tile>

        <!--<v-list-tile value="true" @click="navigationItemChanged('Kokpit')" to="/dashboard">-->
          <!--<v-list-tile-action><v-icon>insert_chart_outlined</v-icon></v-list-tile-action>-->
          <!--<v-list-tile-content><v-list-tile-title>Kokpit</v-list-tile-title></v-list-tile-content>-->
        <!--</v-list-tile>-->

        <!--<v-list-tile value="true" @click="navigationItemChanged('Tankowanie')" to="/fuel">-->
          <!--<v-list-tile-action><v-icon>opacity</v-icon></v-list-tile-action>-->
          <!--<v-list-tile-content><v-list-tile-title>Tankowanie</v-list-tile-title></v-list-tile-content>-->
        <!--</v-list-tile>-->

        <v-list-tile value="true" @click="navigationItemChanged('Mapa')" to="/map">
          <v-list-tile-action><v-icon>map</v-icon></v-list-tile-action>
          <v-list-tile-content><v-list-tile-title>Mapa</v-list-tile-title></v-list-tile-content>
        </v-list-tile>

        <v-list-tile value="true" @click="navigationItemChanged('Dodaj nowy punkt')" to="/add-map-point">
          <v-list-tile-action><v-icon>add_circle</v-icon></v-list-tile-action>
          <v-list-tile-content><v-list-tile-title>Dodaj punkt na mapie</v-list-tile-title></v-list-tile-content>
        </v-list-tile>

        <v-list-tile value="true" @click="navigationItemChanged('Książka serwisowa')" to="/service">
          <v-list-tile-action><v-icon>build</v-icon></v-list-tile-action>
          <v-list-tile-content><v-list-tile-title>Książka serwisowa</v-list-tile-title></v-list-tile-content>
        </v-list-tile>

        <!--<v-list-tile value="true" @click="navigationItemChanged('Inne wydatki')" to="/expense">-->
          <!--<v-list-tile-action><v-icon>attach_money</v-icon></v-list-tile-action>-->
          <!--<v-list-tile-content><v-list-tile-title>Inne wydatki</v-list-tile-title></v-list-tile-content>-->
        <!--</v-list-tile>-->

        <!--<v-list-tile value="true" @click="navigationItemChanged('Raport')" to="/report">-->
          <!--<v-list-tile-action><v-icon>description</v-icon></v-list-tile-action>-->
          <!--<v-list-tile-content><v-list-tile-title>Raport</v-list-tile-title></v-list-tile-content>-->
        <!--</v-list-tile>-->

        <!--<v-list-tile value="true" @click="navigationItemChanged('Kalendarz')" to="/calendar">-->
          <!--<v-list-tile-action><v-icon>calendar_today</v-icon></v-list-tile-action>-->
          <!--<v-list-tile-content><v-list-tile-title>Kalendarz</v-list-tile-title></v-list-tile-content>-->
        <!--</v-list-tile>-->

        <v-list-tile value="true" @click="navigationItemChanged('Przegląd rejestracyjny')" to="/examination">
          <v-list-tile-action><v-icon>settings_input_hdmi</v-icon></v-list-tile-action>
          <v-list-tile-content><v-list-tile-title>Przegląd rejestracyjny</v-list-tile-title></v-list-tile-content>
        </v-list-tile>

        <v-list-tile value="true" @click="navigationItemChanged('Ubezpieczenie')" to="/insurance">
          <v-list-tile-action><v-icon>verified_user</v-icon></v-list-tile-action>
          <v-list-tile-content><v-list-tile-title>Ubezpieczenie</v-list-tile-title></v-list-tile-content>
        </v-list-tile>

        <v-list-tile value="true" @click="navigationItemChanged('Powiadomienia')" to="/notifications">
          <v-list-tile-action><v-icon>notifications</v-icon></v-list-tile-action>
          <v-list-tile-content><v-list-tile-title>Powiadomienia</v-list-tile-title></v-list-tile-content>
        </v-list-tile>

        <!--<v-list-tile value="true" @click="navigationItemChanged('Ustawienia')" to="/settings">-->
          <!--<v-list-tile-action><v-icon>settings</v-icon></v-list-tile-action>-->
          <!--<v-list-tile-content><v-list-tile-title>Ustawienia</v-list-tile-title></v-list-tile-content>-->
        <!--</v-list-tile>-->
      </v-list>
    </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
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
    navigationItemChanged(title) {
      if (title !== undefined) {
        this.$store.dispatch('setToolbarTitle', title);
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
      console.log(this.selectedCar);
      if (this.selectedCar === 'Dodaj nowe') {
        this.navigationItemChanged('Dodaj nowe auto');
        this.$router.push('/add-car');
      } else {
        this.$router.push('/car');
      }
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
      'isUserLoggedIn',
    ]),
  },
};
</script>

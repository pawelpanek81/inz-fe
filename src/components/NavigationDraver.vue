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
              :item-text="getCarText"
              item-value="id"
              label="Wybierz auto"
              @change="carSelectedChange">
            </v-select>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile value="true" @click="navigationItemChanged('Dodaj nowe auto')" to="/add-car">
          <v-list-tile-action><v-icon>add_box</v-icon></v-list-tile-action>
          <v-list-tile-content><v-list-tile-title>Dodaj nowe auto</v-list-tile-title></v-list-tile-content>
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

        <v-list-tile value="true" @click="navigationItemChanged('Ubezpieczenie')" to="/insurance">
          <v-list-tile-action><v-icon>verified_user</v-icon></v-list-tile-action>
          <v-list-tile-content><v-list-tile-title>Ubezpieczenie</v-list-tile-title></v-list-tile-content>
        </v-list-tile>

        <v-list-tile value="true" @click="navigationItemChanged('Przegląd rejestracyjny')" to="/examination">
          <v-list-tile-action><v-icon>settings_input_hdmi</v-icon></v-list-tile-action>
          <v-list-tile-content><v-list-tile-title>Przegląd rejestracyjny</v-list-tile-title></v-list-tile-content>
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
import swal from 'sweetalert2';

export default {
  methods: {
    getCarText(car) {
      return `${car.brand} ${car.model}`;
    },
    navigationItemChanged(title) {
      if (title !== undefined) {
        this.$store.dispatch('setToolbarTitle', title);
      }
    },
    carSelectedChange(selectedCarId) {
      this.$store.dispatch('setSelectedCar', selectedCarId);
      this.navigationItemChanged('Szczegóły pojazdu');
      this.$router.push('/car');
      if (this.selectedCar == null || selectedCarId !== this.selectedCar.id) {
        swal({
          type: 'success',
          title: 'Wybrano',
          toast: true,
          position: 'top-right',
          text: 'Samochód został wybrany',
          timer: 2000,
          showConfirmButton: false,
        });
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
    selectedCar: {
      get() {
        return this.$store.getters.selectedCar;
      },
      set(val) {
        this.$store.dispatch('setSelectedCar', val);
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
      'cars',
    ]),
  },
};
</script>

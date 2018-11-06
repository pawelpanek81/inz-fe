<template>
  <v-container fluid class="pa-2">
    <v-layout>
      <v-flex class="pa-2">
        <v-card>
          <v-card-title primary-title class="pb-0">
            <span class="title">{{getCarText(selectedCarDTO)}}</span>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-layout wrap>
                <v-flex xs12 sm6 class="px-2">
                  <v-text-field
                    disabled
                    v-model="selectedCarDTO.brand"
                    prepend-icon="directions_car"
                    label="Marka">
                  </v-text-field>
                </v-flex>
                <v-flex xs12 sm6 class="px-2">
                  <v-text-field
                    disabled
                    v-model="selectedCarDTO.model"
                    prepend-icon="star"
                    label="Model">
                  </v-text-field>
                </v-flex>
                <v-flex xs12 sm6 class="px-2">
                  <v-text-field
                    disabled
                    v-model="fuelType"
                    prepend-icon="ev_station"
                    label="Rodzaj paliwa"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 class="px-2">
                  <v-text-field
                    disabled
                    v-model="selectedCarDTO.engineCapacity"
                    prepend-icon="opacity"
                    label="Pojemność silnika [cm³]">
                  </v-text-field>
                </v-flex>
                <v-flex xs12 sm6 class="px-2">
                  <v-text-field
                    disabled
                    v-model="selectedCarDTO.enginePowerInHP"
                    prepend-icon="trending_up"
                    label="Moc silnika [KM]">
                  </v-text-field>
                </v-flex>
                <v-flex xs12 sm6 class="px-2">
                  <v-text-field
                    disabled
                    v-model="selectedCarDTO.productionYear"
                    prepend-icon="calendar_today"
                    label="Rok produkcji">
                  </v-text-field>
                </v-flex>
                <v-flex xs12 sm6 class="px-2">
                  <v-text-field
                    disabled
                    prepend-icon="code"
                    v-model="selectedCarDTO.vin"
                    label="Numer VIN">
                  </v-text-field>
                </v-flex>
              </v-layout>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      fuelTypes: [
        {
          type: 'UNLEADED',
          name: 'Benzyna bezołowiowa',
        }, {
          type: 'UNLEADED_LPG',
          name: 'Benzyna + LPG',
        }, {
          type: 'UNLEADED_CNG',
          name: 'Benzyna + CNG',
        }, {
          type: 'DIESEL',
          name: 'Diesel',
        }, {
          type: 'HYBRID',
          name: 'Hybryda',
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      selectedCarDTO: 'selectedCar',
    }),
    fuelType: {
      get() {
        return this.fuelTypes
          .filter(ft => ft.type === this.selectedCarDTO.fuelType)
          .map(ft => ft.name)
          .pop();
      },
    },
  },
  methods: {
    getCarText(car) {
      return `${car.brand} ${car.model}`;
    },
  },
};
</script>

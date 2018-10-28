<template>
  <v-container fluid class="pa-2">
    <v-layout>
      <v-flex class="pa-2">
        <v-card>
          <v-card-title primary-title class="pb-0">
            <span class="title">Dane auta</span>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-layout wrap>
                <v-flex xs12 sm6 class="px-2">
                  <v-text-field
                    label="Marka">
                  </v-text-field>
                </v-flex>
                <v-flex xs12 sm6 class="px-2">
                  <v-text-field
                    label="Model">
                  </v-text-field>
                </v-flex>
                <v-flex xs12 sm6 class="px-2">
                  <v-select
                    :items="fuelTypes"
                    item-text="name"
                    item-value="type"
                    label="Rodzaj paliwa"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6 class="px-2">
                  <v-text-field
                    type="number"
                    mask="####"
                    label="Pojemność silnika [cm³]">
                  </v-text-field>
                </v-flex>
                <v-flex xs12 sm6 class="px-2">
                  <v-text-field
                    label="Moc silnika [KM]"
                    type="number"
                    mask="###">
                  </v-text-field>
                </v-flex>
                <v-flex xs12 sm6 class="px-2">
                  <v-text-field
                    type="number"
                    mask="####"
                    label="Rok produkcji">
                  </v-text-field>
                </v-flex>
                <v-flex xs12 sm6 class="px-2">
                  <v-text-field label="VIN">
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-flex class="text-xs-right">
                <v-btn
                  color="primary">
                  <v-icon left>send</v-icon>
                  Dodaj
                </v-btn>
              </v-flex>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
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
      formData: {
        brand: '',
        model: '',
        fuelType: '',
        engineCapacity: '',
        enginePowerInHP: '',
        productionYear: '',
        VIN: '',
      },
    };
  },
  methods: {},
  mounted() {

  },
};
</script>

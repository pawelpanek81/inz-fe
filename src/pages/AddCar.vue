<template>
  <v-container fluid class="pa-2">
    <v-layout>
      <v-flex class="pa-2">
        <v-card>
          <v-card-title primary-title class="pb-0">
            <span class="title">Wprowadź dane</span>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-layout wrap>
                <v-flex xs12 sm6 class="px-2">
                  <v-text-field
                    v-validate="'required'"
                    data-vv-name="brand"
                    data-vv-as="marka"
                    :error-messages="errors.collect('brand')"
                    v-model="formData.brand"
                    prepend-icon="directions_car"
                    label="Marka">
                  </v-text-field>
                </v-flex>
                <v-flex xs12 sm6 class="px-2">
                  <v-text-field
                    v-validate="'required'"
                    data-vv-name="model"
                    data-vv-as="model"
                    :error-messages="errors.collect('model')"
                    v-model="formData.model"
                    prepend-icon="star"
                    label="Model">
                  </v-text-field>
                </v-flex>
                <v-flex xs12 sm6 class="px-2">
                  <v-select
                    v-validate="'required'"
                    data-vv-name="fuelType"
                    data-vv-as="rodzaj paliwa"
                    :error-messages="errors.collect('fuelType')"
                    v-model="formData.fuelType"
                    :items="fuelTypes"
                    prepend-icon="ev_station"
                    item-text="name"
                    item-value="type"
                    label="Rodzaj paliwa"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6 class="px-2">
                  <v-text-field
                    v-validate="'required'"
                    data-vv-name="engineCapacity"
                    data-vv-as="pojemność silnika"
                    :error-messages="errors.collect('engineCapacity')"
                    v-model="formData.engineCapacity"
                    prepend-icon="opacity"
                    type="number"
                    mask="####"
                    label="Pojemność silnika [cm³]">
                  </v-text-field>
                </v-flex>
                <v-flex xs12 sm6 class="px-2">
                  <v-text-field
                    v-validate="'required'"
                    data-vv-name="enginePowerInHP"
                    data-vv-as="moc silnika"
                    :error-messages="errors.collect('enginePowerInHP')"
                    v-model="formData.enginePowerInHP"
                    prepend-icon="trending_up"
                    label="Moc silnika [KM]"
                    type="number"
                    mask="###">
                  </v-text-field>
                </v-flex>
                <v-flex xs12 sm6 class="px-2">
                  <v-text-field
                    v-validate="'required'"
                    data-vv-name="productionYear"
                    data-vv-as="rok produkcji"
                    :error-messages="errors.collect('productionYear')"
                    v-model="formData.productionYear"
                    prepend-icon="calendar_today"
                    type="number"
                    mask="####"
                    label="Rok produkcji">
                  </v-text-field>
                </v-flex>
                <v-flex xs12 sm6 class="px-2">
                  <v-text-field
                    v-validate="'required'"
                    data-vv-name="vin"
                    data-vv-as="vin"
                    :error-messages="errors.collect('vin')"
                    prepend-icon="code"
                    v-model="formData.vin"
                    label="Numer VIN">
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-flex class="text-xs-right">
                <v-btn
                  @click="validateForm"
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
import swal from 'sweetalert2';

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
        vin: '',
      },
    };
  },
  methods: {
    validateForm() {
      this.$validator.validateAll()
        .then((result) => {
          if (result) {
            this.$store.dispatch('addNewCar', this.formData);
            swal({
              type: 'success',
              title: 'Dziękujemy',
              text: 'Samochód został dodany i wybrany',
            });
            this.formData = {
              brand: '',
              model: '',
              fuelType: '',
              engineCapacity: '',
              enginePowerInHP: '',
              productionYear: '',
              vin: '',
            };
            this.$router.push('/car');
          }
        });
    },
  },
};
</script>

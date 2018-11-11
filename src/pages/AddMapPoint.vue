<template>
  <v-container fluid class="pa-2">
    <v-layout wrap>
      <v-flex xs12 sm6>
        <v-container class="pa-2">
          <v-card class="pa-0 ma-0">
            <v-card-text>
              <v-form>
                <v-layout wrap>
                  <v-flex xs12 sm12 class="py-0">
                    <v-text-field
                      v-validate="'required'"
                      data-vv-name="companyName"
                      data-vv-as="nazwa punktu"
                      :error-messages="errors.collect('companyName')"
                      prepend-icon="title"
                      v-model="addPointDTO.companyName"
                      label="Nazwa punktu"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 class="py-0">
                    <v-textarea
                      v-model="addPointDTO.info"
                      prepend-icon="more"
                      label="Informacje dodatkowe"
                    ></v-textarea>
                  </v-flex>
                  <v-flex xs12 sm12 md6 class="py-0">
                    <v-text-field
                      v-validate="'required'"
                      data-vv-name="address"
                      data-vv-as="adres"
                      :error-messages="errors.collect('address')"
                      v-model="addPointDTO.address"
                      label="Adres"
                      required
                      prepend-icon="add_location"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md6  class="py-0">
                    <v-text-field
                      v-validate="'required'"
                      data-vv-name="city"
                      data-vv-as="miasto"
                      :error-messages="errors.collect('city')"
                      v-model="addPointDTO.city"
                      label="Miasto"
                      required
                      prepend-icon="map"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md6 class="py-0">
                    <v-text-field
                      v-validate="'required'"
                      data-vv-name="zipCode"
                      data-vv-as="kod pocztowy"
                      :error-messages="errors.collect('zipCode')"
                      v-model="addPointDTO.zipCode"
                      label="Kod pocztowy"
                      required
                      prepend-icon="local_post_office"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md6 class="py-0">
                    <v-text-field
                      v-model="addPointDTO.www"
                      label="Strona internetowa"
                      prepend-icon="web"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md6 class="py-0">
                    <v-text-field
                      v-model="addPointDTO.phone"
                      label="Telefon"
                      prepend-icon="phone"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md6 class="py-0">
                    <v-select
                      :items="pointTypes"
                      item-text="description"
                      item-value="type"
                      v-validate="'required'"
                      data-vv-name="pointType"
                      data-vv-as="typ punktu"
                      :error-messages="errors.collect('pointType')"
                      v-model="addPointDTO.type"
                      label="Typ punktu"
                      required
                      prepend-icon="pin_drop"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm12 md6 class="py-0">
                    <v-text-field
                      v-validate="'required'"
                      data-vv-name="latitude"
                      data-vv-as="szerokość geograficzna"
                      :error-messages="errors.collect('latitude')"
                      v-model="addPointDTO.latitude"
                      label="Szerokośc geograficzna"
                      required
                      prepend-icon="my_location"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md6 class="py-0">
                    <v-text-field
                      v-validate="'required'"
                      data-vv-name="longitude"
                      data-vv-as="długość geograficzna"
                      :error-messages="errors.collect('longitude')"
                      v-model="addPointDTO.longitude"
                      label="Długość geograficzna"
                      required
                      prepend-icon="my_location"
                    ></v-text-field>
                  </v-flex>
                  <v-flex class="text-xs-right">
                    <v-btn @click="validateForm" color="primary" :loading="addPointLoading">
                      <v-icon left >add_circle</v-icon>
                      Dodaj punkt
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-card-text>
          </v-card>
        </v-container>
      </v-flex>
      <v-flex xs12 sm6>
        <v-container fill-height class="pa-2">
          <v-layout wrap>
            <v-flex>
              <GmapMap
                :center="mapConf.coordinates"
                :zoom="mapConf.zoom"
                class="map"
                :draggable="true"
                @click="mapClickHandler">
                <GmapMarker
                  v-if="addPointDTO.latitude !== '' && addPointDTO.longitude !== ''"
                  :position="{lat: parseFloat(addPointDTO.latitude), lng: parseFloat(addPointDTO.longitude)}"
                  :draggable="true"
                  @drag="pointDraggedHandler"/>
              </GmapMap>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import endpoints from '@/api/endpoints';
import swal from 'sweetalert2';

export default {
  data() {
    return {
      addPointLoading: false,
      pointTypes: [],
      mapConf: {
        zoom: 6,
        coordinates: {
          lat: 52.240889,
          lng: 19.427853,
        },
      },
      addPointDTO: {
        companyName: '',
        info: '',
        address: '',
        city: '',
        zipCode: '',
        www: '',
        phone: '',
        latitude: '',
        longitude: '',
        type: '',
      },
    };
  },
  methods: {
    validateForm() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.addPoint(this.addPointDTO);
        }
      });
    },
    mapClickHandler(event) {
      this.handlePointChangePos(event);
    },
    pointDraggedHandler(event) {
      this.handlePointChangePos(event);
    },
    handlePointChangePos(event) {
      this.addPointDTO.latitude = event.latLng.lat();
      this.addPointDTO.longitude = event.latLng.lng();
    },
    fetchMapPointTypes() {
      this.$http.get(endpoints.MAP_POINT_TYPES)
        .then((response) => {
          this.pointTypes = response.data;
        })
        .catch((error) => {
          const code = error.response.status;
          let message = 'Wystąpił nieznany błąd.';
          if (code >= 500) {
            message = 'Wystąpił błąd serwera, skontaktuj się z administratorem.';
          }
          swal({
            type: 'error',
            title: 'Błąd',
            text: message,
            timer: 5000,
          });
        });
    },
    addPoint(dto) {
      this.addPointLoading = true;
      this.$http.post(`${endpoints.MAP}`, dto)
        .then(() => {
          swal({
            type: 'success',
            title: 'Dziękujemy',
            text: 'Punkt został dodany',
            timer: 5000,
          });
          this.$validator.reset();
          this.addPointDTO = {
            companyName: '',
            info: '',
            address: '',
            city: '',
            zipCode: '',
            www: '',
            phone: '',
            latitude: '',
            longitude: '',
            type: '',
          };
        })
        .catch(() => {
          swal({
            type: 'error',
            title: 'Błąd',
            text: 'Wystąpił błąd serwera, skontaktuj się z administratorem.',
            timer: 5000,
          });
        });
      this.addPointLoading = false;
    },
  },
  mounted() {
    this.fetchMapPointTypes();
  },
};
</script>

<style scoped>
  .map {
    width: 100%;
    height: 100%;
    min-height: 400px;
  }
</style>

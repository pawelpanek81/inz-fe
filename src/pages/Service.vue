<template>
  <v-container fluid class="pa-2">
    <v-layout>
      <v-flex class="pa-2">
        <v-card>
          <v-btn class="mt-4 ml-4" outline color="primary" @click="generateReport()"
                 :disabled="this.selectedCar === null" :loading="loadingReport">
            Generuj raport z historii
          </v-btn>
          <v-card-title primary-title class="pb-0">
            <span class="title">Dodaj nowy wpis</span>
          </v-card-title>
          <v-card-text>
            <v-layout wrap>
              <v-flex xs12 sm12 md3>
                <v-menu
                  ref="menu"
                  :close-on-content-click="false"
                  v-model="menu"
                  :nudge-right="40"
                  :return-value.sync="formData.serviceDate"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <v-text-field
                    :error-messages="errors.collect('serviceDate')"
                    data-vv-name="serviceDate"
                    data-vv-as="data serwisu"
                    v-validate="'required'"
                    slot="activator"
                    :value="formData.serviceDate"
                    label="Data wykonania serwisu"
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker
                    @input="formData.serviceDate = $event"
                    v-model="formData.serviceDate"
                    :allowed-dates="allowedDates">
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="datePicked">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12 sm12 md3>
                <v-select
                  :error-messages="errors.collect('serviceType')"
                  data-vv-name="serviceType"
                  data-vv-as="typ serwisu"
                  v-validate="'required'"
                  v-model="formData.serviceType"
                  :items="serviceTypes"
                  item-text="text"
                  item-value="type"
                  label="Typ serwisu"
                  prepend-icon="build">
                </v-select>
              </v-flex>
              <v-flex xs12 sm12 md3>
                <v-text-field
                  v-validate="'required'"
                  data-vv-name="mileage"
                  data-vv-as="przebieg"
                  :error-messages="errors.collect('mileage')"
                  v-model="formData.mileage"
                  prepend-icon="drive_eta"
                  label="Przebieg [km]">
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md3>
                <v-text-field
                  v-validate="'required'"
                  data-vv-name="cost"
                  data-vv-as="koszt"
                  :error-messages="errors.collect('cost')"
                  v-model="formData.cost"
                  prepend-icon="attach_money"
                  label="Koszt [zł]">
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm12>
                <v-text-field
                  v-validate="'required'"
                  data-vv-name="title"
                  data-vv-as="nagłówek"
                  :error-messages="errors.collect('title')"
                  v-model="formData.header"
                  prepend-icon="title"
                  label="Nagłówek">
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm12>
                <v-textarea
                  v-validate="'required'"
                  data-vv-name="description"
                  data-vv-as="opis"
                  :error-messages="errors.collect('description')"
                  prepend-icon="event_note"
                  v-model="formData.description"
                  rows="8"
                  auto-grow
                  label="Opis">
                </v-textarea>
              </v-flex>
            </v-layout>
            <div v-for="file in selectedFiles" class="caption">
              {{file.name}}
            </div>
            <v-layout class="pt-2">
              <v-btn @click.native="$refs.multipartfiles.click()">
                Pliki
                <v-icon right dark>cloud_upload</v-icon>
                <input style="display: none;" @change="showFileName" ref="multipartfiles" type="file"
                       name="multipartfiles" accept="image/*" multiple/>
              </v-btn>
              <v-spacer/>
              <v-btn color="primary" type="button" @click="validateForm"
                     :disabled="this.selectedCar === null"
                     :loading="loadingAddService">
                Dodaj
              </v-btn>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import endpoints from '@/api/endpoints';
import swal from 'sweetalert2';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      loadingReport: false,
      loadingAddService: false,
      menu: false,
      selectedFiles: [],
      serviceTypes: [
        {
          type: 'EXCHANGE',
          text: 'wymiana',
        },
        {
          type: 'REGENERATION',
          text: 'regeneracja',
        },
        {
          type: 'OTHER',
          text: 'inny',
        },
      ],
      formData: {
        serviceDate: null,
        serviceType: null,
        mileage: null,
        header: null,
        description: null,
        cost: null,
      },
    };
  },
  computed: {
    ...mapGetters([
      'selectedCar',
    ]),
  },
  methods: {
    generateReport() {
      this.loadingReport = true;
      this.$http({
        url: `${endpoints.REPORTS}?carId=${this.selectedCar.id}`,
        method: 'GET',
        responseType: 'blob',
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'raport.pdf');
        document.body.appendChild(link);
        link.click();
        this.loadingReport = false;
      });
    },
    showFileName(event) {
      this.selectedFiles = [...event.srcElement.files];
    },
    datePicked() {
      this.$refs.menu.save(this.formData.serviceDate);
      if (this.formData.serviceDate !== null) {
        const field = this.$validator.fields.find({ name: 'serviceDate' });
        field.reset();
        this.$validator.errors.remove(field.name);
      }
    },
    validateForm() {
      if (this.selectedCar === null) {
        swal({
          type: 'error',
          title: 'Błąd',
          text: 'Wybierz auto, zanim dodasz badanie techniczne.',
          timer: 5000,
        });
        return;
      }
      this.$validator.validateAll()
        .then((result) => {
          if (result) {
            this.sendData();
          }
        });
    },
    sendData() {
      this.loadingAddService = true;
      let i;
      const multipartfiles = this.$refs.multipartfiles.files;
      const formData = new FormData();
      formData.append('carId', this.selectedCar.id);
      formData.append('serviceDate', this.formData.serviceDate);
      formData.append('serviceType', this.formData.serviceType);
      formData.append('mileage', this.formData.mileage);
      formData.append('header', this.formData.header);
      formData.append('description', this.formData.description);
      formData.append('cost', this.formData.cost);
      const len = multipartfiles.length;
      // eslint-disable-next-line
      for (i = 0; i < len; i++) {
        formData.append('multipartfiles', multipartfiles[i]);
      }
      this.$http.post(endpoints.SERVICES, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(() => {
          swal({
            type: 'success',
            title: 'Dodano',
            text: 'Wpis o serwisie został dodany.',
          });
          this.formData = {
            serviceDate: null,
            serviceType: null,
            mileage: null,
            header: null,
            description: null,
            cost: null,
          };
          this.selectedFiles = [];
          this.$validator.reset();
        })
        .catch((error) => {
          const code = error.response.status;
          let message = 'Podane dane są błędne.';
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
      this.loadingAddService = false;
    },
    allowedDates(val) {
      return new Date(val) < new Date();
    },
  },
  mounted() {
    if (this.selectedCar === null) {
      swal({
        type: 'info',
        title: 'Wybierz auto',
        text: 'Aby wykonać akcję wybierz auto',
        timer: 5000,
      });
    }
  },
};
</script>

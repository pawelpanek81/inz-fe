<template>
  <v-container fluid class="pa-2">
    <v-layout wrap>
      <v-flex xs12 sm6 class="pa-2">
        <v-card>
          <v-card-title primary-title class="pb-0">
            <span class="title">Ostatnie ubezpieczenie OC</span>
          </v-card-title>
          <v-card-text>
            <div v-if="lastThirdPartyInsurance.id !== undefined">
              <div>Ubezpieczenie ważne od {{lastThirdPartyInsurance.fromDate}} do:
                {{lastThirdPartyInsurance.toDate}}
              </div>
              <div>Opis: {{lastThirdPartyInsurance.description}}</div>
              <div>Cena: {{lastThirdPartyInsurance.cost}} zł</div>
              <p>Typ: {{insuranceTypeToString(lastThirdPartyInsurance.type)}}</p>
              <span v-if="lastThirdPartyInsurance.documents.length > 0" class="caption">Dokumenty:</span>
              <div class="caption primary--text text--accent-4">
                      <span v-for="doc in lastThirdPartyInsurance.documents">
                        <div @click="downloadFile(doc.fileName, doc.documentId)"
                             class="document-link">{{doc.fileName}}</div>
                      </span>
              </div>
            </div>
            <div v-else>{{lastThirdPartyInsurance.fromDate}}</div>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 class="pa-2">
        <v-card>
          <v-card-title primary-title class="pb-0">
            <span class="title">Ostatnie ubezpieczenie AC</span>
          </v-card-title>
          <v-card-text>
            <div v-if="lastFullyInsurance.id !== undefined">
              <div>Ubezpieczenie ważne od {{lastFullyInsurance.fromDate}} do: {{lastFullyInsurance.toDate}}</div>
              <div>Opis: {{lastFullyInsurance.description}}</div>
              <div>Cena: {{lastFullyInsurance.cost}} zł</div>
              <p>Typ: {{insuranceTypeToString(lastFullyInsurance.type)}}</p>
              <span v-if="lastFullyInsurance.documents.length > 0" class="caption">Dokumenty:</span>
              <div class="caption primary--text text--accent-4">
                      <span v-for="doc in lastFullyInsurance.documents">
                        <div @click="downloadFile(doc.fileName, doc.documentId)"
                             class="document-link">{{doc.fileName}}</div>
                      </span>
              </div>
            </div>
            <div v-else>{{lastFullyInsurance.fromDate}}</div>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 class="pa-2">
        <v-card>
          <v-card-title primary-title class="pb-0">
            <span class="title">Dodaj nowe ubezpieczenie</span>
          </v-card-title>
          <v-card-text>
            <v-layout wrap>
              <v-flex xs6>
                <v-menu
                  ref="menu"
                  :close-on-content-click="false"
                  v-model="menu"
                  :nudge-right="40"
                  :return-value.sync="formData.fromDate"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <v-text-field
                    :error-messages="errors.collect('fromDate')"
                    data-vv-name="fromDate"
                    data-vv-as="data od"
                    v-validate="'required'"
                    slot="activator"
                    :value="formData.fromDate"
                    label="Data ważności od"
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker
                    @input="formData.fromDate = $event"
                    v-model="formData.fromDate">
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="fromDatePicked">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs6>
                <v-menu
                  ref="menu2"
                  :close-on-content-click="false"
                  v-model="menu2"
                  :nudge-right="40"
                  :return-value.sync="formData.toDate"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <v-text-field
                    :error-messages="errors.collect('toDate')"
                    data-vv-name="toDate"
                    data-vv-as="data do"
                    v-validate="'required'"
                    slot="activator"
                    :value="formData.toDate"
                    label="Data ważności do"
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker
                    @input="formData.toDate = $event"
                    v-model="formData.toDate">
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="menu2 = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="toDatePicked">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs6>
                <v-select
                  v-validate="'required'"
                  data-vv-name="type"
                  data-vv-as="typ"
                  :error-messages="errors.collect('type')"
                  v-model="formData.type"
                  :items="insuranceTypes"
                  item-text="text"
                  item-value="value"
                  prepend-icon="insert_drive_file"
                  label="Typ ubezpieczenia">
                </v-select>
              </v-flex>
              <v-flex xs6>

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
              <v-flex xs12>
                <v-textarea
                  prepend-icon="event_note"
                  v-model="formData.description"
                  rows="2"
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
                       name="multipartfiles" accept="image/*,application/pdf" multiple/>
              </v-btn>
              <v-spacer/>
              <v-btn color="primary" type="button" @click="validateForm">Dodaj</v-btn>
            </v-layout>


          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 class="pa-2">
        <v-card>
          <v-card-title primary-title class="pb-0">
            <span class="title">Historia ubezpieczeń</span>
          </v-card-title>
          <v-card-text>
            <v-expansion-panel>
              <v-expansion-panel-content
                v-for="(insurance, i) in insurancePage.content"
                :key="i">
                <div slot="header">
                  <span class="font-weight-bold">({{insuranceTypeToString(insurance.type)}})
                  </span> Ważne do: <span class="font-weight-bold">{{insurance.toDate}}</span>
                </div>
                <v-card>
                  <v-card-text class="grey lighten-3">
                    <div>Ubezpieczenie ważne od {{insurance.fromDate}} do: {{insurance.toDate}}</div>
                    <div>Opis: {{insurance.description}}</div>
                    <div>Cena: {{insurance.cost}} zł</div>
                    <div>Typ: {{insuranceTypeToString(insurance.type)}}</div>
                    <span v-if="insurance.documents.length > 0" class="caption">Dokumenty:</span>
                    <div class="caption primary--text text--accent-4">
                      <span v-for="doc in insurance.documents">
                        <div @click="downloadFile(doc.fileName, doc.documentId)" class="document-link">{{doc.fileName}}</div>
                      </span>
                    </div>
                    <div class="caption pt-2">{{insurance.car}}</div>
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-container class="pa-0 py-2">
              <v-layout row wrap align-center>
                <v-flex class="text-xs-center">
                  <v-pagination
                    class="pa-2"
                    v-model="actualDisplayedPage"
                    :length="insurancePage.totalPages"
                  ></v-pagination>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import swal from 'sweetalert2';
import { mapGetters } from 'vuex';
import endpoints from '@/api/endpoints';

export default {
  data() {
    return {
      lastThirdPartyInsurance: {
        description: '',
        fromDate: 'Brak ostatniego ubezpieczenia OC',
        toDate: '',
        cost: '',
        type: '',
      },
      lastFullyInsurance: {
        description: '',
        fromDate: 'Brak ostatniego ubezpieczenia AC',
        toDate: '',
        cost: '',
        type: '',
      },
      selectedFiles: [],
      menu: false,
      menu2: false,
      formData: {
        fromDate: null,
        toDate: null,
        cost: null,
        type: null,
        description: null,
      },
      insurancePage: {
        totalPages: 0,
      },
      actualDisplayedPage: 1,
      insuranceTypes: [
        {
          value: 'THIRD_PARTY',
          text: 'OC',
        }, {
          value: 'FULLY',
          text: 'AC',
        },
      ],
    };
  },
  watch: {
    actualDisplayedPage(newPage) {
      this.getData(this.selectedCar.id, newPage - 1);
    },
  },
  computed: {
    ...mapGetters([
      'selectedCar',
    ]),
  },
  methods: {
    insuranceTypeToString(insuranceType) {
      if (insuranceType === 'THIRD_PARTY') return 'OC';
      else if (insuranceType === 'FULLY') return 'AC';
      return '';
    },
    showFileName(event) {
      this.selectedFiles = [...event.srcElement.files];
    },
    fromDatePicked() {
      this.$refs.menu.save(this.formData.fromDate);
      if (this.formData.fromDate !== null) {
        const field = this.$validator.fields.find({ name: 'fromDate' });
        field.reset();
        this.$validator.errors.remove(field.name);
      }
    },
    toDatePicked() {
      this.$refs.menu2.save(this.formData.toDate);
      if (this.formData.toDate !== null) {
        const field = this.$validator.fields.find({ name: 'toDate' });
        field.reset();
        this.$validator.errors.remove(field.name);
      }
    },
    validateForm() {
      if (this.selectedCar === null) {
        swal({
          type: 'error',
          title: 'Błąd',
          text: 'Wybierz auto, zanim dodasz ubezpieczenie.',
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
      let i;
      const multipartfiles = this.$refs.multipartfiles.files;
      const formData = new FormData();
      formData.append('carId', this.selectedCar.id);
      if (this.formData.description !== null) {
        formData.append('description', this.formData.description);
      }
      formData.append('fromDate', this.formData.fromDate);
      formData.append('toDate', this.formData.toDate);
      formData.append('cost', this.formData.cost);
      formData.append('type', this.formData.type);
      const len = multipartfiles.length;
      // eslint-disable-next-line
      for (i = 0; i < len; i++) {
        formData.append('multipartfiles', multipartfiles[i]);
      }

      this.$http.post(endpoints.INSURANCES, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(() => {
          this.getData(this.selectedCar.id, this.actualDisplayedPage - 1);
          this.getLastThirdPartyInsurance(this.selectedCar.id);
          this.getLastFullyInsurance(this.selectedCar.id);
          swal({
            type: 'success',
            title: 'Dodano',
            text: 'Ubezpieczenie zostało dodane.',
          });
          this.formData = {
            fromDate: null,
            toDate: null,
            cost: null,
            type: null,
            description: null,
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
    },
    getData(carId, fetchedPage) {
      this.$http.get(`${endpoints.INSURANCES}?carId=${carId}&size=5&page=${fetchedPage}&sort=fromDate,toDate,id,desc`)
        .then((response) => {
          this.insurancePage = response.data;
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
    downloadFile(fileName, id) {
      this.$http({
        url: `${endpoints.INSURANCE_DOCUMENTS}/${id}`,
        method: 'GET',
        responseType: 'blob',
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
      });
    },
    getLastThirdPartyInsurance(carId) {
      this.$http.get(`${endpoints.LAST_THIRD_PARTY_INSURANCE}?carId=${carId}`)
        .then((response) => {
          this.lastThirdPartyInsurance = response.data;
        });
    },
    getLastFullyInsurance(carId) {
      this.$http.get(`${endpoints.LAST_FULLY_INSURANCE}?carId=${carId}`)
        .then((response) => {
          this.lastFullyInsurance = response.data;
        });
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
    } else {
      this.getData(this.selectedCar.id, this.actualDisplayedPage - 1);
      this.getLastThirdPartyInsurance(this.selectedCar.id);
      this.getLastFullyInsurance(this.selectedCar.id);
    }
  },
};
</script>

<style scoped>
  .document-link:hover {
    text-decoration: underline;
    cursor: pointer;
  }
</style>

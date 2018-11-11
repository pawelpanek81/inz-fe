<template>
  <v-container fluid class="pa-2">
    <v-layout wrap>
      <v-flex xs12 sm6>
        <v-flex xs12 class="pa-2">
          <v-card>
            <v-card-title primary-title class="pb-0">
              <span class="title">Ostatni przegląd</span>
            </v-card-title>
            <v-card-text>
              <div>Data wykonania:
                <span class="font-weight-bold">{{lastExamination.examinationDate}}</span>
              </div>
              <p>Opis: {{lastExamination.description === null ? 'brak' : lastExamination.description}}</p>
              <span v-if="lastExamination.documents.length > 0" class="caption">Dokumenty:</span>
              <div class="caption primary--text text--accent-4">
                      <span v-for="doc in lastExamination.documents">
                        <div @click="downloadFile(doc.fileName, doc.documentId)" class="document-link">{{doc.fileName}}</div>
                      </span>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 class="pa-2">
          <v-card>
            <v-card-title primary-title class="pb-0">
              <span class="title">Dodaj nowy przegląd</span>
            </v-card-title>
            <v-card-text>
              <v-menu
                ref="menu"
                :close-on-content-click="false"
                v-model="menu"
                :nudge-right="40"
                :return-value.sync="formData.examinationDate"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <v-text-field
                  :error-messages="errors.collect('examinationDate')"
                  data-vv-name="examinationDate"
                  data-vv-as="data przeglądu"
                  v-validate="'required'"
                  slot="activator"
                  :value="formData.examinationDate"
                  label="Data wykonania przeglądu"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                <v-date-picker
                  @input="formData.examinationDate = $event"
                  v-model="formData.examinationDate"
                  :allowedDates="allowedDates">
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="datePicked">OK</v-btn>
                </v-date-picker>
              </v-menu>
              <v-textarea
                prepend-icon="event_note"
                v-model="formData.description"
                rows="2"
                auto-grow
                label="Opis">
              </v-textarea>
              <div v-for="file in selectedFiles" class="caption">
                {{file.name}}
              </div>
              <v-layout class="pt-2">
                <v-btn @click.native="$refs.multipartfiles.click()">
                  Pliki
                  <v-icon right dark>cloud_upload</v-icon>
                  <input style="display: none;" @change="showFileName" ref="multipartfiles" type="file" name="multipartfiles" accept="image/*,application/pdf" multiple/>
                </v-btn>
                <v-spacer/>
                <v-btn color="primary" type="button" @click="validateForm"
                       :disabled="this.selectedCar === null"
                       :loading="addExaminationLoading"
                >Dodaj</v-btn>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-flex>
      <v-flex xs12 sm6>
        <v-flex xs12 class="pa-2">
          <v-card>
            <v-card-title primary-title class="pb-0">
              <span class="title">Historia przeglądów</span>
            </v-card-title>
            <v-card-text>
              <v-expansion-panel>
                <v-expansion-panel-content
                  v-for="(examination, i) in examinationPage.content"
                  :key="i">
                  <div slot="header">{{examination.examinationDate}}</div>
                  <v-card>
                    <v-card-text class="grey lighten-3">
                      <p>Opis: {{examination.description === null? 'brak' : examination.description}}</p>

                      <span v-if="examination.documents.length > 0" class="caption">Dokumenty:</span>
                      <div class="caption primary--text text--accent-1">
                      <span v-for="doc in examination.documents">
                        <div @click="downloadFile(doc.fileName, doc.documentId)" class="document-link">{{doc.fileName}}</div>
                      </span>
                      </div>
                      <div class="caption pt-2">Auto: {{examination.car}}</div>
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
                      :length="examinationPage.totalPages"
                    ></v-pagination>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
          </v-card>
        </v-flex>
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
      addExaminationLoading: false,
      menu: false,
      formData: {
        examinationDate: null,
        description: null,
      },
      examinationPage: {
        totalPages: 0,
      },
      actualDisplayedPage: 1,
      selectedFiles: [],
      lastExamination: {
        examinationDate: 'Brak ostatniego przeglądu',
        description: '',
        documents: [],
      },
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
    showFileName(event) {
      this.selectedFiles = [...event.srcElement.files];
    },
    datePicked() {
      this.$refs.menu.save(this.formData.examinationDate);
      if (this.formData.examinationDate !== null) {
        this.$validator.reset();
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
      this.addExaminationLoading = true;
      let i;
      const multipartfiles = this.$refs.multipartfiles.files;
      const formData = new FormData();
      formData.append('carId', this.selectedCar.id);
      if (this.formData.description !== null) {
        formData.append('description', this.formData.description);
      }
      formData.append('examinationDate', this.formData.examinationDate);
      const len = multipartfiles.length;
      // eslint-disable-next-line
      for (i = 0; i < len; i++) {
        formData.append('multipartfiles', multipartfiles[i]);
      }

      this.$http.post(endpoints.EXAMINATIONS, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(() => {
          this.getData(this.selectedCar.id, this.actualDisplayedPage - 1);
          this.getLastExamination(this.selectedCar.id);
          swal({
            type: 'success',
            title: 'Dodano',
            text: 'Badanie techniczne zostało dodane.',
          });
          this.formData = {
            examinationDate: null,
            description: null,
          };
          this.selectedFiles = [];
        })
        .catch((error) => {
          const code = error.response.status;
          let message = 'Pliki posiadają złe rozszerzenie.';
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
      this.addExaminationLoading = false;
    },
    getData(carId, fetchedPage) {
      this.$http.get(`${endpoints.EXAMINATIONS}?carId=${carId}&size=8&page=${fetchedPage}&sort=examinationDate,id,desc`)
        .then((response) => {
          this.examinationPage = response.data;
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
        url: `${endpoints.EXAMINATION_DOCUMENTS}/${id}`,
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
    getLastExamination(carId) {
      this.$http.get(`${endpoints.LAST_EXAMINATION}?carId=${carId}`)
        .then((response) => {
          this.lastExamination = response.data;
        });
    },
    allowedDates(val) {
      return new Date(val) <= new Date();
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
      this.getLastExamination(this.selectedCar.id);
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

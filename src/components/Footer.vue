<template>
  <v-footer :fixed="fixed" app>
    <span class="ml-2">&copy; 2018 Paweł Panek</span>
    <v-spacer></v-spacer>
    wersja: v1.0
    <v-spacer></v-spacer>
    <v-btn @click="reportBug" small style="box-shadow: none;">
      Zgłoś błąd
      <v-icon>bug_report</v-icon>
    </v-btn>
  </v-footer>
</template>

<script>
import { mapGetters } from 'vuex';
import swal from 'sweetalert2';

export default {
  methods: {
    reportBug() {
      swal({
        title: 'Dodaj swoją uwagę',
        input: 'textarea',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Wyślij',
        cancelButtonText: 'Anuluj',
        // eslint-disable-next-line
        preConfirm: (data) => {
          // send request
        },
      }).then((result) => {
        if (result.value) {
          swal(
            'Dziękujemy',
            'Twoja uwaga została przesłana',
            'success',
          );
        }
      });
    },
  },
  computed: {
    ...mapGetters([
      'fixed',
    ]),
  },
};
</script>

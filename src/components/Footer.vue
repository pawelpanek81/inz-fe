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
      swal(
        'Super!',
        'Dziękuję za zgłoszenie!',
        'success'
      );
    },
  },
  computed: {
    ...mapGetters([
      'fixed',
    ]),
  },
};
</script>

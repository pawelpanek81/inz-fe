<template>
  <v-container fluid class="pa-2">
    <v-layout>
      <v-flex class="pa-2">
        <v-card>
          <v-card-title primary-title>
            <span class="title">Lista powiadomień</span>
          </v-card-title>
          <v-card-text>
            <div class="mb-3">
              <v-layout wrap>
                <v-btn color="primary" outline @click="expandAll">Rozwiń wszystkie</v-btn>
                <v-btn color="primary" outline @click="collapseAll">Zwiń</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" outline @click="readAll">Przeczytaj wszystkie</v-btn>
              </v-layout>
            </div>
            <v-expansion-panel
              v-model="panel"
              expand
              popout>
              <v-expansion-panel-content
                v-for="(item,i) in notificationPage.content"
                :key="i"
                @click.native="makeElementRead(item)">
                <div slot="header" :class="{ 'font-weight-bold': !item.read }">
                  <v-layout>
                    {{item.header}}
                    <v-spacer />
                    {{item.addedAt.substring(0, 10)}} {{item.addedAt.substring(11, 16)}}
                  </v-layout>
                </div>
                <v-card>
                  <v-card-text>
                    {{item.text}}
                    <div class="caption">
                      dodano: {{item.addedAt.substring(0, 10)}} {{item.addedAt.substring(11, 19)}}
                    </div>
                    <div class="caption">
                      auto: {{item.car}}
                    </div>
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-card-text>
        </v-card>
        <v-container class="pa-0 py-2">
          <v-layout row wrap align-center>
            <v-flex class="text-xs-center">
              <v-pagination
                class="pa-2"
                v-model="actualDisplayedPage"
                :length="notificationPage.totalPages"
              ></v-pagination>
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
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      notificationPage: {
        content: [],
      },
      actualDisplayedPage: 1,
      panel: [],
    };
  },
  watch: {
    actualDisplayedPage(newPage) {
      this.collapseAll();
      this.fetchNotificationPage(newPage - 1);
    },
    newNotificationsCount() {
      this.fetchNotificationPage(this.actualDisplayedPage - 1);
    },
  },
  computed: {
    ...mapGetters({
      newNotificationsCount: 'getUnreadCount',
    }),
  },
  methods: {
    fetchNotificationPage(fetchedPage) {
      this.$http.get(`${endpoints.NOTIFICATIONS}?size=6&page=${fetchedPage}&sort=addedAt,id,desc`)
        .then((response) => {
          this.notificationPage = response.data;
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
    expandAll() {
      this.panel = [...Array(this.notificationPage.numberOfElements).keys()].map(_ => true);
    },
    readAll() {
      this.panel = this.notificationPage.content
        .map(el => !el.read);
      this.notificationPage.content.forEach(el => this.makeElementRead(el));
    },
    collapseAll() {
      this.panel = [];
    },
    makeElementRead(element) {
      const notification = element;
      this.$store.dispatch('makeElementRead', notification)
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
      notification.read = true;
    },
  },
  mounted() {
    this.fetchNotificationPage(this.actualDisplayedPage - 1);
  },
};
</script>

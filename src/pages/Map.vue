<template>
  <v-container fluid pa-2 fill-height>
    <v-layout wrap row>
      <v-flex xl8 lg8 md8 sm12 xs12 pa-2 fill-height>
        <GmapMap
          :center="mapConf.coordinates"
          :zoom="mapConf.zoom"
        style="width: 100%; height: 100%; ">
          <!--&lt;!&ndash;<GmapMarker&ndash;&gt;-->
            <!--&lt;!&ndash;:key="index"&ndash;&gt;-->
            <!--&lt;!&ndash;v-for="(m, index) in markers"&ndash;&gt;-->
            <!--&lt;!&ndash;:position="m.position"&ndash;&gt;-->
            <!--&lt;!&ndash;:clickable="true"&ndash;&gt;-->
            <!--&lt;!&ndash;:draggable="true"&ndash;&gt;-->
            <!--&lt;!&ndash;@click="center=m.position"&ndash;&gt;-->
          <!--&lt;!&ndash;/>&ndash;&gt;-->
        </GmapMap>
      </v-flex>
      <v-flex xl4 lg4 md4 sm12 xs12 pa-2 fill-height>
        <v-card>
          <v-card-title primary class="title justify-center pb-2">{{ selectedPoint.mapPoint.companyName }}</v-card-title>
          <div class="text-xs-center">
            <v-rating v-model="rating" class="pb-1"></v-rating>
          </div>
          <v-card-text class="py-0">
            <div>Juliusza Słowackiego 6</div>
            <div>39-460 Nowa Dęba</div>
            <div>tel.: 15 846 35 34</div>
            <div class="mt-2">
              <div>
                <span class="font-weight-bold">Średnia ocen: </span><span>5.0</span>
              </div>
              <div>
                <span class="font-weight-bold">Opinie:</span><span>37</span>
              </div>
            </div>
            <div class="text-xs-center pt-2">Opinie</div>
            <div class="mt-2">
              <v-card v-for="rating in selectedPoint.ratings" :key="rating.id" @click="" flat>
                <v-card-title class="pa-0">
                  <div class="font-weight-medium">{{rating.header}}</div>
                </v-card-title>
                <v-card-text class="px-3 py-0 font-italic">{{rating.comment}}</v-card-text>
                <v-card-actions class="pa-0">
                  <div class="caption">
                    <span>dodano: 20.10.2018, przez: panczo12d</span>
                  </div>
                  <v-spacer />
                  <v-btn flat small>Dyskusja</v-btn>
                </v-card-actions>
              </v-card>
              <v-pagination
                v-model="page"
                :length="6"
              ></v-pagination>
            </div>
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
      rating: 2,
      mapConf: {
        zoom: 6,
        coordinates: {
          lat: 52.240889,
          lng: 19.427853,
        },
      },
      mapPointsList: [],
      selectedPoint: {
        mapPoint: {
          id: 1,
          info: '',
          addedAt: '2018-10-01T21:33:23.506Z',
          addedBy: 'panczo',
          companyName: 'Moto-Art s.c. PPHU. Kosiorowscy',
          address: 'Juliusza Słowackiego 1A',
          zipCode: '39-460',
          city: 'Nowa Dęba',
          latitude: '50.413013',
          longitude: '21.7558036',
          phone: '15 846 26 47',
          type: {
            id: 0,
            type: 'string',
            iconFile: 'string',
            description: 'string',
          },
          www: '',
        },
        ratings: [
          {
            id: 0,
            addedAt: '2018-10-02T21:23:19.958Z',
            addedBy: 'panczo',
            header: 'jest ok',
            comment: 'jest bałdzo ok naprawił lux jest bałdzo ok naprawił lux jest bałdzo ok naprawił lux jest bałdzo ok naprawił lux jest bałdzo ok naprawił lux',
            rating: '4.5',
            subComments: [
              {
                id: 0,
                addedAt: '2018-10-02T21:23:19.958Z',
                addedBy: 'panczo',
                comment: 'nieprawdan ieprawdanie prawdaniepr awdanieprawd aniep rawdanieprawdan ieprawdani eprawd anieprawdaniep rawdaniepraw danieprawda nieprawdaniep rawda',
              }, {
                id: 1,
                addedAt: '2018-10-02T21:23:19.958Z',
                addedBy: 'panczo',
                comment: 'nieprawda2',
              },
            ],
          }, {
            id: 1,
            addedAt: '2018-10-02T21:23:19.958Z',
            addedBy: 'panczo',
            header: 'jest ok 2',
            comment: 'git malina silnik dotarty lux',
            rating: '4.5',
            subComments: [
              {
                id: 0,
                addedAt: '2018-10-02T21:23:19.958Z',
                addedBy: 'panczo',
                comment: 'niepra wda3',
              }, {
                id: 1,
                addedAt: '2018-10-02T21:23:19.958Z',
                addedBy: 'panczo',
                comment: 'niepr awda3',
              },
            ],
          },
        ],
      },
    };
  },
};
</script>

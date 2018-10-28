<template>
  <v-container fluid class="pa-2">
    <v-layout>
      <v-flex class="pa-2">
        <v-card>
          <v-card-title primary-title>
            <span class="title">Dane auta</span>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-layout wrap>
                <v-flex xs12 sm6>
                  <v-text-field
                    label="Marka">
                  </v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field
                    label="Model">
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-select
                :items="fuelTypes"
                label="Rodzaj paliwa"
              ></v-select>
              <v-text-field
              label="Pojemność silnika">
              </v-text-field>
              <v-text-field
              label="Moc silnika [KM]">
              </v-text-field>
              <v-text-field
              label="Rok produkcji">
              </v-text-field>
              <v-text-field
              label="VIN"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <!--:loading="loading3"-->

            <!--:disabled="loading3"-->
            <!--@click.native="loader = 'loading3'"-->
            <v-btn
              color="primary">
              <v-icon left>send</v-icon>
              Dodaj
            </v-btn>
          </v-card-actions>
          <div>
            <div>dodaj nowe auto</div>
            <div>brand</div>
            <div>model</div>
            <div>fuelType</div>
            <div>engineCapacity</div>
            <div>enginePowerInHP</div>
            <div>productionYear</div>
            <div>VIN</div>
          </div>
        </v-card>
      </v-flex>
    </v-layout>


  </v-container>
</template>

<script>
export default {
  data() {
    return {
      fuelTypes: ['a', 'b', 'c', 'd'],
      loading3: true,
    };
  },
};
</script>

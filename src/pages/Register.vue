<template>
  <v-container fluid fill-height class="bg">
    <v-layout align-center justify-center>
      <v-flex xs12 sm10 md9 lg8 xl7>
        <v-card class="elevation-12 login-card">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Rejestracja</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-container grid-list-xl fluid class="pb-0">
              <v-layout wrap>
                <v-flex xs12 sm6 class="py-0">
                  <v-text-field name="name" type="text" label="Imię" prepend-icon="person"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 class="py-0">
                  <v-text-field name="name" type="text" label="Nazwisko" prepend-icon="person"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 class="py-0">
                  <v-text-field name="name" type="text" label="Login" prepend-icon="people"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 class="py-0">
                  <v-text-field name="name" type="text" label="Email" prepend-icon="alternate_email"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 class="py-0">
                  <v-text-field name="name" type="password" label="Hasło" prepend-icon="lock"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 class="py-0">
                  <v-text-field name="name" type="password" label="Powtórz hasło" prepend-icon="lock"></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 class="py-0">
                  <v-text-field name="name" type="text" label="Miejscowość" prepend-icon="location_city"></v-text-field>
                </v-flex>
                
                <v-flex xs12 sm12 class="py-0">
                  <v-checkbox label="Akceptuję regulamin"></v-checkbox>
                </v-flex>


              </v-layout>
              </v-container>

              
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-layout column class="ml-2">
              <div>
                <a href="static/regulamin.pdf">Regulamin portalu</a>
              </div>
              <div>
                <span>Posiadasz już konto?</span>
                <v-btn to="login" small flat color="secondary" class="pa-0">Zaloguj się</v-btn>
              </div>
            </v-layout>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="mr-2 mb-2">Rejestruj</v-btn>
          </v-card-actions>

        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style scoped>
.bg {
  background-image: url("/static/chuttersnap-299121-unsplash.jpg");
  background-repeat: no-repeat;
  background-attachment: scroll;
  background-position: center;
  background-size: cover;
  height: 100%;
}
.login-card {
  border-radius: 6px;
  opacity: 0.94;
}
</style>

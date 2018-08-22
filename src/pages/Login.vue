<template>
    <v-layout align-center justify-center row class="bg">
      <v-flex xs10 xm5 md4 lg3 xl2 class="white login-card">
        <v-container>
          <v-card flat>
            <v-card-title>
              <h3>Login</h3>
            </v-card-title>
            <v-form>
              <v-text-field prepend-icon="person" name="Username" label="Username"></v-text-field>
              <v-text-field prepend-icon="lock" name="Password" label="Password" type="password"></v-text-field>
              <v-card-actions>
                <v-btn primary large block>Login</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-container>
      </v-flex>
    </v-layout>
</template>

<style >
.bg {
  background-image: url("/static/chuttersnap-299121-unsplash.jpg");
  background-repeat: no-repeat;
  background-attachment: scroll;
  background-position: center; 
  background-size: cover;
  height: 100%;
}
.login-card {
  border-radius: 10px;
  opacity: 0.9;
}
</style>

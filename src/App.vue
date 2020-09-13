<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center"></div>
      <v-tabs v-if="$vuetify.breakpoint.mdAndUp" centered>
        <v-tab exact to="/">Add Booking</v-tab>
        <v-tab exact to="/about">View Bookings</v-tab>
      </v-tabs>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-container>
      <v-row justify="center" wrap>
        <v-col cols="12">
          <v-main>
            <router-view />
          </v-main>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "App",

  data: () => ({
    bookingList: [],
  }),
  methods: {
    ...mapActions(["getBookingsAction"]),
  },
  computed: {
    ...mapState(["bookings"]),
  },

  created() {
    this.getBookingsAction();
    this.bookingList = this.bookings;
  },
};
</script>

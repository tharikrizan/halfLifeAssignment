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
      <v-row justify="center">
        <v-col cols="6" md="4" sm="12">
          <v-main class="flex align-center ">
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
  watch: {
    // whenever question changes, this function will run
    bookings: function() {
      this.getBookingsActions();
      this.bookingList = this.bookings;
    },
  },
  created() {
    this.getBookingsActions();
    this.bookingList = this.bookings;
  },
};
</script>

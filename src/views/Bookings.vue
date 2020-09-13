<template>
  <div>
    <h1>Bookings page</h1>
    <div>
      <v-container>
        <v-row justify="start" wrap>
          <v-col cols="4" md="6" sm="12">
            <BookedCard
              v-for="(booking, i) in bookings"
              :key="i"
              :booking="booking"
              :id="i"
            />
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import BookedCard from "@/components/BookedCard.vue";
export default {
  name: "Bookings",

  data: () => ({
    bookingList: [],
  }),
  components: {
    BookedCard,
  },
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

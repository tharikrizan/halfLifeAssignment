<template>
  <div class="about">
    <h1>Bookings page</h1>
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

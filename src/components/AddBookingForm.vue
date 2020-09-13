<template>
  <div>
    <v-form ref="form" @submit.prevent="submit">
      <v-text-field v-model="booking.custName" :counter="10" label="Name" required></v-text-field>

      <v-text-field v-model="booking.custEmail" label="E-mail" required></v-text-field>

      <v-select v-model="booking.vehicleMake" :items="makes" label="Vehicle Make" required></v-select>

      <v-select v-model="booking.vehicleModel" :items="models" label="Vehicle Model" required></v-select>

      <v-select v-model="booking.vehicleType" :items="types" label="Vehicle Type" required></v-select>

      <v-btn type="submit" color="success" class="mr-4">ADD</v-btn>
    </v-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    models: ["M 1", "M 2", "M 3", "M 4"],
    makes: ["Toyota", "BMW", "Mercedes", "Tata"],
    types: ["Heavy", "Light"],

    booking: {
      custName: "",
      custEmail: "",
      vehicleMake: "",
      vehicleModel: "",
      vehicleType: "",
    },
  }),

  methods: {
    ...mapActions(["addBookingAction"]),
    submit() {
      let payload = {
        ...this.booking,
      };
      this.addBookingAction(payload);

      this.booking = {
        custName: "",
        custEmail: "",
        vehicleMake: "",
        vehicleModel: "",
        vehicleType: "",
      };
    },
  },
};
</script>

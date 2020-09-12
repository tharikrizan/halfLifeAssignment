<template>
  <div>
    <v-form ref="form" v-model="valid" :lazy-validation="lazy">
      <v-text-field
        v-model="name"
        :counter="10"
        :rules="nameRules"
        label="Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-select
        v-model="booking.make"
        :items="makes"
        :rules="[(v) => !!v || 'Item is required']"
        label="Vehicle Make"
        required
      ></v-select>

      <v-select
        v-model="booking.model"
        :items="models"
        :rules="[(v) => !!v || 'Item is required']"
        label="Vehicle Model"
        required
      ></v-select>

      <v-select
        v-model="booking.type"
        :items="types"
        :rules="[(v) => !!v || 'Item is required']"
        label="Vehicle Type"
        required
      ></v-select>

      <v-btn :disabled="valid" color="success" class="mr-4" @click="submit">
        ADD
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    select: null,
    models: ["M 1", "M 2", "M 3", "M 4"],
    makes: ["Toyota", "BMW", "Mercedes", "Tata"],
    types: ["Heavy", "Light"],

    booking: {
      custName: "",
      custEmail: this.email,
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
    },
  },
};
</script>

<template>
  <v-card class="mx-auto" max-width="200" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">Booking</div>
        <v-list-item-title class="headline mb-1">{{
          booking.custEmail
        }}</v-list-item-title>
        <v-list-item-subtitle
          >{{ booking.vehicleModel }}
          {{ booking.vehicleMake }}</v-list-item-subtitle
        >
        <v-list-item-subtitle
          >Assigned SubStation:{{ booking.assignedSubStation }}
        </v-list-item-subtitle>
        <v-list-item-subtitle
          >Assigned Staff: {{ booking.assignedStaff }}</v-list-item-subtitle
        >
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  props: ["booking", "id"],
};
</script>

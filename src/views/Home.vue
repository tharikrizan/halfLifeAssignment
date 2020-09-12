<template>
  <div class="home">
    <AddBookingForm />
  </div>
</template>

<script>
// @ is an alias to /src
import AddBookingForm from "@/components/AddBookingForm.vue";
export default {
  name: "Home",
  components: {
    AddBookingForm,
  },
};
</script>

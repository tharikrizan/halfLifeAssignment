import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import http from "../http-common";

Vue.use(Vuex);

//const API = process.env.LOCAL_BASE_SERVER_URL;
export default new Vuex.Store({
  state: {
    bookings: [],
  },
  mutations: {
    addBookingMutation: async (state, payload) => {
      const response = await http.post(`/bookings/`, {
        ...payload,
      });

      if (response.data.success) {
        console.log(response.data.data);
        state.bookings.push({ ...response.data.data });
      } else {
        console.log("Booking not added");
      }
    },
    getBookingsMutation: async (state) => {
      const response = await http.get(`/bookings/`);
      console.log(response);

      if (response.data.success) {
        console.log(response.data.data);
        state.bookings = response.data.data;
      }
    },
  },
  actions: {
    addBookingAction: ({ commit }, payload) => {
      commit("addBookingMutation", payload);
    },
    getBookingsAction: ({ commit }) => {
      commit("getBookingsMutation");
    },
  },
  modules: {},
});

import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const API = process.env.LOCAL_BASE_SERVER_URL + "/api/bookings";
export default new Vuex.Store({
  state: {
    bookings: [],
  },
  mutations: {
    addBookingMutation: async (state, payload) => {
      const response = await axios.post(`${API}`, {
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
      const response = await axios.get(`${API}`);

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

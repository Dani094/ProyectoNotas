import axios from "../Global/axios.js";
import { sweetPositive } from "../Global/sweetAlert2.js"

const state = {
  token: null,
};

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
  },
};

const actions = {
    async GetforIdUsers({ state }, id) {
        try {
          const response = await axios.get(`/v1/users/${id}`, {
            headers: {
              token: state.token, 
            },
          });
          if (response.data) {
            return response.data;
          }
        } catch (error) {
          console.log("No fue posible obtener el usuario", error);
        }
    },

    async PostUser({ state }, { name, email, password }) {
        try {
          const response = await axios.post(
            "/v1/users",
            {
                name,
                email,
                password,
            },
            {
              headers: {
                token: state.token,
              },
            }
          );
          if (response.data) {
            sweetPositive("Usuario creado con éxito");
          }
          return response.data;
        } catch (error) {
          console.log("Error al crear el usuario:", error);
        }
      },
};

const getters = {
  isAuthenticated: (state) => !!state.token,
};

export default {
  state,
  mutations,
  actions,
  getters,
};

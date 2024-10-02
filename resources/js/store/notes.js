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
    async GetNotesForUser({ state }, id) {
        try {
          const response = await axios.get(`/v1/notes/${id}`, {
            headers: {
              token: state.token, 
            },
          });
          if (response.data) {
            return response.data;
          }
        } catch (error) {
          console.log("No fue posible obtener las notas", error);
        }
    },

    async PostNotes({ state }, { title, description, user_id, label }) {
        try {
          const response = await axios.post(
            "/v1/notes",
            {
              title,
              description,
              user_id,
              label,
            },
            {
              headers: {
                token: state.token,
              },
            }
          );
          if (response.data) {
            sweetPositive("Nota agregada con éxito");
          }
          return response.data;
        } catch (error) {
          console.log("Error al agregar la nota:", error);
        }
      },

      async PutNotes({ state }, {id,title, description, user_id, label }) {
        try {
            const response = await axios.put(
                `/v1/notes/${id}`,
                {
                    title: title,
                    description: description,
                    user_id: user_id,
                    label: label,
                },
                {
                    headers: {
                        token: state.token,
                    },
                }
            );
            if (response.data) {
                sweetPositive("Nota actualizada con éxito");
            }
            return response.data;
        } catch (error) {
            console.log("Error al actualizar la nota:", error);
        }
    },

  async DeleteNote({ state }, id) {
    try {
      return await axios.delete(`/v1/notes/${id}`, {
        headers: {
          token: state.token,
        },
      });
    } catch (error) {
      console.error(error);
      notifyError("No fue posible eliminar el Usuario");
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

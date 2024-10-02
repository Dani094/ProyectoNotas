import {jwtDecode} from "jwt-decode";
import requestAxios from "../Global/axios.js";

export default {
    state: {
        login: "",
        token: null,
        rol: null,
        user: null,
        Name: null,
        Email: null,
        dateLogin: null,
        userId: null,
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
        },
        SET_USER_DATA(state, decoded) {
            state.rol = decoded.rol;
            state.user = decoded.userId;
            state.Name = decoded.Name;
            state.Email = decoded.Email;
        },
        SET_DATE_LOGIN(state) {
            state.dateLogin = new Date().toISOString();
        },
        RESET_USER_DATA(state) {
            state.token = null;
            state.rol = null;
            state.user = null;
            state.Name = null;
            state.Email = null;
            state.dateLogin = null;
        },
    },
    actions: {
        async newLogin({ commit }, dataUser) {
            try {
                const response = await requestAxios.post(`/v1/login`, dataUser);
                const decoded = jwtDecode(response.data.token);

                commit("SET_TOKEN", response.data.token);
                commit("SET_USER_DATA", decoded);
                commit("SET_DATE_LOGIN");

                //notifySuccess("BIENVENIDO");
                return response;
            } catch (error) {
                console.log("errrrr", error);
                //notifyError(error.response.data.msg);
                throw new Error(error);
            }
        },
        logoutUser({ commit }) {
            commit("RESET_USER_DATA");
            //notifySuccess("Se ha cerrado la sesión.");
        },
    },
    getters: {
        isAuthenticated: (state) => !!state.token,
        getUserRole: (state) => state.rol,
        getUserEmail: (state) => state.Email,
        getUserId: (state) => state.user,
    },
};

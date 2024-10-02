import { createStore } from 'vuex';
import login from '../store/login.js';
import Notes from '../store/notes.js';
import Users from '../store/users.js';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
  modules: {
    login,
    Notes,
    Users
  },
  plugins: [createPersistedState()],
});

export default store;
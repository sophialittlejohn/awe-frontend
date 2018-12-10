import Vue from 'vue';

const login = {
  namespaced: true,
  state: {
    tokens: {},
    errors: {},
    loggedIn: false,
  },
  mutations: {
    setTokens(state, payload) {
      state.tokens = payload;
    },
    setErrors(state, errors) {
      state.errors = errors;
      state.loggedIn = false;
    },
    setLoggedIn(state, payload) {
      state.loggedIn = payload;
    },
  },
  getters: {
    getErrors: state => state.errors,
    getTokens: state => state.tokens,
    getLoggedIn: state => state.loggedIn,
  },
  actions: {
    fetchTokens({ commit }, credentials) {
      return Vue.http
        .post('auth/token/', credentials)
        .then(response => {
          localStorage.setItem('accessToken', response.body.access);
          localStorage.setItem('refreshToken', response.body.refresh);
          commit('setTokens', {
            access: response.body.access,
            refresh: response.body.refresh,
          });
          commit('setLoggedIn', true);
          return response;
        })
        .catch(err => {
          console.log('in da fetchToken catch', err);
          commit('setErrors', err.body);
          commit('setLoggedIn', false);
          throw err;
        });
    },
    verifyToken({ commit, dispatch }, accessToken) {
      return Vue.http
        .post('auth/token/verify/', { token: accessToken })
        .then(() => {
          commit('setLoggedIn', true);
          return true;
        })
        .catch(err => {
          console.log('in da verifyToken catch', err);
          const refreshToken = localStorage.getItem('refreshToken');
          if (refreshToken) {
            dispatch('refreshToken', refreshToken);
          } else {
            commit('setErrors', err.body);
            commit('setLoggedIn', false);
          }
        });
    },
    refeshToken({ commit }, refToken) {
      return Vue.http
        .post('auth/token/refresh', { refresh: refToken })
        .then(response => {
          localStorage.setItem('accessToken', response.body.access);
          commit('setTokens', {
            access: response.body.access,
            refresh: refToken,
          });
          commit('setLoggedIn', true);
          return response;
        })
        .catch(err => {
          console.log('in da refeshToken catch', err);
          commit('setErrors', err.body);
          commit('setLoggedIn', false);
          throw err;
        });
    },
  },
};

export default login;

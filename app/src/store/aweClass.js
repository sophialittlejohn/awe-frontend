import Vue from 'vue';

const aweClass = {
  namespaced: true,
  state: {
    aweClass: {},
    aweClassDetail: {},
    errors: {},
  },
  mutations: {
    setAweClass(state, payload) {
      state.aweClass = payload;
    },
    setAweClassDetail(state, payload) {
      state.aweClassDetail = payload;
    },
    setErrors(state, payload) {
      state.errors = payload;
    },
  },
  actions: {
    fetchAweClasses({ commit }) {
      return Vue.http
        .get('class/', {
          Authorization: Vue.http.headers.common.Authorization,
        })
        .then(response => {
          commit('setAweClass', response.body);
          return response;
        })
        .catch(err => {
          commit('setErrors', err.body);
          return err;
        });
    },
    fetchAweClassDetail({ commit }, classId) {
      return Vue.http
        .get(`class/${classId}`, {
          Authorization: Vue.http.headers.common.Authorization,
        })
        .then(response => {
          console.log('respsone', response.body);
          commit('setAweClassDetail', response.body);
          return response;
        })
        .catch(err => {
          commit('setErrors', err.body);
          return err;
        });
    },
  },
  getters: {
    getAweClasses: state => state.aweClass,
    getAweClassDetail: state => state.aweClassDetail,
    getErrors: state => state.errors,
  },
};

export default aweClass;

import Vue from 'vue';
import Vuex from 'vuex';
import login from './login';
import students from './students';
import aweClass from './aweClass';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login,
    students,
    aweClass,
  },
});

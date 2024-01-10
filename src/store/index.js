import Vue from 'vue';
import Vuex from 'vuex';
import question from '@/store/question';
import error from '@/store/error';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    question,
    error
  }
});

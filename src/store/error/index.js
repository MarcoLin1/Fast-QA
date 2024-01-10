const error = {
  namespaced: true,
  state: {
    errorMessage: ''
  },
  getters: {
    errorMessage(state) {
      return state.errorMessage;
    }
  },
  mutations: {
    setErrorMessage(state, errorMessage) {
      state.errorMessage = errorMessage;
    }
  }
};

export default error;

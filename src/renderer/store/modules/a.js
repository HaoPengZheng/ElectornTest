const errorLog = {
  state: {
    logs: 1
  },
  mutations: {
    ADD_ERROR_LOG: (state, log) => {
      state.logs = log
    }
  },
  actions: {
    addErrorLog ({ commit }, log) {
      commit('ADD_ERROR_LOG', log)
    }
  }
}

export default errorLog

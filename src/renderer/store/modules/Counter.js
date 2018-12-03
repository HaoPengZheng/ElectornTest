const state = {
  main: 0
}

const mutations = {
  DECREMENT_MAIN_COUNTER (state) {
    state.main--
  },
  INCREMENT_MAIN_COUNTER (state) {
    state.main++
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    setTimeout(() => {
      commit('INCREMENT_MAIN_COUNTER')
    }, 1000)
  }
}

export default {
  state,
  mutations,
  actions
}

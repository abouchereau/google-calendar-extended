const store = new Vuex.Store({
    state: {
      isLoading: false
    },
    getters: {
      getIsLoading (sate) {
        return state.doneTodosCount
      }
    }
  })
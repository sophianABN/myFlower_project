export const state = () => ({
    token: null,
    user: null
  })
  
  export const mutations = {
    setToken(state, token) {
      state.token = token
    },
    setUser(state, user) {
      state.user = user
    },
    clearAuth(state) {
      state.token = null
      state.user = null
    }
  }
  
  export const actions = {
    async fetchUser({ commit, state }) {
      try {
        const response = await this.$axios.$get('/api/user/profile', {
          headers: {
            'Authorization': `Bearer ${state.token}`
          }
        })
        commit('setUser', response.user)
      } catch (error) {
        console.error('Erreur lors du chargement du profil:', error)
      }
    },

    async logout({ commit }) {
      commit('clearAuth')
      localStorage.removeItem('token')
      this.$axios.setToken(false)
    }
  }

  

  
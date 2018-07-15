import jwtDecode from 'jwt-decode'

export default {
    namespaced: true,

    state: {
        token: localStorage.getItem('token')
    },

    getters: {
        credentials (state) {
            return state.token ? jwtDecode(state.token) : null
        },

        authenticated (state, getters) {
            if (getters.credentials) {
                var expires = new Date(getters.credentials.exp * 1000)
                var now = new Date()
                return now < expires
            }
            return false
        }
    },

    mutations: {
        updateToken (state, payload) {
            localStorage.setItem('token', payload.token)
            state.token = payload.token
        },

        removeToken (state) {
            localStorage.removeItem('token')
            state.token = null
        }
    },

    actions: {
        signup ({ commit }, payload) {
            return this._vm.$api.post('accounts/signup/', payload)
                .then(response => commit('updateToken', response.data))
        },

        login ({ commit }, payload) {
            return this._vm.$api.post('/accounts/login/', payload)
                .then(response => commit('updateToken', response.data))
        },

        logout ({ commit }) {
            commit('removeToken')
        }
    }
}

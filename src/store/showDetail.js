export default {
    namespaced: true,

    state: {
        show: {}
    },

    mutations: {
        setShow (state, payload) {
            state.show = payload
            state.show.seasons = this._vm.$tmdb.seasons(payload)
            state.show.posterUrl = this._vm.$tmdb.posterUrl(payload.poster_path, 4)
        },

        clear (state) {
            state.show = {}
        }
    },

    actions: {
        get ({ commit }, payload) {
            this._vm.$tmdb.getShow(payload.id)
                .then(response => commit('setShow', response.data))
        },

        clear ({ commit }) {
            commit('clear')
        }
    }
}

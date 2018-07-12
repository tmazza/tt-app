export default {
    namespaced: true,

    state: {
        page: 1,
        shows: []
    },

    mutations: {
        addShows (state, payload) {
            state.page += 1
            state.shows = state.shows.concat(payload.results)
        }
    },

    actions: {
        get ({ commit, state }) {
            this._vm.$tmdb.getPopular(state.page)
                .then(response => commit('addShows', response.data))
        }
    }
}

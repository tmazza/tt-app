export default {
    namespaced: true,

    state: {
        populars: [],
        popularsNextPage: 1,

        progresses: []
    },

    getters: {
        progress: (state) => (id) => {
            return state.progresses.find(progress => progress.show_id === id)
        },

        available: () => (progress) => {
            if (progress.next_air_date === null) {
                return false
            }

            var today = new Date()
            var airDate = new Date(progress.next_air_date)
            return airDate <= today
        },

        availableProgresses (state, getters) {
            return state.progresses.filter(progress => getters.available(progress))
        },

        comingSoon (state, getters) {
            return state.progresses.filter(progress => {
                return !getters.available(progress) && progress.next_air_date !== null
            })
        },

        unavailableProgresses (state, getters) {
            return state.progresses.filter(progress => {
                return !getters.available(progress) && progress.next_air_date === null
            })
        }
    },

    mutations: {
        addPopulars (state, payload) {
            state.popularsNextPage += 1
            state.populars = state.populars.concat(payload.results)
        },

        setProgresses (state, payload) {
            state.progresses = payload
        },

        clear (state) {
            state.progresses = []
        }
    },

    actions: {
        /**
        * Get popular shows by page from TMDb.
        */
        getPopulars ({ commit, state }) {
            this._vm.$tmdb.getPopulars(state.popularsNextPage)
                .then(response => commit('addPopulars', response.data))
        },

        /**
        * Get all progresses from TT.
        */
        getProgresses ({ commit }) {
            this._vm.$api.get('tmdb/progresses/')
                .then(response => commit('setProgresses', response.data))
        },

        /**
        * Create a new progress to TT.
        */
        createProgress ({ dispatch }, payload) {
            this._vm.$api.post('tmdb/progresses/', payload)
                .then(() => dispatch('getProgresses'))
        },

        /**
        * Update a progress by ID from TT.
        */
        updateProgress ({ dispatch }, payload) {
            this._vm.$api.patch('tmdb/progresses/' + payload.id + '/', payload.data)
                .then(() => dispatch('getProgresses'))
        },

        /**
        * Delete a progress by ID from TT.
        */
        deleteProgress ({ dispatch }, payload) {
            this._vm.$api.delete('tmdb/progresses/' + payload.id + '/')
                .then(() => dispatch('getProgresses'))
        },

        clear ({ commit }) {
            commit('clear')
        }
    }
}

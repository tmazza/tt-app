export default {
    namespaced: true,

    actions: {
        updateEmail ({ commit }, payload) {
            return this._vm.$api.put('accounts/email/', payload)
                .then(response => commit('auth/updateToken', response.data, { root: true }))
        },

        updatePassword ({ commit }, payload) {
            return this._vm.$api.put('accounts/password/', payload)
        }
    }
}

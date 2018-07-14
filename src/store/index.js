import Vue from 'vue'
import Vuex from 'vuex'

import auth from '@/store/auth'
import credentials from '@/store/credentials'
import shows from '@/store/shows'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',

    modules: {
        auth,
        credentials,
        shows
    }
})

import Vue from 'vue'
import Vuex from 'vuex'

import auth from '@/store/auth'
import credentials from '@/store/credentials'
import showDetail from '@/store/showDetail'
import showsPopular from '@/store/showsPopular'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',

    modules: {
        auth: auth,
        credentials: credentials,
        showDetail: showDetail,
        showsPopular: showsPopular
    }
})

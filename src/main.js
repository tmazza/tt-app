import Vue from 'vue'

import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

import APIPlugin from '@/plugins/APIPlugin'
import TMDBPlugin from '@/plugins/TMDBPlugin'

Vue.config.productionTip = false

Vue.use(APIPlugin)
Vue.use(TMDBPlugin)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

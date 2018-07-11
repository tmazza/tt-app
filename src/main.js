import Vue from 'vue'

import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

import APIPlugin from '@/plugins/APIPlugin'
import FormPlugin from '@/plugins/FormPlugin'
import TMDBPlugin from '@/plugins/TMDBPlugin'

Vue.config.productionTip = false

Vue.use(APIPlugin)
Vue.use(FormPlugin)
Vue.use(TMDBPlugin)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

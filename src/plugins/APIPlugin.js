import axios from 'axios'

import store from '@/store'

export default {
    install (Vue, options) {
        Vue.prototype.$api = {
            get (url) {
                return axios.get(url, this.getConfig())
            },

            post (url, data) {
                return axios.post(url, data, this.getConfig())
            },

            put (url, data) {
                return axios.put(url, data, this.getConfig())
            },

            patch (url, data) {
                return axios.patch(url, data, this.getConfig())
            },

            delete (url) {
                return axios.delete(url, this.getConfig())
            },

            getConfig () {
                return {
                    baseURL: this.getBaseUrl(),
                    headers: {
                        'Authorization': this.getAuthHeader()
                    }
                }
            },

            getBaseUrl () {
                return process.env.VUE_APP_API_URL
            },

            getAuthHeader () {
                var token = store.state.auth.token
                return token ? 'JWT ' + token : ''
            }
        }
    }
}

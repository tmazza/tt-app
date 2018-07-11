import axios from 'axios'

export default {
    install (Vue, options) {
        Vue.prototype.$tmdb = {
            apiKey: 'cc520153f9a9b1a497c9a854cb7b3200',

            urls: {
                popular: 'https://api.themoviedb.org/3/tv/popular'
            },

            get (url, params) {
                params = params || {}
                params.api_key = this.apiKey
                return axios.get(this.urls[url], { params: params })
            }
        }
    }
}

// import axios from 'axios'

export default {
    install (Vue, options) {
        Vue.prototype.$tmdb = {
            apiKey: 'cc520153f9a9b1a497c9a854cb7b3200',

            baseApiUrl: 'https://api.themoviedb.org/3'
        }
    }
}

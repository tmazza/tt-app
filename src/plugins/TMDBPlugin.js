import axios from 'axios'

export default {
    install (Vue, options) {
        Vue.prototype.$tmdb = {
            apiKey: 'cc520153f9a9b1a497c9a854cb7b3200',

            urls: {
                detail: 'https://api.themoviedb.org/3/tv',
                popular: 'https://api.themoviedb.org/3/tv/popular',
                poster: 'https://image.tmdb.org/t/p/'
            },

            posterWidths: [
                'original',
                'w92',
                'w154',
                'w185',
                'w342',
                'w500',
                'w780'
            ],

            get (url, queryParams) {
                queryParams = queryParams || {}
                queryParams.api_key = this.apiKey
                return axios.get(url, { params: queryParams })
            },

            getPopular (page) {
                return this.get(this.urls['popular'], { page: page })
            },

            getShow (id) {
                return this.get(this.urls['detail'] + '/' + id)
            },

            getEpisode (showId, season, episode) {
                return this.get(this.urls['detail'] + '/' + showId + '/season/' + season + '/episode/' + episode)
            },

            posterUrl (path, size) {
                if (path) {
                    size = size || 0
                    return this.urls['poster'] + this.posterWidths[size] + path
                }
            },

            seasons (show) {
                // Return the actual seasons of the show. The TMDB API may also
                // return the especial seasons as the first ones in the list.
                return show.seasons.slice(show.seasons.length - show.number_of_seasons)
            },

            nextEpisode (show, season, episode) {
                var seasons = this.seasons(show)
                if (season && episode) {
                    if (episode < seasons[season - 1].episode_count) {
                        // Not the last episode in season.
                        return { season: season, episode: episode + 1 }
                    } else if (season < seasons.length) {
                        // Not the last season.
                        return { season: season + 1, episode: 1 }
                    } else {
                        return null
                    }
                } else {
                    return { season: 1, episode: 1 }
                }
            },

            episodeIsAvailable (showId, season, episode) {
                this.getEpisode(showId, season, episode)
                    .then(response => {
                        console.log(response.data)
                    })
                    .catch(error => {
                        console.log(error.response.data)
                    })
            }
        }
    }
}

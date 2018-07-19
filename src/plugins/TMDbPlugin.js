import axios from 'axios'

export default {
    install (Vue, options) {
        Vue.prototype.$tmdb = {
            apiKey: process.env.VUE_APP_TMDB_API_KEY,

            urls: {
                detail: 'https://api.themoviedb.org/3/tv',
                popular: 'https://api.themoviedb.org/3/tv/popular',
                search: 'https://api.themoviedb.org/3/search/tv',
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

            statuses: {
                'Returning Series': 'returning',
                'Planned': 'planned',
                'In Production': 'in_production',
                'Ended': 'ended',
                'Canceled': 'canceled',
                'Pilot': 'pilot'
            },

            get (url, queryParams) {
                queryParams = queryParams || {}
                queryParams.api_key = this.apiKey
                return axios.get(url, { params: queryParams })
            },

            search (name) {
                return this.get(this.urls.search, { query: name })
            },

            getPopulars (page) {
                return this.get(this.urls.popular, { page: page })
            },

            getShow (id) {
                return this.get(this.urls.detail + '/' + id)
            },

            getEpisode (showId, season, episode) {
                return this.get(this.urls.detail + '/' + showId + '/season/' + season + '/episode/' + episode)
            },

            posterUrl (path, size) {
                if (path) {
                    size = size || 0
                    return this.urls.poster + this.posterWidths[size] + path
                }
            },

            status (show) {
                return this.statuses[show.status]
            },

            seasons (show) {
                // Retrieve only the actual seasons of the show. The TMDB API
                // may also return the especial seasons as the first ones in the
                // list.
                var seasons = show.seasons.slice(show.seasons.length - show.number_of_seasons)

                // Remove the last season if there is no episode.
                if (seasons[seasons.length - 1].episode_count === 0) {
                    seasons = seasons.slice(0, seasons.length - 1)
                }

                return seasons
            },

            nextEpisode (seasons, season, episode) {
                if (season && episode) {
                    if (episode < seasons[season - 1].episode_count) {
                        // Not the last episode in season.
                        return { season: season, episode: episode + 1 }
                    } else if (season < seasons.length) {
                        // Not the last season.
                        return { season: season + 1, episode: 1 }
                    } else {
                        return { season: null, episode: null }
                    }
                } else {
                    return { season: 1, episode: 1 }
                }
            }
        }
    }
}

<template>
    <div class="card">
        <img :src="posterUrl">
        <div>
            {{ progress.show_name }}<br>
            Current: S{{ progress.current_season }} E{{ progress.current_episode }}<br>
            <div v-if="progress.next_season && progress.next_episode">
                Next: S{{ progress.next_season }} E{{ progress.next_episode }}
                <span v-if="progress.next_air_date">
                     - {{ progress.next_air_date }}
                </span>
            </div>
            <button @click="remove">Remove</button>
            <button @click="open">Details</button>
            <button v-if="available" @click="next">Next</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        progress: {
            type: Object
        }
    },

    data () {
        return {
            show: undefined
        }
    },

    computed: {
        posterUrl () {
            return this.$tmdb.posterUrl(this.progress.show_poster_path, 2)
        },

        available () {
            if (!this.progress.next_air_date) {
                return false
            }
            var today = new Date()
            var nextAirDate = new Date(this.progress.next_air_date)
            return nextAirDate <= today
        }
    },

    mounted () {
        this.checkNextEpisode()
    },

    methods: {
        checkNextEpisode () {
            var showId = this.progress.show_id
            var nextSeason = this.progress.next_season
            var nextEpisode = this.progress.next_episode
            var payload = {
                id: this.progress.show_id,
                data: {}
            }

            if (!nextSeason || !nextEpisode) {
                this.getShow().then(() => {
                    var seasons = this.show.seasons
                    var currentSeason = this.progress.current_season
                    var currentEpisode = this.progress.current_episode
                    var next = this.$tmdb.nextEpisode(seasons, currentSeason, currentEpisode)

                    if (next.season && next.episode) {
                        payload.data.next_season = next.season
                        payload.data.next_episode = next.episode

                        if (this.progress.show_poster_path !== this.show.poster_path) {
                            payload.data.show_poster_path = this.show.poster_path
                        }

                        this.$tmdb.getEpisode(showId, next.season, next.episode).then(response => {
                            if (response.data.air_date) {
                                payload.data.next_air_date = response.data.air_date
                            }
                            this.$store.dispatch('shows/updateProgress', payload)
                        })
                    }
                })
            } else if (!this.progress.next_air_date) {
                this.$tmdb.getEpisode(showId, nextSeason, nextEpisode).then(response => {
                    if (response.data.air_date) {
                        payload.data.next_air_date = response.data.air_date
                        this.$store.dispatch('shows/updateProgress', payload)
                    }
                })
            }
        },

        next () {
            var showId = this.progress.show_id
            var payload = {
                id: this.progress.show_id,
                data: {
                    current_season: this.progress.next_season,
                    current_episode: this.progress.next_episode,
                    next_air_date: null
                }
            }

            this.getShow().then(() => {
                var seasons = this.show.seasons
                var currentSeason = payload.data.current_season
                var currentEpisode = payload.data.current_episode
                var next = this.$tmdb.nextEpisode(seasons, currentSeason, currentEpisode)

                payload.data.next_season = next.season
                payload.data.next_episode = next.episode

                if (next.season && next.episode) {
                    this.$tmdb.getEpisode(showId, next.season, next.episode).then(response => {
                        payload.data.next_air_date = response.data.air_date
                        this.$store.dispatch('shows/updateProgress', payload)
                    })
                } else {
                    this.$store.dispatch('shows/updateProgress', payload)
                }
            })
        },

        getShow () {
            return new Promise((resolve, reject) => {
                if (this.show) {
                    resolve()
                } else {
                    this.$tmdb.getShow(this.progress.show_id)
                        .then(response => {
                            this.show = response.data
                            this.show.seasons = this.$tmdb.seasons(response.data)
                            resolve()
                        })
                        .catch(error => reject(error))
                }
            })
        },

        open () {
            this.$router.push({ name: 'showDetail', params: { id: this.progress.show_id } })
        },

        remove () {
            this.$store.dispatch('shows/deleteProgress', { id: this.progress.show_id })
        }
    }
}
</script>

<style scoped>
.card { display: flex; }
</style>

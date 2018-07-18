<template>
    <div class="card">
        <img :src="posterUrl" @click="open">
        <div class="card-right">
            <h5>{{ progress.show_name }}</h5>

            <span v-if="!loading">
                Status: {{ progress.show_status_text }}
            </span>

            <div v-if="!loading" class="episodes">
                <div class="episodes-left">
                    <div v-if="progress.current_season && progress.current_episode">
                        Current:
                    </div>

                    <div v-if="progress.next_season && progress.next_episode">
                        Next:
                    </div>
                </div>

                <div class="episodes-right">
                    <div v-if="progress.current_season && progress.current_episode">
                        S{{ progress.current_season }} E{{ progress.current_episode }}
                    </div>

                    <div v-if="progress.next_season && progress.next_episode">
                        S{{ progress.next_season }} E{{ progress.next_episode }}
                        <span v-if="progress.next_air_date">
                             - {{ progress.next_air_date }}
                        </span>
                    </div>
                </div>
            </div>

            <div v-if="!loading" class="card-buttons">
                <a class="card-button" @click="unfollow">unfollow</a>
                <div class="card-buttons-right">
                    <a class="card-button" @click="open">details</a>
                    <a v-if="available" class="card-button" @click="next">next</a>
                </div>
            </div>

            <Loader v-if="loading" class="loader"/>
        </div>
    </div>
</template>

<script>
import Loader from '@/components/Loader'

export default {
    components: {
        Loader
    },

    props: {
        progress: {
            type: Object
        }
    },

    data () {
        return {
            loading: true,
            show: undefined
        }
    },

    computed: {
        posterUrl () {
            return this.$tmdb.posterUrl(this.progress.show_poster_path, 2)
        },

        available () {
            if (this.progress.next_air_date === null) {
                return false
            }
            var today = new Date()
            var nextAirDate = new Date(this.progress.next_air_date)
            return nextAirDate <= today
        }
    },

    mounted () {
        if (!this.escapeEpisodeCheck()) {
            this.checkNextEpisode()
        } else {
            this.hideLoader()
        }
    },

    methods: {
        escapeEpisodeCheck () {
            // Escape if the show was updated within 30 minutes.
            var now = new Date()
            var lastUpdated = new Date(this.progress.updated)
            if ((now - lastUpdated) / (1000 * 60) <= 30) {
                return true
            }

            // Or when the show is ended/canceled and the next episode air date
            // is missing.
            var hasNextAirDate = this.progress.next_air_date !== null
            var endedOrCanceled = ['ended', 'canceled'].includes(this.progress.show_status)
            return !hasNextAirDate && endedOrCanceled
        },

        checkNextEpisode () {
            var showId = this.progress.show_id
            var nextSeason = this.progress.next_season
            var nextEpisode = this.progress.next_episode
            var payload = this.initPayload(false)

            if (!nextSeason || !nextEpisode) { // next episode is missing
                this.getShow().then(() => {
                    var next = this.getNextEpisode(false)
                    if (next.season && next.episode) { // next episode info is available from TMDb
                        this.$tmdb.getEpisode(showId, next.season, next.episode).then(response => {
                            if (response.data.air_date) {
                                this.updatePayload(payload, next.season, next.episode, response.data.air_date)
                            } else {
                                this.updatePayload(payload, next.season, next.episode, false)
                            }
                            this.sendPayload(payload)
                        })
                    } else {
                        this.hideLoader()
                    }
                })
            } else if (this.progress.next_air_date === null) { // only next episode air date is missing
                this.$tmdb.getEpisode(showId, nextSeason, nextEpisode).then(response => {
                    if (response.data.air_date) {
                        this.updatePayload(payload, false, false, response.data.air_date)
                        this.sendPayload(payload)
                    } else {
                        this.hideLoader()
                    }
                })
            } else {
                this.hideLoader()
            }
        },

        next () {
            this.showLoader()

            var payload = this.initPayload(true)
            this.getShow().then(() => {
                var next = this.getNextEpisode(true)
                if (next.season && next.episode) {
                    this.$tmdb.getEpisode(this.progress.show_id, next.season, next.episode).then(response => {
                        this.updatePayload(payload, next.season, next.episode, response.data.air_date)
                        this.sendPayload(payload)
                    })
                } else {
                    this.sendPayload(payload)
                }
            })
        },

        initPayload (next) {
            var payload = {
                id: this.progress.show_id,
                data: {}
            }
            if (next) {
                payload.data.current_season = this.progress.next_season
                payload.data.current_episode = this.progress.next_episode
                payload.data.next_season = null
                payload.data.next_episode = null
                payload.data.next_air_date = null
            }
            return payload
        },

        updatePayload (payload, nextSeason, nextEpisode, nextAirDate) {
            if (nextSeason && nextEpisode) {
                payload.data.next_season = nextSeason
                payload.data.next_episode = nextEpisode
            }

            if (nextAirDate) {
                payload.data.next_air_date = nextAirDate
            }

            // This function may be called without calling `getShow`, so `this.show`
            // can be undefined.
            if (this.show) {
                if (this.progress.show_poster_path !== this.show.poster_path) {
                    payload.data.show_poster_path = this.show.poster_path
                }

                if (this.progress.show_status !== this.$tmdb.status(this.show)) {
                    payload.data.show_status = this.$tmdb.status(this.show)
                }
            }
        },

        sendPayload (payload) {
            this.$store.dispatch('shows/updateProgress', payload).then(this.hideLoader)
        },

        getNextEpisode (next) {
            var seasons = this.show.seasons
            var currentSeason = next ? this.progress.next_season : this.progress.current_season
            var currentEpisode = next ? this.progress.next_episode : this.progress.current_episode
            return this.$tmdb.nextEpisode(seasons, currentSeason, currentEpisode)
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

        showLoader () {
            this.loading = true
        },

        hideLoader () {
            this.loading = false
        },

        open () {
            this.$router.push({ name: 'showDetail', params: { id: this.progress.show_id } })
        },

        unfollow () {
            this.showLoader()
            this.$store.dispatch('shows/deleteProgress', { id: this.progress.show_id })
        }
    }
}
</script>

<style scoped>
.card {
    display: flex;
    margin: 0 auto 20px;
    max-width: 600px;
    border: 1px solid #bbb;
    border-radius: 3px;
}

.card img { cursor: pointer; }

.card .card-right {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: space-between;
    padding: 8px 16px;
}

.card .card-right h5 { margin: 0; }

.card .card-right .episodes { display: flex; }

.card .card-right .episodes .episodes-left { text-align: right; }

.card .card-right .episodes .episodes-right {
    flex-grow: 1;
    padding-left: 10px;
}

.card .card-right .card-buttons { display: flex; }

.card .card-right .card-buttons .card-button {
    margin: 0 8px;
    padding: 8px 0;
    cursor: pointer;
}

.card .card-right .card-buttons .card-button:first-child { margin-left: 0; }

.card .card-right .card-buttons .card-button:last-child { margin-right: 0; }

.card .card-right .card-buttons .card-buttons-right {
    display: flex;
    flex-grow: 1;
    justify-content: flex-end;
}

.card .card-right .loader { flex-grow: 1; }
</style>

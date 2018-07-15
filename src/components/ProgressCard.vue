<template>
    <div class="card">
        <img :src="posterUrl">
        <div class="card-right">
            <h5>{{ progress.show_name }}</h5>

            <div class="episodes">
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

            <div class="card-buttons">
                <a class="card-button" @click="unfollow">unfollow</a>
                <div class="card-buttons-right">
                    <a class="card-button" @click="open">details</a>
                    <a v-if="available" class="card-button" @click="next">next</a>
                </div>
            </div>
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

        unfollow () {
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
</style>

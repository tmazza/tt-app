<template>
    <div>
        <div v-for="season in seasons" :key="season.id" class="season">
            <div class="number">
                S{{ season.season_number }}:
            </div>

            <div class="episodes">
                <span v-for="episode in season.episode_count"
                      class="selector"
                      :key="episode.id"
                      :class="{
                          disabled: disabled || loading,
                          selected: selected(season.season_number, episode)
                      }"
                      @click="select(season.season_number, episode)">
                    {{ episode }}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        showId: {
            type: Number
        },

        seasons: {
            type: Array
        },

        currentSeason: {
            type: Number
        },

        currentEpisode: {
            type: Number
        },

        disabled: {
            type: Boolean
        }
    },

    data () {
        return {
            loading: false
        }
    },

    methods: {
        selected (season, episode) {
            return (season === this.currentSeason && episode <= this.currentEpisode) ||
                (season < this.currentSeason)
        },

        select (season, episode) {
            if (this.disabled || this.loading) {
                return
            }

            this.startLoading()

            var payload = {
                id: this.showId,
                data: {
                    current_season: 0,
                    current_episode: 0,
                    next_season: 1,
                    next_episode: 1,
                    next_air_date: null
                }
            }

            if (season === this.currentSeason && episode === this.currentEpisode) {
                this.updateProgress(payload)
            } else {
                this.$tmdb.getEpisode(this.showId, season, episode).then(response => {
                    var today = new Date()
                    var airDate = new Date(response.data.air_date)
                    if (airDate > today) {
                        this.finishLoading()
                        return
                    }

                    var next = this.$tmdb.nextEpisode(this.seasons, season, episode)
                    payload.data.current_season = season
                    payload.data.current_episode = episode
                    payload.data.next_season = next.season
                    payload.data.next_episode = next.episode

                    this.updateProgress(payload)
                })
            }
        },

        updateProgress (payload) {
            if (payload.data.next_season && payload.data.next_episode) {
                var season = payload.data.next_season
                var episode = payload.data.next_episode

                this.$tmdb.getEpisode(this.showId, season, episode).then(response => {
                    payload.data.next_air_date = response.data.air_date
                    this.sendPayload(payload)
                })
            } else {
                this.sendPayload(payload)
            }
        },

        sendPayload (payload) {
            this.$store.dispatch('shows/updateProgress', payload).then(this.finishLoading)
        },

        startLoading () {
            this.loading = true
        },

        finishLoading () {
            this.loading = false
        }
    }
}
</script>

<style socped>
.season {
    display: flex;
    margin-bottom: 6px;
}

.season .number { flex-basis: 32px; }

.season .episodes {
    flex-basis: 794px;
    flex-grow: 1;
}

.season .episodes .selector {
    display: inline-block;
    margin: 0 4px 6px;
    width: 24px;
    text-align: center;
    border: 1px solid #bbb;
    border-radius: 3px;
    cursor: pointer;
}

.season .episodes .disabled {
    color: #bbb;
    cursor: not-allowed;
}

.season .episodes .selected {
    color: white;
    background-color: #33C3F0;
    border-color: #33C3F0;
}
</style>

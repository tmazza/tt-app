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

        <Modal v-if="showModal" v-on:close="closeModal">
            {{ modalText }}
        </Modal>
    </div>
</template>

<script>
import Modal from '@/components/Modal'

export default {
    components: {
        Modal
    },

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
            loading: false,
            showModal: false,
            modalText: ''
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
                    var airDate = response.data.air_date ? new Date(response.data.air_date) : null
                    if (airDate === null || airDate > today) {
                        this.finishLoading()
                        this.openModal(airDate)
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
        },

        openModal (date) {
            if (date !== null) {
                this.modalText = 'This episode will be available at ' + this.formatDate(date) + '.'
            } else {
                this.modalText = 'This episode is not available, yet.'
            }
            this.showModal = true
        },

        closeModal () {
            this.showModal = false
            this.modalText = ''
        },

        formatDate (date) {
            var year = date.getFullYear()

            var month = date.getMonth() + 1 + ''
            month = month.length === 2 ? month : ('0' + month)

            var day = date.getDate() + ''
            day = day.length === 2 ? day : ('0' + day)

            return year + '/' + month + '/' + day
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

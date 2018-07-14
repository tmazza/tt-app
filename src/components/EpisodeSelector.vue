<template>
    <div>
        <div v-for="season in seasons" :key="season.id">
            Season {{ season.season_number }}:
            <button v-for="episode in season.episode_count"
                    :key="episode.id"
                    :class="{ watched: watched(season.season_number, episode) }"
                    :disabled="disabled"
                    @click="select(season.season_number, episode)">
                {{ episode }}
            </button>
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

    methods: {
        watched (season, episode) {
            return (season === this.currentSeason && episode <= this.currentEpisode) ||
                (season < this.currentSeason)
        },

        select (season, episode) {
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
                    this.$store.dispatch('shows/updateProgress', payload)
                })
            } else {
                this.$store.dispatch('shows/updateProgress', payload)
            }
        }
    }
}
</script>

<style socped>
.watched { background-color: green; }
</style>

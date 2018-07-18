<template>
    <div id="show-detail-container">
        <div id="poster-container">
            <img :src="posterUrl">
        </div>

        <div class="right-content">
            <h3>{{ this.show.original_name }}</h3>

            <p>Status: {{ this.show.status }}</p>

            <p>{{ this.show.overview }}</p>

            <div v-if="!loading" class="buttons">
                <button v-if="!progress" class="button-primary" @click="follow">
                    Follow
                </button>

                <button v-if="progress" class="button" @click="unfollow">
                    Unfollow
                </button>
            </div>

            <EpisodeSelector v-if="!loading"
                             :show-id="showId"
                             :seasons="seasons"
                             :current-season="currentSeason"
                             :current-episode="currentEpisode"
                             :disabled="progress === undefined"/>

            <Loader v-if="loading"/>
        </div>
    </div>
</template>

<script>
import EpisodeSelector from '@/components/EpisodeSelector'
import Loader from '@/components/Loader'

export default {
    components: {
        EpisodeSelector,
        Loader
    },

    data () {
        return {
            loading: false,
            showId: Number(this.$route.params.id),
            show: {}
        }
    },

    computed: {
        posterUrl () {
            return this.$tmdb.posterUrl(this.show.poster_path, 4)
        },

        seasons () {
            if (this.show.seasons) {
                return this.$tmdb.seasons(this.show)
            }
            return []
        },

        progress () {
            return this.$store.getters['shows/progress'](this.showId)
        },

        currentSeason () {
            return this.progress ? this.progress.current_season : 0
        },

        currentEpisode () {
            return this.progress ? this.progress.current_episode : 0
        }
    },

    mounted () {
        this.getShowDetail()
    },

    methods: {
        getShowDetail () {
            this.$tmdb.getShow(this.showId).then(response => {
                this.show = response.data

                if (this.progress) {
                    var payload = {
                        id: this.showId,
                        data: {}
                    }

                    if (this.progress.show_poster_path !== this.show.poster_path) {
                        payload.data.show_poster_path = this.show.poster_path
                    }

                    if (this.progress.show_status !== this.$tmdb.status(this.show)) {
                        payload.data.show_status = this.$tmdb.status(this.show)
                    }

                    if (Object.keys(payload.data)) {
                        this.$store.dispatch('shows/updateProgress', payload)
                    }
                }
            })
        },

        follow () {
            if (!this.$store.getters['auth/authenticated']) {
                this.$router.push({ name: 'signup', query: { next: this.$route.path } })
            } else {
                this.createProgress()
            }
        },

        unfollow () {
            this.deleteProgress()
        },

        createProgress () {
            this.startLoading()

            this.$tmdb.getEpisode(this.showId, 1, 1).then(response => {
                var payload = {
                    show_id: this.showId,
                    show_name: this.show.original_name,
                    show_poster_path: this.show.poster_path,
                    show_status: this.$tmdb.status(this.show),
                    next_air_date: response.data.air_date
                }
                this.$store.dispatch('shows/createProgress', payload).then(this.finishLoading)
            })
        },

        deleteProgress () {
            this.startLoading()
            this.$store.dispatch('shows/deleteProgress', { id: this.showId }).then(this.finishLoading)
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
#show-detail-container {
    display: flex;
    margin: 0 auto;
    max-width: 1200px;
}

#show-detail-container .right-content { padding-left: 32px; }

#show-detail-container .right-content .buttons { margin-bottom: 25px; }

#poster-container { max-width: 342px; }

#poster-container img { border-radius: 3px; }
</style>

<template>
    <div>
        <h4>Available</h4>
        <p v-if="available.length === 0">
            No available episode left to watch.
        </p>
        <div v-for="progress in available" :key="progress.show_id">
            <ProgressCard :progress="progress"/>
        </div>

        <h4>Coming Soon</h4>
        <p v-if="comingSoon.length === 0">
            No episode coming soon.
        </p>
        <div v-for="progress in comingSoon" :key="progress.show_id">
            <ProgressCard :progress="progress"/>
        </div>

        <h4>Unavailable</h4>
        <p v-if="unavailable.length === 0">
            No unavailable episode.
        </p>
        <div v-for="progress in unavailable" :key="progress.show_id">
            <ProgressCard :progress="progress"/>
        </div>

        <Loader v-if="loadingProgresses" class="loader" :fullscreen="true"/>
    </div>
</template>

<script>
import Loader from '@/components/Loader'
import ProgressCard from '@/components/ProgressCard'

export default {
    components: {
        Loader,
        ProgressCard
    },

    computed: {
        loadingProgresses () {
            return this.$store.state.shows.loadingProgresses
        },

        available () {
            return this.$store.getters['shows/availableProgresses']
        },

        comingSoon () {
            return this.$store.getters['shows/comingSoon']
        },

        unavailable () {
            return this.$store.getters['shows/unavailableProgresses']
        }
    }
}
</script>

<style scoped>
h4, p { text-align: center; }

h4 { margin-top: 44px; }

h4:first-child { margin-top: 0; }

p { color: #1EAEDB; }

.loader { top: 50px; }
</style>

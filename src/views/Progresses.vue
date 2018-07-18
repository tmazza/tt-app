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
    </div>
</template>

<script>
import ProgressCard from '@/components/ProgressCard'

export default {
    components: {
        ProgressCard
    },

    computed: {
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

p { color: #1EAEDB; }
</style>

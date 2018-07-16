<template>
    <div>
        <h4>Available</h4>
        <div v-for="progress in available" :key="progress.id">
            <ProgressCard :progress="progress"/>
        </div>

        <h4>Coming Soon</h4>
        <div v-for="progress in comingSoon" :key="progress.id">
            <ProgressCard :progress="progress"/>
        </div>

        <h4>Unavailable</h4>
        <div v-for="progress in unavailable" :key="progress.id">
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
h4 { text-align: center; }
</style>

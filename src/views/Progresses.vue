<template>
    <div>
        <div v-for="progress in progresses" :key="progress.id">
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
        progresses () {
            return this.$store.state.shows.progresses
        }
    }
}
</script>

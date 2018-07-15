<template>
    <div class="poster-card-list">
        <div v-for="show in shows" :key="show.id" class="card-wrapper">
            <PosterCard :show="show"/>
        </div>
    </div>
</template>

<script>
import PosterCard from '@/components/PosterCard'

export default {
    components: {
        PosterCard
    },

    props: {
        shows: {
            type: Array
        }
    }
}
</script>

<style scoped>
.poster-card-list { text-align: center; }

.card-wrapper { display: inline-block; }
</style>

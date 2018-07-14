<template>
    <div>
        <h2>Popular Shows</h2>

        <PosterCardList :shows="shows"/>

        <button @click="getShows">More</button>
    </div>
</template>

<script>
import PosterCardList from '@/components/PosterCardList'

export default {
    components: {
        PosterCardList
    },

    computed: {
        shows () {
            return this.$store.state.shows.populars
        }
    },

    mounted () {
        if (this.$store.state.shows.popularsNextPage === 1) {
            this.getShows()
        }
    },

    methods: {
        getShows () {
            this.$store.dispatch('shows/getPopulars')
        }
    }
}
</script>

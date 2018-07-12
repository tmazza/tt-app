<template>
    <div>
        <h2>Popular Shows</h2>

        <PosterCardList :shows="shows"/>
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
            return this.$store.state.showsPopular.shows
        }
    },

    mounted () {
        if (this.$store.state.showsPopular.page === 1) {
            this.getData()
        }
    },

    methods: {
        getData () {
            this.$store.dispatch('showsPopular/get')
        }
    }
}
</script>

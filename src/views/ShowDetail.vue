<template>
    <div id="show-detail-container">
        <div id="poster-container">
            <img :src="show.posterUrl">
        </div>

        <div>
            <h2>{{ show.original_name }}</h2>
            <p>{{ show.overview }}</p>
            <div v-for="season in show.seasons" :key="season.id">
                {{ season }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        show () {
            return this.$store.state.showDetail.show
        }
    },

    mounted () {
        this.getData()
    },

    destroyed () {
        this.clear()
    },

    methods: {
        getData () {
            this.$store.dispatch('showDetail/get', { id: this.$route.params.id })
        },

        clear () {
            this.$store.dispatch('showDetail/clear')
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

#poster-container { max-width: 342px; }
</style>

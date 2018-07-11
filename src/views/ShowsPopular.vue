<template>
    <div>
        <h2>Popular Shows</h2>

        <p v-for="show in shows" :key="show.id">
            ID: {{ show.id }}<br>
            Name: {{ show.original_name }}
        </p>
    </div>
</template>

<script>
export default {
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

<template>
    <div>
        <form @submit.prevent="search">
            <input v-model="name" ref="searchinput" type="text">
            <input class="button-primary" type="submit" value="Search">
        </form>
        <PosterCardList :shows="shows"/>
    </div>
</template>

<script>
import PosterCardList from '@/components/PosterCardList'

export default {
    components: {
        PosterCardList
    },

    data () {
        return {
            name: ''
        }
    },

    computed: {
        shows () {
            return this.$store.state.shows.searchResult
        }
    },

    mounted () {
        this.focusInput()
    },

    methods: {
        focusInput () {
            this.$refs.searchinput.focus()
        },

        search () {
            if (this.name) {
                this.$store.dispatch('shows/search', { name: this.name })
            } else {
                this.$store.dispatch('shows/clearSearchResult')
            }
        }
    }
}
</script>

<style scoped>
form { display: flex; }

form input:first-child { flex-grow: 1; }

form input:last-child { margin-left: 8px; }
</style>

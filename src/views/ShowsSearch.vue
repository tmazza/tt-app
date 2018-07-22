<template>
    <div>
        <form @submit.prevent="search">
            <input v-model="name" ref="searchinput" type="text">
            <input class="button-primary" type="submit" value="Search">
        </form>
        <PosterCardList :shows="shows"/>
        <Loader v-if="searching" :fullscreen="true"/>
    </div>
</template>

<script>
import Loader from '@/components/Loader'
import PosterCardList from '@/components/PosterCardList'

export default {
    components: {
        Loader,
        PosterCardList
    },

    data () {
        return {
            searching: false,
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
                this.searching = true
                this.$store.dispatch('shows/search', { name: this.name })
                    .then(() => { this.searching = false })
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

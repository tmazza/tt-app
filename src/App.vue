<template>
    <div id="app">
        <Header/>
        <router-view/>
    </div>
</template>

<script>
import Header from '@/components/Header'

export default {
    components: {
        Header
    },

    mounted () {
        this.getProgresses()
    },

    methods: {
        getProgresses () {
            this.$store.dispatch('shows/getProgresses')
        }
    }
}
</script>

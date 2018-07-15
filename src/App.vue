<template>
    <div id="app">
        <Header id="header"/>
        <div id="main-container" class="tt-container">
            <router-view/>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header'

export default {
    components: {
        Header
    },

    mounted () {
        if (this.$store.getters['auth/authenticated']) {
            this.getProgresses()
        }
    },

    methods: {
        getProgresses () {
            this.$store.dispatch('shows/getProgresses')
        }
    }
}
</script>

<style>
body { margin: 0 8px; }

form {
    margin: 0 auto;
    max-width: 400px;
}

#header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
}

#main-container { padding: 80px 0; }

.tt-container {
    margin: 0 auto;
    max-width: 1200px;
}
</style>

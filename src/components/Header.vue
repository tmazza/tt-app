<template>
    <div>
        <router-link v-if="isAuthenticated" to="/progresses">My Progresses</router-link> |
        <router-link to="/shows/popular">Popular Shows</router-link> |
        <router-link v-if="isAuthenticated" to="/credentials">Credentials</router-link> |
        <a v-if="isAuthenticated" @click="logout">Logout</a> |
        <strong v-if="isAuthenticated">{{ email }}</strong>

        <router-link v-if="!isAuthenticated" to="/signup">Signup</router-link> |
        <router-link v-if="!isAuthenticated" to="/login">Login</router-link>
    </div>
</template>

<script>
export default {
    computed: {
        isAuthenticated () {
            return this.$store.getters['auth/isAuthenticated']
        },

        email () {
            var credentials = this.$store.getters['auth/credentials']
            if (credentials) {
                return credentials.email
            }
            return ''
        }
    },

    methods: {
        logout () {
            this.$store.dispatch('auth/logout')
            this.$router.push({ name: 'login' })
        }
    }
}
</script>

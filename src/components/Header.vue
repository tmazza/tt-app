<template>
    <div>
        <router-link to="/">Home</router-link> |
        <router-link to="/shows/mine">My Shows</router-link> |
        <router-link to="/shows/popular">Popular Shows</router-link> |
        <router-link to="/signup">Signup</router-link> |
        <router-link to="/login">Login</router-link> |
        <router-link to="/credentials">Credentials</router-link> |
        <a @click="logout">Logout</a> |

        <strong>{{ email }}</strong>
    </div>
</template>

<script>
export default {
    computed: {
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
            this.$router.push({ name: 'home' })
        }
    }
}
</script>

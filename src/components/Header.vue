<template>
    <div class="header">
        <div class="tt-container">
            <div>
                <HeaderItem to="progresses" v-if="authenticated">My Progresses</HeaderItem>
                <HeaderItem to="showsPopular">Popular Shows</HeaderItem>
                <HeaderItem to="showsSearch">Search</HeaderItem>
            </div>

            <div>
                <HeaderItem to="credentials" v-if="authenticated">{{ email }}</HeaderItem>

                <HeaderItem to="signup" v-if="!authenticated">Signup</HeaderItem>
                <HeaderItem to="login" v-if="!authenticated">Login</HeaderItem>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderItem from '@/components/HeaderItem'

export default {
    components: {
        HeaderItem
    },

    computed: {
        authenticated () {
            return this.$store.getters['auth/authenticated']
        },

        email () {
            return this.$store.getters['auth/credentials'].email
        }
    }
}
</script>

<style scoped>
.header {
    border-bottom: 1px solid #c7c7c7;
    background-color: white;
}

.header .tt-container {
    display: flex;
    justify-content: space-between;
}

.header .tt-container .logout-icon {
    position: relative;
    top: 6px;
    width: 22px;
}
</style>

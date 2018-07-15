<template>
    <span class="item" :class="{ active: active }" @click="go">
        <slot></slot>
    </span>
</template>

<script>
export default {
    props: {
        to: {
            type: String
        }
    },

    computed: {
        active () {
            return this.to === this.$route.name
        }
    },

    methods: {
        go () {
            this.$router.push({ name: this.to })
        }
    }
}
</script>

<style scoped>
.item {
    display: inline-block;
    margin: 0 10px;
    font-size: 17px;
    line-height: 47px;
    cursor: pointer;
}

.item:first-child { margin-left: 0; }

.item:last-child { margin-right: 0; }

.active { border-bottom: 2px solid #222; }
</style>

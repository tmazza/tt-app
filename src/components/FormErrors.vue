<template>
    <ul v-if="errors">
        <li v-for="error in errors" :key="error.id">
            {{ error }}
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        errors: {
            type: Array
        }
    }
}
</script>

<style scoped>
li { color: #ff3838; }
</style>

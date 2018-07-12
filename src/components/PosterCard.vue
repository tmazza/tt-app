<template>
    <div class="card" @click="open">
        <img :src="posterUrl">
        <div class="content">
            <span>{{ show.original_name }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        show: {
            type: Object
        }
    },

    computed: {
        posterUrl () {
            return this.$tmdb.posterUrl(this.show.poster_path, 3)
        }
    },

    methods: {
        open () {
            this.$router.push({ name: 'showDetail', params: { id: this.show.id } })
        }
    }
}
</script>

<style scoped>
.card {
    width: 185px;
    margin: 16px 8px;
    border: 2px solid;
    cursor: pointer;
}

.content { padding: 2px 16px; }

.content span { word-wrap: break-word; }
</style>

<template>
    <div class="card" @click="open">
        <img :src="posterUrl">
        <div class="content">
            {{ show.original_name }}
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
    margin: 0 8px 32px;
    border: 1px solid #bbb;
    border-radius: 3px;
    cursor: pointer;
}

.card img {
    /* Fix width and height because some posters come with slightly bigger height. */
    width: 185px;
    height: 278px;
}

.card .content {
    padding: 0 8px;
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>

<template>
    <div>
        <h2>Popular Shows</h2>

        <button @click="foo">foo</button>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    methods: {
        foo () {
            var config = {
                params: {
                    api_key: 'cc520153f9a9b1a497c9a854cb7b3200',
                    page: 1
                }
            }
            axios.get('https://api.themoviedb.org/3/tv/popular', config).then(response => {
                console.log(response.data.results)
            })
        }
    }
}
</script>

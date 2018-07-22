<template>
    <div class="loader" :class="{ fullscreen: fullscreen }">
        <img src="@/assets/img/loader.png">
    </div>
</template>

<script>
export default {
    props: {
        fullscreen: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped>
@keyframes spin { 100% { transform:rotate(360deg); } }

.loader {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.9);
    z-index: 7000;
}

.loader img {
    width: 90px;
    height: 90px;
    animation: spin 3s linear infinite;
}

.fullscreen {
    position: fixed;
    top: 50px;
    bottom: 0;
    left: 0;
    right: 0;
}
</style>

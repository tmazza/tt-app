<template>
    <div class="modal">
        <p><slot></slot></p>
        <button class="button-primary" @click="close">
            Ok
        </button>
    </div>
</template>

<script>
export default {
    methods: {
        close () {
            this.$emit('close')
        }
    }
}
</script>

<style scoped>
.modal {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.9);
    z-index: 9999;
}

.modal p {
    margin: 0 0 12px;
    padding: 16px;
    width: 100%;
    max-width: 400px;
    text-align: center;
    background-color: white;
    border-radius: 3px;
}
</style>

<template>
    <div>
        <h1>Login</h1>

        <form @submit.prevent="login(formData)">
            <label for="email">Email:</label>
            <input type="text" name="email" v-model="formData.email">
            <FormErrors :errors="formErrors.email"/>

            <label for="password">Password:</label>
            <input type="password" name="password" v-model="formData.password">
            <FormErrors :errors="formErrors.password"/>

            <FormErrors :errors="formErrors.non_field_errors"/>

            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
import FormErrors from '@/components/FormErrors'

export default {
    components: {
        FormErrors
    },

    data () {
        return {
            formData: {
                email: '',
                password: ''
            },

            formErrors: {}
        }
    },

    methods: {
        login (formData) {
            this.$store.dispatch('auth/login', formData)
                .then(() => this.$router.push({name: 'showsMine'}))
                .catch(error => { this.formErrors = error.response.data })
        }
    }
}
</script>

<template>
    <div>
        <h1>Signup</h1>

        <form @submit.prevent="signup(formData)">
            <label for="email">Email:</label>
            <input type="text" name="email" v-model="formData.email">
            <FormErrors :errors="formErrors.email"/>

            <label for="password">Password:</label>
            <input type="password" name="password" v-model="formData.password">
            <FormErrors :errors="formErrors.password"/>

            <label for="password_confirm">Confirm Password:</label>
            <input type="password" name="password_confirm" v-model="formData.password_confirm">
            <FormErrors :errors="formErrors.password_confirm"/>

            <FormErrors :errors="formErrors.non_field_errors"/>

            <button type="submit">Signup</button>
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
                password: '',
                password_confirm: ''
            },

            formErrors: {}
        }
    },

    methods: {
        signup (formData) {
            this.$store.dispatch('auth/signup', formData)
                .then(() => this.$router.push({name: 'showsMine'}))
                .catch(error => { this.formErrors = error.response.data })
        }
    }
}
</script>

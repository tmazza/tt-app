<template>
    <div>
        <h1>Login</h1>

        <form @submit.prevent="login">
            <label for="email">Email:</label>
            <input type="text" name="email" v-model="form.data.email">
            <FormErrors :errors="form.errors.email"/>

            <label for="password">Password:</label>
            <input type="password" name="password" v-model="form.data.password">
            <FormErrors :errors="form.errors.password"/>

            <FormErrors :errors="form.errors.non_field_errors"/>

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
            form: {
                data: {},
                errors: {}
            }
        }
    },

    methods: {
        login () {
            this.$form.submit('auth/login', this.form)
                .then(() => { this.$router.push({ name: 'showsMine' }) })
        }
    }
}
</script>

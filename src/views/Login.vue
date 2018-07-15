<template>
    <div>
        <form @submit.prevent="login">
            <div>
                <FormErrors :errors="form.errors.non_field_errors"/>

                <label for="email">Email:</label>
                <input class="u-full-width" type="text" name="email" v-model="form.data.email">
                <FormErrors :errors="form.errors.email"/>

                <label for="password">Password:</label>
                <input class="u-full-width" type="password" name="password" v-model="form.data.password">
                <FormErrors :errors="form.errors.password"/>
            </div>

            <input class="button-primary" type="submit" value="Login">
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
                .then(() => {
                    this.$store.dispatch('shows/getProgresses')
                    this.$router.push({ name: 'progresses' })
                })
        }
    }
}
</script>

<template>
    <div>
        <form @submit.prevent="signup">
            <div>
                <FormErrors :errors="form.errors.non_field_errors"/>

                <label for="email">Email: </label>
                <input class="u-full-width" type="text" name="email" v-model="form.data.email">
                <FormErrors :errors="form.errors.email"/>

                <label for="password">Password: </label>
                <input class="u-full-width" type="password" name="password" v-model="form.data.password">
                <FormErrors :errors="form.errors.password"/>

                <label for="password_confirm">Confirm Password: </label>
                <input class="u-full-width"
                       type="password"
                       name="password_confirm"
                       v-model="form.data.password_confirm">
                <FormErrors :errors="form.errors.password_confirm"/>
            </div>

            <input class="button-primary" type="submit" value="Signup">
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
        signup () {
            this.$form.submit('auth/signup', this.form)
                .then(() => { this.$router.push({ name: 'progresses' }) })
        }
    }
}
</script>

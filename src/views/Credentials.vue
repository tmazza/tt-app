<template>
    <div>
        <h1>Credentials</h1>

        <form @submit.prevent="saveEmail">
            <label for="email">New email:</label>
            <input type="text" name="email" v-model="emailForm.data.email">
            <FormErrors :errors="emailForm.errors.email"/>

            <label for="current_password">Current password:</label>
            <input type="password" name="current_password" v-model="emailForm.data.current_password">
            <FormErrors :errors="emailForm.errors.current_password"/>

            <FormErrors :errors="emailForm.errors.non_field_errors"/>

            <button type="submit">Save</button>
        </form>

        <form @submit.prevent="savePassword">
            <label for="password">New password:</label>
            <input type="password" name="password" v-model="passwordForm.data.password">
            <FormErrors :errors="passwordForm.errors.password"/>

            <label for="password_confirm">Confirm new password:</label>
            <input type="password" name="password_confirm" v-model="passwordForm.data.password_confirm">
            <FormErrors :errors="passwordForm.errors.password_confirm"/>

            <label for="current_password">Current password:</label>
            <input type="password" name="current_password" v-model="passwordForm.data.current_password">
            <FormErrors :errors="passwordForm.errors.current_password"/>

            <FormErrors :errors="passwordForm.errors.non_field_errors"/>

            <button type="submit">Save</button>
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
            emailForm: {
                data: {},
                errors: {}
            },

            passwordForm: {
                data: {},
                errors: {}
            }
        }
    },

    methods: {
        saveEmail () {
            this.$form.submit('credentials/updateEmail', this.emailForm)
        },

        savePassword () {
            this.$form.submit('credentials/updatePassword', this.passwordForm)
        }
    }
}
</script>

<template>
    <div>
        <h1>Credentials</h1>

        <form @submit.prevent="saveEmail(emailFormData)">
            <label for="email">New email:</label>
            <input type="text" name="email" v-model="emailFormData.email">
            <FormErrors :errors="emailFormErrors.email"/>

            <label for="current_password">Current password:</label>
            <input type="password" name="current_password" v-model="emailFormData.current_password">
            <FormErrors :errors="emailFormErrors.current_password"/>

            <FormErrors :errors="emailFormErrors.non_field_errors"/>

            <button type="submit">Save</button>
        </form>

        <form @submit.prevent="savePassword(passwordFormData)">
            <label for="password">New password:</label>
            <input type="password" name="password" v-model="passwordFormData.password">
            <FormErrors :errors="passwordFormErrors.password"/>

            <label for="password_confirm">Confirm new password:</label>
            <input type="password" name="password_confirm" v-model="passwordFormData.password_confirm">
            <FormErrors :errors="passwordFormErrors.password_confirm"/>

            <label for="current_password">Current password:</label>
            <input type="password" name="current_password" v-model="passwordFormData.current_password">
            <FormErrors :errors="passwordFormErrors.current_password"/>

            <FormErrors :errors="passwordFormErrors.non_field_errors"/>

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
            emailFormData: {},
            emailFormErrors: {},
            passwordFormData: {},
            passwordFormErrors: {}
        }
    },

    methods: {
        saveEmail (formData) {
            this.$store.dispatch('credentials/updateEmail', formData)
                .then(() => {
                    this.emailFormData = {}
                    this.emailFormErrors = {}
                })
                .catch(error => { this.emailFormErrors = error.response.data })
        },

        savePassword (formData) {
            this.$store.dispatch('credentials/updatePassword', formData)
                .then(() => {
                    this.passwordFormData = {}
                    this.passwordFormErrors = {}
                })
                .catch(error => { this.passwordFormErrors = error.response.data })
        }
    }
}
</script>

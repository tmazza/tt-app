<template>
    <div>
        <form @submit.prevent="saveEmail">
            <div>
                <FormErrors :errors="emailForm.errors.non_field_errors"/>

                <label for="email">New email:</label>
                <input class="u-full-width" type="text" name="email" v-model="emailForm.data.email">
                <FormErrors :errors="emailForm.errors.email"/>

                <label for="current_password">Current password:</label>
                <input class="u-full-width"
                       type="password"
                       name="current_password"
                       v-model="emailForm.data.current_password">
                <FormErrors :errors="emailForm.errors.current_password"/>
            </div>

            <input class="button-primary" type="submit" value="Save">
        </form>

        <form @submit.prevent="savePassword">
            <div>
                <FormErrors :errors="passwordForm.errors.non_field_errors"/>

                <label for="password">New password:</label>
                <input class="u-full-width" type="password" name="password" v-model="passwordForm.data.password">
                <FormErrors :errors="passwordForm.errors.password"/>

                <label for="password_confirm">Confirm new password:</label>
                <input class="u-full-width"
                       type="password"
                       name="password_confirm"
                       v-model="passwordForm.data.password_confirm">
                <FormErrors :errors="passwordForm.errors.password_confirm"/>

                <label for="current_password">Current password:</label>
                <input class="u-full-width"
                       type="password"
                       name="current_password"
                       v-model="passwordForm.data.current_password">
                <FormErrors :errors="passwordForm.errors.current_password"/>
            </div>

            <input class="button-primary" type="submit" value="Save">
        </form>

        <button id="logout-button" class="button" @click="logout">Logout</button>
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
        },

        logout () {
            this.$store.dispatch('auth/logout')
            this.$router.push({ name: 'showsPopular' })
        }
    }
}
</script>

<style scoped>
form { margin-bottom: 40px; }

#logout-button {
    display: block;
    margin: 80px auto 0;
}
</style>

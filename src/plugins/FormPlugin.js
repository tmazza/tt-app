import store from '@/store'

export default {
    install (Vue, options) {
        Vue.prototype.$form = {
            submit (action, form) {
                return store.dispatch(action, form.data).then(success).catch(error)

                function success () {
                    form.data = {}
                    form.errors = {}
                }

                function error (e) {
                    form.errors = e.response.data
                    throw new Error()
                }
            }
        }
    }
}

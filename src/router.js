import Vue from 'vue'
import Router from 'vue-router'

import Signup from '@/views/Signup.vue'
import Login from '@/views/Login.vue'
import Credentials from '@/views/Credentials.vue'
import Progresses from '@/views/Progresses.vue'
import ShowDetail from '@/views/ShowDetail.vue'
import Shows from '@/views/Shows.vue'
import ShowsPopular from '@/views/ShowsPopular.vue'

import store from '@/store'

Vue.use(Router)

const authRequired = [
    'credentials',
    'progresses'
]

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            redirect: { name: 'progresses' }
        },
        {
            path: '/signup',
            name: 'signup',
            component: Signup
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/credentials',
            name: 'credentials',
            component: Credentials
        },
        {
            path: '/progresses',
            name: 'progresses',
            component: Progresses
        },
        {
            path: '/show/:id',
            name: 'showDetail',
            component: ShowDetail
        },
        {
            path: '/shows/',
            component: Shows,
            children: [
                {
                    path: 'popular',
                    name: 'showsPopular',
                    component: ShowsPopular
                }
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    var authenticated = store.getters['auth/authenticated']
    if (authRequired.includes(to.name) && !authenticated) {
        next({name: 'showsPopular'})
    } else if (['signup', 'login'].includes(to.name) && authenticated) {
        next({name: 'progresses'})
    } else {
        next()
    }
})

export default router

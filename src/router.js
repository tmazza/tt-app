import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home.vue'
import Signup from '@/views/Signup.vue'
import Login from '@/views/Login.vue'
import Credentials from '@/views/Credentials.vue'
import Shows from '@/views/Shows.vue'
import ShowsMine from '@/views/ShowsMine.vue'
import ShowsPopular from '@/views/ShowsPopular.vue'

import store from '@/store'

Vue.use(Router)

const authRequired = [
    'credentials',
    'showsMine',
    'showsPopular'
]

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
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
            path: '/shows/',
            component: Shows,
            children: [
                {
                    path: 'mine',
                    name: 'showsMine',
                    component: ShowsMine
                },
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
    var isAuthenticated = store.getters['auth/isAuthenticated']
    if (authRequired.includes(to.name) && !isAuthenticated) {
        next({name: 'login'})
    } else if (['signup', 'login'].includes(to.name) && isAuthenticated) {
        next({name: 'showsMine'})
    } else {
        next()
    }
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import login from "../views/login/index.vue";
import home from "../views/home/index.vue";

const routes = [{
        path: "/",
        component: login
    },
    {
        path: "/home",
        component: home
    }
]

const router = new VueRouter({
    routes
})

export default router
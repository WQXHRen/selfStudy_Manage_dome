import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import login from "../views/login/index.vue";
import home from "../views/home/index.vue";
import article from "../views/home/article";
import publish from "../views/home/publish";



const routes = [{
        path: "/login",
        component: login
    },
    {
        path: "/home",
        component: home,
        children: [{
            path: "/article",
            component: article
        }, {
            path: "/publish",
            component: publish
        }]
    },
    {
        path: '',
        redirect: '/login'
    }
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    NProgress.start()
    if (to.path == "/home") {
        let userInfo = window.localStorage.getItem("userInfo")
        if (userInfo) {
            next()
        } else {
            Vue.prototype.$message.warning("请先登录!");
            router.push('/')
        }
    } else {
        next();
    }
})

router.afterEach((to, from) => {
    setInterval(() => {
        NProgress.done()
    }, 1000);
})

export default router
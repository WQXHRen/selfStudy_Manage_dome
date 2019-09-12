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

router.beforeEach((to, from, next) => {
    if (to.path=="/home") {
        let userInfo = window.localStorage.getItem("userInfo")
        if (userInfo) {
            next()
        }else {
            Vue.prototype.$message.warning("请先登录!");
            router.push('/')
            
        }
    } else {
        next();
    }
  })

export default router
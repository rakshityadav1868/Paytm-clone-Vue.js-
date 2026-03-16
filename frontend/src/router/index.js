import { createRouter, createWebHistory } from 'vue-router'
import Signup from "./components/Signup.vue"
import Signin from "./components/Signin.vue"
import Dashboard from "./components/Dashboard.vue"
import Send from "./components/Send.vue"


const routes = [
    {
        path: "/signup",
        component: Signup
    },
    {
        path: "/signin",
        component: Signin
    },
    {
        path: "/dashboard",
        component: Dashboard
    },
    {
        path: "/send",
        component: Send
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
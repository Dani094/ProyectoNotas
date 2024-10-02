import {createRouter, createWebHashHistory} from 'vue-router'

import Login from "../../views/Login.vue"
import Home from "../../views/Home.vue"
import CrearCuenta from "../../views/CrearCuenta.vue"




const routes = [
    {
        path: "/",
        name: "login",
        component: Login,
        meta: { sideBar: true}
    },
    {
        path: "/home",
        name: "home",
        component: Home,
    },
    {
        path: "/crearCuenta",
        name: "crearCuenta",
        component: CrearCuenta,
        meta: { sideBar: true}
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;
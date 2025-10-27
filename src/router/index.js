import { createRouter, createWebHistory } from 'vue-router'
import ContactBook from '@/views/ContactBook.vue'
import ContactAdd from '@/views/ContactAdd.vue'
import NotFound from '@/views/NotFound.vue'
const routes = [
    {
        path: "/",
        name: "contactBook",
        component: ContactBook,
    },
    {
        path: "/Contactadd",
        name: "ContactAdd",
        component: ContactAdd
    },
    {
        path: "/:pathMach(.*)*",
        name: "not found",
        component: NotFound
    },
]
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router

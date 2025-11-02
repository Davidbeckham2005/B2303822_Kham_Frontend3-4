import { createRouter, createWebHistory } from 'vue-router'
import ContactBook from '@/views/ContactBook.vue'
import ContactAdd from '@/views/ContactAdd.vue'
import NotFound from '@/views/NotFound.vue'
import ContactForm from '@/views/ContactForm.vue'
const routes = [
    {
        path: "/",
        name: "contactBook",
        component: ContactBook,
    },
    {
        path: "/:pathMach(.*)*",
        name: "not found",
        component: NotFound
    },
    {
        path: "/contactAdd/:id",
        name: "Edit",
        component: ContactForm
    },
    {
        path: "/contactAdd",
        name: "Add",
        component: ContactForm
    },
]
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router

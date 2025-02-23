import { createRouter, createWebHistory } from 'vue-router';
import IndexPage from '@/pages/IndexPage.vue';
import MainPage from '@/pages/MainPage.vue';
import LoginPage from '@/pages/LoginPage.vue';
import RegisterPage from '@/pages/RegisterPage.vue';

const routes = [
    {
        path: '/',
        component: IndexPage,
        meta: { layout: 'DefaultLayout' }
    },
    {
        path: '/main',
        component: MainPage,
        meta: { layout: 'DefaultLayout' }
    },
    {
        path: '/login',
        component: LoginPage,
        meta: { layout: 'BlankLayout' }
    },
    {
        path: '/register',
        component: RegisterPage,
        meta: { layout: 'BlankLayout' }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;

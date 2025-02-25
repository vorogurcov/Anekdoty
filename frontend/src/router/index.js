import { createRouter, createWebHistory } from 'vue-router';
import IndexPage from '@/interface/pages/IndexPage.vue';
import MainPage from '@/interface/pages/MainPage.vue';
import LoginPage from '@/interface/pages/LoginPage.vue';
import RegisterPage from '@/interface/pages/RegisterPage.vue';

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

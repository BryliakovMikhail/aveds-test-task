import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/pages/MainPage.vue';
import UserPage from '@/pages/UserPage.vue';
import ContactsPage from '@/pages/ContactsPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainPage,
    },
    {
      path: '/profile/:userlogin',
      name: 'user',
      component: UserPage,
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: ContactsPage,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: NotFoundPage,
    },
  ],
});

export default router;

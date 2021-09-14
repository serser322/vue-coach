import { createRouter, createWebHistory } from 'vue-router';
// import CoachDetail from './pages/coaches/CoachDetail.vue';
import CoachesList from './pages/coaches/CoachesList.vue';
// import CoachRegistration from './pages/coaches/CoachRegistration.vue';
// import RequestsReceived from './pages/requests/RequestsReceived.vue';
// import ContactCoach from './pages/requests/ContactCoach.vue';
import UserAuth from './pages/auth/UserAuth.vue';
import NotFound from './pages/NotFound.vue';
import store from './store/index.js';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      // component: CoachDetail,
      component: () => import('./pages/coaches/CoachDetail.vue'),
      props: true, // id可做為prop使用
      children: [
        {
          path: 'contact',
          component: () => import('./pages/requests/ContactCoach.vue')
        } // /coached/id/contact
      ]
    },
    {
      path: '/register',
      //  component: CoachRegistration,
      component: () => import('./pages/coaches/CoachRegistration.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/requests',
      // component: RequestsReceived,
      component: () => import('./pages/requests/RequestsReceived.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/auth',
      component: UserAuth,
      meta: { requiresUnauth: true }
    },
//     { path: '/:notFound(.*)', component: NotFound }
  ]
});

router.beforeEach(function(to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    //store要先import
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/coaches');
  } else {
    next();
  }
});

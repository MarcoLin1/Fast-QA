import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/AppLayout'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/pages/Home')
      },
      {
        path: '/question/:questionNumber',
        name: 'question',
        component: () => import('@/pages/Question')
      },
      {
        path: '/result',
        name: 'result',
        component: () => import('@/pages/Result')
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.name === 'question' && !from.name) {
    return next({ name: 'home' });
  }

  if (to.name === 'result' && (from.name === 'home' || !from.name)) {
    return next({ name: 'home' });
  }
  return next();
});

export default router;

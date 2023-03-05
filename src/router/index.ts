import { createRouter, createWebHistory } from 'vue-router'

import { languageSupportGuard } from './guards/languageSupportGuard'

const routes = [
  {
    path: '/',
    name: 'Root',
    redirect: { name: 'MainPage' },
    component: () => import( '@/layouts/MainLayout.vue' ),
    children: [
      {
        path: '/main-page',
        name: 'MainPage',
        component: () => import( '@/views/MainPage.vue' ),
        props: {
          msg: 'router msg',
        },
      },
      {
        path: '/counter-page',
        name: 'CounterPage',
        component: () => import( '@/views/CounterPage.vue' ),
      },
    ],
  },
]

const router = createRouter( {
  history: createWebHistory( import.meta.env.BASE_URL ),
  routes,
} )

router.beforeEach( languageSupportGuard )

export { router }

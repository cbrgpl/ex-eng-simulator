export const routes = [
  {
    path: '/profile',
    name: 'Profile',
    redirect: { name: 'ProfileWelcome' },
    children: [
      {
        path: '',
        name: 'ProfileWelcome',
        component: () => import( '@mprofile/views/TheProfileWelcome/TheProfileWelcome.vue' ),
      },
    ],
  },
]

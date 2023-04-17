export default [
  {
    path: '/home',
    component: () => import('@/views/client/home/index.vue'),
    name: 'Home',
    meta: { title: 'Home', needLogin: false /*需要加校检判断的路由*/ }
  },
  {
    path: '/pdf',
    component: () => import('@/views/pdf/index.vue'),
    name: 'pdf',
    meta: { title: 'pdf', needLogin: false /*需要加校检判断的路由*/ }
  },
  {
    path: '/roomDetails/:houseId',
    component: () => import('@/views/client/roomDetails'),
    name: 'roomDetails',
    meta: { title: 'Detail', needLogin: false /*需要加校检判断的路由*/ }
  },
  {
    path: '/request',
    component: () => import('@/views/client/request/index'),
    name: 'request',
    meta: { title: 'request', needLogin: true /*需要加校检判断的路由*/ },
    redirect: '/request/1',
    children: [
      {
        path: '/request/1',
        component: () => import('@/views/client/request/components/post1'),
        meta: { needLogin: true /*需要加校检判断的路由*/ }
      },
      {
        path: '/request/2',
        component: () => import('@/views/client/request/components/post2'),
        meta: { needLogin: true /*需要加校检判断的路由*/ }
      },
      {
        path: '/request/3',
        component: () => import('@/views/client/request/components/post3'),
        meta: { needLogin: true /*需要加校检判断的路由*/ }
      },
      {
        path: '/request/4',
        component: () => import('@/views/client/request/components/post4'),
        meta: { needLogin: true /*需要加校检判断的路由*/ }
      },
      {
        path: '/request/5',
        component: () => import('@/views/client/request/components/post5'),
        meta: { needLogin: true /*需要加校检判断的路由*/ }
      }
    ]
  },
  {
    path: '/task',
    component: () => import('@/views/client/task'),
    name: 'task',
    meta: { title: 'task', needLogin: false /*需要加校检判断的路由*/ },
    children: [
      {
        path: '/task/detail',
        component: () => import('@/views/client/task/detail'),
        name: 'detail',
        meta: { title: 'detail', needLogin: false /*需要加校检判断的路由*/ }
      },
      {
        path: '/task/invite',
        component: () => import('@/views/client/task/invite'),
        name: 'invite',
        meta: { title: 'invite', needLogin: false /*需要加校检判断的路由*/ }
      },
      {
        path: '/task/proposals',
        component: () => import('@/views/client/task/proposals'),
        name: 'proposals',
        meta: { title: 'proposals', needLogin: false /*需要加校检判断的路由*/ }
      },
      {
        path: '/task/hire',
        component: () => import('@/views/client/task/hire'),
        name: 'hire',
        meta: { title: 'hire', needLogin: false /*需要加校检判断的路由*/ }
      }
    ]
  },

  {
    path: '/buy',
    component: () => import('@/views/client/buy'),
    name: 'buy',
    meta: { title: 'Buy', needLogin: false /*需要加校检判断的路由*/ },
    children: []
  },
  {
    path: '/buy/offer/:id',
    component: () => import('@/views/client/offer/index.vue'),
    name: 'buy',
    meta: { title: 'Buy', needLogin: false /*需要加校检判断的路由*/ }
  },
  {
    path: '/sell',
    component: () => import('@/views/client/sell'),
    name: 'sell',
    meta: { title: 'sell', needLogin: true /*需要加校检判断的路由*/ },
    redirect: '/sell/Address',
    children: [
      {
        path: '/sell/Address',
        component: () => import('@/views/client/sell/Address/index.vue'),
        name: 'Address',
        meta: { title: 'Address', needLogin: true /*需要加校检判断的路由*/ }
      },
      {
        path: '/sell/price',
        component: () => import('@/views/client/sell/price/index.vue'),
        name: 'price',
        meta: { title: 'price', needLogin: true /*需要加校检判断的路由*/ }
      },
      {
        path: '/sell/basics',
        component: () => import('@/views/client/sell/basics/index.vue'),
        name: 'basics',
        meta: { title: 'basics', needLogin: true /*需要加校检判断的路由*/ }
      },
      {
        path: '/sell/description',
        component: () => import('@/views/client/sell/description'),
        name: 'description',
        meta: { title: 'description', needLogin: true /*需要加校检判断的路由*/ }
      },
      {
        path: '/sell/features',
        component: () => import('@/views/client/sell/features'),
        name: 'features',
        meta: { title: 'features', needLogin: true /*需要加校检判断的路由*/ }
      },
      {
        path: '/sell/more-details',
        component: () => import('@/views/client/sell/more-details'),
        name: 'more-details',
        meta: { title: 'more-details', needLogin: true /*需要加校检判断的路由*/ }
      },
      {
        path: '/sell/photos',
        component: () => import('@/views/client/sell/photos'),
        name: 'photos',
        meta: { title: 'photos', needLogin: true /*需要加校检判断的路由*/ }
      },
      {
        path: '/sell/listing-date',
        component: () => import('@/views/client/sell/listing-date'),
        name: 'listing-date',
        meta: { title: 'listing-date', needLogin: true /*需要加校检判断的路由*/ }
      },
      {
        path: '/sell/sale-sign',
        component: () => import('@/views/client/sell/sale-sign'),
        name: 'sale-sign',
        meta: { title: 'sale-sign', needLogin: true /*需要加校检判断的路由*/ }
      },
      {
        path: '/sell/preview',
        component: () => import('@/views/client/sell/preview'),
        name: 'preview',
        meta: { title: 'preview', needLogin: true /*需要加校检判断的路由*/ }
      }
    ]
  },
  {
    path: '/preview-home',
    component: () => import('@/views/client/preview-home'),
    name: 'preview-home',
    meta: { title: 'preview-home', needLogin: true /*需要加校检判断的路由*/ }
  },
  {
    path: '/search',
    component: () => import('@/views/client/search/index.vue'),
    name: 'search',
    meta: { title: 'search', needLogin: false /*需要加校检判断的路由*/ }
  },
  {
    path: '/guide',
    component: () => import('@/views/client/guide/index.vue'),
    name: 'guide',
    meta: { title: 'guide', needLogin: false /*需要加校检判断的路由*/ }
  },
  {
    path: '/estimates',
    component: () => import('@/views/client/estimates/index.vue'),
    name: 'estimates',
    meta: { title: 'estimates', needLogin: false /*需要加校检判断的路由*/ }
  },
  {
    path: '/agent-guide',
    component: () => import('@/views/client/agent/guide/index.vue'),
    name: 'agent-guide',
    meta: { title: 'agent-guide', needLogin: false /*需要加校检判断的路由*/ }
  },
  {
    path: '/agent',
    component: () => import('@/views/client/agent/index.vue'),
    name: 'agent',
    meta: { title: 'agent', needLogin: false /*需要加校检判断的路由*/ }
  },
  {
    path: '/agent/hire/:agentId',
    component: () => import('@/views/client/agent/hire'),
    name: 'AgentHire',
    meta: { title: 'Hire', needLogin: true /*需要加校检判断的路由*/ }
  },
  {
    path: '/agent-detail',
    component: () => import('@/views/client/agent-detail'),
    name: 'agent-detail',
    meta: { title: 'agent-detail', needLogin: false /*需要加校检判断的路由*/ }
  },
  {
    path: '/hire/success',
    component: () => import('@/views/client/hire/success.vue'),
    name: 'hire-success',
    meta: { title: 'pay-success', needLogin: true /*需要加校检判断的路由*/ }
  },
  {
    path: '/pay/success',
    component: () => import('@/views/client/pay/success.vue'),
    name: 'pay-success',
    meta: { title: 'pay-success', needLogin: true /*需要加校检判断的路由*/ }
  },
  {
    path: '/sell/finishPage',
    component: () => import('@/views/client/finishPage'),
    name: 'finish-page',
    meta: { title: 'finishPage', needLogin: true /*需要加校检判断的路由*/ }
  },
  {
    path: '/pay/failed',
    component: () => import('@/views/client/pay/failed.vue'),
    name: 'pay-failed',
    meta: { title: 'pay-failed', needLogin: true /*需要加校检判断的路由*/ }
  },
  {
    path: '/my-account',
    component: () => import('@/views/client/personal/myAccount'),
    name: 'myAccount',
    meta: { title: 'myAccount', needLogin: true /*需要加校检判断的路由*/ }
  },
  {
    path: '/wallet',
    component: () => import('@/views/client/personal/wallet'),
    name: 'wallet',
    meta: { title: 'wallet', needLogin: true /*需要加校检判断的路由*/ }
  },
  {
    path: '/person',
    component: () => import('@/views/client/personal'),
    name: 'personal',
    meta: { title: 'Personal', needLogin: true /*需要加校检判断的路由*/ },
    redirect: '/person/Finance',
    children: [
      // {
      //   path: '/person/list',
      //   component: () => import('@/views/client/personal/list'),
      //   name: 'list',
      //   meta: { title: 'list', needLogin: true /*需要加校检判断的路由*/ }
      // },
      {
        path: '/person/Tasks',
        component: () => import('@/views/client/personal/Tasks'),
        name: 'Tasks',
        meta: { title: 'Tasks', needLogin: true /*需要加校检判断的路由*/ }
      },
      {
        path: '/person/Hires',
        component: () => import('@/views/client/personal/Hires'),
        name: 'Hires',
        meta: { title: 'Hires', needLogin: true /*需要加校检判断的路由*/ }
      },
      {
        path: '/person/Finance',
        component: () => import('@/views/client/personal/Finance/index.vue'),
        name: 'Finance',
        meta: { title: 'Finance', needLogin: true /*需要加校检判断的路由*/ }
      },
      {
        path: '/person/my-offers',
        component: () => import('@/views/client/personal/myOffers'),
        name: 'myOffers',
        meta: { title: 'myOffers', needLogin: true /*需要加校检判断的路由*/ }
      },
      {
        path: '/person/messages',
        component: () => import('@/views/client/personal/messages'),
        name: 'messages',
        meta: { title: 'Messages', needLogin: true /*需要加校检判断的路由*/ }
      },
      {
        path: '/person/selling-homes',
        component: () => import('@/views/client/personal/sellingHomes'),
        name: 'sellingHomes',
        meta: { title: 'sellingHomes', needLogin: true /*需要加校检判断的路由*/ }
      },
      {
        path: '/person/Contracts',
        component: () => import('@/views/client/personal/Contracts/index'),
        name: 'Contracts',
        meta: { title: 'Contracts', needLogin: true /*需要加校检判断的路由*/ }
      }
    ]
  },
  {
    path: '/end_contrant',
    component: () => import('@/views/client/personal/Contracts/endContract/index'),
    name: 'end_contrant',
    meta: { title: 'end-contrant', needLogin: true /*需要加校检判断的路由*/ }
  },
  // {
  //   path: '/terms',
  //   component: () => import('@/views/client/terms'),
  //   name: 'terms',
  //   meta: { title: 'Terms', needLogin: false /*需要加校检判断的路由*/ }
  // },
  // {
  //   path: '/coming-soon',
  //   component: () => import('@/views/client/comingsoon'),
  //   name: 'comingsoon',
  //   meta: { title: 'comingsoon', needLogin: false /*需要加校检判断的路由*/ }
  // },
  {
    path: '/about',
    component: () => import('@/views/client/about'),
    name: 'about',
    meta: { title: 'About', needLogin: false /*需要加校检判断的路由*/ }
  },
  {
    path: '/contact',
    component: () => import('@/views/client/contact'),
    name: 'contact',
    meta: { title: 'Contact', needLogin: false /*需要加校检判断的路由*/ }
  },
  {
    path: '/login',
    component: () => import('@/views/login'),
    name: 'login',
    meta: { title: 'login', needLogin: false /*需要加校检判断的路由*/ }
  },
  {
    path: '/resetPassword',
    component: () => import('@/views/resetPassword'),
    name: 'forget',
    meta: { title: 'Forget', needLogin: false /*需要加校检判断的路由*/ }
  },
  {
    path: '/signup',
    component: () => import('@/views/signup'),
    name: 'signup',
    meta: { title: 'sign up', needLogin: false /*需要加校检判断的路由*/ }
  },
  {
    path: '/offer/detail/:offerId',
    component: () => import('@/views/client/offer/detail'),
    name: 'offerDetail',
    meta: { title: 'Offer detail', needLogin: true /*需要加校检判断的路由*/ }
  },
  {
    path: '/offer/:id',
    component: () => import('@/views/client/offer'),
    name: 'offer',
    meta: { title: 'Offer', needLogin: true /*需要加校检判断的路由*/ }
  }
];

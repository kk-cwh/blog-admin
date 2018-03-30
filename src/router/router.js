import HelloWorld from '@/components/HelloWorld'
import Main from '@/views/Main.vue'

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录'
  },
  component: () => import('@/views/login.vue')
};

export const page404 = {
  path: '/*',
  name: 'error-404',
  meta: {
    title: '404-页面不存在'
  },
  component: () => import('@/views/error-page/404.vue')
};

export const page403 = {
  path: '/403',
  meta: {
    title: '403-权限不足'
  },
  name: 'error-403',
  component: () => import('@/views/error-page/403.vue')
};

export const page500 = {
  path: '/500',
  meta: {
    title: '500-服务端错误'
  },
  name: 'error-500',
  component: () => import('@/views/error-page/500.vue'),
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  redirect: '/home',
  component: Main,
  children: [
    { path: 'home', title: '首页', name: 'home_index', component: () => import('@/views/home/home.vue') },
    { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: () => import('@/views/own-space/own-space') }
  ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
  {
    path: '/page1',
    icon: 'grid',
    name: 'page1',
    title: '页面1',
    component: Main,
    children: [
      { path: 'page11', title: '页面1-1', name: 'page1_1',   access: [0,1],icon: 'ios-analytics',component: () => import('@/components/HelloWorld') },
      { path: 'page12', title: '页面1-2', name: 'page1_2',   access: [1,2],icon: 'ios-analytics', component: () => import('@/components/HelloWorld') }
    ]
  },
  {
    path: '/page2',
    icon: 'android-menu',
    name: 'page2',
    title: '页面2',
    component: Main,
    access: [0,1],
    children: [
      { path: 'page21', title: '页面2-1', name: 'page2_1',  access: [0],icon: 'ios-photos', component: () => import('@/components/HelloWorld') },
      { path: 'page22', title: '页面2-2', name: 'page2_2',  access: [2,1],icon: 'ios-analytics', component: () => import('@/components/HelloWorld') }

    ]
  }
];
export const routers = [
  loginRouter,
  otherRouter,
  ...appRouter,
  page500,
  page403,
  page404
];




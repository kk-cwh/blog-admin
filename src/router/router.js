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
    { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: () => import('@/views/own-space/own-space') },
    { path: 'add-article', title: '创建文章', name: 'add_article', component: () => import('@/views/articles/add-article.vue') },
    { path: 'preview', title: '文章预览', name: 'preview_article', component: () => import('@/views/articles/preview.vue') },
  ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
  {
    path: '/dashboard',
    icon: 'grid',
    name: 'dashboard',
    title: '面板',
    component: Main,
    access: 0,
    children: [
      { path: 'home', title: '面板', name: 'dashboard_index', icon: 'ios-flask-outline',component: () => import('@/views/dashboard/dashboard') },
    ]
  },
  {
    path: '/users',
    icon: 'grid',
    name: 'users',
    title: '用户管理',
    component: Main,
    access: 0,
    children: [
      { path: 'index', title: '用户管理', name: 'users_index', icon: 'person-stalker',component: () => import('@/views/users/users') },
    ]
  },
  {
    path: '/articles',
    icon: 'android-menu',
    name: 'articles',
    title: '文章管理',
    component: Main,
    access: [0,1],
    children: [
      { path: 'index', title: '文章管理', name: 'articles_index',  access: [0,1],icon: 'document-text', component: () => import('@/views/articles/articles') }
    ]
  },
  {
    path: '/tags',
    icon: 'android-menu',
    name: 'tags',
    title: '标签管理',
    component: Main,
    access: [0],
    children: [
      { path: 'index', title: '标签管理', name: 'tags_index',  access: [0],icon: 'pricetags', component: () => import('@/views/tags/tags') }
    ]
  },
  {
    path: '/categories',
    icon: 'android-menu',
    name: 'categories',
    title: '分类管理',
    component: Main,
    access: [0],
    children: [
      { path: 'index', title: '分类管理', name: 'categories_index',  access: [0],icon: 'ios-list', component: () => import('@/views/categories/categories') }
    ]
  },
  {
    path: '/friendslinks',
    icon: 'android-menu',
    name: 'friendslinks',
    title: '友链管理',
    component: Main,
    access: [0],
    children: [
      { path: 'index', title: '友链管理', name: 'friendslinks_index',  access: [0],icon: 'ios-world', component: () => import('@/views/friendslinks/friendslinks') }
    ]
  },
  {
    path: '/systems',
    icon: 'android-menu',
    name: 'systems',
    title: '系统配置',
    component: Main,
    access: [0],
    children: [
      { path: 'config', title: '系统配置', name: 'system_index',  access: [0],icon: 'android-settings', component: () => import('@/views/systems.vue') }
    ]
  }
];
export const routers = [
  loginRouter,
  // preview,
  otherRouter,
  ...appRouter,
  page500,
  page403,
  page404
];




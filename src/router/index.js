import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import Category from '../views/Category.vue'
// import Cart from '../views/Cart.vue'
// import Personal from '../views/Personal.vue'
// import Search from '../views/Search.vue'
// import Detail from '../views/Detail.vue'
// import CategoryDetail from '../views/CategoryDetail.vue'
// import Login from '../views/Login.vue'
// import Regist from '../views/Regist.vue'
// import Order from '../views/Order.vue'
// import MyOrder from '../views/MyOrder.vue'
// import { resolve } from 'core-js/fn/promise'

Vue.use(VueRouter)
// 解决ElementUI导航栏中的vue-router在3.0版本以上路由重复报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [{
  path: '/',
  name: 'Home',
  component: Home,
  meta: {
    keepAlive: true,
    title: '首页'
  }
},
{
  path: '/category',
  name: 'Category',
  // component: Category,
  // component: resolve => require(['../views/Category.vue'], resolve),
  component: () => import('../views/Category.vue'),
  meta: {
    keepAlive: true,
    title: '分类'
  }
},
{
  path: '/cart',
  name: 'Cart',
  // component: Cart
  // component: resolve => require(['../views/Cart.vue'], resolve)
  component: () => import('../views/Cart.vue'),
  meta: {
    title: '购物车'
  }
},
{
  path: '/personal',
  name: 'Personal',
  // component: Personal,
  // component: resolve => require(['../views/Personal.vue'], resolve),
  component: () => import('../views/Personal.vue'),
  meta: {
    title: '个人中心'
  },
  children: [{
    path: 'login',
    name: 'Login',
    // component: Login
    // component: resolve => require(['../views/Login.vue'], resolve)
    component: () => import('../views/Login.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: 'regist',
    name: 'Regist',
    // component: Regist
    // component: resolve => require(['../views/Regist.vue'], resolve)
    component: () => import('../views/Regist.vue'),
    meta: {
      title: '注册'
    }
  }]
},
{
  path: '/search',
  name: 'Search',
  // component: Search
  // component: resolve => require(['../views/Search.vue'], resolve)
  component: () => import('../views/Search.vue'),
  meta: {
    title: '搜索'
  }
},
{
  path: '/detail/:id',
  name: 'Detail',
  // component: Detail
  // component: resolve => require(['../views/Detail.vue'], resolve)
  component: () => import('../views/Detail.vue'),
  meta: {
    title: '详情'
  }
},
{
  path: '/categorydetail/:cateid/:subid',
  name: 'CategoryDetail',
  // component: CategoryDetail
  // component: resolve => require(['../views/CategoryDetail.vue'], resolve)
  component: () => import('../views/CategoryDetail.vue'),
  meta: {
    title: '分类'
  }
},
{
  path: '/order/:orderNo',
  name: 'Order',
  // component: Order
  // component: resolve => require(['../views/Order.vue'], resolve)
  component: () => import('../views/Order.vue'),
  meta: {
    title: '订单'
  }
},
{
  path: '/myorder',
  name: 'MyOrder',
  // component: MyOrder
  // component: resolve => require(['../views/MyOrder.vue'], resolve)
  component: () => import('../views/MyOrder.vue'),
  meta: {
    title: '我的订单'
  }
}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router

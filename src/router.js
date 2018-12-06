import Vue from 'vue'
import Router from 'vue-router'
import { getToken } from './util/token'

Vue.use(Router)

let router = new Router({
  // redirect重定向
  // meta 可以在页面中用$route.meta来获取里面的数据
  routes: [
    { path: '', redirect: '/login' },
    {
      path: '/login',
      name: 'login',
      component: () =>
        import(/* webpackChunkName: "login" */ './components/login/login'),
      meta: {
        requiresAuth: false
      }
    },

    {
      path: '/register',
      name: 'register',
      component: () =>
        import(/* webpackChunkName: "register" */ './components/register/register'),
      meta: {
        requiresAuth: false
      }
    },

    {
      // 众筹的路由
      path: '/theraise',
      name: 'theraise',
      component: () =>
        import(/* webpackChunkName: "theraise" */ './components/theraise/theraise'),
      meta: {
        requiresAuth: false
      }
    },
    {
      // 首页的路由
      path: '/index',
      name: 'index',
      component: () =>
        import(/* webpackChunkName: "theraise" */ './components/index/index'),
      meta: {
        requiresAuth: false
      }
    },
    {
      // 矿机商城
      path: "/shop",
      name: "shop",
      component: () =>
        import(/* webpackChunkName: "theraise" */ './components/shop/shop'),
      meta: {
        requiresAuth: false
      }
    },

  ]
})

router.beforeEach((to, from, next) => {
  // console.log(to)
  if (to.matched.some(route => route.meta.requiresAuth)) {
    if (!getToken()) {
      next({ path: '/login' })
    } else {
      next()
    }
  } else {
    console.log(to.matched)
    next()
  }
})

export default router

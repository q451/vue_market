import Vue from 'vue'
import VueRouter from 'vue-router'
// 解决路由命名冲突的方法
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
//异步组件加载
const index = () =>import('../views/index')
const home = () =>import('../views/home/home')
const login = () =>import('../views/login/login')
const goods = () =>import('../views/Goods/goods')
const thanks = () =>import('../views/Thanks/thanks')
const GoodsDetail = () =>import('../views/GoodsDetail/GoodsDetail')
const Cart = () =>import('../views/Cart/cart')
const User  = () =>import('../views/User/User')

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect:'/home',
    name:'home',
    component: index,
    children: [
      {
        path: "home",

        component: home
      },
      {
        path: "/goods",
        component: goods
      },
      {
        path: "/thanks",
        component: thanks
      },
      {
        path:"/goodsDetail",
        component: GoodsDetail
      }
    ]
  },
  {
    path:'/login',
    component: login
  },
  {
    path:'/user',
    component: User,
    meta:{
      //需要守卫  代表着访问user需要登录
      auth:true
    }
  },
  {
    path:'/cart',
    component: Cart,
    meta:{
      //需要守卫  代表着访问user需要登录
      auth:true
    }
  }
]

const router = new VueRouter({
  routes,
mode:'history'
})

export default router

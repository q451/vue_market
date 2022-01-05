import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
Vue.config.productionTip = false
import {getStore} from "./utils/storage";
import axios from 'axios'
//使用vue-lazyload
import VueLazyload from "vue-lazyload";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import VueSession from 'vue-session';

import { videoPlayer } from "vue-video-player";
import "video.js/dist/video-js.css";
import "vue-video-player/src/custom-theme.css";

import Video from 'video.js';
import 'video.js/dist/video-js.css';
Vue.prototype.$video = Video;

Vue.use(VueSession);
Vue.use(VueLazyload);
Vue.use(VueLazyload,{
  preLoad:1.3,
  error:'static/images/error.png',
  loading:'static/images/load.gif',
  attempt:1
})
Vue.prototype.$http = axios;

axios.defaults.baseURL = 'http://localhost:3000';
//token给Authorization
axios.interceptors.request.use(config=> {
  const token = getStore('token');
  if (token) {
    //  表示用户已登录
    config.headers.common['Authorization'] = token;
  }
  return config
},error=>{
  return Promise.reject(error);
})

router.beforeEach((to,from,next)=> {
  axios.post('/api/validate', {}).then(res => {
    // console.log(res)
    let data = res.data;
    if (data.state !== 1) {
      // console.log(to.matched)
      if (to.matched.some(record => record.meta.auth)) {
        //  若匹配到有值，则代表未登录  需要登录跳转页面
        next({
          path: '/login',
          query: {
            redirect: to.fullPath
          }
        })
      } else {
        next();
      }
    } else {
      //  保存用户信息
      store.commit('ISLOGIN', data);
    }
  }).catch(error => {
    console.log(error)
  })
  next();
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

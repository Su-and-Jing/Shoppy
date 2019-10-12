// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './common/css/reset.css'
import 'vant/lib/index.css'
import vantComponents from './common/library/vant'
import store from './store'
import VueCookies from 'vue-cookies'

vantComponents.map(n => Vue.use(n))

// 根据路由设置标题
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

Vue.directive('anchor',{
  inserted : function(el,binding){
  el.onclick = function(){
    document.documentElement.scrollTop = $('#anchor-'+binding.value).offset().top
  }
  }
  })
Vue.config.productionTip = false;
Vue.use(VueCookies)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
  VueCookies
})

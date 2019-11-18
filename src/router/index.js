import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import MyHome from '@/components/myhome'
import Medical from '@/components/medical'
import PaySuccess from '@/components/paySuccess'
import QRCode from 'qrcodejs2';
Vue.use(Router)
Vue.prototype.$qrCode = QRCode
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      meta: {
        title: '保险商城'
      }
    }, 
    {
      path: '/myhome',
      name: 'myhome',
      component: MyHome,
      meta: {
        title: '保险商城'
      }
    },
    {
      path: '/medical',
      name: 'medical',
      component: Medical,
      meta: {
        title: '保险商城'
      }
    },
    {
      path: '/paySuccess',
      name: 'paySuccess',
      component: PaySuccess,
      meta: {
        title: '保险商城'
      }
    }
  ]
})

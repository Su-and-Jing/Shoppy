import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import OrderList from '@/components/orderList'
import UploadImg from '@/components/uploadImg'
import InfoPlatform from '@/components/infoPlatform'
import OfferPage from '@/components/offer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/orderList',
      name: 'orderList',
      component: OrderList,
      meta: {
        title: '订单列表'
      }
    },
    {
      path: '/uploadImg',
      name: 'uploadImg',
      component: UploadImg,
      meta: {
        title: '传图投保'
      }
    },
    {
      path: '/infoPlatform',
      name: 'infoPlatform',
      component: InfoPlatform,
      meta: {
        title: '平台信息参考'
      }
    },
    {
      path: '/offer',
      name: 'offer',
      component: OfferPage,
      meta: {
        title: '车险报价页'
      }
    },
  ]
})

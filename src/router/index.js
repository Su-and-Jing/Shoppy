import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import OrderList from '@/components/orderList'
import UploadImg from '@/components/uploadImg'
import InfoPlatform from '@/components/infoPlatform'
import OfferPage from '@/components/offer'
import PaySuccess from '@/components/paySuccess'
import Payment from '@/components/payment'
import OrderDetails from '@/components/orderDetails'
import GetInvoice from '@/components/getInvoice'
import GetElecInvoice from '@/components/getElecInvoice'
import ConfirmInsured from '@/components/confirmInsured'
import UploadScreenage from '@/components/uploadScreenage'
import Price from '@/components/price'
import IndexPc from '@/components/indexPc'
import Vehicle from '@/components/VehicleBrand'
import SelectBrand from '@/components/SelectBrand'
import SelectCar from '@/components/SelectCar'
import QRCode from 'qrcodejs2';
import Annual from '@/components/Annual'
import Verification from '@/components/verification'
import Payment2 from '@/components/payment2'
Vue.use(Router)
Vue.prototype.$qrCode = QRCode
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
      path: '/indexPc',
      name: 'indexPc',
      component: IndexPc,
      meta: {
        title: 'pc首页'
      }
    },
    {
      path: '/index',
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
    {
      path: '/paySuccess',
      name: 'paySuccess',
      component: PaySuccess,
      meta: {
        title: '支付成功页'
      }
    },
    {
      path: '/payment',
      name: 'payment',
      component: Payment,
      meta: {
        title: '华农统一收费'
      }
    },
    {
      path: '/orderDetails',
      name: 'orderDetails',
      component: OrderDetails,
      meta: {
        title: '订单详情'
      }
    },
    {
      path: '/getInvoice',
      name: 'getInvoice',
      component: GetInvoice,
      meta: {
        title: '发票获取'
      }
    },
    {
      path: '/ConfirmInsured',
      name: 'ConfirmInsured',
      component: ConfirmInsured,
      meta: {
        title: '确认投保'
      }
    },
    {
      path: '/getElecInvoice',
      name: 'getElecInvoice',
      component: GetElecInvoice,
      meta: {
        title: '发票电子保单'
      }
    },
    {
      path: '/price',
      name: 'price',
      component: Price,
      meta: {
        keepAlive: true,
        isBack: true,
        title: '确认报价'
      }
    },
    {
      path: '/uploadScreenage',
      name: 'uploadScreenage',
      component: UploadScreenage,
      meta: {
        title: '影像上传'
      }
    },
    {
      path: '/Vehicle',
      name: 'Vehicle',
      component: Vehicle,
      meta: {
        title: '车辆品牌'
      }
    },
    {
      path: '/SelectBrand',
      name: 'SelectBrand',
      component: SelectBrand,
      meta: {
        title: '车辆品牌'
      }
    },
    {
      path: '/SelectCar',
      name: 'SelectCar',
      component: SelectCar,
      meta: {
        title: '车辆品牌'
      }
    },

    {
      path: '/Annual',
      name: 'Annual',
      component: Annual,
      meta: {
        title: '选择年款'
      }
    },
    {
      path: '/verification',
      name: 'verification',
      component: Verification,
      meta: {
        title: '身份验证'
      }
    },
    {
      path: '/payment2',
      name: 'payment2',
      component: Payment2,
      meta: {
        title: '支付'
      }
    }
  ]
})

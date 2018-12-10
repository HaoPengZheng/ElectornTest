import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '../views/landingPage/LandingPage'
import RoomManagement from '../views/roomManagement/RoomManagement'
import Layout from '../views/layout/Layout'
import RoomSurplus from '../views/roomSurplus/RoomSurplus'
import ChooseRoom from '../views/chooseRoom/ChooseRoom'
import OrderPage from '../views/orderPage/OrderPage'
import RoomAccountManagement from '../views/roomAccountManagement/RoomAccountManagement'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'landing-page',
      component: LandingPage
    },
    {
      path: '/hotal-management',
      name: '/hotal-management',
      component: Layout,
      children: [{
        path: '/hotal-management/RoomManagement',
        name: 'RoomManagement',
        component: RoomManagement
      },
      {
        path: '/hotal-management/RoomSurplus',
        name: 'RoomSurplus',
        component: RoomSurplus
      },
      {
        path: '/hotal-management/ChooseRoom',
        name: 'ChooseRoom',
        component: ChooseRoom
      },
      {
        path: '/hotal-management/OrderPage',
        name: 'OrderPage',
        component: OrderPage
      },
      {
        path: '/hotal-management/RoomAccountManagement',
        name: 'RoomAccountManagement',
        component: RoomAccountManagement
      }
      ]
    }
  ]
})

import Vue from 'vue'
import { Message } from 'element-ui'
const state = {
  roomInfo: Object,
  orderProductList: {},
  orderListByShop: []
}
const getters = {

}
const mutations = {
  Update_Room_Id (state, roomInfo) {
    state.roomInfo = roomInfo
  },
  Increase_Product (state, product) {
    let roomId = state.roomInfo.room_id
    if (!state.orderProductList.hasOwnProperty(roomId)) {
      Vue.set(state.orderProductList, roomId, {})
    }
    if (state.orderProductList[roomId].hasOwnProperty(product.materials_name)) {
      Vue.set(state.orderProductList[roomId][product.materials_name], 'count', ++state.orderProductList[roomId][product.materials_name].count)
    } else {
      Vue.set(state.orderProductList[roomId], product.materials_name, product)
      Vue.set(state.orderProductList[roomId][product.materials_name], 'count', 1)
    }
  },
  Delete_Product (state, product) {
    let roomId = state.roomInfo.room_id
    Vue.delete(state.orderProductList[roomId], product.materials_name)
  },
  Update_Product_Count (state, product) {
    let roomId = state.roomInfo.room_id
    Vue.set(state.orderProductList[roomId], product.materials_name, product)
  },
  Init_Order_List_By_Shop (state, orderList) {
    state.orderListByShop = orderList.slice()
  }
}
const actions = {
  updateRoomId ({commit}, roomInfo) {
    commit('Update_Room_Id', roomInfo)
  },
  increaseProduct ({commit}, product) {
    commit('Increase_Product', product)
  },
  deleteProductInOrderList ({commit}, product) {
    commit('Delete_Product', product)
    Message({
      message: '成功删除',
      type: 'success',
      duration: 1 * 1000
    })
  },
  updateProductCount ({commit}, product) {
    commit('Update_Product_Count', product)
  },
  initOrderListByShop ({commit}, orderList) {
    commit('Init_Order_List_By_Shop', orderList)
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}

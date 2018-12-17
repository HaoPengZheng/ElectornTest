import Vue from 'vue'
import { Message } from 'element-ui'
const state = {
  roomInfo: Object,
  orderProductList: {}
}
const getters = {

}
const mutations = {
  Update_Room_Id (state, roomInfo) {
    state.roomInfo = roomInfo
  },
  Increase_Product (state, product) {
    console.log(state.orderProductList.hasOwnProperty(product.materials_name))
    if (state.orderProductList.hasOwnProperty(product.materials_name)) {
      Vue.set(state.orderProductList[product.materials_name], 'count', ++state.orderProductList[product.materials_name].count)
    } else {
      Vue.set(state.orderProductList, product.materials_name, product)
      Vue.set(state.orderProductList[product.materials_name], 'count', 1)
    }
  },
  Delete_Product (state, product) {
    Vue.delete(state.orderProductList, product.materials_name)
  },
  Update_Product_Count (state, product) {
    Vue.set(state.orderProductList, product.materials_name, product)
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
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}

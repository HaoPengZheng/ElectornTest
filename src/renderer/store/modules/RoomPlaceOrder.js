import Vue from 'vue'

const state = {
  roomInfo: Object,
  orderProductList: {}
}
const getters = {

}
const mutations = {
  Update_Room_Id (state, roomInfo) {
    state.roomId = roomInfo
  },
  Increase_Product (state, product) {
    console.log(state.orderProductList.hasOwnProperty(product.productName))
    if (state.orderProductList.hasOwnProperty(product.productName)) {
      Vue.set(state.orderProductList[product.productName], 'count', ++state.orderProductList[product.productName].count)
    } else {
      Vue.set(state.orderProductList, product.productName, product)
      Vue.set(state.orderProductList[product.productName], 'count', 1)
    }
  },
  Delete_Product (state, product) {
    Vue.delete(state.orderProductList, product.productName)
  },
  Update_Product_Count (state, product) {
    Vue.set(state.orderProductList, product.productName, product)
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

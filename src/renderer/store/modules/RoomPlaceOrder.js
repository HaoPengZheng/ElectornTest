const state = {
  roomInfo: Object,
  orderList: []
}
const getters = {

}
const mutations = {
  Update_Room_Id (state, roomInfo) {
    state.roomId = roomInfo
  },
  Increase_Product (state, product) {
    state.orderList.push(product)
  }

}
const actions = {
  updateRoomId ({commit}, roomInfo) {
    commit('Update_Room_Id', roomInfo)
  },
  increaseProduct ({commit}, product) {
    commit('Increase_Product', product)
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}

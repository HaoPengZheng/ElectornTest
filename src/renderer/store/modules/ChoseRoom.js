const state = {
  roomList: [],
  roomTypeList: []
}
const getters = {
  getRoomList: (state) => {
    return state.roomList
  },
  getRoomTypeList: (state) => {
    return state.roomTypeList
  }
}
const mutations = {
  Update_Room_List (state, roomList) {
    state.roomList = roomList
  },
  Update_Room_Type_List (state, roomTypeList) {
    state.roomTypeList = roomTypeList
  }
}
const actions = {
  updateRoomList ({commit}, roomList) {
    commit('Update_Room_List', roomList)
  },
  updateRoomTypeList ({commit}, roomTypeList) {
    commit('Update_Room_Type_List', roomTypeList)
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}

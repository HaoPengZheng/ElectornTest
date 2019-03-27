const state = {
  roomList: [],
  roomTypeList: [],
  roomListById: {},
  isChosen: ''
}
const getters = {
  getRoomList: (state) => {
    return state.roomList
  },
  getRoomTypeList: (state) => {
    return state.roomTypeList
  },
  getIsChosen: (state) => {
    return state.isChosen
  }
}
const mutations = {
  Update_Room_List (state, roomList) {
    state.roomList = roomList
    for (let i = 0; i < roomList.length; i++) {
      state.roomListById[roomList[i].room_id] = roomList[i]
    }
  },
  Update_Room_Type_List (state, roomTypeList) {
    state.roomTypeList = roomTypeList
  },
  Update_Is_Chosen (state, isChosen) {
    state.isChosen = isChosen
  }
}
const actions = {
  updateRoomList ({commit}, roomList) {
    commit('Update_Room_List', roomList)
  },
  updateRoomTypeList ({commit}, roomTypeList) {
    commit('Update_Room_Type_List', roomTypeList)
  },
  updateIsChosen ({commit}, isChosen) {
    commit('Update_Is_Chosen', isChosen)
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}

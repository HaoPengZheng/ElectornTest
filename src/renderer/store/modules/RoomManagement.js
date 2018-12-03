const state = {
  roomDetail: {
    visibility: false,
    roomId: null
  },
  originalRoomData: {},
  roomList: {},
  floorOptions: [],
  floorFilter: [],
  typeOptions: [],
  typeFilter: []
}
const getters = {
  getRoomDetail: (state) => {
    return state.roomDetail
  },
  getOriginRoomData: (state) => {
    return state.originalRoomData
  },
  getAllRooms: (state) => {
    return state.roomList
  },
  getAllRoomsByFilter: (state) => {
    return getRoomByFilter(state.typeFilter, state.floorFilter, state.roomList)
  },
  getFloorFilterOptions: (state) => {
    return state.floorOptions
  },
  getTypeFilterOptions: (state) => {
    return state.typeOptions
  }
}
const mutations = {
  Init_Original_Room_Data (state, roomdata) {
    state.originalRoomData = roomdata
  },
  Init_Room_List (state, roomList) {
    state.roomList = roomList
  },
  Init_Floor_Options (state, options) {
    state.floorOptions = options
  },
  Update_Floor_Filter (state, filter) {
    state.floorFilter = filter
  },
  Init_Type_Options (state, options) {
    state.typeOptions = options
  },
  Update_Type_Filter (state, filter) {
    state.typeFilter = filter
  },
  Update_Room_Detail (state, roomDetail) {
    state.roomDetail = roomDetail
  }
}

const actions = {
  initRoomList ({ commit }, roomObject) {
    let newRoomObject = converterRoomObject(roomObject)
    commit('Init_Original_Room_Data', roomObject)
    commit('Init_Room_List', newRoomObject.roomList)
    commit('Init_Floor_Options', newRoomObject.floorOptions)
    commit('Update_Floor_Filter', newRoomObject.floorOptions)
    commit('Init_Type_Options', newRoomObject.roomTypeOptions)
    commit('Update_Type_Filter', newRoomObject.roomTypeOptions)
  },
  updateFloorFilter ({commit}, floorFilter) {
    commit('Update_Floor_Filter', floorFilter)
  },
  updateTypeFilter ({commit}, floorFilter) {
    commit('Update_Type_Filter', floorFilter)
  },
  updateRoomDetail ({commit}, roomDetail) {
    commit('Update_Room_Detail', roomDetail)
  },
  closeRoomDetail ({commit}) {
    commit('Update_Room_Detail', {visibility: false, roomId: null})
  }
}

function getRoomByFilter (typeFilter, floorFilter, roomList) {
  let filterList = doFloorFilter(floorFilter, roomList)
  filterList = doTypeFilter(typeFilter, filterList)
  return filterList
}

// 根据选择的楼层过滤
function doFloorFilter (floorFilter, roomList) {
  let filterRoomList = {}
  floorFilter.forEach(element => {
    filterRoomList[element] = roomList[element]
  })
  return filterRoomList
}
// 根据选择的房间类型过滤
function doTypeFilter (typeFilter, roomList) {
  if (typeof roomList !== 'object') {
    return roomList
  }
  if (typeFilter.length < 1) {
    return null
  }
  let newRoomList = {}
  for (let key in roomList) {
    let floorList = roomList[key]
    newRoomList[key] = []
    floorList.forEach(element => {
      if (typeFilter.indexOf(element.room_type_name) !== -1) {
        newRoomList[key].push(element)
      }
    })
  }
  return newRoomList
}
// 将房间数据转换成页面所需要的Object
function converterRoomObject (roomObject) {
  let roomList = {}
  let roomTypeOptions = []
  for (let key in roomObject) {
    let floor = roomObject[key].floor
    let roomType = roomObject[key].room_type_name
    if (!roomList.hasOwnProperty(floor)) {
      roomList[floor] = []
    }
    roomList[floor].push(roomObject[key])
    if (roomTypeOptions.indexOf(roomType) === -1) {
      roomTypeOptions.push(roomType)
    }
  }
  let floorOptions = Object.keys(roomList)
  return {
    roomList,
    floorOptions,
    roomTypeOptions
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

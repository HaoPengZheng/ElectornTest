const state = {
  orderListData: Object,
  orderListHistory: Object,
  orderQuery: Object,
  tableLoading: false
}
const getters = {
  getOrderListObject: (state) => {
    return state.orderListData
  },
  getOrderListHistory: (state) => {
    return state.orderListHistory
  },
  getOrderQuery: (state) => {
    return state.orderQuery
  },
  getIsOrderTableLoading: (state) => {
    return state.tableLoading
  }
}
const mutations = {
  Update_Order_List_Data (state, orderListData) {
    state.orderListData = orderListData
    let currentPage = orderListData.meta.pagination.current_page
    state.orderListHistory[currentPage] = orderListData
  },
  Update_Order_Query (state, orderQuery) {
    state.orderQuery = orderQuery
  },
  Init_Order_List_History: (state) => {
    state.orderListHistory = {}
  },
  Update_Table_Loading (state, isLoading) {
    state.tableLoading = isLoading
  }
}
const actions = {
  updateOrderListData ({commit}, orderListData) {
    commit('Update_Order_List_Data', orderListData)
  },
  updateOrderQuery ({commit}, orderQuery) {
    commit('Update_Order_Query', orderQuery)
  },
  initOrderListHistory ({commit}) {
    commit('Init_Order_List_History')
  },
  updateTableLoading ({commit}, isLoading) {
    commit('Update_Table_Loading', isLoading)
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}

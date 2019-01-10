const state = {
  base_api: 'http://192.168.101.172/Hotel-app/api',
  socket_host: 'http://192.168.101.128:6001',
  company: 66,
  shop: 51
}
const getters = {
  getBaseApi: (state) => {
    return state.base_api
  },
  getSocketHost: (state) => {
    return state.socket_host
  },
  getCompanyId: (state) => {
    return state.company
  },
  getShopId: (state) => {
    return state.shop
  }
}
const mutations = {
  Update_Base_Api (state, baseApi) {
    state.base_api = baseApi
  },
  Update_Socket_host (state, socketHost) {
    state.socket_host = socketHost
  },
  Update_Company_Id (state, companyId) {
    state.company = companyId
  },
  Update_Shop_Id (state, shopId) {
    state.shop = shopId
  }
}
const actions = {
  updateBaseApi ({commit}, baseApi) {
    commit('Update_Base_Api', baseApi)
  },
  updateSocketHost ({commit}, socketHost) {
    commit('Update_Socket_host', socketHost)
  },
  updateCompanyId ({commit}, companyId) {
    commit('Update_Company_Id', companyId)
  },
  updateShopId ({commit}, shopId) {
    commit('Update_Shop_Id', shopId)
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}

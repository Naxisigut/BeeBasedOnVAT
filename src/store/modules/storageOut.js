import { Message } from 'element-ui'
import { getAddedGoodsAPI,
  addNewOutAPI,
  delOutboundListAPI
} from '@/api/storageOut'

const state = {
  addedGoods: [],
  addedGoodsPageInfo: {
    pageSize: 10,
    currentPage: 1,
    total: 0
  },
  newBound: {},
  currStep: 0
}

const mutations = {
  SET_ADDED_GOODS(state, payload) {
    state.addedGoods = payload
  },
  SET_ADDED_GOODS_PAGEINFO(state, payload) {
    state.addedGoodsPageInfo = { ...payload }
  },
  SET_NEW_BOUND(state, payload) {
    state.newBound = payload
  }
}

const actions = {
  /* 获得已添加的货品列表 */
  async getAddedGoods({ commit }, params) {
    if (!params.masterId) return Message('masterId为空')
    /* params应包含分页信息和masterId */
    const res = await getAddedGoodsAPI(params)
    commit('SET_ADDED_GOODS', res.records)
  },

  /* 提交出货单 */
  async addNewBound({ commit, state }, params) {
    const res = await addNewOutAPI(params)
    await commit('SET_NEW_BOUND', res)
    await delOutboundListAPI(state.newBound.id) // 这一步是示例做的，不知道为什么
  },

  /* 更新已添加的货品列表 */
  async updateAddedGoods({ commit, dispatch, state }) {
    dispatch('getAddedGoods',
      { size: state.addedGoodsPageInfo.pageSize,
        current: state.addedGoodsPageInfo.currentPage,
        masterId: state.newBound.id })
    commit('SET_ADDED_GOODS_PAGEINFO', { currentPage: 1 }) // 重置表格分页
  },

  test(context) {
    console.log('context =', context)
  },

  /* 清空所有上一个出货单的信息 */
  init({ commit }) {
    commit('SET_ADDED_GOODS', [])
    commit('SET_ADDED_GOODS_PAGEINFO', {
      pageSize: 10,
      currentPage: 1,
      total: 0
    })
    commit('SET_NEW_BOUND', {})
  }
}

export default {
  namespaced: true,
  state, mutations, actions
}

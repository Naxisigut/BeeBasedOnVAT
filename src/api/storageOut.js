import request from '@/utils/request'

/* 分页查询出库单 */
export const getPageOutListAPI = (params) => request({
  url: 'ips/outbound/pageDetail',
  params
})

/* 查询单个出库清单详情 */
export const getSingleDetailAPI = (masterId) => request({
  url: 'ips/outboundList/pageDetail',
  params: { masterId }
})

/* 查询单个出库单详情 */
export const getDetailAPI = (id) => request({
  url: 'ips/outbound/detail/:id'.replace(':id', id)
})

/* 新建出库单 */
export const addNewOutAPI = (data) => request({
  url: 'ips/outbound',
  method: 'post',
  data
})

/* 获取所有货主列表 */
export const getOwnerListAPI = (params) => request({
  url: 'api/owner/list',
  params
})

/* 获取下一个编号 */
export const getNextCodeAPI = (name) => request({
  // url: 'ips/codeFactory/next/:name'.replace(':name', name)
  url: 'api/codeFactory/next/HP'
})

/* 获取可用仓库列表 */
export const getWareHouseListAPI = () => request({
  url: 'api/warehouse/list',
  params: { status: 1 }
})

/* 根据仓库Id获取可用库区列表 */
export const getWareAreaListAPI = (warehouseId) => request({
  url: 'api/area/list',
  params: { warehouseId }
})

/* 获取承运商列表 */
export const getCarrierListAPI = () => request({
  url: 'api/carrier/list'
})

/* 获取库存明细列表 */
export const getStockListAPI = (params) => request({
  url: 'ips/stock/pageDetail',
  params
})

/* 提交货品 */
export const addStockToListAPI = (data) => request({
  url: 'ips/outboundList/batch',
  method: 'post',
  data
})

/* 根据masterId删除出货清单 */
export const delOutboundListAPI = (masterId) => request({
  url: 'ips/outboundList/masterId',
  method: 'delete',
  params: { masterId }
})

/* 查询单个出库清单详情 */
export const getAddedGoodsAPI = (params) => request({
  url: 'ips/outboundList/pageDetail',
  params
})
// /* 获取出货清单相关库存列表 */
// export const getOutboundStockListAPI = (masterId) => request({
//   url: 'ips/outboundList/stockIds',
//   params: { masterId }
// })

/* 修改出库清单的货品数量详情 */
export const changeNumAPI = (data) => request({
  url: 'ips/outboundList',
  method: 'put',
  data
})

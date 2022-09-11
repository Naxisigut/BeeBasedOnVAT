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
export const addNewOutAPI = (params) => request({
  url: 'ips/outbound',
  method: 'post',
  params
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

import request from '@/utils/request'

/* 分页查询拣选任务 */
export const getPickTasksAPI = (params) => request({
  url: 'ips/picking/pageDetail',
  params
})

/* 完成拣选任务, 生成交接任务 */
export const completePickAPI = (data) => request({
  url: 'ips/picking/complete',
  method: 'put',
  data
})

/* 获取拣选任务详情 */
export const getTaskDetailAPI = (params) => request({
  url: 'ips/outboundList/pageDetail',
  params
})

/* 分配人员 */
export const distributeTaskAPI = (data) => request({
  url: 'ips/picking/distribute',
  method: 'put',
  data
})

/* 更改实际拣货数量 */
export const changePickNumAPI = (data) => request({
  url: 'ips/outboundList',
  method: 'put',
  data
})


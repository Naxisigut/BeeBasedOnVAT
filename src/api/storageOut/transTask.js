import request from '@/utils/request'

/* 分页查询交接任务 */
export const getTransTasksAPI = (params) => request({
  url: 'ips/handover/pageDetail',
  params
})

/* 分配交接任务 */
export const distributeHandoverAPI = (data) => request({
  url: 'ips/handover/distribute',
  method: 'put',
  data
})

/* 修改交接任务 */
export const editHandoverAPI = (data) => request({
  url: 'ips/handover',
  method: 'put',
  data
})

/* 完成交接任务 */
export const completeHandoverAPI = (data) => request({
  url: 'ips/handover/complete',
  method: 'put',
  data
})

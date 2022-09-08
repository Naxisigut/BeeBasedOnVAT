import request from '@/utils/request'

/* 分页查询出货单 */
export const getPageOutList = (params) => {
  return request({
    url: '/outbound/pageDetail',
    params
  })
}

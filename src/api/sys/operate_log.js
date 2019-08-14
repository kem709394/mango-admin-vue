import request from '@/libs/request'
const Base64 = require('js-base64').Base64

export const find = ({ pageNum, pageRows, pageFilter }) => {
  return request({
    url: '/v1/sys/operate_log',
    params: {
      current: pageNum,
      size: pageRows,
      filter: Base64.encode(JSON.stringify(pageFilter))
    },
    method: 'get'
  })
}

export const detail = (id) => {
  return request({
    url: `/v1/sys/operate_log/${id}`,
    method: 'get'
  })
}

export const remove = (ids) => {
  return request({
    url: '/v1/sys/operate_log',
    data: ids,
    method: 'delete'
  })
}

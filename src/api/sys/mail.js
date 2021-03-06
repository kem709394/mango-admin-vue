import request from '@/libs/request'
const Base64 = require('js-base64').Base64

export const find = ({ pageNum, pageRows, pageFilter }) => {
  return request({
    url: '/v1/sys/mail',
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
    url: `/v1/sys/mail/${id}`,
    method: 'get'
  })
}

export const create = (data) => {
  return request({
    url: '/v1/sys/mail',
    data: data,
    method: 'post'
  })
}

export const update = ({ id, data }) => {
  return request({
    url: `/v1/sys/mail/${id}`,
    data: data,
    method: 'put'
  })
}

export const remove = (ids) => {
  return request({
    url: '/v1/sys/mail',
    data: ids,
    method: 'delete'
  })
}

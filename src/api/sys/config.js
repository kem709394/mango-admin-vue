import request from '@/libs/request'
const Base64 = require('js-base64').Base64

export const find = ({ pageNum, pageRows, pageFilter }) => {
  return request({
    url: '/v1/sys/config',
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
    url: `/v1/sys/config/${id}`,
    method: 'get'
  })
}

export const update = ({ id, data }) => {
  return request({
    url: `/v1/sys/config/${id}`,
    data: data,
    method: 'put'
  })
}

export const content = (code) => {
  return request({
    url: '/v1/sys/config/content',
    params: {
      code: code
    },
    method: 'get'
  })
}

export const updateContent = (data) => {
  return request({
    url: '/v1/sys/config/content',
    data: data,
    method: 'put'
  })
}

import request from '@/libs/request'
const Base64 = require('js-base64').Base64

export const find = ({ pageNum, pageRows, pageFilter }) => {
  return request({
    url: '/v1/sys/menu_function',
    params: {
      current: pageNum,
      size: pageRows,
      filter: Base64.encode(JSON.stringify(pageFilter))
    },
    method: 'get'
  })
}

export const list = (filter) => {
  return request({
    url: '/v1/sys/menu_function/list',
    params: {
      filter: Base64.encode(JSON.stringify(filter))
    },
    method: 'get'
  })
}

export const tree = (filter) => {
  return request({
    url: '/v1/sys/menu_function/tree',
    params: {
      filter: Base64.encode(JSON.stringify(filter))
    },
    method: 'get'
  })
}

export const detail = (id) => {
  return request({
    url: `/v1/sys/menu_function/${id}`,
    method: 'get'
  })
}

export const create = (data) => {
  return request({
    url: '/v1/sys/menu_function',
    data: data,
    method: 'post'
  })
}

export const update = ({ id, data }) => {
  return request({
    url: `/v1/sys/menu_function/${id}`,
    data: data,
    method: 'put'
  })
}

export const remove = (id) => {
  return request({
    url: `/v1/sys/menu_function/${id}`,
    method: 'delete'
  })
}

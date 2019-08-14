import request from '@/libs/request'
const Base64 = require('js-base64').Base64

export const find = ({ pageNum, pageRows, pageFilter }) => {
  return request({
    url: '/v1/sys/role',
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
    url: '/v1/sys/role/list',
    params: {
      filter: Base64.encode(JSON.stringify(filter))
    },
    method: 'get'
  })
}

export const detail = (id) => {
  return request({
    url: `/v1/sys/role/${id}`,
    method: 'get'
  })
}

export const create = (data) => {
  return request({
    url: '/v1/sys/role',
    data: data,
    method: 'post'
  })
}

export const update = ({ id, data }) => {
  return request({
    url: `/v1/sys/role/${id}`,
    data: data,
    method: 'put'
  })
}

export const remove = (ids) => {
  return request({
    url: '/v1/sys/role',
    data: ids,
    method: 'delete'
  })
}

export const getMenuFunction = (id) => {
  return request({
    url: `/v1/sys/role/${id}/menu_function`,
    method: 'get'
  })
}

export const updateMenuFunction = ({ id, data }) => {
  return request({
    url: `/v1/sys/role/${id}/menu_function`,
    data: data,
    method: 'put'
  })
}

export const getResource = (id) => {
  return request({
    url: `/v1/sys/role/${id}/resource`,
    method: 'get'
  })
}

export const updateResource = ({ id, data }) => {
  return request({
    url: `/v1/sys/role/${id}/resource`,
    data: data,
    method: 'put'
  })
}

import request from '@/libs/request'

export const getUserInfo = () => {
  return request({
    url: '/v1/self/info',
    method: 'get'
  })
}

export const updateUserInfo = (data) => {
  return request({
    url: '/v1/self/info',
    method: 'put',
    data: data
  })
}

export const getMessageCount = () => {
  return request({
    url: '/v1/self/message/count',
    method: 'get'
  })
}

export const getMessageList = () => {
  return request({
    url: '/v1/self/message/list',
    method: 'get'
  })
}

export const getMessageDetail = (id) => {
  return request({
    url: `/v1/self/message/${id}`,
    method: 'get'
  })
}

export const hasReadMessage = (id) => {
  return request({
    url: `/v1/self/message/${id}`,
    method: 'put',
    data: {
      operate: 'read'
    }
  })
}

export const removeReadMessage = (id) => {
  return request({
    url: `/v1/self/message/${id}`,
    method: 'put',
    data: {
      operate: 'remove'
    }
  })
}

export const restoreRemoveMessage = (id) => {
  return request({
    url: `/v1/self/message/${id}`,
    method: 'put',
    data: {
      operate: 'restore'
    }
  })
}

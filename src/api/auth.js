import request from '@/libs/request'

export const login = (data) => {
  return request({
    url: '/auth/user/login',
    data,
    method: 'post'
  })
}

export const logout = () => {
  return request({
    url: '/auth/user/logout',
    method: 'post'
  })
}

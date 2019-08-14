import request from '@/libs/request'

export const getDict = () => {
  return request({
    url: '/open/dictionary',
    method: 'get'
  })
}

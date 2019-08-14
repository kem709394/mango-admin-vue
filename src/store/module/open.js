import {
  getDict
} from '@/api/open'
import { setDictData, getDictData } from '@/libs/util'

export default {
  state: {
    data: getDictData()
  },
  mutations: {
    setData (state, data) {
      state.data = data
      setDictData(data)
    }
  },
  getters: {
    data: state => state.data
  },
  actions: {
    // 获取字典
    loadDict ({ state, commit }) {
      return new Promise((resolve, reject) => {
        getDict().then(res => {
          if (res.err_code === 0) {
            commit('setData', res.list)
          }
          resolve(res)
        }).catch(err => {
          console.log(err)
          reject(err)
        })
      })
    }
  }
}

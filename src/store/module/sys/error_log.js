import {
  find,
  detail,
  remove
} from '@/api/sys/error_log'

const error_log = {
  namespaced: true,
  state: {
    pageNum: 1,
    pageRows: 10,
    pageFilter: {},
    pageList: [],
    pageTotal: 0,
    pageLoading: false
  },
  getters: {
    pageNum: state => state.pageNum,
    pageRows: state => state.pageRows,
    pageFilter: state => state.pageFilter,
    pageList: state => state.pageList,
    pageTotal: state => state.pageTotal,
    pageLoading: state => state.pageLoading
  },
  actions: {
    getData ({
      commit,
      state
    }) {
      commit('setPageLoading', true)
      return new Promise((resolve, reject) => {
        find(state).then(res => {
          commit('setPageTotal', res.total)
          commit('setPageList', res.list)
          commit('setPageLoading', false)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getDetail ({
      commit,
      state
    }, id) {
      return new Promise((resolve, reject) => {
        detail(id).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    delete ({
      commit,
      state
    }, ids) {
      return new Promise((resolve, reject) => {
        remove(ids).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  },
  mutations: {
    setPageList (state, list) {
      state.pageList = list
    },
    setPageNum (state, num) {
      state.pageNum = num
    },
    setPageRows (state, rows) {
      state.pageRows = rows
    },
    setPageFilter (state, filter) {
      state.pageFilter = filter
    },
    setPageTotal (state, total) {
      state.pageTotal = total
    },
    setPageLoading (state, loading) {
      state.pageLoading = loading
    }
  }
}

export default error_log

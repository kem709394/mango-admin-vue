import {
  find,
  list,
  detail,
  create,
  update,
  remove,
  getMenuFunction,
  updateMenuFunction,
  getResource,
  updateResource
} from '@/api/sys/role'

const role = {
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
    getList ({
      commit,
      state
    }, filter) {
      return new Promise((resolve, reject) => {
        list(filter).then(res => {
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
    create ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        create(data).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    update ({
      commit,
      state
    }, { id, data }) {
      return new Promise((resolve, reject) => {
        update({ id, data }).then(res => {
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
    },
    getMenuFunction ({
      commit,
      state
    }, id) {
      return new Promise((resolve, reject) => {
        getMenuFunction(id).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    updateMenuFunction ({
      commit,
      state
    }, { id, data }) {
      return new Promise((resolve, reject) => {
        updateMenuFunction({ id, data }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getResource ({
      commit,
      state
    }, id) {
      return new Promise((resolve, reject) => {
        getResource(id).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    updateResource ({
      commit,
      state
    }, { id, data }) {
      return new Promise((resolve, reject) => {
        updateResource({ id, data }).then(res => {
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

export default role
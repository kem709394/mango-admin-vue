import {
  getMessageCount,
  getMessageList,
  getMessageDetail,
  hasReadMessage,
  removeReadMessage,
  restoreRemoveMessage
} from '@/api/self'

export default {
  state: {
    unreadMsgCount: 0,
    readMsgList: [],
    unreadMsgList: [],
    removeMsgList: [],
    msgContentStore: []
  },
  mutations: {
    setMsgCount (state, count) {
      state.unreadMsgCount = count
    },
    setReadMsgList (state, list) {
      state.readMsgList = list
    },
    setUnreadMsgList (state, list) {
      state.unreadMsgList = list
    },
    setRemoveMsgList (state, list) {
      state.removeMsgList = list
    },
    updateMsgContentStore (state, { id, content }) {
      state.msgContentStore[id] = content
    },
    moveItem (state, { from, to, id }) {
      const index = state[from].findIndex(_ => _.id === id)
      const msgItem = state[from].splice(index, 1)[0]
      msgItem.loading = false
      state[to].unshift(msgItem)
    }
  },
  getters: {
    readMsgCount: state => state.readMsgList.length,
    unreadMsgCount: state => state.unreadMsgList.length,
    removeMsgCount: state => state.removeMsgList.length
  },
  actions: {
    // 此方法用来获取未读消息条数，接口只返回数值，不返回消息列表
    getUnreadMsgCount ({ state, commit }) {
      getMessageCount().then(res => {
        const { unread } = res.info
        commit('setMsgCount', unread)
      })
    },
    // 获取消息列表，其中包含未读、已读、回收站三个列表
    getMsgList ({ state, commit }) {
      return new Promise((resolve, reject) => {
        getMessageList().then(res => {
          const { unread, read, remove } = res.info
          commit('setReadMsgList', read)
          commit('setUnreadMsgList', unread)
          commit('setRemoveMsgList', remove)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 根据当前点击的消息的id获取内容
    getMsgContent ({ state, commit }, id) {
      return new Promise((resolve, reject) => {
        let item = state.msgContentStore[id]
        if (item) {
          resolve(contentItem)
        } else {
          getMessageDetail(id).then(res => {
            const { content } = res.info
            commit('updateMsgContentStore', { id, content })
            resolve(content)
          })
        }
      })
    },
    // 把一个未读消息标记为已读
    hasReadMsg ({ state, commit }, id) {
      return new Promise((resolve, reject) => {
        hasReadMessage(id).then(() => {
          commit('moveItem', {
            from: 'unreadMsgList',
            to: 'readMsgList',
            id
          })
          commit('setMsgCount', state.unreadMsgCount - 1)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 删除一个已读消息到回收站
    removeReadMsg ({ commit }, id) {
      return new Promise((resolve, reject) => {
        removeReadMessage(id).then(() => {
          commit('moveItem', {
            from: 'readMsgList',
            to: 'removeMsgList',
            id
          })
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 还原一个已删除消息到已读消息
    restoreRemoveMsg ({ commit }, id) {
      return new Promise((resolve, reject) => {
        restoreRemoveMessage(id).then(() => {
          commit('moveItem', {
            from: 'removeMsgList',
            to: 'readMsgList',
            id
          })
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

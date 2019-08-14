import {
  login,
  logout
} from '@/api/auth'
import {
  getUserInfo,
  updateUserInfo
} from '@/api/self'
import { setToken, getToken, setAccess, getAccess } from '@/libs/util'

export default {
  state: {
    info: {},
    token: getToken(),
    access: getAccess(),
    session: '',
    hasGetInfo: false
  },
  mutations: {
    setInfo (state, info) {
      state.info = info
    },
    setAccess (state, access) {
      state.access = access
      setAccess(access)
    },
    setSession (state, session) {
      state.session = session
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setHasGetInfo (state, status) {
      state.hasGetInfo = status
    }
  },
  getters: {
    token: state => state.token,
    access: state => state.access
  },
  actions: {
    // 登录
    handleLogin ({ state, commit }, { username, password, captcha }) {
      username = username.trim()
      return new Promise((resolve, reject) => {
        login({
          username,
          password,
          captcha,
          session: state.session
        }).then(res => {
          if (res.err_code === 0) {
            commit('setToken', res.token)
          }
          resolve(res)
        }).catch(err => {
          console.log(err)
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('setToken', '')
          commit('setAccess', [])
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          getUserInfo(state.token).then(res => {
            if (res.err_code === 0) {
              const info = res.info
              commit('setInfo', info)
              commit('setAccess', info.access)
              commit('setHasGetInfo', true)
              resolve(info)
            } else {
              resolve(res)
            }
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    },
    updateUserInfo ({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        try {
          updateUserInfo(data).then(res => {
            if (res.err_code === 0) {
              let info = state.info
              if (data.avatar) {
                info.avatar = data.avatar
                commit('setInfo', info)
              }
              if (data.nickName) {
                info.nickName = data.nickName
                commit('setInfo', info)
              }
            }
            resolve(res)
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    }
  }
}

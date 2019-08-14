import Vue from 'vue'
import Vuex from 'vuex'

import app from './module/app'
import msg from './module/msg'
import auth from './module/auth'
import open from './module/open'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    app,
    msg,
    auth,
    open,
    sys: {
      namespaced: true,
      modules: {
        user: require('./module/sys/user').default,
        role: require('./module/sys/role').default,
        resource: require('./module/sys/resource').default,
        dictionary: require('./module/sys/dictionary').default,
        menu_function: require('./module/sys/menu_function').default,
        login_log: require('./module/sys/login_log').default,
        error_log: require('./module/sys/error_log').default,
        operate_log: require('./module/sys/operate_log').default,
        file: require('./module/sys/file').default,
        message: require('./module/sys/message').default,
        config: require('./module/sys/config').default,
        task: require('./module/sys/task').default,
        task_log: require('./module/sys/task_log').default,
        mail: require('./module/sys/mail').default
      }
    }
  }
})

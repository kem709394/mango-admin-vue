// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import i18n from '@/locale'
import moment from 'moment'
import config from '@/config'
import importDirective from '@/directive'
import { directive as clickOutside } from 'v-click-outside-x'
import installPlugin from '@/plugin'
import './index.less'
import '@/assets/icons/iconfont.css'
import TreeTable from 'tree-table-vue'
import { mapActions } from 'vuex'
import { getDictOptions, tranDictName, checkAccess } from '@/libs/util'
/* eslint-disable */

Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(TreeTable)
/**
 * @description 注册admin内置插件
 */
installPlugin(Vue)
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config

moment.locale('zh-cn')
Vue.prototype.$moment = moment

Vue.prototype.$getDictOptions = getDictOptions
Vue.prototype.$tranDictName = tranDictName
Vue.prototype.$checkAccess = checkAccess
/**
 * 注册指令
 */
importDirective(Vue)
Vue.directive('clickOutside', clickOutside)

new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App),
  created () {
    this.loadDict()
  },
  methods: {
    ...mapActions(['loadDict'])
  }
})

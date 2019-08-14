import Main from '@/components/main'
// import parentView from '@/components/parent-view'

/**
 * meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  bread: (false) 设为true后此级路由会出现在面包屑中
 *  menu: (false) 设为true后在左侧菜单会显示该页面选项
 *  cache: (false) 设为true后页面在切换标签后会缓存
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录'
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '首页',
          icon: 'md-home'
        },
        component: () => import('@/view/home')
      }
    ]
  },
  {
    path: '/personal',
    name: 'personal',
    component: Main,
    meta: {
      icon: 'md-person',
      title: '个人中心',
      bread: true
    },
    children: [
      {
        path: 'setting',
        name: 'setting',
        meta: {
          icon: 'md-settings',
          title: '个人设置',
          bread: true,
          cache: true
        },
        component: () => import('@/view/config')
      },
      {
        path: 'message',
        name: 'message',
        meta: {
          icon: 'md-notifications',
          title: '我的消息',
          bread: true,
          cache: true
        },
        component: () => import('@/view/message')
      }
    ]
  },
  {
    path: '/sys1',
    name: 'sys_part1',
    meta: {
      title: '权限管理',
      icon: 'md-folder',
      menu: true,
      bread: true
    },
    component: Main,
    children: [
      {
        path: 'user',
        name: 'sys_user',
        meta: {
          title: '用户管理',
          icon: 'md-document',
          menu: true,
          bread: true,
          cache: true
        },
        component: () => import('@/view/sys/user.vue')
      },
      {
        path: 'role',
        name: 'sys_role',
        meta: {
          title: '角色管理',
          icon: 'md-document',
          menu: true,
          bread: true,
          cache: true
        },
        component: () => import('@/view/sys/role.vue')
      }
    ]
  },
  {
    path: '/sys2',
    name: 'sys_part2',
    meta: {
      title: '系统设置',
      icon: 'md-folder',
      menu: true,
      bread: true
    },
    component: Main,
    children: [
      {
        path: 'config',
        name: 'sys_config',
        meta: {
          title: '参数管理',
          icon: 'md-document',
          menu: true,
          bread: true,
          cache: true
        },
        component: () => import('@/view/sys/config.vue')
      },
      {
        path: 'dictionary',
        name: 'sys_dictionary',
        meta: {
          title: '字典管理',
          icon: 'md-document',
          menu: true,
          bread: true,
          cache: true
        },
        component: () => import('@/view/sys/dictionary.vue')
      },
      {
        path: 'menu_function',
        name: 'sys_menu_function',
        meta: {
          title: '菜单管理',
          icon: 'md-document',
          menu: true,
          bread: true,
          cache: true
        },
        component: () => import('@/view/sys/menu_function.vue')
      },
      {
        path: 'resource',
        name: 'sys_resource',
        meta: {
          title: '资源管理',
          icon: 'md-document',
          menu: true,
          bread: true,
          cache: true
        },
        component: () => import('@/view/sys/resource.vue')
      },
      {
        path: 'task',
        name: 'sys_task',
        meta: {
          title: '定时任务',
          icon: 'md-document',
          menu: true,
          bread: true,
          cache: true
        },
        component: () => import('@/view/sys/task.vue')
      },
      {
        path: 'file',
        name: 'sys_file',
        meta: {
          title: '文件管理',
          icon: 'md-document',
          menu: true,
          bread: true,
          cache: true
        },
        component: () => import('@/view/sys/file.vue')
      }
    ]
  },
  {
    path: '/sys3',
    name: 'sys_part3',
    meta: {
      title: '消息管理',
      icon: 'md-folder',
      menu: true,
      bread: true
    },
    component: Main,
    children: [
      {
        path: 'message',
        name: 'sys_message',
        meta: {
          title: '内部消息',
          icon: 'md-document',
          menu: true,
          bread: true,
          cache: true
        },
        component: () => import('@/view/sys/message.vue')
      },
      {
        path: 'mail',
        name: 'sys_mail',
        meta: {
          title: '邮件消息',
          icon: 'md-document',
          menu: true,
          bread: true,
          cache: true
        },
        component: () => import('@/view/sys/mail.vue')
      },
      {
        path: 'sms',
        name: 'sys_sms',
        meta: {
          title: '短信消息',
          icon: 'md-document',
          menu: true,
          bread: true,
          cache: true
        },
        component: () => import('@/view/sys/mail.vue')
      }
    ]
  },
  {
    path: '/sys4',
    name: 'sys_part4',
    meta: {
      title: '日志管理',
      icon: 'md-folder',
      menu: true,
      bread: true
    },
    component: Main,
    children: [
      {
        path: 'login_log',
        name: 'sys_login_log',
        meta: {
          title: '登录日志',
          icon: 'md-document',
          menu: true,
          bread: true,
          cache: true
        },
        component: () => import('@/view/sys/login_log.vue')
      },
      {
        path: 'operate_log',
        name: 'sys_operate_log',
        meta: {
          title: '操作日志',
          icon: 'md-document',
          menu: true,
          bread: true,
          cache: true
        },
        component: () => import('@/view/sys/operate_log.vue')
      },
      {
        path: 'error_log',
        name: 'sys_error_log',
        meta: {
          title: '异常日志',
          icon: 'md-document',
          menu: true,
          bread: true,
          cache: true
        },
        component: () => import('@/view/sys/error_log.vue')
      },
      {
        path: 'task_log',
        name: 'sys_task_log',
        meta: {
          title: '任务日志',
          icon: 'md-document',
          menu: true,
          bread: true,
          cache: true
        },
        component: () => import('@/view/sys/task_log.vue')
      }
    ]
  },
  {
    path: '/monitor',
    name: 'monitor',
    meta: {
      title: '系统监控',
      icon: 'md-folder',
      menu: true,
      bread: true
    },
    component: Main,
    children: [
      {
        path: 'druid',
        name: 'mon_druid',
        meta: {
          title: 'Druid监控',
          icon: 'md-document',
          menu: true,
          bread: true
        },
        component: () => import('@/view/mon/druid.vue')
      }
    ]
  },
  {
    path: '/document',
    name: 'document',
    meta: {
      title: '系统文档',
      icon: 'md-folder',
      menu: true,
      bread: true
    },
    component: Main,
    children: [
      {
        path: 'swagger',
        name: 'doc_swagger',
        meta: {
          title: '接口文档',
          icon: 'md-document',
          menu: true,
          bread: true,
          cache: true
        },
        component: () => import('@/view/doc/swagger.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
    },
    component: () => import('@/view/error/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
    },
    component: () => import('@/view/error/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
    },
    component: () => import('@/view/error/404.vue')
  }
]

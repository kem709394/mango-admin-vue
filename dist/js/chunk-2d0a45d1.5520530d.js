(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0a45d1"],{"05b8":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("Card",[a("p",{attrs:{slot:"title"},slot:"title"},[a("Icon",{attrs:{type:"ios-list-box"}}),e._v("任务日志\n    ")],1),a("Row",[a("Col",{attrs:{span:"12"}},[a("Input",{staticStyle:{width:"200px","margin-right":"10px"},attrs:{clearable:"",placeholder:"请输入Bean搜搜..."},model:{value:e.searchForm.bean,callback:function(t){e.$set(e.searchForm,"bean",t)},expression:"searchForm.bean"}}),a("Button",{attrs:{type:"primary",shape:"circle",icon:"ios-search"},on:{click:e.handleSearch}}),a("Button",{attrs:{type:"text",size:"small",icon:"ios-funnel"},on:{click:e.handleFilter}}),a("Button",{attrs:{type:"text",size:"small",icon:"ios-refresh-circle"},on:{click:e.handleRefresh}}),e.$checkAccess("sys_task_log_close")&&e.configState.task?a("Button",{staticStyle:{"margin-left":"20px"},on:{click:e.handleClose}},[e._v("关闭")]):e._e(),e.$checkAccess("sys_task_log_open")&&!e.configState.task?a("Button",{staticStyle:{"margin-left":"20px"},on:{click:e.handleOpen}},[e._v("开启")]):e._e()],1),a("Col",{staticStyle:{"text-align":"right"},attrs:{span:"12"}},[e.$checkAccess("sys_task_log_delete")?a("Button",{attrs:{type:"error",disabled:!e.deleteBatch},on:{click:e.handleDeleteBatch}},[e._v("删除")]):e._e()],1)],1),a("Row",e._l(e.searchTag,function(t,n){return a("Tag",{key:n},[e._v(e._s(t))])}),1),a("Row",{staticStyle:{"margin-top":"12px"},attrs:{gutter:1}},[a("Table",{ref:"selection",attrs:{border:"",columns:e.columns,data:e.pageList,loading:e.pageLoading},on:{"on-selection-change":e.handleSelect}})],1),a("Row",{staticStyle:{"margin-top":"10px"}},[a("Page",{attrs:{current:e.pageNum,total:e.pageTotal,"page-size":e.pageRows,"show-sizer":""},on:{"on-change":e.handleChangePage,"on-page-size-change":e.handleChangePageSize}})],1)],1),a("Modal",{attrs:{title:"高级搜索"},on:{"on-ok":e.handleSearch},model:{value:e.searchVisible,callback:function(t){e.searchVisible=t},expression:"searchVisible"}},[a("Form",{ref:"searchForm",attrs:{model:e.searchForm,"label-width":100}},[a("FormItem",{attrs:{label:"Bean"}},[a("Input",{staticStyle:{width:"300px"},attrs:{clearable:"",placeholder:"Enter something..."},model:{value:e.searchForm.bean,callback:function(t){e.$set(e.searchForm,"bean",t)},expression:"searchForm.bean"}})],1),a("FormItem",{attrs:{label:"日期"}},[a("DatePicker",{staticStyle:{width:"300px"},attrs:{type:"daterange",placeholder:"Select date"},model:{value:e.searchForm.daterange,callback:function(t){e.$set(e.searchForm,"daterange",t)},expression:"searchForm.daterange"}})],1)],1)],1),a("TaskLogDetail",{ref:"detailModal"})],1)},r=[],s=(a("8e6e"),a("ac6a"),a("456d"),a("bd86")),i=a("2f62"),o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("Modal",{attrs:{title:"日志详情",width:"800","footer-hide":""},model:{value:e.visible,callback:function(t){e.visible=t},expression:"visible"}},[e.detail?a("Form",{attrs:{"label-width":100}},[a("FormItem",{attrs:{label:"Bean"}},[e._v(e._s(e.detail.bean))]),a("FormItem",{attrs:{label:"参数"}},[e._v(e._s(e.detail.params))]),a("FormItem",{attrs:{label:"说明"}},[e._v(e._s(e.detail.note))]),a("FormItem",{attrs:{label:"执行"}},[e._v(e._s(e.detail.isSucceed?"成功":"失败"))]),a("FormItem",{attrs:{label:"时间"}},[e._v(e._s(e.$moment(e.detail.createTime).format("YYYY-MM-DD HH:mm")))]),e.detail.isSucceed?e._e():a("FormItem",{attrs:{label:"异常"}},[a("div",{staticStyle:{width:"600px","word-break":"break-all","word-wrap":"break-word"}},[e._v(e._s(e.detail.message))])])],1):e._e()],1)},c=[];function l(e,t){var a=Object.keys(e);return Object.getOwnPropertySymbols&&a.push.apply(a,Object.getOwnPropertySymbols(e)),t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a}function h(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(a,!0).forEach(function(t){Object(s["a"])(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}var g={data:function(){return{visible:!1,detail:null}},methods:h({},Object(i["b"])("sys/task_log",["getDetail"]),{init:function(e){var t=this;this.getDetail(e).then(function(e){t.detail=e.info,t.visible=!0})}})},d=g,u=a("2877"),m=Object(u["a"])(d,o,c,!1,null,null,null),p=m.exports;function f(e,t){var a=Object.keys(e);return Object.getOwnPropertySymbols&&a.push.apply(a,Object.getOwnPropertySymbols(e)),t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a}function b(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?f(a,!0).forEach(function(t){Object(s["a"])(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):f(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}var _={name:"sys_task_log",components:{TaskLogDetail:p},data:function(){var e=this;return{deleteBatch:!1,searchVisible:!1,searchForm:{bean:"",daterange:null},searchTag:[],columns:[{type:"selection",width:60,align:"center"},{title:"Bean",key:"bean"},{title:"参数",render:function(e,t){return e("span",JSON.stringify(t.row.params))}},{title:"说明",key:"note"},{title:"执行",render:function(e,t){return e("span",t.row.isSucceed?"成功":"失败")}},{title:"时间",render:function(t,a){return t("span",e.$moment(a.row.createTime).format("YYYY-MM-DD HH:mm"))}},{title:"操作",width:140,align:"center",render:function(t,a){var n=[];return e.$checkAccess("sys_task_log_detail")&&n.push(t("Button",{props:{type:"info",size:"small"},style:{marginRight:"5px"},on:{click:function(){e.handleDetail(a.row)}}},"详情")),e.$checkAccess("sys_task_log_delete")&&n.push(t("Button",{props:{type:"error",size:"small"},on:{click:function(){e.handleDelete(a.row)}}},"删除")),t("div",n)}}],configState:{}}},computed:b({},Object(i["c"])("sys/task_log",["pageFilter","pageNum","pageRows","pageList","pageTotal","pageLoading"])),mounted:function(){this.init()},methods:b({},Object(i["b"])("sys/task_log",["getData","delete"]),{},Object(i["b"])("sys/config",{getConfig:"getContent",updateConfig:"updateContent"}),{},Object(i["d"])("sys/task_log",["setPageNum","setPageRows","setPageFilter"]),{init:function(){var e=this;this.getData(),this.getConfig("LOG_CONFIG").then(function(t){e.configState=t.info})},handleSelect:function(){this.$refs.selection.getSelection().length>0?this.deleteBatch=!0:this.deleteBatch=!1},handleChangePage:function(e){this.setPageNum(e),this.getData()},handleChangePageSize:function(e){this.setPageNum(1),this.setPageRows(e),this.getData()},handleFilter:function(){this.searchVisible=!0},handleSearch:function(){this.searchTag=[];var e={};""!==this.searchForm.bean.trim()&&(e.bean=this.searchForm.bean.trim(),this.searchTag.push("Bean"+this.searchForm.bean.trim())),this.searchForm.daterange&&this.searchForm.daterange[0]&&(e.dateRange=this.searchForm.daterange,this.searchTag.push("日期："+this.$moment(this.searchForm.daterange[0]).format("YYYY-MM-DD")+"至"+this.$moment(this.searchForm.daterange[1]).format("YYYY-MM-DD"))),this.setPageFilter(e),this.setPageNum(1),this.getData()},handleRefresh:function(){this.searchTag=[],this.searchForm.bean="",this.searchForm.daterange=null,this.setPageFilter({}),this.setPageNum(1),this.getData()},handleOpen:function(){var e=this;e.configState.task=!0,e.updateConfig({code:"LOG_CONFIG",content:e.configState}).then(function(t){0===t.err_code?e.$Message.info("开启成功"):(e.configState.task=!1,e.$Message.error(t.err_msg))})},handleClose:function(){var e=this;e.configState.task=!1,e.updateConfig({code:"LOG_CONFIG",content:e.configState}).then(function(t){0===t.err_code?e.$Message.info("关闭成功"):(e.configState.task=!0,e.$Message.error(t.err_msg))})},handleDetail:function(e){this.$refs.detailModal.init(e.id)},handleDelete:function(e){var t=this;t.$Modal.confirm({title:"确认删除",content:"<p>确认要把当前记录删除吗？</p>",loading:!0,onOk:function(){t.delete([e.id]).then(function(e){t.$Modal.remove(),0===e.err_code?(t.$Message.info("删除成功"),t.pageNum>1&&1===t.pageList.length&&t.setPageNum(t.pageNum-1),t.getData()):t.$Message.error(e.err_msg)})}})},handleDeleteBatch:function(){var e=this;e.$Modal.confirm({title:"确认删除",content:"<p>确认要把勾选的全部记录删除吗？</p>",loading:!0,onOk:function(){var t=e.$refs.selection.getSelection().map(function(e){return e.id});e.delete(t).then(function(t){e.$Modal.remove(),0===t.err_code?(e.$Message.info("删除成功"),e.pageNum>1&&1===e.pageList.length&&e.setPageNum(e.pageNum-1),e.getData()):e.$Message.error(t.err_msg)})}})}})},y=_,k=Object(u["a"])(y,n,r,!1,null,"95906b00",null);t["default"]=k.exports}}]);
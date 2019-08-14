(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e91f0"],{"8bd4":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("Card",[r("p",{attrs:{slot:"title"},slot:"title"},[r("Icon",{attrs:{type:"ios-list-box"}}),t._v("菜单列表\n    ")],1),r("Row",[r("Col",{attrs:{span:"12"}},[r("Button",{attrs:{icon:"ios-refresh-circle"},on:{click:t.handleRefresh}},[t._v("刷新")])],1),r("Col",{staticStyle:{"text-align":"right"},attrs:{span:"12"}},[t.$checkAccess("sys_menu_function_create")?r("Button",{attrs:{type:"success"},on:{click:t.handleCreate}},[t._v("添加")]):t._e()],1)],1),r("Row",{staticStyle:{"margin-top":"12px"},attrs:{gutter:1}},[r("tree-table",{attrs:{"expand-key":"title","expand-type":!1,selectable:!1,columns:t.columns,data:t.data},scopedSlots:t._u([{key:"type",fn:function(e){return[t._v(t._s(t.$tranDictName("MENU_TYPE",e.row.type)))]}},{key:"state",fn:function(e){return[t._v(t._s(t.$tranDictName("USE_STATE",e.row.state)))]}},{key:"operate",fn:function(e){return[t.$checkAccess("sys_menu_function_detail")?r("Button",{staticStyle:{"margin-right":"5px"},attrs:{type:"info",size:"small"},on:{click:function(r){return t.handleDetail(e.row)}}},[t._v("详情")]):t._e(),t.$checkAccess("sys_menu_function_update")?r("Button",{staticStyle:{"margin-right":"5px"},attrs:{type:"warning",size:"small"},on:{click:function(r){return t.handleUpdate(e.row)}}},[t._v("修改")]):t._e(),!t.$checkAccess("sys_menu_function_update")||e.row.children&&0!==e.row.children.length?t._e():r("Button",{attrs:{type:"error",size:"small"},on:{click:function(r){return t.handleDelete(e.row)}}},[t._v("删除")])]}}])})],1)],1),r("MenuFunctionCreate",{ref:"createModal",on:{callback:t.init}}),r("MenuFunctionUpdate",{ref:"updateModal",on:{callback:t.init}}),r("MenuFunctionDetail",{ref:"detailModal"})],1)},a=[],o=(r("8e6e"),r("ac6a"),r("456d"),r("bd86")),i=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("Modal",{attrs:{title:"添加菜单"},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[r("Form",{ref:"form",attrs:{model:t.form,rules:t.rules,"label-width":100}},[r("FormItem",{attrs:{label:"名称",prop:"name"}},[r("Input",{staticStyle:{width:"300px"},attrs:{placeholder:"请填写内容..."},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),r("FormItem",{attrs:{label:"代码",prop:"code"}},[r("Input",{staticStyle:{width:"300px"},attrs:{placeholder:"请填写内容..."},model:{value:t.form.code,callback:function(e){t.$set(t.form,"code",e)},expression:"form.code"}})],1),r("FormItem",{attrs:{label:"类型"}},[r("RadioGroup",{attrs:{type:"button"},model:{value:t.form.type,callback:function(e){t.$set(t.form,"type",e)},expression:"form.type"}},t._l(t.$getDictOptions("MENU_TYPE"),function(e,n){return r("Radio",{key:n,attrs:{label:e.code}},[t._v(t._s(e.name))])}),1)],1),r("FormItem",{attrs:{label:"上级",prop:"parent"}},[r("Poptip",{attrs:{placement:"bottom-start"},model:{value:t.parentVisible,callback:function(e){t.parentVisible=e},expression:"parentVisible"}},[r("Input",{staticStyle:{width:"300px"},attrs:{readonly:""},model:{value:t.parentName,callback:function(e){t.parentName=e},expression:"parentName"}}),r("div",{attrs:{slot:"content"},slot:"content"},[r("Tree",{attrs:{data:t.parentData},on:{"on-select-change":t.changeParent}})],1)],1)],1),r("FormItem",{attrs:{label:"状态"}},[r("RadioGroup",{attrs:{type:"button"},model:{value:t.form.state,callback:function(e){t.$set(t.form,"state",e)},expression:"form.state"}},t._l(t.$getDictOptions("USE_STATE"),function(e,n){return r("Radio",{key:n,attrs:{label:e.code}},[t._v(t._s(e.name))])}),1)],1),r("FormItem",{attrs:{label:"优先级",prop:"priority"}},[r("Input",{staticStyle:{width:"300px"},attrs:{number:"",placeholder:"请填写内容..."},model:{value:t.form.priority,callback:function(e){t.$set(t.form,"priority",e)},expression:"form.priority"}})],1),r("FormItem",{attrs:{label:"说明"}},[r("Input",{staticStyle:{width:"300px"},attrs:{type:"textarea",autosize:{minRows:2,maxRows:5},placeholder:"请填写内容..."},model:{value:t.form.note,callback:function(e){t.$set(t.form,"note",e)},expression:"form.note"}})],1)],1),r("Row",{attrs:{slot:"footer",type:"flex",justify:"center"},slot:"footer"},[r("Button",{attrs:{type:"primary"},on:{click:t.handleSubmit}},[t._v("确认")]),r("Button",{on:{click:function(e){t.visible=!1}}},[t._v("取消")])],1)],1)},l=[],s=(r("7f7f"),r("2f62"));function c(t,e){var r=Object.keys(t);return Object.getOwnPropertySymbols&&r.push.apply(r,Object.getOwnPropertySymbols(t)),e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r}function p(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?c(r,!0).forEach(function(e){Object(o["a"])(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):c(r).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}var m={data:function(){var t=this,e=function(e,r,n){""===r?n(new Error("代码不能为空")):t.getList({code:r}).then(function(t){0===t.list.length?n():n(new Error("代码被使用"))})};return{visible:!1,form:{name:"",code:"",type:"1",parent:0,priority:0,state:"",note:"",extFields:{}},rules:{name:[{required:!0,message:"名称不能为空",trigger:"blur"}],code:[{required:!0,validator:e,trigger:"blur"}],priority:[{required:!0,type:"number",message:"优先级不能为空",trigger:"blur"}]},parentName:"",parentData:[{id:0,title:"根菜单",expand:!0,children:[]}],parentVisible:!1}},methods:p({},Object(s["b"])("sys/menu_function",["create","getList","getTree"]),{init:function(){var t=this;this.getTree({}).then(function(e){t.parentData[0].children=e.tree}),this.parentName=this.parentData[0].title,this.form.name="",this.form.code="",this.form.type="1",this.form.parent=this.parentData[0].id,this.form.state="1",this.form.extFields={},this.form.priority=0,this.form.note="",this.visible=!0},changeParent:function(t,e){this.parentVisible=!1,this.parentName=e.title,this.form.parent=e.id},handleSubmit:function(){var t=this;t.$refs.form.validate(function(e){e&&t.create({name:t.form.name,code:t.form.code,type:t.form.type,parent:t.form.parent,state:t.form.state,extFields:t.form.extFields,priority:t.form.priority,note:t.form.note}).then(function(e){0===e.err_code?(t.$emit("callback"),t.visible=!1):t.$Message.error(e.err_msg)})})}})},u=m,f=r("2877"),d=Object(f["a"])(u,i,l,!1,null,null,null),b=d.exports,y=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("Modal",{attrs:{title:"修改菜单"},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[r("Form",{ref:"form",attrs:{model:t.form,rules:t.rules,"label-width":100}},[r("FormItem",{attrs:{label:"名称",prop:"name"}},[r("Input",{staticStyle:{width:"300px"},attrs:{placeholder:"请填写内容..."},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),r("FormItem",{attrs:{label:"代码",prop:"code"}},[r("Input",{staticStyle:{width:"300px"},attrs:{placeholder:"请填写内容..."},model:{value:t.form.code,callback:function(e){t.$set(t.form,"code",e)},expression:"form.code"}})],1),r("FormItem",{attrs:{label:"类型"}},[r("RadioGroup",{attrs:{type:"button"},model:{value:t.form.type,callback:function(e){t.$set(t.form,"type",e)},expression:"form.type"}},t._l(t.$getDictOptions("MENU_TYPE"),function(e,n){return r("Radio",{key:n,attrs:{label:e.code}},[t._v(t._s(e.name))])}),1)],1),r("FormItem",{attrs:{label:"上级",prop:"parent"}},[r("Poptip",{attrs:{placement:"bottom-start"},model:{value:t.parentVisible,callback:function(e){t.parentVisible=e},expression:"parentVisible"}},[r("Input",{staticStyle:{width:"300px"},attrs:{readonly:""},model:{value:t.parentName,callback:function(e){t.parentName=e},expression:"parentName"}}),r("div",{attrs:{slot:"content"},slot:"content"},[r("Tree",{attrs:{data:t.parentData},on:{"on-select-change":t.changeParent}})],1)],1)],1),r("FormItem",{attrs:{label:"状态"}},[r("RadioGroup",{attrs:{type:"button"},model:{value:t.form.state,callback:function(e){t.$set(t.form,"state",e)},expression:"form.state"}},t._l(t.$getDictOptions("USE_STATE"),function(e,n){return r("Radio",{key:n,attrs:{label:e.code}},[t._v(t._s(e.name))])}),1)],1),r("FormItem",{attrs:{label:"优先级",prop:"priority"}},[r("Input",{staticStyle:{width:"300px"},attrs:{number:"",placeholder:"请填写内容..."},model:{value:t.form.priority,callback:function(e){t.$set(t.form,"priority",e)},expression:"form.priority"}})],1),r("FormItem",{attrs:{label:"说明"}},[r("Input",{staticStyle:{width:"300px"},attrs:{type:"textarea",autosize:{minRows:2,maxRows:5},placeholder:"请填写内容..."},model:{value:t.form.note,callback:function(e){t.$set(t.form,"note",e)},expression:"form.note"}})],1)],1),r("Row",{attrs:{slot:"footer",type:"flex",justify:"center"},slot:"footer"},[r("Button",{attrs:{type:"primary"},on:{click:t.handleSubmit}},[t._v("确认")]),r("Button",{on:{click:function(e){t.visible=!1}}},[t._v("取消")])],1)],1)},h=[];function v(t,e){var r=Object.keys(t);return Object.getOwnPropertySymbols&&r.push.apply(r,Object.getOwnPropertySymbols(t)),e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r}function _(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?v(r,!0).forEach(function(e){Object(o["a"])(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):v(r).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}var g={data:function(){var t=this,e=function(e,r,n){""===r?n(new Error("代码不能为空")):t.detail.code===r?n():t.getList({code:r}).then(function(t){0===t.list.length?n():n(new Error("代码被使用"))})};return{visible:!1,detail:null,form:{name:"",code:"",type:"1",parent:0,priority:0,state:"",note:"",extFields:{}},rules:{name:[{required:!0,message:"名称不能为空",trigger:"blur"}],code:[{required:!0,validator:e,trigger:"blur"}],priority:[{required:!0,type:"number",message:"次序不能为空",trigger:"blur"}]},parentName:"",parentData:[{id:0,title:"根菜单",expand:!0,children:[]}],parentVisible:!1}},methods:_({},Object(s["b"])("sys/menu_function",["getDetail","update","getList","getTree"]),{init:function(t){var e=this;this.getTree({type:"1"}).then(function(t){e.parentData[0].children=t.tree}),this.getDetail(t).then(function(t){e.detail=t.info,e.form.name=e.detail.name,e.form.code=e.detail.code,e.form.type=e.detail.type,e.form.state=e.detail.state,e.form.extFields=e.detail.extFields,e.form.priority=e.detail.priority,e.form.note=e.detail.note,e.detail.parent?(e.form.parent=e.detail.parent.id,e.parentName=e.detail.parent.name):(e.form.parent=e.parentData[0].id,e.parentName=e.parentData[0].title),e.visible=!0})},changeParent:function(t,e){this.parentVisible=!1,this.parentName=e.title,this.form.parent=e.id},handleSubmit:function(){var t=this;t.$refs.form.validate(function(e){e&&t.update({id:t.detail.id,data:{name:t.form.name,code:t.form.code,type:t.form.type,parent:t.form.parent,state:t.form.state,extFields:t.form.extFields,priority:t.form.priority,note:t.form.note}}).then(function(e){0===e.err_code?(t.$emit("callback"),t.visible=!1):t.$Message.error(e.err_msg)})})}})},O=g,w=Object(f["a"])(O,y,h,!1,null,null,null),x=w.exports,k=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("Modal",{attrs:{title:"菜单详情","footer-hide":""},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[t.detail?r("Form",{attrs:{"label-width":100}},[r("FormItem",{attrs:{label:"名称"}},[t._v(t._s(t.detail.name))]),r("FormItem",{attrs:{label:"代码"}},[t._v(t._s(t.detail.code))]),r("FormItem",{attrs:{label:"类型"}},[t._v(t._s(t.$tranDictName("MENU_TYPE",t.detail.type)))]),t.detail.parent?r("FormItem",{attrs:{label:"上级"}},[t._v(t._s(t.detail.parent.name))]):t._e(),r("FormItem",{attrs:{label:"状态"}},[t._v(t._s(t.$tranDictName("USE_STATE",t.detail.state)))]),r("FormItem",{attrs:{label:"优先级"}},[t._v(t._s(t.detail.priority))]),r("FormItem",{attrs:{label:"说明"}},[t._v(t._s(t.detail.note))]),r("FormItem",{attrs:{label:"创建"}},[t._v(t._s(t.$moment(t.detail.createTime).format("YYYY-MM-DD HH:mm")))]),t.detail.modifyTime?r("FormItem",{attrs:{label:"修改"}},[t._v(t._s(t.$moment(t.detail.modifyTime).format("YYYY-MM-DD HH:mm")))]):t._e()],1):t._e()],1)},j=[];function D(t,e){var r=Object.keys(t);return Object.getOwnPropertySymbols&&r.push.apply(r,Object.getOwnPropertySymbols(t)),e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r}function $(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?D(r,!0).forEach(function(e){Object(o["a"])(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):D(r).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}var P={data:function(){return{visible:!1,detail:null}},methods:$({},Object(s["b"])("sys/menu_function",["getDetail"]),{init:function(t){var e=this;this.getDetail(t).then(function(t){e.detail=t.info,e.visible=!0})}})},F=P,S=Object(f["a"])(F,k,j,!1,null,null,null),I=S.exports;function E(t,e){var r=Object.keys(t);return Object.getOwnPropertySymbols&&r.push.apply(r,Object.getOwnPropertySymbols(t)),e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r}function M(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?E(r,!0).forEach(function(e){Object(o["a"])(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):E(r).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}var T={name:"sys_menu_function",components:{MenuFunctionCreate:b,MenuFunctionUpdate:x,MenuFunctionDetail:I},data:function(){return{columns:[{title:"名称",key:"title"},{title:"代码",key:"code"},{title:"类型",type:"template",template:"type"},{title:"状态",type:"template",template:"state"},{title:"操作",align:"center",headerAlign:"center",type:"template",template:"operate"}],data:[]}},mounted:function(){this.init()},methods:M({},Object(s["b"])("sys/menu_function",["getTree","delete"]),{init:function(){var t=this;this.getTree({}).then(function(e){t.data=e.tree})},handleRefresh:function(){this.init()},handleCreate:function(){this.$refs.createModal.init()},handleUpdate:function(t){this.$refs.updateModal.init(t.id)},handleDetail:function(t){this.$refs.detailModal.init(t.id)},handleDelete:function(t){var e=this;e.$Modal.confirm({title:"确认删除",content:"<p>确认要把当前菜单删除吗？</p>",loading:!0,onOk:function(){e.delete(t.id).then(function(t){e.$Modal.remove(),0===t.err_code?(e.$Message.info("删除成功"),e.init()):e.$Message.error(t.err_msg)})}})}})},N=T,R=Object(f["a"])(N,n,a,!1,null,"bb7e5252",null);e["default"]=R.exports}}]);
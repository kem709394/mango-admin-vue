(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7af0e42c"],{"23be":function(e,t,r){"use strict";var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[e._l(e.tags,function(t,a){return r("Tag",{key:a,attrs:{closable:""},on:{"on-close":e.del}},[e._v(e._s(t))])}),r("Input",{ref:"input",staticStyle:{width:"120px"},attrs:{placeholder:"请输入后按回车键"},on:{"on-enter":e.add},model:{value:e.current,callback:function(t){e.current=t},expression:"current"}})],2)},s=[],n={props:{value:Array,required:!0,default:function(){return[]}},data:function(){return{current:""}},computed:{tags:function(){return this.value.slice()}},methods:{add:function(e){var t=e.target.value;t&&(this.tags.indexOf(t)>-1||(this.tags.push(t),this.$emit("input",this.tags),this.current=""))},del:function(e,t){var r=this.tags.indexOf(t);this.tags.splice(r,1),this.$emit("input",this.tags)}}},i=n,o=r("2877"),l=Object(o["a"])(i,a,s,!1,null,null,null),c=l.exports;r.d(t,"a",function(){return c})},"8dc8":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("Card",[r("p",{attrs:{slot:"title"},slot:"title"},[r("Icon",{attrs:{type:"ios-list-box"}}),e._v("内部消息\n    ")],1),r("Row",[r("Col",{attrs:{span:"12"}},[r("Input",{staticStyle:{width:"200px","margin-right":"10px"},attrs:{clearable:"",placeholder:"请输入标题搜搜..."},model:{value:e.searchForm.title,callback:function(t){e.$set(e.searchForm,"title",t)},expression:"searchForm.title"}}),r("Button",{attrs:{type:"primary",shape:"circle",icon:"ios-search"},on:{click:e.handleSearch}}),r("Button",{attrs:{type:"text",size:"small",icon:"ios-funnel"},on:{click:e.handleFilter}}),r("Button",{attrs:{type:"text",size:"small",icon:"ios-refresh-circle"},on:{click:e.handleRefresh}})],1),r("Col",{staticStyle:{"text-align":"right"},attrs:{span:"12"}},[e.$checkAccess("sys_message_create")?r("Button",{attrs:{type:"success"},on:{click:e.handleCreate}},[e._v("添加")]):e._e(),e.$checkAccess("sys_message_delete")?r("Button",{staticStyle:{"margin-left":"5px"},attrs:{type:"error",disabled:!e.deleteBatch},on:{click:e.handleDeleteBatch}},[e._v("删除")]):e._e()],1)],1),r("Row",e._l(e.searchTag,function(t,a){return r("Tag",{key:a},[e._v(e._s(t))])}),1),r("Row",{staticStyle:{"margin-top":"12px"},attrs:{gutter:1}},[r("Table",{ref:"selection",attrs:{border:"",columns:e.columns,data:e.pageList,loading:e.pageLoading},on:{"on-selection-change":e.handleSelect}})],1),r("Row",{staticStyle:{"margin-top":"10px"}},[r("Page",{attrs:{current:e.pageNum,total:e.pageTotal,"page-size":e.pageRows,"show-sizer":""},on:{"on-change":e.handleChangePage,"on-page-size-change":e.handleChangePageSize}})],1)],1),r("Modal",{attrs:{title:"高级搜索"},on:{"on-ok":e.handleSearch},model:{value:e.searchVisible,callback:function(t){e.searchVisible=t},expression:"searchVisible"}},[r("Form",{ref:"searchForm",attrs:{model:e.searchForm,"label-width":100}},[r("FormItem",{attrs:{label:"标题"}},[r("Input",{staticStyle:{width:"300px"},attrs:{clearable:"",placeholder:"Enter something..."},model:{value:e.searchForm.title,callback:function(t){e.$set(e.searchForm,"title",t)},expression:"searchForm.title"}})],1),r("FormItem",{attrs:{label:"类型"}},[r("Select",{staticStyle:{width:"300px"},attrs:{clearable:""},model:{value:e.searchForm.type,callback:function(t){e.$set(e.searchForm,"type",t)},expression:"searchForm.type"}},e._l(e.$getDictOptions("MESSAGE_TYPE"),function(t,a){return r("Option",{key:a,attrs:{value:t.code}},[e._v(e._s(t.name))])}),1)],1),r("FormItem",{attrs:{label:"日期"}},[r("DatePicker",{staticStyle:{width:"300px"},attrs:{type:"daterange",placeholder:"Select date"},model:{value:e.searchForm.daterange,callback:function(t){e.$set(e.searchForm,"daterange",t)},expression:"searchForm.daterange"}})],1)],1)],1),r("MessageCreate",{ref:"createModal",on:{callback:e.getData}}),r("MessageUpdate",{ref:"updateModal",on:{callback:e.getData}}),r("MessageDetail",{ref:"detailModal"})],1)},s=[],n=(r("8e6e"),r("ac6a"),r("456d"),r("bd86")),i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("Modal",{attrs:{title:"发送消息"},model:{value:e.visible,callback:function(t){e.visible=t},expression:"visible"}},[r("Form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":100}},[r("FormItem",{attrs:{label:"标题",prop:"title"}},[r("Input",{staticStyle:{width:"300px"},attrs:{placeholder:"请填写内容..."},model:{value:e.form.title,callback:function(t){e.$set(e.form,"title",t)},expression:"form.title"}})],1),r("FormItem",{attrs:{label:"内容",prop:"content"}},[r("Input",{staticStyle:{width:"300px"},attrs:{type:"textarea",autosize:{minRows:4,maxRows:10},placeholder:"请填写内容..."},model:{value:e.form.content,callback:function(t){e.$set(e.form,"content",t)},expression:"form.content"}})],1),r("FormItem",{attrs:{label:"接收",prop:"toUsers"}},[r("Select",{staticStyle:{width:"300px"},attrs:{multiple:"",filterable:""},model:{value:e.form.toUsers,callback:function(t){e.$set(e.form,"toUsers",t)},expression:"form.toUsers"}},e._l(e.userOption,function(t,a){return r("Option",{key:a,attrs:{value:t.id}},[e._v(e._s(t.nickName)+"("+e._s(t.userName)+")")])}),1)],1),r("FormItem",{attrs:{label:"说明"}},[r("Input",{staticStyle:{width:"300px"},attrs:{type:"textarea",autosize:{minRows:2,maxRows:5},placeholder:"请填写内容..."},model:{value:e.form.note,callback:function(t){e.$set(e.form,"note",t)},expression:"form.note"}})],1)],1),r("Row",{attrs:{slot:"footer",type:"flex",justify:"center"},slot:"footer"},[r("Button",{attrs:{type:"primary"},on:{click:e.handleSubmit}},[e._v("确认")]),r("Button",{on:{click:function(t){e.visible=!1}}},[e._v("取消")])],1)],1)},o=[],l=r("2f62");function c(e,t){var r=Object.keys(e);return Object.getOwnPropertySymbols&&r.push.apply(r,Object.getOwnPropertySymbols(e)),t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r}function u(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(r,!0).forEach(function(t){Object(n["a"])(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(r).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}var m={data:function(){return{visible:!1,form:{title:"",content:"",toUsers:[],extFields:{},note:""},rules:{title:[{required:!0,message:"标题不能为空",trigger:"blur"}],content:[{required:!0,message:"内容不能为空",trigger:"blur"}],toUsers:[{required:!0,type:"array",message:"至少选择一个接收人",trigger:"blur"}]},userOption:[]}},methods:u({},Object(l["b"])("sys/message",["create"]),{},Object(l["b"])("sys/user",{getUserList:"getList"}),{init:function(){var e=this;this.form.title="",this.form.content="",this.form.extFields={},this.form.toUsers=[],this.form.note="",this.visible=!0,this.getUserList({}).then(function(t){e.userOption=t.list})},handleSubmit:function(){var e=this;e.$refs.form.validate(function(t){t&&e.create({title:e.form.title,content:e.form.content,extFields:e.form.extFields,toUsers:e.form.toUsers,note:e.form.note}).then(function(t){0===t.err_code?(e.$emit("callback"),e.visible=!1):e.$Message.error(t.err_msg)})})}})},p=m,h=r("2877"),d=Object(h["a"])(p,i,o,!1,null,null,null),f=d.exports,g=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("Modal",{attrs:{title:"修改消息"},model:{value:e.visible,callback:function(t){e.visible=t},expression:"visible"}},[r("Form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":100}},[r("FormItem",{attrs:{label:"标题",prop:"title"}},[r("Input",{staticStyle:{width:"300px"},attrs:{placeholder:"请填写内容..."},model:{value:e.form.title,callback:function(t){e.$set(e.form,"title",t)},expression:"form.title"}})],1),r("FormItem",{attrs:{label:"内容",prop:"content"}},[r("Input",{staticStyle:{width:"300px"},attrs:{type:"textarea",autosize:{minRows:4,maxRows:10},placeholder:"请填写内容..."},model:{value:e.form.content,callback:function(t){e.$set(e.form,"content",t)},expression:"form.content"}})],1),e.detail?r("FormItem",{attrs:{label:"接收"}},[r("Avatar",{attrs:{src:e.detail.user.avatar}}),r("span",[e._v(e._s(e.detail.user.userName))])],1):e._e(),r("FormItem",{attrs:{label:"说明"}},[r("Input",{staticStyle:{width:"300px"},attrs:{type:"textarea",autosize:{minRows:2,maxRows:5},placeholder:"请填写内容..."},model:{value:e.form.note,callback:function(t){e.$set(e.form,"note",t)},expression:"form.note"}})],1)],1),r("Row",{attrs:{slot:"footer",type:"flex",justify:"center"},slot:"footer"},[r("Button",{attrs:{type:"primary"},on:{click:e.handleSubmit}},[e._v("确认")]),r("Button",{on:{click:function(t){e.visible=!1}}},[e._v("取消")])],1)],1)},b=[],y=r("23be");function v(e,t){var r=Object.keys(e);return Object.getOwnPropertySymbols&&r.push.apply(r,Object.getOwnPropertySymbols(e)),t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r}function O(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?v(r,!0).forEach(function(t){Object(n["a"])(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):v(r).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}var _={components:{TagsInput:y["a"]},data:function(){return{visible:!1,detail:null,form:{title:"",content:"",extFields:{},note:""},rules:{title:[{required:!0,message:"标题不能为空",trigger:"blur"}],content:[{required:!0,message:"内容不能为空",trigger:"blur"}]}}},methods:O({},Object(l["b"])("sys/message",["getDetail","update"]),{init:function(e){var t=this;this.getDetail(e).then(function(e){t.detail=e.info,t.form.title=t.detail.title,t.form.content=t.detail.content,t.form.note=t.detail.note,t.form.extFields=t.detail.extFields,t.visible=!0})},handleSubmit:function(){var e=this;e.$refs.form.validate(function(t){t&&e.update({id:e.detail.id,data:{title:e.form.title,content:e.form.content,extFields:e.form.extFields,note:e.form.note}}).then(function(t){0===t.err_code?(e.$emit("callback"),e.visible=!1):e.$Message.error(t.err_msg)})})}})},w=_,F=Object(h["a"])(w,g,b,!1,null,null,null),x=F.exports,D=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("Modal",{attrs:{title:"消息详情","footer-hide":""},model:{value:e.visible,callback:function(t){e.visible=t},expression:"visible"}},[e.detail?r("Form",{attrs:{"label-width":100}},[r("FormItem",{attrs:{label:"标题"}},[e._v(e._s(e.detail.title))]),r("FormItem",{attrs:{label:"内容"}},[e._v(e._s(e.detail.content))]),r("FormItem",{attrs:{label:"类型"}},[e._v(e._s(e.$tranDictName("MESSAGE_TYPE",e.detail.type)))]),r("FormItem",{attrs:{label:"接收"}},[r("Avatar",{attrs:{src:e.detail.user.avatar}}),r("span",[e._v(e._s(e.detail.user.userName))])],1),r("FormItem",{attrs:{label:"状态"}},[e._v("\n      "+e._s(e.$tranDictName("MESSAGE_STATE",e.detail.state))+"\n      "),"1"===e.detail.state?[e._v(e._s(e.$moment(e.detail.readTime).format("YYYY-MM-DD HH:mm")))]:e._e()],2),r("FormItem",{attrs:{label:"说明"}},[e._v(e._s(e.detail.note))]),r("FormItem",{attrs:{label:"创建"}},[e._v(e._s(e.$moment(e.detail.createTime).format("YYYY-MM-DD HH:mm")))]),e.detail.modifyTime?r("FormItem",{attrs:{label:"修改"}},[e._v(e._s(e.$moment(e.detail.modifyTime).format("YYYY-MM-DD HH:mm")))]):e._e()],1):e._e()],1)},j=[];function k(e,t){var r=Object.keys(e);return Object.getOwnPropertySymbols&&r.push.apply(r,Object.getOwnPropertySymbols(e)),t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r}function P(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?k(r,!0).forEach(function(t){Object(n["a"])(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):k(r).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}var $={data:function(){return{visible:!1,detail:null}},methods:P({},Object(l["b"])("sys/message",["getDetail"]),{init:function(e){var t=this;this.getDetail(e).then(function(e){t.detail=e.info,t.visible=!0})}})},S=$,M=Object(h["a"])(S,D,j,!1,null,null,null),I=M.exports;function E(e,t){var r=Object.keys(e);return Object.getOwnPropertySymbols&&r.push.apply(r,Object.getOwnPropertySymbols(e)),t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r}function Y(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?E(r,!0).forEach(function(t){Object(n["a"])(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):E(r).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}var T={name:"sys_message",components:{MessageCreate:f,MessageUpdate:x,MessageDetail:I},data:function(){var e=this;return{deleteBatch:!1,searchVisible:!1,searchForm:{title:"",type:"",daterange:null},searchTag:[],columns:[{type:"selection",width:60,align:"center"},{title:"标题",key:"title"},{title:"类型",render:function(t,r){return t("span",e.$tranDictName("MESSAGE_TYPE",r.row.type))}},{title:"接收",render:function(e,t){return e("div",[e("Avatar",{props:{src:t.row.user.avatar}}),e("span",{style:"margin-left:10px"},t.row.user.userName)])}},{title:"日期",render:function(t,r){return t("span",e.$moment(r.row.createTime).format("YYYY-MM-DD HH:mm"))}},{title:"操作",width:180,align:"center",render:function(t,r){var a=[];return e.$checkAccess("sys_message_detail")&&a.push(t("Button",{props:{type:"info",size:"small"},style:{marginRight:"5px"},on:{click:function(){e.handleDetail(r.row)}}},"详情")),e.$checkAccess("sys_message_update")&&a.push(t("Button",{props:{type:"warning",size:"small"},style:{marginRight:"5px"},on:{click:function(){e.handleUpdate(r.row)}}},"修改")),e.$checkAccess("sys_message_delete")&&a.push(t("Button",{props:{type:"error",size:"small"},on:{click:function(){e.handleDelete(r.row)}}},"删除")),t("div",a)}}]}},computed:Y({},Object(l["c"])("sys/message",["pageFilter","pageNum","pageRows","pageList","pageTotal","pageLoading"])),mounted:function(){this.init()},methods:Y({},Object(l["b"])("sys/message",["getData","delete"]),{},Object(l["d"])("sys/message",["setPageNum","setPageRows","setPageFilter"]),{init:function(){this.getData()},handleSelect:function(){this.$refs.selection.getSelection().length>0?this.deleteBatch=!0:this.deleteBatch=!1},handleChangePage:function(e){this.setPageNum(e),this.getData()},handleChangePageSize:function(e){this.setPageNum(1),this.setPageRows(e),this.getData()},handleFilter:function(){this.searchVisible=!0},handleSearch:function(){this.searchTag=[];var e={};""!==this.searchForm.title.trim()&&(e.title=this.searchForm.title.trim(),this.searchTag.push("标题："+this.searchForm.title.trim())),""!==this.searchForm.type.trim()&&(e.type=this.searchForm.type.trim(),this.searchTag.push("类型："+this.$tranDictName("MESSAGE_TYPE",this.searchForm.type.trim()))),this.searchForm.daterange&&this.searchForm.daterange[0]&&(e.dateRange=this.searchForm.daterange,this.searchTag.push("日期："+this.$moment(this.searchForm.daterange[0]).format("YYYY-MM-DD")+"至"+this.$moment(this.searchForm.daterange[1]).format("YYYY-MM-DD"))),this.setPageFilter(e),this.setPageNum(1),this.getData()},handleRefresh:function(){this.searchTag=[],this.searchForm.title="",this.searchForm.type="",this.searchForm.daterange=null,this.setPageFilter({}),this.setPageNum(1),this.getData()},handleCreate:function(){this.$refs.createModal.init()},handleUpdate:function(e){this.$refs.updateModal.init(e.id)},handleDetail:function(e){this.$refs.detailModal.init(e.id)},handleDelete:function(e){var t=this;t.$Modal.confirm({title:"确认删除",content:"<p>确认要把当前消息删除吗？</p>",loading:!0,onOk:function(){t.delete([e.id]).then(function(e){t.$Modal.remove(),0===e.err_code?(t.$Message.info("删除成功"),t.pageNum>1&&1===t.pageList.length&&t.setPageNum(t.pageNum-1),t.getData()):t.$Message.error(e.err_msg)})}})},handleDeleteBatch:function(){var e=this;e.$Modal.confirm({title:"确认删除",content:"<p>确认要把勾选的全部消息删除吗？</p>",loading:!0,onOk:function(){var t=e.$refs.selection.getSelection().map(function(e){return e.id});e.delete(t).then(function(t){e.$Modal.remove(),0===t.err_code?(e.$Message.info("删除成功"),e.pageNum>1&&1===e.pageList.length&&e.setPageNum(e.pageNum-1),e.getData()):e.$Message.error(t.err_msg)})}})}})},R=T,N=Object(h["a"])(R,a,s,!1,null,"5848342a",null);t["default"]=N.exports}}]);
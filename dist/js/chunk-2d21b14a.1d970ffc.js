(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21b14a"],{bdf8:function(e,t,r){"use strict";r.r(t);var o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("Card",[r("p",{attrs:{slot:"title"},slot:"title"},[r("Icon",{attrs:{type:"ios-list-box"}}),e._v("个人设置\n    ")],1),r("Form",{attrs:{"label-width":200}},[r("FormItem",{attrs:{label:"头像"}},[r("Avatar",{attrs:{size:"large",src:e.userInfo.avatar}}),r("Button",{attrs:{size:"large",type:"text",icon:"md-reverse-camera"},on:{click:e.cropperImage}})],1),r("FormItem",{attrs:{label:"昵称"}},[e._v("\n        "+e._s(e.userInfo.nickName)+"\n        "),r("Button",{attrs:{size:"large",type:"text",icon:"md-create"},on:{click:e.editNickName}})],1),r("FormItem",{attrs:{label:"账号"}},[e._v(e._s(e.userInfo.userName))]),r("FormItem",{attrs:{label:"角色"}},e._l(e.userInfo.roles,function(t){return r("Tag",{key:t},[e._v(e._s(t))])}),1)],1),r("Row",{attrs:{type:"flex",justify:"center"}},[r("Button",{on:{click:e.editPassword}},[e._v("修改密码")])],1)],1),r("upload-cropper",{ref:"cropperModal",on:{callback:e.updateAvatar}}),r("nickname",{ref:"nicknameModal",on:{callback:e.updateNickName}}),r("password",{ref:"passwordModal",on:{callback:e.updatePassword}})],1)},s=[],a=(r("8e6e"),r("ac6a"),r("456d"),r("bd86")),n=r("9230"),i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("Modal",{attrs:{title:"修改昵称"},model:{value:e.visible,callback:function(t){e.visible=t},expression:"visible"}},[r("Form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":100}},[r("FormItem",{attrs:{label:"用户昵称",prop:"nickName"}},[r("Input",{staticStyle:{width:"300px"},attrs:{placeholder:"Enter something..."},model:{value:e.form.nickName,callback:function(t){e.$set(e.form,"nickName",t)},expression:"form.nickName"}})],1)],1),r("Row",{attrs:{slot:"footer",type:"flex",justify:"center"},slot:"footer"},[r("Button",{attrs:{type:"primary"},on:{click:e.handleSubmit}},[e._v("确认")]),r("Button",{on:{click:function(t){e.visible=!1}}},[e._v("取消")])],1)],1)},l=[],c={data:function(){var e=function(e,t,r){""===t?r(new Error("昵称不能为空")):r()};return{visible:!1,form:{nickName:""},rules:{nickName:[{required:!0,validator:e,trigger:"blur"}]}}},methods:{init:function(e){this.form.nickName=e,this.visible=!0},handleSubmit:function(){var e=this;e.$refs.form.validate(function(t){t&&(e.$emit("callback",e.form.nickName),e.visible=!1)})}}},d=c,u=r("2877"),f=Object(u["a"])(d,i,l,!1,null,null,null),m=f.exports,p=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("Modal",{attrs:{title:"修改密码"},model:{value:e.visible,callback:function(t){e.visible=t},expression:"visible"}},[r("Form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":100}},[r("FormItem",{attrs:{label:"旧的密码",prop:"oldPassword"}},[r("Input",{staticStyle:{width:"300px"},attrs:{type:"password",placeholder:"Enter something..."},model:{value:e.form.oldPassword,callback:function(t){e.$set(e.form,"oldPassword",t)},expression:"form.oldPassword"}})],1),r("FormItem",{attrs:{label:"新的密码",prop:"newPassword"}},[r("Input",{staticStyle:{width:"300px"},attrs:{type:"password",placeholder:"Enter something..."},model:{value:e.form.newPassword,callback:function(t){e.$set(e.form,"newPassword",t)},expression:"form.newPassword"}})],1),r("FormItem",{attrs:{label:"确认密码",prop:"newPassword2"}},[r("Input",{staticStyle:{width:"300px"},attrs:{type:"password",placeholder:"Enter something..."},model:{value:e.form.newPassword2,callback:function(t){e.$set(e.form,"newPassword2",t)},expression:"form.newPassword2"}})],1)],1),r("Row",{attrs:{slot:"footer",type:"flex",justify:"center"},slot:"footer"},[r("Button",{attrs:{type:"primary"},on:{click:e.handleSubmit}},[e._v("确认")]),r("Button",{on:{click:function(t){e.visible=!1}}},[e._v("取消")])],1)],1)},w=[],b={data:function(){var e=this,t=function(e,t,r){""===t?r(new Error("旧的密码不能为空")):t.length>=6&&t.length<=10?r():r(new Error("密码的长度必须为6~10位"))},r=function(e,t,r){""===t?r(new Error("新的密码不能为空")):t.length>=6&&t.length<=10?r():r(new Error("密码的长度必须为6~10位"))},o=function(t,r,o){""===r?o(new Error("确认密码不能为空")):e.form.newPassword===r?o():o(new Error("确认密码和新的密码不一致"))};return{visible:!1,form:{oldPassword:"",newPassword:"",newPassword2:""},rules:{oldPassword:[{required:!0,validator:t,trigger:"blur"}],newPassword:[{required:!0,validator:r,trigger:"blur"}],newPassword2:[{required:!0,validator:o,trigger:"blur"}]}}},methods:{init:function(){this.oldPassword="",this.newPassword="",this.newPassword2="",this.visible=!0},handleSubmit:function(){var e=this;e.$refs.form.validate(function(t){t&&(e.$emit("callback",{oldPassword:e.form.oldPassword,newPassword:e.form.newPassword}),e.visible=!1)})}}},h=b,v=Object(u["a"])(h,p,w,!1,null,null,null),P=v.exports,k=r("2f62");function g(e,t){var r=Object.keys(e);return Object.getOwnPropertySymbols&&r.push.apply(r,Object.getOwnPropertySymbols(e)),t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r}function y(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?g(r,!0).forEach(function(t){Object(a["a"])(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):g(r).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}var I={name:"config",components:{UploadCropper:n["a"],Nickname:m,Password:P},computed:{userInfo:function(){return this.$store.state.auth.info}},methods:y({},Object(k["b"])(["updateUserInfo"]),{cropperImage:function(){this.$refs.cropperModal.init()},updateAvatar:function(e){this.handleSubmit({avatar:e})},editNickName:function(){this.$refs.nicknameModal.init(this.userInfo.nickName)},updateNickName:function(e){this.handleSubmit({nickName:e})},editPassword:function(){this.$refs.passwordModal.init()},updatePassword:function(e){var t=e.oldPassword,r=e.newPassword;this.handleSubmit({oldPassword:t,newPassword:r})},handleSubmit:function(e){var t=this;t.updateUserInfo(e).then(function(e){0===e.err_code?t.$Message.success("操作成功"):t.$Message.error(e.err_msg)})}})},N=I,_=Object(u["a"])(N,o,s,!1,null,null,null),O=_.exports;t["default"]=O}}]);
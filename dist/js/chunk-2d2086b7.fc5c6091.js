(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d2086b7"],{a55b:function(e,n,r){"use strict";r.r(n);var t=function(){var e=this,n=e.$createElement,r=e._self._c||n;return r("div",[r("Form",{attrs:{formType:"login"},on:{submit:e.onLogin}})],1)},s=[],o=r("1da1"),a=(r("96cf"),r("8477")),u=r("362e"),c={components:{Form:a["a"]},methods:{onLogin:function(e){var n=this;return Object(o["a"])(regeneratorRuntime.mark((function r(){var t,s,o,a,c,i;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return t=e.username,s=e.password,r.next=3,n.$axios.post(u["t"],{username:t,password:s});case 3:if(o=r.sent,a=o.code,c=o.msg,i=o.user,0!==a){r.next=12;break}return n.$showToast({msg:c}),r.abrupt("return");case 12:n.$showToast({msg:c});case 13:n.$store.commit("setUserinfo",i),n.$router.push("/personal");case 15:case"end":return r.stop()}}),r)})))()}}},i=c,m=r("2877"),p=Object(m["a"])(i,t,s,!1,null,null,null);n["default"]=p.exports}}]);
//# sourceMappingURL=chunk-2d2086b7.fc5c6091.js.map
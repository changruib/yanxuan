(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-53460bcd"],{3717:function(t,e,s){t.exports=s.p+"img/cart-empty.e1939c19.webp"},"446c":function(t,e,s){"use strict";s("b8a1")},"7d27":function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticClass:"header",on:{click:t.goback}},[t._v("返回")]),0===t.orderList.length?i("div",{staticClass:"empty"},[i("img",{attrs:{src:s("3717"),alt:""}}),i("div",[t._v("去添加点什么吧")])]):i("div",{staticClass:"order-container"},t._l(t.orderList,(function(e){return i("div",{key:e._id,staticClass:"order-list"},[i("div",[t._v("订单编号: "+t._s(e.orderNo))]),i("ul",t._l(e.list,(function(e){return i("li",{key:e._id,staticClass:"item"},[i("img",{staticClass:"pic",attrs:{src:e.pic,alt:""}}),i("div",{staticClass:"detail"},[i("div",{staticClass:"name"},[t._v(t._s(e.name))]),i("div",{staticClass:"info"},[i("div",{staticClass:"price"},[t._v("￥"+t._s(e.price))]),i("div",{staticClass:"num"},[t._v("×"+t._s(e.num))])])])])})),0)])})),0)])},r=[],a=s("1da1"),n=(s("96cf"),s("362e")),c={data:function(){return{orderList:[]}},methods:{goback:function(){this.$router.go(-1)},getOrders:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){var s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$axios.get(n["o"]);case 2:s=e.sent,t.orderList=s;case 4:case"end":return e.stop()}}),e)})))()}},created:function(){this.getOrders()}},o=c,d=(s("446c"),s("2877")),u=Object(d["a"])(o,i,r,!1,null,"8fd65f60",null);e["default"]=u.exports},b8a1:function(t,e,s){}}]);
//# sourceMappingURL=chunk-53460bcd.b8937d93.js.map
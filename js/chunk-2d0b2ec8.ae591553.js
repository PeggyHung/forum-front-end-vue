(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b2ec8"],{"25d3":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container py-5"},[t.isLoading?n("Spinner"):[n("div",[n("h1",[t._v(t._s(t.restaurant.name))]),n("span",{staticClass:"badge badge-secondary mt-1 mb-3"},[t._v(" "+t._s(t.restaurant.categoryName)+" ")])]),n("hr"),n("ul",[n("li",[t._v("評論數： "+t._s(t.restaurant.commentsNum))]),n("li",[t._v("瀏覽次數： "+t._s(t.restaurant.viewCounts))])]),n("button",{staticClass:"btn btn-link",attrs:{type:"button"},on:{click:function(e){return t.$router.back()}}},[t._v(" 回上一頁 ")])]],2)},r=[],s=n("1da1"),i=(n("96cf"),n("b0c0"),n("c4c3")),u=n("2fa3"),c=n("2375"),o={name:"RestaurantDashboard",components:{Spinner:c["a"]},data:function(){return{restaurant:{},isLoading:!0}},created:function(){var t=this.$route.params.id;this.fetchRestaurant(t)},methods:{fetchRestaurant:function(t){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function n(){var a,r,s,c,o,m;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,i["a"].getRestaurant({restaurantId:t});case 3:a=n.sent,r=a.data.restaurant,s=r.name,c=r.Category,o=r.Comments,m=r.viewCounts,e.restaurant={name:s,categoryName:c?c.name:"未分類",commentsNum:o.length,viewCounts:m},e.isLoading=!1,n.next=14;break;case 10:n.prev=10,n.t0=n["catch"](0),e.isLoading=!1,u["a"].fire({icon:"warning",title:"無法取得個別餐廳資訊，請稍後再試"});case 14:case"end":return n.stop()}}),n,null,[[0,10]])})))()}}},m=o,d=n("2877"),l=Object(d["a"])(m,a,r,!1,null,null,null);e["default"]=l.exports}}]);
//# sourceMappingURL=chunk-2d0b2ec8.ae591553.js.map
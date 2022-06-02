(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c8d68"],{"571a":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container py-5"},[a("NavTabs"),t.isLoading?a("Spinner"):[a("h1",{staticClass:"mt-5"},[t._v("人氣餐廳")]),a("hr"),t._l(t.restaurants,(function(t){return a("RestaurantTopCard",{key:t.id,attrs:{"initial-restaurant":t}})}))]],2)},s=[],n=a("1da1"),i=(a("96cf"),a("d9e2"),a("8bb1")),c=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"card mb-3",staticStyle:{"max-width":"540px",margin:"auto"}},[a("div",{staticClass:"row no-gutters"},[a("div",{staticClass:"col-md-4"},[a("a",{attrs:{href:"#"}},[a("img",{staticClass:"card-img",attrs:{src:t.restaurant.image}})])]),a("div",{staticClass:"col-md-8"},[a("div",{staticClass:"card-body"},[a("h5",{staticClass:"card-title"},[t._v(t._s(t.restaurant.name))]),a("span",{staticClass:"badge badge-secondary"},[t._v("收藏數："+t._s(t.restaurant.FavoriteCount))]),a("p",{staticClass:"card-text"},[t._v(" "+t._s(t.restaurant.description)+" ")]),a("router-link",{staticClass:"btn btn-primary mr-2",attrs:{to:{name:"user",params:{id:t.restaurant.id}}}},[t._v("Show")]),t.restaurant.isFavorited?a("button",{staticClass:"btn btn-danger mr-2",attrs:{type:"button",disabled:t.isProcessing},on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.deleteFavorite(t.restaurant.id)}}},[t._v(" 移除最愛 ")]):a("button",{staticClass:"btn btn-primary",attrs:{type:"button",disabled:t.isProcessing},on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.addFavorite(t.restaurant.id)}}},[t._v(" 加到最愛 ")])],1)])])])},o=[],u=a("4cce"),d=a("2fa3"),l={props:{initialRestaurant:{type:Object,required:!0}},data:function(){return{restaurant:this.initialRestaurant,isProcessing:!1}},methods:{addFavorite:function(t){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){var r,s,n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,e.isProcessing=!0,a.next=4,u["a"].addFavorite({restaurantId:t});case 4:if(r=a.sent,s=r.statusText,n=r.data,"OK"===s&&"success"===n.status){a.next=8;break}throw new Error(s);case 8:e.restaurant.FavoriteCount++,e.restaurant.isFavorited=!0,e.isProcessing=!1,a.next=17;break;case 13:a.prev=13,a.t0=a["catch"](0),e.isProcessing=!1,d["a"].fire({icon:"error",title:"無法將餐廳加入最愛，請稍後再試"});case 17:case"end":return a.stop()}}),a,null,[[0,13]])})))()},deleteFavorite:function(t){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){var r,s,n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,e.isProcessing=!0,a.next=4,u["a"].deleteFavorite({restaurantId:t});case 4:if(r=a.sent,s=r.statusText,n=r.data,"OK"===s&&"success"===n.status){a.next=8;break}throw new Error(n.message);case 8:e.restaurant.FavoriteCount--,e.restaurant.isFavorited=!1,e.isProcessing=!1,a.next=17;break;case 13:a.prev=13,a.t0=a["catch"](0),e.isProcessing=!1,d["a"].fire({icon:"error",title:"無法將餐廳移除最愛，請稍後再試"});case 17:case"end":return a.stop()}}),a,null,[[0,13]])})))()}}},p=l,v=a("2877"),b=Object(v["a"])(p,c,o,!1,null,null,null),f=b.exports,g=a("2375"),m=a("c4c3"),h={components:{NavTabs:i["a"],RestaurantTopCard:f,Spinner:g["a"]},data:function(){return{restaurants:[],isLoading:!0,Spinner:g["a"]}},created:function(){this.fetchTopRestaurants()},methods:{fetchTopRestaurants:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var a,r,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,m["a"].getTopRestaurants();case 3:if(a=e.sent,r=a.data,s=a.request,"OK"===s.statusText){e.next=7;break}throw new Error(r.message);case 7:t.restaurants=r.restaurants,t.isLoading=!1,e.next=15;break;case 11:e.prev=11,e.t0=e["catch"](0),t.isLoading=!1,d["a"].fire({icon:"warning",title:"無法取得人氣餐廳資料,請稍後再試"});case 15:case"end":return e.stop()}}),e,null,[[0,11]])})))()}}},w=h,x=Object(v["a"])(w,r,s,!1,null,null,null);e["default"]=x.exports}}]);
//# sourceMappingURL=chunk-2d0c8d68.3c80771f.js.map
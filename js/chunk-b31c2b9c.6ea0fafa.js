(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b31c2b9c"],{"0ecb":function(e,t,a){"use strict";a("dedb")},5652:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container py-5"},[a("AdminNav"),a("form",{staticClass:"my-4"},[a("div",{staticClass:"form-row"},[a("div",{staticClass:"col-auto"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.newCategoryName,expression:"newCategoryName"}],staticClass:"form-control",attrs:{type:"text",placeholder:"新增餐廳類別..."},domProps:{value:e.newCategoryName},on:{input:function(t){t.target.composing||(e.newCategoryName=t.target.value)}}})]),a("div",{staticClass:"col-auto"},[a("button",{staticClass:"btn btn-primary",attrs:{type:"button",disabled:e.isProcessing},on:{click:function(t){return t.stopPropagation(),t.preventDefault(),e.createCategory.apply(null,arguments)}}},[e._v(" 新增 ")])])])]),e.isLoading?a("Spinner"):a("table",{staticClass:"table"},[a("thead",{staticClass:"thead-dark"},[a("tr",[a("th",{attrs:{scope:"col",width:"60"}},[e._v("#")]),a("th",{attrs:{scope:"col"}},[e._v("Category Name")]),a("th",{attrs:{scope:"col",width:"210"}},[e._v("Action")])])]),a("tbody",e._l(e.categories,(function(t){return a("tr",{key:t.id},[a("th",{attrs:{scope:"row"}},[e._v(" "+e._s(t.id)+" ")]),a("td",{staticClass:"position-relative"},[a("div",{directives:[{name:"show",rawName:"v-show",value:!t.isEditing,expression:"!category.isEditing"}],staticClass:"category-name"},[e._v(" "+e._s(t.name)+" ")]),a("input",{directives:[{name:"show",rawName:"v-show",value:t.isEditing,expression:"category.isEditing"},{name:"model",rawName:"v-model",value:t.name,expression:"category.name"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.name},on:{input:function(a){a.target.composing||e.$set(t,"name",a.target.value)}}}),a("span",{directives:[{name:"show",rawName:"v-show",value:t.isEditing,expression:"category.isEditing"}],staticClass:"cancel",on:{click:function(a){return e.handleCancel(t.id)}}},[e._v(" ✕ ")])]),a("td",{staticClass:"d-flex justify-content-between"},[a("button",{directives:[{name:"show",rawName:"v-show",value:!t.isEditing,expression:"!category.isEditing"}],staticClass:"btn btn-link mr-2",attrs:{type:"button"},on:{click:function(a){return a.stopPropagation(),a.preventDefault(),e.toggleIsEditing(t.id)}}},[e._v(" Edit ")]),a("button",{directives:[{name:"show",rawName:"v-show",value:t.isEditing,expression:"category.isEditing"}],staticClass:"btn btn-link mr-2",attrs:{type:"button"},on:{click:function(a){return a.stopPropagation(),a.preventDefault(),e.updateCategory({categoryId:t.id,name:t.name})}}},[e._v(" Save ")]),a("button",{staticClass:"btn btn-link mr-2",attrs:{type:"button"},on:{click:function(a){return a.stopPropagation(),a.preventDefault(),e.deleteCategory(t.id)}}},[e._v(" Delete ")])])])})),0)])],1)},r=[],i=a("5530"),s=a("1da1"),o=(a("96cf"),a("d81d"),a("d9e2"),a("4de4"),a("d3b7"),a("b0c0"),a("e04c")),c=a("be6c"),u=a("2fa3"),d=a("2375"),l={components:{AdminNav:o["a"],Spinner:d["a"]},data:function(){return{categories:[],newCategoryName:"",isProcessing:!1,isLoading:!0}},created:function(){this.fetchCategories()},methods:{fetchCategories:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var a,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,c["a"].categories.get();case 3:a=t.sent,n=a.data,e.categories=n.categories.map((function(e){return Object(i["a"])(Object(i["a"])({},e),{},{isEditing:!1,nameCached:""})})),e.isLoading=!1,t.next=13;break;case 9:t.prev=9,t.t0=t["catch"](0),e.isLoading=!1,u["a"].fire({icon:"error",title:"無法取得餐廳類別，請稍後再試"});case 13:case"end":return t.stop()}}),t,null,[[0,9]])})))()},createCategory:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var a,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,c["a"].categories.create({name:e.newCategoryName});case 3:a=t.sent,n=a.data,e.categories.push({id:n.categoryId,name:e.newCategoryName}),t.next=11;break;case 8:t.prev=8,t.t0=t["catch"](0),u["a"].fire({icon:"error",title:"無法新增餐廳類別，請稍後再試"});case 11:e.newCategoryName="";case 12:case"end":return t.stop()}}),t,null,[[0,8]])})))()},deleteCategory:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var n,r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,c["a"].categories.delete({categoryId:e});case 3:if(n=a.sent,r=n.data,"success"===r.status){a.next=7;break}throw new Error(r.message);case 7:t.categories=t.categories.filter((function(t){return t.id!==e})),a.next=13;break;case 10:a.prev=10,a.t0=a["catch"](0),u["a"].fire({icon:"error",title:"無法刪除餐廳類別，請稍後再試"});case 13:case"end":return a.stop()}}),a,null,[[0,10]])})))()},updateCategory:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function a(){var n,r,i,s;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n=e.categoryId,r=e.name,a.prev=1,a.next=4,c["a"].categories.update({categoryId:n,name:r});case 4:i=a.sent,s=i.data,console.log("data",s),t.toggleIsEditing(n),a.next=13;break;case 10:a.prev=10,a.t0=a["catch"](1),u["a"].fire({icon:"error",title:"無法更新餐廳類別，請稍後再試"});case 13:case"end":return a.stop()}}),a,null,[[1,10]])})))()},toggleIsEditing:function(e){this.categories=this.categories.map((function(t){return t.id===e?Object(i["a"])(Object(i["a"])({},t),{},{isEditing:!t.isEditing,nameCached:t.name}):t}))},handleCancel:function(e){this.categories=this.categories.map((function(t){return t.id===e?Object(i["a"])(Object(i["a"])({},t),{},{name:t.nameCached}):t})),this.toggleIsEditing(e)}}},g=l,m=(a("0ecb"),a("2877")),p=Object(m["a"])(g,n,r,!1,null,"60744c12",null);t["default"]=p.exports},be6c:function(e,t,a){"use strict";a("b0c0");var n=a("2fa3");t["a"]={categories:{get:function(){return n["b"].get("/admin/categories")},create:function(e){var t=e.name;return n["b"].post("/admin/categories",{name:t})},update:function(e){var t=e.categoryId,a=e.name;return n["b"].put("/admin/categories/".concat(t),{name:a})},delete:function(e){var t=e.categoryId;return n["b"].delete("/admin/categories/".concat(t))}},restaurants:{getDetail:function(e){var t=e.restaurantId;return n["b"].get("/admin/restaurants/".concat(t))},create:function(e){var t=e.formData;return n["b"].post("/admin/restaurants",t)},get:function(){return n["b"].get("/admin/restaurants")},delete:function(e){var t=e.restaurantId;return n["b"].delete("/admin/restaurants/".concat(t))},update:function(e){var t=e.restaurantId,a=e.formData;return n["b"].put("/admin/restaurants/".concat(t),a)}},users:{get:function(){return n["b"].get("/admin/users")},update:function(e){var t=e.userId,a=e.isAdmin;return n["b"].put("/admin/users/".concat(t),{isAdmin:a})}}}},d81d:function(e,t,a){"use strict";var n=a("23e7"),r=a("b727").map,i=a("1dde"),s=i("map");n({target:"Array",proto:!0,forced:!s},{map:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}})},dedb:function(e,t,a){},e04c:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"mb-3"},[a("h1",[e._v("餐廳後台")]),a("router-link",{attrs:{to:"/admin/restaurants"}},[e._v(" Restaurants ")]),e._v(" | "),a("router-link",{attrs:{to:"/admin/categories"}},[e._v(" Categories ")]),e._v(" | "),a("router-link",{attrs:{to:"/admin/users"}},[e._v(" Users ")])],1)},r=[],i=a("2877"),s={},o=Object(i["a"])(s,n,r,!1,null,null,null);t["a"]=o.exports}}]);
//# sourceMappingURL=chunk-b31c2b9c.6ea0fafa.js.map
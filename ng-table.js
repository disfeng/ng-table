"use strict";angular.module("ngTable",[]).directive("ngTable",["$compile","$parse","$http","ngTableParams",function(a,b,c,d){return{restrict:"A",priority:1001,scope:!0,controller:["$scope","$timeout",function(a){var b;return a.params=a.params||{page:1,count:10},b=function(b){return b=angular.extend(a.params,b),a.paramsModel.assign(a.$parent,new d(b)),a.params=angular.copy(b)},a.goToPage=function(c){return c>0&&a.params.page!==c&&a.params.count*(c-1)<=a.params.total?b({page:c}):void 0},a.changeCount=function(a){return b({page:1,count:a})},a.doFilter=function(){return b({page:1})},a.sortBy=function(c){var d,e;if(c.sortable)return d=a.params.sorting&&a.params.sorting[c.sortable]&&"desc"===a.params.sorting[c.sortable],e={},e[c.sortable]=d?"asc":"desc",b({sorting:e})}}],compile:function(c){var d,e;return e=0,d=[],angular.forEach(c.find("td"),function(a){var c;return c=$(a),d.push({id:e++,title:c.attr("title")||c.text(),sortable:c.attr("sortable")?c.attr("sortable"):!1,filter:c.attr("filter")?b(c.attr("filter"))():!1,filterData:c.attr("filter-data")?c.attr("filter-data"):null})}),function(c,f,g){var h,i,j;return c.columns=d,h=function(a,b,c){var d,f,g,h,i,j;if(d=11,j=[],i=Math.ceil(b/c),i>1){for(j.push({type:"prev",number:Math.max(1,a-1),active:a>1}),j.push({type:"first",number:1,active:a>1}),g=Math.round((d-5)/2),h=Math.max(2,a-g),f=Math.min(i-1,a+2*g-(a-h)),h=Math.max(2,h-(2*g-(f-h))),e=h;f>=e;)e===h&&2!==e||e===f&&e!==i-1?j.push({type:"more"}):j.push({type:"page",number:e,active:a!==e}),e++;j.push({type:"last",number:i,active:a!==i}),j.push({type:"next",number:Math.min(i,a+1),active:i>a})}return j},c.$parent.$watch(g.ngTable,function(a){return angular.isUndefined(a)?void 0:(c.paramsModel=b(g.ngTable),c.pages=h(a.page,a.total,a.count),c.params=angular.copy(a))},!0),g.showFilter&&c.$parent.$watch(g.showFilter,function(a){return c.show_filter=a}),angular.forEach(d,function(a){var b;if(a.filterData){if(b=c[a.filterData],!b)throw new Error("Function "+a.filterData+" not found in scope");return delete a.filterData,b(a).then(function(b){return angular.isArray(b)||(b=[]),b.unshift({title:"-"}),a.data=b})}}),f.hasClass("ng-table")?void 0:(c.templates={header:g.templateHeader?g.templateHeader:"ng-table/header.html",pagination:g.templatePagination?g.templatePagination:"ng-table/pager.html"},i=a('<thead ng-include="templates.header"></thead>')(c),j=a('<div ng-include="templates.pagination"></div>')(c),f.filter("thead").remove(),f.prepend(i).addClass("ng-table"),f.after(j))}}}}]);var __hasProp={}.hasOwnProperty;angular.module("ngTable").factory("ngTableParams",function(){var a,b;return a=function(a){return!isNaN(parseFloat(a))&&isFinite(a)},b=function(b){var c,d,e,f,g,h,i,j,k,l;c=["total","counts"],this.page=1,this.count=1,this.counts=[10,25,50,100],this.filter={},this.sorting={};for(d in b)if(i=b[d],d.indexOf("[")>=0){for(g=d.split(/\[(.*)\]/),e="",l=g.reverse(),j=0,k=l.length;k>j;j++)f=l[j],""!==f&&(h=i,i={},i[e=f]=a(h)?parseFloat(h):h);this[e]=angular.extend(this[e]||{},i[e])}else this[d]=a(b[d])?parseFloat(b[d]):b[d];return this.orderBy=function(){var a,b,c,d;c=[],d=this.sorting;for(a in d)__hasProp.call(d,a)&&(b=d[a],c.push(("asc"===b?"+":"-")+a));return c},this.url=function(a){var b,e,g,h;a=a||!1,e=a?[]:{};for(d in this)if(this.hasOwnProperty(d)){if(c.indexOf(d)>=0)continue;if(b=this[d],f=encodeURIComponent(d),"object"==typeof b)for(h in b)angular.isUndefined(b[h])||""===b[h]||(g=f+"["+encodeURIComponent(h)+"]",a?e.push(g+"="+encodeURIComponent(b[h])):e[g]=encodeURIComponent(b[h]));else angular.isFunction(b)||angular.isUndefined(b)||""===b||(a?e.push(f+"="+encodeURIComponent(b)):e[f]=encodeURIComponent(b))}return e},this}}),angular.module("ngTable").run(["$templateCache",function(a){a.put("ng-table/header.html",'<tr><th ng-class="{sortable: column.sortable,\'sort-asc\': params.sorting[column.sortable]==\'asc\', \'sort-desc\': params.sorting[column.sortable]==\'desc\'}" ng-click="sortBy(column)" ng-repeat="column in columns" class="header"><div>{{column.title}}</div></th></tr><tr ng-show="show_filter"><th ng-repeat="column in columns" class="filter"><form ng-submit="doFilter()"><input type="submit" style="position: absolute; left: -9999px; width: 1px; height: 1px;"/><div ng-repeat="(name, filter) in column.filter"><input type="text" ng-model="params.filter[name]" ng-show="filter==\'text\'" class="input-filter"/><select ng-options="data.id as data.title for data in column.data" ng-model="params.filter[name]" ng-show="filter==\'select\'" class="filter filter-select"></select><input type="text" date-range="date-range" ng-model="params.filter[name]" ng-show="filter==\'date\'"/><button ng-click="doFilter()" ng-show="filter==\'button\'" class="btn btn-primary btn-block">Filter</button></div></form></th></tr>'),a.put("ng-table/pager.html",'<div><ul class="pagination ng-cloak"><li ng-class="{\'disabled\': !page.active}" ng-repeat="page in pages" ng-switch="page.type"><a ng-switch-when="prev" ng-click="goToPage(page.number)" href="">«</a><a ng-switch-when="first" ng-click="goToPage(page.number)" href="">{{page.number}}</a><a ng-switch-when="page" ng-click="goToPage(page.number)" href="">{{page.number}}</a><a ng-switch-when="more" ng-click="goToPage(page.number)" href="">…</a><a ng-switch-when="last" ng-click="goToPage(page.number)" href="">{{page.number}}</a><a ng-switch-when="next" ng-click="goToPage(page.number)" href="">»</a></li></ul><div ng-show="params.counts.length" class="btn-group pull-right"><button ng-repeat="count in params.counts" type="button" ng-class="{\'active\':params.count==count}" ng-click="changeCount(count)" class="btn btn-mini">{{count}}</button></div></div>')}]);
//# sourceMappingURL=ng-table.map

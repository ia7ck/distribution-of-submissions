(function(t){function e(e){for(var r,s,a=e[0],u=e[1],c=e[2],d=0,p=[];d<a.length;d++)s=a[d],Object.prototype.hasOwnProperty.call(o,s)&&o[s]&&p.push(o[s][0]),o[s]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(t[r]=u[r]);l&&l(e);while(p.length)p.shift()();return i.push.apply(i,c||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],r=!0,a=1;a<n.length;a++){var u=n[a];0!==o[u]&&(r=!1)}r&&(i.splice(e--,1),t=s(s.s=n[0]))}return t}var r={},o={app:0},i=[];function s(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=r,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(n,r,function(e){return t[e]}.bind(null,r));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],u=a.push.bind(a);a.push=e,a=a.slice();for(var c=0;c<a.length;c++)e(a[c]);var l=u;i.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"is-margin-top-sm is-margin-horizontal-xs",attrs:{id:"app"}},[t._m(0),n("h1",{staticClass:"text is-center is-lg"},[t._v("Distribution of Submissions")]),n("AtCoderIDForm",{attrs:{handleSubmit:t.fetchSubmissions,inputDisabled:t.loading}}),n("SubmissionHeatMap",{attrs:{submissions:t.submissions}})],1)},i=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"text is-right is-lg"},[n("a",{attrs:{href:"https://github.com/ia7ck/distribution-of-submissions"}},[n("i",{staticClass:"bx bxl-github"})])])}],s=(n("99af"),n("a434"),n("d3b7"),n("2909")),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("form",{staticClass:"box is-flex is-center is-middle",on:{submit:function(e){return e.preventDefault(),t.onSubmit(e)}}},[n("label",{staticClass:"text is-padding-right-xs",attrs:{for:"atcoder-id"}},[t._v("AtCoder ID")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.id,expression:"id"}],staticClass:"input",attrs:{id:"atcoder-id",type:"text",disabled:t.inputDisabled},domProps:{value:t.id},on:{input:function(e){e.target.composing||(t.id=e.target.value)}}}),n("button",{staticClass:"button is-outline",attrs:{type:"submit",disabled:t.inputDisabled}},[t._v(" Go! ")])])},u=[],c={name:"AtCoderIDForm",data:function(){return{id:this.$route.query.atcoder||""}},props:{handleSubmit:Function,inputDisabled:Boolean},mounted:function(){this.id.length>=1&&this.sendID()},methods:{onSubmit:function(){this.$route.query.atcoder!=this.id&&this.$router.push({path:"/",query:{atcoder:this.id}}),this.sendID()},sendID:function(){this.handleSubmit(this.id)}}},l=c,d=n("2877"),p=Object(d["a"])(l,a,u,!1,null,null,null),f=p.exports,h=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("apexcharts",{attrs:{type:"heatmap",height:"400",options:t.chartOptions,series:t.series}})],1)},m=[],b=(n("4160"),n("d81d"),n("a9e3"),n("aff5"),n("25f0"),n("4d90"),n("159b"),n("1a86")),v=n("d3c6"),g={name:"SubmissionHeatMap",props:{submissions:Array},computed:{series:function(){var t=["Sun.","Mon.","Tue.","Wed.","Thu.","Fri.","Sat."].map((function(t){for(var e=[],n=0;n<24;n++)e.push({x:n.toString(),y:0});return{name:t,data:e}}));return this.submissions.forEach((function(e){var n=1e3*e["epoch_second"],r=Object(b["a"])(n),o=Object(v["a"])(n);t[r]["data"][o]["y"]+=1})),t.reverse(),t}},data:function(){return{chartOptions:{chart:{type:"heatmap"},dataLabels:{enabled:!1},grid:{show:!1},plotOptions:{heatmap:{radius:5,enableShades:!1,colorScale:{ranges:[{name:"0",from:0,to:0,color:"#fafafa"},{from:1,to:5,color:"#dcf8dc"},{from:6,to:10,color:"#95ea95"},{from:11,to:20,color:"#23b123"},{name:"21 -",from:21,to:Number.MAX_SAFE_INTEGER,color:"#156a15"}]}}},states:{hover:{filter:{type:"none"}}},xaxis:{title:{text:"hour"},labels:{formatter:function(t){return parseInt(t)%3!=0?"":t}}},tooltip:{x:{formatter:function(t){var e=t.padStart(2,"0");return"".concat(e,":00-").concat(e,":59")}},y:{formatter:function(t){return t+" submissions"}}}}}}},y=g,x=Object(d["a"])(y,h,m,!1,null,null,null),S=x.exports,_={name:"App",components:{AtCoderIDForm:f,SubmissionHeatMap:S},data:function(){return{submissions:[],loading:!1}},methods:{fetchSubmissions:function(t){var e=this;this.loading=!0,fetch("https://kenkoooo.com/atcoder/atcoder-api/results?user="+t).then((function(t){return t.json()})).then((function(t){var n;(n=e.submissions).splice.apply(n,[0,e.submissions.length].concat(Object(s["a"])(t)))})).catch((function(t){alert("データ取得に失敗しました;;;"),console.error(t)})).finally((function(){e.loading=!1}))}}},O=_,j=Object(d["a"])(O,o,i,!1,null,null,null),w=j.exports,D=n("8c4f"),C=n("1321"),I=n.n(C);r["a"].use(D["a"]);var M=[{path:"/",component:w}],A=new D["a"]({routes:M});r["a"].use(I.a),r["a"].component("apexcharts",I.a),new r["a"]({router:A,render:function(t){return t(w)}}).$mount("#app")}});
//# sourceMappingURL=app.152768d1.js.map
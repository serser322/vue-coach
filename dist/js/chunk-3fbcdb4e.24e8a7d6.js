(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3fbcdb4e"],{"591c":function(t,e,c){"use strict";c.r(e);c("a4d3"),c("e01a");var n=c("7a23"),i=Object(n["i"])("h2",null,"Inteseted? Reach out now!",-1),r=Object(n["j"])("Contact the coach!");function u(t,e,c,u,a,o){var l=Object(n["D"])("base-card"),s=Object(n["D"])("base-button"),b=Object(n["D"])("router-view"),d=Object(n["D"])("base-badge");return Object(n["v"])(),Object(n["h"])("div",null,[Object(n["i"])("section",null,[Object(n["k"])(l,null,{default:Object(n["L"])((function(){return[Object(n["i"])("h2",null,Object(n["G"])(o.fullName),1),Object(n["i"])("h3",null,"$"+Object(n["G"])(o.rate)+"/hour",1)]})),_:1})]),Object(n["i"])("section",null,[Object(n["k"])(l,null,{default:Object(n["L"])((function(){return[Object(n["i"])("header",null,[i,Object(n["k"])(s,{link:"",to:o.contactLink},{default:Object(n["L"])((function(){return[r]})),_:1},8,["to"])]),Object(n["k"])(b)]})),_:1})]),Object(n["i"])("section",null,[Object(n["k"])(l,null,{default:Object(n["L"])((function(){return[(Object(n["v"])(!0),Object(n["h"])(n["a"],null,Object(n["B"])(o.areas,(function(t){return Object(n["v"])(),Object(n["f"])(d,{key:t,type:t,title:t},null,8,["type","title"])})),128)),Object(n["i"])("p",null,Object(n["G"])(o.description),1)]})),_:1})])])}c("7db0");var a={props:["id"],data:function(){return{selectedCoach:null}},computed:{fullName:function(){return this.selectedCoach.firstName+" "+this.selectedCoach.lastName},rate:function(){return this.selectedCoach.hourlyRate},areas:function(){return this.selectedCoach.areas},description:function(){return this.selectedCoach.description},contactLink:function(){return this.$route.path+"/"+this.id+"/contact"}},created:function(){var t=this;this.selectedCoach=this.$store.getters["coaches/coaches"].find((function(e){return e.id===t.id}))}};a.render=u;e["default"]=a},"7db0":function(t,e,c){"use strict";var n=c("23e7"),i=c("b727").find,r=c("44d2"),u="find",a=!0;u in[]&&Array(1)[u]((function(){a=!1})),n({target:"Array",proto:!0,forced:a},{find:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}}),r(u)}}]);
//# sourceMappingURL=chunk-3fbcdb4e.24e8a7d6.js.map
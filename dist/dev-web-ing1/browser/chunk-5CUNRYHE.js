import{c as E}from"./chunk-MAUWZOP2.js";import{a as N}from"./chunk-B2ROMJ5P.js";import{a as x,b as I,c as W,d as F,e as T,f as q,k as D,l as P}from"./chunk-PI5EMYVM.js";import"./chunk-NNRU5QZJ.js";import{Ba as s,Db as L,Fa as g,Fb as V,Ja as C,Na as S,Ta as M,Va as t,Wa as o,Ya as _,Za as y,_a as b,c as v,cb as r,ea as m,eb as h,fa as d,gb as c,hb as u,ib as f}from"./chunk-6CM4DDM5.js";function U(a,l){if(a&1&&(t(0,"div",11),r(1),o()),a&2){let e=b();s(),h(" ",e.errorMessage," ")}}var R=class a{constructor(l,e){this.userService=l;this.router=e;console.log("Login component loaded")}email="";password="";errorMessage="";login(){return v(this,null,function*(){if(console.log("Login button clicked \u2705"),!(yield this.userService.login(this.email,this.password))){this.errorMessage="Email ou mot de passe incorrect.";return}let e=this.userService.getUser();alert(`Bienvenue ! Vous \xEAtes connect\xE9 en tant que ${e}.`),this.router.navigate(["/"])})}static \u0275fac=function(e){return new(e||a)(g(N),g(E))};static \u0275cmp=C({type:a,selectors:[["app-login"]],decls:16,vars:3,consts:[["loginForm","ngForm"],[1,"container","mt-5",2,"max-width","400px"],[1,"mb-4","text-center"],[3,"ngSubmit"],[1,"mb-3"],["for","email",1,"form-label"],["type","email","id","email","name","email","required","",1,"form-control",3,"ngModelChange","ngModel"],["for","password",1,"form-label"],["type","password","id","password","name","password","required","",1,"form-control",3,"ngModelChange","ngModel"],["class","alert alert-danger",4,"ngIf"],["type","submit",1,"btn","btn-primary","w-100"],[1,"alert","alert-danger"]],template:function(e,i){if(e&1){let p=_();t(0,"div",1)(1,"h2",2),r(2,"Connexion"),o(),t(3,"form",3,0),y("ngSubmit",function(){return m(p),d(i.login())}),t(5,"div",4)(6,"label",5),r(7,"Email"),o(),t(8,"input",6),f("ngModelChange",function(n){return m(p),u(i.email,n)||(i.email=n),d(n)}),o()(),t(9,"div",4)(10,"label",7),r(11,"Mot de passe"),o(),t(12,"input",8),f("ngModelChange",function(n){return m(p),u(i.password,n)||(i.password=n),d(n)}),o()(),S(13,U,2,1,"div",9),t(14,"button",10),r(15,"Se connecter"),o()()()}e&2&&(s(8),c("ngModel",i.email),s(4),c("ngModel",i.password),s(),M("ngIf",i.errorMessage))},dependencies:[V,L,P,q,x,I,W,D,T,F],encapsulation:2})};export{R as LoginComponent};

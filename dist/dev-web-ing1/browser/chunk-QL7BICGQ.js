import{a as A,b as k,e as B,h as P,i as q,j as z,l as G}from"./chunk-ZAQOZOOT.js";import{A as N,w as R,y as W}from"./chunk-HQUAAR4S.js";import{Hb as M,Ka as s,Oa as S,Ua as E,V as w,Y as T,Ya as f,ba as x,cc as V,db as d,dc as L,gb as r,hb as n,hc as D,jb as I,ka as m,kb as g,la as p,lb as O,qb as F,rb as l,sb as C,tb as _,x as j,xb as h,yb as b,zb as v}from"./chunk-XZRIOFSC.js";var y=class i{constructor(t){this.firestore=t;this.objectsCollection=N(this.firestore,"connected-objects")}objectsCollection;getConnectedObjects(){return W(this.objectsCollection,{idField:"firebaseId"}).pipe(w(t=>console.log("[Firestore] Retrieved:",t)),j(t=>t))}static \u0275fac=function(e){return new(e||i)(x(R))};static \u0275prov=T({token:i,factory:i.\u0275fac,providedIn:"root"})};function Q(i,t){if(i&1&&(r(0,"option",13),l(1),n()),i&2){let e=t.$implicit;d("value",e),s(),C(e)}}function U(i,t){if(i&1&&(r(0,"option",13),l(1),n()),i&2){let e=t.$implicit;d("value",e),s(),C(e)}}function X(i,t){if(i&1&&(r(0,"p",20),l(1),n()),i&2){let e=O().$implicit;s(),C(e.description)}}function Y(i,t){if(i&1&&(r(0,"div",15)(1,"div",16)(2,"h5",17),l(3),n(),f(4,X,2,1,"p",18),r(5,"ul",19)(6,"li")(7,"strong"),l(8,"Type :"),n(),l(9),n(),r(10,"li")(11,"strong"),l(12,"Localisation :"),n(),l(13),n(),r(14,"li")(15,"strong"),l(16,"Connectivit\xE9 :"),n(),l(17),n(),r(18,"li")(19,"strong"),l(20,"Statut :"),n(),l(21),n()()()()),i&2){let e=t.$implicit;s(3),C(e.name),s(),d("ngIf",e.description),s(5),_(" ",e.type,""),s(4),_(" ",e.location,""),s(4),_(" ",e.connectivity,""),s(4),_(" ",e.status,"")}}function Z(i,t){if(i&1&&(r(0,"div"),f(1,Y,22,6,"div",14),n()),i&2){let e=O();s(),d("ngForOf",e.filteredObjects)}}function $(i,t){i&1&&(r(0,"div",21),l(1," Aucun objet ne correspond \xE0 votre recherche. "),n())}var H=class i{constructor(t){this.objectService=t}allObjects=[];filteredObjects=[];searchText="";selectedType="";selectedLocation="";objectTypes=[];locations=[];ngOnInit(){this.objectService.getConnectedObjects().subscribe(t=>{this.allObjects=t,this.filteredObjects=[...this.allObjects],this.objectTypes=Array.from(new Set(t.map(e=>e.type))).sort(),this.locations=Array.from(new Set(t.map(e=>e.location))).sort()})}filterObjects(){this.filteredObjects=this.allObjects.filter(t=>{let e=t.name.toLowerCase().includes(this.searchText.toLowerCase())||t.description?.toLowerCase().includes(this.searchText.toLowerCase()),o=!this.selectedType||t.type===this.selectedType,a=!this.selectedLocation||t.location===this.selectedLocation;return e&&o&&a})}resetFilters(){this.searchText="",this.selectedType="",this.selectedLocation="",this.filteredObjects=[...this.allObjects]}static \u0275fac=function(e){return new(e||i)(S(y))};static \u0275cmp=E({type:i,selectors:[["app-consultation"]],decls:22,vars:7,consts:[["noResult",""],[1,"container","mt-4"],[1,"mb-4","text-custom-blue"],[1,"row","g-2","mb-3","align-items-end"],[1,"col-md-4"],["type","text","placeholder","Recherche par mot-cl\xE9...",1,"form-control",3,"ngModelChange","input","ngModel"],[1,"col-md-3"],[1,"form-select",3,"ngModelChange","change","ngModel"],["value",""],[3,"value",4,"ngFor","ngForOf"],[1,"col-md-2","text-end"],[1,"btn","btn-outline-secondary","w-100",3,"click"],[4,"ngIf","ngIfElse"],[3,"value"],["class","card mb-3 shadow-sm",4,"ngFor","ngForOf"],[1,"card","mb-3","shadow-sm"],[1,"card-body"],[1,"card-title"],["class","card-text",4,"ngIf"],[1,"list-unstyled","mb-0"],[1,"card-text"],[1,"alert","alert-warning","text-center"]],template:function(e,o){if(e&1){let a=I();r(0,"div",1)(1,"h3",2),l(2,"\u{1F50D} Recherche d'objets connect\xE9s"),n(),r(3,"div",3)(4,"div",4)(5,"input",5),v("ngModelChange",function(c){return m(a),b(o.searchText,c)||(o.searchText=c),p(c)}),g("input",function(){return m(a),p(o.filterObjects())}),n()(),r(6,"div",6)(7,"select",7),v("ngModelChange",function(c){return m(a),b(o.selectedType,c)||(o.selectedType=c),p(c)}),g("change",function(){return m(a),p(o.filterObjects())}),r(8,"option",8),l(9,"Tous les types"),n(),f(10,Q,2,2,"option",9),n()(),r(11,"div",6)(12,"select",7),v("ngModelChange",function(c){return m(a),b(o.selectedLocation,c)||(o.selectedLocation=c),p(c)}),g("change",function(){return m(a),p(o.filterObjects())}),r(13,"option",8),l(14,"Toutes les localisations"),n(),f(15,U,2,2,"option",9),n()(),r(16,"div",10)(17,"button",11),g("click",function(){return m(a),p(o.resetFilters())}),l(18,"\u267B\uFE0F R\xE9initialiser"),n()()(),f(19,Z,2,1,"div",12)(20,$,2,0,"ng-template",null,0,M),n()}if(e&2){let a=F(21);s(5),h("ngModel",o.searchText),s(2),h("ngModel",o.selectedType),s(3),d("ngForOf",o.objectTypes),s(2),h("ngModel",o.selectedLocation),s(3),d("ngForOf",o.locations),s(4),d("ngIf",o.filteredObjects.length>0)("ngIfElse",a)}},dependencies:[D,V,L,G,q,z,A,P,k,B],encapsulation:2})};export{H as ConsultationComponent};

import{B as le,Ea as E,Fa as o,Ka as X,La as l,Ma as d,Pa as ue,Q as R,R as f,Sa as de,T as z,Ua as Y,V as m,Za as v,a as u,b as c,da as Z,ga as _,i as se,jb as g,ma as b,q as oe,qa as A,qb as ce,ra as M,sb as K,tb as p,ub as F,v as ae,vb as J}from"./chunk-6CM4DDM5.js";var Ve=(()=>{class n{_renderer;_elementRef;onChange=e=>{};onTouched=()=>{};constructor(e,i){this._renderer=e,this._elementRef=i}setProperty(e,i){this._renderer.setProperty(this._elementRef.nativeElement,e,i)}registerOnTouched(e){this.onTouched=e}registerOnChange(e){this.onChange=e}setDisabledState(e){this.setProperty("disabled",e)}static \u0275fac=function(i){return new(i||n)(o(E),o(A))};static \u0275dir=l({type:n})}return n})(),$=(()=>{class n extends Ve{static \u0275fac=(()=>{let e;return function(r){return(e||(e=_(n)))(r||n)}})();static \u0275dir=l({type:n,features:[d]})}return n})(),P=new m("");var Ge={provide:P,useExisting:f(()=>De),multi:!0};function Te(){let n=J()?J().getUserAgent():"";return/android (\d+)/.test(n.toLowerCase())}var je=new m(""),De=(()=>{class n extends Ve{_compositionMode;_composing=!1;constructor(e,i,r){super(e,i),this._compositionMode=r,this._compositionMode==null&&(this._compositionMode=!Te())}writeValue(e){let i=e??"";this.setProperty("value",i)}_handleInput(e){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(e)}_compositionStart(){this._composing=!0}_compositionEnd(e){this._composing=!1,this._compositionMode&&this.onChange(e)}static \u0275fac=function(i){return new(i||n)(o(E),o(A),o(je,8))};static \u0275dir=l({type:n,selectors:[["input","formControlName","",3,"type","checkbox"],["textarea","formControlName",""],["input","formControl","",3,"type","checkbox"],["textarea","formControl",""],["input","ngModel","",3,"type","checkbox"],["textarea","ngModel",""],["","ngDefaultControl",""]],hostBindings:function(i,r){i&1&&v("input",function(a){return r._handleInput(a.target.value)})("blur",function(){return r.onTouched()})("compositionstart",function(){return r._compositionStart()})("compositionend",function(a){return r._compositionEnd(a.target.value)})},standalone:!1,features:[g([Ge]),d]})}return n})();function Be(n){return n==null||Ue(n)===0}function Ue(n){return n==null?null:Array.isArray(n)||typeof n=="string"?n.length:n instanceof Set?n.size:null}var ee=new m(""),be=new m("");function He(n){return Be(n.value)?{required:!0}:null}function he(n){return null}function Ae(n){return n!=null}function Me(n){return ue(n)?oe(n):n}function Ee(n){let t={};return n.forEach(e=>{t=e!=null?u(u({},t),e):t}),Object.keys(t).length===0?null:t}function Fe(n,t){return t.map(e=>e(n))}function Le(n){return!n.validate}function we(n){return n.map(t=>Le(t)?t:e=>t.validate(e))}function $e(n){if(!n)return null;let t=n.filter(Ae);return t.length==0?null:function(e){return Ee(Fe(e,t))}}function te(n){return n!=null?$e(we(n)):null}function We(n){if(!n)return null;let t=n.filter(Ae);return t.length==0?null:function(e){let i=Fe(e,t).map(Me);return le(i).pipe(ae(Ee))}}function ne(n){return n!=null?We(we(n)):null}function fe(n,t){return n===null?[t]:Array.isArray(n)?[...n,t]:[n,t]}function qe(n){return n._rawValidators}function ze(n){return n._rawAsyncValidators}function Q(n){return n?Array.isArray(n)?n:[n]:[]}function T(n,t){return Array.isArray(n)?n.includes(t):n===t}function ge(n,t){let e=Q(t);return Q(n).forEach(r=>{T(e,r)||e.push(r)}),e}function pe(n,t){return Q(t).filter(e=>!T(n,e))}var j=class{get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators=[];_rawAsyncValidators=[];_setValidators(t){this._rawValidators=t||[],this._composedValidatorFn=te(this._rawValidators)}_setAsyncValidators(t){this._rawAsyncValidators=t||[],this._composedAsyncValidatorFn=ne(this._rawAsyncValidators)}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_onDestroyCallbacks=[];_registerOnDestroy(t){this._onDestroyCallbacks.push(t)}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(t=>t()),this._onDestroyCallbacks=[]}reset(t=void 0){this.control&&this.control.reset(t)}hasError(t,e){return this.control?this.control.hasError(t,e):!1}getError(t,e){return this.control?this.control.getError(t,e):null}},V=class extends j{name;get formDirective(){return null}get path(){return null}},x=class extends j{_parent=null;name=null;valueAccessor=null},B=class{_cd;constructor(t){this._cd=t}get isTouched(){return this._cd?.control?._touched?.(),!!this._cd?.control?.touched}get isUntouched(){return!!this._cd?.control?.untouched}get isPristine(){return this._cd?.control?._pristine?.(),!!this._cd?.control?.pristine}get isDirty(){return!!this._cd?.control?.dirty}get isValid(){return this._cd?.control?._status?.(),!!this._cd?.control?.valid}get isInvalid(){return!!this._cd?.control?.invalid}get isPending(){return!!this._cd?.control?.pending}get isSubmitted(){return this._cd?._submitted?.(),!!this._cd?.submitted}},Ze={"[class.ng-untouched]":"isUntouched","[class.ng-touched]":"isTouched","[class.ng-pristine]":"isPristine","[class.ng-dirty]":"isDirty","[class.ng-valid]":"isValid","[class.ng-invalid]":"isInvalid","[class.ng-pending]":"isPending"},$t=c(u({},Ze),{"[class.ng-submitted]":"isSubmitted"}),Wt=(()=>{class n extends B{constructor(e){super(e)}static \u0275fac=function(i){return new(i||n)(o(x,2))};static \u0275dir=l({type:n,selectors:[["","formControlName",""],["","ngModel",""],["","formControl",""]],hostVars:14,hostBindings:function(i,r){i&2&&Y("ng-untouched",r.isUntouched)("ng-touched",r.isTouched)("ng-pristine",r.isPristine)("ng-dirty",r.isDirty)("ng-valid",r.isValid)("ng-invalid",r.isInvalid)("ng-pending",r.isPending)},standalone:!1,features:[d]})}return n})(),qt=(()=>{class n extends B{constructor(e){super(e)}static \u0275fac=function(i){return new(i||n)(o(V,10))};static \u0275dir=l({type:n,selectors:[["","formGroupName",""],["","formArrayName",""],["","ngModelGroup",""],["","formGroup",""],["form",3,"ngNoForm",""],["","ngForm",""]],hostVars:16,hostBindings:function(i,r){i&2&&Y("ng-untouched",r.isUntouched)("ng-touched",r.isTouched)("ng-pristine",r.isPristine)("ng-dirty",r.isDirty)("ng-valid",r.isValid)("ng-invalid",r.isInvalid)("ng-pending",r.isPending)("ng-submitted",r.isSubmitted)},standalone:!1,features:[d]})}return n})();var w="VALID",G="INVALID",y="PENDING",I="DISABLED",D=class{},U=class extends D{value;source;constructor(t,e){super(),this.value=t,this.source=e}},N=class extends D{pristine;source;constructor(t,e){super(),this.pristine=t,this.source=e}},O=class extends D{touched;source;constructor(t,e){super(),this.touched=t,this.source=e}},C=class extends D{status;source;constructor(t,e){super(),this.status=t,this.source=e}};function Ie(n){return(W(n)?n.validators:n)||null}function Xe(n){return Array.isArray(n)?te(n):n||null}function Se(n,t){return(W(t)?t.asyncValidators:n)||null}function Ye(n){return Array.isArray(n)?ne(n):n||null}function W(n){return n!=null&&!Array.isArray(n)&&typeof n=="object"}function Ke(n,t,e){let i=n.controls;if(!(t?Object.keys(i):i).length)throw new R(1e3,"");if(!i[e])throw new R(1001,"")}function Je(n,t,e){n._forEachChild((i,r)=>{if(e[r]===void 0)throw new R(1002,"")})}var H=class{_pendingDirty=!1;_hasOwnPendingAsyncValidator=null;_pendingTouched=!1;_onCollectionChange=()=>{};_updateOn;_parent=null;_asyncValidationSubscription;_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators;_rawAsyncValidators;value;constructor(t,e){this._assignValidators(t),this._assignAsyncValidators(e)}get validator(){return this._composedValidatorFn}set validator(t){this._rawValidators=this._composedValidatorFn=t}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(t){this._rawAsyncValidators=this._composedAsyncValidatorFn=t}get parent(){return this._parent}get status(){return p(this.statusReactive)}set status(t){p(()=>this.statusReactive.set(t))}_status=F(()=>this.statusReactive());statusReactive=M(void 0);get valid(){return this.status===w}get invalid(){return this.status===G}get pending(){return this.status==y}get disabled(){return this.status===I}get enabled(){return this.status!==I}errors;get pristine(){return p(this.pristineReactive)}set pristine(t){p(()=>this.pristineReactive.set(t))}_pristine=F(()=>this.pristineReactive());pristineReactive=M(!0);get dirty(){return!this.pristine}get touched(){return p(this.touchedReactive)}set touched(t){p(()=>this.touchedReactive.set(t))}_touched=F(()=>this.touchedReactive());touchedReactive=M(!1);get untouched(){return!this.touched}_events=new se;events=this._events.asObservable();valueChanges;statusChanges;get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:"change"}setValidators(t){this._assignValidators(t)}setAsyncValidators(t){this._assignAsyncValidators(t)}addValidators(t){this.setValidators(ge(t,this._rawValidators))}addAsyncValidators(t){this.setAsyncValidators(ge(t,this._rawAsyncValidators))}removeValidators(t){this.setValidators(pe(t,this._rawValidators))}removeAsyncValidators(t){this.setAsyncValidators(pe(t,this._rawAsyncValidators))}hasValidator(t){return T(this._rawValidators,t)}hasAsyncValidator(t){return T(this._rawAsyncValidators,t)}clearValidators(){this.validator=null}clearAsyncValidators(){this.asyncValidator=null}markAsTouched(t={}){let e=this.touched===!1;this.touched=!0;let i=t.sourceControl??this;this._parent&&!t.onlySelf&&this._parent.markAsTouched(c(u({},t),{sourceControl:i})),e&&t.emitEvent!==!1&&this._events.next(new O(!0,i))}markAllAsTouched(t={}){this.markAsTouched({onlySelf:!0,emitEvent:t.emitEvent,sourceControl:this}),this._forEachChild(e=>e.markAllAsTouched(t))}markAsUntouched(t={}){let e=this.touched===!0;this.touched=!1,this._pendingTouched=!1;let i=t.sourceControl??this;this._forEachChild(r=>{r.markAsUntouched({onlySelf:!0,emitEvent:t.emitEvent,sourceControl:i})}),this._parent&&!t.onlySelf&&this._parent._updateTouched(t,i),e&&t.emitEvent!==!1&&this._events.next(new O(!1,i))}markAsDirty(t={}){let e=this.pristine===!0;this.pristine=!1;let i=t.sourceControl??this;this._parent&&!t.onlySelf&&this._parent.markAsDirty(c(u({},t),{sourceControl:i})),e&&t.emitEvent!==!1&&this._events.next(new N(!1,i))}markAsPristine(t={}){let e=this.pristine===!1;this.pristine=!0,this._pendingDirty=!1;let i=t.sourceControl??this;this._forEachChild(r=>{r.markAsPristine({onlySelf:!0,emitEvent:t.emitEvent})}),this._parent&&!t.onlySelf&&this._parent._updatePristine(t,i),e&&t.emitEvent!==!1&&this._events.next(new N(!0,i))}markAsPending(t={}){this.status=y;let e=t.sourceControl??this;t.emitEvent!==!1&&(this._events.next(new C(this.status,e)),this.statusChanges.emit(this.status)),this._parent&&!t.onlySelf&&this._parent.markAsPending(c(u({},t),{sourceControl:e}))}disable(t={}){let e=this._parentMarkedDirty(t.onlySelf);this.status=I,this.errors=null,this._forEachChild(r=>{r.disable(c(u({},t),{onlySelf:!0}))}),this._updateValue();let i=t.sourceControl??this;t.emitEvent!==!1&&(this._events.next(new U(this.value,i)),this._events.next(new C(this.status,i)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors(c(u({},t),{skipPristineCheck:e}),this),this._onDisabledChange.forEach(r=>r(!0))}enable(t={}){let e=this._parentMarkedDirty(t.onlySelf);this.status=w,this._forEachChild(i=>{i.enable(c(u({},t),{onlySelf:!0}))}),this.updateValueAndValidity({onlySelf:!0,emitEvent:t.emitEvent}),this._updateAncestors(c(u({},t),{skipPristineCheck:e}),this),this._onDisabledChange.forEach(i=>i(!1))}_updateAncestors(t,e){this._parent&&!t.onlySelf&&(this._parent.updateValueAndValidity(t),t.skipPristineCheck||this._parent._updatePristine({},e),this._parent._updateTouched({},e))}setParent(t){this._parent=t}getRawValue(){return this.value}updateValueAndValidity(t={}){if(this._setInitialStatus(),this._updateValue(),this.enabled){let i=this._cancelExistingSubscription();this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===w||this.status===y)&&this._runAsyncValidator(i,t.emitEvent)}let e=t.sourceControl??this;t.emitEvent!==!1&&(this._events.next(new U(this.value,e)),this._events.next(new C(this.status,e)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._parent&&!t.onlySelf&&this._parent.updateValueAndValidity(c(u({},t),{sourceControl:e}))}_updateTreeValidity(t={emitEvent:!0}){this._forEachChild(e=>e._updateTreeValidity(t)),this.updateValueAndValidity({onlySelf:!0,emitEvent:t.emitEvent})}_setInitialStatus(){this.status=this._allControlsDisabled()?I:w}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(t,e){if(this.asyncValidator){this.status=y,this._hasOwnPendingAsyncValidator={emitEvent:e!==!1};let i=Me(this.asyncValidator(this));this._asyncValidationSubscription=i.subscribe(r=>{this._hasOwnPendingAsyncValidator=null,this.setErrors(r,{emitEvent:e,shouldHaveEmitted:t})})}}_cancelExistingSubscription(){if(this._asyncValidationSubscription){this._asyncValidationSubscription.unsubscribe();let t=this._hasOwnPendingAsyncValidator?.emitEvent??!1;return this._hasOwnPendingAsyncValidator=null,t}return!1}setErrors(t,e={}){this.errors=t,this._updateControlsErrors(e.emitEvent!==!1,this,e.shouldHaveEmitted)}get(t){let e=t;return e==null||(Array.isArray(e)||(e=e.split(".")),e.length===0)?null:e.reduce((i,r)=>i&&i._find(r),this)}getError(t,e){let i=e?this.get(e):this;return i&&i.errors?i.errors[t]:null}hasError(t,e){return!!this.getError(t,e)}get root(){let t=this;for(;t._parent;)t=t._parent;return t}_updateControlsErrors(t,e,i){this.status=this._calculateStatus(),t&&this.statusChanges.emit(this.status),(t||i)&&this._events.next(new C(this.status,e)),this._parent&&this._parent._updateControlsErrors(t,e,i)}_initObservables(){this.valueChanges=new b,this.statusChanges=new b}_calculateStatus(){return this._allControlsDisabled()?I:this.errors?G:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(y)?y:this._anyControlsHaveStatus(G)?G:w}_anyControlsHaveStatus(t){return this._anyControls(e=>e.status===t)}_anyControlsDirty(){return this._anyControls(t=>t.dirty)}_anyControlsTouched(){return this._anyControls(t=>t.touched)}_updatePristine(t,e){let i=!this._anyControlsDirty(),r=this.pristine!==i;this.pristine=i,this._parent&&!t.onlySelf&&this._parent._updatePristine(t,e),r&&this._events.next(new N(this.pristine,e))}_updateTouched(t={},e){this.touched=this._anyControlsTouched(),this._events.next(new O(this.touched,e)),this._parent&&!t.onlySelf&&this._parent._updateTouched(t,e)}_onDisabledChange=[];_registerOnCollectionChange(t){this._onCollectionChange=t}_setUpdateStrategy(t){W(t)&&t.updateOn!=null&&(this._updateOn=t.updateOn)}_parentMarkedDirty(t){let e=this._parent&&this._parent.dirty;return!t&&!!e&&!this._parent._anyControlsDirty()}_find(t){return null}_assignValidators(t){this._rawValidators=Array.isArray(t)?t.slice():t,this._composedValidatorFn=Xe(this._rawValidators)}_assignAsyncValidators(t){this._rawAsyncValidators=Array.isArray(t)?t.slice():t,this._composedAsyncValidatorFn=Ye(this._rawAsyncValidators)}},L=class extends H{constructor(t,e,i){super(Ie(e),Se(i,e)),this.controls=t,this._initObservables(),this._setUpdateStrategy(e),this._setUpControls(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator})}controls;registerControl(t,e){return this.controls[t]?this.controls[t]:(this.controls[t]=e,e.setParent(this),e._registerOnCollectionChange(this._onCollectionChange),e)}addControl(t,e,i={}){this.registerControl(t,e),this.updateValueAndValidity({emitEvent:i.emitEvent}),this._onCollectionChange()}removeControl(t,e={}){this.controls[t]&&this.controls[t]._registerOnCollectionChange(()=>{}),delete this.controls[t],this.updateValueAndValidity({emitEvent:e.emitEvent}),this._onCollectionChange()}setControl(t,e,i={}){this.controls[t]&&this.controls[t]._registerOnCollectionChange(()=>{}),delete this.controls[t],e&&this.registerControl(t,e),this.updateValueAndValidity({emitEvent:i.emitEvent}),this._onCollectionChange()}contains(t){return this.controls.hasOwnProperty(t)&&this.controls[t].enabled}setValue(t,e={}){Je(this,!0,t),Object.keys(t).forEach(i=>{Ke(this,!0,i),this.controls[i].setValue(t[i],{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e)}patchValue(t,e={}){t!=null&&(Object.keys(t).forEach(i=>{let r=this.controls[i];r&&r.patchValue(t[i],{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e))}reset(t={},e={}){this._forEachChild((i,r)=>{i.reset(t?t[r]:null,{onlySelf:!0,emitEvent:e.emitEvent})}),this._updatePristine(e,this),this._updateTouched(e,this),this.updateValueAndValidity(e)}getRawValue(){return this._reduceChildren({},(t,e,i)=>(t[i]=e.getRawValue(),t))}_syncPendingControls(){let t=this._reduceChildren(!1,(e,i)=>i._syncPendingControls()?!0:e);return t&&this.updateValueAndValidity({onlySelf:!0}),t}_forEachChild(t){Object.keys(this.controls).forEach(e=>{let i=this.controls[e];i&&t(i,e)})}_setUpControls(){this._forEachChild(t=>{t.setParent(this),t._registerOnCollectionChange(this._onCollectionChange)})}_updateValue(){this.value=this._reduceValue()}_anyControls(t){for(let[e,i]of Object.entries(this.controls))if(this.contains(e)&&t(i))return!0;return!1}_reduceValue(){let t={};return this._reduceChildren(t,(e,i,r)=>((i.enabled||this.disabled)&&(e[r]=i.value),e))}_reduceChildren(t,e){let i=t;return this._forEachChild((r,s)=>{i=e(i,r,s)}),i}_allControlsDisabled(){for(let t of Object.keys(this.controls))if(this.controls[t].enabled)return!1;return Object.keys(this.controls).length>0||this.disabled}_find(t){return this.controls.hasOwnProperty(t)?this.controls[t]:null}};var ie=new m("",{providedIn:"root",factory:()=>re}),re="always";function Qe(n,t){return[...t.path,n]}function Ne(n,t,e=re){Oe(n,t),t.valueAccessor.writeValue(n.value),(n.disabled||e==="always")&&t.valueAccessor.setDisabledState?.(n.disabled),tt(n,t),it(n,t),nt(n,t),et(n,t)}function me(n,t){n.forEach(e=>{e.registerOnValidatorChange&&e.registerOnValidatorChange(t)})}function et(n,t){if(t.valueAccessor.setDisabledState){let e=i=>{t.valueAccessor.setDisabledState(i)};n.registerOnDisabledChange(e),t._registerOnDestroy(()=>{n._unregisterOnDisabledChange(e)})}}function Oe(n,t){let e=qe(n);t.validator!==null?n.setValidators(fe(e,t.validator)):typeof e=="function"&&n.setValidators([e]);let i=ze(n);t.asyncValidator!==null?n.setAsyncValidators(fe(i,t.asyncValidator)):typeof i=="function"&&n.setAsyncValidators([i]);let r=()=>n.updateValueAndValidity();me(t._rawValidators,r),me(t._rawAsyncValidators,r)}function tt(n,t){t.valueAccessor.registerOnChange(e=>{n._pendingValue=e,n._pendingChange=!0,n._pendingDirty=!0,n.updateOn==="change"&&xe(n,t)})}function nt(n,t){t.valueAccessor.registerOnTouched(()=>{n._pendingTouched=!0,n.updateOn==="blur"&&n._pendingChange&&xe(n,t),n.updateOn!=="submit"&&n.markAsTouched()})}function xe(n,t){n._pendingDirty&&n.markAsDirty(),n.setValue(n._pendingValue,{emitModelToViewChange:!1}),t.viewToModelUpdate(n._pendingValue),n._pendingChange=!1}function it(n,t){let e=(i,r)=>{t.valueAccessor.writeValue(i),r&&t.viewToModelUpdate(i)};n.registerOnChange(e),t._registerOnDestroy(()=>{n._unregisterOnChange(e)})}function rt(n,t){n==null,Oe(n,t)}function st(n,t){if(!n.hasOwnProperty("model"))return!1;let e=n.model;return e.isFirstChange()?!0:!Object.is(t,e.currentValue)}function ot(n){return Object.getPrototypeOf(n.constructor)===$}function at(n,t){n._syncPendingControls(),t.forEach(e=>{let i=e.control;i.updateOn==="submit"&&i._pendingChange&&(e.viewToModelUpdate(i._pendingValue),i._pendingChange=!1)})}function lt(n,t){if(!t)return null;Array.isArray(t);let e,i,r;return t.forEach(s=>{s.constructor===De?e=s:ot(s)?i=s:r=s}),r||i||e||null}var ut={provide:V,useExisting:f(()=>dt)},S=Promise.resolve(),dt=(()=>{class n extends V{callSetDisabledState;get submitted(){return p(this.submittedReactive)}_submitted=F(()=>this.submittedReactive());submittedReactive=M(!1);_directives=new Set;form;ngSubmit=new b;options;constructor(e,i,r){super(),this.callSetDisabledState=r,this.form=new L({},te(e),ne(i))}ngAfterViewInit(){this._setUpdateStrategy()}get formDirective(){return this}get control(){return this.form}get path(){return[]}get controls(){return this.form.controls}addControl(e){S.then(()=>{let i=this._findContainer(e.path);e.control=i.registerControl(e.name,e.control),Ne(e.control,e,this.callSetDisabledState),e.control.updateValueAndValidity({emitEvent:!1}),this._directives.add(e)})}getControl(e){return this.form.get(e.path)}removeControl(e){S.then(()=>{let i=this._findContainer(e.path);i&&i.removeControl(e.name),this._directives.delete(e)})}addFormGroup(e){S.then(()=>{let i=this._findContainer(e.path),r=new L({});rt(r,e),i.registerControl(e.name,r),r.updateValueAndValidity({emitEvent:!1})})}removeFormGroup(e){S.then(()=>{let i=this._findContainer(e.path);i&&i.removeControl(e.name)})}getFormGroup(e){return this.form.get(e.path)}updateModel(e,i){S.then(()=>{this.form.get(e.path).setValue(i)})}setValue(e){this.control.setValue(e)}onSubmit(e){return this.submittedReactive.set(!0),at(this.form,this._directives),this.ngSubmit.emit(e),e?.target?.method==="dialog"}onReset(){this.resetForm()}resetForm(e=void 0){this.form.reset(e),this.submittedReactive.set(!1)}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.form._updateOn=this.options.updateOn)}_findContainer(e){return e.pop(),e.length?this.form.get(e):this.form}static \u0275fac=function(i){return new(i||n)(o(ee,10),o(be,10),o(ie,8))};static \u0275dir=l({type:n,selectors:[["form",3,"ngNoForm","",3,"formGroup",""],["ng-form"],["","ngForm",""]],hostBindings:function(i,r){i&1&&v("submit",function(a){return r.onSubmit(a)})("reset",function(){return r.onReset()})},inputs:{options:[0,"ngFormOptions","options"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:!1,features:[g([ut]),d]})}return n})();function _e(n,t){let e=n.indexOf(t);e>-1&&n.splice(e,1)}function ve(n){return typeof n=="object"&&n!==null&&Object.keys(n).length===2&&"value"in n&&"disabled"in n}var ct=class extends H{defaultValue=null;_onChange=[];_pendingValue;_pendingChange=!1;constructor(t=null,e,i){super(Ie(e),Se(i,e)),this._applyFormState(t),this._setUpdateStrategy(e),this._initObservables(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator}),W(e)&&(e.nonNullable||e.initialValueIsDefault)&&(ve(t)?this.defaultValue=t.value:this.defaultValue=t)}setValue(t,e={}){this.value=this._pendingValue=t,this._onChange.length&&e.emitModelToViewChange!==!1&&this._onChange.forEach(i=>i(this.value,e.emitViewToModelChange!==!1)),this.updateValueAndValidity(e)}patchValue(t,e={}){this.setValue(t,e)}reset(t=this.defaultValue,e={}){this._applyFormState(t),this.markAsPristine(e),this.markAsUntouched(e),this.setValue(this.value,e),this._pendingChange=!1}_updateValue(){}_anyControls(t){return!1}_allControlsDisabled(){return this.disabled}registerOnChange(t){this._onChange.push(t)}_unregisterOnChange(t){_e(this._onChange,t)}registerOnDisabledChange(t){this._onDisabledChange.push(t)}_unregisterOnDisabledChange(t){_e(this._onDisabledChange,t)}_forEachChild(t){}_syncPendingControls(){return this.updateOn==="submit"&&(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),this._pendingChange)?(this.setValue(this._pendingValue,{onlySelf:!0,emitModelToViewChange:!1}),!0):!1}_applyFormState(t){ve(t)?(this.value=this._pendingValue=t.value,t.disabled?this.disable({onlySelf:!0,emitEvent:!1}):this.enable({onlySelf:!0,emitEvent:!1})):this.value=this._pendingValue=t}};var ht={provide:x,useExisting:f(()=>ft)},ye=Promise.resolve(),ft=(()=>{class n extends x{_changeDetectorRef;callSetDisabledState;control=new ct;static ngAcceptInputType_isDisabled;_registered=!1;viewModel;name="";isDisabled;model;options;update=new b;constructor(e,i,r,s,a,h){super(),this._changeDetectorRef=a,this.callSetDisabledState=h,this._parent=e,this._setValidators(i),this._setAsyncValidators(r),this.valueAccessor=lt(this,s)}ngOnChanges(e){if(this._checkForErrors(),!this._registered||"name"in e){if(this._registered&&(this._checkName(),this.formDirective)){let i=e.name.previousValue;this.formDirective.removeControl({name:i,path:this._getPath(i)})}this._setUpControl()}"isDisabled"in e&&this._updateDisabled(e),st(e,this.viewModel)&&(this._updateValue(this.model),this.viewModel=this.model)}ngOnDestroy(){this.formDirective&&this.formDirective.removeControl(this)}get path(){return this._getPath(this.name)}get formDirective(){return this._parent?this._parent.formDirective:null}viewToModelUpdate(e){this.viewModel=e,this.update.emit(e)}_setUpControl(){this._setUpdateStrategy(),this._isStandalone()?this._setUpStandalone():this.formDirective.addControl(this),this._registered=!0}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.control._updateOn=this.options.updateOn)}_isStandalone(){return!this._parent||!!(this.options&&this.options.standalone)}_setUpStandalone(){Ne(this.control,this,this.callSetDisabledState),this.control.updateValueAndValidity({emitEvent:!1})}_checkForErrors(){this._checkName()}_checkName(){this.options&&this.options.name&&(this.name=this.options.name),!this._isStandalone()&&this.name}_updateValue(e){ye.then(()=>{this.control.setValue(e,{emitViewToModelChange:!1}),this._changeDetectorRef?.markForCheck()})}_updateDisabled(e){let i=e.isDisabled.currentValue,r=i!==0&&K(i);ye.then(()=>{r&&!this.control.disabled?this.control.disable():!r&&this.control.disabled&&this.control.enable(),this._changeDetectorRef?.markForCheck()})}_getPath(e){return this._parent?Qe(e,this._parent):[e]}static \u0275fac=function(i){return new(i||n)(o(V,9),o(ee,10),o(be,10),o(P,10),o(ce,8),o(ie,8))};static \u0275dir=l({type:n,selectors:[["","ngModel","",3,"formControlName","",3,"formControl",""]],inputs:{name:"name",isDisabled:[0,"disabled","isDisabled"],model:[0,"ngModel","model"],options:[0,"ngModelOptions","options"]},outputs:{update:"ngModelChange"},exportAs:["ngModel"],standalone:!1,features:[g([ht]),d,Z]})}return n})();var Zt=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275dir=l({type:n,selectors:[["form",3,"ngNoForm","",3,"ngNativeValidate",""]],hostAttrs:["novalidate",""],standalone:!1})}return n})(),gt={provide:P,useExisting:f(()=>pt),multi:!0},pt=(()=>{class n extends ${writeValue(e){let i=e??"";this.setProperty("value",i)}registerOnChange(e){this.onChange=i=>{e(i==""?null:parseFloat(i))}}static \u0275fac=(()=>{let e;return function(r){return(e||(e=_(n)))(r||n)}})();static \u0275dir=l({type:n,selectors:[["input","type","number","formControlName",""],["input","type","number","formControl",""],["input","type","number","ngModel",""]],hostBindings:function(i,r){i&1&&v("input",function(a){return r.onChange(a.target.value)})("blur",function(){return r.onTouched()})},standalone:!1,features:[g([gt]),d]})}return n})();var mt={provide:P,useExisting:f(()=>ke),multi:!0};function Pe(n,t){return n==null?`${t}`:(t&&typeof t=="object"&&(t="Object"),`${n}: ${t}`.slice(0,50))}function _t(n){return n.split(":")[0]}var ke=(()=>{class n extends ${value;_optionMap=new Map;_idCounter=0;set compareWith(e){this._compareWith=e}_compareWith=Object.is;writeValue(e){this.value=e;let i=this._getOptionId(e),r=Pe(i,e);this.setProperty("value",r)}registerOnChange(e){this.onChange=i=>{this.value=this._getOptionValue(i),e(this.value)}}_registerOption(){return(this._idCounter++).toString()}_getOptionId(e){for(let i of this._optionMap.keys())if(this._compareWith(this._optionMap.get(i),e))return i;return null}_getOptionValue(e){let i=_t(e);return this._optionMap.has(i)?this._optionMap.get(i):e}static \u0275fac=(()=>{let e;return function(r){return(e||(e=_(n)))(r||n)}})();static \u0275dir=l({type:n,selectors:[["select","formControlName","",3,"multiple",""],["select","formControl","",3,"multiple",""],["select","ngModel","",3,"multiple",""]],hostBindings:function(i,r){i&1&&v("change",function(a){return r.onChange(a.target.value)})("blur",function(){return r.onTouched()})},inputs:{compareWith:"compareWith"},standalone:!1,features:[g([mt]),d]})}return n})(),Xt=(()=>{class n{_element;_renderer;_select;id;constructor(e,i,r){this._element=e,this._renderer=i,this._select=r,this._select&&(this.id=this._select._registerOption())}set ngValue(e){this._select!=null&&(this._select._optionMap.set(this.id,e),this._setElementValue(Pe(this.id,e)),this._select.writeValue(this._select.value))}set value(e){this._setElementValue(e),this._select&&this._select.writeValue(this._select.value)}_setElementValue(e){this._renderer.setProperty(this._element.nativeElement,"value",e)}ngOnDestroy(){this._select&&(this._select._optionMap.delete(this.id),this._select.writeValue(this._select.value))}static \u0275fac=function(i){return new(i||n)(o(A),o(E),o(ke,9))};static \u0275dir=l({type:n,selectors:[["option"]],inputs:{ngValue:"ngValue",value:"value"},standalone:!1})}return n})(),vt={provide:P,useExisting:f(()=>Re),multi:!0};function Ce(n,t){return n==null?`${t}`:(typeof t=="string"&&(t=`'${t}'`),t&&typeof t=="object"&&(t="Object"),`${n}: ${t}`.slice(0,50))}function yt(n){return n.split(":")[0]}var Re=(()=>{class n extends ${value;_optionMap=new Map;_idCounter=0;set compareWith(e){this._compareWith=e}_compareWith=Object.is;writeValue(e){this.value=e;let i;if(Array.isArray(e)){let r=e.map(s=>this._getOptionId(s));i=(s,a)=>{s._setSelected(r.indexOf(a.toString())>-1)}}else i=(r,s)=>{r._setSelected(!1)};this._optionMap.forEach(i)}registerOnChange(e){this.onChange=i=>{let r=[],s=i.selectedOptions;if(s!==void 0){let a=s;for(let h=0;h<a.length;h++){let k=a[h],q=this._getOptionValue(k.value);r.push(q)}}else{let a=i.options;for(let h=0;h<a.length;h++){let k=a[h];if(k.selected){let q=this._getOptionValue(k.value);r.push(q)}}}this.value=r,e(r)}}_registerOption(e){let i=(this._idCounter++).toString();return this._optionMap.set(i,e),i}_getOptionId(e){for(let i of this._optionMap.keys())if(this._compareWith(this._optionMap.get(i)._value,e))return i;return null}_getOptionValue(e){let i=yt(e);return this._optionMap.has(i)?this._optionMap.get(i)._value:e}static \u0275fac=(()=>{let e;return function(r){return(e||(e=_(n)))(r||n)}})();static \u0275dir=l({type:n,selectors:[["select","multiple","","formControlName",""],["select","multiple","","formControl",""],["select","multiple","","ngModel",""]],hostBindings:function(i,r){i&1&&v("change",function(a){return r.onChange(a.target)})("blur",function(){return r.onTouched()})},inputs:{compareWith:"compareWith"},standalone:!1,features:[g([vt]),d]})}return n})(),Yt=(()=>{class n{_element;_renderer;_select;id;_value;constructor(e,i,r){this._element=e,this._renderer=i,this._select=r,this._select&&(this.id=this._select._registerOption(this))}set ngValue(e){this._select!=null&&(this._value=e,this._setElementValue(Ce(this.id,e)),this._select.writeValue(this._select.value))}set value(e){this._select?(this._value=e,this._setElementValue(Ce(this.id,e)),this._select.writeValue(this._select.value)):this._setElementValue(e)}_setElementValue(e){this._renderer.setProperty(this._element.nativeElement,"value",e)}_setSelected(e){this._renderer.setProperty(this._element.nativeElement,"selected",e)}ngOnDestroy(){this._select&&(this._select._optionMap.delete(this.id),this._select.writeValue(this._select.value))}static \u0275fac=function(i){return new(i||n)(o(A),o(E),o(Re,9))};static \u0275dir=l({type:n,selectors:[["option"]],inputs:{ngValue:"ngValue",value:"value"},standalone:!1})}return n})();var Ct=(()=>{class n{_validator=he;_onChange;_enabled;ngOnChanges(e){if(this.inputName in e){let i=this.normalizeInput(e[this.inputName].currentValue);this._enabled=this.enabled(i),this._validator=this._enabled?this.createValidator(i):he,this._onChange&&this._onChange()}}validate(e){return this._validator(e)}registerOnValidatorChange(e){this._onChange=e}enabled(e){return e!=null}static \u0275fac=function(i){return new(i||n)};static \u0275dir=l({type:n,features:[Z]})}return n})();var Vt={provide:ee,useExisting:f(()=>Dt),multi:!0};var Dt=(()=>{class n extends Ct{required;inputName="required";normalizeInput=K;createValidator=e=>He;enabled(e){return e}static \u0275fac=(()=>{let e;return function(r){return(e||(e=_(n)))(r||n)}})();static \u0275dir=l({type:n,selectors:[["","required","","formControlName","",3,"type","checkbox"],["","required","","formControl","",3,"type","checkbox"],["","required","","ngModel","",3,"type","checkbox"]],hostVars:1,hostBindings:function(i,r){i&2&&de("required",r._enabled?"":null)},inputs:{required:"required"},standalone:!1,features:[g([Vt]),d]})}return n})();var bt=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=X({type:n});static \u0275inj=z({})}return n})();var Kt=(()=>{class n{static withConfig(e){return{ngModule:n,providers:[{provide:ie,useValue:e.callSetDisabledState??re}]}}static \u0275fac=function(i){return new(i||n)};static \u0275mod=X({type:n});static \u0275inj=z({imports:[bt]})}return n})();export{De as a,Wt as b,qt as c,dt as d,ft as e,Zt as f,pt as g,ke as h,Xt as i,Yt as j,Dt as k,Kt as l};

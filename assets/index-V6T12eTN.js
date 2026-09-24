(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const f of document.querySelectorAll('link[rel="modulepreload"]'))c(f);new MutationObserver(f=>{for(const h of f)if(h.type==="childList")for(const g of h.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&c(g)}).observe(document,{childList:!0,subtree:!0});function r(f){const h={};return f.integrity&&(h.integrity=f.integrity),f.referrerPolicy&&(h.referrerPolicy=f.referrerPolicy),f.crossOrigin==="use-credentials"?h.credentials="include":f.crossOrigin==="anonymous"?h.credentials="omit":h.credentials="same-origin",h}function c(f){if(f.ep)return;f.ep=!0;const h=r(f);fetch(f.href,h)}})();function U2(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var lu={exports:{}},Bi={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var qp;function q2(){if(qp)return Bi;qp=1;var n=Symbol.for("react.transitional.element"),i=Symbol.for("react.fragment");function r(c,f,h){var g=null;if(h!==void 0&&(g=""+h),f.key!==void 0&&(g=""+f.key),"key"in f){h={};for(var v in f)v!=="key"&&(h[v]=f[v])}else h=f;return f=h.ref,{$$typeof:n,type:c,key:g,ref:f!==void 0?f:null,props:h}}return Bi.Fragment=i,Bi.jsx=r,Bi.jsxs=r,Bi}var Yp;function Y2(){return Yp||(Yp=1,lu.exports=q2()),lu.exports}var m=Y2(),iu={exports:{}},ht={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Gp;function G2(){if(Gp)return ht;Gp=1;var n=Symbol.for("react.transitional.element"),i=Symbol.for("react.portal"),r=Symbol.for("react.fragment"),c=Symbol.for("react.strict_mode"),f=Symbol.for("react.profiler"),h=Symbol.for("react.consumer"),g=Symbol.for("react.context"),v=Symbol.for("react.forward_ref"),y=Symbol.for("react.suspense"),w=Symbol.for("react.memo"),j=Symbol.for("react.lazy"),R=Symbol.iterator;function M(b){return b===null||typeof b!="object"?null:(b=R&&b[R]||b["@@iterator"],typeof b=="function"?b:null)}var F={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},G=Object.assign,Q={};function Z(b,N,J){this.props=b,this.context=N,this.refs=Q,this.updater=J||F}Z.prototype.isReactComponent={},Z.prototype.setState=function(b,N){if(typeof b!="object"&&typeof b!="function"&&b!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,b,N,"setState")},Z.prototype.forceUpdate=function(b){this.updater.enqueueForceUpdate(this,b,"forceUpdate")};function K(){}K.prototype=Z.prototype;function k(b,N,J){this.props=b,this.context=N,this.refs=Q,this.updater=J||F}var q=k.prototype=new K;q.constructor=k,G(q,Z.prototype),q.isPureReactComponent=!0;var P=Array.isArray,L={H:null,A:null,T:null,S:null},it=Object.prototype.hasOwnProperty;function U(b,N,J,V,H,ot){return J=ot.ref,{$$typeof:n,type:b,key:N,ref:J!==void 0?J:null,props:ot}}function X(b,N){return U(b.type,N,void 0,void 0,void 0,b.props)}function Y(b){return typeof b=="object"&&b!==null&&b.$$typeof===n}function W(b){var N={"=":"=0",":":"=2"};return"$"+b.replace(/[=:]/g,function(J){return N[J]})}var bt=/\/+/g;function Gt(b,N){return typeof b=="object"&&b!==null&&b.key!=null?W(""+b.key):N.toString(36)}function mt(){}function Xt(b){switch(b.status){case"fulfilled":return b.value;case"rejected":throw b.reason;default:switch(typeof b.status=="string"?b.then(mt,mt):(b.status="pending",b.then(function(N){b.status==="pending"&&(b.status="fulfilled",b.value=N)},function(N){b.status==="pending"&&(b.status="rejected",b.reason=N)})),b.status){case"fulfilled":return b.value;case"rejected":throw b.reason}}throw b}function Ht(b,N,J,V,H){var ot=typeof b;(ot==="undefined"||ot==="boolean")&&(b=null);var ct=!1;if(b===null)ct=!0;else switch(ot){case"bigint":case"string":case"number":ct=!0;break;case"object":switch(b.$$typeof){case n:case i:ct=!0;break;case j:return ct=b._init,Ht(ct(b._payload),N,J,V,H)}}if(ct)return H=H(b),ct=V===""?"."+Gt(b,0):V,P(H)?(J="",ct!=null&&(J=ct.replace(bt,"$&/")+"/"),Ht(H,N,J,"",function(St){return St})):H!=null&&(Y(H)&&(H=X(H,J+(H.key==null||b&&b.key===H.key?"":(""+H.key).replace(bt,"$&/")+"/")+ct)),N.push(H)),1;ct=0;var at=V===""?".":V+":";if(P(b))for(var ut=0;ut<b.length;ut++)V=b[ut],ot=at+Gt(V,ut),ct+=Ht(V,N,J,ot,H);else if(ut=M(b),typeof ut=="function")for(b=ut.call(b),ut=0;!(V=b.next()).done;)V=V.value,ot=at+Gt(V,ut++),ct+=Ht(V,N,J,ot,H);else if(ot==="object"){if(typeof b.then=="function")return Ht(Xt(b),N,J,V,H);throw N=String(b),Error("Objects are not valid as a React child (found: "+(N==="[object Object]"?"object with keys {"+Object.keys(b).join(", ")+"}":N)+"). If you meant to render a collection of children, use an array instead.")}return ct}function D(b,N,J){if(b==null)return b;var V=[],H=0;return Ht(b,V,"","",function(ot){return N.call(J,ot,H++)}),V}function lt(b){if(b._status===-1){var N=b._result;N=N(),N.then(function(J){(b._status===0||b._status===-1)&&(b._status=1,b._result=J)},function(J){(b._status===0||b._status===-1)&&(b._status=2,b._result=J)}),b._status===-1&&(b._status=0,b._result=N)}if(b._status===1)return b._result.default;throw b._result}var I=typeof reportError=="function"?reportError:function(b){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var N=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof b=="object"&&b!==null&&typeof b.message=="string"?String(b.message):String(b),error:b});if(!window.dispatchEvent(N))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",b);return}console.error(b)};function wt(){}return ht.Children={map:D,forEach:function(b,N,J){D(b,function(){N.apply(this,arguments)},J)},count:function(b){var N=0;return D(b,function(){N++}),N},toArray:function(b){return D(b,function(N){return N})||[]},only:function(b){if(!Y(b))throw Error("React.Children.only expected to receive a single React element child.");return b}},ht.Component=Z,ht.Fragment=r,ht.Profiler=f,ht.PureComponent=k,ht.StrictMode=c,ht.Suspense=y,ht.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=L,ht.act=function(){throw Error("act(...) is not supported in production builds of React.")},ht.cache=function(b){return function(){return b.apply(null,arguments)}},ht.cloneElement=function(b,N,J){if(b==null)throw Error("The argument must be a React element, but you passed "+b+".");var V=G({},b.props),H=b.key,ot=void 0;if(N!=null)for(ct in N.ref!==void 0&&(ot=void 0),N.key!==void 0&&(H=""+N.key),N)!it.call(N,ct)||ct==="key"||ct==="__self"||ct==="__source"||ct==="ref"&&N.ref===void 0||(V[ct]=N[ct]);var ct=arguments.length-2;if(ct===1)V.children=J;else if(1<ct){for(var at=Array(ct),ut=0;ut<ct;ut++)at[ut]=arguments[ut+2];V.children=at}return U(b.type,H,void 0,void 0,ot,V)},ht.createContext=function(b){return b={$$typeof:g,_currentValue:b,_currentValue2:b,_threadCount:0,Provider:null,Consumer:null},b.Provider=b,b.Consumer={$$typeof:h,_context:b},b},ht.createElement=function(b,N,J){var V,H={},ot=null;if(N!=null)for(V in N.key!==void 0&&(ot=""+N.key),N)it.call(N,V)&&V!=="key"&&V!=="__self"&&V!=="__source"&&(H[V]=N[V]);var ct=arguments.length-2;if(ct===1)H.children=J;else if(1<ct){for(var at=Array(ct),ut=0;ut<ct;ut++)at[ut]=arguments[ut+2];H.children=at}if(b&&b.defaultProps)for(V in ct=b.defaultProps,ct)H[V]===void 0&&(H[V]=ct[V]);return U(b,ot,void 0,void 0,null,H)},ht.createRef=function(){return{current:null}},ht.forwardRef=function(b){return{$$typeof:v,render:b}},ht.isValidElement=Y,ht.lazy=function(b){return{$$typeof:j,_payload:{_status:-1,_result:b},_init:lt}},ht.memo=function(b,N){return{$$typeof:w,type:b,compare:N===void 0?null:N}},ht.startTransition=function(b){var N=L.T,J={};L.T=J;try{var V=b(),H=L.S;H!==null&&H(J,V),typeof V=="object"&&V!==null&&typeof V.then=="function"&&V.then(wt,I)}catch(ot){I(ot)}finally{L.T=N}},ht.unstable_useCacheRefresh=function(){return L.H.useCacheRefresh()},ht.use=function(b){return L.H.use(b)},ht.useActionState=function(b,N,J){return L.H.useActionState(b,N,J)},ht.useCallback=function(b,N){return L.H.useCallback(b,N)},ht.useContext=function(b){return L.H.useContext(b)},ht.useDebugValue=function(){},ht.useDeferredValue=function(b,N){return L.H.useDeferredValue(b,N)},ht.useEffect=function(b,N){return L.H.useEffect(b,N)},ht.useId=function(){return L.H.useId()},ht.useImperativeHandle=function(b,N,J){return L.H.useImperativeHandle(b,N,J)},ht.useInsertionEffect=function(b,N){return L.H.useInsertionEffect(b,N)},ht.useLayoutEffect=function(b,N){return L.H.useLayoutEffect(b,N)},ht.useMemo=function(b,N){return L.H.useMemo(b,N)},ht.useOptimistic=function(b,N){return L.H.useOptimistic(b,N)},ht.useReducer=function(b,N,J){return L.H.useReducer(b,N,J)},ht.useRef=function(b){return L.H.useRef(b)},ht.useState=function(b){return L.H.useState(b)},ht.useSyncExternalStore=function(b,N,J){return L.H.useSyncExternalStore(b,N,J)},ht.useTransition=function(){return L.H.useTransition()},ht.version="19.0.0",ht}var Xp;function Du(){return Xp||(Xp=1,iu.exports=G2()),iu.exports}var st=Du();const yt=U2(st);var ou={exports:{}},Ni={},ru={exports:{}},su={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Vp;function X2(){return Vp||(Vp=1,function(n){function i(D,lt){var I=D.length;D.push(lt);t:for(;0<I;){var wt=I-1>>>1,b=D[wt];if(0<f(b,lt))D[wt]=lt,D[I]=b,I=wt;else break t}}function r(D){return D.length===0?null:D[0]}function c(D){if(D.length===0)return null;var lt=D[0],I=D.pop();if(I!==lt){D[0]=I;t:for(var wt=0,b=D.length,N=b>>>1;wt<N;){var J=2*(wt+1)-1,V=D[J],H=J+1,ot=D[H];if(0>f(V,I))H<b&&0>f(ot,V)?(D[wt]=ot,D[H]=I,wt=H):(D[wt]=V,D[J]=I,wt=J);else if(H<b&&0>f(ot,I))D[wt]=ot,D[H]=I,wt=H;else break t}}return lt}function f(D,lt){var I=D.sortIndex-lt.sortIndex;return I!==0?I:D.id-lt.id}if(n.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var h=performance;n.unstable_now=function(){return h.now()}}else{var g=Date,v=g.now();n.unstable_now=function(){return g.now()-v}}var y=[],w=[],j=1,R=null,M=3,F=!1,G=!1,Q=!1,Z=typeof setTimeout=="function"?setTimeout:null,K=typeof clearTimeout=="function"?clearTimeout:null,k=typeof setImmediate<"u"?setImmediate:null;function q(D){for(var lt=r(w);lt!==null;){if(lt.callback===null)c(w);else if(lt.startTime<=D)c(w),lt.sortIndex=lt.expirationTime,i(y,lt);else break;lt=r(w)}}function P(D){if(Q=!1,q(D),!G)if(r(y)!==null)G=!0,Xt();else{var lt=r(w);lt!==null&&Ht(P,lt.startTime-D)}}var L=!1,it=-1,U=5,X=-1;function Y(){return!(n.unstable_now()-X<U)}function W(){if(L){var D=n.unstable_now();X=D;var lt=!0;try{t:{G=!1,Q&&(Q=!1,K(it),it=-1),F=!0;var I=M;try{e:{for(q(D),R=r(y);R!==null&&!(R.expirationTime>D&&Y());){var wt=R.callback;if(typeof wt=="function"){R.callback=null,M=R.priorityLevel;var b=wt(R.expirationTime<=D);if(D=n.unstable_now(),typeof b=="function"){R.callback=b,q(D),lt=!0;break e}R===r(y)&&c(y),q(D)}else c(y);R=r(y)}if(R!==null)lt=!0;else{var N=r(w);N!==null&&Ht(P,N.startTime-D),lt=!1}}break t}finally{R=null,M=I,F=!1}lt=void 0}}finally{lt?bt():L=!1}}}var bt;if(typeof k=="function")bt=function(){k(W)};else if(typeof MessageChannel<"u"){var Gt=new MessageChannel,mt=Gt.port2;Gt.port1.onmessage=W,bt=function(){mt.postMessage(null)}}else bt=function(){Z(W,0)};function Xt(){L||(L=!0,bt())}function Ht(D,lt){it=Z(function(){D(n.unstable_now())},lt)}n.unstable_IdlePriority=5,n.unstable_ImmediatePriority=1,n.unstable_LowPriority=4,n.unstable_NormalPriority=3,n.unstable_Profiling=null,n.unstable_UserBlockingPriority=2,n.unstable_cancelCallback=function(D){D.callback=null},n.unstable_continueExecution=function(){G||F||(G=!0,Xt())},n.unstable_forceFrameRate=function(D){0>D||125<D?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):U=0<D?Math.floor(1e3/D):5},n.unstable_getCurrentPriorityLevel=function(){return M},n.unstable_getFirstCallbackNode=function(){return r(y)},n.unstable_next=function(D){switch(M){case 1:case 2:case 3:var lt=3;break;default:lt=M}var I=M;M=lt;try{return D()}finally{M=I}},n.unstable_pauseExecution=function(){},n.unstable_requestPaint=function(){},n.unstable_runWithPriority=function(D,lt){switch(D){case 1:case 2:case 3:case 4:case 5:break;default:D=3}var I=M;M=D;try{return lt()}finally{M=I}},n.unstable_scheduleCallback=function(D,lt,I){var wt=n.unstable_now();switch(typeof I=="object"&&I!==null?(I=I.delay,I=typeof I=="number"&&0<I?wt+I:wt):I=wt,D){case 1:var b=-1;break;case 2:b=250;break;case 5:b=1073741823;break;case 4:b=1e4;break;default:b=5e3}return b=I+b,D={id:j++,callback:lt,priorityLevel:D,startTime:I,expirationTime:b,sortIndex:-1},I>wt?(D.sortIndex=I,i(w,D),r(y)===null&&D===r(w)&&(Q?(K(it),it=-1):Q=!0,Ht(P,I-wt))):(D.sortIndex=b,i(y,D),G||F||(G=!0,Xt())),D},n.unstable_shouldYield=Y,n.unstable_wrapCallback=function(D){var lt=M;return function(){var I=M;M=lt;try{return D.apply(this,arguments)}finally{M=I}}}}(su)),su}var Qp;function V2(){return Qp||(Qp=1,ru.exports=X2()),ru.exports}var cu={exports:{}},he={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var $p;function Q2(){if($p)return he;$p=1;var n=Du();function i(y){var w="https://react.dev/errors/"+y;if(1<arguments.length){w+="?args[]="+encodeURIComponent(arguments[1]);for(var j=2;j<arguments.length;j++)w+="&args[]="+encodeURIComponent(arguments[j])}return"Minified React error #"+y+"; visit "+w+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function r(){}var c={d:{f:r,r:function(){throw Error(i(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},f=Symbol.for("react.portal");function h(y,w,j){var R=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:f,key:R==null?null:""+R,children:y,containerInfo:w,implementation:j}}var g=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function v(y,w){if(y==="font")return"";if(typeof w=="string")return w==="use-credentials"?w:""}return he.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=c,he.createPortal=function(y,w){var j=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!w||w.nodeType!==1&&w.nodeType!==9&&w.nodeType!==11)throw Error(i(299));return h(y,w,null,j)},he.flushSync=function(y){var w=g.T,j=c.p;try{if(g.T=null,c.p=2,y)return y()}finally{g.T=w,c.p=j,c.d.f()}},he.preconnect=function(y,w){typeof y=="string"&&(w?(w=w.crossOrigin,w=typeof w=="string"?w==="use-credentials"?w:"":void 0):w=null,c.d.C(y,w))},he.prefetchDNS=function(y){typeof y=="string"&&c.d.D(y)},he.preinit=function(y,w){if(typeof y=="string"&&w&&typeof w.as=="string"){var j=w.as,R=v(j,w.crossOrigin),M=typeof w.integrity=="string"?w.integrity:void 0,F=typeof w.fetchPriority=="string"?w.fetchPriority:void 0;j==="style"?c.d.S(y,typeof w.precedence=="string"?w.precedence:void 0,{crossOrigin:R,integrity:M,fetchPriority:F}):j==="script"&&c.d.X(y,{crossOrigin:R,integrity:M,fetchPriority:F,nonce:typeof w.nonce=="string"?w.nonce:void 0})}},he.preinitModule=function(y,w){if(typeof y=="string")if(typeof w=="object"&&w!==null){if(w.as==null||w.as==="script"){var j=v(w.as,w.crossOrigin);c.d.M(y,{crossOrigin:j,integrity:typeof w.integrity=="string"?w.integrity:void 0,nonce:typeof w.nonce=="string"?w.nonce:void 0})}}else w==null&&c.d.M(y)},he.preload=function(y,w){if(typeof y=="string"&&typeof w=="object"&&w!==null&&typeof w.as=="string"){var j=w.as,R=v(j,w.crossOrigin);c.d.L(y,j,{crossOrigin:R,integrity:typeof w.integrity=="string"?w.integrity:void 0,nonce:typeof w.nonce=="string"?w.nonce:void 0,type:typeof w.type=="string"?w.type:void 0,fetchPriority:typeof w.fetchPriority=="string"?w.fetchPriority:void 0,referrerPolicy:typeof w.referrerPolicy=="string"?w.referrerPolicy:void 0,imageSrcSet:typeof w.imageSrcSet=="string"?w.imageSrcSet:void 0,imageSizes:typeof w.imageSizes=="string"?w.imageSizes:void 0,media:typeof w.media=="string"?w.media:void 0})}},he.preloadModule=function(y,w){if(typeof y=="string")if(w){var j=v(w.as,w.crossOrigin);c.d.m(y,{as:typeof w.as=="string"&&w.as!=="script"?w.as:void 0,crossOrigin:j,integrity:typeof w.integrity=="string"?w.integrity:void 0})}else c.d.m(y)},he.requestFormReset=function(y){c.d.r(y)},he.unstable_batchedUpdates=function(y,w){return y(w)},he.useFormState=function(y,w,j){return g.H.useFormState(y,w,j)},he.useFormStatus=function(){return g.H.useHostTransitionStatus()},he.version="19.0.0",he}var Zp;function $2(){if(Zp)return cu.exports;Zp=1;function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(i){console.error(i)}}return n(),cu.exports=Q2(),cu.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Kp;function Z2(){if(Kp)return Ni;Kp=1;var n=V2(),i=Du(),r=$2();function c(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)e+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function f(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}var h=Symbol.for("react.element"),g=Symbol.for("react.transitional.element"),v=Symbol.for("react.portal"),y=Symbol.for("react.fragment"),w=Symbol.for("react.strict_mode"),j=Symbol.for("react.profiler"),R=Symbol.for("react.provider"),M=Symbol.for("react.consumer"),F=Symbol.for("react.context"),G=Symbol.for("react.forward_ref"),Q=Symbol.for("react.suspense"),Z=Symbol.for("react.suspense_list"),K=Symbol.for("react.memo"),k=Symbol.for("react.lazy"),q=Symbol.for("react.offscreen"),P=Symbol.for("react.memo_cache_sentinel"),L=Symbol.iterator;function it(t){return t===null||typeof t!="object"?null:(t=L&&t[L]||t["@@iterator"],typeof t=="function"?t:null)}var U=Symbol.for("react.client.reference");function X(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===U?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case y:return"Fragment";case v:return"Portal";case j:return"Profiler";case w:return"StrictMode";case Q:return"Suspense";case Z:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case F:return(t.displayName||"Context")+".Provider";case M:return(t._context.displayName||"Context")+".Consumer";case G:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case K:return e=t.displayName||null,e!==null?e:X(t.type)||"Memo";case k:e=t._payload,t=t._init;try{return X(t(e))}catch{}}return null}var Y=i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,W=Object.assign,bt,Gt;function mt(t){if(bt===void 0)try{throw Error()}catch(a){var e=a.stack.trim().match(/\n( *(at )?)/);bt=e&&e[1]||"",Gt=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+bt+t+Gt}var Xt=!1;function Ht(t,e){if(!t||Xt)return"";Xt=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var l={DetermineComponentFrameRoot:function(){try{if(e){var B=function(){throw Error()};if(Object.defineProperty(B.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(B,[])}catch(C){var _=C}Reflect.construct(t,[],B)}else{try{B.call()}catch(C){_=C}t.call(B.prototype)}}else{try{throw Error()}catch(C){_=C}(B=t())&&typeof B.catch=="function"&&B.catch(function(){})}}catch(C){if(C&&_&&typeof C.stack=="string")return[C.stack,_.stack]}return[null,null]}};l.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var o=Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot,"name");o&&o.configurable&&Object.defineProperty(l.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var s=l.DetermineComponentFrameRoot(),u=s[0],d=s[1];if(u&&d){var p=u.split(`
`),S=d.split(`
`);for(o=l=0;l<p.length&&!p[l].includes("DetermineComponentFrameRoot");)l++;for(;o<S.length&&!S[o].includes("DetermineComponentFrameRoot");)o++;if(l===p.length||o===S.length)for(l=p.length-1,o=S.length-1;1<=l&&0<=o&&p[l]!==S[o];)o--;for(;1<=l&&0<=o;l--,o--)if(p[l]!==S[o]){if(l!==1||o!==1)do if(l--,o--,0>o||p[l]!==S[o]){var z=`
`+p[l].replace(" at new "," at ");return t.displayName&&z.includes("<anonymous>")&&(z=z.replace("<anonymous>",t.displayName)),z}while(1<=l&&0<=o);break}}}finally{Xt=!1,Error.prepareStackTrace=a}return(a=t?t.displayName||t.name:"")?mt(a):""}function D(t){switch(t.tag){case 26:case 27:case 5:return mt(t.type);case 16:return mt("Lazy");case 13:return mt("Suspense");case 19:return mt("SuspenseList");case 0:case 15:return t=Ht(t.type,!1),t;case 11:return t=Ht(t.type.render,!1),t;case 1:return t=Ht(t.type,!0),t;default:return""}}function lt(t){try{var e="";do e+=D(t),t=t.return;while(t);return e}catch(a){return`
Error generating stack: `+a.message+`
`+a.stack}}function I(t){var e=t,a=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,(e.flags&4098)!==0&&(a=e.return),t=e.return;while(t)}return e.tag===3?a:null}function wt(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function b(t){if(I(t)!==t)throw Error(c(188))}function N(t){var e=t.alternate;if(!e){if(e=I(t),e===null)throw Error(c(188));return e!==t?null:t}for(var a=t,l=e;;){var o=a.return;if(o===null)break;var s=o.alternate;if(s===null){if(l=o.return,l!==null){a=l;continue}break}if(o.child===s.child){for(s=o.child;s;){if(s===a)return b(o),t;if(s===l)return b(o),e;s=s.sibling}throw Error(c(188))}if(a.return!==l.return)a=o,l=s;else{for(var u=!1,d=o.child;d;){if(d===a){u=!0,a=o,l=s;break}if(d===l){u=!0,l=o,a=s;break}d=d.sibling}if(!u){for(d=s.child;d;){if(d===a){u=!0,a=s,l=o;break}if(d===l){u=!0,l=s,a=o;break}d=d.sibling}if(!u)throw Error(c(189))}}if(a.alternate!==l)throw Error(c(190))}if(a.tag!==3)throw Error(c(188));return a.stateNode.current===a?t:e}function J(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t;for(t=t.child;t!==null;){if(e=J(t),e!==null)return e;t=t.sibling}return null}var V=Array.isArray,H=r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ot={pending:!1,data:null,method:null,action:null},ct=[],at=-1;function ut(t){return{current:t}}function St(t){0>at||(t.current=ct[at],ct[at]=null,at--)}function dt(t,e){at++,ct[at]=t.current,t.current=e}var Ee=ut(null),Dl=ut(null),Oa=ut(null),Fi=ut(null);function Pi(t,e){switch(dt(Oa,e),dt(Dl,t),dt(Ee,null),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)&&(e=e.namespaceURI)?mp(e):0;break;default:if(t=t===8?e.parentNode:e,e=t.tagName,t=t.namespaceURI)t=mp(t),e=gp(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}St(Ee),dt(Ee,e)}function qn(){St(Ee),St(Dl),St(Oa)}function Jr(t){t.memoizedState!==null&&dt(Fi,t);var e=Ee.current,a=gp(e,t.type);e!==a&&(dt(Dl,t),dt(Ee,a))}function Ii(t){Dl.current===t&&(St(Ee),St(Dl)),Fi.current===t&&(St(Fi),Ci._currentValue=ot)}var Wr=Object.prototype.hasOwnProperty,Fr=n.unstable_scheduleCallback,Pr=n.unstable_cancelCallback,yg=n.unstable_shouldYield,bg=n.unstable_requestPaint,aa=n.unstable_now,vg=n.unstable_getCurrentPriorityLevel,nf=n.unstable_ImmediatePriority,lf=n.unstable_UserBlockingPriority,to=n.unstable_NormalPriority,wg=n.unstable_LowPriority,of=n.unstable_IdlePriority,xg=n.log,Sg=n.unstable_setDisableYieldValue,Rl=null,_e=null;function Tg(t){if(_e&&typeof _e.onCommitFiberRoot=="function")try{_e.onCommitFiberRoot(Rl,t,void 0,(t.current.flags&128)===128)}catch{}}function ja(t){if(typeof xg=="function"&&Sg(t),_e&&typeof _e.setStrictMode=="function")try{_e.setStrictMode(Rl,t)}catch{}}var Ae=Math.clz32?Math.clz32:Ag,Eg=Math.log,_g=Math.LN2;function Ag(t){return t>>>=0,t===0?32:31-(Eg(t)/_g|0)|0}var eo=128,ao=4194304;function rn(t){var e=t&42;if(e!==0)return e;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194176;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function no(t,e){var a=t.pendingLanes;if(a===0)return 0;var l=0,o=t.suspendedLanes,s=t.pingedLanes,u=t.warmLanes;t=t.finishedLanes!==0;var d=a&134217727;return d!==0?(a=d&~o,a!==0?l=rn(a):(s&=d,s!==0?l=rn(s):t||(u=d&~u,u!==0&&(l=rn(u))))):(d=a&~o,d!==0?l=rn(d):s!==0?l=rn(s):t||(u=a&~u,u!==0&&(l=rn(u)))),l===0?0:e!==0&&e!==l&&(e&o)===0&&(o=l&-l,u=e&-e,o>=u||o===32&&(u&4194176)!==0)?e:l}function Ll(t,e){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&e)===0}function Cg(t,e){switch(t){case 1:case 2:case 4:case 8:return e+250;case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function rf(){var t=eo;return eo<<=1,(eo&4194176)===0&&(eo=128),t}function sf(){var t=ao;return ao<<=1,(ao&62914560)===0&&(ao=4194304),t}function Ir(t){for(var e=[],a=0;31>a;a++)e.push(t);return e}function Hl(t,e){t.pendingLanes|=e,e!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function zg(t,e,a,l,o,s){var u=t.pendingLanes;t.pendingLanes=a,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=a,t.entangledLanes&=a,t.errorRecoveryDisabledLanes&=a,t.shellSuspendCounter=0;var d=t.entanglements,p=t.expirationTimes,S=t.hiddenUpdates;for(a=u&~a;0<a;){var z=31-Ae(a),B=1<<z;d[z]=0,p[z]=-1;var _=S[z];if(_!==null)for(S[z]=null,z=0;z<_.length;z++){var C=_[z];C!==null&&(C.lane&=-536870913)}a&=~B}l!==0&&cf(t,l,0),s!==0&&o===0&&t.tag!==0&&(t.suspendedLanes|=s&~(u&~e))}function cf(t,e,a){t.pendingLanes|=e,t.suspendedLanes&=~e;var l=31-Ae(e);t.entangledLanes|=e,t.entanglements[l]=t.entanglements[l]|1073741824|a&4194218}function uf(t,e){var a=t.entangledLanes|=e;for(t=t.entanglements;a;){var l=31-Ae(a),o=1<<l;o&e|t[l]&e&&(t[l]|=e),a&=~o}}function ff(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function df(){var t=H.p;return t!==0?t:(t=window.event,t===void 0?32:Mp(t.type))}function kg(t,e){var a=H.p;try{return H.p=t,e()}finally{H.p=a}}var Ba=Math.random().toString(36).slice(2),fe="__reactFiber$"+Ba,we="__reactProps$"+Ba,Yn="__reactContainer$"+Ba,ts="__reactEvents$"+Ba,Og="__reactListeners$"+Ba,jg="__reactHandles$"+Ba,hf="__reactResources$"+Ba,Ul="__reactMarker$"+Ba;function es(t){delete t[fe],delete t[we],delete t[ts],delete t[Og],delete t[jg]}function sn(t){var e=t[fe];if(e)return e;for(var a=t.parentNode;a;){if(e=a[Yn]||a[fe]){if(a=e.alternate,e.child!==null||a!==null&&a.child!==null)for(t=vp(t);t!==null;){if(a=t[fe])return a;t=vp(t)}return e}t=a,a=t.parentNode}return null}function Gn(t){if(t=t[fe]||t[Yn]){var e=t.tag;if(e===5||e===6||e===13||e===26||e===27||e===3)return t}return null}function ql(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t.stateNode;throw Error(c(33))}function Xn(t){var e=t[hf];return e||(e=t[hf]={hoistableStyles:new Map,hoistableScripts:new Map}),e}function ne(t){t[Ul]=!0}var pf=new Set,mf={};function cn(t,e){Vn(t,e),Vn(t+"Capture",e)}function Vn(t,e){for(mf[t]=e,t=0;t<e.length;t++)pf.add(e[t])}var ua=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Bg=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),gf={},yf={};function Ng(t){return Wr.call(yf,t)?!0:Wr.call(gf,t)?!1:Bg.test(t)?yf[t]=!0:(gf[t]=!0,!1)}function lo(t,e,a){if(Ng(e))if(a===null)t.removeAttribute(e);else{switch(typeof a){case"undefined":case"function":case"symbol":t.removeAttribute(e);return;case"boolean":var l=e.toLowerCase().slice(0,5);if(l!=="data-"&&l!=="aria-"){t.removeAttribute(e);return}}t.setAttribute(e,""+a)}}function io(t,e,a){if(a===null)t.removeAttribute(e);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(e);return}t.setAttribute(e,""+a)}}function fa(t,e,a,l){if(l===null)t.removeAttribute(a);else{switch(typeof l){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(a);return}t.setAttributeNS(e,a,""+l)}}function Re(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function bf(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function Mg(t){var e=bf(t)?"checked":"value",a=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),l=""+t[e];if(!t.hasOwnProperty(e)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var o=a.get,s=a.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return o.call(this)},set:function(u){l=""+u,s.call(this,u)}}),Object.defineProperty(t,e,{enumerable:a.enumerable}),{getValue:function(){return l},setValue:function(u){l=""+u},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function oo(t){t._valueTracker||(t._valueTracker=Mg(t))}function vf(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var a=e.getValue(),l="";return t&&(l=bf(t)?t.checked?"true":"false":t.value),t=l,t!==a?(e.setValue(t),!0):!1}function ro(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var Dg=/[\n"\\]/g;function Le(t){return t.replace(Dg,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function as(t,e,a,l,o,s,u,d){t.name="",u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"?t.type=u:t.removeAttribute("type"),e!=null?u==="number"?(e===0&&t.value===""||t.value!=e)&&(t.value=""+Re(e)):t.value!==""+Re(e)&&(t.value=""+Re(e)):u!=="submit"&&u!=="reset"||t.removeAttribute("value"),e!=null?ns(t,u,Re(e)):a!=null?ns(t,u,Re(a)):l!=null&&t.removeAttribute("value"),o==null&&s!=null&&(t.defaultChecked=!!s),o!=null&&(t.checked=o&&typeof o!="function"&&typeof o!="symbol"),d!=null&&typeof d!="function"&&typeof d!="symbol"&&typeof d!="boolean"?t.name=""+Re(d):t.removeAttribute("name")}function wf(t,e,a,l,o,s,u,d){if(s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"&&(t.type=s),e!=null||a!=null){if(!(s!=="submit"&&s!=="reset"||e!=null))return;a=a!=null?""+Re(a):"",e=e!=null?""+Re(e):a,d||e===t.value||(t.value=e),t.defaultValue=e}l=l??o,l=typeof l!="function"&&typeof l!="symbol"&&!!l,t.checked=d?t.checked:!!l,t.defaultChecked=!!l,u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"&&(t.name=u)}function ns(t,e,a){e==="number"&&ro(t.ownerDocument)===t||t.defaultValue===""+a||(t.defaultValue=""+a)}function Qn(t,e,a,l){if(t=t.options,e){e={};for(var o=0;o<a.length;o++)e["$"+a[o]]=!0;for(a=0;a<t.length;a++)o=e.hasOwnProperty("$"+t[a].value),t[a].selected!==o&&(t[a].selected=o),o&&l&&(t[a].defaultSelected=!0)}else{for(a=""+Re(a),e=null,o=0;o<t.length;o++){if(t[o].value===a){t[o].selected=!0,l&&(t[o].defaultSelected=!0);return}e!==null||t[o].disabled||(e=t[o])}e!==null&&(e.selected=!0)}}function xf(t,e,a){if(e!=null&&(e=""+Re(e),e!==t.value&&(t.value=e),a==null)){t.defaultValue!==e&&(t.defaultValue=e);return}t.defaultValue=a!=null?""+Re(a):""}function Sf(t,e,a,l){if(e==null){if(l!=null){if(a!=null)throw Error(c(92));if(V(l)){if(1<l.length)throw Error(c(93));l=l[0]}a=l}a==null&&(a=""),e=a}a=Re(e),t.defaultValue=a,l=t.textContent,l===a&&l!==""&&l!==null&&(t.value=l)}function $n(t,e){if(e){var a=t.firstChild;if(a&&a===t.lastChild&&a.nodeType===3){a.nodeValue=e;return}}t.textContent=e}var Rg=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Tf(t,e,a){var l=e.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?l?t.setProperty(e,""):e==="float"?t.cssFloat="":t[e]="":l?t.setProperty(e,a):typeof a!="number"||a===0||Rg.has(e)?e==="float"?t.cssFloat=a:t[e]=(""+a).trim():t[e]=a+"px"}function Ef(t,e,a){if(e!=null&&typeof e!="object")throw Error(c(62));if(t=t.style,a!=null){for(var l in a)!a.hasOwnProperty(l)||e!=null&&e.hasOwnProperty(l)||(l.indexOf("--")===0?t.setProperty(l,""):l==="float"?t.cssFloat="":t[l]="");for(var o in e)l=e[o],e.hasOwnProperty(o)&&a[o]!==l&&Tf(t,o,l)}else for(var s in e)e.hasOwnProperty(s)&&Tf(t,s,e[s])}function ls(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Lg=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Hg=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function so(t){return Hg.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}var is=null;function os(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Zn=null,Kn=null;function _f(t){var e=Gn(t);if(e&&(t=e.stateNode)){var a=t[we]||null;t:switch(t=e.stateNode,e.type){case"input":if(as(t,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),e=a.name,a.type==="radio"&&e!=null){for(a=t;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+Le(""+e)+'"][type="radio"]'),e=0;e<a.length;e++){var l=a[e];if(l!==t&&l.form===t.form){var o=l[we]||null;if(!o)throw Error(c(90));as(l,o.value,o.defaultValue,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name)}}for(e=0;e<a.length;e++)l=a[e],l.form===t.form&&vf(l)}break t;case"textarea":xf(t,a.value,a.defaultValue);break t;case"select":e=a.value,e!=null&&Qn(t,!!a.multiple,e,!1)}}}var rs=!1;function Af(t,e,a){if(rs)return t(e,a);rs=!0;try{var l=t(e);return l}finally{if(rs=!1,(Zn!==null||Kn!==null)&&($o(),Zn&&(e=Zn,t=Kn,Kn=Zn=null,_f(e),t)))for(e=0;e<t.length;e++)_f(t[e])}}function Yl(t,e){var a=t.stateNode;if(a===null)return null;var l=a[we]||null;if(l===null)return null;a=l[e];t:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(l=!l.disabled)||(t=t.type,l=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!l;break t;default:t=!1}if(t)return null;if(a&&typeof a!="function")throw Error(c(231,e,typeof a));return a}var ss=!1;if(ua)try{var Gl={};Object.defineProperty(Gl,"passive",{get:function(){ss=!0}}),window.addEventListener("test",Gl,Gl),window.removeEventListener("test",Gl,Gl)}catch{ss=!1}var Na=null,cs=null,co=null;function Cf(){if(co)return co;var t,e=cs,a=e.length,l,o="value"in Na?Na.value:Na.textContent,s=o.length;for(t=0;t<a&&e[t]===o[t];t++);var u=a-t;for(l=1;l<=u&&e[a-l]===o[s-l];l++);return co=o.slice(t,1<l?1-l:void 0)}function uo(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function fo(){return!0}function zf(){return!1}function xe(t){function e(a,l,o,s,u){this._reactName=a,this._targetInst=o,this.type=l,this.nativeEvent=s,this.target=u,this.currentTarget=null;for(var d in t)t.hasOwnProperty(d)&&(a=t[d],this[d]=a?a(s):s[d]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?fo:zf,this.isPropagationStopped=zf,this}return W(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=fo)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=fo)},persist:function(){},isPersistent:fo}),e}var un={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ho=xe(un),Xl=W({},un,{view:0,detail:0}),Ug=xe(Xl),us,fs,Vl,po=W({},Xl,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:hs,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Vl&&(Vl&&t.type==="mousemove"?(us=t.screenX-Vl.screenX,fs=t.screenY-Vl.screenY):fs=us=0,Vl=t),us)},movementY:function(t){return"movementY"in t?t.movementY:fs}}),kf=xe(po),qg=W({},po,{dataTransfer:0}),Yg=xe(qg),Gg=W({},Xl,{relatedTarget:0}),ds=xe(Gg),Xg=W({},un,{animationName:0,elapsedTime:0,pseudoElement:0}),Vg=xe(Xg),Qg=W({},un,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),$g=xe(Qg),Zg=W({},un,{data:0}),Of=xe(Zg),Kg={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Jg={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Wg={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Fg(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=Wg[t])?!!e[t]:!1}function hs(){return Fg}var Pg=W({},Xl,{key:function(t){if(t.key){var e=Kg[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=uo(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Jg[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:hs,charCode:function(t){return t.type==="keypress"?uo(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?uo(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Ig=xe(Pg),t1=W({},po,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),jf=xe(t1),e1=W({},Xl,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:hs}),a1=xe(e1),n1=W({},un,{propertyName:0,elapsedTime:0,pseudoElement:0}),l1=xe(n1),i1=W({},po,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),o1=xe(i1),r1=W({},un,{newState:0,oldState:0}),s1=xe(r1),c1=[9,13,27,32],ps=ua&&"CompositionEvent"in window,Ql=null;ua&&"documentMode"in document&&(Ql=document.documentMode);var u1=ua&&"TextEvent"in window&&!Ql,Bf=ua&&(!ps||Ql&&8<Ql&&11>=Ql),Nf=" ",Mf=!1;function Df(t,e){switch(t){case"keyup":return c1.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Rf(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Jn=!1;function f1(t,e){switch(t){case"compositionend":return Rf(e);case"keypress":return e.which!==32?null:(Mf=!0,Nf);case"textInput":return t=e.data,t===Nf&&Mf?null:t;default:return null}}function d1(t,e){if(Jn)return t==="compositionend"||!ps&&Df(t,e)?(t=Cf(),co=cs=Na=null,Jn=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Bf&&e.locale!=="ko"?null:e.data;default:return null}}var h1={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Lf(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!h1[t.type]:e==="textarea"}function Hf(t,e,a,l){Zn?Kn?Kn.push(l):Kn=[l]:Zn=l,e=Fo(e,"onChange"),0<e.length&&(a=new ho("onChange","change",null,a,l),t.push({event:a,listeners:e}))}var $l=null,Zl=null;function p1(t){up(t,0)}function mo(t){var e=ql(t);if(vf(e))return t}function Uf(t,e){if(t==="change")return e}var qf=!1;if(ua){var ms;if(ua){var gs="oninput"in document;if(!gs){var Yf=document.createElement("div");Yf.setAttribute("oninput","return;"),gs=typeof Yf.oninput=="function"}ms=gs}else ms=!1;qf=ms&&(!document.documentMode||9<document.documentMode)}function Gf(){$l&&($l.detachEvent("onpropertychange",Xf),Zl=$l=null)}function Xf(t){if(t.propertyName==="value"&&mo(Zl)){var e=[];Hf(e,Zl,t,os(t)),Af(p1,e)}}function m1(t,e,a){t==="focusin"?(Gf(),$l=e,Zl=a,$l.attachEvent("onpropertychange",Xf)):t==="focusout"&&Gf()}function g1(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return mo(Zl)}function y1(t,e){if(t==="click")return mo(e)}function b1(t,e){if(t==="input"||t==="change")return mo(e)}function v1(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Ce=typeof Object.is=="function"?Object.is:v1;function Kl(t,e){if(Ce(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var a=Object.keys(t),l=Object.keys(e);if(a.length!==l.length)return!1;for(l=0;l<a.length;l++){var o=a[l];if(!Wr.call(e,o)||!Ce(t[o],e[o]))return!1}return!0}function Vf(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Qf(t,e){var a=Vf(t);t=0;for(var l;a;){if(a.nodeType===3){if(l=t+a.textContent.length,t<=e&&l>=e)return{node:a,offset:e-t};t=l}t:{for(;a;){if(a.nextSibling){a=a.nextSibling;break t}a=a.parentNode}a=void 0}a=Vf(a)}}function $f(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?$f(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function Zf(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var e=ro(t.document);e instanceof t.HTMLIFrameElement;){try{var a=typeof e.contentWindow.location.href=="string"}catch{a=!1}if(a)t=e.contentWindow;else break;e=ro(t.document)}return e}function ys(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function w1(t,e){var a=Zf(e);e=t.focusedElem;var l=t.selectionRange;if(a!==e&&e&&e.ownerDocument&&$f(e.ownerDocument.documentElement,e)){if(l!==null&&ys(e)){if(t=l.start,a=l.end,a===void 0&&(a=t),"selectionStart"in e)e.selectionStart=t,e.selectionEnd=Math.min(a,e.value.length);else if(a=(t=e.ownerDocument||document)&&t.defaultView||window,a.getSelection){a=a.getSelection();var o=e.textContent.length,s=Math.min(l.start,o);l=l.end===void 0?s:Math.min(l.end,o),!a.extend&&s>l&&(o=l,l=s,s=o),o=Qf(e,s);var u=Qf(e,l);o&&u&&(a.rangeCount!==1||a.anchorNode!==o.node||a.anchorOffset!==o.offset||a.focusNode!==u.node||a.focusOffset!==u.offset)&&(t=t.createRange(),t.setStart(o.node,o.offset),a.removeAllRanges(),s>l?(a.addRange(t),a.extend(u.node,u.offset)):(t.setEnd(u.node,u.offset),a.addRange(t)))}}for(t=[],a=e;a=a.parentNode;)a.nodeType===1&&t.push({element:a,left:a.scrollLeft,top:a.scrollTop});for(typeof e.focus=="function"&&e.focus(),e=0;e<t.length;e++)a=t[e],a.element.scrollLeft=a.left,a.element.scrollTop=a.top}}var x1=ua&&"documentMode"in document&&11>=document.documentMode,Wn=null,bs=null,Jl=null,vs=!1;function Kf(t,e,a){var l=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;vs||Wn==null||Wn!==ro(l)||(l=Wn,"selectionStart"in l&&ys(l)?l={start:l.selectionStart,end:l.selectionEnd}:(l=(l.ownerDocument&&l.ownerDocument.defaultView||window).getSelection(),l={anchorNode:l.anchorNode,anchorOffset:l.anchorOffset,focusNode:l.focusNode,focusOffset:l.focusOffset}),Jl&&Kl(Jl,l)||(Jl=l,l=Fo(bs,"onSelect"),0<l.length&&(e=new ho("onSelect","select",null,e,a),t.push({event:e,listeners:l}),e.target=Wn)))}function fn(t,e){var a={};return a[t.toLowerCase()]=e.toLowerCase(),a["Webkit"+t]="webkit"+e,a["Moz"+t]="moz"+e,a}var Fn={animationend:fn("Animation","AnimationEnd"),animationiteration:fn("Animation","AnimationIteration"),animationstart:fn("Animation","AnimationStart"),transitionrun:fn("Transition","TransitionRun"),transitionstart:fn("Transition","TransitionStart"),transitioncancel:fn("Transition","TransitionCancel"),transitionend:fn("Transition","TransitionEnd")},ws={},Jf={};ua&&(Jf=document.createElement("div").style,"AnimationEvent"in window||(delete Fn.animationend.animation,delete Fn.animationiteration.animation,delete Fn.animationstart.animation),"TransitionEvent"in window||delete Fn.transitionend.transition);function dn(t){if(ws[t])return ws[t];if(!Fn[t])return t;var e=Fn[t],a;for(a in e)if(e.hasOwnProperty(a)&&a in Jf)return ws[t]=e[a];return t}var Wf=dn("animationend"),Ff=dn("animationiteration"),Pf=dn("animationstart"),S1=dn("transitionrun"),T1=dn("transitionstart"),E1=dn("transitioncancel"),If=dn("transitionend"),td=new Map,ed="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll scrollEnd toggle touchMove waiting wheel".split(" ");function We(t,e){td.set(t,e),cn(e,[t])}var He=[],Pn=0,xs=0;function go(){for(var t=Pn,e=xs=Pn=0;e<t;){var a=He[e];He[e++]=null;var l=He[e];He[e++]=null;var o=He[e];He[e++]=null;var s=He[e];if(He[e++]=null,l!==null&&o!==null){var u=l.pending;u===null?o.next=o:(o.next=u.next,u.next=o),l.pending=o}s!==0&&ad(a,o,s)}}function yo(t,e,a,l){He[Pn++]=t,He[Pn++]=e,He[Pn++]=a,He[Pn++]=l,xs|=l,t.lanes|=l,t=t.alternate,t!==null&&(t.lanes|=l)}function Ss(t,e,a,l){return yo(t,e,a,l),bo(t)}function Ma(t,e){return yo(t,null,null,e),bo(t)}function ad(t,e,a){t.lanes|=a;var l=t.alternate;l!==null&&(l.lanes|=a);for(var o=!1,s=t.return;s!==null;)s.childLanes|=a,l=s.alternate,l!==null&&(l.childLanes|=a),s.tag===22&&(t=s.stateNode,t===null||t._visibility&1||(o=!0)),t=s,s=s.return;o&&e!==null&&t.tag===3&&(s=t.stateNode,o=31-Ae(a),s=s.hiddenUpdates,t=s[o],t===null?s[o]=[e]:t.push(e),e.lane=a|536870912)}function bo(t){if(50<wi)throw wi=0,zc=null,Error(c(185));for(var e=t.return;e!==null;)t=e,e=t.return;return t.tag===3?t.stateNode:null}var In={},nd=new WeakMap;function Ue(t,e){if(typeof t=="object"&&t!==null){var a=nd.get(t);return a!==void 0?a:(e={value:t,source:e,stack:lt(e)},nd.set(t,e),e)}return{value:t,source:e,stack:lt(e)}}var tl=[],el=0,vo=null,wo=0,qe=[],Ye=0,hn=null,da=1,ha="";function pn(t,e){tl[el++]=wo,tl[el++]=vo,vo=t,wo=e}function ld(t,e,a){qe[Ye++]=da,qe[Ye++]=ha,qe[Ye++]=hn,hn=t;var l=da;t=ha;var o=32-Ae(l)-1;l&=~(1<<o),a+=1;var s=32-Ae(e)+o;if(30<s){var u=o-o%5;s=(l&(1<<u)-1).toString(32),l>>=u,o-=u,da=1<<32-Ae(e)+o|a<<o|l,ha=s+t}else da=1<<s|a<<o|l,ha=t}function Ts(t){t.return!==null&&(pn(t,1),ld(t,1,0))}function Es(t){for(;t===vo;)vo=tl[--el],tl[el]=null,wo=tl[--el],tl[el]=null;for(;t===hn;)hn=qe[--Ye],qe[Ye]=null,ha=qe[--Ye],qe[Ye]=null,da=qe[--Ye],qe[Ye]=null}var me=null,se=null,At=!1,Fe=null,na=!1,_s=Error(c(519));function mn(t){var e=Error(c(418,""));throw Pl(Ue(e,t)),_s}function id(t){var e=t.stateNode,a=t.type,l=t.memoizedProps;switch(e[fe]=t,e[we]=l,a){case"dialog":Tt("cancel",e),Tt("close",e);break;case"iframe":case"object":case"embed":Tt("load",e);break;case"video":case"audio":for(a=0;a<Si.length;a++)Tt(Si[a],e);break;case"source":Tt("error",e);break;case"img":case"image":case"link":Tt("error",e),Tt("load",e);break;case"details":Tt("toggle",e);break;case"input":Tt("invalid",e),wf(e,l.value,l.defaultValue,l.checked,l.defaultChecked,l.type,l.name,!0),oo(e);break;case"select":Tt("invalid",e);break;case"textarea":Tt("invalid",e),Sf(e,l.value,l.defaultValue,l.children),oo(e)}a=l.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||e.textContent===""+a||l.suppressHydrationWarning===!0||pp(e.textContent,a)?(l.popover!=null&&(Tt("beforetoggle",e),Tt("toggle",e)),l.onScroll!=null&&Tt("scroll",e),l.onScrollEnd!=null&&Tt("scrollend",e),l.onClick!=null&&(e.onclick=Po),e=!0):e=!1,e||mn(t)}function od(t){for(me=t.return;me;)switch(me.tag){case 3:case 27:na=!0;return;case 5:case 13:na=!1;return;default:me=me.return}}function Wl(t){if(t!==me)return!1;if(!At)return od(t),At=!0,!1;var e=!1,a;if((a=t.tag!==3&&t.tag!==27)&&((a=t.tag===5)&&(a=t.type,a=!(a!=="form"&&a!=="button")||Qc(t.type,t.memoizedProps)),a=!a),a&&(e=!0),e&&se&&mn(t),od(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(c(317));t:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8)if(a=t.data,a==="/$"){if(e===0){se=Ie(t.nextSibling);break t}e--}else a!=="$"&&a!=="$!"&&a!=="$?"||e++;t=t.nextSibling}se=null}}else se=me?Ie(t.stateNode.nextSibling):null;return!0}function Fl(){se=me=null,At=!1}function Pl(t){Fe===null?Fe=[t]:Fe.push(t)}var Il=Error(c(460)),rd=Error(c(474)),As={then:function(){}};function sd(t){return t=t.status,t==="fulfilled"||t==="rejected"}function xo(){}function cd(t,e,a){switch(a=t[a],a===void 0?t.push(e):a!==e&&(e.then(xo,xo),e=a),e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,t===Il?Error(c(483)):t;default:if(typeof e.status=="string")e.then(xo,xo);else{if(t=Rt,t!==null&&100<t.shellSuspendCounter)throw Error(c(482));t=e,t.status="pending",t.then(function(l){if(e.status==="pending"){var o=e;o.status="fulfilled",o.value=l}},function(l){if(e.status==="pending"){var o=e;o.status="rejected",o.reason=l}})}switch(e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,t===Il?Error(c(483)):t}throw ti=e,Il}}var ti=null;function ud(){if(ti===null)throw Error(c(459));var t=ti;return ti=null,t}var al=null,ei=0;function So(t){var e=ei;return ei+=1,al===null&&(al=[]),cd(al,t,e)}function ai(t,e){e=e.props.ref,t.ref=e!==void 0?e:null}function To(t,e){throw e.$$typeof===h?Error(c(525)):(t=Object.prototype.toString.call(e),Error(c(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)))}function fd(t){var e=t._init;return e(t._payload)}function dd(t){function e(T,x){if(t){var E=T.deletions;E===null?(T.deletions=[x],T.flags|=16):E.push(x)}}function a(T,x){if(!t)return null;for(;x!==null;)e(T,x),x=x.sibling;return null}function l(T){for(var x=new Map;T!==null;)T.key!==null?x.set(T.key,T):x.set(T.index,T),T=T.sibling;return x}function o(T,x){return T=$a(T,x),T.index=0,T.sibling=null,T}function s(T,x,E){return T.index=E,t?(E=T.alternate,E!==null?(E=E.index,E<x?(T.flags|=33554434,x):E):(T.flags|=33554434,x)):(T.flags|=1048576,x)}function u(T){return t&&T.alternate===null&&(T.flags|=33554434),T}function d(T,x,E,O){return x===null||x.tag!==6?(x=wc(E,T.mode,O),x.return=T,x):(x=o(x,E),x.return=T,x)}function p(T,x,E,O){var $=E.type;return $===y?z(T,x,E.props.children,O,E.key):x!==null&&(x.elementType===$||typeof $=="object"&&$!==null&&$.$$typeof===k&&fd($)===x.type)?(x=o(x,E.props),ai(x,E),x.return=T,x):(x=Yo(E.type,E.key,E.props,null,T.mode,O),ai(x,E),x.return=T,x)}function S(T,x,E,O){return x===null||x.tag!==4||x.stateNode.containerInfo!==E.containerInfo||x.stateNode.implementation!==E.implementation?(x=xc(E,T.mode,O),x.return=T,x):(x=o(x,E.children||[]),x.return=T,x)}function z(T,x,E,O,$){return x===null||x.tag!==7?(x=_n(E,T.mode,O,$),x.return=T,x):(x=o(x,E),x.return=T,x)}function B(T,x,E){if(typeof x=="string"&&x!==""||typeof x=="number"||typeof x=="bigint")return x=wc(""+x,T.mode,E),x.return=T,x;if(typeof x=="object"&&x!==null){switch(x.$$typeof){case g:return E=Yo(x.type,x.key,x.props,null,T.mode,E),ai(E,x),E.return=T,E;case v:return x=xc(x,T.mode,E),x.return=T,x;case k:var O=x._init;return x=O(x._payload),B(T,x,E)}if(V(x)||it(x))return x=_n(x,T.mode,E,null),x.return=T,x;if(typeof x.then=="function")return B(T,So(x),E);if(x.$$typeof===F)return B(T,Ho(T,x),E);To(T,x)}return null}function _(T,x,E,O){var $=x!==null?x.key:null;if(typeof E=="string"&&E!==""||typeof E=="number"||typeof E=="bigint")return $!==null?null:d(T,x,""+E,O);if(typeof E=="object"&&E!==null){switch(E.$$typeof){case g:return E.key===$?p(T,x,E,O):null;case v:return E.key===$?S(T,x,E,O):null;case k:return $=E._init,E=$(E._payload),_(T,x,E,O)}if(V(E)||it(E))return $!==null?null:z(T,x,E,O,null);if(typeof E.then=="function")return _(T,x,So(E),O);if(E.$$typeof===F)return _(T,x,Ho(T,E),O);To(T,E)}return null}function C(T,x,E,O,$){if(typeof O=="string"&&O!==""||typeof O=="number"||typeof O=="bigint")return T=T.get(E)||null,d(x,T,""+O,$);if(typeof O=="object"&&O!==null){switch(O.$$typeof){case g:return T=T.get(O.key===null?E:O.key)||null,p(x,T,O,$);case v:return T=T.get(O.key===null?E:O.key)||null,S(x,T,O,$);case k:var vt=O._init;return O=vt(O._payload),C(T,x,E,O,$)}if(V(O)||it(O))return T=T.get(E)||null,z(x,T,O,$,null);if(typeof O.then=="function")return C(T,x,E,So(O),$);if(O.$$typeof===F)return C(T,x,E,Ho(x,O),$);To(x,O)}return null}function tt(T,x,E,O){for(var $=null,vt=null,nt=x,rt=x=0,oe=null;nt!==null&&rt<E.length;rt++){nt.index>rt?(oe=nt,nt=null):oe=nt.sibling;var Ct=_(T,nt,E[rt],O);if(Ct===null){nt===null&&(nt=oe);break}t&&nt&&Ct.alternate===null&&e(T,nt),x=s(Ct,x,rt),vt===null?$=Ct:vt.sibling=Ct,vt=Ct,nt=oe}if(rt===E.length)return a(T,nt),At&&pn(T,rt),$;if(nt===null){for(;rt<E.length;rt++)nt=B(T,E[rt],O),nt!==null&&(x=s(nt,x,rt),vt===null?$=nt:vt.sibling=nt,vt=nt);return At&&pn(T,rt),$}for(nt=l(nt);rt<E.length;rt++)oe=C(nt,T,rt,E[rt],O),oe!==null&&(t&&oe.alternate!==null&&nt.delete(oe.key===null?rt:oe.key),x=s(oe,x,rt),vt===null?$=oe:vt.sibling=oe,vt=oe);return t&&nt.forEach(function(Ia){return e(T,Ia)}),At&&pn(T,rt),$}function ft(T,x,E,O){if(E==null)throw Error(c(151));for(var $=null,vt=null,nt=x,rt=x=0,oe=null,Ct=E.next();nt!==null&&!Ct.done;rt++,Ct=E.next()){nt.index>rt?(oe=nt,nt=null):oe=nt.sibling;var Ia=_(T,nt,Ct.value,O);if(Ia===null){nt===null&&(nt=oe);break}t&&nt&&Ia.alternate===null&&e(T,nt),x=s(Ia,x,rt),vt===null?$=Ia:vt.sibling=Ia,vt=Ia,nt=oe}if(Ct.done)return a(T,nt),At&&pn(T,rt),$;if(nt===null){for(;!Ct.done;rt++,Ct=E.next())Ct=B(T,Ct.value,O),Ct!==null&&(x=s(Ct,x,rt),vt===null?$=Ct:vt.sibling=Ct,vt=Ct);return At&&pn(T,rt),$}for(nt=l(nt);!Ct.done;rt++,Ct=E.next())Ct=C(nt,T,rt,Ct.value,O),Ct!==null&&(t&&Ct.alternate!==null&&nt.delete(Ct.key===null?rt:Ct.key),x=s(Ct,x,rt),vt===null?$=Ct:vt.sibling=Ct,vt=Ct);return t&&nt.forEach(function(H2){return e(T,H2)}),At&&pn(T,rt),$}function $t(T,x,E,O){if(typeof E=="object"&&E!==null&&E.type===y&&E.key===null&&(E=E.props.children),typeof E=="object"&&E!==null){switch(E.$$typeof){case g:t:{for(var $=E.key;x!==null;){if(x.key===$){if($=E.type,$===y){if(x.tag===7){a(T,x.sibling),O=o(x,E.props.children),O.return=T,T=O;break t}}else if(x.elementType===$||typeof $=="object"&&$!==null&&$.$$typeof===k&&fd($)===x.type){a(T,x.sibling),O=o(x,E.props),ai(O,E),O.return=T,T=O;break t}a(T,x);break}else e(T,x);x=x.sibling}E.type===y?(O=_n(E.props.children,T.mode,O,E.key),O.return=T,T=O):(O=Yo(E.type,E.key,E.props,null,T.mode,O),ai(O,E),O.return=T,T=O)}return u(T);case v:t:{for($=E.key;x!==null;){if(x.key===$)if(x.tag===4&&x.stateNode.containerInfo===E.containerInfo&&x.stateNode.implementation===E.implementation){a(T,x.sibling),O=o(x,E.children||[]),O.return=T,T=O;break t}else{a(T,x);break}else e(T,x);x=x.sibling}O=xc(E,T.mode,O),O.return=T,T=O}return u(T);case k:return $=E._init,E=$(E._payload),$t(T,x,E,O)}if(V(E))return tt(T,x,E,O);if(it(E)){if($=it(E),typeof $!="function")throw Error(c(150));return E=$.call(E),ft(T,x,E,O)}if(typeof E.then=="function")return $t(T,x,So(E),O);if(E.$$typeof===F)return $t(T,x,Ho(T,E),O);To(T,E)}return typeof E=="string"&&E!==""||typeof E=="number"||typeof E=="bigint"?(E=""+E,x!==null&&x.tag===6?(a(T,x.sibling),O=o(x,E),O.return=T,T=O):(a(T,x),O=wc(E,T.mode,O),O.return=T,T=O),u(T)):a(T,x)}return function(T,x,E,O){try{ei=0;var $=$t(T,x,E,O);return al=null,$}catch(nt){if(nt===Il)throw nt;var vt=Qe(29,nt,null,T.mode);return vt.lanes=O,vt.return=T,vt}finally{}}}var gn=dd(!0),hd=dd(!1),nl=ut(null),Eo=ut(0);function pd(t,e){t=Ea,dt(Eo,t),dt(nl,e),Ea=t|e.baseLanes}function Cs(){dt(Eo,Ea),dt(nl,nl.current)}function zs(){Ea=Eo.current,St(nl),St(Eo)}var Ge=ut(null),la=null;function Da(t){var e=t.alternate;dt(te,te.current&1),dt(Ge,t),la===null&&(e===null||nl.current!==null||e.memoizedState!==null)&&(la=t)}function md(t){if(t.tag===22){if(dt(te,te.current),dt(Ge,t),la===null){var e=t.alternate;e!==null&&e.memoizedState!==null&&(la=t)}}else Ra()}function Ra(){dt(te,te.current),dt(Ge,Ge.current)}function pa(t){St(Ge),la===t&&(la=null),St(te)}var te=ut(0);function _o(t){for(var e=t;e!==null;){if(e.tag===13){var a=e.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||a.data==="$?"||a.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if((e.flags&128)!==0)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var _1=typeof AbortController<"u"?AbortController:function(){var t=[],e=this.signal={aborted:!1,addEventListener:function(a,l){t.push(l)}};this.abort=function(){e.aborted=!0,t.forEach(function(a){return a()})}},A1=n.unstable_scheduleCallback,C1=n.unstable_NormalPriority,ee={$$typeof:F,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function ks(){return{controller:new _1,data:new Map,refCount:0}}function ni(t){t.refCount--,t.refCount===0&&A1(C1,function(){t.controller.abort()})}var li=null,Os=0,ll=0,il=null;function z1(t,e){if(li===null){var a=li=[];Os=0,ll=Rc(),il={status:"pending",value:void 0,then:function(l){a.push(l)}}}return Os++,e.then(gd,gd),e}function gd(){if(--Os===0&&li!==null){il!==null&&(il.status="fulfilled");var t=li;li=null,ll=0,il=null;for(var e=0;e<t.length;e++)(0,t[e])()}}function k1(t,e){var a=[],l={status:"pending",value:null,reason:null,then:function(o){a.push(o)}};return t.then(function(){l.status="fulfilled",l.value=e;for(var o=0;o<a.length;o++)(0,a[o])(e)},function(o){for(l.status="rejected",l.reason=o,o=0;o<a.length;o++)(0,a[o])(void 0)}),l}var yd=Y.S;Y.S=function(t,e){typeof e=="object"&&e!==null&&typeof e.then=="function"&&z1(t,e),yd!==null&&yd(t,e)};var yn=ut(null);function js(){var t=yn.current;return t!==null?t:Rt.pooledCache}function Ao(t,e){e===null?dt(yn,yn.current):dt(yn,e.pool)}function bd(){var t=js();return t===null?null:{parent:ee._currentValue,pool:t}}var La=0,gt=null,Nt=null,Wt=null,Co=!1,ol=!1,bn=!1,zo=0,ii=0,rl=null,O1=0;function Zt(){throw Error(c(321))}function Bs(t,e){if(e===null)return!1;for(var a=0;a<e.length&&a<t.length;a++)if(!Ce(t[a],e[a]))return!1;return!0}function Ns(t,e,a,l,o,s){return La=s,gt=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Y.H=t===null||t.memoizedState===null?vn:Ha,bn=!1,s=a(l,o),bn=!1,ol&&(s=wd(e,a,l,o)),vd(t),s}function vd(t){Y.H=ia;var e=Nt!==null&&Nt.next!==null;if(La=0,Wt=Nt=gt=null,Co=!1,ii=0,rl=null,e)throw Error(c(300));t===null||le||(t=t.dependencies,t!==null&&Lo(t)&&(le=!0))}function wd(t,e,a,l){gt=t;var o=0;do{if(ol&&(rl=null),ii=0,ol=!1,25<=o)throw Error(c(301));if(o+=1,Wt=Nt=null,t.updateQueue!=null){var s=t.updateQueue;s.lastEffect=null,s.events=null,s.stores=null,s.memoCache!=null&&(s.memoCache.index=0)}Y.H=wn,s=e(a,l)}while(ol);return s}function j1(){var t=Y.H,e=t.useState()[0];return e=typeof e.then=="function"?oi(e):e,t=t.useState()[0],(Nt!==null?Nt.memoizedState:null)!==t&&(gt.flags|=1024),e}function Ms(){var t=zo!==0;return zo=0,t}function Ds(t,e,a){e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~a}function Rs(t){if(Co){for(t=t.memoizedState;t!==null;){var e=t.queue;e!==null&&(e.pending=null),t=t.next}Co=!1}La=0,Wt=Nt=gt=null,ol=!1,ii=zo=0,rl=null}function Se(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Wt===null?gt.memoizedState=Wt=t:Wt=Wt.next=t,Wt}function Ft(){if(Nt===null){var t=gt.alternate;t=t!==null?t.memoizedState:null}else t=Nt.next;var e=Wt===null?gt.memoizedState:Wt.next;if(e!==null)Wt=e,Nt=t;else{if(t===null)throw gt.alternate===null?Error(c(467)):Error(c(310));Nt=t,t={memoizedState:Nt.memoizedState,baseState:Nt.baseState,baseQueue:Nt.baseQueue,queue:Nt.queue,next:null},Wt===null?gt.memoizedState=Wt=t:Wt=Wt.next=t}return Wt}var ko;ko=function(){return{lastEffect:null,events:null,stores:null,memoCache:null}};function oi(t){var e=ii;return ii+=1,rl===null&&(rl=[]),t=cd(rl,t,e),e=gt,(Wt===null?e.memoizedState:Wt.next)===null&&(e=e.alternate,Y.H=e===null||e.memoizedState===null?vn:Ha),t}function Oo(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return oi(t);if(t.$$typeof===F)return de(t)}throw Error(c(438,String(t)))}function Ls(t){var e=null,a=gt.updateQueue;if(a!==null&&(e=a.memoCache),e==null){var l=gt.alternate;l!==null&&(l=l.updateQueue,l!==null&&(l=l.memoCache,l!=null&&(e={data:l.data.map(function(o){return o.slice()}),index:0})))}if(e==null&&(e={data:[],index:0}),a===null&&(a=ko(),gt.updateQueue=a),a.memoCache=e,a=e.data[e.index],a===void 0)for(a=e.data[e.index]=Array(t),l=0;l<t;l++)a[l]=P;return e.index++,a}function ma(t,e){return typeof e=="function"?e(t):e}function jo(t){var e=Ft();return Hs(e,Nt,t)}function Hs(t,e,a){var l=t.queue;if(l===null)throw Error(c(311));l.lastRenderedReducer=a;var o=t.baseQueue,s=l.pending;if(s!==null){if(o!==null){var u=o.next;o.next=s.next,s.next=u}e.baseQueue=o=s,l.pending=null}if(s=t.baseState,o===null)t.memoizedState=s;else{e=o.next;var d=u=null,p=null,S=e,z=!1;do{var B=S.lane&-536870913;if(B!==S.lane?(Et&B)===B:(La&B)===B){var _=S.revertLane;if(_===0)p!==null&&(p=p.next={lane:0,revertLane:0,action:S.action,hasEagerState:S.hasEagerState,eagerState:S.eagerState,next:null}),B===ll&&(z=!0);else if((La&_)===_){S=S.next,_===ll&&(z=!0);continue}else B={lane:0,revertLane:S.revertLane,action:S.action,hasEagerState:S.hasEagerState,eagerState:S.eagerState,next:null},p===null?(d=p=B,u=s):p=p.next=B,gt.lanes|=_,Za|=_;B=S.action,bn&&a(s,B),s=S.hasEagerState?S.eagerState:a(s,B)}else _={lane:B,revertLane:S.revertLane,action:S.action,hasEagerState:S.hasEagerState,eagerState:S.eagerState,next:null},p===null?(d=p=_,u=s):p=p.next=_,gt.lanes|=B,Za|=B;S=S.next}while(S!==null&&S!==e);if(p===null?u=s:p.next=d,!Ce(s,t.memoizedState)&&(le=!0,z&&(a=il,a!==null)))throw a;t.memoizedState=s,t.baseState=u,t.baseQueue=p,l.lastRenderedState=s}return o===null&&(l.lanes=0),[t.memoizedState,l.dispatch]}function Us(t){var e=Ft(),a=e.queue;if(a===null)throw Error(c(311));a.lastRenderedReducer=t;var l=a.dispatch,o=a.pending,s=e.memoizedState;if(o!==null){a.pending=null;var u=o=o.next;do s=t(s,u.action),u=u.next;while(u!==o);Ce(s,e.memoizedState)||(le=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),a.lastRenderedState=s}return[s,l]}function xd(t,e,a){var l=gt,o=Ft(),s=At;if(s){if(a===void 0)throw Error(c(407));a=a()}else a=e();var u=!Ce((Nt||o).memoizedState,a);if(u&&(o.memoizedState=a,le=!0),o=o.queue,Gs(Ed.bind(null,l,o,t),[t]),o.getSnapshot!==e||u||Wt!==null&&Wt.memoizedState.tag&1){if(l.flags|=2048,sl(9,Td.bind(null,l,o,a,e),{destroy:void 0},null),Rt===null)throw Error(c(349));s||(La&60)!==0||Sd(l,e,a)}return a}function Sd(t,e,a){t.flags|=16384,t={getSnapshot:e,value:a},e=gt.updateQueue,e===null?(e=ko(),gt.updateQueue=e,e.stores=[t]):(a=e.stores,a===null?e.stores=[t]:a.push(t))}function Td(t,e,a,l){e.value=a,e.getSnapshot=l,_d(e)&&Ad(t)}function Ed(t,e,a){return a(function(){_d(e)&&Ad(t)})}function _d(t){var e=t.getSnapshot;t=t.value;try{var a=e();return!Ce(t,a)}catch{return!0}}function Ad(t){var e=Ma(t,2);e!==null&&ge(e,t,2)}function qs(t){var e=Se();if(typeof t=="function"){var a=t;if(t=a(),bn){ja(!0);try{a()}finally{ja(!1)}}}return e.memoizedState=e.baseState=t,e.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ma,lastRenderedState:t},e}function Cd(t,e,a,l){return t.baseState=a,Hs(t,Nt,typeof l=="function"?l:ma)}function B1(t,e,a,l,o){if(Mo(t))throw Error(c(485));if(t=e.action,t!==null){var s={payload:o,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(u){s.listeners.push(u)}};Y.T!==null?a(!0):s.isTransition=!1,l(s),a=e.pending,a===null?(s.next=e.pending=s,zd(e,s)):(s.next=a.next,e.pending=a.next=s)}}function zd(t,e){var a=e.action,l=e.payload,o=t.state;if(e.isTransition){var s=Y.T,u={};Y.T=u;try{var d=a(o,l),p=Y.S;p!==null&&p(u,d),kd(t,e,d)}catch(S){Ys(t,e,S)}finally{Y.T=s}}else try{s=a(o,l),kd(t,e,s)}catch(S){Ys(t,e,S)}}function kd(t,e,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(l){Od(t,e,l)},function(l){return Ys(t,e,l)}):Od(t,e,a)}function Od(t,e,a){e.status="fulfilled",e.value=a,jd(e),t.state=a,e=t.pending,e!==null&&(a=e.next,a===e?t.pending=null:(a=a.next,e.next=a,zd(t,a)))}function Ys(t,e,a){var l=t.pending;if(t.pending=null,l!==null){l=l.next;do e.status="rejected",e.reason=a,jd(e),e=e.next;while(e!==l)}t.action=null}function jd(t){t=t.listeners;for(var e=0;e<t.length;e++)(0,t[e])()}function Bd(t,e){return e}function Nd(t,e){if(At){var a=Rt.formState;if(a!==null){t:{var l=gt;if(At){if(se){e:{for(var o=se,s=na;o.nodeType!==8;){if(!s){o=null;break e}if(o=Ie(o.nextSibling),o===null){o=null;break e}}s=o.data,o=s==="F!"||s==="F"?o:null}if(o){se=Ie(o.nextSibling),l=o.data==="F!";break t}}mn(l)}l=!1}l&&(e=a[0])}}return a=Se(),a.memoizedState=a.baseState=e,l={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Bd,lastRenderedState:e},a.queue=l,a=Fd.bind(null,gt,l),l.dispatch=a,l=qs(!1),s=Zs.bind(null,gt,!1,l.queue),l=Se(),o={state:e,dispatch:null,action:t,pending:null},l.queue=o,a=B1.bind(null,gt,o,s,a),o.dispatch=a,l.memoizedState=t,[e,a,!1]}function Md(t){var e=Ft();return Dd(e,Nt,t)}function Dd(t,e,a){e=Hs(t,e,Bd)[0],t=jo(ma)[0],e=typeof e=="object"&&e!==null&&typeof e.then=="function"?oi(e):e;var l=Ft(),o=l.queue,s=o.dispatch;return a!==l.memoizedState&&(gt.flags|=2048,sl(9,N1.bind(null,o,a),{destroy:void 0},null)),[e,s,t]}function N1(t,e){t.action=e}function Rd(t){var e=Ft(),a=Nt;if(a!==null)return Dd(e,a,t);Ft(),e=e.memoizedState,a=Ft();var l=a.queue.dispatch;return a.memoizedState=t,[e,l,!1]}function sl(t,e,a,l){return t={tag:t,create:e,inst:a,deps:l,next:null},e=gt.updateQueue,e===null&&(e=ko(),gt.updateQueue=e),a=e.lastEffect,a===null?e.lastEffect=t.next=t:(l=a.next,a.next=t,t.next=l,e.lastEffect=t),t}function Ld(){return Ft().memoizedState}function Bo(t,e,a,l){var o=Se();gt.flags|=t,o.memoizedState=sl(1|e,a,{destroy:void 0},l===void 0?null:l)}function No(t,e,a,l){var o=Ft();l=l===void 0?null:l;var s=o.memoizedState.inst;Nt!==null&&l!==null&&Bs(l,Nt.memoizedState.deps)?o.memoizedState=sl(e,a,s,l):(gt.flags|=t,o.memoizedState=sl(1|e,a,s,l))}function Hd(t,e){Bo(8390656,8,t,e)}function Gs(t,e){No(2048,8,t,e)}function Ud(t,e){return No(4,2,t,e)}function qd(t,e){return No(4,4,t,e)}function Yd(t,e){if(typeof e=="function"){t=t();var a=e(t);return function(){typeof a=="function"?a():e(null)}}if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function Gd(t,e,a){a=a!=null?a.concat([t]):null,No(4,4,Yd.bind(null,e,t),a)}function Xs(){}function Xd(t,e){var a=Ft();e=e===void 0?null:e;var l=a.memoizedState;return e!==null&&Bs(e,l[1])?l[0]:(a.memoizedState=[t,e],t)}function Vd(t,e){var a=Ft();e=e===void 0?null:e;var l=a.memoizedState;if(e!==null&&Bs(e,l[1]))return l[0];if(l=t(),bn){ja(!0);try{t()}finally{ja(!1)}}return a.memoizedState=[l,e],l}function Vs(t,e,a){return a===void 0||(La&1073741824)!==0?t.memoizedState=e:(t.memoizedState=a,t=$h(),gt.lanes|=t,Za|=t,a)}function Qd(t,e,a,l){return Ce(a,e)?a:nl.current!==null?(t=Vs(t,a,l),Ce(t,e)||(le=!0),t):(La&42)===0?(le=!0,t.memoizedState=a):(t=$h(),gt.lanes|=t,Za|=t,e)}function $d(t,e,a,l,o){var s=H.p;H.p=s!==0&&8>s?s:8;var u=Y.T,d={};Y.T=d,Zs(t,!1,e,a);try{var p=o(),S=Y.S;if(S!==null&&S(d,p),p!==null&&typeof p=="object"&&typeof p.then=="function"){var z=k1(p,l);ri(t,e,z,je(t))}else ri(t,e,l,je(t))}catch(B){ri(t,e,{then:function(){},status:"rejected",reason:B},je())}finally{H.p=s,Y.T=u}}function M1(){}function Qs(t,e,a,l){if(t.tag!==5)throw Error(c(476));var o=Zd(t).queue;$d(t,o,e,ot,a===null?M1:function(){return Kd(t),a(l)})}function Zd(t){var e=t.memoizedState;if(e!==null)return e;e={memoizedState:ot,baseState:ot,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ma,lastRenderedState:ot},next:null};var a={};return e.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ma,lastRenderedState:a},next:null},t.memoizedState=e,t=t.alternate,t!==null&&(t.memoizedState=e),e}function Kd(t){var e=Zd(t).next.queue;ri(t,e,{},je())}function $s(){return de(Ci)}function Jd(){return Ft().memoizedState}function Wd(){return Ft().memoizedState}function D1(t){for(var e=t.return;e!==null;){switch(e.tag){case 24:case 3:var a=je();t=Ya(a);var l=Ga(e,t,a);l!==null&&(ge(l,e,a),ui(l,e,a)),e={cache:ks()},t.payload=e;return}e=e.return}}function R1(t,e,a){var l=je();a={lane:l,revertLane:0,action:a,hasEagerState:!1,eagerState:null,next:null},Mo(t)?Pd(e,a):(a=Ss(t,e,a,l),a!==null&&(ge(a,t,l),Id(a,e,l)))}function Fd(t,e,a){var l=je();ri(t,e,a,l)}function ri(t,e,a,l){var o={lane:l,revertLane:0,action:a,hasEagerState:!1,eagerState:null,next:null};if(Mo(t))Pd(e,o);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var u=e.lastRenderedState,d=s(u,a);if(o.hasEagerState=!0,o.eagerState=d,Ce(d,u))return yo(t,e,o,0),Rt===null&&go(),!1}catch{}finally{}if(a=Ss(t,e,o,l),a!==null)return ge(a,t,l),Id(a,e,l),!0}return!1}function Zs(t,e,a,l){if(l={lane:2,revertLane:Rc(),action:l,hasEagerState:!1,eagerState:null,next:null},Mo(t)){if(e)throw Error(c(479))}else e=Ss(t,a,l,2),e!==null&&ge(e,t,2)}function Mo(t){var e=t.alternate;return t===gt||e!==null&&e===gt}function Pd(t,e){ol=Co=!0;var a=t.pending;a===null?e.next=e:(e.next=a.next,a.next=e),t.pending=e}function Id(t,e,a){if((a&4194176)!==0){var l=e.lanes;l&=t.pendingLanes,a|=l,e.lanes=a,uf(t,a)}}var ia={readContext:de,use:Oo,useCallback:Zt,useContext:Zt,useEffect:Zt,useImperativeHandle:Zt,useLayoutEffect:Zt,useInsertionEffect:Zt,useMemo:Zt,useReducer:Zt,useRef:Zt,useState:Zt,useDebugValue:Zt,useDeferredValue:Zt,useTransition:Zt,useSyncExternalStore:Zt,useId:Zt};ia.useCacheRefresh=Zt,ia.useMemoCache=Zt,ia.useHostTransitionStatus=Zt,ia.useFormState=Zt,ia.useActionState=Zt,ia.useOptimistic=Zt;var vn={readContext:de,use:Oo,useCallback:function(t,e){return Se().memoizedState=[t,e===void 0?null:e],t},useContext:de,useEffect:Hd,useImperativeHandle:function(t,e,a){a=a!=null?a.concat([t]):null,Bo(4194308,4,Yd.bind(null,e,t),a)},useLayoutEffect:function(t,e){return Bo(4194308,4,t,e)},useInsertionEffect:function(t,e){Bo(4,2,t,e)},useMemo:function(t,e){var a=Se();e=e===void 0?null:e;var l=t();if(bn){ja(!0);try{t()}finally{ja(!1)}}return a.memoizedState=[l,e],l},useReducer:function(t,e,a){var l=Se();if(a!==void 0){var o=a(e);if(bn){ja(!0);try{a(e)}finally{ja(!1)}}}else o=e;return l.memoizedState=l.baseState=o,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:o},l.queue=t,t=t.dispatch=R1.bind(null,gt,t),[l.memoizedState,t]},useRef:function(t){var e=Se();return t={current:t},e.memoizedState=t},useState:function(t){t=qs(t);var e=t.queue,a=Fd.bind(null,gt,e);return e.dispatch=a,[t.memoizedState,a]},useDebugValue:Xs,useDeferredValue:function(t,e){var a=Se();return Vs(a,t,e)},useTransition:function(){var t=qs(!1);return t=$d.bind(null,gt,t.queue,!0,!1),Se().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,e,a){var l=gt,o=Se();if(At){if(a===void 0)throw Error(c(407));a=a()}else{if(a=e(),Rt===null)throw Error(c(349));(Et&60)!==0||Sd(l,e,a)}o.memoizedState=a;var s={value:a,getSnapshot:e};return o.queue=s,Hd(Ed.bind(null,l,s,t),[t]),l.flags|=2048,sl(9,Td.bind(null,l,s,a,e),{destroy:void 0},null),a},useId:function(){var t=Se(),e=Rt.identifierPrefix;if(At){var a=ha,l=da;a=(l&~(1<<32-Ae(l)-1)).toString(32)+a,e=":"+e+"R"+a,a=zo++,0<a&&(e+="H"+a.toString(32)),e+=":"}else a=O1++,e=":"+e+"r"+a.toString(32)+":";return t.memoizedState=e},useCacheRefresh:function(){return Se().memoizedState=D1.bind(null,gt)}};vn.useMemoCache=Ls,vn.useHostTransitionStatus=$s,vn.useFormState=Nd,vn.useActionState=Nd,vn.useOptimistic=function(t){var e=Se();e.memoizedState=e.baseState=t;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return e.queue=a,e=Zs.bind(null,gt,!0,a),a.dispatch=e,[t,e]};var Ha={readContext:de,use:Oo,useCallback:Xd,useContext:de,useEffect:Gs,useImperativeHandle:Gd,useInsertionEffect:Ud,useLayoutEffect:qd,useMemo:Vd,useReducer:jo,useRef:Ld,useState:function(){return jo(ma)},useDebugValue:Xs,useDeferredValue:function(t,e){var a=Ft();return Qd(a,Nt.memoizedState,t,e)},useTransition:function(){var t=jo(ma)[0],e=Ft().memoizedState;return[typeof t=="boolean"?t:oi(t),e]},useSyncExternalStore:xd,useId:Jd};Ha.useCacheRefresh=Wd,Ha.useMemoCache=Ls,Ha.useHostTransitionStatus=$s,Ha.useFormState=Md,Ha.useActionState=Md,Ha.useOptimistic=function(t,e){var a=Ft();return Cd(a,Nt,t,e)};var wn={readContext:de,use:Oo,useCallback:Xd,useContext:de,useEffect:Gs,useImperativeHandle:Gd,useInsertionEffect:Ud,useLayoutEffect:qd,useMemo:Vd,useReducer:Us,useRef:Ld,useState:function(){return Us(ma)},useDebugValue:Xs,useDeferredValue:function(t,e){var a=Ft();return Nt===null?Vs(a,t,e):Qd(a,Nt.memoizedState,t,e)},useTransition:function(){var t=Us(ma)[0],e=Ft().memoizedState;return[typeof t=="boolean"?t:oi(t),e]},useSyncExternalStore:xd,useId:Jd};wn.useCacheRefresh=Wd,wn.useMemoCache=Ls,wn.useHostTransitionStatus=$s,wn.useFormState=Rd,wn.useActionState=Rd,wn.useOptimistic=function(t,e){var a=Ft();return Nt!==null?Cd(a,Nt,t,e):(a.baseState=t,[t,a.queue.dispatch])};function Ks(t,e,a,l){e=t.memoizedState,a=a(l,e),a=a==null?e:W({},e,a),t.memoizedState=a,t.lanes===0&&(t.updateQueue.baseState=a)}var Js={isMounted:function(t){return(t=t._reactInternals)?I(t)===t:!1},enqueueSetState:function(t,e,a){t=t._reactInternals;var l=je(),o=Ya(l);o.payload=e,a!=null&&(o.callback=a),e=Ga(t,o,l),e!==null&&(ge(e,t,l),ui(e,t,l))},enqueueReplaceState:function(t,e,a){t=t._reactInternals;var l=je(),o=Ya(l);o.tag=1,o.payload=e,a!=null&&(o.callback=a),e=Ga(t,o,l),e!==null&&(ge(e,t,l),ui(e,t,l))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var a=je(),l=Ya(a);l.tag=2,e!=null&&(l.callback=e),e=Ga(t,l,a),e!==null&&(ge(e,t,a),ui(e,t,a))}};function th(t,e,a,l,o,s,u){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(l,s,u):e.prototype&&e.prototype.isPureReactComponent?!Kl(a,l)||!Kl(o,s):!0}function eh(t,e,a,l){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(a,l),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(a,l),e.state!==t&&Js.enqueueReplaceState(e,e.state,null)}function xn(t,e){var a=e;if("ref"in e){a={};for(var l in e)l!=="ref"&&(a[l]=e[l])}if(t=t.defaultProps){a===e&&(a=W({},a));for(var o in t)a[o]===void 0&&(a[o]=t[o])}return a}var Do=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)};function ah(t){Do(t)}function nh(t){console.error(t)}function lh(t){Do(t)}function Ro(t,e){try{var a=t.onUncaughtError;a(e.value,{componentStack:e.stack})}catch(l){setTimeout(function(){throw l})}}function ih(t,e,a){try{var l=t.onCaughtError;l(a.value,{componentStack:a.stack,errorBoundary:e.tag===1?e.stateNode:null})}catch(o){setTimeout(function(){throw o})}}function Ws(t,e,a){return a=Ya(a),a.tag=3,a.payload={element:null},a.callback=function(){Ro(t,e)},a}function oh(t){return t=Ya(t),t.tag=3,t}function rh(t,e,a,l){var o=a.type.getDerivedStateFromError;if(typeof o=="function"){var s=l.value;t.payload=function(){return o(s)},t.callback=function(){ih(e,a,l)}}var u=a.stateNode;u!==null&&typeof u.componentDidCatch=="function"&&(t.callback=function(){ih(e,a,l),typeof o!="function"&&(Ka===null?Ka=new Set([this]):Ka.add(this));var d=l.stack;this.componentDidCatch(l.value,{componentStack:d!==null?d:""})})}function L1(t,e,a,l,o){if(a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){if(e=a.alternate,e!==null&&ci(e,a,o,!0),a=Ge.current,a!==null){switch(a.tag){case 13:return la===null?jc():a.alternate===null&&Qt===0&&(Qt=3),a.flags&=-257,a.flags|=65536,a.lanes=o,l===As?a.flags|=16384:(e=a.updateQueue,e===null?a.updateQueue=new Set([l]):e.add(l),Nc(t,l,o)),!1;case 22:return a.flags|=65536,l===As?a.flags|=16384:(e=a.updateQueue,e===null?(e={transitions:null,markerInstances:null,retryQueue:new Set([l])},a.updateQueue=e):(a=e.retryQueue,a===null?e.retryQueue=new Set([l]):a.add(l)),Nc(t,l,o)),!1}throw Error(c(435,a.tag))}return Nc(t,l,o),jc(),!1}if(At)return e=Ge.current,e!==null?((e.flags&65536)===0&&(e.flags|=256),e.flags|=65536,e.lanes=o,l!==_s&&(t=Error(c(422),{cause:l}),Pl(Ue(t,a)))):(l!==_s&&(e=Error(c(423),{cause:l}),Pl(Ue(e,a))),t=t.current.alternate,t.flags|=65536,o&=-o,t.lanes|=o,l=Ue(l,a),o=Ws(t.stateNode,l,o),fc(t,o),Qt!==4&&(Qt=2)),!1;var s=Error(c(520),{cause:l});if(s=Ue(s,a),bi===null?bi=[s]:bi.push(s),Qt!==4&&(Qt=2),e===null)return!0;l=Ue(l,a),a=e;do{switch(a.tag){case 3:return a.flags|=65536,t=o&-o,a.lanes|=t,t=Ws(a.stateNode,l,t),fc(a,t),!1;case 1:if(e=a.type,s=a.stateNode,(a.flags&128)===0&&(typeof e.getDerivedStateFromError=="function"||s!==null&&typeof s.componentDidCatch=="function"&&(Ka===null||!Ka.has(s))))return a.flags|=65536,o&=-o,a.lanes|=o,o=oh(o),rh(o,t,a,l),fc(a,o),!1}a=a.return}while(a!==null);return!1}var sh=Error(c(461)),le=!1;function ce(t,e,a,l){e.child=t===null?hd(e,null,a,l):gn(e,t.child,a,l)}function ch(t,e,a,l,o){a=a.render;var s=e.ref;if("ref"in l){var u={};for(var d in l)d!=="ref"&&(u[d]=l[d])}else u=l;return Tn(e),l=Ns(t,e,a,u,s,o),d=Ms(),t!==null&&!le?(Ds(t,e,o),ga(t,e,o)):(At&&d&&Ts(e),e.flags|=1,ce(t,e,l,o),e.child)}function uh(t,e,a,l,o){if(t===null){var s=a.type;return typeof s=="function"&&!vc(s)&&s.defaultProps===void 0&&a.compare===null?(e.tag=15,e.type=s,fh(t,e,s,l,o)):(t=Yo(a.type,null,l,e,e.mode,o),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!ic(t,o)){var u=s.memoizedProps;if(a=a.compare,a=a!==null?a:Kl,a(u,l)&&t.ref===e.ref)return ga(t,e,o)}return e.flags|=1,t=$a(s,l),t.ref=e.ref,t.return=e,e.child=t}function fh(t,e,a,l,o){if(t!==null){var s=t.memoizedProps;if(Kl(s,l)&&t.ref===e.ref)if(le=!1,e.pendingProps=l=s,ic(t,o))(t.flags&131072)!==0&&(le=!0);else return e.lanes=t.lanes,ga(t,e,o)}return Fs(t,e,a,l,o)}function dh(t,e,a){var l=e.pendingProps,o=l.children,s=(e.stateNode._pendingVisibility&2)!==0,u=t!==null?t.memoizedState:null;if(si(t,e),l.mode==="hidden"||s){if((e.flags&128)!==0){if(l=u!==null?u.baseLanes|a:a,t!==null){for(o=e.child=t.child,s=0;o!==null;)s=s|o.lanes|o.childLanes,o=o.sibling;e.childLanes=s&~l}else e.childLanes=0,e.child=null;return hh(t,e,l,a)}if((a&536870912)!==0)e.memoizedState={baseLanes:0,cachePool:null},t!==null&&Ao(e,u!==null?u.cachePool:null),u!==null?pd(e,u):Cs(),md(e);else return e.lanes=e.childLanes=536870912,hh(t,e,u!==null?u.baseLanes|a:a,a)}else u!==null?(Ao(e,u.cachePool),pd(e,u),Ra(),e.memoizedState=null):(t!==null&&Ao(e,null),Cs(),Ra());return ce(t,e,o,a),e.child}function hh(t,e,a,l){var o=js();return o=o===null?null:{parent:ee._currentValue,pool:o},e.memoizedState={baseLanes:a,cachePool:o},t!==null&&Ao(e,null),Cs(),md(e),t!==null&&ci(t,e,l,!0),null}function si(t,e){var a=e.ref;if(a===null)t!==null&&t.ref!==null&&(e.flags|=2097664);else{if(typeof a!="function"&&typeof a!="object")throw Error(c(284));(t===null||t.ref!==a)&&(e.flags|=2097664)}}function Fs(t,e,a,l,o){return Tn(e),a=Ns(t,e,a,l,void 0,o),l=Ms(),t!==null&&!le?(Ds(t,e,o),ga(t,e,o)):(At&&l&&Ts(e),e.flags|=1,ce(t,e,a,o),e.child)}function ph(t,e,a,l,o,s){return Tn(e),e.updateQueue=null,a=wd(e,l,a,o),vd(t),l=Ms(),t!==null&&!le?(Ds(t,e,s),ga(t,e,s)):(At&&l&&Ts(e),e.flags|=1,ce(t,e,a,s),e.child)}function mh(t,e,a,l,o){if(Tn(e),e.stateNode===null){var s=In,u=a.contextType;typeof u=="object"&&u!==null&&(s=de(u)),s=new a(l,s),e.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,s.updater=Js,e.stateNode=s,s._reactInternals=e,s=e.stateNode,s.props=l,s.state=e.memoizedState,s.refs={},cc(e),u=a.contextType,s.context=typeof u=="object"&&u!==null?de(u):In,s.state=e.memoizedState,u=a.getDerivedStateFromProps,typeof u=="function"&&(Ks(e,a,u,l),s.state=e.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(u=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),u!==s.state&&Js.enqueueReplaceState(s,s.state,null),di(e,l,s,o),fi(),s.state=e.memoizedState),typeof s.componentDidMount=="function"&&(e.flags|=4194308),l=!0}else if(t===null){s=e.stateNode;var d=e.memoizedProps,p=xn(a,d);s.props=p;var S=s.context,z=a.contextType;u=In,typeof z=="object"&&z!==null&&(u=de(z));var B=a.getDerivedStateFromProps;z=typeof B=="function"||typeof s.getSnapshotBeforeUpdate=="function",d=e.pendingProps!==d,z||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(d||S!==u)&&eh(e,s,l,u),qa=!1;var _=e.memoizedState;s.state=_,di(e,l,s,o),fi(),S=e.memoizedState,d||_!==S||qa?(typeof B=="function"&&(Ks(e,a,B,l),S=e.memoizedState),(p=qa||th(e,a,p,l,_,S,u))?(z||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(e.flags|=4194308)):(typeof s.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=l,e.memoizedState=S),s.props=l,s.state=S,s.context=u,l=p):(typeof s.componentDidMount=="function"&&(e.flags|=4194308),l=!1)}else{s=e.stateNode,uc(t,e),u=e.memoizedProps,z=xn(a,u),s.props=z,B=e.pendingProps,_=s.context,S=a.contextType,p=In,typeof S=="object"&&S!==null&&(p=de(S)),d=a.getDerivedStateFromProps,(S=typeof d=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(u!==B||_!==p)&&eh(e,s,l,p),qa=!1,_=e.memoizedState,s.state=_,di(e,l,s,o),fi();var C=e.memoizedState;u!==B||_!==C||qa||t!==null&&t.dependencies!==null&&Lo(t.dependencies)?(typeof d=="function"&&(Ks(e,a,d,l),C=e.memoizedState),(z=qa||th(e,a,z,l,_,C,p)||t!==null&&t.dependencies!==null&&Lo(t.dependencies))?(S||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(l,C,p),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(l,C,p)),typeof s.componentDidUpdate=="function"&&(e.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof s.componentDidUpdate!="function"||u===t.memoizedProps&&_===t.memoizedState||(e.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||u===t.memoizedProps&&_===t.memoizedState||(e.flags|=1024),e.memoizedProps=l,e.memoizedState=C),s.props=l,s.state=C,s.context=p,l=z):(typeof s.componentDidUpdate!="function"||u===t.memoizedProps&&_===t.memoizedState||(e.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||u===t.memoizedProps&&_===t.memoizedState||(e.flags|=1024),l=!1)}return s=l,si(t,e),l=(e.flags&128)!==0,s||l?(s=e.stateNode,a=l&&typeof a.getDerivedStateFromError!="function"?null:s.render(),e.flags|=1,t!==null&&l?(e.child=gn(e,t.child,null,o),e.child=gn(e,null,a,o)):ce(t,e,a,o),e.memoizedState=s.state,t=e.child):t=ga(t,e,o),t}function gh(t,e,a,l){return Fl(),e.flags|=256,ce(t,e,a,l),e.child}var Ps={dehydrated:null,treeContext:null,retryLane:0};function Is(t){return{baseLanes:t,cachePool:bd()}}function tc(t,e,a){return t=t!==null?t.childLanes&~a:0,e&&(t|=$e),t}function yh(t,e,a){var l=e.pendingProps,o=!1,s=(e.flags&128)!==0,u;if((u=s)||(u=t!==null&&t.memoizedState===null?!1:(te.current&2)!==0),u&&(o=!0,e.flags&=-129),u=(e.flags&32)!==0,e.flags&=-33,t===null){if(At){if(o?Da(e):Ra(),At){var d=se,p;if(p=d){t:{for(p=d,d=na;p.nodeType!==8;){if(!d){d=null;break t}if(p=Ie(p.nextSibling),p===null){d=null;break t}}d=p}d!==null?(e.memoizedState={dehydrated:d,treeContext:hn!==null?{id:da,overflow:ha}:null,retryLane:536870912},p=Qe(18,null,null,0),p.stateNode=d,p.return=e,e.child=p,me=e,se=null,p=!0):p=!1}p||mn(e)}if(d=e.memoizedState,d!==null&&(d=d.dehydrated,d!==null))return d.data==="$!"?e.lanes=16:e.lanes=536870912,null;pa(e)}return d=l.children,l=l.fallback,o?(Ra(),o=e.mode,d=ac({mode:"hidden",children:d},o),l=_n(l,o,a,null),d.return=e,l.return=e,d.sibling=l,e.child=d,o=e.child,o.memoizedState=Is(a),o.childLanes=tc(t,u,a),e.memoizedState=Ps,l):(Da(e),ec(e,d))}if(p=t.memoizedState,p!==null&&(d=p.dehydrated,d!==null)){if(s)e.flags&256?(Da(e),e.flags&=-257,e=nc(t,e,a)):e.memoizedState!==null?(Ra(),e.child=t.child,e.flags|=128,e=null):(Ra(),o=l.fallback,d=e.mode,l=ac({mode:"visible",children:l.children},d),o=_n(o,d,a,null),o.flags|=2,l.return=e,o.return=e,l.sibling=o,e.child=l,gn(e,t.child,null,a),l=e.child,l.memoizedState=Is(a),l.childLanes=tc(t,u,a),e.memoizedState=Ps,e=o);else if(Da(e),d.data==="$!"){if(u=d.nextSibling&&d.nextSibling.dataset,u)var S=u.dgst;u=S,l=Error(c(419)),l.stack="",l.digest=u,Pl({value:l,source:null,stack:null}),e=nc(t,e,a)}else if(le||ci(t,e,a,!1),u=(a&t.childLanes)!==0,le||u){if(u=Rt,u!==null){if(l=a&-a,(l&42)!==0)l=1;else switch(l){case 2:l=1;break;case 8:l=4;break;case 32:l=16;break;case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:l=64;break;case 268435456:l=134217728;break;default:l=0}if(l=(l&(u.suspendedLanes|a))!==0?0:l,l!==0&&l!==p.retryLane)throw p.retryLane=l,Ma(t,l),ge(u,t,l),sh}d.data==="$?"||jc(),e=nc(t,e,a)}else d.data==="$?"?(e.flags|=128,e.child=t.child,e=P1.bind(null,t),d._reactRetry=e,e=null):(t=p.treeContext,se=Ie(d.nextSibling),me=e,At=!0,Fe=null,na=!1,t!==null&&(qe[Ye++]=da,qe[Ye++]=ha,qe[Ye++]=hn,da=t.id,ha=t.overflow,hn=e),e=ec(e,l.children),e.flags|=4096);return e}return o?(Ra(),o=l.fallback,d=e.mode,p=t.child,S=p.sibling,l=$a(p,{mode:"hidden",children:l.children}),l.subtreeFlags=p.subtreeFlags&31457280,S!==null?o=$a(S,o):(o=_n(o,d,a,null),o.flags|=2),o.return=e,l.return=e,l.sibling=o,e.child=l,l=o,o=e.child,d=t.child.memoizedState,d===null?d=Is(a):(p=d.cachePool,p!==null?(S=ee._currentValue,p=p.parent!==S?{parent:S,pool:S}:p):p=bd(),d={baseLanes:d.baseLanes|a,cachePool:p}),o.memoizedState=d,o.childLanes=tc(t,u,a),e.memoizedState=Ps,l):(Da(e),a=t.child,t=a.sibling,a=$a(a,{mode:"visible",children:l.children}),a.return=e,a.sibling=null,t!==null&&(u=e.deletions,u===null?(e.deletions=[t],e.flags|=16):u.push(t)),e.child=a,e.memoizedState=null,a)}function ec(t,e){return e=ac({mode:"visible",children:e},t.mode),e.return=t,t.child=e}function ac(t,e){return Xh(t,e,0,null)}function nc(t,e,a){return gn(e,t.child,null,a),t=ec(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function bh(t,e,a){t.lanes|=e;var l=t.alternate;l!==null&&(l.lanes|=e),rc(t.return,e,a)}function lc(t,e,a,l,o){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:l,tail:a,tailMode:o}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=l,s.tail=a,s.tailMode=o)}function vh(t,e,a){var l=e.pendingProps,o=l.revealOrder,s=l.tail;if(ce(t,e,l.children,a),l=te.current,(l&2)!==0)l=l&1|2,e.flags|=128;else{if(t!==null&&(t.flags&128)!==0)t:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&bh(t,a,e);else if(t.tag===19)bh(t,a,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break t;for(;t.sibling===null;){if(t.return===null||t.return===e)break t;t=t.return}t.sibling.return=t.return,t=t.sibling}l&=1}switch(dt(te,l),o){case"forwards":for(a=e.child,o=null;a!==null;)t=a.alternate,t!==null&&_o(t)===null&&(o=a),a=a.sibling;a=o,a===null?(o=e.child,e.child=null):(o=a.sibling,a.sibling=null),lc(e,!1,o,a,s);break;case"backwards":for(a=null,o=e.child,e.child=null;o!==null;){if(t=o.alternate,t!==null&&_o(t)===null){e.child=o;break}t=o.sibling,o.sibling=a,a=o,o=t}lc(e,!0,a,null,s);break;case"together":lc(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function ga(t,e,a){if(t!==null&&(e.dependencies=t.dependencies),Za|=e.lanes,(a&e.childLanes)===0)if(t!==null){if(ci(t,e,a,!1),(a&e.childLanes)===0)return null}else return null;if(t!==null&&e.child!==t.child)throw Error(c(153));if(e.child!==null){for(t=e.child,a=$a(t,t.pendingProps),e.child=a,a.return=e;t.sibling!==null;)t=t.sibling,a=a.sibling=$a(t,t.pendingProps),a.return=e;a.sibling=null}return e.child}function ic(t,e){return(t.lanes&e)!==0?!0:(t=t.dependencies,!!(t!==null&&Lo(t)))}function H1(t,e,a){switch(e.tag){case 3:Pi(e,e.stateNode.containerInfo),Ua(e,ee,t.memoizedState.cache),Fl();break;case 27:case 5:Jr(e);break;case 4:Pi(e,e.stateNode.containerInfo);break;case 10:Ua(e,e.type,e.memoizedProps.value);break;case 13:var l=e.memoizedState;if(l!==null)return l.dehydrated!==null?(Da(e),e.flags|=128,null):(a&e.child.childLanes)!==0?yh(t,e,a):(Da(e),t=ga(t,e,a),t!==null?t.sibling:null);Da(e);break;case 19:var o=(t.flags&128)!==0;if(l=(a&e.childLanes)!==0,l||(ci(t,e,a,!1),l=(a&e.childLanes)!==0),o){if(l)return vh(t,e,a);e.flags|=128}if(o=e.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),dt(te,te.current),l)break;return null;case 22:case 23:return e.lanes=0,dh(t,e,a);case 24:Ua(e,ee,t.memoizedState.cache)}return ga(t,e,a)}function wh(t,e,a){if(t!==null)if(t.memoizedProps!==e.pendingProps)le=!0;else{if(!ic(t,a)&&(e.flags&128)===0)return le=!1,H1(t,e,a);le=(t.flags&131072)!==0}else le=!1,At&&(e.flags&1048576)!==0&&ld(e,wo,e.index);switch(e.lanes=0,e.tag){case 16:t:{t=e.pendingProps;var l=e.elementType,o=l._init;if(l=o(l._payload),e.type=l,typeof l=="function")vc(l)?(t=xn(l,t),e.tag=1,e=mh(null,e,l,t,a)):(e.tag=0,e=Fs(null,e,l,t,a));else{if(l!=null){if(o=l.$$typeof,o===G){e.tag=11,e=ch(null,e,l,t,a);break t}else if(o===K){e.tag=14,e=uh(null,e,l,t,a);break t}}throw e=X(l)||l,Error(c(306,e,""))}}return e;case 0:return Fs(t,e,e.type,e.pendingProps,a);case 1:return l=e.type,o=xn(l,e.pendingProps),mh(t,e,l,o,a);case 3:t:{if(Pi(e,e.stateNode.containerInfo),t===null)throw Error(c(387));var s=e.pendingProps;o=e.memoizedState,l=o.element,uc(t,e),di(e,s,null,a);var u=e.memoizedState;if(s=u.cache,Ua(e,ee,s),s!==o.cache&&sc(e,[ee],a,!0),fi(),s=u.element,o.isDehydrated)if(o={element:s,isDehydrated:!1,cache:u.cache},e.updateQueue.baseState=o,e.memoizedState=o,e.flags&256){e=gh(t,e,s,a);break t}else if(s!==l){l=Ue(Error(c(424)),e),Pl(l),e=gh(t,e,s,a);break t}else for(se=Ie(e.stateNode.containerInfo.firstChild),me=e,At=!0,Fe=null,na=!0,a=hd(e,null,s,a),e.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(Fl(),s===l){e=ga(t,e,a);break t}ce(t,e,s,a)}e=e.child}return e;case 26:return si(t,e),t===null?(a=Tp(e.type,null,e.pendingProps,null))?e.memoizedState=a:At||(a=e.type,t=e.pendingProps,l=Io(Oa.current).createElement(a),l[fe]=e,l[we]=t,ue(l,a,t),ne(l),e.stateNode=l):e.memoizedState=Tp(e.type,t.memoizedProps,e.pendingProps,t.memoizedState),null;case 27:return Jr(e),t===null&&At&&(l=e.stateNode=wp(e.type,e.pendingProps,Oa.current),me=e,na=!0,se=Ie(l.firstChild)),l=e.pendingProps.children,t!==null||At?ce(t,e,l,a):e.child=gn(e,null,l,a),si(t,e),e.child;case 5:return t===null&&At&&((o=l=se)&&(l=p2(l,e.type,e.pendingProps,na),l!==null?(e.stateNode=l,me=e,se=Ie(l.firstChild),na=!1,o=!0):o=!1),o||mn(e)),Jr(e),o=e.type,s=e.pendingProps,u=t!==null?t.memoizedProps:null,l=s.children,Qc(o,s)?l=null:u!==null&&Qc(o,u)&&(e.flags|=32),e.memoizedState!==null&&(o=Ns(t,e,j1,null,null,a),Ci._currentValue=o),si(t,e),ce(t,e,l,a),e.child;case 6:return t===null&&At&&((t=a=se)&&(a=m2(a,e.pendingProps,na),a!==null?(e.stateNode=a,me=e,se=null,t=!0):t=!1),t||mn(e)),null;case 13:return yh(t,e,a);case 4:return Pi(e,e.stateNode.containerInfo),l=e.pendingProps,t===null?e.child=gn(e,null,l,a):ce(t,e,l,a),e.child;case 11:return ch(t,e,e.type,e.pendingProps,a);case 7:return ce(t,e,e.pendingProps,a),e.child;case 8:return ce(t,e,e.pendingProps.children,a),e.child;case 12:return ce(t,e,e.pendingProps.children,a),e.child;case 10:return l=e.pendingProps,Ua(e,e.type,l.value),ce(t,e,l.children,a),e.child;case 9:return o=e.type._context,l=e.pendingProps.children,Tn(e),o=de(o),l=l(o),e.flags|=1,ce(t,e,l,a),e.child;case 14:return uh(t,e,e.type,e.pendingProps,a);case 15:return fh(t,e,e.type,e.pendingProps,a);case 19:return vh(t,e,a);case 22:return dh(t,e,a);case 24:return Tn(e),l=de(ee),t===null?(o=js(),o===null&&(o=Rt,s=ks(),o.pooledCache=s,s.refCount++,s!==null&&(o.pooledCacheLanes|=a),o=s),e.memoizedState={parent:l,cache:o},cc(e),Ua(e,ee,o)):((t.lanes&a)!==0&&(uc(t,e),di(e,null,null,a),fi()),o=t.memoizedState,s=e.memoizedState,o.parent!==l?(o={parent:l,cache:l},e.memoizedState=o,e.lanes===0&&(e.memoizedState=e.updateQueue.baseState=o),Ua(e,ee,l)):(l=s.cache,Ua(e,ee,l),l!==o.cache&&sc(e,[ee],a,!0))),ce(t,e,e.pendingProps.children,a),e.child;case 29:throw e.pendingProps}throw Error(c(156,e.tag))}var oc=ut(null),Sn=null,ya=null;function Ua(t,e,a){dt(oc,e._currentValue),e._currentValue=a}function ba(t){t._currentValue=oc.current,St(oc)}function rc(t,e,a){for(;t!==null;){var l=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,l!==null&&(l.childLanes|=e)):l!==null&&(l.childLanes&e)!==e&&(l.childLanes|=e),t===a)break;t=t.return}}function sc(t,e,a,l){var o=t.child;for(o!==null&&(o.return=t);o!==null;){var s=o.dependencies;if(s!==null){var u=o.child;s=s.firstContext;t:for(;s!==null;){var d=s;s=o;for(var p=0;p<e.length;p++)if(d.context===e[p]){s.lanes|=a,d=s.alternate,d!==null&&(d.lanes|=a),rc(s.return,a,t),l||(u=null);break t}s=d.next}}else if(o.tag===18){if(u=o.return,u===null)throw Error(c(341));u.lanes|=a,s=u.alternate,s!==null&&(s.lanes|=a),rc(u,a,t),u=null}else u=o.child;if(u!==null)u.return=o;else for(u=o;u!==null;){if(u===t){u=null;break}if(o=u.sibling,o!==null){o.return=u.return,u=o;break}u=u.return}o=u}}function ci(t,e,a,l){t=null;for(var o=e,s=!1;o!==null;){if(!s){if((o.flags&524288)!==0)s=!0;else if((o.flags&262144)!==0)break}if(o.tag===10){var u=o.alternate;if(u===null)throw Error(c(387));if(u=u.memoizedProps,u!==null){var d=o.type;Ce(o.pendingProps.value,u.value)||(t!==null?t.push(d):t=[d])}}else if(o===Fi.current){if(u=o.alternate,u===null)throw Error(c(387));u.memoizedState.memoizedState!==o.memoizedState.memoizedState&&(t!==null?t.push(Ci):t=[Ci])}o=o.return}t!==null&&sc(e,t,a,l),e.flags|=262144}function Lo(t){for(t=t.firstContext;t!==null;){if(!Ce(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function Tn(t){Sn=t,ya=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function de(t){return xh(Sn,t)}function Ho(t,e){return Sn===null&&Tn(t),xh(t,e)}function xh(t,e){var a=e._currentValue;if(e={context:e,memoizedValue:a,next:null},ya===null){if(t===null)throw Error(c(308));ya=e,t.dependencies={lanes:0,firstContext:e},t.flags|=524288}else ya=ya.next=e;return a}var qa=!1;function cc(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function uc(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function Ya(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function Ga(t,e,a){var l=t.updateQueue;if(l===null)return null;if(l=l.shared,(Yt&2)!==0){var o=l.pending;return o===null?e.next=e:(e.next=o.next,o.next=e),l.pending=e,e=bo(t),ad(t,null,a),e}return yo(t,l,e,a),bo(t)}function ui(t,e,a){if(e=e.updateQueue,e!==null&&(e=e.shared,(a&4194176)!==0)){var l=e.lanes;l&=t.pendingLanes,a|=l,e.lanes=a,uf(t,a)}}function fc(t,e){var a=t.updateQueue,l=t.alternate;if(l!==null&&(l=l.updateQueue,a===l)){var o=null,s=null;if(a=a.firstBaseUpdate,a!==null){do{var u={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};s===null?o=s=u:s=s.next=u,a=a.next}while(a!==null);s===null?o=s=e:s=s.next=e}else o=s=e;a={baseState:l.baseState,firstBaseUpdate:o,lastBaseUpdate:s,shared:l.shared,callbacks:l.callbacks},t.updateQueue=a;return}t=a.lastBaseUpdate,t===null?a.firstBaseUpdate=e:t.next=e,a.lastBaseUpdate=e}var dc=!1;function fi(){if(dc){var t=il;if(t!==null)throw t}}function di(t,e,a,l){dc=!1;var o=t.updateQueue;qa=!1;var s=o.firstBaseUpdate,u=o.lastBaseUpdate,d=o.shared.pending;if(d!==null){o.shared.pending=null;var p=d,S=p.next;p.next=null,u===null?s=S:u.next=S,u=p;var z=t.alternate;z!==null&&(z=z.updateQueue,d=z.lastBaseUpdate,d!==u&&(d===null?z.firstBaseUpdate=S:d.next=S,z.lastBaseUpdate=p))}if(s!==null){var B=o.baseState;u=0,z=S=p=null,d=s;do{var _=d.lane&-536870913,C=_!==d.lane;if(C?(Et&_)===_:(l&_)===_){_!==0&&_===ll&&(dc=!0),z!==null&&(z=z.next={lane:0,tag:d.tag,payload:d.payload,callback:null,next:null});t:{var tt=t,ft=d;_=e;var $t=a;switch(ft.tag){case 1:if(tt=ft.payload,typeof tt=="function"){B=tt.call($t,B,_);break t}B=tt;break t;case 3:tt.flags=tt.flags&-65537|128;case 0:if(tt=ft.payload,_=typeof tt=="function"?tt.call($t,B,_):tt,_==null)break t;B=W({},B,_);break t;case 2:qa=!0}}_=d.callback,_!==null&&(t.flags|=64,C&&(t.flags|=8192),C=o.callbacks,C===null?o.callbacks=[_]:C.push(_))}else C={lane:_,tag:d.tag,payload:d.payload,callback:d.callback,next:null},z===null?(S=z=C,p=B):z=z.next=C,u|=_;if(d=d.next,d===null){if(d=o.shared.pending,d===null)break;C=d,d=C.next,C.next=null,o.lastBaseUpdate=C,o.shared.pending=null}}while(!0);z===null&&(p=B),o.baseState=p,o.firstBaseUpdate=S,o.lastBaseUpdate=z,s===null&&(o.shared.lanes=0),Za|=u,t.lanes=u,t.memoizedState=B}}function Sh(t,e){if(typeof t!="function")throw Error(c(191,t));t.call(e)}function Th(t,e){var a=t.callbacks;if(a!==null)for(t.callbacks=null,t=0;t<a.length;t++)Sh(a[t],e)}function hi(t,e){try{var a=e.updateQueue,l=a!==null?a.lastEffect:null;if(l!==null){var o=l.next;a=o;do{if((a.tag&t)===t){l=void 0;var s=a.create,u=a.inst;l=s(),u.destroy=l}a=a.next}while(a!==o)}}catch(d){Dt(e,e.return,d)}}function Xa(t,e,a){try{var l=e.updateQueue,o=l!==null?l.lastEffect:null;if(o!==null){var s=o.next;l=s;do{if((l.tag&t)===t){var u=l.inst,d=u.destroy;if(d!==void 0){u.destroy=void 0,o=e;var p=a;try{d()}catch(S){Dt(o,p,S)}}}l=l.next}while(l!==s)}}catch(S){Dt(e,e.return,S)}}function Eh(t){var e=t.updateQueue;if(e!==null){var a=t.stateNode;try{Th(e,a)}catch(l){Dt(t,t.return,l)}}}function _h(t,e,a){a.props=xn(t.type,t.memoizedProps),a.state=t.memoizedState;try{a.componentWillUnmount()}catch(l){Dt(t,e,l)}}function En(t,e){try{var a=t.ref;if(a!==null){var l=t.stateNode;switch(t.tag){case 26:case 27:case 5:var o=l;break;default:o=l}typeof a=="function"?t.refCleanup=a(o):a.current=o}}catch(s){Dt(t,e,s)}}function ze(t,e){var a=t.ref,l=t.refCleanup;if(a!==null)if(typeof l=="function")try{l()}catch(o){Dt(t,e,o)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(o){Dt(t,e,o)}else a.current=null}function Ah(t){var e=t.type,a=t.memoizedProps,l=t.stateNode;try{t:switch(e){case"button":case"input":case"select":case"textarea":a.autoFocus&&l.focus();break t;case"img":a.src?l.src=a.src:a.srcSet&&(l.srcset=a.srcSet)}}catch(o){Dt(t,t.return,o)}}function Ch(t,e,a){try{var l=t.stateNode;c2(l,t.type,a,e),l[we]=e}catch(o){Dt(t,t.return,o)}}function zh(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27||t.tag===4}function hc(t){t:for(;;){for(;t.sibling===null;){if(t.return===null||zh(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==27&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue t;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function pc(t,e,a){var l=t.tag;if(l===5||l===6)t=t.stateNode,e?a.nodeType===8?a.parentNode.insertBefore(t,e):a.insertBefore(t,e):(a.nodeType===8?(e=a.parentNode,e.insertBefore(t,a)):(e=a,e.appendChild(t)),a=a._reactRootContainer,a!=null||e.onclick!==null||(e.onclick=Po));else if(l!==4&&l!==27&&(t=t.child,t!==null))for(pc(t,e,a),t=t.sibling;t!==null;)pc(t,e,a),t=t.sibling}function Uo(t,e,a){var l=t.tag;if(l===5||l===6)t=t.stateNode,e?a.insertBefore(t,e):a.appendChild(t);else if(l!==4&&l!==27&&(t=t.child,t!==null))for(Uo(t,e,a),t=t.sibling;t!==null;)Uo(t,e,a),t=t.sibling}var va=!1,Vt=!1,mc=!1,kh=typeof WeakSet=="function"?WeakSet:Set,ie=null,Oh=!1;function U1(t,e){if(t=t.containerInfo,Xc=ir,t=Zf(t),ys(t)){if("selectionStart"in t)var a={start:t.selectionStart,end:t.selectionEnd};else t:{a=(a=t.ownerDocument)&&a.defaultView||window;var l=a.getSelection&&a.getSelection();if(l&&l.rangeCount!==0){a=l.anchorNode;var o=l.anchorOffset,s=l.focusNode;l=l.focusOffset;try{a.nodeType,s.nodeType}catch{a=null;break t}var u=0,d=-1,p=-1,S=0,z=0,B=t,_=null;e:for(;;){for(var C;B!==a||o!==0&&B.nodeType!==3||(d=u+o),B!==s||l!==0&&B.nodeType!==3||(p=u+l),B.nodeType===3&&(u+=B.nodeValue.length),(C=B.firstChild)!==null;)_=B,B=C;for(;;){if(B===t)break e;if(_===a&&++S===o&&(d=u),_===s&&++z===l&&(p=u),(C=B.nextSibling)!==null)break;B=_,_=B.parentNode}B=C}a=d===-1||p===-1?null:{start:d,end:p}}else a=null}a=a||{start:0,end:0}}else a=null;for(Vc={focusedElem:t,selectionRange:a},ir=!1,ie=e;ie!==null;)if(e=ie,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,ie=t;else for(;ie!==null;){switch(e=ie,s=e.alternate,t=e.flags,e.tag){case 0:break;case 11:case 15:break;case 1:if((t&1024)!==0&&s!==null){t=void 0,a=e,o=s.memoizedProps,s=s.memoizedState,l=a.stateNode;try{var tt=xn(a.type,o,a.elementType===a.type);t=l.getSnapshotBeforeUpdate(tt,s),l.__reactInternalSnapshotBeforeUpdate=t}catch(ft){Dt(a,a.return,ft)}}break;case 3:if((t&1024)!==0){if(t=e.stateNode.containerInfo,a=t.nodeType,a===9)Kc(t);else if(a===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":Kc(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((t&1024)!==0)throw Error(c(163))}if(t=e.sibling,t!==null){t.return=e.return,ie=t;break}ie=e.return}return tt=Oh,Oh=!1,tt}function jh(t,e,a){var l=a.flags;switch(a.tag){case 0:case 11:case 15:xa(t,a),l&4&&hi(5,a);break;case 1:if(xa(t,a),l&4)if(t=a.stateNode,e===null)try{t.componentDidMount()}catch(d){Dt(a,a.return,d)}else{var o=xn(a.type,e.memoizedProps);e=e.memoizedState;try{t.componentDidUpdate(o,e,t.__reactInternalSnapshotBeforeUpdate)}catch(d){Dt(a,a.return,d)}}l&64&&Eh(a),l&512&&En(a,a.return);break;case 3:if(xa(t,a),l&64&&(l=a.updateQueue,l!==null)){if(t=null,a.child!==null)switch(a.child.tag){case 27:case 5:t=a.child.stateNode;break;case 1:t=a.child.stateNode}try{Th(l,t)}catch(d){Dt(a,a.return,d)}}break;case 26:xa(t,a),l&512&&En(a,a.return);break;case 27:case 5:xa(t,a),e===null&&l&4&&Ah(a),l&512&&En(a,a.return);break;case 12:xa(t,a);break;case 13:xa(t,a),l&4&&Mh(t,a);break;case 22:if(o=a.memoizedState!==null||va,!o){e=e!==null&&e.memoizedState!==null||Vt;var s=va,u=Vt;va=o,(Vt=e)&&!u?Va(t,a,(a.subtreeFlags&8772)!==0):xa(t,a),va=s,Vt=u}l&512&&(a.memoizedProps.mode==="manual"?En(a,a.return):ze(a,a.return));break;default:xa(t,a)}}function Bh(t){var e=t.alternate;e!==null&&(t.alternate=null,Bh(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&es(e)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var Pt=null,ke=!1;function wa(t,e,a){for(a=a.child;a!==null;)Nh(t,e,a),a=a.sibling}function Nh(t,e,a){if(_e&&typeof _e.onCommitFiberUnmount=="function")try{_e.onCommitFiberUnmount(Rl,a)}catch{}switch(a.tag){case 26:Vt||ze(a,e),wa(t,e,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:Vt||ze(a,e);var l=Pt,o=ke;for(Pt=a.stateNode,wa(t,e,a),a=a.stateNode,e=a.attributes;e.length;)a.removeAttributeNode(e[0]);es(a),Pt=l,ke=o;break;case 5:Vt||ze(a,e);case 6:o=Pt;var s=ke;if(Pt=null,wa(t,e,a),Pt=o,ke=s,Pt!==null)if(ke)try{t=Pt,l=a.stateNode,t.nodeType===8?t.parentNode.removeChild(l):t.removeChild(l)}catch(u){Dt(a,e,u)}else try{Pt.removeChild(a.stateNode)}catch(u){Dt(a,e,u)}break;case 18:Pt!==null&&(ke?(e=Pt,a=a.stateNode,e.nodeType===8?Zc(e.parentNode,a):e.nodeType===1&&Zc(e,a),ji(e)):Zc(Pt,a.stateNode));break;case 4:l=Pt,o=ke,Pt=a.stateNode.containerInfo,ke=!0,wa(t,e,a),Pt=l,ke=o;break;case 0:case 11:case 14:case 15:Vt||Xa(2,a,e),Vt||Xa(4,a,e),wa(t,e,a);break;case 1:Vt||(ze(a,e),l=a.stateNode,typeof l.componentWillUnmount=="function"&&_h(a,e,l)),wa(t,e,a);break;case 21:wa(t,e,a);break;case 22:Vt||ze(a,e),Vt=(l=Vt)||a.memoizedState!==null,wa(t,e,a),Vt=l;break;default:wa(t,e,a)}}function Mh(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{ji(t)}catch(a){Dt(e,e.return,a)}}function q1(t){switch(t.tag){case 13:case 19:var e=t.stateNode;return e===null&&(e=t.stateNode=new kh),e;case 22:return t=t.stateNode,e=t._retryCache,e===null&&(e=t._retryCache=new kh),e;default:throw Error(c(435,t.tag))}}function gc(t,e){var a=q1(t);e.forEach(function(l){var o=I1.bind(null,t,l);a.has(l)||(a.add(l),l.then(o,o))})}function Xe(t,e){var a=e.deletions;if(a!==null)for(var l=0;l<a.length;l++){var o=a[l],s=t,u=e,d=u;t:for(;d!==null;){switch(d.tag){case 27:case 5:Pt=d.stateNode,ke=!1;break t;case 3:Pt=d.stateNode.containerInfo,ke=!0;break t;case 4:Pt=d.stateNode.containerInfo,ke=!0;break t}d=d.return}if(Pt===null)throw Error(c(160));Nh(s,u,o),Pt=null,ke=!1,s=o.alternate,s!==null&&(s.return=null),o.return=null}if(e.subtreeFlags&13878)for(e=e.child;e!==null;)Dh(e,t),e=e.sibling}var Pe=null;function Dh(t,e){var a=t.alternate,l=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:Xe(e,t),Ve(t),l&4&&(Xa(3,t,t.return),hi(3,t),Xa(5,t,t.return));break;case 1:Xe(e,t),Ve(t),l&512&&(Vt||a===null||ze(a,a.return)),l&64&&va&&(t=t.updateQueue,t!==null&&(l=t.callbacks,l!==null&&(a=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=a===null?l:a.concat(l))));break;case 26:var o=Pe;if(Xe(e,t),Ve(t),l&512&&(Vt||a===null||ze(a,a.return)),l&4){var s=a!==null?a.memoizedState:null;if(l=t.memoizedState,a===null)if(l===null)if(t.stateNode===null){t:{l=t.type,a=t.memoizedProps,o=o.ownerDocument||o;e:switch(l){case"title":s=o.getElementsByTagName("title")[0],(!s||s[Ul]||s[fe]||s.namespaceURI==="http://www.w3.org/2000/svg"||s.hasAttribute("itemprop"))&&(s=o.createElement(l),o.head.insertBefore(s,o.querySelector("head > title"))),ue(s,l,a),s[fe]=t,ne(s),l=s;break t;case"link":var u=Ap("link","href",o).get(l+(a.href||""));if(u){for(var d=0;d<u.length;d++)if(s=u[d],s.getAttribute("href")===(a.href==null?null:a.href)&&s.getAttribute("rel")===(a.rel==null?null:a.rel)&&s.getAttribute("title")===(a.title==null?null:a.title)&&s.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){u.splice(d,1);break e}}s=o.createElement(l),ue(s,l,a),o.head.appendChild(s);break;case"meta":if(u=Ap("meta","content",o).get(l+(a.content||""))){for(d=0;d<u.length;d++)if(s=u[d],s.getAttribute("content")===(a.content==null?null:""+a.content)&&s.getAttribute("name")===(a.name==null?null:a.name)&&s.getAttribute("property")===(a.property==null?null:a.property)&&s.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&s.getAttribute("charset")===(a.charSet==null?null:a.charSet)){u.splice(d,1);break e}}s=o.createElement(l),ue(s,l,a),o.head.appendChild(s);break;default:throw Error(c(468,l))}s[fe]=t,ne(s),l=s}t.stateNode=l}else Cp(o,t.type,t.stateNode);else t.stateNode=_p(o,l,t.memoizedProps);else s!==l?(s===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):s.count--,l===null?Cp(o,t.type,t.stateNode):_p(o,l,t.memoizedProps)):l===null&&t.stateNode!==null&&Ch(t,t.memoizedProps,a.memoizedProps)}break;case 27:if(l&4&&t.alternate===null){o=t.stateNode,s=t.memoizedProps;try{for(var p=o.firstChild;p;){var S=p.nextSibling,z=p.nodeName;p[Ul]||z==="HEAD"||z==="BODY"||z==="SCRIPT"||z==="STYLE"||z==="LINK"&&p.rel.toLowerCase()==="stylesheet"||o.removeChild(p),p=S}for(var B=t.type,_=o.attributes;_.length;)o.removeAttributeNode(_[0]);ue(o,B,s),o[fe]=t,o[we]=s}catch(tt){Dt(t,t.return,tt)}}case 5:if(Xe(e,t),Ve(t),l&512&&(Vt||a===null||ze(a,a.return)),t.flags&32){o=t.stateNode;try{$n(o,"")}catch(tt){Dt(t,t.return,tt)}}l&4&&t.stateNode!=null&&(o=t.memoizedProps,Ch(t,o,a!==null?a.memoizedProps:o)),l&1024&&(mc=!0);break;case 6:if(Xe(e,t),Ve(t),l&4){if(t.stateNode===null)throw Error(c(162));l=t.memoizedProps,a=t.stateNode;try{a.nodeValue=l}catch(tt){Dt(t,t.return,tt)}}break;case 3:if(ar=null,o=Pe,Pe=tr(e.containerInfo),Xe(e,t),Pe=o,Ve(t),l&4&&a!==null&&a.memoizedState.isDehydrated)try{ji(e.containerInfo)}catch(tt){Dt(t,t.return,tt)}mc&&(mc=!1,Rh(t));break;case 4:l=Pe,Pe=tr(t.stateNode.containerInfo),Xe(e,t),Ve(t),Pe=l;break;case 12:Xe(e,t),Ve(t);break;case 13:Xe(e,t),Ve(t),t.child.flags&8192&&t.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(_c=aa()),l&4&&(l=t.updateQueue,l!==null&&(t.updateQueue=null,gc(t,l)));break;case 22:if(l&512&&(Vt||a===null||ze(a,a.return)),p=t.memoizedState!==null,S=a!==null&&a.memoizedState!==null,z=va,B=Vt,va=z||p,Vt=B||S,Xe(e,t),Vt=B,va=z,Ve(t),e=t.stateNode,e._current=t,e._visibility&=-3,e._visibility|=e._pendingVisibility&2,l&8192&&(e._visibility=p?e._visibility&-2:e._visibility|1,p&&(e=va||Vt,a===null||S||e||cl(t)),t.memoizedProps===null||t.memoizedProps.mode!=="manual"))t:for(a=null,e=t;;){if(e.tag===5||e.tag===26||e.tag===27){if(a===null){S=a=e;try{if(o=S.stateNode,p)s=o.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none";else{u=S.stateNode,d=S.memoizedProps.style;var C=d!=null&&d.hasOwnProperty("display")?d.display:null;u.style.display=C==null||typeof C=="boolean"?"":(""+C).trim()}}catch(tt){Dt(S,S.return,tt)}}}else if(e.tag===6){if(a===null){S=e;try{S.stateNode.nodeValue=p?"":S.memoizedProps}catch(tt){Dt(S,S.return,tt)}}}else if((e.tag!==22&&e.tag!==23||e.memoizedState===null||e===t)&&e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break t;for(;e.sibling===null;){if(e.return===null||e.return===t)break t;a===e&&(a=null),e=e.return}a===e&&(a=null),e.sibling.return=e.return,e=e.sibling}l&4&&(l=t.updateQueue,l!==null&&(a=l.retryQueue,a!==null&&(l.retryQueue=null,gc(t,a))));break;case 19:Xe(e,t),Ve(t),l&4&&(l=t.updateQueue,l!==null&&(t.updateQueue=null,gc(t,l)));break;case 21:break;default:Xe(e,t),Ve(t)}}function Ve(t){var e=t.flags;if(e&2){try{if(t.tag!==27){t:{for(var a=t.return;a!==null;){if(zh(a)){var l=a;break t}a=a.return}throw Error(c(160))}switch(l.tag){case 27:var o=l.stateNode,s=hc(t);Uo(t,s,o);break;case 5:var u=l.stateNode;l.flags&32&&($n(u,""),l.flags&=-33);var d=hc(t);Uo(t,d,u);break;case 3:case 4:var p=l.stateNode.containerInfo,S=hc(t);pc(t,S,p);break;default:throw Error(c(161))}}}catch(z){Dt(t,t.return,z)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function Rh(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var e=t;Rh(e),e.tag===5&&e.flags&1024&&e.stateNode.reset(),t=t.sibling}}function xa(t,e){if(e.subtreeFlags&8772)for(e=e.child;e!==null;)jh(t,e.alternate,e),e=e.sibling}function cl(t){for(t=t.child;t!==null;){var e=t;switch(e.tag){case 0:case 11:case 14:case 15:Xa(4,e,e.return),cl(e);break;case 1:ze(e,e.return);var a=e.stateNode;typeof a.componentWillUnmount=="function"&&_h(e,e.return,a),cl(e);break;case 26:case 27:case 5:ze(e,e.return),cl(e);break;case 22:ze(e,e.return),e.memoizedState===null&&cl(e);break;default:cl(e)}t=t.sibling}}function Va(t,e,a){for(a=a&&(e.subtreeFlags&8772)!==0,e=e.child;e!==null;){var l=e.alternate,o=t,s=e,u=s.flags;switch(s.tag){case 0:case 11:case 15:Va(o,s,a),hi(4,s);break;case 1:if(Va(o,s,a),l=s,o=l.stateNode,typeof o.componentDidMount=="function")try{o.componentDidMount()}catch(S){Dt(l,l.return,S)}if(l=s,o=l.updateQueue,o!==null){var d=l.stateNode;try{var p=o.shared.hiddenCallbacks;if(p!==null)for(o.shared.hiddenCallbacks=null,o=0;o<p.length;o++)Sh(p[o],d)}catch(S){Dt(l,l.return,S)}}a&&u&64&&Eh(s),En(s,s.return);break;case 26:case 27:case 5:Va(o,s,a),a&&l===null&&u&4&&Ah(s),En(s,s.return);break;case 12:Va(o,s,a);break;case 13:Va(o,s,a),a&&u&4&&Mh(o,s);break;case 22:s.memoizedState===null&&Va(o,s,a),En(s,s.return);break;default:Va(o,s,a)}e=e.sibling}}function yc(t,e){var a=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),t=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),t!==a&&(t!=null&&t.refCount++,a!=null&&ni(a))}function bc(t,e){t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&ni(t))}function Qa(t,e,a,l){if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Lh(t,e,a,l),e=e.sibling}function Lh(t,e,a,l){var o=e.flags;switch(e.tag){case 0:case 11:case 15:Qa(t,e,a,l),o&2048&&hi(9,e);break;case 3:Qa(t,e,a,l),o&2048&&(t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&ni(t)));break;case 12:if(o&2048){Qa(t,e,a,l),t=e.stateNode;try{var s=e.memoizedProps,u=s.id,d=s.onPostCommit;typeof d=="function"&&d(u,e.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(p){Dt(e,e.return,p)}}else Qa(t,e,a,l);break;case 23:break;case 22:s=e.stateNode,e.memoizedState!==null?s._visibility&4?Qa(t,e,a,l):pi(t,e):s._visibility&4?Qa(t,e,a,l):(s._visibility|=4,ul(t,e,a,l,(e.subtreeFlags&10256)!==0)),o&2048&&yc(e.alternate,e);break;case 24:Qa(t,e,a,l),o&2048&&bc(e.alternate,e);break;default:Qa(t,e,a,l)}}function ul(t,e,a,l,o){for(o=o&&(e.subtreeFlags&10256)!==0,e=e.child;e!==null;){var s=t,u=e,d=a,p=l,S=u.flags;switch(u.tag){case 0:case 11:case 15:ul(s,u,d,p,o),hi(8,u);break;case 23:break;case 22:var z=u.stateNode;u.memoizedState!==null?z._visibility&4?ul(s,u,d,p,o):pi(s,u):(z._visibility|=4,ul(s,u,d,p,o)),o&&S&2048&&yc(u.alternate,u);break;case 24:ul(s,u,d,p,o),o&&S&2048&&bc(u.alternate,u);break;default:ul(s,u,d,p,o)}e=e.sibling}}function pi(t,e){if(e.subtreeFlags&10256)for(e=e.child;e!==null;){var a=t,l=e,o=l.flags;switch(l.tag){case 22:pi(a,l),o&2048&&yc(l.alternate,l);break;case 24:pi(a,l),o&2048&&bc(l.alternate,l);break;default:pi(a,l)}e=e.sibling}}var mi=8192;function fl(t){if(t.subtreeFlags&mi)for(t=t.child;t!==null;)Hh(t),t=t.sibling}function Hh(t){switch(t.tag){case 26:fl(t),t.flags&mi&&t.memoizedState!==null&&z2(Pe,t.memoizedState,t.memoizedProps);break;case 5:fl(t);break;case 3:case 4:var e=Pe;Pe=tr(t.stateNode.containerInfo),fl(t),Pe=e;break;case 22:t.memoizedState===null&&(e=t.alternate,e!==null&&e.memoizedState!==null?(e=mi,mi=16777216,fl(t),mi=e):fl(t));break;default:fl(t)}}function Uh(t){var e=t.alternate;if(e!==null&&(t=e.child,t!==null)){e.child=null;do e=t.sibling,t.sibling=null,t=e;while(t!==null)}}function gi(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var a=0;a<e.length;a++){var l=e[a];ie=l,Yh(l,t)}Uh(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)qh(t),t=t.sibling}function qh(t){switch(t.tag){case 0:case 11:case 15:gi(t),t.flags&2048&&Xa(9,t,t.return);break;case 3:gi(t);break;case 12:gi(t);break;case 22:var e=t.stateNode;t.memoizedState!==null&&e._visibility&4&&(t.return===null||t.return.tag!==13)?(e._visibility&=-5,qo(t)):gi(t);break;default:gi(t)}}function qo(t){var e=t.deletions;if((t.flags&16)!==0){if(e!==null)for(var a=0;a<e.length;a++){var l=e[a];ie=l,Yh(l,t)}Uh(t)}for(t=t.child;t!==null;){switch(e=t,e.tag){case 0:case 11:case 15:Xa(8,e,e.return),qo(e);break;case 22:a=e.stateNode,a._visibility&4&&(a._visibility&=-5,qo(e));break;default:qo(e)}t=t.sibling}}function Yh(t,e){for(;ie!==null;){var a=ie;switch(a.tag){case 0:case 11:case 15:Xa(8,a,e);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var l=a.memoizedState.cachePool.pool;l!=null&&l.refCount++}break;case 24:ni(a.memoizedState.cache)}if(l=a.child,l!==null)l.return=a,ie=l;else t:for(a=t;ie!==null;){l=ie;var o=l.sibling,s=l.return;if(Bh(l),l===a){ie=null;break t}if(o!==null){o.return=s,ie=o;break t}ie=s}}}function Y1(t,e,a,l){this.tag=t,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=l,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Qe(t,e,a,l){return new Y1(t,e,a,l)}function vc(t){return t=t.prototype,!(!t||!t.isReactComponent)}function $a(t,e){var a=t.alternate;return a===null?(a=Qe(t.tag,e,t.key,t.mode),a.elementType=t.elementType,a.type=t.type,a.stateNode=t.stateNode,a.alternate=t,t.alternate=a):(a.pendingProps=e,a.type=t.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=t.flags&31457280,a.childLanes=t.childLanes,a.lanes=t.lanes,a.child=t.child,a.memoizedProps=t.memoizedProps,a.memoizedState=t.memoizedState,a.updateQueue=t.updateQueue,e=t.dependencies,a.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},a.sibling=t.sibling,a.index=t.index,a.ref=t.ref,a.refCleanup=t.refCleanup,a}function Gh(t,e){t.flags&=31457282;var a=t.alternate;return a===null?(t.childLanes=0,t.lanes=e,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=a.childLanes,t.lanes=a.lanes,t.child=a.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=a.memoizedProps,t.memoizedState=a.memoizedState,t.updateQueue=a.updateQueue,t.type=a.type,e=a.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t}function Yo(t,e,a,l,o,s){var u=0;if(l=t,typeof t=="function")vc(t)&&(u=1);else if(typeof t=="string")u=A2(t,a,Ee.current)?26:t==="html"||t==="head"||t==="body"?27:5;else t:switch(t){case y:return _n(a.children,o,s,e);case w:u=8,o|=24;break;case j:return t=Qe(12,a,e,o|2),t.elementType=j,t.lanes=s,t;case Q:return t=Qe(13,a,e,o),t.elementType=Q,t.lanes=s,t;case Z:return t=Qe(19,a,e,o),t.elementType=Z,t.lanes=s,t;case q:return Xh(a,o,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case R:case F:u=10;break t;case M:u=9;break t;case G:u=11;break t;case K:u=14;break t;case k:u=16,l=null;break t}u=29,a=Error(c(130,t===null?"null":typeof t,"")),l=null}return e=Qe(u,a,e,o),e.elementType=t,e.type=l,e.lanes=s,e}function _n(t,e,a,l){return t=Qe(7,t,l,e),t.lanes=a,t}function Xh(t,e,a,l){t=Qe(22,t,l,e),t.elementType=q,t.lanes=a;var o={_visibility:1,_pendingVisibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null,_current:null,detach:function(){var s=o._current;if(s===null)throw Error(c(456));if((o._pendingVisibility&2)===0){var u=Ma(s,2);u!==null&&(o._pendingVisibility|=2,ge(u,s,2))}},attach:function(){var s=o._current;if(s===null)throw Error(c(456));if((o._pendingVisibility&2)!==0){var u=Ma(s,2);u!==null&&(o._pendingVisibility&=-3,ge(u,s,2))}}};return t.stateNode=o,t}function wc(t,e,a){return t=Qe(6,t,null,e),t.lanes=a,t}function xc(t,e,a){return e=Qe(4,t.children!==null?t.children:[],t.key,e),e.lanes=a,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function Sa(t){t.flags|=4}function Vh(t,e){if(e.type!=="stylesheet"||(e.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!zp(e)){if(e=Ge.current,e!==null&&((Et&4194176)===Et?la!==null:(Et&62914560)!==Et&&(Et&536870912)===0||e!==la))throw ti=As,rd;t.flags|=8192}}function Go(t,e){e!==null&&(t.flags|=4),t.flags&16384&&(e=t.tag!==22?sf():536870912,t.lanes|=e,hl|=e)}function yi(t,e){if(!At)switch(t.tailMode){case"hidden":e=t.tail;for(var a=null;e!==null;)e.alternate!==null&&(a=e),e=e.sibling;a===null?t.tail=null:a.sibling=null;break;case"collapsed":a=t.tail;for(var l=null;a!==null;)a.alternate!==null&&(l=a),a=a.sibling;l===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:l.sibling=null}}function qt(t){var e=t.alternate!==null&&t.alternate.child===t.child,a=0,l=0;if(e)for(var o=t.child;o!==null;)a|=o.lanes|o.childLanes,l|=o.subtreeFlags&31457280,l|=o.flags&31457280,o.return=t,o=o.sibling;else for(o=t.child;o!==null;)a|=o.lanes|o.childLanes,l|=o.subtreeFlags,l|=o.flags,o.return=t,o=o.sibling;return t.subtreeFlags|=l,t.childLanes=a,e}function G1(t,e,a){var l=e.pendingProps;switch(Es(e),e.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return qt(e),null;case 1:return qt(e),null;case 3:return a=e.stateNode,l=null,t!==null&&(l=t.memoizedState.cache),e.memoizedState.cache!==l&&(e.flags|=2048),ba(ee),qn(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(t===null||t.child===null)&&(Wl(e)?Sa(e):t===null||t.memoizedState.isDehydrated&&(e.flags&256)===0||(e.flags|=1024,Fe!==null&&(kc(Fe),Fe=null))),qt(e),null;case 26:return a=e.memoizedState,t===null?(Sa(e),a!==null?(qt(e),Vh(e,a)):(qt(e),e.flags&=-16777217)):a?a!==t.memoizedState?(Sa(e),qt(e),Vh(e,a)):(qt(e),e.flags&=-16777217):(t.memoizedProps!==l&&Sa(e),qt(e),e.flags&=-16777217),null;case 27:Ii(e),a=Oa.current;var o=e.type;if(t!==null&&e.stateNode!=null)t.memoizedProps!==l&&Sa(e);else{if(!l){if(e.stateNode===null)throw Error(c(166));return qt(e),null}t=Ee.current,Wl(e)?id(e):(t=wp(o,l,a),e.stateNode=t,Sa(e))}return qt(e),null;case 5:if(Ii(e),a=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==l&&Sa(e);else{if(!l){if(e.stateNode===null)throw Error(c(166));return qt(e),null}if(t=Ee.current,Wl(e))id(e);else{switch(o=Io(Oa.current),t){case 1:t=o.createElementNS("http://www.w3.org/2000/svg",a);break;case 2:t=o.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;default:switch(a){case"svg":t=o.createElementNS("http://www.w3.org/2000/svg",a);break;case"math":t=o.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;case"script":t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild);break;case"select":t=typeof l.is=="string"?o.createElement("select",{is:l.is}):o.createElement("select"),l.multiple?t.multiple=!0:l.size&&(t.size=l.size);break;default:t=typeof l.is=="string"?o.createElement(a,{is:l.is}):o.createElement(a)}}t[fe]=e,t[we]=l;t:for(o=e.child;o!==null;){if(o.tag===5||o.tag===6)t.appendChild(o.stateNode);else if(o.tag!==4&&o.tag!==27&&o.child!==null){o.child.return=o,o=o.child;continue}if(o===e)break t;for(;o.sibling===null;){if(o.return===null||o.return===e)break t;o=o.return}o.sibling.return=o.return,o=o.sibling}e.stateNode=t;t:switch(ue(t,a,l),a){case"button":case"input":case"select":case"textarea":t=!!l.autoFocus;break t;case"img":t=!0;break t;default:t=!1}t&&Sa(e)}}return qt(e),e.flags&=-16777217,null;case 6:if(t&&e.stateNode!=null)t.memoizedProps!==l&&Sa(e);else{if(typeof l!="string"&&e.stateNode===null)throw Error(c(166));if(t=Oa.current,Wl(e)){if(t=e.stateNode,a=e.memoizedProps,l=null,o=me,o!==null)switch(o.tag){case 27:case 5:l=o.memoizedProps}t[fe]=e,t=!!(t.nodeValue===a||l!==null&&l.suppressHydrationWarning===!0||pp(t.nodeValue,a)),t||mn(e)}else t=Io(t).createTextNode(l),t[fe]=e,e.stateNode=t}return qt(e),null;case 13:if(l=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(o=Wl(e),l!==null&&l.dehydrated!==null){if(t===null){if(!o)throw Error(c(318));if(o=e.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(c(317));o[fe]=e}else Fl(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;qt(e),o=!1}else Fe!==null&&(kc(Fe),Fe=null),o=!0;if(!o)return e.flags&256?(pa(e),e):(pa(e),null)}if(pa(e),(e.flags&128)!==0)return e.lanes=a,e;if(a=l!==null,t=t!==null&&t.memoizedState!==null,a){l=e.child,o=null,l.alternate!==null&&l.alternate.memoizedState!==null&&l.alternate.memoizedState.cachePool!==null&&(o=l.alternate.memoizedState.cachePool.pool);var s=null;l.memoizedState!==null&&l.memoizedState.cachePool!==null&&(s=l.memoizedState.cachePool.pool),s!==o&&(l.flags|=2048)}return a!==t&&a&&(e.child.flags|=8192),Go(e,e.updateQueue),qt(e),null;case 4:return qn(),t===null&&qc(e.stateNode.containerInfo),qt(e),null;case 10:return ba(e.type),qt(e),null;case 19:if(St(te),o=e.memoizedState,o===null)return qt(e),null;if(l=(e.flags&128)!==0,s=o.rendering,s===null)if(l)yi(o,!1);else{if(Qt!==0||t!==null&&(t.flags&128)!==0)for(t=e.child;t!==null;){if(s=_o(t),s!==null){for(e.flags|=128,yi(o,!1),t=s.updateQueue,e.updateQueue=t,Go(e,t),e.subtreeFlags=0,t=a,a=e.child;a!==null;)Gh(a,t),a=a.sibling;return dt(te,te.current&1|2),e.child}t=t.sibling}o.tail!==null&&aa()>Xo&&(e.flags|=128,l=!0,yi(o,!1),e.lanes=4194304)}else{if(!l)if(t=_o(s),t!==null){if(e.flags|=128,l=!0,t=t.updateQueue,e.updateQueue=t,Go(e,t),yi(o,!0),o.tail===null&&o.tailMode==="hidden"&&!s.alternate&&!At)return qt(e),null}else 2*aa()-o.renderingStartTime>Xo&&a!==536870912&&(e.flags|=128,l=!0,yi(o,!1),e.lanes=4194304);o.isBackwards?(s.sibling=e.child,e.child=s):(t=o.last,t!==null?t.sibling=s:e.child=s,o.last=s)}return o.tail!==null?(e=o.tail,o.rendering=e,o.tail=e.sibling,o.renderingStartTime=aa(),e.sibling=null,t=te.current,dt(te,l?t&1|2:t&1),e):(qt(e),null);case 22:case 23:return pa(e),zs(),l=e.memoizedState!==null,t!==null?t.memoizedState!==null!==l&&(e.flags|=8192):l&&(e.flags|=8192),l?(a&536870912)!==0&&(e.flags&128)===0&&(qt(e),e.subtreeFlags&6&&(e.flags|=8192)):qt(e),a=e.updateQueue,a!==null&&Go(e,a.retryQueue),a=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),l=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(l=e.memoizedState.cachePool.pool),l!==a&&(e.flags|=2048),t!==null&&St(yn),null;case 24:return a=null,t!==null&&(a=t.memoizedState.cache),e.memoizedState.cache!==a&&(e.flags|=2048),ba(ee),qt(e),null;case 25:return null}throw Error(c(156,e.tag))}function X1(t,e){switch(Es(e),e.tag){case 1:return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return ba(ee),qn(),t=e.flags,(t&65536)!==0&&(t&128)===0?(e.flags=t&-65537|128,e):null;case 26:case 27:case 5:return Ii(e),null;case 13:if(pa(e),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(c(340));Fl()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return St(te),null;case 4:return qn(),null;case 10:return ba(e.type),null;case 22:case 23:return pa(e),zs(),t!==null&&St(yn),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 24:return ba(ee),null;case 25:return null;default:return null}}function Qh(t,e){switch(Es(e),e.tag){case 3:ba(ee),qn();break;case 26:case 27:case 5:Ii(e);break;case 4:qn();break;case 13:pa(e);break;case 19:St(te);break;case 10:ba(e.type);break;case 22:case 23:pa(e),zs(),t!==null&&St(yn);break;case 24:ba(ee)}}var V1={getCacheForType:function(t){var e=de(ee),a=e.data.get(t);return a===void 0&&(a=t(),e.data.set(t,a)),a}},Q1=typeof WeakMap=="function"?WeakMap:Map,Yt=0,Rt=null,xt=null,Et=0,Lt=0,Oe=null,Ta=!1,dl=!1,Sc=!1,Ea=0,Qt=0,Za=0,An=0,Tc=0,$e=0,hl=0,bi=null,oa=null,Ec=!1,_c=0,Xo=1/0,Vo=null,Ka=null,Qo=!1,Cn=null,vi=0,Ac=0,Cc=null,wi=0,zc=null;function je(){if((Yt&2)!==0&&Et!==0)return Et&-Et;if(Y.T!==null){var t=ll;return t!==0?t:Rc()}return df()}function $h(){$e===0&&($e=(Et&536870912)===0||At?rf():536870912);var t=Ge.current;return t!==null&&(t.flags|=32),$e}function ge(t,e,a){(t===Rt&&Lt===2||t.cancelPendingCommit!==null)&&(pl(t,0),_a(t,Et,$e,!1)),Hl(t,a),((Yt&2)===0||t!==Rt)&&(t===Rt&&((Yt&2)===0&&(An|=a),Qt===4&&_a(t,Et,$e,!1)),ra(t))}function Zh(t,e,a){if((Yt&6)!==0)throw Error(c(327));var l=!a&&(e&60)===0&&(e&t.expiredLanes)===0||Ll(t,e),o=l?K1(t,e):Bc(t,e,!0),s=l;do{if(o===0){dl&&!l&&_a(t,e,0,!1);break}else if(o===6)_a(t,e,0,!Ta);else{if(a=t.current.alternate,s&&!$1(a)){o=Bc(t,e,!1),s=!1;continue}if(o===2){if(s=e,t.errorRecoveryDisabledLanes&s)var u=0;else u=t.pendingLanes&-536870913,u=u!==0?u:u&536870912?536870912:0;if(u!==0){e=u;t:{var d=t;o=bi;var p=d.current.memoizedState.isDehydrated;if(p&&(pl(d,u).flags|=256),u=Bc(d,u,!1),u!==2){if(Sc&&!p){d.errorRecoveryDisabledLanes|=s,An|=s,o=4;break t}s=oa,oa=o,s!==null&&kc(s)}o=u}if(s=!1,o!==2)continue}}if(o===1){pl(t,0),_a(t,e,0,!0);break}t:{switch(l=t,o){case 0:case 1:throw Error(c(345));case 4:if((e&4194176)===e){_a(l,e,$e,!Ta);break t}break;case 2:oa=null;break;case 3:case 5:break;default:throw Error(c(329))}if(l.finishedWork=a,l.finishedLanes=e,(e&62914560)===e&&(s=_c+300-aa(),10<s)){if(_a(l,e,$e,!Ta),no(l,0)!==0)break t;l.timeoutHandle=yp(Kh.bind(null,l,a,oa,Vo,Ec,e,$e,An,hl,Ta,2,-0,0),s);break t}Kh(l,a,oa,Vo,Ec,e,$e,An,hl,Ta,0,-0,0)}}break}while(!0);ra(t)}function kc(t){oa===null?oa=t:oa.push.apply(oa,t)}function Kh(t,e,a,l,o,s,u,d,p,S,z,B,_){var C=e.subtreeFlags;if((C&8192||(C&16785408)===16785408)&&(Ai={stylesheets:null,count:0,unsuspend:C2},Hh(e),e=k2(),e!==null)){t.cancelPendingCommit=e(ep.bind(null,t,a,l,o,u,d,p,1,B,_)),_a(t,s,u,!S);return}ep(t,a,l,o,u,d,p,z,B,_)}function $1(t){for(var e=t;;){var a=e.tag;if((a===0||a===11||a===15)&&e.flags&16384&&(a=e.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var l=0;l<a.length;l++){var o=a[l],s=o.getSnapshot;o=o.value;try{if(!Ce(s(),o))return!1}catch{return!1}}if(a=e.child,e.subtreeFlags&16384&&a!==null)a.return=e,e=a;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function _a(t,e,a,l){e&=~Tc,e&=~An,t.suspendedLanes|=e,t.pingedLanes&=~e,l&&(t.warmLanes|=e),l=t.expirationTimes;for(var o=e;0<o;){var s=31-Ae(o),u=1<<s;l[s]=-1,o&=~u}a!==0&&cf(t,a,e)}function $o(){return(Yt&6)===0?(xi(0),!1):!0}function Oc(){if(xt!==null){if(Lt===0)var t=xt.return;else t=xt,ya=Sn=null,Rs(t),al=null,ei=0,t=xt;for(;t!==null;)Qh(t.alternate,t),t=t.return;xt=null}}function pl(t,e){t.finishedWork=null,t.finishedLanes=0;var a=t.timeoutHandle;a!==-1&&(t.timeoutHandle=-1,f2(a)),a=t.cancelPendingCommit,a!==null&&(t.cancelPendingCommit=null,a()),Oc(),Rt=t,xt=a=$a(t.current,null),Et=e,Lt=0,Oe=null,Ta=!1,dl=Ll(t,e),Sc=!1,hl=$e=Tc=An=Za=Qt=0,oa=bi=null,Ec=!1,(e&8)!==0&&(e|=e&32);var l=t.entangledLanes;if(l!==0)for(t=t.entanglements,l&=e;0<l;){var o=31-Ae(l),s=1<<o;e|=t[o],l&=~s}return Ea=e,go(),a}function Jh(t,e){gt=null,Y.H=ia,e===Il?(e=ud(),Lt=3):e===rd?(e=ud(),Lt=4):Lt=e===sh?8:e!==null&&typeof e=="object"&&typeof e.then=="function"?6:1,Oe=e,xt===null&&(Qt=1,Ro(t,Ue(e,t.current)))}function Wh(){var t=Y.H;return Y.H=ia,t===null?ia:t}function Fh(){var t=Y.A;return Y.A=V1,t}function jc(){Qt=4,Ta||(Et&4194176)!==Et&&Ge.current!==null||(dl=!0),(Za&134217727)===0&&(An&134217727)===0||Rt===null||_a(Rt,Et,$e,!1)}function Bc(t,e,a){var l=Yt;Yt|=2;var o=Wh(),s=Fh();(Rt!==t||Et!==e)&&(Vo=null,pl(t,e)),e=!1;var u=Qt;t:do try{if(Lt!==0&&xt!==null){var d=xt,p=Oe;switch(Lt){case 8:Oc(),u=6;break t;case 3:case 2:case 6:Ge.current===null&&(e=!0);var S=Lt;if(Lt=0,Oe=null,ml(t,d,p,S),a&&dl){u=0;break t}break;default:S=Lt,Lt=0,Oe=null,ml(t,d,p,S)}}Z1(),u=Qt;break}catch(z){Jh(t,z)}while(!0);return e&&t.shellSuspendCounter++,ya=Sn=null,Yt=l,Y.H=o,Y.A=s,xt===null&&(Rt=null,Et=0,go()),u}function Z1(){for(;xt!==null;)Ph(xt)}function K1(t,e){var a=Yt;Yt|=2;var l=Wh(),o=Fh();Rt!==t||Et!==e?(Vo=null,Xo=aa()+500,pl(t,e)):dl=Ll(t,e);t:do try{if(Lt!==0&&xt!==null){e=xt;var s=Oe;e:switch(Lt){case 1:Lt=0,Oe=null,ml(t,e,s,1);break;case 2:if(sd(s)){Lt=0,Oe=null,Ih(e);break}e=function(){Lt===2&&Rt===t&&(Lt=7),ra(t)},s.then(e,e);break t;case 3:Lt=7;break t;case 4:Lt=5;break t;case 7:sd(s)?(Lt=0,Oe=null,Ih(e)):(Lt=0,Oe=null,ml(t,e,s,7));break;case 5:var u=null;switch(xt.tag){case 26:u=xt.memoizedState;case 5:case 27:var d=xt;if(!u||zp(u)){Lt=0,Oe=null;var p=d.sibling;if(p!==null)xt=p;else{var S=d.return;S!==null?(xt=S,Zo(S)):xt=null}break e}}Lt=0,Oe=null,ml(t,e,s,5);break;case 6:Lt=0,Oe=null,ml(t,e,s,6);break;case 8:Oc(),Qt=6;break t;default:throw Error(c(462))}}J1();break}catch(z){Jh(t,z)}while(!0);return ya=Sn=null,Y.H=l,Y.A=o,Yt=a,xt!==null?0:(Rt=null,Et=0,go(),Qt)}function J1(){for(;xt!==null&&!yg();)Ph(xt)}function Ph(t){var e=wh(t.alternate,t,Ea);t.memoizedProps=t.pendingProps,e===null?Zo(t):xt=e}function Ih(t){var e=t,a=e.alternate;switch(e.tag){case 15:case 0:e=ph(a,e,e.pendingProps,e.type,void 0,Et);break;case 11:e=ph(a,e,e.pendingProps,e.type.render,e.ref,Et);break;case 5:Rs(e);default:Qh(a,e),e=xt=Gh(e,Ea),e=wh(a,e,Ea)}t.memoizedProps=t.pendingProps,e===null?Zo(t):xt=e}function ml(t,e,a,l){ya=Sn=null,Rs(e),al=null,ei=0;var o=e.return;try{if(L1(t,o,e,a,Et)){Qt=1,Ro(t,Ue(a,t.current)),xt=null;return}}catch(s){if(o!==null)throw xt=o,s;Qt=1,Ro(t,Ue(a,t.current)),xt=null;return}e.flags&32768?(At||l===1?t=!0:dl||(Et&536870912)!==0?t=!1:(Ta=t=!0,(l===2||l===3||l===6)&&(l=Ge.current,l!==null&&l.tag===13&&(l.flags|=16384))),tp(e,t)):Zo(e)}function Zo(t){var e=t;do{if((e.flags&32768)!==0){tp(e,Ta);return}t=e.return;var a=G1(e.alternate,e,Ea);if(a!==null){xt=a;return}if(e=e.sibling,e!==null){xt=e;return}xt=e=t}while(e!==null);Qt===0&&(Qt=5)}function tp(t,e){do{var a=X1(t.alternate,t);if(a!==null){a.flags&=32767,xt=a;return}if(a=t.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!e&&(t=t.sibling,t!==null)){xt=t;return}xt=t=a}while(t!==null);Qt=6,xt=null}function ep(t,e,a,l,o,s,u,d,p,S){var z=Y.T,B=H.p;try{H.p=2,Y.T=null,W1(t,e,a,l,B,o,s,u,d,p,S)}finally{Y.T=z,H.p=B}}function W1(t,e,a,l,o,s,u,d){do gl();while(Cn!==null);if((Yt&6)!==0)throw Error(c(327));var p=t.finishedWork;if(l=t.finishedLanes,p===null)return null;if(t.finishedWork=null,t.finishedLanes=0,p===t.current)throw Error(c(177));t.callbackNode=null,t.callbackPriority=0,t.cancelPendingCommit=null;var S=p.lanes|p.childLanes;if(S|=xs,zg(t,l,S,s,u,d),t===Rt&&(xt=Rt=null,Et=0),(p.subtreeFlags&10256)===0&&(p.flags&10256)===0||Qo||(Qo=!0,Ac=S,Cc=a,t2(to,function(){return gl(),null})),a=(p.flags&15990)!==0,(p.subtreeFlags&15990)!==0||a?(a=Y.T,Y.T=null,s=H.p,H.p=2,u=Yt,Yt|=4,U1(t,p),Dh(p,t),w1(Vc,t.containerInfo),ir=!!Xc,Vc=Xc=null,t.current=p,jh(t,p.alternate,p),bg(),Yt=u,H.p=s,Y.T=a):t.current=p,Qo?(Qo=!1,Cn=t,vi=l):ap(t,S),S=t.pendingLanes,S===0&&(Ka=null),Tg(p.stateNode),ra(t),e!==null)for(o=t.onRecoverableError,p=0;p<e.length;p++)S=e[p],o(S.value,{componentStack:S.stack});return(vi&3)!==0&&gl(),S=t.pendingLanes,(l&4194218)!==0&&(S&42)!==0?t===zc?wi++:(wi=0,zc=t):wi=0,xi(0),null}function ap(t,e){(t.pooledCacheLanes&=e)===0&&(e=t.pooledCache,e!=null&&(t.pooledCache=null,ni(e)))}function gl(){if(Cn!==null){var t=Cn,e=Ac;Ac=0;var a=ff(vi),l=Y.T,o=H.p;try{if(H.p=32>a?32:a,Y.T=null,Cn===null)var s=!1;else{a=Cc,Cc=null;var u=Cn,d=vi;if(Cn=null,vi=0,(Yt&6)!==0)throw Error(c(331));var p=Yt;if(Yt|=4,qh(u.current),Lh(u,u.current,d,a),Yt=p,xi(0,!1),_e&&typeof _e.onPostCommitFiberRoot=="function")try{_e.onPostCommitFiberRoot(Rl,u)}catch{}s=!0}return s}finally{H.p=o,Y.T=l,ap(t,e)}}return!1}function np(t,e,a){e=Ue(a,e),e=Ws(t.stateNode,e,2),t=Ga(t,e,2),t!==null&&(Hl(t,2),ra(t))}function Dt(t,e,a){if(t.tag===3)np(t,t,a);else for(;e!==null;){if(e.tag===3){np(e,t,a);break}else if(e.tag===1){var l=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof l.componentDidCatch=="function"&&(Ka===null||!Ka.has(l))){t=Ue(a,t),a=oh(2),l=Ga(e,a,2),l!==null&&(rh(a,l,e,t),Hl(l,2),ra(l));break}}e=e.return}}function Nc(t,e,a){var l=t.pingCache;if(l===null){l=t.pingCache=new Q1;var o=new Set;l.set(e,o)}else o=l.get(e),o===void 0&&(o=new Set,l.set(e,o));o.has(a)||(Sc=!0,o.add(a),t=F1.bind(null,t,e,a),e.then(t,t))}function F1(t,e,a){var l=t.pingCache;l!==null&&l.delete(e),t.pingedLanes|=t.suspendedLanes&a,t.warmLanes&=~a,Rt===t&&(Et&a)===a&&(Qt===4||Qt===3&&(Et&62914560)===Et&&300>aa()-_c?(Yt&2)===0&&pl(t,0):Tc|=a,hl===Et&&(hl=0)),ra(t)}function lp(t,e){e===0&&(e=sf()),t=Ma(t,e),t!==null&&(Hl(t,e),ra(t))}function P1(t){var e=t.memoizedState,a=0;e!==null&&(a=e.retryLane),lp(t,a)}function I1(t,e){var a=0;switch(t.tag){case 13:var l=t.stateNode,o=t.memoizedState;o!==null&&(a=o.retryLane);break;case 19:l=t.stateNode;break;case 22:l=t.stateNode._retryCache;break;default:throw Error(c(314))}l!==null&&l.delete(e),lp(t,a)}function t2(t,e){return Fr(t,e)}var Ko=null,yl=null,Mc=!1,Jo=!1,Dc=!1,zn=0;function ra(t){t!==yl&&t.next===null&&(yl===null?Ko=yl=t:yl=yl.next=t),Jo=!0,Mc||(Mc=!0,a2(e2))}function xi(t,e){if(!Dc&&Jo){Dc=!0;do for(var a=!1,l=Ko;l!==null;){if(t!==0){var o=l.pendingLanes;if(o===0)var s=0;else{var u=l.suspendedLanes,d=l.pingedLanes;s=(1<<31-Ae(42|t)+1)-1,s&=o&~(u&~d),s=s&201326677?s&201326677|1:s?s|2:0}s!==0&&(a=!0,rp(l,s))}else s=Et,s=no(l,l===Rt?s:0),(s&3)===0||Ll(l,s)||(a=!0,rp(l,s));l=l.next}while(a);Dc=!1}}function e2(){Jo=Mc=!1;var t=0;zn!==0&&(u2()&&(t=zn),zn=0);for(var e=aa(),a=null,l=Ko;l!==null;){var o=l.next,s=ip(l,e);s===0?(l.next=null,a===null?Ko=o:a.next=o,o===null&&(yl=a)):(a=l,(t!==0||(s&3)!==0)&&(Jo=!0)),l=o}xi(t)}function ip(t,e){for(var a=t.suspendedLanes,l=t.pingedLanes,o=t.expirationTimes,s=t.pendingLanes&-62914561;0<s;){var u=31-Ae(s),d=1<<u,p=o[u];p===-1?((d&a)===0||(d&l)!==0)&&(o[u]=Cg(d,e)):p<=e&&(t.expiredLanes|=d),s&=~d}if(e=Rt,a=Et,a=no(t,t===e?a:0),l=t.callbackNode,a===0||t===e&&Lt===2||t.cancelPendingCommit!==null)return l!==null&&l!==null&&Pr(l),t.callbackNode=null,t.callbackPriority=0;if((a&3)===0||Ll(t,a)){if(e=a&-a,e===t.callbackPriority)return e;switch(l!==null&&Pr(l),ff(a)){case 2:case 8:a=lf;break;case 32:a=to;break;case 268435456:a=of;break;default:a=to}return l=op.bind(null,t),a=Fr(a,l),t.callbackPriority=e,t.callbackNode=a,e}return l!==null&&l!==null&&Pr(l),t.callbackPriority=2,t.callbackNode=null,2}function op(t,e){var a=t.callbackNode;if(gl()&&t.callbackNode!==a)return null;var l=Et;return l=no(t,t===Rt?l:0),l===0?null:(Zh(t,l,e),ip(t,aa()),t.callbackNode!=null&&t.callbackNode===a?op.bind(null,t):null)}function rp(t,e){if(gl())return null;Zh(t,e,!0)}function a2(t){d2(function(){(Yt&6)!==0?Fr(nf,t):t()})}function Rc(){return zn===0&&(zn=rf()),zn}function sp(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:so(""+t)}function cp(t,e){var a=e.ownerDocument.createElement("input");return a.name=e.name,a.value=e.value,t.id&&a.setAttribute("form",t.id),e.parentNode.insertBefore(a,e),t=new FormData(t),a.parentNode.removeChild(a),t}function n2(t,e,a,l,o){if(e==="submit"&&a&&a.stateNode===o){var s=sp((o[we]||null).action),u=l.submitter;u&&(e=(e=u[we]||null)?sp(e.formAction):u.getAttribute("formAction"),e!==null&&(s=e,u=null));var d=new ho("action","action",null,l,o);t.push({event:d,listeners:[{instance:null,listener:function(){if(l.defaultPrevented){if(zn!==0){var p=u?cp(o,u):new FormData(o);Qs(a,{pending:!0,data:p,method:o.method,action:s},null,p)}}else typeof s=="function"&&(d.preventDefault(),p=u?cp(o,u):new FormData(o),Qs(a,{pending:!0,data:p,method:o.method,action:s},s,p))},currentTarget:o}]})}}for(var Lc=0;Lc<ed.length;Lc++){var Hc=ed[Lc],l2=Hc.toLowerCase(),i2=Hc[0].toUpperCase()+Hc.slice(1);We(l2,"on"+i2)}We(Wf,"onAnimationEnd"),We(Ff,"onAnimationIteration"),We(Pf,"onAnimationStart"),We("dblclick","onDoubleClick"),We("focusin","onFocus"),We("focusout","onBlur"),We(S1,"onTransitionRun"),We(T1,"onTransitionStart"),We(E1,"onTransitionCancel"),We(If,"onTransitionEnd"),Vn("onMouseEnter",["mouseout","mouseover"]),Vn("onMouseLeave",["mouseout","mouseover"]),Vn("onPointerEnter",["pointerout","pointerover"]),Vn("onPointerLeave",["pointerout","pointerover"]),cn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),cn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),cn("onBeforeInput",["compositionend","keypress","textInput","paste"]),cn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),cn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),cn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Si="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),o2=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Si));function up(t,e){e=(e&4)!==0;for(var a=0;a<t.length;a++){var l=t[a],o=l.event;l=l.listeners;t:{var s=void 0;if(e)for(var u=l.length-1;0<=u;u--){var d=l[u],p=d.instance,S=d.currentTarget;if(d=d.listener,p!==s&&o.isPropagationStopped())break t;s=d,o.currentTarget=S;try{s(o)}catch(z){Do(z)}o.currentTarget=null,s=p}else for(u=0;u<l.length;u++){if(d=l[u],p=d.instance,S=d.currentTarget,d=d.listener,p!==s&&o.isPropagationStopped())break t;s=d,o.currentTarget=S;try{s(o)}catch(z){Do(z)}o.currentTarget=null,s=p}}}}function Tt(t,e){var a=e[ts];a===void 0&&(a=e[ts]=new Set);var l=t+"__bubble";a.has(l)||(fp(e,t,2,!1),a.add(l))}function Uc(t,e,a){var l=0;e&&(l|=4),fp(a,t,l,e)}var Wo="_reactListening"+Math.random().toString(36).slice(2);function qc(t){if(!t[Wo]){t[Wo]=!0,pf.forEach(function(a){a!=="selectionchange"&&(o2.has(a)||Uc(a,!1,t),Uc(a,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Wo]||(e[Wo]=!0,Uc("selectionchange",!1,e))}}function fp(t,e,a,l){switch(Mp(e)){case 2:var o=B2;break;case 8:o=N2;break;default:o=Ic}a=o.bind(null,e,a,t),o=void 0,!ss||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(o=!0),l?o!==void 0?t.addEventListener(e,a,{capture:!0,passive:o}):t.addEventListener(e,a,!0):o!==void 0?t.addEventListener(e,a,{passive:o}):t.addEventListener(e,a,!1)}function Yc(t,e,a,l,o){var s=l;if((e&1)===0&&(e&2)===0&&l!==null)t:for(;;){if(l===null)return;var u=l.tag;if(u===3||u===4){var d=l.stateNode.containerInfo;if(d===o||d.nodeType===8&&d.parentNode===o)break;if(u===4)for(u=l.return;u!==null;){var p=u.tag;if((p===3||p===4)&&(p=u.stateNode.containerInfo,p===o||p.nodeType===8&&p.parentNode===o))return;u=u.return}for(;d!==null;){if(u=sn(d),u===null)return;if(p=u.tag,p===5||p===6||p===26||p===27){l=s=u;continue t}d=d.parentNode}}l=l.return}Af(function(){var S=s,z=os(a),B=[];t:{var _=td.get(t);if(_!==void 0){var C=ho,tt=t;switch(t){case"keypress":if(uo(a)===0)break t;case"keydown":case"keyup":C=Ig;break;case"focusin":tt="focus",C=ds;break;case"focusout":tt="blur",C=ds;break;case"beforeblur":case"afterblur":C=ds;break;case"click":if(a.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":C=kf;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":C=Yg;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":C=a1;break;case Wf:case Ff:case Pf:C=Vg;break;case If:C=l1;break;case"scroll":case"scrollend":C=Ug;break;case"wheel":C=o1;break;case"copy":case"cut":case"paste":C=$g;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":C=jf;break;case"toggle":case"beforetoggle":C=s1}var ft=(e&4)!==0,$t=!ft&&(t==="scroll"||t==="scrollend"),T=ft?_!==null?_+"Capture":null:_;ft=[];for(var x=S,E;x!==null;){var O=x;if(E=O.stateNode,O=O.tag,O!==5&&O!==26&&O!==27||E===null||T===null||(O=Yl(x,T),O!=null&&ft.push(Ti(x,O,E))),$t)break;x=x.return}0<ft.length&&(_=new C(_,tt,null,a,z),B.push({event:_,listeners:ft}))}}if((e&7)===0){t:{if(_=t==="mouseover"||t==="pointerover",C=t==="mouseout"||t==="pointerout",_&&a!==is&&(tt=a.relatedTarget||a.fromElement)&&(sn(tt)||tt[Yn]))break t;if((C||_)&&(_=z.window===z?z:(_=z.ownerDocument)?_.defaultView||_.parentWindow:window,C?(tt=a.relatedTarget||a.toElement,C=S,tt=tt?sn(tt):null,tt!==null&&($t=I(tt),ft=tt.tag,tt!==$t||ft!==5&&ft!==27&&ft!==6)&&(tt=null)):(C=null,tt=S),C!==tt)){if(ft=kf,O="onMouseLeave",T="onMouseEnter",x="mouse",(t==="pointerout"||t==="pointerover")&&(ft=jf,O="onPointerLeave",T="onPointerEnter",x="pointer"),$t=C==null?_:ql(C),E=tt==null?_:ql(tt),_=new ft(O,x+"leave",C,a,z),_.target=$t,_.relatedTarget=E,O=null,sn(z)===S&&(ft=new ft(T,x+"enter",tt,a,z),ft.target=E,ft.relatedTarget=$t,O=ft),$t=O,C&&tt)e:{for(ft=C,T=tt,x=0,E=ft;E;E=bl(E))x++;for(E=0,O=T;O;O=bl(O))E++;for(;0<x-E;)ft=bl(ft),x--;for(;0<E-x;)T=bl(T),E--;for(;x--;){if(ft===T||T!==null&&ft===T.alternate)break e;ft=bl(ft),T=bl(T)}ft=null}else ft=null;C!==null&&dp(B,_,C,ft,!1),tt!==null&&$t!==null&&dp(B,$t,tt,ft,!0)}}t:{if(_=S?ql(S):window,C=_.nodeName&&_.nodeName.toLowerCase(),C==="select"||C==="input"&&_.type==="file")var $=Uf;else if(Lf(_))if(qf)$=b1;else{$=g1;var vt=m1}else C=_.nodeName,!C||C.toLowerCase()!=="input"||_.type!=="checkbox"&&_.type!=="radio"?S&&ls(S.elementType)&&($=Uf):$=y1;if($&&($=$(t,S))){Hf(B,$,a,z);break t}vt&&vt(t,_,S),t==="focusout"&&S&&_.type==="number"&&S.memoizedProps.value!=null&&ns(_,"number",_.value)}switch(vt=S?ql(S):window,t){case"focusin":(Lf(vt)||vt.contentEditable==="true")&&(Wn=vt,bs=S,Jl=null);break;case"focusout":Jl=bs=Wn=null;break;case"mousedown":vs=!0;break;case"contextmenu":case"mouseup":case"dragend":vs=!1,Kf(B,a,z);break;case"selectionchange":if(x1)break;case"keydown":case"keyup":Kf(B,a,z)}var nt;if(ps)t:{switch(t){case"compositionstart":var rt="onCompositionStart";break t;case"compositionend":rt="onCompositionEnd";break t;case"compositionupdate":rt="onCompositionUpdate";break t}rt=void 0}else Jn?Df(t,a)&&(rt="onCompositionEnd"):t==="keydown"&&a.keyCode===229&&(rt="onCompositionStart");rt&&(Bf&&a.locale!=="ko"&&(Jn||rt!=="onCompositionStart"?rt==="onCompositionEnd"&&Jn&&(nt=Cf()):(Na=z,cs="value"in Na?Na.value:Na.textContent,Jn=!0)),vt=Fo(S,rt),0<vt.length&&(rt=new Of(rt,t,null,a,z),B.push({event:rt,listeners:vt}),nt?rt.data=nt:(nt=Rf(a),nt!==null&&(rt.data=nt)))),(nt=u1?f1(t,a):d1(t,a))&&(rt=Fo(S,"onBeforeInput"),0<rt.length&&(vt=new Of("onBeforeInput","beforeinput",null,a,z),B.push({event:vt,listeners:rt}),vt.data=nt)),n2(B,t,S,a,z)}up(B,e)})}function Ti(t,e,a){return{instance:t,listener:e,currentTarget:a}}function Fo(t,e){for(var a=e+"Capture",l=[];t!==null;){var o=t,s=o.stateNode;o=o.tag,o!==5&&o!==26&&o!==27||s===null||(o=Yl(t,a),o!=null&&l.unshift(Ti(t,o,s)),o=Yl(t,e),o!=null&&l.push(Ti(t,o,s))),t=t.return}return l}function bl(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function dp(t,e,a,l,o){for(var s=e._reactName,u=[];a!==null&&a!==l;){var d=a,p=d.alternate,S=d.stateNode;if(d=d.tag,p!==null&&p===l)break;d!==5&&d!==26&&d!==27||S===null||(p=S,o?(S=Yl(a,s),S!=null&&u.unshift(Ti(a,S,p))):o||(S=Yl(a,s),S!=null&&u.push(Ti(a,S,p)))),a=a.return}u.length!==0&&t.push({event:e,listeners:u})}var r2=/\r\n?/g,s2=/\u0000|\uFFFD/g;function hp(t){return(typeof t=="string"?t:""+t).replace(r2,`
`).replace(s2,"")}function pp(t,e){return e=hp(e),hp(t)===e}function Po(){}function Mt(t,e,a,l,o,s){switch(a){case"children":typeof l=="string"?e==="body"||e==="textarea"&&l===""||$n(t,l):(typeof l=="number"||typeof l=="bigint")&&e!=="body"&&$n(t,""+l);break;case"className":io(t,"class",l);break;case"tabIndex":io(t,"tabindex",l);break;case"dir":case"role":case"viewBox":case"width":case"height":io(t,a,l);break;case"style":Ef(t,l,s);break;case"data":if(e!=="object"){io(t,"data",l);break}case"src":case"href":if(l===""&&(e!=="a"||a!=="href")){t.removeAttribute(a);break}if(l==null||typeof l=="function"||typeof l=="symbol"||typeof l=="boolean"){t.removeAttribute(a);break}l=so(""+l),t.setAttribute(a,l);break;case"action":case"formAction":if(typeof l=="function"){t.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof s=="function"&&(a==="formAction"?(e!=="input"&&Mt(t,e,"name",o.name,o,null),Mt(t,e,"formEncType",o.formEncType,o,null),Mt(t,e,"formMethod",o.formMethod,o,null),Mt(t,e,"formTarget",o.formTarget,o,null)):(Mt(t,e,"encType",o.encType,o,null),Mt(t,e,"method",o.method,o,null),Mt(t,e,"target",o.target,o,null)));if(l==null||typeof l=="symbol"||typeof l=="boolean"){t.removeAttribute(a);break}l=so(""+l),t.setAttribute(a,l);break;case"onClick":l!=null&&(t.onclick=Po);break;case"onScroll":l!=null&&Tt("scroll",t);break;case"onScrollEnd":l!=null&&Tt("scrollend",t);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(c(61));if(a=l.__html,a!=null){if(o.children!=null)throw Error(c(60));t.innerHTML=a}}break;case"multiple":t.multiple=l&&typeof l!="function"&&typeof l!="symbol";break;case"muted":t.muted=l&&typeof l!="function"&&typeof l!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(l==null||typeof l=="function"||typeof l=="boolean"||typeof l=="symbol"){t.removeAttribute("xlink:href");break}a=so(""+l),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":l!=null&&typeof l!="function"&&typeof l!="symbol"?t.setAttribute(a,""+l):t.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":l&&typeof l!="function"&&typeof l!="symbol"?t.setAttribute(a,""):t.removeAttribute(a);break;case"capture":case"download":l===!0?t.setAttribute(a,""):l!==!1&&l!=null&&typeof l!="function"&&typeof l!="symbol"?t.setAttribute(a,l):t.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":l!=null&&typeof l!="function"&&typeof l!="symbol"&&!isNaN(l)&&1<=l?t.setAttribute(a,l):t.removeAttribute(a);break;case"rowSpan":case"start":l==null||typeof l=="function"||typeof l=="symbol"||isNaN(l)?t.removeAttribute(a):t.setAttribute(a,l);break;case"popover":Tt("beforetoggle",t),Tt("toggle",t),lo(t,"popover",l);break;case"xlinkActuate":fa(t,"http://www.w3.org/1999/xlink","xlink:actuate",l);break;case"xlinkArcrole":fa(t,"http://www.w3.org/1999/xlink","xlink:arcrole",l);break;case"xlinkRole":fa(t,"http://www.w3.org/1999/xlink","xlink:role",l);break;case"xlinkShow":fa(t,"http://www.w3.org/1999/xlink","xlink:show",l);break;case"xlinkTitle":fa(t,"http://www.w3.org/1999/xlink","xlink:title",l);break;case"xlinkType":fa(t,"http://www.w3.org/1999/xlink","xlink:type",l);break;case"xmlBase":fa(t,"http://www.w3.org/XML/1998/namespace","xml:base",l);break;case"xmlLang":fa(t,"http://www.w3.org/XML/1998/namespace","xml:lang",l);break;case"xmlSpace":fa(t,"http://www.w3.org/XML/1998/namespace","xml:space",l);break;case"is":lo(t,"is",l);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=Lg.get(a)||a,lo(t,a,l))}}function Gc(t,e,a,l,o,s){switch(a){case"style":Ef(t,l,s);break;case"dangerouslySetInnerHTML":if(l!=null){if(typeof l!="object"||!("__html"in l))throw Error(c(61));if(a=l.__html,a!=null){if(o.children!=null)throw Error(c(60));t.innerHTML=a}}break;case"children":typeof l=="string"?$n(t,l):(typeof l=="number"||typeof l=="bigint")&&$n(t,""+l);break;case"onScroll":l!=null&&Tt("scroll",t);break;case"onScrollEnd":l!=null&&Tt("scrollend",t);break;case"onClick":l!=null&&(t.onclick=Po);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!mf.hasOwnProperty(a))t:{if(a[0]==="o"&&a[1]==="n"&&(o=a.endsWith("Capture"),e=a.slice(2,o?a.length-7:void 0),s=t[we]||null,s=s!=null?s[a]:null,typeof s=="function"&&t.removeEventListener(e,s,o),typeof l=="function")){typeof s!="function"&&s!==null&&(a in t?t[a]=null:t.hasAttribute(a)&&t.removeAttribute(a)),t.addEventListener(e,l,o);break t}a in t?t[a]=l:l===!0?t.setAttribute(a,""):lo(t,a,l)}}}function ue(t,e,a){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Tt("error",t),Tt("load",t);var l=!1,o=!1,s;for(s in a)if(a.hasOwnProperty(s)){var u=a[s];if(u!=null)switch(s){case"src":l=!0;break;case"srcSet":o=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(c(137,e));default:Mt(t,e,s,u,a,null)}}o&&Mt(t,e,"srcSet",a.srcSet,a,null),l&&Mt(t,e,"src",a.src,a,null);return;case"input":Tt("invalid",t);var d=s=u=o=null,p=null,S=null;for(l in a)if(a.hasOwnProperty(l)){var z=a[l];if(z!=null)switch(l){case"name":o=z;break;case"type":u=z;break;case"checked":p=z;break;case"defaultChecked":S=z;break;case"value":s=z;break;case"defaultValue":d=z;break;case"children":case"dangerouslySetInnerHTML":if(z!=null)throw Error(c(137,e));break;default:Mt(t,e,l,z,a,null)}}wf(t,s,d,p,S,u,o,!1),oo(t);return;case"select":Tt("invalid",t),l=u=s=null;for(o in a)if(a.hasOwnProperty(o)&&(d=a[o],d!=null))switch(o){case"value":s=d;break;case"defaultValue":u=d;break;case"multiple":l=d;default:Mt(t,e,o,d,a,null)}e=s,a=u,t.multiple=!!l,e!=null?Qn(t,!!l,e,!1):a!=null&&Qn(t,!!l,a,!0);return;case"textarea":Tt("invalid",t),s=o=l=null;for(u in a)if(a.hasOwnProperty(u)&&(d=a[u],d!=null))switch(u){case"value":l=d;break;case"defaultValue":o=d;break;case"children":s=d;break;case"dangerouslySetInnerHTML":if(d!=null)throw Error(c(91));break;default:Mt(t,e,u,d,a,null)}Sf(t,l,o,s),oo(t);return;case"option":for(p in a)if(a.hasOwnProperty(p)&&(l=a[p],l!=null))switch(p){case"selected":t.selected=l&&typeof l!="function"&&typeof l!="symbol";break;default:Mt(t,e,p,l,a,null)}return;case"dialog":Tt("cancel",t),Tt("close",t);break;case"iframe":case"object":Tt("load",t);break;case"video":case"audio":for(l=0;l<Si.length;l++)Tt(Si[l],t);break;case"image":Tt("error",t),Tt("load",t);break;case"details":Tt("toggle",t);break;case"embed":case"source":case"link":Tt("error",t),Tt("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(S in a)if(a.hasOwnProperty(S)&&(l=a[S],l!=null))switch(S){case"children":case"dangerouslySetInnerHTML":throw Error(c(137,e));default:Mt(t,e,S,l,a,null)}return;default:if(ls(e)){for(z in a)a.hasOwnProperty(z)&&(l=a[z],l!==void 0&&Gc(t,e,z,l,a,void 0));return}}for(d in a)a.hasOwnProperty(d)&&(l=a[d],l!=null&&Mt(t,e,d,l,a,null))}function c2(t,e,a,l){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var o=null,s=null,u=null,d=null,p=null,S=null,z=null;for(C in a){var B=a[C];if(a.hasOwnProperty(C)&&B!=null)switch(C){case"checked":break;case"value":break;case"defaultValue":p=B;default:l.hasOwnProperty(C)||Mt(t,e,C,null,l,B)}}for(var _ in l){var C=l[_];if(B=a[_],l.hasOwnProperty(_)&&(C!=null||B!=null))switch(_){case"type":s=C;break;case"name":o=C;break;case"checked":S=C;break;case"defaultChecked":z=C;break;case"value":u=C;break;case"defaultValue":d=C;break;case"children":case"dangerouslySetInnerHTML":if(C!=null)throw Error(c(137,e));break;default:C!==B&&Mt(t,e,_,C,l,B)}}as(t,u,d,p,S,z,s,o);return;case"select":C=u=d=_=null;for(s in a)if(p=a[s],a.hasOwnProperty(s)&&p!=null)switch(s){case"value":break;case"multiple":C=p;default:l.hasOwnProperty(s)||Mt(t,e,s,null,l,p)}for(o in l)if(s=l[o],p=a[o],l.hasOwnProperty(o)&&(s!=null||p!=null))switch(o){case"value":_=s;break;case"defaultValue":d=s;break;case"multiple":u=s;default:s!==p&&Mt(t,e,o,s,l,p)}e=d,a=u,l=C,_!=null?Qn(t,!!a,_,!1):!!l!=!!a&&(e!=null?Qn(t,!!a,e,!0):Qn(t,!!a,a?[]:"",!1));return;case"textarea":C=_=null;for(d in a)if(o=a[d],a.hasOwnProperty(d)&&o!=null&&!l.hasOwnProperty(d))switch(d){case"value":break;case"children":break;default:Mt(t,e,d,null,l,o)}for(u in l)if(o=l[u],s=a[u],l.hasOwnProperty(u)&&(o!=null||s!=null))switch(u){case"value":_=o;break;case"defaultValue":C=o;break;case"children":break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(c(91));break;default:o!==s&&Mt(t,e,u,o,l,s)}xf(t,_,C);return;case"option":for(var tt in a)if(_=a[tt],a.hasOwnProperty(tt)&&_!=null&&!l.hasOwnProperty(tt))switch(tt){case"selected":t.selected=!1;break;default:Mt(t,e,tt,null,l,_)}for(p in l)if(_=l[p],C=a[p],l.hasOwnProperty(p)&&_!==C&&(_!=null||C!=null))switch(p){case"selected":t.selected=_&&typeof _!="function"&&typeof _!="symbol";break;default:Mt(t,e,p,_,l,C)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var ft in a)_=a[ft],a.hasOwnProperty(ft)&&_!=null&&!l.hasOwnProperty(ft)&&Mt(t,e,ft,null,l,_);for(S in l)if(_=l[S],C=a[S],l.hasOwnProperty(S)&&_!==C&&(_!=null||C!=null))switch(S){case"children":case"dangerouslySetInnerHTML":if(_!=null)throw Error(c(137,e));break;default:Mt(t,e,S,_,l,C)}return;default:if(ls(e)){for(var $t in a)_=a[$t],a.hasOwnProperty($t)&&_!==void 0&&!l.hasOwnProperty($t)&&Gc(t,e,$t,void 0,l,_);for(z in l)_=l[z],C=a[z],!l.hasOwnProperty(z)||_===C||_===void 0&&C===void 0||Gc(t,e,z,_,l,C);return}}for(var T in a)_=a[T],a.hasOwnProperty(T)&&_!=null&&!l.hasOwnProperty(T)&&Mt(t,e,T,null,l,_);for(B in l)_=l[B],C=a[B],!l.hasOwnProperty(B)||_===C||_==null&&C==null||Mt(t,e,B,_,l,C)}var Xc=null,Vc=null;function Io(t){return t.nodeType===9?t:t.ownerDocument}function mp(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function gp(t,e){if(t===0)switch(e){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&e==="foreignObject"?0:t}function Qc(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.children=="bigint"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var $c=null;function u2(){var t=window.event;return t&&t.type==="popstate"?t===$c?!1:($c=t,!0):($c=null,!1)}var yp=typeof setTimeout=="function"?setTimeout:void 0,f2=typeof clearTimeout=="function"?clearTimeout:void 0,bp=typeof Promise=="function"?Promise:void 0,d2=typeof queueMicrotask=="function"?queueMicrotask:typeof bp<"u"?function(t){return bp.resolve(null).then(t).catch(h2)}:yp;function h2(t){setTimeout(function(){throw t})}function Zc(t,e){var a=e,l=0;do{var o=a.nextSibling;if(t.removeChild(a),o&&o.nodeType===8)if(a=o.data,a==="/$"){if(l===0){t.removeChild(o),ji(e);return}l--}else a!=="$"&&a!=="$?"&&a!=="$!"||l++;a=o}while(a);ji(e)}function Kc(t){var e=t.firstChild;for(e&&e.nodeType===10&&(e=e.nextSibling);e;){var a=e;switch(e=e.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":Kc(a),es(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}t.removeChild(a)}}function p2(t,e,a,l){for(;t.nodeType===1;){var o=a;if(t.nodeName.toLowerCase()!==e.toLowerCase()){if(!l&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(l){if(!t[Ul])switch(e){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(s=t.getAttribute("rel"),s==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(s!==o.rel||t.getAttribute("href")!==(o.href==null?null:o.href)||t.getAttribute("crossorigin")!==(o.crossOrigin==null?null:o.crossOrigin)||t.getAttribute("title")!==(o.title==null?null:o.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(s=t.getAttribute("src"),(s!==(o.src==null?null:o.src)||t.getAttribute("type")!==(o.type==null?null:o.type)||t.getAttribute("crossorigin")!==(o.crossOrigin==null?null:o.crossOrigin))&&s&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(e==="input"&&t.type==="hidden"){var s=o.name==null?null:""+o.name;if(o.type==="hidden"&&t.getAttribute("name")===s)return t}else return t;if(t=Ie(t.nextSibling),t===null)break}return null}function m2(t,e,a){if(e==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!a||(t=Ie(t.nextSibling),t===null))return null;return t}function Ie(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?"||e==="F!"||e==="F")break;if(e==="/$")return null}}return t}function vp(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var a=t.data;if(a==="$"||a==="$!"||a==="$?"){if(e===0)return t;e--}else a==="/$"&&e++}t=t.previousSibling}return null}function wp(t,e,a){switch(e=Io(a),t){case"html":if(t=e.documentElement,!t)throw Error(c(452));return t;case"head":if(t=e.head,!t)throw Error(c(453));return t;case"body":if(t=e.body,!t)throw Error(c(454));return t;default:throw Error(c(451))}}var Ze=new Map,xp=new Set;function tr(t){return typeof t.getRootNode=="function"?t.getRootNode():t.ownerDocument}var Aa=H.d;H.d={f:g2,r:y2,D:b2,C:v2,L:w2,m:x2,X:T2,S:S2,M:E2};function g2(){var t=Aa.f(),e=$o();return t||e}function y2(t){var e=Gn(t);e!==null&&e.tag===5&&e.type==="form"?Kd(e):Aa.r(t)}var vl=typeof document>"u"?null:document;function Sp(t,e,a){var l=vl;if(l&&typeof e=="string"&&e){var o=Le(e);o='link[rel="'+t+'"][href="'+o+'"]',typeof a=="string"&&(o+='[crossorigin="'+a+'"]'),xp.has(o)||(xp.add(o),t={rel:t,crossOrigin:a,href:e},l.querySelector(o)===null&&(e=l.createElement("link"),ue(e,"link",t),ne(e),l.head.appendChild(e)))}}function b2(t){Aa.D(t),Sp("dns-prefetch",t,null)}function v2(t,e){Aa.C(t,e),Sp("preconnect",t,e)}function w2(t,e,a){Aa.L(t,e,a);var l=vl;if(l&&t&&e){var o='link[rel="preload"][as="'+Le(e)+'"]';e==="image"&&a&&a.imageSrcSet?(o+='[imagesrcset="'+Le(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(o+='[imagesizes="'+Le(a.imageSizes)+'"]')):o+='[href="'+Le(t)+'"]';var s=o;switch(e){case"style":s=wl(t);break;case"script":s=xl(t)}Ze.has(s)||(t=W({rel:"preload",href:e==="image"&&a&&a.imageSrcSet?void 0:t,as:e},a),Ze.set(s,t),l.querySelector(o)!==null||e==="style"&&l.querySelector(Ei(s))||e==="script"&&l.querySelector(_i(s))||(e=l.createElement("link"),ue(e,"link",t),ne(e),l.head.appendChild(e)))}}function x2(t,e){Aa.m(t,e);var a=vl;if(a&&t){var l=e&&typeof e.as=="string"?e.as:"script",o='link[rel="modulepreload"][as="'+Le(l)+'"][href="'+Le(t)+'"]',s=o;switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":s=xl(t)}if(!Ze.has(s)&&(t=W({rel:"modulepreload",href:t},e),Ze.set(s,t),a.querySelector(o)===null)){switch(l){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(_i(s)))return}l=a.createElement("link"),ue(l,"link",t),ne(l),a.head.appendChild(l)}}}function S2(t,e,a){Aa.S(t,e,a);var l=vl;if(l&&t){var o=Xn(l).hoistableStyles,s=wl(t);e=e||"default";var u=o.get(s);if(!u){var d={loading:0,preload:null};if(u=l.querySelector(Ei(s)))d.loading=5;else{t=W({rel:"stylesheet",href:t,"data-precedence":e},a),(a=Ze.get(s))&&Jc(t,a);var p=u=l.createElement("link");ne(p),ue(p,"link",t),p._p=new Promise(function(S,z){p.onload=S,p.onerror=z}),p.addEventListener("load",function(){d.loading|=1}),p.addEventListener("error",function(){d.loading|=2}),d.loading|=4,er(u,e,l)}u={type:"stylesheet",instance:u,count:1,state:d},o.set(s,u)}}}function T2(t,e){Aa.X(t,e);var a=vl;if(a&&t){var l=Xn(a).hoistableScripts,o=xl(t),s=l.get(o);s||(s=a.querySelector(_i(o)),s||(t=W({src:t,async:!0},e),(e=Ze.get(o))&&Wc(t,e),s=a.createElement("script"),ne(s),ue(s,"link",t),a.head.appendChild(s)),s={type:"script",instance:s,count:1,state:null},l.set(o,s))}}function E2(t,e){Aa.M(t,e);var a=vl;if(a&&t){var l=Xn(a).hoistableScripts,o=xl(t),s=l.get(o);s||(s=a.querySelector(_i(o)),s||(t=W({src:t,async:!0,type:"module"},e),(e=Ze.get(o))&&Wc(t,e),s=a.createElement("script"),ne(s),ue(s,"link",t),a.head.appendChild(s)),s={type:"script",instance:s,count:1,state:null},l.set(o,s))}}function Tp(t,e,a,l){var o=(o=Oa.current)?tr(o):null;if(!o)throw Error(c(446));switch(t){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(e=wl(a.href),a=Xn(o).hoistableStyles,l=a.get(e),l||(l={type:"style",instance:null,count:0,state:null},a.set(e,l)),l):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){t=wl(a.href);var s=Xn(o).hoistableStyles,u=s.get(t);if(u||(o=o.ownerDocument||o,u={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},s.set(t,u),(s=o.querySelector(Ei(t)))&&!s._p&&(u.instance=s,u.state.loading=5),Ze.has(t)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},Ze.set(t,a),s||_2(o,t,a,u.state))),e&&l===null)throw Error(c(528,""));return u}if(e&&l!==null)throw Error(c(529,""));return null;case"script":return e=a.async,a=a.src,typeof a=="string"&&e&&typeof e!="function"&&typeof e!="symbol"?(e=xl(a),a=Xn(o).hoistableScripts,l=a.get(e),l||(l={type:"script",instance:null,count:0,state:null},a.set(e,l)),l):{type:"void",instance:null,count:0,state:null};default:throw Error(c(444,t))}}function wl(t){return'href="'+Le(t)+'"'}function Ei(t){return'link[rel="stylesheet"]['+t+"]"}function Ep(t){return W({},t,{"data-precedence":t.precedence,precedence:null})}function _2(t,e,a,l){t.querySelector('link[rel="preload"][as="style"]['+e+"]")?l.loading=1:(e=t.createElement("link"),l.preload=e,e.addEventListener("load",function(){return l.loading|=1}),e.addEventListener("error",function(){return l.loading|=2}),ue(e,"link",a),ne(e),t.head.appendChild(e))}function xl(t){return'[src="'+Le(t)+'"]'}function _i(t){return"script[async]"+t}function _p(t,e,a){if(e.count++,e.instance===null)switch(e.type){case"style":var l=t.querySelector('style[data-href~="'+Le(a.href)+'"]');if(l)return e.instance=l,ne(l),l;var o=W({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return l=(t.ownerDocument||t).createElement("style"),ne(l),ue(l,"style",o),er(l,a.precedence,t),e.instance=l;case"stylesheet":o=wl(a.href);var s=t.querySelector(Ei(o));if(s)return e.state.loading|=4,e.instance=s,ne(s),s;l=Ep(a),(o=Ze.get(o))&&Jc(l,o),s=(t.ownerDocument||t).createElement("link"),ne(s);var u=s;return u._p=new Promise(function(d,p){u.onload=d,u.onerror=p}),ue(s,"link",l),e.state.loading|=4,er(s,a.precedence,t),e.instance=s;case"script":return s=xl(a.src),(o=t.querySelector(_i(s)))?(e.instance=o,ne(o),o):(l=a,(o=Ze.get(s))&&(l=W({},a),Wc(l,o)),t=t.ownerDocument||t,o=t.createElement("script"),ne(o),ue(o,"link",l),t.head.appendChild(o),e.instance=o);case"void":return null;default:throw Error(c(443,e.type))}else e.type==="stylesheet"&&(e.state.loading&4)===0&&(l=e.instance,e.state.loading|=4,er(l,a.precedence,t));return e.instance}function er(t,e,a){for(var l=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),o=l.length?l[l.length-1]:null,s=o,u=0;u<l.length;u++){var d=l[u];if(d.dataset.precedence===e)s=d;else if(s!==o)break}s?s.parentNode.insertBefore(t,s.nextSibling):(e=a.nodeType===9?a.head:a,e.insertBefore(t,e.firstChild))}function Jc(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.title==null&&(t.title=e.title)}function Wc(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.integrity==null&&(t.integrity=e.integrity)}var ar=null;function Ap(t,e,a){if(ar===null){var l=new Map,o=ar=new Map;o.set(a,l)}else o=ar,l=o.get(a),l||(l=new Map,o.set(a,l));if(l.has(t))return l;for(l.set(t,null),a=a.getElementsByTagName(t),o=0;o<a.length;o++){var s=a[o];if(!(s[Ul]||s[fe]||t==="link"&&s.getAttribute("rel")==="stylesheet")&&s.namespaceURI!=="http://www.w3.org/2000/svg"){var u=s.getAttribute(e)||"";u=t+u;var d=l.get(u);d?d.push(s):l.set(u,[s])}}return l}function Cp(t,e,a){t=t.ownerDocument||t,t.head.insertBefore(a,e==="title"?t.querySelector("head > title"):null)}function A2(t,e,a){if(a===1||e.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof e.precedence!="string"||typeof e.href!="string"||e.href==="")break;return!0;case"link":if(typeof e.rel!="string"||typeof e.href!="string"||e.href===""||e.onLoad||e.onError)break;switch(e.rel){case"stylesheet":return t=e.disabled,typeof e.precedence=="string"&&t==null;default:return!0}case"script":if(e.async&&typeof e.async!="function"&&typeof e.async!="symbol"&&!e.onLoad&&!e.onError&&e.src&&typeof e.src=="string")return!0}return!1}function zp(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}var Ai=null;function C2(){}function z2(t,e,a){if(Ai===null)throw Error(c(475));var l=Ai;if(e.type==="stylesheet"&&(typeof a.media!="string"||matchMedia(a.media).matches!==!1)&&(e.state.loading&4)===0){if(e.instance===null){var o=wl(a.href),s=t.querySelector(Ei(o));if(s){t=s._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(l.count++,l=nr.bind(l),t.then(l,l)),e.state.loading|=4,e.instance=s,ne(s);return}s=t.ownerDocument||t,a=Ep(a),(o=Ze.get(o))&&Jc(a,o),s=s.createElement("link"),ne(s);var u=s;u._p=new Promise(function(d,p){u.onload=d,u.onerror=p}),ue(s,"link",a),e.instance=s}l.stylesheets===null&&(l.stylesheets=new Map),l.stylesheets.set(e,t),(t=e.state.preload)&&(e.state.loading&3)===0&&(l.count++,e=nr.bind(l),t.addEventListener("load",e),t.addEventListener("error",e))}}function k2(){if(Ai===null)throw Error(c(475));var t=Ai;return t.stylesheets&&t.count===0&&Fc(t,t.stylesheets),0<t.count?function(e){var a=setTimeout(function(){if(t.stylesheets&&Fc(t,t.stylesheets),t.unsuspend){var l=t.unsuspend;t.unsuspend=null,l()}},6e4);return t.unsuspend=e,function(){t.unsuspend=null,clearTimeout(a)}}:null}function nr(){if(this.count--,this.count===0){if(this.stylesheets)Fc(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var lr=null;function Fc(t,e){t.stylesheets=null,t.unsuspend!==null&&(t.count++,lr=new Map,e.forEach(O2,t),lr=null,nr.call(t))}function O2(t,e){if(!(e.state.loading&4)){var a=lr.get(t);if(a)var l=a.get(null);else{a=new Map,lr.set(t,a);for(var o=t.querySelectorAll("link[data-precedence],style[data-precedence]"),s=0;s<o.length;s++){var u=o[s];(u.nodeName==="LINK"||u.getAttribute("media")!=="not all")&&(a.set(u.dataset.precedence,u),l=u)}l&&a.set(null,l)}o=e.instance,u=o.getAttribute("data-precedence"),s=a.get(u)||l,s===l&&a.set(null,o),a.set(u,o),this.count++,l=nr.bind(this),o.addEventListener("load",l),o.addEventListener("error",l),s?s.parentNode.insertBefore(o,s.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(o,t.firstChild)),e.state.loading|=4}}var Ci={$$typeof:F,Provider:null,Consumer:null,_currentValue:ot,_currentValue2:ot,_threadCount:0};function j2(t,e,a,l,o,s,u,d){this.tag=1,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Ir(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.finishedLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ir(0),this.hiddenUpdates=Ir(null),this.identifierPrefix=l,this.onUncaughtError=o,this.onCaughtError=s,this.onRecoverableError=u,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=d,this.incompleteTransitions=new Map}function kp(t,e,a,l,o,s,u,d,p,S,z,B){return t=new j2(t,e,a,u,d,p,S,B),e=1,s===!0&&(e|=24),s=Qe(3,null,null,e),t.current=s,s.stateNode=t,e=ks(),e.refCount++,t.pooledCache=e,e.refCount++,s.memoizedState={element:l,isDehydrated:a,cache:e},cc(s),t}function Op(t){return t?(t=In,t):In}function jp(t,e,a,l,o,s){o=Op(o),l.context===null?l.context=o:l.pendingContext=o,l=Ya(e),l.payload={element:a},s=s===void 0?null:s,s!==null&&(l.callback=s),a=Ga(t,l,e),a!==null&&(ge(a,t,e),ui(a,t,e))}function Bp(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var a=t.retryLane;t.retryLane=a!==0&&a<e?a:e}}function Pc(t,e){Bp(t,e),(t=t.alternate)&&Bp(t,e)}function Np(t){if(t.tag===13){var e=Ma(t,67108864);e!==null&&ge(e,t,67108864),Pc(t,67108864)}}var ir=!0;function B2(t,e,a,l){var o=Y.T;Y.T=null;var s=H.p;try{H.p=2,Ic(t,e,a,l)}finally{H.p=s,Y.T=o}}function N2(t,e,a,l){var o=Y.T;Y.T=null;var s=H.p;try{H.p=8,Ic(t,e,a,l)}finally{H.p=s,Y.T=o}}function Ic(t,e,a,l){if(ir){var o=tu(l);if(o===null)Yc(t,e,l,or,a),Dp(t,l);else if(D2(o,t,e,a,l))l.stopPropagation();else if(Dp(t,l),e&4&&-1<M2.indexOf(t)){for(;o!==null;){var s=Gn(o);if(s!==null)switch(s.tag){case 3:if(s=s.stateNode,s.current.memoizedState.isDehydrated){var u=rn(s.pendingLanes);if(u!==0){var d=s;for(d.pendingLanes|=2,d.entangledLanes|=2;u;){var p=1<<31-Ae(u);d.entanglements[1]|=p,u&=~p}ra(s),(Yt&6)===0&&(Xo=aa()+500,xi(0))}}break;case 13:d=Ma(s,2),d!==null&&ge(d,s,2),$o(),Pc(s,2)}if(s=tu(l),s===null&&Yc(t,e,l,or,a),s===o)break;o=s}o!==null&&l.stopPropagation()}else Yc(t,e,l,null,a)}}function tu(t){return t=os(t),eu(t)}var or=null;function eu(t){if(or=null,t=sn(t),t!==null){var e=I(t);if(e===null)t=null;else{var a=e.tag;if(a===13){if(t=wt(e),t!==null)return t;t=null}else if(a===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null)}}return or=t,null}function Mp(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(vg()){case nf:return 2;case lf:return 8;case to:case wg:return 32;case of:return 268435456;default:return 32}default:return 32}}var au=!1,Ja=null,Wa=null,Fa=null,zi=new Map,ki=new Map,Pa=[],M2="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Dp(t,e){switch(t){case"focusin":case"focusout":Ja=null;break;case"dragenter":case"dragleave":Wa=null;break;case"mouseover":case"mouseout":Fa=null;break;case"pointerover":case"pointerout":zi.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":ki.delete(e.pointerId)}}function Oi(t,e,a,l,o,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:a,eventSystemFlags:l,nativeEvent:s,targetContainers:[o]},e!==null&&(e=Gn(e),e!==null&&Np(e)),t):(t.eventSystemFlags|=l,e=t.targetContainers,o!==null&&e.indexOf(o)===-1&&e.push(o),t)}function D2(t,e,a,l,o){switch(e){case"focusin":return Ja=Oi(Ja,t,e,a,l,o),!0;case"dragenter":return Wa=Oi(Wa,t,e,a,l,o),!0;case"mouseover":return Fa=Oi(Fa,t,e,a,l,o),!0;case"pointerover":var s=o.pointerId;return zi.set(s,Oi(zi.get(s)||null,t,e,a,l,o)),!0;case"gotpointercapture":return s=o.pointerId,ki.set(s,Oi(ki.get(s)||null,t,e,a,l,o)),!0}return!1}function Rp(t){var e=sn(t.target);if(e!==null){var a=I(e);if(a!==null){if(e=a.tag,e===13){if(e=wt(a),e!==null){t.blockedOn=e,kg(t.priority,function(){if(a.tag===13){var l=je(),o=Ma(a,l);o!==null&&ge(o,a,l),Pc(a,l)}});return}}else if(e===3&&a.stateNode.current.memoizedState.isDehydrated){t.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}t.blockedOn=null}function rr(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var a=tu(t.nativeEvent);if(a===null){a=t.nativeEvent;var l=new a.constructor(a.type,a);is=l,a.target.dispatchEvent(l),is=null}else return e=Gn(a),e!==null&&Np(e),t.blockedOn=a,!1;e.shift()}return!0}function Lp(t,e,a){rr(t)&&a.delete(e)}function R2(){au=!1,Ja!==null&&rr(Ja)&&(Ja=null),Wa!==null&&rr(Wa)&&(Wa=null),Fa!==null&&rr(Fa)&&(Fa=null),zi.forEach(Lp),ki.forEach(Lp)}function sr(t,e){t.blockedOn===e&&(t.blockedOn=null,au||(au=!0,n.unstable_scheduleCallback(n.unstable_NormalPriority,R2)))}var cr=null;function Hp(t){cr!==t&&(cr=t,n.unstable_scheduleCallback(n.unstable_NormalPriority,function(){cr===t&&(cr=null);for(var e=0;e<t.length;e+=3){var a=t[e],l=t[e+1],o=t[e+2];if(typeof l!="function"){if(eu(l||a)===null)continue;break}var s=Gn(a);s!==null&&(t.splice(e,3),e-=3,Qs(s,{pending:!0,data:o,method:a.method,action:l},l,o))}}))}function ji(t){function e(p){return sr(p,t)}Ja!==null&&sr(Ja,t),Wa!==null&&sr(Wa,t),Fa!==null&&sr(Fa,t),zi.forEach(e),ki.forEach(e);for(var a=0;a<Pa.length;a++){var l=Pa[a];l.blockedOn===t&&(l.blockedOn=null)}for(;0<Pa.length&&(a=Pa[0],a.blockedOn===null);)Rp(a),a.blockedOn===null&&Pa.shift();if(a=(t.ownerDocument||t).$$reactFormReplay,a!=null)for(l=0;l<a.length;l+=3){var o=a[l],s=a[l+1],u=o[we]||null;if(typeof s=="function")u||Hp(a);else if(u){var d=null;if(s&&s.hasAttribute("formAction")){if(o=s,u=s[we]||null)d=u.formAction;else if(eu(o)!==null)continue}else d=u.action;typeof d=="function"?a[l+1]=d:(a.splice(l,3),l-=3),Hp(a)}}}function nu(t){this._internalRoot=t}ur.prototype.render=nu.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(c(409));var a=e.current,l=je();jp(a,l,t,e,null,null)},ur.prototype.unmount=nu.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;t.tag===0&&gl(),jp(t.current,2,null,t,null,null),$o(),e[Yn]=null}};function ur(t){this._internalRoot=t}ur.prototype.unstable_scheduleHydration=function(t){if(t){var e=df();t={blockedOn:null,target:t,priority:e};for(var a=0;a<Pa.length&&e!==0&&e<Pa[a].priority;a++);Pa.splice(a,0,t),a===0&&Rp(t)}};var Up=i.version;if(Up!=="19.0.0")throw Error(c(527,Up,"19.0.0"));H.findDOMNode=function(t){var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(c(188)):(t=Object.keys(t).join(","),Error(c(268,t)));return t=N(e),t=t!==null?J(t):null,t=t===null?null:t.stateNode,t};var L2={bundleType:0,version:"19.0.0",rendererPackageName:"react-dom",currentDispatcherRef:Y,findFiberByHostInstance:sn,reconcilerVersion:"19.0.0"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var fr=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!fr.isDisabled&&fr.supportsFiber)try{Rl=fr.inject(L2),_e=fr}catch{}}return Ni.createRoot=function(t,e){if(!f(t))throw Error(c(299));var a=!1,l="",o=ah,s=nh,u=lh,d=null;return e!=null&&(e.unstable_strictMode===!0&&(a=!0),e.identifierPrefix!==void 0&&(l=e.identifierPrefix),e.onUncaughtError!==void 0&&(o=e.onUncaughtError),e.onCaughtError!==void 0&&(s=e.onCaughtError),e.onRecoverableError!==void 0&&(u=e.onRecoverableError),e.unstable_transitionCallbacks!==void 0&&(d=e.unstable_transitionCallbacks)),e=kp(t,1,!1,null,null,a,l,o,s,u,d,null),t[Yn]=e.current,qc(t.nodeType===8?t.parentNode:t),new nu(e)},Ni.hydrateRoot=function(t,e,a){if(!f(t))throw Error(c(299));var l=!1,o="",s=ah,u=nh,d=lh,p=null,S=null;return a!=null&&(a.unstable_strictMode===!0&&(l=!0),a.identifierPrefix!==void 0&&(o=a.identifierPrefix),a.onUncaughtError!==void 0&&(s=a.onUncaughtError),a.onCaughtError!==void 0&&(u=a.onCaughtError),a.onRecoverableError!==void 0&&(d=a.onRecoverableError),a.unstable_transitionCallbacks!==void 0&&(p=a.unstable_transitionCallbacks),a.formState!==void 0&&(S=a.formState)),e=kp(t,1,!0,e,a??null,l,o,s,u,d,p,S),e.context=Op(null),a=e.current,l=je(),o=Ya(l),o.callback=null,Ga(a,o,l),e.current.lanes=l,Hl(e,l),ra(e),t[Yn]=e.current,qc(t),new ur(e)},Ni.version="19.0.0",Ni}var Jp;function K2(){if(Jp)return ou.exports;Jp=1;function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(i){console.error(i)}}return n(),ou.exports=Z2(),ou.exports}var J2=K2();function Mm(n){var i,r,c="";if(typeof n=="string"||typeof n=="number")c+=n;else if(typeof n=="object")if(Array.isArray(n)){var f=n.length;for(i=0;i<f;i++)n[i]&&(r=Mm(n[i]))&&(c&&(c+=" "),c+=r)}else for(r in n)n[r]&&(c&&(c+=" "),c+=r);return c}function jn(){for(var n,i,r=0,c="",f=arguments.length;r<f;r++)(n=arguments[r])&&(i=Mm(n))&&(c&&(c+=" "),c+=i);return c}var Xi=n=>typeof n=="number"&&!isNaN(n),Dn=n=>typeof n=="string",ka=n=>typeof n=="function",W2=n=>Dn(n)||Xi(n),bu=n=>Dn(n)||ka(n)?n:null,F2=(n,i)=>n===!1||Xi(n)&&n>0?n:i,vu=n=>st.isValidElement(n)||Dn(n)||ka(n)||Xi(n);function P2(n,i,r=300){let{scrollHeight:c,style:f}=n;requestAnimationFrame(()=>{f.minHeight="initial",f.height=c+"px",f.transition=`all ${r}ms`,requestAnimationFrame(()=>{f.height="0",f.padding="0",f.margin="0",setTimeout(i,r)})})}function I2({enter:n,exit:i,appendPosition:r=!1,collapse:c=!0,collapseDuration:f=300}){return function({children:h,position:g,preventExitTransition:v,done:y,nodeRef:w,isIn:j,playToast:R}){let M=r?`${n}--${g}`:n,F=r?`${i}--${g}`:i,G=st.useRef(0);return st.useLayoutEffect(()=>{let Q=w.current,Z=M.split(" "),K=k=>{k.target===w.current&&(R(),Q.removeEventListener("animationend",K),Q.removeEventListener("animationcancel",K),G.current===0&&k.type!=="animationcancel"&&Q.classList.remove(...Z))};Q.classList.add(...Z),Q.addEventListener("animationend",K),Q.addEventListener("animationcancel",K)},[]),st.useEffect(()=>{let Q=w.current,Z=()=>{Q.removeEventListener("animationend",Z),c?P2(Q,y,f):y()};j||(v?Z():(G.current=1,Q.className+=` ${F}`,Q.addEventListener("animationend",Z)))},[j]),yt.createElement(yt.Fragment,null,h)}}function Wp(n,i){return{content:Dm(n.content,n.props),containerId:n.props.containerId,id:n.props.toastId,theme:n.props.theme,type:n.props.type,data:n.props.data||{},isLoading:n.props.isLoading,icon:n.props.icon,reason:n.removalReason,status:i}}function Dm(n,i,r=!1){return st.isValidElement(n)&&!Dn(n.type)?st.cloneElement(n,{closeToast:i.closeToast,toastProps:i,data:i.data,isPaused:r}):ka(n)?n({closeToast:i.closeToast,toastProps:i,data:i.data,isPaused:r}):n}function ty({closeToast:n,theme:i,ariaLabel:r="close"}){return yt.createElement("button",{className:`Toastify__close-button Toastify__close-button--${i}`,type:"button",onClick:c=>{c.stopPropagation(),n(!0)},"aria-label":r},yt.createElement("svg",{"aria-hidden":"true",viewBox:"0 0 14 16"},yt.createElement("path",{fillRule:"evenodd",d:"M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"})))}function ey({delay:n,isRunning:i,closeToast:r,type:c="default",hide:f,className:h,controlledProgress:g,progress:v,rtl:y,isIn:w,theme:j}){let R=f||g&&v===0,M={animationDuration:`${n}ms`,animationPlayState:i?"running":"paused"};g&&(M.transform=`scaleX(${v})`);let F=jn("Toastify__progress-bar",g?"Toastify__progress-bar--controlled":"Toastify__progress-bar--animated",`Toastify__progress-bar-theme--${j}`,`Toastify__progress-bar--${c}`,{"Toastify__progress-bar--rtl":y}),G=ka(h)?h({rtl:y,type:c,defaultClassName:F}):jn(F,h),Q={[g&&v>=1?"onTransitionEnd":"onAnimationEnd"]:g&&v<1?null:()=>{w&&r()}};return yt.createElement("div",{className:"Toastify__progress-bar--wrp","data-hidden":R},yt.createElement("div",{className:`Toastify__progress-bar--bg Toastify__progress-bar-theme--${j} Toastify__progress-bar--${c}`}),yt.createElement("div",{role:"progressbar","aria-hidden":R?"true":"false","aria-label":"notification timer","aria-valuenow":g?Math.round(v*100):void 0,"aria-valuemin":0,"aria-valuemax":100,className:G,style:M,...Q}))}var ay=1,Rm=()=>`${ay++}`;function ny(n,i,r){let c=1,f=0,h=[],g=[],v=i,y=new Map,w=new Set,j=k=>(w.add(k),()=>w.delete(k)),R=()=>{g=Array.from(y.values()),w.forEach(k=>k())},M=({containerId:k,toastId:q,updateId:P})=>{let L=k?k!==n:n!==1,it=y.has(q)&&P==null;return L||it},F=(k,q)=>{y.forEach(P=>{var L;(q==null||q===P.props.toastId)&&((L=P.toggle)==null||L.call(P,k))})},G=k=>{var q,P;k.isActive&&((P=(q=k.props)==null?void 0:q.onClose)==null||P.call(q,k.removalReason),k.isActive=!1,r(Wp(k,"removed")))},Q=k=>{if(k==null)y.forEach(G);else{let q=y.get(k);q&&G(q)}R()},Z=()=>{f-=h.length,h=[]},K=k=>{var q,P;let{toastId:L,updateId:it}=k.props,U=it==null;k.staleId&&y.delete(k.staleId),k.isActive=!0,y.set(L,k),R(),r(Wp(k,U?"added":"updated")),U&&((P=(q=k.props).onOpen)==null||P.call(q))};return{id:n,props:v,observe:j,toggle:F,removeToast:Q,toasts:y,clearQueue:Z,buildToast:(k,q)=>{if(M(q))return;let{toastId:P,updateId:L,data:it,staleId:U,delay:X}=q,Y=L==null;Y&&f++;let W={...v,style:v.toastStyle,key:c++,...Object.fromEntries(Object.entries(q).filter(([Gt,mt])=>mt!=null)),toastId:P,updateId:L,data:it,isIn:!1,className:bu(q.className||v.toastClassName),progressClassName:bu(q.progressClassName||v.progressClassName),autoClose:q.isLoading?!1:F2(q.autoClose,v.autoClose),closeToast(Gt){let mt=y.get(P);mt&&(mt.removalReason=Gt,Q(P))},deleteToast(){if(y.get(P)!=null){if(y.delete(P),f--,f<0&&(f=0),h.length>0){K(h.shift());return}R()}}};W.closeButton=v.closeButton,q.closeButton===!1||vu(q.closeButton)?W.closeButton=q.closeButton:q.closeButton===!0&&(W.closeButton=vu(v.closeButton)?v.closeButton:!0);let bt={content:k,props:W,staleId:U};v.limit&&v.limit>0&&f>v.limit&&Y?h.push(bt):Xi(X)?setTimeout(()=>{K(bt)},X):K(bt)},setProps(k){v=k},setToggle:(k,q)=>{let P=y.get(k);P&&(P.toggle=q)},isToastActive:k=>{var q;return(q=y.get(k))==null?void 0:q.isActive},getSnapshot:()=>g}}var ye=new Map,Ui=[],wu=new Set,ly=n=>wu.forEach(i=>i(n)),Lm=()=>ye.size>0;function iy(){Ui.forEach(n=>Um(n.content,n.options)),Ui=[]}var oy=(n,{containerId:i})=>{var r;return(r=ye.get(i||1))==null?void 0:r.toasts.get(n)};function Hm(n,i){var r;if(i)return!!((r=ye.get(i))!=null&&r.isToastActive(n));let c=!1;return ye.forEach(f=>{f.isToastActive(n)&&(c=!0)}),c}function ry(n){if(!Lm()){Ui=Ui.filter(i=>n!=null&&i.options.toastId!==n);return}if(n==null||W2(n))ye.forEach(i=>{i.removeToast(n)});else if(n&&("containerId"in n||"id"in n)){let i=ye.get(n.containerId);i?i.removeToast(n.id):ye.forEach(r=>{r.removeToast(n.id)})}}var sy=(n={})=>{ye.forEach(i=>{i.props.limit&&(!n.containerId||i.id===n.containerId)&&i.clearQueue()})};function Um(n,i){vu(n)&&(Lm()||Ui.push({content:n,options:i}),ye.forEach(r=>{r.buildToast(n,i)}))}function cy(n){var i;(i=ye.get(n.containerId||1))==null||i.setToggle(n.id,n.fn)}function qm(n,i){ye.forEach(r=>{(i==null||!(i!=null&&i.containerId)||(i==null?void 0:i.containerId)===r.id)&&r.toggle(n,i==null?void 0:i.id)})}function uy(n){let i=n.containerId||1;return{subscribe(r){let c=ny(i,n,ly);ye.set(i,c);let f=c.observe(r);return iy(),()=>{f(),ye.delete(i)}},setProps(r){var c;(c=ye.get(i))==null||c.setProps(r)},getSnapshot(){var r;return(r=ye.get(i))==null?void 0:r.getSnapshot()}}}function fy(n){return wu.add(n),()=>{wu.delete(n)}}function dy(n){return n&&(Dn(n.toastId)||Xi(n.toastId))?n.toastId:Rm()}function Vi(n,i){return Um(n,i),i.toastId}function Nr(n,i){return{...i,type:i&&i.type||n,toastId:dy(i)}}function Mr(n){return(i,r)=>Vi(i,Nr(n,r))}function _t(n,i){return Vi(n,Nr("default",i))}_t.loading=(n,i)=>Vi(n,Nr("default",{isLoading:!0,autoClose:!1,closeOnClick:!1,closeButton:!1,draggable:!1,...i}));function hy(n,{pending:i,error:r,success:c},f){let h;i&&(h=Dn(i)?_t.loading(i,f):_t.loading(i.render,{...f,...i}));let g={isLoading:null,autoClose:null,closeOnClick:null,closeButton:null,draggable:null},v=(w,j,R)=>{if(j==null){_t.dismiss(h);return}let M={type:w,...g,...f,data:R},F=Dn(j)?{render:j}:j;return h?_t.update(h,{...M,...F}):_t(F.render,{...M,...F}),R},y=ka(n)?n():n;return y.then(w=>v("success",c,w)).catch(w=>v("error",r,w)),y}_t.promise=hy;_t.success=Mr("success");_t.info=Mr("info");_t.error=Mr("error");_t.warning=Mr("warning");_t.warn=_t.warning;_t.dark=(n,i)=>Vi(n,Nr("default",{theme:"dark",...i}));function py(n){ry(n)}_t.dismiss=py;_t.clearWaitingQueue=sy;_t.isActive=Hm;_t.update=(n,i={})=>{let r=oy(n,i);if(r){let{props:c,content:f}=r,h={delay:100,...c,...i,toastId:i.toastId||n,updateId:Rm()};h.toastId!==n&&(h.staleId=n);let g=h.render||f;delete h.render,Vi(g,h)}};_t.done=n=>{_t.update(n,{progress:1})};_t.onChange=fy;_t.play=n=>qm(!0,n);_t.pause=n=>qm(!1,n);function my(n){var i;let{subscribe:r,getSnapshot:c,setProps:f}=st.useRef(uy(n)).current;f(n);let h=(i=st.useSyncExternalStore(r,c,c))==null?void 0:i.slice();function g(v){if(!h)return[];let y=new Map;return n.newestOnTop&&h.reverse(),h.forEach(w=>{let{position:j}=w.props;y.has(j)||y.set(j,[]),y.get(j).push(w)}),Array.from(y,w=>v(w[0],w[1]))}return{getToastToRender:g,isToastActive:Hm,count:h==null?void 0:h.length}}function gy(n){let[i,r]=st.useState(!1),[c,f]=st.useState(!1),h=st.useRef(null),g=st.useRef({start:0,delta:0,removalDistance:0,canCloseOnClick:!0,canDrag:!1,didMove:!1}).current,{autoClose:v,pauseOnHover:y,closeToast:w,onClick:j,closeOnClick:R}=n;cy({id:n.toastId,containerId:n.containerId,fn:r}),st.useEffect(()=>{if(n.pauseOnFocusLoss)return M(),()=>{F()}},[n.pauseOnFocusLoss]);function M(){document.hasFocus()||K(),window.addEventListener("focus",Z),window.addEventListener("blur",K)}function F(){window.removeEventListener("focus",Z),window.removeEventListener("blur",K)}function G(U){if(n.draggable===!0||n.draggable===U.pointerType){k();let X=h.current;g.canCloseOnClick=!0,g.canDrag=!0,X.style.transition="none",n.draggableDirection==="x"?(g.start=U.clientX,g.removalDistance=X.offsetWidth*(n.draggablePercent/100)):(g.start=U.clientY,g.removalDistance=X.offsetHeight*(n.draggablePercent===80?n.draggablePercent*1.5:n.draggablePercent)/100)}}function Q(U){let{top:X,bottom:Y,left:W,right:bt}=h.current.getBoundingClientRect();U.pointerType==="mouse"&&n.pauseOnHover&&U.clientX>=W&&U.clientX<=bt&&U.clientY>=X&&U.clientY<=Y?K():Z()}function Z(){r(!0)}function K(){r(!1)}function k(){g.didMove=!1,document.addEventListener("pointermove",P),document.addEventListener("pointerup",L)}function q(){document.removeEventListener("pointermove",P),document.removeEventListener("pointerup",L)}function P(U){let X=h.current;if(g.canDrag&&X){g.didMove=!0,i&&K(),n.draggableDirection==="x"?g.delta=U.clientX-g.start:g.delta=U.clientY-g.start,g.start!==U.clientX&&(g.canCloseOnClick=!1);let Y=n.draggableDirection==="x"?`${g.delta}px, var(--y)`:`0, calc(${g.delta}px + var(--y))`;X.style.transform=`translate3d(${Y},0)`,X.style.opacity=`${1-Math.abs(g.delta/g.removalDistance)}`}}function L(){q();let U=h.current;if(g.canDrag&&g.didMove&&U){if(g.canDrag=!1,Math.abs(g.delta)>g.removalDistance){f(!0),n.closeToast(!0),n.collapseAll();return}U.style.transition="transform 0.2s, opacity 0.2s",U.style.removeProperty("transform"),U.style.removeProperty("opacity")}}let it={onPointerDown:G,onPointerUp:Q};return v&&y&&(it.onMouseEnter=K,n.stacked||(it.onMouseLeave=Z)),R&&(it.onClick=U=>{j&&j(U),g.canCloseOnClick&&w(!0)}),{playToast:Z,pauseToast:K,isRunning:i,preventExitTransition:c,toastRef:h,eventHandlers:it}}var Ym=typeof window<"u"?st.useLayoutEffect:st.useEffect,Dr=({theme:n,type:i,isLoading:r,...c})=>yt.createElement("svg",{viewBox:"0 0 24 24",width:"100%",height:"100%",fill:n==="colored"?"currentColor":`var(--toastify-icon-color-${i})`,...c});function yy(n){return yt.createElement(Dr,{...n},yt.createElement("path",{d:"M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z"}))}function by(n){return yt.createElement(Dr,{...n},yt.createElement("path",{d:"M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z"}))}function vy(n){return yt.createElement(Dr,{...n},yt.createElement("path",{d:"M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"}))}function wy(n){return yt.createElement(Dr,{...n},yt.createElement("path",{d:"M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"}))}function xy(){return yt.createElement("div",{className:"Toastify__spinner"})}var xu={info:by,warning:yy,success:vy,error:wy,spinner:xy},Sy=n=>n in xu;function Ty({theme:n,type:i,isLoading:r,icon:c}){let f=null,h={theme:n,type:i};return c===!1||(ka(c)?f=c({...h,isLoading:r}):st.isValidElement(c)?f=st.cloneElement(c,h):r?f=xu.spinner():Sy(i)&&(f=xu[i](h))),f}var Ey=n=>{let{isRunning:i,preventExitTransition:r,toastRef:c,eventHandlers:f,playToast:h}=gy(n),{closeButton:g,children:v,autoClose:y,onClick:w,type:j,hideProgressBar:R,closeToast:M,transition:F,position:G,className:Q,style:Z,progressClassName:K,updateId:k,role:q,progress:P,rtl:L,toastId:it,deleteToast:U,isIn:X,isLoading:Y,closeOnClick:W,theme:bt,ariaLabel:Gt}=n,mt=jn("Toastify__toast",`Toastify__toast-theme--${bt}`,`Toastify__toast--${j}`,{"Toastify__toast--rtl":L},{"Toastify__toast--close-on-click":W}),Xt=ka(Q)?Q({rtl:L,position:G,type:j,defaultClassName:mt}):jn(mt,Q),Ht=Ty(n),D=!!P||!y,lt={closeToast:M,type:j,theme:bt},I=null;return g===!1||(ka(g)?I=g(lt):st.isValidElement(g)?I=st.cloneElement(g,lt):I=ty(lt)),yt.createElement(F,{isIn:X,done:U,position:G,preventExitTransition:r,nodeRef:c,playToast:h},yt.createElement("div",{id:it,tabIndex:0,onClick:w,"data-in":X,className:Xt,...f,style:Z,ref:c,...X&&{role:q,"aria-label":Gt}},Ht!=null&&yt.createElement("div",{className:jn("Toastify__toast-icon",{"Toastify--animate-icon Toastify__zoom-enter":!Y})},Ht),Dm(v,n,!i),I,!n.customProgressBar&&yt.createElement(ey,{...k&&!D?{key:`p-${k}`}:{},rtl:L,theme:bt,delay:y,isRunning:i,isIn:X,closeToast:M,hide:R,type:j,className:K,controlledProgress:D,progress:P||0})))},_y=(n,i=!1)=>({enter:`Toastify--animate Toastify__${n}-enter`,exit:`Toastify--animate Toastify__${n}-exit`,appendPosition:i}),Ay=I2(_y("bounce",!0)),Cy={position:"top-right",transition:Ay,autoClose:5e3,closeButton:!0,pauseOnHover:!0,pauseOnFocusLoss:!0,draggable:"touch",draggablePercent:80,draggableDirection:"x",role:"alert",theme:"light","aria-label":"Notifications Alt+T",hotKeys:n=>n.altKey&&n.code==="KeyT"};function zy(n){let i={...Cy,...n},r=n.stacked,[c,f]=st.useState(!0),h=st.useRef(null),{getToastToRender:g,isToastActive:v,count:y}=my(i),{className:w,style:j,rtl:R,containerId:M,hotKeys:F}=i;function G(Z){let K=jn("Toastify__toast-container",`Toastify__toast-container--${Z}`,{"Toastify__toast-container--rtl":R});return ka(w)?w({position:Z,rtl:R,defaultClassName:K}):jn(K,bu(w))}function Q(){r&&(f(!0),_t.play())}return Ym(()=>{var Z;if(r){let K=h.current.querySelectorAll('[data-in="true"]'),k=12,q=(Z=i.position)==null?void 0:Z.includes("top"),P=0,L=0;Array.from(K).reverse().forEach((it,U)=>{let X=it;X.classList.add("Toastify__toast--stacked"),U>0&&(X.dataset.collapsed=`${c}`),X.dataset.pos||(X.dataset.pos=q?"top":"bot");let Y=P*(c?.2:1)+(c?0:k*U),W=Math.max(.5,1-(c?L:0));X.style.setProperty("--y",`${q?Y:Y*-1}px`),X.style.setProperty("--g",`${k}`),X.style.setProperty("--s",`${W}`),P+=X.offsetHeight,L+=.025})}},[c,y,r]),st.useEffect(()=>{function Z(K){var k;let q=h.current;F(K)&&((k=q==null?void 0:q.querySelector('[tabIndex="0"]'))==null||k.focus(),f(!1),_t.pause()),K.key==="Escape"&&(document.activeElement===q||q!=null&&q.contains(document.activeElement))&&(f(!0),_t.play())}return document.addEventListener("keydown",Z),()=>{document.removeEventListener("keydown",Z)}},[F]),yt.createElement("section",{ref:h,className:"Toastify",id:M,onMouseEnter:()=>{r&&(f(!1),_t.pause())},onMouseLeave:Q,"aria-live":"polite","aria-atomic":"false","aria-relevant":"additions text","aria-label":i["aria-label"]},g((Z,K)=>{let k=K.length?{...j}:{...j,pointerEvents:"none"};return yt.createElement("div",{tabIndex:-1,className:G(Z),"data-stacked":r,style:k,key:`c-${Z}`},K.map(({content:q,props:P})=>yt.createElement(Ey,{...P,stacked:r,collapseAll:Q,isIn:v(P.toastId,P.containerId),key:`t-${P.key}`},q)))}))}var ky=`:root {
  --toastify-color-light: #fff;
  --toastify-color-dark: #121212;
  --toastify-color-info: #3498db;
  --toastify-color-success: #07bc0c;
  --toastify-color-warning: #f1c40f;
  --toastify-color-error: hsl(6, 78%, 57%);
  --toastify-color-transparent: rgba(255, 255, 255, 0.7);

  --toastify-icon-color-info: var(--toastify-color-info);
  --toastify-icon-color-success: var(--toastify-color-success);
  --toastify-icon-color-warning: var(--toastify-color-warning);
  --toastify-icon-color-error: var(--toastify-color-error);

  --toastify-container-width: fit-content;
  --toastify-toast-width: 320px;
  --toastify-toast-offset: 16px;
  --toastify-toast-top: max(var(--toastify-toast-offset), env(safe-area-inset-top));
  --toastify-toast-right: max(var(--toastify-toast-offset), env(safe-area-inset-right));
  --toastify-toast-left: max(var(--toastify-toast-offset), env(safe-area-inset-left));
  --toastify-toast-bottom: max(var(--toastify-toast-offset), env(safe-area-inset-bottom));
  --toastify-toast-background: #fff;
  --toastify-toast-padding: 14px;
  --toastify-toast-min-height: 64px;
  --toastify-toast-max-height: 800px;
  --toastify-toast-bd-radius: 6px;
  --toastify-toast-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  --toastify-font-family: sans-serif;
  --toastify-z-index: 9999;
  --toastify-text-color-light: #757575;
  --toastify-text-color-dark: #fff;

  /* Used only for colored theme */
  --toastify-text-color-info: #fff;
  --toastify-text-color-success: #fff;
  --toastify-text-color-warning: #fff;
  --toastify-text-color-error: #fff;

  --toastify-spinner-color: #616161;
  --toastify-spinner-color-empty-area: #e0e0e0;
  --toastify-color-progress-light: linear-gradient(to right, #4cd964, #5ac8fa, #007aff, #34aadc, #5856d6, #ff2d55);
  --toastify-color-progress-dark: #bb86fc;
  --toastify-color-progress-info: var(--toastify-color-info);
  --toastify-color-progress-success: var(--toastify-color-success);
  --toastify-color-progress-warning: var(--toastify-color-warning);
  --toastify-color-progress-error: var(--toastify-color-error);
  /* used to control the opacity of the progress trail */
  --toastify-color-progress-bgo: 0.2;
}

.Toastify__toast-container {
  z-index: var(--toastify-z-index);
  -webkit-transform: translate3d(0, 0, var(--toastify-z-index));
  position: fixed;
  width: var(--toastify-container-width);
  box-sizing: border-box;
  color: #fff;
  display: flex;
  flex-direction: column;
}

.Toastify__toast-container--top-left {
  top: var(--toastify-toast-top);
  left: var(--toastify-toast-left);
}
.Toastify__toast-container--top-center {
  top: var(--toastify-toast-top);
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
}
.Toastify__toast-container--top-right {
  top: var(--toastify-toast-top);
  right: var(--toastify-toast-right);
  align-items: end;
}
.Toastify__toast-container--bottom-left {
  bottom: var(--toastify-toast-bottom);
  left: var(--toastify-toast-left);
}
.Toastify__toast-container--bottom-center {
  bottom: var(--toastify-toast-bottom);
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
}
.Toastify__toast-container--bottom-right {
  bottom: var(--toastify-toast-bottom);
  right: var(--toastify-toast-right);
  align-items: end;
}

.Toastify__toast {
  --y: 0px;
  position: relative;
  touch-action: none;
  width: var(--toastify-toast-width);
  min-height: var(--toastify-toast-min-height);
  box-sizing: border-box;
  margin-bottom: 1rem;
  padding: var(--toastify-toast-padding);
  border-radius: var(--toastify-toast-bd-radius);
  box-shadow: var(--toastify-toast-shadow);
  max-height: var(--toastify-toast-max-height);
  font-family: var(--toastify-font-family);
  /* webkit only issue #791 */
  z-index: 0;
  /* inner swag */
  display: flex;
  flex: 1 auto;
  align-items: center;
  word-break: break-word;
}

@media only screen and (max-width: 480px) {
  .Toastify__toast-container {
    width: 100vw;
    left: env(safe-area-inset-left);
    margin: 0;
  }
  .Toastify__toast-container--top-left,
  .Toastify__toast-container--top-center,
  .Toastify__toast-container--top-right {
    top: env(safe-area-inset-top);
    transform: translateX(0);
  }
  .Toastify__toast-container--bottom-left,
  .Toastify__toast-container--bottom-center,
  .Toastify__toast-container--bottom-right {
    bottom: env(safe-area-inset-bottom);
    transform: translateX(0);
  }
  .Toastify__toast-container--rtl {
    right: env(safe-area-inset-right);
    left: initial;
  }
  .Toastify__toast {
    --toastify-toast-width: 100%;
    margin-bottom: 0;
    border-radius: 0;
  }
}

.Toastify__toast-container[data-stacked='true'] {
  width: var(--toastify-toast-width);
}

@media only screen and (max-width: 480px) {
  .Toastify__toast-container[data-stacked='true'] {
    width: 100vw;
  }
}

.Toastify__toast--stacked {
  position: absolute;
  width: 100%;
  transform: translate3d(0, var(--y), 0) scale(var(--s));
  transition: transform 0.3s;
}

.Toastify__toast--stacked[data-collapsed] .Toastify__toast-body,
.Toastify__toast--stacked[data-collapsed] .Toastify__close-button {
  transition: opacity 0.1s;
}

.Toastify__toast--stacked[data-collapsed='false'] {
  overflow: visible;
}

.Toastify__toast--stacked[data-collapsed='true']:not(:last-child) > * {
  opacity: 0;
}

.Toastify__toast--stacked:after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: calc(var(--g) * 1px);
  bottom: 100%;
}

.Toastify__toast--stacked[data-pos='top'] {
  top: 0;
}

.Toastify__toast--stacked[data-pos='bot'] {
  bottom: 0;
}

.Toastify__toast--stacked[data-pos='bot'].Toastify__toast--stacked:before {
  transform-origin: top;
}

.Toastify__toast--stacked[data-pos='top'].Toastify__toast--stacked:before {
  transform-origin: bottom;
}

.Toastify__toast--stacked:before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  transform: scaleY(3);
  z-index: -1;
}

.Toastify__toast--rtl {
  direction: rtl;
}

.Toastify__toast--close-on-click {
  cursor: pointer;
}

.Toastify__toast-icon {
  margin-inline-end: 10px;
  width: 22px;
  flex-shrink: 0;
  display: flex;
}

.Toastify--animate {
  animation-fill-mode: both;
  animation-duration: 0.5s;
}

.Toastify--animate-icon {
  animation-fill-mode: both;
  animation-duration: 0.3s;
}

.Toastify__toast-theme--dark {
  background: var(--toastify-color-dark);
  color: var(--toastify-text-color-dark);
}

.Toastify__toast-theme--light {
  background: var(--toastify-color-light);
  color: var(--toastify-text-color-light);
}

.Toastify__toast-theme--colored.Toastify__toast--default {
  background: var(--toastify-color-light);
  color: var(--toastify-text-color-light);
}

.Toastify__toast-theme--colored.Toastify__toast--info {
  color: var(--toastify-text-color-info);
  background: var(--toastify-color-info);
}

.Toastify__toast-theme--colored.Toastify__toast--success {
  color: var(--toastify-text-color-success);
  background: var(--toastify-color-success);
}

.Toastify__toast-theme--colored.Toastify__toast--warning {
  color: var(--toastify-text-color-warning);
  background: var(--toastify-color-warning);
}

.Toastify__toast-theme--colored.Toastify__toast--error {
  color: var(--toastify-text-color-error);
  background: var(--toastify-color-error);
}

.Toastify__progress-bar-theme--light {
  background: var(--toastify-color-progress-light);
}

.Toastify__progress-bar-theme--dark {
  background: var(--toastify-color-progress-dark);
}

.Toastify__progress-bar--info {
  background: var(--toastify-color-progress-info);
}

.Toastify__progress-bar--success {
  background: var(--toastify-color-progress-success);
}

.Toastify__progress-bar--warning {
  background: var(--toastify-color-progress-warning);
}

.Toastify__progress-bar--error {
  background: var(--toastify-color-progress-error);
}

.Toastify__progress-bar-theme--colored.Toastify__progress-bar--info,
.Toastify__progress-bar-theme--colored.Toastify__progress-bar--success,
.Toastify__progress-bar-theme--colored.Toastify__progress-bar--warning,
.Toastify__progress-bar-theme--colored.Toastify__progress-bar--error {
  background: var(--toastify-color-transparent);
}

.Toastify__close-button {
  color: #fff;
  position: absolute;
  top: 6px;
  right: 6px;
  background: transparent;
  outline: none;
  border: none;
  padding: 0;
  cursor: pointer;
  opacity: 0.7;
  transition: 0.3s ease;
  z-index: 1;
}

.Toastify__toast--rtl .Toastify__close-button {
  left: 6px;
  right: unset;
}

.Toastify__close-button--light {
  color: #000;
  opacity: 0.3;
}

.Toastify__close-button > svg {
  fill: currentColor;
  height: 16px;
  width: 14px;
}

.Toastify__close-button:hover,
.Toastify__close-button:focus {
  opacity: 1;
}

@keyframes Toastify__trackProgress {
  0% {
    transform: scaleX(1);
  }
  100% {
    transform: scaleX(0);
  }
}

.Toastify__progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0.7;
  transform-origin: left;
}

.Toastify__progress-bar--animated {
  animation: Toastify__trackProgress linear 1 forwards;
}

.Toastify__progress-bar--controlled {
  transition: transform 0.2s;
}

.Toastify__progress-bar--rtl {
  right: 0;
  left: initial;
  transform-origin: right;
  border-bottom-left-radius: initial;
}

.Toastify__progress-bar--wrp {
  position: absolute;
  overflow: hidden;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5px;
  border-bottom-left-radius: var(--toastify-toast-bd-radius);
  border-bottom-right-radius: var(--toastify-toast-bd-radius);
}

.Toastify__progress-bar--wrp[data-hidden='true'] {
  opacity: 0;
}

.Toastify__progress-bar--bg {
  opacity: var(--toastify-color-progress-bgo);
  width: 100%;
  height: 100%;
}

.Toastify__spinner {
  width: 20px;
  height: 20px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: var(--toastify-spinner-color-empty-area);
  border-right-color: var(--toastify-spinner-color);
  animation: Toastify__spin 0.65s linear infinite;
}

@keyframes Toastify__bounceInRight {
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  from {
    opacity: 0;
    transform: translate3d(3000px, 0, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(-25px, 0, 0);
  }
  75% {
    transform: translate3d(10px, 0, 0);
  }
  90% {
    transform: translate3d(-5px, 0, 0);
  }
  to {
    transform: none;
  }
}

@keyframes Toastify__bounceOutRight {
  20% {
    opacity: 1;
    transform: translate3d(-20px, var(--y), 0);
  }
  to {
    opacity: 0;
    transform: translate3d(2000px, var(--y), 0);
  }
}

@keyframes Toastify__bounceInLeft {
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    opacity: 0;
    transform: translate3d(-3000px, 0, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(25px, 0, 0);
  }
  75% {
    transform: translate3d(-10px, 0, 0);
  }
  90% {
    transform: translate3d(5px, 0, 0);
  }
  to {
    transform: none;
  }
}

@keyframes Toastify__bounceOutLeft {
  20% {
    opacity: 1;
    transform: translate3d(20px, var(--y), 0);
  }
  to {
    opacity: 0;
    transform: translate3d(-2000px, var(--y), 0);
  }
}

@keyframes Toastify__bounceInUp {
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  from {
    opacity: 0;
    transform: translate3d(0, 3000px, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(0, -20px, 0);
  }
  75% {
    transform: translate3d(0, 10px, 0);
  }
  90% {
    transform: translate3d(0, -5px, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}

@keyframes Toastify__bounceOutUp {
  20% {
    transform: translate3d(0, calc(var(--y) - 10px), 0);
  }
  40%,
  45% {
    opacity: 1;
    transform: translate3d(0, calc(var(--y) + 20px), 0);
  }
  to {
    opacity: 0;
    transform: translate3d(0, -2000px, 0);
  }
}

@keyframes Toastify__bounceInDown {
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    opacity: 0;
    transform: translate3d(0, -3000px, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(0, 25px, 0);
  }
  75% {
    transform: translate3d(0, -10px, 0);
  }
  90% {
    transform: translate3d(0, 5px, 0);
  }
  to {
    transform: none;
  }
}

@keyframes Toastify__bounceOutDown {
  20% {
    transform: translate3d(0, calc(var(--y) - 10px), 0);
  }
  40%,
  45% {
    opacity: 1;
    transform: translate3d(0, calc(var(--y) + 20px), 0);
  }
  to {
    opacity: 0;
    transform: translate3d(0, 2000px, 0);
  }
}

.Toastify__bounce-enter--top-left,
.Toastify__bounce-enter--bottom-left {
  animation-name: Toastify__bounceInLeft;
}

.Toastify__bounce-enter--top-right,
.Toastify__bounce-enter--bottom-right {
  animation-name: Toastify__bounceInRight;
}

.Toastify__bounce-enter--top-center {
  animation-name: Toastify__bounceInDown;
}

.Toastify__bounce-enter--bottom-center {
  animation-name: Toastify__bounceInUp;
}

.Toastify__bounce-exit--top-left,
.Toastify__bounce-exit--bottom-left {
  animation-name: Toastify__bounceOutLeft;
}

.Toastify__bounce-exit--top-right,
.Toastify__bounce-exit--bottom-right {
  animation-name: Toastify__bounceOutRight;
}

.Toastify__bounce-exit--top-center {
  animation-name: Toastify__bounceOutUp;
}

.Toastify__bounce-exit--bottom-center {
  animation-name: Toastify__bounceOutDown;
}

@keyframes Toastify__zoomIn {
  from {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }
  50% {
    opacity: 1;
  }
}

@keyframes Toastify__zoomOut {
  from {
    opacity: 1;
  }
  50% {
    opacity: 0;
    transform: translate3d(0, var(--y), 0) scale3d(0.3, 0.3, 0.3);
  }
  to {
    opacity: 0;
  }
}

.Toastify__zoom-enter {
  animation-name: Toastify__zoomIn;
}

.Toastify__zoom-exit {
  animation-name: Toastify__zoomOut;
}

@keyframes Toastify__flipIn {
  from {
    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    animation-timing-function: ease-in;
    opacity: 0;
  }
  40% {
    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    animation-timing-function: ease-in;
  }
  60% {
    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
    opacity: 1;
  }
  80% {
    transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
  }
  to {
    transform: perspective(400px);
  }
}

@keyframes Toastify__flipOut {
  from {
    transform: translate3d(0, var(--y), 0) perspective(400px);
  }
  30% {
    transform: translate3d(0, var(--y), 0) perspective(400px) rotate3d(1, 0, 0, -20deg);
    opacity: 1;
  }
  to {
    transform: translate3d(0, var(--y), 0) perspective(400px) rotate3d(1, 0, 0, 90deg);
    opacity: 0;
  }
}

.Toastify__flip-enter {
  animation-name: Toastify__flipIn;
}

.Toastify__flip-exit {
  animation-name: Toastify__flipOut;
}

@keyframes Toastify__slideInRight {
  from {
    transform: translate3d(110%, 0, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, var(--y), 0);
  }
}

@keyframes Toastify__slideInLeft {
  from {
    transform: translate3d(-110%, 0, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, var(--y), 0);
  }
}

@keyframes Toastify__slideInUp {
  from {
    transform: translate3d(0, 110%, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, var(--y), 0);
  }
}

@keyframes Toastify__slideInDown {
  from {
    transform: translate3d(0, -110%, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, var(--y), 0);
  }
}

@keyframes Toastify__slideOutRight {
  from {
    transform: translate3d(0, var(--y), 0);
  }
  to {
    visibility: hidden;
    transform: translate3d(110%, var(--y), 0);
  }
}

@keyframes Toastify__slideOutLeft {
  from {
    transform: translate3d(0, var(--y), 0);
  }
  to {
    visibility: hidden;
    transform: translate3d(-110%, var(--y), 0);
  }
}

@keyframes Toastify__slideOutDown {
  from {
    transform: translate3d(0, var(--y), 0);
  }
  to {
    visibility: hidden;
    transform: translate3d(0, 500px, 0);
  }
}

@keyframes Toastify__slideOutUp {
  from {
    transform: translate3d(0, var(--y), 0);
  }
  to {
    visibility: hidden;
    transform: translate3d(0, -500px, 0);
  }
}

.Toastify__slide-enter--top-left,
.Toastify__slide-enter--bottom-left {
  animation-name: Toastify__slideInLeft;
}

.Toastify__slide-enter--top-right,
.Toastify__slide-enter--bottom-right {
  animation-name: Toastify__slideInRight;
}

.Toastify__slide-enter--top-center {
  animation-name: Toastify__slideInDown;
}

.Toastify__slide-enter--bottom-center {
  animation-name: Toastify__slideInUp;
}

.Toastify__slide-exit--top-left,
.Toastify__slide-exit--bottom-left {
  animation-name: Toastify__slideOutLeft;
  animation-timing-function: ease-in;
  animation-duration: 0.3s;
}

.Toastify__slide-exit--top-right,
.Toastify__slide-exit--bottom-right {
  animation-name: Toastify__slideOutRight;
  animation-timing-function: ease-in;
  animation-duration: 0.3s;
}

.Toastify__slide-exit--top-center {
  animation-name: Toastify__slideOutUp;
  animation-timing-function: ease-in;
  animation-duration: 0.3s;
}

.Toastify__slide-exit--bottom-center {
  animation-name: Toastify__slideOutDown;
  animation-timing-function: ease-in;
  animation-duration: 0.3s;
}

@keyframes Toastify__spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
`,Fp=new Map,Oy=(n,i)=>{Ym(()=>{if(typeof document>"u")return;let r=document,c=Fp.get(r);if(c){i&&c.setAttribute("nonce",i);return}let f=r.createElement("style");f.textContent=n,i&&f.setAttribute("nonce",i),r.head.appendChild(f),Fp.set(r,f)},[i])};function jy(n){return Oy(ky,n.nonce),yt.createElement(zy,{...n})}var Gm={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},Pp=yt.createContext&&yt.createContext(Gm),By=["attr","size","title"];function Ny(n,i){if(n==null)return{};var r,c,f=My(n,i);if(Object.getOwnPropertySymbols){var h=Object.getOwnPropertySymbols(n);for(c=0;c<h.length;c++)r=h[c],i.indexOf(r)===-1&&{}.propertyIsEnumerable.call(n,r)&&(f[r]=n[r])}return f}function My(n,i){if(n==null)return{};var r={};for(var c in n)if({}.hasOwnProperty.call(n,c)){if(i.indexOf(c)!==-1)continue;r[c]=n[c]}return r}function wr(){return wr=Object.assign?Object.assign.bind():function(n){for(var i=1;i<arguments.length;i++){var r=arguments[i];for(var c in r)({}).hasOwnProperty.call(r,c)&&(n[c]=r[c])}return n},wr.apply(null,arguments)}function Ip(n,i){var r=Object.keys(n);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(n);i&&(c=c.filter(function(f){return Object.getOwnPropertyDescriptor(n,f).enumerable})),r.push.apply(r,c)}return r}function xr(n){for(var i=1;i<arguments.length;i++){var r=arguments[i]!=null?arguments[i]:{};i%2?Ip(Object(r),!0).forEach(function(c){Dy(n,c,r[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(r)):Ip(Object(r)).forEach(function(c){Object.defineProperty(n,c,Object.getOwnPropertyDescriptor(r,c))})}return n}function Dy(n,i,r){return(i=Ry(i))in n?Object.defineProperty(n,i,{value:r,enumerable:!0,configurable:!0,writable:!0}):n[i]=r,n}function Ry(n){var i=Ly(n,"string");return typeof i=="symbol"?i:i+""}function Ly(n,i){if(typeof n!="object"||!n)return n;var r=n[Symbol.toPrimitive];if(r!==void 0){var c=r.call(n,i);if(typeof c!="object")return c;throw new TypeError("@@toPrimitive must return a primitive value.")}return(i==="string"?String:Number)(n)}function Xm(n){return n&&n.map((i,r)=>yt.createElement(i.tag,xr({key:r},i.attr),Xm(i.child)))}function Bt(n){return i=>yt.createElement(Hy,wr({attr:xr({},n.attr)},i),Xm(n.child))}function Hy(n){var i=r=>{var c=n.attr,f=n.size,h=n.title,g=Ny(n,By),v=f||r.size||"1em",y;return r.className&&(y=r.className),n.className&&(y=(y?y+" ":"")+n.className),yt.createElement("svg",wr({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},r.attr,c,g,{className:y,style:xr(xr({color:n.color||r.color},r.style),n.style),height:v,width:v,xmlns:"http://www.w3.org/2000/svg"}),h&&yt.createElement("title",null,h),n.children)};return Pp!==void 0?yt.createElement(Pp.Consumer,null,r=>i(r)):i(Gm)}function Uy(n){return Bt({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M502.285 159.704l-234-156c-7.987-4.915-16.511-4.96-24.571 0l-234 156C3.714 163.703 0 170.847 0 177.989v155.999c0 7.143 3.714 14.286 9.715 18.286l234 156.022c7.987 4.915 16.511 4.96 24.571 0l234-156.022c6-3.999 9.715-11.143 9.715-18.286V177.989c-.001-7.142-3.715-14.286-9.716-18.285zM278 63.131l172.286 114.858-76.857 51.429L278 165.703V63.131zm-44 0v102.572l-95.429 63.715-76.857-51.429L234 63.131zM44 219.132l55.143 36.857L44 292.846v-73.714zm190 229.715L61.714 333.989l76.857-51.429L234 346.275v102.572zm22-140.858l-77.715-52 77.715-52 77.715 52-77.715 52zm22 140.858V346.275l95.429-63.715 76.857 51.429L278 448.847zm190-156.001l-55.143-36.857L468 219.132v73.714z"},child:[]}]})(n)}function qy(n){return Bt({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"},child:[]},{tag:"polygon",attr:{points:"9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"},child:[]}]})(n)}function qi(n){return Bt({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"18",y1:"6",x2:"6",y2:"18"},child:[]},{tag:"line",attr:{x1:"6",y1:"6",x2:"18",y2:"18"},child:[]}]})(n)}function Yy(n){return Bt({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polyline",attr:{points:"3 6 5 6 21 6"},child:[]},{tag:"path",attr:{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"},child:[]},{tag:"line",attr:{x1:"10",y1:"11",x2:"10",y2:"17"},child:[]},{tag:"line",attr:{x1:"14",y1:"11",x2:"14",y2:"17"},child:[]}]})(n)}function Vm(n){return Bt({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"},child:[]},{tag:"line",attr:{x1:"7",y1:"7",x2:"7.01",y2:"7"},child:[]}]})(n)}function Gy(n){return Bt({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polygon",attr:{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"},child:[]}]})(n)}function Xy(n){return Bt({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"circle",attr:{cx:"11",cy:"11",r:"8"},child:[]},{tag:"line",attr:{x1:"21",y1:"21",x2:"16.65",y2:"16.65"},child:[]}]})(n)}function Vy(n){return Bt({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"},child:[]},{tag:"polyline",attr:{points:"17 21 17 13 7 13 7 21"},child:[]},{tag:"polyline",attr:{points:"7 3 7 8 15 8"},child:[]}]})(n)}function Qy(n){return Bt({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"12",y1:"5",x2:"12",y2:"19"},child:[]},{tag:"line",attr:{x1:"5",y1:"12",x2:"19",y2:"12"},child:[]}]})(n)}function $y(n){return Bt({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"3",y1:"12",x2:"21",y2:"12"},child:[]},{tag:"line",attr:{x1:"3",y1:"6",x2:"21",y2:"6"},child:[]},{tag:"line",attr:{x1:"3",y1:"18",x2:"21",y2:"18"},child:[]}]})(n)}function Zy(n){return Bt({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"},child:[]},{tag:"polyline",attr:{points:"22,6 12,13 2,6"},child:[]}]})(n)}function Ky(n){return Bt({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"},child:[]},{tag:"rect",attr:{x:"2",y:"9",width:"4",height:"12"},child:[]},{tag:"circle",attr:{cx:"4",cy:"4",r:"2"},child:[]}]})(n)}function Jy(n){return Bt({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"},child:[]}]})(n)}function Wy(n){return Bt({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"4",y1:"9",x2:"20",y2:"9"},child:[]},{tag:"line",attr:{x1:"4",y1:"15",x2:"20",y2:"15"},child:[]},{tag:"line",attr:{x1:"10",y1:"3",x2:"8",y2:"21"},child:[]},{tag:"line",attr:{x1:"16",y1:"3",x2:"14",y2:"21"},child:[]}]})(n)}function Fy(n){return Bt({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"circle",attr:{cx:"12",cy:"12",r:"10"},child:[]},{tag:"line",attr:{x1:"2",y1:"12",x2:"22",y2:"12"},child:[]},{tag:"path",attr:{d:"M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"},child:[]}]})(n)}function Qm(n){return Bt({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"},child:[]}]})(n)}function tm(n){return Bt({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polygon",attr:{points:"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"},child:[]}]})(n)}function $m(n){return Bt({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"},child:[]},{tag:"polyline",attr:{points:"14 2 14 8 20 8"},child:[]},{tag:"line",attr:{x1:"16",y1:"13",x2:"8",y2:"13"},child:[]},{tag:"line",attr:{x1:"16",y1:"17",x2:"8",y2:"17"},child:[]},{tag:"polyline",attr:{points:"10 9 9 9 8 9"},child:[]}]})(n)}function Py(n){return Bt({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"},child:[]}]})(n)}function Iy(n){return Bt({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"},child:[]},{tag:"circle",attr:{cx:"12",cy:"12",r:"3"},child:[]}]})(n)}function Su(n){return Bt({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M12 20h9"},child:[]},{tag:"path",attr:{d:"M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"},child:[]}]})(n)}function tb(n){return Bt({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M18 8h1a4 4 0 0 1 0 8h-1"},child:[]},{tag:"path",attr:{d:"M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"},child:[]},{tag:"line",attr:{x1:"6",y1:"1",x2:"6",y2:"4"},child:[]},{tag:"line",attr:{x1:"10",y1:"1",x2:"10",y2:"4"},child:[]},{tag:"line",attr:{x1:"14",y1:"1",x2:"14",y2:"4"},child:[]}]})(n)}function eb(n){return Bt({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polyline",attr:{points:"18 15 12 9 6 15"},child:[]}]})(n)}function ab(n){return Bt({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polyline",attr:{points:"9 18 15 12 9 6"},child:[]}]})(n)}function nb(n){return Bt({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polyline",attr:{points:"15 18 9 12 15 6"},child:[]}]})(n)}function lb(n){return Bt({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polyline",attr:{points:"6 9 12 15 18 9"},child:[]}]})(n)}function ib(n){return Bt({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"rect",attr:{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"},child:[]},{tag:"line",attr:{x1:"16",y1:"2",x2:"16",y2:"6"},child:[]},{tag:"line",attr:{x1:"8",y1:"2",x2:"8",y2:"6"},child:[]},{tag:"line",attr:{x1:"3",y1:"10",x2:"21",y2:"10"},child:[]}]})(n)}function Zm(n){return Bt({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"12",y1:"19",x2:"12",y2:"5"},child:[]},{tag:"polyline",attr:{points:"5 12 12 5 19 12"},child:[]}]})(n)}var Ut="-ms-",Li="-moz-",zt="-webkit-",Km="comm",Rr="rule",Ru="decl",ob="@import",rb="@namespace",Jm="@keyframes",sb="@layer",Wm=Math.abs,Lu=String.fromCharCode,Tu=Object.assign;function cb(n,i){return ae(n,0)^45?(((i<<2^ae(n,0))<<2^ae(n,1))<<2^ae(n,2))<<2^ae(n,3):0}function Fm(n){return n.trim()}function Ca(n,i){return(n=i.exec(n))?n[0]:n}function pt(n,i,r){return n.replace(i,r)}function pr(n,i,r){return n.indexOf(i,r)}function ae(n,i){return n.charCodeAt(i)|0}function Rn(n,i,r){return n.slice(i,r)}function ta(n){return n.length}function Pm(n){return n.length}function Di(n,i){return i.push(n),n}function ub(n,i){return n.map(i).join("")}function em(n,i){return n.filter(function(r){return!Ca(r,i)})}var Lr=1,_l=1,Im=0,Ke=0,It=0,Ol="";function Hr(n,i,r,c,f,h,g,v){return{value:n,root:i,parent:r,type:c,props:f,children:h,line:Lr,column:_l,length:g,return:"",siblings:v}}function tn(n,i){return Tu(Hr("",null,null,"",null,null,0,n.siblings),n,{length:-n.length},i)}function Sl(n){for(;n.root;)n=tn(n.root,{children:[n]});Di(n,n.siblings)}function fb(){return It}function db(){return It=Ke>0?ae(Ol,--Ke):0,_l--,It===10&&(_l=1,Lr--),It}function ea(){return It=Ke<Im?ae(Ol,Ke++):0,_l++,It===10&&(_l=1,Lr++),It}function an(){return ae(Ol,Ke)}function mr(){return Ke}function Ur(n,i){return Rn(Ol,n,i)}function Yi(n){switch(n){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function hb(n){return Lr=_l=1,Im=ta(Ol=n),Ke=0,[]}function pb(n){return Ol="",n}function uu(n){return Fm(Ur(Ke-1,Eu(n===91?n+2:n===40?n+1:n)))}function mb(n){for(;(It=an())&&It<33;)ea();return Yi(n)>2||Yi(It)>3?"":" "}function gb(n,i){for(;--i&&ea()&&!(It<48||It>102||It>57&&It<65||It>70&&It<97););return Ur(n,mr()+(i<6&&an()==32&&ea()==32))}function Eu(n){for(;ea();)switch(It){case n:return Ke;case 34:case 39:n!==34&&n!==39&&Eu(It);break;case 40:n===41&&Eu(n);break;case 92:ea();break}return Ke}function yb(n,i){for(;ea()&&n+It!==57;)if(n+It===84&&an()===47)break;return"/*"+Ur(i,Ke-1)+"*"+Lu(n===47?n:ea())}function bb(n){for(;!Yi(an());)ea();return Ur(n,Ke)}function vb(n){return pb(gr("",null,null,null,[""],n=hb(n),0,[0],n))}function gr(n,i,r,c,f,h,g,v,y){for(var w=0,j=0,R=g,M=0,F=0,G=0,Q=1,Z=1,K=1,k=0,q="",P=f,L=h,it=c,U=q;Z;)switch(G=k,k=ea()){case 40:if(G!=108&&ae(U,R-1)==58){pr(U+=pt(uu(k),"&","&\f"),"&\f",Wm(w?v[w-1]:0))!=-1&&(K=-1);break}case 34:case 39:case 91:U+=uu(k);break;case 9:case 10:case 13:case 32:U+=mb(G);break;case 92:U+=gb(mr()-1,7);continue;case 47:switch(an()){case 42:case 47:Di(wb(yb(ea(),mr()),i,r,y),y),(Yi(G||1)==5||Yi(an()||1)==5)&&ta(U)&&Rn(U,-1,void 0)!==" "&&(U+=" ");break;default:U+="/"}break;case 123*Q:v[w++]=ta(U)*K;case 125*Q:case 59:case 0:switch(k){case 0:case 125:Z=0;case 59+j:K==-1&&(U=pt(U,/\f/g,"")),F>0&&(ta(U)-R||Q===0&&G===47)&&Di(F>32?nm(U+";",c,r,R-1,y):nm(pt(U," ","")+";",c,r,R-2,y),y);break;case 59:U+=";";default:if(Di(it=am(U,i,r,w,j,f,v,q,P=[],L=[],R,h),h),k===123)if(j===0)gr(U,i,it,it,P,h,R,v,L);else{switch(M){case 99:if(ae(U,3)===110)break;case 108:if(ae(U,2)===97)break;default:j=0;case 100:case 109:case 115:}j?gr(n,it,it,c&&Di(am(n,it,it,0,0,f,v,q,f,P=[],R,L),L),f,L,R,v,c?P:L):gr(U,it,it,it,[""],L,0,v,L)}}w=j=F=0,Q=K=1,q=U="",R=g;break;case 58:R=1+ta(U),F=G;default:if(Q<1){if(k==123)--Q;else if(k==125&&Q++==0&&db()==125)continue}switch(U+=Lu(k),k*Q){case 38:K=j>0?1:(U+="\f",-1);break;case 44:v[w++]=(ta(U)-1)*K,K=1;break;case 64:an()===45&&(U+=uu(ea())),M=an(),j=R=ta(q=U+=bb(mr())),k++;break;case 45:G===45&&ta(U)==2&&(Q=0)}}return h}function am(n,i,r,c,f,h,g,v,y,w,j,R){for(var M=f-1,F=f===0?h:[""],G=Pm(F),Q=0,Z=0,K=0;Q<c;++Q)for(var k=0,q=Rn(n,M+1,M=Wm(Z=g[Q])),P=n;k<G;++k)(P=Fm(Z>0?F[k]+" "+q:pt(q,/&\f/g,F[k])))&&(y[K++]=P);return Hr(n,i,r,f===0?Rr:v,y,w,j,R)}function wb(n,i,r,c){return Hr(n,i,r,Km,Lu(fb()),Rn(n,2,-2),0,c)}function nm(n,i,r,c,f){return Hr(n,i,r,Ru,Rn(n,0,c),Rn(n,c+1,-1),c,f)}function t0(n,i,r){switch(cb(n,i)){case 5103:return zt+"print-"+n+n;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:case 6391:case 5879:case 5623:case 6135:case 4599:return zt+n+n;case 4855:return zt+n.replace("add","source-over").replace("substract","source-out").replace("intersect","source-in").replace("exclude","xor")+n;case 4789:return Li+n+n;case 5349:case 4246:case 4810:case 6968:case 2756:return zt+n+Li+n+Ut+n+n;case 5936:switch(ae(n,i+11)){case 114:return zt+n+Ut+pt(n,/[svh]\w+-[tblr]{2}/,"tb")+n;case 108:return zt+n+Ut+pt(n,/[svh]\w+-[tblr]{2}/,"tb-rl")+n;case 45:return zt+n+Ut+pt(n,/[svh]\w+-[tblr]{2}/,"lr")+n}case 6828:case 4268:case 2903:return zt+n+Ut+n+n;case 6165:return zt+n+Ut+"flex-"+n+n;case 5187:return zt+n+pt(n,/(\w+).+(:[^]+)/,zt+"box-$1$2"+Ut+"flex-$1$2")+n;case 5443:return zt+n+Ut+"flex-item-"+pt(n,/flex-|-self/g,"")+(Ca(n,/flex-|baseline/)?"":Ut+"grid-row-"+pt(n,/flex-|-self/g,""))+n;case 4675:return zt+n+Ut+"flex-line-pack"+pt(n,/align-content|flex-|-self/g,"")+n;case 5548:return zt+n+Ut+pt(n,"shrink","negative")+n;case 5292:return zt+n+Ut+pt(n,"basis","preferred-size")+n;case 6060:return zt+"box-"+pt(n,"-grow","")+zt+n+Ut+pt(n,"grow","positive")+n;case 4554:return zt+pt(n,/([^-])(transform)/g,"$1"+zt+"$2")+n;case 6187:return pt(pt(pt(n,/(zoom-|grab)/,zt+"$1"),/(image-set)/,zt+"$1"),n,"")+n;case 5495:case 3959:return pt(n,/(image-set\([^]*)/,zt+"$1$`$1");case 4968:return pt(pt(n,/(.+:)(flex-)?(.*)/,zt+"box-pack:$3"+Ut+"flex-pack:$3"),/space-between/,"justify")+zt+n+n;case 4200:if(!Ca(n,/flex-|baseline/))return Ut+"grid-column-align"+Rn(n,i)+n;break;case 2592:case 3360:return Ut+pt(n,"template-","")+n;case 4384:case 3616:return r&&r.some(function(c,f){return i=f,Ca(c.props,/grid-\w+-end/)})?~pr(n+(r=r[i].value),"span",0)?n:Ut+pt(n,"-start","")+n+Ut+"grid-row-span:"+(~pr(r,"span",0)?Ca(r,/\d+/):+Ca(r,/\d+/)-+Ca(n,/\d+/))+";":Ut+pt(n,"-start","")+n;case 4896:case 4128:return r&&r.some(function(c){return Ca(c.props,/grid-\w+-start/)})?n:Ut+pt(pt(n,"-end","-span"),"span ","")+n;case 4095:case 3583:case 4068:case 2532:return pt(n,/(.+)-inline(.+)/,zt+"$1$2")+n;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(ta(n)-1-i>6)switch(ae(n,i+1)){case 109:if(ae(n,i+4)!==45)break;case 102:return pt(n,/(.+:)(.+)-([^]+)/,"$1"+zt+"$2-$3$1"+Li+(ae(n,i+3)==108?"$3":"$2-$3"))+n;case 115:return~pr(n,"stretch",0)?t0(pt(n,"stretch","fill-available"),i,r)+n:n}break;case 5152:case 5920:return pt(n,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(c,f,h,g,v,y,w){return Ut+f+":"+h+w+(g?Ut+f+"-span:"+(v?y:+y-+h)+w:"")+n});case 4949:if(ae(n,i+6)===121)return pt(n,":",":"+zt)+n;break;case 6444:switch(ae(n,ae(n,14)===45?18:11)){case 120:return pt(n,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+zt+(ae(n,14)===45?"inline-":"")+"box$3$1"+zt+"$2$3$1"+Ut+"$2box$3")+n;case 100:return pt(n,":",":"+Ut)+n}break;case 5719:case 2647:case 2135:case 3927:case 2391:return pt(n,"scroll-","scroll-snap-")+n}return n}function Sr(n,i){for(var r="",c=0;c<n.length;c++)r+=i(n[c],c,n,i)||"";return r}function xb(n,i,r,c){switch(n.type){case sb:if(n.children.length)break;case ob:case rb:case Ru:return n.return=n.return||n.value;case Km:return"";case Jm:return n.return=n.value+"{"+Sr(n.children,c)+"}";case Rr:if(!ta(n.value=n.props.join(",")))return""}return ta(r=Sr(n.children,c))?n.return=n.value+"{"+r+"}":""}function Sb(n){var i=Pm(n);return function(r,c,f,h){for(var g="",v=0;v<i;v++)g+=n[v](r,c,f,h)||"";return g}}function Tb(n){return function(i){i.root||(i=i.return)&&n(i)}}function Eb(n,i,r,c){if(n.length>-1&&!n.return)switch(n.type){case Ru:n.return=t0(n.value,n.length,r);return;case Jm:return Sr([tn(n,{value:pt(n.value,"@","@"+zt)})],c);case Rr:if(n.length)return ub(r=n.props,function(f){switch(Ca(f,c=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":Sl(tn(n,{props:[pt(f,/:(read-\w+)/,":"+Li+"$1")]})),Sl(tn(n,{props:[f]})),Tu(n,{props:em(r,c)});break;case"::placeholder":Sl(tn(n,{props:[pt(f,/:(plac\w+)/,":"+zt+"input-$1")]})),Sl(tn(n,{props:[pt(f,/:(plac\w+)/,":"+Li+"$1")]})),Sl(tn(n,{props:[pt(f,/:(plac\w+)/,Ut+"input-$1")]})),Sl(tn(n,{props:[f]})),Tu(n,{props:em(r,c)});break}return""})}}var Tl={},fu,du;const Al=typeof process<"u"&&Tl!==void 0&&(Tl.REACT_APP_SC_ATTR||Tl.SC_ATTR)||"data-styled",e0="active",a0="data-styled-version",qr="6.5.3",Hu=`/*!sc*/
`,Hi=typeof window<"u"&&typeof document<"u";function lm(n){if(typeof process<"u"&&Tl!==void 0){const i=Tl[n];if(i!==void 0&&i!=="")return i!=="false"}}const _b=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:(du=(fu=lm("REACT_APP_SC_DISABLE_SPEEDY"))!==null&&fu!==void 0?fu:lm("SC_DISABLE_SPEEDY"))!==null&&du!==void 0?du:typeof process<"u"&&Tl!==void 0&&!1),Ab="sc-keyframes-";function Yr(n,...i){return new Error(`An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#${n} for more information.${i.length>0?` Args: ${i.join(", ")}`:""}`)}let yr=new Map,Tr=new Map,br=1;const dr=n=>{if(yr.has(n))return yr.get(n);for(;Tr.has(br);)br++;const i=br++;return yr.set(n,i),Tr.set(i,n),i},Cb=n=>Tr.get(n),zb=(n,i)=>{br=i+1,yr.set(n,i),Tr.set(i,n)},Uu=Object.freeze([]),Cl=Object.freeze({});function kb(n,i,r=Cl){return n.theme!==r.theme&&n.theme||i||r.theme}const Ob=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,jb=/(^-|-$)/g;function n0(n){return n.replace(Ob,"-").replace(jb,"")}const Bb=/(a)(d)/gi,im=n=>String.fromCharCode(n+(n>25?39:97));function l0(n){let i,r="";for(i=Math.abs(n);i>52;i=i/52|0)r=im(i%52)+r;return(im(i%52)+r).replace(Bb,"$1-$2")}const _u=5381,Bn=(n,i)=>{let r=i.length;for(;r;)n=33*n^i.charCodeAt(--r);return n},i0=n=>Bn(_u,n);function Nb(n){return l0(i0(n)>>>0)}function Mb(n){return n.displayName||n.name||"Component"}function Au(n){return typeof n=="string"&&!0}function Db(n){return Au(n)?`styled.${n}`:`Styled(${Mb(n)})`}const o0=Symbol.for("react.memo"),Rb=Symbol.for("react.forward_ref"),Lb={contextType:!0,defaultProps:!0,displayName:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,propTypes:!0,type:!0},Hb={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},r0={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},Ub={[Rb]:{$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},[o0]:r0};function om(n){return("type"in(i=n)&&i.type.$$typeof)===o0?r0:"$$typeof"in n?Ub[n.$$typeof]:Lb;var i}const qb=Object.defineProperty,Yb=Object.getOwnPropertyNames,Gb=Object.getOwnPropertySymbols,Xb=Object.getOwnPropertyDescriptor,Vb=Object.getPrototypeOf,Qb=Object.prototype;function s0(n,i,r){if(typeof i!="string"){const c=Vb(i);c&&c!==Qb&&s0(n,c,r);const f=Yb(i).concat(Gb(i)),h=om(n),g=om(i);for(let v=0;v<f.length;++v){const y=f[v];if(!(y in Hb||r&&r[y]||g&&y in g||h&&y in h)){const w=Xb(i,y);try{qb(n,y,w)}catch{}}}}return n}function Gr(n){return typeof n=="function"}const $b=Symbol.for("react.forward_ref");function c0(n){return n!=null&&(typeof n=="object"||typeof n=="function")&&n.$$typeof===$b&&"styledComponentId"in n}function Ri(n,i){return n&&i?n+" "+i:n||i||""}function rm(n,i){return n.join("")}function Gi(n){return n!==null&&typeof n=="object"&&n.constructor.name===Object.name&&!("props"in n&&n.$$typeof)}function Cu(n,i,r=!1){if(!r&&!Gi(n)&&!Array.isArray(n))return i;if(Array.isArray(i))for(let c=0;c<i.length;c++)n[c]=Cu(n[c],i[c]);else if(Gi(i))for(const c in i)n[c]=Cu(n[c],i[c]);return n}function u0(n,i){Object.defineProperty(n,"toString",{value:i})}const Zb=class{constructor(n){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=n,this._cGroup=0,this._cIndex=0}indexOfGroup(n){if(n===this._cGroup)return this._cIndex;let i=this._cIndex;if(n>this._cGroup)for(let r=this._cGroup;r<n;r++)i+=this.groupSizes[r];else for(let r=this._cGroup-1;r>=n;r--)i-=this.groupSizes[r];return this._cGroup=n,this._cIndex=i,i}insertRules(n,i){if(n>=this.groupSizes.length){const f=this.groupSizes,h=f.length;let g=h;for(;n>=g;)if(g<<=1,g<0)throw Yr(16,`${n}`);this.groupSizes=new Uint32Array(g),this.groupSizes.set(f),this.length=g;for(let v=h;v<g;v++)this.groupSizes[v]=0}let r=this.indexOfGroup(n+1),c=0;for(let f=0,h=i.length;f<h;f++)this.tag.insertRule(r,i[f])&&(this.groupSizes[n]++,r++,c++);c>0&&this._cGroup>n&&(this._cIndex+=c)}clearGroup(n){if(n<this.length){const i=this.groupSizes[n],r=this.indexOfGroup(n),c=r+i;this.groupSizes[n]=0;for(let f=r;f<c;f++)this.tag.deleteRule(r);i>0&&this._cGroup>n&&(this._cIndex-=i)}}getGroup(n){let i="";if(n>=this.length||this.groupSizes[n]===0)return i;const r=this.groupSizes[n],c=this.indexOfGroup(n),f=c+r;for(let h=c;h<f;h++)i+=this.tag.getRule(h)+Hu;return i}},Kb=`style[${Al}][${a0}="${qr}"]`,Jb=new RegExp(`^${Al}\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)`),sm=n=>typeof ShadowRoot<"u"&&n instanceof ShadowRoot||"host"in n&&n.nodeType===11,zu=n=>{if(!n)return document;if(sm(n))return n;if("getRootNode"in n){const i=n.getRootNode();if(sm(i))return i}return document},Wb=(n,i,r)=>{const c=r.split(",");let f;for(let h=0,g=c.length;h<g;h++)(f=c[h])&&n.registerName(i,f)},Fb=(n,i)=>{var r;const c=((r=i.textContent)!==null&&r!==void 0?r:"").split(Hu),f=[];for(let h=0,g=c.length;h<g;h++){const v=c[h].trim();if(!v)continue;const y=v.match(Jb);if(y){const w=0|parseInt(y[1],10),j=y[2];w!==0&&(zb(j,w),Wb(n,j,y[3]),n.getTag().insertRules(w,f)),f.length=0}else f.push(v)}},hu=n=>{const i=zu(n.options.target).querySelectorAll(Kb);for(let r=0,c=i.length;r<c;r++){const f=i[r];f&&f.getAttribute(Al)!==e0&&(Fb(n,f),f.parentNode&&f.parentNode.removeChild(f))}};let Mi=!1;function Pb(){if(Mi!==!1)return Mi;if(typeof document<"u"){const n=document.head.querySelector('meta[property="csp-nonce"]');if(n)return Mi=n.nonce||n.getAttribute("content")||void 0;const i=document.head.querySelector('meta[name="sc-nonce"]');if(i)return Mi=i.getAttribute("content")||void 0}return Mi=typeof __webpack_nonce__<"u"?__webpack_nonce__:void 0}const f0=(n,i)=>{const r=document.head,c=n||r,f=document.createElement("style"),h=(y=>{const w=Array.from(y.querySelectorAll(`style[${Al}]`));return w[w.length-1]})(c),g=h!==void 0?h.nextSibling:null;f.setAttribute(Al,e0),f.setAttribute(a0,qr);const v=i||Pb();return v&&f.setAttribute("nonce",v),c.insertBefore(f,g),f},Ib=class{constructor(n,i){this.element=f0(n,i),this.element.appendChild(document.createTextNode("")),this.sheet=(r=>{var c;if(r.sheet)return r.sheet;const f=(c=r.getRootNode().styleSheets)!==null&&c!==void 0?c:document.styleSheets;for(let h=0,g=f.length;h<g;h++){const v=f[h];if(v.ownerNode===r)return v}throw Yr(17)})(this.element),this.length=0}insertRule(n,i){try{return this.sheet.insertRule(i,n),this.length++,!0}catch{return!1}}deleteRule(n){this.sheet.deleteRule(n),this.length--}getRule(n){const i=this.sheet.cssRules[n];return i&&i.cssText?i.cssText:""}},tv=class{constructor(n,i){this.element=f0(n,i),this.nodes=this.element.childNodes,this.length=0}insertRule(n,i){if(n<=this.length&&n>=0){const r=document.createTextNode(i);return this.element.insertBefore(r,this.nodes[n]||null),this.length++,!0}return!1}deleteRule(n){this.element.removeChild(this.nodes[n]),this.length--}getRule(n){return n<this.length?this.nodes[n].textContent:""}};let cm=Hi;const ev={isServer:!Hi,useCSSOMInjection:!_b};class Xr{static registerId(i){return dr(i)}constructor(i=Cl,r={},c){this.options=Object.assign(Object.assign({},ev),i),this.gs=r,this.keyframeIds=new Set,this.names=new Map(c),this.server=!!i.isServer,!this.server&&Hi&&cm&&(cm=!1,hu(this)),u0(this,()=>(f=>{const h=f.getTag(),{length:g}=h;let v="";for(let y=0;y<g;y++){const w=Cb(y);if(w===void 0)continue;const j=f.names.get(w);if(j===void 0||!j.size)continue;const R=h.getGroup(y);if(R.length===0)continue;const M=Al+".g"+y+'[id="'+w+'"]';let F="";for(const G of j)G.length>0&&(F+=G+",");v+=R+M+'{content:"'+F+'"}'+Hu}return v})(this))}rehydrate(){!this.server&&Hi&&hu(this)}reconstructWithOptions(i,r=!0){const c=new Xr(Object.assign(Object.assign({},this.options),i),this.gs,r&&this.names||void 0);return c.keyframeIds=new Set(this.keyframeIds),!this.server&&Hi&&i.target!==this.options.target&&zu(this.options.target)!==zu(i.target)&&hu(c),c}allocateGSInstance(i){return this.gs[i]=(this.gs[i]||0)+1}getTag(){return this.tag||(this.tag=(i=(({useCSSOMInjection:r,target:c,nonce:f})=>r?new Ib(c,f):new tv(c,f))(this.options),new Zb(i)));var i}hasNameForId(i,r){var c,f;return(f=(c=this.names.get(i))===null||c===void 0?void 0:c.has(r))!==null&&f!==void 0&&f}registerName(i,r){dr(i),i.startsWith(Ab)&&this.keyframeIds.add(i);const c=this.names.get(i);c?c.add(r):this.names.set(i,new Set([r]))}insertRules(i,r,c){this.registerName(i,r),this.getTag().insertRules(dr(i),c)}clearNames(i){this.names.has(i)&&this.names.get(i).clear()}clearRules(i){this.getTag().clearGroup(dr(i)),this.clearNames(i)}clearTag(){this.tag=void 0}}const d0=new WeakSet,av={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexShrink:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,scale:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1};function nv(n,i){return i==null||typeof i=="boolean"||i===""?"":typeof i!="number"||i===0||n in av||n.startsWith("--")?String(i).trim():i+"px"}const On=47;function um(n){if(n.charCodeAt(0)===45&&n.charCodeAt(1)===45)return n;let i="";for(let r=0;r<n.length;r++){const c=n.charCodeAt(r);i+=c>=65&&c<=90?"-"+String.fromCharCode(c+32):n[r]}return i.startsWith("ms-")?"-"+i:i}const lv=Symbol.for("sc-keyframes");function iv(n){return typeof n=="object"&&n!==null&&lv in n}function h0(n){return Gr(n)&&!(n.prototype&&n.prototype.isReactComponent)}const p0=n=>n==null||n===!1||n==="",ov=Symbol.for("react.client.reference");function fm(n){return n.$$typeof===ov}function m0(n,i){for(const r in n){const c=n[r];n.hasOwnProperty(r)&&!p0(c)&&(Array.isArray(c)&&d0.has(c)||Gr(c)?i.push(um(r)+":",c,";"):Gi(c)?(i.push(r+" {"),m0(c,i),i.push("}")):i.push(um(r)+": "+nv(r,c)+";"))}}function Nn(n,i,r,c,f=[]){if(p0(n))return f;const h=typeof n;if(h==="string")return f.push(n),f;if(h==="function"){if(fm(n))return f;if(h0(n)&&i){const g=n(i);return Nn(g,i,r,c,f)}return f.push(n),f}if(Array.isArray(n)){for(let g=0;g<n.length;g++)Nn(n[g],i,r,c,f);return f}return c0(n)?(f.push(`.${n.styledComponentId}`),f):iv(n)?(r?(n.inject(r,c),f.push(n.getName(c))):f.push(n),f):fm(n)?f:Gi(n)?n.toString!==Object.prototype.toString?(f.push(n.toString()),f):(m0(n,f),f):(f.push(n.toString()),f)}const rv=i0(qr);class sv{constructor(i,r,c){this.rules=i,this.componentId=r,this.baseHash=Bn(rv,r),this.baseStyle=c,Xr.registerId(r)}generateAndInjectStyles(i,r,c){let f=this.baseStyle?this.baseStyle.generateAndInjectStyles(i,r,c):"";{let h="";for(let g=0;g<this.rules.length;g++){const v=this.rules[g];if(typeof v=="string")h+=v;else if(v)if(h0(v)){const y=v(i);typeof y=="string"?h+=y:y!=null&&y!==!1&&(h+=rm(Nn(y,i,r,c)))}else h+=rm(Nn(v,i,r,c))}if(h){this.dynamicNameCache||(this.dynamicNameCache=new Map);const g=c.hash?c.hash+h:h;let v=this.dynamicNameCache.get(g);if(!v){if(v=l0(Bn(Bn(this.baseHash,c.hash),h)>>>0),this.dynamicNameCache.size>=200){const y=this.dynamicNameCache.keys().next().value;y!==void 0&&this.dynamicNameCache.delete(y)}this.dynamicNameCache.set(g,v)}if(!r.hasNameForId(this.componentId,v)){const y=c(h,"."+v,void 0,this.componentId);r.insertRules(this.componentId,v,y)}f=Ri(f,v)}}return f}}const cv=/&/g;function g0(n,i){let r=0;for(;--i>=0&&n.charCodeAt(i)===92;)r++;return!(1&~r)}function pu(n){const i=n.length;let r="",c=0,f=0,h=0,g=!1,v=!1;for(let y=0;y<i;y++){const w=n.charCodeAt(y);if(h!==0||g||w!==On||n.charCodeAt(y+1)!==42)if(g)w===42&&n.charCodeAt(y+1)===On&&(g=!1,y++);else if(w!==34&&w!==39||g0(n,y)){if(h===0)if(w===123)f++;else if(w===125){if(f--,f<0){v=!0;let j=y+1;for(;j<i;){const R=n.charCodeAt(j);if(R===59||R===10)break;j++}j<i&&n.charCodeAt(j)===59&&j++,f=0,y=j-1,c=j;continue}f===0&&(r+=n.substring(c,y+1),c=y+1)}else w===59&&f===0&&(r+=n.substring(c,y+1),c=y+1)}else h===0?h=w:h===w&&(h=0);else g=!0,y++}return v||f!==0||h!==0?(c<i&&f===0&&h===0&&(r+=n.substring(c)),r):n}function y0(n,i){const r=i+" ",c=","+r;for(let f=0;f<n.length;f++){const h=n[f];if(h.type==="rule"){h.value=(r+h.value).replaceAll(",",c);const g=h.props,v=[];for(let y=0;y<g.length;y++)v[y]=r+g[y];h.props=v}Array.isArray(h.children)&&h.type!=="@keyframes"&&y0(h.children,i)}return n}function uv({options:n=Cl,plugins:i=Uu}=Cl){let r,c,f;const h=(M,F,G)=>G.startsWith(c)&&G.endsWith(c)&&G.replaceAll(c,"").length>0?`.${r}`:M,g=i.slice();g.push(M=>{M.type===Rr&&M.value.includes("&")&&(f||(f=new RegExp(`\\${c}\\b`,"g")),M.props[0]=M.props[0].replace(cv,c).replace(f,h))}),n.prefix&&g.push(Eb),g.push(xb);let v=[];const y=Sb(g.concat(Tb(M=>v.push(M)))),w=(M,F="",G="",Q="&")=>{r=Q,c=F,f=void 0;const Z=function(k){const q=k.indexOf("//")!==-1,P=k.indexOf("}")!==-1;if(!q&&!P)return k;if(!q)return pu(k);const L=k.length;let it="",U=0,X=0,Y=0,W=0,bt=0,Gt=!1;for(;X<L;){const mt=k.charCodeAt(X);if(mt!==34&&mt!==39||g0(k,X))if(Y===0)if(mt===On&&X+1<L&&k.charCodeAt(X+1)===42){for(X+=2;X+1<L&&(k.charCodeAt(X)!==42||k.charCodeAt(X+1)!==On);)X++;X+=2}else if(mt!==40)if(mt!==41)if(W>0)X++;else if(mt===42&&X+1<L&&k.charCodeAt(X+1)===On)it+=k.substring(U,X),X+=2,U=X,Gt=!0;else if(mt===On&&X+1<L&&k.charCodeAt(X+1)===On){for(it+=k.substring(U,X);X<L&&k.charCodeAt(X)!==10;)X++;U=X,Gt=!0}else mt===123?bt++:mt===125&&bt--,X++;else W>0&&W--,X++;else W++,X++;else X++;else Y===0?Y=mt:Y===mt&&(Y=0),X++}return Gt?(U<L&&(it+=k.substring(U)),bt===0?it:pu(it)):bt===0?k:pu(k)}(M);let K=vb(G||F?G+" "+F+" { "+Z+" }":Z);return n.namespace&&(K=y0(K,n.namespace)),v=[],Sr(K,y),v},j=n;let R=_u;for(let M=0;M<i.length;M++)i[M].name||Yr(15),R=Bn(R,i[M].name);return j!=null&&j.namespace&&(R=Bn(R,j.namespace)),j!=null&&j.prefix&&(R=Bn(R,"p")),w.hash=R!==_u?R.toString():"",w}const fv=new Xr,dv=uv(),b0=yt.createContext({shouldForwardProp:void 0,styleSheet:fv,stylis:dv,stylisPlugins:void 0});b0.Consumer;function hv(){return yt.useContext(b0)}const v0=yt.createContext(void 0);v0.Consumer;const dm=Object.prototype.hasOwnProperty,mu={};function pv(n,i){const r=typeof n!="string"?"sc":n0(n);mu[r]=(mu[r]||0)+1;const c=r+"-"+Nb(qr+r+mu[r]);return i?i+"-"+c:c}function mv(n,i,r){const c=c0(n),f=n,h=!Au(n),{attrs:g=Uu,componentId:v=pv(i.displayName,i.parentComponentId),displayName:y=Db(n)}=i,w=i.displayName&&i.componentId?n0(i.displayName)+"-"+i.componentId:i.componentId||v,j=c&&f.attrs?f.attrs.concat(g).filter(Boolean):g;let{shouldForwardProp:R}=i;if(c&&f.shouldForwardProp){const Q=f.shouldForwardProp;if(i.shouldForwardProp){const Z=i.shouldForwardProp;R=(K,k)=>Q(K,k)&&Z(K,k)}else R=Q}const M=new sv(r,w,c?f.componentStyle:void 0);function F(Q,Z){return function(K,k,q){const{attrs:P,componentStyle:L,defaultProps:it,foldedComponentIds:U,styledComponentId:X,target:Y}=K,W=yt.useContext(v0),bt=hv(),Gt=K.shouldForwardProp||bt.shouldForwardProp,mt=kb(k,W,it)||Cl;let Xt,Ht;{const wt=yt.useRef(null),b=wt.current;if(b!==null&&b[1]===mt&&b[2]===bt.styleSheet&&b[3]===bt.stylis&&b[7]===L&&function(N,J,V){const H=N,ot=J;let ct=0;for(const at in ot)if(dm.call(ot,at)&&(ct++,H[at]!==ot[at]))return!1;return ct===V}(b[0],k,b[4]))Xt=b[5],Ht=b[6];else{Xt=function(J,V,H){const ot=Object.assign(Object.assign({},V),{className:void 0,theme:H}),ct=J.length>1;for(let at=0;at<J.length;at++){const ut=J[at],St=Gr(ut)?ut(ct?Object.assign({},ot):ot):ut;for(const dt in St)dt==="className"?ot.className=Ri(ot.className,St[dt]):dt==="style"?ot.style=Object.assign(Object.assign({},ot.style),St[dt]):dt in V&&V[dt]===void 0||(ot[dt]=St[dt])}return"className"in V&&typeof V.className=="string"&&(ot.className=Ri(ot.className,V.className)),ot}(P,k,mt),Ht=L.generateAndInjectStyles(Xt,bt.styleSheet,bt.stylis);let N=0;for(const J in k)dm.call(k,J)&&N++;wt.current=[k,mt,bt.styleSheet,bt.stylis,N,Xt,Ht,L]}}const D=Xt.as||Y,lt=function(wt,b,N,J){const V={};for(const H in wt)wt[H]===void 0||H[0]==="$"||H==="as"||H==="theme"&&wt.theme===N||(H==="forwardedAs"?V.as=wt.forwardedAs:J&&!J(H,b)||(V[H]=wt[H]));return V}(Xt,D,mt,Gt);let I=Ri(U,X);return Ht&&(I+=" "+Ht),Xt.className&&(I+=" "+Xt.className),lt[Au(D)&&D.includes("-")?"class":"className"]=I,q&&(lt.ref=q),st.createElement(D,lt)}(G,Q,Z)}F.displayName=y;let G=yt.forwardRef(F);return G.attrs=j,G.componentStyle=M,G.displayName=y,G.shouldForwardProp=R,G.foldedComponentIds=c?Ri(f.foldedComponentIds,f.styledComponentId):"",G.styledComponentId=w,G.target=c?f.target:n,Object.defineProperty(G,"defaultProps",{get(){return this._foldedDefaultProps},set(Q){this._foldedDefaultProps=c?function(Z,...K){for(const k of K)Cu(Z,k,!0);return Z}({},f.defaultProps,Q):Q}}),u0(G,()=>`.${G.styledComponentId}`),h&&s0(G,n,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),G}var gv=new Set(["a","abbr","address","area","article","aside","audio","b","bdi","bdo","blockquote","body","button","br","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","label","legend","li","main","map","mark","menu","meter","nav","object","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","slot","small","span","strong","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","switch","symbol","text","textPath","tspan","use"]);function hm(n,i){const r=[n[0]];for(let c=0,f=i.length;c<f;c+=1)r.push(i[c],n[c+1]);return r}const pm=n=>(d0.add(n),n);function yv(n,...i){if(Gr(n)||Gi(n))return pm(Nn(hm(Uu,[n,...i])));const r=n;return i.length===0&&r.length===1&&typeof r[0]=="string"?Nn(r):pm(Nn(hm(r,i)))}function ku(n,i,r=Cl){if(!i)throw Yr(1,i);const c=(f,...h)=>n(i,r,yv(f,...h));return c.attrs=f=>ku(n,i,Object.assign(Object.assign({},r),{attrs:Array.prototype.concat(r.attrs,f).filter(Boolean)})),c.withConfig=f=>ku(n,i,Object.assign(Object.assign({},r),f)),c}const w0=n=>ku(mv,n),Be=w0;gv.forEach(n=>{Be[n]=w0(n)});const bv={Wrapper:Be.footer`
    margin-top: 72px; border-top: 1px solid #1f1f1f; background: #070707;
    .footerInner { width: min(calc(100% - 48px), 1440px); margin: 0 auto; padding: 52px 0 24px; }
    .footerTop { display: grid; grid-template-columns: minmax(280px, .8fr) minmax(0, 1.2fr); gap: 70px; padding-bottom: 38px; }
    .brandBlock { max-width: 430px; } .brandHeading { display: flex; align-items: center; gap: 14px; } .brandHeading img { width: 46px; height: 46px; padding: 5px; border: 1px solid #303030; border-radius: 13px; background: #111; object-fit: contain; } .brandHeading > div { display: flex; flex-direction: column; gap: 4px; } .brandHeading strong { color: #f5f5f5; font-size: 1.25rem; } .brandHeading span { color: #5f5f5f; font-size: .625rem; font-weight: 800; letter-spacing: .11em; text-transform: uppercase; }
    .brandBlock > p { margin: 20px 0 0; color: #737373; font-size: .8125rem; line-height: 1.8; } .storageInfo { width: fit-content; margin-top: 20px; padding: 9px 11px; display: inline-flex; align-items: center; gap: 8px; border: 1px solid #252525; border-radius: 999px; color: #666; background: #0d0d0d; font-size: .625rem; font-weight: 700; } .statusDot { width: 6px; height: 6px; border-radius: 50%; background: #a3a3a3; box-shadow: 0 0 0 4px rgba(255,255,255,.035); }
    .footerLinks { display: grid; grid-template-columns: 1.2fr .8fr; gap: 42px; } .groupTitle { display: block; margin-bottom: 14px; color: #525252; font-size: .625rem; font-weight: 800; letter-spacing: .14em; text-align: right; text-transform: uppercase; } .iconLinks { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 8px; } .iconLinks a { display: inline-flex; width: 38px; height: 38px; align-items: center; justify-content: center; border: 1px solid #242424; border-radius: 11px; color: #737373; background: #0d0d0d; text-decoration: none; transition: color .18s ease, border-color .18s ease, box-shadow .18s ease, text-shadow .18s ease; } .iconLinks a:hover { color: #f5f5f5; border-color: #666; box-shadow: 0 0 14px rgba(255,255,255,.1); text-shadow: 0 0 10px rgba(255,255,255,.24); }
    .footerBottom { min-height: 66px; display: flex; align-items: center; justify-content: space-between; gap: 24px; border-top: 1px solid #1f1f1f; } .copyright { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; color: #666; font-size: .6875rem; font-weight: 700; } .copyright a { color: #aaa; } .separator { color: #343434; } .backToTop { display: grid; width: 38px; height: 38px; place-items: center; border: 1px solid #292929; border-radius: 10px; color: #999; text-decoration: none; transition: border-color .18s ease, box-shadow .18s ease; } .backToTop:hover { border-color: #f5f5f5; box-shadow: 0 0 14px rgba(255,255,255,.1); }
    @media (max-width: 980px) { .footerTop { grid-template-columns: 1fr; gap: 42px; } .brandBlock { max-width: 600px; } } @media (max-width: 700px) { .footerInner { width: min(calc(100% - 28px), 1440px); padding-top: 40px; } .footerLinks { grid-template-columns: 1fr; gap: 24px; } .groupTitle, .iconLinks { justify-content: center; text-align: center; } } @media (max-width: 520px) { .footerBottom { padding: 20px 0; align-items: flex-start; flex-direction: column; } }
`},vv=[["Portfolio","https://www.ashishranjan.net/",Fy],["GitHub","https://github.com/a2rp",Qm],["CodePen","https://codepen.io/ash1198",Uy],["LinkedIn","https://www.linkedin.com/in/aashishranjan",Ky],["Facebook","https://www.facebook.com/theash.ashish/",Py],["YouTube","https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1",qy],["Email","mailto:ash.ranjan09@gmail.com",Zy]],wv=[["Support","https://a2rp-donation-page.netlify.app/",Jy],["Buy Me a Coffee","https://buymeacoffee.com/a2rp",tb],["Patreon","https://patreon.com/a2rp",Gy]],xv=[["Privacy","/privacy"],["Terms","/terms"]];function mm({items:n}){return m.jsx("div",{className:"iconLinks",children:n.map(([i,r,c])=>m.jsx("a",{href:r,target:r.startsWith("http")?"_blank":void 0,rel:r.startsWith("http")?"noopener noreferrer":void 0,"aria-label":i,title:i,children:st.createElement(c)},i))})}function Sv(){const n=new Date().getFullYear();return m.jsx(bv.Wrapper,{id:"footer",children:m.jsxs("div",{className:"footerInner",children:[m.jsxs("div",{className:"footerTop",children:[m.jsxs("div",{className:"brandBlock",children:[m.jsxs("div",{className:"brandHeading",children:[m.jsx("img",{src:"/notes/logo.png",alt:"Ashish Ranjan logo"}),m.jsxs("div",{children:[m.jsx("strong",{children:"Notes"}),m.jsx("span",{children:"Local Notes Manager"})]})]}),m.jsx("p",{children:"A focused browser-based notes manager for capturing, organising and managing notes locally."}),m.jsxs("div",{className:"storageInfo",children:[m.jsx("span",{className:"statusDot"}),"Saved locally in your browser"]})]}),m.jsxs("div",{className:"footerLinks",children:[m.jsxs("div",{className:"linkGroup",children:[m.jsx("span",{className:"groupTitle",children:"Links"}),m.jsx(mm,{items:vv})]}),m.jsxs("div",{className:"linkGroup",children:[m.jsx("span",{className:"groupTitle",children:"Support"}),m.jsx(mm,{items:wv})]})]})]}),m.jsxs("div",{className:"footerBottom",children:[m.jsxs("div",{className:"copyright",children:["Copyright © ",n," ",m.jsx("a",{href:"https://www.ashishranjan.net/",target:"_blank",rel:"noopener noreferrer",children:"Ashish Ranjan"}),m.jsx("span",{className:"separator",children:"•"}),xv.map(([i,r])=>m.jsx("a",{href:r,children:i},i))]}),m.jsx("a",{className:"backToTop",href:"#top","aria-label":"Back to top",title:"Back to top",children:m.jsx(Zm,{})})]})]})})}function Tv({threshold:n=260}){const[i,r]=st.useState(!1);return st.useEffect(()=>{const c=()=>r(window.scrollY>n);return c(),window.addEventListener("scroll",c,{passive:!0}),()=>window.removeEventListener("scroll",c)},[n]),m.jsx(Ev,{type:"button","data-visible":i,"aria-label":"Go to top",title:"Go to top",onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),children:m.jsx(Zm,{})})}const Ev=Be.button`
    position: fixed;
    right: 22px;
    bottom: 22px;
    z-index: 1200;
    display: grid;
    width: 44px;
    height: 44px;
    place-items: center;
    border: 1px solid #292929;
    border-radius: 50%;
    color: #050505;
    background: #f5f5f5;
    cursor: pointer;
    opacity: 0;
    pointer-events: none;
    transition: opacity .18s ease, border-color .18s ease, box-shadow .18s ease;
    &[data-visible="true"] { opacity: 1; pointer-events: auto; }
    &:hover { border-color: #fff; box-shadow: 0 0 18px rgba(255,255,255,.2); }
    @media (max-width: 720px) { right: 16px; bottom: 16px; }
`,_v={Wrapper:Be.header`
        position: fixed;
        inset: 0 0 auto;
        z-index: 1000;
        width: 100%;
        min-height: 76px;
        padding: 0 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 24px;
        border-bottom: 1px solid #202020;
        background: rgba(7,7,7,.94);
        backdrop-filter: blur(18px);
        .brand { display: inline-flex; align-items: center; gap: 12px; color: #f5f5f5; text-decoration: none; }
        .logo { width: 42px; height: 42px; padding: 5px; border: 1px solid #303030; border-radius: 12px; background: #111; object-fit: contain; }
        .brand > div { display: flex; flex-direction: column; gap: 3px; }
        .brandLabel { color: #666; font-size: .625rem; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; }
        .brand strong { font-size: 1.125rem; font-weight: 800; line-height: 1; }
        .nav { display: flex; align-items: center; gap: 8px; margin-left: auto; }
        .nav a { display: inline-flex; align-items: center; gap: 7px; padding: 9px 11px; border: 1px solid transparent; border-radius: 9px; color: #999; font-size: .78rem; text-decoration: none; transition: border-color .18s ease, color .18s ease, box-shadow .18s ease, text-shadow .18s ease; }
        .nav a:hover { border-color: #555; color: #fff; box-shadow: 0 0 14px rgba(255,255,255,.08); text-shadow: 0 0 10px rgba(255,255,255,.25); }
        .headerActions { display: flex; align-items: center; gap: 9px; }
        .noteCount { min-height: 38px; padding: 0 13px; display: inline-flex; align-items: center; border: 1px solid #292929; border-radius: 999px; color: #737373; background: #101010; font-size: .6875rem; font-weight: 700; }
        .menuButton { display: none; width: 40px; height: 40px; place-items: center; border: 1px solid #292929; border-radius: 10px; color: #bbb; background: #101010; cursor: pointer; transition: border-color .18s ease, box-shadow .18s ease; }
        .menuButton:hover { border-color: #f5f5f5; box-shadow: 0 0 14px rgba(255,255,255,.1); }
        @media (max-width: 720px) { .nav { position: absolute; top: calc(100% + 8px); right: 16px; display: none; width: min(230px, calc(100vw - 32px)); padding: 8px; border: 1px solid #292929; border-radius: 12px; background: #101010; box-shadow: 0 18px 40px rgba(0,0,0,.38); } .nav.open { display: grid; } .nav a { justify-content: flex-start; } .menuButton { display: grid; } .noteCount { display: none; } }
        @media (max-width: 420px) { min-height: 68px; padding: 0 16px; .logo { width: 36px; height: 36px; } }
    `};function Av({totalNotes:n}){const[i,r]=st.useState(!1);return st.useEffect(()=>{const c=()=>r(!1);return window.addEventListener("hashchange",c),()=>window.removeEventListener("hashchange",c)},[]),m.jsxs(_v.Wrapper,{children:[m.jsxs("a",{className:"brand",href:"#top","aria-label":"Notes home",onClick:()=>r(!1),children:[m.jsx("img",{className:"logo",src:"/notes/logo.png",alt:"Ashish Ranjan logo"}),m.jsxs("div",{children:[m.jsx("span",{className:"brandLabel",children:"A2RP COLLECTION"}),m.jsx("strong",{children:"Notes"})]})]}),m.jsxs("nav",{className:i?"nav open":"nav","aria-label":"Main navigation",children:[m.jsxs("a",{href:"#notes",onClick:()=>r(!1),children:[m.jsx($m,{})," Notes"]}),m.jsx("a",{href:"#footer",onClick:()=>r(!1),children:"About"}),m.jsxs("a",{href:"https://github.com/a2rp/notes",target:"_blank",rel:"noopener noreferrer",children:[m.jsx(Qm,{})," GitHub"]})]}),m.jsxs("div",{className:"headerActions",children:[m.jsxs("span",{className:"noteCount",children:[n," ",n===1?"note":"notes"]}),m.jsx("button",{className:"menuButton",type:"button",onClick:()=>r(c=>!c),"aria-label":i?"Close menu":"Open menu","aria-expanded":i,children:i?m.jsx(qi,{}):m.jsx($y,{})})]})]})}const gm={Overlay:Be.div`
        position: fixed;
        inset: 0;
        z-index: 1200;
        padding: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow-y: auto;
        background: rgba(0, 0, 0, 0.84);
        backdrop-filter: blur(12px);
    `,Modal:Be.div`
        width: min(100%, 760px);
        max-height: calc(100vh - 48px);
        overflow-y: auto;
        border: 1px solid #292929;
        border-radius: 20px;
        background:
            radial-gradient(
                circle at top right,
                rgba(255, 255, 255, 0.04),
                transparent 30%
            ),
            #0b0b0b;
        box-shadow:
            0 40px 120px rgba(0, 0, 0, 0.72),
            inset 0 1px 0 rgba(255, 255, 255, 0.03);

        .modalHeader {
            position: sticky;
            top: 0;
            z-index: 4;
            padding: 26px 28px;
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 24px;
            border-bottom: 1px solid #222222;
            background: rgba(11, 11, 11, 0.96);
            backdrop-filter: blur(14px);
        }

        .sectionLabel {
            display: block;
            margin-bottom: 8px;
            color: #737373;
            font-size: 10px;
            font-weight: 800;
            letter-spacing: 0.16em;
            text-transform: uppercase;
        }

        h2 {
            margin: 0;
            color: #f5f5f5;
            font-size: clamp(26px, 4vw, 38px);
            font-weight: 700;
            letter-spacing: -0.045em;
        }

        .closeButton {
            width: 38px;
            height: 38px;
            flex: 0 0 38px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #292929;
            border-radius: 11px;
            color: #737373;
            background: #111111;
            font-size: 15px;
            cursor: pointer;
            transition:
                color 0.18s ease,
                background 0.18s ease,
                transform 0.18s ease;
        }

        .closeButton:hover {
            color: #ffffff;
            background: #1c1c1c;
            transform: rotate(4deg);
        }

        .formGrid {
            padding: 28px;
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 20px;
        }

        .fullWidth {
            grid-column: 1 / -1;
        }

        .field {
            min-width: 0;
            display: flex;
            flex-direction: column;
            gap: 9px;
        }

        .field > label {
            color: #737373;
            font-size: 10px;
            font-weight: 800;
            letter-spacing: 0.1em;
            text-transform: uppercase;
        }

        input,
        textarea,
        select {
            width: 100%;
            border: 1px solid #292929;
            border-radius: 12px;
            outline: none;
            color: #e5e5e5;
            background: #111111;
            font-family: inherit;
            font-size: 12px;
            transition:
                border-color 0.18s ease,
                background 0.18s ease,
                box-shadow 0.18s ease;
        }

        input,
        select {
            height: 44px;
            padding: 0 13px;
        }

        textarea {
            min-height: 220px;
            padding: 13px;
            resize: vertical;
            line-height: 1.75;
        }

        input::placeholder,
        textarea::placeholder {
            color: #525252;
        }

        input:focus,
        textarea:focus,
        select:focus {
            border-color: #454545;
            background: #151515;
            box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.035);
        }

        select option {
            color: #f5f5f5;
            background: #111111;
        }

        .characterCount,
        .fieldHint {
            color: #4f4f4f;
            font-size: 9px;
            font-weight: 700;
        }

        .characterCount {
            align-self: flex-end;
        }

        .inputWithIcon {
            position: relative;
        }

        .inputWithIcon svg {
            position: absolute;
            top: 50%;
            left: 13px;
            z-index: 1;
            color: #666666;
            font-size: 14px;
            transform: translateY(-50%);
            pointer-events: none;
        }

        .inputWithIcon input {
            padding-left: 38px;
        }

        .modalFooter {
            position: sticky;
            bottom: 0;
            z-index: 4;
            padding: 18px 28px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 18px;
            border-top: 1px solid #222222;
            background: rgba(11, 11, 11, 0.96);
            backdrop-filter: blur(14px);
        }

        .shortcutHint {
            color: #4f4f4f;
            font-size: 0.625rem;
            font-weight: 700;
        }

        .footerActions {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .footerActions button {
            min-height: 42px;
            padding: 0 16px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            border-radius: 11px;
            font-family: inherit;
            font-size: 0.6875rem;
            font-weight: 800;
            cursor: pointer;
            transition:
                transform 0.18s ease,
                background 0.18s ease,
                border-color 0.18s ease;
        }

        .modalFooter button {
            min-height: 42px;
            padding: 0 16px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            border-radius: 11px;
            font-family: inherit;
            font-size: 10px;
            font-weight: 800;
            cursor: pointer;
            transition:
                transform 0.18s ease,
                background 0.18s ease,
                border-color 0.18s ease;
        }

        .cancelButton {
            border: 1px solid #292929;
            color: #737373;
            background: #111111;
        }

        .cancelButton:hover {
            color: #ffffff;
            background: #1a1a1a;
            transform: translateY(-1px);
        }

        .saveButton {
            border: 1px solid #e5e5e5;
            color: #050505;
            background: #f5f5f5;
        }

        .saveButton:hover {
            background: #ffffff;
            transform: translateY(-1px);
        }

        @media (max-width: 650px) {
            padding: 12px;

            .formGrid {
                grid-template-columns: 1fr;
                padding: 22px;
            }

            .fullWidth {
                grid-column: auto;
            }

            .modalHeader,
            .modalFooter {
                padding-left: 22px;
                padding-right: 22px;
            }

            .modalFooter {
                align-items: stretch;
                flex-direction: column;
            }

            .footerActions {
                width: 100%;
            }

            .footerActions button {
                flex: 1;
            }

            .modalFooter button {
                width: 100%;
            }
        }
    `},Cv=["General","Personal","Work","Ideas"];function zv({isOpen:n,isEditing:i,form:r,onChange:c,onSave:f,onClose:h}){const g=st.useRef(null);return st.useEffect(()=>{if(!n)return;const v=setTimeout(()=>{var y;(y=g.current)==null||y.focus()},80);return()=>{clearTimeout(v)}},[n]),st.useEffect(()=>{if(!n)return;const v=y=>{if(y.key==="Escape"){h();return}y.key==="Enter"&&(y.ctrlKey||y.metaKey)&&(y.preventDefault(),f())};return window.addEventListener("keydown",v),()=>{window.removeEventListener("keydown",v)}},[n,h,f]),n?m.jsx(gm.Overlay,{onMouseDown:v=>{v.target===v.currentTarget&&h()},children:m.jsxs(gm.Modal,{role:"dialog","aria-modal":"true","aria-labelledby":"note-modal-title",children:[m.jsxs("div",{className:"modalHeader",children:[m.jsxs("div",{children:[m.jsx("span",{className:"sectionLabel",children:i?"Edit Note":"New Note"}),m.jsx("h2",{id:"note-modal-title",children:i?"Update your note":"Create a new note"})]}),m.jsx("button",{type:"button",className:"closeButton",onClick:h,"aria-label":"Close note modal",title:"Close",children:m.jsx(qi,{})})]}),m.jsxs("div",{className:"formGrid",children:[m.jsxs("div",{className:"field fullWidth",children:[m.jsx("label",{htmlFor:"note-title",children:"Title"}),m.jsx("input",{ref:g,id:"note-title",type:"text",value:r.title,placeholder:"Enter note title...",maxLength:120,onChange:v=>c("title",v.target.value)})]}),m.jsxs("div",{className:"field fullWidth",children:[m.jsx("label",{htmlFor:"note-content",children:"Content"}),m.jsx("textarea",{id:"note-content",rows:10,value:r.content,placeholder:"Write your note...",onChange:v=>c("content",v.target.value)}),m.jsxs("span",{className:"characterCount",children:[r.content.length," characters"]})]}),m.jsxs("div",{className:"field",children:[m.jsx("label",{htmlFor:"note-category",children:"Category"}),m.jsx("select",{id:"note-category",value:r.category,onChange:v=>c("category",v.target.value),children:Cv.map(v=>m.jsx("option",{value:v,children:v},v))})]}),m.jsxs("div",{className:"field",children:[m.jsx("label",{htmlFor:"note-tags",children:"Tags"}),m.jsxs("div",{className:"inputWithIcon",children:[m.jsx(Vm,{}),m.jsx("input",{id:"note-tags",type:"text",value:r.tags,placeholder:"project, work, idea",onChange:v=>c("tags",v.target.value)})]}),m.jsx("span",{className:"fieldHint",children:"Separate multiple tags with commas."})]})]}),m.jsxs("div",{className:"modalFooter",children:[m.jsx("span",{className:"shortcutHint",children:"Ctrl + Enter to save"}),m.jsxs("div",{className:"footerActions",children:[m.jsx("button",{type:"button",className:"cancelButton",onClick:h,children:"Cancel"}),m.jsxs("button",{type:"button",className:"saveButton",onClick:f,children:[m.jsx(Vy,{}),m.jsx("span",{children:i?"Update Note":"Save Note"})]})]})]})]})}):null}const kv=[{key:"title",label:"Title",sortable:!0},{key:"category",label:"Category",sortable:!0},{key:"tags",label:"Tags",sortable:!1},{key:"createdAt",label:"Created",sortable:!0},{key:"updatedAt",label:"Updated",sortable:!0},{key:"pinned",label:"Status",sortable:!0}];function Ov({sortKey:n,sortDirection:i,onSort:r}){const c=f=>n!==f?null:i==="asc"?m.jsx(eb,{}):m.jsx(lb,{});return m.jsx("thead",{children:m.jsxs("tr",{children:[m.jsx("th",{className:"serialColumn",children:"#"}),kv.map(f=>m.jsx("th",{className:`${f.key}Column`,children:f.sortable?m.jsxs("button",{className:"sortButton",type:"button",onClick:()=>r(f.key),children:[m.jsx("span",{children:f.label}),m.jsx("span",{className:"sortIcon",children:c(f.key)})]}):m.jsx("div",{className:"columnLabel",children:f.label})},f.key)),m.jsx("th",{className:"actionsColumn",children:"Actions"})]})})}function Ou(n){return Bt({attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0z"},child:[]},{tag:"path",attr:{fillRule:"evenodd",d:"M16 9V4h1c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1h1v5c0 1.66-1.34 3-3 3v2h5.97v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3"},child:[]}]})(n)}const ym=n=>new Date(n).toLocaleString("en-IN",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"});function jv({note:n,index:i,onView:r,onEdit:c,onTogglePin:f,onDelete:h}){var g;return m.jsxs("tr",{className:n.pinned?"pinnedRow":"",children:[m.jsx("td",{className:"serialCell",children:String(i).padStart(2,"0")}),m.jsx("td",{className:"titleCell",children:m.jsxs("div",{className:"titleContent",children:[m.jsx("strong",{children:n.title||"Untitled Note"}),m.jsx("span",{children:n.content||"No content added."})]})}),m.jsx("td",{className:"categoryCell",children:m.jsx("span",{className:"categoryBadge",children:n.category})}),m.jsx("td",{className:"tagsCell",children:((g=n.tags)==null?void 0:g.length)>0?m.jsxs("div",{className:"tagList",children:[n.tags.slice(0,2).map(v=>m.jsx("span",{children:v},`${n.id}-${v}`)),n.tags.length>2&&m.jsxs("span",{className:"moreTags",children:["+",n.tags.length-2]})]}):m.jsx("span",{className:"emptyValue",children:"-"})}),m.jsx("td",{className:"dateCell",children:ym(n.createdAt)}),m.jsx("td",{className:"dateCell",children:ym(n.updatedAt)}),m.jsx("td",{className:"statusCell",children:m.jsxs("span",{className:n.pinned?"statusBadge pinned":"statusBadge",children:[m.jsx(Ou,{}),n.pinned?"Pinned":"Normal"]})}),m.jsx("td",{className:"actionsCell",children:m.jsxs("div",{className:"rowActions",children:[m.jsx("button",{type:"button",className:"actionButton",onClick:()=>r(n),"aria-label":"View note",title:"View note",children:m.jsx(Iy,{})}),m.jsx("button",{type:"button",className:"actionButton",onClick:()=>c(n),"aria-label":"Edit note",title:"Edit note",children:m.jsx(Su,{})}),m.jsx("button",{type:"button",className:`actionButton ${n.pinned?"activePin":""}`,onClick:()=>f(n.id),"aria-label":n.pinned?"Unpin note":"Pin note",title:n.pinned?"Unpin note":"Pin note",children:m.jsx(Ou,{})}),m.jsx("button",{type:"button",className:"actionButton deleteAction",onClick:()=>h(n),"aria-label":"Delete note",title:"Delete note",children:m.jsx(Yy,{})})]})})]})}const bm={Wrapper:Be.section`
        overflow: hidden;
        border: 1px solid #252525;
        border-radius: 18px;
        background: #0b0b0b;
        box-shadow:
            0 22px 60px rgba(0, 0, 0, 0.28),
            inset 0 1px 0 rgba(255, 255, 255, 0.025);

        .tableScroller {
            width: 100%;
            overflow-x: auto;
            overflow-y: hidden;
        }

        table {
            width: 100%;
            min-width: 1180px;
            border-collapse: collapse;
        }

        thead {
            background: #101010;
        }

        th {
            height: 54px;
            padding: 0 16px;
            border-bottom: 1px solid #262626;
            color: #737373;
            font-size: 10px;
            font-weight: 800;
            letter-spacing: 0.11em;
            text-align: left;
            text-transform: uppercase;
            white-space: nowrap;
        }

        td {
            padding: 17px 16px;
            border-bottom: 1px solid #1f1f1f;
            color: #a3a3a3;
            font-size: 12px;
            vertical-align: middle;
        }

        tbody tr {
            position: relative;
            background: #0b0b0b;
            transition:
                background 0.2s ease,
                box-shadow 0.2s ease;
        }

        tbody tr:hover {
            background: #111111;
            box-shadow: inset 3px 0 0 #737373;
        }

        tbody tr:last-child td {
            border-bottom: 0;
        }

        .pinnedRow {
            background: #0e0e0e;
        }

        .pinnedRow:hover {
            background: #141414;
            box-shadow: inset 3px 0 0 #d4d4d4;
        }

        .sortButton,
        .columnLabel {
            min-height: 54px;
            display: inline-flex;
            align-items: center;
            gap: 7px;
            border: 0;
            color: inherit;
            background: transparent;
            font: inherit;
            letter-spacing: inherit;
            text-transform: inherit;
        }

        .sortButton {
            padding: 0;
            cursor: pointer;
            transition: color 0.18s ease;
        }

        .sortButton:hover {
            color: #e5e5e5;
        }

        .sortIcon {
            min-width: 12px;
            display: inline-flex;
            color: #a3a3a3;
            font-size: 12px;
            transition: transform 0.18s ease;
        }

        .serialColumn,
        .serialCell {
            width: 56px;
            color: #525252;
            text-align: center;
        }

        .titleColumn {
            min-width: 260px;
        }

        .categoryColumn {
            min-width: 125px;
        }

        .tagsColumn {
            min-width: 180px;
        }

        .createdAtColumn,
        .updatedAtColumn {
            min-width: 165px;
        }

        .pinnedColumn {
            min-width: 115px;
        }

        .actionsColumn {
            min-width: 180px;
            text-align: right;
        }

        .titleContent {
            max-width: 330px;
        }

        .titleContent strong {
            display: block;
            overflow: hidden;
            margin-bottom: 6px;
            color: #f5f5f5;
            font-size: 0.8125rem;
            font-weight: 700;
            text-overflow: ellipsis;
            white-space: nowrap;
            transition: color 0.18s ease;
        }

        tr:hover .titleContent strong {
            color: #ffffff;
        }

        .titleContent span {
            display: block;
            overflow: hidden;
            color: #666666;
            font-size: 0.6875rem;
            line-height: 1.55;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .categoryBadge {
            min-height: 27px;
            padding: 0 9px;
            display: inline-flex;
            align-items: center;
            border: 1px solid #303030;
            border-radius: 999px;
            color: #a3a3a3;
            background: #151515;
            font-size: 9px;
            font-weight: 800;
            letter-spacing: 0.08em;
            text-transform: uppercase;
        }

        .tagList {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 5px;
        }

        .tagList span {
            min-height: 25px;
            padding: 0 8px;
            display: inline-flex;
            align-items: center;
            border: 1px solid #262626;
            border-radius: 999px;
            color: #737373;
            background: #101010;
            font-size: 9px;
            font-weight: 700;
        }

        .moreTags {
            color: #a3a3a3 !important;
        }

        .dateCell {
            color: #737373;
            font-size: 0.625rem;
            white-space: nowrap;
        }

        .statusBadge {
            min-height: 28px;
            padding: 0 9px;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            border: 1px solid #292929;
            border-radius: 999px;
            color: #737373;
            background: #111111;
            font-size: 9px;
            font-weight: 800;
            text-transform: uppercase;
        }

        .statusBadge.pinned {
            color: #d4d4d4;
            border-color: #404040;
            background: #1a1a1a;
        }

        .actionsCell {
            text-align: right;
        }

        .rowActions {
            display: flex;
            justify-content: flex-end;
            gap: 6px;
            opacity: 0.58;
            transform: translateX(4px);
            transition:
                opacity 0.18s ease,
                transform 0.18s ease;
        }

        tr:hover .rowActions {
            opacity: 1;
            transform: translateX(0);
        }

        .actionButton {
            width: 34px;
            height: 34px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #292929;
            border-radius: 10px;
            color: #737373;
            background: #111111;
            font-size: 14px;
            cursor: pointer;
            opacity: 0.78;
            transition:
                color 0.18s ease,
                background 0.18s ease,
                border-color 0.18s ease,
                transform 0.18s ease;
        }

        .actionButton:hover {
            color: #ffffff;
            border-color: #454545;
            background: #1c1c1c;
            transform: translateY(-2px);
        }

        .activePin {
            color: #d4d4d4;
            background: #1c1c1c;
            border-color: #404040;
        }

        .deleteAction:hover {
            color: #fecaca;
            border-color: rgba(239, 68, 68, 0.35);
            background: rgba(127, 29, 29, 0.2);
        }

        .emptyValue {
            color: #404040;
        }

        thead th {
            position: sticky;
            top: 0;
            z-index: 2;
            background: #101010;
        }

        tr:hover .actionButton {
            opacity: 1;
        }

        .activePin:hover {
            color: #050505;
            background: #ffffff;
        }

        .sortButton:hover .sortIcon {
            transform: translateY(-1px);
        }

        @media (max-width: 700px) {
            border-radius: 14px;

            td,
            th {
                padding-left: 13px;
                padding-right: 13px;
            }
        }
    `,EmptyState:Be.section`
        min-height: 340px;
        padding: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        border: 1px dashed #292929;
        border-radius: 18px;
        background: #0b0b0b;
        text-align: center;

        .emptyIcon {
            width: 54px;
            height: 54px;
            margin-bottom: 18px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #303030;
            border-radius: 15px;
            color: #a3a3a3;
            background: #141414;
            font-size: 21px;
        }

        h3 {
            margin: 0 0 8px;
            color: #f5f5f5;
            font-size: 20px;
            font-weight: 700;
        }

        p {
            max-width: 380px;
            margin: 0;
            color: #666666;
            font-size: 12px;
            line-height: 1.7;
        }
    `};function Bv({notes:n,startIndex:i,sortKey:r,sortDirection:c,onSort:f,onView:h,onEdit:g,onTogglePin:v,onDelete:y}){return n.length===0?m.jsxs(bm.EmptyState,{children:[m.jsx("span",{className:"emptyIcon",children:m.jsx($m,{})}),m.jsx("h3",{children:"No notes found"}),m.jsx("p",{children:"Create a new note or adjust your search and filters."})]}):m.jsx(bm.Wrapper,{children:m.jsx("div",{className:"tableScroller",children:m.jsxs("table",{children:[m.jsx(Ov,{sortKey:r,sortDirection:c,onSort:f}),m.jsx("tbody",{children:n.map((w,j)=>m.jsx(jv,{note:w,index:i+j+1,onView:h,onEdit:g,onTogglePin:v,onDelete:y},w.id))})]})})})}const Nv={Wrapper:Be.section`
        padding: 28px;
        border: 1px solid #252525;
        border-radius: 18px;
        background:
            radial-gradient(
                circle at top right,
                rgba(255, 255, 255, 0.035),
                transparent 34%
            ),
            #0b0b0b;
        box-shadow:
            0 24px 70px rgba(0, 0, 0, 0.28),
            inset 0 1px 0 rgba(255, 255, 255, 0.025);

        .toolbarHeader {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 32px;
            margin-bottom: 26px;
        }

        .sectionLabel {
            display: block;
            margin-bottom: 9px;
            color: #737373;
            font-size: 10px;
            font-weight: 800;
            letter-spacing: 0.16em;
            text-transform: uppercase;
        }

        h1 {
            margin: 0;
            color: #f5f5f5;
            font-size: clamp(30px, 4vw, 46px);
            font-weight: 700;
            line-height: 1;
            letter-spacing: -0.05em;
        }

        .toolbarHeader p {
            max-width: 560px;
            margin: 12px 0 0;
            color: #666666;
            font-size: 12px;
            line-height: 1.7;
        }

        .addButton {
            min-height: 44px;
            padding: 0 17px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            flex: 0 0 auto;
            border: 1px solid #e5e5e5;
            border-radius: 12px;
            color: #050505;
            background: #f5f5f5;
            font-family: inherit;
            font-size: 11px;
            font-weight: 800;
            cursor: pointer;
            box-shadow: 0 10px 30px rgba(255, 255, 255, 0.06);
            transition:
                transform 0.18s ease,
                background 0.18s ease,
                box-shadow 0.18s ease;
        }

        .addButton:hover {
            background: #ffffff;
            transform: translateY(-2px);
            box-shadow: 0 14px 34px rgba(255, 255, 255, 0.1);
        }

        .addButton svg {
            font-size: 15px;
            transition: transform 0.18s ease;
        }

        .addButton:hover svg {
            transform: rotate(90deg);
        }

        .toolbarBody {
            display: grid;
            grid-template-columns:
                minmax(280px, 1fr)
                minmax(150px, 0.28fr)
                minmax(150px, 0.28fr)
                auto;
            gap: 10px;
        }

        .searchBox,
        .filterBox {
            position: relative;
        }

        .searchBox > svg,
        .filterBox > svg {
            position: absolute;
            top: 50%;
            left: 14px;
            z-index: 2;
            color: #666666;
            font-size: 14px;
            transform: translateY(-50%);
            pointer-events: none;
        }

        input,
        select {
            width: 100%;
            height: 44px;
            border: 1px solid #292929;
            border-radius: 11px;
            outline: none;
            color: #d4d4d4;
            background: #111111;
            font-family: inherit;
            font-size: 11px;
            font-weight: 600;
            transition:
                border-color 0.18s ease,
                background 0.18s ease,
                box-shadow 0.18s ease;
        }

        input {
            padding: 0 42px 0 40px;
        }

        select {
            padding: 0 34px 0 40px;
            cursor: pointer;
        }

        input::placeholder {
            color: #525252;
        }

        input:focus,
        select:focus {
            border-color: #454545;
            background: #151515;
            box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.035);
        }

        select option {
            color: #e5e5e5;
            background: #111111;
        }

        .clearSearch {
            position: absolute;
            top: 50%;
            right: 10px;
            width: 26px;
            height: 26px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border: 0;
            border-radius: 8px;
            color: #666666;
            background: transparent;
            cursor: pointer;
            transform: translateY(-50%);
            transition:
                color 0.18s ease,
                background 0.18s ease;
        }

        .clearSearch:hover {
            color: #ffffff;
            background: #202020;
        }

        .clearFiltersButton {
            height: 44px;
            padding: 0 13px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            border: 1px solid #292929;
            border-radius: 11px;
            color: #737373;
            background: #111111;
            font-family: inherit;
            font-size: 10px;
            font-weight: 800;
            cursor: pointer;
            transition:
                color 0.18s ease,
                background 0.18s ease,
                border-color 0.18s ease,
                transform 0.18s ease;
        }

        .clearFiltersButton:hover {
            color: #ffffff;
            border-color: #404040;
            background: #191919;
            transform: translateY(-1px);
        }

        .toolbarFooter {
            margin-top: 18px;
            padding-top: 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            border-top: 1px solid #1f1f1f;
        }

        .resultCount {
            display: flex;
            align-items: baseline;
            gap: 6px;
        }

        .resultCount strong {
            color: #f5f5f5;
            font-size: 16px;
            font-weight: 800;
        }

        .resultCount span,
        .toolbarHint {
            color: #525252;
            font-size: 10px;
            font-weight: 700;
        }

        @media (max-width: 950px) {
            .toolbarBody {
                grid-template-columns: 1fr 1fr;
            }

            .searchBox {
                grid-column: 1 / -1;
            }

            .clearFiltersButton {
                width: 100%;
            }
        }

        @media (max-width: 620px) {
            padding: 22px;

            .toolbarHeader {
                flex-direction: column;
                gap: 20px;
            }

            .addButton {
                width: 100%;
            }

            .toolbarBody {
                grid-template-columns: 1fr;
            }

            .searchBox {
                grid-column: auto;
            }

            .toolbarFooter {
                align-items: flex-start;
                flex-direction: column;
                gap: 8px;
            }
        }
    `};function Mv({searchQuery:n,selectedCategory:i,pinnedFilter:r,categories:c,filteredCount:f,totalNotes:h,onSearchChange:g,onCategoryChange:v,onPinnedFilterChange:y,onClearFilters:w,onAddNote:j}){const R=n.trim()!==""||i!=="All"||r!=="all";return m.jsxs(Nv.Wrapper,{children:[m.jsxs("div",{className:"toolbarHeader",children:[m.jsxs("div",{children:[m.jsx("span",{className:"sectionLabel",children:"Notes Library"}),m.jsx("h1",{children:"Manage your notes"}),m.jsx("p",{children:"Search, organize, sort and manage your saved notes from one place."})]}),m.jsxs("button",{className:"addButton",type:"button",onClick:j,children:[m.jsx(Qy,{}),m.jsx("span",{children:"Add Note"})]})]}),m.jsxs("div",{className:"toolbarBody",children:[m.jsxs("div",{className:"searchBox",children:[m.jsx(Xy,{}),m.jsx("input",{type:"search",value:n,placeholder:"Search title, content, tags or category...","aria-label":"Search notes",onChange:M=>g(M.target.value)}),n&&m.jsx("button",{type:"button",className:"clearSearch",onClick:()=>g(""),"aria-label":"Clear search",children:m.jsx(qi,{})})]}),m.jsxs("div",{className:"filterBox",children:[m.jsx(tm,{}),m.jsx("select",{value:i,"aria-label":"Filter by category",onChange:M=>v(M.target.value),children:c.map(M=>m.jsx("option",{value:M,children:M},M))})]}),m.jsxs("div",{className:"filterBox",children:[m.jsx(tm,{}),m.jsxs("select",{value:r,"aria-label":"Filter by pin status",onChange:M=>y(M.target.value),children:[m.jsx("option",{value:"all",children:"All Status"}),m.jsx("option",{value:"pinned",children:"Pinned"}),m.jsx("option",{value:"unpinned",children:"Normal"})]})]}),R&&m.jsxs("button",{className:"clearFiltersButton",type:"button",onClick:w,children:[m.jsx(qi,{}),m.jsx("span",{children:"Clear"})]})]}),m.jsxs("div",{className:"toolbarFooter",children:[m.jsxs("div",{className:"resultCount",children:[m.jsx("strong",{children:f}),m.jsxs("span",{children:["of ",h," notes"]})]}),m.jsx("div",{className:"toolbarHint",children:"Click table headers to sort columns"})]})]})}function Dv(){return m.jsx(jy,{position:"top-right",autoClose:2500,hideProgressBar:!1,newestOnTop:!0,closeOnClick:!0,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0,theme:"dark"})}const qu=10,Rv=[5,10,20,50],en={ASC:"asc",DESC:"desc"},vr=n=>String(n||"").trim().toLowerCase(),vm=(n,i)=>i==="title"?vr(n.title):i==="category"?vr(n.category):i==="createdAt"?new Date(n.createdAt).getTime():i==="updatedAt"?new Date(n.updatedAt).getTime():i==="pinned"?n.pinned?1:0:vr(n[i]),x0=({notes:n,searchQuery:i,category:r,pinnedFilter:c})=>{const f=vr(i);return n.filter(h=>{const g=!r||r==="All"||h.category===r,v=c==="all"||c==="pinned"&&h.pinned||c==="unpinned"&&!h.pinned,y=[h.title,h.content,h.category,...h.tags||[]].join(" ").toLowerCase(),w=!f||y.includes(f);return g&&v&&w})},Lv=({notes:n,sortKey:i,sortDirection:r})=>{const c=r===en.ASC?1:-1;return[...n].sort((f,h)=>{const g=vm(f,i),v=vm(h,i);return g<v?-1*c:g>v?1*c:0})},Hv=({notes:n,page:i,pageSize:r})=>{const c=Number(r)>0?Number(r):qu,f=n.length,h=Math.max(1,Math.ceil(f/c)),g=Math.min(Math.max(1,Number(i)||1),h),v=(g-1)*c,y=v+c;return{items:n.slice(v,y),currentPage:g,pageSize:c,totalItems:f,totalPages:h,startItem:f===0?0:v+1,endItem:Math.min(y,f)}},Uv=({currentPage:n,totalPages:i})=>i<=7?Array.from({length:i},(r,c)=>c+1):n<=4?[1,2,3,4,5,"...",i]:n>=i-3?[1,"...",i-4,i-3,i-2,i-1,i]:[1,"...",n-1,n,n+1,"...",i],qv=({notes:n,searchQuery:i="",category:r="All",pinnedFilter:c="all",sortKey:f="updatedAt",sortDirection:h=en.DESC,page:g=1,pageSize:v=qu})=>{const y=x0({notes:n,searchQuery:i,category:r,pinnedFilter:c}),w=Lv({notes:y,sortKey:f,sortDirection:h});return Hv({notes:w,page:g,pageSize:v})},Yv={Wrapper:Be.section`
        min-height: 68px;
        padding: 12px 16px;
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        gap: 20px;
        align-items: center;
        border: 1px solid #252525;
        border-radius: 16px;
        background: #0b0b0b;

        .resultInfo {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 5px;
            color: #666666;
            font-size: 10px;
            font-weight: 700;
        }

        .resultInfo strong {
            color: #d4d4d4;
            font-size: 11px;
        }

        .paginationControls {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 7px;
        }

        .pageNumbers {
            display: flex;
            align-items: center;
            gap: 5px;
        }

        .navigationButton,
        .pageButton {
            width: 34px;
            height: 34px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #292929;
            border-radius: 10px;
            color: #737373;
            background: #111111;
            font-family: inherit;
            font-size: 11px;
            font-weight: 800;
            cursor: pointer;
            transition:
                color 0.18s ease,
                border-color 0.18s ease,
                background 0.18s ease,
                transform 0.18s ease;
        }

        .navigationButton {
            font-size: 15px;
        }

        .navigationButton:hover:not(:disabled),
        .pageButton:hover {
            color: #ffffff;
            border-color: #404040;
            background: #1b1b1b;
            transform: translateY(-2px);
        }

        .pageButton.active {
            color: #050505;
            border-color: #f5f5f5;
            background: #f5f5f5;
            box-shadow: 0 7px 20px rgba(255, 255, 255, 0.1);
        }

        .navigationButton:disabled {
            cursor: not-allowed;
            opacity: 0.28;
            transform: none;
        }

        .ellipsis {
            width: 24px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            color: #525252;
            font-size: 11px;
            letter-spacing: 0.08em;
        }

        .pageSize {
            justify-self: end;
            display: flex;
            align-items: center;
            gap: 9px;
        }

        .pageSize label {
            color: #666666;
            font-size: 10px;
            font-weight: 800;
            letter-spacing: 0.08em;
            text-transform: uppercase;
        }

        .pageSize select {
            min-width: 70px;
            height: 36px;
            padding: 0 28px 0 11px;
            border: 1px solid #292929;
            border-radius: 10px;
            outline: none;
            color: #d4d4d4;
            background: #111111;
            font-family: inherit;
            font-size: 10px;
            font-weight: 800;
            cursor: pointer;
        }

        .pageSize select:focus {
            border-color: #525252;
        }

        .pageSize option {
            color: #f5f5f5;
            background: #111111;
        }

        @media (max-width: 780px) {
            grid-template-columns: 1fr auto;

            .paginationControls {
                grid-column: 1 / -1;
                grid-row: 1;
            }

            .resultInfo {
                grid-column: 1;
                grid-row: 2;
            }

            .pageSize {
                grid-column: 2;
                grid-row: 2;
            }
        }

        @media (max-width: 520px) {
            grid-template-columns: 1fr;

            .pageNumbers {
                max-width: calc(100vw - 150px);
                overflow-x: auto;
                scrollbar-width: none;
            }

            .pageNumbers::-webkit-scrollbar {
                display: none;
            }

            .resultInfo,
            .pageSize {
                grid-column: 1;
                justify-self: center;
            }

            .resultInfo {
                grid-row: 2;
            }

            .pageSize {
                grid-row: 3;
            }
        }
    `};function Gv({currentPage:n,totalPages:i,pageSize:r,totalItems:c,startItem:f,endItem:h,onPageChange:g,onPageSizeChange:v}){const y=Uv({currentPage:n,totalPages:i});return m.jsxs(Yv.Wrapper,{children:[m.jsxs("div",{className:"resultInfo",children:[m.jsx("span",{children:"Showing"}),m.jsxs("strong",{children:[f,"-",h]}),m.jsx("span",{children:"of"}),m.jsx("strong",{children:c}),m.jsx("span",{children:"notes"})]}),m.jsxs("div",{className:"paginationControls",children:[m.jsx("button",{type:"button",className:"navigationButton",onClick:()=>g(n-1),disabled:n<=1,"aria-label":"Previous page",title:"Previous page",children:m.jsx(nb,{})}),m.jsx("div",{className:"pageNumbers",children:y.map((w,j)=>w==="..."?m.jsx("span",{className:"ellipsis",children:"..."},`ellipsis-${j}`):m.jsx("button",{type:"button",className:w===n?"pageButton active":"pageButton",onClick:()=>g(w),children:w},w))}),m.jsx("button",{type:"button",className:"navigationButton",onClick:()=>g(n+1),disabled:n>=i,"aria-label":"Next page",title:"Next page",children:m.jsx(ab,{})})]}),m.jsxs("div",{className:"pageSize",children:[m.jsx("label",{htmlFor:"rows-per-page",children:"Rows"}),m.jsx("select",{id:"rows-per-page",value:r,onChange:w=>v(Number(w.target.value)),children:Rv.map(w=>m.jsx("option",{value:w,children:w},w))})]})]})}const wm={Overlay:Be.div`
        position: fixed;
        inset: 0;
        z-index: 1250;
        padding: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow-y: auto;
        background: rgba(0, 0, 0, 0.84);
        backdrop-filter: blur(12px);
    `,Modal:Be.div`
        width: min(100%, 880px);
        max-height: calc(100vh - 48px);
        overflow-y: auto;
        border: 1px solid #292929;
        border-radius: 20px;
        background:
            radial-gradient(
                circle at top right,
                rgba(255, 255, 255, 0.04),
                transparent 30%
            ),
            #0b0b0b;
        box-shadow:
            0 40px 120px rgba(0, 0, 0, 0.72),
            inset 0 1px 0 rgba(255, 255, 255, 0.03);

        .modalHeader {
            position: sticky;
            top: 0;
            z-index: 4;
            padding: 26px 28px;
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 24px;
            border-bottom: 1px solid #222222;
            background: rgba(11, 11, 11, 0.96);
            backdrop-filter: blur(14px);
        }

        .headerContent {
            min-width: 0;
        }

        .metaRow {
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 7px;
        }

        .categoryBadge,
        .pinnedBadge {
            min-height: 28px;
            padding: 0 9px;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            border: 1px solid #303030;
            border-radius: 999px;
            color: #a3a3a3;
            background: #151515;
            font-size: 9px;
            font-weight: 800;
            letter-spacing: 0.08em;
            text-transform: uppercase;
        }

        .pinnedBadge {
            color: #d4d4d4;
            border-color: #3d3d3d;
            background: #1a1a1a;
        }

        h2 {
            margin: 0;
            color: #f5f5f5;
            font-size: clamp(28px, 4vw, 42px);
            font-weight: 700;
            line-height: 1.08;
            letter-spacing: -0.045em;
            word-break: break-word;
        }

        .closeButton {
            width: 38px;
            height: 38px;
            flex: 0 0 38px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #292929;
            border-radius: 11px;
            color: #737373;
            background: #111111;
            font-size: 15px;
            cursor: pointer;
            transition:
                color 0.18s ease,
                background 0.18s ease,
                transform 0.18s ease;
        }

        .closeButton:hover {
            color: #ffffff;
            background: #1c1c1c;
            transform: rotate(4deg);
        }

        .modalBody {
            padding: 28px;
        }

        .contentBlock + .contentBlock {
            margin-top: 28px;
        }

        .sectionLabel {
            display: block;
            margin-bottom: 11px;
            color: #666666;
            font-size: 9px;
            font-weight: 800;
            letter-spacing: 0.15em;
            text-transform: uppercase;
        }

        .noteContent {
            padding: 20px;
            border: 1px solid #242424;
            border-radius: 14px;
            color: #c4c4c4;
            background: #101010;
            font-size: 13px;
            line-height: 1.9;
            white-space: pre-wrap;
            word-break: break-word;
        }

        .tagList {
            display: flex;
            flex-wrap: wrap;
            gap: 7px;
        }

        .tagList span {
            min-height: 30px;
            padding: 0 10px;
            display: inline-flex;
            align-items: center;
            gap: 5px;
            border: 1px solid #292929;
            border-radius: 999px;
            color: #8a8a8a;
            background: #121212;
            font-size: 9px;
            font-weight: 700;
        }

        .metadataGrid {
            margin-top: 30px;
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            border-top: 1px solid #252525;
            border-left: 1px solid #252525;
        }

        .metadataItem {
            min-width: 0;
            padding: 18px;
            display: flex;
            align-items: center;
            gap: 12px;
            border-right: 1px solid #252525;
            border-bottom: 1px solid #252525;
            background: #0f0f0f;
        }

        .metadataIcon {
            width: 38px;
            height: 38px;
            flex: 0 0 38px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #303030;
            border-radius: 11px;
            color: #8a8a8a;
            background: #171717;
            font-size: 14px;
        }

        .metadataItem div {
            min-width: 0;
        }

        .metadataItem div span {
            display: block;
            margin-bottom: 5px;
            color: #555555;
            font-size: 9px;
            font-weight: 800;
            letter-spacing: 0.09em;
            text-transform: uppercase;
        }

        .metadataItem div strong {
            display: block;
            overflow: hidden;
            color: #bdbdbd;
            font-size: 10px;
            font-weight: 700;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .modalFooter {
            position: sticky;
            bottom: 0;
            z-index: 4;
            padding: 18px 28px;
            display: flex;
            justify-content: flex-end;
            gap: 10px;
            border-top: 1px solid #222222;
            background: rgba(11, 11, 11, 0.96);
            backdrop-filter: blur(14px);
        }

        .modalFooter button {
            min-height: 42px;
            padding: 0 16px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            border-radius: 11px;
            font-family: inherit;
            font-size: 10px;
            font-weight: 800;
            cursor: pointer;
            transition:
                color 0.18s ease,
                background 0.18s ease,
                border-color 0.18s ease,
                transform 0.18s ease;
        }

        .closeAction {
            border: 1px solid #292929;
            color: #737373;
            background: #111111;
        }

        .closeAction:hover {
            color: #ffffff;
            background: #1a1a1a;
            transform: translateY(-1px);
        }

        .editAction {
            border: 1px solid #e5e5e5;
            color: #050505;
            background: #f5f5f5;
        }

        .editAction:hover {
            background: #ffffff;
            transform: translateY(-1px);
        }

        @media (max-width: 650px) {
            padding: 12px;

            .modalHeader,
            .modalBody,
            .modalFooter {
                padding-left: 22px;
                padding-right: 22px;
            }

            .metadataGrid {
                grid-template-columns: 1fr;
            }

            .modalFooter {
                flex-direction: column-reverse;
            }

            .modalFooter button {
                width: 100%;
            }
        }
    `},xm=n=>n?new Date(n).toLocaleString("en-IN",{day:"2-digit",month:"long",year:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit"}):"-";function Xv({isOpen:n,note:i,onClose:r,onEdit:c}){var f;return!n||!i?null:m.jsx(wm.Overlay,{onMouseDown:h=>{h.target===h.currentTarget&&r()},children:m.jsxs(wm.Modal,{role:"dialog","aria-modal":"true","aria-labelledby":"view-note-title",children:[m.jsxs("div",{className:"modalHeader",children:[m.jsxs("div",{className:"headerContent",children:[m.jsxs("div",{className:"metaRow",children:[m.jsxs("span",{className:"categoryBadge",children:[m.jsx(Vm,{}),i.category]}),i.pinned&&m.jsxs("span",{className:"pinnedBadge",children:[m.jsx(Ou,{}),"Pinned"]})]}),m.jsx("h2",{id:"view-note-title",children:i.title||"Untitled Note"})]}),m.jsx("button",{type:"button",className:"closeButton",onClick:r,"aria-label":"Close note",children:m.jsx(qi,{})})]}),m.jsxs("div",{className:"modalBody",children:[m.jsxs("div",{className:"contentBlock",children:[m.jsx("span",{className:"sectionLabel",children:"Note Content"}),m.jsx("div",{className:"noteContent",children:i.content||"No content added."})]}),((f=i.tags)==null?void 0:f.length)>0&&m.jsxs("div",{className:"contentBlock",children:[m.jsx("span",{className:"sectionLabel",children:"Tags"}),m.jsx("div",{className:"tagList",children:i.tags.map(h=>m.jsxs("span",{children:[m.jsx(Wy,{}),h]},`${i.id}-${h}`))})]}),m.jsxs("div",{className:"metadataGrid",children:[m.jsxs("div",{className:"metadataItem",children:[m.jsx("span",{className:"metadataIcon",children:m.jsx(ib,{})}),m.jsxs("div",{children:[m.jsx("span",{children:"Created"}),m.jsx("strong",{children:xm(i.createdAt)})]})]}),m.jsxs("div",{className:"metadataItem",children:[m.jsx("span",{className:"metadataIcon",children:m.jsx(Su,{})}),m.jsxs("div",{children:[m.jsx("span",{children:"Last Updated"}),m.jsx("strong",{children:xm(i.updatedAt)})]})]})]})]}),m.jsxs("div",{className:"modalFooter",children:[m.jsx("button",{type:"button",className:"closeAction",onClick:r,children:"Close"}),m.jsxs("button",{type:"button",className:"editAction",onClick:()=>c(i),children:[m.jsx(Su,{}),m.jsx("span",{children:"Edit Note"})]})]})]})})}/*!
* sweetalert2 v11.26.25
* Released under the MIT License.
*/function S0(n,i,r){if(typeof n=="function"?n===i:n.has(i))return arguments.length<3?i:r;throw new TypeError("Private element is not present on this object")}function Vv(n,i){if(i.has(n))throw new TypeError("Cannot initialize the same private elements twice on an object")}function Sm(n,i){return n.get(S0(n,i))}function Qv(n,i,r){Vv(n,i),i.set(n,r)}function $v(n,i,r){return n.set(S0(n,i),r),r}const Zv=100,et={},Kv=()=>{et.previousActiveElement instanceof HTMLElement?(et.previousActiveElement.focus(),et.previousActiveElement=null):document.body&&document.body.focus()},Jv=n=>new Promise(i=>{if(!n)return i();const r=window.scrollX,c=window.scrollY;et.restoreFocusTimeout=setTimeout(()=>{Kv(),i()},Zv),window.scrollTo(r,c)}),T0="swal2-",Wv=["container","shown","height-auto","iosfix","popup","modal","no-backdrop","no-transition","toast","toast-shown","show","hide","close","title","html-container","actions","confirm","deny","cancel","footer","icon","icon-content","image","input","file","range","select","radio","checkbox","label","textarea","inputerror","input-label","validation-message","progress-steps","active-progress-step","progress-step","progress-step-line","loader","loading","styled","top","top-start","top-end","top-left","top-right","center","center-start","center-end","center-left","center-right","bottom","bottom-start","bottom-end","bottom-left","bottom-right","grow-row","grow-column","grow-fullscreen","rtl","timer-progress-bar","timer-progress-bar-container","scrollbar-measure","icon-success","icon-warning","icon-info","icon-question","icon-error","draggable","dragging"],A=Wv.reduce((n,i)=>(n[i]=T0+i,n),{}),Fv=["success","warning","info","question","error"],Er=Fv.reduce((n,i)=>(n[i]=T0+i,n),{}),E0="SweetAlert2:",Yu=n=>n.charAt(0).toUpperCase()+n.slice(1),be=n=>{console.warn(`${E0} ${typeof n=="object"?n.join(" "):n}`)},Hn=n=>{console.error(`${E0} ${n}`)},Tm=[],Pv=n=>{Tm.includes(n)||(Tm.push(n),be(n))},_0=(n,i=null)=>{Pv(`"${n}" is deprecated and will be removed in the next major release.${i?` Use "${i}" instead.`:""}`)},Vr=n=>typeof n=="function"?n():n,Gu=n=>n&&typeof n.toPromise=="function",Qi=n=>Gu(n)?n.toPromise():Promise.resolve(n),Xu=n=>n&&Promise.resolve(n)===n,Iv=()=>navigator.userAgent.includes("Firefox"),ve=()=>document.body.querySelector(`.${A.container}`),$i=n=>{const i=ve();return i?i.querySelector(n):null},Me=n=>$i(`.${n}`),Ot=()=>Me(A.popup),jl=()=>Me(A.icon),tw=()=>Me(A["icon-content"]),A0=()=>Me(A.title),Vu=()=>Me(A["html-container"]),C0=()=>Me(A.image),Qu=()=>Me(A["progress-steps"]),Qr=()=>Me(A["validation-message"]),ca=()=>$i(`.${A.actions} .${A.confirm}`),Bl=()=>$i(`.${A.actions} .${A.cancel}`),Un=()=>$i(`.${A.actions} .${A.deny}`),ew=()=>Me(A["input-label"]),Nl=()=>$i(`.${A.loader}`),Zi=()=>Me(A.actions),z0=()=>Me(A.footer),$r=()=>Me(A["timer-progress-bar"]),$u=()=>Me(A.close),aw=`
  a[href],
  area[href],
  input:not([disabled]),
  select:not([disabled]),
  textarea:not([disabled]),
  button:not([disabled]),
  iframe,
  object,
  embed,
  [tabindex="0"],
  [contenteditable],
  audio[controls],
  video[controls],
  summary
`,Zu=()=>{const n=Ot();if(!n)return[];const i=n.querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])'),r=Array.from(i).sort((h,g)=>{const v=parseInt(h.getAttribute("tabindex")||"0"),y=parseInt(g.getAttribute("tabindex")||"0");return v>y?1:v<y?-1:0}),c=n.querySelectorAll(aw),f=Array.from(c).filter(h=>h.getAttribute("tabindex")!=="-1");return[...new Set(r.concat(f))].filter(h=>Te(h))},Ku=()=>za(document.body,A.shown)&&!za(document.body,A["toast-shown"])&&!za(document.body,A["no-backdrop"]),Zr=()=>{const n=Ot();return n?za(n,A.toast):!1},nw=()=>{const n=Ot();return n?n.hasAttribute("data-loading"):!1},De=(n,i)=>{if(n.textContent="",i){const c=new DOMParser().parseFromString(i,"text/html"),f=c.querySelector("head");f&&Array.from(f.childNodes).forEach(g=>{n.appendChild(g)});const h=c.querySelector("body");h&&Array.from(h.childNodes).forEach(g=>{g instanceof HTMLVideoElement||g instanceof HTMLAudioElement?n.appendChild(g.cloneNode(!0)):n.appendChild(g)})}},za=(n,i)=>i?i.split(/\s+/).every(r=>n.classList.contains(r)):!1,lw=(n,i)=>{Array.from(n.classList).forEach(r=>{!Object.values(A).includes(r)&&!Object.values(Er).includes(r)&&!Object.values(i.showClass||{}).includes(r)&&n.classList.remove(r)})},Ne=(n,i,r)=>{if(lw(n,i),!i.customClass)return;const c=i.customClass[r];if(c){if(typeof c!="string"&&!c.forEach){be(`Invalid type of customClass.${r}! Expected string or iterable object, got "${typeof c}"`);return}kt(n,c)}},Kr=(n,i)=>{if(!i)return null;switch(i){case"select":case"textarea":case"file":return n.querySelector(`.${A.popup} > .${A[i]}`);case"checkbox":return n.querySelector(`.${A.popup} > .${A.checkbox} input`);case"radio":return n.querySelector(`.${A.popup} > .${A.radio} input:checked`)||n.querySelector(`.${A.popup} > .${A.radio} input:first-child`);case"range":return n.querySelector(`.${A.popup} > .${A.range} input`);default:return n.querySelector(`.${A.popup} > .${A.input}`)}},k0=n=>{if(n.focus(),n.type!=="file"){const i=n.value;n.value="",n.value=i}},O0=(n,i,r)=>{if(!n||!i)return;const c=typeof i=="string"?i.split(/\s+/).filter(Boolean):i;(Array.isArray(n)?n:[n]).forEach(h=>{c.forEach(g=>{r?h.classList.add(g):h.classList.remove(g)})})},kt=(n,i)=>{O0(n,i,!0)},Je=(n,i)=>{O0(n,i,!1)},nn=(n,i)=>Array.from(n.children).find(r=>r instanceof HTMLElement&&za(r,i)),Mn=(n,i,r)=>{r===`${parseInt(`${r}`)}`&&(r=parseInt(r)),r||r===0?n.style.setProperty(i,typeof r=="number"?`${r}px`:r):n.style.removeProperty(i)},re=(n,i="flex")=>{n&&(n.style.display=i)},pe=n=>{n&&(n.style.display="none")},Ju=(n,i="block")=>{n&&new MutationObserver(()=>{Ki(n,n.innerHTML,i)}).observe(n,{childList:!0,subtree:!0})},Em=(n,i,r,c)=>{const f=n.querySelector(i);f&&f.style.setProperty(r,c)},Ki=(n,i,r="flex")=>{i?re(n,r):pe(n)},Te=n=>!!(n&&(n.offsetWidth||n.offsetHeight||n.getClientRects().length)),iw=()=>!Te(ca())&&!Te(Un())&&!Te(Bl()),ju=n=>n.scrollHeight>n.clientHeight,ow=(n,i)=>{let r=n;for(;r&&r!==i;){if(ju(r))return!0;r=r.parentElement}return!1},j0=n=>{const i=window.getComputedStyle(n),r=parseFloat(i.getPropertyValue("animation-duration")||"0"),c=parseFloat(i.getPropertyValue("transition-duration")||"0");return r>0||c>0},Wu=(n,i=!1)=>{const r=$r();r&&Te(r)&&(i&&(r.style.transition="none",r.style.width="100%"),setTimeout(()=>{r.style.transition=`width ${n/1e3}s linear`,r.style.width="0%"},10))},rw=()=>{const n=$r();if(!n)return;const i=parseInt(window.getComputedStyle(n).width);n.style.removeProperty("transition"),n.style.width="100%";const r=parseInt(window.getComputedStyle(n).width),c=i/r*100;n.style.width=`${c}%`},sw=()=>typeof window>"u"||typeof document>"u",cw=`
 <div aria-labelledby="${A.title}" aria-describedby="${A["html-container"]}" class="${A.popup}" tabindex="-1">
   <button type="button" class="${A.close}"></button>
   <ul class="${A["progress-steps"]}"></ul>
   <div class="${A.icon}"></div>
   <img class="${A.image}" />
   <h2 class="${A.title}" id="${A.title}"></h2>
   <div class="${A["html-container"]}" id="${A["html-container"]}"></div>
   <input class="${A.input}" id="${A.input}" />
   <input type="file" class="${A.file}" />
   <div class="${A.range}">
     <input type="range" />
     <output></output>
   </div>
   <select class="${A.select}" id="${A.select}"></select>
   <div class="${A.radio}"></div>
   <label class="${A.checkbox}">
     <input type="checkbox" id="${A.checkbox}" />
     <span class="${A.label}"></span>
   </label>
   <textarea class="${A.textarea}" id="${A.textarea}"></textarea>
   <div class="${A["validation-message"]}" id="${A["validation-message"]}"></div>
   <div class="${A.actions}">
     <div class="${A.loader}"></div>
     <button type="button" class="${A.confirm}"></button>
     <button type="button" class="${A.deny}"></button>
     <button type="button" class="${A.cancel}"></button>
   </div>
   <div class="${A.footer}"></div>
   <div class="${A["timer-progress-bar-container"]}">
     <div class="${A["timer-progress-bar"]}"></div>
   </div>
 </div>
`.replace(/(^|\n)\s*/g,""),uw=()=>{const n=ve();return n?(n.remove(),Je([document.documentElement,document.body],[A["no-backdrop"],A["toast-shown"],A["has-column"]]),!0):!1},kn=()=>{et.currentInstance&&et.currentInstance.resetValidationMessage()},fw=()=>{const n=Ot();if(!n)return;const i=nn(n,A.input),r=nn(n,A.file),c=n.querySelector(`.${A.range} input`),f=n.querySelector(`.${A.range} output`),h=nn(n,A.select),g=n.querySelector(`.${A.checkbox} input`),v=nn(n,A.textarea);i&&(i.oninput=kn),r&&(r.onchange=kn),h&&(h.onchange=kn),g&&(g.onchange=kn),v&&(v.oninput=kn),c&&f&&(c.oninput=()=>{kn(),f.value=c.value},c.onchange=()=>{kn(),f.value=c.value})},dw=n=>{if(typeof n=="string"){const i=document.querySelector(n);if(!i)throw new Error(`Target element "${n}" not found`);return i}return n},hw=n=>{const i=Ot();i&&(i.setAttribute("role",n.toast?"alert":"dialog"),i.setAttribute("aria-live",n.toast?"polite":"assertive"),n.toast||i.setAttribute("aria-modal","true"))},pw=n=>{window.getComputedStyle(n).direction==="rtl"&&(kt(ve(),A.rtl),et.isRTL=!0)},mw=n=>{const i=uw();if(sw()){Hn("SweetAlert2 requires document to initialize");return}const r=document.createElement("div");r.className=A.container,i&&kt(r,A["no-transition"]),De(r,cw),r.dataset.swal2Theme=n.theme;const c=dw(n.target||"body");c.appendChild(r),n.topLayer&&(r.setAttribute("popover",""),r.showPopover()),hw(n),pw(c),fw()},Fu=(n,i)=>{n instanceof HTMLElement?i.appendChild(n):typeof n=="object"?gw(n,i):n&&De(i,n)},gw=(n,i)=>{"jquery"in n?yw(i,n):De(i,n.toString())},yw=(n,i)=>{if(n.textContent="",0 in i)for(let r=0;r in i;r++)n.appendChild(i[r].cloneNode(!0));else n.appendChild(i.cloneNode(!0))},bw=(n,i)=>{const r=Zi(),c=Nl();!r||!c||(!i.showConfirmButton&&!i.showDenyButton&&!i.showCancelButton?pe(r):re(r),Ne(r,i,"actions"),vw(r,c,i),De(c,i.loaderHtml||""),Ne(c,i,"loader"))};function vw(n,i,r){const c=ca(),f=Un(),h=Bl();!c||!f||!h||(gu(c,"confirm",r),gu(f,"deny",r),gu(h,"cancel",r),ww(c,f,h,r),r.reverseButtons&&(r.toast?(n.insertBefore(h,c),n.insertBefore(f,c)):(n.insertBefore(h,i),n.insertBefore(f,i),n.insertBefore(c,i))))}function ww(n,i,r,c){if(!c.buttonsStyling){Je([n,i,r],A.styled);return}kt([n,i,r],A.styled),[[n,"confirm",c.confirmButtonColor],[i,"deny",c.denyButtonColor],[r,"cancel",c.cancelButtonColor]].forEach(([h,g,v])=>{v&&h.style.setProperty(`--swal2-${g}-button-background-color`,v),xw(h)})}function xw(n){const i=window.getComputedStyle(n);if(i.getPropertyValue("--swal2-action-button-focus-box-shadow"))return;const r=i.backgroundColor.replace(/rgba?\((\d+), (\d+), (\d+).*/,"rgba($1, $2, $3, 0.5)");n.style.setProperty("--swal2-action-button-focus-box-shadow",i.getPropertyValue("--swal2-outline").replace(/ rgba\(.*/,` ${r}`))}function gu(n,i,r){const c=Yu(i);Ki(n,r[`show${c}Button`],"inline-block"),De(n,r[`${i}ButtonText`]||""),n.setAttribute("aria-label",r[`${i}ButtonAriaLabel`]||""),n.className=A[i],Ne(n,r,`${i}Button`)}const Sw=(n,i)=>{const r=$u();r&&(De(r,i.closeButtonHtml||""),Ne(r,i,"closeButton"),Ki(r,i.showCloseButton),r.setAttribute("aria-label",i.closeButtonAriaLabel||""))},Tw=(n,i)=>{const r=ve();r&&(Ew(r,i.backdrop),_w(r,i.position),Aw(r,i.grow),Ne(r,i,"container"))};function Ew(n,i){typeof i=="string"?n.style.background=i:i||kt([document.documentElement,document.body],A["no-backdrop"])}function _w(n,i){i&&(i in A?kt(n,A[i]):(be('The "position" parameter is not valid, defaulting to "center"'),kt(n,A.center)))}function Aw(n,i){i&&kt(n,A[`grow-${i}`])}var jt={innerParams:new WeakMap,domCache:new WeakMap,focusedElement:new WeakMap};const Cw=["input","file","range","select","radio","checkbox","textarea"],zw=(n,i)=>{const r=Ot();if(!r)return;const c=jt.innerParams.get(n),f=!c||i.input!==c.input;Cw.forEach(h=>{const g=nn(r,A[h]);g&&(jw(h,i.inputAttributes),g.className=A[h],f&&pe(g))}),i.input&&(f&&kw(i),Bw(i))},kw=n=>{if(!n.input)return;if(!Kt[n.input]){Hn(`Unexpected type of input! Expected ${Object.keys(Kt).join(" | ")}, got "${n.input}"`);return}const i=B0(n.input);if(!i)return;const r=Kt[n.input](i,n);re(i),n.inputAutoFocus&&setTimeout(()=>{k0(r)})},Ow=n=>{for(const{name:i}of Array.from(n.attributes))["id","type","value","style"].includes(i)||n.removeAttribute(i)},jw=(n,i)=>{const r=Ot();if(!r)return;const c=Kr(r,n);if(c){Ow(c);for(const f in i)c.setAttribute(f,i[f])}},Bw=n=>{if(!n.input)return;const i=B0(n.input);i&&Ne(i,n,"input")},Pu=(n,i)=>{!n.placeholder&&i.inputPlaceholder&&(n.placeholder=i.inputPlaceholder)},Ji=(n,i,r)=>{if(r.inputLabel){const c=document.createElement("label"),f=A["input-label"];c.setAttribute("for",n.id),c.className=f,typeof r.customClass=="object"&&kt(c,r.customClass.inputLabel),c.innerText=r.inputLabel,i.insertAdjacentElement("beforebegin",c)}},B0=n=>{const i=Ot();if(i)return nn(i,A[n]||A.input)},_r=(n,i)=>{["string","number"].includes(typeof i)?n.value=`${i}`:Xu(i)||be(`Unexpected type of inputValue! Expected "string", "number" or "Promise", got "${typeof i}"`)},Kt={};Kt.text=Kt.email=Kt.password=Kt.number=Kt.tel=Kt.url=Kt.search=Kt.date=Kt["datetime-local"]=Kt.time=Kt.week=Kt.month=(n,i)=>{const r=n;return _r(r,i.inputValue),Ji(r,r,i),Pu(r,i),r.type=i.input,r};Kt.file=(n,i)=>{const r=n;return Ji(r,r,i),Pu(r,i),r};Kt.range=(n,i)=>{const r=n,c=r.querySelector("input"),f=r.querySelector("output");return c&&(_r(c,i.inputValue),c.type=i.input,Ji(c,n,i)),f&&_r(f,i.inputValue),n};Kt.select=(n,i)=>{const r=n;if(r.textContent="",i.inputPlaceholder){const c=document.createElement("option");De(c,i.inputPlaceholder),c.value="",c.disabled=!0,c.selected=!0,r.appendChild(c)}return Ji(r,r,i),r};Kt.radio=n=>{const i=n;return i.textContent="",n};Kt.checkbox=(n,i)=>{const r=Ot();if(!r)throw new Error("Popup not found");const c=Kr(r,"checkbox");if(!c)throw new Error("Checkbox input not found");c.value="1",c.checked=!!i.inputValue;const h=n.querySelector("span");if(h){const g=i.inputPlaceholder||i.inputLabel;g&&De(h,g)}return c};Kt.textarea=(n,i)=>{const r=n;_r(r,i.inputValue),Pu(r,i),Ji(r,r,i);const c=f=>parseInt(window.getComputedStyle(f).marginLeft)+parseInt(window.getComputedStyle(f).marginRight);return setTimeout(()=>{if("MutationObserver"in window){const f=Ot();if(!f)return;const h=parseInt(window.getComputedStyle(f).width),g=()=>{if(!document.body.contains(r))return;const v=r.offsetWidth+c(r),y=Ot();y&&(v>h?y.style.width=`${v}px`:Mn(y,"width",i.width))};new MutationObserver(g).observe(r,{attributes:!0,attributeFilter:["style"]})}}),r};const Nw=(n,i)=>{const r=Vu();r&&(Ju(r),Ne(r,i,"htmlContainer"),i.html?(Fu(i.html,r),re(r,"block")):i.text?(r.textContent=i.text,re(r,"block")):pe(r),zw(n,i))},Mw=(n,i)=>{const r=z0();r&&(Ju(r),Ki(r,!!i.footer,"block"),i.footer&&Fu(i.footer,r),Ne(r,i,"footer"))},Dw=(n,i)=>{const r=jt.innerParams.get(n),c=jl();if(!c)return;if(r&&i.icon===r.icon){Am(c,i),_m(c,i);return}if(!i.icon&&!i.iconHtml){pe(c);return}if(i.icon&&Object.keys(Er).indexOf(i.icon)===-1){Hn(`Unknown icon! Expected "success", "error", "warning", "info" or "question", got "${i.icon}"`),pe(c);return}re(c),Am(c,i),_m(c,i),kt(c,i.showClass&&i.showClass.icon),window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",N0)},_m=(n,i)=>{for(const[r,c]of Object.entries(Er))i.icon!==r&&Je(n,c);kt(n,i.icon&&Er[i.icon]),Hw(n,i),N0(),Ne(n,i,"icon")},N0=()=>{const n=Ot();if(!n)return;const i=window.getComputedStyle(n).getPropertyValue("background-color");n.querySelectorAll("[class^=swal2-success-circular-line], .swal2-success-fix").forEach(c=>{c.style.backgroundColor=i})},Rw=n=>`
  ${n.animation?'<div class="swal2-success-circular-line-left"></div>':""}
  <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>
  <div class="swal2-success-ring"></div>
  ${n.animation?'<div class="swal2-success-fix"></div>':""}
  ${n.animation?'<div class="swal2-success-circular-line-right"></div>':""}
`,Lw=`
  <span class="swal2-x-mark">
    <span class="swal2-x-mark-line-left"></span>
    <span class="swal2-x-mark-line-right"></span>
  </span>
`,Am=(n,i)=>{if(!i.icon&&!i.iconHtml)return;let r=n.innerHTML,c="";i.iconHtml?c=Cm(i.iconHtml):i.icon==="success"?(c=Rw(i),r=r.replace(/ style=".*?"/g,"")):i.icon==="error"?c=Lw:i.icon&&(c=Cm({question:"?",warning:"!",info:"i"}[i.icon])),r.trim()!==c.trim()&&De(n,c)},Hw=(n,i)=>{if(i.iconColor){n.style.color=i.iconColor,n.style.borderColor=i.iconColor;for(const r of[".swal2-success-line-tip",".swal2-success-line-long",".swal2-x-mark-line-left",".swal2-x-mark-line-right"])Em(n,r,"background-color",i.iconColor);Em(n,".swal2-success-ring","border-color",i.iconColor)}},Cm=n=>`<div class="${A["icon-content"]}">${n}</div>`,Uw=(n,i)=>{const r=C0();if(r){if(!i.imageUrl){pe(r);return}re(r,""),r.setAttribute("src",i.imageUrl),r.setAttribute("alt",i.imageAlt||""),Mn(r,"width",i.imageWidth),Mn(r,"height",i.imageHeight),r.className=A.image,Ne(r,i,"image")}};let Iu=!1,M0=0,D0=0,R0=0,L0=0;const qw=n=>{n.addEventListener("mousedown",Ar),document.body.addEventListener("mousemove",Cr),n.addEventListener("mouseup",zr),n.addEventListener("touchstart",Ar),document.body.addEventListener("touchmove",Cr),n.addEventListener("touchend",zr)},Yw=n=>{n.removeEventListener("mousedown",Ar),document.body.removeEventListener("mousemove",Cr),n.removeEventListener("mouseup",zr),n.removeEventListener("touchstart",Ar),document.body.removeEventListener("touchmove",Cr),n.removeEventListener("touchend",zr)},Ar=n=>{const i=Ot();if(!i)return;const r=jl();if(n.target===i||r&&r.contains(n.target)){Iu=!0;const c=H0(n);M0=c.clientX,D0=c.clientY,R0=parseInt(i.style.insetInlineStart)||0,L0=parseInt(i.style.insetBlockStart)||0,kt(i,"swal2-dragging")}},Cr=n=>{const i=Ot();if(i&&Iu){let{clientX:r,clientY:c}=H0(n);const f=r-M0;i.style.insetInlineStart=`${R0+(et.isRTL?-f:f)}px`,i.style.insetBlockStart=`${L0+(c-D0)}px`}},zr=()=>{const n=Ot();Iu=!1,Je(n,"swal2-dragging")},H0=n=>{const i=n.type.startsWith("touch")?n.touches[0]:n;return{clientX:i.clientX,clientY:i.clientY}},Gw=(n,i)=>{const r=ve(),c=Ot();if(!(!r||!c)){if(i.toast){Mn(r,"width",i.width),c.style.width="100%";const f=Nl();f&&c.insertBefore(f,jl())}else Mn(c,"width",i.width);Mn(c,"padding",i.padding),i.color&&(c.style.color=i.color),i.background&&(c.style.background=i.background),pe(Qr()),Xw(c,i),i.draggable&&!i.toast?(kt(c,A.draggable),qw(c)):(Je(c,A.draggable),Yw(c))}},Xw=(n,i)=>{const r=i.showClass||{};n.className=`${A.popup} ${Te(n)?r.popup:""}`,i.toast?(kt([document.documentElement,document.body],A["toast-shown"]),kt(n,A.toast)):kt(n,A.modal),Ne(n,i,"popup"),typeof i.customClass=="string"&&kt(n,i.customClass),i.icon&&kt(n,A[`icon-${i.icon}`])},Vw=(n,i)=>{const r=Qu();if(!r)return;const{progressSteps:c,currentProgressStep:f}=i;if(!c||c.length===0||f===void 0){pe(r);return}re(r),r.textContent="",f>=c.length&&be("Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)"),c.forEach((h,g)=>{const v=Qw(h);if(r.appendChild(v),g===f&&kt(v,A["active-progress-step"]),g!==c.length-1){const y=$w(i);r.appendChild(y)}})},Qw=n=>{const i=document.createElement("li");return kt(i,A["progress-step"]),De(i,n),i},$w=n=>{const i=document.createElement("li");return kt(i,A["progress-step-line"]),n.progressStepsDistance&&Mn(i,"width",n.progressStepsDistance),i},Zw=(n,i)=>{const r=A0();r&&(Ju(r),Ki(r,!!(i.title||i.titleText),"block"),i.title&&Fu(i.title,r),i.titleText&&(r.innerText=i.titleText),Ne(r,i,"title"))},U0=(n,i)=>{var r;Gw(n,i),Tw(n,i),Vw(n,i),Dw(n,i),Uw(n,i),Zw(n,i),Sw(n,i),Nw(n,i),bw(n,i),Mw(n,i);const c=Ot();typeof i.didRender=="function"&&c&&i.didRender(c),(r=et.eventEmitter)===null||r===void 0||r.emit("didRender",c)},Kw=()=>Te(Ot()),q0=()=>{var n;return(n=ca())===null||n===void 0?void 0:n.click()},Jw=()=>{var n;return(n=Un())===null||n===void 0?void 0:n.click()},Ww=()=>{var n;return(n=Bl())===null||n===void 0?void 0:n.click()},Ml=Object.freeze({cancel:"cancel",backdrop:"backdrop",close:"close",esc:"esc",timer:"timer"}),Y0=n=>{if(n.keydownTarget&&n.keydownHandlerAdded&&n.keydownHandler){const i=n.keydownHandler;n.keydownTarget.removeEventListener("keydown",i,{capture:n.keydownListenerCapture}),n.keydownHandlerAdded=!1}},Fw=(n,i,r)=>{if(Y0(n),!i.toast){const c=h=>Iw(i,h,r);n.keydownHandler=c;const f=i.keydownListenerCapture?window:Ot();if(f){n.keydownTarget=f,n.keydownListenerCapture=i.keydownListenerCapture;const h=c;n.keydownTarget.addEventListener("keydown",h,{capture:n.keydownListenerCapture}),n.keydownHandlerAdded=!0}}},Bu=(n,i)=>{var r;const c=Zu();return c.length?(n=n+i,n===-2&&(n=c.length-1),n===c.length?n=0:n===-1&&(n=c.length-1),c[n].focus(),!(Iv()&&c[n]instanceof HTMLIFrameElement)):((r=Ot())===null||r===void 0||r.focus(),!0)},G0=["ArrowRight","ArrowDown"],Pw=["ArrowLeft","ArrowUp"],Iw=(n,i,r)=>{n&&(i.isComposing||i.keyCode===229||(n.stopKeydownPropagation&&i.stopPropagation(),i.key==="Enter"?tx(i,n):i.key==="Tab"?ex(i):[...G0,...Pw].includes(i.key)?ax(i.key):i.key==="Escape"&&nx(i,n,r)))},tx=(n,i)=>{if(!Vr(i.allowEnterKey))return;const r=Ot();if(!r||!i.input)return;const c=Kr(r,i.input);if(n.target&&c&&n.target instanceof HTMLElement&&n.target.outerHTML===c.outerHTML){if(["textarea","file"].includes(i.input))return;q0(),n.preventDefault()}},ex=n=>{const i=n.target,c=Zu().findIndex(h=>h===i);let f=!0;n.shiftKey?f=Bu(c,-1):f=Bu(c,1),n.stopPropagation(),f&&n.preventDefault()},ax=n=>{const i=Zi(),r=ca(),c=Un(),f=Bl();if(!i||!r||!c||!f)return;const h=[r,c,f];if(document.activeElement instanceof HTMLElement&&!h.includes(document.activeElement))return;const g=G0.includes(n)?"nextElementSibling":"previousElementSibling";let v=document.activeElement;if(v){for(let y=0;y<i.children.length;y++){if(v=v[g],!v)return;if(v instanceof HTMLButtonElement&&Te(v))break}v instanceof HTMLButtonElement&&v.focus()}},nx=(n,i,r)=>{n.preventDefault(),Vr(i.allowEscapeKey)&&r(Ml.esc)};var zl={swalPromiseResolve:new WeakMap,swalPromiseReject:new WeakMap};const lx=()=>{const n=ve();Array.from(document.body.children).forEach(r=>{r.contains(n)||(r.hasAttribute("aria-hidden")&&r.setAttribute("data-previous-aria-hidden",r.getAttribute("aria-hidden")||""),r.setAttribute("aria-hidden","true"))})},X0=()=>{Array.from(document.body.children).forEach(i=>{i.hasAttribute("data-previous-aria-hidden")?(i.setAttribute("aria-hidden",i.getAttribute("data-previous-aria-hidden")||""),i.removeAttribute("data-previous-aria-hidden")):i.removeAttribute("aria-hidden")})},tf=typeof window<"u"&&!!window.GestureEvent,ix=tf&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream,ox=()=>{if(tf&&!za(document.body,A.iosfix)){const n=document.body.scrollTop;document.body.style.top=`${n*-1}px`,kt(document.body,A.iosfix),rx()}},rx=()=>{const n=ve();if(!n)return;let i;n.ontouchstart=r=>{i=sx(r)},n.ontouchmove=r=>{i&&(r.preventDefault(),r.stopPropagation())}},sx=n=>{const i=n.target,r=ve(),c=Vu();return!r||!c||cx(n)||ux(n)?!1:i===r||!ju(r)&&i instanceof HTMLElement&&!ow(i,c)&&i.tagName!=="INPUT"&&i.tagName!=="TEXTAREA"&&!(ju(c)&&c.contains(i))},cx=n=>!!(n.touches&&n.touches.length&&n.touches[0].touchType==="stylus"),ux=n=>n.touches&&n.touches.length>1,fx=()=>{if(za(document.body,A.iosfix)){const n=parseInt(document.body.style.top,10);Je(document.body,A.iosfix),document.body.style.top="",document.body.scrollTop=n*-1}},dx=()=>{const n=document.createElement("div");n.className=A["scrollbar-measure"],document.body.appendChild(n);const i=n.getBoundingClientRect().width-n.clientWidth;return document.body.removeChild(n),i};let El=null;const hx=n=>{El===null&&(document.body.scrollHeight>window.innerHeight||n==="scroll")&&(El=parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right")),document.body.style.paddingRight=`${El+dx()}px`)},px=()=>{El!==null&&(document.body.style.paddingRight=`${El}px`,El=null)};function V0(n,i,r,c){Zr()?zm(n,c):(Jv(r).then(()=>zm(n,c)),Y0(et)),tf?(i.setAttribute("style","display:none !important"),i.removeAttribute("class"),i.innerHTML=""):i.remove(),Ku()&&(px(),fx(),X0()),mx()}function mx(){Je([document.documentElement,document.body],[A.shown,A["height-auto"],A["no-backdrop"],A["toast-shown"]])}function ln(n){n=yx(n);const i=zl.swalPromiseResolve.get(this),r=gx(this);this.isAwaitingPromise?n.isDismissed||(Wi(this),i(n)):r&&i(n)}const gx=n=>{const i=Ot();if(!i)return!1;const r=jt.innerParams.get(n);if(!r||za(i,r.hideClass.popup))return!1;Je(i,r.showClass.popup),kt(i,r.hideClass.popup);const c=ve();return Je(c,r.showClass.backdrop),kt(c,r.hideClass.backdrop),bx(n,i,r),!0};function Q0(n){const i=zl.swalPromiseReject.get(this);Wi(this),i&&i(n)}const Wi=n=>{n.isAwaitingPromise&&(delete n.isAwaitingPromise,jt.innerParams.get(n)||n._destroy())},yx=n=>typeof n>"u"?{isConfirmed:!1,isDenied:!1,isDismissed:!0}:Object.assign({isConfirmed:!1,isDenied:!1,isDismissed:!1},n),bx=(n,i,r)=>{var c;const f=ve(),h=j0(i);typeof r.willClose=="function"&&r.willClose(i),(c=et.eventEmitter)===null||c===void 0||c.emit("willClose",i),h&&f?vx(n,i,f,!!r.returnFocus,r.didClose):f&&V0(n,f,!!r.returnFocus,r.didClose)},vx=(n,i,r,c,f)=>{et.swalCloseEventFinishedCallback=V0.bind(null,n,r,c,f);const h=function(g){if(g.target===i){var v;(v=et.swalCloseEventFinishedCallback)===null||v===void 0||v.call(et),delete et.swalCloseEventFinishedCallback,i.removeEventListener("animationend",h),i.removeEventListener("transitionend",h)}};i.addEventListener("animationend",h),i.addEventListener("transitionend",h)},zm=(n,i)=>{setTimeout(()=>{var r;typeof i=="function"&&i.bind(n.params)(),(r=et.eventEmitter)===null||r===void 0||r.emit("didClose"),n._destroy&&n._destroy()})},kl=n=>{let i=Ot();if(i||new Br,i=Ot(),!i)return;const r=Nl();Zr()?pe(jl()):wx(i,n),re(r),i.setAttribute("data-loading","true"),i.setAttribute("aria-busy","true"),i.focus()},wx=(n,i)=>{const r=Zi(),c=Nl();!r||!c||(!i&&Te(ca())&&(i=ca()),re(r),i&&(pe(i),c.setAttribute("data-button-to-replace",i.className),r.insertBefore(c,i)),kt([n,r],A.loading))},xx=(n,i)=>{i.input==="select"||i.input==="radio"?Ax(n,i):["text","email","number","tel","textarea"].some(r=>r===i.input)&&(Gu(i.inputValue)||Xu(i.inputValue))&&(kl(ca()),Cx(n,i))},Sx=(n,i)=>{const r=n.getInput();if(!r)return null;switch(i.input){case"checkbox":return Tx(r);case"radio":return Ex(r);case"file":return _x(r);default:return i.inputAutoTrim?r.value.trim():r.value}},Tx=n=>n.checked?1:0,Ex=n=>n.checked?n.value:null,_x=n=>n.files&&n.files.length?n.getAttribute("multiple")!==null?n.files:n.files[0]:null,Ax=(n,i)=>{const r=Ot();if(!r)return;const c=f=>{i.input==="select"?zx(r,Nu(f),i):i.input==="radio"&&kx(r,Nu(f),i)};Gu(i.inputOptions)||Xu(i.inputOptions)?(kl(ca()),Qi(i.inputOptions).then(f=>{n.hideLoading(),c(f)})):typeof i.inputOptions=="object"?c(i.inputOptions):Hn(`Unexpected type of inputOptions! Expected object, Map or Promise, got ${typeof i.inputOptions}`)},Cx=(n,i)=>{const r=n.getInput();r&&(pe(r),Qi(i.inputValue).then(c=>{r.value=i.input==="number"?`${parseFloat(c)||0}`:`${c}`,re(r),r.focus(),n.hideLoading()}).catch(c=>{Hn(`Error in inputValue promise: ${c}`),r.value="",re(r),r.focus(),n.hideLoading()}))};function zx(n,i,r){const c=nn(n,A.select);if(!c)return;const f=(h,g,v)=>{const y=document.createElement("option");y.value=v,De(y,g),y.selected=$0(v,r.inputValue),h.appendChild(y)};i.forEach(h=>{const g=h[0],v=h[1];if(Array.isArray(v)){const y=document.createElement("optgroup");y.label=g,y.disabled=!1,c.appendChild(y),v.forEach(w=>f(y,w[1],w[0]))}else f(c,v,g)}),c.focus()}function kx(n,i,r){const c=nn(n,A.radio);if(!c)return;i.forEach(h=>{const g=h[0],v=h[1],y=document.createElement("input"),w=document.createElement("label");y.type="radio",y.name=A.radio,y.value=g,$0(g,r.inputValue)&&(y.checked=!0);const j=document.createElement("span");De(j,v),j.className=A.label,w.appendChild(y),w.appendChild(j),c.appendChild(w)});const f=c.querySelectorAll("input");f.length&&f[0].focus()}const Nu=n=>(n instanceof Map?Array.from(n):Object.entries(n)).map(([r,c])=>[r,typeof c=="object"?Nu(c):c]),$0=(n,i)=>!!i&&i!=null&&i.toString()===n.toString(),Ox=n=>{const i=jt.innerParams.get(n);n.disableButtons(),i.input?Z0(n,"confirm"):af(n,!0)},jx=n=>{const i=jt.innerParams.get(n);n.disableButtons(),i.returnInputValueOnDeny?Z0(n,"deny"):ef(n,!1)},Bx=(n,i)=>{n.disableButtons(),i(Ml.cancel)},Z0=(n,i)=>{const r=jt.innerParams.get(n);if(!r.input){Hn(`The "input" parameter is needed to be set when using returnInputValueOn${Yu(i)}`);return}const c=n.getInput(),f=Sx(n,r);r.inputValidator?Nx(n,f,i):c&&!c.checkValidity()?(n.enableButtons(),n.showValidationMessage(r.validationMessage||c.validationMessage)):i==="deny"?ef(n,f):af(n,f)},Nx=(n,i,r)=>{const c=jt.innerParams.get(n);n.disableInput(),Promise.resolve().then(()=>Qi(c.inputValidator(i,c.validationMessage))).then(h=>{n.enableButtons(),n.enableInput(),h?n.showValidationMessage(h):r==="deny"?ef(n,i):af(n,i)})},ef=(n,i)=>{const r=jt.innerParams.get(n);r.showLoaderOnDeny&&kl(Un()),r.preDeny?(n.isAwaitingPromise=!0,Promise.resolve().then(()=>Qi(r.preDeny(i,r.validationMessage))).then(f=>{f===!1?(n.hideLoading(),Wi(n)):n.close({isDenied:!0,value:typeof f>"u"?i:f})}).catch(f=>K0(n,f))):n.close({isDenied:!0,value:i})},km=(n,i)=>{n.close({isConfirmed:!0,value:i})},K0=(n,i)=>{n.rejectPromise(i)},af=(n,i)=>{const r=jt.innerParams.get(n);r.showLoaderOnConfirm&&kl(),r.preConfirm?(n.resetValidationMessage(),n.isAwaitingPromise=!0,Promise.resolve().then(()=>Qi(r.preConfirm(i,r.validationMessage))).then(f=>{Te(Qr())||f===!1?(n.hideLoading(),Wi(n)):km(n,typeof f>"u"?i:f)}).catch(f=>K0(n,f))):km(n,i)};function kr(){const n=jt.innerParams.get(this);if(!n)return;const i=jt.domCache.get(this);pe(i.loader),Zr()?n.icon&&re(jl()):Mx(i),Je([i.popup,i.actions],A.loading),i.popup.removeAttribute("aria-busy"),i.popup.removeAttribute("data-loading"),this.enableButtons()}const Mx=n=>{const i=n.loader.getAttribute("data-button-to-replace"),r=i?n.popup.getElementsByClassName(i):[];r.length?re(r[0],"inline-block"):iw()&&pe(n.actions)};function J0(){const n=jt.innerParams.get(this),i=jt.domCache.get(this);return i?Kr(i.popup,n.input):null}function W0(n,i,r){const c=jt.domCache.get(n);i.forEach(f=>{c[f].disabled=r})}function F0(n,i){const r=Ot();!r||!n||(n.type==="radio"?r.querySelectorAll(`[name="${A.radio}"]`).forEach(f=>{f.disabled=i}):n.disabled=i)}function P0(){W0(this,["confirmButton","denyButton","cancelButton"],!1);const n=jt.focusedElement.get(this);n instanceof HTMLElement&&document.activeElement===document.body&&n.focus(),jt.focusedElement.delete(this)}function I0(){jt.focusedElement.set(this,document.activeElement),W0(this,["confirmButton","denyButton","cancelButton"],!0)}function tg(){F0(this.getInput(),!1)}function eg(){F0(this.getInput(),!0)}function ag(n){const i=jt.domCache.get(this),r=jt.innerParams.get(this);De(i.validationMessage,n),i.validationMessage.className=A["validation-message"],r.customClass&&r.customClass.validationMessage&&kt(i.validationMessage,r.customClass.validationMessage),re(i.validationMessage);const c=this.getInput();c&&(c.setAttribute("aria-invalid","true"),c.setAttribute("aria-describedby",A["validation-message"]),k0(c),kt(c,A.inputerror))}function ng(){const n=jt.domCache.get(this);n.validationMessage&&pe(n.validationMessage);const i=this.getInput();i&&(i.removeAttribute("aria-invalid"),i.removeAttribute("aria-describedby"),Je(i,A.inputerror))}const on={title:"",titleText:"",text:"",html:"",footer:"",icon:void 0,iconColor:void 0,iconHtml:void 0,template:void 0,toast:!1,draggable:!1,animation:!0,theme:"light",showClass:{popup:"swal2-show",backdrop:"swal2-backdrop-show",icon:"swal2-icon-show"},hideClass:{popup:"swal2-hide",backdrop:"swal2-backdrop-hide",icon:"swal2-icon-hide"},customClass:{},target:"body",color:void 0,backdrop:!0,heightAuto:!0,allowOutsideClick:!0,allowEscapeKey:!0,allowEnterKey:!0,stopKeydownPropagation:!0,keydownListenerCapture:!1,showConfirmButton:!0,showDenyButton:!1,showCancelButton:!1,preConfirm:void 0,preDeny:void 0,confirmButtonText:"OK",confirmButtonAriaLabel:"",confirmButtonColor:void 0,denyButtonText:"No",denyButtonAriaLabel:"",denyButtonColor:void 0,cancelButtonText:"Cancel",cancelButtonAriaLabel:"",cancelButtonColor:void 0,buttonsStyling:!0,reverseButtons:!1,focusConfirm:!0,focusDeny:!1,focusCancel:!1,returnFocus:!0,showCloseButton:!1,closeButtonHtml:"&times;",closeButtonAriaLabel:"Close this dialog",loaderHtml:"",showLoaderOnConfirm:!1,showLoaderOnDeny:!1,imageUrl:void 0,imageWidth:void 0,imageHeight:void 0,imageAlt:"",timer:void 0,timerProgressBar:!1,width:void 0,padding:void 0,background:void 0,input:void 0,inputPlaceholder:"",inputLabel:"",inputValue:"",inputOptions:{},inputAutoFocus:!0,inputAutoTrim:!0,inputAttributes:{},inputValidator:void 0,returnInputValueOnDeny:!1,validationMessage:void 0,grow:!1,position:"center",progressSteps:[],currentProgressStep:void 0,progressStepsDistance:void 0,willOpen:void 0,didOpen:void 0,didRender:void 0,willClose:void 0,didClose:void 0,didDestroy:void 0,scrollbarPadding:!0,topLayer:!1},Dx=["allowEscapeKey","allowOutsideClick","background","buttonsStyling","cancelButtonAriaLabel","cancelButtonColor","cancelButtonText","closeButtonAriaLabel","closeButtonHtml","color","confirmButtonAriaLabel","confirmButtonColor","confirmButtonText","currentProgressStep","customClass","denyButtonAriaLabel","denyButtonColor","denyButtonText","didClose","didDestroy","draggable","footer","hideClass","html","icon","iconColor","iconHtml","imageAlt","imageHeight","imageUrl","imageWidth","preConfirm","preDeny","progressSteps","returnFocus","reverseButtons","showCancelButton","showCloseButton","showConfirmButton","showDenyButton","text","title","titleText","theme","willClose"],Rx={allowEnterKey:void 0},Lx=["allowOutsideClick","allowEnterKey","backdrop","draggable","focusConfirm","focusDeny","focusCancel","returnFocus","heightAuto","keydownListenerCapture"],lg=n=>Object.prototype.hasOwnProperty.call(on,n),ig=n=>Dx.indexOf(n)!==-1,og=n=>Rx[n],Hx=n=>{lg(n)||be(`Unknown parameter "${n}"`)},Ux=n=>{Lx.includes(n)&&be(`The parameter "${n}" is incompatible with toasts`)},qx=n=>{const i=og(n);i&&_0(n,i)},rg=n=>{n.backdrop===!1&&n.allowOutsideClick&&be('"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`'),n.theme&&!["light","dark","auto","minimal","borderless","bootstrap-4","bootstrap-4-light","bootstrap-4-dark","bootstrap-5","bootstrap-5-light","bootstrap-5-dark","material-ui","material-ui-light","material-ui-dark","embed-iframe","bulma","bulma-light","bulma-dark"].includes(n.theme)&&be(`Invalid theme "${n.theme}"`);for(const i in n)Hx(i),n.toast&&Ux(i),qx(i)};function sg(n){const i=ve(),r=Ot(),c=jt.innerParams.get(this);if(!r||za(r,c.hideClass.popup)){be("You're trying to update the closed or closing popup, that won't work. Use the update() method in preConfirm parameter or show a new popup.");return}const f=Yx(n),h=Object.assign({},c,f);rg(h),i&&(i.dataset.swal2Theme=h.theme),U0(this,h),jt.innerParams.set(this,h),Object.defineProperties(this,{params:{value:Object.assign({},this.params,n),writable:!1,enumerable:!0}})}const Yx=n=>{const i={};return Object.keys(n).forEach(r=>{if(ig(r)){const c=n;i[r]=c[r]}else be(`Invalid parameter to update: ${r}`)}),i};function cg(){var n;const i=jt.domCache.get(this),r=jt.innerParams.get(this);if(!r){ug(this);return}i.popup&&et.swalCloseEventFinishedCallback&&(et.swalCloseEventFinishedCallback(),delete et.swalCloseEventFinishedCallback),typeof r.didDestroy=="function"&&r.didDestroy(),(n=et.eventEmitter)===null||n===void 0||n.emit("didDestroy"),Gx(this)}const Gx=n=>{ug(n),delete n.params,delete et.keydownHandler,delete et.keydownTarget,delete et.currentInstance},ug=n=>{n.isAwaitingPromise?(yu(jt,n),n.isAwaitingPromise=!0):(yu(zl,n),yu(jt,n),delete n.isAwaitingPromise,delete n.disableButtons,delete n.enableButtons,delete n.getInput,delete n.disableInput,delete n.enableInput,delete n.hideLoading,delete n.disableLoading,delete n.showValidationMessage,delete n.resetValidationMessage,delete n.close,delete n.closePopup,delete n.closeModal,delete n.closeToast,delete n.rejectPromise,delete n.update,delete n._destroy)},yu=(n,i)=>{for(const r in n)n[r].delete(i)};var Xx=Object.freeze({__proto__:null,_destroy:cg,close:ln,closeModal:ln,closePopup:ln,closeToast:ln,disableButtons:I0,disableInput:eg,disableLoading:kr,enableButtons:P0,enableInput:tg,getInput:J0,handleAwaitingPromise:Wi,hideLoading:kr,rejectPromise:Q0,resetValidationMessage:ng,showValidationMessage:ag,update:sg});const Vx=(n,i,r)=>{n.toast?Qx(n,i,r):(Zx(i),Kx(i),Jx(n,i,r))},Qx=(n,i,r)=>{i.popup.onclick=()=>{n&&($x(n)||n.timer||n.input)||r(Ml.close)}},$x=n=>!!(n.showConfirmButton||n.showDenyButton||n.showCancelButton||n.showCloseButton);let Or=!1;const Zx=n=>{n.popup.onmousedown=()=>{n.container.onmouseup=function(i){n.container.onmouseup=()=>{},i.target===n.container&&(Or=!0)}}},Kx=n=>{n.container.onmousedown=i=>{i.target===n.container&&i.preventDefault(),n.popup.onmouseup=function(r){n.popup.onmouseup=()=>{},(r.target===n.popup||r.target instanceof HTMLElement&&n.popup.contains(r.target))&&(Or=!0)}}},Jx=(n,i,r)=>{i.container.onclick=c=>{if(Or){Or=!1;return}c.target===i.container&&Vr(n.allowOutsideClick)&&r(Ml.backdrop)}},Wx=n=>typeof n=="object"&&n!==null&&"jquery"in n,Om=n=>n instanceof Element||Wx(n),Fx=n=>{const i={};return typeof n[0]=="object"&&!Om(n[0])?Object.assign(i,n[0]):["title","html","icon"].forEach((r,c)=>{const f=n[c];typeof f=="string"||Om(f)?i[r]=f:f!==void 0&&Hn(`Unexpected type of ${r}! Expected "string" or "Element", got ${typeof f}`)}),i};function Px(...n){return new this(...n)}function Ix(n){class i extends this{_main(c,f){return super._main(c,Object.assign({},n,f))}}return i}const t5=()=>et.timeout&&et.timeout.getTimerLeft(),fg=()=>{if(et.timeout)return rw(),et.timeout.stop()},dg=()=>{if(et.timeout){const n=et.timeout.start();return Wu(n),n}},e5=()=>{const n=et.timeout;return n&&(n.running?fg():dg())},a5=n=>{if(et.timeout){const i=et.timeout.increase(n);return Wu(i,!0),i}},n5=()=>!!(et.timeout&&et.timeout.isRunning());let jm=!1;const Mu={};function l5(n="data-swal-template"){Mu[n]=this,jm||(document.body.addEventListener("click",i5),jm=!0)}const i5=n=>{for(let i=n.target;i&&i!==document;i=i.parentNode)for(const r in Mu){const c=i.getAttribute&&i.getAttribute(r);if(c){Mu[r].fire({template:c});return}}};class o5{constructor(){this.events={}}_getHandlersByEventName(i){return typeof this.events[i]>"u"&&(this.events[i]=[]),this.events[i]}on(i,r){const c=this._getHandlersByEventName(i);c.includes(r)||c.push(r)}once(i,r){const c=(...f)=>{this.removeListener(i,c),r.apply(this,f)};this.on(i,c)}emit(i,...r){this._getHandlersByEventName(i).forEach(c=>{try{c.apply(this,r)}catch(f){console.error(f)}})}removeListener(i,r){const c=this._getHandlersByEventName(i),f=c.indexOf(r);f>-1&&c.splice(f,1)}removeAllListeners(i){this.events[i]!==void 0&&(this.events[i].length=0)}reset(){this.events={}}}et.eventEmitter=new o5;const r5=(n,i)=>{et.eventEmitter&&et.eventEmitter.on(n,i)},s5=(n,i)=>{et.eventEmitter&&et.eventEmitter.once(n,i)},c5=(n,i)=>{if(et.eventEmitter){if(!n){et.eventEmitter.reset();return}i?et.eventEmitter.removeListener(n,i):et.eventEmitter.removeAllListeners(n)}};var u5=Object.freeze({__proto__:null,argsToParams:Fx,bindClickHandler:l5,clickCancel:Ww,clickConfirm:q0,clickDeny:Jw,enableLoading:kl,fire:Px,getActions:Zi,getCancelButton:Bl,getCloseButton:$u,getConfirmButton:ca,getContainer:ve,getDenyButton:Un,getFocusableElements:Zu,getFooter:z0,getHtmlContainer:Vu,getIcon:jl,getIconContent:tw,getImage:C0,getInputLabel:ew,getLoader:Nl,getPopup:Ot,getProgressSteps:Qu,getTimerLeft:t5,getTimerProgressBar:$r,getTitle:A0,getValidationMessage:Qr,increaseTimer:a5,isDeprecatedParameter:og,isLoading:nw,isTimerRunning:n5,isUpdatableParameter:ig,isValidParameter:lg,isVisible:Kw,mixin:Ix,off:c5,on:r5,once:s5,resumeTimer:dg,showLoading:kl,stopTimer:fg,toggleTimer:e5});class f5{constructor(i,r){this.callback=i,this.remaining=r,this.running=!1,this.start()}start(){return this.running||(this.running=!0,this.started=new Date,this.id=setTimeout(this.callback,this.remaining)),this.remaining}stop(){return this.started&&this.running&&(this.running=!1,clearTimeout(this.id),this.remaining-=new Date().getTime()-this.started.getTime()),this.remaining}increase(i){const r=this.running;return r&&this.stop(),this.remaining+=i,r&&this.start(),this.remaining}getTimerLeft(){return this.running&&(this.stop(),this.start()),this.remaining}isRunning(){return this.running}}const hg=["swal-title","swal-html","swal-footer"],d5=n=>{const i=typeof n.template=="string"?document.querySelector(n.template):n.template;if(!i)return{};const r=i.content;return w5(r),Object.assign(h5(r),p5(r),m5(r),g5(r),y5(r),b5(r),v5(r,hg))},h5=n=>{const i={};return Array.from(n.querySelectorAll("swal-param")).forEach(c=>{Ln(c,["name","value"]);const f=c.getAttribute("name"),h=c.getAttribute("value");!f||!h||(f in on&&typeof on[f]=="boolean"?i[f]=h!=="false":f in on&&typeof on[f]=="object"?i[f]=JSON.parse(h):i[f]=h)}),i},p5=n=>{const i={};return Array.from(n.querySelectorAll("swal-function-param")).forEach(c=>{const f=c.getAttribute("name"),h=c.getAttribute("value");!f||!h||(i[f]=new Function(`return ${h}`)())}),i},m5=n=>{const i={};return Array.from(n.querySelectorAll("swal-button")).forEach(c=>{Ln(c,["type","color","aria-label"]);const f=c.getAttribute("type");if(!f||!["confirm","cancel","deny"].includes(f))return;i[`${f}ButtonText`]=c.innerHTML,i[`show${Yu(f)}Button`]=!0;const h=c.getAttribute("color");h!==null&&(i[`${f}ButtonColor`]=h);const g=c.getAttribute("aria-label");g!==null&&(i[`${f}ButtonAriaLabel`]=g)}),i},g5=n=>{const i={},r=n.querySelector("swal-image");if(r){Ln(r,["src","width","height","alt"]);const c=r.getAttribute("src");c!==null&&(i.imageUrl=c||void 0);const f=r.getAttribute("width");f!==null&&(i.imageWidth=f||void 0);const h=r.getAttribute("height");h!==null&&(i.imageHeight=h||void 0);const g=r.getAttribute("alt");g!==null&&(i.imageAlt=g||void 0)}return i},y5=n=>{const i={},r=n.querySelector("swal-icon");return r&&(Ln(r,["type","color"]),r.hasAttribute("type")&&(i.icon=r.getAttribute("type")),r.hasAttribute("color")&&(i.iconColor=r.getAttribute("color")),i.iconHtml=r.innerHTML),i},b5=n=>{const i={},r=n.querySelector("swal-input");r&&(Ln(r,["type","label","placeholder","value"]),i.input=r.getAttribute("type")||"text",r.hasAttribute("label")&&(i.inputLabel=r.getAttribute("label")),r.hasAttribute("placeholder")&&(i.inputPlaceholder=r.getAttribute("placeholder")),r.hasAttribute("value")&&(i.inputValue=r.getAttribute("value")));const c=Array.from(n.querySelectorAll("swal-input-option"));return c.length&&(i.inputOptions={},c.forEach(f=>{Ln(f,["value"]);const h=f.getAttribute("value");if(!h)return;const g=f.innerHTML;i.inputOptions[h]=g})),i},v5=(n,i)=>{const r={};for(const c in i){const f=i[c],h=n.querySelector(f);h&&(Ln(h,[]),r[f.replace(/^swal-/,"")]=h.innerHTML.trim())}return r},w5=n=>{const i=hg.concat(["swal-param","swal-function-param","swal-button","swal-image","swal-icon","swal-input","swal-input-option"]);Array.from(n.children).forEach(r=>{const c=r.tagName.toLowerCase();i.includes(c)||be(`Unrecognized element <${c}>`)})},Ln=(n,i)=>{Array.from(n.attributes).forEach(r=>{i.indexOf(r.name)===-1&&be([`Unrecognized attribute "${r.name}" on <${n.tagName.toLowerCase()}>.`,`${i.length?`Allowed attributes are: ${i.join(", ")}`:"To set the value, use HTML within the element."}`])})},pg=10,x5=n=>{var i,r;const c=ve(),f=Ot();if(!c||!f)return;typeof n.willOpen=="function"&&n.willOpen(f),(i=et.eventEmitter)===null||i===void 0||i.emit("willOpen",f);const g=window.getComputedStyle(document.body).overflowY;if(E5(c,f,n),setTimeout(()=>{S5(c,f)},pg),Ku()&&(T5(c,n.scrollbarPadding!==void 0?n.scrollbarPadding:!1,g),lx()),ix&&n.backdrop===!1&&f.scrollHeight>c.clientHeight&&(c.style.pointerEvents="auto"),!Zr()&&!et.previousActiveElement&&(et.previousActiveElement=document.activeElement),typeof n.didOpen=="function"){const v=n.didOpen;setTimeout(()=>v(f))}(r=et.eventEmitter)===null||r===void 0||r.emit("didOpen",f)},jr=n=>{const i=Ot();if(!i||n.target!==i)return;const r=ve();r&&(i.removeEventListener("animationend",jr),i.removeEventListener("transitionend",jr),r.style.overflowY="auto",Je(r,A["no-transition"]))},S5=(n,i)=>{j0(i)?(n.style.overflowY="hidden",i.addEventListener("animationend",jr),i.addEventListener("transitionend",jr)):n.style.overflowY="auto"},T5=(n,i,r)=>{ox(),i&&r!=="hidden"&&hx(r),setTimeout(()=>{n.scrollTop=0})},E5=(n,i,r)=>{var c;(c=r.showClass)!==null&&c!==void 0&&c.backdrop&&kt(n,r.showClass.backdrop),r.animation?(i.style.setProperty("opacity","0","important"),re(i,"grid"),setTimeout(()=>{var f;(f=r.showClass)!==null&&f!==void 0&&f.popup&&kt(i,r.showClass.popup),i.style.removeProperty("opacity")},pg)):re(i,"grid"),kt([document.documentElement,document.body],A.shown),r.heightAuto&&r.backdrop&&!r.toast&&kt([document.documentElement,document.body],A["height-auto"])};var Bm={email:(n,i)=>/^[a-zA-Z0-9.+_'-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]+$/.test(n)?Promise.resolve():Promise.resolve(i||"Invalid email address"),url:(n,i)=>/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(n)?Promise.resolve():Promise.resolve(i||"Invalid URL")};function _5(n){n.inputValidator||(n.input==="email"&&(n.inputValidator=Bm.email),n.input==="url"&&(n.inputValidator=Bm.url))}function A5(n){(!n.target||typeof n.target=="string"&&!document.querySelector(n.target)||typeof n.target!="string"&&!n.target.appendChild)&&(be('Target parameter is not valid, defaulting to "body"'),n.target="body")}function C5(n){_5(n),n.showLoaderOnConfirm&&!n.preConfirm&&be(`showLoaderOnConfirm is set to true, but preConfirm is not defined.
showLoaderOnConfirm should be used together with preConfirm, see usage example:
https://sweetalert2.github.io/#ajax-request`),A5(n),typeof n.title=="string"&&(n.title=n.title.split(`
`).join("<br />")),mw(n)}let sa;var hr=new WeakMap;class Jt{constructor(...i){if(Qv(this,hr,Promise.resolve({isConfirmed:!1,isDenied:!1,isDismissed:!0})),typeof window>"u")return;sa=this;const r=Object.freeze(this.constructor.argsToParams(i));this.params=r,this.isAwaitingPromise=!1,$v(hr,this,this._main(sa.params))}_main(i,r={}){if(rg(Object.assign({},r,i)),et.currentInstance){const h=zl.swalPromiseResolve.get(et.currentInstance),{isAwaitingPromise:g}=et.currentInstance;et.currentInstance._destroy(),g||h({isDismissed:!0}),Ku()&&X0()}et.currentInstance=sa;const c=k5(i,r);C5(c),Object.freeze(c),et.timeout&&(et.timeout.stop(),delete et.timeout),clearTimeout(et.restoreFocusTimeout);const f=O5(sa);return U0(sa,c),jt.innerParams.set(sa,c),z5(sa,f,c)}then(i){return Sm(hr,this).then(i)}finally(i){return Sm(hr,this).finally(i)}}const z5=(n,i,r)=>new Promise((c,f)=>{const h=g=>{n.close({isDismissed:!0,dismiss:g,isConfirmed:!1,isDenied:!1})};zl.swalPromiseResolve.set(n,c),zl.swalPromiseReject.set(n,f),i.confirmButton.onclick=()=>{Ox(n)},i.denyButton.onclick=()=>{jx(n)},i.cancelButton.onclick=()=>{Bx(n,h)},i.closeButton.onclick=()=>{h(Ml.close)},Vx(r,i,h),Fw(et,r,h),xx(n,r),x5(r),j5(et,r,h),B5(i,r),setTimeout(()=>{i.container.scrollTop=0})}),k5=(n,i)=>{const r=d5(n),c=Object.assign({},on,i,r,n);return c.showClass=Object.assign({},on.showClass,c.showClass),c.hideClass=Object.assign({},on.hideClass,c.hideClass),c.animation===!1&&(c.showClass={backdrop:"swal2-noanimation"},c.hideClass={}),c},O5=n=>{const i={popup:Ot(),container:ve(),actions:Zi(),confirmButton:ca(),denyButton:Un(),cancelButton:Bl(),loader:Nl(),closeButton:$u(),validationMessage:Qr(),progressSteps:Qu()};return jt.domCache.set(n,i),i},j5=(n,i,r)=>{const c=$r();pe(c),i.timer&&(n.timeout=new f5(()=>{r("timer"),delete n.timeout},i.timer),i.timerProgressBar&&c&&(re(c),Ne(c,i,"timerProgressBar"),setTimeout(()=>{n.timeout&&n.timeout.running&&Wu(i.timer)})))},B5=(n,i)=>{if(!i.toast){if(!Vr(i.allowEnterKey)){_0("allowEnterKey","preConfirm: () => false"),n.popup.focus();return}N5(n)||M5(n,i)||Bu(-1,1)}},N5=n=>{const i=Array.from(n.popup.querySelectorAll("[autofocus]"));for(const r of i)if(r instanceof HTMLElement&&Te(r))return r.focus(),!0;return!1},M5=(n,i)=>i.focusDeny&&Te(n.denyButton)?(n.denyButton.focus(),!0):i.focusCancel&&Te(n.cancelButton)?(n.cancelButton.focus(),!0):i.focusConfirm&&Te(n.confirmButton)?(n.confirmButton.focus(),!0):!1;Jt.prototype.disableButtons=I0;Jt.prototype.enableButtons=P0;Jt.prototype.getInput=J0;Jt.prototype.disableInput=eg;Jt.prototype.enableInput=tg;Jt.prototype.hideLoading=kr;Jt.prototype.disableLoading=kr;Jt.prototype.showValidationMessage=ag;Jt.prototype.resetValidationMessage=ng;Jt.prototype.close=ln;Jt.prototype.closePopup=ln;Jt.prototype.closeModal=ln;Jt.prototype.closeToast=ln;Jt.prototype.rejectPromise=Q0;Jt.prototype.update=sg;Jt.prototype._destroy=cg;Object.assign(Jt,u5);Object.keys(Xx).forEach(n=>{Jt[n]=function(...i){if(sa&&sa[n])return sa[n](...i)}});Jt.DismissReason=Ml;Jt.version="11.26.25";const Br=Jt;Br.default=Br;typeof document<"u"&&function(n,i){var r=n.createElement("style");if(n.getElementsByTagName("head")[0].appendChild(r),r.styleSheet)r.styleSheet.disabled||(r.styleSheet.cssText=i);else try{r.innerHTML=i}catch{r.innerText=i}}(document,':root{--swal2-outline: 0 0 0 3px rgba(100, 150, 200, 0.5);--swal2-container-padding: 0.625em;--swal2-backdrop: rgba(0, 0, 0, 0.4);--swal2-backdrop-transition: background-color 0.15s;--swal2-width: 32em;--swal2-padding: 0 0 1.25em;--swal2-border: none;--swal2-border-radius: 0.3125rem;--swal2-background: white;--swal2-color: #545454;--swal2-show-animation: swal2-show 0.3s;--swal2-hide-animation: swal2-hide 0.15s forwards;--swal2-icon-zoom: 1;--swal2-title-padding: 0.8em 1em 0;--swal2-html-container-padding: 1em 1.6em 0.3em;--swal2-input-border: 1px solid #d9d9d9;--swal2-input-border-radius: 0.1875em;--swal2-input-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.06), 0 0 0 3px transparent;--swal2-input-background: transparent;--swal2-input-transition: border-color 0.2s, box-shadow 0.2s;--swal2-input-hover-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.06), 0 0 0 3px transparent;--swal2-input-focus-border: 1px solid #b4dbed;--swal2-input-focus-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.06), 0 0 0 3px rgba(100, 150, 200, 0.5);--swal2-progress-step-background: #add8e6;--swal2-validation-message-background: #f0f0f0;--swal2-validation-message-color: #666;--swal2-footer-border-color: #eee;--swal2-footer-background: transparent;--swal2-footer-color: inherit;--swal2-timer-progress-bar-background: rgba(0, 0, 0, 0.3);--swal2-close-button-position: initial;--swal2-close-button-inset: auto;--swal2-close-button-font-size: 2.5em;--swal2-close-button-color: #ccc;--swal2-close-button-transition: color 0.2s, box-shadow 0.2s;--swal2-close-button-outline: initial;--swal2-close-button-box-shadow: inset 0 0 0 3px transparent;--swal2-close-button-focus-box-shadow: inset var(--swal2-outline);--swal2-close-button-hover-transform: none;--swal2-actions-justify-content: center;--swal2-actions-width: auto;--swal2-actions-margin: 1.25em auto 0;--swal2-actions-padding: 0;--swal2-actions-border-radius: 0;--swal2-actions-background: transparent;--swal2-action-button-transition: background-color 0.2s, box-shadow 0.2s;--swal2-action-button-hover: black 10%;--swal2-action-button-active: black 10%;--swal2-confirm-button-box-shadow: none;--swal2-confirm-button-border-radius: 0.25em;--swal2-confirm-button-background-color: #7066e0;--swal2-confirm-button-color: #fff;--swal2-deny-button-box-shadow: none;--swal2-deny-button-border-radius: 0.25em;--swal2-deny-button-background-color: #dc3741;--swal2-deny-button-color: #fff;--swal2-cancel-button-box-shadow: none;--swal2-cancel-button-border-radius: 0.25em;--swal2-cancel-button-background-color: #6e7881;--swal2-cancel-button-color: #fff;--swal2-toast-show-animation: swal2-toast-show 0.5s;--swal2-toast-hide-animation: swal2-toast-hide 0.1s forwards;--swal2-toast-border: none;--swal2-toast-box-shadow: 0 0 1px hsl(0deg 0% 0% / 0.075), 0 1px 2px hsl(0deg 0% 0% / 0.075), 1px 2px 4px hsl(0deg 0% 0% / 0.075), 1px 3px 8px hsl(0deg 0% 0% / 0.075), 2px 4px 16px hsl(0deg 0% 0% / 0.075)}[data-swal2-theme=dark]{--swal2-dark-theme-black: #19191a;--swal2-dark-theme-white: #e1e1e1;--swal2-background: var(--swal2-dark-theme-black);--swal2-color: var(--swal2-dark-theme-white);--swal2-footer-border-color: #555;--swal2-input-background: color-mix(in srgb, var(--swal2-dark-theme-black), var(--swal2-dark-theme-white) 10%);--swal2-validation-message-background: color-mix( in srgb, var(--swal2-dark-theme-black), var(--swal2-dark-theme-white) 10% );--swal2-validation-message-color: var(--swal2-dark-theme-white);--swal2-timer-progress-bar-background: rgba(255, 255, 255, 0.7)}@media(prefers-color-scheme: dark){[data-swal2-theme=auto]{--swal2-dark-theme-black: #19191a;--swal2-dark-theme-white: #e1e1e1;--swal2-background: var(--swal2-dark-theme-black);--swal2-color: var(--swal2-dark-theme-white);--swal2-footer-border-color: #555;--swal2-input-background: color-mix(in srgb, var(--swal2-dark-theme-black), var(--swal2-dark-theme-white) 10%);--swal2-validation-message-background: color-mix( in srgb, var(--swal2-dark-theme-black), var(--swal2-dark-theme-white) 10% );--swal2-validation-message-color: var(--swal2-dark-theme-white);--swal2-timer-progress-bar-background: rgba(255, 255, 255, 0.7)}}body.swal2-shown:not(.swal2-no-backdrop,.swal2-toast-shown){overflow:hidden}body.swal2-height-auto{height:auto !important}body.swal2-no-backdrop .swal2-container{background-color:rgba(0,0,0,0) !important;pointer-events:none}body.swal2-no-backdrop .swal2-container .swal2-popup{pointer-events:auto}body.swal2-no-backdrop .swal2-container .swal2-modal{box-shadow:0 0 10px var(--swal2-backdrop)}body.swal2-toast-shown .swal2-container{box-sizing:border-box;width:360px;max-width:100%;background-color:rgba(0,0,0,0);pointer-events:none}body.swal2-toast-shown .swal2-container.swal2-top{inset:0 auto auto 50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-top-end,body.swal2-toast-shown .swal2-container.swal2-top-right{inset:0 0 auto auto}body.swal2-toast-shown .swal2-container.swal2-top-start,body.swal2-toast-shown .swal2-container.swal2-top-left{inset:0 auto auto 0}body.swal2-toast-shown .swal2-container.swal2-center-start,body.swal2-toast-shown .swal2-container.swal2-center-left{inset:50% auto auto 0;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-center{inset:50% auto auto 50%;transform:translate(-50%, -50%)}body.swal2-toast-shown .swal2-container.swal2-center-end,body.swal2-toast-shown .swal2-container.swal2-center-right{inset:50% 0 auto auto;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-start,body.swal2-toast-shown .swal2-container.swal2-bottom-left{inset:auto auto 0 0}body.swal2-toast-shown .swal2-container.swal2-bottom{inset:auto auto 0 50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-end,body.swal2-toast-shown .swal2-container.swal2-bottom-right{inset:auto 0 0 auto}@media print{body.swal2-shown:not(.swal2-no-backdrop,.swal2-toast-shown){overflow-y:scroll !important}body.swal2-shown:not(.swal2-no-backdrop,.swal2-toast-shown)>[aria-hidden=true]{display:none}body.swal2-shown:not(.swal2-no-backdrop,.swal2-toast-shown) .swal2-container{position:static !important}}div:where(.swal2-container){display:grid;position:fixed;z-index:1060;inset:0;box-sizing:border-box;grid-template-areas:"top-start     top            top-end" "center-start  center         center-end" "bottom-start  bottom-center  bottom-end";grid-template-rows:minmax(min-content, auto) minmax(min-content, auto) minmax(min-content, auto);height:100%;padding:var(--swal2-container-padding);overflow-x:hidden;transition:var(--swal2-backdrop-transition);-webkit-overflow-scrolling:touch}div:where(.swal2-container).swal2-backdrop-show,div:where(.swal2-container).swal2-noanimation{background:var(--swal2-backdrop)}div:where(.swal2-container).swal2-backdrop-hide{background:rgba(0,0,0,0) !important}div:where(.swal2-container).swal2-top-start,div:where(.swal2-container).swal2-center-start,div:where(.swal2-container).swal2-bottom-start{grid-template-columns:minmax(0, 1fr) auto auto}div:where(.swal2-container).swal2-top,div:where(.swal2-container).swal2-center,div:where(.swal2-container).swal2-bottom{grid-template-columns:auto minmax(0, 1fr) auto}div:where(.swal2-container).swal2-top-end,div:where(.swal2-container).swal2-center-end,div:where(.swal2-container).swal2-bottom-end{grid-template-columns:auto auto minmax(0, 1fr)}div:where(.swal2-container).swal2-top-start>.swal2-popup{align-self:start}div:where(.swal2-container).swal2-top>.swal2-popup{grid-column:2;place-self:start center}div:where(.swal2-container).swal2-top-end>.swal2-popup,div:where(.swal2-container).swal2-top-right>.swal2-popup{grid-column:3;place-self:start end}div:where(.swal2-container).swal2-center-start>.swal2-popup,div:where(.swal2-container).swal2-center-left>.swal2-popup{grid-row:2;align-self:center}div:where(.swal2-container).swal2-center>.swal2-popup{grid-column:2;grid-row:2;place-self:center center}div:where(.swal2-container).swal2-center-end>.swal2-popup,div:where(.swal2-container).swal2-center-right>.swal2-popup{grid-column:3;grid-row:2;place-self:center end}div:where(.swal2-container).swal2-bottom-start>.swal2-popup,div:where(.swal2-container).swal2-bottom-left>.swal2-popup{grid-column:1;grid-row:3;align-self:end}div:where(.swal2-container).swal2-bottom>.swal2-popup{grid-column:2;grid-row:3;place-self:end center}div:where(.swal2-container).swal2-bottom-end>.swal2-popup,div:where(.swal2-container).swal2-bottom-right>.swal2-popup{grid-column:3;grid-row:3;place-self:end end}div:where(.swal2-container).swal2-grow-row>.swal2-popup,div:where(.swal2-container).swal2-grow-fullscreen>.swal2-popup{grid-column:1/4;width:100%}div:where(.swal2-container).swal2-grow-column>.swal2-popup,div:where(.swal2-container).swal2-grow-fullscreen>.swal2-popup{grid-row:1/4;align-self:stretch}div:where(.swal2-container).swal2-no-transition{transition:none !important}div:where(.swal2-container)[popover]{width:auto;border:0}div:where(.swal2-container) div:where(.swal2-popup){display:none;position:relative;box-sizing:border-box;grid-template-columns:minmax(0, 100%);width:var(--swal2-width);max-width:100%;padding:var(--swal2-padding);border:var(--swal2-border);border-radius:var(--swal2-border-radius);background:var(--swal2-background);color:var(--swal2-color);font-family:inherit;font-size:1rem}div:where(.swal2-container) div:where(.swal2-popup):focus{outline:none}div:where(.swal2-container) div:where(.swal2-popup).swal2-loading{overflow-y:hidden}div:where(.swal2-container) div:where(.swal2-popup).swal2-draggable{cursor:grab}div:where(.swal2-container) div:where(.swal2-popup).swal2-draggable div:where(.swal2-icon){cursor:grab}div:where(.swal2-container) div:where(.swal2-popup).swal2-dragging{cursor:grabbing}div:where(.swal2-container) div:where(.swal2-popup).swal2-dragging div:where(.swal2-icon){cursor:grabbing}div:where(.swal2-container) h2:where(.swal2-title){position:relative;max-width:100%;margin:0;padding:var(--swal2-title-padding);color:inherit;font-size:1.875em;font-weight:600;text-align:center;text-transform:none;overflow-wrap:break-word;cursor:initial}div:where(.swal2-container) div:where(.swal2-actions){display:flex;z-index:1;box-sizing:border-box;flex-wrap:wrap;align-items:center;justify-content:var(--swal2-actions-justify-content);width:var(--swal2-actions-width);margin:var(--swal2-actions-margin);padding:var(--swal2-actions-padding);border-radius:var(--swal2-actions-border-radius);background:var(--swal2-actions-background)}div:where(.swal2-container) div:where(.swal2-loader){display:none;align-items:center;justify-content:center;width:2.2em;height:2.2em;margin:0 1.875em;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;border-width:.25em;border-style:solid;border-radius:100%;border-color:#2778c4 rgba(0,0,0,0) #2778c4 rgba(0,0,0,0)}div:where(.swal2-container) button:where(.swal2-styled){margin:.3125em;padding:.625em 1.1em;transition:var(--swal2-action-button-transition);border:none;box-shadow:0 0 0 3px rgba(0,0,0,0);font-weight:500}div:where(.swal2-container) button:where(.swal2-styled):not([disabled]){cursor:pointer}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-confirm){border-radius:var(--swal2-confirm-button-border-radius);background:initial;background-color:var(--swal2-confirm-button-background-color);box-shadow:var(--swal2-confirm-button-box-shadow);color:var(--swal2-confirm-button-color);font-size:1em}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-confirm):hover{background-color:color-mix(in srgb, var(--swal2-confirm-button-background-color), var(--swal2-action-button-hover))}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-confirm):active{background-color:color-mix(in srgb, var(--swal2-confirm-button-background-color), var(--swal2-action-button-active))}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-deny){border-radius:var(--swal2-deny-button-border-radius);background:initial;background-color:var(--swal2-deny-button-background-color);box-shadow:var(--swal2-deny-button-box-shadow);color:var(--swal2-deny-button-color);font-size:1em}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-deny):hover{background-color:color-mix(in srgb, var(--swal2-deny-button-background-color), var(--swal2-action-button-hover))}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-deny):active{background-color:color-mix(in srgb, var(--swal2-deny-button-background-color), var(--swal2-action-button-active))}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-cancel){border-radius:var(--swal2-cancel-button-border-radius);background:initial;background-color:var(--swal2-cancel-button-background-color);box-shadow:var(--swal2-cancel-button-box-shadow);color:var(--swal2-cancel-button-color);font-size:1em}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-cancel):hover{background-color:color-mix(in srgb, var(--swal2-cancel-button-background-color), var(--swal2-action-button-hover))}div:where(.swal2-container) button:where(.swal2-styled):where(.swal2-cancel):active{background-color:color-mix(in srgb, var(--swal2-cancel-button-background-color), var(--swal2-action-button-active))}div:where(.swal2-container) button:where(.swal2-styled):focus-visible{outline:none;box-shadow:var(--swal2-action-button-focus-box-shadow)}div:where(.swal2-container) button:where(.swal2-styled)[disabled]:not(.swal2-loading){opacity:.4}div:where(.swal2-container) button:where(.swal2-styled)::-moz-focus-inner{border:0}div:where(.swal2-container) div:where(.swal2-footer){margin:1em 0 0;padding:1em 1em 0;border-top:1px solid var(--swal2-footer-border-color);background:var(--swal2-footer-background);color:var(--swal2-footer-color);font-size:1em;text-align:center;cursor:initial}div:where(.swal2-container) .swal2-timer-progress-bar-container{position:absolute;right:0;bottom:0;left:0;grid-column:auto !important;overflow:hidden;border-bottom-right-radius:var(--swal2-border-radius);border-bottom-left-radius:var(--swal2-border-radius)}div:where(.swal2-container) div:where(.swal2-timer-progress-bar){width:100%;height:.25em;background:var(--swal2-timer-progress-bar-background)}div:where(.swal2-container) img:where(.swal2-image){max-width:100%;margin:2em auto 1em;cursor:initial}div:where(.swal2-container) button:where(.swal2-close){position:var(--swal2-close-button-position);inset:var(--swal2-close-button-inset);z-index:2;align-items:center;justify-content:center;width:1.2em;height:1.2em;margin-top:0;margin-right:0;margin-bottom:-1.2em;padding:0;overflow:hidden;transition:var(--swal2-close-button-transition);border:none;border-radius:var(--swal2-border-radius);outline:var(--swal2-close-button-outline);background:rgba(0,0,0,0);color:var(--swal2-close-button-color);font-family:monospace;font-size:var(--swal2-close-button-font-size);cursor:pointer;justify-self:end}div:where(.swal2-container) button:where(.swal2-close):hover{transform:var(--swal2-close-button-hover-transform);background:rgba(0,0,0,0);color:#f27474}div:where(.swal2-container) button:where(.swal2-close):focus-visible{outline:none;box-shadow:var(--swal2-close-button-focus-box-shadow)}div:where(.swal2-container) button:where(.swal2-close)::-moz-focus-inner{border:0}div:where(.swal2-container) div:where(.swal2-html-container){z-index:1;justify-content:center;margin:0;padding:var(--swal2-html-container-padding);overflow:auto;color:inherit;font-size:1.125em;font-weight:normal;line-height:normal;text-align:center;overflow-wrap:break-word;word-break:break-word;cursor:initial}div:where(.swal2-container) input:where(.swal2-input),div:where(.swal2-container) input:where(.swal2-file),div:where(.swal2-container) textarea:where(.swal2-textarea),div:where(.swal2-container) select:where(.swal2-select),div:where(.swal2-container) div:where(.swal2-radio),div:where(.swal2-container) label:where(.swal2-checkbox){margin:1em 2em 3px}div:where(.swal2-container) input:where(.swal2-input),div:where(.swal2-container) input:where(.swal2-file),div:where(.swal2-container) textarea:where(.swal2-textarea){box-sizing:border-box;width:auto;transition:var(--swal2-input-transition);border:var(--swal2-input-border);border-radius:var(--swal2-input-border-radius);background:var(--swal2-input-background);box-shadow:var(--swal2-input-box-shadow);color:inherit;font-size:1.125em}div:where(.swal2-container) input:where(.swal2-input).swal2-inputerror,div:where(.swal2-container) input:where(.swal2-file).swal2-inputerror,div:where(.swal2-container) textarea:where(.swal2-textarea).swal2-inputerror{border-color:#f27474 !important;box-shadow:0 0 2px #f27474 !important}div:where(.swal2-container) input:where(.swal2-input):hover,div:where(.swal2-container) input:where(.swal2-file):hover,div:where(.swal2-container) textarea:where(.swal2-textarea):hover{box-shadow:var(--swal2-input-hover-box-shadow)}div:where(.swal2-container) input:where(.swal2-input):focus,div:where(.swal2-container) input:where(.swal2-file):focus,div:where(.swal2-container) textarea:where(.swal2-textarea):focus{border:var(--swal2-input-focus-border);outline:none;box-shadow:var(--swal2-input-focus-box-shadow)}div:where(.swal2-container) input:where(.swal2-input)::placeholder,div:where(.swal2-container) input:where(.swal2-file)::placeholder,div:where(.swal2-container) textarea:where(.swal2-textarea)::placeholder{color:#ccc}div:where(.swal2-container) .swal2-range{margin:1em 2em 3px;background:var(--swal2-background)}div:where(.swal2-container) .swal2-range input{width:80%}div:where(.swal2-container) .swal2-range output{width:20%;color:inherit;font-weight:600;text-align:center}div:where(.swal2-container) .swal2-range input,div:where(.swal2-container) .swal2-range output{height:2.625em;padding:0;font-size:1.125em;line-height:2.625em}div:where(.swal2-container) .swal2-input{height:2.625em;padding:0 .75em}div:where(.swal2-container) .swal2-file{width:75%;margin-right:auto;margin-left:auto;background:var(--swal2-input-background);font-size:1.125em}div:where(.swal2-container) .swal2-textarea{height:6.75em;padding:.75em}div:where(.swal2-container) .swal2-select{min-width:50%;max-width:100%;padding:.375em .625em;background:var(--swal2-input-background);color:inherit;font-size:1.125em}div:where(.swal2-container) .swal2-radio,div:where(.swal2-container) .swal2-checkbox{align-items:center;justify-content:center;background:var(--swal2-background);color:inherit}div:where(.swal2-container) .swal2-radio label,div:where(.swal2-container) .swal2-checkbox label{margin:0 .6em;font-size:1.125em}div:where(.swal2-container) .swal2-radio input,div:where(.swal2-container) .swal2-checkbox input{flex-shrink:0;margin:0 .4em}div:where(.swal2-container) label:where(.swal2-input-label){display:flex;justify-content:center;margin:1em auto 0}div:where(.swal2-container) div:where(.swal2-validation-message){align-items:center;justify-content:center;margin:1em 0 0;padding:.625em;overflow:hidden;background:var(--swal2-validation-message-background);color:var(--swal2-validation-message-color);font-size:1em;font-weight:300}div:where(.swal2-container) div:where(.swal2-validation-message)::before{content:"!";display:inline-block;width:1.5em;min-width:1.5em;height:1.5em;margin:0 .625em;border-radius:50%;background-color:#f27474;color:#fff;font-weight:600;line-height:1.5em;text-align:center}div:where(.swal2-container) .swal2-progress-steps{flex-wrap:wrap;align-items:center;max-width:100%;margin:1.25em auto;padding:0;background:rgba(0,0,0,0);font-weight:600}div:where(.swal2-container) .swal2-progress-steps li{display:inline-block;position:relative}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step{z-index:20;flex-shrink:0;width:2em;height:2em;border-radius:2em;background:#2778c4;color:#fff;line-height:2em;text-align:center}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step.swal2-active-progress-step{background:#2778c4}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step{background:var(--swal2-progress-step-background);color:#fff}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step-line{background:var(--swal2-progress-step-background)}div:where(.swal2-container) .swal2-progress-steps .swal2-progress-step-line{z-index:10;flex-shrink:0;width:2.5em;height:.4em;margin:0 -1px;background:#2778c4}div:where(.swal2-icon){position:relative;box-sizing:content-box;justify-content:center;width:5em;height:5em;margin:2.5em auto .6em;zoom:var(--swal2-icon-zoom);border:.25em solid rgba(0,0,0,0);border-radius:50%;border-color:#000;font-family:inherit;line-height:5em;cursor:default;user-select:none}div:where(.swal2-icon) .swal2-icon-content{display:flex;align-items:center;font-size:3.75em}div:where(.swal2-icon).swal2-error{border-color:#f27474;color:#f27474}div:where(.swal2-icon).swal2-error .swal2-x-mark{position:relative;flex-grow:1}div:where(.swal2-icon).swal2-error [class^=swal2-x-mark-line]{display:block;position:absolute;top:2.3125em;width:2.9375em;height:.3125em;border-radius:.125em;background-color:#f27474}div:where(.swal2-icon).swal2-error [class^=swal2-x-mark-line][class$=left]{left:1.0625em;transform:rotate(45deg)}div:where(.swal2-icon).swal2-error [class^=swal2-x-mark-line][class$=right]{right:1em;transform:rotate(-45deg)}div:where(.swal2-icon).swal2-error.swal2-icon-show{animation:swal2-animate-error-icon .5s}div:where(.swal2-icon).swal2-error.swal2-icon-show .swal2-x-mark{animation:swal2-animate-error-x-mark .5s}div:where(.swal2-icon).swal2-warning{border-color:#f8bb86;color:#f8bb86}div:where(.swal2-icon).swal2-warning.swal2-icon-show{animation:swal2-animate-error-icon .5s}div:where(.swal2-icon).swal2-warning.swal2-icon-show .swal2-icon-content{animation:swal2-animate-i-mark .5s}div:where(.swal2-icon).swal2-info{border-color:#3fc3ee;color:#3fc3ee}div:where(.swal2-icon).swal2-info.swal2-icon-show{animation:swal2-animate-error-icon .5s}div:where(.swal2-icon).swal2-info.swal2-icon-show .swal2-icon-content{animation:swal2-animate-i-mark .8s}div:where(.swal2-icon).swal2-question{border-color:#87adbd;color:#87adbd}div:where(.swal2-icon).swal2-question.swal2-icon-show{animation:swal2-animate-error-icon .5s}div:where(.swal2-icon).swal2-question.swal2-icon-show .swal2-icon-content{animation:swal2-animate-question-mark .8s}div:where(.swal2-icon).swal2-success{border-color:#a5dc86;color:#a5dc86}div:where(.swal2-icon).swal2-success [class^=swal2-success-circular-line]{position:absolute;width:3.75em;height:7.5em;border-radius:50%}div:where(.swal2-icon).swal2-success [class^=swal2-success-circular-line][class$=left]{top:-0.4375em;left:-2.0635em;transform:rotate(-45deg);transform-origin:3.75em 3.75em;border-radius:7.5em 0 0 7.5em}div:where(.swal2-icon).swal2-success [class^=swal2-success-circular-line][class$=right]{top:-0.6875em;left:1.875em;transform:rotate(-45deg);transform-origin:0 3.75em;border-radius:0 7.5em 7.5em 0}div:where(.swal2-icon).swal2-success .swal2-success-ring{position:absolute;z-index:2;top:-0.25em;left:-0.25em;box-sizing:content-box;width:100%;height:100%;border:.25em solid rgba(165,220,134,.3);border-radius:50%}div:where(.swal2-icon).swal2-success .swal2-success-fix{position:absolute;z-index:1;top:.5em;left:1.625em;width:.4375em;height:5.625em;transform:rotate(-45deg)}div:where(.swal2-icon).swal2-success [class^=swal2-success-line]{display:block;position:absolute;z-index:2;height:.3125em;border-radius:.125em;background-color:#a5dc86}div:where(.swal2-icon).swal2-success [class^=swal2-success-line][class$=tip]{top:2.875em;left:.8125em;width:1.5625em;transform:rotate(45deg)}div:where(.swal2-icon).swal2-success [class^=swal2-success-line][class$=long]{top:2.375em;right:.5em;width:2.9375em;transform:rotate(-45deg)}div:where(.swal2-icon).swal2-success.swal2-icon-show .swal2-success-line-tip{animation:swal2-animate-success-line-tip .75s}div:where(.swal2-icon).swal2-success.swal2-icon-show .swal2-success-line-long{animation:swal2-animate-success-line-long .75s}div:where(.swal2-icon).swal2-success.swal2-icon-show .swal2-success-circular-line-right{animation:swal2-rotate-success-circular-line 4.25s ease-in}[class^=swal2]{-webkit-tap-highlight-color:rgba(0,0,0,0)}.swal2-show{animation:var(--swal2-show-animation)}.swal2-hide{animation:var(--swal2-hide-animation)}.swal2-noanimation{transition:none}.swal2-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}.swal2-rtl .swal2-close{margin-right:initial;margin-left:0}.swal2-rtl .swal2-timer-progress-bar{right:0;left:auto}.swal2-toast{box-sizing:border-box;grid-column:1/4 !important;grid-row:1/4 !important;grid-template-columns:min-content auto min-content;padding:1em;overflow-y:hidden;border:var(--swal2-toast-border);background:var(--swal2-background);box-shadow:var(--swal2-toast-box-shadow);pointer-events:auto}.swal2-toast>*{grid-column:2}.swal2-toast h2:where(.swal2-title){margin:.5em 1em;padding:0;font-size:1em;text-align:initial}.swal2-toast .swal2-loading{justify-content:center}.swal2-toast input:where(.swal2-input){height:2em;margin:.5em;font-size:1em}.swal2-toast .swal2-validation-message{font-size:1em}.swal2-toast div:where(.swal2-footer){margin:.5em 0 0;padding:.5em 0 0;font-size:.8em}.swal2-toast button:where(.swal2-close){grid-column:3/3;grid-row:1/99;align-self:center;width:.8em;height:.8em;margin:0;font-size:2em}.swal2-toast div:where(.swal2-html-container){margin:.5em 1em;padding:0;overflow:initial;font-size:1em;text-align:initial}.swal2-toast div:where(.swal2-html-container):empty{padding:0}.swal2-toast .swal2-loader{grid-column:1;grid-row:1/99;align-self:center;width:2em;height:2em;margin:.25em}.swal2-toast .swal2-icon{grid-column:1;grid-row:1/99;align-self:center;width:2em;min-width:2em;height:2em;margin:0 .5em 0 0}.swal2-toast .swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:1.8em;font-weight:bold}.swal2-toast .swal2-icon.swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line]{top:.875em;width:1.375em}.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:.3125em}.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:.3125em}.swal2-toast div:where(.swal2-actions){justify-content:flex-start;height:auto;margin:0;margin-top:.5em;padding:0 .5em}.swal2-toast button:where(.swal2-styled){margin:.25em .5em;padding:.4em .6em;font-size:1em}.swal2-toast .swal2-success{border-color:#a5dc86}.swal2-toast .swal2-success [class^=swal2-success-circular-line]{position:absolute;width:1.6em;height:3em;border-radius:50%}.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=left]{top:-0.8em;left:-0.5em;transform:rotate(-45deg);transform-origin:2em 2em;border-radius:4em 0 0 4em}.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=right]{top:-0.25em;left:.9375em;transform-origin:0 1.5em;border-radius:0 4em 4em 0}.swal2-toast .swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-toast .swal2-success .swal2-success-fix{top:0;left:.4375em;width:.4375em;height:2.6875em}.swal2-toast .swal2-success [class^=swal2-success-line]{height:.3125em}.swal2-toast .swal2-success [class^=swal2-success-line][class$=tip]{top:1.125em;left:.1875em;width:.75em}.swal2-toast .swal2-success [class^=swal2-success-line][class$=long]{top:.9375em;right:.1875em;width:1.375em}.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-tip{animation:swal2-toast-animate-success-line-tip .75s}.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-long{animation:swal2-toast-animate-success-line-long .75s}.swal2-toast.swal2-show{animation:var(--swal2-toast-show-animation)}.swal2-toast.swal2-hide{animation:var(--swal2-toast-hide-animation)}@keyframes swal2-show{0%{transform:translate3d(0, -50px, 0) scale(0.9);opacity:0}100%{transform:translate3d(0, 0, 0) scale(1);opacity:1}}@keyframes swal2-hide{0%{transform:translate3d(0, 0, 0) scale(1);opacity:1}100%{transform:translate3d(0, -50px, 0) scale(0.9);opacity:0}}@keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-0.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(0.4);opacity:0}50%{margin-top:1.625em;transform:scale(0.4);opacity:0}80%{margin-top:-0.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0deg);opacity:1}}@keyframes swal2-rotate-loading{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes swal2-animate-question-mark{0%{transform:rotateY(-360deg)}100%{transform:rotateY(0)}}@keyframes swal2-animate-i-mark{0%{transform:rotateZ(45deg);opacity:0}25%{transform:rotateZ(-25deg);opacity:.4}50%{transform:rotateZ(15deg);opacity:.8}75%{transform:rotateZ(-5deg);opacity:1}100%{transform:rotateX(0);opacity:1}}@keyframes swal2-toast-show{0%{transform:translateY(-0.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(0.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0deg)}}@keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-0.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}');const D5={background:"#0b0b0b",color:"#f5f5f5",confirmButtonColor:"#f5f5f5",cancelButtonColor:"#1a1a1a",reverseButtons:!0,customClass:{popup:"notesSwalPopup",title:"notesSwalTitle",htmlContainer:"notesSwalText",confirmButton:"notesSwalConfirm",cancelButton:"notesSwalCancel"}},R5=n=>String(n).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;"),L5=async n=>(await Br.fire({...D5,icon:"warning",iconColor:"#ef4444",title:"Delete this note?",html:`
            <div style="
                color:#8a8a8a;
                font-size:13px;
                line-height:1.7;
            ">
                <strong style="
                    display:block;
                    margin-bottom:6px;
                    color:#d4d4d4;
                ">
                    ${R5((n==null?void 0:n.title)||"Untitled Note")}
                </strong>

                This note will be permanently removed from this browser.
            </div>
        `,showCancelButton:!0,confirmButtonText:"Delete Note",cancelButtonText:"Cancel",focusCancel:!0,allowOutsideClick:!1})).isConfirmed,mg="a2rp-notes",H5=()=>{try{const n=localStorage.getItem(mg);if(!n)return[];const i=JSON.parse(n);return Array.isArray(i)?i.map(r=>({id:r.id,title:r.title||"",content:r.content||"",category:r.category||"General",tags:Array.isArray(r.tags)?r.tags:[],pinned:!!r.pinned,createdAt:r.createdAt||new Date().toISOString(),updatedAt:r.updatedAt||r.createdAt||new Date().toISOString()})):[]}catch{return[]}},U5=n=>{try{return localStorage.setItem(mg,JSON.stringify(n)),!0}catch{return!1}},q5=({title:n,content:i,category:r,tags:c=[]})=>{const f=new Date().toISOString();return{id:`${Date.now()}-${Math.random().toString(36).slice(2,9)}`,title:n.trim(),content:i.trim(),category:r||"General",tags:gg(c),pinned:!1,createdAt:f,updatedAt:f}},Y5=(n,{title:i,content:r,category:c,tags:f=[]})=>({...n,title:i.trim(),content:r.trim(),category:c||"General",tags:gg(f),updatedAt:new Date().toISOString()}),G5=n=>({...n,pinned:!n.pinned,updatedAt:new Date().toISOString()}),gg=n=>Array.isArray(n)?[...new Set(n.map(i=>i.trim()).filter(Boolean))]:typeof n=="string"?[...new Set(n.split(",").map(i=>i.trim()).filter(Boolean))]:[],X5=(n,i)=>n.filter(r=>r.id!==i),V5={Wrapper:Be.div`
        min-height: 100vh;
        color: #f5f5f5;
        background:
            radial-gradient(
                circle at 12% -10%,
                rgba(255, 255, 255, 0.055),
                transparent 26%
            ),
            radial-gradient(
                circle at 88% 4%,
                rgba(255, 255, 255, 0.025),
                transparent 22%
            ),
            #050505;

        main {
            width: min(calc(100% - 48px), 1440px);
            margin: 0 auto;
            padding: 112px 0 0;
        }

        .tableSection {
            margin-top: 18px;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        @media (max-width: 700px) {
            main {
                width: min(calc(100% - 28px), 1440px);
                padding-top: 96px;
            }
        }
    `},Nm={title:"",content:"",category:"General",tags:""};function Q5(){const[n,i]=st.useState(()=>H5()),[r,c]=st.useState(Nm),[f,h]=st.useState(null),[g,v]=st.useState(null),[y,w]=st.useState(!1),[j,R]=st.useState(""),[M,F]=st.useState("All"),[G,Q]=st.useState("all"),[Z,K]=st.useState("updatedAt"),[k,q]=st.useState(en.DESC),[P,L]=st.useState(1),[it,U]=st.useState(qu);st.useEffect(()=>{U5(n)},[n]);const X=st.useMemo(()=>{const at=n.map(ut=>ut.category||"General");return["All",...new Set(["General","Personal","Work","Ideas",...at])]},[n]),Y=st.useMemo(()=>x0({notes:n,searchQuery:j,category:M,pinnedFilter:G}),[n,j,M,G]),W=st.useMemo(()=>qv({notes:n,searchQuery:j,category:M,pinnedFilter:G,sortKey:Z,sortDirection:k,page:P,pageSize:it}),[n,j,M,G,Z,k,P,it]);st.useEffect(()=>{P>W.totalPages&&L(W.totalPages)},[P,W.totalPages]);const bt=()=>{c(Nm),h(null)},Gt=()=>{bt(),v(null),w(!0)},mt=()=>{w(!1),bt()},Xt=(at,ut)=>{c(St=>({...St,[at]:ut}))},Ht=()=>{const at=r.title.trim(),ut=r.content.trim();if(!at){_t.warning("Please enter a note title.");return}if(!ut){_t.warning("Please enter some note content.");return}if(f)i(St=>St.map(dt=>dt.id!==f?dt:Y5(dt,r))),_t.success("Note updated successfully.");else{const St=q5(r);i(dt=>[St,...dt]),_t.success("Note created successfully.")}mt(),L(1)},D=at=>{v(at)},lt=()=>{v(null)},I=at=>{v(null),h(at.id),c({title:at.title,content:at.content,category:at.category,tags:(at.tags||[]).join(", ")}),w(!0)},wt=at=>{let ut=!1;i(St=>St.map(dt=>{if(dt.id!==at)return dt;const Ee=G5(dt);return ut=Ee.pinned,Ee})),_t.success(ut?"Note pinned.":"Note unpinned.")},b=async at=>{await L5(at)&&(i(St=>X5(St,at.id)),f===at.id&&mt(),(g==null?void 0:g.id)===at.id&&v(null),_t.success("Note deleted successfully."))},N=at=>{Z===at?q(ut=>ut===en.ASC?en.DESC:en.ASC):(K(at),q(at==="createdAt"||at==="updatedAt"?en.DESC:en.ASC)),L(1)},J=at=>{R(at),L(1)},V=at=>{F(at),L(1)},H=at=>{Q(at),L(1)},ot=()=>{R(""),F("All"),Q("all"),L(1)},ct=at=>{U(at),L(1)};return m.jsxs(V5.Wrapper,{id:"top",children:[m.jsx(Av,{totalNotes:n.length}),m.jsxs("main",{id:"notes",children:[m.jsx(Mv,{searchQuery:j,selectedCategory:M,pinnedFilter:G,categories:X,filteredCount:Y.length,totalNotes:n.length,onSearchChange:J,onCategoryChange:V,onPinnedFilterChange:H,onClearFilters:ot,onAddNote:Gt}),m.jsxs("div",{className:"tableSection",children:[m.jsx(Bv,{notes:W.items,startIndex:W.startItem?W.startItem-1:0,sortKey:Z,sortDirection:k,onSort:N,onView:D,onEdit:I,onTogglePin:wt,onDelete:b}),m.jsx(Gv,{currentPage:W.currentPage,totalPages:W.totalPages,pageSize:W.pageSize,totalItems:W.totalItems,startItem:W.startItem,endItem:W.endItem,onPageChange:L,onPageSizeChange:ct})]})]}),m.jsx(Sv,{}),m.jsx(zv,{isOpen:y,isEditing:!!f,form:r,onChange:Xt,onSave:Ht,onClose:mt}),m.jsx(Xv,{isOpen:!!g,note:g,onClose:lt,onEdit:I}),m.jsx(Dv,{}),m.jsx(Tv,{})]})}J2.createRoot(document.getElementById("root")).render(m.jsx(m.Fragment,{children:m.jsx(Q5,{})}));

'use strict';
var main,e={};e.d=(t,r,n)=>{var i=(r,n)=>{for(var i in r)e.o(r,i)&&!e.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,[n]:r[i]})};i(r,"get"),i(n,"value")},e.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var t={};(()=>{var r;let n,i,a,o,s;e.d(t,{main:()=>main});let l=Symbol.for("jsx.fragment");function d(e,t){let{children:r,...n}=null===t||"object"!=typeof t||Array.isArray(t)?{}:t,i=function e(t){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];for(let n of t)null!=n&&"boolean"!=typeof n&&(Array.isArray(n)?e(n,r):r.push(n instanceof Node?n:String(n)));return r}(null==r?[]:Array.isArray(r)?r:[r]);if(e===l){let e=document.createDocumentFragment();return e.append(...i),e}if("function"==typeof e){let t=Reflect.apply(e,void 0,[{...n,children:i}]);if(!(t instanceof Node))throw TypeError("JSX components must return a DOM Node");return t}if("string"!=typeof e)throw TypeError("JSX element types must be tag names or component functions");let a={},o={...n};for(let[e,t]of Object.entries(o))e.startsWith("on")&&"function"==typeof t?(a[e]=t,delete o[e]):"boolean"==typeof t&&(t?o[e]=e:delete o[e]);let s=Object.keys(o).length>0?i.length>1?E(e,o,i):E(e,o,i[0]):i.length>1?E(e,{},i):E(e,{},i[0]);for(let[e,t]of Object.entries(a)){let r=e.slice(2).toLowerCase();s.addEventListener(r,t)}return s}function c(e,t,r){function n(r,n){if(r._zod||Object.defineProperty(r,"_zod",{value:{def:n,constr:o,traits:new Set},enumerable:!1}),r._zod.traits.has(e))return;r._zod.traits.add(e),t(r,n);let i=o.prototype,a=Object.keys(i);for(let e=0;e<a.length;e++){let t=a[e];t in r||(r[t]=i[t].bind(r))}}let i=r?.Parent??Object;class a extends i{}function o(e){var t;let i=r?.Parent?new a:this;for(let r of(n(i,e),(t=i._zod).deferred??(t.deferred=[]),i._zod.deferred))r();return i}return Object.defineProperty(a,"name",{value:e}),Object.defineProperty(o,"init",{value:n}),Object.defineProperty(o,Symbol.hasInstance,{value:t=>!!r?.Parent&&t instanceof r.Parent||t?._zod?.traits?.has(e)}),Object.defineProperty(o,"name",{value:e}),o}Object.freeze({status:"aborted"}),Symbol("zod_brand");class p extends Error{constructor(){super("Encountered Promise during synchronous parse. Use .parseAsync() instead.")}}let u={};function f(e){return e&&Object.assign(u,e),u}function b(e,t){return"bigint"==typeof t?t.toString():t}function g(e){let t=+!!e.startsWith("^"),r=e.endsWith("$")?e.length-1:e.length;return e.slice(t,r)}let m=Symbol("evaluating");function h(e,t,r){let n;Object.defineProperty(e,t,{get(){if(n!==m)return void 0===n&&(n=m,n=r()),n},set(r){Object.defineProperty(e,t,{value:r})},configurable:!0})}let v="captureStackTrace"in Error?Error.captureStackTrace:(...e)=>{};function y(e){return"object"==typeof e&&null!==e&&!Array.isArray(e)}function w(e){if(!1===y(e))return!1;let t=e.constructor;if(void 0===t||"function"!=typeof t)return!0;let r=t.prototype;return!1!==y(r)&&!1!==Object.prototype.hasOwnProperty.call(r,"isPrototypeOf")}function x(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function k(e){if(!e)return{};if("string"==typeof e)return{error:()=>e};if(e?.message!==void 0){if(e?.error!==void 0)throw Error("Cannot specify both `message` and `error` params");e.error=e.message}return(delete e.message,"string"==typeof e.error)?{...e,error:()=>e.error}:e}function z(e,t=0){if(!0===e.aborted)return!0;for(let r=t;r<e.issues.length;r++)if(e.issues[r]?.continue!==!0)return!0;return!1}function j(e,t){return t.map(t=>(t.path??(t.path=[]),t.path.unshift(e),t))}function C(e){return"string"==typeof e?e:e?.message}function S(e,t,r){let n={...e,path:e.path??[]};return e.message||(n.message=C(e.inst?._zod.def?.error?.(e))??C(t?.error?.(e))??C(r.customError?.(e))??C(r.localeError?.(e))??"Invalid input"),delete n.inst,delete n.continue,t?.reportInput||delete n.input,n}let $=(e,t)=>{e.name="$ZodError",Object.defineProperty(e,"_zod",{value:e._zod,enumerable:!1}),Object.defineProperty(e,"issues",{value:t,enumerable:!1}),e.message=JSON.stringify(t,b,2),Object.defineProperty(e,"toString",{value:()=>e.message,enumerable:!1})},P=c("$ZodError",$),O=c("$ZodError",$,{Parent:Error}),M=(i=O,(e,t,r,n)=>{let a=r?Object.assign(r,{async:!1}):{async:!1},o=e._zod.run({value:t,issues:[]},a);if(o instanceof Promise)throw new p;if(o.issues.length){let e=new(n?.Err??i)(o.issues.map(e=>S(e,a,f())));throw v(e,n?.callee),e}return o.value}),N=(a=O,async(e,t,r,n)=>{let i=r?Object.assign(r,{async:!0}):{async:!0},o=e._zod.run({value:t,issues:[]},i);if(o instanceof Promise&&(o=await o),o.issues.length){let e=new(n?.Err??a)(o.issues.map(e=>S(e,i,f())));throw v(e,n?.callee),e}return o.value}),R=(o=O,(e,t,r)=>{let n=r?{...r,async:!1}:{async:!1},i=e._zod.run({value:t,issues:[]},n);if(i instanceof Promise)throw new p;return i.issues.length?{success:!1,error:new(o??P)(i.issues.map(e=>S(e,n,f())))}:{success:!0,data:i.value}}),I=(s=O,async(e,t,r)=>{let n=r?Object.assign(r,{async:!0}):{async:!0},i=e._zod.run({value:t,issues:[]},n);return i instanceof Promise&&(i=await i),i.issues.length?{success:!1,error:new s(i.issues.map(e=>S(e,n,f())))}:{success:!0,data:i.value}}),A=/^-?\d+(?:\.\d+)?$/,T=/^(?:true|false)$/i,D=/^null$/i,U={major:4,minor:3,patch:6},q=c("$ZodType",(e,t)=>{var r;e??(e={}),e._zod.def=t,e._zod.bag=e._zod.bag||{},e._zod.version=U;let n=[...e._zod.def.checks??[]];for(let t of(e._zod.traits.has("$ZodCheck")&&n.unshift(e),n))for(let r of t._zod.onattach)r(e);if(0===n.length)(r=e._zod).deferred??(r.deferred=[]),e._zod.deferred?.push(()=>{e._zod.run=e._zod.parse});else{let t=(e,t,r)=>{let n,i=z(e);for(let a of t){if(a._zod.def.when){if(!a._zod.def.when(e))continue}else if(i)continue;let t=e.issues.length,o=a._zod.check(e);if(o instanceof Promise&&r?.async===!1)throw new p;if(n||o instanceof Promise)n=(n??Promise.resolve()).then(async()=>{await o,e.issues.length!==t&&(i||(i=z(e,t)))});else{if(e.issues.length===t)continue;i||(i=z(e,t))}}return n?n.then(()=>e):e},r=(r,i,a)=>{if(z(r))return r.aborted=!0,r;let o=t(i,n,a);if(o instanceof Promise){if(!1===a.async)throw new p;return o.then(t=>e._zod.parse(t,a))}return e._zod.parse(o,a)};e._zod.run=(i,a)=>{if(a.skipChecks)return e._zod.parse(i,a);if("backward"===a.direction){let t=e._zod.parse({value:i.value,issues:[]},{...a,skipChecks:!0});return t instanceof Promise?t.then(e=>r(e,i,a)):r(t,i,a)}let o=e._zod.parse(i,a);if(o instanceof Promise){if(!1===a.async)throw new p;return o.then(e=>t(e,n,a))}return t(o,n,a)}}h(e,"~standard",()=>({validate:t=>{try{let r=R(e,t);return r.success?{value:r.data}:{issues:r.error?.issues}}catch(r){return I(e,t).then(e=>e.success?{value:e.data}:{issues:e.error?.issues})}},vendor:"zod",version:1}))}),B=c("$ZodString",(e,t)=>{var r;let n;q.init(e,t),e._zod.pattern=[...e?._zod.bag?.patterns??[]].pop()??(n=(r=e._zod.bag)?`[\\s\\S]{${r?.minimum??0},${r?.maximum??""}}`:"[\\s\\S]*",RegExp(`^${n}$`)),e._zod.parse=(r,n)=>{if(t.coerce)try{r.value=String(r.value)}catch(e){}return"string"==typeof r.value||r.issues.push({expected:"string",code:"invalid_type",input:r.value,inst:e}),r}}),F=c("$ZodNumber",(e,t)=>{q.init(e,t),e._zod.pattern=e._zod.bag.pattern??A,e._zod.parse=(r,n)=>{if(t.coerce)try{r.value=Number(r.value)}catch(e){}let i=r.value;if("number"==typeof i&&!Number.isNaN(i)&&Number.isFinite(i))return r;let a="number"==typeof i?Number.isNaN(i)?"NaN":Number.isFinite(i)?void 0:"Infinity":void 0;return r.issues.push({expected:"number",code:"invalid_type",input:i,inst:e,...a?{received:a}:{}}),r}}),Z=c("$ZodBoolean",(e,t)=>{q.init(e,t),e._zod.pattern=T,e._zod.parse=(r,n)=>{if(t.coerce)try{r.value=!!r.value}catch(e){}let i=r.value;return"boolean"==typeof i||r.issues.push({expected:"boolean",code:"invalid_type",input:i,inst:e}),r}}),V=c("$ZodNull",(e,t)=>{q.init(e,t),e._zod.pattern=D,e._zod.values=new Set([null]),e._zod.parse=(t,r)=>{let n=t.value;return null===n||t.issues.push({expected:"null",code:"invalid_type",input:n,inst:e}),t}}),W=c("$ZodUnknown",(e,t)=>{q.init(e,t),e._zod.parse=e=>e});function J(e,t,r){e.issues.length&&t.issues.push(...j(r,e.issues)),t.value[r]=e.value}let G=c("$ZodArray",(e,t)=>{q.init(e,t),e._zod.parse=(r,n)=>{let i=r.value;if(!Array.isArray(i))return r.issues.push({expected:"array",code:"invalid_type",input:i,inst:e}),r;r.value=Array(i.length);let a=[];for(let e=0;e<i.length;e++){let o=i[e],s=t.element._zod.run({value:o,issues:[]},n);s instanceof Promise?a.push(s.then(t=>J(t,r,e))):J(s,r,e)}return a.length?Promise.all(a).then(()=>r):r}});function K(e,t,r,n,i){if(e.issues.length){if(i&&!(r in n))return;t.issues.push(...j(r,e.issues))}void 0===e.value?r in n&&(t.value[r]=void 0):t.value[r]=e.value}let H=c("$ZodObject",(e,t)=>{var r;let n;q.init(e,t);let i=Object.getOwnPropertyDescriptor(t,"shape");if(!i?.get){let e=t.shape;Object.defineProperty(t,"shape",{get:()=>{let r={...e};return Object.defineProperty(t,"shape",{value:r}),r}})}let a=(r=()=>(function(e){var t;let r=Object.keys(e.shape);for(let t of r)if(!e.shape?.[t]?._zod?.traits?.has("$ZodType"))throw Error(`Invalid element at key "${t}": expected a Zod schema`);let n=Object.keys(t=e.shape).filter(e=>"optional"===t[e]._zod.optin&&"optional"===t[e]._zod.optout);return{...e,keys:r,keySet:new Set(r),numKeys:r.length,optionalKeys:new Set(n)}})(t),{get value(){{let e=r();return Object.defineProperty(this,"value",{value:e}),e}}});h(e._zod,"propValues",()=>{let e=t.shape,r={};for(let t in e){let n=e[t]._zod;if(n.values)for(let e of(r[t]??(r[t]=new Set),n.values))r[t].add(e)}return r});let o=t.catchall;e._zod.parse=(t,r)=>{n??(n=a.value);let i=t.value;if(!y(i))return t.issues.push({expected:"object",code:"invalid_type",input:i,inst:e}),t;t.value={};let s=[],l=n.shape;for(let e of n.keys){let n=l[e],a="optional"===n._zod.optout,o=n._zod.run({value:i[e],issues:[]},r);o instanceof Promise?s.push(o.then(r=>K(r,t,e,i,a))):K(o,t,e,i,a)}return o?function(e,t,r,n,i,a){let o=[],s=i.keySet,l=i.catchall._zod,d=l.def.type,c="optional"===l.optout;for(let i in t){if(s.has(i))continue;if("never"===d){o.push(i);continue}let a=l.run({value:t[i],issues:[]},n);a instanceof Promise?e.push(a.then(e=>K(e,r,i,t,c))):K(a,r,i,t,c)}return(o.length&&r.issues.push({code:"unrecognized_keys",keys:o,input:t,inst:a}),e.length)?Promise.all(e).then(()=>r):r}(s,i,t,r,a.value,e):s.length?Promise.all(s).then(()=>t):t}});function X(e,t,r,n){for(let r of e)if(0===r.issues.length)return t.value=r.value,t;let i=e.filter(e=>!z(e));return 1===i.length?(t.value=i[0].value,i[0]):(t.issues.push({code:"invalid_union",input:t.value,inst:r,errors:e.map(e=>e.issues.map(e=>S(e,n,f())))}),t)}let Q=c("$ZodUnion",(e,t)=>{q.init(e,t),h(e._zod,"optin",()=>t.options.some(e=>"optional"===e._zod.optin)?"optional":void 0),h(e._zod,"optout",()=>t.options.some(e=>"optional"===e._zod.optout)?"optional":void 0),h(e._zod,"values",()=>{if(t.options.every(e=>e._zod.values))return new Set(t.options.flatMap(e=>Array.from(e._zod.values)))}),h(e._zod,"pattern",()=>{if(t.options.every(e=>e._zod.pattern)){let e=t.options.map(e=>e._zod.pattern);return RegExp(`^(${e.map(e=>g(e.source)).join("|")})$`)}});let r=1===t.options.length,n=t.options[0]._zod.run;e._zod.parse=(i,a)=>{if(r)return n(i,a);let o=!1,s=[];for(let e of t.options){let t=e._zod.run({value:i.value,issues:[]},a);if(t instanceof Promise)s.push(t),o=!0;else{if(0===t.issues.length)return t;s.push(t)}}return o?Promise.all(s).then(t=>X(t,i,e,a)):X(s,i,e,a)}}),Y=c("$ZodIntersection",(e,t)=>{q.init(e,t),e._zod.parse=(e,r)=>{let n=e.value,i=t.left._zod.run({value:n,issues:[]},r),a=t.right._zod.run({value:n,issues:[]},r);return i instanceof Promise||a instanceof Promise?Promise.all([i,a]).then(([t,r])=>ee(e,t,r)):ee(e,i,a)}});function ee(e,t,r){let n,i=new Map;for(let r of t.issues)if("unrecognized_keys"===r.code)for(let e of(n??(n=r),r.keys))i.has(e)||i.set(e,{}),i.get(e).l=!0;else e.issues.push(r);for(let t of r.issues)if("unrecognized_keys"===t.code)for(let e of t.keys)i.has(e)||i.set(e,{}),i.get(e).r=!0;else e.issues.push(t);let a=[...i].filter(([,e])=>e.l&&e.r).map(([e])=>e);if(a.length&&n&&e.issues.push({...n,keys:a}),z(e))return e;let o=function e(t,r){if(t===r||t instanceof Date&&r instanceof Date&&+t==+r)return{valid:!0,data:t};if(w(t)&&w(r)){let n=Object.keys(r),i=Object.keys(t).filter(e=>-1!==n.indexOf(e)),a={...t,...r};for(let n of i){let i=e(t[n],r[n]);if(!i.valid)return{valid:!1,mergeErrorPath:[n,...i.mergeErrorPath]};a[n]=i.data}return{valid:!0,data:a}}if(Array.isArray(t)&&Array.isArray(r)){if(t.length!==r.length)return{valid:!1,mergeErrorPath:[]};let n=[];for(let i=0;i<t.length;i++){let a=e(t[i],r[i]);if(!a.valid)return{valid:!1,mergeErrorPath:[i,...a.mergeErrorPath]};n.push(a.data)}return{valid:!0,data:n}}return{valid:!1,mergeErrorPath:[]}}(t.value,r.value);if(!o.valid)throw Error(`Unmergable intersection. Error path: ${JSON.stringify(o.mergeErrorPath)}`);return e.value=o.data,e}let et=c("$ZodRecord",(e,t)=>{q.init(e,t),e._zod.parse=(r,n)=>{let i=r.value;if(!w(i))return r.issues.push({expected:"record",code:"invalid_type",input:i,inst:e}),r;let a=[],o=t.keyType._zod.values;if(o){let s;r.value={};let l=new Set;for(let e of o)if("string"==typeof e||"number"==typeof e||"symbol"==typeof e){l.add("number"==typeof e?e.toString():e);let o=t.valueType._zod.run({value:i[e],issues:[]},n);o instanceof Promise?a.push(o.then(t=>{t.issues.length&&r.issues.push(...j(e,t.issues)),r.value[e]=t.value})):(o.issues.length&&r.issues.push(...j(e,o.issues)),r.value[e]=o.value)}for(let e in i)l.has(e)||(s=s??[]).push(e);s&&s.length>0&&r.issues.push({code:"unrecognized_keys",input:i,inst:e,keys:s})}else for(let o of(r.value={},Reflect.ownKeys(i))){if("__proto__"===o)continue;let s=t.keyType._zod.run({value:o,issues:[]},n);if(s instanceof Promise)throw Error("Async schemas not supported in object keys currently");if("string"==typeof o&&A.test(o)&&s.issues.length){let e=t.keyType._zod.run({value:Number(o),issues:[]},n);if(e instanceof Promise)throw Error("Async schemas not supported in object keys currently");0===e.issues.length&&(s=e)}if(s.issues.length){"loose"===t.mode?r.value[o]=i[o]:r.issues.push({code:"invalid_key",origin:"record",issues:s.issues.map(e=>S(e,n,f())),input:o,path:[o],inst:e});continue}let l=t.valueType._zod.run({value:i[o],issues:[]},n);l instanceof Promise?a.push(l.then(e=>{e.issues.length&&r.issues.push(...j(o,e.issues)),r.value[s.value]=e.value})):(l.issues.length&&r.issues.push(...j(o,l.issues)),r.value[s.value]=l.value)}return a.length?Promise.all(a).then(()=>r):r}}),er=c("$ZodLiteral",(e,t)=>{if(q.init(e,t),0===t.values.length)throw Error("Cannot create literal schema with no valid values");let r=new Set(t.values);e._zod.values=r,e._zod.pattern=RegExp(`^(${t.values.map(e=>"string"==typeof e?x(e):e?x(e.toString()):String(e)).join("|")})$`),e._zod.parse=(n,i)=>{let a=n.value;return r.has(a)||n.issues.push({code:"invalid_value",values:t.values,input:a,inst:e}),n}});function en(e,t){return e.issues.length&&void 0===t?{issues:[],value:void 0}:e}let ei=c("$ZodOptional",(e,t)=>{q.init(e,t),e._zod.optin="optional",e._zod.optout="optional",h(e._zod,"values",()=>t.innerType._zod.values?new Set([...t.innerType._zod.values,void 0]):void 0),h(e._zod,"pattern",()=>{let e=t.innerType._zod.pattern;return e?RegExp(`^(${g(e.source)})?$`):void 0}),e._zod.parse=(e,r)=>{if("optional"===t.innerType._zod.optin){let n=t.innerType._zod.run(e,r);return n instanceof Promise?n.then(t=>en(t,e.value)):en(n,e.value)}return void 0===e.value?e:t.innerType._zod.run(e,r)}});Symbol("ZodOutput"),Symbol("ZodInput");(r=globalThis).__zod_globalRegistry??(r.__zod_globalRegistry=new class e{constructor(){this._map=new WeakMap,this._idmap=new Map}add(e,...t){let r=t[0];return this._map.set(e,r),r&&"object"==typeof r&&"id"in r&&this._idmap.set(r.id,e),this}clear(){return this._map=new WeakMap,this._idmap=new Map,this}remove(e){let t=this._map.get(e);return t&&"object"==typeof t&&"id"in t&&this._idmap.delete(t.id),this._map.delete(e),this}get(e){let t=e._zod.parent;if(t){let r={...this.get(t)??{}};delete r.id;let n={...r,...this._map.get(e)};return Object.keys(n).length?n:void 0}return this._map.get(e)}has(e){return this._map.has(e)}});let ea=c("ZodMiniType",(e,t)=>{if(!e._zod)throw Error("Uninitialized schema in ZodMiniType.");q.init(e,t),e.def=t,e.type=t.type,e.parse=(t,r)=>M(e,t,r,{callee:e.parse}),e.safeParse=(t,r)=>R(e,t,r),e.parseAsync=async(t,r)=>N(e,t,r,{callee:e.parseAsync}),e.safeParseAsync=async(t,r)=>I(e,t,r),e.check=(...r)=>e.clone({...t,checks:[...t.checks??[],...r.map(e=>"function"==typeof e?{_zod:{check:e,def:{check:"custom"},onattach:[]}}:e)]},{parent:!0}),e.with=e.check,e.clone=(t,r)=>{let n;return n=new e._zod.constr(t??e._zod.def),(!t||r?.parent)&&(n._zod.parent=e),n},e.brand=()=>e,e.register=(t,r)=>(t.add(e,r),e),e.apply=t=>t(e)}),eo=c("ZodMiniString",(e,t)=>{B.init(e,t),ea.init(e,t)});function es(e){return new eo({type:"string",...k(e)})}let el=c("ZodMiniNumber",(e,t)=>{F.init(e,t),ea.init(e,t)});function ed(e){return new el({type:"number",checks:[],...k(e)})}let ec=c("ZodMiniBoolean",(e,t)=>{Z.init(e,t),ea.init(e,t)});function ep(e){return new ec({type:"boolean",...k(e)})}let eu=c("ZodMiniNull",(e,t)=>{V.init(e,t),ea.init(e,t)});function e_(e){return new eu({type:"null",...k(e)})}let ef=c("ZodMiniUnknown",(e,t)=>{W.init(e,t),ea.init(e,t)}),eb=c("ZodMiniArray",(e,t)=>{G.init(e,t),ea.init(e,t)});function eg(e,t){return new eb({type:"array",element:e,...k(t)})}let em=c("ZodMiniObject",(e,t)=>{H.init(e,t),ea.init(e,t),h(e,"shape",()=>t.shape)});function eh(e,t){return new em({type:"object",shape:e??{},...k(t)})}let ev=c("ZodMiniUnion",(e,t)=>{Q.init(e,t),ea.init(e,t)});function ey(e,t){return new ev({type:"union",options:e,...k(t)})}let ew=c("ZodMiniIntersection",(e,t)=>{Y.init(e,t),ea.init(e,t)});function ex(e,t){return new ew({type:"intersection",left:e,right:t})}let ek=c("ZodMiniRecord",(e,t)=>{et.init(e,t),ea.init(e,t)});function ez(e,t,r){return new ek({type:"record",keyType:e,valueType:t,...k(r)})}let ej=c("ZodMiniLiteral",(e,t)=>{er.init(e,t),ea.init(e,t)});function eC(e,t){return new ej({type:"literal",values:Array.isArray(e)?e:[e],...k(t)})}let eS=c("ZodMiniOptional",(e,t)=>{ei.init(e,t),ea.init(e,t)});function e$(e){return new eS({type:"optional",innerType:e})}let eP=ey([eC("account_set_password"),eC("account_set_active")]),eO=ey([eC("waiting_transport"),eC("waiting_identity"),eC("reading"),eC("configuring"),eC("verifying"),eC("waiting_inform"),eC("ready"),eC("retry_wait"),eC("manual_required"),eC("not_configured"),eC("waiting_acs"),eC("awaiting_apply"),eC("discovering_management_wan"),eC("configuring_management_wan"),eC("verifying_management_wan")]),eM=eh({enabled:ep(),listen:ey([es(),e_()]),path:ey([es(),e_()]),error:ey([es(),e_()])}),eE=eh({vlan:ed(),vlans:eg(ed()),priority:ed(),acs_url:es()}),eN=eh({state:eO,optical_sn:es(),cwmp_id:es(),mqtt_target:ey([es(),e_()]),binding_source:es(),method:es(),desired_version:es(),generation:ed(),reason:es(),attempts:ed(),next_retry_at:ed(),updated_at:ed(),settings_verified_at:ey([ed(),e_()]),selected_vlan:ey([ed(),e_()]),last_inform:ey([ed(),e_()]),expected_acs_url:es(),last_error:ey([es(),e_()]),transport_epoch:ed(),completed_authorization:ed(),connection_request_enabled:ey([ep(),e_()]),inflight:ep(),persistence_error:ey([es(),e_()]),link_identity_error:ey([es(),e_()]),listener:eM,mqtt_last_seen:ey([ed(),e_()]),desired:e$(eE),endpoint_notice:e$(es()),manual_steps:e$(eg(es()))}),eR=ey([eC("not_required"),eC("pending"),eC("unavailable")]),eL=ey([eN,eh({state:eR,reason:es()})]),eI=eh({id:es(),name:es()}),eA=eh({omci:eg(eI),bootstrap:eg(eI),provisioning:eg(eI)}),eT=eh({configured:es(),effective:es(),available:eg(es()),reason:es()}),eD=eh({phase:ey([eC("not_started"),eC("collecting_identity"),eC("retrying_identity"),eC("unsupported"),eC("configuring"),eC("verifying"),eC("wan_bootstrap_pending"),eC("verified"),eC("retrying"),eC("offline")]),generation:ed(),error:ey([es(),e_()])}),eU=ey([eC("auto"),eC("factory"),eC("firmware"),eC("builtin")]),eq=ey([eC("factory"),eC("firmware"),eC("builtin")]),eB=eh({source:eq,raw_sha256:es(),effective_sha256:es(),size:ed(),supplemented:ep(),temperature_compensation_enabled:ep()}),eF=eh({enabled:ep(),reason:es(),calibration_sha256:ey([es(),e_()]),raw_temperature:ey([ed(),e_()]),table_index:ey([ed(),e_()]),target_code:ey([ed(),e_()]),last_check_unix:ey([ed(),e_()]),last_write_unix:ey([ed(),e_()]),error:ey([es(),e_()])}),eZ=eh({selected:eU,candidate:ey([eB,e_()]),candidate_error:ey([es(),e_()]),active:ey([eB,e_()]),hardware_applied:ep(),pending:ep(),temperature_compensation:eF});eh({success:ep(),state:e$(eZ),output:e$(es()),error:e$(es())});let eV=eh({detected:ep(),device:es(),has_data:ep(),sha256:es(),data:es()}),eW=eh({exists:ep(),path:es(),size:ed(),sha256:es(),data:es()}),eJ=eh({source:eq,active_path:es(),size:ed(),sha256:es(),data:es(),factory:eV,firmware:eW,state:e$(eZ)}),eG=eh({error:es()});ey([eJ,eG]);let eK=eh({success:ep(),path:es(),size:ed(),sha256:es()});ey([eK,eG]),eh({data:es()}),eh({source:eU});let eH=eh({acs:ep(),mqtt:ep(),npu:ep(),"device-hl202":ep(),"device-hwtc":ep(),"device-star":ep(),"device-zte":ep(),"device-scty":ep()}),eX=eh({optical:ep(),bridge_offload:ep(),omci_mib:ep(),mqtt_telemetry:ep(),hl202_management:ep(),cwmp:ep(),command_provisioning:ep()}),eQ=eh({status:ep(),config:ep(),sync:ep(),hardware:ep(),calibration:ep(),hl202:ep(),about:ep()}),eY=eh({schema_version:eC(1),version:es(),features:eH,functions:eX,pages:eQ,adapters:eA}),e0=ey([eh({valid:eC(!0),revision:es(),devices:ed()}),eh({error:es()})]),e1=ey([eC("disabled"),eC("waiting"),eC("wan_reconciling"),eC("wan_verifying"),eC("wifi_reconciling"),eC("discovering"),eC("reading"),eC("disabling"),eC("disabling_read"),eC("writing"),eC("verifying"),eC("settling"),eC("completed"),eC("not_started"),eC("reset_pending"),eC("interrupted"),eC("recovering"),eC("waiting_management"),eC("waiting_task")]),e2=eh({operation_id:ed(),device:es(),state:e1,started_at:ed()}),e5=eh({state:ey([eC("waiting"),eC("applied")]),requested_revision:es(),requested_at:ey([ed(),e_()]),blocking_operations:eg(e2),reset_pending:ep()}),e3=ey([eC("auto"),eC("manual")]),e4=eC("diff"),e6=eh({state:es(),enabled:ep(),reason:e$(ey([es(),e_()])),revision:e$(es()),vlan:e$(ed()),updated_at:e$(ed())}),e8=ey([eC("disabled"),eC("online"),eC("waiting_inform"),eC("offline_or_stale"),eC("waiting_transport")]),e7=eh({cwmp_id:es(),state:e8,optical_online:ep(),last_inform:ey([ed(),e_()]),age_seconds:ey([ed(),e_()])}),e9=eh({state:e8,optical_online:ep()}),te=ey([eC("device_service"),eC("ssid"),eC("port_binding"),eC("wan_activation")]),tt=eh({name:es(),desired:es()}),tr=eh({id:es(),name:e$(ey([es(),e_()])),kind:te,service_type:es(),state:es(),reason:e$(es()),revision:e$(es()),current_revision:e$(ep()),management_fresh:e$(ep()),operation_id:e$(ed()),task_id:e$(ey([ed(),e_()])),updated_at:e$(ed()),changes:e$(eg(tt))}),tn=ey([eC("plan"),eC("apply")]),ti=eh({wan:es(),wlan:es(),binding:es()}),ta=eh({state:es(),requested:es(),contract:ey([es(),e_()]),reason:es(),cache_hit:ep(),schema:es(),capabilities:ey([ti,e_()])}),to=eh({parent:ed(),connection:ed(),state:es(),service_list:es(),kind:es(),baseline:ey([eg(ed()),e_()])}),ts=eh({state:es(),reason:e$(es()),task_id:e$(ey([ed(),e_()])),instance:e$(ed()),cwmp_id:e$(es())}),tl=ey([eC("waiting"),eC("inventory"),eC("classifying"),eC("adding_parent"),eC("child_names"),eC("adding_child"),eC("delete_guard"),eC("deleting"),eC("verify_delete"),eC("empty_parent"),eC("deleting_parent"),eC("verify_parent_delete"),eC("next"),eC("done")]),td=eh({owned:eg(ed()),pending:ey([es(),e_()]),pending_instance:ey([ed(),e_()])}),tc=ey([eC("waiting"),eC("inventory"),eC("adding"),eC("verify_add"),eC("deleting"),eC("verify_delete"),eC("reading_disable"),eC("disabling"),eC("verifying_disable"),eC("next"),eC("done")]),tp=ey([eC("disable"),eC("preserve"),eC("delete")]),tu=eh({parent:ed(),child:ed(),service:es(),vlan:es()}),t_=eh({state:e1,items:eg(tr),omci_adapter:e$(es()),bootstrap_adapter:e$(es()),provisioning_adapter:e$(es()),backend:e$(eT),operation_id:e$(ed()),device:e$(es()),optical_sn:e$(es()),cwmp_id:e$(es()),revision:e$(es()),mode:e$(tn),started_at:e$(ed()),completed_at:e$(ey([ed(),e_()])),current_revision:e$(ep()),management_fresh:e$(ep()),reason:e$(es()),error:e$(es()),attempts:e$(ed()),next_retry_at:e$(ed()),reconcile_reason:e$(es()),cwmp_contract:e$(ta),wan_objects:e$(ez(es(),to)),wan_lifecycle:e$(ez(es(),ts)),wan_stage:e$(tl),wifi_objects:e$(td),wifi_lifecycle:e$(ez(es(),ts)),wifi_stage:e$(tc),wifi_cleanup:e$(tp),native_ownership:e$(ez(es(),tu)),write_performed:e$(ep()),readback_verified:e$(ep())}),tf=ey([eC("disabled"),eC("not_configured"),eC("stale_revision"),eC("stale_management"),eC("verified"),eC("attention_required"),eC("accepted_unverified"),eC("pending"),eC("recovering"),eC("waiting_management")]),tb=eh({device:es(),name:ey([es(),e_()]),group:ey([es(),e_()]),group_name:ey([es(),e_()]),template:ey([es(),e_()]),template_name:ey([es(),e_()]),optical_sn:es(),omci_adapter:es(),bootstrap_adapter:es(),provisioning_adapter:es(),omci_management:e6,management:ey([e7,e_()]),mqtt:ey([e9,e_()]),acs_bootstrap:eL,provisioning:t_,services:eg(tr),ssids:eg(tr),wifi_sync:tf}),tg=ey([eC("discovering"),eC("comparing"),eC("planning"),eC("applying"),eC("verifying"),eC("configuring_listener"),eC("cleaning_previous"),eC("waiting_devices"),eC("ready"),eC("awaiting_apply"),eC("verified"),eC("blocked"),eC("retry_wait")]),tm=eh({enabled:ep(),mode:e3,vlan:eg(ed()),priority:ed(),address:es(),acs_url:es(),port:ed(),path:es(),dhcp_enabled:ep()}),th=eh({operation:es(),key:es(),value:eg(es())}),tv=eh({state:tg,error:ey([es(),e_()]),inflight:ep(),ready:ep(),desired_version:ey([es(),e_()]),applied_version:ey([es(),e_()]),next_retry_at:ed(),attempts:ed(),desired:ey([tm,e_()]),applied:ey([tm,e_()]),previous:ey([tm,e_()]),plan:eg(th)}),ty=eh({desired:ey([eE,e_()]),state:es()}),tw=eh({id:es(),name:ey([es(),e_()]),template:es()}),tx=eh({enabled:ep(),mode:e3,method:e4,revision:es(),triggers:eg(es()),interval_minutes:ed(),error:ey([es(),e_()]),devices:eg(tb),management_network:tv,omci_management:ty,groups:eg(tw),pending_devices:eg(es()),onu_pins:e$(ez(es(),ed())),config_error:e$(ey([es(),e_()])),config_load:e$(e5)});ey([tx,eG]);let tk=eh({enabled:ey([ep(),e_()]),routed_enabled:ey([ep(),e_()]),bridge_enabled:ey([ep(),e_()]),engine_attached:ey([ep(),e_()]),forwarding_verified:ey([ep(),e_()])}),tz=eh({entity_id:ed(),port_id:ey([ed(),e_()])}),tj=eh({entity_id:ed(),filter_list_hex:ey([es(),e_()]),forward_operation:ey([ed(),e_()]),number_of_entries:ey([ed(),e_()])}),tC=eh({entity_id:ed(),received_frame_rules_hex:ey([eg(es()),e_()]),error:ey([es(),e_()])}),tS=eh({age_seconds:ed(),gem_ports:eg(tz),vlan_filters:eg(tj),vlan_operations:eg(tC)}),t$=eh({source:es(),unit:es(),reason:ey([es(),e_()]),raw:ey([es(),e_()]),age_seconds:ey([ed(),e_()])}),tP=eh({interface:es(),gem_ports:ey([eg(ed()),e_()]),vlan_id:ey([ed(),e_()]),onu_inventory:ey([tS,e_()]),tx_bytes:ey([ed(),e_()]),rx_bytes:ey([ed(),e_()]),current_tx_kbps:ey([ed(),e_()]),current_rx_kbps:ey([ed(),e_()]),olt_channel_gem:e$(ed()),forwarding_verified:e$(ep()),offload:tk,measurements:ez(es(),t$)});eh({});let tO=eh({entity_id:ed(),interval_end_time:ed(),corrected_bytes:ed(),corrected_code_words:ed(),uncorrectable_code_words:ed(),total_code_words:ed(),fec_seconds:ed()}),tM=eh({ani_entity_id:ey([ed(),e_()]),control_supported:ep(),downstream_enabled:ey([ep(),e_()]),upstream_enabled:ey([ep(),e_()]),downstream_pm:ey([tO,e_()]),measurement:t$}),tE=eh({entry:ey([eC(0),eC(1),eC(2)]),username:es(),active:ep()}),tN=eh({mqtt_mac:es(),optical_sn:ey([es(),e_()]),onu_id:ey([ed(),e_()]),binding_generation:es(),last_seen:ed(),reason:es()}),tR=ey([eC("executed"),eC("dispatched"),eC("timeout"),eC("error")]),tL=eh({target:es(),status:tR,request_id:e$(es()),exit_code:e$(ed()),output:e$(es()),output_truncated:ep(),error:e$(es())}),tI=eh({target:tN,result:tL,binding_current:ep()}),tA=ey([eC("not_applicable"),eC("accepted_and_saved"),eC("unconfirmed")]),tT=eh({code:es(),message:es()});ey([eh({schema_version:eC(1),operation:tI,accounts:ey([eg(tE),e_()]),write_status:tA}),eh({schema_version:ed(),error:tT})]);let tD=eh({optical_sn:es(),onu_id:ed(),binding_generation:es()}),tU=eh({mqtt_mac:es(),binding_generation:es()}),tq=ey([tD,tU]);eh({target:tq});let tB=ey([eh({kind:eC("exec"),script:es(),timeout_seconds:ed()}),eh({kind:eC("accounts_read")}),eh({kind:eC("account_set_password"),entry:ed(),password:es()}),eh({kind:eC("account_set_active"),entry:ed(),active:ep()})]),tF=eh({schema_version:ed(),target:tD,action:tB}),tZ=eh({optical_sn:es(),onu_id:ed(),model:es(),optical_online:ep(),can_execute:ep(),mqtt:ey([tN,e_()]),report_revision:ey([ed(),e_()])});ey([eh({schema_version:eC(1),operation:tI}),eh({schema_version:ed(),error:tT})]),eh({target:tq,script:es(),timeout_seconds:ed()});let tV=ey([eh({schema_version:eC(1),devices:eg(tZ),sources:eg(tN)}),eh({schema_version:ed(),error:tT})]);ey([eh({method:eC("list")}),eh({method:eC("report"),target:tD}),eh({method:eC("source_report"),target:tU}),eh({method:eC("run"),request:tF})]);let tW=ey([eC("received"),eC("report_unavailable")]),tJ=eh({value:new ef({type:"unknown"}),member:es(),unit:ey([es(),e_()])}),tG=eh({name:es(),bytes:ed(),encoding:es(),text:ey([es(),e_()]),text_omitted:ep()}),tK=eh({schema_version:ed(),compressed_bytes:ed(),decompressed_bytes:ed(),fields:ez(es(),tJ),members:eg(tG),errors:eg(es())}),tH=eh({revision:ed(),last_received:ed(),last_processed_receipt:ey([ed(),e_()]),last_good:ey([ed(),e_()]),error:ey([es(),e_()]),report:ey([tK,e_()])});ey([eh({schema_version:eC(1),target:tN,report:ey([tH,e_()]),state:tW}),eh({schema_version:eC(1),target:tN,report:ey([tH,e_()]),read_only:eC(!0)}),eh({schema_version:ed(),error:tT})]),eh({target:tq}),eh({target:tq,kind:eP,entry:ed(),password:es(),active:ep()});let tX=eh({accepted:ed(),rejected:ed(),read_errors:ed(),handled:ed(),max_intake_us:ed(),max_handler_us:ed()}),tQ=eC("pending"),tY=eh({phase:ey([eC("starting"),eC("upload"),eC("tables")]),received:ed(),expected:ey([ed(),e_()])}),t0=eC("ready"),t1=ey([eh({status:tQ,progress:e$(tY)}),eh({status:t0,chunk:ed(),chunks:ed(),bytes:ed(),data:es()})]);ey([t1,eG]);let t2=eh({status:tQ,job:es()}),t5=eh({released:ep()});eh({job:es()}),eh({job:es(),chunk:ed()}),ey([t2,eG]);let t3=eh({accepting:ep(),running:ed(),stored:ed(),bytes:ed(),running_limit:ed(),stored_limit:ed(),bytes_limit:ed(),result_bytes_limit:ed()}),t4=eh({mac:es(),ip:es(),band:es(),rssi_dbm:ey([ed(),e_()]),rx_rate_mbps:ey([ed(),e_()]),tx_rate_mbps:ey([ed(),e_()])}),t6=ey([eC("unknown"),eC("octets"),eC("string"),eC("unsigned_integer"),eC("table"),eC("signed_integer"),eC("pointer"),eC("bit_field"),eC("enumeration"),eC("counter")]),t8=eh({id:es(),url:es()}),t7=eh({name:es(),kind:t6,index:ed(),mask:ed(),size:ed(),read:ep(),write:ep(),set_by_create:ep(),avc:ep(),optional:ep(),deprecated:ep(),default_hex:ey([es(),e_()]),reference:t8}),t9=ey([eh({type:eC("unsigned"),value:ed()}),eh({type:eC("signed"),value:ed()}),eh({type:eC("decimal"),value:es()}),eh({type:eC("text"),value:ey([es(),e_()])}),eh({type:eC("octets"),hex:es()}),eh({type:eC("table_length"),bytes:ed()})]),re=eh({raw_hex:es(),value:t9,sequences:eg(ed())}),rt=eh({definition:t7,value:ey([t9,e_()]),observations:eg(re)}),rr=ey([eC("layout"),eC("name_only"),eC("unknown")]),rn=eh({class_id:ed(),name:ey([es(),e_()]),entities:ed(),records:ed(),support:rr}),ri=eh({code:es(),message:es(),offset:ed(),mask:ed()}),ra=eh({class_id:ed(),entity_id:ed(),name:ey([es(),e_()]),support:rr,reference:ey([t8,e_()]),sequences:eg(ed()),attributes:eg(rt),diagnostics:eg(ri)}),ro=eC("ready"),rs=eh({class_id:ed(),entity_id:ed(),sequence:ed(),attribute_mask:ed(),raw_hex:es(),consumed:ed(),remaining_hex:es(),undecoded_mask:ed()}),rl=eh({raw_hex:es(),filter_outer_priority:ed(),filter_outer_vid:ed(),filter_outer_tpid_dei:ed(),filter_inner_priority:ed(),filter_inner_vid:ed(),filter_inner_tpid_dei:ed(),filter_ethertype:ed(),tags_to_remove:ed(),treatment_outer_priority:ed(),treatment_outer_vid:ed(),treatment_outer_tpid_dei:ed(),treatment_inner_priority:ed(),treatment_inner_vid:ed(),treatment_inner_tpid_dei:ed(),delete_entry:ep()}),rd=eh({class_id:ed(),entity_id:ed(),attribute:t7,collected:ep(),error:ey([es(),e_()]),raw_hex:es(),rows:eg(es()),vlan_rules:eg(rl)}),rc=eh({schema_version:eC(1),reference_version:es(),onu_id:ey([ed(),e_()]),uploaded_complete:ep(),expected_records:ed(),received_records:ed(),decoded_records:ed(),partial_records:ed(),basic_records:ed(),tables_requested:ep(),tables_collected:ep(),classes:eg(rn),entities:eg(ra),records:eg(rs),tables:eg(rd),diagnostics:eg(ri)}),rp=eh({status:ro,report:rc});eh({onu_id:ed(),optical_sn:es(),tables:ep()});let ru=ey([eh({status:eC("success"),enabled:ep()}),eh({status:eC("error"),error:es()})]);eh({enabled:ep(),bridge:es(),wan_upstream:ep(),wan_downstream:ep(),onu_bridge:ep()});let r_=eh({index:es(),state:es(),pkt_type:es(),orig_tuple:es(),new_tuple:es(),eth:es(),vlan:es(),packets:ed(),bytes:ed(),counters_valid:ep(),packets_exact:es(),bytes_exact:es()}),rf=eh({sampled_at_ms:ed(),errors:eg(es()),config_valid:ep(),engine_valid:ep(),mask_valid:ep(),routed_mask_valid:ep(),debug_valid:ep(),flows_valid:ep(),entries_valid:ep(),counters_valid:ep(),hooks_valid:ep(),total_packets_exact:es(),total_bytes_exact:es(),supported:ep(),engine_attached:ep(),bridge_offload_enabled:ep(),wan_upstream:ep(),wan_downstream:ep(),onu_bridge:ep(),bridge_offload_mask:ed(),routed_offload_mask:ed(),bridge_offload_debug:ep(),bridge:es(),active_ports:eg(es()),fw4_hooks_ready:ep(),total_entries:ed(),bound_entries:ed(),bound_ipv4_entries:ed(),bound_ipv6_entries:ed(),total_packets:ed(),total_bytes:ed(),bound_flows:eg(r_)}),rb=eh({equipment_id:ey([es(),e_()]),hardware_version:ey([es(),e_()]),software_images:eg(es()),omcc_version:ey([ed(),e_()]),errors:eg(es())}),rg=eh({desired:ez(es(),ed()),active:ez(es(),ed()),pending_restart:ep(),allocation_blocked:ep(),startup_error:ey([es(),e_()]),config_error:ey([es(),e_()])}),rm=ey([eC("optical_on"),eC("optical_off"),eC("optical_status"),eC("optical_reload"),eC("optical_reinitialize"),eC("optical_shutdown")]),rh=eh({enabled:ep(),downstream_tx_enabled:ep(),fec_enabled:ep()}),rv=eh({desired_tx_enabled:ep(),desired_fec_enabled:ep(),register:ey([ed(),e_()]),tx_enabled:ey([ep(),e_()]),fec_enabled:ey([ep(),e_()]),error:ey([es(),e_()])}),ry=ey([eC("success"),eC("error")]),rw=ey([eC("enabled"),eC("disabled"),eC("unknown")]),rx=eh({settings:e$(rh),pon_mac:e$(rv),schema_version:eC(1),status:ry,action:rm,desired_enabled:ey([ep(),e_()]),tx_enabled:ey([ep(),e_()]),actor_state:rw,hardware_ready:ep(),discovery_active:ep(),cleanup_pending:ep(),error:ey([tT,e_()])}),rk=eh({calibration_sha256:e$(es()),calibration_applied:ep(),model:es(),wavelength_tx_nm:ed(),wavelength_rx_nm:ed(),phy_rate_downlink_gbps:ed(),phy_rate_uplink_gbps:ed(),tx_power_dbm:ey([ed(),e_()]),laser_bias_current_ma:ey([ed(),e_()]),temperature_celsius:ey([ed(),e_()]),vcc_voltage:ey([ed(),e_()]),cdr_locked:ey([ep(),e_()]),tx_enabled:e$(ep()),measurements:ez(es(),t$)}),rz=eC("ux3326"),rj=eC("selected"),rC=eh({onu_id:ed(),interface:ey([es(),e_()])}),rS=eh({optical_control:ep(),transceiver_telemetry:ep(),fpga_diagnostics:ep(),bosa_diagnostics:ep(),calibration_profile:ey([rz,e_()]),npu_offload:ep(),omci_mib:ep(),downstream_fec:ep()}),r$=eh({schema_version:eC(1),selection:rj,platform_id:es(),vendor:es(),model:es(),onus:eg(rC),operations:rS}),rP=ey([eC("o1_initial"),eC("o2_standby"),eC("o3_serial_number"),eC("o4_ranging"),eC("o5_operation"),eC("o6_intermittent_lods"),eC("o7_emergency_stop")]),rO=eh({restarting:eC(!0)}),rM=eh({calls:ed(),failures:ed(),last_us:ed(),max_us:ed(),total_us:ed()}),rE=eh({port:ed(),interface:es(),carrier:ep(),status:es(),onu_id:e$(ed()),onu_sn:e$(es()),link_state:es(),reserved_sn:e$(es())}),rN=eh({channel_2g:ey([ed(),e_()]),channel_5g:ey([ed(),e_()]),bandwidth_5g:ey([es(),e_()]),tx_power_pct:ey([ed(),e_()]),measurements:ez(es(),t$)}),rR=eh({onu_id:ed(),vendor:es(),model:es(),serial_number:es(),state:rP,business_status:eD,management:ey([e7,e_()]),provisioning:ey([t_,e_()]),services:eg(tr),ssids:eg(tr),wifi_sync:tf,identity:ey([rb,e_()]),identity_age_seconds:ey([ed(),e_()]),identity_current:ep(),fiber_distance_m:ey([ed(),e_()]),ranging_delay_rtd_ns:ey([ed(),e_()]),equalization_delay_bits:ey([ed(),e_()]),optical_rx_power_dbm:ey([ed(),e_()]),optical_tx_power_dbm:ey([ed(),e_()]),firmware_version:es(),hardware_version:es(),uptime_seconds:ey([ed(),e_()]),fec:e$(tM),data_path:tP,wifi_mesh:rN,connected_clients:ey([eg(t4),e_()]),measurements:ez(es(),t$)}),rL=eh({id:es(),last_seen_sec_ago:ed(),last_payload_bytes:ed()}),rI=eh({ubus:e$(ez(es(),rM)),jobs:e$(t3),onu_pinning:e$(rg),fpga_status:es(),pon_mac:e$(rv),provisioning:ey([tx,e_()]),optical_transceiver:rk,switch_ports:eg(rE),sub_gateways:eg(rR),telemetry_gateways:eg(rL),npu:e$(rf),ipc:e$(tX)}),rA=ey([eC("plan"),eC("apply"),eC("management_plan"),eC("management_apply"),eC("reset_state"),eC("reconcile"),eC("retry")]),rT=ey([eh({operation_ids:eg(ed()),revision:es()}),eh({started:eC(!0),mode:tn}),eh({reset:eC(!0),device:es()}),eh({operation_ids:eg(ed()),mode:tn,reconcile:e$(ep()),retry:e$(ep())}),eG]);eh({action:rA,target:es(),management:e$(ep()),item:e$(es())});let rD=ey([eC("none"),eC("effective"),eC("pending_add"),eC("pending_change"),eC("pending_remove")]),rU=eh({active_onu_id:ey([ed(),e_()]),desired_onu_id:ey([ed(),e_()]),state:rD,pending_restart:ep()}),rq=ey([eC("pon_logical"),eC("associated_with"),eC("learned_behind")]),rB=eh({id:es(),mac:es(),hostname:ey([es(),e_()]),addresses:eg(es()),relation:rq,source:es(),interface:ey([es(),e_()])}),rF=ey([eC("ok"),eC("partial"),eC("unavailable")]),rZ=eh({id:es(),state:rF,sampled_at:ed(),reason:ey([es(),e_()])}),rV=ey([eC("snapshot_expired"),eC("node_not_found"),eC("invalid_cursor")]),rW=ey([eh({status:eC("ok"),snapshot_id:es(),parent_node_id:es(),clients:eg(rB),associated_client_count:ey([ed(),e_()]),learned_host_count:ey([ed(),e_()]),complete:ep(),next_cursor:ey([es(),e_()]),sources:eg(rZ)}),eh({status:eC("error"),code:rV})]);eh({node_id:es(),snapshot_id:e$(es()),cursor:e$(es()),limit:e$(ed())});let rJ=eh({model:es(),wavelength_tx_nm:ed(),wavelength_rx_nm:ed(),nominal_downlink_gbps:ed(),nominal_uplink_gbps:ed(),tx_power_dbm:ey([ed(),e_()]),laser_bias_current_ma:ey([ed(),e_()]),temperature_celsius:ey([ed(),e_()]),vcc_voltage:ey([ed(),e_()]),tx_enabled:ey([ep(),e_()]),measurements:ez(es(),t$)}),rG=eh({name:es(),mac:ey([es(),e_()]),carrier:ey([ep(),e_()]),speed_mbps:ey([ed(),e_()]),duplex:ey([es(),e_()]),bridge_members:eg(es()),addresses:eg(es())}),rK=eh({interface:es(),device:ey([es(),e_()]),protocol:ey([es(),e_()]),up:ep(),addresses:eg(es())}),rH=eh({model:ey([es(),e_()]),firmware_version:ey([es(),e_()]),uptime_seconds:ey([ed(),e_()]),fpga_status:es(),optical:rJ,interfaces:eg(rG),uplinks:eg(rK)}),rX=eh({observer_node_id:es(),rx_bytes:ey([ed(),e_()]),tx_bytes:ey([ed(),e_()]),current_rx_kbps:ey([ed(),e_()]),current_tx_kbps:ey([ed(),e_()]),onu_inventory:ey([tS,e_()]),offload:tk,measurements:ez(es(),t$)}),rQ=eh({report_revision:ed(),binding_generation:es(),age_seconds:ed(),ip:ey([es(),e_()]),bridge_ip:ey([es(),e_()]),mac:ey([es(),e_()]),connection_type_raw:ey([es(),e_()]),uptime_seconds:ey([ed(),e_()]),cpu_usage_raw:ey([ed(),e_()]),memory_usage_raw:ey([ed(),e_()])}),rY=eh({hl202:ey([rQ,e_()])}),r0=eh({code:es(),node_id:ey([es(),e_()])}),r1=eh({id:es(),source:es(),target:es(),relation:rq,data_interface:ey([es(),e_()]),carrier:ey([ep(),e_()]),onu_rx_power_dbm:ey([ed(),e_()]),onu_tx_power_dbm:ey([ed(),e_()]),equalization_delay_bits:ey([ed(),e_()]),data_path:ey([rX,e_()]),measurements:ez(es(),t$)}),r2=eh({serial_number:ey([es(),e_()]),onu_id:ey([ed(),e_()]),vendor:ey([es(),e_()]),model:ey([es(),e_()]),hardware_version:ey([es(),e_()]),firmware_version:ey([es(),e_()]),registration:ey([rP,e_()]),business:ey([eD,e_()]),management:ey([e7,e_()]),provisioning:ey([t_,e_()]),services:eg(tr),ssids:eg(tr),wifi_sync:ey([tf,e_()]),identity:ey([rb,e_()]),identity_current:ep(),identity_age_seconds:ey([ed(),e_()]),uptime_seconds:ey([ed(),e_()]),fec:ey([tM,e_()]),binding:rU,extensions:rY,measurements:ez(es(),t$)}),r5=ey([ex(eh({kind:eC("controller")}),rH),ex(eh({kind:eC("onu")}),r2)]),r3=eh({id:es(),label:es(),detail:r5}),r4=ey([eh({status:eC("ok"),snapshot_id:es(),node:r3}),eh({status:eC("error"),code:rV})]);eh({node_id:es(),snapshot_id:e$(es())});let r6=eh({schema_version:eC(1),snapshot_id:es(),generated_at:ed(),snapshot_ttl_seconds:ed(),nodes:eg(r3),links:eg(r1),sources:eg(rZ),issues:eg(r0)}),r8=ez(es(),eh({carrier:e$(ep()),mac:e$(es()),link:e$(eh({speed:e$(ed()),duplex:e$(es()),autoneg:e$(ep())})),stats:e$(ez(es(),ed()))})),r7=e=>null==e||""===e?"—":String(e);function r9(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3;return null!=e&&Number.isFinite(e)?`${e.toFixed(t)} dBm`:"—"}function ne(e){if(void 0===e||!Number.isFinite(e)||e<0)return"—";if(e<1024)return`${e} B`;let t=["KiB","MiB","GiB","TiB"],r=e/1024,n=0;for(;r>=1024&&n<t.length-1;)r/=1024,n++;return`${r.toFixed(1)} ${t[n]}`}function nt(e){return void 0===e||!Number.isFinite(e)||e<0?"—":e<1e3?`${e} Pkts.`:`${(e/1e3).toFixed(2)} KPkts.`}function nr(e){let t="none"===e.tone?"":`fttr-badge fttr-badge-${e.tone}`,r=e.class?` ${e.class}`:"",n=d("span",{class:`${t}${r}`.trim(),children:e.children});return e.title&&n.setAttribute("title",e.title),n}function nn(e,t,r,n){e.textContent=r,"none"===t?e.className="":e.className=`fttr-badge fttr-badge-${t}`,n?e.setAttribute("title",n):e.removeAttribute("title")}let ni={o1_initial:_("O1 Initial"),o2_standby:_("O2 Standby"),o3_serial_number:_("O3 Serial Number"),o4_ranging:_("O4 Ranging"),o5_operation:_("O5 (Operation)"),o6_intermittent_lods:_("O6 Intermittent LODS"),o7_emergency_stop:_("O7 Emergency Stop")};function na(e){return e?"o5_operation"===e?{tone:"success",label:ni.o5_operation,title:e}:{tone:"warning",label:ni[e]??r7(e),title:e}:{tone:"none",label:"—"}}function no(e){let t=na(e.state);return d(nr,{tone:t.tone,title:t.title,children:t.label})}function ns(e){return e?{tone:"verified"===e.phase?"success":e.error||"wan_bootstrap_pending"===e.phase?"warning":"neutral",label:`${({not_started:_("Not started"),collecting_identity:_("Collecting identity"),retrying_identity:_("Retrying identity"),unsupported:_("Unsupported"),configuring:_("Configuring"),verifying:_("Verifying"),wan_bootstrap_pending:_("WAN pending"),verified:_("Verified"),retrying:_("Retrying"),offline:_("Offline")})[e.phase]} \xb7 ${e.generation}${e.error?` \xb7 ${e.error}`:""}`,title:e.error||void 0}:{tone:"neutral",label:"—"}}function nl(e){let t=ns(e.status);return d(nr,{tone:t.tone,title:t.title,children:t.label})}let nd={online:_("Online"),waiting_inform:_("Waiting Inform"),offline_or_stale:_("Offline or stale")};function nc(e){let t=e?.state,r=function(e){if(null==e||!Number.isFinite(e)||e<0)return null;let t=Math.floor(e);if(t<60)return(1===t?_("%d second ago"):_("%d seconds ago")).replace("%d",String(t));let r=Math.floor(t/60);if(r<60)return(1===r?_("%d minute ago"):_("%d minutes ago")).replace("%d",String(r));let n=Math.floor(t/3600);if(n<24)return(1===n?_("%d hour ago"):_("%d hours ago")).replace("%d",String(n));let i=Math.floor(t/86400);return(1===i?_("%d day ago"):_("%d days ago")).replace("%d",String(i))}(e?.age_seconds??(e?.last_inform?Math.max(0,Math.floor(Date.now()/1e3)-e.last_inform):null)),n=e?.last_inform?new Date(1e3*e.last_inform).toLocaleString():null,i=n?_("Last Inform: %s").replace("%s",n):void 0,a="—",o="none";return"online"===t?(o="success",a=nd.online):"waiting_inform"===t?(o="warning",a=nd.waiting_inform):"offline_or_stale"===t?(o="danger",a=nd.offline_or_stale):t&&(o="neutral",a=r7(t)),{tone:o,label:r&&t?`${a} \xb7 ${r}`:a,title:i}}function np(e){let t=nc(e.management);return d(nr,{tone:t.tone,title:t.title,children:t.label})}let nu={disabled:_("Disabled"),waiting:_("Waiting"),wan_reconciling:_("WAN reconciling"),wan_verifying:_("WAN verifying"),wifi_reconciling:_("Wi-Fi reconciling"),discovering:_("Discovering"),reading:_("Reading"),disabling:_("Disabling"),disabling_read:_("Disabling read"),writing:_("Writing"),verifying:_("Verifying"),settling:_("Settling"),completed:_("Completed"),interrupted:_("Interrupted"),recovering:_("Recovering"),waiting_management:_("Waiting management"),waiting_task:_("Waiting task"),reset_pending:_("Reset pending"),failed:_("Failed"),error:_("Error"),blocked:_("Blocked"),not_started:_("Not started")};function n_(e,t){let r=e?.state,n=e?.next_retry_at&&e.next_retry_at>Math.floor(Date.now()/1e3)?e.next_retry_at-Math.floor(Date.now()/1e3):0,i=t??(e?.current_revision===!1?_("Previous configuration"):e?.management_fresh===!1?_("Management stale"):e?.reconcile_reason?e.reconcile_reason:n>0?_("Next self-healing retry in %d seconds").replace("%d",String(n)):e?.reason??e?.error);return r&&"not_started"!==r?"disabled"===r?{tone:"neutral",label:nu.disabled}:"completed"===r||"verified"===r?{tone:"success",label:"completed"===r?nu.completed:_("Ready"),title:i}:"wan_reconciling"===r||"wan_verifying"===r||"wifi_reconciling"===r||"discovering"===r||"reading"===r||"disabling"===r||"disabling_read"===r||"writing"===r||"verifying"===r||"settling"===r||"recovering"===r||"waiting_task"===r?{tone:"info",label:nu[r]??r7(r),title:i}:"interrupted"===r||"failed"===r||"error"===r||"blocked"===r?{tone:"danger",label:"blocked"===r?nu.blocked:nu.interrupted,title:i}:"waiting"===r||"pending"===r||"waiting_management"===r||"reset_pending"===r?{tone:"warning",label:nu[r]??nu.waiting,title:i}:{tone:"neutral",label:r7(r),title:i}:{tone:"neutral",label:nu.not_started,title:i}}function nf(e){let t=n_(e.provisioning,e.title);return d(nr,{tone:t.tone,title:t.title,children:t.label})}let nb={disabled:_("Disabled"),not_configured:_("Not configured"),stale_revision:_("Stale revision"),stale_management:_("Stale management"),verified:_("Verified"),attention_required:_("Attention required"),accepted_unverified:_("Unverified"),pending:_("Pending"),recovering:_("Recovering"),waiting_management:_("Waiting management")};function ng(e){return e&&"not_configured"!==e?"disabled"===e?{tone:"neutral",label:nb.disabled}:"verified"===e?{tone:"success",label:nb.verified}:"attention_required"===e?{tone:"danger",label:nb.attention_required}:"stale_revision"===e||"stale_management"===e||"waiting_management"===e?{tone:"warning",label:nb[e]}:"recovering"===e?{tone:"info",label:nb.recovering}:"accepted_unverified"===e||"pending"===e?{tone:"warning",label:nb[e]}:{tone:"neutral",label:r7(e)}:{tone:"neutral",label:nb.not_configured}}function nm(e){let t=ng(e.state);return d(nr,{tone:t.tone,title:t.title,children:t.label})}let nh=`
.fttr-badge {
	display: inline-block;
	padding: 0.18em 0.55em;
	font-size: 85%;
	font-weight: 600;
	line-height: 1.25;
	border-radius: 3px;
	white-space: nowrap;
	text-align: center;
}

.fttr-badge-success {
	background: var(--fttr-success-bg, rgba(46, 204, 113, 0.15));
	color: var(--fttr-success-color, #27ae60);
	border: 1px solid var(--fttr-success-border, rgba(46, 204, 113, 0.35));
}

.fttr-badge-warning {
	background: var(--fttr-warning-bg, rgba(243, 156, 18, 0.15));
	color: var(--fttr-warning-color, #d35400);
	border: 1px solid var(--fttr-warning-border, rgba(243, 156, 18, 0.35));
}

.fttr-badge-danger {
	background: var(--fttr-danger-bg, rgba(231, 76, 60, 0.15));
	color: var(--fttr-danger-color, #c0392b);
	border: 1px solid var(--fttr-danger-border, rgba(231, 76, 60, 0.35));
}

.fttr-badge-info {
	background: var(--fttr-info-bg, rgba(52, 152, 219, 0.15));
	color: var(--fttr-info-color, #2980b9);
	border: 1px solid var(--fttr-info-border, rgba(52, 152, 219, 0.35));
}

.fttr-badge-neutral {
	background: var(--fttr-neutral-bg, rgba(127, 140, 141, 0.12));
	color: var(--fttr-neutral-color, #7f8c8d);
	border: 1px solid var(--fttr-neutral-border, rgba(127, 140, 141, 0.25));
}

@media (prefers-color-scheme: dark) {
	.fttr-badge-success {
		color: var(--fttr-success-color, #2ecc71);
	}
	.fttr-badge-warning {
		color: var(--fttr-warning-color, #f39c12);
	}
	.fttr-badge-danger {
		color: var(--fttr-danger-color, #e74c3c);
	}
	.fttr-badge-info {
		color: var(--fttr-info-color, #3498db);
	}
	.fttr-badge-neutral {
		color: var(--fttr-neutral-color, #bdc3c7);
	}
}

[data-darkmode="true"] .fttr-badge-success,
[data-theme="dark"] .fttr-badge-success {
	color: var(--fttr-success-color, #2ecc71);
}
[data-darkmode="true"] .fttr-badge-warning,
[data-theme="dark"] .fttr-badge-warning {
	color: var(--fttr-warning-color, #f39c12);
}
[data-darkmode="true"] .fttr-badge-danger,
[data-theme="dark"] .fttr-badge-danger {
	color: var(--fttr-danger-color, #e74c3c);
}
[data-darkmode="true"] .fttr-badge-info,
[data-theme="dark"] .fttr-badge-info {
	color: var(--fttr-info-color, #3498db);
}
[data-darkmode="true"] .fttr-badge-neutral,
[data-theme="dark"] .fttr-badge-neutral {
	color: var(--fttr-neutral-color, #bdc3c7);
}
`,nv=eh({error:ey([es(),eh({code:es(),message:es()})])});class ny extends Error{code;constructor(e,t){super(t),this.code=e,this.name="RpcError"}}function nw(e){let t=nv.safeParse(e);if(t.success){let e=t.data.error;throw"string"==typeof e?new ny("rpc",e):new ny(e.code,e.message)}return e}let nx={parse(e){let t=tV.parse(nw(e));if("object"==typeof t&&null!==t&&"error"in t)throw nw(t),Error("Unexpected RPC error");return t}},nk={parse(e){let t=rT.parse(nw(e));if("error"in t)throw Error(t.error);return t}},nz={getCapabilities:{parse:e=>eY.parse(nw(e))},getPlatformInfo:{parse:e=>r$.parse(nw(e))},opticalStatus:rx,opticalSet:rx,getStatus:{parse:e=>rI.parse(nw(e))},getTopology:{parse:e=>r6.parse(nw(e))},getTopologyNode:{parse:e=>r4.parse(nw(e))},getTopologyClients:{parse:e=>rW.parse(nw(e))},getSync:{parse:e=>tx.parse(nw(e))},configCheck:{parse(e){if("object"==typeof e&&null!==e&&"error"in e&&("valid"in e||"revision"in e||"devices"in e))throw Error("Mixed configuration check result");return e0.parse(e)}},npuStatus:rf,configReload:{parse:e=>tx.parse(nw(e))},restartService:{parse:e=>rO.parse(nw(e))},sync:{parse:e=>nk.parse(nw(e))},npuSet:ru,mibStart:{parse:e=>t2.parse(nw(e))},mibResult:{parse:e=>t1.parse(nw(e))},jobRelease:{parse:e=>t5.parse(nw(e))},hl202List:{parse:e=>nx.parse(nw(e))},hl202Report:{parse:e=>t2.parse(nw(e))},hl202AccountsStart:{parse:e=>t2.parse(nw(e))},hl202AccountUpdate:{parse:e=>t2.parse(nw(e))},hl202ExecStart:{parse:e=>t2.parse(nw(e))},jobResult:{parse:e=>t1.parse(nw(e))},getCalibration:{parse:e=>eJ.parse(nw(e))},selectCalibration:{parse:e=>eJ.parse(nw(e))},saveCalibration:{parse:e=>eK.parse(nw(e))},applyCalibration:{parse:e=>t2.parse(nw(e))}};function nj(){var e;let t,r,i,a,o,s,l,d,c,p,u,f,b,g,m,h,v,y,w,x,k,z,j,C,S,$,P,O;return n??=(e=L.rpc,t=e.declare({object:"fttr",method:"get_capabilities",reject:!0}),r=e.declare({object:"fttr",method:"get_platform_info",reject:!0}),i=e.declare({object:"fttr",method:"optical_status",reject:!0}),a=e.declare({object:"fttr",method:"optical_set",params:["enabled","downstream_tx_enabled","fec_enabled"],reject:!0}),o=e.declare({object:"fttr",method:"get_status",reject:!0}),s=e.declare({object:"fttr",method:"get_topology",reject:!0}),l=e.declare({object:"fttr",method:"get_topology_node",params:["node_id","snapshot_id"],reject:!0}),d=e.declare({object:"fttr",method:"get_topology_clients",params:["node_id","snapshot_id","cursor","limit"],reject:!0}),c=e.declare({object:"fttr",method:"get_sync",reject:!0}),p=e.declare({object:"fttr",method:"config_check",reject:!0}),u=e.declare({object:"fttr",method:"npu_status",reject:!0}),f=e.declare({object:"fttr",method:"config_reload",reject:!0}),b=e.declare({object:"fttr",method:"restart_service",reject:!0}),g=e.declare({object:"fttr",method:"sync",params:["action","target","management","item"],reject:!0}),m=e.declare({object:"fttr",method:"npu_set",params:["enabled","bridge","wan_upstream","wan_downstream","onu_bridge"],reject:!0}),h=e.declare({object:"fttr",method:"mib_start",params:["onu_id","optical_sn","tables"],reject:!0}),v=e.declare({object:"fttr",method:"mib_result",params:["job","chunk"],reject:!0}),y=e.declare({object:"fttr",method:"job_release",params:["job"],reject:!0}),w=e.declare({object:"fttr",method:"hl202_list",reject:!0}),x=e.declare({object:"fttr",method:"hl202_report",params:["target"],reject:!0}),k=e.declare({object:"fttr",method:"hl202_accounts_start",params:["target"],reject:!0}),z=e.declare({object:"fttr",method:"hl202_account_update",params:["target","kind","entry","password","active"],reject:!0}),j=e.declare({object:"fttr",method:"hl202_exec_start",params:["target","script","timeout_seconds"],reject:!0}),C=e.declare({object:"fttr",method:"job_result",params:["job","chunk"],reject:!0}),S=e.declare({object:"fttr",method:"get_calibration",reject:!0}),$=e.declare({object:"fttr",method:"select_calibration",params:["source"],reject:!0}),P=e.declare({object:"fttr",method:"save_calibration",params:["data"],reject:!0}),O=e.declare({object:"fttr",method:"apply_calibration",reject:!0}),{getCapabilities:async()=>nz.getCapabilities.parse(await t()),getPlatformInfo:async()=>nz.getPlatformInfo.parse(await r()),opticalStatus:async()=>nz.opticalStatus.parse(await i()),opticalSet:async e=>nz.opticalSet.parse(await a(e.enabled,e.downstream_tx_enabled,e.fec_enabled)),getStatus:async()=>nz.getStatus.parse(await o()),getTopology:async()=>nz.getTopology.parse(await s()),getTopologyNode:async e=>nz.getTopologyNode.parse(await l(e.node_id,e.snapshot_id)),getTopologyClients:async e=>nz.getTopologyClients.parse(await d(e.node_id,e.snapshot_id,e.cursor,e.limit)),getSync:async()=>nz.getSync.parse(await c()),configCheck:async()=>nz.configCheck.parse(await p()),npuStatus:async()=>nz.npuStatus.parse(await u()),configReload:async()=>nz.configReload.parse(await f()),restartService:async()=>nz.restartService.parse(await b()),sync:async e=>nz.sync.parse(await g(e.action,e.target,e.management,e.item)),npuSet:async e=>nz.npuSet.parse(await m(e.enabled,e.bridge,e.wan_upstream,e.wan_downstream,e.onu_bridge)),mibStart:async e=>nz.mibStart.parse(await h(e.onu_id,e.optical_sn,e.tables)),mibResult:async e=>nz.mibResult.parse(await v(e.job,e.chunk)),jobRelease:async e=>nz.jobRelease.parse(await y(e.job)),hl202List:async()=>nz.hl202List.parse(await w()),hl202Report:async e=>nz.hl202Report.parse(await x(e.target)),hl202AccountsStart:async e=>nz.hl202AccountsStart.parse(await k(e.target)),hl202AccountUpdate:async e=>nz.hl202AccountUpdate.parse(await z(e.target,e.kind,e.entry,e.password,e.active)),hl202ExecStart:async e=>nz.hl202ExecStart.parse(await j(e.target,e.script,e.timeout_seconds)),jobResult:async e=>nz.jobResult.parse(await C(e.job,e.chunk)),getCalibration:async()=>nz.getCalibration.parse(await S()),selectCalibration:async e=>nz.selectCalibration.parse(await $(e.source)),saveCalibration:async e=>nz.saveCalibration.parse(await P(e.data)),applyCalibration:async()=>nz.applyCalibration.parse(await O())})}let nC=async()=>nj().getStatus(),nS=async()=>nj().getPlatformInfo(),n$=async()=>nj().configReload(),nP=async()=>{let e=L.rpc.declare({object:"luci-rpc",method:"getNetworkDevices",expect:{"":{}},reject:!0});return r8.parse(nw(await e()))},nO=async()=>nj().opticalStatus(),nM=async e=>nj().opticalSet(e),nE=async(e,t,r)=>nj().mibStart({onu_id:e,optical_sn:t,tables:r}),nN=async(e,t)=>nj().mibResult({job:e,chunk:t}),nR=async e=>nj().jobRelease({job:e}),nL=e=>JSON.stringify(e,null,2);async function nI(e){let t=["{"],r=!0;for(let[n,i]of Object.entries(e))if(r||t.push(","),r=!1,t.push(JSON.stringify(n),":"),Array.isArray(i)){t.push("[");for(let e=0;e<i.length;e++){e&&t.push(",");let r=JSON.stringify(i[e]);if(void 0===r)throw Error(_("MIB snapshot cannot be serialized"));t.push(r),e%32==31&&await new Promise(e=>setTimeout(e,0))}t.push("]")}else{let e=JSON.stringify(i);if(void 0===e)throw Error(_("MIB snapshot cannot be serialized"));t.push(e)}return t.push("}"),new Blob(t,{type:"application/json"})}function nA(e){let t=e.reference;return t?.url.startsWith("https://github.com/opencord/omci-lib-go/blob/v2.2.4/")?d("a",{href:t.url,target:"_blank",rel:"noopener noreferrer",children:t.id}):d("span",{children:"—"})}function nT(e,t){return e.onus.find(e=>e.onu_id===t)}let nD=L.rpc.declare({object:"uci",method:"get",params:["config","type"],reject:!0}),nU=L.rpc.declare({object:"uci",method:"changes",params:["config"],reject:!0}),nq=L.rpc.declare({object:"uci",method:"set",params:["config","section","values"],reject:!0}),nB=L.rpc.declare({object:"uci",method:"delete",params:["config","section","option"],reject:!0}),nF=L.rpc.declare({object:"uci",method:"commit",params:["config"],reject:!0}),nZ=!1;async function nV(e,t,r,n){if(!L.hasViewPermission()||!t||nZ)return;let i=e.serial_number.toUpperCase(),a=t.desired[i],o=void 0!==a,s=o?a:e.onu_id;if(null==s||!o&&!nT(r,s))return void L.ui.addNotification(null,d("p",{children:_("The selected platform does not expose this ONU-ID as an available interface.")}),"warning");let l=o?_("Unpin interface"):_("Pin interface");try{var c,p,u,f,b,g,m,h,v,y,w,x,k,z,j,C;let e,{values:t}=await nD("fttr","device"),S=e=>Object.entries(e).find(e=>{let[,t]=e;return"device"===t[".type"]&&t.optical_sn?.toUpperCase()===i}),$=S(t);if(!$)return void L.ui.showModal(l,(m={children:[(c={children:_("Add this device on the configuration page before fixing its interface.")},d("p",c)),(u={children:(p={children:i},d("code",p))},d("p",u)),(g={class:"right",children:[(f={type:"button",class:"cbi-button",onclick:()=>L.ui.hideModal(),children:_("Cancel")},d("button",f))," ",(b={class:"cbi-button cbi-button-action",href:L.url("admin","network","fttr","config"),children:_("Configuration")},d("a",b))]},d("div",g))]},d("div",m)));let P=(h={class:"error",role:"alert"},d("p",h)),O=(v={type:"button",class:"cbi-button",onclick:()=>L.ui.hideModal(),children:_("Cancel")},d("button",v)),M=(y={type:"button",class:"cbi-button cbi-button-action",onclick:async()=>{if(nZ)return;nZ=!0,M.disabled=O.disabled=!0,P.textContent="";let e=!1;try{var t;if((await nU("fttr")).changes.length)throw Error(_("Apply or discard pending FTTR configuration changes first."));let r=(await nD("fttr","device")).values,i=S(r);if(!i||i[0]!==$[0]||i[1].onu_id!==$[1].onu_id||(null==i[1].onu_id?void 0:Number(i[1].onu_id))!==a)throw Error(_("Interface configuration changed. Refresh the page and try again."));if(!o&&Object.entries(r).some(e=>{let[t,r]=e;return t!==i[0]&&"device"===r[".type"]&&null!=r.onu_id&&Number(r.onu_id)===s}))throw Error(_("Interface already reserved by another device."));o?await nB("fttr",i[0],"onu_id"):await nq("fttr",i[0],{onu_id:String(s)}),await nF("fttr"),e=!0,await n$(),n(await nC()),L.ui.hideModal(),L.ui.addNotification(null,(t={children:_("Interface setting saved. Restart FTTR for it to take effect.")},d("p",t)),"info")}catch(t){P.textContent=`${e?_("Saved, but configuration reload or status refresh failed:"):_("Failed to save interface setting:")} ${String(t)}`}finally{nZ=!1,M.disabled=e,O.disabled=!1}},children:_("Confirm")},d("button",y));L.ui.showModal(l,(C={children:[(w={children:o?_("Cancel the fixed interface for this device?"):_("Fix this device to its current interface?")},d("p",w)),(k={children:[(x={children:i},d("code",x)),` \xb7 ${(e=nT(r,s),e?.interface?`${e.interface} \xb7 ONU-ID ${s}`:`ONU-ID ${s}`)}`]},d("p",k)),(z={children:_("This saves the configuration only. The current allocation stays unchanged until FTTR is restarted.")},d("p",z)),P,(j={class:"right",children:[O," ",M]},d("div",j))]},d("div",C)))}catch(e){L.ui.addNotification(null,d("p",{children:String(e)}),"error")}}let nW=L.view,nJ=L.Poll;function nG(e,t,r){var n,i,a;let o,s=e,c=[],p=d("button",{type:"button",class:"cbi-button cbi-button-neutral",style:"padding:0 .4em;min-height:1.5em;font-size:85%;margin-left:.5em",onclick:()=>nV(s,o,t,r)}),u=d("span",{}),f=d("span",{}),b=d("span",{}),g=d("code",{style:"font-size:90%"}),m=d("span",{class:"fttr-badge"}),h=d("span",{class:"fttr-badge"}),v=d("span",{style:"font-size:90%"}),y=d("code",{style:"font-size:90%"}),w=d("span",{class:"fttr-badge"}),x=d("span",{class:"fttr-badge"}),k=d("span",{class:"fttr-badge"}),z=(a={"data-fttr-onu-id":String(e.onu_id),children:[d("td",{children:[u,p]}),d("td",{children:f}),d("td",{children:b}),d("td",{children:g}),d("td",{children:m}),d("td",{children:h}),d("td",{children:v}),d("td",{children:y}),d("td",{children:w}),d("td",{children:x}),d("td",{children:k}),(i={style:"text-align:right",children:(n={type:"button",class:"cbi-button cbi-button-neutral",onclick:()=>(function(e){var t,r,n,i,a,o,s,c,p,u,f,b;let g=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"basic",m=!1,h=!1,v=null,y=null,w=(t={class:"onu-basic-container",children:[{title:_("Device identification"),rows:[[_("Vendor"),e.vendor],[_("Model"),e.identity?.equipment_id??e.model],[_("Optical serial"),d("code",{style:"font-size:90%",children:e.serial_number})],[_("ONU ID"),e.onu_id],[_("Hardware version"),e.identity?.hardware_version??e.hardware_version],[_("Software images"),e.identity?.software_images?.join(", ")??e.firmware_version],[_("OMCC version"),e.identity?.omcc_version==null?null:d("code",{style:"font-size:90%",children:["0x",e.identity.omcc_version.toString(16)]})]]},{title:_("Optical & link status"),rows:[[_("Registration"),d(no,{state:e.state})],[_("Business"),d(nl,{status:e.business_status})],[_("Receive optical power"),r9(e.optical_rx_power_dbm)],[_("Transmit optical power"),r9(e.optical_tx_power_dbm)],[_("Equalization delay (EQD)"),null==e.equalization_delay_bits?"—":d("code",{style:"font-size:90%",children:[e.equalization_delay_bits," bits"]})],[_("Data interface"),e.data_path?.interface?d("code",{style:"font-size:90%",children:e.data_path.interface}):null],[_("Uptime"),null==e.uptime_seconds?null:`${function(e){if(null==e||!Number.isFinite(e)||e<0)return"—";let t=Math.floor(e),r=Math.floor(t/86400),n=Math.floor(t%86400/3600),i=Math.floor(t%3600/60),a=[];return r>0&&a.push(`${r}d`),(n>0||r>0)&&a.push(`${n}h`),(i>0||n>0||r>0)&&a.push(`${i}m`),a.push(`${t%60}s`),a.join(" ")}(e.uptime_seconds)} (${Math.floor(e.uptime_seconds)} s)`]]},{title:_("Management & cache"),rows:[[_("CWMP"),d(np,{management:e.management})],[_("Last Inform"),e.management?.last_inform?`${new Date(1e3*e.management.last_inform).toLocaleString()}${null!=e.management.age_seconds?` (${e.management.age_seconds} s)`:""}`:null],[_("Provisioning"),d(nf,{provisioning:e.provisioning})],[_("Wi-Fi sync"),d(nm,{state:e.wifi_sync})],[_("Identity source"),e.identity?!1===e.identity_current?_("Cached identity"):!0===e.identity_current?_("Current registration"):_("Registration freshness unavailable"):_("Not collected")],[_("Identity age"),null==e.identity_age_seconds?null:`${e.identity_age_seconds} s`],[_("Identity read errors"),e.identity?.errors?.join("; ")]]}].map(e=>{var t,r,n;return n={class:"cbi-section onu-basic-section",children:[d("h3",{class:"onu-basic-title",children:e.title}),(r={class:"table onu-basic-table",children:(t={children:e.rows.map(e=>{var t;let[r,n]=e;return t={children:[d("th",{style:"width:35%",children:r}),d("td",{children:n instanceof Node?n:r7(n)})]},d("tr",t)})},d("tbody",t))},d("table",r))]},d("div",n)})},d("div",t)),x=(r={class:"mib-status-bar",role:"status",children:d("span",{class:"mib-hint-text",children:_("Read MIB on demand. Results are a snapshot, not live polling.")})},d("div",r)),k=(n={class:"cbi-progressbar",style:"display:none;width:100%",title:"0%",children:d("div",{style:"width:0%"})},d("div",n)),z=d("div",{}),j=d("pre",{class:"onu-raw-pre"}),C=d("span",{class:"download-status",role:"status"}),S=null,$=d("button",{type:"button",class:"cbi-button cbi-button-action",disabled:!0,onclick:async()=>{if(v&&!m){$.disabled=!0,C.textContent=_("Preparing JSON download…");try{let t=await nI(v);if(m)return;S&&URL.revokeObjectURL(S),S=URL.createObjectURL(t);let r=document.createElement("a");r.href=S,r.download=`mib-${e.serial_number}.json`,r.click(),C.textContent=_("JSON download started"),window.setTimeout(()=>{URL.revokeObjectURL(r.href),S===r.href&&(S=null)},1e3)}catch(e){C.textContent=String(e)}finally{$.disabled=!v||m}}},children:_("Download JSON")}),P=(a={class:"onu-raw-panel",children:[(i={class:"onu-raw-toolbar",children:[d("span",{class:"onu-raw-hint",children:_("This is a lightweight preview. Download JSON to save the complete MIB snapshot.")}),d("div",{class:"onu-raw-actions",children:[$,C]})]},d("div",i)),j]},d("div",a)),O=d("button",{type:"button",class:"cbi-button cbi-button-apply",onclick:()=>q(!1),children:_("Read MIB")}),M=d("button",{type:"button",class:"cbi-button cbi-button-action",onclick:()=>q(!0),children:_("Read MIB and VLAN tables")}),N=(c={class:"onu-mib-panel",children:[(s={class:"mib-controls",children:[(o={class:"mib-action-group",children:[O,M,d("small",{class:"mib-action-hint",children:_("Collecting VLAN tables queries extended filter tables and takes longer.")})]},d("div",o)),x,k]},d("div",s)),z]},d("div",c)),R={basic:w,mib:N,raw:P},I=new Map;function A(e){for(let[t,r]of Object.entries(R))t===e?r.style.removeProperty("display"):r.style.setProperty("display","none","important");for(let[t,r]of I)r.className=t===e?"cbi-tab":"cbi-tab-disabled"}let T=(p={class:"cbi-tabmenu",style:"margin:0;padding-left:0;display:flex;flex-wrap:wrap",children:[{id:"basic",label:_("Basic information")},{id:"mib",label:"OMCI / MIB"},{id:"raw",label:_("Raw JSON")}].map(e=>{var t;let r=(t={class:e.id===g?"cbi-tab":"cbi-tab-disabled","data-tab":e.id,children:d("a",{href:`#tab-${e.id}`,onclick:t=>{t.preventDefault(),A(e.id)},children:e.label})},d("li",t));return I.set(e.id,r),r})},d("ul",p)),D=(b={children:[d("div",{class:"onu-details-header",children:T}),(u={class:"onu-details-dialog",children:[d("style",{children:`
				.onu-details-dialog {
					--fttr-border: rgba(127, 127, 127, 0.22);
					--fttr-card-bg: rgba(127, 127, 127, 0.04);
					--fttr-hover-bg: rgba(127, 127, 127, 0.1);
					--fttr-active-bg: rgba(52, 152, 219, 0.16);
					--fttr-active-color: #3498db;

					--fttr-success-bg: rgba(46, 204, 113, 0.15);
					--fttr-success-color: #27ae60;
					--fttr-success-border: rgba(46, 204, 113, 0.35);

					--fttr-warning-bg: rgba(243, 156, 18, 0.15);
					--fttr-warning-color: #d35400;
					--fttr-warning-border: rgba(243, 156, 18, 0.35);

					--fttr-danger-bg: rgba(231, 76, 60, 0.15);
					--fttr-danger-color: #c0392b;
					--fttr-danger-border: rgba(231, 76, 60, 0.35);

					--fttr-info-bg: rgba(52, 152, 219, 0.15);
					--fttr-info-color: #2980b9;
					--fttr-info-border: rgba(52, 152, 219, 0.35);

					--fttr-neutral-bg: rgba(127, 140, 141, 0.12);
					--fttr-neutral-color: #7f8c8d;
					--fttr-neutral-border: rgba(127, 140, 141, 0.25);

					display: flex;
					flex-direction: column;
				}
				@media (prefers-color-scheme: dark) {
					.onu-details-dialog {
						--fttr-border: rgba(255, 255, 255, 0.14);
						--fttr-card-bg: rgba(255, 255, 255, 0.03);
						--fttr-hover-bg: rgba(255, 255, 255, 0.08);
						--fttr-active-bg: rgba(52, 152, 219, 0.25);
						--fttr-active-color: #5dade2;

						--fttr-success-color: #2ecc71;
						--fttr-warning-color: #f39c12;
						--fttr-danger-color: #e74c3c;
						--fttr-info-color: #3498db;
						--fttr-neutral-color: #bdc3c7;
					}
				}
				${nh}
				.onu-details-header {
					margin-bottom: 12px;
					border-bottom: 1px solid var(--fttr-border);
					padding-bottom: 4px;
				}
				.onu-details-header .cbi-tabmenu {
					border-bottom: none;
					margin: 0;
				}
				.onu-raw-toolbar {
					display: flex;
					justify-content: space-between;
					align-items: center;
					flex-wrap: wrap;
					gap: 12px;
					margin-bottom: 10px;
				}
				.onu-raw-hint {
					font-size: 0.9em;
					opacity: 0.8;
				}
				.onu-raw-actions {
					display: flex;
					align-items: center;
					gap: 8px;
				}
				.onu-raw-actions .download-status {
					font-size: 0.85em;
					opacity: 0.8;
				}
				.mib-controls {
					margin-bottom: 12px;
					display: flex;
					flex-direction: column;
					gap: 8px;
				}
				.mib-action-group {
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					gap: 8px;
				}
				.mib-action-hint {
					opacity: 0.7;
					font-size: 0.85em;
				}
				.mib-status-bar {
					min-height: 26px;
					display: flex;
					align-items: center;
					font-size: 0.9em;
				}
				.mib-hint-text {
					opacity: 0.75;
					font-style: italic;
				}
				.mib-error-text {
					color: #e74c3c;
				}
				.mib-chips {
					display: flex;
					flex-wrap: wrap;
					gap: 6px;
					align-items: center;
				}
				.mib-chip {
					display: inline-flex;
					align-items: center;
					font-size: 0.82em;
					padding: 2px 8px;
					border-radius: 4px;
					background: var(--fttr-hover-bg);
					border: 1px solid var(--fttr-border);
				}
				.mib-chip-primary {
					background: rgba(52, 152, 219, 0.15);
					border-color: rgba(52, 152, 219, 0.35);
					color: var(--fttr-active-color);
					font-weight: 600;
				}
				.mib-chip-success {
					background: rgba(46, 204, 113, 0.15);
					border-color: rgba(46, 204, 113, 0.35);
					color: #27ae60;
				}
				.mib-chip-warning {
					background: rgba(243, 156, 18, 0.15);
					border-color: rgba(243, 156, 18, 0.35);
					color: #d35400;
				}
				.mib-chip-info {
					background: rgba(155, 89, 182, 0.15);
					border-color: rgba(155, 89, 182, 0.35);
					color: #8e44ad;
				}
				.mib-chip-neutral {
					opacity: 0.85;
				}
				.mib-chip-subtle {
					opacity: 0.65;
					font-size: 0.8em;
				}
				.mib-browser {
					display: flex;
					height: 520px;
					border: 1px solid var(--fttr-border);
					border-radius: 6px;
					overflow: hidden;
					background: var(--fttr-card-bg);
				}
				.mib-sidebar {
					width: 270px;
					min-width: 240px;
					display: flex;
					flex-direction: column;
					border-right: 1px solid var(--fttr-border);
					background: var(--fttr-card-bg);
				}
				.mib-search-box {
					padding: 8px;
					border-bottom: 1px solid var(--fttr-border);
				}
				.mib-search-input {
					width: 100% !important;
					box-sizing: border-box;
					height: 32px;
					font-size: 0.9em;
				}
				.mib-class-list {
					flex: 1;
					overflow-y: auto;
					padding: 4px;
				}
				.mib-class-btn {
					display: flex;
					align-items: center;
					width: 100%;
					padding: 6px 8px;
					margin-bottom: 2px;
					border: none;
					border-left: 3px solid transparent;
					border-radius: 3px;
					background: transparent;
					color: inherit;
					font-size: 0.88em;
					text-align: left;
					cursor: pointer;
					box-sizing: border-box;
				}
				.mib-class-btn:hover {
					background: var(--fttr-hover-bg);
				}
				.mib-class-btn.active {
					background: var(--fttr-active-bg);
					color: var(--fttr-active-color);
					font-weight: 600;
					border-left-color: var(--fttr-active-color);
				}
				.mib-class-id {
					font-family: monospace;
					margin-right: 6px;
					opacity: 0.7;
					min-width: 24px;
					text-align: right;
				}
				.mib-class-name {
					flex: 1;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					padding: 0 4px;
				}
				.mib-class-count {
					font-size: 0.78em;
					padding: 1px 6px;
					border-radius: 10px;
					background: var(--fttr-hover-bg);
					opacity: 0.8;
				}
				.mib-content {
					flex: 1;
					min-width: 0;
					overflow-y: auto;
					padding: 12px 16px;
				}
				.mib-empty-list, .mib-empty-content {
					padding: 20px;
					text-align: center;
					opacity: 0.7;
					font-style: italic;
				}
				.mib-entity-details {
					margin-bottom: 12px;
					border: 1px solid var(--fttr-border);
					border-radius: 5px;
					overflow: hidden;
				}
				.mib-entity-details > summary {
					padding: 8px 12px;
					background: var(--fttr-hover-bg);
					cursor: pointer;
					display: flex;
					justify-content: space-between;
					align-items: center;
					user-select: none;
					font-size: 0.95em;
				}
				.mib-entity-title {
					display: flex;
					align-items: center;
					gap: 8px;
				}
				.mib-entity-id-tag {
					font-size: 0.85em;
					opacity: 0.75;
					font-family: monospace;
				}
				.mib-entity-support {
					font-size: 0.8em;
					padding: 2px 6px;
					border-radius: 3px;
					background: var(--fttr-card-bg);
					border: 1px solid var(--fttr-border);
					opacity: 0.85;
				}
				.mib-entity-body {
					padding: 10px 12px;
				}
				.mib-attributes-table {
					width: 100%;
					margin-bottom: 10px;
					font-size: 0.9em;
				}
				.mib-attr-name {
					font-weight: 500;
					word-break: break-word;
				}
				.mib-attr-kind code {
					font-size: 0.85em;
				}
				.mib-attr-value {
					word-break: break-all;
				}
				.mib-val-display {
					font-family: monospace;
				}
				.mib-obs-details {
					margin-top: 4px;
					font-size: 0.85em;
				}
				.mib-obs-details summary {
					cursor: pointer;
					color: var(--fttr-active-color);
				}
				.mib-pre {
					white-space: pre-wrap;
					overflow-wrap: anywhere;
					max-height: 180px;
					overflow-y: auto;
					padding: 6px 8px;
					background: var(--fttr-card-bg);
					border-radius: 4px;
					font-size: 0.85em;
				}
				.mib-table-overflow {
					overflow-x: auto;
					max-width: 100%;
					margin-top: 8px;
					margin-bottom: 8px;
				}
				.mib-table-details {
					margin-top: 10px;
					border: 1px solid var(--fttr-border);
					border-radius: 4px;
					padding: 6px 10px;
				}
				.mib-table-details summary {
					cursor: pointer;
					font-weight: 500;
				}
				.mib-diag-details {
					margin-top: 10px;
					font-size: 0.9em;
				}
				.mib-diag-details summary {
					cursor: pointer;
					opacity: 0.75;
				}
				.mib-upload-diagnostics {
					margin-top: 12px;
					border: 1px solid var(--fttr-border);
					border-radius: 4px;
					padding: 6px 10px;
				}
				.mib-upload-diagnostics summary {
					cursor: pointer;
					font-weight: 500;
				}
				.onu-basic-container {
					display: flex;
					flex-direction: column;
					gap: 14px;
					max-height: 60vh;
					overflow-y: auto;
					padding-right: 4px;
				}
				.onu-basic-section {
					margin-bottom: 0 !important;
					padding: 10px 14px;
					border: 1px solid var(--fttr-border);
					border-radius: 6px;
					background: var(--fttr-card-bg);
				}
				.onu-basic-title {
					margin-top: 0.2em;
					margin-bottom: 0.6em;
					font-size: 1.05em;
				}
				.onu-basic-table {
					width: 100%;
					margin-bottom: 0;
				}
				.onu-basic-table th {
					opacity: 0.75;
					font-weight: normal;
				}
				.onu-raw-panel {
					max-height: 60vh;
					display: flex;
					flex-direction: column;
					gap: 8px;
				}
				.onu-raw-pre {
					flex: 1;
					max-height: 50vh;
					overflow: auto;
					white-space: pre-wrap;
					overflow-wrap: anywhere;
					padding: 10px;
					background: var(--fttr-card-bg);
					border: 1px solid var(--fttr-border);
					border-radius: 4px;
				}
				.onu-details-footer {
					margin-top: 14px;
					display: flex;
					justify-content: flex-end;
				}
				`}),w,N,P]},d("div",u)),(f={class:"right onu-details-footer",children:d("button",{type:"button",class:"cbi-button",onclick:()=>{m=!0,S&&URL.revokeObjectURL(S),S=null,v=null,j.textContent="",z.replaceChildren(),L.ui.hideModal()},children:_("Close")})},d("div",f))]},d(l,b)),U=()=>!m&&D.isConnected&&D.getClientRects().length>0;async function q(t){if(!h){h=!0,O.disabled=M.disabled=!0,k.style.display="",k.title="0%",k.firstElementChild.style.width="0%",x.textContent=_("Reading MIB…");try{let h=await nC(),w=h.sub_gateways?.find(t=>t.serial_number===e.serial_number);if(w?.state!=="o5_operation")throw Error(_("Device is offline; reopen details after registration."));if(!U())return;let C=await nE(w.onu_id,w.serial_number,t);y=C.job;let S=Date.now()+14e4;for(;U();){let e=await nN(C.job,0);if(!U())return;if("ready"===e.status){var r,n,i,a,o,s,l,c,p,u,f,b,g,m;if(!e.chunks||e.chunks>1024||!e.bytes||e.bytes>0x2000000||0!==e.chunk||!e.data)throw Error(_("Invalid MIB snapshot"));let t=new Uint8Array(e.bytes),h=0;for(let r=0;r<e.chunks;r++){let n=0===r?e:await nN(C.job,r);if(!U())return;if("ready"!==n.status||n.chunk!==r||n.chunks!==e.chunks||n.bytes!==e.bytes||!n.data)throw Error(_("Invalid MIB snapshot chunk"));let i=atob(n.data);if(i.length>32768||h+i.length>t.length)throw Error(_("Invalid MIB snapshot size"));for(let e=0;e<i.length;e++)t[h++]=i.charCodeAt(e);let a=Math.min(100,Math.round((r+1)/e.chunks*100));k.title=`${a}%`,k.firstElementChild.style.width=`${a}%`,x.textContent=`${_("Downloading MIB snapshot")}: ${r+1}/${e.chunks}`}if(h!==t.length)throw Error(_("Incomplete MIB snapshot"));if(await B(),v=rp.parse(nw(JSON.parse(new TextDecoder("utf-8",{fatal:!0}).decode(t)))).report,1!==v.schema_version||v.onu_id!==w.onu_id)throw Error(_("Unexpected MIB response"));k.style.display="none",x.replaceChildren((r=v,f={class:"mib-chips",children:[(i={class:"mib-chip mib-chip-primary",children:["ONU ",r.onu_id]},d("span",i)),(a={class:`mib-chip ${r.uploaded_complete?"mib-chip-success":"mib-chip-warning"}`,children:r.uploaded_complete?_("Upload complete"):_("Upload incomplete")},d("span",a)),(o={class:"mib-chip mib-chip-info",children:[_("Records"),": ",r.received_records,r.expected_records!==r.received_records?` / ${r.expected_records}`:""]},d("span",o)),(s={class:"mib-chip",children:[_("Decoded"),": ",r.decoded_records]},d("span",s)),r.partial_records>0?(l={class:"mib-chip mib-chip-warning",children:[_("Partial"),": ",r.partial_records]},d("span",l)):null,(c={class:"mib-chip mib-chip-neutral",children:[_("Basic"),": ",r.basic_records]},d("span",c)),(p={class:"mib-chip",children:r.tables_collected?_("VLAN tables collected"):_("VLAN tables not collected")},d("span",p)),(u={class:"mib-chip mib-chip-subtle",children:new Date().toLocaleTimeString()},d("span",u))]},d("div",f))),z.replaceChildren(function(e){var t,r,n,i,a,o;let s=e.classes.length?e.classes[0].class_id:null,l=(t={class:"mib-content"},d("div",t)),c=(r={type:"search",class:"cbi-input-text mib-search-input",placeholder:_("Search ME name or Class ID…")},d("input",r)),p=(n={class:"mib-class-list"},d("div",n)),u=new Map;function f(t){var r,n;for(let[e,r]of(s=t,u))e===t?r.classList.add("active"):r.classList.remove("active");let i=e.entities.filter(e=>e.class_id===t);i.length?l.replaceChildren(...i.map((r,n)=>{var i,a,o,s,l,c,p,u,f,b,g,m,h,v,y,w,x,k,z;return z={open:0===n,class:"mib-entity-details",children:[(l={class:"mib-entity-summary",children:[(o={class:"mib-entity-title",children:[(i={children:r7(r.name)},d("strong",i)),(a={class:"mib-entity-id-tag",children:[_("Entity")," ",r.entity_id," (0x",r.entity_id.toString(16),")"]},d("span",a))]},d("span",o)),(s={class:"mib-entity-support",children:r.support},d("span",s))]},d("summary",l)),(k={class:"mib-entity-body",children:[r.attributes.length?(h={class:"table mib-attributes-table",children:[(g={children:(b={children:[(c={style:"width:28%",children:_("Attribute")},d("th",c)),(p={style:"width:14%",children:_("Type")},d("th",p)),(u={children:_("Value")},d("th",u)),(f={style:"width:18%",children:_("Definition")},d("th",f))]},d("tr",b))},d("thead",g)),(m={children:r.attributes.map(e=>{var t,r,n,i,a,o,s,l,c,p;return p={children:[(t={class:"mib-attr-name",children:e.definition.name},d("td",t)),(n={class:"mib-attr-kind",children:(r={children:e.definition.kind},d("code",r))},d("td",n)),(l={class:"mib-attr-value",children:[(i={class:"mib-val-display",children:function(e){if(null===e)return _("Conflicting values; inspect observations");switch(e.type){case"unsigned":case"signed":case"decimal":case"text":return r7(e.value);case"octets":return r7(e.hex);case"table_length":return r7(e.bytes);default:throw new ny("unexpected_variant",`Unexpected variant: ${String(e)}`)}}(e.value)},d("span",i)),e.observations?.length?(s={class:"mib-obs-details",children:[(a={children:_("Raw data / observations")},d("summary",a)),(o={class:"mib-pre",children:nL(e.observations)},d("pre",o))]},d("details",s)):null]},d("td",l)),(c={class:"mib-attr-ref",children:nA(e.definition)},d("td",c))]},d("tr",p)})},d("tbody",m))]},d("table",h)):(v={children:_("Basic display only; raw records are preserved.")},d("p",v)),e.tables.filter(e=>e.class_id===t&&e.entity_id===r.entity_id).map(e=>{var t,r,n,i,a,o,s,l,c,p,u,f,b,g,m,h;return h={class:"mib-table-details",children:[(t={children:[e.attribute.name," ·"," ",e.collected?`${e.rows.length} ${_("rows")}`:r7(e.error)]},d("summary",t)),e.vlan_rules.length?(b={class:"mib-table-overflow",children:(f={class:"table",children:[(p={children:(c={children:[(r={children:_("Outer filter (priority / VID / TPID-DEI)")},d("th",r)),(n={children:_("Inner filter (priority / VID / TPID-DEI)")},d("th",n)),(i={children:_("EtherType code")},d("th",i)),(a={children:_("Remove tags")},d("th",a)),(o={children:_("Outer treatment (priority / VID / TPID-DEI)")},d("th",o)),(s={children:_("Inner treatment (priority / VID / TPID-DEI)")},d("th",s)),(l={children:_("Delete entry")},d("th",l))]},d("tr",c))},d("thead",p)),(u={children:e.vlan_rules.map(e=>{var t,r,n,i,a,o,s,l;return l={children:[(t={children:`${e.filter_outer_priority} / ${e.filter_outer_vid} / ${e.filter_outer_tpid_dei}`},d("td",t)),(r={children:`${e.filter_inner_priority} / ${e.filter_inner_vid} / ${e.filter_inner_tpid_dei}`},d("td",r)),(n={children:r7(e.filter_ethertype)},d("td",n)),(i={children:r7(e.tags_to_remove)},d("td",i)),(a={children:`${e.treatment_outer_priority} / ${e.treatment_outer_vid} / ${e.treatment_outer_tpid_dei}`},d("td",a)),(o={children:`${e.treatment_inner_priority} / ${e.treatment_inner_vid} / ${e.treatment_inner_tpid_dei}`},d("td",o)),(s={children:r7(e.delete_entry)},d("td",s))]},d("tr",l)})},d("tbody",u))]},d("table",f))},d("div",b)):null,(g={style:"margin-top:6px",children:[_("G.988 encoded field values"),": ",nA(e.attribute)]},d("p",g)),(m={class:"mib-pre",children:nL(e.vlan_rules.length?e.vlan_rules:e.rows)},d("pre",m))]},d("details",h)}),(x={class:"mib-diag-details",children:[(y={children:_("Records / diagnostics")},d("summary",y)),(w={class:"mib-pre",children:nL({diagnostics:r.diagnostics,records:e.records.filter(e=>e.class_id===t&&e.entity_id===r.entity_id)})},d("pre",w))]},d("details",x))]},d("div",k))]},d("details",z)})):l.replaceChildren((n={class:"mib-empty-content",children:(r={children:_("No entities recorded for this ME class.")},d("p",r))},d("div",n)))}function b(){var t;let r=c.value.trim().toLowerCase();u.clear();let n=e.classes.filter(e=>`${e.class_id} ${e.name??""}`.toLowerCase().includes(r));n.length?p.replaceChildren(...n.map(e=>{var t,r,n,i;let a=(i={type:"button",class:`mib-class-btn${e.class_id===s?" active":""}`,onclick:()=>f(e.class_id),children:[(t={class:"mib-class-id",children:e.class_id},d("span",t)),(r={class:"mib-class-name",title:e.name??_("Unknown class"),children:e.name??_("Unknown class")},d("span",r)),(n={class:"mib-class-count",children:e.entities},d("span",n))]},d("button",i));return u.set(e.class_id,a),a})):p.replaceChildren((t={class:"mib-empty-list",children:_("No matching ME classes")},d("div",t)))}return c.addEventListener("input",b),b(),e.classes.length&&f(e.classes[0].class_id),o={class:"mib-browser",children:[(a={class:"mib-sidebar",children:[(i={class:"mib-search-box",children:c},d("div",i)),p]},d("div",a)),l]},d("div",o)}(v),(m={class:"mib-upload-diagnostics",children:[(b={children:_("Upload diagnostics")},d("summary",b)),(g={class:"mib-pre",children:nL(v.diagnostics)},d("pre",g))]},d("details",m))),n=v,j.textContent=nL({schema_version:n.schema_version,reference_version:n.reference_version,onu_id:n.onu_id,uploaded_complete:n.uploaded_complete,expected_records:n.expected_records,received_records:n.received_records,decoded_records:n.decoded_records,partial_records:n.partial_records,basic_records:n.basic_records,tables_requested:n.tables_requested,tables_collected:n.tables_collected,class_count:n.classes.length,classes:n.classes.slice(0,25),additional_classes:Math.max(0,n.classes.length-25),record_count:n.records.length,first_record:n.records[0]??null,table_count:n.tables.length,diagnostics_count:n.diagnostics.length}),$.disabled=!1;return}if(e.progress){let{phase:t,received:r,expected:n}=e.progress;if(x.textContent="starting"===t?_("Starting OMCI MIB read…"):"tables"===t?`${_("Collecting VLAN tables")}${null==n?"":`: ${r}/${n}`}`:null==n?_("Reading OMCI MIB records…"):`${_("Reading OMCI MIB records")}: ${r}/${n}`,n&&n>0){let e=Math.min(100,Math.round(r/n*100));k.title=`${e}%`,k.firstElementChild.style.width=`${e}%`}}if(Date.now()>=S)throw Error(_("MIB query timed out; retry."));await new Promise(e=>setTimeout(e,1e3))}}catch(e){U()&&(k.style.display="none",x.replaceChildren(d("span",{class:"mib-error-text",children:[String(e),v?` \xb7 ${_("Previous snapshot retained")}`:""]})))}finally{await B(),h=!1,O.disabled=M.disabled=!1}}}async function B(){if(!y)return;let e=y;y=null;try{await nR(e)}catch(e){console.warn("Failed to release MIB snapshot",e)}}A(g),L.ui.showModal(`${e.model} — ${e.serial_number}`,D,"modal-wide")})(s),children:_("Details")},d("button",n))},d("td",i))]},d("tr",a));z.addEventListener("mouseenter",()=>{let e=s.data_path?.interface,t=c.find(t=>t.interface===e);t&&document.querySelector(`[data-fttr-port="${t.port}"]`)?.classList.add("fttr-port-highlight")}),z.addEventListener("mouseleave",()=>{document.querySelectorAll(".fttr-port-highlight").forEach(e=>{e.classList.remove("fttr-port-highlight")})});let j={element:z,update(e,t,r){s=e,o=t,c=r;let n=e.serial_number.toUpperCase(),i=t?.desired[n];p.textContent=void 0!==i?_("Unpin"):_("Pin"),p.hidden=!t,p.disabled=!L.hasViewPermission(),p.title=i!==t?.active[n]?_("Pending restart"):void 0!==i?_("Fixed interface"):_("Pin interface"),z.setAttribute("data-fttr-onu-id",String(e.onu_id)),u.textContent=String(e.onu_id),f.textContent=r7(e.vendor),b.textContent=r7(e.identity?.equipment_id??e.model),g.textContent=r7(e.serial_number);let a=na(e.state);nn(m,a.tone,a.label,a.title);let l=ns(e.business_status);nn(h,l.tone,l.label,l.title);let d=function(e){if(!e)return{display:"—"};let t=e.match(/image\s*\d+:\s*([^;,\s]+)/i);return t?.[1]?{display:t[1],full:e.replace(/;\s*/g,"\n")}:{display:e}}(e.firmware_version||e.identity?.software_images?.join("; "));v.textContent=d.display,d.full?v.setAttribute("title",d.full):v.removeAttribute("title"),y.textContent=r7(e.data_path?.interface);let j=nc(e.management);nn(w,j.tone,j.label,j.title);let C=n_(e.provisioning);nn(x,C.tone,C.label,C.title);let S=ng(e.wifi_sync);nn(k,S.tone,S.label,S.title)}};return j.update(e,void 0,[]),j}let nK=null,nH=null,nX=!1,main=nW.extend({async load(){let[e,t,r]=await Promise.all([nC(),nP().catch(e=>(console.warn("Failed to load network device details",e),{})),nS()]);return{status:e,devices:t,platform:r}},render(e){var t,r,n,i,a,o,s,l,c,p,u,f,b,g,m,h,v;let y,w,x,k,z,j,C,S,$,P,O,M,N,R,I,A,T,D,U,q,B,F,Z,V,W,J,G,K,H,X,Q,Y,ee,et;return t=e.status,r=e.devices,n=e.platform,y=t.optical_transceiver??{},w=r,x=function(e,t,r){var n,i,a,o,s;let l=new Map;for(let n of e)l.set(n.onu_id,nG(n,t,r));let c=(n={children:d("td",{colSpan:12,children:_("No registered sub-gateways.")})},d("tr",n)),p=0===e.length,u=d("tbody",{children:p?c:[...l.values()].map(e=>e.element)});return{element:(s={class:"table-wrapper",children:(o={class:"table",children:[(a={children:(i={children:[d("th",{children:_("ONU ID")}),d("th",{children:_("Vendor")}),d("th",{children:_("Model")}),d("th",{children:_("Optical serial")}),d("th",{children:_("Registration")}),d("th",{children:_("Business")}),d("th",{children:_("Firmware")}),d("th",{children:_("Data interface")}),d("th",{children:_("CWMP")}),d("th",{children:_("Synchronization")}),d("th",{children:_("Wi-Fi sync")}),d("th",{style:"text-align:right",children:_("Details")})]},d("tr",i))},d("thead",a)),u]},d("table",o))},d("div",s)),update(e,n,i){let a=new Set(e.map(e=>e.onu_id));for(let[e,t]of l)a.has(e)||(t.element.remove(),l.delete(e));if(0===e.length){p||u.append(c),p=!0;return}for(let[a,o]of(p&&(c.remove(),p=!1),e.entries())){let e=l.get(o.onu_id);e||(e=nG(o,t,r),l.set(o.onu_id,e)),e.update(o,n,i);let s=u.children.item(a);s!==e.element&&u.insertBefore(e.element,s)}}}}(t.sub_gateways??[],n,e=>D(e,w)),k=new Map,z=d("div",{class:"fttr-ports-grid"}),j=d("p",{children:_("No downstream ports are reported by the selected platform.")}),C=d("span",{class:"fttr-badge"}),S=d("span",{class:"fttr-badge fttr-badge-info"}),$=d("code",{style:"font-size:90%"}),P=d("span",{class:"fttr-badge fttr-badge-danger",style:"margin-left:.5em"}),s={"data-provisioning-summary":"true",style:"display:flex;align-items:center;flex-wrap:wrap;gap:0.75em;margin-top:.25em;margin-bottom:1.2em;font-size:92%",children:[(i={children:[d("strong",{style:"margin-right:.4em",children:[_("Provisioning"),":"]}),C]},d("span",i)),(a={children:[d("span",{style:"color:#888;margin-right:.3em",children:[_("Mode"),":"]}),S]},d("span",a)),(o={children:[d("span",{style:"color:#888;margin-right:.3em",children:[_("Revision"),":"]}),$]},d("span",o)),P]},O=d("div",s),M=d("span",{class:"fttr-badge"}),N=d("span",{children:r7(y.model)}),R=d("span",{class:"fttr-badge"}),I=d("p",{role:"status"}),U=[["enabled",_("FPGA master switch"),_("Controls optical module reset and ONU discovery. Turning it off resets the module and disconnects all ONUs.")],["downstream_tx_enabled",_("GPON downstream optical emission"),_("Controls GPON downstream 1490 nm optical emission. Turning it off removes the downstream optical signal and disconnects ONUs.")],["fec_enabled",_("GPON downstream FEC encoding"),_("Controls GPON downstream FEC encoding. When downstream transmission is enabled, ONU-side OMCI FEC performance monitoring is also enabled.")]],q=null,B=null,F=!1,Z=!1,V=!1,W=0,J=!0,G=new Map,K=new Map,H=d("p",{role:"status","aria-live":"polite"}),X=e=>null==e?_("Unknown"):e?_("Enabled"):_("Disabled"),Q=d("button",{class:"cbi-button cbi-button-apply",type:"button",disabled:!0,children:_("Save & Apply")}),Y=()=>{for(let[e]of U){let t=G.get(e);t.disabled=F||J||!q||!L.hasViewPermission(),!V&&q&&(t.checked=q[e]);let r="enabled"===e?B?.tx_enabled:"downstream_tx_enabled"===e?B?.pon_mac?.tx_enabled:B?.pon_mac?.fec_enabled;K.get(e).textContent=`${_("Saved")}: ${X(q?.[e])} \xb7 ${_("Hardware")}: ${X(r)}`}Q.disabled=F||J||!q||!L.hasViewPermission()||!V&&!B?.error&&!B?.pon_mac?.error},ee=(v={class:"cbi-section","data-fttr":"optical-control",children:[(h={style:"display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:10px",children:U.map(e=>{var t,r;let[n,i,a]=e,o=d("input",{type:"checkbox",id:`fttr-optical-${n}`,disabled:!0});G.set(n,o),o.onchange=()=>{V=!0,Y()};let s=d("span",{style:"margin-inline-start:1em"});return K.set(n,s),r={style:"padding:10px 12px;border:1px solid rgba(127,140,141,.25);border-radius:5px;min-width:0",children:[(t={style:"display:flex;align-items:center;justify-content:space-between;gap:8px",children:[d("label",{style:"font-weight:600",htmlFor:`fttr-optical-${n}`,children:i}),o]},d("div",t)),d("div",{style:"font-size:82%;margin-top:6px",class:"cbi-value-description",children:a}),d("div",{style:"font-size:82%;margin-top:5px",role:"status",children:s})]},d("div",r)})},d("div",h)),d("div",{style:"display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:10px",children:[Q,H]})]},d("div",v)),et=e=>{J=!1,B=e,q=e.settings??null;let t=e.pon_mac,r=q&&e.tx_enabled===q.enabled&&t&&t.tx_enabled===(q.enabled&&q.downstream_tx_enabled)&&t.fec_enabled===(q.enabled&&q.fec_enabled)&&!e.cleanup_pending;H.textContent=e.error?.message||t?.error||(r?"":_("Saved; applying hardware configuration")),Y()},Q.onclick=async()=>{if(F||J||!q||!L.hasViewPermission())return;let e={enabled:G.get("enabled").checked,downstream_tx_enabled:G.get("downstream_tx_enabled").checked,fec_enabled:G.get("fec_enabled").checked};if((e.enabled||!q.enabled)&&(e.downstream_tx_enabled||!q.downstream_tx_enabled)||window.confirm(_("This disconnects all ONUs on this PON. Apply these settings?"))){F=!0,W++,Y();try{let t=await nM(e);"success"===t.status&&(V=!1),et(t)}catch(e){H.textContent=String(e)}finally{F=!1,Y()}}},A={element:ee,async refresh(){if(F||Z)return;let e=W;Z=!0;try{let t=await nO();F||e!==W||et(t)}catch(t){F||e!==W||(J=!0,H.textContent=String(t),Y())}finally{Z=!1}}},nJ.add(async()=>{A.element.isConnected&&await A.refresh()},2),m={class:"cbi-map fttr-overview",children:[d("style",{children:`
				.fttr-overview {
					--fttr-success-bg: rgba(46, 204, 113, 0.15);
					--fttr-success-color: #27ae60;
					--fttr-success-border: rgba(46, 204, 113, 0.35);

					--fttr-warning-bg: rgba(243, 156, 18, 0.15);
					--fttr-warning-color: #d35400;
					--fttr-warning-border: rgba(243, 156, 18, 0.35);

					--fttr-danger-bg: rgba(231, 76, 60, 0.15);
					--fttr-danger-color: #c0392b;
					--fttr-danger-border: rgba(231, 76, 60, 0.35);

					--fttr-info-bg: rgba(52, 152, 219, 0.15);
					--fttr-info-color: #2980b9;
					--fttr-info-border: rgba(52, 152, 219, 0.35);

					--fttr-neutral-bg: rgba(127, 140, 141, 0.12);
					--fttr-neutral-color: #7f8c8d;
					--fttr-neutral-border: rgba(127, 140, 141, 0.25);
				}

				@media (prefers-color-scheme: dark) {
					.fttr-overview {
						--fttr-success-color: #2ecc71;
						--fttr-warning-color: #f39c12;
						--fttr-danger-color: #e74c3c;
						--fttr-info-color: #3498db;
						--fttr-neutral-color: #bdc3c7;
					}
				}

				[data-darkmode="true"] .fttr-overview,
				[data-theme="dark"] .fttr-overview {
					--fttr-success-color: #2ecc71;
					--fttr-warning-color: #f39c12;
					--fttr-danger-color: #e74c3c;
					--fttr-info-color: #3498db;
					--fttr-neutral-color: #bdc3c7;
				}

				${nh}

				.fttr-overview .fttr-ports-grid {
					display: grid;
					grid-template-columns: repeat(8, 100px);
					gap: 8px;
					margin-bottom: 1em;
					margin-inline: auto;
					width: fit-content;
					max-width: 100%;
				}

				@media (max-width: 1100px) {
					.fttr-overview .fttr-ports-grid {
						grid-template-columns: repeat(4, 100px);
					}
				}

				@media (max-width: 520px) {
					.fttr-overview .fttr-ports-grid {
						grid-template-columns: repeat(2, 100px);
					}
				}

				.fttr-overview .fttr-port-card {
					box-sizing: border-box;
					width: 100px;
					margin: 0;
					cursor: pointer;
					text-align: center;
					transition: opacity 0.2s, box-shadow 0.2s, transform 0.2s;
				}

				.fttr-overview .fttr-port-name {
					text-align: center;
				}

				.fttr-overview .fttr-port-identity {
					display: flex;
					flex-direction: column;
					align-items: center;
				}

				.fttr-overview .fttr-port-identity > span {
					text-align: center;
				}

				.fttr-overview .fttr-port-stats {
					display: flex !important;
					flex-direction: column !important;
					align-items: center;
					font-size: 80%;
					line-height: 1.4;
					width: 100%;
					box-sizing: border-box;
				}

				.fttr-overview .fttr-port-stats > div {
					white-space: nowrap;
				}

				.fttr-overview .fttr-port-card.port-down {
					opacity: 0.65;
				}

				.fttr-overview .fttr-port-card.port-down:hover {
					opacity: 1 !important;
				}

				.fttr-overview .fttr-row-highlight {
					background-color: rgba(52, 152, 219, 0.12) !important;
					outline: 1px solid rgba(52, 152, 219, 0.4);
				}

				.fttr-overview .fttr-port-highlight {
					box-shadow: 0 0 0 2px #3498db !important;
					transform: translateY(-2px);
				}

				.fttr-overview table.table th {
					white-space: nowrap;
					padding: 0.5em 0.7em;
				}

				.fttr-overview table.table td {
					white-space: nowrap;
					padding: 0.5em 0.7em;
					vertical-align: middle;
				}
				`}),d("h2",{children:_("FTTR overview")}),A.element,O,I,(f={class:"cbi-section",children:[d("h3",{children:_("Controller")}),(u={class:"table",children:(p={children:[(l={children:[d("th",{style:"width:15%",children:_("FPGA status")}),d("td",{style:"width:35%",children:M}),d("th",{style:"width:15%",children:_("CDR lock")}),d("td",{style:"width:35%",children:R})]},d("tr",l)),(c={children:[d("th",{children:_("Optical module")}),d("td",{colSpan:3,children:N})]},d("tr",c))]},d("tbody",p))},d("table",u))]},d("div",f)),(b={class:"cbi-section",children:[d("h3",{children:_("Sub-gateways")}),x.element]},d("div",b)),(g={class:"cbi-section",children:[d("h3",{children:_("Downstream ports")}),j,z]},d("div",g))]},T=d("div",m),(D=(e,t)=>{w=t;let r=e.optical_transceiver,n=e.provisioning,i=e.onu_pinning;I.textContent=i?[i.allocation_blocked?_("ONU allocation blocked by invalid startup configuration."):"",i.pending_restart?_("Fixed interface changes pending FTTR restart."):"",i.startup_error||i.config_error||""].filter(Boolean).join(" "):"",I.hidden=!I.textContent,n?(nn(C,n.enabled?"success":"neutral",n.enabled?_("Enabled"):_("Disabled")),S.textContent=r7(n.mode),$.textContent=r7(n.revision),n.error?(P.textContent=n.error,P.style.display=""):P.style.display="none",O.style.display=""):O.textContent=_("Provisioning status unavailable"),"ready"===e.fpga_status?nn(M,"success",_("Ready")):e.fpga_status?nn(M,"neutral",r7(e.fpga_status)):nn(M,"none","—"),N.textContent=r7(r.model),null==r.cdr_locked?nn(R,"none",_("Unknown")):r.cdr_locked?nn(R,"success",_("Locked")):nn(R,"warning",_("Unlocked")),x.update(e.sub_gateways??[],e.onu_pinning,e.switch_ports??[]);let a=new Set;for(let[r,n]of(e.switch_ports??[]).entries()){if(a.has(n.port))continue;a.add(n.port);let i=k.get(n.port);i||(i=function(e){var t,r,n,i,a,o,s,l,c,p,u,f,b,g,m,h,v;let y=d("span",{}),w=d("span",{style:"display:inline-block;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:90%",children:_("Unknown")}),x=d("img",{src:"/luci-static/resources/icons/port_down.svg",alt:"","aria-hidden":"true"}),k=d("div",{style:"flex:1;height:3px;opacity:0.25;background-color:rgb(240, 144, 144)"}),z=d("span",{}),j=d("span",{}),C=d("span",{}),S=d("span",{}),$=d("span",{}),P=d("span",{}),O=d("span",{}),M=d("span",{}),N=d("span",{}),R=d("span",{}),I=d("span",{}),A=d("span",{}),T=d("span",{}),D=d("span",{}),U=(v={class:"ifacebox fttr-port-card","data-fttr-port":String(e),style:"box-sizing:border-box;margin:0;cursor:pointer",children:[d("div",{class:"ifacebox-head fttr-port-name",style:"font-weight:bold",children:y}),d("div",{class:"ifacebox-body fttr-port-identity",children:[x,w]}),(r={class:"ifacebox-head cbi-tooltip-container",style:"display:flex",children:[k,(t={class:"cbi-tooltip left",children:[d("strong",{children:[_("Port status"),": "]}),z,d("br",{}),d("strong",{children:[_("ONU"),": "]}),j,d("br",{}),d("strong",{children:[_("MAC address"),": "]}),C]},d("span",t))]},d("div",r)),(h={class:"ifacebox-body",children:(m={class:"cbi-tooltip-container fttr-port-stats",style:"display:flex;flex-direction:column;align-items:center;font-size:80%;line-height:1.4;cursor:pointer;width:100%",children:[(n={style:"display:flex;flex-direction:column;align-items:center",children:[d("div",{style:"white-space:nowrap",children:["▲ ",S]}),d("div",{style:"white-space:nowrap",children:["▼ ",$]})]},d("div",n)),(g={class:"cbi-tooltip",children:(b={children:[(i={class:"nowrap",children:[d("strong",{children:[_("Received bytes"),": "]}),P]},d("span",i)),d("br",{}),(a={class:"nowrap",children:[d("strong",{children:[_("Received packets"),": "]}),O]},d("span",a)),d("br",{}),(o={class:"nowrap",children:[d("strong",{children:[_("Received multicast"),": "]}),M]},d("span",o)),d("br",{}),(s={class:"nowrap",children:[d("strong",{children:[_("Receive errors"),": "]}),N]},d("span",s)),d("br",{}),(l={class:"nowrap",children:[d("strong",{children:[_("Receive dropped"),": "]}),R]},d("span",l)),d("br",{}),(c={class:"nowrap",children:[d("strong",{children:[_("Transmitted bytes"),": "]}),I]},d("span",c)),d("br",{}),(p={class:"nowrap",children:[d("strong",{children:[_("Transmitted packets"),": "]}),A]},d("span",p)),d("br",{}),(u={class:"nowrap",children:[d("strong",{children:[_("Transmit errors"),": "]}),T]},d("span",u)),d("br",{}),(f={class:"nowrap",children:[d("strong",{children:[_("Transmit dropped"),": "]}),D]},d("span",f))]},d("span",b))},d("span",g))]},d("div",m))},d("div",h))]},d("div",v));return U.addEventListener("mouseenter",()=>{let e=U.getAttribute("data-active-onu-id");if(e){let t=document.querySelector(`[data-fttr-onu-id="${e}"]`);t?.classList.add("fttr-row-highlight")}}),U.addEventListener("mouseleave",()=>{document.querySelectorAll(".fttr-row-highlight").forEach(e=>{e.classList.remove("fttr-row-highlight")})}),U.addEventListener("click",()=>{let e=U.getAttribute("data-active-onu-id");if(e){let t=document.querySelector(`[data-fttr-onu-id="${e}"]`);t&&(t.scrollIntoView({behavior:"smooth",block:"nearest"}),t.classList.add("fttr-row-highlight"),window.setTimeout(()=>t.classList.remove("fttr-row-highlight"),1500))}}),{element:U,update(t,r){var n;let i=(t.switch_ports??[]).find(t=>t.port===e),a=i?.interface,o=a?r[a]:void 0,s=o?.stats,l=i?.carrier??o?.carrier??(o?.link?.speed!==void 0||void 0),d=(t.sub_gateways??[]).find(e=>e.onu_id===i?.onu_id),c=!0===l,p=s?.rx_bytes,u=s?.tx_bytes;i?.onu_id!==void 0?U.setAttribute("data-active-onu-id",String(i.onu_id)):U.removeAttribute("data-active-onu-id"),c?(U.classList.add("port-up"),U.classList.remove("port-down")):(U.classList.add("port-down"),U.classList.remove("port-up")),y.textContent=r7(a),x.setAttribute("src",`/luci-static/resources/icons/${c?"port_up.svg":"port_down.svg"}`),w.textContent=c?o?.link?.speed!==void 0?void 0===(n=o.link.speed)||!Number.isFinite(n)||n<=0?_("Unknown"):n>=1e3?`${n/1e3} GbE`:`${n} MbE`:_("Connected"):!1===l?_("Disconnected"):_("Unknown"),w.setAttribute("title",_("速度：%s Mbit/s，双工：%s").format(r7(o?.link?.speed),r7(o?.link?.duplex))),k.style.opacity=c?"1":"0.25",k.style.backgroundColor=c?"rgb(46, 204, 113)":"rgba(200, 200, 200, 0.4)",z.textContent=r7((i?.reserved_sn&&void 0===i.onu_id?_("Reserved (offline)"):i?.link_state)??i?.status??(o?l?_("Link up"):_("Link down"):_("Unavailable"))),i?.reserved_sn&&void 0!==i.onu_id&&(z.textContent+=` \xb7 ${_("Fixed interface")}`),j.textContent=r7(i?.onu_sn??d?.serial_number??i?.reserved_sn??i?.onu_id),U.title=i?.reserved_sn?`${_("Reserved")}: ${i.reserved_sn}`:"",C.textContent=r7(o?.mac),S.textContent=c||u?ne(u):"—",$.textContent=c||p?ne(p):"—",P.textContent=ne(p),O.textContent=nt(s?.rx_packets),M.textContent=nt(s?.rx_multicast??s?.multicast),N.textContent=nt(s?.rx_errors),R.textContent=nt(s?.rx_dropped),I.textContent=ne(u),A.textContent=nt(s?.tx_packets),T.textContent=nt(s?.tx_errors),D.textContent=nt(s?.tx_dropped)}}}(n.port),k.set(n.port,i)),i.update(e,t);let o=z.children.item(r);o!==i.element&&z.insertBefore(i.element,o)}for(let[e,t]of k)a.has(e)||(t.element.remove(),k.delete(e));j.hidden=a.size>0})(t,r),nK=(nH={element:T,update:D}).element,nJ.add(async()=>{if(nX||!nK?.isConnected||!nH)return;let e=nH;nX=!0;try{let[t,r]=await Promise.all([nC(),nP().catch(()=>({}))]);nH===e&&e.element.isConnected&&e.update(t,r)}catch(e){console.error("Failed to refresh FTTR status",e)}finally{nX=!1}},10),nK},handleSaveApply:null,handleSave:null,handleReset:null})})(),main=t.main;
return main;
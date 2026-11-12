'use strict';
var main,e={};e.d=(t,r,n)=>{var i=(r,n)=>{for(var i in r)e.o(r,i)&&!e.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,[n]:r[i]})};i(r,"get"),i(n,"value")},e.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var t={};(()=>{var r;let n,i,a,s,o;e.d(t,{main:()=>main});let l=Symbol.for("jsx.fragment");function d(e,t){let{children:r,...n}=null===t||"object"!=typeof t||Array.isArray(t)?{}:t,i=function e(t){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];for(let n of t)null!=n&&"boolean"!=typeof n&&(Array.isArray(n)?e(n,r):r.push(n instanceof Node?n:String(n)));return r}(null==r?[]:Array.isArray(r)?r:[r]);if(e===l){let e=document.createDocumentFragment();return e.append(...i),e}if("function"==typeof e){let t=Reflect.apply(e,void 0,[{...n,children:i}]);if(!(t instanceof Node))throw TypeError("JSX components must return a DOM Node");return t}if("string"!=typeof e)throw TypeError("JSX element types must be tag names or component functions");let a={},s={...n};for(let[e,t]of Object.entries(s))e.startsWith("on")&&"function"==typeof t?(a[e]=t,delete s[e]):"boolean"==typeof t&&(t?s[e]=e:delete s[e]);let o=Object.keys(s).length>0?i.length>1?E(e,s,i):E(e,s,i[0]):i.length>1?E(e,{},i):E(e,{},i[0]);for(let[e,t]of Object.entries(a)){let r=e.slice(2).toLowerCase();o.addEventListener(r,t)}return o}function c(){return"u">typeof document&&document.hidden}let p=e=>null==e||""===e?"—":String(e);function u(e){return e?new Date(1e3*e).toLocaleString():"—"}function f(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3;return null!=e&&Number.isFinite(e)?`${e.toFixed(t)} dBm`:"—"}function g(e){if(null==e||!Number.isFinite(e)||e<0)return null;let t=Math.floor(e);if(t<60)return(1===t?_("%d second ago"):_("%d seconds ago")).format(t);let r=Math.floor(t/60);if(r<60)return(1===r?_("%d minute ago"):_("%d minutes ago")).format(r);let n=Math.floor(t/3600);if(n<24)return(1===n?_("%d hour ago"):_("%d hours ago")).format(n);let i=Math.floor(t/86400);return(1===i?_("%d day ago"):_("%d days ago")).format(i)}function b(e,t,r){function n(r,n){if(r._zod||Object.defineProperty(r,"_zod",{value:{def:n,constr:s,traits:new Set},enumerable:!1}),r._zod.traits.has(e))return;r._zod.traits.add(e),t(r,n);let i=s.prototype,a=Object.keys(i);for(let e=0;e<a.length;e++){let t=a[e];t in r||(r[t]=i[t].bind(r))}}let i=r?.Parent??Object;class a extends i{}function s(e){var t;let i=r?.Parent?new a:this;for(let r of(n(i,e),(t=i._zod).deferred??(t.deferred=[]),i._zod.deferred))r();return i}return Object.defineProperty(a,"name",{value:e}),Object.defineProperty(s,"init",{value:n}),Object.defineProperty(s,Symbol.hasInstance,{value:t=>!!r?.Parent&&t instanceof r.Parent||t?._zod?.traits?.has(e)}),Object.defineProperty(s,"name",{value:e}),s}Object.freeze({status:"aborted"}),Symbol("zod_brand");class m extends Error{constructor(){super("Encountered Promise during synchronous parse. Use .parseAsync() instead.")}}let h={};function y(e){return e&&Object.assign(h,e),h}function v(e,t){return"bigint"==typeof t?t.toString():t}function w(e){let t=+!!e.startsWith("^"),r=e.endsWith("$")?e.length-1:e.length;return e.slice(t,r)}let x=Symbol("evaluating");function k(e,t,r){let n;Object.defineProperty(e,t,{get(){if(n!==x)return void 0===n&&(n=x,n=r()),n},set(r){Object.defineProperty(e,t,{value:r})},configurable:!0})}let z="captureStackTrace"in Error?Error.captureStackTrace:(...e)=>{};function j(e){return"object"==typeof e&&null!==e&&!Array.isArray(e)}function S(e){if(!1===j(e))return!1;let t=e.constructor;if(void 0===t||"function"!=typeof t)return!0;let r=t.prototype;return!1!==j(r)&&!1!==Object.prototype.hasOwnProperty.call(r,"isPrototypeOf")}function C(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function $(e){if(!e)return{};if("string"==typeof e)return{error:()=>e};if(e?.message!==void 0){if(e?.error!==void 0)throw Error("Cannot specify both `message` and `error` params");e.error=e.message}return(delete e.message,"string"==typeof e.error)?{...e,error:()=>e.error}:e}function M(e,t=0){if(!0===e.aborted)return!0;for(let r=t;r<e.issues.length;r++)if(e.issues[r]?.continue!==!0)return!0;return!1}function P(e,t){return t.map(t=>(t.path??(t.path=[]),t.path.unshift(e),t))}function A(e){return"string"==typeof e?e:e?.message}function O(e,t,r){let n={...e,path:e.path??[]};return e.message||(n.message=A(e.inst?._zod.def?.error?.(e))??A(t?.error?.(e))??A(r.customError?.(e))??A(r.localeError?.(e))??"Invalid input"),delete n.inst,delete n.continue,t?.reportInput||delete n.input,n}let N=(e,t)=>{e.name="$ZodError",Object.defineProperty(e,"_zod",{value:e._zod,enumerable:!1}),Object.defineProperty(e,"issues",{value:t,enumerable:!1}),e.message=JSON.stringify(t,v,2),Object.defineProperty(e,"toString",{value:()=>e.message,enumerable:!1})},R=b("$ZodError",N),I=b("$ZodError",N,{Parent:Error}),T=(i=I,(e,t,r,n)=>{let a=r?Object.assign(r,{async:!1}):{async:!1},s=e._zod.run({value:t,issues:[]},a);if(s instanceof Promise)throw new m;if(s.issues.length){let e=new(n?.Err??i)(s.issues.map(e=>O(e,a,y())));throw z(e,n?.callee),e}return s.value}),D=(a=I,async(e,t,r,n)=>{let i=r?Object.assign(r,{async:!0}):{async:!0},s=e._zod.run({value:t,issues:[]},i);if(s instanceof Promise&&(s=await s),s.issues.length){let e=new(n?.Err??a)(s.issues.map(e=>O(e,i,y())));throw z(e,n?.callee),e}return s.value}),q=(s=I,(e,t,r)=>{let n=r?{...r,async:!1}:{async:!1},i=e._zod.run({value:t,issues:[]},n);if(i instanceof Promise)throw new m;return i.issues.length?{success:!1,error:new(s??R)(i.issues.map(e=>O(e,n,y())))}:{success:!0,data:i.value}}),W=(o=I,async(e,t,r)=>{let n=r?Object.assign(r,{async:!0}):{async:!0},i=e._zod.run({value:t,issues:[]},n);return i instanceof Promise&&(i=await i),i.issues.length?{success:!1,error:new o(i.issues.map(e=>O(e,n,y())))}:{success:!0,data:i.value}}),B=/^-?\d+(?:\.\d+)?$/,Z=/^(?:true|false)$/i,U=/^null$/i,V={major:4,minor:3,patch:6},F=b("$ZodType",(e,t)=>{var r;e??(e={}),e._zod.def=t,e._zod.bag=e._zod.bag||{},e._zod.version=V;let n=[...e._zod.def.checks??[]];for(let t of(e._zod.traits.has("$ZodCheck")&&n.unshift(e),n))for(let r of t._zod.onattach)r(e);if(0===n.length)(r=e._zod).deferred??(r.deferred=[]),e._zod.deferred?.push(()=>{e._zod.run=e._zod.parse});else{let t=(e,t,r)=>{let n,i=M(e);for(let a of t){if(a._zod.def.when){if(!a._zod.def.when(e))continue}else if(i)continue;let t=e.issues.length,s=a._zod.check(e);if(s instanceof Promise&&r?.async===!1)throw new m;if(n||s instanceof Promise)n=(n??Promise.resolve()).then(async()=>{await s,e.issues.length!==t&&(i||(i=M(e,t)))});else{if(e.issues.length===t)continue;i||(i=M(e,t))}}return n?n.then(()=>e):e},r=(r,i,a)=>{if(M(r))return r.aborted=!0,r;let s=t(i,n,a);if(s instanceof Promise){if(!1===a.async)throw new m;return s.then(t=>e._zod.parse(t,a))}return e._zod.parse(s,a)};e._zod.run=(i,a)=>{if(a.skipChecks)return e._zod.parse(i,a);if("backward"===a.direction){let t=e._zod.parse({value:i.value,issues:[]},{...a,skipChecks:!0});return t instanceof Promise?t.then(e=>r(e,i,a)):r(t,i,a)}let s=e._zod.parse(i,a);if(s instanceof Promise){if(!1===a.async)throw new m;return s.then(e=>t(e,n,a))}return t(s,n,a)}}k(e,"~standard",()=>({validate:t=>{try{let r=q(e,t);return r.success?{value:r.data}:{issues:r.error?.issues}}catch(r){return W(e,t).then(e=>e.success?{value:e.data}:{issues:e.error?.issues})}},vendor:"zod",version:1}))}),J=b("$ZodString",(e,t)=>{var r;let n;F.init(e,t),e._zod.pattern=[...e?._zod.bag?.patterns??[]].pop()??(n=(r=e._zod.bag)?`[\\s\\S]{${r?.minimum??0},${r?.maximum??""}}`:"[\\s\\S]*",RegExp(`^${n}$`)),e._zod.parse=(r,n)=>{if(t.coerce)try{r.value=String(r.value)}catch(e){}return"string"==typeof r.value||r.issues.push({expected:"string",code:"invalid_type",input:r.value,inst:e}),r}}),K=b("$ZodNumber",(e,t)=>{F.init(e,t),e._zod.pattern=e._zod.bag.pattern??B,e._zod.parse=(r,n)=>{if(t.coerce)try{r.value=Number(r.value)}catch(e){}let i=r.value;if("number"==typeof i&&!Number.isNaN(i)&&Number.isFinite(i))return r;let a="number"==typeof i?Number.isNaN(i)?"NaN":Number.isFinite(i)?void 0:"Infinity":void 0;return r.issues.push({expected:"number",code:"invalid_type",input:i,inst:e,...a?{received:a}:{}}),r}}),Q=b("$ZodBoolean",(e,t)=>{F.init(e,t),e._zod.pattern=Z,e._zod.parse=(r,n)=>{if(t.coerce)try{r.value=!!r.value}catch(e){}let i=r.value;return"boolean"==typeof i||r.issues.push({expected:"boolean",code:"invalid_type",input:i,inst:e}),r}}),G=b("$ZodNull",(e,t)=>{F.init(e,t),e._zod.pattern=U,e._zod.values=new Set([null]),e._zod.parse=(t,r)=>{let n=t.value;return null===n||t.issues.push({expected:"null",code:"invalid_type",input:n,inst:e}),t}}),H=b("$ZodUnknown",(e,t)=>{F.init(e,t),e._zod.parse=e=>e});function X(e,t,r){e.issues.length&&t.issues.push(...P(r,e.issues)),t.value[r]=e.value}let Y=b("$ZodArray",(e,t)=>{F.init(e,t),e._zod.parse=(r,n)=>{let i=r.value;if(!Array.isArray(i))return r.issues.push({expected:"array",code:"invalid_type",input:i,inst:e}),r;r.value=Array(i.length);let a=[];for(let e=0;e<i.length;e++){let s=i[e],o=t.element._zod.run({value:s,issues:[]},n);o instanceof Promise?a.push(o.then(t=>X(t,r,e))):X(o,r,e)}return a.length?Promise.all(a).then(()=>r):r}});function ee(e,t,r,n,i){if(e.issues.length){if(i&&!(r in n))return;t.issues.push(...P(r,e.issues))}void 0===e.value?r in n&&(t.value[r]=void 0):t.value[r]=e.value}let et=b("$ZodObject",(e,t)=>{var r;let n;F.init(e,t);let i=Object.getOwnPropertyDescriptor(t,"shape");if(!i?.get){let e=t.shape;Object.defineProperty(t,"shape",{get:()=>{let r={...e};return Object.defineProperty(t,"shape",{value:r}),r}})}let a=(r=()=>(function(e){var t;let r=Object.keys(e.shape);for(let t of r)if(!e.shape?.[t]?._zod?.traits?.has("$ZodType"))throw Error(`Invalid element at key "${t}": expected a Zod schema`);let n=Object.keys(t=e.shape).filter(e=>"optional"===t[e]._zod.optin&&"optional"===t[e]._zod.optout);return{...e,keys:r,keySet:new Set(r),numKeys:r.length,optionalKeys:new Set(n)}})(t),{get value(){{let e=r();return Object.defineProperty(this,"value",{value:e}),e}}});k(e._zod,"propValues",()=>{let e=t.shape,r={};for(let t in e){let n=e[t]._zod;if(n.values)for(let e of(r[t]??(r[t]=new Set),n.values))r[t].add(e)}return r});let s=t.catchall;e._zod.parse=(t,r)=>{n??(n=a.value);let i=t.value;if(!j(i))return t.issues.push({expected:"object",code:"invalid_type",input:i,inst:e}),t;t.value={};let o=[],l=n.shape;for(let e of n.keys){let n=l[e],a="optional"===n._zod.optout,s=n._zod.run({value:i[e],issues:[]},r);s instanceof Promise?o.push(s.then(r=>ee(r,t,e,i,a))):ee(s,t,e,i,a)}return s?function(e,t,r,n,i,a){let s=[],o=i.keySet,l=i.catchall._zod,d=l.def.type,c="optional"===l.optout;for(let i in t){if(o.has(i))continue;if("never"===d){s.push(i);continue}let a=l.run({value:t[i],issues:[]},n);a instanceof Promise?e.push(a.then(e=>ee(e,r,i,t,c))):ee(a,r,i,t,c)}return(s.length&&r.issues.push({code:"unrecognized_keys",keys:s,input:t,inst:a}),e.length)?Promise.all(e).then(()=>r):r}(o,i,t,r,a.value,e):o.length?Promise.all(o).then(()=>t):t}});function er(e,t,r,n){for(let r of e)if(0===r.issues.length)return t.value=r.value,t;let i=e.filter(e=>!M(e));return 1===i.length?(t.value=i[0].value,i[0]):(t.issues.push({code:"invalid_union",input:t.value,inst:r,errors:e.map(e=>e.issues.map(e=>O(e,n,y())))}),t)}let en=b("$ZodUnion",(e,t)=>{F.init(e,t),k(e._zod,"optin",()=>t.options.some(e=>"optional"===e._zod.optin)?"optional":void 0),k(e._zod,"optout",()=>t.options.some(e=>"optional"===e._zod.optout)?"optional":void 0),k(e._zod,"values",()=>{if(t.options.every(e=>e._zod.values))return new Set(t.options.flatMap(e=>Array.from(e._zod.values)))}),k(e._zod,"pattern",()=>{if(t.options.every(e=>e._zod.pattern)){let e=t.options.map(e=>e._zod.pattern);return RegExp(`^(${e.map(e=>w(e.source)).join("|")})$`)}});let r=1===t.options.length,n=t.options[0]._zod.run;e._zod.parse=(i,a)=>{if(r)return n(i,a);let s=!1,o=[];for(let e of t.options){let t=e._zod.run({value:i.value,issues:[]},a);if(t instanceof Promise)o.push(t),s=!0;else{if(0===t.issues.length)return t;o.push(t)}}return s?Promise.all(o).then(t=>er(t,i,e,a)):er(o,i,e,a)}}),ei=b("$ZodIntersection",(e,t)=>{F.init(e,t),e._zod.parse=(e,r)=>{let n=e.value,i=t.left._zod.run({value:n,issues:[]},r),a=t.right._zod.run({value:n,issues:[]},r);return i instanceof Promise||a instanceof Promise?Promise.all([i,a]).then(([t,r])=>ea(e,t,r)):ea(e,i,a)}});function ea(e,t,r){let n,i=new Map;for(let r of t.issues)if("unrecognized_keys"===r.code)for(let e of(n??(n=r),r.keys))i.has(e)||i.set(e,{}),i.get(e).l=!0;else e.issues.push(r);for(let t of r.issues)if("unrecognized_keys"===t.code)for(let e of t.keys)i.has(e)||i.set(e,{}),i.get(e).r=!0;else e.issues.push(t);let a=[...i].filter(([,e])=>e.l&&e.r).map(([e])=>e);if(a.length&&n&&e.issues.push({...n,keys:a}),M(e))return e;let s=function e(t,r){if(t===r||t instanceof Date&&r instanceof Date&&+t==+r)return{valid:!0,data:t};if(S(t)&&S(r)){let n=Object.keys(r),i=Object.keys(t).filter(e=>-1!==n.indexOf(e)),a={...t,...r};for(let n of i){let i=e(t[n],r[n]);if(!i.valid)return{valid:!1,mergeErrorPath:[n,...i.mergeErrorPath]};a[n]=i.data}return{valid:!0,data:a}}if(Array.isArray(t)&&Array.isArray(r)){if(t.length!==r.length)return{valid:!1,mergeErrorPath:[]};let n=[];for(let i=0;i<t.length;i++){let a=e(t[i],r[i]);if(!a.valid)return{valid:!1,mergeErrorPath:[i,...a.mergeErrorPath]};n.push(a.data)}return{valid:!0,data:n}}return{valid:!1,mergeErrorPath:[]}}(t.value,r.value);if(!s.valid)throw Error(`Unmergable intersection. Error path: ${JSON.stringify(s.mergeErrorPath)}`);return e.value=s.data,e}let es=b("$ZodRecord",(e,t)=>{F.init(e,t),e._zod.parse=(r,n)=>{let i=r.value;if(!S(i))return r.issues.push({expected:"record",code:"invalid_type",input:i,inst:e}),r;let a=[],s=t.keyType._zod.values;if(s){let o;r.value={};let l=new Set;for(let e of s)if("string"==typeof e||"number"==typeof e||"symbol"==typeof e){l.add("number"==typeof e?e.toString():e);let s=t.valueType._zod.run({value:i[e],issues:[]},n);s instanceof Promise?a.push(s.then(t=>{t.issues.length&&r.issues.push(...P(e,t.issues)),r.value[e]=t.value})):(s.issues.length&&r.issues.push(...P(e,s.issues)),r.value[e]=s.value)}for(let e in i)l.has(e)||(o=o??[]).push(e);o&&o.length>0&&r.issues.push({code:"unrecognized_keys",input:i,inst:e,keys:o})}else for(let s of(r.value={},Reflect.ownKeys(i))){if("__proto__"===s)continue;let o=t.keyType._zod.run({value:s,issues:[]},n);if(o instanceof Promise)throw Error("Async schemas not supported in object keys currently");if("string"==typeof s&&B.test(s)&&o.issues.length){let e=t.keyType._zod.run({value:Number(s),issues:[]},n);if(e instanceof Promise)throw Error("Async schemas not supported in object keys currently");0===e.issues.length&&(o=e)}if(o.issues.length){"loose"===t.mode?r.value[s]=i[s]:r.issues.push({code:"invalid_key",origin:"record",issues:o.issues.map(e=>O(e,n,y())),input:s,path:[s],inst:e});continue}let l=t.valueType._zod.run({value:i[s],issues:[]},n);l instanceof Promise?a.push(l.then(e=>{e.issues.length&&r.issues.push(...P(s,e.issues)),r.value[o.value]=e.value})):(l.issues.length&&r.issues.push(...P(s,l.issues)),r.value[o.value]=l.value)}return a.length?Promise.all(a).then(()=>r):r}}),eo=b("$ZodLiteral",(e,t)=>{if(F.init(e,t),0===t.values.length)throw Error("Cannot create literal schema with no valid values");let r=new Set(t.values);e._zod.values=r,e._zod.pattern=RegExp(`^(${t.values.map(e=>"string"==typeof e?C(e):e?C(e.toString()):String(e)).join("|")})$`),e._zod.parse=(n,i)=>{let a=n.value;return r.has(a)||n.issues.push({code:"invalid_value",values:t.values,input:a,inst:e}),n}});function el(e,t){return e.issues.length&&void 0===t?{issues:[],value:void 0}:e}let ed=b("$ZodOptional",(e,t)=>{F.init(e,t),e._zod.optin="optional",e._zod.optout="optional",k(e._zod,"values",()=>t.innerType._zod.values?new Set([...t.innerType._zod.values,void 0]):void 0),k(e._zod,"pattern",()=>{let e=t.innerType._zod.pattern;return e?RegExp(`^(${w(e.source)})?$`):void 0}),e._zod.parse=(e,r)=>{if("optional"===t.innerType._zod.optin){let n=t.innerType._zod.run(e,r);return n instanceof Promise?n.then(t=>el(t,e.value)):el(n,e.value)}return void 0===e.value?e:t.innerType._zod.run(e,r)}});Symbol("ZodOutput"),Symbol("ZodInput");(r=globalThis).__zod_globalRegistry??(r.__zod_globalRegistry=new class e{constructor(){this._map=new WeakMap,this._idmap=new Map}add(e,...t){let r=t[0];return this._map.set(e,r),r&&"object"==typeof r&&"id"in r&&this._idmap.set(r.id,e),this}clear(){return this._map=new WeakMap,this._idmap=new Map,this}remove(e){let t=this._map.get(e);return t&&"object"==typeof t&&"id"in t&&this._idmap.delete(t.id),this._map.delete(e),this}get(e){let t=e._zod.parent;if(t){let r={...this.get(t)??{}};delete r.id;let n={...r,...this._map.get(e)};return Object.keys(n).length?n:void 0}return this._map.get(e)}has(e){return this._map.has(e)}});let ec=b("ZodMiniType",(e,t)=>{if(!e._zod)throw Error("Uninitialized schema in ZodMiniType.");F.init(e,t),e.def=t,e.type=t.type,e.parse=(t,r)=>T(e,t,r,{callee:e.parse}),e.safeParse=(t,r)=>q(e,t,r),e.parseAsync=async(t,r)=>D(e,t,r,{callee:e.parseAsync}),e.safeParseAsync=async(t,r)=>W(e,t,r),e.check=(...r)=>e.clone({...t,checks:[...t.checks??[],...r.map(e=>"function"==typeof e?{_zod:{check:e,def:{check:"custom"},onattach:[]}}:e)]},{parent:!0}),e.with=e.check,e.clone=(t,r)=>{let n;return n=new e._zod.constr(t??e._zod.def),(!t||r?.parent)&&(n._zod.parent=e),n},e.brand=()=>e,e.register=(t,r)=>(t.add(e,r),e),e.apply=t=>t(e)}),ep=b("ZodMiniString",(e,t)=>{J.init(e,t),ec.init(e,t)});function eu(e){return new ep({type:"string",...$(e)})}let e_=b("ZodMiniNumber",(e,t)=>{K.init(e,t),ec.init(e,t)});function ef(e){return new e_({type:"number",checks:[],...$(e)})}let eg=b("ZodMiniBoolean",(e,t)=>{Q.init(e,t),ec.init(e,t)});function eb(e){return new eg({type:"boolean",...$(e)})}let em=b("ZodMiniNull",(e,t)=>{G.init(e,t),ec.init(e,t)});function eh(e){return new em({type:"null",...$(e)})}let ey=b("ZodMiniUnknown",(e,t)=>{H.init(e,t),ec.init(e,t)}),ev=b("ZodMiniArray",(e,t)=>{Y.init(e,t),ec.init(e,t)});function ew(e,t){return new ev({type:"array",element:e,...$(t)})}let ex=b("ZodMiniObject",(e,t)=>{et.init(e,t),ec.init(e,t),k(e,"shape",()=>t.shape)});function ek(e,t){return new ex({type:"object",shape:e??{},...$(t)})}let ez=b("ZodMiniUnion",(e,t)=>{en.init(e,t),ec.init(e,t)});function ej(e,t){return new ez({type:"union",options:e,...$(t)})}let eS=b("ZodMiniIntersection",(e,t)=>{ei.init(e,t),ec.init(e,t)});function eC(e,t){return new eS({type:"intersection",left:e,right:t})}let e$=b("ZodMiniRecord",(e,t)=>{es.init(e,t),ec.init(e,t)});function eM(e,t,r){return new e$({type:"record",keyType:e,valueType:t,...$(r)})}let eP=b("ZodMiniLiteral",(e,t)=>{eo.init(e,t),ec.init(e,t)});function eA(e,t){return new eP({type:"literal",values:Array.isArray(e)?e:[e],...$(t)})}let eO=b("ZodMiniOptional",(e,t)=>{ed.init(e,t),ec.init(e,t)});function eE(e){return new eO({type:"optional",innerType:e})}let eN=ej([eA("account_set_password"),eA("account_set_active")]),eR=ej([eA("waiting_transport"),eA("waiting_identity"),eA("reading"),eA("configuring"),eA("verifying"),eA("waiting_inform"),eA("ready"),eA("retry_wait"),eA("manual_required"),eA("not_configured"),eA("waiting_acs"),eA("awaiting_apply"),eA("discovering_management_wan"),eA("configuring_management_wan"),eA("verifying_management_wan")]),eI=ek({enabled:eb(),listen:ej([eu(),eh()]),path:ej([eu(),eh()]),error:ej([eu(),eh()])}),eT=ek({vlan:ef(),vlans:ew(ef()),priority:ef(),acs_url:eu()}),eD=ek({state:eR,optical_sn:eu(),cwmp_id:eu(),mqtt_target:ej([eu(),eh()]),binding_source:eu(),method:eu(),desired_version:eu(),generation:ef(),reason:eu(),attempts:ef(),next_retry_at:ef(),updated_at:ef(),settings_verified_at:ej([ef(),eh()]),selected_vlan:ej([ef(),eh()]),last_inform:ej([ef(),eh()]),expected_acs_url:eu(),last_error:ej([eu(),eh()]),transport_epoch:ef(),completed_authorization:ef(),connection_request_enabled:ej([eb(),eh()]),inflight:eb(),persistence_error:ej([eu(),eh()]),link_identity_error:ej([eu(),eh()]),listener:eI,mqtt_last_seen:ej([ef(),eh()]),desired:eE(eT),endpoint_notice:eE(eu()),manual_steps:eE(ew(eu()))}),eL=ej([eA("not_required"),eA("pending"),eA("unavailable")]),eq=ej([eD,ek({state:eL,reason:eu()})]),eW=ek({id:eu(),name:eu()}),eB=ek({omci:ew(eW),bootstrap:ew(eW),provisioning:ew(eW)}),eZ=ek({configured:eu(),effective:eu(),available:ew(eu()),reason:eu()}),eU=ek({phase:ej([eA("not_started"),eA("collecting_identity"),eA("retrying_identity"),eA("unsupported"),eA("configuring"),eA("verifying"),eA("wan_bootstrap_pending"),eA("verified"),eA("retrying"),eA("offline")]),generation:ef(),error:ej([eu(),eh()])}),eV=ej([eA("auto"),eA("factory"),eA("firmware"),eA("builtin")]),eF=ej([eA("factory"),eA("firmware"),eA("builtin")]),eJ=ek({source:eF,raw_sha256:eu(),effective_sha256:eu(),size:ef(),supplemented:eb(),temperature_compensation_enabled:eb()}),eK=ek({enabled:eb(),reason:eu(),calibration_sha256:ej([eu(),eh()]),raw_temperature:ej([ef(),eh()]),table_index:ej([ef(),eh()]),target_code:ej([ef(),eh()]),last_check_unix:ej([ef(),eh()]),last_write_unix:ej([ef(),eh()]),error:ej([eu(),eh()])}),eQ=ek({selected:eV,candidate:ej([eJ,eh()]),candidate_error:ej([eu(),eh()]),active:ej([eJ,eh()]),hardware_applied:eb(),pending:eb(),temperature_compensation:eK});ek({success:eb(),state:eE(eQ),output:eE(eu()),error:eE(eu())});let eG=ek({detected:eb(),device:eu(),has_data:eb(),sha256:eu(),data:eu()}),eH=ek({exists:eb(),path:eu(),size:ef(),sha256:eu(),data:eu()}),eX=ek({source:eF,active_path:eu(),size:ef(),sha256:eu(),data:eu(),factory:eG,firmware:eH,state:eE(eQ)}),eY=ek({error:eu()});ej([eX,eY]);let e0=ek({success:eb(),path:eu(),size:ef(),sha256:eu()});ej([e0,eY]),ek({data:eu()}),ek({source:eV});let e1=ek({acs:eb(),mqtt:eb(),npu:eb(),"device-hl202":eb(),"device-hwtc":eb(),"device-star":eb(),"device-zte":eb(),"device-scty":eb()}),e2=ek({optical:eb(),bridge_offload:eb(),omci_mib:eb(),mqtt_telemetry:eb(),hl202_management:eb(),cwmp:eb(),command_provisioning:eb()}),e5=ek({status:eb(),config:eb(),sync:eb(),hardware:eb(),calibration:eb(),hl202:eb(),about:eb()}),e8=ek({schema_version:eA(1),version:eu(),features:e1,functions:e2,pages:e5,adapters:eB}),e4=ej([ek({valid:eA(!0),revision:eu(),devices:ef()}),ek({error:eu()})]),e3=ej([eA("disabled"),eA("waiting"),eA("wan_reconciling"),eA("wan_verifying"),eA("wifi_reconciling"),eA("discovering"),eA("reading"),eA("disabling"),eA("disabling_read"),eA("writing"),eA("verifying"),eA("settling"),eA("completed"),eA("not_started"),eA("reset_pending"),eA("interrupted"),eA("recovering"),eA("waiting_management"),eA("waiting_task")]),e6=ek({operation_id:ef(),device:eu(),state:e3,started_at:ef()}),e7=ek({state:ej([eA("waiting"),eA("applied")]),requested_revision:eu(),requested_at:ej([ef(),eh()]),blocking_operations:ew(e6),reset_pending:eb()}),e9=ej([eA("auto"),eA("manual")]),te=eA("diff"),tt=ek({state:eu(),enabled:eb(),reason:eE(ej([eu(),eh()])),revision:eE(eu()),vlan:eE(ef()),updated_at:eE(ef())}),tr=ej([eA("disabled"),eA("online"),eA("waiting_inform"),eA("offline_or_stale"),eA("waiting_transport")]),tn=ek({cwmp_id:eu(),state:tr,optical_online:eb(),last_inform:ej([ef(),eh()]),age_seconds:ej([ef(),eh()])}),ti=ek({state:tr,optical_online:eb()}),ta=ej([eA("device_service"),eA("ssid"),eA("port_binding"),eA("wan_activation")]),ts=ek({name:eu(),desired:eu()}),to=ek({id:eu(),name:eE(ej([eu(),eh()])),kind:ta,service_type:eu(),state:eu(),reason:eE(eu()),revision:eE(eu()),current_revision:eE(eb()),management_fresh:eE(eb()),operation_id:eE(ef()),task_id:eE(ej([ef(),eh()])),updated_at:eE(ef()),changes:eE(ew(ts))}),tl=ej([eA("plan"),eA("apply")]),td=ek({wan:eu(),wlan:eu(),binding:eu()}),tc=ek({state:eu(),requested:eu(),contract:ej([eu(),eh()]),reason:eu(),cache_hit:eb(),schema:eu(),capabilities:ej([td,eh()])}),tp=ek({parent:ef(),connection:ef(),state:eu(),service_list:eu(),kind:eu(),baseline:ej([ew(ef()),eh()])}),tu=ek({state:eu(),reason:eE(eu()),task_id:eE(ej([ef(),eh()])),instance:eE(ef()),cwmp_id:eE(eu())}),t_=ej([eA("waiting"),eA("inventory"),eA("classifying"),eA("adding_parent"),eA("child_names"),eA("adding_child"),eA("delete_guard"),eA("deleting"),eA("verify_delete"),eA("empty_parent"),eA("deleting_parent"),eA("verify_parent_delete"),eA("next"),eA("done")]),tf=ek({owned:ew(ef()),pending:ej([eu(),eh()]),pending_instance:ej([ef(),eh()])}),tg=ej([eA("waiting"),eA("inventory"),eA("adding"),eA("verify_add"),eA("deleting"),eA("verify_delete"),eA("reading_disable"),eA("disabling"),eA("verifying_disable"),eA("next"),eA("done")]),tb=ej([eA("disable"),eA("preserve"),eA("delete")]),tm=ek({parent:ef(),child:ef(),service:eu(),vlan:eu()}),th=ek({state:e3,items:ew(to),omci_adapter:eE(eu()),bootstrap_adapter:eE(eu()),provisioning_adapter:eE(eu()),backend:eE(eZ),operation_id:eE(ef()),device:eE(eu()),optical_sn:eE(eu()),cwmp_id:eE(eu()),revision:eE(eu()),mode:eE(tl),started_at:eE(ef()),completed_at:eE(ej([ef(),eh()])),current_revision:eE(eb()),management_fresh:eE(eb()),reason:eE(eu()),error:eE(eu()),attempts:eE(ef()),next_retry_at:eE(ef()),reconcile_reason:eE(eu()),cwmp_contract:eE(tc),wan_objects:eE(eM(eu(),tp)),wan_lifecycle:eE(eM(eu(),tu)),wan_stage:eE(t_),wifi_objects:eE(tf),wifi_lifecycle:eE(eM(eu(),tu)),wifi_stage:eE(tg),wifi_cleanup:eE(tb),native_ownership:eE(eM(eu(),tm)),write_performed:eE(eb()),readback_verified:eE(eb())}),ty=ej([eA("disabled"),eA("not_configured"),eA("stale_revision"),eA("stale_management"),eA("verified"),eA("attention_required"),eA("accepted_unverified"),eA("pending"),eA("recovering"),eA("waiting_management")]),tv=ek({device:eu(),name:ej([eu(),eh()]),group:ej([eu(),eh()]),group_name:ej([eu(),eh()]),template:ej([eu(),eh()]),template_name:ej([eu(),eh()]),optical_sn:eu(),omci_adapter:eu(),bootstrap_adapter:eu(),provisioning_adapter:eu(),omci_management:tt,management:ej([tn,eh()]),mqtt:ej([ti,eh()]),acs_bootstrap:eq,provisioning:th,services:ew(to),ssids:ew(to),wifi_sync:ty}),tw=ej([eA("discovering"),eA("comparing"),eA("planning"),eA("applying"),eA("verifying"),eA("configuring_listener"),eA("cleaning_previous"),eA("waiting_devices"),eA("ready"),eA("awaiting_apply"),eA("verified"),eA("blocked"),eA("retry_wait")]),tx=ek({enabled:eb(),mode:e9,vlan:ew(ef()),priority:ef(),address:eu(),acs_url:eu(),port:ef(),path:eu(),dhcp_enabled:eb()}),tk=ek({operation:eu(),key:eu(),value:ew(eu())}),tz=ek({state:tw,error:ej([eu(),eh()]),inflight:eb(),ready:eb(),desired_version:ej([eu(),eh()]),applied_version:ej([eu(),eh()]),next_retry_at:ef(),attempts:ef(),desired:ej([tx,eh()]),applied:ej([tx,eh()]),previous:ej([tx,eh()]),plan:ew(tk)}),tj=ek({desired:ej([eT,eh()]),state:eu()}),tS=ek({id:eu(),name:ej([eu(),eh()]),template:eu()}),tC=ek({enabled:eb(),mode:e9,method:te,revision:eu(),triggers:ew(eu()),interval_minutes:ef(),error:ej([eu(),eh()]),devices:ew(tv),management_network:tz,omci_management:tj,groups:ew(tS),pending_devices:ew(eu()),onu_pins:eE(eM(eu(),ef())),config_error:eE(ej([eu(),eh()])),config_load:eE(e7)});ej([tC,eY]);let t$=ek({enabled:ej([eb(),eh()]),routed_enabled:ej([eb(),eh()]),bridge_enabled:ej([eb(),eh()]),engine_attached:ej([eb(),eh()]),forwarding_verified:ej([eb(),eh()])}),tM=ek({entity_id:ef(),port_id:ej([ef(),eh()])}),tP=ek({entity_id:ef(),filter_list_hex:ej([eu(),eh()]),forward_operation:ej([ef(),eh()]),number_of_entries:ej([ef(),eh()])}),tA=ek({entity_id:ef(),received_frame_rules_hex:ej([ew(eu()),eh()]),error:ej([eu(),eh()])}),tO=ek({age_seconds:ef(),gem_ports:ew(tM),vlan_filters:ew(tP),vlan_operations:ew(tA)}),tE=ek({source:eu(),unit:eu(),reason:ej([eu(),eh()]),raw:ej([eu(),eh()]),age_seconds:ej([ef(),eh()])}),tN=ek({interface:eu(),gem_ports:ej([ew(ef()),eh()]),vlan_id:ej([ef(),eh()]),onu_inventory:ej([tO,eh()]),tx_bytes:ej([ef(),eh()]),rx_bytes:ej([ef(),eh()]),current_tx_kbps:ej([ef(),eh()]),current_rx_kbps:ej([ef(),eh()]),olt_channel_gem:eE(ef()),forwarding_verified:eE(eb()),offload:t$,measurements:eM(eu(),tE)});ek({});let tR=ek({entity_id:ef(),interval_end_time:ef(),corrected_bytes:ef(),corrected_code_words:ef(),uncorrectable_code_words:ef(),total_code_words:ef(),fec_seconds:ef()}),tI=ek({ani_entity_id:ej([ef(),eh()]),control_supported:eb(),downstream_enabled:ej([eb(),eh()]),upstream_enabled:ej([eb(),eh()]),downstream_pm:ej([tR,eh()]),measurement:tE}),tT=ek({entry:ej([eA(0),eA(1),eA(2)]),username:eu(),active:eb()}),tD=ek({mqtt_mac:eu(),optical_sn:ej([eu(),eh()]),onu_id:ej([ef(),eh()]),binding_generation:eu(),last_seen:ef(),reason:eu()}),tL=ej([eA("executed"),eA("dispatched"),eA("timeout"),eA("error")]),tq=ek({target:eu(),status:tL,request_id:eE(eu()),exit_code:eE(ef()),output:eE(eu()),output_truncated:eb(),error:eE(eu())}),tW=ek({target:tD,result:tq,binding_current:eb()}),tB=ej([eA("not_applicable"),eA("accepted_and_saved"),eA("unconfirmed")]),tZ=ek({code:eu(),message:eu()});ej([ek({schema_version:eA(1),operation:tW,accounts:ej([ew(tT),eh()]),write_status:tB}),ek({schema_version:ef(),error:tZ})]);let tU=ek({optical_sn:eu(),onu_id:ef(),binding_generation:eu()}),tV=ek({mqtt_mac:eu(),binding_generation:eu()}),tF=ej([tU,tV]);ek({target:tF});let tJ=ej([ek({kind:eA("exec"),script:eu(),timeout_seconds:ef()}),ek({kind:eA("accounts_read")}),ek({kind:eA("account_set_password"),entry:ef(),password:eu()}),ek({kind:eA("account_set_active"),entry:ef(),active:eb()})]),tK=ek({schema_version:ef(),target:tU,action:tJ}),tQ=ek({optical_sn:eu(),onu_id:ef(),model:eu(),optical_online:eb(),can_execute:eb(),mqtt:ej([tD,eh()]),report_revision:ej([ef(),eh()])});ej([ek({schema_version:eA(1),operation:tW}),ek({schema_version:ef(),error:tZ})]),ek({target:tF,script:eu(),timeout_seconds:ef()});let tG=ej([ek({schema_version:eA(1),devices:ew(tQ),sources:ew(tD)}),ek({schema_version:ef(),error:tZ})]);ej([ek({method:eA("list")}),ek({method:eA("report"),target:tU}),ek({method:eA("source_report"),target:tV}),ek({method:eA("run"),request:tK})]);let tH=ej([eA("received"),eA("report_unavailable")]),tX=ek({value:new ey({type:"unknown"}),member:eu(),unit:ej([eu(),eh()])}),tY=ek({name:eu(),bytes:ef(),encoding:eu(),text:ej([eu(),eh()]),text_omitted:eb()}),t0=ek({schema_version:ef(),compressed_bytes:ef(),decompressed_bytes:ef(),fields:eM(eu(),tX),members:ew(tY),errors:ew(eu())}),t1=ek({revision:ef(),last_received:ef(),last_processed_receipt:ej([ef(),eh()]),last_good:ej([ef(),eh()]),error:ej([eu(),eh()]),report:ej([t0,eh()])});ej([ek({schema_version:eA(1),target:tD,report:ej([t1,eh()]),state:tH}),ek({schema_version:eA(1),target:tD,report:ej([t1,eh()]),read_only:eA(!0)}),ek({schema_version:ef(),error:tZ})]),ek({target:tF}),ek({target:tF,kind:eN,entry:ef(),password:eu(),active:eb()});let t2=ek({accepted:ef(),rejected:ef(),read_errors:ef(),handled:ef(),max_intake_us:ef(),max_handler_us:ef()}),t5=eA("pending"),t8=ek({phase:ej([eA("starting"),eA("upload"),eA("tables")]),received:ef(),expected:ej([ef(),eh()])}),t4=eA("ready"),t3=ej([ek({status:t5,progress:eE(t8)}),ek({status:t4,chunk:ef(),chunks:ef(),bytes:ef(),data:eu()})]);ej([t3,eY]);let t6=ek({status:t5,job:eu()}),t7=ek({released:eb()});ek({job:eu()}),ek({job:eu(),chunk:ef()}),ej([t6,eY]);let t9=ek({accepting:eb(),running:ef(),stored:ef(),bytes:ef(),running_limit:ef(),stored_limit:ef(),bytes_limit:ef(),result_bytes_limit:ef()}),re=ek({mac:eu(),ip:eu(),band:eu(),rssi_dbm:ej([ef(),eh()]),rx_rate_mbps:ej([ef(),eh()]),tx_rate_mbps:ej([ef(),eh()])}),rt=ej([eA("unknown"),eA("octets"),eA("string"),eA("unsigned_integer"),eA("table"),eA("signed_integer"),eA("pointer"),eA("bit_field"),eA("enumeration"),eA("counter")]),rr=ek({id:eu(),url:eu()}),rn=ek({name:eu(),kind:rt,index:ef(),mask:ef(),size:ef(),read:eb(),write:eb(),set_by_create:eb(),avc:eb(),optional:eb(),deprecated:eb(),default_hex:ej([eu(),eh()]),reference:rr}),ri=ej([ek({type:eA("unsigned"),value:ef()}),ek({type:eA("signed"),value:ef()}),ek({type:eA("decimal"),value:eu()}),ek({type:eA("text"),value:ej([eu(),eh()])}),ek({type:eA("octets"),hex:eu()}),ek({type:eA("table_length"),bytes:ef()})]),ra=ek({raw_hex:eu(),value:ri,sequences:ew(ef())}),rs=ek({definition:rn,value:ej([ri,eh()]),observations:ew(ra)}),ro=ej([eA("layout"),eA("name_only"),eA("unknown")]),rl=ek({class_id:ef(),name:ej([eu(),eh()]),entities:ef(),records:ef(),support:ro}),rd=ek({code:eu(),message:eu(),offset:ef(),mask:ef()}),rc=ek({class_id:ef(),entity_id:ef(),name:ej([eu(),eh()]),support:ro,reference:ej([rr,eh()]),sequences:ew(ef()),attributes:ew(rs),diagnostics:ew(rd)}),rp=eA("ready"),ru=ek({class_id:ef(),entity_id:ef(),sequence:ef(),attribute_mask:ef(),raw_hex:eu(),consumed:ef(),remaining_hex:eu(),undecoded_mask:ef()}),r_=ek({raw_hex:eu(),filter_outer_priority:ef(),filter_outer_vid:ef(),filter_outer_tpid_dei:ef(),filter_inner_priority:ef(),filter_inner_vid:ef(),filter_inner_tpid_dei:ef(),filter_ethertype:ef(),tags_to_remove:ef(),treatment_outer_priority:ef(),treatment_outer_vid:ef(),treatment_outer_tpid_dei:ef(),treatment_inner_priority:ef(),treatment_inner_vid:ef(),treatment_inner_tpid_dei:ef(),delete_entry:eb()}),rf=ek({class_id:ef(),entity_id:ef(),attribute:rn,collected:eb(),error:ej([eu(),eh()]),raw_hex:eu(),rows:ew(eu()),vlan_rules:ew(r_)}),rg=ek({schema_version:eA(1),reference_version:eu(),onu_id:ej([ef(),eh()]),uploaded_complete:eb(),expected_records:ef(),received_records:ef(),decoded_records:ef(),partial_records:ef(),basic_records:ef(),tables_requested:eb(),tables_collected:eb(),classes:ew(rl),entities:ew(rc),records:ew(ru),tables:ew(rf),diagnostics:ew(rd)}),rb=ek({status:rp,report:rg});ek({onu_id:ef(),optical_sn:eu(),tables:eb()});let rm=ej([ek({status:eA("success"),enabled:eb()}),ek({status:eA("error"),error:eu()})]);ek({enabled:eb(),bridge:eu(),wan_upstream:eb(),wan_downstream:eb(),onu_bridge:eb()});let rh=ek({index:eu(),state:eu(),pkt_type:eu(),orig_tuple:eu(),new_tuple:eu(),eth:eu(),vlan:eu(),packets:ef(),bytes:ef(),counters_valid:eb(),packets_exact:eu(),bytes_exact:eu()}),ry=ek({sampled_at_ms:ef(),errors:ew(eu()),config_valid:eb(),engine_valid:eb(),mask_valid:eb(),routed_mask_valid:eb(),debug_valid:eb(),flows_valid:eb(),entries_valid:eb(),counters_valid:eb(),hooks_valid:eb(),total_packets_exact:eu(),total_bytes_exact:eu(),supported:eb(),engine_attached:eb(),bridge_offload_enabled:eb(),wan_upstream:eb(),wan_downstream:eb(),onu_bridge:eb(),bridge_offload_mask:ef(),routed_offload_mask:ef(),bridge_offload_debug:eb(),bridge:eu(),active_ports:ew(eu()),fw4_hooks_ready:eb(),total_entries:ef(),bound_entries:ef(),bound_ipv4_entries:ef(),bound_ipv6_entries:ef(),total_packets:ef(),total_bytes:ef(),bound_flows:ew(rh)}),rv=ek({equipment_id:ej([eu(),eh()]),hardware_version:ej([eu(),eh()]),software_images:ew(eu()),omcc_version:ej([ef(),eh()]),errors:ew(eu())}),rw=ek({desired:eM(eu(),ef()),active:eM(eu(),ef()),pending_restart:eb(),allocation_blocked:eb(),startup_error:ej([eu(),eh()]),config_error:ej([eu(),eh()])}),rx=ej([eA("optical_on"),eA("optical_off"),eA("optical_status"),eA("optical_reload"),eA("optical_reinitialize"),eA("optical_shutdown")]),rk=ek({enabled:eb(),downstream_tx_enabled:eb(),fec_enabled:eb()}),rz=ek({desired_tx_enabled:eb(),desired_fec_enabled:eb(),register:ej([ef(),eh()]),tx_enabled:ej([eb(),eh()]),fec_enabled:ej([eb(),eh()]),error:ej([eu(),eh()])}),rj=ej([eA("success"),eA("error")]),rS=ej([eA("enabled"),eA("disabled"),eA("unknown")]),rC=ek({settings:eE(rk),pon_mac:eE(rz),schema_version:eA(1),status:rj,action:rx,desired_enabled:ej([eb(),eh()]),tx_enabled:ej([eb(),eh()]),actor_state:rS,hardware_ready:eb(),discovery_active:eb(),cleanup_pending:eb(),error:ej([tZ,eh()])}),r$=ek({calibration_sha256:eE(eu()),calibration_applied:eb(),model:eu(),wavelength_tx_nm:ef(),wavelength_rx_nm:ef(),phy_rate_downlink_gbps:ef(),phy_rate_uplink_gbps:ef(),tx_power_dbm:ej([ef(),eh()]),laser_bias_current_ma:ej([ef(),eh()]),temperature_celsius:ej([ef(),eh()]),vcc_voltage:ej([ef(),eh()]),cdr_locked:ej([eb(),eh()]),tx_enabled:eE(eb()),measurements:eM(eu(),tE)}),rM=eA("ux3326"),rP=eA("selected"),rA=ek({onu_id:ef(),interface:ej([eu(),eh()])}),rO=ek({optical_control:eb(),transceiver_telemetry:eb(),fpga_diagnostics:eb(),bosa_diagnostics:eb(),calibration_profile:ej([rM,eh()]),npu_offload:eb(),omci_mib:eb(),downstream_fec:eb()}),rE=ek({schema_version:eA(1),selection:rP,platform_id:eu(),vendor:eu(),model:eu(),onus:ew(rA),operations:rO}),rN=ej([eA("o1_initial"),eA("o2_standby"),eA("o3_serial_number"),eA("o4_ranging"),eA("o5_operation"),eA("o6_intermittent_lods"),eA("o7_emergency_stop")]),rR=ek({restarting:eA(!0)}),rI=ek({calls:ef(),failures:ef(),last_us:ef(),max_us:ef(),total_us:ef()}),rT=ek({port:ef(),interface:eu(),carrier:eb(),status:eu(),onu_id:eE(ef()),onu_sn:eE(eu()),link_state:eu(),reserved_sn:eE(eu())}),rD=ek({channel_2g:ej([ef(),eh()]),channel_5g:ej([ef(),eh()]),bandwidth_5g:ej([eu(),eh()]),tx_power_pct:ej([ef(),eh()]),measurements:eM(eu(),tE)}),rL=ek({onu_id:ef(),vendor:eu(),model:eu(),serial_number:eu(),state:rN,business_status:eU,management:ej([tn,eh()]),provisioning:ej([th,eh()]),services:ew(to),ssids:ew(to),wifi_sync:ty,identity:ej([rv,eh()]),identity_age_seconds:ej([ef(),eh()]),identity_current:eb(),fiber_distance_m:ej([ef(),eh()]),ranging_delay_rtd_ns:ej([ef(),eh()]),equalization_delay_bits:ej([ef(),eh()]),optical_rx_power_dbm:ej([ef(),eh()]),optical_tx_power_dbm:ej([ef(),eh()]),firmware_version:eu(),hardware_version:eu(),uptime_seconds:ej([ef(),eh()]),fec:eE(tI),data_path:tN,wifi_mesh:rD,connected_clients:ej([ew(re),eh()]),measurements:eM(eu(),tE)}),rq=ek({id:eu(),last_seen_sec_ago:ef(),last_payload_bytes:ef()}),rW=ek({ubus:eE(eM(eu(),rI)),jobs:eE(t9),onu_pinning:eE(rw),fpga_status:eu(),pon_mac:eE(rz),provisioning:ej([tC,eh()]),optical_transceiver:r$,switch_ports:ew(rT),sub_gateways:ew(rL),telemetry_gateways:ew(rq),npu:eE(ry),ipc:eE(t2)}),rB=ej([eA("plan"),eA("apply"),eA("management_plan"),eA("management_apply"),eA("reset_state"),eA("reconcile"),eA("retry")]),rZ=ej([ek({operation_ids:ew(ef()),revision:eu()}),ek({started:eA(!0),mode:tl}),ek({reset:eA(!0),device:eu()}),ek({operation_ids:ew(ef()),mode:tl,reconcile:eE(eb()),retry:eE(eb())}),eY]);ek({action:rB,target:eu(),management:eE(eb()),item:eE(eu())});let rU=ej([eA("none"),eA("effective"),eA("pending_add"),eA("pending_change"),eA("pending_remove")]),rV=ek({active_onu_id:ej([ef(),eh()]),desired_onu_id:ej([ef(),eh()]),state:rU,pending_restart:eb()}),rF=ej([eA("pon_logical"),eA("associated_with"),eA("learned_behind")]),rJ=ek({id:eu(),mac:eu(),hostname:ej([eu(),eh()]),addresses:ew(eu()),relation:rF,source:eu(),interface:ej([eu(),eh()])}),rK=ej([eA("ok"),eA("partial"),eA("unavailable")]),rQ=ek({id:eu(),state:rK,sampled_at:ef(),reason:ej([eu(),eh()])}),rG=ej([eA("snapshot_expired"),eA("node_not_found"),eA("invalid_cursor")]),rH=ej([ek({status:eA("ok"),snapshot_id:eu(),parent_node_id:eu(),clients:ew(rJ),associated_client_count:ej([ef(),eh()]),learned_host_count:ej([ef(),eh()]),complete:eb(),next_cursor:ej([eu(),eh()]),sources:ew(rQ)}),ek({status:eA("error"),code:rG})]);ek({node_id:eu(),snapshot_id:eE(eu()),cursor:eE(eu()),limit:eE(ef())});let rX=ek({model:eu(),wavelength_tx_nm:ef(),wavelength_rx_nm:ef(),nominal_downlink_gbps:ef(),nominal_uplink_gbps:ef(),tx_power_dbm:ej([ef(),eh()]),laser_bias_current_ma:ej([ef(),eh()]),temperature_celsius:ej([ef(),eh()]),vcc_voltage:ej([ef(),eh()]),tx_enabled:ej([eb(),eh()]),measurements:eM(eu(),tE)}),rY=ek({name:eu(),mac:ej([eu(),eh()]),carrier:ej([eb(),eh()]),speed_mbps:ej([ef(),eh()]),duplex:ej([eu(),eh()]),bridge_members:ew(eu()),addresses:ew(eu())}),r0=ek({interface:eu(),device:ej([eu(),eh()]),protocol:ej([eu(),eh()]),up:eb(),addresses:ew(eu())}),r1=ek({model:ej([eu(),eh()]),firmware_version:ej([eu(),eh()]),uptime_seconds:ej([ef(),eh()]),fpga_status:eu(),optical:rX,interfaces:ew(rY),uplinks:ew(r0)}),r2=ek({observer_node_id:eu(),rx_bytes:ej([ef(),eh()]),tx_bytes:ej([ef(),eh()]),current_rx_kbps:ej([ef(),eh()]),current_tx_kbps:ej([ef(),eh()]),onu_inventory:ej([tO,eh()]),offload:t$,measurements:eM(eu(),tE)}),r5=ek({report_revision:ef(),binding_generation:eu(),age_seconds:ef(),ip:ej([eu(),eh()]),bridge_ip:ej([eu(),eh()]),mac:ej([eu(),eh()]),connection_type_raw:ej([eu(),eh()]),uptime_seconds:ej([ef(),eh()]),cpu_usage_raw:ej([ef(),eh()]),memory_usage_raw:ej([ef(),eh()])}),r8=ek({hl202:ej([r5,eh()])}),r4=ek({code:eu(),node_id:ej([eu(),eh()])}),r3=ek({id:eu(),source:eu(),target:eu(),relation:rF,data_interface:ej([eu(),eh()]),carrier:ej([eb(),eh()]),onu_rx_power_dbm:ej([ef(),eh()]),onu_tx_power_dbm:ej([ef(),eh()]),equalization_delay_bits:ej([ef(),eh()]),data_path:ej([r2,eh()]),measurements:eM(eu(),tE)}),r6=ek({serial_number:ej([eu(),eh()]),onu_id:ej([ef(),eh()]),vendor:ej([eu(),eh()]),model:ej([eu(),eh()]),hardware_version:ej([eu(),eh()]),firmware_version:ej([eu(),eh()]),registration:ej([rN,eh()]),business:ej([eU,eh()]),management:ej([tn,eh()]),provisioning:ej([th,eh()]),services:ew(to),ssids:ew(to),wifi_sync:ej([ty,eh()]),identity:ej([rv,eh()]),identity_current:eb(),identity_age_seconds:ej([ef(),eh()]),uptime_seconds:ej([ef(),eh()]),fec:ej([tI,eh()]),binding:rV,extensions:r8,measurements:eM(eu(),tE)}),r7=ej([eC(ek({kind:eA("controller")}),r1),eC(ek({kind:eA("onu")}),r6)]),r9=ek({id:eu(),label:eu(),detail:r7}),ne=ej([ek({status:eA("ok"),snapshot_id:eu(),node:r9}),ek({status:eA("error"),code:rG})]);ek({node_id:eu(),snapshot_id:eE(eu())});let nt=ek({schema_version:eA(1),snapshot_id:eu(),generated_at:ef(),snapshot_ttl_seconds:ef(),nodes:ew(r9),links:ew(r3),sources:ew(rQ),issues:ew(r4)}),nr=ek({error:ej([eu(),ek({code:eu(),message:eu()})])});class nn extends Error{code;constructor(e,t){super(t),this.code=e,this.name="RpcError"}}function ni(e){let t=nr.safeParse(e);if(t.success){let e=t.data.error;throw"string"==typeof e?new nn("rpc",e):new nn(e.code,e.message)}return e}let na={parse(e){let t=rZ.parse(ni(e));if("error"in t)throw Error(t.error);return t}},ns={parse(e){let t=tG.parse(ni(e));if("object"==typeof t&&null!==t&&"error"in t)throw ni(t),Error("Unexpected RPC error");return t}},no={getCapabilities:{parse:e=>e8.parse(ni(e))},getPlatformInfo:{parse:e=>rE.parse(ni(e))},opticalStatus:rC,opticalSet:rC,getStatus:{parse:e=>rW.parse(ni(e))},getTopology:{parse:e=>nt.parse(ni(e))},getTopologyNode:{parse:e=>ne.parse(ni(e))},getTopologyClients:{parse:e=>rH.parse(ni(e))},getSync:{parse:e=>tC.parse(ni(e))},configCheck:{parse(e){if("object"==typeof e&&null!==e&&"error"in e&&("valid"in e||"revision"in e||"devices"in e))throw Error("Mixed configuration check result");return e4.parse(e)}},npuStatus:ry,configReload:{parse:e=>tC.parse(ni(e))},restartService:{parse:e=>rR.parse(ni(e))},sync:{parse:e=>na.parse(ni(e))},npuSet:rm,mibStart:{parse:e=>t6.parse(ni(e))},mibResult:{parse:e=>t3.parse(ni(e))},jobRelease:{parse:e=>t7.parse(ni(e))},hl202List:{parse:e=>ns.parse(ni(e))},hl202Report:{parse:e=>t6.parse(ni(e))},hl202AccountsStart:{parse:e=>t6.parse(ni(e))},hl202AccountUpdate:{parse:e=>t6.parse(ni(e))},hl202ExecStart:{parse:e=>t6.parse(ni(e))},jobResult:{parse:e=>t3.parse(ni(e))},getCalibration:{parse:e=>eX.parse(ni(e))},selectCalibration:{parse:e=>eX.parse(ni(e))},saveCalibration:{parse:e=>e0.parse(ni(e))},applyCalibration:{parse:e=>t6.parse(ni(e))}};function nl(){var e;let t,r,i,a,s,o,l,d,c,p,u,f,g,b,m,h,y,v,w,x,k,z,j,S,C,$,M,P;return n??=(e=L.rpc,t=e.declare({object:"fttr",method:"get_capabilities",reject:!0}),r=e.declare({object:"fttr",method:"get_platform_info",reject:!0}),i=e.declare({object:"fttr",method:"optical_status",reject:!0}),a=e.declare({object:"fttr",method:"optical_set",params:["enabled","downstream_tx_enabled","fec_enabled"],reject:!0}),s=e.declare({object:"fttr",method:"get_status",reject:!0}),o=e.declare({object:"fttr",method:"get_topology",reject:!0}),l=e.declare({object:"fttr",method:"get_topology_node",params:["node_id","snapshot_id"],reject:!0}),d=e.declare({object:"fttr",method:"get_topology_clients",params:["node_id","snapshot_id","cursor","limit"],reject:!0}),c=e.declare({object:"fttr",method:"get_sync",reject:!0}),p=e.declare({object:"fttr",method:"config_check",reject:!0}),u=e.declare({object:"fttr",method:"npu_status",reject:!0}),f=e.declare({object:"fttr",method:"config_reload",reject:!0}),g=e.declare({object:"fttr",method:"restart_service",reject:!0}),b=e.declare({object:"fttr",method:"sync",params:["action","target","management","item"],reject:!0}),m=e.declare({object:"fttr",method:"npu_set",params:["enabled","bridge","wan_upstream","wan_downstream","onu_bridge"],reject:!0}),h=e.declare({object:"fttr",method:"mib_start",params:["onu_id","optical_sn","tables"],reject:!0}),y=e.declare({object:"fttr",method:"mib_result",params:["job","chunk"],reject:!0}),v=e.declare({object:"fttr",method:"job_release",params:["job"],reject:!0}),w=e.declare({object:"fttr",method:"hl202_list",reject:!0}),x=e.declare({object:"fttr",method:"hl202_report",params:["target"],reject:!0}),k=e.declare({object:"fttr",method:"hl202_accounts_start",params:["target"],reject:!0}),z=e.declare({object:"fttr",method:"hl202_account_update",params:["target","kind","entry","password","active"],reject:!0}),j=e.declare({object:"fttr",method:"hl202_exec_start",params:["target","script","timeout_seconds"],reject:!0}),S=e.declare({object:"fttr",method:"job_result",params:["job","chunk"],reject:!0}),C=e.declare({object:"fttr",method:"get_calibration",reject:!0}),$=e.declare({object:"fttr",method:"select_calibration",params:["source"],reject:!0}),M=e.declare({object:"fttr",method:"save_calibration",params:["data"],reject:!0}),P=e.declare({object:"fttr",method:"apply_calibration",reject:!0}),{getCapabilities:async()=>no.getCapabilities.parse(await t()),getPlatformInfo:async()=>no.getPlatformInfo.parse(await r()),opticalStatus:async()=>no.opticalStatus.parse(await i()),opticalSet:async e=>no.opticalSet.parse(await a(e.enabled,e.downstream_tx_enabled,e.fec_enabled)),getStatus:async()=>no.getStatus.parse(await s()),getTopology:async()=>no.getTopology.parse(await o()),getTopologyNode:async e=>no.getTopologyNode.parse(await l(e.node_id,e.snapshot_id)),getTopologyClients:async e=>no.getTopologyClients.parse(await d(e.node_id,e.snapshot_id,e.cursor,e.limit)),getSync:async()=>no.getSync.parse(await c()),configCheck:async()=>no.configCheck.parse(await p()),npuStatus:async()=>no.npuStatus.parse(await u()),configReload:async()=>no.configReload.parse(await f()),restartService:async()=>no.restartService.parse(await g()),sync:async e=>no.sync.parse(await b(e.action,e.target,e.management,e.item)),npuSet:async e=>no.npuSet.parse(await m(e.enabled,e.bridge,e.wan_upstream,e.wan_downstream,e.onu_bridge)),mibStart:async e=>no.mibStart.parse(await h(e.onu_id,e.optical_sn,e.tables)),mibResult:async e=>no.mibResult.parse(await y(e.job,e.chunk)),jobRelease:async e=>no.jobRelease.parse(await v(e.job)),hl202List:async()=>no.hl202List.parse(await w()),hl202Report:async e=>no.hl202Report.parse(await x(e.target)),hl202AccountsStart:async e=>no.hl202AccountsStart.parse(await k(e.target)),hl202AccountUpdate:async e=>no.hl202AccountUpdate.parse(await z(e.target,e.kind,e.entry,e.password,e.active)),hl202ExecStart:async e=>no.hl202ExecStart.parse(await j(e.target,e.script,e.timeout_seconds)),jobResult:async e=>no.jobResult.parse(await S(e.job,e.chunk)),getCalibration:async()=>no.getCalibration.parse(await C()),selectCalibration:async e=>no.selectCalibration.parse(await $(e.source)),saveCalibration:async e=>no.saveCalibration.parse(await M(e.data)),applyCalibration:async()=>no.applyCalibration.parse(await P())})}eM(eu(),ek({carrier:eE(eb()),mac:eE(eu()),link:eE(ek({speed:eE(ef()),duplex:eE(eu()),autoneg:eE(eb())})),stats:eE(eM(eu(),ef()))}));let nd=async()=>nl().getStatus(),nc=async()=>nl().getSync(),np=async()=>nl().configCheck(),nu=async(e,t)=>nl().sync({action:e,target:t}),n_=async(e,t,r)=>nl().mibStart({onu_id:e,optical_sn:t,tables:r}),nf=async(e,t)=>nl().mibResult({job:e,chunk:t}),ng=async e=>nl().jobRelease({job:e});function nb(e){let t="none"===e.tone?"":`fttr-badge fttr-badge-${e.tone}`,r=e.class?` ${e.class}`:"",n=d("span",{class:`${t}${r}`.trim(),children:e.children});return e.title&&n.setAttribute("title",e.title),n}let nm={o1_initial:_("O1 Initial"),o2_standby:_("O2 Standby"),o3_serial_number:_("O3 Serial Number"),o4_ranging:_("O4 Ranging"),o5_operation:_("O5 (Operation)"),o6_intermittent_lods:_("O6 Intermittent LODS"),o7_emergency_stop:_("O7 Emergency Stop")};function nh(e){var t;let r=(t=e.state)?"o5_operation"===t?{tone:"success",label:nm.o5_operation,title:t}:{tone:"warning",label:nm[t]??p(t),title:t}:{tone:"none",label:"—"};return d(nb,{tone:r.tone,title:r.title,children:r.label})}function ny(e){var t;let r=(t=e.status)?{tone:"verified"===t.phase?"success":t.error||"wan_bootstrap_pending"===t.phase?"warning":"neutral",label:`${({not_started:_("Not started"),collecting_identity:_("Collecting identity"),retrying_identity:_("Retrying identity"),unsupported:_("Unsupported"),configuring:_("Configuring"),verifying:_("Verifying"),wan_bootstrap_pending:_("WAN pending"),verified:_("Verified"),retrying:_("Retrying"),offline:_("Offline")})[t.phase]} \xb7 ${t.generation}${t.error?` \xb7 ${t.error}`:""}`,title:t.error||void 0}:{tone:"neutral",label:"—"};return d(nb,{tone:r.tone,title:r.title,children:r.label})}let nv={online:_("Online"),waiting_inform:_("Waiting Inform"),offline_or_stale:_("Offline or stale")};function nw(e){var t;let r,n,i,a,s,o,l=(t=e.management,r=t?.state,n=g(t?.age_seconds??(t?.last_inform?Math.max(0,Math.floor(Date.now()/1e3)-t.last_inform):null)),a=(i=t?.last_inform?new Date(1e3*t.last_inform).toLocaleString():null)?_("Last Inform: %s").format(i):void 0,s="—",o="none","online"===r?(o="success",s=nv.online):"waiting_inform"===r?(o="warning",s=nv.waiting_inform):"offline_or_stale"===r?(o="danger",s=nv.offline_or_stale):r&&(o="neutral",s=p(r)),{tone:o,label:n&&r?`${s} \xb7 ${n}`:s,title:a});return d(nb,{tone:l.tone,title:l.title,children:l.label})}let nx={disabled:_("Disabled"),waiting:_("Waiting"),wan_reconciling:_("WAN reconciling"),wan_verifying:_("WAN verifying"),wifi_reconciling:_("Wi-Fi reconciling"),discovering:_("Discovering"),reading:_("Reading"),disabling:_("Disabling"),disabling_read:_("Disabling read"),writing:_("Writing"),verifying:_("Verifying"),settling:_("Settling"),completed:_("Completed"),interrupted:_("Interrupted"),recovering:_("Recovering"),waiting_management:_("Waiting management"),waiting_task:_("Waiting task"),reset_pending:_("Reset pending"),failed:_("Failed"),error:_("Error"),blocked:_("Blocked"),not_started:_("Not started")};function nk(e){var t,r;let n,i,a,s=(t=e.provisioning,r=e.title,n=t?.state,i=t?.next_retry_at&&t.next_retry_at>Math.floor(Date.now()/1e3)?t.next_retry_at-Math.floor(Date.now()/1e3):0,a=r??(t?.current_revision===!1?_("Previous configuration"):t?.management_fresh===!1?_("Management stale"):t?.reconcile_reason?t.reconcile_reason:i>0?_("Next self-healing retry in %d seconds").format(i):t?.reason??t?.error),n&&"not_started"!==n?"disabled"===n?{tone:"neutral",label:nx.disabled}:"completed"===n||"verified"===n?{tone:"success",label:"completed"===n?nx.completed:_("Ready"),title:a}:"wan_reconciling"===n||"wan_verifying"===n||"wifi_reconciling"===n||"discovering"===n||"reading"===n||"disabling"===n||"disabling_read"===n||"writing"===n||"verifying"===n||"settling"===n||"recovering"===n||"waiting_task"===n?{tone:"info",label:nx[n]??p(n),title:a}:"interrupted"===n||"failed"===n||"error"===n||"blocked"===n?{tone:"danger",label:"blocked"===n?nx.blocked:nx.interrupted,title:a}:"waiting"===n||"pending"===n||"waiting_management"===n||"reset_pending"===n?{tone:"warning",label:nx[n]??nx.waiting,title:a}:{tone:"neutral",label:p(n),title:a}:{tone:"neutral",label:nx.not_started,title:a});return d(nb,{tone:s.tone,title:s.title,children:s.label})}let nz={disabled:_("Disabled"),not_configured:_("Not configured"),stale_revision:_("Stale revision"),stale_management:_("Stale management"),verified:_("Verified"),attention_required:_("Attention required"),accepted_unverified:_("Unverified"),pending:_("Pending"),recovering:_("Recovering"),waiting_management:_("Waiting management")};function nj(e){var t;let r=(t=e.state)&&"not_configured"!==t?"disabled"===t?{tone:"neutral",label:nz.disabled}:"verified"===t?{tone:"success",label:nz.verified}:"attention_required"===t?{tone:"danger",label:nz.attention_required}:"stale_revision"===t||"stale_management"===t||"waiting_management"===t?{tone:"warning",label:nz[t]}:"recovering"===t?{tone:"info",label:nz.recovering}:"accepted_unverified"===t||"pending"===t?{tone:"warning",label:nz[t]}:{tone:"neutral",label:p(t)}:{tone:"neutral",label:nz.not_configured};return d(nb,{tone:r.tone,title:r.title,children:r.label})}let nS=`
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
`,nC=e=>JSON.stringify(e,null,2);async function n$(e){let t=["{"],r=!0;for(let[n,i]of Object.entries(e))if(r||t.push(","),r=!1,t.push(JSON.stringify(n),":"),Array.isArray(i)){t.push("[");for(let e=0;e<i.length;e++){e&&t.push(",");let r=JSON.stringify(i[e]);if(void 0===r)throw Error(_("MIB snapshot cannot be serialized"));t.push(r),e%32==31&&await new Promise(e=>setTimeout(e,0))}t.push("]")}else{let e=JSON.stringify(i);if(void 0===e)throw Error(_("MIB snapshot cannot be serialized"));t.push(e)}return t.push("}"),new Blob(t,{type:"application/json"})}function nM(e){let t=e.reference;return t?.url.startsWith("https://github.com/opencord/omci-lib-go/blob/v2.2.4/")?d("a",{href:t.url,target:"_blank",rel:"noopener noreferrer",children:t.id}):d("span",{children:"—"})}let nP="details",nA=(e,t)=>t.getAttribute("data-state-key")??t.getAttribute("data-device")??t.querySelector("summary")?.textContent??nO(e,t)?.join(".")??"";function nO(e,t){let r=[],n=t;for(;n&&n!==e;){let e=n.parentElement;if(!e)return null;let t=Array.prototype.indexOf.call(e.children,n);if(t<0)return null;r.unshift(t),n=e}return n===e?r:null}let nE=async()=>nl().getCapabilities();async function nN(e){if(!(await nE()).pages[e])throw Error(_("This page is not supported by the installed FTTR build."))}let nR={ready:{label:_("Ready"),type:"success"},verified:{label:_("Verified"),type:"success"},online:{label:_("Online"),type:"success"},completed:{label:_("Completed"),type:"success"},applied:{label:_("Applied"),type:"success"},waiting_inform:{label:_("Waiting Inform"),type:"warning"},waiting_transport:{label:_("Waiting transport"),type:"warning"},waiting_identity:{label:_("Waiting identity"),type:"warning"},offline_or_stale:{label:_("Offline or stale"),type:"warning"},manual_required:{label:_("Manual setup required"),type:"warning"},not_configured:{label:_("Not configured"),type:"warning"},not_required:{label:_("Not required"),type:"neutral"},waiting_acs:{label:_("Waiting ACS listener"),type:"warning"},reading:{label:_("Reading settings"),type:"info"},configuring:{label:_("Configuring settings"),type:"info"},verifying:{label:_("Verifying settings"),type:"info"},retry_wait:{label:_("Waiting to retry"),type:"warning"},discovering_management_wan:{label:_("Discovering management WAN"),type:"info"},configuring_management_wan:{label:_("Configuring management WAN"),type:"info"},verifying_management_wan:{label:_("Verifying management WAN"),type:"info"},pending:{label:_("Pending"),type:"warning"},awaiting_apply:{label:_("Awaiting Apply"),type:"warning"},syncing:{label:_("Syncing"),type:"info"},discovering:{label:_("Discovering"),type:"info"},recovering:{label:_("Recovering"),type:"info"},waiting_management:{label:_("Waiting Management"),type:"warning"},waiting_task:{label:_("Waiting Task"),type:"info"},reconcile_required:{label:_("Reconcile Required"),type:"warning"},not_started:{label:_("Not Started"),type:"neutral"},disabled:{label:_("Disabled"),type:"neutral"},enabled:{label:_("Enabled"),type:"success"},interrupted:{label:_("Interrupted"),type:"danger"},failed:{label:_("Failed"),type:"danger"},stale:{label:_("Stale"),type:"warning"},error:{label:_("Error"),type:"danger"},deleted:{label:_("Deleted"),type:"neutral"}};function nI(e,t){if(!e)return d("span",{class:"fttr-badge fttr-badge-neutral",children:"—"});let r=nR[e],n=r?.label||p(e),i=r?.type||"neutral";return d("span",{class:`fttr-badge fttr-badge-${i}`,title:t||e,children:n})}function nT(e){var t,r,n,i,a,s;return s={class:"table-wrapper",children:(a={class:"table",children:[(r={children:(t={children:[d("th",{children:_("Configuration item")}),d("th",{children:_("Type")}),d("th",{children:_("State")}),d("th",{children:_("Evidence freshness")}),d("th",{children:_("Last update / task")}),d("th",{children:_("Reason / desired changes")})]},d("tr",t))},d("thead",r)),(i={children:e.length?e.map(e=>{var t,r,n,i,a,s,o,l,c,f;return f={children:[(n={children:d("strong",{children:p(e.name||e.id)})},d("td",n)),(i={children:d("span",{class:"fttr-badge fttr-badge-info",style:"font-size:80%",children:function(e,t){switch(e){case"wifi":return"Wi-Fi";case"wan":return"WAN";case"internet":return"Internet";case"iptv":return"IPTV";case"tr069":return"TR-069";default:return"port_binding"===t?_("Binding"):p(e||t)}}(e.service_type??"",e.kind)})},d("td",i)),d("td",{children:nI(e.state)}),(s={children:(t=e.current_revision,r=e.management_fresh,a={style:"display:flex;flex-direction:column;gap:3px;align-items:flex-start",children:[!0===t?d("span",{class:"fttr-badge fttr-badge-info",style:"font-size:78%",children:_("Current configuration")}):!1===t?d("span",{class:"fttr-badge fttr-badge-neutral",style:"font-size:78%",children:_("Previous configuration")}):d("span",{children:"—"}),!0===r?d("span",{class:"fttr-badge fttr-badge-success",style:"font-size:78%",children:_("Management fresh")}):!1===r?d("span",{class:"fttr-badge fttr-badge-warning",style:"font-size:78%",children:_("Management stale")}):null]},d("div",a))},d("td",s)),(o={children:[d("div",{children:u(e.updated_at)}),void 0!==e.task_id&&null!==e.task_id?d("span",{class:"fttr-badge fttr-badge-neutral",style:"font-size:75%;margin-top:2px",children:[_("Task")," #",e.task_id]}):null]},d("td",o)),(c={children:[e.reason?d("div",{style:"margin-bottom:3px;color:#555;overflow-wrap:anywhere",children:e.reason}):null,(e.changes??[]).length?(l={style:"font-size:85%",children:(e.changes??[]).map(e=>{var t;return t={style:"overflow-wrap:anywhere;margin-top:2px",children:[d("code",{children:e.name})," = ",d("code",{children:e.desired})]},d("div",t)})},d("div",l)):!e.reason&&"—"]},d("td",c))]},d("tr",f)}):(n={children:d("td",{colSpan:6,style:"text-align:center;color:#888;padding:1em",children:_("No desired items configured.")})},d("tr",n))},d("tbody",i))]},d("table",a))},d("div",s)}let main=L.view.extend({load:async()=>(await nN("sync"),Promise.all([nc(),np()])),render(e){var t,r,n,i,a,s;let[o,b]=e,m=d("div",{}),h=d("p",{class:"alert-message warning",hidden:!0,"aria-live":"polite"}),y=d("div",{class:"fttr-sync-result","aria-live":"polite",style:"margin:10px 0"}),v=(t={class:"cbi-input-select",children:[d("option",{value:"all",children:_("All devices")}),(o.devices??[]).filter(e=>"none"!==e.provisioning_adapter).map(e=>d("option",{value:e.device,children:e.name||e.device}))]},d("select",t)),w=d("div",{}),x=d("div",{}),k=o,z=b,j=!1,S=!1,C=[],$=async e=>{if(!j){j=!0,Z(k);try{var t;await nu("reset_state",e.device),y.replaceChildren((t={class:"alert-message info",children:_("Synchronization state reset for %s. Preview differences to read the current device state.").format(e.name||e.optical_sn)},d("div",t))),Z(await nc())}catch(e){y.replaceChildren(d("div",{class:"alert-message danger",children:String(e)}))}finally{j=!1,Z(k)}}},M=async e=>{if(!j){j=!0,Z(k);try{var t;let r=await nu("apply",e.device),n="operation_ids"in r?r.operation_ids.join(", "):"—";y.replaceChildren((t={class:"alert-message info",children:_("Configuration delivery started for %s. Operation IDs: %s").format(e.name||e.optical_sn,n||"—")},d("div",t))),Z(await nc())}catch(e){y.replaceChildren(d("div",{class:"alert-message danger",children:String(e)}))}finally{j=!1,Z(k)}}},P=async e=>{try{let t=(await nd()).sub_gateways.find(t=>t.serial_number===e.optical_sn);if(!t)throw Error(_("Device is offline or no longer registered; refresh status and retry."));!function(e){var t,r,n,i,a,s,o,u,g,b,m,h;let y=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"basic",v=!1,w=!1,x=null,k=null,z=(t={class:"onu-basic-container",children:[{title:_("Device identification"),rows:[[_("Vendor"),e.vendor],[_("Model"),e.identity?.equipment_id??e.model],[_("Optical serial"),d("code",{style:"font-size:90%",children:e.serial_number})],[_("ONU ID"),e.onu_id],[_("Hardware version"),e.identity?.hardware_version??e.hardware_version],[_("Software images"),e.identity?.software_images?.join(", ")??e.firmware_version],[_("OMCC version"),e.identity?.omcc_version==null?null:d("code",{style:"font-size:90%",children:["0x",e.identity.omcc_version.toString(16)]})]]},{title:_("Optical & link status"),rows:[[_("Registration"),d(nh,{state:e.state})],[_("Business"),d(ny,{status:e.business_status})],[_("Receive optical power"),f(e.optical_rx_power_dbm)],[_("Transmit optical power"),f(e.optical_tx_power_dbm)],[_("Equalization delay (EQD)"),null==e.equalization_delay_bits?"—":d("code",{style:"font-size:90%",children:[e.equalization_delay_bits," bits"]})],[_("Data interface"),e.data_path?.interface?d("code",{style:"font-size:90%",children:e.data_path.interface}):null],[_("Uptime"),null==e.uptime_seconds?null:`${function(e){if(null==e||!Number.isFinite(e)||e<0)return"—";let t=Math.floor(e),r=Math.floor(t/86400),n=Math.floor(t%86400/3600),i=Math.floor(t%3600/60),a=[];return r>0&&a.push(`${r}d`),(n>0||r>0)&&a.push(`${n}h`),(i>0||n>0||r>0)&&a.push(`${i}m`),a.push(`${t%60}s`),a.join(" ")}(e.uptime_seconds)} (${Math.floor(e.uptime_seconds)} s)`]]},{title:_("Management & cache"),rows:[[_("CWMP"),d(nw,{management:e.management})],[_("Last Inform"),e.management?.last_inform?`${new Date(1e3*e.management.last_inform).toLocaleString()}${null!=e.management.age_seconds?` (${e.management.age_seconds} s)`:""}`:null],[_("Provisioning"),d(nk,{provisioning:e.provisioning})],[_("Wi-Fi sync"),d(nj,{state:e.wifi_sync})],[_("Identity source"),e.identity?!1===e.identity_current?_("Cached identity"):!0===e.identity_current?_("Current registration"):_("Registration freshness unavailable"):_("Not collected")],[_("Identity age"),null==e.identity_age_seconds?null:`${e.identity_age_seconds} s`],[_("Identity read errors"),e.identity?.errors?.join("; ")]]}].map(e=>{var t,r,n;return n={class:"cbi-section onu-basic-section",children:[d("h3",{class:"onu-basic-title",children:e.title}),(r={class:"table onu-basic-table",children:(t={children:e.rows.map(e=>{var t;let[r,n]=e;return t={children:[d("th",{style:"width:35%",children:r}),d("td",{children:n instanceof Node?n:p(n)})]},d("tr",t)})},d("tbody",t))},d("table",r))]},d("div",n)})},d("div",t)),j=(r={class:"mib-status-bar",role:"status",children:d("span",{class:"mib-hint-text",children:_("Read MIB on demand. Results are a snapshot, not live polling.")})},d("div",r)),S=(n={class:"cbi-progressbar",style:"display:none;width:100%",title:"0%",children:d("div",{style:"width:0%"})},d("div",n)),C=d("div",{}),$=d("pre",{class:"onu-raw-pre"}),M=d("span",{class:"download-status",role:"status"}),P=null,A=d("button",{type:"button",class:"cbi-button cbi-button-action",disabled:!0,onclick:async()=>{if(x&&!v){A.disabled=!0,M.textContent=_("Preparing JSON download…");try{let t=await n$(x);if(v)return;P&&URL.revokeObjectURL(P),P=URL.createObjectURL(t);let r=document.createElement("a");r.href=P,r.download=`mib-${e.serial_number}.json`,r.click(),M.textContent=_("JSON download started"),window.setTimeout(()=>{URL.revokeObjectURL(r.href),P===r.href&&(P=null)},1e3)}catch(e){M.textContent=String(e)}finally{A.disabled=!x||v}}},children:_("Download JSON")}),O=(a={class:"onu-raw-panel",children:[(i={class:"onu-raw-toolbar",children:[d("span",{class:"onu-raw-hint",children:_("This is a lightweight preview. Download JSON to save the complete MIB snapshot.")}),d("div",{class:"onu-raw-actions",children:[A,M]})]},d("div",i)),$]},d("div",a)),N=d("button",{type:"button",class:"cbi-button cbi-button-apply",onclick:()=>Z(!1),children:_("Read MIB")}),R=d("button",{type:"button",class:"cbi-button cbi-button-action",onclick:()=>Z(!0),children:_("Read MIB and VLAN tables")}),I=(u={class:"onu-mib-panel",children:[(o={class:"mib-controls",children:[(s={class:"mib-action-group",children:[N,R,d("small",{class:"mib-action-hint",children:_("Collecting VLAN tables queries extended filter tables and takes longer.")})]},d("div",s)),j,S]},d("div",o)),C]},d("div",u)),T={basic:z,mib:I,raw:O},D=new Map;function q(e){for(let[t,r]of Object.entries(T))t===e?r.style.removeProperty("display"):r.style.setProperty("display","none","important");for(let[t,r]of D)r.className=t===e?"cbi-tab":"cbi-tab-disabled"}let W=(h={children:[(g={class:"onu-details-header",children:function(e,t,r,n){var i;let a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"margin-top:14px;margin-bottom:0";return i={class:"cbi-tabmenu",style:a,children:e.map(e=>{var i;let a=(i={class:t===e.id?"cbi-tab":"cbi-tab-disabled","data-tab":e.id,children:d("a",{href:`#tab-${e.id}`,onclick:t=>{t.preventDefault(),r(e.id)},children:e.label})},d("li",i));return n.set(e.id,a),a})},d("ul",i)}([{id:"basic",label:_("Basic information")},{id:"mib",label:"OMCI / MIB"},{id:"raw",label:_("Raw JSON")}],y,q,D,"margin:0;padding-left:0;display:flex;flex-wrap:wrap")},d("div",g)),(b={class:"onu-details-dialog",children:[d("style",{children:`
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
				${nS}
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
				`}),z,I,O]},d("div",b)),(m={class:"right onu-details-footer",children:d("button",{type:"button",class:"cbi-button",onclick:()=>{v=!0,P&&URL.revokeObjectURL(P),P=null,x=null,$.textContent="",C.replaceChildren(),L.ui.hideModal()},children:_("Close")})},d("div",m))]},d(l,h)),B=()=>!v&&W.isConnected&&W.getClientRects().length>0;async function Z(t){if(!w){w=!0,N.disabled=R.disabled=!0,S.style.display="",S.title="0%",S.firstElementChild.style.width="0%",j.textContent=_("Reading MIB…");try{let v=await nd(),w=v.sub_gateways?.find(t=>t.serial_number===e.serial_number);if(w?.state!=="o5_operation")throw Error(_("Device is offline; reopen details after registration."));if(!B())return;let z=await n_(w.onu_id,w.serial_number,t);k=z.job;let M=Date.now()+14e4;for(;B();){if(c()){let e=Date.now();for(;c()&&B();)await new Promise(e=>setTimeout(e,1e3));if(M+=Date.now()-e,!B())return}let e=await nf(z.job,0);if(!B())return;if("ready"===e.status){var r,n,i,a,s,o,l,u,f,g,b,m,h,y;if(!e.chunks||e.chunks>1024||!e.bytes||e.bytes>0x2000000||0!==e.chunk||!e.data)throw Error(_("Invalid MIB snapshot"));let t=new Uint8Array(e.bytes),c=0;for(let r=0;r<e.chunks;r++){let n=0===r?e:await nf(z.job,r);if(!B())return;if("ready"!==n.status||n.chunk!==r||n.chunks!==e.chunks||n.bytes!==e.bytes||!n.data)throw Error(_("Invalid MIB snapshot chunk"));let i=atob(n.data);if(i.length>32768||c+i.length>t.length)throw Error(_("Invalid MIB snapshot size"));for(let e=0;e<i.length;e++)t[c++]=i.charCodeAt(e);let a=Math.min(100,Math.round((r+1)/e.chunks*100));S.title=`${a}%`,S.firstElementChild.style.width=`${a}%`,j.textContent=`${_("Downloading MIB snapshot")}: ${r+1}/${e.chunks}`}if(c!==t.length)throw Error(_("Incomplete MIB snapshot"));if(await U(),x=rb.parse(ni(JSON.parse(new TextDecoder("utf-8",{fatal:!0}).decode(t)))).report,1!==x.schema_version||x.onu_id!==w.onu_id)throw Error(_("Unexpected MIB response"));S.style.display="none",j.replaceChildren((r=x,b={class:"mib-chips",children:[(i={class:"mib-chip mib-chip-primary",children:["ONU ",r.onu_id]},d("span",i)),(a={class:`mib-chip ${r.uploaded_complete?"mib-chip-success":"mib-chip-warning"}`,children:r.uploaded_complete?_("Upload complete"):_("Upload incomplete")},d("span",a)),(s={class:"mib-chip mib-chip-info",children:[_("Records"),": ",r.received_records,r.expected_records!==r.received_records?` / ${r.expected_records}`:""]},d("span",s)),(o={class:"mib-chip",children:[_("Decoded"),": ",r.decoded_records]},d("span",o)),r.partial_records>0?(l={class:"mib-chip mib-chip-warning",children:[_("Partial"),": ",r.partial_records]},d("span",l)):null,(u={class:"mib-chip mib-chip-neutral",children:[_("Basic"),": ",r.basic_records]},d("span",u)),(f={class:"mib-chip",children:r.tables_collected?_("VLAN tables collected"):_("VLAN tables not collected")},d("span",f)),(g={class:"mib-chip mib-chip-subtle",children:new Date().toLocaleTimeString()},d("span",g))]},d("div",b))),C.replaceChildren(function(e){var t,r,n,i,a,s;let o,l=new Map;for(let t of e.records){let e=`${t.class_id}\0${t.entity_id}`,r=l.get(e);r?r.push(t):l.set(e,[t])}let c=e.classes.length?e.classes[0].class_id:null,u=(t={class:"mib-content"},d("div",t)),f=(r={type:"search",class:"cbi-input-text mib-search-input",placeholder:_("Search ME name or Class ID…")},d("input",r)),g=(n={class:"mib-class-list"},d("div",n)),b=new Map;function m(t){var r,n;for(let[e,r]of(c=t,b))e===t?r.classList.add("active"):r.classList.remove("active");let i=e.entities.filter(e=>e.class_id===t);i.length?u.replaceChildren(...i.map((r,n)=>{var i,a,s,o,c,u,f,g,b,m,h,y,v,w,x,k,z,j,S;return S={open:0===n,class:"mib-entity-details",children:[(c={class:"mib-entity-summary",children:[(s={class:"mib-entity-title",children:[(i={children:p(r.name)},d("strong",i)),(a={class:"mib-entity-id-tag",children:[_("Entity")," ",r.entity_id," (0x",r.entity_id.toString(16),")"]},d("span",a))]},d("span",s)),(o={class:"mib-entity-support",children:r.support},d("span",o))]},d("summary",c)),(j={class:"mib-entity-body",children:[r.attributes.length?(v={class:"table mib-attributes-table",children:[(h={children:(m={children:[(u={style:"width:28%",children:_("Attribute")},d("th",u)),(f={style:"width:14%",children:_("Type")},d("th",f)),(g={children:_("Value")},d("th",g)),(b={style:"width:18%",children:_("Definition")},d("th",b))]},d("tr",m))},d("thead",h)),(y={children:r.attributes.map(e=>{var t,r,n,i,a,s,o,l,c,u;return u={children:[(t={class:"mib-attr-name",children:e.definition.name},d("td",t)),(n={class:"mib-attr-kind",children:(r={children:e.definition.kind},d("code",r))},d("td",n)),(l={class:"mib-attr-value",children:[(i={class:"mib-val-display",children:function(e){if(null===e)return _("Conflicting values; inspect observations");switch(e.type){case"unsigned":case"signed":case"decimal":case"text":return p(e.value);case"octets":return p(e.hex);case"table_length":return p(e.bytes);default:throw new nn("unexpected_variant",`Unexpected variant: ${String(e)}`)}}(e.value)},d("span",i)),e.observations?.length?(o={class:"mib-obs-details",children:[(a={children:_("Raw data / observations")},d("summary",a)),(s={class:"mib-pre",children:nC(e.observations)},d("pre",s))]},d("details",o)):null]},d("td",l)),(c={class:"mib-attr-ref",children:nM(e.definition)},d("td",c))]},d("tr",u)})},d("tbody",y))]},d("table",v)):(w={children:_("Basic display only; raw records are preserved.")},d("p",w)),e.tables.filter(e=>e.class_id===t&&e.entity_id===r.entity_id).map(e=>{var t,r,n,i,a,s,o,l,c,u,f,g,b,m,h,y;return y={class:"mib-table-details",children:[(t={children:[e.attribute.name," ·"," ",e.collected?`${e.rows.length} ${_("rows")}`:p(e.error)]},d("summary",t)),e.vlan_rules.length?(b={class:"mib-table-overflow",children:(g={class:"table",children:[(u={children:(c={children:[(r={children:_("Outer filter (priority / VID / TPID-DEI)")},d("th",r)),(n={children:_("Inner filter (priority / VID / TPID-DEI)")},d("th",n)),(i={children:_("EtherType code")},d("th",i)),(a={children:_("Remove tags")},d("th",a)),(s={children:_("Outer treatment (priority / VID / TPID-DEI)")},d("th",s)),(o={children:_("Inner treatment (priority / VID / TPID-DEI)")},d("th",o)),(l={children:_("Delete entry")},d("th",l))]},d("tr",c))},d("thead",u)),(f={children:e.vlan_rules.map(e=>{var t,r,n,i,a,s,o,l;return l={children:[(t={children:`${e.filter_outer_priority} / ${e.filter_outer_vid} / ${e.filter_outer_tpid_dei}`},d("td",t)),(r={children:`${e.filter_inner_priority} / ${e.filter_inner_vid} / ${e.filter_inner_tpid_dei}`},d("td",r)),(n={children:p(e.filter_ethertype)},d("td",n)),(i={children:p(e.tags_to_remove)},d("td",i)),(a={children:`${e.treatment_outer_priority} / ${e.treatment_outer_vid} / ${e.treatment_outer_tpid_dei}`},d("td",a)),(s={children:`${e.treatment_inner_priority} / ${e.treatment_inner_vid} / ${e.treatment_inner_tpid_dei}`},d("td",s)),(o={children:p(e.delete_entry)},d("td",o))]},d("tr",l)})},d("tbody",f))]},d("table",g))},d("div",b)):null,(m={style:"margin-top:6px",children:[_("G.988 encoded field values"),": ",nM(e.attribute)]},d("p",m)),(h={class:"mib-pre",children:nC(e.vlan_rules.length?e.vlan_rules:e.rows)},d("pre",h))]},d("details",y)}),(z={class:"mib-diag-details",children:[(x={children:_("Records / diagnostics")},d("summary",x)),(k={class:"mib-pre",children:nC({diagnostics:r.diagnostics,records:l.get(`${t}\0${r.entity_id}`)??[]})},d("pre",k))]},d("details",z))]},d("div",j))]},d("details",S)})):u.replaceChildren((n={class:"mib-empty-content",children:(r={children:_("No entities recorded for this ME class.")},d("p",r))},d("div",n)))}function h(){var t;let r=f.value.trim().toLowerCase();b.clear();let n=e.classes.filter(e=>`${e.class_id} ${e.name??""}`.toLowerCase().includes(r));n.length?g.replaceChildren(...n.map(e=>{var t,r,n,i;let a=(i={type:"button",class:`mib-class-btn${e.class_id===c?" active":""}`,onclick:()=>m(e.class_id),children:[(t={class:"mib-class-id",children:e.class_id},d("span",t)),(r={class:"mib-class-name",title:e.name??_("Unknown class"),children:e.name??_("Unknown class")},d("span",r)),(n={class:"mib-class-count",children:e.entities},d("span",n))]},d("button",i));return b.set(e.class_id,a),a})):g.replaceChildren((t={class:"mib-empty-list",children:_("No matching ME classes")},d("div",t)))}return f.addEventListener("input",()=>{void 0!==o&&clearTimeout(o),o=setTimeout(()=>{o=void 0,h()},150)}),h(),e.classes.length&&m(e.classes[0].class_id),s={class:"mib-browser",children:[(a={class:"mib-sidebar",children:[(i={class:"mib-search-box",children:f},d("div",i)),g]},d("div",a)),u]},d("div",s)}(x),(y={class:"mib-upload-diagnostics",children:[(m={children:_("Upload diagnostics")},d("summary",m)),(h={class:"mib-pre",children:nC(x.diagnostics)},d("pre",h))]},d("details",y))),n=x,$.textContent=nC({schema_version:n.schema_version,reference_version:n.reference_version,onu_id:n.onu_id,uploaded_complete:n.uploaded_complete,expected_records:n.expected_records,received_records:n.received_records,decoded_records:n.decoded_records,partial_records:n.partial_records,basic_records:n.basic_records,tables_requested:n.tables_requested,tables_collected:n.tables_collected,class_count:n.classes.length,classes:n.classes.slice(0,25),additional_classes:Math.max(0,n.classes.length-25),record_count:n.records.length,first_record:n.records[0]??null,table_count:n.tables.length,diagnostics_count:n.diagnostics.length}),A.disabled=!1;return}if(e.progress){let{phase:t,received:r,expected:n}=e.progress;if(j.textContent="starting"===t?_("Starting OMCI MIB read…"):"tables"===t?`${_("Collecting VLAN tables")}${null==n?"":`: ${r}/${n}`}`:null==n?_("Reading OMCI MIB records…"):`${_("Reading OMCI MIB records")}: ${r}/${n}`,n&&n>0){let e=Math.min(100,Math.round(r/n*100));S.title=`${e}%`,S.firstElementChild.style.width=`${e}%`}}if(Date.now()>=M)throw Error(_("MIB query timed out; retry."));await new Promise(e=>setTimeout(e,1e3))}}catch(e){B()&&(S.style.display="none",j.replaceChildren(d("span",{class:"mib-error-text",children:[String(e),x?` \xb7 ${_("Previous snapshot retained")}`:""]})))}finally{await U(),w=!1,N.disabled=R.disabled=!1}}}async function U(){if(!k)return;let e=k;k=null;try{await ng(e)}catch(e){console.warn("Failed to release MIB snapshot",e)}}q(y),L.ui.showModal(`${e.model} — ${e.serial_number}`,W,"modal-wide")}(t,"mib")}catch(e){y.replaceChildren(d("div",{class:"alert-message danger",children:String(e)}))}},A=async e=>{if(!j){for(let e of(j=!0,C))e.disabled=!0;Z(k);try{var t;let r=await nu(e,v.value),n=e.startsWith("management_")?_("Management operation started; status is refreshed below."):_("Started: %s").format("operation_ids"in r?r.operation_ids.join(", "):"—");y.replaceChildren((t={class:"alert-message info",children:n},d("div",t))),Z(await nc())}catch(e){y.replaceChildren(d("div",{class:"alert-message danger",children:String(e)}))}finally{j=!1,Z(k)}}},O=d("button",{type:"button",class:"cbi-button cbi-button-action",onclick:()=>A("plan"),children:_("Preview differences (read-only)")}),N=d("button",{type:"button",class:"cbi-button cbi-button-positive",onclick:()=>A("apply"),children:_("Apply differences")}),R=d("button",{type:"button",class:"cbi-button cbi-button-action",title:_("Read current device parameters and auto-verify matching settings without writing to device"),onclick:()=>A("reconcile"),children:_("Reconcile (read-only)")}),I=d("button",{type:"button",class:"cbi-button cbi-button-positive",title:_("Clear backoff delays and retry safe difference synchronization"),onclick:()=>A("retry"),children:_("Self-heal / retry")});C.push(O,N,R,I);let T=d("button",{type:"button",class:"cbi-button cbi-button-action",onclick:()=>A("management_plan"),children:_("Check management differences (read-only)")}),D=d("button",{type:"button",class:"cbi-button cbi-button-positive",onclick:()=>A("management_apply"),children:_("Apply management configuration")});C.push(T,D);let q=(r={class:"cbi-section",children:[d("h3",{children:_("Isolated TR069 management network")}),x,d("p",{style:"margin-top:10px",children:[T," ",D]})]},d("div",r)),W=(a={class:"cbi-section",children:[d("h3",{children:_("Manual synchronization")}),(i={style:"display:flex;align-items:center;flex-wrap:wrap;gap:12px",children:[(n={style:"display:flex;align-items:center;gap:8px",children:[d("span",{children:[_("Target"),":"]}),v]},d("label",n)),d("div",{style:"display:flex;gap:8px;flex-wrap:wrap",children:[O,N,R,I]})]},d("div",i))]},d("div",a)),B=(s={class:"cbi-map fttr-sync",children:[d("style",{children:`
					.fttr-sync {
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
						.fttr-sync {
							--fttr-success-color: #2ecc71;
							--fttr-warning-color: #f39c12;
							--fttr-danger-color: #e74c3c;
							--fttr-info-color: #3498db;
							--fttr-neutral-color: #bdc3c7;
						}
					}

					[data-darkmode="true"] .fttr-sync,
					[data-theme="dark"] .fttr-sync {
						--fttr-success-color: #2ecc71;
						--fttr-warning-color: #f39c12;
						--fttr-danger-color: #e74c3c;
						--fttr-info-color: #3498db;
						--fttr-neutral-color: #bdc3c7;
					}

					.fttr-sync .fttr-badge {
						display: inline-block;
						padding: 0.18em 0.55em;
						font-size: 85%;
						font-weight: 600;
						line-height: 1.25;
						border-radius: 3px;
						white-space: nowrap;
						text-align: center;
					}

					.fttr-sync .fttr-badge-success {
						background: var(--fttr-success-bg);
						color: var(--fttr-success-color);
						border: 1px solid var(--fttr-success-border);
					}

					.fttr-sync .fttr-badge-warning {
						background: var(--fttr-warning-bg);
						color: var(--fttr-warning-color);
						border: 1px solid var(--fttr-warning-border);
					}

					.fttr-sync .fttr-badge-danger {
						background: var(--fttr-danger-bg);
						color: var(--fttr-danger-color);
						border: 1px solid var(--fttr-danger-border);
					}

					.fttr-sync .fttr-badge-info {
						background: var(--fttr-info-bg);
						color: var(--fttr-info-color);
						border: 1px solid var(--fttr-info-border);
					}

					.fttr-sync .fttr-badge-neutral {
						background: var(--fttr-neutral-bg);
						color: var(--fttr-neutral-color);
						border: 1px solid var(--fttr-neutral-border);
					}

					.fttr-sync .fttr-grid-2 {
						display: grid;
						grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
						gap: 12px;
						margin: 8px 0;
					}

					.fttr-sync .fttr-grid-3 {
						display: grid;
						grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
						gap: 12px;
						margin: 8px 0;
					}

					.fttr-sync .fttr-card {
						padding: 10px 14px;
						border: 1px solid rgba(127, 140, 141, 0.2);
						border-radius: 6px;
						background: rgba(127, 140, 141, 0.04);
					}

					.fttr-sync .fttr-kv-row {
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 4px 0;
						border-bottom: 1px dashed rgba(127, 140, 141, 0.15);
						font-size: 88%;
					}

					.fttr-sync .fttr-kv-row:last-child {
						border-bottom: none;
					}

					.fttr-sync .fttr-kv-label {
						color: #888;
					}

					.fttr-sync .fttr-pill-label {
						color: #888;
						margin-right: 4px;
						font-size: 90%;
					}

					.fttr-sync .fttr-device-card {
						position: relative;
						margin-bottom: 1.5em;
					}

					.fttr-sync .fttr-card-header {
						display: flex;
						justify-content: space-between;
						align-items: flex-start;
						flex-wrap: wrap;
						gap: 10px;
						margin-bottom: 10px;
					}

					.fttr-sync .fttr-card-title-group {
						display: flex;
						flex-direction: column;
						gap: 4px;
					}

					.fttr-sync .fttr-card-actions {
						display: flex;
						gap: 8px;
						flex-wrap: wrap;
					}

					.fttr-sync .fttr-card-meta-tags {
						display: flex;
						align-items: center;
						flex-wrap: wrap;
						gap: 6px;
					}

					.fttr-sync .fttr-device-status-strip {
						display: flex;
						justify-content: space-between;
						align-items: center;
						flex-wrap: wrap;
						gap: 10px;
						padding: 8px 12px;
						background: rgba(127, 140, 141, 0.05);
						border: 1px solid rgba(127, 140, 141, 0.15);
						border-radius: 5px;
						margin-bottom: 12px;
					}

					.fttr-sync .fttr-status-pill-group {
						display: flex;
						align-items: center;
						flex-wrap: wrap;
						gap: 12px;
					}

					.fttr-sync .fttr-status-op-info {
						display: flex;
						align-items: center;
						flex-wrap: wrap;
						gap: 6px;
						font-size: 85%;
						color: #666;
					}

					.fttr-sync .fttr-btn-subtle {
						font-size: 80%;
						padding: 3px 8px;
						border: 1px solid rgba(127, 140, 141, 0.35);
						background: transparent;
						color: inherit;
						border-radius: 4px;
						cursor: pointer;
						transition: all 0.2s ease;
					}

					.fttr-sync .fttr-btn-subtle:hover {
						background: rgba(231, 76, 60, 0.1);
						border-color: rgba(231, 76, 60, 0.4);
						color: #c0392b;
					}

					.fttr-sync .table th {
						white-space: nowrap;
						user-select: none;
					}

					.fttr-sync .table td {
						vertical-align: middle;
					}
					`}),d("h2",{children:_("FTTR synchronization")}),m,h,q,W,y,w]},d("div",s));function Z(e){var t,r,n,i,a,s,o,c,f,b,y,S,C,R,I,q,B,Z,U,V,F,J,K,Q,G,H,X,Y,ee,et,er,en,ei;k=e,m.replaceChildren((c={"data-provisioning-summary":"true",style:"display:flex;align-items:center;flex-wrap:wrap;gap:0.75em;margin-top:.25em;margin-bottom:1.2em;font-size:92%",children:[(t={children:[d("strong",{style:"margin-right:.4em",children:[_("Provisioning"),":"]}),d("span",{class:`fttr-badge ${e.enabled?"fttr-badge-success":"fttr-badge-neutral"}`,children:e.enabled?_("Enabled"):_("Disabled")})]},d("span",t)),(r={children:[d("span",{style:"color:#888;margin-right:.3em",children:[_("Mode"),":"]}),d("span",{class:"fttr-badge fttr-badge-info",children:p(e.mode)})]},d("span",r)),(n={children:[d("span",{style:"color:#888;margin-right:.3em",children:[_("Revision"),":"]}),d("code",{children:p(e.revision)})]},d("span",n)),e.config_load?(a={children:["waiting"===e.config_load.state?_("Saved; waiting to load automatically"):_("Configuration loaded; device synchronization is tracked below"),"waiting"===e.config_load.state?(i={children:[" ",d("code",{children:e.config_load.requested_revision}),e.config_load.blocking_operations.map(e=>d("span",{style:"margin-left:.5em",children:`${e.device} #${e.operation_id}: ${p(e.state)} (${g(Math.max(0,Date.now()/1e3-e.started_at))})`})),e.config_load.reset_pending?_("Waiting for device reset recovery"):null]},d("span",i)):null]},d("span",a)):null,(e.triggers??[]).length?(s={children:[d("span",{style:"color:#888;margin-right:.3em",children:[_("Triggers"),":"]}),d("code",{children:(e.triggers??[]).join(", ")})]},d("span",s)):null,e.interval_minutes?(o={children:[d("span",{style:"color:#888;margin-right:.3em",children:[_("Interval (minutes)"),":"]}),d("span",{children:e.interval_minutes})]},d("span",o)):null]},d("div",c)));let ea=[e.error,e.config_error,"error"in z?_("Committed configuration is invalid: %s").format(z.error):z.revision&&z.revision!==e.revision&&(e.config_load?.state!=="waiting"||e.config_load.requested_revision!==z.revision)?_("Committed configuration has not been requested for loading. Apply the configuration to load it."):""].filter(Boolean);h.hidden=!ea.length,h.textContent=ea.join(" — ");let es=(e.devices??[]).filter(e=>"none"!==e.provisioning_adapter),eo=["all",...Array.from(new Set(es.map(e=>e.group).filter(Boolean))).map(e=>`group:${e}`),...es.map(e=>e.device)];if(Array.from(v.options).map(e=>e.value).join("\n")!==eo.join("\n")){let t=v.value;v.replaceChildren(...eo.map(t=>d("option",{value:t,children:"all"===t?_("All devices"):t.startsWith("group:")?(e.devices??[]).find(e=>`group:${e.group}`===t)?.group_name||t:(e.devices??[]).find(e=>e.device===t)?.name||t}))),v.value=eo.includes(t)?t:"all"}W.hidden="manual"!==e.mode||!L.hasViewPermission();let el=es.filter(e=>"all"===v.value||e.device===v.value||`group:${e.group}`===v.value).some(e=>!["completed","not_started","interrupted","disabled"].includes(e.provisioning.state??"not_started"));O.disabled=j||el||e.config_load?.state==="waiting"||"error"in z||!!z.revision&&z.revision!==e.revision||!es.length,N.disabled=O.disabled||!e.enabled;let ed=e.management_network;T.disabled=j||e.config_load?.state==="waiting"||!!ed?.inflight||"error"in z||!L.hasViewPermission(),D.disabled=T.disabled;let ec=ed.desired??ed.applied,ep=ed?.plan??[],eu=!!ed?.applied_version&&!!ed?.desired_version&&ed?.applied_version===ed?.desired_version;x.replaceChildren((ei={children:[(R={style:"display:flex;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:10px",children:[(f={children:[d("span",{class:"fttr-pill-label",children:[_("State"),":"]})," ",nI(ed?.state)]},d("span",f)),(b={children:[d("span",{class:"fttr-pill-label",children:[_("Desired version"),":"]})," ",d("code",{children:p(ed?.desired_version)})]},d("span",b)),(y={children:[d("span",{class:"fttr-pill-label",children:[_("Applied version"),":"]})," ",d("code",{children:p(ed?.applied_version)})]},d("span",y)),ed?.desired_version||ed?.applied_version?(S={children:eu?d("span",{class:"fttr-badge fttr-badge-success",children:_("Synchronized")}):d("span",{class:"fttr-badge fttr-badge-warning",children:_("Pending apply")})},d("span",S)):null,ed?.next_retry_at?(C={children:[d("span",{class:"fttr-pill-label",children:[_("Next retry"),":"]})," ",u(ed.next_retry_at)]},d("span",C)):null]},d("div",R)),(G={class:"fttr-grid-3",children:[(B={class:"fttr-card",children:[(I={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:_("Management interface")}),d("strong",{children:"—"})]},d("div",I)),(q={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:_("Management VLAN")}),d("span",{children:["VLAN ",p(ec?.vlan.join(", "))," (Prio ",p(ec?.priority),")"]})]},d("div",q))]},d("div",B)),(F={class:"fttr-card",children:[(Z={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:_("Service IP / Netmask")}),d("code",{children:p(ec?.address)})]},d("div",Z)),(V={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:_("DHCP service")}),(U={children:null===ec?"—":ec.dhcp_enabled?d("span",{class:"fttr-badge fttr-badge-success",children:_("Enabled")}):d("span",{class:"fttr-badge fttr-badge-neutral",children:_("Disabled")})},d("span",U))]},d("div",V))]},d("div",F)),(Q={class:"fttr-card",children:[(J={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:_("ACS URL")}),d("code",{style:"font-size:80%",children:p(ec?.acs_url)})]},d("div",J)),(K={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:_("Mode")}),d("span",{children:p(ec?.mode)})]},d("div",K))]},d("div",Q))]},d("div",G)),ep.length?(er={style:"margin-top:10px",children:[d("h5",{style:"margin-bottom:4px;font-size:90%",children:_("Pending configuration changes")}),(et={class:"table-wrapper",children:(ee={class:"table",style:"font-size:85%",children:[(X={children:(H={children:[d("th",{children:_("Operation")}),d("th",{children:_("Configuration item")}),d("th",{children:_("Reason / desired changes")})]},d("tr",H))},d("thead",X)),(Y={children:ep.map(e=>{var t,r,n,i;return i={children:[(t={children:d("span",{class:"fttr-badge fttr-badge-info",children:e.operation})},d("td",t)),(r={children:d("code",{children:e.key})},d("td",r)),(n={children:d("code",{children:(e.value??[]).join(", ")})},d("td",n))]},d("tr",i)})},d("tbody",Y))]},d("table",ee))},d("div",et))]},d("div",er)):null,ed?.error?d("div",{class:"alert-message warning",style:"margin-top:8px",children:ed.error}):null,d("p",{style:"font-size:85%;color:#888;margin-top:8px;margin-bottom:8px",children:_("Saving in manual mode does not create interfaces, change firewall rules or configure child devices. Apply explicitly to authorize the current management configuration.")}),(en={style:"margin-top:6px;margin-bottom:10px",children:[d("summary",{style:"cursor:pointer;user-select:none;font-size:85%;color:#666",children:_("Advanced diagnostics / Raw configuration (JSON)")}),d("pre",{style:"white-space:pre-wrap;overflow-wrap:anywhere;font-size:80%;max-height:200px;overflow-y:auto;background:rgba(0,0,0,0.03);padding:8px;border-radius:4px",children:JSON.stringify({desired:ed?.desired,applied:ed?.applied,plan:ed?.plan??[]},null,2)})]},d("details",en))]},d("div",ei)));let e_=new Set(Array.from(w.querySelectorAll("details[open]")).map(e=>e.getAttribute("data-device"))),ef=function(e){let t=new Set;for(let r of e.querySelectorAll(nP))if(r.open){let n=nA(e,r);n&&t.add(n)}let r="u">typeof document?document.activeElement:null,n=r&&e.contains(r)?nO(e,r):null,i=e.scrollTop,a="u">typeof window?window.scrollY:0;return()=>{for(let r of e.querySelectorAll(nP))t.has(nA(e,r))&&(r.open=!0);if(e.scrollTop=i,n){let t=function(e,t){let r=e;for(let e of t)if(!(r=r?.children[e]??null))return null;return r}(e,n);t&&"function"==typeof t.focus&&t.focus({preventScroll:!0})}"u">typeof window&&"function"==typeof window.scrollTo&&window.scrollY!==a&&window.scrollTo(0,a)}}(w);w.replaceChildren(...(e.devices??[]).map(t=>(function(e,t,r,n,i,a,s,o,c){var f,b,m,h,y,v,w,x,k,z,j,S,C,$,M,P,A,O,N,R,I,T,D,q,W,B,Z,U,V,F,J,K,Q,G,H,X,Y,ee,et,er,en,ei,ea,es,eo,el,ed,ec,ep,eu,e_,ef,eg,eb,em,eh,ey,ev,ew,ex;let ek=e.provisioning,ez="none"!==e.provisioning_adapter,ej=!["completed","not_started","interrupted","disabled"].includes(ek.state),eS=[...Object.entries(ek.wan_lifecycle??{}).map(e=>{let[t,r]=e;return{...r,id:`WAN ${t}`,kind:"wan_activation",service_type:"wan"}}),...Object.entries(ek.wifi_lifecycle??{}).map(e=>{let[t,r]=e;return{...r,id:`WLAN ${t}`,kind:"ssid",service_type:"wifi"}})];return ex={class:"cbi-section fttr-device-card",children:[(y={class:"fttr-card-header",children:[(m={class:"fttr-card-title-group",children:[d("h3",{style:"margin:0",children:e.name||e.optical_sn}),(b={class:"fttr-card-meta-tags",children:[e.group_name?d("span",{class:"fttr-badge fttr-badge-neutral",title:_("Group"),children:e.group_name}):null,e.template_name?d("span",{class:"fttr-badge fttr-badge-neutral",title:_("Template"),children:e.template_name}):null,d("span",{class:"fttr-badge fttr-badge-neutral",title:_("OMCI adapter"),children:["OMCI: ",e.omci_adapter]}),d("span",{class:"fttr-badge fttr-badge-neutral",title:_("ACS bootstrap"),children:["ACS bootstrap: ",e.bootstrap_adapter]}),d("span",{class:"fttr-badge fttr-badge-neutral",title:_("Business provisioning"),children:["Provisioning: ",e.provisioning_adapter]})]},d("div",b))]},d("div",m)),L.hasViewPermission()?(h={class:"fttr-card-actions",children:[d("button",{type:"button",class:"cbi-button cbi-button-action",onclick:()=>i(e),children:_("View OMCI / MIB details")}),d("button",{type:"button",class:"cbi-button cbi-button-positive",disabled:c||ej||!o||!ez,title:o&&ez?ej?_("This device already has an active synchronization operation"):_("Start configuration delivery for this device"):_("Provisioning is disabled"),onclick:()=>n(e),children:_("Sync now")}),d("button",{type:"button",class:"cbi-button cbi-button-positive",disabled:c,title:_("Clear old tasks and managed-object records after a device factory reset. The next preview or apply reads the device again."),onclick:()=>{let t=e.name||e.optical_sn;window.confirm(_("Are you sure you want to reset the synchronization state for %s?").format(t))&&r(e)},children:_("Reset synchronization state")})]},d("div",h)):null]},d("div",y)),(k={class:"fttr-device-status-strip","aria-label":_("Transport observations"),children:(x={class:"fttr-status-pill-group",children:[(v={children:[d("span",{class:"fttr-pill-label",children:"CWMP:"})," ",nI(e.management?.state,e.management?.last_inform?`${_("Last Inform: %s").format(u(e.management.last_inform))}${null!=e.management.age_seconds?` (${g(e.management.age_seconds)})`:""}`:void 0)]},d("span",v)),(w={children:[d("span",{class:"fttr-pill-label",children:"MQTT:"})," ",nI(e.mqtt?.state)]},d("span",w))]},d("div",x))},d("section",k)),(K={"aria-label":_("ACS bootstrap"),children:[(f=e.acs_bootstrap)?"inflight"in f?(F={style:"margin-top:1.2em",children:[(j={style:"display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:0.5em",children:[d("h4",{style:"margin:0",children:_("ACS bootstrap")}),(z={style:"display:flex;align-items:center;gap:6px",children:[nI(f.state),f.inflight?d("span",{class:"fttr-badge fttr-badge-info",children:_("Command in progress")}):null]},d("div",z))]},d("div",j)),(Z={class:"fttr-card",children:[(q={class:"fttr-grid-3",children:[(M={children:[(S={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:_("Method")}),d("code",{children:p(f.method)})]},d("div",S)),(C={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:_("Attempts")}),d("span",{children:p(f.attempts)})]},d("div",C)),($={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:_("Identity source")}),d("span",{children:p(f.binding_source)})]},d("div",$))]},d("div",M)),(N={children:[(P={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:_("Management VLAN")}),d("span",{children:f.desired?.vlan!==void 0?`VLAN ${f.desired.vlan} (Prio ${f.desired.priority??0})`:"—"})]},d("div",P)),(A={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:_("ACS URL")}),d("code",{style:"font-size:80%",children:p(f.desired?.acs_url)})]},d("div",A)),(O={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:_("Local ACS listener")}),d("code",{style:"font-size:80%",children:f.listener?.listen?`${f.listener.listen}${f.listener.path||""}`:"—"})]},d("div",O))]},d("div",N)),(D={children:[(R={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:_("Last telemetry")}),d("span",{style:"font-size:85%",children:u(f.mqtt_last_seen)})]},d("div",R)),(I={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:_("Last Inform")}),d("span",{style:"font-size:85%",children:u(f.last_inform)})]},d("div",I)),(T={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:_("Settings verified")}),d("span",{style:"font-size:85%",children:u(f.settings_verified_at)})]},d("div",T))]},d("div",D))]},d("div",q)),f.mqtt_target?(W={style:"font-size:85%;color:#666;margin-top:6px;border-top:1px dashed rgba(127,140,141,0.15);padding-top:6px",children:[d("span",{style:"color:#888",children:[_("MQTT target"),":"]})," ",d("code",{children:f.mqtt_target})]},d("div",W)):null,f.reason?d("div",{style:"font-size:85%;color:#d35400;margin-top:6px;overflow-wrap:anywhere",children:f.reason}):null,"awaiting_apply"===f.state?(B={style:"margin-top:10px;padding:8px;background:rgba(243,156,18,0.1);border-radius:4px;border:1px solid rgba(243,156,18,0.3)",children:[d("button",{type:"button",class:"cbi-button cbi-button-positive",disabled:s,onclick:a,children:_("Authorize and apply management settings")})," ",d("span",{style:"font-size:85%;color:#666",children:_("Authorizes recovery of the child ACS settings after management drift or service restart. Business synchronization uses its own transport readiness.")})]},d("div",B)):null]},d("div",Z)),[f.last_error,f.link_identity_error,f.persistence_error,f.listener?.error,f.endpoint_notice].filter(Boolean).map(e=>d("div",{class:"alert-message warning",style:"overflow-wrap:anywhere;margin-top:8px",children:e})),f.manual_steps?.length?(V={style:"margin-top:8px",children:[d("summary",{style:"cursor:pointer;user-select:none;font-weight:600",children:_("Management setup / reachability guidance")}),(U={style:"padding:6px 0",children:f.manual_steps.map((e,t)=>d("p",{style:"margin:4px 0;font-size:90%",children:[t+1,". ",e]}))},d("div",U))]},d("details",V)):null]},d("div",F)):(J={class:"fttr-card",children:[d("h4",{children:_("ACS bootstrap")}),nI(f.state),d("p",{children:f.reason})]},d("div",J)):null,"omci-acs"===e.bootstrap_adapter?d("p",{children:[_("OMCI ACS association"),": ",nI(e.omci_management?.state)," ",e.omci_management?.reason]}):null]},d("section",K)),(ew={"aria-label":_("Business provisioning"),children:[d("h4",{style:"margin-top:1.2em",children:_("Business provisioning")}),(ei={class:"fttr-device-status-strip",children:[(H={class:"fttr-status-pill-group",children:[(Q={children:[d("span",{class:"fttr-pill-label",children:[_("Synchronization"),":"]})," ",nI(ek.state)]},d("span",Q)),(G={children:[d("span",{class:"fttr-pill-label",children:"Wi-Fi:"})," ",nI(e.wifi_sync)]},d("span",G))]},d("div",H)),(en={class:"fttr-status-op-info",children:[(X={children:[_("Operation"),": ",d("strong",{children:p(ek.operation_id)})," (",p(ek.mode),")"]},d("span",X)),d("span",{children:"·"}),d("span",{children:[_("Started"),": ",u(ek.started_at)]}),d("span",{children:"·"}),(Y={children:[_("Revision"),": ",d("code",{children:p(ek.revision)})]},d("span",Y)),ek.attempts?(et={children:[d("span",{children:"·"}),(ee={style:"color:#e67e22",children:[_("Attempts"),": ",d("strong",{children:ek.attempts})]},d("span",ee))]},d(l,et)):null,ek.next_retry_at&&ek.next_retry_at>Math.floor(Date.now()/1e3)?(er={children:[d("span",{children:"·"}),d("span",{style:"color:#d35400",children:_("Next self-healing retry in %d seconds").format(ek.next_retry_at-Math.floor(Date.now()/1e3))})]},d(l,er)):null]},d("div",en))]},d("div",ei)),ek.reconcile_reason?d("div",{class:"alert-message info",style:"margin:8px 0;font-size:85%",children:ek.reconcile_reason}):null,nT(ek.items??[]),ek.cwmp_contract?(ef={style:"margin-top:1.2em",children:[d("h4",{style:"margin-bottom:0.5em",children:_("CWMP contract")}),(e_={class:"fttr-card",children:[(es={style:"display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:8px",children:[(ea={children:[d("span",{children:p(ek.cwmp_contract.requested)})," →"," ",d("code",{children:p(ek.cwmp_contract.contract)})]},d("div",ea)),d("div",{children:nI(ek.cwmp_contract.state)})]},d("div",es)),(ep={style:"display:flex;flex-wrap:wrap;gap:12px;margin-bottom:6px;font-size:90%",children:[(eo={children:[d("span",{style:"color:#888",children:"WAN:"})," ",nI(ek.cwmp_contract.capabilities?.wan)]},d("span",eo)),(el={children:[d("span",{style:"color:#888",children:"WLAN:"})," ",nI(ek.cwmp_contract.capabilities?.wlan)]},d("span",el)),(ed={children:[d("span",{style:"color:#888",children:[_("Bindings"),":"]})," ",nI(ek.cwmp_contract.capabilities?.binding)]},d("span",ed)),(ec={children:[d("span",{style:"color:#888",children:[_("Cache"),":"]})," ",d("span",{class:"fttr-badge fttr-badge-info",style:"font-size:80%",children:ek.cwmp_contract.cache_hit?_("Matched"):_("Fresh discovery")})]},d("span",ec))]},d("div",ep)),ek.cwmp_contract.schema?(eu={style:"font-size:85%;color:#666",children:[_("Schema"),": ",d("code",{children:ek.cwmp_contract.schema})]},d("div",eu)):null,ek.cwmp_contract.reason?d("div",{style:"font-size:85%;margin-top:4px;color:#e67e22",children:ek.cwmp_contract.reason}):null]},d("div",e_))]},d("div",ef)):null,eS.length?(eg={style:"margin-top:1.2em",children:[d("h4",{style:"margin-bottom:0.5em",children:_("WAN / WLAN lifecycle results")}),nT(eS)]},d("div",eg)):null,(ev={"data-device":e.device,open:t,style:"margin-top:1em",children:[d("summary",{style:"cursor:pointer;user-select:none;font-weight:600",children:_("Managed objects and lifecycle intent")}),(ey={style:"padding:8px 0",children:[(eh={style:"display:flex;gap:16px;flex-wrap:wrap;font-size:90%;margin-bottom:6px",children:[(eb={children:[d("span",{style:"color:#888",children:[_("Wi-Fi cleanup policy"),":"]})," ",p(ek.wifi_cleanup)]},d("span",eb)),(em={children:[d("span",{style:"color:#888",children:[_("Wi-Fi stage"),":"]})," ",p(ek.wifi_stage)]},d("span",em))]},d("div",eh)),d("pre",{style:"white-space:pre-wrap;overflow-wrap:anywhere;font-size:85%;background:rgba(0,0,0,0.03);padding:8px;border-radius:4px;max-height:240px;overflow-y:auto",children:JSON.stringify({wan_objects:ek.wan_objects??{},wifi_objects:ek.wifi_objects??{}},null,2)})]},d("div",ey))]},d("details",ev))]},d("section",ew))]},d("div",ex)})(t,e_.has(t.device),$,M,P,()=>A("management_apply"),D.disabled,e.enabled,j))),ef()}return v.addEventListener("change",()=>Z(k)),Z(o),L.Poll.add(async()=>{if(!(!B.isConnected||c())&&!S){S=!0;try{let[e,t]=await Promise.all([nc(),np()]);z=t,Z(e)}catch(e){h.hidden=!1,h.textContent=_("Status refresh failed: %s").format(String(e))}finally{S=!1}}},5),B},handleSave:null,handleSaveApply:null,handleReset:null})})(),main=t.main;
return main;
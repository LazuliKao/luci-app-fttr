'use strict';
var main,e={};e.d=(t,r,n)=>{var i=(r,n)=>{for(var i in r)e.o(r,i)&&!e.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,[n]:r[i]})};i(r,"get"),i(n,"value")},e.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var t={};(()=>{var r;let n,i,a,s,o;e.d(t,{main:()=>main});let l=Symbol.for("jsx.fragment");function d(e,t){let{children:r,...n}=null===t||"object"!=typeof t||Array.isArray(t)?{}:t,i=function e(t){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];for(let n of t)null!=n&&"boolean"!=typeof n&&(Array.isArray(n)?e(n,r):r.push(n instanceof Node?n:String(n)));return r}(null==r?[]:Array.isArray(r)?r:[r]);if(e===l){let e=document.createDocumentFragment();return e.append(...i),e}if("function"==typeof e){let t=Reflect.apply(e,void 0,[{...n,children:i}]);if(!(t instanceof Node))throw TypeError("JSX components must return a DOM Node");return t}if("string"!=typeof e)throw TypeError("JSX element types must be tag names or component functions");let a={},s={...n};for(let[e,t]of Object.entries(s))e.startsWith("on")&&"function"==typeof t?(a[e]=t,delete s[e]):"boolean"==typeof t&&(t?s[e]=e:delete s[e]);let o=Object.keys(s).length>0?i.length>1?E(e,s,i):E(e,s,i[0]):i.length>1?E(e,{},i):E(e,{},i[0]);for(let[e,t]of Object.entries(a)){let r=e.slice(2).toLowerCase();o.addEventListener(r,t)}return o}let c=e=>null==e||""===e?"—":String(e);function p(e){return e?new Date(1e3*e).toLocaleString():"—"}function u(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3;return null!=e&&Number.isFinite(e)?`${e.toFixed(t)} dBm`:"—"}function g(e){if(null==e||!Number.isFinite(e)||e<0)return null;let t=Math.floor(e);if(t<60)return(1===t?_("%d second ago"):_("%d seconds ago")).replace("%d",String(t));let r=Math.floor(t/60);if(r<60)return(1===r?_("%d minute ago"):_("%d minutes ago")).replace("%d",String(r));let n=Math.floor(t/3600);if(n<24)return(1===n?_("%d hour ago"):_("%d hours ago")).replace("%d",String(n));let i=Math.floor(t/86400);return(1===i?_("%d day ago"):_("%d days ago")).replace("%d",String(i))}function f(e,t,r){function n(r,n){if(r._zod||Object.defineProperty(r,"_zod",{value:{def:n,constr:s,traits:new Set},enumerable:!1}),r._zod.traits.has(e))return;r._zod.traits.add(e),t(r,n);let i=s.prototype,a=Object.keys(i);for(let e=0;e<a.length;e++){let t=a[e];t in r||(r[t]=i[t].bind(r))}}let i=r?.Parent??Object;class a extends i{}function s(e){var t;let i=r?.Parent?new a:this;for(let r of(n(i,e),(t=i._zod).deferred??(t.deferred=[]),i._zod.deferred))r();return i}return Object.defineProperty(a,"name",{value:e}),Object.defineProperty(s,"init",{value:n}),Object.defineProperty(s,Symbol.hasInstance,{value:t=>!!r?.Parent&&t instanceof r.Parent||t?._zod?.traits?.has(e)}),Object.defineProperty(s,"name",{value:e}),s}Object.freeze({status:"aborted"}),Symbol("zod_brand");class b extends Error{constructor(){super("Encountered Promise during synchronous parse. Use .parseAsync() instead.")}}let h={};function m(e){return e&&Object.assign(h,e),h}function y(e,t){return"bigint"==typeof t?t.toString():t}function v(e){let t=+!!e.startsWith("^"),r=e.endsWith("$")?e.length-1:e.length;return e.slice(t,r)}let w=Symbol("evaluating");function x(e,t,r){let n;Object.defineProperty(e,t,{get(){if(n!==w)return void 0===n&&(n=w,n=r()),n},set(r){Object.defineProperty(e,t,{value:r})},configurable:!0})}let k="captureStackTrace"in Error?Error.captureStackTrace:(...e)=>{};function z(e){return"object"==typeof e&&null!==e&&!Array.isArray(e)}function j(e){if(!1===z(e))return!1;let t=e.constructor;if(void 0===t||"function"!=typeof t)return!0;let r=t.prototype;return!1!==z(r)&&!1!==Object.prototype.hasOwnProperty.call(r,"isPrototypeOf")}function S(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function C(e){if(!e)return{};if("string"==typeof e)return{error:()=>e};if(e?.message!==void 0){if(e?.error!==void 0)throw Error("Cannot specify both `message` and `error` params");e.error=e.message}return(delete e.message,"string"==typeof e.error)?{...e,error:()=>e.error}:e}function $(e,t=0){if(!0===e.aborted)return!0;for(let r=t;r<e.issues.length;r++)if(e.issues[r]?.continue!==!0)return!0;return!1}function M(e,t){return t.map(t=>(t.path??(t.path=[]),t.path.unshift(e),t))}function P(e){return"string"==typeof e?e:e?.message}function O(e,t,r){let n={...e,path:e.path??[]};return e.message||(n.message=P(e.inst?._zod.def?.error?.(e))??P(t?.error?.(e))??P(r.customError?.(e))??P(r.localeError?.(e))??"Invalid input"),delete n.inst,delete n.continue,t?.reportInput||delete n.input,n}let A=(e,t)=>{e.name="$ZodError",Object.defineProperty(e,"_zod",{value:e._zod,enumerable:!1}),Object.defineProperty(e,"issues",{value:t,enumerable:!1}),e.message=JSON.stringify(t,y,2),Object.defineProperty(e,"toString",{value:()=>e.message,enumerable:!1})},N=f("$ZodError",A),R=f("$ZodError",A,{Parent:Error}),I=(i=R,(e,t,r,n)=>{let a=r?Object.assign(r,{async:!1}):{async:!1},s=e._zod.run({value:t,issues:[]},a);if(s instanceof Promise)throw new b;if(s.issues.length){let e=new(n?.Err??i)(s.issues.map(e=>O(e,a,m())));throw k(e,n?.callee),e}return s.value}),T=(a=R,async(e,t,r,n)=>{let i=r?Object.assign(r,{async:!0}):{async:!0},s=e._zod.run({value:t,issues:[]},i);if(s instanceof Promise&&(s=await s),s.issues.length){let e=new(n?.Err??a)(s.issues.map(e=>O(e,i,m())));throw k(e,n?.callee),e}return s.value}),D=(s=R,(e,t,r)=>{let n=r?{...r,async:!1}:{async:!1},i=e._zod.run({value:t,issues:[]},n);if(i instanceof Promise)throw new b;return i.issues.length?{success:!1,error:new(s??N)(i.issues.map(e=>O(e,n,m())))}:{success:!0,data:i.value}}),q=(o=R,async(e,t,r)=>{let n=r?Object.assign(r,{async:!0}):{async:!0},i=e._zod.run({value:t,issues:[]},n);return i instanceof Promise&&(i=await i),i.issues.length?{success:!1,error:new o(i.issues.map(e=>O(e,n,m())))}:{success:!0,data:i.value}}),W=/^-?\d+(?:\.\d+)?$/,B=/^(?:true|false)$/i,Z=/^null$/i,U={major:4,minor:3,patch:6},V=f("$ZodType",(e,t)=>{var r;e??(e={}),e._zod.def=t,e._zod.bag=e._zod.bag||{},e._zod.version=U;let n=[...e._zod.def.checks??[]];for(let t of(e._zod.traits.has("$ZodCheck")&&n.unshift(e),n))for(let r of t._zod.onattach)r(e);if(0===n.length)(r=e._zod).deferred??(r.deferred=[]),e._zod.deferred?.push(()=>{e._zod.run=e._zod.parse});else{let t=(e,t,r)=>{let n,i=$(e);for(let a of t){if(a._zod.def.when){if(!a._zod.def.when(e))continue}else if(i)continue;let t=e.issues.length,s=a._zod.check(e);if(s instanceof Promise&&r?.async===!1)throw new b;if(n||s instanceof Promise)n=(n??Promise.resolve()).then(async()=>{await s,e.issues.length!==t&&(i||(i=$(e,t)))});else{if(e.issues.length===t)continue;i||(i=$(e,t))}}return n?n.then(()=>e):e},r=(r,i,a)=>{if($(r))return r.aborted=!0,r;let s=t(i,n,a);if(s instanceof Promise){if(!1===a.async)throw new b;return s.then(t=>e._zod.parse(t,a))}return e._zod.parse(s,a)};e._zod.run=(i,a)=>{if(a.skipChecks)return e._zod.parse(i,a);if("backward"===a.direction){let t=e._zod.parse({value:i.value,issues:[]},{...a,skipChecks:!0});return t instanceof Promise?t.then(e=>r(e,i,a)):r(t,i,a)}let s=e._zod.parse(i,a);if(s instanceof Promise){if(!1===a.async)throw new b;return s.then(e=>t(e,n,a))}return t(s,n,a)}}x(e,"~standard",()=>({validate:t=>{try{let r=D(e,t);return r.success?{value:r.data}:{issues:r.error?.issues}}catch(r){return q(e,t).then(e=>e.success?{value:e.data}:{issues:e.error?.issues})}},vendor:"zod",version:1}))}),F=f("$ZodString",(e,t)=>{var r;let n;V.init(e,t),e._zod.pattern=[...e?._zod.bag?.patterns??[]].pop()??(n=(r=e._zod.bag)?`[\\s\\S]{${r?.minimum??0},${r?.maximum??""}}`:"[\\s\\S]*",RegExp(`^${n}$`)),e._zod.parse=(r,n)=>{if(t.coerce)try{r.value=String(r.value)}catch(e){}return"string"==typeof r.value||r.issues.push({expected:"string",code:"invalid_type",input:r.value,inst:e}),r}}),J=f("$ZodNumber",(e,t)=>{V.init(e,t),e._zod.pattern=e._zod.bag.pattern??W,e._zod.parse=(r,n)=>{if(t.coerce)try{r.value=Number(r.value)}catch(e){}let i=r.value;if("number"==typeof i&&!Number.isNaN(i)&&Number.isFinite(i))return r;let a="number"==typeof i?Number.isNaN(i)?"NaN":Number.isFinite(i)?void 0:"Infinity":void 0;return r.issues.push({expected:"number",code:"invalid_type",input:i,inst:e,...a?{received:a}:{}}),r}}),K=f("$ZodBoolean",(e,t)=>{V.init(e,t),e._zod.pattern=B,e._zod.parse=(r,n)=>{if(t.coerce)try{r.value=!!r.value}catch(e){}let i=r.value;return"boolean"==typeof i||r.issues.push({expected:"boolean",code:"invalid_type",input:i,inst:e}),r}}),Q=f("$ZodNull",(e,t)=>{V.init(e,t),e._zod.pattern=Z,e._zod.values=new Set([null]),e._zod.parse=(t,r)=>{let n=t.value;return null===n||t.issues.push({expected:"null",code:"invalid_type",input:n,inst:e}),t}}),G=f("$ZodUnknown",(e,t)=>{V.init(e,t),e._zod.parse=e=>e});function H(e,t,r){e.issues.length&&t.issues.push(...M(r,e.issues)),t.value[r]=e.value}let X=f("$ZodArray",(e,t)=>{V.init(e,t),e._zod.parse=(r,n)=>{let i=r.value;if(!Array.isArray(i))return r.issues.push({expected:"array",code:"invalid_type",input:i,inst:e}),r;r.value=Array(i.length);let a=[];for(let e=0;e<i.length;e++){let s=i[e],o=t.element._zod.run({value:s,issues:[]},n);o instanceof Promise?a.push(o.then(t=>H(t,r,e))):H(o,r,e)}return a.length?Promise.all(a).then(()=>r):r}});function Y(e,t,r,n,i){if(e.issues.length){if(i&&!(r in n))return;t.issues.push(...M(r,e.issues))}void 0===e.value?r in n&&(t.value[r]=void 0):t.value[r]=e.value}let ee=f("$ZodObject",(e,t)=>{var r;let n;V.init(e,t);let i=Object.getOwnPropertyDescriptor(t,"shape");if(!i?.get){let e=t.shape;Object.defineProperty(t,"shape",{get:()=>{let r={...e};return Object.defineProperty(t,"shape",{value:r}),r}})}let a=(r=()=>(function(e){var t;let r=Object.keys(e.shape);for(let t of r)if(!e.shape?.[t]?._zod?.traits?.has("$ZodType"))throw Error(`Invalid element at key "${t}": expected a Zod schema`);let n=Object.keys(t=e.shape).filter(e=>"optional"===t[e]._zod.optin&&"optional"===t[e]._zod.optout);return{...e,keys:r,keySet:new Set(r),numKeys:r.length,optionalKeys:new Set(n)}})(t),{get value(){{let e=r();return Object.defineProperty(this,"value",{value:e}),e}}});x(e._zod,"propValues",()=>{let e=t.shape,r={};for(let t in e){let n=e[t]._zod;if(n.values)for(let e of(r[t]??(r[t]=new Set),n.values))r[t].add(e)}return r});let s=t.catchall;e._zod.parse=(t,r)=>{n??(n=a.value);let i=t.value;if(!z(i))return t.issues.push({expected:"object",code:"invalid_type",input:i,inst:e}),t;t.value={};let o=[],l=n.shape;for(let e of n.keys){let n=l[e],a="optional"===n._zod.optout,s=n._zod.run({value:i[e],issues:[]},r);s instanceof Promise?o.push(s.then(r=>Y(r,t,e,i,a))):Y(s,t,e,i,a)}return s?function(e,t,r,n,i,a){let s=[],o=i.keySet,l=i.catchall._zod,d=l.def.type,c="optional"===l.optout;for(let i in t){if(o.has(i))continue;if("never"===d){s.push(i);continue}let a=l.run({value:t[i],issues:[]},n);a instanceof Promise?e.push(a.then(e=>Y(e,r,i,t,c))):Y(a,r,i,t,c)}return(s.length&&r.issues.push({code:"unrecognized_keys",keys:s,input:t,inst:a}),e.length)?Promise.all(e).then(()=>r):r}(o,i,t,r,a.value,e):o.length?Promise.all(o).then(()=>t):t}});function et(e,t,r,n){for(let r of e)if(0===r.issues.length)return t.value=r.value,t;let i=e.filter(e=>!$(e));return 1===i.length?(t.value=i[0].value,i[0]):(t.issues.push({code:"invalid_union",input:t.value,inst:r,errors:e.map(e=>e.issues.map(e=>O(e,n,m())))}),t)}let er=f("$ZodUnion",(e,t)=>{V.init(e,t),x(e._zod,"optin",()=>t.options.some(e=>"optional"===e._zod.optin)?"optional":void 0),x(e._zod,"optout",()=>t.options.some(e=>"optional"===e._zod.optout)?"optional":void 0),x(e._zod,"values",()=>{if(t.options.every(e=>e._zod.values))return new Set(t.options.flatMap(e=>Array.from(e._zod.values)))}),x(e._zod,"pattern",()=>{if(t.options.every(e=>e._zod.pattern)){let e=t.options.map(e=>e._zod.pattern);return RegExp(`^(${e.map(e=>v(e.source)).join("|")})$`)}});let r=1===t.options.length,n=t.options[0]._zod.run;e._zod.parse=(i,a)=>{if(r)return n(i,a);let s=!1,o=[];for(let e of t.options){let t=e._zod.run({value:i.value,issues:[]},a);if(t instanceof Promise)o.push(t),s=!0;else{if(0===t.issues.length)return t;o.push(t)}}return s?Promise.all(o).then(t=>et(t,i,e,a)):et(o,i,e,a)}}),en=f("$ZodIntersection",(e,t)=>{V.init(e,t),e._zod.parse=(e,r)=>{let n=e.value,i=t.left._zod.run({value:n,issues:[]},r),a=t.right._zod.run({value:n,issues:[]},r);return i instanceof Promise||a instanceof Promise?Promise.all([i,a]).then(([t,r])=>ei(e,t,r)):ei(e,i,a)}});function ei(e,t,r){let n,i=new Map;for(let r of t.issues)if("unrecognized_keys"===r.code)for(let e of(n??(n=r),r.keys))i.has(e)||i.set(e,{}),i.get(e).l=!0;else e.issues.push(r);for(let t of r.issues)if("unrecognized_keys"===t.code)for(let e of t.keys)i.has(e)||i.set(e,{}),i.get(e).r=!0;else e.issues.push(t);let a=[...i].filter(([,e])=>e.l&&e.r).map(([e])=>e);if(a.length&&n&&e.issues.push({...n,keys:a}),$(e))return e;let s=function e(t,r){if(t===r||t instanceof Date&&r instanceof Date&&+t==+r)return{valid:!0,data:t};if(j(t)&&j(r)){let n=Object.keys(r),i=Object.keys(t).filter(e=>-1!==n.indexOf(e)),a={...t,...r};for(let n of i){let i=e(t[n],r[n]);if(!i.valid)return{valid:!1,mergeErrorPath:[n,...i.mergeErrorPath]};a[n]=i.data}return{valid:!0,data:a}}if(Array.isArray(t)&&Array.isArray(r)){if(t.length!==r.length)return{valid:!1,mergeErrorPath:[]};let n=[];for(let i=0;i<t.length;i++){let a=e(t[i],r[i]);if(!a.valid)return{valid:!1,mergeErrorPath:[i,...a.mergeErrorPath]};n.push(a.data)}return{valid:!0,data:n}}return{valid:!1,mergeErrorPath:[]}}(t.value,r.value);if(!s.valid)throw Error(`Unmergable intersection. Error path: ${JSON.stringify(s.mergeErrorPath)}`);return e.value=s.data,e}let ea=f("$ZodRecord",(e,t)=>{V.init(e,t),e._zod.parse=(r,n)=>{let i=r.value;if(!j(i))return r.issues.push({expected:"record",code:"invalid_type",input:i,inst:e}),r;let a=[],s=t.keyType._zod.values;if(s){let o;r.value={};let l=new Set;for(let e of s)if("string"==typeof e||"number"==typeof e||"symbol"==typeof e){l.add("number"==typeof e?e.toString():e);let s=t.valueType._zod.run({value:i[e],issues:[]},n);s instanceof Promise?a.push(s.then(t=>{t.issues.length&&r.issues.push(...M(e,t.issues)),r.value[e]=t.value})):(s.issues.length&&r.issues.push(...M(e,s.issues)),r.value[e]=s.value)}for(let e in i)l.has(e)||(o=o??[]).push(e);o&&o.length>0&&r.issues.push({code:"unrecognized_keys",input:i,inst:e,keys:o})}else for(let s of(r.value={},Reflect.ownKeys(i))){if("__proto__"===s)continue;let o=t.keyType._zod.run({value:s,issues:[]},n);if(o instanceof Promise)throw Error("Async schemas not supported in object keys currently");if("string"==typeof s&&W.test(s)&&o.issues.length){let e=t.keyType._zod.run({value:Number(s),issues:[]},n);if(e instanceof Promise)throw Error("Async schemas not supported in object keys currently");0===e.issues.length&&(o=e)}if(o.issues.length){"loose"===t.mode?r.value[s]=i[s]:r.issues.push({code:"invalid_key",origin:"record",issues:o.issues.map(e=>O(e,n,m())),input:s,path:[s],inst:e});continue}let l=t.valueType._zod.run({value:i[s],issues:[]},n);l instanceof Promise?a.push(l.then(e=>{e.issues.length&&r.issues.push(...M(s,e.issues)),r.value[o.value]=e.value})):(l.issues.length&&r.issues.push(...M(s,l.issues)),r.value[o.value]=l.value)}return a.length?Promise.all(a).then(()=>r):r}}),es=f("$ZodLiteral",(e,t)=>{if(V.init(e,t),0===t.values.length)throw Error("Cannot create literal schema with no valid values");let r=new Set(t.values);e._zod.values=r,e._zod.pattern=RegExp(`^(${t.values.map(e=>"string"==typeof e?S(e):e?S(e.toString()):String(e)).join("|")})$`),e._zod.parse=(n,i)=>{let a=n.value;return r.has(a)||n.issues.push({code:"invalid_value",values:t.values,input:a,inst:e}),n}});function eo(e,t){return e.issues.length&&void 0===t?{issues:[],value:void 0}:e}let el=f("$ZodOptional",(e,t)=>{V.init(e,t),e._zod.optin="optional",e._zod.optout="optional",x(e._zod,"values",()=>t.innerType._zod.values?new Set([...t.innerType._zod.values,void 0]):void 0),x(e._zod,"pattern",()=>{let e=t.innerType._zod.pattern;return e?RegExp(`^(${v(e.source)})?$`):void 0}),e._zod.parse=(e,r)=>{if("optional"===t.innerType._zod.optin){let n=t.innerType._zod.run(e,r);return n instanceof Promise?n.then(t=>eo(t,e.value)):eo(n,e.value)}return void 0===e.value?e:t.innerType._zod.run(e,r)}});Symbol("ZodOutput"),Symbol("ZodInput");(r=globalThis).__zod_globalRegistry??(r.__zod_globalRegistry=new class e{constructor(){this._map=new WeakMap,this._idmap=new Map}add(e,...t){let r=t[0];return this._map.set(e,r),r&&"object"==typeof r&&"id"in r&&this._idmap.set(r.id,e),this}clear(){return this._map=new WeakMap,this._idmap=new Map,this}remove(e){let t=this._map.get(e);return t&&"object"==typeof t&&"id"in t&&this._idmap.delete(t.id),this._map.delete(e),this}get(e){let t=e._zod.parent;if(t){let r={...this.get(t)??{}};delete r.id;let n={...r,...this._map.get(e)};return Object.keys(n).length?n:void 0}return this._map.get(e)}has(e){return this._map.has(e)}});let ed=f("ZodMiniType",(e,t)=>{if(!e._zod)throw Error("Uninitialized schema in ZodMiniType.");V.init(e,t),e.def=t,e.type=t.type,e.parse=(t,r)=>I(e,t,r,{callee:e.parse}),e.safeParse=(t,r)=>D(e,t,r),e.parseAsync=async(t,r)=>T(e,t,r,{callee:e.parseAsync}),e.safeParseAsync=async(t,r)=>q(e,t,r),e.check=(...r)=>e.clone({...t,checks:[...t.checks??[],...r.map(e=>"function"==typeof e?{_zod:{check:e,def:{check:"custom"},onattach:[]}}:e)]},{parent:!0}),e.with=e.check,e.clone=(t,r)=>{let n;return n=new e._zod.constr(t??e._zod.def),(!t||r?.parent)&&(n._zod.parent=e),n},e.brand=()=>e,e.register=(t,r)=>(t.add(e,r),e),e.apply=t=>t(e)}),ec=f("ZodMiniString",(e,t)=>{F.init(e,t),ed.init(e,t)});function ep(e){return new ec({type:"string",...C(e)})}let eu=f("ZodMiniNumber",(e,t)=>{J.init(e,t),ed.init(e,t)});function e_(e){return new eu({type:"number",checks:[],...C(e)})}let eg=f("ZodMiniBoolean",(e,t)=>{K.init(e,t),ed.init(e,t)});function ef(e){return new eg({type:"boolean",...C(e)})}let eb=f("ZodMiniNull",(e,t)=>{Q.init(e,t),ed.init(e,t)});function eh(e){return new eb({type:"null",...C(e)})}let em=f("ZodMiniUnknown",(e,t)=>{G.init(e,t),ed.init(e,t)}),ey=f("ZodMiniArray",(e,t)=>{X.init(e,t),ed.init(e,t)});function ev(e,t){return new ey({type:"array",element:e,...C(t)})}let ew=f("ZodMiniObject",(e,t)=>{ee.init(e,t),ed.init(e,t),x(e,"shape",()=>t.shape)});function ex(e,t){return new ew({type:"object",shape:e??{},...C(t)})}let ek=f("ZodMiniUnion",(e,t)=>{er.init(e,t),ed.init(e,t)});function ez(e,t){return new ek({type:"union",options:e,...C(t)})}let ej=f("ZodMiniIntersection",(e,t)=>{en.init(e,t),ed.init(e,t)});function eS(e,t){return new ej({type:"intersection",left:e,right:t})}let eC=f("ZodMiniRecord",(e,t)=>{ea.init(e,t),ed.init(e,t)});function e$(e,t,r){return new eC({type:"record",keyType:e,valueType:t,...C(r)})}let eM=f("ZodMiniLiteral",(e,t)=>{es.init(e,t),ed.init(e,t)});function eP(e,t){return new eM({type:"literal",values:Array.isArray(e)?e:[e],...C(t)})}let eO=f("ZodMiniOptional",(e,t)=>{el.init(e,t),ed.init(e,t)});function eA(e){return new eO({type:"optional",innerType:e})}let eE=ez([eP("account_set_password"),eP("account_set_active")]),eN=ez([eP("waiting_transport"),eP("waiting_identity"),eP("reading"),eP("configuring"),eP("verifying"),eP("waiting_inform"),eP("ready"),eP("retry_wait"),eP("manual_required"),eP("not_configured"),eP("waiting_acs"),eP("awaiting_apply"),eP("discovering_management_wan"),eP("configuring_management_wan"),eP("verifying_management_wan")]),eR=ex({enabled:ef(),listen:ez([ep(),eh()]),path:ez([ep(),eh()]),error:ez([ep(),eh()])}),eI=ex({vlan:e_(),vlans:ev(e_()),priority:e_(),acs_url:ep()}),eT=ex({state:eN,optical_sn:ep(),cwmp_id:ep(),mqtt_target:ez([ep(),eh()]),binding_source:ep(),method:ep(),desired_version:ep(),generation:e_(),reason:ep(),attempts:e_(),next_retry_at:e_(),updated_at:e_(),settings_verified_at:ez([e_(),eh()]),selected_vlan:ez([e_(),eh()]),last_inform:ez([e_(),eh()]),expected_acs_url:ep(),last_error:ez([ep(),eh()]),transport_epoch:e_(),completed_authorization:e_(),connection_request_enabled:ez([ef(),eh()]),inflight:ef(),persistence_error:ez([ep(),eh()]),link_identity_error:ez([ep(),eh()]),listener:eR,mqtt_last_seen:ez([e_(),eh()]),desired:eA(eI),endpoint_notice:eA(ep()),manual_steps:eA(ev(ep()))}),eD=ez([eP("not_required"),eP("pending"),eP("unavailable")]),eL=ez([eT,ex({state:eD,reason:ep()})]),eq=ex({id:ep(),name:ep()}),eW=ex({omci:ev(eq),bootstrap:ev(eq),provisioning:ev(eq)}),eB=ex({configured:ep(),effective:ep(),available:ev(ep()),reason:ep()}),eZ=ex({phase:ez([eP("not_started"),eP("collecting_identity"),eP("retrying_identity"),eP("unsupported"),eP("configuring"),eP("verifying"),eP("wan_bootstrap_pending"),eP("verified"),eP("retrying"),eP("offline")]),generation:e_(),error:ez([ep(),eh()])}),eU=ez([eP("auto"),eP("factory"),eP("firmware"),eP("builtin")]),eV=ez([eP("factory"),eP("firmware"),eP("builtin")]),eF=ex({source:eV,raw_sha256:ep(),effective_sha256:ep(),size:e_(),supplemented:ef(),temperature_compensation_enabled:ef()}),eJ=ex({enabled:ef(),reason:ep(),calibration_sha256:ez([ep(),eh()]),raw_temperature:ez([e_(),eh()]),table_index:ez([e_(),eh()]),target_code:ez([e_(),eh()]),last_check_unix:ez([e_(),eh()]),last_write_unix:ez([e_(),eh()]),error:ez([ep(),eh()])}),eK=ex({selected:eU,candidate:ez([eF,eh()]),candidate_error:ez([ep(),eh()]),active:ez([eF,eh()]),hardware_applied:ef(),pending:ef(),temperature_compensation:eJ});ex({success:ef(),state:eA(eK),output:eA(ep()),error:eA(ep())});let eQ=ex({detected:ef(),device:ep(),has_data:ef(),sha256:ep(),data:ep()}),eG=ex({exists:ef(),path:ep(),size:e_(),sha256:ep(),data:ep()}),eH=ex({source:eV,active_path:ep(),size:e_(),sha256:ep(),data:ep(),factory:eQ,firmware:eG,state:eA(eK)}),eX=ex({error:ep()});ez([eH,eX]);let eY=ex({success:ef(),path:ep(),size:e_(),sha256:ep()});ez([eY,eX]),ex({data:ep()}),ex({source:eU});let e0=ex({acs:ef(),mqtt:ef(),npu:ef(),"device-hl202":ef(),"device-hwtc":ef(),"device-star":ef(),"device-zte":ef(),"device-scty":ef()}),e1=ex({optical:ef(),bridge_offload:ef(),omci_mib:ef(),mqtt_telemetry:ef(),hl202_management:ef(),cwmp:ef(),command_provisioning:ef()}),e2=ex({status:ef(),config:ef(),sync:ef(),hardware:ef(),calibration:ef(),hl202:ef(),about:ef()}),e5=ex({schema_version:eP(1),version:ep(),features:e0,functions:e1,pages:e2,adapters:eW}),e8=ez([ex({valid:eP(!0),revision:ep(),devices:e_()}),ex({error:ep()})]),e3=ez([eP("disabled"),eP("waiting"),eP("wan_reconciling"),eP("wan_verifying"),eP("wifi_reconciling"),eP("discovering"),eP("reading"),eP("disabling"),eP("disabling_read"),eP("writing"),eP("verifying"),eP("settling"),eP("completed"),eP("not_started"),eP("reset_pending"),eP("interrupted"),eP("recovering"),eP("waiting_management"),eP("waiting_task")]),e4=ex({operation_id:e_(),device:ep(),state:e3,started_at:e_()}),e6=ex({state:ez([eP("waiting"),eP("applied")]),requested_revision:ep(),requested_at:ez([e_(),eh()]),blocking_operations:ev(e4),reset_pending:ef()}),e7=ez([eP("auto"),eP("manual")]),e9=eP("diff"),te=ex({state:ep(),enabled:ef(),reason:eA(ez([ep(),eh()])),revision:eA(ep()),vlan:eA(e_()),updated_at:eA(e_())}),tt=ez([eP("disabled"),eP("online"),eP("waiting_inform"),eP("offline_or_stale"),eP("waiting_transport")]),tr=ex({cwmp_id:ep(),state:tt,optical_online:ef(),last_inform:ez([e_(),eh()]),age_seconds:ez([e_(),eh()])}),tn=ex({state:tt,optical_online:ef()}),ti=ez([eP("device_service"),eP("ssid"),eP("port_binding"),eP("wan_activation")]),ta=ex({name:ep(),desired:ep()}),ts=ex({id:ep(),name:eA(ez([ep(),eh()])),kind:ti,service_type:ep(),state:ep(),reason:eA(ep()),revision:eA(ep()),current_revision:eA(ef()),management_fresh:eA(ef()),operation_id:eA(e_()),task_id:eA(ez([e_(),eh()])),updated_at:eA(e_()),changes:eA(ev(ta))}),to=ez([eP("plan"),eP("apply")]),tl=ex({wan:ep(),wlan:ep(),binding:ep()}),td=ex({state:ep(),requested:ep(),contract:ez([ep(),eh()]),reason:ep(),cache_hit:ef(),schema:ep(),capabilities:ez([tl,eh()])}),tc=ex({parent:e_(),connection:e_(),state:ep(),service_list:ep(),kind:ep(),baseline:ez([ev(e_()),eh()])}),tp=ex({state:ep(),reason:eA(ep()),task_id:eA(ez([e_(),eh()])),instance:eA(e_()),cwmp_id:eA(ep())}),tu=ez([eP("waiting"),eP("inventory"),eP("classifying"),eP("adding_parent"),eP("child_names"),eP("adding_child"),eP("delete_guard"),eP("deleting"),eP("verify_delete"),eP("empty_parent"),eP("deleting_parent"),eP("verify_parent_delete"),eP("next"),eP("done")]),t_=ex({owned:ev(e_()),pending:ez([ep(),eh()]),pending_instance:ez([e_(),eh()])}),tg=ez([eP("waiting"),eP("inventory"),eP("adding"),eP("verify_add"),eP("deleting"),eP("verify_delete"),eP("reading_disable"),eP("disabling"),eP("verifying_disable"),eP("next"),eP("done")]),tf=ez([eP("disable"),eP("preserve"),eP("delete")]),tb=ex({parent:e_(),child:e_(),service:ep(),vlan:ep()}),th=ex({state:e3,items:ev(ts),omci_adapter:eA(ep()),bootstrap_adapter:eA(ep()),provisioning_adapter:eA(ep()),backend:eA(eB),operation_id:eA(e_()),device:eA(ep()),optical_sn:eA(ep()),cwmp_id:eA(ep()),revision:eA(ep()),mode:eA(to),started_at:eA(e_()),completed_at:eA(ez([e_(),eh()])),current_revision:eA(ef()),management_fresh:eA(ef()),reason:eA(ep()),error:eA(ep()),attempts:eA(e_()),next_retry_at:eA(e_()),reconcile_reason:eA(ep()),cwmp_contract:eA(td),wan_objects:eA(e$(ep(),tc)),wan_lifecycle:eA(e$(ep(),tp)),wan_stage:eA(tu),wifi_objects:eA(t_),wifi_lifecycle:eA(e$(ep(),tp)),wifi_stage:eA(tg),wifi_cleanup:eA(tf),native_ownership:eA(e$(ep(),tb)),write_performed:eA(ef()),readback_verified:eA(ef())}),tm=ez([eP("disabled"),eP("not_configured"),eP("stale_revision"),eP("stale_management"),eP("verified"),eP("attention_required"),eP("accepted_unverified"),eP("pending"),eP("recovering"),eP("waiting_management")]),ty=ex({device:ep(),name:ez([ep(),eh()]),group:ez([ep(),eh()]),group_name:ez([ep(),eh()]),template:ez([ep(),eh()]),template_name:ez([ep(),eh()]),optical_sn:ep(),omci_adapter:ep(),bootstrap_adapter:ep(),provisioning_adapter:ep(),omci_management:te,management:ez([tr,eh()]),mqtt:ez([tn,eh()]),acs_bootstrap:eL,provisioning:th,services:ev(ts),ssids:ev(ts),wifi_sync:tm}),tv=ez([eP("discovering"),eP("comparing"),eP("planning"),eP("applying"),eP("verifying"),eP("configuring_listener"),eP("cleaning_previous"),eP("waiting_devices"),eP("ready"),eP("awaiting_apply"),eP("verified"),eP("blocked"),eP("retry_wait")]),tw=ex({enabled:ef(),mode:e7,vlan:ev(e_()),priority:e_(),address:ep(),acs_url:ep(),port:e_(),path:ep(),dhcp_enabled:ef()}),tx=ex({operation:ep(),key:ep(),value:ev(ep())}),tk=ex({state:tv,error:ez([ep(),eh()]),inflight:ef(),ready:ef(),desired_version:ez([ep(),eh()]),applied_version:ez([ep(),eh()]),next_retry_at:e_(),attempts:e_(),desired:ez([tw,eh()]),applied:ez([tw,eh()]),previous:ez([tw,eh()]),plan:ev(tx)}),tz=ex({desired:ez([eI,eh()]),state:ep()}),tj=ex({id:ep(),name:ez([ep(),eh()]),template:ep()}),tS=ex({enabled:ef(),mode:e7,method:e9,revision:ep(),triggers:ev(ep()),interval_minutes:e_(),error:ez([ep(),eh()]),devices:ev(ty),management_network:tk,omci_management:tz,groups:ev(tj),pending_devices:ev(ep()),onu_pins:eA(e$(ep(),e_())),config_error:eA(ez([ep(),eh()])),config_load:eA(e6)});ez([tS,eX]);let tC=ex({enabled:ez([ef(),eh()]),routed_enabled:ez([ef(),eh()]),bridge_enabled:ez([ef(),eh()]),engine_attached:ez([ef(),eh()]),forwarding_verified:ez([ef(),eh()])}),t$=ex({entity_id:e_(),port_id:ez([e_(),eh()])}),tM=ex({entity_id:e_(),filter_list_hex:ez([ep(),eh()]),forward_operation:ez([e_(),eh()]),number_of_entries:ez([e_(),eh()])}),tP=ex({entity_id:e_(),received_frame_rules_hex:ez([ev(ep()),eh()]),error:ez([ep(),eh()])}),tO=ex({age_seconds:e_(),gem_ports:ev(t$),vlan_filters:ev(tM),vlan_operations:ev(tP)}),tA=ex({source:ep(),unit:ep(),reason:ez([ep(),eh()]),raw:ez([ep(),eh()]),age_seconds:ez([e_(),eh()])}),tE=ex({interface:ep(),gem_ports:ez([ev(e_()),eh()]),vlan_id:ez([e_(),eh()]),onu_inventory:ez([tO,eh()]),tx_bytes:ez([e_(),eh()]),rx_bytes:ez([e_(),eh()]),current_tx_kbps:ez([e_(),eh()]),current_rx_kbps:ez([e_(),eh()]),olt_channel_gem:eA(e_()),forwarding_verified:eA(ef()),offload:tC,measurements:e$(ep(),tA)});ex({});let tN=ex({entity_id:e_(),interval_end_time:e_(),corrected_bytes:e_(),corrected_code_words:e_(),uncorrectable_code_words:e_(),total_code_words:e_(),fec_seconds:e_()}),tR=ex({ani_entity_id:ez([e_(),eh()]),control_supported:ef(),downstream_enabled:ez([ef(),eh()]),upstream_enabled:ez([ef(),eh()]),downstream_pm:ez([tN,eh()]),measurement:tA}),tI=ex({entry:ez([eP(0),eP(1),eP(2)]),username:ep(),active:ef()}),tT=ex({mqtt_mac:ep(),optical_sn:ez([ep(),eh()]),onu_id:ez([e_(),eh()]),binding_generation:ep(),last_seen:e_(),reason:ep()}),tD=ez([eP("executed"),eP("dispatched"),eP("timeout"),eP("error")]),tL=ex({target:ep(),status:tD,request_id:eA(ep()),exit_code:eA(e_()),output:eA(ep()),output_truncated:ef(),error:eA(ep())}),tq=ex({target:tT,result:tL,binding_current:ef()}),tW=ez([eP("not_applicable"),eP("accepted_and_saved"),eP("unconfirmed")]),tB=ex({code:ep(),message:ep()});ez([ex({schema_version:eP(1),operation:tq,accounts:ez([ev(tI),eh()]),write_status:tW}),ex({schema_version:e_(),error:tB})]);let tZ=ex({optical_sn:ep(),onu_id:e_(),binding_generation:ep()}),tU=ex({mqtt_mac:ep(),binding_generation:ep()}),tV=ez([tZ,tU]);ex({target:tV});let tF=ez([ex({kind:eP("exec"),script:ep(),timeout_seconds:e_()}),ex({kind:eP("accounts_read")}),ex({kind:eP("account_set_password"),entry:e_(),password:ep()}),ex({kind:eP("account_set_active"),entry:e_(),active:ef()})]),tJ=ex({schema_version:e_(),target:tZ,action:tF}),tK=ex({optical_sn:ep(),onu_id:e_(),model:ep(),optical_online:ef(),can_execute:ef(),mqtt:ez([tT,eh()]),report_revision:ez([e_(),eh()])});ez([ex({schema_version:eP(1),operation:tq}),ex({schema_version:e_(),error:tB})]),ex({target:tV,script:ep(),timeout_seconds:e_()});let tQ=ez([ex({schema_version:eP(1),devices:ev(tK),sources:ev(tT)}),ex({schema_version:e_(),error:tB})]);ez([ex({method:eP("list")}),ex({method:eP("report"),target:tZ}),ex({method:eP("source_report"),target:tU}),ex({method:eP("run"),request:tJ})]);let tG=ez([eP("received"),eP("report_unavailable")]),tH=ex({value:new em({type:"unknown"}),member:ep(),unit:ez([ep(),eh()])}),tX=ex({name:ep(),bytes:e_(),encoding:ep(),text:ez([ep(),eh()]),text_omitted:ef()}),tY=ex({schema_version:e_(),compressed_bytes:e_(),decompressed_bytes:e_(),fields:e$(ep(),tH),members:ev(tX),errors:ev(ep())}),t0=ex({revision:e_(),last_received:e_(),last_processed_receipt:ez([e_(),eh()]),last_good:ez([e_(),eh()]),error:ez([ep(),eh()]),report:ez([tY,eh()])});ez([ex({schema_version:eP(1),target:tT,report:ez([t0,eh()]),state:tG}),ex({schema_version:eP(1),target:tT,report:ez([t0,eh()]),read_only:eP(!0)}),ex({schema_version:e_(),error:tB})]),ex({target:tV}),ex({target:tV,kind:eE,entry:e_(),password:ep(),active:ef()});let t1=ex({accepted:e_(),rejected:e_(),read_errors:e_(),handled:e_(),max_intake_us:e_(),max_handler_us:e_()}),t2=eP("pending"),t5=ex({phase:ez([eP("starting"),eP("upload"),eP("tables")]),received:e_(),expected:ez([e_(),eh()])}),t8=eP("ready"),t3=ez([ex({status:t2,progress:eA(t5)}),ex({status:t8,chunk:e_(),chunks:e_(),bytes:e_(),data:ep()})]);ez([t3,eX]);let t4=ex({status:t2,job:ep()}),t6=ex({released:ef()});ex({job:ep()}),ex({job:ep(),chunk:e_()}),ez([t4,eX]);let t7=ex({accepting:ef(),running:e_(),stored:e_(),bytes:e_(),running_limit:e_(),stored_limit:e_(),bytes_limit:e_(),result_bytes_limit:e_()}),t9=ex({mac:ep(),ip:ep(),band:ep(),rssi_dbm:ez([e_(),eh()]),rx_rate_mbps:ez([e_(),eh()]),tx_rate_mbps:ez([e_(),eh()])}),re=ez([eP("unknown"),eP("octets"),eP("string"),eP("unsigned_integer"),eP("table"),eP("signed_integer"),eP("pointer"),eP("bit_field"),eP("enumeration"),eP("counter")]),rt=ex({id:ep(),url:ep()}),rr=ex({name:ep(),kind:re,index:e_(),mask:e_(),size:e_(),read:ef(),write:ef(),set_by_create:ef(),avc:ef(),optional:ef(),deprecated:ef(),default_hex:ez([ep(),eh()]),reference:rt}),rn=ez([ex({type:eP("unsigned"),value:e_()}),ex({type:eP("signed"),value:e_()}),ex({type:eP("decimal"),value:ep()}),ex({type:eP("text"),value:ez([ep(),eh()])}),ex({type:eP("octets"),hex:ep()}),ex({type:eP("table_length"),bytes:e_()})]),ri=ex({raw_hex:ep(),value:rn,sequences:ev(e_())}),ra=ex({definition:rr,value:ez([rn,eh()]),observations:ev(ri)}),rs=ez([eP("layout"),eP("name_only"),eP("unknown")]),ro=ex({class_id:e_(),name:ez([ep(),eh()]),entities:e_(),records:e_(),support:rs}),rl=ex({code:ep(),message:ep(),offset:e_(),mask:e_()}),rd=ex({class_id:e_(),entity_id:e_(),name:ez([ep(),eh()]),support:rs,reference:ez([rt,eh()]),sequences:ev(e_()),attributes:ev(ra),diagnostics:ev(rl)}),rc=eP("ready"),rp=ex({class_id:e_(),entity_id:e_(),sequence:e_(),attribute_mask:e_(),raw_hex:ep(),consumed:e_(),remaining_hex:ep(),undecoded_mask:e_()}),ru=ex({raw_hex:ep(),filter_outer_priority:e_(),filter_outer_vid:e_(),filter_outer_tpid_dei:e_(),filter_inner_priority:e_(),filter_inner_vid:e_(),filter_inner_tpid_dei:e_(),filter_ethertype:e_(),tags_to_remove:e_(),treatment_outer_priority:e_(),treatment_outer_vid:e_(),treatment_outer_tpid_dei:e_(),treatment_inner_priority:e_(),treatment_inner_vid:e_(),treatment_inner_tpid_dei:e_(),delete_entry:ef()}),r_=ex({class_id:e_(),entity_id:e_(),attribute:rr,collected:ef(),error:ez([ep(),eh()]),raw_hex:ep(),rows:ev(ep()),vlan_rules:ev(ru)}),rg=ex({schema_version:eP(1),reference_version:ep(),onu_id:ez([e_(),eh()]),uploaded_complete:ef(),expected_records:e_(),received_records:e_(),decoded_records:e_(),partial_records:e_(),basic_records:e_(),tables_requested:ef(),tables_collected:ef(),classes:ev(ro),entities:ev(rd),records:ev(rp),tables:ev(r_),diagnostics:ev(rl)}),rf=ex({status:rc,report:rg});ex({onu_id:e_(),optical_sn:ep(),tables:ef()});let rb=ez([ex({status:eP("success"),enabled:ef()}),ex({status:eP("error"),error:ep()})]);ex({enabled:ef(),bridge:ep(),wan_upstream:ef(),wan_downstream:ef(),onu_bridge:ef()});let rh=ex({index:ep(),state:ep(),pkt_type:ep(),orig_tuple:ep(),new_tuple:ep(),eth:ep(),vlan:ep(),packets:e_(),bytes:e_(),counters_valid:ef(),packets_exact:ep(),bytes_exact:ep()}),rm=ex({sampled_at_ms:e_(),errors:ev(ep()),config_valid:ef(),engine_valid:ef(),mask_valid:ef(),routed_mask_valid:ef(),debug_valid:ef(),flows_valid:ef(),entries_valid:ef(),counters_valid:ef(),hooks_valid:ef(),total_packets_exact:ep(),total_bytes_exact:ep(),supported:ef(),engine_attached:ef(),bridge_offload_enabled:ef(),wan_upstream:ef(),wan_downstream:ef(),onu_bridge:ef(),bridge_offload_mask:e_(),routed_offload_mask:e_(),bridge_offload_debug:ef(),bridge:ep(),active_ports:ev(ep()),fw4_hooks_ready:ef(),total_entries:e_(),bound_entries:e_(),bound_ipv4_entries:e_(),bound_ipv6_entries:e_(),total_packets:e_(),total_bytes:e_(),bound_flows:ev(rh)}),ry=ex({equipment_id:ez([ep(),eh()]),hardware_version:ez([ep(),eh()]),software_images:ev(ep()),omcc_version:ez([e_(),eh()]),errors:ev(ep())}),rv=ex({desired:e$(ep(),e_()),active:e$(ep(),e_()),pending_restart:ef(),allocation_blocked:ef(),startup_error:ez([ep(),eh()]),config_error:ez([ep(),eh()])}),rw=ez([eP("optical_on"),eP("optical_off"),eP("optical_status"),eP("optical_reload"),eP("optical_reinitialize"),eP("optical_shutdown")]),rx=ex({enabled:ef(),downstream_tx_enabled:ef(),fec_enabled:ef()}),rk=ex({desired_tx_enabled:ef(),desired_fec_enabled:ef(),register:ez([e_(),eh()]),tx_enabled:ez([ef(),eh()]),fec_enabled:ez([ef(),eh()]),error:ez([ep(),eh()])}),rz=ez([eP("success"),eP("error")]),rj=ez([eP("enabled"),eP("disabled"),eP("unknown")]),rS=ex({settings:eA(rx),pon_mac:eA(rk),schema_version:eP(1),status:rz,action:rw,desired_enabled:ez([ef(),eh()]),tx_enabled:ez([ef(),eh()]),actor_state:rj,hardware_ready:ef(),discovery_active:ef(),cleanup_pending:ef(),error:ez([tB,eh()])}),rC=ex({calibration_sha256:eA(ep()),calibration_applied:ef(),model:ep(),wavelength_tx_nm:e_(),wavelength_rx_nm:e_(),phy_rate_downlink_gbps:e_(),phy_rate_uplink_gbps:e_(),tx_power_dbm:ez([e_(),eh()]),laser_bias_current_ma:ez([e_(),eh()]),temperature_celsius:ez([e_(),eh()]),vcc_voltage:ez([e_(),eh()]),cdr_locked:ez([ef(),eh()]),tx_enabled:eA(ef()),measurements:e$(ep(),tA)}),r$=eP("ux3326"),rM=eP("selected"),rP=ex({onu_id:e_(),interface:ez([ep(),eh()])}),rO=ex({optical_control:ef(),transceiver_telemetry:ef(),fpga_diagnostics:ef(),bosa_diagnostics:ef(),calibration_profile:ez([r$,eh()]),npu_offload:ef(),omci_mib:ef(),downstream_fec:ef()}),rA=ex({schema_version:eP(1),selection:rM,platform_id:ep(),vendor:ep(),model:ep(),onus:ev(rP),operations:rO}),rE=ez([eP("o1_initial"),eP("o2_standby"),eP("o3_serial_number"),eP("o4_ranging"),eP("o5_operation"),eP("o6_intermittent_lods"),eP("o7_emergency_stop")]),rN=ex({restarting:eP(!0)}),rR=ex({calls:e_(),failures:e_(),last_us:e_(),max_us:e_(),total_us:e_()}),rI=ex({port:e_(),interface:ep(),carrier:ef(),status:ep(),onu_id:eA(e_()),onu_sn:eA(ep()),link_state:ep(),reserved_sn:eA(ep())}),rT=ex({channel_2g:ez([e_(),eh()]),channel_5g:ez([e_(),eh()]),bandwidth_5g:ez([ep(),eh()]),tx_power_pct:ez([e_(),eh()]),measurements:e$(ep(),tA)}),rD=ex({onu_id:e_(),vendor:ep(),model:ep(),serial_number:ep(),state:rE,business_status:eZ,management:ez([tr,eh()]),provisioning:ez([th,eh()]),services:ev(ts),ssids:ev(ts),wifi_sync:tm,identity:ez([ry,eh()]),identity_age_seconds:ez([e_(),eh()]),identity_current:ef(),fiber_distance_m:ez([e_(),eh()]),ranging_delay_rtd_ns:ez([e_(),eh()]),equalization_delay_bits:ez([e_(),eh()]),optical_rx_power_dbm:ez([e_(),eh()]),optical_tx_power_dbm:ez([e_(),eh()]),firmware_version:ep(),hardware_version:ep(),uptime_seconds:ez([e_(),eh()]),fec:eA(tR),data_path:tE,wifi_mesh:rT,connected_clients:ez([ev(t9),eh()]),measurements:e$(ep(),tA)}),rL=ex({id:ep(),last_seen_sec_ago:e_(),last_payload_bytes:e_()}),rq=ex({ubus:eA(e$(ep(),rR)),jobs:eA(t7),onu_pinning:eA(rv),fpga_status:ep(),pon_mac:eA(rk),provisioning:ez([tS,eh()]),optical_transceiver:rC,switch_ports:ev(rI),sub_gateways:ev(rD),telemetry_gateways:ev(rL),npu:eA(rm),ipc:eA(t1)}),rW=ez([eP("plan"),eP("apply"),eP("management_plan"),eP("management_apply"),eP("reset_state"),eP("reconcile"),eP("retry")]),rB=ez([ex({operation_ids:ev(e_()),revision:ep()}),ex({started:eP(!0),mode:to}),ex({reset:eP(!0),device:ep()}),ex({operation_ids:ev(e_()),mode:to,reconcile:eA(ef()),retry:eA(ef())}),eX]);ex({action:rW,target:ep(),management:eA(ef()),item:eA(ep())});let rZ=ez([eP("none"),eP("effective"),eP("pending_add"),eP("pending_change"),eP("pending_remove")]),rU=ex({active_onu_id:ez([e_(),eh()]),desired_onu_id:ez([e_(),eh()]),state:rZ,pending_restart:ef()}),rV=ez([eP("pon_logical"),eP("associated_with"),eP("learned_behind")]),rF=ex({id:ep(),mac:ep(),hostname:ez([ep(),eh()]),addresses:ev(ep()),relation:rV,source:ep(),interface:ez([ep(),eh()])}),rJ=ez([eP("ok"),eP("partial"),eP("unavailable")]),rK=ex({id:ep(),state:rJ,sampled_at:e_(),reason:ez([ep(),eh()])}),rQ=ez([eP("snapshot_expired"),eP("node_not_found"),eP("invalid_cursor")]),rG=ez([ex({status:eP("ok"),snapshot_id:ep(),parent_node_id:ep(),clients:ev(rF),associated_client_count:ez([e_(),eh()]),learned_host_count:ez([e_(),eh()]),complete:ef(),next_cursor:ez([ep(),eh()]),sources:ev(rK)}),ex({status:eP("error"),code:rQ})]);ex({node_id:ep(),snapshot_id:eA(ep()),cursor:eA(ep()),limit:eA(e_())});let rH=ex({model:ep(),wavelength_tx_nm:e_(),wavelength_rx_nm:e_(),nominal_downlink_gbps:e_(),nominal_uplink_gbps:e_(),tx_power_dbm:ez([e_(),eh()]),laser_bias_current_ma:ez([e_(),eh()]),temperature_celsius:ez([e_(),eh()]),vcc_voltage:ez([e_(),eh()]),tx_enabled:ez([ef(),eh()]),measurements:e$(ep(),tA)}),rX=ex({name:ep(),mac:ez([ep(),eh()]),carrier:ez([ef(),eh()]),speed_mbps:ez([e_(),eh()]),duplex:ez([ep(),eh()]),bridge_members:ev(ep()),addresses:ev(ep())}),rY=ex({interface:ep(),device:ez([ep(),eh()]),protocol:ez([ep(),eh()]),up:ef(),addresses:ev(ep())}),r0=ex({model:ez([ep(),eh()]),firmware_version:ez([ep(),eh()]),uptime_seconds:ez([e_(),eh()]),fpga_status:ep(),optical:rH,interfaces:ev(rX),uplinks:ev(rY)}),r1=ex({observer_node_id:ep(),rx_bytes:ez([e_(),eh()]),tx_bytes:ez([e_(),eh()]),current_rx_kbps:ez([e_(),eh()]),current_tx_kbps:ez([e_(),eh()]),onu_inventory:ez([tO,eh()]),offload:tC,measurements:e$(ep(),tA)}),r2=ex({report_revision:e_(),binding_generation:ep(),age_seconds:e_(),ip:ez([ep(),eh()]),bridge_ip:ez([ep(),eh()]),mac:ez([ep(),eh()]),connection_type_raw:ez([ep(),eh()]),uptime_seconds:ez([e_(),eh()]),cpu_usage_raw:ez([e_(),eh()]),memory_usage_raw:ez([e_(),eh()])}),r5=ex({hl202:ez([r2,eh()])}),r8=ex({code:ep(),node_id:ez([ep(),eh()])}),r3=ex({id:ep(),source:ep(),target:ep(),relation:rV,data_interface:ez([ep(),eh()]),carrier:ez([ef(),eh()]),onu_rx_power_dbm:ez([e_(),eh()]),onu_tx_power_dbm:ez([e_(),eh()]),equalization_delay_bits:ez([e_(),eh()]),data_path:ez([r1,eh()]),measurements:e$(ep(),tA)}),r4=ex({serial_number:ez([ep(),eh()]),onu_id:ez([e_(),eh()]),vendor:ez([ep(),eh()]),model:ez([ep(),eh()]),hardware_version:ez([ep(),eh()]),firmware_version:ez([ep(),eh()]),registration:ez([rE,eh()]),business:ez([eZ,eh()]),management:ez([tr,eh()]),provisioning:ez([th,eh()]),services:ev(ts),ssids:ev(ts),wifi_sync:ez([tm,eh()]),identity:ez([ry,eh()]),identity_current:ef(),identity_age_seconds:ez([e_(),eh()]),uptime_seconds:ez([e_(),eh()]),fec:ez([tR,eh()]),binding:rU,extensions:r5,measurements:e$(ep(),tA)}),r6=ez([eS(ex({kind:eP("controller")}),r0),eS(ex({kind:eP("onu")}),r4)]),r7=ex({id:ep(),label:ep(),detail:r6}),r9=ez([ex({status:eP("ok"),snapshot_id:ep(),node:r7}),ex({status:eP("error"),code:rQ})]);ex({node_id:ep(),snapshot_id:eA(ep())});let ne=ex({schema_version:eP(1),snapshot_id:ep(),generated_at:e_(),snapshot_ttl_seconds:e_(),nodes:ev(r7),links:ev(r3),sources:ev(rK),issues:ev(r8)}),nt=ex({error:ez([ep(),ex({code:ep(),message:ep()})])});class nr extends Error{code;constructor(e,t){super(t),this.code=e,this.name="RpcError"}}function nn(e){let t=nt.safeParse(e);if(t.success){let e=t.data.error;throw"string"==typeof e?new nr("rpc",e):new nr(e.code,e.message)}return e}let ni={parse(e){let t=tQ.parse(nn(e));if("object"==typeof t&&null!==t&&"error"in t)throw nn(t),Error("Unexpected RPC error");return t}},na={parse(e){let t=rB.parse(nn(e));if("error"in t)throw Error(t.error);return t}};e$(ep(),ex({carrier:eA(ef()),mac:eA(ep()),link:eA(ex({speed:eA(e_()),duplex:eA(ep()),autoneg:eA(ef())})),stats:eA(e$(ep(),e_()))}));let ns={getCapabilities:{parse:e=>e5.parse(nn(e))},getPlatformInfo:{parse:e=>rA.parse(nn(e))},opticalStatus:rS,opticalSet:rS,getStatus:{parse:e=>rq.parse(nn(e))},getTopology:{parse:e=>ne.parse(nn(e))},getTopologyNode:{parse:e=>r9.parse(nn(e))},getTopologyClients:{parse:e=>rG.parse(nn(e))},getSync:{parse:e=>tS.parse(nn(e))},configCheck:{parse(e){if("object"==typeof e&&null!==e&&"error"in e&&("valid"in e||"revision"in e||"devices"in e))throw Error("Mixed configuration check result");return e8.parse(e)}},npuStatus:rm,configReload:{parse:e=>tS.parse(nn(e))},restartService:{parse:e=>rN.parse(nn(e))},sync:{parse:e=>na.parse(nn(e))},npuSet:rb,mibStart:{parse:e=>t4.parse(nn(e))},mibResult:{parse:e=>t3.parse(nn(e))},jobRelease:{parse:e=>t6.parse(nn(e))},hl202List:{parse:e=>ni.parse(nn(e))},hl202Report:{parse:e=>t4.parse(nn(e))},hl202AccountsStart:{parse:e=>t4.parse(nn(e))},hl202AccountUpdate:{parse:e=>t4.parse(nn(e))},hl202ExecStart:{parse:e=>t4.parse(nn(e))},jobResult:{parse:e=>t3.parse(nn(e))},getCalibration:{parse:e=>eH.parse(nn(e))},selectCalibration:{parse:e=>eH.parse(nn(e))},saveCalibration:{parse:e=>eY.parse(nn(e))},applyCalibration:{parse:e=>t4.parse(nn(e))}};function no(){var e;let t,r,i,a,s,o,l,d,c,p,u,g,f,b,h,m,y,v,w,x,k,z,j,S,C,$,M,P;return n??=(e=L.rpc,t=e.declare({object:"fttr",method:"get_capabilities",reject:!0}),r=e.declare({object:"fttr",method:"get_platform_info",reject:!0}),i=e.declare({object:"fttr",method:"optical_status",reject:!0}),a=e.declare({object:"fttr",method:"optical_set",params:["enabled","downstream_tx_enabled","fec_enabled"],reject:!0}),s=e.declare({object:"fttr",method:"get_status",reject:!0}),o=e.declare({object:"fttr",method:"get_topology",reject:!0}),l=e.declare({object:"fttr",method:"get_topology_node",params:["node_id","snapshot_id"],reject:!0}),d=e.declare({object:"fttr",method:"get_topology_clients",params:["node_id","snapshot_id","cursor","limit"],reject:!0}),c=e.declare({object:"fttr",method:"get_sync",reject:!0}),p=e.declare({object:"fttr",method:"config_check",reject:!0}),u=e.declare({object:"fttr",method:"npu_status",reject:!0}),g=e.declare({object:"fttr",method:"config_reload",reject:!0}),f=e.declare({object:"fttr",method:"restart_service",reject:!0}),b=e.declare({object:"fttr",method:"sync",params:["action","target","management","item"],reject:!0}),h=e.declare({object:"fttr",method:"npu_set",params:["enabled","bridge","wan_upstream","wan_downstream","onu_bridge"],reject:!0}),m=e.declare({object:"fttr",method:"mib_start",params:["onu_id","optical_sn","tables"],reject:!0}),y=e.declare({object:"fttr",method:"mib_result",params:["job","chunk"],reject:!0}),v=e.declare({object:"fttr",method:"job_release",params:["job"],reject:!0}),w=e.declare({object:"fttr",method:"hl202_list",reject:!0}),x=e.declare({object:"fttr",method:"hl202_report",params:["target"],reject:!0}),k=e.declare({object:"fttr",method:"hl202_accounts_start",params:["target"],reject:!0}),z=e.declare({object:"fttr",method:"hl202_account_update",params:["target","kind","entry","password","active"],reject:!0}),j=e.declare({object:"fttr",method:"hl202_exec_start",params:["target","script","timeout_seconds"],reject:!0}),S=e.declare({object:"fttr",method:"job_result",params:["job","chunk"],reject:!0}),C=e.declare({object:"fttr",method:"get_calibration",reject:!0}),$=e.declare({object:"fttr",method:"select_calibration",params:["source"],reject:!0}),M=e.declare({object:"fttr",method:"save_calibration",params:["data"],reject:!0}),P=e.declare({object:"fttr",method:"apply_calibration",reject:!0}),{getCapabilities:async()=>ns.getCapabilities.parse(await t()),getPlatformInfo:async()=>ns.getPlatformInfo.parse(await r()),opticalStatus:async()=>ns.opticalStatus.parse(await i()),opticalSet:async e=>ns.opticalSet.parse(await a(e.enabled,e.downstream_tx_enabled,e.fec_enabled)),getStatus:async()=>ns.getStatus.parse(await s()),getTopology:async()=>ns.getTopology.parse(await o()),getTopologyNode:async e=>ns.getTopologyNode.parse(await l(e.node_id,e.snapshot_id)),getTopologyClients:async e=>ns.getTopologyClients.parse(await d(e.node_id,e.snapshot_id,e.cursor,e.limit)),getSync:async()=>ns.getSync.parse(await c()),configCheck:async()=>ns.configCheck.parse(await p()),npuStatus:async()=>ns.npuStatus.parse(await u()),configReload:async()=>ns.configReload.parse(await g()),restartService:async()=>ns.restartService.parse(await f()),sync:async e=>ns.sync.parse(await b(e.action,e.target,e.management,e.item)),npuSet:async e=>ns.npuSet.parse(await h(e.enabled,e.bridge,e.wan_upstream,e.wan_downstream,e.onu_bridge)),mibStart:async e=>ns.mibStart.parse(await m(e.onu_id,e.optical_sn,e.tables)),mibResult:async e=>ns.mibResult.parse(await y(e.job,e.chunk)),jobRelease:async e=>ns.jobRelease.parse(await v(e.job)),hl202List:async()=>ns.hl202List.parse(await w()),hl202Report:async e=>ns.hl202Report.parse(await x(e.target)),hl202AccountsStart:async e=>ns.hl202AccountsStart.parse(await k(e.target)),hl202AccountUpdate:async e=>ns.hl202AccountUpdate.parse(await z(e.target,e.kind,e.entry,e.password,e.active)),hl202ExecStart:async e=>ns.hl202ExecStart.parse(await j(e.target,e.script,e.timeout_seconds)),jobResult:async e=>ns.jobResult.parse(await S(e.job,e.chunk)),getCalibration:async()=>ns.getCalibration.parse(await C()),selectCalibration:async e=>ns.selectCalibration.parse(await $(e.source)),saveCalibration:async e=>ns.saveCalibration.parse(await M(e.data)),applyCalibration:async()=>ns.applyCalibration.parse(await P())})}let nl=async()=>no().getStatus(),nd=async()=>no().getSync(),nc=async()=>no().configCheck(),np=async(e,t)=>no().sync({action:e,target:t}),nu=async(e,t,r)=>no().mibStart({onu_id:e,optical_sn:t,tables:r}),n_=async(e,t)=>no().mibResult({job:e,chunk:t}),ng=async e=>no().jobRelease({job:e});function nf(e){let t="none"===e.tone?"":`fttr-badge fttr-badge-${e.tone}`,r=e.class?` ${e.class}`:"",n=d("span",{class:`${t}${r}`.trim(),children:e.children});return e.title&&n.setAttribute("title",e.title),n}let nb={o1_initial:_("O1 Initial"),o2_standby:_("O2 Standby"),o3_serial_number:_("O3 Serial Number"),o4_ranging:_("O4 Ranging"),o5_operation:_("O5 (Operation)"),o6_intermittent_lods:_("O6 Intermittent LODS"),o7_emergency_stop:_("O7 Emergency Stop")};function nh(e){var t;let r=(t=e.state)?"o5_operation"===t?{tone:"success",label:nb.o5_operation,title:t}:{tone:"warning",label:nb[t]??c(t),title:t}:{tone:"none",label:"—"};return d(nf,{tone:r.tone,title:r.title,children:r.label})}function nm(e){var t;let r=(t=e.status)?{tone:"verified"===t.phase?"success":t.error||"wan_bootstrap_pending"===t.phase?"warning":"neutral",label:`${({not_started:_("Not started"),collecting_identity:_("Collecting identity"),retrying_identity:_("Retrying identity"),unsupported:_("Unsupported"),configuring:_("Configuring"),verifying:_("Verifying"),wan_bootstrap_pending:_("WAN pending"),verified:_("Verified"),retrying:_("Retrying"),offline:_("Offline")})[t.phase]} \xb7 ${t.generation}${t.error?` \xb7 ${t.error}`:""}`,title:t.error||void 0}:{tone:"neutral",label:"—"};return d(nf,{tone:r.tone,title:r.title,children:r.label})}let ny={online:_("Online"),waiting_inform:_("Waiting Inform"),offline_or_stale:_("Offline or stale")};function nv(e){var t;let r,n,i,a,s,o,l=(t=e.management,r=t?.state,n=g(t?.age_seconds??(t?.last_inform?Math.max(0,Math.floor(Date.now()/1e3)-t.last_inform):null)),a=(i=t?.last_inform?new Date(1e3*t.last_inform).toLocaleString():null)?_("Last Inform: %s").replace("%s",i):void 0,s="—",o="none","online"===r?(o="success",s=ny.online):"waiting_inform"===r?(o="warning",s=ny.waiting_inform):"offline_or_stale"===r?(o="danger",s=ny.offline_or_stale):r&&(o="neutral",s=c(r)),{tone:o,label:n&&r?`${s} \xb7 ${n}`:s,title:a});return d(nf,{tone:l.tone,title:l.title,children:l.label})}let nw={disabled:_("Disabled"),waiting:_("Waiting"),wan_reconciling:_("WAN reconciling"),wan_verifying:_("WAN verifying"),wifi_reconciling:_("Wi-Fi reconciling"),discovering:_("Discovering"),reading:_("Reading"),disabling:_("Disabling"),disabling_read:_("Disabling read"),writing:_("Writing"),verifying:_("Verifying"),settling:_("Settling"),completed:_("Completed"),interrupted:_("Interrupted"),recovering:_("Recovering"),waiting_management:_("Waiting management"),waiting_task:_("Waiting task"),reset_pending:_("Reset pending"),failed:_("Failed"),error:_("Error"),blocked:_("Blocked"),not_started:_("Not started")};function nx(e){var t,r;let n,i,a,s=(t=e.provisioning,r=e.title,n=t?.state,i=t?.next_retry_at&&t.next_retry_at>Math.floor(Date.now()/1e3)?t.next_retry_at-Math.floor(Date.now()/1e3):0,a=r??(t?.current_revision===!1?_("Previous configuration"):t?.management_fresh===!1?_("Management stale"):t?.reconcile_reason?t.reconcile_reason:i>0?_("Next self-healing retry in %d seconds").replace("%d",String(i)):t?.reason??t?.error),n&&"not_started"!==n?"disabled"===n?{tone:"neutral",label:nw.disabled}:"completed"===n||"verified"===n?{tone:"success",label:"completed"===n?nw.completed:_("Ready"),title:a}:"wan_reconciling"===n||"wan_verifying"===n||"wifi_reconciling"===n||"discovering"===n||"reading"===n||"disabling"===n||"disabling_read"===n||"writing"===n||"verifying"===n||"settling"===n||"recovering"===n||"waiting_task"===n?{tone:"info",label:nw[n]??c(n),title:a}:"interrupted"===n||"failed"===n||"error"===n||"blocked"===n?{tone:"danger",label:"blocked"===n?nw.blocked:nw.interrupted,title:a}:"waiting"===n||"pending"===n||"waiting_management"===n||"reset_pending"===n?{tone:"warning",label:nw[n]??nw.waiting,title:a}:{tone:"neutral",label:c(n),title:a}:{tone:"neutral",label:nw.not_started,title:a});return d(nf,{tone:s.tone,title:s.title,children:s.label})}let nk={disabled:_("Disabled"),not_configured:_("Not configured"),stale_revision:_("Stale revision"),stale_management:_("Stale management"),verified:_("Verified"),attention_required:_("Attention required"),accepted_unverified:_("Unverified"),pending:_("Pending"),recovering:_("Recovering"),waiting_management:_("Waiting management")};function nz(e){var t;let r=(t=e.state)&&"not_configured"!==t?"disabled"===t?{tone:"neutral",label:nk.disabled}:"verified"===t?{tone:"success",label:nk.verified}:"attention_required"===t?{tone:"danger",label:nk.attention_required}:"stale_revision"===t||"stale_management"===t||"waiting_management"===t?{tone:"warning",label:nk[t]}:"recovering"===t?{tone:"info",label:nk.recovering}:"accepted_unverified"===t||"pending"===t?{tone:"warning",label:nk[t]}:{tone:"neutral",label:c(t)}:{tone:"neutral",label:nk.not_configured};return d(nf,{tone:r.tone,title:r.title,children:r.label})}let nj=`
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
`,nS=e=>JSON.stringify(e,null,2);async function nC(e){let t=["{"],r=!0;for(let[n,i]of Object.entries(e))if(r||t.push(","),r=!1,t.push(JSON.stringify(n),":"),Array.isArray(i)){t.push("[");for(let e=0;e<i.length;e++){e&&t.push(",");let r=JSON.stringify(i[e]);if(void 0===r)throw Error(_("MIB snapshot cannot be serialized"));t.push(r),e%32==31&&await new Promise(e=>setTimeout(e,0))}t.push("]")}else{let e=JSON.stringify(i);if(void 0===e)throw Error(_("MIB snapshot cannot be serialized"));t.push(e)}return t.push("}"),new Blob(t,{type:"application/json"})}function n$(e){let t=e.reference;return t?.url.startsWith("https://github.com/opencord/omci-lib-go/blob/v2.2.4/")?d("a",{href:t.url,target:"_blank",rel:"noopener noreferrer",children:t.id}):d("span",{children:"—"})}let nM=async()=>no().getCapabilities();async function nP(e){if(!(await nM()).pages[e])throw Error(_("This page is not supported by the installed FTTR build."))}let nO={ready:{label:_("Ready"),type:"success"},verified:{label:_("Verified"),type:"success"},online:{label:_("Online"),type:"success"},completed:{label:_("Completed"),type:"success"},applied:{label:_("Applied"),type:"success"},waiting_inform:{label:_("Waiting Inform"),type:"warning"},waiting_transport:{label:_("Waiting transport"),type:"warning"},waiting_identity:{label:_("Waiting identity"),type:"warning"},offline_or_stale:{label:_("Offline or stale"),type:"warning"},manual_required:{label:_("Manual setup required"),type:"warning"},not_configured:{label:_("Not configured"),type:"warning"},not_required:{label:_("Not required"),type:"neutral"},waiting_acs:{label:_("Waiting ACS listener"),type:"warning"},reading:{label:_("Reading settings"),type:"info"},configuring:{label:_("Configuring settings"),type:"info"},verifying:{label:_("Verifying settings"),type:"info"},retry_wait:{label:_("Waiting to retry"),type:"warning"},discovering_management_wan:{label:_("Discovering management WAN"),type:"info"},configuring_management_wan:{label:_("Configuring management WAN"),type:"info"},verifying_management_wan:{label:_("Verifying management WAN"),type:"info"},pending:{label:_("Pending"),type:"warning"},awaiting_apply:{label:_("Awaiting Apply"),type:"warning"},syncing:{label:_("Syncing"),type:"info"},discovering:{label:_("Discovering"),type:"info"},recovering:{label:_("Recovering"),type:"info"},waiting_management:{label:_("Waiting Management"),type:"warning"},waiting_task:{label:_("Waiting Task"),type:"info"},reconcile_required:{label:_("Reconcile Required"),type:"warning"},not_started:{label:_("Not Started"),type:"neutral"},disabled:{label:_("Disabled"),type:"neutral"},enabled:{label:_("Enabled"),type:"success"},interrupted:{label:_("Interrupted"),type:"danger"},failed:{label:_("Failed"),type:"danger"},stale:{label:_("Stale"),type:"warning"},error:{label:_("Error"),type:"danger"},deleted:{label:_("Deleted"),type:"neutral"}};function nA(e,t){if(!e)return d("span",{class:"fttr-badge fttr-badge-neutral",children:"—"});let r=nO[e],n=r?.label||c(e),i=r?.type||"neutral";return d("span",{class:`fttr-badge fttr-badge-${i}`,title:t||e,children:n})}function nE(e){var t,r,n,i,a,s;return s={class:"table-wrapper",children:(a={class:"table",children:[(r={children:(t={children:[d("th",{children:_("Configuration item")}),d("th",{children:_("Type")}),d("th",{children:_("State")}),d("th",{children:_("Evidence freshness")}),d("th",{children:_("Last update / task")}),d("th",{children:_("Reason / desired changes")})]},d("tr",t))},d("thead",r)),(i={children:e.length?e.map(e=>{var t,r,n,i,a,s,o,l,u,g;return g={children:[(n={children:d("strong",{children:c(e.name||e.id)})},d("td",n)),(i={children:d("span",{class:"fttr-badge fttr-badge-info",style:"font-size:80%",children:function(e,t){switch(e){case"wifi":return"Wi-Fi";case"wan":return"WAN";case"internet":return"Internet";case"iptv":return"IPTV";case"tr069":return"TR-069";default:return"port_binding"===t?_("Binding"):c(e||t)}}(e.service_type??"",e.kind)})},d("td",i)),d("td",{children:nA(e.state)}),(s={children:(t=e.current_revision,r=e.management_fresh,a={style:"display:flex;flex-direction:column;gap:3px;align-items:flex-start",children:[!0===t?d("span",{class:"fttr-badge fttr-badge-info",style:"font-size:78%",children:_("Current configuration")}):!1===t?d("span",{class:"fttr-badge fttr-badge-neutral",style:"font-size:78%",children:_("Previous configuration")}):d("span",{children:"—"}),!0===r?d("span",{class:"fttr-badge fttr-badge-success",style:"font-size:78%",children:_("Management fresh")}):!1===r?d("span",{class:"fttr-badge fttr-badge-warning",style:"font-size:78%",children:_("Management stale")}):null]},d("div",a))},d("td",s)),(o={children:[d("div",{children:p(e.updated_at)}),void 0!==e.task_id&&null!==e.task_id?d("span",{class:"fttr-badge fttr-badge-neutral",style:"font-size:75%;margin-top:2px",children:[_("Task")," #",e.task_id]}):null]},d("td",o)),(u={children:[e.reason?d("div",{style:"margin-bottom:3px;color:#555;overflow-wrap:anywhere",children:e.reason}):null,(e.changes??[]).length?(l={style:"font-size:85%",children:(e.changes??[]).map(e=>{var t;return t={style:"overflow-wrap:anywhere;margin-top:2px",children:[d("code",{children:e.name})," = ",d("code",{children:e.desired})]},d("div",t)})},d("div",l)):!e.reason&&"—"]},d("td",u))]},d("tr",g)}):(n={children:d("td",{colSpan:6,style:"text-align:center;color:#888;padding:1em",children:_("No desired items configured.")})},d("tr",n))},d("tbody",i))]},d("table",a))},d("div",s)}let main=L.view.extend({load:async()=>(await nP("sync"),Promise.all([nd(),nc()])),render(e){var t,r,n,i,a,s;let[o,f]=e,b=d("div",{}),h=d("p",{class:"alert-message warning",hidden:!0,"aria-live":"polite"}),m=d("div",{class:"fttr-sync-result","aria-live":"polite",style:"margin:10px 0"}),y=(t={class:"cbi-input-select",children:[d("option",{value:"all",children:_("All devices")}),(o.devices??[]).filter(e=>"none"!==e.provisioning_adapter).map(e=>d("option",{value:e.device,children:e.name||e.device}))]},d("select",t)),v=d("div",{}),w=d("div",{}),x=o,k=f,z=!1,j=!1,S=[],C=async e=>{if(!z){z=!0,B(x);try{var t;await np("reset_state",e.device),m.replaceChildren((t={class:"alert-message info",children:_("Synchronization state reset for %s. Preview differences to read the current device state.").replace("%s",e.name||e.optical_sn)},d("div",t))),B(await nd())}catch(e){m.replaceChildren(d("div",{class:"alert-message danger",children:String(e)}))}finally{z=!1,B(x)}}},$=async e=>{if(!z){z=!0,B(x);try{var t;let r=await np("apply",e.device),n="operation_ids"in r?r.operation_ids.join(", "):"—";m.replaceChildren((t={class:"alert-message info",children:_("Configuration delivery started for %s. Operation IDs: %s").replace("%s",e.name||e.optical_sn).replace("%s",n||"—")},d("div",t))),B(await nd())}catch(e){m.replaceChildren(d("div",{class:"alert-message danger",children:String(e)}))}finally{z=!1,B(x)}}},M=async e=>{try{let t=(await nl()).sub_gateways.find(t=>t.serial_number===e.optical_sn);if(!t)throw Error(_("Device is offline or no longer registered; refresh status and retry."));!function(e){var t,r,n,i,a,s,o,p,g,f,b,h;let m=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"basic",y=!1,v=!1,w=null,x=null,k=(t={class:"onu-basic-container",children:[{title:_("Device identification"),rows:[[_("Vendor"),e.vendor],[_("Model"),e.identity?.equipment_id??e.model],[_("Optical serial"),d("code",{style:"font-size:90%",children:e.serial_number})],[_("ONU ID"),e.onu_id],[_("Hardware version"),e.identity?.hardware_version??e.hardware_version],[_("Software images"),e.identity?.software_images?.join(", ")??e.firmware_version],[_("OMCC version"),e.identity?.omcc_version==null?null:d("code",{style:"font-size:90%",children:["0x",e.identity.omcc_version.toString(16)]})]]},{title:_("Optical & link status"),rows:[[_("Registration"),d(nh,{state:e.state})],[_("Business"),d(nm,{status:e.business_status})],[_("Receive optical power"),u(e.optical_rx_power_dbm)],[_("Transmit optical power"),u(e.optical_tx_power_dbm)],[_("Equalization delay (EQD)"),null==e.equalization_delay_bits?"—":d("code",{style:"font-size:90%",children:[e.equalization_delay_bits," bits"]})],[_("Data interface"),e.data_path?.interface?d("code",{style:"font-size:90%",children:e.data_path.interface}):null],[_("Uptime"),null==e.uptime_seconds?null:`${function(e){if(null==e||!Number.isFinite(e)||e<0)return"—";let t=Math.floor(e),r=Math.floor(t/86400),n=Math.floor(t%86400/3600),i=Math.floor(t%3600/60),a=[];return r>0&&a.push(`${r}d`),(n>0||r>0)&&a.push(`${n}h`),(i>0||n>0||r>0)&&a.push(`${i}m`),a.push(`${t%60}s`),a.join(" ")}(e.uptime_seconds)} (${Math.floor(e.uptime_seconds)} s)`]]},{title:_("Management & cache"),rows:[[_("CWMP"),d(nv,{management:e.management})],[_("Last Inform"),e.management?.last_inform?`${new Date(1e3*e.management.last_inform).toLocaleString()}${null!=e.management.age_seconds?` (${e.management.age_seconds} s)`:""}`:null],[_("Provisioning"),d(nx,{provisioning:e.provisioning})],[_("Wi-Fi sync"),d(nz,{state:e.wifi_sync})],[_("Identity source"),e.identity?!1===e.identity_current?_("Cached identity"):!0===e.identity_current?_("Current registration"):_("Registration freshness unavailable"):_("Not collected")],[_("Identity age"),null==e.identity_age_seconds?null:`${e.identity_age_seconds} s`],[_("Identity read errors"),e.identity?.errors?.join("; ")]]}].map(e=>{var t,r,n;return n={class:"cbi-section onu-basic-section",children:[d("h3",{class:"onu-basic-title",children:e.title}),(r={class:"table onu-basic-table",children:(t={children:e.rows.map(e=>{var t;let[r,n]=e;return t={children:[d("th",{style:"width:35%",children:r}),d("td",{children:n instanceof Node?n:c(n)})]},d("tr",t)})},d("tbody",t))},d("table",r))]},d("div",n)})},d("div",t)),z=(r={class:"mib-status-bar",role:"status",children:d("span",{class:"mib-hint-text",children:_("Read MIB on demand. Results are a snapshot, not live polling.")})},d("div",r)),j=(n={class:"cbi-progressbar",style:"display:none;width:100%",title:"0%",children:d("div",{style:"width:0%"})},d("div",n)),S=d("div",{}),C=d("pre",{class:"onu-raw-pre"}),$=d("span",{class:"download-status",role:"status"}),M=null,P=d("button",{type:"button",class:"cbi-button cbi-button-action",disabled:!0,onclick:async()=>{if(w&&!y){P.disabled=!0,$.textContent=_("Preparing JSON download…");try{let t=await nC(w);if(y)return;M&&URL.revokeObjectURL(M),M=URL.createObjectURL(t);let r=document.createElement("a");r.href=M,r.download=`mib-${e.serial_number}.json`,r.click(),$.textContent=_("JSON download started"),window.setTimeout(()=>{URL.revokeObjectURL(r.href),M===r.href&&(M=null)},1e3)}catch(e){$.textContent=String(e)}finally{P.disabled=!w||y}}},children:_("Download JSON")}),O=(a={class:"onu-raw-panel",children:[(i={class:"onu-raw-toolbar",children:[d("span",{class:"onu-raw-hint",children:_("This is a lightweight preview. Download JSON to save the complete MIB snapshot.")}),d("div",{class:"onu-raw-actions",children:[P,$]})]},d("div",i)),C]},d("div",a)),A=d("button",{type:"button",class:"cbi-button cbi-button-apply",onclick:()=>Z(!1),children:_("Read MIB")}),N=d("button",{type:"button",class:"cbi-button cbi-button-action",onclick:()=>Z(!0),children:_("Read MIB and VLAN tables")}),R=(p={class:"onu-mib-panel",children:[(o={class:"mib-controls",children:[(s={class:"mib-action-group",children:[A,N,d("small",{class:"mib-action-hint",children:_("Collecting VLAN tables queries extended filter tables and takes longer.")})]},d("div",s)),z,j]},d("div",o)),S]},d("div",p)),I={basic:k,mib:R,raw:O},T=new Map;function D(e){for(let[t,r]of Object.entries(I))t===e?r.style.removeProperty("display"):r.style.setProperty("display","none","important");for(let[t,r]of T)r.className=t===e?"cbi-tab":"cbi-tab-disabled"}let q=(g={class:"cbi-tabmenu",style:"margin:0;padding-left:0;display:flex;flex-wrap:wrap",children:[{id:"basic",label:_("Basic information")},{id:"mib",label:"OMCI / MIB"},{id:"raw",label:_("Raw JSON")}].map(e=>{var t;let r=(t={class:e.id===m?"cbi-tab":"cbi-tab-disabled","data-tab":e.id,children:d("a",{href:`#tab-${e.id}`,onclick:t=>{t.preventDefault(),D(e.id)},children:e.label})},d("li",t));return T.set(e.id,r),r})},d("ul",g)),W=(h={children:[d("div",{class:"onu-details-header",children:q}),(f={class:"onu-details-dialog",children:[d("style",{children:`
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
				${nj}
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
				`}),k,R,O]},d("div",f)),(b={class:"right onu-details-footer",children:d("button",{type:"button",class:"cbi-button",onclick:()=>{y=!0,M&&URL.revokeObjectURL(M),M=null,w=null,C.textContent="",S.replaceChildren(),L.ui.hideModal()},children:_("Close")})},d("div",b))]},d(l,h)),B=()=>!y&&W.isConnected&&W.getClientRects().length>0;async function Z(t){if(!v){v=!0,A.disabled=N.disabled=!0,j.style.display="",j.title="0%",j.firstElementChild.style.width="0%",z.textContent=_("Reading MIB…");try{let y=await nl(),v=y.sub_gateways?.find(t=>t.serial_number===e.serial_number);if(v?.state!=="o5_operation")throw Error(_("Device is offline; reopen details after registration."));if(!B())return;let k=await nu(v.onu_id,v.serial_number,t);x=k.job;let $=Date.now()+14e4;for(;B();){let e=await n_(k.job,0);if(!B())return;if("ready"===e.status){var r,n,i,a,s,o,l,p,u,g,f,b,h,m;if(!e.chunks||e.chunks>1024||!e.bytes||e.bytes>0x2000000||0!==e.chunk||!e.data)throw Error(_("Invalid MIB snapshot"));let t=new Uint8Array(e.bytes),y=0;for(let r=0;r<e.chunks;r++){let n=0===r?e:await n_(k.job,r);if(!B())return;if("ready"!==n.status||n.chunk!==r||n.chunks!==e.chunks||n.bytes!==e.bytes||!n.data)throw Error(_("Invalid MIB snapshot chunk"));let i=atob(n.data);if(i.length>32768||y+i.length>t.length)throw Error(_("Invalid MIB snapshot size"));for(let e=0;e<i.length;e++)t[y++]=i.charCodeAt(e);let a=Math.min(100,Math.round((r+1)/e.chunks*100));j.title=`${a}%`,j.firstElementChild.style.width=`${a}%`,z.textContent=`${_("Downloading MIB snapshot")}: ${r+1}/${e.chunks}`}if(y!==t.length)throw Error(_("Incomplete MIB snapshot"));if(await U(),w=rf.parse(nn(JSON.parse(new TextDecoder("utf-8",{fatal:!0}).decode(t)))).report,1!==w.schema_version||w.onu_id!==v.onu_id)throw Error(_("Unexpected MIB response"));j.style.display="none",z.replaceChildren((r=w,f={class:"mib-chips",children:[(i={class:"mib-chip mib-chip-primary",children:["ONU ",r.onu_id]},d("span",i)),(a={class:`mib-chip ${r.uploaded_complete?"mib-chip-success":"mib-chip-warning"}`,children:r.uploaded_complete?_("Upload complete"):_("Upload incomplete")},d("span",a)),(s={class:"mib-chip mib-chip-info",children:[_("Records"),": ",r.received_records,r.expected_records!==r.received_records?` / ${r.expected_records}`:""]},d("span",s)),(o={class:"mib-chip",children:[_("Decoded"),": ",r.decoded_records]},d("span",o)),r.partial_records>0?(l={class:"mib-chip mib-chip-warning",children:[_("Partial"),": ",r.partial_records]},d("span",l)):null,(p={class:"mib-chip mib-chip-neutral",children:[_("Basic"),": ",r.basic_records]},d("span",p)),(u={class:"mib-chip",children:r.tables_collected?_("VLAN tables collected"):_("VLAN tables not collected")},d("span",u)),(g={class:"mib-chip mib-chip-subtle",children:new Date().toLocaleTimeString()},d("span",g))]},d("div",f))),S.replaceChildren(function(e){var t,r,n,i,a,s;let o=e.classes.length?e.classes[0].class_id:null,l=(t={class:"mib-content"},d("div",t)),p=(r={type:"search",class:"cbi-input-text mib-search-input",placeholder:_("Search ME name or Class ID…")},d("input",r)),u=(n={class:"mib-class-list"},d("div",n)),g=new Map;function f(t){var r,n;for(let[e,r]of(o=t,g))e===t?r.classList.add("active"):r.classList.remove("active");let i=e.entities.filter(e=>e.class_id===t);i.length?l.replaceChildren(...i.map((r,n)=>{var i,a,s,o,l,p,u,g,f,b,h,m,y,v,w,x,k,z,j;return j={open:0===n,class:"mib-entity-details",children:[(l={class:"mib-entity-summary",children:[(s={class:"mib-entity-title",children:[(i={children:c(r.name)},d("strong",i)),(a={class:"mib-entity-id-tag",children:[_("Entity")," ",r.entity_id," (0x",r.entity_id.toString(16),")"]},d("span",a))]},d("span",s)),(o={class:"mib-entity-support",children:r.support},d("span",o))]},d("summary",l)),(z={class:"mib-entity-body",children:[r.attributes.length?(y={class:"table mib-attributes-table",children:[(h={children:(b={children:[(p={style:"width:28%",children:_("Attribute")},d("th",p)),(u={style:"width:14%",children:_("Type")},d("th",u)),(g={children:_("Value")},d("th",g)),(f={style:"width:18%",children:_("Definition")},d("th",f))]},d("tr",b))},d("thead",h)),(m={children:r.attributes.map(e=>{var t,r,n,i,a,s,o,l,p,u;return u={children:[(t={class:"mib-attr-name",children:e.definition.name},d("td",t)),(n={class:"mib-attr-kind",children:(r={children:e.definition.kind},d("code",r))},d("td",n)),(l={class:"mib-attr-value",children:[(i={class:"mib-val-display",children:function(e){if(null===e)return _("Conflicting values; inspect observations");switch(e.type){case"unsigned":case"signed":case"decimal":case"text":return c(e.value);case"octets":return c(e.hex);case"table_length":return c(e.bytes);default:throw new nr("unexpected_variant",`Unexpected variant: ${String(e)}`)}}(e.value)},d("span",i)),e.observations?.length?(o={class:"mib-obs-details",children:[(a={children:_("Raw data / observations")},d("summary",a)),(s={class:"mib-pre",children:nS(e.observations)},d("pre",s))]},d("details",o)):null]},d("td",l)),(p={class:"mib-attr-ref",children:n$(e.definition)},d("td",p))]},d("tr",u)})},d("tbody",m))]},d("table",y)):(v={children:_("Basic display only; raw records are preserved.")},d("p",v)),e.tables.filter(e=>e.class_id===t&&e.entity_id===r.entity_id).map(e=>{var t,r,n,i,a,s,o,l,p,u,g,f,b,h,m,y;return y={class:"mib-table-details",children:[(t={children:[e.attribute.name," ·"," ",e.collected?`${e.rows.length} ${_("rows")}`:c(e.error)]},d("summary",t)),e.vlan_rules.length?(b={class:"mib-table-overflow",children:(f={class:"table",children:[(u={children:(p={children:[(r={children:_("Outer filter (priority / VID / TPID-DEI)")},d("th",r)),(n={children:_("Inner filter (priority / VID / TPID-DEI)")},d("th",n)),(i={children:_("EtherType code")},d("th",i)),(a={children:_("Remove tags")},d("th",a)),(s={children:_("Outer treatment (priority / VID / TPID-DEI)")},d("th",s)),(o={children:_("Inner treatment (priority / VID / TPID-DEI)")},d("th",o)),(l={children:_("Delete entry")},d("th",l))]},d("tr",p))},d("thead",u)),(g={children:e.vlan_rules.map(e=>{var t,r,n,i,a,s,o,l;return l={children:[(t={children:`${e.filter_outer_priority} / ${e.filter_outer_vid} / ${e.filter_outer_tpid_dei}`},d("td",t)),(r={children:`${e.filter_inner_priority} / ${e.filter_inner_vid} / ${e.filter_inner_tpid_dei}`},d("td",r)),(n={children:c(e.filter_ethertype)},d("td",n)),(i={children:c(e.tags_to_remove)},d("td",i)),(a={children:`${e.treatment_outer_priority} / ${e.treatment_outer_vid} / ${e.treatment_outer_tpid_dei}`},d("td",a)),(s={children:`${e.treatment_inner_priority} / ${e.treatment_inner_vid} / ${e.treatment_inner_tpid_dei}`},d("td",s)),(o={children:c(e.delete_entry)},d("td",o))]},d("tr",l)})},d("tbody",g))]},d("table",f))},d("div",b)):null,(h={style:"margin-top:6px",children:[_("G.988 encoded field values"),": ",n$(e.attribute)]},d("p",h)),(m={class:"mib-pre",children:nS(e.vlan_rules.length?e.vlan_rules:e.rows)},d("pre",m))]},d("details",y)}),(k={class:"mib-diag-details",children:[(w={children:_("Records / diagnostics")},d("summary",w)),(x={class:"mib-pre",children:nS({diagnostics:r.diagnostics,records:e.records.filter(e=>e.class_id===t&&e.entity_id===r.entity_id)})},d("pre",x))]},d("details",k))]},d("div",z))]},d("details",j)})):l.replaceChildren((n={class:"mib-empty-content",children:(r={children:_("No entities recorded for this ME class.")},d("p",r))},d("div",n)))}function b(){var t;let r=p.value.trim().toLowerCase();g.clear();let n=e.classes.filter(e=>`${e.class_id} ${e.name??""}`.toLowerCase().includes(r));n.length?u.replaceChildren(...n.map(e=>{var t,r,n,i;let a=(i={type:"button",class:`mib-class-btn${e.class_id===o?" active":""}`,onclick:()=>f(e.class_id),children:[(t={class:"mib-class-id",children:e.class_id},d("span",t)),(r={class:"mib-class-name",title:e.name??_("Unknown class"),children:e.name??_("Unknown class")},d("span",r)),(n={class:"mib-class-count",children:e.entities},d("span",n))]},d("button",i));return g.set(e.class_id,a),a})):u.replaceChildren((t={class:"mib-empty-list",children:_("No matching ME classes")},d("div",t)))}return p.addEventListener("input",b),b(),e.classes.length&&f(e.classes[0].class_id),s={class:"mib-browser",children:[(a={class:"mib-sidebar",children:[(i={class:"mib-search-box",children:p},d("div",i)),u]},d("div",a)),l]},d("div",s)}(w),(m={class:"mib-upload-diagnostics",children:[(b={children:_("Upload diagnostics")},d("summary",b)),(h={class:"mib-pre",children:nS(w.diagnostics)},d("pre",h))]},d("details",m))),n=w,C.textContent=nS({schema_version:n.schema_version,reference_version:n.reference_version,onu_id:n.onu_id,uploaded_complete:n.uploaded_complete,expected_records:n.expected_records,received_records:n.received_records,decoded_records:n.decoded_records,partial_records:n.partial_records,basic_records:n.basic_records,tables_requested:n.tables_requested,tables_collected:n.tables_collected,class_count:n.classes.length,classes:n.classes.slice(0,25),additional_classes:Math.max(0,n.classes.length-25),record_count:n.records.length,first_record:n.records[0]??null,table_count:n.tables.length,diagnostics_count:n.diagnostics.length}),P.disabled=!1;return}if(e.progress){let{phase:t,received:r,expected:n}=e.progress;if(z.textContent="starting"===t?_("Starting OMCI MIB read…"):"tables"===t?`${_("Collecting VLAN tables")}${null==n?"":`: ${r}/${n}`}`:null==n?_("Reading OMCI MIB records…"):`${_("Reading OMCI MIB records")}: ${r}/${n}`,n&&n>0){let e=Math.min(100,Math.round(r/n*100));j.title=`${e}%`,j.firstElementChild.style.width=`${e}%`}}if(Date.now()>=$)throw Error(_("MIB query timed out; retry."));await new Promise(e=>setTimeout(e,1e3))}}catch(e){B()&&(j.style.display="none",z.replaceChildren(d("span",{class:"mib-error-text",children:[String(e),w?` \xb7 ${_("Previous snapshot retained")}`:""]})))}finally{await U(),v=!1,A.disabled=N.disabled=!1}}}async function U(){if(!x)return;let e=x;x=null;try{await ng(e)}catch(e){console.warn("Failed to release MIB snapshot",e)}}D(m),L.ui.showModal(`${e.model} — ${e.serial_number}`,W,"modal-wide")}(t,"mib")}catch(e){m.replaceChildren(d("div",{class:"alert-message danger",children:String(e)}))}},P=async e=>{if(!z){for(let e of(z=!0,S))e.disabled=!0;B(x);try{var t;let r=await np(e,y.value),n=e.startsWith("management_")?_("Management operation started; status is refreshed below."):_("Started: %s").replace("%s","operation_ids"in r?r.operation_ids.join(", "):"—");m.replaceChildren((t={class:"alert-message info",children:n},d("div",t))),B(await nd())}catch(e){m.replaceChildren(d("div",{class:"alert-message danger",children:String(e)}))}finally{z=!1,B(x)}}},O=d("button",{type:"button",class:"cbi-button cbi-button-action",onclick:()=>P("plan"),children:_("Preview differences (read-only)")}),A=d("button",{type:"button",class:"cbi-button cbi-button-positive",onclick:()=>P("apply"),children:_("Apply differences")}),N=d("button",{type:"button",class:"cbi-button cbi-button-action",title:_("Read current device parameters and auto-verify matching settings without writing to device"),onclick:()=>P("reconcile"),children:_("Reconcile (read-only)")}),R=d("button",{type:"button",class:"cbi-button cbi-button-positive",title:_("Clear backoff delays and retry safe difference synchronization"),onclick:()=>P("retry"),children:_("Self-heal / retry")});S.push(O,A,N,R);let I=d("button",{type:"button",class:"cbi-button cbi-button-action",onclick:()=>P("management_plan"),children:_("Check management differences (read-only)")}),T=d("button",{type:"button",class:"cbi-button cbi-button-positive",onclick:()=>P("management_apply"),children:_("Apply management configuration")});S.push(I,T);let D=(r={class:"cbi-section",children:[d("h3",{children:_("Isolated TR069 management network")}),w,d("p",{style:"margin-top:10px",children:[I," ",T]})]},d("div",r)),q=(a={class:"cbi-section",children:[d("h3",{children:_("Manual synchronization")}),(i={style:"display:flex;align-items:center;flex-wrap:wrap;gap:12px",children:[(n={style:"display:flex;align-items:center;gap:8px",children:[d("span",{children:[_("Target"),":"]}),y]},d("label",n)),d("div",{style:"display:flex;gap:8px;flex-wrap:wrap",children:[O,A,N,R]})]},d("div",i))]},d("div",a)),W=(s={class:"cbi-map fttr-sync",children:[d("style",{children:`
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
					`}),d("h2",{children:_("FTTR synchronization")}),b,h,D,q,m,v]},d("div",s));function B(e){var t,r,n,i,a,s,o,u,f,m,j,S,N,R,D,W,B,Z,U,V,F,J,K,Q,G,H,X,Y,ee,et,er,en,ei;x=e,b.replaceChildren((u={"data-provisioning-summary":"true",style:"display:flex;align-items:center;flex-wrap:wrap;gap:0.75em;margin-top:.25em;margin-bottom:1.2em;font-size:92%",children:[(t={children:[d("strong",{style:"margin-right:.4em",children:[_("Provisioning"),":"]}),d("span",{class:`fttr-badge ${e.enabled?"fttr-badge-success":"fttr-badge-neutral"}`,children:e.enabled?_("Enabled"):_("Disabled")})]},d("span",t)),(r={children:[d("span",{style:"color:#888;margin-right:.3em",children:[_("Mode"),":"]}),d("span",{class:"fttr-badge fttr-badge-info",children:c(e.mode)})]},d("span",r)),(n={children:[d("span",{style:"color:#888;margin-right:.3em",children:[_("Revision"),":"]}),d("code",{children:c(e.revision)})]},d("span",n)),e.config_load?(a={children:["waiting"===e.config_load.state?_("Saved; waiting to load automatically"):_("Configuration loaded; device synchronization is tracked below"),"waiting"===e.config_load.state?(i={children:[" ",d("code",{children:e.config_load.requested_revision}),e.config_load.blocking_operations.map(e=>d("span",{style:"margin-left:.5em",children:`${e.device} #${e.operation_id}: ${c(e.state)} (${g(Math.max(0,Date.now()/1e3-e.started_at))})`})),e.config_load.reset_pending?_("Waiting for device reset recovery"):null]},d("span",i)):null]},d("span",a)):null,(e.triggers??[]).length?(s={children:[d("span",{style:"color:#888;margin-right:.3em",children:[_("Triggers"),":"]}),d("code",{children:(e.triggers??[]).join(", ")})]},d("span",s)):null,e.interval_minutes?(o={children:[d("span",{style:"color:#888;margin-right:.3em",children:[_("Interval (minutes)"),":"]}),d("span",{children:e.interval_minutes})]},d("span",o)):null]},d("div",u)));let ea=[e.error,e.config_error,"error"in k?_("Committed configuration is invalid: %s").format(k.error):k.revision&&k.revision!==e.revision&&(e.config_load?.state!=="waiting"||e.config_load.requested_revision!==k.revision)?_("Committed configuration has not been requested for loading. Apply the configuration to load it."):""].filter(Boolean);h.hidden=!ea.length,h.textContent=ea.join(" — ");let es=(e.devices??[]).filter(e=>"none"!==e.provisioning_adapter),eo=["all",...Array.from(new Set(es.map(e=>e.group).filter(Boolean))).map(e=>`group:${e}`),...es.map(e=>e.device)];if(Array.from(y.options).map(e=>e.value).join("\n")!==eo.join("\n")){let t=y.value;y.replaceChildren(...eo.map(t=>d("option",{value:t,children:"all"===t?_("All devices"):t.startsWith("group:")?(e.devices??[]).find(e=>`group:${e.group}`===t)?.group_name||t:(e.devices??[]).find(e=>e.device===t)?.name||t}))),y.value=eo.includes(t)?t:"all"}q.hidden="manual"!==e.mode||!L.hasViewPermission();let el=es.filter(e=>"all"===y.value||e.device===y.value||`group:${e.group}`===y.value).some(e=>!["completed","not_started","interrupted","disabled"].includes(e.provisioning.state??"not_started"));O.disabled=z||el||e.config_load?.state==="waiting"||"error"in k||!!k.revision&&k.revision!==e.revision||!es.length,A.disabled=O.disabled||!e.enabled;let ed=e.management_network;I.disabled=z||e.config_load?.state==="waiting"||!!ed?.inflight||"error"in k||!L.hasViewPermission(),T.disabled=I.disabled;let ec=ed.desired??ed.applied,ep=ed?.plan??[],eu=!!ed?.applied_version&&!!ed?.desired_version&&ed?.applied_version===ed?.desired_version;w.replaceChildren((ei={children:[(R={style:"display:flex;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:10px",children:[(f={children:[d("span",{class:"fttr-pill-label",children:[_("State"),":"]})," ",nA(ed?.state)]},d("span",f)),(m={children:[d("span",{class:"fttr-pill-label",children:[_("Desired version"),":"]})," ",d("code",{children:c(ed?.desired_version)})]},d("span",m)),(j={children:[d("span",{class:"fttr-pill-label",children:[_("Applied version"),":"]})," ",d("code",{children:c(ed?.applied_version)})]},d("span",j)),ed?.desired_version||ed?.applied_version?(S={children:eu?d("span",{class:"fttr-badge fttr-badge-success",children:_("Synchronized")}):d("span",{class:"fttr-badge fttr-badge-warning",children:_("Pending apply")})},d("span",S)):null,ed?.next_retry_at?(N={children:[d("span",{class:"fttr-pill-label",children:[_("Next retry"),":"]})," ",p(ed.next_retry_at)]},d("span",N)):null]},d("div",R)),(G={class:"fttr-grid-3",children:[(B={class:"fttr-card",children:[(D={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:_("Management interface")}),d("strong",{children:"—"})]},d("div",D)),(W={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:_("Management VLAN")}),d("span",{children:["VLAN ",c(ec?.vlan.join(", "))," (Prio ",c(ec?.priority),")"]})]},d("div",W))]},d("div",B)),(F={class:"fttr-card",children:[(Z={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:_("Service IP / Netmask")}),d("code",{children:c(ec?.address)})]},d("div",Z)),(V={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:_("DHCP service")}),(U={children:null===ec?"—":ec.dhcp_enabled?d("span",{class:"fttr-badge fttr-badge-success",children:_("Enabled")}):d("span",{class:"fttr-badge fttr-badge-neutral",children:_("Disabled")})},d("span",U))]},d("div",V))]},d("div",F)),(Q={class:"fttr-card",children:[(J={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:_("ACS URL")}),d("code",{style:"font-size:80%",children:c(ec?.acs_url)})]},d("div",J)),(K={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:_("Mode")}),d("span",{children:c(ec?.mode)})]},d("div",K))]},d("div",Q))]},d("div",G)),ep.length?(er={style:"margin-top:10px",children:[d("h5",{style:"margin-bottom:4px;font-size:90%",children:_("Pending configuration changes")}),(et={class:"table-wrapper",children:(ee={class:"table",style:"font-size:85%",children:[(X={children:(H={children:[d("th",{children:_("Operation")}),d("th",{children:_("Configuration item")}),d("th",{children:_("Reason / desired changes")})]},d("tr",H))},d("thead",X)),(Y={children:ep.map(e=>{var t,r,n,i;return i={children:[(t={children:d("span",{class:"fttr-badge fttr-badge-info",children:e.operation})},d("td",t)),(r={children:d("code",{children:e.key})},d("td",r)),(n={children:d("code",{children:(e.value??[]).join(", ")})},d("td",n))]},d("tr",i)})},d("tbody",Y))]},d("table",ee))},d("div",et))]},d("div",er)):null,ed?.error?d("div",{class:"alert-message warning",style:"margin-top:8px",children:ed.error}):null,d("p",{style:"font-size:85%;color:#888;margin-top:8px;margin-bottom:8px",children:_("Saving in manual mode does not create interfaces, change firewall rules or configure child devices. Apply explicitly to authorize the current management configuration.")}),(en={style:"margin-top:6px;margin-bottom:10px",children:[d("summary",{style:"cursor:pointer;user-select:none;font-size:85%;color:#666",children:_("Advanced diagnostics / Raw configuration (JSON)")}),d("pre",{style:"white-space:pre-wrap;overflow-wrap:anywhere;font-size:80%;max-height:200px;overflow-y:auto;background:rgba(0,0,0,0.03);padding:8px;border-radius:4px",children:JSON.stringify({desired:ed?.desired,applied:ed?.applied,plan:ed?.plan??[]},null,2)})]},d("details",en))]},d("div",ei)));let e_=new Set(Array.from(v.querySelectorAll("details[open]")).map(e=>e.getAttribute("data-device")));v.replaceChildren(...(e.devices??[]).map(t=>(function(e,t,r,n,i,a,s,o,u){var f,b,h,m,y,v,w,x,k,z,j,S,C,$,M,P,O,A,N,R,I,T,D,q,W,B,Z,U,V,F,J,K,Q,G,H,X,Y,ee,et,er,en,ei,ea,es,eo,el,ed,ec,ep,eu,e_,eg,ef,eb,eh,em,ey,ev,ew,ex;let ek=e.provisioning,ez="none"!==e.provisioning_adapter,ej=!["completed","not_started","interrupted","disabled"].includes(ek.state),eS=[...Object.entries(ek.wan_lifecycle??{}).map(e=>{let[t,r]=e;return{...r,id:`WAN ${t}`,kind:"wan_activation",service_type:"wan"}}),...Object.entries(ek.wifi_lifecycle??{}).map(e=>{let[t,r]=e;return{...r,id:`WLAN ${t}`,kind:"ssid",service_type:"wifi"}})];return ex={class:"cbi-section fttr-device-card",children:[(y={class:"fttr-card-header",children:[(h={class:"fttr-card-title-group",children:[d("h3",{style:"margin:0",children:e.name||e.optical_sn}),(b={class:"fttr-card-meta-tags",children:[e.group_name?d("span",{class:"fttr-badge fttr-badge-neutral",title:_("Group"),children:e.group_name}):null,e.template_name?d("span",{class:"fttr-badge fttr-badge-neutral",title:_("Template"),children:e.template_name}):null,d("span",{class:"fttr-badge fttr-badge-neutral",title:_("OMCI adapter"),children:["OMCI: ",e.omci_adapter]}),d("span",{class:"fttr-badge fttr-badge-neutral",title:_("ACS bootstrap"),children:["ACS bootstrap: ",e.bootstrap_adapter]}),d("span",{class:"fttr-badge fttr-badge-neutral",title:_("Business provisioning"),children:["Provisioning: ",e.provisioning_adapter]})]},d("div",b))]},d("div",h)),L.hasViewPermission()?(m={class:"fttr-card-actions",children:[d("button",{type:"button",class:"cbi-button cbi-button-action",onclick:()=>i(e),children:_("View OMCI / MIB details")}),d("button",{type:"button",class:"cbi-button cbi-button-positive",disabled:u||ej||!o||!ez,title:o&&ez?ej?_("This device already has an active synchronization operation"):_("Start configuration delivery for this device"):_("Provisioning is disabled"),onclick:()=>n(e),children:_("Sync now")}),d("button",{type:"button",class:"cbi-button cbi-button-positive",disabled:u,title:_("Clear old tasks and managed-object records after a device factory reset. The next preview or apply reads the device again."),onclick:()=>{let t=e.name||e.optical_sn;window.confirm(_("Are you sure you want to reset the synchronization state for %s?").replace("%s",t))&&r(e)},children:_("Reset synchronization state")})]},d("div",m)):null]},d("div",y)),(k={class:"fttr-device-status-strip","aria-label":_("Transport observations"),children:(x={class:"fttr-status-pill-group",children:[(v={children:[d("span",{class:"fttr-pill-label",children:"CWMP:"})," ",nA(e.management?.state,e.management?.last_inform?`${_("Last Inform: %s").replace("%s",p(e.management.last_inform))}${null!=e.management.age_seconds?` (${g(e.management.age_seconds)})`:""}`:void 0)]},d("span",v)),(w={children:[d("span",{class:"fttr-pill-label",children:"MQTT:"})," ",nA(e.mqtt?.state)]},d("span",w))]},d("div",x))},d("section",k)),(K={"aria-label":_("ACS bootstrap"),children:[(f=e.acs_bootstrap)?"inflight"in f?(F={style:"margin-top:1.2em",children:[(j={style:"display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:0.5em",children:[d("h4",{style:"margin:0",children:_("ACS bootstrap")}),(z={style:"display:flex;align-items:center;gap:6px",children:[nA(f.state),f.inflight?d("span",{class:"fttr-badge fttr-badge-info",children:_("Command in progress")}):null]},d("div",z))]},d("div",j)),(Z={class:"fttr-card",children:[(q={class:"fttr-grid-3",children:[(M={children:[(S={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:_("Method")}),d("code",{children:c(f.method)})]},d("div",S)),(C={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:_("Attempts")}),d("span",{children:c(f.attempts)})]},d("div",C)),($={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:_("Identity source")}),d("span",{children:c(f.binding_source)})]},d("div",$))]},d("div",M)),(N={children:[(P={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:_("Management VLAN")}),d("span",{children:f.desired?.vlan!==void 0?`VLAN ${f.desired.vlan} (Prio ${f.desired.priority??0})`:"—"})]},d("div",P)),(O={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:_("ACS URL")}),d("code",{style:"font-size:80%",children:c(f.desired?.acs_url)})]},d("div",O)),(A={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:_("Local ACS listener")}),d("code",{style:"font-size:80%",children:f.listener?.listen?`${f.listener.listen}${f.listener.path||""}`:"—"})]},d("div",A))]},d("div",N)),(D={children:[(R={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:_("Last telemetry")}),d("span",{style:"font-size:85%",children:p(f.mqtt_last_seen)})]},d("div",R)),(I={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:_("Last Inform")}),d("span",{style:"font-size:85%",children:p(f.last_inform)})]},d("div",I)),(T={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:_("Settings verified")}),d("span",{style:"font-size:85%",children:p(f.settings_verified_at)})]},d("div",T))]},d("div",D))]},d("div",q)),f.mqtt_target?(W={style:"font-size:85%;color:#666;margin-top:6px;border-top:1px dashed rgba(127,140,141,0.15);padding-top:6px",children:[d("span",{style:"color:#888",children:[_("MQTT target"),":"]})," ",d("code",{children:f.mqtt_target})]},d("div",W)):null,f.reason?d("div",{style:"font-size:85%;color:#d35400;margin-top:6px;overflow-wrap:anywhere",children:f.reason}):null,"awaiting_apply"===f.state?(B={style:"margin-top:10px;padding:8px;background:rgba(243,156,18,0.1);border-radius:4px;border:1px solid rgba(243,156,18,0.3)",children:[d("button",{type:"button",class:"cbi-button cbi-button-positive",disabled:s,onclick:a,children:_("Authorize and apply management settings")})," ",d("span",{style:"font-size:85%;color:#666",children:_("Authorizes recovery of the child ACS settings after management drift or service restart. Business synchronization uses its own transport readiness.")})]},d("div",B)):null]},d("div",Z)),[f.last_error,f.link_identity_error,f.persistence_error,f.listener?.error,f.endpoint_notice].filter(Boolean).map(e=>d("div",{class:"alert-message warning",style:"overflow-wrap:anywhere;margin-top:8px",children:e})),f.manual_steps?.length?(V={style:"margin-top:8px",children:[d("summary",{style:"cursor:pointer;user-select:none;font-weight:600",children:_("Management setup / reachability guidance")}),(U={style:"padding:6px 0",children:f.manual_steps.map((e,t)=>d("p",{style:"margin:4px 0;font-size:90%",children:[t+1,". ",e]}))},d("div",U))]},d("details",V)):null]},d("div",F)):(J={class:"fttr-card",children:[d("h4",{children:_("ACS bootstrap")}),nA(f.state),d("p",{children:f.reason})]},d("div",J)):null,"omci-acs"===e.bootstrap_adapter?d("p",{children:[_("OMCI ACS association"),": ",nA(e.omci_management?.state)," ",e.omci_management?.reason]}):null]},d("section",K)),(ew={"aria-label":_("Business provisioning"),children:[d("h4",{style:"margin-top:1.2em",children:_("Business provisioning")}),(ei={class:"fttr-device-status-strip",children:[(H={class:"fttr-status-pill-group",children:[(Q={children:[d("span",{class:"fttr-pill-label",children:[_("Synchronization"),":"]})," ",nA(ek.state)]},d("span",Q)),(G={children:[d("span",{class:"fttr-pill-label",children:"Wi-Fi:"})," ",nA(e.wifi_sync)]},d("span",G))]},d("div",H)),(en={class:"fttr-status-op-info",children:[(X={children:[_("Operation"),": ",d("strong",{children:c(ek.operation_id)})," (",c(ek.mode),")"]},d("span",X)),d("span",{children:"·"}),d("span",{children:[_("Started"),": ",p(ek.started_at)]}),d("span",{children:"·"}),(Y={children:[_("Revision"),": ",d("code",{children:c(ek.revision)})]},d("span",Y)),ek.attempts?(et={children:[d("span",{children:"·"}),(ee={style:"color:#e67e22",children:[_("Attempts"),": ",d("strong",{children:ek.attempts})]},d("span",ee))]},d(l,et)):null,ek.next_retry_at&&ek.next_retry_at>Math.floor(Date.now()/1e3)?(er={children:[d("span",{children:"·"}),d("span",{style:"color:#d35400",children:_("Next self-healing retry in %d seconds").replace("%d",String(ek.next_retry_at-Math.floor(Date.now()/1e3)))})]},d(l,er)):null]},d("div",en))]},d("div",ei)),ek.reconcile_reason?d("div",{class:"alert-message info",style:"margin:8px 0;font-size:85%",children:ek.reconcile_reason}):null,nE(ek.items??[]),ek.cwmp_contract?(eg={style:"margin-top:1.2em",children:[d("h4",{style:"margin-bottom:0.5em",children:_("CWMP contract")}),(e_={class:"fttr-card",children:[(es={style:"display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:8px",children:[(ea={children:[d("span",{children:c(ek.cwmp_contract.requested)})," →"," ",d("code",{children:c(ek.cwmp_contract.contract)})]},d("div",ea)),d("div",{children:nA(ek.cwmp_contract.state)})]},d("div",es)),(ep={style:"display:flex;flex-wrap:wrap;gap:12px;margin-bottom:6px;font-size:90%",children:[(eo={children:[d("span",{style:"color:#888",children:"WAN:"})," ",nA(ek.cwmp_contract.capabilities?.wan)]},d("span",eo)),(el={children:[d("span",{style:"color:#888",children:"WLAN:"})," ",nA(ek.cwmp_contract.capabilities?.wlan)]},d("span",el)),(ed={children:[d("span",{style:"color:#888",children:[_("Bindings"),":"]})," ",nA(ek.cwmp_contract.capabilities?.binding)]},d("span",ed)),(ec={children:[d("span",{style:"color:#888",children:[_("Cache"),":"]})," ",d("span",{class:"fttr-badge fttr-badge-info",style:"font-size:80%",children:ek.cwmp_contract.cache_hit?_("Matched"):_("Fresh discovery")})]},d("span",ec))]},d("div",ep)),ek.cwmp_contract.schema?(eu={style:"font-size:85%;color:#666",children:[_("Schema"),": ",d("code",{children:ek.cwmp_contract.schema})]},d("div",eu)):null,ek.cwmp_contract.reason?d("div",{style:"font-size:85%;margin-top:4px;color:#e67e22",children:ek.cwmp_contract.reason}):null]},d("div",e_))]},d("div",eg)):null,eS.length?(ef={style:"margin-top:1.2em",children:[d("h4",{style:"margin-bottom:0.5em",children:_("WAN / WLAN lifecycle results")}),nE(eS)]},d("div",ef)):null,(ev={"data-device":e.device,open:t,style:"margin-top:1em",children:[d("summary",{style:"cursor:pointer;user-select:none;font-weight:600",children:_("Managed objects and lifecycle intent")}),(ey={style:"padding:8px 0",children:[(em={style:"display:flex;gap:16px;flex-wrap:wrap;font-size:90%;margin-bottom:6px",children:[(eb={children:[d("span",{style:"color:#888",children:[_("Wi-Fi cleanup policy"),":"]})," ",c(ek.wifi_cleanup)]},d("span",eb)),(eh={children:[d("span",{style:"color:#888",children:[_("Wi-Fi stage"),":"]})," ",c(ek.wifi_stage)]},d("span",eh))]},d("div",em)),d("pre",{style:"white-space:pre-wrap;overflow-wrap:anywhere;font-size:85%;background:rgba(0,0,0,0.03);padding:8px;border-radius:4px;max-height:240px;overflow-y:auto",children:JSON.stringify({wan_objects:ek.wan_objects??{},wifi_objects:ek.wifi_objects??{}},null,2)})]},d("div",ey))]},d("details",ev))]},d("section",ew))]},d("div",ex)})(t,e_.has(t.device),C,$,M,()=>P("management_apply"),T.disabled,e.enabled,z)))}return y.addEventListener("change",()=>B(x)),B(o),L.Poll.add(async()=>{if(W.isConnected&&!j){j=!0;try{let[e,t]=await Promise.all([nd(),nc()]);k=t,B(e)}catch(e){h.hidden=!1,h.textContent=_("Status refresh failed: %s").format(String(e))}finally{j=!1}}},5),W},handleSave:null,handleSaveApply:null,handleReset:null})})(),main=t.main;
return main;
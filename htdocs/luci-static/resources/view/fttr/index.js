'use strict';
var main,e={};e.d=(t,r,n)=>{var i=(r,n)=>{for(var i in r)e.o(r,i)&&!e.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,[n]:r[i]})};i(r,"get"),i(n,"value")},e.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var t={};(()=>{var r;let n,i,a,o,s,l;e.d(t,{main:()=>main});let d=Symbol.for("jsx.fragment");function c(e,t){let{children:r,...n}=null===t||"object"!=typeof t||Array.isArray(t)?{}:t,i=function e(t){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];for(let n of t)null!=n&&"boolean"!=typeof n&&(Array.isArray(n)?e(n,r):r.push(n instanceof Node?n:String(n)));return r}(null==r?[]:Array.isArray(r)?r:[r]);if(e===d){let e=document.createDocumentFragment();return e.append(...i),e}if("function"==typeof e){let t=Reflect.apply(e,void 0,[{...n,children:i}]);if(!(t instanceof Node))throw TypeError("JSX components must return a DOM Node");return t}if("string"!=typeof e)throw TypeError("JSX element types must be tag names or component functions");let a={},o={...n};for(let[e,t]of Object.entries(o))e.startsWith("on")&&"function"==typeof t?(a[e]=t,delete o[e]):"boolean"==typeof t&&(t?o[e]=e:delete o[e]);let s=Object.keys(o).length>0?i.length>1?E(e,o,i):E(e,o,i[0]):i.length>1?E(e,{},i):E(e,{},i[0]);for(let[e,t]of Object.entries(a)){let r=e.slice(2).toLowerCase();s.addEventListener(r,t)}return s}function p(){return"u">typeof document&&document.hidden}function u(e,t,r){function n(r,n){if(r._zod||Object.defineProperty(r,"_zod",{value:{def:n,constr:o,traits:new Set},enumerable:!1}),r._zod.traits.has(e))return;r._zod.traits.add(e),t(r,n);let i=o.prototype,a=Object.keys(i);for(let e=0;e<a.length;e++){let t=a[e];t in r||(r[t]=i[t].bind(r))}}let i=r?.Parent??Object;class a extends i{}function o(e){var t;let i=r?.Parent?new a:this;for(let r of(n(i,e),(t=i._zod).deferred??(t.deferred=[]),i._zod.deferred))r();return i}return Object.defineProperty(a,"name",{value:e}),Object.defineProperty(o,"init",{value:n}),Object.defineProperty(o,Symbol.hasInstance,{value:t=>!!r?.Parent&&t instanceof r.Parent||t?._zod?.traits?.has(e)}),Object.defineProperty(o,"name",{value:e}),o}Object.freeze({status:"aborted"}),Symbol("zod_brand");class f extends Error{constructor(){super("Encountered Promise during synchronous parse. Use .parseAsync() instead.")}}let b={};function g(e){return e&&Object.assign(b,e),b}function m(e,t){return"bigint"==typeof t?t.toString():t}function h(e){let t=+!!e.startsWith("^"),r=e.endsWith("$")?e.length-1:e.length;return e.slice(t,r)}let v=Symbol("evaluating");function y(e,t,r){let n;Object.defineProperty(e,t,{get(){if(n!==v)return void 0===n&&(n=v,n=r()),n},set(r){Object.defineProperty(e,t,{value:r})},configurable:!0})}let w="captureStackTrace"in Error?Error.captureStackTrace:(...e)=>{};function x(e){return"object"==typeof e&&null!==e&&!Array.isArray(e)}function k(e){if(!1===x(e))return!1;let t=e.constructor;if(void 0===t||"function"!=typeof t)return!0;let r=t.prototype;return!1!==x(r)&&!1!==Object.prototype.hasOwnProperty.call(r,"isPrototypeOf")}function z(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function j(e){if(!e)return{};if("string"==typeof e)return{error:()=>e};if(e?.message!==void 0){if(e?.error!==void 0)throw Error("Cannot specify both `message` and `error` params");e.error=e.message}return(delete e.message,"string"==typeof e.error)?{...e,error:()=>e.error}:e}function C(e,t=0){if(!0===e.aborted)return!0;for(let r=t;r<e.issues.length;r++)if(e.issues[r]?.continue!==!0)return!0;return!1}function $(e,t){return t.map(t=>(t.path??(t.path=[]),t.path.unshift(e),t))}function S(e){return"string"==typeof e?e:e?.message}function P(e,t,r){let n={...e,path:e.path??[]};return e.message||(n.message=S(e.inst?._zod.def?.error?.(e))??S(t?.error?.(e))??S(r.customError?.(e))??S(r.localeError?.(e))??"Invalid input"),delete n.inst,delete n.continue,t?.reportInput||delete n.input,n}let O=(e,t)=>{e.name="$ZodError",Object.defineProperty(e,"_zod",{value:e._zod,enumerable:!1}),Object.defineProperty(e,"issues",{value:t,enumerable:!1}),e.message=JSON.stringify(t,m,2),Object.defineProperty(e,"toString",{value:()=>e.message,enumerable:!1})},M=u("$ZodError",O),N=u("$ZodError",O,{Parent:Error}),R=(a=N,(e,t,r,n)=>{let i=r?Object.assign(r,{async:!1}):{async:!1},o=e._zod.run({value:t,issues:[]},i);if(o instanceof Promise)throw new f;if(o.issues.length){let e=new(n?.Err??a)(o.issues.map(e=>P(e,i,g())));throw w(e,n?.callee),e}return o.value}),I=(o=N,async(e,t,r,n)=>{let i=r?Object.assign(r,{async:!0}):{async:!0},a=e._zod.run({value:t,issues:[]},i);if(a instanceof Promise&&(a=await a),a.issues.length){let e=new(n?.Err??o)(a.issues.map(e=>P(e,i,g())));throw w(e,n?.callee),e}return a.value}),T=(s=N,(e,t,r)=>{let n=r?{...r,async:!1}:{async:!1},i=e._zod.run({value:t,issues:[]},n);if(i instanceof Promise)throw new f;return i.issues.length?{success:!1,error:new(s??M)(i.issues.map(e=>P(e,n,g())))}:{success:!0,data:i.value}}),A=(l=N,async(e,t,r)=>{let n=r?Object.assign(r,{async:!0}):{async:!0},i=e._zod.run({value:t,issues:[]},n);return i instanceof Promise&&(i=await i),i.issues.length?{success:!1,error:new l(i.issues.map(e=>P(e,n,g())))}:{success:!0,data:i.value}}),D=/^-?\d+(?:\.\d+)?$/,U=/^(?:true|false)$/i,q=/^null$/i,B={major:4,minor:3,patch:6},F=u("$ZodType",(e,t)=>{var r;e??(e={}),e._zod.def=t,e._zod.bag=e._zod.bag||{},e._zod.version=B;let n=[...e._zod.def.checks??[]];for(let t of(e._zod.traits.has("$ZodCheck")&&n.unshift(e),n))for(let r of t._zod.onattach)r(e);if(0===n.length)(r=e._zod).deferred??(r.deferred=[]),e._zod.deferred?.push(()=>{e._zod.run=e._zod.parse});else{let t=(e,t,r)=>{let n,i=C(e);for(let a of t){if(a._zod.def.when){if(!a._zod.def.when(e))continue}else if(i)continue;let t=e.issues.length,o=a._zod.check(e);if(o instanceof Promise&&r?.async===!1)throw new f;if(n||o instanceof Promise)n=(n??Promise.resolve()).then(async()=>{await o,e.issues.length!==t&&(i||(i=C(e,t)))});else{if(e.issues.length===t)continue;i||(i=C(e,t))}}return n?n.then(()=>e):e},r=(r,i,a)=>{if(C(r))return r.aborted=!0,r;let o=t(i,n,a);if(o instanceof Promise){if(!1===a.async)throw new f;return o.then(t=>e._zod.parse(t,a))}return e._zod.parse(o,a)};e._zod.run=(i,a)=>{if(a.skipChecks)return e._zod.parse(i,a);if("backward"===a.direction){let t=e._zod.parse({value:i.value,issues:[]},{...a,skipChecks:!0});return t instanceof Promise?t.then(e=>r(e,i,a)):r(t,i,a)}let o=e._zod.parse(i,a);if(o instanceof Promise){if(!1===a.async)throw new f;return o.then(e=>t(e,n,a))}return t(o,n,a)}}y(e,"~standard",()=>({validate:t=>{try{let r=T(e,t);return r.success?{value:r.data}:{issues:r.error?.issues}}catch(r){return A(e,t).then(e=>e.success?{value:e.data}:{issues:e.error?.issues})}},vendor:"zod",version:1}))}),Z=u("$ZodString",(e,t)=>{var r;let n;F.init(e,t),e._zod.pattern=[...e?._zod.bag?.patterns??[]].pop()??(n=(r=e._zod.bag)?`[\\s\\S]{${r?.minimum??0},${r?.maximum??""}}`:"[\\s\\S]*",RegExp(`^${n}$`)),e._zod.parse=(r,n)=>{if(t.coerce)try{r.value=String(r.value)}catch(e){}return"string"==typeof r.value||r.issues.push({expected:"string",code:"invalid_type",input:r.value,inst:e}),r}}),V=u("$ZodNumber",(e,t)=>{F.init(e,t),e._zod.pattern=e._zod.bag.pattern??D,e._zod.parse=(r,n)=>{if(t.coerce)try{r.value=Number(r.value)}catch(e){}let i=r.value;if("number"==typeof i&&!Number.isNaN(i)&&Number.isFinite(i))return r;let a="number"==typeof i?Number.isNaN(i)?"NaN":Number.isFinite(i)?void 0:"Infinity":void 0;return r.issues.push({expected:"number",code:"invalid_type",input:i,inst:e,...a?{received:a}:{}}),r}}),W=u("$ZodBoolean",(e,t)=>{F.init(e,t),e._zod.pattern=U,e._zod.parse=(r,n)=>{if(t.coerce)try{r.value=!!r.value}catch(e){}let i=r.value;return"boolean"==typeof i||r.issues.push({expected:"boolean",code:"invalid_type",input:i,inst:e}),r}}),J=u("$ZodNull",(e,t)=>{F.init(e,t),e._zod.pattern=q,e._zod.values=new Set([null]),e._zod.parse=(t,r)=>{let n=t.value;return null===n||t.issues.push({expected:"null",code:"invalid_type",input:n,inst:e}),t}}),G=u("$ZodUnknown",(e,t)=>{F.init(e,t),e._zod.parse=e=>e});function K(e,t,r){e.issues.length&&t.issues.push(...$(r,e.issues)),t.value[r]=e.value}let H=u("$ZodArray",(e,t)=>{F.init(e,t),e._zod.parse=(r,n)=>{let i=r.value;if(!Array.isArray(i))return r.issues.push({expected:"array",code:"invalid_type",input:i,inst:e}),r;r.value=Array(i.length);let a=[];for(let e=0;e<i.length;e++){let o=i[e],s=t.element._zod.run({value:o,issues:[]},n);s instanceof Promise?a.push(s.then(t=>K(t,r,e))):K(s,r,e)}return a.length?Promise.all(a).then(()=>r):r}});function X(e,t,r,n,i){if(e.issues.length){if(i&&!(r in n))return;t.issues.push(...$(r,e.issues))}void 0===e.value?r in n&&(t.value[r]=void 0):t.value[r]=e.value}let Q=u("$ZodObject",(e,t)=>{var r;let n;F.init(e,t);let i=Object.getOwnPropertyDescriptor(t,"shape");if(!i?.get){let e=t.shape;Object.defineProperty(t,"shape",{get:()=>{let r={...e};return Object.defineProperty(t,"shape",{value:r}),r}})}let a=(r=()=>(function(e){var t;let r=Object.keys(e.shape);for(let t of r)if(!e.shape?.[t]?._zod?.traits?.has("$ZodType"))throw Error(`Invalid element at key "${t}": expected a Zod schema`);let n=Object.keys(t=e.shape).filter(e=>"optional"===t[e]._zod.optin&&"optional"===t[e]._zod.optout);return{...e,keys:r,keySet:new Set(r),numKeys:r.length,optionalKeys:new Set(n)}})(t),{get value(){{let e=r();return Object.defineProperty(this,"value",{value:e}),e}}});y(e._zod,"propValues",()=>{let e=t.shape,r={};for(let t in e){let n=e[t]._zod;if(n.values)for(let e of(r[t]??(r[t]=new Set),n.values))r[t].add(e)}return r});let o=t.catchall;e._zod.parse=(t,r)=>{n??(n=a.value);let i=t.value;if(!x(i))return t.issues.push({expected:"object",code:"invalid_type",input:i,inst:e}),t;t.value={};let s=[],l=n.shape;for(let e of n.keys){let n=l[e],a="optional"===n._zod.optout,o=n._zod.run({value:i[e],issues:[]},r);o instanceof Promise?s.push(o.then(r=>X(r,t,e,i,a))):X(o,t,e,i,a)}return o?function(e,t,r,n,i,a){let o=[],s=i.keySet,l=i.catchall._zod,d=l.def.type,c="optional"===l.optout;for(let i in t){if(s.has(i))continue;if("never"===d){o.push(i);continue}let a=l.run({value:t[i],issues:[]},n);a instanceof Promise?e.push(a.then(e=>X(e,r,i,t,c))):X(a,r,i,t,c)}return(o.length&&r.issues.push({code:"unrecognized_keys",keys:o,input:t,inst:a}),e.length)?Promise.all(e).then(()=>r):r}(s,i,t,r,a.value,e):s.length?Promise.all(s).then(()=>t):t}});function Y(e,t,r,n){for(let r of e)if(0===r.issues.length)return t.value=r.value,t;let i=e.filter(e=>!C(e));return 1===i.length?(t.value=i[0].value,i[0]):(t.issues.push({code:"invalid_union",input:t.value,inst:r,errors:e.map(e=>e.issues.map(e=>P(e,n,g())))}),t)}let ee=u("$ZodUnion",(e,t)=>{F.init(e,t),y(e._zod,"optin",()=>t.options.some(e=>"optional"===e._zod.optin)?"optional":void 0),y(e._zod,"optout",()=>t.options.some(e=>"optional"===e._zod.optout)?"optional":void 0),y(e._zod,"values",()=>{if(t.options.every(e=>e._zod.values))return new Set(t.options.flatMap(e=>Array.from(e._zod.values)))}),y(e._zod,"pattern",()=>{if(t.options.every(e=>e._zod.pattern)){let e=t.options.map(e=>e._zod.pattern);return RegExp(`^(${e.map(e=>h(e.source)).join("|")})$`)}});let r=1===t.options.length,n=t.options[0]._zod.run;e._zod.parse=(i,a)=>{if(r)return n(i,a);let o=!1,s=[];for(let e of t.options){let t=e._zod.run({value:i.value,issues:[]},a);if(t instanceof Promise)s.push(t),o=!0;else{if(0===t.issues.length)return t;s.push(t)}}return o?Promise.all(s).then(t=>Y(t,i,e,a)):Y(s,i,e,a)}}),et=u("$ZodIntersection",(e,t)=>{F.init(e,t),e._zod.parse=(e,r)=>{let n=e.value,i=t.left._zod.run({value:n,issues:[]},r),a=t.right._zod.run({value:n,issues:[]},r);return i instanceof Promise||a instanceof Promise?Promise.all([i,a]).then(([t,r])=>er(e,t,r)):er(e,i,a)}});function er(e,t,r){let n,i=new Map;for(let r of t.issues)if("unrecognized_keys"===r.code)for(let e of(n??(n=r),r.keys))i.has(e)||i.set(e,{}),i.get(e).l=!0;else e.issues.push(r);for(let t of r.issues)if("unrecognized_keys"===t.code)for(let e of t.keys)i.has(e)||i.set(e,{}),i.get(e).r=!0;else e.issues.push(t);let a=[...i].filter(([,e])=>e.l&&e.r).map(([e])=>e);if(a.length&&n&&e.issues.push({...n,keys:a}),C(e))return e;let o=function e(t,r){if(t===r||t instanceof Date&&r instanceof Date&&+t==+r)return{valid:!0,data:t};if(k(t)&&k(r)){let n=Object.keys(r),i=Object.keys(t).filter(e=>-1!==n.indexOf(e)),a={...t,...r};for(let n of i){let i=e(t[n],r[n]);if(!i.valid)return{valid:!1,mergeErrorPath:[n,...i.mergeErrorPath]};a[n]=i.data}return{valid:!0,data:a}}if(Array.isArray(t)&&Array.isArray(r)){if(t.length!==r.length)return{valid:!1,mergeErrorPath:[]};let n=[];for(let i=0;i<t.length;i++){let a=e(t[i],r[i]);if(!a.valid)return{valid:!1,mergeErrorPath:[i,...a.mergeErrorPath]};n.push(a.data)}return{valid:!0,data:n}}return{valid:!1,mergeErrorPath:[]}}(t.value,r.value);if(!o.valid)throw Error(`Unmergable intersection. Error path: ${JSON.stringify(o.mergeErrorPath)}`);return e.value=o.data,e}let en=u("$ZodRecord",(e,t)=>{F.init(e,t),e._zod.parse=(r,n)=>{let i=r.value;if(!k(i))return r.issues.push({expected:"record",code:"invalid_type",input:i,inst:e}),r;let a=[],o=t.keyType._zod.values;if(o){let s;r.value={};let l=new Set;for(let e of o)if("string"==typeof e||"number"==typeof e||"symbol"==typeof e){l.add("number"==typeof e?e.toString():e);let o=t.valueType._zod.run({value:i[e],issues:[]},n);o instanceof Promise?a.push(o.then(t=>{t.issues.length&&r.issues.push(...$(e,t.issues)),r.value[e]=t.value})):(o.issues.length&&r.issues.push(...$(e,o.issues)),r.value[e]=o.value)}for(let e in i)l.has(e)||(s=s??[]).push(e);s&&s.length>0&&r.issues.push({code:"unrecognized_keys",input:i,inst:e,keys:s})}else for(let o of(r.value={},Reflect.ownKeys(i))){if("__proto__"===o)continue;let s=t.keyType._zod.run({value:o,issues:[]},n);if(s instanceof Promise)throw Error("Async schemas not supported in object keys currently");if("string"==typeof o&&D.test(o)&&s.issues.length){let e=t.keyType._zod.run({value:Number(o),issues:[]},n);if(e instanceof Promise)throw Error("Async schemas not supported in object keys currently");0===e.issues.length&&(s=e)}if(s.issues.length){"loose"===t.mode?r.value[o]=i[o]:r.issues.push({code:"invalid_key",origin:"record",issues:s.issues.map(e=>P(e,n,g())),input:o,path:[o],inst:e});continue}let l=t.valueType._zod.run({value:i[o],issues:[]},n);l instanceof Promise?a.push(l.then(e=>{e.issues.length&&r.issues.push(...$(o,e.issues)),r.value[s.value]=e.value})):(l.issues.length&&r.issues.push(...$(o,l.issues)),r.value[s.value]=l.value)}return a.length?Promise.all(a).then(()=>r):r}}),ei=u("$ZodLiteral",(e,t)=>{if(F.init(e,t),0===t.values.length)throw Error("Cannot create literal schema with no valid values");let r=new Set(t.values);e._zod.values=r,e._zod.pattern=RegExp(`^(${t.values.map(e=>"string"==typeof e?z(e):e?z(e.toString()):String(e)).join("|")})$`),e._zod.parse=(n,i)=>{let a=n.value;return r.has(a)||n.issues.push({code:"invalid_value",values:t.values,input:a,inst:e}),n}});function ea(e,t){return e.issues.length&&void 0===t?{issues:[],value:void 0}:e}let eo=u("$ZodOptional",(e,t)=>{F.init(e,t),e._zod.optin="optional",e._zod.optout="optional",y(e._zod,"values",()=>t.innerType._zod.values?new Set([...t.innerType._zod.values,void 0]):void 0),y(e._zod,"pattern",()=>{let e=t.innerType._zod.pattern;return e?RegExp(`^(${h(e.source)})?$`):void 0}),e._zod.parse=(e,r)=>{if("optional"===t.innerType._zod.optin){let n=t.innerType._zod.run(e,r);return n instanceof Promise?n.then(t=>ea(t,e.value)):ea(n,e.value)}return void 0===e.value?e:t.innerType._zod.run(e,r)}});Symbol("ZodOutput"),Symbol("ZodInput");(r=globalThis).__zod_globalRegistry??(r.__zod_globalRegistry=new class e{constructor(){this._map=new WeakMap,this._idmap=new Map}add(e,...t){let r=t[0];return this._map.set(e,r),r&&"object"==typeof r&&"id"in r&&this._idmap.set(r.id,e),this}clear(){return this._map=new WeakMap,this._idmap=new Map,this}remove(e){let t=this._map.get(e);return t&&"object"==typeof t&&"id"in t&&this._idmap.delete(t.id),this._map.delete(e),this}get(e){let t=e._zod.parent;if(t){let r={...this.get(t)??{}};delete r.id;let n={...r,...this._map.get(e)};return Object.keys(n).length?n:void 0}return this._map.get(e)}has(e){return this._map.has(e)}});let es=u("ZodMiniType",(e,t)=>{if(!e._zod)throw Error("Uninitialized schema in ZodMiniType.");F.init(e,t),e.def=t,e.type=t.type,e.parse=(t,r)=>R(e,t,r,{callee:e.parse}),e.safeParse=(t,r)=>T(e,t,r),e.parseAsync=async(t,r)=>I(e,t,r,{callee:e.parseAsync}),e.safeParseAsync=async(t,r)=>A(e,t,r),e.check=(...r)=>e.clone({...t,checks:[...t.checks??[],...r.map(e=>"function"==typeof e?{_zod:{check:e,def:{check:"custom"},onattach:[]}}:e)]},{parent:!0}),e.with=e.check,e.clone=(t,r)=>{let n;return n=new e._zod.constr(t??e._zod.def),(!t||r?.parent)&&(n._zod.parent=e),n},e.brand=()=>e,e.register=(t,r)=>(t.add(e,r),e),e.apply=t=>t(e)}),el=u("ZodMiniString",(e,t)=>{Z.init(e,t),es.init(e,t)});function ed(e){return new el({type:"string",...j(e)})}let ec=u("ZodMiniNumber",(e,t)=>{V.init(e,t),es.init(e,t)});function ep(e){return new ec({type:"number",checks:[],...j(e)})}let eu=u("ZodMiniBoolean",(e,t)=>{W.init(e,t),es.init(e,t)});function e_(e){return new eu({type:"boolean",...j(e)})}let ef=u("ZodMiniNull",(e,t)=>{J.init(e,t),es.init(e,t)});function eb(e){return new ef({type:"null",...j(e)})}let eg=u("ZodMiniUnknown",(e,t)=>{G.init(e,t),es.init(e,t)}),em=u("ZodMiniArray",(e,t)=>{H.init(e,t),es.init(e,t)});function eh(e,t){return new em({type:"array",element:e,...j(t)})}let ev=u("ZodMiniObject",(e,t)=>{Q.init(e,t),es.init(e,t),y(e,"shape",()=>t.shape)});function ey(e,t){return new ev({type:"object",shape:e??{},...j(t)})}let ew=u("ZodMiniUnion",(e,t)=>{ee.init(e,t),es.init(e,t)});function ex(e,t){return new ew({type:"union",options:e,...j(t)})}let ek=u("ZodMiniIntersection",(e,t)=>{et.init(e,t),es.init(e,t)});function ez(e,t){return new ek({type:"intersection",left:e,right:t})}let ej=u("ZodMiniRecord",(e,t)=>{en.init(e,t),es.init(e,t)});function eC(e,t,r){return new ej({type:"record",keyType:e,valueType:t,...j(r)})}let e$=u("ZodMiniLiteral",(e,t)=>{ei.init(e,t),es.init(e,t)});function eS(e,t){return new e$({type:"literal",values:Array.isArray(e)?e:[e],...j(t)})}let eP=u("ZodMiniOptional",(e,t)=>{eo.init(e,t),es.init(e,t)});function eO(e){return new eP({type:"optional",innerType:e})}let eM=ex([eS("account_set_password"),eS("account_set_active")]),eE=ex([eS("waiting_transport"),eS("waiting_identity"),eS("reading"),eS("configuring"),eS("verifying"),eS("waiting_inform"),eS("ready"),eS("retry_wait"),eS("manual_required"),eS("not_configured"),eS("waiting_acs"),eS("awaiting_apply"),eS("discovering_management_wan"),eS("configuring_management_wan"),eS("verifying_management_wan")]),eN=ey({enabled:e_(),listen:ex([ed(),eb()]),path:ex([ed(),eb()]),error:ex([ed(),eb()])}),eR=ey({vlan:ep(),vlans:eh(ep()),priority:ep(),acs_url:ed()}),eL=ey({state:eE,optical_sn:ed(),cwmp_id:ed(),mqtt_target:ex([ed(),eb()]),binding_source:ed(),method:ed(),desired_version:ed(),generation:ep(),reason:ed(),attempts:ep(),next_retry_at:ep(),updated_at:ep(),settings_verified_at:ex([ep(),eb()]),selected_vlan:ex([ep(),eb()]),last_inform:ex([ep(),eb()]),expected_acs_url:ed(),last_error:ex([ed(),eb()]),transport_epoch:ep(),completed_authorization:ep(),connection_request_enabled:ex([e_(),eb()]),inflight:e_(),persistence_error:ex([ed(),eb()]),link_identity_error:ex([ed(),eb()]),listener:eN,mqtt_last_seen:ex([ep(),eb()]),desired:eO(eR),endpoint_notice:eO(ed()),manual_steps:eO(eh(ed()))}),eI=ex([eS("not_required"),eS("pending"),eS("unavailable")]),eT=ex([eL,ey({state:eI,reason:ed()})]),eA=ey({id:ed(),name:ed()}),eD=ey({omci:eh(eA),bootstrap:eh(eA),provisioning:eh(eA)}),eU=ey({configured:ed(),effective:ed(),available:eh(ed()),reason:ed()}),eq=ey({phase:ex([eS("not_started"),eS("collecting_identity"),eS("retrying_identity"),eS("unsupported"),eS("configuring"),eS("verifying"),eS("wan_bootstrap_pending"),eS("verified"),eS("retrying"),eS("offline")]),generation:ep(),error:ex([ed(),eb()])}),eB=ex([eS("auto"),eS("factory"),eS("firmware"),eS("builtin")]),eF=ex([eS("factory"),eS("firmware"),eS("builtin")]),eZ=ey({source:eF,raw_sha256:ed(),effective_sha256:ed(),size:ep(),supplemented:e_(),temperature_compensation_enabled:e_()}),eV=ey({enabled:e_(),reason:ed(),calibration_sha256:ex([ed(),eb()]),raw_temperature:ex([ep(),eb()]),table_index:ex([ep(),eb()]),target_code:ex([ep(),eb()]),last_check_unix:ex([ep(),eb()]),last_write_unix:ex([ep(),eb()]),error:ex([ed(),eb()])}),eW=ey({selected:eB,candidate:ex([eZ,eb()]),candidate_error:ex([ed(),eb()]),active:ex([eZ,eb()]),hardware_applied:e_(),pending:e_(),temperature_compensation:eV});ey({success:e_(),state:eO(eW),output:eO(ed()),error:eO(ed())});let eJ=ey({detected:e_(),device:ed(),has_data:e_(),sha256:ed(),data:ed()}),eG=ey({exists:e_(),path:ed(),size:ep(),sha256:ed(),data:ed()}),eK=ey({source:eF,active_path:ed(),size:ep(),sha256:ed(),data:ed(),factory:eJ,firmware:eG,state:eO(eW)}),eH=ey({error:ed()});ex([eK,eH]);let eX=ey({success:e_(),path:ed(),size:ep(),sha256:ed()});ex([eX,eH]),ey({data:ed()}),ey({source:eB});let eQ=ey({acs:e_(),mqtt:e_(),npu:e_(),"device-hl202":e_(),"device-hwtc":e_(),"device-star":e_(),"device-zte":e_(),"device-scty":e_()}),eY=ey({optical:e_(),bridge_offload:e_(),omci_mib:e_(),mqtt_telemetry:e_(),hl202_management:e_(),cwmp:e_(),command_provisioning:e_()}),e0=ey({status:e_(),config:e_(),sync:e_(),hardware:e_(),calibration:e_(),hl202:e_(),about:e_()}),e1=ey({schema_version:eS(1),version:ed(),features:eQ,functions:eY,pages:e0,adapters:eD}),e2=ex([ey({valid:eS(!0),revision:ed(),devices:ep()}),ey({error:ed()})]),e5=ex([eS("disabled"),eS("waiting"),eS("wan_reconciling"),eS("wan_verifying"),eS("wifi_reconciling"),eS("discovering"),eS("reading"),eS("disabling"),eS("disabling_read"),eS("writing"),eS("verifying"),eS("settling"),eS("completed"),eS("not_started"),eS("reset_pending"),eS("interrupted"),eS("recovering"),eS("waiting_management"),eS("waiting_task")]),e4=ey({operation_id:ep(),device:ed(),state:e5,started_at:ep()}),e3=ey({state:ex([eS("waiting"),eS("applied")]),requested_revision:ed(),requested_at:ex([ep(),eb()]),blocking_operations:eh(e4),reset_pending:e_()}),e6=ex([eS("auto"),eS("manual")]),e8=eS("diff"),e7=ey({state:ed(),enabled:e_(),reason:eO(ex([ed(),eb()])),revision:eO(ed()),vlan:eO(ep()),updated_at:eO(ep())}),e9=ex([eS("disabled"),eS("online"),eS("waiting_inform"),eS("offline_or_stale"),eS("waiting_transport")]),te=ey({cwmp_id:ed(),state:e9,optical_online:e_(),last_inform:ex([ep(),eb()]),age_seconds:ex([ep(),eb()])}),tt=ey({state:e9,optical_online:e_()}),tr=ex([eS("device_service"),eS("ssid"),eS("port_binding"),eS("wan_activation")]),tn=ey({name:ed(),desired:ed()}),ti=ey({id:ed(),name:eO(ex([ed(),eb()])),kind:tr,service_type:ed(),state:ed(),reason:eO(ed()),revision:eO(ed()),current_revision:eO(e_()),management_fresh:eO(e_()),operation_id:eO(ep()),task_id:eO(ex([ep(),eb()])),updated_at:eO(ep()),changes:eO(eh(tn))}),ta=ex([eS("plan"),eS("apply")]),to=ey({wan:ed(),wlan:ed(),binding:ed()}),ts=ey({state:ed(),requested:ed(),contract:ex([ed(),eb()]),reason:ed(),cache_hit:e_(),schema:ed(),capabilities:ex([to,eb()])}),tl=ey({parent:ep(),connection:ep(),state:ed(),service_list:ed(),kind:ed(),baseline:ex([eh(ep()),eb()])}),td=ey({state:ed(),reason:eO(ed()),task_id:eO(ex([ep(),eb()])),instance:eO(ep()),cwmp_id:eO(ed())}),tc=ex([eS("waiting"),eS("inventory"),eS("classifying"),eS("adding_parent"),eS("child_names"),eS("adding_child"),eS("delete_guard"),eS("deleting"),eS("verify_delete"),eS("empty_parent"),eS("deleting_parent"),eS("verify_parent_delete"),eS("next"),eS("done")]),tp=ey({owned:eh(ep()),pending:ex([ed(),eb()]),pending_instance:ex([ep(),eb()])}),tu=ex([eS("waiting"),eS("inventory"),eS("adding"),eS("verify_add"),eS("deleting"),eS("verify_delete"),eS("reading_disable"),eS("disabling"),eS("verifying_disable"),eS("next"),eS("done")]),t_=ex([eS("disable"),eS("preserve"),eS("delete")]),tf=ey({parent:ep(),child:ep(),service:ed(),vlan:ed()}),tb=ey({state:e5,items:eh(ti),omci_adapter:eO(ed()),bootstrap_adapter:eO(ed()),provisioning_adapter:eO(ed()),backend:eO(eU),operation_id:eO(ep()),device:eO(ed()),optical_sn:eO(ed()),cwmp_id:eO(ed()),revision:eO(ed()),mode:eO(ta),started_at:eO(ep()),completed_at:eO(ex([ep(),eb()])),current_revision:eO(e_()),management_fresh:eO(e_()),reason:eO(ed()),error:eO(ed()),attempts:eO(ep()),next_retry_at:eO(ep()),reconcile_reason:eO(ed()),cwmp_contract:eO(ts),wan_objects:eO(eC(ed(),tl)),wan_lifecycle:eO(eC(ed(),td)),wan_stage:eO(tc),wifi_objects:eO(tp),wifi_lifecycle:eO(eC(ed(),td)),wifi_stage:eO(tu),wifi_cleanup:eO(t_),native_ownership:eO(eC(ed(),tf)),write_performed:eO(e_()),readback_verified:eO(e_())}),tg=ex([eS("disabled"),eS("not_configured"),eS("stale_revision"),eS("stale_management"),eS("verified"),eS("attention_required"),eS("accepted_unverified"),eS("pending"),eS("recovering"),eS("waiting_management")]),tm=ey({device:ed(),name:ex([ed(),eb()]),group:ex([ed(),eb()]),group_name:ex([ed(),eb()]),template:ex([ed(),eb()]),template_name:ex([ed(),eb()]),optical_sn:ed(),omci_adapter:ed(),bootstrap_adapter:ed(),provisioning_adapter:ed(),omci_management:e7,management:ex([te,eb()]),mqtt:ex([tt,eb()]),acs_bootstrap:eT,provisioning:tb,services:eh(ti),ssids:eh(ti),wifi_sync:tg}),th=ex([eS("discovering"),eS("comparing"),eS("planning"),eS("applying"),eS("verifying"),eS("configuring_listener"),eS("cleaning_previous"),eS("waiting_devices"),eS("ready"),eS("awaiting_apply"),eS("verified"),eS("blocked"),eS("retry_wait")]),tv=ey({enabled:e_(),mode:e6,vlan:eh(ep()),priority:ep(),address:ed(),acs_url:ed(),port:ep(),path:ed(),dhcp_enabled:e_()}),ty=ey({operation:ed(),key:ed(),value:eh(ed())}),tw=ey({state:th,error:ex([ed(),eb()]),inflight:e_(),ready:e_(),desired_version:ex([ed(),eb()]),applied_version:ex([ed(),eb()]),next_retry_at:ep(),attempts:ep(),desired:ex([tv,eb()]),applied:ex([tv,eb()]),previous:ex([tv,eb()]),plan:eh(ty)}),tx=ey({desired:ex([eR,eb()]),state:ed()}),tk=ey({id:ed(),name:ex([ed(),eb()]),template:ed()}),tz=ey({enabled:e_(),mode:e6,method:e8,revision:ed(),triggers:eh(ed()),interval_minutes:ep(),error:ex([ed(),eb()]),devices:eh(tm),management_network:tw,omci_management:tx,groups:eh(tk),pending_devices:eh(ed()),onu_pins:eO(eC(ed(),ep())),config_error:eO(ex([ed(),eb()])),config_load:eO(e3)});ex([tz,eH]);let tj=ey({enabled:ex([e_(),eb()]),routed_enabled:ex([e_(),eb()]),bridge_enabled:ex([e_(),eb()]),engine_attached:ex([e_(),eb()]),forwarding_verified:ex([e_(),eb()])}),tC=ey({entity_id:ep(),port_id:ex([ep(),eb()])}),t$=ey({entity_id:ep(),filter_list_hex:ex([ed(),eb()]),forward_operation:ex([ep(),eb()]),number_of_entries:ex([ep(),eb()])}),tS=ey({entity_id:ep(),received_frame_rules_hex:ex([eh(ed()),eb()]),error:ex([ed(),eb()])}),tP=ey({age_seconds:ep(),gem_ports:eh(tC),vlan_filters:eh(t$),vlan_operations:eh(tS)}),tO=ey({source:ed(),unit:ed(),reason:ex([ed(),eb()]),raw:ex([ed(),eb()]),age_seconds:ex([ep(),eb()])}),tM=ey({interface:ed(),gem_ports:ex([eh(ep()),eb()]),vlan_id:ex([ep(),eb()]),onu_inventory:ex([tP,eb()]),tx_bytes:ex([ep(),eb()]),rx_bytes:ex([ep(),eb()]),current_tx_kbps:ex([ep(),eb()]),current_rx_kbps:ex([ep(),eb()]),olt_channel_gem:eO(ep()),forwarding_verified:eO(e_()),offload:tj,measurements:eC(ed(),tO)});ey({});let tE=ey({entity_id:ep(),interval_end_time:ep(),corrected_bytes:ep(),corrected_code_words:ep(),uncorrectable_code_words:ep(),total_code_words:ep(),fec_seconds:ep()}),tN=ey({ani_entity_id:ex([ep(),eb()]),control_supported:e_(),downstream_enabled:ex([e_(),eb()]),upstream_enabled:ex([e_(),eb()]),downstream_pm:ex([tE,eb()]),measurement:tO}),tR=ey({entry:ex([eS(0),eS(1),eS(2)]),username:ed(),active:e_()}),tL=ey({mqtt_mac:ed(),optical_sn:ex([ed(),eb()]),onu_id:ex([ep(),eb()]),binding_generation:ed(),last_seen:ep(),reason:ed()}),tI=ex([eS("executed"),eS("dispatched"),eS("timeout"),eS("error")]),tT=ey({target:ed(),status:tI,request_id:eO(ed()),exit_code:eO(ep()),output:eO(ed()),output_truncated:e_(),error:eO(ed())}),tA=ey({target:tL,result:tT,binding_current:e_()}),tD=ex([eS("not_applicable"),eS("accepted_and_saved"),eS("unconfirmed")]),tU=ey({code:ed(),message:ed()});ex([ey({schema_version:eS(1),operation:tA,accounts:ex([eh(tR),eb()]),write_status:tD}),ey({schema_version:ep(),error:tU})]);let tq=ey({optical_sn:ed(),onu_id:ep(),binding_generation:ed()}),tB=ey({mqtt_mac:ed(),binding_generation:ed()}),tF=ex([tq,tB]);ey({target:tF});let tZ=ex([ey({kind:eS("exec"),script:ed(),timeout_seconds:ep()}),ey({kind:eS("accounts_read")}),ey({kind:eS("account_set_password"),entry:ep(),password:ed()}),ey({kind:eS("account_set_active"),entry:ep(),active:e_()})]),tV=ey({schema_version:ep(),target:tq,action:tZ}),tW=ey({optical_sn:ed(),onu_id:ep(),model:ed(),optical_online:e_(),can_execute:e_(),mqtt:ex([tL,eb()]),report_revision:ex([ep(),eb()])});ex([ey({schema_version:eS(1),operation:tA}),ey({schema_version:ep(),error:tU})]),ey({target:tF,script:ed(),timeout_seconds:ep()});let tJ=ex([ey({schema_version:eS(1),devices:eh(tW),sources:eh(tL)}),ey({schema_version:ep(),error:tU})]);ex([ey({method:eS("list")}),ey({method:eS("report"),target:tq}),ey({method:eS("source_report"),target:tB}),ey({method:eS("run"),request:tV})]);let tG=ex([eS("received"),eS("report_unavailable")]),tK=ey({value:new eg({type:"unknown"}),member:ed(),unit:ex([ed(),eb()])}),tH=ey({name:ed(),bytes:ep(),encoding:ed(),text:ex([ed(),eb()]),text_omitted:e_()}),tX=ey({schema_version:ep(),compressed_bytes:ep(),decompressed_bytes:ep(),fields:eC(ed(),tK),members:eh(tH),errors:eh(ed())}),tQ=ey({revision:ep(),last_received:ep(),last_processed_receipt:ex([ep(),eb()]),last_good:ex([ep(),eb()]),error:ex([ed(),eb()]),report:ex([tX,eb()])});ex([ey({schema_version:eS(1),target:tL,report:ex([tQ,eb()]),state:tG}),ey({schema_version:eS(1),target:tL,report:ex([tQ,eb()]),read_only:eS(!0)}),ey({schema_version:ep(),error:tU})]),ey({target:tF}),ey({target:tF,kind:eM,entry:ep(),password:ed(),active:e_()});let tY=ey({accepted:ep(),rejected:ep(),read_errors:ep(),handled:ep(),max_intake_us:ep(),max_handler_us:ep()}),t0=eS("pending"),t1=ey({phase:ex([eS("starting"),eS("upload"),eS("tables")]),received:ep(),expected:ex([ep(),eb()])}),t2=eS("ready"),t5=ex([ey({status:t0,progress:eO(t1)}),ey({status:t2,chunk:ep(),chunks:ep(),bytes:ep(),data:ed()})]);ex([t5,eH]);let t4=ey({status:t0,job:ed()}),t3=ey({released:e_()});ey({job:ed()}),ey({job:ed(),chunk:ep()}),ex([t4,eH]);let t6=ey({accepting:e_(),running:ep(),stored:ep(),bytes:ep(),running_limit:ep(),stored_limit:ep(),bytes_limit:ep(),result_bytes_limit:ep()}),t8=ey({mac:ed(),ip:ed(),band:ed(),rssi_dbm:ex([ep(),eb()]),rx_rate_mbps:ex([ep(),eb()]),tx_rate_mbps:ex([ep(),eb()])}),t7=ex([eS("unknown"),eS("octets"),eS("string"),eS("unsigned_integer"),eS("table"),eS("signed_integer"),eS("pointer"),eS("bit_field"),eS("enumeration"),eS("counter")]),t9=ey({id:ed(),url:ed()}),re=ey({name:ed(),kind:t7,index:ep(),mask:ep(),size:ep(),read:e_(),write:e_(),set_by_create:e_(),avc:e_(),optional:e_(),deprecated:e_(),default_hex:ex([ed(),eb()]),reference:t9}),rt=ex([ey({type:eS("unsigned"),value:ep()}),ey({type:eS("signed"),value:ep()}),ey({type:eS("decimal"),value:ed()}),ey({type:eS("text"),value:ex([ed(),eb()])}),ey({type:eS("octets"),hex:ed()}),ey({type:eS("table_length"),bytes:ep()})]),rr=ey({raw_hex:ed(),value:rt,sequences:eh(ep())}),rn=ey({definition:re,value:ex([rt,eb()]),observations:eh(rr)}),ri=ex([eS("layout"),eS("name_only"),eS("unknown")]),ra=ey({class_id:ep(),name:ex([ed(),eb()]),entities:ep(),records:ep(),support:ri}),ro=ey({code:ed(),message:ed(),offset:ep(),mask:ep()}),rs=ey({class_id:ep(),entity_id:ep(),name:ex([ed(),eb()]),support:ri,reference:ex([t9,eb()]),sequences:eh(ep()),attributes:eh(rn),diagnostics:eh(ro)}),rl=eS("ready"),rd=ey({class_id:ep(),entity_id:ep(),sequence:ep(),attribute_mask:ep(),raw_hex:ed(),consumed:ep(),remaining_hex:ed(),undecoded_mask:ep()}),rc=ey({raw_hex:ed(),filter_outer_priority:ep(),filter_outer_vid:ep(),filter_outer_tpid_dei:ep(),filter_inner_priority:ep(),filter_inner_vid:ep(),filter_inner_tpid_dei:ep(),filter_ethertype:ep(),tags_to_remove:ep(),treatment_outer_priority:ep(),treatment_outer_vid:ep(),treatment_outer_tpid_dei:ep(),treatment_inner_priority:ep(),treatment_inner_vid:ep(),treatment_inner_tpid_dei:ep(),delete_entry:e_()}),rp=ey({class_id:ep(),entity_id:ep(),attribute:re,collected:e_(),error:ex([ed(),eb()]),raw_hex:ed(),rows:eh(ed()),vlan_rules:eh(rc)}),ru=ey({schema_version:eS(1),reference_version:ed(),onu_id:ex([ep(),eb()]),uploaded_complete:e_(),expected_records:ep(),received_records:ep(),decoded_records:ep(),partial_records:ep(),basic_records:ep(),tables_requested:e_(),tables_collected:e_(),classes:eh(ra),entities:eh(rs),records:eh(rd),tables:eh(rp),diagnostics:eh(ro)}),r_=ey({status:rl,report:ru});ey({onu_id:ep(),optical_sn:ed(),tables:e_()});let rf=ex([ey({status:eS("success"),enabled:e_()}),ey({status:eS("error"),error:ed()})]);ey({enabled:e_(),bridge:ed(),wan_upstream:e_(),wan_downstream:e_(),onu_bridge:e_()});let rb=ey({index:ed(),state:ed(),pkt_type:ed(),orig_tuple:ed(),new_tuple:ed(),eth:ed(),vlan:ed(),packets:ep(),bytes:ep(),counters_valid:e_(),packets_exact:ed(),bytes_exact:ed()}),rg=ey({sampled_at_ms:ep(),errors:eh(ed()),config_valid:e_(),engine_valid:e_(),mask_valid:e_(),routed_mask_valid:e_(),debug_valid:e_(),flows_valid:e_(),entries_valid:e_(),counters_valid:e_(),hooks_valid:e_(),total_packets_exact:ed(),total_bytes_exact:ed(),supported:e_(),engine_attached:e_(),bridge_offload_enabled:e_(),wan_upstream:e_(),wan_downstream:e_(),onu_bridge:e_(),bridge_offload_mask:ep(),routed_offload_mask:ep(),bridge_offload_debug:e_(),bridge:ed(),active_ports:eh(ed()),fw4_hooks_ready:e_(),total_entries:ep(),bound_entries:ep(),bound_ipv4_entries:ep(),bound_ipv6_entries:ep(),total_packets:ep(),total_bytes:ep(),bound_flows:eh(rb)}),rm=ey({equipment_id:ex([ed(),eb()]),hardware_version:ex([ed(),eb()]),software_images:eh(ed()),omcc_version:ex([ep(),eb()]),errors:eh(ed())}),rh=ey({desired:eC(ed(),ep()),active:eC(ed(),ep()),pending_restart:e_(),allocation_blocked:e_(),startup_error:ex([ed(),eb()]),config_error:ex([ed(),eb()])}),rv=ex([eS("optical_on"),eS("optical_off"),eS("optical_status"),eS("optical_reload"),eS("optical_reinitialize"),eS("optical_shutdown")]),ry=ey({enabled:e_(),downstream_tx_enabled:e_(),fec_enabled:e_()}),rw=ey({desired_tx_enabled:e_(),desired_fec_enabled:e_(),register:ex([ep(),eb()]),tx_enabled:ex([e_(),eb()]),fec_enabled:ex([e_(),eb()]),error:ex([ed(),eb()])}),rx=ex([eS("success"),eS("error")]),rk=ex([eS("enabled"),eS("disabled"),eS("unknown")]),rz=ey({settings:eO(ry),pon_mac:eO(rw),schema_version:eS(1),status:rx,action:rv,desired_enabled:ex([e_(),eb()]),tx_enabled:ex([e_(),eb()]),actor_state:rk,hardware_ready:e_(),discovery_active:e_(),cleanup_pending:e_(),error:ex([tU,eb()])}),rj=ey({calibration_sha256:eO(ed()),calibration_applied:e_(),model:ed(),wavelength_tx_nm:ep(),wavelength_rx_nm:ep(),phy_rate_downlink_gbps:ep(),phy_rate_uplink_gbps:ep(),tx_power_dbm:ex([ep(),eb()]),laser_bias_current_ma:ex([ep(),eb()]),temperature_celsius:ex([ep(),eb()]),vcc_voltage:ex([ep(),eb()]),cdr_locked:ex([e_(),eb()]),tx_enabled:eO(e_()),measurements:eC(ed(),tO)}),rC=eS("ux3326"),r$=eS("selected"),rS=ey({onu_id:ep(),interface:ex([ed(),eb()])}),rP=ey({optical_control:e_(),transceiver_telemetry:e_(),fpga_diagnostics:e_(),bosa_diagnostics:e_(),calibration_profile:ex([rC,eb()]),npu_offload:e_(),omci_mib:e_(),downstream_fec:e_()}),rO=ey({schema_version:eS(1),selection:r$,platform_id:ed(),vendor:ed(),model:ed(),onus:eh(rS),operations:rP}),rM=ex([eS("o1_initial"),eS("o2_standby"),eS("o3_serial_number"),eS("o4_ranging"),eS("o5_operation"),eS("o6_intermittent_lods"),eS("o7_emergency_stop")]),rE=ey({restarting:eS(!0)}),rN=ey({calls:ep(),failures:ep(),last_us:ep(),max_us:ep(),total_us:ep()}),rR=ey({port:ep(),interface:ed(),carrier:e_(),status:ed(),onu_id:eO(ep()),onu_sn:eO(ed()),link_state:ed(),reserved_sn:eO(ed())}),rL=ey({channel_2g:ex([ep(),eb()]),channel_5g:ex([ep(),eb()]),bandwidth_5g:ex([ed(),eb()]),tx_power_pct:ex([ep(),eb()]),measurements:eC(ed(),tO)}),rI=ey({onu_id:ep(),vendor:ed(),model:ed(),serial_number:ed(),state:rM,business_status:eq,management:ex([te,eb()]),provisioning:ex([tb,eb()]),services:eh(ti),ssids:eh(ti),wifi_sync:tg,identity:ex([rm,eb()]),identity_age_seconds:ex([ep(),eb()]),identity_current:e_(),fiber_distance_m:ex([ep(),eb()]),ranging_delay_rtd_ns:ex([ep(),eb()]),equalization_delay_bits:ex([ep(),eb()]),optical_rx_power_dbm:ex([ep(),eb()]),optical_tx_power_dbm:ex([ep(),eb()]),firmware_version:ed(),hardware_version:ed(),uptime_seconds:ex([ep(),eb()]),fec:eO(tN),data_path:tM,wifi_mesh:rL,connected_clients:ex([eh(t8),eb()]),measurements:eC(ed(),tO)}),rT=ey({id:ed(),last_seen_sec_ago:ep(),last_payload_bytes:ep()}),rA=ey({ubus:eO(eC(ed(),rN)),jobs:eO(t6),onu_pinning:eO(rh),fpga_status:ed(),pon_mac:eO(rw),provisioning:ex([tz,eb()]),optical_transceiver:rj,switch_ports:eh(rR),sub_gateways:eh(rI),telemetry_gateways:eh(rT),npu:eO(rg),ipc:eO(tY)}),rD=ex([eS("plan"),eS("apply"),eS("management_plan"),eS("management_apply"),eS("reset_state"),eS("reconcile"),eS("retry")]),rU=ex([ey({operation_ids:eh(ep()),revision:ed()}),ey({started:eS(!0),mode:ta}),ey({reset:eS(!0),device:ed()}),ey({operation_ids:eh(ep()),mode:ta,reconcile:eO(e_()),retry:eO(e_())}),eH]);ey({action:rD,target:ed(),management:eO(e_()),item:eO(ed())});let rq=ex([eS("none"),eS("effective"),eS("pending_add"),eS("pending_change"),eS("pending_remove")]),rB=ey({active_onu_id:ex([ep(),eb()]),desired_onu_id:ex([ep(),eb()]),state:rq,pending_restart:e_()}),rF=ex([eS("pon_logical"),eS("associated_with"),eS("learned_behind")]),rZ=ey({id:ed(),mac:ed(),hostname:ex([ed(),eb()]),addresses:eh(ed()),relation:rF,source:ed(),interface:ex([ed(),eb()])}),rV=ex([eS("ok"),eS("partial"),eS("unavailable")]),rW=ey({id:ed(),state:rV,sampled_at:ep(),reason:ex([ed(),eb()])}),rJ=ex([eS("snapshot_expired"),eS("node_not_found"),eS("invalid_cursor")]),rG=ex([ey({status:eS("ok"),snapshot_id:ed(),parent_node_id:ed(),clients:eh(rZ),associated_client_count:ex([ep(),eb()]),learned_host_count:ex([ep(),eb()]),complete:e_(),next_cursor:ex([ed(),eb()]),sources:eh(rW)}),ey({status:eS("error"),code:rJ})]);ey({node_id:ed(),snapshot_id:eO(ed()),cursor:eO(ed()),limit:eO(ep())});let rK=ey({model:ed(),wavelength_tx_nm:ep(),wavelength_rx_nm:ep(),nominal_downlink_gbps:ep(),nominal_uplink_gbps:ep(),tx_power_dbm:ex([ep(),eb()]),laser_bias_current_ma:ex([ep(),eb()]),temperature_celsius:ex([ep(),eb()]),vcc_voltage:ex([ep(),eb()]),tx_enabled:ex([e_(),eb()]),measurements:eC(ed(),tO)}),rH=ey({name:ed(),mac:ex([ed(),eb()]),carrier:ex([e_(),eb()]),speed_mbps:ex([ep(),eb()]),duplex:ex([ed(),eb()]),bridge_members:eh(ed()),addresses:eh(ed())}),rX=ey({interface:ed(),device:ex([ed(),eb()]),protocol:ex([ed(),eb()]),up:e_(),addresses:eh(ed())}),rQ=ey({model:ex([ed(),eb()]),firmware_version:ex([ed(),eb()]),uptime_seconds:ex([ep(),eb()]),fpga_status:ed(),optical:rK,interfaces:eh(rH),uplinks:eh(rX)}),rY=ey({observer_node_id:ed(),rx_bytes:ex([ep(),eb()]),tx_bytes:ex([ep(),eb()]),current_rx_kbps:ex([ep(),eb()]),current_tx_kbps:ex([ep(),eb()]),onu_inventory:ex([tP,eb()]),offload:tj,measurements:eC(ed(),tO)}),r0=ey({report_revision:ep(),binding_generation:ed(),age_seconds:ep(),ip:ex([ed(),eb()]),bridge_ip:ex([ed(),eb()]),mac:ex([ed(),eb()]),connection_type_raw:ex([ed(),eb()]),uptime_seconds:ex([ep(),eb()]),cpu_usage_raw:ex([ep(),eb()]),memory_usage_raw:ex([ep(),eb()])}),r1=ey({hl202:ex([r0,eb()])}),r2=ey({code:ed(),node_id:ex([ed(),eb()])}),r5=ey({id:ed(),source:ed(),target:ed(),relation:rF,data_interface:ex([ed(),eb()]),carrier:ex([e_(),eb()]),onu_rx_power_dbm:ex([ep(),eb()]),onu_tx_power_dbm:ex([ep(),eb()]),equalization_delay_bits:ex([ep(),eb()]),data_path:ex([rY,eb()]),measurements:eC(ed(),tO)}),r4=ey({serial_number:ex([ed(),eb()]),onu_id:ex([ep(),eb()]),vendor:ex([ed(),eb()]),model:ex([ed(),eb()]),hardware_version:ex([ed(),eb()]),firmware_version:ex([ed(),eb()]),registration:ex([rM,eb()]),business:ex([eq,eb()]),management:ex([te,eb()]),provisioning:ex([tb,eb()]),services:eh(ti),ssids:eh(ti),wifi_sync:ex([tg,eb()]),identity:ex([rm,eb()]),identity_current:e_(),identity_age_seconds:ex([ep(),eb()]),uptime_seconds:ex([ep(),eb()]),fec:ex([tN,eb()]),binding:rB,extensions:r1,measurements:eC(ed(),tO)}),r3=ex([ez(ey({kind:eS("controller")}),rQ),ez(ey({kind:eS("onu")}),r4)]),r6=ey({id:ed(),label:ed(),detail:r3}),r8=ex([ey({status:eS("ok"),snapshot_id:ed(),node:r6}),ey({status:eS("error"),code:rJ})]);ey({node_id:ed(),snapshot_id:eO(ed())});let r7=ey({schema_version:eS(1),snapshot_id:ed(),generated_at:ep(),snapshot_ttl_seconds:ep(),nodes:eh(r6),links:eh(r5),sources:eh(rW),issues:eh(r2)}),r9=eC(ed(),ey({carrier:eO(e_()),mac:eO(ed()),link:eO(ey({speed:eO(ep()),duplex:eO(ed()),autoneg:eO(e_())})),stats:eO(eC(ed(),ep()))})),ne=e=>null==e||""===e?"—":String(e);function nt(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3;return null!=e&&Number.isFinite(e)?`${e.toFixed(t)} dBm`:"—"}function nr(e){if(void 0===e||!Number.isFinite(e)||e<0)return"—";if(e<1024)return`${e} B`;let t=["KiB","MiB","GiB","TiB"],r=e/1024,n=0;for(;r>=1024&&n<t.length-1;)r/=1024,n++;return`${r.toFixed(1)} ${t[n]}`}function nn(e){return void 0===e||!Number.isFinite(e)||e<0?"—":e<1e3?`${e} Pkts.`:`${(e/1e3).toFixed(2)} KPkts.`}function ni(e){let t="none"===e.tone?"":`fttr-badge fttr-badge-${e.tone}`,r=e.class?` ${e.class}`:"",n=c("span",{class:`${t}${r}`.trim(),children:e.children});return e.title&&n.setAttribute("title",e.title),n}function na(e,t,r,n){e.textContent=r,"none"===t?e.className="":e.className=`fttr-badge fttr-badge-${t}`,n?e.setAttribute("title",n):e.removeAttribute("title")}let no={o1_initial:_("O1 Initial"),o2_standby:_("O2 Standby"),o3_serial_number:_("O3 Serial Number"),o4_ranging:_("O4 Ranging"),o5_operation:_("O5 (Operation)"),o6_intermittent_lods:_("O6 Intermittent LODS"),o7_emergency_stop:_("O7 Emergency Stop")};function ns(e){return e?"o5_operation"===e?{tone:"success",label:no.o5_operation,title:e}:{tone:"warning",label:no[e]??ne(e),title:e}:{tone:"none",label:"—"}}function nl(e){let t=ns(e.state);return c(ni,{tone:t.tone,title:t.title,children:t.label})}function nd(e){return e?{tone:"verified"===e.phase?"success":e.error||"wan_bootstrap_pending"===e.phase?"warning":"neutral",label:`${({not_started:_("Not started"),collecting_identity:_("Collecting identity"),retrying_identity:_("Retrying identity"),unsupported:_("Unsupported"),configuring:_("Configuring"),verifying:_("Verifying"),wan_bootstrap_pending:_("WAN pending"),verified:_("Verified"),retrying:_("Retrying"),offline:_("Offline")})[e.phase]} \xb7 ${e.generation}${e.error?` \xb7 ${e.error}`:""}`,title:e.error||void 0}:{tone:"neutral",label:"—"}}function nc(e){let t=nd(e.status);return c(ni,{tone:t.tone,title:t.title,children:t.label})}let np={online:_("Online"),waiting_inform:_("Waiting Inform"),offline_or_stale:_("Offline or stale")};function nu(e){let t=e?.state,r=function(e){if(null==e||!Number.isFinite(e)||e<0)return null;let t=Math.floor(e);if(t<60)return(1===t?_("%d second ago"):_("%d seconds ago")).format(t);let r=Math.floor(t/60);if(r<60)return(1===r?_("%d minute ago"):_("%d minutes ago")).format(r);let n=Math.floor(t/3600);if(n<24)return(1===n?_("%d hour ago"):_("%d hours ago")).format(n);let i=Math.floor(t/86400);return(1===i?_("%d day ago"):_("%d days ago")).format(i)}(e?.age_seconds??(e?.last_inform?Math.max(0,Math.floor(Date.now()/1e3)-e.last_inform):null)),n=e?.last_inform?new Date(1e3*e.last_inform).toLocaleString():null,i=n?_("Last Inform: %s").format(n):void 0,a="—",o="none";return"online"===t?(o="success",a=np.online):"waiting_inform"===t?(o="warning",a=np.waiting_inform):"offline_or_stale"===t?(o="danger",a=np.offline_or_stale):t&&(o="neutral",a=ne(t)),{tone:o,label:r&&t?`${a} \xb7 ${r}`:a,title:i}}function n_(e){let t=nu(e.management);return c(ni,{tone:t.tone,title:t.title,children:t.label})}let nf={disabled:_("Disabled"),waiting:_("Waiting"),wan_reconciling:_("WAN reconciling"),wan_verifying:_("WAN verifying"),wifi_reconciling:_("Wi-Fi reconciling"),discovering:_("Discovering"),reading:_("Reading"),disabling:_("Disabling"),disabling_read:_("Disabling read"),writing:_("Writing"),verifying:_("Verifying"),settling:_("Settling"),completed:_("Completed"),interrupted:_("Interrupted"),recovering:_("Recovering"),waiting_management:_("Waiting management"),waiting_task:_("Waiting task"),reset_pending:_("Reset pending"),failed:_("Failed"),error:_("Error"),blocked:_("Blocked"),not_started:_("Not started")};function nb(e,t){let r=e?.state,n=e?.next_retry_at&&e.next_retry_at>Math.floor(Date.now()/1e3)?e.next_retry_at-Math.floor(Date.now()/1e3):0,i=t??(e?.current_revision===!1?_("Previous configuration"):e?.management_fresh===!1?_("Management stale"):e?.reconcile_reason?e.reconcile_reason:n>0?_("Next self-healing retry in %d seconds").format(n):e?.reason??e?.error);return r&&"not_started"!==r?"disabled"===r?{tone:"neutral",label:nf.disabled}:"completed"===r||"verified"===r?{tone:"success",label:"completed"===r?nf.completed:_("Ready"),title:i}:"wan_reconciling"===r||"wan_verifying"===r||"wifi_reconciling"===r||"discovering"===r||"reading"===r||"disabling"===r||"disabling_read"===r||"writing"===r||"verifying"===r||"settling"===r||"recovering"===r||"waiting_task"===r?{tone:"info",label:nf[r]??ne(r),title:i}:"interrupted"===r||"failed"===r||"error"===r||"blocked"===r?{tone:"danger",label:"blocked"===r?nf.blocked:nf.interrupted,title:i}:"waiting"===r||"pending"===r||"waiting_management"===r||"reset_pending"===r?{tone:"warning",label:nf[r]??nf.waiting,title:i}:{tone:"neutral",label:ne(r),title:i}:{tone:"neutral",label:nf.not_started,title:i}}function ng(e){let t=nb(e.provisioning,e.title);return c(ni,{tone:t.tone,title:t.title,children:t.label})}let nm={disabled:_("Disabled"),not_configured:_("Not configured"),stale_revision:_("Stale revision"),stale_management:_("Stale management"),verified:_("Verified"),attention_required:_("Attention required"),accepted_unverified:_("Unverified"),pending:_("Pending"),recovering:_("Recovering"),waiting_management:_("Waiting management")};function nh(e){return e&&"not_configured"!==e?"disabled"===e?{tone:"neutral",label:nm.disabled}:"verified"===e?{tone:"success",label:nm.verified}:"attention_required"===e?{tone:"danger",label:nm.attention_required}:"stale_revision"===e||"stale_management"===e||"waiting_management"===e?{tone:"warning",label:nm[e]}:"recovering"===e?{tone:"info",label:nm.recovering}:"accepted_unverified"===e||"pending"===e?{tone:"warning",label:nm[e]}:{tone:"neutral",label:ne(e)}:{tone:"neutral",label:nm.not_configured}}function nv(e){let t=nh(e.state);return c(ni,{tone:t.tone,title:t.title,children:t.label})}let ny=`
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
`,nw=ey({error:ex([ed(),ey({code:ed(),message:ed()})])});class nx extends Error{code;constructor(e,t){super(t),this.code=e,this.name="RpcError"}}function nk(e){let t=nw.safeParse(e);if(t.success){let e=t.data.error;throw"string"==typeof e?new nx("rpc",e):new nx(e.code,e.message)}return e}let nz={parse(e){let t=rU.parse(nk(e));if("error"in t)throw Error(t.error);return t}},nj={parse(e){let t=tJ.parse(nk(e));if("object"==typeof t&&null!==t&&"error"in t)throw nk(t),Error("Unexpected RPC error");return t}},nC={getCapabilities:{parse:e=>e1.parse(nk(e))},getPlatformInfo:{parse:e=>rO.parse(nk(e))},opticalStatus:rz,opticalSet:rz,getStatus:{parse:e=>rA.parse(nk(e))},getTopology:{parse:e=>r7.parse(nk(e))},getTopologyNode:{parse:e=>r8.parse(nk(e))},getTopologyClients:{parse:e=>rG.parse(nk(e))},getSync:{parse:e=>tz.parse(nk(e))},configCheck:{parse(e){if("object"==typeof e&&null!==e&&"error"in e&&("valid"in e||"revision"in e||"devices"in e))throw Error("Mixed configuration check result");return e2.parse(e)}},npuStatus:rg,configReload:{parse:e=>tz.parse(nk(e))},restartService:{parse:e=>rE.parse(nk(e))},sync:{parse:e=>nz.parse(nk(e))},npuSet:rf,mibStart:{parse:e=>t4.parse(nk(e))},mibResult:{parse:e=>t5.parse(nk(e))},jobRelease:{parse:e=>t3.parse(nk(e))},hl202List:{parse:e=>nj.parse(nk(e))},hl202Report:{parse:e=>t4.parse(nk(e))},hl202AccountsStart:{parse:e=>t4.parse(nk(e))},hl202AccountUpdate:{parse:e=>t4.parse(nk(e))},hl202ExecStart:{parse:e=>t4.parse(nk(e))},jobResult:{parse:e=>t5.parse(nk(e))},getCalibration:{parse:e=>eK.parse(nk(e))},selectCalibration:{parse:e=>eK.parse(nk(e))},saveCalibration:{parse:e=>eX.parse(nk(e))},applyCalibration:{parse:e=>t4.parse(nk(e))}};function n$(){var e;let t,r,i,a,o,s,l,d,c,p,u,f,b,g,m,h,v,y,w,x,k,z,j,C,$,S,P,O;return n??=(e=L.rpc,t=e.declare({object:"fttr",method:"get_capabilities",reject:!0}),r=e.declare({object:"fttr",method:"get_platform_info",reject:!0}),i=e.declare({object:"fttr",method:"optical_status",reject:!0}),a=e.declare({object:"fttr",method:"optical_set",params:["enabled","downstream_tx_enabled","fec_enabled"],reject:!0}),o=e.declare({object:"fttr",method:"get_status",reject:!0}),s=e.declare({object:"fttr",method:"get_topology",reject:!0}),l=e.declare({object:"fttr",method:"get_topology_node",params:["node_id","snapshot_id"],reject:!0}),d=e.declare({object:"fttr",method:"get_topology_clients",params:["node_id","snapshot_id","cursor","limit"],reject:!0}),c=e.declare({object:"fttr",method:"get_sync",reject:!0}),p=e.declare({object:"fttr",method:"config_check",reject:!0}),u=e.declare({object:"fttr",method:"npu_status",reject:!0}),f=e.declare({object:"fttr",method:"config_reload",reject:!0}),b=e.declare({object:"fttr",method:"restart_service",reject:!0}),g=e.declare({object:"fttr",method:"sync",params:["action","target","management","item"],reject:!0}),m=e.declare({object:"fttr",method:"npu_set",params:["enabled","bridge","wan_upstream","wan_downstream","onu_bridge"],reject:!0}),h=e.declare({object:"fttr",method:"mib_start",params:["onu_id","optical_sn","tables"],reject:!0}),v=e.declare({object:"fttr",method:"mib_result",params:["job","chunk"],reject:!0}),y=e.declare({object:"fttr",method:"job_release",params:["job"],reject:!0}),w=e.declare({object:"fttr",method:"hl202_list",reject:!0}),x=e.declare({object:"fttr",method:"hl202_report",params:["target"],reject:!0}),k=e.declare({object:"fttr",method:"hl202_accounts_start",params:["target"],reject:!0}),z=e.declare({object:"fttr",method:"hl202_account_update",params:["target","kind","entry","password","active"],reject:!0}),j=e.declare({object:"fttr",method:"hl202_exec_start",params:["target","script","timeout_seconds"],reject:!0}),C=e.declare({object:"fttr",method:"job_result",params:["job","chunk"],reject:!0}),$=e.declare({object:"fttr",method:"get_calibration",reject:!0}),S=e.declare({object:"fttr",method:"select_calibration",params:["source"],reject:!0}),P=e.declare({object:"fttr",method:"save_calibration",params:["data"],reject:!0}),O=e.declare({object:"fttr",method:"apply_calibration",reject:!0}),{getCapabilities:async()=>nC.getCapabilities.parse(await t()),getPlatformInfo:async()=>nC.getPlatformInfo.parse(await r()),opticalStatus:async()=>nC.opticalStatus.parse(await i()),opticalSet:async e=>nC.opticalSet.parse(await a(e.enabled,e.downstream_tx_enabled,e.fec_enabled)),getStatus:async()=>nC.getStatus.parse(await o()),getTopology:async()=>nC.getTopology.parse(await s()),getTopologyNode:async e=>nC.getTopologyNode.parse(await l(e.node_id,e.snapshot_id)),getTopologyClients:async e=>nC.getTopologyClients.parse(await d(e.node_id,e.snapshot_id,e.cursor,e.limit)),getSync:async()=>nC.getSync.parse(await c()),configCheck:async()=>nC.configCheck.parse(await p()),npuStatus:async()=>nC.npuStatus.parse(await u()),configReload:async()=>nC.configReload.parse(await f()),restartService:async()=>nC.restartService.parse(await b()),sync:async e=>nC.sync.parse(await g(e.action,e.target,e.management,e.item)),npuSet:async e=>nC.npuSet.parse(await m(e.enabled,e.bridge,e.wan_upstream,e.wan_downstream,e.onu_bridge)),mibStart:async e=>nC.mibStart.parse(await h(e.onu_id,e.optical_sn,e.tables)),mibResult:async e=>nC.mibResult.parse(await v(e.job,e.chunk)),jobRelease:async e=>nC.jobRelease.parse(await y(e.job)),hl202List:async()=>nC.hl202List.parse(await w()),hl202Report:async e=>nC.hl202Report.parse(await x(e.target)),hl202AccountsStart:async e=>nC.hl202AccountsStart.parse(await k(e.target)),hl202AccountUpdate:async e=>nC.hl202AccountUpdate.parse(await z(e.target,e.kind,e.entry,e.password,e.active)),hl202ExecStart:async e=>nC.hl202ExecStart.parse(await j(e.target,e.script,e.timeout_seconds)),jobResult:async e=>nC.jobResult.parse(await C(e.job,e.chunk)),getCalibration:async()=>nC.getCalibration.parse(await $()),selectCalibration:async e=>nC.selectCalibration.parse(await S(e.source)),saveCalibration:async e=>nC.saveCalibration.parse(await P(e.data)),applyCalibration:async()=>nC.applyCalibration.parse(await O())})}let nS=async()=>n$().getStatus(),nP=async()=>n$().getPlatformInfo(),nO=async()=>n$().configReload(),nM=async()=>(i??=L.rpc.declare({object:"luci-rpc",method:"getNetworkDevices",expect:{"":{}},reject:!0}),r9.parse(nk(await i()))),nE=async()=>n$().opticalStatus(),nN=async e=>n$().opticalSet(e),nR=async(e,t,r)=>n$().mibStart({onu_id:e,optical_sn:t,tables:r}),nL=async(e,t)=>n$().mibResult({job:e,chunk:t}),nI=async e=>n$().jobRelease({job:e}),nT=e=>JSON.stringify(e,null,2);async function nA(e){let t=["{"],r=!0;for(let[n,i]of Object.entries(e))if(r||t.push(","),r=!1,t.push(JSON.stringify(n),":"),Array.isArray(i)){t.push("[");for(let e=0;e<i.length;e++){e&&t.push(",");let r=JSON.stringify(i[e]);if(void 0===r)throw Error(_("MIB snapshot cannot be serialized"));t.push(r),e%32==31&&await new Promise(e=>setTimeout(e,0))}t.push("]")}else{let e=JSON.stringify(i);if(void 0===e)throw Error(_("MIB snapshot cannot be serialized"));t.push(e)}return t.push("}"),new Blob(t,{type:"application/json"})}function nD(e){let t=e.reference;return t?.url.startsWith("https://github.com/opencord/omci-lib-go/blob/v2.2.4/")?c("a",{href:t.url,target:"_blank",rel:"noopener noreferrer",children:t.id}):c("span",{children:"—"})}function nU(e,t){return e.onus.find(e=>e.onu_id===t)}let nq=L.rpc.declare({object:"uci",method:"get",params:["config","type"],reject:!0}),nB=L.rpc.declare({object:"uci",method:"changes",params:["config"],reject:!0}),nF=L.rpc.declare({object:"uci",method:"set",params:["config","section","values"],reject:!0}),nZ=L.rpc.declare({object:"uci",method:"delete",params:["config","section","option"],reject:!0}),nV=L.rpc.declare({object:"uci",method:"commit",params:["config"],reject:!0}),nW=!1;async function nJ(e,t,r,n){if(!L.hasViewPermission()||!t||nW)return;let i=e.serial_number.toUpperCase(),a=t.desired[i],o=void 0!==a,s=o?a:e.onu_id;if(null==s||!o&&!nU(r,s))return void L.ui.addNotification(null,c("p",{children:_("The selected platform does not expose this ONU-ID as an available interface.")}),"warning");let l=o?_("Unpin interface"):_("Pin interface");try{var d,p,u,f,b,g,m,h,v,y,w,x,k,z,j,C;let e,{values:t}=await nq("fttr","device"),$=e=>Object.entries(e).find(e=>{let[,t]=e;return"device"===t[".type"]&&t.optical_sn?.toUpperCase()===i}),S=$(t);if(!S)return void L.ui.showModal(l,(m={children:[(d={children:_("Add this device on the configuration page before fixing its interface.")},c("p",d)),(u={children:(p={children:i},c("code",p))},c("p",u)),(g={class:"right",children:[(f={type:"button",class:"cbi-button",onclick:()=>L.ui.hideModal(),children:_("Cancel")},c("button",f))," ",(b={class:"cbi-button cbi-button-action",href:L.url("admin","network","fttr","config"),children:_("Configuration")},c("a",b))]},c("div",g))]},c("div",m)));let P=(h={class:"error",role:"alert"},c("p",h)),O=(v={type:"button",class:"cbi-button",onclick:()=>L.ui.hideModal(),children:_("Cancel")},c("button",v)),M=(y={type:"button",class:"cbi-button cbi-button-action",onclick:async()=>{if(nW)return;nW=!0,M.disabled=O.disabled=!0,P.textContent="";let e=!1;try{var t;if((await nB("fttr")).changes.length)throw Error(_("Apply or discard pending FTTR configuration changes first."));let r=(await nq("fttr","device")).values,i=$(r);if(!i||i[0]!==S[0]||i[1].onu_id!==S[1].onu_id||(null==i[1].onu_id?void 0:Number(i[1].onu_id))!==a)throw Error(_("Interface configuration changed. Refresh the page and try again."));if(!o&&Object.entries(r).some(e=>{let[t,r]=e;return t!==i[0]&&"device"===r[".type"]&&null!=r.onu_id&&Number(r.onu_id)===s}))throw Error(_("Interface already reserved by another device."));o?await nZ("fttr",i[0],"onu_id"):await nF("fttr",i[0],{onu_id:String(s)}),await nV("fttr"),e=!0,await nO(),n(await nS()),L.ui.hideModal(),L.ui.addNotification(null,(t={children:_("Interface setting saved. Restart FTTR for it to take effect.")},c("p",t)),"info")}catch(t){P.textContent=`${e?_("Saved, but configuration reload or status refresh failed:"):_("Failed to save interface setting:")} ${String(t)}`}finally{nW=!1,M.disabled=e,O.disabled=!1}},children:_("Confirm")},c("button",y));L.ui.showModal(l,(C={children:[(w={children:o?_("Cancel the fixed interface for this device?"):_("Fix this device to its current interface?")},c("p",w)),(k={children:[(x={children:i},c("code",x)),` \xb7 ${(e=nU(r,s),e?.interface?`${e.interface} \xb7 ONU-ID ${s}`:`ONU-ID ${s}`)}`]},c("p",k)),(z={children:_("This saves the configuration only. The current allocation stays unchanged until FTTR is restarted.")},c("p",z)),P,(j={class:"right",children:[O," ",M]},c("div",j))]},c("div",C)))}catch(e){L.ui.addNotification(null,c("p",{children:String(e)}),"error")}}let nG=L.view,nK=L.Poll;function nH(e,t,r){var n,i,a;let o,s=e,l=[],u=c("button",{type:"button",class:"cbi-button cbi-button-neutral",style:"padding:0 .4em;min-height:1.5em;font-size:85%;margin-left:.5em",onclick:()=>nJ(s,o,t,r)}),f=c("span",{}),b=c("span",{}),g=c("span",{}),m=c("code",{style:"font-size:90%"}),h=c("span",{class:"fttr-badge"}),v=c("span",{class:"fttr-badge"}),y=c("span",{style:"font-size:90%"}),w=c("code",{style:"font-size:90%"}),x=c("span",{class:"fttr-badge"}),k=c("span",{class:"fttr-badge"}),z=c("span",{class:"fttr-badge"}),j=(a={"data-fttr-onu-id":String(e.onu_id),children:[c("td",{children:[f,u]}),c("td",{children:b}),c("td",{children:g}),c("td",{children:m}),c("td",{children:h}),c("td",{children:v}),c("td",{children:y}),c("td",{children:w}),c("td",{children:x}),c("td",{children:k}),c("td",{children:z}),(i={style:"text-align:right",children:(n={type:"button",class:"cbi-button cbi-button-neutral",onclick:()=>(function(e){var t,r,n,i,a,o,s,l,u,f,b,g;let m=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"basic",h=!1,v=!1,y=null,w=null,x=(t={class:"onu-basic-container",children:[{title:_("Device identification"),rows:[[_("Vendor"),e.vendor],[_("Model"),e.identity?.equipment_id??e.model],[_("Optical serial"),c("code",{style:"font-size:90%",children:e.serial_number})],[_("ONU ID"),e.onu_id],[_("Hardware version"),e.identity?.hardware_version??e.hardware_version],[_("Software images"),e.identity?.software_images?.join(", ")??e.firmware_version],[_("OMCC version"),e.identity?.omcc_version==null?null:c("code",{style:"font-size:90%",children:["0x",e.identity.omcc_version.toString(16)]})]]},{title:_("Optical & link status"),rows:[[_("Registration"),c(nl,{state:e.state})],[_("Business"),c(nc,{status:e.business_status})],[_("Receive optical power"),nt(e.optical_rx_power_dbm)],[_("Transmit optical power"),nt(e.optical_tx_power_dbm)],[_("Equalization delay (EQD)"),null==e.equalization_delay_bits?"—":c("code",{style:"font-size:90%",children:[e.equalization_delay_bits," bits"]})],[_("Data interface"),e.data_path?.interface?c("code",{style:"font-size:90%",children:e.data_path.interface}):null],[_("Uptime"),null==e.uptime_seconds?null:`${function(e){if(null==e||!Number.isFinite(e)||e<0)return"—";let t=Math.floor(e),r=Math.floor(t/86400),n=Math.floor(t%86400/3600),i=Math.floor(t%3600/60),a=[];return r>0&&a.push(`${r}d`),(n>0||r>0)&&a.push(`${n}h`),(i>0||n>0||r>0)&&a.push(`${i}m`),a.push(`${t%60}s`),a.join(" ")}(e.uptime_seconds)} (${Math.floor(e.uptime_seconds)} s)`]]},{title:_("Management & cache"),rows:[[_("CWMP"),c(n_,{management:e.management})],[_("Last Inform"),e.management?.last_inform?`${new Date(1e3*e.management.last_inform).toLocaleString()}${null!=e.management.age_seconds?` (${e.management.age_seconds} s)`:""}`:null],[_("Provisioning"),c(ng,{provisioning:e.provisioning})],[_("Wi-Fi sync"),c(nv,{state:e.wifi_sync})],[_("Identity source"),e.identity?!1===e.identity_current?_("Cached identity"):!0===e.identity_current?_("Current registration"):_("Registration freshness unavailable"):_("Not collected")],[_("Identity age"),null==e.identity_age_seconds?null:`${e.identity_age_seconds} s`],[_("Identity read errors"),e.identity?.errors?.join("; ")]]}].map(e=>{var t,r,n;return n={class:"cbi-section onu-basic-section",children:[c("h3",{class:"onu-basic-title",children:e.title}),(r={class:"table onu-basic-table",children:(t={children:e.rows.map(e=>{var t;let[r,n]=e;return t={children:[c("th",{style:"width:35%",children:r}),c("td",{children:n instanceof Node?n:ne(n)})]},c("tr",t)})},c("tbody",t))},c("table",r))]},c("div",n)})},c("div",t)),k=(r={class:"mib-status-bar",role:"status",children:c("span",{class:"mib-hint-text",children:_("Read MIB on demand. Results are a snapshot, not live polling.")})},c("div",r)),z=(n={class:"cbi-progressbar",style:"display:none;width:100%",title:"0%",children:c("div",{style:"width:0%"})},c("div",n)),j=c("div",{}),C=c("pre",{class:"onu-raw-pre"}),$=c("span",{class:"download-status",role:"status"}),S=null,P=c("button",{type:"button",class:"cbi-button cbi-button-action",disabled:!0,onclick:async()=>{if(y&&!h){P.disabled=!0,$.textContent=_("Preparing JSON download…");try{let t=await nA(y);if(h)return;S&&URL.revokeObjectURL(S),S=URL.createObjectURL(t);let r=document.createElement("a");r.href=S,r.download=`mib-${e.serial_number}.json`,r.click(),$.textContent=_("JSON download started"),window.setTimeout(()=>{URL.revokeObjectURL(r.href),S===r.href&&(S=null)},1e3)}catch(e){$.textContent=String(e)}finally{P.disabled=!y||h}}},children:_("Download JSON")}),O=(a={class:"onu-raw-panel",children:[(i={class:"onu-raw-toolbar",children:[c("span",{class:"onu-raw-hint",children:_("This is a lightweight preview. Download JSON to save the complete MIB snapshot.")}),c("div",{class:"onu-raw-actions",children:[P,$]})]},c("div",i)),C]},c("div",a)),M=c("button",{type:"button",class:"cbi-button cbi-button-apply",onclick:()=>q(!1),children:_("Read MIB")}),N=c("button",{type:"button",class:"cbi-button cbi-button-action",onclick:()=>q(!0),children:_("Read MIB and VLAN tables")}),R=(l={class:"onu-mib-panel",children:[(s={class:"mib-controls",children:[(o={class:"mib-action-group",children:[M,N,c("small",{class:"mib-action-hint",children:_("Collecting VLAN tables queries extended filter tables and takes longer.")})]},c("div",o)),k,z]},c("div",s)),j]},c("div",l)),I={basic:x,mib:R,raw:O},T=new Map;function A(e){for(let[t,r]of Object.entries(I))t===e?r.style.removeProperty("display"):r.style.setProperty("display","none","important");for(let[t,r]of T)r.className=t===e?"cbi-tab":"cbi-tab-disabled"}let D=(g={children:[(u={class:"onu-details-header",children:function(e,t,r,n){var i;let a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"margin-top:14px;margin-bottom:0";return i={class:"cbi-tabmenu",style:a,children:e.map(e=>{var i;let a=(i={class:t===e.id?"cbi-tab":"cbi-tab-disabled","data-tab":e.id,children:c("a",{href:`#tab-${e.id}`,onclick:t=>{t.preventDefault(),r(e.id)},children:e.label})},c("li",i));return n.set(e.id,a),a})},c("ul",i)}([{id:"basic",label:_("Basic information")},{id:"mib",label:"OMCI / MIB"},{id:"raw",label:_("Raw JSON")}],m,A,T,"margin:0;padding-left:0;display:flex;flex-wrap:wrap")},c("div",u)),(f={class:"onu-details-dialog",children:[c("style",{children:`
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
				${ny}
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
				`}),x,R,O]},c("div",f)),(b={class:"right onu-details-footer",children:c("button",{type:"button",class:"cbi-button",onclick:()=>{h=!0,S&&URL.revokeObjectURL(S),S=null,y=null,C.textContent="",j.replaceChildren(),L.ui.hideModal()},children:_("Close")})},c("div",b))]},c(d,g)),U=()=>!h&&D.isConnected&&D.getClientRects().length>0;async function q(t){if(!v){v=!0,M.disabled=N.disabled=!0,z.style.display="",z.title="0%",z.firstElementChild.style.width="0%",k.textContent=_("Reading MIB…");try{let v=await nS(),x=v.sub_gateways?.find(t=>t.serial_number===e.serial_number);if(x?.state!=="o5_operation")throw Error(_("Device is offline; reopen details after registration."));if(!U())return;let $=await nR(x.onu_id,x.serial_number,t);w=$.job;let S=Date.now()+14e4;for(;U();){if(p()){let e=Date.now();for(;p()&&U();)await new Promise(e=>setTimeout(e,1e3));if(S+=Date.now()-e,!U())return}let e=await nL($.job,0);if(!U())return;if("ready"===e.status){var r,n,i,a,o,s,l,d,u,f,b,g,m,h;if(!e.chunks||e.chunks>1024||!e.bytes||e.bytes>0x2000000||0!==e.chunk||!e.data)throw Error(_("Invalid MIB snapshot"));let t=new Uint8Array(e.bytes),p=0;for(let r=0;r<e.chunks;r++){let n=0===r?e:await nL($.job,r);if(!U())return;if("ready"!==n.status||n.chunk!==r||n.chunks!==e.chunks||n.bytes!==e.bytes||!n.data)throw Error(_("Invalid MIB snapshot chunk"));let i=atob(n.data);if(i.length>32768||p+i.length>t.length)throw Error(_("Invalid MIB snapshot size"));for(let e=0;e<i.length;e++)t[p++]=i.charCodeAt(e);let a=Math.min(100,Math.round((r+1)/e.chunks*100));z.title=`${a}%`,z.firstElementChild.style.width=`${a}%`,k.textContent=`${_("Downloading MIB snapshot")}: ${r+1}/${e.chunks}`}if(p!==t.length)throw Error(_("Incomplete MIB snapshot"));if(await B(),y=r_.parse(nk(JSON.parse(new TextDecoder("utf-8",{fatal:!0}).decode(t)))).report,1!==y.schema_version||y.onu_id!==x.onu_id)throw Error(_("Unexpected MIB response"));z.style.display="none",k.replaceChildren((r=y,b={class:"mib-chips",children:[(i={class:"mib-chip mib-chip-primary",children:["ONU ",r.onu_id]},c("span",i)),(a={class:`mib-chip ${r.uploaded_complete?"mib-chip-success":"mib-chip-warning"}`,children:r.uploaded_complete?_("Upload complete"):_("Upload incomplete")},c("span",a)),(o={class:"mib-chip mib-chip-info",children:[_("Records"),": ",r.received_records,r.expected_records!==r.received_records?` / ${r.expected_records}`:""]},c("span",o)),(s={class:"mib-chip",children:[_("Decoded"),": ",r.decoded_records]},c("span",s)),r.partial_records>0?(l={class:"mib-chip mib-chip-warning",children:[_("Partial"),": ",r.partial_records]},c("span",l)):null,(d={class:"mib-chip mib-chip-neutral",children:[_("Basic"),": ",r.basic_records]},c("span",d)),(u={class:"mib-chip",children:r.tables_collected?_("VLAN tables collected"):_("VLAN tables not collected")},c("span",u)),(f={class:"mib-chip mib-chip-subtle",children:new Date().toLocaleTimeString()},c("span",f))]},c("div",b))),j.replaceChildren(function(e){var t,r,n,i,a,o;let s,l=new Map;for(let t of e.records){let e=`${t.class_id}\0${t.entity_id}`,r=l.get(e);r?r.push(t):l.set(e,[t])}let d=e.classes.length?e.classes[0].class_id:null,p=(t={class:"mib-content"},c("div",t)),u=(r={type:"search",class:"cbi-input-text mib-search-input",placeholder:_("Search ME name or Class ID…")},c("input",r)),f=(n={class:"mib-class-list"},c("div",n)),b=new Map;function g(t){var r,n;for(let[e,r]of(d=t,b))e===t?r.classList.add("active"):r.classList.remove("active");let i=e.entities.filter(e=>e.class_id===t);i.length?p.replaceChildren(...i.map((r,n)=>{var i,a,o,s,d,p,u,f,b,g,m,h,v,y,w,x,k,z,j;return j={open:0===n,class:"mib-entity-details",children:[(d={class:"mib-entity-summary",children:[(o={class:"mib-entity-title",children:[(i={children:ne(r.name)},c("strong",i)),(a={class:"mib-entity-id-tag",children:[_("Entity")," ",r.entity_id," (0x",r.entity_id.toString(16),")"]},c("span",a))]},c("span",o)),(s={class:"mib-entity-support",children:r.support},c("span",s))]},c("summary",d)),(z={class:"mib-entity-body",children:[r.attributes.length?(v={class:"table mib-attributes-table",children:[(m={children:(g={children:[(p={style:"width:28%",children:_("Attribute")},c("th",p)),(u={style:"width:14%",children:_("Type")},c("th",u)),(f={children:_("Value")},c("th",f)),(b={style:"width:18%",children:_("Definition")},c("th",b))]},c("tr",g))},c("thead",m)),(h={children:r.attributes.map(e=>{var t,r,n,i,a,o,s,l,d,p;return p={children:[(t={class:"mib-attr-name",children:e.definition.name},c("td",t)),(n={class:"mib-attr-kind",children:(r={children:e.definition.kind},c("code",r))},c("td",n)),(l={class:"mib-attr-value",children:[(i={class:"mib-val-display",children:function(e){if(null===e)return _("Conflicting values; inspect observations");switch(e.type){case"unsigned":case"signed":case"decimal":case"text":return ne(e.value);case"octets":return ne(e.hex);case"table_length":return ne(e.bytes);default:throw new nx("unexpected_variant",`Unexpected variant: ${String(e)}`)}}(e.value)},c("span",i)),e.observations?.length?(s={class:"mib-obs-details",children:[(a={children:_("Raw data / observations")},c("summary",a)),(o={class:"mib-pre",children:nT(e.observations)},c("pre",o))]},c("details",s)):null]},c("td",l)),(d={class:"mib-attr-ref",children:nD(e.definition)},c("td",d))]},c("tr",p)})},c("tbody",h))]},c("table",v)):(y={children:_("Basic display only; raw records are preserved.")},c("p",y)),e.tables.filter(e=>e.class_id===t&&e.entity_id===r.entity_id).map(e=>{var t,r,n,i,a,o,s,l,d,p,u,f,b,g,m,h;return h={class:"mib-table-details",children:[(t={children:[e.attribute.name," ·"," ",e.collected?`${e.rows.length} ${_("rows")}`:ne(e.error)]},c("summary",t)),e.vlan_rules.length?(b={class:"mib-table-overflow",children:(f={class:"table",children:[(p={children:(d={children:[(r={children:_("Outer filter (priority / VID / TPID-DEI)")},c("th",r)),(n={children:_("Inner filter (priority / VID / TPID-DEI)")},c("th",n)),(i={children:_("EtherType code")},c("th",i)),(a={children:_("Remove tags")},c("th",a)),(o={children:_("Outer treatment (priority / VID / TPID-DEI)")},c("th",o)),(s={children:_("Inner treatment (priority / VID / TPID-DEI)")},c("th",s)),(l={children:_("Delete entry")},c("th",l))]},c("tr",d))},c("thead",p)),(u={children:e.vlan_rules.map(e=>{var t,r,n,i,a,o,s,l;return l={children:[(t={children:`${e.filter_outer_priority} / ${e.filter_outer_vid} / ${e.filter_outer_tpid_dei}`},c("td",t)),(r={children:`${e.filter_inner_priority} / ${e.filter_inner_vid} / ${e.filter_inner_tpid_dei}`},c("td",r)),(n={children:ne(e.filter_ethertype)},c("td",n)),(i={children:ne(e.tags_to_remove)},c("td",i)),(a={children:`${e.treatment_outer_priority} / ${e.treatment_outer_vid} / ${e.treatment_outer_tpid_dei}`},c("td",a)),(o={children:`${e.treatment_inner_priority} / ${e.treatment_inner_vid} / ${e.treatment_inner_tpid_dei}`},c("td",o)),(s={children:ne(e.delete_entry)},c("td",s))]},c("tr",l)})},c("tbody",u))]},c("table",f))},c("div",b)):null,(g={style:"margin-top:6px",children:[_("G.988 encoded field values"),": ",nD(e.attribute)]},c("p",g)),(m={class:"mib-pre",children:nT(e.vlan_rules.length?e.vlan_rules:e.rows)},c("pre",m))]},c("details",h)}),(k={class:"mib-diag-details",children:[(w={children:_("Records / diagnostics")},c("summary",w)),(x={class:"mib-pre",children:nT({diagnostics:r.diagnostics,records:l.get(`${t}\0${r.entity_id}`)??[]})},c("pre",x))]},c("details",k))]},c("div",z))]},c("details",j)})):p.replaceChildren((n={class:"mib-empty-content",children:(r={children:_("No entities recorded for this ME class.")},c("p",r))},c("div",n)))}function m(){var t;let r=u.value.trim().toLowerCase();b.clear();let n=e.classes.filter(e=>`${e.class_id} ${e.name??""}`.toLowerCase().includes(r));n.length?f.replaceChildren(...n.map(e=>{var t,r,n,i;let a=(i={type:"button",class:`mib-class-btn${e.class_id===d?" active":""}`,onclick:()=>g(e.class_id),children:[(t={class:"mib-class-id",children:e.class_id},c("span",t)),(r={class:"mib-class-name",title:e.name??_("Unknown class"),children:e.name??_("Unknown class")},c("span",r)),(n={class:"mib-class-count",children:e.entities},c("span",n))]},c("button",i));return b.set(e.class_id,a),a})):f.replaceChildren((t={class:"mib-empty-list",children:_("No matching ME classes")},c("div",t)))}return u.addEventListener("input",()=>{void 0!==s&&clearTimeout(s),s=setTimeout(()=>{s=void 0,m()},150)}),m(),e.classes.length&&g(e.classes[0].class_id),o={class:"mib-browser",children:[(a={class:"mib-sidebar",children:[(i={class:"mib-search-box",children:u},c("div",i)),f]},c("div",a)),p]},c("div",o)}(y),(h={class:"mib-upload-diagnostics",children:[(g={children:_("Upload diagnostics")},c("summary",g)),(m={class:"mib-pre",children:nT(y.diagnostics)},c("pre",m))]},c("details",h))),n=y,C.textContent=nT({schema_version:n.schema_version,reference_version:n.reference_version,onu_id:n.onu_id,uploaded_complete:n.uploaded_complete,expected_records:n.expected_records,received_records:n.received_records,decoded_records:n.decoded_records,partial_records:n.partial_records,basic_records:n.basic_records,tables_requested:n.tables_requested,tables_collected:n.tables_collected,class_count:n.classes.length,classes:n.classes.slice(0,25),additional_classes:Math.max(0,n.classes.length-25),record_count:n.records.length,first_record:n.records[0]??null,table_count:n.tables.length,diagnostics_count:n.diagnostics.length}),P.disabled=!1;return}if(e.progress){let{phase:t,received:r,expected:n}=e.progress;if(k.textContent="starting"===t?_("Starting OMCI MIB read…"):"tables"===t?`${_("Collecting VLAN tables")}${null==n?"":`: ${r}/${n}`}`:null==n?_("Reading OMCI MIB records…"):`${_("Reading OMCI MIB records")}: ${r}/${n}`,n&&n>0){let e=Math.min(100,Math.round(r/n*100));z.title=`${e}%`,z.firstElementChild.style.width=`${e}%`}}if(Date.now()>=S)throw Error(_("MIB query timed out; retry."));await new Promise(e=>setTimeout(e,1e3))}}catch(e){U()&&(z.style.display="none",k.replaceChildren(c("span",{class:"mib-error-text",children:[String(e),y?` \xb7 ${_("Previous snapshot retained")}`:""]})))}finally{await B(),v=!1,M.disabled=N.disabled=!1}}}async function B(){if(!w)return;let e=w;w=null;try{await nI(e)}catch(e){console.warn("Failed to release MIB snapshot",e)}}A(m),L.ui.showModal(`${e.model} — ${e.serial_number}`,D,"modal-wide")})(s),children:_("Details")},c("button",n))},c("td",i))]},c("tr",a));j.addEventListener("mouseenter",()=>{let e=s.data_path?.interface,t=l.find(t=>t.interface===e);t&&document.querySelector(`[data-fttr-port="${t.port}"]`)?.classList.add("fttr-port-highlight")}),j.addEventListener("mouseleave",()=>{document.querySelectorAll(".fttr-port-highlight").forEach(e=>{e.classList.remove("fttr-port-highlight")})});let C={element:j,update(e,t,r){s=e,o=t,l=r;let n=e.serial_number.toUpperCase(),i=t?.desired[n];u.textContent=void 0!==i?_("Unpin"):_("Pin"),u.hidden=!t,u.disabled=!L.hasViewPermission(),u.title=i!==t?.active[n]?_("Pending restart"):void 0!==i?_("Fixed interface"):_("Pin interface"),j.setAttribute("data-fttr-onu-id",String(e.onu_id)),f.textContent=String(e.onu_id),b.textContent=ne(e.vendor),g.textContent=ne(e.identity?.equipment_id??e.model),m.textContent=ne(e.serial_number);let a=ns(e.state);na(h,a.tone,a.label,a.title);let d=nd(e.business_status);na(v,d.tone,d.label,d.title);let c=function(e){if(!e)return{display:"—"};let t=e.match(/image\s*\d+:\s*([^;,\s]+)/i);return t?.[1]?{display:t[1],full:e.replace(/;\s*/g,"\n")}:{display:e}}(e.firmware_version||e.identity?.software_images?.join("; "));y.textContent=c.display,c.full?y.setAttribute("title",c.full):y.removeAttribute("title"),w.textContent=ne(e.data_path?.interface);let p=nu(e.management);na(x,p.tone,p.label,p.title);let C=nb(e.provisioning);na(k,C.tone,C.label,C.title);let $=nh(e.wifi_sync);na(z,$.tone,$.label,$.title)}};return C.update(e,void 0,[]),C}let nX=null,nQ=null,nY=!1,n0=Date.now(),main=nG.extend({async load(){let[e,t,r]=await Promise.all([nS(),nM().catch(e=>(console.warn("Failed to load network device details",e),{})),nP()]);return{status:e,devices:t,platform:r}},render(e){var t,r,n,i,a,o,s,l,d,u,f,b,g,m,h,v,y;let w,x,k,z,j,C,$,S,P,O,M,N,R,I,T,A,D,U,q,B,F,Z,V,W,J,G,K,H,X,Q,Y,ee,et,er,en,ei;return t=e.status,r=e.devices,n=e.platform,w=t.optical_transceiver??{},x=r,k=function(e,t,r){var n,i,a,o,s;let l=new Map;for(let n of e)l.set(n.onu_id,nH(n,t,r));let d=(n={children:c("td",{colSpan:12,children:_("No registered sub-gateways.")})},c("tr",n)),p=0===e.length,u=c("tbody",{children:p?d:[...l.values()].map(e=>e.element)});return{element:(s={class:"table-wrapper",children:(o={class:"table",children:[(a={children:(i={children:[c("th",{children:_("ONU ID")}),c("th",{children:_("Vendor")}),c("th",{children:_("Model")}),c("th",{children:_("Optical serial")}),c("th",{children:_("Registration")}),c("th",{children:_("Business")}),c("th",{children:_("Firmware")}),c("th",{children:_("Data interface")}),c("th",{children:_("CWMP")}),c("th",{children:_("Synchronization")}),c("th",{children:_("Wi-Fi sync")}),c("th",{style:"text-align:right",children:_("Details")})]},c("tr",i))},c("thead",a)),u]},c("table",o))},c("div",s)),update(e,n,i){let a=new Set(e.map(e=>e.onu_id));for(let[e,t]of l)a.has(e)||(t.element.remove(),l.delete(e));if(0===e.length){p||u.append(d),p=!0;return}for(let[a,o]of(p&&(d.remove(),p=!1),e.entries())){let e=l.get(o.onu_id);e||(e=nH(o,t,r),l.set(o.onu_id,e)),e.update(o,n,i);let s=u.children.item(a);s!==e.element&&u.insertBefore(e.element,s)}}}}(t.sub_gateways??[],n,e=>q(e,x)),z=new Map,j=c("div",{class:"fttr-ports-grid"}),C=c("p",{children:_("No downstream ports are reported by the selected platform.")}),$=c("span",{class:"fttr-badge"}),S=c("span",{class:"fttr-badge fttr-badge-info"}),P=c("code",{style:"font-size:90%"}),O=c("span",{class:"fttr-badge fttr-badge-danger",style:"margin-left:.5em"}),s={"data-provisioning-summary":"true",style:"display:flex;align-items:center;flex-wrap:wrap;gap:0.75em;margin-top:.25em;margin-bottom:1.2em;font-size:92%",children:[(i={children:[c("strong",{style:"margin-right:.4em",children:[_("Provisioning"),":"]}),$]},c("span",i)),(a={children:[c("span",{style:"color:#888;margin-right:.3em",children:[_("Mode"),":"]}),S]},c("span",a)),(o={children:[c("span",{style:"color:#888;margin-right:.3em",children:[_("Revision"),":"]}),P]},c("span",o)),O]},M=c("div",s),N=c("span",{class:"fttr-badge"}),R=c("span",{children:ne(w.model)}),I=c("span",{class:"fttr-badge"}),T=c("p",{role:"status"}),A=c("p",{class:"alert-message warning",role:"status",hidden:!0,children:_("Live status is unavailable. The displayed data may be stale.")}),B=[["enabled",_("FPGA master switch"),_("Controls optical module reset and ONU discovery. Turning it off resets the module and disconnects all ONUs.")],["downstream_tx_enabled",_("GPON downstream optical emission"),_("Controls GPON downstream 1490 nm optical emission. Turning it off removes the downstream optical signal and disconnects ONUs.")],["fec_enabled",_("GPON downstream FEC encoding"),_("Controls GPON downstream FEC encoding. When downstream transmission is enabled, ONU-side OMCI FEC performance monitoring is also enabled.")]],F=null,Z=null,V=!1,W=!1,J=!1,G=0,K=!0,H=new Map,X=new Map,Q=c("p",{role:"status","aria-live":"polite"}),Y=e=>null==e?_("Unknown"):e?_("Enabled"):_("Disabled"),ee=c("button",{class:"cbi-button cbi-button-apply",type:"button",disabled:!0,children:_("Save & Apply")}),et=()=>{for(let[e]of B){let t=H.get(e);t.disabled=V||K||!F||!L.hasViewPermission(),!J&&F&&(t.checked=F[e]);let r="enabled"===e?Z?.tx_enabled:"downstream_tx_enabled"===e?Z?.pon_mac?.tx_enabled:Z?.pon_mac?.fec_enabled;X.get(e).textContent=`${_("Saved")}: ${Y(F?.[e])} \xb7 ${_("Hardware")}: ${Y(r)}`}ee.disabled=V||K||!F||!L.hasViewPermission()||!J&&!Z?.error&&!Z?.pon_mac?.error},er=(y={class:"cbi-section","data-fttr":"optical-control",children:[(v={style:"display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:10px",children:B.map(e=>{var t,r;let[n,i,a]=e,o=c("input",{type:"checkbox",id:`fttr-optical-${n}`,disabled:!0});H.set(n,o),o.onchange=()=>{J=!0,et()};let s=c("span",{style:"margin-inline-start:1em"});return X.set(n,s),r={style:"padding:10px 12px;border:1px solid rgba(127,140,141,.25);border-radius:5px;min-width:0",children:[(t={style:"display:flex;align-items:center;justify-content:space-between;gap:8px",children:[c("label",{style:"font-weight:600",htmlFor:`fttr-optical-${n}`,children:i}),o]},c("div",t)),c("div",{style:"font-size:82%;margin-top:6px",class:"cbi-value-description",children:a}),c("div",{style:"font-size:82%;margin-top:5px",role:"status",children:s})]},c("div",r)})},c("div",v)),c("div",{style:"display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:10px",children:[ee,Q]})]},c("div",y)),en=e=>{K=!1,Z=e,F=e.settings??null;let t=e.pon_mac,r=F&&e.tx_enabled===F.enabled&&t&&t.tx_enabled===(F.enabled&&F.downstream_tx_enabled)&&t.fec_enabled===(F.enabled&&F.fec_enabled)&&!e.cleanup_pending;Q.textContent=e.error?.message||t?.error||(r?"":_("Saved; applying hardware configuration")),et()},ei=async e=>{V=!0,G++,et();try{let t=await nN(e);"success"===t.status&&(J=!1),en(t)}catch(e){Q.textContent=String(e)}finally{V=!1,et()}},ee.onclick=()=>{var e,t;if(V||K||!F||!L.hasViewPermission())return;let r={enabled:H.get("enabled").checked,downstream_tx_enabled:H.get("downstream_tx_enabled").checked,fec_enabled:H.get("fec_enabled").checked};return!r.enabled&&F.enabled||!r.downstream_tx_enabled&&F.downstream_tx_enabled?void L.ui.showModal(_("Optical transceiver"),(t={children:[c("p",{children:_("This disconnects all ONUs on this PON. Apply these settings?")}),(e={class:"right",children:[c("button",{type:"button",class:"cbi-button",onclick:()=>L.ui.hideModal(),children:_("Cancel")})," ",c("button",{type:"button",class:"cbi-button cbi-button-negative",onclick:()=>(L.ui.hideModal(),ei(r)),children:_("Confirm")})]},c("div",e))]},c("div",t))):ei(r)},D={element:er,async refresh(){if(V||W)return;let e=G;W=!0;try{let t=await nE();V||e!==G||en(t)}catch(t){V||e!==G||(K=!0,Q.textContent=String(t),et())}finally{W=!1}}},nK.add(async()=>{!p()&&D.element.isConnected&&await D.refresh()},2),h={class:"cbi-map fttr-overview",children:[c("style",{children:`
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

				${ny}

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
				`}),c("h2",{children:_("FTTR overview")}),A,D.element,M,T,(b={class:"cbi-section",children:[c("h3",{children:_("Controller")}),(f={class:"table",children:(u={children:[(l={children:[c("th",{style:"width:15%",children:_("FPGA status")}),c("td",{style:"width:35%",children:N}),c("th",{style:"width:15%",children:_("CDR lock")}),c("td",{style:"width:35%",children:I})]},c("tr",l)),(d={children:[c("th",{children:_("Optical module")}),c("td",{colSpan:3,children:R})]},c("tr",d))]},c("tbody",u))},c("table",f))]},c("div",b)),(g={class:"cbi-section",children:[c("h3",{children:_("Sub-gateways")}),k.element]},c("div",g)),(m={class:"cbi-section",children:[c("h3",{children:_("Downstream ports")}),C,j]},c("div",m))]},U=c("div",h),(q=(e,t)=>{x=t;let r=e.optical_transceiver,n=e.provisioning,i=e.onu_pinning;T.textContent=i?[i.allocation_blocked?_("ONU allocation blocked by invalid startup configuration."):"",i.pending_restart?_("Fixed interface changes pending FTTR restart."):"",i.startup_error||i.config_error||""].filter(Boolean).join(" "):"",T.hidden=!T.textContent,n?(na($,n.enabled?"success":"neutral",n.enabled?_("Enabled"):_("Disabled")),S.textContent=ne(n.mode),P.textContent=ne(n.revision),n.error?(O.textContent=n.error,O.style.display=""):O.style.display="none",M.style.display=""):M.textContent=_("Provisioning status unavailable"),"ready"===e.fpga_status?na(N,"success",_("Ready")):e.fpga_status?na(N,"neutral",ne(e.fpga_status)):na(N,"none","—"),R.textContent=ne(r.model),null==r.cdr_locked?na(I,"none",_("Unknown")):r.cdr_locked?na(I,"success",_("Locked")):na(I,"warning",_("Unlocked")),k.update(e.sub_gateways??[],e.onu_pinning,e.switch_ports??[]);let a=new Set;for(let[r,n]of(e.switch_ports??[]).entries()){if(a.has(n.port))continue;a.add(n.port);let i=z.get(n.port);i||(i=function(e){var t,r,n,i,a,o,s,l,d,p,u,f,b,g,m,h,v;let y=c("span",{}),w=c("span",{style:"display:inline-block;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:90%",children:_("Unknown")}),x=c("img",{src:"/luci-static/resources/icons/port_down.svg",alt:"","aria-hidden":"true"}),k=c("div",{style:"flex:1;height:3px;opacity:0.25;background-color:rgb(240, 144, 144)"}),z=c("span",{}),j=c("span",{}),C=c("span",{}),$=c("span",{}),S=c("span",{}),P=c("span",{}),O=c("span",{}),M=c("span",{}),N=c("span",{}),R=c("span",{}),I=c("span",{}),T=c("span",{}),A=c("span",{}),D=c("span",{}),U=(v={class:"ifacebox fttr-port-card","data-fttr-port":String(e),style:"box-sizing:border-box;margin:0;cursor:pointer",children:[c("div",{class:"ifacebox-head fttr-port-name",style:"font-weight:bold",children:y}),c("div",{class:"ifacebox-body fttr-port-identity",children:[x,w]}),(r={class:"ifacebox-head cbi-tooltip-container",style:"display:flex",children:[k,(t={class:"cbi-tooltip left",children:[c("strong",{children:[_("Port status"),": "]}),z,c("br",{}),c("strong",{children:[_("ONU"),": "]}),j,c("br",{}),c("strong",{children:[_("MAC address"),": "]}),C]},c("span",t))]},c("div",r)),(h={class:"ifacebox-body",children:(m={class:"cbi-tooltip-container fttr-port-stats",style:"display:flex;flex-direction:column;align-items:center;font-size:80%;line-height:1.4;cursor:pointer;width:100%",children:[(n={style:"display:flex;flex-direction:column;align-items:center",children:[c("div",{style:"white-space:nowrap",children:["▲ ",$]}),c("div",{style:"white-space:nowrap",children:["▼ ",S]})]},c("div",n)),(g={class:"cbi-tooltip",children:(b={children:[(i={class:"nowrap",children:[c("strong",{children:[_("Received bytes"),": "]}),P]},c("span",i)),c("br",{}),(a={class:"nowrap",children:[c("strong",{children:[_("Received packets"),": "]}),O]},c("span",a)),c("br",{}),(o={class:"nowrap",children:[c("strong",{children:[_("Received multicast"),": "]}),M]},c("span",o)),c("br",{}),(s={class:"nowrap",children:[c("strong",{children:[_("Receive errors"),": "]}),N]},c("span",s)),c("br",{}),(l={class:"nowrap",children:[c("strong",{children:[_("Receive dropped"),": "]}),R]},c("span",l)),c("br",{}),(d={class:"nowrap",children:[c("strong",{children:[_("Transmitted bytes"),": "]}),I]},c("span",d)),c("br",{}),(p={class:"nowrap",children:[c("strong",{children:[_("Transmitted packets"),": "]}),T]},c("span",p)),c("br",{}),(u={class:"nowrap",children:[c("strong",{children:[_("Transmit errors"),": "]}),A]},c("span",u)),c("br",{}),(f={class:"nowrap",children:[c("strong",{children:[_("Transmit dropped"),": "]}),D]},c("span",f))]},c("span",b))},c("span",g))]},c("div",m))},c("div",h))]},c("div",v));return U.addEventListener("mouseenter",()=>{let e=U.getAttribute("data-active-onu-id");if(e){let t=document.querySelector(`[data-fttr-onu-id="${e}"]`);t?.classList.add("fttr-row-highlight")}}),U.addEventListener("mouseleave",()=>{document.querySelectorAll(".fttr-row-highlight").forEach(e=>{e.classList.remove("fttr-row-highlight")})}),U.addEventListener("click",()=>{let e=U.getAttribute("data-active-onu-id");if(e){let t=document.querySelector(`[data-fttr-onu-id="${e}"]`);t&&(t.scrollIntoView({behavior:"smooth",block:"nearest"}),t.classList.add("fttr-row-highlight"),window.setTimeout(()=>t.classList.remove("fttr-row-highlight"),1500))}}),{element:U,update(t,r){var n;let i=(t.switch_ports??[]).find(t=>t.port===e),a=i?.interface,o=a?r[a]:void 0,s=o?.stats,l=i?.carrier??o?.carrier??(o?.link?.speed!==void 0||void 0),d=(t.sub_gateways??[]).find(e=>e.onu_id===i?.onu_id),c=!0===l,p=s?.rx_bytes,u=s?.tx_bytes;i?.onu_id!==void 0?U.setAttribute("data-active-onu-id",String(i.onu_id)):U.removeAttribute("data-active-onu-id"),c?(U.classList.add("port-up"),U.classList.remove("port-down")):(U.classList.add("port-down"),U.classList.remove("port-up")),y.textContent=ne(a),x.setAttribute("src",`/luci-static/resources/icons/${c?"port_up.svg":"port_down.svg"}`),w.textContent=c?o?.link?.speed!==void 0?void 0===(n=o.link.speed)||!Number.isFinite(n)||n<=0?_("Unknown"):n>=1e3?`${n/1e3} GbE`:`${n} MbE`:_("Connected"):!1===l?_("Disconnected"):_("Unknown"),w.setAttribute("title",_("速度：%s Mbit/s，双工：%s").format(ne(o?.link?.speed),ne(o?.link?.duplex))),k.style.opacity=c?"1":"0.25",k.style.backgroundColor=c?"rgb(46, 204, 113)":"rgba(200, 200, 200, 0.4)",z.textContent=ne((i?.reserved_sn&&void 0===i.onu_id?_("Reserved (offline)"):i?.link_state)??i?.status??(o?l?_("Link up"):_("Link down"):_("Unavailable"))),i?.reserved_sn&&void 0!==i.onu_id&&(z.textContent+=` \xb7 ${_("Fixed interface")}`),j.textContent=ne(i?.onu_sn??d?.serial_number??i?.reserved_sn??i?.onu_id),U.title=i?.reserved_sn?`${_("Reserved")}: ${i.reserved_sn}`:"",C.textContent=ne(o?.mac),$.textContent=c||u?nr(u):"—",S.textContent=c||p?nr(p):"—",P.textContent=nr(p),O.textContent=nn(s?.rx_packets),M.textContent=nn(s?.rx_multicast??s?.multicast),N.textContent=nn(s?.rx_errors),R.textContent=nn(s?.rx_dropped),I.textContent=nr(u),T.textContent=nn(s?.tx_packets),A.textContent=nn(s?.tx_errors),D.textContent=nn(s?.tx_dropped)}}}(n.port),z.set(n.port,i)),i.update(e,t);let o=j.children.item(r);o!==i.element&&j.insertBefore(i.element,o)}for(let[e,t]of z)a.has(e)||(t.element.remove(),z.delete(e));C.hidden=a.size>0})(t,r),nX=(nQ={element:U,update:q,setStale:e=>{A.hidden=!e}}).element,nK.add(async()=>{if(nY||p()||!nX?.isConnected||!nQ)return;let e=nQ;nY=!0;try{let[t,r]=await Promise.all([nS(),nM().catch(()=>({}))]);nQ===e&&e.element.isConnected&&e.update(t,r),n0=Date.now(),e.setStale(!1)}catch(t){console.error("Failed to refresh FTTR status",t),e.setStale(Date.now()-n0>3e4)}finally{nY=!1}},10),nX},handleSaveApply:null,handleSave:null,handleReset:null})})(),main=t.main;
return main;
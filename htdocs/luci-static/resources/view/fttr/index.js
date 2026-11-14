'use strict';
var main,e={};e.d=(t,r,n)=>{var i=(r,n)=>{for(var i in r)e.o(r,i)&&!e.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,[n]:r[i]})};i(r,"get"),i(n,"value")},e.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var t={};(()=>{var r;let n,i,a,o,s,l;e.d(t,{main:()=>main});let d=Symbol.for("jsx.fragment");function c(e,t){let{children:r,...n}=null===t||"object"!=typeof t||Array.isArray(t)?{}:t,i=function e(t){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];for(let n of t)null!=n&&"boolean"!=typeof n&&(Array.isArray(n)?e(n,r):r.push(n instanceof Node?n:String(n)));return r}(null==r?[]:Array.isArray(r)?r:[r]);if(e===d){let e=document.createDocumentFragment();return e.append(...i),e}if("function"==typeof e){let t=Reflect.apply(e,void 0,[{...n,children:i}]);if(!(t instanceof Node))throw TypeError("JSX components must return a DOM Node");return t}if("string"!=typeof e)throw TypeError("JSX element types must be tag names or component functions");let a={},o={...n};for(let[e,t]of Object.entries(o))e.startsWith("on")&&"function"==typeof t?(a[e]=t,delete o[e]):"boolean"==typeof t&&(t?o[e]=e:delete o[e]);let s=Object.keys(o).length>0?i.length>1?E(e,o,i):E(e,o,i[0]):i.length>1?E(e,{},i):E(e,{},i[0]);for(let[e,t]of Object.entries(a)){let r=e.slice(2).toLowerCase();s.addEventListener(r,t)}return s}function p(){return"u">typeof document&&document.hidden}function u(e,t,r){function n(r,n){if(r._zod||Object.defineProperty(r,"_zod",{value:{def:n,constr:o,traits:new Set},enumerable:!1}),r._zod.traits.has(e))return;r._zod.traits.add(e),t(r,n);let i=o.prototype,a=Object.keys(i);for(let e=0;e<a.length;e++){let t=a[e];t in r||(r[t]=i[t].bind(r))}}let i=r?.Parent??Object;class a extends i{}function o(e){var t;let i=r?.Parent?new a:this;for(let r of(n(i,e),(t=i._zod).deferred??(t.deferred=[]),i._zod.deferred))r();return i}return Object.defineProperty(a,"name",{value:e}),Object.defineProperty(o,"init",{value:n}),Object.defineProperty(o,Symbol.hasInstance,{value:t=>!!r?.Parent&&t instanceof r.Parent||t?._zod?.traits?.has(e)}),Object.defineProperty(o,"name",{value:e}),o}Object.freeze({status:"aborted"}),Symbol("zod_brand");class f extends Error{constructor(){super("Encountered Promise during synchronous parse. Use .parseAsync() instead.")}}let b={};function g(e){return e&&Object.assign(b,e),b}function m(e,t){return"bigint"==typeof t?t.toString():t}function h(e){let t=+!!e.startsWith("^"),r=e.endsWith("$")?e.length-1:e.length;return e.slice(t,r)}let v=Symbol("evaluating");function y(e,t,r){let n;Object.defineProperty(e,t,{get(){if(n!==v)return void 0===n&&(n=v,n=r()),n},set(r){Object.defineProperty(e,t,{value:r})},configurable:!0})}let w="captureStackTrace"in Error?Error.captureStackTrace:(...e)=>{};function x(e){return"object"==typeof e&&null!==e&&!Array.isArray(e)}function k(e){if(!1===x(e))return!1;let t=e.constructor;if(void 0===t||"function"!=typeof t)return!0;let r=t.prototype;return!1!==x(r)&&!1!==Object.prototype.hasOwnProperty.call(r,"isPrototypeOf")}function j(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function z(e){if(!e)return{};if("string"==typeof e)return{error:()=>e};if(e?.message!==void 0){if(e?.error!==void 0)throw Error("Cannot specify both `message` and `error` params");e.error=e.message}return(delete e.message,"string"==typeof e.error)?{...e,error:()=>e.error}:e}function C(e,t=0){if(!0===e.aborted)return!0;for(let r=t;r<e.issues.length;r++)if(e.issues[r]?.continue!==!0)return!0;return!1}function S(e,t){return t.map(t=>(t.path??(t.path=[]),t.path.unshift(e),t))}function $(e){return"string"==typeof e?e:e?.message}function P(e,t,r){let n={...e,path:e.path??[]};return e.message||(n.message=$(e.inst?._zod.def?.error?.(e))??$(t?.error?.(e))??$(r.customError?.(e))??$(r.localeError?.(e))??"Invalid input"),delete n.inst,delete n.continue,t?.reportInput||delete n.input,n}let O=(e,t)=>{e.name="$ZodError",Object.defineProperty(e,"_zod",{value:e._zod,enumerable:!1}),Object.defineProperty(e,"issues",{value:t,enumerable:!1}),e.message=JSON.stringify(t,m,2),Object.defineProperty(e,"toString",{value:()=>e.message,enumerable:!1})},M=u("$ZodError",O),N=u("$ZodError",O,{Parent:Error}),R=(a=N,(e,t,r,n)=>{let i=r?Object.assign(r,{async:!1}):{async:!1},o=e._zod.run({value:t,issues:[]},i);if(o instanceof Promise)throw new f;if(o.issues.length){let e=new(n?.Err??a)(o.issues.map(e=>P(e,i,g())));throw w(e,n?.callee),e}return o.value}),I=(o=N,async(e,t,r,n)=>{let i=r?Object.assign(r,{async:!0}):{async:!0},a=e._zod.run({value:t,issues:[]},i);if(a instanceof Promise&&(a=await a),a.issues.length){let e=new(n?.Err??o)(a.issues.map(e=>P(e,i,g())));throw w(e,n?.callee),e}return a.value}),A=(s=N,(e,t,r)=>{let n=r?{...r,async:!1}:{async:!1},i=e._zod.run({value:t,issues:[]},n);if(i instanceof Promise)throw new f;return i.issues.length?{success:!1,error:new(s??M)(i.issues.map(e=>P(e,n,g())))}:{success:!0,data:i.value}}),T=(l=N,async(e,t,r)=>{let n=r?Object.assign(r,{async:!0}):{async:!0},i=e._zod.run({value:t,issues:[]},n);return i instanceof Promise&&(i=await i),i.issues.length?{success:!1,error:new l(i.issues.map(e=>P(e,n,g())))}:{success:!0,data:i.value}}),D=/^-?\d+(?:\.\d+)?$/,U=/^(?:true|false)$/i,F=/^null$/i,q={major:4,minor:3,patch:6},B=u("$ZodType",(e,t)=>{var r;e??(e={}),e._zod.def=t,e._zod.bag=e._zod.bag||{},e._zod.version=q;let n=[...e._zod.def.checks??[]];for(let t of(e._zod.traits.has("$ZodCheck")&&n.unshift(e),n))for(let r of t._zod.onattach)r(e);if(0===n.length)(r=e._zod).deferred??(r.deferred=[]),e._zod.deferred?.push(()=>{e._zod.run=e._zod.parse});else{let t=(e,t,r)=>{let n,i=C(e);for(let a of t){if(a._zod.def.when){if(!a._zod.def.when(e))continue}else if(i)continue;let t=e.issues.length,o=a._zod.check(e);if(o instanceof Promise&&r?.async===!1)throw new f;if(n||o instanceof Promise)n=(n??Promise.resolve()).then(async()=>{await o,e.issues.length!==t&&(i||(i=C(e,t)))});else{if(e.issues.length===t)continue;i||(i=C(e,t))}}return n?n.then(()=>e):e},r=(r,i,a)=>{if(C(r))return r.aborted=!0,r;let o=t(i,n,a);if(o instanceof Promise){if(!1===a.async)throw new f;return o.then(t=>e._zod.parse(t,a))}return e._zod.parse(o,a)};e._zod.run=(i,a)=>{if(a.skipChecks)return e._zod.parse(i,a);if("backward"===a.direction){let t=e._zod.parse({value:i.value,issues:[]},{...a,skipChecks:!0});return t instanceof Promise?t.then(e=>r(e,i,a)):r(t,i,a)}let o=e._zod.parse(i,a);if(o instanceof Promise){if(!1===a.async)throw new f;return o.then(e=>t(e,n,a))}return t(o,n,a)}}y(e,"~standard",()=>({validate:t=>{try{let r=A(e,t);return r.success?{value:r.data}:{issues:r.error?.issues}}catch(r){return T(e,t).then(e=>e.success?{value:e.data}:{issues:e.error?.issues})}},vendor:"zod",version:1}))}),Z=u("$ZodString",(e,t)=>{var r;let n;B.init(e,t),e._zod.pattern=[...e?._zod.bag?.patterns??[]].pop()??(n=(r=e._zod.bag)?`[\\s\\S]{${r?.minimum??0},${r?.maximum??""}}`:"[\\s\\S]*",RegExp(`^${n}$`)),e._zod.parse=(r,n)=>{if(t.coerce)try{r.value=String(r.value)}catch(e){}return"string"==typeof r.value||r.issues.push({expected:"string",code:"invalid_type",input:r.value,inst:e}),r}}),V=u("$ZodNumber",(e,t)=>{B.init(e,t),e._zod.pattern=e._zod.bag.pattern??D,e._zod.parse=(r,n)=>{if(t.coerce)try{r.value=Number(r.value)}catch(e){}let i=r.value;if("number"==typeof i&&!Number.isNaN(i)&&Number.isFinite(i))return r;let a="number"==typeof i?Number.isNaN(i)?"NaN":Number.isFinite(i)?void 0:"Infinity":void 0;return r.issues.push({expected:"number",code:"invalid_type",input:i,inst:e,...a?{received:a}:{}}),r}}),W=u("$ZodBoolean",(e,t)=>{B.init(e,t),e._zod.pattern=U,e._zod.parse=(r,n)=>{if(t.coerce)try{r.value=!!r.value}catch(e){}let i=r.value;return"boolean"==typeof i||r.issues.push({expected:"boolean",code:"invalid_type",input:i,inst:e}),r}}),G=u("$ZodNull",(e,t)=>{B.init(e,t),e._zod.pattern=F,e._zod.values=new Set([null]),e._zod.parse=(t,r)=>{let n=t.value;return null===n||t.issues.push({expected:"null",code:"invalid_type",input:n,inst:e}),t}}),J=u("$ZodUnknown",(e,t)=>{B.init(e,t),e._zod.parse=e=>e});function K(e,t,r){e.issues.length&&t.issues.push(...S(r,e.issues)),t.value[r]=e.value}let X=u("$ZodArray",(e,t)=>{B.init(e,t),e._zod.parse=(r,n)=>{let i=r.value;if(!Array.isArray(i))return r.issues.push({expected:"array",code:"invalid_type",input:i,inst:e}),r;r.value=Array(i.length);let a=[];for(let e=0;e<i.length;e++){let o=i[e],s=t.element._zod.run({value:o,issues:[]},n);s instanceof Promise?a.push(s.then(t=>K(t,r,e))):K(s,r,e)}return a.length?Promise.all(a).then(()=>r):r}});function H(e,t,r,n,i){if(e.issues.length){if(i&&!(r in n))return;t.issues.push(...S(r,e.issues))}void 0===e.value?r in n&&(t.value[r]=void 0):t.value[r]=e.value}let Q=u("$ZodObject",(e,t)=>{var r;let n;B.init(e,t);let i=Object.getOwnPropertyDescriptor(t,"shape");if(!i?.get){let e=t.shape;Object.defineProperty(t,"shape",{get:()=>{let r={...e};return Object.defineProperty(t,"shape",{value:r}),r}})}let a=(r=()=>(function(e){var t;let r=Object.keys(e.shape);for(let t of r)if(!e.shape?.[t]?._zod?.traits?.has("$ZodType"))throw Error(`Invalid element at key "${t}": expected a Zod schema`);let n=Object.keys(t=e.shape).filter(e=>"optional"===t[e]._zod.optin&&"optional"===t[e]._zod.optout);return{...e,keys:r,keySet:new Set(r),numKeys:r.length,optionalKeys:new Set(n)}})(t),{get value(){{let e=r();return Object.defineProperty(this,"value",{value:e}),e}}});y(e._zod,"propValues",()=>{let e=t.shape,r={};for(let t in e){let n=e[t]._zod;if(n.values)for(let e of(r[t]??(r[t]=new Set),n.values))r[t].add(e)}return r});let o=t.catchall;e._zod.parse=(t,r)=>{n??(n=a.value);let i=t.value;if(!x(i))return t.issues.push({expected:"object",code:"invalid_type",input:i,inst:e}),t;t.value={};let s=[],l=n.shape;for(let e of n.keys){let n=l[e],a="optional"===n._zod.optout,o=n._zod.run({value:i[e],issues:[]},r);o instanceof Promise?s.push(o.then(r=>H(r,t,e,i,a))):H(o,t,e,i,a)}return o?function(e,t,r,n,i,a){let o=[],s=i.keySet,l=i.catchall._zod,d=l.def.type,c="optional"===l.optout;for(let i in t){if(s.has(i))continue;if("never"===d){o.push(i);continue}let a=l.run({value:t[i],issues:[]},n);a instanceof Promise?e.push(a.then(e=>H(e,r,i,t,c))):H(a,r,i,t,c)}return(o.length&&r.issues.push({code:"unrecognized_keys",keys:o,input:t,inst:a}),e.length)?Promise.all(e).then(()=>r):r}(s,i,t,r,a.value,e):s.length?Promise.all(s).then(()=>t):t}});function Y(e,t,r,n){for(let r of e)if(0===r.issues.length)return t.value=r.value,t;let i=e.filter(e=>!C(e));return 1===i.length?(t.value=i[0].value,i[0]):(t.issues.push({code:"invalid_union",input:t.value,inst:r,errors:e.map(e=>e.issues.map(e=>P(e,n,g())))}),t)}let ee=u("$ZodUnion",(e,t)=>{B.init(e,t),y(e._zod,"optin",()=>t.options.some(e=>"optional"===e._zod.optin)?"optional":void 0),y(e._zod,"optout",()=>t.options.some(e=>"optional"===e._zod.optout)?"optional":void 0),y(e._zod,"values",()=>{if(t.options.every(e=>e._zod.values))return new Set(t.options.flatMap(e=>Array.from(e._zod.values)))}),y(e._zod,"pattern",()=>{if(t.options.every(e=>e._zod.pattern)){let e=t.options.map(e=>e._zod.pattern);return RegExp(`^(${e.map(e=>h(e.source)).join("|")})$`)}});let r=1===t.options.length,n=t.options[0]._zod.run;e._zod.parse=(i,a)=>{if(r)return n(i,a);let o=!1,s=[];for(let e of t.options){let t=e._zod.run({value:i.value,issues:[]},a);if(t instanceof Promise)s.push(t),o=!0;else{if(0===t.issues.length)return t;s.push(t)}}return o?Promise.all(s).then(t=>Y(t,i,e,a)):Y(s,i,e,a)}}),et=u("$ZodIntersection",(e,t)=>{B.init(e,t),e._zod.parse=(e,r)=>{let n=e.value,i=t.left._zod.run({value:n,issues:[]},r),a=t.right._zod.run({value:n,issues:[]},r);return i instanceof Promise||a instanceof Promise?Promise.all([i,a]).then(([t,r])=>er(e,t,r)):er(e,i,a)}});function er(e,t,r){let n,i=new Map;for(let r of t.issues)if("unrecognized_keys"===r.code)for(let e of(n??(n=r),r.keys))i.has(e)||i.set(e,{}),i.get(e).l=!0;else e.issues.push(r);for(let t of r.issues)if("unrecognized_keys"===t.code)for(let e of t.keys)i.has(e)||i.set(e,{}),i.get(e).r=!0;else e.issues.push(t);let a=[...i].filter(([,e])=>e.l&&e.r).map(([e])=>e);if(a.length&&n&&e.issues.push({...n,keys:a}),C(e))return e;let o=function e(t,r){if(t===r||t instanceof Date&&r instanceof Date&&+t==+r)return{valid:!0,data:t};if(k(t)&&k(r)){let n=Object.keys(r),i=Object.keys(t).filter(e=>-1!==n.indexOf(e)),a={...t,...r};for(let n of i){let i=e(t[n],r[n]);if(!i.valid)return{valid:!1,mergeErrorPath:[n,...i.mergeErrorPath]};a[n]=i.data}return{valid:!0,data:a}}if(Array.isArray(t)&&Array.isArray(r)){if(t.length!==r.length)return{valid:!1,mergeErrorPath:[]};let n=[];for(let i=0;i<t.length;i++){let a=e(t[i],r[i]);if(!a.valid)return{valid:!1,mergeErrorPath:[i,...a.mergeErrorPath]};n.push(a.data)}return{valid:!0,data:n}}return{valid:!1,mergeErrorPath:[]}}(t.value,r.value);if(!o.valid)throw Error(`Unmergable intersection. Error path: ${JSON.stringify(o.mergeErrorPath)}`);return e.value=o.data,e}let en=u("$ZodRecord",(e,t)=>{B.init(e,t),e._zod.parse=(r,n)=>{let i=r.value;if(!k(i))return r.issues.push({expected:"record",code:"invalid_type",input:i,inst:e}),r;let a=[],o=t.keyType._zod.values;if(o){let s;r.value={};let l=new Set;for(let e of o)if("string"==typeof e||"number"==typeof e||"symbol"==typeof e){l.add("number"==typeof e?e.toString():e);let o=t.valueType._zod.run({value:i[e],issues:[]},n);o instanceof Promise?a.push(o.then(t=>{t.issues.length&&r.issues.push(...S(e,t.issues)),r.value[e]=t.value})):(o.issues.length&&r.issues.push(...S(e,o.issues)),r.value[e]=o.value)}for(let e in i)l.has(e)||(s=s??[]).push(e);s&&s.length>0&&r.issues.push({code:"unrecognized_keys",input:i,inst:e,keys:s})}else for(let o of(r.value={},Reflect.ownKeys(i))){if("__proto__"===o)continue;let s=t.keyType._zod.run({value:o,issues:[]},n);if(s instanceof Promise)throw Error("Async schemas not supported in object keys currently");if("string"==typeof o&&D.test(o)&&s.issues.length){let e=t.keyType._zod.run({value:Number(o),issues:[]},n);if(e instanceof Promise)throw Error("Async schemas not supported in object keys currently");0===e.issues.length&&(s=e)}if(s.issues.length){"loose"===t.mode?r.value[o]=i[o]:r.issues.push({code:"invalid_key",origin:"record",issues:s.issues.map(e=>P(e,n,g())),input:o,path:[o],inst:e});continue}let l=t.valueType._zod.run({value:i[o],issues:[]},n);l instanceof Promise?a.push(l.then(e=>{e.issues.length&&r.issues.push(...S(o,e.issues)),r.value[s.value]=e.value})):(l.issues.length&&r.issues.push(...S(o,l.issues)),r.value[s.value]=l.value)}return a.length?Promise.all(a).then(()=>r):r}}),ei=u("$ZodLiteral",(e,t)=>{if(B.init(e,t),0===t.values.length)throw Error("Cannot create literal schema with no valid values");let r=new Set(t.values);e._zod.values=r,e._zod.pattern=RegExp(`^(${t.values.map(e=>"string"==typeof e?j(e):e?j(e.toString()):String(e)).join("|")})$`),e._zod.parse=(n,i)=>{let a=n.value;return r.has(a)||n.issues.push({code:"invalid_value",values:t.values,input:a,inst:e}),n}});function ea(e,t){return e.issues.length&&void 0===t?{issues:[],value:void 0}:e}let eo=u("$ZodOptional",(e,t)=>{B.init(e,t),e._zod.optin="optional",e._zod.optout="optional",y(e._zod,"values",()=>t.innerType._zod.values?new Set([...t.innerType._zod.values,void 0]):void 0),y(e._zod,"pattern",()=>{let e=t.innerType._zod.pattern;return e?RegExp(`^(${h(e.source)})?$`):void 0}),e._zod.parse=(e,r)=>{if("optional"===t.innerType._zod.optin){let n=t.innerType._zod.run(e,r);return n instanceof Promise?n.then(t=>ea(t,e.value)):ea(n,e.value)}return void 0===e.value?e:t.innerType._zod.run(e,r)}});Symbol("ZodOutput"),Symbol("ZodInput");(r=globalThis).__zod_globalRegistry??(r.__zod_globalRegistry=new class e{constructor(){this._map=new WeakMap,this._idmap=new Map}add(e,...t){let r=t[0];return this._map.set(e,r),r&&"object"==typeof r&&"id"in r&&this._idmap.set(r.id,e),this}clear(){return this._map=new WeakMap,this._idmap=new Map,this}remove(e){let t=this._map.get(e);return t&&"object"==typeof t&&"id"in t&&this._idmap.delete(t.id),this._map.delete(e),this}get(e){let t=e._zod.parent;if(t){let r={...this.get(t)??{}};delete r.id;let n={...r,...this._map.get(e)};return Object.keys(n).length?n:void 0}return this._map.get(e)}has(e){return this._map.has(e)}});let es=u("ZodMiniType",(e,t)=>{if(!e._zod)throw Error("Uninitialized schema in ZodMiniType.");B.init(e,t),e.def=t,e.type=t.type,e.parse=(t,r)=>R(e,t,r,{callee:e.parse}),e.safeParse=(t,r)=>A(e,t,r),e.parseAsync=async(t,r)=>I(e,t,r,{callee:e.parseAsync}),e.safeParseAsync=async(t,r)=>T(e,t,r),e.check=(...r)=>e.clone({...t,checks:[...t.checks??[],...r.map(e=>"function"==typeof e?{_zod:{check:e,def:{check:"custom"},onattach:[]}}:e)]},{parent:!0}),e.with=e.check,e.clone=(t,r)=>{let n;return n=new e._zod.constr(t??e._zod.def),(!t||r?.parent)&&(n._zod.parent=e),n},e.brand=()=>e,e.register=(t,r)=>(t.add(e,r),e),e.apply=t=>t(e)}),el=u("ZodMiniString",(e,t)=>{Z.init(e,t),es.init(e,t)});function ed(e){return new el({type:"string",...z(e)})}let ec=u("ZodMiniNumber",(e,t)=>{V.init(e,t),es.init(e,t)});function ep(e){return new ec({type:"number",checks:[],...z(e)})}let eu=u("ZodMiniBoolean",(e,t)=>{W.init(e,t),es.init(e,t)});function e_(e){return new eu({type:"boolean",...z(e)})}let ef=u("ZodMiniNull",(e,t)=>{G.init(e,t),es.init(e,t)});function eb(e){return new ef({type:"null",...z(e)})}let eg=u("ZodMiniUnknown",(e,t)=>{J.init(e,t),es.init(e,t)}),em=u("ZodMiniArray",(e,t)=>{X.init(e,t),es.init(e,t)});function eh(e,t){return new em({type:"array",element:e,...z(t)})}let ev=u("ZodMiniObject",(e,t)=>{Q.init(e,t),es.init(e,t),y(e,"shape",()=>t.shape)});function ey(e,t){return new ev({type:"object",shape:e??{},...z(t)})}let ew=u("ZodMiniUnion",(e,t)=>{ee.init(e,t),es.init(e,t)});function ex(e,t){return new ew({type:"union",options:e,...z(t)})}let ek=u("ZodMiniIntersection",(e,t)=>{et.init(e,t),es.init(e,t)});function ej(e,t){return new ek({type:"intersection",left:e,right:t})}let ez=u("ZodMiniRecord",(e,t)=>{en.init(e,t),es.init(e,t)});function eC(e,t,r){return new ez({type:"record",keyType:e,valueType:t,...z(r)})}let eS=u("ZodMiniLiteral",(e,t)=>{ei.init(e,t),es.init(e,t)});function e$(e,t){return new eS({type:"literal",values:Array.isArray(e)?e:[e],...z(t)})}let eP=u("ZodMiniOptional",(e,t)=>{eo.init(e,t),es.init(e,t)});function eO(e){return new eP({type:"optional",innerType:e})}let eE=ex([e$("account_set_password"),e$("account_set_active")]),eM=ex([e$("waiting_transport"),e$("waiting_identity"),e$("reading"),e$("configuring"),e$("verifying"),e$("waiting_inform"),e$("ready"),e$("retry_wait"),e$("manual_required"),e$("not_configured"),e$("waiting_acs"),e$("awaiting_apply"),e$("discovering_management_wan"),e$("configuring_management_wan"),e$("verifying_management_wan")]),eN=ey({enabled:e_(),listen:ex([ed(),eb()]),path:ex([ed(),eb()]),error:ex([ed(),eb()])}),eR=ey({vlan:ep(),vlans:eh(ep()),priority:ep(),acs_url:ed()}),eI=ey({state:eM,optical_sn:ed(),cwmp_id:ed(),mqtt_target:ex([ed(),eb()]),binding_source:ed(),method:ed(),desired_version:ed(),generation:ep(),reason:ed(),attempts:ep(),next_retry_at:ep(),updated_at:ep(),settings_verified_at:ex([ep(),eb()]),selected_vlan:ex([ep(),eb()]),last_inform:ex([ep(),eb()]),expected_acs_url:ed(),last_error:ex([ed(),eb()]),transport_epoch:ep(),completed_authorization:ep(),connection_request_enabled:ex([e_(),eb()]),inflight:e_(),persistence_error:ex([ed(),eb()]),link_identity_error:ex([ed(),eb()]),listener:eN,mqtt_last_seen:ex([ep(),eb()]),desired:eO(eR),endpoint_notice:eO(ed()),manual_steps:eO(eh(ed()))}),eL=ex([e$("not_required"),e$("pending"),e$("unavailable")]),eA=ex([eI,ey({state:eL,reason:ed()})]),eT=ey({id:ed(),name:ed()}),eD=ey({omci:eh(eT),bootstrap:eh(eT),provisioning:eh(eT)}),eU=ey({configured:ed(),effective:ed(),available:eh(ed()),reason:ed()}),eF=ey({phase:ex([e$("not_started"),e$("collecting_identity"),e$("retrying_identity"),e$("unsupported"),e$("configuring"),e$("verifying"),e$("wan_bootstrap_pending"),e$("verified"),e$("retrying"),e$("offline")]),generation:ep(),error:ex([ed(),eb()])}),eq=ex([e$("auto"),e$("factory"),e$("firmware"),e$("builtin")]),eB=ex([e$("factory"),e$("firmware"),e$("builtin")]),eZ=ey({source:eB,raw_sha256:ed(),effective_sha256:ed(),size:ep(),supplemented:e_(),temperature_compensation_enabled:e_()}),eV=ey({enabled:e_(),reason:ed(),calibration_sha256:ex([ed(),eb()]),raw_temperature:ex([ep(),eb()]),table_index:ex([ep(),eb()]),target_code:ex([ep(),eb()]),last_check_unix:ex([ep(),eb()]),last_write_unix:ex([ep(),eb()]),error:ex([ed(),eb()])}),eW=ey({selected:eq,candidate:ex([eZ,eb()]),candidate_error:ex([ed(),eb()]),active:ex([eZ,eb()]),hardware_applied:e_(),pending:e_(),temperature_compensation:eV});ey({success:e_(),state:eO(eW),output:eO(ed()),error:eO(ed())});let eG=ey({detected:e_(),device:ed(),has_data:e_(),sha256:ed(),data:ed()}),eJ=ey({exists:e_(),path:ed(),size:ep(),sha256:ed(),data:ed()}),eK=ey({source:eB,active_path:ed(),size:ep(),sha256:ed(),data:ed(),factory:eG,firmware:eJ,state:eO(eW)}),eX=ey({error:ed()});ex([eK,eX]);let eH=ey({success:e_(),path:ed(),size:ep(),sha256:ed()});ex([eH,eX]),ey({data:ed()}),ey({source:eq});let eQ=ey({acs:e_(),mqtt:e_(),npu:e_(),"device-hl202":e_(),"device-hwtc":e_(),"device-star":e_(),"device-zte":e_(),"device-scty":e_()}),eY=ey({optical:e_(),bridge_offload:e_(),omci_mib:e_(),mqtt_telemetry:e_(),hl202_management:e_(),cwmp:e_(),command_provisioning:e_()}),e0=ey({status:e_(),config:e_(),sync:e_(),hardware:e_(),calibration:e_(),hl202:e_(),about:e_()}),e1=ey({schema_version:e$(1),version:ed(),features:eQ,functions:eY,pages:e0,adapters:eD}),e2=ex([ey({valid:e$(!0),revision:ed(),devices:ep()}),ey({error:ed()})]),e5=ex([e$("disabled"),e$("waiting"),e$("wan_reconciling"),e$("wan_verifying"),e$("wifi_reconciling"),e$("discovering"),e$("reading"),e$("disabling"),e$("disabling_read"),e$("writing"),e$("verifying"),e$("settling"),e$("completed"),e$("not_started"),e$("reset_pending"),e$("interrupted"),e$("recovering"),e$("waiting_management"),e$("waiting_task")]),e3=ey({operation_id:ep(),device:ed(),state:e5,started_at:ep()}),e4=ey({state:ex([e$("waiting"),e$("applied")]),requested_revision:ed(),requested_at:ex([ep(),eb()]),blocking_operations:eh(e3),reset_pending:e_()}),e6=ex([e$("auto"),e$("manual")]),e8=e$("diff"),e7=ey({state:ed(),enabled:e_(),reason:eO(ex([ed(),eb()])),revision:eO(ed()),vlan:eO(ep()),updated_at:eO(ep())}),e9=ex([e$("disabled"),e$("online"),e$("waiting_inform"),e$("offline_or_stale"),e$("waiting_transport")]),te=ey({cwmp_id:ed(),state:e9,optical_online:e_(),last_inform:ex([ep(),eb()]),age_seconds:ex([ep(),eb()])}),tt=ey({state:e9,optical_online:e_()}),tr=ex([e$("device_service"),e$("ssid"),e$("port_binding"),e$("wan_activation")]),tn=ey({name:ed(),desired:ed()}),ti=ey({id:ed(),name:eO(ex([ed(),eb()])),kind:tr,service_type:ed(),state:ed(),reason:eO(ed()),revision:eO(ed()),current_revision:eO(e_()),management_fresh:eO(e_()),operation_id:eO(ep()),task_id:eO(ex([ep(),eb()])),updated_at:eO(ep()),changes:eO(eh(tn))}),ta=ex([e$("plan"),e$("apply")]),to=ey({wan:ed(),wlan:ed(),binding:ed()}),ts=ey({state:ed(),requested:ed(),contract:ex([ed(),eb()]),reason:ed(),cache_hit:e_(),schema:ed(),capabilities:ex([to,eb()])}),tl=ey({parent:ep(),connection:ep(),state:ed(),service_list:ed(),kind:ed(),baseline:ex([eh(ep()),eb()])}),td=ey({state:ed(),reason:eO(ed()),task_id:eO(ex([ep(),eb()])),instance:eO(ep()),cwmp_id:eO(ed())}),tc=ex([e$("waiting"),e$("inventory"),e$("classifying"),e$("adding_parent"),e$("child_names"),e$("adding_child"),e$("delete_guard"),e$("deleting"),e$("verify_delete"),e$("empty_parent"),e$("deleting_parent"),e$("verify_parent_delete"),e$("next"),e$("done")]),tp=ey({owned:eh(ep()),pending:ex([ed(),eb()]),pending_instance:ex([ep(),eb()])}),tu=ex([e$("waiting"),e$("inventory"),e$("adding"),e$("verify_add"),e$("deleting"),e$("verify_delete"),e$("reading_disable"),e$("disabling"),e$("verifying_disable"),e$("next"),e$("done")]),t_=ex([e$("disable"),e$("preserve"),e$("delete")]),tf=ey({parent:ep(),child:ep(),service:ed(),vlan:ed()}),tb=ey({state:e5,items:eh(ti),omci_adapter:eO(ed()),bootstrap_adapter:eO(ed()),provisioning_adapter:eO(ed()),backend:eO(eU),operation_id:eO(ep()),device:eO(ed()),optical_sn:eO(ed()),cwmp_id:eO(ed()),revision:eO(ed()),mode:eO(ta),started_at:eO(ep()),completed_at:eO(ex([ep(),eb()])),current_revision:eO(e_()),management_fresh:eO(e_()),reason:eO(ed()),error:eO(ed()),attempts:eO(ep()),next_retry_at:eO(ep()),reconcile_reason:eO(ed()),cwmp_contract:eO(ts),wan_objects:eO(eC(ed(),tl)),wan_lifecycle:eO(eC(ed(),td)),wan_stage:eO(tc),wifi_objects:eO(tp),wifi_lifecycle:eO(eC(ed(),td)),wifi_stage:eO(tu),wifi_cleanup:eO(t_),native_ownership:eO(eC(ed(),tf)),write_performed:eO(e_()),readback_verified:eO(e_())}),tg=ex([e$("disabled"),e$("not_configured"),e$("stale_revision"),e$("stale_management"),e$("verified"),e$("attention_required"),e$("accepted_unverified"),e$("pending"),e$("recovering"),e$("waiting_management")]),tm=ey({device:ed(),name:ex([ed(),eb()]),group:ex([ed(),eb()]),group_name:ex([ed(),eb()]),template:ex([ed(),eb()]),template_name:ex([ed(),eb()]),optical_sn:ed(),omci_adapter:ed(),bootstrap_adapter:ed(),provisioning_adapter:ed(),omci_management:e7,management:ex([te,eb()]),mqtt:ex([tt,eb()]),acs_bootstrap:eA,provisioning:tb,services:eh(ti),ssids:eh(ti),wifi_sync:tg}),th=ex([e$("discovering"),e$("comparing"),e$("planning"),e$("applying"),e$("verifying"),e$("configuring_listener"),e$("cleaning_previous"),e$("waiting_devices"),e$("ready"),e$("awaiting_apply"),e$("verified"),e$("blocked"),e$("retry_wait")]),tv=ey({enabled:e_(),mode:e6,vlan:eh(ep()),priority:ep(),address:ed(),acs_url:ed(),port:ep(),path:ed(),dhcp_enabled:e_()}),ty=ey({operation:ed(),key:ed(),value:eh(ed())}),tw=ey({state:th,error:ex([ed(),eb()]),inflight:e_(),ready:e_(),desired_version:ex([ed(),eb()]),applied_version:ex([ed(),eb()]),next_retry_at:ep(),attempts:ep(),desired:ex([tv,eb()]),applied:ex([tv,eb()]),previous:ex([tv,eb()]),plan:eh(ty)}),tx=ey({desired:ex([eR,eb()]),state:ed()}),tk=ey({id:ed(),name:ex([ed(),eb()]),template:ed()}),tj=ey({enabled:e_(),mode:e6,method:e8,revision:ed(),triggers:eh(ed()),interval_minutes:ep(),error:ex([ed(),eb()]),devices:eh(tm),management_network:tw,omci_management:tx,groups:eh(tk),pending_devices:eh(ed()),onu_pins:eO(eC(ed(),ep())),config_error:eO(ex([ed(),eb()])),config_load:eO(e4)});ex([tj,eX]);let tz=ey({enabled:ex([e_(),eb()]),routed_enabled:ex([e_(),eb()]),bridge_enabled:ex([e_(),eb()]),engine_attached:ex([e_(),eb()]),forwarding_verified:ex([e_(),eb()])}),tC=ey({entity_id:ep(),port_id:ex([ep(),eb()])}),tS=ey({entity_id:ep(),filter_list_hex:ex([ed(),eb()]),forward_operation:ex([ep(),eb()]),number_of_entries:ex([ep(),eb()])}),t$=ey({entity_id:ep(),received_frame_rules_hex:ex([eh(ed()),eb()]),error:ex([ed(),eb()])}),tP=ey({age_seconds:ep(),gem_ports:eh(tC),vlan_filters:eh(tS),vlan_operations:eh(t$)}),tO=ey({source:ed(),unit:ed(),reason:ex([ed(),eb()]),raw:ex([ed(),eb()]),age_seconds:ex([ep(),eb()])}),tE=ey({interface:ed(),gem_ports:ex([eh(ep()),eb()]),vlan_id:ex([ep(),eb()]),onu_inventory:ex([tP,eb()]),tx_bytes:ex([ep(),eb()]),rx_bytes:ex([ep(),eb()]),current_tx_kbps:ex([ep(),eb()]),current_rx_kbps:ex([ep(),eb()]),olt_channel_gem:eO(ep()),forwarding_verified:eO(e_()),offload:tz,measurements:eC(ed(),tO)});ey({});let tM=ey({entity_id:ep(),interval_end_time:ep(),corrected_bytes:ep(),corrected_code_words:ep(),uncorrectable_code_words:ep(),total_code_words:ep(),fec_seconds:ep()}),tN=ey({ani_entity_id:ex([ep(),eb()]),control_supported:e_(),downstream_enabled:ex([e_(),eb()]),upstream_enabled:ex([e_(),eb()]),downstream_pm:ex([tM,eb()]),measurement:tO}),tR=ey({key:ed(),label:ed(),group:ed(),address:ed(),width_bits:ep(),scope:ed()}),tI=ey({slot:ep(),registration_continuity_verified:e_(),lob_modulo_65536:ex([ep(),eb()]),bip_modulo_65536:ex([ep(),eb()])});ey({elapsed_ms:ep(),same_daemon:e_(),hardware_continuity_verified:e_(),onus:eh(tI),counters_modulo_4294967296:ex([eC(ed(),ep()),eb()])});let tL=ey({bandwidth_raw:ep(),control_raw:ep(),enabled_bit28:e_(),bandwidth:ep(),weight:ep()}),tA=ey({slot:ep(),generation:ex([ed(),eb()]),lob:ep(),bip:ep(),management:tL,business:tL}),tT=ey({schema_version:e$(2),source_sha256:ed(),limitations:ed(),started_unix_ms:ep(),read_duration_us:ep(),started_monotonic_ms:ex([ep(),eb()]),daemon_instance:ex([ed(),eb()]),hardware_epoch:ex([ed(),eb()]),main_bandwidth_raw:ep(),main_bandwidth_enabled:e_(),onus:eh(tA),counters:eC(ed(),ep()),counter_descriptors:eh(tR),raw_registers:eC(ed(),ep())}),tD=ex([ey({status:e$("success"),snapshot:tT}),ey({status:e$("error"),error:ed()})]);ey({onu_id:eO(ep())});let tU=ey({entry:ex([e$(0),e$(1),e$(2)]),username:ed(),active:e_()}),tF=ey({mqtt_mac:ed(),optical_sn:ex([ed(),eb()]),onu_id:ex([ep(),eb()]),binding_generation:ed(),last_seen:ep(),reason:ed()}),tq=ex([e$("executed"),e$("dispatched"),e$("timeout"),e$("error")]),tB=ey({target:ed(),status:tq,request_id:eO(ed()),exit_code:eO(ep()),output:eO(ed()),output_truncated:e_(),error:eO(ed())}),tZ=ey({target:tF,result:tB,binding_current:e_()}),tV=ex([e$("not_applicable"),e$("accepted_and_saved"),e$("unconfirmed")]),tW=ey({code:ed(),message:ed()});ex([ey({schema_version:e$(1),operation:tZ,accounts:ex([eh(tU),eb()]),write_status:tV}),ey({schema_version:ep(),error:tW})]);let tG=ey({optical_sn:ed(),onu_id:ep(),binding_generation:ed()}),tJ=ey({mqtt_mac:ed(),binding_generation:ed()}),tK=ex([tG,tJ]);ey({target:tK});let tX=ex([ey({kind:e$("exec"),script:ed(),timeout_seconds:ep()}),ey({kind:e$("accounts_read")}),ey({kind:e$("account_set_password"),entry:ep(),password:ed()}),ey({kind:e$("account_set_active"),entry:ep(),active:e_()})]),tH=ey({schema_version:ep(),target:tG,action:tX}),tQ=ey({optical_sn:ed(),onu_id:ep(),model:ed(),optical_online:e_(),can_execute:e_(),mqtt:ex([tF,eb()]),report_revision:ex([ep(),eb()])});ex([ey({schema_version:e$(1),operation:tZ}),ey({schema_version:ep(),error:tW})]),ey({target:tK,script:ed(),timeout_seconds:ep()});let tY=ex([ey({schema_version:e$(1),devices:eh(tQ),sources:eh(tF)}),ey({schema_version:ep(),error:tW})]);ex([ey({method:e$("list")}),ey({method:e$("report"),target:tG}),ey({method:e$("source_report"),target:tJ}),ey({method:e$("run"),request:tH})]);let t0=ex([e$("received"),e$("report_unavailable")]),t1=ey({value:new eg({type:"unknown"}),member:ed(),unit:ex([ed(),eb()])}),t2=ey({name:ed(),bytes:ep(),encoding:ed(),text:ex([ed(),eb()]),text_omitted:e_()}),t5=ey({schema_version:ep(),compressed_bytes:ep(),decompressed_bytes:ep(),fields:eC(ed(),t1),members:eh(t2),errors:eh(ed())}),t3=ey({revision:ep(),last_received:ep(),last_processed_receipt:ex([ep(),eb()]),last_good:ex([ep(),eb()]),error:ex([ed(),eb()]),report:ex([t5,eb()])});ex([ey({schema_version:e$(1),target:tF,report:ex([t3,eb()]),state:t0}),ey({schema_version:e$(1),target:tF,report:ex([t3,eb()]),read_only:e$(!0)}),ey({schema_version:ep(),error:tW})]),ey({target:tK}),ey({target:tK,kind:eE,entry:ep(),password:ed(),active:e_()});let t4=ey({accepted:ep(),rejected:ep(),read_errors:ep(),handled:ep(),max_intake_us:ep(),max_handler_us:ep()}),t6=e$("pending"),t8=ey({phase:ex([e$("starting"),e$("upload"),e$("tables")]),received:ep(),expected:ex([ep(),eb()])}),t7=e$("ready"),t9=ex([ey({status:t6,progress:eO(t8)}),ey({status:t7,chunk:ep(),chunks:ep(),bytes:ep(),data:ed()})]);ex([t9,eX]);let re=ey({status:t6,job:ed()}),rt=ey({released:e_()});ey({job:ed()}),ey({job:ed(),chunk:ep()}),ex([re,eX]);let rr=ey({accepting:e_(),running:ep(),stored:ep(),bytes:ep(),running_limit:ep(),stored_limit:ep(),bytes_limit:ep(),result_bytes_limit:ep()}),rn=ey({mac:ed(),ip:ed(),band:ed(),rssi_dbm:ex([ep(),eb()]),rx_rate_mbps:ex([ep(),eb()]),tx_rate_mbps:ex([ep(),eb()])}),ri=ex([e$("unknown"),e$("octets"),e$("string"),e$("unsigned_integer"),e$("table"),e$("signed_integer"),e$("pointer"),e$("bit_field"),e$("enumeration"),e$("counter")]),ra=ey({id:ed(),url:ed()}),ro=ey({name:ed(),kind:ri,index:ep(),mask:ep(),size:ep(),read:e_(),write:e_(),set_by_create:e_(),avc:e_(),optional:e_(),deprecated:e_(),default_hex:ex([ed(),eb()]),reference:ra}),rs=ex([ey({type:e$("unsigned"),value:ep()}),ey({type:e$("signed"),value:ep()}),ey({type:e$("decimal"),value:ed()}),ey({type:e$("text"),value:ex([ed(),eb()])}),ey({type:e$("octets"),hex:ed()}),ey({type:e$("table_length"),bytes:ep()})]),rl=ey({raw_hex:ed(),value:rs,sequences:eh(ep())}),rd=ey({definition:ro,value:ex([rs,eb()]),observations:eh(rl)}),rc=ex([e$("layout"),e$("name_only"),e$("unknown")]),rp=ey({class_id:ep(),name:ex([ed(),eb()]),entities:ep(),records:ep(),support:rc}),ru=ey({code:ed(),message:ed(),offset:ep(),mask:ep()}),r_=ey({class_id:ep(),entity_id:ep(),name:ex([ed(),eb()]),support:rc,reference:ex([ra,eb()]),sequences:eh(ep()),attributes:eh(rd),diagnostics:eh(ru)}),rf=e$("ready"),rb=ey({class_id:ep(),entity_id:ep(),sequence:ep(),attribute_mask:ep(),raw_hex:ed(),consumed:ep(),remaining_hex:ed(),undecoded_mask:ep()}),rg=ey({raw_hex:ed(),filter_outer_priority:ep(),filter_outer_vid:ep(),filter_outer_tpid_dei:ep(),filter_inner_priority:ep(),filter_inner_vid:ep(),filter_inner_tpid_dei:ep(),filter_ethertype:ep(),tags_to_remove:ep(),treatment_outer_priority:ep(),treatment_outer_vid:ep(),treatment_outer_tpid_dei:ep(),treatment_inner_priority:ep(),treatment_inner_vid:ep(),treatment_inner_tpid_dei:ep(),delete_entry:e_()}),rm=ey({class_id:ep(),entity_id:ep(),attribute:ro,collected:e_(),error:ex([ed(),eb()]),raw_hex:ed(),rows:eh(ed()),vlan_rules:eh(rg)}),rh=ey({schema_version:e$(1),reference_version:ed(),onu_id:ex([ep(),eb()]),uploaded_complete:e_(),expected_records:ep(),received_records:ep(),decoded_records:ep(),partial_records:ep(),basic_records:ep(),tables_requested:e_(),tables_collected:e_(),classes:eh(rp),entities:eh(r_),records:eh(rb),tables:eh(rm),diagnostics:eh(ru)}),rv=ey({status:rf,report:rh});ey({onu_id:ep(),optical_sn:ed(),tables:e_()});let ry=ex([ey({status:e$("success"),enabled:e_()}),ey({status:e$("error"),error:ed()})]);ey({enabled:e_(),bridge:ed(),wan_upstream:e_(),wan_downstream:e_(),onu_bridge:e_()});let rw=ey({index:ed(),state:ed(),pkt_type:ed(),orig_tuple:ed(),new_tuple:ed(),eth:ed(),vlan:ed(),packets:ep(),bytes:ep(),counters_valid:e_(),packets_exact:ed(),bytes_exact:ed()}),rx=ey({sampled_at_ms:ep(),errors:eh(ed()),config_valid:e_(),engine_valid:e_(),mask_valid:e_(),routed_mask_valid:e_(),debug_valid:e_(),flows_valid:e_(),entries_valid:e_(),counters_valid:e_(),hooks_valid:e_(),total_packets_exact:ed(),total_bytes_exact:ed(),supported:e_(),engine_attached:e_(),bridge_offload_enabled:e_(),wan_upstream:e_(),wan_downstream:e_(),onu_bridge:e_(),bridge_offload_mask:ep(),routed_offload_mask:ep(),bridge_offload_debug:e_(),bridge:ed(),active_ports:eh(ed()),fw4_hooks_ready:e_(),total_entries:ep(),bound_entries:ep(),bound_ipv4_entries:ep(),bound_ipv6_entries:ep(),total_packets:ep(),total_bytes:ep(),bound_flows:eh(rw)}),rk=ey({equipment_id:ex([ed(),eb()]),hardware_version:ex([ed(),eb()]),software_images:eh(ed()),omcc_version:ex([ep(),eb()]),errors:eh(ed())}),rj=ey({desired:eC(ed(),ep()),active:eC(ed(),ep()),pending_restart:e_(),allocation_blocked:e_(),startup_error:ex([ed(),eb()]),config_error:ex([ed(),eb()])}),rz=ex([e$("optical_on"),e$("optical_off"),e$("optical_status"),e$("optical_reload"),e$("optical_reinitialize"),e$("optical_shutdown")]),rC=ey({enabled:e_(),downstream_tx_enabled:e_(),fec_enabled:e_()}),rS=ey({desired_tx_enabled:e_(),desired_fec_enabled:e_(),register:ex([ep(),eb()]),tx_enabled:ex([e_(),eb()]),fec_enabled:ex([e_(),eb()]),error:ex([ed(),eb()])}),r$=ex([e$("success"),e$("error")]),rP=ex([e$("enabled"),e$("disabled"),e$("unknown")]),rO=ey({settings:eO(rC),pon_mac:eO(rS),schema_version:e$(1),status:r$,action:rz,desired_enabled:ex([e_(),eb()]),tx_enabled:ex([e_(),eb()]),actor_state:rP,hardware_ready:e_(),discovery_active:e_(),cleanup_pending:e_(),error:ex([tW,eb()])}),rE=ey({calibration_sha256:eO(ed()),calibration_applied:e_(),model:ed(),wavelength_tx_nm:ep(),wavelength_rx_nm:ep(),phy_rate_downlink_gbps:ep(),phy_rate_uplink_gbps:ep(),tx_power_dbm:ex([ep(),eb()]),laser_bias_current_ma:ex([ep(),eb()]),temperature_celsius:ex([ep(),eb()]),vcc_voltage:ex([ep(),eb()]),cdr_locked:ex([e_(),eb()]),tx_enabled:eO(e_()),measurements:eC(ed(),tO)}),rM=e$("ux3326"),rN=e$("selected"),rR=ey({onu_id:ep(),interface:ex([ed(),eb()])}),rI=ey({optical_control:e_(),transceiver_telemetry:e_(),fpga_diagnostics:e_(),bosa_diagnostics:e_(),calibration_profile:ex([rM,eb()]),npu_offload:e_(),omci_mib:e_(),downstream_fec:e_()}),rL=ey({schema_version:e$(1),selection:rN,platform_id:ed(),vendor:ed(),model:ed(),onus:eh(rR),operations:rI}),rA=ex([e$("o1_initial"),e$("o2_standby"),e$("o3_serial_number"),e$("o4_ranging"),e$("o5_operation"),e$("o6_intermittent_lods"),e$("o7_emergency_stop")]),rT=ey({restarting:e$(!0)}),rD=ey({calls:ep(),failures:ep(),last_us:ep(),max_us:ep(),total_us:ep()}),rU=ey({port:ep(),interface:ed(),carrier:e_(),status:ed(),onu_id:eO(ep()),onu_sn:eO(ed()),link_state:ed(),reserved_sn:eO(ed())}),rF=ey({channel_2g:ex([ep(),eb()]),channel_5g:ex([ep(),eb()]),bandwidth_5g:ex([ed(),eb()]),tx_power_pct:ex([ep(),eb()]),measurements:eC(ed(),tO)}),rq=ey({onu_id:ep(),vendor:ed(),model:ed(),serial_number:ed(),state:rA,business_status:eF,management:ex([te,eb()]),provisioning:ex([tb,eb()]),services:eh(ti),ssids:eh(ti),wifi_sync:tg,identity:ex([rk,eb()]),identity_age_seconds:ex([ep(),eb()]),identity_current:e_(),fiber_distance_m:ex([ep(),eb()]),ranging_delay_rtd_ns:ex([ep(),eb()]),equalization_delay_bits:ex([ep(),eb()]),optical_rx_power_dbm:ex([ep(),eb()]),optical_tx_power_dbm:ex([ep(),eb()]),firmware_version:ed(),hardware_version:ed(),uptime_seconds:ex([ep(),eb()]),fec:eO(tN),data_path:tE,wifi_mesh:rF,connected_clients:ex([eh(rn),eb()]),measurements:eC(ed(),tO)}),rB=ey({id:ed(),last_seen_sec_ago:ep(),last_payload_bytes:ep()}),rZ=ey({ubus:eO(eC(ed(),rD)),jobs:eO(rr),onu_pinning:eO(rj),fpga_status:ed(),pon_mac:eO(rS),provisioning:ex([tj,eb()]),optical_transceiver:rE,switch_ports:eh(rU),sub_gateways:eh(rq),telemetry_gateways:eh(rB),npu:eO(rx),ipc:eO(t4)}),rV=ex([e$("plan"),e$("apply"),e$("management_plan"),e$("management_apply"),e$("reset_state"),e$("reconcile"),e$("retry")]),rW=ex([ey({operation_ids:eh(ep()),revision:ed()}),ey({started:e$(!0),mode:ta}),ey({reset:e$(!0),device:ed()}),ey({operation_ids:eh(ep()),mode:ta,reconcile:eO(e_()),retry:eO(e_())}),eX]);ey({action:rV,target:ed(),management:eO(e_()),item:eO(ed())});let rG=ex([e$("none"),e$("effective"),e$("pending_add"),e$("pending_change"),e$("pending_remove")]),rJ=ey({active_onu_id:ex([ep(),eb()]),desired_onu_id:ex([ep(),eb()]),state:rG,pending_restart:e_()}),rK=ex([e$("pon_logical"),e$("associated_with"),e$("learned_behind")]),rX=ey({id:ed(),mac:ed(),hostname:ex([ed(),eb()]),addresses:eh(ed()),relation:rK,source:ed(),interface:ex([ed(),eb()])}),rH=ex([e$("ok"),e$("partial"),e$("unavailable")]),rQ=ey({id:ed(),state:rH,sampled_at:ep(),reason:ex([ed(),eb()])}),rY=ex([e$("snapshot_expired"),e$("node_not_found"),e$("invalid_cursor")]),r0=ex([ey({status:e$("ok"),snapshot_id:ed(),parent_node_id:ed(),clients:eh(rX),associated_client_count:ex([ep(),eb()]),learned_host_count:ex([ep(),eb()]),complete:e_(),next_cursor:ex([ed(),eb()]),sources:eh(rQ)}),ey({status:e$("error"),code:rY})]);ey({node_id:ed(),snapshot_id:eO(ed()),cursor:eO(ed()),limit:eO(ep())});let r1=ey({model:ed(),wavelength_tx_nm:ep(),wavelength_rx_nm:ep(),nominal_downlink_gbps:ep(),nominal_uplink_gbps:ep(),tx_power_dbm:ex([ep(),eb()]),laser_bias_current_ma:ex([ep(),eb()]),temperature_celsius:ex([ep(),eb()]),vcc_voltage:ex([ep(),eb()]),tx_enabled:ex([e_(),eb()]),measurements:eC(ed(),tO)}),r2=ey({name:ed(),mac:ex([ed(),eb()]),carrier:ex([e_(),eb()]),speed_mbps:ex([ep(),eb()]),duplex:ex([ed(),eb()]),bridge_members:eh(ed()),addresses:eh(ed())}),r5=ey({interface:ed(),device:ex([ed(),eb()]),protocol:ex([ed(),eb()]),up:e_(),addresses:eh(ed())}),r3=ey({model:ex([ed(),eb()]),firmware_version:ex([ed(),eb()]),uptime_seconds:ex([ep(),eb()]),fpga_status:ed(),optical:r1,interfaces:eh(r2),uplinks:eh(r5)}),r4=ey({observer_node_id:ed(),rx_bytes:ex([ep(),eb()]),tx_bytes:ex([ep(),eb()]),current_rx_kbps:ex([ep(),eb()]),current_tx_kbps:ex([ep(),eb()]),onu_inventory:ex([tP,eb()]),offload:tz,measurements:eC(ed(),tO)}),r6=ey({report_revision:ep(),binding_generation:ed(),age_seconds:ep(),ip:ex([ed(),eb()]),bridge_ip:ex([ed(),eb()]),mac:ex([ed(),eb()]),connection_type_raw:ex([ed(),eb()]),uptime_seconds:ex([ep(),eb()]),cpu_usage_raw:ex([ep(),eb()]),memory_usage_raw:ex([ep(),eb()])}),r8=ey({hl202:ex([r6,eb()])}),r7=ey({code:ed(),node_id:ex([ed(),eb()])}),r9=ey({id:ed(),source:ed(),target:ed(),relation:rK,data_interface:ex([ed(),eb()]),carrier:ex([e_(),eb()]),onu_rx_power_dbm:ex([ep(),eb()]),onu_tx_power_dbm:ex([ep(),eb()]),equalization_delay_bits:ex([ep(),eb()]),data_path:ex([r4,eb()]),measurements:eC(ed(),tO)}),ne=ey({serial_number:ex([ed(),eb()]),onu_id:ex([ep(),eb()]),vendor:ex([ed(),eb()]),model:ex([ed(),eb()]),hardware_version:ex([ed(),eb()]),firmware_version:ex([ed(),eb()]),registration:ex([rA,eb()]),business:ex([eF,eb()]),management:ex([te,eb()]),provisioning:ex([tb,eb()]),services:eh(ti),ssids:eh(ti),wifi_sync:ex([tg,eb()]),identity:ex([rk,eb()]),identity_current:e_(),identity_age_seconds:ex([ep(),eb()]),uptime_seconds:ex([ep(),eb()]),fec:ex([tN,eb()]),binding:rJ,extensions:r8,measurements:eC(ed(),tO)}),nt=ex([ej(ey({kind:e$("controller")}),r3),ej(ey({kind:e$("onu")}),ne)]),nr=ey({id:ed(),label:ed(),detail:nt}),nn=ex([ey({status:e$("ok"),snapshot_id:ed(),node:nr}),ey({status:e$("error"),code:rY})]);ey({node_id:ed(),snapshot_id:eO(ed())});let ni=ey({schema_version:e$(1),snapshot_id:ed(),generated_at:ep(),snapshot_ttl_seconds:ep(),nodes:eh(nr),links:eh(r9),sources:eh(rQ),issues:eh(r7)}),na=eC(ed(),ey({carrier:eO(e_()),mac:eO(ed()),link:eO(ey({speed:eO(ep()),duplex:eO(ed()),autoneg:eO(e_())})),stats:eO(eC(ed(),ep()))})),no=e=>null==e||""===e?"—":String(e);function ns(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3;return null!=e&&Number.isFinite(e)?`${e.toFixed(t)} dBm`:"—"}function nl(e){if(void 0===e||!Number.isFinite(e)||e<0)return"—";if(e<1024)return`${e} B`;let t=["KiB","MiB","GiB","TiB"],r=e/1024,n=0;for(;r>=1024&&n<t.length-1;)r/=1024,n++;return`${r.toFixed(1)} ${t[n]}`}function nd(e){return void 0===e||!Number.isFinite(e)||e<0?"—":e<1e3?`${e} Pkts.`:`${(e/1e3).toFixed(2)} KPkts.`}function nc(e){let t="none"===e.tone?"":`fttr-badge fttr-badge-${e.tone}`,r=e.class?` ${e.class}`:"",n=c("span",{class:`${t}${r}`.trim(),children:e.children});return e.title&&n.setAttribute("title",e.title),n}function np(e,t,r,n){e.textContent=r,"none"===t?e.className="":e.className=`fttr-badge fttr-badge-${t}`,n?e.setAttribute("title",n):e.removeAttribute("title")}let nu={o1_initial:_("O1 Initial"),o2_standby:_("O2 Standby"),o3_serial_number:_("O3 Serial Number"),o4_ranging:_("O4 Ranging"),o5_operation:_("O5 (Operation)"),o6_intermittent_lods:_("O6 Intermittent LODS"),o7_emergency_stop:_("O7 Emergency Stop")};function n_(e){return e?"o5_operation"===e?{tone:"success",label:nu.o5_operation,title:e}:{tone:"warning",label:nu[e]??no(e),title:e}:{tone:"none",label:"—"}}function nf(e){let t=n_(e.state);return c(nc,{tone:t.tone,title:t.title,children:t.label})}function nb(e){return e?{tone:"verified"===e.phase?"success":e.error||"wan_bootstrap_pending"===e.phase?"warning":"neutral",label:`${({not_started:_("Not started"),collecting_identity:_("Collecting identity"),retrying_identity:_("Retrying identity"),unsupported:_("Unsupported"),configuring:_("Configuring"),verifying:_("Verifying"),wan_bootstrap_pending:_("WAN pending"),verified:_("Verified"),retrying:_("Retrying"),offline:_("Offline")})[e.phase]} \xb7 ${e.generation}${e.error?` \xb7 ${e.error}`:""}`,title:e.error||void 0}:{tone:"neutral",label:"—"}}function ng(e){let t=nb(e.status);return c(nc,{tone:t.tone,title:t.title,children:t.label})}let nm={disabled:_("Disabled"),online:_("Online"),waiting_inform:_("Waiting Inform"),offline_or_stale:_("Offline or stale")};function nh(e){let t=e?.state,r=function(e){if(null==e||!Number.isFinite(e)||e<0)return null;let t=Math.floor(e);if(t<60)return(1===t?_("%d second ago"):_("%d seconds ago")).format(t);let r=Math.floor(t/60);if(r<60)return(1===r?_("%d minute ago"):_("%d minutes ago")).format(r);let n=Math.floor(t/3600);if(n<24)return(1===n?_("%d hour ago"):_("%d hours ago")).format(n);let i=Math.floor(t/86400);return(1===i?_("%d day ago"):_("%d days ago")).format(i)}(e?.age_seconds??(e?.last_inform?Math.max(0,Math.floor(Date.now()/1e3)-e.last_inform):null)),n=e?.last_inform?new Date(1e3*e.last_inform).toLocaleString():null,i="disabled"!==t&&n?_("Last Inform: %s").format(n):void 0,a="—",o="none";return"disabled"===t?(o="neutral",a=nm.disabled):"online"===t?(o="success",a=nm.online):"waiting_inform"===t?(o="warning",a=nm.waiting_inform):"offline_or_stale"===t?(o="danger",a=nm.offline_or_stale):t&&(o="neutral",a=no(t)),{tone:o,label:r&&t&&"disabled"!==t?`${a} \xb7 ${r}`:a,title:i}}function nv(e){let t=nh(e.management);return c(nc,{tone:t.tone,title:t.title,children:t.label})}let ny={disabled:_("Disabled"),waiting:_("Waiting"),wan_reconciling:_("WAN reconciling"),wan_verifying:_("WAN verifying"),wifi_reconciling:_("Wi-Fi reconciling"),discovering:_("Discovering"),reading:_("Reading"),disabling:_("Disabling"),disabling_read:_("Disabling read"),writing:_("Writing"),verifying:_("Verifying"),settling:_("Settling"),completed:_("Completed"),interrupted:_("Interrupted"),recovering:_("Recovering"),waiting_management:_("Waiting management"),waiting_task:_("Waiting task"),reset_pending:_("Reset pending"),failed:_("Failed"),error:_("Error"),blocked:_("Blocked"),not_started:_("Not started")};function nw(e,t){let r=e?.state,n=e?.next_retry_at&&e.next_retry_at>Math.floor(Date.now()/1e3)?e.next_retry_at-Math.floor(Date.now()/1e3):0,i=t??(e?.current_revision===!1?_("Previous configuration"):e?.management_fresh===!1?_("Management stale"):e?.reconcile_reason?e.reconcile_reason:n>0?_("Next self-healing retry in %d seconds").format(n):e?.reason??e?.error);return r&&"not_started"!==r?"disabled"===r?{tone:"neutral",label:ny.disabled}:"completed"===r||"verified"===r?{tone:"success",label:"completed"===r?ny.completed:_("Ready"),title:i}:"wan_reconciling"===r||"wan_verifying"===r||"wifi_reconciling"===r||"discovering"===r||"reading"===r||"disabling"===r||"disabling_read"===r||"writing"===r||"verifying"===r||"settling"===r||"recovering"===r||"waiting_task"===r?{tone:"info",label:ny[r]??no(r),title:i}:"interrupted"===r||"failed"===r||"error"===r||"blocked"===r?{tone:"danger",label:"blocked"===r?ny.blocked:ny.interrupted,title:i}:"waiting"===r||"pending"===r||"waiting_management"===r||"reset_pending"===r?{tone:"warning",label:ny[r]??ny.waiting,title:i}:{tone:"neutral",label:no(r),title:i}:{tone:"neutral",label:ny.not_started,title:i}}function nx(e){let t=nw(e.provisioning,e.title);return c(nc,{tone:t.tone,title:t.title,children:t.label})}let nk={disabled:_("Disabled"),not_configured:_("Not configured"),stale_revision:_("Stale revision"),stale_management:_("Stale management"),verified:_("Verified"),attention_required:_("Attention required"),accepted_unverified:_("Unverified"),pending:_("Pending"),recovering:_("Recovering"),waiting_management:_("Waiting management")};function nj(e){return e&&"not_configured"!==e?"disabled"===e?{tone:"neutral",label:nk.disabled}:"verified"===e?{tone:"success",label:nk.verified}:"attention_required"===e?{tone:"danger",label:nk.attention_required}:"stale_revision"===e||"stale_management"===e||"waiting_management"===e?{tone:"warning",label:nk[e]}:"recovering"===e?{tone:"info",label:nk.recovering}:"accepted_unverified"===e||"pending"===e?{tone:"warning",label:nk[e]}:{tone:"neutral",label:no(e)}:{tone:"neutral",label:nk.not_configured}}function nz(e){let t=nj(e.state);return c(nc,{tone:t.tone,title:t.title,children:t.label})}let nC=`
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
`,nS=ey({error:ex([ed(),ey({code:ed(),message:ed()})])});class n$ extends Error{code;constructor(e,t){super(t),this.code=e,this.name="RpcError"}}function nP(e){let t=nS.safeParse(e);if(t.success){let e=t.data.error;throw"string"==typeof e?new n$("rpc",e):new n$(e.code,e.message)}return e}let nO={parse(e){let t=rW.parse(nP(e));if("error"in t)throw Error(t.error);return t}},nE={parse(e){let t=tY.parse(nP(e));if("object"==typeof t&&null!==t&&"error"in t)throw nP(t),Error("Unexpected RPC error");return t}},nM={fpgaDiagnostic:{parse(e){let t=tD.parse(nP(e));if("success"!==t.status)throw Error(t.error);let r=t.snapshot,n=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Number.MAX_SAFE_INTEGER;if(!Number.isSafeInteger(e)||e<0||e>t)throw Error("Invalid FPGA unsigned value")};if(n(r.started_unix_ms),n(r.read_duration_us),null!==r.started_monotonic_ms&&n(r.started_monotonic_ms),n(r.main_bandwidth_raw,0xffffffff),!/^[a-f0-9]{64}$/.test(r.source_sha256))throw Error("Invalid FPGA source hash");let i=new Set;for(let e of r.onus){if(n(e.slot,15),i.has(e.slot))throw Error("Duplicate FPGA ONU slot");for(let t of(i.add(e.slot),n(e.lob,65535),n(e.bip,65535),[e.management,e.business]))n(t.bandwidth_raw,0xffffffff),n(t.control_raw,0xffffffff),n(t.bandwidth,1048575),n(t.weight,127)}for(let e of[...Object.values(r.counters),...Object.values(r.raw_registers)])n(e,0xffffffff);let a=new Set;for(let e of r.counter_descriptors){if(32!==e.width_bits||"global"!==e.scope||a.has(e.key)||!Object.keys(r.counters).includes(e.key)||!/^0x[0-9a-f]{8}$/.test(e.address)||r.raw_registers[e.address]!==r.counters[e.key])throw Error("Invalid FPGA counter metadata");a.add(e.key)}if(a.size!==Object.keys(r.counters).length)throw Error("Incomplete FPGA counter metadata");return t}},getCapabilities:{parse:e=>e1.parse(nP(e))},getPlatformInfo:{parse:e=>rL.parse(nP(e))},opticalStatus:rO,opticalSet:rO,getStatus:{parse:e=>rZ.parse(nP(e))},getTopology:{parse:e=>ni.parse(nP(e))},getTopologyNode:{parse:e=>nn.parse(nP(e))},getTopologyClients:{parse:e=>r0.parse(nP(e))},getSync:{parse:e=>tj.parse(nP(e))},configCheck:{parse(e){if("object"==typeof e&&null!==e&&"error"in e&&("valid"in e||"revision"in e||"devices"in e))throw Error("Mixed configuration check result");return e2.parse(e)}},npuStatus:rx,configReload:{parse:e=>tj.parse(nP(e))},restartService:{parse:e=>rT.parse(nP(e))},sync:{parse:e=>nO.parse(nP(e))},npuSet:ry,mibStart:{parse:e=>re.parse(nP(e))},mibResult:{parse:e=>t9.parse(nP(e))},jobRelease:{parse:e=>rt.parse(nP(e))},hl202List:{parse:e=>nE.parse(nP(e))},hl202Report:{parse:e=>re.parse(nP(e))},hl202AccountsStart:{parse:e=>re.parse(nP(e))},hl202AccountUpdate:{parse:e=>re.parse(nP(e))},hl202ExecStart:{parse:e=>re.parse(nP(e))},jobResult:{parse:e=>t9.parse(nP(e))},getCalibration:{parse:e=>eK.parse(nP(e))},selectCalibration:{parse:e=>eK.parse(nP(e))},saveCalibration:{parse:e=>eH.parse(nP(e))},applyCalibration:{parse:e=>re.parse(nP(e))}};function nN(){var e;let t,r,i,a,o,s,l,d,c,p,u,f,b,g,m,h,v,y,w,x,k,j,z,C,S,$,P,O,M;return n??=(e=L.rpc,t=e.declare({object:"fttr",method:"get_capabilities",reject:!0}),r=e.declare({object:"fttr",method:"get_platform_info",reject:!0}),i=e.declare({object:"fttr",method:"fpga_diagnostic",params:["onu_id"],reject:!0}),a=e.declare({object:"fttr",method:"optical_status",reject:!0}),o=e.declare({object:"fttr",method:"optical_set",params:["enabled","downstream_tx_enabled","fec_enabled"],reject:!0}),s=e.declare({object:"fttr",method:"get_status",reject:!0}),l=e.declare({object:"fttr",method:"get_topology",reject:!0}),d=e.declare({object:"fttr",method:"get_topology_node",params:["node_id","snapshot_id"],reject:!0}),c=e.declare({object:"fttr",method:"get_topology_clients",params:["node_id","snapshot_id","cursor","limit"],reject:!0}),p=e.declare({object:"fttr",method:"get_sync",reject:!0}),u=e.declare({object:"fttr",method:"config_check",reject:!0}),f=e.declare({object:"fttr",method:"npu_status",reject:!0}),b=e.declare({object:"fttr",method:"config_reload",reject:!0}),g=e.declare({object:"fttr",method:"restart_service",reject:!0}),m=e.declare({object:"fttr",method:"sync",params:["action","target","management","item"],reject:!0}),h=e.declare({object:"fttr",method:"npu_set",params:["enabled","bridge","wan_upstream","wan_downstream","onu_bridge"],reject:!0}),v=e.declare({object:"fttr",method:"mib_start",params:["onu_id","optical_sn","tables"],reject:!0}),y=e.declare({object:"fttr",method:"mib_result",params:["job","chunk"],reject:!0}),w=e.declare({object:"fttr",method:"job_release",params:["job"],reject:!0}),x=e.declare({object:"fttr",method:"hl202_list",reject:!0}),k=e.declare({object:"fttr",method:"hl202_report",params:["target"],reject:!0}),j=e.declare({object:"fttr",method:"hl202_accounts_start",params:["target"],reject:!0}),z=e.declare({object:"fttr",method:"hl202_account_update",params:["target","kind","entry","password","active"],reject:!0}),C=e.declare({object:"fttr",method:"hl202_exec_start",params:["target","script","timeout_seconds"],reject:!0}),S=e.declare({object:"fttr",method:"job_result",params:["job","chunk"],reject:!0}),$=e.declare({object:"fttr",method:"get_calibration",reject:!0}),P=e.declare({object:"fttr",method:"select_calibration",params:["source"],reject:!0}),O=e.declare({object:"fttr",method:"save_calibration",params:["data"],reject:!0}),M=e.declare({object:"fttr",method:"apply_calibration",reject:!0}),{getCapabilities:async()=>nM.getCapabilities.parse(await t()),getPlatformInfo:async()=>nM.getPlatformInfo.parse(await r()),fpgaDiagnostic:async e=>nM.fpgaDiagnostic.parse(await i(e.onu_id)),opticalStatus:async()=>nM.opticalStatus.parse(await a()),opticalSet:async e=>nM.opticalSet.parse(await o(e.enabled,e.downstream_tx_enabled,e.fec_enabled)),getStatus:async()=>nM.getStatus.parse(await s()),getTopology:async()=>nM.getTopology.parse(await l()),getTopologyNode:async e=>nM.getTopologyNode.parse(await d(e.node_id,e.snapshot_id)),getTopologyClients:async e=>nM.getTopologyClients.parse(await c(e.node_id,e.snapshot_id,e.cursor,e.limit)),getSync:async()=>nM.getSync.parse(await p()),configCheck:async()=>nM.configCheck.parse(await u()),npuStatus:async()=>nM.npuStatus.parse(await f()),configReload:async()=>nM.configReload.parse(await b()),restartService:async()=>nM.restartService.parse(await g()),sync:async e=>nM.sync.parse(await m(e.action,e.target,e.management,e.item)),npuSet:async e=>nM.npuSet.parse(await h(e.enabled,e.bridge,e.wan_upstream,e.wan_downstream,e.onu_bridge)),mibStart:async e=>nM.mibStart.parse(await v(e.onu_id,e.optical_sn,e.tables)),mibResult:async e=>nM.mibResult.parse(await y(e.job,e.chunk)),jobRelease:async e=>nM.jobRelease.parse(await w(e.job)),hl202List:async()=>nM.hl202List.parse(await x()),hl202Report:async e=>nM.hl202Report.parse(await k(e.target)),hl202AccountsStart:async e=>nM.hl202AccountsStart.parse(await j(e.target)),hl202AccountUpdate:async e=>nM.hl202AccountUpdate.parse(await z(e.target,e.kind,e.entry,e.password,e.active)),hl202ExecStart:async e=>nM.hl202ExecStart.parse(await C(e.target,e.script,e.timeout_seconds)),jobResult:async e=>nM.jobResult.parse(await S(e.job,e.chunk)),getCalibration:async()=>nM.getCalibration.parse(await $()),selectCalibration:async e=>nM.selectCalibration.parse(await P(e.source)),saveCalibration:async e=>nM.saveCalibration.parse(await O(e.data)),applyCalibration:async()=>nM.applyCalibration.parse(await M())})}let nR=async()=>nN().getStatus(),nI=async()=>nN().getPlatformInfo(),nL=async()=>nN().configReload(),nA=async()=>(i??=L.rpc.declare({object:"luci-rpc",method:"getNetworkDevices",expect:{"":{}},reject:!0}),na.parse(nP(await i()))),nT=async()=>nN().opticalStatus(),nD=async e=>nN().opticalSet(e),nU=async(e,t,r)=>nN().mibStart({onu_id:e,optical_sn:t,tables:r}),nF=async(e,t)=>nN().mibResult({job:e,chunk:t}),nq=async e=>nN().jobRelease({job:e}),nB=e=>JSON.stringify(e,null,2);async function nZ(e){let t=["{"],r=!0;for(let[n,i]of Object.entries(e))if(r||t.push(","),r=!1,t.push(JSON.stringify(n),":"),Array.isArray(i)){t.push("[");for(let e=0;e<i.length;e++){e&&t.push(",");let r=JSON.stringify(i[e]);if(void 0===r)throw Error(_("MIB snapshot cannot be serialized"));t.push(r),e%32==31&&await new Promise(e=>setTimeout(e,0))}t.push("]")}else{let e=JSON.stringify(i);if(void 0===e)throw Error(_("MIB snapshot cannot be serialized"));t.push(e)}return t.push("}"),new Blob(t,{type:"application/json"})}function nV(e){let t=e.reference;return t?.url.startsWith("https://github.com/opencord/omci-lib-go/blob/v2.2.4/")?c("a",{href:t.url,target:"_blank",rel:"noopener noreferrer",children:t.id}):c("span",{children:"—"})}function nW(e,t){return e.onus.find(e=>e.onu_id===t)}let nG=L.rpc.declare({object:"uci",method:"get",params:["config","type"],reject:!0}),nJ=L.rpc.declare({object:"uci",method:"changes",params:["config"],reject:!0}),nK=L.rpc.declare({object:"uci",method:"set",params:["config","section","values"],reject:!0}),nX=L.rpc.declare({object:"uci",method:"delete",params:["config","section","option"],reject:!0}),nH=L.rpc.declare({object:"uci",method:"commit",params:["config"],reject:!0}),nQ=!1;async function nY(e,t,r,n){if(!L.hasViewPermission()||!t||nQ)return;let i=e.serial_number.toUpperCase(),a=t.desired[i],o=void 0!==a,s=o?a:e.onu_id;if(null==s||!o&&!nW(r,s))return void L.ui.addNotification(null,c("p",{children:_("The selected platform does not expose this ONU-ID as an available interface.")}),"warning");let l=o?_("Unpin interface"):_("Pin interface");try{var d,p,u,f,b,g,m,h,v,y,w,x,k,j,z,C;let e,{values:t}=await nG("fttr","device"),S=e=>Object.entries(e).find(e=>{let[,t]=e;return"device"===t[".type"]&&t.optical_sn?.toUpperCase()===i}),$=S(t);if(!$)return void L.ui.showModal(l,(m={children:[(d={children:_("Add this device on the configuration page before fixing its interface.")},c("p",d)),(u={children:(p={children:i},c("code",p))},c("p",u)),(g={class:"right",children:[(f={type:"button",class:"cbi-button",onclick:()=>L.ui.hideModal(),children:_("Cancel")},c("button",f))," ",(b={class:"cbi-button cbi-button-action",href:L.url("admin","network","fttr","config"),children:_("Configuration")},c("a",b))]},c("div",g))]},c("div",m)));let P=(h={class:"error",role:"alert"},c("p",h)),O=(v={type:"button",class:"cbi-button",onclick:()=>L.ui.hideModal(),children:_("Cancel")},c("button",v)),M=(y={type:"button",class:"cbi-button cbi-button-action",onclick:async()=>{if(nQ)return;nQ=!0,M.disabled=O.disabled=!0,P.textContent="";let e=!1;try{var t;if((await nJ("fttr")).changes.length)throw Error(_("Apply or discard pending FTTR configuration changes first."));let r=(await nG("fttr","device")).values,i=S(r);if(!i||i[0]!==$[0]||i[1].onu_id!==$[1].onu_id||(null==i[1].onu_id?void 0:Number(i[1].onu_id))!==a)throw Error(_("Interface configuration changed. Refresh the page and try again."));if(!o&&Object.entries(r).some(e=>{let[t,r]=e;return t!==i[0]&&"device"===r[".type"]&&null!=r.onu_id&&Number(r.onu_id)===s}))throw Error(_("Interface already reserved by another device."));o?await nX("fttr",i[0],"onu_id"):await nK("fttr",i[0],{onu_id:String(s)}),await nH("fttr"),e=!0,await nL(),n(await nR()),L.ui.hideModal(),L.ui.addNotification(null,(t={children:_("Interface setting saved. Restart FTTR for it to take effect.")},c("p",t)),"info")}catch(t){P.textContent=`${e?_("Saved, but configuration reload or status refresh failed:"):_("Failed to save interface setting:")} ${String(t)}`}finally{nQ=!1,M.disabled=e,O.disabled=!1}},children:_("Confirm")},c("button",y));L.ui.showModal(l,(C={children:[(w={children:o?_("Cancel the fixed interface for this device?"):_("Fix this device to its current interface?")},c("p",w)),(k={children:[(x={children:i},c("code",x)),` \xb7 ${(e=nW(r,s),e?.interface?`${e.interface} \xb7 ONU-ID ${s}`:`ONU-ID ${s}`)}`]},c("p",k)),(j={children:_("This saves the configuration only. The current allocation stays unchanged until FTTR is restarted.")},c("p",j)),P,(z={class:"right",children:[O," ",M]},c("div",z))]},c("div",C)))}catch(e){L.ui.addNotification(null,c("p",{children:String(e)}),"error")}}let n0=L.view,n1=L.Poll;function n2(e,t,r){var n,i,a;let o,s=e,l=[],u=c("button",{type:"button",class:"cbi-button cbi-button-neutral",style:"padding:0 .4em;min-height:1.5em;font-size:85%;margin-left:.5em",onclick:()=>nY(s,o,t,r)}),f=c("span",{}),b=c("span",{}),g=c("span",{}),m=c("code",{style:"font-size:90%"}),h=c("span",{class:"fttr-badge"}),v=c("span",{class:"fttr-badge"}),y=c("span",{style:"font-size:90%"}),w=c("code",{style:"font-size:90%"}),x=c("span",{class:"fttr-badge"}),k=c("span",{class:"fttr-badge"}),j=c("span",{class:"fttr-badge"}),z=(a={"data-fttr-onu-id":String(e.onu_id),children:[c("td",{children:[f,u]}),c("td",{children:b}),c("td",{children:g}),c("td",{children:m}),c("td",{children:h}),c("td",{children:v}),c("td",{children:y}),c("td",{children:w}),c("td",{children:x}),c("td",{children:k}),c("td",{children:j}),(i={style:"text-align:right",children:(n={type:"button",class:"cbi-button cbi-button-neutral",onclick:()=>(function(e){var t,r,n,i,a,o,s,l,u,f,b,g;let m=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"basic",h=!1,v=!1,y=null,w=null,x=(t={class:"onu-basic-container",children:[{title:_("Device identification"),rows:[[_("Vendor"),e.vendor],[_("Model"),e.identity?.equipment_id??e.model],[_("Optical serial"),c("code",{style:"font-size:90%",children:e.serial_number})],[_("ONU ID"),e.onu_id],[_("Hardware version"),e.identity?.hardware_version??e.hardware_version],[_("Software images"),e.identity?.software_images?.join(", ")??e.firmware_version],[_("OMCC version"),e.identity?.omcc_version==null?null:c("code",{style:"font-size:90%",children:["0x",e.identity.omcc_version.toString(16)]})]]},{title:_("Optical & link status"),rows:[[_("Registration"),c(nf,{state:e.state})],[_("Business"),c(ng,{status:e.business_status})],[_("Receive optical power"),ns(e.optical_rx_power_dbm)],[_("Transmit optical power"),ns(e.optical_tx_power_dbm)],[_("Equalization delay (EQD)"),null==e.equalization_delay_bits?"—":c("code",{style:"font-size:90%",children:[e.equalization_delay_bits," bits"]})],[_("Data interface"),e.data_path?.interface?c("code",{style:"font-size:90%",children:e.data_path.interface}):null],[_("Uptime"),null==e.uptime_seconds?null:`${function(e){if(null==e||!Number.isFinite(e)||e<0)return"—";let t=Math.floor(e),r=Math.floor(t/86400),n=Math.floor(t%86400/3600),i=Math.floor(t%3600/60),a=[];return r>0&&a.push(`${r}d`),(n>0||r>0)&&a.push(`${n}h`),(i>0||n>0||r>0)&&a.push(`${i}m`),a.push(`${t%60}s`),a.join(" ")}(e.uptime_seconds)} (${Math.floor(e.uptime_seconds)} s)`]]},{title:_("Management & cache"),rows:[[_("CWMP"),c(nv,{management:e.management})],[_("Last Inform"),e.management?.state!=="disabled"&&e.management?.last_inform?`${new Date(1e3*e.management.last_inform).toLocaleString()}${null!=e.management.age_seconds?` (${e.management.age_seconds} s)`:""}`:null],[_("Provisioning"),c(nx,{provisioning:e.provisioning})],[_("Wi-Fi sync"),c(nz,{state:e.wifi_sync})],[_("Identity source"),e.identity?!1===e.identity_current?_("Cached identity"):!0===e.identity_current?_("Current registration"):_("Registration freshness unavailable"):_("Not collected")],[_("Identity age"),null==e.identity_age_seconds?null:`${e.identity_age_seconds} s`],[_("Identity read errors"),e.identity?.errors?.join("; ")]]}].map(e=>{var t,r,n;return n={class:"cbi-section onu-basic-section",children:[c("h3",{class:"onu-basic-title",children:e.title}),(r={class:"table onu-basic-table",children:(t={children:e.rows.map(e=>{var t;let[r,n]=e;return t={children:[c("th",{style:"width:35%",children:r}),c("td",{children:n instanceof Node?n:no(n)})]},c("tr",t)})},c("tbody",t))},c("table",r))]},c("div",n)})},c("div",t)),k=(r={class:"mib-status-bar",role:"status",children:c("span",{class:"mib-hint-text",children:_("Read MIB on demand. Results are a snapshot, not live polling.")})},c("div",r)),j=(n={class:"cbi-progressbar",style:"display:none;width:100%",title:"0%",children:c("div",{style:"width:0%"})},c("div",n)),z=c("div",{}),C=c("pre",{class:"onu-raw-pre"}),S=c("span",{class:"download-status",role:"status"}),$=null,P=c("button",{type:"button",class:"cbi-button cbi-button-action",disabled:!0,onclick:async()=>{if(y&&!h){P.disabled=!0,S.textContent=_("Preparing JSON download…");try{let t=await nZ(y);if(h)return;$&&URL.revokeObjectURL($),$=URL.createObjectURL(t);let r=document.createElement("a");r.href=$,r.download=`mib-${e.serial_number}.json`,r.click(),S.textContent=_("JSON download started"),window.setTimeout(()=>{URL.revokeObjectURL(r.href),$===r.href&&($=null)},1e3)}catch(e){S.textContent=String(e)}finally{P.disabled=!y||h}}},children:_("Download JSON")}),O=(a={class:"onu-raw-panel",children:[(i={class:"onu-raw-toolbar",children:[c("span",{class:"onu-raw-hint",children:_("This is a lightweight preview. Download JSON to save the complete MIB snapshot.")}),c("div",{class:"onu-raw-actions",children:[P,S]})]},c("div",i)),C]},c("div",a)),M=c("button",{type:"button",class:"cbi-button cbi-button-apply",onclick:()=>F(!1),children:_("Read MIB")}),N=c("button",{type:"button",class:"cbi-button cbi-button-action",onclick:()=>F(!0),children:_("Read MIB and VLAN tables")}),R=(l={class:"onu-mib-panel",children:[(s={class:"mib-controls",children:[(o={class:"mib-action-group",children:[M,N,c("small",{class:"mib-action-hint",children:_("Collecting VLAN tables queries extended filter tables and takes longer.")})]},c("div",o)),k,j]},c("div",s)),z]},c("div",l)),I={basic:x,mib:R,raw:O},A=new Map;function T(e){for(let[t,r]of Object.entries(I))t===e?r.style.removeProperty("display"):r.style.setProperty("display","none","important");for(let[t,r]of A)r.className=t===e?"cbi-tab":"cbi-tab-disabled"}let D=(g={children:[(u={class:"onu-details-header",children:function(e,t,r,n){var i;let a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"margin-top:14px;margin-bottom:0";return i={class:"cbi-tabmenu",style:a,children:e.map(e=>{var i;let a=(i={class:t===e.id?"cbi-tab":"cbi-tab-disabled","data-tab":e.id,children:c("a",{href:`#tab-${e.id}`,onclick:t=>{t.preventDefault(),r(e.id)},children:e.label})},c("li",i));return n.set(e.id,a),a})},c("ul",i)}([{id:"basic",label:_("Basic information")},{id:"mib",label:"OMCI / MIB"},{id:"raw",label:_("Raw JSON")}],m,T,A,"margin:0;padding-left:0;display:flex;flex-wrap:wrap")},c("div",u)),(f={class:"onu-details-dialog",children:[c("style",{children:`
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
				${nC}
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
				`}),x,R,O]},c("div",f)),(b={class:"right onu-details-footer",children:c("button",{type:"button",class:"cbi-button",onclick:()=>{h=!0,$&&URL.revokeObjectURL($),$=null,y=null,C.textContent="",z.replaceChildren(),L.ui.hideModal()},children:_("Close")})},c("div",b))]},c(d,g)),U=()=>!h&&D.isConnected&&D.getClientRects().length>0;async function F(t){if(!v){v=!0,M.disabled=N.disabled=!0,j.style.display="",j.title="0%",j.firstElementChild.style.width="0%",k.textContent=_("Reading MIB…");try{let v=await nR(),x=v.sub_gateways?.find(t=>t.serial_number===e.serial_number);if(x?.state!=="o5_operation")throw Error(_("Device is offline; reopen details after registration."));if(!U())return;let S=await nU(x.onu_id,x.serial_number,t);w=S.job;let $=Date.now()+14e4;for(;U();){if(p()){let e=Date.now();for(;p()&&U();)await new Promise(e=>setTimeout(e,1e3));if($+=Date.now()-e,!U())return}let e=await nF(S.job,0);if(!U())return;if("ready"===e.status){var r,n,i,a,o,s,l,d,u,f,b,g,m,h;if(!e.chunks||e.chunks>1024||!e.bytes||e.bytes>0x2000000||0!==e.chunk||!e.data)throw Error(_("Invalid MIB snapshot"));let t=new Uint8Array(e.bytes),p=0;for(let r=0;r<e.chunks;r++){let n=0===r?e:await nF(S.job,r);if(!U())return;if("ready"!==n.status||n.chunk!==r||n.chunks!==e.chunks||n.bytes!==e.bytes||!n.data)throw Error(_("Invalid MIB snapshot chunk"));let i=atob(n.data);if(i.length>32768||p+i.length>t.length)throw Error(_("Invalid MIB snapshot size"));for(let e=0;e<i.length;e++)t[p++]=i.charCodeAt(e);let a=Math.min(100,Math.round((r+1)/e.chunks*100));j.title=`${a}%`,j.firstElementChild.style.width=`${a}%`,k.textContent=`${_("Downloading MIB snapshot")}: ${r+1}/${e.chunks}`}if(p!==t.length)throw Error(_("Incomplete MIB snapshot"));if(await q(),y=rv.parse(nP(JSON.parse(new TextDecoder("utf-8",{fatal:!0}).decode(t)))).report,1!==y.schema_version||y.onu_id!==x.onu_id)throw Error(_("Unexpected MIB response"));j.style.display="none",k.replaceChildren((r=y,b={class:"mib-chips",children:[(i={class:"mib-chip mib-chip-primary",children:["ONU ",r.onu_id]},c("span",i)),(a={class:`mib-chip ${r.uploaded_complete?"mib-chip-success":"mib-chip-warning"}`,children:r.uploaded_complete?_("Upload complete"):_("Upload incomplete")},c("span",a)),(o={class:"mib-chip mib-chip-info",children:[_("Records"),": ",r.received_records,r.expected_records!==r.received_records?` / ${r.expected_records}`:""]},c("span",o)),(s={class:"mib-chip",children:[_("Decoded"),": ",r.decoded_records]},c("span",s)),r.partial_records>0?(l={class:"mib-chip mib-chip-warning",children:[_("Partial"),": ",r.partial_records]},c("span",l)):null,(d={class:"mib-chip mib-chip-neutral",children:[_("Basic"),": ",r.basic_records]},c("span",d)),(u={class:"mib-chip",children:r.tables_collected?_("VLAN tables collected"):_("VLAN tables not collected")},c("span",u)),(f={class:"mib-chip mib-chip-subtle",children:new Date().toLocaleTimeString()},c("span",f))]},c("div",b))),z.replaceChildren(function(e){var t,r,n,i,a,o;let s,l=new Map;for(let t of e.records){let e=`${t.class_id}\0${t.entity_id}`,r=l.get(e);r?r.push(t):l.set(e,[t])}let d=e.classes.length?e.classes[0].class_id:null,p=(t={class:"mib-content"},c("div",t)),u=(r={type:"search",class:"cbi-input-text mib-search-input",placeholder:_("Search ME name or Class ID…")},c("input",r)),f=(n={class:"mib-class-list"},c("div",n)),b=new Map;function g(t){var r,n;for(let[e,r]of(d=t,b))e===t?r.classList.add("active"):r.classList.remove("active");let i=e.entities.filter(e=>e.class_id===t);i.length?p.replaceChildren(...i.map((r,n)=>{var i,a,o,s,d,p,u,f,b,g,m,h,v,y,w,x,k,j,z;return z={open:0===n,class:"mib-entity-details",children:[(d={class:"mib-entity-summary",children:[(o={class:"mib-entity-title",children:[(i={children:no(r.name)},c("strong",i)),(a={class:"mib-entity-id-tag",children:[_("Entity")," ",r.entity_id," (0x",r.entity_id.toString(16),")"]},c("span",a))]},c("span",o)),(s={class:"mib-entity-support",children:r.support},c("span",s))]},c("summary",d)),(j={class:"mib-entity-body",children:[r.attributes.length?(v={class:"table mib-attributes-table",children:[(m={children:(g={children:[(p={style:"width:28%",children:_("Attribute")},c("th",p)),(u={style:"width:14%",children:_("Type")},c("th",u)),(f={children:_("Value")},c("th",f)),(b={style:"width:18%",children:_("Definition")},c("th",b))]},c("tr",g))},c("thead",m)),(h={children:r.attributes.map(e=>{var t,r,n,i,a,o,s,l,d,p;return p={children:[(t={class:"mib-attr-name",children:e.definition.name},c("td",t)),(n={class:"mib-attr-kind",children:(r={children:e.definition.kind},c("code",r))},c("td",n)),(l={class:"mib-attr-value",children:[(i={class:"mib-val-display",children:function(e){if(null===e)return _("Conflicting values; inspect observations");switch(e.type){case"unsigned":case"signed":case"decimal":case"text":return no(e.value);case"octets":return no(e.hex);case"table_length":return no(e.bytes);default:throw new n$("unexpected_variant",`Unexpected variant: ${String(e)}`)}}(e.value)},c("span",i)),e.observations?.length?(s={class:"mib-obs-details",children:[(a={children:_("Raw data / observations")},c("summary",a)),(o={class:"mib-pre",children:nB(e.observations)},c("pre",o))]},c("details",s)):null]},c("td",l)),(d={class:"mib-attr-ref",children:nV(e.definition)},c("td",d))]},c("tr",p)})},c("tbody",h))]},c("table",v)):(y={children:_("Basic display only; raw records are preserved.")},c("p",y)),e.tables.filter(e=>e.class_id===t&&e.entity_id===r.entity_id).map(e=>{var t,r,n,i,a,o,s,l,d,p,u,f,b,g,m,h;return h={class:"mib-table-details",children:[(t={children:[e.attribute.name," ·"," ",e.collected?`${e.rows.length} ${_("rows")}`:no(e.error)]},c("summary",t)),e.vlan_rules.length?(b={class:"mib-table-overflow",children:(f={class:"table",children:[(p={children:(d={children:[(r={children:_("Outer filter (priority / VID / TPID-DEI)")},c("th",r)),(n={children:_("Inner filter (priority / VID / TPID-DEI)")},c("th",n)),(i={children:_("EtherType code")},c("th",i)),(a={children:_("Remove tags")},c("th",a)),(o={children:_("Outer treatment (priority / VID / TPID-DEI)")},c("th",o)),(s={children:_("Inner treatment (priority / VID / TPID-DEI)")},c("th",s)),(l={children:_("Delete entry")},c("th",l))]},c("tr",d))},c("thead",p)),(u={children:e.vlan_rules.map(e=>{var t,r,n,i,a,o,s,l;return l={children:[(t={children:`${e.filter_outer_priority} / ${e.filter_outer_vid} / ${e.filter_outer_tpid_dei}`},c("td",t)),(r={children:`${e.filter_inner_priority} / ${e.filter_inner_vid} / ${e.filter_inner_tpid_dei}`},c("td",r)),(n={children:no(e.filter_ethertype)},c("td",n)),(i={children:no(e.tags_to_remove)},c("td",i)),(a={children:`${e.treatment_outer_priority} / ${e.treatment_outer_vid} / ${e.treatment_outer_tpid_dei}`},c("td",a)),(o={children:`${e.treatment_inner_priority} / ${e.treatment_inner_vid} / ${e.treatment_inner_tpid_dei}`},c("td",o)),(s={children:no(e.delete_entry)},c("td",s))]},c("tr",l)})},c("tbody",u))]},c("table",f))},c("div",b)):null,(g={style:"margin-top:6px",children:[_("G.988 encoded field values"),": ",nV(e.attribute)]},c("p",g)),(m={class:"mib-pre",children:nB(e.vlan_rules.length?e.vlan_rules:e.rows)},c("pre",m))]},c("details",h)}),(k={class:"mib-diag-details",children:[(w={children:_("Records / diagnostics")},c("summary",w)),(x={class:"mib-pre",children:nB({diagnostics:r.diagnostics,records:l.get(`${t}\0${r.entity_id}`)??[]})},c("pre",x))]},c("details",k))]},c("div",j))]},c("details",z)})):p.replaceChildren((n={class:"mib-empty-content",children:(r={children:_("No entities recorded for this ME class.")},c("p",r))},c("div",n)))}function m(){var t;let r=u.value.trim().toLowerCase();b.clear();let n=e.classes.filter(e=>`${e.class_id} ${e.name??""}`.toLowerCase().includes(r));n.length?f.replaceChildren(...n.map(e=>{var t,r,n,i;let a=(i={type:"button",class:`mib-class-btn${e.class_id===d?" active":""}`,onclick:()=>g(e.class_id),children:[(t={class:"mib-class-id",children:e.class_id},c("span",t)),(r={class:"mib-class-name",title:e.name??_("Unknown class"),children:e.name??_("Unknown class")},c("span",r)),(n={class:"mib-class-count",children:e.entities},c("span",n))]},c("button",i));return b.set(e.class_id,a),a})):f.replaceChildren((t={class:"mib-empty-list",children:_("No matching ME classes")},c("div",t)))}return u.addEventListener("input",()=>{void 0!==s&&clearTimeout(s),s=setTimeout(()=>{s=void 0,m()},150)}),m(),e.classes.length&&g(e.classes[0].class_id),o={class:"mib-browser",children:[(a={class:"mib-sidebar",children:[(i={class:"mib-search-box",children:u},c("div",i)),f]},c("div",a)),p]},c("div",o)}(y),(h={class:"mib-upload-diagnostics",children:[(g={children:_("Upload diagnostics")},c("summary",g)),(m={class:"mib-pre",children:nB(y.diagnostics)},c("pre",m))]},c("details",h))),n=y,C.textContent=nB({schema_version:n.schema_version,reference_version:n.reference_version,onu_id:n.onu_id,uploaded_complete:n.uploaded_complete,expected_records:n.expected_records,received_records:n.received_records,decoded_records:n.decoded_records,partial_records:n.partial_records,basic_records:n.basic_records,tables_requested:n.tables_requested,tables_collected:n.tables_collected,class_count:n.classes.length,classes:n.classes.slice(0,25),additional_classes:Math.max(0,n.classes.length-25),record_count:n.records.length,first_record:n.records[0]??null,table_count:n.tables.length,diagnostics_count:n.diagnostics.length}),P.disabled=!1;return}if(e.progress){let{phase:t,received:r,expected:n}=e.progress;if(k.textContent="starting"===t?_("Starting OMCI MIB read…"):"tables"===t?`${_("Collecting VLAN tables")}${null==n?"":`: ${r}/${n}`}`:null==n?_("Reading OMCI MIB records…"):`${_("Reading OMCI MIB records")}: ${r}/${n}`,n&&n>0){let e=Math.min(100,Math.round(r/n*100));j.title=`${e}%`,j.firstElementChild.style.width=`${e}%`}}if(Date.now()>=$)throw Error(_("MIB query timed out; retry."));await new Promise(e=>setTimeout(e,1e3))}}catch(e){U()&&(j.style.display="none",k.replaceChildren(c("span",{class:"mib-error-text",children:[String(e),y?` \xb7 ${_("Previous snapshot retained")}`:""]})))}finally{await q(),v=!1,M.disabled=N.disabled=!1}}}async function q(){if(!w)return;let e=w;w=null;try{await nq(e)}catch(e){console.warn("Failed to release MIB snapshot",e)}}T(m),L.ui.showModal(`${e.model} — ${e.serial_number}`,D,"modal-wide")})(s),children:_("Details")},c("button",n))},c("td",i))]},c("tr",a));z.addEventListener("mouseenter",()=>{let e=s.data_path?.interface,t=l.find(t=>t.interface===e);t&&document.querySelector(`[data-fttr-port="${t.port}"]`)?.classList.add("fttr-port-highlight")}),z.addEventListener("mouseleave",()=>{document.querySelectorAll(".fttr-port-highlight").forEach(e=>{e.classList.remove("fttr-port-highlight")})});let C={element:z,update(e,t,r){s=e,o=t,l=r;let n=e.serial_number.toUpperCase(),i=t?.desired[n];u.textContent=void 0!==i?_("Unpin"):_("Pin"),u.hidden=!t,u.disabled=!L.hasViewPermission(),u.title=i!==t?.active[n]?_("Pending restart"):void 0!==i?_("Fixed interface"):_("Pin interface"),z.setAttribute("data-fttr-onu-id",String(e.onu_id)),f.textContent=String(e.onu_id),b.textContent=no(e.vendor),g.textContent=no(e.identity?.equipment_id??e.model),m.textContent=no(e.serial_number);let a=n_(e.state);np(h,a.tone,a.label,a.title);let d=nb(e.business_status);np(v,d.tone,d.label,d.title);let c=function(e){if(!e)return{display:"—"};let t=e.match(/image\s*\d+:\s*([^;,\s]+)/i);return t?.[1]?{display:t[1],full:e.replace(/;\s*/g,"\n")}:{display:e}}(e.firmware_version||e.identity?.software_images?.join("; "));y.textContent=c.display,c.full?y.setAttribute("title",c.full):y.removeAttribute("title"),w.textContent=no(e.data_path?.interface);let p=nh(e.management);np(x,p.tone,p.label,p.title);let C=nw(e.provisioning);np(k,C.tone,C.label,C.title);let S=nj(e.wifi_sync);np(j,S.tone,S.label,S.title)}};return C.update(e,void 0,[]),C}let n5=null,n3=null,n4=!1,n6=Date.now(),main=n0.extend({async load(){let[e,t,r]=await Promise.all([nR(),nA().catch(e=>(console.warn("Failed to load network device details",e),{})),nI()]);return{status:e,devices:t,platform:r}},render(e){var t,r,n,i,a,o,s,l,d,u,f,b,g,m,h,v,y;let w,x,k,j,z,C,S,$,P,O,M,N,R,I,A,T,D,U,F,q,B,Z,V,W,G,J,K,X,H,Q,Y,ee,et,er,en,ei;return t=e.status,r=e.devices,n=e.platform,w=t.optical_transceiver??{},x=r,k=function(e,t,r){var n,i,a,o,s;let l=new Map;for(let n of e)l.set(n.onu_id,n2(n,t,r));let d=(n={children:c("td",{colSpan:12,children:_("No registered sub-gateways.")})},c("tr",n)),p=0===e.length,u=c("tbody",{children:p?d:[...l.values()].map(e=>e.element)});return{element:(s={class:"table-wrapper",children:(o={class:"table",children:[(a={children:(i={children:[c("th",{children:_("ONU ID")}),c("th",{children:_("Vendor")}),c("th",{children:_("Model")}),c("th",{children:_("Optical serial")}),c("th",{children:_("Registration")}),c("th",{children:_("Business")}),c("th",{children:_("Firmware")}),c("th",{children:_("Data interface")}),c("th",{children:_("CWMP")}),c("th",{children:_("Synchronization")}),c("th",{children:_("Wi-Fi sync")}),c("th",{style:"text-align:right",children:_("Details")})]},c("tr",i))},c("thead",a)),u]},c("table",o))},c("div",s)),update(e,n,i){let a=new Set(e.map(e=>e.onu_id));for(let[e,t]of l)a.has(e)||(t.element.remove(),l.delete(e));if(0===e.length){p||u.append(d),p=!0;return}for(let[a,o]of(p&&(d.remove(),p=!1),e.entries())){let e=l.get(o.onu_id);e||(e=n2(o,t,r),l.set(o.onu_id,e)),e.update(o,n,i);let s=u.children.item(a);s!==e.element&&u.insertBefore(e.element,s)}}}}(t.sub_gateways??[],n,e=>F(e,x)),j=new Map,z=c("div",{class:"fttr-ports-grid"}),C=c("p",{children:_("No downstream ports are reported by the selected platform.")}),S=c("span",{class:"fttr-badge"}),$=c("span",{class:"fttr-badge fttr-badge-info"}),P=c("code",{style:"font-size:90%"}),O=c("span",{class:"fttr-badge fttr-badge-danger",style:"margin-left:.5em"}),s={"data-provisioning-summary":"true",style:"display:flex;align-items:center;flex-wrap:wrap;gap:0.75em;margin-top:.25em;margin-bottom:1.2em;font-size:92%",children:[(i={children:[c("strong",{style:"margin-right:.4em",children:[_("Provisioning"),":"]}),S]},c("span",i)),(a={children:[c("span",{style:"color:#888;margin-right:.3em",children:[_("Mode"),":"]}),$]},c("span",a)),(o={children:[c("span",{style:"color:#888;margin-right:.3em",children:[_("Revision"),":"]}),P]},c("span",o)),O]},M=c("div",s),N=c("span",{class:"fttr-badge"}),R=c("span",{children:no(w.model)}),I=c("span",{class:"fttr-badge"}),A=c("p",{role:"status"}),T=c("p",{class:"alert-message warning",role:"status",hidden:!0,children:_("Live status is unavailable. The displayed data may be stale.")}),q=[["enabled",_("FPGA master switch"),_("Controls optical module reset and ONU discovery. Turning it off resets the module and disconnects all ONUs.")],["downstream_tx_enabled",_("GPON downstream optical emission"),_("Controls GPON downstream 1490 nm optical emission. Turning it off removes the downstream optical signal and disconnects ONUs.")],["fec_enabled",_("GPON downstream FEC encoding"),_("Controls GPON downstream FEC encoding. When downstream transmission is enabled, ONU-side OMCI FEC performance monitoring is also enabled.")]],B=null,Z=null,V=!1,W=!1,G=!1,J=0,K=!0,X=new Map,H=new Map,Q=c("p",{role:"status","aria-live":"polite"}),Y=e=>null==e?_("Unknown"):e?_("Enabled"):_("Disabled"),ee=c("button",{class:"cbi-button cbi-button-apply",type:"button",disabled:!0,children:_("Save & Apply")}),et=()=>{for(let[e]of q){let t=X.get(e);t.disabled=V||K||!B||!L.hasViewPermission(),!G&&B&&(t.checked=B[e]);let r="enabled"===e?Z?.tx_enabled:"downstream_tx_enabled"===e?Z?.pon_mac?.tx_enabled:Z?.pon_mac?.fec_enabled;H.get(e).textContent=`${_("Saved")}: ${Y(B?.[e])} \xb7 ${_("Hardware")}: ${Y(r)}`}ee.disabled=V||K||!B||!L.hasViewPermission()||!G&&!Z?.error&&!Z?.pon_mac?.error},er=(y={class:"cbi-section","data-fttr":"optical-control",children:[(v={style:"display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:10px",children:q.map(e=>{var t,r;let[n,i,a]=e,o=c("input",{type:"checkbox",id:`fttr-optical-${n}`,disabled:!0});X.set(n,o),o.onchange=()=>{G=!0,et()};let s=c("span",{style:"margin-inline-start:1em"});return H.set(n,s),r={style:"padding:10px 12px;border:1px solid rgba(127,140,141,.25);border-radius:5px;min-width:0",children:[(t={style:"display:flex;align-items:center;justify-content:space-between;gap:8px",children:[c("label",{style:"font-weight:600",htmlFor:`fttr-optical-${n}`,children:i}),o]},c("div",t)),c("div",{style:"font-size:82%;margin-top:6px",class:"cbi-value-description",children:a}),c("div",{style:"font-size:82%;margin-top:5px",role:"status",children:s})]},c("div",r)})},c("div",v)),c("div",{style:"display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:10px",children:[ee,Q]})]},c("div",y)),en=e=>{K=!1,Z=e,B=e.settings??null;let t=e.pon_mac,r=B&&e.tx_enabled===B.enabled&&t&&t.tx_enabled===(B.enabled&&B.downstream_tx_enabled)&&t.fec_enabled===(B.enabled&&B.fec_enabled)&&!e.cleanup_pending;Q.textContent=e.error?.message||t?.error||(r?"":_("Saved; applying hardware configuration")),et()},ei=async e=>{V=!0,J++,et();try{let t=await nD(e);"success"===t.status&&(G=!1),en(t)}catch(e){Q.textContent=String(e)}finally{V=!1,et()}},ee.onclick=()=>{var e,t;if(V||K||!B||!L.hasViewPermission())return;let r={enabled:X.get("enabled").checked,downstream_tx_enabled:X.get("downstream_tx_enabled").checked,fec_enabled:X.get("fec_enabled").checked};return!r.enabled&&B.enabled||!r.downstream_tx_enabled&&B.downstream_tx_enabled?void L.ui.showModal(_("Optical transceiver"),(t={children:[c("p",{children:_("This disconnects all ONUs on this PON. Apply these settings?")}),(e={class:"right",children:[c("button",{type:"button",class:"cbi-button",onclick:()=>L.ui.hideModal(),children:_("Cancel")})," ",c("button",{type:"button",class:"cbi-button cbi-button-negative",onclick:()=>(L.ui.hideModal(),ei(r)),children:_("Confirm")})]},c("div",e))]},c("div",t))):ei(r)},D={element:er,async refresh(){if(V||W)return;let e=J;W=!0;try{let t=await nT();V||e!==J||en(t)}catch(t){V||e!==J||(K=!0,Q.textContent=String(t),et())}finally{W=!1}}},n1.add(async()=>{!p()&&D.element.isConnected&&await D.refresh()},2),h={class:"cbi-map fttr-overview",children:[c("style",{children:`
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

				${nC}

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
				`}),c("h2",{children:_("FTTR overview")}),T,D.element,M,A,(b={class:"cbi-section",children:[c("h3",{children:_("Controller")}),(f={class:"table",children:(u={children:[(l={children:[c("th",{style:"width:15%",children:_("FPGA status")}),c("td",{style:"width:35%",children:N}),c("th",{style:"width:15%",children:_("CDR lock")}),c("td",{style:"width:35%",children:I})]},c("tr",l)),(d={children:[c("th",{children:_("Optical module")}),c("td",{colSpan:3,children:R})]},c("tr",d))]},c("tbody",u))},c("table",f))]},c("div",b)),(g={class:"cbi-section",children:[c("h3",{children:_("Sub-gateways")}),k.element]},c("div",g)),(m={class:"cbi-section",children:[c("h3",{children:_("Downstream ports")}),C,z]},c("div",m))]},U=c("div",h),(F=(e,t)=>{x=t;let r=e.optical_transceiver,n=e.provisioning,i=e.onu_pinning;A.textContent=i?[i.allocation_blocked?_("ONU allocation blocked by invalid startup configuration."):"",i.pending_restart?_("Fixed interface changes pending FTTR restart."):"",i.startup_error||i.config_error||""].filter(Boolean).join(" "):"",A.hidden=!A.textContent,n?(np(S,n.enabled?"success":"neutral",n.enabled?_("Enabled"):_("Disabled")),$.textContent=no(n.mode),P.textContent=no(n.revision),n.error?(O.textContent=n.error,O.style.display=""):O.style.display="none",M.style.display=""):M.textContent=_("Provisioning status unavailable"),"ready"===e.fpga_status?np(N,"success",_("Ready")):e.fpga_status?np(N,"neutral",no(e.fpga_status)):np(N,"none","—"),R.textContent=no(r.model),null==r.cdr_locked?np(I,"none",_("Unknown")):r.cdr_locked?np(I,"success",_("Locked")):np(I,"warning",_("Unlocked")),k.update(e.sub_gateways??[],e.onu_pinning,e.switch_ports??[]);let a=new Set;for(let[r,n]of(e.switch_ports??[]).entries()){if(a.has(n.port))continue;a.add(n.port);let i=j.get(n.port);i||(i=function(e){var t,r,n,i,a,o,s,l,d,p,u,f,b,g,m,h,v;let y=c("span",{}),w=c("span",{style:"display:inline-block;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:90%",children:_("Unknown")}),x=c("img",{src:"/luci-static/resources/icons/port_down.svg",alt:"","aria-hidden":"true"}),k=c("div",{style:"flex:1;height:3px;opacity:0.25;background-color:rgb(240, 144, 144)"}),j=c("span",{}),z=c("span",{}),C=c("span",{}),S=c("span",{}),$=c("span",{}),P=c("span",{}),O=c("span",{}),M=c("span",{}),N=c("span",{}),R=c("span",{}),I=c("span",{}),A=c("span",{}),T=c("span",{}),D=c("span",{}),U=(v={class:"ifacebox fttr-port-card","data-fttr-port":String(e),style:"box-sizing:border-box;margin:0;cursor:pointer",children:[c("div",{class:"ifacebox-head fttr-port-name",style:"font-weight:bold",children:y}),c("div",{class:"ifacebox-body fttr-port-identity",children:[x,w]}),(r={class:"ifacebox-head cbi-tooltip-container",style:"display:flex",children:[k,(t={class:"cbi-tooltip left",children:[c("strong",{children:[_("Port status"),": "]}),j,c("br",{}),c("strong",{children:[_("ONU"),": "]}),z,c("br",{}),c("strong",{children:[_("MAC address"),": "]}),C]},c("span",t))]},c("div",r)),(h={class:"ifacebox-body",children:(m={class:"cbi-tooltip-container fttr-port-stats",style:"display:flex;flex-direction:column;align-items:center;font-size:80%;line-height:1.4;cursor:pointer;width:100%",children:[(n={style:"display:flex;flex-direction:column;align-items:center",children:[c("div",{style:"white-space:nowrap",children:["▲ ",S]}),c("div",{style:"white-space:nowrap",children:["▼ ",$]})]},c("div",n)),(g={class:"cbi-tooltip",children:(b={children:[(i={class:"nowrap",children:[c("strong",{children:[_("Received bytes"),": "]}),P]},c("span",i)),c("br",{}),(a={class:"nowrap",children:[c("strong",{children:[_("Received packets"),": "]}),O]},c("span",a)),c("br",{}),(o={class:"nowrap",children:[c("strong",{children:[_("Received multicast"),": "]}),M]},c("span",o)),c("br",{}),(s={class:"nowrap",children:[c("strong",{children:[_("Receive errors"),": "]}),N]},c("span",s)),c("br",{}),(l={class:"nowrap",children:[c("strong",{children:[_("Receive dropped"),": "]}),R]},c("span",l)),c("br",{}),(d={class:"nowrap",children:[c("strong",{children:[_("Transmitted bytes"),": "]}),I]},c("span",d)),c("br",{}),(p={class:"nowrap",children:[c("strong",{children:[_("Transmitted packets"),": "]}),A]},c("span",p)),c("br",{}),(u={class:"nowrap",children:[c("strong",{children:[_("Transmit errors"),": "]}),T]},c("span",u)),c("br",{}),(f={class:"nowrap",children:[c("strong",{children:[_("Transmit dropped"),": "]}),D]},c("span",f))]},c("span",b))},c("span",g))]},c("div",m))},c("div",h))]},c("div",v));return U.addEventListener("mouseenter",()=>{let e=U.getAttribute("data-active-onu-id");if(e){let t=document.querySelector(`[data-fttr-onu-id="${e}"]`);t?.classList.add("fttr-row-highlight")}}),U.addEventListener("mouseleave",()=>{document.querySelectorAll(".fttr-row-highlight").forEach(e=>{e.classList.remove("fttr-row-highlight")})}),U.addEventListener("click",()=>{let e=U.getAttribute("data-active-onu-id");if(e){let t=document.querySelector(`[data-fttr-onu-id="${e}"]`);t&&(t.scrollIntoView({behavior:"smooth",block:"nearest"}),t.classList.add("fttr-row-highlight"),window.setTimeout(()=>t.classList.remove("fttr-row-highlight"),1500))}}),{element:U,update(t,r){var n;let i=(t.switch_ports??[]).find(t=>t.port===e),a=i?.interface,o=a?r[a]:void 0,s=o?.stats,l=i?.carrier??o?.carrier??(o?.link?.speed!==void 0||void 0),d=(t.sub_gateways??[]).find(e=>e.onu_id===i?.onu_id),c=!0===l,p=s?.rx_bytes,u=s?.tx_bytes;i?.onu_id!==void 0?U.setAttribute("data-active-onu-id",String(i.onu_id)):U.removeAttribute("data-active-onu-id"),c?(U.classList.add("port-up"),U.classList.remove("port-down")):(U.classList.add("port-down"),U.classList.remove("port-up")),y.textContent=no(a),x.setAttribute("src",`/luci-static/resources/icons/${c?"port_up.svg":"port_down.svg"}`),w.textContent=c?o?.link?.speed!==void 0?void 0===(n=o.link.speed)||!Number.isFinite(n)||n<=0?_("Unknown"):n>=1e3?`${n/1e3} GbE`:`${n} MbE`:_("Connected"):!1===l?_("Disconnected"):_("Unknown"),w.setAttribute("title",_("速度：%s Mbit/s，双工：%s").format(no(o?.link?.speed),no(o?.link?.duplex))),k.style.opacity=c?"1":"0.25",k.style.backgroundColor=c?"rgb(46, 204, 113)":"rgba(200, 200, 200, 0.4)",j.textContent=no((i?.reserved_sn&&void 0===i.onu_id?_("Reserved (offline)"):i?.link_state)??i?.status??(o?l?_("Link up"):_("Link down"):_("Unavailable"))),i?.reserved_sn&&void 0!==i.onu_id&&(j.textContent+=` \xb7 ${_("Fixed interface")}`),z.textContent=no(i?.onu_sn??d?.serial_number??i?.reserved_sn??i?.onu_id),U.title=i?.reserved_sn?`${_("Reserved")}: ${i.reserved_sn}`:"",C.textContent=no(o?.mac),S.textContent=c||u?nl(u):"—",$.textContent=c||p?nl(p):"—",P.textContent=nl(p),O.textContent=nd(s?.rx_packets),M.textContent=nd(s?.rx_multicast??s?.multicast),N.textContent=nd(s?.rx_errors),R.textContent=nd(s?.rx_dropped),I.textContent=nl(u),A.textContent=nd(s?.tx_packets),T.textContent=nd(s?.tx_errors),D.textContent=nd(s?.tx_dropped)}}}(n.port),j.set(n.port,i)),i.update(e,t);let o=z.children.item(r);o!==i.element&&z.insertBefore(i.element,o)}for(let[e,t]of j)a.has(e)||(t.element.remove(),j.delete(e));C.hidden=a.size>0})(t,r),n5=(n3={element:U,update:F,setStale:e=>{T.hidden=!e}}).element,n1.add(async()=>{if(n4||p()||!n5?.isConnected||!n3)return;let e=n3;n4=!0;try{let[t,r]=await Promise.all([nR(),nA().catch(()=>({}))]);n3===e&&e.element.isConnected&&e.update(t,r),n6=Date.now(),e.setStale(!1)}catch(t){console.error("Failed to refresh FTTR status",t),e.setStale(Date.now()-n6>3e4)}finally{n4=!1}},10),n5},handleSaveApply:null,handleSave:null,handleReset:null})})(),main=t.main;
return main;
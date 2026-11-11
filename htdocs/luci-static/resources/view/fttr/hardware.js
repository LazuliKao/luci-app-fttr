'use strict';
var main,e={};e.d=(t,r,a)=>{var n=(r,a)=>{for(var n in r)e.o(r,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,[a]:r[n]})};n(r,"get"),n(a,"value")},e.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var t={};(()=>{var r;let a,n,i,s,o;e.d(t,{main:()=>main});let l=Symbol.for("jsx.fragment");function d(e,t){let{children:r,...a}=null===t||"object"!=typeof t||Array.isArray(t)?{}:t,n=function e(t){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];for(let a of t)null!=a&&"boolean"!=typeof a&&(Array.isArray(a)?e(a,r):r.push(a instanceof Node?a:String(a)));return r}(null==r?[]:Array.isArray(r)?r:[r]);if(e===l){let e=document.createDocumentFragment();return e.append(...n),e}if("function"==typeof e){let t=Reflect.apply(e,void 0,[{...a,children:n}]);if(!(t instanceof Node))throw TypeError("JSX components must return a DOM Node");return t}if("string"!=typeof e)throw TypeError("JSX element types must be tag names or component functions");let i={},s={...a};for(let[e,t]of Object.entries(s))e.startsWith("on")&&"function"==typeof t?(i[e]=t,delete s[e]):"boolean"==typeof t&&(t?s[e]=e:delete s[e]);let o=Object.keys(s).length>0?n.length>1?E(e,s,n):E(e,s,n[0]):n.length>1?E(e,{},n):E(e,{},n[0]);for(let[e,t]of Object.entries(i)){let r=e.slice(2).toLowerCase();o.addEventListener(r,t)}return o}let c=e=>null==e||""===e?"—":String(e);function p(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3;return null!=e&&Number.isFinite(e)?`${e.toFixed(t)} dBm`:"—"}function u(e){if(null==e||!Number.isFinite(e)||e<0)return null;let t=Math.floor(e);if(t<60)return(1===t?_("%d second ago"):_("%d seconds ago")).replace("%d",String(t));let r=Math.floor(t/60);if(r<60)return(1===r?_("%d minute ago"):_("%d minutes ago")).replace("%d",String(r));let a=Math.floor(t/3600);if(a<24)return(1===a?_("%d hour ago"):_("%d hours ago")).replace("%d",String(a));let n=Math.floor(t/86400);return(1===n?_("%d day ago"):_("%d days ago")).replace("%d",String(n))}function f(e,t,r){function a(r,a){if(r._zod||Object.defineProperty(r,"_zod",{value:{def:a,constr:s,traits:new Set},enumerable:!1}),r._zod.traits.has(e))return;r._zod.traits.add(e),t(r,a);let n=s.prototype,i=Object.keys(n);for(let e=0;e<i.length;e++){let t=i[e];t in r||(r[t]=n[t].bind(r))}}let n=r?.Parent??Object;class i extends n{}function s(e){var t;let n=r?.Parent?new i:this;for(let r of(a(n,e),(t=n._zod).deferred??(t.deferred=[]),n._zod.deferred))r();return n}return Object.defineProperty(i,"name",{value:e}),Object.defineProperty(s,"init",{value:a}),Object.defineProperty(s,Symbol.hasInstance,{value:t=>!!r?.Parent&&t instanceof r.Parent||t?._zod?.traits?.has(e)}),Object.defineProperty(s,"name",{value:e}),s}Object.freeze({status:"aborted"}),Symbol("zod_brand");class b extends Error{constructor(){super("Encountered Promise during synchronous parse. Use .parseAsync() instead.")}}let g={};function h(e){return e&&Object.assign(g,e),g}function m(e,t){return"bigint"==typeof t?t.toString():t}function v(e){let t=+!!e.startsWith("^"),r=e.endsWith("$")?e.length-1:e.length;return e.slice(t,r)}let y=Symbol("evaluating");function w(e,t,r){let a;Object.defineProperty(e,t,{get(){if(a!==y)return void 0===a&&(a=y,a=r()),a},set(r){Object.defineProperty(e,t,{value:r})},configurable:!0})}let x="captureStackTrace"in Error?Error.captureStackTrace:(...e)=>{};function k(e){return"object"==typeof e&&null!==e&&!Array.isArray(e)}function z(e){if(!1===k(e))return!1;let t=e.constructor;if(void 0===t||"function"!=typeof t)return!0;let r=t.prototype;return!1!==k(r)&&!1!==Object.prototype.hasOwnProperty.call(r,"isPrototypeOf")}function j(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function $(e){if(!e)return{};if("string"==typeof e)return{error:()=>e};if(e?.message!==void 0){if(e?.error!==void 0)throw Error("Cannot specify both `message` and `error` params");e.error=e.message}return(delete e.message,"string"==typeof e.error)?{...e,error:()=>e.error}:e}function S(e,t=0){if(!0===e.aborted)return!0;for(let r=t;r<e.issues.length;r++)if(e.issues[r]?.continue!==!0)return!0;return!1}function O(e,t){return t.map(t=>(t.path??(t.path=[]),t.path.unshift(e),t))}function C(e){return"string"==typeof e?e:e?.message}function P(e,t,r){let a={...e,path:e.path??[]};return e.message||(a.message=C(e.inst?._zod.def?.error?.(e))??C(t?.error?.(e))??C(r.customError?.(e))??C(r.localeError?.(e))??"Invalid input"),delete a.inst,delete a.continue,t?.reportInput||delete a.input,a}let M=(e,t)=>{e.name="$ZodError",Object.defineProperty(e,"_zod",{value:e._zod,enumerable:!1}),Object.defineProperty(e,"issues",{value:t,enumerable:!1}),e.message=JSON.stringify(t,m,2),Object.defineProperty(e,"toString",{value:()=>e.message,enumerable:!1})},I=f("$ZodError",M),R=f("$ZodError",M,{Parent:Error}),N=(n=R,(e,t,r,a)=>{let i=r?Object.assign(r,{async:!1}):{async:!1},s=e._zod.run({value:t,issues:[]},i);if(s instanceof Promise)throw new b;if(s.issues.length){let e=new(a?.Err??n)(s.issues.map(e=>P(e,i,h())));throw x(e,a?.callee),e}return s.value}),D=(i=R,async(e,t,r,a)=>{let n=r?Object.assign(r,{async:!0}):{async:!0},s=e._zod.run({value:t,issues:[]},n);if(s instanceof Promise&&(s=await s),s.issues.length){let e=new(a?.Err??i)(s.issues.map(e=>P(e,n,h())));throw x(e,a?.callee),e}return s.value}),A=(s=R,(e,t,r)=>{let a=r?{...r,async:!1}:{async:!1},n=e._zod.run({value:t,issues:[]},a);if(n instanceof Promise)throw new b;return n.issues.length?{success:!1,error:new(s??I)(n.issues.map(e=>P(e,a,h())))}:{success:!0,data:n.value}}),T=(o=R,async(e,t,r)=>{let a=r?Object.assign(r,{async:!0}):{async:!0},n=e._zod.run({value:t,issues:[]},a);return n instanceof Promise&&(n=await n),n.issues.length?{success:!1,error:new o(n.issues.map(e=>P(e,a,h())))}:{success:!0,data:n.value}}),U=/^-?\d+(?:\.\d+)?$/,q=/^(?:true|false)$/i,Z=/^null$/i,B={major:4,minor:3,patch:6},F=f("$ZodType",(e,t)=>{var r;e??(e={}),e._zod.def=t,e._zod.bag=e._zod.bag||{},e._zod.version=B;let a=[...e._zod.def.checks??[]];for(let t of(e._zod.traits.has("$ZodCheck")&&a.unshift(e),a))for(let r of t._zod.onattach)r(e);if(0===a.length)(r=e._zod).deferred??(r.deferred=[]),e._zod.deferred?.push(()=>{e._zod.run=e._zod.parse});else{let t=(e,t,r)=>{let a,n=S(e);for(let i of t){if(i._zod.def.when){if(!i._zod.def.when(e))continue}else if(n)continue;let t=e.issues.length,s=i._zod.check(e);if(s instanceof Promise&&r?.async===!1)throw new b;if(a||s instanceof Promise)a=(a??Promise.resolve()).then(async()=>{await s,e.issues.length!==t&&(n||(n=S(e,t)))});else{if(e.issues.length===t)continue;n||(n=S(e,t))}}return a?a.then(()=>e):e},r=(r,n,i)=>{if(S(r))return r.aborted=!0,r;let s=t(n,a,i);if(s instanceof Promise){if(!1===i.async)throw new b;return s.then(t=>e._zod.parse(t,i))}return e._zod.parse(s,i)};e._zod.run=(n,i)=>{if(i.skipChecks)return e._zod.parse(n,i);if("backward"===i.direction){let t=e._zod.parse({value:n.value,issues:[]},{...i,skipChecks:!0});return t instanceof Promise?t.then(e=>r(e,n,i)):r(t,n,i)}let s=e._zod.parse(n,i);if(s instanceof Promise){if(!1===i.async)throw new b;return s.then(e=>t(e,a,i))}return t(s,a,i)}}w(e,"~standard",()=>({validate:t=>{try{let r=A(e,t);return r.success?{value:r.data}:{issues:r.error?.issues}}catch(r){return T(e,t).then(e=>e.success?{value:e.data}:{issues:e.error?.issues})}},vendor:"zod",version:1}))}),W=f("$ZodString",(e,t)=>{var r;let a;F.init(e,t),e._zod.pattern=[...e?._zod.bag?.patterns??[]].pop()??(a=(r=e._zod.bag)?`[\\s\\S]{${r?.minimum??0},${r?.maximum??""}}`:"[\\s\\S]*",RegExp(`^${a}$`)),e._zod.parse=(r,a)=>{if(t.coerce)try{r.value=String(r.value)}catch(e){}return"string"==typeof r.value||r.issues.push({expected:"string",code:"invalid_type",input:r.value,inst:e}),r}}),V=f("$ZodNumber",(e,t)=>{F.init(e,t),e._zod.pattern=e._zod.bag.pattern??U,e._zod.parse=(r,a)=>{if(t.coerce)try{r.value=Number(r.value)}catch(e){}let n=r.value;if("number"==typeof n&&!Number.isNaN(n)&&Number.isFinite(n))return r;let i="number"==typeof n?Number.isNaN(n)?"NaN":Number.isFinite(n)?void 0:"Infinity":void 0;return r.issues.push({expected:"number",code:"invalid_type",input:n,inst:e,...i?{received:i}:{}}),r}}),J=f("$ZodBoolean",(e,t)=>{F.init(e,t),e._zod.pattern=q,e._zod.parse=(r,a)=>{if(t.coerce)try{r.value=!!r.value}catch(e){}let n=r.value;return"boolean"==typeof n||r.issues.push({expected:"boolean",code:"invalid_type",input:n,inst:e}),r}}),X=f("$ZodNull",(e,t)=>{F.init(e,t),e._zod.pattern=Z,e._zod.values=new Set([null]),e._zod.parse=(t,r)=>{let a=t.value;return null===a||t.issues.push({expected:"null",code:"invalid_type",input:a,inst:e}),t}}),G=f("$ZodUnknown",(e,t)=>{F.init(e,t),e._zod.parse=e=>e});function H(e,t,r){e.issues.length&&t.issues.push(...O(r,e.issues)),t.value[r]=e.value}let K=f("$ZodArray",(e,t)=>{F.init(e,t),e._zod.parse=(r,a)=>{let n=r.value;if(!Array.isArray(n))return r.issues.push({expected:"array",code:"invalid_type",input:n,inst:e}),r;r.value=Array(n.length);let i=[];for(let e=0;e<n.length;e++){let s=n[e],o=t.element._zod.run({value:s,issues:[]},a);o instanceof Promise?i.push(o.then(t=>H(t,r,e))):H(o,r,e)}return i.length?Promise.all(i).then(()=>r):r}});function Q(e,t,r,a,n){if(e.issues.length){if(n&&!(r in a))return;t.issues.push(...O(r,e.issues))}void 0===e.value?r in a&&(t.value[r]=void 0):t.value[r]=e.value}let Y=f("$ZodObject",(e,t)=>{var r;let a;F.init(e,t);let n=Object.getOwnPropertyDescriptor(t,"shape");if(!n?.get){let e=t.shape;Object.defineProperty(t,"shape",{get:()=>{let r={...e};return Object.defineProperty(t,"shape",{value:r}),r}})}let i=(r=()=>(function(e){var t;let r=Object.keys(e.shape);for(let t of r)if(!e.shape?.[t]?._zod?.traits?.has("$ZodType"))throw Error(`Invalid element at key "${t}": expected a Zod schema`);let a=Object.keys(t=e.shape).filter(e=>"optional"===t[e]._zod.optin&&"optional"===t[e]._zod.optout);return{...e,keys:r,keySet:new Set(r),numKeys:r.length,optionalKeys:new Set(a)}})(t),{get value(){{let e=r();return Object.defineProperty(this,"value",{value:e}),e}}});w(e._zod,"propValues",()=>{let e=t.shape,r={};for(let t in e){let a=e[t]._zod;if(a.values)for(let e of(r[t]??(r[t]=new Set),a.values))r[t].add(e)}return r});let s=t.catchall;e._zod.parse=(t,r)=>{a??(a=i.value);let n=t.value;if(!k(n))return t.issues.push({expected:"object",code:"invalid_type",input:n,inst:e}),t;t.value={};let o=[],l=a.shape;for(let e of a.keys){let a=l[e],i="optional"===a._zod.optout,s=a._zod.run({value:n[e],issues:[]},r);s instanceof Promise?o.push(s.then(r=>Q(r,t,e,n,i))):Q(s,t,e,n,i)}return s?function(e,t,r,a,n,i){let s=[],o=n.keySet,l=n.catchall._zod,d=l.def.type,c="optional"===l.optout;for(let n in t){if(o.has(n))continue;if("never"===d){s.push(n);continue}let i=l.run({value:t[n],issues:[]},a);i instanceof Promise?e.push(i.then(e=>Q(e,r,n,t,c))):Q(i,r,n,t,c)}return(s.length&&r.issues.push({code:"unrecognized_keys",keys:s,input:t,inst:i}),e.length)?Promise.all(e).then(()=>r):r}(o,n,t,r,i.value,e):o.length?Promise.all(o).then(()=>t):t}});function ee(e,t,r,a){for(let r of e)if(0===r.issues.length)return t.value=r.value,t;let n=e.filter(e=>!S(e));return 1===n.length?(t.value=n[0].value,n[0]):(t.issues.push({code:"invalid_union",input:t.value,inst:r,errors:e.map(e=>e.issues.map(e=>P(e,a,h())))}),t)}let et=f("$ZodUnion",(e,t)=>{F.init(e,t),w(e._zod,"optin",()=>t.options.some(e=>"optional"===e._zod.optin)?"optional":void 0),w(e._zod,"optout",()=>t.options.some(e=>"optional"===e._zod.optout)?"optional":void 0),w(e._zod,"values",()=>{if(t.options.every(e=>e._zod.values))return new Set(t.options.flatMap(e=>Array.from(e._zod.values)))}),w(e._zod,"pattern",()=>{if(t.options.every(e=>e._zod.pattern)){let e=t.options.map(e=>e._zod.pattern);return RegExp(`^(${e.map(e=>v(e.source)).join("|")})$`)}});let r=1===t.options.length,a=t.options[0]._zod.run;e._zod.parse=(n,i)=>{if(r)return a(n,i);let s=!1,o=[];for(let e of t.options){let t=e._zod.run({value:n.value,issues:[]},i);if(t instanceof Promise)o.push(t),s=!0;else{if(0===t.issues.length)return t;o.push(t)}}return s?Promise.all(o).then(t=>ee(t,n,e,i)):ee(o,n,e,i)}}),er=f("$ZodIntersection",(e,t)=>{F.init(e,t),e._zod.parse=(e,r)=>{let a=e.value,n=t.left._zod.run({value:a,issues:[]},r),i=t.right._zod.run({value:a,issues:[]},r);return n instanceof Promise||i instanceof Promise?Promise.all([n,i]).then(([t,r])=>ea(e,t,r)):ea(e,n,i)}});function ea(e,t,r){let a,n=new Map;for(let r of t.issues)if("unrecognized_keys"===r.code)for(let e of(a??(a=r),r.keys))n.has(e)||n.set(e,{}),n.get(e).l=!0;else e.issues.push(r);for(let t of r.issues)if("unrecognized_keys"===t.code)for(let e of t.keys)n.has(e)||n.set(e,{}),n.get(e).r=!0;else e.issues.push(t);let i=[...n].filter(([,e])=>e.l&&e.r).map(([e])=>e);if(i.length&&a&&e.issues.push({...a,keys:i}),S(e))return e;let s=function e(t,r){if(t===r||t instanceof Date&&r instanceof Date&&+t==+r)return{valid:!0,data:t};if(z(t)&&z(r)){let a=Object.keys(r),n=Object.keys(t).filter(e=>-1!==a.indexOf(e)),i={...t,...r};for(let a of n){let n=e(t[a],r[a]);if(!n.valid)return{valid:!1,mergeErrorPath:[a,...n.mergeErrorPath]};i[a]=n.data}return{valid:!0,data:i}}if(Array.isArray(t)&&Array.isArray(r)){if(t.length!==r.length)return{valid:!1,mergeErrorPath:[]};let a=[];for(let n=0;n<t.length;n++){let i=e(t[n],r[n]);if(!i.valid)return{valid:!1,mergeErrorPath:[n,...i.mergeErrorPath]};a.push(i.data)}return{valid:!0,data:a}}return{valid:!1,mergeErrorPath:[]}}(t.value,r.value);if(!s.valid)throw Error(`Unmergable intersection. Error path: ${JSON.stringify(s.mergeErrorPath)}`);return e.value=s.data,e}let en=f("$ZodRecord",(e,t)=>{F.init(e,t),e._zod.parse=(r,a)=>{let n=r.value;if(!z(n))return r.issues.push({expected:"record",code:"invalid_type",input:n,inst:e}),r;let i=[],s=t.keyType._zod.values;if(s){let o;r.value={};let l=new Set;for(let e of s)if("string"==typeof e||"number"==typeof e||"symbol"==typeof e){l.add("number"==typeof e?e.toString():e);let s=t.valueType._zod.run({value:n[e],issues:[]},a);s instanceof Promise?i.push(s.then(t=>{t.issues.length&&r.issues.push(...O(e,t.issues)),r.value[e]=t.value})):(s.issues.length&&r.issues.push(...O(e,s.issues)),r.value[e]=s.value)}for(let e in n)l.has(e)||(o=o??[]).push(e);o&&o.length>0&&r.issues.push({code:"unrecognized_keys",input:n,inst:e,keys:o})}else for(let s of(r.value={},Reflect.ownKeys(n))){if("__proto__"===s)continue;let o=t.keyType._zod.run({value:s,issues:[]},a);if(o instanceof Promise)throw Error("Async schemas not supported in object keys currently");if("string"==typeof s&&U.test(s)&&o.issues.length){let e=t.keyType._zod.run({value:Number(s),issues:[]},a);if(e instanceof Promise)throw Error("Async schemas not supported in object keys currently");0===e.issues.length&&(o=e)}if(o.issues.length){"loose"===t.mode?r.value[s]=n[s]:r.issues.push({code:"invalid_key",origin:"record",issues:o.issues.map(e=>P(e,a,h())),input:s,path:[s],inst:e});continue}let l=t.valueType._zod.run({value:n[s],issues:[]},a);l instanceof Promise?i.push(l.then(e=>{e.issues.length&&r.issues.push(...O(s,e.issues)),r.value[o.value]=e.value})):(l.issues.length&&r.issues.push(...O(s,l.issues)),r.value[o.value]=l.value)}return i.length?Promise.all(i).then(()=>r):r}}),ei=f("$ZodLiteral",(e,t)=>{if(F.init(e,t),0===t.values.length)throw Error("Cannot create literal schema with no valid values");let r=new Set(t.values);e._zod.values=r,e._zod.pattern=RegExp(`^(${t.values.map(e=>"string"==typeof e?j(e):e?j(e.toString()):String(e)).join("|")})$`),e._zod.parse=(a,n)=>{let i=a.value;return r.has(i)||a.issues.push({code:"invalid_value",values:t.values,input:i,inst:e}),a}});function es(e,t){return e.issues.length&&void 0===t?{issues:[],value:void 0}:e}let eo=f("$ZodOptional",(e,t)=>{F.init(e,t),e._zod.optin="optional",e._zod.optout="optional",w(e._zod,"values",()=>t.innerType._zod.values?new Set([...t.innerType._zod.values,void 0]):void 0),w(e._zod,"pattern",()=>{let e=t.innerType._zod.pattern;return e?RegExp(`^(${v(e.source)})?$`):void 0}),e._zod.parse=(e,r)=>{if("optional"===t.innerType._zod.optin){let a=t.innerType._zod.run(e,r);return a instanceof Promise?a.then(t=>es(t,e.value)):es(a,e.value)}return void 0===e.value?e:t.innerType._zod.run(e,r)}});Symbol("ZodOutput"),Symbol("ZodInput");(r=globalThis).__zod_globalRegistry??(r.__zod_globalRegistry=new class e{constructor(){this._map=new WeakMap,this._idmap=new Map}add(e,...t){let r=t[0];return this._map.set(e,r),r&&"object"==typeof r&&"id"in r&&this._idmap.set(r.id,e),this}clear(){return this._map=new WeakMap,this._idmap=new Map,this}remove(e){let t=this._map.get(e);return t&&"object"==typeof t&&"id"in t&&this._idmap.delete(t.id),this._map.delete(e),this}get(e){let t=e._zod.parent;if(t){let r={...this.get(t)??{}};delete r.id;let a={...r,...this._map.get(e)};return Object.keys(a).length?a:void 0}return this._map.get(e)}has(e){return this._map.has(e)}});let el=f("ZodMiniType",(e,t)=>{if(!e._zod)throw Error("Uninitialized schema in ZodMiniType.");F.init(e,t),e.def=t,e.type=t.type,e.parse=(t,r)=>N(e,t,r,{callee:e.parse}),e.safeParse=(t,r)=>A(e,t,r),e.parseAsync=async(t,r)=>D(e,t,r,{callee:e.parseAsync}),e.safeParseAsync=async(t,r)=>T(e,t,r),e.check=(...r)=>e.clone({...t,checks:[...t.checks??[],...r.map(e=>"function"==typeof e?{_zod:{check:e,def:{check:"custom"},onattach:[]}}:e)]},{parent:!0}),e.with=e.check,e.clone=(t,r)=>{let a;return a=new e._zod.constr(t??e._zod.def),(!t||r?.parent)&&(a._zod.parent=e),a},e.brand=()=>e,e.register=(t,r)=>(t.add(e,r),e),e.apply=t=>t(e)}),ed=f("ZodMiniString",(e,t)=>{W.init(e,t),el.init(e,t)});function ec(e){return new ed({type:"string",...$(e)})}let ep=f("ZodMiniNumber",(e,t)=>{V.init(e,t),el.init(e,t)});function eu(e){return new ep({type:"number",checks:[],...$(e)})}let e_=f("ZodMiniBoolean",(e,t)=>{J.init(e,t),el.init(e,t)});function ef(e){return new e_({type:"boolean",...$(e)})}let eb=f("ZodMiniNull",(e,t)=>{X.init(e,t),el.init(e,t)});function eg(e){return new eb({type:"null",...$(e)})}let eh=f("ZodMiniUnknown",(e,t)=>{G.init(e,t),el.init(e,t)}),em=f("ZodMiniArray",(e,t)=>{K.init(e,t),el.init(e,t)});function ev(e,t){return new em({type:"array",element:e,...$(t)})}let ey=f("ZodMiniObject",(e,t)=>{Y.init(e,t),el.init(e,t),w(e,"shape",()=>t.shape)});function ew(e,t){return new ey({type:"object",shape:e??{},...$(t)})}let ex=f("ZodMiniUnion",(e,t)=>{et.init(e,t),el.init(e,t)});function ek(e,t){return new ex({type:"union",options:e,...$(t)})}let ez=f("ZodMiniIntersection",(e,t)=>{er.init(e,t),el.init(e,t)});function ej(e,t){return new ez({type:"intersection",left:e,right:t})}let e$=f("ZodMiniRecord",(e,t)=>{en.init(e,t),el.init(e,t)});function eS(e,t,r){return new e$({type:"record",keyType:e,valueType:t,...$(r)})}let eO=f("ZodMiniLiteral",(e,t)=>{ei.init(e,t),el.init(e,t)});function eC(e,t){return new eO({type:"literal",values:Array.isArray(e)?e:[e],...$(t)})}let eP=f("ZodMiniOptional",(e,t)=>{eo.init(e,t),el.init(e,t)});function eE(e){return new eP({type:"optional",innerType:e})}let eM=ek([eC("account_set_password"),eC("account_set_active")]),eI=ek([eC("waiting_transport"),eC("waiting_identity"),eC("reading"),eC("configuring"),eC("verifying"),eC("waiting_inform"),eC("ready"),eC("retry_wait"),eC("manual_required"),eC("not_configured"),eC("waiting_acs"),eC("awaiting_apply"),eC("discovering_management_wan"),eC("configuring_management_wan"),eC("verifying_management_wan")]),eR=ew({enabled:ef(),listen:ek([ec(),eg()]),path:ek([ec(),eg()]),error:ek([ec(),eg()])}),eN=ew({vlan:eu(),vlans:ev(eu()),priority:eu(),acs_url:ec()}),eD=ew({state:eI,optical_sn:ec(),cwmp_id:ec(),mqtt_target:ek([ec(),eg()]),binding_source:ec(),method:ec(),desired_version:ec(),generation:eu(),reason:ec(),attempts:eu(),next_retry_at:eu(),updated_at:eu(),settings_verified_at:ek([eu(),eg()]),selected_vlan:ek([eu(),eg()]),last_inform:ek([eu(),eg()]),expected_acs_url:ec(),last_error:ek([ec(),eg()]),transport_epoch:eu(),completed_authorization:eu(),connection_request_enabled:ek([ef(),eg()]),inflight:ef(),persistence_error:ek([ec(),eg()]),link_identity_error:ek([ec(),eg()]),listener:eR,mqtt_last_seen:ek([eu(),eg()]),desired:eE(eN),endpoint_notice:eE(ec()),manual_steps:eE(ev(ec()))}),eA=ek([eC("not_required"),eC("pending"),eC("unavailable")]),eT=ek([eD,ew({state:eA,reason:ec()})]),eU=ew({id:ec(),name:ec()}),eq=ew({omci:ev(eU),bootstrap:ev(eU),provisioning:ev(eU)}),eL=ew({configured:ec(),effective:ec(),available:ev(ec()),reason:ec()}),eZ=ew({phase:ek([eC("not_started"),eC("collecting_identity"),eC("retrying_identity"),eC("unsupported"),eC("configuring"),eC("verifying"),eC("wan_bootstrap_pending"),eC("verified"),eC("retrying"),eC("offline")]),generation:eu(),error:ek([ec(),eg()])}),eB=ek([eC("auto"),eC("factory"),eC("firmware"),eC("builtin")]),eF=ek([eC("factory"),eC("firmware"),eC("builtin")]),eW=ew({source:eF,raw_sha256:ec(),effective_sha256:ec(),size:eu(),supplemented:ef(),temperature_compensation_enabled:ef()}),eV=ew({enabled:ef(),reason:ec(),calibration_sha256:ek([ec(),eg()]),raw_temperature:ek([eu(),eg()]),table_index:ek([eu(),eg()]),target_code:ek([eu(),eg()]),last_check_unix:ek([eu(),eg()]),last_write_unix:ek([eu(),eg()]),error:ek([ec(),eg()])}),eJ=ew({selected:eB,candidate:ek([eW,eg()]),candidate_error:ek([ec(),eg()]),active:ek([eW,eg()]),hardware_applied:ef(),pending:ef(),temperature_compensation:eV});ew({success:ef(),state:eE(eJ),output:eE(ec()),error:eE(ec())});let eX=ew({detected:ef(),device:ec(),has_data:ef(),sha256:ec(),data:ec()}),eG=ew({exists:ef(),path:ec(),size:eu(),sha256:ec(),data:ec()}),eH=ew({source:eF,active_path:ec(),size:eu(),sha256:ec(),data:ec(),factory:eX,firmware:eG,state:eE(eJ)}),eK=ew({error:ec()});ek([eH,eK]);let eQ=ew({success:ef(),path:ec(),size:eu(),sha256:ec()});ek([eQ,eK]),ew({data:ec()}),ew({source:eB});let eY=ew({acs:ef(),mqtt:ef(),npu:ef(),"device-hl202":ef(),"device-hwtc":ef(),"device-star":ef(),"device-zte":ef(),"device-scty":ef()}),e0=ew({optical:ef(),bridge_offload:ef(),omci_mib:ef(),mqtt_telemetry:ef(),hl202_management:ef(),cwmp:ef(),command_provisioning:ef()}),e1=ew({status:ef(),config:ef(),sync:ef(),hardware:ef(),calibration:ef(),hl202:ef(),about:ef()}),e2=ew({schema_version:eC(1),version:ec(),features:eY,functions:e0,pages:e1,adapters:eq}),e5=ek([ew({valid:eC(!0),revision:ec(),devices:eu()}),ew({error:ec()})]),e4=ek([eC("disabled"),eC("waiting"),eC("wan_reconciling"),eC("wan_verifying"),eC("wifi_reconciling"),eC("discovering"),eC("reading"),eC("disabling"),eC("disabling_read"),eC("writing"),eC("verifying"),eC("settling"),eC("completed"),eC("not_started"),eC("reset_pending"),eC("interrupted"),eC("recovering"),eC("waiting_management"),eC("waiting_task")]),e3=ew({operation_id:eu(),device:ec(),state:e4,started_at:eu()}),e8=ew({state:ek([eC("waiting"),eC("applied")]),requested_revision:ec(),requested_at:ek([eu(),eg()]),blocking_operations:ev(e3),reset_pending:ef()}),e6=ek([eC("auto"),eC("manual")]),e7=eC("diff"),e9=ew({state:ec(),enabled:ef(),reason:eE(ek([ec(),eg()])),revision:eE(ec()),vlan:eE(eu()),updated_at:eE(eu())}),te=ek([eC("disabled"),eC("online"),eC("waiting_inform"),eC("offline_or_stale"),eC("waiting_transport")]),tt=ew({cwmp_id:ec(),state:te,optical_online:ef(),last_inform:ek([eu(),eg()]),age_seconds:ek([eu(),eg()])}),tr=ew({state:te,optical_online:ef()}),ta=ek([eC("device_service"),eC("ssid"),eC("port_binding"),eC("wan_activation")]),tn=ew({name:ec(),desired:ec()}),ti=ew({id:ec(),name:eE(ek([ec(),eg()])),kind:ta,service_type:ec(),state:ec(),reason:eE(ec()),revision:eE(ec()),current_revision:eE(ef()),management_fresh:eE(ef()),operation_id:eE(eu()),task_id:eE(ek([eu(),eg()])),updated_at:eE(eu()),changes:eE(ev(tn))}),ts=ek([eC("plan"),eC("apply")]),to=ew({wan:ec(),wlan:ec(),binding:ec()}),tl=ew({state:ec(),requested:ec(),contract:ek([ec(),eg()]),reason:ec(),cache_hit:ef(),schema:ec(),capabilities:ek([to,eg()])}),td=ew({parent:eu(),connection:eu(),state:ec(),service_list:ec(),kind:ec(),baseline:ek([ev(eu()),eg()])}),tc=ew({state:ec(),reason:eE(ec()),task_id:eE(ek([eu(),eg()])),instance:eE(eu()),cwmp_id:eE(ec())}),tp=ek([eC("waiting"),eC("inventory"),eC("classifying"),eC("adding_parent"),eC("child_names"),eC("adding_child"),eC("delete_guard"),eC("deleting"),eC("verify_delete"),eC("empty_parent"),eC("deleting_parent"),eC("verify_parent_delete"),eC("next"),eC("done")]),tu=ew({owned:ev(eu()),pending:ek([ec(),eg()]),pending_instance:ek([eu(),eg()])}),t_=ek([eC("waiting"),eC("inventory"),eC("adding"),eC("verify_add"),eC("deleting"),eC("verify_delete"),eC("reading_disable"),eC("disabling"),eC("verifying_disable"),eC("next"),eC("done")]),tf=ek([eC("disable"),eC("preserve"),eC("delete")]),tb=ew({parent:eu(),child:eu(),service:ec(),vlan:ec()}),tg=ew({state:e4,items:ev(ti),omci_adapter:eE(ec()),bootstrap_adapter:eE(ec()),provisioning_adapter:eE(ec()),backend:eE(eL),operation_id:eE(eu()),device:eE(ec()),optical_sn:eE(ec()),cwmp_id:eE(ec()),revision:eE(ec()),mode:eE(ts),started_at:eE(eu()),completed_at:eE(ek([eu(),eg()])),current_revision:eE(ef()),management_fresh:eE(ef()),reason:eE(ec()),error:eE(ec()),attempts:eE(eu()),next_retry_at:eE(eu()),reconcile_reason:eE(ec()),cwmp_contract:eE(tl),wan_objects:eE(eS(ec(),td)),wan_lifecycle:eE(eS(ec(),tc)),wan_stage:eE(tp),wifi_objects:eE(tu),wifi_lifecycle:eE(eS(ec(),tc)),wifi_stage:eE(t_),wifi_cleanup:eE(tf),native_ownership:eE(eS(ec(),tb)),write_performed:eE(ef()),readback_verified:eE(ef())}),th=ek([eC("disabled"),eC("not_configured"),eC("stale_revision"),eC("stale_management"),eC("verified"),eC("attention_required"),eC("accepted_unverified"),eC("pending"),eC("recovering"),eC("waiting_management")]),tm=ew({device:ec(),name:ek([ec(),eg()]),group:ek([ec(),eg()]),group_name:ek([ec(),eg()]),template:ek([ec(),eg()]),template_name:ek([ec(),eg()]),optical_sn:ec(),omci_adapter:ec(),bootstrap_adapter:ec(),provisioning_adapter:ec(),omci_management:e9,management:ek([tt,eg()]),mqtt:ek([tr,eg()]),acs_bootstrap:eT,provisioning:tg,services:ev(ti),ssids:ev(ti),wifi_sync:th}),tv=ek([eC("discovering"),eC("comparing"),eC("planning"),eC("applying"),eC("verifying"),eC("configuring_listener"),eC("cleaning_previous"),eC("waiting_devices"),eC("ready"),eC("awaiting_apply"),eC("verified"),eC("blocked"),eC("retry_wait")]),ty=ew({enabled:ef(),mode:e6,vlan:ev(eu()),priority:eu(),address:ec(),acs_url:ec(),port:eu(),path:ec(),dhcp_enabled:ef()}),tw=ew({operation:ec(),key:ec(),value:ev(ec())}),tx=ew({state:tv,error:ek([ec(),eg()]),inflight:ef(),ready:ef(),desired_version:ek([ec(),eg()]),applied_version:ek([ec(),eg()]),next_retry_at:eu(),attempts:eu(),desired:ek([ty,eg()]),applied:ek([ty,eg()]),previous:ek([ty,eg()]),plan:ev(tw)}),tk=ew({desired:ek([eN,eg()]),state:ec()}),tz=ew({id:ec(),name:ek([ec(),eg()]),template:ec()}),tj=ew({enabled:ef(),mode:e6,method:e7,revision:ec(),triggers:ev(ec()),interval_minutes:eu(),error:ek([ec(),eg()]),devices:ev(tm),management_network:tx,omci_management:tk,groups:ev(tz),pending_devices:ev(ec()),onu_pins:eE(eS(ec(),eu())),config_error:eE(ek([ec(),eg()])),config_load:eE(e8)});ek([tj,eK]);let t$=ew({enabled:ek([ef(),eg()]),routed_enabled:ek([ef(),eg()]),bridge_enabled:ek([ef(),eg()]),engine_attached:ek([ef(),eg()]),forwarding_verified:ek([ef(),eg()])}),tS=ew({entity_id:eu(),port_id:ek([eu(),eg()])}),tO=ew({entity_id:eu(),filter_list_hex:ek([ec(),eg()]),forward_operation:ek([eu(),eg()]),number_of_entries:ek([eu(),eg()])}),tC=ew({entity_id:eu(),received_frame_rules_hex:ek([ev(ec()),eg()]),error:ek([ec(),eg()])}),tP=ew({age_seconds:eu(),gem_ports:ev(tS),vlan_filters:ev(tO),vlan_operations:ev(tC)}),tE=ew({source:ec(),unit:ec(),reason:ek([ec(),eg()]),raw:ek([ec(),eg()]),age_seconds:ek([eu(),eg()])}),tM=ew({interface:ec(),gem_ports:ek([ev(eu()),eg()]),vlan_id:ek([eu(),eg()]),onu_inventory:ek([tP,eg()]),tx_bytes:ek([eu(),eg()]),rx_bytes:ek([eu(),eg()]),current_tx_kbps:ek([eu(),eg()]),current_rx_kbps:ek([eu(),eg()]),olt_channel_gem:eE(eu()),forwarding_verified:eE(ef()),offload:t$,measurements:eS(ec(),tE)});ew({});let tI=ew({entity_id:eu(),interval_end_time:eu(),corrected_bytes:eu(),corrected_code_words:eu(),uncorrectable_code_words:eu(),total_code_words:eu(),fec_seconds:eu()}),tR=ew({ani_entity_id:ek([eu(),eg()]),control_supported:ef(),downstream_enabled:ek([ef(),eg()]),upstream_enabled:ek([ef(),eg()]),downstream_pm:ek([tI,eg()]),measurement:tE}),tN=ew({entry:ek([eC(0),eC(1),eC(2)]),username:ec(),active:ef()}),tD=ew({mqtt_mac:ec(),optical_sn:ek([ec(),eg()]),onu_id:ek([eu(),eg()]),binding_generation:ec(),last_seen:eu(),reason:ec()}),tA=ek([eC("executed"),eC("dispatched"),eC("timeout"),eC("error")]),tT=ew({target:ec(),status:tA,request_id:eE(ec()),exit_code:eE(eu()),output:eE(ec()),output_truncated:ef(),error:eE(ec())}),tU=ew({target:tD,result:tT,binding_current:ef()}),tq=ek([eC("not_applicable"),eC("accepted_and_saved"),eC("unconfirmed")]),tL=ew({code:ec(),message:ec()});ek([ew({schema_version:eC(1),operation:tU,accounts:ek([ev(tN),eg()]),write_status:tq}),ew({schema_version:eu(),error:tL})]);let tZ=ew({optical_sn:ec(),onu_id:eu(),binding_generation:ec()}),tB=ew({mqtt_mac:ec(),binding_generation:ec()}),tF=ek([tZ,tB]);ew({target:tF});let tW=ek([ew({kind:eC("exec"),script:ec(),timeout_seconds:eu()}),ew({kind:eC("accounts_read")}),ew({kind:eC("account_set_password"),entry:eu(),password:ec()}),ew({kind:eC("account_set_active"),entry:eu(),active:ef()})]),tV=ew({schema_version:eu(),target:tZ,action:tW}),tJ=ew({optical_sn:ec(),onu_id:eu(),model:ec(),optical_online:ef(),can_execute:ef(),mqtt:ek([tD,eg()]),report_revision:ek([eu(),eg()])});ek([ew({schema_version:eC(1),operation:tU}),ew({schema_version:eu(),error:tL})]),ew({target:tF,script:ec(),timeout_seconds:eu()});let tX=ek([ew({schema_version:eC(1),devices:ev(tJ),sources:ev(tD)}),ew({schema_version:eu(),error:tL})]);ek([ew({method:eC("list")}),ew({method:eC("report"),target:tZ}),ew({method:eC("source_report"),target:tB}),ew({method:eC("run"),request:tV})]);let tG=ek([eC("received"),eC("report_unavailable")]),tH=ew({value:new eh({type:"unknown"}),member:ec(),unit:ek([ec(),eg()])}),tK=ew({name:ec(),bytes:eu(),encoding:ec(),text:ek([ec(),eg()]),text_omitted:ef()}),tQ=ew({schema_version:eu(),compressed_bytes:eu(),decompressed_bytes:eu(),fields:eS(ec(),tH),members:ev(tK),errors:ev(ec())}),tY=ew({revision:eu(),last_received:eu(),last_processed_receipt:ek([eu(),eg()]),last_good:ek([eu(),eg()]),error:ek([ec(),eg()]),report:ek([tQ,eg()])});ek([ew({schema_version:eC(1),target:tD,report:ek([tY,eg()]),state:tG}),ew({schema_version:eC(1),target:tD,report:ek([tY,eg()]),read_only:eC(!0)}),ew({schema_version:eu(),error:tL})]),ew({target:tF}),ew({target:tF,kind:eM,entry:eu(),password:ec(),active:ef()});let t0=ew({accepted:eu(),rejected:eu(),read_errors:eu(),handled:eu(),max_intake_us:eu(),max_handler_us:eu()}),t1=eC("pending"),t2=ew({phase:ek([eC("starting"),eC("upload"),eC("tables")]),received:eu(),expected:ek([eu(),eg()])}),t5=eC("ready"),t4=ek([ew({status:t1,progress:eE(t2)}),ew({status:t5,chunk:eu(),chunks:eu(),bytes:eu(),data:ec()})]);ek([t4,eK]);let t3=ew({status:t1,job:ec()}),t8=ew({released:ef()});ew({job:ec()}),ew({job:ec(),chunk:eu()}),ek([t3,eK]);let t6=ew({accepting:ef(),running:eu(),stored:eu(),bytes:eu(),running_limit:eu(),stored_limit:eu(),bytes_limit:eu(),result_bytes_limit:eu()}),t7=ew({mac:ec(),ip:ec(),band:ec(),rssi_dbm:ek([eu(),eg()]),rx_rate_mbps:ek([eu(),eg()]),tx_rate_mbps:ek([eu(),eg()])}),t9=ek([eC("unknown"),eC("octets"),eC("string"),eC("unsigned_integer"),eC("table"),eC("signed_integer"),eC("pointer"),eC("bit_field"),eC("enumeration"),eC("counter")]),re=ew({id:ec(),url:ec()}),rt=ew({name:ec(),kind:t9,index:eu(),mask:eu(),size:eu(),read:ef(),write:ef(),set_by_create:ef(),avc:ef(),optional:ef(),deprecated:ef(),default_hex:ek([ec(),eg()]),reference:re}),rr=ek([ew({type:eC("unsigned"),value:eu()}),ew({type:eC("signed"),value:eu()}),ew({type:eC("decimal"),value:ec()}),ew({type:eC("text"),value:ek([ec(),eg()])}),ew({type:eC("octets"),hex:ec()}),ew({type:eC("table_length"),bytes:eu()})]),ra=ew({raw_hex:ec(),value:rr,sequences:ev(eu())}),rn=ew({definition:rt,value:ek([rr,eg()]),observations:ev(ra)}),ri=ek([eC("layout"),eC("name_only"),eC("unknown")]),rs=ew({class_id:eu(),name:ek([ec(),eg()]),entities:eu(),records:eu(),support:ri}),ro=ew({code:ec(),message:ec(),offset:eu(),mask:eu()}),rl=ew({class_id:eu(),entity_id:eu(),name:ek([ec(),eg()]),support:ri,reference:ek([re,eg()]),sequences:ev(eu()),attributes:ev(rn),diagnostics:ev(ro)}),rd=eC("ready"),rc=ew({class_id:eu(),entity_id:eu(),sequence:eu(),attribute_mask:eu(),raw_hex:ec(),consumed:eu(),remaining_hex:ec(),undecoded_mask:eu()}),rp=ew({raw_hex:ec(),filter_outer_priority:eu(),filter_outer_vid:eu(),filter_outer_tpid_dei:eu(),filter_inner_priority:eu(),filter_inner_vid:eu(),filter_inner_tpid_dei:eu(),filter_ethertype:eu(),tags_to_remove:eu(),treatment_outer_priority:eu(),treatment_outer_vid:eu(),treatment_outer_tpid_dei:eu(),treatment_inner_priority:eu(),treatment_inner_vid:eu(),treatment_inner_tpid_dei:eu(),delete_entry:ef()}),ru=ew({class_id:eu(),entity_id:eu(),attribute:rt,collected:ef(),error:ek([ec(),eg()]),raw_hex:ec(),rows:ev(ec()),vlan_rules:ev(rp)}),r_=ew({schema_version:eC(1),reference_version:ec(),onu_id:ek([eu(),eg()]),uploaded_complete:ef(),expected_records:eu(),received_records:eu(),decoded_records:eu(),partial_records:eu(),basic_records:eu(),tables_requested:ef(),tables_collected:ef(),classes:ev(rs),entities:ev(rl),records:ev(rc),tables:ev(ru),diagnostics:ev(ro)}),rf=ew({status:rd,report:r_});ew({onu_id:eu(),optical_sn:ec(),tables:ef()});let rb=ek([ew({status:eC("success"),enabled:ef()}),ew({status:eC("error"),error:ec()})]);ew({enabled:ef(),bridge:ec(),wan_upstream:ef(),wan_downstream:ef(),onu_bridge:ef()});let rg=ew({index:ec(),state:ec(),pkt_type:ec(),orig_tuple:ec(),new_tuple:ec(),eth:ec(),vlan:ec(),packets:eu(),bytes:eu(),counters_valid:ef(),packets_exact:ec(),bytes_exact:ec()}),rh=ew({sampled_at_ms:eu(),errors:ev(ec()),config_valid:ef(),engine_valid:ef(),mask_valid:ef(),routed_mask_valid:ef(),debug_valid:ef(),flows_valid:ef(),entries_valid:ef(),counters_valid:ef(),hooks_valid:ef(),total_packets_exact:ec(),total_bytes_exact:ec(),supported:ef(),engine_attached:ef(),bridge_offload_enabled:ef(),wan_upstream:ef(),wan_downstream:ef(),onu_bridge:ef(),bridge_offload_mask:eu(),routed_offload_mask:eu(),bridge_offload_debug:ef(),bridge:ec(),active_ports:ev(ec()),fw4_hooks_ready:ef(),total_entries:eu(),bound_entries:eu(),bound_ipv4_entries:eu(),bound_ipv6_entries:eu(),total_packets:eu(),total_bytes:eu(),bound_flows:ev(rg)}),rm=ew({equipment_id:ek([ec(),eg()]),hardware_version:ek([ec(),eg()]),software_images:ev(ec()),omcc_version:ek([eu(),eg()]),errors:ev(ec())}),rv=ew({desired:eS(ec(),eu()),active:eS(ec(),eu()),pending_restart:ef(),allocation_blocked:ef(),startup_error:ek([ec(),eg()]),config_error:ek([ec(),eg()])}),ry=ek([eC("optical_on"),eC("optical_off"),eC("optical_status"),eC("optical_reload"),eC("optical_reinitialize"),eC("optical_shutdown")]),rw=ew({enabled:ef(),downstream_tx_enabled:ef(),fec_enabled:ef()}),rx=ew({desired_tx_enabled:ef(),desired_fec_enabled:ef(),register:ek([eu(),eg()]),tx_enabled:ek([ef(),eg()]),fec_enabled:ek([ef(),eg()]),error:ek([ec(),eg()])}),rk=ek([eC("success"),eC("error")]),rz=ek([eC("enabled"),eC("disabled"),eC("unknown")]),rj=ew({settings:eE(rw),pon_mac:eE(rx),schema_version:eC(1),status:rk,action:ry,desired_enabled:ek([ef(),eg()]),tx_enabled:ek([ef(),eg()]),actor_state:rz,hardware_ready:ef(),discovery_active:ef(),cleanup_pending:ef(),error:ek([tL,eg()])}),r$=ew({calibration_sha256:eE(ec()),calibration_applied:ef(),model:ec(),wavelength_tx_nm:eu(),wavelength_rx_nm:eu(),phy_rate_downlink_gbps:eu(),phy_rate_uplink_gbps:eu(),tx_power_dbm:ek([eu(),eg()]),laser_bias_current_ma:ek([eu(),eg()]),temperature_celsius:ek([eu(),eg()]),vcc_voltage:ek([eu(),eg()]),cdr_locked:ek([ef(),eg()]),tx_enabled:eE(ef()),measurements:eS(ec(),tE)}),rS=eC("ux3326"),rO=eC("selected"),rC=ew({onu_id:eu(),interface:ek([ec(),eg()])}),rP=ew({optical_control:ef(),transceiver_telemetry:ef(),fpga_diagnostics:ef(),bosa_diagnostics:ef(),calibration_profile:ek([rS,eg()]),npu_offload:ef(),omci_mib:ef(),downstream_fec:ef()}),rE=ew({schema_version:eC(1),selection:rO,platform_id:ec(),vendor:ec(),model:ec(),onus:ev(rC),operations:rP}),rM=ek([eC("o1_initial"),eC("o2_standby"),eC("o3_serial_number"),eC("o4_ranging"),eC("o5_operation"),eC("o6_intermittent_lods"),eC("o7_emergency_stop")]),rI=ew({restarting:eC(!0)}),rR=ew({calls:eu(),failures:eu(),last_us:eu(),max_us:eu(),total_us:eu()}),rN=ew({port:eu(),interface:ec(),carrier:ef(),status:ec(),onu_id:eE(eu()),onu_sn:eE(ec()),link_state:ec(),reserved_sn:eE(ec())}),rD=ew({channel_2g:ek([eu(),eg()]),channel_5g:ek([eu(),eg()]),bandwidth_5g:ek([ec(),eg()]),tx_power_pct:ek([eu(),eg()]),measurements:eS(ec(),tE)}),rA=ew({onu_id:eu(),vendor:ec(),model:ec(),serial_number:ec(),state:rM,business_status:eZ,management:ek([tt,eg()]),provisioning:ek([tg,eg()]),services:ev(ti),ssids:ev(ti),wifi_sync:th,identity:ek([rm,eg()]),identity_age_seconds:ek([eu(),eg()]),identity_current:ef(),fiber_distance_m:ek([eu(),eg()]),ranging_delay_rtd_ns:ek([eu(),eg()]),equalization_delay_bits:ek([eu(),eg()]),optical_rx_power_dbm:ek([eu(),eg()]),optical_tx_power_dbm:ek([eu(),eg()]),firmware_version:ec(),hardware_version:ec(),uptime_seconds:ek([eu(),eg()]),fec:eE(tR),data_path:tM,wifi_mesh:rD,connected_clients:ek([ev(t7),eg()]),measurements:eS(ec(),tE)}),rT=ew({id:ec(),last_seen_sec_ago:eu(),last_payload_bytes:eu()}),rU=ew({ubus:eE(eS(ec(),rR)),jobs:eE(t6),onu_pinning:eE(rv),fpga_status:ec(),pon_mac:eE(rx),provisioning:ek([tj,eg()]),optical_transceiver:r$,switch_ports:ev(rN),sub_gateways:ev(rA),telemetry_gateways:ev(rT),npu:eE(rh),ipc:eE(t0)}),rq=ek([eC("plan"),eC("apply"),eC("management_plan"),eC("management_apply"),eC("reset_state"),eC("reconcile"),eC("retry")]),rL=ek([ew({operation_ids:ev(eu()),revision:ec()}),ew({started:eC(!0),mode:ts}),ew({reset:eC(!0),device:ec()}),ew({operation_ids:ev(eu()),mode:ts,reconcile:eE(ef()),retry:eE(ef())}),eK]);ew({action:rq,target:ec(),management:eE(ef()),item:eE(ec())});let rZ=ek([eC("none"),eC("effective"),eC("pending_add"),eC("pending_change"),eC("pending_remove")]),rB=ew({active_onu_id:ek([eu(),eg()]),desired_onu_id:ek([eu(),eg()]),state:rZ,pending_restart:ef()}),rF=ek([eC("pon_logical"),eC("associated_with"),eC("learned_behind")]),rW=ew({id:ec(),mac:ec(),hostname:ek([ec(),eg()]),addresses:ev(ec()),relation:rF,source:ec(),interface:ek([ec(),eg()])}),rV=ek([eC("ok"),eC("partial"),eC("unavailable")]),rJ=ew({id:ec(),state:rV,sampled_at:eu(),reason:ek([ec(),eg()])}),rX=ek([eC("snapshot_expired"),eC("node_not_found"),eC("invalid_cursor")]),rG=ek([ew({status:eC("ok"),snapshot_id:ec(),parent_node_id:ec(),clients:ev(rW),associated_client_count:ek([eu(),eg()]),learned_host_count:ek([eu(),eg()]),complete:ef(),next_cursor:ek([ec(),eg()]),sources:ev(rJ)}),ew({status:eC("error"),code:rX})]);ew({node_id:ec(),snapshot_id:eE(ec()),cursor:eE(ec()),limit:eE(eu())});let rH=ew({model:ec(),wavelength_tx_nm:eu(),wavelength_rx_nm:eu(),nominal_downlink_gbps:eu(),nominal_uplink_gbps:eu(),tx_power_dbm:ek([eu(),eg()]),laser_bias_current_ma:ek([eu(),eg()]),temperature_celsius:ek([eu(),eg()]),vcc_voltage:ek([eu(),eg()]),tx_enabled:ek([ef(),eg()]),measurements:eS(ec(),tE)}),rK=ew({name:ec(),mac:ek([ec(),eg()]),carrier:ek([ef(),eg()]),speed_mbps:ek([eu(),eg()]),duplex:ek([ec(),eg()]),bridge_members:ev(ec()),addresses:ev(ec())}),rQ=ew({interface:ec(),device:ek([ec(),eg()]),protocol:ek([ec(),eg()]),up:ef(),addresses:ev(ec())}),rY=ew({model:ek([ec(),eg()]),firmware_version:ek([ec(),eg()]),uptime_seconds:ek([eu(),eg()]),fpga_status:ec(),optical:rH,interfaces:ev(rK),uplinks:ev(rQ)}),r0=ew({observer_node_id:ec(),rx_bytes:ek([eu(),eg()]),tx_bytes:ek([eu(),eg()]),current_rx_kbps:ek([eu(),eg()]),current_tx_kbps:ek([eu(),eg()]),onu_inventory:ek([tP,eg()]),offload:t$,measurements:eS(ec(),tE)}),r1=ew({report_revision:eu(),binding_generation:ec(),age_seconds:eu(),ip:ek([ec(),eg()]),bridge_ip:ek([ec(),eg()]),mac:ek([ec(),eg()]),connection_type_raw:ek([ec(),eg()]),uptime_seconds:ek([eu(),eg()]),cpu_usage_raw:ek([eu(),eg()]),memory_usage_raw:ek([eu(),eg()])}),r2=ew({hl202:ek([r1,eg()])}),r5=ew({code:ec(),node_id:ek([ec(),eg()])}),r4=ew({id:ec(),source:ec(),target:ec(),relation:rF,data_interface:ek([ec(),eg()]),carrier:ek([ef(),eg()]),onu_rx_power_dbm:ek([eu(),eg()]),onu_tx_power_dbm:ek([eu(),eg()]),equalization_delay_bits:ek([eu(),eg()]),data_path:ek([r0,eg()]),measurements:eS(ec(),tE)}),r3=ew({serial_number:ek([ec(),eg()]),onu_id:ek([eu(),eg()]),vendor:ek([ec(),eg()]),model:ek([ec(),eg()]),hardware_version:ek([ec(),eg()]),firmware_version:ek([ec(),eg()]),registration:ek([rM,eg()]),business:ek([eZ,eg()]),management:ek([tt,eg()]),provisioning:ek([tg,eg()]),services:ev(ti),ssids:ev(ti),wifi_sync:ek([th,eg()]),identity:ek([rm,eg()]),identity_current:ef(),identity_age_seconds:ek([eu(),eg()]),uptime_seconds:ek([eu(),eg()]),fec:ek([tR,eg()]),binding:rB,extensions:r2,measurements:eS(ec(),tE)}),r8=ek([ej(ew({kind:eC("controller")}),rY),ej(ew({kind:eC("onu")}),r3)]),r6=ew({id:ec(),label:ec(),detail:r8}),r7=ek([ew({status:eC("ok"),snapshot_id:ec(),node:r6}),ew({status:eC("error"),code:rX})]);ew({node_id:ec(),snapshot_id:eE(ec())});let r9=ew({schema_version:eC(1),snapshot_id:ec(),generated_at:eu(),snapshot_ttl_seconds:eu(),nodes:ev(r6),links:ev(r4),sources:ev(rJ),issues:ev(r5)}),ae=ew({error:ek([ec(),ew({code:ec(),message:ec()})])});class at extends Error{code;constructor(e,t){super(t),this.code=e,this.name="RpcError"}}function ar(e){let t=ae.safeParse(e);if(t.success){let e=t.data.error;throw"string"==typeof e?new at("rpc",e):new at(e.code,e.message)}return e}let aa={parse(e){let t=tX.parse(ar(e));if("object"==typeof t&&null!==t&&"error"in t)throw ar(t),Error("Unexpected RPC error");return t}},an={parse(e){let t=rL.parse(ar(e));if("error"in t)throw Error(t.error);return t}};eS(ec(),ew({carrier:eE(ef()),mac:eE(ec()),link:eE(ew({speed:eE(eu()),duplex:eE(ec()),autoneg:eE(ef())})),stats:eE(eS(ec(),eu()))}));let ai={getCapabilities:{parse:e=>e2.parse(ar(e))},getPlatformInfo:{parse:e=>rE.parse(ar(e))},opticalStatus:rj,opticalSet:rj,getStatus:{parse:e=>rU.parse(ar(e))},getTopology:{parse:e=>r9.parse(ar(e))},getTopologyNode:{parse:e=>r7.parse(ar(e))},getTopologyClients:{parse:e=>rG.parse(ar(e))},getSync:{parse:e=>tj.parse(ar(e))},configCheck:{parse(e){if("object"==typeof e&&null!==e&&"error"in e&&("valid"in e||"revision"in e||"devices"in e))throw Error("Mixed configuration check result");return e5.parse(e)}},npuStatus:rh,configReload:{parse:e=>tj.parse(ar(e))},restartService:{parse:e=>rI.parse(ar(e))},sync:{parse:e=>an.parse(ar(e))},npuSet:rb,mibStart:{parse:e=>t3.parse(ar(e))},mibResult:{parse:e=>t4.parse(ar(e))},jobRelease:{parse:e=>t8.parse(ar(e))},hl202List:{parse:e=>aa.parse(ar(e))},hl202Report:{parse:e=>t3.parse(ar(e))},hl202AccountsStart:{parse:e=>t3.parse(ar(e))},hl202AccountUpdate:{parse:e=>t3.parse(ar(e))},hl202ExecStart:{parse:e=>t3.parse(ar(e))},jobResult:{parse:e=>t4.parse(ar(e))},getCalibration:{parse:e=>eH.parse(ar(e))},selectCalibration:{parse:e=>eH.parse(ar(e))},saveCalibration:{parse:e=>eQ.parse(ar(e))},applyCalibration:{parse:e=>t3.parse(ar(e))}};function as(){var e;let t,r,n,i,s,o,l,d,c,p,u,f,b,g,h,m,v,y,w,x,k,z,j,$,S,O,C,P;return a??=(e=L.rpc,t=e.declare({object:"fttr",method:"get_capabilities",reject:!0}),r=e.declare({object:"fttr",method:"get_platform_info",reject:!0}),n=e.declare({object:"fttr",method:"optical_status",reject:!0}),i=e.declare({object:"fttr",method:"optical_set",params:["enabled","downstream_tx_enabled","fec_enabled"],reject:!0}),s=e.declare({object:"fttr",method:"get_status",reject:!0}),o=e.declare({object:"fttr",method:"get_topology",reject:!0}),l=e.declare({object:"fttr",method:"get_topology_node",params:["node_id","snapshot_id"],reject:!0}),d=e.declare({object:"fttr",method:"get_topology_clients",params:["node_id","snapshot_id","cursor","limit"],reject:!0}),c=e.declare({object:"fttr",method:"get_sync",reject:!0}),p=e.declare({object:"fttr",method:"config_check",reject:!0}),u=e.declare({object:"fttr",method:"npu_status",reject:!0}),f=e.declare({object:"fttr",method:"config_reload",reject:!0}),b=e.declare({object:"fttr",method:"restart_service",reject:!0}),g=e.declare({object:"fttr",method:"sync",params:["action","target","management","item"],reject:!0}),h=e.declare({object:"fttr",method:"npu_set",params:["enabled","bridge","wan_upstream","wan_downstream","onu_bridge"],reject:!0}),m=e.declare({object:"fttr",method:"mib_start",params:["onu_id","optical_sn","tables"],reject:!0}),v=e.declare({object:"fttr",method:"mib_result",params:["job","chunk"],reject:!0}),y=e.declare({object:"fttr",method:"job_release",params:["job"],reject:!0}),w=e.declare({object:"fttr",method:"hl202_list",reject:!0}),x=e.declare({object:"fttr",method:"hl202_report",params:["target"],reject:!0}),k=e.declare({object:"fttr",method:"hl202_accounts_start",params:["target"],reject:!0}),z=e.declare({object:"fttr",method:"hl202_account_update",params:["target","kind","entry","password","active"],reject:!0}),j=e.declare({object:"fttr",method:"hl202_exec_start",params:["target","script","timeout_seconds"],reject:!0}),$=e.declare({object:"fttr",method:"job_result",params:["job","chunk"],reject:!0}),S=e.declare({object:"fttr",method:"get_calibration",reject:!0}),O=e.declare({object:"fttr",method:"select_calibration",params:["source"],reject:!0}),C=e.declare({object:"fttr",method:"save_calibration",params:["data"],reject:!0}),P=e.declare({object:"fttr",method:"apply_calibration",reject:!0}),{getCapabilities:async()=>ai.getCapabilities.parse(await t()),getPlatformInfo:async()=>ai.getPlatformInfo.parse(await r()),opticalStatus:async()=>ai.opticalStatus.parse(await n()),opticalSet:async e=>ai.opticalSet.parse(await i(e.enabled,e.downstream_tx_enabled,e.fec_enabled)),getStatus:async()=>ai.getStatus.parse(await s()),getTopology:async()=>ai.getTopology.parse(await o()),getTopologyNode:async e=>ai.getTopologyNode.parse(await l(e.node_id,e.snapshot_id)),getTopologyClients:async e=>ai.getTopologyClients.parse(await d(e.node_id,e.snapshot_id,e.cursor,e.limit)),getSync:async()=>ai.getSync.parse(await c()),configCheck:async()=>ai.configCheck.parse(await p()),npuStatus:async()=>ai.npuStatus.parse(await u()),configReload:async()=>ai.configReload.parse(await f()),restartService:async()=>ai.restartService.parse(await b()),sync:async e=>ai.sync.parse(await g(e.action,e.target,e.management,e.item)),npuSet:async e=>ai.npuSet.parse(await h(e.enabled,e.bridge,e.wan_upstream,e.wan_downstream,e.onu_bridge)),mibStart:async e=>ai.mibStart.parse(await m(e.onu_id,e.optical_sn,e.tables)),mibResult:async e=>ai.mibResult.parse(await v(e.job,e.chunk)),jobRelease:async e=>ai.jobRelease.parse(await y(e.job)),hl202List:async()=>ai.hl202List.parse(await w()),hl202Report:async e=>ai.hl202Report.parse(await x(e.target)),hl202AccountsStart:async e=>ai.hl202AccountsStart.parse(await k(e.target)),hl202AccountUpdate:async e=>ai.hl202AccountUpdate.parse(await z(e.target,e.kind,e.entry,e.password,e.active)),hl202ExecStart:async e=>ai.hl202ExecStart.parse(await j(e.target,e.script,e.timeout_seconds)),jobResult:async e=>ai.jobResult.parse(await $(e.job,e.chunk)),getCalibration:async()=>ai.getCalibration.parse(await S()),selectCalibration:async e=>ai.selectCalibration.parse(await O(e.source)),saveCalibration:async e=>ai.saveCalibration.parse(await C(e.data)),applyCalibration:async()=>ai.applyCalibration.parse(await P())})}let ao=async()=>as().getStatus(),al=async()=>as().getPlatformInfo(),ad=async(e,t,r)=>as().mibStart({onu_id:e,optical_sn:t,tables:r}),ac=async(e,t)=>as().mibResult({job:e,chunk:t}),ap=async e=>as().jobRelease({job:e});function au(e){let t="none"===e.tone?"":`fttr-badge fttr-badge-${e.tone}`,r=e.class?` ${e.class}`:"",a=d("span",{class:`${t}${r}`.trim(),children:e.children});return e.title&&a.setAttribute("title",e.title),a}let a_={o1_initial:_("O1 Initial"),o2_standby:_("O2 Standby"),o3_serial_number:_("O3 Serial Number"),o4_ranging:_("O4 Ranging"),o5_operation:_("O5 (Operation)"),o6_intermittent_lods:_("O6 Intermittent LODS"),o7_emergency_stop:_("O7 Emergency Stop")};function af(e){var t;let r=(t=e.state)?"o5_operation"===t?{tone:"success",label:a_.o5_operation,title:t}:{tone:"warning",label:a_[t]??c(t),title:t}:{tone:"none",label:"—"};return d(au,{tone:r.tone,title:r.title,children:r.label})}function ab(e){var t;let r=(t=e.status)?{tone:"verified"===t.phase?"success":t.error||"wan_bootstrap_pending"===t.phase?"warning":"neutral",label:`${({not_started:_("Not started"),collecting_identity:_("Collecting identity"),retrying_identity:_("Retrying identity"),unsupported:_("Unsupported"),configuring:_("Configuring"),verifying:_("Verifying"),wan_bootstrap_pending:_("WAN pending"),verified:_("Verified"),retrying:_("Retrying"),offline:_("Offline")})[t.phase]} \xb7 ${t.generation}${t.error?` \xb7 ${t.error}`:""}`,title:t.error||void 0}:{tone:"neutral",label:"—"};return d(au,{tone:r.tone,title:r.title,children:r.label})}let ag={online:_("Online"),waiting_inform:_("Waiting Inform"),offline_or_stale:_("Offline or stale")};function ah(e){var t;let r,a,n,i,s,o,l=(t=e.management,r=t?.state,a=u(t?.age_seconds??(t?.last_inform?Math.max(0,Math.floor(Date.now()/1e3)-t.last_inform):null)),i=(n=t?.last_inform?new Date(1e3*t.last_inform).toLocaleString():null)?_("Last Inform: %s").replace("%s",n):void 0,s="—",o="none","online"===r?(o="success",s=ag.online):"waiting_inform"===r?(o="warning",s=ag.waiting_inform):"offline_or_stale"===r?(o="danger",s=ag.offline_or_stale):r&&(o="neutral",s=c(r)),{tone:o,label:a&&r?`${s} \xb7 ${a}`:s,title:i});return d(au,{tone:l.tone,title:l.title,children:l.label})}let am={disabled:_("Disabled"),waiting:_("Waiting"),wan_reconciling:_("WAN reconciling"),wan_verifying:_("WAN verifying"),wifi_reconciling:_("Wi-Fi reconciling"),discovering:_("Discovering"),reading:_("Reading"),disabling:_("Disabling"),disabling_read:_("Disabling read"),writing:_("Writing"),verifying:_("Verifying"),settling:_("Settling"),completed:_("Completed"),interrupted:_("Interrupted"),recovering:_("Recovering"),waiting_management:_("Waiting management"),waiting_task:_("Waiting task"),reset_pending:_("Reset pending"),failed:_("Failed"),error:_("Error"),blocked:_("Blocked"),not_started:_("Not started")};function av(e){var t,r;let a,n,i,s=(t=e.provisioning,r=e.title,a=t?.state,n=t?.next_retry_at&&t.next_retry_at>Math.floor(Date.now()/1e3)?t.next_retry_at-Math.floor(Date.now()/1e3):0,i=r??(t?.current_revision===!1?_("Previous configuration"):t?.management_fresh===!1?_("Management stale"):t?.reconcile_reason?t.reconcile_reason:n>0?_("Next self-healing retry in %d seconds").replace("%d",String(n)):t?.reason??t?.error),a&&"not_started"!==a?"disabled"===a?{tone:"neutral",label:am.disabled}:"completed"===a||"verified"===a?{tone:"success",label:"completed"===a?am.completed:_("Ready"),title:i}:"wan_reconciling"===a||"wan_verifying"===a||"wifi_reconciling"===a||"discovering"===a||"reading"===a||"disabling"===a||"disabling_read"===a||"writing"===a||"verifying"===a||"settling"===a||"recovering"===a||"waiting_task"===a?{tone:"info",label:am[a]??c(a),title:i}:"interrupted"===a||"failed"===a||"error"===a||"blocked"===a?{tone:"danger",label:"blocked"===a?am.blocked:am.interrupted,title:i}:"waiting"===a||"pending"===a||"waiting_management"===a||"reset_pending"===a?{tone:"warning",label:am[a]??am.waiting,title:i}:{tone:"neutral",label:c(a),title:i}:{tone:"neutral",label:am.not_started,title:i});return d(au,{tone:s.tone,title:s.title,children:s.label})}let ay={disabled:_("Disabled"),not_configured:_("Not configured"),stale_revision:_("Stale revision"),stale_management:_("Stale management"),verified:_("Verified"),attention_required:_("Attention required"),accepted_unverified:_("Unverified"),pending:_("Pending"),recovering:_("Recovering"),waiting_management:_("Waiting management")};function aw(e){var t;let r=(t=e.state)&&"not_configured"!==t?"disabled"===t?{tone:"neutral",label:ay.disabled}:"verified"===t?{tone:"success",label:ay.verified}:"attention_required"===t?{tone:"danger",label:ay.attention_required}:"stale_revision"===t||"stale_management"===t||"waiting_management"===t?{tone:"warning",label:ay[t]}:"recovering"===t?{tone:"info",label:ay.recovering}:"accepted_unverified"===t||"pending"===t?{tone:"warning",label:ay[t]}:{tone:"neutral",label:c(t)}:{tone:"neutral",label:ay.not_configured};return d(au,{tone:r.tone,title:r.title,children:r.label})}let ax=`
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
`,ak=e=>JSON.stringify(e,null,2);async function az(e){let t=["{"],r=!0;for(let[a,n]of Object.entries(e))if(r||t.push(","),r=!1,t.push(JSON.stringify(a),":"),Array.isArray(n)){t.push("[");for(let e=0;e<n.length;e++){e&&t.push(",");let r=JSON.stringify(n[e]);if(void 0===r)throw Error(_("MIB snapshot cannot be serialized"));t.push(r),e%32==31&&await new Promise(e=>setTimeout(e,0))}t.push("]")}else{let e=JSON.stringify(n);if(void 0===e)throw Error(_("MIB snapshot cannot be serialized"));t.push(e)}return t.push("}"),new Blob(t,{type:"application/json"})}function aj(e){let t=e.reference;return t?.url.startsWith("https://github.com/opencord/omci-lib-go/blob/v2.2.4/")?d("a",{href:t.url,target:"_blank",rel:"noopener noreferrer",children:t.id}):d("span",{children:"—"})}function a$(e,t){var r,a,n,i,s,o,l,u,f,b,g,h,m,v,y,w,x,k,z;let j=e.optical_transceiver,$=e.pon_mac,S=d("span",{class:`fttr-badge ${"ready"===e.fpga_status?"fttr-badge-success":"fttr-badge-neutral"}`,style:"font-size:95%",children:"ready"===e.fpga_status?_("Ready"):c(e.fpga_status)}),O=[];return t.operations.fpga_diagnostics&&O.push((i={class:"fttr-card",children:[d("h4",{style:"margin-top:0;margin-bottom:8px;font-size:95%",children:_("FPGA status")}),(r={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:"0x01000004"}),d("code",{children:$?.register==null?_("Unknown"):`0x${$.register.toString(16).padStart(8,"0")}`})]},d("div",r)),$?.error?d("p",{class:"alert-message warning",children:$.error}):null,(a={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:_("FPGA status")}),d("span",{children:S})]},d("div",a)),(n={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:_("FPGA identifier")}),d("code",{children:c(e.fpga_status)})]},d("div",n))]},d("div",i))),t.operations.transceiver_telemetry&&(O.push((g={class:"fttr-card",children:[d("h4",{style:"margin-top:0;margin-bottom:8px;font-size:95%",children:_("Optical transceiver")}),(o={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:_("Module model")}),d("strong",{children:c(j.model)})]},d("div",o)),(l={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:_("TX wavelength")}),d("span",{children:j.wavelength_tx_nm?`${j.wavelength_tx_nm} nm`:"—"})]},d("div",l)),(u={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:_("RX wavelength")}),d("span",{children:j.wavelength_rx_nm?`${j.wavelength_rx_nm} nm`:"—"})]},d("div",u)),(b={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:_("CDR lock")}),(f={children:null===(s=j.cdr_locked)?d("span",{class:"fttr-badge fttr-badge-neutral",children:_("Unknown")}):s?d("span",{class:"fttr-badge fttr-badge-success",children:_("Locked")}):d("span",{class:"fttr-badge fttr-badge-warning",children:_("Unlocked")})},d("span",f))]},d("div",b))]},d("div",g))),O.push((k={class:"fttr-card",children:[d("h4",{style:"margin-top:0;margin-bottom:8px;font-size:95%",children:_("Physical rates and diagnostics")}),(h={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:_("Downlink PHY rate")}),d("span",{children:j.phy_rate_downlink_gbps?`${j.phy_rate_downlink_gbps} Gbps`:"—"})]},d("div",h)),(m={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:_("Uplink PHY rate")}),d("span",{children:j.phy_rate_uplink_gbps?`${j.phy_rate_uplink_gbps} Gbps`:"—"})]},d("div",m)),(v={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:_("Temperature")}),d("span",{children:null==j.temperature_celsius?"—":`${j.temperature_celsius} \xb0C`})]},d("div",v)),(y={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:_("TX power")}),d("span",{children:p(j.tx_power_dbm)})]},d("div",y)),(w={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:_("Voltage")}),d("span",{children:null==j.vcc_voltage?"—":`${j.vcc_voltage} V`})]},d("div",w)),(x={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:_("Bias current")}),d("span",{children:null==j.laser_bias_current_ma?"—":`${j.laser_bias_current_ma} mA`})]},d("div",x))]},d("div",k)))),z={class:"cbi-section fttr-panel-controller",children:[d("h3",{style:"margin-bottom:12px",children:_("Controller hardware")}),O.length?d("div",{class:"fttr-grid-3",children:O}):d("p",{children:_("No controller diagnostics are reported by the selected platform.")})]},d("div",z)}function aS(e){var t,r;return e.length?(t={class:"fttr-panel-subgateways",children:e.map(e=>{var t,r,a,n,i,s,o,f,b,g,h,m,v,y,w,x,k,z,j,$,S,O,C;let P=e.identity,M=P?.software_images??[],I=function(e){if(!e)return{display:"—"};let t=e.match(/image\s*\d+:\s*([^;,\s]+)/i);return t?.[1]?{display:t[1],full:e.replace(/;\s*/g,"\n")}:{display:e}}(e.firmware_version),R=e.identity?e.identity_current?_("Current registration"):_("Cached identity"):_("Not collected"),N=d("span",{class:`fttr-badge ${e.identity_current?"fttr-badge-info":"fttr-badge-neutral"}`,style:"font-size:80%",children:R});return C={class:"cbi-section fttr-onu-card",children:[(s={class:"fttr-card-header",children:[(a={class:"fttr-card-title-group",children:[d("h3",{style:"margin:0",children:_("Sub-gateway %s — %s").replace("%s",String(e.onu_id)).replace("%s",c(e.model))}),(r={class:"fttr-card-meta-tags",children:[d("span",{class:"fttr-badge fttr-badge-neutral",children:e.vendor}),d("code",{children:e.serial_number}),(t=e.state)?"o5_operation"===t||"online"===t||"ready"===t||"connected"===t?d("span",{class:"fttr-badge fttr-badge-success",title:t,children:"o5_operation"===t?_("Connected"):_("Ready")}):t.includes("O4")||t.includes("ranging")||t.includes("sync")?d("span",{class:"fttr-badge fttr-badge-warning",title:t,children:t}):d("span",{class:"fttr-badge fttr-badge-neutral",title:t,children:t}):d("span",{class:"fttr-badge fttr-badge-neutral",children:"—"}),N]},d("div",r))]},d("div",a)),(i={children:(n={type:"button",class:"fttr-btn-subtle",onclick:()=>(function(e){var t,r,a,n,i,s,o,u,f,b,g,h;let m=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"basic",v=!1,y=!1,w=null,x=null,k=(t={class:"onu-basic-container",children:[{title:_("Device identification"),rows:[[_("Vendor"),e.vendor],[_("Model"),e.identity?.equipment_id??e.model],[_("Optical serial"),d("code",{style:"font-size:90%",children:e.serial_number})],[_("ONU ID"),e.onu_id],[_("Hardware version"),e.identity?.hardware_version??e.hardware_version],[_("Software images"),e.identity?.software_images?.join(", ")??e.firmware_version],[_("OMCC version"),e.identity?.omcc_version==null?null:d("code",{style:"font-size:90%",children:["0x",e.identity.omcc_version.toString(16)]})]]},{title:_("Optical & link status"),rows:[[_("Registration"),d(af,{state:e.state})],[_("Business"),d(ab,{status:e.business_status})],[_("Receive optical power"),p(e.optical_rx_power_dbm)],[_("Transmit optical power"),p(e.optical_tx_power_dbm)],[_("Equalization delay (EQD)"),null==e.equalization_delay_bits?"—":d("code",{style:"font-size:90%",children:[e.equalization_delay_bits," bits"]})],[_("Data interface"),e.data_path?.interface?d("code",{style:"font-size:90%",children:e.data_path.interface}):null],[_("Uptime"),null==e.uptime_seconds?null:`${function(e){if(null==e||!Number.isFinite(e)||e<0)return"—";let t=Math.floor(e),r=Math.floor(t/86400),a=Math.floor(t%86400/3600),n=Math.floor(t%3600/60),i=[];return r>0&&i.push(`${r}d`),(a>0||r>0)&&i.push(`${a}h`),(n>0||a>0||r>0)&&i.push(`${n}m`),i.push(`${t%60}s`),i.join(" ")}(e.uptime_seconds)} (${Math.floor(e.uptime_seconds)} s)`]]},{title:_("Management & cache"),rows:[[_("CWMP"),d(ah,{management:e.management})],[_("Last Inform"),e.management?.last_inform?`${new Date(1e3*e.management.last_inform).toLocaleString()}${null!=e.management.age_seconds?` (${e.management.age_seconds} s)`:""}`:null],[_("Provisioning"),d(av,{provisioning:e.provisioning})],[_("Wi-Fi sync"),d(aw,{state:e.wifi_sync})],[_("Identity source"),e.identity?!1===e.identity_current?_("Cached identity"):!0===e.identity_current?_("Current registration"):_("Registration freshness unavailable"):_("Not collected")],[_("Identity age"),null==e.identity_age_seconds?null:`${e.identity_age_seconds} s`],[_("Identity read errors"),e.identity?.errors?.join("; ")]]}].map(e=>{var t,r,a;return a={class:"cbi-section onu-basic-section",children:[d("h3",{class:"onu-basic-title",children:e.title}),(r={class:"table onu-basic-table",children:(t={children:e.rows.map(e=>{var t;let[r,a]=e;return t={children:[d("th",{style:"width:35%",children:r}),d("td",{children:a instanceof Node?a:c(a)})]},d("tr",t)})},d("tbody",t))},d("table",r))]},d("div",a)})},d("div",t)),z=(r={class:"mib-status-bar",role:"status",children:d("span",{class:"mib-hint-text",children:_("Read MIB on demand. Results are a snapshot, not live polling.")})},d("div",r)),j=(a={class:"cbi-progressbar",style:"display:none;width:100%",title:"0%",children:d("div",{style:"width:0%"})},d("div",a)),$=d("div",{}),S=d("pre",{class:"onu-raw-pre"}),O=d("span",{class:"download-status",role:"status"}),C=null,P=d("button",{type:"button",class:"cbi-button cbi-button-action",disabled:!0,onclick:async()=>{if(w&&!v){P.disabled=!0,O.textContent=_("Preparing JSON download…");try{let t=await az(w);if(v)return;C&&URL.revokeObjectURL(C),C=URL.createObjectURL(t);let r=document.createElement("a");r.href=C,r.download=`mib-${e.serial_number}.json`,r.click(),O.textContent=_("JSON download started"),window.setTimeout(()=>{URL.revokeObjectURL(r.href),C===r.href&&(C=null)},1e3)}catch(e){O.textContent=String(e)}finally{P.disabled=!w||v}}},children:_("Download JSON")}),M=(i={class:"onu-raw-panel",children:[(n={class:"onu-raw-toolbar",children:[d("span",{class:"onu-raw-hint",children:_("This is a lightweight preview. Download JSON to save the complete MIB snapshot.")}),d("div",{class:"onu-raw-actions",children:[P,O]})]},d("div",n)),S]},d("div",i)),I=d("button",{type:"button",class:"cbi-button cbi-button-apply",onclick:()=>B(!1),children:_("Read MIB")}),R=d("button",{type:"button",class:"cbi-button cbi-button-action",onclick:()=>B(!0),children:_("Read MIB and VLAN tables")}),N=(u={class:"onu-mib-panel",children:[(o={class:"mib-controls",children:[(s={class:"mib-action-group",children:[I,R,d("small",{class:"mib-action-hint",children:_("Collecting VLAN tables queries extended filter tables and takes longer.")})]},d("div",s)),z,j]},d("div",o)),$]},d("div",u)),D={basic:k,mib:N,raw:M},A=new Map;function T(e){for(let[t,r]of Object.entries(D))t===e?r.style.removeProperty("display"):r.style.setProperty("display","none","important");for(let[t,r]of A)r.className=t===e?"cbi-tab":"cbi-tab-disabled"}let U=(f={class:"cbi-tabmenu",style:"margin:0;padding-left:0;display:flex;flex-wrap:wrap",children:[{id:"basic",label:_("Basic information")},{id:"mib",label:"OMCI / MIB"},{id:"raw",label:_("Raw JSON")}].map(e=>{var t;let r=(t={class:e.id===m?"cbi-tab":"cbi-tab-disabled","data-tab":e.id,children:d("a",{href:`#tab-${e.id}`,onclick:t=>{t.preventDefault(),T(e.id)},children:e.label})},d("li",t));return A.set(e.id,r),r})},d("ul",f)),q=(h={children:[d("div",{class:"onu-details-header",children:U}),(b={class:"onu-details-dialog",children:[d("style",{children:`
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
				${ax}
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
				`}),k,N,M]},d("div",b)),(g={class:"right onu-details-footer",children:d("button",{type:"button",class:"cbi-button",onclick:()=>{v=!0,C&&URL.revokeObjectURL(C),C=null,w=null,S.textContent="",$.replaceChildren(),L.ui.hideModal()},children:_("Close")})},d("div",g))]},d(l,h)),Z=()=>!v&&q.isConnected&&q.getClientRects().length>0;async function B(t){if(!y){y=!0,I.disabled=R.disabled=!0,j.style.display="",j.title="0%",j.firstElementChild.style.width="0%",z.textContent=_("Reading MIB…");try{let v=await ao(),y=v.sub_gateways?.find(t=>t.serial_number===e.serial_number);if(y?.state!=="o5_operation")throw Error(_("Device is offline; reopen details after registration."));if(!Z())return;let k=await ad(y.onu_id,y.serial_number,t);x=k.job;let O=Date.now()+14e4;for(;Z();){let e=await ac(k.job,0);if(!Z())return;if("ready"===e.status){var r,a,n,i,s,o,l,p,u,f,b,g,h,m;if(!e.chunks||e.chunks>1024||!e.bytes||e.bytes>0x2000000||0!==e.chunk||!e.data)throw Error(_("Invalid MIB snapshot"));let t=new Uint8Array(e.bytes),v=0;for(let r=0;r<e.chunks;r++){let a=0===r?e:await ac(k.job,r);if(!Z())return;if("ready"!==a.status||a.chunk!==r||a.chunks!==e.chunks||a.bytes!==e.bytes||!a.data)throw Error(_("Invalid MIB snapshot chunk"));let n=atob(a.data);if(n.length>32768||v+n.length>t.length)throw Error(_("Invalid MIB snapshot size"));for(let e=0;e<n.length;e++)t[v++]=n.charCodeAt(e);let i=Math.min(100,Math.round((r+1)/e.chunks*100));j.title=`${i}%`,j.firstElementChild.style.width=`${i}%`,z.textContent=`${_("Downloading MIB snapshot")}: ${r+1}/${e.chunks}`}if(v!==t.length)throw Error(_("Incomplete MIB snapshot"));if(await F(),w=rf.parse(ar(JSON.parse(new TextDecoder("utf-8",{fatal:!0}).decode(t)))).report,1!==w.schema_version||w.onu_id!==y.onu_id)throw Error(_("Unexpected MIB response"));j.style.display="none",z.replaceChildren((r=w,b={class:"mib-chips",children:[(n={class:"mib-chip mib-chip-primary",children:["ONU ",r.onu_id]},d("span",n)),(i={class:`mib-chip ${r.uploaded_complete?"mib-chip-success":"mib-chip-warning"}`,children:r.uploaded_complete?_("Upload complete"):_("Upload incomplete")},d("span",i)),(s={class:"mib-chip mib-chip-info",children:[_("Records"),": ",r.received_records,r.expected_records!==r.received_records?` / ${r.expected_records}`:""]},d("span",s)),(o={class:"mib-chip",children:[_("Decoded"),": ",r.decoded_records]},d("span",o)),r.partial_records>0?(l={class:"mib-chip mib-chip-warning",children:[_("Partial"),": ",r.partial_records]},d("span",l)):null,(p={class:"mib-chip mib-chip-neutral",children:[_("Basic"),": ",r.basic_records]},d("span",p)),(u={class:"mib-chip",children:r.tables_collected?_("VLAN tables collected"):_("VLAN tables not collected")},d("span",u)),(f={class:"mib-chip mib-chip-subtle",children:new Date().toLocaleTimeString()},d("span",f))]},d("div",b))),$.replaceChildren(function(e){var t,r,a,n,i,s;let o=e.classes.length?e.classes[0].class_id:null,l=(t={class:"mib-content"},d("div",t)),p=(r={type:"search",class:"cbi-input-text mib-search-input",placeholder:_("Search ME name or Class ID…")},d("input",r)),u=(a={class:"mib-class-list"},d("div",a)),f=new Map;function b(t){var r,a;for(let[e,r]of(o=t,f))e===t?r.classList.add("active"):r.classList.remove("active");let n=e.entities.filter(e=>e.class_id===t);n.length?l.replaceChildren(...n.map((r,a)=>{var n,i,s,o,l,p,u,f,b,g,h,m,v,y,w,x,k,z,j;return j={open:0===a,class:"mib-entity-details",children:[(l={class:"mib-entity-summary",children:[(s={class:"mib-entity-title",children:[(n={children:c(r.name)},d("strong",n)),(i={class:"mib-entity-id-tag",children:[_("Entity")," ",r.entity_id," (0x",r.entity_id.toString(16),")"]},d("span",i))]},d("span",s)),(o={class:"mib-entity-support",children:r.support},d("span",o))]},d("summary",l)),(z={class:"mib-entity-body",children:[r.attributes.length?(v={class:"table mib-attributes-table",children:[(h={children:(g={children:[(p={style:"width:28%",children:_("Attribute")},d("th",p)),(u={style:"width:14%",children:_("Type")},d("th",u)),(f={children:_("Value")},d("th",f)),(b={style:"width:18%",children:_("Definition")},d("th",b))]},d("tr",g))},d("thead",h)),(m={children:r.attributes.map(e=>{var t,r,a,n,i,s,o,l,p,u;return u={children:[(t={class:"mib-attr-name",children:e.definition.name},d("td",t)),(a={class:"mib-attr-kind",children:(r={children:e.definition.kind},d("code",r))},d("td",a)),(l={class:"mib-attr-value",children:[(n={class:"mib-val-display",children:function(e){if(null===e)return _("Conflicting values; inspect observations");switch(e.type){case"unsigned":case"signed":case"decimal":case"text":return c(e.value);case"octets":return c(e.hex);case"table_length":return c(e.bytes);default:throw new at("unexpected_variant",`Unexpected variant: ${String(e)}`)}}(e.value)},d("span",n)),e.observations?.length?(o={class:"mib-obs-details",children:[(i={children:_("Raw data / observations")},d("summary",i)),(s={class:"mib-pre",children:ak(e.observations)},d("pre",s))]},d("details",o)):null]},d("td",l)),(p={class:"mib-attr-ref",children:aj(e.definition)},d("td",p))]},d("tr",u)})},d("tbody",m))]},d("table",v)):(y={children:_("Basic display only; raw records are preserved.")},d("p",y)),e.tables.filter(e=>e.class_id===t&&e.entity_id===r.entity_id).map(e=>{var t,r,a,n,i,s,o,l,p,u,f,b,g,h,m,v;return v={class:"mib-table-details",children:[(t={children:[e.attribute.name," ·"," ",e.collected?`${e.rows.length} ${_("rows")}`:c(e.error)]},d("summary",t)),e.vlan_rules.length?(g={class:"mib-table-overflow",children:(b={class:"table",children:[(u={children:(p={children:[(r={children:_("Outer filter (priority / VID / TPID-DEI)")},d("th",r)),(a={children:_("Inner filter (priority / VID / TPID-DEI)")},d("th",a)),(n={children:_("EtherType code")},d("th",n)),(i={children:_("Remove tags")},d("th",i)),(s={children:_("Outer treatment (priority / VID / TPID-DEI)")},d("th",s)),(o={children:_("Inner treatment (priority / VID / TPID-DEI)")},d("th",o)),(l={children:_("Delete entry")},d("th",l))]},d("tr",p))},d("thead",u)),(f={children:e.vlan_rules.map(e=>{var t,r,a,n,i,s,o,l;return l={children:[(t={children:`${e.filter_outer_priority} / ${e.filter_outer_vid} / ${e.filter_outer_tpid_dei}`},d("td",t)),(r={children:`${e.filter_inner_priority} / ${e.filter_inner_vid} / ${e.filter_inner_tpid_dei}`},d("td",r)),(a={children:c(e.filter_ethertype)},d("td",a)),(n={children:c(e.tags_to_remove)},d("td",n)),(i={children:`${e.treatment_outer_priority} / ${e.treatment_outer_vid} / ${e.treatment_outer_tpid_dei}`},d("td",i)),(s={children:`${e.treatment_inner_priority} / ${e.treatment_inner_vid} / ${e.treatment_inner_tpid_dei}`},d("td",s)),(o={children:c(e.delete_entry)},d("td",o))]},d("tr",l)})},d("tbody",f))]},d("table",b))},d("div",g)):null,(h={style:"margin-top:6px",children:[_("G.988 encoded field values"),": ",aj(e.attribute)]},d("p",h)),(m={class:"mib-pre",children:ak(e.vlan_rules.length?e.vlan_rules:e.rows)},d("pre",m))]},d("details",v)}),(k={class:"mib-diag-details",children:[(w={children:_("Records / diagnostics")},d("summary",w)),(x={class:"mib-pre",children:ak({diagnostics:r.diagnostics,records:e.records.filter(e=>e.class_id===t&&e.entity_id===r.entity_id)})},d("pre",x))]},d("details",k))]},d("div",z))]},d("details",j)})):l.replaceChildren((a={class:"mib-empty-content",children:(r={children:_("No entities recorded for this ME class.")},d("p",r))},d("div",a)))}function g(){var t;let r=p.value.trim().toLowerCase();f.clear();let a=e.classes.filter(e=>`${e.class_id} ${e.name??""}`.toLowerCase().includes(r));a.length?u.replaceChildren(...a.map(e=>{var t,r,a,n;let i=(n={type:"button",class:`mib-class-btn${e.class_id===o?" active":""}`,onclick:()=>b(e.class_id),children:[(t={class:"mib-class-id",children:e.class_id},d("span",t)),(r={class:"mib-class-name",title:e.name??_("Unknown class"),children:e.name??_("Unknown class")},d("span",r)),(a={class:"mib-class-count",children:e.entities},d("span",a))]},d("button",n));return f.set(e.class_id,i),i})):u.replaceChildren((t={class:"mib-empty-list",children:_("No matching ME classes")},d("div",t)))}return p.addEventListener("input",g),g(),e.classes.length&&b(e.classes[0].class_id),s={class:"mib-browser",children:[(i={class:"mib-sidebar",children:[(n={class:"mib-search-box",children:p},d("div",n)),u]},d("div",i)),l]},d("div",s)}(w),(m={class:"mib-upload-diagnostics",children:[(g={children:_("Upload diagnostics")},d("summary",g)),(h={class:"mib-pre",children:ak(w.diagnostics)},d("pre",h))]},d("details",m))),a=w,S.textContent=ak({schema_version:a.schema_version,reference_version:a.reference_version,onu_id:a.onu_id,uploaded_complete:a.uploaded_complete,expected_records:a.expected_records,received_records:a.received_records,decoded_records:a.decoded_records,partial_records:a.partial_records,basic_records:a.basic_records,tables_requested:a.tables_requested,tables_collected:a.tables_collected,class_count:a.classes.length,classes:a.classes.slice(0,25),additional_classes:Math.max(0,a.classes.length-25),record_count:a.records.length,first_record:a.records[0]??null,table_count:a.tables.length,diagnostics_count:a.diagnostics.length}),P.disabled=!1;return}if(e.progress){let{phase:t,received:r,expected:a}=e.progress;if(z.textContent="starting"===t?_("Starting OMCI MIB read…"):"tables"===t?`${_("Collecting VLAN tables")}${null==a?"":`: ${r}/${a}`}`:null==a?_("Reading OMCI MIB records…"):`${_("Reading OMCI MIB records")}: ${r}/${a}`,a&&a>0){let e=Math.min(100,Math.round(r/a*100));j.title=`${e}%`,j.firstElementChild.style.width=`${e}%`}}if(Date.now()>=O)throw Error(_("MIB query timed out; retry."));await new Promise(e=>setTimeout(e,1e3))}}catch(e){Z()&&(j.style.display="none",z.replaceChildren(d("span",{class:"mib-error-text",children:[String(e),w?` \xb7 ${_("Previous snapshot retained")}`:""]})))}finally{await F(),y=!1,I.disabled=R.disabled=!1}}}async function F(){if(!x)return;let e=x;x=null;try{await ap(e)}catch(e){console.warn("Failed to release MIB snapshot",e)}}T(m),L.ui.showModal(`${e.model} — ${e.serial_number}`,q,"modal-wide")})(e,"mib"),children:[_("View OMCI / MIB details")," →"]},d("button",n))},d("div",i))]},d("div",s)),(O={class:"fttr-grid-2",children:[(v={class:"fttr-card",children:[d("h4",{style:"margin-top:0;margin-bottom:6px;font-size:92%;color:#888",children:_("Optical physical layer and link parameters")}),(o={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:_("Optical RX power")}),d("strong",{children:p(e.optical_rx_power_dbm)})]},d("div",o)),(f={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:_("Optical TX power")}),d("strong",{children:p(e.optical_tx_power_dbm)})]},d("div",f)),(g={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:_("Equalization delay (EQD)")}),d("span",{children:null===(b=e.equalization_delay_bits)?"—":`${b} bits`})]},d("div",g)),(h={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:_("Data interface")}),d("code",{children:c(e.data_path?.interface)})]},d("div",h)),(m={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:_("Identity age")}),d("span",{children:u(e.identity_age_seconds)??"—"})]},d("div",m))]},d("div",v)),(S={class:"fttr-card",children:[d("h4",{style:"margin-top:0;margin-bottom:6px;font-size:92%;color:#888",children:_("Hardware specifications and firmware images")}),(y={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:_("Equipment ID")}),d("span",{children:c(P?.equipment_id??e.model)})]},d("div",y)),(w={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:_("Hardware version")}),d("code",{children:c(P?.hardware_version??e.hardware_version)})]},d("div",w)),(k={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:_("Firmware version")}),(x={title:I.full||I.display,children:d("strong",{children:I.display})},d("span",x))]},d("div",k)),(z={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:_("OMCC version")}),d("span",{children:P?.omcc_version!=null?`0x${P.omcc_version.toString(16).padStart(2,"0")} (${P.omcc_version})`:"—"})]},d("div",z)),P?.errors.length?(j={class:"fttr-kv-row",style:"color:#e74c3c",children:[d("span",{class:"fttr-kv-label",children:_("Identity read errors")}),d("span",{children:P.errors.join("; ")})]},d("div",j)):null,M.length>1?($={class:"fttr-kv-row",style:"font-size:80%;color:#888",children:[d("span",{class:"fttr-kv-label",children:_("Software images")}),d("span",{children:M.join(" · ")})]},d("div",$)):null]},d("div",S))]},d("div",O))]},d("div",C)})},d("div",t)):(r={class:"cbi-section fttr-panel-subgateways",children:d("p",{style:"text-align:center;color:#888;padding:2em 0",children:_("No sub-gateways are currently registered.")})},d("div",r))}let main=L.view.extend({async load(){let[e,t]=await Promise.all([ao(),al()]);return{status:e,platform:t}},render:e=>{var t,r,a,n;let i,s,o,l,c,p,u,f,b,g,h;return t=e.status,r=e.platform,i="controller",s=[{id:"controller",label:_("Controller & optical transceiver")},{id:"subgateways",label:_("Sub-gateways & optical links")}],r.operations.downstream_fec&&s.push({id:"fec",label:_("ONU FEC monitoring")}),o=new Map,l=a$(t,r),c=aS(t.sub_gateways??[]),p=r.operations.downstream_fec?function(e){var t,r,a,n,i,s,o;let l=d("tbody",{}),c=d("p",{}),p=d("span",{}),u=(o={class:"cbi-section","data-fttr":"fec-monitor",children:[d("h3",{children:_("ONU FEC monitoring details")}),d("p",{children:_("Counters describe the last completed 15-minute PM interval, not live or cumulative traffic.")}),(r={class:"fttr-card",children:[(t={class:"fttr-kv-row",children:[d("span",{class:"fttr-kv-label",children:_("Downstream FEC hardware state")}),p]},d("div",t)),c]},d("div",r)),(s={class:"table-wrapper",style:"overflow-x:auto;margin-top:12px",children:(i={class:"table",children:[(n={children:(a={children:[d("th",{children:_("ONU")}),d("th",{children:_("OMCI status")}),d("th",{children:_("Interval")}),d("th",{children:_("Corrected bytes")}),d("th",{children:_("Corrected code words")}),d("th",{children:_("Uncorrectable code words")}),d("th",{children:_("Total code words")}),d("th",{children:_("FEC seconds")})]},d("tr",a))},d("thead",n)),l]},d("table",i))},d("div",s))]},d("div",o)),f=e=>{let t=e.sub_gateways??[],r=t.filter(e=>"o5_operation"===e.state&&e.fec?.downstream_pm!=null).length,a=e.pon_mac?.desired_fec_enabled,n=e.pon_mac?.fec_enabled;p.textContent=`${_("Saved")}: ${null==a?_("Unknown"):a?_("Enabled"):_("Disabled")} \xb7 ${_("Hardware")}: ${null==n?_("Unknown"):n?_("Enabled"):_("Disabled")}`,c.textContent=a?`${_("OMCI FEC monitoring ready")}: ${r}/${t.length}`:_("OMCI FEC monitoring paused"),l.replaceChildren(...t.map(e=>{var t;let r=e.fec,a=r?.downstream_pm;return t={children:[d("td",{children:`${e.onu_id} \xb7 ${e.model||e.vendor}`}),d("td",{children:"o5_operation"!==e.state?_("Offline"):a?_("Ready"):r?.measurement.reason||_("Awaiting OMCI preparation")}),d("td",{children:a?.interval_end_time??"—"}),d("td",{children:a?.corrected_bytes??"—"}),d("td",{children:a?.corrected_code_words??"—"}),d("td",{children:a?.uncorrectable_code_words??"—"}),d("td",{children:a?.total_code_words??"—"}),d("td",{children:a?.fec_seconds??"—"})]},d("tr",t)}))};return f(e),{element:u,update:f}}(t):void 0,u=p?.element,a={class:"cbi-tabmenu",style:"margin-top:14px;margin-bottom:0",children:s.map(e=>{var t;let r=(t={class:i===e.id?"cbi-tab":"cbi-tab-disabled","data-tab":e.id,children:d("a",{href:`#tab-${e.id}`,onclick:t=>{t.preventDefault();var r=e.id;for(let[e,t]of(i=r,o))t.className=e===r?"cbi-tab":"cbi-tab-disabled";l.hidden="controller"!==r,c.hidden="subgateways"!==r,u&&(u.hidden="fec"!==r),window.dispatchEvent(new Event("resize"))},children:e.label})},d("li",t));return o.set(e.id,r),r})},f=d("ul",a),l.hidden=!1,c.hidden=!0,u&&(u.hidden=!0),b=d("div",{id:"fttr-panels-container",children:[l,c,u??null]}),n={class:"cbi-map fttr-hardware",children:[d("style",{children:`
				.fttr-hardware {
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
					.fttr-hardware {
						--fttr-success-color: #2ecc71;
						--fttr-warning-color: #f39c12;
						--fttr-danger-color: #e74c3c;
						--fttr-info-color: #3498db;
						--fttr-neutral-color: #bdc3c7;
					}
				}

				[data-darkmode="true"] .fttr-hardware,
				[data-theme="dark"] .fttr-hardware {
					--fttr-success-color: #2ecc71;
					--fttr-warning-color: #f39c12;
					--fttr-danger-color: #e74c3c;
					--fttr-info-color: #3498db;
					--fttr-neutral-color: #bdc3c7;
				}

				.fttr-hardware .fttr-badge {
					display: inline-block;
					padding: 0.18em 0.55em;
					font-size: 85%;
					font-weight: 600;
					line-height: 1.25;
					border-radius: 3px;
					white-space: nowrap;
					text-align: center;
				}

				.fttr-hardware .fttr-badge-success {
					background: var(--fttr-success-bg);
					color: var(--fttr-success-color);
					border: 1px solid var(--fttr-success-border);
				}

				.fttr-hardware .fttr-badge-warning {
					background: var(--fttr-warning-bg);
					color: var(--fttr-warning-color);
					border: 1px solid var(--fttr-warning-border);
				}

				.fttr-hardware .fttr-badge-danger {
					background: var(--fttr-danger-bg);
					color: var(--fttr-danger-color);
					border: 1px solid var(--fttr-danger-border);
				}

				.fttr-hardware .fttr-badge-info {
					background: var(--fttr-info-bg);
					color: var(--fttr-info-color);
					border: 1px solid var(--fttr-info-border);
				}

				.fttr-hardware .fttr-badge-neutral {
					background: var(--fttr-neutral-bg);
					color: var(--fttr-neutral-color);
					border: 1px solid var(--fttr-neutral-border);
				}

				.fttr-hardware .fttr-grid-2 {
					display: grid;
					grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
					gap: 12px;
					margin: 8px 0;
				}

				.fttr-hardware .fttr-grid-3 {
					display: grid;
					grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
					gap: 12px;
					margin: 8px 0;
				}

				.fttr-hardware .fttr-card {
					padding: 12px 14px;
					border: 1px solid rgba(127, 140, 141, 0.2);
					border-radius: 6px;
					background: rgba(127, 140, 141, 0.04);
				}

				.fttr-hardware .fttr-kv-row {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 5px 0;
					border-bottom: 1px dashed rgba(127, 140, 141, 0.15);
					font-size: 88%;
				}

				.fttr-hardware .fttr-kv-row:last-child {
					border-bottom: none;
				}

				.fttr-hardware .fttr-kv-label {
					color: #888;
				}

				.fttr-hardware .fttr-onu-card {
					position: relative;
					margin-bottom: 1.2em;
				}

				.fttr-hardware .fttr-card-header {
					display: flex;
					justify-content: space-between;
					align-items: center;
					flex-wrap: wrap;
					gap: 10px;
					margin-bottom: 10px;
				}

				.fttr-hardware .fttr-card-title-group {
					display: flex;
					align-items: center;
					gap: 10px;
					flex-wrap: wrap;
				}

				.fttr-hardware .fttr-card-meta-tags {
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					gap: 6px;
				}

				.fttr-hardware .fttr-btn-subtle {
					font-size: 82%;
					padding: 3px 10px;
					border: 1px solid rgba(127, 140, 141, 0.35);
					background: transparent;
					color: inherit;
					border-radius: 4px;
					cursor: pointer;
					text-decoration: none;
					transition: all 0.2s ease;
				}

				.fttr-hardware .fttr-btn-subtle:hover {
					background: rgba(52, 152, 219, 0.1);
					border-color: rgba(52, 152, 219, 0.4);
					color: #2980b9;
				}

				.fttr-hardware .cbi-tabmenu {
					margin-top: 14px;
					margin-bottom: 0;
					user-select: none;
				}

				.fttr-hardware #fttr-panels-container > .cbi-section {
					margin-top: 0;
					border-top-left-radius: 0;
				}
				`}),d("h2",{children:_("FTTR hardware status")}),f,b,d("p",{class:"cbi-footer",style:"margin-top:1.5em;font-size:85%;color:#888",children:_("Identity information is read-only and limited to fields provided by fttrctl status.")})]},g=d("div",n),h=!1,L.Poll.add(async()=>{if(g.isConnected&&!h){h=!0;try{let e=await ao(),t=a$(e,r),a=aS(e.sub_gateways??[]);t.hidden="controller"!==i,a.hidden="subgateways"!==i,p?.update(e),l.replaceWith(t),c.replaceWith(a),l=t,c=a}catch(e){console.error("Failed to refresh hardware status",e)}finally{h=!1}}},10),g},handleSaveApply:null,handleSave:null,handleReset:null})})(),main=t.main;
return main;
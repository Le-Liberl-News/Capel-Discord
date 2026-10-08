var z0=Object.defineProperty;var V0=(n,e)=>{for(var t in e)z0(n,t,{get:e[t],enumerable:!0})};var eo=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function to(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var Nl={exports:{}};var gp;function _p(){return gp?Nl.exports:(gp=1,(function(n){var e=Object.prototype.hasOwnProperty,t="~";function i(){}Object.create&&(i.prototype=Object.create(null),new i().__proto__||(t=!1));function r(c,l,u){this.fn=c,this.context=l,this.once=u||!1}function s(c,l,u,h,f){if(typeof u!="function")throw new TypeError("The listener must be a function");var m=new r(u,h||c,f),x=t?t+l:l;return c._events[x]?c._events[x].fn?c._events[x]=[c._events[x],m]:c._events[x].push(m):(c._events[x]=m,c._eventsCount++),c}function a(c,l){--c._eventsCount===0?c._events=new i:delete c._events[l]}function o(){this._events=new i,this._eventsCount=0}o.prototype.eventNames=function(){var l=[],u,h;if(this._eventsCount===0)return l;for(h in u=this._events)e.call(u,h)&&l.push(t?h.slice(1):h);return Object.getOwnPropertySymbols?l.concat(Object.getOwnPropertySymbols(u)):l},o.prototype.listeners=function(l){var u=t?t+l:l,h=this._events[u];if(!h)return[];if(h.fn)return[h.fn];for(var f=0,m=h.length,x=new Array(m);f<m;f++)x[f]=h[f].fn;return x},o.prototype.listenerCount=function(l){var u=t?t+l:l,h=this._events[u];return h?h.fn?1:h.length:0},o.prototype.emit=function(l,u,h,f,m,x){var v=t?t+l:l;if(!this._events[v])return!1;var g=this._events[v],_=arguments.length,T,I;if(g.fn){switch(g.once&&this.removeListener(l,g.fn,void 0,!0),_){case 1:return g.fn.call(g.context),!0;case 2:return g.fn.call(g.context,u),!0;case 3:return g.fn.call(g.context,u,h),!0;case 4:return g.fn.call(g.context,u,h,f),!0;case 5:return g.fn.call(g.context,u,h,f,m),!0;case 6:return g.fn.call(g.context,u,h,f,m,x),!0}for(I=1,T=new Array(_-1);I<_;I++)T[I-1]=arguments[I];g.fn.apply(g.context,T)}else{var E=g.length,w;for(I=0;I<E;I++)switch(g[I].once&&this.removeListener(l,g[I].fn,void 0,!0),_){case 1:g[I].fn.call(g[I].context);break;case 2:g[I].fn.call(g[I].context,u);break;case 3:g[I].fn.call(g[I].context,u,h);break;case 4:g[I].fn.call(g[I].context,u,h,f);break;default:if(!T)for(w=1,T=new Array(_-1);w<_;w++)T[w-1]=arguments[w];g[I].fn.apply(g[I].context,T)}}return!0},o.prototype.on=function(l,u,h){return s(this,l,u,h,!1)},o.prototype.once=function(l,u,h){return s(this,l,u,h,!0)},o.prototype.removeListener=function(l,u,h,f){var m=t?t+l:l;if(!this._events[m])return this;if(!u)return a(this,m),this;var x=this._events[m];if(x.fn)x.fn===u&&(!f||x.once)&&(!h||x.context===h)&&a(this,m);else{for(var v=0,g=[],_=x.length;v<_;v++)(x[v].fn!==u||f&&!x[v].once||h&&x[v].context!==h)&&g.push(x[v]);g.length?this._events[m]=g.length===1?g[0]:g:a(this,m)}return this},o.prototype.removeAllListeners=function(l){var u;return l?(u=t?t+l:l,this._events[u]&&a(this,u)):(this._events=new i,this._eventsCount=0),this},o.prototype.off=o.prototype.removeListener,o.prototype.addListener=o.prototype.on,o.prefixed=t,o.EventEmitter=o,n.exports=o})(Nl),Nl.exports)}var G0=_p(),ch=to(G0);var Nt;(function(n){n.assertEqual=r=>r;function e(r){}n.assertIs=e;function t(r){throw new Error}n.assertNever=t,n.arrayToEnum=r=>{let s={};for(let a of r)s[a]=a;return s},n.getValidEnumValues=r=>{let s=n.objectKeys(r).filter(o=>typeof r[r[o]]!="number"),a={};for(let o of s)a[o]=r[o];return n.objectValues(a)},n.objectValues=r=>n.objectKeys(r).map(function(s){return r[s]}),n.objectKeys=typeof Object.keys=="function"?r=>Object.keys(r):r=>{let s=[];for(let a in r)Object.prototype.hasOwnProperty.call(r,a)&&s.push(a);return s},n.find=(r,s)=>{for(let a of r)if(s(a))return a},n.isInteger=typeof Number.isInteger=="function"?r=>Number.isInteger(r):r=>typeof r=="number"&&isFinite(r)&&Math.floor(r)===r;function i(r,s=" | "){return r.map(a=>typeof a=="string"?`'${a}'`:a).join(s)}n.joinValues=i,n.jsonStringifyReplacer=(r,s)=>typeof s=="bigint"?s.toString():s})(Nt||(Nt={}));var hh;(function(n){n.mergeShapes=(e,t)=>({...e,...t})})(hh||(hh={}));var Ue=Nt.arrayToEnum(["string","nan","number","integer","float","boolean","date","bigint","symbol","function","undefined","null","array","object","unknown","promise","void","never","map","set"]),wr=n=>{switch(typeof n){case"undefined":return Ue.undefined;case"string":return Ue.string;case"number":return isNaN(n)?Ue.nan:Ue.number;case"boolean":return Ue.boolean;case"function":return Ue.function;case"bigint":return Ue.bigint;case"symbol":return Ue.symbol;case"object":return Array.isArray(n)?Ue.array:n===null?Ue.null:n.then&&typeof n.then=="function"&&n.catch&&typeof n.catch=="function"?Ue.promise:typeof Map<"u"&&n instanceof Map?Ue.map:typeof Set<"u"&&n instanceof Set?Ue.set:typeof Date<"u"&&n instanceof Date?Ue.date:Ue.object;default:return Ue.unknown}},ve=Nt.arrayToEnum(["invalid_type","invalid_literal","custom","invalid_union","invalid_union_discriminator","invalid_enum_value","unrecognized_keys","invalid_arguments","invalid_return_type","invalid_date","invalid_string","too_small","too_big","invalid_intersection_types","not_multiple_of","not_finite"]),H0=n=>JSON.stringify(n,null,2).replace(/"([^"]+)":/g,"$1:"),Zn=class n extends Error{constructor(e){super(),this.issues=[],this.addIssue=i=>{this.issues=[...this.issues,i]},this.addIssues=(i=[])=>{this.issues=[...this.issues,...i]};let t=new.target.prototype;Object.setPrototypeOf?Object.setPrototypeOf(this,t):this.__proto__=t,this.name="ZodError",this.issues=e}get errors(){return this.issues}format(e){let t=e||function(s){return s.message},i={_errors:[]},r=s=>{for(let a of s.issues)if(a.code==="invalid_union")a.unionErrors.map(r);else if(a.code==="invalid_return_type")r(a.returnTypeError);else if(a.code==="invalid_arguments")r(a.argumentsError);else if(a.path.length===0)i._errors.push(t(a));else{let o=i,c=0;for(;c<a.path.length;){let l=a.path[c];c===a.path.length-1?(o[l]=o[l]||{_errors:[]},o[l]._errors.push(t(a))):o[l]=o[l]||{_errors:[]},o=o[l],c++}}};return r(this),i}static assert(e){if(!(e instanceof n))throw new Error(`Not a ZodError: ${e}`)}toString(){return this.message}get message(){return JSON.stringify(this.issues,Nt.jsonStringifyReplacer,2)}get isEmpty(){return this.issues.length===0}flatten(e=t=>t.message){let t={},i=[];for(let r of this.issues)r.path.length>0?(t[r.path[0]]=t[r.path[0]]||[],t[r.path[0]].push(e(r))):i.push(e(r));return{formErrors:i,fieldErrors:t}}get formErrors(){return this.flatten()}};Zn.create=n=>new Zn(n);var Zs=(n,e)=>{let t;switch(n.code){case ve.invalid_type:n.received===Ue.undefined?t="Required":t=`Expected ${n.expected}, received ${n.received}`;break;case ve.invalid_literal:t=`Invalid literal value, expected ${JSON.stringify(n.expected,Nt.jsonStringifyReplacer)}`;break;case ve.unrecognized_keys:t=`Unrecognized key(s) in object: ${Nt.joinValues(n.keys,", ")}`;break;case ve.invalid_union:t="Invalid input";break;case ve.invalid_union_discriminator:t=`Invalid discriminator value. Expected ${Nt.joinValues(n.options)}`;break;case ve.invalid_enum_value:t=`Invalid enum value. Expected ${Nt.joinValues(n.options)}, received '${n.received}'`;break;case ve.invalid_arguments:t="Invalid function arguments";break;case ve.invalid_return_type:t="Invalid function return type";break;case ve.invalid_date:t="Invalid date";break;case ve.invalid_string:typeof n.validation=="object"?"includes"in n.validation?(t=`Invalid input: must include "${n.validation.includes}"`,typeof n.validation.position=="number"&&(t=`${t} at one or more positions greater than or equal to ${n.validation.position}`)):"startsWith"in n.validation?t=`Invalid input: must start with "${n.validation.startsWith}"`:"endsWith"in n.validation?t=`Invalid input: must end with "${n.validation.endsWith}"`:Nt.assertNever(n.validation):n.validation!=="regex"?t=`Invalid ${n.validation}`:t="Invalid";break;case ve.too_small:n.type==="array"?t=`Array must contain ${n.exact?"exactly":n.inclusive?"at least":"more than"} ${n.minimum} element(s)`:n.type==="string"?t=`String must contain ${n.exact?"exactly":n.inclusive?"at least":"over"} ${n.minimum} character(s)`:n.type==="number"?t=`Number must be ${n.exact?"exactly equal to ":n.inclusive?"greater than or equal to ":"greater than "}${n.minimum}`:n.type==="date"?t=`Date must be ${n.exact?"exactly equal to ":n.inclusive?"greater than or equal to ":"greater than "}${new Date(Number(n.minimum))}`:t="Invalid input";break;case ve.too_big:n.type==="array"?t=`Array must contain ${n.exact?"exactly":n.inclusive?"at most":"less than"} ${n.maximum} element(s)`:n.type==="string"?t=`String must contain ${n.exact?"exactly":n.inclusive?"at most":"under"} ${n.maximum} character(s)`:n.type==="number"?t=`Number must be ${n.exact?"exactly":n.inclusive?"less than or equal to":"less than"} ${n.maximum}`:n.type==="bigint"?t=`BigInt must be ${n.exact?"exactly":n.inclusive?"less than or equal to":"less than"} ${n.maximum}`:n.type==="date"?t=`Date must be ${n.exact?"exactly":n.inclusive?"smaller than or equal to":"smaller than"} ${new Date(Number(n.maximum))}`:t="Invalid input";break;case ve.custom:t="Invalid input";break;case ve.invalid_intersection_types:t="Intersection results could not be merged";break;case ve.not_multiple_of:t=`Number must be a multiple of ${n.multipleOf}`;break;case ve.not_finite:t="Number must be finite";break;default:t=e.defaultError,Nt.assertNever(n)}return{message:t}},yp=Zs;function W0(n){yp=n}function Ll(){return yp}var Dl=n=>{let{data:e,path:t,errorMaps:i,issueData:r}=n,s=[...t,...r.path||[]],a={...r,path:s};if(r.message!==void 0)return{...r,path:s,message:r.message};let o="",c=i.filter(l=>!!l).slice().reverse();for(let l of c)o=l(a,{data:e,defaultError:o}).message;return{...r,path:s,message:o}},X0=[];function Le(n,e){let t=Ll(),i=Dl({issueData:e,data:n.data,path:n.path,errorMaps:[n.common.contextualErrorMap,n.schemaErrorMap,t,t===Zs?void 0:Zs].filter(r=>!!r)});n.common.issues.push(i)}var Tn=class n{constructor(){this.value="valid"}dirty(){this.value==="valid"&&(this.value="dirty")}abort(){this.value!=="aborted"&&(this.value="aborted")}static mergeArray(e,t){let i=[];for(let r of t){if(r.status==="aborted")return ot;r.status==="dirty"&&e.dirty(),i.push(r.value)}return{status:e.value,value:i}}static async mergeObjectAsync(e,t){let i=[];for(let r of t){let s=await r.key,a=await r.value;i.push({key:s,value:a})}return n.mergeObjectSync(e,i)}static mergeObjectSync(e,t){let i={};for(let r of t){let{key:s,value:a}=r;if(s.status==="aborted"||a.status==="aborted")return ot;s.status==="dirty"&&e.dirty(),a.status==="dirty"&&e.dirty(),s.value!=="__proto__"&&(typeof a.value<"u"||r.alwaysSet)&&(i[s.value]=a.value)}return{status:e.value,value:i}}},ot=Object.freeze({status:"aborted"}),Ys=n=>({status:"dirty",value:n}),Pn=n=>({status:"valid",value:n}),dh=n=>n.status==="aborted",fh=n=>n.status==="dirty",ro=n=>n.status==="valid",so=n=>typeof Promise<"u"&&n instanceof Promise;function Ul(n,e,t,i){if(typeof e=="function"?n!==e||!i:!e.has(n))throw new TypeError("Cannot read private member from an object whose class did not declare it");return e.get(n)}function Sp(n,e,t,i,r){if(typeof e=="function"?n!==e||!r:!e.has(n))throw new TypeError("Cannot write private member to an object whose class did not declare it");return e.set(n,t),t}var je;(function(n){n.errToObj=e=>typeof e=="string"?{message:e}:e||{},n.toString=e=>typeof e=="string"?e:e?.message})(je||(je={}));var no,io,hi=class{constructor(e,t,i,r){this._cachedPath=[],this.parent=e,this.data=t,this._path=i,this._key=r}get path(){return this._cachedPath.length||(this._key instanceof Array?this._cachedPath.push(...this._path,...this._key):this._cachedPath.push(...this._path,this._key)),this._cachedPath}},xp=(n,e)=>{if(ro(e))return{success:!0,data:e.value};if(!n.common.issues.length)throw new Error("Validation failed but no issues detected.");return{success:!1,get error(){if(this._error)return this._error;let t=new Zn(n.common.issues);return this._error=t,this._error}}};function gt(n){if(!n)return{};let{errorMap:e,invalid_type_error:t,required_error:i,description:r}=n;if(e&&(t||i))throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);return e?{errorMap:e,description:r}:{errorMap:(a,o)=>{var c,l;let{message:u}=n;return a.code==="invalid_enum_value"?{message:u??o.defaultError}:typeof o.data>"u"?{message:(c=u??i)!==null&&c!==void 0?c:o.defaultError}:a.code!=="invalid_type"?{message:o.defaultError}:{message:(l=u??t)!==null&&l!==void 0?l:o.defaultError}},description:r}}var _t=class{constructor(e){this.spa=this.safeParseAsync,this._def=e,this.parse=this.parse.bind(this),this.safeParse=this.safeParse.bind(this),this.parseAsync=this.parseAsync.bind(this),this.safeParseAsync=this.safeParseAsync.bind(this),this.spa=this.spa.bind(this),this.refine=this.refine.bind(this),this.refinement=this.refinement.bind(this),this.superRefine=this.superRefine.bind(this),this.optional=this.optional.bind(this),this.nullable=this.nullable.bind(this),this.nullish=this.nullish.bind(this),this.array=this.array.bind(this),this.promise=this.promise.bind(this),this.or=this.or.bind(this),this.and=this.and.bind(this),this.transform=this.transform.bind(this),this.brand=this.brand.bind(this),this.default=this.default.bind(this),this.catch=this.catch.bind(this),this.describe=this.describe.bind(this),this.pipe=this.pipe.bind(this),this.readonly=this.readonly.bind(this),this.isNullable=this.isNullable.bind(this),this.isOptional=this.isOptional.bind(this)}get description(){return this._def.description}_getType(e){return wr(e.data)}_getOrReturnCtx(e,t){return t||{common:e.parent.common,data:e.data,parsedType:wr(e.data),schemaErrorMap:this._def.errorMap,path:e.path,parent:e.parent}}_processInputParams(e){return{status:new Tn,ctx:{common:e.parent.common,data:e.data,parsedType:wr(e.data),schemaErrorMap:this._def.errorMap,path:e.path,parent:e.parent}}}_parseSync(e){let t=this._parse(e);if(so(t))throw new Error("Synchronous parse encountered promise.");return t}_parseAsync(e){let t=this._parse(e);return Promise.resolve(t)}parse(e,t){let i=this.safeParse(e,t);if(i.success)return i.data;throw i.error}safeParse(e,t){var i;let r={common:{issues:[],async:(i=t?.async)!==null&&i!==void 0?i:!1,contextualErrorMap:t?.errorMap},path:t?.path||[],schemaErrorMap:this._def.errorMap,parent:null,data:e,parsedType:wr(e)},s=this._parseSync({data:e,path:r.path,parent:r});return xp(r,s)}async parseAsync(e,t){let i=await this.safeParseAsync(e,t);if(i.success)return i.data;throw i.error}async safeParseAsync(e,t){let i={common:{issues:[],contextualErrorMap:t?.errorMap,async:!0},path:t?.path||[],schemaErrorMap:this._def.errorMap,parent:null,data:e,parsedType:wr(e)},r=this._parse({data:e,path:i.path,parent:i}),s=await(so(r)?r:Promise.resolve(r));return xp(i,s)}refine(e,t){let i=r=>typeof t=="string"||typeof t>"u"?{message:t}:typeof t=="function"?t(r):t;return this._refinement((r,s)=>{let a=e(r),o=()=>s.addIssue({code:ve.custom,...i(r)});return typeof Promise<"u"&&a instanceof Promise?a.then(c=>c?!0:(o(),!1)):a?!0:(o(),!1)})}refinement(e,t){return this._refinement((i,r)=>e(i)?!0:(r.addIssue(typeof t=="function"?t(i,r):t),!1))}_refinement(e){return new Kn({schema:this,typeName:it.ZodEffects,effect:{type:"refinement",refinement:e}})}superRefine(e){return this._refinement(e)}optional(){return ui.create(this,this._def)}nullable(){return Oi.create(this,this._def)}nullish(){return this.nullable().optional()}array(){return rr.create(this,this._def)}promise(){return Cr.create(this,this._def)}or(e){return ss.create([this,e],this._def)}and(e){return as.create(this,e,this._def)}transform(e){return new Kn({...gt(this._def),schema:this,typeName:it.ZodEffects,effect:{type:"transform",transform:e}})}default(e){let t=typeof e=="function"?e:()=>e;return new hs({...gt(this._def),innerType:this,defaultValue:t,typeName:it.ZodDefault})}brand(){return new ao({typeName:it.ZodBranded,type:this,...gt(this._def)})}catch(e){let t=typeof e=="function"?e:()=>e;return new ds({...gt(this._def),innerType:this,catchValue:t,typeName:it.ZodCatch})}describe(e){let t=this.constructor;return new t({...this._def,description:e})}pipe(e){return oo.create(this,e)}readonly(){return fs.create(this)}isOptional(){return this.safeParse(void 0).success}isNullable(){return this.safeParse(null).success}},q0=/^c[^\s-]{8,}$/i,Y0=/^[0-9a-z]+$/,Z0=/^[0-9A-HJKMNP-TV-Z]{26}$/,K0=/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,j0=/^[a-z0-9_-]{21}$/i,$0=/^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,J0=/^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,Q0="^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$",uh,ex=/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,tx=/^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,nx=/^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,bp="((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))",ix=new RegExp(`^${bp}$`);function Mp(n){let e="([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d";return n.precision?e=`${e}\\.\\d{${n.precision}}`:n.precision==null&&(e=`${e}(\\.\\d+)?`),e}function rx(n){return new RegExp(`^${Mp(n)}$`)}function Ep(n){let e=`${bp}T${Mp(n)}`,t=[];return t.push(n.local?"Z?":"Z"),n.offset&&t.push("([+-]\\d{2}:?\\d{2})"),e=`${e}(${t.join("|")})`,new RegExp(`^${e}$`)}function sx(n,e){return!!((e==="v4"||!e)&&ex.test(n)||(e==="v6"||!e)&&tx.test(n))}var Rr=class n extends _t{_parse(e){if(this._def.coerce&&(e.data=String(e.data)),this._getType(e)!==Ue.string){let s=this._getOrReturnCtx(e);return Le(s,{code:ve.invalid_type,expected:Ue.string,received:s.parsedType}),ot}let i=new Tn,r;for(let s of this._def.checks)if(s.kind==="min")e.data.length<s.value&&(r=this._getOrReturnCtx(e,r),Le(r,{code:ve.too_small,minimum:s.value,type:"string",inclusive:!0,exact:!1,message:s.message}),i.dirty());else if(s.kind==="max")e.data.length>s.value&&(r=this._getOrReturnCtx(e,r),Le(r,{code:ve.too_big,maximum:s.value,type:"string",inclusive:!0,exact:!1,message:s.message}),i.dirty());else if(s.kind==="length"){let a=e.data.length>s.value,o=e.data.length<s.value;(a||o)&&(r=this._getOrReturnCtx(e,r),a?Le(r,{code:ve.too_big,maximum:s.value,type:"string",inclusive:!0,exact:!0,message:s.message}):o&&Le(r,{code:ve.too_small,minimum:s.value,type:"string",inclusive:!0,exact:!0,message:s.message}),i.dirty())}else if(s.kind==="email")J0.test(e.data)||(r=this._getOrReturnCtx(e,r),Le(r,{validation:"email",code:ve.invalid_string,message:s.message}),i.dirty());else if(s.kind==="emoji")uh||(uh=new RegExp(Q0,"u")),uh.test(e.data)||(r=this._getOrReturnCtx(e,r),Le(r,{validation:"emoji",code:ve.invalid_string,message:s.message}),i.dirty());else if(s.kind==="uuid")K0.test(e.data)||(r=this._getOrReturnCtx(e,r),Le(r,{validation:"uuid",code:ve.invalid_string,message:s.message}),i.dirty());else if(s.kind==="nanoid")j0.test(e.data)||(r=this._getOrReturnCtx(e,r),Le(r,{validation:"nanoid",code:ve.invalid_string,message:s.message}),i.dirty());else if(s.kind==="cuid")q0.test(e.data)||(r=this._getOrReturnCtx(e,r),Le(r,{validation:"cuid",code:ve.invalid_string,message:s.message}),i.dirty());else if(s.kind==="cuid2")Y0.test(e.data)||(r=this._getOrReturnCtx(e,r),Le(r,{validation:"cuid2",code:ve.invalid_string,message:s.message}),i.dirty());else if(s.kind==="ulid")Z0.test(e.data)||(r=this._getOrReturnCtx(e,r),Le(r,{validation:"ulid",code:ve.invalid_string,message:s.message}),i.dirty());else if(s.kind==="url")try{new URL(e.data)}catch{r=this._getOrReturnCtx(e,r),Le(r,{validation:"url",code:ve.invalid_string,message:s.message}),i.dirty()}else s.kind==="regex"?(s.regex.lastIndex=0,s.regex.test(e.data)||(r=this._getOrReturnCtx(e,r),Le(r,{validation:"regex",code:ve.invalid_string,message:s.message}),i.dirty())):s.kind==="trim"?e.data=e.data.trim():s.kind==="includes"?e.data.includes(s.value,s.position)||(r=this._getOrReturnCtx(e,r),Le(r,{code:ve.invalid_string,validation:{includes:s.value,position:s.position},message:s.message}),i.dirty()):s.kind==="toLowerCase"?e.data=e.data.toLowerCase():s.kind==="toUpperCase"?e.data=e.data.toUpperCase():s.kind==="startsWith"?e.data.startsWith(s.value)||(r=this._getOrReturnCtx(e,r),Le(r,{code:ve.invalid_string,validation:{startsWith:s.value},message:s.message}),i.dirty()):s.kind==="endsWith"?e.data.endsWith(s.value)||(r=this._getOrReturnCtx(e,r),Le(r,{code:ve.invalid_string,validation:{endsWith:s.value},message:s.message}),i.dirty()):s.kind==="datetime"?Ep(s).test(e.data)||(r=this._getOrReturnCtx(e,r),Le(r,{code:ve.invalid_string,validation:"datetime",message:s.message}),i.dirty()):s.kind==="date"?ix.test(e.data)||(r=this._getOrReturnCtx(e,r),Le(r,{code:ve.invalid_string,validation:"date",message:s.message}),i.dirty()):s.kind==="time"?rx(s).test(e.data)||(r=this._getOrReturnCtx(e,r),Le(r,{code:ve.invalid_string,validation:"time",message:s.message}),i.dirty()):s.kind==="duration"?$0.test(e.data)||(r=this._getOrReturnCtx(e,r),Le(r,{validation:"duration",code:ve.invalid_string,message:s.message}),i.dirty()):s.kind==="ip"?sx(e.data,s.version)||(r=this._getOrReturnCtx(e,r),Le(r,{validation:"ip",code:ve.invalid_string,message:s.message}),i.dirty()):s.kind==="base64"?nx.test(e.data)||(r=this._getOrReturnCtx(e,r),Le(r,{validation:"base64",code:ve.invalid_string,message:s.message}),i.dirty()):Nt.assertNever(s);return{status:i.value,value:e.data}}_regex(e,t,i){return this.refinement(r=>e.test(r),{validation:t,code:ve.invalid_string,...je.errToObj(i)})}_addCheck(e){return new n({...this._def,checks:[...this._def.checks,e]})}email(e){return this._addCheck({kind:"email",...je.errToObj(e)})}url(e){return this._addCheck({kind:"url",...je.errToObj(e)})}emoji(e){return this._addCheck({kind:"emoji",...je.errToObj(e)})}uuid(e){return this._addCheck({kind:"uuid",...je.errToObj(e)})}nanoid(e){return this._addCheck({kind:"nanoid",...je.errToObj(e)})}cuid(e){return this._addCheck({kind:"cuid",...je.errToObj(e)})}cuid2(e){return this._addCheck({kind:"cuid2",...je.errToObj(e)})}ulid(e){return this._addCheck({kind:"ulid",...je.errToObj(e)})}base64(e){return this._addCheck({kind:"base64",...je.errToObj(e)})}ip(e){return this._addCheck({kind:"ip",...je.errToObj(e)})}datetime(e){var t,i;return typeof e=="string"?this._addCheck({kind:"datetime",precision:null,offset:!1,local:!1,message:e}):this._addCheck({kind:"datetime",precision:typeof e?.precision>"u"?null:e?.precision,offset:(t=e?.offset)!==null&&t!==void 0?t:!1,local:(i=e?.local)!==null&&i!==void 0?i:!1,...je.errToObj(e?.message)})}date(e){return this._addCheck({kind:"date",message:e})}time(e){return typeof e=="string"?this._addCheck({kind:"time",precision:null,message:e}):this._addCheck({kind:"time",precision:typeof e?.precision>"u"?null:e?.precision,...je.errToObj(e?.message)})}duration(e){return this._addCheck({kind:"duration",...je.errToObj(e)})}regex(e,t){return this._addCheck({kind:"regex",regex:e,...je.errToObj(t)})}includes(e,t){return this._addCheck({kind:"includes",value:e,position:t?.position,...je.errToObj(t?.message)})}startsWith(e,t){return this._addCheck({kind:"startsWith",value:e,...je.errToObj(t)})}endsWith(e,t){return this._addCheck({kind:"endsWith",value:e,...je.errToObj(t)})}min(e,t){return this._addCheck({kind:"min",value:e,...je.errToObj(t)})}max(e,t){return this._addCheck({kind:"max",value:e,...je.errToObj(t)})}length(e,t){return this._addCheck({kind:"length",value:e,...je.errToObj(t)})}nonempty(e){return this.min(1,je.errToObj(e))}trim(){return new n({...this._def,checks:[...this._def.checks,{kind:"trim"}]})}toLowerCase(){return new n({...this._def,checks:[...this._def.checks,{kind:"toLowerCase"}]})}toUpperCase(){return new n({...this._def,checks:[...this._def.checks,{kind:"toUpperCase"}]})}get isDatetime(){return!!this._def.checks.find(e=>e.kind==="datetime")}get isDate(){return!!this._def.checks.find(e=>e.kind==="date")}get isTime(){return!!this._def.checks.find(e=>e.kind==="time")}get isDuration(){return!!this._def.checks.find(e=>e.kind==="duration")}get isEmail(){return!!this._def.checks.find(e=>e.kind==="email")}get isURL(){return!!this._def.checks.find(e=>e.kind==="url")}get isEmoji(){return!!this._def.checks.find(e=>e.kind==="emoji")}get isUUID(){return!!this._def.checks.find(e=>e.kind==="uuid")}get isNANOID(){return!!this._def.checks.find(e=>e.kind==="nanoid")}get isCUID(){return!!this._def.checks.find(e=>e.kind==="cuid")}get isCUID2(){return!!this._def.checks.find(e=>e.kind==="cuid2")}get isULID(){return!!this._def.checks.find(e=>e.kind==="ulid")}get isIP(){return!!this._def.checks.find(e=>e.kind==="ip")}get isBase64(){return!!this._def.checks.find(e=>e.kind==="base64")}get minLength(){let e=null;for(let t of this._def.checks)t.kind==="min"&&(e===null||t.value>e)&&(e=t.value);return e}get maxLength(){let e=null;for(let t of this._def.checks)t.kind==="max"&&(e===null||t.value<e)&&(e=t.value);return e}};Rr.create=n=>{var e;return new Rr({checks:[],typeName:it.ZodString,coerce:(e=n?.coerce)!==null&&e!==void 0?e:!1,...gt(n)})};function ax(n,e){let t=(n.toString().split(".")[1]||"").length,i=(e.toString().split(".")[1]||"").length,r=t>i?t:i,s=parseInt(n.toFixed(r).replace(".","")),a=parseInt(e.toFixed(r).replace(".",""));return s%a/Math.pow(10,r)}var Qr=class n extends _t{constructor(){super(...arguments),this.min=this.gte,this.max=this.lte,this.step=this.multipleOf}_parse(e){if(this._def.coerce&&(e.data=Number(e.data)),this._getType(e)!==Ue.number){let s=this._getOrReturnCtx(e);return Le(s,{code:ve.invalid_type,expected:Ue.number,received:s.parsedType}),ot}let i,r=new Tn;for(let s of this._def.checks)s.kind==="int"?Nt.isInteger(e.data)||(i=this._getOrReturnCtx(e,i),Le(i,{code:ve.invalid_type,expected:"integer",received:"float",message:s.message}),r.dirty()):s.kind==="min"?(s.inclusive?e.data<s.value:e.data<=s.value)&&(i=this._getOrReturnCtx(e,i),Le(i,{code:ve.too_small,minimum:s.value,type:"number",inclusive:s.inclusive,exact:!1,message:s.message}),r.dirty()):s.kind==="max"?(s.inclusive?e.data>s.value:e.data>=s.value)&&(i=this._getOrReturnCtx(e,i),Le(i,{code:ve.too_big,maximum:s.value,type:"number",inclusive:s.inclusive,exact:!1,message:s.message}),r.dirty()):s.kind==="multipleOf"?ax(e.data,s.value)!==0&&(i=this._getOrReturnCtx(e,i),Le(i,{code:ve.not_multiple_of,multipleOf:s.value,message:s.message}),r.dirty()):s.kind==="finite"?Number.isFinite(e.data)||(i=this._getOrReturnCtx(e,i),Le(i,{code:ve.not_finite,message:s.message}),r.dirty()):Nt.assertNever(s);return{status:r.value,value:e.data}}gte(e,t){return this.setLimit("min",e,!0,je.toString(t))}gt(e,t){return this.setLimit("min",e,!1,je.toString(t))}lte(e,t){return this.setLimit("max",e,!0,je.toString(t))}lt(e,t){return this.setLimit("max",e,!1,je.toString(t))}setLimit(e,t,i,r){return new n({...this._def,checks:[...this._def.checks,{kind:e,value:t,inclusive:i,message:je.toString(r)}]})}_addCheck(e){return new n({...this._def,checks:[...this._def.checks,e]})}int(e){return this._addCheck({kind:"int",message:je.toString(e)})}positive(e){return this._addCheck({kind:"min",value:0,inclusive:!1,message:je.toString(e)})}negative(e){return this._addCheck({kind:"max",value:0,inclusive:!1,message:je.toString(e)})}nonpositive(e){return this._addCheck({kind:"max",value:0,inclusive:!0,message:je.toString(e)})}nonnegative(e){return this._addCheck({kind:"min",value:0,inclusive:!0,message:je.toString(e)})}multipleOf(e,t){return this._addCheck({kind:"multipleOf",value:e,message:je.toString(t)})}finite(e){return this._addCheck({kind:"finite",message:je.toString(e)})}safe(e){return this._addCheck({kind:"min",inclusive:!0,value:Number.MIN_SAFE_INTEGER,message:je.toString(e)})._addCheck({kind:"max",inclusive:!0,value:Number.MAX_SAFE_INTEGER,message:je.toString(e)})}get minValue(){let e=null;for(let t of this._def.checks)t.kind==="min"&&(e===null||t.value>e)&&(e=t.value);return e}get maxValue(){let e=null;for(let t of this._def.checks)t.kind==="max"&&(e===null||t.value<e)&&(e=t.value);return e}get isInt(){return!!this._def.checks.find(e=>e.kind==="int"||e.kind==="multipleOf"&&Nt.isInteger(e.value))}get isFinite(){let e=null,t=null;for(let i of this._def.checks){if(i.kind==="finite"||i.kind==="int"||i.kind==="multipleOf")return!0;i.kind==="min"?(t===null||i.value>t)&&(t=i.value):i.kind==="max"&&(e===null||i.value<e)&&(e=i.value)}return Number.isFinite(t)&&Number.isFinite(e)}};Qr.create=n=>new Qr({checks:[],typeName:it.ZodNumber,coerce:n?.coerce||!1,...gt(n)});var es=class n extends _t{constructor(){super(...arguments),this.min=this.gte,this.max=this.lte}_parse(e){if(this._def.coerce&&(e.data=BigInt(e.data)),this._getType(e)!==Ue.bigint){let s=this._getOrReturnCtx(e);return Le(s,{code:ve.invalid_type,expected:Ue.bigint,received:s.parsedType}),ot}let i,r=new Tn;for(let s of this._def.checks)s.kind==="min"?(s.inclusive?e.data<s.value:e.data<=s.value)&&(i=this._getOrReturnCtx(e,i),Le(i,{code:ve.too_small,type:"bigint",minimum:s.value,inclusive:s.inclusive,message:s.message}),r.dirty()):s.kind==="max"?(s.inclusive?e.data>s.value:e.data>=s.value)&&(i=this._getOrReturnCtx(e,i),Le(i,{code:ve.too_big,type:"bigint",maximum:s.value,inclusive:s.inclusive,message:s.message}),r.dirty()):s.kind==="multipleOf"?e.data%s.value!==BigInt(0)&&(i=this._getOrReturnCtx(e,i),Le(i,{code:ve.not_multiple_of,multipleOf:s.value,message:s.message}),r.dirty()):Nt.assertNever(s);return{status:r.value,value:e.data}}gte(e,t){return this.setLimit("min",e,!0,je.toString(t))}gt(e,t){return this.setLimit("min",e,!1,je.toString(t))}lte(e,t){return this.setLimit("max",e,!0,je.toString(t))}lt(e,t){return this.setLimit("max",e,!1,je.toString(t))}setLimit(e,t,i,r){return new n({...this._def,checks:[...this._def.checks,{kind:e,value:t,inclusive:i,message:je.toString(r)}]})}_addCheck(e){return new n({...this._def,checks:[...this._def.checks,e]})}positive(e){return this._addCheck({kind:"min",value:BigInt(0),inclusive:!1,message:je.toString(e)})}negative(e){return this._addCheck({kind:"max",value:BigInt(0),inclusive:!1,message:je.toString(e)})}nonpositive(e){return this._addCheck({kind:"max",value:BigInt(0),inclusive:!0,message:je.toString(e)})}nonnegative(e){return this._addCheck({kind:"min",value:BigInt(0),inclusive:!0,message:je.toString(e)})}multipleOf(e,t){return this._addCheck({kind:"multipleOf",value:e,message:je.toString(t)})}get minValue(){let e=null;for(let t of this._def.checks)t.kind==="min"&&(e===null||t.value>e)&&(e=t.value);return e}get maxValue(){let e=null;for(let t of this._def.checks)t.kind==="max"&&(e===null||t.value<e)&&(e=t.value);return e}};es.create=n=>{var e;return new es({checks:[],typeName:it.ZodBigInt,coerce:(e=n?.coerce)!==null&&e!==void 0?e:!1,...gt(n)})};var ts=class extends _t{_parse(e){if(this._def.coerce&&(e.data=!!e.data),this._getType(e)!==Ue.boolean){let i=this._getOrReturnCtx(e);return Le(i,{code:ve.invalid_type,expected:Ue.boolean,received:i.parsedType}),ot}return Pn(e.data)}};ts.create=n=>new ts({typeName:it.ZodBoolean,coerce:n?.coerce||!1,...gt(n)});var ns=class n extends _t{_parse(e){if(this._def.coerce&&(e.data=new Date(e.data)),this._getType(e)!==Ue.date){let s=this._getOrReturnCtx(e);return Le(s,{code:ve.invalid_type,expected:Ue.date,received:s.parsedType}),ot}if(isNaN(e.data.getTime())){let s=this._getOrReturnCtx(e);return Le(s,{code:ve.invalid_date}),ot}let i=new Tn,r;for(let s of this._def.checks)s.kind==="min"?e.data.getTime()<s.value&&(r=this._getOrReturnCtx(e,r),Le(r,{code:ve.too_small,message:s.message,inclusive:!0,exact:!1,minimum:s.value,type:"date"}),i.dirty()):s.kind==="max"?e.data.getTime()>s.value&&(r=this._getOrReturnCtx(e,r),Le(r,{code:ve.too_big,message:s.message,inclusive:!0,exact:!1,maximum:s.value,type:"date"}),i.dirty()):Nt.assertNever(s);return{status:i.value,value:new Date(e.data.getTime())}}_addCheck(e){return new n({...this._def,checks:[...this._def.checks,e]})}min(e,t){return this._addCheck({kind:"min",value:e.getTime(),message:je.toString(t)})}max(e,t){return this._addCheck({kind:"max",value:e.getTime(),message:je.toString(t)})}get minDate(){let e=null;for(let t of this._def.checks)t.kind==="min"&&(e===null||t.value>e)&&(e=t.value);return e!=null?new Date(e):null}get maxDate(){let e=null;for(let t of this._def.checks)t.kind==="max"&&(e===null||t.value<e)&&(e=t.value);return e!=null?new Date(e):null}};ns.create=n=>new ns({checks:[],coerce:n?.coerce||!1,typeName:it.ZodDate,...gt(n)});var Ks=class extends _t{_parse(e){if(this._getType(e)!==Ue.symbol){let i=this._getOrReturnCtx(e);return Le(i,{code:ve.invalid_type,expected:Ue.symbol,received:i.parsedType}),ot}return Pn(e.data)}};Ks.create=n=>new Ks({typeName:it.ZodSymbol,...gt(n)});var is=class extends _t{_parse(e){if(this._getType(e)!==Ue.undefined){let i=this._getOrReturnCtx(e);return Le(i,{code:ve.invalid_type,expected:Ue.undefined,received:i.parsedType}),ot}return Pn(e.data)}};is.create=n=>new is({typeName:it.ZodUndefined,...gt(n)});var rs=class extends _t{_parse(e){if(this._getType(e)!==Ue.null){let i=this._getOrReturnCtx(e);return Le(i,{code:ve.invalid_type,expected:Ue.null,received:i.parsedType}),ot}return Pn(e.data)}};rs.create=n=>new rs({typeName:it.ZodNull,...gt(n)});var Ir=class extends _t{constructor(){super(...arguments),this._any=!0}_parse(e){return Pn(e.data)}};Ir.create=n=>new Ir({typeName:it.ZodAny,...gt(n)});var ir=class extends _t{constructor(){super(...arguments),this._unknown=!0}_parse(e){return Pn(e.data)}};ir.create=n=>new ir({typeName:it.ZodUnknown,...gt(n)});var vi=class extends _t{_parse(e){let t=this._getOrReturnCtx(e);return Le(t,{code:ve.invalid_type,expected:Ue.never,received:t.parsedType}),ot}};vi.create=n=>new vi({typeName:it.ZodNever,...gt(n)});var js=class extends _t{_parse(e){if(this._getType(e)!==Ue.undefined){let i=this._getOrReturnCtx(e);return Le(i,{code:ve.invalid_type,expected:Ue.void,received:i.parsedType}),ot}return Pn(e.data)}};js.create=n=>new js({typeName:it.ZodVoid,...gt(n)});var rr=class n extends _t{_parse(e){let{ctx:t,status:i}=this._processInputParams(e),r=this._def;if(t.parsedType!==Ue.array)return Le(t,{code:ve.invalid_type,expected:Ue.array,received:t.parsedType}),ot;if(r.exactLength!==null){let a=t.data.length>r.exactLength.value,o=t.data.length<r.exactLength.value;(a||o)&&(Le(t,{code:a?ve.too_big:ve.too_small,minimum:o?r.exactLength.value:void 0,maximum:a?r.exactLength.value:void 0,type:"array",inclusive:!0,exact:!0,message:r.exactLength.message}),i.dirty())}if(r.minLength!==null&&t.data.length<r.minLength.value&&(Le(t,{code:ve.too_small,minimum:r.minLength.value,type:"array",inclusive:!0,exact:!1,message:r.minLength.message}),i.dirty()),r.maxLength!==null&&t.data.length>r.maxLength.value&&(Le(t,{code:ve.too_big,maximum:r.maxLength.value,type:"array",inclusive:!0,exact:!1,message:r.maxLength.message}),i.dirty()),t.common.async)return Promise.all([...t.data].map((a,o)=>r.type._parseAsync(new hi(t,a,t.path,o)))).then(a=>Tn.mergeArray(i,a));let s=[...t.data].map((a,o)=>r.type._parseSync(new hi(t,a,t.path,o)));return Tn.mergeArray(i,s)}get element(){return this._def.type}min(e,t){return new n({...this._def,minLength:{value:e,message:je.toString(t)}})}max(e,t){return new n({...this._def,maxLength:{value:e,message:je.toString(t)}})}length(e,t){return new n({...this._def,exactLength:{value:e,message:je.toString(t)}})}nonempty(e){return this.min(1,e)}};rr.create=(n,e)=>new rr({type:n,minLength:null,maxLength:null,exactLength:null,typeName:it.ZodArray,...gt(e)});function qs(n){if(n instanceof kn){let e={};for(let t in n.shape){let i=n.shape[t];e[t]=ui.create(qs(i))}return new kn({...n._def,shape:()=>e})}else return n instanceof rr?new rr({...n._def,type:qs(n.element)}):n instanceof ui?ui.create(qs(n.unwrap())):n instanceof Oi?Oi.create(qs(n.unwrap())):n instanceof Ui?Ui.create(n.items.map(e=>qs(e))):n}var kn=class n extends _t{constructor(){super(...arguments),this._cached=null,this.nonstrict=this.passthrough,this.augment=this.extend}_getCached(){if(this._cached!==null)return this._cached;let e=this._def.shape(),t=Nt.objectKeys(e);return this._cached={shape:e,keys:t}}_parse(e){if(this._getType(e)!==Ue.object){let l=this._getOrReturnCtx(e);return Le(l,{code:ve.invalid_type,expected:Ue.object,received:l.parsedType}),ot}let{status:i,ctx:r}=this._processInputParams(e),{shape:s,keys:a}=this._getCached(),o=[];if(!(this._def.catchall instanceof vi&&this._def.unknownKeys==="strip"))for(let l in r.data)a.includes(l)||o.push(l);let c=[];for(let l of a){let u=s[l],h=r.data[l];c.push({key:{status:"valid",value:l},value:u._parse(new hi(r,h,r.path,l)),alwaysSet:l in r.data})}if(this._def.catchall instanceof vi){let l=this._def.unknownKeys;if(l==="passthrough")for(let u of o)c.push({key:{status:"valid",value:u},value:{status:"valid",value:r.data[u]}});else if(l==="strict")o.length>0&&(Le(r,{code:ve.unrecognized_keys,keys:o}),i.dirty());else if(l!=="strip")throw new Error("Internal ZodObject error: invalid unknownKeys value.")}else{let l=this._def.catchall;for(let u of o){let h=r.data[u];c.push({key:{status:"valid",value:u},value:l._parse(new hi(r,h,r.path,u)),alwaysSet:u in r.data})}}return r.common.async?Promise.resolve().then(async()=>{let l=[];for(let u of c){let h=await u.key,f=await u.value;l.push({key:h,value:f,alwaysSet:u.alwaysSet})}return l}).then(l=>Tn.mergeObjectSync(i,l)):Tn.mergeObjectSync(i,c)}get shape(){return this._def.shape()}strict(e){return je.errToObj,new n({...this._def,unknownKeys:"strict",...e!==void 0?{errorMap:(t,i)=>{var r,s,a,o;let c=(a=(s=(r=this._def).errorMap)===null||s===void 0?void 0:s.call(r,t,i).message)!==null&&a!==void 0?a:i.defaultError;return t.code==="unrecognized_keys"?{message:(o=je.errToObj(e).message)!==null&&o!==void 0?o:c}:{message:c}}}:{}})}strip(){return new n({...this._def,unknownKeys:"strip"})}passthrough(){return new n({...this._def,unknownKeys:"passthrough"})}extend(e){return new n({...this._def,shape:()=>({...this._def.shape(),...e})})}merge(e){return new n({unknownKeys:e._def.unknownKeys,catchall:e._def.catchall,shape:()=>({...this._def.shape(),...e._def.shape()}),typeName:it.ZodObject})}setKey(e,t){return this.augment({[e]:t})}catchall(e){return new n({...this._def,catchall:e})}pick(e){let t={};return Nt.objectKeys(e).forEach(i=>{e[i]&&this.shape[i]&&(t[i]=this.shape[i])}),new n({...this._def,shape:()=>t})}omit(e){let t={};return Nt.objectKeys(this.shape).forEach(i=>{e[i]||(t[i]=this.shape[i])}),new n({...this._def,shape:()=>t})}deepPartial(){return qs(this)}partial(e){let t={};return Nt.objectKeys(this.shape).forEach(i=>{let r=this.shape[i];e&&!e[i]?t[i]=r:t[i]=r.optional()}),new n({...this._def,shape:()=>t})}required(e){let t={};return Nt.objectKeys(this.shape).forEach(i=>{if(e&&!e[i])t[i]=this.shape[i];else{let s=this.shape[i];for(;s instanceof ui;)s=s._def.innerType;t[i]=s}}),new n({...this._def,shape:()=>t})}keyof(){return Tp(Nt.objectKeys(this.shape))}};kn.create=(n,e)=>new kn({shape:()=>n,unknownKeys:"strip",catchall:vi.create(),typeName:it.ZodObject,...gt(e)});kn.strictCreate=(n,e)=>new kn({shape:()=>n,unknownKeys:"strict",catchall:vi.create(),typeName:it.ZodObject,...gt(e)});kn.lazycreate=(n,e)=>new kn({shape:n,unknownKeys:"strip",catchall:vi.create(),typeName:it.ZodObject,...gt(e)});var ss=class extends _t{_parse(e){let{ctx:t}=this._processInputParams(e),i=this._def.options;function r(s){for(let o of s)if(o.result.status==="valid")return o.result;for(let o of s)if(o.result.status==="dirty")return t.common.issues.push(...o.ctx.common.issues),o.result;let a=s.map(o=>new Zn(o.ctx.common.issues));return Le(t,{code:ve.invalid_union,unionErrors:a}),ot}if(t.common.async)return Promise.all(i.map(async s=>{let a={...t,common:{...t.common,issues:[]},parent:null};return{result:await s._parseAsync({data:t.data,path:t.path,parent:a}),ctx:a}})).then(r);{let s,a=[];for(let c of i){let l={...t,common:{...t.common,issues:[]},parent:null},u=c._parseSync({data:t.data,path:t.path,parent:l});if(u.status==="valid")return u;u.status==="dirty"&&!s&&(s={result:u,ctx:l}),l.common.issues.length&&a.push(l.common.issues)}if(s)return t.common.issues.push(...s.ctx.common.issues),s.result;let o=a.map(c=>new Zn(c));return Le(t,{code:ve.invalid_union,unionErrors:o}),ot}}get options(){return this._def.options}};ss.create=(n,e)=>new ss({options:n,typeName:it.ZodUnion,...gt(e)});var nr=n=>n instanceof os?nr(n.schema):n instanceof Kn?nr(n.innerType()):n instanceof ls?[n.value]:n instanceof cs?n.options:n instanceof us?Nt.objectValues(n.enum):n instanceof hs?nr(n._def.innerType):n instanceof is?[void 0]:n instanceof rs?[null]:n instanceof ui?[void 0,...nr(n.unwrap())]:n instanceof Oi?[null,...nr(n.unwrap())]:n instanceof ao||n instanceof fs?nr(n.unwrap()):n instanceof ds?nr(n._def.innerType):[],Ol=class n extends _t{_parse(e){let{ctx:t}=this._processInputParams(e);if(t.parsedType!==Ue.object)return Le(t,{code:ve.invalid_type,expected:Ue.object,received:t.parsedType}),ot;let i=this.discriminator,r=t.data[i],s=this.optionsMap.get(r);return s?t.common.async?s._parseAsync({data:t.data,path:t.path,parent:t}):s._parseSync({data:t.data,path:t.path,parent:t}):(Le(t,{code:ve.invalid_union_discriminator,options:Array.from(this.optionsMap.keys()),path:[i]}),ot)}get discriminator(){return this._def.discriminator}get options(){return this._def.options}get optionsMap(){return this._def.optionsMap}static create(e,t,i){let r=new Map;for(let s of t){let a=nr(s.shape[e]);if(!a.length)throw new Error(`A discriminator value for key \`${e}\` could not be extracted from all schema options`);for(let o of a){if(r.has(o))throw new Error(`Discriminator property ${String(e)} has duplicate value ${String(o)}`);r.set(o,s)}}return new n({typeName:it.ZodDiscriminatedUnion,discriminator:e,options:t,optionsMap:r,...gt(i)})}};function ph(n,e){let t=wr(n),i=wr(e);if(n===e)return{valid:!0,data:n};if(t===Ue.object&&i===Ue.object){let r=Nt.objectKeys(e),s=Nt.objectKeys(n).filter(o=>r.indexOf(o)!==-1),a={...n,...e};for(let o of s){let c=ph(n[o],e[o]);if(!c.valid)return{valid:!1};a[o]=c.data}return{valid:!0,data:a}}else if(t===Ue.array&&i===Ue.array){if(n.length!==e.length)return{valid:!1};let r=[];for(let s=0;s<n.length;s++){let a=n[s],o=e[s],c=ph(a,o);if(!c.valid)return{valid:!1};r.push(c.data)}return{valid:!0,data:r}}else return t===Ue.date&&i===Ue.date&&+n==+e?{valid:!0,data:n}:{valid:!1}}var as=class extends _t{_parse(e){let{status:t,ctx:i}=this._processInputParams(e),r=(s,a)=>{if(dh(s)||dh(a))return ot;let o=ph(s.value,a.value);return o.valid?((fh(s)||fh(a))&&t.dirty(),{status:t.value,value:o.data}):(Le(i,{code:ve.invalid_intersection_types}),ot)};return i.common.async?Promise.all([this._def.left._parseAsync({data:i.data,path:i.path,parent:i}),this._def.right._parseAsync({data:i.data,path:i.path,parent:i})]).then(([s,a])=>r(s,a)):r(this._def.left._parseSync({data:i.data,path:i.path,parent:i}),this._def.right._parseSync({data:i.data,path:i.path,parent:i}))}};as.create=(n,e,t)=>new as({left:n,right:e,typeName:it.ZodIntersection,...gt(t)});var Ui=class n extends _t{_parse(e){let{status:t,ctx:i}=this._processInputParams(e);if(i.parsedType!==Ue.array)return Le(i,{code:ve.invalid_type,expected:Ue.array,received:i.parsedType}),ot;if(i.data.length<this._def.items.length)return Le(i,{code:ve.too_small,minimum:this._def.items.length,inclusive:!0,exact:!1,type:"array"}),ot;!this._def.rest&&i.data.length>this._def.items.length&&(Le(i,{code:ve.too_big,maximum:this._def.items.length,inclusive:!0,exact:!1,type:"array"}),t.dirty());let s=[...i.data].map((a,o)=>{let c=this._def.items[o]||this._def.rest;return c?c._parse(new hi(i,a,i.path,o)):null}).filter(a=>!!a);return i.common.async?Promise.all(s).then(a=>Tn.mergeArray(t,a)):Tn.mergeArray(t,s)}get items(){return this._def.items}rest(e){return new n({...this._def,rest:e})}};Ui.create=(n,e)=>{if(!Array.isArray(n))throw new Error("You must pass an array of schemas to z.tuple([ ... ])");return new Ui({items:n,typeName:it.ZodTuple,rest:null,...gt(e)})};var Fl=class n extends _t{get keySchema(){return this._def.keyType}get valueSchema(){return this._def.valueType}_parse(e){let{status:t,ctx:i}=this._processInputParams(e);if(i.parsedType!==Ue.object)return Le(i,{code:ve.invalid_type,expected:Ue.object,received:i.parsedType}),ot;let r=[],s=this._def.keyType,a=this._def.valueType;for(let o in i.data)r.push({key:s._parse(new hi(i,o,i.path,o)),value:a._parse(new hi(i,i.data[o],i.path,o)),alwaysSet:o in i.data});return i.common.async?Tn.mergeObjectAsync(t,r):Tn.mergeObjectSync(t,r)}get element(){return this._def.valueType}static create(e,t,i){return t instanceof _t?new n({keyType:e,valueType:t,typeName:it.ZodRecord,...gt(i)}):new n({keyType:Rr.create(),valueType:e,typeName:it.ZodRecord,...gt(t)})}},$s=class extends _t{get keySchema(){return this._def.keyType}get valueSchema(){return this._def.valueType}_parse(e){let{status:t,ctx:i}=this._processInputParams(e);if(i.parsedType!==Ue.map)return Le(i,{code:ve.invalid_type,expected:Ue.map,received:i.parsedType}),ot;let r=this._def.keyType,s=this._def.valueType,a=[...i.data.entries()].map(([o,c],l)=>({key:r._parse(new hi(i,o,i.path,[l,"key"])),value:s._parse(new hi(i,c,i.path,[l,"value"]))}));if(i.common.async){let o=new Map;return Promise.resolve().then(async()=>{for(let c of a){let l=await c.key,u=await c.value;if(l.status==="aborted"||u.status==="aborted")return ot;(l.status==="dirty"||u.status==="dirty")&&t.dirty(),o.set(l.value,u.value)}return{status:t.value,value:o}})}else{let o=new Map;for(let c of a){let l=c.key,u=c.value;if(l.status==="aborted"||u.status==="aborted")return ot;(l.status==="dirty"||u.status==="dirty")&&t.dirty(),o.set(l.value,u.value)}return{status:t.value,value:o}}}};$s.create=(n,e,t)=>new $s({valueType:e,keyType:n,typeName:it.ZodMap,...gt(t)});var Js=class n extends _t{_parse(e){let{status:t,ctx:i}=this._processInputParams(e);if(i.parsedType!==Ue.set)return Le(i,{code:ve.invalid_type,expected:Ue.set,received:i.parsedType}),ot;let r=this._def;r.minSize!==null&&i.data.size<r.minSize.value&&(Le(i,{code:ve.too_small,minimum:r.minSize.value,type:"set",inclusive:!0,exact:!1,message:r.minSize.message}),t.dirty()),r.maxSize!==null&&i.data.size>r.maxSize.value&&(Le(i,{code:ve.too_big,maximum:r.maxSize.value,type:"set",inclusive:!0,exact:!1,message:r.maxSize.message}),t.dirty());let s=this._def.valueType;function a(c){let l=new Set;for(let u of c){if(u.status==="aborted")return ot;u.status==="dirty"&&t.dirty(),l.add(u.value)}return{status:t.value,value:l}}let o=[...i.data.values()].map((c,l)=>s._parse(new hi(i,c,i.path,l)));return i.common.async?Promise.all(o).then(c=>a(c)):a(o)}min(e,t){return new n({...this._def,minSize:{value:e,message:je.toString(t)}})}max(e,t){return new n({...this._def,maxSize:{value:e,message:je.toString(t)}})}size(e,t){return this.min(e,t).max(e,t)}nonempty(e){return this.min(1,e)}};Js.create=(n,e)=>new Js({valueType:n,minSize:null,maxSize:null,typeName:it.ZodSet,...gt(e)});var Bl=class n extends _t{constructor(){super(...arguments),this.validate=this.implement}_parse(e){let{ctx:t}=this._processInputParams(e);if(t.parsedType!==Ue.function)return Le(t,{code:ve.invalid_type,expected:Ue.function,received:t.parsedType}),ot;function i(o,c){return Dl({data:o,path:t.path,errorMaps:[t.common.contextualErrorMap,t.schemaErrorMap,Ll(),Zs].filter(l=>!!l),issueData:{code:ve.invalid_arguments,argumentsError:c}})}function r(o,c){return Dl({data:o,path:t.path,errorMaps:[t.common.contextualErrorMap,t.schemaErrorMap,Ll(),Zs].filter(l=>!!l),issueData:{code:ve.invalid_return_type,returnTypeError:c}})}let s={errorMap:t.common.contextualErrorMap},a=t.data;if(this._def.returns instanceof Cr){let o=this;return Pn(async function(...c){let l=new Zn([]),u=await o._def.args.parseAsync(c,s).catch(m=>{throw l.addIssue(i(c,m)),l}),h=await Reflect.apply(a,this,u);return await o._def.returns._def.type.parseAsync(h,s).catch(m=>{throw l.addIssue(r(h,m)),l})})}else{let o=this;return Pn(function(...c){let l=o._def.args.safeParse(c,s);if(!l.success)throw new Zn([i(c,l.error)]);let u=Reflect.apply(a,this,l.data),h=o._def.returns.safeParse(u,s);if(!h.success)throw new Zn([r(u,h.error)]);return h.data})}}parameters(){return this._def.args}returnType(){return this._def.returns}args(...e){return new n({...this._def,args:Ui.create(e).rest(ir.create())})}returns(e){return new n({...this._def,returns:e})}implement(e){return this.parse(e)}strictImplement(e){return this.parse(e)}static create(e,t,i){return new n({args:e||Ui.create([]).rest(ir.create()),returns:t||ir.create(),typeName:it.ZodFunction,...gt(i)})}},os=class extends _t{get schema(){return this._def.getter()}_parse(e){let{ctx:t}=this._processInputParams(e);return this._def.getter()._parse({data:t.data,path:t.path,parent:t})}};os.create=(n,e)=>new os({getter:n,typeName:it.ZodLazy,...gt(e)});var ls=class extends _t{_parse(e){if(e.data!==this._def.value){let t=this._getOrReturnCtx(e);return Le(t,{received:t.data,code:ve.invalid_literal,expected:this._def.value}),ot}return{status:"valid",value:e.data}}get value(){return this._def.value}};ls.create=(n,e)=>new ls({value:n,typeName:it.ZodLiteral,...gt(e)});function Tp(n,e){return new cs({values:n,typeName:it.ZodEnum,...gt(e)})}var cs=class n extends _t{constructor(){super(...arguments),no.set(this,void 0)}_parse(e){if(typeof e.data!="string"){let t=this._getOrReturnCtx(e),i=this._def.values;return Le(t,{expected:Nt.joinValues(i),received:t.parsedType,code:ve.invalid_type}),ot}if(Ul(this,no)||Sp(this,no,new Set(this._def.values)),!Ul(this,no).has(e.data)){let t=this._getOrReturnCtx(e),i=this._def.values;return Le(t,{received:t.data,code:ve.invalid_enum_value,options:i}),ot}return Pn(e.data)}get options(){return this._def.values}get enum(){let e={};for(let t of this._def.values)e[t]=t;return e}get Values(){let e={};for(let t of this._def.values)e[t]=t;return e}get Enum(){let e={};for(let t of this._def.values)e[t]=t;return e}extract(e,t=this._def){return n.create(e,{...this._def,...t})}exclude(e,t=this._def){return n.create(this.options.filter(i=>!e.includes(i)),{...this._def,...t})}};no=new WeakMap;cs.create=Tp;var us=class extends _t{constructor(){super(...arguments),io.set(this,void 0)}_parse(e){let t=Nt.getValidEnumValues(this._def.values),i=this._getOrReturnCtx(e);if(i.parsedType!==Ue.string&&i.parsedType!==Ue.number){let r=Nt.objectValues(t);return Le(i,{expected:Nt.joinValues(r),received:i.parsedType,code:ve.invalid_type}),ot}if(Ul(this,io)||Sp(this,io,new Set(Nt.getValidEnumValues(this._def.values))),!Ul(this,io).has(e.data)){let r=Nt.objectValues(t);return Le(i,{received:i.data,code:ve.invalid_enum_value,options:r}),ot}return Pn(e.data)}get enum(){return this._def.values}};io=new WeakMap;us.create=(n,e)=>new us({values:n,typeName:it.ZodNativeEnum,...gt(e)});var Cr=class extends _t{unwrap(){return this._def.type}_parse(e){let{ctx:t}=this._processInputParams(e);if(t.parsedType!==Ue.promise&&t.common.async===!1)return Le(t,{code:ve.invalid_type,expected:Ue.promise,received:t.parsedType}),ot;let i=t.parsedType===Ue.promise?t.data:Promise.resolve(t.data);return Pn(i.then(r=>this._def.type.parseAsync(r,{path:t.path,errorMap:t.common.contextualErrorMap})))}};Cr.create=(n,e)=>new Cr({type:n,typeName:it.ZodPromise,...gt(e)});var Kn=class extends _t{innerType(){return this._def.schema}sourceType(){return this._def.schema._def.typeName===it.ZodEffects?this._def.schema.sourceType():this._def.schema}_parse(e){let{status:t,ctx:i}=this._processInputParams(e),r=this._def.effect||null,s={addIssue:a=>{Le(i,a),a.fatal?t.abort():t.dirty()},get path(){return i.path}};if(s.addIssue=s.addIssue.bind(s),r.type==="preprocess"){let a=r.transform(i.data,s);if(i.common.async)return Promise.resolve(a).then(async o=>{if(t.value==="aborted")return ot;let c=await this._def.schema._parseAsync({data:o,path:i.path,parent:i});return c.status==="aborted"?ot:c.status==="dirty"||t.value==="dirty"?Ys(c.value):c});{if(t.value==="aborted")return ot;let o=this._def.schema._parseSync({data:a,path:i.path,parent:i});return o.status==="aborted"?ot:o.status==="dirty"||t.value==="dirty"?Ys(o.value):o}}if(r.type==="refinement"){let a=o=>{let c=r.refinement(o,s);if(i.common.async)return Promise.resolve(c);if(c instanceof Promise)throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");return o};if(i.common.async===!1){let o=this._def.schema._parseSync({data:i.data,path:i.path,parent:i});return o.status==="aborted"?ot:(o.status==="dirty"&&t.dirty(),a(o.value),{status:t.value,value:o.value})}else return this._def.schema._parseAsync({data:i.data,path:i.path,parent:i}).then(o=>o.status==="aborted"?ot:(o.status==="dirty"&&t.dirty(),a(o.value).then(()=>({status:t.value,value:o.value}))))}if(r.type==="transform")if(i.common.async===!1){let a=this._def.schema._parseSync({data:i.data,path:i.path,parent:i});if(!ro(a))return a;let o=r.transform(a.value,s);if(o instanceof Promise)throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");return{status:t.value,value:o}}else return this._def.schema._parseAsync({data:i.data,path:i.path,parent:i}).then(a=>ro(a)?Promise.resolve(r.transform(a.value,s)).then(o=>({status:t.value,value:o})):a);Nt.assertNever(r)}};Kn.create=(n,e,t)=>new Kn({schema:n,typeName:it.ZodEffects,effect:e,...gt(t)});Kn.createWithPreprocess=(n,e,t)=>new Kn({schema:e,effect:{type:"preprocess",transform:n},typeName:it.ZodEffects,...gt(t)});var ui=class extends _t{_parse(e){return this._getType(e)===Ue.undefined?Pn(void 0):this._def.innerType._parse(e)}unwrap(){return this._def.innerType}};ui.create=(n,e)=>new ui({innerType:n,typeName:it.ZodOptional,...gt(e)});var Oi=class extends _t{_parse(e){return this._getType(e)===Ue.null?Pn(null):this._def.innerType._parse(e)}unwrap(){return this._def.innerType}};Oi.create=(n,e)=>new Oi({innerType:n,typeName:it.ZodNullable,...gt(e)});var hs=class extends _t{_parse(e){let{ctx:t}=this._processInputParams(e),i=t.data;return t.parsedType===Ue.undefined&&(i=this._def.defaultValue()),this._def.innerType._parse({data:i,path:t.path,parent:t})}removeDefault(){return this._def.innerType}};hs.create=(n,e)=>new hs({innerType:n,typeName:it.ZodDefault,defaultValue:typeof e.default=="function"?e.default:()=>e.default,...gt(e)});var ds=class extends _t{_parse(e){let{ctx:t}=this._processInputParams(e),i={...t,common:{...t.common,issues:[]}},r=this._def.innerType._parse({data:i.data,path:i.path,parent:{...i}});return so(r)?r.then(s=>({status:"valid",value:s.status==="valid"?s.value:this._def.catchValue({get error(){return new Zn(i.common.issues)},input:i.data})})):{status:"valid",value:r.status==="valid"?r.value:this._def.catchValue({get error(){return new Zn(i.common.issues)},input:i.data})}}removeCatch(){return this._def.innerType}};ds.create=(n,e)=>new ds({innerType:n,typeName:it.ZodCatch,catchValue:typeof e.catch=="function"?e.catch:()=>e.catch,...gt(e)});var Qs=class extends _t{_parse(e){if(this._getType(e)!==Ue.nan){let i=this._getOrReturnCtx(e);return Le(i,{code:ve.invalid_type,expected:Ue.nan,received:i.parsedType}),ot}return{status:"valid",value:e.data}}};Qs.create=n=>new Qs({typeName:it.ZodNaN,...gt(n)});var ox=Symbol("zod_brand"),ao=class extends _t{_parse(e){let{ctx:t}=this._processInputParams(e),i=t.data;return this._def.type._parse({data:i,path:t.path,parent:t})}unwrap(){return this._def.type}},oo=class n extends _t{_parse(e){let{status:t,ctx:i}=this._processInputParams(e);if(i.common.async)return(async()=>{let s=await this._def.in._parseAsync({data:i.data,path:i.path,parent:i});return s.status==="aborted"?ot:s.status==="dirty"?(t.dirty(),Ys(s.value)):this._def.out._parseAsync({data:s.value,path:i.path,parent:i})})();{let r=this._def.in._parseSync({data:i.data,path:i.path,parent:i});return r.status==="aborted"?ot:r.status==="dirty"?(t.dirty(),{status:"dirty",value:r.value}):this._def.out._parseSync({data:r.value,path:i.path,parent:i})}}static create(e,t){return new n({in:e,out:t,typeName:it.ZodPipeline})}},fs=class extends _t{_parse(e){let t=this._def.innerType._parse(e),i=r=>(ro(r)&&(r.value=Object.freeze(r.value)),r);return so(t)?t.then(r=>i(r)):i(t)}unwrap(){return this._def.innerType}};fs.create=(n,e)=>new fs({innerType:n,typeName:it.ZodReadonly,...gt(e)});function kl(n,e={},t){return n?Ir.create().superRefine((i,r)=>{var s,a;if(!n(i)){let o=typeof e=="function"?e(i):typeof e=="string"?{message:e}:e,c=(a=(s=o.fatal)!==null&&s!==void 0?s:t)!==null&&a!==void 0?a:!0,l=typeof o=="string"?{message:o}:o;r.addIssue({code:"custom",...l,fatal:c})}}):Ir.create()}var lx={object:kn.lazycreate},it;(function(n){n.ZodString="ZodString",n.ZodNumber="ZodNumber",n.ZodNaN="ZodNaN",n.ZodBigInt="ZodBigInt",n.ZodBoolean="ZodBoolean",n.ZodDate="ZodDate",n.ZodSymbol="ZodSymbol",n.ZodUndefined="ZodUndefined",n.ZodNull="ZodNull",n.ZodAny="ZodAny",n.ZodUnknown="ZodUnknown",n.ZodNever="ZodNever",n.ZodVoid="ZodVoid",n.ZodArray="ZodArray",n.ZodObject="ZodObject",n.ZodUnion="ZodUnion",n.ZodDiscriminatedUnion="ZodDiscriminatedUnion",n.ZodIntersection="ZodIntersection",n.ZodTuple="ZodTuple",n.ZodRecord="ZodRecord",n.ZodMap="ZodMap",n.ZodSet="ZodSet",n.ZodFunction="ZodFunction",n.ZodLazy="ZodLazy",n.ZodLiteral="ZodLiteral",n.ZodEnum="ZodEnum",n.ZodEffects="ZodEffects",n.ZodNativeEnum="ZodNativeEnum",n.ZodOptional="ZodOptional",n.ZodNullable="ZodNullable",n.ZodDefault="ZodDefault",n.ZodCatch="ZodCatch",n.ZodPromise="ZodPromise",n.ZodBranded="ZodBranded",n.ZodPipeline="ZodPipeline",n.ZodReadonly="ZodReadonly"})(it||(it={}));var cx=(n,e={message:`Input not instance of ${n.name}`})=>kl(t=>t instanceof n,e),V=Rr.create,We=Qr.create,ux=Qs.create,mh=es.create,et=ts.create,hx=ns.create,dx=Ks.create,fx=is.create,ea=rs.create,px=Ir.create,ps=ir.create,mx=vi.create,gx=js.create,Rt=rr.create,ye=kn.create,_x=kn.strictCreate,lo=ss.create,xx=Ol.create,vx=as.create,yx=Ui.create,Sx=Fl.create,bx=$s.create,Mx=Js.create,Ex=Bl.create,Tx=os.create,qt=ls.create,Ax=cs.create,sr=us.create,wx=Cr.create,vp=Kn.create,gh=ui.create,Rx=Oi.create,_h=Kn.createWithPreprocess,Ix=oo.create,Cx=()=>V().optional(),Px=()=>We().optional(),Nx=()=>et().optional(),Lx={string:(n=>Rr.create({...n,coerce:!0})),number:(n=>Qr.create({...n,coerce:!0})),boolean:(n=>ts.create({...n,coerce:!0})),bigint:(n=>es.create({...n,coerce:!0})),date:(n=>ns.create({...n,coerce:!0}))},Dx=ot,U=Object.freeze({__proto__:null,defaultErrorMap:Zs,setErrorMap:W0,getErrorMap:Ll,makeIssue:Dl,EMPTY_PATH:X0,addIssueToContext:Le,ParseStatus:Tn,INVALID:ot,DIRTY:Ys,OK:Pn,isAborted:dh,isDirty:fh,isValid:ro,isAsync:so,get util(){return Nt},get objectUtil(){return hh},ZodParsedType:Ue,getParsedType:wr,ZodType:_t,datetimeRegex:Ep,ZodString:Rr,ZodNumber:Qr,ZodBigInt:es,ZodBoolean:ts,ZodDate:ns,ZodSymbol:Ks,ZodUndefined:is,ZodNull:rs,ZodAny:Ir,ZodUnknown:ir,ZodNever:vi,ZodVoid:js,ZodArray:rr,ZodObject:kn,ZodUnion:ss,ZodDiscriminatedUnion:Ol,ZodIntersection:as,ZodTuple:Ui,ZodRecord:Fl,ZodMap:$s,ZodSet:Js,ZodFunction:Bl,ZodLazy:os,ZodLiteral:ls,ZodEnum:cs,ZodNativeEnum:us,ZodPromise:Cr,ZodEffects:Kn,ZodTransformer:Kn,ZodOptional:ui,ZodNullable:Oi,ZodDefault:hs,ZodCatch:ds,ZodNaN:Qs,BRAND:ox,ZodBranded:ao,ZodPipeline:oo,ZodReadonly:fs,custom:kl,Schema:_t,ZodSchema:_t,late:lx,get ZodFirstPartyTypeKind(){return it},coerce:Lx,any:px,array:Rt,bigint:mh,boolean:et,date:hx,discriminatedUnion:xx,effect:vp,enum:Ax,function:Ex,instanceof:cx,intersection:vx,lazy:Tx,literal:qt,map:bx,nan:ux,nativeEnum:sr,never:mx,null:ea,nullable:Rx,number:We,object:ye,oboolean:Nx,onumber:Px,optional:gh,ostring:Cx,pipeline:Ix,preprocess:_h,promise:wx,record:Sx,set:Mx,strictObject:_x,string:V,symbol:dx,transformer:vp,tuple:yx,undefined:fx,union:lo,unknown:ps,void:gx,NEVER:Dx,ZodIssueCode:ve,quotelessJson:H0,ZodError:Zn});var zl={exports:{}};var Ap;function wp(){return Ap?zl.exports:(Ap=1,(function(n){var e=(function(t){var i=1e7,r=7,s=9007199254740992,a=x(s),o="0123456789abcdefghijklmnopqrstuvwxyz",c=typeof BigInt=="function";function l(p,d,S,A){return typeof p>"u"?l[0]:typeof d<"u"?+d==10&&!S?xe(p):j(p,d,S,A):xe(p)}function u(p,d){this.value=p,this.sign=d,this.isSmall=!1}u.prototype=Object.create(l.prototype);function h(p){this.value=p,this.sign=p<0,this.isSmall=!0}h.prototype=Object.create(l.prototype);function f(p){this.value=p}f.prototype=Object.create(l.prototype);function m(p){return-s<p&&p<s}function x(p){return p<1e7?[p]:p<1e14?[p%1e7,Math.floor(p/1e7)]:[p%1e7,Math.floor(p/1e7)%1e7,Math.floor(p/1e14)]}function v(p){g(p);var d=p.length;if(d<4&&ue(p,a)<0)switch(d){case 0:return 0;case 1:return p[0];case 2:return p[0]+p[1]*i;default:return p[0]+(p[1]+p[2]*i)*i}return p}function g(p){for(var d=p.length;p[--d]===0;);p.length=d+1}function _(p){for(var d=new Array(p),S=-1;++S<p;)d[S]=0;return d}function T(p){return p>0?Math.floor(p):Math.ceil(p)}function I(p,d){var S=p.length,A=d.length,P=new Array(S),D=0,X=i,L,F;for(F=0;F<A;F++)L=p[F]+d[F]+D,D=L>=X?1:0,P[F]=L-D*X;for(;F<S;)L=p[F]+D,D=L===X?1:0,P[F++]=L-D*X;return D>0&&P.push(D),P}function E(p,d){return p.length>=d.length?I(p,d):I(d,p)}function w(p,d){var S=p.length,A=new Array(S),P=i,D,X;for(X=0;X<S;X++)D=p[X]-P+d,d=Math.floor(D/P),A[X]=D-d*P,d+=1;for(;d>0;)A[X++]=d%P,d=Math.floor(d/P);return A}u.prototype.add=function(p){var d=xe(p);if(this.sign!==d.sign)return this.subtract(d.negate());var S=this.value,A=d.value;return d.isSmall?new u(w(S,Math.abs(A)),this.sign):new u(E(S,A),this.sign)},u.prototype.plus=u.prototype.add,h.prototype.add=function(p){var d=xe(p),S=this.value;if(S<0!==d.sign)return this.subtract(d.negate());var A=d.value;if(d.isSmall){if(m(S+A))return new h(S+A);A=x(Math.abs(A))}return new u(w(A,Math.abs(S)),S<0)},h.prototype.plus=h.prototype.add,f.prototype.add=function(p){return new f(this.value+xe(p).value)},f.prototype.plus=f.prototype.add;function R(p,d){var S=p.length,A=d.length,P=new Array(S),D=0,X=i,L,F;for(L=0;L<A;L++)F=p[L]-D-d[L],F<0?(F+=X,D=1):D=0,P[L]=F;for(L=A;L<S;L++){if(F=p[L]-D,F<0)F+=X;else{P[L++]=F;break}P[L]=F}for(;L<S;L++)P[L]=p[L];return g(P),P}function C(p,d,S){var A;return ue(p,d)>=0?A=R(p,d):(A=R(d,p),S=!S),A=v(A),typeof A=="number"?(S&&(A=-A),new h(A)):new u(A,S)}function y(p,d,S){var A=p.length,P=new Array(A),D=-d,X=i,L,F;for(L=0;L<A;L++)F=p[L]+D,D=Math.floor(F/X),F%=X,P[L]=F<0?F+X:F;return P=v(P),typeof P=="number"?(S&&(P=-P),new h(P)):new u(P,S)}u.prototype.subtract=function(p){var d=xe(p);if(this.sign!==d.sign)return this.add(d.negate());var S=this.value,A=d.value;return d.isSmall?y(S,Math.abs(A),this.sign):C(S,A,this.sign)},u.prototype.minus=u.prototype.subtract,h.prototype.subtract=function(p){var d=xe(p),S=this.value;if(S<0!==d.sign)return this.add(d.negate());var A=d.value;return d.isSmall?new h(S-A):y(A,Math.abs(S),S>=0)},h.prototype.minus=h.prototype.subtract,f.prototype.subtract=function(p){return new f(this.value-xe(p).value)},f.prototype.minus=f.prototype.subtract,u.prototype.negate=function(){return new u(this.value,!this.sign)},h.prototype.negate=function(){var p=this.sign,d=new h(-this.value);return d.sign=!p,d},f.prototype.negate=function(){return new f(-this.value)},u.prototype.abs=function(){return new u(this.value,!1)},h.prototype.abs=function(){return new h(Math.abs(this.value))},f.prototype.abs=function(){return new f(this.value>=0?this.value:-this.value)};function N(p,d){var S=p.length,A=d.length,P=S+A,D=_(P),X=i,L,F,se,ge,le;for(se=0;se<S;++se){ge=p[se];for(var he=0;he<A;++he)le=d[he],L=ge*le+D[se+he],F=Math.floor(L/X),D[se+he]=L-F*X,D[se+he+1]+=F}return g(D),D}function k(p,d){var S=p.length,A=new Array(S),P=i,D=0,X,L;for(L=0;L<S;L++)X=p[L]*d+D,D=Math.floor(X/P),A[L]=X-D*P;for(;D>0;)A[L++]=D%P,D=Math.floor(D/P);return A}function W(p,d){for(var S=[];d-- >0;)S.push(0);return S.concat(p)}function q(p,d){var S=Math.max(p.length,d.length);if(S<=30)return N(p,d);S=Math.ceil(S/2);var A=p.slice(S),P=p.slice(0,S),D=d.slice(S),X=d.slice(0,S),L=q(P,X),F=q(A,D),se=q(E(P,A),E(X,D)),ge=E(E(L,W(R(R(se,L),F),S)),W(F,2*S));return g(ge),ge}function Q(p,d){return-.012*p-.012*d+15e-6*p*d>0}u.prototype.multiply=function(p){var d=xe(p),S=this.value,A=d.value,P=this.sign!==d.sign,D;if(d.isSmall){if(A===0)return l[0];if(A===1)return this;if(A===-1)return this.negate();if(D=Math.abs(A),D<i)return new u(k(S,D),P);A=x(D)}return Q(S.length,A.length)?new u(q(S,A),P):new u(N(S,A),P)},u.prototype.times=u.prototype.multiply;function G(p,d,S){return p<i?new u(k(d,p),S):new u(N(d,x(p)),S)}h.prototype._multiplyBySmall=function(p){return m(p.value*this.value)?new h(p.value*this.value):G(Math.abs(p.value),x(Math.abs(this.value)),this.sign!==p.sign)},u.prototype._multiplyBySmall=function(p){return p.value===0?l[0]:p.value===1?this:p.value===-1?this.negate():G(Math.abs(p.value),this.value,this.sign!==p.sign)},h.prototype.multiply=function(p){return xe(p)._multiplyBySmall(this)},h.prototype.times=h.prototype.multiply,f.prototype.multiply=function(p){return new f(this.value*xe(p).value)},f.prototype.times=f.prototype.multiply;function J(p){var d=p.length,S=_(d+d),A=i,P,D,X,L,F;for(X=0;X<d;X++){L=p[X],D=0-L*L;for(var se=X;se<d;se++)F=p[se],P=2*(L*F)+S[X+se]+D,D=Math.floor(P/A),S[X+se]=P-D*A;S[X+d]=D}return g(S),S}u.prototype.square=function(){return new u(J(this.value),!1)},h.prototype.square=function(){var p=this.value*this.value;return m(p)?new h(p):new u(J(x(Math.abs(this.value))),!1)},f.prototype.square=function(p){return new f(this.value*this.value)};function oe(p,d){var S=p.length,A=d.length,P=i,D=_(d.length),X=d[A-1],L=Math.ceil(P/(2*X)),F=k(p,L),se=k(d,L),ge,le,he,Pe,Oe,at,H;for(F.length<=S&&F.push(0),se.push(0),X=se[A-1],le=S-A;le>=0;le--){for(ge=P-1,F[le+A]!==X&&(ge=Math.floor((F[le+A]*P+F[le+A-1])/X)),he=0,Pe=0,at=se.length,Oe=0;Oe<at;Oe++)he+=ge*se[Oe],H=Math.floor(he/P),Pe+=F[le+Oe]-(he-H*P),he=H,Pe<0?(F[le+Oe]=Pe+P,Pe=-1):(F[le+Oe]=Pe,Pe=0);for(;Pe!==0;){for(ge-=1,he=0,Oe=0;Oe<at;Oe++)he+=F[le+Oe]-P+se[Oe],he<0?(F[le+Oe]=he+P,he=0):(F[le+Oe]=he,he=1);Pe+=he}D[le]=ge}return F=pe(F,L)[0],[v(D),v(F)]}function re(p,d){for(var S=p.length,A=d.length,P=[],D=[],X=i,L,F,se,ge,le;S;){if(D.unshift(p[--S]),g(D),ue(D,d)<0){P.push(0);continue}F=D.length,se=D[F-1]*X+D[F-2],ge=d[A-1]*X+d[A-2],F>A&&(se=(se+1)*X),L=Math.ceil(se/ge);do{if(le=k(d,L),ue(le,D)<=0)break;L--}while(L);P.push(L),D=R(D,le)}return P.reverse(),[v(P),v(D)]}function pe(p,d){var S=p.length,A=_(S),P=i,D,X,L,F;for(L=0,D=S-1;D>=0;--D)F=L*P+p[D],X=T(F/d),L=F-X*d,A[D]=X|0;return[A,L|0]}function ne(p,d){var S,A=xe(d);if(c)return[new f(p.value/A.value),new f(p.value%A.value)];var P=p.value,D=A.value,X;if(D===0)throw new Error("Cannot divide by zero");if(p.isSmall)return A.isSmall?[new h(T(P/D)),new h(P%D)]:[l[0],p];if(A.isSmall){if(D===1)return[p,l[0]];if(D==-1)return[p.negate(),l[0]];var L=Math.abs(D);if(L<i){S=pe(P,L),X=v(S[0]);var F=S[1];return p.sign&&(F=-F),typeof X=="number"?(p.sign!==A.sign&&(X=-X),[new h(X),new h(F)]):[new u(X,p.sign!==A.sign),new h(F)]}D=x(L)}var se=ue(P,D);if(se===-1)return[l[0],p];if(se===0)return[l[p.sign===A.sign?1:-1],l[0]];P.length+D.length<=200?S=oe(P,D):S=re(P,D),X=S[0];var ge=p.sign!==A.sign,le=S[1],he=p.sign;return typeof X=="number"?(ge&&(X=-X),X=new h(X)):X=new u(X,ge),typeof le=="number"?(he&&(le=-le),le=new h(le)):le=new u(le,he),[X,le]}u.prototype.divmod=function(p){var d=ne(this,p);return{quotient:d[0],remainder:d[1]}},f.prototype.divmod=h.prototype.divmod=u.prototype.divmod,u.prototype.divide=function(p){return ne(this,p)[0]},f.prototype.over=f.prototype.divide=function(p){return new f(this.value/xe(p).value)},h.prototype.over=h.prototype.divide=u.prototype.over=u.prototype.divide,u.prototype.mod=function(p){return ne(this,p)[1]},f.prototype.mod=f.prototype.remainder=function(p){return new f(this.value%xe(p).value)},h.prototype.remainder=h.prototype.mod=u.prototype.remainder=u.prototype.mod,u.prototype.pow=function(p){var d=xe(p),S=this.value,A=d.value,P,D,X;if(A===0)return l[1];if(S===0)return l[0];if(S===1)return l[1];if(S===-1)return d.isEven()?l[1]:l[-1];if(d.sign)return l[0];if(!d.isSmall)throw new Error("The exponent "+d.toString()+" is too large.");if(this.isSmall&&m(P=Math.pow(S,A)))return new h(T(P));for(D=this,X=l[1];A&!0&&(X=X.times(D),--A),A!==0;)A/=2,D=D.square();return X},h.prototype.pow=u.prototype.pow,f.prototype.pow=function(p){var d=xe(p),S=this.value,A=d.value,P=BigInt(0),D=BigInt(1),X=BigInt(2);if(A===P)return l[1];if(S===P)return l[0];if(S===D)return l[1];if(S===BigInt(-1))return d.isEven()?l[1]:l[-1];if(d.isNegative())return new f(P);for(var L=this,F=l[1];(A&D)===D&&(F=F.times(L),--A),A!==P;)A/=X,L=L.square();return F},u.prototype.modPow=function(p,d){if(p=xe(p),d=xe(d),d.isZero())throw new Error("Cannot take modPow with modulus 0");var S=l[1],A=this.mod(d);for(p.isNegative()&&(p=p.multiply(l[-1]),A=A.modInv(d));p.isPositive();){if(A.isZero())return l[0];p.isOdd()&&(S=S.multiply(A).mod(d)),p=p.divide(2),A=A.square().mod(d)}return S},f.prototype.modPow=h.prototype.modPow=u.prototype.modPow;function ue(p,d){if(p.length!==d.length)return p.length>d.length?1:-1;for(var S=p.length-1;S>=0;S--)if(p[S]!==d[S])return p[S]>d[S]?1:-1;return 0}u.prototype.compareAbs=function(p){var d=xe(p),S=this.value,A=d.value;return d.isSmall?1:ue(S,A)},h.prototype.compareAbs=function(p){var d=xe(p),S=Math.abs(this.value),A=d.value;return d.isSmall?(A=Math.abs(A),S===A?0:S>A?1:-1):-1},f.prototype.compareAbs=function(p){var d=this.value,S=xe(p).value;return d=d>=0?d:-d,S=S>=0?S:-S,d===S?0:d>S?1:-1},u.prototype.compare=function(p){if(p===1/0)return-1;if(p===-1/0)return 1;var d=xe(p),S=this.value,A=d.value;return this.sign!==d.sign?d.sign?1:-1:d.isSmall?this.sign?-1:1:ue(S,A)*(this.sign?-1:1)},u.prototype.compareTo=u.prototype.compare,h.prototype.compare=function(p){if(p===1/0)return-1;if(p===-1/0)return 1;var d=xe(p),S=this.value,A=d.value;return d.isSmall?S==A?0:S>A?1:-1:S<0!==d.sign?S<0?-1:1:S<0?1:-1},h.prototype.compareTo=h.prototype.compare,f.prototype.compare=function(p){if(p===1/0)return-1;if(p===-1/0)return 1;var d=this.value,S=xe(p).value;return d===S?0:d>S?1:-1},f.prototype.compareTo=f.prototype.compare,u.prototype.equals=function(p){return this.compare(p)===0},f.prototype.eq=f.prototype.equals=h.prototype.eq=h.prototype.equals=u.prototype.eq=u.prototype.equals,u.prototype.notEquals=function(p){return this.compare(p)!==0},f.prototype.neq=f.prototype.notEquals=h.prototype.neq=h.prototype.notEquals=u.prototype.neq=u.prototype.notEquals,u.prototype.greater=function(p){return this.compare(p)>0},f.prototype.gt=f.prototype.greater=h.prototype.gt=h.prototype.greater=u.prototype.gt=u.prototype.greater,u.prototype.lesser=function(p){return this.compare(p)<0},f.prototype.lt=f.prototype.lesser=h.prototype.lt=h.prototype.lesser=u.prototype.lt=u.prototype.lesser,u.prototype.greaterOrEquals=function(p){return this.compare(p)>=0},f.prototype.geq=f.prototype.greaterOrEquals=h.prototype.geq=h.prototype.greaterOrEquals=u.prototype.geq=u.prototype.greaterOrEquals,u.prototype.lesserOrEquals=function(p){return this.compare(p)<=0},f.prototype.leq=f.prototype.lesserOrEquals=h.prototype.leq=h.prototype.lesserOrEquals=u.prototype.leq=u.prototype.lesserOrEquals,u.prototype.isEven=function(){return(this.value[0]&1)===0},h.prototype.isEven=function(){return(this.value&1)===0},f.prototype.isEven=function(){return(this.value&BigInt(1))===BigInt(0)},u.prototype.isOdd=function(){return(this.value[0]&1)===1},h.prototype.isOdd=function(){return(this.value&1)===1},f.prototype.isOdd=function(){return(this.value&BigInt(1))===BigInt(1)},u.prototype.isPositive=function(){return!this.sign},h.prototype.isPositive=function(){return this.value>0},f.prototype.isPositive=h.prototype.isPositive,u.prototype.isNegative=function(){return this.sign},h.prototype.isNegative=function(){return this.value<0},f.prototype.isNegative=h.prototype.isNegative,u.prototype.isUnit=function(){return!1},h.prototype.isUnit=function(){return Math.abs(this.value)===1},f.prototype.isUnit=function(){return this.abs().value===BigInt(1)},u.prototype.isZero=function(){return!1},h.prototype.isZero=function(){return this.value===0},f.prototype.isZero=function(){return this.value===BigInt(0)},u.prototype.isDivisibleBy=function(p){var d=xe(p);return d.isZero()?!1:d.isUnit()?!0:d.compareAbs(2)===0?this.isEven():this.mod(d).isZero()},f.prototype.isDivisibleBy=h.prototype.isDivisibleBy=u.prototype.isDivisibleBy;function de(p){var d=p.abs();if(d.isUnit())return!1;if(d.equals(2)||d.equals(3)||d.equals(5))return!0;if(d.isEven()||d.isDivisibleBy(3)||d.isDivisibleBy(5))return!1;if(d.lesser(49))return!0}function He(p,d){for(var S=p.prev(),A=S,P=0,D,X,L;A.isEven();)A=A.divide(2),P++;e:for(X=0;X<d.length;X++)if(!p.lesser(d[X])&&(L=e(d[X]).modPow(A,p),!(L.isUnit()||L.equals(S)))){for(D=P-1;D!=0;D--){if(L=L.square().mod(p),L.isUnit())return!1;if(L.equals(S))continue e}return!1}return!0}u.prototype.isPrime=function(p){var d=de(this);if(d!==t)return d;var S=this.abs(),A=S.bitLength();if(A<=64)return He(S,[2,3,5,7,11,13,17,19,23,29,31,37]);for(var P=Math.log(2)*A.toJSNumber(),D=Math.ceil(p===!0?2*Math.pow(P,2):P),X=[],L=0;L<D;L++)X.push(e(L+2));return He(S,X)},f.prototype.isPrime=h.prototype.isPrime=u.prototype.isPrime,u.prototype.isProbablePrime=function(p,d){var S=de(this);if(S!==t)return S;for(var A=this.abs(),P=p===t?5:p,D=[],X=0;X<P;X++)D.push(e.randBetween(2,A.minus(2),d));return He(A,D)},f.prototype.isProbablePrime=h.prototype.isProbablePrime=u.prototype.isProbablePrime,u.prototype.modInv=function(p){for(var d=e.zero,S=e.one,A=xe(p),P=this.abs(),D,X,L;!P.isZero();)D=A.divide(P),X=d,L=A,d=S,A=P,S=X.subtract(D.multiply(S)),P=L.subtract(D.multiply(P));if(!A.isUnit())throw new Error(this.toString()+" and "+p.toString()+" are not co-prime");return d.compare(0)===-1&&(d=d.add(p)),this.isNegative()?d.negate():d},f.prototype.modInv=h.prototype.modInv=u.prototype.modInv,u.prototype.next=function(){var p=this.value;return this.sign?y(p,1,this.sign):new u(w(p,1),this.sign)},h.prototype.next=function(){var p=this.value;return p+1<s?new h(p+1):new u(a,!1)},f.prototype.next=function(){return new f(this.value+BigInt(1))},u.prototype.prev=function(){var p=this.value;return this.sign?new u(w(p,1),!0):y(p,1,this.sign)},h.prototype.prev=function(){var p=this.value;return p-1>-s?new h(p-1):new u(a,!0)},f.prototype.prev=function(){return new f(this.value-BigInt(1))};for(var Ce=[1];2*Ce[Ce.length-1]<=i;)Ce.push(2*Ce[Ce.length-1]);var dt=Ce.length,nt=Ce[dt-1];function vt(p){return Math.abs(p)<=i}u.prototype.shiftLeft=function(p){var d=xe(p).toJSNumber();if(!vt(d))throw new Error(String(d)+" is too large for shifting.");if(d<0)return this.shiftRight(-d);var S=this;if(S.isZero())return S;for(;d>=dt;)S=S.multiply(nt),d-=dt-1;return S.multiply(Ce[d])},f.prototype.shiftLeft=h.prototype.shiftLeft=u.prototype.shiftLeft,u.prototype.shiftRight=function(p){var d,S=xe(p).toJSNumber();if(!vt(S))throw new Error(String(S)+" is too large for shifting.");if(S<0)return this.shiftLeft(-S);for(var A=this;S>=dt;){if(A.isZero()||A.isNegative()&&A.isUnit())return A;d=ne(A,nt),A=d[1].isNegative()?d[0].prev():d[0],S-=dt-1}return d=ne(A,Ce[S]),d[1].isNegative()?d[0].prev():d[0]},f.prototype.shiftRight=h.prototype.shiftRight=u.prototype.shiftRight;function ie(p,d,S){d=xe(d);for(var A=p.isNegative(),P=d.isNegative(),D=A?p.not():p,X=P?d.not():d,L=0,F=0,se=null,ge=null,le=[];!D.isZero()||!X.isZero();)se=ne(D,nt),L=se[1].toJSNumber(),A&&(L=nt-1-L),ge=ne(X,nt),F=ge[1].toJSNumber(),P&&(F=nt-1-F),D=se[0],X=ge[0],le.push(S(L,F));for(var he=S(A?1:0,P?1:0)!==0?e(-1):e(0),Pe=le.length-1;Pe>=0;Pe-=1)he=he.multiply(nt).add(e(le[Pe]));return he}u.prototype.not=function(){return this.negate().prev()},f.prototype.not=h.prototype.not=u.prototype.not,u.prototype.and=function(p){return ie(this,p,function(d,S){return d&S})},f.prototype.and=h.prototype.and=u.prototype.and,u.prototype.or=function(p){return ie(this,p,function(d,S){return d|S})},f.prototype.or=h.prototype.or=u.prototype.or,u.prototype.xor=function(p){return ie(this,p,function(d,S){return d^S})},f.prototype.xor=h.prototype.xor=u.prototype.xor;var te=1<<30,Ne=(i&-i)*(i&-i)|te;function Je(p){var d=p.value,S=typeof d=="number"?d|te:typeof d=="bigint"?d|BigInt(te):d[0]+d[1]*i|Ne;return S&-S}function Ee(p,d){if(d.compareTo(p)<=0){var S=Ee(p,d.square(d)),A=S.p,P=S.e,D=A.multiply(d);return D.compareTo(p)<=0?{p:D,e:P*2+1}:{p:A,e:P*2}}return{p:e(1),e:0}}u.prototype.bitLength=function(){var p=this;return p.compareTo(e(0))<0&&(p=p.negate().subtract(e(1))),p.compareTo(e(0))===0?e(0):e(Ee(p,e(2)).e).add(e(1))},f.prototype.bitLength=h.prototype.bitLength=u.prototype.bitLength;function lt(p,d){return p=xe(p),d=xe(d),p.greater(d)?p:d}function It(p,d){return p=xe(p),d=xe(d),p.lesser(d)?p:d}function ct(p,d){if(p=xe(p).abs(),d=xe(d).abs(),p.equals(d))return p;if(p.isZero())return d;if(d.isZero())return p;for(var S=l[1],A,P;p.isEven()&&d.isEven();)A=It(Je(p),Je(d)),p=p.divide(A),d=d.divide(A),S=S.multiply(A);for(;p.isEven();)p=p.divide(Je(p));do{for(;d.isEven();)d=d.divide(Je(d));p.greater(d)&&(P=d,d=p,p=P),d=d.subtract(p)}while(!d.isZero());return S.isUnit()?p:p.multiply(S)}function St(p,d){return p=xe(p).abs(),d=xe(d).abs(),p.divide(ct(p,d)).multiply(d)}function Ct(p,d,S){p=xe(p),d=xe(d);var A=S||Math.random,P=It(p,d),D=lt(p,d),X=D.subtract(P).add(1);if(X.isSmall)return P.add(Math.floor(A()*X));for(var L=Ke(X,i).value,F=[],se=!0,ge=0;ge<L.length;ge++){var le=se?L[ge]+(ge+1<L.length?L[ge+1]/i:0):i,he=T(A()*le);F.push(he),he<L[ge]&&(se=!1)}return P.add(l.fromArray(F,i,!1))}var j=function(p,d,S,A){S=S||o,p=String(p),A||(p=p.toLowerCase(),S=S.toLowerCase());var P=p.length,D,X=Math.abs(d),L={};for(D=0;D<S.length;D++)L[S[D]]=D;for(D=0;D<P;D++){var F=p[D];if(F!=="-"&&F in L&&L[F]>=X){if(F==="1"&&X===1)continue;throw new Error(F+" is not a valid digit in base "+d+".")}}d=xe(d);var se=[],ge=p[0]==="-";for(D=ge?1:0;D<p.length;D++){var F=p[D];if(F in L)se.push(xe(L[F]));else if(F==="<"){var le=D;do D++;while(p[D]!==">"&&D<p.length);se.push(xe(p.slice(le+1,D)))}else throw new Error(F+" is not a valid character")}return _e(se,d,ge)};function _e(p,d,S){var A=l[0],P=l[1],D;for(D=p.length-1;D>=0;D--)A=A.add(p[D].times(P)),P=P.times(d);return S?A.negate():A}function ze(p,d){return d=d||o,p<d.length?d[p]:"<"+p+">"}function Ke(p,d){if(d=e(d),d.isZero()){if(p.isZero())return{value:[0],isNegative:!1};throw new Error("Cannot convert nonzero numbers to base 0.")}if(d.equals(-1)){if(p.isZero())return{value:[0],isNegative:!1};if(p.isNegative())return{value:[].concat.apply([],Array.apply(null,Array(-p.toJSNumber())).map(Array.prototype.valueOf,[1,0])),isNegative:!1};var S=Array.apply(null,Array(p.toJSNumber()-1)).map(Array.prototype.valueOf,[0,1]);return S.unshift([1]),{value:[].concat.apply([],S),isNegative:!1}}var A=!1;if(p.isNegative()&&d.isPositive()&&(A=!0,p=p.abs()),d.isUnit())return p.isZero()?{value:[0],isNegative:!1}:{value:Array.apply(null,Array(p.toJSNumber())).map(Number.prototype.valueOf,1),isNegative:A};for(var P=[],D=p,X;D.isNegative()||D.compareAbs(d)>=0;){X=D.divmod(d),D=X.quotient;var L=X.remainder;L.isNegative()&&(L=d.minus(L).abs(),D=D.next()),P.push(L.toJSNumber())}return P.push(D.toJSNumber()),{value:P.reverse(),isNegative:A}}function Qe(p,d,S){var A=Ke(p,d);return(A.isNegative?"-":"")+A.value.map(function(P){return ze(P,S)}).join("")}u.prototype.toArray=function(p){return Ke(this,p)},h.prototype.toArray=function(p){return Ke(this,p)},f.prototype.toArray=function(p){return Ke(this,p)},u.prototype.toString=function(p,d){if(p===t&&(p=10),p!==10||d)return Qe(this,p,d);for(var S=this.value,A=S.length,P=String(S[--A]),D="0000000",X;--A>=0;)X=String(S[A]),P+=D.slice(X.length)+X;var L=this.sign?"-":"";return L+P},h.prototype.toString=function(p,d){return p===t&&(p=10),p!=10||d?Qe(this,p,d):String(this.value)},f.prototype.toString=h.prototype.toString,f.prototype.toJSON=u.prototype.toJSON=h.prototype.toJSON=function(){return this.toString()},u.prototype.valueOf=function(){return parseInt(this.toString(),10)},u.prototype.toJSNumber=u.prototype.valueOf,h.prototype.valueOf=function(){return this.value},h.prototype.toJSNumber=h.prototype.valueOf,f.prototype.valueOf=f.prototype.toJSNumber=function(){return parseInt(this.toString(),10)};function $e(p){if(m(+p)){var d=+p;if(d===T(d))return c?new f(BigInt(d)):new h(d);throw new Error("Invalid integer: "+p)}var S=p[0]==="-";S&&(p=p.slice(1));var A=p.split(/e/i);if(A.length>2)throw new Error("Invalid integer: "+A.join("e"));if(A.length===2){var P=A[1];if(P[0]==="+"&&(P=P.slice(1)),P=+P,P!==T(P)||!m(P))throw new Error("Invalid integer: "+P+" is not a valid exponent.");var D=A[0],X=D.indexOf(".");if(X>=0&&(P-=D.length-X-1,D=D.slice(0,X)+D.slice(X+1)),P<0)throw new Error("Cannot include negative exponent part for integers");D+=new Array(P+1).join("0"),p=D}var L=/^([0-9][0-9]*)$/.test(p);if(!L)throw new Error("Invalid integer: "+p);if(c)return new f(BigInt(S?"-"+p:p));for(var F=[],se=p.length,ge=r,le=se-ge;se>0;)F.push(+p.slice(le,se)),le-=ge,le<0&&(le=0),se-=ge;return g(F),new u(F,S)}function B(p){if(c)return new f(BigInt(p));if(m(p)){if(p!==T(p))throw new Error(p+" is not an integer.");return new h(p)}return $e(p.toString())}function xe(p){return typeof p=="number"?B(p):typeof p=="string"?$e(p):typeof p=="bigint"?new f(p):p}for(var me=0;me<1e3;me++)l[me]=xe(me),me>0&&(l[-me]=xe(-me));return l.one=l[1],l.zero=l[0],l.minusOne=l[-1],l.max=lt,l.min=It,l.gcd=ct,l.lcm=St,l.isInstance=function(p){return p instanceof u||p instanceof h||p instanceof f},l.randBetween=Ct,l.fromArray=function(p,d,S){return _e(p.map(xe),xe(d||10),S)},l})();n.hasOwnProperty("exports")&&(n.exports=e)})(zl),zl.exports)}var Ux=wp(),xh=to(Ux);var Rp=64,vh=16,Pr=Rp/vh;function Ox(){try{return!0}catch{return!1}}function Fx(n,e,t){let i=0;for(let r=0;r<t;r++){let s=n[e+r];if(s===void 0)break;i+=s*16**r}return i}function Ip(n){let e=[];for(let t=0;t<n.length;t++){let i=Number(n[t]);for(let r=0;i||r<e.length;r++)i+=(e[r]||0)*10,e[r]=i%16,i=(i-e[r])/16}return e}function Bx(n){let e=Ip(n),t=Array(Pr);for(let i=0;i<Pr;i++)t[Pr-1-i]=Fx(e,i*Pr,Pr);return t}var co=class n{static fromString(e){return new n(Bx(e),e)}static fromBit(e){let t=Array(Pr),i=Math.floor(e/vh);for(let r=0;r<Pr;r++)t[Pr-1-r]=r===i?1<<e-i*vh:0;return new n(t)}constructor(e,t){this.parts=e,this.str=t}and({parts:e}){return new n(this.parts.map((t,i)=>t&e[i]))}or({parts:e}){return new n(this.parts.map((t,i)=>t|e[i]))}xor({parts:e}){return new n(this.parts.map((t,i)=>t^e[i]))}not(){return new n(this.parts.map(e=>~e))}equals({parts:e}){return this.parts.every((t,i)=>t===e[i])}toString(){if(this.str!=null)return this.str;let e=new Array(Rp/4);return this.parts.forEach((t,i)=>{let r=Ip(t.toString());for(let s=0;s<4;s++)e[s+i*4]=r[3-s]||0}),this.str=xh.fromArray(e,16).toString()}toJSON(){return this.toString()}},Nr=Ox();Nr&&BigInt.prototype.toJSON==null&&(BigInt.prototype.toJSON=function(){return this.toString()});var Vl={},Cp=Nr?function(e){return BigInt(e)}:function(e){return e instanceof co?e:(typeof e=="number"&&(e=e.toString()),Vl[e]!=null||(Vl[e]=co.fromString(e)),Vl[e])},Sn=Cp(0),Gl=Nr?function(e=Sn,t=Sn){return e&t}:function(e=Sn,t=Sn){return e.and(t)},Pp=Nr?function(e=Sn,t=Sn){return e|t}:function(e=Sn,t=Sn){return e.or(t)},kx=Nr?function(e=Sn,t=Sn){return e^t}:function(e=Sn,t=Sn){return e.xor(t)},zx=Nr?function(e=Sn){return~e}:function(e=Sn){return e.not()},yh=Nr?function(e,t){return e===t}:function(e,t){return e==null||t==null?e==t:e.equals(t)};function Vx(...n){let e=n[0];for(let t=1;t<n.length;t++)e=Pp(e,n[t]);return e}function Gx(n,e){return yh(Gl(n,e),e)}function Hx(n,e){return!yh(Gl(n,e),Sn)}function Wx(n,e){return e===Sn?n:Pp(n,e)}function Xx(n,e){return e===Sn?n:kx(n,Gl(n,e))}var qx=Nr?function(e){return BigInt(1)<<BigInt(e)}:function(e){return co.fromBit(e)},tt={combine:Vx,add:Wx,remove:Xx,filter:Gl,invert:zx,has:Gx,hasAny:Hx,equals:yh,deserialize:Cp,getFlag:qx};var Sh;(function(n){n[n.CLOSE_NORMAL=1e3]="CLOSE_NORMAL",n[n.CLOSE_UNSUPPORTED=1003]="CLOSE_UNSUPPORTED",n[n.CLOSE_ABNORMAL=1006]="CLOSE_ABNORMAL",n[n.INVALID_CLIENTID=4e3]="INVALID_CLIENTID",n[n.INVALID_ORIGIN=4001]="INVALID_ORIGIN",n[n.RATELIMITED=4002]="RATELIMITED",n[n.TOKEN_REVOKED=4003]="TOKEN_REVOKED",n[n.INVALID_VERSION=4004]="INVALID_VERSION",n[n.INVALID_ENCODING=4005]="INVALID_ENCODING"})(Sh||(Sh={}));var uo;(function(n){n[n.INVALID_PAYLOAD=4e3]="INVALID_PAYLOAD",n[n.INVALID_COMMAND=4002]="INVALID_COMMAND",n[n.INVALID_GUILD=4003]="INVALID_GUILD",n[n.INVALID_EVENT=4004]="INVALID_EVENT",n[n.INVALID_CHANNEL=4005]="INVALID_CHANNEL",n[n.INVALID_PERMISSIONS=4006]="INVALID_PERMISSIONS",n[n.INVALID_CLIENTID=4007]="INVALID_CLIENTID",n[n.INVALID_ORIGIN=4008]="INVALID_ORIGIN",n[n.INVALID_TOKEN=4009]="INVALID_TOKEN",n[n.INVALID_USER=4010]="INVALID_USER"})(uo||(uo={}));var ho;(function(n){n.LANDSCAPE="landscape",n.PORTRAIT="portrait"})(ho||(ho={}));var jn;(function(n){n.MOBILE="mobile",n.DESKTOP="desktop"})(jn||(jn={}));var Yx=Object.freeze({CREATE_INSTANT_INVITE:tt.getFlag(0),KICK_MEMBERS:tt.getFlag(1),BAN_MEMBERS:tt.getFlag(2),ADMINISTRATOR:tt.getFlag(3),MANAGE_CHANNELS:tt.getFlag(4),MANAGE_GUILD:tt.getFlag(5),ADD_REACTIONS:tt.getFlag(6),VIEW_AUDIT_LOG:tt.getFlag(7),PRIORITY_SPEAKER:tt.getFlag(8),STREAM:tt.getFlag(9),VIEW_CHANNEL:tt.getFlag(10),SEND_MESSAGES:tt.getFlag(11),SEND_TTS_MESSAGES:tt.getFlag(12),MANAGE_MESSAGES:tt.getFlag(13),EMBED_LINKS:tt.getFlag(14),ATTACH_FILES:tt.getFlag(15),READ_MESSAGE_HISTORY:tt.getFlag(16),MENTION_EVERYONE:tt.getFlag(17),USE_EXTERNAL_EMOJIS:tt.getFlag(18),VIEW_GUILD_INSIGHTS:tt.getFlag(19),CONNECT:tt.getFlag(20),SPEAK:tt.getFlag(21),MUTE_MEMBERS:tt.getFlag(22),DEAFEN_MEMBERS:tt.getFlag(23),MOVE_MEMBERS:tt.getFlag(24),USE_VAD:tt.getFlag(25),CHANGE_NICKNAME:tt.getFlag(26),MANAGE_NICKNAMES:tt.getFlag(27),MANAGE_ROLES:tt.getFlag(28),MANAGE_WEBHOOKS:tt.getFlag(29),MANAGE_GUILD_EXPRESSIONS:tt.getFlag(30),USE_APPLICATION_COMMANDS:tt.getFlag(31),REQUEST_TO_SPEAK:tt.getFlag(32),MANAGE_EVENTS:tt.getFlag(33),MANAGE_THREADS:tt.getFlag(34),CREATE_PUBLIC_THREADS:tt.getFlag(35),CREATE_PRIVATE_THREADS:tt.getFlag(36),USE_EXTERNAL_STICKERS:tt.getFlag(37),SEND_MESSAGES_IN_THREADS:tt.getFlag(38),USE_EMBEDDED_ACTIVITIES:tt.getFlag(39),MODERATE_MEMBERS:tt.getFlag(40),VIEW_CREATOR_MONETIZATION_ANALYTICS:tt.getFlag(41),USE_SOUNDBOARD:tt.getFlag(42),CREATE_GUILD_EXPRESSIONS:tt.getFlag(43),CREATE_EVENTS:tt.getFlag(44),USE_EXTERNAL_SOUNDS:tt.getFlag(45),SEND_VOICE_MESSAGES:tt.getFlag(46),SEND_POLLS:tt.getFlag(49),USE_EXTERNAL_APPS:tt.getFlag(50)}),bh=-1,Np=250;var Ql={};V0(Ql,{Activity:()=>Lr,Attachment:()=>Gp,CertifiedDevice:()=>hv,CertifiedDeviceTypeObject:()=>nm,Channel:()=>Zl,ChannelMention:()=>Vp,ChannelTypesObject:()=>_o,Commands:()=>be,DISPATCH:()=>Th,Embed:()=>Zp,EmbedAuthor:()=>qp,EmbedField:()=>Yp,EmbedFooter:()=>Hp,EmbedProvider:()=>Xp,Emoji:()=>Yl,Entitlement:()=>ta,EntitlementTypesObject:()=>rm,Guild:()=>uv,GuildMember:()=>mo,GuildMemberRPC:()=>wh,Image:()=>ql,KeyTypesObject:()=>em,LayoutMode:()=>pv,LayoutModeTypeObject:()=>Jl,Message:()=>Ih,MessageActivity:()=>jp,MessageApplication:()=>$p,MessageReference:()=>Jp,Orientation:()=>fv,OrientationLockState:()=>dv,OrientationLockStateTypeObject:()=>sm,OrientationTypeObject:()=>$l,PermissionOverwrite:()=>Bp,PermissionOverwriteTypeObject:()=>Fp,PresenceUpdate:()=>kp,Reaction:()=>Kp,ReceiveFramePayload:()=>yi,Relationship:()=>Ah,Role:()=>zp,Scopes:()=>cv,ScopesObject:()=>Up,ShortcutKey:()=>Kl,Sku:()=>Ph,SkuTypeObject:()=>im,Status:()=>po,StatusObject:()=>Op,ThermalState:()=>Nh,ThermalStateTypeObject:()=>am,User:()=>Fi,UserVoiceState:()=>go,Video:()=>Wp,VoiceDevice:()=>Qp,VoiceSettingModeTypeObject:()=>tm,VoiceSettingsIO:()=>jl,VoiceSettingsMode:()=>Ch,VoiceState:()=>Rh});function un(n){return _h(e=>{var t;let[i]=(t=Object.entries(n).find(([,r])=>r===e))!==null&&t!==void 0?t:[];return e!=null&&i===void 0?n.UNHANDLED:e},V().or(We()))}function Hl(n){let e=kl().transform(t=>{let i=n.safeParse(t);return i.success?i.data:n._def.defaultValue()});return e.overlayType=n,e}var Dp=U.object({image_url:U.string()}).describe('Response for "INITIATE_IMAGE_UPLOAD" Command'),Zx=U.object({mediaUrl:U.string().max(1024)}).describe('Request for "OPEN_SHARE_MOMENT_DIALOG" Command'),Kx=U.object({access_token:U.union([U.string(),U.null()]).optional()}).describe('Request for "AUTHENTICATE" Command'),Wl=U.object({access_token:U.string(),user:U.object({username:U.string(),discriminator:U.string(),id:U.string(),avatar:U.union([U.string(),U.null()]).optional(),public_flags:U.number(),global_name:U.union([U.string(),U.null()]).optional()}),scopes:U.array(Hl(U.enum(["identify","identify.premium","email","connections","guilds","guilds.join","guilds.members.read","guilds.channels.read","gdm.join","bot","rpc","rpc.notifications.read","rpc.voice.read","rpc.voice.write","rpc.video.read","rpc.video.write","rpc.screenshare.read","rpc.screenshare.write","rpc.activities.write","webhook.incoming","messages.read","applications.builds.upload","applications.builds.read","applications.commands","applications.commands.permissions.update","applications.commands.update","applications.store.update","applications.entitlements","activities.read","activities.write","activities.invites.write","relationships.read","relationships.write","voice","dm_channels.read","role_connections.write","presences.read","presences.write","openid","dm_channels.messages.read","dm_channels.messages.write","gateway.connect","account.global_name.update","payment_sources.country_code","sdk.social_layer_presence","sdk.social_layer","lobbies.write","application_identities.write"]).or(U.literal(-1)).default(-1))),expires:U.string(),application:U.object({description:U.string(),icon:U.union([U.string(),U.null()]).optional(),id:U.string(),rpc_origins:U.array(U.string()).optional(),name:U.string()})}).describe('Response for "AUTHENTICATE" Command'),Mh=U.object({participants:U.array(U.object({id:U.string(),username:U.string(),global_name:U.union([U.string(),U.null()]).optional(),discriminator:U.string(),avatar:U.union([U.string(),U.null()]).optional(),flags:U.number(),bot:U.boolean(),avatar_decoration_data:U.union([U.object({asset:U.union([U.string(),U.null()]).optional(),skuId:U.string().optional(),expiresAt:U.number().optional()}),U.null()]).optional(),premium_type:U.union([U.number(),U.null()]).optional(),nickname:U.string().optional()}))}).describe('Response for "GET_ACTIVITY_INSTANCE_CONNECTED_PARTICIPANTS" Command'),jx=U.object({command:U.string(),options:U.array(U.object({name:U.string(),value:U.string()})).optional(),content:U.string().max(2e3).optional(),require_launch_channel:U.boolean().optional(),preview_image:U.object({height:U.number(),url:U.string(),width:U.number()}).optional(),components:U.array(U.object({type:U.literal(1),components:U.array(U.object({type:U.literal(2),style:U.number().gte(1).lte(5),label:U.string().max(80).optional(),custom_id:U.string().max(100).describe("Developer-defined identifier for the button; max 100 characters").optional()})).max(5).optional()})).optional(),pid:U.number().optional()}).describe('Request for "SHARE_INTERACTION" Command'),$x=U.object({success:U.boolean()}).describe('Response for "SHARE_INTERACTION" Command'),Jx=U.object({custom_id:U.string().max(64).optional(),message:U.string().max(1e3),link_id:U.string().max(64).optional()}).describe('Request for "SHARE_LINK" Command'),Qx=U.object({success:U.boolean(),didCopyLink:U.boolean(),didSendMessage:U.boolean()}).describe('Response for "SHARE_LINK" Command'),Eh=U.object({relationships:U.array(U.object({type:U.number(),user:U.object({id:U.string(),username:U.string(),global_name:U.union([U.string(),U.null()]).optional(),discriminator:U.string(),avatar:U.union([U.string(),U.null()]).optional(),flags:U.number(),bot:U.boolean(),avatar_decoration_data:U.union([U.object({asset:U.union([U.string(),U.null()]).optional(),skuId:U.string().optional(),expiresAt:U.number().optional()}),U.null()]).optional(),premium_type:U.union([U.number(),U.null()]).optional()}),presence:U.object({status:U.string(),activity:U.union([U.object({session_id:U.string().optional(),type:U.number().optional(),name:U.string(),url:U.union([U.string(),U.null()]).optional(),application_id:U.string().optional(),status_display_type:U.number().optional(),state:U.string().optional(),state_url:U.string().optional(),details:U.string().optional(),details_url:U.string().optional(),emoji:U.union([U.object({name:U.string(),id:U.union([U.string(),U.null()]).optional(),animated:U.union([U.boolean(),U.null()]).optional()}),U.null()]).optional(),assets:U.object({large_image:U.string().optional(),large_text:U.string().optional(),large_url:U.string().optional(),small_image:U.string().optional(),small_text:U.string().optional(),small_url:U.string().optional()}).optional(),timestamps:U.object({start:U.number().optional(),end:U.number().optional()}).optional(),party:U.object({id:U.string().optional(),size:U.array(U.number()).min(2).max(2).optional(),privacy:U.number().optional()}).optional(),secrets:U.object({match:U.string().optional(),join:U.string().optional()}).optional(),sync_id:U.string().optional(),created_at:U.number().optional(),instance:U.boolean().optional(),flags:U.number().optional(),metadata:U.object({}).optional(),platform:U.string().optional(),supported_platforms:U.array(U.string()).optional(),buttons:U.array(U.string()).optional(),hangStatus:U.string().optional()}),U.null()]).optional()}).optional()}))}).describe('Response for "GET_RELATIONSHIPS" Command'),ev=U.object({user_id:U.string(),content:U.string().min(0).max(1024).optional()}).describe('Request for "INVITE_USER_EMBEDDED" Command'),tv=U.object({id:U.string().max(64)}).describe('Request for "GET_USER" Command'),nv=U.union([U.object({id:U.string(),username:U.string(),global_name:U.union([U.string(),U.null()]).optional(),discriminator:U.string(),avatar:U.union([U.string(),U.null()]).optional(),flags:U.number(),bot:U.boolean(),avatar_decoration_data:U.union([U.object({asset:U.union([U.string(),U.null()]).optional(),skuId:U.string().optional(),expiresAt:U.number().optional()}),U.null()]).optional(),premium_type:U.union([U.number(),U.null()]).optional()}),U.null()]),iv=U.object({quest_id:U.string()}).describe('Request for "GET_QUEST_ENROLLMENT_STATUS" Command'),rv=U.object({quest_id:U.string(),is_enrolled:U.boolean(),enrolled_at:U.union([U.string(),U.null()]).optional()}).describe('Response for "GET_QUEST_ENROLLMENT_STATUS" Command'),sv=U.object({quest_id:U.string()}).describe('Request for "QUEST_START_TIMER" Command'),av=U.object({success:U.boolean()}).describe('Response for "QUEST_START_TIMER" Command'),ov=U.object({quest_id:U.string(),enrolled_at:U.union([U.string(),U.null()]).optional(),completed_at:U.union([U.string(),U.null()]).optional(),external_cta_url:U.string()}).describe('Response for "GET_QUEST" Command'),lv=U.object({ticket:U.string()}).describe('Response for "REQUEST_PROXY_TICKET_REFRESH" Command'),yt;(function(n){n.INITIATE_IMAGE_UPLOAD="INITIATE_IMAGE_UPLOAD",n.OPEN_SHARE_MOMENT_DIALOG="OPEN_SHARE_MOMENT_DIALOG",n.AUTHENTICATE="AUTHENTICATE",n.GET_ACTIVITY_INSTANCE_CONNECTED_PARTICIPANTS="GET_ACTIVITY_INSTANCE_CONNECTED_PARTICIPANTS",n.SHARE_INTERACTION="SHARE_INTERACTION",n.SHARE_LINK="SHARE_LINK",n.GET_RELATIONSHIPS="GET_RELATIONSHIPS",n.INVITE_USER_EMBEDDED="INVITE_USER_EMBEDDED",n.GET_USER="GET_USER",n.GET_QUEST_ENROLLMENT_STATUS="GET_QUEST_ENROLLMENT_STATUS",n.QUEST_START_TIMER="QUEST_START_TIMER",n.GET_QUEST="GET_QUEST",n.REQUEST_PROXY_TICKET_REFRESH="REQUEST_PROXY_TICKET_REFRESH"})(yt||(yt={}));var Lp=U.object({}).optional().nullable(),fo=U.void(),Xl={[yt.INITIATE_IMAGE_UPLOAD]:{request:fo,response:Dp},[yt.OPEN_SHARE_MOMENT_DIALOG]:{request:Zx,response:Lp},[yt.AUTHENTICATE]:{request:Kx,response:Wl},[yt.GET_ACTIVITY_INSTANCE_CONNECTED_PARTICIPANTS]:{request:fo,response:Mh},[yt.SHARE_INTERACTION]:{request:jx,response:$x},[yt.SHARE_LINK]:{request:Jx,response:Qx},[yt.GET_RELATIONSHIPS]:{request:fo,response:Eh},[yt.INVITE_USER_EMBEDDED]:{request:ev,response:Lp},[yt.GET_USER]:{request:tv,response:nv},[yt.GET_QUEST_ENROLLMENT_STATUS]:{request:iv,response:rv},[yt.QUEST_START_TIMER]:{request:sv,response:av},[yt.GET_QUEST]:{request:fo,response:ov},[yt.REQUEST_PROXY_TICKET_REFRESH]:{request:fo,response:lv}};var Th="DISPATCH",be;(function(n){n.AUTHORIZE="AUTHORIZE",n.GET_GUILDS="GET_GUILDS",n.GET_GUILD="GET_GUILD",n.GET_CHANNEL="GET_CHANNEL",n.GET_CHANNELS="GET_CHANNELS",n.SELECT_VOICE_CHANNEL="SELECT_VOICE_CHANNEL",n.SELECT_TEXT_CHANNEL="SELECT_TEXT_CHANNEL",n.SUBSCRIBE="SUBSCRIBE",n.UNSUBSCRIBE="UNSUBSCRIBE",n.CAPTURE_SHORTCUT="CAPTURE_SHORTCUT",n.SET_CERTIFIED_DEVICES="SET_CERTIFIED_DEVICES",n.SET_ACTIVITY="SET_ACTIVITY",n.GET_SKUS="GET_SKUS",n.GET_ENTITLEMENTS="GET_ENTITLEMENTS",n.GET_SKUS_EMBEDDED="GET_SKUS_EMBEDDED",n.GET_ENTITLEMENTS_EMBEDDED="GET_ENTITLEMENTS_EMBEDDED",n.START_PURCHASE="START_PURCHASE",n.SET_CONFIG="SET_CONFIG",n.SEND_ANALYTICS_EVENT="SEND_ANALYTICS_EVENT",n.USER_SETTINGS_GET_LOCALE="USER_SETTINGS_GET_LOCALE",n.OPEN_EXTERNAL_LINK="OPEN_EXTERNAL_LINK",n.ENCOURAGE_HW_ACCELERATION="ENCOURAGE_HW_ACCELERATION",n.CAPTURE_LOG="CAPTURE_LOG",n.SET_ORIENTATION_LOCK_STATE="SET_ORIENTATION_LOCK_STATE",n.OPEN_INVITE_DIALOG="OPEN_INVITE_DIALOG",n.GET_PLATFORM_BEHAVIORS="GET_PLATFORM_BEHAVIORS",n.GET_CHANNEL_PERMISSIONS="GET_CHANNEL_PERMISSIONS",n.AUTHENTICATE="AUTHENTICATE",n.GET_ACTIVITY_INSTANCE_CONNECTED_PARTICIPANTS="GET_ACTIVITY_INSTANCE_CONNECTED_PARTICIPANTS",n.GET_QUEST="GET_QUEST",n.GET_QUEST_ENROLLMENT_STATUS="GET_QUEST_ENROLLMENT_STATUS",n.GET_RELATIONSHIPS="GET_RELATIONSHIPS",n.GET_USER="GET_USER",n.INITIATE_IMAGE_UPLOAD="INITIATE_IMAGE_UPLOAD",n.INVITE_USER_EMBEDDED="INVITE_USER_EMBEDDED",n.OPEN_SHARE_MOMENT_DIALOG="OPEN_SHARE_MOMENT_DIALOG",n.QUEST_START_TIMER="QUEST_START_TIMER",n.REQUEST_PROXY_TICKET_REFRESH="REQUEST_PROXY_TICKET_REFRESH",n.SHARE_INTERACTION="SHARE_INTERACTION",n.SHARE_LINK="SHARE_LINK"})(be||(be={}));var yi=ye({cmd:V(),data:ps(),evt:ea(),nonce:V()}).passthrough(),Up=Object.assign(Object.assign({},Wl.shape.scopes.element.overlayType._def.innerType.options[0].Values),{UNHANDLED:-1}),cv=un(Up),Ah=Eh.shape.relationships.element,Fi=ye({id:V(),username:V(),discriminator:V(),global_name:V().optional().nullable(),avatar:V().optional().nullable(),avatar_decoration_data:ye({asset:V(),sku_id:V().optional()}).nullable(),bot:et(),flags:We().optional().nullable(),premium_type:We().optional().nullable()}),mo=ye({user:Fi,nick:V().optional().nullable(),roles:Rt(V()),joined_at:V(),deaf:et(),mute:et()}),wh=ye({user_id:V(),nick:V().optional().nullable(),guild_id:V(),avatar:V().optional().nullable(),avatar_decoration_data:ye({asset:V(),sku_id:V().optional().nullable()}).optional().nullable(),color_string:V().optional().nullable()}),Yl=ye({id:V(),name:V().optional().nullable(),roles:Rt(V()).optional().nullable(),user:Fi.optional().nullable(),require_colons:et().optional().nullable(),managed:et().optional().nullable(),animated:et().optional().nullable(),available:et().optional().nullable()}),Rh=ye({mute:et(),deaf:et(),self_mute:et(),self_deaf:et(),suppress:et()}),go=ye({mute:et(),nick:V(),user:Fi,voice_state:Rh,volume:We()}),Op={UNHANDLED:-1,IDLE:"idle",DND:"dnd",ONLINE:"online",OFFLINE:"offline"},po=un(Op),Lr=ye({name:V(),type:We(),url:V().optional().nullable(),created_at:We().optional().nullable(),timestamps:ye({start:We(),end:We()}).partial().optional().nullable(),application_id:V().optional().nullable(),details:V().optional().nullable(),details_url:V().url().optional().nullable(),state:V().optional().nullable(),state_url:V().url().optional().nullable(),emoji:Yl.optional().nullable(),party:ye({id:V().optional().nullable(),size:Rt(We()).optional().nullable()}).optional().nullable(),assets:ye({large_image:V().nullable(),large_text:V().nullable(),large_url:V().url().optional().nullable(),small_image:V().nullable(),small_text:V().nullable(),small_url:V().url().optional().nullable()}).partial().optional().nullable(),secrets:ye({join:V(),match:V()}).partial().optional().nullable(),instance:et().optional().nullable(),flags:We().optional().nullable()}),Fp={UNHANDLED:-1,ROLE:0,MEMBER:1},Bp=ye({id:V(),type:un(Fp),allow:V(),deny:V()}),_o={UNHANDLED:-1,DM:1,GROUP_DM:3,GUILD_TEXT:0,GUILD_VOICE:2,GUILD_CATEGORY:4,GUILD_ANNOUNCEMENT:5,GUILD_STORE:6,ANNOUNCEMENT_THREAD:10,PUBLIC_THREAD:11,PRIVATE_THREAD:12,GUILD_STAGE_VOICE:13,GUILD_DIRECTORY:14,GUILD_FORUM:15},Zl=ye({id:V(),type:un(_o),guild_id:V().optional().nullable(),position:We().optional().nullable(),permission_overwrites:Rt(Bp).optional().nullable(),name:V().optional().nullable(),topic:V().optional().nullable(),nsfw:et().optional().nullable(),last_message_id:V().optional().nullable(),bitrate:We().optional().nullable(),user_limit:We().optional().nullable(),rate_limit_per_user:We().optional().nullable(),recipients:Rt(Fi).optional().nullable(),icon:V().optional().nullable(),owner_id:V().optional().nullable(),application_id:V().optional().nullable(),parent_id:V().optional().nullable(),last_pin_timestamp:V().optional().nullable()}),kp=ye({user:Fi,guild_id:V(),status:po,activities:Rt(Lr),client_status:ye({desktop:po,mobile:po,web:po}).partial()}),zp=ye({id:V(),name:V(),color:We(),hoist:et(),position:We(),permissions:V(),managed:et(),mentionable:et()}),uv=ye({id:V(),name:V(),owner_id:V(),icon:V().nullable(),icon_hash:V().optional().nullable(),splash:V().nullable(),discovery_splash:V().nullable(),owner:et().optional().nullable(),permissions:V().optional().nullable(),region:V(),afk_channel_id:V().nullable(),afk_timeout:We(),widget_enabled:et().optional().nullable(),widget_channel_id:V().optional().nullable(),verification_level:We(),default_message_notifications:We(),explicit_content_filter:We(),roles:Rt(zp),emojis:Rt(Yl),features:Rt(V()),mfa_level:We(),application_id:V().nullable(),system_channel_id:V().nullable(),system_channel_flags:We(),rules_channel_id:V().nullable(),joined_at:V().optional().nullable(),large:et().optional().nullable(),unavailable:et().optional().nullable(),member_count:We().optional().nullable(),voice_states:Rt(Rh).optional().nullable(),members:Rt(mo).optional().nullable(),channels:Rt(Zl).optional().nullable(),presences:Rt(kp).optional().nullable(),max_presences:We().optional().nullable(),max_members:We().optional().nullable(),vanity_url_code:V().nullable(),description:V().nullable(),banner:V().nullable(),premium_tier:We(),premium_subscription_count:We().optional().nullable(),preferred_locale:V(),public_updates_channel_id:V().nullable(),max_video_channel_users:We().optional().nullable(),approximate_member_count:We().optional().nullable(),approximate_presence_count:We().optional().nullable()}),Vp=ye({id:V(),guild_id:V(),type:We(),name:V()}),Gp=ye({id:V(),filename:V(),size:We(),url:V(),proxy_url:V(),height:We().optional().nullable(),width:We().optional().nullable()}),Hp=ye({text:V(),icon_url:V().optional().nullable(),proxy_icon_url:V().optional().nullable()}),ql=ye({url:V().optional().nullable(),proxy_url:V().optional().nullable(),height:We().optional().nullable(),width:We().optional().nullable()}),Wp=ql.omit({proxy_url:!0}),Xp=ye({name:V().optional().nullable(),url:V().optional().nullable()}),qp=ye({name:V().optional().nullable(),url:V().optional().nullable(),icon_url:V().optional().nullable(),proxy_icon_url:V().optional().nullable()}),Yp=ye({name:V(),value:V(),inline:et()}),Zp=ye({title:V().optional().nullable(),type:V().optional().nullable(),description:V().optional().nullable(),url:V().optional().nullable(),timestamp:V().optional().nullable(),color:We().optional().nullable(),footer:Hp.optional().nullable(),image:ql.optional().nullable(),thumbnail:ql.optional().nullable(),video:Wp.optional().nullable(),provider:Xp.optional().nullable(),author:qp.optional().nullable(),fields:Rt(Yp).optional().nullable()}),Kp=ye({count:We(),me:et(),emoji:Yl}),jp=ye({type:We(),party_id:V().optional().nullable()}),$p=ye({id:V(),cover_image:V().optional().nullable(),description:V(),icon:V().optional().nullable(),name:V()}),Jp=ye({message_id:V().optional().nullable(),channel_id:V().optional().nullable(),guild_id:V().optional().nullable()}),Ih=ye({id:V(),channel_id:V(),guild_id:V().optional().nullable(),author:Fi.optional().nullable(),member:mo.optional().nullable(),content:V(),timestamp:V(),edited_timestamp:V().optional().nullable(),tts:et(),mention_everyone:et(),mentions:Rt(Fi),mention_roles:Rt(V()),mention_channels:Rt(Vp),attachments:Rt(Gp),embeds:Rt(Zp),reactions:Rt(Kp).optional().nullable(),nonce:lo([V(),We()]).optional().nullable(),pinned:et(),webhook_id:V().optional().nullable(),type:We(),activity:jp.optional().nullable(),application:$p.optional().nullable(),message_reference:Jp.optional().nullable(),flags:We().optional().nullable(),stickers:Rt(ps()).optional().nullable(),referenced_message:ps().optional().nullable()}),Qp=ye({id:V(),name:V()}),em={UNHANDLED:-1,KEYBOARD_KEY:0,MOUSE_BUTTON:1,KEYBOARD_MODIFIER_KEY:2,GAMEPAD_BUTTON:3},Kl=ye({type:un(em),code:We(),name:V()}),tm={UNHANDLED:-1,PUSH_TO_TALK:"PUSH_TO_TALK",VOICE_ACTIVITY:"VOICE_ACTIVITY"},Ch=ye({type:un(tm),auto_threshold:et(),threshold:We(),shortcut:Rt(Kl),delay:We()}),jl=ye({device_id:V(),volume:We(),available_devices:Rt(Qp)}),nm={UNHANDLED:-1,AUDIO_INPUT:"AUDIO_INPUT",AUDIO_OUTPUT:"AUDIO_OUTPUT",VIDEO_INPUT:"VIDEO_INPUT"},hv=ye({type:un(nm),id:V(),vendor:ye({name:V(),url:V()}),model:ye({name:V(),url:V()}),related:Rt(V()),echo_cancellation:et().optional().nullable(),noise_suppression:et().optional().nullable(),automatic_gain_control:et().optional().nullable(),hardware_mute:et().optional().nullable()}),im={UNHANDLED:-1,APPLICATION:1,DLC:2,CONSUMABLE:3,BUNDLE:4,SUBSCRIPTION:5},Ph=ye({id:V(),name:V(),type:un(im),price:ye({amount:We(),currency:V()}),application_id:V(),flags:We(),release_date:V().nullable()}),rm={UNHANDLED:-1,PURCHASE:1,PREMIUM_SUBSCRIPTION:2,DEVELOPER_GIFT:3,TEST_MODE_PURCHASE:4,FREE_PURCHASE:5,USER_GIFT:6,PREMIUM_PURCHASE:7},ta=ye({id:V(),sku_id:V(),application_id:V(),user_id:V(),gift_code_flags:We(),type:un(rm),gifter_user_id:V().optional().nullable(),branches:Rt(V()).optional().nullable(),starts_at:V().optional().nullable(),ends_at:V().optional().nullable(),parent_id:V().optional().nullable(),consumed:et().optional().nullable(),deleted:et().optional().nullable(),gift_code_batch_id:V().optional().nullable()}),sm={UNHANDLED:-1,UNLOCKED:1,PORTRAIT:2,LANDSCAPE:3},dv=un(sm),am={UNHANDLED:-1,NOMINAL:0,FAIR:1,SERIOUS:2,CRITICAL:3},Nh=un(am),$l={UNHANDLED:-1,PORTRAIT:0,LANDSCAPE:1},fv=un($l),Jl={UNHANDLED:-1,FOCUSED:0,PIP:1,GRID:2},pv=un(Jl);var xo="ERROR",Mt;(function(n){n.READY="READY",n.VOICE_STATE_UPDATE="VOICE_STATE_UPDATE",n.SPEAKING_START="SPEAKING_START",n.SPEAKING_STOP="SPEAKING_STOP",n.ACTIVITY_LAYOUT_MODE_UPDATE="ACTIVITY_LAYOUT_MODE_UPDATE",n.ORIENTATION_UPDATE="ORIENTATION_UPDATE",n.CURRENT_USER_UPDATE="CURRENT_USER_UPDATE",n.CURRENT_GUILD_MEMBER_UPDATE="CURRENT_GUILD_MEMBER_UPDATE",n.ENTITLEMENT_CREATE="ENTITLEMENT_CREATE",n.THERMAL_STATE_UPDATE="THERMAL_STATE_UPDATE",n.ACTIVITY_INSTANCE_PARTICIPANTS_UPDATE="ACTIVITY_INSTANCE_PARTICIPANTS_UPDATE",n.RELATIONSHIP_UPDATE="RELATIONSHIP_UPDATE",n.ACTIVITY_JOIN="ACTIVITY_JOIN",n.QUEST_ENROLLMENT_STATUS_UPDATE="QUEST_ENROLLMENT_STATUS_UPDATE"})(Mt||(Mt={}));var An=yi.extend({evt:sr(Mt),nonce:V().nullable(),cmd:qt(Th),data:ye({}).passthrough()}),Lh=yi.extend({evt:qt(xo),data:ye({code:We(),message:V().optional()}).passthrough(),cmd:sr(be),nonce:V().nullable()}),mv=An.extend({evt:V()}),om=lo([An,mv,Lh]);function lm(n){let e=n.evt;if(!(e in Mt))throw new Error(`Unrecognized event type ${n.evt}`);return gv[e].payload.parse(n)}var gv={[Mt.READY]:{payload:An.extend({evt:qt(Mt.READY),data:ye({v:We(),config:ye({cdn_host:V().optional(),api_endpoint:V(),environment:V()}),user:ye({id:V(),username:V(),discriminator:V(),avatar:V().optional()}).optional()})})},[Mt.VOICE_STATE_UPDATE]:{payload:An.extend({evt:qt(Mt.VOICE_STATE_UPDATE),data:go}),subscribeArgs:ye({channel_id:V()})},[Mt.SPEAKING_START]:{payload:An.extend({evt:qt(Mt.SPEAKING_START),data:ye({lobby_id:V().optional(),channel_id:V().optional(),user_id:V()})}),subscribeArgs:ye({lobby_id:V().nullable().optional(),channel_id:V().nullable().optional()})},[Mt.SPEAKING_STOP]:{payload:An.extend({evt:qt(Mt.SPEAKING_STOP),data:ye({lobby_id:V().optional(),channel_id:V().optional(),user_id:V()})}),subscribeArgs:ye({lobby_id:V().nullable().optional(),channel_id:V().nullable().optional()})},[Mt.ACTIVITY_LAYOUT_MODE_UPDATE]:{payload:An.extend({evt:qt(Mt.ACTIVITY_LAYOUT_MODE_UPDATE),data:ye({layout_mode:un(Jl)})})},[Mt.ORIENTATION_UPDATE]:{payload:An.extend({evt:qt(Mt.ORIENTATION_UPDATE),data:ye({screen_orientation:un($l),orientation:sr(ho)})})},[Mt.CURRENT_USER_UPDATE]:{payload:An.extend({evt:qt(Mt.CURRENT_USER_UPDATE),data:Fi})},[Mt.CURRENT_GUILD_MEMBER_UPDATE]:{payload:An.extend({evt:qt(Mt.CURRENT_GUILD_MEMBER_UPDATE),data:wh}),subscribeArgs:ye({guild_id:V()})},[Mt.ENTITLEMENT_CREATE]:{payload:An.extend({evt:qt(Mt.ENTITLEMENT_CREATE),data:ye({entitlement:ta})})},[Mt.THERMAL_STATE_UPDATE]:{payload:An.extend({evt:qt(Mt.THERMAL_STATE_UPDATE),data:ye({thermal_state:Nh})})},[Mt.ACTIVITY_INSTANCE_PARTICIPANTS_UPDATE]:{payload:An.extend({evt:qt(Mt.ACTIVITY_INSTANCE_PARTICIPANTS_UPDATE),data:ye({participants:Mh.shape.participants})})},[Mt.RELATIONSHIP_UPDATE]:{payload:An.extend({evt:qt(Mt.RELATIONSHIP_UPDATE),data:Ah})},[Mt.ACTIVITY_JOIN]:{payload:An.extend({evt:qt(Mt.ACTIVITY_JOIN),data:ye({applicationId:V(),secret:V()})})},[Mt.QUEST_ENROLLMENT_STATUS_UPDATE]:{payload:An.extend({evt:qt(Mt.QUEST_ENROLLMENT_STATUS_UPDATE),data:ye({quest_id:V(),is_enrolled:et(),enrolled_at:V().date()})})}};function cm(n,e){throw e}var gs=ye({}).nullable(),Dh=ye({code:V()}),_v=ye({guilds:Rt(ye({id:V(),name:V()}))}),xv=ye({id:V(),name:V(),icon_url:V().optional(),members:Rt(mo)}),ms=ye({id:V(),type:un(_o),guild_id:V().optional().nullable(),name:V().optional().nullable(),topic:V().optional().nullable(),bitrate:We().optional().nullable(),user_limit:We().optional().nullable(),position:We().optional().nullable(),voice_states:Rt(go),messages:Rt(Ih)}),vv=ye({channels:Rt(Zl)}),NA=ms.nullable(),yv=ms.nullable(),Sv=ms.nullable(),LA=ye({input:jl,output:jl,mode:Ch,automatic_gain_control:et(),echo_cancellation:et(),noise_suppression:et(),qos:et(),silence_warning:et(),deaf:et(),mute:et()}),bv=ye({evt:V()}),Mv=ye({shortcut:Kl}),Uh=Lr,Oh=ye({skus:Rt(Ph)}),Fh=ye({entitlements:Rt(ta)}),Bh=Rt(ta).nullable(),kh=ye({use_interactive_pip:et()}),zh=ye({locale:V()}),Vh=ye({enabled:et()}),Gh=ye({permissions:mh().or(V())}),Hh=Hl(ye({opened:et().or(ea())}).default({opened:null})),Wh=ye({iosKeyboardResizesView:gh(et())}),um=yi.extend({cmd:sr(be),evt:ea()});function Ev({cmd:n,data:e}){switch(n){case be.AUTHORIZE:return Dh.parse(e);case be.CAPTURE_SHORTCUT:return Mv.parse(e);case be.ENCOURAGE_HW_ACCELERATION:return Vh.parse(e);case be.GET_CHANNEL:return ms.parse(e);case be.GET_CHANNELS:return vv.parse(e);case be.GET_CHANNEL_PERMISSIONS:return Gh.parse(e);case be.GET_GUILD:return xv.parse(e);case be.GET_GUILDS:return _v.parse(e);case be.GET_PLATFORM_BEHAVIORS:return Wh.parse(e);case be.GET_CHANNEL:return ms.parse(e);case be.SELECT_TEXT_CHANNEL:return Sv.parse(e);case be.SELECT_VOICE_CHANNEL:return yv.parse(e);case be.SET_ACTIVITY:return Uh.parse(e);case be.GET_SKUS_EMBEDDED:return Oh.parse(e);case be.GET_ENTITLEMENTS_EMBEDDED:return Fh.parse(e);case be.SET_CONFIG:return kh.parse(e);case be.START_PURCHASE:return Bh.parse(e);case be.SUBSCRIBE:case be.UNSUBSCRIBE:return bv.parse(e);case be.USER_SETTINGS_GET_LOCALE:return zh.parse(e);case be.OPEN_EXTERNAL_LINK:return Hh.parse(e);case be.SET_ORIENTATION_LOCK_STATE:case be.SET_CERTIFIED_DEVICES:case be.SEND_ANALYTICS_EVENT:case be.OPEN_INVITE_DIALOG:case be.CAPTURE_LOG:case be.GET_SKUS:case be.GET_ENTITLEMENTS:return gs.parse(e);case be.AUTHENTICATE:case be.GET_ACTIVITY_INSTANCE_CONNECTED_PARTICIPANTS:case be.GET_QUEST:case be.GET_QUEST_ENROLLMENT_STATUS:case be.GET_RELATIONSHIPS:case be.GET_USER:case be.INITIATE_IMAGE_UPLOAD:case be.INVITE_USER_EMBEDDED:case be.OPEN_SHARE_MOMENT_DIALOG:case be.QUEST_START_TIMER:case be.REQUEST_PROXY_TICKET_REFRESH:case be.SHARE_INTERACTION:case be.SHARE_LINK:let{response:t}=Xl[n];return t.parse(e);default:cm(n,new Error(`Unrecognized command ${n}`))}}function hm(n){return Object.assign(Object.assign({},n),{data:Ev(n)})}ye({frame_id:V(),platform:sr(jn).optional().nullable()});ye({v:qt(1),encoding:qt("json").optional(),client_id:V(),frame_id:V()});var fm=ye({code:We(),message:V().optional()}),Tv=ye({evt:V().nullable(),nonce:V().nullable(),data:ps().nullable(),cmd:V()}).passthrough();function pm(n){let e=Tv.parse(n);return e.evt!=null?e.evt===xo?Lh.parse(e):lm(om.parse(e)):hm(um.passthrough().parse(e))}function Ht(n,e,t,i=()=>{}){let r=yi.extend({cmd:qt(e),data:t});return async s=>{let a=await n({cmd:e,args:s,transfer:i(s)});return r.parse(a).data}}function Yt(n,e=()=>{}){let t=Xl[n].response,i=yi.extend({cmd:qt(n),data:t});return r=>async s=>{let a=await r({cmd:n,args:s,transfer:e(s)});return i.parse(a).data}}var mm=n=>Ht(n,be.AUTHORIZE,Dh);var gm=n=>Ht(n,be.CAPTURE_LOG,gs);var _m=n=>Ht(n,be.ENCOURAGE_HW_ACCELERATION,Vh);var xm=n=>Ht(n,be.GET_CHANNEL,ms);var vm=n=>Ht(n,be.GET_ENTITLEMENTS_EMBEDDED,Fh);var ym=n=>Ht(n,be.GET_SKUS_EMBEDDED,Oh);var Sm=n=>Ht(n,be.GET_CHANNEL_PERMISSIONS,Gh);var bm=n=>Ht(n,be.GET_PLATFORM_BEHAVIORS,Wh);var Mm=n=>Ht(n,be.OPEN_EXTERNAL_LINK,Hh);var Em=n=>Ht(n,be.OPEN_INVITE_DIALOG,gs);Lr.pick({state:!0,state_url:!0,details:!0,details_url:!0,timestamps:!0,assets:!0,party:!0,secrets:!0,instance:!0,type:!0}).extend({type:Lr.shape.type.optional(),instance:Lr.shape.instance.optional()}).nullable();var Tm=n=>Ht(n,be.SET_ACTIVITY,Uh);var Am=n=>Ht(n,be.SET_CONFIG,kh);function wm({sendCommand:n,cmd:e,response:t,fallbackTransform:i,transferTransform:r=()=>{}}){let s=yi.extend({cmd:qt(e),data:t});return async a=>{try{let o=await n({cmd:e,args:a,transfer:r(a)});return s.parse(o).data}catch(o){if(o.code===uo.INVALID_PAYLOAD){let c=i(a),l=await n({cmd:e,args:c,transfer:r(c)});return s.parse(l).data}else throw o}}}var Av=n=>({lock_state:n.lock_state,picture_in_picture_lock_state:n.picture_in_picture_lock_state}),Rm=n=>wm({sendCommand:n,cmd:be.SET_ORIENTATION_LOCK_STATE,response:gs,fallbackTransform:Av});var Im=n=>Ht(n,be.START_PURCHASE,Bh);var Cm=n=>Ht(n,be.USER_SETTINGS_GET_LOCALE,zh);var Pm=Yt(yt.AUTHENTICATE);var Xh=Yt(yt.GET_ACTIVITY_INSTANCE_CONNECTED_PARTICIPANTS);var Nm=Yt(yt.GET_QUEST);var Lm=Yt(yt.GET_QUEST_ENROLLMENT_STATUS);var Dm=Yt(yt.GET_RELATIONSHIPS);var Um=Yt(yt.GET_USER);var Om=Yt(yt.INITIATE_IMAGE_UPLOAD);var Fm=Yt(yt.INVITE_USER_EMBEDDED);var Bm=Yt(yt.OPEN_SHARE_MOMENT_DIALOG);var km=Yt(yt.QUEST_START_TIMER);var zm=Yt(yt.REQUEST_PROXY_TICKET_REFRESH);var Vm=Yt(yt.SHARE_INTERACTION);var Gm=Yt(yt.SHARE_LINK);function Hm(n){return{authorize:mm(n),captureLog:gm(n),encourageHardwareAcceleration:_m(n),getChannel:xm(n),getChannelPermissions:Sm(n),getEntitlements:vm(n),getPlatformBehaviors:bm(n),getSkus:ym(n),openExternalLink:Mm(n),openInviteDialog:Em(n),setActivity:Tm(n),setConfig:Am(n),setOrientationLockState:Rm(n),startPurchase:Im(n),userSettingsGetLocale:Cm(n),getInstanceConnectedParticipants:Xh(n),authenticate:Pm(n),getActivityInstanceConnectedParticipants:Xh(n),getQuest:Nm(n),getQuestEnrollmentStatus:Lm(n),getRelationships:Dm(n),getUser:Um(n),initiateImageUpload:Om(n),inviteUserEmbedded:Fm(n),openShareMomentDialog:Bm(n),questStartTimer:km(n),requestProxyTicketRefresh:zm(n),shareInteraction:Vm(n),shareLink:Gm(n)}}var ec=class extends Error{constructor(e,t=""){super(t),this.code=e,this.message=t,this.name="Discord SDK Error"}};function qh(){return{disableConsoleLogOverride:!1}}var Wm=["log","warn","debug","info","error"];function Xm(n,e,t){let i=n[e],r=n;i&&(n[e]=function(){let s=[].slice.call(arguments),a=""+s.join(" ");t(e,a),i.apply(r,s)})}var qm="2.5.0";var wv=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),Yh={randomUUID:wv};var Zh,Rv=new Uint8Array(16);function Ym(){if(!Zh){if(typeof crypto>"u"||!crypto.getRandomValues)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");Zh=crypto.getRandomValues.bind(crypto)}return Zh(Rv)}var bn=[];for(let n=0;n<256;++n)bn.push((n+256).toString(16).slice(1));function Zm(n,e=0){return(bn[n[e+0]]+bn[n[e+1]]+bn[n[e+2]]+bn[n[e+3]]+"-"+bn[n[e+4]]+bn[n[e+5]]+"-"+bn[n[e+6]]+bn[n[e+7]]+"-"+bn[n[e+8]]+bn[n[e+9]]+"-"+bn[n[e+10]]+bn[n[e+11]]+bn[n[e+12]]+bn[n[e+13]]+bn[n[e+14]]+bn[n[e+15]]).toLowerCase()}function Kh(n,e,t){if(Yh.randomUUID&&!e&&!n)return Yh.randomUUID();n=n||{};let i=n.random??n.rng?.()??Ym();if(i.length<16)throw new Error("Random bytes length must be >= 16");return i[6]=i[6]&15|64,i[8]=i[8]&63|128,Zm(i)}var ar;(function(n){n[n.HANDSHAKE=0]="HANDSHAKE",n[n.FRAME=1]="FRAME",n[n.CLOSE=2]="CLOSE",n[n.HELLO=3]="HELLO"})(ar||(ar={}));var Iv=new Set(Cv());function Cv(){return typeof window>"u"?[]:[window.location.origin,"https://discord.com","https://discordapp.com","https://ptb.discord.com","https://ptb.discordapp.com","https://canary.discord.com","https://canary.discordapp.com","https://staging.discord.co","http://localhost:3333","https://pax.discord.com","null"]}function Pv(){var n;return[(n=window.parent.opener)!==null&&n!==void 0?n:window.parent,document.referrer?document.referrer:"*"]}var vo=class{getTransfer(e){var t;switch(e.cmd){case be.SUBSCRIBE:case be.UNSUBSCRIBE:return;default:return(t=e.transfer)!==null&&t!==void 0?t:void 0}}constructor(e,t){if(this.sdkVersion=qm,this.mobileAppVersion=null,this.source=null,this.sourceOrigin="",this.eventBus=new ch,this.pendingCommands=new Map,this.sendCommand=o=>{var c;if(this.source==null)throw new Error("Attempting to send message before initialization");let l=Kh();return(c=this.source)===null||c===void 0||c.postMessage([ar.FRAME,Object.assign(Object.assign({},o),{nonce:l})],this.sourceOrigin,this.getTransfer(o)),new Promise((h,f)=>{this.pendingCommands.set(l,{resolve:h,reject:f})})},this.commands=Hm(this.sendCommand),this.handleMessage=o=>{if(!Iv.has(o.origin))return;let c=o.data;if(!Array.isArray(c))return;let[l,u]=c;switch(l){case ar.HELLO:return;case ar.CLOSE:return this.handleClose(u);case ar.HANDSHAKE:return this.handleHandshake();case ar.FRAME:return this.handleFrame(u);default:throw new Error("Invalid message format")}},this.isReady=!1,this.clientId=e,this.configuration=t??qh(),typeof window<"u"&&window.addEventListener("message",this.handleMessage),typeof window>"u"){this.frameId="",this.instanceId="",this.customId=null,this.referrerId=null,this.platform=jn.DESKTOP,this.guildId=null,this.channelId=null,this.locationId=null;return}let i=new URLSearchParams(this._getSearch()),r=i.get("frame_id");if(!r)throw new Error("frame_id query param is not defined");this.frameId=r;let s=i.get("instance_id");if(!s)throw new Error("instance_id query param is not defined");this.instanceId=s;let a=i.get("platform");if(a){if(a!==jn.DESKTOP&&a!==jn.MOBILE)throw new Error(`Invalid query param "platform" of "${a}". Valid values are "${jn.DESKTOP}" or "${jn.MOBILE}"`)}else throw new Error("platform query param is not defined");this.platform=a,this.customId=i.get("custom_id"),this.referrerId=i.get("referrer_id"),this.guildId=i.get("guild_id"),this.channelId=i.get("channel_id"),this.locationId=i.get("location_id"),this.mobileAppVersion=i.get("mobile_app_version"),[this.source,this.sourceOrigin]=Pv(),this.addOnReadyListener(),this.handshake()}close(e,t){var i;window.removeEventListener("message",this.handleMessage);let r=Kh();(i=this.source)===null||i===void 0||i.postMessage([ar.CLOSE,{code:e,message:t,nonce:r}],this.sourceOrigin)}async subscribe(e,t,...i){let[r]=i,s=this.eventBus.listenerCount(e),a=this.eventBus.on(e,t);return Object.values(Mt).includes(e)&&e!==Mt.READY&&s===0&&await this.sendCommand({cmd:be.SUBSCRIBE,args:r,evt:e}),a}async unsubscribe(e,t,...i){let[r]=i;return e!==Mt.READY&&this.eventBus.listenerCount(e)===1&&await this.sendCommand({cmd:be.UNSUBSCRIBE,evt:e,args:r}),this.eventBus.off(e,t)}async ready(){this.isReady||await new Promise(e=>{this.eventBus.once(Mt.READY,e)})}parseMajorMobileVersion(){if(this.mobileAppVersion&&this.mobileAppVersion.includes("."))try{return parseInt(this.mobileAppVersion.split(".")[0])}catch{return bh}return bh}handshake(){var e;let t={v:1,encoding:"json",client_id:this.clientId,frame_id:this.frameId},i=this.parseMajorMobileVersion();(this.platform===jn.DESKTOP||i>=Np)&&(t.sdk_version=this.sdkVersion),(e=this.source)===null||e===void 0||e.postMessage([ar.HANDSHAKE,t],this.sourceOrigin)}addOnReadyListener(){this.eventBus.once(Mt.READY,()=>{this.overrideConsoleLogging(),this.isReady=!0})}overrideConsoleLogging(){if(this.configuration.disableConsoleLogOverride)return;let e=(t,i)=>{this.commands.captureLog({level:t,message:i})};Wm.forEach(t=>{Xm(console,t,e)})}handleClose(e){fm.parse(e)}handleHandshake(){}handleFrame(e){var t,i;let r;try{r=pm(e)}catch(s){console.error("Failed to parse",e),console.error(s);return}if(r.cmd==="DISPATCH")this.eventBus.emit(r.evt,r.data);else{if(r.evt===xo){if(r.nonce!=null){(t=this.pendingCommands.get(r.nonce))===null||t===void 0||t.reject(r.data),this.pendingCommands.delete(r.nonce);return}this.eventBus.emit("error",new ec(r.data.code,r.data.message))}if(r.nonce==null){console.error("Missing nonce",e);return}(i=this.pendingCommands.get(r.nonce))===null||i===void 0||i.resolve(r),this.pendingCommands.delete(r.nonce)}}_getSearch(){return typeof window>"u"?"":window.location.search}};var na=1e9,Nv={precision:20,rounding:4,toExpNeg:-7,toExpPos:21,LN10:"2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286"},ng,jt=!0,di="[DecimalError] ",xs=di+"Invalid argument: ",$h=di+"Exponent out of range: ",ia=Math.floor,_s=Math.pow,Lv=/^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,$n,mn=1e7,Zt=7,$m=9007199254740991,tc=ia($m/Zt),ke={};ke.absoluteValue=ke.abs=function(){var n=new this.constructor(this);return n.s&&(n.s=1),n};ke.comparedTo=ke.cmp=function(n){var e,t,i,r,s=this;if(n=new s.constructor(n),s.s!==n.s)return s.s||-n.s;if(s.e!==n.e)return s.e>n.e^s.s<0?1:-1;for(i=s.d.length,r=n.d.length,e=0,t=i<r?i:r;e<t;++e)if(s.d[e]!==n.d[e])return s.d[e]>n.d[e]^s.s<0?1:-1;return i===r?0:i>r^s.s<0?1:-1};ke.decimalPlaces=ke.dp=function(){var n=this,e=n.d.length-1,t=(e-n.e)*Zt;if(e=n.d[e],e)for(;e%10==0;e/=10)t--;return t<0?0:t};ke.dividedBy=ke.div=function(n){return or(this,new this.constructor(n))};ke.dividedToIntegerBy=ke.idiv=function(n){var e=this,t=e.constructor;return Wt(or(e,new t(n),0,1),t.precision)};ke.equals=ke.eq=function(n){return!this.cmp(n)};ke.exponent=function(){return on(this)};ke.greaterThan=ke.gt=function(n){return this.cmp(n)>0};ke.greaterThanOrEqualTo=ke.gte=function(n){return this.cmp(n)>=0};ke.isInteger=ke.isint=function(){return this.e>this.d.length-2};ke.isNegative=ke.isneg=function(){return this.s<0};ke.isPositive=ke.ispos=function(){return this.s>0};ke.isZero=function(){return this.s===0};ke.lessThan=ke.lt=function(n){return this.cmp(n)<0};ke.lessThanOrEqualTo=ke.lte=function(n){return this.cmp(n)<1};ke.logarithm=ke.log=function(n){var e,t=this,i=t.constructor,r=i.precision,s=r+5;if(n===void 0)n=new i(10);else if(n=new i(n),n.s<1||n.eq($n))throw Error(di+"NaN");if(t.s<1)throw Error(di+(t.s?"NaN":"-Infinity"));return t.eq($n)?new i(0):(jt=!1,e=or(yo(t,s),yo(n,s),s),jt=!0,Wt(e,r))};ke.minus=ke.sub=function(n){var e=this;return n=new e.constructor(n),e.s==n.s?eg(e,n):Jm(e,(n.s=-n.s,n))};ke.modulo=ke.mod=function(n){var e,t=this,i=t.constructor,r=i.precision;if(n=new i(n),!n.s)throw Error(di+"NaN");return t.s?(jt=!1,e=or(t,n,0,1).times(n),jt=!0,t.minus(e)):Wt(new i(t),r)};ke.naturalExponential=ke.exp=function(){return Qm(this)};ke.naturalLogarithm=ke.ln=function(){return yo(this)};ke.negated=ke.neg=function(){var n=new this.constructor(this);return n.s=-n.s||0,n};ke.plus=ke.add=function(n){var e=this;return n=new e.constructor(n),e.s==n.s?Jm(e,n):eg(e,(n.s=-n.s,n))};ke.precision=ke.sd=function(n){var e,t,i,r=this;if(n!==void 0&&n!==!!n&&n!==1&&n!==0)throw Error(xs+n);if(e=on(r)+1,i=r.d.length-1,t=i*Zt+1,i=r.d[i],i){for(;i%10==0;i/=10)t--;for(i=r.d[0];i>=10;i/=10)t++}return n&&e>t?e:t};ke.squareRoot=ke.sqrt=function(){var n,e,t,i,r,s,a,o=this,c=o.constructor;if(o.s<1){if(!o.s)return new c(0);throw Error(di+"NaN")}for(n=on(o),jt=!1,r=Math.sqrt(+o),r==0||r==1/0?(e=Bi(o.d),(e.length+n)%2==0&&(e+="0"),r=Math.sqrt(e),n=ia((n+1)/2)-(n<0||n%2),r==1/0?e="5e"+n:(e=r.toExponential(),e=e.slice(0,e.indexOf("e")+1)+n),i=new c(e)):i=new c(r.toString()),t=c.precision,r=a=t+3;;)if(s=i,i=s.plus(or(o,s,a+2)).times(.5),Bi(s.d).slice(0,a)===(e=Bi(i.d)).slice(0,a)){if(e=e.slice(a-3,a+1),r==a&&e=="4999"){if(Wt(s,t+1,0),s.times(s).eq(o)){i=s;break}}else if(e!="9999")break;a+=4}return jt=!0,Wt(i,t)};ke.times=ke.mul=function(n){var e,t,i,r,s,a,o,c,l,u=this,h=u.constructor,f=u.d,m=(n=new h(n)).d;if(!u.s||!n.s)return new h(0);for(n.s*=u.s,t=u.e+n.e,c=f.length,l=m.length,c<l&&(s=f,f=m,m=s,a=c,c=l,l=a),s=[],a=c+l,i=a;i--;)s.push(0);for(i=l;--i>=0;){for(e=0,r=c+i;r>i;)o=s[r]+m[i]*f[r-i-1]+e,s[r--]=o%mn|0,e=o/mn|0;s[r]=(s[r]+e)%mn|0}for(;!s[--a];)s.pop();return e?++t:s.shift(),n.d=s,n.e=t,jt?Wt(n,h.precision):n};ke.toDecimalPlaces=ke.todp=function(n,e){var t=this,i=t.constructor;return t=new i(t),n===void 0?t:(ki(n,0,na),e===void 0?e=i.rounding:ki(e,0,8),Wt(t,n+on(t)+1,e))};ke.toExponential=function(n,e){var t,i=this,r=i.constructor;return n===void 0?t=vs(i,!0):(ki(n,0,na),e===void 0?e=r.rounding:ki(e,0,8),i=Wt(new r(i),n+1,e),t=vs(i,!0,n+1)),t};ke.toFixed=function(n,e){var t,i,r=this,s=r.constructor;return n===void 0?vs(r):(ki(n,0,na),e===void 0?e=s.rounding:ki(e,0,8),i=Wt(new s(r),n+on(r)+1,e),t=vs(i.abs(),!1,n+on(i)+1),r.isneg()&&!r.isZero()?"-"+t:t)};ke.toInteger=ke.toint=function(){var n=this,e=n.constructor;return Wt(new e(n),on(n)+1,e.rounding)};ke.toNumber=function(){return+this};ke.toPower=ke.pow=function(n){var e,t,i,r,s,a,o=this,c=o.constructor,l=12,u=+(n=new c(n));if(!n.s)return new c($n);if(o=new c(o),!o.s){if(n.s<1)throw Error(di+"Infinity");return o}if(o.eq($n))return o;if(i=c.precision,n.eq($n))return Wt(o,i);if(e=n.e,t=n.d.length-1,a=e>=t,s=o.s,a){if((t=u<0?-u:u)<=$m){for(r=new c($n),e=Math.ceil(i/Zt+4),jt=!1;t%2&&(r=r.times(o),jm(r.d,e)),t=ia(t/2),t!==0;)o=o.times(o),jm(o.d,e);return jt=!0,n.s<0?new c($n).div(r):Wt(r,i)}}else if(s<0)throw Error(di+"NaN");return s=s<0&&n.d[Math.max(e,t)]&1?-1:1,o.s=1,jt=!1,r=n.times(yo(o,i+l)),jt=!0,r=Qm(r),r.s=s,r};ke.toPrecision=function(n,e){var t,i,r=this,s=r.constructor;return n===void 0?(t=on(r),i=vs(r,t<=s.toExpNeg||t>=s.toExpPos)):(ki(n,1,na),e===void 0?e=s.rounding:ki(e,0,8),r=Wt(new s(r),n,e),t=on(r),i=vs(r,n<=t||t<=s.toExpNeg,n)),i};ke.toSignificantDigits=ke.tosd=function(n,e){var t=this,i=t.constructor;return n===void 0?(n=i.precision,e=i.rounding):(ki(n,1,na),e===void 0?e=i.rounding:ki(e,0,8)),Wt(new i(t),n,e)};ke.toString=ke.valueOf=ke.val=ke.toJSON=ke[Symbol.for("nodejs.util.inspect.custom")]=function(){var n=this,e=on(n),t=n.constructor;return vs(n,e<=t.toExpNeg||e>=t.toExpPos)};function Jm(n,e){var t,i,r,s,a,o,c,l,u=n.constructor,h=u.precision;if(!n.s||!e.s)return e.s||(e=new u(n)),jt?Wt(e,h):e;if(c=n.d,l=e.d,a=n.e,r=e.e,c=c.slice(),s=a-r,s){for(s<0?(i=c,s=-s,o=l.length):(i=l,r=a,o=c.length),a=Math.ceil(h/Zt),o=a>o?a+1:o+1,s>o&&(s=o,i.length=1),i.reverse();s--;)i.push(0);i.reverse()}for(o=c.length,s=l.length,o-s<0&&(s=o,i=l,l=c,c=i),t=0;s;)t=(c[--s]=c[s]+l[s]+t)/mn|0,c[s]%=mn;for(t&&(c.unshift(t),++r),o=c.length;c[--o]==0;)c.pop();return e.d=c,e.e=r,jt?Wt(e,h):e}function ki(n,e,t){if(n!==~~n||n<e||n>t)throw Error(xs+n)}function Bi(n){var e,t,i,r=n.length-1,s="",a=n[0];if(r>0){for(s+=a,e=1;e<r;e++)i=n[e]+"",t=Zt-i.length,t&&(s+=Dr(t)),s+=i;a=n[e],i=a+"",t=Zt-i.length,t&&(s+=Dr(t))}else if(a===0)return"0";for(;a%10===0;)a/=10;return s+a}var or=(function(){function n(i,r){var s,a=0,o=i.length;for(i=i.slice();o--;)s=i[o]*r+a,i[o]=s%mn|0,a=s/mn|0;return a&&i.unshift(a),i}function e(i,r,s,a){var o,c;if(s!=a)c=s>a?1:-1;else for(o=c=0;o<s;o++)if(i[o]!=r[o]){c=i[o]>r[o]?1:-1;break}return c}function t(i,r,s){for(var a=0;s--;)i[s]-=a,a=i[s]<r[s]?1:0,i[s]=a*mn+i[s]-r[s];for(;!i[0]&&i.length>1;)i.shift()}return function(i,r,s,a){var o,c,l,u,h,f,m,x,v,g,_,T,I,E,w,R,C,y,N=i.constructor,k=i.s==r.s?1:-1,W=i.d,q=r.d;if(!i.s)return new N(i);if(!r.s)throw Error(di+"Division by zero");for(c=i.e-r.e,C=q.length,w=W.length,m=new N(k),x=m.d=[],l=0;q[l]==(W[l]||0);)++l;if(q[l]>(W[l]||0)&&--c,s==null?T=s=N.precision:a?T=s+(on(i)-on(r))+1:T=s,T<0)return new N(0);if(T=T/Zt+2|0,l=0,C==1)for(u=0,q=q[0],T++;(l<w||u)&&T--;l++)I=u*mn+(W[l]||0),x[l]=I/q|0,u=I%q|0;else{for(u=mn/(q[0]+1)|0,u>1&&(q=n(q,u),W=n(W,u),C=q.length,w=W.length),E=C,v=W.slice(0,C),g=v.length;g<C;)v[g++]=0;y=q.slice(),y.unshift(0),R=q[0],q[1]>=mn/2&&++R;do u=0,o=e(q,v,C,g),o<0?(_=v[0],C!=g&&(_=_*mn+(v[1]||0)),u=_/R|0,u>1?(u>=mn&&(u=mn-1),h=n(q,u),f=h.length,g=v.length,o=e(h,v,f,g),o==1&&(u--,t(h,C<f?y:q,f))):(u==0&&(o=u=1),h=q.slice()),f=h.length,f<g&&h.unshift(0),t(v,h,g),o==-1&&(g=v.length,o=e(q,v,C,g),o<1&&(u++,t(v,C<g?y:q,g))),g=v.length):o===0&&(u++,v=[0]),x[l++]=u,o&&v[0]?v[g++]=W[E]||0:(v=[W[E]],g=1);while((E++<w||v[0]!==void 0)&&T--)}return x[0]||x.shift(),m.e=c,Wt(m,a?s+on(m)+1:s)}})();function Qm(n,e){var t,i,r,s,a,o,c=0,l=0,u=n.constructor,h=u.precision;if(on(n)>16)throw Error($h+on(n));if(!n.s)return new u($n);for(e==null?(jt=!1,o=h):o=e,a=new u(.03125);n.abs().gte(.1);)n=n.times(a),l+=5;for(i=Math.log(_s(2,l))/Math.LN10*2+5|0,o+=i,t=r=s=new u($n),u.precision=o;;){if(r=Wt(r.times(n),o),t=t.times(++c),a=s.plus(or(r,t,o)),Bi(a.d).slice(0,o)===Bi(s.d).slice(0,o)){for(;l--;)s=Wt(s.times(s),o);return u.precision=h,e==null?(jt=!0,Wt(s,h)):s}s=a}}function on(n){for(var e=n.e*Zt,t=n.d[0];t>=10;t/=10)e++;return e}function jh(n,e,t){if(e>n.LN10.sd())throw jt=!0,t&&(n.precision=t),Error(di+"LN10 precision limit exceeded");return Wt(new n(n.LN10),e)}function Dr(n){for(var e="";n--;)e+="0";return e}function yo(n,e){var t,i,r,s,a,o,c,l,u,h=1,f=10,m=n,x=m.d,v=m.constructor,g=v.precision;if(m.s<1)throw Error(di+(m.s?"NaN":"-Infinity"));if(m.eq($n))return new v(0);if(e==null?(jt=!1,l=g):l=e,m.eq(10))return e==null&&(jt=!0),jh(v,l);if(l+=f,v.precision=l,t=Bi(x),i=t.charAt(0),s=on(m),Math.abs(s)<15e14){for(;i<7&&i!=1||i==1&&t.charAt(1)>3;)m=m.times(n),t=Bi(m.d),i=t.charAt(0),h++;s=on(m),i>1?(m=new v("0."+t),s++):m=new v(i+"."+t.slice(1))}else return c=jh(v,l+2,g).times(s+""),m=yo(new v(i+"."+t.slice(1)),l-f).plus(c),v.precision=g,e==null?(jt=!0,Wt(m,g)):m;for(o=a=m=or(m.minus($n),m.plus($n),l),u=Wt(m.times(m),l),r=3;;){if(a=Wt(a.times(u),l),c=o.plus(or(a,new v(r),l)),Bi(c.d).slice(0,l)===Bi(o.d).slice(0,l))return o=o.times(2),s!==0&&(o=o.plus(jh(v,l+2,g).times(s+""))),o=or(o,new v(h),l),v.precision=g,e==null?(jt=!0,Wt(o,g)):o;o=c,r+=2}}function Km(n,e){var t,i,r;for((t=e.indexOf("."))>-1&&(e=e.replace(".","")),(i=e.search(/e/i))>0?(t<0&&(t=i),t+=+e.slice(i+1),e=e.substring(0,i)):t<0&&(t=e.length),i=0;e.charCodeAt(i)===48;)++i;for(r=e.length;e.charCodeAt(r-1)===48;)--r;if(e=e.slice(i,r),e){if(r-=i,t=t-i-1,n.e=ia(t/Zt),n.d=[],i=(t+1)%Zt,t<0&&(i+=Zt),i<r){for(i&&n.d.push(+e.slice(0,i)),r-=Zt;i<r;)n.d.push(+e.slice(i,i+=Zt));e=e.slice(i),i=Zt-e.length}else i-=r;for(;i--;)e+="0";if(n.d.push(+e),jt&&(n.e>tc||n.e<-tc))throw Error($h+t)}else n.s=0,n.e=0,n.d=[0];return n}function Wt(n,e,t){var i,r,s,a,o,c,l,u,h=n.d;for(a=1,s=h[0];s>=10;s/=10)a++;if(i=e-a,i<0)i+=Zt,r=e,l=h[u=0];else{if(u=Math.ceil((i+1)/Zt),s=h.length,u>=s)return n;for(l=s=h[u],a=1;s>=10;s/=10)a++;i%=Zt,r=i-Zt+a}if(t!==void 0&&(s=_s(10,a-r-1),o=l/s%10|0,c=e<0||h[u+1]!==void 0||l%s,c=t<4?(o||c)&&(t==0||t==(n.s<0?3:2)):o>5||o==5&&(t==4||c||t==6&&(i>0?r>0?l/_s(10,a-r):0:h[u-1])%10&1||t==(n.s<0?8:7))),e<1||!h[0])return c?(s=on(n),h.length=1,e=e-s-1,h[0]=_s(10,(Zt-e%Zt)%Zt),n.e=ia(-e/Zt)||0):(h.length=1,h[0]=n.e=n.s=0),n;if(i==0?(h.length=u,s=1,u--):(h.length=u+1,s=_s(10,Zt-i),h[u]=r>0?(l/_s(10,a-r)%_s(10,r)|0)*s:0),c)for(;;)if(u==0){(h[0]+=s)==mn&&(h[0]=1,++n.e);break}else{if(h[u]+=s,h[u]!=mn)break;h[u--]=0,s=1}for(i=h.length;h[--i]===0;)h.pop();if(jt&&(n.e>tc||n.e<-tc))throw Error($h+on(n));return n}function eg(n,e){var t,i,r,s,a,o,c,l,u,h,f=n.constructor,m=f.precision;if(!n.s||!e.s)return e.s?e.s=-e.s:e=new f(n),jt?Wt(e,m):e;if(c=n.d,h=e.d,i=e.e,l=n.e,c=c.slice(),a=l-i,a){for(u=a<0,u?(t=c,a=-a,o=h.length):(t=h,i=l,o=c.length),r=Math.max(Math.ceil(m/Zt),o)+2,a>r&&(a=r,t.length=1),t.reverse(),r=a;r--;)t.push(0);t.reverse()}else{for(r=c.length,o=h.length,u=r<o,u&&(o=r),r=0;r<o;r++)if(c[r]!=h[r]){u=c[r]<h[r];break}a=0}for(u&&(t=c,c=h,h=t,e.s=-e.s),o=c.length,r=h.length-o;r>0;--r)c[o++]=0;for(r=h.length;r>a;){if(c[--r]<h[r]){for(s=r;s&&c[--s]===0;)c[s]=mn-1;--c[s],c[r]+=mn}c[r]-=h[r]}for(;c[--o]===0;)c.pop();for(;c[0]===0;c.shift())--i;return c[0]?(e.d=c,e.e=i,jt?Wt(e,m):e):new f(0)}function vs(n,e,t){var i,r=on(n),s=Bi(n.d),a=s.length;return e?(t&&(i=t-a)>0?s=s.charAt(0)+"."+s.slice(1)+Dr(i):a>1&&(s=s.charAt(0)+"."+s.slice(1)),s=s+(r<0?"e":"e+")+r):r<0?(s="0."+Dr(-r-1)+s,t&&(i=t-a)>0&&(s+=Dr(i))):r>=a?(s+=Dr(r+1-a),t&&(i=t-r-1)>0&&(s=s+"."+Dr(i))):((i=r+1)<a&&(s=s.slice(0,i)+"."+s.slice(i)),t&&(i=t-a)>0&&(r+1===a&&(s+="."),s+=Dr(i))),n.s<0?"-"+s:s}function jm(n,e){if(n.length>e)return n.length=e,!0}function tg(n){var e,t,i;function r(s){var a=this;if(!(a instanceof r))return new r(s);if(a.constructor=r,s instanceof r){a.s=s.s,a.e=s.e,a.d=(s=s.d)?s.slice():s;return}if(typeof s=="number"){if(s*0!==0)throw Error(xs+s);if(s>0)a.s=1;else if(s<0)s=-s,a.s=-1;else{a.s=0,a.e=0,a.d=[0];return}if(s===~~s&&s<1e7){a.e=0,a.d=[s];return}return Km(a,s.toString())}else if(typeof s!="string")throw Error(xs+s);if(s.charCodeAt(0)===45?(s=s.slice(1),a.s=-1):a.s=1,Lv.test(s))Km(a,s);else throw Error(xs+s)}if(r.prototype=ke,r.ROUND_UP=0,r.ROUND_DOWN=1,r.ROUND_CEIL=2,r.ROUND_FLOOR=3,r.ROUND_HALF_UP=4,r.ROUND_HALF_DOWN=5,r.ROUND_HALF_EVEN=6,r.ROUND_HALF_CEIL=7,r.ROUND_HALF_FLOOR=8,r.clone=tg,r.config=r.set=Dv,n===void 0&&(n={}),n)for(i=["precision","rounding","toExpNeg","toExpPos","LN10"],e=0;e<i.length;)n.hasOwnProperty(t=i[e++])||(n[t]=this[t]);return r.config(n),r}function Dv(n){if(!n||typeof n!="object")throw Error(di+"Object expected");var e,t,i,r=["precision",1,na,"rounding",0,8,"toExpNeg",-1/0,0,"toExpPos",0,1/0];for(e=0;e<r.length;e+=3)if((i=n[t=r[e]])!==void 0)if(ia(i)===i&&i>=r[e+1]&&i<=r[e+2])this[t]=i;else throw Error(xs+t+": "+i);if((i=n[t="LN10"])!==void 0)if(i==Math.LN10)this[t]=new this(i);else throw Error(xs+t+": "+i);return this}var ng=tg(Nv);$n=new ng(1);var Y;(function(n){n.AED="aed",n.AFN="afn",n.ALL="all",n.AMD="amd",n.ANG="ang",n.AOA="aoa",n.ARS="ars",n.AUD="aud",n.AWG="awg",n.AZN="azn",n.BAM="bam",n.BBD="bbd",n.BDT="bdt",n.BGN="bgn",n.BHD="bhd",n.BIF="bif",n.BMD="bmd",n.BND="bnd",n.BOB="bob",n.BOV="bov",n.BRL="brl",n.BSD="bsd",n.BTN="btn",n.BWP="bwp",n.BYN="byn",n.BYR="byr",n.BZD="bzd",n.CAD="cad",n.CDF="cdf",n.CHE="che",n.CHF="chf",n.CHW="chw",n.CLF="clf",n.CLP="clp",n.CNY="cny",n.COP="cop",n.COU="cou",n.CRC="crc",n.CUC="cuc",n.CUP="cup",n.CVE="cve",n.CZK="czk",n.DJF="djf",n.DKK="dkk",n.DOP="dop",n.DZD="dzd",n.EGP="egp",n.ERN="ern",n.ETB="etb",n.EUR="eur",n.FJD="fjd",n.FKP="fkp",n.GBP="gbp",n.GEL="gel",n.GHS="ghs",n.GIP="gip",n.GMD="gmd",n.GNF="gnf",n.GTQ="gtq",n.GYD="gyd",n.HKD="hkd",n.HNL="hnl",n.HRK="hrk",n.HTG="htg",n.HUF="huf",n.IDR="idr",n.ILS="ils",n.INR="inr",n.IQD="iqd",n.IRR="irr",n.ISK="isk",n.JMD="jmd",n.JOD="jod",n.JPY="jpy",n.KES="kes",n.KGS="kgs",n.KHR="khr",n.KMF="kmf",n.KPW="kpw",n.KRW="krw",n.KWD="kwd",n.KYD="kyd",n.KZT="kzt",n.LAK="lak",n.LBP="lbp",n.LKR="lkr",n.LRD="lrd",n.LSL="lsl",n.LTL="ltl",n.LVL="lvl",n.LYD="lyd",n.MAD="mad",n.MDL="mdl",n.MGA="mga",n.MKD="mkd",n.MMK="mmk",n.MNT="mnt",n.MOP="mop",n.MRO="mro",n.MUR="mur",n.MVR="mvr",n.MWK="mwk",n.MXN="mxn",n.MXV="mxv",n.MYR="myr",n.MZN="mzn",n.NAD="nad",n.NGN="ngn",n.NIO="nio",n.NOK="nok",n.NPR="npr",n.NZD="nzd",n.OMR="omr",n.PAB="pab",n.PEN="pen",n.PGK="pgk",n.PHP="php",n.PKR="pkr",n.PLN="pln",n.PYG="pyg",n.QAR="qar",n.RON="ron",n.RSD="rsd",n.RUB="rub",n.RWF="rwf",n.SAR="sar",n.SBD="sbd",n.SCR="scr",n.SDG="sdg",n.SEK="sek",n.SGD="sgd",n.SHP="shp",n.SLL="sll",n.SOS="sos",n.SRD="srd",n.SSP="ssp",n.STD="std",n.SVC="svc",n.SYP="syp",n.SZL="szl",n.THB="thb",n.TJS="tjs",n.TMT="tmt",n.TND="tnd",n.TOP="top",n.TRY="try",n.TTD="ttd",n.TWD="twd",n.TZS="tzs",n.UAH="uah",n.UGX="ugx",n.USD="usd",n.USN="usn",n.USS="uss",n.UYI="uyi",n.UYU="uyu",n.UZS="uzs",n.VEF="vef",n.VND="vnd",n.VUV="vuv",n.WST="wst",n.XAF="xaf",n.XAG="xag",n.XAU="xau",n.XBA="xba",n.XBB="xbb",n.XBC="xbc",n.XBD="xbd",n.XCD="xcd",n.XDR="xdr",n.XFU="xfu",n.XOF="xof",n.XPD="xpd",n.XPF="xpf",n.XPT="xpt",n.XSU="xsu",n.XTS="xts",n.XUA="xua",n.YER="yer",n.ZAR="zar",n.ZMW="zmw",n.ZWL="zwl"})(Y||(Y={}));var Uv={[Y.AED]:2,[Y.AFN]:2,[Y.ALL]:2,[Y.AMD]:2,[Y.ANG]:2,[Y.AOA]:2,[Y.ARS]:2,[Y.AUD]:2,[Y.AWG]:2,[Y.AZN]:2,[Y.BAM]:2,[Y.BBD]:2,[Y.BDT]:2,[Y.BGN]:2,[Y.BHD]:3,[Y.BIF]:0,[Y.BMD]:2,[Y.BND]:2,[Y.BOB]:2,[Y.BOV]:2,[Y.BRL]:2,[Y.BSD]:2,[Y.BTN]:2,[Y.BWP]:2,[Y.BYR]:0,[Y.BYN]:2,[Y.BZD]:2,[Y.CAD]:2,[Y.CDF]:2,[Y.CHE]:2,[Y.CHF]:2,[Y.CHW]:2,[Y.CLF]:0,[Y.CLP]:0,[Y.CNY]:2,[Y.COP]:2,[Y.COU]:2,[Y.CRC]:2,[Y.CUC]:2,[Y.CUP]:2,[Y.CVE]:2,[Y.CZK]:2,[Y.DJF]:0,[Y.DKK]:2,[Y.DOP]:2,[Y.DZD]:2,[Y.EGP]:2,[Y.ERN]:2,[Y.ETB]:2,[Y.EUR]:2,[Y.FJD]:2,[Y.FKP]:2,[Y.GBP]:2,[Y.GEL]:2,[Y.GHS]:2,[Y.GIP]:2,[Y.GMD]:2,[Y.GNF]:0,[Y.GTQ]:2,[Y.GYD]:2,[Y.HKD]:2,[Y.HNL]:2,[Y.HRK]:2,[Y.HTG]:2,[Y.HUF]:2,[Y.IDR]:2,[Y.ILS]:2,[Y.INR]:2,[Y.IQD]:3,[Y.IRR]:2,[Y.ISK]:0,[Y.JMD]:2,[Y.JOD]:3,[Y.JPY]:0,[Y.KES]:2,[Y.KGS]:2,[Y.KHR]:2,[Y.KMF]:0,[Y.KPW]:2,[Y.KRW]:0,[Y.KWD]:3,[Y.KYD]:2,[Y.KZT]:2,[Y.LAK]:2,[Y.LBP]:2,[Y.LKR]:2,[Y.LRD]:2,[Y.LSL]:2,[Y.LTL]:2,[Y.LVL]:2,[Y.LYD]:3,[Y.MAD]:2,[Y.MDL]:2,[Y.MGA]:2,[Y.MKD]:2,[Y.MMK]:2,[Y.MNT]:2,[Y.MOP]:2,[Y.MRO]:2,[Y.MUR]:2,[Y.MVR]:2,[Y.MWK]:2,[Y.MXN]:2,[Y.MXV]:2,[Y.MYR]:2,[Y.MZN]:2,[Y.NAD]:2,[Y.NGN]:2,[Y.NIO]:2,[Y.NOK]:2,[Y.NPR]:2,[Y.NZD]:2,[Y.OMR]:3,[Y.PAB]:2,[Y.PEN]:2,[Y.PGK]:2,[Y.PHP]:2,[Y.PKR]:2,[Y.PLN]:2,[Y.PYG]:0,[Y.QAR]:2,[Y.RON]:2,[Y.RSD]:2,[Y.RUB]:2,[Y.RWF]:0,[Y.SAR]:2,[Y.SBD]:2,[Y.SCR]:2,[Y.SDG]:2,[Y.SEK]:2,[Y.SGD]:2,[Y.SHP]:2,[Y.SLL]:2,[Y.SOS]:2,[Y.SRD]:2,[Y.SSP]:2,[Y.STD]:2,[Y.SVC]:2,[Y.SYP]:2,[Y.SZL]:2,[Y.THB]:2,[Y.TJS]:2,[Y.TMT]:2,[Y.TND]:3,[Y.TOP]:2,[Y.TRY]:2,[Y.TTD]:2,[Y.TWD]:2,[Y.TZS]:2,[Y.UAH]:2,[Y.UGX]:0,[Y.USD]:2,[Y.USN]:2,[Y.USS]:2,[Y.UYI]:0,[Y.UYU]:2,[Y.UZS]:2,[Y.VEF]:2,[Y.VND]:0,[Y.VUV]:0,[Y.WST]:2,[Y.XAF]:0,[Y.XAG]:0,[Y.XAU]:0,[Y.XBA]:0,[Y.XBB]:0,[Y.XBC]:0,[Y.XBD]:0,[Y.XCD]:2,[Y.XDR]:0,[Y.XFU]:0,[Y.XOF]:0,[Y.XPD]:0,[Y.XPF]:0,[Y.XPT]:0,[Y.XSU]:0,[Y.XTS]:0,[Y.XUA]:0,[Y.YER]:2,[Y.ZAR]:2,[Y.ZMW]:2,[Y.ZWL]:2};var ra={exports:{}};ra.exports;var ig;function rg(){return ig?ra.exports:(ig=1,(function(n,e){var t=200,i="Expected a function",r="__lodash_hash_undefined__",s=1,a=2,o=1/0,c=9007199254740991,l="[object Arguments]",u="[object Array]",h="[object Boolean]",f="[object Date]",m="[object Error]",x="[object Function]",v="[object GeneratorFunction]",g="[object Map]",_="[object Number]",T="[object Object]",I="[object Promise]",E="[object RegExp]",w="[object Set]",R="[object String]",C="[object Symbol]",y="[object WeakMap]",N="[object ArrayBuffer]",k="[object DataView]",W="[object Float32Array]",q="[object Float64Array]",Q="[object Int8Array]",G="[object Int16Array]",J="[object Int32Array]",oe="[object Uint8Array]",re="[object Uint8ClampedArray]",pe="[object Uint16Array]",ne="[object Uint32Array]",ue=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,de=/^\w*$/,He=/^\./,Ce=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,dt=/[\\^$.*+?()[\]{}|]/g,nt=/\\(\\)?/g,vt=/^\[object .+?Constructor\]$/,ie=/^(?:0|[1-9]\d*)$/,te={};te[W]=te[q]=te[Q]=te[G]=te[J]=te[oe]=te[re]=te[pe]=te[ne]=!0,te[l]=te[u]=te[N]=te[h]=te[k]=te[f]=te[m]=te[x]=te[g]=te[_]=te[T]=te[E]=te[w]=te[R]=te[y]=!1;var Ne=typeof eo=="object"&&eo&&eo.Object===Object&&eo,Je=typeof self=="object"&&self&&self.Object===Object&&self,Ee=Ne||Je||Function("return this")(),lt=e&&!e.nodeType&&e,It=lt&&!0&&n&&!n.nodeType&&n,ct=It&&It.exports===lt,St=ct&&Ne.process,Ct=(function(){try{return St&&St.binding("util")}catch{}})(),j=Ct&&Ct.isTypedArray;function _e(b,O){for(var ae=-1,Se=b?b.length:0;++ae<Se&&O(b[ae],ae,b)!==!1;);return b}function ze(b,O){for(var ae=-1,Se=b?b.length:0;++ae<Se;)if(O(b[ae],ae,b))return!0;return!1}function Ke(b){return function(O){return O?.[b]}}function Qe(b,O){for(var ae=-1,Se=Array(b);++ae<b;)Se[ae]=O(ae);return Se}function $e(b){return function(O){return b(O)}}function B(b,O){return b?.[O]}function xe(b){var O=!1;if(b!=null&&typeof b.toString!="function")try{O=!!(b+"")}catch{}return O}function me(b){var O=-1,ae=Array(b.size);return b.forEach(function(Se,ht){ae[++O]=[ht,Se]}),ae}function p(b,O){return function(ae){return b(O(ae))}}function d(b){var O=-1,ae=Array(b.size);return b.forEach(function(Se){ae[++O]=Se}),ae}var S=Array.prototype,A=Function.prototype,P=Object.prototype,D=Ee["__core-js_shared__"],X=(function(){var b=/[^.]+$/.exec(D&&D.keys&&D.keys.IE_PROTO||"");return b?"Symbol(src)_1."+b:""})(),L=A.toString,F=P.hasOwnProperty,se=P.toString,ge=RegExp("^"+L.call(F).replace(dt,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),le=Ee.Symbol,he=Ee.Uint8Array,Pe=p(Object.getPrototypeOf,Object),Oe=Object.create,at=P.propertyIsEnumerable,H=S.splice,Te=p(Object.keys,Object),ce=Ws(Ee,"DataView"),Me=Ws(Ee,"Map"),we=Ws(Ee,"Promise"),fe=Ws(Ee,"Set"),qe=Ws(Ee,"WeakMap"),Be=Ws(Object,"create"),zt=$r(ce),Lt=$r(Me),Yn=$r(we),si=$r(fe),th=$r(qe),ks=le?le.prototype:void 0,zs=ks?ks.valueOf:void 0,Vs=ks?ks.toString:void 0;function Ji(b){var O=-1,ae=b?b.length:0;for(this.clear();++O<ae;){var Se=b[O];this.set(Se[0],Se[1])}}function xl(){this.__data__=Be?Be(null):{}}function vl(b){return this.has(b)&&delete this.__data__[b]}function Qi(b){var O=this.__data__;if(Be){var ae=O[b];return ae===r?void 0:ae}return F.call(O,b)?O[b]:void 0}function Ja(b){var O=this.__data__;return Be?O[b]!==void 0:F.call(O,b)}function yl(b,O){var ae=this.__data__;return ae[b]=Be&&O===void 0?r:O,this}Ji.prototype.clear=xl,Ji.prototype.delete=vl,Ji.prototype.get=Qi,Ji.prototype.has=Ja,Ji.prototype.set=yl;function ai(b){var O=-1,ae=b?b.length:0;for(this.clear();++O<ae;){var Se=b[O];this.set(Se[0],Se[1])}}function Gs(){this.__data__=[]}function Sl(b){var O=this.__data__,ae=mt(O,b);if(ae<0)return!1;var Se=O.length-1;return ae==Se?O.pop():H.call(O,ae,1),!0}function Hs(b){var O=this.__data__,ae=mt(O,b);return ae<0?void 0:O[ae][1]}function bl(b){return mt(this.__data__,b)>-1}function Ml(b,O){var ae=this.__data__,Se=mt(ae,b);return Se<0?ae.push([b,O]):ae[Se][1]=O,this}ai.prototype.clear=Gs,ai.prototype.delete=Sl,ai.prototype.get=Hs,ai.prototype.has=bl,ai.prototype.set=Ml;function _i(b){var O=-1,ae=b?b.length:0;for(this.clear();++O<ae;){var Se=b[O];this.set(Se[0],Se[1])}}function nh(){this.__data__={hash:new Ji,map:new(Me||ai),string:new Ji}}function ih(b){return Tl(this,b).delete(b)}function rh(b){return Tl(this,b).get(b)}function El(b){return Tl(this,b).has(b)}function M(b,O){return Tl(this,b).set(b,O),this}_i.prototype.clear=nh,_i.prototype.delete=ih,_i.prototype.get=rh,_i.prototype.has=El,_i.prototype.set=M;function z(b){var O=-1,ae=b?b.length:0;for(this.__data__=new _i;++O<ae;)this.add(b[O])}function ee(b){return this.__data__.set(b,r),this}function $(b){return this.__data__.has(b)}z.prototype.add=z.prototype.push=ee,z.prototype.has=$;function K(b){this.__data__=new ai(b)}function Re(){this.__data__=new ai}function Fe(b){return this.__data__.delete(b)}function Ae(b){return this.__data__.get(b)}function Ve(b){return this.__data__.has(b)}function Xe(b,O){var ae=this.__data__;if(ae instanceof ai){var Se=ae.__data__;if(!Me||Se.length<t-1)return Se.push([b,O]),this;ae=this.__data__=new _i(Se)}return ae.set(b,O),this}K.prototype.clear=Re,K.prototype.delete=Fe,K.prototype.get=Ae,K.prototype.has=Ve,K.prototype.set=Xe;function pt(b,O){var ae=er(b)||dp(b)?Qe(b.length,String):[],Se=ae.length,ht=!!Se;for(var Ye in b)F.call(b,Ye)&&!(ht&&(Ye=="length"||lp(Ye,Se)))&&ae.push(Ye);return ae}function mt(b,O){for(var ae=b.length;ae--;)if(hp(b[ae][0],O))return ae;return-1}function Ge(b){return Xs(b)?Oe(b):{}}var Dt=Er();function en(b,O){return b&&Dt(b,O,Il)}function Vt(b,O){O=Al(O,b)?[O]:xi(O);for(var ae=0,Se=O.length;b!=null&&ae<Se;)b=b[wl(O[ae++])];return ae&&ae==Se?b:void 0}function Ft(b){return se.call(b)}function pn(b,O){return b!=null&&O in Object(b)}function De(b,O,ae,Se,ht){return b===O?!0:b==null||O==null||!Xs(b)&&!Rl(O)?b!==b&&O!==O:yn(b,O,De,ae,Se,ht)}function yn(b,O,ae,Se,ht,Ye){var Tt=er(b),sn=er(O),tn=u,En=u;Tt||(tn=Tr(b),tn=tn==l?T:tn),sn||(En=Tr(O),En=En==l?T:En);var Fn=tn==T&&!xe(b),Bn=En==T&&!xe(O),Cn=tn==En;if(Cn&&!Fn)return Ye||(Ye=new K),Tt||pp(b)?Qa(b,O,ae,Se,ht,Ye):T0(b,O,tn,ae,Se,ht,Ye);if(!(ht&a)){var li=Fn&&F.call(b,"__wrapped__"),ci=Bn&&F.call(O,"__wrapped__");if(li||ci){var Ar=li?b.value():b,tr=ci?O.value():O;return Ye||(Ye=new K),ae(Ar,tr,Se,ht,Ye)}}return Cn?(Ye||(Ye=new K),A0(b,O,ae,Se,ht,Ye)):!1}function Pt(b,O,ae,Se){var ht=ae.length,Ye=ht;if(b==null)return!Ye;for(b=Object(b);ht--;){var Tt=ae[ht];if(Tt[2]?Tt[1]!==b[Tt[0]]:!(Tt[0]in b))return!1}for(;++ht<Ye;){Tt=ae[ht];var sn=Tt[0],tn=b[sn],En=Tt[1];if(Tt[2]){if(tn===void 0&&!(sn in b))return!1}else{var Fn=new K,Bn;if(!(Bn===void 0?De(En,tn,Se,s|a,Fn):Bn))return!1}}return!0}function On(b){if(!Xs(b)||C0(b))return!1;var O=ah(b)||xe(b)?ge:vt;return O.test($r(b))}function oi(b){return Rl(b)&&oh(b.length)&&!!te[se.call(b)]}function Li(b){return typeof b=="function"?b:b==null?B0:typeof b=="object"?er(b)?$t(b[0],b[1]):Ut(b):k0(b)}function Mr(b){if(!P0(b))return Te(b);var O=[];for(var ae in Object(b))F.call(b,ae)&&ae!="constructor"&&O.push(ae);return O}function Ut(b){var O=w0(b);return O.length==1&&O[0][2]?up(O[0][0],O[0][1]):function(ae){return ae===b||Pt(ae,b,O)}}function $t(b,O){return Al(b)&&cp(O)?up(wl(b),O):function(ae){var Se=U0(ae,b);return Se===void 0&&Se===O?O0(ae,b):De(O,Se,void 0,s|a)}}function Di(b){return function(O){return Vt(O,b)}}function Gt(b){if(typeof b=="string")return b;if(lh(b))return Vs?Vs.call(b):"";var O=b+"";return O=="0"&&1/b==-o?"-0":O}function xi(b){return er(b)?b:N0(b)}function Er(b){return function(O,ae,Se){for(var ht=-1,Ye=Object(O),Tt=Se(O),sn=Tt.length;sn--;){var tn=Tt[++ht];if(ae(Ye[tn],tn,Ye)===!1)break}return O}}function Qa(b,O,ae,Se,ht,Ye){var Tt=ht&a,sn=b.length,tn=O.length;if(sn!=tn&&!(Tt&&tn>sn))return!1;var En=Ye.get(b);if(En&&Ye.get(O))return En==O;var Fn=-1,Bn=!0,Cn=ht&s?new z:void 0;for(Ye.set(b,O),Ye.set(O,b);++Fn<sn;){var li=b[Fn],ci=O[Fn];if(Se)var Ar=Tt?Se(ci,li,Fn,O,b,Ye):Se(li,ci,Fn,b,O,Ye);if(Ar!==void 0){if(Ar)continue;Bn=!1;break}if(Cn){if(!ze(O,function(tr,Jr){if(!Cn.has(Jr)&&(li===tr||ae(li,tr,Se,ht,Ye)))return Cn.add(Jr)})){Bn=!1;break}}else if(!(li===ci||ae(li,ci,Se,ht,Ye))){Bn=!1;break}}return Ye.delete(b),Ye.delete(O),Bn}function T0(b,O,ae,Se,ht,Ye,Tt){switch(ae){case k:if(b.byteLength!=O.byteLength||b.byteOffset!=O.byteOffset)return!1;b=b.buffer,O=O.buffer;case N:return!(b.byteLength!=O.byteLength||!Se(new he(b),new he(O)));case h:case f:case _:return hp(+b,+O);case m:return b.name==O.name&&b.message==O.message;case E:case R:return b==O+"";case g:var sn=me;case w:var tn=Ye&a;if(sn||(sn=d),b.size!=O.size&&!tn)return!1;var En=Tt.get(b);if(En)return En==O;Ye|=s,Tt.set(b,O);var Fn=Qa(sn(b),sn(O),Se,ht,Ye,Tt);return Tt.delete(b),Fn;case C:if(zs)return zs.call(b)==zs.call(O)}return!1}function A0(b,O,ae,Se,ht,Ye){var Tt=ht&a,sn=Il(b),tn=sn.length,En=Il(O),Fn=En.length;if(tn!=Fn&&!Tt)return!1;for(var Bn=tn;Bn--;){var Cn=sn[Bn];if(!(Tt?Cn in O:F.call(O,Cn)))return!1}var li=Ye.get(b);if(li&&Ye.get(O))return li==O;var ci=!0;Ye.set(b,O),Ye.set(O,b);for(var Ar=Tt;++Bn<tn;){Cn=sn[Bn];var tr=b[Cn],Jr=O[Cn];if(Se)var mp=Tt?Se(Jr,tr,Cn,O,b,Ye):Se(tr,Jr,Cn,b,O,Ye);if(!(mp===void 0?tr===Jr||ae(tr,Jr,Se,ht,Ye):mp)){ci=!1;break}Ar||(Ar=Cn=="constructor")}if(ci&&!Ar){var Cl=b.constructor,Pl=O.constructor;Cl!=Pl&&"constructor"in b&&"constructor"in O&&!(typeof Cl=="function"&&Cl instanceof Cl&&typeof Pl=="function"&&Pl instanceof Pl)&&(ci=!1)}return Ye.delete(b),Ye.delete(O),ci}function Tl(b,O){var ae=b.__data__;return I0(O)?ae[typeof O=="string"?"string":"hash"]:ae.map}function w0(b){for(var O=Il(b),ae=O.length;ae--;){var Se=O[ae],ht=b[Se];O[ae]=[Se,ht,cp(ht)]}return O}function Ws(b,O){var ae=B(b,O);return On(ae)?ae:void 0}var Tr=Ft;(ce&&Tr(new ce(new ArrayBuffer(1)))!=k||Me&&Tr(new Me)!=g||we&&Tr(we.resolve())!=I||fe&&Tr(new fe)!=w||qe&&Tr(new qe)!=y)&&(Tr=function(b){var O=se.call(b),ae=O==T?b.constructor:void 0,Se=ae?$r(ae):void 0;if(Se)switch(Se){case zt:return k;case Lt:return g;case Yn:return I;case si:return w;case th:return y}return O});function R0(b,O,ae){O=Al(O,b)?[O]:xi(O);for(var Se,ht=-1,Tt=O.length;++ht<Tt;){var Ye=wl(O[ht]);if(!(Se=b!=null&&ae(b,Ye)))break;b=b[Ye]}if(Se)return Se;var Tt=b?b.length:0;return!!Tt&&oh(Tt)&&lp(Ye,Tt)&&(er(b)||dp(b))}function lp(b,O){return O=O??c,!!O&&(typeof b=="number"||ie.test(b))&&b>-1&&b%1==0&&b<O}function Al(b,O){if(er(b))return!1;var ae=typeof b;return ae=="number"||ae=="symbol"||ae=="boolean"||b==null||lh(b)?!0:de.test(b)||!ue.test(b)||O!=null&&b in Object(O)}function I0(b){var O=typeof b;return O=="string"||O=="number"||O=="symbol"||O=="boolean"?b!=="__proto__":b===null}function C0(b){return!!X&&X in b}function P0(b){var O=b&&b.constructor,ae=typeof O=="function"&&O.prototype||P;return b===ae}function cp(b){return b===b&&!Xs(b)}function up(b,O){return function(ae){return ae==null?!1:ae[b]===O&&(O!==void 0||b in Object(ae))}}var N0=sh(function(b){b=D0(b);var O=[];return He.test(b)&&O.push(""),b.replace(Ce,function(ae,Se,ht,Ye){O.push(ht?Ye.replace(nt,"$1"):Se||ae)}),O});function wl(b){if(typeof b=="string"||lh(b))return b;var O=b+"";return O=="0"&&1/b==-o?"-0":O}function $r(b){if(b!=null){try{return L.call(b)}catch{}try{return b+""}catch{}}return""}function sh(b,O){if(typeof b!="function"||O&&typeof O!="function")throw new TypeError(i);var ae=function(){var Se=arguments,ht=O?O.apply(this,Se):Se[0],Ye=ae.cache;if(Ye.has(ht))return Ye.get(ht);var Tt=b.apply(this,Se);return ae.cache=Ye.set(ht,Tt),Tt};return ae.cache=new(sh.Cache||_i),ae}sh.Cache=_i;function hp(b,O){return b===O||b!==b&&O!==O}function dp(b){return L0(b)&&F.call(b,"callee")&&(!at.call(b,"callee")||se.call(b)==l)}var er=Array.isArray;function fp(b){return b!=null&&oh(b.length)&&!ah(b)}function L0(b){return Rl(b)&&fp(b)}function ah(b){var O=Xs(b)?se.call(b):"";return O==x||O==v}function oh(b){return typeof b=="number"&&b>-1&&b%1==0&&b<=c}function Xs(b){var O=typeof b;return!!b&&(O=="object"||O=="function")}function Rl(b){return!!b&&typeof b=="object"}function lh(b){return typeof b=="symbol"||Rl(b)&&se.call(b)==C}var pp=j?$e(j):oi;function D0(b){return b==null?"":Gt(b)}function U0(b,O,ae){var Se=b==null?void 0:Vt(b,O);return Se===void 0?ae:Se}function O0(b,O){return b!=null&&R0(b,O,pn)}function Il(b){return fp(b)?pt(b):Mr(b)}function F0(b,O,ae){var Se=er(b)||pp(b);if(O=Li(O),ae==null)if(Se||Xs(b)){var ht=b.constructor;Se?ae=er(b)?new ht:[]:ae=ah(ht)?Ge(Pe(b)):{}}else ae={};return(Se?_e:en)(b,function(Ye,Tt,sn){return O(ae,Ye,Tt,sn)}),ae}function B0(b){return b}function k0(b){return Al(b)?Ke(wl(b)):Di(b)}n.exports=F0})(ra,ra.exports),ra.exports)}var JR=rg();var{Commands:SI}=Ql;function sg(n){let e=new Audio(n.href);e.loop=!0,e.volume=.25,e.preload="auto";let t=document.createElement("button");t.type="button",t.style.cssText="position:fixed;right:16px;bottom:16px;padding:8px 12px;border:1px solid #b49760;border-radius:4px;background:#201b18dd;color:#e8d5ad;cursor:pointer;font:12px system-ui";let i=!1,r=!1;try{i=localStorage.getItem("anterose-music-muted")==="1"}catch{}function s(){t.textContent=i?"\u266B Musique coup\xE9e":e.paused?"\u266B Activer la musique":"\u266B Musique",t.setAttribute("aria-label",i||e.paused?"Activer la musique":"Couper la musique"),t.setAttribute("aria-pressed",String(!i&&!e.paused))}async function a(){if(!(i||r||!e.paused)){r=!0;try{await e.play()}catch{}finally{r=!1,s()}}}function o(c){c.target!==t&&(c.type==="keydown"&&c.repeat||a())}return t.addEventListener("click",()=>{i=!e.paused&&!i,i?e.pause():a();try{localStorage.setItem("anterose-music-muted",i?"1":"0")}catch{}s()}),e.addEventListener("playing",s),e.addEventListener("pause",s),e.addEventListener("error",()=>{t.textContent="\u266B Musique indisponible",t.title="Le fichier audio n\u2019a pas pu \xEAtre charg\xE9."}),document.body.append(t),document.addEventListener("pointerdown",o),document.addEventListener("keydown",o),s(),a(),{dispose(){e.pause(),document.removeEventListener("pointerdown",o),document.removeEventListener("keydown",o),e.removeAttribute("src"),e.load(),t.remove()}}}var Xg=0,Ud=1,qg=2;var el=1,Yg=2,ka=3,Yi=0,Dn=1,Un=2,Zi=0,za=1,Od=2,Fd=3,Bd=4,Zg=5;var Ns=100,Kg=101,jg=102,$g=103,Jg=104,Qg=200,e_=201,t_=202,n_=203,kd=204,zd=205,i_=206,r_=207,s_=208,a_=209,o_=210,l_=211,c_=212,u_=213,h_=214,Cc=0,Pc=1,Nc=2,ya=3,Lc=4,Dc=5,Uc=6,Oc=7,Vd=0,d_=1,f_=2,Ii=0,Gd=1,Hd=2,Wd=3,Xd=4,qd=5,Yd=6,Zd=7,bd="attached",p_="detached",Kd=300,qr=301,Ls=302,tu=303,nu=304,tl=306,Gr=1e3,pi=1001,Sa=1002,Kt=1003,iu=1004;var Ds=1005;var Jt=1006,Va=1007;var Ci=1008;var qn=1009,jd=1010,$d=1011,Ga=1012,ru=1013,Pi=1014,ii=1015,Ni=1016,su=1017,au=1018,Ha=1020,Jd=35902,Qd=35899,ef=1021,tf=1022,ri=1023,Gi=1026,Yr=1027,ou=1028,lu=1029,Zr=1030,cu=1031;var uu=1033,nl=33776,il=33777,rl=33778,sl=33779,hu=35840,du=35841,fu=35842,pu=35843,mu=36196,gu=37492,_u=37496,xu=37488,vu=37489,al=37490,yu=37491,Su=37808,bu=37809,Mu=37810,Eu=37811,Tu=37812,Au=37813,wu=37814,Ru=37815,Iu=37816,Cu=37817,Pu=37818,Nu=37819,Lu=37820,Du=37821,Uu=36492,Ou=36494,Fu=36495,Bu=36283,ku=36284,ol=36285,zu=36286;var Ts=2300,As=2301,wc=2302,Md=2303,Ed=2400,Td=2401,Ad=2402,m_=2500;var nf=0,ll=1,Wa=2,g_=3200;var Vu=0,__=1,br="",nn="srgb",Ln="srgb-linear",Po="linear",Ot="srgb";var Rc=7680;var x_=519,v_=512,y_=513,S_=514,Gu=515,b_=516,M_=517,Hu=518,E_=519,rf=35044;var sf="300 es",Ai=2e3,ba=2001;function Ov(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Fv(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function Ma(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function T_(){let n=Ma("canvas");return n.style.display="block",n}var ag={},Ea=null;function No(...n){let e="THREE."+n.shift();Ea?Ea("log",e,...n):console.log(e,...n)}function A_(n){let e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Ze(...n){n=A_(n);let e="THREE."+n.shift();if(Ea)Ea("warn",e,...n);else{let t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function rt(...n){n=A_(n);let e="THREE."+n.shift();if(Ea)Ea("error",e,...n);else{let t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Es(...n){let e=n.join(" ");e in ag||(ag[e]=!0,Ze(...n))}function w_(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}var R_={[Cc]:Pc,[Nc]:Uc,[Lc]:Oc,[ya]:Dc,[Pc]:Cc,[Uc]:Nc,[Oc]:Lc,[Dc]:ya},Hi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let r=i[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}},wn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],og=1234567,Io=Math.PI/180,ws=180/Math.PI;function Ri(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(wn[n&255]+wn[n>>8&255]+wn[n>>16&255]+wn[n>>24&255]+"-"+wn[e&255]+wn[e>>8&255]+"-"+wn[e>>16&15|64]+wn[e>>24&255]+"-"+wn[t&63|128]+wn[t>>8&255]+"-"+wn[t>>16&255]+wn[t>>24&255]+wn[i&255]+wn[i>>8&255]+wn[i>>16&255]+wn[i>>24&255]).toLowerCase()}function wt(n,e,t){return Math.max(e,Math.min(t,n))}function af(n,e){return(n%e+e)%e}function Bv(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function kv(n,e,t){return n!==e?(t-n)/(e-n):0}function Co(n,e,t){return(1-t)*n+t*e}function zv(n,e,t,i){return Co(n,e,1-Math.exp(-t*i))}function Vv(n,e=1){return e-Math.abs(af(n,e*2)-e)}function Gv(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function Hv(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function Wv(n,e){return n+Math.floor(Math.random()*(e-n+1))}function Xv(n,e){return n+Math.random()*(e-n)}function qv(n){return n*(.5-Math.random())}function Yv(n){n!==void 0&&(og=n);let e=og+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Zv(n){return n*Io}function Kv(n){return n*ws}function jv(n){return n>0&&Number.isInteger(n)&&2**Math.round(Math.log2(n))===n}function $v(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Jv(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Qv(n,e,t,i,r){let s=Math.cos,a=Math.sin,o=s(t/2),c=a(t/2),l=s((e+i)/2),u=a((e+i)/2),h=s((e-i)/2),f=a((e-i)/2),m=s((i-e)/2),x=a((i-e)/2);switch(r){case"XYX":n.set(o*u,c*h,c*f,o*l);break;case"YZY":n.set(c*f,o*u,c*h,o*l);break;case"ZXZ":n.set(c*h,c*f,o*u,o*l);break;case"XZX":n.set(o*u,c*x,c*m,o*l);break;case"YXY":n.set(c*m,o*u,c*x,o*l);break;case"ZYZ":n.set(c*x,c*m,o*u,o*l);break;default:Ze("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Ti(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Bt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Xa={DEG2RAD:Io,RAD2DEG:ws,generateUUID:Ri,clamp:wt,euclideanModulo:af,mapLinear:Bv,inverseLerp:kv,lerp:Co,damp:zv,pingpong:Vv,smoothstep:Gv,smootherstep:Hv,randInt:Wv,randFloat:Xv,randFloatSpread:qv,seededRandom:Yv,degToRad:Zv,radToDeg:Kv,isPowerOfTwo:jv,ceilPowerOfTwo:$v,floorPowerOfTwo:Jv,setQuaternionFromProperEuler:Qv,normalize:Bt,denormalize:Ti},xt=class n{static{n.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=wt(this.x,e.x,t.x),this.y=wt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=wt(this.x,e,t),this.y=wt(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(wt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(wt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},ei=class{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let c=i[r+0],l=i[r+1],u=i[r+2],h=i[r+3],f=s[a+0],m=s[a+1],x=s[a+2],v=s[a+3];if(h!==v||c!==f||l!==m||u!==x){let g=c*f+l*m+u*x+h*v;g<0&&(f=-f,m=-m,x=-x,v=-v,g=-g);let _=1-o;if(g<.9995){let T=Math.acos(g),I=Math.sin(T);_=Math.sin(_*T)/I,o=Math.sin(o*T)/I,c=c*_+f*o,l=l*_+m*o,u=u*_+x*o,h=h*_+v*o}else{c=c*_+f*o,l=l*_+m*o,u=u*_+x*o,h=h*_+v*o;let T=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=T,l*=T,u*=T,h*=T}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,r,s,a){let o=i[r],c=i[r+1],l=i[r+2],u=i[r+3],h=s[a],f=s[a+1],m=s[a+2],x=s[a+3];return e[t]=o*x+u*h+c*m-l*f,e[t+1]=c*x+u*f+l*h-o*m,e[t+2]=l*x+u*m+o*f-c*h,e[t+3]=u*x-o*h-c*f-l*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(i/2),u=o(r/2),h=o(s/2),f=c(i/2),m=c(r/2),x=c(s/2);switch(a){case"XYZ":this._x=f*u*h+l*m*x,this._y=l*m*h-f*u*x,this._z=l*u*x+f*m*h,this._w=l*u*h-f*m*x;break;case"YXZ":this._x=f*u*h+l*m*x,this._y=l*m*h-f*u*x,this._z=l*u*x-f*m*h,this._w=l*u*h+f*m*x;break;case"ZXY":this._x=f*u*h-l*m*x,this._y=l*m*h+f*u*x,this._z=l*u*x+f*m*h,this._w=l*u*h-f*m*x;break;case"ZYX":this._x=f*u*h-l*m*x,this._y=l*m*h+f*u*x,this._z=l*u*x-f*m*h,this._w=l*u*h+f*m*x;break;case"YZX":this._x=f*u*h+l*m*x,this._y=l*m*h+f*u*x,this._z=l*u*x-f*m*h,this._w=l*u*h-f*m*x;break;case"XZY":this._x=f*u*h-l*m*x,this._y=l*m*h-f*u*x,this._z=l*u*x+f*m*h,this._w=l*u*h+f*m*x;break;default:Ze("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],u=t[6],h=t[10],f=i+o+h;if(f>0){let m=.5/Math.sqrt(f+1);this._w=.25/m,this._x=(u-c)*m,this._y=(s-l)*m,this._z=(a-r)*m}else if(i>o&&i>h){let m=2*Math.sqrt(1+i-o-h);this._w=(u-c)/m,this._x=.25*m,this._y=(r+a)/m,this._z=(s+l)/m}else if(o>h){let m=2*Math.sqrt(1+o-i-h);this._w=(s-l)/m,this._x=(r+a)/m,this._y=.25*m,this._z=(c+u)/m}else{let m=2*Math.sqrt(1+h-i-o);this._w=(a-r)/m,this._x=(s+l)/m,this._y=(c+u)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(wt(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=i*u+a*o+r*l-s*c,this._y=r*u+a*c+s*o-i*l,this._z=s*u+a*l+i*c-r*o,this._w=a*u-i*o-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let c=1-t;if(o<.9995){let l=Math.acos(o),u=Math.sin(l);c=Math.sin(c*l)/u,t=Math.sin(t*l)/u,this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Z=class n{static{n.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(lg.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(lg.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){let t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*r-o*i),u=2*(o*t-s*r),h=2*(s*i-a*t);return this.x=t+c*l+a*h-o*u,this.y=i+c*u+o*l-s*h,this.z=r+c*h+s*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=wt(this.x,e.x,t.x),this.y=wt(this.y,e.y,t.y),this.z=wt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=wt(this.x,e,t),this.y=wt(this.y,e,t),this.z=wt(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(wt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=r*c-s*o,this.y=s*a-i*c,this.z=i*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Jh.copy(this).projectOnVector(e),this.sub(Jh)}reflect(e){return this.sub(Jh.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(wt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Jh=new Z,lg=new ei,ut=class n{static{n.prototype.isMatrix3=!0}constructor(e,t,i,r,s,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,c,l)}set(e,t,i,r,s,a,o,c,l){let u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=c,u[6]=i,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],u=i[4],h=i[7],f=i[2],m=i[5],x=i[8],v=r[0],g=r[3],_=r[6],T=r[1],I=r[4],E=r[7],w=r[2],R=r[5],C=r[8];return s[0]=a*v+o*T+c*w,s[3]=a*g+o*I+c*R,s[6]=a*_+o*E+c*C,s[1]=l*v+u*T+h*w,s[4]=l*g+u*I+h*R,s[7]=l*_+u*E+h*C,s[2]=f*v+m*T+x*w,s[5]=f*g+m*I+x*R,s[8]=f*_+m*E+x*C,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-i*s*u+i*o*c+r*s*l-r*a*c}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],h=u*a-o*l,f=o*c-u*s,m=l*s-a*c,x=t*h+i*f+r*m;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/x;return e[0]=h*v,e[1]=(r*l-u*i)*v,e[2]=(o*i-r*a)*v,e[3]=f*v,e[4]=(u*t-r*c)*v,e[5]=(r*s-o*t)*v,e[6]=m*v,e[7]=(i*c-l*t)*v,e[8]=(a*t-i*s)*v,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){let c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*a+l*o)+a+e,-r*l,r*c,-r*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return Es("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Qh.makeScale(e,t)),this}rotate(e){return Es("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Qh.makeRotation(-e)),this}translate(e,t){return Es("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Qh.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Qh=new ut,cg=new ut().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ug=new ut().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function ey(){let n={enabled:!0,workingColorSpace:Ln,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===Ot&&(r.r=pr(r.r),r.g=pr(r.g),r.b=pr(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Ot&&(r.r=va(r.r),r.g=va(r.g),r.b=va(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===br?Po:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Es("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Es("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Ln]:{primaries:e,whitePoint:i,transfer:Po,toXYZ:cg,fromXYZ:ug,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:nn},outputColorSpaceConfig:{drawingBufferColorSpace:nn}},[nn]:{primaries:e,whitePoint:i,transfer:Ot,toXYZ:cg,fromXYZ:ug,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:nn}}}),n}var Et=ey();function pr(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function va(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var sa,Fc=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{sa===void 0&&(sa=Ma("canvas")),sa.width=e.width,sa.height=e.height;let r=sa.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=sa}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Ma("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=pr(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(pr(t[i]/255)*255):t[i]=pr(t[i]);return{data:t,width:e.width,height:e.height}}else return Ze("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},ty=0,Ta=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:ty++}),this.uuid=Ri(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(ed(r[a].image)):s.push(ed(r[a]))}else s=ed(r);i.url=s}return t||(e.images[this.uuid]=i),i}};function ed(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Fc.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ze("Texture: Unable to serialize Texture."),{})}var ny=0,td=new Z,vn=class n extends Hi{constructor(e=n.DEFAULT_IMAGE,t=n.DEFAULT_MAPPING,i=pi,r=pi,s=Jt,a=Ci,o=ri,c=qn,l=n.DEFAULT_ANISOTROPY,u=br){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ny++}),this.uuid=Ri(),this.name="",this.source=new Ta(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new xt(0,0),this.repeat=new xt(1,1),this.center=new xt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ut,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(td).x}get height(){return this.source.getSize(td).y}get depth(){return this.source.getSize(td).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let i=e[t];if(i===void 0){Ze(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){Ze(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Kd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Gr:e.x=e.x-Math.floor(e.x);break;case pi:e.x=e.x<0?0:1;break;case Sa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Gr:e.y=e.y-Math.floor(e.y);break;case pi:e.y=e.y<0?0:1;break;case Sa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};vn.DEFAULT_IMAGE=null;vn.DEFAULT_MAPPING=Kd;vn.DEFAULT_ANISOTROPY=1;var kt=class n{static{n.prototype.isVector4=!0}constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s,c=e.elements,l=c[0],u=c[4],h=c[8],f=c[1],m=c[5],x=c[9],v=c[2],g=c[6],_=c[10];if(Math.abs(u-f)<.01&&Math.abs(h-v)<.01&&Math.abs(x-g)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+v)<.1&&Math.abs(x+g)<.1&&Math.abs(l+m+_-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let I=(l+1)/2,E=(m+1)/2,w=(_+1)/2,R=(u+f)/4,C=(h+v)/4,y=(x+g)/4;return I>E&&I>w?I<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(I),r=R/i,s=C/i):E>w?E<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(E),i=R/r,s=y/r):w<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(w),i=C/s,r=y/s),this.set(i,r,s,t),this}let T=Math.sqrt((g-x)*(g-x)+(h-v)*(h-v)+(f-u)*(f-u));return Math.abs(T)<.001&&(T=1),this.x=(g-x)/T,this.y=(h-v)/T,this.z=(f-u)/T,this.w=Math.acos((l+m+_-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=wt(this.x,e.x,t.x),this.y=wt(this.y,e.y,t.y),this.z=wt(this.z,e.z,t.z),this.w=wt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=wt(this.x,e,t),this.y=wt(this.y,e,t),this.z=wt(this.z,e,t),this.w=wt(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(wt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Bc=class extends Hi{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Jt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new kt(0,0,e,t),this.scissorTest=!1,this.viewport=new kt(0,0,e,t),this.textures=[];let r={width:e,height:t,depth:i.depth},s=new vn(r),a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Jt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new Ta(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},zn=class extends Bc{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},Lo=class extends vn{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Kt,this.minFilter=Kt,this.wrapR=pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var kc=class extends vn{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Kt,this.minFilter=Kt,this.wrapR=pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var ft=class n{static{n.prototype.isMatrix4=!0}constructor(e,t,i,r,s,a,o,c,l,u,h,f,m,x,v,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,c,l,u,h,f,m,x,v,g)}set(e,t,i,r,s,a,o,c,l,u,h,f,m,x,v,g){let _=this.elements;return _[0]=e,_[4]=t,_[8]=i,_[12]=r,_[1]=s,_[5]=a,_[9]=o,_[13]=c,_[2]=l,_[6]=u,_[10]=h,_[14]=f,_[3]=m,_[7]=x,_[11]=v,_[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,i=e.elements,r=1/aa.setFromMatrixColumn(e,0).length(),s=1/aa.setFromMatrixColumn(e,1).length(),a=1/aa.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){let f=a*u,m=a*h,x=o*u,v=o*h;t[0]=c*u,t[4]=-c*h,t[8]=l,t[1]=m+x*l,t[5]=f-v*l,t[9]=-o*c,t[2]=v-f*l,t[6]=x+m*l,t[10]=a*c}else if(e.order==="YXZ"){let f=c*u,m=c*h,x=l*u,v=l*h;t[0]=f+v*o,t[4]=x*o-m,t[8]=a*l,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=m*o-x,t[6]=v+f*o,t[10]=a*c}else if(e.order==="ZXY"){let f=c*u,m=c*h,x=l*u,v=l*h;t[0]=f-v*o,t[4]=-a*h,t[8]=x+m*o,t[1]=m+x*o,t[5]=a*u,t[9]=v-f*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let f=a*u,m=a*h,x=o*u,v=o*h;t[0]=c*u,t[4]=x*l-m,t[8]=f*l+v,t[1]=c*h,t[5]=v*l+f,t[9]=m*l-x,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let f=a*c,m=a*l,x=o*c,v=o*l;t[0]=c*u,t[4]=v-f*h,t[8]=x*h+m,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=m*h+x,t[10]=f-v*h}else if(e.order==="XZY"){let f=a*c,m=a*l,x=o*c,v=o*l;t[0]=c*u,t[4]=-h,t[8]=l*u,t[1]=f*h+v,t[5]=a*u,t[9]=m*h-x,t[2]=x*h-m,t[6]=o*u,t[10]=v*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(iy,e,ry)}lookAt(e,t,i){let r=this.elements;return Jn.subVectors(e,t),Jn.lengthSq()===0&&(Jn.z=1),Jn.normalize(),Ur.crossVectors(i,Jn),Ur.lengthSq()===0&&(Math.abs(i.z)===1?Jn.x+=1e-4:Jn.z+=1e-4,Jn.normalize(),Ur.crossVectors(i,Jn)),Ur.normalize(),nc.crossVectors(Jn,Ur),r[0]=Ur.x,r[4]=nc.x,r[8]=Jn.x,r[1]=Ur.y,r[5]=nc.y,r[9]=Jn.y,r[2]=Ur.z,r[6]=nc.z,r[10]=Jn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],u=i[1],h=i[5],f=i[9],m=i[13],x=i[2],v=i[6],g=i[10],_=i[14],T=i[3],I=i[7],E=i[11],w=i[15],R=r[0],C=r[4],y=r[8],N=r[12],k=r[1],W=r[5],q=r[9],Q=r[13],G=r[2],J=r[6],oe=r[10],re=r[14],pe=r[3],ne=r[7],ue=r[11],de=r[15];return s[0]=a*R+o*k+c*G+l*pe,s[4]=a*C+o*W+c*J+l*ne,s[8]=a*y+o*q+c*oe+l*ue,s[12]=a*N+o*Q+c*re+l*de,s[1]=u*R+h*k+f*G+m*pe,s[5]=u*C+h*W+f*J+m*ne,s[9]=u*y+h*q+f*oe+m*ue,s[13]=u*N+h*Q+f*re+m*de,s[2]=x*R+v*k+g*G+_*pe,s[6]=x*C+v*W+g*J+_*ne,s[10]=x*y+v*q+g*oe+_*ue,s[14]=x*N+v*Q+g*re+_*de,s[3]=T*R+I*k+E*G+w*pe,s[7]=T*C+I*W+E*J+w*ne,s[11]=T*y+I*q+E*oe+w*ue,s[15]=T*N+I*Q+E*re+w*de,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],u=e[2],h=e[6],f=e[10],m=e[14],x=e[3],v=e[7],g=e[11],_=e[15],T=c*m-l*f,I=o*m-l*h,E=o*f-c*h,w=a*m-l*u,R=a*f-c*u,C=a*h-o*u;return t*(v*T-g*I+_*E)-i*(x*T-g*w+_*R)+r*(x*I-v*w+_*C)-s*(x*E-v*R+g*C)}determinantAffine(){let e=this.elements,t=e[0],i=e[4],r=e[8],s=e[1],a=e[5],o=e[9],c=e[2],l=e[6],u=e[10];return t*(a*u-o*l)-i*(s*u-o*c)+r*(s*l-a*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],h=e[9],f=e[10],m=e[11],x=e[12],v=e[13],g=e[14],_=e[15],T=t*o-i*a,I=t*c-r*a,E=t*l-s*a,w=i*c-r*o,R=i*l-s*o,C=r*l-s*c,y=u*v-h*x,N=u*g-f*x,k=u*_-m*x,W=h*g-f*v,q=h*_-m*v,Q=f*_-m*g,G=T*Q-I*q+E*W+w*k-R*N+C*y;if(G===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let J=1/G;return e[0]=(o*Q-c*q+l*W)*J,e[1]=(r*q-i*Q-s*W)*J,e[2]=(v*C-g*R+_*w)*J,e[3]=(f*R-h*C-m*w)*J,e[4]=(c*k-a*Q-l*N)*J,e[5]=(t*Q-r*k+s*N)*J,e[6]=(g*E-x*C-_*I)*J,e[7]=(u*C-f*E+m*I)*J,e[8]=(a*q-o*k+l*y)*J,e[9]=(i*k-t*q-s*y)*J,e[10]=(x*R-v*E+_*T)*J,e[11]=(h*E-u*R-m*T)*J,e[12]=(o*N-a*W-c*y)*J,e[13]=(t*W-i*N+r*y)*J,e[14]=(v*I-x*w-g*T)*J,e[15]=(u*w-h*I+f*T)*J,this}scale(e){let t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,c=e.z,l=s*a,u=s*o;return this.set(l*a+i,l*o-r*c,l*c+r*o,0,l*o+r*c,u*o+i,u*c-r*a,0,l*c-r*o,u*c+r*a,s*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){let r=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,u=a+a,h=o+o,f=s*l,m=s*u,x=s*h,v=a*u,g=a*h,_=o*h,T=c*l,I=c*u,E=c*h,w=i.x,R=i.y,C=i.z;return r[0]=(1-(v+_))*w,r[1]=(m+E)*w,r[2]=(x-I)*w,r[3]=0,r[4]=(m-E)*R,r[5]=(1-(f+_))*R,r[6]=(g+T)*R,r[7]=0,r[8]=(x+I)*C,r[9]=(g-T)*C,r[10]=(1-(f+v))*C,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let s=this.determinantAffine();if(s===0)return i.set(1,1,1),t.identity(),this;let a=aa.set(r[0],r[1],r[2]).length(),o=aa.set(r[4],r[5],r[6]).length(),c=aa.set(r[8],r[9],r[10]).length();s<0&&(a=-a),Si.copy(this);let l=1/a,u=1/o,h=1/c;return Si.elements[0]*=l,Si.elements[1]*=l,Si.elements[2]*=l,Si.elements[4]*=u,Si.elements[5]*=u,Si.elements[6]*=u,Si.elements[8]*=h,Si.elements[9]*=h,Si.elements[10]*=h,t.setFromRotationMatrix(Si),i.x=a,i.y=o,i.z=c,this}makePerspective(e,t,i,r,s,a,o=Ai,c=!1){let l=this.elements,u=2*s/(t-e),h=2*s/(i-r),f=(t+e)/(t-e),m=(i+r)/(i-r),x,v;if(c)x=s/(a-s),v=a*s/(a-s);else if(o===Ai)x=-(a+s)/(a-s),v=-2*a*s/(a-s);else if(o===ba)x=-a/(a-s),v=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=h,l[9]=m,l[13]=0,l[2]=0,l[6]=0,l[10]=x,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=Ai,c=!1){let l=this.elements,u=2/(t-e),h=2/(i-r),f=-(t+e)/(t-e),m=-(i+r)/(i-r),x,v;if(c)x=1/(a-s),v=a/(a-s);else if(o===Ai)x=-2/(a-s),v=-(a+s)/(a-s);else if(o===ba)x=-1/(a-s),v=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=h,l[9]=0,l[13]=m,l[2]=0,l[6]=0,l[10]=x,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},aa=new Z,Si=new ft,iy=new Z(0,0,0),ry=new Z(1,1,1),Ur=new Z,nc=new Z,Jn=new Z,hg=new ft,dg=new ei,mr=class n{constructor(e=0,t=0,i=0,r=n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let r=e.elements,s=r[0],a=r[4],o=r[8],c=r[1],l=r[5],u=r[9],h=r[2],f=r[6],m=r[10];switch(t){case"XYZ":this._y=Math.asin(wt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,m),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-wt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(wt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-wt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,m),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(wt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-wt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,m),this._y=0);break;default:Ze("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return hg.makeRotationFromQuaternion(e),this.setFromRotationMatrix(hg,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return dg.setFromEuler(this),this.setFromQuaternion(dg,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};mr.DEFAULT_ORDER="XYZ";var Aa=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},sy=0,fg=new Z,oa=new ei,lr=new ft,ic=new Z,So=new Z,ay=new Z,oy=new ei,pg=new Z(1,0,0),mg=new Z(0,1,0),gg=new Z(0,0,1),_g={type:"added"},ly={type:"removed"},la={type:"childadded",child:null},nd={type:"childremoved",child:null},Qt=class n extends Hi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:sy++}),this.uuid=Ri(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let e=new Z,t=new mr,i=new ei,r=new Z(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ft},normalMatrix:{value:new ut}}),this.matrix=new ft,this.matrixWorld=new ft,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Aa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return oa.setFromAxisAngle(e,t),this.quaternion.multiply(oa),this}rotateOnWorldAxis(e,t){return oa.setFromAxisAngle(e,t),this.quaternion.premultiply(oa),this}rotateX(e){return this.rotateOnAxis(pg,e)}rotateY(e){return this.rotateOnAxis(mg,e)}rotateZ(e){return this.rotateOnAxis(gg,e)}translateOnAxis(e,t){return fg.copy(e).applyQuaternion(this.quaternion),this.position.add(fg.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(pg,e)}translateY(e){return this.translateOnAxis(mg,e)}translateZ(e){return this.translateOnAxis(gg,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(lr.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?ic.copy(e):ic.set(e,t,i);let r=this.parent;this.updateWorldMatrix(!0,!1),So.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?lr.lookAt(So,ic,this.up):lr.lookAt(ic,So,this.up),this.quaternion.setFromRotationMatrix(lr),r&&(lr.extractRotation(r.matrixWorld),oa.setFromRotationMatrix(lr),this.quaternion.premultiply(oa.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(rt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(_g),la.child=e,this.dispatchEvent(la),la.child=null):rt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ly),nd.child=e,this.dispatchEvent(nd),nd.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),lr.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),lr.multiply(e.parent.matrixWorld)),e.applyMatrix4(lr),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(_g),la.child=e,this.dispatchEvent(la),la.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){let a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(So,e,ay),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(So,oy,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*i-s[8]*r,s[13]+=i-s[1]*t-s[5]*i-s[9]*r,s[14]+=r-s[2]*t-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){let s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){let h=c[l];s(e.shapes,h)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];r.animations.push(s(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),u=a(e.images),h=a(e.shapes),f=a(e.skeletons),m=a(e.animations),x=a(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),f.length>0&&(i.skeletons=f),m.length>0&&(i.animations=m),x.length>0&&(i.nodes=x)}return i.object=r,i;function a(o){let c=[];for(let l in o){let u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let r=e.children[i];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Qt.DEFAULT_UP=new Z(0,1,0);Qt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Qt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var wi=class extends Qt{constructor(){super(),this.isGroup=!0,this.type="Group"}},cy={type:"move"},wa=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new wi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new wi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new wi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Z,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let v of e.hand.values()){let g=t.getJointPose(v,i),_=this._getHandJoint(l,v);g!==null&&(_.matrix.fromArray(g.transform.matrix),_.matrix.decompose(_.position,_.rotation,_.scale),_.matrixWorldNeedsUpdate=!0,_.jointRadius=g.radius),_.visible=g!==null}let u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],f=u.position.distanceTo(h.position),m=.02,x=.005;l.inputState.pinching&&f>m+x?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=m-x&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(cy)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new wi;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},I_={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Or={h:0,s:0,l:0},rc={h:0,s:0,l:0};function id(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var st=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=nn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Et.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=Et.workingColorSpace){return this.r=e,this.g=t,this.b=i,Et.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=Et.workingColorSpace){if(e=af(e,1),t=wt(t,0,1),i=wt(i,0,1),t===0)this.r=this.g=this.b=i;else{let s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=id(a,s,e+1/3),this.g=id(a,s,e),this.b=id(a,s,e-1/3)}return Et.colorSpaceToWorking(this,r),this}setStyle(e,t=nn){function i(s){s!==void 0&&parseFloat(s)<1&&Ze("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Ze("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Ze("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=nn){let i=I_[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ze("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=pr(e.r),this.g=pr(e.g),this.b=pr(e.b),this}copyLinearToSRGB(e){return this.r=va(e.r),this.g=va(e.g),this.b=va(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=nn){return Et.workingToColorSpace(Rn.copy(this),e),Math.round(wt(Rn.r*255,0,255))*65536+Math.round(wt(Rn.g*255,0,255))*256+Math.round(wt(Rn.b*255,0,255))}getHexString(e=nn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Et.workingColorSpace){Et.workingToColorSpace(Rn.copy(this),t);let i=Rn.r,r=Rn.g,s=Rn.b,a=Math.max(i,r,s),o=Math.min(i,r,s),c,l,u=(o+a)/2;if(o===a)c=0,l=0;else{let h=a-o;switch(l=u<=.5?h/(a+o):h/(2-a-o),a){case i:c=(r-s)/h+(r<s?6:0);break;case r:c=(s-i)/h+2;break;case s:c=(i-r)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=Et.workingColorSpace){return Et.workingToColorSpace(Rn.copy(this),t),e.r=Rn.r,e.g=Rn.g,e.b=Rn.b,e}getStyle(e=nn){Et.workingToColorSpace(Rn.copy(this),e);let t=Rn.r,i=Rn.g,r=Rn.b;return e!==nn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Or),this.setHSL(Or.h+e,Or.s+t,Or.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Or),e.getHSL(rc);let i=Co(Or.h,rc.h,t),r=Co(Or.s,rc.s,t),s=Co(Or.l,rc.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Rn=new st;st.NAMES=I_;var Do=class extends Qt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new mr,this.environmentIntensity=1,this.environmentRotation=new mr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},bi=new Z,cr=new Z,rd=new Z,ur=new Z,ca=new Z,ua=new Z,xg=new Z,sd=new Z,ad=new Z,od=new Z,ld=new kt,cd=new kt,ud=new kt,Vr=class n{constructor(e=new Z,t=new Z,i=new Z){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),bi.subVectors(e,t),r.cross(bi);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){bi.subVectors(r,t),cr.subVectors(i,t),rd.subVectors(e,t);let a=bi.dot(bi),o=bi.dot(cr),c=bi.dot(rd),l=cr.dot(cr),u=cr.dot(rd),h=a*l-o*o;if(h===0)return s.set(0,0,0),null;let f=1/h,m=(l*c-o*u)*f,x=(a*u-o*c)*f;return s.set(1-m-x,x,m)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,ur)===null?!1:ur.x>=0&&ur.y>=0&&ur.x+ur.y<=1}static getInterpolation(e,t,i,r,s,a,o,c){return this.getBarycoord(e,t,i,r,ur)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,ur.x),c.addScaledVector(a,ur.y),c.addScaledVector(o,ur.z),c)}static getInterpolatedAttribute(e,t,i,r,s,a){return ld.setScalar(0),cd.setScalar(0),ud.setScalar(0),ld.fromBufferAttribute(e,t),cd.fromBufferAttribute(e,i),ud.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(ld,s.x),a.addScaledVector(cd,s.y),a.addScaledVector(ud,s.z),a}static isFrontFacing(e,t,i,r){return bi.subVectors(i,t),cr.subVectors(e,t),bi.cross(cr).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return bi.subVectors(this.c,this.b),cr.subVectors(this.a,this.b),bi.cross(cr).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return n.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,r=this.b,s=this.c,a,o;ca.subVectors(r,i),ua.subVectors(s,i),sd.subVectors(e,i);let c=ca.dot(sd),l=ua.dot(sd);if(c<=0&&l<=0)return t.copy(i);ad.subVectors(e,r);let u=ca.dot(ad),h=ua.dot(ad);if(u>=0&&h<=u)return t.copy(r);let f=c*h-u*l;if(f<=0&&c>=0&&u<=0)return a=c/(c-u),t.copy(i).addScaledVector(ca,a);od.subVectors(e,s);let m=ca.dot(od),x=ua.dot(od);if(x>=0&&m<=x)return t.copy(s);let v=m*l-c*x;if(v<=0&&l>=0&&x<=0)return o=l/(l-x),t.copy(i).addScaledVector(ua,o);let g=u*x-m*h;if(g<=0&&h-u>=0&&m-x>=0)return xg.subVectors(s,r),o=(h-u)/(h-u+(m-x)),t.copy(r).addScaledVector(xg,o);let _=1/(g+v+f);return a=v*_,o=f*_,t.copy(i).addScaledVector(ca,a).addScaledVector(ua,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},ti=class{constructor(e=new Z(1/0,1/0,1/0),t=new Z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Mi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Mi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=Mi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Mi):Mi.fromBufferAttribute(s,a),Mi.applyMatrix4(e.matrixWorld),this.expandByPoint(Mi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),sc.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),sc.copy(i.boundingBox)),sc.applyMatrix4(e.matrixWorld),this.union(sc)}let r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Mi),Mi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(bo),ac.subVectors(this.max,bo),ha.subVectors(e.a,bo),da.subVectors(e.b,bo),fa.subVectors(e.c,bo),Fr.subVectors(da,ha),Br.subVectors(fa,da),ys.subVectors(ha,fa);let t=[0,-Fr.z,Fr.y,0,-Br.z,Br.y,0,-ys.z,ys.y,Fr.z,0,-Fr.x,Br.z,0,-Br.x,ys.z,0,-ys.x,-Fr.y,Fr.x,0,-Br.y,Br.x,0,-ys.y,ys.x,0];return!hd(t,ha,da,fa,ac)||(t=[1,0,0,0,1,0,0,0,1],!hd(t,ha,da,fa,ac))?!1:(oc.crossVectors(Fr,Br),t=[oc.x,oc.y,oc.z],hd(t,ha,da,fa,ac))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Mi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Mi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(hr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),hr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),hr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),hr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),hr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),hr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),hr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),hr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(hr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},hr=[new Z,new Z,new Z,new Z,new Z,new Z,new Z,new Z],Mi=new Z,sc=new ti,ha=new Z,da=new Z,fa=new Z,Fr=new Z,Br=new Z,ys=new Z,bo=new Z,ac=new Z,oc=new Z,Ss=new Z;function hd(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){Ss.fromArray(n,s);let o=r.x*Math.abs(Ss.x)+r.y*Math.abs(Ss.y)+r.z*Math.abs(Ss.z),c=e.dot(Ss),l=t.dot(Ss),u=i.dot(Ss);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}var ln=new Z,lc=new xt,uy=0,hn=class extends Hi{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:uy++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=rf,this.updateRanges=[],this.gpuType=ii,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)lc.fromBufferAttribute(this,t),lc.applyMatrix3(e),this.setXY(t,lc.x,lc.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)ln.fromBufferAttribute(this,t),ln.applyMatrix3(e),this.setXYZ(t,ln.x,ln.y,ln.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)ln.fromBufferAttribute(this,t),ln.applyMatrix4(e),this.setXYZ(t,ln.x,ln.y,ln.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)ln.fromBufferAttribute(this,t),ln.applyNormalMatrix(e),this.setXYZ(t,ln.x,ln.y,ln.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)ln.fromBufferAttribute(this,t),ln.transformDirection(e),this.setXYZ(t,ln.x,ln.y,ln.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Ti(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Bt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ti(t,this.array)),t}setX(e,t){return this.normalized&&(t=Bt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ti(t,this.array)),t}setY(e,t){return this.normalized&&(t=Bt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ti(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Bt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ti(t,this.array)),t}setW(e,t){return this.normalized&&(t=Bt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Bt(t,this.array),i=Bt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=Bt(t,this.array),i=Bt(i,this.array),r=Bt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=Bt(t,this.array),i=Bt(i,this.array),r=Bt(r,this.array),s=Bt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var Uo=class extends hn{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var Oo=class extends hn{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var xn=class extends hn{constructor(e,t,i){super(new Float32Array(e),t,i)}},hy=new ti,Mo=new Z,dd=new Z,Vn=class{constructor(e=new Z,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):hy.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Mo.subVectors(e,this.center);let t=Mo.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Mo,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(dd.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Mo.copy(e.center).add(dd)),this.expandByPoint(Mo.copy(e.center).sub(dd))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},dy=0,fi=new ft,fd=new Qt,pa=new Z,Qn=new ti,Eo=new ti,gn=new Z,Mn=class n extends Hi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:dy++}),this.uuid=Ri(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ov(e)?Oo:Uo)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let s=new ut().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return fi.makeRotationFromQuaternion(e),this.applyMatrix4(fi),this}rotateX(e){return fi.makeRotationX(e),this.applyMatrix4(fi),this}rotateY(e){return fi.makeRotationY(e),this.applyMatrix4(fi),this}rotateZ(e){return fi.makeRotationZ(e),this.applyMatrix4(fi),this}translate(e,t,i){return fi.makeTranslation(e,t,i),this.applyMatrix4(fi),this}scale(e,t,i){return fi.makeScale(e,t,i),this.applyMatrix4(fi),this}lookAt(e){return fd.lookAt(e),fd.updateMatrix(),this.applyMatrix4(fd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(pa).negate(),this.translate(pa.x,pa.y,pa.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let r=0,s=e.length;r<s;r++){let a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new xn(i,3))}else{let i=Math.min(e.length,t.count);for(let r=0;r<i;r++){let s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Ze("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ti);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){rt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new Z(-1/0,-1/0,-1/0),new Z(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){let s=t[i];Qn.setFromBufferAttribute(s),this.morphTargetsRelative?(gn.addVectors(this.boundingBox.min,Qn.min),this.boundingBox.expandByPoint(gn),gn.addVectors(this.boundingBox.max,Qn.max),this.boundingBox.expandByPoint(gn)):(this.boundingBox.expandByPoint(Qn.min),this.boundingBox.expandByPoint(Qn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&rt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Vn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){rt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new Z,1/0);return}if(e){let i=this.boundingSphere.center;if(Qn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];Eo.setFromBufferAttribute(o),this.morphTargetsRelative?(gn.addVectors(Qn.min,Eo.min),Qn.expandByPoint(gn),gn.addVectors(Qn.max,Eo.max),Qn.expandByPoint(gn)):(Qn.expandByPoint(Eo.min),Qn.expandByPoint(Eo.max))}Qn.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)gn.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(gn));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)gn.fromBufferAttribute(o,l),c&&(pa.fromBufferAttribute(e,l),gn.add(pa)),r=Math.max(r,i.distanceToSquared(gn))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&rt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){rt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,r=t.normal,s=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new hn(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));let o=[],c=[];for(let y=0;y<i.count;y++)o[y]=new Z,c[y]=new Z;let l=new Z,u=new Z,h=new Z,f=new xt,m=new xt,x=new xt,v=new Z,g=new Z;function _(y,N,k){l.fromBufferAttribute(i,y),u.fromBufferAttribute(i,N),h.fromBufferAttribute(i,k),f.fromBufferAttribute(s,y),m.fromBufferAttribute(s,N),x.fromBufferAttribute(s,k),u.sub(l),h.sub(l),m.sub(f),x.sub(f);let W=1/(m.x*x.y-x.x*m.y);isFinite(W)&&(v.copy(u).multiplyScalar(x.y).addScaledVector(h,-m.y).multiplyScalar(W),g.copy(h).multiplyScalar(m.x).addScaledVector(u,-x.x).multiplyScalar(W),o[y].add(v),o[N].add(v),o[k].add(v),c[y].add(g),c[N].add(g),c[k].add(g))}let T=this.groups;T.length===0&&(T=[{start:0,count:e.count}]);for(let y=0,N=T.length;y<N;++y){let k=T[y],W=k.start,q=k.count;for(let Q=W,G=W+q;Q<G;Q+=3)_(e.getX(Q+0),e.getX(Q+1),e.getX(Q+2))}let I=new Z,E=new Z,w=new Z,R=new Z;function C(y){w.fromBufferAttribute(r,y),R.copy(w);let N=o[y];I.copy(N),I.sub(w.multiplyScalar(w.dot(N))).normalize(),E.crossVectors(R,N);let W=E.dot(c[y])<0?-1:1;a.setXYZW(y,I.x,I.y,I.z,W)}for(let y=0,N=T.length;y<N;++y){let k=T[y],W=k.start,q=k.count;for(let Q=W,G=W+q;Q<G;Q+=3)C(e.getX(Q+0)),C(e.getX(Q+1)),C(e.getX(Q+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new hn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,m=i.count;f<m;f++)i.setXYZ(f,0,0,0);let r=new Z,s=new Z,a=new Z,o=new Z,c=new Z,l=new Z,u=new Z,h=new Z;if(e)for(let f=0,m=e.count;f<m;f+=3){let x=e.getX(f+0),v=e.getX(f+1),g=e.getX(f+2);r.fromBufferAttribute(t,x),s.fromBufferAttribute(t,v),a.fromBufferAttribute(t,g),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),o.fromBufferAttribute(i,x),c.fromBufferAttribute(i,v),l.fromBufferAttribute(i,g),o.add(u),c.add(u),l.add(u),i.setXYZ(x,o.x,o.y,o.z),i.setXYZ(v,c.x,c.y,c.z),i.setXYZ(g,l.x,l.y,l.z)}else for(let f=0,m=t.count;f<m;f+=3)r.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)gn.fromBufferAttribute(e,t),gn.normalize(),e.setXYZ(t,gn.x,gn.y,gn.z)}toNonIndexed(){function e(o,c){let l=o.array,u=o.itemSize,h=o.normalized,f=new l.constructor(c.length*u),m=0,x=0;for(let v=0,g=c.length;v<g;v++){o.isInterleavedBufferAttribute?m=c[v]*o.data.stride+o.offset:m=c[v]*u;for(let _=0;_<u;_++)f[x++]=l[m++]}return new hn(f,u,h)}if(this.index===null)return Ze("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,r=this.attributes;for(let o in r){let c=r[o],l=e(c,i);t.setAttribute(o,l)}let s=this.morphAttributes;for(let o in s){let c=[],l=s[o];for(let u=0,h=l.length;u<h;u++){let f=l[u],m=e(f,i);c.push(m)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let c in i){let l=i[c];e.data.attributes[c]=l.toJSON(e.data)}let r={},s=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let h=0,f=l.length;h<f;h++){let m=l[h];u.push(m.toJSON(e.data))}u.length>0&&(r[c]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let r=e.attributes;for(let l in r){let u=r[l];this.setAttribute(l,u.clone(t))}let s=e.morphAttributes;for(let l in s){let u=[],h=s[l];for(let f=0,m=h.length;f<m;f++)u.push(h[f].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,u=a.length;l<u;l++){let h=a[l];this.addGroup(h.start,h.count,h.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ra=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=rf,this.updateRanges=[],this.version=0,this.uuid=Ri()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[i+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ri()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ri()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},Nn=new Z,Ia=class n{constructor(e,t,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Nn.fromBufferAttribute(this,t),Nn.applyMatrix4(e),this.setXYZ(t,Nn.x,Nn.y,Nn.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Nn.fromBufferAttribute(this,t),Nn.applyNormalMatrix(e),this.setXYZ(t,Nn.x,Nn.y,Nn.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Nn.fromBufferAttribute(this,t),Nn.transformDirection(e),this.setXYZ(t,Nn.x,Nn.y,Nn.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=Ti(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Bt(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=Bt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Ti(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Ti(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Ti(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Ti(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Bt(t,this.array),i=Bt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Bt(t,this.array),i=Bt(i,this.array),r=Bt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Bt(t,this.array),i=Bt(i,this.array),r=Bt(r,this.array),s=Bt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){No("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new hn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new n(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){No("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},pd=new Z,fy=new Z,py=new ut,Ei=class{constructor(e=new Z(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let r=pd.subVectors(i,t).cross(fy.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){let r=e.delta(pd),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||py.getNormalMatrix(e),r=this.coplanarPoint(pd).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},my=0,Gn=class extends Hi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:my++}),this.uuid=Ri(),this.name="",this.type="Material",this.blending=za,this.side=Yi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=kd,this.blendDst=zd,this.blendEquation=Ns,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new st(0,0,0),this.blendAlpha=0,this.depthFunc=ya,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=x_,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Rc,this.stencilZFail=Rc,this.stencilZPass=Rc,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){Ze(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){Ze(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){let a=[];for(let o in s){let c=s[o];delete c.metadata,a.push(c)}return a}if(t){let s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new st().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new Ei().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new xt().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new xt().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var dr=new Z,md=new Z,cc=new Z,uc=new Z,Hr=class{constructor(e=new Z,t=new Z(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,dr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=dr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(dr.copy(this.origin).addScaledVector(this.direction,t),dr.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){md.copy(e).add(t).multiplyScalar(.5),cc.copy(t).sub(e).normalize(),uc.copy(this.origin).sub(md);let s=e.distanceTo(t)*.5,a=-this.direction.dot(cc),o=uc.dot(this.direction),c=-uc.dot(cc),l=uc.lengthSq(),u=Math.abs(1-a*a),h,f,m,x;if(u>0)if(h=a*c-o,f=a*o-c,x=s*u,h>=0)if(f>=-x)if(f<=x){let v=1/u;h*=v,f*=v,m=h*(h+a*f+2*o)+f*(a*h+f+2*c)+l}else f=s,h=Math.max(0,-(a*f+o)),m=-h*h+f*(f+2*c)+l;else f=-s,h=Math.max(0,-(a*f+o)),m=-h*h+f*(f+2*c)+l;else f<=-x?(h=Math.max(0,-(-a*s+o)),f=h>0?-s:Math.min(Math.max(-s,-c),s),m=-h*h+f*(f+2*c)+l):f<=x?(h=0,f=Math.min(Math.max(-s,-c),s),m=f*(f+2*c)+l):(h=Math.max(0,-(a*s+o)),f=h>0?s:Math.min(Math.max(-s,-c),s),m=-h*h+f*(f+2*c)+l);else f=a>0?-s:s,h=Math.max(0,-(a*f+o)),m=-h*h+f*(f+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(md).addScaledVector(cc,f),m}intersectSphere(e,t){if(e.radius<0)return null;dr.subVectors(e.center,this.origin);let i=dr.dot(this.direction),r=dr.dot(dr)-i*i,s=e.radius*e.radius;if(r>s)return null;let a=Math.sqrt(s-r),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,c,l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return l>=0?(i=(e.min.x-f.x)*l,r=(e.max.x-f.x)*l):(i=(e.max.x-f.x)*l,r=(e.min.x-f.x)*l),u>=0?(s=(e.min.y-f.y)*u,a=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,a=(e.min.y-f.y)*u),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),h>=0?(o=(e.min.z-f.z)*h,c=(e.max.z-f.z)*h):(o=(e.max.z-f.z)*h,c=(e.min.z-f.z)*h),i>c||o>r)||((o>i||i!==i)&&(i=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,dr)!==null}intersectTriangle(e,t,i,r,s){let a=this.origin,o=this.direction,c=o.x,l=o.y,u=o.z,h=e.x-a.x,f=e.y-a.y,m=e.z-a.z,x=t.x-a.x,v=t.y-a.y,g=t.z-a.z,_=i.x-a.x,T=i.y-a.y,I=i.z-a.z,E=Math.abs(c),w=Math.abs(l),R=Math.abs(u),C,y,N,k,W,q,Q,G,J,oe,re,pe;if(E>=w&&E>=R?(N=c,q=h,J=x,pe=_,c>=0?(C=l,y=u,k=f,W=m,Q=v,G=g,oe=T,re=I):(C=u,y=l,k=m,W=f,Q=g,G=v,oe=I,re=T)):w>=R?(N=l,q=f,J=v,pe=T,l>=0?(C=u,y=c,k=m,W=h,Q=g,G=x,oe=I,re=_):(C=c,y=u,k=h,W=m,Q=x,G=g,oe=_,re=I)):(N=u,q=m,J=g,pe=I,u>=0?(C=c,y=l,k=h,W=f,Q=x,G=v,oe=_,re=T):(C=l,y=c,k=f,W=h,Q=v,G=x,oe=T,re=_)),N===0)return null;let ne=C/N,ue=y/N,de=1/N,He=k-ne*q,Ce=W-ue*q,dt=Q-ne*J,nt=G-ue*J,vt=oe-ne*pe,ie=re-ue*pe,te=vt*nt-ie*dt,Ne=He*ie-Ce*vt,Je=dt*Ce-nt*He;if(r){if(te<0||Ne<0||Je<0)return null}else if((te<0||Ne<0||Je<0)&&(te>0||Ne>0||Je>0))return null;let Ee=te+Ne+Je;if(Ee===0)return null;let lt=de*(te*q+Ne*J+Je*pe);return(Ee>0?lt<0:lt>0)?null:this.at(lt/Ee,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Hn=class extends Gn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new st(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new mr,this.combine=Vd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},vg=new ft,bs=new Hr,hc=new Vn,yg=new Z,dc=new Z,fc=new Z,pc=new Z,gd=new Z,mc=new Z,Sg=new Z,gc=new Z,cn=class extends Qt{constructor(e=new Mn,t=new Hn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){let i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(s&&o){mc.set(0,0,0);for(let c=0,l=s.length;c<l;c++){let u=o[c],h=s[c];u!==0&&(gd.fromBufferAttribute(h,e),a?mc.addScaledVector(gd,u):mc.addScaledVector(gd.sub(t),u))}t.add(mc)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),hc.copy(i.boundingSphere),hc.applyMatrix4(s),bs.copy(e.ray).recast(e.near),!(hc.containsPoint(bs.origin)===!1&&(bs.intersectSphere(hc,yg)===null||bs.origin.distanceToSquared(yg)>(e.far-e.near)**2))&&(vg.copy(s).invert(),bs.copy(e.ray).applyMatrix4(vg),!(i.boundingBox!==null&&bs.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,bs)))}_computeIntersections(e,t,i){let r,s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,f=s.groups,m=s.drawRange;if(o!==null)if(Array.isArray(a))for(let x=0,v=f.length;x<v;x++){let g=f[x],_=a[g.materialIndex],T=Math.max(g.start,m.start),I=Math.min(o.count,Math.min(g.start+g.count,m.start+m.count));for(let E=T,w=I;E<w;E+=3){let R=o.getX(E),C=o.getX(E+1),y=o.getX(E+2);r=_c(this,_,e,i,l,u,h,R,C,y),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{let x=Math.max(0,m.start),v=Math.min(o.count,m.start+m.count);for(let g=x,_=v;g<_;g+=3){let T=o.getX(g),I=o.getX(g+1),E=o.getX(g+2);r=_c(this,a,e,i,l,u,h,T,I,E),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let x=0,v=f.length;x<v;x++){let g=f[x],_=a[g.materialIndex],T=Math.max(g.start,m.start),I=Math.min(c.count,Math.min(g.start+g.count,m.start+m.count));for(let E=T,w=I;E<w;E+=3){let R=E,C=E+1,y=E+2;r=_c(this,_,e,i,l,u,h,R,C,y),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{let x=Math.max(0,m.start),v=Math.min(c.count,m.start+m.count);for(let g=x,_=v;g<_;g+=3){let T=g,I=g+1,E=g+2;r=_c(this,a,e,i,l,u,h,T,I,E),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}}};function gy(n,e,t,i,r,s,a,o){let c;if(e.side===Dn?c=i.intersectTriangle(a,s,r,!0,o):c=i.intersectTriangle(r,s,a,e.side===Yi,o),c===null)return null;gc.copy(o),gc.applyMatrix4(n.matrixWorld);let l=t.ray.origin.distanceTo(gc);return l<t.near||l>t.far?null:{distance:l,point:gc.clone(),object:n}}function _c(n,e,t,i,r,s,a,o,c,l){n.getVertexPosition(o,dc),n.getVertexPosition(c,fc),n.getVertexPosition(l,pc);let u=gy(n,e,t,i,dc,fc,pc,Sg);if(u){let h=new Z;Vr.getBarycoord(Sg,dc,fc,pc,h),r&&(u.uv=Vr.getInterpolatedAttribute(r,o,c,l,h,new xt)),s&&(u.uv1=Vr.getInterpolatedAttribute(s,o,c,l,h,new xt)),a&&(u.normal=Vr.getInterpolatedAttribute(a,o,c,l,h,new Z),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));let f={a:o,b:c,c:l,normal:new Z,materialIndex:0};Vr.getNormal(dc,fc,pc,f.normal),u.face=f,u.barycoord=h}return u}var To=new kt,bg=new kt,Mg=new kt,_y=new kt,Eg=new ft,xc=new Z,_d=new Vn,Tg=new ft,xd=new Hr,Fo=class extends cn{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=bd,this.bindMatrix=new ft,this.bindMatrixInverse=new ft,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new ti),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,xc),this.boundingBox.expandByPoint(xc)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Vn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,xc),this.boundingSphere.expandByPoint(xc)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let i=this.material,r=this.matrixWorld;i!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),_d.copy(this.boundingSphere),_d.applyMatrix4(r),e.ray.intersectsSphere(_d)!==!1&&(Tg.copy(r).invert(),xd.copy(e.ray).applyMatrix4(Tg),!(this.boundingBox!==null&&xd.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,xd)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new kt,t=this.geometry.attributes.skinWeight;for(let i=0,r=t.count;i<r;i++){e.fromBufferAttribute(t,i);let s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(i,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===bd?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===p_?this.bindMatrixInverse.copy(this.bindMatrix).invert():Ze("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let i=this.skeleton,r=this.geometry;bg.fromBufferAttribute(r.attributes.skinIndex,e),Mg.fromBufferAttribute(r.attributes.skinWeight,e),t.isVector4?(To.copy(t),t.set(0,0,0,0)):(To.set(...t,1),t.set(0,0,0)),To.applyMatrix4(this.bindMatrix);for(let s=0;s<4;s++){let a=Mg.getComponent(s);if(a!==0){let o=bg.getComponent(s);Eg.multiplyMatrices(i.bones[o].matrixWorld,i.boneInverses[o]),t.addScaledVector(_y.copy(To).applyMatrix4(Eg),a)}}return t.isVector4&&(t.w=To.w),t.applyMatrix4(this.bindMatrixInverse)}},Ca=class extends Qt{constructor(){super(),this.isBone=!0,this.type="Bone"}},Pa=class extends vn{constructor(e=null,t=1,i=1,r,s,a,o,c,l=Kt,u=Kt,h,f){super(null,a,o,c,l,u,r,s,h,f),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Ag=new ft,xy=new ft,Bo=class n{constructor(e=[],t=[]){this.uuid=Ri(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Ze("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let i=0,r=this.bones.length;i<r;i++)this.boneInverses.push(new ft)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let i=new ft;this.bones[e]&&i.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(i)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let i=this.bones[e];i&&i.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let i=this.bones[e];i&&(i.parent&&i.parent.isBone?(i.matrix.copy(i.parent.matrixWorld).invert(),i.matrix.multiply(i.matrixWorld)):i.matrix.copy(i.matrixWorld),i.matrix.decompose(i.position,i.quaternion,i.scale))}}update(){let e=this.bones,t=this.boneInverses,i=this.boneMatrices,r=this.boneTexture;for(let s=0,a=e.length;s<a;s++){let o=e[s]?e[s].matrixWorld:xy;Ag.multiplyMatrices(o,t[s]),Ag.toArray(i,s*16)}r!==null&&(r.needsUpdate=!0)}clone(){return new n(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let i=new Pa(t,e,e,ri,ii);return i.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=i,this}getBoneByName(e){for(let t=0,i=this.bones.length;t<i;t++){let r=this.bones[t];if(r.name===e)return r}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let i=0,r=e.bones.length;i<r;i++){let s=e.bones[i],a=t[s];a===void 0&&(Ze("Skeleton: No bone found with UUID:",s),a=new Ca),this.bones.push(a),this.boneInverses.push(new ft().fromArray(e.boneInverses[i]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,i=this.boneInverses;for(let r=0,s=t.length;r<s;r++){let a=t[r];e.bones.push(a.uuid);let o=i[r];e.boneInverses.push(o.toArray())}return e}},gr=class extends hn{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},ma=new ft,wg=new ft,vc=[],Rg=new ti,vy=new ft,Ao=new cn,wo=new Vn,ko=class extends cn{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new gr(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,vy)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ti),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,ma),Rg.copy(e.boundingBox).applyMatrix4(ma),this.boundingBox.union(Rg)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Vn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,ma),wo.copy(e.boundingSphere).applyMatrix4(ma),this.boundingSphere.union(wo)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let i=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=i.length+1,a=e*s+1;for(let o=0;o<i.length;o++)i[o]=r[a+o]}raycast(e,t){let i=this.matrixWorld,r=this.count;if(Ao.geometry=this.geometry,Ao.material=this.material,Ao.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),wo.copy(this.boundingSphere),wo.applyMatrix4(i),e.ray.intersectsSphere(wo)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,ma),wg.multiplyMatrices(i,ma),Ao.matrixWorld=wg,Ao.raycast(e,vc);for(let a=0,o=vc.length;a<o;a++){let c=vc[a];c.instanceId=s,c.object=this,t.push(c)}vc.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new gr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let i=t.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new Pa(new Float32Array(r*this.count),r,this.count,ou,ii));let s=this.morphTexture.source.data.data,a=0;for(let l=0;l<i.length;l++)a+=i[l];let o=this.geometry.morphTargetsRelative?1:1-a,c=r*e;return s[c]=o,s.set(i,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Ms=new Vn,yy=new xt(.5,.5),yc=new Z,Na=class{constructor(e=new Ei,t=new Ei,i=new Ei,r=new Ei,s=new Ei,a=new Ei){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Ai,i=!1){let r=this.planes,s=e.elements,a=s[0],o=s[1],c=s[2],l=s[3],u=s[4],h=s[5],f=s[6],m=s[7],x=s[8],v=s[9],g=s[10],_=s[11],T=s[12],I=s[13],E=s[14],w=s[15];if(r[0].setComponents(l-a,m-u,_-x,w-T).normalize(),r[1].setComponents(l+a,m+u,_+x,w+T).normalize(),r[2].setComponents(l+o,m+h,_+v,w+I).normalize(),r[3].setComponents(l-o,m-h,_-v,w-I).normalize(),i)r[4].setComponents(c,f,g,E).normalize(),r[5].setComponents(l-c,m-f,_-g,w-E).normalize();else if(r[4].setComponents(l-c,m-f,_-g,w-E).normalize(),t===Ai)r[5].setComponents(l+c,m+f,_+g,w+E).normalize();else if(t===ba)r[5].setComponents(c,f,g,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ms.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ms.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ms)}intersectsSprite(e){Ms.center.set(0,0,0);let t=yy.distanceTo(e.center);return Ms.radius=.7071067811865476+t,Ms.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ms)}intersectsSphere(e){let t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let r=t[i];if(yc.x=r.normal.x>0?e.max.x:e.min.x,yc.y=r.normal.y>0?e.max.y:e.min.y,yc.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(yc)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var La=class extends Gn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new st(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},zc=new Z,Vc=new Z,Ig=new ft,Ro=new Hr,Sc=new Vn,vd=new Z,Cg=new Z,Rs=class extends Qt{constructor(e=new Mn,t=new La){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)zc.fromBufferAttribute(t,r-1),Vc.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=zc.distanceTo(Vc);e.setAttribute("lineDistance",new xn(i,1))}else Ze("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Sc.copy(i.boundingSphere),Sc.applyMatrix4(r),Sc.radius+=s,e.ray.intersectsSphere(Sc)===!1)return;Ig.copy(r).invert(),Ro.copy(e.ray).applyMatrix4(Ig);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=i.index,f=i.attributes.position;if(u!==null){let m=Math.max(0,a.start),x=Math.min(u.count,a.start+a.count);for(let v=m,g=x-1;v<g;v+=l){let _=u.getX(v),T=u.getX(v+1),I=bc(this,e,Ro,c,_,T,v);I&&t.push(I)}if(this.isLineLoop){let v=u.getX(x-1),g=u.getX(m),_=bc(this,e,Ro,c,v,g,x-1);_&&t.push(_)}}else{let m=Math.max(0,a.start),x=Math.min(f.count,a.start+a.count);for(let v=m,g=x-1;v<g;v+=l){let _=bc(this,e,Ro,c,v,v+1,v);_&&t.push(_)}if(this.isLineLoop){let v=bc(this,e,Ro,c,x-1,m,x-1);v&&t.push(v)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}};function bc(n,e,t,i,r,s,a){let o=n.geometry.attributes.position;if(zc.fromBufferAttribute(o,r),Vc.fromBufferAttribute(o,s),t.distanceSqToSegment(zc,Vc,vd,Cg)>i)return;vd.applyMatrix4(n.matrixWorld);let l=e.ray.origin.distanceTo(vd);if(!(l<e.near||l>e.far))return{distance:l,point:Cg.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}var Pg=new Z,Ng=new Z,zo=class extends Rs{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[];for(let r=0,s=t.count;r<s;r+=2)Pg.fromBufferAttribute(t,r),Ng.fromBufferAttribute(t,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+Pg.distanceTo(Ng);e.setAttribute("lineDistance",new xn(i,1))}else Ze("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Vo=class extends Rs{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},Da=class extends Gn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new st(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Lg=new ft,wd=new Hr,Mc=new Vn,Ec=new Z,Go=class extends Qt{constructor(e=new Mn,t=new Da){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Mc.copy(i.boundingSphere),Mc.applyMatrix4(r),Mc.radius+=s,e.ray.intersectsSphere(Mc)===!1)return;Lg.copy(r).invert(),wd.copy(e.ray).applyMatrix4(Lg);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=i.index,h=i.attributes.position;if(l!==null){let f=Math.max(0,a.start),m=Math.min(l.count,a.start+a.count);for(let x=f,v=m;x<v;x++){let g=l.getX(x);Ec.fromBufferAttribute(h,g),Dg(Ec,g,c,r,e,t,this)}}else{let f=Math.max(0,a.start),m=Math.min(h.count,a.start+a.count);for(let x=f,v=m;x<v;x++)Ec.fromBufferAttribute(h,x),Dg(Ec,x,c,r,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}};function Dg(n,e,t,i,r,s,a){let o=wd.distanceSqToPoint(n);if(o<t){let c=new Z;wd.closestPointToPoint(n,c),c.applyMatrix4(i);let l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var Ho=class extends vn{constructor(e=[],t=qr,i,r,s,a,o,c,l,u){super(e,t,i,r,s,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}};var Wr=class extends vn{constructor(e,t,i=Pi,r,s,a,o=Kt,c=Kt,l,u=Gi,h=1){if(u!==Gi&&u!==Yr)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:e,height:t,depth:h};super(f,r,s,a,o,c,u,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ta(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Gc=class extends Wr{constructor(e,t=Pi,i=qr,r,s,a=Kt,o=Kt,c,l=Gi){let u={width:e,height:e,depth:1},h=[u,u,u,u,u,u];super(e,e,t,i,r,s,a,o,c,l),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Wo=class extends vn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Ua=class n extends Mn{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};let o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);let c=[],l=[],u=[],h=[],f=0,m=0;x("z","y","x",-1,-1,i,t,e,a,s,0),x("z","y","x",1,-1,i,t,-e,a,s,1),x("x","z","y",1,1,e,i,t,r,a,2),x("x","z","y",1,-1,e,i,-t,r,a,3),x("x","y","z",1,-1,e,t,i,r,s,4),x("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new xn(l,3)),this.setAttribute("normal",new xn(u,3)),this.setAttribute("uv",new xn(h,2));function x(v,g,_,T,I,E,w,R,C,y,N){let k=E/C,W=w/y,q=E/2,Q=w/2,G=R/2,J=C+1,oe=y+1,re=0,pe=0,ne=new Z;for(let ue=0;ue<oe;ue++){let de=ue*W-Q;for(let He=0;He<J;He++){let Ce=He*k-q;ne[v]=Ce*T,ne[g]=de*I,ne[_]=G,l.push(ne.x,ne.y,ne.z),ne[v]=0,ne[g]=0,ne[_]=R>0?1:-1,u.push(ne.x,ne.y,ne.z),h.push(He/C),h.push(1-ue/y),re+=1}}for(let ue=0;ue<y;ue++)for(let de=0;de<C;de++){let He=f+de+J*ue,Ce=f+de+J*(ue+1),dt=f+(de+1)+J*(ue+1),nt=f+(de+1)+J*ue;c.push(He,Ce,nt),c.push(Ce,dt,nt),pe+=6}o.addGroup(m,pe,N),m+=pe,f+=re}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var Is=class n extends Mn{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};let s=e/2,a=t/2,o=Math.floor(i),c=Math.floor(r),l=o+1,u=c+1,h=e/o,f=t/c,m=[],x=[],v=[],g=[];for(let _=0;_<u;_++){let T=_*f-a;for(let I=0;I<l;I++){let E=I*h-s;x.push(E,-T,0),v.push(0,0,1),g.push(I/o),g.push(1-_/c)}}for(let _=0;_<c;_++)for(let T=0;T<o;T++){let I=T+l*_,E=T+l*(_+1),w=T+1+l*(_+1),R=T+1+l*_;m.push(I,E,R),m.push(E,w,R)}this.setIndex(m),this.setAttribute("position",new xn(x,3)),this.setAttribute("normal",new xn(v,3)),this.setAttribute("uv",new xn(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}},Xo=class n extends Mn{constructor(e=.5,t=1,i=32,r=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:r,thetaStart:s,thetaLength:a},i=Math.max(3,i),r=Math.max(1,r);let o=[],c=[],l=[],u=[],h=e,f=(t-e)/r,m=new Z,x=new xt;for(let v=0;v<=r;v++){for(let g=0;g<=i;g++){let _=s+g/i*a;m.x=h*Math.cos(_),m.y=h*Math.sin(_),c.push(m.x,m.y,m.z),l.push(0,0,1),x.x=(m.x/t+1)/2,x.y=(m.y/t+1)/2,u.push(x.x,x.y)}h+=f}for(let v=0;v<r;v++){let g=v*(i+1);for(let _=0;_<i;_++){let T=_+g,I=T,E=T+i+1,w=T+i+2,R=T+1;o.push(I,E,R),o.push(E,w,R)}}this.setIndex(o),this.setAttribute("position",new xn(c,3)),this.setAttribute("normal",new xn(l,3)),this.setAttribute("uv",new xn(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}};function Us(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let r=n[t][i];if(Ug(r))r.isRenderTargetTexture?(Ze("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(Ug(r[0])){let s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][i]=s}else e[t][i]=r.slice();else e[t][i]=r}}return e}function In(n){let e={};for(let t=0;t<n.length;t++){let i=Us(n[t]);for(let r in i)e[r]=i[r]}return e}function Ug(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Sy(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function of(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Et.workingColorSpace}var C_={clone:Us,merge:In},by=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,My=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,ni=class extends Gn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=by,this.fragmentShader=My,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Us(e.uniforms),this.uniformsGroups=Sy(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let i in e.uniforms){let r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new st().setHex(r.value);break;case"v2":this.uniforms[i].value=new xt().fromArray(r.value);break;case"v3":this.uniforms[i].value=new Z().fromArray(r.value);break;case"v4":this.uniforms[i].value=new kt().fromArray(r.value);break;case"m3":this.uniforms[i].value=new ut().fromArray(r.value);break;case"m4":this.uniforms[i].value=new ft().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Hc=class extends ni{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Cs=class extends Gn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new st(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new st(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Vu,this.normalScale=new xt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new mr,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Wn=class extends Cs{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new xt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return wt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new st(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new st(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new st(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Wc=class extends Gn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=g_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Xc=class extends Gn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function zr(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function Ic(n){return n!==void 0&&n.inTangents!==void 0&&n.outTangents!==void 0}function Ey(n){function e(r,s){return n[r]-n[s]}let t=n.length,i=new Array(t);for(let r=0;r!==t;++r)i[r]=r;return i.sort(e),i}function Og(n,e,t){let i=n.length,r=new n.constructor(i);for(let s=0,a=0;a!==i;++s){let o=t[s]*e;for(let c=0;c!==e;++c)r[a++]=n[o+c]}return r}function Ty(n,e,t,i){let r=1,s=n[0];for(;s!==void 0&&s[i]===void 0;)s=n[r++];if(s===void 0)return;let a=s[i];if(a!==void 0)if(Array.isArray(a))do a=s[i],a!==void 0&&(e.push(s.time),t.push(...a)),s=n[r++];while(s!==void 0);else if(a.toArray!==void 0)do a=s[i],a!==void 0&&(e.push(s.time),a.toArray(t,t.length)),s=n[r++];while(s!==void 0);else do a=s[i],a!==void 0&&(e.push(s.time),t.push(a)),s=n[r++];while(s!==void 0)}var Wi=class{constructor(e,t,i,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,r=t[i],s=t[i-1];e:{t:{let a;n:{i:if(!(e<r)){for(let o=i+2;;){if(r===void 0){if(e<s)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(s=r,r=t[++i],e<r)break t}a=t.length;break n}if(!(e>=s)){let o=t[1];e<o&&(i=2,s=o);for(let c=i-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===c)break;if(r=s,s=t[--i-1],e>=s)break t}a=i,i=0;break n}break e}for(;i<a;){let o=i+a>>>1;e<t[o]?a=o:i=o+1}if(r=t[i],s=t[i-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,s,r)}return this.interpolate_(i,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,r=this.valueSize,s=e*r;for(let a=0;a!==r;++a)t[a]=i[s+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},qc=class extends Wi{constructor(e,t,i,r){super(e,t,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ed,endingEnd:Ed}}intervalChanged_(e,t,i){let r=this.parameterPositions,s=e-2,a=e+1,o=r[s],c=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Td:s=e,o=2*t-i;break;case Ad:s=r.length-2,o=t+r[s]-r[s+1];break;default:s=e,o=i}if(c===void 0)switch(this.getSettings_().endingEnd){case Td:a=e,c=2*i-t;break;case Ad:a=1,c=i+r[1]-r[0];break;default:a=e-1,c=t}let l=(i-t)*.5,u=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-i),this._offsetPrev=s*u,this._offsetNext=a*u}interpolate_(e,t,i,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=this._offsetPrev,h=this._offsetNext,f=this._weightPrev,m=this._weightNext,x=(i-t)/(r-t),v=x*x,g=v*x,_=-f*g+2*f*v-f*x,T=(1+f)*g+(-1.5-2*f)*v+(-.5+f)*x+1,I=(-1-m)*g+(1.5+m)*v+.5*x,E=m*g-m*v;for(let w=0;w!==o;++w)s[w]=_*a[u+w]+T*a[l+w]+I*a[c+w]+E*a[h+w];return s}},Yc=class extends Wi{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=(i-t)/(r-t),h=1-u;for(let f=0;f!==o;++f)s[f]=a[l+f]*h+a[c+f]*u;return s}},Zc=class extends Wi{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Kc=class extends Wi{interpolate_(e,t,i,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=this.inTangents,h=this.outTangents;if(!u||!h){let x=(i-t)/(r-t),v=1-x;for(let g=0;g!==o;++g)s[g]=a[l+g]*v+a[c+g]*x;return s}let f=o*2,m=e-1;for(let x=0;x!==o;++x){let v=a[l+x],g=a[c+x],_=m*f+x*2,T=h[_],I=h[_+1],E=e*f+x*2,w=u[E],R=u[E+1],C=wy(i,t,T,w,r);s[x]=P_(C,v,I,R,g)}return s}};function P_(n,e,t,i,r){let s=1-n;return s*s*s*e+3*s*s*n*t+3*s*n*n*i+n*n*n*r}function Ay(n,e,t,i,r){let s=1-n;return 3*s*s*(t-e)+6*s*n*(i-t)+3*n*n*(r-i)}function wy(n,e,t,i,r){let s=(n-e)/(r-e);for(let a=0;a<8;a++){let o=P_(s,e,t,i,r)-n;if(Math.abs(o)<1e-10)break;let c=Ay(s,e,t,i,r);if(Math.abs(c)<1e-10)break;s=Math.max(0,Math.min(1,s-o/c))}return s}var Xn=class{constructor(e,t,i,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=zr(t,this.TimeBufferType),this.values=zr(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:zr(e.times,Array),values:zr(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(i.interpolation=r),Ic(e.settings)&&(i.settings={inTangents:zr(e.settings.inTangents,Array),outTangents:zr(e.settings.outTangents,Array)})}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new Zc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Yc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new qc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Kc(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Ts:t=this.InterpolantFactoryMethodDiscrete;break;case As:t=this.InterpolantFactoryMethodLinear;break;case wc:t=this.InterpolantFactoryMethodSmooth;break;case Md:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Ze("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ts;case this.InterpolantFactoryMethodLinear:return As;case this.InterpolantFactoryMethodSmooth:return wc;case this.InterpolantFactoryMethodBezier:return Md}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]*=e;Ic(this.settings)&&(Fg(this.settings.inTangents,e),Fg(this.settings.outTangents,e))}return this}trim(e,t){let i=this.times,r=i.length,s=0,a=r-1;for(;s!==r&&i[s]<e;)++s;for(;a!==-1&&i[a]>t;)--a;if(++a,s!==0||a!==r){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=i.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(rt("KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,r=this.values,s=i.length;s===0&&(rt("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let c=i[o];if(typeof c=="number"&&isNaN(c)){rt("KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){rt("KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(r!==void 0&&Fv(r))for(let o=0,c=r.length;o!==c;++o){let l=r[o];if(isNaN(l)){rt("KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===wc,s=e.length-1,a=1;for(let o=1;o<s;++o){let c=!1,l=e[o],u=e[o+1];if(l!==u&&(o!==1||l!==e[0]))if(r)c=!0;else{let h=o*i,f=h-i,m=h+i;for(let x=0;x!==i;++x){let v=t[h+x];if(v!==t[f+x]||v!==t[m+x]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let h=o*i,f=a*i;for(let m=0;m!==i;++m)t[f+m]=t[h+m]}++a}}if(s>0){e[a]=e[s];for(let o=s*i,c=a*i,l=0;l!==i;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,r=new i(this.name,e,t);return r.createInterpolant=this.createInterpolant,Ic(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function Fg(n,e){for(let t=0,i=n.length;t!==i;t+=2)n[t]*=e}Xn.prototype.ValueTypeName="";Xn.prototype.TimeBufferType=Float32Array;Xn.prototype.ValueBufferType=Float32Array;Xn.prototype.DefaultInterpolation=As;var _r=class extends Xn{constructor(e,t,i){super(e,t,i)}};_r.prototype.ValueTypeName="bool";_r.prototype.ValueBufferType=Array;_r.prototype.DefaultInterpolation=Ts;_r.prototype.InterpolantFactoryMethodLinear=void 0;_r.prototype.InterpolantFactoryMethodSmooth=void 0;var qo=class extends Xn{constructor(e,t,i,r){super(e,t,i,r)}};qo.prototype.ValueTypeName="color";var xr=class extends Xn{constructor(e,t,i,r){super(e,t,i,r)}};xr.prototype.ValueTypeName="number";var jc=class extends Wi{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(i-t)/(r-t),l=e*o;for(let u=l+o;l!==u;l+=4)ei.slerpFlat(s,0,a,l-o,a,l,c);return s}},vr=class extends Xn{constructor(e,t,i,r){super(e,t,i,r)}InterpolantFactoryMethodLinear(e){return new jc(this.times,this.values,this.getValueSize(),e)}};vr.prototype.ValueTypeName="quaternion";vr.prototype.InterpolantFactoryMethodSmooth=void 0;var yr=class extends Xn{constructor(e,t,i){super(e,t,i)}};yr.prototype.ValueTypeName="string";yr.prototype.ValueBufferType=Array;yr.prototype.DefaultInterpolation=Ts;yr.prototype.InterpolantFactoryMethodLinear=void 0;yr.prototype.InterpolantFactoryMethodSmooth=void 0;var Xr=class extends Xn{constructor(e,t,i,r){super(e,t,i,r)}};Xr.prototype.ValueTypeName="vector";var Yo=class{constructor(e="",t=-1,i=[],r=m_){this.name=e,this.tracks=i,this.duration=t,this.blendMode=r,this.uuid=Ri(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],i=e.tracks,r=1/(e.fps||1);for(let a=0,o=i.length;a!==o;++a)t.push(Iy(i[a]).scale(r));let s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){let t=[],i=e.tracks,r={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,a=i.length;s!==a;++s)t.push(Xn.toJSON(i[s]));return r}static CreateFromMorphTargetSequence(e,t,i,r){let s=t.length,a=[];for(let o=0;o<s;o++){let c=[],l=[];c.push((o+s-1)%s,o,(o+1)%s),l.push(0,1,0);let u=Ey(c);c=Og(c,1,u),l=Og(l,1,u),!r&&c[0]===0&&(c.push(s),l.push(l[0])),a.push(new xr(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/i))}return new this(e,-1,a)}static findByName(e,t){let i=e;if(!Array.isArray(e)){let r=e;i=r.geometry&&r.geometry.animations||r.animations}for(let r=0;r<i.length;r++)if(i[r].name===t)return i[r];return null}static CreateClipsFromMorphTargetSequences(e,t,i){let r={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){let l=e[o],u=l.name.match(s);if(u&&u.length>1){let h=u[1],f=r[h];f||(r[h]=f=[]),f.push(l)}}let a=[];for(let o in r)a.push(this.CreateFromMorphTargetSequence(o,r[o],t,i));return a}resetDuration(){let e=this.tracks,t=0;for(let i=0,r=e.length;i!==r;++i){let s=this.tracks[i];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let i=0;i<this.tracks.length;i++)e.push(this.tracks[i].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function Ry(n){switch(n.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return xr;case"vector":case"vector2":case"vector3":case"vector4":return Xr;case"color":return qo;case"quaternion":return vr;case"bool":case"boolean":return _r;case"string":return yr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+n)}function Iy(n){if(n.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=Ry(n.type);if(n.times===void 0){let i=[],r=[];Ty(n.keys,i,r,"value"),n.times=i,n.values=r}let t;return e.parse!==void 0?t=e.parse(n):t=new e(n.name,n.times,n.values,n.interpolation),Ic(n.settings)&&(t.settings={inTangents:zr(n.settings.inTangents,Float32Array),outTangents:zr(n.settings.outTangents,Float32Array)}),t}var Vi={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(Bg(n)||(this.files[n]=e))},get:function(n){if(this.enabled!==!1&&!Bg(n))return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};function Bg(n){try{let e=n.slice(n.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var $c=class{constructor(e,t,i){let r=this,s=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(u){o++,s===!1&&r.onStart!==void 0&&r.onStart(u,a,o),s=!0},this.itemEnd=function(u){a++,r.onProgress!==void 0&&r.onProgress(u,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,h){return l.push(u,h),this},this.removeHandler=function(u){let h=l.indexOf(u);return h!==-1&&l.splice(h,2),this},this.getHandler=function(u){for(let h=0,f=l.length;h<f;h+=2){let m=l[h],x=l[h+1];if(m.global&&(m.lastIndex=0),m.test(u))return x}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},N_=new $c,Xi=class{constructor(e){this.manager=e!==void 0?e:N_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let i=this;return new Promise(function(r,s){i.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Xi.DEFAULT_MATERIAL_NAME="__DEFAULT";var fr={},Rd=class extends Error{constructor(e,t){super(e),this.response=t}},Oa=class extends Xi{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,i,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=Vi.get(`file:${e}`);if(s!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0);return}if(fr[e]!==void 0){fr[e].push({onLoad:t,onProgress:i,onError:r});return}fr[e]=[],fr[e].push({onLoad:t,onProgress:i,onError:r});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&Ze("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let u=fr[e],h=l.body.getReader(),f=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),m=f?parseInt(f):0,x=m!==0,v=0,g=new ReadableStream({start(_){T();function T(){h.read().then(({done:I,value:E})=>{if(I)_.close();else{v+=E.byteLength;let w=new ProgressEvent("progress",{lengthComputable:x,loaded:v,total:m});for(let R=0,C=u.length;R<C;R++){let y=u[R];y.onProgress&&y.onProgress(w)}_.enqueue(E),T()}},I=>{_.error(I)})}}});return new Response(g)}else throw new Rd(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return l.json();default:if(o==="")return l.text();{let h=/charset="?([^;"\s]*)"?/i.exec(o),f=h&&h[1]?h[1].toLowerCase():void 0,m=new TextDecoder(f);return l.arrayBuffer().then(x=>m.decode(x))}}}).then(l=>{Vi.add(`file:${e}`,l);let u=fr[e];delete fr[e];for(let h=0,f=u.length;h<f;h++){let m=u[h];m.onLoad&&m.onLoad(l)}}).catch(l=>{let u=fr[e];if(u===void 0)throw this.manager.itemError(e),l;delete fr[e];for(let h=0,f=u.length;h<f;h++){let m=u[h];m.onError&&m.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var ga=new WeakMap,Jc=class extends Xi{constructor(e){super(e)}load(e,t,i,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,a=Vi.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);else{let h=ga.get(a);h===void 0&&(h=[],ga.set(a,h)),h.push({onLoad:t,onError:r})}return a}let o=Ma("img");function c(){u(),t&&t(this);let h=ga.get(this)||[];for(let f=0;f<h.length;f++){let m=h[f];m.onLoad&&m.onLoad(this)}ga.delete(this),s.manager.itemEnd(e)}function l(h){u(),r&&r(h),Vi.remove(`image:${e}`);let f=ga.get(this)||[];for(let m=0;m<f.length;m++){let x=f[m];x.onError&&x.onError(h)}ga.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Vi.add(`image:${e}`,o),s.manager.itemStart(e),o.src=e,o}};var Ps=class extends Xi{constructor(e){super(e)}load(e,t,i,r){let s=new vn,a=new Jc(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},i,r),s}},Fa=class extends Qt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new st(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}};var yd=new ft,kg=new Z,zg=new Z,Ba=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new xt(512,512),this.mapType=qn,this.map=null,this.mapPass=null,this.matrix=new ft,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Na,this._frameExtents=new xt(1,1),this._viewportCount=1,this._viewports=[new kt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;kg.setFromMatrixPosition(e.matrixWorld),t.position.copy(kg),zg.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(zg),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,i,r){yd.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(yd,e.coordinateSystem,e.reversedDepth);let s=this._frameExtents,a=r?r.z/s.x:1,o=r?r.w/s.y:1,c=r?r.x/s.x:0,l=r?r.y/s.y:0;e.coordinateSystem===ba||e.reversedDepth?t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),t.multiply(yd)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Tc=new Z,Ac=new ei,zi=new Z,Zo=class extends Qt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ft,this.projectionMatrix=new ft,this.projectionMatrixInverse=new ft,this.coordinateSystem=Ai,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Tc,Ac,zi),zi.x===1&&zi.y===1&&zi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Tc,Ac,zi.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Tc,Ac,zi),zi.x===1&&zi.y===1&&zi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Tc,Ac,zi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},kr=new Z,Vg=new xt,Gg=new xt,_n=class extends Zo{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=ws*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Io*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ws*2*Math.atan(Math.tan(Io*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){kr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(kr.x,kr.y).multiplyScalar(-e/kr.z),kr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(kr.x,kr.y).multiplyScalar(-e/kr.z)}getViewSize(e,t){return this.getViewBounds(e,Vg,Gg),t.subVectors(Gg,Vg)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Io*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*r/c,t-=a.offsetY*i/l,r*=a.width/c,i*=a.height/l}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Id=class extends Ba{constructor(){super(new _n(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,i=ws*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(i!==t.fov||r!==t.aspect||s!==t.far)&&(t.fov=i,t.aspect=r,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},Ko=class extends Fa{constructor(e,t,i=0,r=Math.PI/3,s=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Qt.DEFAULT_UP),this.updateMatrix(),this.target=new Qt,this.distance=i,this.angle=r,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new Id}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},Cd=class extends Ba{constructor(){super(new _n(90,1,.5,500)),this.isPointLightShadow=!0}},jo=class extends Fa{constructor(e,t,i=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new Cd}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},qi=class extends Zo{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=i-e,a=i+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Pd=class extends Ba{constructor(){super(new qi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},$o=class extends Fa{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Qt.DEFAULT_UP),this.updateMatrix(),this.target=new Qt,this.shadow=new Pd}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var Sr=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var Sd=new WeakMap,Jo=class extends Xi{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Ze("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Ze("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,i,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,a=Vi.get(`image-bitmap:${e}`);if(a!==void 0){if(s.manager.itemStart(e),a.then){a.then(l=>{Sd.has(a)===!0?(r&&r(Sd.get(a)),s.manager.itemError(e),s.manager.itemEnd(e)):(t&&t(l),s.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);return}let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign({},s.options,{colorSpaceConversion:"none"}))}).then(function(l){return Vi.add(`image-bitmap:${e}`,l),t&&t(l),s.manager.itemEnd(e),l}).catch(function(l){r&&r(l),Sd.set(c,l),Vi.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});Vi.add(`image-bitmap:${e}`,c),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var _a=-90,xa=1,Qc=class extends Qt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new _n(_a,xa,e,t);r.layers=this.layers,this.add(r);let s=new _n(_a,xa,e,t);s.layers=this.layers,this.add(s);let a=new _n(_a,xa,e,t);a.layers=this.layers,this.add(a);let o=new _n(_a,xa,e,t);o.layers=this.layers,this.add(o);let c=new _n(_a,xa,e,t);c.layers=this.layers,this.add(c);let l=new _n(_a,xa,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,c]=t;for(let l of t)this.remove(l);if(e===Ai)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===ba)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,c,l,u]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;let v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,4,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(h,f,m),e.xr.enabled=x,i.texture.needsPMREMUpdate=!0}},eu=class extends _n{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var lf="\\[\\]\\.:\\/",Cy=new RegExp("["+lf+"]","g"),cf="[^"+lf+"]",Py="[^"+lf.replace("\\.","")+"]",Ny=/((?:WC+[\/:])*)/.source.replace("WC",cf),Ly=/(WCOD+)?/.source.replace("WCOD",Py),Dy=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",cf),Uy=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",cf),Oy=new RegExp("^"+Ny+Ly+Dy+Uy+"$"),Fy=["material","materials","bones","map"],Nd=class{constructor(e,t,i){let r=i||Xt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=i.length;r!==s;++r)i[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},Xt=class n{constructor(e,t,i){this.path=t,this.parsedPath=i||n.parseTrackName(t),this.node=n.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new n.Composite(e,t,i):new n(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Cy,"")}static parseTrackName(e){let t=Oy.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=i.nodeName&&i.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=i.nodeName.substring(r+1);Fy.indexOf(s)!==-1&&(i.nodeName=i.nodeName.substring(0,r),i.objectName=s)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let c=i(o.children);if(c)return c}return null},r=i(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)e[t++]=i[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,r=t.propertyName,s=t.propertyIndex;if(e||(e=n.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ze("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let l=t.objectIndex;switch(i){case"materials":if(!e.material){rt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){rt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){rt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){rt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){rt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){rt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(l!==void 0){if(e[l]===void 0){rt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let a=e[r];if(a===void 0){let l=t.nodeName;rt("PropertyBinding: Trying to update property for track: "+l+"."+r+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){rt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){rt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=r;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Xt.Composite=Nd;Xt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Xt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Xt.prototype.GetterByBindingType=[Xt.prototype._getValue_direct,Xt.prototype._getValue_array,Xt.prototype._getValue_arrayElement,Xt.prototype._getValue_toArray];Xt.prototype.SetterByBindingTypeAndVersioning=[[Xt.prototype._setValue_direct,Xt.prototype._setValue_direct_setNeedsUpdate,Xt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Xt.prototype._setValue_array,Xt.prototype._setValue_array_setNeedsUpdate,Xt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Xt.prototype._setValue_arrayElement,Xt.prototype._setValue_arrayElement_setNeedsUpdate,Xt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Xt.prototype._setValue_fromArray,Xt.prototype._setValue_fromArray_setNeedsUpdate,Xt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var PI=new Float32Array(1);var Hg=new ft,Qo=class{constructor(e,t,i=0,r=1/0){this.ray=new Hr(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new Aa,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):rt("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Hg.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Hg),this}intersectObject(e,t=!0,i=[]){return Ld(e,this,i,t),i.sort(Wg),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)Ld(e[r],this,i,t);return i.sort(Wg),i}};function Wg(n,e){return n.distance-e.distance}function Ld(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){let s=n.children;for(let a=0,o=s.length;a<o;a++)Ld(s[a],e,t,!0)}}var Dd=class n{static{n.prototype.isMatrix2=!0}constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){let s=this.elements;return s[0]=e,s[2]=t,s[1]=i,s[3]=r,this}};function uf(n,e,t,i){let r=By(i);switch(t){case ef:return n*e;case ou:return n*e/r.components*r.byteLength;case lu:return n*e/r.components*r.byteLength;case Zr:return n*e*2/r.components*r.byteLength;case cu:return n*e*2/r.components*r.byteLength;case tf:return n*e*3/r.components*r.byteLength;case ri:return n*e*4/r.components*r.byteLength;case uu:return n*e*4/r.components*r.byteLength;case nl:case il:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case rl:case sl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case du:case pu:return Math.max(n,16)*Math.max(e,8)/4;case hu:case fu:return Math.max(n,8)*Math.max(e,8)/2;case mu:case gu:case xu:case vu:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case _u:case al:case yu:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Su:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case bu:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Mu:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Eu:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Tu:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Au:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case wu:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Ru:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Iu:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Cu:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Pu:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Nu:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Lu:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Du:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Uu:case Ou:case Fu:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Bu:case ku:return Math.ceil(n/4)*Math.ceil(e/4)*8;case ol:case zu:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function By(n){switch(n){case qn:case jd:return{byteLength:1,components:1};case Ga:case $d:case Ni:return{byteLength:2,components:1};case su:case au:return{byteLength:2,components:4};case Pi:case ru:case ii:return{byteLength:4,components:1};case Jd:case Qd:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Ze("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function e0(){let n=null,e=!1,t=null,i=null;function r(s,a){i=n.requestAnimationFrame(r),t(s,a)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function zy(n){let e=new WeakMap;function t(o,c){let l=o.array,u=o.usage,h=l.byteLength,f=n.createBuffer();n.bindBuffer(c,f),n.bufferData(c,l,u),o.onUploadCallback();let m;if(l instanceof Float32Array)m=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)m=n.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?m=n.HALF_FLOAT:m=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=n.SHORT;else if(l instanceof Uint32Array)m=n.UNSIGNED_INT;else if(l instanceof Int32Array)m=n.INT;else if(l instanceof Int8Array)m=n.BYTE;else if(l instanceof Uint8Array)m=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:h}}function i(o,c,l){let u=c.array,h=c.updateRanges;if(n.bindBuffer(l,o),h.length===0)n.bufferSubData(l,0,u);else{h.sort((m,x)=>m.start-x.start);let f=0;for(let m=1;m<h.length;m++){let x=h[f],v=h[m];v.start<=x.start+x.count+1?x.count=Math.max(x.count,v.start+v.count-x.start):(++f,h[f]=v)}h.length=f+1;for(let m=0,x=h.length;m<x;m++){let v=h[m];n.bufferSubData(l,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=e.get(o);c&&(n.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:r,remove:s,update:a}}var Vy=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Gy=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Hy=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Wy=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Xy=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,qy=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Yy=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Zy=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ky=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,jy=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,$y=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Jy=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Qy=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,eS=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,tS=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,nS=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,iS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,rS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,sS=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,aS=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,oS=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,lS=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,cS=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,uS=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,hS=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,dS=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,fS=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,pS=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,mS=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,gS=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,_S="gl_FragColor = linearToOutputTexel( gl_FragColor );",xS=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,vS=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,yS=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,SS=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,bS=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,MS=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,ES=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,TS=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,AS=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,wS=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,RS=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,IS=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,CS=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,PS=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,NS=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,LS=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,DS=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,US=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,OS=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,FS=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,BS=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,kS=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,zS=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,VS=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,GS=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,HS=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,WS=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,XS=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,qS=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,YS=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ZS=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,KS=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,jS=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,$S=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,JS=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,QS=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,eb=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,tb=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,nb=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ib=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,rb=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,sb=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,ab=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,ob=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,lb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,cb=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,ub=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,hb=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,db=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,fb=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,pb=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,mb=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,gb=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,_b=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,xb=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,vb=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,yb=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Sb=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,bb=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Mb=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Eb=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Tb=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Ab=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,wb=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Rb=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Ib=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Cb=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Pb=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Nb=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Lb=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Db=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ub=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Ob=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Fb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Bb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,kb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,zb=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Vb=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Gb=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Wb=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,qb=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Yb=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Zb=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Kb=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,jb=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,$b=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Jb=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qb=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,eM=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,tM=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,nM=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,iM=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,rM=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sM=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,aM=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,oM=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,lM=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,cM=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,uM=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hM=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,dM=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fM=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,pM=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mM=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,gM=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,_M=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,xM=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,vM=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,yM=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,bt={alphahash_fragment:Vy,alphahash_pars_fragment:Gy,alphamap_fragment:Hy,alphamap_pars_fragment:Wy,alphatest_fragment:Xy,alphatest_pars_fragment:qy,aomap_fragment:Yy,aomap_pars_fragment:Zy,batching_pars_vertex:Ky,batching_vertex:jy,begin_vertex:$y,beginnormal_vertex:Jy,bsdfs:Qy,iridescence_fragment:eS,bumpmap_pars_fragment:tS,clipping_planes_fragment:nS,clipping_planes_pars_fragment:iS,clipping_planes_pars_vertex:rS,clipping_planes_vertex:sS,color_fragment:aS,color_pars_fragment:oS,color_pars_vertex:lS,color_vertex:cS,common:uS,cube_uv_reflection_fragment:hS,defaultnormal_vertex:dS,displacementmap_pars_vertex:fS,displacementmap_vertex:pS,emissivemap_fragment:mS,emissivemap_pars_fragment:gS,colorspace_fragment:_S,colorspace_pars_fragment:xS,envmap_fragment:vS,envmap_common_pars_fragment:yS,envmap_pars_fragment:SS,envmap_pars_vertex:bS,envmap_physical_pars_fragment:LS,envmap_vertex:MS,fog_vertex:ES,fog_pars_vertex:TS,fog_fragment:AS,fog_pars_fragment:wS,gradientmap_pars_fragment:RS,lightmap_pars_fragment:IS,lights_lambert_fragment:CS,lights_lambert_pars_fragment:PS,lights_pars_begin:NS,lights_toon_fragment:DS,lights_toon_pars_fragment:US,lights_phong_fragment:OS,lights_phong_pars_fragment:FS,lights_physical_fragment:BS,lights_physical_pars_fragment:kS,lights_fragment_begin:zS,lights_fragment_maps:VS,lights_fragment_end:GS,lightprobes_pars_fragment:HS,logdepthbuf_fragment:WS,logdepthbuf_pars_fragment:XS,logdepthbuf_pars_vertex:qS,logdepthbuf_vertex:YS,map_fragment:ZS,map_pars_fragment:KS,map_particle_fragment:jS,map_particle_pars_fragment:$S,metalnessmap_fragment:JS,metalnessmap_pars_fragment:QS,morphinstance_vertex:eb,morphcolor_vertex:tb,morphnormal_vertex:nb,morphtarget_pars_vertex:ib,morphtarget_vertex:rb,normal_fragment_begin:sb,normal_fragment_maps:ab,normal_pars_fragment:ob,normal_pars_vertex:lb,normal_vertex:cb,normalmap_pars_fragment:ub,clearcoat_normal_fragment_begin:hb,clearcoat_normal_fragment_maps:db,clearcoat_pars_fragment:fb,iridescence_pars_fragment:pb,opaque_fragment:mb,packing:gb,premultiplied_alpha_fragment:_b,project_vertex:xb,dithering_fragment:vb,dithering_pars_fragment:yb,roughnessmap_fragment:Sb,roughnessmap_pars_fragment:bb,shadowmap_pars_fragment:Mb,shadowmap_pars_vertex:Eb,shadowmap_vertex:Tb,shadowmask_pars_fragment:Ab,skinbase_vertex:wb,skinning_pars_vertex:Rb,skinning_vertex:Ib,skinnormal_vertex:Cb,specularmap_fragment:Pb,specularmap_pars_fragment:Nb,tonemapping_fragment:Lb,tonemapping_pars_fragment:Db,transmission_fragment:Ub,transmission_pars_fragment:Ob,uv_pars_fragment:Fb,uv_pars_vertex:Bb,uv_vertex:kb,worldpos_vertex:zb,background_vert:Vb,background_frag:Gb,backgroundCube_vert:Hb,backgroundCube_frag:Wb,cube_vert:Xb,cube_frag:qb,depth_vert:Yb,depth_frag:Zb,distance_vert:Kb,distance_frag:jb,equirect_vert:$b,equirect_frag:Jb,linedashed_vert:Qb,linedashed_frag:eM,meshbasic_vert:tM,meshbasic_frag:nM,meshlambert_vert:iM,meshlambert_frag:rM,meshmatcap_vert:sM,meshmatcap_frag:aM,meshnormal_vert:oM,meshnormal_frag:lM,meshphong_vert:cM,meshphong_frag:uM,meshphysical_vert:hM,meshphysical_frag:dM,meshtoon_vert:fM,meshtoon_frag:pM,points_vert:mM,points_frag:gM,shadow_vert:_M,shadow_frag:xM,sprite_vert:vM,sprite_frag:yM},Ie={common:{diffuse:{value:new st(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ut},alphaMap:{value:null},alphaMapTransform:{value:new ut},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ut}},envmap:{envMap:{value:null},envMapRotation:{value:new ut},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ut}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ut}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ut},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ut},normalScale:{value:new xt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ut},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ut}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ut}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ut}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new st(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new Z},probesMax:{value:new Z},probesResolution:{value:new Z}},points:{diffuse:{value:new st(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ut},alphaTest:{value:0},uvTransform:{value:new ut}},sprite:{diffuse:{value:new st(16777215)},opacity:{value:1},center:{value:new xt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ut},alphaMap:{value:null},alphaMapTransform:{value:new ut},alphaTest:{value:0}}},ji={basic:{uniforms:In([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.fog]),vertexShader:bt.meshbasic_vert,fragmentShader:bt.meshbasic_frag},lambert:{uniforms:In([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,Ie.lights,{emissive:{value:new st(0)},envMapIntensity:{value:1}}]),vertexShader:bt.meshlambert_vert,fragmentShader:bt.meshlambert_frag},phong:{uniforms:In([Ie.common,Ie.specularmap,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,Ie.lights,{emissive:{value:new st(0)},specular:{value:new st(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:bt.meshphong_vert,fragmentShader:bt.meshphong_frag},standard:{uniforms:In([Ie.common,Ie.envmap,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.roughnessmap,Ie.metalnessmap,Ie.fog,Ie.lights,{emissive:{value:new st(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:bt.meshphysical_vert,fragmentShader:bt.meshphysical_frag},toon:{uniforms:In([Ie.common,Ie.aomap,Ie.lightmap,Ie.emissivemap,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.gradientmap,Ie.fog,Ie.lights,{emissive:{value:new st(0)}}]),vertexShader:bt.meshtoon_vert,fragmentShader:bt.meshtoon_frag},matcap:{uniforms:In([Ie.common,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,Ie.fog,{matcap:{value:null}}]),vertexShader:bt.meshmatcap_vert,fragmentShader:bt.meshmatcap_frag},points:{uniforms:In([Ie.points,Ie.fog]),vertexShader:bt.points_vert,fragmentShader:bt.points_frag},dashed:{uniforms:In([Ie.common,Ie.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:bt.linedashed_vert,fragmentShader:bt.linedashed_frag},depth:{uniforms:In([Ie.common,Ie.displacementmap]),vertexShader:bt.depth_vert,fragmentShader:bt.depth_frag},normal:{uniforms:In([Ie.common,Ie.bumpmap,Ie.normalmap,Ie.displacementmap,{opacity:{value:1}}]),vertexShader:bt.meshnormal_vert,fragmentShader:bt.meshnormal_frag},sprite:{uniforms:In([Ie.sprite,Ie.fog]),vertexShader:bt.sprite_vert,fragmentShader:bt.sprite_frag},background:{uniforms:{uvTransform:{value:new ut},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:bt.background_vert,fragmentShader:bt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ut}},vertexShader:bt.backgroundCube_vert,fragmentShader:bt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:bt.cube_vert,fragmentShader:bt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:bt.equirect_vert,fragmentShader:bt.equirect_frag},distance:{uniforms:In([Ie.common,Ie.displacementmap,{referencePosition:{value:new Z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:bt.distance_vert,fragmentShader:bt.distance_frag},shadow:{uniforms:In([Ie.lights,Ie.fog,{color:{value:new st(0)},opacity:{value:1}}]),vertexShader:bt.shadow_vert,fragmentShader:bt.shadow_frag}};ji.physical={uniforms:In([ji.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ut},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ut},clearcoatNormalScale:{value:new xt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ut},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ut},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ut},sheen:{value:0},sheenColor:{value:new st(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ut},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ut},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ut},transmissionSamplerSize:{value:new xt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ut},attenuationDistance:{value:0},attenuationColor:{value:new st(0)},specularColor:{value:new st(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ut},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ut},anisotropyVector:{value:new xt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ut}}]),vertexShader:bt.meshphysical_vert,fragmentShader:bt.meshphysical_frag};var Wu={r:0,b:0,g:0},SM=new ft,t0=new ut;t0.set(-1,0,0,0,1,0,0,0,1);function bM(n,e,t,i,r,s){let a=new st(0),o=r===!0?0:1,c,l,u=null,h=0,f=null;function m(T){let I=T.isScene===!0?T.background:null;if(I&&I.isTexture){let E=T.backgroundBlurriness>0;I=e.get(I,E)}return I}function x(T){let I=!1,E=m(T);E===null?g(a,o):E&&E.isColor&&(g(E,1),I=!0);let w=n.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,s):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||I)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function v(T,I){let E=m(I);E&&(E.isCubeTexture||E.mapping===tl)?(l===void 0&&(l=new cn(new Ua(1,1,1),new ni({name:"BackgroundCubeMaterial",uniforms:Us(ji.backgroundCube.uniforms),vertexShader:ji.backgroundCube.vertexShader,fragmentShader:ji.backgroundCube.fragmentShader,side:Dn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(w,R,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=E,l.material.uniforms.backgroundBlurriness.value=I.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=I.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(SM.makeRotationFromEuler(I.backgroundRotation)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(t0),l.material.toneMapped=Et.getTransfer(E.colorSpace)!==Ot,(u!==E||h!==E.version||f!==n.toneMapping)&&(l.material.needsUpdate=!0,u=E,h=E.version,f=n.toneMapping),l.layers.enableAll(),T.unshift(l,l.geometry,l.material,0,0,null)):E&&E.isTexture&&(c===void 0&&(c=new cn(new Is(2,2),new ni({name:"BackgroundMaterial",uniforms:Us(ji.background.uniforms),vertexShader:ji.background.vertexShader,fragmentShader:ji.background.fragmentShader,side:Yi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=E,c.material.uniforms.backgroundIntensity.value=I.backgroundIntensity,c.material.toneMapped=Et.getTransfer(E.colorSpace)!==Ot,E.matrixAutoUpdate===!0&&E.updateMatrix(),c.material.uniforms.uvTransform.value.copy(E.matrix),(u!==E||h!==E.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,u=E,h=E.version,f=n.toneMapping),c.layers.enableAll(),T.unshift(c,c.geometry,c.material,0,0,null))}function g(T,I){T.getRGB(Wu,of(n)),t.buffers.color.setClear(Wu.r,Wu.g,Wu.b,I,s)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(T,I=1){a.set(T),o=I,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(T){o=T,g(a,o)},render:x,addToRenderList:v,dispose:_}}function MM(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=f(null),s=r,a=!1;function o(W,q,Q,G,J){let oe=!1,re=h(W,G,Q,q);s!==re&&(s=re,l(s.object)),oe=m(W,G,Q,J),oe&&x(W,G,Q,J),J!==null&&e.update(J,n.ELEMENT_ARRAY_BUFFER),(oe||a)&&(a=!1,E(W,q,Q,G),J!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(J).buffer))}function c(){return n.createVertexArray()}function l(W){return n.bindVertexArray(W)}function u(W){return n.deleteVertexArray(W)}function h(W,q,Q,G){let J=G.wireframe===!0,oe=i[q.id];oe===void 0&&(oe={},i[q.id]=oe);let re=W.isInstancedMesh===!0?W.id:0,pe=oe[re];pe===void 0&&(pe={},oe[re]=pe);let ne=pe[Q.id];ne===void 0&&(ne={},pe[Q.id]=ne);let ue=ne[J];return ue===void 0&&(ue=f(c()),ne[J]=ue),ue}function f(W){let q=[],Q=[],G=[];for(let J=0;J<t;J++)q[J]=0,Q[J]=0,G[J]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:q,enabledAttributes:Q,attributeDivisors:G,object:W,attributes:{},index:null}}function m(W,q,Q,G){let J=s.attributes,oe=q.attributes,re=0,pe=Q.getAttributes();for(let ne in pe)if(pe[ne].location>=0){let de=J[ne],He=oe[ne];if(He===void 0&&(ne==="instanceMatrix"&&W.instanceMatrix&&(He=W.instanceMatrix),ne==="instanceColor"&&W.instanceColor&&(He=W.instanceColor)),de===void 0||de.attribute!==He||He&&de.data!==He.data)return!0;re++}return s.attributesNum!==re||s.index!==G}function x(W,q,Q,G){let J={},oe=q.attributes,re=0,pe=Q.getAttributes();for(let ne in pe)if(pe[ne].location>=0){let de=oe[ne];de===void 0&&(ne==="instanceMatrix"&&W.instanceMatrix&&(de=W.instanceMatrix),ne==="instanceColor"&&W.instanceColor&&(de=W.instanceColor));let He={};He.attribute=de,de&&de.data&&(He.data=de.data),J[ne]=He,re++}s.attributes=J,s.attributesNum=re,s.index=G}function v(){let W=s.newAttributes;for(let q=0,Q=W.length;q<Q;q++)W[q]=0}function g(W){_(W,0)}function _(W,q){let Q=s.newAttributes,G=s.enabledAttributes,J=s.attributeDivisors;Q[W]=1,G[W]===0&&(n.enableVertexAttribArray(W),G[W]=1),J[W]!==q&&(n.vertexAttribDivisor(W,q),J[W]=q)}function T(){let W=s.newAttributes,q=s.enabledAttributes;for(let Q=0,G=q.length;Q<G;Q++)q[Q]!==W[Q]&&(n.disableVertexAttribArray(Q),q[Q]=0)}function I(W,q,Q,G,J,oe,re){re===!0?n.vertexAttribIPointer(W,q,Q,J,oe):n.vertexAttribPointer(W,q,Q,G,J,oe)}function E(W,q,Q,G){v();let J=G.attributes,oe=Q.getAttributes(),re=q.defaultAttributeValues;for(let pe in oe){let ne=oe[pe];if(ne.location>=0){let ue=J[pe];if(ue===void 0&&(pe==="instanceMatrix"&&W.instanceMatrix&&(ue=W.instanceMatrix),pe==="instanceColor"&&W.instanceColor&&(ue=W.instanceColor)),ue!==void 0){let de=ue.normalized,He=ue.itemSize,Ce=e.get(ue);if(Ce===void 0)continue;let dt=Ce.buffer,nt=Ce.type,vt=Ce.bytesPerElement,ie=nt===n.INT||nt===n.UNSIGNED_INT||ue.gpuType===ru;if(ue.isInterleavedBufferAttribute){let te=ue.data,Ne=te.stride,Je=ue.offset;if(te.isInstancedInterleavedBuffer){for(let Ee=0;Ee<ne.locationSize;Ee++)_(ne.location+Ee,te.meshPerAttribute);W.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let Ee=0;Ee<ne.locationSize;Ee++)g(ne.location+Ee);n.bindBuffer(n.ARRAY_BUFFER,dt);for(let Ee=0;Ee<ne.locationSize;Ee++)I(ne.location+Ee,He/ne.locationSize,nt,de,Ne*vt,(Je+He/ne.locationSize*Ee)*vt,ie)}else{if(ue.isInstancedBufferAttribute){for(let te=0;te<ne.locationSize;te++)_(ne.location+te,ue.meshPerAttribute);W.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let te=0;te<ne.locationSize;te++)g(ne.location+te);n.bindBuffer(n.ARRAY_BUFFER,dt);for(let te=0;te<ne.locationSize;te++)I(ne.location+te,He/ne.locationSize,nt,de,He*vt,He/ne.locationSize*te*vt,ie)}}else if(re!==void 0){let de=re[pe];if(de!==void 0)switch(de.length){case 2:n.vertexAttrib2fv(ne.location,de);break;case 3:n.vertexAttrib3fv(ne.location,de);break;case 4:n.vertexAttrib4fv(ne.location,de);break;default:n.vertexAttrib1fv(ne.location,de)}}}}T()}function w(){N();for(let W in i){let q=i[W];for(let Q in q){let G=q[Q];for(let J in G){let oe=G[J];for(let re in oe)u(oe[re].object),delete oe[re];delete G[J]}}delete i[W]}}function R(W){if(i[W.id]===void 0)return;let q=i[W.id];for(let Q in q){let G=q[Q];for(let J in G){let oe=G[J];for(let re in oe)u(oe[re].object),delete oe[re];delete G[J]}}delete i[W.id]}function C(W){for(let q in i){let Q=i[q];for(let G in Q){let J=Q[G];if(J[W.id]===void 0)continue;let oe=J[W.id];for(let re in oe)u(oe[re].object),delete oe[re];delete J[W.id]}}}function y(W){for(let q in i){let Q=i[q],G=W.isInstancedMesh===!0?W.id:0,J=Q[G];if(J!==void 0){for(let oe in J){let re=J[oe];for(let pe in re)u(re[pe].object),delete re[pe];delete J[oe]}delete Q[G],Object.keys(Q).length===0&&delete i[q]}}}function N(){k(),a=!0,s!==r&&(s=r,l(s.object))}function k(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:N,resetDefaultState:k,dispose:w,releaseStatesOfGeometry:R,releaseStatesOfObject:y,releaseStatesOfProgram:C,initAttributes:v,enableAttribute:g,disableUnusedAttributes:T}}function EM(n,e,t){let i;function r(c){i=c}function s(c,l){n.drawArrays(i,c,l),t.update(l,i,1)}function a(c,l,u){u!==0&&(n.drawArraysInstanced(i,c,l,u),t.update(l,i,u))}function o(c,l,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,u);let f=0;for(let m=0;m<u;m++)f+=l[m];t.update(f,i,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function TM(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let C=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(C){return!(C!==ri&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){let y=C===Ni&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==qn&&C!==ii&&!y&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function c(C){if(C==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",u=c(l);u!==l&&(Ze("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let h=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&f===!1&&Ze("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let m=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),_=n.getParameter(n.MAX_VERTEX_ATTRIBS),T=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),I=n.getParameter(n.MAX_VARYING_VECTORS),E=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),w=n.getParameter(n.MAX_SAMPLES),R=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:h,reversedDepthBuffer:f,maxTextures:m,maxVertexTextures:x,maxTextureSize:v,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:T,maxVaryings:I,maxFragmentUniforms:E,maxSamples:w,samples:R}}function AM(n){let e=this,t=null,i=0,r=!1,s=!1,a=new Ei,o=new ut,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){let m=h.length!==0||f||i!==0||r;return r=f,i=h.length,m},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,f){t=u(h,f,0)},this.setState=function(h,f,m){let x=h.clippingPlanes,v=h.clipIntersection,g=h.clipShadows,_=n.get(h);if(!r||x===null||x.length===0||s&&!g)s?u(null):l();else{let T=s?0:i,I=T*4,E=_.clippingState||null;c.value=E,E=u(x,f,I,m);for(let w=0;w!==I;++w)E[w]=t[w];_.clippingState=E,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=T}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(h,f,m,x){let v=h!==null?h.length:0,g=null;if(v!==0){if(g=c.value,x!==!0||g===null){let _=m+v*4,T=f.matrixWorldInverse;o.getNormalMatrix(T),(g===null||g.length<_)&&(g=new Float32Array(_));for(let I=0,E=m;I!==v;++I,E+=4)a.copy(h[I]).applyMatrix4(T,o),a.normal.toArray(g,E),g[E+3]=a.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,g}}var Ya=4,wM=6,RM=20,IM=256,cl=new qi,L_=new st,hf=null,df=0,ff=0,pf=!1,CM=new Z,Os=new Z,qu=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){let{size:a=256,position:o=CM}=s;hf=this._renderer.getRenderTarget(),df=this._renderer.getActiveCubeFace(),ff=this._renderer.getActiveMipmapLevel(),pf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,r,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=O_(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=U_(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(hf,df,ff),this._renderer.xr.enabled=pf,e.scissorTest=!1,qa(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===qr||e.mapping===Ls?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),hf=this._renderer.getRenderTarget(),df=this._renderer.getActiveCubeFace(),ff=this._renderer.getActiveMipmapLevel(),pf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Jt,minFilter:Jt,generateMipmaps:!1,type:Ni,format:ri,colorSpace:Ln,depthBuffer:!1},r=D_(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=D_(e,t,i);let{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=PM(s)),this._blurMaterial=LM(s,e,t),this._ggxMaterial=NM(s,e,t)}return r}_compileMaterial(e){let t=new cn(new Mn,e);this._renderer.compile(t,cl)}_sceneToCubeUV(e,t,i,r,s){let c=new _n(90,1,t,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,m=h.toneMapping;h.getClearColor(L_),h.toneMapping=Ii,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(r),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new cn(new Ua,new Hn({name:"PMREM.Background",side:Dn,depthWrite:!1,depthTest:!1})));let v=this._backgroundBox,g=v.material,_=!1,T=e.background;T?T.isColor&&(g.color.copy(T),e.background=null,_=!0):(g.color.copy(L_),_=!0);for(let I=0;I<6;I++){let E=I%3;E===0?(c.up.set(0,l[I],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+u[I],s.y,s.z)):E===1?(c.up.set(0,0,l[I]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+u[I],s.z)):(c.up.set(0,l[I],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+u[I]));let w=this._cubeSize;qa(r,E*w,I>2?w:0,w,w),h.setRenderTarget(r),_&&h.render(v,c),h.render(e,c)}h.toneMapping=m,h.autoClear=f,e.background=T}_textureToCubeUV(e,t){let i=this._renderer,r=e.mapping===qr||e.mapping===Ls;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=O_()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=U_());let s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;let o=s.uniforms;o.envMap.value=e;let c=this._cubeSize;qa(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(a,cl)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){let r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;let c=a.uniforms,l=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),h=Math.sqrt(l*l-u*u),f=l*1.25,m=h*f,{_lodMax:x}=this,v=this._sizeLods[i],g=3*v*(i>x-Ya?i-x+Ya:0),_=4*(this._cubeSize-v);c.envMap.value=e.texture,c.roughness.value=m,c.mipInt.value=x-t,qa(s,g,_,3*v,2*v),r.setRenderTarget(s),r.render(o,cl),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=x-i,qa(e,g,_,3*v,2*v),r.setRenderTarget(e),r.render(o,cl)}_blur(e,t,i,r){let s=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,s,t,i,a),this._blurPass(s,e,i,i,a)}_blurPass(e,t,i,r,s){let a=this._renderer,o=this._blurMaterial,c=this._lodMeshes[r];c.material=o;let l=o.uniforms;l.envMap.value=e.texture,l.sigma.value=s,l.mipInt.value=this._lodMax-i;let u=this._sizeLods[r],h=3*u*(r>this._lodMax-Ya?r-this._lodMax+Ya:0),f=4*(this._cubeSize-u);qa(t,h,f,3*u,2*u),a.setRenderTarget(t),a.render(c,cl)}};function PM(n){let e=[],t=[],i=n,r=n-Ya+1+wM;for(let s=0;s<r;s++){let a=Math.pow(2,i);e.push(a);let o=1/(a-2),c=-o,l=1+o,u=[c,c,l,c,l,l,c,c,l,l,c,l],h=6,f=6,m=3,x=new Float32Array(m*f*h),v=new Float32Array(m*f*h);for(let _=0;_<h;_++){let T=_%3*2/3-1,I=_>2?0:-1,E=[T,I,0,T+2/3,I,0,T+2/3,I+1,0,T,I,0,T+2/3,I+1,0,T,I+1,0];x.set(E,m*f*_);for(let w=0;w<f;w++){let R=u[w*2]*2-1,C=u[w*2+1]*2-1;_===0?Os.set(1,C,R):_===1?Os.set(-R,1,-C):_===2?Os.set(-R,C,1):_===3?Os.set(-1,C,-R):_===4?Os.set(-R,-1,C):Os.set(R,C,-1),Os.toArray(v,(_*f+w)*m)}}let g=new Mn;g.setAttribute("position",new hn(x,m)),g.setAttribute("outputDirection",new hn(v,m)),t.push(new cn(g,null)),i>Ya&&i--}return{lodMeshes:t,sizeLods:e}}function D_(n,e,t){let i=new zn(n,e,t);return i.texture.mapping=tl,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function qa(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function NM(n,e,t){return new ni({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:IM,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ku(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Zi,depthTest:!1,depthWrite:!1})}function LM(n,e,t){return new ni({name:"SphericalGaussianBlur",defines:{SAMPLES:RM,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Ku(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Zi,depthTest:!1,depthWrite:!1})}function U_(){return new ni({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ku(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Zi,depthTest:!1,depthWrite:!1})}function O_(){return new ni({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ku(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Zi,depthTest:!1,depthWrite:!1})}function Ku(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Yu=class extends zn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Ho(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Ua(5,5,5),s=new ni({name:"CubemapFromEquirect",uniforms:Us(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Dn,blending:Zi});s.uniforms.tEquirect.value=t;let a=new cn(r,s),o=t.minFilter;return t.minFilter===Ci&&(t.minFilter=Jt),new Qc(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}};function DM(n){let e=new WeakMap,t=new WeakMap,i=null;function r(f,m=!1){return f==null?null:m?a(f):s(f)}function s(f){if(f&&f.isTexture){let m=f.mapping;if(m===tu||m===nu)if(e.has(f)){let x=e.get(f).texture;return o(x,f.mapping)}else{let x=f.image;if(x&&x.height>0){let v=new Yu(x.height);return v.fromEquirectangularTexture(n,f),e.set(f,v),f.addEventListener("dispose",l),o(v.texture,f.mapping)}else return null}}return f}function a(f){if(f&&f.isTexture){let m=f.mapping,x=m===tu||m===nu,v=m===qr||m===Ls;if(x||v){let g=t.get(f),_=g!==void 0?g.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==_)return i===null&&(i=new qu(n)),g=x?i.fromEquirectangular(f,g):i.fromCubemap(f,g),g.texture.pmremVersion=f.pmremVersion,t.set(f,g),g.texture;if(g!==void 0)return g.texture;{let T=f.image;return x&&T&&T.height>0||v&&T&&c(T)?(i===null&&(i=new qu(n)),g=x?i.fromEquirectangular(f):i.fromCubemap(f),g.texture.pmremVersion=f.pmremVersion,t.set(f,g),f.addEventListener("dispose",u),g.texture):null}}}return f}function o(f,m){return m===tu?f.mapping=qr:m===nu&&(f.mapping=Ls),f}function c(f){let m=0,x=6;for(let v=0;v<x;v++)f[v]!==void 0&&m++;return m===x}function l(f){let m=f.target;m.removeEventListener("dispose",l);let x=e.get(m);x!==void 0&&(e.delete(m),x.dispose())}function u(f){let m=f.target;m.removeEventListener("dispose",u);let x=t.get(m);x!==void 0&&(t.delete(m),x.dispose())}function h(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:h}}function UM(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let r=t(i);return r===null&&Es("WebGLRenderer: "+i+" extension not supported."),r}}}function OM(n,e,t,i){let r={},s=new WeakMap;function a(h){let f=h.target;f.index!==null&&e.remove(f.index);for(let x in f.attributes)e.remove(f.attributes[x]);f.removeEventListener("dispose",a),delete r[f.id];let m=s.get(f);m&&(e.remove(m),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(h,f){return r[f.id]===!0||(f.addEventListener("dispose",a),r[f.id]=!0,t.memory.geometries++),f}function c(h){let f=h.attributes;for(let m in f)e.update(f[m],n.ARRAY_BUFFER)}function l(h){let f=[],m=h.index,x=h.attributes.position,v=0;if(x===void 0)return;if(m!==null){let T=m.array;v=m.version;for(let I=0,E=T.length;I<E;I+=3){let w=T[I+0],R=T[I+1],C=T[I+2];f.push(w,R,R,C,C,w)}}else{let T=x.array;v=x.version;for(let I=0,E=T.length/3-1;I<E;I+=3){let w=I+0,R=I+1,C=I+2;f.push(w,R,R,C,C,w)}}let g=new(x.count>=65535?Oo:Uo)(f,1);g.version=v;let _=s.get(h);_&&e.remove(_),s.set(h,g)}function u(h){let f=s.get(h);if(f){let m=h.index;m!==null&&f.version<m.version&&l(h)}else l(h);return s.get(h)}return{get:o,update:c,getWireframeAttribute:u}}function FM(n,e,t){let i;function r(h){i=h}let s,a;function o(h){s=h.type,a=h.bytesPerElement}function c(h,f){n.drawElements(i,f,s,h*a),t.update(f,i,1)}function l(h,f,m){m!==0&&(n.drawElementsInstanced(i,f,s,h*a,m),t.update(f,i,m))}function u(h,f,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,s,h,0,m);let v=0;for(let g=0;g<m;g++)v+=f[g];t.update(v,i,1)}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function BM(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:rt("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function kM(n,e,t){let i=new WeakMap,r=new kt;function s(a,o,c){let l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0,f=i.get(o);if(f===void 0||f.count!==h){let N=function(){C.dispose(),i.delete(o),o.removeEventListener("dispose",N)};f!==void 0&&f.texture.dispose();let m=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],_=o.morphAttributes.normal||[],T=o.morphAttributes.color||[],I=0;m===!0&&(I=1),x===!0&&(I=2),v===!0&&(I=3);let E=o.attributes.position.count*I,w=1;E>e.maxTextureSize&&(w=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);let R=new Float32Array(E*w*4*h),C=new Lo(R,E,w,h);C.type=ii,C.needsUpdate=!0;let y=I*4;for(let k=0;k<h;k++){let W=g[k],q=_[k],Q=T[k],G=E*w*4*k;for(let J=0;J<W.count;J++){let oe=J*y;m===!0&&(r.fromBufferAttribute(W,J),R[G+oe+0]=r.x,R[G+oe+1]=r.y,R[G+oe+2]=r.z,R[G+oe+3]=0),x===!0&&(r.fromBufferAttribute(q,J),R[G+oe+4]=r.x,R[G+oe+5]=r.y,R[G+oe+6]=r.z,R[G+oe+7]=0),v===!0&&(r.fromBufferAttribute(Q,J),R[G+oe+8]=r.x,R[G+oe+9]=r.y,R[G+oe+10]=r.z,R[G+oe+11]=Q.itemSize===4?r.w:1)}}f={count:h,texture:C,size:new xt(E,w)},i.set(o,f),o.addEventListener("dispose",N)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let m=0;for(let v=0;v<l.length;v++)m+=l[v];let x=o.morphTargetsRelative?1:1-m;c.getUniforms().setValue(n,"morphTargetBaseInfluence",x),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:s}}function zM(n,e,t,i,r){let s=new WeakMap;function a(l){let u=r.render.frame,h=l.geometry,f=e.get(l,h);if(s.get(f)!==u&&(e.update(f),s.set(f,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),s.get(l)!==u&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,u))),l.isSkinnedMesh){let m=l.skeleton;s.get(m)!==u&&(m.update(),s.set(m,u))}return f}function o(){s=new WeakMap}function c(l){let u=l.target;u.removeEventListener("dispose",c),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}var VM={[Gd]:"LINEAR_TONE_MAPPING",[Hd]:"REINHARD_TONE_MAPPING",[Wd]:"CINEON_TONE_MAPPING",[Xd]:"ACES_FILMIC_TONE_MAPPING",[Yd]:"AGX_TONE_MAPPING",[Zd]:"NEUTRAL_TONE_MAPPING",[qd]:"CUSTOM_TONE_MAPPING"};function GM(n,e,t,i,r,s){let a=new zn(e,t,{type:n,depthBuffer:r,stencilBuffer:s,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,c=null,l=new Mn;l.setAttribute("position",new xn([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new xn([0,2,0,0,2,0],2));let u=new Hc({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),h=new cn(l,u),f=new qi(-1,1,1,-1,0,1),m=null,x=null,v=!1,g,_=null,T=[],I=!1;this.setSize=function(E,w){a.setSize(E,w),o!==null&&o.setSize(E,w),c!==null&&c.setSize(E,w);for(let R=0;R<T.length;R++){let C=T[R];C.setSize&&C.setSize(E,w)}},this.setEffects=function(E){T=E,I=T.length>0&&T[0].isRenderPass===!0;let w=a.width,R=a.height;T.length>0&&o===null&&(o=new zn(w,R,{type:Ni,depthBuffer:!1,stencilBuffer:!1}),c=new zn(w,R,{type:Ni,depthBuffer:!1,stencilBuffer:!1}));for(let C=0;C<T.length;C++){let y=T[C];y.setSize&&y.setSize(w,R)}},this.begin=function(E,w){if(v||E.toneMapping===Ii&&T.length===0)return!1;if(_=w,w!==null){let R=w.width,C=w.height;(a.width!==R||a.height!==C)&&this.setSize(R,C)}return I===!1&&E.setRenderTarget(a),g=E.toneMapping,E.toneMapping=Ii,!0},this.hasRenderPass=function(){return I},this.end=function(E,w){E.toneMapping=g,v=!0;let R=a,C=o;for(let y=0;y<T.length;y++){let N=T[y];N.enabled!==!1&&(N.render(E,C,R,w),N.needsSwap!==!1&&(R=C,C=C===o?c:o))}if(m!==E.outputColorSpace||x!==E.toneMapping){m=E.outputColorSpace,x=E.toneMapping,u.defines={},Et.getTransfer(m)===Ot&&(u.defines.SRGB_TRANSFER="");let y=VM[x];y&&(u.defines[y]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=R.texture,E.setRenderTarget(_),E.render(h,f),_=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var n0=new vn,_f=new Wr(1,1),i0=new Lo,r0=new kc,s0=new Ho,F_=[],B_=[],k_=new Float32Array(16),z_=new Float32Array(9),V_=new Float32Array(4);function Ka(n,e,t){let i=n[0];if(i<=0||i>0)return n;let r=e*t,s=F_[r];if(s===void 0&&(s=new Float32Array(r),F_[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function dn(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function fn(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function ju(n,e){let t=B_[e];t===void 0&&(t=new Int32Array(e),B_[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function HM(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function WM(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(dn(t,e))return;n.uniform2fv(this.addr,e),fn(t,e)}}function XM(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(dn(t,e))return;n.uniform3fv(this.addr,e),fn(t,e)}}function qM(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(dn(t,e))return;n.uniform4fv(this.addr,e),fn(t,e)}}function YM(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(dn(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),fn(t,e)}else{if(dn(t,i))return;V_.set(i),n.uniformMatrix2fv(this.addr,!1,V_),fn(t,i)}}function ZM(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(dn(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),fn(t,e)}else{if(dn(t,i))return;z_.set(i),n.uniformMatrix3fv(this.addr,!1,z_),fn(t,i)}}function KM(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(dn(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),fn(t,e)}else{if(dn(t,i))return;k_.set(i),n.uniformMatrix4fv(this.addr,!1,k_),fn(t,i)}}function jM(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function $M(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(dn(t,e))return;n.uniform2iv(this.addr,e),fn(t,e)}}function JM(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(dn(t,e))return;n.uniform3iv(this.addr,e),fn(t,e)}}function QM(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(dn(t,e))return;n.uniform4iv(this.addr,e),fn(t,e)}}function eE(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function tE(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(dn(t,e))return;n.uniform2uiv(this.addr,e),fn(t,e)}}function nE(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(dn(t,e))return;n.uniform3uiv(this.addr,e),fn(t,e)}}function iE(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(dn(t,e))return;n.uniform4uiv(this.addr,e),fn(t,e)}}function rE(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(_f.compareFunction=t.isReversedDepthBuffer()?Hu:Gu,s=_f):s=n0,t.setTexture2D(e||s,r)}function sE(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||r0,r)}function aE(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||s0,r)}function oE(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||i0,r)}function lE(n){switch(n){case 5126:return HM;case 35664:return WM;case 35665:return XM;case 35666:return qM;case 35674:return YM;case 35675:return ZM;case 35676:return KM;case 5124:case 35670:return jM;case 35667:case 35671:return $M;case 35668:case 35672:return JM;case 35669:case 35673:return QM;case 5125:return eE;case 36294:return tE;case 36295:return nE;case 36296:return iE;case 35678:case 36198:case 36298:case 36306:case 35682:return rE;case 35679:case 36299:case 36307:return sE;case 35680:case 36300:case 36308:case 36293:return aE;case 36289:case 36303:case 36311:case 36292:return oE}}function cE(n,e){n.uniform1fv(this.addr,e)}function uE(n,e){let t=Ka(e,this.size,2);n.uniform2fv(this.addr,t)}function hE(n,e){let t=Ka(e,this.size,3);n.uniform3fv(this.addr,t)}function dE(n,e){let t=Ka(e,this.size,4);n.uniform4fv(this.addr,t)}function fE(n,e){let t=Ka(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function pE(n,e){let t=Ka(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function mE(n,e){let t=Ka(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function gE(n,e){n.uniform1iv(this.addr,e)}function _E(n,e){n.uniform2iv(this.addr,e)}function xE(n,e){n.uniform3iv(this.addr,e)}function vE(n,e){n.uniform4iv(this.addr,e)}function yE(n,e){n.uniform1uiv(this.addr,e)}function SE(n,e){n.uniform2uiv(this.addr,e)}function bE(n,e){n.uniform3uiv(this.addr,e)}function ME(n,e){n.uniform4uiv(this.addr,e)}function EE(n,e,t){let i=this.cache,r=e.length,s=ju(t,r);dn(i,s)||(n.uniform1iv(this.addr,s),fn(i,s));let a;this.type===n.SAMPLER_2D_SHADOW?a=_f:a=n0;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function TE(n,e,t){let i=this.cache,r=e.length,s=ju(t,r);dn(i,s)||(n.uniform1iv(this.addr,s),fn(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||r0,s[a])}function AE(n,e,t){let i=this.cache,r=e.length,s=ju(t,r);dn(i,s)||(n.uniform1iv(this.addr,s),fn(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||s0,s[a])}function wE(n,e,t){let i=this.cache,r=e.length,s=ju(t,r);dn(i,s)||(n.uniform1iv(this.addr,s),fn(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||i0,s[a])}function RE(n){switch(n){case 5126:return cE;case 35664:return uE;case 35665:return hE;case 35666:return dE;case 35674:return fE;case 35675:return pE;case 35676:return mE;case 5124:case 35670:return gE;case 35667:case 35671:return _E;case 35668:case 35672:return xE;case 35669:case 35673:return vE;case 5125:return yE;case 36294:return SE;case 36295:return bE;case 36296:return ME;case 35678:case 36198:case 36298:case 36306:case 35682:return EE;case 35679:case 36299:case 36307:return TE;case 35680:case 36300:case 36308:case 36293:return AE;case 36289:case 36303:case 36311:case 36292:return wE}}var xf=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=lE(t.type)}},vf=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=RE(t.type)}},yf=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let r=this.seq;for(let s=0,a=r.length;s!==a;++s){let o=r[s];o.setValue(e,t[o.id],i)}}},mf=/(\w+)(\])?(\[|\.)?/g;function G_(n,e){n.seq.push(e),n.map[e.id]=e}function IE(n,e,t){let i=n.name,r=i.length;for(mf.lastIndex=0;;){let s=mf.exec(i),a=mf.lastIndex,o=s[1],c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===r){G_(t,l===void 0?new xf(o,n,e):new vf(o,n,e));break}else{let h=t.map[o];h===void 0&&(h=new yf(o),G_(t,h)),t=h}}}var Za=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){let o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);IE(o,c,this)}let r=[],s=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){let s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){let r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){let o=t[s],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){let i=[];for(let r=0,s=e.length;r!==s;++r){let a=e[r];a.id in t&&i.push(a)}return i}};function H_(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var CE=37297,PE=0;function NE(n,e){let t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){let o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}var W_=new ut;function LE(n){Et._getMatrix(W_,Et.workingColorSpace,n);let e=`mat3( ${W_.elements.map(t=>t.toFixed(4))} )`;switch(Et.getTransfer(n)){case Po:return[e,"LinearTransferOETF"];case Ot:return[e,"sRGBTransferOETF"];default:return Ze("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function X_(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";let a=/ERROR: 0:(\d+)/.exec(s);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+NE(n.getShaderSource(e),o)}else return s}function DE(n,e){let t=LE(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var UE={[Gd]:"Linear",[Hd]:"Reinhard",[Wd]:"Cineon",[Xd]:"ACESFilmic",[Yd]:"AgX",[Zd]:"Neutral",[qd]:"Custom"};function OE(n,e){let t=UE[e];return t===void 0?(Ze("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Xu=new Z;function FE(){Et.getLuminanceCoefficients(Xu);let n=Xu.x.toFixed(4),e=Xu.y.toFixed(4),t=Xu.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function BE(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(hl).join(`
`)}function kE(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function zE(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){let s=n.getActiveAttrib(e,r),a=s.name,o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function hl(n){return n!==""}function q_(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Y_(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var VE=/^[ \t]*#include +<([\w\d./]+)>/gm;function Sf(n){return n.replace(VE,HE)}var GE=new Map;function HE(n,e){let t=bt[e];if(t===void 0){let i=GE.get(e);if(i!==void 0)t=bt[i],Ze('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Sf(t)}var WE=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Z_(n){return n.replace(WE,XE)}function XE(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function K_(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var qE={[el]:"SHADOWMAP_TYPE_PCF",[ka]:"SHADOWMAP_TYPE_VSM"};function YE(n){return qE[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var ZE={[qr]:"ENVMAP_TYPE_CUBE",[Ls]:"ENVMAP_TYPE_CUBE",[tl]:"ENVMAP_TYPE_CUBE_UV"};function KE(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":ZE[n.envMapMode]||"ENVMAP_TYPE_CUBE"}var jE={[Ls]:"ENVMAP_MODE_REFRACTION"};function $E(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":jE[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var JE={[Vd]:"ENVMAP_BLENDING_MULTIPLY",[d_]:"ENVMAP_BLENDING_MIX",[f_]:"ENVMAP_BLENDING_ADD"};function QE(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":JE[n.combine]||"ENVMAP_BLENDING_NONE"}function eT(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function tT(n,e,t,i){let r=n.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,c=YE(t),l=KE(t),u=$E(t),h=QE(t),f=eT(t),m=BE(t),x=kE(s),v=r.createProgram(),g,_,T=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(hl).join(`
`),g.length>0&&(g+=`
`),_=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(hl).join(`
`),_.length>0&&(_+=`
`)):(g=[K_(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(hl).join(`
`),_=[K_(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ii?"#define TONE_MAPPING":"",t.toneMapping!==Ii?bt.tonemapping_pars_fragment:"",t.toneMapping!==Ii?OE("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",bt.colorspace_pars_fragment,DE("linearToOutputTexel",t.outputColorSpace),FE(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(hl).join(`
`)),a=Sf(a),a=q_(a,t),a=Y_(a,t),o=Sf(o),o=q_(o,t),o=Y_(o,t),a=Z_(a),o=Z_(o),t.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,g=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,_=["#define varying in",t.glslVersion===sf?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===sf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);let I=T+g+a,E=T+_+o,w=H_(r,r.VERTEX_SHADER,I),R=H_(r,r.FRAGMENT_SHADER,E);r.attachShader(v,w),r.attachShader(v,R),t.index0AttributeName!==void 0?r.bindAttribLocation(v,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function C(W){if(n.debug.checkShaderErrors){let q=r.getProgramInfoLog(v)||"",Q=r.getShaderInfoLog(w)||"",G=r.getShaderInfoLog(R)||"",J=q.trim(),oe=Q.trim(),re=G.trim(),pe=!0,ne=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(pe=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,v,w,R);else{let ue=X_(r,w,"vertex"),de=X_(r,R,"fragment");rt("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+W.name+`
Material Type: `+W.type+`

Program Info Log: `+J+`
`+ue+`
`+de)}else J!==""?Ze("WebGLProgram: Program Info Log:",J):(oe===""||re==="")&&(ne=!1);ne&&(W.diagnostics={runnable:pe,programLog:J,vertexShader:{log:oe,prefix:g},fragmentShader:{log:re,prefix:_}})}r.deleteShader(w),r.deleteShader(R),y=new Za(r,v),N=zE(r,v)}let y;this.getUniforms=function(){return y===void 0&&C(this),y};let N;this.getAttributes=function(){return N===void 0&&C(this),N};let k=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return k===!1&&(k=r.getProgramParameter(v,CE)),k},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=PE++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=w,this.fragmentShader=R,this}var nT=0,bf=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new Mf(e),t.set(e,i)),i}},Mf=class{constructor(e){this.id=nT++,this.code=e,this.usedTimes=0}};function iT(n){return n===Zr||n===al||n===ol}function rT(n,e,t,i,r,s){let a=new Aa,o=new bf,c=new Set,l=[],u=new Map,h=i.logarithmicDepthBuffer,f=i.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(y){return c.add(y),y===0?"uv":`uv${y}`}function v(y,N,k,W,q,Q){let G=W.fog,J=q.geometry,oe=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?W.environment:null,re=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,pe=e.get(y.envMap||oe,re),ne=pe&&pe.mapping===tl?pe.image.height:null,ue=m[y.type];y.precision!==null&&(f=i.getMaxPrecision(y.precision),f!==y.precision&&Ze("WebGLProgram.getParameters:",y.precision,"not supported, using",f,"instead."));let de=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,He=de!==void 0?de.length:0,Ce=0;J.morphAttributes.position!==void 0&&(Ce=1),J.morphAttributes.normal!==void 0&&(Ce=2),J.morphAttributes.color!==void 0&&(Ce=3);let dt,nt,vt,ie;if(ue){let zt=ji[ue];dt=zt.vertexShader,nt=zt.fragmentShader}else{dt=y.vertexShader,nt=y.fragmentShader;let zt=o.getVertexShaderStage(y),Lt=o.getFragmentShaderStage(y);o.update(y,zt,Lt),vt=zt.id,ie=Lt.id}let te=n.getRenderTarget(),Ne=n.state.buffers.depth.getReversed(),Je=q.isInstancedMesh===!0,Ee=q.isBatchedMesh===!0,lt=!!y.map,It=!!y.matcap,ct=!!pe,St=!!y.aoMap,Ct=!!y.lightMap,j=!!y.bumpMap&&y.wireframe===!1,_e=!!y.normalMap,ze=!!y.displacementMap,Ke=!!y.emissiveMap,Qe=!!y.metalnessMap,$e=!!y.roughnessMap,B=y.anisotropy>0,xe=y.clearcoat>0,me=y.dispersion>0,p=y.retroreflectivity>0,d=y.iridescence>0,S=y.sheen>0,A=y.transmission>0,P=B&&!!y.anisotropyMap,D=xe&&!!y.clearcoatMap,X=xe&&!!y.clearcoatNormalMap,L=xe&&!!y.clearcoatRoughnessMap,F=d&&!!y.iridescenceMap,se=d&&!!y.iridescenceThicknessMap,ge=S&&!!y.sheenColorMap,le=S&&!!y.sheenRoughnessMap,he=!!y.specularMap,Pe=!!y.specularColorMap,Oe=!!y.specularIntensityMap,at=A&&!!y.transmissionMap,H=A&&!!y.thicknessMap,Te=!!y.gradientMap,ce=!!y.alphaMap,Me=y.alphaTest>0,we=!!y.alphaHash,fe=!!y.extensions,qe=Ii;y.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(qe=n.toneMapping);let Be={shaderID:ue,shaderType:y.type,shaderName:y.name,vertexShader:dt,fragmentShader:nt,defines:y.defines,customVertexShaderID:vt,customFragmentShaderID:ie,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:f,batching:Ee,batchingColor:Ee&&q._colorsTexture!==null,instancing:Je,instancingColor:Je&&q.instanceColor!==null,instancingMorph:Je&&q.morphTexture!==null,outputColorSpace:te===null?n.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:Et.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:lt,matcap:It,envMap:ct,envMapMode:ct&&pe.mapping,envMapCubeUVHeight:ne,aoMap:St,lightMap:Ct,bumpMap:j,normalMap:_e,displacementMap:ze,emissiveMap:Ke,normalMapObjectSpace:_e&&y.normalMapType===__,normalMapTangentSpace:_e&&y.normalMapType===Vu,packedNormalMap:_e&&y.normalMapType===Vu&&iT(y.normalMap.format),metalnessMap:Qe,roughnessMap:$e,anisotropy:B,anisotropyMap:P,clearcoat:xe,clearcoatMap:D,clearcoatNormalMap:X,clearcoatRoughnessMap:L,dispersion:me,retroreflection:p,iridescence:d,iridescenceMap:F,iridescenceThicknessMap:se,sheen:S,sheenColorMap:ge,sheenRoughnessMap:le,specularMap:he,specularColorMap:Pe,specularIntensityMap:Oe,transmission:A,transmissionMap:at,thicknessMap:H,gradientMap:Te,opaque:y.transparent===!1&&y.blending===za&&y.alphaToCoverage===!1,alphaMap:ce,alphaTest:Me,alphaHash:we,combine:y.combine,mapUv:lt&&x(y.map.channel),aoMapUv:St&&x(y.aoMap.channel),lightMapUv:Ct&&x(y.lightMap.channel),bumpMapUv:j&&x(y.bumpMap.channel),normalMapUv:_e&&x(y.normalMap.channel),displacementMapUv:ze&&x(y.displacementMap.channel),emissiveMapUv:Ke&&x(y.emissiveMap.channel),metalnessMapUv:Qe&&x(y.metalnessMap.channel),roughnessMapUv:$e&&x(y.roughnessMap.channel),anisotropyMapUv:P&&x(y.anisotropyMap.channel),clearcoatMapUv:D&&x(y.clearcoatMap.channel),clearcoatNormalMapUv:X&&x(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:L&&x(y.clearcoatRoughnessMap.channel),iridescenceMapUv:F&&x(y.iridescenceMap.channel),iridescenceThicknessMapUv:se&&x(y.iridescenceThicknessMap.channel),sheenColorMapUv:ge&&x(y.sheenColorMap.channel),sheenRoughnessMapUv:le&&x(y.sheenRoughnessMap.channel),specularMapUv:he&&x(y.specularMap.channel),specularColorMapUv:Pe&&x(y.specularColorMap.channel),specularIntensityMapUv:Oe&&x(y.specularIntensityMap.channel),transmissionMapUv:at&&x(y.transmissionMap.channel),thicknessMapUv:H&&x(y.thicknessMap.channel),alphaMapUv:ce&&x(y.alphaMap.channel),vertexTangents:!!J.attributes.tangent&&(_e||B),vertexNormals:!!J.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,pointsUvs:q.isPoints===!0&&!!J.attributes.uv&&(lt||ce),fog:!!G,useFog:y.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||J.attributes.normal===void 0&&_e===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:Ne,skinning:q.isSkinnedMesh===!0,hasPositionAttribute:J.attributes.position!==void 0,morphTargets:J.morphAttributes.position!==void 0,morphNormals:J.morphAttributes.normal!==void 0,morphColors:J.morphAttributes.color!==void 0,morphTargetsCount:He,morphTextureStride:Ce,numSunLights:N.sun.length,numDirLights:N.directional.length,numPointLights:N.point.length,numSpotLights:N.spot.length,numSpotLightMaps:N.spotLightMap.length,numRectAreaLights:N.rectArea.length,numHemiLights:N.hemi.length,numSunLightShadows:N.sunShadowMap.length,numDirLightShadows:N.directionalShadowMap.length,numPointLightShadows:N.pointShadowMap.length,numSpotLightShadows:N.spotShadowMap.length,numSpotLightShadowsWithMaps:N.numSpotLightShadowsWithMaps,numLightProbes:N.numLightProbes,numLightProbeGrids:Q.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&k.length>0,shadowMapType:n.shadowMap.type,toneMapping:qe,decodeVideoTexture:lt&&y.map.isVideoTexture===!0&&Et.getTransfer(y.map.colorSpace)===Ot,decodeVideoTextureEmissive:Ke&&y.emissiveMap.isVideoTexture===!0&&Et.getTransfer(y.emissiveMap.colorSpace)===Ot,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Un,flipSided:y.side===Dn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:fe&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(fe&&y.extensions.multiDraw===!0||Ee)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Be.vertexUv1s=c.has(1),Be.vertexUv2s=c.has(2),Be.vertexUv3s=c.has(3),c.clear(),Be}function g(y){let N=[];if(y.shaderID?N.push(y.shaderID):(N.push(y.customVertexShaderID),N.push(y.customFragmentShaderID)),y.defines!==void 0)for(let k in y.defines)N.push(k),N.push(y.defines[k]);return y.isRawShaderMaterial===!1&&(_(N,y),T(N,y),N.push(n.outputColorSpace)),N.push(y.customProgramCacheKey),N.join()}function _(y,N){y.push(N.precision),y.push(N.outputColorSpace),y.push(N.envMapMode),y.push(N.envMapCubeUVHeight),y.push(N.mapUv),y.push(N.alphaMapUv),y.push(N.lightMapUv),y.push(N.aoMapUv),y.push(N.bumpMapUv),y.push(N.normalMapUv),y.push(N.displacementMapUv),y.push(N.emissiveMapUv),y.push(N.metalnessMapUv),y.push(N.roughnessMapUv),y.push(N.anisotropyMapUv),y.push(N.clearcoatMapUv),y.push(N.clearcoatNormalMapUv),y.push(N.clearcoatRoughnessMapUv),y.push(N.iridescenceMapUv),y.push(N.iridescenceThicknessMapUv),y.push(N.sheenColorMapUv),y.push(N.sheenRoughnessMapUv),y.push(N.specularMapUv),y.push(N.specularColorMapUv),y.push(N.specularIntensityMapUv),y.push(N.transmissionMapUv),y.push(N.thicknessMapUv),y.push(N.combine),y.push(N.fogExp2),y.push(N.sizeAttenuation),y.push(N.morphTargetsCount),y.push(N.morphAttributeCount),y.push(N.numSunLights),y.push(N.numDirLights),y.push(N.numPointLights),y.push(N.numSpotLights),y.push(N.numSpotLightMaps),y.push(N.numHemiLights),y.push(N.numRectAreaLights),y.push(N.numSunLightShadows),y.push(N.numDirLightShadows),y.push(N.numPointLightShadows),y.push(N.numSpotLightShadows),y.push(N.numSpotLightShadowsWithMaps),y.push(N.numLightProbes),y.push(N.shadowMapType),y.push(N.toneMapping),y.push(N.numClippingPlanes),y.push(N.numClipIntersection),y.push(N.depthPacking)}function T(y,N){a.disableAll(),N.instancing&&a.enable(0),N.instancingColor&&a.enable(1),N.instancingMorph&&a.enable(2),N.matcap&&a.enable(3),N.envMap&&a.enable(4),N.normalMapObjectSpace&&a.enable(5),N.normalMapTangentSpace&&a.enable(6),N.clearcoat&&a.enable(7),N.iridescence&&a.enable(8),N.alphaTest&&a.enable(9),N.vertexColors&&a.enable(10),N.vertexAlphas&&a.enable(11),N.vertexUv1s&&a.enable(12),N.vertexUv2s&&a.enable(13),N.vertexUv3s&&a.enable(14),N.vertexTangents&&a.enable(15),N.anisotropy&&a.enable(16),N.alphaHash&&a.enable(17),N.batching&&a.enable(18),N.dispersion&&a.enable(19),N.retroreflection&&a.enable(24),N.batchingColor&&a.enable(20),N.gradientMap&&a.enable(21),N.packedNormalMap&&a.enable(22),N.vertexNormals&&a.enable(23),y.push(a.mask),a.disableAll(),N.fog&&a.enable(0),N.useFog&&a.enable(1),N.flatShading&&a.enable(2),N.logarithmicDepthBuffer&&a.enable(3),N.reversedDepthBuffer&&a.enable(4),N.skinning&&a.enable(5),N.morphTargets&&a.enable(6),N.morphNormals&&a.enable(7),N.morphColors&&a.enable(8),N.premultipliedAlpha&&a.enable(9),N.shadowMapEnabled&&a.enable(10),N.doubleSided&&a.enable(11),N.flipSided&&a.enable(12),N.useDepthPacking&&a.enable(13),N.dithering&&a.enable(14),N.transmission&&a.enable(15),N.sheen&&a.enable(16),N.opaque&&a.enable(17),N.pointsUvs&&a.enable(18),N.decodeVideoTexture&&a.enable(19),N.decodeVideoTextureEmissive&&a.enable(20),N.alphaToCoverage&&a.enable(21),N.numLightProbeGrids>0&&a.enable(22),N.hasPositionAttribute&&a.enable(23),y.push(a.mask)}function I(y){let N=m[y.type],k;if(N){let W=ji[N];k=C_.clone(W.uniforms)}else k=y.uniforms;return k}function E(y,N){let k=u.get(N);return k!==void 0?++k.usedTimes:(k=new tT(n,N,y,r),l.push(k),u.set(N,k)),k}function w(y){if(--y.usedTimes===0){let N=l.indexOf(y);l[N]=l[l.length-1],l.pop(),u.delete(y.cacheKey),y.destroy()}}function R(y){o.remove(y)}function C(){o.dispose()}return{getParameters:v,getProgramCacheKey:g,getUniforms:I,acquireProgram:E,releaseProgram:w,releaseShaderCache:R,programs:l,dispose:C}}function sT(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,c){n.get(a)[o]=c}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function aT(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function j_(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function $_(){let n=[],e=0,t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(f){let m=0;return f.isInstancedMesh&&(m+=2),f.isSkinnedMesh&&(m+=1),m}function o(f,m,x,v,g,_){let T=n[e];return T===void 0?(T={id:f.id,object:f,geometry:m,material:x,materialVariant:a(f),groupOrder:v,renderOrder:f.renderOrder,z:g,group:_},n[e]=T):(T.id=f.id,T.object=f,T.geometry=m,T.material=x,T.materialVariant=a(f),T.groupOrder=v,T.renderOrder=f.renderOrder,T.z=g,T.group=_),e++,T}function c(f,m,x,v,g,_,T){T.reversedDepth===!0&&(g=-g);let I=o(f,m,x,v,g,_);x.transmission>0?i.push(I):x.transparent===!0?r.push(I):t.push(I)}function l(f,m,x,v,g,_){let T=o(f,m,x,v,g,_);x.transmission>0?i.unshift(T):x.transparent===!0?r.unshift(T):t.unshift(T)}function u(f,m){t.length>1&&t.sort(f||aT),i.length>1&&i.sort(m||j_),r.length>1&&r.sort(m||j_)}function h(){for(let f=e,m=n.length;f<m;f++){let x=n[f];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:c,unshift:l,finish:h,sort:u}}function oT(){let n=new WeakMap;function e(i,r){let s=n.get(i),a;return s===void 0?(a=new $_,n.set(i,[a])):r>=s.length?(a=new $_,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function lT(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new Z,color:new st};break;case"SpotLight":t={position:new Z,direction:new Z,color:new st,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new Z,color:new st,distance:0,decay:0};break;case"HemisphereLight":t={direction:new Z,skyColor:new st,groundColor:new st};break;case"RectAreaLight":t={color:new st,position:new Z,halfWidth:new Z,halfHeight:new Z};break}return n[e.id]=t,t}}}function cT(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var uT=0;function hT(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function dT(n){let e=new lT,t=cT(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new Z);let r=new Z,s=new ft,a=new ft;function o(l){let u=0,h=0,f=0;for(let q=0;q<9;q++)i.probe[q].set(0,0,0);let m=0,x=0,v=0,g=0,_=0,T=0,I=0,E=0,w=0,R=0,C=0,y=0,N=0,k=0;l.sort(hT);for(let q=0,Q=l.length;q<Q;q++){let G=l[q],J=G.color,oe=G.intensity,re=G.distance,pe=null;if(G.shadow&&G.shadow.map&&(G.shadow.map.texture.format===Zr?pe=G.shadow.map.texture:pe=G.shadow.map.depthTexture||G.shadow.map.texture),G.isAmbientLight)u+=J.r*oe,h+=J.g*oe,f+=J.b*oe;else if(G.isLightProbe){for(let ne=0;ne<9;ne++)i.probe[ne].addScaledVector(G.sh.coefficients[ne],oe);k++}else if(G.isSunLight){let ne=e.get(G);if(ne.color.copy(G.color).multiplyScalar(G.intensity),G.castShadow){let ue=G.shadow,de=t.get(G);de.shadowIntensity=ue.intensity,de.shadowBias=ue.bias,de.shadowNormalBias=ue.normalBias,de.shadowRadius=ue.radius,de.shadowMapSize.copy(ue.mapSize).multiply(ue.getFrameExtents()),i.sunShadow[x]=de,i.sunShadowMap[x]=pe;let He=ue.getViewportCount();for(let Ce=0;Ce<He;Ce++)i.sunShadowMatrix[v+Ce]=ue.getMatrix(Ce),i.sunShadowCascade[v+Ce]=ue._cascadeData[Ce];v+=He,x++}i.sun[m]=ne,m++}else if(G.isDirectionalLight){let ne=e.get(G);if(ne.color.copy(G.color).multiplyScalar(G.intensity),G.castShadow){let ue=G.shadow,de=t.get(G);de.shadowIntensity=ue.intensity,de.shadowBias=ue.bias,de.shadowNormalBias=ue.normalBias,de.shadowRadius=ue.radius,de.shadowMapSize=ue.mapSize,i.directionalShadow[g]=de,i.directionalShadowMap[g]=pe,i.directionalShadowMatrix[g]=G.shadow.matrix,w++}i.directional[g]=ne,g++}else if(G.isSpotLight){let ne=e.get(G);ne.position.setFromMatrixPosition(G.matrixWorld),ne.color.copy(J).multiplyScalar(oe),ne.distance=re,ne.coneCos=Math.cos(G.angle),ne.penumbraCos=Math.cos(G.angle*(1-G.penumbra)),ne.decay=G.decay,i.spot[T]=ne;let ue=G.shadow;if(G.map&&(i.spotLightMap[y]=G.map,y++,ue.updateMatrices(G),G.castShadow&&N++),i.spotLightMatrix[T]=ue.matrix,G.castShadow){let de=t.get(G);de.shadowIntensity=ue.intensity,de.shadowBias=ue.bias,de.shadowNormalBias=ue.normalBias,de.shadowRadius=ue.radius,de.shadowMapSize=ue.mapSize,i.spotShadow[T]=de,i.spotShadowMap[T]=pe,C++}T++}else if(G.isRectAreaLight){let ne=e.get(G);ne.color.copy(J).multiplyScalar(oe),ne.halfWidth.set(G.width*.5,0,0),ne.halfHeight.set(0,G.height*.5,0),i.rectArea[I]=ne,I++}else if(G.isPointLight){let ne=e.get(G);if(ne.color.copy(G.color).multiplyScalar(G.intensity),ne.distance=G.distance,ne.decay=G.decay,G.castShadow){let ue=G.shadow,de=t.get(G);de.shadowIntensity=ue.intensity,de.shadowBias=ue.bias,de.shadowNormalBias=ue.normalBias,de.shadowRadius=ue.radius,de.shadowMapSize=ue.mapSize,de.shadowCameraNear=ue.camera.near,de.shadowCameraFar=ue.camera.far,i.pointShadow[_]=de,i.pointShadowMap[_]=pe,i.pointShadowMatrix[_]=G.shadow.matrix,R++}i.point[_]=ne,_++}else if(G.isHemisphereLight){let ne=e.get(G);ne.skyColor.copy(G.color).multiplyScalar(oe),ne.groundColor.copy(G.groundColor).multiplyScalar(oe),i.hemi[E]=ne,E++}}I>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Ie.LTC_FLOAT_1,i.rectAreaLTC2=Ie.LTC_FLOAT_2):(i.rectAreaLTC1=Ie.LTC_HALF_1,i.rectAreaLTC2=Ie.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=h,i.ambient[2]=f;let W=i.hash;(W.sunLength!==m||W.directionalLength!==g||W.pointLength!==_||W.spotLength!==T||W.rectAreaLength!==I||W.hemiLength!==E||W.numSunShadows!==x||W.numDirectionalShadows!==w||W.numPointShadows!==R||W.numSpotShadows!==C||W.numSpotMaps!==y||W.numLightProbes!==k)&&(i.sun.length=m,i.directional.length=g,i.spot.length=T,i.rectArea.length=I,i.point.length=_,i.hemi.length=E,i.sunShadow.length=x,i.sunShadowMap.length=x,i.sunShadowMatrix.length=v,i.sunShadowCascade.length=v,i.directionalShadow.length=w,i.directionalShadowMap.length=w,i.directionalShadowMatrix.length=w,i.pointShadow.length=R,i.pointShadowMap.length=R,i.pointShadowMatrix.length=R,i.spotShadow.length=C,i.spotShadowMap.length=C,i.spotLightMatrix.length=C+y-N,i.spotLightMap.length=y,i.numSpotLightShadowsWithMaps=N,i.numLightProbes=k,W.sunLength=m,W.directionalLength=g,W.pointLength=_,W.spotLength=T,W.rectAreaLength=I,W.hemiLength=E,W.numSunShadows=x,W.numDirectionalShadows=w,W.numPointShadows=R,W.numSpotShadows=C,W.numSpotMaps=y,W.numLightProbes=k,i.version=uT++)}function c(l,u){let h=0,f=0,m=0,x=0,v=0,g=0,_=u.matrixWorldInverse;for(let T=0,I=l.length;T<I;T++){let E=l[T];if(E.isSunLight){let w=i.sun[h];w.direction.setFromMatrixPosition(E.matrixWorld),w.direction.transformDirection(_),h++}else if(E.isDirectionalLight){let w=i.directional[f];w.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(_),f++}else if(E.isSpotLight){let w=i.spot[x];w.position.setFromMatrixPosition(E.matrixWorld),w.position.applyMatrix4(_),w.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(_),x++}else if(E.isRectAreaLight){let w=i.rectArea[v];w.position.setFromMatrixPosition(E.matrixWorld),w.position.applyMatrix4(_),a.identity(),s.copy(E.matrixWorld),s.premultiply(_),a.extractRotation(s),w.halfWidth.set(E.width*.5,0,0),w.halfHeight.set(0,E.height*.5,0),w.halfWidth.applyMatrix4(a),w.halfHeight.applyMatrix4(a),v++}else if(E.isPointLight){let w=i.point[m];w.position.setFromMatrixPosition(E.matrixWorld),w.position.applyMatrix4(_),m++}else if(E.isHemisphereLight){let w=i.hemi[g];w.direction.setFromMatrixPosition(E.matrixWorld),w.direction.transformDirection(_),g++}}}return{setup:o,setupView:c,state:i}}function J_(n){let e=new dT(n),t=[],i=[],r=[];function s(f){h.camera=f,t.length=0,i.length=0,r.length=0}function a(f){t.push(f)}function o(f){i.push(f)}function c(f){r.push(f)}function l(){e.setup(t)}function u(f){e.setupView(t,f)}let h={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:h,setupLights:l,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function fT(n){let e=new WeakMap;function t(r,s=0){let a=e.get(r),o;return a===void 0?(o=new J_(n),e.set(r,[o])):s>=a.length?(o=new J_(n),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}var pT=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,mT=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,gT=[new Z(1,0,0),new Z(-1,0,0),new Z(0,1,0),new Z(0,-1,0),new Z(0,0,1),new Z(0,0,-1)],_T=[new Z(0,-1,0),new Z(0,-1,0),new Z(0,0,1),new Z(0,0,-1),new Z(0,-1,0),new Z(0,-1,0)],Q_=new ft,ul=new Z,gf=new Z;function xT(n,e,t){let i=new Na,r=new xt,s=new xt,a=new kt,o=new Wc,c=new Xc,l={},u=t.maxTextureSize,h={[Yi]:Dn,[Dn]:Yi,[Un]:Un},f=new ni({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new xt},radius:{value:4}},vertexShader:pT,fragmentShader:mT}),m=f.clone();m.defines.HORIZONTAL_PASS=1;let x=new Mn;x.setAttribute("position",new hn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new cn(x,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=el;let _=this.type;this.render=function(R,C,y){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||R.length===0)return;this.type===Yg&&(Ze("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=el);let N=n.getRenderTarget(),k=n.getActiveCubeFace(),W=n.getActiveMipmapLevel(),q=n.state;q.setBlending(Zi),q.buffers.depth.getReversed()===!0?q.buffers.color.setClear(0,0,0,0):q.buffers.color.setClear(1,1,1,1),q.buffers.depth.setTest(!0),q.setScissorTest(!1);let Q=_!==this.type;Q&&C.traverse(function(G){G.material&&(Array.isArray(G.material)?G.material.forEach(J=>J.needsUpdate=!0):G.material.needsUpdate=!0)});for(let G=0,J=R.length;G<J;G++){let oe=R[G],re=oe.shadow;if(re===void 0){Ze("WebGLShadowMap:",oe,"has no shadow.");continue}if(re.autoUpdate===!1&&re.needsUpdate===!1)continue;r.copy(re.mapSize);let pe=re.getFrameExtents();r.multiply(pe),s.copy(re.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/pe.x),r.x=s.x*pe.x,re.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/pe.y),r.y=s.y*pe.y,re.mapSize.y=s.y));let ne=n.state.buffers.depth.getReversed();if(re.camera._reversedDepth=ne,re.map===null||Q===!0){if(re.map!==null&&(re.map.depthTexture!==null&&(re.map.depthTexture.dispose(),re.map.depthTexture=null),re.map.dispose()),this.type===ka){if(oe.isPointLight){Ze("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}re.map=new zn(r.x,r.y,{format:Zr,type:Ni,minFilter:Jt,magFilter:Jt,generateMipmaps:!1}),re.map.texture.name=oe.name+".shadowMap",re.map.depthTexture=new Wr(r.x,r.y,ii),re.map.depthTexture.name=oe.name+".shadowMapDepth",re.map.depthTexture.format=Gi,re.map.depthTexture.compareFunction=null,re.map.depthTexture.minFilter=Kt,re.map.depthTexture.magFilter=Kt}else oe.isPointLight?(re.map=new Yu(r.x),re.map.depthTexture=new Gc(r.x,Pi)):(re.map=new zn(r.x,r.y),re.map.depthTexture=new Wr(r.x,r.y,Pi)),re.map.depthTexture.name=oe.name+".shadowMap",re.map.depthTexture.format=Gi,this.type===el?(re.map.depthTexture.compareFunction=ne?Hu:Gu,re.map.depthTexture.minFilter=Jt,re.map.depthTexture.magFilter=Jt):(re.map.depthTexture.compareFunction=null,re.map.depthTexture.minFilter=Kt,re.map.depthTexture.magFilter=Kt);re.camera.updateProjectionMatrix()}re.map.isWebGLCubeRenderTarget!==!0&&(re.map.width!==r.x||re.map.height!==r.y)&&re.map.setSize(r.x,r.y);let ue=re.map.isWebGLCubeRenderTarget?6:re.getViewportCount();oe.isPointLight!==!0&&re.updateMatrices(oe,y);for(let de=0;de<ue;de++){let He=re.getCamera(de);if(oe.isPointLight){let Ce=re.camera,dt=re.matrix,nt=oe.distance||Ce.far;nt!==Ce.far&&(Ce.far=nt,Ce.updateProjectionMatrix()),ul.setFromMatrixPosition(oe.matrixWorld),Ce.position.copy(ul),gf.copy(Ce.position),gf.add(gT[de]),Ce.up.copy(_T[de]),Ce.lookAt(gf),Ce.updateMatrixWorld(),dt.makeTranslation(-ul.x,-ul.y,-ul.z),Q_.multiplyMatrices(Ce.projectionMatrix,Ce.matrixWorldInverse),re._frustum.setFromProjectionMatrix(Q_,Ce.coordinateSystem,Ce.reversedDepth)}if(re.map.isWebGLCubeRenderTarget)n.setRenderTarget(re.map,de),n.clear();else{de===0&&(n.setRenderTarget(re.map),n.clear());let Ce=re.getViewport(de);a.set(s.x*Ce.x,s.y*Ce.y,s.x*Ce.z,s.y*Ce.w),q.viewport(a)}i=re.getFrustum(de),E(C,y,He,oe,this.type)}re.isPointLightShadow!==!0&&this.type===ka&&T(re,y),re.needsUpdate=!1}_=this.type,g.needsUpdate=!1,n.setRenderTarget(N,k,W)};function T(R,C){let y=e.update(v);f.defines.VSM_SAMPLES!==R.blurSamples&&(f.defines.VSM_SAMPLES=R.blurSamples,m.defines.VSM_SAMPLES=R.blurSamples,f.needsUpdate=!0,m.needsUpdate=!0),R.mapPass===null?R.mapPass=new zn(r.x,r.y,{format:Zr,type:Ni}):(R.mapPass.width!==R.map.width||R.mapPass.height!==R.map.height)&&R.mapPass.setSize(R.map.width,R.map.height),f.uniforms.shadow_pass.value=R.map.depthTexture,f.uniforms.resolution.value.set(R.map.width,R.map.height),f.uniforms.radius.value=R.radius,n.setRenderTarget(R.mapPass),n.clear(),n.renderBufferDirect(C,null,y,f,v,null),m.uniforms.shadow_pass.value=R.mapPass.texture,m.uniforms.resolution.value.set(R.map.width,R.map.height),m.uniforms.radius.value=R.radius,n.setRenderTarget(R.map),n.clear(),n.renderBufferDirect(C,null,y,m,v,null)}function I(R,C,y,N){let k=null,W=y.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(W!==void 0)k=W;else if(k=y.isPointLight===!0?c:o,n.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){let q=k.uuid,Q=C.uuid,G=l[q];G===void 0&&(G={},l[q]=G);let J=G[Q];J===void 0&&(J=k.clone(),G[Q]=J,C.addEventListener("dispose",w)),k=J}if(k.visible=C.visible,k.wireframe=C.wireframe,N===ka?k.side=C.shadowSide!==null?C.shadowSide:C.side:k.side=C.shadowSide!==null?C.shadowSide:h[C.side],k.alphaMap=C.alphaMap,k.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,k.map=C.map,k.clipShadows=C.clipShadows,k.clippingPlanes=C.clippingPlanes,k.clipIntersection=C.clipIntersection,k.displacementMap=C.displacementMap,k.displacementScale=C.displacementScale,k.displacementBias=C.displacementBias,k.wireframeLinewidth=C.wireframeLinewidth,k.linewidth=C.linewidth,y.isPointLight===!0&&k.isMeshDistanceMaterial===!0){let q=n.properties.get(k);q.light=y}return k}function E(R,C,y,N,k){if(R.visible===!1)return;if(R.layers.test(C.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&k===ka)&&(!R.frustumCulled||R.intersectsFrustum(i))){R.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,R.matrixWorld);let Q=e.update(R),G=R.material;if(Array.isArray(G)){let J=Q.groups;for(let oe=0,re=J.length;oe<re;oe++){let pe=J[oe],ne=G[pe.materialIndex];if(ne&&ne.visible){let ue=I(R,ne,N,k);R.onBeforeShadow(n,R,C,y,Q,ue,pe),n.renderBufferDirect(y,null,Q,ue,R,pe),R.onAfterShadow(n,R,C,y,Q,ue,pe)}}}else if(G.visible){let J=I(R,G,N,k);R.onBeforeShadow(n,R,C,y,Q,J,null),n.renderBufferDirect(y,null,Q,J,R,null),R.onAfterShadow(n,R,C,y,Q,J,null)}}let q=R.children;for(let Q=0,G=q.length;Q<G;Q++)E(q[Q],C,y,N,k)}function w(R){R.target.removeEventListener("dispose",w);for(let y in l){let N=l[y],k=R.target.uuid;k in N&&(N[k].dispose(),delete N[k])}}}function vT(n,e){function t(){let H=!1,Te=new kt,ce=null,Me=new kt(0,0,0,0);return{setMask:function(we){ce!==we&&!H&&(n.colorMask(we,we,we,we),ce=we)},setLocked:function(we){H=we},setClear:function(we,fe,qe,Be,zt){zt===!0&&(we*=Be,fe*=Be,qe*=Be),Te.set(we,fe,qe,Be),Me.equals(Te)===!1&&(n.clearColor(we,fe,qe,Be),Me.copy(Te))},reset:function(){H=!1,ce=null,Me.set(-1,0,0,0)}}}function i(){let H=!1,Te=!1,ce=null,Me=null,we=null;return{setReversed:function(fe){if(Te!==fe){let qe=e.get("EXT_clip_control");fe?qe.clipControlEXT(qe.LOWER_LEFT_EXT,qe.ZERO_TO_ONE_EXT):qe.clipControlEXT(qe.LOWER_LEFT_EXT,qe.NEGATIVE_ONE_TO_ONE_EXT),Te=fe;let Be=we;we=null,this.setClear(Be)}},getReversed:function(){return Te},setTest:function(fe){fe?te(n.DEPTH_TEST):Ne(n.DEPTH_TEST)},setMask:function(fe){ce!==fe&&!H&&(n.depthMask(fe),ce=fe)},setFunc:function(fe){if(Te&&(fe=R_[fe]),Me!==fe){switch(fe){case Cc:n.depthFunc(n.NEVER);break;case Pc:n.depthFunc(n.ALWAYS);break;case Nc:n.depthFunc(n.LESS);break;case ya:n.depthFunc(n.LEQUAL);break;case Lc:n.depthFunc(n.EQUAL);break;case Dc:n.depthFunc(n.GEQUAL);break;case Uc:n.depthFunc(n.GREATER);break;case Oc:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Me=fe}},setLocked:function(fe){H=fe},setClear:function(fe){we!==fe&&(we=fe,Te&&(fe=1-fe),n.clearDepth(fe))},reset:function(){H=!1,ce=null,Me=null,we=null,Te=!1}}}function r(){let H=!1,Te=null,ce=null,Me=null,we=null,fe=null,qe=null,Be=null,zt=null;return{setTest:function(Lt){H||(Lt?te(n.STENCIL_TEST):Ne(n.STENCIL_TEST))},setMask:function(Lt){Te!==Lt&&!H&&(n.stencilMask(Lt),Te=Lt)},setFunc:function(Lt,Yn,si){(ce!==Lt||Me!==Yn||we!==si)&&(n.stencilFunc(Lt,Yn,si),ce=Lt,Me=Yn,we=si)},setOp:function(Lt,Yn,si){(fe!==Lt||qe!==Yn||Be!==si)&&(n.stencilOp(Lt,Yn,si),fe=Lt,qe=Yn,Be=si)},setLocked:function(Lt){H=Lt},setClear:function(Lt){zt!==Lt&&(n.clearStencil(Lt),zt=Lt)},reset:function(){H=!1,Te=null,ce=null,Me=null,we=null,fe=null,qe=null,Be=null,zt=null}}}let s=new t,a=new i,o=new r,c=new WeakMap,l=new WeakMap,u={},h={},f={},m=new WeakMap,x=[],v=null,g=!1,_=null,T=null,I=null,E=null,w=null,R=null,C=null,y=new st(0,0,0),N=0,k=!1,W=null,q=null,Q=null,G=null,J=null,oe=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),re=!1,pe=0,ne=n.getParameter(n.VERSION);ne.indexOf("WebGL")!==-1?(pe=parseFloat(/^WebGL (\d)/.exec(ne)[1]),re=pe>=1):ne.indexOf("OpenGL ES")!==-1&&(pe=parseFloat(/^OpenGL ES (\d)/.exec(ne)[1]),re=pe>=2);let ue=null,de={},He=n.getParameter(n.SCISSOR_BOX),Ce=n.getParameter(n.VIEWPORT),dt=new kt().fromArray(He),nt=new kt().fromArray(Ce);function vt(H,Te,ce,Me){let we=new Uint8Array(4),fe=n.createTexture();n.bindTexture(H,fe),n.texParameteri(H,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(H,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let qe=0;qe<ce;qe++)H===n.TEXTURE_3D||H===n.TEXTURE_2D_ARRAY?n.texImage3D(Te,0,n.RGBA,1,1,Me,0,n.RGBA,n.UNSIGNED_BYTE,we):n.texImage2D(Te+qe,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,we);return fe}let ie={};ie[n.TEXTURE_2D]=vt(n.TEXTURE_2D,n.TEXTURE_2D,1),ie[n.TEXTURE_CUBE_MAP]=vt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ie[n.TEXTURE_2D_ARRAY]=vt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ie[n.TEXTURE_3D]=vt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),te(n.DEPTH_TEST),a.setFunc(ya),j(!1),_e(Ud),te(n.CULL_FACE),St(Zi);function te(H){u[H]!==!0&&(n.enable(H),u[H]=!0)}function Ne(H){u[H]!==!1&&(n.disable(H),u[H]=!1)}function Je(H,Te){return f[H]!==Te?(n.bindFramebuffer(H,Te),f[H]=Te,H===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=Te),H===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=Te),!0):!1}function Ee(H,Te){let ce=x,Me=!1;if(H){ce=m.get(Te),ce===void 0&&(ce=[],m.set(Te,ce));let we=H.textures;if(ce.length!==we.length||ce[0]!==n.COLOR_ATTACHMENT0){for(let fe=0,qe=we.length;fe<qe;fe++)ce[fe]=n.COLOR_ATTACHMENT0+fe;ce.length=we.length,Me=!0}}else ce[0]!==n.BACK&&(ce[0]=n.BACK,Me=!0);Me&&n.drawBuffers(ce)}function lt(H){return v!==H?(n.useProgram(H),v=H,!0):!1}let It={[Ns]:n.FUNC_ADD,[Kg]:n.FUNC_SUBTRACT,[jg]:n.FUNC_REVERSE_SUBTRACT};It[$g]=n.MIN,It[Jg]=n.MAX;let ct={[Qg]:n.ZERO,[e_]:n.ONE,[t_]:n.SRC_COLOR,[kd]:n.SRC_ALPHA,[o_]:n.SRC_ALPHA_SATURATE,[s_]:n.DST_COLOR,[i_]:n.DST_ALPHA,[n_]:n.ONE_MINUS_SRC_COLOR,[zd]:n.ONE_MINUS_SRC_ALPHA,[a_]:n.ONE_MINUS_DST_COLOR,[r_]:n.ONE_MINUS_DST_ALPHA,[l_]:n.CONSTANT_COLOR,[c_]:n.ONE_MINUS_CONSTANT_COLOR,[u_]:n.CONSTANT_ALPHA,[h_]:n.ONE_MINUS_CONSTANT_ALPHA};function St(H,Te,ce,Me,we,fe,qe,Be,zt,Lt){if(H===Zi){g===!0&&(Ne(n.BLEND),g=!1);return}if(g===!1&&(te(n.BLEND),g=!0),H!==Zg){if(H!==_||Lt!==k){if((T!==Ns||w!==Ns)&&(n.blendEquation(n.FUNC_ADD),T=Ns,w=Ns),Lt)switch(H){case za:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Od:n.blendFunc(n.ONE,n.ONE);break;case Fd:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Bd:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:rt("WebGLState: Invalid blending: ",H);break}else switch(H){case za:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Od:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Fd:rt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Bd:rt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:rt("WebGLState: Invalid blending: ",H);break}I=null,E=null,R=null,C=null,y.set(0,0,0),N=0,_=H,k=Lt}return}we=we||Te,fe=fe||ce,qe=qe||Me,(Te!==T||we!==w)&&(n.blendEquationSeparate(It[Te],It[we]),T=Te,w=we),(ce!==I||Me!==E||fe!==R||qe!==C)&&(n.blendFuncSeparate(ct[ce],ct[Me],ct[fe],ct[qe]),I=ce,E=Me,R=fe,C=qe),(Be.equals(y)===!1||zt!==N)&&(n.blendColor(Be.r,Be.g,Be.b,zt),y.copy(Be),N=zt),_=H,k=!1}function Ct(H,Te){H.side===Un?Ne(n.CULL_FACE):te(n.CULL_FACE);let ce=H.side===Dn;Te&&(ce=!ce),j(ce),H.blending===za&&H.transparent===!1?St(Zi):St(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),a.setFunc(H.depthFunc),a.setTest(H.depthTest),a.setMask(H.depthWrite),s.setMask(H.colorWrite);let Me=H.stencilWrite;o.setTest(Me),Me&&(o.setMask(H.stencilWriteMask),o.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),o.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),Ke(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?te(n.SAMPLE_ALPHA_TO_COVERAGE):Ne(n.SAMPLE_ALPHA_TO_COVERAGE)}function j(H){W!==H&&(H?n.frontFace(n.CW):n.frontFace(n.CCW),W=H)}function _e(H){H!==Xg?(te(n.CULL_FACE),H!==q&&(H===Ud?n.cullFace(n.BACK):H===qg?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ne(n.CULL_FACE),q=H}function ze(H){H!==Q&&(re&&n.lineWidth(H),Q=H)}function Ke(H,Te,ce){H?(te(n.POLYGON_OFFSET_FILL),(G!==Te||J!==ce)&&(G=Te,J=ce,a.getReversed()&&(Te=-Te),n.polygonOffset(Te,ce))):Ne(n.POLYGON_OFFSET_FILL)}function Qe(H){H?te(n.SCISSOR_TEST):Ne(n.SCISSOR_TEST)}function $e(H){H===void 0&&(H=n.TEXTURE0+oe-1),ue!==H&&(n.activeTexture(H),ue=H)}function B(H,Te,ce){ce===void 0&&(ue===null?ce=n.TEXTURE0+oe-1:ce=ue);let Me=de[ce];Me===void 0&&(Me={type:void 0,texture:void 0},de[ce]=Me),(Me.type!==H||Me.texture!==Te)&&(ue!==ce&&(n.activeTexture(ce),ue=ce),n.bindTexture(H,Te||ie[H]),Me.type=H,Me.texture=Te)}function xe(){let H=de[ue];H!==void 0&&H.type!==void 0&&(n.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function me(){try{n.compressedTexImage2D(...arguments)}catch(H){rt("WebGLState:",H)}}function p(){try{n.compressedTexImage3D(...arguments)}catch(H){rt("WebGLState:",H)}}function d(){try{n.texSubImage2D(...arguments)}catch(H){rt("WebGLState:",H)}}function S(){try{n.texSubImage3D(...arguments)}catch(H){rt("WebGLState:",H)}}function A(){try{n.compressedTexSubImage2D(...arguments)}catch(H){rt("WebGLState:",H)}}function P(){try{n.compressedTexSubImage3D(...arguments)}catch(H){rt("WebGLState:",H)}}function D(){try{n.texStorage2D(...arguments)}catch(H){rt("WebGLState:",H)}}function X(){try{n.texStorage3D(...arguments)}catch(H){rt("WebGLState:",H)}}function L(){try{n.texImage2D(...arguments)}catch(H){rt("WebGLState:",H)}}function F(){try{n.texImage3D(...arguments)}catch(H){rt("WebGLState:",H)}}function se(H){return h[H]!==void 0?h[H]:n.getParameter(H)}function ge(H,Te){h[H]!==Te&&(n.pixelStorei(H,Te),h[H]=Te)}function le(H){dt.equals(H)===!1&&(n.scissor(H.x,H.y,H.z,H.w),dt.copy(H))}function he(H){nt.equals(H)===!1&&(n.viewport(H.x,H.y,H.z,H.w),nt.copy(H))}function Pe(H,Te){let ce=l.get(Te);ce===void 0&&(ce=new WeakMap,l.set(Te,ce));let Me=ce.get(H);Me===void 0&&(Me=n.getUniformBlockIndex(Te,H.name),ce.set(H,Me))}function Oe(H,Te){let Me=l.get(Te).get(H);c.get(Te)!==Me&&(n.uniformBlockBinding(Te,Me,H.__bindingPointIndex),c.set(Te,Me))}function at(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},h={},ue=null,de={},f={},m=new WeakMap,x=[],v=null,g=!1,_=null,T=null,I=null,E=null,w=null,R=null,C=null,y=new st(0,0,0),N=0,k=!1,W=null,q=null,Q=null,G=null,J=null,dt.set(0,0,n.canvas.width,n.canvas.height),nt.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:te,disable:Ne,bindFramebuffer:Je,drawBuffers:Ee,useProgram:lt,setBlending:St,setMaterial:Ct,setFlipSided:j,setCullFace:_e,setLineWidth:ze,setPolygonOffset:Ke,setScissorTest:Qe,activeTexture:$e,bindTexture:B,unbindTexture:xe,compressedTexImage2D:me,compressedTexImage3D:p,texImage2D:L,texImage3D:F,pixelStorei:ge,getParameter:se,updateUBOMapping:Pe,uniformBlockBinding:Oe,texStorage2D:D,texStorage3D:X,texSubImage2D:d,texSubImage3D:S,compressedTexSubImage2D:A,compressedTexSubImage3D:P,scissor:le,viewport:he,reset:at}}function yT(n,e,t,i,r,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new xt,u=new WeakMap,h=new Set,f,m=new WeakMap,x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(p,d){return x?new OffscreenCanvas(p,d):Ma("canvas")}function g(p,d,S){let A=1,P=me(p);if((P.width>S||P.height>S)&&(A=S/Math.max(P.width,P.height)),A<1)if(typeof HTMLImageElement<"u"&&p instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&p instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&p instanceof ImageBitmap||typeof VideoFrame<"u"&&p instanceof VideoFrame){let D=Math.floor(A*P.width),X=Math.floor(A*P.height);f===void 0&&(f=v(D,X));let L=d?v(D,X):f;return L.width=D,L.height=X,L.getContext("2d").drawImage(p,0,0,D,X),Ze("WebGLRenderer: Texture has been resized from ("+P.width+"x"+P.height+") to ("+D+"x"+X+")."),L}else return"data"in p&&Ze("WebGLRenderer: Image in DataTexture is too big ("+P.width+"x"+P.height+")."),p;return p}function _(p){return p.generateMipmaps}function T(p){n.generateMipmap(p)}function I(p){return p.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:p.isWebGL3DRenderTarget?n.TEXTURE_3D:p.isWebGLArrayRenderTarget||p.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function E(p,d,S,A,P,D=!1){if(p!==null){if(n[p]!==void 0)return n[p];Ze("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+p+"'")}let X;A&&(X=e.get("EXT_texture_norm16"),X||Ze("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let L=d;if(d===n.RED&&(S===n.FLOAT&&(L=n.R32F),S===n.HALF_FLOAT&&(L=n.R16F),S===n.UNSIGNED_BYTE&&(L=n.R8),S===n.UNSIGNED_SHORT&&X&&(L=X.R16_EXT),S===n.SHORT&&X&&(L=X.R16_SNORM_EXT)),d===n.RED_INTEGER&&(S===n.UNSIGNED_BYTE&&(L=n.R8UI),S===n.UNSIGNED_SHORT&&(L=n.R16UI),S===n.UNSIGNED_INT&&(L=n.R32UI),S===n.BYTE&&(L=n.R8I),S===n.SHORT&&(L=n.R16I),S===n.INT&&(L=n.R32I)),d===n.RG&&(S===n.FLOAT&&(L=n.RG32F),S===n.HALF_FLOAT&&(L=n.RG16F),S===n.UNSIGNED_BYTE&&(L=n.RG8),S===n.UNSIGNED_SHORT&&X&&(L=X.RG16_EXT),S===n.SHORT&&X&&(L=X.RG16_SNORM_EXT)),d===n.RG_INTEGER&&(S===n.UNSIGNED_BYTE&&(L=n.RG8UI),S===n.UNSIGNED_SHORT&&(L=n.RG16UI),S===n.UNSIGNED_INT&&(L=n.RG32UI),S===n.BYTE&&(L=n.RG8I),S===n.SHORT&&(L=n.RG16I),S===n.INT&&(L=n.RG32I)),d===n.RGB_INTEGER&&(S===n.UNSIGNED_BYTE&&(L=n.RGB8UI),S===n.UNSIGNED_SHORT&&(L=n.RGB16UI),S===n.UNSIGNED_INT&&(L=n.RGB32UI),S===n.BYTE&&(L=n.RGB8I),S===n.SHORT&&(L=n.RGB16I),S===n.INT&&(L=n.RGB32I)),d===n.RGBA_INTEGER&&(S===n.UNSIGNED_BYTE&&(L=n.RGBA8UI),S===n.UNSIGNED_SHORT&&(L=n.RGBA16UI),S===n.UNSIGNED_INT&&(L=n.RGBA32UI),S===n.BYTE&&(L=n.RGBA8I),S===n.SHORT&&(L=n.RGBA16I),S===n.INT&&(L=n.RGBA32I)),d===n.RGB&&(S===n.UNSIGNED_SHORT&&X&&(L=X.RGB16_EXT),S===n.SHORT&&X&&(L=X.RGB16_SNORM_EXT),S===n.UNSIGNED_INT_5_9_9_9_REV&&(L=n.RGB9_E5),S===n.UNSIGNED_INT_10F_11F_11F_REV&&(L=n.R11F_G11F_B10F)),d===n.RGBA){let F=D?Po:Et.getTransfer(P);S===n.FLOAT&&(L=n.RGBA32F),S===n.HALF_FLOAT&&(L=n.RGBA16F),S===n.UNSIGNED_BYTE&&(L=F===Ot?n.SRGB8_ALPHA8:n.RGBA8),S===n.UNSIGNED_SHORT&&X&&(L=X.RGBA16_EXT),S===n.SHORT&&X&&(L=X.RGBA16_SNORM_EXT),S===n.UNSIGNED_SHORT_4_4_4_4&&(L=n.RGBA4),S===n.UNSIGNED_SHORT_5_5_5_1&&(L=n.RGB5_A1)}return(L===n.R16F||L===n.R32F||L===n.RG16F||L===n.RG32F||L===n.RGBA16F||L===n.RGBA32F)&&e.get("EXT_color_buffer_float"),L}function w(p,d){let S;return p?d===null||d===Pi||d===Ha?S=n.DEPTH24_STENCIL8:d===ii?S=n.DEPTH32F_STENCIL8:d===Ga&&(S=n.DEPTH24_STENCIL8,Ze("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):d===null||d===Pi||d===Ha?S=n.DEPTH_COMPONENT24:d===ii?S=n.DEPTH_COMPONENT32F:d===Ga&&(S=n.DEPTH_COMPONENT16),S}function R(p,d){return _(p)===!0||p.isFramebufferTexture&&p.minFilter!==Kt&&p.minFilter!==Jt?Math.log2(Math.max(d.width,d.height))+1:p.mipmaps!==void 0&&p.mipmaps.length>0?p.mipmaps.length:p.isCompressedTexture&&Array.isArray(p.image)?d.mipmaps.length:1}function C(p){let d=p.target;d.removeEventListener("dispose",C),N(d),d.isVideoTexture&&u.delete(d),d.isHTMLTexture&&h.delete(d)}function y(p){let d=p.target;d.removeEventListener("dispose",y),W(d)}function N(p){let d=i.get(p);if(d.__webglInit===void 0)return;let S=p.source,A=m.get(S);if(A){let P=A[d.__cacheKey];P.usedTimes--,P.usedTimes===0&&k(p),Object.keys(A).length===0&&m.delete(S)}i.remove(p)}function k(p){let d=i.get(p);n.deleteTexture(d.__webglTexture);let S=p.source,A=m.get(S);delete A[d.__cacheKey],a.memory.textures--}function W(p){let d=i.get(p);if(p.depthTexture&&(p.depthTexture.dispose(),i.remove(p.depthTexture)),p.isWebGLCubeRenderTarget)for(let A=0;A<6;A++){if(Array.isArray(d.__webglFramebuffer[A]))for(let P=0;P<d.__webglFramebuffer[A].length;P++)n.deleteFramebuffer(d.__webglFramebuffer[A][P]);else n.deleteFramebuffer(d.__webglFramebuffer[A]);d.__webglDepthbuffer&&n.deleteRenderbuffer(d.__webglDepthbuffer[A])}else{if(Array.isArray(d.__webglFramebuffer))for(let A=0;A<d.__webglFramebuffer.length;A++)n.deleteFramebuffer(d.__webglFramebuffer[A]);else n.deleteFramebuffer(d.__webglFramebuffer);if(d.__webglDepthbuffer&&n.deleteRenderbuffer(d.__webglDepthbuffer),d.__webglMultisampledFramebuffer&&n.deleteFramebuffer(d.__webglMultisampledFramebuffer),d.__webglColorRenderbuffer)for(let A=0;A<d.__webglColorRenderbuffer.length;A++)d.__webglColorRenderbuffer[A]&&n.deleteRenderbuffer(d.__webglColorRenderbuffer[A]);d.__webglDepthRenderbuffer&&n.deleteRenderbuffer(d.__webglDepthRenderbuffer)}let S=p.textures;for(let A=0,P=S.length;A<P;A++){let D=i.get(S[A]);D.__webglTexture&&(n.deleteTexture(D.__webglTexture),a.memory.textures--),i.remove(S[A])}i.remove(p)}let q=0;function Q(){q=0}function G(){return q}function J(p){q=p}function oe(){let p=q;return p>=r.maxTextures&&Ze("WebGLTextures: Trying to use "+(p+1)+" texture units while this GPU supports only "+r.maxTextures),q+=1,p}function re(p){let d=[];return d.push(p.wrapS),d.push(p.wrapT),d.push(p.wrapR||0),d.push(p.magFilter),d.push(p.minFilter),d.push(p.anisotropy),d.push(p.internalFormat),d.push(p.format),d.push(p.type),d.push(p.generateMipmaps),d.push(p.premultiplyAlpha),d.push(p.flipY),d.push(p.unpackAlignment),d.push(p.colorSpace),d.join()}function pe(p,d){let S=i.get(p);if(p.isVideoTexture&&B(p),p.isRenderTargetTexture===!1&&p.isExternalTexture!==!0&&p.version>0&&S.__version!==p.version){let A=p.image;if(A===null)Ze("WebGLRenderer: Texture marked for update but no image data found.");else if(A.complete===!1)Ze("WebGLRenderer: Texture marked for update but image is incomplete");else{Ne(S,p,d);return}}else p.isExternalTexture&&(S.__webglTexture=p.sourceTexture?p.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,S.__webglTexture,n.TEXTURE0+d)}function ne(p,d){let S=i.get(p);if(p.isRenderTargetTexture===!1&&p.version>0&&S.__version!==p.version){Ne(S,p,d);return}else p.isExternalTexture&&(S.__webglTexture=p.sourceTexture?p.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,S.__webglTexture,n.TEXTURE0+d)}function ue(p,d){let S=i.get(p);if(p.isRenderTargetTexture===!1&&p.version>0&&S.__version!==p.version){Ne(S,p,d);return}t.bindTexture(n.TEXTURE_3D,S.__webglTexture,n.TEXTURE0+d)}function de(p,d){let S=i.get(p);if(p.isCubeDepthTexture!==!0&&p.version>0&&S.__version!==p.version){Je(S,p,d);return}t.bindTexture(n.TEXTURE_CUBE_MAP,S.__webglTexture,n.TEXTURE0+d)}let He={[Gr]:n.REPEAT,[pi]:n.CLAMP_TO_EDGE,[Sa]:n.MIRRORED_REPEAT},Ce={[Kt]:n.NEAREST,[iu]:n.NEAREST_MIPMAP_NEAREST,[Ds]:n.NEAREST_MIPMAP_LINEAR,[Jt]:n.LINEAR,[Va]:n.LINEAR_MIPMAP_NEAREST,[Ci]:n.LINEAR_MIPMAP_LINEAR},dt={[v_]:n.NEVER,[E_]:n.ALWAYS,[y_]:n.LESS,[Gu]:n.LEQUAL,[S_]:n.EQUAL,[Hu]:n.GEQUAL,[b_]:n.GREATER,[M_]:n.NOTEQUAL};function nt(p,d){if(d.type===ii&&e.has("OES_texture_float_linear")===!1&&(d.magFilter===Jt||d.magFilter===Va||d.magFilter===Ds||d.magFilter===Ci||d.minFilter===Jt||d.minFilter===Va||d.minFilter===Ds||d.minFilter===Ci)&&Ze("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(p,n.TEXTURE_WRAP_S,He[d.wrapS]),n.texParameteri(p,n.TEXTURE_WRAP_T,He[d.wrapT]),(p===n.TEXTURE_3D||p===n.TEXTURE_2D_ARRAY)&&n.texParameteri(p,n.TEXTURE_WRAP_R,He[d.wrapR]),n.texParameteri(p,n.TEXTURE_MAG_FILTER,Ce[d.magFilter]),n.texParameteri(p,n.TEXTURE_MIN_FILTER,Ce[d.minFilter]),d.compareFunction&&(n.texParameteri(p,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(p,n.TEXTURE_COMPARE_FUNC,dt[d.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(d.magFilter===Kt||d.minFilter!==Ds&&d.minFilter!==Ci||d.type===ii&&e.has("OES_texture_float_linear")===!1)return;if(d.anisotropy>1||i.get(d).__currentAnisotropy){let S=e.get("EXT_texture_filter_anisotropic");n.texParameterf(p,S.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(d.anisotropy,r.getMaxAnisotropy())),i.get(d).__currentAnisotropy=d.anisotropy}}}function vt(p,d){let S=!1;p.__webglInit===void 0&&(p.__webglInit=!0,d.addEventListener("dispose",C));let A=d.source,P=m.get(A);P===void 0&&(P={},m.set(A,P));let D=re(d);if(D!==p.__cacheKey){P[D]===void 0&&(P[D]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,S=!0),P[D].usedTimes++;let X=P[p.__cacheKey];X!==void 0&&(P[p.__cacheKey].usedTimes--,X.usedTimes===0&&k(d)),p.__cacheKey=D,p.__webglTexture=P[D].texture}return S}function ie(p,d,S){return Math.floor(Math.floor(p/S)/d)}function te(p,d,S,A){let D=p.updateRanges;if(D.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,d.width,d.height,S,A,d.data);else{D.sort((ge,le)=>ge.start-le.start);let X=0;for(let ge=1;ge<D.length;ge++){let le=D[X],he=D[ge],Pe=le.start+le.count,Oe=ie(he.start,d.width,4),at=ie(le.start,d.width,4);he.start<=Pe+1&&Oe===at&&ie(he.start+he.count-1,d.width,4)===Oe?le.count=Math.max(le.count,he.start+he.count-le.start):(++X,D[X]=he)}D.length=X+1;let L=t.getParameter(n.UNPACK_ROW_LENGTH),F=t.getParameter(n.UNPACK_SKIP_PIXELS),se=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,d.width);for(let ge=0,le=D.length;ge<le;ge++){let he=D[ge],Pe=Math.floor(he.start/4),Oe=Math.ceil(he.count/4),at=Pe%d.width,H=Math.floor(Pe/d.width),Te=Oe,ce=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,at),t.pixelStorei(n.UNPACK_SKIP_ROWS,H),t.texSubImage2D(n.TEXTURE_2D,0,at,H,Te,ce,S,A,d.data)}p.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,L),t.pixelStorei(n.UNPACK_SKIP_PIXELS,F),t.pixelStorei(n.UNPACK_SKIP_ROWS,se)}}function Ne(p,d,S){let A=n.TEXTURE_2D;(d.isDataArrayTexture||d.isCompressedArrayTexture)&&(A=n.TEXTURE_2D_ARRAY),d.isData3DTexture&&(A=n.TEXTURE_3D);let P=vt(p,d),D=d.source;t.bindTexture(A,p.__webglTexture,n.TEXTURE0+S);let X=i.get(D);if(D.version!==X.__version||P===!0){if(t.activeTexture(n.TEXTURE0+S),(typeof ImageBitmap<"u"&&d.image instanceof ImageBitmap)===!1){let ce=Et.getPrimaries(Et.workingColorSpace),Me=d.colorSpace===br?null:Et.getPrimaries(d.colorSpace),we=d.colorSpace===br||ce===Me?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,d.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,d.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,we)}t.pixelStorei(n.UNPACK_ALIGNMENT,d.unpackAlignment);let F=g(d.image,!1,r.maxTextureSize);F=xe(d,F);let se=s.convert(d.format,d.colorSpace),ge=s.convert(d.type),le=E(d.internalFormat,se,ge,d.normalized,d.colorSpace,d.isVideoTexture);nt(A,d);let he,Pe=d.mipmaps,Oe=d.isVideoTexture!==!0,at=X.__version===void 0||P===!0,H=D.dataReady,Te=R(d,F);if(d.isDepthTexture)le=w(d.format===Yr,d.type),at&&(Oe?t.texStorage2D(n.TEXTURE_2D,1,le,F.width,F.height):t.texImage2D(n.TEXTURE_2D,0,le,F.width,F.height,0,se,ge,null));else if(d.isDataTexture)if(Pe.length>0){Oe&&at&&t.texStorage2D(n.TEXTURE_2D,Te,le,Pe[0].width,Pe[0].height);for(let ce=0,Me=Pe.length;ce<Me;ce++)he=Pe[ce],Oe?H&&t.texSubImage2D(n.TEXTURE_2D,ce,0,0,he.width,he.height,se,ge,he.data):t.texImage2D(n.TEXTURE_2D,ce,le,he.width,he.height,0,se,ge,he.data);d.generateMipmaps=!1}else Oe?(at&&t.texStorage2D(n.TEXTURE_2D,Te,le,F.width,F.height),H&&te(d,F,se,ge)):t.texImage2D(n.TEXTURE_2D,0,le,F.width,F.height,0,se,ge,F.data);else if(d.isCompressedTexture)if(d.isCompressedArrayTexture){Oe&&at&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Te,le,Pe[0].width,Pe[0].height,F.depth);for(let ce=0,Me=Pe.length;ce<Me;ce++)if(he=Pe[ce],d.format!==ri)if(se!==null)if(Oe){if(H)if(d.layerUpdates.size>0){let we=uf(he.width,he.height,d.format,d.type);for(let fe of d.layerUpdates){let qe=he.data.subarray(fe*we/he.data.BYTES_PER_ELEMENT,(fe+1)*we/he.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ce,0,0,fe,he.width,he.height,1,se,qe)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ce,0,0,0,he.width,he.height,F.depth,se,he.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ce,le,he.width,he.height,F.depth,0,he.data,0,0);else Ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Oe?H&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ce,0,0,0,he.width,he.height,F.depth,se,ge,he.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ce,le,he.width,he.height,F.depth,0,se,ge,he.data);d.layerUpdates.size>0&&d.clearLayerUpdates()}else{Oe&&at&&t.texStorage2D(n.TEXTURE_2D,Te,le,Pe[0].width,Pe[0].height);for(let ce=0,Me=Pe.length;ce<Me;ce++)he=Pe[ce],d.format!==ri?se!==null?Oe?H&&t.compressedTexSubImage2D(n.TEXTURE_2D,ce,0,0,he.width,he.height,se,he.data):t.compressedTexImage2D(n.TEXTURE_2D,ce,le,he.width,he.height,0,he.data):Ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Oe?H&&t.texSubImage2D(n.TEXTURE_2D,ce,0,0,he.width,he.height,se,ge,he.data):t.texImage2D(n.TEXTURE_2D,ce,le,he.width,he.height,0,se,ge,he.data)}else if(d.isDataArrayTexture)if(Oe){if(at&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Te,le,F.width,F.height,F.depth),H)if(d.layerUpdates.size>0){let ce=uf(F.width,F.height,d.format,d.type);for(let Me of d.layerUpdates){let we=F.data.subarray(Me*ce/F.data.BYTES_PER_ELEMENT,(Me+1)*ce/F.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Me,F.width,F.height,1,se,ge,we)}d.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,F.width,F.height,F.depth,se,ge,F.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,le,F.width,F.height,F.depth,0,se,ge,F.data);else if(d.isData3DTexture)Oe?(at&&t.texStorage3D(n.TEXTURE_3D,Te,le,F.width,F.height,F.depth),H&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,F.width,F.height,F.depth,se,ge,F.data)):t.texImage3D(n.TEXTURE_3D,0,le,F.width,F.height,F.depth,0,se,ge,F.data);else if(d.isFramebufferTexture){if(at)if(Oe)t.texStorage2D(n.TEXTURE_2D,Te,le,F.width,F.height);else{let ce=F.width,Me=F.height;for(let we=0;we<Te;we++)t.texImage2D(n.TEXTURE_2D,we,le,ce,Me,0,se,ge,null),ce>>=1,Me>>=1}}else if(d.isHTMLTexture){if("texElementImage2D"in n){let ce=n.canvas;if(ce.hasAttribute("layoutsubtree")||ce.setAttribute("layoutsubtree","true"),F.parentNode!==ce){ce.appendChild(F),h.add(d),ce.onpaint=Me=>{let we=Me.changedElements;for(let fe of h)we.includes(fe.image)&&(fe.needsUpdate=!0)},ce.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,F);else{let we=n.RGBA,fe=n.RGBA,qe=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,we,fe,qe,F)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Pe.length>0){if(Oe&&at){let ce=me(Pe[0]);t.texStorage2D(n.TEXTURE_2D,Te,le,ce.width,ce.height)}for(let ce=0,Me=Pe.length;ce<Me;ce++)he=Pe[ce],Oe?H&&t.texSubImage2D(n.TEXTURE_2D,ce,0,0,se,ge,he):t.texImage2D(n.TEXTURE_2D,ce,le,se,ge,he);d.generateMipmaps=!1}else if(Oe){if(at){let ce=me(F);t.texStorage2D(n.TEXTURE_2D,Te,le,ce.width,ce.height)}H&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,se,ge,F)}else t.texImage2D(n.TEXTURE_2D,0,le,se,ge,F);_(d)&&T(A),X.__version=D.version,d.onUpdate&&d.onUpdate(d)}p.__version=d.version}function Je(p,d,S){if(d.image.length!==6)return;let A=vt(p,d),P=d.source;t.bindTexture(n.TEXTURE_CUBE_MAP,p.__webglTexture,n.TEXTURE0+S);let D=i.get(P);if(P.version!==D.__version||A===!0){t.activeTexture(n.TEXTURE0+S);let X=Et.getPrimaries(Et.workingColorSpace),L=d.colorSpace===br?null:Et.getPrimaries(d.colorSpace),F=d.colorSpace===br||X===L?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,d.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,d.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,d.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,F);let se=d.isCompressedTexture||d.image[0].isCompressedTexture,ge=d.image[0]&&d.image[0].isDataTexture,le=[];for(let fe=0;fe<6;fe++)!se&&!ge?le[fe]=g(d.image[fe],!0,r.maxCubemapSize):le[fe]=ge?d.image[fe].image:d.image[fe],le[fe]=xe(d,le[fe]);let he=le[0],Pe=s.convert(d.format,d.colorSpace),Oe=s.convert(d.type),at=E(d.internalFormat,Pe,Oe,d.normalized,d.colorSpace),H=d.isVideoTexture!==!0,Te=D.__version===void 0||A===!0,ce=P.dataReady,Me=R(d,he);nt(n.TEXTURE_CUBE_MAP,d);let we;if(se){H&&Te&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Me,at,he.width,he.height);for(let fe=0;fe<6;fe++){we=le[fe].mipmaps;for(let qe=0;qe<we.length;qe++){let Be=we[qe];d.format!==ri?Pe!==null?H?ce&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,qe,0,0,Be.width,Be.height,Pe,Be.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,qe,at,Be.width,Be.height,0,Be.data):Ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):H?ce&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,qe,0,0,Be.width,Be.height,Pe,Oe,Be.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,qe,at,Be.width,Be.height,0,Pe,Oe,Be.data)}}}else{if(we=d.mipmaps,H&&Te){we.length>0&&Me++;let fe=me(le[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Me,at,fe.width,fe.height)}for(let fe=0;fe<6;fe++)if(ge){H?ce&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,0,0,le[fe].width,le[fe].height,Pe,Oe,le[fe].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,at,le[fe].width,le[fe].height,0,Pe,Oe,le[fe].data);for(let qe=0;qe<we.length;qe++){let zt=we[qe].image[fe].image;H?ce&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,qe+1,0,0,zt.width,zt.height,Pe,Oe,zt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,qe+1,at,zt.width,zt.height,0,Pe,Oe,zt.data)}}else{H?ce&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,0,0,Pe,Oe,le[fe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,at,Pe,Oe,le[fe]);for(let qe=0;qe<we.length;qe++){let Be=we[qe];H?ce&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,qe+1,0,0,Pe,Oe,Be.image[fe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,qe+1,at,Pe,Oe,Be.image[fe])}}}_(d)&&T(n.TEXTURE_CUBE_MAP),D.__version=P.version,d.onUpdate&&d.onUpdate(d)}p.__version=d.version}function Ee(p,d,S,A,P,D){let X=s.convert(S.format,S.colorSpace),L=s.convert(S.type),F=E(S.internalFormat,X,L,S.normalized,S.colorSpace),se=i.get(d),ge=i.get(S);if(ge.__renderTarget=d,!se.__hasExternalTextures){let le=Math.max(1,d.width>>D),he=Math.max(1,d.height>>D);P===n.TEXTURE_3D||P===n.TEXTURE_2D_ARRAY?t.texImage3D(P,D,F,le,he,d.depth,0,X,L,null):t.texImage2D(P,D,F,le,he,0,X,L,null)}t.bindFramebuffer(n.FRAMEBUFFER,p),$e(d)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,A,P,ge.__webglTexture,0,Qe(d)):(P===n.TEXTURE_2D||P>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&P<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,A,P,ge.__webglTexture,D),t.bindFramebuffer(n.FRAMEBUFFER,null)}function lt(p,d,S){if(n.bindRenderbuffer(n.RENDERBUFFER,p),d.depthBuffer){let A=d.depthTexture,P=A&&A.isDepthTexture?A.type:null,D=w(d.stencilBuffer,P),X=d.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;$e(d)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Qe(d),D,d.width,d.height):S?n.renderbufferStorageMultisample(n.RENDERBUFFER,Qe(d),D,d.width,d.height):n.renderbufferStorage(n.RENDERBUFFER,D,d.width,d.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,X,n.RENDERBUFFER,p)}else{let A=d.textures;for(let P=0;P<A.length;P++){let D=A[P],X=s.convert(D.format,D.colorSpace),L=s.convert(D.type),F=E(D.internalFormat,X,L,D.normalized,D.colorSpace);$e(d)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Qe(d),F,d.width,d.height):S?n.renderbufferStorageMultisample(n.RENDERBUFFER,Qe(d),F,d.width,d.height):n.renderbufferStorage(n.RENDERBUFFER,F,d.width,d.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function It(p,d,S){let A=d.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,p),!(d.depthTexture&&d.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let P=i.get(d.depthTexture);if(P.__renderTarget=d,(!P.__webglTexture||d.depthTexture.image.width!==d.width||d.depthTexture.image.height!==d.height)&&(d.depthTexture.image.width=d.width,d.depthTexture.image.height=d.height,d.depthTexture.needsUpdate=!0),A){if(P.__webglInit===void 0&&(P.__webglInit=!0,d.depthTexture.addEventListener("dispose",C)),P.__webglTexture===void 0){P.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,P.__webglTexture),nt(n.TEXTURE_CUBE_MAP,d.depthTexture);let se=s.convert(d.depthTexture.format),ge=s.convert(d.depthTexture.type),le;d.depthTexture.format===Gi?le=n.DEPTH_COMPONENT24:d.depthTexture.format===Yr&&(le=n.DEPTH24_STENCIL8);for(let he=0;he<6;he++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,le,d.width,d.height,0,se,ge,null)}}else pe(d.depthTexture,0);let D=P.__webglTexture,X=Qe(d),L=A?n.TEXTURE_CUBE_MAP_POSITIVE_X+S:n.TEXTURE_2D,F=d.depthTexture.format===Yr?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(d.depthTexture.format===Gi)$e(d)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,F,L,D,0,X):n.framebufferTexture2D(n.FRAMEBUFFER,F,L,D,0);else if(d.depthTexture.format===Yr)$e(d)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,F,L,D,0,X):n.framebufferTexture2D(n.FRAMEBUFFER,F,L,D,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ct(p){let d=i.get(p),S=p.isWebGLCubeRenderTarget===!0;if(d.__boundDepthTexture!==p.depthTexture){let A=p.depthTexture;if(d.__depthDisposeCallback&&d.__depthDisposeCallback(),A){let P=()=>{delete d.__boundDepthTexture,delete d.__depthDisposeCallback,A.removeEventListener("dispose",P)};A.addEventListener("dispose",P),d.__depthDisposeCallback=P}d.__boundDepthTexture=A}if(p.depthTexture&&!d.__autoAllocateDepthBuffer)if(S)for(let A=0;A<6;A++)It(d.__webglFramebuffer[A],p,A);else{let A=p.texture.mipmaps;A&&A.length>0?It(d.__webglFramebuffer[0],p,0):It(d.__webglFramebuffer,p,0)}else if(S){d.__webglDepthbuffer=[];for(let A=0;A<6;A++)if(t.bindFramebuffer(n.FRAMEBUFFER,d.__webglFramebuffer[A]),d.__webglDepthbuffer[A]===void 0)d.__webglDepthbuffer[A]=n.createRenderbuffer(),lt(d.__webglDepthbuffer[A],p,!1);else{let P=p.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,D=d.__webglDepthbuffer[A];n.bindRenderbuffer(n.RENDERBUFFER,D),n.framebufferRenderbuffer(n.FRAMEBUFFER,P,n.RENDERBUFFER,D)}}else{let A=p.texture.mipmaps;if(A&&A.length>0?t.bindFramebuffer(n.FRAMEBUFFER,d.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,d.__webglFramebuffer),d.__webglDepthbuffer===void 0)d.__webglDepthbuffer=n.createRenderbuffer(),lt(d.__webglDepthbuffer,p,!1);else{let P=p.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,D=d.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,D),n.framebufferRenderbuffer(n.FRAMEBUFFER,P,n.RENDERBUFFER,D)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function St(p,d,S){let A=i.get(p);d!==void 0&&Ee(A.__webglFramebuffer,p,p.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),S!==void 0&&ct(p)}function Ct(p){let d=p.texture,S=i.get(p),A=i.get(d);p.addEventListener("dispose",y);let P=p.textures,D=p.isWebGLCubeRenderTarget===!0,X=P.length>1;if(X||(A.__webglTexture===void 0&&(A.__webglTexture=n.createTexture()),A.__version=d.version,a.memory.textures++),D){S.__webglFramebuffer=[];for(let L=0;L<6;L++)if(d.mipmaps&&d.mipmaps.length>0){S.__webglFramebuffer[L]=[];for(let F=0;F<d.mipmaps.length;F++)S.__webglFramebuffer[L][F]=n.createFramebuffer()}else S.__webglFramebuffer[L]=n.createFramebuffer()}else{if(d.mipmaps&&d.mipmaps.length>0){S.__webglFramebuffer=[];for(let L=0;L<d.mipmaps.length;L++)S.__webglFramebuffer[L]=n.createFramebuffer()}else S.__webglFramebuffer=n.createFramebuffer();if(X)for(let L=0,F=P.length;L<F;L++){let se=i.get(P[L]);se.__webglTexture===void 0&&(se.__webglTexture=n.createTexture(),a.memory.textures++)}if(p.samples>0&&$e(p)===!1){S.__webglMultisampledFramebuffer=n.createFramebuffer(),S.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,S.__webglMultisampledFramebuffer);for(let L=0;L<P.length;L++){let F=P[L];S.__webglColorRenderbuffer[L]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,S.__webglColorRenderbuffer[L]);let se=s.convert(F.format,F.colorSpace),ge=s.convert(F.type),le=E(F.internalFormat,se,ge,F.normalized,F.colorSpace,p.isXRRenderTarget===!0),he=Qe(p);n.renderbufferStorageMultisample(n.RENDERBUFFER,he,le,p.width,p.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+L,n.RENDERBUFFER,S.__webglColorRenderbuffer[L])}n.bindRenderbuffer(n.RENDERBUFFER,null),p.depthBuffer&&(S.__webglDepthRenderbuffer=n.createRenderbuffer(),lt(S.__webglDepthRenderbuffer,p,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(D){t.bindTexture(n.TEXTURE_CUBE_MAP,A.__webglTexture),nt(n.TEXTURE_CUBE_MAP,d);for(let L=0;L<6;L++)if(d.mipmaps&&d.mipmaps.length>0)for(let F=0;F<d.mipmaps.length;F++)Ee(S.__webglFramebuffer[L][F],p,d,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+L,F);else Ee(S.__webglFramebuffer[L],p,d,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+L,0);_(d)&&T(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(X){for(let L=0,F=P.length;L<F;L++){let se=P[L],ge=i.get(se),le=n.TEXTURE_2D;(p.isWebGL3DRenderTarget||p.isWebGLArrayRenderTarget)&&(le=p.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(le,ge.__webglTexture),nt(le,se),Ee(S.__webglFramebuffer,p,se,n.COLOR_ATTACHMENT0+L,le,0),_(se)&&T(le)}t.unbindTexture()}else{let L=n.TEXTURE_2D;if((p.isWebGL3DRenderTarget||p.isWebGLArrayRenderTarget)&&(L=p.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(L,A.__webglTexture),nt(L,d),d.mipmaps&&d.mipmaps.length>0)for(let F=0;F<d.mipmaps.length;F++)Ee(S.__webglFramebuffer[F],p,d,n.COLOR_ATTACHMENT0,L,F);else Ee(S.__webglFramebuffer,p,d,n.COLOR_ATTACHMENT0,L,0);_(d)&&T(L),t.unbindTexture()}p.depthBuffer&&ct(p)}function j(p){let d=p.textures;for(let S=0,A=d.length;S<A;S++){let P=d[S];if(_(P)){let D=I(p),X=i.get(P).__webglTexture;t.bindTexture(D,X),T(D),t.unbindTexture()}}}let _e=[],ze=[];function Ke(p){if(p.samples>0){if($e(p)===!1){let d=p.textures,S=p.width,A=p.height,P=n.COLOR_BUFFER_BIT,D=p.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,X=i.get(p),L=d.length>1;if(L)for(let se=0;se<d.length;se++)t.bindFramebuffer(n.FRAMEBUFFER,X.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+se,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,X.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+se,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,X.__webglMultisampledFramebuffer);let F=p.texture.mipmaps;F&&F.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,X.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,X.__webglFramebuffer);for(let se=0;se<d.length;se++){if(p.resolveDepthBuffer&&(p.depthBuffer&&(P|=n.DEPTH_BUFFER_BIT),p.stencilBuffer&&p.resolveStencilBuffer&&(P|=n.STENCIL_BUFFER_BIT)),L){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,X.__webglColorRenderbuffer[se]);let ge=i.get(d[se]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ge,0)}n.blitFramebuffer(0,0,S,A,0,0,S,A,P,n.NEAREST),c===!0&&(_e.length=0,ze.length=0,_e.push(n.COLOR_ATTACHMENT0+se),p.depthBuffer&&p.storeMultisampledDepthBuffer===!1&&(_e.push(D),ze.push(D),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,ze)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,_e))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),L)for(let se=0;se<d.length;se++){t.bindFramebuffer(n.FRAMEBUFFER,X.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+se,n.RENDERBUFFER,X.__webglColorRenderbuffer[se]);let ge=i.get(d[se]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,X.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+se,n.TEXTURE_2D,ge,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,X.__webglMultisampledFramebuffer)}else if(p.depthBuffer&&p.storeMultisampledDepthBuffer===!1&&c){let d=p.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[d])}}}function Qe(p){return Math.min(r.maxSamples,p.samples)}function $e(p){let d=i.get(p);return p.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&d.__useRenderToTexture!==!1}function B(p){let d=a.render.frame;u.get(p)!==d&&(u.set(p,d),p.update())}function xe(p,d){let S=p.colorSpace,A=p.format,P=p.type;return p.isCompressedTexture===!0||p.isVideoTexture===!0||S!==Ln&&S!==br&&(Et.getTransfer(S)===Ot?(A!==ri||P!==qn)&&Ze("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):rt("WebGLTextures: Unsupported texture color space:",S)),d}function me(p){return typeof HTMLImageElement<"u"&&p instanceof HTMLImageElement?(l.width=p.naturalWidth||p.width,l.height=p.naturalHeight||p.height):typeof VideoFrame<"u"&&p instanceof VideoFrame?(l.width=p.displayWidth,l.height=p.displayHeight):(l.width=p.width,l.height=p.height),l}this.allocateTextureUnit=oe,this.resetTextureUnits=Q,this.getTextureUnits=G,this.setTextureUnits=J,this.setTexture2D=pe,this.setTexture2DArray=ne,this.setTexture3D=ue,this.setTextureCube=de,this.rebindTextures=St,this.setupRenderTarget=Ct,this.updateRenderTargetMipmap=j,this.updateMultisampleRenderTarget=Ke,this.setupDepthRenderbuffer=ct,this.setupFrameBufferTexture=Ee,this.useMultisampledRTT=$e,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function ST(n,e){function t(i,r=br){let s,a=Et.getTransfer(r);if(i===qn)return n.UNSIGNED_BYTE;if(i===su)return n.UNSIGNED_SHORT_4_4_4_4;if(i===au)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Jd)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Qd)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===jd)return n.BYTE;if(i===$d)return n.SHORT;if(i===Ga)return n.UNSIGNED_SHORT;if(i===ru)return n.INT;if(i===Pi)return n.UNSIGNED_INT;if(i===ii)return n.FLOAT;if(i===Ni)return n.HALF_FLOAT;if(i===ef)return n.ALPHA;if(i===tf)return n.RGB;if(i===ri)return n.RGBA;if(i===Gi)return n.DEPTH_COMPONENT;if(i===Yr)return n.DEPTH_STENCIL;if(i===ou)return n.RED;if(i===lu)return n.RED_INTEGER;if(i===Zr)return n.RG;if(i===cu)return n.RG_INTEGER;if(i===uu)return n.RGBA_INTEGER;if(i===nl||i===il||i===rl||i===sl)if(a===Ot)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===nl)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===il)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===rl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===sl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===nl)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===il)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===rl)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===sl)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===hu||i===du||i===fu||i===pu)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===hu)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===du)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===fu)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===pu)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===mu||i===gu||i===_u||i===xu||i===vu||i===al||i===yu)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===mu||i===gu)return a===Ot?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===_u)return a===Ot?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===xu)return s.COMPRESSED_R11_EAC;if(i===vu)return s.COMPRESSED_SIGNED_R11_EAC;if(i===al)return s.COMPRESSED_RG11_EAC;if(i===yu)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Su||i===bu||i===Mu||i===Eu||i===Tu||i===Au||i===wu||i===Ru||i===Iu||i===Cu||i===Pu||i===Nu||i===Lu||i===Du)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Su)return a===Ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===bu)return a===Ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Mu)return a===Ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Eu)return a===Ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Tu)return a===Ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Au)return a===Ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===wu)return a===Ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Ru)return a===Ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Iu)return a===Ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Cu)return a===Ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Pu)return a===Ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Nu)return a===Ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Lu)return a===Ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Du)return a===Ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Uu||i===Ou||i===Fu)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Uu)return a===Ot?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ou)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Fu)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Bu||i===ku||i===ol||i===zu)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Bu)return s.COMPRESSED_RED_RGTC1_EXT;if(i===ku)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===ol)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===zu)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ha?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var bT=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,MT=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Ef=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new Wo(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new ni({vertexShader:bT,fragmentShader:MT,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new cn(new Is(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Tf=class extends Hi{constructor(e,t){super();let i=this,r=null,s=1,a=null,o="local-floor",c=1,l=null,u=null,h=null,f=null,m=null,x=null,v=typeof XRWebGLBinding<"u",g=new Ef,_={},T=t.getContextAttributes(),I=null,E=null,w=[],R=[],C=new xt,y=null,N=null,k=new _n;k.viewport=new kt;let W=new _n;W.viewport=new kt;let q=[k,W],Q=new eu,G=null,J=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ie){let te=w[ie];return te===void 0&&(te=new wa,w[ie]=te),te.getTargetRaySpace()},this.getControllerGrip=function(ie){let te=w[ie];return te===void 0&&(te=new wa,w[ie]=te),te.getGripSpace()},this.getHand=function(ie){let te=w[ie];return te===void 0&&(te=new wa,w[ie]=te),te.getHandSpace()};function oe(ie){let te=R.indexOf(ie.inputSource);if(te===-1)return;let Ne=w[te];Ne!==void 0&&(Ne.update(ie.inputSource,ie.frame,l||a),Ne.dispatchEvent({type:ie.type,data:ie.inputSource}))}function re(){r.removeEventListener("select",oe),r.removeEventListener("selectstart",oe),r.removeEventListener("selectend",oe),r.removeEventListener("squeeze",oe),r.removeEventListener("squeezestart",oe),r.removeEventListener("squeezeend",oe),r.removeEventListener("end",re),r.removeEventListener("inputsourceschange",pe);for(let ie=0;ie<w.length;ie++){let te=R[ie];te!==null&&(R[ie]=null,w[ie].disconnect(te))}G=null,J=null,g.reset();for(let ie in _)delete _[ie];if(e.setRenderTarget(I),m=null,f=null,h=null,r=null,E=null,vt.stop(),i.isPresenting=!1,e.setPixelRatio(y),e.setSize(C.width,C.height,!1),N!==null){let ie=N.camera;ie.fov=N.fov,ie.zoom=N.zoom,ie.updateProjectionMatrix(),N=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ie){s=ie,i.isPresenting===!0&&Ze("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ie){o=ie,i.isPresenting===!0&&Ze("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(ie){l=ie},this.getBaseLayer=function(){return f!==null?f:m},this.getBinding=function(){return h===null&&v&&(h=new XRWebGLBinding(r,t)),h},this.getFrame=function(){return x},this.getSession=function(){return r},this.setSession=async function(ie){if(r=ie,r!==null){if(I=e.getRenderTarget(),r.addEventListener("select",oe),r.addEventListener("selectstart",oe),r.addEventListener("selectend",oe),r.addEventListener("squeeze",oe),r.addEventListener("squeezestart",oe),r.addEventListener("squeezeend",oe),r.addEventListener("end",re),r.addEventListener("inputsourceschange",pe),T.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(C),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let Ne=null,Je=null,Ee=null;T.depth&&(Ee=T.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Ne=T.stencil?Yr:Gi,Je=T.stencil?Ha:Pi);let lt={colorFormat:t.RGBA8,depthFormat:Ee,scaleFactor:s};h=this.getBinding(),f=h.createProjectionLayer(lt),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),E=new zn(f.textureWidth,f.textureHeight,{format:ri,type:qn,depthTexture:new Wr(f.textureWidth,f.textureHeight,Je,void 0,void 0,void 0,void 0,void 0,void 0,Ne),stencilBuffer:T.stencil,colorSpace:e.outputColorSpace,samples:T.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{let Ne={antialias:T.antialias,alpha:!0,depth:T.depth,stencil:T.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,t,Ne),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),E=new zn(m.framebufferWidth,m.framebufferHeight,{format:ri,type:qn,colorSpace:e.outputColorSpace,stencilBuffer:T.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1,storeMultisampledDepthBuffer:m.ignoreDepthValues===!1,storeMultisampledStencilBuffer:m.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await r.requestReferenceSpace(o),vt.setContext(r),vt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function pe(ie){for(let te=0;te<ie.removed.length;te++){let Ne=ie.removed[te],Je=R.indexOf(Ne);Je>=0&&(R[Je]=null,w[Je].disconnect(Ne))}for(let te=0;te<ie.added.length;te++){let Ne=ie.added[te],Je=R.indexOf(Ne);if(Je===-1){for(let lt=0;lt<w.length;lt++)if(lt>=R.length){R.push(Ne),Je=lt;break}else if(R[lt]===null){R[lt]=Ne,Je=lt;break}if(Je===-1)break}let Ee=w[Je];Ee&&Ee.connect(Ne)}}let ne=new Z,ue=new Z;function de(ie,te,Ne){ne.setFromMatrixPosition(te.matrixWorld),ue.setFromMatrixPosition(Ne.matrixWorld);let Je=ne.distanceTo(ue),Ee=te.projectionMatrix.elements,lt=Ne.projectionMatrix.elements,It=Ee[14]/(Ee[10]-1),ct=Ee[14]/(Ee[10]+1),St=(Ee[9]+1)/Ee[5],Ct=(Ee[9]-1)/Ee[5],j=(Ee[8]-1)/Ee[0],_e=(lt[8]+1)/lt[0],ze=It*j,Ke=It*_e,Qe=Je/(-j+_e),$e=Qe*-j;if(te.matrixWorld.decompose(ie.position,ie.quaternion,ie.scale),ie.translateX($e),ie.translateZ(Qe),ie.matrixWorld.compose(ie.position,ie.quaternion,ie.scale),ie.matrixWorldInverse.copy(ie.matrixWorld).invert(),Ee[10]===-1)ie.projectionMatrix.copy(te.projectionMatrix),ie.projectionMatrixInverse.copy(te.projectionMatrixInverse);else{let B=It+Qe,xe=ct+Qe,me=ze-$e,p=Ke+(Je-$e),d=St*ct/xe*B,S=Ct*ct/xe*B;ie.projectionMatrix.makePerspective(me,p,d,S,B,xe),ie.projectionMatrixInverse.copy(ie.projectionMatrix).invert()}}function He(ie,te){te===null?ie.matrixWorld.copy(ie.matrix):ie.matrixWorld.multiplyMatrices(te.matrixWorld,ie.matrix),ie.matrixWorldInverse.copy(ie.matrixWorld).invert()}this.updateCamera=function(ie){if(r===null)return;let te=ie.near,Ne=ie.far;g.texture!==null&&(g.depthNear>0&&(te=g.depthNear),g.depthFar>0&&(Ne=g.depthFar)),Q.near=W.near=k.near=te,Q.far=W.far=k.far=Ne,(G!==Q.near||J!==Q.far)&&(r.updateRenderState({depthNear:Q.near,depthFar:Q.far}),G=Q.near,J=Q.far),Q.layers.mask=ie.layers.mask|6,k.layers.mask=Q.layers.mask&-5,W.layers.mask=Q.layers.mask&-3;let Je=ie.parent,Ee=Q.cameras;He(Q,Je);for(let lt=0;lt<Ee.length;lt++)He(Ee[lt],Je);Ee.length===2?de(Q,k,W):Q.projectionMatrix.copy(k.projectionMatrix),N===null&&ie.isPerspectiveCamera&&(N={camera:ie,fov:ie.fov,zoom:ie.zoom}),Ce(ie,Q,Je)};function Ce(ie,te,Ne){Ne===null?ie.matrix.copy(te.matrixWorld):(ie.matrix.copy(Ne.matrixWorld),ie.matrix.invert(),ie.matrix.multiply(te.matrixWorld)),ie.matrix.decompose(ie.position,ie.quaternion,ie.scale),ie.updateMatrixWorld(!0),ie.projectionMatrix.copy(te.projectionMatrix),ie.projectionMatrixInverse.copy(te.projectionMatrixInverse),ie.isPerspectiveCamera&&(ie.fov=ws*2*Math.atan(1/ie.projectionMatrix.elements[5]),ie.zoom=1)}this.getCamera=function(){return Q},this.getFoveation=function(){if(!(f===null&&m===null))return c},this.setFoveation=function(ie){c=ie,f!==null&&(f.fixedFoveation=ie),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=ie)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(Q)},this.getCameraTexture=function(ie){return _[ie]};let dt=null;function nt(ie,te){if(u=te.getViewerPose(l||a),x=te,u!==null){let Ne=u.views;m!==null&&(e.setRenderTargetFramebuffer(E,m.framebuffer),e.setRenderTarget(E));let Je=!1;Ne.length!==Q.cameras.length&&(Q.cameras.length=0,Je=!0);for(let ct=0;ct<Ne.length;ct++){let St=Ne[ct],Ct=null;if(m!==null)Ct=m.getViewport(St);else{let _e=h.getViewSubImage(f,St);Ct=_e.viewport,ct===0&&(e.setRenderTargetTextures(E,_e.colorTexture,_e.depthStencilTexture),e.setRenderTarget(E))}let j=q[ct];j===void 0&&(j=new _n,j.layers.enable(ct),j.viewport=new kt,q[ct]=j),j.matrix.fromArray(St.transform.matrix),j.matrix.decompose(j.position,j.quaternion,j.scale),j.projectionMatrix.fromArray(St.projectionMatrix),j.projectionMatrixInverse.copy(j.projectionMatrix).invert(),j.viewport.set(Ct.x,Ct.y,Ct.width,Ct.height),ct===0&&(Q.matrix.copy(j.matrix),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale)),Je===!0&&Q.cameras.push(j)}let Ee=r.enabledFeatures;if(Ee&&Ee.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&v){h=i.getBinding();let ct=h.getDepthInformation(Ne[0]);ct&&ct.isValid&&ct.texture&&g.init(ct,r.renderState)}if(Ee&&Ee.includes("camera-access")&&v){e.state.unbindTexture(),h=i.getBinding();for(let ct=0;ct<Ne.length;ct++){let St=Ne[ct].camera;if(St){let Ct=_[St];Ct||(Ct=new Wo,_[St]=Ct);let j=h.getCameraImage(St);Ct.sourceTexture=j}}}}for(let Ne=0;Ne<w.length;Ne++){let Je=R[Ne],Ee=w[Ne];Je!==null&&Ee!==void 0&&Ee.update(Je,te,l||a)}dt&&dt(ie,te),te.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:te}),x=null}let vt=new e0;vt.setAnimationLoop(nt),this.setAnimationLoop=function(ie){dt=ie},this.dispose=function(){}}},ET=new ft,a0=new ut;a0.set(-1,0,0,0,1,0,0,0,1);function TT(n,e){function t(g,_){g.matrixAutoUpdate===!0&&g.updateMatrix(),_.value.copy(g.matrix)}function i(g,_){_.color.getRGB(g.fogColor.value,of(n)),_.isFog?(g.fogNear.value=_.near,g.fogFar.value=_.far):_.isFogExp2&&(g.fogDensity.value=_.density)}function r(g,_,T,I,E){_.isNodeMaterial?_.uniformsNeedUpdate=!1:_.isMeshBasicMaterial?s(g,_):_.isMeshLambertMaterial?(s(g,_),_.envMap&&(g.envMapIntensity.value=_.envMapIntensity)):_.isMeshToonMaterial?(s(g,_),h(g,_)):_.isMeshPhongMaterial?(s(g,_),u(g,_),_.envMap&&(g.envMapIntensity.value=_.envMapIntensity)):_.isMeshStandardMaterial?(s(g,_),f(g,_),_.isMeshPhysicalMaterial&&m(g,_,E)):_.isMeshMatcapMaterial?(s(g,_),x(g,_)):_.isMeshDepthMaterial?s(g,_):_.isMeshDistanceMaterial?(s(g,_),v(g,_)):_.isMeshNormalMaterial?s(g,_):_.isLineBasicMaterial?(a(g,_),_.isLineDashedMaterial&&o(g,_)):_.isPointsMaterial?c(g,_,T,I):_.isSpriteMaterial?l(g,_):_.isShadowMaterial?(g.color.value.copy(_.color),g.opacity.value=_.opacity):_.isShaderMaterial&&(_.uniformsNeedUpdate=!1)}function s(g,_){g.opacity.value=_.opacity,_.color&&g.diffuse.value.copy(_.color),_.emissive&&g.emissive.value.copy(_.emissive).multiplyScalar(_.emissiveIntensity),_.map&&(g.map.value=_.map,t(_.map,g.mapTransform)),_.alphaMap&&(g.alphaMap.value=_.alphaMap,t(_.alphaMap,g.alphaMapTransform)),_.bumpMap&&(g.bumpMap.value=_.bumpMap,t(_.bumpMap,g.bumpMapTransform),g.bumpScale.value=_.bumpScale,_.side===Dn&&(g.bumpScale.value*=-1)),_.normalMap&&(g.normalMap.value=_.normalMap,t(_.normalMap,g.normalMapTransform),g.normalScale.value.copy(_.normalScale),_.side===Dn&&g.normalScale.value.negate()),_.displacementMap&&(g.displacementMap.value=_.displacementMap,t(_.displacementMap,g.displacementMapTransform),g.displacementScale.value=_.displacementScale,g.displacementBias.value=_.displacementBias),_.emissiveMap&&(g.emissiveMap.value=_.emissiveMap,t(_.emissiveMap,g.emissiveMapTransform)),_.specularMap&&(g.specularMap.value=_.specularMap,t(_.specularMap,g.specularMapTransform)),_.alphaTest>0&&(g.alphaTest.value=_.alphaTest);let T=e.get(_),I=T.envMap,E=T.envMapRotation;I&&(g.envMap.value=I,g.envMapRotation.value.setFromMatrix4(ET.makeRotationFromEuler(E)).transpose(),I.isCubeTexture&&I.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(a0),g.reflectivity.value=_.reflectivity,g.ior.value=_.ior,g.refractionRatio.value=_.refractionRatio),_.lightMap&&(g.lightMap.value=_.lightMap,g.lightMapIntensity.value=_.lightMapIntensity,t(_.lightMap,g.lightMapTransform)),_.aoMap&&(g.aoMap.value=_.aoMap,g.aoMapIntensity.value=_.aoMapIntensity,t(_.aoMap,g.aoMapTransform))}function a(g,_){g.diffuse.value.copy(_.color),g.opacity.value=_.opacity,_.map&&(g.map.value=_.map,t(_.map,g.mapTransform))}function o(g,_){g.dashSize.value=_.dashSize,g.totalSize.value=_.dashSize+_.gapSize,g.scale.value=_.scale}function c(g,_,T,I){g.diffuse.value.copy(_.color),g.opacity.value=_.opacity,g.size.value=_.size*T,g.scale.value=I*.5,_.map&&(g.map.value=_.map,t(_.map,g.uvTransform)),_.alphaMap&&(g.alphaMap.value=_.alphaMap,t(_.alphaMap,g.alphaMapTransform)),_.alphaTest>0&&(g.alphaTest.value=_.alphaTest)}function l(g,_){g.diffuse.value.copy(_.color),g.opacity.value=_.opacity,g.rotation.value=_.rotation,_.map&&(g.map.value=_.map,t(_.map,g.mapTransform)),_.alphaMap&&(g.alphaMap.value=_.alphaMap,t(_.alphaMap,g.alphaMapTransform)),_.alphaTest>0&&(g.alphaTest.value=_.alphaTest)}function u(g,_){g.specular.value.copy(_.specular),g.shininess.value=Math.max(_.shininess,1e-4)}function h(g,_){_.gradientMap&&(g.gradientMap.value=_.gradientMap)}function f(g,_){g.metalness.value=_.metalness,_.metalnessMap&&(g.metalnessMap.value=_.metalnessMap,t(_.metalnessMap,g.metalnessMapTransform)),g.roughness.value=_.roughness,_.roughnessMap&&(g.roughnessMap.value=_.roughnessMap,t(_.roughnessMap,g.roughnessMapTransform)),_.envMap&&(g.envMapIntensity.value=_.envMapIntensity)}function m(g,_,T){g.ior.value=_.ior,_.sheen>0&&(g.sheenColor.value.copy(_.sheenColor).multiplyScalar(_.sheen),g.sheenRoughness.value=_.sheenRoughness,_.sheenColorMap&&(g.sheenColorMap.value=_.sheenColorMap,t(_.sheenColorMap,g.sheenColorMapTransform)),_.sheenRoughnessMap&&(g.sheenRoughnessMap.value=_.sheenRoughnessMap,t(_.sheenRoughnessMap,g.sheenRoughnessMapTransform))),_.clearcoat>0&&(g.clearcoat.value=_.clearcoat,g.clearcoatRoughness.value=_.clearcoatRoughness,_.clearcoatMap&&(g.clearcoatMap.value=_.clearcoatMap,t(_.clearcoatMap,g.clearcoatMapTransform)),_.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=_.clearcoatRoughnessMap,t(_.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),_.clearcoatNormalMap&&(g.clearcoatNormalMap.value=_.clearcoatNormalMap,t(_.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(_.clearcoatNormalScale),_.side===Dn&&g.clearcoatNormalScale.value.negate())),_.dispersion>0&&(g.dispersion.value=_.dispersion),_.retroreflectivity>0&&(g.retroreflectivity.value=_.retroreflectivity),_.iridescence>0&&(g.iridescence.value=_.iridescence,g.iridescenceIOR.value=_.iridescenceIOR,g.iridescenceThicknessMinimum.value=_.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=_.iridescenceThicknessRange[1],_.iridescenceMap&&(g.iridescenceMap.value=_.iridescenceMap,t(_.iridescenceMap,g.iridescenceMapTransform)),_.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=_.iridescenceThicknessMap,t(_.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),_.transmission>0&&(g.transmission.value=_.transmission,g.transmissionSamplerMap.value=T.texture,g.transmissionSamplerSize.value.set(T.width,T.height),_.transmissionMap&&(g.transmissionMap.value=_.transmissionMap,t(_.transmissionMap,g.transmissionMapTransform)),g.thickness.value=_.thickness,_.thicknessMap&&(g.thicknessMap.value=_.thicknessMap,t(_.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=_.attenuationDistance,g.attenuationColor.value.copy(_.attenuationColor)),_.anisotropy>0&&(g.anisotropyVector.value.set(_.anisotropy*Math.cos(_.anisotropyRotation),_.anisotropy*Math.sin(_.anisotropyRotation)),_.anisotropyMap&&(g.anisotropyMap.value=_.anisotropyMap,t(_.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=_.specularIntensity,g.specularColor.value.copy(_.specularColor),_.specularColorMap&&(g.specularColorMap.value=_.specularColorMap,t(_.specularColorMap,g.specularColorMapTransform)),_.specularIntensityMap&&(g.specularIntensityMap.value=_.specularIntensityMap,t(_.specularIntensityMap,g.specularIntensityMapTransform))}function x(g,_){_.matcap&&(g.matcap.value=_.matcap)}function v(g,_){let T=e.get(_).light;g.referencePosition.value.setFromMatrixPosition(T.matrixWorld),g.nearDistance.value=T.shadow.camera.near,g.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function AT(n,e,t,i){let r={},s={},a=[],o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(E,w){let R=w.program;i.uniformBlockBinding(E,R)}function l(E,w){let R=r[E.id];R===void 0&&(g(E),R=u(E),r[E.id]=R,E.addEventListener("dispose",T));let C=w.program;i.updateUBOMapping(E,C);let y=e.render.frame;s[E.id]!==y&&(f(E),s[E.id]=y)}function u(E){let w=h();E.__bindingPointIndex=w;let R=n.createBuffer(),C=E.__size,y=E.usage;return n.bindBuffer(n.UNIFORM_BUFFER,R),n.bufferData(n.UNIFORM_BUFFER,C,y),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,R),R}function h(){for(let E=0;E<o;E++)if(a.indexOf(E)===-1)return a.push(E),E;return rt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(E){let w=r[E.id],R=E.uniforms,C=E.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let y=0,N=R.length;y<N;y++){let k=R[y];if(Array.isArray(k))for(let W=0,q=k.length;W<q;W++)m(k[W],y,W,C);else m(k,y,0,C)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function m(E,w,R,C){if(v(E,w,R,C)===!0){let y=E.__offset,N=E.value;if(Array.isArray(N)){let k=0;for(let W=0;W<N.length;W++){let q=N[W],Q=_(q);x(q,E.__data,k),typeof q!="number"&&typeof q!="boolean"&&!q.isMatrix3&&!ArrayBuffer.isView(q)&&(k+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}}else x(N,E.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,y,E.__data)}}function x(E,w,R){typeof E=="number"||typeof E=="boolean"?w[0]=E:E.isMatrix3?(w[0]=E.elements[0],w[1]=E.elements[1],w[2]=E.elements[2],w[3]=0,w[4]=E.elements[3],w[5]=E.elements[4],w[6]=E.elements[5],w[7]=0,w[8]=E.elements[6],w[9]=E.elements[7],w[10]=E.elements[8],w[11]=0):ArrayBuffer.isView(E)?w.set(new E.constructor(E.buffer,E.byteOffset,w.length)):E.toArray(w,R)}function v(E,w,R,C){let y=E.value,N=w+"_"+R;if(C[N]===void 0)return typeof y=="number"||typeof y=="boolean"?C[N]=y:ArrayBuffer.isView(y)?C[N]=y.slice():C[N]=y.clone(),!0;{let k=C[N];if(typeof y=="number"||typeof y=="boolean"){if(k!==y)return C[N]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(k.equals(y)===!1)return k.copy(y),!0}}return!1}function g(E){let w=E.uniforms,R=0,C=16;for(let N=0,k=w.length;N<k;N++){let W=Array.isArray(w[N])?w[N]:[w[N]];for(let q=0,Q=W.length;q<Q;q++){let G=W[q],J=Array.isArray(G.value)?G.value:[G.value];for(let oe=0,re=J.length;oe<re;oe++){let pe=J[oe],ne=_(pe),ue=R%C,de=ue%ne.boundary,He=ue+de;R+=de,He!==0&&C-He<ne.storage&&(R+=C-He),G.__data=new Float32Array(ne.storage/Float32Array.BYTES_PER_ELEMENT),G.__offset=R,R+=ne.storage}}}let y=R%C;return y>0&&(R+=C-y),E.__size=R,E.__cache={},this}function _(E){let w={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(w.boundary=4,w.storage=4):E.isVector2?(w.boundary=8,w.storage=8):E.isVector3||E.isColor?(w.boundary=16,w.storage=12):E.isVector4?(w.boundary=16,w.storage=16):E.isMatrix3?(w.boundary=48,w.storage=48):E.isMatrix4?(w.boundary=64,w.storage=64):E.isTexture?Ze("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(E)?(w.boundary=16,w.storage=E.byteLength):Ze("WebGLRenderer: Unsupported uniform value type.",E),w}function T(E){let w=E.target;w.removeEventListener("dispose",T);let R=a.indexOf(w.__bindingPointIndex);a.splice(R,1),n.deleteBuffer(r[w.id]),delete r[w.id],delete s[w.id]}function I(){for(let E in r)n.deleteBuffer(r[E]);a=[],r={},s={}}return{bind:c,update:l,dispose:I}}var wT=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Ki=null;function RT(){return Ki===null&&(Ki=new Pa(wT,16,16,Zr,Ni),Ki.name="DFG_LUT",Ki.minFilter=Jt,Ki.magFilter=Jt,Ki.wrapS=pi,Ki.wrapT=pi,Ki.generateMipmaps=!1,Ki.needsUpdate=!0),Ki}var Zu=class{constructor(e={}){let{canvas:t=T_(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:f=!1,outputBufferType:m=qn}=e;this.isWebGLRenderer=!0;let x;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=i.getContextAttributes().alpha}else x=a;let v=m,g=new Set([uu,cu,lu]),_=new Set([qn,Pi,Ga,Ha,su,au]),T=new Uint32Array(4),I=new Int32Array(4),E=new Z,w=null,R=null,C=[],y=[],N=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ii,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let k=this,W=!1,q=null,Q=null,G=null,J=null;this._outputColorSpace=nn;let oe=0,re=0,pe=null,ne=-1,ue=null,de=new kt,He=new kt,Ce=null,dt=new st(0),nt=0,vt=t.width,ie=t.height,te=1,Ne=null,Je=null,Ee=new kt(0,0,vt,ie),lt=new kt(0,0,vt,ie),It=!1,ct=new Na,St=!1,Ct=!1,j=new ft,_e=new Z,ze=new kt,Ke={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Qe=!1;function $e(){return pe===null?te:1}let B=i;function xe(M,z){return t.getContext(M,z)}let me,p,d,S,A,P,D,X,L,F,se,ge,le,he,Pe,Oe,at,H,Te,ce,Me,we,fe;try{let M={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",zt,!1),t.addEventListener("webglcontextrestored",Lt,!1),t.addEventListener("webglcontextcreationerror",Yn,!1),B===null){let z="webgl2";if(B=xe(z,M),B===null)throw xe(z)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}qe()}catch(M){throw t.removeEventListener("webglcontextlost",zt,!1),t.removeEventListener("webglcontextrestored",Lt,!1),t.removeEventListener("webglcontextcreationerror",Yn,!1),rt("WebGLRenderer: "+M.message),M}function qe(){me=new UM(B),me.init(),Me=new ST(B,me),p=new TM(B,me,e,Me),d=new vT(B,me),p.reversedDepthBuffer&&f&&d.buffers.depth.setReversed(!0),Q=B.createFramebuffer(),G=B.createFramebuffer(),J=B.createFramebuffer(),S=new BM(B),A=new sT,P=new yT(B,me,d,A,p,Me,S),D=new DM(k),X=new zy(B),we=new MM(B,X),L=new OM(B,X,S,we),F=new zM(B,L,X,we,S),H=new kM(B,p,P),Pe=new AM(A),se=new rT(k,D,me,p,we,Pe),ge=new TT(k,A),le=new oT,he=new fT(me),at=new bM(k,D,d,F,x,c),Oe=new xT(k,F,p),fe=new AT(B,S,p,d),Te=new EM(B,me,S),ce=new FM(B,me,S),S.programs=se.programs,k.capabilities=p,k.extensions=me,k.properties=A,k.renderLists=le,k.shadowMap=Oe,k.state=d,k.info=S}v!==qn&&(N=new GM(v,t.width,t.height,o,r,s));let Be=new Tf(k,B);this.xr=Be,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){let M=me.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){let M=me.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return te},this.setPixelRatio=function(M){M!==void 0&&(te=M,this.setSize(vt,ie,!1))},this.getSize=function(M){return M.set(vt,ie)},this.setSize=function(M,z,ee=!0){if(Be.isPresenting){Ze("WebGLRenderer: Can't change size while VR device is presenting.");return}vt=M,ie=z,t.width=Math.floor(M*te),t.height=Math.floor(z*te),ee===!0&&(t.style.width=M+"px",t.style.height=z+"px"),N!==null&&N.setSize(t.width,t.height),this.setViewport(0,0,M,z)},this.getDrawingBufferSize=function(M){return M.set(vt*te,ie*te).floor()},this.setDrawingBufferSize=function(M,z,ee){vt=M,ie=z,te=ee,t.width=Math.floor(M*ee),t.height=Math.floor(z*ee),this.setViewport(0,0,M,z)},this.setEffects=function(M){if(v===qn){rt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let z=0;z<M.length;z++)if(M[z].isOutputPass===!0){Ze("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}N.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(de)},this.getViewport=function(M){return M.copy(Ee)},this.setViewport=function(M,z,ee,$){M.isVector4?Ee.set(M.x,M.y,M.z,M.w):Ee.set(M,z,ee,$),d.viewport(de.copy(Ee).multiplyScalar(te).round())},this.getScissor=function(M){return M.copy(lt)},this.setScissor=function(M,z,ee,$){M.isVector4?lt.set(M.x,M.y,M.z,M.w):lt.set(M,z,ee,$),d.scissor(He.copy(lt).multiplyScalar(te).round())},this.getScissorTest=function(){return It},this.setScissorTest=function(M){d.setScissorTest(It=M)},this.setOpaqueSort=function(M){Ne=M},this.setTransparentSort=function(M){Je=M},this.getClearColor=function(M){return M.copy(at.getClearColor())},this.setClearColor=function(){at.setClearColor(...arguments)},this.getClearAlpha=function(){return at.getClearAlpha()},this.setClearAlpha=function(){at.setClearAlpha(...arguments)},this.clear=function(M=!0,z=!0,ee=!0){let $=0;if(M){let K=!1;if(pe!==null){let Re=pe.texture.format;K=g.has(Re)}if(K){let Re=pe.texture.type,Fe=_.has(Re),Ae=at.getClearColor(),Ve=at.getClearAlpha(),Xe=Ae.r,pt=Ae.g,mt=Ae.b;Fe?(T[0]=Xe,T[1]=pt,T[2]=mt,T[3]=Ve,B.clearBufferuiv(B.COLOR,0,T)):(I[0]=Xe,I[1]=pt,I[2]=mt,I[3]=Ve,B.clearBufferiv(B.COLOR,0,I))}else $|=B.COLOR_BUFFER_BIT}z&&($|=B.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ee&&($|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),$!==0&&B.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),q=M},this.dispose=function(){t.removeEventListener("webglcontextlost",zt,!1),t.removeEventListener("webglcontextrestored",Lt,!1),t.removeEventListener("webglcontextcreationerror",Yn,!1),at.dispose(),le.dispose(),he.dispose(),A.dispose(),D.dispose(),F.dispose(),we.dispose(),fe.dispose(),se.dispose(),Be.dispose(),Be.removeEventListener("sessionstart",xl),Be.removeEventListener("sessionend",vl),Qi.stop()};function zt(M){M.preventDefault(),No("WebGLRenderer: Context Lost."),W=!0}function Lt(){No("WebGLRenderer: Context Restored."),W=!1;let M=S.autoReset,z=Oe.enabled,ee=Oe.autoUpdate,$=Oe.needsUpdate,K=Oe.type;qe(),S.autoReset=M,Oe.enabled=z,Oe.autoUpdate=ee,Oe.needsUpdate=$,Oe.type=K}function Yn(M){rt("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function si(M){let z=M.target;z.removeEventListener("dispose",si),th(z)}function th(M){ks(M),A.remove(M)}function ks(M){let z=A.get(M).programs;z!==void 0&&(z.forEach(function(ee){se.releaseProgram(ee)}),M.isShaderMaterial&&se.releaseShaderCache(M))}this.renderBufferDirect=function(M,z,ee,$,K,Re){z===null&&(z=Ke);let Fe=K.isMesh&&K.matrixWorld.determinantAffine()<0,Ae=nh(M,z,ee,$,K);d.setMaterial($,Fe);let Ve=ee.index,Xe=1;if($.wireframe===!0){if(Ve=L.getWireframeAttribute(ee),Ve===void 0)return;Xe=2}let pt=ee.drawRange,mt=ee.attributes.position,Ge=pt.start*Xe,Dt=(pt.start+pt.count)*Xe;Re!==null&&(Ge=Math.max(Ge,Re.start*Xe),Dt=Math.min(Dt,(Re.start+Re.count)*Xe)),Ve!==null?(Ge=Math.max(Ge,0),Dt=Math.min(Dt,Ve.count)):mt!=null&&(Ge=Math.max(Ge,0),Dt=Math.min(Dt,mt.count));let en=Dt-Ge;if(en<0||en===1/0)return;we.setup(K,$,Ae,ee,Ve);let Vt,Ft=Te;if(Ve!==null&&(Vt=X.get(Ve),Ft=ce,Ft.setIndex(Vt)),K.isMesh)$.wireframe===!0?(d.setLineWidth($.wireframeLinewidth*$e()),Ft.setMode(B.LINES)):Ft.setMode(B.TRIANGLES);else if(K.isLine){let pn=$.linewidth;pn===void 0&&(pn=1),d.setLineWidth(pn*$e()),K.isLineSegments?Ft.setMode(B.LINES):K.isLineLoop?Ft.setMode(B.LINE_LOOP):Ft.setMode(B.LINE_STRIP)}else K.isPoints?Ft.setMode(B.POINTS):K.isSprite&&Ft.setMode(B.TRIANGLES);if(K.isBatchedMesh)if(me.get("WEBGL_multi_draw"))Ft.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else{let pn=K._multiDrawStarts,De=K._multiDrawCounts,yn=K._multiDrawCount,Pt=Ve?X.get(Ve).bytesPerElement:1,On=A.get($).currentProgram.getUniforms();for(let oi=0;oi<yn;oi++)On.setValue(B,"_gl_DrawID",oi),Ft.render(pn[oi]/Pt,De[oi])}else if(K.isInstancedMesh)Ft.renderInstances(Ge,en,K.count);else if(ee.isInstancedBufferGeometry){let pn=ee._maxInstanceCount!==void 0?ee._maxInstanceCount:1/0,De=Math.min(ee.instanceCount,pn);Ft.renderInstances(Ge,en,De)}else Ft.render(Ge,en)};function zs(M,z,ee,$){q!==null&&M.isNodeMaterial&&q.setObject($,M),St===!0&&Pe.setState(M,ee,!1),M.transparent===!0&&M.side===Un&&M.forceSinglePass===!1?(M.side=Dn,M.needsUpdate=!0,Hs(M,z,$),M.side=Yi,M.needsUpdate=!0,Hs(M,z,$),M.side=Un):Hs(M,z,$)}this.compile=function(M,z,ee=null){ee===null&&(ee=M),q!==null&&q.renderStart(M,z,ee),R=he.get(ee),R.init(z),y.push(R),ee.traverseVisible(function(K){K.isLight&&K.layers.test(z.layers)&&(R.pushLight(K),K.castShadow&&R.pushShadow(K))}),M!==ee&&M.traverseVisible(function(K){K.isLight&&K.layers.test(z.layers)&&(R.pushLight(K),K.castShadow&&R.pushShadow(K))}),R.setupLights(),q!==null&&q.updateLights(R.state.lightsArray),Ct=this.localClippingEnabled,St=Pe.init(this.clippingPlanes,Ct),St===!0&&Pe.setGlobalState(this.clippingPlanes,z),q!==null&&Oe.render(R.state.shadowsArray,ee,z);let $=new Set;return M.traverse(function(K){if(!(K.isMesh||K.isPoints||K.isLine||K.isSprite))return;let Re=K.material;if(Re)if(Array.isArray(Re))for(let Fe=0;Fe<Re.length;Fe++){let Ae=Re[Fe];zs(Ae,ee,z,K),$.add(Ae)}else zs(Re,ee,z,K),$.add(Re)}),R=y.pop(),q!==null&&q.renderEnd(),$},this.compileAsync=function(M,z,ee=null){let $=this.compile(M,z,ee);return new Promise(K=>{function Re(){if($.forEach(function(Fe){let Ve=A.get(Fe).currentProgram;(Ve===void 0||Ve.isReady())&&$.delete(Fe)}),$.size===0){K(M);return}setTimeout(Re,10)}me.get("KHR_parallel_shader_compile")!==null?Re():setTimeout(Re,10)})};let Vs=null;function Ji(M){Vs&&Vs(M)}function xl(){Qi.stop()}function vl(){Qi.start()}let Qi=new e0;Qi.setAnimationLoop(Ji),typeof self<"u"&&Qi.setContext(self),this.setAnimationLoop=function(M){Vs=M,Be.setAnimationLoop(M),M===null?Qi.stop():Qi.start()},Be.addEventListener("sessionstart",xl),Be.addEventListener("sessionend",vl),this.render=function(M,z){if(z!==void 0&&z.isCamera!==!0){rt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(W===!0)return;q!==null&&q.renderStart(M,z);let ee=Be.enabled===!0&&Be.isPresenting===!0,$=N!==null&&(pe===null||ee)&&N.begin(k,pe);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),Be.enabled===!0&&Be.isPresenting===!0&&(N===null||N.isCompositing()===!1)&&(Be.cameraAutoUpdate===!0&&Be.updateCamera(z),z=Be.getCamera()),M.isScene===!0&&M.onBeforeRender(k,M,z,pe),R=he.get(M,y.length),R.init(z),R.state.textureUnits=P.getTextureUnits(),y.push(R),j.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),ct.setFromProjectionMatrix(j,Ai,z.reversedDepth),Ct=this.localClippingEnabled,St=Pe.init(this.clippingPlanes,Ct),w=le.get(M,C.length),w.init(),C.push(w),Be.enabled===!0&&Be.isPresenting===!0){let Fe=k.xr.getDepthSensingMesh();Fe!==null&&Ja(Fe,z,-1/0,k.sortObjects)}Ja(M,z,0,k.sortObjects),w.finish(),q!==null&&q.updateLights(R.state.lightsArray),k.sortObjects===!0&&w.sort(Ne,Je),Qe=Be.enabled===!1||Be.isPresenting===!1||Be.hasDepthSensing()===!1,Qe&&at.addToRenderList(w,M),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),St===!0&&Pe.beginShadows();let K=R.state.shadowsArray;if(Oe.render(K,M,z),St===!0&&Pe.endShadows(),($&&N.hasRenderPass())===!1){let Fe=w.opaque,Ae=w.transmissive;if(R.setupLights(),z.isArrayCamera){let Ve=z.cameras;if(Ae.length>0)for(let Xe=0,pt=Ve.length;Xe<pt;Xe++){let mt=Ve[Xe];ai(Fe,Ae,M,mt)}Qe&&at.render(M);for(let Xe=0,pt=Ve.length;Xe<pt;Xe++){let mt=Ve[Xe];yl(w,M,mt,mt.viewport)}}else Ae.length>0&&ai(Fe,Ae,M,z),Qe&&at.render(M),yl(w,M,z)}pe!==null&&re===0&&(P.updateMultisampleRenderTarget(pe),P.updateRenderTargetMipmap(pe)),$&&N.end(k),M.isScene===!0&&M.onAfterRender(k,M,z),we.resetDefaultState(),ne=-1,ue=null,y.pop(),y.length>0?(R=y[y.length-1],P.setTextureUnits(R.state.textureUnits),St===!0&&Pe.setGlobalState(k.clippingPlanes,R.state.camera)):R=null,C.pop(),C.length>0?w=C[C.length-1]:w=null,q!==null&&q.renderEnd()};function Ja(M,z,ee,$){if(M.visible===!1)return;if(M.layers.test(z.layers)){if(M.isGroup)ee=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(z);else if(M.isLightProbeGrid)R.pushLightProbeGrid(M);else if(M.isLight)R.pushLight(M),M.castShadow&&R.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||M.intersectsFrustum(ct)){$&&ze.setFromMatrixPosition(M.matrixWorld).applyMatrix4(j);let Fe=F.update(M),Ae=M.material;Ae.visible&&w.push(M,Fe,Ae,ee,ze.z,null,z)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||M.intersectsFrustum(ct))){let Fe=F.update(M),Ae=M.material;if($&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),ze.copy(M.boundingSphere.center)):(Fe.boundingSphere===null&&Fe.computeBoundingSphere(),ze.copy(Fe.boundingSphere.center)),ze.applyMatrix4(M.matrixWorld).applyMatrix4(j)),Array.isArray(Ae)){let Ve=Fe.groups;for(let Xe=0,pt=Ve.length;Xe<pt;Xe++){let mt=Ve[Xe],Ge=Ae[mt.materialIndex];Ge&&Ge.visible&&w.push(M,Fe,Ge,ee,ze.z,mt,z)}}else Ae.visible&&w.push(M,Fe,Ae,ee,ze.z,null,z)}}let Re=M.children;for(let Fe=0,Ae=Re.length;Fe<Ae;Fe++)Ja(Re[Fe],z,ee,$)}function yl(M,z,ee,$){let{opaque:K,transmissive:Re,transparent:Fe}=M;R.setupLightsView(ee),St===!0&&Pe.setGlobalState(k.clippingPlanes,ee),$&&d.viewport(de.copy($)),K.length>0&&Gs(K,z,ee),Re.length>0&&Gs(Re,z,ee),Fe.length>0&&Gs(Fe,z,ee),d.buffers.depth.setTest(!0),d.buffers.depth.setMask(!0),d.buffers.color.setMask(!0),d.setPolygonOffset(!1)}function ai(M,z,ee,$){if((ee.isScene===!0?ee.overrideMaterial:null)!==null)return;if(R.state.transmissionRenderTarget[$.id]===void 0){let Ge=me.has("EXT_color_buffer_half_float")||me.has("EXT_color_buffer_float");R.state.transmissionRenderTarget[$.id]=new zn(1,1,{generateMipmaps:!0,type:Ge?Ni:qn,minFilter:Ci,samples:Math.max(4,p.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Et.workingColorSpace})}let Re=R.state.transmissionRenderTarget[$.id],Fe=$.viewport||de;Re.setSize(Fe.z*k.transmissionResolutionScale,Fe.w*k.transmissionResolutionScale);let Ae=k.getRenderTarget(),Ve=k.getActiveCubeFace(),Xe=k.getActiveMipmapLevel();k.setRenderTarget(Re),k.getClearColor(dt),nt=k.getClearAlpha(),nt<1&&k.setClearColor(16777215,.5),k.clear(),Qe&&at.render(ee);let pt=k.toneMapping;k.toneMapping=Ii;let mt=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),R.setupLightsView($),St===!0&&Pe.setGlobalState(k.clippingPlanes,$),Gs(M,ee,$),P.updateMultisampleRenderTarget(Re),P.updateRenderTargetMipmap(Re),me.has("WEBGL_multisampled_render_to_texture")===!1){let Ge=!1;for(let Dt=0,en=z.length;Dt<en;Dt++){let Vt=z[Dt],{object:Ft,geometry:pn,material:De,group:yn}=Vt;if(De.side===Un&&Ft.layers.test($.layers)){let Pt=De.side;De.side=Dn,De.needsUpdate=!0,Sl(Ft,ee,$,pn,De,yn),De.side=Pt,De.needsUpdate=!0,Ge=!0}}Ge===!0&&(P.updateMultisampleRenderTarget(Re),P.updateRenderTargetMipmap(Re))}k.setRenderTarget(Ae,Ve,Xe),k.setClearColor(dt,nt),mt!==void 0&&($.viewport=mt),k.toneMapping=pt}function Gs(M,z,ee){let $=z.isScene===!0?z.overrideMaterial:null;for(let K=0,Re=M.length;K<Re;K++){let Fe=M[K],{object:Ae,geometry:Ve,group:Xe}=Fe,pt=Fe.material;pt.allowOverride===!0&&$!==null&&(pt=$),Ae.layers.test(ee.layers)&&Sl(Ae,z,ee,Ve,pt,Xe)}}function Sl(M,z,ee,$,K,Re){q!==null&&K.isNodeMaterial&&q.setObject(M,K),M.onBeforeRender(k,z,ee,$,K,Re),M.modelViewMatrix.multiplyMatrices(ee.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),K.onBeforeRender(k,z,ee,$,M,Re),K.transparent===!0&&K.side===Un&&K.forceSinglePass===!1?(K.side=Dn,K.needsUpdate=!0,k.renderBufferDirect(ee,z,$,K,M,Re),K.side=Yi,K.needsUpdate=!0,k.renderBufferDirect(ee,z,$,K,M,Re),K.side=Un):k.renderBufferDirect(ee,z,$,K,M,Re),M.onAfterRender(k,z,ee,$,K,Re)}function Hs(M,z,ee){z.isScene!==!0&&(z=Ke);let $=A.get(M),K=R.state.lights,Re=R.state.shadowsArray,Fe=K.state.version,Ae=se.getParameters(M,K.state,Re,z,ee,R.state.lightProbeGridArray),Ve=se.getProgramCacheKey(Ae),Xe=$.programs;$.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?z.environment:null,$.fog=z.fog;let pt=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;$.envMap=D.get(M.envMap||$.environment,pt),$.envMapRotation=$.environment!==null&&M.envMap===null?z.environmentRotation:M.envMapRotation,Xe===void 0&&(M.addEventListener("dispose",si),Xe=new Map,$.programs=Xe);let mt=Xe.get(Ve);if(mt!==void 0){if($.currentProgram===mt&&$.lightsStateVersion===Fe)return Ml(M,Ae),mt}else Ae.uniforms=se.getUniforms(M),q!==null&&M.isNodeMaterial&&q.build(M,ee,Ae),M.onBeforeCompile(Ae,k),mt=se.acquireProgram(Ae,Ve),Xe.set(Ve,mt),$.uniforms=Ae.uniforms;let Ge=$.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Ge.clippingPlanes=Pe.uniform),Ml(M,Ae),$.needsLights=rh(M),$.lightsStateVersion=Fe,$.needsLights&&(Ge.ambientLightColor.value=K.state.ambient,Ge.lightProbe.value=K.state.probe,Ge.sunLights.value=K.state.sun,Ge.sunLightShadows.value=K.state.sunShadow,Ge.directionalLights.value=K.state.directional,Ge.directionalLightShadows.value=K.state.directionalShadow,Ge.spotLights.value=K.state.spot,Ge.spotLightShadows.value=K.state.spotShadow,Ge.rectAreaLights.value=K.state.rectArea,Ge.ltc_1.value=K.state.rectAreaLTC1,Ge.ltc_2.value=K.state.rectAreaLTC2,Ge.pointLights.value=K.state.point,Ge.pointLightShadows.value=K.state.pointShadow,Ge.hemisphereLights.value=K.state.hemi,Ge.sunShadowMatrix.value=K.state.sunShadowMatrix,Ge.sunShadowCascade.value=K.state.sunShadowCascade,Ge.directionalShadowMatrix.value=K.state.directionalShadowMatrix,Ge.spotLightMatrix.value=K.state.spotLightMatrix,Ge.spotLightMap.value=K.state.spotLightMap,Ge.pointShadowMatrix.value=K.state.pointShadowMatrix),$.lightProbeGrid=R.state.lightProbeGridArray.length>0,$.currentProgram=mt,$.uniformsList=null,mt}function bl(M){if(M.uniformsList===null){let z=M.currentProgram.getUniforms();M.uniformsList=Za.seqWithValue(z.seq,M.uniforms)}return M.uniformsList}function Ml(M,z){let ee=A.get(M);ee.outputColorSpace=z.outputColorSpace,ee.batching=z.batching,ee.batchingColor=z.batchingColor,ee.instancing=z.instancing,ee.instancingColor=z.instancingColor,ee.instancingMorph=z.instancingMorph,ee.skinning=z.skinning,ee.morphTargets=z.morphTargets,ee.morphNormals=z.morphNormals,ee.morphColors=z.morphColors,ee.morphTargetsCount=z.morphTargetsCount,ee.numClippingPlanes=z.numClippingPlanes,ee.numIntersection=z.numClipIntersection,ee.vertexAlphas=z.vertexAlphas,ee.vertexTangents=z.vertexTangents,ee.toneMapping=z.toneMapping}function _i(M,z){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;E.setFromMatrixPosition(z.matrixWorld);for(let ee=0,$=M.length;ee<$;ee++){let K=M[ee];if(K.texture!==null&&K.boundingBox.containsPoint(E))return K}return null}function nh(M,z,ee,$,K){z.isScene!==!0&&(z=Ke),P.resetTextureUnits();let Re=z.fog,Fe=$.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial?z.environment:null,Ae=pe===null?k.outputColorSpace:pe.isXRRenderTarget===!0?pe.texture.colorSpace:Et.workingColorSpace,Ve=$.isMeshStandardMaterial||$.isMeshLambertMaterial&&!$.envMap||$.isMeshPhongMaterial&&!$.envMap,Xe=D.get($.envMap||Fe,Ve),pt=$.vertexColors===!0&&!!ee.attributes.color&&ee.attributes.color.itemSize===4,mt=!!ee.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),Ge=!!ee.morphAttributes.position,Dt=!!ee.morphAttributes.normal,en=!!ee.morphAttributes.color,Vt=Ii;$.toneMapped&&(pe===null||pe.isXRRenderTarget===!0)&&(Vt=k.toneMapping);let Ft=ee.morphAttributes.position||ee.morphAttributes.normal||ee.morphAttributes.color,pn=Ft!==void 0?Ft.length:0,De=A.get($),yn=R.state.lights;if(St===!0&&(Ct===!0||M!==ue)){let Gt=M===ue&&$.id===ne;Pe.setState($,M,Gt)}let Pt=!1;$.version===De.__version?(De.needsLights&&De.lightsStateVersion!==yn.state.version||De.outputColorSpace!==Ae||K.isBatchedMesh&&De.batching===!1||!K.isBatchedMesh&&De.batching===!0||K.isBatchedMesh&&De.batchingColor===!0&&K._colorsTexture===null||K.isBatchedMesh&&De.batchingColor===!1&&K._colorsTexture!==null||K.isInstancedMesh&&De.instancing===!1||!K.isInstancedMesh&&De.instancing===!0||K.isSkinnedMesh&&De.skinning===!1||!K.isSkinnedMesh&&De.skinning===!0||K.isInstancedMesh&&De.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&De.instancingColor===!1&&K.instanceColor!==null||K.isInstancedMesh&&De.instancingMorph===!0&&K.morphTexture===null||K.isInstancedMesh&&De.instancingMorph===!1&&K.morphTexture!==null||De.envMap!==Xe||$.fog===!0&&De.fog!==Re||De.numClippingPlanes!==void 0&&(De.numClippingPlanes!==Pe.numPlanes||De.numIntersection!==Pe.numIntersection)||De.vertexAlphas!==pt||De.vertexTangents!==mt||De.morphTargets!==Ge||De.morphNormals!==Dt||De.morphColors!==en||De.toneMapping!==Vt||De.morphTargetsCount!==pn||!!De.lightProbeGrid!=R.state.lightProbeGridArray.length>0)&&(Pt=!0):(Pt=!0,De.__version=$.version);let On=De.currentProgram;Pt===!0&&(On=Hs($,z,K),q&&$.isNodeMaterial&&q.onUpdateProgram($,On,De));let oi=!1,Li=!1,Mr=!1,Ut=On.getUniforms(),$t=De.uniforms;if(d.useProgram(On.program)&&(oi=!0,Li=!0,Mr=!0),$.id!==ne&&(ne=$.id,Li=!0),De.needsLights){let Gt=_i(R.state.lightProbeGridArray,K);De.lightProbeGrid!==Gt&&(De.lightProbeGrid=Gt,Li=!0)}if(oi||ue!==M){d.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),Ut.setValue(B,"projectionMatrix",M.projectionMatrix),Ut.setValue(B,"viewMatrix",M.matrixWorldInverse);let xi=Ut.map.cameraPosition;xi!==void 0&&xi.setValue(B,_e.setFromMatrixPosition(M.matrixWorld)),p.logarithmicDepthBuffer&&Ut.setValue(B,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&Ut.setValue(B,"isOrthographic",M.isOrthographicCamera===!0),ue!==M&&(ue=M,Li=!0,Mr=!0)}if(De.needsLights&&(yn.state.sunShadowMap.length>0&&Ut.setValue(B,"sunShadowMap",yn.state.sunShadowMap,P),yn.state.directionalShadowMap.length>0&&Ut.setValue(B,"directionalShadowMap",yn.state.directionalShadowMap,P),yn.state.spotShadowMap.length>0&&Ut.setValue(B,"spotShadowMap",yn.state.spotShadowMap,P),yn.state.pointShadowMap.length>0&&Ut.setValue(B,"pointShadowMap",yn.state.pointShadowMap,P)),K.isSkinnedMesh){Ut.setOptional(B,K,"bindMatrix"),Ut.setOptional(B,K,"bindMatrixInverse");let Gt=K.skeleton;Gt&&(Gt.boneTexture===null&&Gt.computeBoneTexture(),Ut.setValue(B,"boneTexture",Gt.boneTexture,P))}K.isBatchedMesh&&(Ut.setOptional(B,K,"batchingTexture"),Ut.setValue(B,"batchingTexture",K._matricesTexture,P),Ut.setOptional(B,K,"batchingIdTexture"),Ut.setValue(B,"batchingIdTexture",K._indirectTexture,P),Ut.setOptional(B,K,"batchingColorTexture"),K._colorsTexture!==null&&Ut.setValue(B,"batchingColorTexture",K._colorsTexture,P));let Di=ee.morphAttributes;if((Di.position!==void 0||Di.normal!==void 0||Di.color!==void 0)&&H.update(K,ee,On),(Li||De.receiveShadow!==K.receiveShadow)&&(De.receiveShadow=K.receiveShadow,Ut.setValue(B,"receiveShadow",K.receiveShadow)),($.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial)&&$.envMap===null&&z.environment!==null&&($t.envMapIntensity.value=z.environmentIntensity),$t.dfgLUT!==void 0&&($t.dfgLUT.value=RT()),Li){if(Ut.setValue(B,"toneMappingExposure",k.toneMappingExposure),De.needsLights&&ih($t,Mr),Re&&$.fog===!0&&ge.refreshFogUniforms($t,Re),ge.refreshMaterialUniforms($t,$,te,ie,R.state.transmissionRenderTarget[M.id]),De.needsLights&&De.lightProbeGrid){let Gt=De.lightProbeGrid;$t.probesSH.value=Gt.texture,$t.probesMin.value.copy(Gt.boundingBox.min),$t.probesMax.value.copy(Gt.boundingBox.max),$t.probesResolution.value.copy(Gt.resolution)}Za.upload(B,bl(De),$t,P)}if($.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(Za.upload(B,bl(De),$t,P),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&Ut.setValue(B,"center",K.center),Ut.setValue(B,"modelViewMatrix",K.modelViewMatrix),Ut.setValue(B,"normalMatrix",K.normalMatrix),Ut.setValue(B,"modelMatrix",K.matrixWorld),$.uniformsGroups!==void 0){let Gt=$.uniformsGroups;for(let xi=0,Er=Gt.length;xi<Er;xi++){let Qa=Gt[xi];fe.update(Qa,On),fe.bind(Qa,On)}}return On}function ih(M,z){M.ambientLightColor.needsUpdate=z,M.lightProbe.needsUpdate=z,M.sunLights.needsUpdate=z,M.sunLightShadows.needsUpdate=z,M.directionalLights.needsUpdate=z,M.directionalLightShadows.needsUpdate=z,M.pointLights.needsUpdate=z,M.pointLightShadows.needsUpdate=z,M.spotLights.needsUpdate=z,M.spotLightShadows.needsUpdate=z,M.rectAreaLights.needsUpdate=z,M.hemisphereLights.needsUpdate=z}function rh(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return oe},this.getActiveMipmapLevel=function(){return re},this.getRenderTarget=function(){return pe},this.setRenderTargetTextures=function(M,z,ee){let $=A.get(M);$.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,$.__autoAllocateDepthBuffer===!1&&($.__useRenderToTexture=!1),A.get(M.texture).__webglTexture=z,A.get(M.depthTexture).__webglTexture=$.__autoAllocateDepthBuffer?void 0:ee,$.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,z){let ee=A.get(M);ee.__webglFramebuffer=z,ee.__useDefaultFramebuffer=z===void 0},this.setRenderTarget=function(M,z=0,ee=0){pe=M,oe=z,re=ee;let $=null,K=!1,Re=!1;if(M){let Ae=A.get(M);if(Ae.__useDefaultFramebuffer!==void 0){d.bindFramebuffer(B.FRAMEBUFFER,Ae.__webglFramebuffer),de.copy(M.viewport),He.copy(M.scissor),Ce=M.scissorTest,d.viewport(de),d.scissor(He),d.setScissorTest(Ce),ne=-1;return}else if(Ae.__webglFramebuffer===void 0)P.setupRenderTarget(M);else if(Ae.__hasExternalTextures)P.rebindTextures(M,A.get(M.texture).__webglTexture,A.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){let pt=M.depthTexture;if(Ae.__boundDepthTexture!==pt){if(pt!==null&&A.has(pt)&&(M.width!==pt.image.width||M.height!==pt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");P.setupDepthRenderbuffer(M)}}let Ve=M.texture;(Ve.isData3DTexture||Ve.isDataArrayTexture||Ve.isCompressedArrayTexture)&&(Re=!0);let Xe=A.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Xe[z])?$=Xe[z][ee]:$=Xe[z],K=!0):M.samples>0&&P.useMultisampledRTT(M)===!1?$=A.get(M).__webglMultisampledFramebuffer:Array.isArray(Xe)?$=Xe[ee]:$=Xe,de.copy(M.viewport),He.copy(M.scissor),Ce=M.scissorTest}else de.copy(Ee).multiplyScalar(te).floor(),He.copy(lt).multiplyScalar(te).floor(),Ce=It;if(ee!==0&&($=Q),d.bindFramebuffer(B.FRAMEBUFFER,$)&&d.drawBuffers(M,$),d.viewport(de),d.scissor(He),d.setScissorTest(Ce),K){let Ae=A.get(M.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+z,Ae.__webglTexture,ee)}else if(Re){let Ae=z;for(let Ve=0;Ve<M.textures.length;Ve++){let Xe=A.get(M.textures[Ve]);B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0+Ve,Xe.__webglTexture,ee,Ae)}}else if(M!==null&&ee!==0){let Ae=A.get(M.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Ae.__webglTexture,ee)}ne=-1};function El(M){let z=A.get(M);return(z.__readFormat!==M.format||z.__readType!==M.type)&&(z.__readFormat=M.format,z.__readType=M.type,z.__formatReadable=p.textureFormatReadable(M.format),z.__typeReadable=p.textureTypeReadable(M.type)),z}this.readRenderTargetPixels=function(M,z,ee,$,K,Re,Fe,Ae=0){if(!(M&&M.isWebGLRenderTarget)){rt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ve=A.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Fe!==void 0&&(Ve=Ve[Fe]),Ve){d.bindFramebuffer(B.FRAMEBUFFER,Ve);try{let Xe=M.textures[Ae],pt=Xe.format,mt=Xe.type;M.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+Ae);let Ge=El(Xe);if(Ge.__formatReadable===!1){rt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ge.__typeReadable===!1){rt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=M.width-$&&ee>=0&&ee<=M.height-K&&B.readPixels(z,ee,$,K,Me.convert(pt),Me.convert(mt),Re)}finally{let Xe=pe!==null?A.get(pe).__webglFramebuffer:null;d.bindFramebuffer(B.FRAMEBUFFER,Xe)}}},this.readRenderTargetPixelsAsync=async function(M,z,ee,$,K,Re,Fe,Ae=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ve=A.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Fe!==void 0&&(Ve=Ve[Fe]),Ve)if(z>=0&&z<=M.width-$&&ee>=0&&ee<=M.height-K){d.bindFramebuffer(B.FRAMEBUFFER,Ve);let Xe=M.textures[Ae],pt=Xe.format,mt=Xe.type;M.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+Ae);let Ge=El(Xe);if(Ge.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ge.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Dt=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,Dt),B.bufferData(B.PIXEL_PACK_BUFFER,Re.byteLength,B.STREAM_READ),B.readPixels(z,ee,$,K,Me.convert(pt),Me.convert(mt),0),B.bindBuffer(B.PIXEL_PACK_BUFFER,null);let en=pe!==null?A.get(pe).__webglFramebuffer:null;d.bindFramebuffer(B.FRAMEBUFFER,en);let Vt=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await w_(B,Vt,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,Dt),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,Re),B.bindBuffer(B.PIXEL_PACK_BUFFER,null),B.deleteBuffer(Dt),B.deleteSync(Vt),Re}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,z=null,ee=0){let $=Math.pow(2,-ee),K=Math.floor(M.image.width*$),Re=Math.floor(M.image.height*$),Fe=z!==null?z.x:0,Ae=z!==null?z.y:0;P.setTexture2D(M,0),B.copyTexSubImage2D(B.TEXTURE_2D,ee,0,0,Fe,Ae,K,Re),d.unbindTexture()},this.copyTextureToTexture=function(M,z,ee=null,$=null,K=0,Re=0){let Fe,Ae,Ve,Xe,pt,mt,Ge,Dt,en,Vt=M.isCompressedTexture?M.mipmaps[Re]:M.image;if(ee!==null)Fe=ee.max.x-ee.min.x,Ae=ee.max.y-ee.min.y,Ve=ee.isBox3?ee.max.z-ee.min.z:1,Xe=ee.min.x,pt=ee.min.y,mt=ee.isBox3?ee.min.z:0;else{let $t=Math.pow(2,-K);Fe=Math.floor(Vt.width*$t),Ae=Math.floor(Vt.height*$t),M.isDataArrayTexture?Ve=Vt.depth:M.isData3DTexture?Ve=Math.floor(Vt.depth*$t):Ve=1,Xe=0,pt=0,mt=0}$!==null?(Ge=$.x,Dt=$.y,en=$.z):(Ge=0,Dt=0,en=0);let Ft=Me.convert(z.format),pn=Me.convert(z.type),De;z.isData3DTexture?(P.setTexture3D(z,0),De=B.TEXTURE_3D):z.isDataArrayTexture||z.isCompressedArrayTexture?(P.setTexture2DArray(z,0),De=B.TEXTURE_2D_ARRAY):(P.setTexture2D(z,0),De=B.TEXTURE_2D),d.activeTexture(B.TEXTURE0),d.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,z.flipY),d.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),d.pixelStorei(B.UNPACK_ALIGNMENT,z.unpackAlignment);let yn=d.getParameter(B.UNPACK_ROW_LENGTH),Pt=d.getParameter(B.UNPACK_IMAGE_HEIGHT),On=d.getParameter(B.UNPACK_SKIP_PIXELS),oi=d.getParameter(B.UNPACK_SKIP_ROWS),Li=d.getParameter(B.UNPACK_SKIP_IMAGES);d.pixelStorei(B.UNPACK_ROW_LENGTH,Vt.width),d.pixelStorei(B.UNPACK_IMAGE_HEIGHT,Vt.height),d.pixelStorei(B.UNPACK_SKIP_PIXELS,Xe),d.pixelStorei(B.UNPACK_SKIP_ROWS,pt),d.pixelStorei(B.UNPACK_SKIP_IMAGES,mt);let Mr=M.isDataArrayTexture||M.isData3DTexture,Ut=z.isDataArrayTexture||z.isData3DTexture;if(M.isDepthTexture){let $t=A.get(M),Di=A.get(z),Gt=A.get($t.__renderTarget),xi=A.get(Di.__renderTarget);d.bindFramebuffer(B.READ_FRAMEBUFFER,Gt.__webglFramebuffer),d.bindFramebuffer(B.DRAW_FRAMEBUFFER,xi.__webglFramebuffer);for(let Er=0;Er<Ve;Er++)Mr&&(B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,A.get(M).__webglTexture,K,mt+Er),B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,A.get(z).__webglTexture,Re,en+Er)),B.blitFramebuffer(Xe,pt,Fe,Ae,Ge,Dt,Fe,Ae,B.DEPTH_BUFFER_BIT,B.NEAREST);d.bindFramebuffer(B.READ_FRAMEBUFFER,null),d.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else if(K!==0||M.isRenderTargetTexture||A.has(M)){let $t=A.get(M),Di=A.get(z);d.bindFramebuffer(B.READ_FRAMEBUFFER,G),d.bindFramebuffer(B.DRAW_FRAMEBUFFER,J);for(let Gt=0;Gt<Ve;Gt++)Mr?B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,$t.__webglTexture,K,mt+Gt):B.framebufferTexture2D(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,$t.__webglTexture,K),Ut?B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Di.__webglTexture,Re,en+Gt):B.framebufferTexture2D(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Di.__webglTexture,Re),K!==0?B.blitFramebuffer(Xe,pt,Fe,Ae,Ge,Dt,Fe,Ae,B.COLOR_BUFFER_BIT,B.NEAREST):Ut?B.copyTexSubImage3D(De,Re,Ge,Dt,en+Gt,Xe,pt,Fe,Ae):B.copyTexSubImage2D(De,Re,Ge,Dt,Xe,pt,Fe,Ae);d.bindFramebuffer(B.READ_FRAMEBUFFER,null),d.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else Ut?M.isDataTexture||M.isData3DTexture?B.texSubImage3D(De,Re,Ge,Dt,en,Fe,Ae,Ve,Ft,pn,Vt.data):z.isCompressedArrayTexture?B.compressedTexSubImage3D(De,Re,Ge,Dt,en,Fe,Ae,Ve,Ft,Vt.data):B.texSubImage3D(De,Re,Ge,Dt,en,Fe,Ae,Ve,Ft,pn,Vt):M.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,Re,Ge,Dt,Fe,Ae,Ft,pn,Vt.data):M.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,Re,Ge,Dt,Vt.width,Vt.height,Ft,Vt.data):B.texSubImage2D(B.TEXTURE_2D,Re,Ge,Dt,Fe,Ae,Ft,pn,Vt);d.pixelStorei(B.UNPACK_ROW_LENGTH,yn),d.pixelStorei(B.UNPACK_IMAGE_HEIGHT,Pt),d.pixelStorei(B.UNPACK_SKIP_PIXELS,On),d.pixelStorei(B.UNPACK_SKIP_ROWS,oi),d.pixelStorei(B.UNPACK_SKIP_IMAGES,Li),Re===0&&z.generateMipmaps&&B.generateMipmap(De),d.unbindTexture()},this.initRenderTarget=function(M){A.get(M).__webglFramebuffer===void 0&&P.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?P.setTextureCube(M,0):M.isData3DTexture?P.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?P.setTexture2DArray(M,0):P.setTexture2D(M,0),d.unbindTexture()},this.resetState=function(){oe=0,re=0,pe=null,d.reset(),we.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ai}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Et._getDrawingBufferColorSpace(e),t.unpackColorSpace=Et._getUnpackColorSpace()}};function Af(n,e){if(e===nf)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),n;if(e===Wa||e===ll){let t=n.getIndex();if(t===null){let s=[],a=n.getAttribute("position");if(a!==void 0){for(let o=0;o<a.count;o++)s.push(o);n.setIndex(s),t=n.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),n}let i=t.count-2,r=[];if(e===Wa)for(let s=1;s<=i;s++)r.push(t.getX(0)),r.push(t.getX(s)),r.push(t.getX(s+1));else for(let s=0;s<i;s++)s%2===0?(r.push(t.getX(s)),r.push(t.getX(s+1)),r.push(t.getX(s+2))):(r.push(t.getX(s+2)),r.push(t.getX(s+1)),r.push(t.getX(s)));return r.length/3!==i&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."),n.setIndex(r),n.clearGroups(),n}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),n}function l0(n){let e=new Map,t=new Map,i=n.clone();return c0(n,i,function(r,s){e.set(s,r),t.set(r,s)}),i.traverse(function(r){if(!r.isSkinnedMesh)return;let s=r,a=e.get(r),o=a.skeleton.bones;s.skeleton=a.skeleton.clone(),s.bindMatrix.copy(a.bindMatrix),s.skeleton.bones=o.map(function(c){return t.get(c)}),s.bind(s.skeleton,s.bindMatrix)}),i}function c0(n,e,t){t(n,e);for(let i=0;i<n.children.length;i++)c0(n.children[i],e.children[i],t)}var $u=class extends Xi{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Lf(t)}),this.register(function(t){return new Df(t)}),this.register(function(t){return new Hf(t)}),this.register(function(t){return new Wf(t)}),this.register(function(t){return new Xf(t)}),this.register(function(t){return new Of(t)}),this.register(function(t){return new Ff(t)}),this.register(function(t){return new Bf(t)}),this.register(function(t){return new kf(t)}),this.register(function(t){return new Nf(t)}),this.register(function(t){return new zf(t)}),this.register(function(t){return new Uf(t)}),this.register(function(t){return new Gf(t)}),this.register(function(t){return new Vf(t)}),this.register(function(t){return new Cf(t)}),this.register(function(t){return new Ju(t,At.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new Ju(t,At.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new qf(t)})}load(e,t,i,r){let s=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let l=Sr.extractUrlBase(e);a=Sr.resolveURL(l,this.path)}else a=Sr.extractUrlBase(e);this.manager.itemStart(e);let o=function(l){r?r(l):console.error(l),s.manager.itemError(e),s.manager.itemEnd(e)},c=new Oa(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{s.parse(l,a,function(u){t(u),s.manager.itemEnd(e)},o)}catch(u){o(u)}},i,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,i,r){let s,a={},o={},c=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===p0){try{a[At.KHR_BINARY_GLTF]=new Yf(e)}catch(h){r&&r(h);return}s=JSON.parse(a[At.KHR_BINARY_GLTF].content)}else s=JSON.parse(c.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){r&&r(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new ep(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){let h=this.pluginCallbacks[u](l);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[h.name]=h,a[h.name]=!0}if(s.extensionsUsed)for(let u=0;u<s.extensionsUsed.length;++u){let h=s.extensionsUsed[u],f=s.extensionsRequired||[];switch(h){case At.KHR_MATERIALS_UNLIT:a[h]=new Pf;break;case At.KHR_DRACO_MESH_COMPRESSION:a[h]=new Zf(s,this.dracoLoader);break;case At.KHR_TEXTURE_TRANSFORM:a[h]=new Kf;break;case At.KHR_MESH_QUANTIZATION:a[h]=new jf;break;default:f.indexOf(h)>=0&&o[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(i,r)}parseAsync(e,t){let i=this;return new Promise(function(r,s){i.parse(e,t,r,s)})}};function IT(){let n={};return{get:function(e){return n[e]},add:function(e,t){n[e]=t},remove:function(e){delete n[e]},removeAll:function(){n={}}}}function an(n,e,t){let i=n.json.materials[e];return i.extensions&&i.extensions[t]?i.extensions[t]:null}var At={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Cf=class{constructor(e){this.parser=e,this.name=At.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let i=0,r=t.length;i<r;i++){let s=t[i];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){let t=this.parser,i="light:"+e,r=t.cache.get(i);if(r)return r;let s=t.json,c=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e],l,u=new st(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],Ln);let h=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new $o(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new jo(u),l.distance=h;break;case"spot":l=new Ko(u),l.distance=h,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),$i(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),r=Promise.resolve(l),t.cache.add(i,r),r}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,i=this.parser,s=i.json.nodes[e],o=(s.extensions&&s.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return i._getNodeRef(t.cache,o,c)})}},Pf=class{constructor(){this.name=At.KHR_MATERIALS_UNLIT}getMaterialType(){return Hn}extendParams(e,t,i){let r=[];e.color=new st(1,1,1),e.opacity=1;let s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){let a=s.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],Ln),e.opacity=a[3]}s.baseColorTexture!==void 0&&r.push(i.assignTexture(e,"map",s.baseColorTexture,nn))}return Promise.all(r)}},Nf=class{constructor(e){this.parser=e,this.name=At.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let i=an(this.parser,e,this.name);return i===null||i.emissiveStrength!==void 0&&(t.emissiveIntensity=i.emissiveStrength),Promise.resolve()}},Lf=class{constructor(e){this.parser=e,this.name=At.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return an(this.parser,e,this.name)!==null?Wn:null}extendMaterialParams(e,t){let i=an(this.parser,e,this.name);if(i===null)return Promise.resolve();let r=[];if(i.clearcoatFactor!==void 0&&(t.clearcoat=i.clearcoatFactor),i.clearcoatTexture!==void 0&&r.push(this.parser.assignTexture(t,"clearcoatMap",i.clearcoatTexture)),i.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=i.clearcoatRoughnessFactor),i.clearcoatRoughnessTexture!==void 0&&r.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",i.clearcoatRoughnessTexture)),i.clearcoatNormalTexture!==void 0&&(r.push(this.parser.assignTexture(t,"clearcoatNormalMap",i.clearcoatNormalTexture)),i.clearcoatNormalTexture.scale!==void 0)){let s=i.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new xt(s,s)}return Promise.all(r)}},Df=class{constructor(e){this.parser=e,this.name=At.KHR_MATERIALS_DISPERSION}getMaterialType(e){return an(this.parser,e,this.name)!==null?Wn:null}extendMaterialParams(e,t){let i=an(this.parser,e,this.name);return i===null||(t.dispersion=i.dispersion!==void 0?i.dispersion:0),Promise.resolve()}},Uf=class{constructor(e){this.parser=e,this.name=At.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return an(this.parser,e,this.name)!==null?Wn:null}extendMaterialParams(e,t){let i=an(this.parser,e,this.name);if(i===null)return Promise.resolve();let r=[];return i.iridescenceFactor!==void 0&&(t.iridescence=i.iridescenceFactor),i.iridescenceTexture!==void 0&&r.push(this.parser.assignTexture(t,"iridescenceMap",i.iridescenceTexture)),i.iridescenceIor!==void 0&&(t.iridescenceIOR=i.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),i.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=i.iridescenceThicknessMinimum),i.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=i.iridescenceThicknessMaximum),i.iridescenceThicknessTexture!==void 0&&r.push(this.parser.assignTexture(t,"iridescenceThicknessMap",i.iridescenceThicknessTexture)),Promise.all(r)}},Of=class{constructor(e){this.parser=e,this.name=At.KHR_MATERIALS_SHEEN}getMaterialType(e){return an(this.parser,e,this.name)!==null?Wn:null}extendMaterialParams(e,t){let i=an(this.parser,e,this.name);if(i===null)return Promise.resolve();let r=[];if(t.sheenColor=new st(0,0,0),t.sheenRoughness=0,t.sheen=1,i.sheenColorFactor!==void 0){let s=i.sheenColorFactor;t.sheenColor.setRGB(s[0],s[1],s[2],Ln)}return i.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=i.sheenRoughnessFactor),i.sheenColorTexture!==void 0&&r.push(this.parser.assignTexture(t,"sheenColorMap",i.sheenColorTexture,nn)),i.sheenRoughnessTexture!==void 0&&r.push(this.parser.assignTexture(t,"sheenRoughnessMap",i.sheenRoughnessTexture)),Promise.all(r)}},Ff=class{constructor(e){this.parser=e,this.name=At.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return an(this.parser,e,this.name)!==null?Wn:null}extendMaterialParams(e,t){let i=an(this.parser,e,this.name);if(i===null)return Promise.resolve();let r=[];return i.transmissionFactor!==void 0&&(t.transmission=i.transmissionFactor),i.transmissionTexture!==void 0&&r.push(this.parser.assignTexture(t,"transmissionMap",i.transmissionTexture)),Promise.all(r)}},Bf=class{constructor(e){this.parser=e,this.name=At.KHR_MATERIALS_VOLUME}getMaterialType(e){return an(this.parser,e,this.name)!==null?Wn:null}extendMaterialParams(e,t){let i=an(this.parser,e,this.name);if(i===null)return Promise.resolve();let r=[];t.thickness=i.thicknessFactor!==void 0?i.thicknessFactor:0,i.thicknessTexture!==void 0&&r.push(this.parser.assignTexture(t,"thicknessMap",i.thicknessTexture)),t.attenuationDistance=i.attenuationDistance||1/0;let s=i.attenuationColor||[1,1,1];return t.attenuationColor=new st().setRGB(s[0],s[1],s[2],Ln),Promise.all(r)}},kf=class{constructor(e){this.parser=e,this.name=At.KHR_MATERIALS_IOR}getMaterialType(e){return an(this.parser,e,this.name)!==null?Wn:null}extendMaterialParams(e,t){let i=an(this.parser,e,this.name);return i===null||(t.ior=i.ior!==void 0?i.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}},zf=class{constructor(e){this.parser=e,this.name=At.KHR_MATERIALS_SPECULAR}getMaterialType(e){return an(this.parser,e,this.name)!==null?Wn:null}extendMaterialParams(e,t){let i=an(this.parser,e,this.name);if(i===null)return Promise.resolve();let r=[];t.specularIntensity=i.specularFactor!==void 0?i.specularFactor:1,i.specularTexture!==void 0&&r.push(this.parser.assignTexture(t,"specularIntensityMap",i.specularTexture));let s=i.specularColorFactor||[1,1,1];return t.specularColor=new st().setRGB(s[0],s[1],s[2],Ln),i.specularColorTexture!==void 0&&r.push(this.parser.assignTexture(t,"specularColorMap",i.specularColorTexture,nn)),Promise.all(r)}},Vf=class{constructor(e){this.parser=e,this.name=At.EXT_MATERIALS_BUMP}getMaterialType(e){return an(this.parser,e,this.name)!==null?Wn:null}extendMaterialParams(e,t){let i=an(this.parser,e,this.name);if(i===null)return Promise.resolve();let r=[];return t.bumpScale=i.bumpFactor!==void 0?i.bumpFactor:1,i.bumpTexture!==void 0&&r.push(this.parser.assignTexture(t,"bumpMap",i.bumpTexture)),Promise.all(r)}},Gf=class{constructor(e){this.parser=e,this.name=At.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return an(this.parser,e,this.name)!==null?Wn:null}extendMaterialParams(e,t){let i=an(this.parser,e,this.name);if(i===null)return Promise.resolve();let r=[];return i.anisotropyStrength!==void 0&&(t.anisotropy=i.anisotropyStrength),i.anisotropyRotation!==void 0&&(t.anisotropyRotation=i.anisotropyRotation),i.anisotropyTexture!==void 0&&r.push(this.parser.assignTexture(t,"anisotropyMap",i.anisotropyTexture)),Promise.all(r)}},Hf=class{constructor(e){this.parser=e,this.name=At.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,i=t.json,r=i.textures[e];if(!r.extensions||!r.extensions[this.name])return null;let s=r.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(i.extensionsRequired&&i.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,a)}},Wf=class{constructor(e){this.parser=e,this.name=At.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,i=this.parser,r=i.json,s=r.textures[e];if(!s.extensions||!s.extensions[t])return null;let a=s.extensions[t],o=r.images[a.source],c=i.textureLoader;if(o.uri){let l=i.options.manager.getHandler(o.uri);l!==null&&(c=l)}return i.loadTextureImage(e,a.source,c)}},Xf=class{constructor(e){this.parser=e,this.name=At.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,i=this.parser,r=i.json,s=r.textures[e];if(!s.extensions||!s.extensions[t])return null;let a=s.extensions[t],o=r.images[a.source],c=i.textureLoader;if(o.uri){let l=i.options.manager.getHandler(o.uri);l!==null&&(c=l)}return i.loadTextureImage(e,a.source,c)}},Ju=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,i=t.bufferViews[e];if(i.extensions&&i.extensions[this.name]){let r=i.extensions[this.name],s=this.parser.getDependency("buffer",r.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(o){let c=r.byteOffset||0,l=r.byteLength||0,u=r.count,h=r.byteStride,f=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(u,h,f,r.mode,r.filter).then(function(m){return m.buffer}):a.ready.then(function(){let m=new ArrayBuffer(u*h);return a.decodeGltfBuffer(new Uint8Array(m),u,h,f,r.mode,r.filter),m})})}else return null}},qf=class{constructor(e){this.name=At.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,i=t.nodes[e];if(!i.extensions||!i.extensions[this.name]||i.mesh===void 0)return null;let r=t.meshes[i.mesh];for(let l of r.primitives)if(l.mode!==mi.TRIANGLES&&l.mode!==mi.TRIANGLE_STRIP&&l.mode!==mi.TRIANGLE_FAN&&l.mode!==void 0)return null;let a=i.extensions[this.name].attributes,o=[],c={};for(let l in a)o.push(this.parser.getDependency("accessor",a[l]).then(u=>(c[l]=u,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{let u=l.pop(),h=u.isGroup?u.children:[u],f=l[0].count,m=[];for(let x of h){let v=new ft,g=new Z,_=new ei,T=new Z(1,1,1),I=new ko(x.geometry,x.material,f);for(let w=0;w<f;w++)c.TRANSLATION&&g.fromBufferAttribute(c.TRANSLATION,w),c.ROTATION&&_.fromBufferAttribute(c.ROTATION,w),c.SCALE&&T.fromBufferAttribute(c.SCALE,w),I.setMatrixAt(w,v.compose(g,_,T));let E=null;for(let w in c)if(w==="_COLOR_0"){let R=c[w];I.instanceColor=new gr(R.array,R.itemSize,R.normalized)}else if(w!=="TRANSLATION"&&w!=="ROTATION"&&w!=="SCALE"){if(E===null){let C=I.geometry;E=new Mn,E.name=C.name;for(let y in C.attributes)E.setAttribute(y,C.attributes[y]);for(let y in C.morphAttributes)E.morphAttributes[y]=C.morphAttributes[y];C.index!==null&&E.setIndex(C.index),E.morphTargetsRelative=C.morphTargetsRelative;for(let y of C.groups)E.addGroup(y.start,y.count,y.materialIndex);C.boundingBox!==null&&(E.boundingBox=C.boundingBox.clone()),C.boundingSphere!==null&&(E.boundingSphere=C.boundingSphere.clone()),E.drawRange.start=C.drawRange.start,E.drawRange.count=C.drawRange.count,E.userData=Object.assign({},C.userData),I.geometry=E}let R=c[w];E.setAttribute(w,new gr(R.array,R.itemSize,R.normalized))}Qt.prototype.copy.call(I,x),this.parser.assignFinalMaterial(I),m.push(I)}return u.isGroup?(u.clear(),u.add(...m),u):m[0]}))}},p0="glTF",dl=12,u0={JSON:1313821514,BIN:5130562},Yf=class{constructor(e){this.name=At.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,dl),i=new TextDecoder;if(this.header={magic:i.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==p0)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let r=this.header.length-dl,s=new DataView(e,dl),a=0;for(;a<r;){let o=s.getUint32(a,!0);a+=4;let c=s.getUint32(a,!0);if(a+=4,c===u0.JSON){let l=new Uint8Array(e,dl+a,o);this.content=i.decode(l)}else if(c===u0.BIN){let l=dl+a;this.body=e.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},Zf=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=At.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let i=this.json,r=this.dracoLoader,s=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},c={},l={};for(let u in a){let h=Jf[u]||u.toLowerCase();o[h]=a[u]}for(let u in e.attributes){let h=Jf[u]||u.toLowerCase();if(a[u]!==void 0){let f=i.accessors[e.attributes[u]],m=ja[f.componentType];l[h]=m.name,c[h]=f.normalized===!0}}return t.getDependency("bufferView",s).then(function(u){return new Promise(function(h,f){r.decodeDracoFile(u,function(m){for(let x in m.attributes){let v=m.attributes[x],g=c[x];g!==void 0&&(v.normalized=g)}h(m)},o,l,Ln,f)})})}},Kf=class{constructor(){this.name=At.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){if((t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0)return e;if(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),t.rotation!==void 0){let i=Math.cos(e.rotation),r=Math.sin(e.rotation);e.matrix.set(e.repeat.x*i,e.repeat.y*r,e.offset.x,-e.repeat.x*r,e.repeat.y*i,e.offset.y,0,0,1),e.matrixAutoUpdate=!1}return e.needsUpdate=!0,e}},jf=class{constructor(){this.name=At.KHR_MESH_QUANTIZATION}},Qu=class extends Wi{constructor(e,t,i,r){super(e,t,i,r)}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,r=this.valueSize,s=e*r*3+r;for(let a=0;a!==r;a++)t[a]=i[s+a];return t}interpolate_(e,t,i,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,u=r-t,h=(i-t)/u,f=h*h,m=f*h,x=e*l,v=x-l,g=-2*m+3*f,_=m-f,T=1-g,I=_-f+h;for(let E=0;E!==o;E++){let w=a[v+E+o],R=a[v+E+c]*u,C=a[x+E+o],y=a[x+E]*u;s[E]=T*w+I*R+g*C+_*y}return s}},CT=new ei,$f=class extends Qu{interpolate_(e,t,i,r){let s=super.interpolate_(e,t,i,r);return CT.fromArray(s).normalize().toArray(s),s}},mi={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},ja={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},h0={9728:Kt,9729:Jt,9984:iu,9985:Va,9986:Ds,9987:Ci},d0={33071:pi,33648:Sa,10497:Gr},wf={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Jf={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Kr={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},PT={CUBICSPLINE:void 0,LINEAR:As,STEP:Ts},Rf={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function NT(n){return n.DefaultMaterial===void 0&&(n.DefaultMaterial=new Cs({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Yi})),n.DefaultMaterial}function Fs(n,e,t){for(let i in t.extensions)n[i]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[i]=t.extensions[i])}function $i(n,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(n.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function LT(n,e,t){let i=!1,r=!1,s=!1;for(let l=0,u=e.length;l<u;l++){let h=e[l];if(h.POSITION!==void 0&&(i=!0),h.NORMAL!==void 0&&(r=!0),h.COLOR_0!==void 0&&(s=!0),i&&r&&s)break}if(!i&&!r&&!s)return Promise.resolve(n);let a=[],o=[],c=[];for(let l=0,u=e.length;l<u;l++){let h=e[l];if(i){let f=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):n.attributes.position;a.push(f)}if(r){let f=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):n.attributes.normal;o.push(f)}if(s){let f=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):n.attributes.color;c.push(f)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){let u=l[0],h=l[1],f=l[2];return i&&(n.morphAttributes.position=u),r&&(n.morphAttributes.normal=h),s&&(n.morphAttributes.color=f),n.morphTargetsRelative=!0,n})}function DT(n,e){if(n.updateMorphTargets(),e.weights!==void 0)for(let t=0,i=e.weights.length;t<i;t++)n.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(n.morphTargetInfluences.length===t.length){n.morphTargetDictionary={};for(let i=0,r=t.length;i<r;i++)n.morphTargetDictionary[t[i]]=i}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function UT(n){let e,t=n.extensions&&n.extensions[At.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+If(t.attributes):e=n.indices+":"+If(n.attributes)+":"+n.mode,n.targets!==void 0)for(let i=0,r=n.targets.length;i<r;i++)e+=":"+If(n.targets[i]);return e}function If(n){let e="",t=Object.keys(n).sort();for(let i=0,r=t.length;i<r;i++)e+=t[i]+":"+n[t[i]]+";";return e}function Qf(n){switch(n){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function OT(n){return n.search(/\.jpe?g($|\?)/i)>0||n.search(/^data\:image\/jpeg/)===0?"image/jpeg":n.search(/\.webp($|\?)/i)>0||n.search(/^data\:image\/webp/)===0?"image/webp":n.search(/\.ktx2($|\?)/i)>0||n.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var FT=new ft,ep=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new IT,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let i=!1,r=-1,s=!1,a=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){let o=navigator.userAgent;i=/^((?!chrome|android).)*safari/i.test(o)===!0;let c=o.match(/Version\/(\d+)/);r=i&&c?parseInt(c[1],10):-1,s=o.indexOf("Firefox")>-1,a=s?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||i&&r<17||s&&a<98?this.textureLoader=new Ps(this.options.manager):this.textureLoader=new Jo(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Oa(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let i=this,r=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([i.getDependencies("scene"),i.getDependencies("animation"),i.getDependencies("camera")])}).then(function(a){let o={scene:a[0][r.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:r.asset,parser:i,userData:{}};return Fs(s,o,r),$i(o,r),Promise.all(i._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(let c of o.scenes)c.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],i=this.json.meshes||[];for(let r=0,s=t.length;r<s;r++){let a=t[r].joints;for(let o=0,c=a.length;o<c;o++)e[a[o]].isBone=!0}for(let r=0,s=e.length;r<s;r++){let a=e[r];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(i[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,i){if(e.refs[t]<=1)return i;let r=i.clone(),s=(a,o)=>{let c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(let[l,u]of a.children.entries())s(u,o.children[l])};return s(i,r),r.name+="_instance_"+e.uses[t]++,r}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let i=0;i<t.length;i++){let r=e(t[i]);if(r)return r}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let i=[];for(let r=0;r<t.length;r++){let s=e(t[r]);s&&i.push(s)}return i}getDependency(e,t){let i=e+":"+t,r=this.cache.get(i);if(!r){switch(e){case"scene":r=this.loadScene(t);break;case"node":r=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":r=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":r=this.loadAccessor(t);break;case"bufferView":r=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":r=this.loadBuffer(t);break;case"material":r=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":r=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":r=this.loadSkin(t);break;case"animation":r=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":r=this.loadCamera(t);break;default:if(r=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!r)throw new Error("Unknown type: "+e);break}this.cache.add(i,r)}return r}getDependencies(e){let t=this.cache.get(e);if(!t){let i=this,r=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(r.map(function(s,a){return i.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],i=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[At.KHR_BINARY_GLTF].body);let r=this.options;return new Promise(function(s,a){i.load(Sr.resolveURL(t.uri,r.path),s,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(i){let r=t.byteLength||0,s=t.byteOffset||0;return i.slice(s,s+r)})}loadAccessor(e){let t=this,i=this.json,r=this.json.accessors[e];if(r.bufferView===void 0&&r.sparse===void 0){let a=wf[r.type],o=ja[r.componentType],c=r.normalized===!0,l=new o(r.count*a);return Promise.resolve(new hn(l,a,c))}let s=[];return r.bufferView!==void 0?s.push(this.getDependency("bufferView",r.bufferView)):s.push(null),r.sparse!==void 0&&(s.push(this.getDependency("bufferView",r.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",r.sparse.values.bufferView))),Promise.all(s).then(function(a){let o=a[0],c=wf[r.type],l=ja[r.componentType],u=l.BYTES_PER_ELEMENT,h=u*c,f=r.byteOffset||0,m=r.bufferView!==void 0?i.bufferViews[r.bufferView].byteStride:void 0,x=r.normalized===!0,v,g;if(m&&m!==h){let _=Math.floor(f/m),T="InterleavedBuffer:"+r.bufferView+":"+r.componentType+":"+_+":"+r.count,I=t.cache.get(T);I||(v=new l(o,_*m,r.count*m/u),I=new Ra(v,m/u),t.cache.add(T,I)),g=new Ia(I,c,f%m/u,x)}else o===null?v=new l(r.count*c):v=new l(o,f,r.count*c),g=new hn(v,c,x);if(r.sparse!==void 0){let _=wf.SCALAR,T=ja[r.sparse.indices.componentType],I=r.sparse.indices.byteOffset||0,E=r.sparse.values.byteOffset||0,w=new T(a[1],I,r.sparse.count*_),R=new l(a[2],E,r.sparse.count*c);o!==null&&(g=new hn(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let C=0,y=w.length;C<y;C++){let N=w[C];if(g.setX(N,R[C*c]),c>=2&&g.setY(N,R[C*c+1]),c>=3&&g.setZ(N,R[C*c+2]),c>=4&&g.setW(N,R[C*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=x}return g})}loadTexture(e){let t=this.json,i=this.options,s=t.textures[e].source,a=t.images[s],o=this.textureLoader;if(a.uri){let c=i.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(e,s,o)}loadTextureImage(e,t,i){let r=this,s=this.json,a=s.textures[e],o=s.images[t],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,i).then(function(u){u.flipY=!1,u.name=a.name||o.name||"",u.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(u.name=o.uri);let f=(s.samplers||{})[a.sampler]||{};return u.magFilter=h0[f.magFilter]||Jt,u.minFilter=h0[f.minFilter]||Ci,u.wrapS=d0[f.wrapS]||Gr,u.wrapT=d0[f.wrapT]||Gr,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==Kt&&u.minFilter!==Jt,r.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let i=this,r=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());let a=r.images[e],o=self.URL||self.webkitURL,c=a.uri||"",l=!1;if(a.bufferView!==void 0)c=i.getDependency("bufferView",a.bufferView).then(function(h){l=!0;let f=new Blob([h],{type:a.mimeType});return c=o.createObjectURL(f),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let u=Promise.resolve(c).then(function(h){return new Promise(function(f,m){let x=f;t.isImageBitmapLoader===!0&&(x=function(v){let g=new vn(v);g.needsUpdate=!0,f(g)}),t.load(Sr.resolveURL(h,s.path),x,void 0,m)})}).then(function(h){return l===!0&&o.revokeObjectURL(c),$i(h,a),h.userData.mimeType=a.mimeType||OT(a.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),h});return this.sourceCache[e]=u,u}assignTexture(e,t,i,r){let s=this;return this.getDependency("texture",i.index).then(function(a){if(!a)return null;if(i.texCoord!==void 0&&i.texCoord>0&&(a=a.clone(),a.channel=i.texCoord),s.extensions[At.KHR_TEXTURE_TRANSFORM]){let o=i.extensions!==void 0?i.extensions[At.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let c=s.associations.get(a);a=s.extensions[At.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),s.associations.set(a,c)}}return r!==void 0&&(a.colorSpace=r),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,i=e.material,r=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+i.uuid,c=this.cache.get(o);c||(c=new Da,Gn.prototype.copy.call(c,i),c.color.copy(i.color),c.map=i.map,c.sizeAttenuation=!1,this.cache.add(o,c)),i=c}else if(e.isLine){let o="LineBasicMaterial:"+i.uuid,c=this.cache.get(o);c||(c=new La,Gn.prototype.copy.call(c,i),c.color.copy(i.color),c.map=i.map,this.cache.add(o,c)),i=c}if(r||s||a){let o="ClonedMaterial:"+i.uuid+":";r&&(o+="derivative-tangents:"),s&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=i.clone(),s&&(c.vertexColors=!0),a&&(c.flatShading=!0),r&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(i))),i=c}e.material=i}getMaterialType(){return Cs}loadMaterial(e){let t=this,i=this.json,r=this.extensions,s=i.materials[e],a,o={},c=s.extensions||{},l=[];if(c[At.KHR_MATERIALS_UNLIT]){let h=r[At.KHR_MATERIALS_UNLIT];a=h.getMaterialType(),l.push(h.extendParams(o,s,t))}else{let h=s.pbrMetallicRoughness||{};if(o.color=new st(1,1,1),o.opacity=1,Array.isArray(h.baseColorFactor)){let f=h.baseColorFactor;o.color.setRGB(f[0],f[1],f[2],Ln),o.opacity=f[3]}h.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",h.baseColorTexture,nn)),o.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,o.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",h.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",h.metallicRoughnessTexture))),a=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,o)})))}s.doubleSided===!0&&(o.side=Un);let u=s.alphaMode||Rf.OPAQUE;if(u===Rf.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,u===Rf.MASK&&(o.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&a!==Hn&&(l.push(t.assignTexture(o,"normalMap",s.normalTexture)),o.normalScale=new xt(1,1),s.normalTexture.scale!==void 0)){let h=s.normalTexture.scale;o.normalScale.set(h,h)}if(s.occlusionTexture!==void 0&&a!==Hn&&(l.push(t.assignTexture(o,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&a!==Hn){let h=s.emissiveFactor;o.emissive=new st().setRGB(h[0],h[1],h[2],Ln)}return s.emissiveTexture!==void 0&&a!==Hn&&l.push(t.assignTexture(o,"emissiveMap",s.emissiveTexture,nn)),Promise.all(l).then(function(){let h=new a(o);return s.name&&(h.name=s.name),$i(h,s),t.associations.set(h,{materials:e}),s.extensions&&Fs(r,h,s),h})}createUniqueName(e){let t=Xt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,i=this.extensions,r=this.primitiveCache;function s(o){return i[At.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return f0(c,o,t)})}let a=[];for(let o=0,c=e.length;o<c;o++){let l=e[o],u=UT(l),h=r[u];if(h)a.push(h.promise);else{let f;l.extensions&&l.extensions[At.KHR_DRACO_MESH_COMPRESSION]?f=s(l):f=f0(new Mn,l,t),l.mode===mi.TRIANGLE_STRIP?f=f.then(m=>Af(m,ll)):l.mode===mi.TRIANGLE_FAN&&(f=f.then(m=>Af(m,Wa))),r[u]={primitive:l,promise:f},a.push(f)}}return Promise.all(a)}loadMesh(e){let t=this,i=this.json,r=this.extensions,s=i.meshes[e],a=s.primitives,o=[];for(let c=0,l=a.length;c<l;c++){let u=a[c].material===void 0?NT(this.cache):this.getDependency("material",a[c].material);o.push(u)}return o.push(t.loadGeometries(a)),Promise.all(o).then(async function(c){let l=c.slice(0,c.length-1),u=c[c.length-1],h=[];for(let m=0,x=u.length;m<x;m++){let v=u[m],g=a[m],_,T=l[m];if(g.mode===mi.TRIANGLES||g.mode===mi.TRIANGLE_STRIP||g.mode===mi.TRIANGLE_FAN||g.mode===void 0){let I=s.isSkinnedMesh===!0,E=v.hasAttribute("skinIndex")&&v.hasAttribute("skinWeight");I&&E===!1&&console.warn("THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled."),_=I&&E?new Fo(v,T):new cn(v,T),_.isSkinnedMesh===!0&&_.normalizeSkinWeights()}else if(g.mode===mi.LINES)_=new zo(v,T);else if(g.mode===mi.LINE_STRIP)_=new Rs(v,T);else if(g.mode===mi.LINE_LOOP)_=new Vo(v,T);else if(g.mode===mi.POINTS)_=new Go(v,T);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(_.geometry.morphAttributes).length>0&&DT(_,s),_.name=t.createUniqueName(s.name||"mesh_"+e),$i(_,s),g.extensions&&Fs(r,_,g),t.assignFinalMaterial(_),h.push(_)}for(let m=0,x=h.length;m<x;m++)t.associations.set(h[m],{meshes:e,primitives:m});if(h.length===1)return s.extensions&&Fs(r,h[0],s),h[0];let f=new wi;s.extensions&&Fs(r,f,s),t.associations.set(f,{meshes:e});for(let m=0,x=h.length;m<x;m++)f.add(h[m]);return f})}loadCamera(e){let t,i=this.json.cameras[e],r=i[i.type];if(!r){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return i.type==="perspective"?t=new _n(Xa.radToDeg(r.yfov),r.aspectRatio||1,r.znear||1,r.zfar||2e6):i.type==="orthographic"&&(t=new qi(-r.xmag,r.xmag,r.ymag,-r.ymag,r.znear,r.zfar)),i.name&&(t.name=this.createUniqueName(i.name)),$i(t,i),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],i=[];for(let r=0,s=t.joints.length;r<s;r++)i.push(this._loadNodeShallow(t.joints[r]));return t.inverseBindMatrices!==void 0?i.push(this.getDependency("accessor",t.inverseBindMatrices)):i.push(null),Promise.all(i).then(function(r){let s=r.pop(),a=r,o=[],c=[];for(let l=0,u=a.length;l<u;l++){let h=a[l];if(h){o.push(h);let f=new ft;s!==null&&f.fromArray(s.array,l*16),c.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Bo(o,c)})}loadAnimation(e){let t=this.json,i=this,r=t.animations[e],s=r.name?r.name:"animation_"+e,a=[],o=[],c=[],l=[],u=[];for(let h=0,f=r.channels.length;h<f;h++){let m=r.channels[h],x=r.samplers[m.sampler],v=m.target,g=v.node,_=r.parameters!==void 0?r.parameters[x.input]:x.input,T=r.parameters!==void 0?r.parameters[x.output]:x.output;v.node!==void 0&&(a.push(this.getDependency("node",g)),o.push(this.getDependency("accessor",_)),c.push(this.getDependency("accessor",T)),l.push(x),u.push(v))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(h){let f=h[0],m=h[1],x=h[2],v=h[3],g=h[4],_=[];for(let I=0,E=f.length;I<E;I++){let w=f[I],R=m[I],C=x[I],y=v[I],N=g[I];if(w===void 0)continue;w.updateMatrix&&w.updateMatrix();let k=i._createAnimationTracks(w,R,C,y,N);if(k)for(let W=0;W<k.length;W++)_.push(k[W])}let T=new Yo(s,void 0,_);return $i(T,r),T})}createNodeMesh(e){let t=this.json,i=this,r=t.nodes[e];return r.mesh===void 0?null:i.getDependency("mesh",r.mesh).then(function(s){let a=i._getNodeRef(i.meshCache,r.mesh,s);return r.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=r.weights.length;c<l;c++)o.morphTargetInfluences[c]=r.weights[c]}),a})}loadNode(e){let t=this.json,i=this,r=t.nodes[e],s=i._loadNodeShallow(e),a=[],o=r.children||[];for(let l=0,u=o.length;l<u;l++)a.push(i.getDependency("node",o[l]));let c=r.skin===void 0?Promise.resolve(null):i.getDependency("skin",r.skin);return Promise.all([s,Promise.all(a),c]).then(function(l){let u=l[0],h=l[1],f=l[2];f!==null&&u.traverse(function(m){m.isSkinnedMesh&&m.bind(f,FT)});for(let m=0,x=h.length;m<x;m++)u.add(h[m]);if(u.userData.pivot!==void 0&&h.length>0){let m=u.userData.pivot,x=h[0];u.pivot=new Z().fromArray(m),u.position.x-=m[0],u.position.y-=m[1],u.position.z-=m[2],x.position.set(0,0,0),delete u.userData.pivot}return u})}_loadNodeShallow(e){let t=this.json,i=this.extensions,r=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let s=t.nodes[e],a=s.name?r.createUniqueName(s.name):"",o=[],c=r._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),s.camera!==void 0&&o.push(r.getDependency("camera",s.camera).then(function(l){return r._getNodeRef(r.cameraCache,s.camera,l)})),r._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let u;if(s.isBone===!0?u=new Ca:l.length>1?u=new wi:l.length===1?u=l[0]:u=new Qt,u!==l[0])for(let h=0,f=l.length;h<f;h++)u.add(l[h]);if(s.name&&(u.userData.name=s.name,u.name=a),$i(u,s),s.extensions&&Fs(i,u,s),s.matrix!==void 0){let h=new ft;h.fromArray(s.matrix),u.applyMatrix4(h)}else s.translation!==void 0&&u.position.fromArray(s.translation),s.rotation!==void 0&&u.quaternion.fromArray(s.rotation),s.scale!==void 0&&u.scale.fromArray(s.scale);if(!r.associations.has(u))r.associations.set(u,{});else if(s.mesh!==void 0&&r.meshCache.refs[s.mesh]>1){let h=r.associations.get(u);r.associations.set(u,{...h})}return r.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){let t=this.extensions,i=this.json.scenes[e],r=this,s=new wi;i.name&&(s.name=r.createUniqueName(i.name)),$i(s,i),i.extensions&&Fs(t,s,i);let a=i.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(r.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let u=0,h=c.length;u<h;u++){let f=c[u];f.parent!==null?s.add(l0(f)):s.add(f)}let l=u=>{let h=new Map;for(let[f,m]of r.associations)(f instanceof Gn||f instanceof vn)&&h.set(f,m);return u.traverse(f=>{let m=r.associations.get(f);m!=null&&h.set(f,m)}),h};return r.associations=l(s),s})}_createAnimationTracks(e,t,i,r,s){let a=[],o=e.name?e.name:e.uuid,c=[];function l(m){m.morphTargetInfluences&&c.push(m.name?m.name:m.uuid)}Kr[s.path]===Kr.weights?(l(e),e.isGroup&&e.children.forEach(l)):c.push(o);let u;switch(Kr[s.path]){case Kr.weights:u=xr;break;case Kr.rotation:u=vr;break;case Kr.translation:case Kr.scale:u=Xr;break;default:i.itemSize===1?u=xr:u=Xr;break}let h=r.interpolation!==void 0?PT[r.interpolation]:As,f=this._getArrayFromAccessor(i);for(let m=0,x=c.length;m<x;m++){let v=new u(c[m]+"."+Kr[s.path],t.array,f,h);r.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(v),a.push(v)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let i=Qf(t.constructor),r=new Float32Array(t.length);for(let s=0,a=t.length;s<a;s++)r[s]=t[s]*i;t=r}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(i){let r=this instanceof vr?$f:Qu;return new r(this.times,this.values,this.getValueSize()/3,i)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function BT(n,e,t){let i=e.attributes,r=new ti;if(i.POSITION!==void 0){let o=t.json.accessors[i.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(r.set(new Z(c[0],c[1],c[2]),new Z(l[0],l[1],l[2])),o.normalized){let u=Qf(ja[o.componentType]);r.min.multiplyScalar(u),r.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let s=e.targets;if(s!==void 0){let o=new Z,c=new Z;for(let l=0,u=s.length;l<u;l++){let h=s[l];if(h.POSITION!==void 0){let f=t.json.accessors[h.POSITION],m=f.min,x=f.max;if(m!==void 0&&x!==void 0){if(c.setX(Math.max(Math.abs(m[0]),Math.abs(x[0]))),c.setY(Math.max(Math.abs(m[1]),Math.abs(x[1]))),c.setZ(Math.max(Math.abs(m[2]),Math.abs(x[2]))),f.normalized){let v=Qf(ja[f.componentType]);c.multiplyScalar(v)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}r.expandByVector(o)}n.boundingBox=r;let a=new Vn;r.getCenter(a.center),a.radius=r.min.distanceTo(r.max)/2,n.boundingSphere=a}function f0(n,e,t){let i=e.attributes,r=[];function s(a,o){return t.getDependency("accessor",a).then(function(c){n.setAttribute(o,c)})}for(let a in i){let o=Jf[a]||a.toLowerCase();o in n.attributes||r.push(s(i[a],o))}if(e.indices!==void 0&&!n.index){let a=t.getDependency("accessor",e.indices).then(function(o){n.setIndex(o)});r.push(a)}return Et.workingColorSpace!==Ln&&"COLOR_0"in i&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Et.workingColorSpace}" not supported.`),$i(n,e),BT(n,e,t),Promise.all(r).then(function(){return e.targets!==void 0?LT(n,e.targets,t):n})}var m0=(n,e,t)=>Math.max(e,Math.min(t,n));function kT(n,e){return Math.max(0,Math.min(n.left+n.width,e.left+e.width)-Math.max(n.left,e.left))*Math.max(0,Math.min(n.top+n.height,e.top+e.height)-Math.max(n.top,e.top))}function g0(n,e,t=[]){let i=t.map(s=>({...s})),r=new Map;for(let s of[...n].sort((a,o)=>a.y-o.y||String(a.id).localeCompare(String(o.id)))){let{x:a,y:o,width:c,height:l}=s,u=a-c/2,h=[u,a-c+32,a-32,...i.flatMap(v=>[v.left-c-8,v.left+v.width+8])],f=[o-l-18,o+18,...i.flatMap(v=>[v.top-l-8,v.top+v.height+8])],m=null,x=1/0;for(let v of h)for(let g of f){let _=m0(v,16,Math.max(16,e.width-c-16)),T=g+l<=o-8?"above":g>=o+8?"below":null;if(!T||g<16||g+l>e.height-16||a>=48&&a<=e.width-16-32&&(a<_+16||a>_+c-16))continue;let I={left:_,top:g,width:c,height:l},E=i.reduce((C,y)=>C+kT(I,y),0),w=T==="above"?o-g-l:g-o,R=E*1e4+Math.abs(_-u)+Math.abs(w-18)*2+(T==="below"?200:0);R<x&&(x=R,m={...I,side:T,anchorX:a,anchorY:o})}m??={left:m0(u,16,Math.max(16,e.width-c-16)),top:o-l-18,width:c,height:l,side:"above",anchorX:a,anchorY:o},r.set(s.id,m),i.push(m)}return r}var zT=new Intl.Segmenter("fr",{granularity:"grapheme"}),fl=n=>[...zT.segment(n)].map(e=>e.segment);function tp(n,e,t,i=3){let r=[];for(let a of String(n).replace(/\r/g,"").split(`
`)){let o="";for(let c of fl(a)){if(o&&e(o+c)>t){let l=o.lastIndexOf(" ");l>0?(r.push(o.slice(0,l)),o=o.slice(l+1)):(r.push(o),o="")}o+=c}r.push(o.trimEnd())}let s=[];for(let a=0;a<r.length;a+=i)s.push(r.slice(a,a+i).join(`
`));return s}function np(n,e,t=32){let i=Math.min(n.length,Math.max(0,Math.floor(e*t/1e3)));return{text:n.slice(0,i).join(""),complete:i===n.length,expired:e>=n.length*1e3/t+Math.max(3e3,n.length*30)}}var eh=class{constructor(){this.seen=new Set,this.queues=new Map}receive(e){for(let t of e){if(!t.id||!t.author||!t.text?.trim()||this.seen.has(t.id))continue;this.seen.add(t.id),this.seen.size>1e3&&this.seen.delete(this.seen.values().next().value);let i=this.queues.get(t.author)??[];i.length>=5&&i.shift(),i.push(t),this.queues.set(t.author,i)}}next(e){return this.queues.get(e)?.shift()}remove(e){this.queues.delete(e)}};async function _0(n){let e=u=>new URL("dialogue/"+u,n).href,t=await new FontFace("AveriaSky",'url("'+e("AveriaSansLibre-Regular.ttf")+'")').load();document.fonts.add(t),await Promise.all(["frame.png","name.png","tail.png","continue.png"].map(async u=>{let h=new Image;h.src=e(u),await h.decode()}));let i=document.createElement("style");i.textContent=["#sky-dialogues{position:fixed;inset:0;pointer-events:none;z-index:10}",'.sky-dialogue{position:absolute;box-sizing:border-box;border:24px solid transparent;border-image:url("'+e("frame.png")+'") 32 fill / 24px stretch;color:#fff;font:24px/1.3 AveriaSky,sans-serif;filter:drop-shadow(2px 3px 2px #0009);text-shadow:1px 2px 1px #000;--speaker-x:70%;--tail-height:30px}','.sky-dialogue-name{color:#ffd778;font-size:27px;line-height:36px;height:36px;margin:-8px -8px 10px;padding:0 16px;overflow:hidden;white-space:nowrap;border-image:url("'+e("name.png")+'") 0 8 0 8 fill / 0 8px 0 8px stretch}',".sky-dialogue-text{white-space:pre-wrap;overflow-wrap:anywhere;padding-bottom:16px}",'.sky-dialogue-tail{position:absolute;left:calc(var(--speaker-x) - 30px);top:calc(100% + 14px);width:40px;height:var(--tail-height);background:url("'+e("tail.png")+'") center/100% 100% no-repeat}','.sky-dialogue-continue{position:absolute;bottom:-21px;left:calc(var(--speaker-x) - 12px);width:24px;height:26px;background:url("'+e("continue.png")+'") center/100% 100% no-repeat;animation:sky-dialogue-pulse .8s ease-in-out infinite alternate}','.sky-dialogue[data-side="below"] .sky-dialogue-tail{top:auto;bottom:calc(100% + 14px);transform:scaleY(-1)}','.sky-dialogue[data-side="below"] .sky-dialogue-continue{bottom:auto;top:-21px;rotate:180deg}',"@keyframes sky-dialogue-pulse{to{transform:translateY(3px)}}","@media(prefers-reduced-motion:reduce){.sky-dialogue-continue{animation:none}}"].join(`
`),document.head.append(i);let r=document.createElement("div");r.id="sky-dialogues",document.body.append(r);let s=new eh,a=new Map,o=document.createElement("canvas").getContext("2d");o.font="24px AveriaSky";function c(u){let h=Math.max(...u.text.split(`
`).map(m=>o.measureText(m).width)),f=o.measureText(u.character).width*27/24+32;return Math.min(560,innerWidth-32,Math.max(240,Math.max(h,f)+52))}function l(u,h,f){let m=c(h),x=tp(h.text,w=>o.measureText(w).width,m-48),v=document.createElement("section");v.className="sky-dialogue",v.dataset.author=u,v.style.width=m+"px",v.setAttribute("aria-label",h.character+" : "+h.text);let g=document.createElement("div");g.className="sky-dialogue-name",g.textContent=h.character;let _=document.createElement("div");_.className="sky-dialogue-text",_.style.height=Math.max(...x.map(w=>w.split(`
`).length))*31.2+"px";let T=document.createElement("div");T.className="sky-dialogue-tail";let I=document.createElement("div");I.className="sky-dialogue-continue",I.hidden=!0,v.append(g,_,T,I),r.append(v);let E={element:v,text:_,continuation:I,pages:x,page:0,characters:fl(x[0]),started:f,width:m,message:h};return a.set(u,E),E}return{receive(u){s.receive(u)},update(u,h,f){let m=[];for(let g of s.queues.keys())h.has(g)||s.remove(g);for(let[g,_]of a)h.has(g)||(_.element.remove(),a.delete(g),s.remove(g));for(let[g,_]of h){let T=a.get(g);if(!T){let y=s.next(g);y&&(T=l(g,y,u))}if(!T)continue;let I=c(T.message);T.width!==I&&(T.width=I,T.element.style.width=I+"px",T.pages=tp(T.message.text,y=>o.measureText(y).width,I-48),T.page=Math.min(T.page,T.pages.length-1),T.characters=fl(T.pages[T.page]),T.started=u,T.text.style.height=Math.max(...T.pages.map(y=>y.split(`
`).length))*31.2+"px");let E=np(T.characters,u-T.started);if(E.expired)if(++T.page<T.pages.length)T.started=u,T.characters=fl(T.pages[T.page]),E=np(T.characters,0);else{T.element.remove(),a.delete(g);continue}T.text.textContent=E.text,T.continuation.hidden=!E.complete;let w=new Z(_.position.x,_.position.y+_.info.height,_.position.z).project(f),R=(w.x+1)*innerWidth/2,C=(1-w.y)*innerHeight/2;T.element.hidden=w.z<-1||w.z>1||R<0||R>innerWidth||C<0||C>innerHeight,T.element.hidden||m.push({id:g,x:R,y:C-8,width:T.width,height:T.element.offsetHeight})}let x=document.getElementById("hud")?.getBoundingClientRect(),v=g0(m,{width:innerWidth,height:innerHeight},x?[{left:x.left,top:x.top,width:x.width,height:x.height}]:[]);for(let[g,_]of v){let T=a.get(g);T.element.style.left=_.left+"px",T.element.style.top=_.top+"px",T.element.dataset.side=_.side,T.element.style.setProperty("--speaker-x",_.anchorX-_.left-24+"px");let I=_.side==="above"?_.anchorY-_.top-_.height+10:_.top-_.anchorY+10;T.element.style.setProperty("--tail-height",I/(22/24)+"px")}},dispose(){r.remove(),i.remove(),document.fonts.delete(t),a.clear()}}}function x0(n,e,t){return!e||!t||Math.hypot(e.x-t.x,e.z-t.z)<=.02?!1:Math.hypot(n.x-e.x,n.z-e.z)>.8}function v0(n,e,t){return{x:Math.round((e-n.origin.x)/n.step),z:Math.round((t-n.origin.z)/n.step)}}function pl(n,e,t){return e<0||t<0||e>=n.width||t>=n.height?-1:t*n.width+e}function $a(n,e,t){let i=pl(n,e,t);return i>=0&&n.cells[i]!==null}function ml(n,e){return{x:n.origin.x+e.x*n.step,z:n.origin.z+e.z*n.step,y:n.cells[pl(n,e.x,e.z)]}}function gl(n,e){let t=v0(n,e.x,e.z);if($a(n,t.x,t.z))return t;let i=null,r=1/0;for(let s=0;s<n.height;s++)for(let a=0;a<n.width;a++)if($a(n,a,s)){let o=(a-t.x)**2+(s-t.z)**2;o<r&&(r=o,i={x:a,z:s})}return i}function ip(n,e,t){let i=gl(n,e),r=v0(n,t.x,t.z);if(!i||!$a(n,r.x,r.z))return[];let s=pl(n,i.x,i.z),a=pl(n,r.x,r.z),o=new Set([s]),c=new Map,l=new Map([[s,0]]),u=h=>Math.hypot(h%n.width-r.x,Math.floor(h/n.width)-r.z);for(;o.size;){let h=-1,f=1/0;for(let v of o){let g=l.get(v)+u(v);g<f&&(f=g,h=v)}if(h===a){let v=[];for(;h!==s;)v.push(ml(n,{x:h%n.width,z:Math.floor(h/n.width)})),h=c.get(h);return v.reverse()}o.delete(h);let m=h%n.width,x=Math.floor(h/n.width);for(let[v,g]of[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]){let _=m+v,T=x+g,I=pl(n,_,T);if(!$a(n,_,T)||Math.abs(n.cells[I]-n.cells[h])>.35||v&&g&&(!$a(n,m+v,x)||!$a(n,m,x+g)))continue;let E=l.get(h)+Math.hypot(v,g);E>=(l.get(I)??1/0)||(c.set(I,h),l.set(I,E),o.add(I))}}return[]}function rp(n,e,t,i=3.5,r=()=>{}){let s=Math.max(0,t)*i,a=0,o=0,c=0;for(;e.length&&s>0;){let l=e[0],u=l.x-n.x,h=l.z-n.z,f=Math.hypot(u,h);if(f<1e-6){e.shift();continue}let m=Math.min(f,s);o=u/f,c=h/f,n.x+=o*m,n.z+=c*m,n.y=(n.y??0)+((l.y??n.y??0)-(n.y??0))*(m/f),r({...n}),a+=m,s-=m,m>=f-1e-6&&e.shift()}return{moving:a>1e-5,dx:o,dz:c}}function y0(n,e,t,i){let r=n*t.x+e*t.z,s=n*i.x+e*i.z;return(Math.round((Math.PI-Math.atan2(s,r))/(Math.PI/4))%8+8)%8}var jr=new URL(new URLSearchParams(location.search).has("frame_id")?"/.proxy/assets/sky/":"./assets/sky/",location.href);async function S0(n){let e=new Zu({canvas:n,antialias:!1,alpha:!1});e.setPixelRatio(Math.min(devicePixelRatio,2)),e.setClearColor(2104088),e.outputColorSpace=nn;let t=new Do,i=new qi(-12,12,8,-8,.1,150),r=new Map,s=await fetch(new URL("characters.json",jr)).then(j=>j.json()),o=(await new $u().loadAsync(new URL("anterose.gltf",jr).href)).scene;t.add(o),o.traverse(j=>{if(j.isMesh){let _e=Array.isArray(j.material)?j.material:[j.material];for(let ze of _e)ze.map&&(ze.map.magFilter=Kt,ze.map.minFilter=Jt,ze.map.needsUpdate=!0)}});let c=await fetch(new URL("navigation.json",jr)).then(j=>j.json()),l=await _0(jr),u=c.spawn??ml(c,gl(c,{x:0,z:0})),h=new Qo,f=new xt,m=new Set,x=0,v=[],g=j=>{v.push({...j,sequence:++x}),v.length>1024&&v.shift()},_=[],T=0,I=Math.atan2(11,13),E=null,w=8,R=new Z(u.x,u.y,u.z),C=null,y=performance.now(),N=!1,k=[],W={npcs:[],pom:null,receivedAt:0},q={hp:100},Q=0,G=document.createElement("div"),J=document.createElement("div"),oe=document.createElement("div");oe.id="sky-labels";let re=new Map;G.id="sky-actions",G.hidden=!0,J.id="sky-combat";let pe=document.createElement("style");pe.textContent="#sky-labels{position:fixed;inset:0;pointer-events:none;z-index:8}.sky-nameplate{position:absolute;transform:translate(-50%,-100%);color:#ffe8b5;font:16px AveriaSky,sans-serif;text-shadow:1px 1px 2px #000;background:#211c2a9c;border-radius:3px;padding:2px 6px;white-space:nowrap}.sky-hp{height:4px;background:#4c2222;margin-top:3px}.sky-hp i{display:block;height:100%;background:#94d375}#sky-actions{position:fixed;z-index:30;padding:6px;background:#211c2aee;border:2px solid #d9c28d;border-radius:5px;color:white;font:18px AveriaSky,sans-serif}#sky-actions button{display:block;width:100%;text-align:left;padding:8px 12px;background:transparent;color:#fff;border:0;cursor:pointer;font:inherit}#sky-actions button:hover{background:#61537f}#sky-combat{position:fixed;bottom:16px;left:16px;z-index:12;background:#211c2ade;color:#ffe7b0;padding:10px 14px;border:1px solid #c6b27d;border-radius:5px;font:18px AveriaSky,sans-serif;pointer-events:none;white-space:pre-line;max-width:calc(100vw - 64px)}",document.head.append(pe),document.body.append(G,J,oe);let ne=document.getElementById("aide");ne&&(ne.hidden=!0);function ue(j,_e){k.length>=8||(k.push({id:crypto.randomUUID(),type:j,target:_e}),G.hidden=!0)}function de(j){let _e=r.get(C);if(!_e||q.hp===0)return;let ze=(p,d=2.2)=>Math.hypot(p.x-_e.position.x,p.z-_e.position.z)<=d&&Math.abs((p.y??0)-_e.position.y)<1.8;f.set(j.clientX/innerWidth*2-1,1-j.clientY/innerHeight*2),h.setFromCamera(f,i);let Ke=[...r].filter(([p])=>p!==C&&p!=="world:pom"),Qe=h.intersectObjects(Ke.map(([,p])=>p.mesh))[0],$e=Qe&&Ke.find(([,p])=>p.mesh===Qe.object),B=[],xe=W.npcs.filter(p=>ze(p)&&Math.abs(p.y-_e.position.y)<.6).sort((p,d)=>Math.hypot(p.x-_e.position.x,p.z-_e.position.z)-Math.hypot(d.x-_e.position.x,d.z-_e.position.z));for(let p of xe)B.push(["Parler \xE0 "+p.name,"talk",p.id]);let me=W.pom;me?.mode==="rest"&&ze(me,2)&&B.push(["Ramasser le Pom","pickup"]),me?.owner===C&&($e&&!$e[1].npc&&$e[1].hp!==0?B.unshift(["Lancer sur "+$e[1].displayName,"throw",$e[0]]):J.textContent="Clic droit sur un joueur pour lancer le Pom."),G.replaceChildren();for(let[p,d,S]of B){let A=document.createElement("button");A.textContent=p,A.addEventListener("click",()=>ue(d,S)),G.append(A)}G.hidden=!B.length,G.style.left=Math.min(j.clientX,innerWidth-260)+"px",G.style.top=Math.min(j.clientY,innerHeight-180)+"px"}let He=new Ps,Ce=new Map,dt=new cn(new Xo(.15,.22,24),new Hn({color:16767364,side:Un,transparent:!0,opacity:.8}));dt.rotation.x=-Math.PI/2,dt.visible=!1,t.add(dt);async function nt(j){let _e=r.get(j.id),ze=j.hp===0,Ke=s[j.character]?j.character:"Estelle";if(_e&&_e.character===Ke&&_e.dead===ze)return _e.displayName=j.nom??j.name??j.character,_e.hp=j.hp??100,_e.npc=!!j.npc,_e.walking=!!j.moving,j.heading&&(_e.heading=j.heading),_e.target={x:j.x,y:j.y??0,z:j.z},_e;_e&&(t.remove(_e.mesh),_e.mesh.geometry.dispose(),_e.mesh.material.map.dispose(),_e.mesh.material.dispose());let Qe=s[Ke],$e=ze&&Qe.death?{...Qe.death,height:Qe.height*Qe.death.frameHeight/Qe.frameHeight}:Qe,B=Ke+(ze&&Qe.death?":death":"");Qe.death&&!Ce.has(Ke+":death")&&Ce.set(Ke+":death",He.loadAsync(new URL(Qe.death.texture,jr).href)),Ce.has(B)||Ce.set(B,He.loadAsync(new URL($e.texture,jr).href));let xe=await Ce.get(B),me=xe.clone();me.colorSpace=nn,me.magFilter=Kt,me.minFilter=Kt,me.generateMipmaps=!1,me.repeat.set(1/$e.columns,1/$e.rows),me.needsUpdate=!0;let p=new Is($e.height*$e.frameWidth/$e.frameHeight,$e.height);p.translate(0,$e.height/2,0);let d=new cn(p,new Hn({map:me,transparent:!0,alphaTest:.15,depthWrite:!0,side:Un}));return t.add(d),_e={mesh:d,character:Ke,displayName:j.nom??j.name??j.character,dead:ze,hp:j.hp??100,npc:!!j.npc,walking:!!j.moving,fallbackDeath:ze&&!Qe.death,info:$e,position:{x:j.x??u.x,y:j.y??u.y,z:j.z??u.z},target:null,direction:6,heading:{dx:0,dz:-1},time:0},r.set(j.id,_e),_e}function vt(){let j=innerWidth/innerHeight;i.left=-w*j,i.right=w*j,i.top=w,i.bottom=-w,i.updateProjectionMatrix(),e.setSize(innerWidth,innerHeight,!1)}function ie(j){j.target.closest?.("input,textarea,select,[contenteditable]")||["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," ","z","q","s","d","w","a","e","r"].includes(j.key)&&(j.preventDefault(),m.add(j.key.toLowerCase()))}function te(j){m.delete(j.key.toLowerCase())}function Ne(){m.clear(),It()}function Je(j){if(j.button!==0||(G.hidden=!0,q.hp===0))return;f.set(j.clientX/innerWidth*2-1,-j.clientY/innerHeight*2+1),h.setFromCamera(f,i);let _e=h.intersectObject(o,!0);if(!_e.length)return;let ze=r.get(C);if(ze)for(let Ke of _e){let Qe=gl(c,Ke.point);if(!Qe)continue;let $e=ml(c,Qe);if(Math.hypot($e.x-Ke.point.x,$e.z-Ke.point.z)>c.step*1.5||Math.abs($e.y-Ke.point.y)>.3)continue;let B=ip(c,ze.position,$e);if(B.length){_=B,dt.position.set($e.x,$e.y+.03,$e.z),dt.visible=!0;break}}}function Ee(j){if(j.button!==2){Je(j);return}j.preventDefault(),E={id:j.pointerId,x:j.clientX,y:j.clientY,startX:j.clientX,startY:j.clientY,moved:!1},n.setPointerCapture(j.pointerId)}function lt(j){!E||j.pointerId!==E.id||(Math.hypot(j.clientX-E.startX,j.clientY-E.startY)>5&&(E.moved=!0),E.moved&&(G.hidden=!0,T-=(j.clientX-E.x)*.006,I=Xa.clamp(I+(j.clientY-E.y)*.005,Math.PI/9,Math.PI*5/12),E.x=j.clientX,E.y=j.clientY))}function It(j){let _e=E;E=null,j?.type==="pointerup"&&_e&&!_e.moved&&de(j),_e&&n.hasPointerCapture(_e.id)&&n.releasePointerCapture(_e.id)}function ct(j){j.preventDefault()}function St(j){j.preventDefault(),w=Xa.clamp(w+j.deltaY*.005,4,15),vt()}n.addEventListener("pointerdown",Ee),n.addEventListener("pointermove",lt),n.addEventListener("pointerup",It),n.addEventListener("pointercancel",It),n.addEventListener("lostpointercapture",It),n.addEventListener("contextmenu",ct),n.addEventListener("wheel",St,{passive:!1}),addEventListener("keydown",ie),addEventListener("keyup",te),addEventListener("blur",Ne),addEventListener("resize",vt),vt();function Ct(j){if(N)return;if(j-y<33){requestAnimationFrame(Ct);return}let _e=Math.min((j-y)/1e3,.1);y=j;let ze=r.get(C);m.has("e")&&(T+=_e*1.5),m.has("r")&&(T-=_e*1.5),i.position.set(R.x+Math.sin(T)*Math.cos(I)*17,R.y+Math.sin(I)*17,R.z-Math.cos(T)*Math.cos(I)*17),i.lookAt(R),i.updateMatrixWorld();let Ke={x:i.matrixWorld.elements[0],z:i.matrixWorld.elements[2]},Qe=new Z;if(i.getWorldDirection(Qe),Qe.y=0,Qe.normalize(),ze&&q.hp>0){let xe=Number(m.has("arrowright")||m.has("d"))-Number(m.has("arrowleft")||m.has("q")||m.has("a")),me=Number(m.has("arrowup")||m.has("z")||m.has("w"))-Number(m.has("arrowdown")||m.has("s"));if(xe||me){let p=Math.hypot(xe,me),d=(Ke.x*xe+Qe.x*me)/p,S=(Ke.z*xe+Qe.z*me)/p;_=ip(c,ze.position,{x:ze.position.x+d*.6,z:ze.position.z+S*.6}),dt.visible=!1}}for(let[xe,me]of r){let p=W.pom,d=xe==="world:pom";if(d&&p&&p.mode!=="held"&&(Object.assign(me.position,{x:p.x,y:p.y,z:p.z}),p.mode==="flight")){let X=Math.min(.18,Math.max(0,(j-W.receivedAt)/1e3));for(let L=.008;L<=X;L+=.008){let F=p.x+p.vx*L,se=p.z+p.vz*L,ge=Math.round((F-c.origin.x)/c.step),le=Math.round((se-c.origin.z)/c.step),he=ge<0||le<0||ge>=c.width||le>=c.height?null:c.cells[le*c.width+ge];if(he===null||Math.abs(he-(p.y-.9))>=.65)break;me.position.x=F,me.position.z=se}}let S=d?{moving:p?.mode==="flight",dx:p?.vx??0,dz:p?.vz??0}:me.dead?{moving:!1,dx:0,dz:0}:xe===C?rp(me.position,_,_e,void 0,g):rp(me.position,me.target?[me.target]:[],_e,me.npc&&xe!=="world:pom"?.8:6);S.moving||me.walking?(S.moving&&(me.heading={dx:S.dx,dz:S.dz}),me.time+=_e):me.time=0,me.direction=y0(me.heading.dx,me.heading.dz,Ke,Qe);let A=S.moving||me.walking?me.info.run:me.info.idle,P=A[Math.floor(me.time*me.info.fps)%A.length],D=P*8+me.direction%(me.info.directions??8);me.mesh.material.map.offset.set(D%me.info.columns/me.info.columns,1-(Math.floor(D/me.info.columns)+1)/me.info.rows),me.mesh.position.set(me.position.x,me.position.y,me.position.z),me.mesh.rotation.z=me.fallbackDeath?Math.PI/2:0,me.mesh.rotation.y=Math.atan2(i.position.x-me.position.x,i.position.z-me.position.z)}ze&&R.lerp(new Z(ze.position.x,ze.position.y,ze.position.z),1-Math.exp(-_e*7)),_.length||(dt.visible=!1);let $e=r.get("world:pom"),B=W.pom;if($e&&B?.owner){let xe=r.get(B.owner);xe&&($e.mesh.position.copy(xe.mesh.position),$e.mesh.position.y+=.85,$e.mesh.position.x+=Ke.x*.3,$e.mesh.position.z+=Ke.z*.3)}if(q.hp===0){let xe=Math.max(0,Math.ceil((q.deadUntil-q.serverTime)/1e3-(performance.now()-q.received)/1e3));J.textContent="0 / 100 PV \xB7 R\xE9apparition dans "+xe+" s"}for(let[xe,me]of r){if(xe==="world:pom")continue;let p=re.get(xe);p||(p=document.createElement("div"),p.className="sky-nameplate",oe.append(p),re.set(xe,p));let d=new Z(me.position.x,me.position.y+me.info.height+.15,me.position.z).project(i);if(p.style.left=(d.x+1)*innerWidth/2+"px",p.style.top=(1-d.y)*innerHeight/2+"px",p.hidden=d.z>1||Math.abs(d.x)>1.1||Math.abs(d.y)>1.1,p.dataset.hp!==String(me.hp)||p.dataset.name!==me.displayName){if(p.replaceChildren(),p.append(document.createTextNode(me.displayName)),!me.npc){let S=document.createElement("div"),A=document.createElement("i");S.className="sky-hp",A.style.width=me.hp+"%",S.append(A),p.append(S)}p.dataset.hp=String(me.hp),p.dataset.name=me.displayName}}for(let[xe,me]of re)r.has(xe)||(me.remove(),re.delete(xe));l.update(j,r,i),e.render(t,i),requestAnimationFrame(Ct)}return requestAnimationFrame(Ct),{spawn:u,catalogue:s,messages(j){l.receive(j)},say(j){},async demoConversation(){},async me(j){C=j.id,await nt({...u,...j})},async sync(j){let _e=new Set([C]);for(let ze of j){if(ze.id===C){let Ke=r.get(C);Ke&&Ke.dead!==(ze.hp===0)?await nt({...ze,...Ke.position}):Ke&&(Ke.hp=ze.hp??100);continue}_e.add(ze.id),await nt(ze)}for(let[ze,Ke]of r)_e.has(ze)||(t.remove(Ke.mesh),Ke.mesh.geometry.dispose(),Ke.mesh.material.map.dispose(),Ke.mesh.material.dispose(),r.delete(ze))},async world(j){W={npcs:j.npcs??[],pom:j.pom??null,receivedAt:performance.now()},q={...j.health,received:performance.now()};let _e=r.get(C);(q.hp===0||(q.respawn??0)!==Q)&&(_=[],v=[],m.clear(),dt.visible=!1,_e&&Object.assign(_e.position,j.position)),Q=q.respawn??0,q.hp>0&&(J.textContent=q.hp+" / 100 PV \xB7 "+(W.pom?.owner===C?"Pom en main : clic droit sur un joueur pour viser.":"Clic droit : parler / ramasser le Pom. Glisser : cam\xE9ra.")),j.actionResult?.error&&(J.textContent=j.actionResult.error),j.actionResult?.id===k[0]?.id&&k.shift()},action(){return k[0]},correct(j,_e){let ze=r.get(C);ze&&x0(ze.position,j,_e)&&(Object.assign(ze.position,j),_=[],v=[])},movement(){return{...this.position(),trace:v.map(j=>({...j})),sequence:x}},acknowledgeMovement(j){v=v.filter(_e=>_e.sequence>j)},screenPoint(j){let _e=new Z(j.x,j.y,j.z).project(i);return{x:(_e.x+1)*innerWidth/2,y:(1-_e.y)*innerHeight/2}},cameraAngles(){return{yaw:T,pitch:I}},position(){return r.get(C)?.position??u},dispose(){N=!0,It(),n.removeEventListener("pointerdown",Ee),n.removeEventListener("pointermove",lt),n.removeEventListener("pointerup",It),n.removeEventListener("pointercancel",It),n.removeEventListener("lostpointercapture",It),n.removeEventListener("contextmenu",ct),n.removeEventListener("wheel",St),removeEventListener("keydown",ie),removeEventListener("keyup",te),removeEventListener("blur",Ne),removeEventListener("resize",vt),G.remove(),J.remove(),oe.remove(),pe.remove(),l.dispose(),e.dispose()}}}var sp=window.__CLIENT_ID__||"__CLIENT_ID__",E0=new URLSearchParams(location.search).has("frame_id"),VT=!1,Bs=document.getElementById("bandeau"),GT=document.getElementById("scene"),ap=window.__API_BASE__||(E0?"/.proxy/api":"/api"),op=n=>ap.endsWith(".php")?ap+"?r="+n:ap+"/"+n,_l=n=>{Bs.textContent=n},rn={salon:"local",moi:null,token:null,character:"Estelle",messageCursor:0},gi;function b0(n){let e=new Uint8Array(n),t="";for(let i of e)t+=String.fromCharCode(i);return btoa(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}async function HT(){let n=b0(crypto.getRandomValues(new Uint8Array(32))),e=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(n));return{verifieur:n,defi:b0(e)}}function M0(n,e,t){return Promise.race([n,new Promise((i,r)=>{setTimeout(()=>r(new Error(`${t} (${e/1e3} s)`)),e)})])}async function WT(){let n=new vo(sp);_l(`1/4 SDK, client ${sp}`),await M0(n.ready(),1e4,"Discord n a pas repondu (SDK)"),_l("2/4 SDK pret, autorisation...");let{verifieur:e,defi:t}=await HT(),{code:i}=await M0(n.commands.authorize({client_id:sp,response_type:"code",state:"",prompt:"none",scope:["identify"],code_challenge:t,code_challenge_method:"S256"}),15e3,"Discord n a pas repondu (autorisation)");_l("3/4 code recu, jeton...");let r=await fetch(op("token"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({code:i,code_verifier:e})}),{access_token:s,erreur:a}=await r.json();if(!s)throw new Error(a??`jeton absent (HTTP ${r.status})`);_l("4/4 jeton recu, identification...");let o=await n.commands.authenticate({access_token:s});rn.salon=n.channelId??"local";let c=await fetch(op("profile"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+s},body:JSON.stringify({channel:rn.salon,guild:n.guildId})}),l=await c.json();if(!c.ok)throw new Error(l.erreur??"Personnage indisponible");rn.token=l.activity_token,rn.messageCursor=l.messageCursor??0,rn.character=l.character,rn.moi={id:o.user.id,nom:rn.character,character:rn.character,...l.player},Bs.textContent=`Connecte : ${rn.moi.nom}
Salon ${rn.salon}`}async function XT(){if(!rn.token)return;let n=gi.movement(),e=await fetch(op("state"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+rn.token},body:JSON.stringify({...n,after:rn.messageCursor,action:gi.action()})}),t=await e.json();if(!e.ok)throw new Error(t.erreur??"Connexion perdue");gi.acknowledgeMovement(n.sequence),gi.correct(t.position,n),await gi.world(t),await gi.sync([...t.joueurs,...t.npcs??[],...t.pom?[{id:"world:pom",character:"Pom",npc:!0,...t.pom}]:[]]),gi.messages(t.messages??[]),rn.messageCursor=t.messageCursor??rn.messageCursor,t.character&&t.character!==rn.character&&(rn.character=t.character,await gi.me({...rn.moi,...gi.position(),character:t.character}),Bs.textContent="Votre personnage du jour : "+t.character)}async function qT(){if(!E0&&!VT){Bs.textContent="Ouvrez cette activit\xE9 depuis Discord.";return}_l("Chargement du restaurant Ant\xE9rose\u2026"),gi=await S0(GT),sg(new URL("music/anterose.ogg",jr)),await WT(),await gi.me({...rn.moi,character:rn.character}),Bs.textContent="Votre personnage du jour : "+rn.character+(gi.catalogue[rn.character]?"":" \xB7 sprite Estelle provisoire");async function n(){try{await XT()}catch(e){Bs.textContent=e.message}setTimeout(n,150)}n()}qT().catch(n=>{Bs.textContent="Chargement impossible : "+n.message,console.error(n)});
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/

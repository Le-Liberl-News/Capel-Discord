var z0=Object.defineProperty;var V0=(n,e)=>{for(var t in e)z0(n,t,{get:e[t],enumerable:!0})};var eo=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function to(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var Nl={exports:{}};var gp;function _p(){return gp?Nl.exports:(gp=1,(function(n){var e=Object.prototype.hasOwnProperty,t="~";function i(){}Object.create&&(i.prototype=Object.create(null),new i().__proto__||(t=!1));function r(c,l,u){this.fn=c,this.context=l,this.once=u||!1}function s(c,l,u,h,d){if(typeof u!="function")throw new TypeError("The listener must be a function");var m=new r(u,h||c,d),x=t?t+l:l;return c._events[x]?c._events[x].fn?c._events[x]=[c._events[x],m]:c._events[x].push(m):(c._events[x]=m,c._eventsCount++),c}function a(c,l){--c._eventsCount===0?c._events=new i:delete c._events[l]}function o(){this._events=new i,this._eventsCount=0}o.prototype.eventNames=function(){var l=[],u,h;if(this._eventsCount===0)return l;for(h in u=this._events)e.call(u,h)&&l.push(t?h.slice(1):h);return Object.getOwnPropertySymbols?l.concat(Object.getOwnPropertySymbols(u)):l},o.prototype.listeners=function(l){var u=t?t+l:l,h=this._events[u];if(!h)return[];if(h.fn)return[h.fn];for(var d=0,m=h.length,x=new Array(m);d<m;d++)x[d]=h[d].fn;return x},o.prototype.listenerCount=function(l){var u=t?t+l:l,h=this._events[u];return h?h.fn?1:h.length:0},o.prototype.emit=function(l,u,h,d,m,x){var v=t?t+l:l;if(!this._events[v])return!1;var g=this._events[v],_=arguments.length,T,I;if(g.fn){switch(g.once&&this.removeListener(l,g.fn,void 0,!0),_){case 1:return g.fn.call(g.context),!0;case 2:return g.fn.call(g.context,u),!0;case 3:return g.fn.call(g.context,u,h),!0;case 4:return g.fn.call(g.context,u,h,d),!0;case 5:return g.fn.call(g.context,u,h,d,m),!0;case 6:return g.fn.call(g.context,u,h,d,m,x),!0}for(I=1,T=new Array(_-1);I<_;I++)T[I-1]=arguments[I];g.fn.apply(g.context,T)}else{var E=g.length,w;for(I=0;I<E;I++)switch(g[I].once&&this.removeListener(l,g[I].fn,void 0,!0),_){case 1:g[I].fn.call(g[I].context);break;case 2:g[I].fn.call(g[I].context,u);break;case 3:g[I].fn.call(g[I].context,u,h);break;case 4:g[I].fn.call(g[I].context,u,h,d);break;default:if(!T)for(w=1,T=new Array(_-1);w<_;w++)T[w-1]=arguments[w];g[I].fn.apply(g[I].context,T)}}return!0},o.prototype.on=function(l,u,h){return s(this,l,u,h,!1)},o.prototype.once=function(l,u,h){return s(this,l,u,h,!0)},o.prototype.removeListener=function(l,u,h,d){var m=t?t+l:l;if(!this._events[m])return this;if(!u)return a(this,m),this;var x=this._events[m];if(x.fn)x.fn===u&&(!d||x.once)&&(!h||x.context===h)&&a(this,m);else{for(var v=0,g=[],_=x.length;v<_;v++)(x[v].fn!==u||d&&!x[v].once||h&&x[v].context!==h)&&g.push(x[v]);g.length?this._events[m]=g.length===1?g[0]:g:a(this,m)}return this},o.prototype.removeAllListeners=function(l){var u;return l?(u=t?t+l:l,this._events[u]&&a(this,u)):(this._events=new i,this._eventsCount=0),this},o.prototype.off=o.prototype.removeListener,o.prototype.addListener=o.prototype.on,o.prefixed=t,o.EventEmitter=o,n.exports=o})(Nl),Nl.exports)}var G0=_p(),ch=to(G0);var Tt;(function(n){n.assertEqual=r=>r;function e(r){}n.assertIs=e;function t(r){throw new Error}n.assertNever=t,n.arrayToEnum=r=>{let s={};for(let a of r)s[a]=a;return s},n.getValidEnumValues=r=>{let s=n.objectKeys(r).filter(o=>typeof r[r[o]]!="number"),a={};for(let o of s)a[o]=r[o];return n.objectValues(a)},n.objectValues=r=>n.objectKeys(r).map(function(s){return r[s]}),n.objectKeys=typeof Object.keys=="function"?r=>Object.keys(r):r=>{let s=[];for(let a in r)Object.prototype.hasOwnProperty.call(r,a)&&s.push(a);return s},n.find=(r,s)=>{for(let a of r)if(s(a))return a},n.isInteger=typeof Number.isInteger=="function"?r=>Number.isInteger(r):r=>typeof r=="number"&&isFinite(r)&&Math.floor(r)===r;function i(r,s=" | "){return r.map(a=>typeof a=="string"?`'${a}'`:a).join(s)}n.joinValues=i,n.jsonStringifyReplacer=(r,s)=>typeof s=="bigint"?s.toString():s})(Tt||(Tt={}));var hh;(function(n){n.mergeShapes=(e,t)=>({...e,...t})})(hh||(hh={}));var De=Tt.arrayToEnum(["string","nan","number","integer","float","boolean","date","bigint","symbol","function","undefined","null","array","object","unknown","promise","void","never","map","set"]),wr=n=>{switch(typeof n){case"undefined":return De.undefined;case"string":return De.string;case"number":return isNaN(n)?De.nan:De.number;case"boolean":return De.boolean;case"function":return De.function;case"bigint":return De.bigint;case"symbol":return De.symbol;case"object":return Array.isArray(n)?De.array:n===null?De.null:n.then&&typeof n.then=="function"&&n.catch&&typeof n.catch=="function"?De.promise:typeof Map<"u"&&n instanceof Map?De.map:typeof Set<"u"&&n instanceof Set?De.set:typeof Date<"u"&&n instanceof Date?De.date:De.object;default:return De.unknown}},_e=Tt.arrayToEnum(["invalid_type","invalid_literal","custom","invalid_union","invalid_union_discriminator","invalid_enum_value","unrecognized_keys","invalid_arguments","invalid_return_type","invalid_date","invalid_string","too_small","too_big","invalid_intersection_types","not_multiple_of","not_finite"]),H0=n=>JSON.stringify(n,null,2).replace(/"([^"]+)":/g,"$1:"),Zn=class n extends Error{constructor(e){super(),this.issues=[],this.addIssue=i=>{this.issues=[...this.issues,i]},this.addIssues=(i=[])=>{this.issues=[...this.issues,...i]};let t=new.target.prototype;Object.setPrototypeOf?Object.setPrototypeOf(this,t):this.__proto__=t,this.name="ZodError",this.issues=e}get errors(){return this.issues}format(e){let t=e||function(s){return s.message},i={_errors:[]},r=s=>{for(let a of s.issues)if(a.code==="invalid_union")a.unionErrors.map(r);else if(a.code==="invalid_return_type")r(a.returnTypeError);else if(a.code==="invalid_arguments")r(a.argumentsError);else if(a.path.length===0)i._errors.push(t(a));else{let o=i,c=0;for(;c<a.path.length;){let l=a.path[c];c===a.path.length-1?(o[l]=o[l]||{_errors:[]},o[l]._errors.push(t(a))):o[l]=o[l]||{_errors:[]},o=o[l],c++}}};return r(this),i}static assert(e){if(!(e instanceof n))throw new Error(`Not a ZodError: ${e}`)}toString(){return this.message}get message(){return JSON.stringify(this.issues,Tt.jsonStringifyReplacer,2)}get isEmpty(){return this.issues.length===0}flatten(e=t=>t.message){let t={},i=[];for(let r of this.issues)r.path.length>0?(t[r.path[0]]=t[r.path[0]]||[],t[r.path[0]].push(e(r))):i.push(e(r));return{formErrors:i,fieldErrors:t}}get formErrors(){return this.flatten()}};Zn.create=n=>new Zn(n);var Zs=(n,e)=>{let t;switch(n.code){case _e.invalid_type:n.received===De.undefined?t="Required":t=`Expected ${n.expected}, received ${n.received}`;break;case _e.invalid_literal:t=`Invalid literal value, expected ${JSON.stringify(n.expected,Tt.jsonStringifyReplacer)}`;break;case _e.unrecognized_keys:t=`Unrecognized key(s) in object: ${Tt.joinValues(n.keys,", ")}`;break;case _e.invalid_union:t="Invalid input";break;case _e.invalid_union_discriminator:t=`Invalid discriminator value. Expected ${Tt.joinValues(n.options)}`;break;case _e.invalid_enum_value:t=`Invalid enum value. Expected ${Tt.joinValues(n.options)}, received '${n.received}'`;break;case _e.invalid_arguments:t="Invalid function arguments";break;case _e.invalid_return_type:t="Invalid function return type";break;case _e.invalid_date:t="Invalid date";break;case _e.invalid_string:typeof n.validation=="object"?"includes"in n.validation?(t=`Invalid input: must include "${n.validation.includes}"`,typeof n.validation.position=="number"&&(t=`${t} at one or more positions greater than or equal to ${n.validation.position}`)):"startsWith"in n.validation?t=`Invalid input: must start with "${n.validation.startsWith}"`:"endsWith"in n.validation?t=`Invalid input: must end with "${n.validation.endsWith}"`:Tt.assertNever(n.validation):n.validation!=="regex"?t=`Invalid ${n.validation}`:t="Invalid";break;case _e.too_small:n.type==="array"?t=`Array must contain ${n.exact?"exactly":n.inclusive?"at least":"more than"} ${n.minimum} element(s)`:n.type==="string"?t=`String must contain ${n.exact?"exactly":n.inclusive?"at least":"over"} ${n.minimum} character(s)`:n.type==="number"?t=`Number must be ${n.exact?"exactly equal to ":n.inclusive?"greater than or equal to ":"greater than "}${n.minimum}`:n.type==="date"?t=`Date must be ${n.exact?"exactly equal to ":n.inclusive?"greater than or equal to ":"greater than "}${new Date(Number(n.minimum))}`:t="Invalid input";break;case _e.too_big:n.type==="array"?t=`Array must contain ${n.exact?"exactly":n.inclusive?"at most":"less than"} ${n.maximum} element(s)`:n.type==="string"?t=`String must contain ${n.exact?"exactly":n.inclusive?"at most":"under"} ${n.maximum} character(s)`:n.type==="number"?t=`Number must be ${n.exact?"exactly":n.inclusive?"less than or equal to":"less than"} ${n.maximum}`:n.type==="bigint"?t=`BigInt must be ${n.exact?"exactly":n.inclusive?"less than or equal to":"less than"} ${n.maximum}`:n.type==="date"?t=`Date must be ${n.exact?"exactly":n.inclusive?"smaller than or equal to":"smaller than"} ${new Date(Number(n.maximum))}`:t="Invalid input";break;case _e.custom:t="Invalid input";break;case _e.invalid_intersection_types:t="Intersection results could not be merged";break;case _e.not_multiple_of:t=`Number must be a multiple of ${n.multipleOf}`;break;case _e.not_finite:t="Number must be finite";break;default:t=e.defaultError,Tt.assertNever(n)}return{message:t}},yp=Zs;function W0(n){yp=n}function Ll(){return yp}var Dl=n=>{let{data:e,path:t,errorMaps:i,issueData:r}=n,s=[...t,...r.path||[]],a={...r,path:s};if(r.message!==void 0)return{...r,path:s,message:r.message};let o="",c=i.filter(l=>!!l).slice().reverse();for(let l of c)o=l(a,{data:e,defaultError:o}).message;return{...r,path:s,message:o}},X0=[];function Pe(n,e){let t=Ll(),i=Dl({issueData:e,data:n.data,path:n.path,errorMaps:[n.common.contextualErrorMap,n.schemaErrorMap,t,t===Zs?void 0:Zs].filter(r=>!!r)});n.common.issues.push(i)}var Tn=class n{constructor(){this.value="valid"}dirty(){this.value==="valid"&&(this.value="dirty")}abort(){this.value!=="aborted"&&(this.value="aborted")}static mergeArray(e,t){let i=[];for(let r of t){if(r.status==="aborted")return nt;r.status==="dirty"&&e.dirty(),i.push(r.value)}return{status:e.value,value:i}}static async mergeObjectAsync(e,t){let i=[];for(let r of t){let s=await r.key,a=await r.value;i.push({key:s,value:a})}return n.mergeObjectSync(e,i)}static mergeObjectSync(e,t){let i={};for(let r of t){let{key:s,value:a}=r;if(s.status==="aborted"||a.status==="aborted")return nt;s.status==="dirty"&&e.dirty(),a.status==="dirty"&&e.dirty(),s.value!=="__proto__"&&(typeof a.value<"u"||r.alwaysSet)&&(i[s.value]=a.value)}return{status:e.value,value:i}}},nt=Object.freeze({status:"aborted"}),Ys=n=>({status:"dirty",value:n}),Pn=n=>({status:"valid",value:n}),dh=n=>n.status==="aborted",fh=n=>n.status==="dirty",ro=n=>n.status==="valid",so=n=>typeof Promise<"u"&&n instanceof Promise;function Ul(n,e,t,i){if(typeof e=="function"?n!==e||!i:!e.has(n))throw new TypeError("Cannot read private member from an object whose class did not declare it");return e.get(n)}function Sp(n,e,t,i,r){if(typeof e=="function"?n!==e||!r:!e.has(n))throw new TypeError("Cannot write private member to an object whose class did not declare it");return e.set(n,t),t}var Ze;(function(n){n.errToObj=e=>typeof e=="string"?{message:e}:e||{},n.toString=e=>typeof e=="string"?e:e?.message})(Ze||(Ze={}));var no,io,hi=class{constructor(e,t,i,r){this._cachedPath=[],this.parent=e,this.data=t,this._path=i,this._key=r}get path(){return this._cachedPath.length||(this._key instanceof Array?this._cachedPath.push(...this._path,...this._key):this._cachedPath.push(...this._path,this._key)),this._cachedPath}},xp=(n,e)=>{if(ro(e))return{success:!0,data:e.value};if(!n.common.issues.length)throw new Error("Validation failed but no issues detected.");return{success:!1,get error(){if(this._error)return this._error;let t=new Zn(n.common.issues);return this._error=t,this._error}}};function ct(n){if(!n)return{};let{errorMap:e,invalid_type_error:t,required_error:i,description:r}=n;if(e&&(t||i))throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);return e?{errorMap:e,description:r}:{errorMap:(a,o)=>{var c,l;let{message:u}=n;return a.code==="invalid_enum_value"?{message:u??o.defaultError}:typeof o.data>"u"?{message:(c=u??i)!==null&&c!==void 0?c:o.defaultError}:a.code!=="invalid_type"?{message:o.defaultError}:{message:(l=u??t)!==null&&l!==void 0?l:o.defaultError}},description:r}}var ut=class{constructor(e){this.spa=this.safeParseAsync,this._def=e,this.parse=this.parse.bind(this),this.safeParse=this.safeParse.bind(this),this.parseAsync=this.parseAsync.bind(this),this.safeParseAsync=this.safeParseAsync.bind(this),this.spa=this.spa.bind(this),this.refine=this.refine.bind(this),this.refinement=this.refinement.bind(this),this.superRefine=this.superRefine.bind(this),this.optional=this.optional.bind(this),this.nullable=this.nullable.bind(this),this.nullish=this.nullish.bind(this),this.array=this.array.bind(this),this.promise=this.promise.bind(this),this.or=this.or.bind(this),this.and=this.and.bind(this),this.transform=this.transform.bind(this),this.brand=this.brand.bind(this),this.default=this.default.bind(this),this.catch=this.catch.bind(this),this.describe=this.describe.bind(this),this.pipe=this.pipe.bind(this),this.readonly=this.readonly.bind(this),this.isNullable=this.isNullable.bind(this),this.isOptional=this.isOptional.bind(this)}get description(){return this._def.description}_getType(e){return wr(e.data)}_getOrReturnCtx(e,t){return t||{common:e.parent.common,data:e.data,parsedType:wr(e.data),schemaErrorMap:this._def.errorMap,path:e.path,parent:e.parent}}_processInputParams(e){return{status:new Tn,ctx:{common:e.parent.common,data:e.data,parsedType:wr(e.data),schemaErrorMap:this._def.errorMap,path:e.path,parent:e.parent}}}_parseSync(e){let t=this._parse(e);if(so(t))throw new Error("Synchronous parse encountered promise.");return t}_parseAsync(e){let t=this._parse(e);return Promise.resolve(t)}parse(e,t){let i=this.safeParse(e,t);if(i.success)return i.data;throw i.error}safeParse(e,t){var i;let r={common:{issues:[],async:(i=t?.async)!==null&&i!==void 0?i:!1,contextualErrorMap:t?.errorMap},path:t?.path||[],schemaErrorMap:this._def.errorMap,parent:null,data:e,parsedType:wr(e)},s=this._parseSync({data:e,path:r.path,parent:r});return xp(r,s)}async parseAsync(e,t){let i=await this.safeParseAsync(e,t);if(i.success)return i.data;throw i.error}async safeParseAsync(e,t){let i={common:{issues:[],contextualErrorMap:t?.errorMap,async:!0},path:t?.path||[],schemaErrorMap:this._def.errorMap,parent:null,data:e,parsedType:wr(e)},r=this._parse({data:e,path:i.path,parent:i}),s=await(so(r)?r:Promise.resolve(r));return xp(i,s)}refine(e,t){let i=r=>typeof t=="string"||typeof t>"u"?{message:t}:typeof t=="function"?t(r):t;return this._refinement((r,s)=>{let a=e(r),o=()=>s.addIssue({code:_e.custom,...i(r)});return typeof Promise<"u"&&a instanceof Promise?a.then(c=>c?!0:(o(),!1)):a?!0:(o(),!1)})}refinement(e,t){return this._refinement((i,r)=>e(i)?!0:(r.addIssue(typeof t=="function"?t(i,r):t),!1))}_refinement(e){return new Kn({schema:this,typeName:Je.ZodEffects,effect:{type:"refinement",refinement:e}})}superRefine(e){return this._refinement(e)}optional(){return ui.create(this,this._def)}nullable(){return Ui.create(this,this._def)}nullish(){return this.nullable().optional()}array(){return rr.create(this,this._def)}promise(){return Cr.create(this,this._def)}or(e){return rs.create([this,e],this._def)}and(e){return ss.create(this,e,this._def)}transform(e){return new Kn({...ct(this._def),schema:this,typeName:Je.ZodEffects,effect:{type:"transform",transform:e}})}default(e){let t=typeof e=="function"?e:()=>e;return new us({...ct(this._def),innerType:this,defaultValue:t,typeName:Je.ZodDefault})}brand(){return new ao({typeName:Je.ZodBranded,type:this,...ct(this._def)})}catch(e){let t=typeof e=="function"?e:()=>e;return new hs({...ct(this._def),innerType:this,catchValue:t,typeName:Je.ZodCatch})}describe(e){let t=this.constructor;return new t({...this._def,description:e})}pipe(e){return oo.create(this,e)}readonly(){return ds.create(this)}isOptional(){return this.safeParse(void 0).success}isNullable(){return this.safeParse(null).success}},q0=/^c[^\s-]{8,}$/i,Y0=/^[0-9a-z]+$/,Z0=/^[0-9A-HJKMNP-TV-Z]{26}$/,K0=/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,j0=/^[a-z0-9_-]{21}$/i,$0=/^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,J0=/^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,Q0="^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$",uh,ex=/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,tx=/^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,nx=/^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,bp="((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))",ix=new RegExp(`^${bp}$`);function Mp(n){let e="([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d";return n.precision?e=`${e}\\.\\d{${n.precision}}`:n.precision==null&&(e=`${e}(\\.\\d+)?`),e}function rx(n){return new RegExp(`^${Mp(n)}$`)}function Ep(n){let e=`${bp}T${Mp(n)}`,t=[];return t.push(n.local?"Z?":"Z"),n.offset&&t.push("([+-]\\d{2}:?\\d{2})"),e=`${e}(${t.join("|")})`,new RegExp(`^${e}$`)}function sx(n,e){return!!((e==="v4"||!e)&&ex.test(n)||(e==="v6"||!e)&&tx.test(n))}var Rr=class n extends ut{_parse(e){if(this._def.coerce&&(e.data=String(e.data)),this._getType(e)!==De.string){let s=this._getOrReturnCtx(e);return Pe(s,{code:_e.invalid_type,expected:De.string,received:s.parsedType}),nt}let i=new Tn,r;for(let s of this._def.checks)if(s.kind==="min")e.data.length<s.value&&(r=this._getOrReturnCtx(e,r),Pe(r,{code:_e.too_small,minimum:s.value,type:"string",inclusive:!0,exact:!1,message:s.message}),i.dirty());else if(s.kind==="max")e.data.length>s.value&&(r=this._getOrReturnCtx(e,r),Pe(r,{code:_e.too_big,maximum:s.value,type:"string",inclusive:!0,exact:!1,message:s.message}),i.dirty());else if(s.kind==="length"){let a=e.data.length>s.value,o=e.data.length<s.value;(a||o)&&(r=this._getOrReturnCtx(e,r),a?Pe(r,{code:_e.too_big,maximum:s.value,type:"string",inclusive:!0,exact:!0,message:s.message}):o&&Pe(r,{code:_e.too_small,minimum:s.value,type:"string",inclusive:!0,exact:!0,message:s.message}),i.dirty())}else if(s.kind==="email")J0.test(e.data)||(r=this._getOrReturnCtx(e,r),Pe(r,{validation:"email",code:_e.invalid_string,message:s.message}),i.dirty());else if(s.kind==="emoji")uh||(uh=new RegExp(Q0,"u")),uh.test(e.data)||(r=this._getOrReturnCtx(e,r),Pe(r,{validation:"emoji",code:_e.invalid_string,message:s.message}),i.dirty());else if(s.kind==="uuid")K0.test(e.data)||(r=this._getOrReturnCtx(e,r),Pe(r,{validation:"uuid",code:_e.invalid_string,message:s.message}),i.dirty());else if(s.kind==="nanoid")j0.test(e.data)||(r=this._getOrReturnCtx(e,r),Pe(r,{validation:"nanoid",code:_e.invalid_string,message:s.message}),i.dirty());else if(s.kind==="cuid")q0.test(e.data)||(r=this._getOrReturnCtx(e,r),Pe(r,{validation:"cuid",code:_e.invalid_string,message:s.message}),i.dirty());else if(s.kind==="cuid2")Y0.test(e.data)||(r=this._getOrReturnCtx(e,r),Pe(r,{validation:"cuid2",code:_e.invalid_string,message:s.message}),i.dirty());else if(s.kind==="ulid")Z0.test(e.data)||(r=this._getOrReturnCtx(e,r),Pe(r,{validation:"ulid",code:_e.invalid_string,message:s.message}),i.dirty());else if(s.kind==="url")try{new URL(e.data)}catch{r=this._getOrReturnCtx(e,r),Pe(r,{validation:"url",code:_e.invalid_string,message:s.message}),i.dirty()}else s.kind==="regex"?(s.regex.lastIndex=0,s.regex.test(e.data)||(r=this._getOrReturnCtx(e,r),Pe(r,{validation:"regex",code:_e.invalid_string,message:s.message}),i.dirty())):s.kind==="trim"?e.data=e.data.trim():s.kind==="includes"?e.data.includes(s.value,s.position)||(r=this._getOrReturnCtx(e,r),Pe(r,{code:_e.invalid_string,validation:{includes:s.value,position:s.position},message:s.message}),i.dirty()):s.kind==="toLowerCase"?e.data=e.data.toLowerCase():s.kind==="toUpperCase"?e.data=e.data.toUpperCase():s.kind==="startsWith"?e.data.startsWith(s.value)||(r=this._getOrReturnCtx(e,r),Pe(r,{code:_e.invalid_string,validation:{startsWith:s.value},message:s.message}),i.dirty()):s.kind==="endsWith"?e.data.endsWith(s.value)||(r=this._getOrReturnCtx(e,r),Pe(r,{code:_e.invalid_string,validation:{endsWith:s.value},message:s.message}),i.dirty()):s.kind==="datetime"?Ep(s).test(e.data)||(r=this._getOrReturnCtx(e,r),Pe(r,{code:_e.invalid_string,validation:"datetime",message:s.message}),i.dirty()):s.kind==="date"?ix.test(e.data)||(r=this._getOrReturnCtx(e,r),Pe(r,{code:_e.invalid_string,validation:"date",message:s.message}),i.dirty()):s.kind==="time"?rx(s).test(e.data)||(r=this._getOrReturnCtx(e,r),Pe(r,{code:_e.invalid_string,validation:"time",message:s.message}),i.dirty()):s.kind==="duration"?$0.test(e.data)||(r=this._getOrReturnCtx(e,r),Pe(r,{validation:"duration",code:_e.invalid_string,message:s.message}),i.dirty()):s.kind==="ip"?sx(e.data,s.version)||(r=this._getOrReturnCtx(e,r),Pe(r,{validation:"ip",code:_e.invalid_string,message:s.message}),i.dirty()):s.kind==="base64"?nx.test(e.data)||(r=this._getOrReturnCtx(e,r),Pe(r,{validation:"base64",code:_e.invalid_string,message:s.message}),i.dirty()):Tt.assertNever(s);return{status:i.value,value:e.data}}_regex(e,t,i){return this.refinement(r=>e.test(r),{validation:t,code:_e.invalid_string,...Ze.errToObj(i)})}_addCheck(e){return new n({...this._def,checks:[...this._def.checks,e]})}email(e){return this._addCheck({kind:"email",...Ze.errToObj(e)})}url(e){return this._addCheck({kind:"url",...Ze.errToObj(e)})}emoji(e){return this._addCheck({kind:"emoji",...Ze.errToObj(e)})}uuid(e){return this._addCheck({kind:"uuid",...Ze.errToObj(e)})}nanoid(e){return this._addCheck({kind:"nanoid",...Ze.errToObj(e)})}cuid(e){return this._addCheck({kind:"cuid",...Ze.errToObj(e)})}cuid2(e){return this._addCheck({kind:"cuid2",...Ze.errToObj(e)})}ulid(e){return this._addCheck({kind:"ulid",...Ze.errToObj(e)})}base64(e){return this._addCheck({kind:"base64",...Ze.errToObj(e)})}ip(e){return this._addCheck({kind:"ip",...Ze.errToObj(e)})}datetime(e){var t,i;return typeof e=="string"?this._addCheck({kind:"datetime",precision:null,offset:!1,local:!1,message:e}):this._addCheck({kind:"datetime",precision:typeof e?.precision>"u"?null:e?.precision,offset:(t=e?.offset)!==null&&t!==void 0?t:!1,local:(i=e?.local)!==null&&i!==void 0?i:!1,...Ze.errToObj(e?.message)})}date(e){return this._addCheck({kind:"date",message:e})}time(e){return typeof e=="string"?this._addCheck({kind:"time",precision:null,message:e}):this._addCheck({kind:"time",precision:typeof e?.precision>"u"?null:e?.precision,...Ze.errToObj(e?.message)})}duration(e){return this._addCheck({kind:"duration",...Ze.errToObj(e)})}regex(e,t){return this._addCheck({kind:"regex",regex:e,...Ze.errToObj(t)})}includes(e,t){return this._addCheck({kind:"includes",value:e,position:t?.position,...Ze.errToObj(t?.message)})}startsWith(e,t){return this._addCheck({kind:"startsWith",value:e,...Ze.errToObj(t)})}endsWith(e,t){return this._addCheck({kind:"endsWith",value:e,...Ze.errToObj(t)})}min(e,t){return this._addCheck({kind:"min",value:e,...Ze.errToObj(t)})}max(e,t){return this._addCheck({kind:"max",value:e,...Ze.errToObj(t)})}length(e,t){return this._addCheck({kind:"length",value:e,...Ze.errToObj(t)})}nonempty(e){return this.min(1,Ze.errToObj(e))}trim(){return new n({...this._def,checks:[...this._def.checks,{kind:"trim"}]})}toLowerCase(){return new n({...this._def,checks:[...this._def.checks,{kind:"toLowerCase"}]})}toUpperCase(){return new n({...this._def,checks:[...this._def.checks,{kind:"toUpperCase"}]})}get isDatetime(){return!!this._def.checks.find(e=>e.kind==="datetime")}get isDate(){return!!this._def.checks.find(e=>e.kind==="date")}get isTime(){return!!this._def.checks.find(e=>e.kind==="time")}get isDuration(){return!!this._def.checks.find(e=>e.kind==="duration")}get isEmail(){return!!this._def.checks.find(e=>e.kind==="email")}get isURL(){return!!this._def.checks.find(e=>e.kind==="url")}get isEmoji(){return!!this._def.checks.find(e=>e.kind==="emoji")}get isUUID(){return!!this._def.checks.find(e=>e.kind==="uuid")}get isNANOID(){return!!this._def.checks.find(e=>e.kind==="nanoid")}get isCUID(){return!!this._def.checks.find(e=>e.kind==="cuid")}get isCUID2(){return!!this._def.checks.find(e=>e.kind==="cuid2")}get isULID(){return!!this._def.checks.find(e=>e.kind==="ulid")}get isIP(){return!!this._def.checks.find(e=>e.kind==="ip")}get isBase64(){return!!this._def.checks.find(e=>e.kind==="base64")}get minLength(){let e=null;for(let t of this._def.checks)t.kind==="min"&&(e===null||t.value>e)&&(e=t.value);return e}get maxLength(){let e=null;for(let t of this._def.checks)t.kind==="max"&&(e===null||t.value<e)&&(e=t.value);return e}};Rr.create=n=>{var e;return new Rr({checks:[],typeName:Je.ZodString,coerce:(e=n?.coerce)!==null&&e!==void 0?e:!1,...ct(n)})};function ax(n,e){let t=(n.toString().split(".")[1]||"").length,i=(e.toString().split(".")[1]||"").length,r=t>i?t:i,s=parseInt(n.toFixed(r).replace(".","")),a=parseInt(e.toFixed(r).replace(".",""));return s%a/Math.pow(10,r)}var Jr=class n extends ut{constructor(){super(...arguments),this.min=this.gte,this.max=this.lte,this.step=this.multipleOf}_parse(e){if(this._def.coerce&&(e.data=Number(e.data)),this._getType(e)!==De.number){let s=this._getOrReturnCtx(e);return Pe(s,{code:_e.invalid_type,expected:De.number,received:s.parsedType}),nt}let i,r=new Tn;for(let s of this._def.checks)s.kind==="int"?Tt.isInteger(e.data)||(i=this._getOrReturnCtx(e,i),Pe(i,{code:_e.invalid_type,expected:"integer",received:"float",message:s.message}),r.dirty()):s.kind==="min"?(s.inclusive?e.data<s.value:e.data<=s.value)&&(i=this._getOrReturnCtx(e,i),Pe(i,{code:_e.too_small,minimum:s.value,type:"number",inclusive:s.inclusive,exact:!1,message:s.message}),r.dirty()):s.kind==="max"?(s.inclusive?e.data>s.value:e.data>=s.value)&&(i=this._getOrReturnCtx(e,i),Pe(i,{code:_e.too_big,maximum:s.value,type:"number",inclusive:s.inclusive,exact:!1,message:s.message}),r.dirty()):s.kind==="multipleOf"?ax(e.data,s.value)!==0&&(i=this._getOrReturnCtx(e,i),Pe(i,{code:_e.not_multiple_of,multipleOf:s.value,message:s.message}),r.dirty()):s.kind==="finite"?Number.isFinite(e.data)||(i=this._getOrReturnCtx(e,i),Pe(i,{code:_e.not_finite,message:s.message}),r.dirty()):Tt.assertNever(s);return{status:r.value,value:e.data}}gte(e,t){return this.setLimit("min",e,!0,Ze.toString(t))}gt(e,t){return this.setLimit("min",e,!1,Ze.toString(t))}lte(e,t){return this.setLimit("max",e,!0,Ze.toString(t))}lt(e,t){return this.setLimit("max",e,!1,Ze.toString(t))}setLimit(e,t,i,r){return new n({...this._def,checks:[...this._def.checks,{kind:e,value:t,inclusive:i,message:Ze.toString(r)}]})}_addCheck(e){return new n({...this._def,checks:[...this._def.checks,e]})}int(e){return this._addCheck({kind:"int",message:Ze.toString(e)})}positive(e){return this._addCheck({kind:"min",value:0,inclusive:!1,message:Ze.toString(e)})}negative(e){return this._addCheck({kind:"max",value:0,inclusive:!1,message:Ze.toString(e)})}nonpositive(e){return this._addCheck({kind:"max",value:0,inclusive:!0,message:Ze.toString(e)})}nonnegative(e){return this._addCheck({kind:"min",value:0,inclusive:!0,message:Ze.toString(e)})}multipleOf(e,t){return this._addCheck({kind:"multipleOf",value:e,message:Ze.toString(t)})}finite(e){return this._addCheck({kind:"finite",message:Ze.toString(e)})}safe(e){return this._addCheck({kind:"min",inclusive:!0,value:Number.MIN_SAFE_INTEGER,message:Ze.toString(e)})._addCheck({kind:"max",inclusive:!0,value:Number.MAX_SAFE_INTEGER,message:Ze.toString(e)})}get minValue(){let e=null;for(let t of this._def.checks)t.kind==="min"&&(e===null||t.value>e)&&(e=t.value);return e}get maxValue(){let e=null;for(let t of this._def.checks)t.kind==="max"&&(e===null||t.value<e)&&(e=t.value);return e}get isInt(){return!!this._def.checks.find(e=>e.kind==="int"||e.kind==="multipleOf"&&Tt.isInteger(e.value))}get isFinite(){let e=null,t=null;for(let i of this._def.checks){if(i.kind==="finite"||i.kind==="int"||i.kind==="multipleOf")return!0;i.kind==="min"?(t===null||i.value>t)&&(t=i.value):i.kind==="max"&&(e===null||i.value<e)&&(e=i.value)}return Number.isFinite(t)&&Number.isFinite(e)}};Jr.create=n=>new Jr({checks:[],typeName:Je.ZodNumber,coerce:n?.coerce||!1,...ct(n)});var Qr=class n extends ut{constructor(){super(...arguments),this.min=this.gte,this.max=this.lte}_parse(e){if(this._def.coerce&&(e.data=BigInt(e.data)),this._getType(e)!==De.bigint){let s=this._getOrReturnCtx(e);return Pe(s,{code:_e.invalid_type,expected:De.bigint,received:s.parsedType}),nt}let i,r=new Tn;for(let s of this._def.checks)s.kind==="min"?(s.inclusive?e.data<s.value:e.data<=s.value)&&(i=this._getOrReturnCtx(e,i),Pe(i,{code:_e.too_small,type:"bigint",minimum:s.value,inclusive:s.inclusive,message:s.message}),r.dirty()):s.kind==="max"?(s.inclusive?e.data>s.value:e.data>=s.value)&&(i=this._getOrReturnCtx(e,i),Pe(i,{code:_e.too_big,type:"bigint",maximum:s.value,inclusive:s.inclusive,message:s.message}),r.dirty()):s.kind==="multipleOf"?e.data%s.value!==BigInt(0)&&(i=this._getOrReturnCtx(e,i),Pe(i,{code:_e.not_multiple_of,multipleOf:s.value,message:s.message}),r.dirty()):Tt.assertNever(s);return{status:r.value,value:e.data}}gte(e,t){return this.setLimit("min",e,!0,Ze.toString(t))}gt(e,t){return this.setLimit("min",e,!1,Ze.toString(t))}lte(e,t){return this.setLimit("max",e,!0,Ze.toString(t))}lt(e,t){return this.setLimit("max",e,!1,Ze.toString(t))}setLimit(e,t,i,r){return new n({...this._def,checks:[...this._def.checks,{kind:e,value:t,inclusive:i,message:Ze.toString(r)}]})}_addCheck(e){return new n({...this._def,checks:[...this._def.checks,e]})}positive(e){return this._addCheck({kind:"min",value:BigInt(0),inclusive:!1,message:Ze.toString(e)})}negative(e){return this._addCheck({kind:"max",value:BigInt(0),inclusive:!1,message:Ze.toString(e)})}nonpositive(e){return this._addCheck({kind:"max",value:BigInt(0),inclusive:!0,message:Ze.toString(e)})}nonnegative(e){return this._addCheck({kind:"min",value:BigInt(0),inclusive:!0,message:Ze.toString(e)})}multipleOf(e,t){return this._addCheck({kind:"multipleOf",value:e,message:Ze.toString(t)})}get minValue(){let e=null;for(let t of this._def.checks)t.kind==="min"&&(e===null||t.value>e)&&(e=t.value);return e}get maxValue(){let e=null;for(let t of this._def.checks)t.kind==="max"&&(e===null||t.value<e)&&(e=t.value);return e}};Qr.create=n=>{var e;return new Qr({checks:[],typeName:Je.ZodBigInt,coerce:(e=n?.coerce)!==null&&e!==void 0?e:!1,...ct(n)})};var es=class extends ut{_parse(e){if(this._def.coerce&&(e.data=!!e.data),this._getType(e)!==De.boolean){let i=this._getOrReturnCtx(e);return Pe(i,{code:_e.invalid_type,expected:De.boolean,received:i.parsedType}),nt}return Pn(e.data)}};es.create=n=>new es({typeName:Je.ZodBoolean,coerce:n?.coerce||!1,...ct(n)});var ts=class n extends ut{_parse(e){if(this._def.coerce&&(e.data=new Date(e.data)),this._getType(e)!==De.date){let s=this._getOrReturnCtx(e);return Pe(s,{code:_e.invalid_type,expected:De.date,received:s.parsedType}),nt}if(isNaN(e.data.getTime())){let s=this._getOrReturnCtx(e);return Pe(s,{code:_e.invalid_date}),nt}let i=new Tn,r;for(let s of this._def.checks)s.kind==="min"?e.data.getTime()<s.value&&(r=this._getOrReturnCtx(e,r),Pe(r,{code:_e.too_small,message:s.message,inclusive:!0,exact:!1,minimum:s.value,type:"date"}),i.dirty()):s.kind==="max"?e.data.getTime()>s.value&&(r=this._getOrReturnCtx(e,r),Pe(r,{code:_e.too_big,message:s.message,inclusive:!0,exact:!1,maximum:s.value,type:"date"}),i.dirty()):Tt.assertNever(s);return{status:i.value,value:new Date(e.data.getTime())}}_addCheck(e){return new n({...this._def,checks:[...this._def.checks,e]})}min(e,t){return this._addCheck({kind:"min",value:e.getTime(),message:Ze.toString(t)})}max(e,t){return this._addCheck({kind:"max",value:e.getTime(),message:Ze.toString(t)})}get minDate(){let e=null;for(let t of this._def.checks)t.kind==="min"&&(e===null||t.value>e)&&(e=t.value);return e!=null?new Date(e):null}get maxDate(){let e=null;for(let t of this._def.checks)t.kind==="max"&&(e===null||t.value<e)&&(e=t.value);return e!=null?new Date(e):null}};ts.create=n=>new ts({checks:[],coerce:n?.coerce||!1,typeName:Je.ZodDate,...ct(n)});var Ks=class extends ut{_parse(e){if(this._getType(e)!==De.symbol){let i=this._getOrReturnCtx(e);return Pe(i,{code:_e.invalid_type,expected:De.symbol,received:i.parsedType}),nt}return Pn(e.data)}};Ks.create=n=>new Ks({typeName:Je.ZodSymbol,...ct(n)});var ns=class extends ut{_parse(e){if(this._getType(e)!==De.undefined){let i=this._getOrReturnCtx(e);return Pe(i,{code:_e.invalid_type,expected:De.undefined,received:i.parsedType}),nt}return Pn(e.data)}};ns.create=n=>new ns({typeName:Je.ZodUndefined,...ct(n)});var is=class extends ut{_parse(e){if(this._getType(e)!==De.null){let i=this._getOrReturnCtx(e);return Pe(i,{code:_e.invalid_type,expected:De.null,received:i.parsedType}),nt}return Pn(e.data)}};is.create=n=>new is({typeName:Je.ZodNull,...ct(n)});var Ir=class extends ut{constructor(){super(...arguments),this._any=!0}_parse(e){return Pn(e.data)}};Ir.create=n=>new Ir({typeName:Je.ZodAny,...ct(n)});var ir=class extends ut{constructor(){super(...arguments),this._unknown=!0}_parse(e){return Pn(e.data)}};ir.create=n=>new ir({typeName:Je.ZodUnknown,...ct(n)});var xi=class extends ut{_parse(e){let t=this._getOrReturnCtx(e);return Pe(t,{code:_e.invalid_type,expected:De.never,received:t.parsedType}),nt}};xi.create=n=>new xi({typeName:Je.ZodNever,...ct(n)});var js=class extends ut{_parse(e){if(this._getType(e)!==De.undefined){let i=this._getOrReturnCtx(e);return Pe(i,{code:_e.invalid_type,expected:De.void,received:i.parsedType}),nt}return Pn(e.data)}};js.create=n=>new js({typeName:Je.ZodVoid,...ct(n)});var rr=class n extends ut{_parse(e){let{ctx:t,status:i}=this._processInputParams(e),r=this._def;if(t.parsedType!==De.array)return Pe(t,{code:_e.invalid_type,expected:De.array,received:t.parsedType}),nt;if(r.exactLength!==null){let a=t.data.length>r.exactLength.value,o=t.data.length<r.exactLength.value;(a||o)&&(Pe(t,{code:a?_e.too_big:_e.too_small,minimum:o?r.exactLength.value:void 0,maximum:a?r.exactLength.value:void 0,type:"array",inclusive:!0,exact:!0,message:r.exactLength.message}),i.dirty())}if(r.minLength!==null&&t.data.length<r.minLength.value&&(Pe(t,{code:_e.too_small,minimum:r.minLength.value,type:"array",inclusive:!0,exact:!1,message:r.minLength.message}),i.dirty()),r.maxLength!==null&&t.data.length>r.maxLength.value&&(Pe(t,{code:_e.too_big,maximum:r.maxLength.value,type:"array",inclusive:!0,exact:!1,message:r.maxLength.message}),i.dirty()),t.common.async)return Promise.all([...t.data].map((a,o)=>r.type._parseAsync(new hi(t,a,t.path,o)))).then(a=>Tn.mergeArray(i,a));let s=[...t.data].map((a,o)=>r.type._parseSync(new hi(t,a,t.path,o)));return Tn.mergeArray(i,s)}get element(){return this._def.type}min(e,t){return new n({...this._def,minLength:{value:e,message:Ze.toString(t)}})}max(e,t){return new n({...this._def,maxLength:{value:e,message:Ze.toString(t)}})}length(e,t){return new n({...this._def,exactLength:{value:e,message:Ze.toString(t)}})}nonempty(e){return this.min(1,e)}};rr.create=(n,e)=>new rr({type:n,minLength:null,maxLength:null,exactLength:null,typeName:Je.ZodArray,...ct(e)});function qs(n){if(n instanceof kn){let e={};for(let t in n.shape){let i=n.shape[t];e[t]=ui.create(qs(i))}return new kn({...n._def,shape:()=>e})}else return n instanceof rr?new rr({...n._def,type:qs(n.element)}):n instanceof ui?ui.create(qs(n.unwrap())):n instanceof Ui?Ui.create(qs(n.unwrap())):n instanceof Di?Di.create(n.items.map(e=>qs(e))):n}var kn=class n extends ut{constructor(){super(...arguments),this._cached=null,this.nonstrict=this.passthrough,this.augment=this.extend}_getCached(){if(this._cached!==null)return this._cached;let e=this._def.shape(),t=Tt.objectKeys(e);return this._cached={shape:e,keys:t}}_parse(e){if(this._getType(e)!==De.object){let l=this._getOrReturnCtx(e);return Pe(l,{code:_e.invalid_type,expected:De.object,received:l.parsedType}),nt}let{status:i,ctx:r}=this._processInputParams(e),{shape:s,keys:a}=this._getCached(),o=[];if(!(this._def.catchall instanceof xi&&this._def.unknownKeys==="strip"))for(let l in r.data)a.includes(l)||o.push(l);let c=[];for(let l of a){let u=s[l],h=r.data[l];c.push({key:{status:"valid",value:l},value:u._parse(new hi(r,h,r.path,l)),alwaysSet:l in r.data})}if(this._def.catchall instanceof xi){let l=this._def.unknownKeys;if(l==="passthrough")for(let u of o)c.push({key:{status:"valid",value:u},value:{status:"valid",value:r.data[u]}});else if(l==="strict")o.length>0&&(Pe(r,{code:_e.unrecognized_keys,keys:o}),i.dirty());else if(l!=="strip")throw new Error("Internal ZodObject error: invalid unknownKeys value.")}else{let l=this._def.catchall;for(let u of o){let h=r.data[u];c.push({key:{status:"valid",value:u},value:l._parse(new hi(r,h,r.path,u)),alwaysSet:u in r.data})}}return r.common.async?Promise.resolve().then(async()=>{let l=[];for(let u of c){let h=await u.key,d=await u.value;l.push({key:h,value:d,alwaysSet:u.alwaysSet})}return l}).then(l=>Tn.mergeObjectSync(i,l)):Tn.mergeObjectSync(i,c)}get shape(){return this._def.shape()}strict(e){return Ze.errToObj,new n({...this._def,unknownKeys:"strict",...e!==void 0?{errorMap:(t,i)=>{var r,s,a,o;let c=(a=(s=(r=this._def).errorMap)===null||s===void 0?void 0:s.call(r,t,i).message)!==null&&a!==void 0?a:i.defaultError;return t.code==="unrecognized_keys"?{message:(o=Ze.errToObj(e).message)!==null&&o!==void 0?o:c}:{message:c}}}:{}})}strip(){return new n({...this._def,unknownKeys:"strip"})}passthrough(){return new n({...this._def,unknownKeys:"passthrough"})}extend(e){return new n({...this._def,shape:()=>({...this._def.shape(),...e})})}merge(e){return new n({unknownKeys:e._def.unknownKeys,catchall:e._def.catchall,shape:()=>({...this._def.shape(),...e._def.shape()}),typeName:Je.ZodObject})}setKey(e,t){return this.augment({[e]:t})}catchall(e){return new n({...this._def,catchall:e})}pick(e){let t={};return Tt.objectKeys(e).forEach(i=>{e[i]&&this.shape[i]&&(t[i]=this.shape[i])}),new n({...this._def,shape:()=>t})}omit(e){let t={};return Tt.objectKeys(this.shape).forEach(i=>{e[i]||(t[i]=this.shape[i])}),new n({...this._def,shape:()=>t})}deepPartial(){return qs(this)}partial(e){let t={};return Tt.objectKeys(this.shape).forEach(i=>{let r=this.shape[i];e&&!e[i]?t[i]=r:t[i]=r.optional()}),new n({...this._def,shape:()=>t})}required(e){let t={};return Tt.objectKeys(this.shape).forEach(i=>{if(e&&!e[i])t[i]=this.shape[i];else{let s=this.shape[i];for(;s instanceof ui;)s=s._def.innerType;t[i]=s}}),new n({...this._def,shape:()=>t})}keyof(){return Tp(Tt.objectKeys(this.shape))}};kn.create=(n,e)=>new kn({shape:()=>n,unknownKeys:"strip",catchall:xi.create(),typeName:Je.ZodObject,...ct(e)});kn.strictCreate=(n,e)=>new kn({shape:()=>n,unknownKeys:"strict",catchall:xi.create(),typeName:Je.ZodObject,...ct(e)});kn.lazycreate=(n,e)=>new kn({shape:n,unknownKeys:"strip",catchall:xi.create(),typeName:Je.ZodObject,...ct(e)});var rs=class extends ut{_parse(e){let{ctx:t}=this._processInputParams(e),i=this._def.options;function r(s){for(let o of s)if(o.result.status==="valid")return o.result;for(let o of s)if(o.result.status==="dirty")return t.common.issues.push(...o.ctx.common.issues),o.result;let a=s.map(o=>new Zn(o.ctx.common.issues));return Pe(t,{code:_e.invalid_union,unionErrors:a}),nt}if(t.common.async)return Promise.all(i.map(async s=>{let a={...t,common:{...t.common,issues:[]},parent:null};return{result:await s._parseAsync({data:t.data,path:t.path,parent:a}),ctx:a}})).then(r);{let s,a=[];for(let c of i){let l={...t,common:{...t.common,issues:[]},parent:null},u=c._parseSync({data:t.data,path:t.path,parent:l});if(u.status==="valid")return u;u.status==="dirty"&&!s&&(s={result:u,ctx:l}),l.common.issues.length&&a.push(l.common.issues)}if(s)return t.common.issues.push(...s.ctx.common.issues),s.result;let o=a.map(c=>new Zn(c));return Pe(t,{code:_e.invalid_union,unionErrors:o}),nt}}get options(){return this._def.options}};rs.create=(n,e)=>new rs({options:n,typeName:Je.ZodUnion,...ct(e)});var nr=n=>n instanceof as?nr(n.schema):n instanceof Kn?nr(n.innerType()):n instanceof os?[n.value]:n instanceof ls?n.options:n instanceof cs?Tt.objectValues(n.enum):n instanceof us?nr(n._def.innerType):n instanceof ns?[void 0]:n instanceof is?[null]:n instanceof ui?[void 0,...nr(n.unwrap())]:n instanceof Ui?[null,...nr(n.unwrap())]:n instanceof ao||n instanceof ds?nr(n.unwrap()):n instanceof hs?nr(n._def.innerType):[],Ol=class n extends ut{_parse(e){let{ctx:t}=this._processInputParams(e);if(t.parsedType!==De.object)return Pe(t,{code:_e.invalid_type,expected:De.object,received:t.parsedType}),nt;let i=this.discriminator,r=t.data[i],s=this.optionsMap.get(r);return s?t.common.async?s._parseAsync({data:t.data,path:t.path,parent:t}):s._parseSync({data:t.data,path:t.path,parent:t}):(Pe(t,{code:_e.invalid_union_discriminator,options:Array.from(this.optionsMap.keys()),path:[i]}),nt)}get discriminator(){return this._def.discriminator}get options(){return this._def.options}get optionsMap(){return this._def.optionsMap}static create(e,t,i){let r=new Map;for(let s of t){let a=nr(s.shape[e]);if(!a.length)throw new Error(`A discriminator value for key \`${e}\` could not be extracted from all schema options`);for(let o of a){if(r.has(o))throw new Error(`Discriminator property ${String(e)} has duplicate value ${String(o)}`);r.set(o,s)}}return new n({typeName:Je.ZodDiscriminatedUnion,discriminator:e,options:t,optionsMap:r,...ct(i)})}};function ph(n,e){let t=wr(n),i=wr(e);if(n===e)return{valid:!0,data:n};if(t===De.object&&i===De.object){let r=Tt.objectKeys(e),s=Tt.objectKeys(n).filter(o=>r.indexOf(o)!==-1),a={...n,...e};for(let o of s){let c=ph(n[o],e[o]);if(!c.valid)return{valid:!1};a[o]=c.data}return{valid:!0,data:a}}else if(t===De.array&&i===De.array){if(n.length!==e.length)return{valid:!1};let r=[];for(let s=0;s<n.length;s++){let a=n[s],o=e[s],c=ph(a,o);if(!c.valid)return{valid:!1};r.push(c.data)}return{valid:!0,data:r}}else return t===De.date&&i===De.date&&+n==+e?{valid:!0,data:n}:{valid:!1}}var ss=class extends ut{_parse(e){let{status:t,ctx:i}=this._processInputParams(e),r=(s,a)=>{if(dh(s)||dh(a))return nt;let o=ph(s.value,a.value);return o.valid?((fh(s)||fh(a))&&t.dirty(),{status:t.value,value:o.data}):(Pe(i,{code:_e.invalid_intersection_types}),nt)};return i.common.async?Promise.all([this._def.left._parseAsync({data:i.data,path:i.path,parent:i}),this._def.right._parseAsync({data:i.data,path:i.path,parent:i})]).then(([s,a])=>r(s,a)):r(this._def.left._parseSync({data:i.data,path:i.path,parent:i}),this._def.right._parseSync({data:i.data,path:i.path,parent:i}))}};ss.create=(n,e,t)=>new ss({left:n,right:e,typeName:Je.ZodIntersection,...ct(t)});var Di=class n extends ut{_parse(e){let{status:t,ctx:i}=this._processInputParams(e);if(i.parsedType!==De.array)return Pe(i,{code:_e.invalid_type,expected:De.array,received:i.parsedType}),nt;if(i.data.length<this._def.items.length)return Pe(i,{code:_e.too_small,minimum:this._def.items.length,inclusive:!0,exact:!1,type:"array"}),nt;!this._def.rest&&i.data.length>this._def.items.length&&(Pe(i,{code:_e.too_big,maximum:this._def.items.length,inclusive:!0,exact:!1,type:"array"}),t.dirty());let s=[...i.data].map((a,o)=>{let c=this._def.items[o]||this._def.rest;return c?c._parse(new hi(i,a,i.path,o)):null}).filter(a=>!!a);return i.common.async?Promise.all(s).then(a=>Tn.mergeArray(t,a)):Tn.mergeArray(t,s)}get items(){return this._def.items}rest(e){return new n({...this._def,rest:e})}};Di.create=(n,e)=>{if(!Array.isArray(n))throw new Error("You must pass an array of schemas to z.tuple([ ... ])");return new Di({items:n,typeName:Je.ZodTuple,rest:null,...ct(e)})};var Fl=class n extends ut{get keySchema(){return this._def.keyType}get valueSchema(){return this._def.valueType}_parse(e){let{status:t,ctx:i}=this._processInputParams(e);if(i.parsedType!==De.object)return Pe(i,{code:_e.invalid_type,expected:De.object,received:i.parsedType}),nt;let r=[],s=this._def.keyType,a=this._def.valueType;for(let o in i.data)r.push({key:s._parse(new hi(i,o,i.path,o)),value:a._parse(new hi(i,i.data[o],i.path,o)),alwaysSet:o in i.data});return i.common.async?Tn.mergeObjectAsync(t,r):Tn.mergeObjectSync(t,r)}get element(){return this._def.valueType}static create(e,t,i){return t instanceof ut?new n({keyType:e,valueType:t,typeName:Je.ZodRecord,...ct(i)}):new n({keyType:Rr.create(),valueType:e,typeName:Je.ZodRecord,...ct(t)})}},$s=class extends ut{get keySchema(){return this._def.keyType}get valueSchema(){return this._def.valueType}_parse(e){let{status:t,ctx:i}=this._processInputParams(e);if(i.parsedType!==De.map)return Pe(i,{code:_e.invalid_type,expected:De.map,received:i.parsedType}),nt;let r=this._def.keyType,s=this._def.valueType,a=[...i.data.entries()].map(([o,c],l)=>({key:r._parse(new hi(i,o,i.path,[l,"key"])),value:s._parse(new hi(i,c,i.path,[l,"value"]))}));if(i.common.async){let o=new Map;return Promise.resolve().then(async()=>{for(let c of a){let l=await c.key,u=await c.value;if(l.status==="aborted"||u.status==="aborted")return nt;(l.status==="dirty"||u.status==="dirty")&&t.dirty(),o.set(l.value,u.value)}return{status:t.value,value:o}})}else{let o=new Map;for(let c of a){let l=c.key,u=c.value;if(l.status==="aborted"||u.status==="aborted")return nt;(l.status==="dirty"||u.status==="dirty")&&t.dirty(),o.set(l.value,u.value)}return{status:t.value,value:o}}}};$s.create=(n,e,t)=>new $s({valueType:e,keyType:n,typeName:Je.ZodMap,...ct(t)});var Js=class n extends ut{_parse(e){let{status:t,ctx:i}=this._processInputParams(e);if(i.parsedType!==De.set)return Pe(i,{code:_e.invalid_type,expected:De.set,received:i.parsedType}),nt;let r=this._def;r.minSize!==null&&i.data.size<r.minSize.value&&(Pe(i,{code:_e.too_small,minimum:r.minSize.value,type:"set",inclusive:!0,exact:!1,message:r.minSize.message}),t.dirty()),r.maxSize!==null&&i.data.size>r.maxSize.value&&(Pe(i,{code:_e.too_big,maximum:r.maxSize.value,type:"set",inclusive:!0,exact:!1,message:r.maxSize.message}),t.dirty());let s=this._def.valueType;function a(c){let l=new Set;for(let u of c){if(u.status==="aborted")return nt;u.status==="dirty"&&t.dirty(),l.add(u.value)}return{status:t.value,value:l}}let o=[...i.data.values()].map((c,l)=>s._parse(new hi(i,c,i.path,l)));return i.common.async?Promise.all(o).then(c=>a(c)):a(o)}min(e,t){return new n({...this._def,minSize:{value:e,message:Ze.toString(t)}})}max(e,t){return new n({...this._def,maxSize:{value:e,message:Ze.toString(t)}})}size(e,t){return this.min(e,t).max(e,t)}nonempty(e){return this.min(1,e)}};Js.create=(n,e)=>new Js({valueType:n,minSize:null,maxSize:null,typeName:Je.ZodSet,...ct(e)});var Bl=class n extends ut{constructor(){super(...arguments),this.validate=this.implement}_parse(e){let{ctx:t}=this._processInputParams(e);if(t.parsedType!==De.function)return Pe(t,{code:_e.invalid_type,expected:De.function,received:t.parsedType}),nt;function i(o,c){return Dl({data:o,path:t.path,errorMaps:[t.common.contextualErrorMap,t.schemaErrorMap,Ll(),Zs].filter(l=>!!l),issueData:{code:_e.invalid_arguments,argumentsError:c}})}function r(o,c){return Dl({data:o,path:t.path,errorMaps:[t.common.contextualErrorMap,t.schemaErrorMap,Ll(),Zs].filter(l=>!!l),issueData:{code:_e.invalid_return_type,returnTypeError:c}})}let s={errorMap:t.common.contextualErrorMap},a=t.data;if(this._def.returns instanceof Cr){let o=this;return Pn(async function(...c){let l=new Zn([]),u=await o._def.args.parseAsync(c,s).catch(m=>{throw l.addIssue(i(c,m)),l}),h=await Reflect.apply(a,this,u);return await o._def.returns._def.type.parseAsync(h,s).catch(m=>{throw l.addIssue(r(h,m)),l})})}else{let o=this;return Pn(function(...c){let l=o._def.args.safeParse(c,s);if(!l.success)throw new Zn([i(c,l.error)]);let u=Reflect.apply(a,this,l.data),h=o._def.returns.safeParse(u,s);if(!h.success)throw new Zn([r(u,h.error)]);return h.data})}}parameters(){return this._def.args}returnType(){return this._def.returns}args(...e){return new n({...this._def,args:Di.create(e).rest(ir.create())})}returns(e){return new n({...this._def,returns:e})}implement(e){return this.parse(e)}strictImplement(e){return this.parse(e)}static create(e,t,i){return new n({args:e||Di.create([]).rest(ir.create()),returns:t||ir.create(),typeName:Je.ZodFunction,...ct(i)})}},as=class extends ut{get schema(){return this._def.getter()}_parse(e){let{ctx:t}=this._processInputParams(e);return this._def.getter()._parse({data:t.data,path:t.path,parent:t})}};as.create=(n,e)=>new as({getter:n,typeName:Je.ZodLazy,...ct(e)});var os=class extends ut{_parse(e){if(e.data!==this._def.value){let t=this._getOrReturnCtx(e);return Pe(t,{received:t.data,code:_e.invalid_literal,expected:this._def.value}),nt}return{status:"valid",value:e.data}}get value(){return this._def.value}};os.create=(n,e)=>new os({value:n,typeName:Je.ZodLiteral,...ct(e)});function Tp(n,e){return new ls({values:n,typeName:Je.ZodEnum,...ct(e)})}var ls=class n extends ut{constructor(){super(...arguments),no.set(this,void 0)}_parse(e){if(typeof e.data!="string"){let t=this._getOrReturnCtx(e),i=this._def.values;return Pe(t,{expected:Tt.joinValues(i),received:t.parsedType,code:_e.invalid_type}),nt}if(Ul(this,no)||Sp(this,no,new Set(this._def.values)),!Ul(this,no).has(e.data)){let t=this._getOrReturnCtx(e),i=this._def.values;return Pe(t,{received:t.data,code:_e.invalid_enum_value,options:i}),nt}return Pn(e.data)}get options(){return this._def.values}get enum(){let e={};for(let t of this._def.values)e[t]=t;return e}get Values(){let e={};for(let t of this._def.values)e[t]=t;return e}get Enum(){let e={};for(let t of this._def.values)e[t]=t;return e}extract(e,t=this._def){return n.create(e,{...this._def,...t})}exclude(e,t=this._def){return n.create(this.options.filter(i=>!e.includes(i)),{...this._def,...t})}};no=new WeakMap;ls.create=Tp;var cs=class extends ut{constructor(){super(...arguments),io.set(this,void 0)}_parse(e){let t=Tt.getValidEnumValues(this._def.values),i=this._getOrReturnCtx(e);if(i.parsedType!==De.string&&i.parsedType!==De.number){let r=Tt.objectValues(t);return Pe(i,{expected:Tt.joinValues(r),received:i.parsedType,code:_e.invalid_type}),nt}if(Ul(this,io)||Sp(this,io,new Set(Tt.getValidEnumValues(this._def.values))),!Ul(this,io).has(e.data)){let r=Tt.objectValues(t);return Pe(i,{received:i.data,code:_e.invalid_enum_value,options:r}),nt}return Pn(e.data)}get enum(){return this._def.values}};io=new WeakMap;cs.create=(n,e)=>new cs({values:n,typeName:Je.ZodNativeEnum,...ct(e)});var Cr=class extends ut{unwrap(){return this._def.type}_parse(e){let{ctx:t}=this._processInputParams(e);if(t.parsedType!==De.promise&&t.common.async===!1)return Pe(t,{code:_e.invalid_type,expected:De.promise,received:t.parsedType}),nt;let i=t.parsedType===De.promise?t.data:Promise.resolve(t.data);return Pn(i.then(r=>this._def.type.parseAsync(r,{path:t.path,errorMap:t.common.contextualErrorMap})))}};Cr.create=(n,e)=>new Cr({type:n,typeName:Je.ZodPromise,...ct(e)});var Kn=class extends ut{innerType(){return this._def.schema}sourceType(){return this._def.schema._def.typeName===Je.ZodEffects?this._def.schema.sourceType():this._def.schema}_parse(e){let{status:t,ctx:i}=this._processInputParams(e),r=this._def.effect||null,s={addIssue:a=>{Pe(i,a),a.fatal?t.abort():t.dirty()},get path(){return i.path}};if(s.addIssue=s.addIssue.bind(s),r.type==="preprocess"){let a=r.transform(i.data,s);if(i.common.async)return Promise.resolve(a).then(async o=>{if(t.value==="aborted")return nt;let c=await this._def.schema._parseAsync({data:o,path:i.path,parent:i});return c.status==="aborted"?nt:c.status==="dirty"||t.value==="dirty"?Ys(c.value):c});{if(t.value==="aborted")return nt;let o=this._def.schema._parseSync({data:a,path:i.path,parent:i});return o.status==="aborted"?nt:o.status==="dirty"||t.value==="dirty"?Ys(o.value):o}}if(r.type==="refinement"){let a=o=>{let c=r.refinement(o,s);if(i.common.async)return Promise.resolve(c);if(c instanceof Promise)throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");return o};if(i.common.async===!1){let o=this._def.schema._parseSync({data:i.data,path:i.path,parent:i});return o.status==="aborted"?nt:(o.status==="dirty"&&t.dirty(),a(o.value),{status:t.value,value:o.value})}else return this._def.schema._parseAsync({data:i.data,path:i.path,parent:i}).then(o=>o.status==="aborted"?nt:(o.status==="dirty"&&t.dirty(),a(o.value).then(()=>({status:t.value,value:o.value}))))}if(r.type==="transform")if(i.common.async===!1){let a=this._def.schema._parseSync({data:i.data,path:i.path,parent:i});if(!ro(a))return a;let o=r.transform(a.value,s);if(o instanceof Promise)throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");return{status:t.value,value:o}}else return this._def.schema._parseAsync({data:i.data,path:i.path,parent:i}).then(a=>ro(a)?Promise.resolve(r.transform(a.value,s)).then(o=>({status:t.value,value:o})):a);Tt.assertNever(r)}};Kn.create=(n,e,t)=>new Kn({schema:n,typeName:Je.ZodEffects,effect:e,...ct(t)});Kn.createWithPreprocess=(n,e,t)=>new Kn({schema:e,effect:{type:"preprocess",transform:n},typeName:Je.ZodEffects,...ct(t)});var ui=class extends ut{_parse(e){return this._getType(e)===De.undefined?Pn(void 0):this._def.innerType._parse(e)}unwrap(){return this._def.innerType}};ui.create=(n,e)=>new ui({innerType:n,typeName:Je.ZodOptional,...ct(e)});var Ui=class extends ut{_parse(e){return this._getType(e)===De.null?Pn(null):this._def.innerType._parse(e)}unwrap(){return this._def.innerType}};Ui.create=(n,e)=>new Ui({innerType:n,typeName:Je.ZodNullable,...ct(e)});var us=class extends ut{_parse(e){let{ctx:t}=this._processInputParams(e),i=t.data;return t.parsedType===De.undefined&&(i=this._def.defaultValue()),this._def.innerType._parse({data:i,path:t.path,parent:t})}removeDefault(){return this._def.innerType}};us.create=(n,e)=>new us({innerType:n,typeName:Je.ZodDefault,defaultValue:typeof e.default=="function"?e.default:()=>e.default,...ct(e)});var hs=class extends ut{_parse(e){let{ctx:t}=this._processInputParams(e),i={...t,common:{...t.common,issues:[]}},r=this._def.innerType._parse({data:i.data,path:i.path,parent:{...i}});return so(r)?r.then(s=>({status:"valid",value:s.status==="valid"?s.value:this._def.catchValue({get error(){return new Zn(i.common.issues)},input:i.data})})):{status:"valid",value:r.status==="valid"?r.value:this._def.catchValue({get error(){return new Zn(i.common.issues)},input:i.data})}}removeCatch(){return this._def.innerType}};hs.create=(n,e)=>new hs({innerType:n,typeName:Je.ZodCatch,catchValue:typeof e.catch=="function"?e.catch:()=>e.catch,...ct(e)});var Qs=class extends ut{_parse(e){if(this._getType(e)!==De.nan){let i=this._getOrReturnCtx(e);return Pe(i,{code:_e.invalid_type,expected:De.nan,received:i.parsedType}),nt}return{status:"valid",value:e.data}}};Qs.create=n=>new Qs({typeName:Je.ZodNaN,...ct(n)});var ox=Symbol("zod_brand"),ao=class extends ut{_parse(e){let{ctx:t}=this._processInputParams(e),i=t.data;return this._def.type._parse({data:i,path:t.path,parent:t})}unwrap(){return this._def.type}},oo=class n extends ut{_parse(e){let{status:t,ctx:i}=this._processInputParams(e);if(i.common.async)return(async()=>{let s=await this._def.in._parseAsync({data:i.data,path:i.path,parent:i});return s.status==="aborted"?nt:s.status==="dirty"?(t.dirty(),Ys(s.value)):this._def.out._parseAsync({data:s.value,path:i.path,parent:i})})();{let r=this._def.in._parseSync({data:i.data,path:i.path,parent:i});return r.status==="aborted"?nt:r.status==="dirty"?(t.dirty(),{status:"dirty",value:r.value}):this._def.out._parseSync({data:r.value,path:i.path,parent:i})}}static create(e,t){return new n({in:e,out:t,typeName:Je.ZodPipeline})}},ds=class extends ut{_parse(e){let t=this._def.innerType._parse(e),i=r=>(ro(r)&&(r.value=Object.freeze(r.value)),r);return so(t)?t.then(r=>i(r)):i(t)}unwrap(){return this._def.innerType}};ds.create=(n,e)=>new ds({innerType:n,typeName:Je.ZodReadonly,...ct(e)});function kl(n,e={},t){return n?Ir.create().superRefine((i,r)=>{var s,a;if(!n(i)){let o=typeof e=="function"?e(i):typeof e=="string"?{message:e}:e,c=(a=(s=o.fatal)!==null&&s!==void 0?s:t)!==null&&a!==void 0?a:!0,l=typeof o=="string"?{message:o}:o;r.addIssue({code:"custom",...l,fatal:c})}}):Ir.create()}var lx={object:kn.lazycreate},Je;(function(n){n.ZodString="ZodString",n.ZodNumber="ZodNumber",n.ZodNaN="ZodNaN",n.ZodBigInt="ZodBigInt",n.ZodBoolean="ZodBoolean",n.ZodDate="ZodDate",n.ZodSymbol="ZodSymbol",n.ZodUndefined="ZodUndefined",n.ZodNull="ZodNull",n.ZodAny="ZodAny",n.ZodUnknown="ZodUnknown",n.ZodNever="ZodNever",n.ZodVoid="ZodVoid",n.ZodArray="ZodArray",n.ZodObject="ZodObject",n.ZodUnion="ZodUnion",n.ZodDiscriminatedUnion="ZodDiscriminatedUnion",n.ZodIntersection="ZodIntersection",n.ZodTuple="ZodTuple",n.ZodRecord="ZodRecord",n.ZodMap="ZodMap",n.ZodSet="ZodSet",n.ZodFunction="ZodFunction",n.ZodLazy="ZodLazy",n.ZodLiteral="ZodLiteral",n.ZodEnum="ZodEnum",n.ZodEffects="ZodEffects",n.ZodNativeEnum="ZodNativeEnum",n.ZodOptional="ZodOptional",n.ZodNullable="ZodNullable",n.ZodDefault="ZodDefault",n.ZodCatch="ZodCatch",n.ZodPromise="ZodPromise",n.ZodBranded="ZodBranded",n.ZodPipeline="ZodPipeline",n.ZodReadonly="ZodReadonly"})(Je||(Je={}));var cx=(n,e={message:`Input not instance of ${n.name}`})=>kl(t=>t instanceof n,e),z=Rr.create,He=Jr.create,ux=Qs.create,mh=Qr.create,je=es.create,hx=ts.create,dx=Ks.create,fx=ns.create,ea=is.create,px=Ir.create,fs=ir.create,mx=xi.create,gx=js.create,Mt=rr.create,xe=kn.create,_x=kn.strictCreate,lo=rs.create,xx=Ol.create,vx=ss.create,yx=Di.create,Sx=Fl.create,bx=$s.create,Mx=Js.create,Ex=Bl.create,Tx=as.create,Ht=os.create,Ax=ls.create,sr=cs.create,wx=Cr.create,vp=Kn.create,gh=ui.create,Rx=Ui.create,_h=Kn.createWithPreprocess,Ix=oo.create,Cx=()=>z().optional(),Px=()=>He().optional(),Nx=()=>je().optional(),Lx={string:(n=>Rr.create({...n,coerce:!0})),number:(n=>Jr.create({...n,coerce:!0})),boolean:(n=>es.create({...n,coerce:!0})),bigint:(n=>Qr.create({...n,coerce:!0})),date:(n=>ts.create({...n,coerce:!0}))},Dx=nt,U=Object.freeze({__proto__:null,defaultErrorMap:Zs,setErrorMap:W0,getErrorMap:Ll,makeIssue:Dl,EMPTY_PATH:X0,addIssueToContext:Pe,ParseStatus:Tn,INVALID:nt,DIRTY:Ys,OK:Pn,isAborted:dh,isDirty:fh,isValid:ro,isAsync:so,get util(){return Tt},get objectUtil(){return hh},ZodParsedType:De,getParsedType:wr,ZodType:ut,datetimeRegex:Ep,ZodString:Rr,ZodNumber:Jr,ZodBigInt:Qr,ZodBoolean:es,ZodDate:ts,ZodSymbol:Ks,ZodUndefined:ns,ZodNull:is,ZodAny:Ir,ZodUnknown:ir,ZodNever:xi,ZodVoid:js,ZodArray:rr,ZodObject:kn,ZodUnion:rs,ZodDiscriminatedUnion:Ol,ZodIntersection:ss,ZodTuple:Di,ZodRecord:Fl,ZodMap:$s,ZodSet:Js,ZodFunction:Bl,ZodLazy:as,ZodLiteral:os,ZodEnum:ls,ZodNativeEnum:cs,ZodPromise:Cr,ZodEffects:Kn,ZodTransformer:Kn,ZodOptional:ui,ZodNullable:Ui,ZodDefault:us,ZodCatch:hs,ZodNaN:Qs,BRAND:ox,ZodBranded:ao,ZodPipeline:oo,ZodReadonly:ds,custom:kl,Schema:ut,ZodSchema:ut,late:lx,get ZodFirstPartyTypeKind(){return Je},coerce:Lx,any:px,array:Mt,bigint:mh,boolean:je,date:hx,discriminatedUnion:xx,effect:vp,enum:Ax,function:Ex,instanceof:cx,intersection:vx,lazy:Tx,literal:Ht,map:bx,nan:ux,nativeEnum:sr,never:mx,null:ea,nullable:Rx,number:He,object:xe,oboolean:Nx,onumber:Px,optional:gh,ostring:Cx,pipeline:Ix,preprocess:_h,promise:wx,record:Sx,set:Mx,strictObject:_x,string:z,symbol:dx,transformer:vp,tuple:yx,undefined:fx,union:lo,unknown:fs,void:gx,NEVER:Dx,ZodIssueCode:_e,quotelessJson:H0,ZodError:Zn});var zl={exports:{}};var Ap;function wp(){return Ap?zl.exports:(Ap=1,(function(n){var e=(function(t){var i=1e7,r=7,s=9007199254740992,a=x(s),o="0123456789abcdefghijklmnopqrstuvwxyz",c=typeof BigInt=="function";function l(p,f,S,A){return typeof p>"u"?l[0]:typeof f<"u"?+f==10&&!S?Fe(p):dt(p,f,S,A):Fe(p)}function u(p,f){this.value=p,this.sign=f,this.isSmall=!1}u.prototype=Object.create(l.prototype);function h(p){this.value=p,this.sign=p<0,this.isSmall=!0}h.prototype=Object.create(l.prototype);function d(p){this.value=p}d.prototype=Object.create(l.prototype);function m(p){return-s<p&&p<s}function x(p){return p<1e7?[p]:p<1e14?[p%1e7,Math.floor(p/1e7)]:[p%1e7,Math.floor(p/1e7)%1e7,Math.floor(p/1e14)]}function v(p){g(p);var f=p.length;if(f<4&&le(p,a)<0)switch(f){case 0:return 0;case 1:return p[0];case 2:return p[0]+p[1]*i;default:return p[0]+(p[1]+p[2]*i)*i}return p}function g(p){for(var f=p.length;p[--f]===0;);p.length=f+1}function _(p){for(var f=new Array(p),S=-1;++S<p;)f[S]=0;return f}function T(p){return p>0?Math.floor(p):Math.ceil(p)}function I(p,f){var S=p.length,A=f.length,C=new Array(S),L=0,H=i,D,F;for(F=0;F<A;F++)D=p[F]+f[F]+L,L=D>=H?1:0,C[F]=D-L*H;for(;F<S;)D=p[F]+L,L=D===H?1:0,C[F++]=D-L*H;return L>0&&C.push(L),C}function E(p,f){return p.length>=f.length?I(p,f):I(f,p)}function w(p,f){var S=p.length,A=new Array(S),C=i,L,H;for(H=0;H<S;H++)L=p[H]-C+f,f=Math.floor(L/C),A[H]=L-f*C,f+=1;for(;f>0;)A[H++]=f%C,f=Math.floor(f/C);return A}u.prototype.add=function(p){var f=Fe(p);if(this.sign!==f.sign)return this.subtract(f.negate());var S=this.value,A=f.value;return f.isSmall?new u(w(S,Math.abs(A)),this.sign):new u(E(S,A),this.sign)},u.prototype.plus=u.prototype.add,h.prototype.add=function(p){var f=Fe(p),S=this.value;if(S<0!==f.sign)return this.subtract(f.negate());var A=f.value;if(f.isSmall){if(m(S+A))return new h(S+A);A=x(Math.abs(A))}return new u(w(A,Math.abs(S)),S<0)},h.prototype.plus=h.prototype.add,d.prototype.add=function(p){return new d(this.value+Fe(p).value)},d.prototype.plus=d.prototype.add;function R(p,f){var S=p.length,A=f.length,C=new Array(S),L=0,H=i,D,F;for(D=0;D<A;D++)F=p[D]-L-f[D],F<0?(F+=H,L=1):L=0,C[D]=F;for(D=A;D<S;D++){if(F=p[D]-L,F<0)F+=H;else{C[D++]=F;break}C[D]=F}for(;D<S;D++)C[D]=p[D];return g(C),C}function P(p,f,S){var A;return le(p,f)>=0?A=R(p,f):(A=R(f,p),S=!S),A=v(A),typeof A=="number"?(S&&(A=-A),new h(A)):new u(A,S)}function y(p,f,S){var A=p.length,C=new Array(A),L=-f,H=i,D,F;for(D=0;D<A;D++)F=p[D]+L,L=Math.floor(F/H),F%=H,C[D]=F<0?F+H:F;return C=v(C),typeof C=="number"?(S&&(C=-C),new h(C)):new u(C,S)}u.prototype.subtract=function(p){var f=Fe(p);if(this.sign!==f.sign)return this.add(f.negate());var S=this.value,A=f.value;return f.isSmall?y(S,Math.abs(A),this.sign):P(S,A,this.sign)},u.prototype.minus=u.prototype.subtract,h.prototype.subtract=function(p){var f=Fe(p),S=this.value;if(S<0!==f.sign)return this.add(f.negate());var A=f.value;return f.isSmall?new h(S-A):y(A,Math.abs(S),S>=0)},h.prototype.minus=h.prototype.subtract,d.prototype.subtract=function(p){return new d(this.value-Fe(p).value)},d.prototype.minus=d.prototype.subtract,u.prototype.negate=function(){return new u(this.value,!this.sign)},h.prototype.negate=function(){var p=this.sign,f=new h(-this.value);return f.sign=!p,f},d.prototype.negate=function(){return new d(-this.value)},u.prototype.abs=function(){return new u(this.value,!1)},h.prototype.abs=function(){return new h(Math.abs(this.value))},d.prototype.abs=function(){return new d(this.value>=0?this.value:-this.value)};function N(p,f){var S=p.length,A=f.length,C=S+A,L=_(C),H=i,D,F,ae,ge,ue;for(ae=0;ae<S;++ae){ge=p[ae];for(var fe=0;fe<A;++fe)ue=f[fe],D=ge*ue+L[ae+fe],F=Math.floor(D/H),L[ae+fe]=D-F*H,L[ae+fe+1]+=F}return g(L),L}function k(p,f){var S=p.length,A=new Array(S),C=i,L=0,H,D;for(D=0;D<S;D++)H=p[D]*f+L,L=Math.floor(H/C),A[D]=H-L*C;for(;L>0;)A[D++]=L%C,L=Math.floor(L/C);return A}function W(p,f){for(var S=[];f-- >0;)S.push(0);return S.concat(p)}function q(p,f){var S=Math.max(p.length,f.length);if(S<=30)return N(p,f);S=Math.ceil(S/2);var A=p.slice(S),C=p.slice(0,S),L=f.slice(S),H=f.slice(0,S),D=q(C,H),F=q(A,L),ae=q(E(C,A),E(H,L)),ge=E(E(D,W(R(R(ae,D),F),S)),W(F,2*S));return g(ge),ge}function ee(p,f){return-.012*p-.012*f+15e-6*p*f>0}u.prototype.multiply=function(p){var f=Fe(p),S=this.value,A=f.value,C=this.sign!==f.sign,L;if(f.isSmall){if(A===0)return l[0];if(A===1)return this;if(A===-1)return this.negate();if(L=Math.abs(A),L<i)return new u(k(S,L),C);A=x(L)}return ee(S.length,A.length)?new u(q(S,A),C):new u(N(S,A),C)},u.prototype.times=u.prototype.multiply;function X(p,f,S){return p<i?new u(k(f,p),S):new u(N(f,x(p)),S)}h.prototype._multiplyBySmall=function(p){return m(p.value*this.value)?new h(p.value*this.value):X(Math.abs(p.value),x(Math.abs(this.value)),this.sign!==p.sign)},u.prototype._multiplyBySmall=function(p){return p.value===0?l[0]:p.value===1?this:p.value===-1?this.negate():X(Math.abs(p.value),this.value,this.sign!==p.sign)},h.prototype.multiply=function(p){return Fe(p)._multiplyBySmall(this)},h.prototype.times=h.prototype.multiply,d.prototype.multiply=function(p){return new d(this.value*Fe(p).value)},d.prototype.times=d.prototype.multiply;function Q(p){var f=p.length,S=_(f+f),A=i,C,L,H,D,F;for(H=0;H<f;H++){D=p[H],L=0-D*D;for(var ae=H;ae<f;ae++)F=p[ae],C=2*(D*F)+S[H+ae]+L,L=Math.floor(C/A),S[H+ae]=C-L*A;S[H+f]=L}return g(S),S}u.prototype.square=function(){return new u(Q(this.value),!1)},h.prototype.square=function(){var p=this.value*this.value;return m(p)?new h(p):new u(Q(x(Math.abs(this.value))),!1)},d.prototype.square=function(p){return new d(this.value*this.value)};function oe(p,f){var S=p.length,A=f.length,C=i,L=_(f.length),H=f[A-1],D=Math.ceil(C/(2*H)),F=k(p,D),ae=k(f,D),ge,ue,fe,Ce,Ue,tt,V;for(F.length<=S&&F.push(0),ae.push(0),H=ae[A-1],ue=S-A;ue>=0;ue--){for(ge=C-1,F[ue+A]!==H&&(ge=Math.floor((F[ue+A]*C+F[ue+A-1])/H)),fe=0,Ce=0,tt=ae.length,Ue=0;Ue<tt;Ue++)fe+=ge*ae[Ue],V=Math.floor(fe/C),Ce+=F[ue+Ue]-(fe-V*C),fe=V,Ce<0?(F[ue+Ue]=Ce+C,Ce=-1):(F[ue+Ue]=Ce,Ce=0);for(;Ce!==0;){for(ge-=1,fe=0,Ue=0;Ue<tt;Ue++)fe+=F[ue+Ue]-C+ae[Ue],fe<0?(F[ue+Ue]=fe+C,fe=0):(F[ue+Ue]=fe,fe=1);Ce+=fe}L[ue]=ge}return F=me(F,D)[0],[v(L),v(F)]}function re(p,f){for(var S=p.length,A=f.length,C=[],L=[],H=i,D,F,ae,ge,ue;S;){if(L.unshift(p[--S]),g(L),le(L,f)<0){C.push(0);continue}F=L.length,ae=L[F-1]*H+L[F-2],ge=f[A-1]*H+f[A-2],F>A&&(ae=(ae+1)*H),D=Math.ceil(ae/ge);do{if(ue=k(f,D),le(ue,L)<=0)break;D--}while(D);C.push(D),L=R(L,ue)}return C.reverse(),[v(C),v(L)]}function me(p,f){var S=p.length,A=_(S),C=i,L,H,D,F;for(D=0,L=S-1;L>=0;--L)F=D*C+p[L],H=T(F/f),D=F-H*f,A[L]=H|0;return[A,D|0]}function ne(p,f){var S,A=Fe(f);if(c)return[new d(p.value/A.value),new d(p.value%A.value)];var C=p.value,L=A.value,H;if(L===0)throw new Error("Cannot divide by zero");if(p.isSmall)return A.isSmall?[new h(T(C/L)),new h(C%L)]:[l[0],p];if(A.isSmall){if(L===1)return[p,l[0]];if(L==-1)return[p.negate(),l[0]];var D=Math.abs(L);if(D<i){S=me(C,D),H=v(S[0]);var F=S[1];return p.sign&&(F=-F),typeof H=="number"?(p.sign!==A.sign&&(H=-H),[new h(H),new h(F)]):[new u(H,p.sign!==A.sign),new h(F)]}L=x(D)}var ae=le(C,L);if(ae===-1)return[l[0],p];if(ae===0)return[l[p.sign===A.sign?1:-1],l[0]];C.length+L.length<=200?S=oe(C,L):S=re(C,L),H=S[0];var ge=p.sign!==A.sign,ue=S[1],fe=p.sign;return typeof H=="number"?(ge&&(H=-H),H=new h(H)):H=new u(H,ge),typeof ue=="number"?(fe&&(ue=-ue),ue=new h(ue)):ue=new u(ue,fe),[H,ue]}u.prototype.divmod=function(p){var f=ne(this,p);return{quotient:f[0],remainder:f[1]}},d.prototype.divmod=h.prototype.divmod=u.prototype.divmod,u.prototype.divide=function(p){return ne(this,p)[0]},d.prototype.over=d.prototype.divide=function(p){return new d(this.value/Fe(p).value)},h.prototype.over=h.prototype.divide=u.prototype.over=u.prototype.divide,u.prototype.mod=function(p){return ne(this,p)[1]},d.prototype.mod=d.prototype.remainder=function(p){return new d(this.value%Fe(p).value)},h.prototype.remainder=h.prototype.mod=u.prototype.remainder=u.prototype.mod,u.prototype.pow=function(p){var f=Fe(p),S=this.value,A=f.value,C,L,H;if(A===0)return l[1];if(S===0)return l[0];if(S===1)return l[1];if(S===-1)return f.isEven()?l[1]:l[-1];if(f.sign)return l[0];if(!f.isSmall)throw new Error("The exponent "+f.toString()+" is too large.");if(this.isSmall&&m(C=Math.pow(S,A)))return new h(T(C));for(L=this,H=l[1];A&!0&&(H=H.times(L),--A),A!==0;)A/=2,L=L.square();return H},h.prototype.pow=u.prototype.pow,d.prototype.pow=function(p){var f=Fe(p),S=this.value,A=f.value,C=BigInt(0),L=BigInt(1),H=BigInt(2);if(A===C)return l[1];if(S===C)return l[0];if(S===L)return l[1];if(S===BigInt(-1))return f.isEven()?l[1]:l[-1];if(f.isNegative())return new d(C);for(var D=this,F=l[1];(A&L)===L&&(F=F.times(D),--A),A!==C;)A/=H,D=D.square();return F},u.prototype.modPow=function(p,f){if(p=Fe(p),f=Fe(f),f.isZero())throw new Error("Cannot take modPow with modulus 0");var S=l[1],A=this.mod(f);for(p.isNegative()&&(p=p.multiply(l[-1]),A=A.modInv(f));p.isPositive();){if(A.isZero())return l[0];p.isOdd()&&(S=S.multiply(A).mod(f)),p=p.divide(2),A=A.square().mod(f)}return S},d.prototype.modPow=h.prototype.modPow=u.prototype.modPow;function le(p,f){if(p.length!==f.length)return p.length>f.length?1:-1;for(var S=p.length-1;S>=0;S--)if(p[S]!==f[S])return p[S]>f[S]?1:-1;return 0}u.prototype.compareAbs=function(p){var f=Fe(p),S=this.value,A=f.value;return f.isSmall?1:le(S,A)},h.prototype.compareAbs=function(p){var f=Fe(p),S=Math.abs(this.value),A=f.value;return f.isSmall?(A=Math.abs(A),S===A?0:S>A?1:-1):-1},d.prototype.compareAbs=function(p){var f=this.value,S=Fe(p).value;return f=f>=0?f:-f,S=S>=0?S:-S,f===S?0:f>S?1:-1},u.prototype.compare=function(p){if(p===1/0)return-1;if(p===-1/0)return 1;var f=Fe(p),S=this.value,A=f.value;return this.sign!==f.sign?f.sign?1:-1:f.isSmall?this.sign?-1:1:le(S,A)*(this.sign?-1:1)},u.prototype.compareTo=u.prototype.compare,h.prototype.compare=function(p){if(p===1/0)return-1;if(p===-1/0)return 1;var f=Fe(p),S=this.value,A=f.value;return f.isSmall?S==A?0:S>A?1:-1:S<0!==f.sign?S<0?-1:1:S<0?1:-1},h.prototype.compareTo=h.prototype.compare,d.prototype.compare=function(p){if(p===1/0)return-1;if(p===-1/0)return 1;var f=this.value,S=Fe(p).value;return f===S?0:f>S?1:-1},d.prototype.compareTo=d.prototype.compare,u.prototype.equals=function(p){return this.compare(p)===0},d.prototype.eq=d.prototype.equals=h.prototype.eq=h.prototype.equals=u.prototype.eq=u.prototype.equals,u.prototype.notEquals=function(p){return this.compare(p)!==0},d.prototype.neq=d.prototype.notEquals=h.prototype.neq=h.prototype.notEquals=u.prototype.neq=u.prototype.notEquals,u.prototype.greater=function(p){return this.compare(p)>0},d.prototype.gt=d.prototype.greater=h.prototype.gt=h.prototype.greater=u.prototype.gt=u.prototype.greater,u.prototype.lesser=function(p){return this.compare(p)<0},d.prototype.lt=d.prototype.lesser=h.prototype.lt=h.prototype.lesser=u.prototype.lt=u.prototype.lesser,u.prototype.greaterOrEquals=function(p){return this.compare(p)>=0},d.prototype.geq=d.prototype.greaterOrEquals=h.prototype.geq=h.prototype.greaterOrEquals=u.prototype.geq=u.prototype.greaterOrEquals,u.prototype.lesserOrEquals=function(p){return this.compare(p)<=0},d.prototype.leq=d.prototype.lesserOrEquals=h.prototype.leq=h.prototype.lesserOrEquals=u.prototype.leq=u.prototype.lesserOrEquals,u.prototype.isEven=function(){return(this.value[0]&1)===0},h.prototype.isEven=function(){return(this.value&1)===0},d.prototype.isEven=function(){return(this.value&BigInt(1))===BigInt(0)},u.prototype.isOdd=function(){return(this.value[0]&1)===1},h.prototype.isOdd=function(){return(this.value&1)===1},d.prototype.isOdd=function(){return(this.value&BigInt(1))===BigInt(1)},u.prototype.isPositive=function(){return!this.sign},h.prototype.isPositive=function(){return this.value>0},d.prototype.isPositive=h.prototype.isPositive,u.prototype.isNegative=function(){return this.sign},h.prototype.isNegative=function(){return this.value<0},d.prototype.isNegative=h.prototype.isNegative,u.prototype.isUnit=function(){return!1},h.prototype.isUnit=function(){return Math.abs(this.value)===1},d.prototype.isUnit=function(){return this.abs().value===BigInt(1)},u.prototype.isZero=function(){return!1},h.prototype.isZero=function(){return this.value===0},d.prototype.isZero=function(){return this.value===BigInt(0)},u.prototype.isDivisibleBy=function(p){var f=Fe(p);return f.isZero()?!1:f.isUnit()?!0:f.compareAbs(2)===0?this.isEven():this.mod(f).isZero()},d.prototype.isDivisibleBy=h.prototype.isDivisibleBy=u.prototype.isDivisibleBy;function he(p){var f=p.abs();if(f.isUnit())return!1;if(f.equals(2)||f.equals(3)||f.equals(5))return!0;if(f.isEven()||f.isDivisibleBy(3)||f.isDivisibleBy(5))return!1;if(f.lesser(49))return!0}function Ge(p,f){for(var S=p.prev(),A=S,C=0,L,H,D;A.isEven();)A=A.divide(2),C++;e:for(H=0;H<f.length;H++)if(!p.lesser(f[H])&&(D=e(f[H]).modPow(A,p),!(D.isUnit()||D.equals(S)))){for(L=C-1;L!=0;L--){if(D=D.square().mod(p),D.isUnit())return!1;if(D.equals(S))continue e}return!1}return!0}u.prototype.isPrime=function(p){var f=he(this);if(f!==t)return f;var S=this.abs(),A=S.bitLength();if(A<=64)return Ge(S,[2,3,5,7,11,13,17,19,23,29,31,37]);for(var C=Math.log(2)*A.toJSNumber(),L=Math.ceil(p===!0?2*Math.pow(C,2):C),H=[],D=0;D<L;D++)H.push(e(D+2));return Ge(S,H)},d.prototype.isPrime=h.prototype.isPrime=u.prototype.isPrime,u.prototype.isProbablePrime=function(p,f){var S=he(this);if(S!==t)return S;for(var A=this.abs(),C=p===t?5:p,L=[],H=0;H<C;H++)L.push(e.randBetween(2,A.minus(2),f));return Ge(A,L)},d.prototype.isProbablePrime=h.prototype.isProbablePrime=u.prototype.isProbablePrime,u.prototype.modInv=function(p){for(var f=e.zero,S=e.one,A=Fe(p),C=this.abs(),L,H,D;!C.isZero();)L=A.divide(C),H=f,D=A,f=S,A=C,S=H.subtract(L.multiply(S)),C=D.subtract(L.multiply(C));if(!A.isUnit())throw new Error(this.toString()+" and "+p.toString()+" are not co-prime");return f.compare(0)===-1&&(f=f.add(p)),this.isNegative()?f.negate():f},d.prototype.modInv=h.prototype.modInv=u.prototype.modInv,u.prototype.next=function(){var p=this.value;return this.sign?y(p,1,this.sign):new u(w(p,1),this.sign)},h.prototype.next=function(){var p=this.value;return p+1<s?new h(p+1):new u(a,!1)},d.prototype.next=function(){return new d(this.value+BigInt(1))},u.prototype.prev=function(){var p=this.value;return this.sign?new u(w(p,1),!0):y(p,1,this.sign)},h.prototype.prev=function(){var p=this.value;return p-1>-s?new h(p-1):new u(a,!0)},d.prototype.prev=function(){return new d(this.value-BigInt(1))};for(var Ne=[1];2*Ne[Ne.length-1]<=i;)Ne.push(2*Ne[Ne.length-1]);var vt=Ne.length,ie=Ne[vt-1];function Te(p){return Math.abs(p)<=i}u.prototype.shiftLeft=function(p){var f=Fe(p).toJSNumber();if(!Te(f))throw new Error(String(f)+" is too large for shifting.");if(f<0)return this.shiftRight(-f);var S=this;if(S.isZero())return S;for(;f>=vt;)S=S.multiply(ie),f-=vt-1;return S.multiply(Ne[f])},d.prototype.shiftLeft=h.prototype.shiftLeft=u.prototype.shiftLeft,u.prototype.shiftRight=function(p){var f,S=Fe(p).toJSNumber();if(!Te(S))throw new Error(String(S)+" is too large for shifting.");if(S<0)return this.shiftLeft(-S);for(var A=this;S>=vt;){if(A.isZero()||A.isNegative()&&A.isUnit())return A;f=ne(A,ie),A=f[1].isNegative()?f[0].prev():f[0],S-=vt-1}return f=ne(A,Ne[S]),f[1].isNegative()?f[0].prev():f[0]},d.prototype.shiftRight=h.prototype.shiftRight=u.prototype.shiftRight;function K(p,f,S){f=Fe(f);for(var A=p.isNegative(),C=f.isNegative(),L=A?p.not():p,H=C?f.not():f,D=0,F=0,ae=null,ge=null,ue=[];!L.isZero()||!H.isZero();)ae=ne(L,ie),D=ae[1].toJSNumber(),A&&(D=ie-1-D),ge=ne(H,ie),F=ge[1].toJSNumber(),C&&(F=ie-1-F),L=ae[0],H=ge[0],ue.push(S(D,F));for(var fe=S(A?1:0,C?1:0)!==0?e(-1):e(0),Ce=ue.length-1;Ce>=0;Ce-=1)fe=fe.multiply(ie).add(e(ue[Ce]));return fe}u.prototype.not=function(){return this.negate().prev()},d.prototype.not=h.prototype.not=u.prototype.not,u.prototype.and=function(p){return K(this,p,function(f,S){return f&S})},d.prototype.and=h.prototype.and=u.prototype.and,u.prototype.or=function(p){return K(this,p,function(f,S){return f|S})},d.prototype.or=h.prototype.or=u.prototype.or,u.prototype.xor=function(p){return K(this,p,function(f,S){return f^S})},d.prototype.xor=h.prototype.xor=u.prototype.xor;var $=1<<30,be=(i&-i)*(i&-i)|$;function Ie(p){var f=p.value,S=typeof f=="number"?f|$:typeof f=="bigint"?f|BigInt($):f[0]+f[1]*i|be;return S&-S}function de(p,f){if(f.compareTo(p)<=0){var S=de(p,f.square(f)),A=S.p,C=S.e,L=A.multiply(f);return L.compareTo(p)<=0?{p:L,e:C*2+1}:{p:A,e:C*2}}return{p:e(1),e:0}}u.prototype.bitLength=function(){var p=this;return p.compareTo(e(0))<0&&(p=p.negate().subtract(e(1))),p.compareTo(e(0))===0?e(0):e(de(p,e(2)).e).add(e(1))},d.prototype.bitLength=h.prototype.bitLength=u.prototype.bitLength;function Ke(p,f){return p=Fe(p),f=Fe(f),p.greater(f)?p:f}function Rt(p,f){return p=Fe(p),f=Fe(f),p.lesser(f)?p:f}function it(p,f){if(p=Fe(p).abs(),f=Fe(f).abs(),p.equals(f))return p;if(p.isZero())return f;if(f.isZero())return p;for(var S=l[1],A,C;p.isEven()&&f.isEven();)A=Rt(Ie(p),Ie(f)),p=p.divide(A),f=f.divide(A),S=S.multiply(A);for(;p.isEven();)p=p.divide(Ie(p));do{for(;f.isEven();)f=f.divide(Ie(f));p.greater(f)&&(C=f,f=p,p=C),f=f.subtract(p)}while(!f.isZero());return S.isUnit()?p:p.multiply(S)}function pt(p,f){return p=Fe(p).abs(),f=Fe(f).abs(),p.divide(it(p,f)).multiply(f)}function It(p,f,S){p=Fe(p),f=Fe(f);var A=S||Math.random,C=Rt(p,f),L=Ke(p,f),H=L.subtract(C).add(1);if(H.isSmall)return C.add(Math.floor(A()*H));for(var D=Qt(H,i).value,F=[],ae=!0,ge=0;ge<D.length;ge++){var ue=ae?D[ge]+(ge+1<D.length?D[ge+1]/i:0):i,fe=T(A()*ue);F.push(fe),fe<D[ge]&&(ae=!1)}return C.add(l.fromArray(F,i,!1))}var dt=function(p,f,S,A){S=S||o,p=String(p),A||(p=p.toLowerCase(),S=S.toLowerCase());var C=p.length,L,H=Math.abs(f),D={};for(L=0;L<S.length;L++)D[S[L]]=L;for(L=0;L<C;L++){var F=p[L];if(F!=="-"&&F in D&&D[F]>=H){if(F==="1"&&H===1)continue;throw new Error(F+" is not a valid digit in base "+f+".")}}f=Fe(f);var ae=[],ge=p[0]==="-";for(L=ge?1:0;L<p.length;L++){var F=p[L];if(F in D)ae.push(Fe(D[F]));else if(F==="<"){var ue=L;do L++;while(p[L]!==">"&&L<p.length);ae.push(Fe(p.slice(ue+1,L)))}else throw new Error(F+" is not a valid character")}return Nt(ae,f,ge)};function Nt(p,f,S){var A=l[0],C=l[1],L;for(L=p.length-1;L>=0;L--)A=A.add(p[L].times(C)),C=C.times(f);return S?A.negate():A}function Jt(p,f){return f=f||o,p<f.length?f[p]:"<"+p+">"}function Qt(p,f){if(f=e(f),f.isZero()){if(p.isZero())return{value:[0],isNegative:!1};throw new Error("Cannot convert nonzero numbers to base 0.")}if(f.equals(-1)){if(p.isZero())return{value:[0],isNegative:!1};if(p.isNegative())return{value:[].concat.apply([],Array.apply(null,Array(-p.toJSNumber())).map(Array.prototype.valueOf,[1,0])),isNegative:!1};var S=Array.apply(null,Array(p.toJSNumber()-1)).map(Array.prototype.valueOf,[0,1]);return S.unshift([1]),{value:[].concat.apply([],S),isNegative:!1}}var A=!1;if(p.isNegative()&&f.isPositive()&&(A=!0,p=p.abs()),f.isUnit())return p.isZero()?{value:[0],isNegative:!1}:{value:Array.apply(null,Array(p.toJSNumber())).map(Number.prototype.valueOf,1),isNegative:A};for(var C=[],L=p,H;L.isNegative()||L.compareAbs(f)>=0;){H=L.divmod(f),L=H.quotient;var D=H.remainder;D.isNegative()&&(D=f.minus(D).abs(),L=L.next()),C.push(D.toJSNumber())}return C.push(L.toJSNumber()),{value:C.reverse(),isNegative:A}}function Ot(p,f,S){var A=Qt(p,f);return(A.isNegative?"-":"")+A.value.map(function(C){return Jt(C,S)}).join("")}u.prototype.toArray=function(p){return Qt(this,p)},h.prototype.toArray=function(p){return Qt(this,p)},d.prototype.toArray=function(p){return Qt(this,p)},u.prototype.toString=function(p,f){if(p===t&&(p=10),p!==10||f)return Ot(this,p,f);for(var S=this.value,A=S.length,C=String(S[--A]),L="0000000",H;--A>=0;)H=String(S[A]),C+=L.slice(H.length)+H;var D=this.sign?"-":"";return D+C},h.prototype.toString=function(p,f){return p===t&&(p=10),p!=10||f?Ot(this,p,f):String(this.value)},d.prototype.toString=h.prototype.toString,d.prototype.toJSON=u.prototype.toJSON=h.prototype.toJSON=function(){return this.toString()},u.prototype.valueOf=function(){return parseInt(this.toString(),10)},u.prototype.toJSNumber=u.prototype.valueOf,h.prototype.valueOf=function(){return this.value},h.prototype.toJSNumber=h.prototype.valueOf,d.prototype.valueOf=d.prototype.toJSNumber=function(){return parseInt(this.toString(),10)};function Xt(p){if(m(+p)){var f=+p;if(f===T(f))return c?new d(BigInt(f)):new h(f);throw new Error("Invalid integer: "+p)}var S=p[0]==="-";S&&(p=p.slice(1));var A=p.split(/e/i);if(A.length>2)throw new Error("Invalid integer: "+A.join("e"));if(A.length===2){var C=A[1];if(C[0]==="+"&&(C=C.slice(1)),C=+C,C!==T(C)||!m(C))throw new Error("Invalid integer: "+C+" is not a valid exponent.");var L=A[0],H=L.indexOf(".");if(H>=0&&(C-=L.length-H-1,L=L.slice(0,H)+L.slice(H+1)),C<0)throw new Error("Cannot include negative exponent part for integers");L+=new Array(C+1).join("0"),p=L}var D=/^([0-9][0-9]*)$/.test(p);if(!D)throw new Error("Invalid integer: "+p);if(c)return new d(BigInt(S?"-"+p:p));for(var F=[],ae=p.length,ge=r,ue=ae-ge;ae>0;)F.push(+p.slice(ue,ae)),ue-=ge,ue<0&&(ue=0),ae-=ge;return g(F),new u(F,S)}function G(p){if(c)return new d(BigInt(p));if(m(p)){if(p!==T(p))throw new Error(p+" is not an integer.");return new h(p)}return Xt(p.toString())}function Fe(p){return typeof p=="number"?G(p):typeof p=="string"?Xt(p):typeof p=="bigint"?new d(p):p}for(var gt=0;gt<1e3;gt++)l[gt]=Fe(gt),gt>0&&(l[-gt]=Fe(-gt));return l.one=l[1],l.zero=l[0],l.minusOne=l[-1],l.max=Ke,l.min=Rt,l.gcd=it,l.lcm=pt,l.isInstance=function(p){return p instanceof u||p instanceof h||p instanceof d},l.randBetween=It,l.fromArray=function(p,f,S){return Nt(p.map(Fe),Fe(f||10),S)},l})();n.hasOwnProperty("exports")&&(n.exports=e)})(zl),zl.exports)}var Ux=wp(),xh=to(Ux);var Rp=64,vh=16,Pr=Rp/vh;function Ox(){try{return!0}catch{return!1}}function Fx(n,e,t){let i=0;for(let r=0;r<t;r++){let s=n[e+r];if(s===void 0)break;i+=s*16**r}return i}function Ip(n){let e=[];for(let t=0;t<n.length;t++){let i=Number(n[t]);for(let r=0;i||r<e.length;r++)i+=(e[r]||0)*10,e[r]=i%16,i=(i-e[r])/16}return e}function Bx(n){let e=Ip(n),t=Array(Pr);for(let i=0;i<Pr;i++)t[Pr-1-i]=Fx(e,i*Pr,Pr);return t}var co=class n{static fromString(e){return new n(Bx(e),e)}static fromBit(e){let t=Array(Pr),i=Math.floor(e/vh);for(let r=0;r<Pr;r++)t[Pr-1-r]=r===i?1<<e-i*vh:0;return new n(t)}constructor(e,t){this.parts=e,this.str=t}and({parts:e}){return new n(this.parts.map((t,i)=>t&e[i]))}or({parts:e}){return new n(this.parts.map((t,i)=>t|e[i]))}xor({parts:e}){return new n(this.parts.map((t,i)=>t^e[i]))}not(){return new n(this.parts.map(e=>~e))}equals({parts:e}){return this.parts.every((t,i)=>t===e[i])}toString(){if(this.str!=null)return this.str;let e=new Array(Rp/4);return this.parts.forEach((t,i)=>{let r=Ip(t.toString());for(let s=0;s<4;s++)e[s+i*4]=r[3-s]||0}),this.str=xh.fromArray(e,16).toString()}toJSON(){return this.toString()}},Nr=Ox();Nr&&BigInt.prototype.toJSON==null&&(BigInt.prototype.toJSON=function(){return this.toString()});var Vl={},Cp=Nr?function(e){return BigInt(e)}:function(e){return e instanceof co?e:(typeof e=="number"&&(e=e.toString()),Vl[e]!=null||(Vl[e]=co.fromString(e)),Vl[e])},Sn=Cp(0),Gl=Nr?function(e=Sn,t=Sn){return e&t}:function(e=Sn,t=Sn){return e.and(t)},Pp=Nr?function(e=Sn,t=Sn){return e|t}:function(e=Sn,t=Sn){return e.or(t)},kx=Nr?function(e=Sn,t=Sn){return e^t}:function(e=Sn,t=Sn){return e.xor(t)},zx=Nr?function(e=Sn){return~e}:function(e=Sn){return e.not()},yh=Nr?function(e,t){return e===t}:function(e,t){return e==null||t==null?e==t:e.equals(t)};function Vx(...n){let e=n[0];for(let t=1;t<n.length;t++)e=Pp(e,n[t]);return e}function Gx(n,e){return yh(Gl(n,e),e)}function Hx(n,e){return!yh(Gl(n,e),Sn)}function Wx(n,e){return e===Sn?n:Pp(n,e)}function Xx(n,e){return e===Sn?n:kx(n,Gl(n,e))}var qx=Nr?function(e){return BigInt(1)<<BigInt(e)}:function(e){return co.fromBit(e)},$e={combine:Vx,add:Wx,remove:Xx,filter:Gl,invert:zx,has:Gx,hasAny:Hx,equals:yh,deserialize:Cp,getFlag:qx};var Sh;(function(n){n[n.CLOSE_NORMAL=1e3]="CLOSE_NORMAL",n[n.CLOSE_UNSUPPORTED=1003]="CLOSE_UNSUPPORTED",n[n.CLOSE_ABNORMAL=1006]="CLOSE_ABNORMAL",n[n.INVALID_CLIENTID=4e3]="INVALID_CLIENTID",n[n.INVALID_ORIGIN=4001]="INVALID_ORIGIN",n[n.RATELIMITED=4002]="RATELIMITED",n[n.TOKEN_REVOKED=4003]="TOKEN_REVOKED",n[n.INVALID_VERSION=4004]="INVALID_VERSION",n[n.INVALID_ENCODING=4005]="INVALID_ENCODING"})(Sh||(Sh={}));var uo;(function(n){n[n.INVALID_PAYLOAD=4e3]="INVALID_PAYLOAD",n[n.INVALID_COMMAND=4002]="INVALID_COMMAND",n[n.INVALID_GUILD=4003]="INVALID_GUILD",n[n.INVALID_EVENT=4004]="INVALID_EVENT",n[n.INVALID_CHANNEL=4005]="INVALID_CHANNEL",n[n.INVALID_PERMISSIONS=4006]="INVALID_PERMISSIONS",n[n.INVALID_CLIENTID=4007]="INVALID_CLIENTID",n[n.INVALID_ORIGIN=4008]="INVALID_ORIGIN",n[n.INVALID_TOKEN=4009]="INVALID_TOKEN",n[n.INVALID_USER=4010]="INVALID_USER"})(uo||(uo={}));var ho;(function(n){n.LANDSCAPE="landscape",n.PORTRAIT="portrait"})(ho||(ho={}));var jn;(function(n){n.MOBILE="mobile",n.DESKTOP="desktop"})(jn||(jn={}));var Yx=Object.freeze({CREATE_INSTANT_INVITE:$e.getFlag(0),KICK_MEMBERS:$e.getFlag(1),BAN_MEMBERS:$e.getFlag(2),ADMINISTRATOR:$e.getFlag(3),MANAGE_CHANNELS:$e.getFlag(4),MANAGE_GUILD:$e.getFlag(5),ADD_REACTIONS:$e.getFlag(6),VIEW_AUDIT_LOG:$e.getFlag(7),PRIORITY_SPEAKER:$e.getFlag(8),STREAM:$e.getFlag(9),VIEW_CHANNEL:$e.getFlag(10),SEND_MESSAGES:$e.getFlag(11),SEND_TTS_MESSAGES:$e.getFlag(12),MANAGE_MESSAGES:$e.getFlag(13),EMBED_LINKS:$e.getFlag(14),ATTACH_FILES:$e.getFlag(15),READ_MESSAGE_HISTORY:$e.getFlag(16),MENTION_EVERYONE:$e.getFlag(17),USE_EXTERNAL_EMOJIS:$e.getFlag(18),VIEW_GUILD_INSIGHTS:$e.getFlag(19),CONNECT:$e.getFlag(20),SPEAK:$e.getFlag(21),MUTE_MEMBERS:$e.getFlag(22),DEAFEN_MEMBERS:$e.getFlag(23),MOVE_MEMBERS:$e.getFlag(24),USE_VAD:$e.getFlag(25),CHANGE_NICKNAME:$e.getFlag(26),MANAGE_NICKNAMES:$e.getFlag(27),MANAGE_ROLES:$e.getFlag(28),MANAGE_WEBHOOKS:$e.getFlag(29),MANAGE_GUILD_EXPRESSIONS:$e.getFlag(30),USE_APPLICATION_COMMANDS:$e.getFlag(31),REQUEST_TO_SPEAK:$e.getFlag(32),MANAGE_EVENTS:$e.getFlag(33),MANAGE_THREADS:$e.getFlag(34),CREATE_PUBLIC_THREADS:$e.getFlag(35),CREATE_PRIVATE_THREADS:$e.getFlag(36),USE_EXTERNAL_STICKERS:$e.getFlag(37),SEND_MESSAGES_IN_THREADS:$e.getFlag(38),USE_EMBEDDED_ACTIVITIES:$e.getFlag(39),MODERATE_MEMBERS:$e.getFlag(40),VIEW_CREATOR_MONETIZATION_ANALYTICS:$e.getFlag(41),USE_SOUNDBOARD:$e.getFlag(42),CREATE_GUILD_EXPRESSIONS:$e.getFlag(43),CREATE_EVENTS:$e.getFlag(44),USE_EXTERNAL_SOUNDS:$e.getFlag(45),SEND_VOICE_MESSAGES:$e.getFlag(46),SEND_POLLS:$e.getFlag(49),USE_EXTERNAL_APPS:$e.getFlag(50)}),bh=-1,Np=250;var Ql={};V0(Ql,{Activity:()=>Lr,Attachment:()=>Gp,CertifiedDevice:()=>hv,CertifiedDeviceTypeObject:()=>nm,Channel:()=>Zl,ChannelMention:()=>Vp,ChannelTypesObject:()=>_o,Commands:()=>ye,DISPATCH:()=>Th,Embed:()=>Zp,EmbedAuthor:()=>qp,EmbedField:()=>Yp,EmbedFooter:()=>Hp,EmbedProvider:()=>Xp,Emoji:()=>Yl,Entitlement:()=>ta,EntitlementTypesObject:()=>rm,Guild:()=>uv,GuildMember:()=>mo,GuildMemberRPC:()=>wh,Image:()=>ql,KeyTypesObject:()=>em,LayoutMode:()=>pv,LayoutModeTypeObject:()=>Jl,Message:()=>Ih,MessageActivity:()=>jp,MessageApplication:()=>$p,MessageReference:()=>Jp,Orientation:()=>fv,OrientationLockState:()=>dv,OrientationLockStateTypeObject:()=>sm,OrientationTypeObject:()=>$l,PermissionOverwrite:()=>Bp,PermissionOverwriteTypeObject:()=>Fp,PresenceUpdate:()=>kp,Reaction:()=>Kp,ReceiveFramePayload:()=>vi,Relationship:()=>Ah,Role:()=>zp,Scopes:()=>cv,ScopesObject:()=>Up,ShortcutKey:()=>Kl,Sku:()=>Ph,SkuTypeObject:()=>im,Status:()=>po,StatusObject:()=>Op,ThermalState:()=>Nh,ThermalStateTypeObject:()=>am,User:()=>Oi,UserVoiceState:()=>go,Video:()=>Wp,VoiceDevice:()=>Qp,VoiceSettingModeTypeObject:()=>tm,VoiceSettingsIO:()=>jl,VoiceSettingsMode:()=>Ch,VoiceState:()=>Rh});function un(n){return _h(e=>{var t;let[i]=(t=Object.entries(n).find(([,r])=>r===e))!==null&&t!==void 0?t:[];return e!=null&&i===void 0?n.UNHANDLED:e},z().or(He()))}function Hl(n){let e=kl().transform(t=>{let i=n.safeParse(t);return i.success?i.data:n._def.defaultValue()});return e.overlayType=n,e}var Dp=U.object({image_url:U.string()}).describe('Response for "INITIATE_IMAGE_UPLOAD" Command'),Zx=U.object({mediaUrl:U.string().max(1024)}).describe('Request for "OPEN_SHARE_MOMENT_DIALOG" Command'),Kx=U.object({access_token:U.union([U.string(),U.null()]).optional()}).describe('Request for "AUTHENTICATE" Command'),Wl=U.object({access_token:U.string(),user:U.object({username:U.string(),discriminator:U.string(),id:U.string(),avatar:U.union([U.string(),U.null()]).optional(),public_flags:U.number(),global_name:U.union([U.string(),U.null()]).optional()}),scopes:U.array(Hl(U.enum(["identify","identify.premium","email","connections","guilds","guilds.join","guilds.members.read","guilds.channels.read","gdm.join","bot","rpc","rpc.notifications.read","rpc.voice.read","rpc.voice.write","rpc.video.read","rpc.video.write","rpc.screenshare.read","rpc.screenshare.write","rpc.activities.write","webhook.incoming","messages.read","applications.builds.upload","applications.builds.read","applications.commands","applications.commands.permissions.update","applications.commands.update","applications.store.update","applications.entitlements","activities.read","activities.write","activities.invites.write","relationships.read","relationships.write","voice","dm_channels.read","role_connections.write","presences.read","presences.write","openid","dm_channels.messages.read","dm_channels.messages.write","gateway.connect","account.global_name.update","payment_sources.country_code","sdk.social_layer_presence","sdk.social_layer","lobbies.write","application_identities.write"]).or(U.literal(-1)).default(-1))),expires:U.string(),application:U.object({description:U.string(),icon:U.union([U.string(),U.null()]).optional(),id:U.string(),rpc_origins:U.array(U.string()).optional(),name:U.string()})}).describe('Response for "AUTHENTICATE" Command'),Mh=U.object({participants:U.array(U.object({id:U.string(),username:U.string(),global_name:U.union([U.string(),U.null()]).optional(),discriminator:U.string(),avatar:U.union([U.string(),U.null()]).optional(),flags:U.number(),bot:U.boolean(),avatar_decoration_data:U.union([U.object({asset:U.union([U.string(),U.null()]).optional(),skuId:U.string().optional(),expiresAt:U.number().optional()}),U.null()]).optional(),premium_type:U.union([U.number(),U.null()]).optional(),nickname:U.string().optional()}))}).describe('Response for "GET_ACTIVITY_INSTANCE_CONNECTED_PARTICIPANTS" Command'),jx=U.object({command:U.string(),options:U.array(U.object({name:U.string(),value:U.string()})).optional(),content:U.string().max(2e3).optional(),require_launch_channel:U.boolean().optional(),preview_image:U.object({height:U.number(),url:U.string(),width:U.number()}).optional(),components:U.array(U.object({type:U.literal(1),components:U.array(U.object({type:U.literal(2),style:U.number().gte(1).lte(5),label:U.string().max(80).optional(),custom_id:U.string().max(100).describe("Developer-defined identifier for the button; max 100 characters").optional()})).max(5).optional()})).optional(),pid:U.number().optional()}).describe('Request for "SHARE_INTERACTION" Command'),$x=U.object({success:U.boolean()}).describe('Response for "SHARE_INTERACTION" Command'),Jx=U.object({custom_id:U.string().max(64).optional(),message:U.string().max(1e3),link_id:U.string().max(64).optional()}).describe('Request for "SHARE_LINK" Command'),Qx=U.object({success:U.boolean(),didCopyLink:U.boolean(),didSendMessage:U.boolean()}).describe('Response for "SHARE_LINK" Command'),Eh=U.object({relationships:U.array(U.object({type:U.number(),user:U.object({id:U.string(),username:U.string(),global_name:U.union([U.string(),U.null()]).optional(),discriminator:U.string(),avatar:U.union([U.string(),U.null()]).optional(),flags:U.number(),bot:U.boolean(),avatar_decoration_data:U.union([U.object({asset:U.union([U.string(),U.null()]).optional(),skuId:U.string().optional(),expiresAt:U.number().optional()}),U.null()]).optional(),premium_type:U.union([U.number(),U.null()]).optional()}),presence:U.object({status:U.string(),activity:U.union([U.object({session_id:U.string().optional(),type:U.number().optional(),name:U.string(),url:U.union([U.string(),U.null()]).optional(),application_id:U.string().optional(),status_display_type:U.number().optional(),state:U.string().optional(),state_url:U.string().optional(),details:U.string().optional(),details_url:U.string().optional(),emoji:U.union([U.object({name:U.string(),id:U.union([U.string(),U.null()]).optional(),animated:U.union([U.boolean(),U.null()]).optional()}),U.null()]).optional(),assets:U.object({large_image:U.string().optional(),large_text:U.string().optional(),large_url:U.string().optional(),small_image:U.string().optional(),small_text:U.string().optional(),small_url:U.string().optional()}).optional(),timestamps:U.object({start:U.number().optional(),end:U.number().optional()}).optional(),party:U.object({id:U.string().optional(),size:U.array(U.number()).min(2).max(2).optional(),privacy:U.number().optional()}).optional(),secrets:U.object({match:U.string().optional(),join:U.string().optional()}).optional(),sync_id:U.string().optional(),created_at:U.number().optional(),instance:U.boolean().optional(),flags:U.number().optional(),metadata:U.object({}).optional(),platform:U.string().optional(),supported_platforms:U.array(U.string()).optional(),buttons:U.array(U.string()).optional(),hangStatus:U.string().optional()}),U.null()]).optional()}).optional()}))}).describe('Response for "GET_RELATIONSHIPS" Command'),ev=U.object({user_id:U.string(),content:U.string().min(0).max(1024).optional()}).describe('Request for "INVITE_USER_EMBEDDED" Command'),tv=U.object({id:U.string().max(64)}).describe('Request for "GET_USER" Command'),nv=U.union([U.object({id:U.string(),username:U.string(),global_name:U.union([U.string(),U.null()]).optional(),discriminator:U.string(),avatar:U.union([U.string(),U.null()]).optional(),flags:U.number(),bot:U.boolean(),avatar_decoration_data:U.union([U.object({asset:U.union([U.string(),U.null()]).optional(),skuId:U.string().optional(),expiresAt:U.number().optional()}),U.null()]).optional(),premium_type:U.union([U.number(),U.null()]).optional()}),U.null()]),iv=U.object({quest_id:U.string()}).describe('Request for "GET_QUEST_ENROLLMENT_STATUS" Command'),rv=U.object({quest_id:U.string(),is_enrolled:U.boolean(),enrolled_at:U.union([U.string(),U.null()]).optional()}).describe('Response for "GET_QUEST_ENROLLMENT_STATUS" Command'),sv=U.object({quest_id:U.string()}).describe('Request for "QUEST_START_TIMER" Command'),av=U.object({success:U.boolean()}).describe('Response for "QUEST_START_TIMER" Command'),ov=U.object({quest_id:U.string(),enrolled_at:U.union([U.string(),U.null()]).optional(),completed_at:U.union([U.string(),U.null()]).optional(),external_cta_url:U.string()}).describe('Response for "GET_QUEST" Command'),lv=U.object({ticket:U.string()}).describe('Response for "REQUEST_PROXY_TICKET_REFRESH" Command'),ft;(function(n){n.INITIATE_IMAGE_UPLOAD="INITIATE_IMAGE_UPLOAD",n.OPEN_SHARE_MOMENT_DIALOG="OPEN_SHARE_MOMENT_DIALOG",n.AUTHENTICATE="AUTHENTICATE",n.GET_ACTIVITY_INSTANCE_CONNECTED_PARTICIPANTS="GET_ACTIVITY_INSTANCE_CONNECTED_PARTICIPANTS",n.SHARE_INTERACTION="SHARE_INTERACTION",n.SHARE_LINK="SHARE_LINK",n.GET_RELATIONSHIPS="GET_RELATIONSHIPS",n.INVITE_USER_EMBEDDED="INVITE_USER_EMBEDDED",n.GET_USER="GET_USER",n.GET_QUEST_ENROLLMENT_STATUS="GET_QUEST_ENROLLMENT_STATUS",n.QUEST_START_TIMER="QUEST_START_TIMER",n.GET_QUEST="GET_QUEST",n.REQUEST_PROXY_TICKET_REFRESH="REQUEST_PROXY_TICKET_REFRESH"})(ft||(ft={}));var Lp=U.object({}).optional().nullable(),fo=U.void(),Xl={[ft.INITIATE_IMAGE_UPLOAD]:{request:fo,response:Dp},[ft.OPEN_SHARE_MOMENT_DIALOG]:{request:Zx,response:Lp},[ft.AUTHENTICATE]:{request:Kx,response:Wl},[ft.GET_ACTIVITY_INSTANCE_CONNECTED_PARTICIPANTS]:{request:fo,response:Mh},[ft.SHARE_INTERACTION]:{request:jx,response:$x},[ft.SHARE_LINK]:{request:Jx,response:Qx},[ft.GET_RELATIONSHIPS]:{request:fo,response:Eh},[ft.INVITE_USER_EMBEDDED]:{request:ev,response:Lp},[ft.GET_USER]:{request:tv,response:nv},[ft.GET_QUEST_ENROLLMENT_STATUS]:{request:iv,response:rv},[ft.QUEST_START_TIMER]:{request:sv,response:av},[ft.GET_QUEST]:{request:fo,response:ov},[ft.REQUEST_PROXY_TICKET_REFRESH]:{request:fo,response:lv}};var Th="DISPATCH",ye;(function(n){n.AUTHORIZE="AUTHORIZE",n.GET_GUILDS="GET_GUILDS",n.GET_GUILD="GET_GUILD",n.GET_CHANNEL="GET_CHANNEL",n.GET_CHANNELS="GET_CHANNELS",n.SELECT_VOICE_CHANNEL="SELECT_VOICE_CHANNEL",n.SELECT_TEXT_CHANNEL="SELECT_TEXT_CHANNEL",n.SUBSCRIBE="SUBSCRIBE",n.UNSUBSCRIBE="UNSUBSCRIBE",n.CAPTURE_SHORTCUT="CAPTURE_SHORTCUT",n.SET_CERTIFIED_DEVICES="SET_CERTIFIED_DEVICES",n.SET_ACTIVITY="SET_ACTIVITY",n.GET_SKUS="GET_SKUS",n.GET_ENTITLEMENTS="GET_ENTITLEMENTS",n.GET_SKUS_EMBEDDED="GET_SKUS_EMBEDDED",n.GET_ENTITLEMENTS_EMBEDDED="GET_ENTITLEMENTS_EMBEDDED",n.START_PURCHASE="START_PURCHASE",n.SET_CONFIG="SET_CONFIG",n.SEND_ANALYTICS_EVENT="SEND_ANALYTICS_EVENT",n.USER_SETTINGS_GET_LOCALE="USER_SETTINGS_GET_LOCALE",n.OPEN_EXTERNAL_LINK="OPEN_EXTERNAL_LINK",n.ENCOURAGE_HW_ACCELERATION="ENCOURAGE_HW_ACCELERATION",n.CAPTURE_LOG="CAPTURE_LOG",n.SET_ORIENTATION_LOCK_STATE="SET_ORIENTATION_LOCK_STATE",n.OPEN_INVITE_DIALOG="OPEN_INVITE_DIALOG",n.GET_PLATFORM_BEHAVIORS="GET_PLATFORM_BEHAVIORS",n.GET_CHANNEL_PERMISSIONS="GET_CHANNEL_PERMISSIONS",n.AUTHENTICATE="AUTHENTICATE",n.GET_ACTIVITY_INSTANCE_CONNECTED_PARTICIPANTS="GET_ACTIVITY_INSTANCE_CONNECTED_PARTICIPANTS",n.GET_QUEST="GET_QUEST",n.GET_QUEST_ENROLLMENT_STATUS="GET_QUEST_ENROLLMENT_STATUS",n.GET_RELATIONSHIPS="GET_RELATIONSHIPS",n.GET_USER="GET_USER",n.INITIATE_IMAGE_UPLOAD="INITIATE_IMAGE_UPLOAD",n.INVITE_USER_EMBEDDED="INVITE_USER_EMBEDDED",n.OPEN_SHARE_MOMENT_DIALOG="OPEN_SHARE_MOMENT_DIALOG",n.QUEST_START_TIMER="QUEST_START_TIMER",n.REQUEST_PROXY_TICKET_REFRESH="REQUEST_PROXY_TICKET_REFRESH",n.SHARE_INTERACTION="SHARE_INTERACTION",n.SHARE_LINK="SHARE_LINK"})(ye||(ye={}));var vi=xe({cmd:z(),data:fs(),evt:ea(),nonce:z()}).passthrough(),Up=Object.assign(Object.assign({},Wl.shape.scopes.element.overlayType._def.innerType.options[0].Values),{UNHANDLED:-1}),cv=un(Up),Ah=Eh.shape.relationships.element,Oi=xe({id:z(),username:z(),discriminator:z(),global_name:z().optional().nullable(),avatar:z().optional().nullable(),avatar_decoration_data:xe({asset:z(),sku_id:z().optional()}).nullable(),bot:je(),flags:He().optional().nullable(),premium_type:He().optional().nullable()}),mo=xe({user:Oi,nick:z().optional().nullable(),roles:Mt(z()),joined_at:z(),deaf:je(),mute:je()}),wh=xe({user_id:z(),nick:z().optional().nullable(),guild_id:z(),avatar:z().optional().nullable(),avatar_decoration_data:xe({asset:z(),sku_id:z().optional().nullable()}).optional().nullable(),color_string:z().optional().nullable()}),Yl=xe({id:z(),name:z().optional().nullable(),roles:Mt(z()).optional().nullable(),user:Oi.optional().nullable(),require_colons:je().optional().nullable(),managed:je().optional().nullable(),animated:je().optional().nullable(),available:je().optional().nullable()}),Rh=xe({mute:je(),deaf:je(),self_mute:je(),self_deaf:je(),suppress:je()}),go=xe({mute:je(),nick:z(),user:Oi,voice_state:Rh,volume:He()}),Op={UNHANDLED:-1,IDLE:"idle",DND:"dnd",ONLINE:"online",OFFLINE:"offline"},po=un(Op),Lr=xe({name:z(),type:He(),url:z().optional().nullable(),created_at:He().optional().nullable(),timestamps:xe({start:He(),end:He()}).partial().optional().nullable(),application_id:z().optional().nullable(),details:z().optional().nullable(),details_url:z().url().optional().nullable(),state:z().optional().nullable(),state_url:z().url().optional().nullable(),emoji:Yl.optional().nullable(),party:xe({id:z().optional().nullable(),size:Mt(He()).optional().nullable()}).optional().nullable(),assets:xe({large_image:z().nullable(),large_text:z().nullable(),large_url:z().url().optional().nullable(),small_image:z().nullable(),small_text:z().nullable(),small_url:z().url().optional().nullable()}).partial().optional().nullable(),secrets:xe({join:z(),match:z()}).partial().optional().nullable(),instance:je().optional().nullable(),flags:He().optional().nullable()}),Fp={UNHANDLED:-1,ROLE:0,MEMBER:1},Bp=xe({id:z(),type:un(Fp),allow:z(),deny:z()}),_o={UNHANDLED:-1,DM:1,GROUP_DM:3,GUILD_TEXT:0,GUILD_VOICE:2,GUILD_CATEGORY:4,GUILD_ANNOUNCEMENT:5,GUILD_STORE:6,ANNOUNCEMENT_THREAD:10,PUBLIC_THREAD:11,PRIVATE_THREAD:12,GUILD_STAGE_VOICE:13,GUILD_DIRECTORY:14,GUILD_FORUM:15},Zl=xe({id:z(),type:un(_o),guild_id:z().optional().nullable(),position:He().optional().nullable(),permission_overwrites:Mt(Bp).optional().nullable(),name:z().optional().nullable(),topic:z().optional().nullable(),nsfw:je().optional().nullable(),last_message_id:z().optional().nullable(),bitrate:He().optional().nullable(),user_limit:He().optional().nullable(),rate_limit_per_user:He().optional().nullable(),recipients:Mt(Oi).optional().nullable(),icon:z().optional().nullable(),owner_id:z().optional().nullable(),application_id:z().optional().nullable(),parent_id:z().optional().nullable(),last_pin_timestamp:z().optional().nullable()}),kp=xe({user:Oi,guild_id:z(),status:po,activities:Mt(Lr),client_status:xe({desktop:po,mobile:po,web:po}).partial()}),zp=xe({id:z(),name:z(),color:He(),hoist:je(),position:He(),permissions:z(),managed:je(),mentionable:je()}),uv=xe({id:z(),name:z(),owner_id:z(),icon:z().nullable(),icon_hash:z().optional().nullable(),splash:z().nullable(),discovery_splash:z().nullable(),owner:je().optional().nullable(),permissions:z().optional().nullable(),region:z(),afk_channel_id:z().nullable(),afk_timeout:He(),widget_enabled:je().optional().nullable(),widget_channel_id:z().optional().nullable(),verification_level:He(),default_message_notifications:He(),explicit_content_filter:He(),roles:Mt(zp),emojis:Mt(Yl),features:Mt(z()),mfa_level:He(),application_id:z().nullable(),system_channel_id:z().nullable(),system_channel_flags:He(),rules_channel_id:z().nullable(),joined_at:z().optional().nullable(),large:je().optional().nullable(),unavailable:je().optional().nullable(),member_count:He().optional().nullable(),voice_states:Mt(Rh).optional().nullable(),members:Mt(mo).optional().nullable(),channels:Mt(Zl).optional().nullable(),presences:Mt(kp).optional().nullable(),max_presences:He().optional().nullable(),max_members:He().optional().nullable(),vanity_url_code:z().nullable(),description:z().nullable(),banner:z().nullable(),premium_tier:He(),premium_subscription_count:He().optional().nullable(),preferred_locale:z(),public_updates_channel_id:z().nullable(),max_video_channel_users:He().optional().nullable(),approximate_member_count:He().optional().nullable(),approximate_presence_count:He().optional().nullable()}),Vp=xe({id:z(),guild_id:z(),type:He(),name:z()}),Gp=xe({id:z(),filename:z(),size:He(),url:z(),proxy_url:z(),height:He().optional().nullable(),width:He().optional().nullable()}),Hp=xe({text:z(),icon_url:z().optional().nullable(),proxy_icon_url:z().optional().nullable()}),ql=xe({url:z().optional().nullable(),proxy_url:z().optional().nullable(),height:He().optional().nullable(),width:He().optional().nullable()}),Wp=ql.omit({proxy_url:!0}),Xp=xe({name:z().optional().nullable(),url:z().optional().nullable()}),qp=xe({name:z().optional().nullable(),url:z().optional().nullable(),icon_url:z().optional().nullable(),proxy_icon_url:z().optional().nullable()}),Yp=xe({name:z(),value:z(),inline:je()}),Zp=xe({title:z().optional().nullable(),type:z().optional().nullable(),description:z().optional().nullable(),url:z().optional().nullable(),timestamp:z().optional().nullable(),color:He().optional().nullable(),footer:Hp.optional().nullable(),image:ql.optional().nullable(),thumbnail:ql.optional().nullable(),video:Wp.optional().nullable(),provider:Xp.optional().nullable(),author:qp.optional().nullable(),fields:Mt(Yp).optional().nullable()}),Kp=xe({count:He(),me:je(),emoji:Yl}),jp=xe({type:He(),party_id:z().optional().nullable()}),$p=xe({id:z(),cover_image:z().optional().nullable(),description:z(),icon:z().optional().nullable(),name:z()}),Jp=xe({message_id:z().optional().nullable(),channel_id:z().optional().nullable(),guild_id:z().optional().nullable()}),Ih=xe({id:z(),channel_id:z(),guild_id:z().optional().nullable(),author:Oi.optional().nullable(),member:mo.optional().nullable(),content:z(),timestamp:z(),edited_timestamp:z().optional().nullable(),tts:je(),mention_everyone:je(),mentions:Mt(Oi),mention_roles:Mt(z()),mention_channels:Mt(Vp),attachments:Mt(Gp),embeds:Mt(Zp),reactions:Mt(Kp).optional().nullable(),nonce:lo([z(),He()]).optional().nullable(),pinned:je(),webhook_id:z().optional().nullable(),type:He(),activity:jp.optional().nullable(),application:$p.optional().nullable(),message_reference:Jp.optional().nullable(),flags:He().optional().nullable(),stickers:Mt(fs()).optional().nullable(),referenced_message:fs().optional().nullable()}),Qp=xe({id:z(),name:z()}),em={UNHANDLED:-1,KEYBOARD_KEY:0,MOUSE_BUTTON:1,KEYBOARD_MODIFIER_KEY:2,GAMEPAD_BUTTON:3},Kl=xe({type:un(em),code:He(),name:z()}),tm={UNHANDLED:-1,PUSH_TO_TALK:"PUSH_TO_TALK",VOICE_ACTIVITY:"VOICE_ACTIVITY"},Ch=xe({type:un(tm),auto_threshold:je(),threshold:He(),shortcut:Mt(Kl),delay:He()}),jl=xe({device_id:z(),volume:He(),available_devices:Mt(Qp)}),nm={UNHANDLED:-1,AUDIO_INPUT:"AUDIO_INPUT",AUDIO_OUTPUT:"AUDIO_OUTPUT",VIDEO_INPUT:"VIDEO_INPUT"},hv=xe({type:un(nm),id:z(),vendor:xe({name:z(),url:z()}),model:xe({name:z(),url:z()}),related:Mt(z()),echo_cancellation:je().optional().nullable(),noise_suppression:je().optional().nullable(),automatic_gain_control:je().optional().nullable(),hardware_mute:je().optional().nullable()}),im={UNHANDLED:-1,APPLICATION:1,DLC:2,CONSUMABLE:3,BUNDLE:4,SUBSCRIPTION:5},Ph=xe({id:z(),name:z(),type:un(im),price:xe({amount:He(),currency:z()}),application_id:z(),flags:He(),release_date:z().nullable()}),rm={UNHANDLED:-1,PURCHASE:1,PREMIUM_SUBSCRIPTION:2,DEVELOPER_GIFT:3,TEST_MODE_PURCHASE:4,FREE_PURCHASE:5,USER_GIFT:6,PREMIUM_PURCHASE:7},ta=xe({id:z(),sku_id:z(),application_id:z(),user_id:z(),gift_code_flags:He(),type:un(rm),gifter_user_id:z().optional().nullable(),branches:Mt(z()).optional().nullable(),starts_at:z().optional().nullable(),ends_at:z().optional().nullable(),parent_id:z().optional().nullable(),consumed:je().optional().nullable(),deleted:je().optional().nullable(),gift_code_batch_id:z().optional().nullable()}),sm={UNHANDLED:-1,UNLOCKED:1,PORTRAIT:2,LANDSCAPE:3},dv=un(sm),am={UNHANDLED:-1,NOMINAL:0,FAIR:1,SERIOUS:2,CRITICAL:3},Nh=un(am),$l={UNHANDLED:-1,PORTRAIT:0,LANDSCAPE:1},fv=un($l),Jl={UNHANDLED:-1,FOCUSED:0,PIP:1,GRID:2},pv=un(Jl);var xo="ERROR",_t;(function(n){n.READY="READY",n.VOICE_STATE_UPDATE="VOICE_STATE_UPDATE",n.SPEAKING_START="SPEAKING_START",n.SPEAKING_STOP="SPEAKING_STOP",n.ACTIVITY_LAYOUT_MODE_UPDATE="ACTIVITY_LAYOUT_MODE_UPDATE",n.ORIENTATION_UPDATE="ORIENTATION_UPDATE",n.CURRENT_USER_UPDATE="CURRENT_USER_UPDATE",n.CURRENT_GUILD_MEMBER_UPDATE="CURRENT_GUILD_MEMBER_UPDATE",n.ENTITLEMENT_CREATE="ENTITLEMENT_CREATE",n.THERMAL_STATE_UPDATE="THERMAL_STATE_UPDATE",n.ACTIVITY_INSTANCE_PARTICIPANTS_UPDATE="ACTIVITY_INSTANCE_PARTICIPANTS_UPDATE",n.RELATIONSHIP_UPDATE="RELATIONSHIP_UPDATE",n.ACTIVITY_JOIN="ACTIVITY_JOIN",n.QUEST_ENROLLMENT_STATUS_UPDATE="QUEST_ENROLLMENT_STATUS_UPDATE"})(_t||(_t={}));var An=vi.extend({evt:sr(_t),nonce:z().nullable(),cmd:Ht(Th),data:xe({}).passthrough()}),Lh=vi.extend({evt:Ht(xo),data:xe({code:He(),message:z().optional()}).passthrough(),cmd:sr(ye),nonce:z().nullable()}),mv=An.extend({evt:z()}),om=lo([An,mv,Lh]);function lm(n){let e=n.evt;if(!(e in _t))throw new Error(`Unrecognized event type ${n.evt}`);return gv[e].payload.parse(n)}var gv={[_t.READY]:{payload:An.extend({evt:Ht(_t.READY),data:xe({v:He(),config:xe({cdn_host:z().optional(),api_endpoint:z(),environment:z()}),user:xe({id:z(),username:z(),discriminator:z(),avatar:z().optional()}).optional()})})},[_t.VOICE_STATE_UPDATE]:{payload:An.extend({evt:Ht(_t.VOICE_STATE_UPDATE),data:go}),subscribeArgs:xe({channel_id:z()})},[_t.SPEAKING_START]:{payload:An.extend({evt:Ht(_t.SPEAKING_START),data:xe({lobby_id:z().optional(),channel_id:z().optional(),user_id:z()})}),subscribeArgs:xe({lobby_id:z().nullable().optional(),channel_id:z().nullable().optional()})},[_t.SPEAKING_STOP]:{payload:An.extend({evt:Ht(_t.SPEAKING_STOP),data:xe({lobby_id:z().optional(),channel_id:z().optional(),user_id:z()})}),subscribeArgs:xe({lobby_id:z().nullable().optional(),channel_id:z().nullable().optional()})},[_t.ACTIVITY_LAYOUT_MODE_UPDATE]:{payload:An.extend({evt:Ht(_t.ACTIVITY_LAYOUT_MODE_UPDATE),data:xe({layout_mode:un(Jl)})})},[_t.ORIENTATION_UPDATE]:{payload:An.extend({evt:Ht(_t.ORIENTATION_UPDATE),data:xe({screen_orientation:un($l),orientation:sr(ho)})})},[_t.CURRENT_USER_UPDATE]:{payload:An.extend({evt:Ht(_t.CURRENT_USER_UPDATE),data:Oi})},[_t.CURRENT_GUILD_MEMBER_UPDATE]:{payload:An.extend({evt:Ht(_t.CURRENT_GUILD_MEMBER_UPDATE),data:wh}),subscribeArgs:xe({guild_id:z()})},[_t.ENTITLEMENT_CREATE]:{payload:An.extend({evt:Ht(_t.ENTITLEMENT_CREATE),data:xe({entitlement:ta})})},[_t.THERMAL_STATE_UPDATE]:{payload:An.extend({evt:Ht(_t.THERMAL_STATE_UPDATE),data:xe({thermal_state:Nh})})},[_t.ACTIVITY_INSTANCE_PARTICIPANTS_UPDATE]:{payload:An.extend({evt:Ht(_t.ACTIVITY_INSTANCE_PARTICIPANTS_UPDATE),data:xe({participants:Mh.shape.participants})})},[_t.RELATIONSHIP_UPDATE]:{payload:An.extend({evt:Ht(_t.RELATIONSHIP_UPDATE),data:Ah})},[_t.ACTIVITY_JOIN]:{payload:An.extend({evt:Ht(_t.ACTIVITY_JOIN),data:xe({applicationId:z(),secret:z()})})},[_t.QUEST_ENROLLMENT_STATUS_UPDATE]:{payload:An.extend({evt:Ht(_t.QUEST_ENROLLMENT_STATUS_UPDATE),data:xe({quest_id:z(),is_enrolled:je(),enrolled_at:z().date()})})}};function cm(n,e){throw e}var ms=xe({}).nullable(),Dh=xe({code:z()}),_v=xe({guilds:Mt(xe({id:z(),name:z()}))}),xv=xe({id:z(),name:z(),icon_url:z().optional(),members:Mt(mo)}),ps=xe({id:z(),type:un(_o),guild_id:z().optional().nullable(),name:z().optional().nullable(),topic:z().optional().nullable(),bitrate:He().optional().nullable(),user_limit:He().optional().nullable(),position:He().optional().nullable(),voice_states:Mt(go),messages:Mt(Ih)}),vv=xe({channels:Mt(Zl)}),NA=ps.nullable(),yv=ps.nullable(),Sv=ps.nullable(),LA=xe({input:jl,output:jl,mode:Ch,automatic_gain_control:je(),echo_cancellation:je(),noise_suppression:je(),qos:je(),silence_warning:je(),deaf:je(),mute:je()}),bv=xe({evt:z()}),Mv=xe({shortcut:Kl}),Uh=Lr,Oh=xe({skus:Mt(Ph)}),Fh=xe({entitlements:Mt(ta)}),Bh=Mt(ta).nullable(),kh=xe({use_interactive_pip:je()}),zh=xe({locale:z()}),Vh=xe({enabled:je()}),Gh=xe({permissions:mh().or(z())}),Hh=Hl(xe({opened:je().or(ea())}).default({opened:null})),Wh=xe({iosKeyboardResizesView:gh(je())}),um=vi.extend({cmd:sr(ye),evt:ea()});function Ev({cmd:n,data:e}){switch(n){case ye.AUTHORIZE:return Dh.parse(e);case ye.CAPTURE_SHORTCUT:return Mv.parse(e);case ye.ENCOURAGE_HW_ACCELERATION:return Vh.parse(e);case ye.GET_CHANNEL:return ps.parse(e);case ye.GET_CHANNELS:return vv.parse(e);case ye.GET_CHANNEL_PERMISSIONS:return Gh.parse(e);case ye.GET_GUILD:return xv.parse(e);case ye.GET_GUILDS:return _v.parse(e);case ye.GET_PLATFORM_BEHAVIORS:return Wh.parse(e);case ye.GET_CHANNEL:return ps.parse(e);case ye.SELECT_TEXT_CHANNEL:return Sv.parse(e);case ye.SELECT_VOICE_CHANNEL:return yv.parse(e);case ye.SET_ACTIVITY:return Uh.parse(e);case ye.GET_SKUS_EMBEDDED:return Oh.parse(e);case ye.GET_ENTITLEMENTS_EMBEDDED:return Fh.parse(e);case ye.SET_CONFIG:return kh.parse(e);case ye.START_PURCHASE:return Bh.parse(e);case ye.SUBSCRIBE:case ye.UNSUBSCRIBE:return bv.parse(e);case ye.USER_SETTINGS_GET_LOCALE:return zh.parse(e);case ye.OPEN_EXTERNAL_LINK:return Hh.parse(e);case ye.SET_ORIENTATION_LOCK_STATE:case ye.SET_CERTIFIED_DEVICES:case ye.SEND_ANALYTICS_EVENT:case ye.OPEN_INVITE_DIALOG:case ye.CAPTURE_LOG:case ye.GET_SKUS:case ye.GET_ENTITLEMENTS:return ms.parse(e);case ye.AUTHENTICATE:case ye.GET_ACTIVITY_INSTANCE_CONNECTED_PARTICIPANTS:case ye.GET_QUEST:case ye.GET_QUEST_ENROLLMENT_STATUS:case ye.GET_RELATIONSHIPS:case ye.GET_USER:case ye.INITIATE_IMAGE_UPLOAD:case ye.INVITE_USER_EMBEDDED:case ye.OPEN_SHARE_MOMENT_DIALOG:case ye.QUEST_START_TIMER:case ye.REQUEST_PROXY_TICKET_REFRESH:case ye.SHARE_INTERACTION:case ye.SHARE_LINK:let{response:t}=Xl[n];return t.parse(e);default:cm(n,new Error(`Unrecognized command ${n}`))}}function hm(n){return Object.assign(Object.assign({},n),{data:Ev(n)})}xe({frame_id:z(),platform:sr(jn).optional().nullable()});xe({v:Ht(1),encoding:Ht("json").optional(),client_id:z(),frame_id:z()});var fm=xe({code:He(),message:z().optional()}),Tv=xe({evt:z().nullable(),nonce:z().nullable(),data:fs().nullable(),cmd:z()}).passthrough();function pm(n){let e=Tv.parse(n);return e.evt!=null?e.evt===xo?Lh.parse(e):lm(om.parse(e)):hm(um.passthrough().parse(e))}function zt(n,e,t,i=()=>{}){let r=vi.extend({cmd:Ht(e),data:t});return async s=>{let a=await n({cmd:e,args:s,transfer:i(s)});return r.parse(a).data}}function Wt(n,e=()=>{}){let t=Xl[n].response,i=vi.extend({cmd:Ht(n),data:t});return r=>async s=>{let a=await r({cmd:n,args:s,transfer:e(s)});return i.parse(a).data}}var mm=n=>zt(n,ye.AUTHORIZE,Dh);var gm=n=>zt(n,ye.CAPTURE_LOG,ms);var _m=n=>zt(n,ye.ENCOURAGE_HW_ACCELERATION,Vh);var xm=n=>zt(n,ye.GET_CHANNEL,ps);var vm=n=>zt(n,ye.GET_ENTITLEMENTS_EMBEDDED,Fh);var ym=n=>zt(n,ye.GET_SKUS_EMBEDDED,Oh);var Sm=n=>zt(n,ye.GET_CHANNEL_PERMISSIONS,Gh);var bm=n=>zt(n,ye.GET_PLATFORM_BEHAVIORS,Wh);var Mm=n=>zt(n,ye.OPEN_EXTERNAL_LINK,Hh);var Em=n=>zt(n,ye.OPEN_INVITE_DIALOG,ms);Lr.pick({state:!0,state_url:!0,details:!0,details_url:!0,timestamps:!0,assets:!0,party:!0,secrets:!0,instance:!0,type:!0}).extend({type:Lr.shape.type.optional(),instance:Lr.shape.instance.optional()}).nullable();var Tm=n=>zt(n,ye.SET_ACTIVITY,Uh);var Am=n=>zt(n,ye.SET_CONFIG,kh);function wm({sendCommand:n,cmd:e,response:t,fallbackTransform:i,transferTransform:r=()=>{}}){let s=vi.extend({cmd:Ht(e),data:t});return async a=>{try{let o=await n({cmd:e,args:a,transfer:r(a)});return s.parse(o).data}catch(o){if(o.code===uo.INVALID_PAYLOAD){let c=i(a),l=await n({cmd:e,args:c,transfer:r(c)});return s.parse(l).data}else throw o}}}var Av=n=>({lock_state:n.lock_state,picture_in_picture_lock_state:n.picture_in_picture_lock_state}),Rm=n=>wm({sendCommand:n,cmd:ye.SET_ORIENTATION_LOCK_STATE,response:ms,fallbackTransform:Av});var Im=n=>zt(n,ye.START_PURCHASE,Bh);var Cm=n=>zt(n,ye.USER_SETTINGS_GET_LOCALE,zh);var Pm=Wt(ft.AUTHENTICATE);var Xh=Wt(ft.GET_ACTIVITY_INSTANCE_CONNECTED_PARTICIPANTS);var Nm=Wt(ft.GET_QUEST);var Lm=Wt(ft.GET_QUEST_ENROLLMENT_STATUS);var Dm=Wt(ft.GET_RELATIONSHIPS);var Um=Wt(ft.GET_USER);var Om=Wt(ft.INITIATE_IMAGE_UPLOAD);var Fm=Wt(ft.INVITE_USER_EMBEDDED);var Bm=Wt(ft.OPEN_SHARE_MOMENT_DIALOG);var km=Wt(ft.QUEST_START_TIMER);var zm=Wt(ft.REQUEST_PROXY_TICKET_REFRESH);var Vm=Wt(ft.SHARE_INTERACTION);var Gm=Wt(ft.SHARE_LINK);function Hm(n){return{authorize:mm(n),captureLog:gm(n),encourageHardwareAcceleration:_m(n),getChannel:xm(n),getChannelPermissions:Sm(n),getEntitlements:vm(n),getPlatformBehaviors:bm(n),getSkus:ym(n),openExternalLink:Mm(n),openInviteDialog:Em(n),setActivity:Tm(n),setConfig:Am(n),setOrientationLockState:Rm(n),startPurchase:Im(n),userSettingsGetLocale:Cm(n),getInstanceConnectedParticipants:Xh(n),authenticate:Pm(n),getActivityInstanceConnectedParticipants:Xh(n),getQuest:Nm(n),getQuestEnrollmentStatus:Lm(n),getRelationships:Dm(n),getUser:Um(n),initiateImageUpload:Om(n),inviteUserEmbedded:Fm(n),openShareMomentDialog:Bm(n),questStartTimer:km(n),requestProxyTicketRefresh:zm(n),shareInteraction:Vm(n),shareLink:Gm(n)}}var ec=class extends Error{constructor(e,t=""){super(t),this.code=e,this.message=t,this.name="Discord SDK Error"}};function qh(){return{disableConsoleLogOverride:!1}}var Wm=["log","warn","debug","info","error"];function Xm(n,e,t){let i=n[e],r=n;i&&(n[e]=function(){let s=[].slice.call(arguments),a=""+s.join(" ");t(e,a),i.apply(r,s)})}var qm="2.5.0";var wv=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),Yh={randomUUID:wv};var Zh,Rv=new Uint8Array(16);function Ym(){if(!Zh){if(typeof crypto>"u"||!crypto.getRandomValues)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");Zh=crypto.getRandomValues.bind(crypto)}return Zh(Rv)}var bn=[];for(let n=0;n<256;++n)bn.push((n+256).toString(16).slice(1));function Zm(n,e=0){return(bn[n[e+0]]+bn[n[e+1]]+bn[n[e+2]]+bn[n[e+3]]+"-"+bn[n[e+4]]+bn[n[e+5]]+"-"+bn[n[e+6]]+bn[n[e+7]]+"-"+bn[n[e+8]]+bn[n[e+9]]+"-"+bn[n[e+10]]+bn[n[e+11]]+bn[n[e+12]]+bn[n[e+13]]+bn[n[e+14]]+bn[n[e+15]]).toLowerCase()}function Kh(n,e,t){if(Yh.randomUUID&&!e&&!n)return Yh.randomUUID();n=n||{};let i=n.random??n.rng?.()??Ym();if(i.length<16)throw new Error("Random bytes length must be >= 16");return i[6]=i[6]&15|64,i[8]=i[8]&63|128,Zm(i)}var ar;(function(n){n[n.HANDSHAKE=0]="HANDSHAKE",n[n.FRAME=1]="FRAME",n[n.CLOSE=2]="CLOSE",n[n.HELLO=3]="HELLO"})(ar||(ar={}));var Iv=new Set(Cv());function Cv(){return typeof window>"u"?[]:[window.location.origin,"https://discord.com","https://discordapp.com","https://ptb.discord.com","https://ptb.discordapp.com","https://canary.discord.com","https://canary.discordapp.com","https://staging.discord.co","http://localhost:3333","https://pax.discord.com","null"]}function Pv(){var n;return[(n=window.parent.opener)!==null&&n!==void 0?n:window.parent,document.referrer?document.referrer:"*"]}var vo=class{getTransfer(e){var t;switch(e.cmd){case ye.SUBSCRIBE:case ye.UNSUBSCRIBE:return;default:return(t=e.transfer)!==null&&t!==void 0?t:void 0}}constructor(e,t){if(this.sdkVersion=qm,this.mobileAppVersion=null,this.source=null,this.sourceOrigin="",this.eventBus=new ch,this.pendingCommands=new Map,this.sendCommand=o=>{var c;if(this.source==null)throw new Error("Attempting to send message before initialization");let l=Kh();return(c=this.source)===null||c===void 0||c.postMessage([ar.FRAME,Object.assign(Object.assign({},o),{nonce:l})],this.sourceOrigin,this.getTransfer(o)),new Promise((h,d)=>{this.pendingCommands.set(l,{resolve:h,reject:d})})},this.commands=Hm(this.sendCommand),this.handleMessage=o=>{if(!Iv.has(o.origin))return;let c=o.data;if(!Array.isArray(c))return;let[l,u]=c;switch(l){case ar.HELLO:return;case ar.CLOSE:return this.handleClose(u);case ar.HANDSHAKE:return this.handleHandshake();case ar.FRAME:return this.handleFrame(u);default:throw new Error("Invalid message format")}},this.isReady=!1,this.clientId=e,this.configuration=t??qh(),typeof window<"u"&&window.addEventListener("message",this.handleMessage),typeof window>"u"){this.frameId="",this.instanceId="",this.customId=null,this.referrerId=null,this.platform=jn.DESKTOP,this.guildId=null,this.channelId=null,this.locationId=null;return}let i=new URLSearchParams(this._getSearch()),r=i.get("frame_id");if(!r)throw new Error("frame_id query param is not defined");this.frameId=r;let s=i.get("instance_id");if(!s)throw new Error("instance_id query param is not defined");this.instanceId=s;let a=i.get("platform");if(a){if(a!==jn.DESKTOP&&a!==jn.MOBILE)throw new Error(`Invalid query param "platform" of "${a}". Valid values are "${jn.DESKTOP}" or "${jn.MOBILE}"`)}else throw new Error("platform query param is not defined");this.platform=a,this.customId=i.get("custom_id"),this.referrerId=i.get("referrer_id"),this.guildId=i.get("guild_id"),this.channelId=i.get("channel_id"),this.locationId=i.get("location_id"),this.mobileAppVersion=i.get("mobile_app_version"),[this.source,this.sourceOrigin]=Pv(),this.addOnReadyListener(),this.handshake()}close(e,t){var i;window.removeEventListener("message",this.handleMessage);let r=Kh();(i=this.source)===null||i===void 0||i.postMessage([ar.CLOSE,{code:e,message:t,nonce:r}],this.sourceOrigin)}async subscribe(e,t,...i){let[r]=i,s=this.eventBus.listenerCount(e),a=this.eventBus.on(e,t);return Object.values(_t).includes(e)&&e!==_t.READY&&s===0&&await this.sendCommand({cmd:ye.SUBSCRIBE,args:r,evt:e}),a}async unsubscribe(e,t,...i){let[r]=i;return e!==_t.READY&&this.eventBus.listenerCount(e)===1&&await this.sendCommand({cmd:ye.UNSUBSCRIBE,evt:e,args:r}),this.eventBus.off(e,t)}async ready(){this.isReady||await new Promise(e=>{this.eventBus.once(_t.READY,e)})}parseMajorMobileVersion(){if(this.mobileAppVersion&&this.mobileAppVersion.includes("."))try{return parseInt(this.mobileAppVersion.split(".")[0])}catch{return bh}return bh}handshake(){var e;let t={v:1,encoding:"json",client_id:this.clientId,frame_id:this.frameId},i=this.parseMajorMobileVersion();(this.platform===jn.DESKTOP||i>=Np)&&(t.sdk_version=this.sdkVersion),(e=this.source)===null||e===void 0||e.postMessage([ar.HANDSHAKE,t],this.sourceOrigin)}addOnReadyListener(){this.eventBus.once(_t.READY,()=>{this.overrideConsoleLogging(),this.isReady=!0})}overrideConsoleLogging(){if(this.configuration.disableConsoleLogOverride)return;let e=(t,i)=>{this.commands.captureLog({level:t,message:i})};Wm.forEach(t=>{Xm(console,t,e)})}handleClose(e){fm.parse(e)}handleHandshake(){}handleFrame(e){var t,i;let r;try{r=pm(e)}catch(s){console.error("Failed to parse",e),console.error(s);return}if(r.cmd==="DISPATCH")this.eventBus.emit(r.evt,r.data);else{if(r.evt===xo){if(r.nonce!=null){(t=this.pendingCommands.get(r.nonce))===null||t===void 0||t.reject(r.data),this.pendingCommands.delete(r.nonce);return}this.eventBus.emit("error",new ec(r.data.code,r.data.message))}if(r.nonce==null){console.error("Missing nonce",e);return}(i=this.pendingCommands.get(r.nonce))===null||i===void 0||i.resolve(r),this.pendingCommands.delete(r.nonce)}}_getSearch(){return typeof window>"u"?"":window.location.search}};var na=1e9,Nv={precision:20,rounding:4,toExpNeg:-7,toExpPos:21,LN10:"2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286"},ng,Zt=!0,di="[DecimalError] ",_s=di+"Invalid argument: ",$h=di+"Exponent out of range: ",ia=Math.floor,gs=Math.pow,Lv=/^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,$n,mn=1e7,qt=7,$m=9007199254740991,tc=ia($m/qt),ke={};ke.absoluteValue=ke.abs=function(){var n=new this.constructor(this);return n.s&&(n.s=1),n};ke.comparedTo=ke.cmp=function(n){var e,t,i,r,s=this;if(n=new s.constructor(n),s.s!==n.s)return s.s||-n.s;if(s.e!==n.e)return s.e>n.e^s.s<0?1:-1;for(i=s.d.length,r=n.d.length,e=0,t=i<r?i:r;e<t;++e)if(s.d[e]!==n.d[e])return s.d[e]>n.d[e]^s.s<0?1:-1;return i===r?0:i>r^s.s<0?1:-1};ke.decimalPlaces=ke.dp=function(){var n=this,e=n.d.length-1,t=(e-n.e)*qt;if(e=n.d[e],e)for(;e%10==0;e/=10)t--;return t<0?0:t};ke.dividedBy=ke.div=function(n){return or(this,new this.constructor(n))};ke.dividedToIntegerBy=ke.idiv=function(n){var e=this,t=e.constructor;return Vt(or(e,new t(n),0,1),t.precision)};ke.equals=ke.eq=function(n){return!this.cmp(n)};ke.exponent=function(){return on(this)};ke.greaterThan=ke.gt=function(n){return this.cmp(n)>0};ke.greaterThanOrEqualTo=ke.gte=function(n){return this.cmp(n)>=0};ke.isInteger=ke.isint=function(){return this.e>this.d.length-2};ke.isNegative=ke.isneg=function(){return this.s<0};ke.isPositive=ke.ispos=function(){return this.s>0};ke.isZero=function(){return this.s===0};ke.lessThan=ke.lt=function(n){return this.cmp(n)<0};ke.lessThanOrEqualTo=ke.lte=function(n){return this.cmp(n)<1};ke.logarithm=ke.log=function(n){var e,t=this,i=t.constructor,r=i.precision,s=r+5;if(n===void 0)n=new i(10);else if(n=new i(n),n.s<1||n.eq($n))throw Error(di+"NaN");if(t.s<1)throw Error(di+(t.s?"NaN":"-Infinity"));return t.eq($n)?new i(0):(Zt=!1,e=or(yo(t,s),yo(n,s),s),Zt=!0,Vt(e,r))};ke.minus=ke.sub=function(n){var e=this;return n=new e.constructor(n),e.s==n.s?eg(e,n):Jm(e,(n.s=-n.s,n))};ke.modulo=ke.mod=function(n){var e,t=this,i=t.constructor,r=i.precision;if(n=new i(n),!n.s)throw Error(di+"NaN");return t.s?(Zt=!1,e=or(t,n,0,1).times(n),Zt=!0,t.minus(e)):Vt(new i(t),r)};ke.naturalExponential=ke.exp=function(){return Qm(this)};ke.naturalLogarithm=ke.ln=function(){return yo(this)};ke.negated=ke.neg=function(){var n=new this.constructor(this);return n.s=-n.s||0,n};ke.plus=ke.add=function(n){var e=this;return n=new e.constructor(n),e.s==n.s?Jm(e,n):eg(e,(n.s=-n.s,n))};ke.precision=ke.sd=function(n){var e,t,i,r=this;if(n!==void 0&&n!==!!n&&n!==1&&n!==0)throw Error(_s+n);if(e=on(r)+1,i=r.d.length-1,t=i*qt+1,i=r.d[i],i){for(;i%10==0;i/=10)t--;for(i=r.d[0];i>=10;i/=10)t++}return n&&e>t?e:t};ke.squareRoot=ke.sqrt=function(){var n,e,t,i,r,s,a,o=this,c=o.constructor;if(o.s<1){if(!o.s)return new c(0);throw Error(di+"NaN")}for(n=on(o),Zt=!1,r=Math.sqrt(+o),r==0||r==1/0?(e=Fi(o.d),(e.length+n)%2==0&&(e+="0"),r=Math.sqrt(e),n=ia((n+1)/2)-(n<0||n%2),r==1/0?e="5e"+n:(e=r.toExponential(),e=e.slice(0,e.indexOf("e")+1)+n),i=new c(e)):i=new c(r.toString()),t=c.precision,r=a=t+3;;)if(s=i,i=s.plus(or(o,s,a+2)).times(.5),Fi(s.d).slice(0,a)===(e=Fi(i.d)).slice(0,a)){if(e=e.slice(a-3,a+1),r==a&&e=="4999"){if(Vt(s,t+1,0),s.times(s).eq(o)){i=s;break}}else if(e!="9999")break;a+=4}return Zt=!0,Vt(i,t)};ke.times=ke.mul=function(n){var e,t,i,r,s,a,o,c,l,u=this,h=u.constructor,d=u.d,m=(n=new h(n)).d;if(!u.s||!n.s)return new h(0);for(n.s*=u.s,t=u.e+n.e,c=d.length,l=m.length,c<l&&(s=d,d=m,m=s,a=c,c=l,l=a),s=[],a=c+l,i=a;i--;)s.push(0);for(i=l;--i>=0;){for(e=0,r=c+i;r>i;)o=s[r]+m[i]*d[r-i-1]+e,s[r--]=o%mn|0,e=o/mn|0;s[r]=(s[r]+e)%mn|0}for(;!s[--a];)s.pop();return e?++t:s.shift(),n.d=s,n.e=t,Zt?Vt(n,h.precision):n};ke.toDecimalPlaces=ke.todp=function(n,e){var t=this,i=t.constructor;return t=new i(t),n===void 0?t:(Bi(n,0,na),e===void 0?e=i.rounding:Bi(e,0,8),Vt(t,n+on(t)+1,e))};ke.toExponential=function(n,e){var t,i=this,r=i.constructor;return n===void 0?t=xs(i,!0):(Bi(n,0,na),e===void 0?e=r.rounding:Bi(e,0,8),i=Vt(new r(i),n+1,e),t=xs(i,!0,n+1)),t};ke.toFixed=function(n,e){var t,i,r=this,s=r.constructor;return n===void 0?xs(r):(Bi(n,0,na),e===void 0?e=s.rounding:Bi(e,0,8),i=Vt(new s(r),n+on(r)+1,e),t=xs(i.abs(),!1,n+on(i)+1),r.isneg()&&!r.isZero()?"-"+t:t)};ke.toInteger=ke.toint=function(){var n=this,e=n.constructor;return Vt(new e(n),on(n)+1,e.rounding)};ke.toNumber=function(){return+this};ke.toPower=ke.pow=function(n){var e,t,i,r,s,a,o=this,c=o.constructor,l=12,u=+(n=new c(n));if(!n.s)return new c($n);if(o=new c(o),!o.s){if(n.s<1)throw Error(di+"Infinity");return o}if(o.eq($n))return o;if(i=c.precision,n.eq($n))return Vt(o,i);if(e=n.e,t=n.d.length-1,a=e>=t,s=o.s,a){if((t=u<0?-u:u)<=$m){for(r=new c($n),e=Math.ceil(i/qt+4),Zt=!1;t%2&&(r=r.times(o),jm(r.d,e)),t=ia(t/2),t!==0;)o=o.times(o),jm(o.d,e);return Zt=!0,n.s<0?new c($n).div(r):Vt(r,i)}}else if(s<0)throw Error(di+"NaN");return s=s<0&&n.d[Math.max(e,t)]&1?-1:1,o.s=1,Zt=!1,r=n.times(yo(o,i+l)),Zt=!0,r=Qm(r),r.s=s,r};ke.toPrecision=function(n,e){var t,i,r=this,s=r.constructor;return n===void 0?(t=on(r),i=xs(r,t<=s.toExpNeg||t>=s.toExpPos)):(Bi(n,1,na),e===void 0?e=s.rounding:Bi(e,0,8),r=Vt(new s(r),n,e),t=on(r),i=xs(r,n<=t||t<=s.toExpNeg,n)),i};ke.toSignificantDigits=ke.tosd=function(n,e){var t=this,i=t.constructor;return n===void 0?(n=i.precision,e=i.rounding):(Bi(n,1,na),e===void 0?e=i.rounding:Bi(e,0,8)),Vt(new i(t),n,e)};ke.toString=ke.valueOf=ke.val=ke.toJSON=ke[Symbol.for("nodejs.util.inspect.custom")]=function(){var n=this,e=on(n),t=n.constructor;return xs(n,e<=t.toExpNeg||e>=t.toExpPos)};function Jm(n,e){var t,i,r,s,a,o,c,l,u=n.constructor,h=u.precision;if(!n.s||!e.s)return e.s||(e=new u(n)),Zt?Vt(e,h):e;if(c=n.d,l=e.d,a=n.e,r=e.e,c=c.slice(),s=a-r,s){for(s<0?(i=c,s=-s,o=l.length):(i=l,r=a,o=c.length),a=Math.ceil(h/qt),o=a>o?a+1:o+1,s>o&&(s=o,i.length=1),i.reverse();s--;)i.push(0);i.reverse()}for(o=c.length,s=l.length,o-s<0&&(s=o,i=l,l=c,c=i),t=0;s;)t=(c[--s]=c[s]+l[s]+t)/mn|0,c[s]%=mn;for(t&&(c.unshift(t),++r),o=c.length;c[--o]==0;)c.pop();return e.d=c,e.e=r,Zt?Vt(e,h):e}function Bi(n,e,t){if(n!==~~n||n<e||n>t)throw Error(_s+n)}function Fi(n){var e,t,i,r=n.length-1,s="",a=n[0];if(r>0){for(s+=a,e=1;e<r;e++)i=n[e]+"",t=qt-i.length,t&&(s+=Dr(t)),s+=i;a=n[e],i=a+"",t=qt-i.length,t&&(s+=Dr(t))}else if(a===0)return"0";for(;a%10===0;)a/=10;return s+a}var or=(function(){function n(i,r){var s,a=0,o=i.length;for(i=i.slice();o--;)s=i[o]*r+a,i[o]=s%mn|0,a=s/mn|0;return a&&i.unshift(a),i}function e(i,r,s,a){var o,c;if(s!=a)c=s>a?1:-1;else for(o=c=0;o<s;o++)if(i[o]!=r[o]){c=i[o]>r[o]?1:-1;break}return c}function t(i,r,s){for(var a=0;s--;)i[s]-=a,a=i[s]<r[s]?1:0,i[s]=a*mn+i[s]-r[s];for(;!i[0]&&i.length>1;)i.shift()}return function(i,r,s,a){var o,c,l,u,h,d,m,x,v,g,_,T,I,E,w,R,P,y,N=i.constructor,k=i.s==r.s?1:-1,W=i.d,q=r.d;if(!i.s)return new N(i);if(!r.s)throw Error(di+"Division by zero");for(c=i.e-r.e,P=q.length,w=W.length,m=new N(k),x=m.d=[],l=0;q[l]==(W[l]||0);)++l;if(q[l]>(W[l]||0)&&--c,s==null?T=s=N.precision:a?T=s+(on(i)-on(r))+1:T=s,T<0)return new N(0);if(T=T/qt+2|0,l=0,P==1)for(u=0,q=q[0],T++;(l<w||u)&&T--;l++)I=u*mn+(W[l]||0),x[l]=I/q|0,u=I%q|0;else{for(u=mn/(q[0]+1)|0,u>1&&(q=n(q,u),W=n(W,u),P=q.length,w=W.length),E=P,v=W.slice(0,P),g=v.length;g<P;)v[g++]=0;y=q.slice(),y.unshift(0),R=q[0],q[1]>=mn/2&&++R;do u=0,o=e(q,v,P,g),o<0?(_=v[0],P!=g&&(_=_*mn+(v[1]||0)),u=_/R|0,u>1?(u>=mn&&(u=mn-1),h=n(q,u),d=h.length,g=v.length,o=e(h,v,d,g),o==1&&(u--,t(h,P<d?y:q,d))):(u==0&&(o=u=1),h=q.slice()),d=h.length,d<g&&h.unshift(0),t(v,h,g),o==-1&&(g=v.length,o=e(q,v,P,g),o<1&&(u++,t(v,P<g?y:q,g))),g=v.length):o===0&&(u++,v=[0]),x[l++]=u,o&&v[0]?v[g++]=W[E]||0:(v=[W[E]],g=1);while((E++<w||v[0]!==void 0)&&T--)}return x[0]||x.shift(),m.e=c,Vt(m,a?s+on(m)+1:s)}})();function Qm(n,e){var t,i,r,s,a,o,c=0,l=0,u=n.constructor,h=u.precision;if(on(n)>16)throw Error($h+on(n));if(!n.s)return new u($n);for(e==null?(Zt=!1,o=h):o=e,a=new u(.03125);n.abs().gte(.1);)n=n.times(a),l+=5;for(i=Math.log(gs(2,l))/Math.LN10*2+5|0,o+=i,t=r=s=new u($n),u.precision=o;;){if(r=Vt(r.times(n),o),t=t.times(++c),a=s.plus(or(r,t,o)),Fi(a.d).slice(0,o)===Fi(s.d).slice(0,o)){for(;l--;)s=Vt(s.times(s),o);return u.precision=h,e==null?(Zt=!0,Vt(s,h)):s}s=a}}function on(n){for(var e=n.e*qt,t=n.d[0];t>=10;t/=10)e++;return e}function jh(n,e,t){if(e>n.LN10.sd())throw Zt=!0,t&&(n.precision=t),Error(di+"LN10 precision limit exceeded");return Vt(new n(n.LN10),e)}function Dr(n){for(var e="";n--;)e+="0";return e}function yo(n,e){var t,i,r,s,a,o,c,l,u,h=1,d=10,m=n,x=m.d,v=m.constructor,g=v.precision;if(m.s<1)throw Error(di+(m.s?"NaN":"-Infinity"));if(m.eq($n))return new v(0);if(e==null?(Zt=!1,l=g):l=e,m.eq(10))return e==null&&(Zt=!0),jh(v,l);if(l+=d,v.precision=l,t=Fi(x),i=t.charAt(0),s=on(m),Math.abs(s)<15e14){for(;i<7&&i!=1||i==1&&t.charAt(1)>3;)m=m.times(n),t=Fi(m.d),i=t.charAt(0),h++;s=on(m),i>1?(m=new v("0."+t),s++):m=new v(i+"."+t.slice(1))}else return c=jh(v,l+2,g).times(s+""),m=yo(new v(i+"."+t.slice(1)),l-d).plus(c),v.precision=g,e==null?(Zt=!0,Vt(m,g)):m;for(o=a=m=or(m.minus($n),m.plus($n),l),u=Vt(m.times(m),l),r=3;;){if(a=Vt(a.times(u),l),c=o.plus(or(a,new v(r),l)),Fi(c.d).slice(0,l)===Fi(o.d).slice(0,l))return o=o.times(2),s!==0&&(o=o.plus(jh(v,l+2,g).times(s+""))),o=or(o,new v(h),l),v.precision=g,e==null?(Zt=!0,Vt(o,g)):o;o=c,r+=2}}function Km(n,e){var t,i,r;for((t=e.indexOf("."))>-1&&(e=e.replace(".","")),(i=e.search(/e/i))>0?(t<0&&(t=i),t+=+e.slice(i+1),e=e.substring(0,i)):t<0&&(t=e.length),i=0;e.charCodeAt(i)===48;)++i;for(r=e.length;e.charCodeAt(r-1)===48;)--r;if(e=e.slice(i,r),e){if(r-=i,t=t-i-1,n.e=ia(t/qt),n.d=[],i=(t+1)%qt,t<0&&(i+=qt),i<r){for(i&&n.d.push(+e.slice(0,i)),r-=qt;i<r;)n.d.push(+e.slice(i,i+=qt));e=e.slice(i),i=qt-e.length}else i-=r;for(;i--;)e+="0";if(n.d.push(+e),Zt&&(n.e>tc||n.e<-tc))throw Error($h+t)}else n.s=0,n.e=0,n.d=[0];return n}function Vt(n,e,t){var i,r,s,a,o,c,l,u,h=n.d;for(a=1,s=h[0];s>=10;s/=10)a++;if(i=e-a,i<0)i+=qt,r=e,l=h[u=0];else{if(u=Math.ceil((i+1)/qt),s=h.length,u>=s)return n;for(l=s=h[u],a=1;s>=10;s/=10)a++;i%=qt,r=i-qt+a}if(t!==void 0&&(s=gs(10,a-r-1),o=l/s%10|0,c=e<0||h[u+1]!==void 0||l%s,c=t<4?(o||c)&&(t==0||t==(n.s<0?3:2)):o>5||o==5&&(t==4||c||t==6&&(i>0?r>0?l/gs(10,a-r):0:h[u-1])%10&1||t==(n.s<0?8:7))),e<1||!h[0])return c?(s=on(n),h.length=1,e=e-s-1,h[0]=gs(10,(qt-e%qt)%qt),n.e=ia(-e/qt)||0):(h.length=1,h[0]=n.e=n.s=0),n;if(i==0?(h.length=u,s=1,u--):(h.length=u+1,s=gs(10,qt-i),h[u]=r>0?(l/gs(10,a-r)%gs(10,r)|0)*s:0),c)for(;;)if(u==0){(h[0]+=s)==mn&&(h[0]=1,++n.e);break}else{if(h[u]+=s,h[u]!=mn)break;h[u--]=0,s=1}for(i=h.length;h[--i]===0;)h.pop();if(Zt&&(n.e>tc||n.e<-tc))throw Error($h+on(n));return n}function eg(n,e){var t,i,r,s,a,o,c,l,u,h,d=n.constructor,m=d.precision;if(!n.s||!e.s)return e.s?e.s=-e.s:e=new d(n),Zt?Vt(e,m):e;if(c=n.d,h=e.d,i=e.e,l=n.e,c=c.slice(),a=l-i,a){for(u=a<0,u?(t=c,a=-a,o=h.length):(t=h,i=l,o=c.length),r=Math.max(Math.ceil(m/qt),o)+2,a>r&&(a=r,t.length=1),t.reverse(),r=a;r--;)t.push(0);t.reverse()}else{for(r=c.length,o=h.length,u=r<o,u&&(o=r),r=0;r<o;r++)if(c[r]!=h[r]){u=c[r]<h[r];break}a=0}for(u&&(t=c,c=h,h=t,e.s=-e.s),o=c.length,r=h.length-o;r>0;--r)c[o++]=0;for(r=h.length;r>a;){if(c[--r]<h[r]){for(s=r;s&&c[--s]===0;)c[s]=mn-1;--c[s],c[r]+=mn}c[r]-=h[r]}for(;c[--o]===0;)c.pop();for(;c[0]===0;c.shift())--i;return c[0]?(e.d=c,e.e=i,Zt?Vt(e,m):e):new d(0)}function xs(n,e,t){var i,r=on(n),s=Fi(n.d),a=s.length;return e?(t&&(i=t-a)>0?s=s.charAt(0)+"."+s.slice(1)+Dr(i):a>1&&(s=s.charAt(0)+"."+s.slice(1)),s=s+(r<0?"e":"e+")+r):r<0?(s="0."+Dr(-r-1)+s,t&&(i=t-a)>0&&(s+=Dr(i))):r>=a?(s+=Dr(r+1-a),t&&(i=t-r-1)>0&&(s=s+"."+Dr(i))):((i=r+1)<a&&(s=s.slice(0,i)+"."+s.slice(i)),t&&(i=t-a)>0&&(r+1===a&&(s+="."),s+=Dr(i))),n.s<0?"-"+s:s}function jm(n,e){if(n.length>e)return n.length=e,!0}function tg(n){var e,t,i;function r(s){var a=this;if(!(a instanceof r))return new r(s);if(a.constructor=r,s instanceof r){a.s=s.s,a.e=s.e,a.d=(s=s.d)?s.slice():s;return}if(typeof s=="number"){if(s*0!==0)throw Error(_s+s);if(s>0)a.s=1;else if(s<0)s=-s,a.s=-1;else{a.s=0,a.e=0,a.d=[0];return}if(s===~~s&&s<1e7){a.e=0,a.d=[s];return}return Km(a,s.toString())}else if(typeof s!="string")throw Error(_s+s);if(s.charCodeAt(0)===45?(s=s.slice(1),a.s=-1):a.s=1,Lv.test(s))Km(a,s);else throw Error(_s+s)}if(r.prototype=ke,r.ROUND_UP=0,r.ROUND_DOWN=1,r.ROUND_CEIL=2,r.ROUND_FLOOR=3,r.ROUND_HALF_UP=4,r.ROUND_HALF_DOWN=5,r.ROUND_HALF_EVEN=6,r.ROUND_HALF_CEIL=7,r.ROUND_HALF_FLOOR=8,r.clone=tg,r.config=r.set=Dv,n===void 0&&(n={}),n)for(i=["precision","rounding","toExpNeg","toExpPos","LN10"],e=0;e<i.length;)n.hasOwnProperty(t=i[e++])||(n[t]=this[t]);return r.config(n),r}function Dv(n){if(!n||typeof n!="object")throw Error(di+"Object expected");var e,t,i,r=["precision",1,na,"rounding",0,8,"toExpNeg",-1/0,0,"toExpPos",0,1/0];for(e=0;e<r.length;e+=3)if((i=n[t=r[e]])!==void 0)if(ia(i)===i&&i>=r[e+1]&&i<=r[e+2])this[t]=i;else throw Error(_s+t+": "+i);if((i=n[t="LN10"])!==void 0)if(i==Math.LN10)this[t]=new this(i);else throw Error(_s+t+": "+i);return this}var ng=tg(Nv);$n=new ng(1);var Y;(function(n){n.AED="aed",n.AFN="afn",n.ALL="all",n.AMD="amd",n.ANG="ang",n.AOA="aoa",n.ARS="ars",n.AUD="aud",n.AWG="awg",n.AZN="azn",n.BAM="bam",n.BBD="bbd",n.BDT="bdt",n.BGN="bgn",n.BHD="bhd",n.BIF="bif",n.BMD="bmd",n.BND="bnd",n.BOB="bob",n.BOV="bov",n.BRL="brl",n.BSD="bsd",n.BTN="btn",n.BWP="bwp",n.BYN="byn",n.BYR="byr",n.BZD="bzd",n.CAD="cad",n.CDF="cdf",n.CHE="che",n.CHF="chf",n.CHW="chw",n.CLF="clf",n.CLP="clp",n.CNY="cny",n.COP="cop",n.COU="cou",n.CRC="crc",n.CUC="cuc",n.CUP="cup",n.CVE="cve",n.CZK="czk",n.DJF="djf",n.DKK="dkk",n.DOP="dop",n.DZD="dzd",n.EGP="egp",n.ERN="ern",n.ETB="etb",n.EUR="eur",n.FJD="fjd",n.FKP="fkp",n.GBP="gbp",n.GEL="gel",n.GHS="ghs",n.GIP="gip",n.GMD="gmd",n.GNF="gnf",n.GTQ="gtq",n.GYD="gyd",n.HKD="hkd",n.HNL="hnl",n.HRK="hrk",n.HTG="htg",n.HUF="huf",n.IDR="idr",n.ILS="ils",n.INR="inr",n.IQD="iqd",n.IRR="irr",n.ISK="isk",n.JMD="jmd",n.JOD="jod",n.JPY="jpy",n.KES="kes",n.KGS="kgs",n.KHR="khr",n.KMF="kmf",n.KPW="kpw",n.KRW="krw",n.KWD="kwd",n.KYD="kyd",n.KZT="kzt",n.LAK="lak",n.LBP="lbp",n.LKR="lkr",n.LRD="lrd",n.LSL="lsl",n.LTL="ltl",n.LVL="lvl",n.LYD="lyd",n.MAD="mad",n.MDL="mdl",n.MGA="mga",n.MKD="mkd",n.MMK="mmk",n.MNT="mnt",n.MOP="mop",n.MRO="mro",n.MUR="mur",n.MVR="mvr",n.MWK="mwk",n.MXN="mxn",n.MXV="mxv",n.MYR="myr",n.MZN="mzn",n.NAD="nad",n.NGN="ngn",n.NIO="nio",n.NOK="nok",n.NPR="npr",n.NZD="nzd",n.OMR="omr",n.PAB="pab",n.PEN="pen",n.PGK="pgk",n.PHP="php",n.PKR="pkr",n.PLN="pln",n.PYG="pyg",n.QAR="qar",n.RON="ron",n.RSD="rsd",n.RUB="rub",n.RWF="rwf",n.SAR="sar",n.SBD="sbd",n.SCR="scr",n.SDG="sdg",n.SEK="sek",n.SGD="sgd",n.SHP="shp",n.SLL="sll",n.SOS="sos",n.SRD="srd",n.SSP="ssp",n.STD="std",n.SVC="svc",n.SYP="syp",n.SZL="szl",n.THB="thb",n.TJS="tjs",n.TMT="tmt",n.TND="tnd",n.TOP="top",n.TRY="try",n.TTD="ttd",n.TWD="twd",n.TZS="tzs",n.UAH="uah",n.UGX="ugx",n.USD="usd",n.USN="usn",n.USS="uss",n.UYI="uyi",n.UYU="uyu",n.UZS="uzs",n.VEF="vef",n.VND="vnd",n.VUV="vuv",n.WST="wst",n.XAF="xaf",n.XAG="xag",n.XAU="xau",n.XBA="xba",n.XBB="xbb",n.XBC="xbc",n.XBD="xbd",n.XCD="xcd",n.XDR="xdr",n.XFU="xfu",n.XOF="xof",n.XPD="xpd",n.XPF="xpf",n.XPT="xpt",n.XSU="xsu",n.XTS="xts",n.XUA="xua",n.YER="yer",n.ZAR="zar",n.ZMW="zmw",n.ZWL="zwl"})(Y||(Y={}));var Uv={[Y.AED]:2,[Y.AFN]:2,[Y.ALL]:2,[Y.AMD]:2,[Y.ANG]:2,[Y.AOA]:2,[Y.ARS]:2,[Y.AUD]:2,[Y.AWG]:2,[Y.AZN]:2,[Y.BAM]:2,[Y.BBD]:2,[Y.BDT]:2,[Y.BGN]:2,[Y.BHD]:3,[Y.BIF]:0,[Y.BMD]:2,[Y.BND]:2,[Y.BOB]:2,[Y.BOV]:2,[Y.BRL]:2,[Y.BSD]:2,[Y.BTN]:2,[Y.BWP]:2,[Y.BYR]:0,[Y.BYN]:2,[Y.BZD]:2,[Y.CAD]:2,[Y.CDF]:2,[Y.CHE]:2,[Y.CHF]:2,[Y.CHW]:2,[Y.CLF]:0,[Y.CLP]:0,[Y.CNY]:2,[Y.COP]:2,[Y.COU]:2,[Y.CRC]:2,[Y.CUC]:2,[Y.CUP]:2,[Y.CVE]:2,[Y.CZK]:2,[Y.DJF]:0,[Y.DKK]:2,[Y.DOP]:2,[Y.DZD]:2,[Y.EGP]:2,[Y.ERN]:2,[Y.ETB]:2,[Y.EUR]:2,[Y.FJD]:2,[Y.FKP]:2,[Y.GBP]:2,[Y.GEL]:2,[Y.GHS]:2,[Y.GIP]:2,[Y.GMD]:2,[Y.GNF]:0,[Y.GTQ]:2,[Y.GYD]:2,[Y.HKD]:2,[Y.HNL]:2,[Y.HRK]:2,[Y.HTG]:2,[Y.HUF]:2,[Y.IDR]:2,[Y.ILS]:2,[Y.INR]:2,[Y.IQD]:3,[Y.IRR]:2,[Y.ISK]:0,[Y.JMD]:2,[Y.JOD]:3,[Y.JPY]:0,[Y.KES]:2,[Y.KGS]:2,[Y.KHR]:2,[Y.KMF]:0,[Y.KPW]:2,[Y.KRW]:0,[Y.KWD]:3,[Y.KYD]:2,[Y.KZT]:2,[Y.LAK]:2,[Y.LBP]:2,[Y.LKR]:2,[Y.LRD]:2,[Y.LSL]:2,[Y.LTL]:2,[Y.LVL]:2,[Y.LYD]:3,[Y.MAD]:2,[Y.MDL]:2,[Y.MGA]:2,[Y.MKD]:2,[Y.MMK]:2,[Y.MNT]:2,[Y.MOP]:2,[Y.MRO]:2,[Y.MUR]:2,[Y.MVR]:2,[Y.MWK]:2,[Y.MXN]:2,[Y.MXV]:2,[Y.MYR]:2,[Y.MZN]:2,[Y.NAD]:2,[Y.NGN]:2,[Y.NIO]:2,[Y.NOK]:2,[Y.NPR]:2,[Y.NZD]:2,[Y.OMR]:3,[Y.PAB]:2,[Y.PEN]:2,[Y.PGK]:2,[Y.PHP]:2,[Y.PKR]:2,[Y.PLN]:2,[Y.PYG]:0,[Y.QAR]:2,[Y.RON]:2,[Y.RSD]:2,[Y.RUB]:2,[Y.RWF]:0,[Y.SAR]:2,[Y.SBD]:2,[Y.SCR]:2,[Y.SDG]:2,[Y.SEK]:2,[Y.SGD]:2,[Y.SHP]:2,[Y.SLL]:2,[Y.SOS]:2,[Y.SRD]:2,[Y.SSP]:2,[Y.STD]:2,[Y.SVC]:2,[Y.SYP]:2,[Y.SZL]:2,[Y.THB]:2,[Y.TJS]:2,[Y.TMT]:2,[Y.TND]:3,[Y.TOP]:2,[Y.TRY]:2,[Y.TTD]:2,[Y.TWD]:2,[Y.TZS]:2,[Y.UAH]:2,[Y.UGX]:0,[Y.USD]:2,[Y.USN]:2,[Y.USS]:2,[Y.UYI]:0,[Y.UYU]:2,[Y.UZS]:2,[Y.VEF]:2,[Y.VND]:0,[Y.VUV]:0,[Y.WST]:2,[Y.XAF]:0,[Y.XAG]:0,[Y.XAU]:0,[Y.XBA]:0,[Y.XBB]:0,[Y.XBC]:0,[Y.XBD]:0,[Y.XCD]:2,[Y.XDR]:0,[Y.XFU]:0,[Y.XOF]:0,[Y.XPD]:0,[Y.XPF]:0,[Y.XPT]:0,[Y.XSU]:0,[Y.XTS]:0,[Y.XUA]:0,[Y.YER]:2,[Y.ZAR]:2,[Y.ZMW]:2,[Y.ZWL]:2};var ra={exports:{}};ra.exports;var ig;function rg(){return ig?ra.exports:(ig=1,(function(n,e){var t=200,i="Expected a function",r="__lodash_hash_undefined__",s=1,a=2,o=1/0,c=9007199254740991,l="[object Arguments]",u="[object Array]",h="[object Boolean]",d="[object Date]",m="[object Error]",x="[object Function]",v="[object GeneratorFunction]",g="[object Map]",_="[object Number]",T="[object Object]",I="[object Promise]",E="[object RegExp]",w="[object Set]",R="[object String]",P="[object Symbol]",y="[object WeakMap]",N="[object ArrayBuffer]",k="[object DataView]",W="[object Float32Array]",q="[object Float64Array]",ee="[object Int8Array]",X="[object Int16Array]",Q="[object Int32Array]",oe="[object Uint8Array]",re="[object Uint8ClampedArray]",me="[object Uint16Array]",ne="[object Uint32Array]",le=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,he=/^\w*$/,Ge=/^\./,Ne=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,vt=/[\\^$.*+?()[\]{}|]/g,ie=/\\(\\)?/g,Te=/^\[object .+?Constructor\]$/,K=/^(?:0|[1-9]\d*)$/,$={};$[W]=$[q]=$[ee]=$[X]=$[Q]=$[oe]=$[re]=$[me]=$[ne]=!0,$[l]=$[u]=$[N]=$[h]=$[k]=$[d]=$[m]=$[x]=$[g]=$[_]=$[T]=$[E]=$[w]=$[R]=$[y]=!1;var be=typeof eo=="object"&&eo&&eo.Object===Object&&eo,Ie=typeof self=="object"&&self&&self.Object===Object&&self,de=be||Ie||Function("return this")(),Ke=e&&!e.nodeType&&e,Rt=Ke&&!0&&n&&!n.nodeType&&n,it=Rt&&Rt.exports===Ke,pt=it&&be.process,It=(function(){try{return pt&&pt.binding("util")}catch{}})(),dt=It&&It.isTypedArray;function Nt(b,O){for(var se=-1,ve=b?b.length:0;++se<ve&&O(b[se],se,b)!==!1;);return b}function Jt(b,O){for(var se=-1,ve=b?b.length:0;++se<ve;)if(O(b[se],se,b))return!0;return!1}function Qt(b){return function(O){return O?.[b]}}function Ot(b,O){for(var se=-1,ve=Array(b);++se<b;)ve[se]=O(se);return ve}function Xt(b){return function(O){return b(O)}}function G(b,O){return b?.[O]}function Fe(b){var O=!1;if(b!=null&&typeof b.toString!="function")try{O=!!(b+"")}catch{}return O}function gt(b){var O=-1,se=Array(b.size);return b.forEach(function(ve,st){se[++O]=[st,ve]}),se}function p(b,O){return function(se){return b(O(se))}}function f(b){var O=-1,se=Array(b.size);return b.forEach(function(ve){se[++O]=ve}),se}var S=Array.prototype,A=Function.prototype,C=Object.prototype,L=de["__core-js_shared__"],H=(function(){var b=/[^.]+$/.exec(L&&L.keys&&L.keys.IE_PROTO||"");return b?"Symbol(src)_1."+b:""})(),D=A.toString,F=C.hasOwnProperty,ae=C.toString,ge=RegExp("^"+D.call(F).replace(vt,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),ue=de.Symbol,fe=de.Uint8Array,Ce=p(Object.getPrototypeOf,Object),Ue=Object.create,tt=C.propertyIsEnumerable,V=S.splice,Me=p(Object.keys,Object),ce=Ws(de,"DataView"),Se=Ws(de,"Map"),Ae=Ws(de,"Promise"),pe=Ws(de,"Set"),Xe=Ws(de,"WeakMap"),Be=Ws(Object,"create"),Ft=jr(ce),At=jr(Se),Yn=jr(Ae),si=jr(pe),th=jr(Xe),ks=ue?ue.prototype:void 0,zs=ks?ks.valueOf:void 0,Vs=ks?ks.toString:void 0;function Ji(b){var O=-1,se=b?b.length:0;for(this.clear();++O<se;){var ve=b[O];this.set(ve[0],ve[1])}}function xl(){this.__data__=Be?Be(null):{}}function vl(b){return this.has(b)&&delete this.__data__[b]}function Qi(b){var O=this.__data__;if(Be){var se=O[b];return se===r?void 0:se}return F.call(O,b)?O[b]:void 0}function Ja(b){var O=this.__data__;return Be?O[b]!==void 0:F.call(O,b)}function yl(b,O){var se=this.__data__;return se[b]=Be&&O===void 0?r:O,this}Ji.prototype.clear=xl,Ji.prototype.delete=vl,Ji.prototype.get=Qi,Ji.prototype.has=Ja,Ji.prototype.set=yl;function ai(b){var O=-1,se=b?b.length:0;for(this.clear();++O<se;){var ve=b[O];this.set(ve[0],ve[1])}}function Gs(){this.__data__=[]}function Sl(b){var O=this.__data__,se=lt(O,b);if(se<0)return!1;var ve=O.length-1;return se==ve?O.pop():V.call(O,se,1),!0}function Hs(b){var O=this.__data__,se=lt(O,b);return se<0?void 0:O[se][1]}function bl(b){return lt(this.__data__,b)>-1}function Ml(b,O){var se=this.__data__,ve=lt(se,b);return ve<0?se.push([b,O]):se[ve][1]=O,this}ai.prototype.clear=Gs,ai.prototype.delete=Sl,ai.prototype.get=Hs,ai.prototype.has=bl,ai.prototype.set=Ml;function gi(b){var O=-1,se=b?b.length:0;for(this.clear();++O<se;){var ve=b[O];this.set(ve[0],ve[1])}}function nh(){this.__data__={hash:new Ji,map:new(Se||ai),string:new Ji}}function ih(b){return Tl(this,b).delete(b)}function rh(b){return Tl(this,b).get(b)}function El(b){return Tl(this,b).has(b)}function M(b,O){return Tl(this,b).set(b,O),this}gi.prototype.clear=nh,gi.prototype.delete=ih,gi.prototype.get=rh,gi.prototype.has=El,gi.prototype.set=M;function B(b){var O=-1,se=b?b.length:0;for(this.__data__=new gi;++O<se;)this.add(b[O])}function te(b){return this.__data__.set(b,r),this}function J(b){return this.__data__.has(b)}B.prototype.add=B.prototype.push=te,B.prototype.has=J;function j(b){this.__data__=new ai(b)}function we(){this.__data__=new ai}function Oe(b){return this.__data__.delete(b)}function Ee(b){return this.__data__.get(b)}function ze(b){return this.__data__.has(b)}function We(b,O){var se=this.__data__;if(se instanceof ai){var ve=se.__data__;if(!Se||ve.length<t-1)return ve.push([b,O]),this;se=this.__data__=new gi(ve)}return se.set(b,O),this}j.prototype.clear=we,j.prototype.delete=Oe,j.prototype.get=Ee,j.prototype.has=ze,j.prototype.set=We;function ot(b,O){var se=er(b)||dp(b)?Ot(b.length,String):[],ve=se.length,st=!!ve;for(var qe in b)F.call(b,qe)&&!(st&&(qe=="length"||lp(qe,ve)))&&se.push(qe);return se}function lt(b,O){for(var se=b.length;se--;)if(hp(b[se][0],O))return se;return-1}function Ve(b){return Xs(b)?Ue(b):{}}var wt=Er();function en(b,O){return b&&wt(b,O,Il)}function Bt(b,O){O=Al(O,b)?[O]:_i(O);for(var se=0,ve=O.length;b!=null&&se<ve;)b=b[wl(O[se++])];return se&&se==ve?b:void 0}function Lt(b){return ae.call(b)}function pn(b,O){return b!=null&&O in Object(b)}function Le(b,O,se,ve,st){return b===O?!0:b==null||O==null||!Xs(b)&&!Rl(O)?b!==b&&O!==O:yn(b,O,Le,se,ve,st)}function yn(b,O,se,ve,st,qe){var yt=er(b),sn=er(O),tn=u,En=u;yt||(tn=Tr(b),tn=tn==l?T:tn),sn||(En=Tr(O),En=En==l?T:En);var Fn=tn==T&&!Fe(b),Bn=En==T&&!Fe(O),Cn=tn==En;if(Cn&&!Fn)return qe||(qe=new j),yt||pp(b)?Qa(b,O,se,ve,st,qe):T0(b,O,tn,se,ve,st,qe);if(!(st&a)){var li=Fn&&F.call(b,"__wrapped__"),ci=Bn&&F.call(O,"__wrapped__");if(li||ci){var Ar=li?b.value():b,tr=ci?O.value():O;return qe||(qe=new j),se(Ar,tr,ve,st,qe)}}return Cn?(qe||(qe=new j),A0(b,O,se,ve,st,qe)):!1}function Et(b,O,se,ve){var st=se.length,qe=st;if(b==null)return!qe;for(b=Object(b);st--;){var yt=se[st];if(yt[2]?yt[1]!==b[yt[0]]:!(yt[0]in b))return!1}for(;++st<qe;){yt=se[st];var sn=yt[0],tn=b[sn],En=yt[1];if(yt[2]){if(tn===void 0&&!(sn in b))return!1}else{var Fn=new j,Bn;if(!(Bn===void 0?Le(En,tn,ve,s|a,Fn):Bn))return!1}}return!0}function On(b){if(!Xs(b)||C0(b))return!1;var O=ah(b)||Fe(b)?ge:Te;return O.test(jr(b))}function oi(b){return Rl(b)&&oh(b.length)&&!!$[ae.call(b)]}function Ni(b){return typeof b=="function"?b:b==null?B0:typeof b=="object"?er(b)?Kt(b[0],b[1]):Ct(b):k0(b)}function Mr(b){if(!P0(b))return Me(b);var O=[];for(var se in Object(b))F.call(b,se)&&se!="constructor"&&O.push(se);return O}function Ct(b){var O=w0(b);return O.length==1&&O[0][2]?up(O[0][0],O[0][1]):function(se){return se===b||Et(se,b,O)}}function Kt(b,O){return Al(b)&&cp(O)?up(wl(b),O):function(se){var ve=U0(se,b);return ve===void 0&&ve===O?O0(se,b):Le(O,ve,void 0,s|a)}}function Li(b){return function(O){return Bt(O,b)}}function kt(b){if(typeof b=="string")return b;if(lh(b))return Vs?Vs.call(b):"";var O=b+"";return O=="0"&&1/b==-o?"-0":O}function _i(b){return er(b)?b:N0(b)}function Er(b){return function(O,se,ve){for(var st=-1,qe=Object(O),yt=ve(O),sn=yt.length;sn--;){var tn=yt[++st];if(se(qe[tn],tn,qe)===!1)break}return O}}function Qa(b,O,se,ve,st,qe){var yt=st&a,sn=b.length,tn=O.length;if(sn!=tn&&!(yt&&tn>sn))return!1;var En=qe.get(b);if(En&&qe.get(O))return En==O;var Fn=-1,Bn=!0,Cn=st&s?new B:void 0;for(qe.set(b,O),qe.set(O,b);++Fn<sn;){var li=b[Fn],ci=O[Fn];if(ve)var Ar=yt?ve(ci,li,Fn,O,b,qe):ve(li,ci,Fn,b,O,qe);if(Ar!==void 0){if(Ar)continue;Bn=!1;break}if(Cn){if(!Jt(O,function(tr,$r){if(!Cn.has($r)&&(li===tr||se(li,tr,ve,st,qe)))return Cn.add($r)})){Bn=!1;break}}else if(!(li===ci||se(li,ci,ve,st,qe))){Bn=!1;break}}return qe.delete(b),qe.delete(O),Bn}function T0(b,O,se,ve,st,qe,yt){switch(se){case k:if(b.byteLength!=O.byteLength||b.byteOffset!=O.byteOffset)return!1;b=b.buffer,O=O.buffer;case N:return!(b.byteLength!=O.byteLength||!ve(new fe(b),new fe(O)));case h:case d:case _:return hp(+b,+O);case m:return b.name==O.name&&b.message==O.message;case E:case R:return b==O+"";case g:var sn=gt;case w:var tn=qe&a;if(sn||(sn=f),b.size!=O.size&&!tn)return!1;var En=yt.get(b);if(En)return En==O;qe|=s,yt.set(b,O);var Fn=Qa(sn(b),sn(O),ve,st,qe,yt);return yt.delete(b),Fn;case P:if(zs)return zs.call(b)==zs.call(O)}return!1}function A0(b,O,se,ve,st,qe){var yt=st&a,sn=Il(b),tn=sn.length,En=Il(O),Fn=En.length;if(tn!=Fn&&!yt)return!1;for(var Bn=tn;Bn--;){var Cn=sn[Bn];if(!(yt?Cn in O:F.call(O,Cn)))return!1}var li=qe.get(b);if(li&&qe.get(O))return li==O;var ci=!0;qe.set(b,O),qe.set(O,b);for(var Ar=yt;++Bn<tn;){Cn=sn[Bn];var tr=b[Cn],$r=O[Cn];if(ve)var mp=yt?ve($r,tr,Cn,O,b,qe):ve(tr,$r,Cn,b,O,qe);if(!(mp===void 0?tr===$r||se(tr,$r,ve,st,qe):mp)){ci=!1;break}Ar||(Ar=Cn=="constructor")}if(ci&&!Ar){var Cl=b.constructor,Pl=O.constructor;Cl!=Pl&&"constructor"in b&&"constructor"in O&&!(typeof Cl=="function"&&Cl instanceof Cl&&typeof Pl=="function"&&Pl instanceof Pl)&&(ci=!1)}return qe.delete(b),qe.delete(O),ci}function Tl(b,O){var se=b.__data__;return I0(O)?se[typeof O=="string"?"string":"hash"]:se.map}function w0(b){for(var O=Il(b),se=O.length;se--;){var ve=O[se],st=b[ve];O[se]=[ve,st,cp(st)]}return O}function Ws(b,O){var se=G(b,O);return On(se)?se:void 0}var Tr=Lt;(ce&&Tr(new ce(new ArrayBuffer(1)))!=k||Se&&Tr(new Se)!=g||Ae&&Tr(Ae.resolve())!=I||pe&&Tr(new pe)!=w||Xe&&Tr(new Xe)!=y)&&(Tr=function(b){var O=ae.call(b),se=O==T?b.constructor:void 0,ve=se?jr(se):void 0;if(ve)switch(ve){case Ft:return k;case At:return g;case Yn:return I;case si:return w;case th:return y}return O});function R0(b,O,se){O=Al(O,b)?[O]:_i(O);for(var ve,st=-1,yt=O.length;++st<yt;){var qe=wl(O[st]);if(!(ve=b!=null&&se(b,qe)))break;b=b[qe]}if(ve)return ve;var yt=b?b.length:0;return!!yt&&oh(yt)&&lp(qe,yt)&&(er(b)||dp(b))}function lp(b,O){return O=O??c,!!O&&(typeof b=="number"||K.test(b))&&b>-1&&b%1==0&&b<O}function Al(b,O){if(er(b))return!1;var se=typeof b;return se=="number"||se=="symbol"||se=="boolean"||b==null||lh(b)?!0:he.test(b)||!le.test(b)||O!=null&&b in Object(O)}function I0(b){var O=typeof b;return O=="string"||O=="number"||O=="symbol"||O=="boolean"?b!=="__proto__":b===null}function C0(b){return!!H&&H in b}function P0(b){var O=b&&b.constructor,se=typeof O=="function"&&O.prototype||C;return b===se}function cp(b){return b===b&&!Xs(b)}function up(b,O){return function(se){return se==null?!1:se[b]===O&&(O!==void 0||b in Object(se))}}var N0=sh(function(b){b=D0(b);var O=[];return Ge.test(b)&&O.push(""),b.replace(Ne,function(se,ve,st,qe){O.push(st?qe.replace(ie,"$1"):ve||se)}),O});function wl(b){if(typeof b=="string"||lh(b))return b;var O=b+"";return O=="0"&&1/b==-o?"-0":O}function jr(b){if(b!=null){try{return D.call(b)}catch{}try{return b+""}catch{}}return""}function sh(b,O){if(typeof b!="function"||O&&typeof O!="function")throw new TypeError(i);var se=function(){var ve=arguments,st=O?O.apply(this,ve):ve[0],qe=se.cache;if(qe.has(st))return qe.get(st);var yt=b.apply(this,ve);return se.cache=qe.set(st,yt),yt};return se.cache=new(sh.Cache||gi),se}sh.Cache=gi;function hp(b,O){return b===O||b!==b&&O!==O}function dp(b){return L0(b)&&F.call(b,"callee")&&(!tt.call(b,"callee")||ae.call(b)==l)}var er=Array.isArray;function fp(b){return b!=null&&oh(b.length)&&!ah(b)}function L0(b){return Rl(b)&&fp(b)}function ah(b){var O=Xs(b)?ae.call(b):"";return O==x||O==v}function oh(b){return typeof b=="number"&&b>-1&&b%1==0&&b<=c}function Xs(b){var O=typeof b;return!!b&&(O=="object"||O=="function")}function Rl(b){return!!b&&typeof b=="object"}function lh(b){return typeof b=="symbol"||Rl(b)&&ae.call(b)==P}var pp=dt?Xt(dt):oi;function D0(b){return b==null?"":kt(b)}function U0(b,O,se){var ve=b==null?void 0:Bt(b,O);return ve===void 0?se:ve}function O0(b,O){return b!=null&&R0(b,O,pn)}function Il(b){return fp(b)?ot(b):Mr(b)}function F0(b,O,se){var ve=er(b)||pp(b);if(O=Ni(O),se==null)if(ve||Xs(b)){var st=b.constructor;ve?se=er(b)?new st:[]:se=ah(st)?Ve(Ce(b)):{}}else se={};return(ve?Nt:en)(b,function(qe,yt,sn){return O(se,qe,yt,sn)}),se}function B0(b){return b}function k0(b){return Al(b)?Qt(wl(b)):Li(b)}n.exports=F0})(ra,ra.exports),ra.exports)}var JR=rg();var{Commands:SI}=Ql;function sg(n){let e=new Audio(n.href);e.loop=!0,e.volume=.25,e.preload="auto";let t=document.createElement("button");t.type="button",t.style.cssText="position:fixed;right:16px;bottom:16px;padding:8px 12px;border:1px solid #b49760;border-radius:4px;background:#201b18dd;color:#e8d5ad;cursor:pointer;font:12px system-ui";let i=!1,r=!1;try{i=localStorage.getItem("anterose-music-muted")==="1"}catch{}function s(){t.textContent=i?"\u266B Musique coup\xE9e":e.paused?"\u266B Activer la musique":"\u266B Musique",t.setAttribute("aria-label",i||e.paused?"Activer la musique":"Couper la musique"),t.setAttribute("aria-pressed",String(!i&&!e.paused))}async function a(){if(!(i||r||!e.paused)){r=!0;try{await e.play()}catch{}finally{r=!1,s()}}}function o(c){c.target!==t&&(c.type==="keydown"&&c.repeat||a())}return t.addEventListener("click",()=>{i=!e.paused&&!i,i?e.pause():a();try{localStorage.setItem("anterose-music-muted",i?"1":"0")}catch{}s()}),e.addEventListener("playing",s),e.addEventListener("pause",s),e.addEventListener("error",()=>{t.textContent="\u266B Musique indisponible",t.title="Le fichier audio n\u2019a pas pu \xEAtre charg\xE9."}),document.body.append(t),document.addEventListener("pointerdown",o),document.addEventListener("keydown",o),s(),a(),{dispose(){e.pause(),document.removeEventListener("pointerdown",o),document.removeEventListener("keydown",o),e.removeAttribute("src"),e.load(),t.remove()}}}var Xg=0,Ud=1,qg=2;var el=1,Yg=2,ka=3,qi=0,Dn=1,Un=2,Yi=0,za=1,Od=2,Fd=3,Bd=4,Zg=5;var Ps=100,Kg=101,jg=102,$g=103,Jg=104,Qg=200,e_=201,t_=202,n_=203,kd=204,zd=205,i_=206,r_=207,s_=208,a_=209,o_=210,l_=211,c_=212,u_=213,h_=214,Cc=0,Pc=1,Nc=2,ya=3,Lc=4,Dc=5,Uc=6,Oc=7,Vd=0,d_=1,f_=2,Ri=0,Gd=1,Hd=2,Wd=3,Xd=4,qd=5,Yd=6,Zd=7,bd="attached",p_="detached",Kd=300,qr=301,Ns=302,tu=303,nu=304,tl=306,Gr=1e3,pi=1001,Sa=1002,Yt=1003,iu=1004;var Ls=1005;var jt=1006,Va=1007;var Ii=1008;var qn=1009,jd=1010,$d=1011,Ga=1012,ru=1013,Ci=1014,ii=1015,Pi=1016,su=1017,au=1018,Ha=1020,Jd=35902,Qd=35899,ef=1021,tf=1022,ri=1023,Vi=1026,Yr=1027,ou=1028,lu=1029,Zr=1030,cu=1031;var uu=1033,nl=33776,il=33777,rl=33778,sl=33779,hu=35840,du=35841,fu=35842,pu=35843,mu=36196,gu=37492,_u=37496,xu=37488,vu=37489,al=37490,yu=37491,Su=37808,bu=37809,Mu=37810,Eu=37811,Tu=37812,Au=37813,wu=37814,Ru=37815,Iu=37816,Cu=37817,Pu=37818,Nu=37819,Lu=37820,Du=37821,Uu=36492,Ou=36494,Fu=36495,Bu=36283,ku=36284,ol=36285,zu=36286;var Es=2300,Ts=2301,wc=2302,Md=2303,Ed=2400,Td=2401,Ad=2402,m_=2500;var nf=0,ll=1,Wa=2,g_=3200;var Vu=0,__=1,br="",nn="srgb",Ln="srgb-linear",Po="linear",Pt="srgb";var Rc=7680;var x_=519,v_=512,y_=513,S_=514,Gu=515,b_=516,M_=517,Hu=518,E_=519,rf=35044;var sf="300 es",Ti=2e3,ba=2001;function Ov(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Fv(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function Ma(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function T_(){let n=Ma("canvas");return n.style.display="block",n}var ag={},Ea=null;function No(...n){let e="THREE."+n.shift();Ea?Ea("log",e,...n):console.log(e,...n)}function A_(n){let e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Ye(...n){n=A_(n);let e="THREE."+n.shift();if(Ea)Ea("warn",e,...n);else{let t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Qe(...n){n=A_(n);let e="THREE."+n.shift();if(Ea)Ea("error",e,...n);else{let t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Ms(...n){let e=n.join(" ");e in ag||(ag[e]=!0,Ye(...n))}function w_(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}var R_={[Cc]:Pc,[Nc]:Uc,[Lc]:Oc,[ya]:Dc,[Pc]:Cc,[Uc]:Nc,[Oc]:Lc,[Dc]:ya},Gi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let r=i[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}},wn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],og=1234567,Io=Math.PI/180,As=180/Math.PI;function wi(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(wn[n&255]+wn[n>>8&255]+wn[n>>16&255]+wn[n>>24&255]+"-"+wn[e&255]+wn[e>>8&255]+"-"+wn[e>>16&15|64]+wn[e>>24&255]+"-"+wn[t&63|128]+wn[t>>8&255]+"-"+wn[t>>16&255]+wn[t>>24&255]+wn[i&255]+wn[i>>8&255]+wn[i>>16&255]+wn[i>>24&255]).toLowerCase()}function bt(n,e,t){return Math.max(e,Math.min(t,n))}function af(n,e){return(n%e+e)%e}function Bv(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function kv(n,e,t){return n!==e?(t-n)/(e-n):0}function Co(n,e,t){return(1-t)*n+t*e}function zv(n,e,t,i){return Co(n,e,1-Math.exp(-t*i))}function Vv(n,e=1){return e-Math.abs(af(n,e*2)-e)}function Gv(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function Hv(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function Wv(n,e){return n+Math.floor(Math.random()*(e-n+1))}function Xv(n,e){return n+Math.random()*(e-n)}function qv(n){return n*(.5-Math.random())}function Yv(n){n!==void 0&&(og=n);let e=og+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Zv(n){return n*Io}function Kv(n){return n*As}function jv(n){return n>0&&Number.isInteger(n)&&2**Math.round(Math.log2(n))===n}function $v(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Jv(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Qv(n,e,t,i,r){let s=Math.cos,a=Math.sin,o=s(t/2),c=a(t/2),l=s((e+i)/2),u=a((e+i)/2),h=s((e-i)/2),d=a((e-i)/2),m=s((i-e)/2),x=a((i-e)/2);switch(r){case"XYX":n.set(o*u,c*h,c*d,o*l);break;case"YZY":n.set(c*d,o*u,c*h,o*l);break;case"ZXZ":n.set(c*h,c*d,o*u,o*l);break;case"XZX":n.set(o*u,c*x,c*m,o*l);break;case"YXY":n.set(c*m,o*u,c*x,o*l);break;case"ZYZ":n.set(c*x,c*m,o*u,o*l);break;default:Ye("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Ei(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Dt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Xa={DEG2RAD:Io,RAD2DEG:As,generateUUID:wi,clamp:bt,euclideanModulo:af,mapLinear:Bv,inverseLerp:kv,lerp:Co,damp:zv,pingpong:Vv,smoothstep:Gv,smootherstep:Hv,randInt:Wv,randFloat:Xv,randFloatSpread:qv,seededRandom:Yv,degToRad:Zv,radToDeg:Kv,isPowerOfTwo:jv,ceilPowerOfTwo:$v,floorPowerOfTwo:Jv,setQuaternionFromProperEuler:Qv,normalize:Dt,denormalize:Ei},ht=class n{static{n.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=bt(this.x,e.x,t.x),this.y=bt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=bt(this.x,e,t),this.y=bt(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(bt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(bt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},ei=class{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let c=i[r+0],l=i[r+1],u=i[r+2],h=i[r+3],d=s[a+0],m=s[a+1],x=s[a+2],v=s[a+3];if(h!==v||c!==d||l!==m||u!==x){let g=c*d+l*m+u*x+h*v;g<0&&(d=-d,m=-m,x=-x,v=-v,g=-g);let _=1-o;if(g<.9995){let T=Math.acos(g),I=Math.sin(T);_=Math.sin(_*T)/I,o=Math.sin(o*T)/I,c=c*_+d*o,l=l*_+m*o,u=u*_+x*o,h=h*_+v*o}else{c=c*_+d*o,l=l*_+m*o,u=u*_+x*o,h=h*_+v*o;let T=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=T,l*=T,u*=T,h*=T}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,r,s,a){let o=i[r],c=i[r+1],l=i[r+2],u=i[r+3],h=s[a],d=s[a+1],m=s[a+2],x=s[a+3];return e[t]=o*x+u*h+c*m-l*d,e[t+1]=c*x+u*d+l*h-o*m,e[t+2]=l*x+u*m+o*d-c*h,e[t+3]=u*x-o*h-c*d-l*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(i/2),u=o(r/2),h=o(s/2),d=c(i/2),m=c(r/2),x=c(s/2);switch(a){case"XYZ":this._x=d*u*h+l*m*x,this._y=l*m*h-d*u*x,this._z=l*u*x+d*m*h,this._w=l*u*h-d*m*x;break;case"YXZ":this._x=d*u*h+l*m*x,this._y=l*m*h-d*u*x,this._z=l*u*x-d*m*h,this._w=l*u*h+d*m*x;break;case"ZXY":this._x=d*u*h-l*m*x,this._y=l*m*h+d*u*x,this._z=l*u*x+d*m*h,this._w=l*u*h-d*m*x;break;case"ZYX":this._x=d*u*h-l*m*x,this._y=l*m*h+d*u*x,this._z=l*u*x-d*m*h,this._w=l*u*h+d*m*x;break;case"YZX":this._x=d*u*h+l*m*x,this._y=l*m*h+d*u*x,this._z=l*u*x-d*m*h,this._w=l*u*h-d*m*x;break;case"XZY":this._x=d*u*h-l*m*x,this._y=l*m*h-d*u*x,this._z=l*u*x+d*m*h,this._w=l*u*h+d*m*x;break;default:Ye("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],u=t[6],h=t[10],d=i+o+h;if(d>0){let m=.5/Math.sqrt(d+1);this._w=.25/m,this._x=(u-c)*m,this._y=(s-l)*m,this._z=(a-r)*m}else if(i>o&&i>h){let m=2*Math.sqrt(1+i-o-h);this._w=(u-c)/m,this._x=.25*m,this._y=(r+a)/m,this._z=(s+l)/m}else if(o>h){let m=2*Math.sqrt(1+o-i-h);this._w=(s-l)/m,this._x=(r+a)/m,this._y=.25*m,this._z=(c+u)/m}else{let m=2*Math.sqrt(1+h-i-o);this._w=(a-r)/m,this._x=(s+l)/m,this._y=(c+u)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(bt(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=i*u+a*o+r*l-s*c,this._y=r*u+a*c+s*o-i*l,this._z=s*u+a*l+i*c-r*o,this._w=a*u-i*o-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let c=1-t;if(o<.9995){let l=Math.acos(o),u=Math.sin(l);c=Math.sin(c*l)/u,t=Math.sin(t*l)/u,this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Z=class n{static{n.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(lg.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(lg.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){let t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*r-o*i),u=2*(o*t-s*r),h=2*(s*i-a*t);return this.x=t+c*l+a*h-o*u,this.y=i+c*u+o*l-s*h,this.z=r+c*h+s*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=bt(this.x,e.x,t.x),this.y=bt(this.y,e.y,t.y),this.z=bt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=bt(this.x,e,t),this.y=bt(this.y,e,t),this.z=bt(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(bt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=r*c-s*o,this.y=s*a-i*c,this.z=i*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Jh.copy(this).projectOnVector(e),this.sub(Jh)}reflect(e){return this.sub(Jh.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(bt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Jh=new Z,lg=new ei,rt=class n{static{n.prototype.isMatrix3=!0}constructor(e,t,i,r,s,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,c,l)}set(e,t,i,r,s,a,o,c,l){let u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=c,u[6]=i,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],u=i[4],h=i[7],d=i[2],m=i[5],x=i[8],v=r[0],g=r[3],_=r[6],T=r[1],I=r[4],E=r[7],w=r[2],R=r[5],P=r[8];return s[0]=a*v+o*T+c*w,s[3]=a*g+o*I+c*R,s[6]=a*_+o*E+c*P,s[1]=l*v+u*T+h*w,s[4]=l*g+u*I+h*R,s[7]=l*_+u*E+h*P,s[2]=d*v+m*T+x*w,s[5]=d*g+m*I+x*R,s[8]=d*_+m*E+x*P,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-i*s*u+i*o*c+r*s*l-r*a*c}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],h=u*a-o*l,d=o*c-u*s,m=l*s-a*c,x=t*h+i*d+r*m;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/x;return e[0]=h*v,e[1]=(r*l-u*i)*v,e[2]=(o*i-r*a)*v,e[3]=d*v,e[4]=(u*t-r*c)*v,e[5]=(r*s-o*t)*v,e[6]=m*v,e[7]=(i*c-l*t)*v,e[8]=(a*t-i*s)*v,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){let c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*a+l*o)+a+e,-r*l,r*c,-r*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return Ms("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Qh.makeScale(e,t)),this}rotate(e){return Ms("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Qh.makeRotation(-e)),this}translate(e,t){return Ms("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Qh.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Qh=new rt,cg=new rt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ug=new rt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function ey(){let n={enabled:!0,workingColorSpace:Ln,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===Pt&&(r.r=pr(r.r),r.g=pr(r.g),r.b=pr(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Pt&&(r.r=va(r.r),r.g=va(r.g),r.b=va(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===br?Po:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Ms("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Ms("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Ln]:{primaries:e,whitePoint:i,transfer:Po,toXYZ:cg,fromXYZ:ug,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:nn},outputColorSpaceConfig:{drawingBufferColorSpace:nn}},[nn]:{primaries:e,whitePoint:i,transfer:Pt,toXYZ:cg,fromXYZ:ug,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:nn}}}),n}var xt=ey();function pr(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function va(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var sa,Fc=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{sa===void 0&&(sa=Ma("canvas")),sa.width=e.width,sa.height=e.height;let r=sa.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=sa}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Ma("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=pr(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(pr(t[i]/255)*255):t[i]=pr(t[i]);return{data:t,width:e.width,height:e.height}}else return Ye("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},ty=0,Ta=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:ty++}),this.uuid=wi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(ed(r[a].image)):s.push(ed(r[a]))}else s=ed(r);i.url=s}return t||(e.images[this.uuid]=i),i}};function ed(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Fc.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ye("Texture: Unable to serialize Texture."),{})}var ny=0,td=new Z,vn=class n extends Gi{constructor(e=n.DEFAULT_IMAGE,t=n.DEFAULT_MAPPING,i=pi,r=pi,s=jt,a=Ii,o=ri,c=qn,l=n.DEFAULT_ANISOTROPY,u=br){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ny++}),this.uuid=wi(),this.name="",this.source=new Ta(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new ht(0,0),this.repeat=new ht(1,1),this.center=new ht(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new rt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(td).x}get height(){return this.source.getSize(td).y}get depth(){return this.source.getSize(td).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let i=e[t];if(i===void 0){Ye(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){Ye(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Kd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Gr:e.x=e.x-Math.floor(e.x);break;case pi:e.x=e.x<0?0:1;break;case Sa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Gr:e.y=e.y-Math.floor(e.y);break;case pi:e.y=e.y<0?0:1;break;case Sa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};vn.DEFAULT_IMAGE=null;vn.DEFAULT_MAPPING=Kd;vn.DEFAULT_ANISOTROPY=1;var Ut=class n{static{n.prototype.isVector4=!0}constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s,c=e.elements,l=c[0],u=c[4],h=c[8],d=c[1],m=c[5],x=c[9],v=c[2],g=c[6],_=c[10];if(Math.abs(u-d)<.01&&Math.abs(h-v)<.01&&Math.abs(x-g)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+v)<.1&&Math.abs(x+g)<.1&&Math.abs(l+m+_-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let I=(l+1)/2,E=(m+1)/2,w=(_+1)/2,R=(u+d)/4,P=(h+v)/4,y=(x+g)/4;return I>E&&I>w?I<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(I),r=R/i,s=P/i):E>w?E<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(E),i=R/r,s=y/r):w<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(w),i=P/s,r=y/s),this.set(i,r,s,t),this}let T=Math.sqrt((g-x)*(g-x)+(h-v)*(h-v)+(d-u)*(d-u));return Math.abs(T)<.001&&(T=1),this.x=(g-x)/T,this.y=(h-v)/T,this.z=(d-u)/T,this.w=Math.acos((l+m+_-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=bt(this.x,e.x,t.x),this.y=bt(this.y,e.y,t.y),this.z=bt(this.z,e.z,t.z),this.w=bt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=bt(this.x,e,t),this.y=bt(this.y,e,t),this.z=bt(this.z,e,t),this.w=bt(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(bt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Bc=class extends Gi{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:jt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Ut(0,0,e,t),this.scissorTest=!1,this.viewport=new Ut(0,0,e,t),this.textures=[];let r={width:e,height:t,depth:i.depth},s=new vn(r),a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:jt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new Ta(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},zn=class extends Bc{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},Lo=class extends vn{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Yt,this.minFilter=Yt,this.wrapR=pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var kc=class extends vn{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Yt,this.minFilter=Yt,this.wrapR=pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var at=class n{static{n.prototype.isMatrix4=!0}constructor(e,t,i,r,s,a,o,c,l,u,h,d,m,x,v,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,c,l,u,h,d,m,x,v,g)}set(e,t,i,r,s,a,o,c,l,u,h,d,m,x,v,g){let _=this.elements;return _[0]=e,_[4]=t,_[8]=i,_[12]=r,_[1]=s,_[5]=a,_[9]=o,_[13]=c,_[2]=l,_[6]=u,_[10]=h,_[14]=d,_[3]=m,_[7]=x,_[11]=v,_[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,i=e.elements,r=1/aa.setFromMatrixColumn(e,0).length(),s=1/aa.setFromMatrixColumn(e,1).length(),a=1/aa.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){let d=a*u,m=a*h,x=o*u,v=o*h;t[0]=c*u,t[4]=-c*h,t[8]=l,t[1]=m+x*l,t[5]=d-v*l,t[9]=-o*c,t[2]=v-d*l,t[6]=x+m*l,t[10]=a*c}else if(e.order==="YXZ"){let d=c*u,m=c*h,x=l*u,v=l*h;t[0]=d+v*o,t[4]=x*o-m,t[8]=a*l,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=m*o-x,t[6]=v+d*o,t[10]=a*c}else if(e.order==="ZXY"){let d=c*u,m=c*h,x=l*u,v=l*h;t[0]=d-v*o,t[4]=-a*h,t[8]=x+m*o,t[1]=m+x*o,t[5]=a*u,t[9]=v-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let d=a*u,m=a*h,x=o*u,v=o*h;t[0]=c*u,t[4]=x*l-m,t[8]=d*l+v,t[1]=c*h,t[5]=v*l+d,t[9]=m*l-x,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let d=a*c,m=a*l,x=o*c,v=o*l;t[0]=c*u,t[4]=v-d*h,t[8]=x*h+m,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=m*h+x,t[10]=d-v*h}else if(e.order==="XZY"){let d=a*c,m=a*l,x=o*c,v=o*l;t[0]=c*u,t[4]=-h,t[8]=l*u,t[1]=d*h+v,t[5]=a*u,t[9]=m*h-x,t[2]=x*h-m,t[6]=o*u,t[10]=v*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(iy,e,ry)}lookAt(e,t,i){let r=this.elements;return Jn.subVectors(e,t),Jn.lengthSq()===0&&(Jn.z=1),Jn.normalize(),Ur.crossVectors(i,Jn),Ur.lengthSq()===0&&(Math.abs(i.z)===1?Jn.x+=1e-4:Jn.z+=1e-4,Jn.normalize(),Ur.crossVectors(i,Jn)),Ur.normalize(),nc.crossVectors(Jn,Ur),r[0]=Ur.x,r[4]=nc.x,r[8]=Jn.x,r[1]=Ur.y,r[5]=nc.y,r[9]=Jn.y,r[2]=Ur.z,r[6]=nc.z,r[10]=Jn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],u=i[1],h=i[5],d=i[9],m=i[13],x=i[2],v=i[6],g=i[10],_=i[14],T=i[3],I=i[7],E=i[11],w=i[15],R=r[0],P=r[4],y=r[8],N=r[12],k=r[1],W=r[5],q=r[9],ee=r[13],X=r[2],Q=r[6],oe=r[10],re=r[14],me=r[3],ne=r[7],le=r[11],he=r[15];return s[0]=a*R+o*k+c*X+l*me,s[4]=a*P+o*W+c*Q+l*ne,s[8]=a*y+o*q+c*oe+l*le,s[12]=a*N+o*ee+c*re+l*he,s[1]=u*R+h*k+d*X+m*me,s[5]=u*P+h*W+d*Q+m*ne,s[9]=u*y+h*q+d*oe+m*le,s[13]=u*N+h*ee+d*re+m*he,s[2]=x*R+v*k+g*X+_*me,s[6]=x*P+v*W+g*Q+_*ne,s[10]=x*y+v*q+g*oe+_*le,s[14]=x*N+v*ee+g*re+_*he,s[3]=T*R+I*k+E*X+w*me,s[7]=T*P+I*W+E*Q+w*ne,s[11]=T*y+I*q+E*oe+w*le,s[15]=T*N+I*ee+E*re+w*he,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],u=e[2],h=e[6],d=e[10],m=e[14],x=e[3],v=e[7],g=e[11],_=e[15],T=c*m-l*d,I=o*m-l*h,E=o*d-c*h,w=a*m-l*u,R=a*d-c*u,P=a*h-o*u;return t*(v*T-g*I+_*E)-i*(x*T-g*w+_*R)+r*(x*I-v*w+_*P)-s*(x*E-v*R+g*P)}determinantAffine(){let e=this.elements,t=e[0],i=e[4],r=e[8],s=e[1],a=e[5],o=e[9],c=e[2],l=e[6],u=e[10];return t*(a*u-o*l)-i*(s*u-o*c)+r*(s*l-a*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],h=e[9],d=e[10],m=e[11],x=e[12],v=e[13],g=e[14],_=e[15],T=t*o-i*a,I=t*c-r*a,E=t*l-s*a,w=i*c-r*o,R=i*l-s*o,P=r*l-s*c,y=u*v-h*x,N=u*g-d*x,k=u*_-m*x,W=h*g-d*v,q=h*_-m*v,ee=d*_-m*g,X=T*ee-I*q+E*W+w*k-R*N+P*y;if(X===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let Q=1/X;return e[0]=(o*ee-c*q+l*W)*Q,e[1]=(r*q-i*ee-s*W)*Q,e[2]=(v*P-g*R+_*w)*Q,e[3]=(d*R-h*P-m*w)*Q,e[4]=(c*k-a*ee-l*N)*Q,e[5]=(t*ee-r*k+s*N)*Q,e[6]=(g*E-x*P-_*I)*Q,e[7]=(u*P-d*E+m*I)*Q,e[8]=(a*q-o*k+l*y)*Q,e[9]=(i*k-t*q-s*y)*Q,e[10]=(x*R-v*E+_*T)*Q,e[11]=(h*E-u*R-m*T)*Q,e[12]=(o*N-a*W-c*y)*Q,e[13]=(t*W-i*N+r*y)*Q,e[14]=(v*I-x*w-g*T)*Q,e[15]=(u*w-h*I+d*T)*Q,this}scale(e){let t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,c=e.z,l=s*a,u=s*o;return this.set(l*a+i,l*o-r*c,l*c+r*o,0,l*o+r*c,u*o+i,u*c-r*a,0,l*c-r*o,u*c+r*a,s*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){let r=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,u=a+a,h=o+o,d=s*l,m=s*u,x=s*h,v=a*u,g=a*h,_=o*h,T=c*l,I=c*u,E=c*h,w=i.x,R=i.y,P=i.z;return r[0]=(1-(v+_))*w,r[1]=(m+E)*w,r[2]=(x-I)*w,r[3]=0,r[4]=(m-E)*R,r[5]=(1-(d+_))*R,r[6]=(g+T)*R,r[7]=0,r[8]=(x+I)*P,r[9]=(g-T)*P,r[10]=(1-(d+v))*P,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let s=this.determinantAffine();if(s===0)return i.set(1,1,1),t.identity(),this;let a=aa.set(r[0],r[1],r[2]).length(),o=aa.set(r[4],r[5],r[6]).length(),c=aa.set(r[8],r[9],r[10]).length();s<0&&(a=-a),yi.copy(this);let l=1/a,u=1/o,h=1/c;return yi.elements[0]*=l,yi.elements[1]*=l,yi.elements[2]*=l,yi.elements[4]*=u,yi.elements[5]*=u,yi.elements[6]*=u,yi.elements[8]*=h,yi.elements[9]*=h,yi.elements[10]*=h,t.setFromRotationMatrix(yi),i.x=a,i.y=o,i.z=c,this}makePerspective(e,t,i,r,s,a,o=Ti,c=!1){let l=this.elements,u=2*s/(t-e),h=2*s/(i-r),d=(t+e)/(t-e),m=(i+r)/(i-r),x,v;if(c)x=s/(a-s),v=a*s/(a-s);else if(o===Ti)x=-(a+s)/(a-s),v=-2*a*s/(a-s);else if(o===ba)x=-a/(a-s),v=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=m,l[13]=0,l[2]=0,l[6]=0,l[10]=x,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=Ti,c=!1){let l=this.elements,u=2/(t-e),h=2/(i-r),d=-(t+e)/(t-e),m=-(i+r)/(i-r),x,v;if(c)x=1/(a-s),v=a/(a-s);else if(o===Ti)x=-2/(a-s),v=-(a+s)/(a-s);else if(o===ba)x=-1/(a-s),v=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=h,l[9]=0,l[13]=m,l[2]=0,l[6]=0,l[10]=x,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},aa=new Z,yi=new at,iy=new Z(0,0,0),ry=new Z(1,1,1),Ur=new Z,nc=new Z,Jn=new Z,hg=new at,dg=new ei,mr=class n{constructor(e=0,t=0,i=0,r=n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let r=e.elements,s=r[0],a=r[4],o=r[8],c=r[1],l=r[5],u=r[9],h=r[2],d=r[6],m=r[10];switch(t){case"XYZ":this._y=Math.asin(bt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,m),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-bt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(bt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-bt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,m),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(bt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-bt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,m),this._y=0);break;default:Ye("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return hg.makeRotationFromQuaternion(e),this.setFromRotationMatrix(hg,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return dg.setFromEuler(this),this.setFromQuaternion(dg,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};mr.DEFAULT_ORDER="XYZ";var Aa=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},sy=0,fg=new Z,oa=new ei,lr=new at,ic=new Z,So=new Z,ay=new Z,oy=new ei,pg=new Z(1,0,0),mg=new Z(0,1,0),gg=new Z(0,0,1),_g={type:"added"},ly={type:"removed"},la={type:"childadded",child:null},nd={type:"childremoved",child:null},$t=class n extends Gi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:sy++}),this.uuid=wi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let e=new Z,t=new mr,i=new ei,r=new Z(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new at},normalMatrix:{value:new rt}}),this.matrix=new at,this.matrixWorld=new at,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Aa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return oa.setFromAxisAngle(e,t),this.quaternion.multiply(oa),this}rotateOnWorldAxis(e,t){return oa.setFromAxisAngle(e,t),this.quaternion.premultiply(oa),this}rotateX(e){return this.rotateOnAxis(pg,e)}rotateY(e){return this.rotateOnAxis(mg,e)}rotateZ(e){return this.rotateOnAxis(gg,e)}translateOnAxis(e,t){return fg.copy(e).applyQuaternion(this.quaternion),this.position.add(fg.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(pg,e)}translateY(e){return this.translateOnAxis(mg,e)}translateZ(e){return this.translateOnAxis(gg,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(lr.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?ic.copy(e):ic.set(e,t,i);let r=this.parent;this.updateWorldMatrix(!0,!1),So.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?lr.lookAt(So,ic,this.up):lr.lookAt(ic,So,this.up),this.quaternion.setFromRotationMatrix(lr),r&&(lr.extractRotation(r.matrixWorld),oa.setFromRotationMatrix(lr),this.quaternion.premultiply(oa.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Qe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(_g),la.child=e,this.dispatchEvent(la),la.child=null):Qe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ly),nd.child=e,this.dispatchEvent(nd),nd.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),lr.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),lr.multiply(e.parent.matrixWorld)),e.applyMatrix4(lr),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(_g),la.child=e,this.dispatchEvent(la),la.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){let a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(So,e,ay),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(So,oy,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*i-s[8]*r,s[13]+=i-s[1]*t-s[5]*i-s[9]*r,s[14]+=r-s[2]*t-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){let s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){let h=c[l];s(e.shapes,h)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];r.animations.push(s(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),u=a(e.images),h=a(e.shapes),d=a(e.skeletons),m=a(e.animations),x=a(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),d.length>0&&(i.skeletons=d),m.length>0&&(i.animations=m),x.length>0&&(i.nodes=x)}return i.object=r,i;function a(o){let c=[];for(let l in o){let u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let r=e.children[i];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};$t.DEFAULT_UP=new Z(0,1,0);$t.DEFAULT_MATRIX_AUTO_UPDATE=!0;$t.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Ai=class extends $t{constructor(){super(),this.isGroup=!0,this.type="Group"}},cy={type:"move"},wa=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ai,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ai,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ai,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Z,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let v of e.hand.values()){let g=t.getJointPose(v,i),_=this._getHandJoint(l,v);g!==null&&(_.matrix.fromArray(g.transform.matrix),_.matrix.decompose(_.position,_.rotation,_.scale),_.matrixWorldNeedsUpdate=!0,_.jointRadius=g.radius),_.visible=g!==null}let u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],d=u.position.distanceTo(h.position),m=.02,x=.005;l.inputState.pinching&&d>m+x?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=m-x&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(cy)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new Ai;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},I_={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Or={h:0,s:0,l:0},rc={h:0,s:0,l:0};function id(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var et=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=nn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,xt.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=xt.workingColorSpace){return this.r=e,this.g=t,this.b=i,xt.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=xt.workingColorSpace){if(e=af(e,1),t=bt(t,0,1),i=bt(i,0,1),t===0)this.r=this.g=this.b=i;else{let s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=id(a,s,e+1/3),this.g=id(a,s,e),this.b=id(a,s,e-1/3)}return xt.colorSpaceToWorking(this,r),this}setStyle(e,t=nn){function i(s){s!==void 0&&parseFloat(s)<1&&Ye("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Ye("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Ye("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=nn){let i=I_[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ye("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=pr(e.r),this.g=pr(e.g),this.b=pr(e.b),this}copyLinearToSRGB(e){return this.r=va(e.r),this.g=va(e.g),this.b=va(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=nn){return xt.workingToColorSpace(Rn.copy(this),e),Math.round(bt(Rn.r*255,0,255))*65536+Math.round(bt(Rn.g*255,0,255))*256+Math.round(bt(Rn.b*255,0,255))}getHexString(e=nn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=xt.workingColorSpace){xt.workingToColorSpace(Rn.copy(this),t);let i=Rn.r,r=Rn.g,s=Rn.b,a=Math.max(i,r,s),o=Math.min(i,r,s),c,l,u=(o+a)/2;if(o===a)c=0,l=0;else{let h=a-o;switch(l=u<=.5?h/(a+o):h/(2-a-o),a){case i:c=(r-s)/h+(r<s?6:0);break;case r:c=(s-i)/h+2;break;case s:c=(i-r)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=xt.workingColorSpace){return xt.workingToColorSpace(Rn.copy(this),t),e.r=Rn.r,e.g=Rn.g,e.b=Rn.b,e}getStyle(e=nn){xt.workingToColorSpace(Rn.copy(this),e);let t=Rn.r,i=Rn.g,r=Rn.b;return e!==nn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Or),this.setHSL(Or.h+e,Or.s+t,Or.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Or),e.getHSL(rc);let i=Co(Or.h,rc.h,t),r=Co(Or.s,rc.s,t),s=Co(Or.l,rc.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Rn=new et;et.NAMES=I_;var Do=class extends $t{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new mr,this.environmentIntensity=1,this.environmentRotation=new mr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Si=new Z,cr=new Z,rd=new Z,ur=new Z,ca=new Z,ua=new Z,xg=new Z,sd=new Z,ad=new Z,od=new Z,ld=new Ut,cd=new Ut,ud=new Ut,Vr=class n{constructor(e=new Z,t=new Z,i=new Z){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Si.subVectors(e,t),r.cross(Si);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Si.subVectors(r,t),cr.subVectors(i,t),rd.subVectors(e,t);let a=Si.dot(Si),o=Si.dot(cr),c=Si.dot(rd),l=cr.dot(cr),u=cr.dot(rd),h=a*l-o*o;if(h===0)return s.set(0,0,0),null;let d=1/h,m=(l*c-o*u)*d,x=(a*u-o*c)*d;return s.set(1-m-x,x,m)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,ur)===null?!1:ur.x>=0&&ur.y>=0&&ur.x+ur.y<=1}static getInterpolation(e,t,i,r,s,a,o,c){return this.getBarycoord(e,t,i,r,ur)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,ur.x),c.addScaledVector(a,ur.y),c.addScaledVector(o,ur.z),c)}static getInterpolatedAttribute(e,t,i,r,s,a){return ld.setScalar(0),cd.setScalar(0),ud.setScalar(0),ld.fromBufferAttribute(e,t),cd.fromBufferAttribute(e,i),ud.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(ld,s.x),a.addScaledVector(cd,s.y),a.addScaledVector(ud,s.z),a}static isFrontFacing(e,t,i,r){return Si.subVectors(i,t),cr.subVectors(e,t),Si.cross(cr).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Si.subVectors(this.c,this.b),cr.subVectors(this.a,this.b),Si.cross(cr).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return n.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,r=this.b,s=this.c,a,o;ca.subVectors(r,i),ua.subVectors(s,i),sd.subVectors(e,i);let c=ca.dot(sd),l=ua.dot(sd);if(c<=0&&l<=0)return t.copy(i);ad.subVectors(e,r);let u=ca.dot(ad),h=ua.dot(ad);if(u>=0&&h<=u)return t.copy(r);let d=c*h-u*l;if(d<=0&&c>=0&&u<=0)return a=c/(c-u),t.copy(i).addScaledVector(ca,a);od.subVectors(e,s);let m=ca.dot(od),x=ua.dot(od);if(x>=0&&m<=x)return t.copy(s);let v=m*l-c*x;if(v<=0&&l>=0&&x<=0)return o=l/(l-x),t.copy(i).addScaledVector(ua,o);let g=u*x-m*h;if(g<=0&&h-u>=0&&m-x>=0)return xg.subVectors(s,r),o=(h-u)/(h-u+(m-x)),t.copy(r).addScaledVector(xg,o);let _=1/(g+v+d);return a=v*_,o=d*_,t.copy(i).addScaledVector(ca,a).addScaledVector(ua,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},ti=class{constructor(e=new Z(1/0,1/0,1/0),t=new Z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(bi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(bi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=bi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,bi):bi.fromBufferAttribute(s,a),bi.applyMatrix4(e.matrixWorld),this.expandByPoint(bi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),sc.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),sc.copy(i.boundingBox)),sc.applyMatrix4(e.matrixWorld),this.union(sc)}let r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,bi),bi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(bo),ac.subVectors(this.max,bo),ha.subVectors(e.a,bo),da.subVectors(e.b,bo),fa.subVectors(e.c,bo),Fr.subVectors(da,ha),Br.subVectors(fa,da),vs.subVectors(ha,fa);let t=[0,-Fr.z,Fr.y,0,-Br.z,Br.y,0,-vs.z,vs.y,Fr.z,0,-Fr.x,Br.z,0,-Br.x,vs.z,0,-vs.x,-Fr.y,Fr.x,0,-Br.y,Br.x,0,-vs.y,vs.x,0];return!hd(t,ha,da,fa,ac)||(t=[1,0,0,0,1,0,0,0,1],!hd(t,ha,da,fa,ac))?!1:(oc.crossVectors(Fr,Br),t=[oc.x,oc.y,oc.z],hd(t,ha,da,fa,ac))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,bi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(bi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(hr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),hr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),hr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),hr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),hr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),hr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),hr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),hr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(hr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},hr=[new Z,new Z,new Z,new Z,new Z,new Z,new Z,new Z],bi=new Z,sc=new ti,ha=new Z,da=new Z,fa=new Z,Fr=new Z,Br=new Z,vs=new Z,bo=new Z,ac=new Z,oc=new Z,ys=new Z;function hd(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){ys.fromArray(n,s);let o=r.x*Math.abs(ys.x)+r.y*Math.abs(ys.y)+r.z*Math.abs(ys.z),c=e.dot(ys),l=t.dot(ys),u=i.dot(ys);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}var ln=new Z,lc=new ht,uy=0,hn=class extends Gi{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:uy++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=rf,this.updateRanges=[],this.gpuType=ii,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)lc.fromBufferAttribute(this,t),lc.applyMatrix3(e),this.setXY(t,lc.x,lc.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)ln.fromBufferAttribute(this,t),ln.applyMatrix3(e),this.setXYZ(t,ln.x,ln.y,ln.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)ln.fromBufferAttribute(this,t),ln.applyMatrix4(e),this.setXYZ(t,ln.x,ln.y,ln.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)ln.fromBufferAttribute(this,t),ln.applyNormalMatrix(e),this.setXYZ(t,ln.x,ln.y,ln.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)ln.fromBufferAttribute(this,t),ln.transformDirection(e),this.setXYZ(t,ln.x,ln.y,ln.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Ei(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Dt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ei(t,this.array)),t}setX(e,t){return this.normalized&&(t=Dt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ei(t,this.array)),t}setY(e,t){return this.normalized&&(t=Dt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ei(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Dt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ei(t,this.array)),t}setW(e,t){return this.normalized&&(t=Dt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Dt(t,this.array),i=Dt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=Dt(t,this.array),i=Dt(i,this.array),r=Dt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=Dt(t,this.array),i=Dt(i,this.array),r=Dt(r,this.array),s=Dt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var Uo=class extends hn{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var Oo=class extends hn{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var xn=class extends hn{constructor(e,t,i){super(new Float32Array(e),t,i)}},hy=new ti,Mo=new Z,dd=new Z,Vn=class{constructor(e=new Z,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):hy.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Mo.subVectors(e,this.center);let t=Mo.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Mo,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(dd.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Mo.copy(e.center).add(dd)),this.expandByPoint(Mo.copy(e.center).sub(dd))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},dy=0,fi=new at,fd=new $t,pa=new Z,Qn=new ti,Eo=new ti,gn=new Z,Mn=class n extends Gi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:dy++}),this.uuid=wi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ov(e)?Oo:Uo)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let s=new rt().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return fi.makeRotationFromQuaternion(e),this.applyMatrix4(fi),this}rotateX(e){return fi.makeRotationX(e),this.applyMatrix4(fi),this}rotateY(e){return fi.makeRotationY(e),this.applyMatrix4(fi),this}rotateZ(e){return fi.makeRotationZ(e),this.applyMatrix4(fi),this}translate(e,t,i){return fi.makeTranslation(e,t,i),this.applyMatrix4(fi),this}scale(e,t,i){return fi.makeScale(e,t,i),this.applyMatrix4(fi),this}lookAt(e){return fd.lookAt(e),fd.updateMatrix(),this.applyMatrix4(fd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(pa).negate(),this.translate(pa.x,pa.y,pa.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let r=0,s=e.length;r<s;r++){let a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new xn(i,3))}else{let i=Math.min(e.length,t.count);for(let r=0;r<i;r++){let s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Ye("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ti);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Qe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new Z(-1/0,-1/0,-1/0),new Z(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){let s=t[i];Qn.setFromBufferAttribute(s),this.morphTargetsRelative?(gn.addVectors(this.boundingBox.min,Qn.min),this.boundingBox.expandByPoint(gn),gn.addVectors(this.boundingBox.max,Qn.max),this.boundingBox.expandByPoint(gn)):(this.boundingBox.expandByPoint(Qn.min),this.boundingBox.expandByPoint(Qn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Qe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Vn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Qe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new Z,1/0);return}if(e){let i=this.boundingSphere.center;if(Qn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];Eo.setFromBufferAttribute(o),this.morphTargetsRelative?(gn.addVectors(Qn.min,Eo.min),Qn.expandByPoint(gn),gn.addVectors(Qn.max,Eo.max),Qn.expandByPoint(gn)):(Qn.expandByPoint(Eo.min),Qn.expandByPoint(Eo.max))}Qn.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)gn.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(gn));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)gn.fromBufferAttribute(o,l),c&&(pa.fromBufferAttribute(e,l),gn.add(pa)),r=Math.max(r,i.distanceToSquared(gn))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Qe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Qe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,r=t.normal,s=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new hn(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));let o=[],c=[];for(let y=0;y<i.count;y++)o[y]=new Z,c[y]=new Z;let l=new Z,u=new Z,h=new Z,d=new ht,m=new ht,x=new ht,v=new Z,g=new Z;function _(y,N,k){l.fromBufferAttribute(i,y),u.fromBufferAttribute(i,N),h.fromBufferAttribute(i,k),d.fromBufferAttribute(s,y),m.fromBufferAttribute(s,N),x.fromBufferAttribute(s,k),u.sub(l),h.sub(l),m.sub(d),x.sub(d);let W=1/(m.x*x.y-x.x*m.y);isFinite(W)&&(v.copy(u).multiplyScalar(x.y).addScaledVector(h,-m.y).multiplyScalar(W),g.copy(h).multiplyScalar(m.x).addScaledVector(u,-x.x).multiplyScalar(W),o[y].add(v),o[N].add(v),o[k].add(v),c[y].add(g),c[N].add(g),c[k].add(g))}let T=this.groups;T.length===0&&(T=[{start:0,count:e.count}]);for(let y=0,N=T.length;y<N;++y){let k=T[y],W=k.start,q=k.count;for(let ee=W,X=W+q;ee<X;ee+=3)_(e.getX(ee+0),e.getX(ee+1),e.getX(ee+2))}let I=new Z,E=new Z,w=new Z,R=new Z;function P(y){w.fromBufferAttribute(r,y),R.copy(w);let N=o[y];I.copy(N),I.sub(w.multiplyScalar(w.dot(N))).normalize(),E.crossVectors(R,N);let W=E.dot(c[y])<0?-1:1;a.setXYZW(y,I.x,I.y,I.z,W)}for(let y=0,N=T.length;y<N;++y){let k=T[y],W=k.start,q=k.count;for(let ee=W,X=W+q;ee<X;ee+=3)P(e.getX(ee+0)),P(e.getX(ee+1)),P(e.getX(ee+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new hn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,m=i.count;d<m;d++)i.setXYZ(d,0,0,0);let r=new Z,s=new Z,a=new Z,o=new Z,c=new Z,l=new Z,u=new Z,h=new Z;if(e)for(let d=0,m=e.count;d<m;d+=3){let x=e.getX(d+0),v=e.getX(d+1),g=e.getX(d+2);r.fromBufferAttribute(t,x),s.fromBufferAttribute(t,v),a.fromBufferAttribute(t,g),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),o.fromBufferAttribute(i,x),c.fromBufferAttribute(i,v),l.fromBufferAttribute(i,g),o.add(u),c.add(u),l.add(u),i.setXYZ(x,o.x,o.y,o.z),i.setXYZ(v,c.x,c.y,c.z),i.setXYZ(g,l.x,l.y,l.z)}else for(let d=0,m=t.count;d<m;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),i.setXYZ(d+0,u.x,u.y,u.z),i.setXYZ(d+1,u.x,u.y,u.z),i.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)gn.fromBufferAttribute(e,t),gn.normalize(),e.setXYZ(t,gn.x,gn.y,gn.z)}toNonIndexed(){function e(o,c){let l=o.array,u=o.itemSize,h=o.normalized,d=new l.constructor(c.length*u),m=0,x=0;for(let v=0,g=c.length;v<g;v++){o.isInterleavedBufferAttribute?m=c[v]*o.data.stride+o.offset:m=c[v]*u;for(let _=0;_<u;_++)d[x++]=l[m++]}return new hn(d,u,h)}if(this.index===null)return Ye("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,r=this.attributes;for(let o in r){let c=r[o],l=e(c,i);t.setAttribute(o,l)}let s=this.morphAttributes;for(let o in s){let c=[],l=s[o];for(let u=0,h=l.length;u<h;u++){let d=l[u],m=e(d,i);c.push(m)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let c in i){let l=i[c];e.data.attributes[c]=l.toJSON(e.data)}let r={},s=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let h=0,d=l.length;h<d;h++){let m=l[h];u.push(m.toJSON(e.data))}u.length>0&&(r[c]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let r=e.attributes;for(let l in r){let u=r[l];this.setAttribute(l,u.clone(t))}let s=e.morphAttributes;for(let l in s){let u=[],h=s[l];for(let d=0,m=h.length;d<m;d++)u.push(h[d].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,u=a.length;l<u;l++){let h=a[l];this.addGroup(h.start,h.count,h.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ra=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=rf,this.updateRanges=[],this.version=0,this.uuid=wi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[i+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=wi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=wi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},Nn=new Z,Ia=class n{constructor(e,t,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Nn.fromBufferAttribute(this,t),Nn.applyMatrix4(e),this.setXYZ(t,Nn.x,Nn.y,Nn.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Nn.fromBufferAttribute(this,t),Nn.applyNormalMatrix(e),this.setXYZ(t,Nn.x,Nn.y,Nn.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Nn.fromBufferAttribute(this,t),Nn.transformDirection(e),this.setXYZ(t,Nn.x,Nn.y,Nn.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=Ei(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Dt(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=Dt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Dt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Dt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Dt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Ei(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Ei(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Ei(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Ei(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Dt(t,this.array),i=Dt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Dt(t,this.array),i=Dt(i,this.array),r=Dt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Dt(t,this.array),i=Dt(i,this.array),r=Dt(r,this.array),s=Dt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){No("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new hn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new n(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){No("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},pd=new Z,fy=new Z,py=new rt,Mi=class{constructor(e=new Z(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let r=pd.subVectors(i,t).cross(fy.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){let r=e.delta(pd),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||py.getNormalMatrix(e),r=this.coplanarPoint(pd).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},my=0,Gn=class extends Gi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:my++}),this.uuid=wi(),this.name="",this.type="Material",this.blending=za,this.side=qi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=kd,this.blendDst=zd,this.blendEquation=Ps,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new et(0,0,0),this.blendAlpha=0,this.depthFunc=ya,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=x_,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Rc,this.stencilZFail=Rc,this.stencilZPass=Rc,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){Ye(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){Ye(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){let a=[];for(let o in s){let c=s[o];delete c.metadata,a.push(c)}return a}if(t){let s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new et().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new Mi().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new ht().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ht().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var dr=new Z,md=new Z,cc=new Z,uc=new Z,Hr=class{constructor(e=new Z,t=new Z(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,dr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=dr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(dr.copy(this.origin).addScaledVector(this.direction,t),dr.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){md.copy(e).add(t).multiplyScalar(.5),cc.copy(t).sub(e).normalize(),uc.copy(this.origin).sub(md);let s=e.distanceTo(t)*.5,a=-this.direction.dot(cc),o=uc.dot(this.direction),c=-uc.dot(cc),l=uc.lengthSq(),u=Math.abs(1-a*a),h,d,m,x;if(u>0)if(h=a*c-o,d=a*o-c,x=s*u,h>=0)if(d>=-x)if(d<=x){let v=1/u;h*=v,d*=v,m=h*(h+a*d+2*o)+d*(a*h+d+2*c)+l}else d=s,h=Math.max(0,-(a*d+o)),m=-h*h+d*(d+2*c)+l;else d=-s,h=Math.max(0,-(a*d+o)),m=-h*h+d*(d+2*c)+l;else d<=-x?(h=Math.max(0,-(-a*s+o)),d=h>0?-s:Math.min(Math.max(-s,-c),s),m=-h*h+d*(d+2*c)+l):d<=x?(h=0,d=Math.min(Math.max(-s,-c),s),m=d*(d+2*c)+l):(h=Math.max(0,-(a*s+o)),d=h>0?s:Math.min(Math.max(-s,-c),s),m=-h*h+d*(d+2*c)+l);else d=a>0?-s:s,h=Math.max(0,-(a*d+o)),m=-h*h+d*(d+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(md).addScaledVector(cc,d),m}intersectSphere(e,t){if(e.radius<0)return null;dr.subVectors(e.center,this.origin);let i=dr.dot(this.direction),r=dr.dot(dr)-i*i,s=e.radius*e.radius;if(r>s)return null;let a=Math.sqrt(s-r),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,c,l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return l>=0?(i=(e.min.x-d.x)*l,r=(e.max.x-d.x)*l):(i=(e.max.x-d.x)*l,r=(e.min.x-d.x)*l),u>=0?(s=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(s=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),h>=0?(o=(e.min.z-d.z)*h,c=(e.max.z-d.z)*h):(o=(e.max.z-d.z)*h,c=(e.min.z-d.z)*h),i>c||o>r)||((o>i||i!==i)&&(i=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,dr)!==null}intersectTriangle(e,t,i,r,s){let a=this.origin,o=this.direction,c=o.x,l=o.y,u=o.z,h=e.x-a.x,d=e.y-a.y,m=e.z-a.z,x=t.x-a.x,v=t.y-a.y,g=t.z-a.z,_=i.x-a.x,T=i.y-a.y,I=i.z-a.z,E=Math.abs(c),w=Math.abs(l),R=Math.abs(u),P,y,N,k,W,q,ee,X,Q,oe,re,me;if(E>=w&&E>=R?(N=c,q=h,Q=x,me=_,c>=0?(P=l,y=u,k=d,W=m,ee=v,X=g,oe=T,re=I):(P=u,y=l,k=m,W=d,ee=g,X=v,oe=I,re=T)):w>=R?(N=l,q=d,Q=v,me=T,l>=0?(P=u,y=c,k=m,W=h,ee=g,X=x,oe=I,re=_):(P=c,y=u,k=h,W=m,ee=x,X=g,oe=_,re=I)):(N=u,q=m,Q=g,me=I,u>=0?(P=c,y=l,k=h,W=d,ee=x,X=v,oe=_,re=T):(P=l,y=c,k=d,W=h,ee=v,X=x,oe=T,re=_)),N===0)return null;let ne=P/N,le=y/N,he=1/N,Ge=k-ne*q,Ne=W-le*q,vt=ee-ne*Q,ie=X-le*Q,Te=oe-ne*me,K=re-le*me,$=Te*ie-K*vt,be=Ge*K-Ne*Te,Ie=vt*Ne-ie*Ge;if(r){if($<0||be<0||Ie<0)return null}else if(($<0||be<0||Ie<0)&&($>0||be>0||Ie>0))return null;let de=$+be+Ie;if(de===0)return null;let Ke=he*($*q+be*Q+Ie*me);return(de>0?Ke<0:Ke>0)?null:this.at(Ke/de,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Hn=class extends Gn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new et(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new mr,this.combine=Vd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},vg=new at,Ss=new Hr,hc=new Vn,yg=new Z,dc=new Z,fc=new Z,pc=new Z,gd=new Z,mc=new Z,Sg=new Z,gc=new Z,cn=class extends $t{constructor(e=new Mn,t=new Hn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){let i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(s&&o){mc.set(0,0,0);for(let c=0,l=s.length;c<l;c++){let u=o[c],h=s[c];u!==0&&(gd.fromBufferAttribute(h,e),a?mc.addScaledVector(gd,u):mc.addScaledVector(gd.sub(t),u))}t.add(mc)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),hc.copy(i.boundingSphere),hc.applyMatrix4(s),Ss.copy(e.ray).recast(e.near),!(hc.containsPoint(Ss.origin)===!1&&(Ss.intersectSphere(hc,yg)===null||Ss.origin.distanceToSquared(yg)>(e.far-e.near)**2))&&(vg.copy(s).invert(),Ss.copy(e.ray).applyMatrix4(vg),!(i.boundingBox!==null&&Ss.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Ss)))}_computeIntersections(e,t,i){let r,s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,d=s.groups,m=s.drawRange;if(o!==null)if(Array.isArray(a))for(let x=0,v=d.length;x<v;x++){let g=d[x],_=a[g.materialIndex],T=Math.max(g.start,m.start),I=Math.min(o.count,Math.min(g.start+g.count,m.start+m.count));for(let E=T,w=I;E<w;E+=3){let R=o.getX(E),P=o.getX(E+1),y=o.getX(E+2);r=_c(this,_,e,i,l,u,h,R,P,y),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{let x=Math.max(0,m.start),v=Math.min(o.count,m.start+m.count);for(let g=x,_=v;g<_;g+=3){let T=o.getX(g),I=o.getX(g+1),E=o.getX(g+2);r=_c(this,a,e,i,l,u,h,T,I,E),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let x=0,v=d.length;x<v;x++){let g=d[x],_=a[g.materialIndex],T=Math.max(g.start,m.start),I=Math.min(c.count,Math.min(g.start+g.count,m.start+m.count));for(let E=T,w=I;E<w;E+=3){let R=E,P=E+1,y=E+2;r=_c(this,_,e,i,l,u,h,R,P,y),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{let x=Math.max(0,m.start),v=Math.min(c.count,m.start+m.count);for(let g=x,_=v;g<_;g+=3){let T=g,I=g+1,E=g+2;r=_c(this,a,e,i,l,u,h,T,I,E),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}}};function gy(n,e,t,i,r,s,a,o){let c;if(e.side===Dn?c=i.intersectTriangle(a,s,r,!0,o):c=i.intersectTriangle(r,s,a,e.side===qi,o),c===null)return null;gc.copy(o),gc.applyMatrix4(n.matrixWorld);let l=t.ray.origin.distanceTo(gc);return l<t.near||l>t.far?null:{distance:l,point:gc.clone(),object:n}}function _c(n,e,t,i,r,s,a,o,c,l){n.getVertexPosition(o,dc),n.getVertexPosition(c,fc),n.getVertexPosition(l,pc);let u=gy(n,e,t,i,dc,fc,pc,Sg);if(u){let h=new Z;Vr.getBarycoord(Sg,dc,fc,pc,h),r&&(u.uv=Vr.getInterpolatedAttribute(r,o,c,l,h,new ht)),s&&(u.uv1=Vr.getInterpolatedAttribute(s,o,c,l,h,new ht)),a&&(u.normal=Vr.getInterpolatedAttribute(a,o,c,l,h,new Z),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));let d={a:o,b:c,c:l,normal:new Z,materialIndex:0};Vr.getNormal(dc,fc,pc,d.normal),u.face=d,u.barycoord=h}return u}var To=new Ut,bg=new Ut,Mg=new Ut,_y=new Ut,Eg=new at,xc=new Z,_d=new Vn,Tg=new at,xd=new Hr,Fo=class extends cn{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=bd,this.bindMatrix=new at,this.bindMatrixInverse=new at,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new ti),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,xc),this.boundingBox.expandByPoint(xc)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Vn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,xc),this.boundingSphere.expandByPoint(xc)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let i=this.material,r=this.matrixWorld;i!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),_d.copy(this.boundingSphere),_d.applyMatrix4(r),e.ray.intersectsSphere(_d)!==!1&&(Tg.copy(r).invert(),xd.copy(e.ray).applyMatrix4(Tg),!(this.boundingBox!==null&&xd.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,xd)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new Ut,t=this.geometry.attributes.skinWeight;for(let i=0,r=t.count;i<r;i++){e.fromBufferAttribute(t,i);let s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(i,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===bd?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===p_?this.bindMatrixInverse.copy(this.bindMatrix).invert():Ye("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let i=this.skeleton,r=this.geometry;bg.fromBufferAttribute(r.attributes.skinIndex,e),Mg.fromBufferAttribute(r.attributes.skinWeight,e),t.isVector4?(To.copy(t),t.set(0,0,0,0)):(To.set(...t,1),t.set(0,0,0)),To.applyMatrix4(this.bindMatrix);for(let s=0;s<4;s++){let a=Mg.getComponent(s);if(a!==0){let o=bg.getComponent(s);Eg.multiplyMatrices(i.bones[o].matrixWorld,i.boneInverses[o]),t.addScaledVector(_y.copy(To).applyMatrix4(Eg),a)}}return t.isVector4&&(t.w=To.w),t.applyMatrix4(this.bindMatrixInverse)}},Ca=class extends $t{constructor(){super(),this.isBone=!0,this.type="Bone"}},Pa=class extends vn{constructor(e=null,t=1,i=1,r,s,a,o,c,l=Yt,u=Yt,h,d){super(null,a,o,c,l,u,r,s,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Ag=new at,xy=new at,Bo=class n{constructor(e=[],t=[]){this.uuid=wi(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Ye("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let i=0,r=this.bones.length;i<r;i++)this.boneInverses.push(new at)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let i=new at;this.bones[e]&&i.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(i)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let i=this.bones[e];i&&i.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let i=this.bones[e];i&&(i.parent&&i.parent.isBone?(i.matrix.copy(i.parent.matrixWorld).invert(),i.matrix.multiply(i.matrixWorld)):i.matrix.copy(i.matrixWorld),i.matrix.decompose(i.position,i.quaternion,i.scale))}}update(){let e=this.bones,t=this.boneInverses,i=this.boneMatrices,r=this.boneTexture;for(let s=0,a=e.length;s<a;s++){let o=e[s]?e[s].matrixWorld:xy;Ag.multiplyMatrices(o,t[s]),Ag.toArray(i,s*16)}r!==null&&(r.needsUpdate=!0)}clone(){return new n(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let i=new Pa(t,e,e,ri,ii);return i.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=i,this}getBoneByName(e){for(let t=0,i=this.bones.length;t<i;t++){let r=this.bones[t];if(r.name===e)return r}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let i=0,r=e.bones.length;i<r;i++){let s=e.bones[i],a=t[s];a===void 0&&(Ye("Skeleton: No bone found with UUID:",s),a=new Ca),this.bones.push(a),this.boneInverses.push(new at().fromArray(e.boneInverses[i]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,i=this.boneInverses;for(let r=0,s=t.length;r<s;r++){let a=t[r];e.bones.push(a.uuid);let o=i[r];e.boneInverses.push(o.toArray())}return e}},gr=class extends hn{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},ma=new at,wg=new at,vc=[],Rg=new ti,vy=new at,Ao=new cn,wo=new Vn,ko=class extends cn{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new gr(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,vy)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ti),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,ma),Rg.copy(e.boundingBox).applyMatrix4(ma),this.boundingBox.union(Rg)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Vn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,ma),wo.copy(e.boundingSphere).applyMatrix4(ma),this.boundingSphere.union(wo)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let i=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=i.length+1,a=e*s+1;for(let o=0;o<i.length;o++)i[o]=r[a+o]}raycast(e,t){let i=this.matrixWorld,r=this.count;if(Ao.geometry=this.geometry,Ao.material=this.material,Ao.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),wo.copy(this.boundingSphere),wo.applyMatrix4(i),e.ray.intersectsSphere(wo)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,ma),wg.multiplyMatrices(i,ma),Ao.matrixWorld=wg,Ao.raycast(e,vc);for(let a=0,o=vc.length;a<o;a++){let c=vc[a];c.instanceId=s,c.object=this,t.push(c)}vc.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new gr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let i=t.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new Pa(new Float32Array(r*this.count),r,this.count,ou,ii));let s=this.morphTexture.source.data.data,a=0;for(let l=0;l<i.length;l++)a+=i[l];let o=this.geometry.morphTargetsRelative?1:1-a,c=r*e;return s[c]=o,s.set(i,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},bs=new Vn,yy=new ht(.5,.5),yc=new Z,Na=class{constructor(e=new Mi,t=new Mi,i=new Mi,r=new Mi,s=new Mi,a=new Mi){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Ti,i=!1){let r=this.planes,s=e.elements,a=s[0],o=s[1],c=s[2],l=s[3],u=s[4],h=s[5],d=s[6],m=s[7],x=s[8],v=s[9],g=s[10],_=s[11],T=s[12],I=s[13],E=s[14],w=s[15];if(r[0].setComponents(l-a,m-u,_-x,w-T).normalize(),r[1].setComponents(l+a,m+u,_+x,w+T).normalize(),r[2].setComponents(l+o,m+h,_+v,w+I).normalize(),r[3].setComponents(l-o,m-h,_-v,w-I).normalize(),i)r[4].setComponents(c,d,g,E).normalize(),r[5].setComponents(l-c,m-d,_-g,w-E).normalize();else if(r[4].setComponents(l-c,m-d,_-g,w-E).normalize(),t===Ti)r[5].setComponents(l+c,m+d,_+g,w+E).normalize();else if(t===ba)r[5].setComponents(c,d,g,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),bs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),bs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(bs)}intersectsSprite(e){bs.center.set(0,0,0);let t=yy.distanceTo(e.center);return bs.radius=.7071067811865476+t,bs.applyMatrix4(e.matrixWorld),this.intersectsSphere(bs)}intersectsSphere(e){let t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let r=t[i];if(yc.x=r.normal.x>0?e.max.x:e.min.x,yc.y=r.normal.y>0?e.max.y:e.min.y,yc.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(yc)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var La=class extends Gn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new et(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},zc=new Z,Vc=new Z,Ig=new at,Ro=new Hr,Sc=new Vn,vd=new Z,Cg=new Z,ws=class extends $t{constructor(e=new Mn,t=new La){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)zc.fromBufferAttribute(t,r-1),Vc.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=zc.distanceTo(Vc);e.setAttribute("lineDistance",new xn(i,1))}else Ye("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Sc.copy(i.boundingSphere),Sc.applyMatrix4(r),Sc.radius+=s,e.ray.intersectsSphere(Sc)===!1)return;Ig.copy(r).invert(),Ro.copy(e.ray).applyMatrix4(Ig);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=i.index,d=i.attributes.position;if(u!==null){let m=Math.max(0,a.start),x=Math.min(u.count,a.start+a.count);for(let v=m,g=x-1;v<g;v+=l){let _=u.getX(v),T=u.getX(v+1),I=bc(this,e,Ro,c,_,T,v);I&&t.push(I)}if(this.isLineLoop){let v=u.getX(x-1),g=u.getX(m),_=bc(this,e,Ro,c,v,g,x-1);_&&t.push(_)}}else{let m=Math.max(0,a.start),x=Math.min(d.count,a.start+a.count);for(let v=m,g=x-1;v<g;v+=l){let _=bc(this,e,Ro,c,v,v+1,v);_&&t.push(_)}if(this.isLineLoop){let v=bc(this,e,Ro,c,x-1,m,x-1);v&&t.push(v)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}};function bc(n,e,t,i,r,s,a){let o=n.geometry.attributes.position;if(zc.fromBufferAttribute(o,r),Vc.fromBufferAttribute(o,s),t.distanceSqToSegment(zc,Vc,vd,Cg)>i)return;vd.applyMatrix4(n.matrixWorld);let l=e.ray.origin.distanceTo(vd);if(!(l<e.near||l>e.far))return{distance:l,point:Cg.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}var Pg=new Z,Ng=new Z,zo=class extends ws{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[];for(let r=0,s=t.count;r<s;r+=2)Pg.fromBufferAttribute(t,r),Ng.fromBufferAttribute(t,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+Pg.distanceTo(Ng);e.setAttribute("lineDistance",new xn(i,1))}else Ye("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Vo=class extends ws{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},Da=class extends Gn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new et(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Lg=new at,wd=new Hr,Mc=new Vn,Ec=new Z,Go=class extends $t{constructor(e=new Mn,t=new Da){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Mc.copy(i.boundingSphere),Mc.applyMatrix4(r),Mc.radius+=s,e.ray.intersectsSphere(Mc)===!1)return;Lg.copy(r).invert(),wd.copy(e.ray).applyMatrix4(Lg);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=i.index,h=i.attributes.position;if(l!==null){let d=Math.max(0,a.start),m=Math.min(l.count,a.start+a.count);for(let x=d,v=m;x<v;x++){let g=l.getX(x);Ec.fromBufferAttribute(h,g),Dg(Ec,g,c,r,e,t,this)}}else{let d=Math.max(0,a.start),m=Math.min(h.count,a.start+a.count);for(let x=d,v=m;x<v;x++)Ec.fromBufferAttribute(h,x),Dg(Ec,x,c,r,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}};function Dg(n,e,t,i,r,s,a){let o=wd.distanceSqToPoint(n);if(o<t){let c=new Z;wd.closestPointToPoint(n,c),c.applyMatrix4(i);let l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var Ho=class extends vn{constructor(e=[],t=qr,i,r,s,a,o,c,l,u){super(e,t,i,r,s,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}};var Wr=class extends vn{constructor(e,t,i=Ci,r,s,a,o=Yt,c=Yt,l,u=Vi,h=1){if(u!==Vi&&u!==Yr)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:h};super(d,r,s,a,o,c,u,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ta(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Gc=class extends Wr{constructor(e,t=Ci,i=qr,r,s,a=Yt,o=Yt,c,l=Vi){let u={width:e,height:e,depth:1},h=[u,u,u,u,u,u];super(e,e,t,i,r,s,a,o,c,l),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Wo=class extends vn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Ua=class n extends Mn{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};let o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);let c=[],l=[],u=[],h=[],d=0,m=0;x("z","y","x",-1,-1,i,t,e,a,s,0),x("z","y","x",1,-1,i,t,-e,a,s,1),x("x","z","y",1,1,e,i,t,r,a,2),x("x","z","y",1,-1,e,i,-t,r,a,3),x("x","y","z",1,-1,e,t,i,r,s,4),x("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new xn(l,3)),this.setAttribute("normal",new xn(u,3)),this.setAttribute("uv",new xn(h,2));function x(v,g,_,T,I,E,w,R,P,y,N){let k=E/P,W=w/y,q=E/2,ee=w/2,X=R/2,Q=P+1,oe=y+1,re=0,me=0,ne=new Z;for(let le=0;le<oe;le++){let he=le*W-ee;for(let Ge=0;Ge<Q;Ge++){let Ne=Ge*k-q;ne[v]=Ne*T,ne[g]=he*I,ne[_]=X,l.push(ne.x,ne.y,ne.z),ne[v]=0,ne[g]=0,ne[_]=R>0?1:-1,u.push(ne.x,ne.y,ne.z),h.push(Ge/P),h.push(1-le/y),re+=1}}for(let le=0;le<y;le++)for(let he=0;he<P;he++){let Ge=d+he+Q*le,Ne=d+he+Q*(le+1),vt=d+(he+1)+Q*(le+1),ie=d+(he+1)+Q*le;c.push(Ge,Ne,ie),c.push(Ne,vt,ie),me+=6}o.addGroup(m,me,N),m+=me,d+=re}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var Rs=class n extends Mn{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};let s=e/2,a=t/2,o=Math.floor(i),c=Math.floor(r),l=o+1,u=c+1,h=e/o,d=t/c,m=[],x=[],v=[],g=[];for(let _=0;_<u;_++){let T=_*d-a;for(let I=0;I<l;I++){let E=I*h-s;x.push(E,-T,0),v.push(0,0,1),g.push(I/o),g.push(1-_/c)}}for(let _=0;_<c;_++)for(let T=0;T<o;T++){let I=T+l*_,E=T+l*(_+1),w=T+1+l*(_+1),R=T+1+l*_;m.push(I,E,R),m.push(E,w,R)}this.setIndex(m),this.setAttribute("position",new xn(x,3)),this.setAttribute("normal",new xn(v,3)),this.setAttribute("uv",new xn(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}},Xo=class n extends Mn{constructor(e=.5,t=1,i=32,r=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:r,thetaStart:s,thetaLength:a},i=Math.max(3,i),r=Math.max(1,r);let o=[],c=[],l=[],u=[],h=e,d=(t-e)/r,m=new Z,x=new ht;for(let v=0;v<=r;v++){for(let g=0;g<=i;g++){let _=s+g/i*a;m.x=h*Math.cos(_),m.y=h*Math.sin(_),c.push(m.x,m.y,m.z),l.push(0,0,1),x.x=(m.x/t+1)/2,x.y=(m.y/t+1)/2,u.push(x.x,x.y)}h+=d}for(let v=0;v<r;v++){let g=v*(i+1);for(let _=0;_<i;_++){let T=_+g,I=T,E=T+i+1,w=T+i+2,R=T+1;o.push(I,E,R),o.push(E,w,R)}}this.setIndex(o),this.setAttribute("position",new xn(c,3)),this.setAttribute("normal",new xn(l,3)),this.setAttribute("uv",new xn(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}};function Ds(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let r=n[t][i];if(Ug(r))r.isRenderTargetTexture?(Ye("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(Ug(r[0])){let s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][i]=s}else e[t][i]=r.slice();else e[t][i]=r}}return e}function In(n){let e={};for(let t=0;t<n.length;t++){let i=Ds(n[t]);for(let r in i)e[r]=i[r]}return e}function Ug(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Sy(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function of(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:xt.workingColorSpace}var C_={clone:Ds,merge:In},by=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,My=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,ni=class extends Gn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=by,this.fragmentShader=My,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ds(e.uniforms),this.uniformsGroups=Sy(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let i in e.uniforms){let r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new et().setHex(r.value);break;case"v2":this.uniforms[i].value=new ht().fromArray(r.value);break;case"v3":this.uniforms[i].value=new Z().fromArray(r.value);break;case"v4":this.uniforms[i].value=new Ut().fromArray(r.value);break;case"m3":this.uniforms[i].value=new rt().fromArray(r.value);break;case"m4":this.uniforms[i].value=new at().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Hc=class extends ni{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Is=class extends Gn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new et(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new et(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Vu,this.normalScale=new ht(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new mr,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Wn=class extends Is{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ht(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return bt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new et(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new et(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new et(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Wc=class extends Gn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=g_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Xc=class extends Gn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function zr(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function Ic(n){return n!==void 0&&n.inTangents!==void 0&&n.outTangents!==void 0}function Ey(n){function e(r,s){return n[r]-n[s]}let t=n.length,i=new Array(t);for(let r=0;r!==t;++r)i[r]=r;return i.sort(e),i}function Og(n,e,t){let i=n.length,r=new n.constructor(i);for(let s=0,a=0;a!==i;++s){let o=t[s]*e;for(let c=0;c!==e;++c)r[a++]=n[o+c]}return r}function Ty(n,e,t,i){let r=1,s=n[0];for(;s!==void 0&&s[i]===void 0;)s=n[r++];if(s===void 0)return;let a=s[i];if(a!==void 0)if(Array.isArray(a))do a=s[i],a!==void 0&&(e.push(s.time),t.push(...a)),s=n[r++];while(s!==void 0);else if(a.toArray!==void 0)do a=s[i],a!==void 0&&(e.push(s.time),a.toArray(t,t.length)),s=n[r++];while(s!==void 0);else do a=s[i],a!==void 0&&(e.push(s.time),t.push(a)),s=n[r++];while(s!==void 0)}var Hi=class{constructor(e,t,i,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,r=t[i],s=t[i-1];e:{t:{let a;n:{i:if(!(e<r)){for(let o=i+2;;){if(r===void 0){if(e<s)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(s=r,r=t[++i],e<r)break t}a=t.length;break n}if(!(e>=s)){let o=t[1];e<o&&(i=2,s=o);for(let c=i-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===c)break;if(r=s,s=t[--i-1],e>=s)break t}a=i,i=0;break n}break e}for(;i<a;){let o=i+a>>>1;e<t[o]?a=o:i=o+1}if(r=t[i],s=t[i-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,s,r)}return this.interpolate_(i,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,r=this.valueSize,s=e*r;for(let a=0;a!==r;++a)t[a]=i[s+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},qc=class extends Hi{constructor(e,t,i,r){super(e,t,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ed,endingEnd:Ed}}intervalChanged_(e,t,i){let r=this.parameterPositions,s=e-2,a=e+1,o=r[s],c=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Td:s=e,o=2*t-i;break;case Ad:s=r.length-2,o=t+r[s]-r[s+1];break;default:s=e,o=i}if(c===void 0)switch(this.getSettings_().endingEnd){case Td:a=e,c=2*i-t;break;case Ad:a=1,c=i+r[1]-r[0];break;default:a=e-1,c=t}let l=(i-t)*.5,u=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-i),this._offsetPrev=s*u,this._offsetNext=a*u}interpolate_(e,t,i,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,m=this._weightNext,x=(i-t)/(r-t),v=x*x,g=v*x,_=-d*g+2*d*v-d*x,T=(1+d)*g+(-1.5-2*d)*v+(-.5+d)*x+1,I=(-1-m)*g+(1.5+m)*v+.5*x,E=m*g-m*v;for(let w=0;w!==o;++w)s[w]=_*a[u+w]+T*a[l+w]+I*a[c+w]+E*a[h+w];return s}},Yc=class extends Hi{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=(i-t)/(r-t),h=1-u;for(let d=0;d!==o;++d)s[d]=a[l+d]*h+a[c+d]*u;return s}},Zc=class extends Hi{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Kc=class extends Hi{interpolate_(e,t,i,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=this.inTangents,h=this.outTangents;if(!u||!h){let x=(i-t)/(r-t),v=1-x;for(let g=0;g!==o;++g)s[g]=a[l+g]*v+a[c+g]*x;return s}let d=o*2,m=e-1;for(let x=0;x!==o;++x){let v=a[l+x],g=a[c+x],_=m*d+x*2,T=h[_],I=h[_+1],E=e*d+x*2,w=u[E],R=u[E+1],P=wy(i,t,T,w,r);s[x]=P_(P,v,I,R,g)}return s}};function P_(n,e,t,i,r){let s=1-n;return s*s*s*e+3*s*s*n*t+3*s*n*n*i+n*n*n*r}function Ay(n,e,t,i,r){let s=1-n;return 3*s*s*(t-e)+6*s*n*(i-t)+3*n*n*(r-i)}function wy(n,e,t,i,r){let s=(n-e)/(r-e);for(let a=0;a<8;a++){let o=P_(s,e,t,i,r)-n;if(Math.abs(o)<1e-10)break;let c=Ay(s,e,t,i,r);if(Math.abs(c)<1e-10)break;s=Math.max(0,Math.min(1,s-o/c))}return s}var Xn=class{constructor(e,t,i,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=zr(t,this.TimeBufferType),this.values=zr(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:zr(e.times,Array),values:zr(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(i.interpolation=r),Ic(e.settings)&&(i.settings={inTangents:zr(e.settings.inTangents,Array),outTangents:zr(e.settings.outTangents,Array)})}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new Zc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Yc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new qc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Kc(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Es:t=this.InterpolantFactoryMethodDiscrete;break;case Ts:t=this.InterpolantFactoryMethodLinear;break;case wc:t=this.InterpolantFactoryMethodSmooth;break;case Md:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Ye("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Es;case this.InterpolantFactoryMethodLinear:return Ts;case this.InterpolantFactoryMethodSmooth:return wc;case this.InterpolantFactoryMethodBezier:return Md}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]*=e;Ic(this.settings)&&(Fg(this.settings.inTangents,e),Fg(this.settings.outTangents,e))}return this}trim(e,t){let i=this.times,r=i.length,s=0,a=r-1;for(;s!==r&&i[s]<e;)++s;for(;a!==-1&&i[a]>t;)--a;if(++a,s!==0||a!==r){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=i.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Qe("KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,r=this.values,s=i.length;s===0&&(Qe("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let c=i[o];if(typeof c=="number"&&isNaN(c)){Qe("KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){Qe("KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(r!==void 0&&Fv(r))for(let o=0,c=r.length;o!==c;++o){let l=r[o];if(isNaN(l)){Qe("KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===wc,s=e.length-1,a=1;for(let o=1;o<s;++o){let c=!1,l=e[o],u=e[o+1];if(l!==u&&(o!==1||l!==e[0]))if(r)c=!0;else{let h=o*i,d=h-i,m=h+i;for(let x=0;x!==i;++x){let v=t[h+x];if(v!==t[d+x]||v!==t[m+x]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let h=o*i,d=a*i;for(let m=0;m!==i;++m)t[d+m]=t[h+m]}++a}}if(s>0){e[a]=e[s];for(let o=s*i,c=a*i,l=0;l!==i;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,r=new i(this.name,e,t);return r.createInterpolant=this.createInterpolant,Ic(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function Fg(n,e){for(let t=0,i=n.length;t!==i;t+=2)n[t]*=e}Xn.prototype.ValueTypeName="";Xn.prototype.TimeBufferType=Float32Array;Xn.prototype.ValueBufferType=Float32Array;Xn.prototype.DefaultInterpolation=Ts;var _r=class extends Xn{constructor(e,t,i){super(e,t,i)}};_r.prototype.ValueTypeName="bool";_r.prototype.ValueBufferType=Array;_r.prototype.DefaultInterpolation=Es;_r.prototype.InterpolantFactoryMethodLinear=void 0;_r.prototype.InterpolantFactoryMethodSmooth=void 0;var qo=class extends Xn{constructor(e,t,i,r){super(e,t,i,r)}};qo.prototype.ValueTypeName="color";var xr=class extends Xn{constructor(e,t,i,r){super(e,t,i,r)}};xr.prototype.ValueTypeName="number";var jc=class extends Hi{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(i-t)/(r-t),l=e*o;for(let u=l+o;l!==u;l+=4)ei.slerpFlat(s,0,a,l-o,a,l,c);return s}},vr=class extends Xn{constructor(e,t,i,r){super(e,t,i,r)}InterpolantFactoryMethodLinear(e){return new jc(this.times,this.values,this.getValueSize(),e)}};vr.prototype.ValueTypeName="quaternion";vr.prototype.InterpolantFactoryMethodSmooth=void 0;var yr=class extends Xn{constructor(e,t,i){super(e,t,i)}};yr.prototype.ValueTypeName="string";yr.prototype.ValueBufferType=Array;yr.prototype.DefaultInterpolation=Es;yr.prototype.InterpolantFactoryMethodLinear=void 0;yr.prototype.InterpolantFactoryMethodSmooth=void 0;var Xr=class extends Xn{constructor(e,t,i,r){super(e,t,i,r)}};Xr.prototype.ValueTypeName="vector";var Yo=class{constructor(e="",t=-1,i=[],r=m_){this.name=e,this.tracks=i,this.duration=t,this.blendMode=r,this.uuid=wi(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],i=e.tracks,r=1/(e.fps||1);for(let a=0,o=i.length;a!==o;++a)t.push(Iy(i[a]).scale(r));let s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){let t=[],i=e.tracks,r={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,a=i.length;s!==a;++s)t.push(Xn.toJSON(i[s]));return r}static CreateFromMorphTargetSequence(e,t,i,r){let s=t.length,a=[];for(let o=0;o<s;o++){let c=[],l=[];c.push((o+s-1)%s,o,(o+1)%s),l.push(0,1,0);let u=Ey(c);c=Og(c,1,u),l=Og(l,1,u),!r&&c[0]===0&&(c.push(s),l.push(l[0])),a.push(new xr(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/i))}return new this(e,-1,a)}static findByName(e,t){let i=e;if(!Array.isArray(e)){let r=e;i=r.geometry&&r.geometry.animations||r.animations}for(let r=0;r<i.length;r++)if(i[r].name===t)return i[r];return null}static CreateClipsFromMorphTargetSequences(e,t,i){let r={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){let l=e[o],u=l.name.match(s);if(u&&u.length>1){let h=u[1],d=r[h];d||(r[h]=d=[]),d.push(l)}}let a=[];for(let o in r)a.push(this.CreateFromMorphTargetSequence(o,r[o],t,i));return a}resetDuration(){let e=this.tracks,t=0;for(let i=0,r=e.length;i!==r;++i){let s=this.tracks[i];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let i=0;i<this.tracks.length;i++)e.push(this.tracks[i].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function Ry(n){switch(n.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return xr;case"vector":case"vector2":case"vector3":case"vector4":return Xr;case"color":return qo;case"quaternion":return vr;case"bool":case"boolean":return _r;case"string":return yr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+n)}function Iy(n){if(n.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=Ry(n.type);if(n.times===void 0){let i=[],r=[];Ty(n.keys,i,r,"value"),n.times=i,n.values=r}let t;return e.parse!==void 0?t=e.parse(n):t=new e(n.name,n.times,n.values,n.interpolation),Ic(n.settings)&&(t.settings={inTangents:zr(n.settings.inTangents,Float32Array),outTangents:zr(n.settings.outTangents,Float32Array)}),t}var zi={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(Bg(n)||(this.files[n]=e))},get:function(n){if(this.enabled!==!1&&!Bg(n))return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};function Bg(n){try{let e=n.slice(n.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var $c=class{constructor(e,t,i){let r=this,s=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(u){o++,s===!1&&r.onStart!==void 0&&r.onStart(u,a,o),s=!0},this.itemEnd=function(u){a++,r.onProgress!==void 0&&r.onProgress(u,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,h){return l.push(u,h),this},this.removeHandler=function(u){let h=l.indexOf(u);return h!==-1&&l.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=l.length;h<d;h+=2){let m=l[h],x=l[h+1];if(m.global&&(m.lastIndex=0),m.test(u))return x}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},N_=new $c,Wi=class{constructor(e){this.manager=e!==void 0?e:N_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let i=this;return new Promise(function(r,s){i.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Wi.DEFAULT_MATERIAL_NAME="__DEFAULT";var fr={},Rd=class extends Error{constructor(e,t){super(e),this.response=t}},Oa=class extends Wi{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,i,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=zi.get(`file:${e}`);if(s!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0);return}if(fr[e]!==void 0){fr[e].push({onLoad:t,onProgress:i,onError:r});return}fr[e]=[],fr[e].push({onLoad:t,onProgress:i,onError:r});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&Ye("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let u=fr[e],h=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),m=d?parseInt(d):0,x=m!==0,v=0,g=new ReadableStream({start(_){T();function T(){h.read().then(({done:I,value:E})=>{if(I)_.close();else{v+=E.byteLength;let w=new ProgressEvent("progress",{lengthComputable:x,loaded:v,total:m});for(let R=0,P=u.length;R<P;R++){let y=u[R];y.onProgress&&y.onProgress(w)}_.enqueue(E),T()}},I=>{_.error(I)})}}});return new Response(g)}else throw new Rd(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return l.json();default:if(o==="")return l.text();{let h=/charset="?([^;"\s]*)"?/i.exec(o),d=h&&h[1]?h[1].toLowerCase():void 0,m=new TextDecoder(d);return l.arrayBuffer().then(x=>m.decode(x))}}}).then(l=>{zi.add(`file:${e}`,l);let u=fr[e];delete fr[e];for(let h=0,d=u.length;h<d;h++){let m=u[h];m.onLoad&&m.onLoad(l)}}).catch(l=>{let u=fr[e];if(u===void 0)throw this.manager.itemError(e),l;delete fr[e];for(let h=0,d=u.length;h<d;h++){let m=u[h];m.onError&&m.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var ga=new WeakMap,Jc=class extends Wi{constructor(e){super(e)}load(e,t,i,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,a=zi.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);else{let h=ga.get(a);h===void 0&&(h=[],ga.set(a,h)),h.push({onLoad:t,onError:r})}return a}let o=Ma("img");function c(){u(),t&&t(this);let h=ga.get(this)||[];for(let d=0;d<h.length;d++){let m=h[d];m.onLoad&&m.onLoad(this)}ga.delete(this),s.manager.itemEnd(e)}function l(h){u(),r&&r(h),zi.remove(`image:${e}`);let d=ga.get(this)||[];for(let m=0;m<d.length;m++){let x=d[m];x.onError&&x.onError(h)}ga.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),zi.add(`image:${e}`,o),s.manager.itemStart(e),o.src=e,o}};var Cs=class extends Wi{constructor(e){super(e)}load(e,t,i,r){let s=new vn,a=new Jc(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},i,r),s}},Fa=class extends $t{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new et(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}};var yd=new at,kg=new Z,zg=new Z,Ba=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ht(512,512),this.mapType=qn,this.map=null,this.mapPass=null,this.matrix=new at,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Na,this._frameExtents=new ht(1,1),this._viewportCount=1,this._viewports=[new Ut(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;kg.setFromMatrixPosition(e.matrixWorld),t.position.copy(kg),zg.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(zg),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,i,r){yd.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(yd,e.coordinateSystem,e.reversedDepth);let s=this._frameExtents,a=r?r.z/s.x:1,o=r?r.w/s.y:1,c=r?r.x/s.x:0,l=r?r.y/s.y:0;e.coordinateSystem===ba||e.reversedDepth?t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),t.multiply(yd)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Tc=new Z,Ac=new ei,ki=new Z,Zo=class extends $t{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new at,this.projectionMatrix=new at,this.projectionMatrixInverse=new at,this.coordinateSystem=Ti,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Tc,Ac,ki),ki.x===1&&ki.y===1&&ki.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Tc,Ac,ki.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Tc,Ac,ki),ki.x===1&&ki.y===1&&ki.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Tc,Ac,ki.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},kr=new Z,Vg=new ht,Gg=new ht,_n=class extends Zo{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=As*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Io*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return As*2*Math.atan(Math.tan(Io*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){kr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(kr.x,kr.y).multiplyScalar(-e/kr.z),kr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(kr.x,kr.y).multiplyScalar(-e/kr.z)}getViewSize(e,t){return this.getViewBounds(e,Vg,Gg),t.subVectors(Gg,Vg)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Io*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*r/c,t-=a.offsetY*i/l,r*=a.width/c,i*=a.height/l}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Id=class extends Ba{constructor(){super(new _n(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,i=As*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(i!==t.fov||r!==t.aspect||s!==t.far)&&(t.fov=i,t.aspect=r,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},Ko=class extends Fa{constructor(e,t,i=0,r=Math.PI/3,s=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy($t.DEFAULT_UP),this.updateMatrix(),this.target=new $t,this.distance=i,this.angle=r,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new Id}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},Cd=class extends Ba{constructor(){super(new _n(90,1,.5,500)),this.isPointLightShadow=!0}},jo=class extends Fa{constructor(e,t,i=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new Cd}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Xi=class extends Zo{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=i-e,a=i+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Pd=class extends Ba{constructor(){super(new Xi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},$o=class extends Fa{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy($t.DEFAULT_UP),this.updateMatrix(),this.target=new $t,this.shadow=new Pd}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var Sr=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var Sd=new WeakMap,Jo=class extends Wi{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Ye("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Ye("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,i,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,a=zi.get(`image-bitmap:${e}`);if(a!==void 0){if(s.manager.itemStart(e),a.then){a.then(l=>{Sd.has(a)===!0?(r&&r(Sd.get(a)),s.manager.itemError(e),s.manager.itemEnd(e)):(t&&t(l),s.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);return}let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign({},s.options,{colorSpaceConversion:"none"}))}).then(function(l){return zi.add(`image-bitmap:${e}`,l),t&&t(l),s.manager.itemEnd(e),l}).catch(function(l){r&&r(l),Sd.set(c,l),zi.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});zi.add(`image-bitmap:${e}`,c),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var _a=-90,xa=1,Qc=class extends $t{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new _n(_a,xa,e,t);r.layers=this.layers,this.add(r);let s=new _n(_a,xa,e,t);s.layers=this.layers,this.add(s);let a=new _n(_a,xa,e,t);a.layers=this.layers,this.add(a);let o=new _n(_a,xa,e,t);o.layers=this.layers,this.add(o);let c=new _n(_a,xa,e,t);c.layers=this.layers,this.add(c);let l=new _n(_a,xa,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,c]=t;for(let l of t)this.remove(l);if(e===Ti)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===ba)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,c,l,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;let v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,4,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(h,d,m),e.xr.enabled=x,i.texture.needsPMREMUpdate=!0}},eu=class extends _n{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var lf="\\[\\]\\.:\\/",Cy=new RegExp("["+lf+"]","g"),cf="[^"+lf+"]",Py="[^"+lf.replace("\\.","")+"]",Ny=/((?:WC+[\/:])*)/.source.replace("WC",cf),Ly=/(WCOD+)?/.source.replace("WCOD",Py),Dy=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",cf),Uy=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",cf),Oy=new RegExp("^"+Ny+Ly+Dy+Uy+"$"),Fy=["material","materials","bones","map"],Nd=class{constructor(e,t,i){let r=i||Gt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=i.length;r!==s;++r)i[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},Gt=class n{constructor(e,t,i){this.path=t,this.parsedPath=i||n.parseTrackName(t),this.node=n.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new n.Composite(e,t,i):new n(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Cy,"")}static parseTrackName(e){let t=Oy.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=i.nodeName&&i.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=i.nodeName.substring(r+1);Fy.indexOf(s)!==-1&&(i.nodeName=i.nodeName.substring(0,r),i.objectName=s)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let c=i(o.children);if(c)return c}return null},r=i(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)e[t++]=i[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,r=t.propertyName,s=t.propertyIndex;if(e||(e=n.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ye("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let l=t.objectIndex;switch(i){case"materials":if(!e.material){Qe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Qe("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Qe("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Qe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Qe("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){Qe("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(l!==void 0){if(e[l]===void 0){Qe("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let a=e[r];if(a===void 0){let l=t.nodeName;Qe("PropertyBinding: Trying to update property for track: "+l+"."+r+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){Qe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Qe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=r;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Gt.Composite=Nd;Gt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Gt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Gt.prototype.GetterByBindingType=[Gt.prototype._getValue_direct,Gt.prototype._getValue_array,Gt.prototype._getValue_arrayElement,Gt.prototype._getValue_toArray];Gt.prototype.SetterByBindingTypeAndVersioning=[[Gt.prototype._setValue_direct,Gt.prototype._setValue_direct_setNeedsUpdate,Gt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Gt.prototype._setValue_array,Gt.prototype._setValue_array_setNeedsUpdate,Gt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Gt.prototype._setValue_arrayElement,Gt.prototype._setValue_arrayElement_setNeedsUpdate,Gt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Gt.prototype._setValue_fromArray,Gt.prototype._setValue_fromArray_setNeedsUpdate,Gt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var PI=new Float32Array(1);var Hg=new at,Qo=class{constructor(e,t,i=0,r=1/0){this.ray=new Hr(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new Aa,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Qe("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Hg.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Hg),this}intersectObject(e,t=!0,i=[]){return Ld(e,this,i,t),i.sort(Wg),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)Ld(e[r],this,i,t);return i.sort(Wg),i}};function Wg(n,e){return n.distance-e.distance}function Ld(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){let s=n.children;for(let a=0,o=s.length;a<o;a++)Ld(s[a],e,t,!0)}}var Dd=class n{static{n.prototype.isMatrix2=!0}constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){let s=this.elements;return s[0]=e,s[2]=t,s[1]=i,s[3]=r,this}};function uf(n,e,t,i){let r=By(i);switch(t){case ef:return n*e;case ou:return n*e/r.components*r.byteLength;case lu:return n*e/r.components*r.byteLength;case Zr:return n*e*2/r.components*r.byteLength;case cu:return n*e*2/r.components*r.byteLength;case tf:return n*e*3/r.components*r.byteLength;case ri:return n*e*4/r.components*r.byteLength;case uu:return n*e*4/r.components*r.byteLength;case nl:case il:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case rl:case sl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case du:case pu:return Math.max(n,16)*Math.max(e,8)/4;case hu:case fu:return Math.max(n,8)*Math.max(e,8)/2;case mu:case gu:case xu:case vu:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case _u:case al:case yu:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Su:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case bu:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Mu:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Eu:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Tu:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Au:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case wu:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Ru:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Iu:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Cu:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Pu:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Nu:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Lu:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Du:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Uu:case Ou:case Fu:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Bu:case ku:return Math.ceil(n/4)*Math.ceil(e/4)*8;case ol:case zu:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function By(n){switch(n){case qn:case jd:return{byteLength:1,components:1};case Ga:case $d:case Pi:return{byteLength:2,components:1};case su:case au:return{byteLength:2,components:4};case Ci:case ru:case ii:return{byteLength:4,components:1};case Jd:case Qd:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Ye("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function e0(){let n=null,e=!1,t=null,i=null;function r(s,a){i=n.requestAnimationFrame(r),t(s,a)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function zy(n){let e=new WeakMap;function t(o,c){let l=o.array,u=o.usage,h=l.byteLength,d=n.createBuffer();n.bindBuffer(c,d),n.bufferData(c,l,u),o.onUploadCallback();let m;if(l instanceof Float32Array)m=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)m=n.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?m=n.HALF_FLOAT:m=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=n.SHORT;else if(l instanceof Uint32Array)m=n.UNSIGNED_INT;else if(l instanceof Int32Array)m=n.INT;else if(l instanceof Int8Array)m=n.BYTE;else if(l instanceof Uint8Array)m=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:h}}function i(o,c,l){let u=c.array,h=c.updateRanges;if(n.bindBuffer(l,o),h.length===0)n.bufferSubData(l,0,u);else{h.sort((m,x)=>m.start-x.start);let d=0;for(let m=1;m<h.length;m++){let x=h[d],v=h[m];v.start<=x.start+x.count+1?x.count=Math.max(x.count,v.start+v.count-x.start):(++d,h[d]=v)}h.length=d+1;for(let m=0,x=h.length;m<x;m++){let v=h[m];n.bufferSubData(l,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=e.get(o);c&&(n.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:r,remove:s,update:a}}var Vy=`#ifdef USE_ALPHAHASH
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
}`,mt={alphahash_fragment:Vy,alphahash_pars_fragment:Gy,alphamap_fragment:Hy,alphamap_pars_fragment:Wy,alphatest_fragment:Xy,alphatest_pars_fragment:qy,aomap_fragment:Yy,aomap_pars_fragment:Zy,batching_pars_vertex:Ky,batching_vertex:jy,begin_vertex:$y,beginnormal_vertex:Jy,bsdfs:Qy,iridescence_fragment:eS,bumpmap_pars_fragment:tS,clipping_planes_fragment:nS,clipping_planes_pars_fragment:iS,clipping_planes_pars_vertex:rS,clipping_planes_vertex:sS,color_fragment:aS,color_pars_fragment:oS,color_pars_vertex:lS,color_vertex:cS,common:uS,cube_uv_reflection_fragment:hS,defaultnormal_vertex:dS,displacementmap_pars_vertex:fS,displacementmap_vertex:pS,emissivemap_fragment:mS,emissivemap_pars_fragment:gS,colorspace_fragment:_S,colorspace_pars_fragment:xS,envmap_fragment:vS,envmap_common_pars_fragment:yS,envmap_pars_fragment:SS,envmap_pars_vertex:bS,envmap_physical_pars_fragment:LS,envmap_vertex:MS,fog_vertex:ES,fog_pars_vertex:TS,fog_fragment:AS,fog_pars_fragment:wS,gradientmap_pars_fragment:RS,lightmap_pars_fragment:IS,lights_lambert_fragment:CS,lights_lambert_pars_fragment:PS,lights_pars_begin:NS,lights_toon_fragment:DS,lights_toon_pars_fragment:US,lights_phong_fragment:OS,lights_phong_pars_fragment:FS,lights_physical_fragment:BS,lights_physical_pars_fragment:kS,lights_fragment_begin:zS,lights_fragment_maps:VS,lights_fragment_end:GS,lightprobes_pars_fragment:HS,logdepthbuf_fragment:WS,logdepthbuf_pars_fragment:XS,logdepthbuf_pars_vertex:qS,logdepthbuf_vertex:YS,map_fragment:ZS,map_pars_fragment:KS,map_particle_fragment:jS,map_particle_pars_fragment:$S,metalnessmap_fragment:JS,metalnessmap_pars_fragment:QS,morphinstance_vertex:eb,morphcolor_vertex:tb,morphnormal_vertex:nb,morphtarget_pars_vertex:ib,morphtarget_vertex:rb,normal_fragment_begin:sb,normal_fragment_maps:ab,normal_pars_fragment:ob,normal_pars_vertex:lb,normal_vertex:cb,normalmap_pars_fragment:ub,clearcoat_normal_fragment_begin:hb,clearcoat_normal_fragment_maps:db,clearcoat_pars_fragment:fb,iridescence_pars_fragment:pb,opaque_fragment:mb,packing:gb,premultiplied_alpha_fragment:_b,project_vertex:xb,dithering_fragment:vb,dithering_pars_fragment:yb,roughnessmap_fragment:Sb,roughnessmap_pars_fragment:bb,shadowmap_pars_fragment:Mb,shadowmap_pars_vertex:Eb,shadowmap_vertex:Tb,shadowmask_pars_fragment:Ab,skinbase_vertex:wb,skinning_pars_vertex:Rb,skinning_vertex:Ib,skinnormal_vertex:Cb,specularmap_fragment:Pb,specularmap_pars_fragment:Nb,tonemapping_fragment:Lb,tonemapping_pars_fragment:Db,transmission_fragment:Ub,transmission_pars_fragment:Ob,uv_pars_fragment:Fb,uv_pars_vertex:Bb,uv_vertex:kb,worldpos_vertex:zb,background_vert:Vb,background_frag:Gb,backgroundCube_vert:Hb,backgroundCube_frag:Wb,cube_vert:Xb,cube_frag:qb,depth_vert:Yb,depth_frag:Zb,distance_vert:Kb,distance_frag:jb,equirect_vert:$b,equirect_frag:Jb,linedashed_vert:Qb,linedashed_frag:eM,meshbasic_vert:tM,meshbasic_frag:nM,meshlambert_vert:iM,meshlambert_frag:rM,meshmatcap_vert:sM,meshmatcap_frag:aM,meshnormal_vert:oM,meshnormal_frag:lM,meshphong_vert:cM,meshphong_frag:uM,meshphysical_vert:hM,meshphysical_frag:dM,meshtoon_vert:fM,meshtoon_frag:pM,points_vert:mM,points_frag:gM,shadow_vert:_M,shadow_frag:xM,sprite_vert:vM,sprite_frag:yM},Re={common:{diffuse:{value:new et(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new rt},alphaMap:{value:null},alphaMapTransform:{value:new rt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new rt}},envmap:{envMap:{value:null},envMapRotation:{value:new rt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new rt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new rt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new rt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new rt},normalScale:{value:new ht(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new rt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new rt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new rt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new rt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new et(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new Z},probesMax:{value:new Z},probesResolution:{value:new Z}},points:{diffuse:{value:new et(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new rt},alphaTest:{value:0},uvTransform:{value:new rt}},sprite:{diffuse:{value:new et(16777215)},opacity:{value:1},center:{value:new ht(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new rt},alphaMap:{value:null},alphaMapTransform:{value:new rt},alphaTest:{value:0}}},Ki={basic:{uniforms:In([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.fog]),vertexShader:mt.meshbasic_vert,fragmentShader:mt.meshbasic_frag},lambert:{uniforms:In([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,Re.lights,{emissive:{value:new et(0)},envMapIntensity:{value:1}}]),vertexShader:mt.meshlambert_vert,fragmentShader:mt.meshlambert_frag},phong:{uniforms:In([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,Re.lights,{emissive:{value:new et(0)},specular:{value:new et(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:mt.meshphong_vert,fragmentShader:mt.meshphong_frag},standard:{uniforms:In([Re.common,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.roughnessmap,Re.metalnessmap,Re.fog,Re.lights,{emissive:{value:new et(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:mt.meshphysical_vert,fragmentShader:mt.meshphysical_frag},toon:{uniforms:In([Re.common,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.gradientmap,Re.fog,Re.lights,{emissive:{value:new et(0)}}]),vertexShader:mt.meshtoon_vert,fragmentShader:mt.meshtoon_frag},matcap:{uniforms:In([Re.common,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,{matcap:{value:null}}]),vertexShader:mt.meshmatcap_vert,fragmentShader:mt.meshmatcap_frag},points:{uniforms:In([Re.points,Re.fog]),vertexShader:mt.points_vert,fragmentShader:mt.points_frag},dashed:{uniforms:In([Re.common,Re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:mt.linedashed_vert,fragmentShader:mt.linedashed_frag},depth:{uniforms:In([Re.common,Re.displacementmap]),vertexShader:mt.depth_vert,fragmentShader:mt.depth_frag},normal:{uniforms:In([Re.common,Re.bumpmap,Re.normalmap,Re.displacementmap,{opacity:{value:1}}]),vertexShader:mt.meshnormal_vert,fragmentShader:mt.meshnormal_frag},sprite:{uniforms:In([Re.sprite,Re.fog]),vertexShader:mt.sprite_vert,fragmentShader:mt.sprite_frag},background:{uniforms:{uvTransform:{value:new rt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:mt.background_vert,fragmentShader:mt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new rt}},vertexShader:mt.backgroundCube_vert,fragmentShader:mt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:mt.cube_vert,fragmentShader:mt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:mt.equirect_vert,fragmentShader:mt.equirect_frag},distance:{uniforms:In([Re.common,Re.displacementmap,{referencePosition:{value:new Z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:mt.distance_vert,fragmentShader:mt.distance_frag},shadow:{uniforms:In([Re.lights,Re.fog,{color:{value:new et(0)},opacity:{value:1}}]),vertexShader:mt.shadow_vert,fragmentShader:mt.shadow_frag}};Ki.physical={uniforms:In([Ki.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new rt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new rt},clearcoatNormalScale:{value:new ht(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new rt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new rt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new rt},sheen:{value:0},sheenColor:{value:new et(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new rt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new rt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new rt},transmissionSamplerSize:{value:new ht},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new rt},attenuationDistance:{value:0},attenuationColor:{value:new et(0)},specularColor:{value:new et(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new rt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new rt},anisotropyVector:{value:new ht},anisotropyMap:{value:null},anisotropyMapTransform:{value:new rt}}]),vertexShader:mt.meshphysical_vert,fragmentShader:mt.meshphysical_frag};var Wu={r:0,b:0,g:0},SM=new at,t0=new rt;t0.set(-1,0,0,0,1,0,0,0,1);function bM(n,e,t,i,r,s){let a=new et(0),o=r===!0?0:1,c,l,u=null,h=0,d=null;function m(T){let I=T.isScene===!0?T.background:null;if(I&&I.isTexture){let E=T.backgroundBlurriness>0;I=e.get(I,E)}return I}function x(T){let I=!1,E=m(T);E===null?g(a,o):E&&E.isColor&&(g(E,1),I=!0);let w=n.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,s):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||I)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function v(T,I){let E=m(I);E&&(E.isCubeTexture||E.mapping===tl)?(l===void 0&&(l=new cn(new Ua(1,1,1),new ni({name:"BackgroundCubeMaterial",uniforms:Ds(Ki.backgroundCube.uniforms),vertexShader:Ki.backgroundCube.vertexShader,fragmentShader:Ki.backgroundCube.fragmentShader,side:Dn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(w,R,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=E,l.material.uniforms.backgroundBlurriness.value=I.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=I.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(SM.makeRotationFromEuler(I.backgroundRotation)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(t0),l.material.toneMapped=xt.getTransfer(E.colorSpace)!==Pt,(u!==E||h!==E.version||d!==n.toneMapping)&&(l.material.needsUpdate=!0,u=E,h=E.version,d=n.toneMapping),l.layers.enableAll(),T.unshift(l,l.geometry,l.material,0,0,null)):E&&E.isTexture&&(c===void 0&&(c=new cn(new Rs(2,2),new ni({name:"BackgroundMaterial",uniforms:Ds(Ki.background.uniforms),vertexShader:Ki.background.vertexShader,fragmentShader:Ki.background.fragmentShader,side:qi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=E,c.material.uniforms.backgroundIntensity.value=I.backgroundIntensity,c.material.toneMapped=xt.getTransfer(E.colorSpace)!==Pt,E.matrixAutoUpdate===!0&&E.updateMatrix(),c.material.uniforms.uvTransform.value.copy(E.matrix),(u!==E||h!==E.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,u=E,h=E.version,d=n.toneMapping),c.layers.enableAll(),T.unshift(c,c.geometry,c.material,0,0,null))}function g(T,I){T.getRGB(Wu,of(n)),t.buffers.color.setClear(Wu.r,Wu.g,Wu.b,I,s)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(T,I=1){a.set(T),o=I,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(T){o=T,g(a,o)},render:x,addToRenderList:v,dispose:_}}function MM(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=d(null),s=r,a=!1;function o(W,q,ee,X,Q){let oe=!1,re=h(W,X,ee,q);s!==re&&(s=re,l(s.object)),oe=m(W,X,ee,Q),oe&&x(W,X,ee,Q),Q!==null&&e.update(Q,n.ELEMENT_ARRAY_BUFFER),(oe||a)&&(a=!1,E(W,q,ee,X),Q!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(Q).buffer))}function c(){return n.createVertexArray()}function l(W){return n.bindVertexArray(W)}function u(W){return n.deleteVertexArray(W)}function h(W,q,ee,X){let Q=X.wireframe===!0,oe=i[q.id];oe===void 0&&(oe={},i[q.id]=oe);let re=W.isInstancedMesh===!0?W.id:0,me=oe[re];me===void 0&&(me={},oe[re]=me);let ne=me[ee.id];ne===void 0&&(ne={},me[ee.id]=ne);let le=ne[Q];return le===void 0&&(le=d(c()),ne[Q]=le),le}function d(W){let q=[],ee=[],X=[];for(let Q=0;Q<t;Q++)q[Q]=0,ee[Q]=0,X[Q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:q,enabledAttributes:ee,attributeDivisors:X,object:W,attributes:{},index:null}}function m(W,q,ee,X){let Q=s.attributes,oe=q.attributes,re=0,me=ee.getAttributes();for(let ne in me)if(me[ne].location>=0){let he=Q[ne],Ge=oe[ne];if(Ge===void 0&&(ne==="instanceMatrix"&&W.instanceMatrix&&(Ge=W.instanceMatrix),ne==="instanceColor"&&W.instanceColor&&(Ge=W.instanceColor)),he===void 0||he.attribute!==Ge||Ge&&he.data!==Ge.data)return!0;re++}return s.attributesNum!==re||s.index!==X}function x(W,q,ee,X){let Q={},oe=q.attributes,re=0,me=ee.getAttributes();for(let ne in me)if(me[ne].location>=0){let he=oe[ne];he===void 0&&(ne==="instanceMatrix"&&W.instanceMatrix&&(he=W.instanceMatrix),ne==="instanceColor"&&W.instanceColor&&(he=W.instanceColor));let Ge={};Ge.attribute=he,he&&he.data&&(Ge.data=he.data),Q[ne]=Ge,re++}s.attributes=Q,s.attributesNum=re,s.index=X}function v(){let W=s.newAttributes;for(let q=0,ee=W.length;q<ee;q++)W[q]=0}function g(W){_(W,0)}function _(W,q){let ee=s.newAttributes,X=s.enabledAttributes,Q=s.attributeDivisors;ee[W]=1,X[W]===0&&(n.enableVertexAttribArray(W),X[W]=1),Q[W]!==q&&(n.vertexAttribDivisor(W,q),Q[W]=q)}function T(){let W=s.newAttributes,q=s.enabledAttributes;for(let ee=0,X=q.length;ee<X;ee++)q[ee]!==W[ee]&&(n.disableVertexAttribArray(ee),q[ee]=0)}function I(W,q,ee,X,Q,oe,re){re===!0?n.vertexAttribIPointer(W,q,ee,Q,oe):n.vertexAttribPointer(W,q,ee,X,Q,oe)}function E(W,q,ee,X){v();let Q=X.attributes,oe=ee.getAttributes(),re=q.defaultAttributeValues;for(let me in oe){let ne=oe[me];if(ne.location>=0){let le=Q[me];if(le===void 0&&(me==="instanceMatrix"&&W.instanceMatrix&&(le=W.instanceMatrix),me==="instanceColor"&&W.instanceColor&&(le=W.instanceColor)),le!==void 0){let he=le.normalized,Ge=le.itemSize,Ne=e.get(le);if(Ne===void 0)continue;let vt=Ne.buffer,ie=Ne.type,Te=Ne.bytesPerElement,K=ie===n.INT||ie===n.UNSIGNED_INT||le.gpuType===ru;if(le.isInterleavedBufferAttribute){let $=le.data,be=$.stride,Ie=le.offset;if($.isInstancedInterleavedBuffer){for(let de=0;de<ne.locationSize;de++)_(ne.location+de,$.meshPerAttribute);W.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let de=0;de<ne.locationSize;de++)g(ne.location+de);n.bindBuffer(n.ARRAY_BUFFER,vt);for(let de=0;de<ne.locationSize;de++)I(ne.location+de,Ge/ne.locationSize,ie,he,be*Te,(Ie+Ge/ne.locationSize*de)*Te,K)}else{if(le.isInstancedBufferAttribute){for(let $=0;$<ne.locationSize;$++)_(ne.location+$,le.meshPerAttribute);W.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let $=0;$<ne.locationSize;$++)g(ne.location+$);n.bindBuffer(n.ARRAY_BUFFER,vt);for(let $=0;$<ne.locationSize;$++)I(ne.location+$,Ge/ne.locationSize,ie,he,Ge*Te,Ge/ne.locationSize*$*Te,K)}}else if(re!==void 0){let he=re[me];if(he!==void 0)switch(he.length){case 2:n.vertexAttrib2fv(ne.location,he);break;case 3:n.vertexAttrib3fv(ne.location,he);break;case 4:n.vertexAttrib4fv(ne.location,he);break;default:n.vertexAttrib1fv(ne.location,he)}}}}T()}function w(){N();for(let W in i){let q=i[W];for(let ee in q){let X=q[ee];for(let Q in X){let oe=X[Q];for(let re in oe)u(oe[re].object),delete oe[re];delete X[Q]}}delete i[W]}}function R(W){if(i[W.id]===void 0)return;let q=i[W.id];for(let ee in q){let X=q[ee];for(let Q in X){let oe=X[Q];for(let re in oe)u(oe[re].object),delete oe[re];delete X[Q]}}delete i[W.id]}function P(W){for(let q in i){let ee=i[q];for(let X in ee){let Q=ee[X];if(Q[W.id]===void 0)continue;let oe=Q[W.id];for(let re in oe)u(oe[re].object),delete oe[re];delete Q[W.id]}}}function y(W){for(let q in i){let ee=i[q],X=W.isInstancedMesh===!0?W.id:0,Q=ee[X];if(Q!==void 0){for(let oe in Q){let re=Q[oe];for(let me in re)u(re[me].object),delete re[me];delete Q[oe]}delete ee[X],Object.keys(ee).length===0&&delete i[q]}}}function N(){k(),a=!0,s!==r&&(s=r,l(s.object))}function k(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:N,resetDefaultState:k,dispose:w,releaseStatesOfGeometry:R,releaseStatesOfObject:y,releaseStatesOfProgram:P,initAttributes:v,enableAttribute:g,disableUnusedAttributes:T}}function EM(n,e,t){let i;function r(c){i=c}function s(c,l){n.drawArrays(i,c,l),t.update(l,i,1)}function a(c,l,u){u!==0&&(n.drawArraysInstanced(i,c,l,u),t.update(l,i,u))}function o(c,l,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,u);let d=0;for(let m=0;m<u;m++)d+=l[m];t.update(d,i,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function TM(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let P=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(P){return!(P!==ri&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){let y=P===Pi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==qn&&P!==ii&&!y&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function c(P){if(P==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",u=c(l);u!==l&&(Ye("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let h=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&Ye("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let m=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),_=n.getParameter(n.MAX_VERTEX_ATTRIBS),T=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),I=n.getParameter(n.MAX_VARYING_VECTORS),E=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),w=n.getParameter(n.MAX_SAMPLES),R=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:h,reversedDepthBuffer:d,maxTextures:m,maxVertexTextures:x,maxTextureSize:v,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:T,maxVaryings:I,maxFragmentUniforms:E,maxSamples:w,samples:R}}function AM(n){let e=this,t=null,i=0,r=!1,s=!1,a=new Mi,o=new rt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){let m=h.length!==0||d||i!==0||r;return r=d,i=h.length,m},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,m){let x=h.clippingPlanes,v=h.clipIntersection,g=h.clipShadows,_=n.get(h);if(!r||x===null||x.length===0||s&&!g)s?u(null):l();else{let T=s?0:i,I=T*4,E=_.clippingState||null;c.value=E,E=u(x,d,I,m);for(let w=0;w!==I;++w)E[w]=t[w];_.clippingState=E,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=T}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(h,d,m,x){let v=h!==null?h.length:0,g=null;if(v!==0){if(g=c.value,x!==!0||g===null){let _=m+v*4,T=d.matrixWorldInverse;o.getNormalMatrix(T),(g===null||g.length<_)&&(g=new Float32Array(_));for(let I=0,E=m;I!==v;++I,E+=4)a.copy(h[I]).applyMatrix4(T,o),a.normal.toArray(g,E),g[E+3]=a.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,g}}var Ya=4,wM=6,RM=20,IM=256,cl=new Xi,L_=new et,hf=null,df=0,ff=0,pf=!1,CM=new Z,Us=new Z,qu=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){let{size:a=256,position:o=CM}=s;hf=this._renderer.getRenderTarget(),df=this._renderer.getActiveCubeFace(),ff=this._renderer.getActiveMipmapLevel(),pf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,r,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=O_(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=U_(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(hf,df,ff),this._renderer.xr.enabled=pf,e.scissorTest=!1,qa(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===qr||e.mapping===Ns?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),hf=this._renderer.getRenderTarget(),df=this._renderer.getActiveCubeFace(),ff=this._renderer.getActiveMipmapLevel(),pf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:jt,minFilter:jt,generateMipmaps:!1,type:Pi,format:ri,colorSpace:Ln,depthBuffer:!1},r=D_(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=D_(e,t,i);let{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=PM(s)),this._blurMaterial=LM(s,e,t),this._ggxMaterial=NM(s,e,t)}return r}_compileMaterial(e){let t=new cn(new Mn,e);this._renderer.compile(t,cl)}_sceneToCubeUV(e,t,i,r,s){let c=new _n(90,1,t,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,m=h.toneMapping;h.getClearColor(L_),h.toneMapping=Ri,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(r),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new cn(new Ua,new Hn({name:"PMREM.Background",side:Dn,depthWrite:!1,depthTest:!1})));let v=this._backgroundBox,g=v.material,_=!1,T=e.background;T?T.isColor&&(g.color.copy(T),e.background=null,_=!0):(g.color.copy(L_),_=!0);for(let I=0;I<6;I++){let E=I%3;E===0?(c.up.set(0,l[I],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+u[I],s.y,s.z)):E===1?(c.up.set(0,0,l[I]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+u[I],s.z)):(c.up.set(0,l[I],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+u[I]));let w=this._cubeSize;qa(r,E*w,I>2?w:0,w,w),h.setRenderTarget(r),_&&h.render(v,c),h.render(e,c)}h.toneMapping=m,h.autoClear=d,e.background=T}_textureToCubeUV(e,t){let i=this._renderer,r=e.mapping===qr||e.mapping===Ns;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=O_()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=U_());let s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;let o=s.uniforms;o.envMap.value=e;let c=this._cubeSize;qa(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(a,cl)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){let r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;let c=a.uniforms,l=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),h=Math.sqrt(l*l-u*u),d=l*1.25,m=h*d,{_lodMax:x}=this,v=this._sizeLods[i],g=3*v*(i>x-Ya?i-x+Ya:0),_=4*(this._cubeSize-v);c.envMap.value=e.texture,c.roughness.value=m,c.mipInt.value=x-t,qa(s,g,_,3*v,2*v),r.setRenderTarget(s),r.render(o,cl),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=x-i,qa(e,g,_,3*v,2*v),r.setRenderTarget(e),r.render(o,cl)}_blur(e,t,i,r){let s=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,s,t,i,a),this._blurPass(s,e,i,i,a)}_blurPass(e,t,i,r,s){let a=this._renderer,o=this._blurMaterial,c=this._lodMeshes[r];c.material=o;let l=o.uniforms;l.envMap.value=e.texture,l.sigma.value=s,l.mipInt.value=this._lodMax-i;let u=this._sizeLods[r],h=3*u*(r>this._lodMax-Ya?r-this._lodMax+Ya:0),d=4*(this._cubeSize-u);qa(t,h,d,3*u,2*u),a.setRenderTarget(t),a.render(c,cl)}};function PM(n){let e=[],t=[],i=n,r=n-Ya+1+wM;for(let s=0;s<r;s++){let a=Math.pow(2,i);e.push(a);let o=1/(a-2),c=-o,l=1+o,u=[c,c,l,c,l,l,c,c,l,l,c,l],h=6,d=6,m=3,x=new Float32Array(m*d*h),v=new Float32Array(m*d*h);for(let _=0;_<h;_++){let T=_%3*2/3-1,I=_>2?0:-1,E=[T,I,0,T+2/3,I,0,T+2/3,I+1,0,T,I,0,T+2/3,I+1,0,T,I+1,0];x.set(E,m*d*_);for(let w=0;w<d;w++){let R=u[w*2]*2-1,P=u[w*2+1]*2-1;_===0?Us.set(1,P,R):_===1?Us.set(-R,1,-P):_===2?Us.set(-R,P,1):_===3?Us.set(-1,P,-R):_===4?Us.set(-R,-1,P):Us.set(R,P,-1),Us.toArray(v,(_*d+w)*m)}}let g=new Mn;g.setAttribute("position",new hn(x,m)),g.setAttribute("outputDirection",new hn(v,m)),t.push(new cn(g,null)),i>Ya&&i--}return{lodMeshes:t,sizeLods:e}}function D_(n,e,t){let i=new zn(n,e,t);return i.texture.mapping=tl,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function qa(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function NM(n,e,t){return new ni({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:IM,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ku(),fragmentShader:`

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
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function LM(n,e,t){return new ni({name:"SphericalGaussianBlur",defines:{SAMPLES:RM,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Ku(),fragmentShader:`

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
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function U_(){return new ni({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ku(),fragmentShader:`

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
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function O_(){return new ni({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ku(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function Ku(){return`

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
			`},r=new Ua(5,5,5),s=new ni({name:"CubemapFromEquirect",uniforms:Ds(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Dn,blending:Yi});s.uniforms.tEquirect.value=t;let a=new cn(r,s),o=t.minFilter;return t.minFilter===Ii&&(t.minFilter=jt),new Qc(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}};function DM(n){let e=new WeakMap,t=new WeakMap,i=null;function r(d,m=!1){return d==null?null:m?a(d):s(d)}function s(d){if(d&&d.isTexture){let m=d.mapping;if(m===tu||m===nu)if(e.has(d)){let x=e.get(d).texture;return o(x,d.mapping)}else{let x=d.image;if(x&&x.height>0){let v=new Yu(x.height);return v.fromEquirectangularTexture(n,d),e.set(d,v),d.addEventListener("dispose",l),o(v.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){let m=d.mapping,x=m===tu||m===nu,v=m===qr||m===Ns;if(x||v){let g=t.get(d),_=g!==void 0?g.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==_)return i===null&&(i=new qu(n)),g=x?i.fromEquirectangular(d,g):i.fromCubemap(d,g),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),g.texture;if(g!==void 0)return g.texture;{let T=d.image;return x&&T&&T.height>0||v&&T&&c(T)?(i===null&&(i=new qu(n)),g=x?i.fromEquirectangular(d):i.fromCubemap(d),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),d.addEventListener("dispose",u),g.texture):null}}}return d}function o(d,m){return m===tu?d.mapping=qr:m===nu&&(d.mapping=Ns),d}function c(d){let m=0,x=6;for(let v=0;v<x;v++)d[v]!==void 0&&m++;return m===x}function l(d){let m=d.target;m.removeEventListener("dispose",l);let x=e.get(m);x!==void 0&&(e.delete(m),x.dispose())}function u(d){let m=d.target;m.removeEventListener("dispose",u);let x=t.get(m);x!==void 0&&(t.delete(m),x.dispose())}function h(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:h}}function UM(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let r=t(i);return r===null&&Ms("WebGLRenderer: "+i+" extension not supported."),r}}}function OM(n,e,t,i){let r={},s=new WeakMap;function a(h){let d=h.target;d.index!==null&&e.remove(d.index);for(let x in d.attributes)e.remove(d.attributes[x]);d.removeEventListener("dispose",a),delete r[d.id];let m=s.get(d);m&&(e.remove(m),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(h,d){return r[d.id]===!0||(d.addEventListener("dispose",a),r[d.id]=!0,t.memory.geometries++),d}function c(h){let d=h.attributes;for(let m in d)e.update(d[m],n.ARRAY_BUFFER)}function l(h){let d=[],m=h.index,x=h.attributes.position,v=0;if(x===void 0)return;if(m!==null){let T=m.array;v=m.version;for(let I=0,E=T.length;I<E;I+=3){let w=T[I+0],R=T[I+1],P=T[I+2];d.push(w,R,R,P,P,w)}}else{let T=x.array;v=x.version;for(let I=0,E=T.length/3-1;I<E;I+=3){let w=I+0,R=I+1,P=I+2;d.push(w,R,R,P,P,w)}}let g=new(x.count>=65535?Oo:Uo)(d,1);g.version=v;let _=s.get(h);_&&e.remove(_),s.set(h,g)}function u(h){let d=s.get(h);if(d){let m=h.index;m!==null&&d.version<m.version&&l(h)}else l(h);return s.get(h)}return{get:o,update:c,getWireframeAttribute:u}}function FM(n,e,t){let i;function r(h){i=h}let s,a;function o(h){s=h.type,a=h.bytesPerElement}function c(h,d){n.drawElements(i,d,s,h*a),t.update(d,i,1)}function l(h,d,m){m!==0&&(n.drawElementsInstanced(i,d,s,h*a,m),t.update(d,i,m))}function u(h,d,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,s,h,0,m);let v=0;for(let g=0;g<m;g++)v+=d[g];t.update(v,i,1)}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function BM(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:Qe("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function kM(n,e,t){let i=new WeakMap,r=new Ut;function s(a,o,c){let l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0,d=i.get(o);if(d===void 0||d.count!==h){let N=function(){P.dispose(),i.delete(o),o.removeEventListener("dispose",N)};d!==void 0&&d.texture.dispose();let m=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],_=o.morphAttributes.normal||[],T=o.morphAttributes.color||[],I=0;m===!0&&(I=1),x===!0&&(I=2),v===!0&&(I=3);let E=o.attributes.position.count*I,w=1;E>e.maxTextureSize&&(w=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);let R=new Float32Array(E*w*4*h),P=new Lo(R,E,w,h);P.type=ii,P.needsUpdate=!0;let y=I*4;for(let k=0;k<h;k++){let W=g[k],q=_[k],ee=T[k],X=E*w*4*k;for(let Q=0;Q<W.count;Q++){let oe=Q*y;m===!0&&(r.fromBufferAttribute(W,Q),R[X+oe+0]=r.x,R[X+oe+1]=r.y,R[X+oe+2]=r.z,R[X+oe+3]=0),x===!0&&(r.fromBufferAttribute(q,Q),R[X+oe+4]=r.x,R[X+oe+5]=r.y,R[X+oe+6]=r.z,R[X+oe+7]=0),v===!0&&(r.fromBufferAttribute(ee,Q),R[X+oe+8]=r.x,R[X+oe+9]=r.y,R[X+oe+10]=r.z,R[X+oe+11]=ee.itemSize===4?r.w:1)}}d={count:h,texture:P,size:new ht(E,w)},i.set(o,d),o.addEventListener("dispose",N)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let m=0;for(let v=0;v<l.length;v++)m+=l[v];let x=o.morphTargetsRelative?1:1-m;c.getUniforms().setValue(n,"morphTargetBaseInfluence",x),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:s}}function zM(n,e,t,i,r){let s=new WeakMap;function a(l){let u=r.render.frame,h=l.geometry,d=e.get(l,h);if(s.get(d)!==u&&(e.update(d),s.set(d,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),s.get(l)!==u&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,u))),l.isSkinnedMesh){let m=l.skeleton;s.get(m)!==u&&(m.update(),s.set(m,u))}return d}function o(){s=new WeakMap}function c(l){let u=l.target;u.removeEventListener("dispose",c),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}var VM={[Gd]:"LINEAR_TONE_MAPPING",[Hd]:"REINHARD_TONE_MAPPING",[Wd]:"CINEON_TONE_MAPPING",[Xd]:"ACES_FILMIC_TONE_MAPPING",[Yd]:"AGX_TONE_MAPPING",[Zd]:"NEUTRAL_TONE_MAPPING",[qd]:"CUSTOM_TONE_MAPPING"};function GM(n,e,t,i,r,s){let a=new zn(e,t,{type:n,depthBuffer:r,stencilBuffer:s,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,c=null,l=new Mn;l.setAttribute("position",new xn([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new xn([0,2,0,0,2,0],2));let u=new Hc({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),h=new cn(l,u),d=new Xi(-1,1,1,-1,0,1),m=null,x=null,v=!1,g,_=null,T=[],I=!1;this.setSize=function(E,w){a.setSize(E,w),o!==null&&o.setSize(E,w),c!==null&&c.setSize(E,w);for(let R=0;R<T.length;R++){let P=T[R];P.setSize&&P.setSize(E,w)}},this.setEffects=function(E){T=E,I=T.length>0&&T[0].isRenderPass===!0;let w=a.width,R=a.height;T.length>0&&o===null&&(o=new zn(w,R,{type:Pi,depthBuffer:!1,stencilBuffer:!1}),c=new zn(w,R,{type:Pi,depthBuffer:!1,stencilBuffer:!1}));for(let P=0;P<T.length;P++){let y=T[P];y.setSize&&y.setSize(w,R)}},this.begin=function(E,w){if(v||E.toneMapping===Ri&&T.length===0)return!1;if(_=w,w!==null){let R=w.width,P=w.height;(a.width!==R||a.height!==P)&&this.setSize(R,P)}return I===!1&&E.setRenderTarget(a),g=E.toneMapping,E.toneMapping=Ri,!0},this.hasRenderPass=function(){return I},this.end=function(E,w){E.toneMapping=g,v=!0;let R=a,P=o;for(let y=0;y<T.length;y++){let N=T[y];N.enabled!==!1&&(N.render(E,P,R,w),N.needsSwap!==!1&&(R=P,P=P===o?c:o))}if(m!==E.outputColorSpace||x!==E.toneMapping){m=E.outputColorSpace,x=E.toneMapping,u.defines={},xt.getTransfer(m)===Pt&&(u.defines.SRGB_TRANSFER="");let y=VM[x];y&&(u.defines[y]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=R.texture,E.setRenderTarget(_),E.render(h,d),_=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var n0=new vn,_f=new Wr(1,1),i0=new Lo,r0=new kc,s0=new Ho,F_=[],B_=[],k_=new Float32Array(16),z_=new Float32Array(9),V_=new Float32Array(4);function Ka(n,e,t){let i=n[0];if(i<=0||i>0)return n;let r=e*t,s=F_[r];if(s===void 0&&(s=new Float32Array(r),F_[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function dn(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function fn(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function ju(n,e){let t=B_[e];t===void 0&&(t=new Int32Array(e),B_[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function HM(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function WM(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(dn(t,e))return;n.uniform2fv(this.addr,e),fn(t,e)}}function XM(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(dn(t,e))return;n.uniform3fv(this.addr,e),fn(t,e)}}function qM(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(dn(t,e))return;n.uniform4fv(this.addr,e),fn(t,e)}}function YM(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(dn(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),fn(t,e)}else{if(dn(t,i))return;V_.set(i),n.uniformMatrix2fv(this.addr,!1,V_),fn(t,i)}}function ZM(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(dn(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),fn(t,e)}else{if(dn(t,i))return;z_.set(i),n.uniformMatrix3fv(this.addr,!1,z_),fn(t,i)}}function KM(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(dn(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),fn(t,e)}else{if(dn(t,i))return;k_.set(i),n.uniformMatrix4fv(this.addr,!1,k_),fn(t,i)}}function jM(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function $M(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(dn(t,e))return;n.uniform2iv(this.addr,e),fn(t,e)}}function JM(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(dn(t,e))return;n.uniform3iv(this.addr,e),fn(t,e)}}function QM(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(dn(t,e))return;n.uniform4iv(this.addr,e),fn(t,e)}}function eE(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function tE(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(dn(t,e))return;n.uniform2uiv(this.addr,e),fn(t,e)}}function nE(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(dn(t,e))return;n.uniform3uiv(this.addr,e),fn(t,e)}}function iE(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(dn(t,e))return;n.uniform4uiv(this.addr,e),fn(t,e)}}function rE(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(_f.compareFunction=t.isReversedDepthBuffer()?Hu:Gu,s=_f):s=n0,t.setTexture2D(e||s,r)}function sE(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||r0,r)}function aE(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||s0,r)}function oE(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||i0,r)}function lE(n){switch(n){case 5126:return HM;case 35664:return WM;case 35665:return XM;case 35666:return qM;case 35674:return YM;case 35675:return ZM;case 35676:return KM;case 5124:case 35670:return jM;case 35667:case 35671:return $M;case 35668:case 35672:return JM;case 35669:case 35673:return QM;case 5125:return eE;case 36294:return tE;case 36295:return nE;case 36296:return iE;case 35678:case 36198:case 36298:case 36306:case 35682:return rE;case 35679:case 36299:case 36307:return sE;case 35680:case 36300:case 36308:case 36293:return aE;case 36289:case 36303:case 36311:case 36292:return oE}}function cE(n,e){n.uniform1fv(this.addr,e)}function uE(n,e){let t=Ka(e,this.size,2);n.uniform2fv(this.addr,t)}function hE(n,e){let t=Ka(e,this.size,3);n.uniform3fv(this.addr,t)}function dE(n,e){let t=Ka(e,this.size,4);n.uniform4fv(this.addr,t)}function fE(n,e){let t=Ka(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function pE(n,e){let t=Ka(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function mE(n,e){let t=Ka(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function gE(n,e){n.uniform1iv(this.addr,e)}function _E(n,e){n.uniform2iv(this.addr,e)}function xE(n,e){n.uniform3iv(this.addr,e)}function vE(n,e){n.uniform4iv(this.addr,e)}function yE(n,e){n.uniform1uiv(this.addr,e)}function SE(n,e){n.uniform2uiv(this.addr,e)}function bE(n,e){n.uniform3uiv(this.addr,e)}function ME(n,e){n.uniform4uiv(this.addr,e)}function EE(n,e,t){let i=this.cache,r=e.length,s=ju(t,r);dn(i,s)||(n.uniform1iv(this.addr,s),fn(i,s));let a;this.type===n.SAMPLER_2D_SHADOW?a=_f:a=n0;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function TE(n,e,t){let i=this.cache,r=e.length,s=ju(t,r);dn(i,s)||(n.uniform1iv(this.addr,s),fn(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||r0,s[a])}function AE(n,e,t){let i=this.cache,r=e.length,s=ju(t,r);dn(i,s)||(n.uniform1iv(this.addr,s),fn(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||s0,s[a])}function wE(n,e,t){let i=this.cache,r=e.length,s=ju(t,r);dn(i,s)||(n.uniform1iv(this.addr,s),fn(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||i0,s[a])}function RE(n){switch(n){case 5126:return cE;case 35664:return uE;case 35665:return hE;case 35666:return dE;case 35674:return fE;case 35675:return pE;case 35676:return mE;case 5124:case 35670:return gE;case 35667:case 35671:return _E;case 35668:case 35672:return xE;case 35669:case 35673:return vE;case 5125:return yE;case 36294:return SE;case 36295:return bE;case 36296:return ME;case 35678:case 36198:case 36298:case 36306:case 35682:return EE;case 35679:case 36299:case 36307:return TE;case 35680:case 36300:case 36308:case 36293:return AE;case 36289:case 36303:case 36311:case 36292:return wE}}var xf=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=lE(t.type)}},vf=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=RE(t.type)}},yf=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let r=this.seq;for(let s=0,a=r.length;s!==a;++s){let o=r[s];o.setValue(e,t[o.id],i)}}},mf=/(\w+)(\])?(\[|\.)?/g;function G_(n,e){n.seq.push(e),n.map[e.id]=e}function IE(n,e,t){let i=n.name,r=i.length;for(mf.lastIndex=0;;){let s=mf.exec(i),a=mf.lastIndex,o=s[1],c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===r){G_(t,l===void 0?new xf(o,n,e):new vf(o,n,e));break}else{let h=t.map[o];h===void 0&&(h=new yf(o),G_(t,h)),t=h}}}var Za=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){let o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);IE(o,c,this)}let r=[],s=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){let s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){let r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){let o=t[s],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){let i=[];for(let r=0,s=e.length;r!==s;++r){let a=e[r];a.id in t&&i.push(a)}return i}};function H_(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var CE=37297,PE=0;function NE(n,e){let t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){let o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}var W_=new rt;function LE(n){xt._getMatrix(W_,xt.workingColorSpace,n);let e=`mat3( ${W_.elements.map(t=>t.toFixed(4))} )`;switch(xt.getTransfer(n)){case Po:return[e,"LinearTransferOETF"];case Pt:return[e,"sRGBTransferOETF"];default:return Ye("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function X_(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";let a=/ERROR: 0:(\d+)/.exec(s);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+NE(n.getShaderSource(e),o)}else return s}function DE(n,e){let t=LE(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var UE={[Gd]:"Linear",[Hd]:"Reinhard",[Wd]:"Cineon",[Xd]:"ACESFilmic",[Yd]:"AgX",[Zd]:"Neutral",[qd]:"Custom"};function OE(n,e){let t=UE[e];return t===void 0?(Ye("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Xu=new Z;function FE(){xt.getLuminanceCoefficients(Xu);let n=Xu.x.toFixed(4),e=Xu.y.toFixed(4),t=Xu.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function BE(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(hl).join(`
`)}function kE(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function zE(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){let s=n.getActiveAttrib(e,r),a=s.name,o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function hl(n){return n!==""}function q_(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Y_(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var VE=/^[ \t]*#include +<([\w\d./]+)>/gm;function Sf(n){return n.replace(VE,HE)}var GE=new Map;function HE(n,e){let t=mt[e];if(t===void 0){let i=GE.get(e);if(i!==void 0)t=mt[i],Ye('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Sf(t)}var WE=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Z_(n){return n.replace(WE,XE)}function XE(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function K_(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}var qE={[el]:"SHADOWMAP_TYPE_PCF",[ka]:"SHADOWMAP_TYPE_VSM"};function YE(n){return qE[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var ZE={[qr]:"ENVMAP_TYPE_CUBE",[Ns]:"ENVMAP_TYPE_CUBE",[tl]:"ENVMAP_TYPE_CUBE_UV"};function KE(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":ZE[n.envMapMode]||"ENVMAP_TYPE_CUBE"}var jE={[Ns]:"ENVMAP_MODE_REFRACTION"};function $E(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":jE[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var JE={[Vd]:"ENVMAP_BLENDING_MULTIPLY",[d_]:"ENVMAP_BLENDING_MIX",[f_]:"ENVMAP_BLENDING_ADD"};function QE(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":JE[n.combine]||"ENVMAP_BLENDING_NONE"}function eT(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function tT(n,e,t,i){let r=n.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,c=YE(t),l=KE(t),u=$E(t),h=QE(t),d=eT(t),m=BE(t),x=kE(s),v=r.createProgram(),g,_,T=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(hl).join(`
`),g.length>0&&(g+=`
`),_=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(hl).join(`
`),_.length>0&&(_+=`
`)):(g=[K_(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(hl).join(`
`),_=[K_(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ri?"#define TONE_MAPPING":"",t.toneMapping!==Ri?mt.tonemapping_pars_fragment:"",t.toneMapping!==Ri?OE("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",mt.colorspace_pars_fragment,DE("linearToOutputTexel",t.outputColorSpace),FE(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(hl).join(`
`)),a=Sf(a),a=q_(a,t),a=Y_(a,t),o=Sf(o),o=q_(o,t),o=Y_(o,t),a=Z_(a),o=Z_(o),t.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,g=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,_=["#define varying in",t.glslVersion===sf?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===sf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);let I=T+g+a,E=T+_+o,w=H_(r,r.VERTEX_SHADER,I),R=H_(r,r.FRAGMENT_SHADER,E);r.attachShader(v,w),r.attachShader(v,R),t.index0AttributeName!==void 0?r.bindAttribLocation(v,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function P(W){if(n.debug.checkShaderErrors){let q=r.getProgramInfoLog(v)||"",ee=r.getShaderInfoLog(w)||"",X=r.getShaderInfoLog(R)||"",Q=q.trim(),oe=ee.trim(),re=X.trim(),me=!0,ne=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(me=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,v,w,R);else{let le=X_(r,w,"vertex"),he=X_(r,R,"fragment");Qe("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+W.name+`
Material Type: `+W.type+`

Program Info Log: `+Q+`
`+le+`
`+he)}else Q!==""?Ye("WebGLProgram: Program Info Log:",Q):(oe===""||re==="")&&(ne=!1);ne&&(W.diagnostics={runnable:me,programLog:Q,vertexShader:{log:oe,prefix:g},fragmentShader:{log:re,prefix:_}})}r.deleteShader(w),r.deleteShader(R),y=new Za(r,v),N=zE(r,v)}let y;this.getUniforms=function(){return y===void 0&&P(this),y};let N;this.getAttributes=function(){return N===void 0&&P(this),N};let k=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return k===!1&&(k=r.getProgramParameter(v,CE)),k},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=PE++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=w,this.fragmentShader=R,this}var nT=0,bf=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new Mf(e),t.set(e,i)),i}},Mf=class{constructor(e){this.id=nT++,this.code=e,this.usedTimes=0}};function iT(n){return n===Zr||n===al||n===ol}function rT(n,e,t,i,r,s){let a=new Aa,o=new bf,c=new Set,l=[],u=new Map,h=i.logarithmicDepthBuffer,d=i.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(y){return c.add(y),y===0?"uv":`uv${y}`}function v(y,N,k,W,q,ee){let X=W.fog,Q=q.geometry,oe=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?W.environment:null,re=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,me=e.get(y.envMap||oe,re),ne=me&&me.mapping===tl?me.image.height:null,le=m[y.type];y.precision!==null&&(d=i.getMaxPrecision(y.precision),d!==y.precision&&Ye("WebGLProgram.getParameters:",y.precision,"not supported, using",d,"instead."));let he=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,Ge=he!==void 0?he.length:0,Ne=0;Q.morphAttributes.position!==void 0&&(Ne=1),Q.morphAttributes.normal!==void 0&&(Ne=2),Q.morphAttributes.color!==void 0&&(Ne=3);let vt,ie,Te,K;if(le){let Ft=Ki[le];vt=Ft.vertexShader,ie=Ft.fragmentShader}else{vt=y.vertexShader,ie=y.fragmentShader;let Ft=o.getVertexShaderStage(y),At=o.getFragmentShaderStage(y);o.update(y,Ft,At),Te=Ft.id,K=At.id}let $=n.getRenderTarget(),be=n.state.buffers.depth.getReversed(),Ie=q.isInstancedMesh===!0,de=q.isBatchedMesh===!0,Ke=!!y.map,Rt=!!y.matcap,it=!!me,pt=!!y.aoMap,It=!!y.lightMap,dt=!!y.bumpMap&&y.wireframe===!1,Nt=!!y.normalMap,Jt=!!y.displacementMap,Qt=!!y.emissiveMap,Ot=!!y.metalnessMap,Xt=!!y.roughnessMap,G=y.anisotropy>0,Fe=y.clearcoat>0,gt=y.dispersion>0,p=y.retroreflectivity>0,f=y.iridescence>0,S=y.sheen>0,A=y.transmission>0,C=G&&!!y.anisotropyMap,L=Fe&&!!y.clearcoatMap,H=Fe&&!!y.clearcoatNormalMap,D=Fe&&!!y.clearcoatRoughnessMap,F=f&&!!y.iridescenceMap,ae=f&&!!y.iridescenceThicknessMap,ge=S&&!!y.sheenColorMap,ue=S&&!!y.sheenRoughnessMap,fe=!!y.specularMap,Ce=!!y.specularColorMap,Ue=!!y.specularIntensityMap,tt=A&&!!y.transmissionMap,V=A&&!!y.thicknessMap,Me=!!y.gradientMap,ce=!!y.alphaMap,Se=y.alphaTest>0,Ae=!!y.alphaHash,pe=!!y.extensions,Xe=Ri;y.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(Xe=n.toneMapping);let Be={shaderID:le,shaderType:y.type,shaderName:y.name,vertexShader:vt,fragmentShader:ie,defines:y.defines,customVertexShaderID:Te,customFragmentShaderID:K,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:d,batching:de,batchingColor:de&&q._colorsTexture!==null,instancing:Ie,instancingColor:Ie&&q.instanceColor!==null,instancingMorph:Ie&&q.morphTexture!==null,outputColorSpace:$===null?n.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:xt.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:Ke,matcap:Rt,envMap:it,envMapMode:it&&me.mapping,envMapCubeUVHeight:ne,aoMap:pt,lightMap:It,bumpMap:dt,normalMap:Nt,displacementMap:Jt,emissiveMap:Qt,normalMapObjectSpace:Nt&&y.normalMapType===__,normalMapTangentSpace:Nt&&y.normalMapType===Vu,packedNormalMap:Nt&&y.normalMapType===Vu&&iT(y.normalMap.format),metalnessMap:Ot,roughnessMap:Xt,anisotropy:G,anisotropyMap:C,clearcoat:Fe,clearcoatMap:L,clearcoatNormalMap:H,clearcoatRoughnessMap:D,dispersion:gt,retroreflection:p,iridescence:f,iridescenceMap:F,iridescenceThicknessMap:ae,sheen:S,sheenColorMap:ge,sheenRoughnessMap:ue,specularMap:fe,specularColorMap:Ce,specularIntensityMap:Ue,transmission:A,transmissionMap:tt,thicknessMap:V,gradientMap:Me,opaque:y.transparent===!1&&y.blending===za&&y.alphaToCoverage===!1,alphaMap:ce,alphaTest:Se,alphaHash:Ae,combine:y.combine,mapUv:Ke&&x(y.map.channel),aoMapUv:pt&&x(y.aoMap.channel),lightMapUv:It&&x(y.lightMap.channel),bumpMapUv:dt&&x(y.bumpMap.channel),normalMapUv:Nt&&x(y.normalMap.channel),displacementMapUv:Jt&&x(y.displacementMap.channel),emissiveMapUv:Qt&&x(y.emissiveMap.channel),metalnessMapUv:Ot&&x(y.metalnessMap.channel),roughnessMapUv:Xt&&x(y.roughnessMap.channel),anisotropyMapUv:C&&x(y.anisotropyMap.channel),clearcoatMapUv:L&&x(y.clearcoatMap.channel),clearcoatNormalMapUv:H&&x(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:D&&x(y.clearcoatRoughnessMap.channel),iridescenceMapUv:F&&x(y.iridescenceMap.channel),iridescenceThicknessMapUv:ae&&x(y.iridescenceThicknessMap.channel),sheenColorMapUv:ge&&x(y.sheenColorMap.channel),sheenRoughnessMapUv:ue&&x(y.sheenRoughnessMap.channel),specularMapUv:fe&&x(y.specularMap.channel),specularColorMapUv:Ce&&x(y.specularColorMap.channel),specularIntensityMapUv:Ue&&x(y.specularIntensityMap.channel),transmissionMapUv:tt&&x(y.transmissionMap.channel),thicknessMapUv:V&&x(y.thicknessMap.channel),alphaMapUv:ce&&x(y.alphaMap.channel),vertexTangents:!!Q.attributes.tangent&&(Nt||G),vertexNormals:!!Q.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,pointsUvs:q.isPoints===!0&&!!Q.attributes.uv&&(Ke||ce),fog:!!X,useFog:y.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||Q.attributes.normal===void 0&&Nt===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:be,skinning:q.isSkinnedMesh===!0,hasPositionAttribute:Q.attributes.position!==void 0,morphTargets:Q.morphAttributes.position!==void 0,morphNormals:Q.morphAttributes.normal!==void 0,morphColors:Q.morphAttributes.color!==void 0,morphTargetsCount:Ge,morphTextureStride:Ne,numSunLights:N.sun.length,numDirLights:N.directional.length,numPointLights:N.point.length,numSpotLights:N.spot.length,numSpotLightMaps:N.spotLightMap.length,numRectAreaLights:N.rectArea.length,numHemiLights:N.hemi.length,numSunLightShadows:N.sunShadowMap.length,numDirLightShadows:N.directionalShadowMap.length,numPointLightShadows:N.pointShadowMap.length,numSpotLightShadows:N.spotShadowMap.length,numSpotLightShadowsWithMaps:N.numSpotLightShadowsWithMaps,numLightProbes:N.numLightProbes,numLightProbeGrids:ee.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&k.length>0,shadowMapType:n.shadowMap.type,toneMapping:Xe,decodeVideoTexture:Ke&&y.map.isVideoTexture===!0&&xt.getTransfer(y.map.colorSpace)===Pt,decodeVideoTextureEmissive:Qt&&y.emissiveMap.isVideoTexture===!0&&xt.getTransfer(y.emissiveMap.colorSpace)===Pt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Un,flipSided:y.side===Dn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:pe&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(pe&&y.extensions.multiDraw===!0||de)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Be.vertexUv1s=c.has(1),Be.vertexUv2s=c.has(2),Be.vertexUv3s=c.has(3),c.clear(),Be}function g(y){let N=[];if(y.shaderID?N.push(y.shaderID):(N.push(y.customVertexShaderID),N.push(y.customFragmentShaderID)),y.defines!==void 0)for(let k in y.defines)N.push(k),N.push(y.defines[k]);return y.isRawShaderMaterial===!1&&(_(N,y),T(N,y),N.push(n.outputColorSpace)),N.push(y.customProgramCacheKey),N.join()}function _(y,N){y.push(N.precision),y.push(N.outputColorSpace),y.push(N.envMapMode),y.push(N.envMapCubeUVHeight),y.push(N.mapUv),y.push(N.alphaMapUv),y.push(N.lightMapUv),y.push(N.aoMapUv),y.push(N.bumpMapUv),y.push(N.normalMapUv),y.push(N.displacementMapUv),y.push(N.emissiveMapUv),y.push(N.metalnessMapUv),y.push(N.roughnessMapUv),y.push(N.anisotropyMapUv),y.push(N.clearcoatMapUv),y.push(N.clearcoatNormalMapUv),y.push(N.clearcoatRoughnessMapUv),y.push(N.iridescenceMapUv),y.push(N.iridescenceThicknessMapUv),y.push(N.sheenColorMapUv),y.push(N.sheenRoughnessMapUv),y.push(N.specularMapUv),y.push(N.specularColorMapUv),y.push(N.specularIntensityMapUv),y.push(N.transmissionMapUv),y.push(N.thicknessMapUv),y.push(N.combine),y.push(N.fogExp2),y.push(N.sizeAttenuation),y.push(N.morphTargetsCount),y.push(N.morphAttributeCount),y.push(N.numSunLights),y.push(N.numDirLights),y.push(N.numPointLights),y.push(N.numSpotLights),y.push(N.numSpotLightMaps),y.push(N.numHemiLights),y.push(N.numRectAreaLights),y.push(N.numSunLightShadows),y.push(N.numDirLightShadows),y.push(N.numPointLightShadows),y.push(N.numSpotLightShadows),y.push(N.numSpotLightShadowsWithMaps),y.push(N.numLightProbes),y.push(N.shadowMapType),y.push(N.toneMapping),y.push(N.numClippingPlanes),y.push(N.numClipIntersection),y.push(N.depthPacking)}function T(y,N){a.disableAll(),N.instancing&&a.enable(0),N.instancingColor&&a.enable(1),N.instancingMorph&&a.enable(2),N.matcap&&a.enable(3),N.envMap&&a.enable(4),N.normalMapObjectSpace&&a.enable(5),N.normalMapTangentSpace&&a.enable(6),N.clearcoat&&a.enable(7),N.iridescence&&a.enable(8),N.alphaTest&&a.enable(9),N.vertexColors&&a.enable(10),N.vertexAlphas&&a.enable(11),N.vertexUv1s&&a.enable(12),N.vertexUv2s&&a.enable(13),N.vertexUv3s&&a.enable(14),N.vertexTangents&&a.enable(15),N.anisotropy&&a.enable(16),N.alphaHash&&a.enable(17),N.batching&&a.enable(18),N.dispersion&&a.enable(19),N.retroreflection&&a.enable(24),N.batchingColor&&a.enable(20),N.gradientMap&&a.enable(21),N.packedNormalMap&&a.enable(22),N.vertexNormals&&a.enable(23),y.push(a.mask),a.disableAll(),N.fog&&a.enable(0),N.useFog&&a.enable(1),N.flatShading&&a.enable(2),N.logarithmicDepthBuffer&&a.enable(3),N.reversedDepthBuffer&&a.enable(4),N.skinning&&a.enable(5),N.morphTargets&&a.enable(6),N.morphNormals&&a.enable(7),N.morphColors&&a.enable(8),N.premultipliedAlpha&&a.enable(9),N.shadowMapEnabled&&a.enable(10),N.doubleSided&&a.enable(11),N.flipSided&&a.enable(12),N.useDepthPacking&&a.enable(13),N.dithering&&a.enable(14),N.transmission&&a.enable(15),N.sheen&&a.enable(16),N.opaque&&a.enable(17),N.pointsUvs&&a.enable(18),N.decodeVideoTexture&&a.enable(19),N.decodeVideoTextureEmissive&&a.enable(20),N.alphaToCoverage&&a.enable(21),N.numLightProbeGrids>0&&a.enable(22),N.hasPositionAttribute&&a.enable(23),y.push(a.mask)}function I(y){let N=m[y.type],k;if(N){let W=Ki[N];k=C_.clone(W.uniforms)}else k=y.uniforms;return k}function E(y,N){let k=u.get(N);return k!==void 0?++k.usedTimes:(k=new tT(n,N,y,r),l.push(k),u.set(N,k)),k}function w(y){if(--y.usedTimes===0){let N=l.indexOf(y);l[N]=l[l.length-1],l.pop(),u.delete(y.cacheKey),y.destroy()}}function R(y){o.remove(y)}function P(){o.dispose()}return{getParameters:v,getProgramCacheKey:g,getUniforms:I,acquireProgram:E,releaseProgram:w,releaseShaderCache:R,programs:l,dispose:P}}function sT(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,c){n.get(a)[o]=c}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function aT(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function j_(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function $_(){let n=[],e=0,t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(d){let m=0;return d.isInstancedMesh&&(m+=2),d.isSkinnedMesh&&(m+=1),m}function o(d,m,x,v,g,_){let T=n[e];return T===void 0?(T={id:d.id,object:d,geometry:m,material:x,materialVariant:a(d),groupOrder:v,renderOrder:d.renderOrder,z:g,group:_},n[e]=T):(T.id=d.id,T.object=d,T.geometry=m,T.material=x,T.materialVariant=a(d),T.groupOrder=v,T.renderOrder=d.renderOrder,T.z=g,T.group=_),e++,T}function c(d,m,x,v,g,_,T){T.reversedDepth===!0&&(g=-g);let I=o(d,m,x,v,g,_);x.transmission>0?i.push(I):x.transparent===!0?r.push(I):t.push(I)}function l(d,m,x,v,g,_){let T=o(d,m,x,v,g,_);x.transmission>0?i.unshift(T):x.transparent===!0?r.unshift(T):t.unshift(T)}function u(d,m){t.length>1&&t.sort(d||aT),i.length>1&&i.sort(m||j_),r.length>1&&r.sort(m||j_)}function h(){for(let d=e,m=n.length;d<m;d++){let x=n[d];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:c,unshift:l,finish:h,sort:u}}function oT(){let n=new WeakMap;function e(i,r){let s=n.get(i),a;return s===void 0?(a=new $_,n.set(i,[a])):r>=s.length?(a=new $_,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function lT(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new Z,color:new et};break;case"SpotLight":t={position:new Z,direction:new Z,color:new et,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new Z,color:new et,distance:0,decay:0};break;case"HemisphereLight":t={direction:new Z,skyColor:new et,groundColor:new et};break;case"RectAreaLight":t={color:new et,position:new Z,halfWidth:new Z,halfHeight:new Z};break}return n[e.id]=t,t}}}function cT(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ht};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ht};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ht,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var uT=0;function hT(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function dT(n){let e=new lT,t=cT(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new Z);let r=new Z,s=new at,a=new at;function o(l){let u=0,h=0,d=0;for(let q=0;q<9;q++)i.probe[q].set(0,0,0);let m=0,x=0,v=0,g=0,_=0,T=0,I=0,E=0,w=0,R=0,P=0,y=0,N=0,k=0;l.sort(hT);for(let q=0,ee=l.length;q<ee;q++){let X=l[q],Q=X.color,oe=X.intensity,re=X.distance,me=null;if(X.shadow&&X.shadow.map&&(X.shadow.map.texture.format===Zr?me=X.shadow.map.texture:me=X.shadow.map.depthTexture||X.shadow.map.texture),X.isAmbientLight)u+=Q.r*oe,h+=Q.g*oe,d+=Q.b*oe;else if(X.isLightProbe){for(let ne=0;ne<9;ne++)i.probe[ne].addScaledVector(X.sh.coefficients[ne],oe);k++}else if(X.isSunLight){let ne=e.get(X);if(ne.color.copy(X.color).multiplyScalar(X.intensity),X.castShadow){let le=X.shadow,he=t.get(X);he.shadowIntensity=le.intensity,he.shadowBias=le.bias,he.shadowNormalBias=le.normalBias,he.shadowRadius=le.radius,he.shadowMapSize.copy(le.mapSize).multiply(le.getFrameExtents()),i.sunShadow[x]=he,i.sunShadowMap[x]=me;let Ge=le.getViewportCount();for(let Ne=0;Ne<Ge;Ne++)i.sunShadowMatrix[v+Ne]=le.getMatrix(Ne),i.sunShadowCascade[v+Ne]=le._cascadeData[Ne];v+=Ge,x++}i.sun[m]=ne,m++}else if(X.isDirectionalLight){let ne=e.get(X);if(ne.color.copy(X.color).multiplyScalar(X.intensity),X.castShadow){let le=X.shadow,he=t.get(X);he.shadowIntensity=le.intensity,he.shadowBias=le.bias,he.shadowNormalBias=le.normalBias,he.shadowRadius=le.radius,he.shadowMapSize=le.mapSize,i.directionalShadow[g]=he,i.directionalShadowMap[g]=me,i.directionalShadowMatrix[g]=X.shadow.matrix,w++}i.directional[g]=ne,g++}else if(X.isSpotLight){let ne=e.get(X);ne.position.setFromMatrixPosition(X.matrixWorld),ne.color.copy(Q).multiplyScalar(oe),ne.distance=re,ne.coneCos=Math.cos(X.angle),ne.penumbraCos=Math.cos(X.angle*(1-X.penumbra)),ne.decay=X.decay,i.spot[T]=ne;let le=X.shadow;if(X.map&&(i.spotLightMap[y]=X.map,y++,le.updateMatrices(X),X.castShadow&&N++),i.spotLightMatrix[T]=le.matrix,X.castShadow){let he=t.get(X);he.shadowIntensity=le.intensity,he.shadowBias=le.bias,he.shadowNormalBias=le.normalBias,he.shadowRadius=le.radius,he.shadowMapSize=le.mapSize,i.spotShadow[T]=he,i.spotShadowMap[T]=me,P++}T++}else if(X.isRectAreaLight){let ne=e.get(X);ne.color.copy(Q).multiplyScalar(oe),ne.halfWidth.set(X.width*.5,0,0),ne.halfHeight.set(0,X.height*.5,0),i.rectArea[I]=ne,I++}else if(X.isPointLight){let ne=e.get(X);if(ne.color.copy(X.color).multiplyScalar(X.intensity),ne.distance=X.distance,ne.decay=X.decay,X.castShadow){let le=X.shadow,he=t.get(X);he.shadowIntensity=le.intensity,he.shadowBias=le.bias,he.shadowNormalBias=le.normalBias,he.shadowRadius=le.radius,he.shadowMapSize=le.mapSize,he.shadowCameraNear=le.camera.near,he.shadowCameraFar=le.camera.far,i.pointShadow[_]=he,i.pointShadowMap[_]=me,i.pointShadowMatrix[_]=X.shadow.matrix,R++}i.point[_]=ne,_++}else if(X.isHemisphereLight){let ne=e.get(X);ne.skyColor.copy(X.color).multiplyScalar(oe),ne.groundColor.copy(X.groundColor).multiplyScalar(oe),i.hemi[E]=ne,E++}}I>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Re.LTC_FLOAT_1,i.rectAreaLTC2=Re.LTC_FLOAT_2):(i.rectAreaLTC1=Re.LTC_HALF_1,i.rectAreaLTC2=Re.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=h,i.ambient[2]=d;let W=i.hash;(W.sunLength!==m||W.directionalLength!==g||W.pointLength!==_||W.spotLength!==T||W.rectAreaLength!==I||W.hemiLength!==E||W.numSunShadows!==x||W.numDirectionalShadows!==w||W.numPointShadows!==R||W.numSpotShadows!==P||W.numSpotMaps!==y||W.numLightProbes!==k)&&(i.sun.length=m,i.directional.length=g,i.spot.length=T,i.rectArea.length=I,i.point.length=_,i.hemi.length=E,i.sunShadow.length=x,i.sunShadowMap.length=x,i.sunShadowMatrix.length=v,i.sunShadowCascade.length=v,i.directionalShadow.length=w,i.directionalShadowMap.length=w,i.directionalShadowMatrix.length=w,i.pointShadow.length=R,i.pointShadowMap.length=R,i.pointShadowMatrix.length=R,i.spotShadow.length=P,i.spotShadowMap.length=P,i.spotLightMatrix.length=P+y-N,i.spotLightMap.length=y,i.numSpotLightShadowsWithMaps=N,i.numLightProbes=k,W.sunLength=m,W.directionalLength=g,W.pointLength=_,W.spotLength=T,W.rectAreaLength=I,W.hemiLength=E,W.numSunShadows=x,W.numDirectionalShadows=w,W.numPointShadows=R,W.numSpotShadows=P,W.numSpotMaps=y,W.numLightProbes=k,i.version=uT++)}function c(l,u){let h=0,d=0,m=0,x=0,v=0,g=0,_=u.matrixWorldInverse;for(let T=0,I=l.length;T<I;T++){let E=l[T];if(E.isSunLight){let w=i.sun[h];w.direction.setFromMatrixPosition(E.matrixWorld),w.direction.transformDirection(_),h++}else if(E.isDirectionalLight){let w=i.directional[d];w.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(_),d++}else if(E.isSpotLight){let w=i.spot[x];w.position.setFromMatrixPosition(E.matrixWorld),w.position.applyMatrix4(_),w.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(_),x++}else if(E.isRectAreaLight){let w=i.rectArea[v];w.position.setFromMatrixPosition(E.matrixWorld),w.position.applyMatrix4(_),a.identity(),s.copy(E.matrixWorld),s.premultiply(_),a.extractRotation(s),w.halfWidth.set(E.width*.5,0,0),w.halfHeight.set(0,E.height*.5,0),w.halfWidth.applyMatrix4(a),w.halfHeight.applyMatrix4(a),v++}else if(E.isPointLight){let w=i.point[m];w.position.setFromMatrixPosition(E.matrixWorld),w.position.applyMatrix4(_),m++}else if(E.isHemisphereLight){let w=i.hemi[g];w.direction.setFromMatrixPosition(E.matrixWorld),w.direction.transformDirection(_),g++}}}return{setup:o,setupView:c,state:i}}function J_(n){let e=new dT(n),t=[],i=[],r=[];function s(d){h.camera=d,t.length=0,i.length=0,r.length=0}function a(d){t.push(d)}function o(d){i.push(d)}function c(d){r.push(d)}function l(){e.setup(t)}function u(d){e.setupView(t,d)}let h={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:h,setupLights:l,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function fT(n){let e=new WeakMap;function t(r,s=0){let a=e.get(r),o;return a===void 0?(o=new J_(n),e.set(r,[o])):s>=a.length?(o=new J_(n),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}var pT=`void main() {
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
}`,gT=[new Z(1,0,0),new Z(-1,0,0),new Z(0,1,0),new Z(0,-1,0),new Z(0,0,1),new Z(0,0,-1)],_T=[new Z(0,-1,0),new Z(0,-1,0),new Z(0,0,1),new Z(0,0,-1),new Z(0,-1,0),new Z(0,-1,0)],Q_=new at,ul=new Z,gf=new Z;function xT(n,e,t){let i=new Na,r=new ht,s=new ht,a=new Ut,o=new Wc,c=new Xc,l={},u=t.maxTextureSize,h={[qi]:Dn,[Dn]:qi,[Un]:Un},d=new ni({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ht},radius:{value:4}},vertexShader:pT,fragmentShader:mT}),m=d.clone();m.defines.HORIZONTAL_PASS=1;let x=new Mn;x.setAttribute("position",new hn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new cn(x,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=el;let _=this.type;this.render=function(R,P,y){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||R.length===0)return;this.type===Yg&&(Ye("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=el);let N=n.getRenderTarget(),k=n.getActiveCubeFace(),W=n.getActiveMipmapLevel(),q=n.state;q.setBlending(Yi),q.buffers.depth.getReversed()===!0?q.buffers.color.setClear(0,0,0,0):q.buffers.color.setClear(1,1,1,1),q.buffers.depth.setTest(!0),q.setScissorTest(!1);let ee=_!==this.type;ee&&P.traverse(function(X){X.material&&(Array.isArray(X.material)?X.material.forEach(Q=>Q.needsUpdate=!0):X.material.needsUpdate=!0)});for(let X=0,Q=R.length;X<Q;X++){let oe=R[X],re=oe.shadow;if(re===void 0){Ye("WebGLShadowMap:",oe,"has no shadow.");continue}if(re.autoUpdate===!1&&re.needsUpdate===!1)continue;r.copy(re.mapSize);let me=re.getFrameExtents();r.multiply(me),s.copy(re.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/me.x),r.x=s.x*me.x,re.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/me.y),r.y=s.y*me.y,re.mapSize.y=s.y));let ne=n.state.buffers.depth.getReversed();if(re.camera._reversedDepth=ne,re.map===null||ee===!0){if(re.map!==null&&(re.map.depthTexture!==null&&(re.map.depthTexture.dispose(),re.map.depthTexture=null),re.map.dispose()),this.type===ka){if(oe.isPointLight){Ye("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}re.map=new zn(r.x,r.y,{format:Zr,type:Pi,minFilter:jt,magFilter:jt,generateMipmaps:!1}),re.map.texture.name=oe.name+".shadowMap",re.map.depthTexture=new Wr(r.x,r.y,ii),re.map.depthTexture.name=oe.name+".shadowMapDepth",re.map.depthTexture.format=Vi,re.map.depthTexture.compareFunction=null,re.map.depthTexture.minFilter=Yt,re.map.depthTexture.magFilter=Yt}else oe.isPointLight?(re.map=new Yu(r.x),re.map.depthTexture=new Gc(r.x,Ci)):(re.map=new zn(r.x,r.y),re.map.depthTexture=new Wr(r.x,r.y,Ci)),re.map.depthTexture.name=oe.name+".shadowMap",re.map.depthTexture.format=Vi,this.type===el?(re.map.depthTexture.compareFunction=ne?Hu:Gu,re.map.depthTexture.minFilter=jt,re.map.depthTexture.magFilter=jt):(re.map.depthTexture.compareFunction=null,re.map.depthTexture.minFilter=Yt,re.map.depthTexture.magFilter=Yt);re.camera.updateProjectionMatrix()}re.map.isWebGLCubeRenderTarget!==!0&&(re.map.width!==r.x||re.map.height!==r.y)&&re.map.setSize(r.x,r.y);let le=re.map.isWebGLCubeRenderTarget?6:re.getViewportCount();oe.isPointLight!==!0&&re.updateMatrices(oe,y);for(let he=0;he<le;he++){let Ge=re.getCamera(he);if(oe.isPointLight){let Ne=re.camera,vt=re.matrix,ie=oe.distance||Ne.far;ie!==Ne.far&&(Ne.far=ie,Ne.updateProjectionMatrix()),ul.setFromMatrixPosition(oe.matrixWorld),Ne.position.copy(ul),gf.copy(Ne.position),gf.add(gT[he]),Ne.up.copy(_T[he]),Ne.lookAt(gf),Ne.updateMatrixWorld(),vt.makeTranslation(-ul.x,-ul.y,-ul.z),Q_.multiplyMatrices(Ne.projectionMatrix,Ne.matrixWorldInverse),re._frustum.setFromProjectionMatrix(Q_,Ne.coordinateSystem,Ne.reversedDepth)}if(re.map.isWebGLCubeRenderTarget)n.setRenderTarget(re.map,he),n.clear();else{he===0&&(n.setRenderTarget(re.map),n.clear());let Ne=re.getViewport(he);a.set(s.x*Ne.x,s.y*Ne.y,s.x*Ne.z,s.y*Ne.w),q.viewport(a)}i=re.getFrustum(he),E(P,y,Ge,oe,this.type)}re.isPointLightShadow!==!0&&this.type===ka&&T(re,y),re.needsUpdate=!1}_=this.type,g.needsUpdate=!1,n.setRenderTarget(N,k,W)};function T(R,P){let y=e.update(v);d.defines.VSM_SAMPLES!==R.blurSamples&&(d.defines.VSM_SAMPLES=R.blurSamples,m.defines.VSM_SAMPLES=R.blurSamples,d.needsUpdate=!0,m.needsUpdate=!0),R.mapPass===null?R.mapPass=new zn(r.x,r.y,{format:Zr,type:Pi}):(R.mapPass.width!==R.map.width||R.mapPass.height!==R.map.height)&&R.mapPass.setSize(R.map.width,R.map.height),d.uniforms.shadow_pass.value=R.map.depthTexture,d.uniforms.resolution.value.set(R.map.width,R.map.height),d.uniforms.radius.value=R.radius,n.setRenderTarget(R.mapPass),n.clear(),n.renderBufferDirect(P,null,y,d,v,null),m.uniforms.shadow_pass.value=R.mapPass.texture,m.uniforms.resolution.value.set(R.map.width,R.map.height),m.uniforms.radius.value=R.radius,n.setRenderTarget(R.map),n.clear(),n.renderBufferDirect(P,null,y,m,v,null)}function I(R,P,y,N){let k=null,W=y.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(W!==void 0)k=W;else if(k=y.isPointLight===!0?c:o,n.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){let q=k.uuid,ee=P.uuid,X=l[q];X===void 0&&(X={},l[q]=X);let Q=X[ee];Q===void 0&&(Q=k.clone(),X[ee]=Q,P.addEventListener("dispose",w)),k=Q}if(k.visible=P.visible,k.wireframe=P.wireframe,N===ka?k.side=P.shadowSide!==null?P.shadowSide:P.side:k.side=P.shadowSide!==null?P.shadowSide:h[P.side],k.alphaMap=P.alphaMap,k.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,k.map=P.map,k.clipShadows=P.clipShadows,k.clippingPlanes=P.clippingPlanes,k.clipIntersection=P.clipIntersection,k.displacementMap=P.displacementMap,k.displacementScale=P.displacementScale,k.displacementBias=P.displacementBias,k.wireframeLinewidth=P.wireframeLinewidth,k.linewidth=P.linewidth,y.isPointLight===!0&&k.isMeshDistanceMaterial===!0){let q=n.properties.get(k);q.light=y}return k}function E(R,P,y,N,k){if(R.visible===!1)return;if(R.layers.test(P.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&k===ka)&&(!R.frustumCulled||R.intersectsFrustum(i))){R.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,R.matrixWorld);let ee=e.update(R),X=R.material;if(Array.isArray(X)){let Q=ee.groups;for(let oe=0,re=Q.length;oe<re;oe++){let me=Q[oe],ne=X[me.materialIndex];if(ne&&ne.visible){let le=I(R,ne,N,k);R.onBeforeShadow(n,R,P,y,ee,le,me),n.renderBufferDirect(y,null,ee,le,R,me),R.onAfterShadow(n,R,P,y,ee,le,me)}}}else if(X.visible){let Q=I(R,X,N,k);R.onBeforeShadow(n,R,P,y,ee,Q,null),n.renderBufferDirect(y,null,ee,Q,R,null),R.onAfterShadow(n,R,P,y,ee,Q,null)}}let q=R.children;for(let ee=0,X=q.length;ee<X;ee++)E(q[ee],P,y,N,k)}function w(R){R.target.removeEventListener("dispose",w);for(let y in l){let N=l[y],k=R.target.uuid;k in N&&(N[k].dispose(),delete N[k])}}}function vT(n,e){function t(){let V=!1,Me=new Ut,ce=null,Se=new Ut(0,0,0,0);return{setMask:function(Ae){ce!==Ae&&!V&&(n.colorMask(Ae,Ae,Ae,Ae),ce=Ae)},setLocked:function(Ae){V=Ae},setClear:function(Ae,pe,Xe,Be,Ft){Ft===!0&&(Ae*=Be,pe*=Be,Xe*=Be),Me.set(Ae,pe,Xe,Be),Se.equals(Me)===!1&&(n.clearColor(Ae,pe,Xe,Be),Se.copy(Me))},reset:function(){V=!1,ce=null,Se.set(-1,0,0,0)}}}function i(){let V=!1,Me=!1,ce=null,Se=null,Ae=null;return{setReversed:function(pe){if(Me!==pe){let Xe=e.get("EXT_clip_control");pe?Xe.clipControlEXT(Xe.LOWER_LEFT_EXT,Xe.ZERO_TO_ONE_EXT):Xe.clipControlEXT(Xe.LOWER_LEFT_EXT,Xe.NEGATIVE_ONE_TO_ONE_EXT),Me=pe;let Be=Ae;Ae=null,this.setClear(Be)}},getReversed:function(){return Me},setTest:function(pe){pe?$(n.DEPTH_TEST):be(n.DEPTH_TEST)},setMask:function(pe){ce!==pe&&!V&&(n.depthMask(pe),ce=pe)},setFunc:function(pe){if(Me&&(pe=R_[pe]),Se!==pe){switch(pe){case Cc:n.depthFunc(n.NEVER);break;case Pc:n.depthFunc(n.ALWAYS);break;case Nc:n.depthFunc(n.LESS);break;case ya:n.depthFunc(n.LEQUAL);break;case Lc:n.depthFunc(n.EQUAL);break;case Dc:n.depthFunc(n.GEQUAL);break;case Uc:n.depthFunc(n.GREATER);break;case Oc:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Se=pe}},setLocked:function(pe){V=pe},setClear:function(pe){Ae!==pe&&(Ae=pe,Me&&(pe=1-pe),n.clearDepth(pe))},reset:function(){V=!1,ce=null,Se=null,Ae=null,Me=!1}}}function r(){let V=!1,Me=null,ce=null,Se=null,Ae=null,pe=null,Xe=null,Be=null,Ft=null;return{setTest:function(At){V||(At?$(n.STENCIL_TEST):be(n.STENCIL_TEST))},setMask:function(At){Me!==At&&!V&&(n.stencilMask(At),Me=At)},setFunc:function(At,Yn,si){(ce!==At||Se!==Yn||Ae!==si)&&(n.stencilFunc(At,Yn,si),ce=At,Se=Yn,Ae=si)},setOp:function(At,Yn,si){(pe!==At||Xe!==Yn||Be!==si)&&(n.stencilOp(At,Yn,si),pe=At,Xe=Yn,Be=si)},setLocked:function(At){V=At},setClear:function(At){Ft!==At&&(n.clearStencil(At),Ft=At)},reset:function(){V=!1,Me=null,ce=null,Se=null,Ae=null,pe=null,Xe=null,Be=null,Ft=null}}}let s=new t,a=new i,o=new r,c=new WeakMap,l=new WeakMap,u={},h={},d={},m=new WeakMap,x=[],v=null,g=!1,_=null,T=null,I=null,E=null,w=null,R=null,P=null,y=new et(0,0,0),N=0,k=!1,W=null,q=null,ee=null,X=null,Q=null,oe=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),re=!1,me=0,ne=n.getParameter(n.VERSION);ne.indexOf("WebGL")!==-1?(me=parseFloat(/^WebGL (\d)/.exec(ne)[1]),re=me>=1):ne.indexOf("OpenGL ES")!==-1&&(me=parseFloat(/^OpenGL ES (\d)/.exec(ne)[1]),re=me>=2);let le=null,he={},Ge=n.getParameter(n.SCISSOR_BOX),Ne=n.getParameter(n.VIEWPORT),vt=new Ut().fromArray(Ge),ie=new Ut().fromArray(Ne);function Te(V,Me,ce,Se){let Ae=new Uint8Array(4),pe=n.createTexture();n.bindTexture(V,pe),n.texParameteri(V,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(V,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Xe=0;Xe<ce;Xe++)V===n.TEXTURE_3D||V===n.TEXTURE_2D_ARRAY?n.texImage3D(Me,0,n.RGBA,1,1,Se,0,n.RGBA,n.UNSIGNED_BYTE,Ae):n.texImage2D(Me+Xe,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Ae);return pe}let K={};K[n.TEXTURE_2D]=Te(n.TEXTURE_2D,n.TEXTURE_2D,1),K[n.TEXTURE_CUBE_MAP]=Te(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),K[n.TEXTURE_2D_ARRAY]=Te(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),K[n.TEXTURE_3D]=Te(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),$(n.DEPTH_TEST),a.setFunc(ya),dt(!1),Nt(Ud),$(n.CULL_FACE),pt(Yi);function $(V){u[V]!==!0&&(n.enable(V),u[V]=!0)}function be(V){u[V]!==!1&&(n.disable(V),u[V]=!1)}function Ie(V,Me){return d[V]!==Me?(n.bindFramebuffer(V,Me),d[V]=Me,V===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=Me),V===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=Me),!0):!1}function de(V,Me){let ce=x,Se=!1;if(V){ce=m.get(Me),ce===void 0&&(ce=[],m.set(Me,ce));let Ae=V.textures;if(ce.length!==Ae.length||ce[0]!==n.COLOR_ATTACHMENT0){for(let pe=0,Xe=Ae.length;pe<Xe;pe++)ce[pe]=n.COLOR_ATTACHMENT0+pe;ce.length=Ae.length,Se=!0}}else ce[0]!==n.BACK&&(ce[0]=n.BACK,Se=!0);Se&&n.drawBuffers(ce)}function Ke(V){return v!==V?(n.useProgram(V),v=V,!0):!1}let Rt={[Ps]:n.FUNC_ADD,[Kg]:n.FUNC_SUBTRACT,[jg]:n.FUNC_REVERSE_SUBTRACT};Rt[$g]=n.MIN,Rt[Jg]=n.MAX;let it={[Qg]:n.ZERO,[e_]:n.ONE,[t_]:n.SRC_COLOR,[kd]:n.SRC_ALPHA,[o_]:n.SRC_ALPHA_SATURATE,[s_]:n.DST_COLOR,[i_]:n.DST_ALPHA,[n_]:n.ONE_MINUS_SRC_COLOR,[zd]:n.ONE_MINUS_SRC_ALPHA,[a_]:n.ONE_MINUS_DST_COLOR,[r_]:n.ONE_MINUS_DST_ALPHA,[l_]:n.CONSTANT_COLOR,[c_]:n.ONE_MINUS_CONSTANT_COLOR,[u_]:n.CONSTANT_ALPHA,[h_]:n.ONE_MINUS_CONSTANT_ALPHA};function pt(V,Me,ce,Se,Ae,pe,Xe,Be,Ft,At){if(V===Yi){g===!0&&(be(n.BLEND),g=!1);return}if(g===!1&&($(n.BLEND),g=!0),V!==Zg){if(V!==_||At!==k){if((T!==Ps||w!==Ps)&&(n.blendEquation(n.FUNC_ADD),T=Ps,w=Ps),At)switch(V){case za:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Od:n.blendFunc(n.ONE,n.ONE);break;case Fd:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Bd:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Qe("WebGLState: Invalid blending: ",V);break}else switch(V){case za:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Od:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Fd:Qe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Bd:Qe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Qe("WebGLState: Invalid blending: ",V);break}I=null,E=null,R=null,P=null,y.set(0,0,0),N=0,_=V,k=At}return}Ae=Ae||Me,pe=pe||ce,Xe=Xe||Se,(Me!==T||Ae!==w)&&(n.blendEquationSeparate(Rt[Me],Rt[Ae]),T=Me,w=Ae),(ce!==I||Se!==E||pe!==R||Xe!==P)&&(n.blendFuncSeparate(it[ce],it[Se],it[pe],it[Xe]),I=ce,E=Se,R=pe,P=Xe),(Be.equals(y)===!1||Ft!==N)&&(n.blendColor(Be.r,Be.g,Be.b,Ft),y.copy(Be),N=Ft),_=V,k=!1}function It(V,Me){V.side===Un?be(n.CULL_FACE):$(n.CULL_FACE);let ce=V.side===Dn;Me&&(ce=!ce),dt(ce),V.blending===za&&V.transparent===!1?pt(Yi):pt(V.blending,V.blendEquation,V.blendSrc,V.blendDst,V.blendEquationAlpha,V.blendSrcAlpha,V.blendDstAlpha,V.blendColor,V.blendAlpha,V.premultipliedAlpha),a.setFunc(V.depthFunc),a.setTest(V.depthTest),a.setMask(V.depthWrite),s.setMask(V.colorWrite);let Se=V.stencilWrite;o.setTest(Se),Se&&(o.setMask(V.stencilWriteMask),o.setFunc(V.stencilFunc,V.stencilRef,V.stencilFuncMask),o.setOp(V.stencilFail,V.stencilZFail,V.stencilZPass)),Qt(V.polygonOffset,V.polygonOffsetFactor,V.polygonOffsetUnits),V.alphaToCoverage===!0?$(n.SAMPLE_ALPHA_TO_COVERAGE):be(n.SAMPLE_ALPHA_TO_COVERAGE)}function dt(V){W!==V&&(V?n.frontFace(n.CW):n.frontFace(n.CCW),W=V)}function Nt(V){V!==Xg?($(n.CULL_FACE),V!==q&&(V===Ud?n.cullFace(n.BACK):V===qg?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):be(n.CULL_FACE),q=V}function Jt(V){V!==ee&&(re&&n.lineWidth(V),ee=V)}function Qt(V,Me,ce){V?($(n.POLYGON_OFFSET_FILL),(X!==Me||Q!==ce)&&(X=Me,Q=ce,a.getReversed()&&(Me=-Me),n.polygonOffset(Me,ce))):be(n.POLYGON_OFFSET_FILL)}function Ot(V){V?$(n.SCISSOR_TEST):be(n.SCISSOR_TEST)}function Xt(V){V===void 0&&(V=n.TEXTURE0+oe-1),le!==V&&(n.activeTexture(V),le=V)}function G(V,Me,ce){ce===void 0&&(le===null?ce=n.TEXTURE0+oe-1:ce=le);let Se=he[ce];Se===void 0&&(Se={type:void 0,texture:void 0},he[ce]=Se),(Se.type!==V||Se.texture!==Me)&&(le!==ce&&(n.activeTexture(ce),le=ce),n.bindTexture(V,Me||K[V]),Se.type=V,Se.texture=Me)}function Fe(){let V=he[le];V!==void 0&&V.type!==void 0&&(n.bindTexture(V.type,null),V.type=void 0,V.texture=void 0)}function gt(){try{n.compressedTexImage2D(...arguments)}catch(V){Qe("WebGLState:",V)}}function p(){try{n.compressedTexImage3D(...arguments)}catch(V){Qe("WebGLState:",V)}}function f(){try{n.texSubImage2D(...arguments)}catch(V){Qe("WebGLState:",V)}}function S(){try{n.texSubImage3D(...arguments)}catch(V){Qe("WebGLState:",V)}}function A(){try{n.compressedTexSubImage2D(...arguments)}catch(V){Qe("WebGLState:",V)}}function C(){try{n.compressedTexSubImage3D(...arguments)}catch(V){Qe("WebGLState:",V)}}function L(){try{n.texStorage2D(...arguments)}catch(V){Qe("WebGLState:",V)}}function H(){try{n.texStorage3D(...arguments)}catch(V){Qe("WebGLState:",V)}}function D(){try{n.texImage2D(...arguments)}catch(V){Qe("WebGLState:",V)}}function F(){try{n.texImage3D(...arguments)}catch(V){Qe("WebGLState:",V)}}function ae(V){return h[V]!==void 0?h[V]:n.getParameter(V)}function ge(V,Me){h[V]!==Me&&(n.pixelStorei(V,Me),h[V]=Me)}function ue(V){vt.equals(V)===!1&&(n.scissor(V.x,V.y,V.z,V.w),vt.copy(V))}function fe(V){ie.equals(V)===!1&&(n.viewport(V.x,V.y,V.z,V.w),ie.copy(V))}function Ce(V,Me){let ce=l.get(Me);ce===void 0&&(ce=new WeakMap,l.set(Me,ce));let Se=ce.get(V);Se===void 0&&(Se=n.getUniformBlockIndex(Me,V.name),ce.set(V,Se))}function Ue(V,Me){let Se=l.get(Me).get(V);c.get(Me)!==Se&&(n.uniformBlockBinding(Me,Se,V.__bindingPointIndex),c.set(Me,Se))}function tt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},h={},le=null,he={},d={},m=new WeakMap,x=[],v=null,g=!1,_=null,T=null,I=null,E=null,w=null,R=null,P=null,y=new et(0,0,0),N=0,k=!1,W=null,q=null,ee=null,X=null,Q=null,vt.set(0,0,n.canvas.width,n.canvas.height),ie.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:$,disable:be,bindFramebuffer:Ie,drawBuffers:de,useProgram:Ke,setBlending:pt,setMaterial:It,setFlipSided:dt,setCullFace:Nt,setLineWidth:Jt,setPolygonOffset:Qt,setScissorTest:Ot,activeTexture:Xt,bindTexture:G,unbindTexture:Fe,compressedTexImage2D:gt,compressedTexImage3D:p,texImage2D:D,texImage3D:F,pixelStorei:ge,getParameter:ae,updateUBOMapping:Ce,uniformBlockBinding:Ue,texStorage2D:L,texStorage3D:H,texSubImage2D:f,texSubImage3D:S,compressedTexSubImage2D:A,compressedTexSubImage3D:C,scissor:ue,viewport:fe,reset:tt}}function yT(n,e,t,i,r,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ht,u=new WeakMap,h=new Set,d,m=new WeakMap,x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(p,f){return x?new OffscreenCanvas(p,f):Ma("canvas")}function g(p,f,S){let A=1,C=gt(p);if((C.width>S||C.height>S)&&(A=S/Math.max(C.width,C.height)),A<1)if(typeof HTMLImageElement<"u"&&p instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&p instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&p instanceof ImageBitmap||typeof VideoFrame<"u"&&p instanceof VideoFrame){let L=Math.floor(A*C.width),H=Math.floor(A*C.height);d===void 0&&(d=v(L,H));let D=f?v(L,H):d;return D.width=L,D.height=H,D.getContext("2d").drawImage(p,0,0,L,H),Ye("WebGLRenderer: Texture has been resized from ("+C.width+"x"+C.height+") to ("+L+"x"+H+")."),D}else return"data"in p&&Ye("WebGLRenderer: Image in DataTexture is too big ("+C.width+"x"+C.height+")."),p;return p}function _(p){return p.generateMipmaps}function T(p){n.generateMipmap(p)}function I(p){return p.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:p.isWebGL3DRenderTarget?n.TEXTURE_3D:p.isWebGLArrayRenderTarget||p.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function E(p,f,S,A,C,L=!1){if(p!==null){if(n[p]!==void 0)return n[p];Ye("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+p+"'")}let H;A&&(H=e.get("EXT_texture_norm16"),H||Ye("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let D=f;if(f===n.RED&&(S===n.FLOAT&&(D=n.R32F),S===n.HALF_FLOAT&&(D=n.R16F),S===n.UNSIGNED_BYTE&&(D=n.R8),S===n.UNSIGNED_SHORT&&H&&(D=H.R16_EXT),S===n.SHORT&&H&&(D=H.R16_SNORM_EXT)),f===n.RED_INTEGER&&(S===n.UNSIGNED_BYTE&&(D=n.R8UI),S===n.UNSIGNED_SHORT&&(D=n.R16UI),S===n.UNSIGNED_INT&&(D=n.R32UI),S===n.BYTE&&(D=n.R8I),S===n.SHORT&&(D=n.R16I),S===n.INT&&(D=n.R32I)),f===n.RG&&(S===n.FLOAT&&(D=n.RG32F),S===n.HALF_FLOAT&&(D=n.RG16F),S===n.UNSIGNED_BYTE&&(D=n.RG8),S===n.UNSIGNED_SHORT&&H&&(D=H.RG16_EXT),S===n.SHORT&&H&&(D=H.RG16_SNORM_EXT)),f===n.RG_INTEGER&&(S===n.UNSIGNED_BYTE&&(D=n.RG8UI),S===n.UNSIGNED_SHORT&&(D=n.RG16UI),S===n.UNSIGNED_INT&&(D=n.RG32UI),S===n.BYTE&&(D=n.RG8I),S===n.SHORT&&(D=n.RG16I),S===n.INT&&(D=n.RG32I)),f===n.RGB_INTEGER&&(S===n.UNSIGNED_BYTE&&(D=n.RGB8UI),S===n.UNSIGNED_SHORT&&(D=n.RGB16UI),S===n.UNSIGNED_INT&&(D=n.RGB32UI),S===n.BYTE&&(D=n.RGB8I),S===n.SHORT&&(D=n.RGB16I),S===n.INT&&(D=n.RGB32I)),f===n.RGBA_INTEGER&&(S===n.UNSIGNED_BYTE&&(D=n.RGBA8UI),S===n.UNSIGNED_SHORT&&(D=n.RGBA16UI),S===n.UNSIGNED_INT&&(D=n.RGBA32UI),S===n.BYTE&&(D=n.RGBA8I),S===n.SHORT&&(D=n.RGBA16I),S===n.INT&&(D=n.RGBA32I)),f===n.RGB&&(S===n.UNSIGNED_SHORT&&H&&(D=H.RGB16_EXT),S===n.SHORT&&H&&(D=H.RGB16_SNORM_EXT),S===n.UNSIGNED_INT_5_9_9_9_REV&&(D=n.RGB9_E5),S===n.UNSIGNED_INT_10F_11F_11F_REV&&(D=n.R11F_G11F_B10F)),f===n.RGBA){let F=L?Po:xt.getTransfer(C);S===n.FLOAT&&(D=n.RGBA32F),S===n.HALF_FLOAT&&(D=n.RGBA16F),S===n.UNSIGNED_BYTE&&(D=F===Pt?n.SRGB8_ALPHA8:n.RGBA8),S===n.UNSIGNED_SHORT&&H&&(D=H.RGBA16_EXT),S===n.SHORT&&H&&(D=H.RGBA16_SNORM_EXT),S===n.UNSIGNED_SHORT_4_4_4_4&&(D=n.RGBA4),S===n.UNSIGNED_SHORT_5_5_5_1&&(D=n.RGB5_A1)}return(D===n.R16F||D===n.R32F||D===n.RG16F||D===n.RG32F||D===n.RGBA16F||D===n.RGBA32F)&&e.get("EXT_color_buffer_float"),D}function w(p,f){let S;return p?f===null||f===Ci||f===Ha?S=n.DEPTH24_STENCIL8:f===ii?S=n.DEPTH32F_STENCIL8:f===Ga&&(S=n.DEPTH24_STENCIL8,Ye("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):f===null||f===Ci||f===Ha?S=n.DEPTH_COMPONENT24:f===ii?S=n.DEPTH_COMPONENT32F:f===Ga&&(S=n.DEPTH_COMPONENT16),S}function R(p,f){return _(p)===!0||p.isFramebufferTexture&&p.minFilter!==Yt&&p.minFilter!==jt?Math.log2(Math.max(f.width,f.height))+1:p.mipmaps!==void 0&&p.mipmaps.length>0?p.mipmaps.length:p.isCompressedTexture&&Array.isArray(p.image)?f.mipmaps.length:1}function P(p){let f=p.target;f.removeEventListener("dispose",P),N(f),f.isVideoTexture&&u.delete(f),f.isHTMLTexture&&h.delete(f)}function y(p){let f=p.target;f.removeEventListener("dispose",y),W(f)}function N(p){let f=i.get(p);if(f.__webglInit===void 0)return;let S=p.source,A=m.get(S);if(A){let C=A[f.__cacheKey];C.usedTimes--,C.usedTimes===0&&k(p),Object.keys(A).length===0&&m.delete(S)}i.remove(p)}function k(p){let f=i.get(p);n.deleteTexture(f.__webglTexture);let S=p.source,A=m.get(S);delete A[f.__cacheKey],a.memory.textures--}function W(p){let f=i.get(p);if(p.depthTexture&&(p.depthTexture.dispose(),i.remove(p.depthTexture)),p.isWebGLCubeRenderTarget)for(let A=0;A<6;A++){if(Array.isArray(f.__webglFramebuffer[A]))for(let C=0;C<f.__webglFramebuffer[A].length;C++)n.deleteFramebuffer(f.__webglFramebuffer[A][C]);else n.deleteFramebuffer(f.__webglFramebuffer[A]);f.__webglDepthbuffer&&n.deleteRenderbuffer(f.__webglDepthbuffer[A])}else{if(Array.isArray(f.__webglFramebuffer))for(let A=0;A<f.__webglFramebuffer.length;A++)n.deleteFramebuffer(f.__webglFramebuffer[A]);else n.deleteFramebuffer(f.__webglFramebuffer);if(f.__webglDepthbuffer&&n.deleteRenderbuffer(f.__webglDepthbuffer),f.__webglMultisampledFramebuffer&&n.deleteFramebuffer(f.__webglMultisampledFramebuffer),f.__webglColorRenderbuffer)for(let A=0;A<f.__webglColorRenderbuffer.length;A++)f.__webglColorRenderbuffer[A]&&n.deleteRenderbuffer(f.__webglColorRenderbuffer[A]);f.__webglDepthRenderbuffer&&n.deleteRenderbuffer(f.__webglDepthRenderbuffer)}let S=p.textures;for(let A=0,C=S.length;A<C;A++){let L=i.get(S[A]);L.__webglTexture&&(n.deleteTexture(L.__webglTexture),a.memory.textures--),i.remove(S[A])}i.remove(p)}let q=0;function ee(){q=0}function X(){return q}function Q(p){q=p}function oe(){let p=q;return p>=r.maxTextures&&Ye("WebGLTextures: Trying to use "+(p+1)+" texture units while this GPU supports only "+r.maxTextures),q+=1,p}function re(p){let f=[];return f.push(p.wrapS),f.push(p.wrapT),f.push(p.wrapR||0),f.push(p.magFilter),f.push(p.minFilter),f.push(p.anisotropy),f.push(p.internalFormat),f.push(p.format),f.push(p.type),f.push(p.generateMipmaps),f.push(p.premultiplyAlpha),f.push(p.flipY),f.push(p.unpackAlignment),f.push(p.colorSpace),f.join()}function me(p,f){let S=i.get(p);if(p.isVideoTexture&&G(p),p.isRenderTargetTexture===!1&&p.isExternalTexture!==!0&&p.version>0&&S.__version!==p.version){let A=p.image;if(A===null)Ye("WebGLRenderer: Texture marked for update but no image data found.");else if(A.complete===!1)Ye("WebGLRenderer: Texture marked for update but image is incomplete");else{be(S,p,f);return}}else p.isExternalTexture&&(S.__webglTexture=p.sourceTexture?p.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,S.__webglTexture,n.TEXTURE0+f)}function ne(p,f){let S=i.get(p);if(p.isRenderTargetTexture===!1&&p.version>0&&S.__version!==p.version){be(S,p,f);return}else p.isExternalTexture&&(S.__webglTexture=p.sourceTexture?p.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,S.__webglTexture,n.TEXTURE0+f)}function le(p,f){let S=i.get(p);if(p.isRenderTargetTexture===!1&&p.version>0&&S.__version!==p.version){be(S,p,f);return}t.bindTexture(n.TEXTURE_3D,S.__webglTexture,n.TEXTURE0+f)}function he(p,f){let S=i.get(p);if(p.isCubeDepthTexture!==!0&&p.version>0&&S.__version!==p.version){Ie(S,p,f);return}t.bindTexture(n.TEXTURE_CUBE_MAP,S.__webglTexture,n.TEXTURE0+f)}let Ge={[Gr]:n.REPEAT,[pi]:n.CLAMP_TO_EDGE,[Sa]:n.MIRRORED_REPEAT},Ne={[Yt]:n.NEAREST,[iu]:n.NEAREST_MIPMAP_NEAREST,[Ls]:n.NEAREST_MIPMAP_LINEAR,[jt]:n.LINEAR,[Va]:n.LINEAR_MIPMAP_NEAREST,[Ii]:n.LINEAR_MIPMAP_LINEAR},vt={[v_]:n.NEVER,[E_]:n.ALWAYS,[y_]:n.LESS,[Gu]:n.LEQUAL,[S_]:n.EQUAL,[Hu]:n.GEQUAL,[b_]:n.GREATER,[M_]:n.NOTEQUAL};function ie(p,f){if(f.type===ii&&e.has("OES_texture_float_linear")===!1&&(f.magFilter===jt||f.magFilter===Va||f.magFilter===Ls||f.magFilter===Ii||f.minFilter===jt||f.minFilter===Va||f.minFilter===Ls||f.minFilter===Ii)&&Ye("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(p,n.TEXTURE_WRAP_S,Ge[f.wrapS]),n.texParameteri(p,n.TEXTURE_WRAP_T,Ge[f.wrapT]),(p===n.TEXTURE_3D||p===n.TEXTURE_2D_ARRAY)&&n.texParameteri(p,n.TEXTURE_WRAP_R,Ge[f.wrapR]),n.texParameteri(p,n.TEXTURE_MAG_FILTER,Ne[f.magFilter]),n.texParameteri(p,n.TEXTURE_MIN_FILTER,Ne[f.minFilter]),f.compareFunction&&(n.texParameteri(p,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(p,n.TEXTURE_COMPARE_FUNC,vt[f.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(f.magFilter===Yt||f.minFilter!==Ls&&f.minFilter!==Ii||f.type===ii&&e.has("OES_texture_float_linear")===!1)return;if(f.anisotropy>1||i.get(f).__currentAnisotropy){let S=e.get("EXT_texture_filter_anisotropic");n.texParameterf(p,S.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(f.anisotropy,r.getMaxAnisotropy())),i.get(f).__currentAnisotropy=f.anisotropy}}}function Te(p,f){let S=!1;p.__webglInit===void 0&&(p.__webglInit=!0,f.addEventListener("dispose",P));let A=f.source,C=m.get(A);C===void 0&&(C={},m.set(A,C));let L=re(f);if(L!==p.__cacheKey){C[L]===void 0&&(C[L]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,S=!0),C[L].usedTimes++;let H=C[p.__cacheKey];H!==void 0&&(C[p.__cacheKey].usedTimes--,H.usedTimes===0&&k(f)),p.__cacheKey=L,p.__webglTexture=C[L].texture}return S}function K(p,f,S){return Math.floor(Math.floor(p/S)/f)}function $(p,f,S,A){let L=p.updateRanges;if(L.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,f.width,f.height,S,A,f.data);else{L.sort((ge,ue)=>ge.start-ue.start);let H=0;for(let ge=1;ge<L.length;ge++){let ue=L[H],fe=L[ge],Ce=ue.start+ue.count,Ue=K(fe.start,f.width,4),tt=K(ue.start,f.width,4);fe.start<=Ce+1&&Ue===tt&&K(fe.start+fe.count-1,f.width,4)===Ue?ue.count=Math.max(ue.count,fe.start+fe.count-ue.start):(++H,L[H]=fe)}L.length=H+1;let D=t.getParameter(n.UNPACK_ROW_LENGTH),F=t.getParameter(n.UNPACK_SKIP_PIXELS),ae=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,f.width);for(let ge=0,ue=L.length;ge<ue;ge++){let fe=L[ge],Ce=Math.floor(fe.start/4),Ue=Math.ceil(fe.count/4),tt=Ce%f.width,V=Math.floor(Ce/f.width),Me=Ue,ce=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,tt),t.pixelStorei(n.UNPACK_SKIP_ROWS,V),t.texSubImage2D(n.TEXTURE_2D,0,tt,V,Me,ce,S,A,f.data)}p.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,D),t.pixelStorei(n.UNPACK_SKIP_PIXELS,F),t.pixelStorei(n.UNPACK_SKIP_ROWS,ae)}}function be(p,f,S){let A=n.TEXTURE_2D;(f.isDataArrayTexture||f.isCompressedArrayTexture)&&(A=n.TEXTURE_2D_ARRAY),f.isData3DTexture&&(A=n.TEXTURE_3D);let C=Te(p,f),L=f.source;t.bindTexture(A,p.__webglTexture,n.TEXTURE0+S);let H=i.get(L);if(L.version!==H.__version||C===!0){if(t.activeTexture(n.TEXTURE0+S),(typeof ImageBitmap<"u"&&f.image instanceof ImageBitmap)===!1){let ce=xt.getPrimaries(xt.workingColorSpace),Se=f.colorSpace===br?null:xt.getPrimaries(f.colorSpace),Ae=f.colorSpace===br||ce===Se?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,f.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,f.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae)}t.pixelStorei(n.UNPACK_ALIGNMENT,f.unpackAlignment);let F=g(f.image,!1,r.maxTextureSize);F=Fe(f,F);let ae=s.convert(f.format,f.colorSpace),ge=s.convert(f.type),ue=E(f.internalFormat,ae,ge,f.normalized,f.colorSpace,f.isVideoTexture);ie(A,f);let fe,Ce=f.mipmaps,Ue=f.isVideoTexture!==!0,tt=H.__version===void 0||C===!0,V=L.dataReady,Me=R(f,F);if(f.isDepthTexture)ue=w(f.format===Yr,f.type),tt&&(Ue?t.texStorage2D(n.TEXTURE_2D,1,ue,F.width,F.height):t.texImage2D(n.TEXTURE_2D,0,ue,F.width,F.height,0,ae,ge,null));else if(f.isDataTexture)if(Ce.length>0){Ue&&tt&&t.texStorage2D(n.TEXTURE_2D,Me,ue,Ce[0].width,Ce[0].height);for(let ce=0,Se=Ce.length;ce<Se;ce++)fe=Ce[ce],Ue?V&&t.texSubImage2D(n.TEXTURE_2D,ce,0,0,fe.width,fe.height,ae,ge,fe.data):t.texImage2D(n.TEXTURE_2D,ce,ue,fe.width,fe.height,0,ae,ge,fe.data);f.generateMipmaps=!1}else Ue?(tt&&t.texStorage2D(n.TEXTURE_2D,Me,ue,F.width,F.height),V&&$(f,F,ae,ge)):t.texImage2D(n.TEXTURE_2D,0,ue,F.width,F.height,0,ae,ge,F.data);else if(f.isCompressedTexture)if(f.isCompressedArrayTexture){Ue&&tt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Me,ue,Ce[0].width,Ce[0].height,F.depth);for(let ce=0,Se=Ce.length;ce<Se;ce++)if(fe=Ce[ce],f.format!==ri)if(ae!==null)if(Ue){if(V)if(f.layerUpdates.size>0){let Ae=uf(fe.width,fe.height,f.format,f.type);for(let pe of f.layerUpdates){let Xe=fe.data.subarray(pe*Ae/fe.data.BYTES_PER_ELEMENT,(pe+1)*Ae/fe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ce,0,0,pe,fe.width,fe.height,1,ae,Xe)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ce,0,0,0,fe.width,fe.height,F.depth,ae,fe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ce,ue,fe.width,fe.height,F.depth,0,fe.data,0,0);else Ye("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ue?V&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ce,0,0,0,fe.width,fe.height,F.depth,ae,ge,fe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ce,ue,fe.width,fe.height,F.depth,0,ae,ge,fe.data);f.layerUpdates.size>0&&f.clearLayerUpdates()}else{Ue&&tt&&t.texStorage2D(n.TEXTURE_2D,Me,ue,Ce[0].width,Ce[0].height);for(let ce=0,Se=Ce.length;ce<Se;ce++)fe=Ce[ce],f.format!==ri?ae!==null?Ue?V&&t.compressedTexSubImage2D(n.TEXTURE_2D,ce,0,0,fe.width,fe.height,ae,fe.data):t.compressedTexImage2D(n.TEXTURE_2D,ce,ue,fe.width,fe.height,0,fe.data):Ye("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ue?V&&t.texSubImage2D(n.TEXTURE_2D,ce,0,0,fe.width,fe.height,ae,ge,fe.data):t.texImage2D(n.TEXTURE_2D,ce,ue,fe.width,fe.height,0,ae,ge,fe.data)}else if(f.isDataArrayTexture)if(Ue){if(tt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Me,ue,F.width,F.height,F.depth),V)if(f.layerUpdates.size>0){let ce=uf(F.width,F.height,f.format,f.type);for(let Se of f.layerUpdates){let Ae=F.data.subarray(Se*ce/F.data.BYTES_PER_ELEMENT,(Se+1)*ce/F.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Se,F.width,F.height,1,ae,ge,Ae)}f.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,F.width,F.height,F.depth,ae,ge,F.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,ue,F.width,F.height,F.depth,0,ae,ge,F.data);else if(f.isData3DTexture)Ue?(tt&&t.texStorage3D(n.TEXTURE_3D,Me,ue,F.width,F.height,F.depth),V&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,F.width,F.height,F.depth,ae,ge,F.data)):t.texImage3D(n.TEXTURE_3D,0,ue,F.width,F.height,F.depth,0,ae,ge,F.data);else if(f.isFramebufferTexture){if(tt)if(Ue)t.texStorage2D(n.TEXTURE_2D,Me,ue,F.width,F.height);else{let ce=F.width,Se=F.height;for(let Ae=0;Ae<Me;Ae++)t.texImage2D(n.TEXTURE_2D,Ae,ue,ce,Se,0,ae,ge,null),ce>>=1,Se>>=1}}else if(f.isHTMLTexture){if("texElementImage2D"in n){let ce=n.canvas;if(ce.hasAttribute("layoutsubtree")||ce.setAttribute("layoutsubtree","true"),F.parentNode!==ce){ce.appendChild(F),h.add(f),ce.onpaint=Se=>{let Ae=Se.changedElements;for(let pe of h)Ae.includes(pe.image)&&(pe.needsUpdate=!0)},ce.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,F);else{let Ae=n.RGBA,pe=n.RGBA,Xe=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Ae,pe,Xe,F)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Ce.length>0){if(Ue&&tt){let ce=gt(Ce[0]);t.texStorage2D(n.TEXTURE_2D,Me,ue,ce.width,ce.height)}for(let ce=0,Se=Ce.length;ce<Se;ce++)fe=Ce[ce],Ue?V&&t.texSubImage2D(n.TEXTURE_2D,ce,0,0,ae,ge,fe):t.texImage2D(n.TEXTURE_2D,ce,ue,ae,ge,fe);f.generateMipmaps=!1}else if(Ue){if(tt){let ce=gt(F);t.texStorage2D(n.TEXTURE_2D,Me,ue,ce.width,ce.height)}V&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ae,ge,F)}else t.texImage2D(n.TEXTURE_2D,0,ue,ae,ge,F);_(f)&&T(A),H.__version=L.version,f.onUpdate&&f.onUpdate(f)}p.__version=f.version}function Ie(p,f,S){if(f.image.length!==6)return;let A=Te(p,f),C=f.source;t.bindTexture(n.TEXTURE_CUBE_MAP,p.__webglTexture,n.TEXTURE0+S);let L=i.get(C);if(C.version!==L.__version||A===!0){t.activeTexture(n.TEXTURE0+S);let H=xt.getPrimaries(xt.workingColorSpace),D=f.colorSpace===br?null:xt.getPrimaries(f.colorSpace),F=f.colorSpace===br||H===D?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,f.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,f.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,f.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,F);let ae=f.isCompressedTexture||f.image[0].isCompressedTexture,ge=f.image[0]&&f.image[0].isDataTexture,ue=[];for(let pe=0;pe<6;pe++)!ae&&!ge?ue[pe]=g(f.image[pe],!0,r.maxCubemapSize):ue[pe]=ge?f.image[pe].image:f.image[pe],ue[pe]=Fe(f,ue[pe]);let fe=ue[0],Ce=s.convert(f.format,f.colorSpace),Ue=s.convert(f.type),tt=E(f.internalFormat,Ce,Ue,f.normalized,f.colorSpace),V=f.isVideoTexture!==!0,Me=L.__version===void 0||A===!0,ce=C.dataReady,Se=R(f,fe);ie(n.TEXTURE_CUBE_MAP,f);let Ae;if(ae){V&&Me&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Se,tt,fe.width,fe.height);for(let pe=0;pe<6;pe++){Ae=ue[pe].mipmaps;for(let Xe=0;Xe<Ae.length;Xe++){let Be=Ae[Xe];f.format!==ri?Ce!==null?V?ce&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,Xe,0,0,Be.width,Be.height,Ce,Be.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,Xe,tt,Be.width,Be.height,0,Be.data):Ye("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):V?ce&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,Xe,0,0,Be.width,Be.height,Ce,Ue,Be.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,Xe,tt,Be.width,Be.height,0,Ce,Ue,Be.data)}}}else{if(Ae=f.mipmaps,V&&Me){Ae.length>0&&Se++;let pe=gt(ue[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Se,tt,pe.width,pe.height)}for(let pe=0;pe<6;pe++)if(ge){V?ce&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,0,0,ue[pe].width,ue[pe].height,Ce,Ue,ue[pe].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,tt,ue[pe].width,ue[pe].height,0,Ce,Ue,ue[pe].data);for(let Xe=0;Xe<Ae.length;Xe++){let Ft=Ae[Xe].image[pe].image;V?ce&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,Xe+1,0,0,Ft.width,Ft.height,Ce,Ue,Ft.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,Xe+1,tt,Ft.width,Ft.height,0,Ce,Ue,Ft.data)}}else{V?ce&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,0,0,Ce,Ue,ue[pe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,tt,Ce,Ue,ue[pe]);for(let Xe=0;Xe<Ae.length;Xe++){let Be=Ae[Xe];V?ce&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,Xe+1,0,0,Ce,Ue,Be.image[pe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,Xe+1,tt,Ce,Ue,Be.image[pe])}}}_(f)&&T(n.TEXTURE_CUBE_MAP),L.__version=C.version,f.onUpdate&&f.onUpdate(f)}p.__version=f.version}function de(p,f,S,A,C,L){let H=s.convert(S.format,S.colorSpace),D=s.convert(S.type),F=E(S.internalFormat,H,D,S.normalized,S.colorSpace),ae=i.get(f),ge=i.get(S);if(ge.__renderTarget=f,!ae.__hasExternalTextures){let ue=Math.max(1,f.width>>L),fe=Math.max(1,f.height>>L);C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY?t.texImage3D(C,L,F,ue,fe,f.depth,0,H,D,null):t.texImage2D(C,L,F,ue,fe,0,H,D,null)}t.bindFramebuffer(n.FRAMEBUFFER,p),Xt(f)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,A,C,ge.__webglTexture,0,Ot(f)):(C===n.TEXTURE_2D||C>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&C<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,A,C,ge.__webglTexture,L),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ke(p,f,S){if(n.bindRenderbuffer(n.RENDERBUFFER,p),f.depthBuffer){let A=f.depthTexture,C=A&&A.isDepthTexture?A.type:null,L=w(f.stencilBuffer,C),H=f.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Xt(f)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ot(f),L,f.width,f.height):S?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ot(f),L,f.width,f.height):n.renderbufferStorage(n.RENDERBUFFER,L,f.width,f.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,H,n.RENDERBUFFER,p)}else{let A=f.textures;for(let C=0;C<A.length;C++){let L=A[C],H=s.convert(L.format,L.colorSpace),D=s.convert(L.type),F=E(L.internalFormat,H,D,L.normalized,L.colorSpace);Xt(f)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ot(f),F,f.width,f.height):S?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ot(f),F,f.width,f.height):n.renderbufferStorage(n.RENDERBUFFER,F,f.width,f.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Rt(p,f,S){let A=f.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,p),!(f.depthTexture&&f.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let C=i.get(f.depthTexture);if(C.__renderTarget=f,(!C.__webglTexture||f.depthTexture.image.width!==f.width||f.depthTexture.image.height!==f.height)&&(f.depthTexture.image.width=f.width,f.depthTexture.image.height=f.height,f.depthTexture.needsUpdate=!0),A){if(C.__webglInit===void 0&&(C.__webglInit=!0,f.depthTexture.addEventListener("dispose",P)),C.__webglTexture===void 0){C.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,C.__webglTexture),ie(n.TEXTURE_CUBE_MAP,f.depthTexture);let ae=s.convert(f.depthTexture.format),ge=s.convert(f.depthTexture.type),ue;f.depthTexture.format===Vi?ue=n.DEPTH_COMPONENT24:f.depthTexture.format===Yr&&(ue=n.DEPTH24_STENCIL8);for(let fe=0;fe<6;fe++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,ue,f.width,f.height,0,ae,ge,null)}}else me(f.depthTexture,0);let L=C.__webglTexture,H=Ot(f),D=A?n.TEXTURE_CUBE_MAP_POSITIVE_X+S:n.TEXTURE_2D,F=f.depthTexture.format===Yr?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(f.depthTexture.format===Vi)Xt(f)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,F,D,L,0,H):n.framebufferTexture2D(n.FRAMEBUFFER,F,D,L,0);else if(f.depthTexture.format===Yr)Xt(f)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,F,D,L,0,H):n.framebufferTexture2D(n.FRAMEBUFFER,F,D,L,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function it(p){let f=i.get(p),S=p.isWebGLCubeRenderTarget===!0;if(f.__boundDepthTexture!==p.depthTexture){let A=p.depthTexture;if(f.__depthDisposeCallback&&f.__depthDisposeCallback(),A){let C=()=>{delete f.__boundDepthTexture,delete f.__depthDisposeCallback,A.removeEventListener("dispose",C)};A.addEventListener("dispose",C),f.__depthDisposeCallback=C}f.__boundDepthTexture=A}if(p.depthTexture&&!f.__autoAllocateDepthBuffer)if(S)for(let A=0;A<6;A++)Rt(f.__webglFramebuffer[A],p,A);else{let A=p.texture.mipmaps;A&&A.length>0?Rt(f.__webglFramebuffer[0],p,0):Rt(f.__webglFramebuffer,p,0)}else if(S){f.__webglDepthbuffer=[];for(let A=0;A<6;A++)if(t.bindFramebuffer(n.FRAMEBUFFER,f.__webglFramebuffer[A]),f.__webglDepthbuffer[A]===void 0)f.__webglDepthbuffer[A]=n.createRenderbuffer(),Ke(f.__webglDepthbuffer[A],p,!1);else{let C=p.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,L=f.__webglDepthbuffer[A];n.bindRenderbuffer(n.RENDERBUFFER,L),n.framebufferRenderbuffer(n.FRAMEBUFFER,C,n.RENDERBUFFER,L)}}else{let A=p.texture.mipmaps;if(A&&A.length>0?t.bindFramebuffer(n.FRAMEBUFFER,f.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,f.__webglFramebuffer),f.__webglDepthbuffer===void 0)f.__webglDepthbuffer=n.createRenderbuffer(),Ke(f.__webglDepthbuffer,p,!1);else{let C=p.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,L=f.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,L),n.framebufferRenderbuffer(n.FRAMEBUFFER,C,n.RENDERBUFFER,L)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function pt(p,f,S){let A=i.get(p);f!==void 0&&de(A.__webglFramebuffer,p,p.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),S!==void 0&&it(p)}function It(p){let f=p.texture,S=i.get(p),A=i.get(f);p.addEventListener("dispose",y);let C=p.textures,L=p.isWebGLCubeRenderTarget===!0,H=C.length>1;if(H||(A.__webglTexture===void 0&&(A.__webglTexture=n.createTexture()),A.__version=f.version,a.memory.textures++),L){S.__webglFramebuffer=[];for(let D=0;D<6;D++)if(f.mipmaps&&f.mipmaps.length>0){S.__webglFramebuffer[D]=[];for(let F=0;F<f.mipmaps.length;F++)S.__webglFramebuffer[D][F]=n.createFramebuffer()}else S.__webglFramebuffer[D]=n.createFramebuffer()}else{if(f.mipmaps&&f.mipmaps.length>0){S.__webglFramebuffer=[];for(let D=0;D<f.mipmaps.length;D++)S.__webglFramebuffer[D]=n.createFramebuffer()}else S.__webglFramebuffer=n.createFramebuffer();if(H)for(let D=0,F=C.length;D<F;D++){let ae=i.get(C[D]);ae.__webglTexture===void 0&&(ae.__webglTexture=n.createTexture(),a.memory.textures++)}if(p.samples>0&&Xt(p)===!1){S.__webglMultisampledFramebuffer=n.createFramebuffer(),S.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,S.__webglMultisampledFramebuffer);for(let D=0;D<C.length;D++){let F=C[D];S.__webglColorRenderbuffer[D]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,S.__webglColorRenderbuffer[D]);let ae=s.convert(F.format,F.colorSpace),ge=s.convert(F.type),ue=E(F.internalFormat,ae,ge,F.normalized,F.colorSpace,p.isXRRenderTarget===!0),fe=Ot(p);n.renderbufferStorageMultisample(n.RENDERBUFFER,fe,ue,p.width,p.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+D,n.RENDERBUFFER,S.__webglColorRenderbuffer[D])}n.bindRenderbuffer(n.RENDERBUFFER,null),p.depthBuffer&&(S.__webglDepthRenderbuffer=n.createRenderbuffer(),Ke(S.__webglDepthRenderbuffer,p,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(L){t.bindTexture(n.TEXTURE_CUBE_MAP,A.__webglTexture),ie(n.TEXTURE_CUBE_MAP,f);for(let D=0;D<6;D++)if(f.mipmaps&&f.mipmaps.length>0)for(let F=0;F<f.mipmaps.length;F++)de(S.__webglFramebuffer[D][F],p,f,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+D,F);else de(S.__webglFramebuffer[D],p,f,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+D,0);_(f)&&T(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(H){for(let D=0,F=C.length;D<F;D++){let ae=C[D],ge=i.get(ae),ue=n.TEXTURE_2D;(p.isWebGL3DRenderTarget||p.isWebGLArrayRenderTarget)&&(ue=p.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ue,ge.__webglTexture),ie(ue,ae),de(S.__webglFramebuffer,p,ae,n.COLOR_ATTACHMENT0+D,ue,0),_(ae)&&T(ue)}t.unbindTexture()}else{let D=n.TEXTURE_2D;if((p.isWebGL3DRenderTarget||p.isWebGLArrayRenderTarget)&&(D=p.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(D,A.__webglTexture),ie(D,f),f.mipmaps&&f.mipmaps.length>0)for(let F=0;F<f.mipmaps.length;F++)de(S.__webglFramebuffer[F],p,f,n.COLOR_ATTACHMENT0,D,F);else de(S.__webglFramebuffer,p,f,n.COLOR_ATTACHMENT0,D,0);_(f)&&T(D),t.unbindTexture()}p.depthBuffer&&it(p)}function dt(p){let f=p.textures;for(let S=0,A=f.length;S<A;S++){let C=f[S];if(_(C)){let L=I(p),H=i.get(C).__webglTexture;t.bindTexture(L,H),T(L),t.unbindTexture()}}}let Nt=[],Jt=[];function Qt(p){if(p.samples>0){if(Xt(p)===!1){let f=p.textures,S=p.width,A=p.height,C=n.COLOR_BUFFER_BIT,L=p.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,H=i.get(p),D=f.length>1;if(D)for(let ae=0;ae<f.length;ae++)t.bindFramebuffer(n.FRAMEBUFFER,H.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ae,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,H.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ae,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,H.__webglMultisampledFramebuffer);let F=p.texture.mipmaps;F&&F.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,H.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,H.__webglFramebuffer);for(let ae=0;ae<f.length;ae++){if(p.resolveDepthBuffer&&(p.depthBuffer&&(C|=n.DEPTH_BUFFER_BIT),p.stencilBuffer&&p.resolveStencilBuffer&&(C|=n.STENCIL_BUFFER_BIT)),D){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,H.__webglColorRenderbuffer[ae]);let ge=i.get(f[ae]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ge,0)}n.blitFramebuffer(0,0,S,A,0,0,S,A,C,n.NEAREST),c===!0&&(Nt.length=0,Jt.length=0,Nt.push(n.COLOR_ATTACHMENT0+ae),p.depthBuffer&&p.storeMultisampledDepthBuffer===!1&&(Nt.push(L),Jt.push(L),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Jt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Nt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),D)for(let ae=0;ae<f.length;ae++){t.bindFramebuffer(n.FRAMEBUFFER,H.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ae,n.RENDERBUFFER,H.__webglColorRenderbuffer[ae]);let ge=i.get(f[ae]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,H.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ae,n.TEXTURE_2D,ge,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,H.__webglMultisampledFramebuffer)}else if(p.depthBuffer&&p.storeMultisampledDepthBuffer===!1&&c){let f=p.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[f])}}}function Ot(p){return Math.min(r.maxSamples,p.samples)}function Xt(p){let f=i.get(p);return p.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&f.__useRenderToTexture!==!1}function G(p){let f=a.render.frame;u.get(p)!==f&&(u.set(p,f),p.update())}function Fe(p,f){let S=p.colorSpace,A=p.format,C=p.type;return p.isCompressedTexture===!0||p.isVideoTexture===!0||S!==Ln&&S!==br&&(xt.getTransfer(S)===Pt?(A!==ri||C!==qn)&&Ye("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Qe("WebGLTextures: Unsupported texture color space:",S)),f}function gt(p){return typeof HTMLImageElement<"u"&&p instanceof HTMLImageElement?(l.width=p.naturalWidth||p.width,l.height=p.naturalHeight||p.height):typeof VideoFrame<"u"&&p instanceof VideoFrame?(l.width=p.displayWidth,l.height=p.displayHeight):(l.width=p.width,l.height=p.height),l}this.allocateTextureUnit=oe,this.resetTextureUnits=ee,this.getTextureUnits=X,this.setTextureUnits=Q,this.setTexture2D=me,this.setTexture2DArray=ne,this.setTexture3D=le,this.setTextureCube=he,this.rebindTextures=pt,this.setupRenderTarget=It,this.updateRenderTargetMipmap=dt,this.updateMultisampleRenderTarget=Qt,this.setupDepthRenderbuffer=it,this.setupFrameBufferTexture=de,this.useMultisampledRTT=Xt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function ST(n,e){function t(i,r=br){let s,a=xt.getTransfer(r);if(i===qn)return n.UNSIGNED_BYTE;if(i===su)return n.UNSIGNED_SHORT_4_4_4_4;if(i===au)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Jd)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Qd)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===jd)return n.BYTE;if(i===$d)return n.SHORT;if(i===Ga)return n.UNSIGNED_SHORT;if(i===ru)return n.INT;if(i===Ci)return n.UNSIGNED_INT;if(i===ii)return n.FLOAT;if(i===Pi)return n.HALF_FLOAT;if(i===ef)return n.ALPHA;if(i===tf)return n.RGB;if(i===ri)return n.RGBA;if(i===Vi)return n.DEPTH_COMPONENT;if(i===Yr)return n.DEPTH_STENCIL;if(i===ou)return n.RED;if(i===lu)return n.RED_INTEGER;if(i===Zr)return n.RG;if(i===cu)return n.RG_INTEGER;if(i===uu)return n.RGBA_INTEGER;if(i===nl||i===il||i===rl||i===sl)if(a===Pt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===nl)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===il)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===rl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===sl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===nl)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===il)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===rl)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===sl)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===hu||i===du||i===fu||i===pu)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===hu)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===du)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===fu)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===pu)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===mu||i===gu||i===_u||i===xu||i===vu||i===al||i===yu)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===mu||i===gu)return a===Pt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===_u)return a===Pt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===xu)return s.COMPRESSED_R11_EAC;if(i===vu)return s.COMPRESSED_SIGNED_R11_EAC;if(i===al)return s.COMPRESSED_RG11_EAC;if(i===yu)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Su||i===bu||i===Mu||i===Eu||i===Tu||i===Au||i===wu||i===Ru||i===Iu||i===Cu||i===Pu||i===Nu||i===Lu||i===Du)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Su)return a===Pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===bu)return a===Pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Mu)return a===Pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Eu)return a===Pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Tu)return a===Pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Au)return a===Pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===wu)return a===Pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Ru)return a===Pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Iu)return a===Pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Cu)return a===Pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Pu)return a===Pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Nu)return a===Pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Lu)return a===Pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Du)return a===Pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Uu||i===Ou||i===Fu)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Uu)return a===Pt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ou)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Fu)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Bu||i===ku||i===ol||i===zu)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Bu)return s.COMPRESSED_RED_RGTC1_EXT;if(i===ku)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===ol)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===zu)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ha?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var bT=`
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

}`,Ef=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new Wo(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new ni({vertexShader:bT,fragmentShader:MT,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new cn(new Rs(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Tf=class extends Gi{constructor(e,t){super();let i=this,r=null,s=1,a=null,o="local-floor",c=1,l=null,u=null,h=null,d=null,m=null,x=null,v=typeof XRWebGLBinding<"u",g=new Ef,_={},T=t.getContextAttributes(),I=null,E=null,w=[],R=[],P=new ht,y=null,N=null,k=new _n;k.viewport=new Ut;let W=new _n;W.viewport=new Ut;let q=[k,W],ee=new eu,X=null,Q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let $=w[K];return $===void 0&&($=new wa,w[K]=$),$.getTargetRaySpace()},this.getControllerGrip=function(K){let $=w[K];return $===void 0&&($=new wa,w[K]=$),$.getGripSpace()},this.getHand=function(K){let $=w[K];return $===void 0&&($=new wa,w[K]=$),$.getHandSpace()};function oe(K){let $=R.indexOf(K.inputSource);if($===-1)return;let be=w[$];be!==void 0&&(be.update(K.inputSource,K.frame,l||a),be.dispatchEvent({type:K.type,data:K.inputSource}))}function re(){r.removeEventListener("select",oe),r.removeEventListener("selectstart",oe),r.removeEventListener("selectend",oe),r.removeEventListener("squeeze",oe),r.removeEventListener("squeezestart",oe),r.removeEventListener("squeezeend",oe),r.removeEventListener("end",re),r.removeEventListener("inputsourceschange",me);for(let K=0;K<w.length;K++){let $=R[K];$!==null&&(R[K]=null,w[K].disconnect($))}X=null,Q=null,g.reset();for(let K in _)delete _[K];if(e.setRenderTarget(I),m=null,d=null,h=null,r=null,E=null,Te.stop(),i.isPresenting=!1,e.setPixelRatio(y),e.setSize(P.width,P.height,!1),N!==null){let K=N.camera;K.fov=N.fov,K.zoom=N.zoom,K.updateProjectionMatrix(),N=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){s=K,i.isPresenting===!0&&Ye("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){o=K,i.isPresenting===!0&&Ye("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(K){l=K},this.getBaseLayer=function(){return d!==null?d:m},this.getBinding=function(){return h===null&&v&&(h=new XRWebGLBinding(r,t)),h},this.getFrame=function(){return x},this.getSession=function(){return r},this.setSession=async function(K){if(r=K,r!==null){if(I=e.getRenderTarget(),r.addEventListener("select",oe),r.addEventListener("selectstart",oe),r.addEventListener("selectend",oe),r.addEventListener("squeeze",oe),r.addEventListener("squeezestart",oe),r.addEventListener("squeezeend",oe),r.addEventListener("end",re),r.addEventListener("inputsourceschange",me),T.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(P),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let be=null,Ie=null,de=null;T.depth&&(de=T.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,be=T.stencil?Yr:Vi,Ie=T.stencil?Ha:Ci);let Ke={colorFormat:t.RGBA8,depthFormat:de,scaleFactor:s};h=this.getBinding(),d=h.createProjectionLayer(Ke),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),E=new zn(d.textureWidth,d.textureHeight,{format:ri,type:qn,depthTexture:new Wr(d.textureWidth,d.textureHeight,Ie,void 0,void 0,void 0,void 0,void 0,void 0,be),stencilBuffer:T.stencil,colorSpace:e.outputColorSpace,samples:T.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let be={antialias:T.antialias,alpha:!0,depth:T.depth,stencil:T.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,t,be),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),E=new zn(m.framebufferWidth,m.framebufferHeight,{format:ri,type:qn,colorSpace:e.outputColorSpace,stencilBuffer:T.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1,storeMultisampledDepthBuffer:m.ignoreDepthValues===!1,storeMultisampledStencilBuffer:m.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await r.requestReferenceSpace(o),Te.setContext(r),Te.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function me(K){for(let $=0;$<K.removed.length;$++){let be=K.removed[$],Ie=R.indexOf(be);Ie>=0&&(R[Ie]=null,w[Ie].disconnect(be))}for(let $=0;$<K.added.length;$++){let be=K.added[$],Ie=R.indexOf(be);if(Ie===-1){for(let Ke=0;Ke<w.length;Ke++)if(Ke>=R.length){R.push(be),Ie=Ke;break}else if(R[Ke]===null){R[Ke]=be,Ie=Ke;break}if(Ie===-1)break}let de=w[Ie];de&&de.connect(be)}}let ne=new Z,le=new Z;function he(K,$,be){ne.setFromMatrixPosition($.matrixWorld),le.setFromMatrixPosition(be.matrixWorld);let Ie=ne.distanceTo(le),de=$.projectionMatrix.elements,Ke=be.projectionMatrix.elements,Rt=de[14]/(de[10]-1),it=de[14]/(de[10]+1),pt=(de[9]+1)/de[5],It=(de[9]-1)/de[5],dt=(de[8]-1)/de[0],Nt=(Ke[8]+1)/Ke[0],Jt=Rt*dt,Qt=Rt*Nt,Ot=Ie/(-dt+Nt),Xt=Ot*-dt;if($.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(Xt),K.translateZ(Ot),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),de[10]===-1)K.projectionMatrix.copy($.projectionMatrix),K.projectionMatrixInverse.copy($.projectionMatrixInverse);else{let G=Rt+Ot,Fe=it+Ot,gt=Jt-Xt,p=Qt+(Ie-Xt),f=pt*it/Fe*G,S=It*it/Fe*G;K.projectionMatrix.makePerspective(gt,p,f,S,G,Fe),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function Ge(K,$){$===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices($.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(r===null)return;let $=K.near,be=K.far;g.texture!==null&&(g.depthNear>0&&($=g.depthNear),g.depthFar>0&&(be=g.depthFar)),ee.near=W.near=k.near=$,ee.far=W.far=k.far=be,(X!==ee.near||Q!==ee.far)&&(r.updateRenderState({depthNear:ee.near,depthFar:ee.far}),X=ee.near,Q=ee.far),ee.layers.mask=K.layers.mask|6,k.layers.mask=ee.layers.mask&-5,W.layers.mask=ee.layers.mask&-3;let Ie=K.parent,de=ee.cameras;Ge(ee,Ie);for(let Ke=0;Ke<de.length;Ke++)Ge(de[Ke],Ie);de.length===2?he(ee,k,W):ee.projectionMatrix.copy(k.projectionMatrix),N===null&&K.isPerspectiveCamera&&(N={camera:K,fov:K.fov,zoom:K.zoom}),Ne(K,ee,Ie)};function Ne(K,$,be){be===null?K.matrix.copy($.matrixWorld):(K.matrix.copy(be.matrixWorld),K.matrix.invert(),K.matrix.multiply($.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy($.projectionMatrix),K.projectionMatrixInverse.copy($.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=As*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return ee},this.getFoveation=function(){if(!(d===null&&m===null))return c},this.setFoveation=function(K){c=K,d!==null&&(d.fixedFoveation=K),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=K)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(ee)},this.getCameraTexture=function(K){return _[K]};let vt=null;function ie(K,$){if(u=$.getViewerPose(l||a),x=$,u!==null){let be=u.views;m!==null&&(e.setRenderTargetFramebuffer(E,m.framebuffer),e.setRenderTarget(E));let Ie=!1;be.length!==ee.cameras.length&&(ee.cameras.length=0,Ie=!0);for(let it=0;it<be.length;it++){let pt=be[it],It=null;if(m!==null)It=m.getViewport(pt);else{let Nt=h.getViewSubImage(d,pt);It=Nt.viewport,it===0&&(e.setRenderTargetTextures(E,Nt.colorTexture,Nt.depthStencilTexture),e.setRenderTarget(E))}let dt=q[it];dt===void 0&&(dt=new _n,dt.layers.enable(it),dt.viewport=new Ut,q[it]=dt),dt.matrix.fromArray(pt.transform.matrix),dt.matrix.decompose(dt.position,dt.quaternion,dt.scale),dt.projectionMatrix.fromArray(pt.projectionMatrix),dt.projectionMatrixInverse.copy(dt.projectionMatrix).invert(),dt.viewport.set(It.x,It.y,It.width,It.height),it===0&&(ee.matrix.copy(dt.matrix),ee.matrix.decompose(ee.position,ee.quaternion,ee.scale)),Ie===!0&&ee.cameras.push(dt)}let de=r.enabledFeatures;if(de&&de.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&v){h=i.getBinding();let it=h.getDepthInformation(be[0]);it&&it.isValid&&it.texture&&g.init(it,r.renderState)}if(de&&de.includes("camera-access")&&v){e.state.unbindTexture(),h=i.getBinding();for(let it=0;it<be.length;it++){let pt=be[it].camera;if(pt){let It=_[pt];It||(It=new Wo,_[pt]=It);let dt=h.getCameraImage(pt);It.sourceTexture=dt}}}}for(let be=0;be<w.length;be++){let Ie=R[be],de=w[be];Ie!==null&&de!==void 0&&de.update(Ie,$,l||a)}vt&&vt(K,$),$.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:$}),x=null}let Te=new e0;Te.setAnimationLoop(ie),this.setAnimationLoop=function(K){vt=K},this.dispose=function(){}}},ET=new at,a0=new rt;a0.set(-1,0,0,0,1,0,0,0,1);function TT(n,e){function t(g,_){g.matrixAutoUpdate===!0&&g.updateMatrix(),_.value.copy(g.matrix)}function i(g,_){_.color.getRGB(g.fogColor.value,of(n)),_.isFog?(g.fogNear.value=_.near,g.fogFar.value=_.far):_.isFogExp2&&(g.fogDensity.value=_.density)}function r(g,_,T,I,E){_.isNodeMaterial?_.uniformsNeedUpdate=!1:_.isMeshBasicMaterial?s(g,_):_.isMeshLambertMaterial?(s(g,_),_.envMap&&(g.envMapIntensity.value=_.envMapIntensity)):_.isMeshToonMaterial?(s(g,_),h(g,_)):_.isMeshPhongMaterial?(s(g,_),u(g,_),_.envMap&&(g.envMapIntensity.value=_.envMapIntensity)):_.isMeshStandardMaterial?(s(g,_),d(g,_),_.isMeshPhysicalMaterial&&m(g,_,E)):_.isMeshMatcapMaterial?(s(g,_),x(g,_)):_.isMeshDepthMaterial?s(g,_):_.isMeshDistanceMaterial?(s(g,_),v(g,_)):_.isMeshNormalMaterial?s(g,_):_.isLineBasicMaterial?(a(g,_),_.isLineDashedMaterial&&o(g,_)):_.isPointsMaterial?c(g,_,T,I):_.isSpriteMaterial?l(g,_):_.isShadowMaterial?(g.color.value.copy(_.color),g.opacity.value=_.opacity):_.isShaderMaterial&&(_.uniformsNeedUpdate=!1)}function s(g,_){g.opacity.value=_.opacity,_.color&&g.diffuse.value.copy(_.color),_.emissive&&g.emissive.value.copy(_.emissive).multiplyScalar(_.emissiveIntensity),_.map&&(g.map.value=_.map,t(_.map,g.mapTransform)),_.alphaMap&&(g.alphaMap.value=_.alphaMap,t(_.alphaMap,g.alphaMapTransform)),_.bumpMap&&(g.bumpMap.value=_.bumpMap,t(_.bumpMap,g.bumpMapTransform),g.bumpScale.value=_.bumpScale,_.side===Dn&&(g.bumpScale.value*=-1)),_.normalMap&&(g.normalMap.value=_.normalMap,t(_.normalMap,g.normalMapTransform),g.normalScale.value.copy(_.normalScale),_.side===Dn&&g.normalScale.value.negate()),_.displacementMap&&(g.displacementMap.value=_.displacementMap,t(_.displacementMap,g.displacementMapTransform),g.displacementScale.value=_.displacementScale,g.displacementBias.value=_.displacementBias),_.emissiveMap&&(g.emissiveMap.value=_.emissiveMap,t(_.emissiveMap,g.emissiveMapTransform)),_.specularMap&&(g.specularMap.value=_.specularMap,t(_.specularMap,g.specularMapTransform)),_.alphaTest>0&&(g.alphaTest.value=_.alphaTest);let T=e.get(_),I=T.envMap,E=T.envMapRotation;I&&(g.envMap.value=I,g.envMapRotation.value.setFromMatrix4(ET.makeRotationFromEuler(E)).transpose(),I.isCubeTexture&&I.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(a0),g.reflectivity.value=_.reflectivity,g.ior.value=_.ior,g.refractionRatio.value=_.refractionRatio),_.lightMap&&(g.lightMap.value=_.lightMap,g.lightMapIntensity.value=_.lightMapIntensity,t(_.lightMap,g.lightMapTransform)),_.aoMap&&(g.aoMap.value=_.aoMap,g.aoMapIntensity.value=_.aoMapIntensity,t(_.aoMap,g.aoMapTransform))}function a(g,_){g.diffuse.value.copy(_.color),g.opacity.value=_.opacity,_.map&&(g.map.value=_.map,t(_.map,g.mapTransform))}function o(g,_){g.dashSize.value=_.dashSize,g.totalSize.value=_.dashSize+_.gapSize,g.scale.value=_.scale}function c(g,_,T,I){g.diffuse.value.copy(_.color),g.opacity.value=_.opacity,g.size.value=_.size*T,g.scale.value=I*.5,_.map&&(g.map.value=_.map,t(_.map,g.uvTransform)),_.alphaMap&&(g.alphaMap.value=_.alphaMap,t(_.alphaMap,g.alphaMapTransform)),_.alphaTest>0&&(g.alphaTest.value=_.alphaTest)}function l(g,_){g.diffuse.value.copy(_.color),g.opacity.value=_.opacity,g.rotation.value=_.rotation,_.map&&(g.map.value=_.map,t(_.map,g.mapTransform)),_.alphaMap&&(g.alphaMap.value=_.alphaMap,t(_.alphaMap,g.alphaMapTransform)),_.alphaTest>0&&(g.alphaTest.value=_.alphaTest)}function u(g,_){g.specular.value.copy(_.specular),g.shininess.value=Math.max(_.shininess,1e-4)}function h(g,_){_.gradientMap&&(g.gradientMap.value=_.gradientMap)}function d(g,_){g.metalness.value=_.metalness,_.metalnessMap&&(g.metalnessMap.value=_.metalnessMap,t(_.metalnessMap,g.metalnessMapTransform)),g.roughness.value=_.roughness,_.roughnessMap&&(g.roughnessMap.value=_.roughnessMap,t(_.roughnessMap,g.roughnessMapTransform)),_.envMap&&(g.envMapIntensity.value=_.envMapIntensity)}function m(g,_,T){g.ior.value=_.ior,_.sheen>0&&(g.sheenColor.value.copy(_.sheenColor).multiplyScalar(_.sheen),g.sheenRoughness.value=_.sheenRoughness,_.sheenColorMap&&(g.sheenColorMap.value=_.sheenColorMap,t(_.sheenColorMap,g.sheenColorMapTransform)),_.sheenRoughnessMap&&(g.sheenRoughnessMap.value=_.sheenRoughnessMap,t(_.sheenRoughnessMap,g.sheenRoughnessMapTransform))),_.clearcoat>0&&(g.clearcoat.value=_.clearcoat,g.clearcoatRoughness.value=_.clearcoatRoughness,_.clearcoatMap&&(g.clearcoatMap.value=_.clearcoatMap,t(_.clearcoatMap,g.clearcoatMapTransform)),_.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=_.clearcoatRoughnessMap,t(_.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),_.clearcoatNormalMap&&(g.clearcoatNormalMap.value=_.clearcoatNormalMap,t(_.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(_.clearcoatNormalScale),_.side===Dn&&g.clearcoatNormalScale.value.negate())),_.dispersion>0&&(g.dispersion.value=_.dispersion),_.retroreflectivity>0&&(g.retroreflectivity.value=_.retroreflectivity),_.iridescence>0&&(g.iridescence.value=_.iridescence,g.iridescenceIOR.value=_.iridescenceIOR,g.iridescenceThicknessMinimum.value=_.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=_.iridescenceThicknessRange[1],_.iridescenceMap&&(g.iridescenceMap.value=_.iridescenceMap,t(_.iridescenceMap,g.iridescenceMapTransform)),_.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=_.iridescenceThicknessMap,t(_.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),_.transmission>0&&(g.transmission.value=_.transmission,g.transmissionSamplerMap.value=T.texture,g.transmissionSamplerSize.value.set(T.width,T.height),_.transmissionMap&&(g.transmissionMap.value=_.transmissionMap,t(_.transmissionMap,g.transmissionMapTransform)),g.thickness.value=_.thickness,_.thicknessMap&&(g.thicknessMap.value=_.thicknessMap,t(_.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=_.attenuationDistance,g.attenuationColor.value.copy(_.attenuationColor)),_.anisotropy>0&&(g.anisotropyVector.value.set(_.anisotropy*Math.cos(_.anisotropyRotation),_.anisotropy*Math.sin(_.anisotropyRotation)),_.anisotropyMap&&(g.anisotropyMap.value=_.anisotropyMap,t(_.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=_.specularIntensity,g.specularColor.value.copy(_.specularColor),_.specularColorMap&&(g.specularColorMap.value=_.specularColorMap,t(_.specularColorMap,g.specularColorMapTransform)),_.specularIntensityMap&&(g.specularIntensityMap.value=_.specularIntensityMap,t(_.specularIntensityMap,g.specularIntensityMapTransform))}function x(g,_){_.matcap&&(g.matcap.value=_.matcap)}function v(g,_){let T=e.get(_).light;g.referencePosition.value.setFromMatrixPosition(T.matrixWorld),g.nearDistance.value=T.shadow.camera.near,g.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function AT(n,e,t,i){let r={},s={},a=[],o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(E,w){let R=w.program;i.uniformBlockBinding(E,R)}function l(E,w){let R=r[E.id];R===void 0&&(g(E),R=u(E),r[E.id]=R,E.addEventListener("dispose",T));let P=w.program;i.updateUBOMapping(E,P);let y=e.render.frame;s[E.id]!==y&&(d(E),s[E.id]=y)}function u(E){let w=h();E.__bindingPointIndex=w;let R=n.createBuffer(),P=E.__size,y=E.usage;return n.bindBuffer(n.UNIFORM_BUFFER,R),n.bufferData(n.UNIFORM_BUFFER,P,y),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,R),R}function h(){for(let E=0;E<o;E++)if(a.indexOf(E)===-1)return a.push(E),E;return Qe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(E){let w=r[E.id],R=E.uniforms,P=E.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let y=0,N=R.length;y<N;y++){let k=R[y];if(Array.isArray(k))for(let W=0,q=k.length;W<q;W++)m(k[W],y,W,P);else m(k,y,0,P)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function m(E,w,R,P){if(v(E,w,R,P)===!0){let y=E.__offset,N=E.value;if(Array.isArray(N)){let k=0;for(let W=0;W<N.length;W++){let q=N[W],ee=_(q);x(q,E.__data,k),typeof q!="number"&&typeof q!="boolean"&&!q.isMatrix3&&!ArrayBuffer.isView(q)&&(k+=ee.storage/Float32Array.BYTES_PER_ELEMENT)}}else x(N,E.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,y,E.__data)}}function x(E,w,R){typeof E=="number"||typeof E=="boolean"?w[0]=E:E.isMatrix3?(w[0]=E.elements[0],w[1]=E.elements[1],w[2]=E.elements[2],w[3]=0,w[4]=E.elements[3],w[5]=E.elements[4],w[6]=E.elements[5],w[7]=0,w[8]=E.elements[6],w[9]=E.elements[7],w[10]=E.elements[8],w[11]=0):ArrayBuffer.isView(E)?w.set(new E.constructor(E.buffer,E.byteOffset,w.length)):E.toArray(w,R)}function v(E,w,R,P){let y=E.value,N=w+"_"+R;if(P[N]===void 0)return typeof y=="number"||typeof y=="boolean"?P[N]=y:ArrayBuffer.isView(y)?P[N]=y.slice():P[N]=y.clone(),!0;{let k=P[N];if(typeof y=="number"||typeof y=="boolean"){if(k!==y)return P[N]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(k.equals(y)===!1)return k.copy(y),!0}}return!1}function g(E){let w=E.uniforms,R=0,P=16;for(let N=0,k=w.length;N<k;N++){let W=Array.isArray(w[N])?w[N]:[w[N]];for(let q=0,ee=W.length;q<ee;q++){let X=W[q],Q=Array.isArray(X.value)?X.value:[X.value];for(let oe=0,re=Q.length;oe<re;oe++){let me=Q[oe],ne=_(me),le=R%P,he=le%ne.boundary,Ge=le+he;R+=he,Ge!==0&&P-Ge<ne.storage&&(R+=P-Ge),X.__data=new Float32Array(ne.storage/Float32Array.BYTES_PER_ELEMENT),X.__offset=R,R+=ne.storage}}}let y=R%P;return y>0&&(R+=P-y),E.__size=R,E.__cache={},this}function _(E){let w={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(w.boundary=4,w.storage=4):E.isVector2?(w.boundary=8,w.storage=8):E.isVector3||E.isColor?(w.boundary=16,w.storage=12):E.isVector4?(w.boundary=16,w.storage=16):E.isMatrix3?(w.boundary=48,w.storage=48):E.isMatrix4?(w.boundary=64,w.storage=64):E.isTexture?Ye("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(E)?(w.boundary=16,w.storage=E.byteLength):Ye("WebGLRenderer: Unsupported uniform value type.",E),w}function T(E){let w=E.target;w.removeEventListener("dispose",T);let R=a.indexOf(w.__bindingPointIndex);a.splice(R,1),n.deleteBuffer(r[w.id]),delete r[w.id],delete s[w.id]}function I(){for(let E in r)n.deleteBuffer(r[E]);a=[],r={},s={}}return{bind:c,update:l,dispose:I}}var wT=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Zi=null;function RT(){return Zi===null&&(Zi=new Pa(wT,16,16,Zr,Pi),Zi.name="DFG_LUT",Zi.minFilter=jt,Zi.magFilter=jt,Zi.wrapS=pi,Zi.wrapT=pi,Zi.generateMipmaps=!1,Zi.needsUpdate=!0),Zi}var Zu=class{constructor(e={}){let{canvas:t=T_(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:d=!1,outputBufferType:m=qn}=e;this.isWebGLRenderer=!0;let x;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=i.getContextAttributes().alpha}else x=a;let v=m,g=new Set([uu,cu,lu]),_=new Set([qn,Ci,Ga,Ha,su,au]),T=new Uint32Array(4),I=new Int32Array(4),E=new Z,w=null,R=null,P=[],y=[],N=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ri,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let k=this,W=!1,q=null,ee=null,X=null,Q=null;this._outputColorSpace=nn;let oe=0,re=0,me=null,ne=-1,le=null,he=new Ut,Ge=new Ut,Ne=null,vt=new et(0),ie=0,Te=t.width,K=t.height,$=1,be=null,Ie=null,de=new Ut(0,0,Te,K),Ke=new Ut(0,0,Te,K),Rt=!1,it=new Na,pt=!1,It=!1,dt=new at,Nt=new Z,Jt=new Ut,Qt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ot=!1;function Xt(){return me===null?$:1}let G=i;function Fe(M,B){return t.getContext(M,B)}let gt,p,f,S,A,C,L,H,D,F,ae,ge,ue,fe,Ce,Ue,tt,V,Me,ce,Se,Ae,pe;try{let M={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",Ft,!1),t.addEventListener("webglcontextrestored",At,!1),t.addEventListener("webglcontextcreationerror",Yn,!1),G===null){let B="webgl2";if(G=Fe(B,M),G===null)throw Fe(B)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Xe()}catch(M){throw t.removeEventListener("webglcontextlost",Ft,!1),t.removeEventListener("webglcontextrestored",At,!1),t.removeEventListener("webglcontextcreationerror",Yn,!1),Qe("WebGLRenderer: "+M.message),M}function Xe(){gt=new UM(G),gt.init(),Se=new ST(G,gt),p=new TM(G,gt,e,Se),f=new vT(G,gt),p.reversedDepthBuffer&&d&&f.buffers.depth.setReversed(!0),ee=G.createFramebuffer(),X=G.createFramebuffer(),Q=G.createFramebuffer(),S=new BM(G),A=new sT,C=new yT(G,gt,f,A,p,Se,S),L=new DM(k),H=new zy(G),Ae=new MM(G,H),D=new OM(G,H,S,Ae),F=new zM(G,D,H,Ae,S),V=new kM(G,p,C),Ce=new AM(A),ae=new rT(k,L,gt,p,Ae,Ce),ge=new TT(k,A),ue=new oT,fe=new fT(gt),tt=new bM(k,L,f,F,x,c),Ue=new xT(k,F,p),pe=new AT(G,S,p,f),Me=new EM(G,gt,S),ce=new FM(G,gt,S),S.programs=ae.programs,k.capabilities=p,k.extensions=gt,k.properties=A,k.renderLists=ue,k.shadowMap=Ue,k.state=f,k.info=S}v!==qn&&(N=new GM(v,t.width,t.height,o,r,s));let Be=new Tf(k,G);this.xr=Be,this.getContext=function(){return G},this.getContextAttributes=function(){return G.getContextAttributes()},this.forceContextLoss=function(){let M=gt.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){let M=gt.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(M){M!==void 0&&($=M,this.setSize(Te,K,!1))},this.getSize=function(M){return M.set(Te,K)},this.setSize=function(M,B,te=!0){if(Be.isPresenting){Ye("WebGLRenderer: Can't change size while VR device is presenting.");return}Te=M,K=B,t.width=Math.floor(M*$),t.height=Math.floor(B*$),te===!0&&(t.style.width=M+"px",t.style.height=B+"px"),N!==null&&N.setSize(t.width,t.height),this.setViewport(0,0,M,B)},this.getDrawingBufferSize=function(M){return M.set(Te*$,K*$).floor()},this.setDrawingBufferSize=function(M,B,te){Te=M,K=B,$=te,t.width=Math.floor(M*te),t.height=Math.floor(B*te),this.setViewport(0,0,M,B)},this.setEffects=function(M){if(v===qn){Qe("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let B=0;B<M.length;B++)if(M[B].isOutputPass===!0){Ye("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}N.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(he)},this.getViewport=function(M){return M.copy(de)},this.setViewport=function(M,B,te,J){M.isVector4?de.set(M.x,M.y,M.z,M.w):de.set(M,B,te,J),f.viewport(he.copy(de).multiplyScalar($).round())},this.getScissor=function(M){return M.copy(Ke)},this.setScissor=function(M,B,te,J){M.isVector4?Ke.set(M.x,M.y,M.z,M.w):Ke.set(M,B,te,J),f.scissor(Ge.copy(Ke).multiplyScalar($).round())},this.getScissorTest=function(){return Rt},this.setScissorTest=function(M){f.setScissorTest(Rt=M)},this.setOpaqueSort=function(M){be=M},this.setTransparentSort=function(M){Ie=M},this.getClearColor=function(M){return M.copy(tt.getClearColor())},this.setClearColor=function(){tt.setClearColor(...arguments)},this.getClearAlpha=function(){return tt.getClearAlpha()},this.setClearAlpha=function(){tt.setClearAlpha(...arguments)},this.clear=function(M=!0,B=!0,te=!0){let J=0;if(M){let j=!1;if(me!==null){let we=me.texture.format;j=g.has(we)}if(j){let we=me.texture.type,Oe=_.has(we),Ee=tt.getClearColor(),ze=tt.getClearAlpha(),We=Ee.r,ot=Ee.g,lt=Ee.b;Oe?(T[0]=We,T[1]=ot,T[2]=lt,T[3]=ze,G.clearBufferuiv(G.COLOR,0,T)):(I[0]=We,I[1]=ot,I[2]=lt,I[3]=ze,G.clearBufferiv(G.COLOR,0,I))}else J|=G.COLOR_BUFFER_BIT}B&&(J|=G.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),te&&(J|=G.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),J!==0&&G.clear(J)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),q=M},this.dispose=function(){t.removeEventListener("webglcontextlost",Ft,!1),t.removeEventListener("webglcontextrestored",At,!1),t.removeEventListener("webglcontextcreationerror",Yn,!1),tt.dispose(),ue.dispose(),fe.dispose(),A.dispose(),L.dispose(),F.dispose(),Ae.dispose(),pe.dispose(),ae.dispose(),Be.dispose(),Be.removeEventListener("sessionstart",xl),Be.removeEventListener("sessionend",vl),Qi.stop()};function Ft(M){M.preventDefault(),No("WebGLRenderer: Context Lost."),W=!0}function At(){No("WebGLRenderer: Context Restored."),W=!1;let M=S.autoReset,B=Ue.enabled,te=Ue.autoUpdate,J=Ue.needsUpdate,j=Ue.type;Xe(),S.autoReset=M,Ue.enabled=B,Ue.autoUpdate=te,Ue.needsUpdate=J,Ue.type=j}function Yn(M){Qe("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function si(M){let B=M.target;B.removeEventListener("dispose",si),th(B)}function th(M){ks(M),A.remove(M)}function ks(M){let B=A.get(M).programs;B!==void 0&&(B.forEach(function(te){ae.releaseProgram(te)}),M.isShaderMaterial&&ae.releaseShaderCache(M))}this.renderBufferDirect=function(M,B,te,J,j,we){B===null&&(B=Qt);let Oe=j.isMesh&&j.matrixWorld.determinantAffine()<0,Ee=nh(M,B,te,J,j);f.setMaterial(J,Oe);let ze=te.index,We=1;if(J.wireframe===!0){if(ze=D.getWireframeAttribute(te),ze===void 0)return;We=2}let ot=te.drawRange,lt=te.attributes.position,Ve=ot.start*We,wt=(ot.start+ot.count)*We;we!==null&&(Ve=Math.max(Ve,we.start*We),wt=Math.min(wt,(we.start+we.count)*We)),ze!==null?(Ve=Math.max(Ve,0),wt=Math.min(wt,ze.count)):lt!=null&&(Ve=Math.max(Ve,0),wt=Math.min(wt,lt.count));let en=wt-Ve;if(en<0||en===1/0)return;Ae.setup(j,J,Ee,te,ze);let Bt,Lt=Me;if(ze!==null&&(Bt=H.get(ze),Lt=ce,Lt.setIndex(Bt)),j.isMesh)J.wireframe===!0?(f.setLineWidth(J.wireframeLinewidth*Xt()),Lt.setMode(G.LINES)):Lt.setMode(G.TRIANGLES);else if(j.isLine){let pn=J.linewidth;pn===void 0&&(pn=1),f.setLineWidth(pn*Xt()),j.isLineSegments?Lt.setMode(G.LINES):j.isLineLoop?Lt.setMode(G.LINE_LOOP):Lt.setMode(G.LINE_STRIP)}else j.isPoints?Lt.setMode(G.POINTS):j.isSprite&&Lt.setMode(G.TRIANGLES);if(j.isBatchedMesh)if(gt.get("WEBGL_multi_draw"))Lt.renderMultiDraw(j._multiDrawStarts,j._multiDrawCounts,j._multiDrawCount);else{let pn=j._multiDrawStarts,Le=j._multiDrawCounts,yn=j._multiDrawCount,Et=ze?H.get(ze).bytesPerElement:1,On=A.get(J).currentProgram.getUniforms();for(let oi=0;oi<yn;oi++)On.setValue(G,"_gl_DrawID",oi),Lt.render(pn[oi]/Et,Le[oi])}else if(j.isInstancedMesh)Lt.renderInstances(Ve,en,j.count);else if(te.isInstancedBufferGeometry){let pn=te._maxInstanceCount!==void 0?te._maxInstanceCount:1/0,Le=Math.min(te.instanceCount,pn);Lt.renderInstances(Ve,en,Le)}else Lt.render(Ve,en)};function zs(M,B,te,J){q!==null&&M.isNodeMaterial&&q.setObject(J,M),pt===!0&&Ce.setState(M,te,!1),M.transparent===!0&&M.side===Un&&M.forceSinglePass===!1?(M.side=Dn,M.needsUpdate=!0,Hs(M,B,J),M.side=qi,M.needsUpdate=!0,Hs(M,B,J),M.side=Un):Hs(M,B,J)}this.compile=function(M,B,te=null){te===null&&(te=M),q!==null&&q.renderStart(M,B,te),R=fe.get(te),R.init(B),y.push(R),te.traverseVisible(function(j){j.isLight&&j.layers.test(B.layers)&&(R.pushLight(j),j.castShadow&&R.pushShadow(j))}),M!==te&&M.traverseVisible(function(j){j.isLight&&j.layers.test(B.layers)&&(R.pushLight(j),j.castShadow&&R.pushShadow(j))}),R.setupLights(),q!==null&&q.updateLights(R.state.lightsArray),It=this.localClippingEnabled,pt=Ce.init(this.clippingPlanes,It),pt===!0&&Ce.setGlobalState(this.clippingPlanes,B),q!==null&&Ue.render(R.state.shadowsArray,te,B);let J=new Set;return M.traverse(function(j){if(!(j.isMesh||j.isPoints||j.isLine||j.isSprite))return;let we=j.material;if(we)if(Array.isArray(we))for(let Oe=0;Oe<we.length;Oe++){let Ee=we[Oe];zs(Ee,te,B,j),J.add(Ee)}else zs(we,te,B,j),J.add(we)}),R=y.pop(),q!==null&&q.renderEnd(),J},this.compileAsync=function(M,B,te=null){let J=this.compile(M,B,te);return new Promise(j=>{function we(){if(J.forEach(function(Oe){let ze=A.get(Oe).currentProgram;(ze===void 0||ze.isReady())&&J.delete(Oe)}),J.size===0){j(M);return}setTimeout(we,10)}gt.get("KHR_parallel_shader_compile")!==null?we():setTimeout(we,10)})};let Vs=null;function Ji(M){Vs&&Vs(M)}function xl(){Qi.stop()}function vl(){Qi.start()}let Qi=new e0;Qi.setAnimationLoop(Ji),typeof self<"u"&&Qi.setContext(self),this.setAnimationLoop=function(M){Vs=M,Be.setAnimationLoop(M),M===null?Qi.stop():Qi.start()},Be.addEventListener("sessionstart",xl),Be.addEventListener("sessionend",vl),this.render=function(M,B){if(B!==void 0&&B.isCamera!==!0){Qe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(W===!0)return;q!==null&&q.renderStart(M,B);let te=Be.enabled===!0&&Be.isPresenting===!0,J=N!==null&&(me===null||te)&&N.begin(k,me);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),Be.enabled===!0&&Be.isPresenting===!0&&(N===null||N.isCompositing()===!1)&&(Be.cameraAutoUpdate===!0&&Be.updateCamera(B),B=Be.getCamera()),M.isScene===!0&&M.onBeforeRender(k,M,B,me),R=fe.get(M,y.length),R.init(B),R.state.textureUnits=C.getTextureUnits(),y.push(R),dt.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),it.setFromProjectionMatrix(dt,Ti,B.reversedDepth),It=this.localClippingEnabled,pt=Ce.init(this.clippingPlanes,It),w=ue.get(M,P.length),w.init(),P.push(w),Be.enabled===!0&&Be.isPresenting===!0){let Oe=k.xr.getDepthSensingMesh();Oe!==null&&Ja(Oe,B,-1/0,k.sortObjects)}Ja(M,B,0,k.sortObjects),w.finish(),q!==null&&q.updateLights(R.state.lightsArray),k.sortObjects===!0&&w.sort(be,Ie),Ot=Be.enabled===!1||Be.isPresenting===!1||Be.hasDepthSensing()===!1,Ot&&tt.addToRenderList(w,M),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),pt===!0&&Ce.beginShadows();let j=R.state.shadowsArray;if(Ue.render(j,M,B),pt===!0&&Ce.endShadows(),(J&&N.hasRenderPass())===!1){let Oe=w.opaque,Ee=w.transmissive;if(R.setupLights(),B.isArrayCamera){let ze=B.cameras;if(Ee.length>0)for(let We=0,ot=ze.length;We<ot;We++){let lt=ze[We];ai(Oe,Ee,M,lt)}Ot&&tt.render(M);for(let We=0,ot=ze.length;We<ot;We++){let lt=ze[We];yl(w,M,lt,lt.viewport)}}else Ee.length>0&&ai(Oe,Ee,M,B),Ot&&tt.render(M),yl(w,M,B)}me!==null&&re===0&&(C.updateMultisampleRenderTarget(me),C.updateRenderTargetMipmap(me)),J&&N.end(k),M.isScene===!0&&M.onAfterRender(k,M,B),Ae.resetDefaultState(),ne=-1,le=null,y.pop(),y.length>0?(R=y[y.length-1],C.setTextureUnits(R.state.textureUnits),pt===!0&&Ce.setGlobalState(k.clippingPlanes,R.state.camera)):R=null,P.pop(),P.length>0?w=P[P.length-1]:w=null,q!==null&&q.renderEnd()};function Ja(M,B,te,J){if(M.visible===!1)return;if(M.layers.test(B.layers)){if(M.isGroup)te=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(B);else if(M.isLightProbeGrid)R.pushLightProbeGrid(M);else if(M.isLight)R.pushLight(M),M.castShadow&&R.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||M.intersectsFrustum(it)){J&&Jt.setFromMatrixPosition(M.matrixWorld).applyMatrix4(dt);let Oe=F.update(M),Ee=M.material;Ee.visible&&w.push(M,Oe,Ee,te,Jt.z,null,B)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||M.intersectsFrustum(it))){let Oe=F.update(M),Ee=M.material;if(J&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Jt.copy(M.boundingSphere.center)):(Oe.boundingSphere===null&&Oe.computeBoundingSphere(),Jt.copy(Oe.boundingSphere.center)),Jt.applyMatrix4(M.matrixWorld).applyMatrix4(dt)),Array.isArray(Ee)){let ze=Oe.groups;for(let We=0,ot=ze.length;We<ot;We++){let lt=ze[We],Ve=Ee[lt.materialIndex];Ve&&Ve.visible&&w.push(M,Oe,Ve,te,Jt.z,lt,B)}}else Ee.visible&&w.push(M,Oe,Ee,te,Jt.z,null,B)}}let we=M.children;for(let Oe=0,Ee=we.length;Oe<Ee;Oe++)Ja(we[Oe],B,te,J)}function yl(M,B,te,J){let{opaque:j,transmissive:we,transparent:Oe}=M;R.setupLightsView(te),pt===!0&&Ce.setGlobalState(k.clippingPlanes,te),J&&f.viewport(he.copy(J)),j.length>0&&Gs(j,B,te),we.length>0&&Gs(we,B,te),Oe.length>0&&Gs(Oe,B,te),f.buffers.depth.setTest(!0),f.buffers.depth.setMask(!0),f.buffers.color.setMask(!0),f.setPolygonOffset(!1)}function ai(M,B,te,J){if((te.isScene===!0?te.overrideMaterial:null)!==null)return;if(R.state.transmissionRenderTarget[J.id]===void 0){let Ve=gt.has("EXT_color_buffer_half_float")||gt.has("EXT_color_buffer_float");R.state.transmissionRenderTarget[J.id]=new zn(1,1,{generateMipmaps:!0,type:Ve?Pi:qn,minFilter:Ii,samples:Math.max(4,p.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:xt.workingColorSpace})}let we=R.state.transmissionRenderTarget[J.id],Oe=J.viewport||he;we.setSize(Oe.z*k.transmissionResolutionScale,Oe.w*k.transmissionResolutionScale);let Ee=k.getRenderTarget(),ze=k.getActiveCubeFace(),We=k.getActiveMipmapLevel();k.setRenderTarget(we),k.getClearColor(vt),ie=k.getClearAlpha(),ie<1&&k.setClearColor(16777215,.5),k.clear(),Ot&&tt.render(te);let ot=k.toneMapping;k.toneMapping=Ri;let lt=J.viewport;if(J.viewport!==void 0&&(J.viewport=void 0),R.setupLightsView(J),pt===!0&&Ce.setGlobalState(k.clippingPlanes,J),Gs(M,te,J),C.updateMultisampleRenderTarget(we),C.updateRenderTargetMipmap(we),gt.has("WEBGL_multisampled_render_to_texture")===!1){let Ve=!1;for(let wt=0,en=B.length;wt<en;wt++){let Bt=B[wt],{object:Lt,geometry:pn,material:Le,group:yn}=Bt;if(Le.side===Un&&Lt.layers.test(J.layers)){let Et=Le.side;Le.side=Dn,Le.needsUpdate=!0,Sl(Lt,te,J,pn,Le,yn),Le.side=Et,Le.needsUpdate=!0,Ve=!0}}Ve===!0&&(C.updateMultisampleRenderTarget(we),C.updateRenderTargetMipmap(we))}k.setRenderTarget(Ee,ze,We),k.setClearColor(vt,ie),lt!==void 0&&(J.viewport=lt),k.toneMapping=ot}function Gs(M,B,te){let J=B.isScene===!0?B.overrideMaterial:null;for(let j=0,we=M.length;j<we;j++){let Oe=M[j],{object:Ee,geometry:ze,group:We}=Oe,ot=Oe.material;ot.allowOverride===!0&&J!==null&&(ot=J),Ee.layers.test(te.layers)&&Sl(Ee,B,te,ze,ot,We)}}function Sl(M,B,te,J,j,we){q!==null&&j.isNodeMaterial&&q.setObject(M,j),M.onBeforeRender(k,B,te,J,j,we),M.modelViewMatrix.multiplyMatrices(te.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),j.onBeforeRender(k,B,te,J,M,we),j.transparent===!0&&j.side===Un&&j.forceSinglePass===!1?(j.side=Dn,j.needsUpdate=!0,k.renderBufferDirect(te,B,J,j,M,we),j.side=qi,j.needsUpdate=!0,k.renderBufferDirect(te,B,J,j,M,we),j.side=Un):k.renderBufferDirect(te,B,J,j,M,we),M.onAfterRender(k,B,te,J,j,we)}function Hs(M,B,te){B.isScene!==!0&&(B=Qt);let J=A.get(M),j=R.state.lights,we=R.state.shadowsArray,Oe=j.state.version,Ee=ae.getParameters(M,j.state,we,B,te,R.state.lightProbeGridArray),ze=ae.getProgramCacheKey(Ee),We=J.programs;J.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?B.environment:null,J.fog=B.fog;let ot=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;J.envMap=L.get(M.envMap||J.environment,ot),J.envMapRotation=J.environment!==null&&M.envMap===null?B.environmentRotation:M.envMapRotation,We===void 0&&(M.addEventListener("dispose",si),We=new Map,J.programs=We);let lt=We.get(ze);if(lt!==void 0){if(J.currentProgram===lt&&J.lightsStateVersion===Oe)return Ml(M,Ee),lt}else Ee.uniforms=ae.getUniforms(M),q!==null&&M.isNodeMaterial&&q.build(M,te,Ee),M.onBeforeCompile(Ee,k),lt=ae.acquireProgram(Ee,ze),We.set(ze,lt),J.uniforms=Ee.uniforms;let Ve=J.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Ve.clippingPlanes=Ce.uniform),Ml(M,Ee),J.needsLights=rh(M),J.lightsStateVersion=Oe,J.needsLights&&(Ve.ambientLightColor.value=j.state.ambient,Ve.lightProbe.value=j.state.probe,Ve.sunLights.value=j.state.sun,Ve.sunLightShadows.value=j.state.sunShadow,Ve.directionalLights.value=j.state.directional,Ve.directionalLightShadows.value=j.state.directionalShadow,Ve.spotLights.value=j.state.spot,Ve.spotLightShadows.value=j.state.spotShadow,Ve.rectAreaLights.value=j.state.rectArea,Ve.ltc_1.value=j.state.rectAreaLTC1,Ve.ltc_2.value=j.state.rectAreaLTC2,Ve.pointLights.value=j.state.point,Ve.pointLightShadows.value=j.state.pointShadow,Ve.hemisphereLights.value=j.state.hemi,Ve.sunShadowMatrix.value=j.state.sunShadowMatrix,Ve.sunShadowCascade.value=j.state.sunShadowCascade,Ve.directionalShadowMatrix.value=j.state.directionalShadowMatrix,Ve.spotLightMatrix.value=j.state.spotLightMatrix,Ve.spotLightMap.value=j.state.spotLightMap,Ve.pointShadowMatrix.value=j.state.pointShadowMatrix),J.lightProbeGrid=R.state.lightProbeGridArray.length>0,J.currentProgram=lt,J.uniformsList=null,lt}function bl(M){if(M.uniformsList===null){let B=M.currentProgram.getUniforms();M.uniformsList=Za.seqWithValue(B.seq,M.uniforms)}return M.uniformsList}function Ml(M,B){let te=A.get(M);te.outputColorSpace=B.outputColorSpace,te.batching=B.batching,te.batchingColor=B.batchingColor,te.instancing=B.instancing,te.instancingColor=B.instancingColor,te.instancingMorph=B.instancingMorph,te.skinning=B.skinning,te.morphTargets=B.morphTargets,te.morphNormals=B.morphNormals,te.morphColors=B.morphColors,te.morphTargetsCount=B.morphTargetsCount,te.numClippingPlanes=B.numClippingPlanes,te.numIntersection=B.numClipIntersection,te.vertexAlphas=B.vertexAlphas,te.vertexTangents=B.vertexTangents,te.toneMapping=B.toneMapping}function gi(M,B){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;E.setFromMatrixPosition(B.matrixWorld);for(let te=0,J=M.length;te<J;te++){let j=M[te];if(j.texture!==null&&j.boundingBox.containsPoint(E))return j}return null}function nh(M,B,te,J,j){B.isScene!==!0&&(B=Qt),C.resetTextureUnits();let we=B.fog,Oe=J.isMeshStandardMaterial||J.isMeshLambertMaterial||J.isMeshPhongMaterial?B.environment:null,Ee=me===null?k.outputColorSpace:me.isXRRenderTarget===!0?me.texture.colorSpace:xt.workingColorSpace,ze=J.isMeshStandardMaterial||J.isMeshLambertMaterial&&!J.envMap||J.isMeshPhongMaterial&&!J.envMap,We=L.get(J.envMap||Oe,ze),ot=J.vertexColors===!0&&!!te.attributes.color&&te.attributes.color.itemSize===4,lt=!!te.attributes.tangent&&(!!J.normalMap||J.anisotropy>0),Ve=!!te.morphAttributes.position,wt=!!te.morphAttributes.normal,en=!!te.morphAttributes.color,Bt=Ri;J.toneMapped&&(me===null||me.isXRRenderTarget===!0)&&(Bt=k.toneMapping);let Lt=te.morphAttributes.position||te.morphAttributes.normal||te.morphAttributes.color,pn=Lt!==void 0?Lt.length:0,Le=A.get(J),yn=R.state.lights;if(pt===!0&&(It===!0||M!==le)){let kt=M===le&&J.id===ne;Ce.setState(J,M,kt)}let Et=!1;J.version===Le.__version?(Le.needsLights&&Le.lightsStateVersion!==yn.state.version||Le.outputColorSpace!==Ee||j.isBatchedMesh&&Le.batching===!1||!j.isBatchedMesh&&Le.batching===!0||j.isBatchedMesh&&Le.batchingColor===!0&&j._colorsTexture===null||j.isBatchedMesh&&Le.batchingColor===!1&&j._colorsTexture!==null||j.isInstancedMesh&&Le.instancing===!1||!j.isInstancedMesh&&Le.instancing===!0||j.isSkinnedMesh&&Le.skinning===!1||!j.isSkinnedMesh&&Le.skinning===!0||j.isInstancedMesh&&Le.instancingColor===!0&&j.instanceColor===null||j.isInstancedMesh&&Le.instancingColor===!1&&j.instanceColor!==null||j.isInstancedMesh&&Le.instancingMorph===!0&&j.morphTexture===null||j.isInstancedMesh&&Le.instancingMorph===!1&&j.morphTexture!==null||Le.envMap!==We||J.fog===!0&&Le.fog!==we||Le.numClippingPlanes!==void 0&&(Le.numClippingPlanes!==Ce.numPlanes||Le.numIntersection!==Ce.numIntersection)||Le.vertexAlphas!==ot||Le.vertexTangents!==lt||Le.morphTargets!==Ve||Le.morphNormals!==wt||Le.morphColors!==en||Le.toneMapping!==Bt||Le.morphTargetsCount!==pn||!!Le.lightProbeGrid!=R.state.lightProbeGridArray.length>0)&&(Et=!0):(Et=!0,Le.__version=J.version);let On=Le.currentProgram;Et===!0&&(On=Hs(J,B,j),q&&J.isNodeMaterial&&q.onUpdateProgram(J,On,Le));let oi=!1,Ni=!1,Mr=!1,Ct=On.getUniforms(),Kt=Le.uniforms;if(f.useProgram(On.program)&&(oi=!0,Ni=!0,Mr=!0),J.id!==ne&&(ne=J.id,Ni=!0),Le.needsLights){let kt=gi(R.state.lightProbeGridArray,j);Le.lightProbeGrid!==kt&&(Le.lightProbeGrid=kt,Ni=!0)}if(oi||le!==M){f.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),Ct.setValue(G,"projectionMatrix",M.projectionMatrix),Ct.setValue(G,"viewMatrix",M.matrixWorldInverse);let _i=Ct.map.cameraPosition;_i!==void 0&&_i.setValue(G,Nt.setFromMatrixPosition(M.matrixWorld)),p.logarithmicDepthBuffer&&Ct.setValue(G,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(J.isMeshPhongMaterial||J.isMeshToonMaterial||J.isMeshLambertMaterial||J.isMeshBasicMaterial||J.isMeshStandardMaterial||J.isShaderMaterial)&&Ct.setValue(G,"isOrthographic",M.isOrthographicCamera===!0),le!==M&&(le=M,Ni=!0,Mr=!0)}if(Le.needsLights&&(yn.state.sunShadowMap.length>0&&Ct.setValue(G,"sunShadowMap",yn.state.sunShadowMap,C),yn.state.directionalShadowMap.length>0&&Ct.setValue(G,"directionalShadowMap",yn.state.directionalShadowMap,C),yn.state.spotShadowMap.length>0&&Ct.setValue(G,"spotShadowMap",yn.state.spotShadowMap,C),yn.state.pointShadowMap.length>0&&Ct.setValue(G,"pointShadowMap",yn.state.pointShadowMap,C)),j.isSkinnedMesh){Ct.setOptional(G,j,"bindMatrix"),Ct.setOptional(G,j,"bindMatrixInverse");let kt=j.skeleton;kt&&(kt.boneTexture===null&&kt.computeBoneTexture(),Ct.setValue(G,"boneTexture",kt.boneTexture,C))}j.isBatchedMesh&&(Ct.setOptional(G,j,"batchingTexture"),Ct.setValue(G,"batchingTexture",j._matricesTexture,C),Ct.setOptional(G,j,"batchingIdTexture"),Ct.setValue(G,"batchingIdTexture",j._indirectTexture,C),Ct.setOptional(G,j,"batchingColorTexture"),j._colorsTexture!==null&&Ct.setValue(G,"batchingColorTexture",j._colorsTexture,C));let Li=te.morphAttributes;if((Li.position!==void 0||Li.normal!==void 0||Li.color!==void 0)&&V.update(j,te,On),(Ni||Le.receiveShadow!==j.receiveShadow)&&(Le.receiveShadow=j.receiveShadow,Ct.setValue(G,"receiveShadow",j.receiveShadow)),(J.isMeshStandardMaterial||J.isMeshLambertMaterial||J.isMeshPhongMaterial)&&J.envMap===null&&B.environment!==null&&(Kt.envMapIntensity.value=B.environmentIntensity),Kt.dfgLUT!==void 0&&(Kt.dfgLUT.value=RT()),Ni){if(Ct.setValue(G,"toneMappingExposure",k.toneMappingExposure),Le.needsLights&&ih(Kt,Mr),we&&J.fog===!0&&ge.refreshFogUniforms(Kt,we),ge.refreshMaterialUniforms(Kt,J,$,K,R.state.transmissionRenderTarget[M.id]),Le.needsLights&&Le.lightProbeGrid){let kt=Le.lightProbeGrid;Kt.probesSH.value=kt.texture,Kt.probesMin.value.copy(kt.boundingBox.min),Kt.probesMax.value.copy(kt.boundingBox.max),Kt.probesResolution.value.copy(kt.resolution)}Za.upload(G,bl(Le),Kt,C)}if(J.isShaderMaterial&&J.uniformsNeedUpdate===!0&&(Za.upload(G,bl(Le),Kt,C),J.uniformsNeedUpdate=!1),J.isSpriteMaterial&&Ct.setValue(G,"center",j.center),Ct.setValue(G,"modelViewMatrix",j.modelViewMatrix),Ct.setValue(G,"normalMatrix",j.normalMatrix),Ct.setValue(G,"modelMatrix",j.matrixWorld),J.uniformsGroups!==void 0){let kt=J.uniformsGroups;for(let _i=0,Er=kt.length;_i<Er;_i++){let Qa=kt[_i];pe.update(Qa,On),pe.bind(Qa,On)}}return On}function ih(M,B){M.ambientLightColor.needsUpdate=B,M.lightProbe.needsUpdate=B,M.sunLights.needsUpdate=B,M.sunLightShadows.needsUpdate=B,M.directionalLights.needsUpdate=B,M.directionalLightShadows.needsUpdate=B,M.pointLights.needsUpdate=B,M.pointLightShadows.needsUpdate=B,M.spotLights.needsUpdate=B,M.spotLightShadows.needsUpdate=B,M.rectAreaLights.needsUpdate=B,M.hemisphereLights.needsUpdate=B}function rh(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return oe},this.getActiveMipmapLevel=function(){return re},this.getRenderTarget=function(){return me},this.setRenderTargetTextures=function(M,B,te){let J=A.get(M);J.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,J.__autoAllocateDepthBuffer===!1&&(J.__useRenderToTexture=!1),A.get(M.texture).__webglTexture=B,A.get(M.depthTexture).__webglTexture=J.__autoAllocateDepthBuffer?void 0:te,J.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,B){let te=A.get(M);te.__webglFramebuffer=B,te.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(M,B=0,te=0){me=M,oe=B,re=te;let J=null,j=!1,we=!1;if(M){let Ee=A.get(M);if(Ee.__useDefaultFramebuffer!==void 0){f.bindFramebuffer(G.FRAMEBUFFER,Ee.__webglFramebuffer),he.copy(M.viewport),Ge.copy(M.scissor),Ne=M.scissorTest,f.viewport(he),f.scissor(Ge),f.setScissorTest(Ne),ne=-1;return}else if(Ee.__webglFramebuffer===void 0)C.setupRenderTarget(M);else if(Ee.__hasExternalTextures)C.rebindTextures(M,A.get(M.texture).__webglTexture,A.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){let ot=M.depthTexture;if(Ee.__boundDepthTexture!==ot){if(ot!==null&&A.has(ot)&&(M.width!==ot.image.width||M.height!==ot.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");C.setupDepthRenderbuffer(M)}}let ze=M.texture;(ze.isData3DTexture||ze.isDataArrayTexture||ze.isCompressedArrayTexture)&&(we=!0);let We=A.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(We[B])?J=We[B][te]:J=We[B],j=!0):M.samples>0&&C.useMultisampledRTT(M)===!1?J=A.get(M).__webglMultisampledFramebuffer:Array.isArray(We)?J=We[te]:J=We,he.copy(M.viewport),Ge.copy(M.scissor),Ne=M.scissorTest}else he.copy(de).multiplyScalar($).floor(),Ge.copy(Ke).multiplyScalar($).floor(),Ne=Rt;if(te!==0&&(J=ee),f.bindFramebuffer(G.FRAMEBUFFER,J)&&f.drawBuffers(M,J),f.viewport(he),f.scissor(Ge),f.setScissorTest(Ne),j){let Ee=A.get(M.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_CUBE_MAP_POSITIVE_X+B,Ee.__webglTexture,te)}else if(we){let Ee=B;for(let ze=0;ze<M.textures.length;ze++){let We=A.get(M.textures[ze]);G.framebufferTextureLayer(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0+ze,We.__webglTexture,te,Ee)}}else if(M!==null&&te!==0){let Ee=A.get(M.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,Ee.__webglTexture,te)}ne=-1};function El(M){let B=A.get(M);return(B.__readFormat!==M.format||B.__readType!==M.type)&&(B.__readFormat=M.format,B.__readType=M.type,B.__formatReadable=p.textureFormatReadable(M.format),B.__typeReadable=p.textureTypeReadable(M.type)),B}this.readRenderTargetPixels=function(M,B,te,J,j,we,Oe,Ee=0){if(!(M&&M.isWebGLRenderTarget)){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ze=A.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Oe!==void 0&&(ze=ze[Oe]),ze){f.bindFramebuffer(G.FRAMEBUFFER,ze);try{let We=M.textures[Ee],ot=We.format,lt=We.type;M.textures.length>1&&G.readBuffer(G.COLOR_ATTACHMENT0+Ee);let Ve=El(We);if(Ve.__formatReadable===!1){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ve.__typeReadable===!1){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=M.width-J&&te>=0&&te<=M.height-j&&G.readPixels(B,te,J,j,Se.convert(ot),Se.convert(lt),we)}finally{let We=me!==null?A.get(me).__webglFramebuffer:null;f.bindFramebuffer(G.FRAMEBUFFER,We)}}},this.readRenderTargetPixelsAsync=async function(M,B,te,J,j,we,Oe,Ee=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ze=A.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Oe!==void 0&&(ze=ze[Oe]),ze)if(B>=0&&B<=M.width-J&&te>=0&&te<=M.height-j){f.bindFramebuffer(G.FRAMEBUFFER,ze);let We=M.textures[Ee],ot=We.format,lt=We.type;M.textures.length>1&&G.readBuffer(G.COLOR_ATTACHMENT0+Ee);let Ve=El(We);if(Ve.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ve.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let wt=G.createBuffer();G.bindBuffer(G.PIXEL_PACK_BUFFER,wt),G.bufferData(G.PIXEL_PACK_BUFFER,we.byteLength,G.STREAM_READ),G.readPixels(B,te,J,j,Se.convert(ot),Se.convert(lt),0),G.bindBuffer(G.PIXEL_PACK_BUFFER,null);let en=me!==null?A.get(me).__webglFramebuffer:null;f.bindFramebuffer(G.FRAMEBUFFER,en);let Bt=G.fenceSync(G.SYNC_GPU_COMMANDS_COMPLETE,0);return G.flush(),await w_(G,Bt,4),G.bindBuffer(G.PIXEL_PACK_BUFFER,wt),G.getBufferSubData(G.PIXEL_PACK_BUFFER,0,we),G.bindBuffer(G.PIXEL_PACK_BUFFER,null),G.deleteBuffer(wt),G.deleteSync(Bt),we}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,B=null,te=0){let J=Math.pow(2,-te),j=Math.floor(M.image.width*J),we=Math.floor(M.image.height*J),Oe=B!==null?B.x:0,Ee=B!==null?B.y:0;C.setTexture2D(M,0),G.copyTexSubImage2D(G.TEXTURE_2D,te,0,0,Oe,Ee,j,we),f.unbindTexture()},this.copyTextureToTexture=function(M,B,te=null,J=null,j=0,we=0){let Oe,Ee,ze,We,ot,lt,Ve,wt,en,Bt=M.isCompressedTexture?M.mipmaps[we]:M.image;if(te!==null)Oe=te.max.x-te.min.x,Ee=te.max.y-te.min.y,ze=te.isBox3?te.max.z-te.min.z:1,We=te.min.x,ot=te.min.y,lt=te.isBox3?te.min.z:0;else{let Kt=Math.pow(2,-j);Oe=Math.floor(Bt.width*Kt),Ee=Math.floor(Bt.height*Kt),M.isDataArrayTexture?ze=Bt.depth:M.isData3DTexture?ze=Math.floor(Bt.depth*Kt):ze=1,We=0,ot=0,lt=0}J!==null?(Ve=J.x,wt=J.y,en=J.z):(Ve=0,wt=0,en=0);let Lt=Se.convert(B.format),pn=Se.convert(B.type),Le;B.isData3DTexture?(C.setTexture3D(B,0),Le=G.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(C.setTexture2DArray(B,0),Le=G.TEXTURE_2D_ARRAY):(C.setTexture2D(B,0),Le=G.TEXTURE_2D),f.activeTexture(G.TEXTURE0),f.pixelStorei(G.UNPACK_FLIP_Y_WEBGL,B.flipY),f.pixelStorei(G.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),f.pixelStorei(G.UNPACK_ALIGNMENT,B.unpackAlignment);let yn=f.getParameter(G.UNPACK_ROW_LENGTH),Et=f.getParameter(G.UNPACK_IMAGE_HEIGHT),On=f.getParameter(G.UNPACK_SKIP_PIXELS),oi=f.getParameter(G.UNPACK_SKIP_ROWS),Ni=f.getParameter(G.UNPACK_SKIP_IMAGES);f.pixelStorei(G.UNPACK_ROW_LENGTH,Bt.width),f.pixelStorei(G.UNPACK_IMAGE_HEIGHT,Bt.height),f.pixelStorei(G.UNPACK_SKIP_PIXELS,We),f.pixelStorei(G.UNPACK_SKIP_ROWS,ot),f.pixelStorei(G.UNPACK_SKIP_IMAGES,lt);let Mr=M.isDataArrayTexture||M.isData3DTexture,Ct=B.isDataArrayTexture||B.isData3DTexture;if(M.isDepthTexture){let Kt=A.get(M),Li=A.get(B),kt=A.get(Kt.__renderTarget),_i=A.get(Li.__renderTarget);f.bindFramebuffer(G.READ_FRAMEBUFFER,kt.__webglFramebuffer),f.bindFramebuffer(G.DRAW_FRAMEBUFFER,_i.__webglFramebuffer);for(let Er=0;Er<ze;Er++)Mr&&(G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,A.get(M).__webglTexture,j,lt+Er),G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,A.get(B).__webglTexture,we,en+Er)),G.blitFramebuffer(We,ot,Oe,Ee,Ve,wt,Oe,Ee,G.DEPTH_BUFFER_BIT,G.NEAREST);f.bindFramebuffer(G.READ_FRAMEBUFFER,null),f.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else if(j!==0||M.isRenderTargetTexture||A.has(M)){let Kt=A.get(M),Li=A.get(B);f.bindFramebuffer(G.READ_FRAMEBUFFER,X),f.bindFramebuffer(G.DRAW_FRAMEBUFFER,Q);for(let kt=0;kt<ze;kt++)Mr?G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,Kt.__webglTexture,j,lt+kt):G.framebufferTexture2D(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,Kt.__webglTexture,j),Ct?G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,Li.__webglTexture,we,en+kt):G.framebufferTexture2D(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,Li.__webglTexture,we),j!==0?G.blitFramebuffer(We,ot,Oe,Ee,Ve,wt,Oe,Ee,G.COLOR_BUFFER_BIT,G.NEAREST):Ct?G.copyTexSubImage3D(Le,we,Ve,wt,en+kt,We,ot,Oe,Ee):G.copyTexSubImage2D(Le,we,Ve,wt,We,ot,Oe,Ee);f.bindFramebuffer(G.READ_FRAMEBUFFER,null),f.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else Ct?M.isDataTexture||M.isData3DTexture?G.texSubImage3D(Le,we,Ve,wt,en,Oe,Ee,ze,Lt,pn,Bt.data):B.isCompressedArrayTexture?G.compressedTexSubImage3D(Le,we,Ve,wt,en,Oe,Ee,ze,Lt,Bt.data):G.texSubImage3D(Le,we,Ve,wt,en,Oe,Ee,ze,Lt,pn,Bt):M.isDataTexture?G.texSubImage2D(G.TEXTURE_2D,we,Ve,wt,Oe,Ee,Lt,pn,Bt.data):M.isCompressedTexture?G.compressedTexSubImage2D(G.TEXTURE_2D,we,Ve,wt,Bt.width,Bt.height,Lt,Bt.data):G.texSubImage2D(G.TEXTURE_2D,we,Ve,wt,Oe,Ee,Lt,pn,Bt);f.pixelStorei(G.UNPACK_ROW_LENGTH,yn),f.pixelStorei(G.UNPACK_IMAGE_HEIGHT,Et),f.pixelStorei(G.UNPACK_SKIP_PIXELS,On),f.pixelStorei(G.UNPACK_SKIP_ROWS,oi),f.pixelStorei(G.UNPACK_SKIP_IMAGES,Ni),we===0&&B.generateMipmaps&&G.generateMipmap(Le),f.unbindTexture()},this.initRenderTarget=function(M){A.get(M).__webglFramebuffer===void 0&&C.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?C.setTextureCube(M,0):M.isData3DTexture?C.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?C.setTexture2DArray(M,0):C.setTexture2D(M,0),f.unbindTexture()},this.resetState=function(){oe=0,re=0,me=null,f.reset(),Ae.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ti}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=xt._getDrawingBufferColorSpace(e),t.unpackColorSpace=xt._getUnpackColorSpace()}};function Af(n,e){if(e===nf)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),n;if(e===Wa||e===ll){let t=n.getIndex();if(t===null){let s=[],a=n.getAttribute("position");if(a!==void 0){for(let o=0;o<a.count;o++)s.push(o);n.setIndex(s),t=n.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),n}let i=t.count-2,r=[];if(e===Wa)for(let s=1;s<=i;s++)r.push(t.getX(0)),r.push(t.getX(s)),r.push(t.getX(s+1));else for(let s=0;s<i;s++)s%2===0?(r.push(t.getX(s)),r.push(t.getX(s+1)),r.push(t.getX(s+2))):(r.push(t.getX(s+2)),r.push(t.getX(s+1)),r.push(t.getX(s)));return r.length/3!==i&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."),n.setIndex(r),n.clearGroups(),n}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),n}function l0(n){let e=new Map,t=new Map,i=n.clone();return c0(n,i,function(r,s){e.set(s,r),t.set(r,s)}),i.traverse(function(r){if(!r.isSkinnedMesh)return;let s=r,a=e.get(r),o=a.skeleton.bones;s.skeleton=a.skeleton.clone(),s.bindMatrix.copy(a.bindMatrix),s.skeleton.bones=o.map(function(c){return t.get(c)}),s.bind(s.skeleton,s.bindMatrix)}),i}function c0(n,e,t){t(n,e);for(let i=0;i<n.children.length;i++)c0(n.children[i],e.children[i],t)}var $u=class extends Wi{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Lf(t)}),this.register(function(t){return new Df(t)}),this.register(function(t){return new Hf(t)}),this.register(function(t){return new Wf(t)}),this.register(function(t){return new Xf(t)}),this.register(function(t){return new Of(t)}),this.register(function(t){return new Ff(t)}),this.register(function(t){return new Bf(t)}),this.register(function(t){return new kf(t)}),this.register(function(t){return new Nf(t)}),this.register(function(t){return new zf(t)}),this.register(function(t){return new Uf(t)}),this.register(function(t){return new Gf(t)}),this.register(function(t){return new Vf(t)}),this.register(function(t){return new Cf(t)}),this.register(function(t){return new Ju(t,St.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new Ju(t,St.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new qf(t)})}load(e,t,i,r){let s=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let l=Sr.extractUrlBase(e);a=Sr.resolveURL(l,this.path)}else a=Sr.extractUrlBase(e);this.manager.itemStart(e);let o=function(l){r?r(l):console.error(l),s.manager.itemError(e),s.manager.itemEnd(e)},c=new Oa(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{s.parse(l,a,function(u){t(u),s.manager.itemEnd(e)},o)}catch(u){o(u)}},i,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,i,r){let s,a={},o={},c=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===p0){try{a[St.KHR_BINARY_GLTF]=new Yf(e)}catch(h){r&&r(h);return}s=JSON.parse(a[St.KHR_BINARY_GLTF].content)}else s=JSON.parse(c.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){r&&r(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new ep(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){let h=this.pluginCallbacks[u](l);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[h.name]=h,a[h.name]=!0}if(s.extensionsUsed)for(let u=0;u<s.extensionsUsed.length;++u){let h=s.extensionsUsed[u],d=s.extensionsRequired||[];switch(h){case St.KHR_MATERIALS_UNLIT:a[h]=new Pf;break;case St.KHR_DRACO_MESH_COMPRESSION:a[h]=new Zf(s,this.dracoLoader);break;case St.KHR_TEXTURE_TRANSFORM:a[h]=new Kf;break;case St.KHR_MESH_QUANTIZATION:a[h]=new jf;break;default:d.indexOf(h)>=0&&o[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(i,r)}parseAsync(e,t){let i=this;return new Promise(function(r,s){i.parse(e,t,r,s)})}};function IT(){let n={};return{get:function(e){return n[e]},add:function(e,t){n[e]=t},remove:function(e){delete n[e]},removeAll:function(){n={}}}}function an(n,e,t){let i=n.json.materials[e];return i.extensions&&i.extensions[t]?i.extensions[t]:null}var St={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Cf=class{constructor(e){this.parser=e,this.name=St.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let i=0,r=t.length;i<r;i++){let s=t[i];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){let t=this.parser,i="light:"+e,r=t.cache.get(i);if(r)return r;let s=t.json,c=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e],l,u=new et(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],Ln);let h=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new $o(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new jo(u),l.distance=h;break;case"spot":l=new Ko(u),l.distance=h,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),ji(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),r=Promise.resolve(l),t.cache.add(i,r),r}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,i=this.parser,s=i.json.nodes[e],o=(s.extensions&&s.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return i._getNodeRef(t.cache,o,c)})}},Pf=class{constructor(){this.name=St.KHR_MATERIALS_UNLIT}getMaterialType(){return Hn}extendParams(e,t,i){let r=[];e.color=new et(1,1,1),e.opacity=1;let s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){let a=s.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],Ln),e.opacity=a[3]}s.baseColorTexture!==void 0&&r.push(i.assignTexture(e,"map",s.baseColorTexture,nn))}return Promise.all(r)}},Nf=class{constructor(e){this.parser=e,this.name=St.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let i=an(this.parser,e,this.name);return i===null||i.emissiveStrength!==void 0&&(t.emissiveIntensity=i.emissiveStrength),Promise.resolve()}},Lf=class{constructor(e){this.parser=e,this.name=St.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return an(this.parser,e,this.name)!==null?Wn:null}extendMaterialParams(e,t){let i=an(this.parser,e,this.name);if(i===null)return Promise.resolve();let r=[];if(i.clearcoatFactor!==void 0&&(t.clearcoat=i.clearcoatFactor),i.clearcoatTexture!==void 0&&r.push(this.parser.assignTexture(t,"clearcoatMap",i.clearcoatTexture)),i.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=i.clearcoatRoughnessFactor),i.clearcoatRoughnessTexture!==void 0&&r.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",i.clearcoatRoughnessTexture)),i.clearcoatNormalTexture!==void 0&&(r.push(this.parser.assignTexture(t,"clearcoatNormalMap",i.clearcoatNormalTexture)),i.clearcoatNormalTexture.scale!==void 0)){let s=i.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ht(s,s)}return Promise.all(r)}},Df=class{constructor(e){this.parser=e,this.name=St.KHR_MATERIALS_DISPERSION}getMaterialType(e){return an(this.parser,e,this.name)!==null?Wn:null}extendMaterialParams(e,t){let i=an(this.parser,e,this.name);return i===null||(t.dispersion=i.dispersion!==void 0?i.dispersion:0),Promise.resolve()}},Uf=class{constructor(e){this.parser=e,this.name=St.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return an(this.parser,e,this.name)!==null?Wn:null}extendMaterialParams(e,t){let i=an(this.parser,e,this.name);if(i===null)return Promise.resolve();let r=[];return i.iridescenceFactor!==void 0&&(t.iridescence=i.iridescenceFactor),i.iridescenceTexture!==void 0&&r.push(this.parser.assignTexture(t,"iridescenceMap",i.iridescenceTexture)),i.iridescenceIor!==void 0&&(t.iridescenceIOR=i.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),i.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=i.iridescenceThicknessMinimum),i.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=i.iridescenceThicknessMaximum),i.iridescenceThicknessTexture!==void 0&&r.push(this.parser.assignTexture(t,"iridescenceThicknessMap",i.iridescenceThicknessTexture)),Promise.all(r)}},Of=class{constructor(e){this.parser=e,this.name=St.KHR_MATERIALS_SHEEN}getMaterialType(e){return an(this.parser,e,this.name)!==null?Wn:null}extendMaterialParams(e,t){let i=an(this.parser,e,this.name);if(i===null)return Promise.resolve();let r=[];if(t.sheenColor=new et(0,0,0),t.sheenRoughness=0,t.sheen=1,i.sheenColorFactor!==void 0){let s=i.sheenColorFactor;t.sheenColor.setRGB(s[0],s[1],s[2],Ln)}return i.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=i.sheenRoughnessFactor),i.sheenColorTexture!==void 0&&r.push(this.parser.assignTexture(t,"sheenColorMap",i.sheenColorTexture,nn)),i.sheenRoughnessTexture!==void 0&&r.push(this.parser.assignTexture(t,"sheenRoughnessMap",i.sheenRoughnessTexture)),Promise.all(r)}},Ff=class{constructor(e){this.parser=e,this.name=St.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return an(this.parser,e,this.name)!==null?Wn:null}extendMaterialParams(e,t){let i=an(this.parser,e,this.name);if(i===null)return Promise.resolve();let r=[];return i.transmissionFactor!==void 0&&(t.transmission=i.transmissionFactor),i.transmissionTexture!==void 0&&r.push(this.parser.assignTexture(t,"transmissionMap",i.transmissionTexture)),Promise.all(r)}},Bf=class{constructor(e){this.parser=e,this.name=St.KHR_MATERIALS_VOLUME}getMaterialType(e){return an(this.parser,e,this.name)!==null?Wn:null}extendMaterialParams(e,t){let i=an(this.parser,e,this.name);if(i===null)return Promise.resolve();let r=[];t.thickness=i.thicknessFactor!==void 0?i.thicknessFactor:0,i.thicknessTexture!==void 0&&r.push(this.parser.assignTexture(t,"thicknessMap",i.thicknessTexture)),t.attenuationDistance=i.attenuationDistance||1/0;let s=i.attenuationColor||[1,1,1];return t.attenuationColor=new et().setRGB(s[0],s[1],s[2],Ln),Promise.all(r)}},kf=class{constructor(e){this.parser=e,this.name=St.KHR_MATERIALS_IOR}getMaterialType(e){return an(this.parser,e,this.name)!==null?Wn:null}extendMaterialParams(e,t){let i=an(this.parser,e,this.name);return i===null||(t.ior=i.ior!==void 0?i.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}},zf=class{constructor(e){this.parser=e,this.name=St.KHR_MATERIALS_SPECULAR}getMaterialType(e){return an(this.parser,e,this.name)!==null?Wn:null}extendMaterialParams(e,t){let i=an(this.parser,e,this.name);if(i===null)return Promise.resolve();let r=[];t.specularIntensity=i.specularFactor!==void 0?i.specularFactor:1,i.specularTexture!==void 0&&r.push(this.parser.assignTexture(t,"specularIntensityMap",i.specularTexture));let s=i.specularColorFactor||[1,1,1];return t.specularColor=new et().setRGB(s[0],s[1],s[2],Ln),i.specularColorTexture!==void 0&&r.push(this.parser.assignTexture(t,"specularColorMap",i.specularColorTexture,nn)),Promise.all(r)}},Vf=class{constructor(e){this.parser=e,this.name=St.EXT_MATERIALS_BUMP}getMaterialType(e){return an(this.parser,e,this.name)!==null?Wn:null}extendMaterialParams(e,t){let i=an(this.parser,e,this.name);if(i===null)return Promise.resolve();let r=[];return t.bumpScale=i.bumpFactor!==void 0?i.bumpFactor:1,i.bumpTexture!==void 0&&r.push(this.parser.assignTexture(t,"bumpMap",i.bumpTexture)),Promise.all(r)}},Gf=class{constructor(e){this.parser=e,this.name=St.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return an(this.parser,e,this.name)!==null?Wn:null}extendMaterialParams(e,t){let i=an(this.parser,e,this.name);if(i===null)return Promise.resolve();let r=[];return i.anisotropyStrength!==void 0&&(t.anisotropy=i.anisotropyStrength),i.anisotropyRotation!==void 0&&(t.anisotropyRotation=i.anisotropyRotation),i.anisotropyTexture!==void 0&&r.push(this.parser.assignTexture(t,"anisotropyMap",i.anisotropyTexture)),Promise.all(r)}},Hf=class{constructor(e){this.parser=e,this.name=St.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,i=t.json,r=i.textures[e];if(!r.extensions||!r.extensions[this.name])return null;let s=r.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(i.extensionsRequired&&i.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,a)}},Wf=class{constructor(e){this.parser=e,this.name=St.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,i=this.parser,r=i.json,s=r.textures[e];if(!s.extensions||!s.extensions[t])return null;let a=s.extensions[t],o=r.images[a.source],c=i.textureLoader;if(o.uri){let l=i.options.manager.getHandler(o.uri);l!==null&&(c=l)}return i.loadTextureImage(e,a.source,c)}},Xf=class{constructor(e){this.parser=e,this.name=St.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,i=this.parser,r=i.json,s=r.textures[e];if(!s.extensions||!s.extensions[t])return null;let a=s.extensions[t],o=r.images[a.source],c=i.textureLoader;if(o.uri){let l=i.options.manager.getHandler(o.uri);l!==null&&(c=l)}return i.loadTextureImage(e,a.source,c)}},Ju=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,i=t.bufferViews[e];if(i.extensions&&i.extensions[this.name]){let r=i.extensions[this.name],s=this.parser.getDependency("buffer",r.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(o){let c=r.byteOffset||0,l=r.byteLength||0,u=r.count,h=r.byteStride,d=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(u,h,d,r.mode,r.filter).then(function(m){return m.buffer}):a.ready.then(function(){let m=new ArrayBuffer(u*h);return a.decodeGltfBuffer(new Uint8Array(m),u,h,d,r.mode,r.filter),m})})}else return null}},qf=class{constructor(e){this.name=St.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,i=t.nodes[e];if(!i.extensions||!i.extensions[this.name]||i.mesh===void 0)return null;let r=t.meshes[i.mesh];for(let l of r.primitives)if(l.mode!==mi.TRIANGLES&&l.mode!==mi.TRIANGLE_STRIP&&l.mode!==mi.TRIANGLE_FAN&&l.mode!==void 0)return null;let a=i.extensions[this.name].attributes,o=[],c={};for(let l in a)o.push(this.parser.getDependency("accessor",a[l]).then(u=>(c[l]=u,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{let u=l.pop(),h=u.isGroup?u.children:[u],d=l[0].count,m=[];for(let x of h){let v=new at,g=new Z,_=new ei,T=new Z(1,1,1),I=new ko(x.geometry,x.material,d);for(let w=0;w<d;w++)c.TRANSLATION&&g.fromBufferAttribute(c.TRANSLATION,w),c.ROTATION&&_.fromBufferAttribute(c.ROTATION,w),c.SCALE&&T.fromBufferAttribute(c.SCALE,w),I.setMatrixAt(w,v.compose(g,_,T));let E=null;for(let w in c)if(w==="_COLOR_0"){let R=c[w];I.instanceColor=new gr(R.array,R.itemSize,R.normalized)}else if(w!=="TRANSLATION"&&w!=="ROTATION"&&w!=="SCALE"){if(E===null){let P=I.geometry;E=new Mn,E.name=P.name;for(let y in P.attributes)E.setAttribute(y,P.attributes[y]);for(let y in P.morphAttributes)E.morphAttributes[y]=P.morphAttributes[y];P.index!==null&&E.setIndex(P.index),E.morphTargetsRelative=P.morphTargetsRelative;for(let y of P.groups)E.addGroup(y.start,y.count,y.materialIndex);P.boundingBox!==null&&(E.boundingBox=P.boundingBox.clone()),P.boundingSphere!==null&&(E.boundingSphere=P.boundingSphere.clone()),E.drawRange.start=P.drawRange.start,E.drawRange.count=P.drawRange.count,E.userData=Object.assign({},P.userData),I.geometry=E}let R=c[w];E.setAttribute(w,new gr(R.array,R.itemSize,R.normalized))}$t.prototype.copy.call(I,x),this.parser.assignFinalMaterial(I),m.push(I)}return u.isGroup?(u.clear(),u.add(...m),u):m[0]}))}},p0="glTF",dl=12,u0={JSON:1313821514,BIN:5130562},Yf=class{constructor(e){this.name=St.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,dl),i=new TextDecoder;if(this.header={magic:i.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==p0)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let r=this.header.length-dl,s=new DataView(e,dl),a=0;for(;a<r;){let o=s.getUint32(a,!0);a+=4;let c=s.getUint32(a,!0);if(a+=4,c===u0.JSON){let l=new Uint8Array(e,dl+a,o);this.content=i.decode(l)}else if(c===u0.BIN){let l=dl+a;this.body=e.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},Zf=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=St.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let i=this.json,r=this.dracoLoader,s=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},c={},l={};for(let u in a){let h=Jf[u]||u.toLowerCase();o[h]=a[u]}for(let u in e.attributes){let h=Jf[u]||u.toLowerCase();if(a[u]!==void 0){let d=i.accessors[e.attributes[u]],m=ja[d.componentType];l[h]=m.name,c[h]=d.normalized===!0}}return t.getDependency("bufferView",s).then(function(u){return new Promise(function(h,d){r.decodeDracoFile(u,function(m){for(let x in m.attributes){let v=m.attributes[x],g=c[x];g!==void 0&&(v.normalized=g)}h(m)},o,l,Ln,d)})})}},Kf=class{constructor(){this.name=St.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){if((t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0)return e;if(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),t.rotation!==void 0){let i=Math.cos(e.rotation),r=Math.sin(e.rotation);e.matrix.set(e.repeat.x*i,e.repeat.y*r,e.offset.x,-e.repeat.x*r,e.repeat.y*i,e.offset.y,0,0,1),e.matrixAutoUpdate=!1}return e.needsUpdate=!0,e}},jf=class{constructor(){this.name=St.KHR_MESH_QUANTIZATION}},Qu=class extends Hi{constructor(e,t,i,r){super(e,t,i,r)}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,r=this.valueSize,s=e*r*3+r;for(let a=0;a!==r;a++)t[a]=i[s+a];return t}interpolate_(e,t,i,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,u=r-t,h=(i-t)/u,d=h*h,m=d*h,x=e*l,v=x-l,g=-2*m+3*d,_=m-d,T=1-g,I=_-d+h;for(let E=0;E!==o;E++){let w=a[v+E+o],R=a[v+E+c]*u,P=a[x+E+o],y=a[x+E]*u;s[E]=T*w+I*R+g*P+_*y}return s}},CT=new ei,$f=class extends Qu{interpolate_(e,t,i,r){let s=super.interpolate_(e,t,i,r);return CT.fromArray(s).normalize().toArray(s),s}},mi={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},ja={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},h0={9728:Yt,9729:jt,9984:iu,9985:Va,9986:Ls,9987:Ii},d0={33071:pi,33648:Sa,10497:Gr},wf={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Jf={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Kr={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},PT={CUBICSPLINE:void 0,LINEAR:Ts,STEP:Es},Rf={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function NT(n){return n.DefaultMaterial===void 0&&(n.DefaultMaterial=new Is({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:qi})),n.DefaultMaterial}function Os(n,e,t){for(let i in t.extensions)n[i]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[i]=t.extensions[i])}function ji(n,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(n.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function LT(n,e,t){let i=!1,r=!1,s=!1;for(let l=0,u=e.length;l<u;l++){let h=e[l];if(h.POSITION!==void 0&&(i=!0),h.NORMAL!==void 0&&(r=!0),h.COLOR_0!==void 0&&(s=!0),i&&r&&s)break}if(!i&&!r&&!s)return Promise.resolve(n);let a=[],o=[],c=[];for(let l=0,u=e.length;l<u;l++){let h=e[l];if(i){let d=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):n.attributes.position;a.push(d)}if(r){let d=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):n.attributes.normal;o.push(d)}if(s){let d=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):n.attributes.color;c.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){let u=l[0],h=l[1],d=l[2];return i&&(n.morphAttributes.position=u),r&&(n.morphAttributes.normal=h),s&&(n.morphAttributes.color=d),n.morphTargetsRelative=!0,n})}function DT(n,e){if(n.updateMorphTargets(),e.weights!==void 0)for(let t=0,i=e.weights.length;t<i;t++)n.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(n.morphTargetInfluences.length===t.length){n.morphTargetDictionary={};for(let i=0,r=t.length;i<r;i++)n.morphTargetDictionary[t[i]]=i}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function UT(n){let e,t=n.extensions&&n.extensions[St.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+If(t.attributes):e=n.indices+":"+If(n.attributes)+":"+n.mode,n.targets!==void 0)for(let i=0,r=n.targets.length;i<r;i++)e+=":"+If(n.targets[i]);return e}function If(n){let e="",t=Object.keys(n).sort();for(let i=0,r=t.length;i<r;i++)e+=t[i]+":"+n[t[i]]+";";return e}function Qf(n){switch(n){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function OT(n){return n.search(/\.jpe?g($|\?)/i)>0||n.search(/^data\:image\/jpeg/)===0?"image/jpeg":n.search(/\.webp($|\?)/i)>0||n.search(/^data\:image\/webp/)===0?"image/webp":n.search(/\.ktx2($|\?)/i)>0||n.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var FT=new at,ep=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new IT,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let i=!1,r=-1,s=!1,a=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){let o=navigator.userAgent;i=/^((?!chrome|android).)*safari/i.test(o)===!0;let c=o.match(/Version\/(\d+)/);r=i&&c?parseInt(c[1],10):-1,s=o.indexOf("Firefox")>-1,a=s?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||i&&r<17||s&&a<98?this.textureLoader=new Cs(this.options.manager):this.textureLoader=new Jo(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Oa(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let i=this,r=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([i.getDependencies("scene"),i.getDependencies("animation"),i.getDependencies("camera")])}).then(function(a){let o={scene:a[0][r.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:r.asset,parser:i,userData:{}};return Os(s,o,r),ji(o,r),Promise.all(i._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(let c of o.scenes)c.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],i=this.json.meshes||[];for(let r=0,s=t.length;r<s;r++){let a=t[r].joints;for(let o=0,c=a.length;o<c;o++)e[a[o]].isBone=!0}for(let r=0,s=e.length;r<s;r++){let a=e[r];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(i[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,i){if(e.refs[t]<=1)return i;let r=i.clone(),s=(a,o)=>{let c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(let[l,u]of a.children.entries())s(u,o.children[l])};return s(i,r),r.name+="_instance_"+e.uses[t]++,r}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let i=0;i<t.length;i++){let r=e(t[i]);if(r)return r}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let i=[];for(let r=0;r<t.length;r++){let s=e(t[r]);s&&i.push(s)}return i}getDependency(e,t){let i=e+":"+t,r=this.cache.get(i);if(!r){switch(e){case"scene":r=this.loadScene(t);break;case"node":r=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":r=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":r=this.loadAccessor(t);break;case"bufferView":r=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":r=this.loadBuffer(t);break;case"material":r=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":r=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":r=this.loadSkin(t);break;case"animation":r=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":r=this.loadCamera(t);break;default:if(r=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!r)throw new Error("Unknown type: "+e);break}this.cache.add(i,r)}return r}getDependencies(e){let t=this.cache.get(e);if(!t){let i=this,r=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(r.map(function(s,a){return i.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],i=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[St.KHR_BINARY_GLTF].body);let r=this.options;return new Promise(function(s,a){i.load(Sr.resolveURL(t.uri,r.path),s,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(i){let r=t.byteLength||0,s=t.byteOffset||0;return i.slice(s,s+r)})}loadAccessor(e){let t=this,i=this.json,r=this.json.accessors[e];if(r.bufferView===void 0&&r.sparse===void 0){let a=wf[r.type],o=ja[r.componentType],c=r.normalized===!0,l=new o(r.count*a);return Promise.resolve(new hn(l,a,c))}let s=[];return r.bufferView!==void 0?s.push(this.getDependency("bufferView",r.bufferView)):s.push(null),r.sparse!==void 0&&(s.push(this.getDependency("bufferView",r.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",r.sparse.values.bufferView))),Promise.all(s).then(function(a){let o=a[0],c=wf[r.type],l=ja[r.componentType],u=l.BYTES_PER_ELEMENT,h=u*c,d=r.byteOffset||0,m=r.bufferView!==void 0?i.bufferViews[r.bufferView].byteStride:void 0,x=r.normalized===!0,v,g;if(m&&m!==h){let _=Math.floor(d/m),T="InterleavedBuffer:"+r.bufferView+":"+r.componentType+":"+_+":"+r.count,I=t.cache.get(T);I||(v=new l(o,_*m,r.count*m/u),I=new Ra(v,m/u),t.cache.add(T,I)),g=new Ia(I,c,d%m/u,x)}else o===null?v=new l(r.count*c):v=new l(o,d,r.count*c),g=new hn(v,c,x);if(r.sparse!==void 0){let _=wf.SCALAR,T=ja[r.sparse.indices.componentType],I=r.sparse.indices.byteOffset||0,E=r.sparse.values.byteOffset||0,w=new T(a[1],I,r.sparse.count*_),R=new l(a[2],E,r.sparse.count*c);o!==null&&(g=new hn(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let P=0,y=w.length;P<y;P++){let N=w[P];if(g.setX(N,R[P*c]),c>=2&&g.setY(N,R[P*c+1]),c>=3&&g.setZ(N,R[P*c+2]),c>=4&&g.setW(N,R[P*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=x}return g})}loadTexture(e){let t=this.json,i=this.options,s=t.textures[e].source,a=t.images[s],o=this.textureLoader;if(a.uri){let c=i.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(e,s,o)}loadTextureImage(e,t,i){let r=this,s=this.json,a=s.textures[e],o=s.images[t],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,i).then(function(u){u.flipY=!1,u.name=a.name||o.name||"",u.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(u.name=o.uri);let d=(s.samplers||{})[a.sampler]||{};return u.magFilter=h0[d.magFilter]||jt,u.minFilter=h0[d.minFilter]||Ii,u.wrapS=d0[d.wrapS]||Gr,u.wrapT=d0[d.wrapT]||Gr,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==Yt&&u.minFilter!==jt,r.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let i=this,r=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());let a=r.images[e],o=self.URL||self.webkitURL,c=a.uri||"",l=!1;if(a.bufferView!==void 0)c=i.getDependency("bufferView",a.bufferView).then(function(h){l=!0;let d=new Blob([h],{type:a.mimeType});return c=o.createObjectURL(d),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let u=Promise.resolve(c).then(function(h){return new Promise(function(d,m){let x=d;t.isImageBitmapLoader===!0&&(x=function(v){let g=new vn(v);g.needsUpdate=!0,d(g)}),t.load(Sr.resolveURL(h,s.path),x,void 0,m)})}).then(function(h){return l===!0&&o.revokeObjectURL(c),ji(h,a),h.userData.mimeType=a.mimeType||OT(a.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),h});return this.sourceCache[e]=u,u}assignTexture(e,t,i,r){let s=this;return this.getDependency("texture",i.index).then(function(a){if(!a)return null;if(i.texCoord!==void 0&&i.texCoord>0&&(a=a.clone(),a.channel=i.texCoord),s.extensions[St.KHR_TEXTURE_TRANSFORM]){let o=i.extensions!==void 0?i.extensions[St.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let c=s.associations.get(a);a=s.extensions[St.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),s.associations.set(a,c)}}return r!==void 0&&(a.colorSpace=r),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,i=e.material,r=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+i.uuid,c=this.cache.get(o);c||(c=new Da,Gn.prototype.copy.call(c,i),c.color.copy(i.color),c.map=i.map,c.sizeAttenuation=!1,this.cache.add(o,c)),i=c}else if(e.isLine){let o="LineBasicMaterial:"+i.uuid,c=this.cache.get(o);c||(c=new La,Gn.prototype.copy.call(c,i),c.color.copy(i.color),c.map=i.map,this.cache.add(o,c)),i=c}if(r||s||a){let o="ClonedMaterial:"+i.uuid+":";r&&(o+="derivative-tangents:"),s&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=i.clone(),s&&(c.vertexColors=!0),a&&(c.flatShading=!0),r&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(i))),i=c}e.material=i}getMaterialType(){return Is}loadMaterial(e){let t=this,i=this.json,r=this.extensions,s=i.materials[e],a,o={},c=s.extensions||{},l=[];if(c[St.KHR_MATERIALS_UNLIT]){let h=r[St.KHR_MATERIALS_UNLIT];a=h.getMaterialType(),l.push(h.extendParams(o,s,t))}else{let h=s.pbrMetallicRoughness||{};if(o.color=new et(1,1,1),o.opacity=1,Array.isArray(h.baseColorFactor)){let d=h.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],Ln),o.opacity=d[3]}h.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",h.baseColorTexture,nn)),o.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,o.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",h.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",h.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}s.doubleSided===!0&&(o.side=Un);let u=s.alphaMode||Rf.OPAQUE;if(u===Rf.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,u===Rf.MASK&&(o.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&a!==Hn&&(l.push(t.assignTexture(o,"normalMap",s.normalTexture)),o.normalScale=new ht(1,1),s.normalTexture.scale!==void 0)){let h=s.normalTexture.scale;o.normalScale.set(h,h)}if(s.occlusionTexture!==void 0&&a!==Hn&&(l.push(t.assignTexture(o,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&a!==Hn){let h=s.emissiveFactor;o.emissive=new et().setRGB(h[0],h[1],h[2],Ln)}return s.emissiveTexture!==void 0&&a!==Hn&&l.push(t.assignTexture(o,"emissiveMap",s.emissiveTexture,nn)),Promise.all(l).then(function(){let h=new a(o);return s.name&&(h.name=s.name),ji(h,s),t.associations.set(h,{materials:e}),s.extensions&&Os(r,h,s),h})}createUniqueName(e){let t=Gt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,i=this.extensions,r=this.primitiveCache;function s(o){return i[St.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return f0(c,o,t)})}let a=[];for(let o=0,c=e.length;o<c;o++){let l=e[o],u=UT(l),h=r[u];if(h)a.push(h.promise);else{let d;l.extensions&&l.extensions[St.KHR_DRACO_MESH_COMPRESSION]?d=s(l):d=f0(new Mn,l,t),l.mode===mi.TRIANGLE_STRIP?d=d.then(m=>Af(m,ll)):l.mode===mi.TRIANGLE_FAN&&(d=d.then(m=>Af(m,Wa))),r[u]={primitive:l,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){let t=this,i=this.json,r=this.extensions,s=i.meshes[e],a=s.primitives,o=[];for(let c=0,l=a.length;c<l;c++){let u=a[c].material===void 0?NT(this.cache):this.getDependency("material",a[c].material);o.push(u)}return o.push(t.loadGeometries(a)),Promise.all(o).then(async function(c){let l=c.slice(0,c.length-1),u=c[c.length-1],h=[];for(let m=0,x=u.length;m<x;m++){let v=u[m],g=a[m],_,T=l[m];if(g.mode===mi.TRIANGLES||g.mode===mi.TRIANGLE_STRIP||g.mode===mi.TRIANGLE_FAN||g.mode===void 0){let I=s.isSkinnedMesh===!0,E=v.hasAttribute("skinIndex")&&v.hasAttribute("skinWeight");I&&E===!1&&console.warn("THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled."),_=I&&E?new Fo(v,T):new cn(v,T),_.isSkinnedMesh===!0&&_.normalizeSkinWeights()}else if(g.mode===mi.LINES)_=new zo(v,T);else if(g.mode===mi.LINE_STRIP)_=new ws(v,T);else if(g.mode===mi.LINE_LOOP)_=new Vo(v,T);else if(g.mode===mi.POINTS)_=new Go(v,T);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(_.geometry.morphAttributes).length>0&&DT(_,s),_.name=t.createUniqueName(s.name||"mesh_"+e),ji(_,s),g.extensions&&Os(r,_,g),t.assignFinalMaterial(_),h.push(_)}for(let m=0,x=h.length;m<x;m++)t.associations.set(h[m],{meshes:e,primitives:m});if(h.length===1)return s.extensions&&Os(r,h[0],s),h[0];let d=new Ai;s.extensions&&Os(r,d,s),t.associations.set(d,{meshes:e});for(let m=0,x=h.length;m<x;m++)d.add(h[m]);return d})}loadCamera(e){let t,i=this.json.cameras[e],r=i[i.type];if(!r){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return i.type==="perspective"?t=new _n(Xa.radToDeg(r.yfov),r.aspectRatio||1,r.znear||1,r.zfar||2e6):i.type==="orthographic"&&(t=new Xi(-r.xmag,r.xmag,r.ymag,-r.ymag,r.znear,r.zfar)),i.name&&(t.name=this.createUniqueName(i.name)),ji(t,i),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],i=[];for(let r=0,s=t.joints.length;r<s;r++)i.push(this._loadNodeShallow(t.joints[r]));return t.inverseBindMatrices!==void 0?i.push(this.getDependency("accessor",t.inverseBindMatrices)):i.push(null),Promise.all(i).then(function(r){let s=r.pop(),a=r,o=[],c=[];for(let l=0,u=a.length;l<u;l++){let h=a[l];if(h){o.push(h);let d=new at;s!==null&&d.fromArray(s.array,l*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Bo(o,c)})}loadAnimation(e){let t=this.json,i=this,r=t.animations[e],s=r.name?r.name:"animation_"+e,a=[],o=[],c=[],l=[],u=[];for(let h=0,d=r.channels.length;h<d;h++){let m=r.channels[h],x=r.samplers[m.sampler],v=m.target,g=v.node,_=r.parameters!==void 0?r.parameters[x.input]:x.input,T=r.parameters!==void 0?r.parameters[x.output]:x.output;v.node!==void 0&&(a.push(this.getDependency("node",g)),o.push(this.getDependency("accessor",_)),c.push(this.getDependency("accessor",T)),l.push(x),u.push(v))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(h){let d=h[0],m=h[1],x=h[2],v=h[3],g=h[4],_=[];for(let I=0,E=d.length;I<E;I++){let w=d[I],R=m[I],P=x[I],y=v[I],N=g[I];if(w===void 0)continue;w.updateMatrix&&w.updateMatrix();let k=i._createAnimationTracks(w,R,P,y,N);if(k)for(let W=0;W<k.length;W++)_.push(k[W])}let T=new Yo(s,void 0,_);return ji(T,r),T})}createNodeMesh(e){let t=this.json,i=this,r=t.nodes[e];return r.mesh===void 0?null:i.getDependency("mesh",r.mesh).then(function(s){let a=i._getNodeRef(i.meshCache,r.mesh,s);return r.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=r.weights.length;c<l;c++)o.morphTargetInfluences[c]=r.weights[c]}),a})}loadNode(e){let t=this.json,i=this,r=t.nodes[e],s=i._loadNodeShallow(e),a=[],o=r.children||[];for(let l=0,u=o.length;l<u;l++)a.push(i.getDependency("node",o[l]));let c=r.skin===void 0?Promise.resolve(null):i.getDependency("skin",r.skin);return Promise.all([s,Promise.all(a),c]).then(function(l){let u=l[0],h=l[1],d=l[2];d!==null&&u.traverse(function(m){m.isSkinnedMesh&&m.bind(d,FT)});for(let m=0,x=h.length;m<x;m++)u.add(h[m]);if(u.userData.pivot!==void 0&&h.length>0){let m=u.userData.pivot,x=h[0];u.pivot=new Z().fromArray(m),u.position.x-=m[0],u.position.y-=m[1],u.position.z-=m[2],x.position.set(0,0,0),delete u.userData.pivot}return u})}_loadNodeShallow(e){let t=this.json,i=this.extensions,r=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let s=t.nodes[e],a=s.name?r.createUniqueName(s.name):"",o=[],c=r._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),s.camera!==void 0&&o.push(r.getDependency("camera",s.camera).then(function(l){return r._getNodeRef(r.cameraCache,s.camera,l)})),r._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let u;if(s.isBone===!0?u=new Ca:l.length>1?u=new Ai:l.length===1?u=l[0]:u=new $t,u!==l[0])for(let h=0,d=l.length;h<d;h++)u.add(l[h]);if(s.name&&(u.userData.name=s.name,u.name=a),ji(u,s),s.extensions&&Os(i,u,s),s.matrix!==void 0){let h=new at;h.fromArray(s.matrix),u.applyMatrix4(h)}else s.translation!==void 0&&u.position.fromArray(s.translation),s.rotation!==void 0&&u.quaternion.fromArray(s.rotation),s.scale!==void 0&&u.scale.fromArray(s.scale);if(!r.associations.has(u))r.associations.set(u,{});else if(s.mesh!==void 0&&r.meshCache.refs[s.mesh]>1){let h=r.associations.get(u);r.associations.set(u,{...h})}return r.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){let t=this.extensions,i=this.json.scenes[e],r=this,s=new Ai;i.name&&(s.name=r.createUniqueName(i.name)),ji(s,i),i.extensions&&Os(t,s,i);let a=i.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(r.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let u=0,h=c.length;u<h;u++){let d=c[u];d.parent!==null?s.add(l0(d)):s.add(d)}let l=u=>{let h=new Map;for(let[d,m]of r.associations)(d instanceof Gn||d instanceof vn)&&h.set(d,m);return u.traverse(d=>{let m=r.associations.get(d);m!=null&&h.set(d,m)}),h};return r.associations=l(s),s})}_createAnimationTracks(e,t,i,r,s){let a=[],o=e.name?e.name:e.uuid,c=[];function l(m){m.morphTargetInfluences&&c.push(m.name?m.name:m.uuid)}Kr[s.path]===Kr.weights?(l(e),e.isGroup&&e.children.forEach(l)):c.push(o);let u;switch(Kr[s.path]){case Kr.weights:u=xr;break;case Kr.rotation:u=vr;break;case Kr.translation:case Kr.scale:u=Xr;break;default:i.itemSize===1?u=xr:u=Xr;break}let h=r.interpolation!==void 0?PT[r.interpolation]:Ts,d=this._getArrayFromAccessor(i);for(let m=0,x=c.length;m<x;m++){let v=new u(c[m]+"."+Kr[s.path],t.array,d,h);r.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(v),a.push(v)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let i=Qf(t.constructor),r=new Float32Array(t.length);for(let s=0,a=t.length;s<a;s++)r[s]=t[s]*i;t=r}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(i){let r=this instanceof vr?$f:Qu;return new r(this.times,this.values,this.getValueSize()/3,i)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function BT(n,e,t){let i=e.attributes,r=new ti;if(i.POSITION!==void 0){let o=t.json.accessors[i.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(r.set(new Z(c[0],c[1],c[2]),new Z(l[0],l[1],l[2])),o.normalized){let u=Qf(ja[o.componentType]);r.min.multiplyScalar(u),r.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let s=e.targets;if(s!==void 0){let o=new Z,c=new Z;for(let l=0,u=s.length;l<u;l++){let h=s[l];if(h.POSITION!==void 0){let d=t.json.accessors[h.POSITION],m=d.min,x=d.max;if(m!==void 0&&x!==void 0){if(c.setX(Math.max(Math.abs(m[0]),Math.abs(x[0]))),c.setY(Math.max(Math.abs(m[1]),Math.abs(x[1]))),c.setZ(Math.max(Math.abs(m[2]),Math.abs(x[2]))),d.normalized){let v=Qf(ja[d.componentType]);c.multiplyScalar(v)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}r.expandByVector(o)}n.boundingBox=r;let a=new Vn;r.getCenter(a.center),a.radius=r.min.distanceTo(r.max)/2,n.boundingSphere=a}function f0(n,e,t){let i=e.attributes,r=[];function s(a,o){return t.getDependency("accessor",a).then(function(c){n.setAttribute(o,c)})}for(let a in i){let o=Jf[a]||a.toLowerCase();o in n.attributes||r.push(s(i[a],o))}if(e.indices!==void 0&&!n.index){let a=t.getDependency("accessor",e.indices).then(function(o){n.setIndex(o)});r.push(a)}return xt.workingColorSpace!==Ln&&"COLOR_0"in i&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${xt.workingColorSpace}" not supported.`),ji(n,e),BT(n,e,t),Promise.all(r).then(function(){return e.targets!==void 0?LT(n,e.targets,t):n})}var m0=(n,e,t)=>Math.max(e,Math.min(t,n));function kT(n,e){return Math.max(0,Math.min(n.left+n.width,e.left+e.width)-Math.max(n.left,e.left))*Math.max(0,Math.min(n.top+n.height,e.top+e.height)-Math.max(n.top,e.top))}function g0(n,e,t=[]){let i=t.map(s=>({...s})),r=new Map;for(let s of[...n].sort((a,o)=>a.y-o.y||String(a.id).localeCompare(String(o.id)))){let{x:a,y:o,width:c,height:l}=s,u=a-c/2,h=[u,a-c+32,a-32,...i.flatMap(v=>[v.left-c-8,v.left+v.width+8])],d=[o-l-18,o+18,...i.flatMap(v=>[v.top-l-8,v.top+v.height+8])],m=null,x=1/0;for(let v of h)for(let g of d){let _=m0(v,16,Math.max(16,e.width-c-16)),T=g+l<=o-8?"above":g>=o+8?"below":null;if(!T||g<16||g+l>e.height-16||a>=48&&a<=e.width-16-32&&(a<_+16||a>_+c-16))continue;let I={left:_,top:g,width:c,height:l},E=i.reduce((P,y)=>P+kT(I,y),0),w=T==="above"?o-g-l:g-o,R=E*1e4+Math.abs(_-u)+Math.abs(w-18)*2+(T==="below"?200:0);R<x&&(x=R,m={...I,side:T,anchorX:a,anchorY:o})}m??={left:m0(u,16,Math.max(16,e.width-c-16)),top:o-l-18,width:c,height:l,side:"above",anchorX:a,anchorY:o},r.set(s.id,m),i.push(m)}return r}var zT=new Intl.Segmenter("fr",{granularity:"grapheme"}),fl=n=>[...zT.segment(n)].map(e=>e.segment);function tp(n,e,t,i=3){let r=[];for(let a of String(n).replace(/\r/g,"").split(`
`)){let o="";for(let c of fl(a)){if(o&&e(o+c)>t){let l=o.lastIndexOf(" ");l>0?(r.push(o.slice(0,l)),o=o.slice(l+1)):(r.push(o),o="")}o+=c}r.push(o.trimEnd())}let s=[];for(let a=0;a<r.length;a+=i)s.push(r.slice(a,a+i).join(`
`));return s}function np(n,e,t=32){let i=Math.min(n.length,Math.max(0,Math.floor(e*t/1e3)));return{text:n.slice(0,i).join(""),complete:i===n.length,expired:e>=n.length*1e3/t+Math.max(3e3,n.length*30)}}var eh=class{constructor(){this.seen=new Set,this.queues=new Map}receive(e){for(let t of e){if(!t.id||!t.author||!t.text?.trim()||this.seen.has(t.id))continue;this.seen.add(t.id),this.seen.size>1e3&&this.seen.delete(this.seen.values().next().value);let i=this.queues.get(t.author)??[];i.length>=5&&i.shift(),i.push(t),this.queues.set(t.author,i)}}next(e){return this.queues.get(e)?.shift()}remove(e){this.queues.delete(e)}};async function _0(n){let e=u=>new URL("dialogue/"+u,n).href,t=await new FontFace("AveriaSky",'url("'+e("AveriaSansLibre-Regular.ttf")+'")').load();document.fonts.add(t),await Promise.all(["frame.png","name.png","tail.png","continue.png"].map(async u=>{let h=new Image;h.src=e(u),await h.decode()}));let i=document.createElement("style");i.textContent=["#sky-dialogues{position:fixed;inset:0;pointer-events:none;z-index:10}",'.sky-dialogue{position:absolute;box-sizing:border-box;border:24px solid transparent;border-image:url("'+e("frame.png")+'") 32 fill / 24px stretch;color:#fff;font:24px/1.3 AveriaSky,sans-serif;filter:drop-shadow(2px 3px 2px #0009);text-shadow:1px 2px 1px #000;--speaker-x:70%;--tail-height:30px}','.sky-dialogue-name{color:#ffd778;font-size:27px;line-height:36px;height:36px;margin:-8px -8px 10px;padding:0 16px;overflow:hidden;white-space:nowrap;border-image:url("'+e("name.png")+'") 0 8 0 8 fill / 0 8px 0 8px stretch}',".sky-dialogue-text{white-space:pre-wrap;overflow-wrap:anywhere;padding-bottom:16px}",'.sky-dialogue-tail{position:absolute;left:calc(var(--speaker-x) - 30px);top:calc(100% + 14px);width:40px;height:var(--tail-height);background:url("'+e("tail.png")+'") center/100% 100% no-repeat}','.sky-dialogue-continue{position:absolute;bottom:-21px;left:calc(var(--speaker-x) - 12px);width:24px;height:26px;background:url("'+e("continue.png")+'") center/100% 100% no-repeat;animation:sky-dialogue-pulse .8s ease-in-out infinite alternate}','.sky-dialogue[data-side="below"] .sky-dialogue-tail{top:auto;bottom:calc(100% + 14px);transform:scaleY(-1)}','.sky-dialogue[data-side="below"] .sky-dialogue-continue{bottom:auto;top:-21px;rotate:180deg}',"@keyframes sky-dialogue-pulse{to{transform:translateY(3px)}}","@media(prefers-reduced-motion:reduce){.sky-dialogue-continue{animation:none}}"].join(`
`),document.head.append(i);let r=document.createElement("div");r.id="sky-dialogues",document.body.append(r);let s=new eh,a=new Map,o=document.createElement("canvas").getContext("2d");o.font="24px AveriaSky";function c(u){let h=Math.max(...u.text.split(`
`).map(m=>o.measureText(m).width)),d=o.measureText(u.character).width*27/24+32;return Math.min(560,innerWidth-32,Math.max(240,Math.max(h,d)+52))}function l(u,h,d){let m=c(h),x=tp(h.text,w=>o.measureText(w).width,m-48),v=document.createElement("section");v.className="sky-dialogue",v.dataset.author=u,v.style.width=m+"px",v.setAttribute("aria-label",h.character+" : "+h.text);let g=document.createElement("div");g.className="sky-dialogue-name",g.textContent=h.character;let _=document.createElement("div");_.className="sky-dialogue-text",_.style.height=Math.max(...x.map(w=>w.split(`
`).length))*31.2+"px";let T=document.createElement("div");T.className="sky-dialogue-tail";let I=document.createElement("div");I.className="sky-dialogue-continue",I.hidden=!0,v.append(g,_,T,I),r.append(v);let E={element:v,text:_,continuation:I,pages:x,page:0,characters:fl(x[0]),started:d,width:m,message:h};return a.set(u,E),E}return{receive(u){s.receive(u)},update(u,h,d){let m=[];for(let g of s.queues.keys())h.has(g)||s.remove(g);for(let[g,_]of a)h.has(g)||(_.element.remove(),a.delete(g),s.remove(g));for(let[g,_]of h){let T=a.get(g);if(!T){let y=s.next(g);y&&(T=l(g,y,u))}if(!T)continue;let I=c(T.message);T.width!==I&&(T.width=I,T.element.style.width=I+"px",T.pages=tp(T.message.text,y=>o.measureText(y).width,I-48),T.page=Math.min(T.page,T.pages.length-1),T.characters=fl(T.pages[T.page]),T.started=u,T.text.style.height=Math.max(...T.pages.map(y=>y.split(`
`).length))*31.2+"px");let E=np(T.characters,u-T.started);if(E.expired)if(++T.page<T.pages.length)T.started=u,T.characters=fl(T.pages[T.page]),E=np(T.characters,0);else{T.element.remove(),a.delete(g);continue}T.text.textContent=E.text,T.continuation.hidden=!E.complete;let w=new Z(_.position.x,_.position.y+_.info.height,_.position.z).project(d),R=(w.x+1)*innerWidth/2,P=(1-w.y)*innerHeight/2;T.element.hidden=w.z<-1||w.z>1||R<0||R>innerWidth||P<0||P>innerHeight,T.element.hidden||m.push({id:g,x:R,y:P-8,width:T.width,height:T.element.offsetHeight})}let x=document.getElementById("hud")?.getBoundingClientRect(),v=g0(m,{width:innerWidth,height:innerHeight},x?[{left:x.left,top:x.top,width:x.width,height:x.height}]:[]);for(let[g,_]of v){let T=a.get(g);T.element.style.left=_.left+"px",T.element.style.top=_.top+"px",T.element.dataset.side=_.side,T.element.style.setProperty("--speaker-x",_.anchorX-_.left-24+"px");let I=_.side==="above"?_.anchorY-_.top-_.height+10:_.top-_.anchorY+10;T.element.style.setProperty("--tail-height",I/(22/24)+"px")}},dispose(){r.remove(),i.remove(),document.fonts.delete(t),a.clear()}}}function x0(n,e,t){return!e||!t||Math.hypot(e.x-t.x,e.z-t.z)<=.02?!1:Math.hypot(n.x-e.x,n.z-e.z)>.8}function v0(n,e,t){return{x:Math.round((e-n.origin.x)/n.step),z:Math.round((t-n.origin.z)/n.step)}}function pl(n,e,t){return e<0||t<0||e>=n.width||t>=n.height?-1:t*n.width+e}function $a(n,e,t){let i=pl(n,e,t);return i>=0&&n.cells[i]!==null}function ml(n,e){return{x:n.origin.x+e.x*n.step,z:n.origin.z+e.z*n.step,y:n.cells[pl(n,e.x,e.z)]}}function gl(n,e){let t=v0(n,e.x,e.z);if($a(n,t.x,t.z))return t;let i=null,r=1/0;for(let s=0;s<n.height;s++)for(let a=0;a<n.width;a++)if($a(n,a,s)){let o=(a-t.x)**2+(s-t.z)**2;o<r&&(r=o,i={x:a,z:s})}return i}function ip(n,e,t){let i=gl(n,e),r=v0(n,t.x,t.z);if(!i||!$a(n,r.x,r.z))return[];let s=pl(n,i.x,i.z),a=pl(n,r.x,r.z),o=new Set([s]),c=new Map,l=new Map([[s,0]]),u=h=>Math.hypot(h%n.width-r.x,Math.floor(h/n.width)-r.z);for(;o.size;){let h=-1,d=1/0;for(let v of o){let g=l.get(v)+u(v);g<d&&(d=g,h=v)}if(h===a){let v=[];for(;h!==s;)v.push(ml(n,{x:h%n.width,z:Math.floor(h/n.width)})),h=c.get(h);return v.reverse()}o.delete(h);let m=h%n.width,x=Math.floor(h/n.width);for(let[v,g]of[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]){let _=m+v,T=x+g,I=pl(n,_,T);if(!$a(n,_,T)||Math.abs(n.cells[I]-n.cells[h])>.35||v&&g&&(!$a(n,m+v,x)||!$a(n,m,x+g)))continue;let E=l.get(h)+Math.hypot(v,g);E>=(l.get(I)??1/0)||(c.set(I,h),l.set(I,E),o.add(I))}}return[]}function rp(n,e,t,i=3.5,r=()=>{}){let s=Math.max(0,t)*i,a=0,o=0,c=0;for(;e.length&&s>0;){let l=e[0],u=l.x-n.x,h=l.z-n.z,d=Math.hypot(u,h);if(d<1e-6){e.shift();continue}let m=Math.min(d,s);o=u/d,c=h/d,n.x+=o*m,n.z+=c*m,n.y=(n.y??0)+((l.y??n.y??0)-(n.y??0))*(m/d),r({...n}),a+=m,s-=m,m>=d-1e-6&&e.shift()}return{moving:a>1e-5,dx:o,dz:c}}function y0(n,e,t,i){let r=n*t.x+e*t.z,s=n*i.x+e*i.z;return(Math.round((Math.PI-Math.atan2(s,r))/(Math.PI/4))%8+8)%8}var Fs=new URL(new URLSearchParams(location.search).has("frame_id")?"/.proxy/assets/sky/":"./assets/sky/",location.href);async function S0(n){let e=new Zu({canvas:n,antialias:!1,alpha:!1});e.setPixelRatio(Math.min(devicePixelRatio,2)),e.setClearColor(2104088),e.outputColorSpace=nn;let t=new Do,i=new Xi(-12,12,8,-8,.1,150),r=new Map,s=await fetch(new URL("characters.json",Fs)).then(ie=>ie.json()),o=(await new $u().loadAsync(new URL("anterose.gltf",Fs).href)).scene;t.add(o),o.traverse(ie=>{if(ie.isMesh){let Te=Array.isArray(ie.material)?ie.material:[ie.material];for(let K of Te)K.map&&(K.map.magFilter=Yt,K.map.minFilter=jt,K.map.needsUpdate=!0)}});let c=await fetch(new URL("navigation.json",Fs)).then(ie=>ie.json()),l=await _0(Fs),u=c.spawn??ml(c,gl(c,{x:0,z:0})),h=new Qo,d=new ht,m=new Set,x=0,v=[],g=ie=>{v.push({...ie,sequence:++x}),v.length>1024&&v.shift()},_=[],T=0,I=Math.atan2(11,13),E=null,w=8,R=new Z(u.x,u.y,u.z),P=null,y=performance.now(),N=!1,k=new Cs,W=new Map,q=new cn(new Xo(.15,.22,24),new Hn({color:16767364,side:Un,transparent:!0,opacity:.8}));q.rotation.x=-Math.PI/2,q.visible=!1,t.add(q);async function ee(ie){let Te=r.get(ie.id),K=s[ie.character]?ie.character:"Estelle";if(Te&&Te.character===K)return Te.target={x:ie.x,y:ie.y??0,z:ie.z},Te;Te&&(t.remove(Te.mesh),Te.mesh.geometry.dispose(),Te.mesh.material.map.dispose(),Te.mesh.material.dispose());let $=s[K];W.has(K)||W.set(K,k.loadAsync(new URL($.texture,Fs).href));let be=await W.get(K),Ie=be.clone();Ie.colorSpace=nn,Ie.magFilter=Yt,Ie.minFilter=Yt,Ie.generateMipmaps=!1,Ie.repeat.set(1/$.columns,1/$.rows),Ie.needsUpdate=!0;let de=new Rs($.height*$.frameWidth/$.frameHeight,$.height);de.translate(0,$.height/2,0);let Ke=new cn(de,new Hn({map:Ie,transparent:!0,alphaTest:.15,depthWrite:!0,side:Un}));return t.add(Ke),Te={mesh:Ke,character:K,info:$,position:{x:ie.x??u.x,y:ie.y??u.y,z:ie.z??u.z},target:null,direction:6,heading:{dx:0,dz:-1},time:0},r.set(ie.id,Te),Te}function X(){let ie=innerWidth/innerHeight;i.left=-w*ie,i.right=w*ie,i.top=w,i.bottom=-w,i.updateProjectionMatrix(),e.setSize(innerWidth,innerHeight,!1)}function Q(ie){ie.target.closest?.("input,textarea,select,[contenteditable]")||["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," ","z","q","s","d","w","a","e","r"].includes(ie.key)&&(ie.preventDefault(),m.add(ie.key.toLowerCase()))}function oe(ie){m.delete(ie.key.toLowerCase())}function re(){m.clear(),he()}function me(ie){if(ie.button!==0)return;d.set(ie.clientX/innerWidth*2-1,-ie.clientY/innerHeight*2+1),h.setFromCamera(d,i);let Te=h.intersectObject(o,!0);if(!Te.length)return;let K=r.get(P);if(K)for(let $ of Te){let be=gl(c,$.point);if(!be)continue;let Ie=ml(c,be);if(Math.hypot(Ie.x-$.point.x,Ie.z-$.point.z)>c.step*1.5||Math.abs(Ie.y-$.point.y)>.3)continue;let de=ip(c,K.position,Ie);if(de.length){_=de,q.position.set(Ie.x,Ie.y+.03,Ie.z),q.visible=!0;break}}}function ne(ie){if(ie.button!==2){me(ie);return}ie.preventDefault(),E={id:ie.pointerId,x:ie.clientX,y:ie.clientY},n.setPointerCapture(ie.pointerId)}function le(ie){!E||ie.pointerId!==E.id||(T-=(ie.clientX-E.x)*.006,I=Xa.clamp(I+(ie.clientY-E.y)*.005,Math.PI/9,Math.PI*5/12),E.x=ie.clientX,E.y=ie.clientY)}function he(){let ie=E;E=null,ie&&n.hasPointerCapture(ie.id)&&n.releasePointerCapture(ie.id)}function Ge(ie){ie.preventDefault()}function Ne(ie){ie.preventDefault(),w=Xa.clamp(w+ie.deltaY*.005,4,15),X()}n.addEventListener("pointerdown",ne),n.addEventListener("pointermove",le),n.addEventListener("pointerup",he),n.addEventListener("pointercancel",he),n.addEventListener("lostpointercapture",he),n.addEventListener("contextmenu",Ge),n.addEventListener("wheel",Ne,{passive:!1}),addEventListener("keydown",Q),addEventListener("keyup",oe),addEventListener("blur",re),addEventListener("resize",X),X();function vt(ie){if(N)return;if(ie-y<33){requestAnimationFrame(vt);return}let Te=Math.min((ie-y)/1e3,.1);y=ie;let K=r.get(P);m.has("e")&&(T+=Te*1.5),m.has("r")&&(T-=Te*1.5),i.position.set(R.x+Math.sin(T)*Math.cos(I)*17,R.y+Math.sin(I)*17,R.z-Math.cos(T)*Math.cos(I)*17),i.lookAt(R),i.updateMatrixWorld();let $={x:i.matrixWorld.elements[0],z:i.matrixWorld.elements[2]},be=new Z;if(i.getWorldDirection(be),be.y=0,be.normalize(),K){let Ie=Number(m.has("arrowright")||m.has("d"))-Number(m.has("arrowleft")||m.has("q")||m.has("a")),de=Number(m.has("arrowup")||m.has("z")||m.has("w"))-Number(m.has("arrowdown")||m.has("s"));if(Ie||de){let Ke=Math.hypot(Ie,de),Rt=($.x*Ie+be.x*de)/Ke,it=($.z*Ie+be.z*de)/Ke;_=ip(c,K.position,{x:K.position.x+Rt*.6,z:K.position.z+it*.6}),q.visible=!1}}for(let[Ie,de]of r){let Ke=Ie===P?rp(de.position,_,Te,void 0,g):rp(de.position,de.target?[de.target]:[],Te,6);Ke.moving?(de.heading={dx:Ke.dx,dz:Ke.dz},de.time+=Te):de.time=0,de.direction=y0(de.heading.dx,de.heading.dz,$,be);let Rt=Ke.moving?de.info.run:de.info.idle,it=Rt[Math.floor(de.time*de.info.fps)%Rt.length],pt=it*8+de.direction%(de.info.directions??8);de.mesh.material.map.offset.set(pt%de.info.columns/de.info.columns,1-(Math.floor(pt/de.info.columns)+1)/de.info.rows),de.mesh.position.set(de.position.x,de.position.y,de.position.z),de.mesh.rotation.y=Math.atan2(i.position.x-de.position.x,i.position.z-de.position.z)}K&&R.lerp(new Z(K.position.x,K.position.y,K.position.z),1-Math.exp(-Te*7)),_.length||(q.visible=!1),l.update(ie,r,i),e.render(t,i),requestAnimationFrame(vt)}return requestAnimationFrame(vt),{spawn:u,catalogue:s,messages(ie){l.receive(ie)},say(ie){},async demoConversation(){},async me(ie){P=ie.id,await ee({...u,...ie})},async sync(ie){let Te=new Set([P]);for(let K of ie)K.id!==P&&(Te.add(K.id),await ee(K));for(let[K,$]of r)Te.has(K)||(t.remove($.mesh),$.mesh.geometry.dispose(),$.mesh.material.map.dispose(),$.mesh.material.dispose(),r.delete(K))},correct(ie,Te){let K=r.get(P);K&&x0(K.position,ie,Te)&&(Object.assign(K.position,ie),_=[],v=[])},movement(){return{...this.position(),trace:v.map(ie=>({...ie})),sequence:x}},acknowledgeMovement(ie){v=v.filter(Te=>Te.sequence>ie)},screenPoint(ie){let Te=new Z(ie.x,ie.y,ie.z).project(i);return{x:(Te.x+1)*innerWidth/2,y:(1-Te.y)*innerHeight/2}},cameraAngles(){return{yaw:T,pitch:I}},position(){return r.get(P)?.position??u},dispose(){N=!0,he(),n.removeEventListener("pointerdown",ne),n.removeEventListener("pointermove",le),n.removeEventListener("pointerup",he),n.removeEventListener("pointercancel",he),n.removeEventListener("lostpointercapture",he),n.removeEventListener("contextmenu",Ge),n.removeEventListener("wheel",Ne),removeEventListener("keydown",Q),removeEventListener("keyup",oe),removeEventListener("blur",re),removeEventListener("resize",X),l.dispose(),e.dispose()}}}var sp=window.__CLIENT_ID__||"__CLIENT_ID__",E0=new URLSearchParams(location.search).has("frame_id"),VT=!1,Bs=document.getElementById("bandeau"),GT=document.getElementById("scene"),ap=window.__API_BASE__||(E0?"/.proxy/api":"/api"),op=n=>ap.endsWith(".php")?ap+"?r="+n:ap+"/"+n,_l=n=>{Bs.textContent=n},rn={salon:"local",moi:null,token:null,character:"Estelle",messageCursor:0},$i;function b0(n){let e=new Uint8Array(n),t="";for(let i of e)t+=String.fromCharCode(i);return btoa(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}async function HT(){let n=b0(crypto.getRandomValues(new Uint8Array(32))),e=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(n));return{verifieur:n,defi:b0(e)}}function M0(n,e,t){return Promise.race([n,new Promise((i,r)=>{setTimeout(()=>r(new Error(`${t} (${e/1e3} s)`)),e)})])}async function WT(){let n=new vo(sp);_l(`1/4 SDK, client ${sp}`),await M0(n.ready(),1e4,"Discord n a pas repondu (SDK)"),_l("2/4 SDK pret, autorisation...");let{verifieur:e,defi:t}=await HT(),{code:i}=await M0(n.commands.authorize({client_id:sp,response_type:"code",state:"",prompt:"none",scope:["identify"],code_challenge:t,code_challenge_method:"S256"}),15e3,"Discord n a pas repondu (autorisation)");_l("3/4 code recu, jeton...");let r=await fetch(op("token"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({code:i,code_verifier:e})}),{access_token:s,erreur:a}=await r.json();if(!s)throw new Error(a??`jeton absent (HTTP ${r.status})`);_l("4/4 jeton recu, identification...");let o=await n.commands.authenticate({access_token:s});rn.salon=n.channelId??"local";let c=await fetch(op("profile"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+s},body:JSON.stringify({channel:rn.salon,guild:n.guildId})}),l=await c.json();if(!c.ok)throw new Error(l.erreur??"Personnage indisponible");rn.token=l.activity_token,rn.messageCursor=l.messageCursor??0,rn.character=l.character,rn.moi={id:o.user.id,nom:rn.character,character:rn.character,...l.player},Bs.textContent=`Connecte : ${rn.moi.nom}
Salon ${rn.salon}`}async function XT(){if(!rn.token)return;let n=$i.movement(),e=await fetch(op("state"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+rn.token},body:JSON.stringify({...n,after:rn.messageCursor})}),t=await e.json();if(!e.ok)throw new Error(t.erreur??"Connexion perdue");$i.acknowledgeMovement(n.sequence),$i.correct(t.position,n),await $i.sync(t.joueurs),$i.messages(t.messages??[]),rn.messageCursor=t.messageCursor??rn.messageCursor,t.character&&t.character!==rn.character&&(rn.character=t.character,await $i.me({...rn.moi,...$i.position(),character:t.character}),Bs.textContent="Votre personnage du jour : "+t.character)}async function qT(){if(!E0&&!VT){Bs.textContent="Ouvrez cette activit\xE9 depuis Discord.";return}_l("Chargement du restaurant Ant\xE9rose\u2026"),$i=await S0(GT),sg(new URL("music/anterose.ogg",Fs)),await WT(),await $i.me({...rn.moi,character:rn.character}),Bs.textContent="Votre personnage du jour : "+rn.character+($i.catalogue[rn.character]?"":" \xB7 sprite Estelle provisoire");async function n(){try{await XT()}catch(e){Bs.textContent=e.message}setTimeout(n,150)}n()}qT().catch(n=>{Bs.textContent="Chargement impossible : "+n.message,console.error(n)});
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/

var B0=Object.defineProperty;var k0=(n,e)=>{for(var t in e)B0(n,t,{get:e[t],enumerable:!0})};var Qa=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function eo(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var Nl={exports:{}};var gp;function _p(){return gp?Nl.exports:(gp=1,(function(n){var e=Object.prototype.hasOwnProperty,t="~";function i(){}Object.create&&(i.prototype=Object.create(null),new i().__proto__||(t=!1));function r(c,l,u){this.fn=c,this.context=l,this.once=u||!1}function s(c,l,u,h,d){if(typeof u!="function")throw new TypeError("The listener must be a function");var m=new r(u,h||c,d),x=t?t+l:l;return c._events[x]?c._events[x].fn?c._events[x]=[c._events[x],m]:c._events[x].push(m):(c._events[x]=m,c._eventsCount++),c}function a(c,l){--c._eventsCount===0?c._events=new i:delete c._events[l]}function o(){this._events=new i,this._eventsCount=0}o.prototype.eventNames=function(){var l=[],u,h;if(this._eventsCount===0)return l;for(h in u=this._events)e.call(u,h)&&l.push(t?h.slice(1):h);return Object.getOwnPropertySymbols?l.concat(Object.getOwnPropertySymbols(u)):l},o.prototype.listeners=function(l){var u=t?t+l:l,h=this._events[u];if(!h)return[];if(h.fn)return[h.fn];for(var d=0,m=h.length,x=new Array(m);d<m;d++)x[d]=h[d].fn;return x},o.prototype.listenerCount=function(l){var u=t?t+l:l,h=this._events[u];return h?h.fn?1:h.length:0},o.prototype.emit=function(l,u,h,d,m,x){var v=t?t+l:l;if(!this._events[v])return!1;var g=this._events[v],_=arguments.length,T,I;if(g.fn){switch(g.once&&this.removeListener(l,g.fn,void 0,!0),_){case 1:return g.fn.call(g.context),!0;case 2:return g.fn.call(g.context,u),!0;case 3:return g.fn.call(g.context,u,h),!0;case 4:return g.fn.call(g.context,u,h,d),!0;case 5:return g.fn.call(g.context,u,h,d,m),!0;case 6:return g.fn.call(g.context,u,h,d,m,x),!0}for(I=1,T=new Array(_-1);I<_;I++)T[I-1]=arguments[I];g.fn.apply(g.context,T)}else{var E=g.length,w;for(I=0;I<E;I++)switch(g[I].once&&this.removeListener(l,g[I].fn,void 0,!0),_){case 1:g[I].fn.call(g[I].context);break;case 2:g[I].fn.call(g[I].context,u);break;case 3:g[I].fn.call(g[I].context,u,h);break;case 4:g[I].fn.call(g[I].context,u,h,d);break;default:if(!T)for(w=1,T=new Array(_-1);w<_;w++)T[w-1]=arguments[w];g[I].fn.apply(g[I].context,T)}}return!0},o.prototype.on=function(l,u,h){return s(this,l,u,h,!1)},o.prototype.once=function(l,u,h){return s(this,l,u,h,!0)},o.prototype.removeListener=function(l,u,h,d){var m=t?t+l:l;if(!this._events[m])return this;if(!u)return a(this,m),this;var x=this._events[m];if(x.fn)x.fn===u&&(!d||x.once)&&(!h||x.context===h)&&a(this,m);else{for(var v=0,g=[],_=x.length;v<_;v++)(x[v].fn!==u||d&&!x[v].once||h&&x[v].context!==h)&&g.push(x[v]);g.length?this._events[m]=g.length===1?g[0]:g:a(this,m)}return this},o.prototype.removeAllListeners=function(l){var u;return l?(u=t?t+l:l,this._events[u]&&a(this,u)):(this._events=new i,this._eventsCount=0),this},o.prototype.off=o.prototype.removeListener,o.prototype.addListener=o.prototype.on,o.prefixed=t,o.EventEmitter=o,n.exports=o})(Nl),Nl.exports)}var z0=_p(),ch=eo(z0);var Tt;(function(n){n.assertEqual=r=>r;function e(r){}n.assertIs=e;function t(r){throw new Error}n.assertNever=t,n.arrayToEnum=r=>{let s={};for(let a of r)s[a]=a;return s},n.getValidEnumValues=r=>{let s=n.objectKeys(r).filter(o=>typeof r[r[o]]!="number"),a={};for(let o of s)a[o]=r[o];return n.objectValues(a)},n.objectValues=r=>n.objectKeys(r).map(function(s){return r[s]}),n.objectKeys=typeof Object.keys=="function"?r=>Object.keys(r):r=>{let s=[];for(let a in r)Object.prototype.hasOwnProperty.call(r,a)&&s.push(a);return s},n.find=(r,s)=>{for(let a of r)if(s(a))return a},n.isInteger=typeof Number.isInteger=="function"?r=>Number.isInteger(r):r=>typeof r=="number"&&isFinite(r)&&Math.floor(r)===r;function i(r,s=" | "){return r.map(a=>typeof a=="string"?`'${a}'`:a).join(s)}n.joinValues=i,n.jsonStringifyReplacer=(r,s)=>typeof s=="bigint"?s.toString():s})(Tt||(Tt={}));var hh;(function(n){n.mergeShapes=(e,t)=>({...e,...t})})(hh||(hh={}));var Le=Tt.arrayToEnum(["string","nan","number","integer","float","boolean","date","bigint","symbol","function","undefined","null","array","object","unknown","promise","void","never","map","set"]),wr=n=>{switch(typeof n){case"undefined":return Le.undefined;case"string":return Le.string;case"number":return isNaN(n)?Le.nan:Le.number;case"boolean":return Le.boolean;case"function":return Le.function;case"bigint":return Le.bigint;case"symbol":return Le.symbol;case"object":return Array.isArray(n)?Le.array:n===null?Le.null:n.then&&typeof n.then=="function"&&n.catch&&typeof n.catch=="function"?Le.promise:typeof Map<"u"&&n instanceof Map?Le.map:typeof Set<"u"&&n instanceof Set?Le.set:typeof Date<"u"&&n instanceof Date?Le.date:Le.object;default:return Le.unknown}},_e=Tt.arrayToEnum(["invalid_type","invalid_literal","custom","invalid_union","invalid_union_discriminator","invalid_enum_value","unrecognized_keys","invalid_arguments","invalid_return_type","invalid_date","invalid_string","too_small","too_big","invalid_intersection_types","not_multiple_of","not_finite"]),V0=n=>JSON.stringify(n,null,2).replace(/"([^"]+)":/g,"$1:"),Zn=class n extends Error{constructor(e){super(),this.issues=[],this.addIssue=i=>{this.issues=[...this.issues,i]},this.addIssues=(i=[])=>{this.issues=[...this.issues,...i]};let t=new.target.prototype;Object.setPrototypeOf?Object.setPrototypeOf(this,t):this.__proto__=t,this.name="ZodError",this.issues=e}get errors(){return this.issues}format(e){let t=e||function(s){return s.message},i={_errors:[]},r=s=>{for(let a of s.issues)if(a.code==="invalid_union")a.unionErrors.map(r);else if(a.code==="invalid_return_type")r(a.returnTypeError);else if(a.code==="invalid_arguments")r(a.argumentsError);else if(a.path.length===0)i._errors.push(t(a));else{let o=i,c=0;for(;c<a.path.length;){let l=a.path[c];c===a.path.length-1?(o[l]=o[l]||{_errors:[]},o[l]._errors.push(t(a))):o[l]=o[l]||{_errors:[]},o=o[l],c++}}};return r(this),i}static assert(e){if(!(e instanceof n))throw new Error(`Not a ZodError: ${e}`)}toString(){return this.message}get message(){return JSON.stringify(this.issues,Tt.jsonStringifyReplacer,2)}get isEmpty(){return this.issues.length===0}flatten(e=t=>t.message){let t={},i=[];for(let r of this.issues)r.path.length>0?(t[r.path[0]]=t[r.path[0]]||[],t[r.path[0]].push(e(r))):i.push(e(r));return{formErrors:i,fieldErrors:t}}get formErrors(){return this.flatten()}};Zn.create=n=>new Zn(n);var Ys=(n,e)=>{let t;switch(n.code){case _e.invalid_type:n.received===Le.undefined?t="Required":t=`Expected ${n.expected}, received ${n.received}`;break;case _e.invalid_literal:t=`Invalid literal value, expected ${JSON.stringify(n.expected,Tt.jsonStringifyReplacer)}`;break;case _e.unrecognized_keys:t=`Unrecognized key(s) in object: ${Tt.joinValues(n.keys,", ")}`;break;case _e.invalid_union:t="Invalid input";break;case _e.invalid_union_discriminator:t=`Invalid discriminator value. Expected ${Tt.joinValues(n.options)}`;break;case _e.invalid_enum_value:t=`Invalid enum value. Expected ${Tt.joinValues(n.options)}, received '${n.received}'`;break;case _e.invalid_arguments:t="Invalid function arguments";break;case _e.invalid_return_type:t="Invalid function return type";break;case _e.invalid_date:t="Invalid date";break;case _e.invalid_string:typeof n.validation=="object"?"includes"in n.validation?(t=`Invalid input: must include "${n.validation.includes}"`,typeof n.validation.position=="number"&&(t=`${t} at one or more positions greater than or equal to ${n.validation.position}`)):"startsWith"in n.validation?t=`Invalid input: must start with "${n.validation.startsWith}"`:"endsWith"in n.validation?t=`Invalid input: must end with "${n.validation.endsWith}"`:Tt.assertNever(n.validation):n.validation!=="regex"?t=`Invalid ${n.validation}`:t="Invalid";break;case _e.too_small:n.type==="array"?t=`Array must contain ${n.exact?"exactly":n.inclusive?"at least":"more than"} ${n.minimum} element(s)`:n.type==="string"?t=`String must contain ${n.exact?"exactly":n.inclusive?"at least":"over"} ${n.minimum} character(s)`:n.type==="number"?t=`Number must be ${n.exact?"exactly equal to ":n.inclusive?"greater than or equal to ":"greater than "}${n.minimum}`:n.type==="date"?t=`Date must be ${n.exact?"exactly equal to ":n.inclusive?"greater than or equal to ":"greater than "}${new Date(Number(n.minimum))}`:t="Invalid input";break;case _e.too_big:n.type==="array"?t=`Array must contain ${n.exact?"exactly":n.inclusive?"at most":"less than"} ${n.maximum} element(s)`:n.type==="string"?t=`String must contain ${n.exact?"exactly":n.inclusive?"at most":"under"} ${n.maximum} character(s)`:n.type==="number"?t=`Number must be ${n.exact?"exactly":n.inclusive?"less than or equal to":"less than"} ${n.maximum}`:n.type==="bigint"?t=`BigInt must be ${n.exact?"exactly":n.inclusive?"less than or equal to":"less than"} ${n.maximum}`:n.type==="date"?t=`Date must be ${n.exact?"exactly":n.inclusive?"smaller than or equal to":"smaller than"} ${new Date(Number(n.maximum))}`:t="Invalid input";break;case _e.custom:t="Invalid input";break;case _e.invalid_intersection_types:t="Intersection results could not be merged";break;case _e.not_multiple_of:t=`Number must be a multiple of ${n.multipleOf}`;break;case _e.not_finite:t="Number must be finite";break;default:t=e.defaultError,Tt.assertNever(n)}return{message:t}},yp=Ys;function G0(n){yp=n}function Ll(){return yp}var Dl=n=>{let{data:e,path:t,errorMaps:i,issueData:r}=n,s=[...t,...r.path||[]],a={...r,path:s};if(r.message!==void 0)return{...r,path:s,message:r.message};let o="",c=i.filter(l=>!!l).slice().reverse();for(let l of c)o=l(a,{data:e,defaultError:o}).message;return{...r,path:s,message:o}},H0=[];function Ce(n,e){let t=Ll(),i=Dl({issueData:e,data:n.data,path:n.path,errorMaps:[n.common.contextualErrorMap,n.schemaErrorMap,t,t===Ys?void 0:Ys].filter(r=>!!r)});n.common.issues.push(i)}var Tn=class n{constructor(){this.value="valid"}dirty(){this.value==="valid"&&(this.value="dirty")}abort(){this.value!=="aborted"&&(this.value="aborted")}static mergeArray(e,t){let i=[];for(let r of t){if(r.status==="aborted")return nt;r.status==="dirty"&&e.dirty(),i.push(r.value)}return{status:e.value,value:i}}static async mergeObjectAsync(e,t){let i=[];for(let r of t){let s=await r.key,a=await r.value;i.push({key:s,value:a})}return n.mergeObjectSync(e,i)}static mergeObjectSync(e,t){let i={};for(let r of t){let{key:s,value:a}=r;if(s.status==="aborted"||a.status==="aborted")return nt;s.status==="dirty"&&e.dirty(),a.status==="dirty"&&e.dirty(),s.value!=="__proto__"&&(typeof a.value<"u"||r.alwaysSet)&&(i[s.value]=a.value)}return{status:e.value,value:i}}},nt=Object.freeze({status:"aborted"}),qs=n=>({status:"dirty",value:n}),Pn=n=>({status:"valid",value:n}),dh=n=>n.status==="aborted",fh=n=>n.status==="dirty",io=n=>n.status==="valid",ro=n=>typeof Promise<"u"&&n instanceof Promise;function Ul(n,e,t,i){if(typeof e=="function"?n!==e||!i:!e.has(n))throw new TypeError("Cannot read private member from an object whose class did not declare it");return e.get(n)}function Sp(n,e,t,i,r){if(typeof e=="function"?n!==e||!r:!e.has(n))throw new TypeError("Cannot write private member to an object whose class did not declare it");return e.set(n,t),t}var Ye;(function(n){n.errToObj=e=>typeof e=="string"?{message:e}:e||{},n.toString=e=>typeof e=="string"?e:e?.message})(Ye||(Ye={}));var to,no,hi=class{constructor(e,t,i,r){this._cachedPath=[],this.parent=e,this.data=t,this._path=i,this._key=r}get path(){return this._cachedPath.length||(this._key instanceof Array?this._cachedPath.push(...this._path,...this._key):this._cachedPath.push(...this._path,this._key)),this._cachedPath}},xp=(n,e)=>{if(io(e))return{success:!0,data:e.value};if(!n.common.issues.length)throw new Error("Validation failed but no issues detected.");return{success:!1,get error(){if(this._error)return this._error;let t=new Zn(n.common.issues);return this._error=t,this._error}}};function ut(n){if(!n)return{};let{errorMap:e,invalid_type_error:t,required_error:i,description:r}=n;if(e&&(t||i))throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);return e?{errorMap:e,description:r}:{errorMap:(a,o)=>{var c,l;let{message:u}=n;return a.code==="invalid_enum_value"?{message:u??o.defaultError}:typeof o.data>"u"?{message:(c=u??i)!==null&&c!==void 0?c:o.defaultError}:a.code!=="invalid_type"?{message:o.defaultError}:{message:(l=u??t)!==null&&l!==void 0?l:o.defaultError}},description:r}}var ht=class{constructor(e){this.spa=this.safeParseAsync,this._def=e,this.parse=this.parse.bind(this),this.safeParse=this.safeParse.bind(this),this.parseAsync=this.parseAsync.bind(this),this.safeParseAsync=this.safeParseAsync.bind(this),this.spa=this.spa.bind(this),this.refine=this.refine.bind(this),this.refinement=this.refinement.bind(this),this.superRefine=this.superRefine.bind(this),this.optional=this.optional.bind(this),this.nullable=this.nullable.bind(this),this.nullish=this.nullish.bind(this),this.array=this.array.bind(this),this.promise=this.promise.bind(this),this.or=this.or.bind(this),this.and=this.and.bind(this),this.transform=this.transform.bind(this),this.brand=this.brand.bind(this),this.default=this.default.bind(this),this.catch=this.catch.bind(this),this.describe=this.describe.bind(this),this.pipe=this.pipe.bind(this),this.readonly=this.readonly.bind(this),this.isNullable=this.isNullable.bind(this),this.isOptional=this.isOptional.bind(this)}get description(){return this._def.description}_getType(e){return wr(e.data)}_getOrReturnCtx(e,t){return t||{common:e.parent.common,data:e.data,parsedType:wr(e.data),schemaErrorMap:this._def.errorMap,path:e.path,parent:e.parent}}_processInputParams(e){return{status:new Tn,ctx:{common:e.parent.common,data:e.data,parsedType:wr(e.data),schemaErrorMap:this._def.errorMap,path:e.path,parent:e.parent}}}_parseSync(e){let t=this._parse(e);if(ro(t))throw new Error("Synchronous parse encountered promise.");return t}_parseAsync(e){let t=this._parse(e);return Promise.resolve(t)}parse(e,t){let i=this.safeParse(e,t);if(i.success)return i.data;throw i.error}safeParse(e,t){var i;let r={common:{issues:[],async:(i=t?.async)!==null&&i!==void 0?i:!1,contextualErrorMap:t?.errorMap},path:t?.path||[],schemaErrorMap:this._def.errorMap,parent:null,data:e,parsedType:wr(e)},s=this._parseSync({data:e,path:r.path,parent:r});return xp(r,s)}async parseAsync(e,t){let i=await this.safeParseAsync(e,t);if(i.success)return i.data;throw i.error}async safeParseAsync(e,t){let i={common:{issues:[],contextualErrorMap:t?.errorMap,async:!0},path:t?.path||[],schemaErrorMap:this._def.errorMap,parent:null,data:e,parsedType:wr(e)},r=this._parse({data:e,path:i.path,parent:i}),s=await(ro(r)?r:Promise.resolve(r));return xp(i,s)}refine(e,t){let i=r=>typeof t=="string"||typeof t>"u"?{message:t}:typeof t=="function"?t(r):t;return this._refinement((r,s)=>{let a=e(r),o=()=>s.addIssue({code:_e.custom,...i(r)});return typeof Promise<"u"&&a instanceof Promise?a.then(c=>c?!0:(o(),!1)):a?!0:(o(),!1)})}refinement(e,t){return this._refinement((i,r)=>e(i)?!0:(r.addIssue(typeof t=="function"?t(i,r):t),!1))}_refinement(e){return new Kn({schema:this,typeName:$e.ZodEffects,effect:{type:"refinement",refinement:e}})}superRefine(e){return this._refinement(e)}optional(){return ui.create(this,this._def)}nullable(){return Ui.create(this,this._def)}nullish(){return this.nullable().optional()}array(){return ir.create(this,this._def)}promise(){return Cr.create(this,this._def)}or(e){return rs.create([this,e],this._def)}and(e){return ss.create(this,e,this._def)}transform(e){return new Kn({...ut(this._def),schema:this,typeName:$e.ZodEffects,effect:{type:"transform",transform:e}})}default(e){let t=typeof e=="function"?e:()=>e;return new us({...ut(this._def),innerType:this,defaultValue:t,typeName:$e.ZodDefault})}brand(){return new so({typeName:$e.ZodBranded,type:this,...ut(this._def)})}catch(e){let t=typeof e=="function"?e:()=>e;return new hs({...ut(this._def),innerType:this,catchValue:t,typeName:$e.ZodCatch})}describe(e){let t=this.constructor;return new t({...this._def,description:e})}pipe(e){return ao.create(this,e)}readonly(){return ds.create(this)}isOptional(){return this.safeParse(void 0).success}isNullable(){return this.safeParse(null).success}},W0=/^c[^\s-]{8,}$/i,X0=/^[0-9a-z]+$/,q0=/^[0-9A-HJKMNP-TV-Z]{26}$/,Y0=/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,Z0=/^[a-z0-9_-]{21}$/i,K0=/^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,j0=/^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,$0="^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$",uh,J0=/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,Q0=/^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,ex=/^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,bp="((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))",tx=new RegExp(`^${bp}$`);function Mp(n){let e="([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d";return n.precision?e=`${e}\\.\\d{${n.precision}}`:n.precision==null&&(e=`${e}(\\.\\d+)?`),e}function nx(n){return new RegExp(`^${Mp(n)}$`)}function Ep(n){let e=`${bp}T${Mp(n)}`,t=[];return t.push(n.local?"Z?":"Z"),n.offset&&t.push("([+-]\\d{2}:?\\d{2})"),e=`${e}(${t.join("|")})`,new RegExp(`^${e}$`)}function ix(n,e){return!!((e==="v4"||!e)&&J0.test(n)||(e==="v6"||!e)&&Q0.test(n))}var Rr=class n extends ht{_parse(e){if(this._def.coerce&&(e.data=String(e.data)),this._getType(e)!==Le.string){let s=this._getOrReturnCtx(e);return Ce(s,{code:_e.invalid_type,expected:Le.string,received:s.parsedType}),nt}let i=new Tn,r;for(let s of this._def.checks)if(s.kind==="min")e.data.length<s.value&&(r=this._getOrReturnCtx(e,r),Ce(r,{code:_e.too_small,minimum:s.value,type:"string",inclusive:!0,exact:!1,message:s.message}),i.dirty());else if(s.kind==="max")e.data.length>s.value&&(r=this._getOrReturnCtx(e,r),Ce(r,{code:_e.too_big,maximum:s.value,type:"string",inclusive:!0,exact:!1,message:s.message}),i.dirty());else if(s.kind==="length"){let a=e.data.length>s.value,o=e.data.length<s.value;(a||o)&&(r=this._getOrReturnCtx(e,r),a?Ce(r,{code:_e.too_big,maximum:s.value,type:"string",inclusive:!0,exact:!0,message:s.message}):o&&Ce(r,{code:_e.too_small,minimum:s.value,type:"string",inclusive:!0,exact:!0,message:s.message}),i.dirty())}else if(s.kind==="email")j0.test(e.data)||(r=this._getOrReturnCtx(e,r),Ce(r,{validation:"email",code:_e.invalid_string,message:s.message}),i.dirty());else if(s.kind==="emoji")uh||(uh=new RegExp($0,"u")),uh.test(e.data)||(r=this._getOrReturnCtx(e,r),Ce(r,{validation:"emoji",code:_e.invalid_string,message:s.message}),i.dirty());else if(s.kind==="uuid")Y0.test(e.data)||(r=this._getOrReturnCtx(e,r),Ce(r,{validation:"uuid",code:_e.invalid_string,message:s.message}),i.dirty());else if(s.kind==="nanoid")Z0.test(e.data)||(r=this._getOrReturnCtx(e,r),Ce(r,{validation:"nanoid",code:_e.invalid_string,message:s.message}),i.dirty());else if(s.kind==="cuid")W0.test(e.data)||(r=this._getOrReturnCtx(e,r),Ce(r,{validation:"cuid",code:_e.invalid_string,message:s.message}),i.dirty());else if(s.kind==="cuid2")X0.test(e.data)||(r=this._getOrReturnCtx(e,r),Ce(r,{validation:"cuid2",code:_e.invalid_string,message:s.message}),i.dirty());else if(s.kind==="ulid")q0.test(e.data)||(r=this._getOrReturnCtx(e,r),Ce(r,{validation:"ulid",code:_e.invalid_string,message:s.message}),i.dirty());else if(s.kind==="url")try{new URL(e.data)}catch{r=this._getOrReturnCtx(e,r),Ce(r,{validation:"url",code:_e.invalid_string,message:s.message}),i.dirty()}else s.kind==="regex"?(s.regex.lastIndex=0,s.regex.test(e.data)||(r=this._getOrReturnCtx(e,r),Ce(r,{validation:"regex",code:_e.invalid_string,message:s.message}),i.dirty())):s.kind==="trim"?e.data=e.data.trim():s.kind==="includes"?e.data.includes(s.value,s.position)||(r=this._getOrReturnCtx(e,r),Ce(r,{code:_e.invalid_string,validation:{includes:s.value,position:s.position},message:s.message}),i.dirty()):s.kind==="toLowerCase"?e.data=e.data.toLowerCase():s.kind==="toUpperCase"?e.data=e.data.toUpperCase():s.kind==="startsWith"?e.data.startsWith(s.value)||(r=this._getOrReturnCtx(e,r),Ce(r,{code:_e.invalid_string,validation:{startsWith:s.value},message:s.message}),i.dirty()):s.kind==="endsWith"?e.data.endsWith(s.value)||(r=this._getOrReturnCtx(e,r),Ce(r,{code:_e.invalid_string,validation:{endsWith:s.value},message:s.message}),i.dirty()):s.kind==="datetime"?Ep(s).test(e.data)||(r=this._getOrReturnCtx(e,r),Ce(r,{code:_e.invalid_string,validation:"datetime",message:s.message}),i.dirty()):s.kind==="date"?tx.test(e.data)||(r=this._getOrReturnCtx(e,r),Ce(r,{code:_e.invalid_string,validation:"date",message:s.message}),i.dirty()):s.kind==="time"?nx(s).test(e.data)||(r=this._getOrReturnCtx(e,r),Ce(r,{code:_e.invalid_string,validation:"time",message:s.message}),i.dirty()):s.kind==="duration"?K0.test(e.data)||(r=this._getOrReturnCtx(e,r),Ce(r,{validation:"duration",code:_e.invalid_string,message:s.message}),i.dirty()):s.kind==="ip"?ix(e.data,s.version)||(r=this._getOrReturnCtx(e,r),Ce(r,{validation:"ip",code:_e.invalid_string,message:s.message}),i.dirty()):s.kind==="base64"?ex.test(e.data)||(r=this._getOrReturnCtx(e,r),Ce(r,{validation:"base64",code:_e.invalid_string,message:s.message}),i.dirty()):Tt.assertNever(s);return{status:i.value,value:e.data}}_regex(e,t,i){return this.refinement(r=>e.test(r),{validation:t,code:_e.invalid_string,...Ye.errToObj(i)})}_addCheck(e){return new n({...this._def,checks:[...this._def.checks,e]})}email(e){return this._addCheck({kind:"email",...Ye.errToObj(e)})}url(e){return this._addCheck({kind:"url",...Ye.errToObj(e)})}emoji(e){return this._addCheck({kind:"emoji",...Ye.errToObj(e)})}uuid(e){return this._addCheck({kind:"uuid",...Ye.errToObj(e)})}nanoid(e){return this._addCheck({kind:"nanoid",...Ye.errToObj(e)})}cuid(e){return this._addCheck({kind:"cuid",...Ye.errToObj(e)})}cuid2(e){return this._addCheck({kind:"cuid2",...Ye.errToObj(e)})}ulid(e){return this._addCheck({kind:"ulid",...Ye.errToObj(e)})}base64(e){return this._addCheck({kind:"base64",...Ye.errToObj(e)})}ip(e){return this._addCheck({kind:"ip",...Ye.errToObj(e)})}datetime(e){var t,i;return typeof e=="string"?this._addCheck({kind:"datetime",precision:null,offset:!1,local:!1,message:e}):this._addCheck({kind:"datetime",precision:typeof e?.precision>"u"?null:e?.precision,offset:(t=e?.offset)!==null&&t!==void 0?t:!1,local:(i=e?.local)!==null&&i!==void 0?i:!1,...Ye.errToObj(e?.message)})}date(e){return this._addCheck({kind:"date",message:e})}time(e){return typeof e=="string"?this._addCheck({kind:"time",precision:null,message:e}):this._addCheck({kind:"time",precision:typeof e?.precision>"u"?null:e?.precision,...Ye.errToObj(e?.message)})}duration(e){return this._addCheck({kind:"duration",...Ye.errToObj(e)})}regex(e,t){return this._addCheck({kind:"regex",regex:e,...Ye.errToObj(t)})}includes(e,t){return this._addCheck({kind:"includes",value:e,position:t?.position,...Ye.errToObj(t?.message)})}startsWith(e,t){return this._addCheck({kind:"startsWith",value:e,...Ye.errToObj(t)})}endsWith(e,t){return this._addCheck({kind:"endsWith",value:e,...Ye.errToObj(t)})}min(e,t){return this._addCheck({kind:"min",value:e,...Ye.errToObj(t)})}max(e,t){return this._addCheck({kind:"max",value:e,...Ye.errToObj(t)})}length(e,t){return this._addCheck({kind:"length",value:e,...Ye.errToObj(t)})}nonempty(e){return this.min(1,Ye.errToObj(e))}trim(){return new n({...this._def,checks:[...this._def.checks,{kind:"trim"}]})}toLowerCase(){return new n({...this._def,checks:[...this._def.checks,{kind:"toLowerCase"}]})}toUpperCase(){return new n({...this._def,checks:[...this._def.checks,{kind:"toUpperCase"}]})}get isDatetime(){return!!this._def.checks.find(e=>e.kind==="datetime")}get isDate(){return!!this._def.checks.find(e=>e.kind==="date")}get isTime(){return!!this._def.checks.find(e=>e.kind==="time")}get isDuration(){return!!this._def.checks.find(e=>e.kind==="duration")}get isEmail(){return!!this._def.checks.find(e=>e.kind==="email")}get isURL(){return!!this._def.checks.find(e=>e.kind==="url")}get isEmoji(){return!!this._def.checks.find(e=>e.kind==="emoji")}get isUUID(){return!!this._def.checks.find(e=>e.kind==="uuid")}get isNANOID(){return!!this._def.checks.find(e=>e.kind==="nanoid")}get isCUID(){return!!this._def.checks.find(e=>e.kind==="cuid")}get isCUID2(){return!!this._def.checks.find(e=>e.kind==="cuid2")}get isULID(){return!!this._def.checks.find(e=>e.kind==="ulid")}get isIP(){return!!this._def.checks.find(e=>e.kind==="ip")}get isBase64(){return!!this._def.checks.find(e=>e.kind==="base64")}get minLength(){let e=null;for(let t of this._def.checks)t.kind==="min"&&(e===null||t.value>e)&&(e=t.value);return e}get maxLength(){let e=null;for(let t of this._def.checks)t.kind==="max"&&(e===null||t.value<e)&&(e=t.value);return e}};Rr.create=n=>{var e;return new Rr({checks:[],typeName:$e.ZodString,coerce:(e=n?.coerce)!==null&&e!==void 0?e:!1,...ut(n)})};function rx(n,e){let t=(n.toString().split(".")[1]||"").length,i=(e.toString().split(".")[1]||"").length,r=t>i?t:i,s=parseInt(n.toFixed(r).replace(".","")),a=parseInt(e.toFixed(r).replace(".",""));return s%a/Math.pow(10,r)}var Jr=class n extends ht{constructor(){super(...arguments),this.min=this.gte,this.max=this.lte,this.step=this.multipleOf}_parse(e){if(this._def.coerce&&(e.data=Number(e.data)),this._getType(e)!==Le.number){let s=this._getOrReturnCtx(e);return Ce(s,{code:_e.invalid_type,expected:Le.number,received:s.parsedType}),nt}let i,r=new Tn;for(let s of this._def.checks)s.kind==="int"?Tt.isInteger(e.data)||(i=this._getOrReturnCtx(e,i),Ce(i,{code:_e.invalid_type,expected:"integer",received:"float",message:s.message}),r.dirty()):s.kind==="min"?(s.inclusive?e.data<s.value:e.data<=s.value)&&(i=this._getOrReturnCtx(e,i),Ce(i,{code:_e.too_small,minimum:s.value,type:"number",inclusive:s.inclusive,exact:!1,message:s.message}),r.dirty()):s.kind==="max"?(s.inclusive?e.data>s.value:e.data>=s.value)&&(i=this._getOrReturnCtx(e,i),Ce(i,{code:_e.too_big,maximum:s.value,type:"number",inclusive:s.inclusive,exact:!1,message:s.message}),r.dirty()):s.kind==="multipleOf"?rx(e.data,s.value)!==0&&(i=this._getOrReturnCtx(e,i),Ce(i,{code:_e.not_multiple_of,multipleOf:s.value,message:s.message}),r.dirty()):s.kind==="finite"?Number.isFinite(e.data)||(i=this._getOrReturnCtx(e,i),Ce(i,{code:_e.not_finite,message:s.message}),r.dirty()):Tt.assertNever(s);return{status:r.value,value:e.data}}gte(e,t){return this.setLimit("min",e,!0,Ye.toString(t))}gt(e,t){return this.setLimit("min",e,!1,Ye.toString(t))}lte(e,t){return this.setLimit("max",e,!0,Ye.toString(t))}lt(e,t){return this.setLimit("max",e,!1,Ye.toString(t))}setLimit(e,t,i,r){return new n({...this._def,checks:[...this._def.checks,{kind:e,value:t,inclusive:i,message:Ye.toString(r)}]})}_addCheck(e){return new n({...this._def,checks:[...this._def.checks,e]})}int(e){return this._addCheck({kind:"int",message:Ye.toString(e)})}positive(e){return this._addCheck({kind:"min",value:0,inclusive:!1,message:Ye.toString(e)})}negative(e){return this._addCheck({kind:"max",value:0,inclusive:!1,message:Ye.toString(e)})}nonpositive(e){return this._addCheck({kind:"max",value:0,inclusive:!0,message:Ye.toString(e)})}nonnegative(e){return this._addCheck({kind:"min",value:0,inclusive:!0,message:Ye.toString(e)})}multipleOf(e,t){return this._addCheck({kind:"multipleOf",value:e,message:Ye.toString(t)})}finite(e){return this._addCheck({kind:"finite",message:Ye.toString(e)})}safe(e){return this._addCheck({kind:"min",inclusive:!0,value:Number.MIN_SAFE_INTEGER,message:Ye.toString(e)})._addCheck({kind:"max",inclusive:!0,value:Number.MAX_SAFE_INTEGER,message:Ye.toString(e)})}get minValue(){let e=null;for(let t of this._def.checks)t.kind==="min"&&(e===null||t.value>e)&&(e=t.value);return e}get maxValue(){let e=null;for(let t of this._def.checks)t.kind==="max"&&(e===null||t.value<e)&&(e=t.value);return e}get isInt(){return!!this._def.checks.find(e=>e.kind==="int"||e.kind==="multipleOf"&&Tt.isInteger(e.value))}get isFinite(){let e=null,t=null;for(let i of this._def.checks){if(i.kind==="finite"||i.kind==="int"||i.kind==="multipleOf")return!0;i.kind==="min"?(t===null||i.value>t)&&(t=i.value):i.kind==="max"&&(e===null||i.value<e)&&(e=i.value)}return Number.isFinite(t)&&Number.isFinite(e)}};Jr.create=n=>new Jr({checks:[],typeName:$e.ZodNumber,coerce:n?.coerce||!1,...ut(n)});var Qr=class n extends ht{constructor(){super(...arguments),this.min=this.gte,this.max=this.lte}_parse(e){if(this._def.coerce&&(e.data=BigInt(e.data)),this._getType(e)!==Le.bigint){let s=this._getOrReturnCtx(e);return Ce(s,{code:_e.invalid_type,expected:Le.bigint,received:s.parsedType}),nt}let i,r=new Tn;for(let s of this._def.checks)s.kind==="min"?(s.inclusive?e.data<s.value:e.data<=s.value)&&(i=this._getOrReturnCtx(e,i),Ce(i,{code:_e.too_small,type:"bigint",minimum:s.value,inclusive:s.inclusive,message:s.message}),r.dirty()):s.kind==="max"?(s.inclusive?e.data>s.value:e.data>=s.value)&&(i=this._getOrReturnCtx(e,i),Ce(i,{code:_e.too_big,type:"bigint",maximum:s.value,inclusive:s.inclusive,message:s.message}),r.dirty()):s.kind==="multipleOf"?e.data%s.value!==BigInt(0)&&(i=this._getOrReturnCtx(e,i),Ce(i,{code:_e.not_multiple_of,multipleOf:s.value,message:s.message}),r.dirty()):Tt.assertNever(s);return{status:r.value,value:e.data}}gte(e,t){return this.setLimit("min",e,!0,Ye.toString(t))}gt(e,t){return this.setLimit("min",e,!1,Ye.toString(t))}lte(e,t){return this.setLimit("max",e,!0,Ye.toString(t))}lt(e,t){return this.setLimit("max",e,!1,Ye.toString(t))}setLimit(e,t,i,r){return new n({...this._def,checks:[...this._def.checks,{kind:e,value:t,inclusive:i,message:Ye.toString(r)}]})}_addCheck(e){return new n({...this._def,checks:[...this._def.checks,e]})}positive(e){return this._addCheck({kind:"min",value:BigInt(0),inclusive:!1,message:Ye.toString(e)})}negative(e){return this._addCheck({kind:"max",value:BigInt(0),inclusive:!1,message:Ye.toString(e)})}nonpositive(e){return this._addCheck({kind:"max",value:BigInt(0),inclusive:!0,message:Ye.toString(e)})}nonnegative(e){return this._addCheck({kind:"min",value:BigInt(0),inclusive:!0,message:Ye.toString(e)})}multipleOf(e,t){return this._addCheck({kind:"multipleOf",value:e,message:Ye.toString(t)})}get minValue(){let e=null;for(let t of this._def.checks)t.kind==="min"&&(e===null||t.value>e)&&(e=t.value);return e}get maxValue(){let e=null;for(let t of this._def.checks)t.kind==="max"&&(e===null||t.value<e)&&(e=t.value);return e}};Qr.create=n=>{var e;return new Qr({checks:[],typeName:$e.ZodBigInt,coerce:(e=n?.coerce)!==null&&e!==void 0?e:!1,...ut(n)})};var es=class extends ht{_parse(e){if(this._def.coerce&&(e.data=!!e.data),this._getType(e)!==Le.boolean){let i=this._getOrReturnCtx(e);return Ce(i,{code:_e.invalid_type,expected:Le.boolean,received:i.parsedType}),nt}return Pn(e.data)}};es.create=n=>new es({typeName:$e.ZodBoolean,coerce:n?.coerce||!1,...ut(n)});var ts=class n extends ht{_parse(e){if(this._def.coerce&&(e.data=new Date(e.data)),this._getType(e)!==Le.date){let s=this._getOrReturnCtx(e);return Ce(s,{code:_e.invalid_type,expected:Le.date,received:s.parsedType}),nt}if(isNaN(e.data.getTime())){let s=this._getOrReturnCtx(e);return Ce(s,{code:_e.invalid_date}),nt}let i=new Tn,r;for(let s of this._def.checks)s.kind==="min"?e.data.getTime()<s.value&&(r=this._getOrReturnCtx(e,r),Ce(r,{code:_e.too_small,message:s.message,inclusive:!0,exact:!1,minimum:s.value,type:"date"}),i.dirty()):s.kind==="max"?e.data.getTime()>s.value&&(r=this._getOrReturnCtx(e,r),Ce(r,{code:_e.too_big,message:s.message,inclusive:!0,exact:!1,maximum:s.value,type:"date"}),i.dirty()):Tt.assertNever(s);return{status:i.value,value:new Date(e.data.getTime())}}_addCheck(e){return new n({...this._def,checks:[...this._def.checks,e]})}min(e,t){return this._addCheck({kind:"min",value:e.getTime(),message:Ye.toString(t)})}max(e,t){return this._addCheck({kind:"max",value:e.getTime(),message:Ye.toString(t)})}get minDate(){let e=null;for(let t of this._def.checks)t.kind==="min"&&(e===null||t.value>e)&&(e=t.value);return e!=null?new Date(e):null}get maxDate(){let e=null;for(let t of this._def.checks)t.kind==="max"&&(e===null||t.value<e)&&(e=t.value);return e!=null?new Date(e):null}};ts.create=n=>new ts({checks:[],coerce:n?.coerce||!1,typeName:$e.ZodDate,...ut(n)});var Zs=class extends ht{_parse(e){if(this._getType(e)!==Le.symbol){let i=this._getOrReturnCtx(e);return Ce(i,{code:_e.invalid_type,expected:Le.symbol,received:i.parsedType}),nt}return Pn(e.data)}};Zs.create=n=>new Zs({typeName:$e.ZodSymbol,...ut(n)});var ns=class extends ht{_parse(e){if(this._getType(e)!==Le.undefined){let i=this._getOrReturnCtx(e);return Ce(i,{code:_e.invalid_type,expected:Le.undefined,received:i.parsedType}),nt}return Pn(e.data)}};ns.create=n=>new ns({typeName:$e.ZodUndefined,...ut(n)});var is=class extends ht{_parse(e){if(this._getType(e)!==Le.null){let i=this._getOrReturnCtx(e);return Ce(i,{code:_e.invalid_type,expected:Le.null,received:i.parsedType}),nt}return Pn(e.data)}};is.create=n=>new is({typeName:$e.ZodNull,...ut(n)});var Ir=class extends ht{constructor(){super(...arguments),this._any=!0}_parse(e){return Pn(e.data)}};Ir.create=n=>new Ir({typeName:$e.ZodAny,...ut(n)});var nr=class extends ht{constructor(){super(...arguments),this._unknown=!0}_parse(e){return Pn(e.data)}};nr.create=n=>new nr({typeName:$e.ZodUnknown,...ut(n)});var xi=class extends ht{_parse(e){let t=this._getOrReturnCtx(e);return Ce(t,{code:_e.invalid_type,expected:Le.never,received:t.parsedType}),nt}};xi.create=n=>new xi({typeName:$e.ZodNever,...ut(n)});var Ks=class extends ht{_parse(e){if(this._getType(e)!==Le.undefined){let i=this._getOrReturnCtx(e);return Ce(i,{code:_e.invalid_type,expected:Le.void,received:i.parsedType}),nt}return Pn(e.data)}};Ks.create=n=>new Ks({typeName:$e.ZodVoid,...ut(n)});var ir=class n extends ht{_parse(e){let{ctx:t,status:i}=this._processInputParams(e),r=this._def;if(t.parsedType!==Le.array)return Ce(t,{code:_e.invalid_type,expected:Le.array,received:t.parsedType}),nt;if(r.exactLength!==null){let a=t.data.length>r.exactLength.value,o=t.data.length<r.exactLength.value;(a||o)&&(Ce(t,{code:a?_e.too_big:_e.too_small,minimum:o?r.exactLength.value:void 0,maximum:a?r.exactLength.value:void 0,type:"array",inclusive:!0,exact:!0,message:r.exactLength.message}),i.dirty())}if(r.minLength!==null&&t.data.length<r.minLength.value&&(Ce(t,{code:_e.too_small,minimum:r.minLength.value,type:"array",inclusive:!0,exact:!1,message:r.minLength.message}),i.dirty()),r.maxLength!==null&&t.data.length>r.maxLength.value&&(Ce(t,{code:_e.too_big,maximum:r.maxLength.value,type:"array",inclusive:!0,exact:!1,message:r.maxLength.message}),i.dirty()),t.common.async)return Promise.all([...t.data].map((a,o)=>r.type._parseAsync(new hi(t,a,t.path,o)))).then(a=>Tn.mergeArray(i,a));let s=[...t.data].map((a,o)=>r.type._parseSync(new hi(t,a,t.path,o)));return Tn.mergeArray(i,s)}get element(){return this._def.type}min(e,t){return new n({...this._def,minLength:{value:e,message:Ye.toString(t)}})}max(e,t){return new n({...this._def,maxLength:{value:e,message:Ye.toString(t)}})}length(e,t){return new n({...this._def,exactLength:{value:e,message:Ye.toString(t)}})}nonempty(e){return this.min(1,e)}};ir.create=(n,e)=>new ir({type:n,minLength:null,maxLength:null,exactLength:null,typeName:$e.ZodArray,...ut(e)});function Xs(n){if(n instanceof kn){let e={};for(let t in n.shape){let i=n.shape[t];e[t]=ui.create(Xs(i))}return new kn({...n._def,shape:()=>e})}else return n instanceof ir?new ir({...n._def,type:Xs(n.element)}):n instanceof ui?ui.create(Xs(n.unwrap())):n instanceof Ui?Ui.create(Xs(n.unwrap())):n instanceof Di?Di.create(n.items.map(e=>Xs(e))):n}var kn=class n extends ht{constructor(){super(...arguments),this._cached=null,this.nonstrict=this.passthrough,this.augment=this.extend}_getCached(){if(this._cached!==null)return this._cached;let e=this._def.shape(),t=Tt.objectKeys(e);return this._cached={shape:e,keys:t}}_parse(e){if(this._getType(e)!==Le.object){let l=this._getOrReturnCtx(e);return Ce(l,{code:_e.invalid_type,expected:Le.object,received:l.parsedType}),nt}let{status:i,ctx:r}=this._processInputParams(e),{shape:s,keys:a}=this._getCached(),o=[];if(!(this._def.catchall instanceof xi&&this._def.unknownKeys==="strip"))for(let l in r.data)a.includes(l)||o.push(l);let c=[];for(let l of a){let u=s[l],h=r.data[l];c.push({key:{status:"valid",value:l},value:u._parse(new hi(r,h,r.path,l)),alwaysSet:l in r.data})}if(this._def.catchall instanceof xi){let l=this._def.unknownKeys;if(l==="passthrough")for(let u of o)c.push({key:{status:"valid",value:u},value:{status:"valid",value:r.data[u]}});else if(l==="strict")o.length>0&&(Ce(r,{code:_e.unrecognized_keys,keys:o}),i.dirty());else if(l!=="strip")throw new Error("Internal ZodObject error: invalid unknownKeys value.")}else{let l=this._def.catchall;for(let u of o){let h=r.data[u];c.push({key:{status:"valid",value:u},value:l._parse(new hi(r,h,r.path,u)),alwaysSet:u in r.data})}}return r.common.async?Promise.resolve().then(async()=>{let l=[];for(let u of c){let h=await u.key,d=await u.value;l.push({key:h,value:d,alwaysSet:u.alwaysSet})}return l}).then(l=>Tn.mergeObjectSync(i,l)):Tn.mergeObjectSync(i,c)}get shape(){return this._def.shape()}strict(e){return Ye.errToObj,new n({...this._def,unknownKeys:"strict",...e!==void 0?{errorMap:(t,i)=>{var r,s,a,o;let c=(a=(s=(r=this._def).errorMap)===null||s===void 0?void 0:s.call(r,t,i).message)!==null&&a!==void 0?a:i.defaultError;return t.code==="unrecognized_keys"?{message:(o=Ye.errToObj(e).message)!==null&&o!==void 0?o:c}:{message:c}}}:{}})}strip(){return new n({...this._def,unknownKeys:"strip"})}passthrough(){return new n({...this._def,unknownKeys:"passthrough"})}extend(e){return new n({...this._def,shape:()=>({...this._def.shape(),...e})})}merge(e){return new n({unknownKeys:e._def.unknownKeys,catchall:e._def.catchall,shape:()=>({...this._def.shape(),...e._def.shape()}),typeName:$e.ZodObject})}setKey(e,t){return this.augment({[e]:t})}catchall(e){return new n({...this._def,catchall:e})}pick(e){let t={};return Tt.objectKeys(e).forEach(i=>{e[i]&&this.shape[i]&&(t[i]=this.shape[i])}),new n({...this._def,shape:()=>t})}omit(e){let t={};return Tt.objectKeys(this.shape).forEach(i=>{e[i]||(t[i]=this.shape[i])}),new n({...this._def,shape:()=>t})}deepPartial(){return Xs(this)}partial(e){let t={};return Tt.objectKeys(this.shape).forEach(i=>{let r=this.shape[i];e&&!e[i]?t[i]=r:t[i]=r.optional()}),new n({...this._def,shape:()=>t})}required(e){let t={};return Tt.objectKeys(this.shape).forEach(i=>{if(e&&!e[i])t[i]=this.shape[i];else{let s=this.shape[i];for(;s instanceof ui;)s=s._def.innerType;t[i]=s}}),new n({...this._def,shape:()=>t})}keyof(){return Tp(Tt.objectKeys(this.shape))}};kn.create=(n,e)=>new kn({shape:()=>n,unknownKeys:"strip",catchall:xi.create(),typeName:$e.ZodObject,...ut(e)});kn.strictCreate=(n,e)=>new kn({shape:()=>n,unknownKeys:"strict",catchall:xi.create(),typeName:$e.ZodObject,...ut(e)});kn.lazycreate=(n,e)=>new kn({shape:n,unknownKeys:"strip",catchall:xi.create(),typeName:$e.ZodObject,...ut(e)});var rs=class extends ht{_parse(e){let{ctx:t}=this._processInputParams(e),i=this._def.options;function r(s){for(let o of s)if(o.result.status==="valid")return o.result;for(let o of s)if(o.result.status==="dirty")return t.common.issues.push(...o.ctx.common.issues),o.result;let a=s.map(o=>new Zn(o.ctx.common.issues));return Ce(t,{code:_e.invalid_union,unionErrors:a}),nt}if(t.common.async)return Promise.all(i.map(async s=>{let a={...t,common:{...t.common,issues:[]},parent:null};return{result:await s._parseAsync({data:t.data,path:t.path,parent:a}),ctx:a}})).then(r);{let s,a=[];for(let c of i){let l={...t,common:{...t.common,issues:[]},parent:null},u=c._parseSync({data:t.data,path:t.path,parent:l});if(u.status==="valid")return u;u.status==="dirty"&&!s&&(s={result:u,ctx:l}),l.common.issues.length&&a.push(l.common.issues)}if(s)return t.common.issues.push(...s.ctx.common.issues),s.result;let o=a.map(c=>new Zn(c));return Ce(t,{code:_e.invalid_union,unionErrors:o}),nt}}get options(){return this._def.options}};rs.create=(n,e)=>new rs({options:n,typeName:$e.ZodUnion,...ut(e)});var tr=n=>n instanceof as?tr(n.schema):n instanceof Kn?tr(n.innerType()):n instanceof os?[n.value]:n instanceof ls?n.options:n instanceof cs?Tt.objectValues(n.enum):n instanceof us?tr(n._def.innerType):n instanceof ns?[void 0]:n instanceof is?[null]:n instanceof ui?[void 0,...tr(n.unwrap())]:n instanceof Ui?[null,...tr(n.unwrap())]:n instanceof so||n instanceof ds?tr(n.unwrap()):n instanceof hs?tr(n._def.innerType):[],Ol=class n extends ht{_parse(e){let{ctx:t}=this._processInputParams(e);if(t.parsedType!==Le.object)return Ce(t,{code:_e.invalid_type,expected:Le.object,received:t.parsedType}),nt;let i=this.discriminator,r=t.data[i],s=this.optionsMap.get(r);return s?t.common.async?s._parseAsync({data:t.data,path:t.path,parent:t}):s._parseSync({data:t.data,path:t.path,parent:t}):(Ce(t,{code:_e.invalid_union_discriminator,options:Array.from(this.optionsMap.keys()),path:[i]}),nt)}get discriminator(){return this._def.discriminator}get options(){return this._def.options}get optionsMap(){return this._def.optionsMap}static create(e,t,i){let r=new Map;for(let s of t){let a=tr(s.shape[e]);if(!a.length)throw new Error(`A discriminator value for key \`${e}\` could not be extracted from all schema options`);for(let o of a){if(r.has(o))throw new Error(`Discriminator property ${String(e)} has duplicate value ${String(o)}`);r.set(o,s)}}return new n({typeName:$e.ZodDiscriminatedUnion,discriminator:e,options:t,optionsMap:r,...ut(i)})}};function ph(n,e){let t=wr(n),i=wr(e);if(n===e)return{valid:!0,data:n};if(t===Le.object&&i===Le.object){let r=Tt.objectKeys(e),s=Tt.objectKeys(n).filter(o=>r.indexOf(o)!==-1),a={...n,...e};for(let o of s){let c=ph(n[o],e[o]);if(!c.valid)return{valid:!1};a[o]=c.data}return{valid:!0,data:a}}else if(t===Le.array&&i===Le.array){if(n.length!==e.length)return{valid:!1};let r=[];for(let s=0;s<n.length;s++){let a=n[s],o=e[s],c=ph(a,o);if(!c.valid)return{valid:!1};r.push(c.data)}return{valid:!0,data:r}}else return t===Le.date&&i===Le.date&&+n==+e?{valid:!0,data:n}:{valid:!1}}var ss=class extends ht{_parse(e){let{status:t,ctx:i}=this._processInputParams(e),r=(s,a)=>{if(dh(s)||dh(a))return nt;let o=ph(s.value,a.value);return o.valid?((fh(s)||fh(a))&&t.dirty(),{status:t.value,value:o.data}):(Ce(i,{code:_e.invalid_intersection_types}),nt)};return i.common.async?Promise.all([this._def.left._parseAsync({data:i.data,path:i.path,parent:i}),this._def.right._parseAsync({data:i.data,path:i.path,parent:i})]).then(([s,a])=>r(s,a)):r(this._def.left._parseSync({data:i.data,path:i.path,parent:i}),this._def.right._parseSync({data:i.data,path:i.path,parent:i}))}};ss.create=(n,e,t)=>new ss({left:n,right:e,typeName:$e.ZodIntersection,...ut(t)});var Di=class n extends ht{_parse(e){let{status:t,ctx:i}=this._processInputParams(e);if(i.parsedType!==Le.array)return Ce(i,{code:_e.invalid_type,expected:Le.array,received:i.parsedType}),nt;if(i.data.length<this._def.items.length)return Ce(i,{code:_e.too_small,minimum:this._def.items.length,inclusive:!0,exact:!1,type:"array"}),nt;!this._def.rest&&i.data.length>this._def.items.length&&(Ce(i,{code:_e.too_big,maximum:this._def.items.length,inclusive:!0,exact:!1,type:"array"}),t.dirty());let s=[...i.data].map((a,o)=>{let c=this._def.items[o]||this._def.rest;return c?c._parse(new hi(i,a,i.path,o)):null}).filter(a=>!!a);return i.common.async?Promise.all(s).then(a=>Tn.mergeArray(t,a)):Tn.mergeArray(t,s)}get items(){return this._def.items}rest(e){return new n({...this._def,rest:e})}};Di.create=(n,e)=>{if(!Array.isArray(n))throw new Error("You must pass an array of schemas to z.tuple([ ... ])");return new Di({items:n,typeName:$e.ZodTuple,rest:null,...ut(e)})};var Fl=class n extends ht{get keySchema(){return this._def.keyType}get valueSchema(){return this._def.valueType}_parse(e){let{status:t,ctx:i}=this._processInputParams(e);if(i.parsedType!==Le.object)return Ce(i,{code:_e.invalid_type,expected:Le.object,received:i.parsedType}),nt;let r=[],s=this._def.keyType,a=this._def.valueType;for(let o in i.data)r.push({key:s._parse(new hi(i,o,i.path,o)),value:a._parse(new hi(i,i.data[o],i.path,o)),alwaysSet:o in i.data});return i.common.async?Tn.mergeObjectAsync(t,r):Tn.mergeObjectSync(t,r)}get element(){return this._def.valueType}static create(e,t,i){return t instanceof ht?new n({keyType:e,valueType:t,typeName:$e.ZodRecord,...ut(i)}):new n({keyType:Rr.create(),valueType:e,typeName:$e.ZodRecord,...ut(t)})}},js=class extends ht{get keySchema(){return this._def.keyType}get valueSchema(){return this._def.valueType}_parse(e){let{status:t,ctx:i}=this._processInputParams(e);if(i.parsedType!==Le.map)return Ce(i,{code:_e.invalid_type,expected:Le.map,received:i.parsedType}),nt;let r=this._def.keyType,s=this._def.valueType,a=[...i.data.entries()].map(([o,c],l)=>({key:r._parse(new hi(i,o,i.path,[l,"key"])),value:s._parse(new hi(i,c,i.path,[l,"value"]))}));if(i.common.async){let o=new Map;return Promise.resolve().then(async()=>{for(let c of a){let l=await c.key,u=await c.value;if(l.status==="aborted"||u.status==="aborted")return nt;(l.status==="dirty"||u.status==="dirty")&&t.dirty(),o.set(l.value,u.value)}return{status:t.value,value:o}})}else{let o=new Map;for(let c of a){let l=c.key,u=c.value;if(l.status==="aborted"||u.status==="aborted")return nt;(l.status==="dirty"||u.status==="dirty")&&t.dirty(),o.set(l.value,u.value)}return{status:t.value,value:o}}}};js.create=(n,e,t)=>new js({valueType:e,keyType:n,typeName:$e.ZodMap,...ut(t)});var $s=class n extends ht{_parse(e){let{status:t,ctx:i}=this._processInputParams(e);if(i.parsedType!==Le.set)return Ce(i,{code:_e.invalid_type,expected:Le.set,received:i.parsedType}),nt;let r=this._def;r.minSize!==null&&i.data.size<r.minSize.value&&(Ce(i,{code:_e.too_small,minimum:r.minSize.value,type:"set",inclusive:!0,exact:!1,message:r.minSize.message}),t.dirty()),r.maxSize!==null&&i.data.size>r.maxSize.value&&(Ce(i,{code:_e.too_big,maximum:r.maxSize.value,type:"set",inclusive:!0,exact:!1,message:r.maxSize.message}),t.dirty());let s=this._def.valueType;function a(c){let l=new Set;for(let u of c){if(u.status==="aborted")return nt;u.status==="dirty"&&t.dirty(),l.add(u.value)}return{status:t.value,value:l}}let o=[...i.data.values()].map((c,l)=>s._parse(new hi(i,c,i.path,l)));return i.common.async?Promise.all(o).then(c=>a(c)):a(o)}min(e,t){return new n({...this._def,minSize:{value:e,message:Ye.toString(t)}})}max(e,t){return new n({...this._def,maxSize:{value:e,message:Ye.toString(t)}})}size(e,t){return this.min(e,t).max(e,t)}nonempty(e){return this.min(1,e)}};$s.create=(n,e)=>new $s({valueType:n,minSize:null,maxSize:null,typeName:$e.ZodSet,...ut(e)});var Bl=class n extends ht{constructor(){super(...arguments),this.validate=this.implement}_parse(e){let{ctx:t}=this._processInputParams(e);if(t.parsedType!==Le.function)return Ce(t,{code:_e.invalid_type,expected:Le.function,received:t.parsedType}),nt;function i(o,c){return Dl({data:o,path:t.path,errorMaps:[t.common.contextualErrorMap,t.schemaErrorMap,Ll(),Ys].filter(l=>!!l),issueData:{code:_e.invalid_arguments,argumentsError:c}})}function r(o,c){return Dl({data:o,path:t.path,errorMaps:[t.common.contextualErrorMap,t.schemaErrorMap,Ll(),Ys].filter(l=>!!l),issueData:{code:_e.invalid_return_type,returnTypeError:c}})}let s={errorMap:t.common.contextualErrorMap},a=t.data;if(this._def.returns instanceof Cr){let o=this;return Pn(async function(...c){let l=new Zn([]),u=await o._def.args.parseAsync(c,s).catch(m=>{throw l.addIssue(i(c,m)),l}),h=await Reflect.apply(a,this,u);return await o._def.returns._def.type.parseAsync(h,s).catch(m=>{throw l.addIssue(r(h,m)),l})})}else{let o=this;return Pn(function(...c){let l=o._def.args.safeParse(c,s);if(!l.success)throw new Zn([i(c,l.error)]);let u=Reflect.apply(a,this,l.data),h=o._def.returns.safeParse(u,s);if(!h.success)throw new Zn([r(u,h.error)]);return h.data})}}parameters(){return this._def.args}returnType(){return this._def.returns}args(...e){return new n({...this._def,args:Di.create(e).rest(nr.create())})}returns(e){return new n({...this._def,returns:e})}implement(e){return this.parse(e)}strictImplement(e){return this.parse(e)}static create(e,t,i){return new n({args:e||Di.create([]).rest(nr.create()),returns:t||nr.create(),typeName:$e.ZodFunction,...ut(i)})}},as=class extends ht{get schema(){return this._def.getter()}_parse(e){let{ctx:t}=this._processInputParams(e);return this._def.getter()._parse({data:t.data,path:t.path,parent:t})}};as.create=(n,e)=>new as({getter:n,typeName:$e.ZodLazy,...ut(e)});var os=class extends ht{_parse(e){if(e.data!==this._def.value){let t=this._getOrReturnCtx(e);return Ce(t,{received:t.data,code:_e.invalid_literal,expected:this._def.value}),nt}return{status:"valid",value:e.data}}get value(){return this._def.value}};os.create=(n,e)=>new os({value:n,typeName:$e.ZodLiteral,...ut(e)});function Tp(n,e){return new ls({values:n,typeName:$e.ZodEnum,...ut(e)})}var ls=class n extends ht{constructor(){super(...arguments),to.set(this,void 0)}_parse(e){if(typeof e.data!="string"){let t=this._getOrReturnCtx(e),i=this._def.values;return Ce(t,{expected:Tt.joinValues(i),received:t.parsedType,code:_e.invalid_type}),nt}if(Ul(this,to)||Sp(this,to,new Set(this._def.values)),!Ul(this,to).has(e.data)){let t=this._getOrReturnCtx(e),i=this._def.values;return Ce(t,{received:t.data,code:_e.invalid_enum_value,options:i}),nt}return Pn(e.data)}get options(){return this._def.values}get enum(){let e={};for(let t of this._def.values)e[t]=t;return e}get Values(){let e={};for(let t of this._def.values)e[t]=t;return e}get Enum(){let e={};for(let t of this._def.values)e[t]=t;return e}extract(e,t=this._def){return n.create(e,{...this._def,...t})}exclude(e,t=this._def){return n.create(this.options.filter(i=>!e.includes(i)),{...this._def,...t})}};to=new WeakMap;ls.create=Tp;var cs=class extends ht{constructor(){super(...arguments),no.set(this,void 0)}_parse(e){let t=Tt.getValidEnumValues(this._def.values),i=this._getOrReturnCtx(e);if(i.parsedType!==Le.string&&i.parsedType!==Le.number){let r=Tt.objectValues(t);return Ce(i,{expected:Tt.joinValues(r),received:i.parsedType,code:_e.invalid_type}),nt}if(Ul(this,no)||Sp(this,no,new Set(Tt.getValidEnumValues(this._def.values))),!Ul(this,no).has(e.data)){let r=Tt.objectValues(t);return Ce(i,{received:i.data,code:_e.invalid_enum_value,options:r}),nt}return Pn(e.data)}get enum(){return this._def.values}};no=new WeakMap;cs.create=(n,e)=>new cs({values:n,typeName:$e.ZodNativeEnum,...ut(e)});var Cr=class extends ht{unwrap(){return this._def.type}_parse(e){let{ctx:t}=this._processInputParams(e);if(t.parsedType!==Le.promise&&t.common.async===!1)return Ce(t,{code:_e.invalid_type,expected:Le.promise,received:t.parsedType}),nt;let i=t.parsedType===Le.promise?t.data:Promise.resolve(t.data);return Pn(i.then(r=>this._def.type.parseAsync(r,{path:t.path,errorMap:t.common.contextualErrorMap})))}};Cr.create=(n,e)=>new Cr({type:n,typeName:$e.ZodPromise,...ut(e)});var Kn=class extends ht{innerType(){return this._def.schema}sourceType(){return this._def.schema._def.typeName===$e.ZodEffects?this._def.schema.sourceType():this._def.schema}_parse(e){let{status:t,ctx:i}=this._processInputParams(e),r=this._def.effect||null,s={addIssue:a=>{Ce(i,a),a.fatal?t.abort():t.dirty()},get path(){return i.path}};if(s.addIssue=s.addIssue.bind(s),r.type==="preprocess"){let a=r.transform(i.data,s);if(i.common.async)return Promise.resolve(a).then(async o=>{if(t.value==="aborted")return nt;let c=await this._def.schema._parseAsync({data:o,path:i.path,parent:i});return c.status==="aborted"?nt:c.status==="dirty"||t.value==="dirty"?qs(c.value):c});{if(t.value==="aborted")return nt;let o=this._def.schema._parseSync({data:a,path:i.path,parent:i});return o.status==="aborted"?nt:o.status==="dirty"||t.value==="dirty"?qs(o.value):o}}if(r.type==="refinement"){let a=o=>{let c=r.refinement(o,s);if(i.common.async)return Promise.resolve(c);if(c instanceof Promise)throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");return o};if(i.common.async===!1){let o=this._def.schema._parseSync({data:i.data,path:i.path,parent:i});return o.status==="aborted"?nt:(o.status==="dirty"&&t.dirty(),a(o.value),{status:t.value,value:o.value})}else return this._def.schema._parseAsync({data:i.data,path:i.path,parent:i}).then(o=>o.status==="aborted"?nt:(o.status==="dirty"&&t.dirty(),a(o.value).then(()=>({status:t.value,value:o.value}))))}if(r.type==="transform")if(i.common.async===!1){let a=this._def.schema._parseSync({data:i.data,path:i.path,parent:i});if(!io(a))return a;let o=r.transform(a.value,s);if(o instanceof Promise)throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");return{status:t.value,value:o}}else return this._def.schema._parseAsync({data:i.data,path:i.path,parent:i}).then(a=>io(a)?Promise.resolve(r.transform(a.value,s)).then(o=>({status:t.value,value:o})):a);Tt.assertNever(r)}};Kn.create=(n,e,t)=>new Kn({schema:n,typeName:$e.ZodEffects,effect:e,...ut(t)});Kn.createWithPreprocess=(n,e,t)=>new Kn({schema:e,effect:{type:"preprocess",transform:n},typeName:$e.ZodEffects,...ut(t)});var ui=class extends ht{_parse(e){return this._getType(e)===Le.undefined?Pn(void 0):this._def.innerType._parse(e)}unwrap(){return this._def.innerType}};ui.create=(n,e)=>new ui({innerType:n,typeName:$e.ZodOptional,...ut(e)});var Ui=class extends ht{_parse(e){return this._getType(e)===Le.null?Pn(null):this._def.innerType._parse(e)}unwrap(){return this._def.innerType}};Ui.create=(n,e)=>new Ui({innerType:n,typeName:$e.ZodNullable,...ut(e)});var us=class extends ht{_parse(e){let{ctx:t}=this._processInputParams(e),i=t.data;return t.parsedType===Le.undefined&&(i=this._def.defaultValue()),this._def.innerType._parse({data:i,path:t.path,parent:t})}removeDefault(){return this._def.innerType}};us.create=(n,e)=>new us({innerType:n,typeName:$e.ZodDefault,defaultValue:typeof e.default=="function"?e.default:()=>e.default,...ut(e)});var hs=class extends ht{_parse(e){let{ctx:t}=this._processInputParams(e),i={...t,common:{...t.common,issues:[]}},r=this._def.innerType._parse({data:i.data,path:i.path,parent:{...i}});return ro(r)?r.then(s=>({status:"valid",value:s.status==="valid"?s.value:this._def.catchValue({get error(){return new Zn(i.common.issues)},input:i.data})})):{status:"valid",value:r.status==="valid"?r.value:this._def.catchValue({get error(){return new Zn(i.common.issues)},input:i.data})}}removeCatch(){return this._def.innerType}};hs.create=(n,e)=>new hs({innerType:n,typeName:$e.ZodCatch,catchValue:typeof e.catch=="function"?e.catch:()=>e.catch,...ut(e)});var Js=class extends ht{_parse(e){if(this._getType(e)!==Le.nan){let i=this._getOrReturnCtx(e);return Ce(i,{code:_e.invalid_type,expected:Le.nan,received:i.parsedType}),nt}return{status:"valid",value:e.data}}};Js.create=n=>new Js({typeName:$e.ZodNaN,...ut(n)});var sx=Symbol("zod_brand"),so=class extends ht{_parse(e){let{ctx:t}=this._processInputParams(e),i=t.data;return this._def.type._parse({data:i,path:t.path,parent:t})}unwrap(){return this._def.type}},ao=class n extends ht{_parse(e){let{status:t,ctx:i}=this._processInputParams(e);if(i.common.async)return(async()=>{let s=await this._def.in._parseAsync({data:i.data,path:i.path,parent:i});return s.status==="aborted"?nt:s.status==="dirty"?(t.dirty(),qs(s.value)):this._def.out._parseAsync({data:s.value,path:i.path,parent:i})})();{let r=this._def.in._parseSync({data:i.data,path:i.path,parent:i});return r.status==="aborted"?nt:r.status==="dirty"?(t.dirty(),{status:"dirty",value:r.value}):this._def.out._parseSync({data:r.value,path:i.path,parent:i})}}static create(e,t){return new n({in:e,out:t,typeName:$e.ZodPipeline})}},ds=class extends ht{_parse(e){let t=this._def.innerType._parse(e),i=r=>(io(r)&&(r.value=Object.freeze(r.value)),r);return ro(t)?t.then(r=>i(r)):i(t)}unwrap(){return this._def.innerType}};ds.create=(n,e)=>new ds({innerType:n,typeName:$e.ZodReadonly,...ut(e)});function kl(n,e={},t){return n?Ir.create().superRefine((i,r)=>{var s,a;if(!n(i)){let o=typeof e=="function"?e(i):typeof e=="string"?{message:e}:e,c=(a=(s=o.fatal)!==null&&s!==void 0?s:t)!==null&&a!==void 0?a:!0,l=typeof o=="string"?{message:o}:o;r.addIssue({code:"custom",...l,fatal:c})}}):Ir.create()}var ax={object:kn.lazycreate},$e;(function(n){n.ZodString="ZodString",n.ZodNumber="ZodNumber",n.ZodNaN="ZodNaN",n.ZodBigInt="ZodBigInt",n.ZodBoolean="ZodBoolean",n.ZodDate="ZodDate",n.ZodSymbol="ZodSymbol",n.ZodUndefined="ZodUndefined",n.ZodNull="ZodNull",n.ZodAny="ZodAny",n.ZodUnknown="ZodUnknown",n.ZodNever="ZodNever",n.ZodVoid="ZodVoid",n.ZodArray="ZodArray",n.ZodObject="ZodObject",n.ZodUnion="ZodUnion",n.ZodDiscriminatedUnion="ZodDiscriminatedUnion",n.ZodIntersection="ZodIntersection",n.ZodTuple="ZodTuple",n.ZodRecord="ZodRecord",n.ZodMap="ZodMap",n.ZodSet="ZodSet",n.ZodFunction="ZodFunction",n.ZodLazy="ZodLazy",n.ZodLiteral="ZodLiteral",n.ZodEnum="ZodEnum",n.ZodEffects="ZodEffects",n.ZodNativeEnum="ZodNativeEnum",n.ZodOptional="ZodOptional",n.ZodNullable="ZodNullable",n.ZodDefault="ZodDefault",n.ZodCatch="ZodCatch",n.ZodPromise="ZodPromise",n.ZodBranded="ZodBranded",n.ZodPipeline="ZodPipeline",n.ZodReadonly="ZodReadonly"})($e||($e={}));var ox=(n,e={message:`Input not instance of ${n.name}`})=>kl(t=>t instanceof n,e),z=Rr.create,Ge=Jr.create,lx=Js.create,mh=Qr.create,Ke=es.create,cx=ts.create,ux=Zs.create,hx=ns.create,Qs=is.create,dx=Ir.create,fs=nr.create,fx=xi.create,px=Ks.create,Mt=ir.create,xe=kn.create,mx=kn.strictCreate,oo=rs.create,gx=Ol.create,_x=ss.create,xx=Di.create,vx=Fl.create,yx=js.create,Sx=$s.create,bx=Bl.create,Mx=as.create,Ht=os.create,Ex=ls.create,rr=cs.create,Tx=Cr.create,vp=Kn.create,gh=ui.create,Ax=Ui.create,_h=Kn.createWithPreprocess,wx=ao.create,Rx=()=>z().optional(),Ix=()=>Ge().optional(),Cx=()=>Ke().optional(),Px={string:(n=>Rr.create({...n,coerce:!0})),number:(n=>Jr.create({...n,coerce:!0})),boolean:(n=>es.create({...n,coerce:!0})),bigint:(n=>Qr.create({...n,coerce:!0})),date:(n=>ts.create({...n,coerce:!0}))},Nx=nt,U=Object.freeze({__proto__:null,defaultErrorMap:Ys,setErrorMap:G0,getErrorMap:Ll,makeIssue:Dl,EMPTY_PATH:H0,addIssueToContext:Ce,ParseStatus:Tn,INVALID:nt,DIRTY:qs,OK:Pn,isAborted:dh,isDirty:fh,isValid:io,isAsync:ro,get util(){return Tt},get objectUtil(){return hh},ZodParsedType:Le,getParsedType:wr,ZodType:ht,datetimeRegex:Ep,ZodString:Rr,ZodNumber:Jr,ZodBigInt:Qr,ZodBoolean:es,ZodDate:ts,ZodSymbol:Zs,ZodUndefined:ns,ZodNull:is,ZodAny:Ir,ZodUnknown:nr,ZodNever:xi,ZodVoid:Ks,ZodArray:ir,ZodObject:kn,ZodUnion:rs,ZodDiscriminatedUnion:Ol,ZodIntersection:ss,ZodTuple:Di,ZodRecord:Fl,ZodMap:js,ZodSet:$s,ZodFunction:Bl,ZodLazy:as,ZodLiteral:os,ZodEnum:ls,ZodNativeEnum:cs,ZodPromise:Cr,ZodEffects:Kn,ZodTransformer:Kn,ZodOptional:ui,ZodNullable:Ui,ZodDefault:us,ZodCatch:hs,ZodNaN:Js,BRAND:sx,ZodBranded:so,ZodPipeline:ao,ZodReadonly:ds,custom:kl,Schema:ht,ZodSchema:ht,late:ax,get ZodFirstPartyTypeKind(){return $e},coerce:Px,any:dx,array:Mt,bigint:mh,boolean:Ke,date:cx,discriminatedUnion:gx,effect:vp,enum:Ex,function:bx,instanceof:ox,intersection:_x,lazy:Mx,literal:Ht,map:yx,nan:lx,nativeEnum:rr,never:fx,null:Qs,nullable:Ax,number:Ge,object:xe,oboolean:Cx,onumber:Ix,optional:gh,ostring:Rx,pipeline:wx,preprocess:_h,promise:Tx,record:vx,set:Sx,strictObject:mx,string:z,symbol:ux,transformer:vp,tuple:xx,undefined:hx,union:oo,unknown:fs,void:px,NEVER:Nx,ZodIssueCode:_e,quotelessJson:V0,ZodError:Zn});var zl={exports:{}};var Ap;function wp(){return Ap?zl.exports:(Ap=1,(function(n){var e=(function(t){var i=1e7,r=7,s=9007199254740992,a=x(s),o="0123456789abcdefghijklmnopqrstuvwxyz",c=typeof BigInt=="function";function l(p,f,S,A){return typeof p>"u"?l[0]:typeof f<"u"?+f==10&&!S?Fe(p):ft(p,f,S,A):Fe(p)}function u(p,f){this.value=p,this.sign=f,this.isSmall=!1}u.prototype=Object.create(l.prototype);function h(p){this.value=p,this.sign=p<0,this.isSmall=!0}h.prototype=Object.create(l.prototype);function d(p){this.value=p}d.prototype=Object.create(l.prototype);function m(p){return-s<p&&p<s}function x(p){return p<1e7?[p]:p<1e14?[p%1e7,Math.floor(p/1e7)]:[p%1e7,Math.floor(p/1e7)%1e7,Math.floor(p/1e14)]}function v(p){g(p);var f=p.length;if(f<4&&le(p,a)<0)switch(f){case 0:return 0;case 1:return p[0];case 2:return p[0]+p[1]*i;default:return p[0]+(p[1]+p[2]*i)*i}return p}function g(p){for(var f=p.length;p[--f]===0;);p.length=f+1}function _(p){for(var f=new Array(p),S=-1;++S<p;)f[S]=0;return f}function T(p){return p>0?Math.floor(p):Math.ceil(p)}function I(p,f){var S=p.length,A=f.length,P=new Array(S),L=0,H=i,D,F;for(F=0;F<A;F++)D=p[F]+f[F]+L,L=D>=H?1:0,P[F]=D-L*H;for(;F<S;)D=p[F]+L,L=D===H?1:0,P[F++]=D-L*H;return L>0&&P.push(L),P}function E(p,f){return p.length>=f.length?I(p,f):I(f,p)}function w(p,f){var S=p.length,A=new Array(S),P=i,L,H;for(H=0;H<S;H++)L=p[H]-P+f,f=Math.floor(L/P),A[H]=L-f*P,f+=1;for(;f>0;)A[H++]=f%P,f=Math.floor(f/P);return A}u.prototype.add=function(p){var f=Fe(p);if(this.sign!==f.sign)return this.subtract(f.negate());var S=this.value,A=f.value;return f.isSmall?new u(w(S,Math.abs(A)),this.sign):new u(E(S,A),this.sign)},u.prototype.plus=u.prototype.add,h.prototype.add=function(p){var f=Fe(p),S=this.value;if(S<0!==f.sign)return this.subtract(f.negate());var A=f.value;if(f.isSmall){if(m(S+A))return new h(S+A);A=x(Math.abs(A))}return new u(w(A,Math.abs(S)),S<0)},h.prototype.plus=h.prototype.add,d.prototype.add=function(p){return new d(this.value+Fe(p).value)},d.prototype.plus=d.prototype.add;function R(p,f){var S=p.length,A=f.length,P=new Array(S),L=0,H=i,D,F;for(D=0;D<A;D++)F=p[D]-L-f[D],F<0?(F+=H,L=1):L=0,P[D]=F;for(D=A;D<S;D++){if(F=p[D]-L,F<0)F+=H;else{P[D++]=F;break}P[D]=F}for(;D<S;D++)P[D]=p[D];return g(P),P}function N(p,f,S){var A;return le(p,f)>=0?A=R(p,f):(A=R(f,p),S=!S),A=v(A),typeof A=="number"?(S&&(A=-A),new h(A)):new u(A,S)}function y(p,f,S){var A=p.length,P=new Array(A),L=-f,H=i,D,F;for(D=0;D<A;D++)F=p[D]+L,L=Math.floor(F/H),F%=H,P[D]=F<0?F+H:F;return P=v(P),typeof P=="number"?(S&&(P=-P),new h(P)):new u(P,S)}u.prototype.subtract=function(p){var f=Fe(p);if(this.sign!==f.sign)return this.add(f.negate());var S=this.value,A=f.value;return f.isSmall?y(S,Math.abs(A),this.sign):N(S,A,this.sign)},u.prototype.minus=u.prototype.subtract,h.prototype.subtract=function(p){var f=Fe(p),S=this.value;if(S<0!==f.sign)return this.add(f.negate());var A=f.value;return f.isSmall?new h(S-A):y(A,Math.abs(S),S>=0)},h.prototype.minus=h.prototype.subtract,d.prototype.subtract=function(p){return new d(this.value-Fe(p).value)},d.prototype.minus=d.prototype.subtract,u.prototype.negate=function(){return new u(this.value,!this.sign)},h.prototype.negate=function(){var p=this.sign,f=new h(-this.value);return f.sign=!p,f},d.prototype.negate=function(){return new d(-this.value)},u.prototype.abs=function(){return new u(this.value,!1)},h.prototype.abs=function(){return new h(Math.abs(this.value))},d.prototype.abs=function(){return new d(this.value>=0?this.value:-this.value)};function C(p,f){var S=p.length,A=f.length,P=S+A,L=_(P),H=i,D,F,ae,ge,ue;for(ae=0;ae<S;++ae){ge=p[ae];for(var fe=0;fe<A;++fe)ue=f[fe],D=ge*ue+L[ae+fe],F=Math.floor(D/H),L[ae+fe]=D-F*H,L[ae+fe+1]+=F}return g(L),L}function B(p,f){var S=p.length,A=new Array(S),P=i,L=0,H,D;for(D=0;D<S;D++)H=p[D]*f+L,L=Math.floor(H/P),A[D]=H-L*P;for(;L>0;)A[D++]=L%P,L=Math.floor(L/P);return A}function W(p,f){for(var S=[];f-- >0;)S.push(0);return S.concat(p)}function Z(p,f){var S=Math.max(p.length,f.length);if(S<=30)return C(p,f);S=Math.ceil(S/2);var A=p.slice(S),P=p.slice(0,S),L=f.slice(S),H=f.slice(0,S),D=Z(P,H),F=Z(A,L),ae=Z(E(P,A),E(H,L)),ge=E(E(D,W(R(R(ae,D),F),S)),W(F,2*S));return g(ge),ge}function ee(p,f){return-.012*p-.012*f+15e-6*p*f>0}u.prototype.multiply=function(p){var f=Fe(p),S=this.value,A=f.value,P=this.sign!==f.sign,L;if(f.isSmall){if(A===0)return l[0];if(A===1)return this;if(A===-1)return this.negate();if(L=Math.abs(A),L<i)return new u(B(S,L),P);A=x(L)}return ee(S.length,A.length)?new u(Z(S,A),P):new u(C(S,A),P)},u.prototype.times=u.prototype.multiply;function X(p,f,S){return p<i?new u(B(f,p),S):new u(C(f,x(p)),S)}h.prototype._multiplyBySmall=function(p){return m(p.value*this.value)?new h(p.value*this.value):X(Math.abs(p.value),x(Math.abs(this.value)),this.sign!==p.sign)},u.prototype._multiplyBySmall=function(p){return p.value===0?l[0]:p.value===1?this:p.value===-1?this.negate():X(Math.abs(p.value),this.value,this.sign!==p.sign)},h.prototype.multiply=function(p){return Fe(p)._multiplyBySmall(this)},h.prototype.times=h.prototype.multiply,d.prototype.multiply=function(p){return new d(this.value*Fe(p).value)},d.prototype.times=d.prototype.multiply;function Q(p){var f=p.length,S=_(f+f),A=i,P,L,H,D,F;for(H=0;H<f;H++){D=p[H],L=0-D*D;for(var ae=H;ae<f;ae++)F=p[ae],P=2*(D*F)+S[H+ae]+L,L=Math.floor(P/A),S[H+ae]=P-L*A;S[H+f]=L}return g(S),S}u.prototype.square=function(){return new u(Q(this.value),!1)},h.prototype.square=function(){var p=this.value*this.value;return m(p)?new h(p):new u(Q(x(Math.abs(this.value))),!1)},d.prototype.square=function(p){return new d(this.value*this.value)};function oe(p,f){var S=p.length,A=f.length,P=i,L=_(f.length),H=f[A-1],D=Math.ceil(P/(2*H)),F=B(p,D),ae=B(f,D),ge,ue,fe,Ie,De,tt,V;for(F.length<=S&&F.push(0),ae.push(0),H=ae[A-1],ue=S-A;ue>=0;ue--){for(ge=P-1,F[ue+A]!==H&&(ge=Math.floor((F[ue+A]*P+F[ue+A-1])/H)),fe=0,Ie=0,tt=ae.length,De=0;De<tt;De++)fe+=ge*ae[De],V=Math.floor(fe/P),Ie+=F[ue+De]-(fe-V*P),fe=V,Ie<0?(F[ue+De]=Ie+P,Ie=-1):(F[ue+De]=Ie,Ie=0);for(;Ie!==0;){for(ge-=1,fe=0,De=0;De<tt;De++)fe+=F[ue+De]-P+ae[De],fe<0?(F[ue+De]=fe+P,fe=0):(F[ue+De]=fe,fe=1);Ie+=fe}L[ue]=ge}return F=he(F,D)[0],[v(L),v(F)]}function re(p,f){for(var S=p.length,A=f.length,P=[],L=[],H=i,D,F,ae,ge,ue;S;){if(L.unshift(p[--S]),g(L),le(L,f)<0){P.push(0);continue}F=L.length,ae=L[F-1]*H+L[F-2],ge=f[A-1]*H+f[A-2],F>A&&(ae=(ae+1)*H),D=Math.ceil(ae/ge);do{if(ue=B(f,D),le(ue,L)<=0)break;D--}while(D);P.push(D),L=R(L,ue)}return P.reverse(),[v(P),v(L)]}function he(p,f){var S=p.length,A=_(S),P=i,L,H,D,F;for(D=0,L=S-1;L>=0;--L)F=D*P+p[L],H=T(F/f),D=F-H*f,A[L]=H|0;return[A,D|0]}function ie(p,f){var S,A=Fe(f);if(c)return[new d(p.value/A.value),new d(p.value%A.value)];var P=p.value,L=A.value,H;if(L===0)throw new Error("Cannot divide by zero");if(p.isSmall)return A.isSmall?[new h(T(P/L)),new h(P%L)]:[l[0],p];if(A.isSmall){if(L===1)return[p,l[0]];if(L==-1)return[p.negate(),l[0]];var D=Math.abs(L);if(D<i){S=he(P,D),H=v(S[0]);var F=S[1];return p.sign&&(F=-F),typeof H=="number"?(p.sign!==A.sign&&(H=-H),[new h(H),new h(F)]):[new u(H,p.sign!==A.sign),new h(F)]}L=x(D)}var ae=le(P,L);if(ae===-1)return[l[0],p];if(ae===0)return[l[p.sign===A.sign?1:-1],l[0]];P.length+L.length<=200?S=oe(P,L):S=re(P,L),H=S[0];var ge=p.sign!==A.sign,ue=S[1],fe=p.sign;return typeof H=="number"?(ge&&(H=-H),H=new h(H)):H=new u(H,ge),typeof ue=="number"?(fe&&(ue=-ue),ue=new h(ue)):ue=new u(ue,fe),[H,ue]}u.prototype.divmod=function(p){var f=ie(this,p);return{quotient:f[0],remainder:f[1]}},d.prototype.divmod=h.prototype.divmod=u.prototype.divmod,u.prototype.divide=function(p){return ie(this,p)[0]},d.prototype.over=d.prototype.divide=function(p){return new d(this.value/Fe(p).value)},h.prototype.over=h.prototype.divide=u.prototype.over=u.prototype.divide,u.prototype.mod=function(p){return ie(this,p)[1]},d.prototype.mod=d.prototype.remainder=function(p){return new d(this.value%Fe(p).value)},h.prototype.remainder=h.prototype.mod=u.prototype.remainder=u.prototype.mod,u.prototype.pow=function(p){var f=Fe(p),S=this.value,A=f.value,P,L,H;if(A===0)return l[1];if(S===0)return l[0];if(S===1)return l[1];if(S===-1)return f.isEven()?l[1]:l[-1];if(f.sign)return l[0];if(!f.isSmall)throw new Error("The exponent "+f.toString()+" is too large.");if(this.isSmall&&m(P=Math.pow(S,A)))return new h(T(P));for(L=this,H=l[1];A&!0&&(H=H.times(L),--A),A!==0;)A/=2,L=L.square();return H},h.prototype.pow=u.prototype.pow,d.prototype.pow=function(p){var f=Fe(p),S=this.value,A=f.value,P=BigInt(0),L=BigInt(1),H=BigInt(2);if(A===P)return l[1];if(S===P)return l[0];if(S===L)return l[1];if(S===BigInt(-1))return f.isEven()?l[1]:l[-1];if(f.isNegative())return new d(P);for(var D=this,F=l[1];(A&L)===L&&(F=F.times(D),--A),A!==P;)A/=H,D=D.square();return F},u.prototype.modPow=function(p,f){if(p=Fe(p),f=Fe(f),f.isZero())throw new Error("Cannot take modPow with modulus 0");var S=l[1],A=this.mod(f);for(p.isNegative()&&(p=p.multiply(l[-1]),A=A.modInv(f));p.isPositive();){if(A.isZero())return l[0];p.isOdd()&&(S=S.multiply(A).mod(f)),p=p.divide(2),A=A.square().mod(f)}return S},d.prototype.modPow=h.prototype.modPow=u.prototype.modPow;function le(p,f){if(p.length!==f.length)return p.length>f.length?1:-1;for(var S=p.length-1;S>=0;S--)if(p[S]!==f[S])return p[S]>f[S]?1:-1;return 0}u.prototype.compareAbs=function(p){var f=Fe(p),S=this.value,A=f.value;return f.isSmall?1:le(S,A)},h.prototype.compareAbs=function(p){var f=Fe(p),S=Math.abs(this.value),A=f.value;return f.isSmall?(A=Math.abs(A),S===A?0:S>A?1:-1):-1},d.prototype.compareAbs=function(p){var f=this.value,S=Fe(p).value;return f=f>=0?f:-f,S=S>=0?S:-S,f===S?0:f>S?1:-1},u.prototype.compare=function(p){if(p===1/0)return-1;if(p===-1/0)return 1;var f=Fe(p),S=this.value,A=f.value;return this.sign!==f.sign?f.sign?1:-1:f.isSmall?this.sign?-1:1:le(S,A)*(this.sign?-1:1)},u.prototype.compareTo=u.prototype.compare,h.prototype.compare=function(p){if(p===1/0)return-1;if(p===-1/0)return 1;var f=Fe(p),S=this.value,A=f.value;return f.isSmall?S==A?0:S>A?1:-1:S<0!==f.sign?S<0?-1:1:S<0?1:-1},h.prototype.compareTo=h.prototype.compare,d.prototype.compare=function(p){if(p===1/0)return-1;if(p===-1/0)return 1;var f=this.value,S=Fe(p).value;return f===S?0:f>S?1:-1},d.prototype.compareTo=d.prototype.compare,u.prototype.equals=function(p){return this.compare(p)===0},d.prototype.eq=d.prototype.equals=h.prototype.eq=h.prototype.equals=u.prototype.eq=u.prototype.equals,u.prototype.notEquals=function(p){return this.compare(p)!==0},d.prototype.neq=d.prototype.notEquals=h.prototype.neq=h.prototype.notEquals=u.prototype.neq=u.prototype.notEquals,u.prototype.greater=function(p){return this.compare(p)>0},d.prototype.gt=d.prototype.greater=h.prototype.gt=h.prototype.greater=u.prototype.gt=u.prototype.greater,u.prototype.lesser=function(p){return this.compare(p)<0},d.prototype.lt=d.prototype.lesser=h.prototype.lt=h.prototype.lesser=u.prototype.lt=u.prototype.lesser,u.prototype.greaterOrEquals=function(p){return this.compare(p)>=0},d.prototype.geq=d.prototype.greaterOrEquals=h.prototype.geq=h.prototype.greaterOrEquals=u.prototype.geq=u.prototype.greaterOrEquals,u.prototype.lesserOrEquals=function(p){return this.compare(p)<=0},d.prototype.leq=d.prototype.lesserOrEquals=h.prototype.leq=h.prototype.lesserOrEquals=u.prototype.leq=u.prototype.lesserOrEquals,u.prototype.isEven=function(){return(this.value[0]&1)===0},h.prototype.isEven=function(){return(this.value&1)===0},d.prototype.isEven=function(){return(this.value&BigInt(1))===BigInt(0)},u.prototype.isOdd=function(){return(this.value[0]&1)===1},h.prototype.isOdd=function(){return(this.value&1)===1},d.prototype.isOdd=function(){return(this.value&BigInt(1))===BigInt(1)},u.prototype.isPositive=function(){return!this.sign},h.prototype.isPositive=function(){return this.value>0},d.prototype.isPositive=h.prototype.isPositive,u.prototype.isNegative=function(){return this.sign},h.prototype.isNegative=function(){return this.value<0},d.prototype.isNegative=h.prototype.isNegative,u.prototype.isUnit=function(){return!1},h.prototype.isUnit=function(){return Math.abs(this.value)===1},d.prototype.isUnit=function(){return this.abs().value===BigInt(1)},u.prototype.isZero=function(){return!1},h.prototype.isZero=function(){return this.value===0},d.prototype.isZero=function(){return this.value===BigInt(0)},u.prototype.isDivisibleBy=function(p){var f=Fe(p);return f.isZero()?!1:f.isUnit()?!0:f.compareAbs(2)===0?this.isEven():this.mod(f).isZero()},d.prototype.isDivisibleBy=h.prototype.isDivisibleBy=u.prototype.isDivisibleBy;function de(p){var f=p.abs();if(f.isUnit())return!1;if(f.equals(2)||f.equals(3)||f.equals(5))return!0;if(f.isEven()||f.isDivisibleBy(3)||f.isDivisibleBy(5))return!1;if(f.lesser(49))return!0}function ne(p,f){for(var S=p.prev(),A=S,P=0,L,H,D;A.isEven();)A=A.divide(2),P++;e:for(H=0;H<f.length;H++)if(!p.lesser(f[H])&&(D=e(f[H]).modPow(A,p),!(D.isUnit()||D.equals(S)))){for(L=P-1;L!=0;L--){if(D=D.square().mod(p),D.isUnit())return!1;if(D.equals(S))continue e}return!1}return!0}u.prototype.isPrime=function(p){var f=de(this);if(f!==t)return f;var S=this.abs(),A=S.bitLength();if(A<=64)return ne(S,[2,3,5,7,11,13,17,19,23,29,31,37]);for(var P=Math.log(2)*A.toJSNumber(),L=Math.ceil(p===!0?2*Math.pow(P,2):P),H=[],D=0;D<L;D++)H.push(e(D+2));return ne(S,H)},d.prototype.isPrime=h.prototype.isPrime=u.prototype.isPrime,u.prototype.isProbablePrime=function(p,f){var S=de(this);if(S!==t)return S;for(var A=this.abs(),P=p===t?5:p,L=[],H=0;H<P;H++)L.push(e.randBetween(2,A.minus(2),f));return ne(A,L)},d.prototype.isProbablePrime=h.prototype.isProbablePrime=u.prototype.isProbablePrime,u.prototype.modInv=function(p){for(var f=e.zero,S=e.one,A=Fe(p),P=this.abs(),L,H,D;!P.isZero();)L=A.divide(P),H=f,D=A,f=S,A=P,S=H.subtract(L.multiply(S)),P=D.subtract(L.multiply(P));if(!A.isUnit())throw new Error(this.toString()+" and "+p.toString()+" are not co-prime");return f.compare(0)===-1&&(f=f.add(p)),this.isNegative()?f.negate():f},d.prototype.modInv=h.prototype.modInv=u.prototype.modInv,u.prototype.next=function(){var p=this.value;return this.sign?y(p,1,this.sign):new u(w(p,1),this.sign)},h.prototype.next=function(){var p=this.value;return p+1<s?new h(p+1):new u(a,!1)},d.prototype.next=function(){return new d(this.value+BigInt(1))},u.prototype.prev=function(){var p=this.value;return this.sign?new u(w(p,1),!0):y(p,1,this.sign)},h.prototype.prev=function(){var p=this.value;return p-1>-s?new h(p-1):new u(a,!0)},d.prototype.prev=function(){return new d(this.value-BigInt(1))};for(var me=[1];2*me[me.length-1]<=i;)me.push(2*me[me.length-1]);var Oe=me.length,Pe=me[Oe-1];function et(p){return Math.abs(p)<=i}u.prototype.shiftLeft=function(p){var f=Fe(p).toJSNumber();if(!et(f))throw new Error(String(f)+" is too large for shifting.");if(f<0)return this.shiftRight(-f);var S=this;if(S.isZero())return S;for(;f>=Oe;)S=S.multiply(Pe),f-=Oe-1;return S.multiply(me[f])},d.prototype.shiftLeft=h.prototype.shiftLeft=u.prototype.shiftLeft,u.prototype.shiftRight=function(p){var f,S=Fe(p).toJSNumber();if(!et(S))throw new Error(String(S)+" is too large for shifting.");if(S<0)return this.shiftLeft(-S);for(var A=this;S>=Oe;){if(A.isZero()||A.isNegative()&&A.isUnit())return A;f=ie(A,Pe),A=f[1].isNegative()?f[0].prev():f[0],S-=Oe-1}return f=ie(A,me[S]),f[1].isNegative()?f[0].prev():f[0]},d.prototype.shiftRight=h.prototype.shiftRight=u.prototype.shiftRight;function J(p,f,S){f=Fe(f);for(var A=p.isNegative(),P=f.isNegative(),L=A?p.not():p,H=P?f.not():f,D=0,F=0,ae=null,ge=null,ue=[];!L.isZero()||!H.isZero();)ae=ie(L,Pe),D=ae[1].toJSNumber(),A&&(D=Pe-1-D),ge=ie(H,Pe),F=ge[1].toJSNumber(),P&&(F=Pe-1-F),L=ae[0],H=ge[0],ue.push(S(D,F));for(var fe=S(A?1:0,P?1:0)!==0?e(-1):e(0),Ie=ue.length-1;Ie>=0;Ie-=1)fe=fe.multiply(Pe).add(e(ue[Ie]));return fe}u.prototype.not=function(){return this.negate().prev()},d.prototype.not=h.prototype.not=u.prototype.not,u.prototype.and=function(p){return J(this,p,function(f,S){return f&S})},d.prototype.and=h.prototype.and=u.prototype.and,u.prototype.or=function(p){return J(this,p,function(f,S){return f|S})},d.prototype.or=h.prototype.or=u.prototype.or,u.prototype.xor=function(p){return J(this,p,function(f,S){return f^S})},d.prototype.xor=h.prototype.xor=u.prototype.xor;var Y=1<<30,Me=(i&-i)*(i&-i)|Y;function Ze(p){var f=p.value,S=typeof f=="number"?f|Y:typeof f=="bigint"?f|BigInt(Y):f[0]+f[1]*i|Me;return S&-S}function be(p,f){if(f.compareTo(p)<=0){var S=be(p,f.square(f)),A=S.p,P=S.e,L=A.multiply(f);return L.compareTo(p)<=0?{p:L,e:P*2+1}:{p:A,e:P*2}}return{p:e(1),e:0}}u.prototype.bitLength=function(){var p=this;return p.compareTo(e(0))<0&&(p=p.negate().subtract(e(1))),p.compareTo(e(0))===0?e(0):e(be(p,e(2)).e).add(e(1))},d.prototype.bitLength=h.prototype.bitLength=u.prototype.bitLength;function it(p,f){return p=Fe(p),f=Fe(f),p.greater(f)?p:f}function Gt(p,f){return p=Fe(p),f=Fe(f),p.lesser(f)?p:f}function ot(p,f){if(p=Fe(p).abs(),f=Fe(f).abs(),p.equals(f))return p;if(p.isZero())return f;if(f.isZero())return p;for(var S=l[1],A,P;p.isEven()&&f.isEven();)A=Gt(Ze(p),Ze(f)),p=p.divide(A),f=f.divide(A),S=S.multiply(A);for(;p.isEven();)p=p.divide(Ze(p));do{for(;f.isEven();)f=f.divide(Ze(f));p.greater(f)&&(P=f,f=p,p=P),f=f.subtract(p)}while(!f.isZero());return S.isUnit()?p:p.multiply(S)}function St(p,f){return p=Fe(p).abs(),f=Fe(f).abs(),p.divide(ot(p,f)).multiply(f)}function Rt(p,f,S){p=Fe(p),f=Fe(f);var A=S||Math.random,P=Gt(p,f),L=it(p,f),H=L.subtract(P).add(1);if(H.isSmall)return P.add(Math.floor(A()*H));for(var D=Qt(H,i).value,F=[],ae=!0,ge=0;ge<D.length;ge++){var ue=ae?D[ge]+(ge+1<D.length?D[ge+1]/i:0):i,fe=T(A()*ue);F.push(fe),fe<D[ge]&&(ae=!1)}return P.add(l.fromArray(F,i,!1))}var ft=function(p,f,S,A){S=S||o,p=String(p),A||(p=p.toLowerCase(),S=S.toLowerCase());var P=p.length,L,H=Math.abs(f),D={};for(L=0;L<S.length;L++)D[S[L]]=L;for(L=0;L<P;L++){var F=p[L];if(F!=="-"&&F in D&&D[F]>=H){if(F==="1"&&H===1)continue;throw new Error(F+" is not a valid digit in base "+f+".")}}f=Fe(f);var ae=[],ge=p[0]==="-";for(L=ge?1:0;L<p.length;L++){var F=p[L];if(F in D)ae.push(Fe(D[F]));else if(F==="<"){var ue=L;do L++;while(p[L]!==">"&&L<p.length);ae.push(Fe(p.slice(ue+1,L)))}else throw new Error(F+" is not a valid character")}return Pt(ae,f,ge)};function Pt(p,f,S){var A=l[0],P=l[1],L;for(L=p.length-1;L>=0;L--)A=A.add(p[L].times(P)),P=P.times(f);return S?A.negate():A}function Jt(p,f){return f=f||o,p<f.length?f[p]:"<"+p+">"}function Qt(p,f){if(f=e(f),f.isZero()){if(p.isZero())return{value:[0],isNegative:!1};throw new Error("Cannot convert nonzero numbers to base 0.")}if(f.equals(-1)){if(p.isZero())return{value:[0],isNegative:!1};if(p.isNegative())return{value:[].concat.apply([],Array.apply(null,Array(-p.toJSNumber())).map(Array.prototype.valueOf,[1,0])),isNegative:!1};var S=Array.apply(null,Array(p.toJSNumber()-1)).map(Array.prototype.valueOf,[0,1]);return S.unshift([1]),{value:[].concat.apply([],S),isNegative:!1}}var A=!1;if(p.isNegative()&&f.isPositive()&&(A=!0,p=p.abs()),f.isUnit())return p.isZero()?{value:[0],isNegative:!1}:{value:Array.apply(null,Array(p.toJSNumber())).map(Number.prototype.valueOf,1),isNegative:A};for(var P=[],L=p,H;L.isNegative()||L.compareAbs(f)>=0;){H=L.divmod(f),L=H.quotient;var D=H.remainder;D.isNegative()&&(D=f.minus(D).abs(),L=L.next()),P.push(D.toJSNumber())}return P.push(L.toJSNumber()),{value:P.reverse(),isNegative:A}}function Ut(p,f,S){var A=Qt(p,f);return(A.isNegative?"-":"")+A.value.map(function(P){return Jt(P,S)}).join("")}u.prototype.toArray=function(p){return Qt(this,p)},h.prototype.toArray=function(p){return Qt(this,p)},d.prototype.toArray=function(p){return Qt(this,p)},u.prototype.toString=function(p,f){if(p===t&&(p=10),p!==10||f)return Ut(this,p,f);for(var S=this.value,A=S.length,P=String(S[--A]),L="0000000",H;--A>=0;)H=String(S[A]),P+=L.slice(H.length)+H;var D=this.sign?"-":"";return D+P},h.prototype.toString=function(p,f){return p===t&&(p=10),p!=10||f?Ut(this,p,f):String(this.value)},d.prototype.toString=h.prototype.toString,d.prototype.toJSON=u.prototype.toJSON=h.prototype.toJSON=function(){return this.toString()},u.prototype.valueOf=function(){return parseInt(this.toString(),10)},u.prototype.toJSNumber=u.prototype.valueOf,h.prototype.valueOf=function(){return this.value},h.prototype.toJSNumber=h.prototype.valueOf,d.prototype.valueOf=d.prototype.toJSNumber=function(){return parseInt(this.toString(),10)};function Xt(p){if(m(+p)){var f=+p;if(f===T(f))return c?new d(BigInt(f)):new h(f);throw new Error("Invalid integer: "+p)}var S=p[0]==="-";S&&(p=p.slice(1));var A=p.split(/e/i);if(A.length>2)throw new Error("Invalid integer: "+A.join("e"));if(A.length===2){var P=A[1];if(P[0]==="+"&&(P=P.slice(1)),P=+P,P!==T(P)||!m(P))throw new Error("Invalid integer: "+P+" is not a valid exponent.");var L=A[0],H=L.indexOf(".");if(H>=0&&(P-=L.length-H-1,L=L.slice(0,H)+L.slice(H+1)),P<0)throw new Error("Cannot include negative exponent part for integers");L+=new Array(P+1).join("0"),p=L}var D=/^([0-9][0-9]*)$/.test(p);if(!D)throw new Error("Invalid integer: "+p);if(c)return new d(BigInt(S?"-"+p:p));for(var F=[],ae=p.length,ge=r,ue=ae-ge;ae>0;)F.push(+p.slice(ue,ae)),ue-=ge,ue<0&&(ue=0),ae-=ge;return g(F),new u(F,S)}function G(p){if(c)return new d(BigInt(p));if(m(p)){if(p!==T(p))throw new Error(p+" is not an integer.");return new h(p)}return Xt(p.toString())}function Fe(p){return typeof p=="number"?G(p):typeof p=="string"?Xt(p):typeof p=="bigint"?new d(p):p}for(var gt=0;gt<1e3;gt++)l[gt]=Fe(gt),gt>0&&(l[-gt]=Fe(-gt));return l.one=l[1],l.zero=l[0],l.minusOne=l[-1],l.max=it,l.min=Gt,l.gcd=ot,l.lcm=St,l.isInstance=function(p){return p instanceof u||p instanceof h||p instanceof d},l.randBetween=Rt,l.fromArray=function(p,f,S){return Pt(p.map(Fe),Fe(f||10),S)},l})();n.hasOwnProperty("exports")&&(n.exports=e)})(zl),zl.exports)}var Lx=wp(),xh=eo(Lx);var Rp=64,vh=16,Pr=Rp/vh;function Dx(){try{return!0}catch{return!1}}function Ux(n,e,t){let i=0;for(let r=0;r<t;r++){let s=n[e+r];if(s===void 0)break;i+=s*16**r}return i}function Ip(n){let e=[];for(let t=0;t<n.length;t++){let i=Number(n[t]);for(let r=0;i||r<e.length;r++)i+=(e[r]||0)*10,e[r]=i%16,i=(i-e[r])/16}return e}function Ox(n){let e=Ip(n),t=Array(Pr);for(let i=0;i<Pr;i++)t[Pr-1-i]=Ux(e,i*Pr,Pr);return t}var lo=class n{static fromString(e){return new n(Ox(e),e)}static fromBit(e){let t=Array(Pr),i=Math.floor(e/vh);for(let r=0;r<Pr;r++)t[Pr-1-r]=r===i?1<<e-i*vh:0;return new n(t)}constructor(e,t){this.parts=e,this.str=t}and({parts:e}){return new n(this.parts.map((t,i)=>t&e[i]))}or({parts:e}){return new n(this.parts.map((t,i)=>t|e[i]))}xor({parts:e}){return new n(this.parts.map((t,i)=>t^e[i]))}not(){return new n(this.parts.map(e=>~e))}equals({parts:e}){return this.parts.every((t,i)=>t===e[i])}toString(){if(this.str!=null)return this.str;let e=new Array(Rp/4);return this.parts.forEach((t,i)=>{let r=Ip(t.toString());for(let s=0;s<4;s++)e[s+i*4]=r[3-s]||0}),this.str=xh.fromArray(e,16).toString()}toJSON(){return this.toString()}},Nr=Dx();Nr&&BigInt.prototype.toJSON==null&&(BigInt.prototype.toJSON=function(){return this.toString()});var Vl={},Cp=Nr?function(e){return BigInt(e)}:function(e){return e instanceof lo?e:(typeof e=="number"&&(e=e.toString()),Vl[e]!=null||(Vl[e]=lo.fromString(e)),Vl[e])},Sn=Cp(0),Gl=Nr?function(e=Sn,t=Sn){return e&t}:function(e=Sn,t=Sn){return e.and(t)},Pp=Nr?function(e=Sn,t=Sn){return e|t}:function(e=Sn,t=Sn){return e.or(t)},Fx=Nr?function(e=Sn,t=Sn){return e^t}:function(e=Sn,t=Sn){return e.xor(t)},Bx=Nr?function(e=Sn){return~e}:function(e=Sn){return e.not()},yh=Nr?function(e,t){return e===t}:function(e,t){return e==null||t==null?e==t:e.equals(t)};function kx(...n){let e=n[0];for(let t=1;t<n.length;t++)e=Pp(e,n[t]);return e}function zx(n,e){return yh(Gl(n,e),e)}function Vx(n,e){return!yh(Gl(n,e),Sn)}function Gx(n,e){return e===Sn?n:Pp(n,e)}function Hx(n,e){return e===Sn?n:Fx(n,Gl(n,e))}var Wx=Nr?function(e){return BigInt(1)<<BigInt(e)}:function(e){return lo.fromBit(e)},je={combine:kx,add:Gx,remove:Hx,filter:Gl,invert:Bx,has:zx,hasAny:Vx,equals:yh,deserialize:Cp,getFlag:Wx};var Sh;(function(n){n[n.CLOSE_NORMAL=1e3]="CLOSE_NORMAL",n[n.CLOSE_UNSUPPORTED=1003]="CLOSE_UNSUPPORTED",n[n.CLOSE_ABNORMAL=1006]="CLOSE_ABNORMAL",n[n.INVALID_CLIENTID=4e3]="INVALID_CLIENTID",n[n.INVALID_ORIGIN=4001]="INVALID_ORIGIN",n[n.RATELIMITED=4002]="RATELIMITED",n[n.TOKEN_REVOKED=4003]="TOKEN_REVOKED",n[n.INVALID_VERSION=4004]="INVALID_VERSION",n[n.INVALID_ENCODING=4005]="INVALID_ENCODING"})(Sh||(Sh={}));var co;(function(n){n[n.INVALID_PAYLOAD=4e3]="INVALID_PAYLOAD",n[n.INVALID_COMMAND=4002]="INVALID_COMMAND",n[n.INVALID_GUILD=4003]="INVALID_GUILD",n[n.INVALID_EVENT=4004]="INVALID_EVENT",n[n.INVALID_CHANNEL=4005]="INVALID_CHANNEL",n[n.INVALID_PERMISSIONS=4006]="INVALID_PERMISSIONS",n[n.INVALID_CLIENTID=4007]="INVALID_CLIENTID",n[n.INVALID_ORIGIN=4008]="INVALID_ORIGIN",n[n.INVALID_TOKEN=4009]="INVALID_TOKEN",n[n.INVALID_USER=4010]="INVALID_USER"})(co||(co={}));var uo;(function(n){n.LANDSCAPE="landscape",n.PORTRAIT="portrait"})(uo||(uo={}));var jn;(function(n){n.MOBILE="mobile",n.DESKTOP="desktop"})(jn||(jn={}));var Xx=Object.freeze({CREATE_INSTANT_INVITE:je.getFlag(0),KICK_MEMBERS:je.getFlag(1),BAN_MEMBERS:je.getFlag(2),ADMINISTRATOR:je.getFlag(3),MANAGE_CHANNELS:je.getFlag(4),MANAGE_GUILD:je.getFlag(5),ADD_REACTIONS:je.getFlag(6),VIEW_AUDIT_LOG:je.getFlag(7),PRIORITY_SPEAKER:je.getFlag(8),STREAM:je.getFlag(9),VIEW_CHANNEL:je.getFlag(10),SEND_MESSAGES:je.getFlag(11),SEND_TTS_MESSAGES:je.getFlag(12),MANAGE_MESSAGES:je.getFlag(13),EMBED_LINKS:je.getFlag(14),ATTACH_FILES:je.getFlag(15),READ_MESSAGE_HISTORY:je.getFlag(16),MENTION_EVERYONE:je.getFlag(17),USE_EXTERNAL_EMOJIS:je.getFlag(18),VIEW_GUILD_INSIGHTS:je.getFlag(19),CONNECT:je.getFlag(20),SPEAK:je.getFlag(21),MUTE_MEMBERS:je.getFlag(22),DEAFEN_MEMBERS:je.getFlag(23),MOVE_MEMBERS:je.getFlag(24),USE_VAD:je.getFlag(25),CHANGE_NICKNAME:je.getFlag(26),MANAGE_NICKNAMES:je.getFlag(27),MANAGE_ROLES:je.getFlag(28),MANAGE_WEBHOOKS:je.getFlag(29),MANAGE_GUILD_EXPRESSIONS:je.getFlag(30),USE_APPLICATION_COMMANDS:je.getFlag(31),REQUEST_TO_SPEAK:je.getFlag(32),MANAGE_EVENTS:je.getFlag(33),MANAGE_THREADS:je.getFlag(34),CREATE_PUBLIC_THREADS:je.getFlag(35),CREATE_PRIVATE_THREADS:je.getFlag(36),USE_EXTERNAL_STICKERS:je.getFlag(37),SEND_MESSAGES_IN_THREADS:je.getFlag(38),USE_EMBEDDED_ACTIVITIES:je.getFlag(39),MODERATE_MEMBERS:je.getFlag(40),VIEW_CREATOR_MONETIZATION_ANALYTICS:je.getFlag(41),USE_SOUNDBOARD:je.getFlag(42),CREATE_GUILD_EXPRESSIONS:je.getFlag(43),CREATE_EVENTS:je.getFlag(44),USE_EXTERNAL_SOUNDS:je.getFlag(45),SEND_VOICE_MESSAGES:je.getFlag(46),SEND_POLLS:je.getFlag(49),USE_EXTERNAL_APPS:je.getFlag(50)}),bh=-1,Np=250;var Ql={};k0(Ql,{Activity:()=>Lr,Attachment:()=>Gp,CertifiedDevice:()=>cv,CertifiedDeviceTypeObject:()=>nm,Channel:()=>Zl,ChannelMention:()=>Vp,ChannelTypesObject:()=>go,Commands:()=>ye,DISPATCH:()=>Th,Embed:()=>Zp,EmbedAuthor:()=>qp,EmbedField:()=>Yp,EmbedFooter:()=>Hp,EmbedProvider:()=>Xp,Emoji:()=>Yl,Entitlement:()=>ea,EntitlementTypesObject:()=>rm,Guild:()=>lv,GuildMember:()=>po,GuildMemberRPC:()=>wh,Image:()=>ql,KeyTypesObject:()=>em,LayoutMode:()=>dv,LayoutModeTypeObject:()=>Jl,Message:()=>Ih,MessageActivity:()=>jp,MessageApplication:()=>$p,MessageReference:()=>Jp,Orientation:()=>hv,OrientationLockState:()=>uv,OrientationLockStateTypeObject:()=>sm,OrientationTypeObject:()=>$l,PermissionOverwrite:()=>Bp,PermissionOverwriteTypeObject:()=>Fp,PresenceUpdate:()=>kp,Reaction:()=>Kp,ReceiveFramePayload:()=>vi,Relationship:()=>Ah,Role:()=>zp,Scopes:()=>ov,ScopesObject:()=>Up,ShortcutKey:()=>Kl,Sku:()=>Ph,SkuTypeObject:()=>im,Status:()=>fo,StatusObject:()=>Op,ThermalState:()=>Nh,ThermalStateTypeObject:()=>am,User:()=>Oi,UserVoiceState:()=>mo,Video:()=>Wp,VoiceDevice:()=>Qp,VoiceSettingModeTypeObject:()=>tm,VoiceSettingsIO:()=>jl,VoiceSettingsMode:()=>Ch,VoiceState:()=>Rh});function un(n){return _h(e=>{var t;let[i]=(t=Object.entries(n).find(([,r])=>r===e))!==null&&t!==void 0?t:[];return e!=null&&i===void 0?n.UNHANDLED:e},z().or(Ge()))}function Hl(n){let e=kl().transform(t=>{let i=n.safeParse(t);return i.success?i.data:n._def.defaultValue()});return e.overlayType=n,e}var Dp=U.object({image_url:U.string()}).describe('Response for "INITIATE_IMAGE_UPLOAD" Command'),qx=U.object({mediaUrl:U.string().max(1024)}).describe('Request for "OPEN_SHARE_MOMENT_DIALOG" Command'),Yx=U.object({access_token:U.union([U.string(),U.null()]).optional()}).describe('Request for "AUTHENTICATE" Command'),Wl=U.object({access_token:U.string(),user:U.object({username:U.string(),discriminator:U.string(),id:U.string(),avatar:U.union([U.string(),U.null()]).optional(),public_flags:U.number(),global_name:U.union([U.string(),U.null()]).optional()}),scopes:U.array(Hl(U.enum(["identify","identify.premium","email","connections","guilds","guilds.join","guilds.members.read","guilds.channels.read","gdm.join","bot","rpc","rpc.notifications.read","rpc.voice.read","rpc.voice.write","rpc.video.read","rpc.video.write","rpc.screenshare.read","rpc.screenshare.write","rpc.activities.write","webhook.incoming","messages.read","applications.builds.upload","applications.builds.read","applications.commands","applications.commands.permissions.update","applications.commands.update","applications.store.update","applications.entitlements","activities.read","activities.write","activities.invites.write","relationships.read","relationships.write","voice","dm_channels.read","role_connections.write","presences.read","presences.write","openid","dm_channels.messages.read","dm_channels.messages.write","gateway.connect","account.global_name.update","payment_sources.country_code","sdk.social_layer_presence","sdk.social_layer","lobbies.write","application_identities.write"]).or(U.literal(-1)).default(-1))),expires:U.string(),application:U.object({description:U.string(),icon:U.union([U.string(),U.null()]).optional(),id:U.string(),rpc_origins:U.array(U.string()).optional(),name:U.string()})}).describe('Response for "AUTHENTICATE" Command'),Mh=U.object({participants:U.array(U.object({id:U.string(),username:U.string(),global_name:U.union([U.string(),U.null()]).optional(),discriminator:U.string(),avatar:U.union([U.string(),U.null()]).optional(),flags:U.number(),bot:U.boolean(),avatar_decoration_data:U.union([U.object({asset:U.union([U.string(),U.null()]).optional(),skuId:U.string().optional(),expiresAt:U.number().optional()}),U.null()]).optional(),premium_type:U.union([U.number(),U.null()]).optional(),nickname:U.string().optional()}))}).describe('Response for "GET_ACTIVITY_INSTANCE_CONNECTED_PARTICIPANTS" Command'),Zx=U.object({command:U.string(),options:U.array(U.object({name:U.string(),value:U.string()})).optional(),content:U.string().max(2e3).optional(),require_launch_channel:U.boolean().optional(),preview_image:U.object({height:U.number(),url:U.string(),width:U.number()}).optional(),components:U.array(U.object({type:U.literal(1),components:U.array(U.object({type:U.literal(2),style:U.number().gte(1).lte(5),label:U.string().max(80).optional(),custom_id:U.string().max(100).describe("Developer-defined identifier for the button; max 100 characters").optional()})).max(5).optional()})).optional(),pid:U.number().optional()}).describe('Request for "SHARE_INTERACTION" Command'),Kx=U.object({success:U.boolean()}).describe('Response for "SHARE_INTERACTION" Command'),jx=U.object({custom_id:U.string().max(64).optional(),message:U.string().max(1e3),link_id:U.string().max(64).optional()}).describe('Request for "SHARE_LINK" Command'),$x=U.object({success:U.boolean(),didCopyLink:U.boolean(),didSendMessage:U.boolean()}).describe('Response for "SHARE_LINK" Command'),Eh=U.object({relationships:U.array(U.object({type:U.number(),user:U.object({id:U.string(),username:U.string(),global_name:U.union([U.string(),U.null()]).optional(),discriminator:U.string(),avatar:U.union([U.string(),U.null()]).optional(),flags:U.number(),bot:U.boolean(),avatar_decoration_data:U.union([U.object({asset:U.union([U.string(),U.null()]).optional(),skuId:U.string().optional(),expiresAt:U.number().optional()}),U.null()]).optional(),premium_type:U.union([U.number(),U.null()]).optional()}),presence:U.object({status:U.string(),activity:U.union([U.object({session_id:U.string().optional(),type:U.number().optional(),name:U.string(),url:U.union([U.string(),U.null()]).optional(),application_id:U.string().optional(),status_display_type:U.number().optional(),state:U.string().optional(),state_url:U.string().optional(),details:U.string().optional(),details_url:U.string().optional(),emoji:U.union([U.object({name:U.string(),id:U.union([U.string(),U.null()]).optional(),animated:U.union([U.boolean(),U.null()]).optional()}),U.null()]).optional(),assets:U.object({large_image:U.string().optional(),large_text:U.string().optional(),large_url:U.string().optional(),small_image:U.string().optional(),small_text:U.string().optional(),small_url:U.string().optional()}).optional(),timestamps:U.object({start:U.number().optional(),end:U.number().optional()}).optional(),party:U.object({id:U.string().optional(),size:U.array(U.number()).min(2).max(2).optional(),privacy:U.number().optional()}).optional(),secrets:U.object({match:U.string().optional(),join:U.string().optional()}).optional(),sync_id:U.string().optional(),created_at:U.number().optional(),instance:U.boolean().optional(),flags:U.number().optional(),metadata:U.object({}).optional(),platform:U.string().optional(),supported_platforms:U.array(U.string()).optional(),buttons:U.array(U.string()).optional(),hangStatus:U.string().optional()}),U.null()]).optional()}).optional()}))}).describe('Response for "GET_RELATIONSHIPS" Command'),Jx=U.object({user_id:U.string(),content:U.string().min(0).max(1024).optional()}).describe('Request for "INVITE_USER_EMBEDDED" Command'),Qx=U.object({id:U.string().max(64)}).describe('Request for "GET_USER" Command'),ev=U.union([U.object({id:U.string(),username:U.string(),global_name:U.union([U.string(),U.null()]).optional(),discriminator:U.string(),avatar:U.union([U.string(),U.null()]).optional(),flags:U.number(),bot:U.boolean(),avatar_decoration_data:U.union([U.object({asset:U.union([U.string(),U.null()]).optional(),skuId:U.string().optional(),expiresAt:U.number().optional()}),U.null()]).optional(),premium_type:U.union([U.number(),U.null()]).optional()}),U.null()]),tv=U.object({quest_id:U.string()}).describe('Request for "GET_QUEST_ENROLLMENT_STATUS" Command'),nv=U.object({quest_id:U.string(),is_enrolled:U.boolean(),enrolled_at:U.union([U.string(),U.null()]).optional()}).describe('Response for "GET_QUEST_ENROLLMENT_STATUS" Command'),iv=U.object({quest_id:U.string()}).describe('Request for "QUEST_START_TIMER" Command'),rv=U.object({success:U.boolean()}).describe('Response for "QUEST_START_TIMER" Command'),sv=U.object({quest_id:U.string(),enrolled_at:U.union([U.string(),U.null()]).optional(),completed_at:U.union([U.string(),U.null()]).optional(),external_cta_url:U.string()}).describe('Response for "GET_QUEST" Command'),av=U.object({ticket:U.string()}).describe('Response for "REQUEST_PROXY_TICKET_REFRESH" Command'),pt;(function(n){n.INITIATE_IMAGE_UPLOAD="INITIATE_IMAGE_UPLOAD",n.OPEN_SHARE_MOMENT_DIALOG="OPEN_SHARE_MOMENT_DIALOG",n.AUTHENTICATE="AUTHENTICATE",n.GET_ACTIVITY_INSTANCE_CONNECTED_PARTICIPANTS="GET_ACTIVITY_INSTANCE_CONNECTED_PARTICIPANTS",n.SHARE_INTERACTION="SHARE_INTERACTION",n.SHARE_LINK="SHARE_LINK",n.GET_RELATIONSHIPS="GET_RELATIONSHIPS",n.INVITE_USER_EMBEDDED="INVITE_USER_EMBEDDED",n.GET_USER="GET_USER",n.GET_QUEST_ENROLLMENT_STATUS="GET_QUEST_ENROLLMENT_STATUS",n.QUEST_START_TIMER="QUEST_START_TIMER",n.GET_QUEST="GET_QUEST",n.REQUEST_PROXY_TICKET_REFRESH="REQUEST_PROXY_TICKET_REFRESH"})(pt||(pt={}));var Lp=U.object({}).optional().nullable(),ho=U.void(),Xl={[pt.INITIATE_IMAGE_UPLOAD]:{request:ho,response:Dp},[pt.OPEN_SHARE_MOMENT_DIALOG]:{request:qx,response:Lp},[pt.AUTHENTICATE]:{request:Yx,response:Wl},[pt.GET_ACTIVITY_INSTANCE_CONNECTED_PARTICIPANTS]:{request:ho,response:Mh},[pt.SHARE_INTERACTION]:{request:Zx,response:Kx},[pt.SHARE_LINK]:{request:jx,response:$x},[pt.GET_RELATIONSHIPS]:{request:ho,response:Eh},[pt.INVITE_USER_EMBEDDED]:{request:Jx,response:Lp},[pt.GET_USER]:{request:Qx,response:ev},[pt.GET_QUEST_ENROLLMENT_STATUS]:{request:tv,response:nv},[pt.QUEST_START_TIMER]:{request:iv,response:rv},[pt.GET_QUEST]:{request:ho,response:sv},[pt.REQUEST_PROXY_TICKET_REFRESH]:{request:ho,response:av}};var Th="DISPATCH",ye;(function(n){n.AUTHORIZE="AUTHORIZE",n.GET_GUILDS="GET_GUILDS",n.GET_GUILD="GET_GUILD",n.GET_CHANNEL="GET_CHANNEL",n.GET_CHANNELS="GET_CHANNELS",n.SELECT_VOICE_CHANNEL="SELECT_VOICE_CHANNEL",n.SELECT_TEXT_CHANNEL="SELECT_TEXT_CHANNEL",n.SUBSCRIBE="SUBSCRIBE",n.UNSUBSCRIBE="UNSUBSCRIBE",n.CAPTURE_SHORTCUT="CAPTURE_SHORTCUT",n.SET_CERTIFIED_DEVICES="SET_CERTIFIED_DEVICES",n.SET_ACTIVITY="SET_ACTIVITY",n.GET_SKUS="GET_SKUS",n.GET_ENTITLEMENTS="GET_ENTITLEMENTS",n.GET_SKUS_EMBEDDED="GET_SKUS_EMBEDDED",n.GET_ENTITLEMENTS_EMBEDDED="GET_ENTITLEMENTS_EMBEDDED",n.START_PURCHASE="START_PURCHASE",n.SET_CONFIG="SET_CONFIG",n.SEND_ANALYTICS_EVENT="SEND_ANALYTICS_EVENT",n.USER_SETTINGS_GET_LOCALE="USER_SETTINGS_GET_LOCALE",n.OPEN_EXTERNAL_LINK="OPEN_EXTERNAL_LINK",n.ENCOURAGE_HW_ACCELERATION="ENCOURAGE_HW_ACCELERATION",n.CAPTURE_LOG="CAPTURE_LOG",n.SET_ORIENTATION_LOCK_STATE="SET_ORIENTATION_LOCK_STATE",n.OPEN_INVITE_DIALOG="OPEN_INVITE_DIALOG",n.GET_PLATFORM_BEHAVIORS="GET_PLATFORM_BEHAVIORS",n.GET_CHANNEL_PERMISSIONS="GET_CHANNEL_PERMISSIONS",n.AUTHENTICATE="AUTHENTICATE",n.GET_ACTIVITY_INSTANCE_CONNECTED_PARTICIPANTS="GET_ACTIVITY_INSTANCE_CONNECTED_PARTICIPANTS",n.GET_QUEST="GET_QUEST",n.GET_QUEST_ENROLLMENT_STATUS="GET_QUEST_ENROLLMENT_STATUS",n.GET_RELATIONSHIPS="GET_RELATIONSHIPS",n.GET_USER="GET_USER",n.INITIATE_IMAGE_UPLOAD="INITIATE_IMAGE_UPLOAD",n.INVITE_USER_EMBEDDED="INVITE_USER_EMBEDDED",n.OPEN_SHARE_MOMENT_DIALOG="OPEN_SHARE_MOMENT_DIALOG",n.QUEST_START_TIMER="QUEST_START_TIMER",n.REQUEST_PROXY_TICKET_REFRESH="REQUEST_PROXY_TICKET_REFRESH",n.SHARE_INTERACTION="SHARE_INTERACTION",n.SHARE_LINK="SHARE_LINK"})(ye||(ye={}));var vi=xe({cmd:z(),data:fs(),evt:Qs(),nonce:z()}).passthrough(),Up=Object.assign(Object.assign({},Wl.shape.scopes.element.overlayType._def.innerType.options[0].Values),{UNHANDLED:-1}),ov=un(Up),Ah=Eh.shape.relationships.element,Oi=xe({id:z(),username:z(),discriminator:z(),global_name:z().optional().nullable(),avatar:z().optional().nullable(),avatar_decoration_data:xe({asset:z(),sku_id:z().optional()}).nullable(),bot:Ke(),flags:Ge().optional().nullable(),premium_type:Ge().optional().nullable()}),po=xe({user:Oi,nick:z().optional().nullable(),roles:Mt(z()),joined_at:z(),deaf:Ke(),mute:Ke()}),wh=xe({user_id:z(),nick:z().optional().nullable(),guild_id:z(),avatar:z().optional().nullable(),avatar_decoration_data:xe({asset:z(),sku_id:z().optional().nullable()}).optional().nullable(),color_string:z().optional().nullable()}),Yl=xe({id:z(),name:z().optional().nullable(),roles:Mt(z()).optional().nullable(),user:Oi.optional().nullable(),require_colons:Ke().optional().nullable(),managed:Ke().optional().nullable(),animated:Ke().optional().nullable(),available:Ke().optional().nullable()}),Rh=xe({mute:Ke(),deaf:Ke(),self_mute:Ke(),self_deaf:Ke(),suppress:Ke()}),mo=xe({mute:Ke(),nick:z(),user:Oi,voice_state:Rh,volume:Ge()}),Op={UNHANDLED:-1,IDLE:"idle",DND:"dnd",ONLINE:"online",OFFLINE:"offline"},fo=un(Op),Lr=xe({name:z(),type:Ge(),url:z().optional().nullable(),created_at:Ge().optional().nullable(),timestamps:xe({start:Ge(),end:Ge()}).partial().optional().nullable(),application_id:z().optional().nullable(),details:z().optional().nullable(),details_url:z().url().optional().nullable(),state:z().optional().nullable(),state_url:z().url().optional().nullable(),emoji:Yl.optional().nullable(),party:xe({id:z().optional().nullable(),size:Mt(Ge()).optional().nullable()}).optional().nullable(),assets:xe({large_image:z().nullable(),large_text:z().nullable(),large_url:z().url().optional().nullable(),small_image:z().nullable(),small_text:z().nullable(),small_url:z().url().optional().nullable()}).partial().optional().nullable(),secrets:xe({join:z(),match:z()}).partial().optional().nullable(),instance:Ke().optional().nullable(),flags:Ge().optional().nullable()}),Fp={UNHANDLED:-1,ROLE:0,MEMBER:1},Bp=xe({id:z(),type:un(Fp),allow:z(),deny:z()}),go={UNHANDLED:-1,DM:1,GROUP_DM:3,GUILD_TEXT:0,GUILD_VOICE:2,GUILD_CATEGORY:4,GUILD_ANNOUNCEMENT:5,GUILD_STORE:6,ANNOUNCEMENT_THREAD:10,PUBLIC_THREAD:11,PRIVATE_THREAD:12,GUILD_STAGE_VOICE:13,GUILD_DIRECTORY:14,GUILD_FORUM:15},Zl=xe({id:z(),type:un(go),guild_id:z().optional().nullable(),position:Ge().optional().nullable(),permission_overwrites:Mt(Bp).optional().nullable(),name:z().optional().nullable(),topic:z().optional().nullable(),nsfw:Ke().optional().nullable(),last_message_id:z().optional().nullable(),bitrate:Ge().optional().nullable(),user_limit:Ge().optional().nullable(),rate_limit_per_user:Ge().optional().nullable(),recipients:Mt(Oi).optional().nullable(),icon:z().optional().nullable(),owner_id:z().optional().nullable(),application_id:z().optional().nullable(),parent_id:z().optional().nullable(),last_pin_timestamp:z().optional().nullable()}),kp=xe({user:Oi,guild_id:z(),status:fo,activities:Mt(Lr),client_status:xe({desktop:fo,mobile:fo,web:fo}).partial()}),zp=xe({id:z(),name:z(),color:Ge(),hoist:Ke(),position:Ge(),permissions:z(),managed:Ke(),mentionable:Ke()}),lv=xe({id:z(),name:z(),owner_id:z(),icon:z().nullable(),icon_hash:z().optional().nullable(),splash:z().nullable(),discovery_splash:z().nullable(),owner:Ke().optional().nullable(),permissions:z().optional().nullable(),region:z(),afk_channel_id:z().nullable(),afk_timeout:Ge(),widget_enabled:Ke().optional().nullable(),widget_channel_id:z().optional().nullable(),verification_level:Ge(),default_message_notifications:Ge(),explicit_content_filter:Ge(),roles:Mt(zp),emojis:Mt(Yl),features:Mt(z()),mfa_level:Ge(),application_id:z().nullable(),system_channel_id:z().nullable(),system_channel_flags:Ge(),rules_channel_id:z().nullable(),joined_at:z().optional().nullable(),large:Ke().optional().nullable(),unavailable:Ke().optional().nullable(),member_count:Ge().optional().nullable(),voice_states:Mt(Rh).optional().nullable(),members:Mt(po).optional().nullable(),channels:Mt(Zl).optional().nullable(),presences:Mt(kp).optional().nullable(),max_presences:Ge().optional().nullable(),max_members:Ge().optional().nullable(),vanity_url_code:z().nullable(),description:z().nullable(),banner:z().nullable(),premium_tier:Ge(),premium_subscription_count:Ge().optional().nullable(),preferred_locale:z(),public_updates_channel_id:z().nullable(),max_video_channel_users:Ge().optional().nullable(),approximate_member_count:Ge().optional().nullable(),approximate_presence_count:Ge().optional().nullable()}),Vp=xe({id:z(),guild_id:z(),type:Ge(),name:z()}),Gp=xe({id:z(),filename:z(),size:Ge(),url:z(),proxy_url:z(),height:Ge().optional().nullable(),width:Ge().optional().nullable()}),Hp=xe({text:z(),icon_url:z().optional().nullable(),proxy_icon_url:z().optional().nullable()}),ql=xe({url:z().optional().nullable(),proxy_url:z().optional().nullable(),height:Ge().optional().nullable(),width:Ge().optional().nullable()}),Wp=ql.omit({proxy_url:!0}),Xp=xe({name:z().optional().nullable(),url:z().optional().nullable()}),qp=xe({name:z().optional().nullable(),url:z().optional().nullable(),icon_url:z().optional().nullable(),proxy_icon_url:z().optional().nullable()}),Yp=xe({name:z(),value:z(),inline:Ke()}),Zp=xe({title:z().optional().nullable(),type:z().optional().nullable(),description:z().optional().nullable(),url:z().optional().nullable(),timestamp:z().optional().nullable(),color:Ge().optional().nullable(),footer:Hp.optional().nullable(),image:ql.optional().nullable(),thumbnail:ql.optional().nullable(),video:Wp.optional().nullable(),provider:Xp.optional().nullable(),author:qp.optional().nullable(),fields:Mt(Yp).optional().nullable()}),Kp=xe({count:Ge(),me:Ke(),emoji:Yl}),jp=xe({type:Ge(),party_id:z().optional().nullable()}),$p=xe({id:z(),cover_image:z().optional().nullable(),description:z(),icon:z().optional().nullable(),name:z()}),Jp=xe({message_id:z().optional().nullable(),channel_id:z().optional().nullable(),guild_id:z().optional().nullable()}),Ih=xe({id:z(),channel_id:z(),guild_id:z().optional().nullable(),author:Oi.optional().nullable(),member:po.optional().nullable(),content:z(),timestamp:z(),edited_timestamp:z().optional().nullable(),tts:Ke(),mention_everyone:Ke(),mentions:Mt(Oi),mention_roles:Mt(z()),mention_channels:Mt(Vp),attachments:Mt(Gp),embeds:Mt(Zp),reactions:Mt(Kp).optional().nullable(),nonce:oo([z(),Ge()]).optional().nullable(),pinned:Ke(),webhook_id:z().optional().nullable(),type:Ge(),activity:jp.optional().nullable(),application:$p.optional().nullable(),message_reference:Jp.optional().nullable(),flags:Ge().optional().nullable(),stickers:Mt(fs()).optional().nullable(),referenced_message:fs().optional().nullable()}),Qp=xe({id:z(),name:z()}),em={UNHANDLED:-1,KEYBOARD_KEY:0,MOUSE_BUTTON:1,KEYBOARD_MODIFIER_KEY:2,GAMEPAD_BUTTON:3},Kl=xe({type:un(em),code:Ge(),name:z()}),tm={UNHANDLED:-1,PUSH_TO_TALK:"PUSH_TO_TALK",VOICE_ACTIVITY:"VOICE_ACTIVITY"},Ch=xe({type:un(tm),auto_threshold:Ke(),threshold:Ge(),shortcut:Mt(Kl),delay:Ge()}),jl=xe({device_id:z(),volume:Ge(),available_devices:Mt(Qp)}),nm={UNHANDLED:-1,AUDIO_INPUT:"AUDIO_INPUT",AUDIO_OUTPUT:"AUDIO_OUTPUT",VIDEO_INPUT:"VIDEO_INPUT"},cv=xe({type:un(nm),id:z(),vendor:xe({name:z(),url:z()}),model:xe({name:z(),url:z()}),related:Mt(z()),echo_cancellation:Ke().optional().nullable(),noise_suppression:Ke().optional().nullable(),automatic_gain_control:Ke().optional().nullable(),hardware_mute:Ke().optional().nullable()}),im={UNHANDLED:-1,APPLICATION:1,DLC:2,CONSUMABLE:3,BUNDLE:4,SUBSCRIPTION:5},Ph=xe({id:z(),name:z(),type:un(im),price:xe({amount:Ge(),currency:z()}),application_id:z(),flags:Ge(),release_date:z().nullable()}),rm={UNHANDLED:-1,PURCHASE:1,PREMIUM_SUBSCRIPTION:2,DEVELOPER_GIFT:3,TEST_MODE_PURCHASE:4,FREE_PURCHASE:5,USER_GIFT:6,PREMIUM_PURCHASE:7},ea=xe({id:z(),sku_id:z(),application_id:z(),user_id:z(),gift_code_flags:Ge(),type:un(rm),gifter_user_id:z().optional().nullable(),branches:Mt(z()).optional().nullable(),starts_at:z().optional().nullable(),ends_at:z().optional().nullable(),parent_id:z().optional().nullable(),consumed:Ke().optional().nullable(),deleted:Ke().optional().nullable(),gift_code_batch_id:z().optional().nullable()}),sm={UNHANDLED:-1,UNLOCKED:1,PORTRAIT:2,LANDSCAPE:3},uv=un(sm),am={UNHANDLED:-1,NOMINAL:0,FAIR:1,SERIOUS:2,CRITICAL:3},Nh=un(am),$l={UNHANDLED:-1,PORTRAIT:0,LANDSCAPE:1},hv=un($l),Jl={UNHANDLED:-1,FOCUSED:0,PIP:1,GRID:2},dv=un(Jl);var _o="ERROR",_t;(function(n){n.READY="READY",n.VOICE_STATE_UPDATE="VOICE_STATE_UPDATE",n.SPEAKING_START="SPEAKING_START",n.SPEAKING_STOP="SPEAKING_STOP",n.ACTIVITY_LAYOUT_MODE_UPDATE="ACTIVITY_LAYOUT_MODE_UPDATE",n.ORIENTATION_UPDATE="ORIENTATION_UPDATE",n.CURRENT_USER_UPDATE="CURRENT_USER_UPDATE",n.CURRENT_GUILD_MEMBER_UPDATE="CURRENT_GUILD_MEMBER_UPDATE",n.ENTITLEMENT_CREATE="ENTITLEMENT_CREATE",n.THERMAL_STATE_UPDATE="THERMAL_STATE_UPDATE",n.ACTIVITY_INSTANCE_PARTICIPANTS_UPDATE="ACTIVITY_INSTANCE_PARTICIPANTS_UPDATE",n.RELATIONSHIP_UPDATE="RELATIONSHIP_UPDATE",n.ACTIVITY_JOIN="ACTIVITY_JOIN",n.QUEST_ENROLLMENT_STATUS_UPDATE="QUEST_ENROLLMENT_STATUS_UPDATE"})(_t||(_t={}));var An=vi.extend({evt:rr(_t),nonce:z().nullable(),cmd:Ht(Th),data:xe({}).passthrough()}),Lh=vi.extend({evt:Ht(_o),data:xe({code:Ge(),message:z().optional()}).passthrough(),cmd:rr(ye),nonce:z().nullable()}),fv=An.extend({evt:z()}),om=oo([An,fv,Lh]);function lm(n){let e=n.evt;if(!(e in _t))throw new Error(`Unrecognized event type ${n.evt}`);return pv[e].payload.parse(n)}var pv={[_t.READY]:{payload:An.extend({evt:Ht(_t.READY),data:xe({v:Ge(),config:xe({cdn_host:z().optional(),api_endpoint:z(),environment:z()}),user:xe({id:z(),username:z(),discriminator:z(),avatar:z().optional()}).optional()})})},[_t.VOICE_STATE_UPDATE]:{payload:An.extend({evt:Ht(_t.VOICE_STATE_UPDATE),data:mo}),subscribeArgs:xe({channel_id:z()})},[_t.SPEAKING_START]:{payload:An.extend({evt:Ht(_t.SPEAKING_START),data:xe({lobby_id:z().optional(),channel_id:z().optional(),user_id:z()})}),subscribeArgs:xe({lobby_id:z().nullable().optional(),channel_id:z().nullable().optional()})},[_t.SPEAKING_STOP]:{payload:An.extend({evt:Ht(_t.SPEAKING_STOP),data:xe({lobby_id:z().optional(),channel_id:z().optional(),user_id:z()})}),subscribeArgs:xe({lobby_id:z().nullable().optional(),channel_id:z().nullable().optional()})},[_t.ACTIVITY_LAYOUT_MODE_UPDATE]:{payload:An.extend({evt:Ht(_t.ACTIVITY_LAYOUT_MODE_UPDATE),data:xe({layout_mode:un(Jl)})})},[_t.ORIENTATION_UPDATE]:{payload:An.extend({evt:Ht(_t.ORIENTATION_UPDATE),data:xe({screen_orientation:un($l),orientation:rr(uo)})})},[_t.CURRENT_USER_UPDATE]:{payload:An.extend({evt:Ht(_t.CURRENT_USER_UPDATE),data:Oi})},[_t.CURRENT_GUILD_MEMBER_UPDATE]:{payload:An.extend({evt:Ht(_t.CURRENT_GUILD_MEMBER_UPDATE),data:wh}),subscribeArgs:xe({guild_id:z()})},[_t.ENTITLEMENT_CREATE]:{payload:An.extend({evt:Ht(_t.ENTITLEMENT_CREATE),data:xe({entitlement:ea})})},[_t.THERMAL_STATE_UPDATE]:{payload:An.extend({evt:Ht(_t.THERMAL_STATE_UPDATE),data:xe({thermal_state:Nh})})},[_t.ACTIVITY_INSTANCE_PARTICIPANTS_UPDATE]:{payload:An.extend({evt:Ht(_t.ACTIVITY_INSTANCE_PARTICIPANTS_UPDATE),data:xe({participants:Mh.shape.participants})})},[_t.RELATIONSHIP_UPDATE]:{payload:An.extend({evt:Ht(_t.RELATIONSHIP_UPDATE),data:Ah})},[_t.ACTIVITY_JOIN]:{payload:An.extend({evt:Ht(_t.ACTIVITY_JOIN),data:xe({applicationId:z(),secret:z()})})},[_t.QUEST_ENROLLMENT_STATUS_UPDATE]:{payload:An.extend({evt:Ht(_t.QUEST_ENROLLMENT_STATUS_UPDATE),data:xe({quest_id:z(),is_enrolled:Ke(),enrolled_at:z().date()})})}};function cm(n,e){throw e}var ms=xe({}).nullable(),Dh=xe({code:z()}),mv=xe({guilds:Mt(xe({id:z(),name:z()}))}),gv=xe({id:z(),name:z(),icon_url:z().optional(),members:Mt(po)}),ps=xe({id:z(),type:un(go),guild_id:z().optional().nullable(),name:z().optional().nullable(),topic:z().optional().nullable(),bitrate:Ge().optional().nullable(),user_limit:Ge().optional().nullable(),position:Ge().optional().nullable(),voice_states:Mt(mo),messages:Mt(Ih)}),_v=xe({channels:Mt(Zl)}),CA=ps.nullable(),xv=ps.nullable(),vv=ps.nullable(),PA=xe({input:jl,output:jl,mode:Ch,automatic_gain_control:Ke(),echo_cancellation:Ke(),noise_suppression:Ke(),qos:Ke(),silence_warning:Ke(),deaf:Ke(),mute:Ke()}),yv=xe({evt:z()}),Sv=xe({shortcut:Kl}),Uh=Lr,Oh=xe({skus:Mt(Ph)}),Fh=xe({entitlements:Mt(ea)}),Bh=Mt(ea).nullable(),kh=xe({use_interactive_pip:Ke()}),zh=xe({locale:z()}),Vh=xe({enabled:Ke()}),Gh=xe({permissions:mh().or(z())}),Hh=Hl(xe({opened:Ke().or(Qs())}).default({opened:null})),Wh=xe({iosKeyboardResizesView:gh(Ke())}),um=vi.extend({cmd:rr(ye),evt:Qs()});function bv({cmd:n,data:e}){switch(n){case ye.AUTHORIZE:return Dh.parse(e);case ye.CAPTURE_SHORTCUT:return Sv.parse(e);case ye.ENCOURAGE_HW_ACCELERATION:return Vh.parse(e);case ye.GET_CHANNEL:return ps.parse(e);case ye.GET_CHANNELS:return _v.parse(e);case ye.GET_CHANNEL_PERMISSIONS:return Gh.parse(e);case ye.GET_GUILD:return gv.parse(e);case ye.GET_GUILDS:return mv.parse(e);case ye.GET_PLATFORM_BEHAVIORS:return Wh.parse(e);case ye.GET_CHANNEL:return ps.parse(e);case ye.SELECT_TEXT_CHANNEL:return vv.parse(e);case ye.SELECT_VOICE_CHANNEL:return xv.parse(e);case ye.SET_ACTIVITY:return Uh.parse(e);case ye.GET_SKUS_EMBEDDED:return Oh.parse(e);case ye.GET_ENTITLEMENTS_EMBEDDED:return Fh.parse(e);case ye.SET_CONFIG:return kh.parse(e);case ye.START_PURCHASE:return Bh.parse(e);case ye.SUBSCRIBE:case ye.UNSUBSCRIBE:return yv.parse(e);case ye.USER_SETTINGS_GET_LOCALE:return zh.parse(e);case ye.OPEN_EXTERNAL_LINK:return Hh.parse(e);case ye.SET_ORIENTATION_LOCK_STATE:case ye.SET_CERTIFIED_DEVICES:case ye.SEND_ANALYTICS_EVENT:case ye.OPEN_INVITE_DIALOG:case ye.CAPTURE_LOG:case ye.GET_SKUS:case ye.GET_ENTITLEMENTS:return ms.parse(e);case ye.AUTHENTICATE:case ye.GET_ACTIVITY_INSTANCE_CONNECTED_PARTICIPANTS:case ye.GET_QUEST:case ye.GET_QUEST_ENROLLMENT_STATUS:case ye.GET_RELATIONSHIPS:case ye.GET_USER:case ye.INITIATE_IMAGE_UPLOAD:case ye.INVITE_USER_EMBEDDED:case ye.OPEN_SHARE_MOMENT_DIALOG:case ye.QUEST_START_TIMER:case ye.REQUEST_PROXY_TICKET_REFRESH:case ye.SHARE_INTERACTION:case ye.SHARE_LINK:let{response:t}=Xl[n];return t.parse(e);default:cm(n,new Error(`Unrecognized command ${n}`))}}function hm(n){return Object.assign(Object.assign({},n),{data:bv(n)})}xe({frame_id:z(),platform:rr(jn).optional().nullable()});xe({v:Ht(1),encoding:Ht("json").optional(),client_id:z(),frame_id:z()});var fm=xe({code:Ge(),message:z().optional()}),Mv=xe({evt:z().nullable(),nonce:z().nullable(),data:fs().nullable(),cmd:z()}).passthrough();function pm(n){let e=Mv.parse(n);return e.evt!=null?e.evt===_o?Lh.parse(e):lm(om.parse(e)):hm(um.passthrough().parse(e))}function kt(n,e,t,i=()=>{}){let r=vi.extend({cmd:Ht(e),data:t});return async s=>{let a=await n({cmd:e,args:s,transfer:i(s)});return r.parse(a).data}}function Wt(n,e=()=>{}){let t=Xl[n].response,i=vi.extend({cmd:Ht(n),data:t});return r=>async s=>{let a=await r({cmd:n,args:s,transfer:e(s)});return i.parse(a).data}}var mm=n=>kt(n,ye.AUTHORIZE,Dh);var gm=n=>kt(n,ye.CAPTURE_LOG,ms);var _m=n=>kt(n,ye.ENCOURAGE_HW_ACCELERATION,Vh);var xm=n=>kt(n,ye.GET_CHANNEL,ps);var vm=n=>kt(n,ye.GET_ENTITLEMENTS_EMBEDDED,Fh);var ym=n=>kt(n,ye.GET_SKUS_EMBEDDED,Oh);var Sm=n=>kt(n,ye.GET_CHANNEL_PERMISSIONS,Gh);var bm=n=>kt(n,ye.GET_PLATFORM_BEHAVIORS,Wh);var Mm=n=>kt(n,ye.OPEN_EXTERNAL_LINK,Hh);var Em=n=>kt(n,ye.OPEN_INVITE_DIALOG,ms);Lr.pick({state:!0,state_url:!0,details:!0,details_url:!0,timestamps:!0,assets:!0,party:!0,secrets:!0,instance:!0,type:!0}).extend({type:Lr.shape.type.optional(),instance:Lr.shape.instance.optional()}).nullable();var Tm=n=>kt(n,ye.SET_ACTIVITY,Uh);var Am=n=>kt(n,ye.SET_CONFIG,kh);function wm({sendCommand:n,cmd:e,response:t,fallbackTransform:i,transferTransform:r=()=>{}}){let s=vi.extend({cmd:Ht(e),data:t});return async a=>{try{let o=await n({cmd:e,args:a,transfer:r(a)});return s.parse(o).data}catch(o){if(o.code===co.INVALID_PAYLOAD){let c=i(a),l=await n({cmd:e,args:c,transfer:r(c)});return s.parse(l).data}else throw o}}}var Ev=n=>({lock_state:n.lock_state,picture_in_picture_lock_state:n.picture_in_picture_lock_state}),Rm=n=>wm({sendCommand:n,cmd:ye.SET_ORIENTATION_LOCK_STATE,response:ms,fallbackTransform:Ev});var Im=n=>kt(n,ye.START_PURCHASE,Bh);var Cm=n=>kt(n,ye.USER_SETTINGS_GET_LOCALE,zh);var Pm=Wt(pt.AUTHENTICATE);var Xh=Wt(pt.GET_ACTIVITY_INSTANCE_CONNECTED_PARTICIPANTS);var Nm=Wt(pt.GET_QUEST);var Lm=Wt(pt.GET_QUEST_ENROLLMENT_STATUS);var Dm=Wt(pt.GET_RELATIONSHIPS);var Um=Wt(pt.GET_USER);var Om=Wt(pt.INITIATE_IMAGE_UPLOAD);var Fm=Wt(pt.INVITE_USER_EMBEDDED);var Bm=Wt(pt.OPEN_SHARE_MOMENT_DIALOG);var km=Wt(pt.QUEST_START_TIMER);var zm=Wt(pt.REQUEST_PROXY_TICKET_REFRESH);var Vm=Wt(pt.SHARE_INTERACTION);var Gm=Wt(pt.SHARE_LINK);function Hm(n){return{authorize:mm(n),captureLog:gm(n),encourageHardwareAcceleration:_m(n),getChannel:xm(n),getChannelPermissions:Sm(n),getEntitlements:vm(n),getPlatformBehaviors:bm(n),getSkus:ym(n),openExternalLink:Mm(n),openInviteDialog:Em(n),setActivity:Tm(n),setConfig:Am(n),setOrientationLockState:Rm(n),startPurchase:Im(n),userSettingsGetLocale:Cm(n),getInstanceConnectedParticipants:Xh(n),authenticate:Pm(n),getActivityInstanceConnectedParticipants:Xh(n),getQuest:Nm(n),getQuestEnrollmentStatus:Lm(n),getRelationships:Dm(n),getUser:Um(n),initiateImageUpload:Om(n),inviteUserEmbedded:Fm(n),openShareMomentDialog:Bm(n),questStartTimer:km(n),requestProxyTicketRefresh:zm(n),shareInteraction:Vm(n),shareLink:Gm(n)}}var ec=class extends Error{constructor(e,t=""){super(t),this.code=e,this.message=t,this.name="Discord SDK Error"}};function qh(){return{disableConsoleLogOverride:!1}}var Wm=["log","warn","debug","info","error"];function Xm(n,e,t){let i=n[e],r=n;i&&(n[e]=function(){let s=[].slice.call(arguments),a=""+s.join(" ");t(e,a),i.apply(r,s)})}var qm="2.5.0";var Tv=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),Yh={randomUUID:Tv};var Zh,Av=new Uint8Array(16);function Ym(){if(!Zh){if(typeof crypto>"u"||!crypto.getRandomValues)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");Zh=crypto.getRandomValues.bind(crypto)}return Zh(Av)}var bn=[];for(let n=0;n<256;++n)bn.push((n+256).toString(16).slice(1));function Zm(n,e=0){return(bn[n[e+0]]+bn[n[e+1]]+bn[n[e+2]]+bn[n[e+3]]+"-"+bn[n[e+4]]+bn[n[e+5]]+"-"+bn[n[e+6]]+bn[n[e+7]]+"-"+bn[n[e+8]]+bn[n[e+9]]+"-"+bn[n[e+10]]+bn[n[e+11]]+bn[n[e+12]]+bn[n[e+13]]+bn[n[e+14]]+bn[n[e+15]]).toLowerCase()}function Kh(n,e,t){if(Yh.randomUUID&&!e&&!n)return Yh.randomUUID();n=n||{};let i=n.random??n.rng?.()??Ym();if(i.length<16)throw new Error("Random bytes length must be >= 16");return i[6]=i[6]&15|64,i[8]=i[8]&63|128,Zm(i)}var sr;(function(n){n[n.HANDSHAKE=0]="HANDSHAKE",n[n.FRAME=1]="FRAME",n[n.CLOSE=2]="CLOSE",n[n.HELLO=3]="HELLO"})(sr||(sr={}));var wv=new Set(Rv());function Rv(){return typeof window>"u"?[]:[window.location.origin,"https://discord.com","https://discordapp.com","https://ptb.discord.com","https://ptb.discordapp.com","https://canary.discord.com","https://canary.discordapp.com","https://staging.discord.co","http://localhost:3333","https://pax.discord.com","null"]}function Iv(){var n;return[(n=window.parent.opener)!==null&&n!==void 0?n:window.parent,document.referrer?document.referrer:"*"]}var xo=class{getTransfer(e){var t;switch(e.cmd){case ye.SUBSCRIBE:case ye.UNSUBSCRIBE:return;default:return(t=e.transfer)!==null&&t!==void 0?t:void 0}}constructor(e,t){if(this.sdkVersion=qm,this.mobileAppVersion=null,this.source=null,this.sourceOrigin="",this.eventBus=new ch,this.pendingCommands=new Map,this.sendCommand=o=>{var c;if(this.source==null)throw new Error("Attempting to send message before initialization");let l=Kh();return(c=this.source)===null||c===void 0||c.postMessage([sr.FRAME,Object.assign(Object.assign({},o),{nonce:l})],this.sourceOrigin,this.getTransfer(o)),new Promise((h,d)=>{this.pendingCommands.set(l,{resolve:h,reject:d})})},this.commands=Hm(this.sendCommand),this.handleMessage=o=>{if(!wv.has(o.origin))return;let c=o.data;if(!Array.isArray(c))return;let[l,u]=c;switch(l){case sr.HELLO:return;case sr.CLOSE:return this.handleClose(u);case sr.HANDSHAKE:return this.handleHandshake();case sr.FRAME:return this.handleFrame(u);default:throw new Error("Invalid message format")}},this.isReady=!1,this.clientId=e,this.configuration=t??qh(),typeof window<"u"&&window.addEventListener("message",this.handleMessage),typeof window>"u"){this.frameId="",this.instanceId="",this.customId=null,this.referrerId=null,this.platform=jn.DESKTOP,this.guildId=null,this.channelId=null,this.locationId=null;return}let i=new URLSearchParams(this._getSearch()),r=i.get("frame_id");if(!r)throw new Error("frame_id query param is not defined");this.frameId=r;let s=i.get("instance_id");if(!s)throw new Error("instance_id query param is not defined");this.instanceId=s;let a=i.get("platform");if(a){if(a!==jn.DESKTOP&&a!==jn.MOBILE)throw new Error(`Invalid query param "platform" of "${a}". Valid values are "${jn.DESKTOP}" or "${jn.MOBILE}"`)}else throw new Error("platform query param is not defined");this.platform=a,this.customId=i.get("custom_id"),this.referrerId=i.get("referrer_id"),this.guildId=i.get("guild_id"),this.channelId=i.get("channel_id"),this.locationId=i.get("location_id"),this.mobileAppVersion=i.get("mobile_app_version"),[this.source,this.sourceOrigin]=Iv(),this.addOnReadyListener(),this.handshake()}close(e,t){var i;window.removeEventListener("message",this.handleMessage);let r=Kh();(i=this.source)===null||i===void 0||i.postMessage([sr.CLOSE,{code:e,message:t,nonce:r}],this.sourceOrigin)}async subscribe(e,t,...i){let[r]=i,s=this.eventBus.listenerCount(e),a=this.eventBus.on(e,t);return Object.values(_t).includes(e)&&e!==_t.READY&&s===0&&await this.sendCommand({cmd:ye.SUBSCRIBE,args:r,evt:e}),a}async unsubscribe(e,t,...i){let[r]=i;return e!==_t.READY&&this.eventBus.listenerCount(e)===1&&await this.sendCommand({cmd:ye.UNSUBSCRIBE,evt:e,args:r}),this.eventBus.off(e,t)}async ready(){this.isReady||await new Promise(e=>{this.eventBus.once(_t.READY,e)})}parseMajorMobileVersion(){if(this.mobileAppVersion&&this.mobileAppVersion.includes("."))try{return parseInt(this.mobileAppVersion.split(".")[0])}catch{return bh}return bh}handshake(){var e;let t={v:1,encoding:"json",client_id:this.clientId,frame_id:this.frameId},i=this.parseMajorMobileVersion();(this.platform===jn.DESKTOP||i>=Np)&&(t.sdk_version=this.sdkVersion),(e=this.source)===null||e===void 0||e.postMessage([sr.HANDSHAKE,t],this.sourceOrigin)}addOnReadyListener(){this.eventBus.once(_t.READY,()=>{this.overrideConsoleLogging(),this.isReady=!0})}overrideConsoleLogging(){if(this.configuration.disableConsoleLogOverride)return;let e=(t,i)=>{this.commands.captureLog({level:t,message:i})};Wm.forEach(t=>{Xm(console,t,e)})}handleClose(e){fm.parse(e)}handleHandshake(){}handleFrame(e){var t,i;let r;try{r=pm(e)}catch(s){console.error("Failed to parse",e),console.error(s);return}if(r.cmd==="DISPATCH")this.eventBus.emit(r.evt,r.data);else{if(r.evt===_o){if(r.nonce!=null){(t=this.pendingCommands.get(r.nonce))===null||t===void 0||t.reject(r.data),this.pendingCommands.delete(r.nonce);return}this.eventBus.emit("error",new ec(r.data.code,r.data.message))}if(r.nonce==null){console.error("Missing nonce",e);return}(i=this.pendingCommands.get(r.nonce))===null||i===void 0||i.resolve(r),this.pendingCommands.delete(r.nonce)}}_getSearch(){return typeof window>"u"?"":window.location.search}};var ta=1e9,Cv={precision:20,rounding:4,toExpNeg:-7,toExpPos:21,LN10:"2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286"},ng,Zt=!0,di="[DecimalError] ",_s=di+"Invalid argument: ",$h=di+"Exponent out of range: ",na=Math.floor,gs=Math.pow,Pv=/^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,$n,mn=1e7,qt=7,$m=9007199254740991,tc=na($m/qt),ke={};ke.absoluteValue=ke.abs=function(){var n=new this.constructor(this);return n.s&&(n.s=1),n};ke.comparedTo=ke.cmp=function(n){var e,t,i,r,s=this;if(n=new s.constructor(n),s.s!==n.s)return s.s||-n.s;if(s.e!==n.e)return s.e>n.e^s.s<0?1:-1;for(i=s.d.length,r=n.d.length,e=0,t=i<r?i:r;e<t;++e)if(s.d[e]!==n.d[e])return s.d[e]>n.d[e]^s.s<0?1:-1;return i===r?0:i>r^s.s<0?1:-1};ke.decimalPlaces=ke.dp=function(){var n=this,e=n.d.length-1,t=(e-n.e)*qt;if(e=n.d[e],e)for(;e%10==0;e/=10)t--;return t<0?0:t};ke.dividedBy=ke.div=function(n){return ar(this,new this.constructor(n))};ke.dividedToIntegerBy=ke.idiv=function(n){var e=this,t=e.constructor;return zt(ar(e,new t(n),0,1),t.precision)};ke.equals=ke.eq=function(n){return!this.cmp(n)};ke.exponent=function(){return on(this)};ke.greaterThan=ke.gt=function(n){return this.cmp(n)>0};ke.greaterThanOrEqualTo=ke.gte=function(n){return this.cmp(n)>=0};ke.isInteger=ke.isint=function(){return this.e>this.d.length-2};ke.isNegative=ke.isneg=function(){return this.s<0};ke.isPositive=ke.ispos=function(){return this.s>0};ke.isZero=function(){return this.s===0};ke.lessThan=ke.lt=function(n){return this.cmp(n)<0};ke.lessThanOrEqualTo=ke.lte=function(n){return this.cmp(n)<1};ke.logarithm=ke.log=function(n){var e,t=this,i=t.constructor,r=i.precision,s=r+5;if(n===void 0)n=new i(10);else if(n=new i(n),n.s<1||n.eq($n))throw Error(di+"NaN");if(t.s<1)throw Error(di+(t.s?"NaN":"-Infinity"));return t.eq($n)?new i(0):(Zt=!1,e=ar(vo(t,s),vo(n,s),s),Zt=!0,zt(e,r))};ke.minus=ke.sub=function(n){var e=this;return n=new e.constructor(n),e.s==n.s?eg(e,n):Jm(e,(n.s=-n.s,n))};ke.modulo=ke.mod=function(n){var e,t=this,i=t.constructor,r=i.precision;if(n=new i(n),!n.s)throw Error(di+"NaN");return t.s?(Zt=!1,e=ar(t,n,0,1).times(n),Zt=!0,t.minus(e)):zt(new i(t),r)};ke.naturalExponential=ke.exp=function(){return Qm(this)};ke.naturalLogarithm=ke.ln=function(){return vo(this)};ke.negated=ke.neg=function(){var n=new this.constructor(this);return n.s=-n.s||0,n};ke.plus=ke.add=function(n){var e=this;return n=new e.constructor(n),e.s==n.s?Jm(e,n):eg(e,(n.s=-n.s,n))};ke.precision=ke.sd=function(n){var e,t,i,r=this;if(n!==void 0&&n!==!!n&&n!==1&&n!==0)throw Error(_s+n);if(e=on(r)+1,i=r.d.length-1,t=i*qt+1,i=r.d[i],i){for(;i%10==0;i/=10)t--;for(i=r.d[0];i>=10;i/=10)t++}return n&&e>t?e:t};ke.squareRoot=ke.sqrt=function(){var n,e,t,i,r,s,a,o=this,c=o.constructor;if(o.s<1){if(!o.s)return new c(0);throw Error(di+"NaN")}for(n=on(o),Zt=!1,r=Math.sqrt(+o),r==0||r==1/0?(e=Fi(o.d),(e.length+n)%2==0&&(e+="0"),r=Math.sqrt(e),n=na((n+1)/2)-(n<0||n%2),r==1/0?e="5e"+n:(e=r.toExponential(),e=e.slice(0,e.indexOf("e")+1)+n),i=new c(e)):i=new c(r.toString()),t=c.precision,r=a=t+3;;)if(s=i,i=s.plus(ar(o,s,a+2)).times(.5),Fi(s.d).slice(0,a)===(e=Fi(i.d)).slice(0,a)){if(e=e.slice(a-3,a+1),r==a&&e=="4999"){if(zt(s,t+1,0),s.times(s).eq(o)){i=s;break}}else if(e!="9999")break;a+=4}return Zt=!0,zt(i,t)};ke.times=ke.mul=function(n){var e,t,i,r,s,a,o,c,l,u=this,h=u.constructor,d=u.d,m=(n=new h(n)).d;if(!u.s||!n.s)return new h(0);for(n.s*=u.s,t=u.e+n.e,c=d.length,l=m.length,c<l&&(s=d,d=m,m=s,a=c,c=l,l=a),s=[],a=c+l,i=a;i--;)s.push(0);for(i=l;--i>=0;){for(e=0,r=c+i;r>i;)o=s[r]+m[i]*d[r-i-1]+e,s[r--]=o%mn|0,e=o/mn|0;s[r]=(s[r]+e)%mn|0}for(;!s[--a];)s.pop();return e?++t:s.shift(),n.d=s,n.e=t,Zt?zt(n,h.precision):n};ke.toDecimalPlaces=ke.todp=function(n,e){var t=this,i=t.constructor;return t=new i(t),n===void 0?t:(Bi(n,0,ta),e===void 0?e=i.rounding:Bi(e,0,8),zt(t,n+on(t)+1,e))};ke.toExponential=function(n,e){var t,i=this,r=i.constructor;return n===void 0?t=xs(i,!0):(Bi(n,0,ta),e===void 0?e=r.rounding:Bi(e,0,8),i=zt(new r(i),n+1,e),t=xs(i,!0,n+1)),t};ke.toFixed=function(n,e){var t,i,r=this,s=r.constructor;return n===void 0?xs(r):(Bi(n,0,ta),e===void 0?e=s.rounding:Bi(e,0,8),i=zt(new s(r),n+on(r)+1,e),t=xs(i.abs(),!1,n+on(i)+1),r.isneg()&&!r.isZero()?"-"+t:t)};ke.toInteger=ke.toint=function(){var n=this,e=n.constructor;return zt(new e(n),on(n)+1,e.rounding)};ke.toNumber=function(){return+this};ke.toPower=ke.pow=function(n){var e,t,i,r,s,a,o=this,c=o.constructor,l=12,u=+(n=new c(n));if(!n.s)return new c($n);if(o=new c(o),!o.s){if(n.s<1)throw Error(di+"Infinity");return o}if(o.eq($n))return o;if(i=c.precision,n.eq($n))return zt(o,i);if(e=n.e,t=n.d.length-1,a=e>=t,s=o.s,a){if((t=u<0?-u:u)<=$m){for(r=new c($n),e=Math.ceil(i/qt+4),Zt=!1;t%2&&(r=r.times(o),jm(r.d,e)),t=na(t/2),t!==0;)o=o.times(o),jm(o.d,e);return Zt=!0,n.s<0?new c($n).div(r):zt(r,i)}}else if(s<0)throw Error(di+"NaN");return s=s<0&&n.d[Math.max(e,t)]&1?-1:1,o.s=1,Zt=!1,r=n.times(vo(o,i+l)),Zt=!0,r=Qm(r),r.s=s,r};ke.toPrecision=function(n,e){var t,i,r=this,s=r.constructor;return n===void 0?(t=on(r),i=xs(r,t<=s.toExpNeg||t>=s.toExpPos)):(Bi(n,1,ta),e===void 0?e=s.rounding:Bi(e,0,8),r=zt(new s(r),n,e),t=on(r),i=xs(r,n<=t||t<=s.toExpNeg,n)),i};ke.toSignificantDigits=ke.tosd=function(n,e){var t=this,i=t.constructor;return n===void 0?(n=i.precision,e=i.rounding):(Bi(n,1,ta),e===void 0?e=i.rounding:Bi(e,0,8)),zt(new i(t),n,e)};ke.toString=ke.valueOf=ke.val=ke.toJSON=ke[Symbol.for("nodejs.util.inspect.custom")]=function(){var n=this,e=on(n),t=n.constructor;return xs(n,e<=t.toExpNeg||e>=t.toExpPos)};function Jm(n,e){var t,i,r,s,a,o,c,l,u=n.constructor,h=u.precision;if(!n.s||!e.s)return e.s||(e=new u(n)),Zt?zt(e,h):e;if(c=n.d,l=e.d,a=n.e,r=e.e,c=c.slice(),s=a-r,s){for(s<0?(i=c,s=-s,o=l.length):(i=l,r=a,o=c.length),a=Math.ceil(h/qt),o=a>o?a+1:o+1,s>o&&(s=o,i.length=1),i.reverse();s--;)i.push(0);i.reverse()}for(o=c.length,s=l.length,o-s<0&&(s=o,i=l,l=c,c=i),t=0;s;)t=(c[--s]=c[s]+l[s]+t)/mn|0,c[s]%=mn;for(t&&(c.unshift(t),++r),o=c.length;c[--o]==0;)c.pop();return e.d=c,e.e=r,Zt?zt(e,h):e}function Bi(n,e,t){if(n!==~~n||n<e||n>t)throw Error(_s+n)}function Fi(n){var e,t,i,r=n.length-1,s="",a=n[0];if(r>0){for(s+=a,e=1;e<r;e++)i=n[e]+"",t=qt-i.length,t&&(s+=Dr(t)),s+=i;a=n[e],i=a+"",t=qt-i.length,t&&(s+=Dr(t))}else if(a===0)return"0";for(;a%10===0;)a/=10;return s+a}var ar=(function(){function n(i,r){var s,a=0,o=i.length;for(i=i.slice();o--;)s=i[o]*r+a,i[o]=s%mn|0,a=s/mn|0;return a&&i.unshift(a),i}function e(i,r,s,a){var o,c;if(s!=a)c=s>a?1:-1;else for(o=c=0;o<s;o++)if(i[o]!=r[o]){c=i[o]>r[o]?1:-1;break}return c}function t(i,r,s){for(var a=0;s--;)i[s]-=a,a=i[s]<r[s]?1:0,i[s]=a*mn+i[s]-r[s];for(;!i[0]&&i.length>1;)i.shift()}return function(i,r,s,a){var o,c,l,u,h,d,m,x,v,g,_,T,I,E,w,R,N,y,C=i.constructor,B=i.s==r.s?1:-1,W=i.d,Z=r.d;if(!i.s)return new C(i);if(!r.s)throw Error(di+"Division by zero");for(c=i.e-r.e,N=Z.length,w=W.length,m=new C(B),x=m.d=[],l=0;Z[l]==(W[l]||0);)++l;if(Z[l]>(W[l]||0)&&--c,s==null?T=s=C.precision:a?T=s+(on(i)-on(r))+1:T=s,T<0)return new C(0);if(T=T/qt+2|0,l=0,N==1)for(u=0,Z=Z[0],T++;(l<w||u)&&T--;l++)I=u*mn+(W[l]||0),x[l]=I/Z|0,u=I%Z|0;else{for(u=mn/(Z[0]+1)|0,u>1&&(Z=n(Z,u),W=n(W,u),N=Z.length,w=W.length),E=N,v=W.slice(0,N),g=v.length;g<N;)v[g++]=0;y=Z.slice(),y.unshift(0),R=Z[0],Z[1]>=mn/2&&++R;do u=0,o=e(Z,v,N,g),o<0?(_=v[0],N!=g&&(_=_*mn+(v[1]||0)),u=_/R|0,u>1?(u>=mn&&(u=mn-1),h=n(Z,u),d=h.length,g=v.length,o=e(h,v,d,g),o==1&&(u--,t(h,N<d?y:Z,d))):(u==0&&(o=u=1),h=Z.slice()),d=h.length,d<g&&h.unshift(0),t(v,h,g),o==-1&&(g=v.length,o=e(Z,v,N,g),o<1&&(u++,t(v,N<g?y:Z,g))),g=v.length):o===0&&(u++,v=[0]),x[l++]=u,o&&v[0]?v[g++]=W[E]||0:(v=[W[E]],g=1);while((E++<w||v[0]!==void 0)&&T--)}return x[0]||x.shift(),m.e=c,zt(m,a?s+on(m)+1:s)}})();function Qm(n,e){var t,i,r,s,a,o,c=0,l=0,u=n.constructor,h=u.precision;if(on(n)>16)throw Error($h+on(n));if(!n.s)return new u($n);for(e==null?(Zt=!1,o=h):o=e,a=new u(.03125);n.abs().gte(.1);)n=n.times(a),l+=5;for(i=Math.log(gs(2,l))/Math.LN10*2+5|0,o+=i,t=r=s=new u($n),u.precision=o;;){if(r=zt(r.times(n),o),t=t.times(++c),a=s.plus(ar(r,t,o)),Fi(a.d).slice(0,o)===Fi(s.d).slice(0,o)){for(;l--;)s=zt(s.times(s),o);return u.precision=h,e==null?(Zt=!0,zt(s,h)):s}s=a}}function on(n){for(var e=n.e*qt,t=n.d[0];t>=10;t/=10)e++;return e}function jh(n,e,t){if(e>n.LN10.sd())throw Zt=!0,t&&(n.precision=t),Error(di+"LN10 precision limit exceeded");return zt(new n(n.LN10),e)}function Dr(n){for(var e="";n--;)e+="0";return e}function vo(n,e){var t,i,r,s,a,o,c,l,u,h=1,d=10,m=n,x=m.d,v=m.constructor,g=v.precision;if(m.s<1)throw Error(di+(m.s?"NaN":"-Infinity"));if(m.eq($n))return new v(0);if(e==null?(Zt=!1,l=g):l=e,m.eq(10))return e==null&&(Zt=!0),jh(v,l);if(l+=d,v.precision=l,t=Fi(x),i=t.charAt(0),s=on(m),Math.abs(s)<15e14){for(;i<7&&i!=1||i==1&&t.charAt(1)>3;)m=m.times(n),t=Fi(m.d),i=t.charAt(0),h++;s=on(m),i>1?(m=new v("0."+t),s++):m=new v(i+"."+t.slice(1))}else return c=jh(v,l+2,g).times(s+""),m=vo(new v(i+"."+t.slice(1)),l-d).plus(c),v.precision=g,e==null?(Zt=!0,zt(m,g)):m;for(o=a=m=ar(m.minus($n),m.plus($n),l),u=zt(m.times(m),l),r=3;;){if(a=zt(a.times(u),l),c=o.plus(ar(a,new v(r),l)),Fi(c.d).slice(0,l)===Fi(o.d).slice(0,l))return o=o.times(2),s!==0&&(o=o.plus(jh(v,l+2,g).times(s+""))),o=ar(o,new v(h),l),v.precision=g,e==null?(Zt=!0,zt(o,g)):o;o=c,r+=2}}function Km(n,e){var t,i,r;for((t=e.indexOf("."))>-1&&(e=e.replace(".","")),(i=e.search(/e/i))>0?(t<0&&(t=i),t+=+e.slice(i+1),e=e.substring(0,i)):t<0&&(t=e.length),i=0;e.charCodeAt(i)===48;)++i;for(r=e.length;e.charCodeAt(r-1)===48;)--r;if(e=e.slice(i,r),e){if(r-=i,t=t-i-1,n.e=na(t/qt),n.d=[],i=(t+1)%qt,t<0&&(i+=qt),i<r){for(i&&n.d.push(+e.slice(0,i)),r-=qt;i<r;)n.d.push(+e.slice(i,i+=qt));e=e.slice(i),i=qt-e.length}else i-=r;for(;i--;)e+="0";if(n.d.push(+e),Zt&&(n.e>tc||n.e<-tc))throw Error($h+t)}else n.s=0,n.e=0,n.d=[0];return n}function zt(n,e,t){var i,r,s,a,o,c,l,u,h=n.d;for(a=1,s=h[0];s>=10;s/=10)a++;if(i=e-a,i<0)i+=qt,r=e,l=h[u=0];else{if(u=Math.ceil((i+1)/qt),s=h.length,u>=s)return n;for(l=s=h[u],a=1;s>=10;s/=10)a++;i%=qt,r=i-qt+a}if(t!==void 0&&(s=gs(10,a-r-1),o=l/s%10|0,c=e<0||h[u+1]!==void 0||l%s,c=t<4?(o||c)&&(t==0||t==(n.s<0?3:2)):o>5||o==5&&(t==4||c||t==6&&(i>0?r>0?l/gs(10,a-r):0:h[u-1])%10&1||t==(n.s<0?8:7))),e<1||!h[0])return c?(s=on(n),h.length=1,e=e-s-1,h[0]=gs(10,(qt-e%qt)%qt),n.e=na(-e/qt)||0):(h.length=1,h[0]=n.e=n.s=0),n;if(i==0?(h.length=u,s=1,u--):(h.length=u+1,s=gs(10,qt-i),h[u]=r>0?(l/gs(10,a-r)%gs(10,r)|0)*s:0),c)for(;;)if(u==0){(h[0]+=s)==mn&&(h[0]=1,++n.e);break}else{if(h[u]+=s,h[u]!=mn)break;h[u--]=0,s=1}for(i=h.length;h[--i]===0;)h.pop();if(Zt&&(n.e>tc||n.e<-tc))throw Error($h+on(n));return n}function eg(n,e){var t,i,r,s,a,o,c,l,u,h,d=n.constructor,m=d.precision;if(!n.s||!e.s)return e.s?e.s=-e.s:e=new d(n),Zt?zt(e,m):e;if(c=n.d,h=e.d,i=e.e,l=n.e,c=c.slice(),a=l-i,a){for(u=a<0,u?(t=c,a=-a,o=h.length):(t=h,i=l,o=c.length),r=Math.max(Math.ceil(m/qt),o)+2,a>r&&(a=r,t.length=1),t.reverse(),r=a;r--;)t.push(0);t.reverse()}else{for(r=c.length,o=h.length,u=r<o,u&&(o=r),r=0;r<o;r++)if(c[r]!=h[r]){u=c[r]<h[r];break}a=0}for(u&&(t=c,c=h,h=t,e.s=-e.s),o=c.length,r=h.length-o;r>0;--r)c[o++]=0;for(r=h.length;r>a;){if(c[--r]<h[r]){for(s=r;s&&c[--s]===0;)c[s]=mn-1;--c[s],c[r]+=mn}c[r]-=h[r]}for(;c[--o]===0;)c.pop();for(;c[0]===0;c.shift())--i;return c[0]?(e.d=c,e.e=i,Zt?zt(e,m):e):new d(0)}function xs(n,e,t){var i,r=on(n),s=Fi(n.d),a=s.length;return e?(t&&(i=t-a)>0?s=s.charAt(0)+"."+s.slice(1)+Dr(i):a>1&&(s=s.charAt(0)+"."+s.slice(1)),s=s+(r<0?"e":"e+")+r):r<0?(s="0."+Dr(-r-1)+s,t&&(i=t-a)>0&&(s+=Dr(i))):r>=a?(s+=Dr(r+1-a),t&&(i=t-r-1)>0&&(s=s+"."+Dr(i))):((i=r+1)<a&&(s=s.slice(0,i)+"."+s.slice(i)),t&&(i=t-a)>0&&(r+1===a&&(s+="."),s+=Dr(i))),n.s<0?"-"+s:s}function jm(n,e){if(n.length>e)return n.length=e,!0}function tg(n){var e,t,i;function r(s){var a=this;if(!(a instanceof r))return new r(s);if(a.constructor=r,s instanceof r){a.s=s.s,a.e=s.e,a.d=(s=s.d)?s.slice():s;return}if(typeof s=="number"){if(s*0!==0)throw Error(_s+s);if(s>0)a.s=1;else if(s<0)s=-s,a.s=-1;else{a.s=0,a.e=0,a.d=[0];return}if(s===~~s&&s<1e7){a.e=0,a.d=[s];return}return Km(a,s.toString())}else if(typeof s!="string")throw Error(_s+s);if(s.charCodeAt(0)===45?(s=s.slice(1),a.s=-1):a.s=1,Pv.test(s))Km(a,s);else throw Error(_s+s)}if(r.prototype=ke,r.ROUND_UP=0,r.ROUND_DOWN=1,r.ROUND_CEIL=2,r.ROUND_FLOOR=3,r.ROUND_HALF_UP=4,r.ROUND_HALF_DOWN=5,r.ROUND_HALF_EVEN=6,r.ROUND_HALF_CEIL=7,r.ROUND_HALF_FLOOR=8,r.clone=tg,r.config=r.set=Nv,n===void 0&&(n={}),n)for(i=["precision","rounding","toExpNeg","toExpPos","LN10"],e=0;e<i.length;)n.hasOwnProperty(t=i[e++])||(n[t]=this[t]);return r.config(n),r}function Nv(n){if(!n||typeof n!="object")throw Error(di+"Object expected");var e,t,i,r=["precision",1,ta,"rounding",0,8,"toExpNeg",-1/0,0,"toExpPos",0,1/0];for(e=0;e<r.length;e+=3)if((i=n[t=r[e]])!==void 0)if(na(i)===i&&i>=r[e+1]&&i<=r[e+2])this[t]=i;else throw Error(_s+t+": "+i);if((i=n[t="LN10"])!==void 0)if(i==Math.LN10)this[t]=new this(i);else throw Error(_s+t+": "+i);return this}var ng=tg(Cv);$n=new ng(1);var q;(function(n){n.AED="aed",n.AFN="afn",n.ALL="all",n.AMD="amd",n.ANG="ang",n.AOA="aoa",n.ARS="ars",n.AUD="aud",n.AWG="awg",n.AZN="azn",n.BAM="bam",n.BBD="bbd",n.BDT="bdt",n.BGN="bgn",n.BHD="bhd",n.BIF="bif",n.BMD="bmd",n.BND="bnd",n.BOB="bob",n.BOV="bov",n.BRL="brl",n.BSD="bsd",n.BTN="btn",n.BWP="bwp",n.BYN="byn",n.BYR="byr",n.BZD="bzd",n.CAD="cad",n.CDF="cdf",n.CHE="che",n.CHF="chf",n.CHW="chw",n.CLF="clf",n.CLP="clp",n.CNY="cny",n.COP="cop",n.COU="cou",n.CRC="crc",n.CUC="cuc",n.CUP="cup",n.CVE="cve",n.CZK="czk",n.DJF="djf",n.DKK="dkk",n.DOP="dop",n.DZD="dzd",n.EGP="egp",n.ERN="ern",n.ETB="etb",n.EUR="eur",n.FJD="fjd",n.FKP="fkp",n.GBP="gbp",n.GEL="gel",n.GHS="ghs",n.GIP="gip",n.GMD="gmd",n.GNF="gnf",n.GTQ="gtq",n.GYD="gyd",n.HKD="hkd",n.HNL="hnl",n.HRK="hrk",n.HTG="htg",n.HUF="huf",n.IDR="idr",n.ILS="ils",n.INR="inr",n.IQD="iqd",n.IRR="irr",n.ISK="isk",n.JMD="jmd",n.JOD="jod",n.JPY="jpy",n.KES="kes",n.KGS="kgs",n.KHR="khr",n.KMF="kmf",n.KPW="kpw",n.KRW="krw",n.KWD="kwd",n.KYD="kyd",n.KZT="kzt",n.LAK="lak",n.LBP="lbp",n.LKR="lkr",n.LRD="lrd",n.LSL="lsl",n.LTL="ltl",n.LVL="lvl",n.LYD="lyd",n.MAD="mad",n.MDL="mdl",n.MGA="mga",n.MKD="mkd",n.MMK="mmk",n.MNT="mnt",n.MOP="mop",n.MRO="mro",n.MUR="mur",n.MVR="mvr",n.MWK="mwk",n.MXN="mxn",n.MXV="mxv",n.MYR="myr",n.MZN="mzn",n.NAD="nad",n.NGN="ngn",n.NIO="nio",n.NOK="nok",n.NPR="npr",n.NZD="nzd",n.OMR="omr",n.PAB="pab",n.PEN="pen",n.PGK="pgk",n.PHP="php",n.PKR="pkr",n.PLN="pln",n.PYG="pyg",n.QAR="qar",n.RON="ron",n.RSD="rsd",n.RUB="rub",n.RWF="rwf",n.SAR="sar",n.SBD="sbd",n.SCR="scr",n.SDG="sdg",n.SEK="sek",n.SGD="sgd",n.SHP="shp",n.SLL="sll",n.SOS="sos",n.SRD="srd",n.SSP="ssp",n.STD="std",n.SVC="svc",n.SYP="syp",n.SZL="szl",n.THB="thb",n.TJS="tjs",n.TMT="tmt",n.TND="tnd",n.TOP="top",n.TRY="try",n.TTD="ttd",n.TWD="twd",n.TZS="tzs",n.UAH="uah",n.UGX="ugx",n.USD="usd",n.USN="usn",n.USS="uss",n.UYI="uyi",n.UYU="uyu",n.UZS="uzs",n.VEF="vef",n.VND="vnd",n.VUV="vuv",n.WST="wst",n.XAF="xaf",n.XAG="xag",n.XAU="xau",n.XBA="xba",n.XBB="xbb",n.XBC="xbc",n.XBD="xbd",n.XCD="xcd",n.XDR="xdr",n.XFU="xfu",n.XOF="xof",n.XPD="xpd",n.XPF="xpf",n.XPT="xpt",n.XSU="xsu",n.XTS="xts",n.XUA="xua",n.YER="yer",n.ZAR="zar",n.ZMW="zmw",n.ZWL="zwl"})(q||(q={}));var Lv={[q.AED]:2,[q.AFN]:2,[q.ALL]:2,[q.AMD]:2,[q.ANG]:2,[q.AOA]:2,[q.ARS]:2,[q.AUD]:2,[q.AWG]:2,[q.AZN]:2,[q.BAM]:2,[q.BBD]:2,[q.BDT]:2,[q.BGN]:2,[q.BHD]:3,[q.BIF]:0,[q.BMD]:2,[q.BND]:2,[q.BOB]:2,[q.BOV]:2,[q.BRL]:2,[q.BSD]:2,[q.BTN]:2,[q.BWP]:2,[q.BYR]:0,[q.BYN]:2,[q.BZD]:2,[q.CAD]:2,[q.CDF]:2,[q.CHE]:2,[q.CHF]:2,[q.CHW]:2,[q.CLF]:0,[q.CLP]:0,[q.CNY]:2,[q.COP]:2,[q.COU]:2,[q.CRC]:2,[q.CUC]:2,[q.CUP]:2,[q.CVE]:2,[q.CZK]:2,[q.DJF]:0,[q.DKK]:2,[q.DOP]:2,[q.DZD]:2,[q.EGP]:2,[q.ERN]:2,[q.ETB]:2,[q.EUR]:2,[q.FJD]:2,[q.FKP]:2,[q.GBP]:2,[q.GEL]:2,[q.GHS]:2,[q.GIP]:2,[q.GMD]:2,[q.GNF]:0,[q.GTQ]:2,[q.GYD]:2,[q.HKD]:2,[q.HNL]:2,[q.HRK]:2,[q.HTG]:2,[q.HUF]:2,[q.IDR]:2,[q.ILS]:2,[q.INR]:2,[q.IQD]:3,[q.IRR]:2,[q.ISK]:0,[q.JMD]:2,[q.JOD]:3,[q.JPY]:0,[q.KES]:2,[q.KGS]:2,[q.KHR]:2,[q.KMF]:0,[q.KPW]:2,[q.KRW]:0,[q.KWD]:3,[q.KYD]:2,[q.KZT]:2,[q.LAK]:2,[q.LBP]:2,[q.LKR]:2,[q.LRD]:2,[q.LSL]:2,[q.LTL]:2,[q.LVL]:2,[q.LYD]:3,[q.MAD]:2,[q.MDL]:2,[q.MGA]:2,[q.MKD]:2,[q.MMK]:2,[q.MNT]:2,[q.MOP]:2,[q.MRO]:2,[q.MUR]:2,[q.MVR]:2,[q.MWK]:2,[q.MXN]:2,[q.MXV]:2,[q.MYR]:2,[q.MZN]:2,[q.NAD]:2,[q.NGN]:2,[q.NIO]:2,[q.NOK]:2,[q.NPR]:2,[q.NZD]:2,[q.OMR]:3,[q.PAB]:2,[q.PEN]:2,[q.PGK]:2,[q.PHP]:2,[q.PKR]:2,[q.PLN]:2,[q.PYG]:0,[q.QAR]:2,[q.RON]:2,[q.RSD]:2,[q.RUB]:2,[q.RWF]:0,[q.SAR]:2,[q.SBD]:2,[q.SCR]:2,[q.SDG]:2,[q.SEK]:2,[q.SGD]:2,[q.SHP]:2,[q.SLL]:2,[q.SOS]:2,[q.SRD]:2,[q.SSP]:2,[q.STD]:2,[q.SVC]:2,[q.SYP]:2,[q.SZL]:2,[q.THB]:2,[q.TJS]:2,[q.TMT]:2,[q.TND]:3,[q.TOP]:2,[q.TRY]:2,[q.TTD]:2,[q.TWD]:2,[q.TZS]:2,[q.UAH]:2,[q.UGX]:0,[q.USD]:2,[q.USN]:2,[q.USS]:2,[q.UYI]:0,[q.UYU]:2,[q.UZS]:2,[q.VEF]:2,[q.VND]:0,[q.VUV]:0,[q.WST]:2,[q.XAF]:0,[q.XAG]:0,[q.XAU]:0,[q.XBA]:0,[q.XBB]:0,[q.XBC]:0,[q.XBD]:0,[q.XCD]:2,[q.XDR]:0,[q.XFU]:0,[q.XOF]:0,[q.XPD]:0,[q.XPF]:0,[q.XPT]:0,[q.XSU]:0,[q.XTS]:0,[q.XUA]:0,[q.YER]:2,[q.ZAR]:2,[q.ZMW]:2,[q.ZWL]:2};var ia={exports:{}};ia.exports;var ig;function rg(){return ig?ia.exports:(ig=1,(function(n,e){var t=200,i="Expected a function",r="__lodash_hash_undefined__",s=1,a=2,o=1/0,c=9007199254740991,l="[object Arguments]",u="[object Array]",h="[object Boolean]",d="[object Date]",m="[object Error]",x="[object Function]",v="[object GeneratorFunction]",g="[object Map]",_="[object Number]",T="[object Object]",I="[object Promise]",E="[object RegExp]",w="[object Set]",R="[object String]",N="[object Symbol]",y="[object WeakMap]",C="[object ArrayBuffer]",B="[object DataView]",W="[object Float32Array]",Z="[object Float64Array]",ee="[object Int8Array]",X="[object Int16Array]",Q="[object Int32Array]",oe="[object Uint8Array]",re="[object Uint8ClampedArray]",he="[object Uint16Array]",ie="[object Uint32Array]",le=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,de=/^\w*$/,ne=/^\./,me=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,Oe=/[\\^$.*+?()[\]{}|]/g,Pe=/\\(\\)?/g,et=/^\[object .+?Constructor\]$/,J=/^(?:0|[1-9]\d*)$/,Y={};Y[W]=Y[Z]=Y[ee]=Y[X]=Y[Q]=Y[oe]=Y[re]=Y[he]=Y[ie]=!0,Y[l]=Y[u]=Y[C]=Y[h]=Y[B]=Y[d]=Y[m]=Y[x]=Y[g]=Y[_]=Y[T]=Y[E]=Y[w]=Y[R]=Y[y]=!1;var Me=typeof Qa=="object"&&Qa&&Qa.Object===Object&&Qa,Ze=typeof self=="object"&&self&&self.Object===Object&&self,be=Me||Ze||Function("return this")(),it=e&&!e.nodeType&&e,Gt=it&&!0&&n&&!n.nodeType&&n,ot=Gt&&Gt.exports===it,St=ot&&Me.process,Rt=(function(){try{return St&&St.binding("util")}catch{}})(),ft=Rt&&Rt.isTypedArray;function Pt(b,O){for(var se=-1,ve=b?b.length:0;++se<ve&&O(b[se],se,b)!==!1;);return b}function Jt(b,O){for(var se=-1,ve=b?b.length:0;++se<ve;)if(O(b[se],se,b))return!0;return!1}function Qt(b){return function(O){return O?.[b]}}function Ut(b,O){for(var se=-1,ve=Array(b);++se<b;)ve[se]=O(se);return ve}function Xt(b){return function(O){return b(O)}}function G(b,O){return b?.[O]}function Fe(b){var O=!1;if(b!=null&&typeof b.toString!="function")try{O=!!(b+"")}catch{}return O}function gt(b){var O=-1,se=Array(b.size);return b.forEach(function(ve,st){se[++O]=[st,ve]}),se}function p(b,O){return function(se){return b(O(se))}}function f(b){var O=-1,se=Array(b.size);return b.forEach(function(ve){se[++O]=ve}),se}var S=Array.prototype,A=Function.prototype,P=Object.prototype,L=be["__core-js_shared__"],H=(function(){var b=/[^.]+$/.exec(L&&L.keys&&L.keys.IE_PROTO||"");return b?"Symbol(src)_1."+b:""})(),D=A.toString,F=P.hasOwnProperty,ae=P.toString,ge=RegExp("^"+D.call(F).replace(Oe,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),ue=be.Symbol,fe=be.Uint8Array,Ie=p(Object.getPrototypeOf,Object),De=Object.create,tt=P.propertyIsEnumerable,V=S.splice,Ee=p(Object.keys,Object),ce=Hs(be,"DataView"),Se=Hs(be,"Map"),Ae=Hs(be,"Promise"),pe=Hs(be,"Set"),We=Hs(be,"WeakMap"),Be=Hs(Object,"create"),Ot=jr(ce),At=jr(Se),Yn=jr(Ae),si=jr(pe),th=jr(We),Bs=ue?ue.prototype:void 0,ks=Bs?Bs.valueOf:void 0,zs=Bs?Bs.toString:void 0;function $i(b){var O=-1,se=b?b.length:0;for(this.clear();++O<se;){var ve=b[O];this.set(ve[0],ve[1])}}function xl(){this.__data__=Be?Be(null):{}}function vl(b){return this.has(b)&&delete this.__data__[b]}function Ji(b){var O=this.__data__;if(Be){var se=O[b];return se===r?void 0:se}return F.call(O,b)?O[b]:void 0}function $a(b){var O=this.__data__;return Be?O[b]!==void 0:F.call(O,b)}function yl(b,O){var se=this.__data__;return se[b]=Be&&O===void 0?r:O,this}$i.prototype.clear=xl,$i.prototype.delete=vl,$i.prototype.get=Ji,$i.prototype.has=$a,$i.prototype.set=yl;function ai(b){var O=-1,se=b?b.length:0;for(this.clear();++O<se;){var ve=b[O];this.set(ve[0],ve[1])}}function Vs(){this.__data__=[]}function Sl(b){var O=this.__data__,se=ct(O,b);if(se<0)return!1;var ve=O.length-1;return se==ve?O.pop():V.call(O,se,1),!0}function Gs(b){var O=this.__data__,se=ct(O,b);return se<0?void 0:O[se][1]}function bl(b){return ct(this.__data__,b)>-1}function Ml(b,O){var se=this.__data__,ve=ct(se,b);return ve<0?se.push([b,O]):se[ve][1]=O,this}ai.prototype.clear=Vs,ai.prototype.delete=Sl,ai.prototype.get=Gs,ai.prototype.has=bl,ai.prototype.set=Ml;function gi(b){var O=-1,se=b?b.length:0;for(this.clear();++O<se;){var ve=b[O];this.set(ve[0],ve[1])}}function nh(){this.__data__={hash:new $i,map:new(Se||ai),string:new $i}}function ih(b){return Tl(this,b).delete(b)}function rh(b){return Tl(this,b).get(b)}function El(b){return Tl(this,b).has(b)}function M(b,O){return Tl(this,b).set(b,O),this}gi.prototype.clear=nh,gi.prototype.delete=ih,gi.prototype.get=rh,gi.prototype.has=El,gi.prototype.set=M;function k(b){var O=-1,se=b?b.length:0;for(this.__data__=new gi;++O<se;)this.add(b[O])}function te(b){return this.__data__.set(b,r),this}function $(b){return this.__data__.has(b)}k.prototype.add=k.prototype.push=te,k.prototype.has=$;function j(b){this.__data__=new ai(b)}function we(){this.__data__=new ai}function Ue(b){return this.__data__.delete(b)}function Te(b){return this.__data__.get(b)}function ze(b){return this.__data__.has(b)}function He(b,O){var se=this.__data__;if(se instanceof ai){var ve=se.__data__;if(!Se||ve.length<t-1)return ve.push([b,O]),this;se=this.__data__=new gi(ve)}return se.set(b,O),this}j.prototype.clear=we,j.prototype.delete=Ue,j.prototype.get=Te,j.prototype.has=ze,j.prototype.set=He;function lt(b,O){var se=Qi(b)||dp(b)?Ut(b.length,String):[],ve=se.length,st=!!ve;for(var Xe in b)F.call(b,Xe)&&!(st&&(Xe=="length"||lp(Xe,ve)))&&se.push(Xe);return se}function ct(b,O){for(var se=b.length;se--;)if(hp(b[se][0],O))return se;return-1}function Ve(b){return Ws(b)?De(b):{}}var wt=Er();function en(b,O){return b&&wt(b,O,Il)}function Ft(b,O){O=Al(O,b)?[O]:_i(O);for(var se=0,ve=O.length;b!=null&&se<ve;)b=b[wl(O[se++])];return se&&se==ve?b:void 0}function Nt(b){return ae.call(b)}function pn(b,O){return b!=null&&O in Object(b)}function Ne(b,O,se,ve,st){return b===O?!0:b==null||O==null||!Ws(b)&&!Rl(O)?b!==b&&O!==O:yn(b,O,Ne,se,ve,st)}function yn(b,O,se,ve,st,Xe){var vt=Qi(b),sn=Qi(O),tn=u,En=u;vt||(tn=Tr(b),tn=tn==l?T:tn),sn||(En=Tr(O),En=En==l?T:En);var Fn=tn==T&&!Fe(b),Bn=En==T&&!Fe(O),Cn=tn==En;if(Cn&&!Fn)return Xe||(Xe=new j),vt||pp(b)?Ja(b,O,se,ve,st,Xe):M0(b,O,tn,se,ve,st,Xe);if(!(st&a)){var li=Fn&&F.call(b,"__wrapped__"),ci=Bn&&F.call(O,"__wrapped__");if(li||ci){var Ar=li?b.value():b,er=ci?O.value():O;return Xe||(Xe=new j),se(Ar,er,ve,st,Xe)}}return Cn?(Xe||(Xe=new j),E0(b,O,se,ve,st,Xe)):!1}function Et(b,O,se,ve){var st=se.length,Xe=st;if(b==null)return!Xe;for(b=Object(b);st--;){var vt=se[st];if(vt[2]?vt[1]!==b[vt[0]]:!(vt[0]in b))return!1}for(;++st<Xe;){vt=se[st];var sn=vt[0],tn=b[sn],En=vt[1];if(vt[2]){if(tn===void 0&&!(sn in b))return!1}else{var Fn=new j,Bn;if(!(Bn===void 0?Ne(En,tn,ve,s|a,Fn):Bn))return!1}}return!0}function On(b){if(!Ws(b)||R0(b))return!1;var O=ah(b)||Fe(b)?ge:et;return O.test(jr(b))}function oi(b){return Rl(b)&&oh(b.length)&&!!Y[ae.call(b)]}function Ni(b){return typeof b=="function"?b:b==null?O0:typeof b=="object"?Qi(b)?Kt(b[0],b[1]):It(b):F0(b)}function Mr(b){if(!I0(b))return Ee(b);var O=[];for(var se in Object(b))F.call(b,se)&&se!="constructor"&&O.push(se);return O}function It(b){var O=T0(b);return O.length==1&&O[0][2]?up(O[0][0],O[0][1]):function(se){return se===b||Et(se,b,O)}}function Kt(b,O){return Al(b)&&cp(O)?up(wl(b),O):function(se){var ve=L0(se,b);return ve===void 0&&ve===O?D0(se,b):Ne(O,ve,void 0,s|a)}}function Li(b){return function(O){return Ft(O,b)}}function Bt(b){if(typeof b=="string")return b;if(lh(b))return zs?zs.call(b):"";var O=b+"";return O=="0"&&1/b==-o?"-0":O}function _i(b){return Qi(b)?b:C0(b)}function Er(b){return function(O,se,ve){for(var st=-1,Xe=Object(O),vt=ve(O),sn=vt.length;sn--;){var tn=vt[++st];if(se(Xe[tn],tn,Xe)===!1)break}return O}}function Ja(b,O,se,ve,st,Xe){var vt=st&a,sn=b.length,tn=O.length;if(sn!=tn&&!(vt&&tn>sn))return!1;var En=Xe.get(b);if(En&&Xe.get(O))return En==O;var Fn=-1,Bn=!0,Cn=st&s?new k:void 0;for(Xe.set(b,O),Xe.set(O,b);++Fn<sn;){var li=b[Fn],ci=O[Fn];if(ve)var Ar=vt?ve(ci,li,Fn,O,b,Xe):ve(li,ci,Fn,b,O,Xe);if(Ar!==void 0){if(Ar)continue;Bn=!1;break}if(Cn){if(!Jt(O,function(er,$r){if(!Cn.has($r)&&(li===er||se(li,er,ve,st,Xe)))return Cn.add($r)})){Bn=!1;break}}else if(!(li===ci||se(li,ci,ve,st,Xe))){Bn=!1;break}}return Xe.delete(b),Xe.delete(O),Bn}function M0(b,O,se,ve,st,Xe,vt){switch(se){case B:if(b.byteLength!=O.byteLength||b.byteOffset!=O.byteOffset)return!1;b=b.buffer,O=O.buffer;case C:return!(b.byteLength!=O.byteLength||!ve(new fe(b),new fe(O)));case h:case d:case _:return hp(+b,+O);case m:return b.name==O.name&&b.message==O.message;case E:case R:return b==O+"";case g:var sn=gt;case w:var tn=Xe&a;if(sn||(sn=f),b.size!=O.size&&!tn)return!1;var En=vt.get(b);if(En)return En==O;Xe|=s,vt.set(b,O);var Fn=Ja(sn(b),sn(O),ve,st,Xe,vt);return vt.delete(b),Fn;case N:if(ks)return ks.call(b)==ks.call(O)}return!1}function E0(b,O,se,ve,st,Xe){var vt=st&a,sn=Il(b),tn=sn.length,En=Il(O),Fn=En.length;if(tn!=Fn&&!vt)return!1;for(var Bn=tn;Bn--;){var Cn=sn[Bn];if(!(vt?Cn in O:F.call(O,Cn)))return!1}var li=Xe.get(b);if(li&&Xe.get(O))return li==O;var ci=!0;Xe.set(b,O),Xe.set(O,b);for(var Ar=vt;++Bn<tn;){Cn=sn[Bn];var er=b[Cn],$r=O[Cn];if(ve)var mp=vt?ve($r,er,Cn,O,b,Xe):ve(er,$r,Cn,b,O,Xe);if(!(mp===void 0?er===$r||se(er,$r,ve,st,Xe):mp)){ci=!1;break}Ar||(Ar=Cn=="constructor")}if(ci&&!Ar){var Cl=b.constructor,Pl=O.constructor;Cl!=Pl&&"constructor"in b&&"constructor"in O&&!(typeof Cl=="function"&&Cl instanceof Cl&&typeof Pl=="function"&&Pl instanceof Pl)&&(ci=!1)}return Xe.delete(b),Xe.delete(O),ci}function Tl(b,O){var se=b.__data__;return w0(O)?se[typeof O=="string"?"string":"hash"]:se.map}function T0(b){for(var O=Il(b),se=O.length;se--;){var ve=O[se],st=b[ve];O[se]=[ve,st,cp(st)]}return O}function Hs(b,O){var se=G(b,O);return On(se)?se:void 0}var Tr=Nt;(ce&&Tr(new ce(new ArrayBuffer(1)))!=B||Se&&Tr(new Se)!=g||Ae&&Tr(Ae.resolve())!=I||pe&&Tr(new pe)!=w||We&&Tr(new We)!=y)&&(Tr=function(b){var O=ae.call(b),se=O==T?b.constructor:void 0,ve=se?jr(se):void 0;if(ve)switch(ve){case Ot:return B;case At:return g;case Yn:return I;case si:return w;case th:return y}return O});function A0(b,O,se){O=Al(O,b)?[O]:_i(O);for(var ve,st=-1,vt=O.length;++st<vt;){var Xe=wl(O[st]);if(!(ve=b!=null&&se(b,Xe)))break;b=b[Xe]}if(ve)return ve;var vt=b?b.length:0;return!!vt&&oh(vt)&&lp(Xe,vt)&&(Qi(b)||dp(b))}function lp(b,O){return O=O??c,!!O&&(typeof b=="number"||J.test(b))&&b>-1&&b%1==0&&b<O}function Al(b,O){if(Qi(b))return!1;var se=typeof b;return se=="number"||se=="symbol"||se=="boolean"||b==null||lh(b)?!0:de.test(b)||!le.test(b)||O!=null&&b in Object(O)}function w0(b){var O=typeof b;return O=="string"||O=="number"||O=="symbol"||O=="boolean"?b!=="__proto__":b===null}function R0(b){return!!H&&H in b}function I0(b){var O=b&&b.constructor,se=typeof O=="function"&&O.prototype||P;return b===se}function cp(b){return b===b&&!Ws(b)}function up(b,O){return function(se){return se==null?!1:se[b]===O&&(O!==void 0||b in Object(se))}}var C0=sh(function(b){b=N0(b);var O=[];return ne.test(b)&&O.push(""),b.replace(me,function(se,ve,st,Xe){O.push(st?Xe.replace(Pe,"$1"):ve||se)}),O});function wl(b){if(typeof b=="string"||lh(b))return b;var O=b+"";return O=="0"&&1/b==-o?"-0":O}function jr(b){if(b!=null){try{return D.call(b)}catch{}try{return b+""}catch{}}return""}function sh(b,O){if(typeof b!="function"||O&&typeof O!="function")throw new TypeError(i);var se=function(){var ve=arguments,st=O?O.apply(this,ve):ve[0],Xe=se.cache;if(Xe.has(st))return Xe.get(st);var vt=b.apply(this,ve);return se.cache=Xe.set(st,vt),vt};return se.cache=new(sh.Cache||gi),se}sh.Cache=gi;function hp(b,O){return b===O||b!==b&&O!==O}function dp(b){return P0(b)&&F.call(b,"callee")&&(!tt.call(b,"callee")||ae.call(b)==l)}var Qi=Array.isArray;function fp(b){return b!=null&&oh(b.length)&&!ah(b)}function P0(b){return Rl(b)&&fp(b)}function ah(b){var O=Ws(b)?ae.call(b):"";return O==x||O==v}function oh(b){return typeof b=="number"&&b>-1&&b%1==0&&b<=c}function Ws(b){var O=typeof b;return!!b&&(O=="object"||O=="function")}function Rl(b){return!!b&&typeof b=="object"}function lh(b){return typeof b=="symbol"||Rl(b)&&ae.call(b)==N}var pp=ft?Xt(ft):oi;function N0(b){return b==null?"":Bt(b)}function L0(b,O,se){var ve=b==null?void 0:Ft(b,O);return ve===void 0?se:ve}function D0(b,O){return b!=null&&A0(b,O,pn)}function Il(b){return fp(b)?lt(b):Mr(b)}function U0(b,O,se){var ve=Qi(b)||pp(b);if(O=Ni(O),se==null)if(ve||Ws(b)){var st=b.constructor;ve?se=Qi(b)?new st:[]:se=ah(st)?Ve(Ie(b)):{}}else se={};return(ve?Pt:en)(b,function(Xe,vt,sn){return O(se,Xe,vt,sn)}),se}function O0(b){return b}function F0(b){return Al(b)?Qt(wl(b)):Li(b)}n.exports=U0})(ia,ia.exports),ia.exports)}var jR=rg();var{Commands:vI}=Ql;var Wg=0,Ud=1,Xg=2;var Qo=1,qg=2,Ba=3,qi=0,Dn=1,Un=2,Yi=0,ka=1,Od=2,Fd=3,Bd=4,Yg=5;var Ps=100,Zg=101,Kg=102,jg=103,$g=104,Jg=200,Qg=201,e_=202,t_=203,kd=204,zd=205,n_=206,i_=207,r_=208,s_=209,a_=210,o_=211,l_=212,c_=213,u_=214,Cc=0,Pc=1,Nc=2,va=3,Lc=4,Dc=5,Uc=6,Oc=7,Vd=0,h_=1,d_=2,Ri=0,Gd=1,Hd=2,Wd=3,Xd=4,qd=5,Yd=6,Zd=7,bd="attached",f_="detached",Kd=300,qr=301,Ns=302,tu=303,nu=304,el=306,Gr=1e3,pi=1001,ya=1002,Yt=1003,iu=1004;var Ls=1005;var jt=1006,za=1007;var Ii=1008;var qn=1009,jd=1010,$d=1011,Va=1012,ru=1013,Ci=1014,ii=1015,Pi=1016,su=1017,au=1018,Ga=1020,Jd=35902,Qd=35899,ef=1021,tf=1022,ri=1023,Vi=1026,Yr=1027,ou=1028,lu=1029,Zr=1030,cu=1031;var uu=1033,tl=33776,nl=33777,il=33778,rl=33779,hu=35840,du=35841,fu=35842,pu=35843,mu=36196,gu=37492,_u=37496,xu=37488,vu=37489,sl=37490,yu=37491,Su=37808,bu=37809,Mu=37810,Eu=37811,Tu=37812,Au=37813,wu=37814,Ru=37815,Iu=37816,Cu=37817,Pu=37818,Nu=37819,Lu=37820,Du=37821,Uu=36492,Ou=36494,Fu=36495,Bu=36283,ku=36284,al=36285,zu=36286;var Es=2300,Ts=2301,wc=2302,Md=2303,Ed=2400,Td=2401,Ad=2402,p_=2500;var nf=0,ol=1,Ha=2,m_=3200;var Vu=0,g_=1,Sr="",nn="srgb",Ln="srgb-linear",Co="linear",Ct="srgb";var Rc=7680;var __=519,x_=512,v_=513,y_=514,Gu=515,S_=516,b_=517,Hu=518,M_=519,rf=35044;var sf="300 es",Ti=2e3,Sa=2001;function Dv(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Uv(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function ba(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function E_(){let n=ba("canvas");return n.style.display="block",n}var sg={},Ma=null;function Po(...n){let e="THREE."+n.shift();Ma?Ma("log",e,...n):console.log(e,...n)}function T_(n){let e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function qe(...n){n=T_(n);let e="THREE."+n.shift();if(Ma)Ma("warn",e,...n);else{let t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Je(...n){n=T_(n);let e="THREE."+n.shift();if(Ma)Ma("error",e,...n);else{let t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Ms(...n){let e=n.join(" ");e in sg||(sg[e]=!0,qe(...n))}function A_(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}var w_={[Cc]:Pc,[Nc]:Uc,[Lc]:Oc,[va]:Dc,[Pc]:Cc,[Uc]:Nc,[Oc]:Lc,[Dc]:va},Gi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let r=i[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}},wn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ag=1234567,Ro=Math.PI/180,As=180/Math.PI;function wi(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(wn[n&255]+wn[n>>8&255]+wn[n>>16&255]+wn[n>>24&255]+"-"+wn[e&255]+wn[e>>8&255]+"-"+wn[e>>16&15|64]+wn[e>>24&255]+"-"+wn[t&63|128]+wn[t>>8&255]+"-"+wn[t>>16&255]+wn[t>>24&255]+wn[i&255]+wn[i>>8&255]+wn[i>>16&255]+wn[i>>24&255]).toLowerCase()}function bt(n,e,t){return Math.max(e,Math.min(t,n))}function af(n,e){return(n%e+e)%e}function Ov(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function Fv(n,e,t){return n!==e?(t-n)/(e-n):0}function Io(n,e,t){return(1-t)*n+t*e}function Bv(n,e,t,i){return Io(n,e,1-Math.exp(-t*i))}function kv(n,e=1){return e-Math.abs(af(n,e*2)-e)}function zv(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function Vv(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function Gv(n,e){return n+Math.floor(Math.random()*(e-n+1))}function Hv(n,e){return n+Math.random()*(e-n)}function Wv(n){return n*(.5-Math.random())}function Xv(n){n!==void 0&&(ag=n);let e=ag+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function qv(n){return n*Ro}function Yv(n){return n*As}function Zv(n){return n>0&&Number.isInteger(n)&&2**Math.round(Math.log2(n))===n}function Kv(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function jv(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function $v(n,e,t,i,r){let s=Math.cos,a=Math.sin,o=s(t/2),c=a(t/2),l=s((e+i)/2),u=a((e+i)/2),h=s((e-i)/2),d=a((e-i)/2),m=s((i-e)/2),x=a((i-e)/2);switch(r){case"XYX":n.set(o*u,c*h,c*d,o*l);break;case"YZY":n.set(c*d,o*u,c*h,o*l);break;case"ZXZ":n.set(c*h,c*d,o*u,o*l);break;case"XZX":n.set(o*u,c*x,c*m,o*l);break;case"YXY":n.set(c*m,o*u,c*x,o*l);break;case"ZYZ":n.set(c*x,c*m,o*u,o*l);break;default:qe("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Ei(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Lt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Wa={DEG2RAD:Ro,RAD2DEG:As,generateUUID:wi,clamp:bt,euclideanModulo:af,mapLinear:Ov,inverseLerp:Fv,lerp:Io,damp:Bv,pingpong:kv,smoothstep:zv,smootherstep:Vv,randInt:Gv,randFloat:Hv,randFloatSpread:Wv,seededRandom:Xv,degToRad:qv,radToDeg:Yv,isPowerOfTwo:Zv,ceilPowerOfTwo:Kv,floorPowerOfTwo:jv,setQuaternionFromProperEuler:$v,normalize:Lt,denormalize:Ei},dt=class n{static{n.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=bt(this.x,e.x,t.x),this.y=bt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=bt(this.x,e,t),this.y=bt(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(bt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(bt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},ei=class{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let c=i[r+0],l=i[r+1],u=i[r+2],h=i[r+3],d=s[a+0],m=s[a+1],x=s[a+2],v=s[a+3];if(h!==v||c!==d||l!==m||u!==x){let g=c*d+l*m+u*x+h*v;g<0&&(d=-d,m=-m,x=-x,v=-v,g=-g);let _=1-o;if(g<.9995){let T=Math.acos(g),I=Math.sin(T);_=Math.sin(_*T)/I,o=Math.sin(o*T)/I,c=c*_+d*o,l=l*_+m*o,u=u*_+x*o,h=h*_+v*o}else{c=c*_+d*o,l=l*_+m*o,u=u*_+x*o,h=h*_+v*o;let T=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=T,l*=T,u*=T,h*=T}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,r,s,a){let o=i[r],c=i[r+1],l=i[r+2],u=i[r+3],h=s[a],d=s[a+1],m=s[a+2],x=s[a+3];return e[t]=o*x+u*h+c*m-l*d,e[t+1]=c*x+u*d+l*h-o*m,e[t+2]=l*x+u*m+o*d-c*h,e[t+3]=u*x-o*h-c*d-l*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(i/2),u=o(r/2),h=o(s/2),d=c(i/2),m=c(r/2),x=c(s/2);switch(a){case"XYZ":this._x=d*u*h+l*m*x,this._y=l*m*h-d*u*x,this._z=l*u*x+d*m*h,this._w=l*u*h-d*m*x;break;case"YXZ":this._x=d*u*h+l*m*x,this._y=l*m*h-d*u*x,this._z=l*u*x-d*m*h,this._w=l*u*h+d*m*x;break;case"ZXY":this._x=d*u*h-l*m*x,this._y=l*m*h+d*u*x,this._z=l*u*x+d*m*h,this._w=l*u*h-d*m*x;break;case"ZYX":this._x=d*u*h-l*m*x,this._y=l*m*h+d*u*x,this._z=l*u*x-d*m*h,this._w=l*u*h+d*m*x;break;case"YZX":this._x=d*u*h+l*m*x,this._y=l*m*h+d*u*x,this._z=l*u*x-d*m*h,this._w=l*u*h-d*m*x;break;case"XZY":this._x=d*u*h-l*m*x,this._y=l*m*h-d*u*x,this._z=l*u*x+d*m*h,this._w=l*u*h+d*m*x;break;default:qe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],u=t[6],h=t[10],d=i+o+h;if(d>0){let m=.5/Math.sqrt(d+1);this._w=.25/m,this._x=(u-c)*m,this._y=(s-l)*m,this._z=(a-r)*m}else if(i>o&&i>h){let m=2*Math.sqrt(1+i-o-h);this._w=(u-c)/m,this._x=.25*m,this._y=(r+a)/m,this._z=(s+l)/m}else if(o>h){let m=2*Math.sqrt(1+o-i-h);this._w=(s-l)/m,this._x=(r+a)/m,this._y=.25*m,this._z=(c+u)/m}else{let m=2*Math.sqrt(1+h-i-o);this._w=(a-r)/m,this._x=(s+l)/m,this._y=(c+u)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(bt(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=i*u+a*o+r*l-s*c,this._y=r*u+a*c+s*o-i*l,this._z=s*u+a*l+i*c-r*o,this._w=a*u-i*o-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let c=1-t;if(o<.9995){let l=Math.acos(o),u=Math.sin(l);c=Math.sin(c*l)/u,t=Math.sin(t*l)/u,this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},K=class n{static{n.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(og.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(og.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){let t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*r-o*i),u=2*(o*t-s*r),h=2*(s*i-a*t);return this.x=t+c*l+a*h-o*u,this.y=i+c*u+o*l-s*h,this.z=r+c*h+s*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=bt(this.x,e.x,t.x),this.y=bt(this.y,e.y,t.y),this.z=bt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=bt(this.x,e,t),this.y=bt(this.y,e,t),this.z=bt(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(bt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=r*c-s*o,this.y=s*a-i*c,this.z=i*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Jh.copy(this).projectOnVector(e),this.sub(Jh)}reflect(e){return this.sub(Jh.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(bt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Jh=new K,og=new ei,rt=class n{static{n.prototype.isMatrix3=!0}constructor(e,t,i,r,s,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,c,l)}set(e,t,i,r,s,a,o,c,l){let u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=c,u[6]=i,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],u=i[4],h=i[7],d=i[2],m=i[5],x=i[8],v=r[0],g=r[3],_=r[6],T=r[1],I=r[4],E=r[7],w=r[2],R=r[5],N=r[8];return s[0]=a*v+o*T+c*w,s[3]=a*g+o*I+c*R,s[6]=a*_+o*E+c*N,s[1]=l*v+u*T+h*w,s[4]=l*g+u*I+h*R,s[7]=l*_+u*E+h*N,s[2]=d*v+m*T+x*w,s[5]=d*g+m*I+x*R,s[8]=d*_+m*E+x*N,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-i*s*u+i*o*c+r*s*l-r*a*c}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],h=u*a-o*l,d=o*c-u*s,m=l*s-a*c,x=t*h+i*d+r*m;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/x;return e[0]=h*v,e[1]=(r*l-u*i)*v,e[2]=(o*i-r*a)*v,e[3]=d*v,e[4]=(u*t-r*c)*v,e[5]=(r*s-o*t)*v,e[6]=m*v,e[7]=(i*c-l*t)*v,e[8]=(a*t-i*s)*v,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){let c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*a+l*o)+a+e,-r*l,r*c,-r*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return Ms("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Qh.makeScale(e,t)),this}rotate(e){return Ms("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Qh.makeRotation(-e)),this}translate(e,t){return Ms("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Qh.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Qh=new rt,lg=new rt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),cg=new rt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Jv(){let n={enabled:!0,workingColorSpace:Ln,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===Ct&&(r.r=fr(r.r),r.g=fr(r.g),r.b=fr(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Ct&&(r.r=xa(r.r),r.g=xa(r.g),r.b=xa(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Sr?Co:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Ms("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Ms("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Ln]:{primaries:e,whitePoint:i,transfer:Co,toXYZ:lg,fromXYZ:cg,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:nn},outputColorSpaceConfig:{drawingBufferColorSpace:nn}},[nn]:{primaries:e,whitePoint:i,transfer:Ct,toXYZ:lg,fromXYZ:cg,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:nn}}}),n}var xt=Jv();function fr(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function xa(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var ra,Fc=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{ra===void 0&&(ra=ba("canvas")),ra.width=e.width,ra.height=e.height;let r=ra.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=ra}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=ba("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=fr(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(fr(t[i]/255)*255):t[i]=fr(t[i]);return{data:t,width:e.width,height:e.height}}else return qe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Qv=0,Ea=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Qv++}),this.uuid=wi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(ed(r[a].image)):s.push(ed(r[a]))}else s=ed(r);i.url=s}return t||(e.images[this.uuid]=i),i}};function ed(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Fc.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(qe("Texture: Unable to serialize Texture."),{})}var ey=0,td=new K,vn=class n extends Gi{constructor(e=n.DEFAULT_IMAGE,t=n.DEFAULT_MAPPING,i=pi,r=pi,s=jt,a=Ii,o=ri,c=qn,l=n.DEFAULT_ANISOTROPY,u=Sr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ey++}),this.uuid=wi(),this.name="",this.source=new Ea(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new dt(0,0),this.repeat=new dt(1,1),this.center=new dt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new rt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(td).x}get height(){return this.source.getSize(td).y}get depth(){return this.source.getSize(td).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let i=e[t];if(i===void 0){qe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){qe(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Kd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Gr:e.x=e.x-Math.floor(e.x);break;case pi:e.x=e.x<0?0:1;break;case ya:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Gr:e.y=e.y-Math.floor(e.y);break;case pi:e.y=e.y<0?0:1;break;case ya:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};vn.DEFAULT_IMAGE=null;vn.DEFAULT_MAPPING=Kd;vn.DEFAULT_ANISOTROPY=1;var Dt=class n{static{n.prototype.isVector4=!0}constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s,c=e.elements,l=c[0],u=c[4],h=c[8],d=c[1],m=c[5],x=c[9],v=c[2],g=c[6],_=c[10];if(Math.abs(u-d)<.01&&Math.abs(h-v)<.01&&Math.abs(x-g)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+v)<.1&&Math.abs(x+g)<.1&&Math.abs(l+m+_-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let I=(l+1)/2,E=(m+1)/2,w=(_+1)/2,R=(u+d)/4,N=(h+v)/4,y=(x+g)/4;return I>E&&I>w?I<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(I),r=R/i,s=N/i):E>w?E<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(E),i=R/r,s=y/r):w<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(w),i=N/s,r=y/s),this.set(i,r,s,t),this}let T=Math.sqrt((g-x)*(g-x)+(h-v)*(h-v)+(d-u)*(d-u));return Math.abs(T)<.001&&(T=1),this.x=(g-x)/T,this.y=(h-v)/T,this.z=(d-u)/T,this.w=Math.acos((l+m+_-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=bt(this.x,e.x,t.x),this.y=bt(this.y,e.y,t.y),this.z=bt(this.z,e.z,t.z),this.w=bt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=bt(this.x,e,t),this.y=bt(this.y,e,t),this.z=bt(this.z,e,t),this.w=bt(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(bt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Bc=class extends Gi{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:jt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Dt(0,0,e,t),this.scissorTest=!1,this.viewport=new Dt(0,0,e,t),this.textures=[];let r={width:e,height:t,depth:i.depth},s=new vn(r),a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:jt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new Ea(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},zn=class extends Bc{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},No=class extends vn{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Yt,this.minFilter=Yt,this.wrapR=pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var kc=class extends vn{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Yt,this.minFilter=Yt,this.wrapR=pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var at=class n{static{n.prototype.isMatrix4=!0}constructor(e,t,i,r,s,a,o,c,l,u,h,d,m,x,v,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,c,l,u,h,d,m,x,v,g)}set(e,t,i,r,s,a,o,c,l,u,h,d,m,x,v,g){let _=this.elements;return _[0]=e,_[4]=t,_[8]=i,_[12]=r,_[1]=s,_[5]=a,_[9]=o,_[13]=c,_[2]=l,_[6]=u,_[10]=h,_[14]=d,_[3]=m,_[7]=x,_[11]=v,_[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,i=e.elements,r=1/sa.setFromMatrixColumn(e,0).length(),s=1/sa.setFromMatrixColumn(e,1).length(),a=1/sa.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){let d=a*u,m=a*h,x=o*u,v=o*h;t[0]=c*u,t[4]=-c*h,t[8]=l,t[1]=m+x*l,t[5]=d-v*l,t[9]=-o*c,t[2]=v-d*l,t[6]=x+m*l,t[10]=a*c}else if(e.order==="YXZ"){let d=c*u,m=c*h,x=l*u,v=l*h;t[0]=d+v*o,t[4]=x*o-m,t[8]=a*l,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=m*o-x,t[6]=v+d*o,t[10]=a*c}else if(e.order==="ZXY"){let d=c*u,m=c*h,x=l*u,v=l*h;t[0]=d-v*o,t[4]=-a*h,t[8]=x+m*o,t[1]=m+x*o,t[5]=a*u,t[9]=v-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let d=a*u,m=a*h,x=o*u,v=o*h;t[0]=c*u,t[4]=x*l-m,t[8]=d*l+v,t[1]=c*h,t[5]=v*l+d,t[9]=m*l-x,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let d=a*c,m=a*l,x=o*c,v=o*l;t[0]=c*u,t[4]=v-d*h,t[8]=x*h+m,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=m*h+x,t[10]=d-v*h}else if(e.order==="XZY"){let d=a*c,m=a*l,x=o*c,v=o*l;t[0]=c*u,t[4]=-h,t[8]=l*u,t[1]=d*h+v,t[5]=a*u,t[9]=m*h-x,t[2]=x*h-m,t[6]=o*u,t[10]=v*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(ty,e,ny)}lookAt(e,t,i){let r=this.elements;return Jn.subVectors(e,t),Jn.lengthSq()===0&&(Jn.z=1),Jn.normalize(),Ur.crossVectors(i,Jn),Ur.lengthSq()===0&&(Math.abs(i.z)===1?Jn.x+=1e-4:Jn.z+=1e-4,Jn.normalize(),Ur.crossVectors(i,Jn)),Ur.normalize(),nc.crossVectors(Jn,Ur),r[0]=Ur.x,r[4]=nc.x,r[8]=Jn.x,r[1]=Ur.y,r[5]=nc.y,r[9]=Jn.y,r[2]=Ur.z,r[6]=nc.z,r[10]=Jn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],u=i[1],h=i[5],d=i[9],m=i[13],x=i[2],v=i[6],g=i[10],_=i[14],T=i[3],I=i[7],E=i[11],w=i[15],R=r[0],N=r[4],y=r[8],C=r[12],B=r[1],W=r[5],Z=r[9],ee=r[13],X=r[2],Q=r[6],oe=r[10],re=r[14],he=r[3],ie=r[7],le=r[11],de=r[15];return s[0]=a*R+o*B+c*X+l*he,s[4]=a*N+o*W+c*Q+l*ie,s[8]=a*y+o*Z+c*oe+l*le,s[12]=a*C+o*ee+c*re+l*de,s[1]=u*R+h*B+d*X+m*he,s[5]=u*N+h*W+d*Q+m*ie,s[9]=u*y+h*Z+d*oe+m*le,s[13]=u*C+h*ee+d*re+m*de,s[2]=x*R+v*B+g*X+_*he,s[6]=x*N+v*W+g*Q+_*ie,s[10]=x*y+v*Z+g*oe+_*le,s[14]=x*C+v*ee+g*re+_*de,s[3]=T*R+I*B+E*X+w*he,s[7]=T*N+I*W+E*Q+w*ie,s[11]=T*y+I*Z+E*oe+w*le,s[15]=T*C+I*ee+E*re+w*de,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],u=e[2],h=e[6],d=e[10],m=e[14],x=e[3],v=e[7],g=e[11],_=e[15],T=c*m-l*d,I=o*m-l*h,E=o*d-c*h,w=a*m-l*u,R=a*d-c*u,N=a*h-o*u;return t*(v*T-g*I+_*E)-i*(x*T-g*w+_*R)+r*(x*I-v*w+_*N)-s*(x*E-v*R+g*N)}determinantAffine(){let e=this.elements,t=e[0],i=e[4],r=e[8],s=e[1],a=e[5],o=e[9],c=e[2],l=e[6],u=e[10];return t*(a*u-o*l)-i*(s*u-o*c)+r*(s*l-a*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],h=e[9],d=e[10],m=e[11],x=e[12],v=e[13],g=e[14],_=e[15],T=t*o-i*a,I=t*c-r*a,E=t*l-s*a,w=i*c-r*o,R=i*l-s*o,N=r*l-s*c,y=u*v-h*x,C=u*g-d*x,B=u*_-m*x,W=h*g-d*v,Z=h*_-m*v,ee=d*_-m*g,X=T*ee-I*Z+E*W+w*B-R*C+N*y;if(X===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let Q=1/X;return e[0]=(o*ee-c*Z+l*W)*Q,e[1]=(r*Z-i*ee-s*W)*Q,e[2]=(v*N-g*R+_*w)*Q,e[3]=(d*R-h*N-m*w)*Q,e[4]=(c*B-a*ee-l*C)*Q,e[5]=(t*ee-r*B+s*C)*Q,e[6]=(g*E-x*N-_*I)*Q,e[7]=(u*N-d*E+m*I)*Q,e[8]=(a*Z-o*B+l*y)*Q,e[9]=(i*B-t*Z-s*y)*Q,e[10]=(x*R-v*E+_*T)*Q,e[11]=(h*E-u*R-m*T)*Q,e[12]=(o*C-a*W-c*y)*Q,e[13]=(t*W-i*C+r*y)*Q,e[14]=(v*I-x*w-g*T)*Q,e[15]=(u*w-h*I+d*T)*Q,this}scale(e){let t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,c=e.z,l=s*a,u=s*o;return this.set(l*a+i,l*o-r*c,l*c+r*o,0,l*o+r*c,u*o+i,u*c-r*a,0,l*c-r*o,u*c+r*a,s*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){let r=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,u=a+a,h=o+o,d=s*l,m=s*u,x=s*h,v=a*u,g=a*h,_=o*h,T=c*l,I=c*u,E=c*h,w=i.x,R=i.y,N=i.z;return r[0]=(1-(v+_))*w,r[1]=(m+E)*w,r[2]=(x-I)*w,r[3]=0,r[4]=(m-E)*R,r[5]=(1-(d+_))*R,r[6]=(g+T)*R,r[7]=0,r[8]=(x+I)*N,r[9]=(g-T)*N,r[10]=(1-(d+v))*N,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let s=this.determinantAffine();if(s===0)return i.set(1,1,1),t.identity(),this;let a=sa.set(r[0],r[1],r[2]).length(),o=sa.set(r[4],r[5],r[6]).length(),c=sa.set(r[8],r[9],r[10]).length();s<0&&(a=-a),yi.copy(this);let l=1/a,u=1/o,h=1/c;return yi.elements[0]*=l,yi.elements[1]*=l,yi.elements[2]*=l,yi.elements[4]*=u,yi.elements[5]*=u,yi.elements[6]*=u,yi.elements[8]*=h,yi.elements[9]*=h,yi.elements[10]*=h,t.setFromRotationMatrix(yi),i.x=a,i.y=o,i.z=c,this}makePerspective(e,t,i,r,s,a,o=Ti,c=!1){let l=this.elements,u=2*s/(t-e),h=2*s/(i-r),d=(t+e)/(t-e),m=(i+r)/(i-r),x,v;if(c)x=s/(a-s),v=a*s/(a-s);else if(o===Ti)x=-(a+s)/(a-s),v=-2*a*s/(a-s);else if(o===Sa)x=-a/(a-s),v=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=m,l[13]=0,l[2]=0,l[6]=0,l[10]=x,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=Ti,c=!1){let l=this.elements,u=2/(t-e),h=2/(i-r),d=-(t+e)/(t-e),m=-(i+r)/(i-r),x,v;if(c)x=1/(a-s),v=a/(a-s);else if(o===Ti)x=-2/(a-s),v=-(a+s)/(a-s);else if(o===Sa)x=-1/(a-s),v=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=h,l[9]=0,l[13]=m,l[2]=0,l[6]=0,l[10]=x,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},sa=new K,yi=new at,ty=new K(0,0,0),ny=new K(1,1,1),Ur=new K,nc=new K,Jn=new K,ug=new at,hg=new ei,pr=class n{constructor(e=0,t=0,i=0,r=n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let r=e.elements,s=r[0],a=r[4],o=r[8],c=r[1],l=r[5],u=r[9],h=r[2],d=r[6],m=r[10];switch(t){case"XYZ":this._y=Math.asin(bt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,m),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-bt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(bt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-bt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,m),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(bt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-bt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,m),this._y=0);break;default:qe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return ug.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ug,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return hg.setFromEuler(this),this.setFromQuaternion(hg,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};pr.DEFAULT_ORDER="XYZ";var Ta=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},iy=0,dg=new K,aa=new ei,or=new at,ic=new K,yo=new K,ry=new K,sy=new ei,fg=new K(1,0,0),pg=new K(0,1,0),mg=new K(0,0,1),gg={type:"added"},ay={type:"removed"},oa={type:"childadded",child:null},nd={type:"childremoved",child:null},$t=class n extends Gi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:iy++}),this.uuid=wi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let e=new K,t=new pr,i=new ei,r=new K(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new at},normalMatrix:{value:new rt}}),this.matrix=new at,this.matrixWorld=new at,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ta,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return aa.setFromAxisAngle(e,t),this.quaternion.multiply(aa),this}rotateOnWorldAxis(e,t){return aa.setFromAxisAngle(e,t),this.quaternion.premultiply(aa),this}rotateX(e){return this.rotateOnAxis(fg,e)}rotateY(e){return this.rotateOnAxis(pg,e)}rotateZ(e){return this.rotateOnAxis(mg,e)}translateOnAxis(e,t){return dg.copy(e).applyQuaternion(this.quaternion),this.position.add(dg.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(fg,e)}translateY(e){return this.translateOnAxis(pg,e)}translateZ(e){return this.translateOnAxis(mg,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(or.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?ic.copy(e):ic.set(e,t,i);let r=this.parent;this.updateWorldMatrix(!0,!1),yo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?or.lookAt(yo,ic,this.up):or.lookAt(ic,yo,this.up),this.quaternion.setFromRotationMatrix(or),r&&(or.extractRotation(r.matrixWorld),aa.setFromRotationMatrix(or),this.quaternion.premultiply(aa.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Je("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(gg),oa.child=e,this.dispatchEvent(oa),oa.child=null):Je("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ay),nd.child=e,this.dispatchEvent(nd),nd.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),or.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),or.multiply(e.parent.matrixWorld)),e.applyMatrix4(or),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(gg),oa.child=e,this.dispatchEvent(oa),oa.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){let a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(yo,e,ry),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(yo,sy,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*i-s[8]*r,s[13]+=i-s[1]*t-s[5]*i-s[9]*r,s[14]+=r-s[2]*t-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){let s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){let h=c[l];s(e.shapes,h)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];r.animations.push(s(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),u=a(e.images),h=a(e.shapes),d=a(e.skeletons),m=a(e.animations),x=a(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),d.length>0&&(i.skeletons=d),m.length>0&&(i.animations=m),x.length>0&&(i.nodes=x)}return i.object=r,i;function a(o){let c=[];for(let l in o){let u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let r=e.children[i];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};$t.DEFAULT_UP=new K(0,1,0);$t.DEFAULT_MATRIX_AUTO_UPDATE=!0;$t.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Ai=class extends $t{constructor(){super(),this.isGroup=!0,this.type="Group"}},oy={type:"move"},Aa=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ai,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ai,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new K,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new K),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ai,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new K,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new K,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let v of e.hand.values()){let g=t.getJointPose(v,i),_=this._getHandJoint(l,v);g!==null&&(_.matrix.fromArray(g.transform.matrix),_.matrix.decompose(_.position,_.rotation,_.scale),_.matrixWorldNeedsUpdate=!0,_.jointRadius=g.radius),_.visible=g!==null}let u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],d=u.position.distanceTo(h.position),m=.02,x=.005;l.inputState.pinching&&d>m+x?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=m-x&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(oy)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new Ai;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},R_={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Or={h:0,s:0,l:0},rc={h:0,s:0,l:0};function id(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var Qe=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=nn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,xt.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=xt.workingColorSpace){return this.r=e,this.g=t,this.b=i,xt.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=xt.workingColorSpace){if(e=af(e,1),t=bt(t,0,1),i=bt(i,0,1),t===0)this.r=this.g=this.b=i;else{let s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=id(a,s,e+1/3),this.g=id(a,s,e),this.b=id(a,s,e-1/3)}return xt.colorSpaceToWorking(this,r),this}setStyle(e,t=nn){function i(s){s!==void 0&&parseFloat(s)<1&&qe("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:qe("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);qe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=nn){let i=R_[e.toLowerCase()];return i!==void 0?this.setHex(i,t):qe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=fr(e.r),this.g=fr(e.g),this.b=fr(e.b),this}copyLinearToSRGB(e){return this.r=xa(e.r),this.g=xa(e.g),this.b=xa(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=nn){return xt.workingToColorSpace(Rn.copy(this),e),Math.round(bt(Rn.r*255,0,255))*65536+Math.round(bt(Rn.g*255,0,255))*256+Math.round(bt(Rn.b*255,0,255))}getHexString(e=nn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=xt.workingColorSpace){xt.workingToColorSpace(Rn.copy(this),t);let i=Rn.r,r=Rn.g,s=Rn.b,a=Math.max(i,r,s),o=Math.min(i,r,s),c,l,u=(o+a)/2;if(o===a)c=0,l=0;else{let h=a-o;switch(l=u<=.5?h/(a+o):h/(2-a-o),a){case i:c=(r-s)/h+(r<s?6:0);break;case r:c=(s-i)/h+2;break;case s:c=(i-r)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=xt.workingColorSpace){return xt.workingToColorSpace(Rn.copy(this),t),e.r=Rn.r,e.g=Rn.g,e.b=Rn.b,e}getStyle(e=nn){xt.workingToColorSpace(Rn.copy(this),e);let t=Rn.r,i=Rn.g,r=Rn.b;return e!==nn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Or),this.setHSL(Or.h+e,Or.s+t,Or.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Or),e.getHSL(rc);let i=Io(Or.h,rc.h,t),r=Io(Or.s,rc.s,t),s=Io(Or.l,rc.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Rn=new Qe;Qe.NAMES=R_;var Lo=class extends $t{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new pr,this.environmentIntensity=1,this.environmentRotation=new pr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Si=new K,lr=new K,rd=new K,cr=new K,la=new K,ca=new K,_g=new K,sd=new K,ad=new K,od=new K,ld=new Dt,cd=new Dt,ud=new Dt,Vr=class n{constructor(e=new K,t=new K,i=new K){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Si.subVectors(e,t),r.cross(Si);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Si.subVectors(r,t),lr.subVectors(i,t),rd.subVectors(e,t);let a=Si.dot(Si),o=Si.dot(lr),c=Si.dot(rd),l=lr.dot(lr),u=lr.dot(rd),h=a*l-o*o;if(h===0)return s.set(0,0,0),null;let d=1/h,m=(l*c-o*u)*d,x=(a*u-o*c)*d;return s.set(1-m-x,x,m)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,cr)===null?!1:cr.x>=0&&cr.y>=0&&cr.x+cr.y<=1}static getInterpolation(e,t,i,r,s,a,o,c){return this.getBarycoord(e,t,i,r,cr)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,cr.x),c.addScaledVector(a,cr.y),c.addScaledVector(o,cr.z),c)}static getInterpolatedAttribute(e,t,i,r,s,a){return ld.setScalar(0),cd.setScalar(0),ud.setScalar(0),ld.fromBufferAttribute(e,t),cd.fromBufferAttribute(e,i),ud.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(ld,s.x),a.addScaledVector(cd,s.y),a.addScaledVector(ud,s.z),a}static isFrontFacing(e,t,i,r){return Si.subVectors(i,t),lr.subVectors(e,t),Si.cross(lr).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Si.subVectors(this.c,this.b),lr.subVectors(this.a,this.b),Si.cross(lr).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return n.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,r=this.b,s=this.c,a,o;la.subVectors(r,i),ca.subVectors(s,i),sd.subVectors(e,i);let c=la.dot(sd),l=ca.dot(sd);if(c<=0&&l<=0)return t.copy(i);ad.subVectors(e,r);let u=la.dot(ad),h=ca.dot(ad);if(u>=0&&h<=u)return t.copy(r);let d=c*h-u*l;if(d<=0&&c>=0&&u<=0)return a=c/(c-u),t.copy(i).addScaledVector(la,a);od.subVectors(e,s);let m=la.dot(od),x=ca.dot(od);if(x>=0&&m<=x)return t.copy(s);let v=m*l-c*x;if(v<=0&&l>=0&&x<=0)return o=l/(l-x),t.copy(i).addScaledVector(ca,o);let g=u*x-m*h;if(g<=0&&h-u>=0&&m-x>=0)return _g.subVectors(s,r),o=(h-u)/(h-u+(m-x)),t.copy(r).addScaledVector(_g,o);let _=1/(g+v+d);return a=v*_,o=d*_,t.copy(i).addScaledVector(la,a).addScaledVector(ca,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},ti=class{constructor(e=new K(1/0,1/0,1/0),t=new K(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(bi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(bi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=bi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,bi):bi.fromBufferAttribute(s,a),bi.applyMatrix4(e.matrixWorld),this.expandByPoint(bi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),sc.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),sc.copy(i.boundingBox)),sc.applyMatrix4(e.matrixWorld),this.union(sc)}let r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,bi),bi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(So),ac.subVectors(this.max,So),ua.subVectors(e.a,So),ha.subVectors(e.b,So),da.subVectors(e.c,So),Fr.subVectors(ha,ua),Br.subVectors(da,ha),vs.subVectors(ua,da);let t=[0,-Fr.z,Fr.y,0,-Br.z,Br.y,0,-vs.z,vs.y,Fr.z,0,-Fr.x,Br.z,0,-Br.x,vs.z,0,-vs.x,-Fr.y,Fr.x,0,-Br.y,Br.x,0,-vs.y,vs.x,0];return!hd(t,ua,ha,da,ac)||(t=[1,0,0,0,1,0,0,0,1],!hd(t,ua,ha,da,ac))?!1:(oc.crossVectors(Fr,Br),t=[oc.x,oc.y,oc.z],hd(t,ua,ha,da,ac))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,bi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(bi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ur[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ur[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ur[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ur[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ur[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ur[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ur[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ur[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ur),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},ur=[new K,new K,new K,new K,new K,new K,new K,new K],bi=new K,sc=new ti,ua=new K,ha=new K,da=new K,Fr=new K,Br=new K,vs=new K,So=new K,ac=new K,oc=new K,ys=new K;function hd(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){ys.fromArray(n,s);let o=r.x*Math.abs(ys.x)+r.y*Math.abs(ys.y)+r.z*Math.abs(ys.z),c=e.dot(ys),l=t.dot(ys),u=i.dot(ys);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}var ln=new K,lc=new dt,ly=0,hn=class extends Gi{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ly++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=rf,this.updateRanges=[],this.gpuType=ii,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)lc.fromBufferAttribute(this,t),lc.applyMatrix3(e),this.setXY(t,lc.x,lc.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)ln.fromBufferAttribute(this,t),ln.applyMatrix3(e),this.setXYZ(t,ln.x,ln.y,ln.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)ln.fromBufferAttribute(this,t),ln.applyMatrix4(e),this.setXYZ(t,ln.x,ln.y,ln.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)ln.fromBufferAttribute(this,t),ln.applyNormalMatrix(e),this.setXYZ(t,ln.x,ln.y,ln.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)ln.fromBufferAttribute(this,t),ln.transformDirection(e),this.setXYZ(t,ln.x,ln.y,ln.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Ei(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Lt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ei(t,this.array)),t}setX(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ei(t,this.array)),t}setY(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ei(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ei(t,this.array)),t}setW(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Lt(t,this.array),i=Lt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=Lt(t,this.array),i=Lt(i,this.array),r=Lt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=Lt(t,this.array),i=Lt(i,this.array),r=Lt(r,this.array),s=Lt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var Do=class extends hn{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var Uo=class extends hn{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var xn=class extends hn{constructor(e,t,i){super(new Float32Array(e),t,i)}},cy=new ti,bo=new K,dd=new K,Vn=class{constructor(e=new K,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):cy.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;bo.subVectors(e,this.center);let t=bo.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(bo,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(dd.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(bo.copy(e.center).add(dd)),this.expandByPoint(bo.copy(e.center).sub(dd))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},uy=0,fi=new at,fd=new $t,fa=new K,Qn=new ti,Mo=new ti,gn=new K,Mn=class n extends Gi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:uy++}),this.uuid=wi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Dv(e)?Uo:Do)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let s=new rt().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return fi.makeRotationFromQuaternion(e),this.applyMatrix4(fi),this}rotateX(e){return fi.makeRotationX(e),this.applyMatrix4(fi),this}rotateY(e){return fi.makeRotationY(e),this.applyMatrix4(fi),this}rotateZ(e){return fi.makeRotationZ(e),this.applyMatrix4(fi),this}translate(e,t,i){return fi.makeTranslation(e,t,i),this.applyMatrix4(fi),this}scale(e,t,i){return fi.makeScale(e,t,i),this.applyMatrix4(fi),this}lookAt(e){return fd.lookAt(e),fd.updateMatrix(),this.applyMatrix4(fd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(fa).negate(),this.translate(fa.x,fa.y,fa.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let r=0,s=e.length;r<s;r++){let a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new xn(i,3))}else{let i=Math.min(e.length,t.count);for(let r=0;r<i;r++){let s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&qe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ti);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Je("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new K(-1/0,-1/0,-1/0),new K(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){let s=t[i];Qn.setFromBufferAttribute(s),this.morphTargetsRelative?(gn.addVectors(this.boundingBox.min,Qn.min),this.boundingBox.expandByPoint(gn),gn.addVectors(this.boundingBox.max,Qn.max),this.boundingBox.expandByPoint(gn)):(this.boundingBox.expandByPoint(Qn.min),this.boundingBox.expandByPoint(Qn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Je('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Vn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Je("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new K,1/0);return}if(e){let i=this.boundingSphere.center;if(Qn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];Mo.setFromBufferAttribute(o),this.morphTargetsRelative?(gn.addVectors(Qn.min,Mo.min),Qn.expandByPoint(gn),gn.addVectors(Qn.max,Mo.max),Qn.expandByPoint(gn)):(Qn.expandByPoint(Mo.min),Qn.expandByPoint(Mo.max))}Qn.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)gn.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(gn));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)gn.fromBufferAttribute(o,l),c&&(fa.fromBufferAttribute(e,l),gn.add(fa)),r=Math.max(r,i.distanceToSquared(gn))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Je('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Je("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,r=t.normal,s=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new hn(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));let o=[],c=[];for(let y=0;y<i.count;y++)o[y]=new K,c[y]=new K;let l=new K,u=new K,h=new K,d=new dt,m=new dt,x=new dt,v=new K,g=new K;function _(y,C,B){l.fromBufferAttribute(i,y),u.fromBufferAttribute(i,C),h.fromBufferAttribute(i,B),d.fromBufferAttribute(s,y),m.fromBufferAttribute(s,C),x.fromBufferAttribute(s,B),u.sub(l),h.sub(l),m.sub(d),x.sub(d);let W=1/(m.x*x.y-x.x*m.y);isFinite(W)&&(v.copy(u).multiplyScalar(x.y).addScaledVector(h,-m.y).multiplyScalar(W),g.copy(h).multiplyScalar(m.x).addScaledVector(u,-x.x).multiplyScalar(W),o[y].add(v),o[C].add(v),o[B].add(v),c[y].add(g),c[C].add(g),c[B].add(g))}let T=this.groups;T.length===0&&(T=[{start:0,count:e.count}]);for(let y=0,C=T.length;y<C;++y){let B=T[y],W=B.start,Z=B.count;for(let ee=W,X=W+Z;ee<X;ee+=3)_(e.getX(ee+0),e.getX(ee+1),e.getX(ee+2))}let I=new K,E=new K,w=new K,R=new K;function N(y){w.fromBufferAttribute(r,y),R.copy(w);let C=o[y];I.copy(C),I.sub(w.multiplyScalar(w.dot(C))).normalize(),E.crossVectors(R,C);let W=E.dot(c[y])<0?-1:1;a.setXYZW(y,I.x,I.y,I.z,W)}for(let y=0,C=T.length;y<C;++y){let B=T[y],W=B.start,Z=B.count;for(let ee=W,X=W+Z;ee<X;ee+=3)N(e.getX(ee+0)),N(e.getX(ee+1)),N(e.getX(ee+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new hn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,m=i.count;d<m;d++)i.setXYZ(d,0,0,0);let r=new K,s=new K,a=new K,o=new K,c=new K,l=new K,u=new K,h=new K;if(e)for(let d=0,m=e.count;d<m;d+=3){let x=e.getX(d+0),v=e.getX(d+1),g=e.getX(d+2);r.fromBufferAttribute(t,x),s.fromBufferAttribute(t,v),a.fromBufferAttribute(t,g),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),o.fromBufferAttribute(i,x),c.fromBufferAttribute(i,v),l.fromBufferAttribute(i,g),o.add(u),c.add(u),l.add(u),i.setXYZ(x,o.x,o.y,o.z),i.setXYZ(v,c.x,c.y,c.z),i.setXYZ(g,l.x,l.y,l.z)}else for(let d=0,m=t.count;d<m;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),i.setXYZ(d+0,u.x,u.y,u.z),i.setXYZ(d+1,u.x,u.y,u.z),i.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)gn.fromBufferAttribute(e,t),gn.normalize(),e.setXYZ(t,gn.x,gn.y,gn.z)}toNonIndexed(){function e(o,c){let l=o.array,u=o.itemSize,h=o.normalized,d=new l.constructor(c.length*u),m=0,x=0;for(let v=0,g=c.length;v<g;v++){o.isInterleavedBufferAttribute?m=c[v]*o.data.stride+o.offset:m=c[v]*u;for(let _=0;_<u;_++)d[x++]=l[m++]}return new hn(d,u,h)}if(this.index===null)return qe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,r=this.attributes;for(let o in r){let c=r[o],l=e(c,i);t.setAttribute(o,l)}let s=this.morphAttributes;for(let o in s){let c=[],l=s[o];for(let u=0,h=l.length;u<h;u++){let d=l[u],m=e(d,i);c.push(m)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let c in i){let l=i[c];e.data.attributes[c]=l.toJSON(e.data)}let r={},s=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let h=0,d=l.length;h<d;h++){let m=l[h];u.push(m.toJSON(e.data))}u.length>0&&(r[c]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let r=e.attributes;for(let l in r){let u=r[l];this.setAttribute(l,u.clone(t))}let s=e.morphAttributes;for(let l in s){let u=[],h=s[l];for(let d=0,m=h.length;d<m;d++)u.push(h[d].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,u=a.length;l<u;l++){let h=a[l];this.addGroup(h.start,h.count,h.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},wa=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=rf,this.updateRanges=[],this.version=0,this.uuid=wi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[i+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=wi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=wi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},Nn=new K,Ra=class n{constructor(e,t,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Nn.fromBufferAttribute(this,t),Nn.applyMatrix4(e),this.setXYZ(t,Nn.x,Nn.y,Nn.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Nn.fromBufferAttribute(this,t),Nn.applyNormalMatrix(e),this.setXYZ(t,Nn.x,Nn.y,Nn.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Nn.fromBufferAttribute(this,t),Nn.transformDirection(e),this.setXYZ(t,Nn.x,Nn.y,Nn.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=Ei(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Lt(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=Lt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Ei(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Ei(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Ei(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Ei(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Lt(t,this.array),i=Lt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Lt(t,this.array),i=Lt(i,this.array),r=Lt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Lt(t,this.array),i=Lt(i,this.array),r=Lt(r,this.array),s=Lt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){Po("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new hn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new n(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Po("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},pd=new K,hy=new K,dy=new rt,Mi=class{constructor(e=new K(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let r=pd.subVectors(i,t).cross(hy.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){let r=e.delta(pd),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||dy.getNormalMatrix(e),r=this.coplanarPoint(pd).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},fy=0,Gn=class extends Gi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:fy++}),this.uuid=wi(),this.name="",this.type="Material",this.blending=ka,this.side=qi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=kd,this.blendDst=zd,this.blendEquation=Ps,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Qe(0,0,0),this.blendAlpha=0,this.depthFunc=va,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=__,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Rc,this.stencilZFail=Rc,this.stencilZPass=Rc,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){qe(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){qe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){let a=[];for(let o in s){let c=s[o];delete c.metadata,a.push(c)}return a}if(t){let s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Qe().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new Mi().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new dt().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new dt().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var hr=new K,md=new K,cc=new K,uc=new K,Hr=class{constructor(e=new K,t=new K(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,hr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=hr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(hr.copy(this.origin).addScaledVector(this.direction,t),hr.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){md.copy(e).add(t).multiplyScalar(.5),cc.copy(t).sub(e).normalize(),uc.copy(this.origin).sub(md);let s=e.distanceTo(t)*.5,a=-this.direction.dot(cc),o=uc.dot(this.direction),c=-uc.dot(cc),l=uc.lengthSq(),u=Math.abs(1-a*a),h,d,m,x;if(u>0)if(h=a*c-o,d=a*o-c,x=s*u,h>=0)if(d>=-x)if(d<=x){let v=1/u;h*=v,d*=v,m=h*(h+a*d+2*o)+d*(a*h+d+2*c)+l}else d=s,h=Math.max(0,-(a*d+o)),m=-h*h+d*(d+2*c)+l;else d=-s,h=Math.max(0,-(a*d+o)),m=-h*h+d*(d+2*c)+l;else d<=-x?(h=Math.max(0,-(-a*s+o)),d=h>0?-s:Math.min(Math.max(-s,-c),s),m=-h*h+d*(d+2*c)+l):d<=x?(h=0,d=Math.min(Math.max(-s,-c),s),m=d*(d+2*c)+l):(h=Math.max(0,-(a*s+o)),d=h>0?s:Math.min(Math.max(-s,-c),s),m=-h*h+d*(d+2*c)+l);else d=a>0?-s:s,h=Math.max(0,-(a*d+o)),m=-h*h+d*(d+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(md).addScaledVector(cc,d),m}intersectSphere(e,t){if(e.radius<0)return null;hr.subVectors(e.center,this.origin);let i=hr.dot(this.direction),r=hr.dot(hr)-i*i,s=e.radius*e.radius;if(r>s)return null;let a=Math.sqrt(s-r),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,c,l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return l>=0?(i=(e.min.x-d.x)*l,r=(e.max.x-d.x)*l):(i=(e.max.x-d.x)*l,r=(e.min.x-d.x)*l),u>=0?(s=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(s=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),h>=0?(o=(e.min.z-d.z)*h,c=(e.max.z-d.z)*h):(o=(e.max.z-d.z)*h,c=(e.min.z-d.z)*h),i>c||o>r)||((o>i||i!==i)&&(i=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,hr)!==null}intersectTriangle(e,t,i,r,s){let a=this.origin,o=this.direction,c=o.x,l=o.y,u=o.z,h=e.x-a.x,d=e.y-a.y,m=e.z-a.z,x=t.x-a.x,v=t.y-a.y,g=t.z-a.z,_=i.x-a.x,T=i.y-a.y,I=i.z-a.z,E=Math.abs(c),w=Math.abs(l),R=Math.abs(u),N,y,C,B,W,Z,ee,X,Q,oe,re,he;if(E>=w&&E>=R?(C=c,Z=h,Q=x,he=_,c>=0?(N=l,y=u,B=d,W=m,ee=v,X=g,oe=T,re=I):(N=u,y=l,B=m,W=d,ee=g,X=v,oe=I,re=T)):w>=R?(C=l,Z=d,Q=v,he=T,l>=0?(N=u,y=c,B=m,W=h,ee=g,X=x,oe=I,re=_):(N=c,y=u,B=h,W=m,ee=x,X=g,oe=_,re=I)):(C=u,Z=m,Q=g,he=I,u>=0?(N=c,y=l,B=h,W=d,ee=x,X=v,oe=_,re=T):(N=l,y=c,B=d,W=h,ee=v,X=x,oe=T,re=_)),C===0)return null;let ie=N/C,le=y/C,de=1/C,ne=B-ie*Z,me=W-le*Z,Oe=ee-ie*Q,Pe=X-le*Q,et=oe-ie*he,J=re-le*he,Y=et*Pe-J*Oe,Me=ne*J-me*et,Ze=Oe*me-Pe*ne;if(r){if(Y<0||Me<0||Ze<0)return null}else if((Y<0||Me<0||Ze<0)&&(Y>0||Me>0||Ze>0))return null;let be=Y+Me+Ze;if(be===0)return null;let it=de*(Y*Z+Me*Q+Ze*he);return(be>0?it<0:it>0)?null:this.at(it/be,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Hn=class extends Gn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new pr,this.combine=Vd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},xg=new at,Ss=new Hr,hc=new Vn,vg=new K,dc=new K,fc=new K,pc=new K,gd=new K,mc=new K,yg=new K,gc=new K,cn=class extends $t{constructor(e=new Mn,t=new Hn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){let i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(s&&o){mc.set(0,0,0);for(let c=0,l=s.length;c<l;c++){let u=o[c],h=s[c];u!==0&&(gd.fromBufferAttribute(h,e),a?mc.addScaledVector(gd,u):mc.addScaledVector(gd.sub(t),u))}t.add(mc)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),hc.copy(i.boundingSphere),hc.applyMatrix4(s),Ss.copy(e.ray).recast(e.near),!(hc.containsPoint(Ss.origin)===!1&&(Ss.intersectSphere(hc,vg)===null||Ss.origin.distanceToSquared(vg)>(e.far-e.near)**2))&&(xg.copy(s).invert(),Ss.copy(e.ray).applyMatrix4(xg),!(i.boundingBox!==null&&Ss.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Ss)))}_computeIntersections(e,t,i){let r,s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,d=s.groups,m=s.drawRange;if(o!==null)if(Array.isArray(a))for(let x=0,v=d.length;x<v;x++){let g=d[x],_=a[g.materialIndex],T=Math.max(g.start,m.start),I=Math.min(o.count,Math.min(g.start+g.count,m.start+m.count));for(let E=T,w=I;E<w;E+=3){let R=o.getX(E),N=o.getX(E+1),y=o.getX(E+2);r=_c(this,_,e,i,l,u,h,R,N,y),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{let x=Math.max(0,m.start),v=Math.min(o.count,m.start+m.count);for(let g=x,_=v;g<_;g+=3){let T=o.getX(g),I=o.getX(g+1),E=o.getX(g+2);r=_c(this,a,e,i,l,u,h,T,I,E),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let x=0,v=d.length;x<v;x++){let g=d[x],_=a[g.materialIndex],T=Math.max(g.start,m.start),I=Math.min(c.count,Math.min(g.start+g.count,m.start+m.count));for(let E=T,w=I;E<w;E+=3){let R=E,N=E+1,y=E+2;r=_c(this,_,e,i,l,u,h,R,N,y),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{let x=Math.max(0,m.start),v=Math.min(c.count,m.start+m.count);for(let g=x,_=v;g<_;g+=3){let T=g,I=g+1,E=g+2;r=_c(this,a,e,i,l,u,h,T,I,E),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}}};function py(n,e,t,i,r,s,a,o){let c;if(e.side===Dn?c=i.intersectTriangle(a,s,r,!0,o):c=i.intersectTriangle(r,s,a,e.side===qi,o),c===null)return null;gc.copy(o),gc.applyMatrix4(n.matrixWorld);let l=t.ray.origin.distanceTo(gc);return l<t.near||l>t.far?null:{distance:l,point:gc.clone(),object:n}}function _c(n,e,t,i,r,s,a,o,c,l){n.getVertexPosition(o,dc),n.getVertexPosition(c,fc),n.getVertexPosition(l,pc);let u=py(n,e,t,i,dc,fc,pc,yg);if(u){let h=new K;Vr.getBarycoord(yg,dc,fc,pc,h),r&&(u.uv=Vr.getInterpolatedAttribute(r,o,c,l,h,new dt)),s&&(u.uv1=Vr.getInterpolatedAttribute(s,o,c,l,h,new dt)),a&&(u.normal=Vr.getInterpolatedAttribute(a,o,c,l,h,new K),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));let d={a:o,b:c,c:l,normal:new K,materialIndex:0};Vr.getNormal(dc,fc,pc,d.normal),u.face=d,u.barycoord=h}return u}var Eo=new Dt,Sg=new Dt,bg=new Dt,my=new Dt,Mg=new at,xc=new K,_d=new Vn,Eg=new at,xd=new Hr,Oo=class extends cn{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=bd,this.bindMatrix=new at,this.bindMatrixInverse=new at,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new ti),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,xc),this.boundingBox.expandByPoint(xc)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Vn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,xc),this.boundingSphere.expandByPoint(xc)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let i=this.material,r=this.matrixWorld;i!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),_d.copy(this.boundingSphere),_d.applyMatrix4(r),e.ray.intersectsSphere(_d)!==!1&&(Eg.copy(r).invert(),xd.copy(e.ray).applyMatrix4(Eg),!(this.boundingBox!==null&&xd.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,xd)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new Dt,t=this.geometry.attributes.skinWeight;for(let i=0,r=t.count;i<r;i++){e.fromBufferAttribute(t,i);let s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(i,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===bd?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===f_?this.bindMatrixInverse.copy(this.bindMatrix).invert():qe("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let i=this.skeleton,r=this.geometry;Sg.fromBufferAttribute(r.attributes.skinIndex,e),bg.fromBufferAttribute(r.attributes.skinWeight,e),t.isVector4?(Eo.copy(t),t.set(0,0,0,0)):(Eo.set(...t,1),t.set(0,0,0)),Eo.applyMatrix4(this.bindMatrix);for(let s=0;s<4;s++){let a=bg.getComponent(s);if(a!==0){let o=Sg.getComponent(s);Mg.multiplyMatrices(i.bones[o].matrixWorld,i.boneInverses[o]),t.addScaledVector(my.copy(Eo).applyMatrix4(Mg),a)}}return t.isVector4&&(t.w=Eo.w),t.applyMatrix4(this.bindMatrixInverse)}},Ia=class extends $t{constructor(){super(),this.isBone=!0,this.type="Bone"}},Ca=class extends vn{constructor(e=null,t=1,i=1,r,s,a,o,c,l=Yt,u=Yt,h,d){super(null,a,o,c,l,u,r,s,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Tg=new at,gy=new at,Fo=class n{constructor(e=[],t=[]){this.uuid=wi(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){qe("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let i=0,r=this.bones.length;i<r;i++)this.boneInverses.push(new at)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let i=new at;this.bones[e]&&i.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(i)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let i=this.bones[e];i&&i.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let i=this.bones[e];i&&(i.parent&&i.parent.isBone?(i.matrix.copy(i.parent.matrixWorld).invert(),i.matrix.multiply(i.matrixWorld)):i.matrix.copy(i.matrixWorld),i.matrix.decompose(i.position,i.quaternion,i.scale))}}update(){let e=this.bones,t=this.boneInverses,i=this.boneMatrices,r=this.boneTexture;for(let s=0,a=e.length;s<a;s++){let o=e[s]?e[s].matrixWorld:gy;Tg.multiplyMatrices(o,t[s]),Tg.toArray(i,s*16)}r!==null&&(r.needsUpdate=!0)}clone(){return new n(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let i=new Ca(t,e,e,ri,ii);return i.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=i,this}getBoneByName(e){for(let t=0,i=this.bones.length;t<i;t++){let r=this.bones[t];if(r.name===e)return r}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let i=0,r=e.bones.length;i<r;i++){let s=e.bones[i],a=t[s];a===void 0&&(qe("Skeleton: No bone found with UUID:",s),a=new Ia),this.bones.push(a),this.boneInverses.push(new at().fromArray(e.boneInverses[i]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,i=this.boneInverses;for(let r=0,s=t.length;r<s;r++){let a=t[r];e.bones.push(a.uuid);let o=i[r];e.boneInverses.push(o.toArray())}return e}},mr=class extends hn{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},pa=new at,Ag=new at,vc=[],wg=new ti,_y=new at,To=new cn,Ao=new Vn,Bo=class extends cn{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new mr(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,_y)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ti),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,pa),wg.copy(e.boundingBox).applyMatrix4(pa),this.boundingBox.union(wg)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Vn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,pa),Ao.copy(e.boundingSphere).applyMatrix4(pa),this.boundingSphere.union(Ao)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let i=t.morphTargetInfluences,r=this.morphTexture.source.data.data,s=i.length+1,a=e*s+1;for(let o=0;o<i.length;o++)i[o]=r[a+o]}raycast(e,t){let i=this.matrixWorld,r=this.count;if(To.geometry=this.geometry,To.material=this.material,To.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ao.copy(this.boundingSphere),Ao.applyMatrix4(i),e.ray.intersectsSphere(Ao)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,pa),Ag.multiplyMatrices(i,pa),To.matrixWorld=Ag,To.raycast(e,vc);for(let a=0,o=vc.length;a<o;a++){let c=vc[a];c.instanceId=s,c.object=this,t.push(c)}vc.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new mr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let i=t.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new Ca(new Float32Array(r*this.count),r,this.count,ou,ii));let s=this.morphTexture.source.data.data,a=0;for(let l=0;l<i.length;l++)a+=i[l];let o=this.geometry.morphTargetsRelative?1:1-a,c=r*e;return s[c]=o,s.set(i,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},bs=new Vn,xy=new dt(.5,.5),yc=new K,Pa=class{constructor(e=new Mi,t=new Mi,i=new Mi,r=new Mi,s=new Mi,a=new Mi){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Ti,i=!1){let r=this.planes,s=e.elements,a=s[0],o=s[1],c=s[2],l=s[3],u=s[4],h=s[5],d=s[6],m=s[7],x=s[8],v=s[9],g=s[10],_=s[11],T=s[12],I=s[13],E=s[14],w=s[15];if(r[0].setComponents(l-a,m-u,_-x,w-T).normalize(),r[1].setComponents(l+a,m+u,_+x,w+T).normalize(),r[2].setComponents(l+o,m+h,_+v,w+I).normalize(),r[3].setComponents(l-o,m-h,_-v,w-I).normalize(),i)r[4].setComponents(c,d,g,E).normalize(),r[5].setComponents(l-c,m-d,_-g,w-E).normalize();else if(r[4].setComponents(l-c,m-d,_-g,w-E).normalize(),t===Ti)r[5].setComponents(l+c,m+d,_+g,w+E).normalize();else if(t===Sa)r[5].setComponents(c,d,g,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),bs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),bs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(bs)}intersectsSprite(e){bs.center.set(0,0,0);let t=xy.distanceTo(e.center);return bs.radius=.7071067811865476+t,bs.applyMatrix4(e.matrixWorld),this.intersectsSphere(bs)}intersectsSphere(e){let t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let r=t[i];if(yc.x=r.normal.x>0?e.max.x:e.min.x,yc.y=r.normal.y>0?e.max.y:e.min.y,yc.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(yc)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Na=class extends Gn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Qe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},zc=new K,Vc=new K,Rg=new at,wo=new Hr,Sc=new Vn,vd=new K,Ig=new K,ws=class extends $t{constructor(e=new Mn,t=new Na){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)zc.fromBufferAttribute(t,r-1),Vc.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=zc.distanceTo(Vc);e.setAttribute("lineDistance",new xn(i,1))}else qe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Sc.copy(i.boundingSphere),Sc.applyMatrix4(r),Sc.radius+=s,e.ray.intersectsSphere(Sc)===!1)return;Rg.copy(r).invert(),wo.copy(e.ray).applyMatrix4(Rg);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=i.index,d=i.attributes.position;if(u!==null){let m=Math.max(0,a.start),x=Math.min(u.count,a.start+a.count);for(let v=m,g=x-1;v<g;v+=l){let _=u.getX(v),T=u.getX(v+1),I=bc(this,e,wo,c,_,T,v);I&&t.push(I)}if(this.isLineLoop){let v=u.getX(x-1),g=u.getX(m),_=bc(this,e,wo,c,v,g,x-1);_&&t.push(_)}}else{let m=Math.max(0,a.start),x=Math.min(d.count,a.start+a.count);for(let v=m,g=x-1;v<g;v+=l){let _=bc(this,e,wo,c,v,v+1,v);_&&t.push(_)}if(this.isLineLoop){let v=bc(this,e,wo,c,x-1,m,x-1);v&&t.push(v)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}};function bc(n,e,t,i,r,s,a){let o=n.geometry.attributes.position;if(zc.fromBufferAttribute(o,r),Vc.fromBufferAttribute(o,s),t.distanceSqToSegment(zc,Vc,vd,Ig)>i)return;vd.applyMatrix4(n.matrixWorld);let l=e.ray.origin.distanceTo(vd);if(!(l<e.near||l>e.far))return{distance:l,point:Ig.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}var Cg=new K,Pg=new K,ko=class extends ws{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[];for(let r=0,s=t.count;r<s;r+=2)Cg.fromBufferAttribute(t,r),Pg.fromBufferAttribute(t,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+Cg.distanceTo(Pg);e.setAttribute("lineDistance",new xn(i,1))}else qe("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},zo=class extends ws{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},La=class extends Gn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Qe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Ng=new at,wd=new Hr,Mc=new Vn,Ec=new K,Vo=class extends $t{constructor(e=new Mn,t=new La){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Mc.copy(i.boundingSphere),Mc.applyMatrix4(r),Mc.radius+=s,e.ray.intersectsSphere(Mc)===!1)return;Ng.copy(r).invert(),wd.copy(e.ray).applyMatrix4(Ng);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=i.index,h=i.attributes.position;if(l!==null){let d=Math.max(0,a.start),m=Math.min(l.count,a.start+a.count);for(let x=d,v=m;x<v;x++){let g=l.getX(x);Ec.fromBufferAttribute(h,g),Lg(Ec,g,c,r,e,t,this)}}else{let d=Math.max(0,a.start),m=Math.min(h.count,a.start+a.count);for(let x=d,v=m;x<v;x++)Ec.fromBufferAttribute(h,x),Lg(Ec,x,c,r,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}};function Lg(n,e,t,i,r,s,a){let o=wd.distanceSqToPoint(n);if(o<t){let c=new K;wd.closestPointToPoint(n,c),c.applyMatrix4(i);let l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var Go=class extends vn{constructor(e=[],t=qr,i,r,s,a,o,c,l,u){super(e,t,i,r,s,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}};var Wr=class extends vn{constructor(e,t,i=Ci,r,s,a,o=Yt,c=Yt,l,u=Vi,h=1){if(u!==Vi&&u!==Yr)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:h};super(d,r,s,a,o,c,u,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ea(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Gc=class extends Wr{constructor(e,t=Ci,i=qr,r,s,a=Yt,o=Yt,c,l=Vi){let u={width:e,height:e,depth:1},h=[u,u,u,u,u,u];super(e,e,t,i,r,s,a,o,c,l),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Ho=class extends vn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Da=class n extends Mn{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};let o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);let c=[],l=[],u=[],h=[],d=0,m=0;x("z","y","x",-1,-1,i,t,e,a,s,0),x("z","y","x",1,-1,i,t,-e,a,s,1),x("x","z","y",1,1,e,i,t,r,a,2),x("x","z","y",1,-1,e,i,-t,r,a,3),x("x","y","z",1,-1,e,t,i,r,s,4),x("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new xn(l,3)),this.setAttribute("normal",new xn(u,3)),this.setAttribute("uv",new xn(h,2));function x(v,g,_,T,I,E,w,R,N,y,C){let B=E/N,W=w/y,Z=E/2,ee=w/2,X=R/2,Q=N+1,oe=y+1,re=0,he=0,ie=new K;for(let le=0;le<oe;le++){let de=le*W-ee;for(let ne=0;ne<Q;ne++){let me=ne*B-Z;ie[v]=me*T,ie[g]=de*I,ie[_]=X,l.push(ie.x,ie.y,ie.z),ie[v]=0,ie[g]=0,ie[_]=R>0?1:-1,u.push(ie.x,ie.y,ie.z),h.push(ne/N),h.push(1-le/y),re+=1}}for(let le=0;le<y;le++)for(let de=0;de<N;de++){let ne=d+de+Q*le,me=d+de+Q*(le+1),Oe=d+(de+1)+Q*(le+1),Pe=d+(de+1)+Q*le;c.push(ne,me,Pe),c.push(me,Oe,Pe),he+=6}o.addGroup(m,he,C),m+=he,d+=re}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var Rs=class n extends Mn{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};let s=e/2,a=t/2,o=Math.floor(i),c=Math.floor(r),l=o+1,u=c+1,h=e/o,d=t/c,m=[],x=[],v=[],g=[];for(let _=0;_<u;_++){let T=_*d-a;for(let I=0;I<l;I++){let E=I*h-s;x.push(E,-T,0),v.push(0,0,1),g.push(I/o),g.push(1-_/c)}}for(let _=0;_<c;_++)for(let T=0;T<o;T++){let I=T+l*_,E=T+l*(_+1),w=T+1+l*(_+1),R=T+1+l*_;m.push(I,E,R),m.push(E,w,R)}this.setIndex(m),this.setAttribute("position",new xn(x,3)),this.setAttribute("normal",new xn(v,3)),this.setAttribute("uv",new xn(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}},Wo=class n extends Mn{constructor(e=.5,t=1,i=32,r=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:r,thetaStart:s,thetaLength:a},i=Math.max(3,i),r=Math.max(1,r);let o=[],c=[],l=[],u=[],h=e,d=(t-e)/r,m=new K,x=new dt;for(let v=0;v<=r;v++){for(let g=0;g<=i;g++){let _=s+g/i*a;m.x=h*Math.cos(_),m.y=h*Math.sin(_),c.push(m.x,m.y,m.z),l.push(0,0,1),x.x=(m.x/t+1)/2,x.y=(m.y/t+1)/2,u.push(x.x,x.y)}h+=d}for(let v=0;v<r;v++){let g=v*(i+1);for(let _=0;_<i;_++){let T=_+g,I=T,E=T+i+1,w=T+i+2,R=T+1;o.push(I,E,R),o.push(E,w,R)}}this.setIndex(o),this.setAttribute("position",new xn(c,3)),this.setAttribute("normal",new xn(l,3)),this.setAttribute("uv",new xn(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}};function Ds(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let r=n[t][i];if(Dg(r))r.isRenderTargetTexture?(qe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(Dg(r[0])){let s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][i]=s}else e[t][i]=r.slice();else e[t][i]=r}}return e}function In(n){let e={};for(let t=0;t<n.length;t++){let i=Ds(n[t]);for(let r in i)e[r]=i[r]}return e}function Dg(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function vy(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function of(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:xt.workingColorSpace}var I_={clone:Ds,merge:In},yy=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Sy=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,ni=class extends Gn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=yy,this.fragmentShader=Sy,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ds(e.uniforms),this.uniformsGroups=vy(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let i in e.uniforms){let r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new Qe().setHex(r.value);break;case"v2":this.uniforms[i].value=new dt().fromArray(r.value);break;case"v3":this.uniforms[i].value=new K().fromArray(r.value);break;case"v4":this.uniforms[i].value=new Dt().fromArray(r.value);break;case"m3":this.uniforms[i].value=new rt().fromArray(r.value);break;case"m4":this.uniforms[i].value=new at().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Hc=class extends ni{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Is=class extends Gn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Qe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Vu,this.normalScale=new dt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new pr,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Wn=class extends Is{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new dt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return bt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Qe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Qe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Qe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Wc=class extends Gn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=m_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Xc=class extends Gn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function zr(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function Ic(n){return n!==void 0&&n.inTangents!==void 0&&n.outTangents!==void 0}function by(n){function e(r,s){return n[r]-n[s]}let t=n.length,i=new Array(t);for(let r=0;r!==t;++r)i[r]=r;return i.sort(e),i}function Ug(n,e,t){let i=n.length,r=new n.constructor(i);for(let s=0,a=0;a!==i;++s){let o=t[s]*e;for(let c=0;c!==e;++c)r[a++]=n[o+c]}return r}function My(n,e,t,i){let r=1,s=n[0];for(;s!==void 0&&s[i]===void 0;)s=n[r++];if(s===void 0)return;let a=s[i];if(a!==void 0)if(Array.isArray(a))do a=s[i],a!==void 0&&(e.push(s.time),t.push(...a)),s=n[r++];while(s!==void 0);else if(a.toArray!==void 0)do a=s[i],a!==void 0&&(e.push(s.time),a.toArray(t,t.length)),s=n[r++];while(s!==void 0);else do a=s[i],a!==void 0&&(e.push(s.time),t.push(a)),s=n[r++];while(s!==void 0)}var Hi=class{constructor(e,t,i,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,r=t[i],s=t[i-1];e:{t:{let a;n:{i:if(!(e<r)){for(let o=i+2;;){if(r===void 0){if(e<s)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(s=r,r=t[++i],e<r)break t}a=t.length;break n}if(!(e>=s)){let o=t[1];e<o&&(i=2,s=o);for(let c=i-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===c)break;if(r=s,s=t[--i-1],e>=s)break t}a=i,i=0;break n}break e}for(;i<a;){let o=i+a>>>1;e<t[o]?a=o:i=o+1}if(r=t[i],s=t[i-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,s,r)}return this.interpolate_(i,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,r=this.valueSize,s=e*r;for(let a=0;a!==r;++a)t[a]=i[s+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},qc=class extends Hi{constructor(e,t,i,r){super(e,t,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ed,endingEnd:Ed}}intervalChanged_(e,t,i){let r=this.parameterPositions,s=e-2,a=e+1,o=r[s],c=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Td:s=e,o=2*t-i;break;case Ad:s=r.length-2,o=t+r[s]-r[s+1];break;default:s=e,o=i}if(c===void 0)switch(this.getSettings_().endingEnd){case Td:a=e,c=2*i-t;break;case Ad:a=1,c=i+r[1]-r[0];break;default:a=e-1,c=t}let l=(i-t)*.5,u=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-i),this._offsetPrev=s*u,this._offsetNext=a*u}interpolate_(e,t,i,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,m=this._weightNext,x=(i-t)/(r-t),v=x*x,g=v*x,_=-d*g+2*d*v-d*x,T=(1+d)*g+(-1.5-2*d)*v+(-.5+d)*x+1,I=(-1-m)*g+(1.5+m)*v+.5*x,E=m*g-m*v;for(let w=0;w!==o;++w)s[w]=_*a[u+w]+T*a[l+w]+I*a[c+w]+E*a[h+w];return s}},Yc=class extends Hi{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=(i-t)/(r-t),h=1-u;for(let d=0;d!==o;++d)s[d]=a[l+d]*h+a[c+d]*u;return s}},Zc=class extends Hi{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Kc=class extends Hi{interpolate_(e,t,i,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=this.inTangents,h=this.outTangents;if(!u||!h){let x=(i-t)/(r-t),v=1-x;for(let g=0;g!==o;++g)s[g]=a[l+g]*v+a[c+g]*x;return s}let d=o*2,m=e-1;for(let x=0;x!==o;++x){let v=a[l+x],g=a[c+x],_=m*d+x*2,T=h[_],I=h[_+1],E=e*d+x*2,w=u[E],R=u[E+1],N=Ty(i,t,T,w,r);s[x]=C_(N,v,I,R,g)}return s}};function C_(n,e,t,i,r){let s=1-n;return s*s*s*e+3*s*s*n*t+3*s*n*n*i+n*n*n*r}function Ey(n,e,t,i,r){let s=1-n;return 3*s*s*(t-e)+6*s*n*(i-t)+3*n*n*(r-i)}function Ty(n,e,t,i,r){let s=(n-e)/(r-e);for(let a=0;a<8;a++){let o=C_(s,e,t,i,r)-n;if(Math.abs(o)<1e-10)break;let c=Ey(s,e,t,i,r);if(Math.abs(c)<1e-10)break;s=Math.max(0,Math.min(1,s-o/c))}return s}var Xn=class{constructor(e,t,i,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=zr(t,this.TimeBufferType),this.values=zr(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:zr(e.times,Array),values:zr(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(i.interpolation=r),Ic(e.settings)&&(i.settings={inTangents:zr(e.settings.inTangents,Array),outTangents:zr(e.settings.outTangents,Array)})}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new Zc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Yc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new qc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Kc(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Es:t=this.InterpolantFactoryMethodDiscrete;break;case Ts:t=this.InterpolantFactoryMethodLinear;break;case wc:t=this.InterpolantFactoryMethodSmooth;break;case Md:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return qe("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Es;case this.InterpolantFactoryMethodLinear:return Ts;case this.InterpolantFactoryMethodSmooth:return wc;case this.InterpolantFactoryMethodBezier:return Md}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]*=e;Ic(this.settings)&&(Og(this.settings.inTangents,e),Og(this.settings.outTangents,e))}return this}trim(e,t){let i=this.times,r=i.length,s=0,a=r-1;for(;s!==r&&i[s]<e;)++s;for(;a!==-1&&i[a]>t;)--a;if(++a,s!==0||a!==r){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=i.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Je("KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,r=this.values,s=i.length;s===0&&(Je("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let c=i[o];if(typeof c=="number"&&isNaN(c)){Je("KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){Je("KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(r!==void 0&&Uv(r))for(let o=0,c=r.length;o!==c;++o){let l=r[o];if(isNaN(l)){Je("KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===wc,s=e.length-1,a=1;for(let o=1;o<s;++o){let c=!1,l=e[o],u=e[o+1];if(l!==u&&(o!==1||l!==e[0]))if(r)c=!0;else{let h=o*i,d=h-i,m=h+i;for(let x=0;x!==i;++x){let v=t[h+x];if(v!==t[d+x]||v!==t[m+x]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let h=o*i,d=a*i;for(let m=0;m!==i;++m)t[d+m]=t[h+m]}++a}}if(s>0){e[a]=e[s];for(let o=s*i,c=a*i,l=0;l!==i;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,r=new i(this.name,e,t);return r.createInterpolant=this.createInterpolant,Ic(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function Og(n,e){for(let t=0,i=n.length;t!==i;t+=2)n[t]*=e}Xn.prototype.ValueTypeName="";Xn.prototype.TimeBufferType=Float32Array;Xn.prototype.ValueBufferType=Float32Array;Xn.prototype.DefaultInterpolation=Ts;var gr=class extends Xn{constructor(e,t,i){super(e,t,i)}};gr.prototype.ValueTypeName="bool";gr.prototype.ValueBufferType=Array;gr.prototype.DefaultInterpolation=Es;gr.prototype.InterpolantFactoryMethodLinear=void 0;gr.prototype.InterpolantFactoryMethodSmooth=void 0;var Xo=class extends Xn{constructor(e,t,i,r){super(e,t,i,r)}};Xo.prototype.ValueTypeName="color";var _r=class extends Xn{constructor(e,t,i,r){super(e,t,i,r)}};_r.prototype.ValueTypeName="number";var jc=class extends Hi{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(i-t)/(r-t),l=e*o;for(let u=l+o;l!==u;l+=4)ei.slerpFlat(s,0,a,l-o,a,l,c);return s}},xr=class extends Xn{constructor(e,t,i,r){super(e,t,i,r)}InterpolantFactoryMethodLinear(e){return new jc(this.times,this.values,this.getValueSize(),e)}};xr.prototype.ValueTypeName="quaternion";xr.prototype.InterpolantFactoryMethodSmooth=void 0;var vr=class extends Xn{constructor(e,t,i){super(e,t,i)}};vr.prototype.ValueTypeName="string";vr.prototype.ValueBufferType=Array;vr.prototype.DefaultInterpolation=Es;vr.prototype.InterpolantFactoryMethodLinear=void 0;vr.prototype.InterpolantFactoryMethodSmooth=void 0;var Xr=class extends Xn{constructor(e,t,i,r){super(e,t,i,r)}};Xr.prototype.ValueTypeName="vector";var qo=class{constructor(e="",t=-1,i=[],r=p_){this.name=e,this.tracks=i,this.duration=t,this.blendMode=r,this.uuid=wi(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],i=e.tracks,r=1/(e.fps||1);for(let a=0,o=i.length;a!==o;++a)t.push(wy(i[a]).scale(r));let s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){let t=[],i=e.tracks,r={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,a=i.length;s!==a;++s)t.push(Xn.toJSON(i[s]));return r}static CreateFromMorphTargetSequence(e,t,i,r){let s=t.length,a=[];for(let o=0;o<s;o++){let c=[],l=[];c.push((o+s-1)%s,o,(o+1)%s),l.push(0,1,0);let u=by(c);c=Ug(c,1,u),l=Ug(l,1,u),!r&&c[0]===0&&(c.push(s),l.push(l[0])),a.push(new _r(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/i))}return new this(e,-1,a)}static findByName(e,t){let i=e;if(!Array.isArray(e)){let r=e;i=r.geometry&&r.geometry.animations||r.animations}for(let r=0;r<i.length;r++)if(i[r].name===t)return i[r];return null}static CreateClipsFromMorphTargetSequences(e,t,i){let r={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){let l=e[o],u=l.name.match(s);if(u&&u.length>1){let h=u[1],d=r[h];d||(r[h]=d=[]),d.push(l)}}let a=[];for(let o in r)a.push(this.CreateFromMorphTargetSequence(o,r[o],t,i));return a}resetDuration(){let e=this.tracks,t=0;for(let i=0,r=e.length;i!==r;++i){let s=this.tracks[i];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let i=0;i<this.tracks.length;i++)e.push(this.tracks[i].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function Ay(n){switch(n.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return _r;case"vector":case"vector2":case"vector3":case"vector4":return Xr;case"color":return Xo;case"quaternion":return xr;case"bool":case"boolean":return gr;case"string":return vr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+n)}function wy(n){if(n.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=Ay(n.type);if(n.times===void 0){let i=[],r=[];My(n.keys,i,r,"value"),n.times=i,n.values=r}let t;return e.parse!==void 0?t=e.parse(n):t=new e(n.name,n.times,n.values,n.interpolation),Ic(n.settings)&&(t.settings={inTangents:zr(n.settings.inTangents,Float32Array),outTangents:zr(n.settings.outTangents,Float32Array)}),t}var zi={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(Fg(n)||(this.files[n]=e))},get:function(n){if(this.enabled!==!1&&!Fg(n))return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};function Fg(n){try{let e=n.slice(n.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var $c=class{constructor(e,t,i){let r=this,s=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(u){o++,s===!1&&r.onStart!==void 0&&r.onStart(u,a,o),s=!0},this.itemEnd=function(u){a++,r.onProgress!==void 0&&r.onProgress(u,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,h){return l.push(u,h),this},this.removeHandler=function(u){let h=l.indexOf(u);return h!==-1&&l.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=l.length;h<d;h+=2){let m=l[h],x=l[h+1];if(m.global&&(m.lastIndex=0),m.test(u))return x}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},P_=new $c,Wi=class{constructor(e){this.manager=e!==void 0?e:P_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let i=this;return new Promise(function(r,s){i.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Wi.DEFAULT_MATERIAL_NAME="__DEFAULT";var dr={},Rd=class extends Error{constructor(e,t){super(e),this.response=t}},Ua=class extends Wi{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,i,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=zi.get(`file:${e}`);if(s!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0);return}if(dr[e]!==void 0){dr[e].push({onLoad:t,onProgress:i,onError:r});return}dr[e]=[],dr[e].push({onLoad:t,onProgress:i,onError:r});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&qe("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let u=dr[e],h=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),m=d?parseInt(d):0,x=m!==0,v=0,g=new ReadableStream({start(_){T();function T(){h.read().then(({done:I,value:E})=>{if(I)_.close();else{v+=E.byteLength;let w=new ProgressEvent("progress",{lengthComputable:x,loaded:v,total:m});for(let R=0,N=u.length;R<N;R++){let y=u[R];y.onProgress&&y.onProgress(w)}_.enqueue(E),T()}},I=>{_.error(I)})}}});return new Response(g)}else throw new Rd(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return l.json();default:if(o==="")return l.text();{let h=/charset="?([^;"\s]*)"?/i.exec(o),d=h&&h[1]?h[1].toLowerCase():void 0,m=new TextDecoder(d);return l.arrayBuffer().then(x=>m.decode(x))}}}).then(l=>{zi.add(`file:${e}`,l);let u=dr[e];delete dr[e];for(let h=0,d=u.length;h<d;h++){let m=u[h];m.onLoad&&m.onLoad(l)}}).catch(l=>{let u=dr[e];if(u===void 0)throw this.manager.itemError(e),l;delete dr[e];for(let h=0,d=u.length;h<d;h++){let m=u[h];m.onError&&m.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var ma=new WeakMap,Jc=class extends Wi{constructor(e){super(e)}load(e,t,i,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,a=zi.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);else{let h=ma.get(a);h===void 0&&(h=[],ma.set(a,h)),h.push({onLoad:t,onError:r})}return a}let o=ba("img");function c(){u(),t&&t(this);let h=ma.get(this)||[];for(let d=0;d<h.length;d++){let m=h[d];m.onLoad&&m.onLoad(this)}ma.delete(this),s.manager.itemEnd(e)}function l(h){u(),r&&r(h),zi.remove(`image:${e}`);let d=ma.get(this)||[];for(let m=0;m<d.length;m++){let x=d[m];x.onError&&x.onError(h)}ma.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),zi.add(`image:${e}`,o),s.manager.itemStart(e),o.src=e,o}};var Cs=class extends Wi{constructor(e){super(e)}load(e,t,i,r){let s=new vn,a=new Jc(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},i,r),s}},Oa=class extends $t{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Qe(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}};var yd=new at,Bg=new K,kg=new K,Fa=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new dt(512,512),this.mapType=qn,this.map=null,this.mapPass=null,this.matrix=new at,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Pa,this._frameExtents=new dt(1,1),this._viewportCount=1,this._viewports=[new Dt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Bg.setFromMatrixPosition(e.matrixWorld),t.position.copy(Bg),kg.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(kg),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,i,r){yd.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(yd,e.coordinateSystem,e.reversedDepth);let s=this._frameExtents,a=r?r.z/s.x:1,o=r?r.w/s.y:1,c=r?r.x/s.x:0,l=r?r.y/s.y:0;e.coordinateSystem===Sa||e.reversedDepth?t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),t.multiply(yd)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Tc=new K,Ac=new ei,ki=new K,Yo=class extends $t{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new at,this.projectionMatrix=new at,this.projectionMatrixInverse=new at,this.coordinateSystem=Ti,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Tc,Ac,ki),ki.x===1&&ki.y===1&&ki.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Tc,Ac,ki.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Tc,Ac,ki),ki.x===1&&ki.y===1&&ki.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Tc,Ac,ki.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},kr=new K,zg=new dt,Vg=new dt,_n=class extends Yo{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=As*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Ro*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return As*2*Math.atan(Math.tan(Ro*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){kr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(kr.x,kr.y).multiplyScalar(-e/kr.z),kr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(kr.x,kr.y).multiplyScalar(-e/kr.z)}getViewSize(e,t){return this.getViewBounds(e,zg,Vg),t.subVectors(Vg,zg)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Ro*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*r/c,t-=a.offsetY*i/l,r*=a.width/c,i*=a.height/l}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Id=class extends Fa{constructor(){super(new _n(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,i=As*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(i!==t.fov||r!==t.aspect||s!==t.far)&&(t.fov=i,t.aspect=r,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},Zo=class extends Oa{constructor(e,t,i=0,r=Math.PI/3,s=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy($t.DEFAULT_UP),this.updateMatrix(),this.target=new $t,this.distance=i,this.angle=r,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new Id}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},Cd=class extends Fa{constructor(){super(new _n(90,1,.5,500)),this.isPointLightShadow=!0}},Ko=class extends Oa{constructor(e,t,i=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new Cd}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Xi=class extends Yo{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=i-e,a=i+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Pd=class extends Fa{constructor(){super(new Xi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},jo=class extends Oa{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy($t.DEFAULT_UP),this.updateMatrix(),this.target=new $t,this.shadow=new Pd}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var yr=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var Sd=new WeakMap,$o=class extends Wi{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&qe("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&qe("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,i,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,a=zi.get(`image-bitmap:${e}`);if(a!==void 0){if(s.manager.itemStart(e),a.then){a.then(l=>{Sd.has(a)===!0?(r&&r(Sd.get(a)),s.manager.itemError(e),s.manager.itemEnd(e)):(t&&t(l),s.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);return}let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign({},s.options,{colorSpaceConversion:"none"}))}).then(function(l){return zi.add(`image-bitmap:${e}`,l),t&&t(l),s.manager.itemEnd(e),l}).catch(function(l){r&&r(l),Sd.set(c,l),zi.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});zi.add(`image-bitmap:${e}`,c),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var ga=-90,_a=1,Qc=class extends $t{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new _n(ga,_a,e,t);r.layers=this.layers,this.add(r);let s=new _n(ga,_a,e,t);s.layers=this.layers,this.add(s);let a=new _n(ga,_a,e,t);a.layers=this.layers,this.add(a);let o=new _n(ga,_a,e,t);o.layers=this.layers,this.add(o);let c=new _n(ga,_a,e,t);c.layers=this.layers,this.add(c);let l=new _n(ga,_a,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,c]=t;for(let l of t)this.remove(l);if(e===Ti)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Sa)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,c,l,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;let v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,4,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(h,d,m),e.xr.enabled=x,i.texture.needsPMREMUpdate=!0}},eu=class extends _n{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var lf="\\[\\]\\.:\\/",Ry=new RegExp("["+lf+"]","g"),cf="[^"+lf+"]",Iy="[^"+lf.replace("\\.","")+"]",Cy=/((?:WC+[\/:])*)/.source.replace("WC",cf),Py=/(WCOD+)?/.source.replace("WCOD",Iy),Ny=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",cf),Ly=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",cf),Dy=new RegExp("^"+Cy+Py+Ny+Ly+"$"),Uy=["material","materials","bones","map"],Nd=class{constructor(e,t,i){let r=i||Vt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=i.length;r!==s;++r)i[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},Vt=class n{constructor(e,t,i){this.path=t,this.parsedPath=i||n.parseTrackName(t),this.node=n.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new n.Composite(e,t,i):new n(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Ry,"")}static parseTrackName(e){let t=Dy.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=i.nodeName&&i.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=i.nodeName.substring(r+1);Uy.indexOf(s)!==-1&&(i.nodeName=i.nodeName.substring(0,r),i.objectName=s)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let c=i(o.children);if(c)return c}return null},r=i(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)e[t++]=i[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,r=t.propertyName,s=t.propertyIndex;if(e||(e=n.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){qe("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let l=t.objectIndex;switch(i){case"materials":if(!e.material){Je("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Je("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Je("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Je("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Je("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){Je("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(l!==void 0){if(e[l]===void 0){Je("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let a=e[r];if(a===void 0){let l=t.nodeName;Je("PropertyBinding: Trying to update property for track: "+l+"."+r+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){Je("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Je("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=r;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Vt.Composite=Nd;Vt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Vt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Vt.prototype.GetterByBindingType=[Vt.prototype._getValue_direct,Vt.prototype._getValue_array,Vt.prototype._getValue_arrayElement,Vt.prototype._getValue_toArray];Vt.prototype.SetterByBindingTypeAndVersioning=[[Vt.prototype._setValue_direct,Vt.prototype._setValue_direct_setNeedsUpdate,Vt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Vt.prototype._setValue_array,Vt.prototype._setValue_array_setNeedsUpdate,Vt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Vt.prototype._setValue_arrayElement,Vt.prototype._setValue_arrayElement_setNeedsUpdate,Vt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Vt.prototype._setValue_fromArray,Vt.prototype._setValue_fromArray_setNeedsUpdate,Vt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var RI=new Float32Array(1);var Gg=new at,Jo=class{constructor(e,t,i=0,r=1/0){this.ray=new Hr(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new Ta,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Je("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Gg.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Gg),this}intersectObject(e,t=!0,i=[]){return Ld(e,this,i,t),i.sort(Hg),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)Ld(e[r],this,i,t);return i.sort(Hg),i}};function Hg(n,e){return n.distance-e.distance}function Ld(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){let s=n.children;for(let a=0,o=s.length;a<o;a++)Ld(s[a],e,t,!0)}}var Dd=class n{static{n.prototype.isMatrix2=!0}constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){let s=this.elements;return s[0]=e,s[2]=t,s[1]=i,s[3]=r,this}};function uf(n,e,t,i){let r=Oy(i);switch(t){case ef:return n*e;case ou:return n*e/r.components*r.byteLength;case lu:return n*e/r.components*r.byteLength;case Zr:return n*e*2/r.components*r.byteLength;case cu:return n*e*2/r.components*r.byteLength;case tf:return n*e*3/r.components*r.byteLength;case ri:return n*e*4/r.components*r.byteLength;case uu:return n*e*4/r.components*r.byteLength;case tl:case nl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case il:case rl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case du:case pu:return Math.max(n,16)*Math.max(e,8)/4;case hu:case fu:return Math.max(n,8)*Math.max(e,8)/2;case mu:case gu:case xu:case vu:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case _u:case sl:case yu:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Su:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case bu:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Mu:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Eu:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Tu:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Au:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case wu:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Ru:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Iu:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Cu:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Pu:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Nu:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Lu:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Du:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Uu:case Ou:case Fu:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Bu:case ku:return Math.ceil(n/4)*Math.ceil(e/4)*8;case al:case zu:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Oy(n){switch(n){case qn:case jd:return{byteLength:1,components:1};case Va:case $d:case Pi:return{byteLength:2,components:1};case su:case au:return{byteLength:2,components:4};case Ci:case ru:case ii:return{byteLength:4,components:1};case Jd:case Qd:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?qe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function Q_(){let n=null,e=!1,t=null,i=null;function r(s,a){i=n.requestAnimationFrame(r),t(s,a)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function By(n){let e=new WeakMap;function t(o,c){let l=o.array,u=o.usage,h=l.byteLength,d=n.createBuffer();n.bindBuffer(c,d),n.bufferData(c,l,u),o.onUploadCallback();let m;if(l instanceof Float32Array)m=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)m=n.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?m=n.HALF_FLOAT:m=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=n.SHORT;else if(l instanceof Uint32Array)m=n.UNSIGNED_INT;else if(l instanceof Int32Array)m=n.INT;else if(l instanceof Int8Array)m=n.BYTE;else if(l instanceof Uint8Array)m=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:h}}function i(o,c,l){let u=c.array,h=c.updateRanges;if(n.bindBuffer(l,o),h.length===0)n.bufferSubData(l,0,u);else{h.sort((m,x)=>m.start-x.start);let d=0;for(let m=1;m<h.length;m++){let x=h[d],v=h[m];v.start<=x.start+x.count+1?x.count=Math.max(x.count,v.start+v.count-x.start):(++d,h[d]=v)}h.length=d+1;for(let m=0,x=h.length;m<x;m++){let v=h[m];n.bufferSubData(l,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=e.get(o);c&&(n.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:r,remove:s,update:a}}var ky=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,zy=`#ifdef USE_ALPHAHASH
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
#endif`,Vy=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Gy=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Hy=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Wy=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Xy=`#ifdef USE_AOMAP
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
#endif`,qy=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Yy=`#ifdef USE_BATCHING
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
#endif`,Zy=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ky=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,jy=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,$y=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Jy=`#ifdef USE_IRIDESCENCE
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
#endif`,Qy=`#ifdef USE_BUMPMAP
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
#endif`,eS=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,tS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,nS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,iS=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,rS=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,sS=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,aS=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,oS=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,lS=`#define PI 3.141592653589793
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
} // validated`,cS=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,uS=`vec3 transformedNormal = objectNormal;
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
#endif`,hS=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,dS=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,fS=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,pS=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,mS="gl_FragColor = linearToOutputTexel( gl_FragColor );",gS=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,_S=`#ifdef USE_ENVMAP
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
#endif`,xS=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,vS=`#ifdef USE_ENVMAP
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
#endif`,yS=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,SS=`#ifdef USE_ENVMAP
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
#endif`,bS=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,MS=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ES=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,TS=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,AS=`#ifdef USE_GRADIENTMAP
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
}`,wS=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,RS=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,IS=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,CS=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,PS=`#ifdef USE_ENVMAP
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
#endif`,NS=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,LS=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,DS=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,US=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,OS=`PhysicalMaterial material;
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
#endif`,FS=`uniform sampler2D dfgLUT;
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
}`,BS=`
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
#endif`,kS=`#if defined( RE_IndirectDiffuse )
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
#endif`,zS=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,VS=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,GS=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,HS=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,WS=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,XS=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,qS=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,YS=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ZS=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,KS=`#if defined( USE_POINTS_UV )
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
#endif`,jS=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,$S=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,JS=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,QS=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,eb=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,tb=`#ifdef USE_MORPHTARGETS
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
#endif`,nb=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ib=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,rb=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,sb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ab=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ob=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,lb=`#ifdef USE_NORMALMAP
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
#endif`,cb=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ub=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,hb=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,db=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,fb=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,pb=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,mb=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,gb=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,_b=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,xb=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,vb=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,yb=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Sb=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,bb=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Mb=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Eb=`float getShadowMask() {
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
}`,Tb=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ab=`#ifdef USE_SKINNING
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
#endif`,wb=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Rb=`#ifdef USE_SKINNING
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
#endif`,Ib=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Cb=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Pb=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Nb=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Lb=`#ifdef USE_TRANSMISSION
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
#endif`,Db=`#ifdef USE_TRANSMISSION
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
#endif`,Ub=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ob=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Fb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Bb=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,kb=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,zb=`uniform sampler2D t2D;
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
}`,Vb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Gb=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Hb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Wb=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xb=`#include <common>
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
}`,qb=`#if DEPTH_PACKING == 3200
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
}`,Yb=`#define DISTANCE
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
}`,Zb=`#define DISTANCE
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
}`,Kb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,jb=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$b=`uniform float scale;
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
}`,Jb=`uniform vec3 diffuse;
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
}`,Qb=`#include <common>
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
}`,eM=`uniform vec3 diffuse;
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
}`,tM=`#define LAMBERT
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
}`,nM=`#define LAMBERT
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
}`,iM=`#define MATCAP
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
}`,rM=`#define MATCAP
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
}`,sM=`#define NORMAL
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
}`,aM=`#define NORMAL
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
}`,oM=`#define PHONG
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
}`,lM=`#define PHONG
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
}`,cM=`#define STANDARD
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
}`,uM=`#define STANDARD
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
}`,hM=`#define TOON
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
}`,dM=`#define TOON
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
}`,fM=`uniform float size;
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
}`,pM=`uniform vec3 diffuse;
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
}`,mM=`#include <common>
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
}`,gM=`uniform vec3 color;
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
}`,_M=`uniform float rotation;
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
}`,xM=`uniform vec3 diffuse;
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
}`,mt={alphahash_fragment:ky,alphahash_pars_fragment:zy,alphamap_fragment:Vy,alphamap_pars_fragment:Gy,alphatest_fragment:Hy,alphatest_pars_fragment:Wy,aomap_fragment:Xy,aomap_pars_fragment:qy,batching_pars_vertex:Yy,batching_vertex:Zy,begin_vertex:Ky,beginnormal_vertex:jy,bsdfs:$y,iridescence_fragment:Jy,bumpmap_pars_fragment:Qy,clipping_planes_fragment:eS,clipping_planes_pars_fragment:tS,clipping_planes_pars_vertex:nS,clipping_planes_vertex:iS,color_fragment:rS,color_pars_fragment:sS,color_pars_vertex:aS,color_vertex:oS,common:lS,cube_uv_reflection_fragment:cS,defaultnormal_vertex:uS,displacementmap_pars_vertex:hS,displacementmap_vertex:dS,emissivemap_fragment:fS,emissivemap_pars_fragment:pS,colorspace_fragment:mS,colorspace_pars_fragment:gS,envmap_fragment:_S,envmap_common_pars_fragment:xS,envmap_pars_fragment:vS,envmap_pars_vertex:yS,envmap_physical_pars_fragment:PS,envmap_vertex:SS,fog_vertex:bS,fog_pars_vertex:MS,fog_fragment:ES,fog_pars_fragment:TS,gradientmap_pars_fragment:AS,lightmap_pars_fragment:wS,lights_lambert_fragment:RS,lights_lambert_pars_fragment:IS,lights_pars_begin:CS,lights_toon_fragment:NS,lights_toon_pars_fragment:LS,lights_phong_fragment:DS,lights_phong_pars_fragment:US,lights_physical_fragment:OS,lights_physical_pars_fragment:FS,lights_fragment_begin:BS,lights_fragment_maps:kS,lights_fragment_end:zS,lightprobes_pars_fragment:VS,logdepthbuf_fragment:GS,logdepthbuf_pars_fragment:HS,logdepthbuf_pars_vertex:WS,logdepthbuf_vertex:XS,map_fragment:qS,map_pars_fragment:YS,map_particle_fragment:ZS,map_particle_pars_fragment:KS,metalnessmap_fragment:jS,metalnessmap_pars_fragment:$S,morphinstance_vertex:JS,morphcolor_vertex:QS,morphnormal_vertex:eb,morphtarget_pars_vertex:tb,morphtarget_vertex:nb,normal_fragment_begin:ib,normal_fragment_maps:rb,normal_pars_fragment:sb,normal_pars_vertex:ab,normal_vertex:ob,normalmap_pars_fragment:lb,clearcoat_normal_fragment_begin:cb,clearcoat_normal_fragment_maps:ub,clearcoat_pars_fragment:hb,iridescence_pars_fragment:db,opaque_fragment:fb,packing:pb,premultiplied_alpha_fragment:mb,project_vertex:gb,dithering_fragment:_b,dithering_pars_fragment:xb,roughnessmap_fragment:vb,roughnessmap_pars_fragment:yb,shadowmap_pars_fragment:Sb,shadowmap_pars_vertex:bb,shadowmap_vertex:Mb,shadowmask_pars_fragment:Eb,skinbase_vertex:Tb,skinning_pars_vertex:Ab,skinning_vertex:wb,skinnormal_vertex:Rb,specularmap_fragment:Ib,specularmap_pars_fragment:Cb,tonemapping_fragment:Pb,tonemapping_pars_fragment:Nb,transmission_fragment:Lb,transmission_pars_fragment:Db,uv_pars_fragment:Ub,uv_pars_vertex:Ob,uv_vertex:Fb,worldpos_vertex:Bb,background_vert:kb,background_frag:zb,backgroundCube_vert:Vb,backgroundCube_frag:Gb,cube_vert:Hb,cube_frag:Wb,depth_vert:Xb,depth_frag:qb,distance_vert:Yb,distance_frag:Zb,equirect_vert:Kb,equirect_frag:jb,linedashed_vert:$b,linedashed_frag:Jb,meshbasic_vert:Qb,meshbasic_frag:eM,meshlambert_vert:tM,meshlambert_frag:nM,meshmatcap_vert:iM,meshmatcap_frag:rM,meshnormal_vert:sM,meshnormal_frag:aM,meshphong_vert:oM,meshphong_frag:lM,meshphysical_vert:cM,meshphysical_frag:uM,meshtoon_vert:hM,meshtoon_frag:dM,points_vert:fM,points_frag:pM,shadow_vert:mM,shadow_frag:gM,sprite_vert:_M,sprite_frag:xM},Re={common:{diffuse:{value:new Qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new rt},alphaMap:{value:null},alphaMapTransform:{value:new rt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new rt}},envmap:{envMap:{value:null},envMapRotation:{value:new rt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new rt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new rt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new rt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new rt},normalScale:{value:new dt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new rt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new rt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new rt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new rt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new K},probesMax:{value:new K},probesResolution:{value:new K}},points:{diffuse:{value:new Qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new rt},alphaTest:{value:0},uvTransform:{value:new rt}},sprite:{diffuse:{value:new Qe(16777215)},opacity:{value:1},center:{value:new dt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new rt},alphaMap:{value:null},alphaMapTransform:{value:new rt},alphaTest:{value:0}}},Ki={basic:{uniforms:In([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.fog]),vertexShader:mt.meshbasic_vert,fragmentShader:mt.meshbasic_frag},lambert:{uniforms:In([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,Re.lights,{emissive:{value:new Qe(0)},envMapIntensity:{value:1}}]),vertexShader:mt.meshlambert_vert,fragmentShader:mt.meshlambert_frag},phong:{uniforms:In([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,Re.lights,{emissive:{value:new Qe(0)},specular:{value:new Qe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:mt.meshphong_vert,fragmentShader:mt.meshphong_frag},standard:{uniforms:In([Re.common,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.roughnessmap,Re.metalnessmap,Re.fog,Re.lights,{emissive:{value:new Qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:mt.meshphysical_vert,fragmentShader:mt.meshphysical_frag},toon:{uniforms:In([Re.common,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.gradientmap,Re.fog,Re.lights,{emissive:{value:new Qe(0)}}]),vertexShader:mt.meshtoon_vert,fragmentShader:mt.meshtoon_frag},matcap:{uniforms:In([Re.common,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,{matcap:{value:null}}]),vertexShader:mt.meshmatcap_vert,fragmentShader:mt.meshmatcap_frag},points:{uniforms:In([Re.points,Re.fog]),vertexShader:mt.points_vert,fragmentShader:mt.points_frag},dashed:{uniforms:In([Re.common,Re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:mt.linedashed_vert,fragmentShader:mt.linedashed_frag},depth:{uniforms:In([Re.common,Re.displacementmap]),vertexShader:mt.depth_vert,fragmentShader:mt.depth_frag},normal:{uniforms:In([Re.common,Re.bumpmap,Re.normalmap,Re.displacementmap,{opacity:{value:1}}]),vertexShader:mt.meshnormal_vert,fragmentShader:mt.meshnormal_frag},sprite:{uniforms:In([Re.sprite,Re.fog]),vertexShader:mt.sprite_vert,fragmentShader:mt.sprite_frag},background:{uniforms:{uvTransform:{value:new rt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:mt.background_vert,fragmentShader:mt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new rt}},vertexShader:mt.backgroundCube_vert,fragmentShader:mt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:mt.cube_vert,fragmentShader:mt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:mt.equirect_vert,fragmentShader:mt.equirect_frag},distance:{uniforms:In([Re.common,Re.displacementmap,{referencePosition:{value:new K},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:mt.distance_vert,fragmentShader:mt.distance_frag},shadow:{uniforms:In([Re.lights,Re.fog,{color:{value:new Qe(0)},opacity:{value:1}}]),vertexShader:mt.shadow_vert,fragmentShader:mt.shadow_frag}};Ki.physical={uniforms:In([Ki.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new rt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new rt},clearcoatNormalScale:{value:new dt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new rt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new rt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new rt},sheen:{value:0},sheenColor:{value:new Qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new rt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new rt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new rt},transmissionSamplerSize:{value:new dt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new rt},attenuationDistance:{value:0},attenuationColor:{value:new Qe(0)},specularColor:{value:new Qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new rt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new rt},anisotropyVector:{value:new dt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new rt}}]),vertexShader:mt.meshphysical_vert,fragmentShader:mt.meshphysical_frag};var Wu={r:0,b:0,g:0},vM=new at,e0=new rt;e0.set(-1,0,0,0,1,0,0,0,1);function yM(n,e,t,i,r,s){let a=new Qe(0),o=r===!0?0:1,c,l,u=null,h=0,d=null;function m(T){let I=T.isScene===!0?T.background:null;if(I&&I.isTexture){let E=T.backgroundBlurriness>0;I=e.get(I,E)}return I}function x(T){let I=!1,E=m(T);E===null?g(a,o):E&&E.isColor&&(g(E,1),I=!0);let w=n.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,s):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||I)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function v(T,I){let E=m(I);E&&(E.isCubeTexture||E.mapping===el)?(l===void 0&&(l=new cn(new Da(1,1,1),new ni({name:"BackgroundCubeMaterial",uniforms:Ds(Ki.backgroundCube.uniforms),vertexShader:Ki.backgroundCube.vertexShader,fragmentShader:Ki.backgroundCube.fragmentShader,side:Dn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(w,R,N){this.matrixWorld.copyPosition(N.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=E,l.material.uniforms.backgroundBlurriness.value=I.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=I.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(vM.makeRotationFromEuler(I.backgroundRotation)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(e0),l.material.toneMapped=xt.getTransfer(E.colorSpace)!==Ct,(u!==E||h!==E.version||d!==n.toneMapping)&&(l.material.needsUpdate=!0,u=E,h=E.version,d=n.toneMapping),l.layers.enableAll(),T.unshift(l,l.geometry,l.material,0,0,null)):E&&E.isTexture&&(c===void 0&&(c=new cn(new Rs(2,2),new ni({name:"BackgroundMaterial",uniforms:Ds(Ki.background.uniforms),vertexShader:Ki.background.vertexShader,fragmentShader:Ki.background.fragmentShader,side:qi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=E,c.material.uniforms.backgroundIntensity.value=I.backgroundIntensity,c.material.toneMapped=xt.getTransfer(E.colorSpace)!==Ct,E.matrixAutoUpdate===!0&&E.updateMatrix(),c.material.uniforms.uvTransform.value.copy(E.matrix),(u!==E||h!==E.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,u=E,h=E.version,d=n.toneMapping),c.layers.enableAll(),T.unshift(c,c.geometry,c.material,0,0,null))}function g(T,I){T.getRGB(Wu,of(n)),t.buffers.color.setClear(Wu.r,Wu.g,Wu.b,I,s)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(T,I=1){a.set(T),o=I,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(T){o=T,g(a,o)},render:x,addToRenderList:v,dispose:_}}function SM(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=d(null),s=r,a=!1;function o(W,Z,ee,X,Q){let oe=!1,re=h(W,X,ee,Z);s!==re&&(s=re,l(s.object)),oe=m(W,X,ee,Q),oe&&x(W,X,ee,Q),Q!==null&&e.update(Q,n.ELEMENT_ARRAY_BUFFER),(oe||a)&&(a=!1,E(W,Z,ee,X),Q!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(Q).buffer))}function c(){return n.createVertexArray()}function l(W){return n.bindVertexArray(W)}function u(W){return n.deleteVertexArray(W)}function h(W,Z,ee,X){let Q=X.wireframe===!0,oe=i[Z.id];oe===void 0&&(oe={},i[Z.id]=oe);let re=W.isInstancedMesh===!0?W.id:0,he=oe[re];he===void 0&&(he={},oe[re]=he);let ie=he[ee.id];ie===void 0&&(ie={},he[ee.id]=ie);let le=ie[Q];return le===void 0&&(le=d(c()),ie[Q]=le),le}function d(W){let Z=[],ee=[],X=[];for(let Q=0;Q<t;Q++)Z[Q]=0,ee[Q]=0,X[Q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:Z,enabledAttributes:ee,attributeDivisors:X,object:W,attributes:{},index:null}}function m(W,Z,ee,X){let Q=s.attributes,oe=Z.attributes,re=0,he=ee.getAttributes();for(let ie in he)if(he[ie].location>=0){let de=Q[ie],ne=oe[ie];if(ne===void 0&&(ie==="instanceMatrix"&&W.instanceMatrix&&(ne=W.instanceMatrix),ie==="instanceColor"&&W.instanceColor&&(ne=W.instanceColor)),de===void 0||de.attribute!==ne||ne&&de.data!==ne.data)return!0;re++}return s.attributesNum!==re||s.index!==X}function x(W,Z,ee,X){let Q={},oe=Z.attributes,re=0,he=ee.getAttributes();for(let ie in he)if(he[ie].location>=0){let de=oe[ie];de===void 0&&(ie==="instanceMatrix"&&W.instanceMatrix&&(de=W.instanceMatrix),ie==="instanceColor"&&W.instanceColor&&(de=W.instanceColor));let ne={};ne.attribute=de,de&&de.data&&(ne.data=de.data),Q[ie]=ne,re++}s.attributes=Q,s.attributesNum=re,s.index=X}function v(){let W=s.newAttributes;for(let Z=0,ee=W.length;Z<ee;Z++)W[Z]=0}function g(W){_(W,0)}function _(W,Z){let ee=s.newAttributes,X=s.enabledAttributes,Q=s.attributeDivisors;ee[W]=1,X[W]===0&&(n.enableVertexAttribArray(W),X[W]=1),Q[W]!==Z&&(n.vertexAttribDivisor(W,Z),Q[W]=Z)}function T(){let W=s.newAttributes,Z=s.enabledAttributes;for(let ee=0,X=Z.length;ee<X;ee++)Z[ee]!==W[ee]&&(n.disableVertexAttribArray(ee),Z[ee]=0)}function I(W,Z,ee,X,Q,oe,re){re===!0?n.vertexAttribIPointer(W,Z,ee,Q,oe):n.vertexAttribPointer(W,Z,ee,X,Q,oe)}function E(W,Z,ee,X){v();let Q=X.attributes,oe=ee.getAttributes(),re=Z.defaultAttributeValues;for(let he in oe){let ie=oe[he];if(ie.location>=0){let le=Q[he];if(le===void 0&&(he==="instanceMatrix"&&W.instanceMatrix&&(le=W.instanceMatrix),he==="instanceColor"&&W.instanceColor&&(le=W.instanceColor)),le!==void 0){let de=le.normalized,ne=le.itemSize,me=e.get(le);if(me===void 0)continue;let Oe=me.buffer,Pe=me.type,et=me.bytesPerElement,J=Pe===n.INT||Pe===n.UNSIGNED_INT||le.gpuType===ru;if(le.isInterleavedBufferAttribute){let Y=le.data,Me=Y.stride,Ze=le.offset;if(Y.isInstancedInterleavedBuffer){for(let be=0;be<ie.locationSize;be++)_(ie.location+be,Y.meshPerAttribute);W.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let be=0;be<ie.locationSize;be++)g(ie.location+be);n.bindBuffer(n.ARRAY_BUFFER,Oe);for(let be=0;be<ie.locationSize;be++)I(ie.location+be,ne/ie.locationSize,Pe,de,Me*et,(Ze+ne/ie.locationSize*be)*et,J)}else{if(le.isInstancedBufferAttribute){for(let Y=0;Y<ie.locationSize;Y++)_(ie.location+Y,le.meshPerAttribute);W.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let Y=0;Y<ie.locationSize;Y++)g(ie.location+Y);n.bindBuffer(n.ARRAY_BUFFER,Oe);for(let Y=0;Y<ie.locationSize;Y++)I(ie.location+Y,ne/ie.locationSize,Pe,de,ne*et,ne/ie.locationSize*Y*et,J)}}else if(re!==void 0){let de=re[he];if(de!==void 0)switch(de.length){case 2:n.vertexAttrib2fv(ie.location,de);break;case 3:n.vertexAttrib3fv(ie.location,de);break;case 4:n.vertexAttrib4fv(ie.location,de);break;default:n.vertexAttrib1fv(ie.location,de)}}}}T()}function w(){C();for(let W in i){let Z=i[W];for(let ee in Z){let X=Z[ee];for(let Q in X){let oe=X[Q];for(let re in oe)u(oe[re].object),delete oe[re];delete X[Q]}}delete i[W]}}function R(W){if(i[W.id]===void 0)return;let Z=i[W.id];for(let ee in Z){let X=Z[ee];for(let Q in X){let oe=X[Q];for(let re in oe)u(oe[re].object),delete oe[re];delete X[Q]}}delete i[W.id]}function N(W){for(let Z in i){let ee=i[Z];for(let X in ee){let Q=ee[X];if(Q[W.id]===void 0)continue;let oe=Q[W.id];for(let re in oe)u(oe[re].object),delete oe[re];delete Q[W.id]}}}function y(W){for(let Z in i){let ee=i[Z],X=W.isInstancedMesh===!0?W.id:0,Q=ee[X];if(Q!==void 0){for(let oe in Q){let re=Q[oe];for(let he in re)u(re[he].object),delete re[he];delete Q[oe]}delete ee[X],Object.keys(ee).length===0&&delete i[Z]}}}function C(){B(),a=!0,s!==r&&(s=r,l(s.object))}function B(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:C,resetDefaultState:B,dispose:w,releaseStatesOfGeometry:R,releaseStatesOfObject:y,releaseStatesOfProgram:N,initAttributes:v,enableAttribute:g,disableUnusedAttributes:T}}function bM(n,e,t){let i;function r(c){i=c}function s(c,l){n.drawArrays(i,c,l),t.update(l,i,1)}function a(c,l,u){u!==0&&(n.drawArraysInstanced(i,c,l,u),t.update(l,i,u))}function o(c,l,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,u);let d=0;for(let m=0;m<u;m++)d+=l[m];t.update(d,i,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function MM(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let N=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(N.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(N){return!(N!==ri&&i.convert(N)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(N){let y=N===Pi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(N!==qn&&N!==ii&&!y&&i.convert(N)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function c(N){if(N==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";N="mediump"}return N==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",u=c(l);u!==l&&(qe("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let h=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&qe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let m=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),_=n.getParameter(n.MAX_VERTEX_ATTRIBS),T=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),I=n.getParameter(n.MAX_VARYING_VECTORS),E=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),w=n.getParameter(n.MAX_SAMPLES),R=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:h,reversedDepthBuffer:d,maxTextures:m,maxVertexTextures:x,maxTextureSize:v,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:T,maxVaryings:I,maxFragmentUniforms:E,maxSamples:w,samples:R}}function EM(n){let e=this,t=null,i=0,r=!1,s=!1,a=new Mi,o=new rt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){let m=h.length!==0||d||i!==0||r;return r=d,i=h.length,m},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,m){let x=h.clippingPlanes,v=h.clipIntersection,g=h.clipShadows,_=n.get(h);if(!r||x===null||x.length===0||s&&!g)s?u(null):l();else{let T=s?0:i,I=T*4,E=_.clippingState||null;c.value=E,E=u(x,d,I,m);for(let w=0;w!==I;++w)E[w]=t[w];_.clippingState=E,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=T}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(h,d,m,x){let v=h!==null?h.length:0,g=null;if(v!==0){if(g=c.value,x!==!0||g===null){let _=m+v*4,T=d.matrixWorldInverse;o.getNormalMatrix(T),(g===null||g.length<_)&&(g=new Float32Array(_));for(let I=0,E=m;I!==v;++I,E+=4)a.copy(h[I]).applyMatrix4(T,o),a.normal.toArray(g,E),g[E+3]=a.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,g}}var qa=4,TM=6,AM=20,wM=256,ll=new Xi,N_=new Qe,hf=null,df=0,ff=0,pf=!1,RM=new K,Us=new K,qu=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){let{size:a=256,position:o=RM}=s;hf=this._renderer.getRenderTarget(),df=this._renderer.getActiveCubeFace(),ff=this._renderer.getActiveMipmapLevel(),pf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,r,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=U_(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=D_(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(hf,df,ff),this._renderer.xr.enabled=pf,e.scissorTest=!1,Xa(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===qr||e.mapping===Ns?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),hf=this._renderer.getRenderTarget(),df=this._renderer.getActiveCubeFace(),ff=this._renderer.getActiveMipmapLevel(),pf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:jt,minFilter:jt,generateMipmaps:!1,type:Pi,format:ri,colorSpace:Ln,depthBuffer:!1},r=L_(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=L_(e,t,i);let{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=IM(s)),this._blurMaterial=PM(s,e,t),this._ggxMaterial=CM(s,e,t)}return r}_compileMaterial(e){let t=new cn(new Mn,e);this._renderer.compile(t,ll)}_sceneToCubeUV(e,t,i,r,s){let c=new _n(90,1,t,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,m=h.toneMapping;h.getClearColor(N_),h.toneMapping=Ri,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(r),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new cn(new Da,new Hn({name:"PMREM.Background",side:Dn,depthWrite:!1,depthTest:!1})));let v=this._backgroundBox,g=v.material,_=!1,T=e.background;T?T.isColor&&(g.color.copy(T),e.background=null,_=!0):(g.color.copy(N_),_=!0);for(let I=0;I<6;I++){let E=I%3;E===0?(c.up.set(0,l[I],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+u[I],s.y,s.z)):E===1?(c.up.set(0,0,l[I]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+u[I],s.z)):(c.up.set(0,l[I],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+u[I]));let w=this._cubeSize;Xa(r,E*w,I>2?w:0,w,w),h.setRenderTarget(r),_&&h.render(v,c),h.render(e,c)}h.toneMapping=m,h.autoClear=d,e.background=T}_textureToCubeUV(e,t){let i=this._renderer,r=e.mapping===qr||e.mapping===Ns;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=U_()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=D_());let s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;let o=s.uniforms;o.envMap.value=e;let c=this._cubeSize;Xa(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(a,ll)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){let r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;let c=a.uniforms,l=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),h=Math.sqrt(l*l-u*u),d=l*1.25,m=h*d,{_lodMax:x}=this,v=this._sizeLods[i],g=3*v*(i>x-qa?i-x+qa:0),_=4*(this._cubeSize-v);c.envMap.value=e.texture,c.roughness.value=m,c.mipInt.value=x-t,Xa(s,g,_,3*v,2*v),r.setRenderTarget(s),r.render(o,ll),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=x-i,Xa(e,g,_,3*v,2*v),r.setRenderTarget(e),r.render(o,ll)}_blur(e,t,i,r){let s=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,s,t,i,a),this._blurPass(s,e,i,i,a)}_blurPass(e,t,i,r,s){let a=this._renderer,o=this._blurMaterial,c=this._lodMeshes[r];c.material=o;let l=o.uniforms;l.envMap.value=e.texture,l.sigma.value=s,l.mipInt.value=this._lodMax-i;let u=this._sizeLods[r],h=3*u*(r>this._lodMax-qa?r-this._lodMax+qa:0),d=4*(this._cubeSize-u);Xa(t,h,d,3*u,2*u),a.setRenderTarget(t),a.render(c,ll)}};function IM(n){let e=[],t=[],i=n,r=n-qa+1+TM;for(let s=0;s<r;s++){let a=Math.pow(2,i);e.push(a);let o=1/(a-2),c=-o,l=1+o,u=[c,c,l,c,l,l,c,c,l,l,c,l],h=6,d=6,m=3,x=new Float32Array(m*d*h),v=new Float32Array(m*d*h);for(let _=0;_<h;_++){let T=_%3*2/3-1,I=_>2?0:-1,E=[T,I,0,T+2/3,I,0,T+2/3,I+1,0,T,I,0,T+2/3,I+1,0,T,I+1,0];x.set(E,m*d*_);for(let w=0;w<d;w++){let R=u[w*2]*2-1,N=u[w*2+1]*2-1;_===0?Us.set(1,N,R):_===1?Us.set(-R,1,-N):_===2?Us.set(-R,N,1):_===3?Us.set(-1,N,-R):_===4?Us.set(-R,-1,N):Us.set(R,N,-1),Us.toArray(v,(_*d+w)*m)}}let g=new Mn;g.setAttribute("position",new hn(x,m)),g.setAttribute("outputDirection",new hn(v,m)),t.push(new cn(g,null)),i>qa&&i--}return{lodMeshes:t,sizeLods:e}}function L_(n,e,t){let i=new zn(n,e,t);return i.texture.mapping=el,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Xa(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function CM(n,e,t){return new ni({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:wM,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ku(),fragmentShader:`

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
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function PM(n,e,t){return new ni({name:"SphericalGaussianBlur",defines:{SAMPLES:AM,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Ku(),fragmentShader:`

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
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function D_(){return new ni({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ku(),fragmentShader:`

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
		`,blending:Yi,depthTest:!1,depthWrite:!1})}function U_(){return new ni({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ku(),fragmentShader:`

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
	`}var Yu=class extends zn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Go(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Da(5,5,5),s=new ni({name:"CubemapFromEquirect",uniforms:Ds(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Dn,blending:Yi});s.uniforms.tEquirect.value=t;let a=new cn(r,s),o=t.minFilter;return t.minFilter===Ii&&(t.minFilter=jt),new Qc(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}};function NM(n){let e=new WeakMap,t=new WeakMap,i=null;function r(d,m=!1){return d==null?null:m?a(d):s(d)}function s(d){if(d&&d.isTexture){let m=d.mapping;if(m===tu||m===nu)if(e.has(d)){let x=e.get(d).texture;return o(x,d.mapping)}else{let x=d.image;if(x&&x.height>0){let v=new Yu(x.height);return v.fromEquirectangularTexture(n,d),e.set(d,v),d.addEventListener("dispose",l),o(v.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){let m=d.mapping,x=m===tu||m===nu,v=m===qr||m===Ns;if(x||v){let g=t.get(d),_=g!==void 0?g.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==_)return i===null&&(i=new qu(n)),g=x?i.fromEquirectangular(d,g):i.fromCubemap(d,g),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),g.texture;if(g!==void 0)return g.texture;{let T=d.image;return x&&T&&T.height>0||v&&T&&c(T)?(i===null&&(i=new qu(n)),g=x?i.fromEquirectangular(d):i.fromCubemap(d),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),d.addEventListener("dispose",u),g.texture):null}}}return d}function o(d,m){return m===tu?d.mapping=qr:m===nu&&(d.mapping=Ns),d}function c(d){let m=0,x=6;for(let v=0;v<x;v++)d[v]!==void 0&&m++;return m===x}function l(d){let m=d.target;m.removeEventListener("dispose",l);let x=e.get(m);x!==void 0&&(e.delete(m),x.dispose())}function u(d){let m=d.target;m.removeEventListener("dispose",u);let x=t.get(m);x!==void 0&&(t.delete(m),x.dispose())}function h(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:h}}function LM(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let r=t(i);return r===null&&Ms("WebGLRenderer: "+i+" extension not supported."),r}}}function DM(n,e,t,i){let r={},s=new WeakMap;function a(h){let d=h.target;d.index!==null&&e.remove(d.index);for(let x in d.attributes)e.remove(d.attributes[x]);d.removeEventListener("dispose",a),delete r[d.id];let m=s.get(d);m&&(e.remove(m),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(h,d){return r[d.id]===!0||(d.addEventListener("dispose",a),r[d.id]=!0,t.memory.geometries++),d}function c(h){let d=h.attributes;for(let m in d)e.update(d[m],n.ARRAY_BUFFER)}function l(h){let d=[],m=h.index,x=h.attributes.position,v=0;if(x===void 0)return;if(m!==null){let T=m.array;v=m.version;for(let I=0,E=T.length;I<E;I+=3){let w=T[I+0],R=T[I+1],N=T[I+2];d.push(w,R,R,N,N,w)}}else{let T=x.array;v=x.version;for(let I=0,E=T.length/3-1;I<E;I+=3){let w=I+0,R=I+1,N=I+2;d.push(w,R,R,N,N,w)}}let g=new(x.count>=65535?Uo:Do)(d,1);g.version=v;let _=s.get(h);_&&e.remove(_),s.set(h,g)}function u(h){let d=s.get(h);if(d){let m=h.index;m!==null&&d.version<m.version&&l(h)}else l(h);return s.get(h)}return{get:o,update:c,getWireframeAttribute:u}}function UM(n,e,t){let i;function r(h){i=h}let s,a;function o(h){s=h.type,a=h.bytesPerElement}function c(h,d){n.drawElements(i,d,s,h*a),t.update(d,i,1)}function l(h,d,m){m!==0&&(n.drawElementsInstanced(i,d,s,h*a,m),t.update(d,i,m))}function u(h,d,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,s,h,0,m);let v=0;for(let g=0;g<m;g++)v+=d[g];t.update(v,i,1)}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function OM(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:Je("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function FM(n,e,t){let i=new WeakMap,r=new Dt;function s(a,o,c){let l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0,d=i.get(o);if(d===void 0||d.count!==h){let C=function(){N.dispose(),i.delete(o),o.removeEventListener("dispose",C)};d!==void 0&&d.texture.dispose();let m=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],_=o.morphAttributes.normal||[],T=o.morphAttributes.color||[],I=0;m===!0&&(I=1),x===!0&&(I=2),v===!0&&(I=3);let E=o.attributes.position.count*I,w=1;E>e.maxTextureSize&&(w=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);let R=new Float32Array(E*w*4*h),N=new No(R,E,w,h);N.type=ii,N.needsUpdate=!0;let y=I*4;for(let B=0;B<h;B++){let W=g[B],Z=_[B],ee=T[B],X=E*w*4*B;for(let Q=0;Q<W.count;Q++){let oe=Q*y;m===!0&&(r.fromBufferAttribute(W,Q),R[X+oe+0]=r.x,R[X+oe+1]=r.y,R[X+oe+2]=r.z,R[X+oe+3]=0),x===!0&&(r.fromBufferAttribute(Z,Q),R[X+oe+4]=r.x,R[X+oe+5]=r.y,R[X+oe+6]=r.z,R[X+oe+7]=0),v===!0&&(r.fromBufferAttribute(ee,Q),R[X+oe+8]=r.x,R[X+oe+9]=r.y,R[X+oe+10]=r.z,R[X+oe+11]=ee.itemSize===4?r.w:1)}}d={count:h,texture:N,size:new dt(E,w)},i.set(o,d),o.addEventListener("dispose",C)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let m=0;for(let v=0;v<l.length;v++)m+=l[v];let x=o.morphTargetsRelative?1:1-m;c.getUniforms().setValue(n,"morphTargetBaseInfluence",x),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:s}}function BM(n,e,t,i,r){let s=new WeakMap;function a(l){let u=r.render.frame,h=l.geometry,d=e.get(l,h);if(s.get(d)!==u&&(e.update(d),s.set(d,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),s.get(l)!==u&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,u))),l.isSkinnedMesh){let m=l.skeleton;s.get(m)!==u&&(m.update(),s.set(m,u))}return d}function o(){s=new WeakMap}function c(l){let u=l.target;u.removeEventListener("dispose",c),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}var kM={[Gd]:"LINEAR_TONE_MAPPING",[Hd]:"REINHARD_TONE_MAPPING",[Wd]:"CINEON_TONE_MAPPING",[Xd]:"ACES_FILMIC_TONE_MAPPING",[Yd]:"AGX_TONE_MAPPING",[Zd]:"NEUTRAL_TONE_MAPPING",[qd]:"CUSTOM_TONE_MAPPING"};function zM(n,e,t,i,r,s){let a=new zn(e,t,{type:n,depthBuffer:r,stencilBuffer:s,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,c=null,l=new Mn;l.setAttribute("position",new xn([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new xn([0,2,0,0,2,0],2));let u=new Hc({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),h=new cn(l,u),d=new Xi(-1,1,1,-1,0,1),m=null,x=null,v=!1,g,_=null,T=[],I=!1;this.setSize=function(E,w){a.setSize(E,w),o!==null&&o.setSize(E,w),c!==null&&c.setSize(E,w);for(let R=0;R<T.length;R++){let N=T[R];N.setSize&&N.setSize(E,w)}},this.setEffects=function(E){T=E,I=T.length>0&&T[0].isRenderPass===!0;let w=a.width,R=a.height;T.length>0&&o===null&&(o=new zn(w,R,{type:Pi,depthBuffer:!1,stencilBuffer:!1}),c=new zn(w,R,{type:Pi,depthBuffer:!1,stencilBuffer:!1}));for(let N=0;N<T.length;N++){let y=T[N];y.setSize&&y.setSize(w,R)}},this.begin=function(E,w){if(v||E.toneMapping===Ri&&T.length===0)return!1;if(_=w,w!==null){let R=w.width,N=w.height;(a.width!==R||a.height!==N)&&this.setSize(R,N)}return I===!1&&E.setRenderTarget(a),g=E.toneMapping,E.toneMapping=Ri,!0},this.hasRenderPass=function(){return I},this.end=function(E,w){E.toneMapping=g,v=!0;let R=a,N=o;for(let y=0;y<T.length;y++){let C=T[y];C.enabled!==!1&&(C.render(E,N,R,w),C.needsSwap!==!1&&(R=N,N=N===o?c:o))}if(m!==E.outputColorSpace||x!==E.toneMapping){m=E.outputColorSpace,x=E.toneMapping,u.defines={},xt.getTransfer(m)===Ct&&(u.defines.SRGB_TRANSFER="");let y=kM[x];y&&(u.defines[y]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=R.texture,E.setRenderTarget(_),E.render(h,d),_=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var t0=new vn,_f=new Wr(1,1),n0=new No,i0=new kc,r0=new Go,O_=[],F_=[],B_=new Float32Array(16),k_=new Float32Array(9),z_=new Float32Array(4);function Za(n,e,t){let i=n[0];if(i<=0||i>0)return n;let r=e*t,s=O_[r];if(s===void 0&&(s=new Float32Array(r),O_[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function dn(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function fn(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function ju(n,e){let t=F_[e];t===void 0&&(t=new Int32Array(e),F_[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function VM(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function GM(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(dn(t,e))return;n.uniform2fv(this.addr,e),fn(t,e)}}function HM(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(dn(t,e))return;n.uniform3fv(this.addr,e),fn(t,e)}}function WM(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(dn(t,e))return;n.uniform4fv(this.addr,e),fn(t,e)}}function XM(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(dn(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),fn(t,e)}else{if(dn(t,i))return;z_.set(i),n.uniformMatrix2fv(this.addr,!1,z_),fn(t,i)}}function qM(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(dn(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),fn(t,e)}else{if(dn(t,i))return;k_.set(i),n.uniformMatrix3fv(this.addr,!1,k_),fn(t,i)}}function YM(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(dn(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),fn(t,e)}else{if(dn(t,i))return;B_.set(i),n.uniformMatrix4fv(this.addr,!1,B_),fn(t,i)}}function ZM(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function KM(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(dn(t,e))return;n.uniform2iv(this.addr,e),fn(t,e)}}function jM(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(dn(t,e))return;n.uniform3iv(this.addr,e),fn(t,e)}}function $M(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(dn(t,e))return;n.uniform4iv(this.addr,e),fn(t,e)}}function JM(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function QM(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(dn(t,e))return;n.uniform2uiv(this.addr,e),fn(t,e)}}function eE(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(dn(t,e))return;n.uniform3uiv(this.addr,e),fn(t,e)}}function tE(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(dn(t,e))return;n.uniform4uiv(this.addr,e),fn(t,e)}}function nE(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(_f.compareFunction=t.isReversedDepthBuffer()?Hu:Gu,s=_f):s=t0,t.setTexture2D(e||s,r)}function iE(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||i0,r)}function rE(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||r0,r)}function sE(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||n0,r)}function aE(n){switch(n){case 5126:return VM;case 35664:return GM;case 35665:return HM;case 35666:return WM;case 35674:return XM;case 35675:return qM;case 35676:return YM;case 5124:case 35670:return ZM;case 35667:case 35671:return KM;case 35668:case 35672:return jM;case 35669:case 35673:return $M;case 5125:return JM;case 36294:return QM;case 36295:return eE;case 36296:return tE;case 35678:case 36198:case 36298:case 36306:case 35682:return nE;case 35679:case 36299:case 36307:return iE;case 35680:case 36300:case 36308:case 36293:return rE;case 36289:case 36303:case 36311:case 36292:return sE}}function oE(n,e){n.uniform1fv(this.addr,e)}function lE(n,e){let t=Za(e,this.size,2);n.uniform2fv(this.addr,t)}function cE(n,e){let t=Za(e,this.size,3);n.uniform3fv(this.addr,t)}function uE(n,e){let t=Za(e,this.size,4);n.uniform4fv(this.addr,t)}function hE(n,e){let t=Za(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function dE(n,e){let t=Za(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function fE(n,e){let t=Za(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function pE(n,e){n.uniform1iv(this.addr,e)}function mE(n,e){n.uniform2iv(this.addr,e)}function gE(n,e){n.uniform3iv(this.addr,e)}function _E(n,e){n.uniform4iv(this.addr,e)}function xE(n,e){n.uniform1uiv(this.addr,e)}function vE(n,e){n.uniform2uiv(this.addr,e)}function yE(n,e){n.uniform3uiv(this.addr,e)}function SE(n,e){n.uniform4uiv(this.addr,e)}function bE(n,e,t){let i=this.cache,r=e.length,s=ju(t,r);dn(i,s)||(n.uniform1iv(this.addr,s),fn(i,s));let a;this.type===n.SAMPLER_2D_SHADOW?a=_f:a=t0;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function ME(n,e,t){let i=this.cache,r=e.length,s=ju(t,r);dn(i,s)||(n.uniform1iv(this.addr,s),fn(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||i0,s[a])}function EE(n,e,t){let i=this.cache,r=e.length,s=ju(t,r);dn(i,s)||(n.uniform1iv(this.addr,s),fn(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||r0,s[a])}function TE(n,e,t){let i=this.cache,r=e.length,s=ju(t,r);dn(i,s)||(n.uniform1iv(this.addr,s),fn(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||n0,s[a])}function AE(n){switch(n){case 5126:return oE;case 35664:return lE;case 35665:return cE;case 35666:return uE;case 35674:return hE;case 35675:return dE;case 35676:return fE;case 5124:case 35670:return pE;case 35667:case 35671:return mE;case 35668:case 35672:return gE;case 35669:case 35673:return _E;case 5125:return xE;case 36294:return vE;case 36295:return yE;case 36296:return SE;case 35678:case 36198:case 36298:case 36306:case 35682:return bE;case 35679:case 36299:case 36307:return ME;case 35680:case 36300:case 36308:case 36293:return EE;case 36289:case 36303:case 36311:case 36292:return TE}}var xf=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=aE(t.type)}},vf=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=AE(t.type)}},yf=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let r=this.seq;for(let s=0,a=r.length;s!==a;++s){let o=r[s];o.setValue(e,t[o.id],i)}}},mf=/(\w+)(\])?(\[|\.)?/g;function V_(n,e){n.seq.push(e),n.map[e.id]=e}function wE(n,e,t){let i=n.name,r=i.length;for(mf.lastIndex=0;;){let s=mf.exec(i),a=mf.lastIndex,o=s[1],c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===r){V_(t,l===void 0?new xf(o,n,e):new vf(o,n,e));break}else{let h=t.map[o];h===void 0&&(h=new yf(o),V_(t,h)),t=h}}}var Ya=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){let o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);wE(o,c,this)}let r=[],s=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){let s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){let r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){let o=t[s],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){let i=[];for(let r=0,s=e.length;r!==s;++r){let a=e[r];a.id in t&&i.push(a)}return i}};function G_(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var RE=37297,IE=0;function CE(n,e){let t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){let o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}var H_=new rt;function PE(n){xt._getMatrix(H_,xt.workingColorSpace,n);let e=`mat3( ${H_.elements.map(t=>t.toFixed(4))} )`;switch(xt.getTransfer(n)){case Co:return[e,"LinearTransferOETF"];case Ct:return[e,"sRGBTransferOETF"];default:return qe("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function W_(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";let a=/ERROR: 0:(\d+)/.exec(s);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+CE(n.getShaderSource(e),o)}else return s}function NE(n,e){let t=PE(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var LE={[Gd]:"Linear",[Hd]:"Reinhard",[Wd]:"Cineon",[Xd]:"ACESFilmic",[Yd]:"AgX",[Zd]:"Neutral",[qd]:"Custom"};function DE(n,e){let t=LE[e];return t===void 0?(qe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Xu=new K;function UE(){xt.getLuminanceCoefficients(Xu);let n=Xu.x.toFixed(4),e=Xu.y.toFixed(4),t=Xu.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function OE(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ul).join(`
`)}function FE(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function BE(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){let s=n.getActiveAttrib(e,r),a=s.name,o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function ul(n){return n!==""}function X_(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function q_(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var kE=/^[ \t]*#include +<([\w\d./]+)>/gm;function Sf(n){return n.replace(kE,VE)}var zE=new Map;function VE(n,e){let t=mt[e];if(t===void 0){let i=zE.get(e);if(i!==void 0)t=mt[i],qe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Sf(t)}var GE=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Y_(n){return n.replace(GE,HE)}function HE(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Z_(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}var WE={[Qo]:"SHADOWMAP_TYPE_PCF",[Ba]:"SHADOWMAP_TYPE_VSM"};function XE(n){return WE[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var qE={[qr]:"ENVMAP_TYPE_CUBE",[Ns]:"ENVMAP_TYPE_CUBE",[el]:"ENVMAP_TYPE_CUBE_UV"};function YE(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":qE[n.envMapMode]||"ENVMAP_TYPE_CUBE"}var ZE={[Ns]:"ENVMAP_MODE_REFRACTION"};function KE(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":ZE[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var jE={[Vd]:"ENVMAP_BLENDING_MULTIPLY",[h_]:"ENVMAP_BLENDING_MIX",[d_]:"ENVMAP_BLENDING_ADD"};function $E(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":jE[n.combine]||"ENVMAP_BLENDING_NONE"}function JE(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function QE(n,e,t,i){let r=n.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,c=XE(t),l=YE(t),u=KE(t),h=$E(t),d=JE(t),m=OE(t),x=FE(s),v=r.createProgram(),g,_,T=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(ul).join(`
`),g.length>0&&(g+=`
`),_=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(ul).join(`
`),_.length>0&&(_+=`
`)):(g=[Z_(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ul).join(`
`),_=[Z_(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ri?"#define TONE_MAPPING":"",t.toneMapping!==Ri?mt.tonemapping_pars_fragment:"",t.toneMapping!==Ri?DE("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",mt.colorspace_pars_fragment,NE("linearToOutputTexel",t.outputColorSpace),UE(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ul).join(`
`)),a=Sf(a),a=X_(a,t),a=q_(a,t),o=Sf(o),o=X_(o,t),o=q_(o,t),a=Y_(a),o=Y_(o),t.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,g=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,_=["#define varying in",t.glslVersion===sf?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===sf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);let I=T+g+a,E=T+_+o,w=G_(r,r.VERTEX_SHADER,I),R=G_(r,r.FRAGMENT_SHADER,E);r.attachShader(v,w),r.attachShader(v,R),t.index0AttributeName!==void 0?r.bindAttribLocation(v,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function N(W){if(n.debug.checkShaderErrors){let Z=r.getProgramInfoLog(v)||"",ee=r.getShaderInfoLog(w)||"",X=r.getShaderInfoLog(R)||"",Q=Z.trim(),oe=ee.trim(),re=X.trim(),he=!0,ie=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(he=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,v,w,R);else{let le=W_(r,w,"vertex"),de=W_(r,R,"fragment");Je("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+W.name+`
Material Type: `+W.type+`

Program Info Log: `+Q+`
`+le+`
`+de)}else Q!==""?qe("WebGLProgram: Program Info Log:",Q):(oe===""||re==="")&&(ie=!1);ie&&(W.diagnostics={runnable:he,programLog:Q,vertexShader:{log:oe,prefix:g},fragmentShader:{log:re,prefix:_}})}r.deleteShader(w),r.deleteShader(R),y=new Ya(r,v),C=BE(r,v)}let y;this.getUniforms=function(){return y===void 0&&N(this),y};let C;this.getAttributes=function(){return C===void 0&&N(this),C};let B=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return B===!1&&(B=r.getProgramParameter(v,RE)),B},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=IE++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=w,this.fragmentShader=R,this}var eT=0,bf=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new Mf(e),t.set(e,i)),i}},Mf=class{constructor(e){this.id=eT++,this.code=e,this.usedTimes=0}};function tT(n){return n===Zr||n===sl||n===al}function nT(n,e,t,i,r,s){let a=new Ta,o=new bf,c=new Set,l=[],u=new Map,h=i.logarithmicDepthBuffer,d=i.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(y){return c.add(y),y===0?"uv":`uv${y}`}function v(y,C,B,W,Z,ee){let X=W.fog,Q=Z.geometry,oe=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?W.environment:null,re=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,he=e.get(y.envMap||oe,re),ie=he&&he.mapping===el?he.image.height:null,le=m[y.type];y.precision!==null&&(d=i.getMaxPrecision(y.precision),d!==y.precision&&qe("WebGLProgram.getParameters:",y.precision,"not supported, using",d,"instead."));let de=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,ne=de!==void 0?de.length:0,me=0;Q.morphAttributes.position!==void 0&&(me=1),Q.morphAttributes.normal!==void 0&&(me=2),Q.morphAttributes.color!==void 0&&(me=3);let Oe,Pe,et,J;if(le){let Ot=Ki[le];Oe=Ot.vertexShader,Pe=Ot.fragmentShader}else{Oe=y.vertexShader,Pe=y.fragmentShader;let Ot=o.getVertexShaderStage(y),At=o.getFragmentShaderStage(y);o.update(y,Ot,At),et=Ot.id,J=At.id}let Y=n.getRenderTarget(),Me=n.state.buffers.depth.getReversed(),Ze=Z.isInstancedMesh===!0,be=Z.isBatchedMesh===!0,it=!!y.map,Gt=!!y.matcap,ot=!!he,St=!!y.aoMap,Rt=!!y.lightMap,ft=!!y.bumpMap&&y.wireframe===!1,Pt=!!y.normalMap,Jt=!!y.displacementMap,Qt=!!y.emissiveMap,Ut=!!y.metalnessMap,Xt=!!y.roughnessMap,G=y.anisotropy>0,Fe=y.clearcoat>0,gt=y.dispersion>0,p=y.retroreflectivity>0,f=y.iridescence>0,S=y.sheen>0,A=y.transmission>0,P=G&&!!y.anisotropyMap,L=Fe&&!!y.clearcoatMap,H=Fe&&!!y.clearcoatNormalMap,D=Fe&&!!y.clearcoatRoughnessMap,F=f&&!!y.iridescenceMap,ae=f&&!!y.iridescenceThicknessMap,ge=S&&!!y.sheenColorMap,ue=S&&!!y.sheenRoughnessMap,fe=!!y.specularMap,Ie=!!y.specularColorMap,De=!!y.specularIntensityMap,tt=A&&!!y.transmissionMap,V=A&&!!y.thicknessMap,Ee=!!y.gradientMap,ce=!!y.alphaMap,Se=y.alphaTest>0,Ae=!!y.alphaHash,pe=!!y.extensions,We=Ri;y.toneMapped&&(Y===null||Y.isXRRenderTarget===!0)&&(We=n.toneMapping);let Be={shaderID:le,shaderType:y.type,shaderName:y.name,vertexShader:Oe,fragmentShader:Pe,defines:y.defines,customVertexShaderID:et,customFragmentShaderID:J,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:d,batching:be,batchingColor:be&&Z._colorsTexture!==null,instancing:Ze,instancingColor:Ze&&Z.instanceColor!==null,instancingMorph:Ze&&Z.morphTexture!==null,outputColorSpace:Y===null?n.outputColorSpace:Y.isXRRenderTarget===!0?Y.texture.colorSpace:xt.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:it,matcap:Gt,envMap:ot,envMapMode:ot&&he.mapping,envMapCubeUVHeight:ie,aoMap:St,lightMap:Rt,bumpMap:ft,normalMap:Pt,displacementMap:Jt,emissiveMap:Qt,normalMapObjectSpace:Pt&&y.normalMapType===g_,normalMapTangentSpace:Pt&&y.normalMapType===Vu,packedNormalMap:Pt&&y.normalMapType===Vu&&tT(y.normalMap.format),metalnessMap:Ut,roughnessMap:Xt,anisotropy:G,anisotropyMap:P,clearcoat:Fe,clearcoatMap:L,clearcoatNormalMap:H,clearcoatRoughnessMap:D,dispersion:gt,retroreflection:p,iridescence:f,iridescenceMap:F,iridescenceThicknessMap:ae,sheen:S,sheenColorMap:ge,sheenRoughnessMap:ue,specularMap:fe,specularColorMap:Ie,specularIntensityMap:De,transmission:A,transmissionMap:tt,thicknessMap:V,gradientMap:Ee,opaque:y.transparent===!1&&y.blending===ka&&y.alphaToCoverage===!1,alphaMap:ce,alphaTest:Se,alphaHash:Ae,combine:y.combine,mapUv:it&&x(y.map.channel),aoMapUv:St&&x(y.aoMap.channel),lightMapUv:Rt&&x(y.lightMap.channel),bumpMapUv:ft&&x(y.bumpMap.channel),normalMapUv:Pt&&x(y.normalMap.channel),displacementMapUv:Jt&&x(y.displacementMap.channel),emissiveMapUv:Qt&&x(y.emissiveMap.channel),metalnessMapUv:Ut&&x(y.metalnessMap.channel),roughnessMapUv:Xt&&x(y.roughnessMap.channel),anisotropyMapUv:P&&x(y.anisotropyMap.channel),clearcoatMapUv:L&&x(y.clearcoatMap.channel),clearcoatNormalMapUv:H&&x(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:D&&x(y.clearcoatRoughnessMap.channel),iridescenceMapUv:F&&x(y.iridescenceMap.channel),iridescenceThicknessMapUv:ae&&x(y.iridescenceThicknessMap.channel),sheenColorMapUv:ge&&x(y.sheenColorMap.channel),sheenRoughnessMapUv:ue&&x(y.sheenRoughnessMap.channel),specularMapUv:fe&&x(y.specularMap.channel),specularColorMapUv:Ie&&x(y.specularColorMap.channel),specularIntensityMapUv:De&&x(y.specularIntensityMap.channel),transmissionMapUv:tt&&x(y.transmissionMap.channel),thicknessMapUv:V&&x(y.thicknessMap.channel),alphaMapUv:ce&&x(y.alphaMap.channel),vertexTangents:!!Q.attributes.tangent&&(Pt||G),vertexNormals:!!Q.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,pointsUvs:Z.isPoints===!0&&!!Q.attributes.uv&&(it||ce),fog:!!X,useFog:y.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||Q.attributes.normal===void 0&&Pt===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:Me,skinning:Z.isSkinnedMesh===!0,hasPositionAttribute:Q.attributes.position!==void 0,morphTargets:Q.morphAttributes.position!==void 0,morphNormals:Q.morphAttributes.normal!==void 0,morphColors:Q.morphAttributes.color!==void 0,morphTargetsCount:ne,morphTextureStride:me,numSunLights:C.sun.length,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numSunLightShadows:C.sunShadowMap.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numLightProbeGrids:ee.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&B.length>0,shadowMapType:n.shadowMap.type,toneMapping:We,decodeVideoTexture:it&&y.map.isVideoTexture===!0&&xt.getTransfer(y.map.colorSpace)===Ct,decodeVideoTextureEmissive:Qt&&y.emissiveMap.isVideoTexture===!0&&xt.getTransfer(y.emissiveMap.colorSpace)===Ct,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Un,flipSided:y.side===Dn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:pe&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(pe&&y.extensions.multiDraw===!0||be)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Be.vertexUv1s=c.has(1),Be.vertexUv2s=c.has(2),Be.vertexUv3s=c.has(3),c.clear(),Be}function g(y){let C=[];if(y.shaderID?C.push(y.shaderID):(C.push(y.customVertexShaderID),C.push(y.customFragmentShaderID)),y.defines!==void 0)for(let B in y.defines)C.push(B),C.push(y.defines[B]);return y.isRawShaderMaterial===!1&&(_(C,y),T(C,y),C.push(n.outputColorSpace)),C.push(y.customProgramCacheKey),C.join()}function _(y,C){y.push(C.precision),y.push(C.outputColorSpace),y.push(C.envMapMode),y.push(C.envMapCubeUVHeight),y.push(C.mapUv),y.push(C.alphaMapUv),y.push(C.lightMapUv),y.push(C.aoMapUv),y.push(C.bumpMapUv),y.push(C.normalMapUv),y.push(C.displacementMapUv),y.push(C.emissiveMapUv),y.push(C.metalnessMapUv),y.push(C.roughnessMapUv),y.push(C.anisotropyMapUv),y.push(C.clearcoatMapUv),y.push(C.clearcoatNormalMapUv),y.push(C.clearcoatRoughnessMapUv),y.push(C.iridescenceMapUv),y.push(C.iridescenceThicknessMapUv),y.push(C.sheenColorMapUv),y.push(C.sheenRoughnessMapUv),y.push(C.specularMapUv),y.push(C.specularColorMapUv),y.push(C.specularIntensityMapUv),y.push(C.transmissionMapUv),y.push(C.thicknessMapUv),y.push(C.combine),y.push(C.fogExp2),y.push(C.sizeAttenuation),y.push(C.morphTargetsCount),y.push(C.morphAttributeCount),y.push(C.numSunLights),y.push(C.numDirLights),y.push(C.numPointLights),y.push(C.numSpotLights),y.push(C.numSpotLightMaps),y.push(C.numHemiLights),y.push(C.numRectAreaLights),y.push(C.numSunLightShadows),y.push(C.numDirLightShadows),y.push(C.numPointLightShadows),y.push(C.numSpotLightShadows),y.push(C.numSpotLightShadowsWithMaps),y.push(C.numLightProbes),y.push(C.shadowMapType),y.push(C.toneMapping),y.push(C.numClippingPlanes),y.push(C.numClipIntersection),y.push(C.depthPacking)}function T(y,C){a.disableAll(),C.instancing&&a.enable(0),C.instancingColor&&a.enable(1),C.instancingMorph&&a.enable(2),C.matcap&&a.enable(3),C.envMap&&a.enable(4),C.normalMapObjectSpace&&a.enable(5),C.normalMapTangentSpace&&a.enable(6),C.clearcoat&&a.enable(7),C.iridescence&&a.enable(8),C.alphaTest&&a.enable(9),C.vertexColors&&a.enable(10),C.vertexAlphas&&a.enable(11),C.vertexUv1s&&a.enable(12),C.vertexUv2s&&a.enable(13),C.vertexUv3s&&a.enable(14),C.vertexTangents&&a.enable(15),C.anisotropy&&a.enable(16),C.alphaHash&&a.enable(17),C.batching&&a.enable(18),C.dispersion&&a.enable(19),C.retroreflection&&a.enable(24),C.batchingColor&&a.enable(20),C.gradientMap&&a.enable(21),C.packedNormalMap&&a.enable(22),C.vertexNormals&&a.enable(23),y.push(a.mask),a.disableAll(),C.fog&&a.enable(0),C.useFog&&a.enable(1),C.flatShading&&a.enable(2),C.logarithmicDepthBuffer&&a.enable(3),C.reversedDepthBuffer&&a.enable(4),C.skinning&&a.enable(5),C.morphTargets&&a.enable(6),C.morphNormals&&a.enable(7),C.morphColors&&a.enable(8),C.premultipliedAlpha&&a.enable(9),C.shadowMapEnabled&&a.enable(10),C.doubleSided&&a.enable(11),C.flipSided&&a.enable(12),C.useDepthPacking&&a.enable(13),C.dithering&&a.enable(14),C.transmission&&a.enable(15),C.sheen&&a.enable(16),C.opaque&&a.enable(17),C.pointsUvs&&a.enable(18),C.decodeVideoTexture&&a.enable(19),C.decodeVideoTextureEmissive&&a.enable(20),C.alphaToCoverage&&a.enable(21),C.numLightProbeGrids>0&&a.enable(22),C.hasPositionAttribute&&a.enable(23),y.push(a.mask)}function I(y){let C=m[y.type],B;if(C){let W=Ki[C];B=I_.clone(W.uniforms)}else B=y.uniforms;return B}function E(y,C){let B=u.get(C);return B!==void 0?++B.usedTimes:(B=new QE(n,C,y,r),l.push(B),u.set(C,B)),B}function w(y){if(--y.usedTimes===0){let C=l.indexOf(y);l[C]=l[l.length-1],l.pop(),u.delete(y.cacheKey),y.destroy()}}function R(y){o.remove(y)}function N(){o.dispose()}return{getParameters:v,getProgramCacheKey:g,getUniforms:I,acquireProgram:E,releaseProgram:w,releaseShaderCache:R,programs:l,dispose:N}}function iT(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,c){n.get(a)[o]=c}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function rT(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function K_(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function j_(){let n=[],e=0,t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(d){let m=0;return d.isInstancedMesh&&(m+=2),d.isSkinnedMesh&&(m+=1),m}function o(d,m,x,v,g,_){let T=n[e];return T===void 0?(T={id:d.id,object:d,geometry:m,material:x,materialVariant:a(d),groupOrder:v,renderOrder:d.renderOrder,z:g,group:_},n[e]=T):(T.id=d.id,T.object=d,T.geometry=m,T.material=x,T.materialVariant=a(d),T.groupOrder=v,T.renderOrder=d.renderOrder,T.z=g,T.group=_),e++,T}function c(d,m,x,v,g,_,T){T.reversedDepth===!0&&(g=-g);let I=o(d,m,x,v,g,_);x.transmission>0?i.push(I):x.transparent===!0?r.push(I):t.push(I)}function l(d,m,x,v,g,_){let T=o(d,m,x,v,g,_);x.transmission>0?i.unshift(T):x.transparent===!0?r.unshift(T):t.unshift(T)}function u(d,m){t.length>1&&t.sort(d||rT),i.length>1&&i.sort(m||K_),r.length>1&&r.sort(m||K_)}function h(){for(let d=e,m=n.length;d<m;d++){let x=n[d];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:c,unshift:l,finish:h,sort:u}}function sT(){let n=new WeakMap;function e(i,r){let s=n.get(i),a;return s===void 0?(a=new j_,n.set(i,[a])):r>=s.length?(a=new j_,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function aT(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new K,color:new Qe};break;case"SpotLight":t={position:new K,direction:new K,color:new Qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new K,color:new Qe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new K,skyColor:new Qe,groundColor:new Qe};break;case"RectAreaLight":t={color:new Qe,position:new K,halfWidth:new K,halfHeight:new K};break}return n[e.id]=t,t}}}function oT(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new dt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new dt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new dt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var lT=0;function cT(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function uT(n){let e=new aT,t=oT(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new K);let r=new K,s=new at,a=new at;function o(l){let u=0,h=0,d=0;for(let Z=0;Z<9;Z++)i.probe[Z].set(0,0,0);let m=0,x=0,v=0,g=0,_=0,T=0,I=0,E=0,w=0,R=0,N=0,y=0,C=0,B=0;l.sort(cT);for(let Z=0,ee=l.length;Z<ee;Z++){let X=l[Z],Q=X.color,oe=X.intensity,re=X.distance,he=null;if(X.shadow&&X.shadow.map&&(X.shadow.map.texture.format===Zr?he=X.shadow.map.texture:he=X.shadow.map.depthTexture||X.shadow.map.texture),X.isAmbientLight)u+=Q.r*oe,h+=Q.g*oe,d+=Q.b*oe;else if(X.isLightProbe){for(let ie=0;ie<9;ie++)i.probe[ie].addScaledVector(X.sh.coefficients[ie],oe);B++}else if(X.isSunLight){let ie=e.get(X);if(ie.color.copy(X.color).multiplyScalar(X.intensity),X.castShadow){let le=X.shadow,de=t.get(X);de.shadowIntensity=le.intensity,de.shadowBias=le.bias,de.shadowNormalBias=le.normalBias,de.shadowRadius=le.radius,de.shadowMapSize.copy(le.mapSize).multiply(le.getFrameExtents()),i.sunShadow[x]=de,i.sunShadowMap[x]=he;let ne=le.getViewportCount();for(let me=0;me<ne;me++)i.sunShadowMatrix[v+me]=le.getMatrix(me),i.sunShadowCascade[v+me]=le._cascadeData[me];v+=ne,x++}i.sun[m]=ie,m++}else if(X.isDirectionalLight){let ie=e.get(X);if(ie.color.copy(X.color).multiplyScalar(X.intensity),X.castShadow){let le=X.shadow,de=t.get(X);de.shadowIntensity=le.intensity,de.shadowBias=le.bias,de.shadowNormalBias=le.normalBias,de.shadowRadius=le.radius,de.shadowMapSize=le.mapSize,i.directionalShadow[g]=de,i.directionalShadowMap[g]=he,i.directionalShadowMatrix[g]=X.shadow.matrix,w++}i.directional[g]=ie,g++}else if(X.isSpotLight){let ie=e.get(X);ie.position.setFromMatrixPosition(X.matrixWorld),ie.color.copy(Q).multiplyScalar(oe),ie.distance=re,ie.coneCos=Math.cos(X.angle),ie.penumbraCos=Math.cos(X.angle*(1-X.penumbra)),ie.decay=X.decay,i.spot[T]=ie;let le=X.shadow;if(X.map&&(i.spotLightMap[y]=X.map,y++,le.updateMatrices(X),X.castShadow&&C++),i.spotLightMatrix[T]=le.matrix,X.castShadow){let de=t.get(X);de.shadowIntensity=le.intensity,de.shadowBias=le.bias,de.shadowNormalBias=le.normalBias,de.shadowRadius=le.radius,de.shadowMapSize=le.mapSize,i.spotShadow[T]=de,i.spotShadowMap[T]=he,N++}T++}else if(X.isRectAreaLight){let ie=e.get(X);ie.color.copy(Q).multiplyScalar(oe),ie.halfWidth.set(X.width*.5,0,0),ie.halfHeight.set(0,X.height*.5,0),i.rectArea[I]=ie,I++}else if(X.isPointLight){let ie=e.get(X);if(ie.color.copy(X.color).multiplyScalar(X.intensity),ie.distance=X.distance,ie.decay=X.decay,X.castShadow){let le=X.shadow,de=t.get(X);de.shadowIntensity=le.intensity,de.shadowBias=le.bias,de.shadowNormalBias=le.normalBias,de.shadowRadius=le.radius,de.shadowMapSize=le.mapSize,de.shadowCameraNear=le.camera.near,de.shadowCameraFar=le.camera.far,i.pointShadow[_]=de,i.pointShadowMap[_]=he,i.pointShadowMatrix[_]=X.shadow.matrix,R++}i.point[_]=ie,_++}else if(X.isHemisphereLight){let ie=e.get(X);ie.skyColor.copy(X.color).multiplyScalar(oe),ie.groundColor.copy(X.groundColor).multiplyScalar(oe),i.hemi[E]=ie,E++}}I>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Re.LTC_FLOAT_1,i.rectAreaLTC2=Re.LTC_FLOAT_2):(i.rectAreaLTC1=Re.LTC_HALF_1,i.rectAreaLTC2=Re.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=h,i.ambient[2]=d;let W=i.hash;(W.sunLength!==m||W.directionalLength!==g||W.pointLength!==_||W.spotLength!==T||W.rectAreaLength!==I||W.hemiLength!==E||W.numSunShadows!==x||W.numDirectionalShadows!==w||W.numPointShadows!==R||W.numSpotShadows!==N||W.numSpotMaps!==y||W.numLightProbes!==B)&&(i.sun.length=m,i.directional.length=g,i.spot.length=T,i.rectArea.length=I,i.point.length=_,i.hemi.length=E,i.sunShadow.length=x,i.sunShadowMap.length=x,i.sunShadowMatrix.length=v,i.sunShadowCascade.length=v,i.directionalShadow.length=w,i.directionalShadowMap.length=w,i.directionalShadowMatrix.length=w,i.pointShadow.length=R,i.pointShadowMap.length=R,i.pointShadowMatrix.length=R,i.spotShadow.length=N,i.spotShadowMap.length=N,i.spotLightMatrix.length=N+y-C,i.spotLightMap.length=y,i.numSpotLightShadowsWithMaps=C,i.numLightProbes=B,W.sunLength=m,W.directionalLength=g,W.pointLength=_,W.spotLength=T,W.rectAreaLength=I,W.hemiLength=E,W.numSunShadows=x,W.numDirectionalShadows=w,W.numPointShadows=R,W.numSpotShadows=N,W.numSpotMaps=y,W.numLightProbes=B,i.version=lT++)}function c(l,u){let h=0,d=0,m=0,x=0,v=0,g=0,_=u.matrixWorldInverse;for(let T=0,I=l.length;T<I;T++){let E=l[T];if(E.isSunLight){let w=i.sun[h];w.direction.setFromMatrixPosition(E.matrixWorld),w.direction.transformDirection(_),h++}else if(E.isDirectionalLight){let w=i.directional[d];w.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(_),d++}else if(E.isSpotLight){let w=i.spot[x];w.position.setFromMatrixPosition(E.matrixWorld),w.position.applyMatrix4(_),w.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(_),x++}else if(E.isRectAreaLight){let w=i.rectArea[v];w.position.setFromMatrixPosition(E.matrixWorld),w.position.applyMatrix4(_),a.identity(),s.copy(E.matrixWorld),s.premultiply(_),a.extractRotation(s),w.halfWidth.set(E.width*.5,0,0),w.halfHeight.set(0,E.height*.5,0),w.halfWidth.applyMatrix4(a),w.halfHeight.applyMatrix4(a),v++}else if(E.isPointLight){let w=i.point[m];w.position.setFromMatrixPosition(E.matrixWorld),w.position.applyMatrix4(_),m++}else if(E.isHemisphereLight){let w=i.hemi[g];w.direction.setFromMatrixPosition(E.matrixWorld),w.direction.transformDirection(_),g++}}}return{setup:o,setupView:c,state:i}}function $_(n){let e=new uT(n),t=[],i=[],r=[];function s(d){h.camera=d,t.length=0,i.length=0,r.length=0}function a(d){t.push(d)}function o(d){i.push(d)}function c(d){r.push(d)}function l(){e.setup(t)}function u(d){e.setupView(t,d)}let h={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:h,setupLights:l,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function hT(n){let e=new WeakMap;function t(r,s=0){let a=e.get(r),o;return a===void 0?(o=new $_(n),e.set(r,[o])):s>=a.length?(o=new $_(n),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}var dT=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,fT=`uniform sampler2D shadow_pass;
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
}`,pT=[new K(1,0,0),new K(-1,0,0),new K(0,1,0),new K(0,-1,0),new K(0,0,1),new K(0,0,-1)],mT=[new K(0,-1,0),new K(0,-1,0),new K(0,0,1),new K(0,0,-1),new K(0,-1,0),new K(0,-1,0)],J_=new at,cl=new K,gf=new K;function gT(n,e,t){let i=new Pa,r=new dt,s=new dt,a=new Dt,o=new Wc,c=new Xc,l={},u=t.maxTextureSize,h={[qi]:Dn,[Dn]:qi,[Un]:Un},d=new ni({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new dt},radius:{value:4}},vertexShader:dT,fragmentShader:fT}),m=d.clone();m.defines.HORIZONTAL_PASS=1;let x=new Mn;x.setAttribute("position",new hn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new cn(x,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Qo;let _=this.type;this.render=function(R,N,y){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||R.length===0)return;this.type===qg&&(qe("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Qo);let C=n.getRenderTarget(),B=n.getActiveCubeFace(),W=n.getActiveMipmapLevel(),Z=n.state;Z.setBlending(Yi),Z.buffers.depth.getReversed()===!0?Z.buffers.color.setClear(0,0,0,0):Z.buffers.color.setClear(1,1,1,1),Z.buffers.depth.setTest(!0),Z.setScissorTest(!1);let ee=_!==this.type;ee&&N.traverse(function(X){X.material&&(Array.isArray(X.material)?X.material.forEach(Q=>Q.needsUpdate=!0):X.material.needsUpdate=!0)});for(let X=0,Q=R.length;X<Q;X++){let oe=R[X],re=oe.shadow;if(re===void 0){qe("WebGLShadowMap:",oe,"has no shadow.");continue}if(re.autoUpdate===!1&&re.needsUpdate===!1)continue;r.copy(re.mapSize);let he=re.getFrameExtents();r.multiply(he),s.copy(re.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/he.x),r.x=s.x*he.x,re.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/he.y),r.y=s.y*he.y,re.mapSize.y=s.y));let ie=n.state.buffers.depth.getReversed();if(re.camera._reversedDepth=ie,re.map===null||ee===!0){if(re.map!==null&&(re.map.depthTexture!==null&&(re.map.depthTexture.dispose(),re.map.depthTexture=null),re.map.dispose()),this.type===Ba){if(oe.isPointLight){qe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}re.map=new zn(r.x,r.y,{format:Zr,type:Pi,minFilter:jt,magFilter:jt,generateMipmaps:!1}),re.map.texture.name=oe.name+".shadowMap",re.map.depthTexture=new Wr(r.x,r.y,ii),re.map.depthTexture.name=oe.name+".shadowMapDepth",re.map.depthTexture.format=Vi,re.map.depthTexture.compareFunction=null,re.map.depthTexture.minFilter=Yt,re.map.depthTexture.magFilter=Yt}else oe.isPointLight?(re.map=new Yu(r.x),re.map.depthTexture=new Gc(r.x,Ci)):(re.map=new zn(r.x,r.y),re.map.depthTexture=new Wr(r.x,r.y,Ci)),re.map.depthTexture.name=oe.name+".shadowMap",re.map.depthTexture.format=Vi,this.type===Qo?(re.map.depthTexture.compareFunction=ie?Hu:Gu,re.map.depthTexture.minFilter=jt,re.map.depthTexture.magFilter=jt):(re.map.depthTexture.compareFunction=null,re.map.depthTexture.minFilter=Yt,re.map.depthTexture.magFilter=Yt);re.camera.updateProjectionMatrix()}re.map.isWebGLCubeRenderTarget!==!0&&(re.map.width!==r.x||re.map.height!==r.y)&&re.map.setSize(r.x,r.y);let le=re.map.isWebGLCubeRenderTarget?6:re.getViewportCount();oe.isPointLight!==!0&&re.updateMatrices(oe,y);for(let de=0;de<le;de++){let ne=re.getCamera(de);if(oe.isPointLight){let me=re.camera,Oe=re.matrix,Pe=oe.distance||me.far;Pe!==me.far&&(me.far=Pe,me.updateProjectionMatrix()),cl.setFromMatrixPosition(oe.matrixWorld),me.position.copy(cl),gf.copy(me.position),gf.add(pT[de]),me.up.copy(mT[de]),me.lookAt(gf),me.updateMatrixWorld(),Oe.makeTranslation(-cl.x,-cl.y,-cl.z),J_.multiplyMatrices(me.projectionMatrix,me.matrixWorldInverse),re._frustum.setFromProjectionMatrix(J_,me.coordinateSystem,me.reversedDepth)}if(re.map.isWebGLCubeRenderTarget)n.setRenderTarget(re.map,de),n.clear();else{de===0&&(n.setRenderTarget(re.map),n.clear());let me=re.getViewport(de);a.set(s.x*me.x,s.y*me.y,s.x*me.z,s.y*me.w),Z.viewport(a)}i=re.getFrustum(de),E(N,y,ne,oe,this.type)}re.isPointLightShadow!==!0&&this.type===Ba&&T(re,y),re.needsUpdate=!1}_=this.type,g.needsUpdate=!1,n.setRenderTarget(C,B,W)};function T(R,N){let y=e.update(v);d.defines.VSM_SAMPLES!==R.blurSamples&&(d.defines.VSM_SAMPLES=R.blurSamples,m.defines.VSM_SAMPLES=R.blurSamples,d.needsUpdate=!0,m.needsUpdate=!0),R.mapPass===null?R.mapPass=new zn(r.x,r.y,{format:Zr,type:Pi}):(R.mapPass.width!==R.map.width||R.mapPass.height!==R.map.height)&&R.mapPass.setSize(R.map.width,R.map.height),d.uniforms.shadow_pass.value=R.map.depthTexture,d.uniforms.resolution.value.set(R.map.width,R.map.height),d.uniforms.radius.value=R.radius,n.setRenderTarget(R.mapPass),n.clear(),n.renderBufferDirect(N,null,y,d,v,null),m.uniforms.shadow_pass.value=R.mapPass.texture,m.uniforms.resolution.value.set(R.map.width,R.map.height),m.uniforms.radius.value=R.radius,n.setRenderTarget(R.map),n.clear(),n.renderBufferDirect(N,null,y,m,v,null)}function I(R,N,y,C){let B=null,W=y.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(W!==void 0)B=W;else if(B=y.isPointLight===!0?c:o,n.localClippingEnabled&&N.clipShadows===!0&&Array.isArray(N.clippingPlanes)&&N.clippingPlanes.length!==0||N.displacementMap&&N.displacementScale!==0||N.alphaMap&&N.alphaTest>0||N.map&&N.alphaTest>0||N.alphaToCoverage===!0){let Z=B.uuid,ee=N.uuid,X=l[Z];X===void 0&&(X={},l[Z]=X);let Q=X[ee];Q===void 0&&(Q=B.clone(),X[ee]=Q,N.addEventListener("dispose",w)),B=Q}if(B.visible=N.visible,B.wireframe=N.wireframe,C===Ba?B.side=N.shadowSide!==null?N.shadowSide:N.side:B.side=N.shadowSide!==null?N.shadowSide:h[N.side],B.alphaMap=N.alphaMap,B.alphaTest=N.alphaToCoverage===!0?.5:N.alphaTest,B.map=N.map,B.clipShadows=N.clipShadows,B.clippingPlanes=N.clippingPlanes,B.clipIntersection=N.clipIntersection,B.displacementMap=N.displacementMap,B.displacementScale=N.displacementScale,B.displacementBias=N.displacementBias,B.wireframeLinewidth=N.wireframeLinewidth,B.linewidth=N.linewidth,y.isPointLight===!0&&B.isMeshDistanceMaterial===!0){let Z=n.properties.get(B);Z.light=y}return B}function E(R,N,y,C,B){if(R.visible===!1)return;if(R.layers.test(N.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&B===Ba)&&(!R.frustumCulled||R.intersectsFrustum(i))){R.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,R.matrixWorld);let ee=e.update(R),X=R.material;if(Array.isArray(X)){let Q=ee.groups;for(let oe=0,re=Q.length;oe<re;oe++){let he=Q[oe],ie=X[he.materialIndex];if(ie&&ie.visible){let le=I(R,ie,C,B);R.onBeforeShadow(n,R,N,y,ee,le,he),n.renderBufferDirect(y,null,ee,le,R,he),R.onAfterShadow(n,R,N,y,ee,le,he)}}}else if(X.visible){let Q=I(R,X,C,B);R.onBeforeShadow(n,R,N,y,ee,Q,null),n.renderBufferDirect(y,null,ee,Q,R,null),R.onAfterShadow(n,R,N,y,ee,Q,null)}}let Z=R.children;for(let ee=0,X=Z.length;ee<X;ee++)E(Z[ee],N,y,C,B)}function w(R){R.target.removeEventListener("dispose",w);for(let y in l){let C=l[y],B=R.target.uuid;B in C&&(C[B].dispose(),delete C[B])}}}function _T(n,e){function t(){let V=!1,Ee=new Dt,ce=null,Se=new Dt(0,0,0,0);return{setMask:function(Ae){ce!==Ae&&!V&&(n.colorMask(Ae,Ae,Ae,Ae),ce=Ae)},setLocked:function(Ae){V=Ae},setClear:function(Ae,pe,We,Be,Ot){Ot===!0&&(Ae*=Be,pe*=Be,We*=Be),Ee.set(Ae,pe,We,Be),Se.equals(Ee)===!1&&(n.clearColor(Ae,pe,We,Be),Se.copy(Ee))},reset:function(){V=!1,ce=null,Se.set(-1,0,0,0)}}}function i(){let V=!1,Ee=!1,ce=null,Se=null,Ae=null;return{setReversed:function(pe){if(Ee!==pe){let We=e.get("EXT_clip_control");pe?We.clipControlEXT(We.LOWER_LEFT_EXT,We.ZERO_TO_ONE_EXT):We.clipControlEXT(We.LOWER_LEFT_EXT,We.NEGATIVE_ONE_TO_ONE_EXT),Ee=pe;let Be=Ae;Ae=null,this.setClear(Be)}},getReversed:function(){return Ee},setTest:function(pe){pe?Y(n.DEPTH_TEST):Me(n.DEPTH_TEST)},setMask:function(pe){ce!==pe&&!V&&(n.depthMask(pe),ce=pe)},setFunc:function(pe){if(Ee&&(pe=w_[pe]),Se!==pe){switch(pe){case Cc:n.depthFunc(n.NEVER);break;case Pc:n.depthFunc(n.ALWAYS);break;case Nc:n.depthFunc(n.LESS);break;case va:n.depthFunc(n.LEQUAL);break;case Lc:n.depthFunc(n.EQUAL);break;case Dc:n.depthFunc(n.GEQUAL);break;case Uc:n.depthFunc(n.GREATER);break;case Oc:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Se=pe}},setLocked:function(pe){V=pe},setClear:function(pe){Ae!==pe&&(Ae=pe,Ee&&(pe=1-pe),n.clearDepth(pe))},reset:function(){V=!1,ce=null,Se=null,Ae=null,Ee=!1}}}function r(){let V=!1,Ee=null,ce=null,Se=null,Ae=null,pe=null,We=null,Be=null,Ot=null;return{setTest:function(At){V||(At?Y(n.STENCIL_TEST):Me(n.STENCIL_TEST))},setMask:function(At){Ee!==At&&!V&&(n.stencilMask(At),Ee=At)},setFunc:function(At,Yn,si){(ce!==At||Se!==Yn||Ae!==si)&&(n.stencilFunc(At,Yn,si),ce=At,Se=Yn,Ae=si)},setOp:function(At,Yn,si){(pe!==At||We!==Yn||Be!==si)&&(n.stencilOp(At,Yn,si),pe=At,We=Yn,Be=si)},setLocked:function(At){V=At},setClear:function(At){Ot!==At&&(n.clearStencil(At),Ot=At)},reset:function(){V=!1,Ee=null,ce=null,Se=null,Ae=null,pe=null,We=null,Be=null,Ot=null}}}let s=new t,a=new i,o=new r,c=new WeakMap,l=new WeakMap,u={},h={},d={},m=new WeakMap,x=[],v=null,g=!1,_=null,T=null,I=null,E=null,w=null,R=null,N=null,y=new Qe(0,0,0),C=0,B=!1,W=null,Z=null,ee=null,X=null,Q=null,oe=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),re=!1,he=0,ie=n.getParameter(n.VERSION);ie.indexOf("WebGL")!==-1?(he=parseFloat(/^WebGL (\d)/.exec(ie)[1]),re=he>=1):ie.indexOf("OpenGL ES")!==-1&&(he=parseFloat(/^OpenGL ES (\d)/.exec(ie)[1]),re=he>=2);let le=null,de={},ne=n.getParameter(n.SCISSOR_BOX),me=n.getParameter(n.VIEWPORT),Oe=new Dt().fromArray(ne),Pe=new Dt().fromArray(me);function et(V,Ee,ce,Se){let Ae=new Uint8Array(4),pe=n.createTexture();n.bindTexture(V,pe),n.texParameteri(V,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(V,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let We=0;We<ce;We++)V===n.TEXTURE_3D||V===n.TEXTURE_2D_ARRAY?n.texImage3D(Ee,0,n.RGBA,1,1,Se,0,n.RGBA,n.UNSIGNED_BYTE,Ae):n.texImage2D(Ee+We,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Ae);return pe}let J={};J[n.TEXTURE_2D]=et(n.TEXTURE_2D,n.TEXTURE_2D,1),J[n.TEXTURE_CUBE_MAP]=et(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),J[n.TEXTURE_2D_ARRAY]=et(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),J[n.TEXTURE_3D]=et(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Y(n.DEPTH_TEST),a.setFunc(va),ft(!1),Pt(Ud),Y(n.CULL_FACE),St(Yi);function Y(V){u[V]!==!0&&(n.enable(V),u[V]=!0)}function Me(V){u[V]!==!1&&(n.disable(V),u[V]=!1)}function Ze(V,Ee){return d[V]!==Ee?(n.bindFramebuffer(V,Ee),d[V]=Ee,V===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=Ee),V===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=Ee),!0):!1}function be(V,Ee){let ce=x,Se=!1;if(V){ce=m.get(Ee),ce===void 0&&(ce=[],m.set(Ee,ce));let Ae=V.textures;if(ce.length!==Ae.length||ce[0]!==n.COLOR_ATTACHMENT0){for(let pe=0,We=Ae.length;pe<We;pe++)ce[pe]=n.COLOR_ATTACHMENT0+pe;ce.length=Ae.length,Se=!0}}else ce[0]!==n.BACK&&(ce[0]=n.BACK,Se=!0);Se&&n.drawBuffers(ce)}function it(V){return v!==V?(n.useProgram(V),v=V,!0):!1}let Gt={[Ps]:n.FUNC_ADD,[Zg]:n.FUNC_SUBTRACT,[Kg]:n.FUNC_REVERSE_SUBTRACT};Gt[jg]=n.MIN,Gt[$g]=n.MAX;let ot={[Jg]:n.ZERO,[Qg]:n.ONE,[e_]:n.SRC_COLOR,[kd]:n.SRC_ALPHA,[a_]:n.SRC_ALPHA_SATURATE,[r_]:n.DST_COLOR,[n_]:n.DST_ALPHA,[t_]:n.ONE_MINUS_SRC_COLOR,[zd]:n.ONE_MINUS_SRC_ALPHA,[s_]:n.ONE_MINUS_DST_COLOR,[i_]:n.ONE_MINUS_DST_ALPHA,[o_]:n.CONSTANT_COLOR,[l_]:n.ONE_MINUS_CONSTANT_COLOR,[c_]:n.CONSTANT_ALPHA,[u_]:n.ONE_MINUS_CONSTANT_ALPHA};function St(V,Ee,ce,Se,Ae,pe,We,Be,Ot,At){if(V===Yi){g===!0&&(Me(n.BLEND),g=!1);return}if(g===!1&&(Y(n.BLEND),g=!0),V!==Yg){if(V!==_||At!==B){if((T!==Ps||w!==Ps)&&(n.blendEquation(n.FUNC_ADD),T=Ps,w=Ps),At)switch(V){case ka:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Od:n.blendFunc(n.ONE,n.ONE);break;case Fd:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Bd:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Je("WebGLState: Invalid blending: ",V);break}else switch(V){case ka:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Od:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Fd:Je("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Bd:Je("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Je("WebGLState: Invalid blending: ",V);break}I=null,E=null,R=null,N=null,y.set(0,0,0),C=0,_=V,B=At}return}Ae=Ae||Ee,pe=pe||ce,We=We||Se,(Ee!==T||Ae!==w)&&(n.blendEquationSeparate(Gt[Ee],Gt[Ae]),T=Ee,w=Ae),(ce!==I||Se!==E||pe!==R||We!==N)&&(n.blendFuncSeparate(ot[ce],ot[Se],ot[pe],ot[We]),I=ce,E=Se,R=pe,N=We),(Be.equals(y)===!1||Ot!==C)&&(n.blendColor(Be.r,Be.g,Be.b,Ot),y.copy(Be),C=Ot),_=V,B=!1}function Rt(V,Ee){V.side===Un?Me(n.CULL_FACE):Y(n.CULL_FACE);let ce=V.side===Dn;Ee&&(ce=!ce),ft(ce),V.blending===ka&&V.transparent===!1?St(Yi):St(V.blending,V.blendEquation,V.blendSrc,V.blendDst,V.blendEquationAlpha,V.blendSrcAlpha,V.blendDstAlpha,V.blendColor,V.blendAlpha,V.premultipliedAlpha),a.setFunc(V.depthFunc),a.setTest(V.depthTest),a.setMask(V.depthWrite),s.setMask(V.colorWrite);let Se=V.stencilWrite;o.setTest(Se),Se&&(o.setMask(V.stencilWriteMask),o.setFunc(V.stencilFunc,V.stencilRef,V.stencilFuncMask),o.setOp(V.stencilFail,V.stencilZFail,V.stencilZPass)),Qt(V.polygonOffset,V.polygonOffsetFactor,V.polygonOffsetUnits),V.alphaToCoverage===!0?Y(n.SAMPLE_ALPHA_TO_COVERAGE):Me(n.SAMPLE_ALPHA_TO_COVERAGE)}function ft(V){W!==V&&(V?n.frontFace(n.CW):n.frontFace(n.CCW),W=V)}function Pt(V){V!==Wg?(Y(n.CULL_FACE),V!==Z&&(V===Ud?n.cullFace(n.BACK):V===Xg?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Me(n.CULL_FACE),Z=V}function Jt(V){V!==ee&&(re&&n.lineWidth(V),ee=V)}function Qt(V,Ee,ce){V?(Y(n.POLYGON_OFFSET_FILL),(X!==Ee||Q!==ce)&&(X=Ee,Q=ce,a.getReversed()&&(Ee=-Ee),n.polygonOffset(Ee,ce))):Me(n.POLYGON_OFFSET_FILL)}function Ut(V){V?Y(n.SCISSOR_TEST):Me(n.SCISSOR_TEST)}function Xt(V){V===void 0&&(V=n.TEXTURE0+oe-1),le!==V&&(n.activeTexture(V),le=V)}function G(V,Ee,ce){ce===void 0&&(le===null?ce=n.TEXTURE0+oe-1:ce=le);let Se=de[ce];Se===void 0&&(Se={type:void 0,texture:void 0},de[ce]=Se),(Se.type!==V||Se.texture!==Ee)&&(le!==ce&&(n.activeTexture(ce),le=ce),n.bindTexture(V,Ee||J[V]),Se.type=V,Se.texture=Ee)}function Fe(){let V=de[le];V!==void 0&&V.type!==void 0&&(n.bindTexture(V.type,null),V.type=void 0,V.texture=void 0)}function gt(){try{n.compressedTexImage2D(...arguments)}catch(V){Je("WebGLState:",V)}}function p(){try{n.compressedTexImage3D(...arguments)}catch(V){Je("WebGLState:",V)}}function f(){try{n.texSubImage2D(...arguments)}catch(V){Je("WebGLState:",V)}}function S(){try{n.texSubImage3D(...arguments)}catch(V){Je("WebGLState:",V)}}function A(){try{n.compressedTexSubImage2D(...arguments)}catch(V){Je("WebGLState:",V)}}function P(){try{n.compressedTexSubImage3D(...arguments)}catch(V){Je("WebGLState:",V)}}function L(){try{n.texStorage2D(...arguments)}catch(V){Je("WebGLState:",V)}}function H(){try{n.texStorage3D(...arguments)}catch(V){Je("WebGLState:",V)}}function D(){try{n.texImage2D(...arguments)}catch(V){Je("WebGLState:",V)}}function F(){try{n.texImage3D(...arguments)}catch(V){Je("WebGLState:",V)}}function ae(V){return h[V]!==void 0?h[V]:n.getParameter(V)}function ge(V,Ee){h[V]!==Ee&&(n.pixelStorei(V,Ee),h[V]=Ee)}function ue(V){Oe.equals(V)===!1&&(n.scissor(V.x,V.y,V.z,V.w),Oe.copy(V))}function fe(V){Pe.equals(V)===!1&&(n.viewport(V.x,V.y,V.z,V.w),Pe.copy(V))}function Ie(V,Ee){let ce=l.get(Ee);ce===void 0&&(ce=new WeakMap,l.set(Ee,ce));let Se=ce.get(V);Se===void 0&&(Se=n.getUniformBlockIndex(Ee,V.name),ce.set(V,Se))}function De(V,Ee){let Se=l.get(Ee).get(V);c.get(Ee)!==Se&&(n.uniformBlockBinding(Ee,Se,V.__bindingPointIndex),c.set(Ee,Se))}function tt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},h={},le=null,de={},d={},m=new WeakMap,x=[],v=null,g=!1,_=null,T=null,I=null,E=null,w=null,R=null,N=null,y=new Qe(0,0,0),C=0,B=!1,W=null,Z=null,ee=null,X=null,Q=null,Oe.set(0,0,n.canvas.width,n.canvas.height),Pe.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:Y,disable:Me,bindFramebuffer:Ze,drawBuffers:be,useProgram:it,setBlending:St,setMaterial:Rt,setFlipSided:ft,setCullFace:Pt,setLineWidth:Jt,setPolygonOffset:Qt,setScissorTest:Ut,activeTexture:Xt,bindTexture:G,unbindTexture:Fe,compressedTexImage2D:gt,compressedTexImage3D:p,texImage2D:D,texImage3D:F,pixelStorei:ge,getParameter:ae,updateUBOMapping:Ie,uniformBlockBinding:De,texStorage2D:L,texStorage3D:H,texSubImage2D:f,texSubImage3D:S,compressedTexSubImage2D:A,compressedTexSubImage3D:P,scissor:ue,viewport:fe,reset:tt}}function xT(n,e,t,i,r,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new dt,u=new WeakMap,h=new Set,d,m=new WeakMap,x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(p,f){return x?new OffscreenCanvas(p,f):ba("canvas")}function g(p,f,S){let A=1,P=gt(p);if((P.width>S||P.height>S)&&(A=S/Math.max(P.width,P.height)),A<1)if(typeof HTMLImageElement<"u"&&p instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&p instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&p instanceof ImageBitmap||typeof VideoFrame<"u"&&p instanceof VideoFrame){let L=Math.floor(A*P.width),H=Math.floor(A*P.height);d===void 0&&(d=v(L,H));let D=f?v(L,H):d;return D.width=L,D.height=H,D.getContext("2d").drawImage(p,0,0,L,H),qe("WebGLRenderer: Texture has been resized from ("+P.width+"x"+P.height+") to ("+L+"x"+H+")."),D}else return"data"in p&&qe("WebGLRenderer: Image in DataTexture is too big ("+P.width+"x"+P.height+")."),p;return p}function _(p){return p.generateMipmaps}function T(p){n.generateMipmap(p)}function I(p){return p.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:p.isWebGL3DRenderTarget?n.TEXTURE_3D:p.isWebGLArrayRenderTarget||p.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function E(p,f,S,A,P,L=!1){if(p!==null){if(n[p]!==void 0)return n[p];qe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+p+"'")}let H;A&&(H=e.get("EXT_texture_norm16"),H||qe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let D=f;if(f===n.RED&&(S===n.FLOAT&&(D=n.R32F),S===n.HALF_FLOAT&&(D=n.R16F),S===n.UNSIGNED_BYTE&&(D=n.R8),S===n.UNSIGNED_SHORT&&H&&(D=H.R16_EXT),S===n.SHORT&&H&&(D=H.R16_SNORM_EXT)),f===n.RED_INTEGER&&(S===n.UNSIGNED_BYTE&&(D=n.R8UI),S===n.UNSIGNED_SHORT&&(D=n.R16UI),S===n.UNSIGNED_INT&&(D=n.R32UI),S===n.BYTE&&(D=n.R8I),S===n.SHORT&&(D=n.R16I),S===n.INT&&(D=n.R32I)),f===n.RG&&(S===n.FLOAT&&(D=n.RG32F),S===n.HALF_FLOAT&&(D=n.RG16F),S===n.UNSIGNED_BYTE&&(D=n.RG8),S===n.UNSIGNED_SHORT&&H&&(D=H.RG16_EXT),S===n.SHORT&&H&&(D=H.RG16_SNORM_EXT)),f===n.RG_INTEGER&&(S===n.UNSIGNED_BYTE&&(D=n.RG8UI),S===n.UNSIGNED_SHORT&&(D=n.RG16UI),S===n.UNSIGNED_INT&&(D=n.RG32UI),S===n.BYTE&&(D=n.RG8I),S===n.SHORT&&(D=n.RG16I),S===n.INT&&(D=n.RG32I)),f===n.RGB_INTEGER&&(S===n.UNSIGNED_BYTE&&(D=n.RGB8UI),S===n.UNSIGNED_SHORT&&(D=n.RGB16UI),S===n.UNSIGNED_INT&&(D=n.RGB32UI),S===n.BYTE&&(D=n.RGB8I),S===n.SHORT&&(D=n.RGB16I),S===n.INT&&(D=n.RGB32I)),f===n.RGBA_INTEGER&&(S===n.UNSIGNED_BYTE&&(D=n.RGBA8UI),S===n.UNSIGNED_SHORT&&(D=n.RGBA16UI),S===n.UNSIGNED_INT&&(D=n.RGBA32UI),S===n.BYTE&&(D=n.RGBA8I),S===n.SHORT&&(D=n.RGBA16I),S===n.INT&&(D=n.RGBA32I)),f===n.RGB&&(S===n.UNSIGNED_SHORT&&H&&(D=H.RGB16_EXT),S===n.SHORT&&H&&(D=H.RGB16_SNORM_EXT),S===n.UNSIGNED_INT_5_9_9_9_REV&&(D=n.RGB9_E5),S===n.UNSIGNED_INT_10F_11F_11F_REV&&(D=n.R11F_G11F_B10F)),f===n.RGBA){let F=L?Co:xt.getTransfer(P);S===n.FLOAT&&(D=n.RGBA32F),S===n.HALF_FLOAT&&(D=n.RGBA16F),S===n.UNSIGNED_BYTE&&(D=F===Ct?n.SRGB8_ALPHA8:n.RGBA8),S===n.UNSIGNED_SHORT&&H&&(D=H.RGBA16_EXT),S===n.SHORT&&H&&(D=H.RGBA16_SNORM_EXT),S===n.UNSIGNED_SHORT_4_4_4_4&&(D=n.RGBA4),S===n.UNSIGNED_SHORT_5_5_5_1&&(D=n.RGB5_A1)}return(D===n.R16F||D===n.R32F||D===n.RG16F||D===n.RG32F||D===n.RGBA16F||D===n.RGBA32F)&&e.get("EXT_color_buffer_float"),D}function w(p,f){let S;return p?f===null||f===Ci||f===Ga?S=n.DEPTH24_STENCIL8:f===ii?S=n.DEPTH32F_STENCIL8:f===Va&&(S=n.DEPTH24_STENCIL8,qe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):f===null||f===Ci||f===Ga?S=n.DEPTH_COMPONENT24:f===ii?S=n.DEPTH_COMPONENT32F:f===Va&&(S=n.DEPTH_COMPONENT16),S}function R(p,f){return _(p)===!0||p.isFramebufferTexture&&p.minFilter!==Yt&&p.minFilter!==jt?Math.log2(Math.max(f.width,f.height))+1:p.mipmaps!==void 0&&p.mipmaps.length>0?p.mipmaps.length:p.isCompressedTexture&&Array.isArray(p.image)?f.mipmaps.length:1}function N(p){let f=p.target;f.removeEventListener("dispose",N),C(f),f.isVideoTexture&&u.delete(f),f.isHTMLTexture&&h.delete(f)}function y(p){let f=p.target;f.removeEventListener("dispose",y),W(f)}function C(p){let f=i.get(p);if(f.__webglInit===void 0)return;let S=p.source,A=m.get(S);if(A){let P=A[f.__cacheKey];P.usedTimes--,P.usedTimes===0&&B(p),Object.keys(A).length===0&&m.delete(S)}i.remove(p)}function B(p){let f=i.get(p);n.deleteTexture(f.__webglTexture);let S=p.source,A=m.get(S);delete A[f.__cacheKey],a.memory.textures--}function W(p){let f=i.get(p);if(p.depthTexture&&(p.depthTexture.dispose(),i.remove(p.depthTexture)),p.isWebGLCubeRenderTarget)for(let A=0;A<6;A++){if(Array.isArray(f.__webglFramebuffer[A]))for(let P=0;P<f.__webglFramebuffer[A].length;P++)n.deleteFramebuffer(f.__webglFramebuffer[A][P]);else n.deleteFramebuffer(f.__webglFramebuffer[A]);f.__webglDepthbuffer&&n.deleteRenderbuffer(f.__webglDepthbuffer[A])}else{if(Array.isArray(f.__webglFramebuffer))for(let A=0;A<f.__webglFramebuffer.length;A++)n.deleteFramebuffer(f.__webglFramebuffer[A]);else n.deleteFramebuffer(f.__webglFramebuffer);if(f.__webglDepthbuffer&&n.deleteRenderbuffer(f.__webglDepthbuffer),f.__webglMultisampledFramebuffer&&n.deleteFramebuffer(f.__webglMultisampledFramebuffer),f.__webglColorRenderbuffer)for(let A=0;A<f.__webglColorRenderbuffer.length;A++)f.__webglColorRenderbuffer[A]&&n.deleteRenderbuffer(f.__webglColorRenderbuffer[A]);f.__webglDepthRenderbuffer&&n.deleteRenderbuffer(f.__webglDepthRenderbuffer)}let S=p.textures;for(let A=0,P=S.length;A<P;A++){let L=i.get(S[A]);L.__webglTexture&&(n.deleteTexture(L.__webglTexture),a.memory.textures--),i.remove(S[A])}i.remove(p)}let Z=0;function ee(){Z=0}function X(){return Z}function Q(p){Z=p}function oe(){let p=Z;return p>=r.maxTextures&&qe("WebGLTextures: Trying to use "+(p+1)+" texture units while this GPU supports only "+r.maxTextures),Z+=1,p}function re(p){let f=[];return f.push(p.wrapS),f.push(p.wrapT),f.push(p.wrapR||0),f.push(p.magFilter),f.push(p.minFilter),f.push(p.anisotropy),f.push(p.internalFormat),f.push(p.format),f.push(p.type),f.push(p.generateMipmaps),f.push(p.premultiplyAlpha),f.push(p.flipY),f.push(p.unpackAlignment),f.push(p.colorSpace),f.join()}function he(p,f){let S=i.get(p);if(p.isVideoTexture&&G(p),p.isRenderTargetTexture===!1&&p.isExternalTexture!==!0&&p.version>0&&S.__version!==p.version){let A=p.image;if(A===null)qe("WebGLRenderer: Texture marked for update but no image data found.");else if(A.complete===!1)qe("WebGLRenderer: Texture marked for update but image is incomplete");else{Me(S,p,f);return}}else p.isExternalTexture&&(S.__webglTexture=p.sourceTexture?p.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,S.__webglTexture,n.TEXTURE0+f)}function ie(p,f){let S=i.get(p);if(p.isRenderTargetTexture===!1&&p.version>0&&S.__version!==p.version){Me(S,p,f);return}else p.isExternalTexture&&(S.__webglTexture=p.sourceTexture?p.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,S.__webglTexture,n.TEXTURE0+f)}function le(p,f){let S=i.get(p);if(p.isRenderTargetTexture===!1&&p.version>0&&S.__version!==p.version){Me(S,p,f);return}t.bindTexture(n.TEXTURE_3D,S.__webglTexture,n.TEXTURE0+f)}function de(p,f){let S=i.get(p);if(p.isCubeDepthTexture!==!0&&p.version>0&&S.__version!==p.version){Ze(S,p,f);return}t.bindTexture(n.TEXTURE_CUBE_MAP,S.__webglTexture,n.TEXTURE0+f)}let ne={[Gr]:n.REPEAT,[pi]:n.CLAMP_TO_EDGE,[ya]:n.MIRRORED_REPEAT},me={[Yt]:n.NEAREST,[iu]:n.NEAREST_MIPMAP_NEAREST,[Ls]:n.NEAREST_MIPMAP_LINEAR,[jt]:n.LINEAR,[za]:n.LINEAR_MIPMAP_NEAREST,[Ii]:n.LINEAR_MIPMAP_LINEAR},Oe={[x_]:n.NEVER,[M_]:n.ALWAYS,[v_]:n.LESS,[Gu]:n.LEQUAL,[y_]:n.EQUAL,[Hu]:n.GEQUAL,[S_]:n.GREATER,[b_]:n.NOTEQUAL};function Pe(p,f){if(f.type===ii&&e.has("OES_texture_float_linear")===!1&&(f.magFilter===jt||f.magFilter===za||f.magFilter===Ls||f.magFilter===Ii||f.minFilter===jt||f.minFilter===za||f.minFilter===Ls||f.minFilter===Ii)&&qe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(p,n.TEXTURE_WRAP_S,ne[f.wrapS]),n.texParameteri(p,n.TEXTURE_WRAP_T,ne[f.wrapT]),(p===n.TEXTURE_3D||p===n.TEXTURE_2D_ARRAY)&&n.texParameteri(p,n.TEXTURE_WRAP_R,ne[f.wrapR]),n.texParameteri(p,n.TEXTURE_MAG_FILTER,me[f.magFilter]),n.texParameteri(p,n.TEXTURE_MIN_FILTER,me[f.minFilter]),f.compareFunction&&(n.texParameteri(p,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(p,n.TEXTURE_COMPARE_FUNC,Oe[f.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(f.magFilter===Yt||f.minFilter!==Ls&&f.minFilter!==Ii||f.type===ii&&e.has("OES_texture_float_linear")===!1)return;if(f.anisotropy>1||i.get(f).__currentAnisotropy){let S=e.get("EXT_texture_filter_anisotropic");n.texParameterf(p,S.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(f.anisotropy,r.getMaxAnisotropy())),i.get(f).__currentAnisotropy=f.anisotropy}}}function et(p,f){let S=!1;p.__webglInit===void 0&&(p.__webglInit=!0,f.addEventListener("dispose",N));let A=f.source,P=m.get(A);P===void 0&&(P={},m.set(A,P));let L=re(f);if(L!==p.__cacheKey){P[L]===void 0&&(P[L]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,S=!0),P[L].usedTimes++;let H=P[p.__cacheKey];H!==void 0&&(P[p.__cacheKey].usedTimes--,H.usedTimes===0&&B(f)),p.__cacheKey=L,p.__webglTexture=P[L].texture}return S}function J(p,f,S){return Math.floor(Math.floor(p/S)/f)}function Y(p,f,S,A){let L=p.updateRanges;if(L.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,f.width,f.height,S,A,f.data);else{L.sort((ge,ue)=>ge.start-ue.start);let H=0;for(let ge=1;ge<L.length;ge++){let ue=L[H],fe=L[ge],Ie=ue.start+ue.count,De=J(fe.start,f.width,4),tt=J(ue.start,f.width,4);fe.start<=Ie+1&&De===tt&&J(fe.start+fe.count-1,f.width,4)===De?ue.count=Math.max(ue.count,fe.start+fe.count-ue.start):(++H,L[H]=fe)}L.length=H+1;let D=t.getParameter(n.UNPACK_ROW_LENGTH),F=t.getParameter(n.UNPACK_SKIP_PIXELS),ae=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,f.width);for(let ge=0,ue=L.length;ge<ue;ge++){let fe=L[ge],Ie=Math.floor(fe.start/4),De=Math.ceil(fe.count/4),tt=Ie%f.width,V=Math.floor(Ie/f.width),Ee=De,ce=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,tt),t.pixelStorei(n.UNPACK_SKIP_ROWS,V),t.texSubImage2D(n.TEXTURE_2D,0,tt,V,Ee,ce,S,A,f.data)}p.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,D),t.pixelStorei(n.UNPACK_SKIP_PIXELS,F),t.pixelStorei(n.UNPACK_SKIP_ROWS,ae)}}function Me(p,f,S){let A=n.TEXTURE_2D;(f.isDataArrayTexture||f.isCompressedArrayTexture)&&(A=n.TEXTURE_2D_ARRAY),f.isData3DTexture&&(A=n.TEXTURE_3D);let P=et(p,f),L=f.source;t.bindTexture(A,p.__webglTexture,n.TEXTURE0+S);let H=i.get(L);if(L.version!==H.__version||P===!0){if(t.activeTexture(n.TEXTURE0+S),(typeof ImageBitmap<"u"&&f.image instanceof ImageBitmap)===!1){let ce=xt.getPrimaries(xt.workingColorSpace),Se=f.colorSpace===Sr?null:xt.getPrimaries(f.colorSpace),Ae=f.colorSpace===Sr||ce===Se?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,f.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,f.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae)}t.pixelStorei(n.UNPACK_ALIGNMENT,f.unpackAlignment);let F=g(f.image,!1,r.maxTextureSize);F=Fe(f,F);let ae=s.convert(f.format,f.colorSpace),ge=s.convert(f.type),ue=E(f.internalFormat,ae,ge,f.normalized,f.colorSpace,f.isVideoTexture);Pe(A,f);let fe,Ie=f.mipmaps,De=f.isVideoTexture!==!0,tt=H.__version===void 0||P===!0,V=L.dataReady,Ee=R(f,F);if(f.isDepthTexture)ue=w(f.format===Yr,f.type),tt&&(De?t.texStorage2D(n.TEXTURE_2D,1,ue,F.width,F.height):t.texImage2D(n.TEXTURE_2D,0,ue,F.width,F.height,0,ae,ge,null));else if(f.isDataTexture)if(Ie.length>0){De&&tt&&t.texStorage2D(n.TEXTURE_2D,Ee,ue,Ie[0].width,Ie[0].height);for(let ce=0,Se=Ie.length;ce<Se;ce++)fe=Ie[ce],De?V&&t.texSubImage2D(n.TEXTURE_2D,ce,0,0,fe.width,fe.height,ae,ge,fe.data):t.texImage2D(n.TEXTURE_2D,ce,ue,fe.width,fe.height,0,ae,ge,fe.data);f.generateMipmaps=!1}else De?(tt&&t.texStorage2D(n.TEXTURE_2D,Ee,ue,F.width,F.height),V&&Y(f,F,ae,ge)):t.texImage2D(n.TEXTURE_2D,0,ue,F.width,F.height,0,ae,ge,F.data);else if(f.isCompressedTexture)if(f.isCompressedArrayTexture){De&&tt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ee,ue,Ie[0].width,Ie[0].height,F.depth);for(let ce=0,Se=Ie.length;ce<Se;ce++)if(fe=Ie[ce],f.format!==ri)if(ae!==null)if(De){if(V)if(f.layerUpdates.size>0){let Ae=uf(fe.width,fe.height,f.format,f.type);for(let pe of f.layerUpdates){let We=fe.data.subarray(pe*Ae/fe.data.BYTES_PER_ELEMENT,(pe+1)*Ae/fe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ce,0,0,pe,fe.width,fe.height,1,ae,We)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ce,0,0,0,fe.width,fe.height,F.depth,ae,fe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ce,ue,fe.width,fe.height,F.depth,0,fe.data,0,0);else qe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else De?V&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ce,0,0,0,fe.width,fe.height,F.depth,ae,ge,fe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ce,ue,fe.width,fe.height,F.depth,0,ae,ge,fe.data);f.layerUpdates.size>0&&f.clearLayerUpdates()}else{De&&tt&&t.texStorage2D(n.TEXTURE_2D,Ee,ue,Ie[0].width,Ie[0].height);for(let ce=0,Se=Ie.length;ce<Se;ce++)fe=Ie[ce],f.format!==ri?ae!==null?De?V&&t.compressedTexSubImage2D(n.TEXTURE_2D,ce,0,0,fe.width,fe.height,ae,fe.data):t.compressedTexImage2D(n.TEXTURE_2D,ce,ue,fe.width,fe.height,0,fe.data):qe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):De?V&&t.texSubImage2D(n.TEXTURE_2D,ce,0,0,fe.width,fe.height,ae,ge,fe.data):t.texImage2D(n.TEXTURE_2D,ce,ue,fe.width,fe.height,0,ae,ge,fe.data)}else if(f.isDataArrayTexture)if(De){if(tt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ee,ue,F.width,F.height,F.depth),V)if(f.layerUpdates.size>0){let ce=uf(F.width,F.height,f.format,f.type);for(let Se of f.layerUpdates){let Ae=F.data.subarray(Se*ce/F.data.BYTES_PER_ELEMENT,(Se+1)*ce/F.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Se,F.width,F.height,1,ae,ge,Ae)}f.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,F.width,F.height,F.depth,ae,ge,F.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,ue,F.width,F.height,F.depth,0,ae,ge,F.data);else if(f.isData3DTexture)De?(tt&&t.texStorage3D(n.TEXTURE_3D,Ee,ue,F.width,F.height,F.depth),V&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,F.width,F.height,F.depth,ae,ge,F.data)):t.texImage3D(n.TEXTURE_3D,0,ue,F.width,F.height,F.depth,0,ae,ge,F.data);else if(f.isFramebufferTexture){if(tt)if(De)t.texStorage2D(n.TEXTURE_2D,Ee,ue,F.width,F.height);else{let ce=F.width,Se=F.height;for(let Ae=0;Ae<Ee;Ae++)t.texImage2D(n.TEXTURE_2D,Ae,ue,ce,Se,0,ae,ge,null),ce>>=1,Se>>=1}}else if(f.isHTMLTexture){if("texElementImage2D"in n){let ce=n.canvas;if(ce.hasAttribute("layoutsubtree")||ce.setAttribute("layoutsubtree","true"),F.parentNode!==ce){ce.appendChild(F),h.add(f),ce.onpaint=Se=>{let Ae=Se.changedElements;for(let pe of h)Ae.includes(pe.image)&&(pe.needsUpdate=!0)},ce.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,F);else{let Ae=n.RGBA,pe=n.RGBA,We=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Ae,pe,We,F)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Ie.length>0){if(De&&tt){let ce=gt(Ie[0]);t.texStorage2D(n.TEXTURE_2D,Ee,ue,ce.width,ce.height)}for(let ce=0,Se=Ie.length;ce<Se;ce++)fe=Ie[ce],De?V&&t.texSubImage2D(n.TEXTURE_2D,ce,0,0,ae,ge,fe):t.texImage2D(n.TEXTURE_2D,ce,ue,ae,ge,fe);f.generateMipmaps=!1}else if(De){if(tt){let ce=gt(F);t.texStorage2D(n.TEXTURE_2D,Ee,ue,ce.width,ce.height)}V&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ae,ge,F)}else t.texImage2D(n.TEXTURE_2D,0,ue,ae,ge,F);_(f)&&T(A),H.__version=L.version,f.onUpdate&&f.onUpdate(f)}p.__version=f.version}function Ze(p,f,S){if(f.image.length!==6)return;let A=et(p,f),P=f.source;t.bindTexture(n.TEXTURE_CUBE_MAP,p.__webglTexture,n.TEXTURE0+S);let L=i.get(P);if(P.version!==L.__version||A===!0){t.activeTexture(n.TEXTURE0+S);let H=xt.getPrimaries(xt.workingColorSpace),D=f.colorSpace===Sr?null:xt.getPrimaries(f.colorSpace),F=f.colorSpace===Sr||H===D?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,f.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,f.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,f.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,F);let ae=f.isCompressedTexture||f.image[0].isCompressedTexture,ge=f.image[0]&&f.image[0].isDataTexture,ue=[];for(let pe=0;pe<6;pe++)!ae&&!ge?ue[pe]=g(f.image[pe],!0,r.maxCubemapSize):ue[pe]=ge?f.image[pe].image:f.image[pe],ue[pe]=Fe(f,ue[pe]);let fe=ue[0],Ie=s.convert(f.format,f.colorSpace),De=s.convert(f.type),tt=E(f.internalFormat,Ie,De,f.normalized,f.colorSpace),V=f.isVideoTexture!==!0,Ee=L.__version===void 0||A===!0,ce=P.dataReady,Se=R(f,fe);Pe(n.TEXTURE_CUBE_MAP,f);let Ae;if(ae){V&&Ee&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Se,tt,fe.width,fe.height);for(let pe=0;pe<6;pe++){Ae=ue[pe].mipmaps;for(let We=0;We<Ae.length;We++){let Be=Ae[We];f.format!==ri?Ie!==null?V?ce&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,We,0,0,Be.width,Be.height,Ie,Be.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,We,tt,Be.width,Be.height,0,Be.data):qe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):V?ce&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,We,0,0,Be.width,Be.height,Ie,De,Be.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,We,tt,Be.width,Be.height,0,Ie,De,Be.data)}}}else{if(Ae=f.mipmaps,V&&Ee){Ae.length>0&&Se++;let pe=gt(ue[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Se,tt,pe.width,pe.height)}for(let pe=0;pe<6;pe++)if(ge){V?ce&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,0,0,ue[pe].width,ue[pe].height,Ie,De,ue[pe].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,tt,ue[pe].width,ue[pe].height,0,Ie,De,ue[pe].data);for(let We=0;We<Ae.length;We++){let Ot=Ae[We].image[pe].image;V?ce&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,We+1,0,0,Ot.width,Ot.height,Ie,De,Ot.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,We+1,tt,Ot.width,Ot.height,0,Ie,De,Ot.data)}}else{V?ce&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,0,0,Ie,De,ue[pe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,tt,Ie,De,ue[pe]);for(let We=0;We<Ae.length;We++){let Be=Ae[We];V?ce&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,We+1,0,0,Ie,De,Be.image[pe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,We+1,tt,Ie,De,Be.image[pe])}}}_(f)&&T(n.TEXTURE_CUBE_MAP),L.__version=P.version,f.onUpdate&&f.onUpdate(f)}p.__version=f.version}function be(p,f,S,A,P,L){let H=s.convert(S.format,S.colorSpace),D=s.convert(S.type),F=E(S.internalFormat,H,D,S.normalized,S.colorSpace),ae=i.get(f),ge=i.get(S);if(ge.__renderTarget=f,!ae.__hasExternalTextures){let ue=Math.max(1,f.width>>L),fe=Math.max(1,f.height>>L);P===n.TEXTURE_3D||P===n.TEXTURE_2D_ARRAY?t.texImage3D(P,L,F,ue,fe,f.depth,0,H,D,null):t.texImage2D(P,L,F,ue,fe,0,H,D,null)}t.bindFramebuffer(n.FRAMEBUFFER,p),Xt(f)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,A,P,ge.__webglTexture,0,Ut(f)):(P===n.TEXTURE_2D||P>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&P<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,A,P,ge.__webglTexture,L),t.bindFramebuffer(n.FRAMEBUFFER,null)}function it(p,f,S){if(n.bindRenderbuffer(n.RENDERBUFFER,p),f.depthBuffer){let A=f.depthTexture,P=A&&A.isDepthTexture?A.type:null,L=w(f.stencilBuffer,P),H=f.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Xt(f)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ut(f),L,f.width,f.height):S?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ut(f),L,f.width,f.height):n.renderbufferStorage(n.RENDERBUFFER,L,f.width,f.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,H,n.RENDERBUFFER,p)}else{let A=f.textures;for(let P=0;P<A.length;P++){let L=A[P],H=s.convert(L.format,L.colorSpace),D=s.convert(L.type),F=E(L.internalFormat,H,D,L.normalized,L.colorSpace);Xt(f)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ut(f),F,f.width,f.height):S?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ut(f),F,f.width,f.height):n.renderbufferStorage(n.RENDERBUFFER,F,f.width,f.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Gt(p,f,S){let A=f.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,p),!(f.depthTexture&&f.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let P=i.get(f.depthTexture);if(P.__renderTarget=f,(!P.__webglTexture||f.depthTexture.image.width!==f.width||f.depthTexture.image.height!==f.height)&&(f.depthTexture.image.width=f.width,f.depthTexture.image.height=f.height,f.depthTexture.needsUpdate=!0),A){if(P.__webglInit===void 0&&(P.__webglInit=!0,f.depthTexture.addEventListener("dispose",N)),P.__webglTexture===void 0){P.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,P.__webglTexture),Pe(n.TEXTURE_CUBE_MAP,f.depthTexture);let ae=s.convert(f.depthTexture.format),ge=s.convert(f.depthTexture.type),ue;f.depthTexture.format===Vi?ue=n.DEPTH_COMPONENT24:f.depthTexture.format===Yr&&(ue=n.DEPTH24_STENCIL8);for(let fe=0;fe<6;fe++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,ue,f.width,f.height,0,ae,ge,null)}}else he(f.depthTexture,0);let L=P.__webglTexture,H=Ut(f),D=A?n.TEXTURE_CUBE_MAP_POSITIVE_X+S:n.TEXTURE_2D,F=f.depthTexture.format===Yr?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(f.depthTexture.format===Vi)Xt(f)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,F,D,L,0,H):n.framebufferTexture2D(n.FRAMEBUFFER,F,D,L,0);else if(f.depthTexture.format===Yr)Xt(f)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,F,D,L,0,H):n.framebufferTexture2D(n.FRAMEBUFFER,F,D,L,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ot(p){let f=i.get(p),S=p.isWebGLCubeRenderTarget===!0;if(f.__boundDepthTexture!==p.depthTexture){let A=p.depthTexture;if(f.__depthDisposeCallback&&f.__depthDisposeCallback(),A){let P=()=>{delete f.__boundDepthTexture,delete f.__depthDisposeCallback,A.removeEventListener("dispose",P)};A.addEventListener("dispose",P),f.__depthDisposeCallback=P}f.__boundDepthTexture=A}if(p.depthTexture&&!f.__autoAllocateDepthBuffer)if(S)for(let A=0;A<6;A++)Gt(f.__webglFramebuffer[A],p,A);else{let A=p.texture.mipmaps;A&&A.length>0?Gt(f.__webglFramebuffer[0],p,0):Gt(f.__webglFramebuffer,p,0)}else if(S){f.__webglDepthbuffer=[];for(let A=0;A<6;A++)if(t.bindFramebuffer(n.FRAMEBUFFER,f.__webglFramebuffer[A]),f.__webglDepthbuffer[A]===void 0)f.__webglDepthbuffer[A]=n.createRenderbuffer(),it(f.__webglDepthbuffer[A],p,!1);else{let P=p.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,L=f.__webglDepthbuffer[A];n.bindRenderbuffer(n.RENDERBUFFER,L),n.framebufferRenderbuffer(n.FRAMEBUFFER,P,n.RENDERBUFFER,L)}}else{let A=p.texture.mipmaps;if(A&&A.length>0?t.bindFramebuffer(n.FRAMEBUFFER,f.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,f.__webglFramebuffer),f.__webglDepthbuffer===void 0)f.__webglDepthbuffer=n.createRenderbuffer(),it(f.__webglDepthbuffer,p,!1);else{let P=p.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,L=f.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,L),n.framebufferRenderbuffer(n.FRAMEBUFFER,P,n.RENDERBUFFER,L)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function St(p,f,S){let A=i.get(p);f!==void 0&&be(A.__webglFramebuffer,p,p.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),S!==void 0&&ot(p)}function Rt(p){let f=p.texture,S=i.get(p),A=i.get(f);p.addEventListener("dispose",y);let P=p.textures,L=p.isWebGLCubeRenderTarget===!0,H=P.length>1;if(H||(A.__webglTexture===void 0&&(A.__webglTexture=n.createTexture()),A.__version=f.version,a.memory.textures++),L){S.__webglFramebuffer=[];for(let D=0;D<6;D++)if(f.mipmaps&&f.mipmaps.length>0){S.__webglFramebuffer[D]=[];for(let F=0;F<f.mipmaps.length;F++)S.__webglFramebuffer[D][F]=n.createFramebuffer()}else S.__webglFramebuffer[D]=n.createFramebuffer()}else{if(f.mipmaps&&f.mipmaps.length>0){S.__webglFramebuffer=[];for(let D=0;D<f.mipmaps.length;D++)S.__webglFramebuffer[D]=n.createFramebuffer()}else S.__webglFramebuffer=n.createFramebuffer();if(H)for(let D=0,F=P.length;D<F;D++){let ae=i.get(P[D]);ae.__webglTexture===void 0&&(ae.__webglTexture=n.createTexture(),a.memory.textures++)}if(p.samples>0&&Xt(p)===!1){S.__webglMultisampledFramebuffer=n.createFramebuffer(),S.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,S.__webglMultisampledFramebuffer);for(let D=0;D<P.length;D++){let F=P[D];S.__webglColorRenderbuffer[D]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,S.__webglColorRenderbuffer[D]);let ae=s.convert(F.format,F.colorSpace),ge=s.convert(F.type),ue=E(F.internalFormat,ae,ge,F.normalized,F.colorSpace,p.isXRRenderTarget===!0),fe=Ut(p);n.renderbufferStorageMultisample(n.RENDERBUFFER,fe,ue,p.width,p.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+D,n.RENDERBUFFER,S.__webglColorRenderbuffer[D])}n.bindRenderbuffer(n.RENDERBUFFER,null),p.depthBuffer&&(S.__webglDepthRenderbuffer=n.createRenderbuffer(),it(S.__webglDepthRenderbuffer,p,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(L){t.bindTexture(n.TEXTURE_CUBE_MAP,A.__webglTexture),Pe(n.TEXTURE_CUBE_MAP,f);for(let D=0;D<6;D++)if(f.mipmaps&&f.mipmaps.length>0)for(let F=0;F<f.mipmaps.length;F++)be(S.__webglFramebuffer[D][F],p,f,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+D,F);else be(S.__webglFramebuffer[D],p,f,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+D,0);_(f)&&T(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(H){for(let D=0,F=P.length;D<F;D++){let ae=P[D],ge=i.get(ae),ue=n.TEXTURE_2D;(p.isWebGL3DRenderTarget||p.isWebGLArrayRenderTarget)&&(ue=p.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ue,ge.__webglTexture),Pe(ue,ae),be(S.__webglFramebuffer,p,ae,n.COLOR_ATTACHMENT0+D,ue,0),_(ae)&&T(ue)}t.unbindTexture()}else{let D=n.TEXTURE_2D;if((p.isWebGL3DRenderTarget||p.isWebGLArrayRenderTarget)&&(D=p.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(D,A.__webglTexture),Pe(D,f),f.mipmaps&&f.mipmaps.length>0)for(let F=0;F<f.mipmaps.length;F++)be(S.__webglFramebuffer[F],p,f,n.COLOR_ATTACHMENT0,D,F);else be(S.__webglFramebuffer,p,f,n.COLOR_ATTACHMENT0,D,0);_(f)&&T(D),t.unbindTexture()}p.depthBuffer&&ot(p)}function ft(p){let f=p.textures;for(let S=0,A=f.length;S<A;S++){let P=f[S];if(_(P)){let L=I(p),H=i.get(P).__webglTexture;t.bindTexture(L,H),T(L),t.unbindTexture()}}}let Pt=[],Jt=[];function Qt(p){if(p.samples>0){if(Xt(p)===!1){let f=p.textures,S=p.width,A=p.height,P=n.COLOR_BUFFER_BIT,L=p.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,H=i.get(p),D=f.length>1;if(D)for(let ae=0;ae<f.length;ae++)t.bindFramebuffer(n.FRAMEBUFFER,H.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ae,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,H.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ae,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,H.__webglMultisampledFramebuffer);let F=p.texture.mipmaps;F&&F.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,H.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,H.__webglFramebuffer);for(let ae=0;ae<f.length;ae++){if(p.resolveDepthBuffer&&(p.depthBuffer&&(P|=n.DEPTH_BUFFER_BIT),p.stencilBuffer&&p.resolveStencilBuffer&&(P|=n.STENCIL_BUFFER_BIT)),D){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,H.__webglColorRenderbuffer[ae]);let ge=i.get(f[ae]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ge,0)}n.blitFramebuffer(0,0,S,A,0,0,S,A,P,n.NEAREST),c===!0&&(Pt.length=0,Jt.length=0,Pt.push(n.COLOR_ATTACHMENT0+ae),p.depthBuffer&&p.storeMultisampledDepthBuffer===!1&&(Pt.push(L),Jt.push(L),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Jt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Pt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),D)for(let ae=0;ae<f.length;ae++){t.bindFramebuffer(n.FRAMEBUFFER,H.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ae,n.RENDERBUFFER,H.__webglColorRenderbuffer[ae]);let ge=i.get(f[ae]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,H.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ae,n.TEXTURE_2D,ge,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,H.__webglMultisampledFramebuffer)}else if(p.depthBuffer&&p.storeMultisampledDepthBuffer===!1&&c){let f=p.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[f])}}}function Ut(p){return Math.min(r.maxSamples,p.samples)}function Xt(p){let f=i.get(p);return p.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&f.__useRenderToTexture!==!1}function G(p){let f=a.render.frame;u.get(p)!==f&&(u.set(p,f),p.update())}function Fe(p,f){let S=p.colorSpace,A=p.format,P=p.type;return p.isCompressedTexture===!0||p.isVideoTexture===!0||S!==Ln&&S!==Sr&&(xt.getTransfer(S)===Ct?(A!==ri||P!==qn)&&qe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Je("WebGLTextures: Unsupported texture color space:",S)),f}function gt(p){return typeof HTMLImageElement<"u"&&p instanceof HTMLImageElement?(l.width=p.naturalWidth||p.width,l.height=p.naturalHeight||p.height):typeof VideoFrame<"u"&&p instanceof VideoFrame?(l.width=p.displayWidth,l.height=p.displayHeight):(l.width=p.width,l.height=p.height),l}this.allocateTextureUnit=oe,this.resetTextureUnits=ee,this.getTextureUnits=X,this.setTextureUnits=Q,this.setTexture2D=he,this.setTexture2DArray=ie,this.setTexture3D=le,this.setTextureCube=de,this.rebindTextures=St,this.setupRenderTarget=Rt,this.updateRenderTargetMipmap=ft,this.updateMultisampleRenderTarget=Qt,this.setupDepthRenderbuffer=ot,this.setupFrameBufferTexture=be,this.useMultisampledRTT=Xt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function vT(n,e){function t(i,r=Sr){let s,a=xt.getTransfer(r);if(i===qn)return n.UNSIGNED_BYTE;if(i===su)return n.UNSIGNED_SHORT_4_4_4_4;if(i===au)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Jd)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Qd)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===jd)return n.BYTE;if(i===$d)return n.SHORT;if(i===Va)return n.UNSIGNED_SHORT;if(i===ru)return n.INT;if(i===Ci)return n.UNSIGNED_INT;if(i===ii)return n.FLOAT;if(i===Pi)return n.HALF_FLOAT;if(i===ef)return n.ALPHA;if(i===tf)return n.RGB;if(i===ri)return n.RGBA;if(i===Vi)return n.DEPTH_COMPONENT;if(i===Yr)return n.DEPTH_STENCIL;if(i===ou)return n.RED;if(i===lu)return n.RED_INTEGER;if(i===Zr)return n.RG;if(i===cu)return n.RG_INTEGER;if(i===uu)return n.RGBA_INTEGER;if(i===tl||i===nl||i===il||i===rl)if(a===Ct)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===tl)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===nl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===il)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===rl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===tl)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===nl)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===il)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===rl)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===hu||i===du||i===fu||i===pu)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===hu)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===du)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===fu)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===pu)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===mu||i===gu||i===_u||i===xu||i===vu||i===sl||i===yu)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===mu||i===gu)return a===Ct?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===_u)return a===Ct?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===xu)return s.COMPRESSED_R11_EAC;if(i===vu)return s.COMPRESSED_SIGNED_R11_EAC;if(i===sl)return s.COMPRESSED_RG11_EAC;if(i===yu)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Su||i===bu||i===Mu||i===Eu||i===Tu||i===Au||i===wu||i===Ru||i===Iu||i===Cu||i===Pu||i===Nu||i===Lu||i===Du)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Su)return a===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===bu)return a===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Mu)return a===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Eu)return a===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Tu)return a===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Au)return a===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===wu)return a===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Ru)return a===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Iu)return a===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Cu)return a===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Pu)return a===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Nu)return a===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Lu)return a===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Du)return a===Ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Uu||i===Ou||i===Fu)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Uu)return a===Ct?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ou)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Fu)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Bu||i===ku||i===al||i===zu)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Bu)return s.COMPRESSED_RED_RGTC1_EXT;if(i===ku)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===al)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===zu)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ga?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var yT=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ST=`
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

}`,Ef=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new Ho(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new ni({vertexShader:yT,fragmentShader:ST,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new cn(new Rs(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Tf=class extends Gi{constructor(e,t){super();let i=this,r=null,s=1,a=null,o="local-floor",c=1,l=null,u=null,h=null,d=null,m=null,x=null,v=typeof XRWebGLBinding<"u",g=new Ef,_={},T=t.getContextAttributes(),I=null,E=null,w=[],R=[],N=new dt,y=null,C=null,B=new _n;B.viewport=new Dt;let W=new _n;W.viewport=new Dt;let Z=[B,W],ee=new eu,X=null,Q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let Y=w[J];return Y===void 0&&(Y=new Aa,w[J]=Y),Y.getTargetRaySpace()},this.getControllerGrip=function(J){let Y=w[J];return Y===void 0&&(Y=new Aa,w[J]=Y),Y.getGripSpace()},this.getHand=function(J){let Y=w[J];return Y===void 0&&(Y=new Aa,w[J]=Y),Y.getHandSpace()};function oe(J){let Y=R.indexOf(J.inputSource);if(Y===-1)return;let Me=w[Y];Me!==void 0&&(Me.update(J.inputSource,J.frame,l||a),Me.dispatchEvent({type:J.type,data:J.inputSource}))}function re(){r.removeEventListener("select",oe),r.removeEventListener("selectstart",oe),r.removeEventListener("selectend",oe),r.removeEventListener("squeeze",oe),r.removeEventListener("squeezestart",oe),r.removeEventListener("squeezeend",oe),r.removeEventListener("end",re),r.removeEventListener("inputsourceschange",he);for(let J=0;J<w.length;J++){let Y=R[J];Y!==null&&(R[J]=null,w[J].disconnect(Y))}X=null,Q=null,g.reset();for(let J in _)delete _[J];if(e.setRenderTarget(I),m=null,d=null,h=null,r=null,E=null,et.stop(),i.isPresenting=!1,e.setPixelRatio(y),e.setSize(N.width,N.height,!1),C!==null){let J=C.camera;J.fov=C.fov,J.zoom=C.zoom,J.updateProjectionMatrix(),C=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){s=J,i.isPresenting===!0&&qe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){o=J,i.isPresenting===!0&&qe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(J){l=J},this.getBaseLayer=function(){return d!==null?d:m},this.getBinding=function(){return h===null&&v&&(h=new XRWebGLBinding(r,t)),h},this.getFrame=function(){return x},this.getSession=function(){return r},this.setSession=async function(J){if(r=J,r!==null){if(I=e.getRenderTarget(),r.addEventListener("select",oe),r.addEventListener("selectstart",oe),r.addEventListener("selectend",oe),r.addEventListener("squeeze",oe),r.addEventListener("squeezestart",oe),r.addEventListener("squeezeend",oe),r.addEventListener("end",re),r.addEventListener("inputsourceschange",he),T.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(N),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let Me=null,Ze=null,be=null;T.depth&&(be=T.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Me=T.stencil?Yr:Vi,Ze=T.stencil?Ga:Ci);let it={colorFormat:t.RGBA8,depthFormat:be,scaleFactor:s};h=this.getBinding(),d=h.createProjectionLayer(it),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),E=new zn(d.textureWidth,d.textureHeight,{format:ri,type:qn,depthTexture:new Wr(d.textureWidth,d.textureHeight,Ze,void 0,void 0,void 0,void 0,void 0,void 0,Me),stencilBuffer:T.stencil,colorSpace:e.outputColorSpace,samples:T.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let Me={antialias:T.antialias,alpha:!0,depth:T.depth,stencil:T.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,t,Me),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),E=new zn(m.framebufferWidth,m.framebufferHeight,{format:ri,type:qn,colorSpace:e.outputColorSpace,stencilBuffer:T.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1,storeMultisampledDepthBuffer:m.ignoreDepthValues===!1,storeMultisampledStencilBuffer:m.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await r.requestReferenceSpace(o),et.setContext(r),et.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function he(J){for(let Y=0;Y<J.removed.length;Y++){let Me=J.removed[Y],Ze=R.indexOf(Me);Ze>=0&&(R[Ze]=null,w[Ze].disconnect(Me))}for(let Y=0;Y<J.added.length;Y++){let Me=J.added[Y],Ze=R.indexOf(Me);if(Ze===-1){for(let it=0;it<w.length;it++)if(it>=R.length){R.push(Me),Ze=it;break}else if(R[it]===null){R[it]=Me,Ze=it;break}if(Ze===-1)break}let be=w[Ze];be&&be.connect(Me)}}let ie=new K,le=new K;function de(J,Y,Me){ie.setFromMatrixPosition(Y.matrixWorld),le.setFromMatrixPosition(Me.matrixWorld);let Ze=ie.distanceTo(le),be=Y.projectionMatrix.elements,it=Me.projectionMatrix.elements,Gt=be[14]/(be[10]-1),ot=be[14]/(be[10]+1),St=(be[9]+1)/be[5],Rt=(be[9]-1)/be[5],ft=(be[8]-1)/be[0],Pt=(it[8]+1)/it[0],Jt=Gt*ft,Qt=Gt*Pt,Ut=Ze/(-ft+Pt),Xt=Ut*-ft;if(Y.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(Xt),J.translateZ(Ut),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),be[10]===-1)J.projectionMatrix.copy(Y.projectionMatrix),J.projectionMatrixInverse.copy(Y.projectionMatrixInverse);else{let G=Gt+Ut,Fe=ot+Ut,gt=Jt-Xt,p=Qt+(Ze-Xt),f=St*ot/Fe*G,S=Rt*ot/Fe*G;J.projectionMatrix.makePerspective(gt,p,f,S,G,Fe),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function ne(J,Y){Y===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(Y.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(r===null)return;let Y=J.near,Me=J.far;g.texture!==null&&(g.depthNear>0&&(Y=g.depthNear),g.depthFar>0&&(Me=g.depthFar)),ee.near=W.near=B.near=Y,ee.far=W.far=B.far=Me,(X!==ee.near||Q!==ee.far)&&(r.updateRenderState({depthNear:ee.near,depthFar:ee.far}),X=ee.near,Q=ee.far),ee.layers.mask=J.layers.mask|6,B.layers.mask=ee.layers.mask&-5,W.layers.mask=ee.layers.mask&-3;let Ze=J.parent,be=ee.cameras;ne(ee,Ze);for(let it=0;it<be.length;it++)ne(be[it],Ze);be.length===2?de(ee,B,W):ee.projectionMatrix.copy(B.projectionMatrix),C===null&&J.isPerspectiveCamera&&(C={camera:J,fov:J.fov,zoom:J.zoom}),me(J,ee,Ze)};function me(J,Y,Me){Me===null?J.matrix.copy(Y.matrixWorld):(J.matrix.copy(Me.matrixWorld),J.matrix.invert(),J.matrix.multiply(Y.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(Y.projectionMatrix),J.projectionMatrixInverse.copy(Y.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=As*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return ee},this.getFoveation=function(){if(!(d===null&&m===null))return c},this.setFoveation=function(J){c=J,d!==null&&(d.fixedFoveation=J),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=J)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(ee)},this.getCameraTexture=function(J){return _[J]};let Oe=null;function Pe(J,Y){if(u=Y.getViewerPose(l||a),x=Y,u!==null){let Me=u.views;m!==null&&(e.setRenderTargetFramebuffer(E,m.framebuffer),e.setRenderTarget(E));let Ze=!1;Me.length!==ee.cameras.length&&(ee.cameras.length=0,Ze=!0);for(let ot=0;ot<Me.length;ot++){let St=Me[ot],Rt=null;if(m!==null)Rt=m.getViewport(St);else{let Pt=h.getViewSubImage(d,St);Rt=Pt.viewport,ot===0&&(e.setRenderTargetTextures(E,Pt.colorTexture,Pt.depthStencilTexture),e.setRenderTarget(E))}let ft=Z[ot];ft===void 0&&(ft=new _n,ft.layers.enable(ot),ft.viewport=new Dt,Z[ot]=ft),ft.matrix.fromArray(St.transform.matrix),ft.matrix.decompose(ft.position,ft.quaternion,ft.scale),ft.projectionMatrix.fromArray(St.projectionMatrix),ft.projectionMatrixInverse.copy(ft.projectionMatrix).invert(),ft.viewport.set(Rt.x,Rt.y,Rt.width,Rt.height),ot===0&&(ee.matrix.copy(ft.matrix),ee.matrix.decompose(ee.position,ee.quaternion,ee.scale)),Ze===!0&&ee.cameras.push(ft)}let be=r.enabledFeatures;if(be&&be.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&v){h=i.getBinding();let ot=h.getDepthInformation(Me[0]);ot&&ot.isValid&&ot.texture&&g.init(ot,r.renderState)}if(be&&be.includes("camera-access")&&v){e.state.unbindTexture(),h=i.getBinding();for(let ot=0;ot<Me.length;ot++){let St=Me[ot].camera;if(St){let Rt=_[St];Rt||(Rt=new Ho,_[St]=Rt);let ft=h.getCameraImage(St);Rt.sourceTexture=ft}}}}for(let Me=0;Me<w.length;Me++){let Ze=R[Me],be=w[Me];Ze!==null&&be!==void 0&&be.update(Ze,Y,l||a)}Oe&&Oe(J,Y),Y.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Y}),x=null}let et=new Q_;et.setAnimationLoop(Pe),this.setAnimationLoop=function(J){Oe=J},this.dispose=function(){}}},bT=new at,s0=new rt;s0.set(-1,0,0,0,1,0,0,0,1);function MT(n,e){function t(g,_){g.matrixAutoUpdate===!0&&g.updateMatrix(),_.value.copy(g.matrix)}function i(g,_){_.color.getRGB(g.fogColor.value,of(n)),_.isFog?(g.fogNear.value=_.near,g.fogFar.value=_.far):_.isFogExp2&&(g.fogDensity.value=_.density)}function r(g,_,T,I,E){_.isNodeMaterial?_.uniformsNeedUpdate=!1:_.isMeshBasicMaterial?s(g,_):_.isMeshLambertMaterial?(s(g,_),_.envMap&&(g.envMapIntensity.value=_.envMapIntensity)):_.isMeshToonMaterial?(s(g,_),h(g,_)):_.isMeshPhongMaterial?(s(g,_),u(g,_),_.envMap&&(g.envMapIntensity.value=_.envMapIntensity)):_.isMeshStandardMaterial?(s(g,_),d(g,_),_.isMeshPhysicalMaterial&&m(g,_,E)):_.isMeshMatcapMaterial?(s(g,_),x(g,_)):_.isMeshDepthMaterial?s(g,_):_.isMeshDistanceMaterial?(s(g,_),v(g,_)):_.isMeshNormalMaterial?s(g,_):_.isLineBasicMaterial?(a(g,_),_.isLineDashedMaterial&&o(g,_)):_.isPointsMaterial?c(g,_,T,I):_.isSpriteMaterial?l(g,_):_.isShadowMaterial?(g.color.value.copy(_.color),g.opacity.value=_.opacity):_.isShaderMaterial&&(_.uniformsNeedUpdate=!1)}function s(g,_){g.opacity.value=_.opacity,_.color&&g.diffuse.value.copy(_.color),_.emissive&&g.emissive.value.copy(_.emissive).multiplyScalar(_.emissiveIntensity),_.map&&(g.map.value=_.map,t(_.map,g.mapTransform)),_.alphaMap&&(g.alphaMap.value=_.alphaMap,t(_.alphaMap,g.alphaMapTransform)),_.bumpMap&&(g.bumpMap.value=_.bumpMap,t(_.bumpMap,g.bumpMapTransform),g.bumpScale.value=_.bumpScale,_.side===Dn&&(g.bumpScale.value*=-1)),_.normalMap&&(g.normalMap.value=_.normalMap,t(_.normalMap,g.normalMapTransform),g.normalScale.value.copy(_.normalScale),_.side===Dn&&g.normalScale.value.negate()),_.displacementMap&&(g.displacementMap.value=_.displacementMap,t(_.displacementMap,g.displacementMapTransform),g.displacementScale.value=_.displacementScale,g.displacementBias.value=_.displacementBias),_.emissiveMap&&(g.emissiveMap.value=_.emissiveMap,t(_.emissiveMap,g.emissiveMapTransform)),_.specularMap&&(g.specularMap.value=_.specularMap,t(_.specularMap,g.specularMapTransform)),_.alphaTest>0&&(g.alphaTest.value=_.alphaTest);let T=e.get(_),I=T.envMap,E=T.envMapRotation;I&&(g.envMap.value=I,g.envMapRotation.value.setFromMatrix4(bT.makeRotationFromEuler(E)).transpose(),I.isCubeTexture&&I.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(s0),g.reflectivity.value=_.reflectivity,g.ior.value=_.ior,g.refractionRatio.value=_.refractionRatio),_.lightMap&&(g.lightMap.value=_.lightMap,g.lightMapIntensity.value=_.lightMapIntensity,t(_.lightMap,g.lightMapTransform)),_.aoMap&&(g.aoMap.value=_.aoMap,g.aoMapIntensity.value=_.aoMapIntensity,t(_.aoMap,g.aoMapTransform))}function a(g,_){g.diffuse.value.copy(_.color),g.opacity.value=_.opacity,_.map&&(g.map.value=_.map,t(_.map,g.mapTransform))}function o(g,_){g.dashSize.value=_.dashSize,g.totalSize.value=_.dashSize+_.gapSize,g.scale.value=_.scale}function c(g,_,T,I){g.diffuse.value.copy(_.color),g.opacity.value=_.opacity,g.size.value=_.size*T,g.scale.value=I*.5,_.map&&(g.map.value=_.map,t(_.map,g.uvTransform)),_.alphaMap&&(g.alphaMap.value=_.alphaMap,t(_.alphaMap,g.alphaMapTransform)),_.alphaTest>0&&(g.alphaTest.value=_.alphaTest)}function l(g,_){g.diffuse.value.copy(_.color),g.opacity.value=_.opacity,g.rotation.value=_.rotation,_.map&&(g.map.value=_.map,t(_.map,g.mapTransform)),_.alphaMap&&(g.alphaMap.value=_.alphaMap,t(_.alphaMap,g.alphaMapTransform)),_.alphaTest>0&&(g.alphaTest.value=_.alphaTest)}function u(g,_){g.specular.value.copy(_.specular),g.shininess.value=Math.max(_.shininess,1e-4)}function h(g,_){_.gradientMap&&(g.gradientMap.value=_.gradientMap)}function d(g,_){g.metalness.value=_.metalness,_.metalnessMap&&(g.metalnessMap.value=_.metalnessMap,t(_.metalnessMap,g.metalnessMapTransform)),g.roughness.value=_.roughness,_.roughnessMap&&(g.roughnessMap.value=_.roughnessMap,t(_.roughnessMap,g.roughnessMapTransform)),_.envMap&&(g.envMapIntensity.value=_.envMapIntensity)}function m(g,_,T){g.ior.value=_.ior,_.sheen>0&&(g.sheenColor.value.copy(_.sheenColor).multiplyScalar(_.sheen),g.sheenRoughness.value=_.sheenRoughness,_.sheenColorMap&&(g.sheenColorMap.value=_.sheenColorMap,t(_.sheenColorMap,g.sheenColorMapTransform)),_.sheenRoughnessMap&&(g.sheenRoughnessMap.value=_.sheenRoughnessMap,t(_.sheenRoughnessMap,g.sheenRoughnessMapTransform))),_.clearcoat>0&&(g.clearcoat.value=_.clearcoat,g.clearcoatRoughness.value=_.clearcoatRoughness,_.clearcoatMap&&(g.clearcoatMap.value=_.clearcoatMap,t(_.clearcoatMap,g.clearcoatMapTransform)),_.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=_.clearcoatRoughnessMap,t(_.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),_.clearcoatNormalMap&&(g.clearcoatNormalMap.value=_.clearcoatNormalMap,t(_.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(_.clearcoatNormalScale),_.side===Dn&&g.clearcoatNormalScale.value.negate())),_.dispersion>0&&(g.dispersion.value=_.dispersion),_.retroreflectivity>0&&(g.retroreflectivity.value=_.retroreflectivity),_.iridescence>0&&(g.iridescence.value=_.iridescence,g.iridescenceIOR.value=_.iridescenceIOR,g.iridescenceThicknessMinimum.value=_.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=_.iridescenceThicknessRange[1],_.iridescenceMap&&(g.iridescenceMap.value=_.iridescenceMap,t(_.iridescenceMap,g.iridescenceMapTransform)),_.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=_.iridescenceThicknessMap,t(_.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),_.transmission>0&&(g.transmission.value=_.transmission,g.transmissionSamplerMap.value=T.texture,g.transmissionSamplerSize.value.set(T.width,T.height),_.transmissionMap&&(g.transmissionMap.value=_.transmissionMap,t(_.transmissionMap,g.transmissionMapTransform)),g.thickness.value=_.thickness,_.thicknessMap&&(g.thicknessMap.value=_.thicknessMap,t(_.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=_.attenuationDistance,g.attenuationColor.value.copy(_.attenuationColor)),_.anisotropy>0&&(g.anisotropyVector.value.set(_.anisotropy*Math.cos(_.anisotropyRotation),_.anisotropy*Math.sin(_.anisotropyRotation)),_.anisotropyMap&&(g.anisotropyMap.value=_.anisotropyMap,t(_.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=_.specularIntensity,g.specularColor.value.copy(_.specularColor),_.specularColorMap&&(g.specularColorMap.value=_.specularColorMap,t(_.specularColorMap,g.specularColorMapTransform)),_.specularIntensityMap&&(g.specularIntensityMap.value=_.specularIntensityMap,t(_.specularIntensityMap,g.specularIntensityMapTransform))}function x(g,_){_.matcap&&(g.matcap.value=_.matcap)}function v(g,_){let T=e.get(_).light;g.referencePosition.value.setFromMatrixPosition(T.matrixWorld),g.nearDistance.value=T.shadow.camera.near,g.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function ET(n,e,t,i){let r={},s={},a=[],o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(E,w){let R=w.program;i.uniformBlockBinding(E,R)}function l(E,w){let R=r[E.id];R===void 0&&(g(E),R=u(E),r[E.id]=R,E.addEventListener("dispose",T));let N=w.program;i.updateUBOMapping(E,N);let y=e.render.frame;s[E.id]!==y&&(d(E),s[E.id]=y)}function u(E){let w=h();E.__bindingPointIndex=w;let R=n.createBuffer(),N=E.__size,y=E.usage;return n.bindBuffer(n.UNIFORM_BUFFER,R),n.bufferData(n.UNIFORM_BUFFER,N,y),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,R),R}function h(){for(let E=0;E<o;E++)if(a.indexOf(E)===-1)return a.push(E),E;return Je("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(E){let w=r[E.id],R=E.uniforms,N=E.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let y=0,C=R.length;y<C;y++){let B=R[y];if(Array.isArray(B))for(let W=0,Z=B.length;W<Z;W++)m(B[W],y,W,N);else m(B,y,0,N)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function m(E,w,R,N){if(v(E,w,R,N)===!0){let y=E.__offset,C=E.value;if(Array.isArray(C)){let B=0;for(let W=0;W<C.length;W++){let Z=C[W],ee=_(Z);x(Z,E.__data,B),typeof Z!="number"&&typeof Z!="boolean"&&!Z.isMatrix3&&!ArrayBuffer.isView(Z)&&(B+=ee.storage/Float32Array.BYTES_PER_ELEMENT)}}else x(C,E.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,y,E.__data)}}function x(E,w,R){typeof E=="number"||typeof E=="boolean"?w[0]=E:E.isMatrix3?(w[0]=E.elements[0],w[1]=E.elements[1],w[2]=E.elements[2],w[3]=0,w[4]=E.elements[3],w[5]=E.elements[4],w[6]=E.elements[5],w[7]=0,w[8]=E.elements[6],w[9]=E.elements[7],w[10]=E.elements[8],w[11]=0):ArrayBuffer.isView(E)?w.set(new E.constructor(E.buffer,E.byteOffset,w.length)):E.toArray(w,R)}function v(E,w,R,N){let y=E.value,C=w+"_"+R;if(N[C]===void 0)return typeof y=="number"||typeof y=="boolean"?N[C]=y:ArrayBuffer.isView(y)?N[C]=y.slice():N[C]=y.clone(),!0;{let B=N[C];if(typeof y=="number"||typeof y=="boolean"){if(B!==y)return N[C]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(B.equals(y)===!1)return B.copy(y),!0}}return!1}function g(E){let w=E.uniforms,R=0,N=16;for(let C=0,B=w.length;C<B;C++){let W=Array.isArray(w[C])?w[C]:[w[C]];for(let Z=0,ee=W.length;Z<ee;Z++){let X=W[Z],Q=Array.isArray(X.value)?X.value:[X.value];for(let oe=0,re=Q.length;oe<re;oe++){let he=Q[oe],ie=_(he),le=R%N,de=le%ie.boundary,ne=le+de;R+=de,ne!==0&&N-ne<ie.storage&&(R+=N-ne),X.__data=new Float32Array(ie.storage/Float32Array.BYTES_PER_ELEMENT),X.__offset=R,R+=ie.storage}}}let y=R%N;return y>0&&(R+=N-y),E.__size=R,E.__cache={},this}function _(E){let w={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(w.boundary=4,w.storage=4):E.isVector2?(w.boundary=8,w.storage=8):E.isVector3||E.isColor?(w.boundary=16,w.storage=12):E.isVector4?(w.boundary=16,w.storage=16):E.isMatrix3?(w.boundary=48,w.storage=48):E.isMatrix4?(w.boundary=64,w.storage=64):E.isTexture?qe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(E)?(w.boundary=16,w.storage=E.byteLength):qe("WebGLRenderer: Unsupported uniform value type.",E),w}function T(E){let w=E.target;w.removeEventListener("dispose",T);let R=a.indexOf(w.__bindingPointIndex);a.splice(R,1),n.deleteBuffer(r[w.id]),delete r[w.id],delete s[w.id]}function I(){for(let E in r)n.deleteBuffer(r[E]);a=[],r={},s={}}return{bind:c,update:l,dispose:I}}var TT=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Zi=null;function AT(){return Zi===null&&(Zi=new Ca(TT,16,16,Zr,Pi),Zi.name="DFG_LUT",Zi.minFilter=jt,Zi.magFilter=jt,Zi.wrapS=pi,Zi.wrapT=pi,Zi.generateMipmaps=!1,Zi.needsUpdate=!0),Zi}var Zu=class{constructor(e={}){let{canvas:t=E_(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:d=!1,outputBufferType:m=qn}=e;this.isWebGLRenderer=!0;let x;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=i.getContextAttributes().alpha}else x=a;let v=m,g=new Set([uu,cu,lu]),_=new Set([qn,Ci,Va,Ga,su,au]),T=new Uint32Array(4),I=new Int32Array(4),E=new K,w=null,R=null,N=[],y=[],C=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ri,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let B=this,W=!1,Z=null,ee=null,X=null,Q=null;this._outputColorSpace=nn;let oe=0,re=0,he=null,ie=-1,le=null,de=new Dt,ne=new Dt,me=null,Oe=new Qe(0),Pe=0,et=t.width,J=t.height,Y=1,Me=null,Ze=null,be=new Dt(0,0,et,J),it=new Dt(0,0,et,J),Gt=!1,ot=new Pa,St=!1,Rt=!1,ft=new at,Pt=new K,Jt=new Dt,Qt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ut=!1;function Xt(){return he===null?Y:1}let G=i;function Fe(M,k){return t.getContext(M,k)}let gt,p,f,S,A,P,L,H,D,F,ae,ge,ue,fe,Ie,De,tt,V,Ee,ce,Se,Ae,pe;try{let M={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",Ot,!1),t.addEventListener("webglcontextrestored",At,!1),t.addEventListener("webglcontextcreationerror",Yn,!1),G===null){let k="webgl2";if(G=Fe(k,M),G===null)throw Fe(k)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}We()}catch(M){throw t.removeEventListener("webglcontextlost",Ot,!1),t.removeEventListener("webglcontextrestored",At,!1),t.removeEventListener("webglcontextcreationerror",Yn,!1),Je("WebGLRenderer: "+M.message),M}function We(){gt=new LM(G),gt.init(),Se=new vT(G,gt),p=new MM(G,gt,e,Se),f=new _T(G,gt),p.reversedDepthBuffer&&d&&f.buffers.depth.setReversed(!0),ee=G.createFramebuffer(),X=G.createFramebuffer(),Q=G.createFramebuffer(),S=new OM(G),A=new iT,P=new xT(G,gt,f,A,p,Se,S),L=new NM(B),H=new By(G),Ae=new SM(G,H),D=new DM(G,H,S,Ae),F=new BM(G,D,H,Ae,S),V=new FM(G,p,P),Ie=new EM(A),ae=new nT(B,L,gt,p,Ae,Ie),ge=new MT(B,A),ue=new sT,fe=new hT(gt),tt=new yM(B,L,f,F,x,c),De=new gT(B,F,p),pe=new ET(G,S,p,f),Ee=new bM(G,gt,S),ce=new UM(G,gt,S),S.programs=ae.programs,B.capabilities=p,B.extensions=gt,B.properties=A,B.renderLists=ue,B.shadowMap=De,B.state=f,B.info=S}v!==qn&&(C=new zM(v,t.width,t.height,o,r,s));let Be=new Tf(B,G);this.xr=Be,this.getContext=function(){return G},this.getContextAttributes=function(){return G.getContextAttributes()},this.forceContextLoss=function(){let M=gt.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){let M=gt.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(M){M!==void 0&&(Y=M,this.setSize(et,J,!1))},this.getSize=function(M){return M.set(et,J)},this.setSize=function(M,k,te=!0){if(Be.isPresenting){qe("WebGLRenderer: Can't change size while VR device is presenting.");return}et=M,J=k,t.width=Math.floor(M*Y),t.height=Math.floor(k*Y),te===!0&&(t.style.width=M+"px",t.style.height=k+"px"),C!==null&&C.setSize(t.width,t.height),this.setViewport(0,0,M,k)},this.getDrawingBufferSize=function(M){return M.set(et*Y,J*Y).floor()},this.setDrawingBufferSize=function(M,k,te){et=M,J=k,Y=te,t.width=Math.floor(M*te),t.height=Math.floor(k*te),this.setViewport(0,0,M,k)},this.setEffects=function(M){if(v===qn){Je("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let k=0;k<M.length;k++)if(M[k].isOutputPass===!0){qe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}C.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(de)},this.getViewport=function(M){return M.copy(be)},this.setViewport=function(M,k,te,$){M.isVector4?be.set(M.x,M.y,M.z,M.w):be.set(M,k,te,$),f.viewport(de.copy(be).multiplyScalar(Y).round())},this.getScissor=function(M){return M.copy(it)},this.setScissor=function(M,k,te,$){M.isVector4?it.set(M.x,M.y,M.z,M.w):it.set(M,k,te,$),f.scissor(ne.copy(it).multiplyScalar(Y).round())},this.getScissorTest=function(){return Gt},this.setScissorTest=function(M){f.setScissorTest(Gt=M)},this.setOpaqueSort=function(M){Me=M},this.setTransparentSort=function(M){Ze=M},this.getClearColor=function(M){return M.copy(tt.getClearColor())},this.setClearColor=function(){tt.setClearColor(...arguments)},this.getClearAlpha=function(){return tt.getClearAlpha()},this.setClearAlpha=function(){tt.setClearAlpha(...arguments)},this.clear=function(M=!0,k=!0,te=!0){let $=0;if(M){let j=!1;if(he!==null){let we=he.texture.format;j=g.has(we)}if(j){let we=he.texture.type,Ue=_.has(we),Te=tt.getClearColor(),ze=tt.getClearAlpha(),He=Te.r,lt=Te.g,ct=Te.b;Ue?(T[0]=He,T[1]=lt,T[2]=ct,T[3]=ze,G.clearBufferuiv(G.COLOR,0,T)):(I[0]=He,I[1]=lt,I[2]=ct,I[3]=ze,G.clearBufferiv(G.COLOR,0,I))}else $|=G.COLOR_BUFFER_BIT}k&&($|=G.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),te&&($|=G.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),$!==0&&G.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),Z=M},this.dispose=function(){t.removeEventListener("webglcontextlost",Ot,!1),t.removeEventListener("webglcontextrestored",At,!1),t.removeEventListener("webglcontextcreationerror",Yn,!1),tt.dispose(),ue.dispose(),fe.dispose(),A.dispose(),L.dispose(),F.dispose(),Ae.dispose(),pe.dispose(),ae.dispose(),Be.dispose(),Be.removeEventListener("sessionstart",xl),Be.removeEventListener("sessionend",vl),Ji.stop()};function Ot(M){M.preventDefault(),Po("WebGLRenderer: Context Lost."),W=!0}function At(){Po("WebGLRenderer: Context Restored."),W=!1;let M=S.autoReset,k=De.enabled,te=De.autoUpdate,$=De.needsUpdate,j=De.type;We(),S.autoReset=M,De.enabled=k,De.autoUpdate=te,De.needsUpdate=$,De.type=j}function Yn(M){Je("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function si(M){let k=M.target;k.removeEventListener("dispose",si),th(k)}function th(M){Bs(M),A.remove(M)}function Bs(M){let k=A.get(M).programs;k!==void 0&&(k.forEach(function(te){ae.releaseProgram(te)}),M.isShaderMaterial&&ae.releaseShaderCache(M))}this.renderBufferDirect=function(M,k,te,$,j,we){k===null&&(k=Qt);let Ue=j.isMesh&&j.matrixWorld.determinantAffine()<0,Te=nh(M,k,te,$,j);f.setMaterial($,Ue);let ze=te.index,He=1;if($.wireframe===!0){if(ze=D.getWireframeAttribute(te),ze===void 0)return;He=2}let lt=te.drawRange,ct=te.attributes.position,Ve=lt.start*He,wt=(lt.start+lt.count)*He;we!==null&&(Ve=Math.max(Ve,we.start*He),wt=Math.min(wt,(we.start+we.count)*He)),ze!==null?(Ve=Math.max(Ve,0),wt=Math.min(wt,ze.count)):ct!=null&&(Ve=Math.max(Ve,0),wt=Math.min(wt,ct.count));let en=wt-Ve;if(en<0||en===1/0)return;Ae.setup(j,$,Te,te,ze);let Ft,Nt=Ee;if(ze!==null&&(Ft=H.get(ze),Nt=ce,Nt.setIndex(Ft)),j.isMesh)$.wireframe===!0?(f.setLineWidth($.wireframeLinewidth*Xt()),Nt.setMode(G.LINES)):Nt.setMode(G.TRIANGLES);else if(j.isLine){let pn=$.linewidth;pn===void 0&&(pn=1),f.setLineWidth(pn*Xt()),j.isLineSegments?Nt.setMode(G.LINES):j.isLineLoop?Nt.setMode(G.LINE_LOOP):Nt.setMode(G.LINE_STRIP)}else j.isPoints?Nt.setMode(G.POINTS):j.isSprite&&Nt.setMode(G.TRIANGLES);if(j.isBatchedMesh)if(gt.get("WEBGL_multi_draw"))Nt.renderMultiDraw(j._multiDrawStarts,j._multiDrawCounts,j._multiDrawCount);else{let pn=j._multiDrawStarts,Ne=j._multiDrawCounts,yn=j._multiDrawCount,Et=ze?H.get(ze).bytesPerElement:1,On=A.get($).currentProgram.getUniforms();for(let oi=0;oi<yn;oi++)On.setValue(G,"_gl_DrawID",oi),Nt.render(pn[oi]/Et,Ne[oi])}else if(j.isInstancedMesh)Nt.renderInstances(Ve,en,j.count);else if(te.isInstancedBufferGeometry){let pn=te._maxInstanceCount!==void 0?te._maxInstanceCount:1/0,Ne=Math.min(te.instanceCount,pn);Nt.renderInstances(Ve,en,Ne)}else Nt.render(Ve,en)};function ks(M,k,te,$){Z!==null&&M.isNodeMaterial&&Z.setObject($,M),St===!0&&Ie.setState(M,te,!1),M.transparent===!0&&M.side===Un&&M.forceSinglePass===!1?(M.side=Dn,M.needsUpdate=!0,Gs(M,k,$),M.side=qi,M.needsUpdate=!0,Gs(M,k,$),M.side=Un):Gs(M,k,$)}this.compile=function(M,k,te=null){te===null&&(te=M),Z!==null&&Z.renderStart(M,k,te),R=fe.get(te),R.init(k),y.push(R),te.traverseVisible(function(j){j.isLight&&j.layers.test(k.layers)&&(R.pushLight(j),j.castShadow&&R.pushShadow(j))}),M!==te&&M.traverseVisible(function(j){j.isLight&&j.layers.test(k.layers)&&(R.pushLight(j),j.castShadow&&R.pushShadow(j))}),R.setupLights(),Z!==null&&Z.updateLights(R.state.lightsArray),Rt=this.localClippingEnabled,St=Ie.init(this.clippingPlanes,Rt),St===!0&&Ie.setGlobalState(this.clippingPlanes,k),Z!==null&&De.render(R.state.shadowsArray,te,k);let $=new Set;return M.traverse(function(j){if(!(j.isMesh||j.isPoints||j.isLine||j.isSprite))return;let we=j.material;if(we)if(Array.isArray(we))for(let Ue=0;Ue<we.length;Ue++){let Te=we[Ue];ks(Te,te,k,j),$.add(Te)}else ks(we,te,k,j),$.add(we)}),R=y.pop(),Z!==null&&Z.renderEnd(),$},this.compileAsync=function(M,k,te=null){let $=this.compile(M,k,te);return new Promise(j=>{function we(){if($.forEach(function(Ue){let ze=A.get(Ue).currentProgram;(ze===void 0||ze.isReady())&&$.delete(Ue)}),$.size===0){j(M);return}setTimeout(we,10)}gt.get("KHR_parallel_shader_compile")!==null?we():setTimeout(we,10)})};let zs=null;function $i(M){zs&&zs(M)}function xl(){Ji.stop()}function vl(){Ji.start()}let Ji=new Q_;Ji.setAnimationLoop($i),typeof self<"u"&&Ji.setContext(self),this.setAnimationLoop=function(M){zs=M,Be.setAnimationLoop(M),M===null?Ji.stop():Ji.start()},Be.addEventListener("sessionstart",xl),Be.addEventListener("sessionend",vl),this.render=function(M,k){if(k!==void 0&&k.isCamera!==!0){Je("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(W===!0)return;Z!==null&&Z.renderStart(M,k);let te=Be.enabled===!0&&Be.isPresenting===!0,$=C!==null&&(he===null||te)&&C.begin(B,he);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),Be.enabled===!0&&Be.isPresenting===!0&&(C===null||C.isCompositing()===!1)&&(Be.cameraAutoUpdate===!0&&Be.updateCamera(k),k=Be.getCamera()),M.isScene===!0&&M.onBeforeRender(B,M,k,he),R=fe.get(M,y.length),R.init(k),R.state.textureUnits=P.getTextureUnits(),y.push(R),ft.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),ot.setFromProjectionMatrix(ft,Ti,k.reversedDepth),Rt=this.localClippingEnabled,St=Ie.init(this.clippingPlanes,Rt),w=ue.get(M,N.length),w.init(),N.push(w),Be.enabled===!0&&Be.isPresenting===!0){let Ue=B.xr.getDepthSensingMesh();Ue!==null&&$a(Ue,k,-1/0,B.sortObjects)}$a(M,k,0,B.sortObjects),w.finish(),Z!==null&&Z.updateLights(R.state.lightsArray),B.sortObjects===!0&&w.sort(Me,Ze),Ut=Be.enabled===!1||Be.isPresenting===!1||Be.hasDepthSensing()===!1,Ut&&tt.addToRenderList(w,M),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),St===!0&&Ie.beginShadows();let j=R.state.shadowsArray;if(De.render(j,M,k),St===!0&&Ie.endShadows(),($&&C.hasRenderPass())===!1){let Ue=w.opaque,Te=w.transmissive;if(R.setupLights(),k.isArrayCamera){let ze=k.cameras;if(Te.length>0)for(let He=0,lt=ze.length;He<lt;He++){let ct=ze[He];ai(Ue,Te,M,ct)}Ut&&tt.render(M);for(let He=0,lt=ze.length;He<lt;He++){let ct=ze[He];yl(w,M,ct,ct.viewport)}}else Te.length>0&&ai(Ue,Te,M,k),Ut&&tt.render(M),yl(w,M,k)}he!==null&&re===0&&(P.updateMultisampleRenderTarget(he),P.updateRenderTargetMipmap(he)),$&&C.end(B),M.isScene===!0&&M.onAfterRender(B,M,k),Ae.resetDefaultState(),ie=-1,le=null,y.pop(),y.length>0?(R=y[y.length-1],P.setTextureUnits(R.state.textureUnits),St===!0&&Ie.setGlobalState(B.clippingPlanes,R.state.camera)):R=null,N.pop(),N.length>0?w=N[N.length-1]:w=null,Z!==null&&Z.renderEnd()};function $a(M,k,te,$){if(M.visible===!1)return;if(M.layers.test(k.layers)){if(M.isGroup)te=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(k);else if(M.isLightProbeGrid)R.pushLightProbeGrid(M);else if(M.isLight)R.pushLight(M),M.castShadow&&R.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||M.intersectsFrustum(ot)){$&&Jt.setFromMatrixPosition(M.matrixWorld).applyMatrix4(ft);let Ue=F.update(M),Te=M.material;Te.visible&&w.push(M,Ue,Te,te,Jt.z,null,k)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||M.intersectsFrustum(ot))){let Ue=F.update(M),Te=M.material;if($&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Jt.copy(M.boundingSphere.center)):(Ue.boundingSphere===null&&Ue.computeBoundingSphere(),Jt.copy(Ue.boundingSphere.center)),Jt.applyMatrix4(M.matrixWorld).applyMatrix4(ft)),Array.isArray(Te)){let ze=Ue.groups;for(let He=0,lt=ze.length;He<lt;He++){let ct=ze[He],Ve=Te[ct.materialIndex];Ve&&Ve.visible&&w.push(M,Ue,Ve,te,Jt.z,ct,k)}}else Te.visible&&w.push(M,Ue,Te,te,Jt.z,null,k)}}let we=M.children;for(let Ue=0,Te=we.length;Ue<Te;Ue++)$a(we[Ue],k,te,$)}function yl(M,k,te,$){let{opaque:j,transmissive:we,transparent:Ue}=M;R.setupLightsView(te),St===!0&&Ie.setGlobalState(B.clippingPlanes,te),$&&f.viewport(de.copy($)),j.length>0&&Vs(j,k,te),we.length>0&&Vs(we,k,te),Ue.length>0&&Vs(Ue,k,te),f.buffers.depth.setTest(!0),f.buffers.depth.setMask(!0),f.buffers.color.setMask(!0),f.setPolygonOffset(!1)}function ai(M,k,te,$){if((te.isScene===!0?te.overrideMaterial:null)!==null)return;if(R.state.transmissionRenderTarget[$.id]===void 0){let Ve=gt.has("EXT_color_buffer_half_float")||gt.has("EXT_color_buffer_float");R.state.transmissionRenderTarget[$.id]=new zn(1,1,{generateMipmaps:!0,type:Ve?Pi:qn,minFilter:Ii,samples:Math.max(4,p.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:xt.workingColorSpace})}let we=R.state.transmissionRenderTarget[$.id],Ue=$.viewport||de;we.setSize(Ue.z*B.transmissionResolutionScale,Ue.w*B.transmissionResolutionScale);let Te=B.getRenderTarget(),ze=B.getActiveCubeFace(),He=B.getActiveMipmapLevel();B.setRenderTarget(we),B.getClearColor(Oe),Pe=B.getClearAlpha(),Pe<1&&B.setClearColor(16777215,.5),B.clear(),Ut&&tt.render(te);let lt=B.toneMapping;B.toneMapping=Ri;let ct=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),R.setupLightsView($),St===!0&&Ie.setGlobalState(B.clippingPlanes,$),Vs(M,te,$),P.updateMultisampleRenderTarget(we),P.updateRenderTargetMipmap(we),gt.has("WEBGL_multisampled_render_to_texture")===!1){let Ve=!1;for(let wt=0,en=k.length;wt<en;wt++){let Ft=k[wt],{object:Nt,geometry:pn,material:Ne,group:yn}=Ft;if(Ne.side===Un&&Nt.layers.test($.layers)){let Et=Ne.side;Ne.side=Dn,Ne.needsUpdate=!0,Sl(Nt,te,$,pn,Ne,yn),Ne.side=Et,Ne.needsUpdate=!0,Ve=!0}}Ve===!0&&(P.updateMultisampleRenderTarget(we),P.updateRenderTargetMipmap(we))}B.setRenderTarget(Te,ze,He),B.setClearColor(Oe,Pe),ct!==void 0&&($.viewport=ct),B.toneMapping=lt}function Vs(M,k,te){let $=k.isScene===!0?k.overrideMaterial:null;for(let j=0,we=M.length;j<we;j++){let Ue=M[j],{object:Te,geometry:ze,group:He}=Ue,lt=Ue.material;lt.allowOverride===!0&&$!==null&&(lt=$),Te.layers.test(te.layers)&&Sl(Te,k,te,ze,lt,He)}}function Sl(M,k,te,$,j,we){Z!==null&&j.isNodeMaterial&&Z.setObject(M,j),M.onBeforeRender(B,k,te,$,j,we),M.modelViewMatrix.multiplyMatrices(te.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),j.onBeforeRender(B,k,te,$,M,we),j.transparent===!0&&j.side===Un&&j.forceSinglePass===!1?(j.side=Dn,j.needsUpdate=!0,B.renderBufferDirect(te,k,$,j,M,we),j.side=qi,j.needsUpdate=!0,B.renderBufferDirect(te,k,$,j,M,we),j.side=Un):B.renderBufferDirect(te,k,$,j,M,we),M.onAfterRender(B,k,te,$,j,we)}function Gs(M,k,te){k.isScene!==!0&&(k=Qt);let $=A.get(M),j=R.state.lights,we=R.state.shadowsArray,Ue=j.state.version,Te=ae.getParameters(M,j.state,we,k,te,R.state.lightProbeGridArray),ze=ae.getProgramCacheKey(Te),He=$.programs;$.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?k.environment:null,$.fog=k.fog;let lt=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;$.envMap=L.get(M.envMap||$.environment,lt),$.envMapRotation=$.environment!==null&&M.envMap===null?k.environmentRotation:M.envMapRotation,He===void 0&&(M.addEventListener("dispose",si),He=new Map,$.programs=He);let ct=He.get(ze);if(ct!==void 0){if($.currentProgram===ct&&$.lightsStateVersion===Ue)return Ml(M,Te),ct}else Te.uniforms=ae.getUniforms(M),Z!==null&&M.isNodeMaterial&&Z.build(M,te,Te),M.onBeforeCompile(Te,B),ct=ae.acquireProgram(Te,ze),He.set(ze,ct),$.uniforms=Te.uniforms;let Ve=$.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Ve.clippingPlanes=Ie.uniform),Ml(M,Te),$.needsLights=rh(M),$.lightsStateVersion=Ue,$.needsLights&&(Ve.ambientLightColor.value=j.state.ambient,Ve.lightProbe.value=j.state.probe,Ve.sunLights.value=j.state.sun,Ve.sunLightShadows.value=j.state.sunShadow,Ve.directionalLights.value=j.state.directional,Ve.directionalLightShadows.value=j.state.directionalShadow,Ve.spotLights.value=j.state.spot,Ve.spotLightShadows.value=j.state.spotShadow,Ve.rectAreaLights.value=j.state.rectArea,Ve.ltc_1.value=j.state.rectAreaLTC1,Ve.ltc_2.value=j.state.rectAreaLTC2,Ve.pointLights.value=j.state.point,Ve.pointLightShadows.value=j.state.pointShadow,Ve.hemisphereLights.value=j.state.hemi,Ve.sunShadowMatrix.value=j.state.sunShadowMatrix,Ve.sunShadowCascade.value=j.state.sunShadowCascade,Ve.directionalShadowMatrix.value=j.state.directionalShadowMatrix,Ve.spotLightMatrix.value=j.state.spotLightMatrix,Ve.spotLightMap.value=j.state.spotLightMap,Ve.pointShadowMatrix.value=j.state.pointShadowMatrix),$.lightProbeGrid=R.state.lightProbeGridArray.length>0,$.currentProgram=ct,$.uniformsList=null,ct}function bl(M){if(M.uniformsList===null){let k=M.currentProgram.getUniforms();M.uniformsList=Ya.seqWithValue(k.seq,M.uniforms)}return M.uniformsList}function Ml(M,k){let te=A.get(M);te.outputColorSpace=k.outputColorSpace,te.batching=k.batching,te.batchingColor=k.batchingColor,te.instancing=k.instancing,te.instancingColor=k.instancingColor,te.instancingMorph=k.instancingMorph,te.skinning=k.skinning,te.morphTargets=k.morphTargets,te.morphNormals=k.morphNormals,te.morphColors=k.morphColors,te.morphTargetsCount=k.morphTargetsCount,te.numClippingPlanes=k.numClippingPlanes,te.numIntersection=k.numClipIntersection,te.vertexAlphas=k.vertexAlphas,te.vertexTangents=k.vertexTangents,te.toneMapping=k.toneMapping}function gi(M,k){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;E.setFromMatrixPosition(k.matrixWorld);for(let te=0,$=M.length;te<$;te++){let j=M[te];if(j.texture!==null&&j.boundingBox.containsPoint(E))return j}return null}function nh(M,k,te,$,j){k.isScene!==!0&&(k=Qt),P.resetTextureUnits();let we=k.fog,Ue=$.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial?k.environment:null,Te=he===null?B.outputColorSpace:he.isXRRenderTarget===!0?he.texture.colorSpace:xt.workingColorSpace,ze=$.isMeshStandardMaterial||$.isMeshLambertMaterial&&!$.envMap||$.isMeshPhongMaterial&&!$.envMap,He=L.get($.envMap||Ue,ze),lt=$.vertexColors===!0&&!!te.attributes.color&&te.attributes.color.itemSize===4,ct=!!te.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),Ve=!!te.morphAttributes.position,wt=!!te.morphAttributes.normal,en=!!te.morphAttributes.color,Ft=Ri;$.toneMapped&&(he===null||he.isXRRenderTarget===!0)&&(Ft=B.toneMapping);let Nt=te.morphAttributes.position||te.morphAttributes.normal||te.morphAttributes.color,pn=Nt!==void 0?Nt.length:0,Ne=A.get($),yn=R.state.lights;if(St===!0&&(Rt===!0||M!==le)){let Bt=M===le&&$.id===ie;Ie.setState($,M,Bt)}let Et=!1;$.version===Ne.__version?(Ne.needsLights&&Ne.lightsStateVersion!==yn.state.version||Ne.outputColorSpace!==Te||j.isBatchedMesh&&Ne.batching===!1||!j.isBatchedMesh&&Ne.batching===!0||j.isBatchedMesh&&Ne.batchingColor===!0&&j._colorsTexture===null||j.isBatchedMesh&&Ne.batchingColor===!1&&j._colorsTexture!==null||j.isInstancedMesh&&Ne.instancing===!1||!j.isInstancedMesh&&Ne.instancing===!0||j.isSkinnedMesh&&Ne.skinning===!1||!j.isSkinnedMesh&&Ne.skinning===!0||j.isInstancedMesh&&Ne.instancingColor===!0&&j.instanceColor===null||j.isInstancedMesh&&Ne.instancingColor===!1&&j.instanceColor!==null||j.isInstancedMesh&&Ne.instancingMorph===!0&&j.morphTexture===null||j.isInstancedMesh&&Ne.instancingMorph===!1&&j.morphTexture!==null||Ne.envMap!==He||$.fog===!0&&Ne.fog!==we||Ne.numClippingPlanes!==void 0&&(Ne.numClippingPlanes!==Ie.numPlanes||Ne.numIntersection!==Ie.numIntersection)||Ne.vertexAlphas!==lt||Ne.vertexTangents!==ct||Ne.morphTargets!==Ve||Ne.morphNormals!==wt||Ne.morphColors!==en||Ne.toneMapping!==Ft||Ne.morphTargetsCount!==pn||!!Ne.lightProbeGrid!=R.state.lightProbeGridArray.length>0)&&(Et=!0):(Et=!0,Ne.__version=$.version);let On=Ne.currentProgram;Et===!0&&(On=Gs($,k,j),Z&&$.isNodeMaterial&&Z.onUpdateProgram($,On,Ne));let oi=!1,Ni=!1,Mr=!1,It=On.getUniforms(),Kt=Ne.uniforms;if(f.useProgram(On.program)&&(oi=!0,Ni=!0,Mr=!0),$.id!==ie&&(ie=$.id,Ni=!0),Ne.needsLights){let Bt=gi(R.state.lightProbeGridArray,j);Ne.lightProbeGrid!==Bt&&(Ne.lightProbeGrid=Bt,Ni=!0)}if(oi||le!==M){f.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),It.setValue(G,"projectionMatrix",M.projectionMatrix),It.setValue(G,"viewMatrix",M.matrixWorldInverse);let _i=It.map.cameraPosition;_i!==void 0&&_i.setValue(G,Pt.setFromMatrixPosition(M.matrixWorld)),p.logarithmicDepthBuffer&&It.setValue(G,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&It.setValue(G,"isOrthographic",M.isOrthographicCamera===!0),le!==M&&(le=M,Ni=!0,Mr=!0)}if(Ne.needsLights&&(yn.state.sunShadowMap.length>0&&It.setValue(G,"sunShadowMap",yn.state.sunShadowMap,P),yn.state.directionalShadowMap.length>0&&It.setValue(G,"directionalShadowMap",yn.state.directionalShadowMap,P),yn.state.spotShadowMap.length>0&&It.setValue(G,"spotShadowMap",yn.state.spotShadowMap,P),yn.state.pointShadowMap.length>0&&It.setValue(G,"pointShadowMap",yn.state.pointShadowMap,P)),j.isSkinnedMesh){It.setOptional(G,j,"bindMatrix"),It.setOptional(G,j,"bindMatrixInverse");let Bt=j.skeleton;Bt&&(Bt.boneTexture===null&&Bt.computeBoneTexture(),It.setValue(G,"boneTexture",Bt.boneTexture,P))}j.isBatchedMesh&&(It.setOptional(G,j,"batchingTexture"),It.setValue(G,"batchingTexture",j._matricesTexture,P),It.setOptional(G,j,"batchingIdTexture"),It.setValue(G,"batchingIdTexture",j._indirectTexture,P),It.setOptional(G,j,"batchingColorTexture"),j._colorsTexture!==null&&It.setValue(G,"batchingColorTexture",j._colorsTexture,P));let Li=te.morphAttributes;if((Li.position!==void 0||Li.normal!==void 0||Li.color!==void 0)&&V.update(j,te,On),(Ni||Ne.receiveShadow!==j.receiveShadow)&&(Ne.receiveShadow=j.receiveShadow,It.setValue(G,"receiveShadow",j.receiveShadow)),($.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial)&&$.envMap===null&&k.environment!==null&&(Kt.envMapIntensity.value=k.environmentIntensity),Kt.dfgLUT!==void 0&&(Kt.dfgLUT.value=AT()),Ni){if(It.setValue(G,"toneMappingExposure",B.toneMappingExposure),Ne.needsLights&&ih(Kt,Mr),we&&$.fog===!0&&ge.refreshFogUniforms(Kt,we),ge.refreshMaterialUniforms(Kt,$,Y,J,R.state.transmissionRenderTarget[M.id]),Ne.needsLights&&Ne.lightProbeGrid){let Bt=Ne.lightProbeGrid;Kt.probesSH.value=Bt.texture,Kt.probesMin.value.copy(Bt.boundingBox.min),Kt.probesMax.value.copy(Bt.boundingBox.max),Kt.probesResolution.value.copy(Bt.resolution)}Ya.upload(G,bl(Ne),Kt,P)}if($.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(Ya.upload(G,bl(Ne),Kt,P),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&It.setValue(G,"center",j.center),It.setValue(G,"modelViewMatrix",j.modelViewMatrix),It.setValue(G,"normalMatrix",j.normalMatrix),It.setValue(G,"modelMatrix",j.matrixWorld),$.uniformsGroups!==void 0){let Bt=$.uniformsGroups;for(let _i=0,Er=Bt.length;_i<Er;_i++){let Ja=Bt[_i];pe.update(Ja,On),pe.bind(Ja,On)}}return On}function ih(M,k){M.ambientLightColor.needsUpdate=k,M.lightProbe.needsUpdate=k,M.sunLights.needsUpdate=k,M.sunLightShadows.needsUpdate=k,M.directionalLights.needsUpdate=k,M.directionalLightShadows.needsUpdate=k,M.pointLights.needsUpdate=k,M.pointLightShadows.needsUpdate=k,M.spotLights.needsUpdate=k,M.spotLightShadows.needsUpdate=k,M.rectAreaLights.needsUpdate=k,M.hemisphereLights.needsUpdate=k}function rh(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return oe},this.getActiveMipmapLevel=function(){return re},this.getRenderTarget=function(){return he},this.setRenderTargetTextures=function(M,k,te){let $=A.get(M);$.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,$.__autoAllocateDepthBuffer===!1&&($.__useRenderToTexture=!1),A.get(M.texture).__webglTexture=k,A.get(M.depthTexture).__webglTexture=$.__autoAllocateDepthBuffer?void 0:te,$.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,k){let te=A.get(M);te.__webglFramebuffer=k,te.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(M,k=0,te=0){he=M,oe=k,re=te;let $=null,j=!1,we=!1;if(M){let Te=A.get(M);if(Te.__useDefaultFramebuffer!==void 0){f.bindFramebuffer(G.FRAMEBUFFER,Te.__webglFramebuffer),de.copy(M.viewport),ne.copy(M.scissor),me=M.scissorTest,f.viewport(de),f.scissor(ne),f.setScissorTest(me),ie=-1;return}else if(Te.__webglFramebuffer===void 0)P.setupRenderTarget(M);else if(Te.__hasExternalTextures)P.rebindTextures(M,A.get(M.texture).__webglTexture,A.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){let lt=M.depthTexture;if(Te.__boundDepthTexture!==lt){if(lt!==null&&A.has(lt)&&(M.width!==lt.image.width||M.height!==lt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");P.setupDepthRenderbuffer(M)}}let ze=M.texture;(ze.isData3DTexture||ze.isDataArrayTexture||ze.isCompressedArrayTexture)&&(we=!0);let He=A.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(He[k])?$=He[k][te]:$=He[k],j=!0):M.samples>0&&P.useMultisampledRTT(M)===!1?$=A.get(M).__webglMultisampledFramebuffer:Array.isArray(He)?$=He[te]:$=He,de.copy(M.viewport),ne.copy(M.scissor),me=M.scissorTest}else de.copy(be).multiplyScalar(Y).floor(),ne.copy(it).multiplyScalar(Y).floor(),me=Gt;if(te!==0&&($=ee),f.bindFramebuffer(G.FRAMEBUFFER,$)&&f.drawBuffers(M,$),f.viewport(de),f.scissor(ne),f.setScissorTest(me),j){let Te=A.get(M.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_CUBE_MAP_POSITIVE_X+k,Te.__webglTexture,te)}else if(we){let Te=k;for(let ze=0;ze<M.textures.length;ze++){let He=A.get(M.textures[ze]);G.framebufferTextureLayer(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0+ze,He.__webglTexture,te,Te)}}else if(M!==null&&te!==0){let Te=A.get(M.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,Te.__webglTexture,te)}ie=-1};function El(M){let k=A.get(M);return(k.__readFormat!==M.format||k.__readType!==M.type)&&(k.__readFormat=M.format,k.__readType=M.type,k.__formatReadable=p.textureFormatReadable(M.format),k.__typeReadable=p.textureTypeReadable(M.type)),k}this.readRenderTargetPixels=function(M,k,te,$,j,we,Ue,Te=0){if(!(M&&M.isWebGLRenderTarget)){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ze=A.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Ue!==void 0&&(ze=ze[Ue]),ze){f.bindFramebuffer(G.FRAMEBUFFER,ze);try{let He=M.textures[Te],lt=He.format,ct=He.type;M.textures.length>1&&G.readBuffer(G.COLOR_ATTACHMENT0+Te);let Ve=El(He);if(Ve.__formatReadable===!1){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ve.__typeReadable===!1){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=M.width-$&&te>=0&&te<=M.height-j&&G.readPixels(k,te,$,j,Se.convert(lt),Se.convert(ct),we)}finally{let He=he!==null?A.get(he).__webglFramebuffer:null;f.bindFramebuffer(G.FRAMEBUFFER,He)}}},this.readRenderTargetPixelsAsync=async function(M,k,te,$,j,we,Ue,Te=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ze=A.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Ue!==void 0&&(ze=ze[Ue]),ze)if(k>=0&&k<=M.width-$&&te>=0&&te<=M.height-j){f.bindFramebuffer(G.FRAMEBUFFER,ze);let He=M.textures[Te],lt=He.format,ct=He.type;M.textures.length>1&&G.readBuffer(G.COLOR_ATTACHMENT0+Te);let Ve=El(He);if(Ve.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ve.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let wt=G.createBuffer();G.bindBuffer(G.PIXEL_PACK_BUFFER,wt),G.bufferData(G.PIXEL_PACK_BUFFER,we.byteLength,G.STREAM_READ),G.readPixels(k,te,$,j,Se.convert(lt),Se.convert(ct),0),G.bindBuffer(G.PIXEL_PACK_BUFFER,null);let en=he!==null?A.get(he).__webglFramebuffer:null;f.bindFramebuffer(G.FRAMEBUFFER,en);let Ft=G.fenceSync(G.SYNC_GPU_COMMANDS_COMPLETE,0);return G.flush(),await A_(G,Ft,4),G.bindBuffer(G.PIXEL_PACK_BUFFER,wt),G.getBufferSubData(G.PIXEL_PACK_BUFFER,0,we),G.bindBuffer(G.PIXEL_PACK_BUFFER,null),G.deleteBuffer(wt),G.deleteSync(Ft),we}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,k=null,te=0){let $=Math.pow(2,-te),j=Math.floor(M.image.width*$),we=Math.floor(M.image.height*$),Ue=k!==null?k.x:0,Te=k!==null?k.y:0;P.setTexture2D(M,0),G.copyTexSubImage2D(G.TEXTURE_2D,te,0,0,Ue,Te,j,we),f.unbindTexture()},this.copyTextureToTexture=function(M,k,te=null,$=null,j=0,we=0){let Ue,Te,ze,He,lt,ct,Ve,wt,en,Ft=M.isCompressedTexture?M.mipmaps[we]:M.image;if(te!==null)Ue=te.max.x-te.min.x,Te=te.max.y-te.min.y,ze=te.isBox3?te.max.z-te.min.z:1,He=te.min.x,lt=te.min.y,ct=te.isBox3?te.min.z:0;else{let Kt=Math.pow(2,-j);Ue=Math.floor(Ft.width*Kt),Te=Math.floor(Ft.height*Kt),M.isDataArrayTexture?ze=Ft.depth:M.isData3DTexture?ze=Math.floor(Ft.depth*Kt):ze=1,He=0,lt=0,ct=0}$!==null?(Ve=$.x,wt=$.y,en=$.z):(Ve=0,wt=0,en=0);let Nt=Se.convert(k.format),pn=Se.convert(k.type),Ne;k.isData3DTexture?(P.setTexture3D(k,0),Ne=G.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(P.setTexture2DArray(k,0),Ne=G.TEXTURE_2D_ARRAY):(P.setTexture2D(k,0),Ne=G.TEXTURE_2D),f.activeTexture(G.TEXTURE0),f.pixelStorei(G.UNPACK_FLIP_Y_WEBGL,k.flipY),f.pixelStorei(G.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),f.pixelStorei(G.UNPACK_ALIGNMENT,k.unpackAlignment);let yn=f.getParameter(G.UNPACK_ROW_LENGTH),Et=f.getParameter(G.UNPACK_IMAGE_HEIGHT),On=f.getParameter(G.UNPACK_SKIP_PIXELS),oi=f.getParameter(G.UNPACK_SKIP_ROWS),Ni=f.getParameter(G.UNPACK_SKIP_IMAGES);f.pixelStorei(G.UNPACK_ROW_LENGTH,Ft.width),f.pixelStorei(G.UNPACK_IMAGE_HEIGHT,Ft.height),f.pixelStorei(G.UNPACK_SKIP_PIXELS,He),f.pixelStorei(G.UNPACK_SKIP_ROWS,lt),f.pixelStorei(G.UNPACK_SKIP_IMAGES,ct);let Mr=M.isDataArrayTexture||M.isData3DTexture,It=k.isDataArrayTexture||k.isData3DTexture;if(M.isDepthTexture){let Kt=A.get(M),Li=A.get(k),Bt=A.get(Kt.__renderTarget),_i=A.get(Li.__renderTarget);f.bindFramebuffer(G.READ_FRAMEBUFFER,Bt.__webglFramebuffer),f.bindFramebuffer(G.DRAW_FRAMEBUFFER,_i.__webglFramebuffer);for(let Er=0;Er<ze;Er++)Mr&&(G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,A.get(M).__webglTexture,j,ct+Er),G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,A.get(k).__webglTexture,we,en+Er)),G.blitFramebuffer(He,lt,Ue,Te,Ve,wt,Ue,Te,G.DEPTH_BUFFER_BIT,G.NEAREST);f.bindFramebuffer(G.READ_FRAMEBUFFER,null),f.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else if(j!==0||M.isRenderTargetTexture||A.has(M)){let Kt=A.get(M),Li=A.get(k);f.bindFramebuffer(G.READ_FRAMEBUFFER,X),f.bindFramebuffer(G.DRAW_FRAMEBUFFER,Q);for(let Bt=0;Bt<ze;Bt++)Mr?G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,Kt.__webglTexture,j,ct+Bt):G.framebufferTexture2D(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,Kt.__webglTexture,j),It?G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,Li.__webglTexture,we,en+Bt):G.framebufferTexture2D(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,Li.__webglTexture,we),j!==0?G.blitFramebuffer(He,lt,Ue,Te,Ve,wt,Ue,Te,G.COLOR_BUFFER_BIT,G.NEAREST):It?G.copyTexSubImage3D(Ne,we,Ve,wt,en+Bt,He,lt,Ue,Te):G.copyTexSubImage2D(Ne,we,Ve,wt,He,lt,Ue,Te);f.bindFramebuffer(G.READ_FRAMEBUFFER,null),f.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else It?M.isDataTexture||M.isData3DTexture?G.texSubImage3D(Ne,we,Ve,wt,en,Ue,Te,ze,Nt,pn,Ft.data):k.isCompressedArrayTexture?G.compressedTexSubImage3D(Ne,we,Ve,wt,en,Ue,Te,ze,Nt,Ft.data):G.texSubImage3D(Ne,we,Ve,wt,en,Ue,Te,ze,Nt,pn,Ft):M.isDataTexture?G.texSubImage2D(G.TEXTURE_2D,we,Ve,wt,Ue,Te,Nt,pn,Ft.data):M.isCompressedTexture?G.compressedTexSubImage2D(G.TEXTURE_2D,we,Ve,wt,Ft.width,Ft.height,Nt,Ft.data):G.texSubImage2D(G.TEXTURE_2D,we,Ve,wt,Ue,Te,Nt,pn,Ft);f.pixelStorei(G.UNPACK_ROW_LENGTH,yn),f.pixelStorei(G.UNPACK_IMAGE_HEIGHT,Et),f.pixelStorei(G.UNPACK_SKIP_PIXELS,On),f.pixelStorei(G.UNPACK_SKIP_ROWS,oi),f.pixelStorei(G.UNPACK_SKIP_IMAGES,Ni),we===0&&k.generateMipmaps&&G.generateMipmap(Ne),f.unbindTexture()},this.initRenderTarget=function(M){A.get(M).__webglFramebuffer===void 0&&P.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?P.setTextureCube(M,0):M.isData3DTexture?P.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?P.setTexture2DArray(M,0):P.setTexture2D(M,0),f.unbindTexture()},this.resetState=function(){oe=0,re=0,he=null,f.reset(),Ae.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ti}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=xt._getDrawingBufferColorSpace(e),t.unpackColorSpace=xt._getUnpackColorSpace()}};function Af(n,e){if(e===nf)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),n;if(e===Ha||e===ol){let t=n.getIndex();if(t===null){let s=[],a=n.getAttribute("position");if(a!==void 0){for(let o=0;o<a.count;o++)s.push(o);n.setIndex(s),t=n.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),n}let i=t.count-2,r=[];if(e===Ha)for(let s=1;s<=i;s++)r.push(t.getX(0)),r.push(t.getX(s)),r.push(t.getX(s+1));else for(let s=0;s<i;s++)s%2===0?(r.push(t.getX(s)),r.push(t.getX(s+1)),r.push(t.getX(s+2))):(r.push(t.getX(s+2)),r.push(t.getX(s+1)),r.push(t.getX(s)));return r.length/3!==i&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."),n.setIndex(r),n.clearGroups(),n}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),n}function o0(n){let e=new Map,t=new Map,i=n.clone();return l0(n,i,function(r,s){e.set(s,r),t.set(r,s)}),i.traverse(function(r){if(!r.isSkinnedMesh)return;let s=r,a=e.get(r),o=a.skeleton.bones;s.skeleton=a.skeleton.clone(),s.bindMatrix.copy(a.bindMatrix),s.skeleton.bones=o.map(function(c){return t.get(c)}),s.bind(s.skeleton,s.bindMatrix)}),i}function l0(n,e,t){t(n,e);for(let i=0;i<n.children.length;i++)l0(n.children[i],e.children[i],t)}var $u=class extends Wi{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Lf(t)}),this.register(function(t){return new Df(t)}),this.register(function(t){return new Hf(t)}),this.register(function(t){return new Wf(t)}),this.register(function(t){return new Xf(t)}),this.register(function(t){return new Of(t)}),this.register(function(t){return new Ff(t)}),this.register(function(t){return new Bf(t)}),this.register(function(t){return new kf(t)}),this.register(function(t){return new Nf(t)}),this.register(function(t){return new zf(t)}),this.register(function(t){return new Uf(t)}),this.register(function(t){return new Gf(t)}),this.register(function(t){return new Vf(t)}),this.register(function(t){return new Cf(t)}),this.register(function(t){return new Ju(t,yt.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new Ju(t,yt.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new qf(t)})}load(e,t,i,r){let s=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let l=yr.extractUrlBase(e);a=yr.resolveURL(l,this.path)}else a=yr.extractUrlBase(e);this.manager.itemStart(e);let o=function(l){r?r(l):console.error(l),s.manager.itemError(e),s.manager.itemEnd(e)},c=new Ua(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{s.parse(l,a,function(u){t(u),s.manager.itemEnd(e)},o)}catch(u){o(u)}},i,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,i,r){let s,a={},o={},c=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===f0){try{a[yt.KHR_BINARY_GLTF]=new Yf(e)}catch(h){r&&r(h);return}s=JSON.parse(a[yt.KHR_BINARY_GLTF].content)}else s=JSON.parse(c.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){r&&r(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new ep(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){let h=this.pluginCallbacks[u](l);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[h.name]=h,a[h.name]=!0}if(s.extensionsUsed)for(let u=0;u<s.extensionsUsed.length;++u){let h=s.extensionsUsed[u],d=s.extensionsRequired||[];switch(h){case yt.KHR_MATERIALS_UNLIT:a[h]=new Pf;break;case yt.KHR_DRACO_MESH_COMPRESSION:a[h]=new Zf(s,this.dracoLoader);break;case yt.KHR_TEXTURE_TRANSFORM:a[h]=new Kf;break;case yt.KHR_MESH_QUANTIZATION:a[h]=new jf;break;default:d.indexOf(h)>=0&&o[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(i,r)}parseAsync(e,t){let i=this;return new Promise(function(r,s){i.parse(e,t,r,s)})}};function wT(){let n={};return{get:function(e){return n[e]},add:function(e,t){n[e]=t},remove:function(e){delete n[e]},removeAll:function(){n={}}}}function an(n,e,t){let i=n.json.materials[e];return i.extensions&&i.extensions[t]?i.extensions[t]:null}var yt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Cf=class{constructor(e){this.parser=e,this.name=yt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let i=0,r=t.length;i<r;i++){let s=t[i];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){let t=this.parser,i="light:"+e,r=t.cache.get(i);if(r)return r;let s=t.json,c=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e],l,u=new Qe(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],Ln);let h=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new jo(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Ko(u),l.distance=h;break;case"spot":l=new Zo(u),l.distance=h,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),ji(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),r=Promise.resolve(l),t.cache.add(i,r),r}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,i=this.parser,s=i.json.nodes[e],o=(s.extensions&&s.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return i._getNodeRef(t.cache,o,c)})}},Pf=class{constructor(){this.name=yt.KHR_MATERIALS_UNLIT}getMaterialType(){return Hn}extendParams(e,t,i){let r=[];e.color=new Qe(1,1,1),e.opacity=1;let s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){let a=s.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],Ln),e.opacity=a[3]}s.baseColorTexture!==void 0&&r.push(i.assignTexture(e,"map",s.baseColorTexture,nn))}return Promise.all(r)}},Nf=class{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let i=an(this.parser,e,this.name);return i===null||i.emissiveStrength!==void 0&&(t.emissiveIntensity=i.emissiveStrength),Promise.resolve()}},Lf=class{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return an(this.parser,e,this.name)!==null?Wn:null}extendMaterialParams(e,t){let i=an(this.parser,e,this.name);if(i===null)return Promise.resolve();let r=[];if(i.clearcoatFactor!==void 0&&(t.clearcoat=i.clearcoatFactor),i.clearcoatTexture!==void 0&&r.push(this.parser.assignTexture(t,"clearcoatMap",i.clearcoatTexture)),i.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=i.clearcoatRoughnessFactor),i.clearcoatRoughnessTexture!==void 0&&r.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",i.clearcoatRoughnessTexture)),i.clearcoatNormalTexture!==void 0&&(r.push(this.parser.assignTexture(t,"clearcoatNormalMap",i.clearcoatNormalTexture)),i.clearcoatNormalTexture.scale!==void 0)){let s=i.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new dt(s,s)}return Promise.all(r)}},Df=class{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_DISPERSION}getMaterialType(e){return an(this.parser,e,this.name)!==null?Wn:null}extendMaterialParams(e,t){let i=an(this.parser,e,this.name);return i===null||(t.dispersion=i.dispersion!==void 0?i.dispersion:0),Promise.resolve()}},Uf=class{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return an(this.parser,e,this.name)!==null?Wn:null}extendMaterialParams(e,t){let i=an(this.parser,e,this.name);if(i===null)return Promise.resolve();let r=[];return i.iridescenceFactor!==void 0&&(t.iridescence=i.iridescenceFactor),i.iridescenceTexture!==void 0&&r.push(this.parser.assignTexture(t,"iridescenceMap",i.iridescenceTexture)),i.iridescenceIor!==void 0&&(t.iridescenceIOR=i.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),i.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=i.iridescenceThicknessMinimum),i.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=i.iridescenceThicknessMaximum),i.iridescenceThicknessTexture!==void 0&&r.push(this.parser.assignTexture(t,"iridescenceThicknessMap",i.iridescenceThicknessTexture)),Promise.all(r)}},Of=class{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_SHEEN}getMaterialType(e){return an(this.parser,e,this.name)!==null?Wn:null}extendMaterialParams(e,t){let i=an(this.parser,e,this.name);if(i===null)return Promise.resolve();let r=[];if(t.sheenColor=new Qe(0,0,0),t.sheenRoughness=0,t.sheen=1,i.sheenColorFactor!==void 0){let s=i.sheenColorFactor;t.sheenColor.setRGB(s[0],s[1],s[2],Ln)}return i.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=i.sheenRoughnessFactor),i.sheenColorTexture!==void 0&&r.push(this.parser.assignTexture(t,"sheenColorMap",i.sheenColorTexture,nn)),i.sheenRoughnessTexture!==void 0&&r.push(this.parser.assignTexture(t,"sheenRoughnessMap",i.sheenRoughnessTexture)),Promise.all(r)}},Ff=class{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return an(this.parser,e,this.name)!==null?Wn:null}extendMaterialParams(e,t){let i=an(this.parser,e,this.name);if(i===null)return Promise.resolve();let r=[];return i.transmissionFactor!==void 0&&(t.transmission=i.transmissionFactor),i.transmissionTexture!==void 0&&r.push(this.parser.assignTexture(t,"transmissionMap",i.transmissionTexture)),Promise.all(r)}},Bf=class{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_VOLUME}getMaterialType(e){return an(this.parser,e,this.name)!==null?Wn:null}extendMaterialParams(e,t){let i=an(this.parser,e,this.name);if(i===null)return Promise.resolve();let r=[];t.thickness=i.thicknessFactor!==void 0?i.thicknessFactor:0,i.thicknessTexture!==void 0&&r.push(this.parser.assignTexture(t,"thicknessMap",i.thicknessTexture)),t.attenuationDistance=i.attenuationDistance||1/0;let s=i.attenuationColor||[1,1,1];return t.attenuationColor=new Qe().setRGB(s[0],s[1],s[2],Ln),Promise.all(r)}},kf=class{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_IOR}getMaterialType(e){return an(this.parser,e,this.name)!==null?Wn:null}extendMaterialParams(e,t){let i=an(this.parser,e,this.name);return i===null||(t.ior=i.ior!==void 0?i.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}},zf=class{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_SPECULAR}getMaterialType(e){return an(this.parser,e,this.name)!==null?Wn:null}extendMaterialParams(e,t){let i=an(this.parser,e,this.name);if(i===null)return Promise.resolve();let r=[];t.specularIntensity=i.specularFactor!==void 0?i.specularFactor:1,i.specularTexture!==void 0&&r.push(this.parser.assignTexture(t,"specularIntensityMap",i.specularTexture));let s=i.specularColorFactor||[1,1,1];return t.specularColor=new Qe().setRGB(s[0],s[1],s[2],Ln),i.specularColorTexture!==void 0&&r.push(this.parser.assignTexture(t,"specularColorMap",i.specularColorTexture,nn)),Promise.all(r)}},Vf=class{constructor(e){this.parser=e,this.name=yt.EXT_MATERIALS_BUMP}getMaterialType(e){return an(this.parser,e,this.name)!==null?Wn:null}extendMaterialParams(e,t){let i=an(this.parser,e,this.name);if(i===null)return Promise.resolve();let r=[];return t.bumpScale=i.bumpFactor!==void 0?i.bumpFactor:1,i.bumpTexture!==void 0&&r.push(this.parser.assignTexture(t,"bumpMap",i.bumpTexture)),Promise.all(r)}},Gf=class{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return an(this.parser,e,this.name)!==null?Wn:null}extendMaterialParams(e,t){let i=an(this.parser,e,this.name);if(i===null)return Promise.resolve();let r=[];return i.anisotropyStrength!==void 0&&(t.anisotropy=i.anisotropyStrength),i.anisotropyRotation!==void 0&&(t.anisotropyRotation=i.anisotropyRotation),i.anisotropyTexture!==void 0&&r.push(this.parser.assignTexture(t,"anisotropyMap",i.anisotropyTexture)),Promise.all(r)}},Hf=class{constructor(e){this.parser=e,this.name=yt.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,i=t.json,r=i.textures[e];if(!r.extensions||!r.extensions[this.name])return null;let s=r.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(i.extensionsRequired&&i.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,a)}},Wf=class{constructor(e){this.parser=e,this.name=yt.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,i=this.parser,r=i.json,s=r.textures[e];if(!s.extensions||!s.extensions[t])return null;let a=s.extensions[t],o=r.images[a.source],c=i.textureLoader;if(o.uri){let l=i.options.manager.getHandler(o.uri);l!==null&&(c=l)}return i.loadTextureImage(e,a.source,c)}},Xf=class{constructor(e){this.parser=e,this.name=yt.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,i=this.parser,r=i.json,s=r.textures[e];if(!s.extensions||!s.extensions[t])return null;let a=s.extensions[t],o=r.images[a.source],c=i.textureLoader;if(o.uri){let l=i.options.manager.getHandler(o.uri);l!==null&&(c=l)}return i.loadTextureImage(e,a.source,c)}},Ju=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,i=t.bufferViews[e];if(i.extensions&&i.extensions[this.name]){let r=i.extensions[this.name],s=this.parser.getDependency("buffer",r.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(o){let c=r.byteOffset||0,l=r.byteLength||0,u=r.count,h=r.byteStride,d=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(u,h,d,r.mode,r.filter).then(function(m){return m.buffer}):a.ready.then(function(){let m=new ArrayBuffer(u*h);return a.decodeGltfBuffer(new Uint8Array(m),u,h,d,r.mode,r.filter),m})})}else return null}},qf=class{constructor(e){this.name=yt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,i=t.nodes[e];if(!i.extensions||!i.extensions[this.name]||i.mesh===void 0)return null;let r=t.meshes[i.mesh];for(let l of r.primitives)if(l.mode!==mi.TRIANGLES&&l.mode!==mi.TRIANGLE_STRIP&&l.mode!==mi.TRIANGLE_FAN&&l.mode!==void 0)return null;let a=i.extensions[this.name].attributes,o=[],c={};for(let l in a)o.push(this.parser.getDependency("accessor",a[l]).then(u=>(c[l]=u,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{let u=l.pop(),h=u.isGroup?u.children:[u],d=l[0].count,m=[];for(let x of h){let v=new at,g=new K,_=new ei,T=new K(1,1,1),I=new Bo(x.geometry,x.material,d);for(let w=0;w<d;w++)c.TRANSLATION&&g.fromBufferAttribute(c.TRANSLATION,w),c.ROTATION&&_.fromBufferAttribute(c.ROTATION,w),c.SCALE&&T.fromBufferAttribute(c.SCALE,w),I.setMatrixAt(w,v.compose(g,_,T));let E=null;for(let w in c)if(w==="_COLOR_0"){let R=c[w];I.instanceColor=new mr(R.array,R.itemSize,R.normalized)}else if(w!=="TRANSLATION"&&w!=="ROTATION"&&w!=="SCALE"){if(E===null){let N=I.geometry;E=new Mn,E.name=N.name;for(let y in N.attributes)E.setAttribute(y,N.attributes[y]);for(let y in N.morphAttributes)E.morphAttributes[y]=N.morphAttributes[y];N.index!==null&&E.setIndex(N.index),E.morphTargetsRelative=N.morphTargetsRelative;for(let y of N.groups)E.addGroup(y.start,y.count,y.materialIndex);N.boundingBox!==null&&(E.boundingBox=N.boundingBox.clone()),N.boundingSphere!==null&&(E.boundingSphere=N.boundingSphere.clone()),E.drawRange.start=N.drawRange.start,E.drawRange.count=N.drawRange.count,E.userData=Object.assign({},N.userData),I.geometry=E}let R=c[w];E.setAttribute(w,new mr(R.array,R.itemSize,R.normalized))}$t.prototype.copy.call(I,x),this.parser.assignFinalMaterial(I),m.push(I)}return u.isGroup?(u.clear(),u.add(...m),u):m[0]}))}},f0="glTF",hl=12,c0={JSON:1313821514,BIN:5130562},Yf=class{constructor(e){this.name=yt.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,hl),i=new TextDecoder;if(this.header={magic:i.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==f0)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let r=this.header.length-hl,s=new DataView(e,hl),a=0;for(;a<r;){let o=s.getUint32(a,!0);a+=4;let c=s.getUint32(a,!0);if(a+=4,c===c0.JSON){let l=new Uint8Array(e,hl+a,o);this.content=i.decode(l)}else if(c===c0.BIN){let l=hl+a;this.body=e.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},Zf=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=yt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let i=this.json,r=this.dracoLoader,s=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},c={},l={};for(let u in a){let h=Jf[u]||u.toLowerCase();o[h]=a[u]}for(let u in e.attributes){let h=Jf[u]||u.toLowerCase();if(a[u]!==void 0){let d=i.accessors[e.attributes[u]],m=Ka[d.componentType];l[h]=m.name,c[h]=d.normalized===!0}}return t.getDependency("bufferView",s).then(function(u){return new Promise(function(h,d){r.decodeDracoFile(u,function(m){for(let x in m.attributes){let v=m.attributes[x],g=c[x];g!==void 0&&(v.normalized=g)}h(m)},o,l,Ln,d)})})}},Kf=class{constructor(){this.name=yt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){if((t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0)return e;if(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),t.rotation!==void 0){let i=Math.cos(e.rotation),r=Math.sin(e.rotation);e.matrix.set(e.repeat.x*i,e.repeat.y*r,e.offset.x,-e.repeat.x*r,e.repeat.y*i,e.offset.y,0,0,1),e.matrixAutoUpdate=!1}return e.needsUpdate=!0,e}},jf=class{constructor(){this.name=yt.KHR_MESH_QUANTIZATION}},Qu=class extends Hi{constructor(e,t,i,r){super(e,t,i,r)}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,r=this.valueSize,s=e*r*3+r;for(let a=0;a!==r;a++)t[a]=i[s+a];return t}interpolate_(e,t,i,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,u=r-t,h=(i-t)/u,d=h*h,m=d*h,x=e*l,v=x-l,g=-2*m+3*d,_=m-d,T=1-g,I=_-d+h;for(let E=0;E!==o;E++){let w=a[v+E+o],R=a[v+E+c]*u,N=a[x+E+o],y=a[x+E]*u;s[E]=T*w+I*R+g*N+_*y}return s}},RT=new ei,$f=class extends Qu{interpolate_(e,t,i,r){let s=super.interpolate_(e,t,i,r);return RT.fromArray(s).normalize().toArray(s),s}},mi={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Ka={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},u0={9728:Yt,9729:jt,9984:iu,9985:za,9986:Ls,9987:Ii},h0={33071:pi,33648:ya,10497:Gr},wf={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Jf={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Kr={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},IT={CUBICSPLINE:void 0,LINEAR:Ts,STEP:Es},Rf={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function CT(n){return n.DefaultMaterial===void 0&&(n.DefaultMaterial=new Is({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:qi})),n.DefaultMaterial}function Os(n,e,t){for(let i in t.extensions)n[i]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[i]=t.extensions[i])}function ji(n,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(n.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function PT(n,e,t){let i=!1,r=!1,s=!1;for(let l=0,u=e.length;l<u;l++){let h=e[l];if(h.POSITION!==void 0&&(i=!0),h.NORMAL!==void 0&&(r=!0),h.COLOR_0!==void 0&&(s=!0),i&&r&&s)break}if(!i&&!r&&!s)return Promise.resolve(n);let a=[],o=[],c=[];for(let l=0,u=e.length;l<u;l++){let h=e[l];if(i){let d=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):n.attributes.position;a.push(d)}if(r){let d=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):n.attributes.normal;o.push(d)}if(s){let d=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):n.attributes.color;c.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){let u=l[0],h=l[1],d=l[2];return i&&(n.morphAttributes.position=u),r&&(n.morphAttributes.normal=h),s&&(n.morphAttributes.color=d),n.morphTargetsRelative=!0,n})}function NT(n,e){if(n.updateMorphTargets(),e.weights!==void 0)for(let t=0,i=e.weights.length;t<i;t++)n.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(n.morphTargetInfluences.length===t.length){n.morphTargetDictionary={};for(let i=0,r=t.length;i<r;i++)n.morphTargetDictionary[t[i]]=i}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function LT(n){let e,t=n.extensions&&n.extensions[yt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+If(t.attributes):e=n.indices+":"+If(n.attributes)+":"+n.mode,n.targets!==void 0)for(let i=0,r=n.targets.length;i<r;i++)e+=":"+If(n.targets[i]);return e}function If(n){let e="",t=Object.keys(n).sort();for(let i=0,r=t.length;i<r;i++)e+=t[i]+":"+n[t[i]]+";";return e}function Qf(n){switch(n){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function DT(n){return n.search(/\.jpe?g($|\?)/i)>0||n.search(/^data\:image\/jpeg/)===0?"image/jpeg":n.search(/\.webp($|\?)/i)>0||n.search(/^data\:image\/webp/)===0?"image/webp":n.search(/\.ktx2($|\?)/i)>0||n.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var UT=new at,ep=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new wT,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let i=!1,r=-1,s=!1,a=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){let o=navigator.userAgent;i=/^((?!chrome|android).)*safari/i.test(o)===!0;let c=o.match(/Version\/(\d+)/);r=i&&c?parseInt(c[1],10):-1,s=o.indexOf("Firefox")>-1,a=s?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||i&&r<17||s&&a<98?this.textureLoader=new Cs(this.options.manager):this.textureLoader=new $o(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Ua(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let i=this,r=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([i.getDependencies("scene"),i.getDependencies("animation"),i.getDependencies("camera")])}).then(function(a){let o={scene:a[0][r.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:r.asset,parser:i,userData:{}};return Os(s,o,r),ji(o,r),Promise.all(i._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(let c of o.scenes)c.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],i=this.json.meshes||[];for(let r=0,s=t.length;r<s;r++){let a=t[r].joints;for(let o=0,c=a.length;o<c;o++)e[a[o]].isBone=!0}for(let r=0,s=e.length;r<s;r++){let a=e[r];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(i[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,i){if(e.refs[t]<=1)return i;let r=i.clone(),s=(a,o)=>{let c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(let[l,u]of a.children.entries())s(u,o.children[l])};return s(i,r),r.name+="_instance_"+e.uses[t]++,r}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let i=0;i<t.length;i++){let r=e(t[i]);if(r)return r}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let i=[];for(let r=0;r<t.length;r++){let s=e(t[r]);s&&i.push(s)}return i}getDependency(e,t){let i=e+":"+t,r=this.cache.get(i);if(!r){switch(e){case"scene":r=this.loadScene(t);break;case"node":r=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":r=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":r=this.loadAccessor(t);break;case"bufferView":r=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":r=this.loadBuffer(t);break;case"material":r=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":r=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":r=this.loadSkin(t);break;case"animation":r=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":r=this.loadCamera(t);break;default:if(r=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!r)throw new Error("Unknown type: "+e);break}this.cache.add(i,r)}return r}getDependencies(e){let t=this.cache.get(e);if(!t){let i=this,r=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(r.map(function(s,a){return i.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],i=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[yt.KHR_BINARY_GLTF].body);let r=this.options;return new Promise(function(s,a){i.load(yr.resolveURL(t.uri,r.path),s,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(i){let r=t.byteLength||0,s=t.byteOffset||0;return i.slice(s,s+r)})}loadAccessor(e){let t=this,i=this.json,r=this.json.accessors[e];if(r.bufferView===void 0&&r.sparse===void 0){let a=wf[r.type],o=Ka[r.componentType],c=r.normalized===!0,l=new o(r.count*a);return Promise.resolve(new hn(l,a,c))}let s=[];return r.bufferView!==void 0?s.push(this.getDependency("bufferView",r.bufferView)):s.push(null),r.sparse!==void 0&&(s.push(this.getDependency("bufferView",r.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",r.sparse.values.bufferView))),Promise.all(s).then(function(a){let o=a[0],c=wf[r.type],l=Ka[r.componentType],u=l.BYTES_PER_ELEMENT,h=u*c,d=r.byteOffset||0,m=r.bufferView!==void 0?i.bufferViews[r.bufferView].byteStride:void 0,x=r.normalized===!0,v,g;if(m&&m!==h){let _=Math.floor(d/m),T="InterleavedBuffer:"+r.bufferView+":"+r.componentType+":"+_+":"+r.count,I=t.cache.get(T);I||(v=new l(o,_*m,r.count*m/u),I=new wa(v,m/u),t.cache.add(T,I)),g=new Ra(I,c,d%m/u,x)}else o===null?v=new l(r.count*c):v=new l(o,d,r.count*c),g=new hn(v,c,x);if(r.sparse!==void 0){let _=wf.SCALAR,T=Ka[r.sparse.indices.componentType],I=r.sparse.indices.byteOffset||0,E=r.sparse.values.byteOffset||0,w=new T(a[1],I,r.sparse.count*_),R=new l(a[2],E,r.sparse.count*c);o!==null&&(g=new hn(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let N=0,y=w.length;N<y;N++){let C=w[N];if(g.setX(C,R[N*c]),c>=2&&g.setY(C,R[N*c+1]),c>=3&&g.setZ(C,R[N*c+2]),c>=4&&g.setW(C,R[N*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=x}return g})}loadTexture(e){let t=this.json,i=this.options,s=t.textures[e].source,a=t.images[s],o=this.textureLoader;if(a.uri){let c=i.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(e,s,o)}loadTextureImage(e,t,i){let r=this,s=this.json,a=s.textures[e],o=s.images[t],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,i).then(function(u){u.flipY=!1,u.name=a.name||o.name||"",u.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(u.name=o.uri);let d=(s.samplers||{})[a.sampler]||{};return u.magFilter=u0[d.magFilter]||jt,u.minFilter=u0[d.minFilter]||Ii,u.wrapS=h0[d.wrapS]||Gr,u.wrapT=h0[d.wrapT]||Gr,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==Yt&&u.minFilter!==jt,r.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let i=this,r=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());let a=r.images[e],o=self.URL||self.webkitURL,c=a.uri||"",l=!1;if(a.bufferView!==void 0)c=i.getDependency("bufferView",a.bufferView).then(function(h){l=!0;let d=new Blob([h],{type:a.mimeType});return c=o.createObjectURL(d),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let u=Promise.resolve(c).then(function(h){return new Promise(function(d,m){let x=d;t.isImageBitmapLoader===!0&&(x=function(v){let g=new vn(v);g.needsUpdate=!0,d(g)}),t.load(yr.resolveURL(h,s.path),x,void 0,m)})}).then(function(h){return l===!0&&o.revokeObjectURL(c),ji(h,a),h.userData.mimeType=a.mimeType||DT(a.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),h});return this.sourceCache[e]=u,u}assignTexture(e,t,i,r){let s=this;return this.getDependency("texture",i.index).then(function(a){if(!a)return null;if(i.texCoord!==void 0&&i.texCoord>0&&(a=a.clone(),a.channel=i.texCoord),s.extensions[yt.KHR_TEXTURE_TRANSFORM]){let o=i.extensions!==void 0?i.extensions[yt.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let c=s.associations.get(a);a=s.extensions[yt.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),s.associations.set(a,c)}}return r!==void 0&&(a.colorSpace=r),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,i=e.material,r=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+i.uuid,c=this.cache.get(o);c||(c=new La,Gn.prototype.copy.call(c,i),c.color.copy(i.color),c.map=i.map,c.sizeAttenuation=!1,this.cache.add(o,c)),i=c}else if(e.isLine){let o="LineBasicMaterial:"+i.uuid,c=this.cache.get(o);c||(c=new Na,Gn.prototype.copy.call(c,i),c.color.copy(i.color),c.map=i.map,this.cache.add(o,c)),i=c}if(r||s||a){let o="ClonedMaterial:"+i.uuid+":";r&&(o+="derivative-tangents:"),s&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=i.clone(),s&&(c.vertexColors=!0),a&&(c.flatShading=!0),r&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(i))),i=c}e.material=i}getMaterialType(){return Is}loadMaterial(e){let t=this,i=this.json,r=this.extensions,s=i.materials[e],a,o={},c=s.extensions||{},l=[];if(c[yt.KHR_MATERIALS_UNLIT]){let h=r[yt.KHR_MATERIALS_UNLIT];a=h.getMaterialType(),l.push(h.extendParams(o,s,t))}else{let h=s.pbrMetallicRoughness||{};if(o.color=new Qe(1,1,1),o.opacity=1,Array.isArray(h.baseColorFactor)){let d=h.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],Ln),o.opacity=d[3]}h.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",h.baseColorTexture,nn)),o.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,o.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",h.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",h.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}s.doubleSided===!0&&(o.side=Un);let u=s.alphaMode||Rf.OPAQUE;if(u===Rf.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,u===Rf.MASK&&(o.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&a!==Hn&&(l.push(t.assignTexture(o,"normalMap",s.normalTexture)),o.normalScale=new dt(1,1),s.normalTexture.scale!==void 0)){let h=s.normalTexture.scale;o.normalScale.set(h,h)}if(s.occlusionTexture!==void 0&&a!==Hn&&(l.push(t.assignTexture(o,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&a!==Hn){let h=s.emissiveFactor;o.emissive=new Qe().setRGB(h[0],h[1],h[2],Ln)}return s.emissiveTexture!==void 0&&a!==Hn&&l.push(t.assignTexture(o,"emissiveMap",s.emissiveTexture,nn)),Promise.all(l).then(function(){let h=new a(o);return s.name&&(h.name=s.name),ji(h,s),t.associations.set(h,{materials:e}),s.extensions&&Os(r,h,s),h})}createUniqueName(e){let t=Vt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,i=this.extensions,r=this.primitiveCache;function s(o){return i[yt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return d0(c,o,t)})}let a=[];for(let o=0,c=e.length;o<c;o++){let l=e[o],u=LT(l),h=r[u];if(h)a.push(h.promise);else{let d;l.extensions&&l.extensions[yt.KHR_DRACO_MESH_COMPRESSION]?d=s(l):d=d0(new Mn,l,t),l.mode===mi.TRIANGLE_STRIP?d=d.then(m=>Af(m,ol)):l.mode===mi.TRIANGLE_FAN&&(d=d.then(m=>Af(m,Ha))),r[u]={primitive:l,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){let t=this,i=this.json,r=this.extensions,s=i.meshes[e],a=s.primitives,o=[];for(let c=0,l=a.length;c<l;c++){let u=a[c].material===void 0?CT(this.cache):this.getDependency("material",a[c].material);o.push(u)}return o.push(t.loadGeometries(a)),Promise.all(o).then(async function(c){let l=c.slice(0,c.length-1),u=c[c.length-1],h=[];for(let m=0,x=u.length;m<x;m++){let v=u[m],g=a[m],_,T=l[m];if(g.mode===mi.TRIANGLES||g.mode===mi.TRIANGLE_STRIP||g.mode===mi.TRIANGLE_FAN||g.mode===void 0){let I=s.isSkinnedMesh===!0,E=v.hasAttribute("skinIndex")&&v.hasAttribute("skinWeight");I&&E===!1&&console.warn("THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled."),_=I&&E?new Oo(v,T):new cn(v,T),_.isSkinnedMesh===!0&&_.normalizeSkinWeights()}else if(g.mode===mi.LINES)_=new ko(v,T);else if(g.mode===mi.LINE_STRIP)_=new ws(v,T);else if(g.mode===mi.LINE_LOOP)_=new zo(v,T);else if(g.mode===mi.POINTS)_=new Vo(v,T);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(_.geometry.morphAttributes).length>0&&NT(_,s),_.name=t.createUniqueName(s.name||"mesh_"+e),ji(_,s),g.extensions&&Os(r,_,g),t.assignFinalMaterial(_),h.push(_)}for(let m=0,x=h.length;m<x;m++)t.associations.set(h[m],{meshes:e,primitives:m});if(h.length===1)return s.extensions&&Os(r,h[0],s),h[0];let d=new Ai;s.extensions&&Os(r,d,s),t.associations.set(d,{meshes:e});for(let m=0,x=h.length;m<x;m++)d.add(h[m]);return d})}loadCamera(e){let t,i=this.json.cameras[e],r=i[i.type];if(!r){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return i.type==="perspective"?t=new _n(Wa.radToDeg(r.yfov),r.aspectRatio||1,r.znear||1,r.zfar||2e6):i.type==="orthographic"&&(t=new Xi(-r.xmag,r.xmag,r.ymag,-r.ymag,r.znear,r.zfar)),i.name&&(t.name=this.createUniqueName(i.name)),ji(t,i),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],i=[];for(let r=0,s=t.joints.length;r<s;r++)i.push(this._loadNodeShallow(t.joints[r]));return t.inverseBindMatrices!==void 0?i.push(this.getDependency("accessor",t.inverseBindMatrices)):i.push(null),Promise.all(i).then(function(r){let s=r.pop(),a=r,o=[],c=[];for(let l=0,u=a.length;l<u;l++){let h=a[l];if(h){o.push(h);let d=new at;s!==null&&d.fromArray(s.array,l*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Fo(o,c)})}loadAnimation(e){let t=this.json,i=this,r=t.animations[e],s=r.name?r.name:"animation_"+e,a=[],o=[],c=[],l=[],u=[];for(let h=0,d=r.channels.length;h<d;h++){let m=r.channels[h],x=r.samplers[m.sampler],v=m.target,g=v.node,_=r.parameters!==void 0?r.parameters[x.input]:x.input,T=r.parameters!==void 0?r.parameters[x.output]:x.output;v.node!==void 0&&(a.push(this.getDependency("node",g)),o.push(this.getDependency("accessor",_)),c.push(this.getDependency("accessor",T)),l.push(x),u.push(v))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(h){let d=h[0],m=h[1],x=h[2],v=h[3],g=h[4],_=[];for(let I=0,E=d.length;I<E;I++){let w=d[I],R=m[I],N=x[I],y=v[I],C=g[I];if(w===void 0)continue;w.updateMatrix&&w.updateMatrix();let B=i._createAnimationTracks(w,R,N,y,C);if(B)for(let W=0;W<B.length;W++)_.push(B[W])}let T=new qo(s,void 0,_);return ji(T,r),T})}createNodeMesh(e){let t=this.json,i=this,r=t.nodes[e];return r.mesh===void 0?null:i.getDependency("mesh",r.mesh).then(function(s){let a=i._getNodeRef(i.meshCache,r.mesh,s);return r.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=r.weights.length;c<l;c++)o.morphTargetInfluences[c]=r.weights[c]}),a})}loadNode(e){let t=this.json,i=this,r=t.nodes[e],s=i._loadNodeShallow(e),a=[],o=r.children||[];for(let l=0,u=o.length;l<u;l++)a.push(i.getDependency("node",o[l]));let c=r.skin===void 0?Promise.resolve(null):i.getDependency("skin",r.skin);return Promise.all([s,Promise.all(a),c]).then(function(l){let u=l[0],h=l[1],d=l[2];d!==null&&u.traverse(function(m){m.isSkinnedMesh&&m.bind(d,UT)});for(let m=0,x=h.length;m<x;m++)u.add(h[m]);if(u.userData.pivot!==void 0&&h.length>0){let m=u.userData.pivot,x=h[0];u.pivot=new K().fromArray(m),u.position.x-=m[0],u.position.y-=m[1],u.position.z-=m[2],x.position.set(0,0,0),delete u.userData.pivot}return u})}_loadNodeShallow(e){let t=this.json,i=this.extensions,r=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let s=t.nodes[e],a=s.name?r.createUniqueName(s.name):"",o=[],c=r._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),s.camera!==void 0&&o.push(r.getDependency("camera",s.camera).then(function(l){return r._getNodeRef(r.cameraCache,s.camera,l)})),r._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let u;if(s.isBone===!0?u=new Ia:l.length>1?u=new Ai:l.length===1?u=l[0]:u=new $t,u!==l[0])for(let h=0,d=l.length;h<d;h++)u.add(l[h]);if(s.name&&(u.userData.name=s.name,u.name=a),ji(u,s),s.extensions&&Os(i,u,s),s.matrix!==void 0){let h=new at;h.fromArray(s.matrix),u.applyMatrix4(h)}else s.translation!==void 0&&u.position.fromArray(s.translation),s.rotation!==void 0&&u.quaternion.fromArray(s.rotation),s.scale!==void 0&&u.scale.fromArray(s.scale);if(!r.associations.has(u))r.associations.set(u,{});else if(s.mesh!==void 0&&r.meshCache.refs[s.mesh]>1){let h=r.associations.get(u);r.associations.set(u,{...h})}return r.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){let t=this.extensions,i=this.json.scenes[e],r=this,s=new Ai;i.name&&(s.name=r.createUniqueName(i.name)),ji(s,i),i.extensions&&Os(t,s,i);let a=i.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(r.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let u=0,h=c.length;u<h;u++){let d=c[u];d.parent!==null?s.add(o0(d)):s.add(d)}let l=u=>{let h=new Map;for(let[d,m]of r.associations)(d instanceof Gn||d instanceof vn)&&h.set(d,m);return u.traverse(d=>{let m=r.associations.get(d);m!=null&&h.set(d,m)}),h};return r.associations=l(s),s})}_createAnimationTracks(e,t,i,r,s){let a=[],o=e.name?e.name:e.uuid,c=[];function l(m){m.morphTargetInfluences&&c.push(m.name?m.name:m.uuid)}Kr[s.path]===Kr.weights?(l(e),e.isGroup&&e.children.forEach(l)):c.push(o);let u;switch(Kr[s.path]){case Kr.weights:u=_r;break;case Kr.rotation:u=xr;break;case Kr.translation:case Kr.scale:u=Xr;break;default:i.itemSize===1?u=_r:u=Xr;break}let h=r.interpolation!==void 0?IT[r.interpolation]:Ts,d=this._getArrayFromAccessor(i);for(let m=0,x=c.length;m<x;m++){let v=new u(c[m]+"."+Kr[s.path],t.array,d,h);r.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(v),a.push(v)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let i=Qf(t.constructor),r=new Float32Array(t.length);for(let s=0,a=t.length;s<a;s++)r[s]=t[s]*i;t=r}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(i){let r=this instanceof xr?$f:Qu;return new r(this.times,this.values,this.getValueSize()/3,i)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function OT(n,e,t){let i=e.attributes,r=new ti;if(i.POSITION!==void 0){let o=t.json.accessors[i.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(r.set(new K(c[0],c[1],c[2]),new K(l[0],l[1],l[2])),o.normalized){let u=Qf(Ka[o.componentType]);r.min.multiplyScalar(u),r.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let s=e.targets;if(s!==void 0){let o=new K,c=new K;for(let l=0,u=s.length;l<u;l++){let h=s[l];if(h.POSITION!==void 0){let d=t.json.accessors[h.POSITION],m=d.min,x=d.max;if(m!==void 0&&x!==void 0){if(c.setX(Math.max(Math.abs(m[0]),Math.abs(x[0]))),c.setY(Math.max(Math.abs(m[1]),Math.abs(x[1]))),c.setZ(Math.max(Math.abs(m[2]),Math.abs(x[2]))),d.normalized){let v=Qf(Ka[d.componentType]);c.multiplyScalar(v)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}r.expandByVector(o)}n.boundingBox=r;let a=new Vn;r.getCenter(a.center),a.radius=r.min.distanceTo(r.max)/2,n.boundingSphere=a}function d0(n,e,t){let i=e.attributes,r=[];function s(a,o){return t.getDependency("accessor",a).then(function(c){n.setAttribute(o,c)})}for(let a in i){let o=Jf[a]||a.toLowerCase();o in n.attributes||r.push(s(i[a],o))}if(e.indices!==void 0&&!n.index){let a=t.getDependency("accessor",e.indices).then(function(o){n.setIndex(o)});r.push(a)}return xt.workingColorSpace!==Ln&&"COLOR_0"in i&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${xt.workingColorSpace}" not supported.`),ji(n,e),OT(n,e,t),Promise.all(r).then(function(){return e.targets!==void 0?PT(n,e.targets,t):n})}var p0=(n,e,t)=>Math.max(e,Math.min(t,n));function FT(n,e){return Math.max(0,Math.min(n.left+n.width,e.left+e.width)-Math.max(n.left,e.left))*Math.max(0,Math.min(n.top+n.height,e.top+e.height)-Math.max(n.top,e.top))}function m0(n,e,t=[]){let i=t.map(s=>({...s})),r=new Map;for(let s of[...n].sort((a,o)=>a.y-o.y||String(a.id).localeCompare(String(o.id)))){let{x:a,y:o,width:c,height:l}=s,u=a-c/2,h=[u,a-c+32,a-32,...i.flatMap(v=>[v.left-c-8,v.left+v.width+8])],d=[o-l-18,o+18,...i.flatMap(v=>[v.top-l-8,v.top+v.height+8])],m=null,x=1/0;for(let v of h)for(let g of d){let _=p0(v,16,Math.max(16,e.width-c-16)),T=g+l<=o-8?"above":g>=o+8?"below":null;if(!T||g<16||g+l>e.height-16||a>=48&&a<=e.width-16-32&&(a<_+16||a>_+c-16))continue;let I={left:_,top:g,width:c,height:l},E=i.reduce((N,y)=>N+FT(I,y),0),w=T==="above"?o-g-l:g-o,R=E*1e4+Math.abs(_-u)+Math.abs(w-18)*2+(T==="below"?200:0);R<x&&(x=R,m={...I,side:T,anchorX:a,anchorY:o})}m??={left:p0(u,16,Math.max(16,e.width-c-16)),top:o-l-18,width:c,height:l,side:"above",anchorX:a,anchorY:o},r.set(s.id,m),i.push(m)}return r}var BT=new Intl.Segmenter("fr",{granularity:"grapheme"}),dl=n=>[...BT.segment(n)].map(e=>e.segment);function tp(n,e,t,i=3){let r=[];for(let a of String(n).replace(/\r/g,"").split(`
`)){let o="";for(let c of dl(a)){if(o&&e(o+c)>t){let l=o.lastIndexOf(" ");l>0?(r.push(o.slice(0,l)),o=o.slice(l+1)):(r.push(o),o="")}o+=c}r.push(o.trimEnd())}let s=[];for(let a=0;a<r.length;a+=i)s.push(r.slice(a,a+i).join(`
`));return s}function np(n,e,t=32){let i=Math.min(n.length,Math.max(0,Math.floor(e*t/1e3)));return{text:n.slice(0,i).join(""),complete:i===n.length,expired:e>=n.length*1e3/t+Math.max(3e3,n.length*30)}}var eh=class{constructor(){this.seen=new Set,this.queues=new Map}receive(e){for(let t of e){if(!t.id||!t.author||!t.text?.trim()||this.seen.has(t.id))continue;this.seen.add(t.id),this.seen.size>1e3&&this.seen.delete(this.seen.values().next().value);let i=this.queues.get(t.author)??[];i.length>=5&&i.shift(),i.push(t),this.queues.set(t.author,i)}}next(e){return this.queues.get(e)?.shift()}remove(e){this.queues.delete(e)}};async function g0(n){let e=u=>new URL("dialogue/"+u,n).href,t=await new FontFace("AveriaSky",'url("'+e("AveriaSansLibre-Regular.ttf")+'")').load();document.fonts.add(t),await Promise.all(["frame.png","name.png","tail.png","continue.png"].map(async u=>{let h=new Image;h.src=e(u),await h.decode()}));let i=document.createElement("style");i.textContent=["#sky-dialogues{position:fixed;inset:0;pointer-events:none;z-index:10}",'.sky-dialogue{position:absolute;box-sizing:border-box;border:24px solid transparent;border-image:url("'+e("frame.png")+'") 32 fill / 24px stretch;color:#fff;font:24px/1.3 AveriaSky,sans-serif;filter:drop-shadow(2px 3px 2px #0009);text-shadow:1px 2px 1px #000;--speaker-x:70%;--tail-height:30px}','.sky-dialogue-name{color:#ffd778;font-size:27px;line-height:36px;height:36px;margin:-8px -8px 10px;padding:0 16px;overflow:hidden;white-space:nowrap;border-image:url("'+e("name.png")+'") 0 8 0 8 fill / 0 8px 0 8px stretch}',".sky-dialogue-text{white-space:pre-wrap;overflow-wrap:anywhere;padding-bottom:16px}",'.sky-dialogue-tail{position:absolute;left:calc(var(--speaker-x) - 30px);top:calc(100% + 14px);width:40px;height:var(--tail-height);background:url("'+e("tail.png")+'") center/100% 100% no-repeat}','.sky-dialogue-continue{position:absolute;bottom:-21px;left:calc(var(--speaker-x) - 12px);width:24px;height:26px;background:url("'+e("continue.png")+'") center/100% 100% no-repeat;animation:sky-dialogue-pulse .8s ease-in-out infinite alternate}','.sky-dialogue[data-side="below"] .sky-dialogue-tail{top:auto;bottom:calc(100% + 14px);transform:scaleY(-1)}','.sky-dialogue[data-side="below"] .sky-dialogue-continue{bottom:auto;top:-21px;rotate:180deg}',"@keyframes sky-dialogue-pulse{to{transform:translateY(3px)}}","@media(prefers-reduced-motion:reduce){.sky-dialogue-continue{animation:none}}"].join(`
`),document.head.append(i);let r=document.createElement("div");r.id="sky-dialogues",document.body.append(r);let s=new eh,a=new Map,o=document.createElement("canvas").getContext("2d");o.font="24px AveriaSky";function c(u){let h=Math.max(...u.text.split(`
`).map(m=>o.measureText(m).width)),d=o.measureText(u.character).width*27/24+32;return Math.min(560,innerWidth-32,Math.max(240,Math.max(h,d)+52))}function l(u,h,d){let m=c(h),x=tp(h.text,w=>o.measureText(w).width,m-48),v=document.createElement("section");v.className="sky-dialogue",v.dataset.author=u,v.style.width=m+"px",v.setAttribute("aria-label",h.character+" : "+h.text);let g=document.createElement("div");g.className="sky-dialogue-name",g.textContent=h.character;let _=document.createElement("div");_.className="sky-dialogue-text",_.style.height=Math.max(...x.map(w=>w.split(`
`).length))*31.2+"px";let T=document.createElement("div");T.className="sky-dialogue-tail";let I=document.createElement("div");I.className="sky-dialogue-continue",I.hidden=!0,v.append(g,_,T,I),r.append(v);let E={element:v,text:_,continuation:I,pages:x,page:0,characters:dl(x[0]),started:d,width:m,message:h};return a.set(u,E),E}return{receive(u){s.receive(u)},update(u,h,d){let m=[];for(let g of s.queues.keys())h.has(g)||s.remove(g);for(let[g,_]of a)h.has(g)||(_.element.remove(),a.delete(g),s.remove(g));for(let[g,_]of h){let T=a.get(g);if(!T){let y=s.next(g);y&&(T=l(g,y,u))}if(!T)continue;let I=c(T.message);T.width!==I&&(T.width=I,T.element.style.width=I+"px",T.pages=tp(T.message.text,y=>o.measureText(y).width,I-48),T.page=Math.min(T.page,T.pages.length-1),T.characters=dl(T.pages[T.page]),T.started=u,T.text.style.height=Math.max(...T.pages.map(y=>y.split(`
`).length))*31.2+"px");let E=np(T.characters,u-T.started);if(E.expired)if(++T.page<T.pages.length)T.started=u,T.characters=dl(T.pages[T.page]),E=np(T.characters,0);else{T.element.remove(),a.delete(g);continue}T.text.textContent=E.text,T.continuation.hidden=!E.complete;let w=new K(_.position.x,_.position.y+_.info.height,_.position.z).project(d),R=(w.x+1)*innerWidth/2,N=(1-w.y)*innerHeight/2;T.element.hidden=w.z<-1||w.z>1||R<0||R>innerWidth||N<0||N>innerHeight,T.element.hidden||m.push({id:g,x:R,y:N-8,width:T.width,height:T.element.offsetHeight})}let x=document.getElementById("hud")?.getBoundingClientRect(),v=m0(m,{width:innerWidth,height:innerHeight},x?[{left:x.left,top:x.top,width:x.width,height:x.height}]:[]);for(let[g,_]of v){let T=a.get(g);T.element.style.left=_.left+"px",T.element.style.top=_.top+"px",T.element.dataset.side=_.side,T.element.style.setProperty("--speaker-x",_.anchorX-_.left-24+"px");let I=_.side==="above"?_.anchorY-_.top-_.height+10:_.top-_.anchorY+10;T.element.style.setProperty("--tail-height",I/(22/24)+"px")}},dispose(){r.remove(),i.remove(),document.fonts.delete(t),a.clear()}}}function _0(n,e,t){return{x:Math.round((e-n.origin.x)/n.step),z:Math.round((t-n.origin.z)/n.step)}}function fl(n,e,t){return e<0||t<0||e>=n.width||t>=n.height?-1:t*n.width+e}function ja(n,e,t){let i=fl(n,e,t);return i>=0&&n.cells[i]!==null}function pl(n,e){return{x:n.origin.x+e.x*n.step,z:n.origin.z+e.z*n.step,y:n.cells[fl(n,e.x,e.z)]}}function ml(n,e){let t=_0(n,e.x,e.z);if(ja(n,t.x,t.z))return t;let i=null,r=1/0;for(let s=0;s<n.height;s++)for(let a=0;a<n.width;a++)if(ja(n,a,s)){let o=(a-t.x)**2+(s-t.z)**2;o<r&&(r=o,i={x:a,z:s})}return i}function ip(n,e,t){let i=ml(n,e),r=_0(n,t.x,t.z);if(!i||!ja(n,r.x,r.z))return[];let s=fl(n,i.x,i.z),a=fl(n,r.x,r.z),o=new Set([s]),c=new Map,l=new Map([[s,0]]),u=h=>Math.hypot(h%n.width-r.x,Math.floor(h/n.width)-r.z);for(;o.size;){let h=-1,d=1/0;for(let v of o){let g=l.get(v)+u(v);g<d&&(d=g,h=v)}if(h===a){let v=[];for(;h!==s;)v.push(pl(n,{x:h%n.width,z:Math.floor(h/n.width)})),h=c.get(h);return v.reverse()}o.delete(h);let m=h%n.width,x=Math.floor(h/n.width);for(let[v,g]of[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]){let _=m+v,T=x+g,I=fl(n,_,T);if(!ja(n,_,T)||Math.abs(n.cells[I]-n.cells[h])>.35||v&&g&&(!ja(n,m+v,x)||!ja(n,m,x+g)))continue;let E=l.get(h)+Math.hypot(v,g);E>=(l.get(I)??1/0)||(c.set(I,h),l.set(I,E),o.add(I))}}return[]}function rp(n,e,t,i=3.5){let r=Math.max(0,t)*i,s=0,a=0,o=0;for(;e.length&&r>0;){let c=e[0],l=c.x-n.x,u=c.z-n.z,h=Math.hypot(l,u);if(h<1e-6){e.shift();continue}let d=Math.min(h,r);a=l/h,o=u/h,n.x+=a*d,n.z+=o*d,n.y=(n.y??0)+((c.y??n.y??0)-(n.y??0))*(d/h),s+=d,r-=d,d>=h-1e-6&&e.shift()}return{moving:s>1e-5,dx:a,dz:o}}function x0(n,e,t,i){let r=n*t.x+e*t.z,s=n*i.x+e*i.z;return(Math.round((Math.PI-Math.atan2(s,r))/(Math.PI/4))%8+8)%8}var gl=new URL(new URLSearchParams(location.search).has("frame_id")?"/.proxy/assets/sky/":"./assets/sky/",location.href);async function v0(n){let e=new Zu({canvas:n,antialias:!1,alpha:!1});e.setPixelRatio(Math.min(devicePixelRatio,2)),e.setClearColor(2104088),e.outputColorSpace=nn;let t=new Lo,i=new Xi(-12,12,8,-8,.1,150),r=new Map,s=await fetch(new URL("characters.json",gl)).then(ne=>ne.json()),o=(await new $u().loadAsync(new URL("anterose.gltf",gl).href)).scene;t.add(o),o.traverse(ne=>{if(ne.isMesh){let me=Array.isArray(ne.material)?ne.material:[ne.material];for(let Oe of me)Oe.map&&(Oe.map.magFilter=Yt,Oe.map.minFilter=jt,Oe.map.needsUpdate=!0)}});let c=await fetch(new URL("navigation.json",gl)).then(ne=>ne.json()),l=await g0(gl),u=c.spawn??pl(c,ml(c,{x:0,z:0})),h=new Jo,d=new dt,m=new Set,x=[],v=0,g=Math.atan2(11,13),_=null,T=8,I=new K(u.x,u.y,u.z),E=null,w=performance.now(),R=!1,N=new Cs,y=new Map,C=new cn(new Wo(.15,.22,24),new Hn({color:16767364,side:Un,transparent:!0,opacity:.8}));C.rotation.x=-Math.PI/2,C.visible=!1,t.add(C);async function B(ne){let me=r.get(ne.id),Oe=s[ne.character]?ne.character:"Estelle";if(me&&me.character===Oe)return me.target={x:ne.x,y:ne.y??0,z:ne.z},me;me&&(t.remove(me.mesh),me.mesh.geometry.dispose(),me.mesh.material.map.dispose(),me.mesh.material.dispose());let Pe=s[Oe];y.has(Oe)||y.set(Oe,N.loadAsync(new URL(Pe.texture,gl).href));let et=await y.get(Oe),J=et.clone();J.colorSpace=nn,J.magFilter=Yt,J.minFilter=Yt,J.generateMipmaps=!1,J.repeat.set(1/Pe.columns,1/Pe.rows),J.needsUpdate=!0;let Y=new Rs(Pe.height*Pe.frameWidth/Pe.frameHeight,Pe.height);Y.translate(0,Pe.height/2,0);let Me=new cn(Y,new Hn({map:J,transparent:!0,alphaTest:.15,depthWrite:!0,side:Un}));return t.add(Me),me={mesh:Me,character:Oe,info:Pe,position:{x:ne.x??u.x,y:ne.y??u.y,z:ne.z??u.z},target:null,direction:6,heading:{dx:0,dz:-1},time:0},r.set(ne.id,me),me}function W(){let ne=innerWidth/innerHeight;i.left=-T*ne,i.right=T*ne,i.top=T,i.bottom=-T,i.updateProjectionMatrix(),e.setSize(innerWidth,innerHeight,!1)}function Z(ne){ne.target.closest?.("input,textarea,select,[contenteditable]")||["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," ","z","q","s","d","w","a","e","r"].includes(ne.key)&&(ne.preventDefault(),m.add(ne.key.toLowerCase()))}function ee(ne){m.delete(ne.key.toLowerCase())}function X(){m.clear(),he()}function Q(ne){if(ne.button!==0)return;d.set(ne.clientX/innerWidth*2-1,-ne.clientY/innerHeight*2+1),h.setFromCamera(d,i);let me=h.intersectObject(o,!0);if(!me.length)return;let Oe=r.get(E);if(Oe)for(let Pe of me){let et=ml(c,Pe.point);if(!et)continue;let J=pl(c,et);if(Math.hypot(J.x-Pe.point.x,J.z-Pe.point.z)>c.step*1.5||Math.abs(J.y-Pe.point.y)>.3)continue;let Y=ip(c,Oe.position,J);if(Y.length){x=Y,C.position.set(J.x,J.y+.03,J.z),C.visible=!0;break}}}function oe(ne){if(ne.button!==2){Q(ne);return}ne.preventDefault(),_={id:ne.pointerId,x:ne.clientX,y:ne.clientY},n.setPointerCapture(ne.pointerId)}function re(ne){!_||ne.pointerId!==_.id||(v-=(ne.clientX-_.x)*.006,g=Wa.clamp(g+(ne.clientY-_.y)*.005,Math.PI/9,Math.PI*5/12),_.x=ne.clientX,_.y=ne.clientY)}function he(){let ne=_;_=null,ne&&n.hasPointerCapture(ne.id)&&n.releasePointerCapture(ne.id)}function ie(ne){ne.preventDefault()}function le(ne){ne.preventDefault(),T=Wa.clamp(T+ne.deltaY*.005,4,15),W()}n.addEventListener("pointerdown",oe),n.addEventListener("pointermove",re),n.addEventListener("pointerup",he),n.addEventListener("pointercancel",he),n.addEventListener("lostpointercapture",he),n.addEventListener("contextmenu",ie),n.addEventListener("wheel",le,{passive:!1}),addEventListener("keydown",Z),addEventListener("keyup",ee),addEventListener("blur",X),addEventListener("resize",W),W();function de(ne){if(R)return;if(ne-w<33){requestAnimationFrame(de);return}let me=Math.min((ne-w)/1e3,.1);w=ne;let Oe=r.get(E);m.has("e")&&(v+=me*1.5),m.has("r")&&(v-=me*1.5),i.position.set(I.x+Math.sin(v)*Math.cos(g)*17,I.y+Math.sin(g)*17,I.z-Math.cos(v)*Math.cos(g)*17),i.lookAt(I),i.updateMatrixWorld();let Pe={x:i.matrixWorld.elements[0],z:i.matrixWorld.elements[2]},et=new K;if(i.getWorldDirection(et),et.y=0,et.normalize(),Oe){let J=Number(m.has("arrowright")||m.has("d"))-Number(m.has("arrowleft")||m.has("q")||m.has("a")),Y=Number(m.has("arrowup")||m.has("z")||m.has("w"))-Number(m.has("arrowdown")||m.has("s"));if(J||Y){let Me=Math.hypot(J,Y),Ze=(Pe.x*J+et.x*Y)/Me,be=(Pe.z*J+et.z*Y)/Me;x=ip(c,Oe.position,{x:Oe.position.x+Ze*.6,z:Oe.position.z+be*.6}),C.visible=!1}}for(let[J,Y]of r){let Me=J===E?rp(Y.position,x,me):rp(Y.position,Y.target?[Y.target]:[],me,6);Me.moving?(Y.heading={dx:Me.dx,dz:Me.dz},Y.time+=me):Y.time=0,Y.direction=x0(Y.heading.dx,Y.heading.dz,Pe,et);let Ze=Me.moving?Y.info.run:Y.info.idle,be=Ze[Math.floor(Y.time*Y.info.fps)%Ze.length],it=be*8+Y.direction%(Y.info.directions??8);Y.mesh.material.map.offset.set(it%Y.info.columns/Y.info.columns,1-(Math.floor(it/Y.info.columns)+1)/Y.info.rows),Y.mesh.position.set(Y.position.x,Y.position.y,Y.position.z),Y.mesh.rotation.y=Math.atan2(i.position.x-Y.position.x,i.position.z-Y.position.z)}Oe&&I.lerp(new K(Oe.position.x,Oe.position.y,Oe.position.z),1-Math.exp(-me*7)),x.length||(C.visible=!1),l.update(ne,r,i),e.render(t,i),requestAnimationFrame(de)}return requestAnimationFrame(de),{spawn:u,catalogue:s,messages(ne){l.receive(ne)},say(ne){},async demoConversation(){},async me(ne){E=ne.id,await B({...u,...ne})},async sync(ne){let me=new Set([E]);for(let Oe of ne)Oe.id!==E&&(me.add(Oe.id),await B(Oe));for(let[Oe,Pe]of r)me.has(Oe)||(t.remove(Pe.mesh),Pe.mesh.geometry.dispose(),Pe.mesh.material.map.dispose(),Pe.mesh.material.dispose(),r.delete(Oe))},correct(ne){let me=r.get(E);me&&ne&&Math.hypot(me.position.x-ne.x,me.position.z-ne.z)>.8&&(Object.assign(me.position,ne),x=[])},screenPoint(ne){let me=new K(ne.x,ne.y,ne.z).project(i);return{x:(me.x+1)*innerWidth/2,y:(1-me.y)*innerHeight/2}},cameraAngles(){return{yaw:v,pitch:g}},position(){return r.get(E)?.position??u},dispose(){R=!0,he(),n.removeEventListener("pointerdown",oe),n.removeEventListener("pointermove",re),n.removeEventListener("pointerup",he),n.removeEventListener("pointercancel",he),n.removeEventListener("lostpointercapture",he),n.removeEventListener("contextmenu",ie),n.removeEventListener("wheel",le),removeEventListener("keydown",Z),removeEventListener("keyup",ee),removeEventListener("blur",X),removeEventListener("resize",W),l.dispose(),e.dispose()}}}var sp=window.__CLIENT_ID__||"__CLIENT_ID__",b0=new URLSearchParams(location.search).has("frame_id"),kT=!1,Fs=document.getElementById("bandeau"),zT=document.getElementById("scene"),ap=window.__API_BASE__||(b0?"/.proxy/api":"/api"),op=n=>ap.endsWith(".php")?ap+"?r="+n:ap+"/"+n,_l=n=>{Fs.textContent=n},rn={salon:"local",moi:null,token:null,character:"Estelle",messageCursor:0},br;function y0(n){let e=new Uint8Array(n),t="";for(let i of e)t+=String.fromCharCode(i);return btoa(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}async function VT(){let n=y0(crypto.getRandomValues(new Uint8Array(32))),e=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(n));return{verifieur:n,defi:y0(e)}}function S0(n,e,t){return Promise.race([n,new Promise((i,r)=>{setTimeout(()=>r(new Error(`${t} (${e/1e3} s)`)),e)})])}async function GT(){let n=new xo(sp);_l(`1/4 SDK, client ${sp}`),await S0(n.ready(),1e4,"Discord n a pas repondu (SDK)"),_l("2/4 SDK pret, autorisation...");let{verifieur:e,defi:t}=await VT(),{code:i}=await S0(n.commands.authorize({client_id:sp,response_type:"code",state:"",prompt:"none",scope:["identify"],code_challenge:t,code_challenge_method:"S256"}),15e3,"Discord n a pas repondu (autorisation)");_l("3/4 code recu, jeton...");let r=await fetch(op("token"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({code:i,code_verifier:e})}),{access_token:s,erreur:a}=await r.json();if(!s)throw new Error(a??`jeton absent (HTTP ${r.status})`);_l("4/4 jeton recu, identification...");let o=await n.commands.authenticate({access_token:s});rn.salon=n.channelId??"local";let c=await fetch(op("profile"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+s},body:JSON.stringify({channel:rn.salon,guild:n.guildId})}),l=await c.json();if(!c.ok)throw new Error(l.erreur??"Personnage indisponible");rn.token=l.activity_token,rn.messageCursor=l.messageCursor??0,rn.character=l.character,rn.moi={id:o.user.id,nom:rn.character,character:rn.character,...l.player},Fs.textContent=`Connecte : ${rn.moi.nom}
Salon ${rn.salon}`}async function HT(){if(!rn.token)return;let n=await fetch(op("state"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+rn.token},body:JSON.stringify({...br.position(),after:rn.messageCursor})}),e=await n.json();if(!n.ok)throw new Error(e.erreur??"Connexion perdue");br.correct(e.position),await br.sync(e.joueurs),br.messages(e.messages??[]),rn.messageCursor=e.messageCursor??rn.messageCursor,e.character&&e.character!==rn.character&&(rn.character=e.character,await br.me({...rn.moi,...br.position(),character:e.character}),Fs.textContent="Votre personnage du jour : "+e.character)}async function WT(){if(!b0&&!kT){Fs.textContent="Ouvrez cette activit\xE9 depuis Discord.";return}_l("Chargement du restaurant Ant\xE9rose\u2026"),br=await v0(zT),await GT(),await br.me({...rn.moi,character:rn.character}),Fs.textContent="Votre personnage du jour : "+rn.character+(br.catalogue[rn.character]?"":" \xB7 sprite Estelle provisoire");async function n(){try{await HT()}catch(e){Fs.textContent=e.message}setTimeout(n,150)}n()}WT().catch(n=>{Fs.textContent="Chargement impossible : "+n.message,console.error(n)});
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/

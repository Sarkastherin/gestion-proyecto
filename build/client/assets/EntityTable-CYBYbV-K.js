import{R as D,r as s,d as no,j as z}from"./chunk-PVWAREVJ-Cl_c9Jt0.js";import{I as At,S as ro}from"./Inputs-cvlDeTHR.js";import{B as $n}from"./Buttons-C61rKE9q.js";import{a as oo,u as ao}from"./UIContext-9PjeG9pu.js";import{a as so,B as io}from"./Buttons-dijALP0_.js";var Z=function(){return Z=Object.assign||function(t){for(var n,r=1,o=arguments.length;r<o;r++){n=arguments[r];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t},Z.apply(this,arguments)};function ht(e,t,n){if(n||arguments.length===2)for(var r=0,o=t.length,a;r<o;r++)(a||!(r in t))&&(a||(a=Array.prototype.slice.call(t,0,r)),a[r]=t[r]);return e.concat(a||Array.prototype.slice.call(t))}var N="-ms-",Je="-moz-",H="-webkit-",qn="comm",vt="rule",Jt="decl",lo="@import",Jn="@keyframes",co="@layer",Zn=Math.abs,Zt=String.fromCharCode,zt=Object.assign;function uo(e,t){return U(e,0)^45?(((t<<2^U(e,0))<<2^U(e,1))<<2^U(e,2))<<2^U(e,3):0}function Xn(e){return e.trim()}function ye(e,t){return(e=t.exec(e))?e[0]:e}function k(e,t,n){return e.replace(t,n)}function ct(e,t,n){return e.indexOf(t,n)}function U(e,t){return e.charCodeAt(t)|0}function Me(e,t,n){return e.slice(t,n)}function xe(e){return e.length}function Qn(e){return e.length}function qe(e,t){return t.push(e),e}function po(e,t){return e.map(t).join("")}function En(e,t){return e.filter(function(n){return!ye(n,t)})}var Ct=1,Le=1,er=0,de=0,W=0,Ve="";function St(e,t,n,r,o,a,i,c){return{value:e,root:t,parent:n,type:r,props:o,children:a,line:Ct,column:Le,length:i,return:"",siblings:c}}function Re(e,t){return zt(St("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function Fe(e){for(;e.root;)e=Re(e.root,{children:[e]});qe(e,e.siblings)}function go(){return W}function fo(){return W=de>0?U(Ve,--de):0,Le--,W===10&&(Le=1,Ct--),W}function fe(){return W=de<er?U(Ve,de++):0,Le++,W===10&&(Le=1,Ct++),W}function De(){return U(Ve,de)}function dt(){return de}function Rt(e,t){return Me(Ve,e,t)}function Wt(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function ho(e){return Ct=Le=1,er=xe(Ve=e),de=0,[]}function mo(e){return Ve="",e}function _t(e){return Xn(Rt(de-1,Bt(e===91?e+2:e===40?e+1:e)))}function bo(e){for(;(W=De())&&W<33;)fe();return Wt(e)>2||Wt(W)>3?"":" "}function wo(e,t){for(;--t&&fe()&&!(W<48||W>102||W>57&&W<65||W>70&&W<97););return Rt(e,dt()+(t<6&&De()==32&&fe()==32))}function Bt(e){for(;fe();)switch(W){case e:return de;case 34:case 39:e!==34&&e!==39&&Bt(W);break;case 40:e===41&&Bt(e);break;case 92:fe();break}return de}function xo(e,t){for(;fe()&&e+W!==57;)if(e+W===84&&De()===47)break;return"/*"+Rt(t,de-1)+"*"+Zt(e===47?e:fe())}function yo(e){for(;!Wt(De());)fe();return Rt(e,de)}function vo(e){return mo(ut("",null,null,null,[""],e=ho(e),0,[0],e))}function ut(e,t,n,r,o,a,i,c,d){for(var h=0,u=0,p=i,y=0,m=0,b=0,E=1,P=1,O=1,w=0,x="",v=o,R=a,$=r,g=x;P;)switch(b=w,w=fe()){case 40:if(b!=108&&U(g,p-1)==58){ct(g+=k(_t(w),"&","&\f"),"&\f",Zn(h?c[h-1]:0))!=-1&&(O=-1);break}case 34:case 39:case 91:g+=_t(w);break;case 9:case 10:case 13:case 32:g+=bo(b);break;case 92:g+=wo(dt()-1,7);continue;case 47:switch(De()){case 42:case 47:qe(Co(xo(fe(),dt()),t,n,d),d);break;default:g+="/"}break;case 123*E:c[h++]=xe(g)*O;case 125*E:case 59:case 0:switch(w){case 0:case 125:P=0;case 59+u:O==-1&&(g=k(g,/\f/g,"")),m>0&&xe(g)-p&&qe(m>32?Pn(g+";",r,n,p-1,d):Pn(k(g," ","")+";",r,n,p-2,d),d);break;case 59:g+=";";default:if(qe($=On(g,t,n,h,u,o,c,x,v=[],R=[],p,a),a),w===123)if(u===0)ut(g,t,$,$,v,a,p,c,R);else switch(y===99&&U(g,3)===110?100:y){case 100:case 108:case 109:case 115:ut(e,$,$,r&&qe(On(e,$,$,0,0,o,c,x,o,v=[],p,R),R),o,R,p,c,r?v:R);break;default:ut(g,$,$,$,[""],R,0,c,R)}}h=u=m=0,E=O=1,x=g="",p=i;break;case 58:p=1+xe(g),m=b;default:if(E<1){if(w==123)--E;else if(w==125&&E++==0&&fo()==125)continue}switch(g+=Zt(w),w*E){case 38:O=u>0?1:(g+="\f",-1);break;case 44:c[h++]=(xe(g)-1)*O,O=1;break;case 64:De()===45&&(g+=_t(fe())),y=De(),u=p=xe(x=g+=yo(dt())),w++;break;case 45:b===45&&xe(g)==2&&(E=0)}}return a}function On(e,t,n,r,o,a,i,c,d,h,u,p){for(var y=o-1,m=o===0?a:[""],b=Qn(m),E=0,P=0,O=0;E<r;++E)for(var w=0,x=Me(e,y+1,y=Zn(P=i[E])),v=e;w<b;++w)(v=Xn(P>0?m[w]+" "+x:k(x,/&\f/g,m[w])))&&(d[O++]=v);return St(e,t,n,o===0?vt:c,d,h,u,p)}function Co(e,t,n,r){return St(e,t,n,qn,Zt(go()),Me(e,2,-2),0,r)}function Pn(e,t,n,r,o){return St(e,t,n,Jt,Me(e,0,r),Me(e,r+1,-1),r,o)}function tr(e,t,n){switch(uo(e,t)){case 5103:return H+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return H+e+e;case 4789:return Je+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return H+e+Je+e+N+e+e;case 5936:switch(U(e,t+11)){case 114:return H+e+N+k(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return H+e+N+k(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return H+e+N+k(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return H+e+N+e+e;case 6165:return H+e+N+"flex-"+e+e;case 5187:return H+e+k(e,/(\w+).+(:[^]+)/,H+"box-$1$2"+N+"flex-$1$2")+e;case 5443:return H+e+N+"flex-item-"+k(e,/flex-|-self/g,"")+(ye(e,/flex-|baseline/)?"":N+"grid-row-"+k(e,/flex-|-self/g,""))+e;case 4675:return H+e+N+"flex-line-pack"+k(e,/align-content|flex-|-self/g,"")+e;case 5548:return H+e+N+k(e,"shrink","negative")+e;case 5292:return H+e+N+k(e,"basis","preferred-size")+e;case 6060:return H+"box-"+k(e,"-grow","")+H+e+N+k(e,"grow","positive")+e;case 4554:return H+k(e,/([^-])(transform)/g,"$1"+H+"$2")+e;case 6187:return k(k(k(e,/(zoom-|grab)/,H+"$1"),/(image-set)/,H+"$1"),e,"")+e;case 5495:case 3959:return k(e,/(image-set\([^]*)/,H+"$1$`$1");case 4968:return k(k(e,/(.+:)(flex-)?(.*)/,H+"box-pack:$3"+N+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+H+e+e;case 4200:if(!ye(e,/flex-|baseline/))return N+"grid-column-align"+Me(e,t)+e;break;case 2592:case 3360:return N+k(e,"template-","")+e;case 4384:case 3616:return n&&n.some(function(r,o){return t=o,ye(r.props,/grid-\w+-end/)})?~ct(e+(n=n[t].value),"span",0)?e:N+k(e,"-start","")+e+N+"grid-row-span:"+(~ct(n,"span",0)?ye(n,/\d+/):+ye(n,/\d+/)-+ye(e,/\d+/))+";":N+k(e,"-start","")+e;case 4896:case 4128:return n&&n.some(function(r){return ye(r.props,/grid-\w+-start/)})?e:N+k(k(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return k(e,/(.+)-inline(.+)/,H+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(xe(e)-1-t>6)switch(U(e,t+1)){case 109:if(U(e,t+4)!==45)break;case 102:return k(e,/(.+:)(.+)-([^]+)/,"$1"+H+"$2-$3$1"+Je+(U(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~ct(e,"stretch",0)?tr(k(e,"stretch","fill-available"),t,n)+e:e}break;case 5152:case 5920:return k(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(r,o,a,i,c,d,h){return N+o+":"+a+h+(i?N+o+"-span:"+(c?d:+d-+a)+h:"")+e});case 4949:if(U(e,t+6)===121)return k(e,":",":"+H)+e;break;case 6444:switch(U(e,U(e,14)===45?18:11)){case 120:return k(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+H+(U(e,14)===45?"inline-":"")+"box$3$1"+H+"$2$3$1"+N+"$2box$3")+e;case 100:return k(e,":",":"+N)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return k(e,"scroll-","scroll-snap-")+e}return e}function mt(e,t){for(var n="",r=0;r<e.length;r++)n+=t(e[r],r,e,t)||"";return n}function So(e,t,n,r){switch(e.type){case co:if(e.children.length)break;case lo:case Jt:return e.return=e.return||e.value;case qn:return"";case Jn:return e.return=e.value+"{"+mt(e.children,r)+"}";case vt:if(!xe(e.value=e.props.join(",")))return""}return xe(n=mt(e.children,r))?e.return=e.value+"{"+n+"}":""}function Ro(e){var t=Qn(e);return function(n,r,o,a){for(var i="",c=0;c<t;c++)i+=e[c](n,r,o,a)||"";return i}}function $o(e){return function(t){t.root||(t=t.return)&&e(t)}}function Eo(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case Jt:e.return=tr(e.value,e.length,n);return;case Jn:return mt([Re(e,{value:k(e.value,"@","@"+H)})],r);case vt:if(e.length)return po(n=e.props,function(o){switch(ye(o,r=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":Fe(Re(e,{props:[k(o,/:(read-\w+)/,":"+Je+"$1")]})),Fe(Re(e,{props:[o]})),zt(e,{props:En(n,r)});break;case"::placeholder":Fe(Re(e,{props:[k(o,/:(plac\w+)/,":"+H+"input-$1")]})),Fe(Re(e,{props:[k(o,/:(plac\w+)/,":"+Je+"$1")]})),Fe(Re(e,{props:[k(o,/:(plac\w+)/,N+"input-$1")]})),Fe(Re(e,{props:[o]})),zt(e,{props:En(n,r)});break}return""})}}var Oo={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},ie={},ze=typeof process<"u"&&ie!==void 0&&(ie.REACT_APP_SC_ATTR||ie.SC_ATTR)||"data-styled",nr="active",rr="data-styled-version",$t="6.1.19",Xt=`/*!sc*/
`,bt=typeof window<"u"&&typeof document<"u",Po=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&ie!==void 0&&ie.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&ie.REACT_APP_SC_DISABLE_SPEEDY!==""?ie.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&ie.REACT_APP_SC_DISABLE_SPEEDY:typeof process<"u"&&ie!==void 0&&ie.SC_DISABLE_SPEEDY!==void 0&&ie.SC_DISABLE_SPEEDY!==""&&ie.SC_DISABLE_SPEEDY!=="false"&&ie.SC_DISABLE_SPEEDY),Et=Object.freeze([]),We=Object.freeze({});function ko(e,t,n){return n===void 0&&(n=We),e.theme!==n.theme&&e.theme||t||n.theme}var or=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),Do=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,Io=/(^-|-$)/g;function kn(e){return e.replace(Do,"-").replace(Io,"")}var jo=/(a)(d)/gi,at=52,Dn=function(e){return String.fromCharCode(e+(e>25?39:97))};function Gt(e){var t,n="";for(t=Math.abs(e);t>at;t=t/at|0)n=Dn(t%at)+n;return(Dn(t%at)+n).replace(jo,"$1-$2")}var Tt,ar=5381,Ne=function(e,t){for(var n=t.length;n;)e=33*e^t.charCodeAt(--n);return e},sr=function(e){return Ne(ar,e)};function Ao(e){return Gt(sr(e)>>>0)}function _o(e){return e.displayName||e.name||"Component"}function Ht(e){return typeof e=="string"&&!0}var ir=typeof Symbol=="function"&&Symbol.for,lr=ir?Symbol.for("react.memo"):60115,To=ir?Symbol.for("react.forward_ref"):60112,Ho={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},Fo={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},cr={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},No=((Tt={})[To]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},Tt[lr]=cr,Tt);function In(e){return("type"in(t=e)&&t.type.$$typeof)===lr?cr:"$$typeof"in e?No[e.$$typeof]:Ho;var t}var Mo=Object.defineProperty,Lo=Object.getOwnPropertyNames,jn=Object.getOwnPropertySymbols,zo=Object.getOwnPropertyDescriptor,Wo=Object.getPrototypeOf,An=Object.prototype;function dr(e,t,n){if(typeof t!="string"){if(An){var r=Wo(t);r&&r!==An&&dr(e,r,n)}var o=Lo(t);jn&&(o=o.concat(jn(t)));for(var a=In(e),i=In(t),c=0;c<o.length;++c){var d=o[c];if(!(d in Fo||n&&n[d]||i&&d in i||a&&d in a)){var h=zo(t,d);try{Mo(e,d,h)}catch{}}}}return e}function je(e){return typeof e=="function"}function Qt(e){return typeof e=="object"&&"styledComponentId"in e}function ke(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function _n(e,t){if(e.length===0)return"";for(var n=e[0],r=1;r<e.length;r++)n+=e[r];return n}function Qe(e){return e!==null&&typeof e=="object"&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function Vt(e,t,n){if(n===void 0&&(n=!1),!n&&!Qe(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var r=0;r<t.length;r++)e[r]=Vt(e[r],t[r]);else if(Qe(t))for(var r in t)e[r]=Vt(e[r],t[r]);return e}function en(e,t){Object.defineProperty(e,"toString",{value:t})}function Ae(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var Bo=(function(){function e(t){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=t}return e.prototype.indexOfGroup=function(t){for(var n=0,r=0;r<t;r++)n+=this.groupSizes[r];return n},e.prototype.insertRules=function(t,n){if(t>=this.groupSizes.length){for(var r=this.groupSizes,o=r.length,a=o;t>=a;)if((a<<=1)<0)throw Ae(16,"".concat(t));this.groupSizes=new Uint32Array(a),this.groupSizes.set(r),this.length=a;for(var i=o;i<a;i++)this.groupSizes[i]=0}for(var c=this.indexOfGroup(t+1),d=(i=0,n.length);i<d;i++)this.tag.insertRule(c,n[i])&&(this.groupSizes[t]++,c++)},e.prototype.clearGroup=function(t){if(t<this.length){var n=this.groupSizes[t],r=this.indexOfGroup(t),o=r+n;this.groupSizes[t]=0;for(var a=r;a<o;a++)this.tag.deleteRule(r)}},e.prototype.getGroup=function(t){var n="";if(t>=this.length||this.groupSizes[t]===0)return n;for(var r=this.groupSizes[t],o=this.indexOfGroup(t),a=o+r,i=o;i<a;i++)n+="".concat(this.tag.getRule(i)).concat(Xt);return n},e})(),pt=new Map,wt=new Map,gt=1,st=function(e){if(pt.has(e))return pt.get(e);for(;wt.has(gt);)gt++;var t=gt++;return pt.set(e,t),wt.set(t,e),t},Go=function(e,t){gt=t+1,pt.set(e,t),wt.set(t,e)},Vo="style[".concat(ze,"][").concat(rr,'="').concat($t,'"]'),Yo=new RegExp("^".concat(ze,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),Uo=function(e,t,n){for(var r,o=n.split(","),a=0,i=o.length;a<i;a++)(r=o[a])&&e.registerName(t,r)},Ko=function(e,t){for(var n,r=((n=t.textContent)!==null&&n!==void 0?n:"").split(Xt),o=[],a=0,i=r.length;a<i;a++){var c=r[a].trim();if(c){var d=c.match(Yo);if(d){var h=0|parseInt(d[1],10),u=d[2];h!==0&&(Go(u,h),Uo(e,u,d[3]),e.getTag().insertRules(h,o)),o.length=0}else o.push(c)}}},Tn=function(e){for(var t=document.querySelectorAll(Vo),n=0,r=t.length;n<r;n++){var o=t[n];o&&o.getAttribute(ze)!==nr&&(Ko(e,o),o.parentNode&&o.parentNode.removeChild(o))}};function qo(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null}var ur=function(e){var t=document.head,n=e||t,r=document.createElement("style"),o=(function(c){var d=Array.from(c.querySelectorAll("style[".concat(ze,"]")));return d[d.length-1]})(n),a=o!==void 0?o.nextSibling:null;r.setAttribute(ze,nr),r.setAttribute(rr,$t);var i=qo();return i&&r.setAttribute("nonce",i),n.insertBefore(r,a),r},Jo=(function(){function e(t){this.element=ur(t),this.element.appendChild(document.createTextNode("")),this.sheet=(function(n){if(n.sheet)return n.sheet;for(var r=document.styleSheets,o=0,a=r.length;o<a;o++){var i=r[o];if(i.ownerNode===n)return i}throw Ae(17)})(this.element),this.length=0}return e.prototype.insertRule=function(t,n){try{return this.sheet.insertRule(n,t),this.length++,!0}catch{return!1}},e.prototype.deleteRule=function(t){this.sheet.deleteRule(t),this.length--},e.prototype.getRule=function(t){var n=this.sheet.cssRules[t];return n&&n.cssText?n.cssText:""},e})(),Zo=(function(){function e(t){this.element=ur(t),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(t,n){if(t<=this.length&&t>=0){var r=document.createTextNode(n);return this.element.insertBefore(r,this.nodes[t]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(t){this.element.removeChild(this.nodes[t]),this.length--},e.prototype.getRule=function(t){return t<this.length?this.nodes[t].textContent:""},e})(),Xo=(function(){function e(t){this.rules=[],this.length=0}return e.prototype.insertRule=function(t,n){return t<=this.length&&(this.rules.splice(t,0,n),this.length++,!0)},e.prototype.deleteRule=function(t){this.rules.splice(t,1),this.length--},e.prototype.getRule=function(t){return t<this.length?this.rules[t]:""},e})(),Hn=bt,Qo={isServer:!bt,useCSSOMInjection:!Po},pr=(function(){function e(t,n,r){t===void 0&&(t=We),n===void 0&&(n={});var o=this;this.options=Z(Z({},Qo),t),this.gs=n,this.names=new Map(r),this.server=!!t.isServer,!this.server&&bt&&Hn&&(Hn=!1,Tn(this)),en(this,function(){return(function(a){for(var i=a.getTag(),c=i.length,d="",h=function(p){var y=(function(O){return wt.get(O)})(p);if(y===void 0)return"continue";var m=a.names.get(y),b=i.getGroup(p);if(m===void 0||!m.size||b.length===0)return"continue";var E="".concat(ze,".g").concat(p,'[id="').concat(y,'"]'),P="";m!==void 0&&m.forEach(function(O){O.length>0&&(P+="".concat(O,","))}),d+="".concat(b).concat(E,'{content:"').concat(P,'"}').concat(Xt)},u=0;u<c;u++)h(u);return d})(o)})}return e.registerId=function(t){return st(t)},e.prototype.rehydrate=function(){!this.server&&bt&&Tn(this)},e.prototype.reconstructWithOptions=function(t,n){return n===void 0&&(n=!0),new e(Z(Z({},this.options),t),this.gs,n&&this.names||void 0)},e.prototype.allocateGSInstance=function(t){return this.gs[t]=(this.gs[t]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(t=(function(n){var r=n.useCSSOMInjection,o=n.target;return n.isServer?new Xo(o):r?new Jo(o):new Zo(o)})(this.options),new Bo(t)));var t},e.prototype.hasNameForId=function(t,n){return this.names.has(t)&&this.names.get(t).has(n)},e.prototype.registerName=function(t,n){if(st(t),this.names.has(t))this.names.get(t).add(n);else{var r=new Set;r.add(n),this.names.set(t,r)}},e.prototype.insertRules=function(t,n,r){this.registerName(t,n),this.getTag().insertRules(st(t),r)},e.prototype.clearNames=function(t){this.names.has(t)&&this.names.get(t).clear()},e.prototype.clearRules=function(t){this.getTag().clearGroup(st(t)),this.clearNames(t)},e.prototype.clearTag=function(){this.tag=void 0},e})(),ea=/&/g,ta=/^\s*\/\/.*$/gm;function gr(e,t){return e.map(function(n){return n.type==="rule"&&(n.value="".concat(t," ").concat(n.value),n.value=n.value.replaceAll(",",",".concat(t," ")),n.props=n.props.map(function(r){return"".concat(t," ").concat(r)})),Array.isArray(n.children)&&n.type!=="@keyframes"&&(n.children=gr(n.children,t)),n})}function na(e){var t,n,r,o=We,a=o.options,i=a===void 0?We:a,c=o.plugins,d=c===void 0?Et:c,h=function(y,m,b){return b.startsWith(n)&&b.endsWith(n)&&b.replaceAll(n,"").length>0?".".concat(t):y},u=d.slice();u.push(function(y){y.type===vt&&y.value.includes("&")&&(y.props[0]=y.props[0].replace(ea,n).replace(r,h))}),i.prefix&&u.push(Eo),u.push(So);var p=function(y,m,b,E){m===void 0&&(m=""),b===void 0&&(b=""),E===void 0&&(E="&"),t=E,n=m,r=new RegExp("\\".concat(n,"\\b"),"g");var P=y.replace(ta,""),O=vo(b||m?"".concat(b," ").concat(m," { ").concat(P," }"):P);i.namespace&&(O=gr(O,i.namespace));var w=[];return mt(O,Ro(u.concat($o(function(x){return w.push(x)})))),w};return p.hash=d.length?d.reduce(function(y,m){return m.name||Ae(15),Ne(y,m.name)},ar).toString():"",p}var ra=new pr,Yt=na(),fr=D.createContext({shouldForwardProp:void 0,styleSheet:ra,stylis:Yt});fr.Consumer;D.createContext(void 0);function Fn(){return s.useContext(fr)}var oa=(function(){function e(t,n){var r=this;this.inject=function(o,a){a===void 0&&(a=Yt);var i=r.name+a.hash;o.hasNameForId(r.id,i)||o.insertRules(r.id,i,a(r.rules,i,"@keyframes"))},this.name=t,this.id="sc-keyframes-".concat(t),this.rules=n,en(this,function(){throw Ae(12,String(r.name))})}return e.prototype.getName=function(t){return t===void 0&&(t=Yt),this.name+t.hash},e})(),aa=function(e){return e>="A"&&e<="Z"};function Nn(e){for(var t="",n=0;n<e.length;n++){var r=e[n];if(n===1&&r==="-"&&e[0]==="-")return e;aa(r)?t+="-"+r.toLowerCase():t+=r}return t.startsWith("ms-")?"-"+t:t}var hr=function(e){return e==null||e===!1||e===""},mr=function(e){var t,n,r=[];for(var o in e){var a=e[o];e.hasOwnProperty(o)&&!hr(a)&&(Array.isArray(a)&&a.isCss||je(a)?r.push("".concat(Nn(o),":"),a,";"):Qe(a)?r.push.apply(r,ht(ht(["".concat(o," {")],mr(a),!1),["}"],!1)):r.push("".concat(Nn(o),": ").concat((t=o,(n=a)==null||typeof n=="boolean"||n===""?"":typeof n!="number"||n===0||t in Oo||t.startsWith("--")?String(n).trim():"".concat(n,"px")),";")))}return r};function Ie(e,t,n,r){if(hr(e))return[];if(Qt(e))return[".".concat(e.styledComponentId)];if(je(e)){if(!je(a=e)||a.prototype&&a.prototype.isReactComponent||!t)return[e];var o=e(t);return Ie(o,t,n,r)}var a;return e instanceof oa?n?(e.inject(n,r),[e.getName(r)]):[e]:Qe(e)?mr(e):Array.isArray(e)?Array.prototype.concat.apply(Et,e.map(function(i){return Ie(i,t,n,r)})):[e.toString()]}function sa(e){for(var t=0;t<e.length;t+=1){var n=e[t];if(je(n)&&!Qt(n))return!1}return!0}var ia=sr($t),la=(function(){function e(t,n,r){this.rules=t,this.staticRulesId="",this.isStatic=(r===void 0||r.isStatic)&&sa(t),this.componentId=n,this.baseHash=Ne(ia,n),this.baseStyle=r,pr.registerId(n)}return e.prototype.generateAndInjectStyles=function(t,n,r){var o=this.baseStyle?this.baseStyle.generateAndInjectStyles(t,n,r):"";if(this.isStatic&&!r.hash)if(this.staticRulesId&&n.hasNameForId(this.componentId,this.staticRulesId))o=ke(o,this.staticRulesId);else{var a=_n(Ie(this.rules,t,n,r)),i=Gt(Ne(this.baseHash,a)>>>0);if(!n.hasNameForId(this.componentId,i)){var c=r(a,".".concat(i),void 0,this.componentId);n.insertRules(this.componentId,i,c)}o=ke(o,i),this.staticRulesId=i}else{for(var d=Ne(this.baseHash,r.hash),h="",u=0;u<this.rules.length;u++){var p=this.rules[u];if(typeof p=="string")h+=p;else if(p){var y=_n(Ie(p,t,n,r));d=Ne(d,y+u),h+=y}}if(h){var m=Gt(d>>>0);n.hasNameForId(this.componentId,m)||n.insertRules(this.componentId,m,r(h,".".concat(m),void 0,this.componentId)),o=ke(o,m)}}return o},e})(),xt=D.createContext(void 0);xt.Consumer;function ca(e){var t=D.useContext(xt),n=s.useMemo(function(){return(function(r,o){if(!r)throw Ae(14);if(je(r)){var a=r(o);return a}if(Array.isArray(r)||typeof r!="object")throw Ae(8);return o?Z(Z({},o),r):r})(e.theme,t)},[e.theme,t]);return e.children?D.createElement(xt.Provider,{value:n},e.children):null}var Ft={};function da(e,t,n){var r=Qt(e),o=e,a=!Ht(e),i=t.attrs,c=i===void 0?Et:i,d=t.componentId,h=d===void 0?(function(v,R){var $=typeof v!="string"?"sc":kn(v);Ft[$]=(Ft[$]||0)+1;var g="".concat($,"-").concat(Ao($t+$+Ft[$]));return R?"".concat(R,"-").concat(g):g})(t.displayName,t.parentComponentId):d,u=t.displayName,p=u===void 0?(function(v){return Ht(v)?"styled.".concat(v):"Styled(".concat(_o(v),")")})(e):u,y=t.displayName&&t.componentId?"".concat(kn(t.displayName),"-").concat(t.componentId):t.componentId||h,m=r&&o.attrs?o.attrs.concat(c).filter(Boolean):c,b=t.shouldForwardProp;if(r&&o.shouldForwardProp){var E=o.shouldForwardProp;if(t.shouldForwardProp){var P=t.shouldForwardProp;b=function(v,R){return E(v,R)&&P(v,R)}}else b=E}var O=new la(n,y,r?o.componentStyle:void 0);function w(v,R){return(function($,g,j){var X=$.attrs,B=$.componentStyle,re=$.defaultProps,oe=$.foldedComponentIds,M=$.styledComponentId,he=$.target,me=D.useContext(xt),le=Fn(),Q=$.shouldForwardProp||le.shouldForwardProp,ve=ko(g,me,re)||We,f=(function(ee,K,ue){for(var ce,te=Z(Z({},K),{className:void 0,theme:ue}),be=0;be<ee.length;be+=1){var se=je(ce=ee[be])?ce(te):ce;for(var q in se)te[q]=q==="className"?ke(te[q],se[q]):q==="style"?Z(Z({},te[q]),se[q]):se[q]}return K.className&&(te.className=ke(te.className,K.className)),te})(X,g,ve),_=f.as||he,F={};for(var A in f)f[A]===void 0||A[0]==="$"||A==="as"||A==="theme"&&f.theme===ve||(A==="forwardedAs"?F.as=f.forwardedAs:Q&&!Q(A,_)||(F[A]=f[A]));var ae=(function(ee,K){var ue=Fn(),ce=ee.generateAndInjectStyles(K,ue.styleSheet,ue.stylis);return ce})(B,f),L=ke(oe,M);return ae&&(L+=" "+ae),f.className&&(L+=" "+f.className),F[Ht(_)&&!or.has(_)?"class":"className"]=L,j&&(F.ref=j),s.createElement(_,F)})(x,v,R)}w.displayName=p;var x=D.forwardRef(w);return x.attrs=m,x.componentStyle=O,x.displayName=p,x.shouldForwardProp=b,x.foldedComponentIds=r?ke(o.foldedComponentIds,o.styledComponentId):"",x.styledComponentId=y,x.target=r?o.target:e,Object.defineProperty(x,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(v){this._foldedDefaultProps=r?(function(R){for(var $=[],g=1;g<arguments.length;g++)$[g-1]=arguments[g];for(var j=0,X=$;j<X.length;j++)Vt(R,X[j],!0);return R})({},o.defaultProps,v):v}}),en(x,function(){return".".concat(x.styledComponentId)}),a&&dr(x,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),x}function Mn(e,t){for(var n=[e[0]],r=0,o=t.length;r<o;r+=1)n.push(t[r],e[r+1]);return n}var Ln=function(e){return Object.assign(e,{isCss:!0})};function Y(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];if(je(e)||Qe(e))return Ln(Ie(Mn(Et,ht([e],t,!0))));var r=e;return t.length===0&&r.length===1&&typeof r[0]=="string"?Ie(r):Ln(Ie(Mn(r,t)))}function Ut(e,t,n){if(n===void 0&&(n=We),!t)throw Ae(1,t);var r=function(o){for(var a=[],i=1;i<arguments.length;i++)a[i-1]=arguments[i];return e(t,n,Y.apply(void 0,ht([o],a,!1)))};return r.attrs=function(o){return Ut(e,t,Z(Z({},n),{attrs:Array.prototype.concat(n.attrs,o).filter(Boolean)}))},r.withConfig=function(o){return Ut(e,t,Z(Z({},n),o))},r}var br=function(e){return Ut(da,e)},I=br;or.forEach(function(e){I[e]=br(e)});var Ee;function Be(e,t){return e[t]}function ua(e=[],t,n=0){return[...e.slice(0,n),t,...e.slice(n)]}function pa(e=[],t,n="id"){const r=e.slice(),o=Be(t,n);return o?r.splice(r.findIndex((a=>Be(a,n)===o)),1):r.splice(r.findIndex((a=>a===t)),1),r}function zn(e){return e.map(((t,n)=>{const r=Object.assign(Object.assign({},t),{sortable:t.sortable||!!t.sortFunction||void 0});return t.id||(r.id=n+1),r}))}function Ze(e,t){return Math.ceil(e/t)}function Nt(e,t){return Math.min(e,t)}(function(e){e.ASC="asc",e.DESC="desc"})(Ee||(Ee={}));const V=()=>null;function wr(e,t=[],n=[]){let r={},o=[...n];return t.length&&t.forEach((a=>{if(!a.when||typeof a.when!="function")throw new Error('"when" must be defined in the conditional style object and must be function');a.when(e)&&(r=a.style||{},a.classNames&&(o=[...o,...a.classNames]),typeof a.style=="function"&&(r=a.style(e)||{}))})),{conditionalStyle:r,classNames:o.join(" ")}}function ft(e,t=[],n="id"){const r=Be(e,n);return r?t.some((o=>Be(o,n)===r)):t.some((o=>o===e))}function it(e,t){return t?e.findIndex((n=>Xe(n.id,t))):-1}function Xe(e,t){return e==t}function ga(e,t){const n=!e.toggleOnSelectedRowsChange;switch(t.type){case"SELECT_ALL_ROWS":{const{keyField:r,rows:o,rowCount:a,mergeSelections:i}=t,c=!e.allSelected,d=!e.toggleOnSelectedRowsChange;if(i){const h=c?[...e.selectedRows,...o.filter((u=>!ft(u,e.selectedRows,r)))]:e.selectedRows.filter((u=>!ft(u,o,r)));return Object.assign(Object.assign({},e),{allSelected:c,selectedCount:h.length,selectedRows:h,toggleOnSelectedRowsChange:d})}return Object.assign(Object.assign({},e),{allSelected:c,selectedCount:c?a:0,selectedRows:c?o:[],toggleOnSelectedRowsChange:d})}case"SELECT_SINGLE_ROW":{const{keyField:r,row:o,isSelected:a,rowCount:i,singleSelect:c}=t;return c?a?Object.assign(Object.assign({},e),{selectedCount:0,allSelected:!1,selectedRows:[],toggleOnSelectedRowsChange:n}):Object.assign(Object.assign({},e),{selectedCount:1,allSelected:!1,selectedRows:[o],toggleOnSelectedRowsChange:n}):a?Object.assign(Object.assign({},e),{selectedCount:e.selectedRows.length>0?e.selectedRows.length-1:0,allSelected:!1,selectedRows:pa(e.selectedRows,o,r),toggleOnSelectedRowsChange:n}):Object.assign(Object.assign({},e),{selectedCount:e.selectedRows.length+1,allSelected:e.selectedRows.length+1===i,selectedRows:ua(e.selectedRows,o),toggleOnSelectedRowsChange:n})}case"SELECT_MULTIPLE_ROWS":{const{keyField:r,selectedRows:o,totalRows:a,mergeSelections:i}=t;if(i){const c=[...e.selectedRows,...o.filter((d=>!ft(d,e.selectedRows,r)))];return Object.assign(Object.assign({},e),{selectedCount:c.length,allSelected:!1,selectedRows:c,toggleOnSelectedRowsChange:n})}return Object.assign(Object.assign({},e),{selectedCount:o.length,allSelected:o.length===a,selectedRows:o,toggleOnSelectedRowsChange:n})}case"CLEAR_SELECTED_ROWS":{const{selectedRowsFlag:r}=t;return Object.assign(Object.assign({},e),{allSelected:!1,selectedCount:0,selectedRows:[],selectedRowsFlag:r})}case"SORT_CHANGE":{const{sortDirection:r,selectedColumn:o,clearSelectedOnSort:a}=t;return Object.assign(Object.assign(Object.assign({},e),{selectedColumn:o,sortDirection:r,currentPage:1}),a&&{allSelected:!1,selectedCount:0,selectedRows:[],toggleOnSelectedRowsChange:n})}case"CHANGE_PAGE":{const{page:r,paginationServer:o,visibleOnly:a,persistSelectedOnPageChange:i}=t,c=o&&i,d=o&&!i||a;return Object.assign(Object.assign(Object.assign(Object.assign({},e),{currentPage:r}),c&&{allSelected:!1}),d&&{allSelected:!1,selectedCount:0,selectedRows:[],toggleOnSelectedRowsChange:n})}case"CHANGE_ROWS_PER_PAGE":{const{rowsPerPage:r,page:o}=t;return Object.assign(Object.assign({},e),{currentPage:o,rowsPerPage:r})}}}const fa=Y`
	pointer-events: none;
	opacity: 0.4;
`,ha=I.div`
	position: relative;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	max-width: 100%;
	${({disabled:e})=>e&&fa};
	${({theme:e})=>e.table.style};
`,ma=Y`
	position: sticky;
	position: -webkit-sticky; /* Safari */
	top: 0;
	z-index: 1;
`,ba=I.div`
	display: flex;
	width: 100%;
	${({$fixedHeader:e})=>e&&ma};
	${({theme:e})=>e.head.style};
`,wa=I.div`
	display: flex;
	align-items: stretch;
	width: 100%;
	${({theme:e})=>e.headRow.style};
	${({$dense:e,theme:t})=>e&&t.headRow.denseStyle};
`,xr=(e,...t)=>Y`
		@media screen and (max-width: ${599}px) {
			${Y(e,...t)}
		}
	`,xa=(e,...t)=>Y`
		@media screen and (max-width: ${959}px) {
			${Y(e,...t)}
		}
	`,ya=(e,...t)=>Y`
		@media screen and (max-width: ${1280}px) {
			${Y(e,...t)}
		}
	`,va=e=>(t,...n)=>Y`
			@media screen and (max-width: ${e}px) {
				${Y(t,...n)}
			}
		`,Ye=I.div`
	position: relative;
	display: flex;
	align-items: center;
	box-sizing: border-box;
	line-height: normal;
	${({theme:e,$headCell:t})=>e[t?"headCells":"cells"].style};
	${({$noPadding:e})=>e&&"padding: 0"};
`,yr=I(Ye)`
	flex-grow: ${({button:e,grow:t})=>t===0||e?0:t||1};
	flex-shrink: 0;
	flex-basis: 0;
	max-width: ${({maxWidth:e})=>e||"100%"};
	min-width: ${({minWidth:e})=>e||"100px"};
	${({width:e})=>e&&Y`
			min-width: ${e};
			max-width: ${e};
		`};
	${({right:e})=>e&&"justify-content: flex-end"};
	${({button:e,center:t})=>(t||e)&&"justify-content: center"};
	${({compact:e,button:t})=>(e||t)&&"padding: 0"};

	/* handle hiding cells */
	${({hide:e})=>e&&e==="sm"&&xr`
    display: none;
  `};
	${({hide:e})=>e&&e==="md"&&xa`
    display: none;
  `};
	${({hide:e})=>e&&e==="lg"&&ya`
    display: none;
  `};
	${({hide:e})=>e&&Number.isInteger(e)&&va(e)`
    display: none;
  `};
`,Ca=Y`
	div:first-child {
		white-space: ${({$wrapCell:e})=>e?"normal":"nowrap"};
		overflow: ${({$allowOverflow:e})=>e?"visible":"hidden"};
		text-overflow: ellipsis;
	}
`,Sa=I(yr).attrs((e=>({style:e.style})))`
	${({$renderAsCell:e})=>!e&&Ca};
	${({theme:e,$isDragging:t})=>t&&e.cells.draggingStyle};
	${({$cellStyle:e})=>e};
`;var Ra=s.memo((function({id:e,column:t,row:n,rowIndex:r,dataTag:o,isDragging:a,onDragStart:i,onDragOver:c,onDragEnd:d,onDragEnter:h,onDragLeave:u}){const{conditionalStyle:p,classNames:y}=wr(n,t.conditionalCellStyles,["rdt_TableCell"]);return s.createElement(Sa,{id:e,"data-column-id":t.id,role:"cell",className:y,"data-tag":o,$cellStyle:t.style,$renderAsCell:!!t.cell,$allowOverflow:t.allowOverflow,button:t.button,center:t.center,compact:t.compact,grow:t.grow,hide:t.hide,maxWidth:t.maxWidth,minWidth:t.minWidth,right:t.right,width:t.width,$wrapCell:t.wrap,style:p,$isDragging:a,onDragStart:i,onDragOver:c,onDragEnd:d,onDragEnter:h,onDragLeave:u},!t.cell&&s.createElement("div",{"data-tag":o},(function(m,b,E,P){return b?E&&typeof E=="function"?E(m,P):b(m,P):null})(n,t.selector,t.format,r)),t.cell&&t.cell(n,r,t,e))}));const Wn="input";var vr=s.memo((function({name:e,component:t=Wn,componentOptions:n={style:{}},indeterminate:r=!1,checked:o=!1,disabled:a=!1,onClick:i=V}){const c=t,d=c!==Wn?n.style:(u=>Object.assign(Object.assign({fontSize:"18px"},!u&&{cursor:"pointer"}),{padding:0,marginTop:"1px",verticalAlign:"middle",position:"relative"}))(a),h=s.useMemo((()=>(function(u,...p){let y;return Object.keys(u).map((m=>u[m])).forEach(((m,b)=>{typeof m=="function"&&(y=Object.assign(Object.assign({},u),{[Object.keys(u)[b]]:m(...p)}))})),y||u})(n,r)),[n,r]);return s.createElement(c,Object.assign({type:"checkbox",ref:u=>{u&&(u.indeterminate=r)},style:d,onClick:a?V:i,name:e,"aria-label":e,checked:o,disabled:a},h,{onChange:V}))}));const $a=I(Ye)`
	flex: 0 0 48px;
	min-width: 48px;
	justify-content: center;
	align-items: center;
	user-select: none;
	white-space: nowrap;
`;function Ea({name:e,keyField:t,row:n,rowCount:r,selected:o,selectableRowsComponent:a,selectableRowsComponentProps:i,selectableRowsSingle:c,selectableRowDisabled:d,onSelectedRow:h}){const u=!(!d||!d(n));return s.createElement($a,{onClick:p=>p.stopPropagation(),className:"rdt_TableCell",$noPadding:!0},s.createElement(vr,{name:e,component:a,componentOptions:i,checked:o,"aria-checked":o,onClick:()=>{h({type:"SELECT_SINGLE_ROW",row:n,isSelected:o,keyField:t,rowCount:r,singleSelect:c})},disabled:u}))}const Oa=I.button`
	display: inline-flex;
	align-items: center;
	user-select: none;
	white-space: nowrap;
	border: none;
	background-color: transparent;
	${({theme:e})=>e.expanderButton.style};
`;function Pa({disabled:e=!1,expanded:t=!1,expandableIcon:n,id:r,row:o,onToggled:a}){const i=t?n.expanded:n.collapsed;return s.createElement(Oa,{"aria-disabled":e,onClick:()=>a&&a(o),"data-testid":`expander-button-${r}`,disabled:e,"aria-label":t?"Collapse Row":"Expand Row",role:"button",type:"button"},i)}const ka=I(Ye)`
	white-space: nowrap;
	font-weight: 400;
	min-width: 48px;
	${({theme:e})=>e.expanderCell.style};
`;function Da({row:e,expanded:t=!1,expandableIcon:n,id:r,onToggled:o,disabled:a=!1}){return s.createElement(ka,{onClick:i=>i.stopPropagation(),$noPadding:!0},s.createElement(Pa,{id:r,row:e,expanded:t,expandableIcon:n,disabled:a,onToggled:o}))}const Ia=I.div`
	width: 100%;
	box-sizing: border-box;
	${({theme:e})=>e.expanderRow.style};
	${({$extendedRowStyle:e})=>e};
`;var ja=s.memo((function({data:e,ExpanderComponent:t,expanderComponentProps:n,extendedRowStyle:r,extendedClassNames:o}){const a=["rdt_ExpanderRow",...o.split(" ").filter((i=>i!=="rdt_TableRow"))].join(" ");return s.createElement(Ia,{className:a,$extendedRowStyle:r},s.createElement(t,Object.assign({data:e},n)))}));const Mt="allowRowEvents";var yt,Kt,Bn;(function(e){e.LTR="ltr",e.RTL="rtl",e.AUTO="auto"})(yt||(yt={})),(function(e){e.LEFT="left",e.RIGHT="right",e.CENTER="center"})(Kt||(Kt={})),(function(e){e.SM="sm",e.MD="md",e.LG="lg"})(Bn||(Bn={}));const Aa=Y`
	&:hover {
		${({$highlightOnHover:e,theme:t})=>e&&t.rows.highlightOnHoverStyle};
	}
`,_a=Y`
	&:hover {
		cursor: pointer;
	}
`,Ta=I.div.attrs((e=>({style:e.style})))`
	display: flex;
	align-items: stretch;
	align-content: stretch;
	width: 100%;
	box-sizing: border-box;
	${({theme:e})=>e.rows.style};
	${({$dense:e,theme:t})=>e&&t.rows.denseStyle};
	${({$striped:e,theme:t})=>e&&t.rows.stripedStyle};
	${({$highlightOnHover:e})=>e&&Aa};
	${({$pointerOnHover:e})=>e&&_a};
	${({$selected:e,theme:t})=>e&&t.rows.selectedHighlightStyle};
	${({$conditionalStyle:e})=>e};
`;function Ha({columns:e=[],conditionalRowStyles:t=[],defaultExpanded:n=!1,defaultExpanderDisabled:r=!1,dense:o=!1,expandableIcon:a,expandableRows:i=!1,expandableRowsComponent:c,expandableRowsComponentProps:d,expandableRowsHideExpander:h,expandOnRowClicked:u=!1,expandOnRowDoubleClicked:p=!1,highlightOnHover:y=!1,id:m,expandableInheritConditionalStyles:b,keyField:E,onRowClicked:P=V,onRowDoubleClicked:O=V,onRowMouseEnter:w=V,onRowMouseLeave:x=V,onRowExpandToggled:v=V,onSelectedRow:R=V,pointerOnHover:$=!1,row:g,rowCount:j,rowIndex:X,selectableRowDisabled:B=null,selectableRows:re=!1,selectableRowsComponent:oe,selectableRowsComponentProps:M,selectableRowsHighlight:he=!1,selectableRowsSingle:me=!1,selected:le,striped:Q=!1,draggingColumnId:ve,onDragStart:f,onDragOver:_,onDragEnd:F,onDragEnter:A,onDragLeave:ae}){const[L,ee]=s.useState(n);s.useEffect((()=>{ee(n)}),[n]);const K=s.useCallback((()=>{ee(!L),v(!L,g)}),[L,v,g]),ue=$||i&&(u||p),ce=s.useCallback((G=>{G.target.getAttribute("data-tag")===Mt&&(P(g,G),!r&&i&&u&&K())}),[r,u,i,K,P,g]),te=s.useCallback((G=>{G.target.getAttribute("data-tag")===Mt&&(O(g,G),!r&&i&&p&&K())}),[r,p,i,K,O,g]),be=s.useCallback((G=>{w(g,G)}),[w,g]),se=s.useCallback((G=>{x(g,G)}),[x,g]),q=Be(g,E),{conditionalStyle:tt,classNames:nt}=wr(g,t,["rdt_TableRow"]),Ot=he&&le,Pt=b?tt:{},kt=Q&&X%2==0;return s.createElement(s.Fragment,null,s.createElement(Ta,{id:`row-${m}`,role:"row",$striped:kt,$highlightOnHover:y,$pointerOnHover:!r&&ue,$dense:o,onClick:ce,onDoubleClick:te,onMouseEnter:be,onMouseLeave:se,className:nt,$selected:Ot,$conditionalStyle:tt},re&&s.createElement(Ea,{name:`select-row-${q}`,keyField:E,row:g,rowCount:j,selected:le,selectableRowsComponent:oe,selectableRowsComponentProps:M,selectableRowDisabled:B,selectableRowsSingle:me,onSelectedRow:R}),i&&!h&&s.createElement(Da,{id:q,expandableIcon:a,expanded:L,row:g,onToggled:K,disabled:r}),e.map((G=>G.omit?null:s.createElement(Ra,{id:`cell-${G.id}-${q}`,key:`cell-${G.id}-${q}`,dataTag:G.ignoreRowClick||G.button?null:Mt,column:G,row:g,rowIndex:X,isDragging:Xe(ve,G.id),onDragStart:f,onDragOver:_,onDragEnd:F,onDragEnter:A,onDragLeave:ae})))),i&&L&&s.createElement(ja,{key:`expander-${q}`,data:g,extendedRowStyle:Pt,extendedClassNames:nt,ExpanderComponent:c,expanderComponentProps:d}))}const Fa=I.span`
	padding: 2px;
	color: inherit;
	flex-grow: 0;
	flex-shrink: 0;
	${({$sortActive:e})=>e?"opacity: 1":"opacity: 0"};
	${({$sortDirection:e})=>e==="desc"&&"transform: rotate(180deg)"};
`,Na=({sortActive:e,sortDirection:t})=>D.createElement(Fa,{$sortActive:e,$sortDirection:t},"▲"),Ma=I(yr)`
	${({button:e})=>e&&"text-align: center"};
	${({theme:e,$isDragging:t})=>t&&e.headCells.draggingStyle};
`,La=Y`
	cursor: pointer;
	span.__rdt_custom_sort_icon__ {
		i,
		svg {
			transform: 'translate3d(0, 0, 0)';
			${({$sortActive:e})=>e?"opacity: 1":"opacity: 0"};
			color: inherit;
			font-size: 18px;
			height: 18px;
			width: 18px;
			backface-visibility: hidden;
			transform-style: preserve-3d;
			transition-duration: 95ms;
			transition-property: transform;
		}

		&.asc i,
		&.asc svg {
			transform: rotate(180deg);
		}
	}

	${({$sortActive:e})=>!e&&Y`
			&:hover,
			&:focus {
				opacity: 0.7;

				span,
				span.__rdt_custom_sort_icon__ * {
					opacity: 0.7;
				}
			}
		`};
`,za=I.div`
	display: inline-flex;
	align-items: center;
	justify-content: inherit;
	height: 100%;
	width: 100%;
	outline: none;
	user-select: none;
	overflow: hidden;
	${({disabled:e})=>!e&&La};
`,Wa=I.div`
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;var Ba=s.memo((function({column:e,disabled:t,draggingColumnId:n,selectedColumn:r={},sortDirection:o,sortIcon:a,sortServer:i,pagination:c,paginationServer:d,persistSelectedOnSort:h,selectableRowsVisibleOnly:u,onSort:p,onDragStart:y,onDragOver:m,onDragEnd:b,onDragEnter:E,onDragLeave:P}){s.useEffect((()=>{typeof e.selector=="string"&&console.error(`Warning: ${e.selector} is a string based column selector which has been deprecated as of v7 and will be removed in v8. Instead, use a selector function e.g. row => row[field]...`)}),[]);const[O,w]=s.useState(!1),x=s.useRef(null);if(s.useEffect((()=>{x.current&&w(x.current.scrollWidth>x.current.clientWidth)}),[O]),e.omit)return null;const v=()=>{if(!e.sortable&&!e.selector)return;let M=o;Xe(r.id,e.id)&&(M=o===Ee.ASC?Ee.DESC:Ee.ASC),p({type:"SORT_CHANGE",sortDirection:M,selectedColumn:e,clearSelectedOnSort:c&&d&&!h||i||u})},R=M=>s.createElement(Na,{sortActive:M,sortDirection:o}),$=()=>s.createElement("span",{className:[o,"__rdt_custom_sort_icon__"].join(" ")},a),g=!(!e.sortable||!Xe(r.id,e.id)),j=!e.sortable||t,X=e.sortable&&!a&&!e.right,B=e.sortable&&!a&&e.right,re=e.sortable&&a&&!e.right,oe=e.sortable&&a&&e.right;return s.createElement(Ma,{"data-column-id":e.id,className:"rdt_TableCol",$headCell:!0,allowOverflow:e.allowOverflow,button:e.button,compact:e.compact,grow:e.grow,hide:e.hide,maxWidth:e.maxWidth,minWidth:e.minWidth,right:e.right,center:e.center,width:e.width,draggable:e.reorder,$isDragging:Xe(e.id,n),onDragStart:y,onDragOver:m,onDragEnd:b,onDragEnter:E,onDragLeave:P},e.name&&s.createElement(za,{"data-column-id":e.id,"data-sort-id":e.id,role:"columnheader",tabIndex:0,className:"rdt_TableCol_Sortable",onClick:j?void 0:v,onKeyPress:j?void 0:M=>{M.key==="Enter"&&v()},$sortActive:!j&&g,disabled:j},!j&&oe&&$(),!j&&B&&R(g),typeof e.name=="string"?s.createElement(Wa,{title:O?e.name:void 0,ref:x,"data-column-id":e.id},e.name):e.name,!j&&re&&$(),!j&&X&&R(g)))}));const Ga=I(Ye)`
	flex: 0 0 48px;
	justify-content: center;
	align-items: center;
	user-select: none;
	white-space: nowrap;
	font-size: unset;
`;function Va({headCell:e=!0,rowData:t,keyField:n,allSelected:r,mergeSelections:o,selectedRows:a,selectableRowsComponent:i,selectableRowsComponentProps:c,selectableRowDisabled:d,onSelectAllRows:h}){const u=a.length>0&&!r,p=d?t.filter((b=>!d(b))):t,y=p.length===0,m=Math.min(t.length,p.length);return s.createElement(Ga,{className:"rdt_TableCol",$headCell:e,$noPadding:!0},s.createElement(vr,{name:"select-all-rows",component:i,componentOptions:c,onClick:()=>{h({type:"SELECT_ALL_ROWS",rows:p,rowCount:m,mergeSelections:o,keyField:n})},checked:r,indeterminate:u,disabled:y}))}function Cr(e=yt.AUTO){const t=typeof window=="object",[n,r]=s.useState(!1);return s.useEffect((()=>{if(t)if(e!=="auto")r(e==="rtl");else{const o=!(!window.document||!window.document.createElement),a=document.getElementsByTagName("BODY")[0],i=document.getElementsByTagName("HTML")[0],c=a.dir==="rtl"||i.dir==="rtl";r(o&&c)}}),[e,t]),n}const Ya=I.div`
	display: flex;
	align-items: center;
	flex: 1 0 auto;
	height: 100%;
	color: ${({theme:e})=>e.contextMenu.fontColor};
	font-size: ${({theme:e})=>e.contextMenu.fontSize};
	font-weight: 400;
`,Ua=I.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	flex-wrap: wrap;
`,Gn=I.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	box-sizing: inherit;
	z-index: 1;
	align-items: center;
	justify-content: space-between;
	display: flex;
	${({$rtl:e})=>e&&"direction: rtl"};
	${({theme:e})=>e.contextMenu.style};
	${({theme:e,$visible:t})=>t&&e.contextMenu.activeStyle};
`;function Ka({contextMessage:e,contextActions:t,contextComponent:n,selectedCount:r,direction:o}){const a=Cr(o),i=r>0;return n?s.createElement(Gn,{$visible:i},s.cloneElement(n,{selectedCount:r})):s.createElement(Gn,{$visible:i,$rtl:a},s.createElement(Ya,null,((c,d,h)=>{if(d===0)return null;const u=d===1?c.singular:c.plural;return h?`${d} ${c.message||""} ${u}`:`${d} ${u} ${c.message||""}`})(e,r,a)),s.createElement(Ua,null,t))}const qa=I.div`
	position: relative;
	box-sizing: border-box;
	overflow: hidden;
	display: flex;
	flex: 1 1 auto;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	flex-wrap: wrap;
	${({theme:e})=>e.header.style}
`,Ja=I.div`
	flex: 1 0 auto;
	color: ${({theme:e})=>e.header.fontColor};
	font-size: ${({theme:e})=>e.header.fontSize};
	font-weight: 400;
`,Za=I.div`
	flex: 1 0 auto;
	display: flex;
	align-items: center;
	justify-content: flex-end;

	> * {
		margin-left: 5px;
	}
`,Xa=({title:e,actions:t=null,contextMessage:n,contextActions:r,contextComponent:o,selectedCount:a,direction:i,showMenu:c=!0})=>s.createElement(qa,{className:"rdt_TableHeader",role:"heading","aria-level":1},s.createElement(Ja,null,e),t&&s.createElement(Za,null,t),c&&s.createElement(Ka,{contextMessage:n,contextActions:r,contextComponent:o,direction:i,selectedCount:a}));function Sr(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function"){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n}const Qa={left:"flex-start",right:"flex-end",center:"center"},es=I.header`
	position: relative;
	display: flex;
	flex: 1 1 auto;
	box-sizing: border-box;
	align-items: center;
	padding: 4px 16px 4px 24px;
	width: 100%;
	justify-content: ${({align:e})=>Qa[e]};
	flex-wrap: ${({$wrapContent:e})=>e?"wrap":"nowrap"};
	${({theme:e})=>e.subHeader.style}
`,ts=e=>{var{align:t="right",wrapContent:n=!0}=e,r=Sr(e,["align","wrapContent"]);return s.createElement(es,Object.assign({align:t,$wrapContent:n},r))},ns=I.div`
	display: flex;
	flex-direction: column;
`,rs=I.div`
	position: relative;
	width: 100%;
	border-radius: inherit;
	${({$responsive:e,$fixedHeader:t})=>e&&Y`
			overflow-x: auto;

			// hidden prevents vertical scrolling in firefox when fixedHeader is disabled
			overflow-y: ${t?"auto":"hidden"};
			min-height: 0;
		`};

	${({$fixedHeader:e=!1,$fixedHeaderScrollHeight:t="100vh"})=>e&&Y`
			max-height: ${t};
			-webkit-overflow-scrolling: touch;
		`};

	${({theme:e})=>e.responsiveWrapper.style};
`,Vn=I.div`
	position: relative;
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	${e=>e.theme.progress.style};
`,os=I.div`
	position: relative;
	width: 100%;
	${({theme:e})=>e.tableWrapper.style};
`,as=I(Ye)`
	white-space: nowrap;
	${({theme:e})=>e.expanderCell.style};
`,ss=I.div`
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	${({theme:e})=>e.noData.style};
`,is=()=>D.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},D.createElement("path",{d:"M7 10l5 5 5-5z"}),D.createElement("path",{d:"M0 0h24v24H0z",fill:"none"})),ls=I.select`
	cursor: pointer;
	height: 24px;
	max-width: 100%;
	user-select: none;
	padding-left: 8px;
	padding-right: 24px;
	box-sizing: content-box;
	font-size: inherit;
	color: inherit;
	border: none;
	background-color: transparent;
	appearance: none;
	direction: ltr;
	flex-shrink: 0;

	&::-ms-expand {
		display: none;
	}

	&:disabled::-ms-expand {
		background: #f60;
	}

	option {
		color: initial;
	}
`,cs=I.div`
	position: relative;
	flex-shrink: 0;
	font-size: inherit;
	color: inherit;
	margin-top: 1px;

	svg {
		top: 0;
		right: 0;
		color: inherit;
		position: absolute;
		fill: currentColor;
		width: 24px;
		height: 24px;
		display: inline-block;
		user-select: none;
		pointer-events: none;
	}
`,ds=e=>{var{defaultValue:t,onChange:n}=e,r=Sr(e,["defaultValue","onChange"]);return s.createElement(cs,null,s.createElement(ls,Object.assign({onChange:n,defaultValue:t},r)),s.createElement(is,null))},l={columns:[],data:[],title:"",keyField:"id",selectableRows:!1,selectableRowsHighlight:!1,selectableRowsNoSelectAll:!1,selectableRowSelected:null,selectableRowDisabled:null,selectableRowsComponent:"input",selectableRowsComponentProps:{},selectableRowsVisibleOnly:!1,selectableRowsSingle:!1,clearSelectedRows:!1,expandableRows:!1,expandableRowDisabled:null,expandableRowExpanded:null,expandOnRowClicked:!1,expandableRowsHideExpander:!1,expandOnRowDoubleClicked:!1,expandableInheritConditionalStyles:!1,expandableRowsComponent:function(){return D.createElement("div",null,"To add an expander pass in a component instance via ",D.createElement("strong",null,"expandableRowsComponent"),". You can then access props.data from this component.")},expandableIcon:{collapsed:D.createElement((()=>D.createElement("svg",{fill:"currentColor",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg"},D.createElement("path",{d:"M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"}),D.createElement("path",{d:"M0-.25h24v24H0z",fill:"none"}))),null),expanded:D.createElement((()=>D.createElement("svg",{fill:"currentColor",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg"},D.createElement("path",{d:"M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"}),D.createElement("path",{d:"M0-.75h24v24H0z",fill:"none"}))),null)},expandableRowsComponentProps:{},progressPending:!1,progressComponent:D.createElement("div",{style:{fontSize:"24px",fontWeight:700,padding:"24px"}},"Loading..."),persistTableHead:!1,sortIcon:null,sortFunction:null,sortServer:!1,striped:!1,highlightOnHover:!1,pointerOnHover:!1,noContextMenu:!1,contextMessage:{singular:"item",plural:"items",message:"selected"},actions:null,contextActions:null,contextComponent:null,defaultSortFieldId:null,defaultSortAsc:!0,responsive:!0,noDataComponent:D.createElement("div",{style:{padding:"24px"}},"There are no records to display"),disabled:!1,noTableHead:!1,noHeader:!1,subHeader:!1,subHeaderAlign:Kt.RIGHT,subHeaderWrap:!0,subHeaderComponent:null,fixedHeader:!1,fixedHeaderScrollHeight:"100vh",pagination:!1,paginationServer:!1,paginationServerOptions:{persistSelectedOnSort:!1,persistSelectedOnPageChange:!1},paginationDefaultPage:1,paginationResetDefaultPage:!1,paginationTotalRows:0,paginationPerPage:10,paginationRowsPerPageOptions:[10,15,20,25,30],paginationComponent:null,paginationComponentOptions:{},paginationIconFirstPage:D.createElement((()=>D.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24","aria-hidden":"true",role:"presentation"},D.createElement("path",{d:"M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"}),D.createElement("path",{fill:"none",d:"M24 24H0V0h24v24z"}))),null),paginationIconLastPage:D.createElement((()=>D.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24","aria-hidden":"true",role:"presentation"},D.createElement("path",{d:"M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"}),D.createElement("path",{fill:"none",d:"M0 0h24v24H0V0z"}))),null),paginationIconNext:D.createElement((()=>D.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24","aria-hidden":"true",role:"presentation"},D.createElement("path",{d:"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"}),D.createElement("path",{d:"M0 0h24v24H0z",fill:"none"}))),null),paginationIconPrevious:D.createElement((()=>D.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24","aria-hidden":"true",role:"presentation"},D.createElement("path",{d:"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"}),D.createElement("path",{d:"M0 0h24v24H0z",fill:"none"}))),null),dense:!1,conditionalRowStyles:[],theme:"default",customStyles:{},direction:yt.AUTO,onChangePage:V,onChangeRowsPerPage:V,onRowClicked:V,onRowDoubleClicked:V,onRowMouseEnter:V,onRowMouseLeave:V,onRowExpandToggled:V,onSelectedRowsChange:V,onSort:V,onColumnOrderChange:V},us={rowsPerPageText:"Rows per page:",rangeSeparatorText:"of",noRowsPerPage:!1,selectAllRowsItem:!1,selectAllRowsItemText:"All"},ps=I.nav`
	display: flex;
	flex: 1 1 auto;
	justify-content: flex-end;
	align-items: center;
	box-sizing: border-box;
	padding-right: 8px;
	padding-left: 8px;
	width: 100%;
	${({theme:e})=>e.pagination.style};
`,lt=I.button`
	position: relative;
	display: block;
	user-select: none;
	border: none;
	${({theme:e})=>e.pagination.pageButtonsStyle};
	${({$isRTL:e})=>e&&"transform: scale(-1, -1)"};
`,gs=I.div`
	display: flex;
	align-items: center;
	border-radius: 4px;
	white-space: nowrap;
	${xr`
    width: 100%;
    justify-content: space-around;
  `};
`,Rr=I.span`
	flex-shrink: 1;
	user-select: none;
`,fs=I(Rr)`
	margin: 0 24px;
`,hs=I(Rr)`
	margin: 0 4px;
`;var ms=s.memo((function({rowsPerPage:e,rowCount:t,currentPage:n,direction:r=l.direction,paginationRowsPerPageOptions:o=l.paginationRowsPerPageOptions,paginationIconLastPage:a=l.paginationIconLastPage,paginationIconFirstPage:i=l.paginationIconFirstPage,paginationIconNext:c=l.paginationIconNext,paginationIconPrevious:d=l.paginationIconPrevious,paginationComponentOptions:h=l.paginationComponentOptions,onChangeRowsPerPage:u=l.onChangeRowsPerPage,onChangePage:p=l.onChangePage}){const y=(()=>{const M=typeof window=="object";function he(){return{width:M?window.innerWidth:void 0,height:M?window.innerHeight:void 0}}const[me,le]=s.useState(he);return s.useEffect((()=>{if(!M)return()=>null;function Q(){le(he())}return window.addEventListener("resize",Q),()=>window.removeEventListener("resize",Q)}),[]),me})(),m=Cr(r),b=y.width&&y.width>599,E=Ze(t,e),P=n*e,O=P-e+1,w=n===1,x=n===E,v=Object.assign(Object.assign({},us),h),R=n===E?`${O}-${t} ${v.rangeSeparatorText} ${t}`:`${O}-${P} ${v.rangeSeparatorText} ${t}`,$=s.useCallback((()=>p(n-1)),[n,p]),g=s.useCallback((()=>p(n+1)),[n,p]),j=s.useCallback((()=>p(1)),[p]),X=s.useCallback((()=>p(Ze(t,e))),[p,t,e]),B=s.useCallback((M=>u(Number(M.target.value),n)),[n,u]),re=o.map((M=>s.createElement("option",{key:M,value:M},M)));v.selectAllRowsItem&&re.push(s.createElement("option",{key:-1,value:t},v.selectAllRowsItemText));const oe=s.createElement(ds,{onChange:B,defaultValue:e,"aria-label":v.rowsPerPageText},re);return s.createElement(ps,{className:"rdt_Pagination"},!v.noRowsPerPage&&b&&s.createElement(s.Fragment,null,s.createElement(hs,null,v.rowsPerPageText),oe),b&&s.createElement(fs,null,R),s.createElement(gs,null,s.createElement(lt,{id:"pagination-first-page",type:"button","aria-label":"First Page","aria-disabled":w,onClick:j,disabled:w,$isRTL:m},i),s.createElement(lt,{id:"pagination-previous-page",type:"button","aria-label":"Previous Page","aria-disabled":w,onClick:$,disabled:w,$isRTL:m},d),!v.noRowsPerPage&&!b&&oe,s.createElement(lt,{id:"pagination-next-page",type:"button","aria-label":"Next Page","aria-disabled":x,onClick:g,disabled:x,$isRTL:m},c),s.createElement(lt,{id:"pagination-last-page",type:"button","aria-label":"Last Page","aria-disabled":x,onClick:X,disabled:x,$isRTL:m},a)))}));const Pe=(e,t)=>{const n=s.useRef(!0);s.useEffect((()=>{n.current?n.current=!1:e()}),t)};function bs(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var ws=function(e){return(function(t){return!!t&&typeof t=="object"})(e)&&!(function(t){var n=Object.prototype.toString.call(t);return n==="[object RegExp]"||n==="[object Date]"||(function(r){return r.$$typeof===xs})(t)})(e)},xs=typeof Symbol=="function"&&Symbol.for?Symbol.for("react.element"):60103;function et(e,t){return t.clone!==!1&&t.isMergeableObject(e)?Ge((n=e,Array.isArray(n)?[]:{}),e,t):e;var n}function ys(e,t,n){return e.concat(t).map((function(r){return et(r,n)}))}function Yn(e){return Object.keys(e).concat((function(t){return Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t).filter((function(n){return Object.propertyIsEnumerable.call(t,n)})):[]})(e))}function Un(e,t){try{return t in e}catch{return!1}}function vs(e,t,n){var r={};return n.isMergeableObject(e)&&Yn(e).forEach((function(o){r[o]=et(e[o],n)})),Yn(t).forEach((function(o){(function(a,i){return Un(a,i)&&!(Object.hasOwnProperty.call(a,i)&&Object.propertyIsEnumerable.call(a,i))})(e,o)||(Un(e,o)&&n.isMergeableObject(t[o])?r[o]=(function(a,i){if(!i.customMerge)return Ge;var c=i.customMerge(a);return typeof c=="function"?c:Ge})(o,n)(e[o],t[o],n):r[o]=et(t[o],n))})),r}function Ge(e,t,n){(n=n||{}).arrayMerge=n.arrayMerge||ys,n.isMergeableObject=n.isMergeableObject||ws,n.cloneUnlessOtherwiseSpecified=et;var r=Array.isArray(t);return r===Array.isArray(e)?r?n.arrayMerge(e,t,n):vs(e,t,n):et(t,n)}Ge.all=function(e,t){if(!Array.isArray(e))throw new Error("first argument should be an array");return e.reduce((function(n,r){return Ge(n,r,t)}),{})};var qt=bs(Ge);const Kn={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.54)",disabled:"rgba(0, 0, 0, 0.38)"},background:{default:"#FFFFFF"},context:{background:"#e3f2fd",text:"rgba(0, 0, 0, 0.87)"},divider:{default:"rgba(0,0,0,.12)"},button:{default:"rgba(0,0,0,.54)",focus:"rgba(0,0,0,.12)",hover:"rgba(0,0,0,.12)",disabled:"rgba(0, 0, 0, .18)"},selected:{default:"#e3f2fd",text:"rgba(0, 0, 0, 0.87)"},highlightOnHover:{default:"#EEEEEE",text:"rgba(0, 0, 0, 0.87)"},striped:{default:"#FAFAFA",text:"rgba(0, 0, 0, 0.87)"}},$e={default:Kn,light:Kn,dark:{text:{primary:"#FFFFFF",secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(0,0,0,.12)"},background:{default:"#424242"},context:{background:"#E91E63",text:"#FFFFFF"},divider:{default:"rgba(81, 81, 81, 1)"},button:{default:"#FFFFFF",focus:"rgba(255, 255, 255, .54)",hover:"rgba(255, 255, 255, .12)",disabled:"rgba(255, 255, 255, .18)"},selected:{default:"rgba(0, 0, 0, .7)",text:"#FFFFFF"},highlightOnHover:{default:"rgba(0, 0, 0, .7)",text:"#FFFFFF"},striped:{default:"rgba(0, 0, 0, .87)",text:"#FFFFFF"}}};function $r(e="default",t,n="default"){return $e[e]||($e[e]=qt($e[n],t||{})),$e[e]=qt($e[e],t||{}),$e[e]}function Cs(e,t,n,r){const[o,a]=s.useState((()=>zn(e))),[i,c]=s.useState(""),d=s.useRef("");Pe((()=>{a(zn(e))}),[e]);const h=s.useCallback((P=>{var O,w,x;const{attributes:v}=P.target,R=(O=v.getNamedItem("data-column-id"))===null||O===void 0?void 0:O.value;R&&(d.current=((x=(w=o[it(o,R)])===null||w===void 0?void 0:w.id)===null||x===void 0?void 0:x.toString())||"",c(d.current))}),[o]),u=s.useCallback((P=>{var O;const{attributes:w}=P.target,x=(O=w.getNamedItem("data-column-id"))===null||O===void 0?void 0:O.value;if(x&&d.current&&x!==d.current){const v=it(o,d.current),R=it(o,x),$=[...o];$[v]=o[R],$[R]=o[v],a($),t($)}}),[t,o]),p=s.useCallback((P=>{P.preventDefault()}),[]),y=s.useCallback((P=>{P.preventDefault()}),[]),m=s.useCallback((P=>{P.preventDefault(),d.current="",c("")}),[]),b=(function(P=!1){return P?Ee.ASC:Ee.DESC})(r),E=s.useMemo((()=>o[it(o,n==null?void 0:n.toString())]||{}),[n,o]);return{tableColumns:o,draggingColumnId:i,handleDragStart:h,handleDragEnter:u,handleDragOver:p,handleDragLeave:y,handleDragEnd:m,defaultSortDirection:b,defaultSortColumn:E}}var Ss=s.memo((function(e){const{data:t=l.data,columns:n=l.columns,title:r=l.title,actions:o=l.actions,keyField:a=l.keyField,striped:i=l.striped,highlightOnHover:c=l.highlightOnHover,pointerOnHover:d=l.pointerOnHover,dense:h=l.dense,selectableRows:u=l.selectableRows,selectableRowsSingle:p=l.selectableRowsSingle,selectableRowsHighlight:y=l.selectableRowsHighlight,selectableRowsNoSelectAll:m=l.selectableRowsNoSelectAll,selectableRowsVisibleOnly:b=l.selectableRowsVisibleOnly,selectableRowSelected:E=l.selectableRowSelected,selectableRowDisabled:P=l.selectableRowDisabled,selectableRowsComponent:O=l.selectableRowsComponent,selectableRowsComponentProps:w=l.selectableRowsComponentProps,onRowExpandToggled:x=l.onRowExpandToggled,onSelectedRowsChange:v=l.onSelectedRowsChange,expandableIcon:R=l.expandableIcon,onChangeRowsPerPage:$=l.onChangeRowsPerPage,onChangePage:g=l.onChangePage,paginationServer:j=l.paginationServer,paginationServerOptions:X=l.paginationServerOptions,paginationTotalRows:B=l.paginationTotalRows,paginationDefaultPage:re=l.paginationDefaultPage,paginationResetDefaultPage:oe=l.paginationResetDefaultPage,paginationPerPage:M=l.paginationPerPage,paginationRowsPerPageOptions:he=l.paginationRowsPerPageOptions,paginationIconLastPage:me=l.paginationIconLastPage,paginationIconFirstPage:le=l.paginationIconFirstPage,paginationIconNext:Q=l.paginationIconNext,paginationIconPrevious:ve=l.paginationIconPrevious,paginationComponent:f=l.paginationComponent,paginationComponentOptions:_=l.paginationComponentOptions,responsive:F=l.responsive,progressPending:A=l.progressPending,progressComponent:ae=l.progressComponent,persistTableHead:L=l.persistTableHead,noDataComponent:ee=l.noDataComponent,disabled:K=l.disabled,noTableHead:ue=l.noTableHead,noHeader:ce=l.noHeader,fixedHeader:te=l.fixedHeader,fixedHeaderScrollHeight:be=l.fixedHeaderScrollHeight,pagination:se=l.pagination,subHeader:q=l.subHeader,subHeaderAlign:tt=l.subHeaderAlign,subHeaderWrap:nt=l.subHeaderWrap,subHeaderComponent:Ot=l.subHeaderComponent,noContextMenu:Pt=l.noContextMenu,contextMessage:kt=l.contextMessage,contextActions:G=l.contextActions,contextComponent:Er=l.contextComponent,expandableRows:rt=l.expandableRows,onRowClicked:tn=l.onRowClicked,onRowDoubleClicked:nn=l.onRowDoubleClicked,onRowMouseEnter:rn=l.onRowMouseEnter,onRowMouseLeave:on=l.onRowMouseLeave,sortIcon:Or=l.sortIcon,onSort:Pr=l.onSort,sortFunction:an=l.sortFunction,sortServer:Dt=l.sortServer,expandableRowsComponent:kr=l.expandableRowsComponent,expandableRowsComponentProps:Dr=l.expandableRowsComponentProps,expandableRowDisabled:sn=l.expandableRowDisabled,expandableRowsHideExpander:ln=l.expandableRowsHideExpander,expandOnRowClicked:Ir=l.expandOnRowClicked,expandOnRowDoubleClicked:jr=l.expandOnRowDoubleClicked,expandableRowExpanded:cn=l.expandableRowExpanded,expandableInheritConditionalStyles:Ar=l.expandableInheritConditionalStyles,defaultSortFieldId:_r=l.defaultSortFieldId,defaultSortAsc:Tr=l.defaultSortAsc,clearSelectedRows:dn=l.clearSelectedRows,conditionalRowStyles:Hr=l.conditionalRowStyles,theme:un=l.theme,customStyles:pn=l.customStyles,direction:Ue=l.direction,onColumnOrderChange:Fr=l.onColumnOrderChange,className:Nr,ariaLabel:gn}=e,{tableColumns:fn,draggingColumnId:hn,handleDragStart:mn,handleDragEnter:bn,handleDragOver:wn,handleDragLeave:xn,handleDragEnd:yn,defaultSortDirection:Mr,defaultSortColumn:Lr}=Cs(n,Fr,_r,Tr),[{rowsPerPage:Ce,currentPage:pe,selectedRows:It,allSelected:vn,selectedCount:Cn,selectedColumn:we,sortDirection:_e,toggleOnSelectedRowsChange:zr},Oe]=s.useReducer(ga,{allSelected:!1,selectedCount:0,selectedRows:[],selectedColumn:Lr,toggleOnSelectedRowsChange:!1,sortDirection:Mr,currentPage:re,rowsPerPage:M,selectedRowsFlag:!1,contextMessage:l.contextMessage}),{persistSelectedOnSort:Sn=!1,persistSelectedOnPageChange:ot=!1}=X,Rn=!(!j||!ot&&!Sn),Wr=se&&!A&&t.length>0,Br=f||ms,Gr=s.useMemo((()=>((C={},T="default",ne="default")=>{const ge=$e[T]?T:ne;return qt({table:{style:{color:(S=$e[ge]).text.primary,backgroundColor:S.background.default}},tableWrapper:{style:{display:"table"}},responsiveWrapper:{style:{}},header:{style:{fontSize:"22px",color:S.text.primary,backgroundColor:S.background.default,minHeight:"56px",paddingLeft:"16px",paddingRight:"8px"}},subHeader:{style:{backgroundColor:S.background.default,minHeight:"52px"}},head:{style:{color:S.text.primary,fontSize:"12px",fontWeight:500}},headRow:{style:{backgroundColor:S.background.default,minHeight:"52px",borderBottomWidth:"1px",borderBottomColor:S.divider.default,borderBottomStyle:"solid"},denseStyle:{minHeight:"32px"}},headCells:{style:{paddingLeft:"16px",paddingRight:"16px"},draggingStyle:{cursor:"move"}},contextMenu:{style:{backgroundColor:S.context.background,fontSize:"18px",fontWeight:400,color:S.context.text,paddingLeft:"16px",paddingRight:"8px",transform:"translate3d(0, -100%, 0)",transitionDuration:"125ms",transitionTimingFunction:"cubic-bezier(0, 0, 0.2, 1)",willChange:"transform"},activeStyle:{transform:"translate3d(0, 0, 0)"}},cells:{style:{paddingLeft:"16px",paddingRight:"16px",wordBreak:"break-word"},draggingStyle:{}},rows:{style:{fontSize:"13px",fontWeight:400,color:S.text.primary,backgroundColor:S.background.default,minHeight:"48px","&:not(:last-of-type)":{borderBottomStyle:"solid",borderBottomWidth:"1px",borderBottomColor:S.divider.default}},denseStyle:{minHeight:"32px"},selectedHighlightStyle:{"&:nth-of-type(n)":{color:S.selected.text,backgroundColor:S.selected.default,borderBottomColor:S.background.default}},highlightOnHoverStyle:{color:S.highlightOnHover.text,backgroundColor:S.highlightOnHover.default,transitionDuration:"0.15s",transitionProperty:"background-color",borderBottomColor:S.background.default,outlineStyle:"solid",outlineWidth:"1px",outlineColor:S.background.default},stripedStyle:{color:S.striped.text,backgroundColor:S.striped.default}},expanderRow:{style:{color:S.text.primary,backgroundColor:S.background.default}},expanderCell:{style:{flex:"0 0 48px"}},expanderButton:{style:{color:S.button.default,fill:S.button.default,backgroundColor:"transparent",borderRadius:"2px",transition:"0.25s",height:"100%",width:"100%","&:hover:enabled":{cursor:"pointer"},"&:disabled":{color:S.button.disabled},"&:hover:not(:disabled)":{cursor:"pointer",backgroundColor:S.button.hover},"&:focus":{outline:"none",backgroundColor:S.button.focus},svg:{margin:"auto"}}},pagination:{style:{color:S.text.secondary,fontSize:"13px",minHeight:"56px",backgroundColor:S.background.default,borderTopStyle:"solid",borderTopWidth:"1px",borderTopColor:S.divider.default},pageButtonsStyle:{borderRadius:"50%",height:"40px",width:"40px",padding:"8px",margin:"px",cursor:"pointer",transition:"0.4s",color:S.button.default,fill:S.button.default,backgroundColor:"transparent","&:disabled":{cursor:"unset",color:S.button.disabled,fill:S.button.disabled},"&:hover:not(:disabled)":{backgroundColor:S.button.hover},"&:focus":{outline:"none",backgroundColor:S.button.focus}}},noData:{style:{display:"flex",alignItems:"center",justifyContent:"center",color:S.text.primary,backgroundColor:S.background.default}},progress:{style:{display:"flex",alignItems:"center",justifyContent:"center",color:S.text.primary,backgroundColor:S.background.default}}},C);var S})(pn,un)),[pn,un]),Vr=s.useMemo((()=>Object.assign({},Ue!=="auto"&&{dir:Ue})),[Ue]),J=s.useMemo((()=>{if(Dt)return t;if(we!=null&&we.sortFunction&&typeof we.sortFunction=="function"){const C=we.sortFunction,T=_e===Ee.ASC?C:(ne,ge)=>-1*C(ne,ge);return[...t].sort(T)}return(function(C,T,ne,ge){return T?ge&&typeof ge=="function"?ge(C.slice(0),T,ne):C.slice(0).sort(((S,jt)=>{const He=T(S),Se=T(jt);if(ne==="asc"){if(He<Se)return-1;if(He>Se)return 1}if(ne==="desc"){if(He>Se)return-1;if(He<Se)return 1}return 0})):C})(t,we==null?void 0:we.selector,_e,an)}),[Dt,we,_e,t,an]),Ke=s.useMemo((()=>{if(se&&!j){const C=pe*Ce,T=C-Ce;return J.slice(T,C)}return J}),[pe,se,j,Ce,J]),Yr=s.useCallback((C=>{Oe(C)}),[]),Ur=s.useCallback((C=>{Oe(C)}),[]),Kr=s.useCallback((C=>{Oe(C)}),[]),qr=s.useCallback(((C,T)=>tn(C,T)),[tn]),Jr=s.useCallback(((C,T)=>nn(C,T)),[nn]),Zr=s.useCallback(((C,T)=>rn(C,T)),[rn]),Xr=s.useCallback(((C,T)=>on(C,T)),[on]),Te=s.useCallback((C=>Oe({type:"CHANGE_PAGE",page:C,paginationServer:j,visibleOnly:b,persistSelectedOnPageChange:ot})),[j,ot,b]),Qr=s.useCallback((C=>{const T=Ze(B||Ke.length,C),ne=Nt(pe,T);j||Te(ne),Oe({type:"CHANGE_ROWS_PER_PAGE",page:ne,rowsPerPage:C})}),[pe,Te,j,B,Ke.length]);if(se&&!j&&J.length>0&&Ke.length===0){const C=Ze(J.length,Ce),T=Nt(pe,C);Te(T)}Pe((()=>{v({allSelected:vn,selectedCount:Cn,selectedRows:It.slice(0)})}),[zr]),Pe((()=>{Pr(we,_e,J.slice(0))}),[we,_e]),Pe((()=>{g(pe,B||J.length)}),[pe]),Pe((()=>{$(Ce,pe)}),[Ce]),Pe((()=>{Te(re)}),[re,oe]),Pe((()=>{if(se&&j&&B>0){const C=Ze(B,Ce),T=Nt(pe,C);pe!==T&&Te(T)}}),[B]),s.useEffect((()=>{Oe({type:"CLEAR_SELECTED_ROWS",selectedRowsFlag:dn})}),[p,dn]),s.useEffect((()=>{if(!E)return;const C=J.filter((ne=>E(ne))),T=p?C.slice(0,1):C;Oe({type:"SELECT_MULTIPLE_ROWS",keyField:a,selectedRows:T,totalRows:J.length,mergeSelections:Rn})}),[t,E]);const eo=b?Ke:J,to=ot||p||m;return s.createElement(ca,{theme:Gr},!ce&&(!!r||!!o)&&s.createElement(Xa,{title:r,actions:o,showMenu:!Pt,selectedCount:Cn,direction:Ue,contextActions:G,contextComponent:Er,contextMessage:kt}),q&&s.createElement(ts,{align:tt,wrapContent:nt},Ot),s.createElement(rs,Object.assign({$responsive:F,$fixedHeader:te,$fixedHeaderScrollHeight:be,className:Nr},Vr),s.createElement(os,null,A&&!L&&s.createElement(Vn,null,ae),s.createElement(ha,Object.assign({disabled:K,className:"rdt_Table",role:"table"},gn&&{"aria-label":gn}),!ue&&(!!L||J.length>0&&!A)&&s.createElement(ba,{className:"rdt_TableHead",role:"rowgroup",$fixedHeader:te},s.createElement(wa,{className:"rdt_TableHeadRow",role:"row",$dense:h},u&&(to?s.createElement(Ye,{style:{flex:"0 0 48px"}}):s.createElement(Va,{allSelected:vn,selectedRows:It,selectableRowsComponent:O,selectableRowsComponentProps:w,selectableRowDisabled:P,rowData:eo,keyField:a,mergeSelections:Rn,onSelectAllRows:Ur})),rt&&!ln&&s.createElement(as,null),fn.map((C=>s.createElement(Ba,{key:C.id,column:C,selectedColumn:we,disabled:A||J.length===0,pagination:se,paginationServer:j,persistSelectedOnSort:Sn,selectableRowsVisibleOnly:b,sortDirection:_e,sortIcon:Or,sortServer:Dt,onSort:Yr,onDragStart:mn,onDragOver:wn,onDragEnd:yn,onDragEnter:bn,onDragLeave:xn,draggingColumnId:hn}))))),!J.length&&!A&&s.createElement(ss,null,ee),A&&L&&s.createElement(Vn,null,ae),!A&&J.length>0&&s.createElement(ns,{className:"rdt_TableBody",role:"rowgroup"},Ke.map(((C,T)=>{const ne=Be(C,a),ge=(function(Se=""){return typeof Se!="number"&&(!Se||Se.length===0)})(ne)?T:ne,S=ft(C,It,a),jt=!!(rt&&cn&&cn(C)),He=!!(rt&&sn&&sn(C));return s.createElement(Ha,{id:ge,key:ge,keyField:a,"data-row-id":ge,columns:fn,row:C,rowCount:J.length,rowIndex:T,selectableRows:u,expandableRows:rt,expandableIcon:R,highlightOnHover:c,pointerOnHover:d,dense:h,expandOnRowClicked:Ir,expandOnRowDoubleClicked:jr,expandableRowsComponent:kr,expandableRowsComponentProps:Dr,expandableRowsHideExpander:ln,defaultExpanderDisabled:He,defaultExpanded:jt,expandableInheritConditionalStyles:Ar,conditionalRowStyles:Hr,selected:S,selectableRowsHighlight:y,selectableRowsComponent:O,selectableRowsComponentProps:w,selectableRowDisabled:P,selectableRowsSingle:p,striped:i,onRowExpandToggled:x,onRowClicked:qr,onRowDoubleClicked:Jr,onRowMouseEnter:Zr,onRowMouseLeave:Xr,onSelectedRow:Kr,draggingColumnId:hn,onDragStart:mn,onDragOver:wn,onDragEnd:yn,onDragEnter:bn,onDragLeave:xn})})))))),Wr&&s.createElement("div",null,s.createElement(Br,{onChangePage:Te,onChangeRowsPerPage:Qr,rowCount:B||J.length,currentPage:pe,rowsPerPage:Ce,direction:Ue,paginationRowsPerPageOptions:he,paginationIconLastPage:me,paginationIconFirstPage:le,paginationIconNext:Q,paginationIconPrevious:ve,paginationComponentOptions:_})))}));function Lt(e,t){return t.split(".").reduce((n,r)=>n==null?void 0:n[r],e)}const Rs={headCells:{style:{fontWeight:"bold",fontSize:"15px"}},cells:{style:{fontSize:"14px"}},rows:{style:{}}};$r("dark",{background:{default:"transparent"}});$r("light",{background:{default:"transparent"}});const $s={rowsPerPageText:"Filas por página",rangeSeparatorText:"de"};function Is({data:e,columns:t,filterFields:n=[],onRowClick:r,onFilteredChange:o,noDataComponent:a,inactiveField:i,alternativeStorageKey:c,disableRowClick:d=!1,buttonNavigate:h,buttonExport:u,buttonOnClick:p,expandableRows:y=!1,ExpandedComponent:m}){const{theme:b}=oo(),E=no(),{openModal:P,closeModal:O}=ao(),w=c||`entityTableFilters_${E.pathname}`,x=({row:f,originalSelector:_})=>{const F=_(f),A=F==="Activo"||F==="Sí"||F===!0;return z.jsx("span",{className:`font-medium text-xs px-2 py-1 rounded-full ${A?"text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/30":"text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/30"}`,children:typeof F=="boolean"?F?"Activo":"Inactivo":F})},v=t.map(f=>(f.name==="Activo"||f.name==="Estado"||f.name==="Status")&&f.selector?{...f,cell:_=>z.jsx(x,{row:_,originalSelector:f.selector})}:f),[R,$]=s.useState(()=>{const f=localStorage.getItem(w);return f?JSON.parse(f):{}}),[g,j]=s.useState(e),[X,B]=s.useState(!1),[re,oe]=s.useState(()=>{const f=localStorage.getItem(`${w}_page`);return f?parseInt(f,10):1}),M=f=>{if(!i)return!1;const _=Lt(f,i);return _===!1||_==="No"||_==="Inactivo"||_==="no"||_==="false"},he=()=>({opacity:"0.6",backgroundColor:b==="dark"?"rgba(107, 114, 128, 0.1)":"rgba(156, 163, 175, 0.1)",borderLeft:b==="dark"?"3px solid rgb(107, 114, 128)":"3px solid rgb(156, 163, 175)"});function me(f){return f.normalize("NFD").replace(/[\u0300-\u036f]/g,"")}const le=f=>{const _=e.filter(F=>n.every(({key:A,type:ae})=>{var L;if(ae==="dateRange"){const ee=f[`${A}_from`],K=f[`${A}_to`],ue=Lt(F,A);if(!ue)return!1;const ce=new Date(ue).getTime(),te=ee?new Date(ee).getTime():null,be=K?new Date(K).getTime():null;return(!te||ce>=te)&&(!be||ce<=be)}else{const ee=me(((L=f[A])==null?void 0:L.toLowerCase())??"");return ee?me(String(Lt(F,A)??"").toLowerCase()).includes(ee):!0}}));j(_),B(Object.values(f).some(F=>F))},Q=(f,_,F)=>{const A={...R};_&&_.trim()!==""?A[f]=_:delete A[f],$(A),localStorage.setItem(w,JSON.stringify(A)),oe(1),localStorage.setItem(`${w}_page`,"1"),F&&le(A)},ve=f=>{oe(f),localStorage.setItem(`${w}_page`,f.toString())};return s.useEffect(()=>{Object.values(R).some(_=>_)?le(R):(j(e),B(!1))},[e,R]),s.useEffect(()=>{Object.values(R).some(_=>_)&&P("CONFIRMATION",{title:"Filtros Aplicados",message:"Hay filtros aplicados desde tu última visita. ¿Deseas limpiar los filtros?",confirmText:"Limpiar Filtros",cancelText:"Mantener Filtros",onConfirm:()=>{$({}),j(e),o&&o(e),localStorage.removeItem(w),localStorage.removeItem(`${w}_page`),oe(1),B(!1),O()}})},[]),z.jsxs("div",{className:"relative flex flex-col gap-4",children:[X&&n.length>0&&z.jsx("div",{className:"mb-2 text-blue-600 dark:text-blue-400 font-semibold text-sm",children:"ℹ️ Filtros aplicados."}),n.length>0&&z.jsxs("form",{className:"flex gap-2 items-baseline md:flex-row flex-col",onSubmit:f=>{f.preventDefault(),le(R)},children:[n.map(({key:f,label:_,type:F="text",options:A,autoFilter:ae})=>z.jsx("div",{className:"w-full",children:F==="dateRange"?z.jsxs("div",{className:"flex gap-2 items-center",children:[z.jsx(At,{label:"Desde",type:"date",value:R[`${f}_from`]??"",onChange:L=>Q(`${f}_from`,L.target.value,ae)}),z.jsx("span",{className:"text-sm",children:"a"}),z.jsx(At,{type:"date",label:"Hasta",value:R[`${f}_to`]??"",onChange:L=>Q(`${f}_to`,L.target.value,ae)})]}):F==="select"?z.jsx(ro,{label:_,value:R[f]??"",onChange:L=>Q(f,L.target.value,ae),children:A}):z.jsx(At,{type:"search",placeholder:_,label:_,value:R[f]??"",onChange:L=>Q(f,L.target.value,ae)})},f)),!n.every(f=>f.autoFilter)&&z.jsx("div",{className:"w-fit",children:z.jsx($n,{variant:"yellow",type:"submit",children:"Filtrar"})})]}),z.jsx(Ss,{columns:v,data:g,customStyles:Rs,theme:b,pagination:!0,paginationPerPage:30,paginationDefaultPage:re,onChangePage:ve,onRowClicked:d?void 0:r,pointerOnHover:!d,highlightOnHover:!0,paginationComponentOptions:$s,expandableRows:y,expandableRowsComponent:m,noDataComponent:a||z.jsx("div",{className:"py-6 text-text-secondary",children:"No se encontraron registros"}),conditionalRowStyles:i?[{when:f=>M(f),style:he()}]:void 0}),(u||h||p)&&z.jsx("span",{className:"fixed bottom-0 -left-0 w-full",children:z.jsxs("div",{className:"flex justify-between w-full  py-5 px-8 hover:bg-zinc-200 hover:dark:bg-zinc-900",children:[u&&z.jsx("div",{className:"flex gap-4",children:z.jsx(so,{data:g,headers:u.headers,filename:u.filename,type:u.type})}),h&&z.jsx("div",{className:"w-fit",children:z.jsx(io,{variant:h.color,route:h.route,children:h.title})}),p&&z.jsx("div",{className:"w-fit",children:z.jsx($n,{variant:p.color,onClick:p.onClick,icon:p.icon,children:p.title})})]})})]})}export{Is as E};

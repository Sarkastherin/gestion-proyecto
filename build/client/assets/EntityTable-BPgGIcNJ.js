import{R as P,r as s,j as pe}from"./chunk-PVWAREVJ-xN2wnjH-.js";import{S as Qr,I as eo}from"./Inputs-nFJy7MmX.js";import{B as to}from"./Buttons-BBIplumE.js";import{u as no}from"./UIContext-CTPOFttf.js";var G=function(){return G=Object.assign||function(t){for(var n,r=1,o=arguments.length;r<o;r++){n=arguments[r];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t},G.apply(this,arguments)};function ht(e,t,n){if(n||arguments.length===2)for(var r=0,o=t.length,a;r<o;r++)(a||!(r in t))&&(a||(a=Array.prototype.slice.call(t,0,r)),a[r]=t[r]);return e.concat(a||Array.prototype.slice.call(t))}var _="-ms-",Xe="-moz-",j="-webkit-",Yn="comm",vt="rule",Kt="decl",ro="@import",Un="@keyframes",oo="@layer",Kn=Math.abs,qt=String.fromCharCode,Lt=Object.assign;function ao(e,t){return z(e,0)^45?(((t<<2^z(e,0))<<2^z(e,1))<<2^z(e,2))<<2^z(e,3):0}function qn(e){return e.trim()}function ge(e,t){return(e=t.exec(e))?e[0]:e}function O(e,t,n){return e.replace(t,n)}function ct(e,t,n){return e.indexOf(t,n)}function z(e,t){return e.charCodeAt(t)|0}function Le(e,t,n){return e.slice(t,n)}function le(e){return e.length}function Xn(e){return e.length}function qe(e,t){return t.push(e),e}function so(e,t){return e.map(t).join("")}function Sn(e,t){return e.filter(function(n){return!ge(n,t)})}var Ct=1,Me=1,Zn=0,te=0,H=0,Ve="";function St(e,t,n,r,o,a,i,c){return{value:e,root:t,parent:n,type:r,props:o,children:a,line:Ct,column:Me,length:i,return:"",siblings:c}}function xe(e,t){return Lt(St("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function Te(e){for(;e.root;)e=xe(e.root,{children:[e]});qe(e,e.siblings)}function io(){return H}function lo(){return H=te>0?z(Ve,--te):0,Me--,H===10&&(Me=1,Ct--),H}function oe(){return H=te<Zn?z(Ve,te++):0,Me++,H===10&&(Me=1,Ct++),H}function ke(){return z(Ve,te)}function dt(){return te}function Rt(e,t){return Le(Ve,e,t)}function Mt(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function co(e){return Ct=Me=1,Zn=le(Ve=e),te=0,[]}function uo(e){return Ve="",e}function jt(e){return qn(Rt(te-1,zt(e===91?e+2:e===40?e+1:e)))}function po(e){for(;(H=ke())&&H<33;)oe();return Mt(e)>2||Mt(H)>3?"":" "}function go(e,t){for(;--t&&oe()&&!(H<48||H>102||H>57&&H<65||H>70&&H<97););return Rt(e,dt()+(t<6&&ke()==32&&oe()==32))}function zt(e){for(;oe();)switch(H){case e:return te;case 34:case 39:e!==34&&e!==39&&zt(H);break;case 40:e===41&&zt(e);break;case 92:oe();break}return te}function fo(e,t){for(;oe()&&e+H!==57;)if(e+H===84&&ke()===47)break;return"/*"+Rt(t,te-1)+"*"+qt(e===47?e:oe())}function ho(e){for(;!Mt(ke());)oe();return Rt(e,te)}function mo(e){return uo(ut("",null,null,null,[""],e=co(e),0,[0],e))}function ut(e,t,n,r,o,a,i,c,d){for(var h=0,p=0,u=i,b=0,f=0,m=0,v=1,C=1,R=1,$=0,w="",S=o,D=a,E=r,g=w;C;)switch(m=$,$=oe()){case 40:if(m!=108&&z(g,u-1)==58){ct(g+=O(jt($),"&","&\f"),"&\f",Kn(h?c[h-1]:0))!=-1&&(R=-1);break}case 34:case 39:case 91:g+=jt($);break;case 9:case 10:case 13:case 32:g+=po(m);break;case 92:g+=go(dt()-1,7);continue;case 47:switch(ke()){case 42:case 47:qe(bo(fo(oe(),dt()),t,n,d),d);break;default:g+="/"}break;case 123*v:c[h++]=le(g)*R;case 125*v:case 59:case 0:switch($){case 0:case 125:C=0;case 59+p:R==-1&&(g=O(g,/\f/g,"")),f>0&&le(g)-u&&qe(f>32?$n(g+";",r,n,u-1,d):$n(O(g," ","")+";",r,n,u-2,d),d);break;case 59:g+=";";default:if(qe(E=Rn(g,t,n,h,p,o,c,w,S=[],D=[],u,a),a),$===123)if(p===0)ut(g,t,E,E,S,a,u,c,D);else switch(b===99&&z(g,3)===110?100:b){case 100:case 108:case 109:case 115:ut(e,E,E,r&&qe(Rn(e,E,E,0,0,o,c,w,o,S=[],u,D),D),o,D,u,c,r?S:D);break;default:ut(g,E,E,E,[""],D,0,c,D)}}h=p=f=0,v=R=1,w=g="",u=i;break;case 58:u=1+le(g),f=m;default:if(v<1){if($==123)--v;else if($==125&&v++==0&&lo()==125)continue}switch(g+=qt($),$*v){case 38:R=p>0?1:(g+="\f",-1);break;case 44:c[h++]=(le(g)-1)*R,R=1;break;case 64:ke()===45&&(g+=jt(oe())),b=ke(),p=u=le(w=g+=ho(dt())),$++;break;case 45:m===45&&le(g)==2&&(v=0)}}return a}function Rn(e,t,n,r,o,a,i,c,d,h,p,u){for(var b=o-1,f=o===0?a:[""],m=Xn(f),v=0,C=0,R=0;v<r;++v)for(var $=0,w=Le(e,b+1,b=Kn(C=i[v])),S=e;$<m;++$)(S=qn(C>0?f[$]+" "+w:O(w,/&\f/g,f[$])))&&(d[R++]=S);return St(e,t,n,o===0?vt:c,d,h,p,u)}function bo(e,t,n,r){return St(e,t,n,Yn,qt(io()),Le(e,2,-2),0,r)}function $n(e,t,n,r,o){return St(e,t,n,Kt,Le(e,0,r),Le(e,r+1,-1),r,o)}function Jn(e,t,n){switch(ao(e,t)){case 5103:return j+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return j+e+e;case 4789:return Xe+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return j+e+Xe+e+_+e+e;case 5936:switch(z(e,t+11)){case 114:return j+e+_+O(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return j+e+_+O(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return j+e+_+O(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return j+e+_+e+e;case 6165:return j+e+_+"flex-"+e+e;case 5187:return j+e+O(e,/(\w+).+(:[^]+)/,j+"box-$1$2"+_+"flex-$1$2")+e;case 5443:return j+e+_+"flex-item-"+O(e,/flex-|-self/g,"")+(ge(e,/flex-|baseline/)?"":_+"grid-row-"+O(e,/flex-|-self/g,""))+e;case 4675:return j+e+_+"flex-line-pack"+O(e,/align-content|flex-|-self/g,"")+e;case 5548:return j+e+_+O(e,"shrink","negative")+e;case 5292:return j+e+_+O(e,"basis","preferred-size")+e;case 6060:return j+"box-"+O(e,"-grow","")+j+e+_+O(e,"grow","positive")+e;case 4554:return j+O(e,/([^-])(transform)/g,"$1"+j+"$2")+e;case 6187:return O(O(O(e,/(zoom-|grab)/,j+"$1"),/(image-set)/,j+"$1"),e,"")+e;case 5495:case 3959:return O(e,/(image-set\([^]*)/,j+"$1$`$1");case 4968:return O(O(e,/(.+:)(flex-)?(.*)/,j+"box-pack:$3"+_+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+j+e+e;case 4200:if(!ge(e,/flex-|baseline/))return _+"grid-column-align"+Le(e,t)+e;break;case 2592:case 3360:return _+O(e,"template-","")+e;case 4384:case 3616:return n&&n.some(function(r,o){return t=o,ge(r.props,/grid-\w+-end/)})?~ct(e+(n=n[t].value),"span",0)?e:_+O(e,"-start","")+e+_+"grid-row-span:"+(~ct(n,"span",0)?ge(n,/\d+/):+ge(n,/\d+/)-+ge(e,/\d+/))+";":_+O(e,"-start","")+e;case 4896:case 4128:return n&&n.some(function(r){return ge(r.props,/grid-\w+-start/)})?e:_+O(O(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return O(e,/(.+)-inline(.+)/,j+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(le(e)-1-t>6)switch(z(e,t+1)){case 109:if(z(e,t+4)!==45)break;case 102:return O(e,/(.+:)(.+)-([^]+)/,"$1"+j+"$2-$3$1"+Xe+(z(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~ct(e,"stretch",0)?Jn(O(e,"stretch","fill-available"),t,n)+e:e}break;case 5152:case 5920:return O(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(r,o,a,i,c,d,h){return _+o+":"+a+h+(i?_+o+"-span:"+(c?d:+d-+a)+h:"")+e});case 4949:if(z(e,t+6)===121)return O(e,":",":"+j)+e;break;case 6444:switch(z(e,z(e,14)===45?18:11)){case 120:return O(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+j+(z(e,14)===45?"inline-":"")+"box$3$1"+j+"$2$3$1"+_+"$2box$3")+e;case 100:return O(e,":",":"+_)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return O(e,"scroll-","scroll-snap-")+e}return e}function mt(e,t){for(var n="",r=0;r<e.length;r++)n+=t(e[r],r,e,t)||"";return n}function wo(e,t,n,r){switch(e.type){case oo:if(e.children.length)break;case ro:case Kt:return e.return=e.return||e.value;case Yn:return"";case Un:return e.return=e.value+"{"+mt(e.children,r)+"}";case vt:if(!le(e.value=e.props.join(",")))return""}return le(n=mt(e.children,r))?e.return=e.value+"{"+n+"}":""}function yo(e){var t=Xn(e);return function(n,r,o,a){for(var i="",c=0;c<t;c++)i+=e[c](n,r,o,a)||"";return i}}function xo(e){return function(t){t.root||(t=t.return)&&e(t)}}function vo(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case Kt:e.return=Jn(e.value,e.length,n);return;case Un:return mt([xe(e,{value:O(e.value,"@","@"+j)})],r);case vt:if(e.length)return so(n=e.props,function(o){switch(ge(o,r=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":Te(xe(e,{props:[O(o,/:(read-\w+)/,":"+Xe+"$1")]})),Te(xe(e,{props:[o]})),Lt(e,{props:Sn(n,r)});break;case"::placeholder":Te(xe(e,{props:[O(o,/:(plac\w+)/,":"+j+"input-$1")]})),Te(xe(e,{props:[O(o,/:(plac\w+)/,":"+Xe+"$1")]})),Te(xe(e,{props:[O(o,/:(plac\w+)/,_+"input-$1")]})),Te(xe(e,{props:[o]})),Lt(e,{props:Sn(n,r)});break}return""})}}var Co={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},J={},ze=typeof process<"u"&&J!==void 0&&(J.REACT_APP_SC_ATTR||J.SC_ATTR)||"data-styled",Qn="active",er="data-styled-version",$t="6.1.19",Xt=`/*!sc*/
`,bt=typeof window<"u"&&typeof document<"u",So=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&J!==void 0&&J.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&J.REACT_APP_SC_DISABLE_SPEEDY!==""?J.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&J.REACT_APP_SC_DISABLE_SPEEDY:typeof process<"u"&&J!==void 0&&J.SC_DISABLE_SPEEDY!==void 0&&J.SC_DISABLE_SPEEDY!==""&&J.SC_DISABLE_SPEEDY!=="false"&&J.SC_DISABLE_SPEEDY),Et=Object.freeze([]),We=Object.freeze({});function Ro(e,t,n){return n===void 0&&(n=We),e.theme!==n.theme&&e.theme||t||n.theme}var tr=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),$o=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,Eo=/(^-|-$)/g;function En(e){return e.replace($o,"-").replace(Eo,"")}var Oo=/(a)(d)/gi,at=52,On=function(e){return String.fromCharCode(e+(e>25?39:97))};function Wt(e){var t,n="";for(t=Math.abs(e);t>at;t=t/at|0)n=On(t%at)+n;return(On(t%at)+n).replace(Oo,"$1-$2")}var _t,nr=5381,Ne=function(e,t){for(var n=t.length;n;)e=33*e^t.charCodeAt(--n);return e},rr=function(e){return Ne(nr,e)};function Po(e){return Wt(rr(e)>>>0)}function ko(e){return e.displayName||e.name||"Component"}function Ft(e){return typeof e=="string"&&!0}var or=typeof Symbol=="function"&&Symbol.for,ar=or?Symbol.for("react.memo"):60115,Do=or?Symbol.for("react.forward_ref"):60112,Io={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},Ao={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},sr={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},jo=((_t={})[Do]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},_t[ar]=sr,_t);function Pn(e){return("type"in(t=e)&&t.type.$$typeof)===ar?sr:"$$typeof"in e?jo[e.$$typeof]:Io;var t}var _o=Object.defineProperty,Fo=Object.getOwnPropertyNames,kn=Object.getOwnPropertySymbols,Ho=Object.getOwnPropertyDescriptor,To=Object.getPrototypeOf,Dn=Object.prototype;function ir(e,t,n){if(typeof t!="string"){if(Dn){var r=To(t);r&&r!==Dn&&ir(e,r,n)}var o=Fo(t);kn&&(o=o.concat(kn(t)));for(var a=Pn(e),i=Pn(t),c=0;c<o.length;++c){var d=o[c];if(!(d in Ao||n&&n[d]||i&&d in i||a&&d in a)){var h=Ho(t,d);try{_o(e,d,h)}catch{}}}}return e}function Ie(e){return typeof e=="function"}function Zt(e){return typeof e=="object"&&"styledComponentId"in e}function Pe(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function In(e,t){if(e.length===0)return"";for(var n=e[0],r=1;r<e.length;r++)n+=e[r];return n}function Qe(e){return e!==null&&typeof e=="object"&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function Bt(e,t,n){if(n===void 0&&(n=!1),!n&&!Qe(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var r=0;r<t.length;r++)e[r]=Bt(e[r],t[r]);else if(Qe(t))for(var r in t)e[r]=Bt(e[r],t[r]);return e}function Jt(e,t){Object.defineProperty(e,"toString",{value:t})}function Ae(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var No=(function(){function e(t){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=t}return e.prototype.indexOfGroup=function(t){for(var n=0,r=0;r<t;r++)n+=this.groupSizes[r];return n},e.prototype.insertRules=function(t,n){if(t>=this.groupSizes.length){for(var r=this.groupSizes,o=r.length,a=o;t>=a;)if((a<<=1)<0)throw Ae(16,"".concat(t));this.groupSizes=new Uint32Array(a),this.groupSizes.set(r),this.length=a;for(var i=o;i<a;i++)this.groupSizes[i]=0}for(var c=this.indexOfGroup(t+1),d=(i=0,n.length);i<d;i++)this.tag.insertRule(c,n[i])&&(this.groupSizes[t]++,c++)},e.prototype.clearGroup=function(t){if(t<this.length){var n=this.groupSizes[t],r=this.indexOfGroup(t),o=r+n;this.groupSizes[t]=0;for(var a=r;a<o;a++)this.tag.deleteRule(r)}},e.prototype.getGroup=function(t){var n="";if(t>=this.length||this.groupSizes[t]===0)return n;for(var r=this.groupSizes[t],o=this.indexOfGroup(t),a=o+r,i=o;i<a;i++)n+="".concat(this.tag.getRule(i)).concat(Xt);return n},e})(),pt=new Map,wt=new Map,gt=1,st=function(e){if(pt.has(e))return pt.get(e);for(;wt.has(gt);)gt++;var t=gt++;return pt.set(e,t),wt.set(t,e),t},Lo=function(e,t){gt=t+1,pt.set(e,t),wt.set(t,e)},Mo="style[".concat(ze,"][").concat(er,'="').concat($t,'"]'),zo=new RegExp("^".concat(ze,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),Wo=function(e,t,n){for(var r,o=n.split(","),a=0,i=o.length;a<i;a++)(r=o[a])&&e.registerName(t,r)},Bo=function(e,t){for(var n,r=((n=t.textContent)!==null&&n!==void 0?n:"").split(Xt),o=[],a=0,i=r.length;a<i;a++){var c=r[a].trim();if(c){var d=c.match(zo);if(d){var h=0|parseInt(d[1],10),p=d[2];h!==0&&(Lo(p,h),Wo(e,p,d[3]),e.getTag().insertRules(h,o)),o.length=0}else o.push(c)}}},An=function(e){for(var t=document.querySelectorAll(Mo),n=0,r=t.length;n<r;n++){var o=t[n];o&&o.getAttribute(ze)!==Qn&&(Bo(e,o),o.parentNode&&o.parentNode.removeChild(o))}};function Go(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null}var lr=function(e){var t=document.head,n=e||t,r=document.createElement("style"),o=(function(c){var d=Array.from(c.querySelectorAll("style[".concat(ze,"]")));return d[d.length-1]})(n),a=o!==void 0?o.nextSibling:null;r.setAttribute(ze,Qn),r.setAttribute(er,$t);var i=Go();return i&&r.setAttribute("nonce",i),n.insertBefore(r,a),r},Vo=(function(){function e(t){this.element=lr(t),this.element.appendChild(document.createTextNode("")),this.sheet=(function(n){if(n.sheet)return n.sheet;for(var r=document.styleSheets,o=0,a=r.length;o<a;o++){var i=r[o];if(i.ownerNode===n)return i}throw Ae(17)})(this.element),this.length=0}return e.prototype.insertRule=function(t,n){try{return this.sheet.insertRule(n,t),this.length++,!0}catch{return!1}},e.prototype.deleteRule=function(t){this.sheet.deleteRule(t),this.length--},e.prototype.getRule=function(t){var n=this.sheet.cssRules[t];return n&&n.cssText?n.cssText:""},e})(),Yo=(function(){function e(t){this.element=lr(t),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(t,n){if(t<=this.length&&t>=0){var r=document.createTextNode(n);return this.element.insertBefore(r,this.nodes[t]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(t){this.element.removeChild(this.nodes[t]),this.length--},e.prototype.getRule=function(t){return t<this.length?this.nodes[t].textContent:""},e})(),Uo=(function(){function e(t){this.rules=[],this.length=0}return e.prototype.insertRule=function(t,n){return t<=this.length&&(this.rules.splice(t,0,n),this.length++,!0)},e.prototype.deleteRule=function(t){this.rules.splice(t,1),this.length--},e.prototype.getRule=function(t){return t<this.length?this.rules[t]:""},e})(),jn=bt,Ko={isServer:!bt,useCSSOMInjection:!So},cr=(function(){function e(t,n,r){t===void 0&&(t=We),n===void 0&&(n={});var o=this;this.options=G(G({},Ko),t),this.gs=n,this.names=new Map(r),this.server=!!t.isServer,!this.server&&bt&&jn&&(jn=!1,An(this)),Jt(this,function(){return(function(a){for(var i=a.getTag(),c=i.length,d="",h=function(u){var b=(function(R){return wt.get(R)})(u);if(b===void 0)return"continue";var f=a.names.get(b),m=i.getGroup(u);if(f===void 0||!f.size||m.length===0)return"continue";var v="".concat(ze,".g").concat(u,'[id="').concat(b,'"]'),C="";f!==void 0&&f.forEach(function(R){R.length>0&&(C+="".concat(R,","))}),d+="".concat(m).concat(v,'{content:"').concat(C,'"}').concat(Xt)},p=0;p<c;p++)h(p);return d})(o)})}return e.registerId=function(t){return st(t)},e.prototype.rehydrate=function(){!this.server&&bt&&An(this)},e.prototype.reconstructWithOptions=function(t,n){return n===void 0&&(n=!0),new e(G(G({},this.options),t),this.gs,n&&this.names||void 0)},e.prototype.allocateGSInstance=function(t){return this.gs[t]=(this.gs[t]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(t=(function(n){var r=n.useCSSOMInjection,o=n.target;return n.isServer?new Uo(o):r?new Vo(o):new Yo(o)})(this.options),new No(t)));var t},e.prototype.hasNameForId=function(t,n){return this.names.has(t)&&this.names.get(t).has(n)},e.prototype.registerName=function(t,n){if(st(t),this.names.has(t))this.names.get(t).add(n);else{var r=new Set;r.add(n),this.names.set(t,r)}},e.prototype.insertRules=function(t,n,r){this.registerName(t,n),this.getTag().insertRules(st(t),r)},e.prototype.clearNames=function(t){this.names.has(t)&&this.names.get(t).clear()},e.prototype.clearRules=function(t){this.getTag().clearGroup(st(t)),this.clearNames(t)},e.prototype.clearTag=function(){this.tag=void 0},e})(),qo=/&/g,Xo=/^\s*\/\/.*$/gm;function dr(e,t){return e.map(function(n){return n.type==="rule"&&(n.value="".concat(t," ").concat(n.value),n.value=n.value.replaceAll(",",",".concat(t," ")),n.props=n.props.map(function(r){return"".concat(t," ").concat(r)})),Array.isArray(n.children)&&n.type!=="@keyframes"&&(n.children=dr(n.children,t)),n})}function Zo(e){var t,n,r,o=We,a=o.options,i=a===void 0?We:a,c=o.plugins,d=c===void 0?Et:c,h=function(b,f,m){return m.startsWith(n)&&m.endsWith(n)&&m.replaceAll(n,"").length>0?".".concat(t):b},p=d.slice();p.push(function(b){b.type===vt&&b.value.includes("&")&&(b.props[0]=b.props[0].replace(qo,n).replace(r,h))}),i.prefix&&p.push(vo),p.push(wo);var u=function(b,f,m,v){f===void 0&&(f=""),m===void 0&&(m=""),v===void 0&&(v="&"),t=v,n=f,r=new RegExp("\\".concat(n,"\\b"),"g");var C=b.replace(Xo,""),R=mo(m||f?"".concat(m," ").concat(f," { ").concat(C," }"):C);i.namespace&&(R=dr(R,i.namespace));var $=[];return mt(R,yo(p.concat(xo(function(w){return $.push(w)})))),$};return u.hash=d.length?d.reduce(function(b,f){return f.name||Ae(15),Ne(b,f.name)},nr).toString():"",u}var Jo=new cr,Gt=Zo(),ur=P.createContext({shouldForwardProp:void 0,styleSheet:Jo,stylis:Gt});ur.Consumer;P.createContext(void 0);function _n(){return s.useContext(ur)}var Qo=(function(){function e(t,n){var r=this;this.inject=function(o,a){a===void 0&&(a=Gt);var i=r.name+a.hash;o.hasNameForId(r.id,i)||o.insertRules(r.id,i,a(r.rules,i,"@keyframes"))},this.name=t,this.id="sc-keyframes-".concat(t),this.rules=n,Jt(this,function(){throw Ae(12,String(r.name))})}return e.prototype.getName=function(t){return t===void 0&&(t=Gt),this.name+t.hash},e})(),ea=function(e){return e>="A"&&e<="Z"};function Fn(e){for(var t="",n=0;n<e.length;n++){var r=e[n];if(n===1&&r==="-"&&e[0]==="-")return e;ea(r)?t+="-"+r.toLowerCase():t+=r}return t.startsWith("ms-")?"-"+t:t}var pr=function(e){return e==null||e===!1||e===""},gr=function(e){var t,n,r=[];for(var o in e){var a=e[o];e.hasOwnProperty(o)&&!pr(a)&&(Array.isArray(a)&&a.isCss||Ie(a)?r.push("".concat(Fn(o),":"),a,";"):Qe(a)?r.push.apply(r,ht(ht(["".concat(o," {")],gr(a),!1),["}"],!1)):r.push("".concat(Fn(o),": ").concat((t=o,(n=a)==null||typeof n=="boolean"||n===""?"":typeof n!="number"||n===0||t in Co||t.startsWith("--")?String(n).trim():"".concat(n,"px")),";")))}return r};function De(e,t,n,r){if(pr(e))return[];if(Zt(e))return[".".concat(e.styledComponentId)];if(Ie(e)){if(!Ie(a=e)||a.prototype&&a.prototype.isReactComponent||!t)return[e];var o=e(t);return De(o,t,n,r)}var a;return e instanceof Qo?n?(e.inject(n,r),[e.getName(r)]):[e]:Qe(e)?gr(e):Array.isArray(e)?Array.prototype.concat.apply(Et,e.map(function(i){return De(i,t,n,r)})):[e.toString()]}function ta(e){for(var t=0;t<e.length;t+=1){var n=e[t];if(Ie(n)&&!Zt(n))return!1}return!0}var na=rr($t),ra=(function(){function e(t,n,r){this.rules=t,this.staticRulesId="",this.isStatic=(r===void 0||r.isStatic)&&ta(t),this.componentId=n,this.baseHash=Ne(na,n),this.baseStyle=r,cr.registerId(n)}return e.prototype.generateAndInjectStyles=function(t,n,r){var o=this.baseStyle?this.baseStyle.generateAndInjectStyles(t,n,r):"";if(this.isStatic&&!r.hash)if(this.staticRulesId&&n.hasNameForId(this.componentId,this.staticRulesId))o=Pe(o,this.staticRulesId);else{var a=In(De(this.rules,t,n,r)),i=Wt(Ne(this.baseHash,a)>>>0);if(!n.hasNameForId(this.componentId,i)){var c=r(a,".".concat(i),void 0,this.componentId);n.insertRules(this.componentId,i,c)}o=Pe(o,i),this.staticRulesId=i}else{for(var d=Ne(this.baseHash,r.hash),h="",p=0;p<this.rules.length;p++){var u=this.rules[p];if(typeof u=="string")h+=u;else if(u){var b=In(De(u,t,n,r));d=Ne(d,b+p),h+=b}}if(h){var f=Wt(d>>>0);n.hasNameForId(this.componentId,f)||n.insertRules(this.componentId,f,r(h,".".concat(f),void 0,this.componentId)),o=Pe(o,f)}}return o},e})(),yt=P.createContext(void 0);yt.Consumer;function oa(e){var t=P.useContext(yt),n=s.useMemo(function(){return(function(r,o){if(!r)throw Ae(14);if(Ie(r)){var a=r(o);return a}if(Array.isArray(r)||typeof r!="object")throw Ae(8);return o?G(G({},o),r):r})(e.theme,t)},[e.theme,t]);return e.children?P.createElement(yt.Provider,{value:n},e.children):null}var Ht={};function aa(e,t,n){var r=Zt(e),o=e,a=!Ft(e),i=t.attrs,c=i===void 0?Et:i,d=t.componentId,h=d===void 0?(function(S,D){var E=typeof S!="string"?"sc":En(S);Ht[E]=(Ht[E]||0)+1;var g="".concat(E,"-").concat(Po($t+E+Ht[E]));return D?"".concat(D,"-").concat(g):g})(t.displayName,t.parentComponentId):d,p=t.displayName,u=p===void 0?(function(S){return Ft(S)?"styled.".concat(S):"Styled(".concat(ko(S),")")})(e):p,b=t.displayName&&t.componentId?"".concat(En(t.displayName),"-").concat(t.componentId):t.componentId||h,f=r&&o.attrs?o.attrs.concat(c).filter(Boolean):c,m=t.shouldForwardProp;if(r&&o.shouldForwardProp){var v=o.shouldForwardProp;if(t.shouldForwardProp){var C=t.shouldForwardProp;m=function(S,D){return v(S,D)&&C(S,D)}}else m=v}var R=new ra(n,b,r?o.componentStyle:void 0);function $(S,D){return(function(E,g,A){var U=E.attrs,V=E.componentStyle,Q=E.defaultProps,ae=E.foldedComponentIds,F=E.styledComponentId,fe=E.target,Se=P.useContext(yt),he=_n(),se=E.shouldForwardProp||he.shouldForwardProp,je=Ro(g,Se,Q)||We,K=(function(de,X,be){for(var ue,ee=G(G({},X),{className:void 0,theme:be}),$e=0;$e<de.length;$e+=1){var Z=Ie(ue=de[$e])?ue(ee):ue;for(var W in Z)ee[W]=W==="className"?Pe(ee[W],Z[W]):W==="style"?G(G({},ee[W]),Z[W]):Z[W]}return X.className&&(ee.className=Pe(ee.className,X.className)),ee})(U,g,je),me=K.as||fe,ce={};for(var M in K)K[M]===void 0||M[0]==="$"||M==="as"||M==="theme"&&K.theme===je||(M==="forwardedAs"?ce.as=K.forwardedAs:se&&!se(M,me)||(ce[M]=K[M]));var Re=(function(de,X){var be=_n(),ue=de.generateAndInjectStyles(X,be.styleSheet,be.stylis);return ue})(V,K),q=Pe(ae,F);return Re&&(q+=" "+Re),K.className&&(q+=" "+K.className),ce[Ft(me)&&!tr.has(me)?"class":"className"]=q,A&&(ce.ref=A),s.createElement(me,ce)})(w,S,D)}$.displayName=u;var w=P.forwardRef($);return w.attrs=f,w.componentStyle=R,w.displayName=u,w.shouldForwardProp=m,w.foldedComponentIds=r?Pe(o.foldedComponentIds,o.styledComponentId):"",w.styledComponentId=b,w.target=r?o.target:e,Object.defineProperty(w,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(S){this._foldedDefaultProps=r?(function(D){for(var E=[],g=1;g<arguments.length;g++)E[g-1]=arguments[g];for(var A=0,U=E;A<U.length;A++)Bt(D,U[A],!0);return D})({},o.defaultProps,S):S}}),Jt(w,function(){return".".concat(w.styledComponentId)}),a&&ir(w,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),w}function Hn(e,t){for(var n=[e[0]],r=0,o=t.length;r<o;r+=1)n.push(t[r],e[r+1]);return n}var Tn=function(e){return Object.assign(e,{isCss:!0})};function L(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];if(Ie(e)||Qe(e))return Tn(De(Hn(Et,ht([e],t,!0))));var r=e;return t.length===0&&r.length===1&&typeof r[0]=="string"?De(r):Tn(De(Hn(r,t)))}function Vt(e,t,n){if(n===void 0&&(n=We),!t)throw Ae(1,t);var r=function(o){for(var a=[],i=1;i<arguments.length;i++)a[i-1]=arguments[i];return e(t,n,L.apply(void 0,ht([o],a,!1)))};return r.attrs=function(o){return Vt(e,t,G(G({},n),{attrs:Array.prototype.concat(n.attrs,o).filter(Boolean)}))},r.withConfig=function(o){return Vt(e,t,G(G({},n),o))},r}var fr=function(e){return Vt(aa,e)},k=fr;tr.forEach(function(e){k[e]=fr(e)});var Ce;function Be(e,t){return e[t]}function sa(e=[],t,n=0){return[...e.slice(0,n),t,...e.slice(n)]}function ia(e=[],t,n="id"){const r=e.slice(),o=Be(t,n);return o?r.splice(r.findIndex((a=>Be(a,n)===o)),1):r.splice(r.findIndex((a=>a===t)),1),r}function Nn(e){return e.map(((t,n)=>{const r=Object.assign(Object.assign({},t),{sortable:t.sortable||!!t.sortFunction||void 0});return t.id||(r.id=n+1),r}))}function Ze(e,t){return Math.ceil(e/t)}function Tt(e,t){return Math.min(e,t)}(function(e){e.ASC="asc",e.DESC="desc"})(Ce||(Ce={}));const N=()=>null;function hr(e,t=[],n=[]){let r={},o=[...n];return t.length&&t.forEach((a=>{if(!a.when||typeof a.when!="function")throw new Error('"when" must be defined in the conditional style object and must be function');a.when(e)&&(r=a.style||{},a.classNames&&(o=[...o,...a.classNames]),typeof a.style=="function"&&(r=a.style(e)||{}))})),{conditionalStyle:r,classNames:o.join(" ")}}function ft(e,t=[],n="id"){const r=Be(e,n);return r?t.some((o=>Be(o,n)===r)):t.some((o=>o===e))}function it(e,t){return t?e.findIndex((n=>Je(n.id,t))):-1}function Je(e,t){return e==t}function la(e,t){const n=!e.toggleOnSelectedRowsChange;switch(t.type){case"SELECT_ALL_ROWS":{const{keyField:r,rows:o,rowCount:a,mergeSelections:i}=t,c=!e.allSelected,d=!e.toggleOnSelectedRowsChange;if(i){const h=c?[...e.selectedRows,...o.filter((p=>!ft(p,e.selectedRows,r)))]:e.selectedRows.filter((p=>!ft(p,o,r)));return Object.assign(Object.assign({},e),{allSelected:c,selectedCount:h.length,selectedRows:h,toggleOnSelectedRowsChange:d})}return Object.assign(Object.assign({},e),{allSelected:c,selectedCount:c?a:0,selectedRows:c?o:[],toggleOnSelectedRowsChange:d})}case"SELECT_SINGLE_ROW":{const{keyField:r,row:o,isSelected:a,rowCount:i,singleSelect:c}=t;return c?a?Object.assign(Object.assign({},e),{selectedCount:0,allSelected:!1,selectedRows:[],toggleOnSelectedRowsChange:n}):Object.assign(Object.assign({},e),{selectedCount:1,allSelected:!1,selectedRows:[o],toggleOnSelectedRowsChange:n}):a?Object.assign(Object.assign({},e),{selectedCount:e.selectedRows.length>0?e.selectedRows.length-1:0,allSelected:!1,selectedRows:ia(e.selectedRows,o,r),toggleOnSelectedRowsChange:n}):Object.assign(Object.assign({},e),{selectedCount:e.selectedRows.length+1,allSelected:e.selectedRows.length+1===i,selectedRows:sa(e.selectedRows,o),toggleOnSelectedRowsChange:n})}case"SELECT_MULTIPLE_ROWS":{const{keyField:r,selectedRows:o,totalRows:a,mergeSelections:i}=t;if(i){const c=[...e.selectedRows,...o.filter((d=>!ft(d,e.selectedRows,r)))];return Object.assign(Object.assign({},e),{selectedCount:c.length,allSelected:!1,selectedRows:c,toggleOnSelectedRowsChange:n})}return Object.assign(Object.assign({},e),{selectedCount:o.length,allSelected:o.length===a,selectedRows:o,toggleOnSelectedRowsChange:n})}case"CLEAR_SELECTED_ROWS":{const{selectedRowsFlag:r}=t;return Object.assign(Object.assign({},e),{allSelected:!1,selectedCount:0,selectedRows:[],selectedRowsFlag:r})}case"SORT_CHANGE":{const{sortDirection:r,selectedColumn:o,clearSelectedOnSort:a}=t;return Object.assign(Object.assign(Object.assign({},e),{selectedColumn:o,sortDirection:r,currentPage:1}),a&&{allSelected:!1,selectedCount:0,selectedRows:[],toggleOnSelectedRowsChange:n})}case"CHANGE_PAGE":{const{page:r,paginationServer:o,visibleOnly:a,persistSelectedOnPageChange:i}=t,c=o&&i,d=o&&!i||a;return Object.assign(Object.assign(Object.assign(Object.assign({},e),{currentPage:r}),c&&{allSelected:!1}),d&&{allSelected:!1,selectedCount:0,selectedRows:[],toggleOnSelectedRowsChange:n})}case"CHANGE_ROWS_PER_PAGE":{const{rowsPerPage:r,page:o}=t;return Object.assign(Object.assign({},e),{currentPage:o,rowsPerPage:r})}}}const ca=L`
	pointer-events: none;
	opacity: 0.4;
`,da=k.div`
	position: relative;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	max-width: 100%;
	${({disabled:e})=>e&&ca};
	${({theme:e})=>e.table.style};
`,ua=L`
	position: sticky;
	position: -webkit-sticky; /* Safari */
	top: 0;
	z-index: 1;
`,pa=k.div`
	display: flex;
	width: 100%;
	${({$fixedHeader:e})=>e&&ua};
	${({theme:e})=>e.head.style};
`,ga=k.div`
	display: flex;
	align-items: stretch;
	width: 100%;
	${({theme:e})=>e.headRow.style};
	${({$dense:e,theme:t})=>e&&t.headRow.denseStyle};
`,mr=(e,...t)=>L`
		@media screen and (max-width: ${599}px) {
			${L(e,...t)}
		}
	`,fa=(e,...t)=>L`
		@media screen and (max-width: ${959}px) {
			${L(e,...t)}
		}
	`,ha=(e,...t)=>L`
		@media screen and (max-width: ${1280}px) {
			${L(e,...t)}
		}
	`,ma=e=>(t,...n)=>L`
			@media screen and (max-width: ${e}px) {
				${L(t,...n)}
			}
		`,Ye=k.div`
	position: relative;
	display: flex;
	align-items: center;
	box-sizing: border-box;
	line-height: normal;
	${({theme:e,$headCell:t})=>e[t?"headCells":"cells"].style};
	${({$noPadding:e})=>e&&"padding: 0"};
`,br=k(Ye)`
	flex-grow: ${({button:e,grow:t})=>t===0||e?0:t||1};
	flex-shrink: 0;
	flex-basis: 0;
	max-width: ${({maxWidth:e})=>e||"100%"};
	min-width: ${({minWidth:e})=>e||"100px"};
	${({width:e})=>e&&L`
			min-width: ${e};
			max-width: ${e};
		`};
	${({right:e})=>e&&"justify-content: flex-end"};
	${({button:e,center:t})=>(t||e)&&"justify-content: center"};
	${({compact:e,button:t})=>(e||t)&&"padding: 0"};

	/* handle hiding cells */
	${({hide:e})=>e&&e==="sm"&&mr`
    display: none;
  `};
	${({hide:e})=>e&&e==="md"&&fa`
    display: none;
  `};
	${({hide:e})=>e&&e==="lg"&&ha`
    display: none;
  `};
	${({hide:e})=>e&&Number.isInteger(e)&&ma(e)`
    display: none;
  `};
`,ba=L`
	div:first-child {
		white-space: ${({$wrapCell:e})=>e?"normal":"nowrap"};
		overflow: ${({$allowOverflow:e})=>e?"visible":"hidden"};
		text-overflow: ellipsis;
	}
`,wa=k(br).attrs((e=>({style:e.style})))`
	${({$renderAsCell:e})=>!e&&ba};
	${({theme:e,$isDragging:t})=>t&&e.cells.draggingStyle};
	${({$cellStyle:e})=>e};
`;var ya=s.memo((function({id:e,column:t,row:n,rowIndex:r,dataTag:o,isDragging:a,onDragStart:i,onDragOver:c,onDragEnd:d,onDragEnter:h,onDragLeave:p}){const{conditionalStyle:u,classNames:b}=hr(n,t.conditionalCellStyles,["rdt_TableCell"]);return s.createElement(wa,{id:e,"data-column-id":t.id,role:"cell",className:b,"data-tag":o,$cellStyle:t.style,$renderAsCell:!!t.cell,$allowOverflow:t.allowOverflow,button:t.button,center:t.center,compact:t.compact,grow:t.grow,hide:t.hide,maxWidth:t.maxWidth,minWidth:t.minWidth,right:t.right,width:t.width,$wrapCell:t.wrap,style:u,$isDragging:a,onDragStart:i,onDragOver:c,onDragEnd:d,onDragEnter:h,onDragLeave:p},!t.cell&&s.createElement("div",{"data-tag":o},(function(f,m,v,C){return m?v&&typeof v=="function"?v(f,C):m(f,C):null})(n,t.selector,t.format,r)),t.cell&&t.cell(n,r,t,e))}));const Ln="input";var wr=s.memo((function({name:e,component:t=Ln,componentOptions:n={style:{}},indeterminate:r=!1,checked:o=!1,disabled:a=!1,onClick:i=N}){const c=t,d=c!==Ln?n.style:(p=>Object.assign(Object.assign({fontSize:"18px"},!p&&{cursor:"pointer"}),{padding:0,marginTop:"1px",verticalAlign:"middle",position:"relative"}))(a),h=s.useMemo((()=>(function(p,...u){let b;return Object.keys(p).map((f=>p[f])).forEach(((f,m)=>{typeof f=="function"&&(b=Object.assign(Object.assign({},p),{[Object.keys(p)[m]]:f(...u)}))})),b||p})(n,r)),[n,r]);return s.createElement(c,Object.assign({type:"checkbox",ref:p=>{p&&(p.indeterminate=r)},style:d,onClick:a?N:i,name:e,"aria-label":e,checked:o,disabled:a},h,{onChange:N}))}));const xa=k(Ye)`
	flex: 0 0 48px;
	min-width: 48px;
	justify-content: center;
	align-items: center;
	user-select: none;
	white-space: nowrap;
`;function va({name:e,keyField:t,row:n,rowCount:r,selected:o,selectableRowsComponent:a,selectableRowsComponentProps:i,selectableRowsSingle:c,selectableRowDisabled:d,onSelectedRow:h}){const p=!(!d||!d(n));return s.createElement(xa,{onClick:u=>u.stopPropagation(),className:"rdt_TableCell",$noPadding:!0},s.createElement(wr,{name:e,component:a,componentOptions:i,checked:o,"aria-checked":o,onClick:()=>{h({type:"SELECT_SINGLE_ROW",row:n,isSelected:o,keyField:t,rowCount:r,singleSelect:c})},disabled:p}))}const Ca=k.button`
	display: inline-flex;
	align-items: center;
	user-select: none;
	white-space: nowrap;
	border: none;
	background-color: transparent;
	${({theme:e})=>e.expanderButton.style};
`;function Sa({disabled:e=!1,expanded:t=!1,expandableIcon:n,id:r,row:o,onToggled:a}){const i=t?n.expanded:n.collapsed;return s.createElement(Ca,{"aria-disabled":e,onClick:()=>a&&a(o),"data-testid":`expander-button-${r}`,disabled:e,"aria-label":t?"Collapse Row":"Expand Row",role:"button",type:"button"},i)}const Ra=k(Ye)`
	white-space: nowrap;
	font-weight: 400;
	min-width: 48px;
	${({theme:e})=>e.expanderCell.style};
`;function $a({row:e,expanded:t=!1,expandableIcon:n,id:r,onToggled:o,disabled:a=!1}){return s.createElement(Ra,{onClick:i=>i.stopPropagation(),$noPadding:!0},s.createElement(Sa,{id:r,row:e,expanded:t,expandableIcon:n,disabled:a,onToggled:o}))}const Ea=k.div`
	width: 100%;
	box-sizing: border-box;
	${({theme:e})=>e.expanderRow.style};
	${({$extendedRowStyle:e})=>e};
`;var Oa=s.memo((function({data:e,ExpanderComponent:t,expanderComponentProps:n,extendedRowStyle:r,extendedClassNames:o}){const a=["rdt_ExpanderRow",...o.split(" ").filter((i=>i!=="rdt_TableRow"))].join(" ");return s.createElement(Ea,{className:a,$extendedRowStyle:r},s.createElement(t,Object.assign({data:e},n)))}));const Nt="allowRowEvents";var xt,Yt,Mn;(function(e){e.LTR="ltr",e.RTL="rtl",e.AUTO="auto"})(xt||(xt={})),(function(e){e.LEFT="left",e.RIGHT="right",e.CENTER="center"})(Yt||(Yt={})),(function(e){e.SM="sm",e.MD="md",e.LG="lg"})(Mn||(Mn={}));const Pa=L`
	&:hover {
		${({$highlightOnHover:e,theme:t})=>e&&t.rows.highlightOnHoverStyle};
	}
`,ka=L`
	&:hover {
		cursor: pointer;
	}
`,Da=k.div.attrs((e=>({style:e.style})))`
	display: flex;
	align-items: stretch;
	align-content: stretch;
	width: 100%;
	box-sizing: border-box;
	${({theme:e})=>e.rows.style};
	${({$dense:e,theme:t})=>e&&t.rows.denseStyle};
	${({$striped:e,theme:t})=>e&&t.rows.stripedStyle};
	${({$highlightOnHover:e})=>e&&Pa};
	${({$pointerOnHover:e})=>e&&ka};
	${({$selected:e,theme:t})=>e&&t.rows.selectedHighlightStyle};
	${({$conditionalStyle:e})=>e};
`;function Ia({columns:e=[],conditionalRowStyles:t=[],defaultExpanded:n=!1,defaultExpanderDisabled:r=!1,dense:o=!1,expandableIcon:a,expandableRows:i=!1,expandableRowsComponent:c,expandableRowsComponentProps:d,expandableRowsHideExpander:h,expandOnRowClicked:p=!1,expandOnRowDoubleClicked:u=!1,highlightOnHover:b=!1,id:f,expandableInheritConditionalStyles:m,keyField:v,onRowClicked:C=N,onRowDoubleClicked:R=N,onRowMouseEnter:$=N,onRowMouseLeave:w=N,onRowExpandToggled:S=N,onSelectedRow:D=N,pointerOnHover:E=!1,row:g,rowCount:A,rowIndex:U,selectableRowDisabled:V=null,selectableRows:Q=!1,selectableRowsComponent:ae,selectableRowsComponentProps:F,selectableRowsHighlight:fe=!1,selectableRowsSingle:Se=!1,selected:he,striped:se=!1,draggingColumnId:je,onDragStart:K,onDragOver:me,onDragEnd:ce,onDragEnter:M,onDragLeave:Re}){const[q,de]=s.useState(n);s.useEffect((()=>{de(n)}),[n]);const X=s.useCallback((()=>{de(!q),S(!q,g)}),[q,S,g]),be=E||i&&(p||u),ue=s.useCallback((T=>{T.target.getAttribute("data-tag")===Nt&&(C(g,T),!r&&i&&p&&X())}),[r,p,i,X,C,g]),ee=s.useCallback((T=>{T.target.getAttribute("data-tag")===Nt&&(R(g,T),!r&&i&&u&&X())}),[r,u,i,X,R,g]),$e=s.useCallback((T=>{$(g,T)}),[$,g]),Z=s.useCallback((T=>{w(g,T)}),[w,g]),W=Be(g,v),{conditionalStyle:tt,classNames:nt}=hr(g,t,["rdt_TableRow"]),Ot=fe&&he,Pt=m?tt:{},kt=se&&U%2==0;return s.createElement(s.Fragment,null,s.createElement(Da,{id:`row-${f}`,role:"row",$striped:kt,$highlightOnHover:b,$pointerOnHover:!r&&be,$dense:o,onClick:ue,onDoubleClick:ee,onMouseEnter:$e,onMouseLeave:Z,className:nt,$selected:Ot,$conditionalStyle:tt},Q&&s.createElement(va,{name:`select-row-${W}`,keyField:v,row:g,rowCount:A,selected:he,selectableRowsComponent:ae,selectableRowsComponentProps:F,selectableRowDisabled:V,selectableRowsSingle:Se,onSelectedRow:D}),i&&!h&&s.createElement($a,{id:W,expandableIcon:a,expanded:q,row:g,onToggled:X,disabled:r}),e.map((T=>T.omit?null:s.createElement(ya,{id:`cell-${T.id}-${W}`,key:`cell-${T.id}-${W}`,dataTag:T.ignoreRowClick||T.button?null:Nt,column:T,row:g,rowIndex:U,isDragging:Je(je,T.id),onDragStart:K,onDragOver:me,onDragEnd:ce,onDragEnter:M,onDragLeave:Re})))),i&&q&&s.createElement(Oa,{key:`expander-${W}`,data:g,extendedRowStyle:Pt,extendedClassNames:nt,ExpanderComponent:c,expanderComponentProps:d}))}const Aa=k.span`
	padding: 2px;
	color: inherit;
	flex-grow: 0;
	flex-shrink: 0;
	${({$sortActive:e})=>e?"opacity: 1":"opacity: 0"};
	${({$sortDirection:e})=>e==="desc"&&"transform: rotate(180deg)"};
`,ja=({sortActive:e,sortDirection:t})=>P.createElement(Aa,{$sortActive:e,$sortDirection:t},"▲"),_a=k(br)`
	${({button:e})=>e&&"text-align: center"};
	${({theme:e,$isDragging:t})=>t&&e.headCells.draggingStyle};
`,Fa=L`
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

	${({$sortActive:e})=>!e&&L`
			&:hover,
			&:focus {
				opacity: 0.7;

				span,
				span.__rdt_custom_sort_icon__ * {
					opacity: 0.7;
				}
			}
		`};
`,Ha=k.div`
	display: inline-flex;
	align-items: center;
	justify-content: inherit;
	height: 100%;
	width: 100%;
	outline: none;
	user-select: none;
	overflow: hidden;
	${({disabled:e})=>!e&&Fa};
`,Ta=k.div`
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;var Na=s.memo((function({column:e,disabled:t,draggingColumnId:n,selectedColumn:r={},sortDirection:o,sortIcon:a,sortServer:i,pagination:c,paginationServer:d,persistSelectedOnSort:h,selectableRowsVisibleOnly:p,onSort:u,onDragStart:b,onDragOver:f,onDragEnd:m,onDragEnter:v,onDragLeave:C}){s.useEffect((()=>{typeof e.selector=="string"&&console.error(`Warning: ${e.selector} is a string based column selector which has been deprecated as of v7 and will be removed in v8. Instead, use a selector function e.g. row => row[field]...`)}),[]);const[R,$]=s.useState(!1),w=s.useRef(null);if(s.useEffect((()=>{w.current&&$(w.current.scrollWidth>w.current.clientWidth)}),[R]),e.omit)return null;const S=()=>{if(!e.sortable&&!e.selector)return;let F=o;Je(r.id,e.id)&&(F=o===Ce.ASC?Ce.DESC:Ce.ASC),u({type:"SORT_CHANGE",sortDirection:F,selectedColumn:e,clearSelectedOnSort:c&&d&&!h||i||p})},D=F=>s.createElement(ja,{sortActive:F,sortDirection:o}),E=()=>s.createElement("span",{className:[o,"__rdt_custom_sort_icon__"].join(" ")},a),g=!(!e.sortable||!Je(r.id,e.id)),A=!e.sortable||t,U=e.sortable&&!a&&!e.right,V=e.sortable&&!a&&e.right,Q=e.sortable&&a&&!e.right,ae=e.sortable&&a&&e.right;return s.createElement(_a,{"data-column-id":e.id,className:"rdt_TableCol",$headCell:!0,allowOverflow:e.allowOverflow,button:e.button,compact:e.compact,grow:e.grow,hide:e.hide,maxWidth:e.maxWidth,minWidth:e.minWidth,right:e.right,center:e.center,width:e.width,draggable:e.reorder,$isDragging:Je(e.id,n),onDragStart:b,onDragOver:f,onDragEnd:m,onDragEnter:v,onDragLeave:C},e.name&&s.createElement(Ha,{"data-column-id":e.id,"data-sort-id":e.id,role:"columnheader",tabIndex:0,className:"rdt_TableCol_Sortable",onClick:A?void 0:S,onKeyPress:A?void 0:F=>{F.key==="Enter"&&S()},$sortActive:!A&&g,disabled:A},!A&&ae&&E(),!A&&V&&D(g),typeof e.name=="string"?s.createElement(Ta,{title:R?e.name:void 0,ref:w,"data-column-id":e.id},e.name):e.name,!A&&Q&&E(),!A&&U&&D(g)))}));const La=k(Ye)`
	flex: 0 0 48px;
	justify-content: center;
	align-items: center;
	user-select: none;
	white-space: nowrap;
	font-size: unset;
`;function Ma({headCell:e=!0,rowData:t,keyField:n,allSelected:r,mergeSelections:o,selectedRows:a,selectableRowsComponent:i,selectableRowsComponentProps:c,selectableRowDisabled:d,onSelectAllRows:h}){const p=a.length>0&&!r,u=d?t.filter((m=>!d(m))):t,b=u.length===0,f=Math.min(t.length,u.length);return s.createElement(La,{className:"rdt_TableCol",$headCell:e,$noPadding:!0},s.createElement(wr,{name:"select-all-rows",component:i,componentOptions:c,onClick:()=>{h({type:"SELECT_ALL_ROWS",rows:u,rowCount:f,mergeSelections:o,keyField:n})},checked:r,indeterminate:p,disabled:b}))}function yr(e=xt.AUTO){const t=typeof window=="object",[n,r]=s.useState(!1);return s.useEffect((()=>{if(t)if(e!=="auto")r(e==="rtl");else{const o=!(!window.document||!window.document.createElement),a=document.getElementsByTagName("BODY")[0],i=document.getElementsByTagName("HTML")[0],c=a.dir==="rtl"||i.dir==="rtl";r(o&&c)}}),[e,t]),n}const za=k.div`
	display: flex;
	align-items: center;
	flex: 1 0 auto;
	height: 100%;
	color: ${({theme:e})=>e.contextMenu.fontColor};
	font-size: ${({theme:e})=>e.contextMenu.fontSize};
	font-weight: 400;
`,Wa=k.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	flex-wrap: wrap;
`,zn=k.div`
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
`;function Ba({contextMessage:e,contextActions:t,contextComponent:n,selectedCount:r,direction:o}){const a=yr(o),i=r>0;return n?s.createElement(zn,{$visible:i},s.cloneElement(n,{selectedCount:r})):s.createElement(zn,{$visible:i,$rtl:a},s.createElement(za,null,((c,d,h)=>{if(d===0)return null;const p=d===1?c.singular:c.plural;return h?`${d} ${c.message||""} ${p}`:`${d} ${p} ${c.message||""}`})(e,r,a)),s.createElement(Wa,null,t))}const Ga=k.div`
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
`,Va=k.div`
	flex: 1 0 auto;
	color: ${({theme:e})=>e.header.fontColor};
	font-size: ${({theme:e})=>e.header.fontSize};
	font-weight: 400;
`,Ya=k.div`
	flex: 1 0 auto;
	display: flex;
	align-items: center;
	justify-content: flex-end;

	> * {
		margin-left: 5px;
	}
`,Ua=({title:e,actions:t=null,contextMessage:n,contextActions:r,contextComponent:o,selectedCount:a,direction:i,showMenu:c=!0})=>s.createElement(Ga,{className:"rdt_TableHeader",role:"heading","aria-level":1},s.createElement(Va,null,e),t&&s.createElement(Ya,null,t),c&&s.createElement(Ba,{contextMessage:n,contextActions:r,contextComponent:o,direction:i,selectedCount:a}));function xr(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function"){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n}const Ka={left:"flex-start",right:"flex-end",center:"center"},qa=k.header`
	position: relative;
	display: flex;
	flex: 1 1 auto;
	box-sizing: border-box;
	align-items: center;
	padding: 4px 16px 4px 24px;
	width: 100%;
	justify-content: ${({align:e})=>Ka[e]};
	flex-wrap: ${({$wrapContent:e})=>e?"wrap":"nowrap"};
	${({theme:e})=>e.subHeader.style}
`,Xa=e=>{var{align:t="right",wrapContent:n=!0}=e,r=xr(e,["align","wrapContent"]);return s.createElement(qa,Object.assign({align:t,$wrapContent:n},r))},Za=k.div`
	display: flex;
	flex-direction: column;
`,Ja=k.div`
	position: relative;
	width: 100%;
	border-radius: inherit;
	${({$responsive:e,$fixedHeader:t})=>e&&L`
			overflow-x: auto;

			// hidden prevents vertical scrolling in firefox when fixedHeader is disabled
			overflow-y: ${t?"auto":"hidden"};
			min-height: 0;
		`};

	${({$fixedHeader:e=!1,$fixedHeaderScrollHeight:t="100vh"})=>e&&L`
			max-height: ${t};
			-webkit-overflow-scrolling: touch;
		`};

	${({theme:e})=>e.responsiveWrapper.style};
`,Wn=k.div`
	position: relative;
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	${e=>e.theme.progress.style};
`,Qa=k.div`
	position: relative;
	width: 100%;
	${({theme:e})=>e.tableWrapper.style};
`,es=k(Ye)`
	white-space: nowrap;
	${({theme:e})=>e.expanderCell.style};
`,ts=k.div`
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	${({theme:e})=>e.noData.style};
`,ns=()=>P.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},P.createElement("path",{d:"M7 10l5 5 5-5z"}),P.createElement("path",{d:"M0 0h24v24H0z",fill:"none"})),rs=k.select`
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
`,os=k.div`
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
`,as=e=>{var{defaultValue:t,onChange:n}=e,r=xr(e,["defaultValue","onChange"]);return s.createElement(os,null,s.createElement(rs,Object.assign({onChange:n,defaultValue:t},r)),s.createElement(ns,null))},l={columns:[],data:[],title:"",keyField:"id",selectableRows:!1,selectableRowsHighlight:!1,selectableRowsNoSelectAll:!1,selectableRowSelected:null,selectableRowDisabled:null,selectableRowsComponent:"input",selectableRowsComponentProps:{},selectableRowsVisibleOnly:!1,selectableRowsSingle:!1,clearSelectedRows:!1,expandableRows:!1,expandableRowDisabled:null,expandableRowExpanded:null,expandOnRowClicked:!1,expandableRowsHideExpander:!1,expandOnRowDoubleClicked:!1,expandableInheritConditionalStyles:!1,expandableRowsComponent:function(){return P.createElement("div",null,"To add an expander pass in a component instance via ",P.createElement("strong",null,"expandableRowsComponent"),". You can then access props.data from this component.")},expandableIcon:{collapsed:P.createElement((()=>P.createElement("svg",{fill:"currentColor",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg"},P.createElement("path",{d:"M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"}),P.createElement("path",{d:"M0-.25h24v24H0z",fill:"none"}))),null),expanded:P.createElement((()=>P.createElement("svg",{fill:"currentColor",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg"},P.createElement("path",{d:"M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"}),P.createElement("path",{d:"M0-.75h24v24H0z",fill:"none"}))),null)},expandableRowsComponentProps:{},progressPending:!1,progressComponent:P.createElement("div",{style:{fontSize:"24px",fontWeight:700,padding:"24px"}},"Loading..."),persistTableHead:!1,sortIcon:null,sortFunction:null,sortServer:!1,striped:!1,highlightOnHover:!1,pointerOnHover:!1,noContextMenu:!1,contextMessage:{singular:"item",plural:"items",message:"selected"},actions:null,contextActions:null,contextComponent:null,defaultSortFieldId:null,defaultSortAsc:!0,responsive:!0,noDataComponent:P.createElement("div",{style:{padding:"24px"}},"There are no records to display"),disabled:!1,noTableHead:!1,noHeader:!1,subHeader:!1,subHeaderAlign:Yt.RIGHT,subHeaderWrap:!0,subHeaderComponent:null,fixedHeader:!1,fixedHeaderScrollHeight:"100vh",pagination:!1,paginationServer:!1,paginationServerOptions:{persistSelectedOnSort:!1,persistSelectedOnPageChange:!1},paginationDefaultPage:1,paginationResetDefaultPage:!1,paginationTotalRows:0,paginationPerPage:10,paginationRowsPerPageOptions:[10,15,20,25,30],paginationComponent:null,paginationComponentOptions:{},paginationIconFirstPage:P.createElement((()=>P.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24","aria-hidden":"true",role:"presentation"},P.createElement("path",{d:"M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"}),P.createElement("path",{fill:"none",d:"M24 24H0V0h24v24z"}))),null),paginationIconLastPage:P.createElement((()=>P.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24","aria-hidden":"true",role:"presentation"},P.createElement("path",{d:"M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"}),P.createElement("path",{fill:"none",d:"M0 0h24v24H0V0z"}))),null),paginationIconNext:P.createElement((()=>P.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24","aria-hidden":"true",role:"presentation"},P.createElement("path",{d:"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"}),P.createElement("path",{d:"M0 0h24v24H0z",fill:"none"}))),null),paginationIconPrevious:P.createElement((()=>P.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24","aria-hidden":"true",role:"presentation"},P.createElement("path",{d:"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"}),P.createElement("path",{d:"M0 0h24v24H0z",fill:"none"}))),null),dense:!1,conditionalRowStyles:[],theme:"default",customStyles:{},direction:xt.AUTO,onChangePage:N,onChangeRowsPerPage:N,onRowClicked:N,onRowDoubleClicked:N,onRowMouseEnter:N,onRowMouseLeave:N,onRowExpandToggled:N,onSelectedRowsChange:N,onSort:N,onColumnOrderChange:N},ss={rowsPerPageText:"Rows per page:",rangeSeparatorText:"of",noRowsPerPage:!1,selectAllRowsItem:!1,selectAllRowsItemText:"All"},is=k.nav`
	display: flex;
	flex: 1 1 auto;
	justify-content: flex-end;
	align-items: center;
	box-sizing: border-box;
	padding-right: 8px;
	padding-left: 8px;
	width: 100%;
	${({theme:e})=>e.pagination.style};
`,lt=k.button`
	position: relative;
	display: block;
	user-select: none;
	border: none;
	${({theme:e})=>e.pagination.pageButtonsStyle};
	${({$isRTL:e})=>e&&"transform: scale(-1, -1)"};
`,ls=k.div`
	display: flex;
	align-items: center;
	border-radius: 4px;
	white-space: nowrap;
	${mr`
    width: 100%;
    justify-content: space-around;
  `};
`,vr=k.span`
	flex-shrink: 1;
	user-select: none;
`,cs=k(vr)`
	margin: 0 24px;
`,ds=k(vr)`
	margin: 0 4px;
`;var us=s.memo((function({rowsPerPage:e,rowCount:t,currentPage:n,direction:r=l.direction,paginationRowsPerPageOptions:o=l.paginationRowsPerPageOptions,paginationIconLastPage:a=l.paginationIconLastPage,paginationIconFirstPage:i=l.paginationIconFirstPage,paginationIconNext:c=l.paginationIconNext,paginationIconPrevious:d=l.paginationIconPrevious,paginationComponentOptions:h=l.paginationComponentOptions,onChangeRowsPerPage:p=l.onChangeRowsPerPage,onChangePage:u=l.onChangePage}){const b=(()=>{const F=typeof window=="object";function fe(){return{width:F?window.innerWidth:void 0,height:F?window.innerHeight:void 0}}const[Se,he]=s.useState(fe);return s.useEffect((()=>{if(!F)return()=>null;function se(){he(fe())}return window.addEventListener("resize",se),()=>window.removeEventListener("resize",se)}),[]),Se})(),f=yr(r),m=b.width&&b.width>599,v=Ze(t,e),C=n*e,R=C-e+1,$=n===1,w=n===v,S=Object.assign(Object.assign({},ss),h),D=n===v?`${R}-${t} ${S.rangeSeparatorText} ${t}`:`${R}-${C} ${S.rangeSeparatorText} ${t}`,E=s.useCallback((()=>u(n-1)),[n,u]),g=s.useCallback((()=>u(n+1)),[n,u]),A=s.useCallback((()=>u(1)),[u]),U=s.useCallback((()=>u(Ze(t,e))),[u,t,e]),V=s.useCallback((F=>p(Number(F.target.value),n)),[n,p]),Q=o.map((F=>s.createElement("option",{key:F,value:F},F)));S.selectAllRowsItem&&Q.push(s.createElement("option",{key:-1,value:t},S.selectAllRowsItemText));const ae=s.createElement(as,{onChange:V,defaultValue:e,"aria-label":S.rowsPerPageText},Q);return s.createElement(is,{className:"rdt_Pagination"},!S.noRowsPerPage&&m&&s.createElement(s.Fragment,null,s.createElement(ds,null,S.rowsPerPageText),ae),m&&s.createElement(cs,null,D),s.createElement(ls,null,s.createElement(lt,{id:"pagination-first-page",type:"button","aria-label":"First Page","aria-disabled":$,onClick:A,disabled:$,$isRTL:f},i),s.createElement(lt,{id:"pagination-previous-page",type:"button","aria-label":"Previous Page","aria-disabled":$,onClick:E,disabled:$,$isRTL:f},d),!S.noRowsPerPage&&!m&&ae,s.createElement(lt,{id:"pagination-next-page",type:"button","aria-label":"Next Page","aria-disabled":w,onClick:g,disabled:w,$isRTL:f},c),s.createElement(lt,{id:"pagination-last-page",type:"button","aria-label":"Last Page","aria-disabled":w,onClick:U,disabled:w,$isRTL:f},a)))}));const Oe=(e,t)=>{const n=s.useRef(!0);s.useEffect((()=>{n.current?n.current=!1:e()}),t)};function ps(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var gs=function(e){return(function(t){return!!t&&typeof t=="object"})(e)&&!(function(t){var n=Object.prototype.toString.call(t);return n==="[object RegExp]"||n==="[object Date]"||(function(r){return r.$$typeof===fs})(t)})(e)},fs=typeof Symbol=="function"&&Symbol.for?Symbol.for("react.element"):60103;function et(e,t){return t.clone!==!1&&t.isMergeableObject(e)?Ge((n=e,Array.isArray(n)?[]:{}),e,t):e;var n}function hs(e,t,n){return e.concat(t).map((function(r){return et(r,n)}))}function Bn(e){return Object.keys(e).concat((function(t){return Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t).filter((function(n){return Object.propertyIsEnumerable.call(t,n)})):[]})(e))}function Gn(e,t){try{return t in e}catch{return!1}}function ms(e,t,n){var r={};return n.isMergeableObject(e)&&Bn(e).forEach((function(o){r[o]=et(e[o],n)})),Bn(t).forEach((function(o){(function(a,i){return Gn(a,i)&&!(Object.hasOwnProperty.call(a,i)&&Object.propertyIsEnumerable.call(a,i))})(e,o)||(Gn(e,o)&&n.isMergeableObject(t[o])?r[o]=(function(a,i){if(!i.customMerge)return Ge;var c=i.customMerge(a);return typeof c=="function"?c:Ge})(o,n)(e[o],t[o],n):r[o]=et(t[o],n))})),r}function Ge(e,t,n){(n=n||{}).arrayMerge=n.arrayMerge||hs,n.isMergeableObject=n.isMergeableObject||gs,n.cloneUnlessOtherwiseSpecified=et;var r=Array.isArray(t);return r===Array.isArray(e)?r?n.arrayMerge(e,t,n):ms(e,t,n):et(t,n)}Ge.all=function(e,t){if(!Array.isArray(e))throw new Error("first argument should be an array");return e.reduce((function(n,r){return Ge(n,r,t)}),{})};var Ut=ps(Ge);const Vn={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.54)",disabled:"rgba(0, 0, 0, 0.38)"},background:{default:"#FFFFFF"},context:{background:"#e3f2fd",text:"rgba(0, 0, 0, 0.87)"},divider:{default:"rgba(0,0,0,.12)"},button:{default:"rgba(0,0,0,.54)",focus:"rgba(0,0,0,.12)",hover:"rgba(0,0,0,.12)",disabled:"rgba(0, 0, 0, .18)"},selected:{default:"#e3f2fd",text:"rgba(0, 0, 0, 0.87)"},highlightOnHover:{default:"#EEEEEE",text:"rgba(0, 0, 0, 0.87)"},striped:{default:"#FAFAFA",text:"rgba(0, 0, 0, 0.87)"}},ve={default:Vn,light:Vn,dark:{text:{primary:"#FFFFFF",secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(0,0,0,.12)"},background:{default:"#424242"},context:{background:"#E91E63",text:"#FFFFFF"},divider:{default:"rgba(81, 81, 81, 1)"},button:{default:"#FFFFFF",focus:"rgba(255, 255, 255, .54)",hover:"rgba(255, 255, 255, .12)",disabled:"rgba(255, 255, 255, .18)"},selected:{default:"rgba(0, 0, 0, .7)",text:"#FFFFFF"},highlightOnHover:{default:"rgba(0, 0, 0, .7)",text:"#FFFFFF"},striped:{default:"rgba(0, 0, 0, .87)",text:"#FFFFFF"}}};function Cr(e="default",t,n="default"){return ve[e]||(ve[e]=Ut(ve[n],t||{})),ve[e]=Ut(ve[e],t||{}),ve[e]}function bs(e,t,n,r){const[o,a]=s.useState((()=>Nn(e))),[i,c]=s.useState(""),d=s.useRef("");Oe((()=>{a(Nn(e))}),[e]);const h=s.useCallback((C=>{var R,$,w;const{attributes:S}=C.target,D=(R=S.getNamedItem("data-column-id"))===null||R===void 0?void 0:R.value;D&&(d.current=((w=($=o[it(o,D)])===null||$===void 0?void 0:$.id)===null||w===void 0?void 0:w.toString())||"",c(d.current))}),[o]),p=s.useCallback((C=>{var R;const{attributes:$}=C.target,w=(R=$.getNamedItem("data-column-id"))===null||R===void 0?void 0:R.value;if(w&&d.current&&w!==d.current){const S=it(o,d.current),D=it(o,w),E=[...o];E[S]=o[D],E[D]=o[S],a(E),t(E)}}),[t,o]),u=s.useCallback((C=>{C.preventDefault()}),[]),b=s.useCallback((C=>{C.preventDefault()}),[]),f=s.useCallback((C=>{C.preventDefault(),d.current="",c("")}),[]),m=(function(C=!1){return C?Ce.ASC:Ce.DESC})(r),v=s.useMemo((()=>o[it(o,n==null?void 0:n.toString())]||{}),[n,o]);return{tableColumns:o,draggingColumnId:i,handleDragStart:h,handleDragEnter:p,handleDragOver:u,handleDragLeave:b,handleDragEnd:f,defaultSortDirection:m,defaultSortColumn:v}}var ws=s.memo((function(e){const{data:t=l.data,columns:n=l.columns,title:r=l.title,actions:o=l.actions,keyField:a=l.keyField,striped:i=l.striped,highlightOnHover:c=l.highlightOnHover,pointerOnHover:d=l.pointerOnHover,dense:h=l.dense,selectableRows:p=l.selectableRows,selectableRowsSingle:u=l.selectableRowsSingle,selectableRowsHighlight:b=l.selectableRowsHighlight,selectableRowsNoSelectAll:f=l.selectableRowsNoSelectAll,selectableRowsVisibleOnly:m=l.selectableRowsVisibleOnly,selectableRowSelected:v=l.selectableRowSelected,selectableRowDisabled:C=l.selectableRowDisabled,selectableRowsComponent:R=l.selectableRowsComponent,selectableRowsComponentProps:$=l.selectableRowsComponentProps,onRowExpandToggled:w=l.onRowExpandToggled,onSelectedRowsChange:S=l.onSelectedRowsChange,expandableIcon:D=l.expandableIcon,onChangeRowsPerPage:E=l.onChangeRowsPerPage,onChangePage:g=l.onChangePage,paginationServer:A=l.paginationServer,paginationServerOptions:U=l.paginationServerOptions,paginationTotalRows:V=l.paginationTotalRows,paginationDefaultPage:Q=l.paginationDefaultPage,paginationResetDefaultPage:ae=l.paginationResetDefaultPage,paginationPerPage:F=l.paginationPerPage,paginationRowsPerPageOptions:fe=l.paginationRowsPerPageOptions,paginationIconLastPage:Se=l.paginationIconLastPage,paginationIconFirstPage:he=l.paginationIconFirstPage,paginationIconNext:se=l.paginationIconNext,paginationIconPrevious:je=l.paginationIconPrevious,paginationComponent:K=l.paginationComponent,paginationComponentOptions:me=l.paginationComponentOptions,responsive:ce=l.responsive,progressPending:M=l.progressPending,progressComponent:Re=l.progressComponent,persistTableHead:q=l.persistTableHead,noDataComponent:de=l.noDataComponent,disabled:X=l.disabled,noTableHead:be=l.noTableHead,noHeader:ue=l.noHeader,fixedHeader:ee=l.fixedHeader,fixedHeaderScrollHeight:$e=l.fixedHeaderScrollHeight,pagination:Z=l.pagination,subHeader:W=l.subHeader,subHeaderAlign:tt=l.subHeaderAlign,subHeaderWrap:nt=l.subHeaderWrap,subHeaderComponent:Ot=l.subHeaderComponent,noContextMenu:Pt=l.noContextMenu,contextMessage:kt=l.contextMessage,contextActions:T=l.contextActions,contextComponent:Sr=l.contextComponent,expandableRows:rt=l.expandableRows,onRowClicked:Qt=l.onRowClicked,onRowDoubleClicked:en=l.onRowDoubleClicked,onRowMouseEnter:tn=l.onRowMouseEnter,onRowMouseLeave:nn=l.onRowMouseLeave,sortIcon:Rr=l.sortIcon,onSort:$r=l.onSort,sortFunction:rn=l.sortFunction,sortServer:Dt=l.sortServer,expandableRowsComponent:Er=l.expandableRowsComponent,expandableRowsComponentProps:Or=l.expandableRowsComponentProps,expandableRowDisabled:on=l.expandableRowDisabled,expandableRowsHideExpander:an=l.expandableRowsHideExpander,expandOnRowClicked:Pr=l.expandOnRowClicked,expandOnRowDoubleClicked:kr=l.expandOnRowDoubleClicked,expandableRowExpanded:sn=l.expandableRowExpanded,expandableInheritConditionalStyles:Dr=l.expandableInheritConditionalStyles,defaultSortFieldId:Ir=l.defaultSortFieldId,defaultSortAsc:Ar=l.defaultSortAsc,clearSelectedRows:ln=l.clearSelectedRows,conditionalRowStyles:jr=l.conditionalRowStyles,theme:cn=l.theme,customStyles:dn=l.customStyles,direction:Ue=l.direction,onColumnOrderChange:_r=l.onColumnOrderChange,className:Fr,ariaLabel:un}=e,{tableColumns:pn,draggingColumnId:gn,handleDragStart:fn,handleDragEnter:hn,handleDragOver:mn,handleDragLeave:bn,handleDragEnd:wn,defaultSortDirection:Hr,defaultSortColumn:Tr}=bs(n,_r,Ir,Ar),[{rowsPerPage:we,currentPage:ne,selectedRows:It,allSelected:yn,selectedCount:xn,selectedColumn:ie,sortDirection:_e,toggleOnSelectedRowsChange:Nr},Ee]=s.useReducer(la,{allSelected:!1,selectedCount:0,selectedRows:[],selectedColumn:Tr,toggleOnSelectedRowsChange:!1,sortDirection:Hr,currentPage:Q,rowsPerPage:F,selectedRowsFlag:!1,contextMessage:l.contextMessage}),{persistSelectedOnSort:vn=!1,persistSelectedOnPageChange:ot=!1}=U,Cn=!(!A||!ot&&!vn),Lr=Z&&!M&&t.length>0,Mr=K||us,zr=s.useMemo((()=>((y={},I="default",Y="default")=>{const re=ve[I]?I:Y;return Ut({table:{style:{color:(x=ve[re]).text.primary,backgroundColor:x.background.default}},tableWrapper:{style:{display:"table"}},responsiveWrapper:{style:{}},header:{style:{fontSize:"22px",color:x.text.primary,backgroundColor:x.background.default,minHeight:"56px",paddingLeft:"16px",paddingRight:"8px"}},subHeader:{style:{backgroundColor:x.background.default,minHeight:"52px"}},head:{style:{color:x.text.primary,fontSize:"12px",fontWeight:500}},headRow:{style:{backgroundColor:x.background.default,minHeight:"52px",borderBottomWidth:"1px",borderBottomColor:x.divider.default,borderBottomStyle:"solid"},denseStyle:{minHeight:"32px"}},headCells:{style:{paddingLeft:"16px",paddingRight:"16px"},draggingStyle:{cursor:"move"}},contextMenu:{style:{backgroundColor:x.context.background,fontSize:"18px",fontWeight:400,color:x.context.text,paddingLeft:"16px",paddingRight:"8px",transform:"translate3d(0, -100%, 0)",transitionDuration:"125ms",transitionTimingFunction:"cubic-bezier(0, 0, 0.2, 1)",willChange:"transform"},activeStyle:{transform:"translate3d(0, 0, 0)"}},cells:{style:{paddingLeft:"16px",paddingRight:"16px",wordBreak:"break-word"},draggingStyle:{}},rows:{style:{fontSize:"13px",fontWeight:400,color:x.text.primary,backgroundColor:x.background.default,minHeight:"48px","&:not(:last-of-type)":{borderBottomStyle:"solid",borderBottomWidth:"1px",borderBottomColor:x.divider.default}},denseStyle:{minHeight:"32px"},selectedHighlightStyle:{"&:nth-of-type(n)":{color:x.selected.text,backgroundColor:x.selected.default,borderBottomColor:x.background.default}},highlightOnHoverStyle:{color:x.highlightOnHover.text,backgroundColor:x.highlightOnHover.default,transitionDuration:"0.15s",transitionProperty:"background-color",borderBottomColor:x.background.default,outlineStyle:"solid",outlineWidth:"1px",outlineColor:x.background.default},stripedStyle:{color:x.striped.text,backgroundColor:x.striped.default}},expanderRow:{style:{color:x.text.primary,backgroundColor:x.background.default}},expanderCell:{style:{flex:"0 0 48px"}},expanderButton:{style:{color:x.button.default,fill:x.button.default,backgroundColor:"transparent",borderRadius:"2px",transition:"0.25s",height:"100%",width:"100%","&:hover:enabled":{cursor:"pointer"},"&:disabled":{color:x.button.disabled},"&:hover:not(:disabled)":{cursor:"pointer",backgroundColor:x.button.hover},"&:focus":{outline:"none",backgroundColor:x.button.focus},svg:{margin:"auto"}}},pagination:{style:{color:x.text.secondary,fontSize:"13px",minHeight:"56px",backgroundColor:x.background.default,borderTopStyle:"solid",borderTopWidth:"1px",borderTopColor:x.divider.default},pageButtonsStyle:{borderRadius:"50%",height:"40px",width:"40px",padding:"8px",margin:"px",cursor:"pointer",transition:"0.4s",color:x.button.default,fill:x.button.default,backgroundColor:"transparent","&:disabled":{cursor:"unset",color:x.button.disabled,fill:x.button.disabled},"&:hover:not(:disabled)":{backgroundColor:x.button.hover},"&:focus":{outline:"none",backgroundColor:x.button.focus}}},noData:{style:{display:"flex",alignItems:"center",justifyContent:"center",color:x.text.primary,backgroundColor:x.background.default}},progress:{style:{display:"flex",alignItems:"center",justifyContent:"center",color:x.text.primary,backgroundColor:x.background.default}}},y);var x})(dn,cn)),[dn,cn]),Wr=s.useMemo((()=>Object.assign({},Ue!=="auto"&&{dir:Ue})),[Ue]),B=s.useMemo((()=>{if(Dt)return t;if(ie!=null&&ie.sortFunction&&typeof ie.sortFunction=="function"){const y=ie.sortFunction,I=_e===Ce.ASC?y:(Y,re)=>-1*y(Y,re);return[...t].sort(I)}return(function(y,I,Y,re){return I?re&&typeof re=="function"?re(y.slice(0),I,Y):y.slice(0).sort(((x,At)=>{const He=I(x),ye=I(At);if(Y==="asc"){if(He<ye)return-1;if(He>ye)return 1}if(Y==="desc"){if(He>ye)return-1;if(He<ye)return 1}return 0})):y})(t,ie==null?void 0:ie.selector,_e,rn)}),[Dt,ie,_e,t,rn]),Ke=s.useMemo((()=>{if(Z&&!A){const y=ne*we,I=y-we;return B.slice(I,y)}return B}),[ne,Z,A,we,B]),Br=s.useCallback((y=>{Ee(y)}),[]),Gr=s.useCallback((y=>{Ee(y)}),[]),Vr=s.useCallback((y=>{Ee(y)}),[]),Yr=s.useCallback(((y,I)=>Qt(y,I)),[Qt]),Ur=s.useCallback(((y,I)=>en(y,I)),[en]),Kr=s.useCallback(((y,I)=>tn(y,I)),[tn]),qr=s.useCallback(((y,I)=>nn(y,I)),[nn]),Fe=s.useCallback((y=>Ee({type:"CHANGE_PAGE",page:y,paginationServer:A,visibleOnly:m,persistSelectedOnPageChange:ot})),[A,ot,m]),Xr=s.useCallback((y=>{const I=Ze(V||Ke.length,y),Y=Tt(ne,I);A||Fe(Y),Ee({type:"CHANGE_ROWS_PER_PAGE",page:Y,rowsPerPage:y})}),[ne,Fe,A,V,Ke.length]);if(Z&&!A&&B.length>0&&Ke.length===0){const y=Ze(B.length,we),I=Tt(ne,y);Fe(I)}Oe((()=>{S({allSelected:yn,selectedCount:xn,selectedRows:It.slice(0)})}),[Nr]),Oe((()=>{$r(ie,_e,B.slice(0))}),[ie,_e]),Oe((()=>{g(ne,V||B.length)}),[ne]),Oe((()=>{E(we,ne)}),[we]),Oe((()=>{Fe(Q)}),[Q,ae]),Oe((()=>{if(Z&&A&&V>0){const y=Ze(V,we),I=Tt(ne,y);ne!==I&&Fe(I)}}),[V]),s.useEffect((()=>{Ee({type:"CLEAR_SELECTED_ROWS",selectedRowsFlag:ln})}),[u,ln]),s.useEffect((()=>{if(!v)return;const y=B.filter((Y=>v(Y))),I=u?y.slice(0,1):y;Ee({type:"SELECT_MULTIPLE_ROWS",keyField:a,selectedRows:I,totalRows:B.length,mergeSelections:Cn})}),[t,v]);const Zr=m?Ke:B,Jr=ot||u||f;return s.createElement(oa,{theme:zr},!ue&&(!!r||!!o)&&s.createElement(Ua,{title:r,actions:o,showMenu:!Pt,selectedCount:xn,direction:Ue,contextActions:T,contextComponent:Sr,contextMessage:kt}),W&&s.createElement(Xa,{align:tt,wrapContent:nt},Ot),s.createElement(Ja,Object.assign({$responsive:ce,$fixedHeader:ee,$fixedHeaderScrollHeight:$e,className:Fr},Wr),s.createElement(Qa,null,M&&!q&&s.createElement(Wn,null,Re),s.createElement(da,Object.assign({disabled:X,className:"rdt_Table",role:"table"},un&&{"aria-label":un}),!be&&(!!q||B.length>0&&!M)&&s.createElement(pa,{className:"rdt_TableHead",role:"rowgroup",$fixedHeader:ee},s.createElement(ga,{className:"rdt_TableHeadRow",role:"row",$dense:h},p&&(Jr?s.createElement(Ye,{style:{flex:"0 0 48px"}}):s.createElement(Ma,{allSelected:yn,selectedRows:It,selectableRowsComponent:R,selectableRowsComponentProps:$,selectableRowDisabled:C,rowData:Zr,keyField:a,mergeSelections:Cn,onSelectAllRows:Gr})),rt&&!an&&s.createElement(es,null),pn.map((y=>s.createElement(Na,{key:y.id,column:y,selectedColumn:ie,disabled:M||B.length===0,pagination:Z,paginationServer:A,persistSelectedOnSort:vn,selectableRowsVisibleOnly:m,sortDirection:_e,sortIcon:Rr,sortServer:Dt,onSort:Br,onDragStart:fn,onDragOver:mn,onDragEnd:wn,onDragEnter:hn,onDragLeave:bn,draggingColumnId:gn}))))),!B.length&&!M&&s.createElement(ts,null,de),M&&q&&s.createElement(Wn,null,Re),!M&&B.length>0&&s.createElement(Za,{className:"rdt_TableBody",role:"rowgroup"},Ke.map(((y,I)=>{const Y=Be(y,a),re=(function(ye=""){return typeof ye!="number"&&(!ye||ye.length===0)})(Y)?I:Y,x=ft(y,It,a),At=!!(rt&&sn&&sn(y)),He=!!(rt&&on&&on(y));return s.createElement(Ia,{id:re,key:re,keyField:a,"data-row-id":re,columns:pn,row:y,rowCount:B.length,rowIndex:I,selectableRows:p,expandableRows:rt,expandableIcon:D,highlightOnHover:c,pointerOnHover:d,dense:h,expandOnRowClicked:Pr,expandOnRowDoubleClicked:kr,expandableRowsComponent:Er,expandableRowsComponentProps:Or,expandableRowsHideExpander:an,defaultExpanderDisabled:He,defaultExpanded:At,expandableInheritConditionalStyles:Dr,conditionalRowStyles:jr,selected:x,selectableRowsHighlight:b,selectableRowsComponent:R,selectableRowsComponentProps:$,selectableRowDisabled:C,selectableRowsSingle:u,striped:i,onRowExpandToggled:w,onRowClicked:Yr,onRowDoubleClicked:Ur,onRowMouseEnter:Kr,onRowMouseLeave:qr,onSelectedRow:Vr,draggingColumnId:gn,onDragStart:fn,onDragOver:mn,onDragEnd:wn,onDragEnter:hn,onDragLeave:bn})})))))),Lr&&s.createElement("div",null,s.createElement(Mr,{onChangePage:Fe,onChangeRowsPerPage:Xr,rowCount:V||B.length,currentPage:ne,rowsPerPage:we,direction:Ue,paginationRowsPerPageOptions:fe,paginationIconLastPage:Se,paginationIconFirstPage:he,paginationIconNext:se,paginationIconPrevious:je,paginationComponentOptions:me})))}));function ys(e,t){return t.split(".").reduce((n,r)=>n==null?void 0:n[r],e)}const xs={headCells:{style:{fontFamily:"sans-serif",fontWeight:"bold",fontSize:"15px"}},cells:{style:{fontFamily:"sans-serif",fontSize:"14px"}}};Cr("dark",{background:{default:"transparent"}});Cr("light",{background:{default:"transparent"}});const vs={rowsPerPageText:"Filas por página",rangeSeparatorText:"de"};function Es({data:e,columns:t,filterFields:n=[],onRowClick:r}){const{theme:o}=no(),[a,i]=s.useState({}),[c,d]=s.useState(e),h=u=>{const b=e.filter(f=>n.every(({key:m})=>{var R;const v=((R=u[m])==null?void 0:R.toLowerCase())??"";return String(ys(f,m)??"").toLowerCase().includes(v)}));d(b)},p=(u,b,f)=>{const m={...a,[u]:b};i(m),f&&h(m)};return s.useEffect(()=>{d(e)},[e]),pe.jsxs(pe.Fragment,{children:[n.length>0&&pe.jsxs("form",{className:"flex gap-2 items-baseline md:flex-row flex-col",onSubmit:u=>{u.preventDefault(),h(a)},children:[n.map(({key:u,label:b,type:f="text",options:m,autoFilter:v})=>pe.jsx("div",{className:"w-full",children:f==="select"?pe.jsx(Qr,{value:a[u]??"",onChange:C=>p(u,C.target.value,v),children:m}):pe.jsx(eo,{type:"search",placeholder:b,value:a[u]??"",onChange:C=>p(u,C.target.value,v)})},u)),!n.every(u=>u.autoFilter)&&pe.jsx("div",{className:"w-32",children:pe.jsx(to,{variant:"yellow",type:"submit",children:"Filtrar"})})]}),pe.jsx(ws,{columns:t,data:c,customStyles:xs,theme:o,pagination:!0,paginationPerPage:30,onRowClicked:r,pointerOnHover:!0,highlightOnHover:!0,paginationComponentOptions:vs})]})}export{Es as E,ws as X,xs as c};

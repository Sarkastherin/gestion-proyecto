import{R as k,r as s,d as to,j as K}from"./chunk-PVWAREVJ-Cl_c9Jt0.js";import{I as jt,S as no}from"./Inputs-cvlDeTHR.js";import{B as ro}from"./Buttons-DjYWmDVV.js";import{a as oo,u as ao}from"./UIContext-9PjeG9pu.js";var Q=function(){return Q=Object.assign||function(t){for(var n,r=1,o=arguments.length;r<o;r++){n=arguments[r];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t},Q.apply(this,arguments)};function ht(e,t,n){if(n||arguments.length===2)for(var r=0,o=t.length,a;r<o;r++)(a||!(r in t))&&(a||(a=Array.prototype.slice.call(t,0,r)),a[r]=t[r]);return e.concat(a||Array.prototype.slice.call(t))}var N="-ms-",Je="-moz-",T="-webkit-",Kn="comm",vt="rule",Jt="decl",so="@import",qn="@keyframes",io="@layer",Jn=Math.abs,Zt=String.fromCharCode,zt=Object.assign;function lo(e,t){return U(e,0)^45?(((t<<2^U(e,0))<<2^U(e,1))<<2^U(e,2))<<2^U(e,3):0}function Zn(e){return e.trim()}function xe(e,t){return(e=t.exec(e))?e[0]:e}function P(e,t,n){return e.replace(t,n)}function ct(e,t,n){return e.indexOf(t,n)}function U(e,t){return e.charCodeAt(t)|0}function Me(e,t,n){return e.slice(t,n)}function be(e){return e.length}function Xn(e){return e.length}function qe(e,t){return t.push(e),e}function co(e,t){return e.map(t).join("")}function $n(e,t){return e.filter(function(n){return!xe(n,t)})}var Ct=1,Le=1,Qn=0,ue=0,W=0,Ve="";function St(e,t,n,r,o,a,i,c){return{value:e,root:t,parent:n,type:r,props:o,children:a,line:Ct,column:Le,length:i,return:"",siblings:c}}function Se(e,t){return zt(St("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function He(e){for(;e.root;)e=Se(e.root,{children:[e]});qe(e,e.siblings)}function uo(){return W}function po(){return W=ue>0?U(Ve,--ue):0,Le--,W===10&&(Le=1,Ct--),W}function fe(){return W=ue<Qn?U(Ve,ue++):0,Le++,W===10&&(Le=1,Ct++),W}function De(){return U(Ve,ue)}function dt(){return ue}function Rt(e,t){return Me(Ve,e,t)}function Wt(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function go(e){return Ct=Le=1,Qn=be(Ve=e),ue=0,[]}function fo(e){return Ve="",e}function _t(e){return Zn(Rt(ue-1,Bt(e===91?e+2:e===40?e+1:e)))}function ho(e){for(;(W=De())&&W<33;)fe();return Wt(e)>2||Wt(W)>3?"":" "}function mo(e,t){for(;--t&&fe()&&!(W<48||W>102||W>57&&W<65||W>70&&W<97););return Rt(e,dt()+(t<6&&De()==32&&fe()==32))}function Bt(e){for(;fe();)switch(W){case e:return ue;case 34:case 39:e!==34&&e!==39&&Bt(W);break;case 40:e===41&&Bt(e);break;case 92:fe();break}return ue}function bo(e,t){for(;fe()&&e+W!==57;)if(e+W===84&&De()===47)break;return"/*"+Rt(t,ue-1)+"*"+Zt(e===47?e:fe())}function wo(e){for(;!Wt(De());)fe();return Rt(e,ue)}function xo(e){return fo(ut("",null,null,null,[""],e=go(e),0,[0],e))}function ut(e,t,n,r,o,a,i,c,d){for(var m=0,u=0,g=i,x=0,f=0,y=0,O=1,w=1,R=1,$=0,b="",v=o,D=a,E=r,p=b;w;)switch(y=$,$=fe()){case 40:if(y!=108&&U(p,g-1)==58){ct(p+=P(_t($),"&","&\f"),"&\f",Jn(m?c[m-1]:0))!=-1&&(R=-1);break}case 34:case 39:case 91:p+=_t($);break;case 9:case 10:case 13:case 32:p+=ho(y);break;case 92:p+=mo(dt()-1,7);continue;case 47:switch(De()){case 42:case 47:qe(yo(bo(fe(),dt()),t,n,d),d);break;default:p+="/"}break;case 123*O:c[m++]=be(p)*R;case 125*O:case 59:case 0:switch($){case 0:case 125:w=0;case 59+u:R==-1&&(p=P(p,/\f/g,"")),f>0&&be(p)-g&&qe(f>32?On(p+";",r,n,g-1,d):On(P(p," ","")+";",r,n,g-2,d),d);break;case 59:p+=";";default:if(qe(E=En(p,t,n,m,u,o,c,b,v=[],D=[],g,a),a),$===123)if(u===0)ut(p,t,E,E,v,a,g,c,D);else switch(x===99&&U(p,3)===110?100:x){case 100:case 108:case 109:case 115:ut(e,E,E,r&&qe(En(e,E,E,0,0,o,c,b,o,v=[],g,D),D),o,D,g,c,r?v:D);break;default:ut(p,E,E,E,[""],D,0,c,D)}}m=u=f=0,O=R=1,b=p="",g=i;break;case 58:g=1+be(p),f=y;default:if(O<1){if($==123)--O;else if($==125&&O++==0&&po()==125)continue}switch(p+=Zt($),$*O){case 38:R=u>0?1:(p+="\f",-1);break;case 44:c[m++]=(be(p)-1)*R,R=1;break;case 64:De()===45&&(p+=_t(fe())),x=De(),u=g=be(b=p+=wo(dt())),$++;break;case 45:y===45&&be(p)==2&&(O=0)}}return a}function En(e,t,n,r,o,a,i,c,d,m,u,g){for(var x=o-1,f=o===0?a:[""],y=Xn(f),O=0,w=0,R=0;O<r;++O)for(var $=0,b=Me(e,x+1,x=Jn(w=i[O])),v=e;$<y;++$)(v=Zn(w>0?f[$]+" "+b:P(b,/&\f/g,f[$])))&&(d[R++]=v);return St(e,t,n,o===0?vt:c,d,m,u,g)}function yo(e,t,n,r){return St(e,t,n,Kn,Zt(uo()),Me(e,2,-2),0,r)}function On(e,t,n,r,o){return St(e,t,n,Jt,Me(e,0,r),Me(e,r+1,-1),r,o)}function er(e,t,n){switch(lo(e,t)){case 5103:return T+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return T+e+e;case 4789:return Je+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return T+e+Je+e+N+e+e;case 5936:switch(U(e,t+11)){case 114:return T+e+N+P(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return T+e+N+P(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return T+e+N+P(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return T+e+N+e+e;case 6165:return T+e+N+"flex-"+e+e;case 5187:return T+e+P(e,/(\w+).+(:[^]+)/,T+"box-$1$2"+N+"flex-$1$2")+e;case 5443:return T+e+N+"flex-item-"+P(e,/flex-|-self/g,"")+(xe(e,/flex-|baseline/)?"":N+"grid-row-"+P(e,/flex-|-self/g,""))+e;case 4675:return T+e+N+"flex-line-pack"+P(e,/align-content|flex-|-self/g,"")+e;case 5548:return T+e+N+P(e,"shrink","negative")+e;case 5292:return T+e+N+P(e,"basis","preferred-size")+e;case 6060:return T+"box-"+P(e,"-grow","")+T+e+N+P(e,"grow","positive")+e;case 4554:return T+P(e,/([^-])(transform)/g,"$1"+T+"$2")+e;case 6187:return P(P(P(e,/(zoom-|grab)/,T+"$1"),/(image-set)/,T+"$1"),e,"")+e;case 5495:case 3959:return P(e,/(image-set\([^]*)/,T+"$1$`$1");case 4968:return P(P(e,/(.+:)(flex-)?(.*)/,T+"box-pack:$3"+N+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+T+e+e;case 4200:if(!xe(e,/flex-|baseline/))return N+"grid-column-align"+Me(e,t)+e;break;case 2592:case 3360:return N+P(e,"template-","")+e;case 4384:case 3616:return n&&n.some(function(r,o){return t=o,xe(r.props,/grid-\w+-end/)})?~ct(e+(n=n[t].value),"span",0)?e:N+P(e,"-start","")+e+N+"grid-row-span:"+(~ct(n,"span",0)?xe(n,/\d+/):+xe(n,/\d+/)-+xe(e,/\d+/))+";":N+P(e,"-start","")+e;case 4896:case 4128:return n&&n.some(function(r){return xe(r.props,/grid-\w+-start/)})?e:N+P(P(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return P(e,/(.+)-inline(.+)/,T+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(be(e)-1-t>6)switch(U(e,t+1)){case 109:if(U(e,t+4)!==45)break;case 102:return P(e,/(.+:)(.+)-([^]+)/,"$1"+T+"$2-$3$1"+Je+(U(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~ct(e,"stretch",0)?er(P(e,"stretch","fill-available"),t,n)+e:e}break;case 5152:case 5920:return P(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(r,o,a,i,c,d,m){return N+o+":"+a+m+(i?N+o+"-span:"+(c?d:+d-+a)+m:"")+e});case 4949:if(U(e,t+6)===121)return P(e,":",":"+T)+e;break;case 6444:switch(U(e,U(e,14)===45?18:11)){case 120:return P(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+T+(U(e,14)===45?"inline-":"")+"box$3$1"+T+"$2$3$1"+N+"$2box$3")+e;case 100:return P(e,":",":"+N)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return P(e,"scroll-","scroll-snap-")+e}return e}function mt(e,t){for(var n="",r=0;r<e.length;r++)n+=t(e[r],r,e,t)||"";return n}function vo(e,t,n,r){switch(e.type){case io:if(e.children.length)break;case so:case Jt:return e.return=e.return||e.value;case Kn:return"";case qn:return e.return=e.value+"{"+mt(e.children,r)+"}";case vt:if(!be(e.value=e.props.join(",")))return""}return be(n=mt(e.children,r))?e.return=e.value+"{"+n+"}":""}function Co(e){var t=Xn(e);return function(n,r,o,a){for(var i="",c=0;c<t;c++)i+=e[c](n,r,o,a)||"";return i}}function So(e){return function(t){t.root||(t=t.return)&&e(t)}}function Ro(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case Jt:e.return=er(e.value,e.length,n);return;case qn:return mt([Se(e,{value:P(e.value,"@","@"+T)})],r);case vt:if(e.length)return co(n=e.props,function(o){switch(xe(o,r=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":He(Se(e,{props:[P(o,/:(read-\w+)/,":"+Je+"$1")]})),He(Se(e,{props:[o]})),zt(e,{props:$n(n,r)});break;case"::placeholder":He(Se(e,{props:[P(o,/:(plac\w+)/,":"+T+"input-$1")]})),He(Se(e,{props:[P(o,/:(plac\w+)/,":"+Je+"$1")]})),He(Se(e,{props:[P(o,/:(plac\w+)/,N+"input-$1")]})),He(Se(e,{props:[o]})),zt(e,{props:$n(n,r)});break}return""})}}var $o={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},le={},ze=typeof process<"u"&&le!==void 0&&(le.REACT_APP_SC_ATTR||le.SC_ATTR)||"data-styled",tr="active",nr="data-styled-version",$t="6.1.19",Xt=`/*!sc*/
`,bt=typeof window<"u"&&typeof document<"u",Eo=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&le!==void 0&&le.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&le.REACT_APP_SC_DISABLE_SPEEDY!==""?le.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&le.REACT_APP_SC_DISABLE_SPEEDY:typeof process<"u"&&le!==void 0&&le.SC_DISABLE_SPEEDY!==void 0&&le.SC_DISABLE_SPEEDY!==""&&le.SC_DISABLE_SPEEDY!=="false"&&le.SC_DISABLE_SPEEDY),Et=Object.freeze([]),We=Object.freeze({});function Oo(e,t,n){return n===void 0&&(n=We),e.theme!==n.theme&&e.theme||t||n.theme}var rr=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),Po=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,ko=/(^-|-$)/g;function Pn(e){return e.replace(Po,"-").replace(ko,"")}var Do=/(a)(d)/gi,at=52,kn=function(e){return String.fromCharCode(e+(e>25?39:97))};function Gt(e){var t,n="";for(t=Math.abs(e);t>at;t=t/at|0)n=kn(t%at)+n;return(kn(t%at)+n).replace(Do,"$1-$2")}var Tt,or=5381,Ne=function(e,t){for(var n=t.length;n;)e=33*e^t.charCodeAt(--n);return e},ar=function(e){return Ne(or,e)};function Io(e){return Gt(ar(e)>>>0)}function Ao(e){return e.displayName||e.name||"Component"}function Ft(e){return typeof e=="string"&&!0}var sr=typeof Symbol=="function"&&Symbol.for,ir=sr?Symbol.for("react.memo"):60115,jo=sr?Symbol.for("react.forward_ref"):60112,_o={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},To={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},lr={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},Fo=((Tt={})[jo]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},Tt[ir]=lr,Tt);function Dn(e){return("type"in(t=e)&&t.type.$$typeof)===ir?lr:"$$typeof"in e?Fo[e.$$typeof]:_o;var t}var Ho=Object.defineProperty,No=Object.getOwnPropertyNames,In=Object.getOwnPropertySymbols,Mo=Object.getOwnPropertyDescriptor,Lo=Object.getPrototypeOf,An=Object.prototype;function cr(e,t,n){if(typeof t!="string"){if(An){var r=Lo(t);r&&r!==An&&cr(e,r,n)}var o=No(t);In&&(o=o.concat(In(t)));for(var a=Dn(e),i=Dn(t),c=0;c<o.length;++c){var d=o[c];if(!(d in To||n&&n[d]||i&&d in i||a&&d in a)){var m=Mo(t,d);try{Ho(e,d,m)}catch{}}}}return e}function Ae(e){return typeof e=="function"}function Qt(e){return typeof e=="object"&&"styledComponentId"in e}function ke(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function jn(e,t){if(e.length===0)return"";for(var n=e[0],r=1;r<e.length;r++)n+=e[r];return n}function Qe(e){return e!==null&&typeof e=="object"&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function Vt(e,t,n){if(n===void 0&&(n=!1),!n&&!Qe(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var r=0;r<t.length;r++)e[r]=Vt(e[r],t[r]);else if(Qe(t))for(var r in t)e[r]=Vt(e[r],t[r]);return e}function en(e,t){Object.defineProperty(e,"toString",{value:t})}function je(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var zo=(function(){function e(t){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=t}return e.prototype.indexOfGroup=function(t){for(var n=0,r=0;r<t;r++)n+=this.groupSizes[r];return n},e.prototype.insertRules=function(t,n){if(t>=this.groupSizes.length){for(var r=this.groupSizes,o=r.length,a=o;t>=a;)if((a<<=1)<0)throw je(16,"".concat(t));this.groupSizes=new Uint32Array(a),this.groupSizes.set(r),this.length=a;for(var i=o;i<a;i++)this.groupSizes[i]=0}for(var c=this.indexOfGroup(t+1),d=(i=0,n.length);i<d;i++)this.tag.insertRule(c,n[i])&&(this.groupSizes[t]++,c++)},e.prototype.clearGroup=function(t){if(t<this.length){var n=this.groupSizes[t],r=this.indexOfGroup(t),o=r+n;this.groupSizes[t]=0;for(var a=r;a<o;a++)this.tag.deleteRule(r)}},e.prototype.getGroup=function(t){var n="";if(t>=this.length||this.groupSizes[t]===0)return n;for(var r=this.groupSizes[t],o=this.indexOfGroup(t),a=o+r,i=o;i<a;i++)n+="".concat(this.tag.getRule(i)).concat(Xt);return n},e})(),pt=new Map,wt=new Map,gt=1,st=function(e){if(pt.has(e))return pt.get(e);for(;wt.has(gt);)gt++;var t=gt++;return pt.set(e,t),wt.set(t,e),t},Wo=function(e,t){gt=t+1,pt.set(e,t),wt.set(t,e)},Bo="style[".concat(ze,"][").concat(nr,'="').concat($t,'"]'),Go=new RegExp("^".concat(ze,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),Vo=function(e,t,n){for(var r,o=n.split(","),a=0,i=o.length;a<i;a++)(r=o[a])&&e.registerName(t,r)},Yo=function(e,t){for(var n,r=((n=t.textContent)!==null&&n!==void 0?n:"").split(Xt),o=[],a=0,i=r.length;a<i;a++){var c=r[a].trim();if(c){var d=c.match(Go);if(d){var m=0|parseInt(d[1],10),u=d[2];m!==0&&(Wo(u,m),Vo(e,u,d[3]),e.getTag().insertRules(m,o)),o.length=0}else o.push(c)}}},_n=function(e){for(var t=document.querySelectorAll(Bo),n=0,r=t.length;n<r;n++){var o=t[n];o&&o.getAttribute(ze)!==tr&&(Yo(e,o),o.parentNode&&o.parentNode.removeChild(o))}};function Uo(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null}var dr=function(e){var t=document.head,n=e||t,r=document.createElement("style"),o=(function(c){var d=Array.from(c.querySelectorAll("style[".concat(ze,"]")));return d[d.length-1]})(n),a=o!==void 0?o.nextSibling:null;r.setAttribute(ze,tr),r.setAttribute(nr,$t);var i=Uo();return i&&r.setAttribute("nonce",i),n.insertBefore(r,a),r},Ko=(function(){function e(t){this.element=dr(t),this.element.appendChild(document.createTextNode("")),this.sheet=(function(n){if(n.sheet)return n.sheet;for(var r=document.styleSheets,o=0,a=r.length;o<a;o++){var i=r[o];if(i.ownerNode===n)return i}throw je(17)})(this.element),this.length=0}return e.prototype.insertRule=function(t,n){try{return this.sheet.insertRule(n,t),this.length++,!0}catch{return!1}},e.prototype.deleteRule=function(t){this.sheet.deleteRule(t),this.length--},e.prototype.getRule=function(t){var n=this.sheet.cssRules[t];return n&&n.cssText?n.cssText:""},e})(),qo=(function(){function e(t){this.element=dr(t),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(t,n){if(t<=this.length&&t>=0){var r=document.createTextNode(n);return this.element.insertBefore(r,this.nodes[t]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(t){this.element.removeChild(this.nodes[t]),this.length--},e.prototype.getRule=function(t){return t<this.length?this.nodes[t].textContent:""},e})(),Jo=(function(){function e(t){this.rules=[],this.length=0}return e.prototype.insertRule=function(t,n){return t<=this.length&&(this.rules.splice(t,0,n),this.length++,!0)},e.prototype.deleteRule=function(t){this.rules.splice(t,1),this.length--},e.prototype.getRule=function(t){return t<this.length?this.rules[t]:""},e})(),Tn=bt,Zo={isServer:!bt,useCSSOMInjection:!Eo},ur=(function(){function e(t,n,r){t===void 0&&(t=We),n===void 0&&(n={});var o=this;this.options=Q(Q({},Zo),t),this.gs=n,this.names=new Map(r),this.server=!!t.isServer,!this.server&&bt&&Tn&&(Tn=!1,_n(this)),en(this,function(){return(function(a){for(var i=a.getTag(),c=i.length,d="",m=function(g){var x=(function(R){return wt.get(R)})(g);if(x===void 0)return"continue";var f=a.names.get(x),y=i.getGroup(g);if(f===void 0||!f.size||y.length===0)return"continue";var O="".concat(ze,".g").concat(g,'[id="').concat(x,'"]'),w="";f!==void 0&&f.forEach(function(R){R.length>0&&(w+="".concat(R,","))}),d+="".concat(y).concat(O,'{content:"').concat(w,'"}').concat(Xt)},u=0;u<c;u++)m(u);return d})(o)})}return e.registerId=function(t){return st(t)},e.prototype.rehydrate=function(){!this.server&&bt&&_n(this)},e.prototype.reconstructWithOptions=function(t,n){return n===void 0&&(n=!0),new e(Q(Q({},this.options),t),this.gs,n&&this.names||void 0)},e.prototype.allocateGSInstance=function(t){return this.gs[t]=(this.gs[t]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(t=(function(n){var r=n.useCSSOMInjection,o=n.target;return n.isServer?new Jo(o):r?new Ko(o):new qo(o)})(this.options),new zo(t)));var t},e.prototype.hasNameForId=function(t,n){return this.names.has(t)&&this.names.get(t).has(n)},e.prototype.registerName=function(t,n){if(st(t),this.names.has(t))this.names.get(t).add(n);else{var r=new Set;r.add(n),this.names.set(t,r)}},e.prototype.insertRules=function(t,n,r){this.registerName(t,n),this.getTag().insertRules(st(t),r)},e.prototype.clearNames=function(t){this.names.has(t)&&this.names.get(t).clear()},e.prototype.clearRules=function(t){this.getTag().clearGroup(st(t)),this.clearNames(t)},e.prototype.clearTag=function(){this.tag=void 0},e})(),Xo=/&/g,Qo=/^\s*\/\/.*$/gm;function pr(e,t){return e.map(function(n){return n.type==="rule"&&(n.value="".concat(t," ").concat(n.value),n.value=n.value.replaceAll(",",",".concat(t," ")),n.props=n.props.map(function(r){return"".concat(t," ").concat(r)})),Array.isArray(n.children)&&n.type!=="@keyframes"&&(n.children=pr(n.children,t)),n})}function ea(e){var t,n,r,o=We,a=o.options,i=a===void 0?We:a,c=o.plugins,d=c===void 0?Et:c,m=function(x,f,y){return y.startsWith(n)&&y.endsWith(n)&&y.replaceAll(n,"").length>0?".".concat(t):x},u=d.slice();u.push(function(x){x.type===vt&&x.value.includes("&")&&(x.props[0]=x.props[0].replace(Xo,n).replace(r,m))}),i.prefix&&u.push(Ro),u.push(vo);var g=function(x,f,y,O){f===void 0&&(f=""),y===void 0&&(y=""),O===void 0&&(O="&"),t=O,n=f,r=new RegExp("\\".concat(n,"\\b"),"g");var w=x.replace(Qo,""),R=xo(y||f?"".concat(y," ").concat(f," { ").concat(w," }"):w);i.namespace&&(R=pr(R,i.namespace));var $=[];return mt(R,Co(u.concat(So(function(b){return $.push(b)})))),$};return g.hash=d.length?d.reduce(function(x,f){return f.name||je(15),Ne(x,f.name)},or).toString():"",g}var ta=new ur,Yt=ea(),gr=k.createContext({shouldForwardProp:void 0,styleSheet:ta,stylis:Yt});gr.Consumer;k.createContext(void 0);function Fn(){return s.useContext(gr)}var na=(function(){function e(t,n){var r=this;this.inject=function(o,a){a===void 0&&(a=Yt);var i=r.name+a.hash;o.hasNameForId(r.id,i)||o.insertRules(r.id,i,a(r.rules,i,"@keyframes"))},this.name=t,this.id="sc-keyframes-".concat(t),this.rules=n,en(this,function(){throw je(12,String(r.name))})}return e.prototype.getName=function(t){return t===void 0&&(t=Yt),this.name+t.hash},e})(),ra=function(e){return e>="A"&&e<="Z"};function Hn(e){for(var t="",n=0;n<e.length;n++){var r=e[n];if(n===1&&r==="-"&&e[0]==="-")return e;ra(r)?t+="-"+r.toLowerCase():t+=r}return t.startsWith("ms-")?"-"+t:t}var fr=function(e){return e==null||e===!1||e===""},hr=function(e){var t,n,r=[];for(var o in e){var a=e[o];e.hasOwnProperty(o)&&!fr(a)&&(Array.isArray(a)&&a.isCss||Ae(a)?r.push("".concat(Hn(o),":"),a,";"):Qe(a)?r.push.apply(r,ht(ht(["".concat(o," {")],hr(a),!1),["}"],!1)):r.push("".concat(Hn(o),": ").concat((t=o,(n=a)==null||typeof n=="boolean"||n===""?"":typeof n!="number"||n===0||t in $o||t.startsWith("--")?String(n).trim():"".concat(n,"px")),";")))}return r};function Ie(e,t,n,r){if(fr(e))return[];if(Qt(e))return[".".concat(e.styledComponentId)];if(Ae(e)){if(!Ae(a=e)||a.prototype&&a.prototype.isReactComponent||!t)return[e];var o=e(t);return Ie(o,t,n,r)}var a;return e instanceof na?n?(e.inject(n,r),[e.getName(r)]):[e]:Qe(e)?hr(e):Array.isArray(e)?Array.prototype.concat.apply(Et,e.map(function(i){return Ie(i,t,n,r)})):[e.toString()]}function oa(e){for(var t=0;t<e.length;t+=1){var n=e[t];if(Ae(n)&&!Qt(n))return!1}return!0}var aa=ar($t),sa=(function(){function e(t,n,r){this.rules=t,this.staticRulesId="",this.isStatic=(r===void 0||r.isStatic)&&oa(t),this.componentId=n,this.baseHash=Ne(aa,n),this.baseStyle=r,ur.registerId(n)}return e.prototype.generateAndInjectStyles=function(t,n,r){var o=this.baseStyle?this.baseStyle.generateAndInjectStyles(t,n,r):"";if(this.isStatic&&!r.hash)if(this.staticRulesId&&n.hasNameForId(this.componentId,this.staticRulesId))o=ke(o,this.staticRulesId);else{var a=jn(Ie(this.rules,t,n,r)),i=Gt(Ne(this.baseHash,a)>>>0);if(!n.hasNameForId(this.componentId,i)){var c=r(a,".".concat(i),void 0,this.componentId);n.insertRules(this.componentId,i,c)}o=ke(o,i),this.staticRulesId=i}else{for(var d=Ne(this.baseHash,r.hash),m="",u=0;u<this.rules.length;u++){var g=this.rules[u];if(typeof g=="string")m+=g;else if(g){var x=jn(Ie(g,t,n,r));d=Ne(d,x+u),m+=x}}if(m){var f=Gt(d>>>0);n.hasNameForId(this.componentId,f)||n.insertRules(this.componentId,f,r(m,".".concat(f),void 0,this.componentId)),o=ke(o,f)}}return o},e})(),xt=k.createContext(void 0);xt.Consumer;function ia(e){var t=k.useContext(xt),n=s.useMemo(function(){return(function(r,o){if(!r)throw je(14);if(Ae(r)){var a=r(o);return a}if(Array.isArray(r)||typeof r!="object")throw je(8);return o?Q(Q({},o),r):r})(e.theme,t)},[e.theme,t]);return e.children?k.createElement(xt.Provider,{value:n},e.children):null}var Ht={};function la(e,t,n){var r=Qt(e),o=e,a=!Ft(e),i=t.attrs,c=i===void 0?Et:i,d=t.componentId,m=d===void 0?(function(v,D){var E=typeof v!="string"?"sc":Pn(v);Ht[E]=(Ht[E]||0)+1;var p="".concat(E,"-").concat(Io($t+E+Ht[E]));return D?"".concat(D,"-").concat(p):p})(t.displayName,t.parentComponentId):d,u=t.displayName,g=u===void 0?(function(v){return Ft(v)?"styled.".concat(v):"Styled(".concat(Ao(v),")")})(e):u,x=t.displayName&&t.componentId?"".concat(Pn(t.displayName),"-").concat(t.componentId):t.componentId||m,f=r&&o.attrs?o.attrs.concat(c).filter(Boolean):c,y=t.shouldForwardProp;if(r&&o.shouldForwardProp){var O=o.shouldForwardProp;if(t.shouldForwardProp){var w=t.shouldForwardProp;y=function(v,D){return O(v,D)&&w(v,D)}}else y=O}var R=new sa(n,x,r?o.componentStyle:void 0);function $(v,D){return(function(E,p,A){var ee=E.attrs,Y=E.componentStyle,q=E.defaultProps,te=E.foldedComponentIds,M=E.styledComponentId,h=E.target,j=k.useContext(xt),H=Fn(),F=E.shouldForwardProp||H.shouldForwardProp,oe=Oo(p,j,q)||We,L=(function(ce,se,ye){for(var we,de=Q(Q({},se),{className:void 0,theme:ye}),Ee=0;Ee<ce.length;Ee+=1){var ie=Ae(we=ce[Ee])?we(de):we;for(var Z in ie)de[Z]=Z==="className"?ke(de[Z],ie[Z]):Z==="style"?Q(Q({},de[Z]),ie[Z]):ie[Z]}return se.className&&(de.className=ke(de.className,se.className)),de})(ee,p,oe),re=L.as||h,ae={};for(var z in L)L[z]===void 0||z[0]==="$"||z==="as"||z==="theme"&&L.theme===oe||(z==="forwardedAs"?ae.as=L.forwardedAs:F&&!F(z,re)||(ae[z]=L[z]));var he=(function(ce,se){var ye=Fn(),we=ce.generateAndInjectStyles(se,ye.styleSheet,ye.stylis);return we})(Y,L),J=ke(te,M);return he&&(J+=" "+he),L.className&&(J+=" "+L.className),ae[Ft(re)&&!rr.has(re)?"class":"className"]=J,A&&(ae.ref=A),s.createElement(re,ae)})(b,v,D)}$.displayName=g;var b=k.forwardRef($);return b.attrs=f,b.componentStyle=R,b.displayName=g,b.shouldForwardProp=y,b.foldedComponentIds=r?ke(o.foldedComponentIds,o.styledComponentId):"",b.styledComponentId=x,b.target=r?o.target:e,Object.defineProperty(b,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(v){this._foldedDefaultProps=r?(function(D){for(var E=[],p=1;p<arguments.length;p++)E[p-1]=arguments[p];for(var A=0,ee=E;A<ee.length;A++)Vt(D,ee[A],!0);return D})({},o.defaultProps,v):v}}),en(b,function(){return".".concat(b.styledComponentId)}),a&&cr(b,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),b}function Nn(e,t){for(var n=[e[0]],r=0,o=t.length;r<o;r+=1)n.push(t[r],e[r+1]);return n}var Mn=function(e){return Object.assign(e,{isCss:!0})};function V(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];if(Ae(e)||Qe(e))return Mn(Ie(Nn(Et,ht([e],t,!0))));var r=e;return t.length===0&&r.length===1&&typeof r[0]=="string"?Ie(r):Mn(Ie(Nn(r,t)))}function Ut(e,t,n){if(n===void 0&&(n=We),!t)throw je(1,t);var r=function(o){for(var a=[],i=1;i<arguments.length;i++)a[i-1]=arguments[i];return e(t,n,V.apply(void 0,ht([o],a,!1)))};return r.attrs=function(o){return Ut(e,t,Q(Q({},n),{attrs:Array.prototype.concat(n.attrs,o).filter(Boolean)}))},r.withConfig=function(o){return Ut(e,t,Q(Q({},n),o))},r}var mr=function(e){return Ut(la,e)},I=mr;rr.forEach(function(e){I[e]=mr(e)});var $e;function Be(e,t){return e[t]}function ca(e=[],t,n=0){return[...e.slice(0,n),t,...e.slice(n)]}function da(e=[],t,n="id"){const r=e.slice(),o=Be(t,n);return o?r.splice(r.findIndex((a=>Be(a,n)===o)),1):r.splice(r.findIndex((a=>a===t)),1),r}function Ln(e){return e.map(((t,n)=>{const r=Object.assign(Object.assign({},t),{sortable:t.sortable||!!t.sortFunction||void 0});return t.id||(r.id=n+1),r}))}function Ze(e,t){return Math.ceil(e/t)}function Nt(e,t){return Math.min(e,t)}(function(e){e.ASC="asc",e.DESC="desc"})($e||($e={}));const G=()=>null;function br(e,t=[],n=[]){let r={},o=[...n];return t.length&&t.forEach((a=>{if(!a.when||typeof a.when!="function")throw new Error('"when" must be defined in the conditional style object and must be function');a.when(e)&&(r=a.style||{},a.classNames&&(o=[...o,...a.classNames]),typeof a.style=="function"&&(r=a.style(e)||{}))})),{conditionalStyle:r,classNames:o.join(" ")}}function ft(e,t=[],n="id"){const r=Be(e,n);return r?t.some((o=>Be(o,n)===r)):t.some((o=>o===e))}function it(e,t){return t?e.findIndex((n=>Xe(n.id,t))):-1}function Xe(e,t){return e==t}function ua(e,t){const n=!e.toggleOnSelectedRowsChange;switch(t.type){case"SELECT_ALL_ROWS":{const{keyField:r,rows:o,rowCount:a,mergeSelections:i}=t,c=!e.allSelected,d=!e.toggleOnSelectedRowsChange;if(i){const m=c?[...e.selectedRows,...o.filter((u=>!ft(u,e.selectedRows,r)))]:e.selectedRows.filter((u=>!ft(u,o,r)));return Object.assign(Object.assign({},e),{allSelected:c,selectedCount:m.length,selectedRows:m,toggleOnSelectedRowsChange:d})}return Object.assign(Object.assign({},e),{allSelected:c,selectedCount:c?a:0,selectedRows:c?o:[],toggleOnSelectedRowsChange:d})}case"SELECT_SINGLE_ROW":{const{keyField:r,row:o,isSelected:a,rowCount:i,singleSelect:c}=t;return c?a?Object.assign(Object.assign({},e),{selectedCount:0,allSelected:!1,selectedRows:[],toggleOnSelectedRowsChange:n}):Object.assign(Object.assign({},e),{selectedCount:1,allSelected:!1,selectedRows:[o],toggleOnSelectedRowsChange:n}):a?Object.assign(Object.assign({},e),{selectedCount:e.selectedRows.length>0?e.selectedRows.length-1:0,allSelected:!1,selectedRows:da(e.selectedRows,o,r),toggleOnSelectedRowsChange:n}):Object.assign(Object.assign({},e),{selectedCount:e.selectedRows.length+1,allSelected:e.selectedRows.length+1===i,selectedRows:ca(e.selectedRows,o),toggleOnSelectedRowsChange:n})}case"SELECT_MULTIPLE_ROWS":{const{keyField:r,selectedRows:o,totalRows:a,mergeSelections:i}=t;if(i){const c=[...e.selectedRows,...o.filter((d=>!ft(d,e.selectedRows,r)))];return Object.assign(Object.assign({},e),{selectedCount:c.length,allSelected:!1,selectedRows:c,toggleOnSelectedRowsChange:n})}return Object.assign(Object.assign({},e),{selectedCount:o.length,allSelected:o.length===a,selectedRows:o,toggleOnSelectedRowsChange:n})}case"CLEAR_SELECTED_ROWS":{const{selectedRowsFlag:r}=t;return Object.assign(Object.assign({},e),{allSelected:!1,selectedCount:0,selectedRows:[],selectedRowsFlag:r})}case"SORT_CHANGE":{const{sortDirection:r,selectedColumn:o,clearSelectedOnSort:a}=t;return Object.assign(Object.assign(Object.assign({},e),{selectedColumn:o,sortDirection:r,currentPage:1}),a&&{allSelected:!1,selectedCount:0,selectedRows:[],toggleOnSelectedRowsChange:n})}case"CHANGE_PAGE":{const{page:r,paginationServer:o,visibleOnly:a,persistSelectedOnPageChange:i}=t,c=o&&i,d=o&&!i||a;return Object.assign(Object.assign(Object.assign(Object.assign({},e),{currentPage:r}),c&&{allSelected:!1}),d&&{allSelected:!1,selectedCount:0,selectedRows:[],toggleOnSelectedRowsChange:n})}case"CHANGE_ROWS_PER_PAGE":{const{rowsPerPage:r,page:o}=t;return Object.assign(Object.assign({},e),{currentPage:o,rowsPerPage:r})}}}const pa=V`
	pointer-events: none;
	opacity: 0.4;
`,ga=I.div`
	position: relative;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	max-width: 100%;
	${({disabled:e})=>e&&pa};
	${({theme:e})=>e.table.style};
`,fa=V`
	position: sticky;
	position: -webkit-sticky; /* Safari */
	top: 0;
	z-index: 1;
`,ha=I.div`
	display: flex;
	width: 100%;
	${({$fixedHeader:e})=>e&&fa};
	${({theme:e})=>e.head.style};
`,ma=I.div`
	display: flex;
	align-items: stretch;
	width: 100%;
	${({theme:e})=>e.headRow.style};
	${({$dense:e,theme:t})=>e&&t.headRow.denseStyle};
`,wr=(e,...t)=>V`
		@media screen and (max-width: ${599}px) {
			${V(e,...t)}
		}
	`,ba=(e,...t)=>V`
		@media screen and (max-width: ${959}px) {
			${V(e,...t)}
		}
	`,wa=(e,...t)=>V`
		@media screen and (max-width: ${1280}px) {
			${V(e,...t)}
		}
	`,xa=e=>(t,...n)=>V`
			@media screen and (max-width: ${e}px) {
				${V(t,...n)}
			}
		`,Ye=I.div`
	position: relative;
	display: flex;
	align-items: center;
	box-sizing: border-box;
	line-height: normal;
	${({theme:e,$headCell:t})=>e[t?"headCells":"cells"].style};
	${({$noPadding:e})=>e&&"padding: 0"};
`,xr=I(Ye)`
	flex-grow: ${({button:e,grow:t})=>t===0||e?0:t||1};
	flex-shrink: 0;
	flex-basis: 0;
	max-width: ${({maxWidth:e})=>e||"100%"};
	min-width: ${({minWidth:e})=>e||"100px"};
	${({width:e})=>e&&V`
			min-width: ${e};
			max-width: ${e};
		`};
	${({right:e})=>e&&"justify-content: flex-end"};
	${({button:e,center:t})=>(t||e)&&"justify-content: center"};
	${({compact:e,button:t})=>(e||t)&&"padding: 0"};

	/* handle hiding cells */
	${({hide:e})=>e&&e==="sm"&&wr`
    display: none;
  `};
	${({hide:e})=>e&&e==="md"&&ba`
    display: none;
  `};
	${({hide:e})=>e&&e==="lg"&&wa`
    display: none;
  `};
	${({hide:e})=>e&&Number.isInteger(e)&&xa(e)`
    display: none;
  `};
`,ya=V`
	div:first-child {
		white-space: ${({$wrapCell:e})=>e?"normal":"nowrap"};
		overflow: ${({$allowOverflow:e})=>e?"visible":"hidden"};
		text-overflow: ellipsis;
	}
`,va=I(xr).attrs((e=>({style:e.style})))`
	${({$renderAsCell:e})=>!e&&ya};
	${({theme:e,$isDragging:t})=>t&&e.cells.draggingStyle};
	${({$cellStyle:e})=>e};
`;var Ca=s.memo((function({id:e,column:t,row:n,rowIndex:r,dataTag:o,isDragging:a,onDragStart:i,onDragOver:c,onDragEnd:d,onDragEnter:m,onDragLeave:u}){const{conditionalStyle:g,classNames:x}=br(n,t.conditionalCellStyles,["rdt_TableCell"]);return s.createElement(va,{id:e,"data-column-id":t.id,role:"cell",className:x,"data-tag":o,$cellStyle:t.style,$renderAsCell:!!t.cell,$allowOverflow:t.allowOverflow,button:t.button,center:t.center,compact:t.compact,grow:t.grow,hide:t.hide,maxWidth:t.maxWidth,minWidth:t.minWidth,right:t.right,width:t.width,$wrapCell:t.wrap,style:g,$isDragging:a,onDragStart:i,onDragOver:c,onDragEnd:d,onDragEnter:m,onDragLeave:u},!t.cell&&s.createElement("div",{"data-tag":o},(function(f,y,O,w){return y?O&&typeof O=="function"?O(f,w):y(f,w):null})(n,t.selector,t.format,r)),t.cell&&t.cell(n,r,t,e))}));const zn="input";var yr=s.memo((function({name:e,component:t=zn,componentOptions:n={style:{}},indeterminate:r=!1,checked:o=!1,disabled:a=!1,onClick:i=G}){const c=t,d=c!==zn?n.style:(u=>Object.assign(Object.assign({fontSize:"18px"},!u&&{cursor:"pointer"}),{padding:0,marginTop:"1px",verticalAlign:"middle",position:"relative"}))(a),m=s.useMemo((()=>(function(u,...g){let x;return Object.keys(u).map((f=>u[f])).forEach(((f,y)=>{typeof f=="function"&&(x=Object.assign(Object.assign({},u),{[Object.keys(u)[y]]:f(...g)}))})),x||u})(n,r)),[n,r]);return s.createElement(c,Object.assign({type:"checkbox",ref:u=>{u&&(u.indeterminate=r)},style:d,onClick:a?G:i,name:e,"aria-label":e,checked:o,disabled:a},m,{onChange:G}))}));const Sa=I(Ye)`
	flex: 0 0 48px;
	min-width: 48px;
	justify-content: center;
	align-items: center;
	user-select: none;
	white-space: nowrap;
`;function Ra({name:e,keyField:t,row:n,rowCount:r,selected:o,selectableRowsComponent:a,selectableRowsComponentProps:i,selectableRowsSingle:c,selectableRowDisabled:d,onSelectedRow:m}){const u=!(!d||!d(n));return s.createElement(Sa,{onClick:g=>g.stopPropagation(),className:"rdt_TableCell",$noPadding:!0},s.createElement(yr,{name:e,component:a,componentOptions:i,checked:o,"aria-checked":o,onClick:()=>{m({type:"SELECT_SINGLE_ROW",row:n,isSelected:o,keyField:t,rowCount:r,singleSelect:c})},disabled:u}))}const $a=I.button`
	display: inline-flex;
	align-items: center;
	user-select: none;
	white-space: nowrap;
	border: none;
	background-color: transparent;
	${({theme:e})=>e.expanderButton.style};
`;function Ea({disabled:e=!1,expanded:t=!1,expandableIcon:n,id:r,row:o,onToggled:a}){const i=t?n.expanded:n.collapsed;return s.createElement($a,{"aria-disabled":e,onClick:()=>a&&a(o),"data-testid":`expander-button-${r}`,disabled:e,"aria-label":t?"Collapse Row":"Expand Row",role:"button",type:"button"},i)}const Oa=I(Ye)`
	white-space: nowrap;
	font-weight: 400;
	min-width: 48px;
	${({theme:e})=>e.expanderCell.style};
`;function Pa({row:e,expanded:t=!1,expandableIcon:n,id:r,onToggled:o,disabled:a=!1}){return s.createElement(Oa,{onClick:i=>i.stopPropagation(),$noPadding:!0},s.createElement(Ea,{id:r,row:e,expanded:t,expandableIcon:n,disabled:a,onToggled:o}))}const ka=I.div`
	width: 100%;
	box-sizing: border-box;
	${({theme:e})=>e.expanderRow.style};
	${({$extendedRowStyle:e})=>e};
`;var Da=s.memo((function({data:e,ExpanderComponent:t,expanderComponentProps:n,extendedRowStyle:r,extendedClassNames:o}){const a=["rdt_ExpanderRow",...o.split(" ").filter((i=>i!=="rdt_TableRow"))].join(" ");return s.createElement(ka,{className:a,$extendedRowStyle:r},s.createElement(t,Object.assign({data:e},n)))}));const Mt="allowRowEvents";var yt,Kt,Wn;(function(e){e.LTR="ltr",e.RTL="rtl",e.AUTO="auto"})(yt||(yt={})),(function(e){e.LEFT="left",e.RIGHT="right",e.CENTER="center"})(Kt||(Kt={})),(function(e){e.SM="sm",e.MD="md",e.LG="lg"})(Wn||(Wn={}));const Ia=V`
	&:hover {
		${({$highlightOnHover:e,theme:t})=>e&&t.rows.highlightOnHoverStyle};
	}
`,Aa=V`
	&:hover {
		cursor: pointer;
	}
`,ja=I.div.attrs((e=>({style:e.style})))`
	display: flex;
	align-items: stretch;
	align-content: stretch;
	width: 100%;
	box-sizing: border-box;
	${({theme:e})=>e.rows.style};
	${({$dense:e,theme:t})=>e&&t.rows.denseStyle};
	${({$striped:e,theme:t})=>e&&t.rows.stripedStyle};
	${({$highlightOnHover:e})=>e&&Ia};
	${({$pointerOnHover:e})=>e&&Aa};
	${({$selected:e,theme:t})=>e&&t.rows.selectedHighlightStyle};
	${({$conditionalStyle:e})=>e};
`;function _a({columns:e=[],conditionalRowStyles:t=[],defaultExpanded:n=!1,defaultExpanderDisabled:r=!1,dense:o=!1,expandableIcon:a,expandableRows:i=!1,expandableRowsComponent:c,expandableRowsComponentProps:d,expandableRowsHideExpander:m,expandOnRowClicked:u=!1,expandOnRowDoubleClicked:g=!1,highlightOnHover:x=!1,id:f,expandableInheritConditionalStyles:y,keyField:O,onRowClicked:w=G,onRowDoubleClicked:R=G,onRowMouseEnter:$=G,onRowMouseLeave:b=G,onRowExpandToggled:v=G,onSelectedRow:D=G,pointerOnHover:E=!1,row:p,rowCount:A,rowIndex:ee,selectableRowDisabled:Y=null,selectableRows:q=!1,selectableRowsComponent:te,selectableRowsComponentProps:M,selectableRowsHighlight:h=!1,selectableRowsSingle:j=!1,selected:H,striped:F=!1,draggingColumnId:oe,onDragStart:L,onDragOver:re,onDragEnd:ae,onDragEnter:z,onDragLeave:he}){const[J,ce]=s.useState(n);s.useEffect((()=>{ce(n)}),[n]);const se=s.useCallback((()=>{ce(!J),v(!J,p)}),[J,v,p]),ye=E||i&&(u||g),we=s.useCallback((B=>{B.target.getAttribute("data-tag")===Mt&&(w(p,B),!r&&i&&u&&se())}),[r,u,i,se,w,p]),de=s.useCallback((B=>{B.target.getAttribute("data-tag")===Mt&&(R(p,B),!r&&i&&g&&se())}),[r,g,i,se,R,p]),Ee=s.useCallback((B=>{$(p,B)}),[$,p]),ie=s.useCallback((B=>{b(p,B)}),[b,p]),Z=Be(p,O),{conditionalStyle:tt,classNames:nt}=br(p,t,["rdt_TableRow"]),Ot=h&&H,Pt=y?tt:{},kt=F&&ee%2==0;return s.createElement(s.Fragment,null,s.createElement(ja,{id:`row-${f}`,role:"row",$striped:kt,$highlightOnHover:x,$pointerOnHover:!r&&ye,$dense:o,onClick:we,onDoubleClick:de,onMouseEnter:Ee,onMouseLeave:ie,className:nt,$selected:Ot,$conditionalStyle:tt},q&&s.createElement(Ra,{name:`select-row-${Z}`,keyField:O,row:p,rowCount:A,selected:H,selectableRowsComponent:te,selectableRowsComponentProps:M,selectableRowDisabled:Y,selectableRowsSingle:j,onSelectedRow:D}),i&&!m&&s.createElement(Pa,{id:Z,expandableIcon:a,expanded:J,row:p,onToggled:se,disabled:r}),e.map((B=>B.omit?null:s.createElement(Ca,{id:`cell-${B.id}-${Z}`,key:`cell-${B.id}-${Z}`,dataTag:B.ignoreRowClick||B.button?null:Mt,column:B,row:p,rowIndex:ee,isDragging:Xe(oe,B.id),onDragStart:L,onDragOver:re,onDragEnd:ae,onDragEnter:z,onDragLeave:he})))),i&&J&&s.createElement(Da,{key:`expander-${Z}`,data:p,extendedRowStyle:Pt,extendedClassNames:nt,ExpanderComponent:c,expanderComponentProps:d}))}const Ta=I.span`
	padding: 2px;
	color: inherit;
	flex-grow: 0;
	flex-shrink: 0;
	${({$sortActive:e})=>e?"opacity: 1":"opacity: 0"};
	${({$sortDirection:e})=>e==="desc"&&"transform: rotate(180deg)"};
`,Fa=({sortActive:e,sortDirection:t})=>k.createElement(Ta,{$sortActive:e,$sortDirection:t},"▲"),Ha=I(xr)`
	${({button:e})=>e&&"text-align: center"};
	${({theme:e,$isDragging:t})=>t&&e.headCells.draggingStyle};
`,Na=V`
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

	${({$sortActive:e})=>!e&&V`
			&:hover,
			&:focus {
				opacity: 0.7;

				span,
				span.__rdt_custom_sort_icon__ * {
					opacity: 0.7;
				}
			}
		`};
`,Ma=I.div`
	display: inline-flex;
	align-items: center;
	justify-content: inherit;
	height: 100%;
	width: 100%;
	outline: none;
	user-select: none;
	overflow: hidden;
	${({disabled:e})=>!e&&Na};
`,La=I.div`
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;var za=s.memo((function({column:e,disabled:t,draggingColumnId:n,selectedColumn:r={},sortDirection:o,sortIcon:a,sortServer:i,pagination:c,paginationServer:d,persistSelectedOnSort:m,selectableRowsVisibleOnly:u,onSort:g,onDragStart:x,onDragOver:f,onDragEnd:y,onDragEnter:O,onDragLeave:w}){s.useEffect((()=>{typeof e.selector=="string"&&console.error(`Warning: ${e.selector} is a string based column selector which has been deprecated as of v7 and will be removed in v8. Instead, use a selector function e.g. row => row[field]...`)}),[]);const[R,$]=s.useState(!1),b=s.useRef(null);if(s.useEffect((()=>{b.current&&$(b.current.scrollWidth>b.current.clientWidth)}),[R]),e.omit)return null;const v=()=>{if(!e.sortable&&!e.selector)return;let M=o;Xe(r.id,e.id)&&(M=o===$e.ASC?$e.DESC:$e.ASC),g({type:"SORT_CHANGE",sortDirection:M,selectedColumn:e,clearSelectedOnSort:c&&d&&!m||i||u})},D=M=>s.createElement(Fa,{sortActive:M,sortDirection:o}),E=()=>s.createElement("span",{className:[o,"__rdt_custom_sort_icon__"].join(" ")},a),p=!(!e.sortable||!Xe(r.id,e.id)),A=!e.sortable||t,ee=e.sortable&&!a&&!e.right,Y=e.sortable&&!a&&e.right,q=e.sortable&&a&&!e.right,te=e.sortable&&a&&e.right;return s.createElement(Ha,{"data-column-id":e.id,className:"rdt_TableCol",$headCell:!0,allowOverflow:e.allowOverflow,button:e.button,compact:e.compact,grow:e.grow,hide:e.hide,maxWidth:e.maxWidth,minWidth:e.minWidth,right:e.right,center:e.center,width:e.width,draggable:e.reorder,$isDragging:Xe(e.id,n),onDragStart:x,onDragOver:f,onDragEnd:y,onDragEnter:O,onDragLeave:w},e.name&&s.createElement(Ma,{"data-column-id":e.id,"data-sort-id":e.id,role:"columnheader",tabIndex:0,className:"rdt_TableCol_Sortable",onClick:A?void 0:v,onKeyPress:A?void 0:M=>{M.key==="Enter"&&v()},$sortActive:!A&&p,disabled:A},!A&&te&&E(),!A&&Y&&D(p),typeof e.name=="string"?s.createElement(La,{title:R?e.name:void 0,ref:b,"data-column-id":e.id},e.name):e.name,!A&&q&&E(),!A&&ee&&D(p)))}));const Wa=I(Ye)`
	flex: 0 0 48px;
	justify-content: center;
	align-items: center;
	user-select: none;
	white-space: nowrap;
	font-size: unset;
`;function Ba({headCell:e=!0,rowData:t,keyField:n,allSelected:r,mergeSelections:o,selectedRows:a,selectableRowsComponent:i,selectableRowsComponentProps:c,selectableRowDisabled:d,onSelectAllRows:m}){const u=a.length>0&&!r,g=d?t.filter((y=>!d(y))):t,x=g.length===0,f=Math.min(t.length,g.length);return s.createElement(Wa,{className:"rdt_TableCol",$headCell:e,$noPadding:!0},s.createElement(yr,{name:"select-all-rows",component:i,componentOptions:c,onClick:()=>{m({type:"SELECT_ALL_ROWS",rows:g,rowCount:f,mergeSelections:o,keyField:n})},checked:r,indeterminate:u,disabled:x}))}function vr(e=yt.AUTO){const t=typeof window=="object",[n,r]=s.useState(!1);return s.useEffect((()=>{if(t)if(e!=="auto")r(e==="rtl");else{const o=!(!window.document||!window.document.createElement),a=document.getElementsByTagName("BODY")[0],i=document.getElementsByTagName("HTML")[0],c=a.dir==="rtl"||i.dir==="rtl";r(o&&c)}}),[e,t]),n}const Ga=I.div`
	display: flex;
	align-items: center;
	flex: 1 0 auto;
	height: 100%;
	color: ${({theme:e})=>e.contextMenu.fontColor};
	font-size: ${({theme:e})=>e.contextMenu.fontSize};
	font-weight: 400;
`,Va=I.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	flex-wrap: wrap;
`,Bn=I.div`
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
`;function Ya({contextMessage:e,contextActions:t,contextComponent:n,selectedCount:r,direction:o}){const a=vr(o),i=r>0;return n?s.createElement(Bn,{$visible:i},s.cloneElement(n,{selectedCount:r})):s.createElement(Bn,{$visible:i,$rtl:a},s.createElement(Ga,null,((c,d,m)=>{if(d===0)return null;const u=d===1?c.singular:c.plural;return m?`${d} ${c.message||""} ${u}`:`${d} ${u} ${c.message||""}`})(e,r,a)),s.createElement(Va,null,t))}const Ua=I.div`
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
`,Ka=I.div`
	flex: 1 0 auto;
	color: ${({theme:e})=>e.header.fontColor};
	font-size: ${({theme:e})=>e.header.fontSize};
	font-weight: 400;
`,qa=I.div`
	flex: 1 0 auto;
	display: flex;
	align-items: center;
	justify-content: flex-end;

	> * {
		margin-left: 5px;
	}
`,Ja=({title:e,actions:t=null,contextMessage:n,contextActions:r,contextComponent:o,selectedCount:a,direction:i,showMenu:c=!0})=>s.createElement(Ua,{className:"rdt_TableHeader",role:"heading","aria-level":1},s.createElement(Ka,null,e),t&&s.createElement(qa,null,t),c&&s.createElement(Ya,{contextMessage:n,contextActions:r,contextComponent:o,direction:i,selectedCount:a}));function Cr(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function"){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n}const Za={left:"flex-start",right:"flex-end",center:"center"},Xa=I.header`
	position: relative;
	display: flex;
	flex: 1 1 auto;
	box-sizing: border-box;
	align-items: center;
	padding: 4px 16px 4px 24px;
	width: 100%;
	justify-content: ${({align:e})=>Za[e]};
	flex-wrap: ${({$wrapContent:e})=>e?"wrap":"nowrap"};
	${({theme:e})=>e.subHeader.style}
`,Qa=e=>{var{align:t="right",wrapContent:n=!0}=e,r=Cr(e,["align","wrapContent"]);return s.createElement(Xa,Object.assign({align:t,$wrapContent:n},r))},es=I.div`
	display: flex;
	flex-direction: column;
`,ts=I.div`
	position: relative;
	width: 100%;
	border-radius: inherit;
	${({$responsive:e,$fixedHeader:t})=>e&&V`
			overflow-x: auto;

			// hidden prevents vertical scrolling in firefox when fixedHeader is disabled
			overflow-y: ${t?"auto":"hidden"};
			min-height: 0;
		`};

	${({$fixedHeader:e=!1,$fixedHeaderScrollHeight:t="100vh"})=>e&&V`
			max-height: ${t};
			-webkit-overflow-scrolling: touch;
		`};

	${({theme:e})=>e.responsiveWrapper.style};
`,Gn=I.div`
	position: relative;
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	${e=>e.theme.progress.style};
`,ns=I.div`
	position: relative;
	width: 100%;
	${({theme:e})=>e.tableWrapper.style};
`,rs=I(Ye)`
	white-space: nowrap;
	${({theme:e})=>e.expanderCell.style};
`,os=I.div`
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	${({theme:e})=>e.noData.style};
`,as=()=>k.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},k.createElement("path",{d:"M7 10l5 5 5-5z"}),k.createElement("path",{d:"M0 0h24v24H0z",fill:"none"})),ss=I.select`
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
`,is=I.div`
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
`,ls=e=>{var{defaultValue:t,onChange:n}=e,r=Cr(e,["defaultValue","onChange"]);return s.createElement(is,null,s.createElement(ss,Object.assign({onChange:n,defaultValue:t},r)),s.createElement(as,null))},l={columns:[],data:[],title:"",keyField:"id",selectableRows:!1,selectableRowsHighlight:!1,selectableRowsNoSelectAll:!1,selectableRowSelected:null,selectableRowDisabled:null,selectableRowsComponent:"input",selectableRowsComponentProps:{},selectableRowsVisibleOnly:!1,selectableRowsSingle:!1,clearSelectedRows:!1,expandableRows:!1,expandableRowDisabled:null,expandableRowExpanded:null,expandOnRowClicked:!1,expandableRowsHideExpander:!1,expandOnRowDoubleClicked:!1,expandableInheritConditionalStyles:!1,expandableRowsComponent:function(){return k.createElement("div",null,"To add an expander pass in a component instance via ",k.createElement("strong",null,"expandableRowsComponent"),". You can then access props.data from this component.")},expandableIcon:{collapsed:k.createElement((()=>k.createElement("svg",{fill:"currentColor",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg"},k.createElement("path",{d:"M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"}),k.createElement("path",{d:"M0-.25h24v24H0z",fill:"none"}))),null),expanded:k.createElement((()=>k.createElement("svg",{fill:"currentColor",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg"},k.createElement("path",{d:"M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"}),k.createElement("path",{d:"M0-.75h24v24H0z",fill:"none"}))),null)},expandableRowsComponentProps:{},progressPending:!1,progressComponent:k.createElement("div",{style:{fontSize:"24px",fontWeight:700,padding:"24px"}},"Loading..."),persistTableHead:!1,sortIcon:null,sortFunction:null,sortServer:!1,striped:!1,highlightOnHover:!1,pointerOnHover:!1,noContextMenu:!1,contextMessage:{singular:"item",plural:"items",message:"selected"},actions:null,contextActions:null,contextComponent:null,defaultSortFieldId:null,defaultSortAsc:!0,responsive:!0,noDataComponent:k.createElement("div",{style:{padding:"24px"}},"There are no records to display"),disabled:!1,noTableHead:!1,noHeader:!1,subHeader:!1,subHeaderAlign:Kt.RIGHT,subHeaderWrap:!0,subHeaderComponent:null,fixedHeader:!1,fixedHeaderScrollHeight:"100vh",pagination:!1,paginationServer:!1,paginationServerOptions:{persistSelectedOnSort:!1,persistSelectedOnPageChange:!1},paginationDefaultPage:1,paginationResetDefaultPage:!1,paginationTotalRows:0,paginationPerPage:10,paginationRowsPerPageOptions:[10,15,20,25,30],paginationComponent:null,paginationComponentOptions:{},paginationIconFirstPage:k.createElement((()=>k.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24","aria-hidden":"true",role:"presentation"},k.createElement("path",{d:"M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"}),k.createElement("path",{fill:"none",d:"M24 24H0V0h24v24z"}))),null),paginationIconLastPage:k.createElement((()=>k.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24","aria-hidden":"true",role:"presentation"},k.createElement("path",{d:"M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"}),k.createElement("path",{fill:"none",d:"M0 0h24v24H0V0z"}))),null),paginationIconNext:k.createElement((()=>k.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24","aria-hidden":"true",role:"presentation"},k.createElement("path",{d:"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"}),k.createElement("path",{d:"M0 0h24v24H0z",fill:"none"}))),null),paginationIconPrevious:k.createElement((()=>k.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24","aria-hidden":"true",role:"presentation"},k.createElement("path",{d:"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"}),k.createElement("path",{d:"M0 0h24v24H0z",fill:"none"}))),null),dense:!1,conditionalRowStyles:[],theme:"default",customStyles:{},direction:yt.AUTO,onChangePage:G,onChangeRowsPerPage:G,onRowClicked:G,onRowDoubleClicked:G,onRowMouseEnter:G,onRowMouseLeave:G,onRowExpandToggled:G,onSelectedRowsChange:G,onSort:G,onColumnOrderChange:G},cs={rowsPerPageText:"Rows per page:",rangeSeparatorText:"of",noRowsPerPage:!1,selectAllRowsItem:!1,selectAllRowsItemText:"All"},ds=I.nav`
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
`,us=I.div`
	display: flex;
	align-items: center;
	border-radius: 4px;
	white-space: nowrap;
	${wr`
    width: 100%;
    justify-content: space-around;
  `};
`,Sr=I.span`
	flex-shrink: 1;
	user-select: none;
`,ps=I(Sr)`
	margin: 0 24px;
`,gs=I(Sr)`
	margin: 0 4px;
`;var fs=s.memo((function({rowsPerPage:e,rowCount:t,currentPage:n,direction:r=l.direction,paginationRowsPerPageOptions:o=l.paginationRowsPerPageOptions,paginationIconLastPage:a=l.paginationIconLastPage,paginationIconFirstPage:i=l.paginationIconFirstPage,paginationIconNext:c=l.paginationIconNext,paginationIconPrevious:d=l.paginationIconPrevious,paginationComponentOptions:m=l.paginationComponentOptions,onChangeRowsPerPage:u=l.onChangeRowsPerPage,onChangePage:g=l.onChangePage}){const x=(()=>{const M=typeof window=="object";function h(){return{width:M?window.innerWidth:void 0,height:M?window.innerHeight:void 0}}const[j,H]=s.useState(h);return s.useEffect((()=>{if(!M)return()=>null;function F(){H(h())}return window.addEventListener("resize",F),()=>window.removeEventListener("resize",F)}),[]),j})(),f=vr(r),y=x.width&&x.width>599,O=Ze(t,e),w=n*e,R=w-e+1,$=n===1,b=n===O,v=Object.assign(Object.assign({},cs),m),D=n===O?`${R}-${t} ${v.rangeSeparatorText} ${t}`:`${R}-${w} ${v.rangeSeparatorText} ${t}`,E=s.useCallback((()=>g(n-1)),[n,g]),p=s.useCallback((()=>g(n+1)),[n,g]),A=s.useCallback((()=>g(1)),[g]),ee=s.useCallback((()=>g(Ze(t,e))),[g,t,e]),Y=s.useCallback((M=>u(Number(M.target.value),n)),[n,u]),q=o.map((M=>s.createElement("option",{key:M,value:M},M)));v.selectAllRowsItem&&q.push(s.createElement("option",{key:-1,value:t},v.selectAllRowsItemText));const te=s.createElement(ls,{onChange:Y,defaultValue:e,"aria-label":v.rowsPerPageText},q);return s.createElement(ds,{className:"rdt_Pagination"},!v.noRowsPerPage&&y&&s.createElement(s.Fragment,null,s.createElement(gs,null,v.rowsPerPageText),te),y&&s.createElement(ps,null,D),s.createElement(us,null,s.createElement(lt,{id:"pagination-first-page",type:"button","aria-label":"First Page","aria-disabled":$,onClick:A,disabled:$,$isRTL:f},i),s.createElement(lt,{id:"pagination-previous-page",type:"button","aria-label":"Previous Page","aria-disabled":$,onClick:E,disabled:$,$isRTL:f},d),!v.noRowsPerPage&&!y&&te,s.createElement(lt,{id:"pagination-next-page",type:"button","aria-label":"Next Page","aria-disabled":b,onClick:p,disabled:b,$isRTL:f},c),s.createElement(lt,{id:"pagination-last-page",type:"button","aria-label":"Last Page","aria-disabled":b,onClick:ee,disabled:b,$isRTL:f},a)))}));const Pe=(e,t)=>{const n=s.useRef(!0);s.useEffect((()=>{n.current?n.current=!1:e()}),t)};function hs(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var ms=function(e){return(function(t){return!!t&&typeof t=="object"})(e)&&!(function(t){var n=Object.prototype.toString.call(t);return n==="[object RegExp]"||n==="[object Date]"||(function(r){return r.$$typeof===bs})(t)})(e)},bs=typeof Symbol=="function"&&Symbol.for?Symbol.for("react.element"):60103;function et(e,t){return t.clone!==!1&&t.isMergeableObject(e)?Ge((n=e,Array.isArray(n)?[]:{}),e,t):e;var n}function ws(e,t,n){return e.concat(t).map((function(r){return et(r,n)}))}function Vn(e){return Object.keys(e).concat((function(t){return Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t).filter((function(n){return Object.propertyIsEnumerable.call(t,n)})):[]})(e))}function Yn(e,t){try{return t in e}catch{return!1}}function xs(e,t,n){var r={};return n.isMergeableObject(e)&&Vn(e).forEach((function(o){r[o]=et(e[o],n)})),Vn(t).forEach((function(o){(function(a,i){return Yn(a,i)&&!(Object.hasOwnProperty.call(a,i)&&Object.propertyIsEnumerable.call(a,i))})(e,o)||(Yn(e,o)&&n.isMergeableObject(t[o])?r[o]=(function(a,i){if(!i.customMerge)return Ge;var c=i.customMerge(a);return typeof c=="function"?c:Ge})(o,n)(e[o],t[o],n):r[o]=et(t[o],n))})),r}function Ge(e,t,n){(n=n||{}).arrayMerge=n.arrayMerge||ws,n.isMergeableObject=n.isMergeableObject||ms,n.cloneUnlessOtherwiseSpecified=et;var r=Array.isArray(t);return r===Array.isArray(e)?r?n.arrayMerge(e,t,n):xs(e,t,n):et(t,n)}Ge.all=function(e,t){if(!Array.isArray(e))throw new Error("first argument should be an array");return e.reduce((function(n,r){return Ge(n,r,t)}),{})};var qt=hs(Ge);const Un={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.54)",disabled:"rgba(0, 0, 0, 0.38)"},background:{default:"#FFFFFF"},context:{background:"#e3f2fd",text:"rgba(0, 0, 0, 0.87)"},divider:{default:"rgba(0,0,0,.12)"},button:{default:"rgba(0,0,0,.54)",focus:"rgba(0,0,0,.12)",hover:"rgba(0,0,0,.12)",disabled:"rgba(0, 0, 0, .18)"},selected:{default:"#e3f2fd",text:"rgba(0, 0, 0, 0.87)"},highlightOnHover:{default:"#EEEEEE",text:"rgba(0, 0, 0, 0.87)"},striped:{default:"#FAFAFA",text:"rgba(0, 0, 0, 0.87)"}},Re={default:Un,light:Un,dark:{text:{primary:"#FFFFFF",secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(0,0,0,.12)"},background:{default:"#424242"},context:{background:"#E91E63",text:"#FFFFFF"},divider:{default:"rgba(81, 81, 81, 1)"},button:{default:"#FFFFFF",focus:"rgba(255, 255, 255, .54)",hover:"rgba(255, 255, 255, .12)",disabled:"rgba(255, 255, 255, .18)"},selected:{default:"rgba(0, 0, 0, .7)",text:"#FFFFFF"},highlightOnHover:{default:"rgba(0, 0, 0, .7)",text:"#FFFFFF"},striped:{default:"rgba(0, 0, 0, .87)",text:"#FFFFFF"}}};function Rr(e="default",t,n="default"){return Re[e]||(Re[e]=qt(Re[n],t||{})),Re[e]=qt(Re[e],t||{}),Re[e]}function ys(e,t,n,r){const[o,a]=s.useState((()=>Ln(e))),[i,c]=s.useState(""),d=s.useRef("");Pe((()=>{a(Ln(e))}),[e]);const m=s.useCallback((w=>{var R,$,b;const{attributes:v}=w.target,D=(R=v.getNamedItem("data-column-id"))===null||R===void 0?void 0:R.value;D&&(d.current=((b=($=o[it(o,D)])===null||$===void 0?void 0:$.id)===null||b===void 0?void 0:b.toString())||"",c(d.current))}),[o]),u=s.useCallback((w=>{var R;const{attributes:$}=w.target,b=(R=$.getNamedItem("data-column-id"))===null||R===void 0?void 0:R.value;if(b&&d.current&&b!==d.current){const v=it(o,d.current),D=it(o,b),E=[...o];E[v]=o[D],E[D]=o[v],a(E),t(E)}}),[t,o]),g=s.useCallback((w=>{w.preventDefault()}),[]),x=s.useCallback((w=>{w.preventDefault()}),[]),f=s.useCallback((w=>{w.preventDefault(),d.current="",c("")}),[]),y=(function(w=!1){return w?$e.ASC:$e.DESC})(r),O=s.useMemo((()=>o[it(o,n==null?void 0:n.toString())]||{}),[n,o]);return{tableColumns:o,draggingColumnId:i,handleDragStart:m,handleDragEnter:u,handleDragOver:g,handleDragLeave:x,handleDragEnd:f,defaultSortDirection:y,defaultSortColumn:O}}var vs=s.memo((function(e){const{data:t=l.data,columns:n=l.columns,title:r=l.title,actions:o=l.actions,keyField:a=l.keyField,striped:i=l.striped,highlightOnHover:c=l.highlightOnHover,pointerOnHover:d=l.pointerOnHover,dense:m=l.dense,selectableRows:u=l.selectableRows,selectableRowsSingle:g=l.selectableRowsSingle,selectableRowsHighlight:x=l.selectableRowsHighlight,selectableRowsNoSelectAll:f=l.selectableRowsNoSelectAll,selectableRowsVisibleOnly:y=l.selectableRowsVisibleOnly,selectableRowSelected:O=l.selectableRowSelected,selectableRowDisabled:w=l.selectableRowDisabled,selectableRowsComponent:R=l.selectableRowsComponent,selectableRowsComponentProps:$=l.selectableRowsComponentProps,onRowExpandToggled:b=l.onRowExpandToggled,onSelectedRowsChange:v=l.onSelectedRowsChange,expandableIcon:D=l.expandableIcon,onChangeRowsPerPage:E=l.onChangeRowsPerPage,onChangePage:p=l.onChangePage,paginationServer:A=l.paginationServer,paginationServerOptions:ee=l.paginationServerOptions,paginationTotalRows:Y=l.paginationTotalRows,paginationDefaultPage:q=l.paginationDefaultPage,paginationResetDefaultPage:te=l.paginationResetDefaultPage,paginationPerPage:M=l.paginationPerPage,paginationRowsPerPageOptions:h=l.paginationRowsPerPageOptions,paginationIconLastPage:j=l.paginationIconLastPage,paginationIconFirstPage:H=l.paginationIconFirstPage,paginationIconNext:F=l.paginationIconNext,paginationIconPrevious:oe=l.paginationIconPrevious,paginationComponent:L=l.paginationComponent,paginationComponentOptions:re=l.paginationComponentOptions,responsive:ae=l.responsive,progressPending:z=l.progressPending,progressComponent:he=l.progressComponent,persistTableHead:J=l.persistTableHead,noDataComponent:ce=l.noDataComponent,disabled:se=l.disabled,noTableHead:ye=l.noTableHead,noHeader:we=l.noHeader,fixedHeader:de=l.fixedHeader,fixedHeaderScrollHeight:Ee=l.fixedHeaderScrollHeight,pagination:ie=l.pagination,subHeader:Z=l.subHeader,subHeaderAlign:tt=l.subHeaderAlign,subHeaderWrap:nt=l.subHeaderWrap,subHeaderComponent:Ot=l.subHeaderComponent,noContextMenu:Pt=l.noContextMenu,contextMessage:kt=l.contextMessage,contextActions:B=l.contextActions,contextComponent:$r=l.contextComponent,expandableRows:rt=l.expandableRows,onRowClicked:tn=l.onRowClicked,onRowDoubleClicked:nn=l.onRowDoubleClicked,onRowMouseEnter:rn=l.onRowMouseEnter,onRowMouseLeave:on=l.onRowMouseLeave,sortIcon:Er=l.sortIcon,onSort:Or=l.onSort,sortFunction:an=l.sortFunction,sortServer:Dt=l.sortServer,expandableRowsComponent:Pr=l.expandableRowsComponent,expandableRowsComponentProps:kr=l.expandableRowsComponentProps,expandableRowDisabled:sn=l.expandableRowDisabled,expandableRowsHideExpander:ln=l.expandableRowsHideExpander,expandOnRowClicked:Dr=l.expandOnRowClicked,expandOnRowDoubleClicked:Ir=l.expandOnRowDoubleClicked,expandableRowExpanded:cn=l.expandableRowExpanded,expandableInheritConditionalStyles:Ar=l.expandableInheritConditionalStyles,defaultSortFieldId:jr=l.defaultSortFieldId,defaultSortAsc:_r=l.defaultSortAsc,clearSelectedRows:dn=l.clearSelectedRows,conditionalRowStyles:Tr=l.conditionalRowStyles,theme:un=l.theme,customStyles:pn=l.customStyles,direction:Ue=l.direction,onColumnOrderChange:Fr=l.onColumnOrderChange,className:Hr,ariaLabel:gn}=e,{tableColumns:fn,draggingColumnId:hn,handleDragStart:mn,handleDragEnter:bn,handleDragOver:wn,handleDragLeave:xn,handleDragEnd:yn,defaultSortDirection:Nr,defaultSortColumn:Mr}=ys(n,Fr,jr,_r),[{rowsPerPage:ve,currentPage:pe,selectedRows:It,allSelected:vn,selectedCount:Cn,selectedColumn:me,sortDirection:_e,toggleOnSelectedRowsChange:Lr},Oe]=s.useReducer(ua,{allSelected:!1,selectedCount:0,selectedRows:[],selectedColumn:Mr,toggleOnSelectedRowsChange:!1,sortDirection:Nr,currentPage:q,rowsPerPage:M,selectedRowsFlag:!1,contextMessage:l.contextMessage}),{persistSelectedOnSort:Sn=!1,persistSelectedOnPageChange:ot=!1}=ee,Rn=!(!A||!ot&&!Sn),zr=ie&&!z&&t.length>0,Wr=L||fs,Br=s.useMemo((()=>((C={},_="default",ne="default")=>{const ge=Re[_]?_:ne;return qt({table:{style:{color:(S=Re[ge]).text.primary,backgroundColor:S.background.default}},tableWrapper:{style:{display:"table"}},responsiveWrapper:{style:{}},header:{style:{fontSize:"22px",color:S.text.primary,backgroundColor:S.background.default,minHeight:"56px",paddingLeft:"16px",paddingRight:"8px"}},subHeader:{style:{backgroundColor:S.background.default,minHeight:"52px"}},head:{style:{color:S.text.primary,fontSize:"12px",fontWeight:500}},headRow:{style:{backgroundColor:S.background.default,minHeight:"52px",borderBottomWidth:"1px",borderBottomColor:S.divider.default,borderBottomStyle:"solid"},denseStyle:{minHeight:"32px"}},headCells:{style:{paddingLeft:"16px",paddingRight:"16px"},draggingStyle:{cursor:"move"}},contextMenu:{style:{backgroundColor:S.context.background,fontSize:"18px",fontWeight:400,color:S.context.text,paddingLeft:"16px",paddingRight:"8px",transform:"translate3d(0, -100%, 0)",transitionDuration:"125ms",transitionTimingFunction:"cubic-bezier(0, 0, 0.2, 1)",willChange:"transform"},activeStyle:{transform:"translate3d(0, 0, 0)"}},cells:{style:{paddingLeft:"16px",paddingRight:"16px",wordBreak:"break-word"},draggingStyle:{}},rows:{style:{fontSize:"13px",fontWeight:400,color:S.text.primary,backgroundColor:S.background.default,minHeight:"48px","&:not(:last-of-type)":{borderBottomStyle:"solid",borderBottomWidth:"1px",borderBottomColor:S.divider.default}},denseStyle:{minHeight:"32px"},selectedHighlightStyle:{"&:nth-of-type(n)":{color:S.selected.text,backgroundColor:S.selected.default,borderBottomColor:S.background.default}},highlightOnHoverStyle:{color:S.highlightOnHover.text,backgroundColor:S.highlightOnHover.default,transitionDuration:"0.15s",transitionProperty:"background-color",borderBottomColor:S.background.default,outlineStyle:"solid",outlineWidth:"1px",outlineColor:S.background.default},stripedStyle:{color:S.striped.text,backgroundColor:S.striped.default}},expanderRow:{style:{color:S.text.primary,backgroundColor:S.background.default}},expanderCell:{style:{flex:"0 0 48px"}},expanderButton:{style:{color:S.button.default,fill:S.button.default,backgroundColor:"transparent",borderRadius:"2px",transition:"0.25s",height:"100%",width:"100%","&:hover:enabled":{cursor:"pointer"},"&:disabled":{color:S.button.disabled},"&:hover:not(:disabled)":{cursor:"pointer",backgroundColor:S.button.hover},"&:focus":{outline:"none",backgroundColor:S.button.focus},svg:{margin:"auto"}}},pagination:{style:{color:S.text.secondary,fontSize:"13px",minHeight:"56px",backgroundColor:S.background.default,borderTopStyle:"solid",borderTopWidth:"1px",borderTopColor:S.divider.default},pageButtonsStyle:{borderRadius:"50%",height:"40px",width:"40px",padding:"8px",margin:"px",cursor:"pointer",transition:"0.4s",color:S.button.default,fill:S.button.default,backgroundColor:"transparent","&:disabled":{cursor:"unset",color:S.button.disabled,fill:S.button.disabled},"&:hover:not(:disabled)":{backgroundColor:S.button.hover},"&:focus":{outline:"none",backgroundColor:S.button.focus}}},noData:{style:{display:"flex",alignItems:"center",justifyContent:"center",color:S.text.primary,backgroundColor:S.background.default}},progress:{style:{display:"flex",alignItems:"center",justifyContent:"center",color:S.text.primary,backgroundColor:S.background.default}}},C);var S})(pn,un)),[pn,un]),Gr=s.useMemo((()=>Object.assign({},Ue!=="auto"&&{dir:Ue})),[Ue]),X=s.useMemo((()=>{if(Dt)return t;if(me!=null&&me.sortFunction&&typeof me.sortFunction=="function"){const C=me.sortFunction,_=_e===$e.ASC?C:(ne,ge)=>-1*C(ne,ge);return[...t].sort(_)}return(function(C,_,ne,ge){return _?ge&&typeof ge=="function"?ge(C.slice(0),_,ne):C.slice(0).sort(((S,At)=>{const Fe=_(S),Ce=_(At);if(ne==="asc"){if(Fe<Ce)return-1;if(Fe>Ce)return 1}if(ne==="desc"){if(Fe>Ce)return-1;if(Fe<Ce)return 1}return 0})):C})(t,me==null?void 0:me.selector,_e,an)}),[Dt,me,_e,t,an]),Ke=s.useMemo((()=>{if(ie&&!A){const C=pe*ve,_=C-ve;return X.slice(_,C)}return X}),[pe,ie,A,ve,X]),Vr=s.useCallback((C=>{Oe(C)}),[]),Yr=s.useCallback((C=>{Oe(C)}),[]),Ur=s.useCallback((C=>{Oe(C)}),[]),Kr=s.useCallback(((C,_)=>tn(C,_)),[tn]),qr=s.useCallback(((C,_)=>nn(C,_)),[nn]),Jr=s.useCallback(((C,_)=>rn(C,_)),[rn]),Zr=s.useCallback(((C,_)=>on(C,_)),[on]),Te=s.useCallback((C=>Oe({type:"CHANGE_PAGE",page:C,paginationServer:A,visibleOnly:y,persistSelectedOnPageChange:ot})),[A,ot,y]),Xr=s.useCallback((C=>{const _=Ze(Y||Ke.length,C),ne=Nt(pe,_);A||Te(ne),Oe({type:"CHANGE_ROWS_PER_PAGE",page:ne,rowsPerPage:C})}),[pe,Te,A,Y,Ke.length]);if(ie&&!A&&X.length>0&&Ke.length===0){const C=Ze(X.length,ve),_=Nt(pe,C);Te(_)}Pe((()=>{v({allSelected:vn,selectedCount:Cn,selectedRows:It.slice(0)})}),[Lr]),Pe((()=>{Or(me,_e,X.slice(0))}),[me,_e]),Pe((()=>{p(pe,Y||X.length)}),[pe]),Pe((()=>{E(ve,pe)}),[ve]),Pe((()=>{Te(q)}),[q,te]),Pe((()=>{if(ie&&A&&Y>0){const C=Ze(Y,ve),_=Nt(pe,C);pe!==_&&Te(_)}}),[Y]),s.useEffect((()=>{Oe({type:"CLEAR_SELECTED_ROWS",selectedRowsFlag:dn})}),[g,dn]),s.useEffect((()=>{if(!O)return;const C=X.filter((ne=>O(ne))),_=g?C.slice(0,1):C;Oe({type:"SELECT_MULTIPLE_ROWS",keyField:a,selectedRows:_,totalRows:X.length,mergeSelections:Rn})}),[t,O]);const Qr=y?Ke:X,eo=ot||g||f;return s.createElement(ia,{theme:Br},!we&&(!!r||!!o)&&s.createElement(Ja,{title:r,actions:o,showMenu:!Pt,selectedCount:Cn,direction:Ue,contextActions:B,contextComponent:$r,contextMessage:kt}),Z&&s.createElement(Qa,{align:tt,wrapContent:nt},Ot),s.createElement(ts,Object.assign({$responsive:ae,$fixedHeader:de,$fixedHeaderScrollHeight:Ee,className:Hr},Gr),s.createElement(ns,null,z&&!J&&s.createElement(Gn,null,he),s.createElement(ga,Object.assign({disabled:se,className:"rdt_Table",role:"table"},gn&&{"aria-label":gn}),!ye&&(!!J||X.length>0&&!z)&&s.createElement(ha,{className:"rdt_TableHead",role:"rowgroup",$fixedHeader:de},s.createElement(ma,{className:"rdt_TableHeadRow",role:"row",$dense:m},u&&(eo?s.createElement(Ye,{style:{flex:"0 0 48px"}}):s.createElement(Ba,{allSelected:vn,selectedRows:It,selectableRowsComponent:R,selectableRowsComponentProps:$,selectableRowDisabled:w,rowData:Qr,keyField:a,mergeSelections:Rn,onSelectAllRows:Yr})),rt&&!ln&&s.createElement(rs,null),fn.map((C=>s.createElement(za,{key:C.id,column:C,selectedColumn:me,disabled:z||X.length===0,pagination:ie,paginationServer:A,persistSelectedOnSort:Sn,selectableRowsVisibleOnly:y,sortDirection:_e,sortIcon:Er,sortServer:Dt,onSort:Vr,onDragStart:mn,onDragOver:wn,onDragEnd:yn,onDragEnter:bn,onDragLeave:xn,draggingColumnId:hn}))))),!X.length&&!z&&s.createElement(os,null,ce),z&&J&&s.createElement(Gn,null,he),!z&&X.length>0&&s.createElement(es,{className:"rdt_TableBody",role:"rowgroup"},Ke.map(((C,_)=>{const ne=Be(C,a),ge=(function(Ce=""){return typeof Ce!="number"&&(!Ce||Ce.length===0)})(ne)?_:ne,S=ft(C,It,a),At=!!(rt&&cn&&cn(C)),Fe=!!(rt&&sn&&sn(C));return s.createElement(_a,{id:ge,key:ge,keyField:a,"data-row-id":ge,columns:fn,row:C,rowCount:X.length,rowIndex:_,selectableRows:u,expandableRows:rt,expandableIcon:D,highlightOnHover:c,pointerOnHover:d,dense:m,expandOnRowClicked:Dr,expandOnRowDoubleClicked:Ir,expandableRowsComponent:Pr,expandableRowsComponentProps:kr,expandableRowsHideExpander:ln,defaultExpanderDisabled:Fe,defaultExpanded:At,expandableInheritConditionalStyles:Ar,conditionalRowStyles:Tr,selected:S,selectableRowsHighlight:x,selectableRowsComponent:R,selectableRowsComponentProps:$,selectableRowDisabled:w,selectableRowsSingle:g,striped:i,onRowExpandToggled:b,onRowClicked:Kr,onRowDoubleClicked:qr,onRowMouseEnter:Jr,onRowMouseLeave:Zr,onSelectedRow:Ur,draggingColumnId:hn,onDragStart:mn,onDragOver:wn,onDragEnd:yn,onDragEnter:bn,onDragLeave:xn})})))))),zr&&s.createElement("div",null,s.createElement(Wr,{onChangePage:Te,onChangeRowsPerPage:Xr,rowCount:Y||X.length,currentPage:pe,rowsPerPage:ve,direction:Ue,paginationRowsPerPageOptions:h,paginationIconLastPage:j,paginationIconFirstPage:H,paginationIconNext:F,paginationIconPrevious:oe,paginationComponentOptions:re})))}));function Lt(e,t){return t.split(".").reduce((n,r)=>n==null?void 0:n[r],e)}const Cs={headCells:{style:{fontWeight:"bold",fontSize:"15px"}},cells:{style:{fontSize:"14px"}},rows:{style:{}}};Rr("dark",{background:{default:"transparent"}});Rr("light",{background:{default:"transparent"}});const Ss={rowsPerPageText:"Filas por página",rangeSeparatorText:"de"};function Ps({data:e,columns:t,filterFields:n=[],onRowClick:r,onFilteredChange:o,noDataComponent:a,inactiveField:i,alternativeStorageKey:c,disableRowClick:d=!1}){const{theme:m}=oo(),u=to(),{openModal:g,closeModal:x}=ao(),f=c||`entityTableFilters_${u.pathname}`,y=({row:h,originalSelector:j})=>{const H=j(h),F=H==="Activo"||H==="Sí"||H===!0;return K.jsx("span",{className:`font-medium text-xs px-2 py-1 rounded-full ${F?"text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/30":"text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/30"}`,children:typeof H=="boolean"?H?"Activo":"Inactivo":H})},O=t.map(h=>(h.name==="Activo"||h.name==="Estado"||h.name==="Status")&&h.selector?{...h,cell:j=>K.jsx(y,{row:j,originalSelector:h.selector})}:h),[w,R]=s.useState(()=>{const h=localStorage.getItem(f);return h?JSON.parse(h):{}}),[$,b]=s.useState(e),[v,D]=s.useState(!1),[E,p]=s.useState(()=>{const h=localStorage.getItem(`${f}_page`);return h?parseInt(h,10):1}),A=h=>{if(!i)return!1;const j=Lt(h,i);return j===!1||j==="No"||j==="Inactivo"||j==="no"||j==="false"},ee=()=>({opacity:"0.6",backgroundColor:m==="dark"?"rgba(107, 114, 128, 0.1)":"rgba(156, 163, 175, 0.1)",borderLeft:m==="dark"?"3px solid rgb(107, 114, 128)":"3px solid rgb(156, 163, 175)"});function Y(h){return h.normalize("NFD").replace(/[\u0300-\u036f]/g,"")}const q=h=>{const j=e.filter(H=>n.every(({key:F,type:oe})=>{var L;if(oe==="dateRange"){const re=h[`${F}_from`],ae=h[`${F}_to`],z=Lt(H,F);if(!z)return!1;const he=new Date(z).getTime(),J=re?new Date(re).getTime():null,ce=ae?new Date(ae).getTime():null;return(!J||he>=J)&&(!ce||he<=ce)}else{const re=Y(((L=h[F])==null?void 0:L.toLowerCase())??"");return re?Y(String(Lt(H,F)??"").toLowerCase()).includes(re):!0}}));b(j),D(Object.values(h).some(H=>H))},te=(h,j,H)=>{const F={...w};j&&j.trim()!==""?F[h]=j:delete F[h],R(F),localStorage.setItem(f,JSON.stringify(F)),p(1),localStorage.setItem(`${f}_page`,"1"),H&&q(F)},M=h=>{p(h),localStorage.setItem(`${f}_page`,h.toString())};return s.useEffect(()=>{Object.values(w).some(j=>j)?q(w):(b(e),D(!1))},[e,w]),s.useEffect(()=>{Object.values(w).some(j=>j)&&g("CONFIRMATION",{title:"Filtros Aplicados",message:"Hay filtros aplicados desde tu última visita. ¿Deseas limpiar los filtros?",confirmText:"Limpiar Filtros",cancelText:"Mantener Filtros",onConfirm:()=>{R({}),b(e),o&&o(e),localStorage.removeItem(f),localStorage.removeItem(`${f}_page`),p(1),D(!1),x()}})},[]),K.jsxs(K.Fragment,{children:[v&&n.length>0&&K.jsx("div",{className:"mb-2 text-blue font-semibold text-sm",children:"ℹ️ Filtros aplicados."}),n.length>0&&K.jsxs("form",{className:"flex gap-2 items-baseline md:flex-row flex-col",onSubmit:h=>{h.preventDefault(),q(w)},children:[n.map(({key:h,label:j,type:H="text",options:F,autoFilter:oe})=>K.jsx("div",{className:"w-full",children:H==="dateRange"?K.jsxs("div",{className:"flex gap-2 items-center",children:[K.jsx(jt,{label:"Desde",type:"date",value:w[`${h}_from`]??"",onChange:L=>te(`${h}_from`,L.target.value,oe)}),K.jsx("span",{className:"text-sm",children:"a"}),K.jsx(jt,{type:"date",label:"Hasta",value:w[`${h}_to`]??"",onChange:L=>te(`${h}_to`,L.target.value,oe)})]}):H==="select"?K.jsx(no,{label:j,value:w[h]??"",onChange:L=>te(h,L.target.value,oe),children:F}):K.jsx(jt,{type:"search",placeholder:j,label:j,value:w[h]??"",onChange:L=>te(h,L.target.value,oe)})},h)),!n.every(h=>h.autoFilter)&&K.jsx("div",{className:"w-fit",children:K.jsx(ro,{variant:"yellow",type:"submit",children:"Filtrar"})})]}),K.jsx(vs,{columns:O,data:$,customStyles:Cs,theme:m,pagination:!0,paginationPerPage:30,paginationDefaultPage:E,onChangePage:M,onRowClicked:d?void 0:r,pointerOnHover:!d,highlightOnHover:!0,paginationComponentOptions:Ss,noDataComponent:a||K.jsx("div",{className:"py-6 text-text-secondary",children:"No se encontraron registros"}),conditionalRowStyles:i?[{when:h=>A(h),style:ee()}]:void 0})]})}export{Ps as E};

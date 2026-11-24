import{B as e,F as t,H as n,L as r,N as i,P as a,R as o,V as s,a as c,l,o as u,p as d,t as f,z as p}from"./index-2_Mx4_Wb.js";function m(e,t){let n=t||{};return(e[e.length-1]===``?[...e,``]:e).join((n.padRight?` `:``)+`,`+(n.padLeft===!1?``:` `)).trim()}var h=/^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,g=/^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,_={};function v(e,t){return((t||_).jsx?g:h).test(e)}var y=/[ \t\n\f\r]/g;function b(e){return typeof e==`object`?e.type===`text`&&x(e.value):x(e)}function x(e){return e.replace(y,``)===``}var S=class{constructor(e,t,n){this.normal=t,this.property=e,n&&(this.space=n)}};S.prototype.normal={},S.prototype.property={},S.prototype.space=void 0;function C(e,t){let n={},r={};for(let t of e)Object.assign(n,t.property),Object.assign(r,t.normal);return new S(n,r,t)}function w(e){return e.toLowerCase()}var T=class{constructor(e,t){this.attribute=t,this.property=e}};T.prototype.attribute=``,T.prototype.booleanish=!1,T.prototype.boolean=!1,T.prototype.commaOrSpaceSeparated=!1,T.prototype.commaSeparated=!1,T.prototype.defined=!1,T.prototype.mustUseProperty=!1,T.prototype.number=!1,T.prototype.overloadedBoolean=!1,T.prototype.property=``,T.prototype.spaceSeparated=!1,T.prototype.space=void 0;var E=s({boolean:()=>O,booleanish:()=>k,commaOrSpaceSeparated:()=>N,commaSeparated:()=>M,number:()=>A,overloadedBoolean:()=>ee,spaceSeparated:()=>j}),D=0,O=P(),k=P(),ee=P(),A=P(),j=P(),M=P(),N=P();function P(){return 2**++D}var F=Object.keys(E),I=class extends T{constructor(e,t,n,r){let i=-1;if(super(e,t),te(this,`space`,r),typeof n==`number`)for(;++i<F.length;){let e=F[i];te(this,F[i],(n&E[e])===E[e])}}};I.prototype.defined=!0;function te(e,t,n){n&&(e[t]=n)}function ne(e){let t={},n={};for(let[r,i]of Object.entries(e.properties)){let a=new I(r,e.transform(e.attributes||{},r),i,e.space);e.mustUseProperty&&e.mustUseProperty.includes(r)&&(a.mustUseProperty=!0),t[r]=a,n[w(r)]=r,n[w(a.attribute)]=r}return new S(t,n,e.space)}var re=ne({properties:{ariaActiveDescendant:null,ariaAtomic:k,ariaAutoComplete:null,ariaBusy:k,ariaChecked:k,ariaColCount:A,ariaColIndex:A,ariaColSpan:A,ariaControls:j,ariaCurrent:null,ariaDescribedBy:j,ariaDetails:null,ariaDisabled:k,ariaDropEffect:j,ariaErrorMessage:null,ariaExpanded:k,ariaFlowTo:j,ariaGrabbed:k,ariaHasPopup:null,ariaHidden:k,ariaInvalid:null,ariaKeyShortcuts:null,ariaLabel:null,ariaLabelledBy:j,ariaLevel:A,ariaLive:null,ariaModal:k,ariaMultiLine:k,ariaMultiSelectable:k,ariaOrientation:null,ariaOwns:j,ariaPlaceholder:null,ariaPosInSet:A,ariaPressed:k,ariaReadOnly:k,ariaRelevant:null,ariaRequired:k,ariaRoleDescription:j,ariaRowCount:A,ariaRowIndex:A,ariaRowSpan:A,ariaSelected:k,ariaSetSize:A,ariaSort:null,ariaValueMax:A,ariaValueMin:A,ariaValueNow:A,ariaValueText:null,role:null},transform(e,t){return t===`role`?t:`aria-`+t.slice(4).toLowerCase()}});function ie(e,t){return t in e?e[t]:t}function ae(e,t){return ie(e,t.toLowerCase())}var oe=ne({attributes:{acceptcharset:`accept-charset`,classname:`class`,htmlfor:`for`,httpequiv:`http-equiv`},mustUseProperty:[`checked`,`multiple`,`muted`,`selected`],properties:{abbr:null,accept:M,acceptCharset:j,accessKey:j,action:null,allow:null,allowFullScreen:O,allowPaymentRequest:O,allowUserMedia:O,alpha:O,alt:null,as:null,async:O,autoCapitalize:null,autoComplete:j,autoFocus:O,autoPlay:O,blocking:j,capture:null,charSet:null,checked:O,cite:null,className:j,closedBy:null,colorSpace:null,cols:A,colSpan:A,command:null,commandFor:null,content:null,contentEditable:k,controls:O,controlsList:j,coords:A|M,crossOrigin:null,data:null,dateTime:null,decoding:null,default:O,defer:O,dir:null,dirName:null,disabled:O,download:ee,draggable:k,encType:null,enterKeyHint:null,fetchPriority:null,form:null,formAction:null,formEncType:null,formMethod:null,formNoValidate:O,formTarget:null,headers:j,height:A,hidden:ee,high:A,href:null,hrefLang:null,htmlFor:j,httpEquiv:j,id:null,imageSizes:null,imageSrcSet:null,inert:O,inputMode:null,integrity:null,is:null,isMap:O,itemId:null,itemProp:j,itemRef:j,itemScope:O,itemType:j,kind:null,label:null,lang:null,language:null,list:null,loading:null,loop:O,low:A,manifest:null,max:null,maxLength:A,media:null,method:null,min:null,minLength:A,multiple:O,muted:O,name:null,nonce:null,noModule:O,noValidate:O,onAbort:null,onAfterPrint:null,onAuxClick:null,onBeforeMatch:null,onBeforePrint:null,onBeforeToggle:null,onBeforeUnload:null,onBlur:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onContextLost:null,onContextMenu:null,onContextRestored:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnded:null,onError:null,onFocus:null,onFormData:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLanguageChange:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadEnd:null,onLoadStart:null,onMessage:null,onMessageError:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRejectionHandled:null,onReset:null,onResize:null,onScroll:null,onScrollEnd:null,onSecurityPolicyViolation:null,onSeeked:null,onSeeking:null,onSelect:null,onSlotChange:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnhandledRejection:null,onUnload:null,onVolumeChange:null,onWaiting:null,onWheel:null,open:O,optimum:A,pattern:null,ping:j,placeholder:null,playsInline:O,popover:null,popoverTarget:null,popoverTargetAction:null,poster:null,preload:null,readOnly:O,referrerPolicy:null,rel:j,required:O,reversed:O,rows:A,rowSpan:A,sandbox:j,scope:null,scoped:O,seamless:O,selected:O,shadowRootClonable:O,shadowRootCustomElementRegistry:O,shadowRootDelegatesFocus:O,shadowRootMode:null,shadowRootSerializable:O,shape:null,size:A,sizes:null,slot:null,span:A,spellCheck:k,src:null,srcDoc:null,srcLang:null,srcSet:null,start:A,step:null,style:null,tabIndex:A,target:null,title:null,translate:null,type:null,typeMustMatch:O,useMap:null,value:k,width:A,wrap:null,writingSuggestions:null,align:null,aLink:null,archive:j,axis:null,background:null,bgColor:null,border:A,borderColor:null,bottomMargin:A,cellPadding:null,cellSpacing:null,char:null,charOff:null,classId:null,clear:null,code:null,codeBase:null,codeType:null,color:null,compact:O,declare:O,event:null,face:null,frame:null,frameBorder:null,hSpace:A,leftMargin:A,link:null,longDesc:null,lowSrc:null,marginHeight:A,marginWidth:A,noResize:O,noHref:O,noShade:O,noWrap:O,object:null,profile:null,prompt:null,rev:null,rightMargin:A,rules:null,scheme:null,scrolling:k,standby:null,summary:null,text:null,topMargin:A,valueType:null,version:null,vAlign:null,vLink:null,vSpace:A,allowTransparency:null,autoCorrect:null,autoSave:null,credentialless:O,disablePictureInPicture:O,disableRemotePlayback:O,exportParts:M,part:j,prefix:null,property:null,results:A,security:null,unselectable:null},space:`html`,transform:ae}),se=ne({attributes:{accentHeight:`accent-height`,alignmentBaseline:`alignment-baseline`,arabicForm:`arabic-form`,baselineShift:`baseline-shift`,capHeight:`cap-height`,className:`class`,clipPath:`clip-path`,clipRule:`clip-rule`,colorInterpolation:`color-interpolation`,colorInterpolationFilters:`color-interpolation-filters`,colorProfile:`color-profile`,colorRendering:`color-rendering`,crossOrigin:`crossorigin`,dataType:`datatype`,dominantBaseline:`dominant-baseline`,enableBackground:`enable-background`,fillOpacity:`fill-opacity`,fillRule:`fill-rule`,floodColor:`flood-color`,floodOpacity:`flood-opacity`,fontFamily:`font-family`,fontSize:`font-size`,fontSizeAdjust:`font-size-adjust`,fontStretch:`font-stretch`,fontStyle:`font-style`,fontVariant:`font-variant`,fontWeight:`font-weight`,glyphName:`glyph-name`,glyphOrientationHorizontal:`glyph-orientation-horizontal`,glyphOrientationVertical:`glyph-orientation-vertical`,hrefLang:`hreflang`,horizAdvX:`horiz-adv-x`,horizOriginX:`horiz-origin-x`,horizOriginY:`horiz-origin-y`,imageRendering:`image-rendering`,letterSpacing:`letter-spacing`,lightingColor:`lighting-color`,markerEnd:`marker-end`,markerMid:`marker-mid`,markerStart:`marker-start`,maskType:`mask-type`,navDown:`nav-down`,navDownLeft:`nav-down-left`,navDownRight:`nav-down-right`,navLeft:`nav-left`,navNext:`nav-next`,navPrev:`nav-prev`,navRight:`nav-right`,navUp:`nav-up`,navUpLeft:`nav-up-left`,navUpRight:`nav-up-right`,onAbort:`onabort`,onActivate:`onactivate`,onAfterPrint:`onafterprint`,onBeforePrint:`onbeforeprint`,onBegin:`onbegin`,onCancel:`oncancel`,onCanPlay:`oncanplay`,onCanPlayThrough:`oncanplaythrough`,onChange:`onchange`,onClick:`onclick`,onClose:`onclose`,onCopy:`oncopy`,onCueChange:`oncuechange`,onCut:`oncut`,onDblClick:`ondblclick`,onDrag:`ondrag`,onDragEnd:`ondragend`,onDragEnter:`ondragenter`,onDragExit:`ondragexit`,onDragLeave:`ondragleave`,onDragOver:`ondragover`,onDragStart:`ondragstart`,onDrop:`ondrop`,onDurationChange:`ondurationchange`,onEmptied:`onemptied`,onEnd:`onend`,onEnded:`onended`,onError:`onerror`,onFocus:`onfocus`,onFocusIn:`onfocusin`,onFocusOut:`onfocusout`,onHashChange:`onhashchange`,onInput:`oninput`,onInvalid:`oninvalid`,onKeyDown:`onkeydown`,onKeyPress:`onkeypress`,onKeyUp:`onkeyup`,onLoad:`onload`,onLoadedData:`onloadeddata`,onLoadedMetadata:`onloadedmetadata`,onLoadStart:`onloadstart`,onMessage:`onmessage`,onMouseDown:`onmousedown`,onMouseEnter:`onmouseenter`,onMouseLeave:`onmouseleave`,onMouseMove:`onmousemove`,onMouseOut:`onmouseout`,onMouseOver:`onmouseover`,onMouseUp:`onmouseup`,onMouseWheel:`onmousewheel`,onOffline:`onoffline`,onOnline:`ononline`,onPageHide:`onpagehide`,onPageShow:`onpageshow`,onPaste:`onpaste`,onPause:`onpause`,onPlay:`onplay`,onPlaying:`onplaying`,onPopState:`onpopstate`,onProgress:`onprogress`,onRateChange:`onratechange`,onRepeat:`onrepeat`,onReset:`onreset`,onResize:`onresize`,onScroll:`onscroll`,onSeeked:`onseeked`,onSeeking:`onseeking`,onSelect:`onselect`,onShow:`onshow`,onStalled:`onstalled`,onStorage:`onstorage`,onSubmit:`onsubmit`,onSuspend:`onsuspend`,onTimeUpdate:`ontimeupdate`,onToggle:`ontoggle`,onUnload:`onunload`,onVolumeChange:`onvolumechange`,onWaiting:`onwaiting`,onZoom:`onzoom`,overlinePosition:`overline-position`,overlineThickness:`overline-thickness`,paintOrder:`paint-order`,panose1:`panose-1`,pointerEvents:`pointer-events`,referrerPolicy:`referrerpolicy`,renderingIntent:`rendering-intent`,shapeRendering:`shape-rendering`,stopColor:`stop-color`,stopOpacity:`stop-opacity`,strikethroughPosition:`strikethrough-position`,strikethroughThickness:`strikethrough-thickness`,strokeDashArray:`stroke-dasharray`,strokeDashOffset:`stroke-dashoffset`,strokeLineCap:`stroke-linecap`,strokeLineJoin:`stroke-linejoin`,strokeMiterLimit:`stroke-miterlimit`,strokeOpacity:`stroke-opacity`,strokeWidth:`stroke-width`,tabIndex:`tabindex`,textAnchor:`text-anchor`,textDecoration:`text-decoration`,textRendering:`text-rendering`,transformOrigin:`transform-origin`,typeOf:`typeof`,underlinePosition:`underline-position`,underlineThickness:`underline-thickness`,unicodeBidi:`unicode-bidi`,unicodeRange:`unicode-range`,unitsPerEm:`units-per-em`,vAlphabetic:`v-alphabetic`,vHanging:`v-hanging`,vIdeographic:`v-ideographic`,vMathematical:`v-mathematical`,vectorEffect:`vector-effect`,vertAdvY:`vert-adv-y`,vertOriginX:`vert-origin-x`,vertOriginY:`vert-origin-y`,wordSpacing:`word-spacing`,writingMode:`writing-mode`,xHeight:`x-height`,playbackOrder:`playbackorder`,timelineBegin:`timelinebegin`},properties:{about:N,accentHeight:A,accumulate:null,additive:null,alignmentBaseline:null,alphabetic:A,amplitude:A,arabicForm:null,ascent:A,attributeName:null,attributeType:null,azimuth:A,bandwidth:null,baselineShift:null,baseFrequency:null,baseProfile:null,bbox:null,begin:null,bias:A,by:null,calcMode:null,capHeight:A,className:j,clip:null,clipPath:null,clipPathUnits:null,clipRule:null,color:null,colorInterpolation:null,colorInterpolationFilters:null,colorProfile:null,colorRendering:null,content:null,contentScriptType:null,contentStyleType:null,crossOrigin:null,cursor:null,cx:null,cy:null,d:null,dataType:null,defaultAction:null,descent:A,diffuseConstant:A,direction:null,display:null,dur:null,divisor:A,dominantBaseline:null,download:O,dx:null,dy:null,edgeMode:null,editable:null,elevation:A,enableBackground:null,end:null,event:null,exponent:A,externalResourcesRequired:null,fill:null,fillOpacity:A,fillRule:null,filter:null,filterRes:null,filterUnits:null,floodColor:null,floodOpacity:null,focusable:null,focusHighlight:null,fontFamily:null,fontSize:null,fontSizeAdjust:null,fontStretch:null,fontStyle:null,fontVariant:null,fontWeight:null,format:null,fr:null,from:null,fx:null,fy:null,g1:M,g2:M,glyphName:M,glyphOrientationHorizontal:null,glyphOrientationVertical:null,glyphRef:null,gradientTransform:null,gradientUnits:null,handler:null,hanging:A,hatchContentUnits:null,hatchUnits:null,height:null,href:null,hrefLang:null,horizAdvX:A,horizOriginX:A,horizOriginY:A,id:null,ideographic:A,imageRendering:null,initialVisibility:null,in:null,in2:null,intercept:A,k:A,k1:A,k2:A,k3:A,k4:A,kernelMatrix:N,kernelUnitLength:null,keyPoints:null,keySplines:null,keyTimes:null,kerning:null,lang:null,lengthAdjust:null,letterSpacing:null,lightingColor:null,limitingConeAngle:A,local:null,markerEnd:null,markerMid:null,markerStart:null,markerHeight:null,markerUnits:null,markerWidth:null,mask:null,maskContentUnits:null,maskType:null,maskUnits:null,mathematical:null,max:null,media:null,mediaCharacterEncoding:null,mediaContentEncodings:null,mediaSize:A,mediaTime:null,method:null,min:null,mode:null,name:null,navDown:null,navDownLeft:null,navDownRight:null,navLeft:null,navNext:null,navPrev:null,navRight:null,navUp:null,navUpLeft:null,navUpRight:null,numOctaves:null,observer:null,offset:null,onAbort:null,onActivate:null,onAfterPrint:null,onBeforePrint:null,onBegin:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnd:null,onEnded:null,onError:null,onFocus:null,onFocusIn:null,onFocusOut:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadStart:null,onMessage:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onMouseWheel:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRepeat:null,onReset:null,onResize:null,onScroll:null,onSeeked:null,onSeeking:null,onSelect:null,onShow:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnload:null,onVolumeChange:null,onWaiting:null,onZoom:null,opacity:null,operator:null,order:null,orient:null,orientation:null,origin:null,overflow:null,overlay:null,overlinePosition:A,overlineThickness:A,paintOrder:null,panose1:null,path:null,pathLength:A,patternContentUnits:null,patternTransform:null,patternUnits:null,phase:null,ping:j,pitch:null,playbackOrder:null,pointerEvents:null,points:null,pointsAtX:A,pointsAtY:A,pointsAtZ:A,preserveAlpha:null,preserveAspectRatio:null,primitiveUnits:null,propagate:null,property:N,r:null,radius:null,referrerPolicy:null,refX:null,refY:null,rel:N,rev:N,renderingIntent:null,repeatCount:null,repeatDur:null,requiredExtensions:N,requiredFeatures:N,requiredFonts:N,requiredFormats:N,resource:null,restart:null,result:null,rotate:null,rx:null,ry:null,scale:null,seed:null,shapeRendering:null,side:null,slope:null,snapshotTime:null,specularConstant:A,specularExponent:A,spreadMethod:null,spacing:null,startOffset:null,stdDeviation:null,stemh:null,stemv:null,stitchTiles:null,stopColor:null,stopOpacity:null,strikethroughPosition:A,strikethroughThickness:A,string:null,stroke:null,strokeDashArray:N,strokeDashOffset:null,strokeLineCap:null,strokeLineJoin:null,strokeMiterLimit:A,strokeOpacity:A,strokeWidth:null,style:null,surfaceScale:A,syncBehavior:null,syncBehaviorDefault:null,syncMaster:null,syncTolerance:null,syncToleranceDefault:null,systemLanguage:N,tabIndex:A,tableValues:null,target:null,targetX:A,targetY:A,textAnchor:null,textDecoration:null,textRendering:null,textLength:null,timelineBegin:null,title:null,transformBehavior:null,type:null,typeOf:N,to:null,transform:null,transformOrigin:null,u1:null,u2:null,underlinePosition:A,underlineThickness:A,unicode:null,unicodeBidi:null,unicodeRange:null,unitsPerEm:A,values:null,vAlphabetic:A,vMathematical:A,vectorEffect:null,vHanging:A,vIdeographic:A,version:null,vertAdvY:A,vertOriginX:A,vertOriginY:A,viewBox:null,viewTarget:null,visibility:null,width:null,widths:null,wordSpacing:null,writingMode:null,x:null,x1:null,x2:null,xChannelSelector:null,xHeight:A,y:null,y1:null,y2:null,yChannelSelector:null,z:null,zoomAndPan:null},space:`svg`,transform:ie}),ce=ne({properties:{xLinkActuate:null,xLinkArcRole:null,xLinkHref:null,xLinkRole:null,xLinkShow:null,xLinkTitle:null,xLinkType:null},space:`xlink`,transform(e,t){return`xlink:`+t.slice(5).toLowerCase()}}),le=ne({attributes:{xmlnsxlink:`xmlns:xlink`},properties:{xmlnsXLink:null,xmlns:null},space:`xmlns`,transform:ae}),ue=ne({properties:{xmlBase:null,xmlLang:null,xmlSpace:null},space:`xml`,transform(e,t){return`xml:`+t.slice(3).toLowerCase()}}),de={classId:`classID`,dataType:`datatype`,itemId:`itemID`,strokeDashArray:`strokeDasharray`,strokeDashOffset:`strokeDashoffset`,strokeLineCap:`strokeLinecap`,strokeLineJoin:`strokeLinejoin`,strokeMiterLimit:`strokeMiterlimit`,typeOf:`typeof`,xLinkActuate:`xlinkActuate`,xLinkArcRole:`xlinkArcrole`,xLinkHref:`xlinkHref`,xLinkRole:`xlinkRole`,xLinkShow:`xlinkShow`,xLinkTitle:`xlinkTitle`,xLinkType:`xlinkType`,xmlnsXLink:`xmlnsXlink`},fe=/[A-Z]/g,pe=/-[a-z]/g,me=/^data[-\w.:]+$/i;function he(e,t){let n=w(t),r=t,i=T;if(n in e.normal)return e.property[e.normal[n]];if(n.length>4&&n.slice(0,4)===`data`&&me.test(t)){if(t.charAt(4)===`-`){let e=t.slice(5).replace(pe,_e);r=`data`+e.charAt(0).toUpperCase()+e.slice(1)}else{let e=t.slice(4);if(!pe.test(e)){let n=e.replace(fe,ge);n.charAt(0)!==`-`&&(n=`-`+n),t=`data`+n}}i=I}return new i(r,t)}function ge(e){return`-`+e.toLowerCase()}function _e(e){return e.charAt(1).toUpperCase()}var ve=C([re,oe,ce,le,ue],`html`),ye=C([re,se,ce,le,ue],`svg`);function be(e){return e.join(` `).trim()}var xe=/\/\*(?:[^*]|\*(?!\/))*\*\//g,Se=/\n/g,Ce=/^\s*/,we=/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,Te=/^:\s*/,Ee=/^((?:'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|url\((?:'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|[^)]*)\)|[^};])+)/,De=/^[;\s]*/,Oe=`
`,ke=`/`,Ae=`*`,je=``,Me=`comment`,Ne=`declaration`;function Pe(e,t){if(typeof e!=`string`)throw TypeError(`First argument must be a string`);if(!e)return[];t||={};var n=1,r=1;function i(e){var t=e.match(Se);t&&(n+=t.length);var i=e.lastIndexOf(Oe);r=~i?e.length-i:r+e.length}function a(){var e={line:n,column:r};return function(t){return t.position=new o(e),l(),t}}function o(e){this.start=e,this.end={line:n,column:r},this.source=t.source}o.prototype.content=e;function s(i){var a=Error(t.source+`:`+n+`:`+r+`: `+i);if(a.reason=i,a.filename=t.source,a.line=n,a.column=r,a.source=e,!t.silent)throw a}function c(t){var n=t.exec(e);if(n){var r=n[0];return i(r),e=e.slice(r.length),n}}function l(){c(Ce)}function u(e){for(var t;t=d();)e.push(t);return e}function d(){var t=a();if(ke==e.charAt(0)&&Ae==e.charAt(1)){for(var n=2;je!=e.charAt(n)&&(Ae!=e.charAt(n)||ke!=e.charAt(n+1));)++n;if(n+=2,je===e.charAt(n-1))return s(`End of comment missing`);var o=e.slice(2,n-2);return r+=2,i(o),e=e.slice(n),r+=2,t({type:Me,comment:o})}}function f(){var e=a(),t=c(we);if(t){if(d(),!c(Te))return s(`property missing ':'`);var n=c(Ee),r=e({type:Ne,property:t[0].replace(xe,je).trim(),value:n?n[0].replace(xe,je).trim():je});return c(De),r}}function p(){var e=[];u(e);for(var t;t=f();)e.push(t),u(e);return e}return l(),p()}function Fe(e,t){let n=null;if(!e||typeof e!=`string`)return n;let r=Pe(e),i=typeof t==`function`;return r.forEach(e=>{if(e.type!==`declaration`)return;let{property:r,value:a}=e;i?t(r,a,e):a&&(n??={},n[r]=a)}),n}var Ie=Re(`end`),Le=Re(`start`);function Re(e){return t;function t(t){let n=t&&t.position&&t.position[e]||{};if(typeof n.line==`number`&&n.line>0&&typeof n.column==`number`&&n.column>0)return{line:n.line,column:n.column,offset:typeof n.offset==`number`&&n.offset>-1?n.offset:void 0}}}function ze(e){let t=Le(e),n=Ie(e);if(t&&n)return{start:t,end:n}}function Be(e){return!e||typeof e!=`object`?``:`position`in e||`type`in e?He(e.position):`start`in e||`end`in e?He(e):`line`in e||`column`in e?Ve(e):``}function Ve(e){return Ue(e&&e.line)+`:`+Ue(e&&e.column)}function He(e){return Ve(e&&e.start)+`-`+Ve(e&&e.end)}function Ue(e){return e&&typeof e==`number`?e:1}var We=class extends Error{constructor(e,t,n){super(),typeof t==`string`&&(n=t,t=void 0);let r=``,i={},a=!1;if(t&&(i=`line`in t&&`column`in t||`start`in t&&`end`in t?{place:t}:`type`in t?{ancestors:[t],place:t.position}:{...t}),typeof e==`string`?r=e:!i.cause&&e&&(a=!0,r=e.message,i.cause=e),!i.ruleId&&!i.source&&typeof n==`string`){let e=n.indexOf(`:`);e===-1?i.ruleId=n:(i.source=n.slice(0,e),i.ruleId=n.slice(e+1))}if(!i.place&&i.ancestors){let e=i.ancestors[i.ancestors.length-1];e&&(i.place=e.position)}let o=i.place&&`start`in i.place?i.place.start:i.place;this.ancestors=i.ancestors||void 0,this.cause=i.cause||void 0,this.column=o?o.column:void 0,this.fatal=void 0,this.file=``,this.message=r,this.line=o?o.line:void 0,this.name=Be(i.place)||`1:1`,this.place=i.place||void 0,this.reason=this.message,this.ruleId=i.ruleId||void 0,this.source=i.source||void 0,this.stack=a&&i.cause&&typeof i.cause.stack==`string`?i.cause.stack:``,this.actual=void 0,this.expected=void 0,this.note=void 0,this.url=void 0}};Object.defineProperties(We.prototype,{file:{configurable:!0,enumerable:!0,value:``,writable:!0},name:{configurable:!0,enumerable:!0,value:``,writable:!0},reason:{configurable:!0,enumerable:!0,value:``,writable:!0},message:{configurable:!0,enumerable:!0,value:``,writable:!0},stack:{configurable:!0,enumerable:!0,value:``,writable:!0},column:{configurable:!0,enumerable:!0,writable:!0},line:{configurable:!0,enumerable:!0,writable:!0},ancestors:{configurable:!0,enumerable:!0,writable:!0},cause:{configurable:!0,enumerable:!0,writable:!0},fatal:{configurable:!0,enumerable:!0,writable:!0},place:{configurable:!0,enumerable:!0,writable:!0},ruleId:{configurable:!0,enumerable:!0,writable:!0},source:{configurable:!0,enumerable:!0,writable:!0}});var Ge={}.hasOwnProperty,Ke=new Map,qe=/[A-Z]/g,Je=/-([a-z])/g,Ye=new Set([`table`,`tbody`,`thead`,`tfoot`,`tr`]),Xe=new Set([`td`,`th`]),Ze=`https://github.com/syntax-tree/hast-util-to-jsx-runtime`;function Qe(e,t){if(!t||t.Fragment===void 0)throw TypeError("Expected `Fragment` in options");let n=t.filePath||void 0,r;if(t.development){if(typeof t.jsxDEV!=`function`)throw TypeError("Expected `jsxDEV` in options when `development: true`");r=lt(n,t.jsxDEV)}else{if(typeof t.jsx!=`function`)throw TypeError("Expected `jsx` in production options");if(typeof t.jsxs!=`function`)throw TypeError("Expected `jsxs` in production options");r=ct(n,t.jsx,t.jsxs)}let i={Fragment:t.Fragment,ancestors:[],components:t.components||{},create:r,elementAttributeNameCase:t.elementAttributeNameCase||`react`,evaluater:t.createEvaluater?t.createEvaluater():void 0,filePath:n,ignoreInvalidStyle:t.ignoreInvalidStyle||!1,passKeys:t.passKeys!==!1,passNode:t.passNode||!1,schema:t.space===`svg`?ye:ve,stylePropertyNameCase:t.stylePropertyNameCase||`dom`,tableCellAlignToStyle:t.tableCellAlignToStyle!==!1},a=$e(i,e,void 0);return a&&typeof a!=`string`?a:i.create(e,i.Fragment,{children:a||void 0},void 0)}function $e(e,t,n){if(t.type===`element`)return et(e,t,n);if(t.type===`mdxFlowExpression`||t.type===`mdxTextExpression`)return tt(e,t);if(t.type===`mdxJsxFlowElement`||t.type===`mdxJsxTextElement`)return rt(e,t,n);if(t.type===`mdxjsEsm`)return nt(e,t);if(t.type===`root`)return it(e,t,n);if(t.type===`text`)return at(e,t)}function et(e,t,n){let r=e.schema,i=r;t.tagName.toLowerCase()===`svg`&&r.space===`html`&&(i=ye,e.schema=i),e.ancestors.push(t);let a=ht(e,t.tagName,!1),o=ut(e,t),s=ft(e,t);return Ye.has(t.tagName)&&(s=s.filter(function(e){return typeof e!=`string`||!b(e)})),ot(e,o,a,t),st(o,s),e.ancestors.pop(),e.schema=r,e.create(t,a,o,n)}function tt(e,t){if(t.data&&t.data.estree&&e.evaluater){let n=t.data.estree.body[0];return n.type,e.evaluater.evaluateExpression(n.expression)}gt(e,t.position)}function nt(e,t){if(t.data&&t.data.estree&&e.evaluater)return e.evaluater.evaluateProgram(t.data.estree);gt(e,t.position)}function rt(e,t,n){let r=e.schema,i=r;t.name===`svg`&&r.space===`html`&&(i=ye,e.schema=i),e.ancestors.push(t);let a=t.name===null?e.Fragment:ht(e,t.name,!0),o=dt(e,t),s=ft(e,t);return ot(e,o,a,t),st(o,s),e.ancestors.pop(),e.schema=r,e.create(t,a,o,n)}function it(e,t,n){let r={};return st(r,ft(e,t)),e.create(t,e.Fragment,r,n)}function at(e,t){return t.value}function ot(e,t,n,r){typeof n!=`string`&&n!==e.Fragment&&e.passNode&&(t.node=r)}function st(e,t){if(t.length>0){let n=t.length>1?t:t[0];n&&(e.children=n)}}function ct(e,t,n){return r;function r(e,r,i,a){let o=Array.isArray(i.children)?n:t;return a?o(r,i,a):o(r,i)}}function lt(e,t){return n;function n(n,r,i,a){let o=Array.isArray(i.children),s=Le(n);return t(r,i,a,o,{columnNumber:s?s.column-1:void 0,fileName:e,lineNumber:s?s.line:void 0},void 0)}}function ut(e,t){let n={},r,i;for(i in t.properties)if(i!==`children`&&Ge.call(t.properties,i)){let a=pt(e,i,t.properties[i]);if(a){let[i,o]=a;e.tableCellAlignToStyle&&i===`align`&&typeof o==`string`&&Xe.has(t.tagName)?r=o:n[i]=o}}if(r){let t=n.style||={};t[e.stylePropertyNameCase===`css`?`text-align`:`textAlign`]=r}return n}function dt(e,t){let n={};for(let r of t.attributes)if(r.type===`mdxJsxExpressionAttribute`){if(r.data&&r.data.estree&&e.evaluater){let t=r.data.estree.body[0];t.type;let i=t.expression;i.type;let a=i.properties[0];a.type,Object.assign(n,e.evaluater.evaluateExpression(a.argument))}else gt(e,t.position)}else{let{name:i}=r,a;if(r.value&&typeof r.value==`object`){if(r.value.data&&r.value.data.estree&&e.evaluater){let t=r.value.data.estree.body[0];t.type,a=e.evaluater.evaluateExpression(t.expression)}else gt(e,t.position)}else a=r.value===null||r.value;n[i]=a}return n}function ft(e,t){let n=[],r=-1,i=e.passKeys?new Map:Ke;for(;++r<t.children.length;){let a=t.children[r],o;if(e.passKeys){let e=a.type===`element`?a.tagName:a.type===`mdxJsxFlowElement`||a.type===`mdxJsxTextElement`?a.name:void 0;if(e){let t=i.get(e)||0;o=e+`-`+t,i.set(e,t+1)}}let s=$e(e,a,o);s!==void 0&&n.push(s)}return n}function pt(e,t,n){if(n==null||typeof n==`number`&&Number.isNaN(n))return;let r=he(e.schema,t);return Array.isArray(n)&&(n=r.commaSeparated?m(n):be(n)),r.property===`style`?[`style`,typeof n==`object`?e.stylePropertyNameCase===`dom`?n:_t(n):mt(e,String(n))]:[e.elementAttributeNameCase===`react`&&r.space?de[r.property]||r.property:r.attribute,n]}function mt(e,t){let n={};try{Fe(t,function(t,r){if(t&&r){let i=t;i.slice(0,2)!==`--`&&(i=i.toLowerCase(),e.stylePropertyNameCase===`dom`&&(i.slice(0,4)===`-ms-`&&(i=i.slice(1)),i=i.replace(Je,bt))),n[i]=r}})}catch(t){if(e.ignoreInvalidStyle)return{};let n=t,r=new We("Cannot parse `style` attribute",{ancestors:e.ancestors,cause:n,ruleId:`style`,source:`hast-util-to-jsx-runtime`});throw r.file=e.filePath||void 0,r.url=Ze+`#cannot-parse-style-attribute`,r}return n}function ht(e,t,n){let r;if(!n)r={type:`Literal`,value:t};else if(t.includes(`.`)){let e=t.split(`.`),n=-1,i;for(;++n<e.length;){let t=v(e[n])?{type:`Identifier`,name:e[n]}:{type:`Literal`,value:e[n]};i=i?{type:`MemberExpression`,object:i,property:t,computed:!!(n&&t.type===`Literal`),optional:!1}:t}r=i}else r=v(t)&&!/^[a-z]/.test(t)?{type:`Identifier`,name:t}:{type:`Literal`,value:t};if(r.type===`Literal`){let t=r.value;return Ge.call(e.components,t)?e.components[t]:t}if(e.evaluater)return e.evaluater.evaluateExpression(r);gt(e)}function gt(e,t){let n=new We("Cannot handle MDX estrees without `createEvaluater`",{ancestors:e.ancestors,place:t,ruleId:`mdx-estree`,source:`hast-util-to-jsx-runtime`});throw n.file=e.filePath||void 0,n.url=Ze+`#cannot-handle-mdx-estrees-without-createevaluater`,n}function _t(e){let t={},n;for(n in e)Ge.call(e,n)&&(t[vt(n)]=e[n]);return t}function vt(e){if(e.slice(0,2)===`--`)return e;let t=e.replace(qe,yt);return t.slice(0,3)===`ms-`&&(t=`-`+t),t}function yt(e){return`-`+e.toLowerCase()}function bt(e,t){return t.toUpperCase()}var xt={action:[`form`],cite:[`blockquote`,`del`,`ins`,`q`],data:[`object`],formAction:[`button`,`input`],href:[`a`,`area`,`base`,`link`],icon:[`menuitem`],itemId:null,manifest:[`html`],ping:[`a`,`area`],poster:[`video`],src:[`audio`,`embed`,`iframe`,`img`,`input`,`script`,`source`,`track`,`video`]},St={};function Ct(e,t){let n=t||St;return wt(e,typeof n.includeImageAlt!=`boolean`||n.includeImageAlt,typeof n.includeHtml!=`boolean`||n.includeHtml)}function wt(e,t,n){if(Et(e)){if(`value`in e)return e.type===`html`&&!n?``:e.value;if(t&&`alt`in e&&e.alt)return e.alt;if(`children`in e)return Tt(e.children,t,n)}return Array.isArray(e)?Tt(e,t,n):``}function Tt(e,t,n){let r=[],i=-1;for(;++i<e.length;)r[i]=wt(e[i],t,n);return r.join(``)}function Et(e){return!!(e&&typeof e==`object`)}var Dt=document.createElement(`i`);function Ot(e){let t=`&`+e+`;`;Dt.innerHTML=t;let n=Dt.textContent;return n.charCodeAt(n.length-1)===59&&e!==`semi`?!1:n!==t&&n}function L(e,t,n,r){let i=e.length,a=0,o;if(t=t<0?-t>i?0:i+t:t>i?i:t,n=n>0?n:0,r.length<1e4)o=Array.from(r),o.unshift(t,n),e.splice(...o);else for(n&&e.splice(t,n);a<r.length;)o=r.slice(a,a+1e4),o.unshift(t,0),e.splice(...o),a+=1e4,t+=1e4}function R(e,t){return e.length>0?(L(e,e.length,0,t),e):t}var kt={}.hasOwnProperty;function At(e){let t={},n=-1;for(;++n<e.length;)jt(t,e[n]);return t}function jt(e,t){let n;for(n in t){let r=(kt.call(e,n)?e[n]:void 0)||(e[n]={}),i=t[n],a;if(i)for(a in i){kt.call(r,a)||(r[a]=[]);let e=i[a];Mt(r[a],Array.isArray(e)?e:e?[e]:[])}}}function Mt(e,t){let n=-1,r=[];for(;++n<t.length;)(t[n].add===`after`?e:r).push(t[n]);L(e,0,0,r)}function Nt(e,t){let n=Number.parseInt(e,t);return n<9||n===11||n>13&&n<32||n>126&&n<160||n>55295&&n<57344||n>64975&&n<65008||(n&65535)==65535||(n&65535)==65534||n>1114111?`�`:String.fromCodePoint(n)}function z(e){return e.replace(/[\t\n\r ]+/g,` `).replace(/^ | $/g,``).toLowerCase().toUpperCase()}var B=Vt(/[A-Za-z]/),V=Vt(/[\dA-Za-z]/),Pt=Vt(/[#-'*+\--9=?A-Z^-~]/);function Ft(e){return e!==null&&(e<32||e===127)}var It=Vt(/\d/),Lt=Vt(/[\dA-Fa-f]/),Rt=Vt(/[!-/:-@[-`{-~]/);function H(e){return e!==null&&e<-2}function U(e){return e!==null&&(e<0||e===32)}function W(e){return e===-2||e===-1||e===32}var zt=Vt(/\p{P}|\p{S}/u),Bt=Vt(/\s/);function Vt(e){return t;function t(t){return t!==null&&t>-1&&e.test(String.fromCharCode(t))}}function Ht(e){let t=[],n=-1,r=0,i=0;for(;++n<e.length;){let a=e.charCodeAt(n),o=``;if(a===37&&V(e.charCodeAt(n+1))&&V(e.charCodeAt(n+2)))i=2;else if(a<128)/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(a))||(o=String.fromCharCode(a));else if(a>55295&&a<57344){let t=e.charCodeAt(n+1);a<56320&&t>56319&&t<57344?(o=String.fromCharCode(a,t),i=1):o=`�`}else o=String.fromCharCode(a);o&&=(t.push(e.slice(r,n),encodeURIComponent(o)),r=n+i+1,``),i&&=(n+=i,0)}return t.join(``)+e.slice(r)}function G(e,t,n,r){let i=r?r-1:1/0,a=0;return o;function o(r){return W(r)?(e.enter(n),s(r)):t(r)}function s(r){return W(r)&&a++<i?(e.consume(r),s):(e.exit(n),t(r))}}function Ut(e,t,n,r,i,a){let o=0;return s;function s(t){return a>0&&W(t)?(e.enter(r),c(t)):l(t)}function c(t){return W(t)&&o<a?(e.consume(t),o++,c):(e.exit(r),l(t))}function l(e){return o>=i?t(e):n(e)}}var Wt={tokenize:Gt};function Gt(e){let t=e.attempt(this.parser.constructs.contentInitial,r,i),n;return t;function r(n){if(n===null)e.consume(n);else return e.enter(`lineEnding`),e.consume(n),e.exit(`lineEnding`),G(e,t,`linePrefix`)}function i(t){return e.enter(`paragraph`),a(t)}function a(t){let r=e.enter(`chunkText`,{contentType:`text`,previous:n});return n&&(n.next=r),n=r,o(t)}function o(t){if(t===null)e.exit(`chunkText`),e.exit(`paragraph`),e.consume(t);else return H(t)?(e.consume(t),e.exit(`chunkText`),a):(e.consume(t),o)}}var Kt=class{constructor(){this.index=new Map,this.map=[]}add(e,t,n){qt(this,e,t,n,!1)}addBefore(e,t,n){qt(this,e,t,n,!0)}consume(e){if(this.map.sort(function(e,t){return e[0]-t[0]}),this.map.length===0)return;let t=this.map.length,n=[];for(;t>0;)--t,n.push(e.slice(this.map[t][0]+this.map[t][1]),this.map[t][2]),e.length=this.map[t][0];n.push(e.slice()),e.length=0;let r=n.pop();for(;r;){for(let t of r)e.push(t);r=n.pop()}this.map.length=0,this.index.clear()}};function qt(e,t,n,r,i){if(n===0&&r.length===0)return;let a=e.index.get(t);if(a){a[1]+=n,i?(r.push(...a[2]),a[2]=r):a[2].push(...r);return}let o=[t,n,r];e.map.push(o),e.index.set(t,o)}var Jt={tokenize:Xt},Yt={tokenize:Zt};function Xt(e){let t=this,n=[],r=0,i,a,o;return s;function s(i){if(r<n.length){let a=n[r];return t.containerState=a[1],e.attempt(a[0].continuation,c,l)(i)}return l(i)}function c(e){if(r++,t.containerState._closeFlow){t.containerState._closeFlow=void 0,i&&v();let n=t.events.length,a=n,o;for(;a--;)if(t.events[a][0]===`exit`&&t.events[a][1].type===`chunkFlow`){o=t.events[a][1].end;break}_(r);let s=n;for(;s<t.events.length;)t.events[s][1].end={...o},s++;let c=new Kt;return c.add(a+1,0,t.events.slice(n)),c.add(n,s-n,[]),c.consume(t.events),l(e)}return s(e)}function l(a){if(r===n.length){if(!i)return f(a);if(i.currentConstruct&&i.currentConstruct.concrete)return m(a);t.interrupt=!(!i.currentConstruct||i._gfmTableDynamicInterruptHack)}return t.containerState={},e.check(Yt,u,d)(a)}function u(e){return i&&v(),_(r),f(e)}function d(e){return t.parser.lazy[t.now().line]=r!==n.length,o=t.now().offset,m(e)}function f(n){return t.containerState={},e.attempt(Yt,p,m)(n)}function p(e){return r++,n.push([t.currentConstruct,t.containerState]),f(e)}function m(n){if(n===null)i&&v(),_(0),e.consume(n);else return i||=t.parser.flow(t.now()),e.enter(`chunkFlow`,{_tokenizer:i,contentType:`flow`,previous:a}),h(n)}function h(n){if(n===null)g(e.exit(`chunkFlow`),!0),_(0),e.consume(n);else return H(n)?(e.consume(n),g(e.exit(`chunkFlow`)),r=0,t.interrupt=void 0,s):(e.consume(n),h)}function g(e,n){let s=t.sliceStream(e);if(n&&s.push(null),e.previous=a,a&&(a.next=e),a=e,i.defineSkip(e.start),i.write(s),t.parser.lazy[e.start.line]){let e=i.events.length;for(;e--;)if(i.events[e][1].start.offset<o&&(!i.events[e][1].end||i.events[e][1].end.offset>o))return;let n=t.events.length,a=n,s,c;for(;a--;)if(t.events[a][0]===`exit`&&t.events[a][1].type===`chunkFlow`){if(s){c=t.events[a][1].end;break}s=!0}for(_(r),e=n;e<t.events.length;)t.events[e][1].end={...c},e++;let l=new Kt;l.add(a+1,0,t.events.slice(n)),l.add(n,e-n,[]),l.consume(t.events)}}function _(r){let i=n.length;for(;i-->r;){let r=n[i];t.containerState=r[1],r[0].exit.call(t,e)}n.length=r}function v(){i.write([null]),a=void 0,i=void 0,t.containerState._closeFlow=void 0}}function Zt(e,t,n){return G(e,e.attempt(this.parser.constructs.document,t,n),`linePrefix`,this.parser.constructs.disable.null.includes(`codeIndented`)?void 0:4)}function K(e){if(e===null||U(e)||Bt(e))return 1;if(zt(e))return 2}function Qt(e,t,n){let r=[],i=-1;for(;++i<e.length;){let a=e[i].resolveAll;a&&!r.includes(a)&&(t=a(t,n),r.push(a))}return t}var $t={name:`attention`,resolveAll:en,tokenize:tn};function en(e,t){let n=-1,r;for(;++n<e.length;)if(e[n][0]===`enter`&&e[n][1].type===`attentionSequence`&&e[n][1]._close){let i=n;for(;i--;)if(e[i][0]===`exit`&&e[i][1].type===`attentionSequence`&&e[i][1]._open&&t.sliceSerialize(e[i][1]).charCodeAt(0)===t.sliceSerialize(e[n][1]).charCodeAt(0)){if((e[i][1]._close||e[n][1]._open)&&(e[n][1].end.offset-e[n][1].start.offset)%3&&!((e[i][1].end.offset-e[i][1].start.offset+e[n][1].end.offset-e[n][1].start.offset)%3))continue;let a=e[i][1].end.offset-e[i][1].start.offset>1&&e[n][1].end.offset-e[n][1].start.offset>1?2:1,o={...e[i][1].end},s={...e[n][1].start};nn(o,-a),nn(s,a);let c={type:a>1?`strongSequence`:`emphasisSequence`,start:o,end:{...e[i][1].end}},l={type:a>1?`strongSequence`:`emphasisSequence`,start:{...e[n][1].start},end:s},u={type:a>1?`strongText`:`emphasisText`,start:{...e[i][1].end},end:{...e[n][1].start}},d={type:a>1?`strong`:`emphasis`,start:{...c.start},end:{...l.end}};e[i][1].end={...c.start},e[n][1].start={...l.end},r=[],e[i][1].end.offset-e[i][1].start.offset&&(r=R(r,[[`enter`,e[i][1],t],[`exit`,e[i][1],t]])),r=R(r,[[`enter`,d,t],[`enter`,c,t],[`exit`,c,t],[`enter`,u,t]]),r=R(r,Qt(t.parser.constructs.insideSpan.null,e.slice(i+1,n),t)),r=R(r,[[`exit`,u,t],[`enter`,l,t],[`exit`,l,t],[`exit`,d,t]]);let f=0;e[n][1].end.offset-e[n][1].start.offset&&(f=2,r=R(r,[[`enter`,e[n][1],t],[`exit`,e[n][1],t]])),L(e,i-1,n-i+3,r),n=i+r.length-f-2;break}}for(n=-1;++n<e.length;)e[n][1].type===`attentionSequence`&&(e[n][1].type=`data`);return e}function tn(e,t){let n=this.parser.constructs.attentionMarkers.null,r=this.previous,i=K(r),a;return o;function o(t){return a=t,e.enter(`attentionSequence`),s(t)}function s(o){if(o===a)return e.consume(o),s;let c=e.exit(`attentionSequence`),l=K(o),u=!l||l===2&&i||n.includes(o)&&o!==42&&o!==95,d=!i||i===2&&l||n.includes(r)&&r!==42&&r!==95;return c._open=!!(a===42?u:u&&(i||!d)),c._close=!!(a===42?d:d&&(l||!u)),t(o)}}function nn(e,t){e.column+=t,e.offset+=t,e._bufferIndex+=t}var rn={name:`autolink`,tokenize:an};function an(e,t,n){let r=0;return i;function i(t){return e.enter(`autolink`),e.enter(`autolinkMarker`),e.consume(t),e.exit(`autolinkMarker`),e.enter(`autolinkProtocol`),a}function a(t){return B(t)?(e.consume(t),o):t===64?n(t):l(t)}function o(e){return e===43||e===45||e===46||V(e)?(r=1,s(e)):l(e)}function s(t){return t===58?(e.consume(t),r=0,c):(t===43||t===45||t===46||V(t))&&r++<32?(e.consume(t),s):(r=0,l(t))}function c(r){return r===62?(e.exit(`autolinkProtocol`),e.enter(`autolinkMarker`),e.consume(r),e.exit(`autolinkMarker`),e.exit(`autolink`),t):r===null||r===32||r===60||Ft(r)?n(r):(e.consume(r),c)}function l(t){return t===64?(e.consume(t),u):Pt(t)?(e.consume(t),l):n(t)}function u(e){return V(e)?d(e):n(e)}function d(n){return n===46?(e.consume(n),r=0,u):n===62?(e.exit(`autolinkProtocol`).type=`autolinkEmail`,e.enter(`autolinkMarker`),e.consume(n),e.exit(`autolinkMarker`),e.exit(`autolink`),t):f(n)}function f(t){if((t===45||V(t))&&r++<63){let n=t===45?f:d;return e.consume(t),n}return n(t)}}var on={partial:!0,tokenize:sn};function sn(e,t,n){return r;function r(t){return W(t)?G(e,i,`linePrefix`)(t):i(t)}function i(e){return e===null||H(e)?t(e):n(e)}}var cn={continuation:{tokenize:un},exit:dn,name:`blockQuote`,tokenize:ln};function ln(e,t,n){let r=this;return i;function i(t){if(t===62){let n=r.containerState;return n.open||=(e.enter(`blockQuote`,{_container:!0}),!0),e.enter(`blockQuotePrefix`),e.enter(`blockQuoteMarker`),e.consume(t),e.exit(`blockQuoteMarker`),a}return n(t)}function a(n){return W(n)?(e.enter(`blockQuotePrefixWhitespace`),e.consume(n),e.exit(`blockQuotePrefixWhitespace`),e.exit(`blockQuotePrefix`),t):(e.exit(`blockQuotePrefix`),t(n))}}function un(e,t,n){let r=this;return i;function i(t){return W(t)?G(e,a,`linePrefix`,r.parser.constructs.disable.null.includes(`codeIndented`)?void 0:4)(t):a(t)}function a(r){return e.attempt(cn,t,n)(r)}}function dn(e){e.exit(`blockQuote`)}var fn={name:`characterEscape`,tokenize:pn};function pn(e,t,n){return r;function r(t){return e.enter(`characterEscape`),e.enter(`escapeMarker`),e.consume(t),e.exit(`escapeMarker`),i}function i(r){return Rt(r)?(e.enter(`characterEscapeValue`),e.consume(r),e.exit(`characterEscapeValue`),e.exit(`characterEscape`),t):n(r)}}var mn={name:`characterReference`,tokenize:hn};function hn(e,t,n){let r=this,i=0,a,o;return s;function s(t){return e.enter(`characterReference`),e.enter(`characterReferenceMarker`),e.consume(t),e.exit(`characterReferenceMarker`),c}function c(t){return t===35?(e.enter(`characterReferenceMarkerNumeric`),e.consume(t),e.exit(`characterReferenceMarkerNumeric`),l):(e.enter(`characterReferenceValue`),a=31,o=V,u(t))}function l(t){return t===88||t===120?(e.enter(`characterReferenceMarkerHexadecimal`),e.consume(t),e.exit(`characterReferenceMarkerHexadecimal`),e.enter(`characterReferenceValue`),a=6,o=Lt,u):(e.enter(`characterReferenceValue`),a=7,o=It,u(t))}function u(s){if(s===59&&i){let i=e.exit(`characterReferenceValue`);return o===V&&!Ot(r.sliceSerialize(i))?n(s):(e.enter(`characterReferenceMarker`),e.consume(s),e.exit(`characterReferenceMarker`),e.exit(`characterReference`),t)}return o(s)&&i++<a?(e.consume(s),u):n(s)}}var gn={partial:!0,tokenize:_n};function _n(e,t,n){let r=this;return i;function i(t){return t===null?n(t):(e.enter(`lineEnding`),e.consume(t),e.exit(`lineEnding`),a)}function a(e){return r.parser.lazy[r.now().line]?n(e):t(e)}}var vn={concrete:!0,name:`codeFenced`,tokenize:yn};function yn(e,t,n){let r=this,i={partial:!0,tokenize:x},a=0,o=0,s;return c;function c(e){return l(e)}function l(t){let n=r.events[r.events.length-1];return a=n&&n[1].type===`linePrefix`?n[2].sliceSerialize(n[1],!0).length:0,s=t,e.enter(`codeFenced`),e.enter(`codeFencedFence`),e.enter(`codeFencedFenceSequence`),u(t)}function u(t){return t===s?(o++,e.consume(t),u):o<3?n(t):(e.exit(`codeFencedFenceSequence`),W(t)?G(e,d,`whitespace`)(t):d(t))}function d(n){return n===null||H(n)?(e.exit(`codeFencedFence`),r.interrupt?t(n):e.check(gn,h,b)(n)):(e.enter(`codeFencedFenceInfo`),e.enter(`chunkString`,{contentType:`string`}),f(n))}function f(t){return t===null||H(t)?(e.exit(`chunkString`),e.exit(`codeFencedFenceInfo`),d(t)):W(t)?(e.exit(`chunkString`),e.exit(`codeFencedFenceInfo`),G(e,p,`whitespace`)(t)):t===96&&t===s?n(t):(e.consume(t),f)}function p(t){return t===null||H(t)?d(t):(e.enter(`codeFencedFenceMeta`),e.enter(`chunkString`,{contentType:`string`}),m(t))}function m(t){return t===null||H(t)?(e.exit(`chunkString`),e.exit(`codeFencedFenceMeta`),d(t)):t===96&&t===s?n(t):(e.consume(t),m)}function h(t){return e.attempt(i,b,g)(t)}function g(t){return e.enter(`lineEnding`),e.consume(t),e.exit(`lineEnding`),_}function _(t){return a>0&&W(t)?G(e,v,`linePrefix`,a+1)(t):v(t)}function v(t){return t===null||H(t)?e.check(gn,h,b)(t):(e.enter(`codeFlowValue`),y(t))}function y(t){return t===null||H(t)?(e.exit(`codeFlowValue`),v(t)):(e.consume(t),y)}function b(n){return e.exit(`codeFenced`),t(n)}function x(e,t,n){let i=0;return a;function a(t){return e.enter(`lineEnding`),e.consume(t),e.exit(`lineEnding`),c}function c(t){return e.enter(`codeFencedFence`),W(t)?G(e,l,`linePrefix`,r.parser.constructs.disable.null.includes(`codeIndented`)?void 0:4)(t):l(t)}function l(t){return t===s?(e.enter(`codeFencedFenceSequence`),u(t)):n(t)}function u(t){return t===s?(i++,e.consume(t),u):i>=o?(e.exit(`codeFencedFenceSequence`),W(t)?G(e,d,`whitespace`)(t):d(t)):n(t)}function d(r){return r===null||H(r)?(e.exit(`codeFencedFence`),t(r)):n(r)}}}var bn={name:`codeIndented`,tokenize:Sn},xn={partial:!0,tokenize:Cn};function Sn(e,t,n){return r;function r(t){return e.enter(`codeIndented`),Ut(e,i,n,`linePrefix`,4,4)(t)}function i(t){return t===null?o(t):H(t)?e.attempt(xn,i,o)(t):(e.enter(`codeFlowValue`),a(t))}function a(t){return t===null||H(t)?(e.exit(`codeFlowValue`),i(t)):(e.consume(t),a)}function o(n){return e.exit(`codeIndented`),t(n)}}function Cn(e,t,n){let r=this;return i;function i(o){return r.parser.lazy[r.now().line]?n(o):H(o)?(e.enter(`lineEnding`),e.consume(o),e.exit(`lineEnding`),i):Ut(e,t,a,`linePrefix`,4,4)(o)}function a(e){return H(e)?i(e):n(e)}}var wn={name:`codeText`,previous:En,resolve:Tn,tokenize:Dn};function Tn(e){let t=e.length-4,n=3,r,i;if((e[n][1].type===`lineEnding`||e[n][1].type===`space`)&&(e[t][1].type===`lineEnding`||e[t][1].type===`space`)){for(r=n;++r<t;)if(e[r][1].type===`codeTextData`){e[n][1].type=`codeTextPadding`,e[t][1].type=`codeTextPadding`,n+=2,t-=2;break}}for(r=n-1,t++;++r<=t;)i===void 0?r!==t&&e[r][1].type!==`lineEnding`&&(i=r):(r===t||e[r][1].type===`lineEnding`)&&(e[i][1].type=`codeTextData`,r!==i+2&&(e[i][1].end=e[r-1][1].end,e.splice(i+2,r-i-2),t-=r-i-2,r=i+2),i=void 0);return e}function En(e){return e!==96||this.events[this.events.length-1][1].type===`characterEscape`}function Dn(e,t,n){let r=0,i,a;return o;function o(t){return e.enter(`codeText`),e.enter(`codeTextSequence`),s(t)}function s(t){return t===96?(e.consume(t),r++,s):(e.exit(`codeTextSequence`),c(t))}function c(t){return t===null?n(t):t===32?(e.enter(`space`),e.consume(t),e.exit(`space`),c):t===96?(a=e.enter(`codeTextSequence`),i=0,u(t)):H(t)?(e.enter(`lineEnding`),e.consume(t),e.exit(`lineEnding`),c):(e.enter(`codeTextData`),l(t))}function l(t){return t===null||t===32||t===96||H(t)?(e.exit(`codeTextData`),c(t)):(e.consume(t),l)}function u(n){return n===96?(e.consume(n),i++,u):i===r?(e.exit(`codeTextSequence`),e.exit(`codeText`),t(n)):(a.type=`codeTextData`,l(n))}}var On=class{constructor(e){this.left=e?[...e]:[],this.right=[]}get(e){if(e<0||e>=this.left.length+this.right.length)throw RangeError("Cannot access index `"+e+"` in a splice buffer of size `"+(this.left.length+this.right.length)+"`");return e<this.left.length?this.left[e]:this.right[this.right.length-e+this.left.length-1]}get length(){return this.left.length+this.right.length}shift(){return this.setCursor(0),this.right.pop()}slice(e,t){let n=t??1/0;return n<this.left.length?this.left.slice(e,n):e>this.left.length?this.right.slice(this.right.length-n+this.left.length,this.right.length-e+this.left.length).reverse():this.left.slice(e).concat(this.right.slice(this.right.length-n+this.left.length).reverse())}splice(e,t,n){let r=t||0;this.setCursor(Math.trunc(e));let i=this.right.splice(this.right.length-r,1/0);return n&&kn(this.left,n),i.reverse()}pop(){return this.setCursor(1/0),this.left.pop()}push(e){this.setCursor(1/0),this.left.push(e)}pushMany(e){this.setCursor(1/0),kn(this.left,e)}unshift(e){this.setCursor(0),this.right.push(e)}unshiftMany(e){this.setCursor(0),kn(this.right,e.reverse())}setCursor(e){if(!(e===this.left.length||e>this.left.length&&this.right.length===0||e<0&&this.left.length===0)){if(e<this.left.length){let t=this.left.splice(e,1/0);kn(this.right,t.reverse())}else{let t=this.right.splice(this.left.length+this.right.length-e,1/0);kn(this.left,t.reverse())}}}};function kn(e,t){let n=0;if(t.length<1e4)e.push(...t);else for(;n<t.length;)e.push(...t.slice(n,n+1e4)),n+=1e4}function An(e){let t={},n=-1,r,i,a,o,s,c,l,u=new On(e);for(;++n<u.length;){for(;n in t;)n=t[n];if(r=u.get(n),n&&r[1].type===`chunkFlow`&&u.get(n-1)[1].type===`listItemPrefix`&&(c=r[1]._tokenizer.events,a=0,a<c.length&&c[a][1].type===`lineEndingBlank`&&(a+=2),a<c.length&&c[a][1].type===`content`))for(;++a<c.length&&c[a][1].type!==`content`;)c[a][1].type===`chunkText`&&(c[a][1]._isInFirstContentOfListItem=!0,a++);if(r[0]===`enter`)r[1].contentType&&(Object.assign(t,jn(u,n)),n=t[n],l=!0);else if(r[1]._container){for(a=n,i=void 0;a--;)if(o=u.get(a),o[1].type===`lineEnding`||o[1].type===`lineEndingBlank`)o[0]===`enter`&&(i&&(u.get(i)[1].type=`lineEndingBlank`),o[1].type=`lineEnding`,i=a);else if(o[1].type!==`linePrefix`&&o[1].type!==`listItemIndent`)break;i&&(r[1].end={...u.get(i)[1].start},s=u.slice(i,n),s.unshift(r),u.splice(i,n-i+1,s))}}return L(e,0,1/0,u.slice(0)),!l}function jn(e,t){let n=e.get(t)[1],r=e.get(t)[2],i=t-1,a=[],o=n._tokenizer;o||(o=r.parser[n.contentType](n.start),n._contentTypeTextTrailing&&(o._contentTypeTextTrailing=!0));let s=o.events,c=[],l={},u,d,f=-1,p=n,m=0,h=0,g=[h];for(;p;){for(;e.get(++i)[1]!==p;);a.push(i),p._tokenizer||(u=r.sliceStream(p),p.next||u.push(null),d&&o.defineSkip(p.start),p._isInFirstContentOfListItem&&(o._gfmTasklistFirstContentOfListItem=!0),o.write(u),p._isInFirstContentOfListItem&&(o._gfmTasklistFirstContentOfListItem=void 0)),d=p,p=p.next}for(p=n;++f<s.length;)s[f][0]===`exit`&&s[f-1][0]===`enter`&&s[f][1].type===s[f-1][1].type&&s[f][1].start.line!==s[f][1].end.line&&(h=f+1,g.push(h),p._tokenizer=void 0,p.previous=void 0,p=p.next);for(o.events=[],p?(p._tokenizer=void 0,p.previous=void 0):g.pop(),f=g.length;f--;){let t=s.slice(g[f],g[f+1]),n=a.pop();c.push([n,n+t.length-1]),e.splice(n,2,t)}for(c.reverse(),f=-1;++f<c.length;)l[m+c[f][0]]=m+c[f][1],m+=c[f][1]-c[f][0]-1;return l}var Mn={resolve:Pn,tokenize:Fn},Nn={partial:!0,tokenize:In};function Pn(e){return An(e),e}function Fn(e,t){let n;return r;function r(t){return e.enter(`content`),n=e.enter(`chunkContent`,{contentType:`content`}),i(t)}function i(t){return t===null?a(t):H(t)?e.check(Nn,o,a)(t):(e.consume(t),i)}function a(n){return e.exit(`chunkContent`),e.exit(`content`),t(n)}function o(t){return e.consume(t),e.exit(`chunkContent`),n.next=e.enter(`chunkContent`,{contentType:`content`,previous:n}),n=n.next,i}}function In(e,t,n){let r=this;return i;function i(t){return e.exit(`chunkContent`),e.enter(`lineEnding`),e.consume(t),e.exit(`lineEnding`),G(e,a,`linePrefix`)}function a(i){if(i===null||H(i))return n(i);let a=r.events[r.events.length-1];return!r.parser.constructs.disable.null.includes(`codeIndented`)&&a&&a[1].type===`linePrefix`&&a[2].sliceSerialize(a[1],!0).length>=4?t(i):e.interrupt(r.parser.constructs.flow,n,t)(i)}}function Ln(e,t,n,r,i,a,o,s,c){let l=c||1/0,u=0;return d;function d(t){return t===60?(e.enter(r),e.enter(i),e.enter(a),e.consume(t),e.exit(a),f):t===null||t===32||t===41||Ft(t)?n(t):(e.enter(r),e.enter(o),e.enter(s),e.enter(`chunkString`,{contentType:`string`}),h(t))}function f(n){return n===62?(e.enter(a),e.consume(n),e.exit(a),e.exit(i),e.exit(r),t):(e.enter(s),e.enter(`chunkString`,{contentType:`string`}),p(n))}function p(t){return t===62?(e.exit(`chunkString`),e.exit(s),f(t)):t===null||t===60||H(t)?n(t):(e.consume(t),t===92?m:p)}function m(t){return t===60||t===62||t===92?(e.consume(t),p):p(t)}function h(i){return!u&&(i===null||i===41||U(i))?(e.exit(`chunkString`),e.exit(s),e.exit(o),e.exit(r),t(i)):u<l&&i===40?(e.consume(i),u++,h):i===41?(e.consume(i),u--,h):i===null||i===32||i===40||Ft(i)?n(i):(e.consume(i),i===92?g:h)}function g(t){return t===40||t===41||t===92?(e.consume(t),h):h(t)}}function Rn(e,t,n,r,i,a){let o=this,s=0,c;return l;function l(t){return e.enter(r),e.enter(i),e.consume(t),e.exit(i),e.enter(a),u}function u(l){return s>999||l===null||l===91||l===93&&!c||l===94&&!s&&`_hiddenFootnoteSupport`in o.parser.constructs?n(l):l===93?(e.exit(a),e.enter(i),e.consume(l),e.exit(i),e.exit(r),t):H(l)?(e.enter(`lineEnding`),e.consume(l),e.exit(`lineEnding`),u):(e.enter(`chunkString`,{contentType:`string`}),d(l))}function d(t){return t===null||t===91||t===93||H(t)||s++>999?(e.exit(`chunkString`),u(t)):(e.consume(t),c||=!W(t),t===92?f:d)}function f(t){return t===91||t===92||t===93?(e.consume(t),s++,d):d(t)}}function zn(e,t,n,r,i,a){let o;return s;function s(t){return t===34||t===39||t===40?(e.enter(r),e.enter(i),e.consume(t),e.exit(i),o=t===40?41:t,c):n(t)}function c(n){return n===o?(e.enter(i),e.consume(n),e.exit(i),e.exit(r),t):(e.enter(a),l(n))}function l(t){return t===o?(e.exit(a),c(o)):t===null?n(t):H(t)?(e.enter(`lineEnding`),e.consume(t),e.exit(`lineEnding`),G(e,l,`linePrefix`)):(e.enter(`chunkString`,{contentType:`string`}),u(t))}function u(t){return t===o||t===null||H(t)?(e.exit(`chunkString`),l(t)):(e.consume(t),t===92?d:u)}function d(t){return t===o||t===92?(e.consume(t),u):u(t)}}function Bn(e,t){let n;return r;function r(i){return H(i)?(e.enter(`lineEnding`),e.consume(i),e.exit(`lineEnding`),n=!0,r):W(i)?G(e,r,n?`linePrefix`:`lineSuffix`)(i):t(i)}}var Vn={name:`definition`,tokenize:Un},Hn={partial:!0,tokenize:Wn};function Un(e,t,n){let r=this,i;return a;function a(t){return e.enter(`definition`),o(t)}function o(t){return Rn.call(r,e,s,n,`definitionLabel`,`definitionLabelMarker`,`definitionLabelString`)(t)}function s(t){return i=z(r.sliceSerialize(r.events[r.events.length-1][1]).slice(1,-1)),t===58?(e.enter(`definitionMarker`),e.consume(t),e.exit(`definitionMarker`),c):n(t)}function c(t){return U(t)?Bn(e,l)(t):l(t)}function l(t){return Ln(e,u,n,`definitionDestination`,`definitionDestinationLiteral`,`definitionDestinationLiteralMarker`,`definitionDestinationRaw`,`definitionDestinationString`)(t)}function u(t){return e.attempt(Hn,d,d)(t)}function d(t){return W(t)?G(e,f,`whitespace`)(t):f(t)}function f(a){return a===null||H(a)?(e.exit(`definition`),r.parser.defined.push(i),t(a)):n(a)}}function Wn(e,t,n){return r;function r(t){return U(t)?Bn(e,i)(t):n(t)}function i(t){return zn(e,a,n,`definitionTitle`,`definitionTitleMarker`,`definitionTitleString`)(t)}function a(t){return W(t)?G(e,o,`whitespace`)(t):o(t)}function o(e){return e===null||H(e)?t(e):n(e)}}var Gn={name:`hardBreakEscape`,tokenize:Kn};function Kn(e,t,n){return r;function r(t){return e.enter(`hardBreakEscape`),e.consume(t),i}function i(r){return H(r)?(e.exit(`hardBreakEscape`),t(r)):n(r)}}var qn={name:`headingAtx`,resolve:Jn,tokenize:Yn};function Jn(e,t){let n=e.length-2,r=3;if(e[r][1].type===`whitespace`&&(r+=2),n-2>r&&e[n][1].type===`whitespace`&&(n-=2),e[n][1].type===`atxHeadingSequence`&&(r===n-1||n-4>r&&e[n-2][1].type===`whitespace`)&&(n-=r+1===n?2:4),n>r){let i={type:`atxHeadingText`,start:e[r][1].start,end:e[n][1].end},a={type:`chunkText`,start:e[r][1].start,end:e[n][1].end,contentType:`text`};L(e,r,n-r+1,[[`enter`,i,t],[`enter`,a,t],[`exit`,a,t],[`exit`,i,t]])}return e}function Yn(e,t,n){let r=0;return i;function i(t){return e.enter(`atxHeading`),a(t)}function a(t){return e.enter(`atxHeadingSequence`),o(t)}function o(t){return t===35&&r++<6?(e.consume(t),o):t===null||U(t)?(e.exit(`atxHeadingSequence`),s(t)):n(t)}function s(n){return n===35?(e.enter(`atxHeadingSequence`),c(n)):n===null||H(n)?(e.exit(`atxHeading`),t(n)):W(n)?G(e,s,`whitespace`)(n):(e.enter(`atxHeadingText`),l(n))}function c(t){return t===35?(e.consume(t),c):(e.exit(`atxHeadingSequence`),s(t))}function l(t){return t===null||t===35||U(t)?(e.exit(`atxHeadingText`),s(t)):(e.consume(t),l)}}var Xn=`address.article.aside.base.basefont.blockquote.body.caption.center.col.colgroup.dd.details.dialog.dir.div.dl.dt.fieldset.figcaption.figure.footer.form.frame.frameset.h1.h2.h3.h4.h5.h6.head.header.hr.html.iframe.legend.li.link.main.menu.menuitem.nav.noframes.ol.optgroup.option.p.param.search.section.summary.table.tbody.td.tfoot.th.thead.title.tr.track.ul`.split(`.`),Zn=[`pre`,`script`,`style`,`textarea`],Qn={concrete:!0,name:`htmlFlow`,resolveTo:er,tokenize:tr},$n={partial:!0,tokenize:nr};function er(e){let t=e.length;for(;t--&&(e[t][0]!==`enter`||e[t][1].type!==`htmlFlow`););return t>1&&e[t-2][1].type===`linePrefix`&&(e[t][1].start=e[t-2][1].start,e[t+1][1].start=e[t-2][1].start,e.splice(t-2,2)),e}function tr(e,t,n){let r=this,i,a,o,s,c;return l;function l(e){return u(e)}function u(t){return e.enter(`htmlFlow`),e.enter(`htmlFlowData`),e.consume(t),d}function d(s){return s===33?(e.consume(s),f):s===47?(e.consume(s),a=!0,h):s===63?(e.consume(s),i=3,r.interrupt?t:F):B(s)?(e.consume(s),o=String.fromCharCode(s),g):n(s)}function f(a){return a===45?(e.consume(a),i=2,p):a===91?(e.consume(a),i=5,s=0,m):B(a)?(e.consume(a),i=4,r.interrupt?t:F):n(a)}function p(i){return i===45?(e.consume(i),r.interrupt?t:F):n(i)}function m(i){return i===`CDATA[`.charCodeAt(s++)?(e.consume(i),s===6?r.interrupt?t:O:m):n(i)}function h(t){return B(t)?(e.consume(t),o=String.fromCharCode(t),g):n(t)}function g(s){if(s===null||s===47||s===62||U(s)){let c=s===47,l=o.toLowerCase();return!c&&!a&&Zn.includes(l)?(i=1,r.interrupt?t(s):O(s)):Xn.includes(o.toLowerCase())?(i=6,c?(e.consume(s),_):r.interrupt?t(s):O(s)):(i=7,r.interrupt&&!r.parser.lazy[r.now().line]?n(s):a?v(s):y(s))}return s===45||V(s)?(e.consume(s),o+=String.fromCharCode(s),g):n(s)}function _(i){return i===62?(e.consume(i),r.interrupt?t:O):n(i)}function v(t){return W(t)?(e.consume(t),v):E(t)}function y(t){return t===47?(e.consume(t),E):t===58||t===95||B(t)?(e.consume(t),b):W(t)?(e.consume(t),y):E(t)}function b(t){return t===45||t===46||t===58||t===95||V(t)?(e.consume(t),b):x(t)}function x(t){return t===61?(e.consume(t),S):W(t)?(e.consume(t),x):y(t)}function S(t){return t===null||t===60||t===61||t===62||t===96?n(t):t===34||t===39?(e.consume(t),c=t,C):W(t)?(e.consume(t),S):w(t)}function C(t){return t===c?(e.consume(t),c=null,T):t===null||H(t)?n(t):(e.consume(t),C)}function w(t){return t===null||t===34||t===39||t===47||t===60||t===61||t===62||t===96||U(t)?x(t):(e.consume(t),w)}function T(e){return e===47||e===62||W(e)?y(e):n(e)}function E(t){return t===62?(e.consume(t),D):n(t)}function D(t){return t===null||H(t)?O(t):W(t)?(e.consume(t),D):n(t)}function O(t){return t===45&&i===2?(e.consume(t),j):t===60&&i===1?(e.consume(t),M):t===62&&i===4?(e.consume(t),I):t===63&&i===3?(e.consume(t),F):t===93&&i===5?(e.consume(t),P):H(t)&&(i===6||i===7)?(e.exit(`htmlFlowData`),e.check($n,te,k)(t)):t===null||H(t)?(e.exit(`htmlFlowData`),k(t)):(e.consume(t),O)}function k(t){return e.check(gn,ee,te)(t)}function ee(t){return e.enter(`lineEnding`),e.consume(t),e.exit(`lineEnding`),A}function A(t){return t===null||H(t)?k(t):(e.enter(`htmlFlowData`),O(t))}function j(t){return t===45?(e.consume(t),F):O(t)}function M(t){return t===47?(e.consume(t),o=``,N):O(t)}function N(t){if(t===62){let n=o.toLowerCase();return Zn.includes(n)?(e.consume(t),I):O(t)}return B(t)&&o.length<8?(e.consume(t),o+=String.fromCharCode(t),N):O(t)}function P(t){return t===93?(e.consume(t),F):O(t)}function F(t){return t===62?(e.consume(t),I):t===45&&i===2?(e.consume(t),F):O(t)}function I(t){return t===null||H(t)?(e.exit(`htmlFlowData`),te(t)):(e.consume(t),I)}function te(n){return e.exit(`htmlFlow`),t(n)}}function nr(e,t,n){return r;function r(r){return e.enter(`lineEnding`),e.consume(r),e.exit(`lineEnding`),e.attempt(on,t,n)}}var rr={name:`htmlText`,tokenize:ir};function ir(e,t,n){let r=this,i,a,o;return s;function s(t){return e.enter(`htmlText`),e.enter(`htmlTextData`),e.consume(t),c}function c(t){return t===33?(e.consume(t),l):t===47?(e.consume(t),x):t===63?(e.consume(t),y):B(t)?(e.consume(t),w):n(t)}function l(t){return t===45?(e.consume(t),u):t===91?(e.consume(t),a=0,m):B(t)?(e.consume(t),v):n(t)}function u(t){return t===45?(e.consume(t),p):n(t)}function d(t){return t===null?n(t):t===45?(e.consume(t),f):H(t)?(o=d,M(t)):(e.consume(t),d)}function f(t){return t===45?(e.consume(t),p):d(t)}function p(e){return e===62?j(e):e===45?f(e):d(e)}function m(t){return t===`CDATA[`.charCodeAt(a++)?(e.consume(t),a===6?h:m):n(t)}function h(t){return t===null?n(t):t===93?(e.consume(t),g):H(t)?(o=h,M(t)):(e.consume(t),h)}function g(t){return t===93?(e.consume(t),_):h(t)}function _(t){return t===62?j(t):t===93?(e.consume(t),_):h(t)}function v(t){return t===null||t===62?j(t):H(t)?(o=v,M(t)):(e.consume(t),v)}function y(t){return t===null?n(t):t===63?(e.consume(t),b):H(t)?(o=y,M(t)):(e.consume(t),y)}function b(e){return e===62?j(e):y(e)}function x(t){return B(t)?(e.consume(t),S):n(t)}function S(t){return t===45||V(t)?(e.consume(t),S):C(t)}function C(t){return H(t)?(o=C,M(t)):W(t)?(e.consume(t),C):j(t)}function w(t){return t===45||V(t)?(e.consume(t),w):t===47||t===62||U(t)?T(t):n(t)}function T(t){return t===47?(e.consume(t),j):t===58||t===95||B(t)?(e.consume(t),E):H(t)?(o=T,M(t)):W(t)?(e.consume(t),T):j(t)}function E(t){return t===45||t===46||t===58||t===95||V(t)?(e.consume(t),E):D(t)}function D(t){return t===61?(e.consume(t),O):H(t)?(o=D,M(t)):W(t)?(e.consume(t),D):T(t)}function O(t){return t===null||t===60||t===61||t===62||t===96?n(t):t===34||t===39?(e.consume(t),i=t,k):H(t)?(o=O,M(t)):W(t)?(e.consume(t),O):(e.consume(t),ee)}function k(t){return t===i?(e.consume(t),i=void 0,A):t===null?n(t):H(t)?(o=k,M(t)):(e.consume(t),k)}function ee(t){return t===null||t===34||t===39||t===60||t===61||t===96?n(t):t===47||t===62||U(t)?T(t):(e.consume(t),ee)}function A(e){return e===47||e===62||U(e)?T(e):n(e)}function j(r){return r===62?(e.consume(r),e.exit(`htmlTextData`),e.exit(`htmlText`),t):n(r)}function M(t){return e.exit(`htmlTextData`),e.enter(`lineEnding`),e.consume(t),e.exit(`lineEnding`),N}function N(t){return W(t)?G(e,P,`linePrefix`,r.parser.constructs.disable.null.includes(`codeIndented`)?void 0:4)(t):P(t)}function P(t){return e.enter(`htmlTextData`),o(t)}}var ar={name:`labelEnd`,resolveAll:lr,resolveTo:ur,tokenize:dr},or={tokenize:fr},sr={tokenize:pr},cr={tokenize:mr};function lr(e){let t=-1,n=[];for(;++t<e.length;){let r=e[t][1];if(n.push(e[t]),r.type===`labelImage`||r.type===`labelLink`||r.type===`labelEnd`){let e=r.type===`labelImage`?4:2;r.type=`data`,t+=e}}return e.length!==n.length&&L(e,0,e.length,n),e}function ur(e,t){let n=e.length,r=0,i,a,o;for(;n--;){let t=e[n][1];if(i){if(t.type===`link`||t.type===`labelLink`&&t._inactive)break;e[n][0]===`enter`&&t.type===`labelLink`&&(t._inactive=!0)}else if(a){if(e[n][0]===`enter`&&(t.type===`labelImage`||t.type===`labelLink`)&&!t._balanced&&(i=n,t.type!==`labelLink`)){r=2;break}}else t.type===`labelEnd`&&(a=n)}let s={type:e[i][1].type===`labelLink`?`link`:`image`,start:{...e[i][1].start},end:{...e[e.length-1][1].end}},c={type:`label`,start:{...e[i][1].start},end:{...e[a][1].end}},l={type:`labelText`,start:{...e[i+r+2][1].end},end:{...e[a-2][1].start}};return o=[[`enter`,s,t],[`enter`,c,t]],o=R(o,e.slice(i+1,i+r+3)),o=R(o,[[`enter`,l,t]]),o=R(o,Qt(t.parser.constructs.insideSpan.null,e.slice(i+r+4,a-3),t)),o=R(o,[[`exit`,l,t],e[a-2],e[a-1],[`exit`,c,t]]),o=R(o,e.slice(a+1)),o=R(o,[[`exit`,s,t]]),L(e,i,e.length,o),e}function dr(e,t,n){let r=this,i=r._labelStarts,a,o;if(i){for(;i.length>0&&i[i.length-1]._balanced;)i.pop();a=i[i.length-1]}return s;function s(t){return a?a._inactive?d(t):(o=r.parser.defined.includes(z(r.sliceSerialize({start:a.end,end:r.now()}))),e.enter(`labelEnd`),e.enter(`labelMarker`),e.consume(t),e.exit(`labelMarker`),e.exit(`labelEnd`),c):n(t)}function c(t){return t===40?e.attempt(or,u,o?u:d)(t):t===91?e.attempt(sr,u,o?l:d)(t):o?u(t):d(t)}function l(t){return e.attempt(cr,u,d)(t)}function u(e){return i.pop(),t(e)}function d(e){return a._balanced=!0,n(e)}}function fr(e,t,n){return r;function r(t){return e.enter(`resource`),e.enter(`resourceMarker`),e.consume(t),e.exit(`resourceMarker`),i}function i(t){return U(t)?Bn(e,a)(t):a(t)}function a(t){return t===41?u(t):Ln(e,o,s,`resourceDestination`,`resourceDestinationLiteral`,`resourceDestinationLiteralMarker`,`resourceDestinationRaw`,`resourceDestinationString`,32)(t)}function o(t){return U(t)?Bn(e,c)(t):u(t)}function s(e){return n(e)}function c(t){return t===34||t===39||t===40?zn(e,l,n,`resourceTitle`,`resourceTitleMarker`,`resourceTitleString`)(t):u(t)}function l(t){return U(t)?Bn(e,u)(t):u(t)}function u(r){return r===41?(e.enter(`resourceMarker`),e.consume(r),e.exit(`resourceMarker`),e.exit(`resource`),t):n(r)}}function pr(e,t,n){let r=this;return i;function i(t){return Rn.call(r,e,a,o,`reference`,`referenceMarker`,`referenceString`)(t)}function a(e){return r.parser.defined.includes(z(r.sliceSerialize(r.events[r.events.length-1][1]).slice(1,-1)))?t(e):n(e)}function o(e){return n(e)}}function mr(e,t,n){return r;function r(t){return e.enter(`reference`),e.enter(`referenceMarker`),e.consume(t),e.exit(`referenceMarker`),i}function i(r){return r===93?(e.enter(`referenceMarker`),e.consume(r),e.exit(`referenceMarker`),e.exit(`reference`),t):n(r)}}var hr={name:`labelStartImage`,resolveAll:ar.resolveAll,tokenize:gr};function gr(e,t,n){let r=this,i;return a;function a(t){return e.enter(`labelImage`),e.enter(`labelImageMarker`),e.consume(t),e.exit(`labelImageMarker`),o}function o(t){return t===91?(e.enter(`labelMarker`),e.consume(t),e.exit(`labelMarker`),i=e.exit(`labelImage`),s):n(t)}function s(e){return e===94&&`_hiddenFootnoteSupport`in r.parser.constructs?n(e):(r._labelStarts=r._labelStarts||[],r._labelStarts.push(i),t(e))}}var _r={name:`labelStartLink`,resolveAll:ar.resolveAll,tokenize:vr};function vr(e,t,n){let r=this,i;return a;function a(t){return e.enter(`labelLink`),e.enter(`labelMarker`),e.consume(t),e.exit(`labelMarker`),i=e.exit(`labelLink`),o}function o(e){return e===94&&`_hiddenFootnoteSupport`in r.parser.constructs?n(e):(r._labelStarts=r._labelStarts||[],r._labelStarts.push(i),t(e))}}var yr={name:`lineEnding`,tokenize:br};function br(e,t){return n;function n(n){return e.enter(`lineEnding`),e.consume(n),e.exit(`lineEnding`),G(e,t,`linePrefix`)}}var xr={name:`thematicBreak`,tokenize:Sr};function Sr(e,t,n){let r=0,i;return a;function a(t){return e.enter(`thematicBreak`),o(t)}function o(e){return i=e,s(e)}function s(a){return a===i?(e.enter(`thematicBreakSequence`),c(a)):r>=3&&(a===null||H(a))?(e.exit(`thematicBreak`),t(a)):n(a)}function c(t){return t===i?(e.consume(t),r++,c):(e.exit(`thematicBreakSequence`),W(t)?G(e,s,`whitespace`)(t):s(t))}}var q={continuation:{tokenize:Er},exit:Or,name:`list`,tokenize:Tr},Cr={partial:!0,tokenize:kr},wr={partial:!0,tokenize:Dr};function Tr(e,t,n){let r=this,i=r.events[r.events.length-1],a=i&&i[1].type===`linePrefix`?i[2].sliceSerialize(i[1],!0).length:0,o=0;return s;function s(t){let i=r.containerState.type||(t===42||t===43||t===45?`listUnordered`:`listOrdered`);if(i===`listUnordered`?!r.containerState.marker||t===r.containerState.marker:It(t)){if(r.containerState.type||(r.containerState.type=i,e.enter(i,{_container:!0})),i===`listUnordered`)return e.enter(`listItemPrefix`),t===42||t===45?e.check(xr,n,l)(t):l(t);if(!r.interrupt||t===49)return e.enter(`listItemPrefix`),e.enter(`listItemValue`),c(t)}return n(t)}function c(t){return It(t)&&++o<10?(e.consume(t),c):(!r.interrupt||o<2)&&(r.containerState.marker?t===r.containerState.marker:t===41||t===46)?(e.exit(`listItemValue`),l(t)):n(t)}function l(t){return e.enter(`listItemMarker`),e.consume(t),e.exit(`listItemMarker`),r.containerState.marker=r.containerState.marker||t,e.check(on,r.interrupt?n:u,e.attempt(Cr,f,d))}function u(e){return r.containerState.initialBlankLine=!0,a++,f(e)}function d(t){return W(t)?(e.enter(`listItemPrefixWhitespace`),e.consume(t),e.exit(`listItemPrefixWhitespace`),f):n(t)}function f(n){return r.containerState.size=a+r.sliceSerialize(e.exit(`listItemPrefix`),!0).length,t(n)}}function Er(e,t,n){let r=this;return r.containerState._closeFlow=void 0,e.check(on,i,a);function i(n){return r.containerState.furtherBlankLines=r.containerState.furtherBlankLines||r.containerState.initialBlankLine,G(e,t,`listItemIndent`,r.containerState.size+1)(n)}function a(n){return r.containerState.furtherBlankLines||!W(n)?(r.containerState.furtherBlankLines=void 0,r.containerState.initialBlankLine=void 0,o(n)):(r.containerState.furtherBlankLines=void 0,r.containerState.initialBlankLine=void 0,e.attempt(wr,t,o)(n))}function o(i){return r.containerState._closeFlow=!0,r.interrupt=void 0,G(e,e.attempt(q,t,n),`linePrefix`,r.parser.constructs.disable.null.includes(`codeIndented`)?void 0:4)(i)}}function Dr(e,t,n){let r=this;return G(e,i,`listItemIndent`,r.containerState.size+1);function i(e){let i=r.events[r.events.length-1];return i&&i[1].type===`listItemIndent`&&i[2].sliceSerialize(i[1],!0).length===r.containerState.size?t(e):n(e)}}function Or(e){e.exit(this.containerState.type)}function kr(e,t,n){let r=this;return G(e,i,`listItemPrefixWhitespace`,r.parser.constructs.disable.null.includes(`codeIndented`)?void 0:5);function i(e){let i=r.events[r.events.length-1];return!W(e)&&i&&i[1].type===`listItemPrefixWhitespace`?t(e):n(e)}}var Ar={name:`setextUnderline`,resolveTo:jr,tokenize:Mr};function jr(e,t){let n=new Kt,r=e.length,i,a,o;for(;r--;)if(e[r][0]===`enter`){if(e[r][1].type===`content`){i=r;break}e[r][1].type===`paragraph`&&(a=r)}else e[r][1].type===`content`&&n.add(r,1,[]),!o&&e[r][1].type===`definition`&&(o=r);let s={type:`setextHeading`,start:{...e[i][1].start},end:{...e[e.length-1][1].end}};return e[a][1].type=`setextHeadingText`,o?(n.add(a,0,[[`enter`,s,t]]),n.add(o+1,0,[[`exit`,e[i][1],t]]),e[i][1].end={...e[o][1].end}):e[i][1]=s,n.add(e.length,0,[[`exit`,s,t]]),n.consume(e),e}function Mr(e,t,n){let r=this,i;return a;function a(t){let a=r.events.length,s;for(;a--;)if(r.events[a][1].type!==`lineEnding`&&r.events[a][1].type!==`linePrefix`&&r.events[a][1].type!==`content`){s=r.events[a][1].type===`paragraph`;break}return!r.parser.lazy[r.now().line]&&(r.interrupt||s)?(e.enter(`setextHeadingLine`),i=t,o(t)):n(t)}function o(t){return e.enter(`setextHeadingLineSequence`),s(t)}function s(t){return t===i?(e.consume(t),s):(e.exit(`setextHeadingLineSequence`),W(t)?G(e,c,`lineSuffix`)(t):c(t))}function c(r){return r===null||H(r)?(e.exit(`setextHeadingLine`),t(r)):n(r)}}var Nr={tokenize:Pr};function Pr(e){let t=this,n=e.attempt(on,r,e.attempt(this.parser.constructs.flowInitial,i,G(e,e.attempt(this.parser.constructs.flow,i,e.attempt(Mn,i)),`linePrefix`)));return n;function r(r){if(r===null)e.consume(r);else return e.enter(`lineEndingBlank`),e.consume(r),e.exit(`lineEndingBlank`),t.currentConstruct=void 0,n}function i(r){if(r===null)e.consume(r);else return e.enter(`lineEnding`),e.consume(r),e.exit(`lineEnding`),t.currentConstruct=void 0,n}}var Fr={resolveAll:zr()},Ir=Rr(`string`),Lr=Rr(`text`);function Rr(e){return{resolveAll:zr(e===`text`?Br:void 0),tokenize:t};function t(t){let n=this,r=this.parser.constructs[e],i=t.attempt(r,a,o);return a;function a(e){return c(e)?i(e):o(e)}function o(e){if(e===null)t.consume(e);else return t.enter(`data`),t.consume(e),s}function s(e){return c(e)?(t.exit(`data`),i(e)):(t.consume(e),s)}function c(e){if(e===null)return!0;let t=r[e],i=-1;if(t)for(;++i<t.length;){let e=t[i];if(!e.previous||e.previous.call(n,n.previous))return!0}return!1}}}function zr(e){return t;function t(t,n){let r=-1,i;for(;++r<=t.length;)i===void 0?t[r]&&t[r][1].type===`data`&&(i=r,r++):t[r]&&t[r][1].type===`data`||(r!==i+2&&(t[i][1].end=t[r-1][1].end,t.splice(i+2,r-i-2),r=i+2),i=void 0);return e?e(t,n):t}}function Br(e,t){let n=new Kt,r=0;for(;++r<=e.length;)if((r===e.length||e[r][1].type===`lineEnding`)&&e[r-1][1].type===`data`){let i=e[r-1][1],a=t.sliceStream(i),o=a.length,s=-1,c=0,l;for(;o--;){let e=a[o];if(typeof e==`string`){for(s=e.length;e.charCodeAt(s-1)===32;)c++,s--;if(s)break;s=-1}else if(e===-2)l=!0,c++;else if(e!==-1){o++;break}}if(t._contentTypeTextTrailing&&r===e.length&&(c=0),c){let a={type:r===e.length||l||c<2?`lineSuffix`:`hardBreakTrailing`,start:{_bufferIndex:o?s:i.start._bufferIndex+s,_index:i.start._index+o,line:i.end.line,column:i.end.column-c,offset:i.end.offset-c},end:{...i.end}};i.end={...a.start},i.start.offset===i.end.offset?Object.assign(i,a):n.add(r,0,[[`enter`,a,t],[`exit`,a,t]])}r++}return n.consume(e),e}var Vr=s({attentionMarkers:()=>Yr,contentInitial:()=>Ur,disable:()=>Xr,document:()=>Hr,flow:()=>Gr,flowInitial:()=>Wr,insideSpan:()=>Jr,string:()=>Kr,text:()=>qr}),Hr={42:q,43:q,45:q,48:q,49:q,50:q,51:q,52:q,53:q,54:q,55:q,56:q,57:q,62:cn},Ur={91:Vn},Wr={[-2]:bn,[-1]:bn,32:bn},Gr={35:qn,42:xr,45:[Ar,xr],60:Qn,61:Ar,95:xr,96:vn,126:vn},Kr={38:mn,92:fn},qr={[-5]:yr,[-4]:yr,[-3]:yr,33:hr,38:mn,42:$t,60:[rn,rr],91:_r,92:[Gn,fn],93:ar,95:$t,96:wn},Jr={null:[$t,Fr]},Yr={null:[42,95]},Xr={null:[]};function Zr(e,t,n){let r={_bufferIndex:-1,_index:0,line:n&&n.line||1,column:n&&n.column||1,offset:n&&n.offset||0},i={},a=[],o=[],s=[],c={attempt:C(x),check:C(S),consume:v,enter:y,exit:b,interrupt:C(S,{interrupt:!0})},l={code:null,containerState:{},defineSkip:h,events:[],now:m,parser:e,previous:null,sliceSerialize:f,sliceStream:p,write:d},u=t.tokenize.call(l,c);return t.resolveAll&&a.push(t),l;function d(e){return o=R(o,e),g(),o[o.length-1]===null?(w(t,0),l.events=Qt(a,l.events,l),l.events):[]}function f(e,t){return $r(p(e),t)}function p(e){return Qr(o,e)}function m(){let{_bufferIndex:e,_index:t,line:n,column:i,offset:a}=r;return{_bufferIndex:e,_index:t,line:n,column:i,offset:a}}function h(e){i[e.line]=e.column,E()}function g(){for(;r._index<o.length;){let e=o[r._index];if(typeof e==`string`){let t=r._index;for(r._bufferIndex<0&&(r._bufferIndex=0);r._index===t&&r._bufferIndex<e.length;)_(e.charCodeAt(r._bufferIndex))}else _(e)}}function _(e){u=u(e)}function v(e){H(e)?(r.line++,r.column=1,r.offset+=e===-3?2:1,E()):e!==-1&&(r.column++,r.offset++),r._bufferIndex<0?r._index++:(r._bufferIndex++,r._bufferIndex===o[r._index].length&&(r._bufferIndex=-1,r._index++)),l.previous=e}function y(e,t){let n=t||{};return n.type=e,n.start=m(),l.events.push([`enter`,n,l]),s.push(n),n}function b(e){let t=s.pop();return t.end=m(),l.events.push([`exit`,t,l]),t}function x(e,t){w(e,t.from)}function S(e,t){t.restore()}function C(e,t){return n;function n(n,r,i){let a,o,s,u;return Array.isArray(n)?f(n):`tokenize`in n?f([n]):d(n);function d(e){return t;function t(t){let n=t!==null&&e[t],r=t!==null&&e.null;return f([...Array.isArray(n)?n:n?[n]:[],...Array.isArray(r)?r:r?[r]:[]])(t)}}function f(e){return a=e,o=0,e.length===0?i:p(e[o])}function p(e){return n;function n(n){return u=T(),s=e,e.partial||(l.currentConstruct=e),e.name&&l.parser.constructs.disable.null.includes(e.name)?h(n):e.tokenize.call(t?Object.assign(Object.create(l),t):l,c,m,h)(n)}}function m(t){return e(s,u),r}function h(e){return u.restore(),++o<a.length?p(a[o]):i}}}function w(e,t){e.resolveAll&&!a.includes(e)&&a.push(e),e.resolve&&L(l.events,t,l.events.length-t,e.resolve(l.events.slice(t),l)),e.resolveTo&&(l.events=e.resolveTo(l.events,l))}function T(){let e=m(),t=l.previous,n=l.currentConstruct,i=l.events.length,a=Array.from(s);return{from:i,restore:o};function o(){r=e,l.previous=t,l.currentConstruct=n,l.events.length=i,s=a,E()}}function E(){r.line in i&&r.column<2&&(r.column=i[r.line],r.offset+=i[r.line]-1)}}function Qr(e,t){let n=t.start._index,r=t.start._bufferIndex,i=t.end._index,a=t.end._bufferIndex,o;if(n===i)o=[e[n].slice(r,a)];else{if(o=e.slice(n,i),r>-1){let e=o[0];typeof e==`string`?o[0]=e.slice(r):o.shift()}a>0&&o.push(e[i].slice(0,a))}return o}function $r(e,t){let n=-1,r=[],i;for(;++n<e.length;){let a=e[n],o;if(typeof a==`string`)o=a;else switch(a){case-5:o=`\r`;break;case-4:o=`
`;break;case-3:o=`\r
`;break;case-2:o=t?` `:`	`;break;case-1:if(!t&&i)continue;o=` `;break;default:o=String.fromCharCode(a)}i=a===-2,r.push(o)}return r.join(``)}function ei(e){let t={constructs:At([Vr,...(e||{}).extensions||[]]),content:n(Wt),defined:[],document:n(Jt),flow:n(Nr),lazy:{},string:n(Ir),text:n(Lr)};return t;function n(e){return n;function n(n){return Zr(t,e,n)}}}function ti(e){for(;!An(e););return e}var ni=/[\0\t\n\r]/g;function ri(){let e=1,t=``,n=!0,r;return i;function i(i,a,o){i=t+(typeof i==`string`?i.toString():new TextDecoder(a||void 0).decode(i));let s=[],c=0;for(t=``,n&&=(i.charCodeAt(0)===65279&&c++,void 0);c<i.length;){ni.lastIndex=c;let n=ni.exec(i),a=n&&n.index!==void 0?n.index:i.length,o=i.charCodeAt(a);if(!n){t=i.slice(c);break}if(o===10&&c===a&&r)s.push(-3),r=void 0;else switch(r&&=(s.push(-5),void 0),c<a&&(s.push(i.slice(c,a)),e+=a-c),o){case 0:s.push(65533),e++;break;case 9:{let t=Math.ceil(e/4)*4;for(s.push(-2);e++<t;)s.push(-1);break}case 10:s.push(-4),e=1;break;default:r=!0,e=1}c=a+1}return o&&(r&&s.push(-5),t&&s.push(t),s.push(null)),s}}var ii=/\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;function ai(e){return e.replace(ii,oi)}function oi(e,t,n){if(t)return t;if(n.charCodeAt(0)===35){let e=n.charCodeAt(1),t=e===120||e===88;return Nt(n.slice(t?2:1),t?16:10)}return Ot(n)||e}var si={}.hasOwnProperty;function ci(e,t,n){return t&&typeof t==`object`&&(n=t,t=void 0),li(n)(ti(ei(n).document().write(ri()(e,t,!0))))}function li(e){let t={afterExit:[],beforeEnter:[],transforms:[],canContainEols:[`emphasis`,`fragment`,`heading`,`paragraph`,`strong`],enter:{autolink:o(ye),autolinkProtocol:E,autolinkEmail:E,atxHeading:o(he),blockQuote:o(ue),characterEscape:E,characterReference:E,codeFenced:o(de),codeFencedFenceInfo:s,codeFencedFenceMeta:s,codeIndented:o(de,s),codeText:o(fe,s),codeTextData:E,data:E,codeFlowValue:E,definition:o(pe),definitionDestinationString:s,definitionLabelString:s,definitionTitleString:s,emphasis:o(me),hardBreakEscape:o(ge),hardBreakTrailing:o(ge),htmlFlow:o(_e,s),htmlFlowData:E,htmlText:o(_e,s),htmlTextData:E,image:o(ve),label:s,link:o(ye),listItem:o(xe),listItemValue:p,listOrdered:o(be,f),listUnordered:o(be),paragraph:o(Se),reference:re,referenceString:s,resourceDestinationString:s,resourceTitleString:s,setextHeading:o(he),strong:o(Ce),thematicBreak:o(Te)},exit:{atxHeading:l(),atxHeadingSequence:S,autolink:l(),autolinkEmail:le,autolinkProtocol:ce,blockQuote:l(),characterEscapeValue:D,characterReferenceMarkerHexadecimal:ae,characterReferenceMarkerNumeric:ae,characterReferenceValue:oe,characterReference:se,codeFenced:l(_),codeFencedFence:g,codeFencedFenceInfo:m,codeFencedFenceMeta:h,codeFlowValue:D,codeIndented:l(v),codeText:l(j),codeTextData:D,data:D,definition:l(),definitionDestinationString:x,definitionLabelString:y,definitionTitleString:b,emphasis:l(),hardBreakEscape:l(k),hardBreakTrailing:l(k),htmlFlow:l(ee),htmlFlowData:D,htmlText:l(A),htmlTextData:D,image:l(N),label:F,labelText:P,lineEnding:O,link:l(M),listItem:l(),listOrdered:l(),listUnordered:l(),paragraph:l(),referenceString:ie,resourceDestinationString:I,resourceTitleString:te,resource:ne,setextHeading:l(T),setextHeadingLineSequence:w,setextHeadingText:C,strong:l(),thematicBreak:l()}};di(t,(e||{}).mdastExtensions||[]);let n={};return r;function r(e){let r={type:`root`,children:[],position:void 0},o={stack:[r],tokenStack:[],config:t,enter:c,exit:u,buffer:s,resume:d,data:n},l=[],f=[],p=-1;for(;++p<e.length;)f.push(e[p]),(e[p][1].type===`listOrdered`||e[p][1].type===`listUnordered`)&&(e[p][0]===`enter`?l.push(f.length-1):a(f,l.pop()));for(e=f,p=-1;++p<e.length;){let n=t[e[p][0]];e[p][0]===`enter`&&t.beforeEnter.length>0&&i(t.beforeEnter,{...o,sliceSerialize:e[p][2].sliceSerialize},e[p][1]),si.call(n,e[p][1].type)&&n[e[p][1].type].call({...o,sliceSerialize:e[p][2].sliceSerialize},e[p][1]),e[p][0]===`exit`&&t.afterExit.length>0&&i(t.afterExit,{...o,sliceSerialize:e[p][2].sliceSerialize},e[p][1])}if(o.tokenStack.length>0){let e=o.tokenStack[o.tokenStack.length-1];(e[1]||pi).call(o,void 0,e[0])}for(r.position={start:ui(e.length>0?e[0][1].start:{line:1,column:1,offset:0}),end:ui(e.length>0?e[e.length-2][1].end:{line:1,column:1,offset:0})},p=-1;++p<t.transforms.length;)r=t.transforms[p](r)||r;return r}function i(e,t,n){let r=-1;for(;++r<e.length;)e[r].call(t,n)}function a(e,t){let n=e.length-1,r=t-1,i=-1,a=!1,o,s,c,l,u=[];for(;++r<=n;){let t=e[r];switch(t[1].type){case`listUnordered`:case`listOrdered`:case`blockQuote`:t[0]===`enter`?i++:i--,l=void 0;break;case`lineEndingBlank`:t[0]===`enter`&&(o&&!l&&!i&&!c&&(c=r),l=void 0);break;case`linePrefix`:case`listItemValue`:case`listItemMarker`:case`listItemPrefix`:case`listItemPrefixWhitespace`:break;default:l=void 0}if(!i&&t[0]===`enter`&&t[1].type===`listItemPrefix`||i===-1&&t[0]===`exit`&&(t[1].type===`listUnordered`||t[1].type===`listOrdered`)){if(o){let n=r;for(s=void 0;n--;){let t=e[n];if(t[1].type===`lineEnding`||t[1].type===`lineEndingBlank`){if(t[0]===`exit`)continue;s&&(e[s][1].type=`lineEndingBlank`,a=!0),t[1].type=`lineEnding`,s=n}else if(t[1].type!==`linePrefix`&&t[1].type!==`blockQuotePrefix`&&t[1].type!==`blockQuotePrefixWhitespace`&&t[1].type!==`blockQuoteMarker`&&t[1].type!==`listItemIndent`)break}c&&(!s||c<s)&&(o._spread=!0),o.end=Object.assign({},s?e[s][1].start:t[1].end),u.push({at:s||r,event:[`exit`,o,t[2]]})}if(t[1].type===`listItemPrefix`){let e={type:`listItem`,_spread:!1,start:Object.assign({},t[1].start),end:void 0};o=e,u.push({at:r,event:[`enter`,e,t[2]]}),c=void 0,l=!0}}}let d=e.splice(t),f=0;for(r=-1;++r<d.length;){for(;f<u.length&&u[f].at===t+r;)e.push(u[f++].event);e.push(d[r])}e[t][1]._spread=a}function o(e,t){return n;function n(n){c.call(this,e(n),n),t&&t.call(this,n)}}function s(){this.stack.push({type:`fragment`,children:[]})}function c(e,t,n){this.stack[this.stack.length-1].children.push(e),this.stack.push(e),this.tokenStack.push([t,n||void 0]),e.position={start:ui(t.start),end:void 0}}function l(e){return t;function t(t){e&&e.call(this,t),u.call(this,t)}}function u(e,t){let n=this.stack.pop(),r=this.tokenStack.pop();if(!r)throw Error("Cannot close `"+e.type+"` ("+Be({start:e.start,end:e.end})+`): it’s not open`);r[0].type!==e.type&&(t?t.call(this,e,r[0]):(r[1]||pi).call(this,e,r[0])),n.position.end=ui(e.end)}function d(){return Ct(this.stack.pop())}function f(){this.data.expectingFirstListItemValue=!0}function p(e){if(this.data.expectingFirstListItemValue){let t=this.stack[this.stack.length-2];t.start=Number.parseInt(this.sliceSerialize(e),10),this.data.expectingFirstListItemValue=void 0}}function m(){let e=this.resume(),t=this.stack[this.stack.length-1];t.lang=e}function h(){let e=this.resume(),t=this.stack[this.stack.length-1];t.meta=e}function g(){this.data.flowCodeInside||(this.buffer(),this.data.flowCodeInside=!0)}function _(){let e=this.resume(),t=this.stack[this.stack.length-1];t.value=e.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g,``),this.data.flowCodeInside=void 0}function v(){let e=this.resume(),t=this.stack[this.stack.length-1];t.value=e.replace(/(\r?\n|\r)$/g,``)}function y(e){let t=this.resume(),n=this.stack[this.stack.length-1];n.label=t,n.identifier=z(this.sliceSerialize(e)).toLowerCase()}function b(){let e=this.resume(),t=this.stack[this.stack.length-1];t.title=e}function x(){let e=this.resume(),t=this.stack[this.stack.length-1];t.url=e}function S(e){let t=this.stack[this.stack.length-1];t.depth||=this.sliceSerialize(e).length}function C(){this.data.setextHeadingSlurpLineEnding=!0}function w(e){let t=this.stack[this.stack.length-1];t.depth=this.sliceSerialize(e).codePointAt(0)===61?1:2}function T(){this.data.setextHeadingSlurpLineEnding=void 0}function E(e){let t=this.stack[this.stack.length-1].children,n=t[t.length-1];n&&n.type===`text`||(n=we(),n.position={start:ui(e.start),end:void 0},t.push(n)),this.stack.push(n)}function D(e){let t=this.stack.pop();t.value+=this.sliceSerialize(e),t.position.end=ui(e.end)}function O(e){let n=this.stack[this.stack.length-1];if(this.data.atHardBreak){let t=n.children[n.children.length-1];t.position.end=ui(e.end),this.data.atHardBreak=void 0}else!this.data.setextHeadingSlurpLineEnding&&t.canContainEols.includes(n.type)&&(E.call(this,e),D.call(this,e))}function k(){this.data.atHardBreak=!0}function ee(){let e=this.resume(),t=this.stack[this.stack.length-1];t.value=e}function A(){let e=this.resume(),t=this.stack[this.stack.length-1];t.value=e}function j(){let e=this.resume(),t=this.stack[this.stack.length-1];t.value=e}function M(){let e=this.stack[this.stack.length-1];if(this.data.inReference){let t=this.data.referenceType||`shortcut`;e.type+=`Reference`,e.referenceType=t,delete e.url,delete e.title}else delete e.identifier,delete e.label;this.data.referenceType=void 0}function N(){let e=this.stack[this.stack.length-1];if(this.data.inReference){let t=this.data.referenceType||`shortcut`;e.type+=`Reference`,e.referenceType=t,delete e.url,delete e.title}else delete e.identifier,delete e.label;this.data.referenceType=void 0}function P(e){let t=this.sliceSerialize(e),n=this.stack[this.stack.length-2];n.label=ai(t),n.identifier=z(t).toLowerCase()}function F(){let e=this.stack[this.stack.length-1],t=this.resume(),n=this.stack[this.stack.length-1];this.data.inReference=!0,n.type===`link`?n.children=e.children:n.alt=t}function I(){let e=this.resume(),t=this.stack[this.stack.length-1];t.url=e}function te(){let e=this.resume(),t=this.stack[this.stack.length-1];t.title=e}function ne(){this.data.inReference=void 0}function re(){this.data.referenceType=`collapsed`}function ie(e){let t=this.resume(),n=this.stack[this.stack.length-1];n.label=t,n.identifier=z(this.sliceSerialize(e)).toLowerCase(),this.data.referenceType=`full`}function ae(e){this.data.characterReferenceType=e.type}function oe(e){let t=this.sliceSerialize(e),n=this.data.characterReferenceType,r;n?(r=Nt(t,n===`characterReferenceMarkerNumeric`?10:16),this.data.characterReferenceType=void 0):r=Ot(t);let i=this.stack[this.stack.length-1];i.value+=r}function se(e){let t=this.stack.pop();t.position.end=ui(e.end)}function ce(e){D.call(this,e);let t=this.stack[this.stack.length-1];t.url=this.sliceSerialize(e)}function le(e){D.call(this,e);let t=this.stack[this.stack.length-1];t.url=`mailto:`+this.sliceSerialize(e)}function ue(){return{type:`blockquote`,children:[],position:void 0}}function de(){return{type:`code`,lang:null,meta:null,value:``,position:void 0}}function fe(){return{type:`inlineCode`,value:``,position:void 0}}function pe(){return{type:`definition`,identifier:``,label:null,title:null,url:``,position:void 0}}function me(){return{type:`emphasis`,children:[],position:void 0}}function he(){return{type:`heading`,depth:0,children:[],position:void 0}}function ge(){return{type:`break`,position:void 0}}function _e(){return{type:`html`,value:``,position:void 0}}function ve(){return{type:`image`,title:null,url:``,alt:null,position:void 0}}function ye(){return{type:`link`,title:null,url:``,children:[],position:void 0}}function be(e){return{type:`list`,ordered:e.type===`listOrdered`,start:null,spread:e._spread,children:[],position:void 0}}function xe(e){return{type:`listItem`,spread:e._spread,checked:null,children:[],position:void 0}}function Se(){return{type:`paragraph`,children:[],position:void 0}}function Ce(){return{type:`strong`,children:[],position:void 0}}function we(){return{type:`text`,value:``,position:void 0}}function Te(){return{type:`thematicBreak`,position:void 0}}}function ui(e){return{line:e.line,column:e.column,offset:e.offset}}function di(e,t){let n=-1;for(;++n<t.length;){let r=t[n];Array.isArray(r)?di(e,r):fi(e,r)}}function fi(e,t){let n;for(n in t)if(si.call(t,n))switch(n){case`canContainEols`:{let r=t[n];r&&e[n].push(...r);break}case`transforms`:{let r=t[n];r&&e[n].push(...r);break}case`afterExit`:case`beforeEnter`:{let r=t[n];r&&e[n].push(r);break}case`enter`:case`exit`:{let r=t[n];r&&Object.assign(e[n],r);break}}}function pi(e,t){throw Error(e?"Cannot close `"+e.type+"` ("+Be({start:e.start,end:e.end})+"): a different token (`"+t.type+"`, "+Be({start:t.start,end:t.end})+`) is open`:"Cannot close document, a token (`"+t.type+"`, "+Be({start:t.start,end:t.end})+`) is still open`)}function mi(e){let t=this;t.parser=n;function n(n){return ci(n,{...t.data(`settings`),...e,extensions:t.data(`micromarkExtensions`)||[],mdastExtensions:t.data(`fromMarkdownExtensions`)||[]})}}function hi(e,t){let n={type:`element`,tagName:`blockquote`,properties:{},children:e.wrap(e.all(t),!0)};return e.patch(t,n),e.applyData(t,n)}function gi(e,t){let n={type:`element`,tagName:`br`,properties:{},children:[]};return e.patch(t,n),[e.applyData(t,n),{type:`text`,value:`
`}]}function _i(e,t){let n=t.value?t.value+`
`:``,r={},i=t.lang?t.lang.split(/\s+/):[];i.length>0&&(r.className=[`language-`+i[0]]);let a={type:`element`,tagName:`code`,properties:r,children:[{type:`text`,value:n}]};return t.meta&&(a.data={meta:t.meta}),e.patch(t,a),a=e.applyData(t,a),a={type:`element`,tagName:`pre`,properties:{},children:[a]},e.patch(t,a),a}function vi(e,t){let n={type:`element`,tagName:`del`,properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function yi(e,t){let n={type:`element`,tagName:`em`,properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function bi(e,t){let n=typeof e.options.clobberPrefix==`string`?e.options.clobberPrefix:`user-content-`,r=String(t.identifier).toUpperCase(),i=Ht(r.toLowerCase()),a=e.footnoteOrder.indexOf(r),o,s=e.footnoteCounts.get(r);s===void 0?(s=0,e.footnoteOrder.push(r),o=e.footnoteOrder.length):o=a+1,s+=1,e.footnoteCounts.set(r,s);let c={type:`element`,tagName:`a`,properties:{href:`#`+n+`fn-`+i,id:n+`fnref-`+i+(s>1?`-`+s:``),dataFootnoteRef:!0,ariaDescribedBy:[`footnote-label`]},children:[{type:`text`,value:String(o)}]};e.patch(t,c);let l={type:`element`,tagName:`sup`,properties:{},children:[c]};return e.patch(t,l),e.applyData(t,l)}function xi(e,t){let n={type:`element`,tagName:`h`+t.depth,properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function Si(e,t){if(e.options.allowDangerousHtml){let n={type:`raw`,value:t.value};return e.patch(t,n),e.applyData(t,n)}}function Ci(e,t){let n=t.referenceType,r=`]`;if(n===`collapsed`?r+=`[]`:n===`full`&&(r+=`[`+(t.label||t.identifier)+`]`),t.type===`imageReference`)return[{type:`text`,value:`![`+t.alt+r}];let i=e.all(t),a=i[0];a&&a.type===`text`?a.value=`[`+a.value:i.unshift({type:`text`,value:`[`});let o=i[i.length-1];return o&&o.type===`text`?o.value+=r:i.push({type:`text`,value:r}),i}function wi(e,t){let n=String(t.identifier).toUpperCase(),r=e.definitionById.get(n);if(!r)return Ci(e,t);let i={src:Ht(r.url||``)};t.alt!==null&&t.alt!==void 0&&(i.alt=t.alt),r.title!==null&&r.title!==void 0&&(i.title=r.title);let a={type:`element`,tagName:`img`,properties:i,children:[]};return e.patch(t,a),e.applyData(t,a)}function Ti(e,t){let n={src:Ht(t.url)};t.alt!==null&&t.alt!==void 0&&(n.alt=t.alt),t.title!==null&&t.title!==void 0&&(n.title=t.title);let r={type:`element`,tagName:`img`,properties:n,children:[]};return e.patch(t,r),e.applyData(t,r)}function Ei(e,t){let n={type:`text`,value:t.value.replace(/\r?\n|\r/g,` `)};e.patch(t,n);let r={type:`element`,tagName:`code`,properties:{},children:[n]};return e.patch(t,r),e.applyData(t,r)}function Di(e,t){let n=String(t.identifier).toUpperCase(),r=e.definitionById.get(n);if(!r)return Ci(e,t);let i={href:Ht(r.url||``)};r.title!==null&&r.title!==void 0&&(i.title=r.title);let a={type:`element`,tagName:`a`,properties:i,children:e.all(t)};return e.patch(t,a),e.applyData(t,a)}function Oi(e,t){let n={href:Ht(t.url)};t.title!==null&&t.title!==void 0&&(n.title=t.title);let r={type:`element`,tagName:`a`,properties:n,children:e.all(t)};return e.patch(t,r),e.applyData(t,r)}function ki(e,t,n){let r=e.all(t),i=n?Ai(n):ji(t),a={},o=[];if(typeof t.checked==`boolean`){let e=r[0],n;e&&e.type===`element`&&e.tagName===`p`?n=e:(n={type:`element`,tagName:`p`,properties:{},children:[]},r.unshift(n)),n.children.length>0&&n.children.unshift({type:`text`,value:` `}),n.children.unshift({type:`element`,tagName:`input`,properties:{type:`checkbox`,checked:t.checked,disabled:!0},children:[]}),a.className=[`task-list-item`]}let s=-1;for(;++s<r.length;){let e=r[s];(i||s!==0||e.type!==`element`||e.tagName!==`p`)&&o.push({type:`text`,value:`
`}),e.type===`element`&&e.tagName===`p`&&!i?o.push(...e.children):o.push(e)}let c=r[r.length-1];c&&(i||c.type!==`element`||c.tagName!==`p`)&&o.push({type:`text`,value:`
`});let l={type:`element`,tagName:`li`,properties:a,children:o};return e.patch(t,l),e.applyData(t,l)}function Ai(e){let t=!1;if(e.type===`list`){t=e.spread||!1;let{children:n}=e,r=-1;for(;!t&&++r<n.length;)t=ji(n[r])}return t}function ji(e){let{spread:t}=e;return t??e.children.length>1}function Mi(e,t){let n={},r=e.all(t),i=-1;for(typeof t.start==`number`&&t.start!==1&&(n.start=t.start);++i<r.length;){let e=r[i];if(e.type===`element`&&e.tagName===`li`&&e.properties&&Array.isArray(e.properties.className)&&e.properties.className.includes(`task-list-item`)){n.className=[`contains-task-list`];break}}let a={type:`element`,tagName:t.ordered?`ol`:`ul`,properties:n,children:e.wrap(r,!0)};return e.patch(t,a),e.applyData(t,a)}function Ni(e,t){let n={type:`element`,tagName:`p`,properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function Pi(e,t){let n={type:`root`,children:e.wrap(e.all(t))};return e.patch(t,n),e.applyData(t,n)}function Fi(e,t){let n={type:`element`,tagName:`strong`,properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function Ii(e,t){let n=e.all(t),r=n.shift(),i=[];if(r){let n={type:`element`,tagName:`thead`,properties:{},children:e.wrap([r],!0)};e.patch(t.children[0],n),i.push(n)}if(n.length>0){let r={type:`element`,tagName:`tbody`,properties:{},children:e.wrap(n,!0)},a=Le(t.children[1]),o=Ie(t.children[t.children.length-1]);a&&o&&(r.position={start:a,end:o}),i.push(r)}let a={type:`element`,tagName:`table`,properties:{},children:e.wrap(i,!0)};return e.patch(t,a),e.applyData(t,a)}function Li(e,t,n){let r=n?n.children:void 0,i=(r?r.indexOf(t):1)===0?`th`:`td`,a=n&&n.type===`table`?n.align:void 0,o=a?a.length:t.children.length,s=-1,c=[];for(;++s<o;){let n=t.children[s],r={},o=a?a[s]:void 0;o&&(r.align=o);let l={type:`element`,tagName:i,properties:r,children:[]};n&&(l.children=e.all(n),e.patch(n,l),l=e.applyData(n,l)),c.push(l)}let l={type:`element`,tagName:`tr`,properties:{},children:e.wrap(c,!0)};return e.patch(t,l),e.applyData(t,l)}function Ri(e,t){let n={type:`element`,tagName:`td`,properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}var zi=9,Bi=32;function Vi(e){let t=String(e),n=/\r?\n|\r/g,r=n.exec(t),i=0,a=[];for(;r;)a.push(Hi(t.slice(i,r.index),i>0,!0),r[0]),i=r.index+r[0].length,r=n.exec(t);return a.push(Hi(t.slice(i),i>0,!1)),a.join(``)}function Hi(e,t,n){let r=0,i=e.length;if(t){let t=e.codePointAt(r);for(;t===zi||t===Bi;)r++,t=e.codePointAt(r)}if(n){let t=e.codePointAt(i-1);for(;t===zi||t===Bi;)i--,t=e.codePointAt(i-1)}return i>r?e.slice(r,i):``}function Ui(e,t){let n={type:`text`,value:Vi(String(t.value))};return e.patch(t,n),e.applyData(t,n)}function Wi(e,t){let n={type:`element`,tagName:`hr`,properties:{},children:[]};return e.patch(t,n),e.applyData(t,n)}var Gi={blockquote:hi,break:gi,code:_i,delete:vi,emphasis:yi,footnoteReference:bi,heading:xi,html:Si,imageReference:wi,image:Ti,inlineCode:Ei,linkReference:Di,link:Oi,listItem:ki,list:Mi,paragraph:Ni,root:Pi,strong:Fi,table:Ii,tableCell:Ri,tableRow:Li,text:Ui,thematicBreak:Wi,toml:Ki,yaml:Ki,definition:Ki,footnoteDefinition:Ki};function Ki(){}var{defineProperty:qi}=Object,Ji=typeof self==`object`?self:globalThis,Yi=(e,t)=>{switch(e){case`Function`:case`SharedWorker`:case`Worker`:case`eval`:case`setInterval`:case`setTimeout`:throw TypeError(`unable to deserialize `+e)}return new Ji[e](t)},Xi=(e,t)=>{let n=(t,n)=>(e.set(n,t),t),r=i=>{if(e.has(i))return e.get(i);let[a,o]=t[i];switch(a){case 0:case-1:return n(o,i);case 1:{let e=n([],i);for(let t of o)e.push(r(t));return e}case 2:{let e=n({},i);for(let[t,n]of o){let i=r(t),a=r(n);i===`__proto__`?qi(e,i,{value:a,configurable:!0,enumerable:!0,writable:!0}):e[i]=a}return e}case 3:return n(new Date(o),i);case 4:{let{source:e,flags:t}=o;return n(new RegExp(e,t),i)}case 5:{let e=n(new Map,i);for(let[t,n]of o)e.set(r(t),r(n));return e}case 6:{let e=n(new Set,i);for(let t of o)e.add(r(t));return e}case 7:{let{name:e,message:t}=o;return n(typeof Ji[e]==`function`?Yi(e,t):Error(t),i)}case 8:return n(BigInt(o),i);case`BigInt`:return n(Object(BigInt(o)),i);case`ArrayBuffer`:return n(new Uint8Array(o).buffer,o);case`DataView`:{let{buffer:e}=new Uint8Array(o);return n(new DataView(e),o)}case`-0`:return-0}return n(Yi(a,o),i)};return r},Zi=e=>Xi(new Map,e)(0),Qi=``,{toString:$i}={},{keys:ea,is:ta}=Object,na=e=>{let t=typeof e;if(t!==`object`||!e)return[0,t];let n=$i.call(e).slice(8,-1);switch(n){case`Array`:return[1,Qi];case`Object`:return[2,Qi];case`Date`:return[3,Qi];case`RegExp`:return[4,Qi];case`Map`:return[5,Qi];case`Set`:return[6,Qi];case`DataView`:return[1,n]}return n.includes(`Array`)?[1,n]:e instanceof Error?[7,e.name||`Error`]:[2,n]},ra=([e,t])=>e===0&&(t===`function`||t===`symbol`),ia=(e,t,n,r)=>{let i=(e,t)=>{let i=r.push(e)-1;return n.set(t,i),i},a=o=>{if(n.has(o))return n.get(o);let[s,c]=na(o);switch(s){case 0:{let t=o;switch(c){case`bigint`:s=8,t=o.toString();break;case`number`:if(!o&&ta(o,-0))return r.push([`-0`])-1;break;case`function`:case`symbol`:if(e)throw TypeError(`unable to serialize `+c);t=null;break;case`undefined`:return i([-1],o)}return i([s,t],o)}case 1:{if(c){let e=o;return c===`DataView`?e=new Uint8Array(o.buffer):c===`ArrayBuffer`&&(e=new Uint8Array(o)),i([c,[...e]],o)}let e=[],t=i([s,e],o);for(let t of o)e.push(a(t));return t}case 2:{if(c)switch(c){case`BigInt`:return i([c,o.toString()],o);case`Boolean`:case`Number`:case`String`:return i([c,o.valueOf()],o)}if(t&&`toJSON`in o)return a(o.toJSON());let n=[],r=i([s,n],o);for(let t of ea(o))(e||!ra(na(o[t])))&&n.push([a(t),a(o[t])]);return r}case 3:return i([s,isNaN(o.getTime())?Qi:o.toISOString()],o);case 4:{let{source:e,flags:t}=o;return i([s,{source:e,flags:t}],o)}case 5:{let t=[],n=i([s,t],o);for(let[n,r]of o)(e||!(ra(na(n))||ra(na(r))))&&t.push([a(n),a(r)]);return n}case 6:{let t=[],n=i([s,t],o);for(let n of o)(e||!ra(na(n)))&&t.push(a(n));return n}}let{message:l}=o;return i([s,{name:c,message:l}],o)};return a},aa=(e,{json:t,lossy:n}={})=>{let r=[];return ia(!(t||n),!!t,new Map,r)(e),r},oa=typeof structuredClone==`function`?(e,t)=>t&&(`json`in t||`lossy`in t)?Zi(aa(e,t)):structuredClone(e):(e,t)=>Zi(aa(e,t));function sa(e,t){let n=[{type:`text`,value:`↩`}];return t>1&&n.push({type:`element`,tagName:`sup`,properties:{},children:[{type:`text`,value:String(t)}]}),n}function ca(e,t){return`Back to reference `+(e+1)+(t>1?`-`+t:``)}function la(e){let t=typeof e.options.clobberPrefix==`string`?e.options.clobberPrefix:`user-content-`,n=e.options.footnoteBackContent||sa,r=e.options.footnoteBackLabel||ca,i=e.options.footnoteLabel||`Footnotes`,a=e.options.footnoteLabelTagName||`h2`,o=e.options.footnoteLabelProperties||{className:[`sr-only`]},s=[],c=[],l=-1;for(;++l<e.footnoteOrder.length;){let t=e.footnoteById.get(e.footnoteOrder[l]);t&&(s[l]=e.all(t))}for(l=-1;++l<e.footnoteOrder.length;){let i=e.footnoteById.get(e.footnoteOrder[l]);if(!i)continue;let a=s[l],o=String(i.identifier).toUpperCase(),u=Ht(o.toLowerCase()),d=0,f=[],p=e.footnoteCounts.get(o);for(;p!==void 0&&++d<=p;){f.length>0&&f.push({type:`text`,value:` `});let e=typeof n==`string`?n:n(l,d);typeof e==`string`&&(e={type:`text`,value:e}),f.push({type:`element`,tagName:`a`,properties:{href:`#`+t+`fnref-`+u+(d>1?`-`+d:``),dataFootnoteBackref:``,ariaLabel:typeof r==`string`?r:r(l,d),className:[`data-footnote-backref`]},children:Array.isArray(e)?e:[e]})}let m=a[a.length-1];if(m&&m.type===`element`&&m.tagName===`p`){let e=m.children[m.children.length-1];e&&e.type===`text`?e.value+=` `:m.children.push({type:`text`,value:` `}),m.children.push(...f)}else a.push(...f);let h={type:`element`,tagName:`li`,properties:{id:t+`fn-`+u},children:e.wrap(a,!0)};e.patch(i,h),c.push(h)}if(c.length!==0)return{type:`element`,tagName:`section`,properties:{dataFootnotes:!0,className:[`footnotes`]},children:[{type:`element`,tagName:a,properties:{...oa(o),id:`footnote-label`},children:[{type:`text`,value:i}]},{type:`text`,value:`
`},{type:`element`,tagName:`ol`,properties:{},children:e.wrap(c,!0)},{type:`text`,value:`
`}]}}var ua=(function(e){if(e==null)return ha;if(typeof e==`function`)return ma(e);if(typeof e==`object`)return Array.isArray(e)?da(e):fa(e);if(typeof e==`string`)return pa(e);throw Error(`Expected function, string, or object as test`)});function da(e){let t=[],n=-1;for(;++n<e.length;)t[n]=ua(e[n]);return ma(r);function r(...e){let n=-1;for(;++n<t.length;)if(t[n].apply(this,e))return!0;return!1}}function fa(e){let t=e;return ma(n);function n(n){let r=n,i;for(i in e)if(r[i]!==t[i])return!1;return!0}}function pa(e){return ma(t);function t(t){return t&&t.type===e}}function ma(e){return t;function t(t,n,r){return!!(ga(t)&&e.call(this,t,typeof n==`number`?n:void 0,r||void 0))}}function ha(){return!0}function ga(e){return typeof e==`object`&&!!e&&`type`in e}function _a(e){return e}var va=[],ya=`skip`;function ba(e,t,n,r){if(!e||typeof e!=`object`)throw Error("Unexpected value `"+e+"` for `tree`, expected node");let i=!0,a,o,s,c;if(typeof n==`function`||n&&typeof n==`object`?(a=t,o=n,r&&(i=!1)):(o=t,n&&(i=!1)),typeof o==`function`)s=o;else if(o&&typeof o==`object`){if(o.enter!==null&&o.enter!==void 0){if(typeof o.enter==`function`)s=o.enter;else throw Error("Unexpected value `"+o.enter+"` for `visitors.enter`, expected optional visitor")}if(typeof o.exit==`function`)c=o.exit;else throw Error("Unexpected value `"+o.exit+"` for `visitors.exit`, expected visitor (pass a visitor directly if you only want an enter visitor)")}else throw Error("Unexpected value `"+o+"` for `enter` or `visitors`, expected visitor or object with visitors");let l=ua(a),u=i?1:-1;d(e,void 0,[])();function d(e,t,n){let r=e&&typeof e==`object`?e:{};if(typeof r.type==`string`){let t=typeof r.tagName==`string`?r.tagName:typeof r.name==`string`?r.name:void 0;Object.defineProperty(o,"name",{value:`node (`+_a(e.type+(t?`<`+t+`>`:``))+`)`})}return o;function o(){let r=!a||l(e,t,n[n.length-1]||void 0),o=va;if(s&&r&&(o=xa(s(e,n,t)),o[0]===!1))return o;if(`children`in e&&e.children){let t=e;if(t.children&&o[0]!==`skip`){let e=(i?-1:t.children.length)+u,r=[...n,t];for(;e>-1&&e<t.children.length;){let n=t.children[e],i=d(n,e,r)();if(i[0]===!1)return i;e=typeof i[1]==`number`?i[1]:e+u}}}if(c&&r){let r=xa(c(e,n,t));if(r[0]===`skip`)throw Error("Unexpected value `"+r[0]+"` from `exit`, expected `CONTINUE`, `EXIT`, index, or nothing");if(r[0]===!1||typeof r[1]==`number`)return r}return o}}}function xa(e){return Array.isArray(e)?e:typeof e==`number`?[!0,e]:e==null?va:[e]}function Sa(e,t,n,r){let i,a,o;typeof n==`function`||n&&typeof n==`object`?(i=t,a=n,o=r):(a=t,o=n),typeof a==`function`?ba(e,i,wa(a),o):ba(e,i,Ca(a),o)}function Ca(e){return!e||typeof e!=`object`?e:{enter:typeof e.enter==`function`?wa(e.enter):e.enter,exit:typeof e.exit==`function`?wa(e.exit):e.exit}}function wa(e){return t;function t(t,n,r){return e(t,r,n[n.length-1])}}var Ta={}.hasOwnProperty,Ea={};function Da(e,t){let n=t||Ea,r=new Map,i=new Map,a={all:s,applyData:ka,definitionById:r,footnoteById:i,footnoteCounts:new Map,footnoteOrder:[],handlers:{...Gi,...n.handlers},one:o,options:n,patch:Oa,wrap:ja};return Sa(e,function(e){if(e.type===`definition`||e.type===`footnoteDefinition`){let t=String(e.identifier).toUpperCase();e.type===`definition`?r.has(t)||r.set(t,e):i.has(t)||i.set(t,e)}}),a;function o(e,t){let{type:n}=e,r=a.handlers[n];if(Ta.call(a.handlers,n)&&r)return r(a,e,t);if(a.options.passThrough&&a.options.passThrough.includes(n)){if(`children`in e){let{children:t,...n}=e;return{...oa(n),children:a.all(e)}}return oa(e)}return(a.options.unknownHandler||Aa)(a,e,t)}function s(e){let t=[];if(`children`in e){let n=e.children,r=-1;for(;++r<n.length;){let i=a.one(n[r],e);if(i){if(r&&n[r-1].type===`break`&&(!Array.isArray(i)&&i.type===`text`&&(i.value=Ma(i.value)),!Array.isArray(i)&&i.type===`element`)){let e=i.children[0];e&&e.type===`text`&&(e.value=Ma(e.value))}Array.isArray(i)?t.push(...i):t.push(i)}}}return t}}function Oa(e,t){e.position&&(t.position=ze(e))}function ka(e,t){let n=t;if(e&&e.data){let{hChildren:t,hName:r,hProperties:i}=e.data;typeof r==`string`&&(n.type===`element`?n.tagName=r:n={type:`element`,tagName:r,properties:{},children:`children`in n?n.children:[n]}),n.type===`element`&&i&&Object.assign(n.properties,oa(i)),`children`in n&&n.children&&t!=null&&(n.children=t)}return n}function Aa(e,t){let n=t.data||{},r=`value`in t&&!(Ta.call(n,`hProperties`)||Ta.call(n,`hChildren`))?{type:`text`,value:t.value}:{type:`element`,tagName:`div`,properties:{},children:e.all(t)};return e.patch(t,r),e.applyData(t,r)}function ja(e,t){let n=[],r=-1;for(t&&n.push({type:`text`,value:`
`});++r<e.length;)r&&n.push({type:`text`,value:`
`}),n.push(e[r]);return t&&e.length>0&&n.push({type:`text`,value:`
`}),n}function Ma(e){let t=0,n=e.charCodeAt(t);for(;n===9||n===32;)t++,n=e.charCodeAt(t);return e.slice(t)}function Na(e,t){let n=Da(e,t),r=n.one(e,void 0),i=la(n),a=Array.isArray(r)?{type:`root`,children:r}:r||{type:`root`,children:[]};return i&&(`children`in a,a.children.push({type:`text`,value:`
`},i)),a}function Pa(e,t){return e&&`run`in e?async function(n,r){let i=Na(n,{file:r,...t});await e.run(i,r)}:function(n,r){return Na(n,{file:r,...e||t})}}function Fa(e){if(e)throw e}var Ia=e(((e,t)=>{var n=Object.prototype.hasOwnProperty,r=Object.prototype.toString,i=Object.defineProperty,a=Object.getOwnPropertyDescriptor,o=function(e){return typeof Array.isArray==`function`?Array.isArray(e):r.call(e)===`[object Array]`},s=function(e){if(!e||r.call(e)!==`[object Object]`)return!1;var t=n.call(e,`constructor`),i=e.constructor&&e.constructor.prototype&&n.call(e.constructor.prototype,`isPrototypeOf`);if(e.constructor&&!t&&!i)return!1;for(var a in e);return a===void 0||n.call(e,a)},c=function(e,t){i&&t.name===`__proto__`?i(e,t.name,{enumerable:!0,configurable:!0,value:t.newValue,writable:!0}):e[t.name]=t.newValue},l=function(e,t){if(t===`__proto__`){if(!n.call(e,t))return;if(a)return a(e,t).value}return e[t]};t.exports=function e(){var t,n,r,i,a,u,d=arguments[0],f=1,p=arguments.length,m=!1;for(typeof d==`boolean`&&(m=d,d=arguments[1]||{},f=2),(d==null||typeof d!=`object`&&typeof d!=`function`)&&(d={});f<p;++f)if(t=arguments[f],t!=null)for(n in t)r=l(d,n),i=l(t,n),d!==i&&(m&&i&&(s(i)||(a=o(i)))?(a?(a=!1,u=r&&o(r)?r:[]):u=r&&s(r)?r:{},c(d,{name:n,newValue:e(m,u,i)})):i!==void 0&&c(d,{name:n,newValue:i}));return d}}));function La(e){if(typeof e!=`object`||!e)return!1;let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function Ra(){let e=[],t={run:n,use:r};return t;function n(...t){let n=-1,r=t.pop();if(typeof r!=`function`)throw TypeError(`Expected function as last argument, not `+r);i(null,...t);function i(a,...o){let s=e[++n],c=-1;if(a)r(a);else{for(;++c<t.length;)(o[c]===null||o[c]===void 0)&&(o[c]=t[c]);t=o,s?za(s,i)(...o):r(null,...o)}}}function r(n){if(typeof n!=`function`)throw TypeError("Expected `middelware` to be a function, not "+n);return e.push(n),t}}function za(e,t){let n;return r;function r(...t){let r=e.length>t.length,o;r&&t.push(i);try{o=e.apply(this,t)}catch(e){let t=e;if(r&&n)throw t;return i(t)}r||(o&&o.then&&typeof o.then==`function`?o.then(a,i):o instanceof Error?i(o):a(o))}function i(e,...r){n||(n=!0,t(e,...r))}function a(e){i(null,e)}}var J={basename:Ba,dirname:Va,extname:Ha,join:Ua,sep:`/`};function Ba(e,t){if(t!==void 0&&typeof t!=`string`)throw TypeError(`"ext" argument must be a string`);Ka(e);let n=0,r=-1,i=e.length,a;if(t===void 0||t.length===0||t.length>e.length){for(;i--;)if(e.codePointAt(i)===47){if(a){n=i+1;break}}else r<0&&(a=!0,r=i+1);return r<0?``:e.slice(n,r)}if(t===e)return``;let o=-1,s=t.length-1;for(;i--;)if(e.codePointAt(i)===47){if(a){n=i+1;break}}else o<0&&(a=!0,o=i+1),s>-1&&(e.codePointAt(i)===t.codePointAt(s--)?s<0&&(r=i):(s=-1,r=o));return n===r?r=o:r<0&&(r=e.length),e.slice(n,r)}function Va(e){if(Ka(e),e.length===0)return`.`;let t=-1,n=e.length,r;for(;--n;)if(e.codePointAt(n)===47){if(r){t=n;break}}else r||=!0;return t<0?e.codePointAt(0)===47?`/`:`.`:t===1&&e.codePointAt(0)===47?`//`:e.slice(0,t)}function Ha(e){Ka(e);let t=e.length,n=-1,r=0,i=-1,a=0,o;for(;t--;){let s=e.codePointAt(t);if(s===47){if(o){r=t+1;break}}else n<0&&(o=!0,n=t+1),s===46?i<0?i=t:a!==1&&(a=1):i>-1&&(a=-1)}return i<0||n<0||a===0||a===1&&i===n-1&&i===r+1?``:e.slice(i,n)}function Ua(...e){let t=-1,n;for(;++t<e.length;)Ka(e[t]),e[t]&&(n=n===void 0?e[t]:n+`/`+e[t]);return n===void 0?`.`:Wa(n)}function Wa(e){Ka(e);let t=e.codePointAt(0)===47,n=Ga(e,!t);return n.length===0&&!t&&(n=`.`),n.length>0&&e.codePointAt(e.length-1)===47&&(n+=`/`),t?`/`+n:n}function Ga(e,t){let n=``,r=0,i=-1,a=0,o=-1,s,c;for(;++o<=e.length;){if(o<e.length)s=e.codePointAt(o);else if(s===47)break;else s=47;if(s===47){if(i!==o-1&&a!==1){if(i!==o-1&&a===2){if(n.length<2||r!==2||n.codePointAt(n.length-1)!==46||n.codePointAt(n.length-2)!==46){if(n.length>2){if(c=n.lastIndexOf(`/`),c!==n.length-1){c<0?(n=``,r=0):(n=n.slice(0,c),r=n.length-1-n.lastIndexOf(`/`)),i=o,a=0;continue}}else if(n.length>0){n=``,r=0,i=o,a=0;continue}}t&&(n=n.length>0?n+`/..`:`..`,r=2)}else n.length>0?n+=`/`+e.slice(i+1,o):n=e.slice(i+1,o),r=o-i-1}i=o,a=0}else s===46&&a>-1?a++:a=-1}return n}function Ka(e){if(typeof e!=`string`)throw TypeError(`Path must be a string. Received `+JSON.stringify(e))}var qa={cwd:Ja};function Ja(){return`/`}function Ya(e){return!!(typeof e==`object`&&e&&`href`in e&&e.href&&`protocol`in e&&e.protocol&&e.auth===void 0)}function Xa(e){if(typeof e==`string`)e=new URL(e);else if(!Ya(e)){let t=TypeError('The "path" argument must be of type string or an instance of URL. Received `'+e+"`");throw t.code=`ERR_INVALID_ARG_TYPE`,t}if(e.protocol!==`file:`){let e=TypeError(`The URL must be of scheme file`);throw e.code=`ERR_INVALID_URL_SCHEME`,e}return Za(e)}function Za(e){if(e.hostname!==``){let e=TypeError(`File URL host must be "localhost" or empty on darwin`);throw e.code=`ERR_INVALID_FILE_URL_HOST`,e}let t=e.pathname,n=-1;for(;++n<t.length;)if(t.codePointAt(n)===37&&t.codePointAt(n+1)===50){let e=t.codePointAt(n+2);if(e===70||e===102){let e=TypeError(`File URL path must not include encoded / characters`);throw e.code=`ERR_INVALID_FILE_URL_PATH`,e}}return decodeURIComponent(t)}var Qa=[`history`,`path`,`basename`,`stem`,`extname`,`dirname`],$a=class{constructor(e){let t;t=e?Ya(e)?{path:e}:typeof e==`string`||ro(e)?{value:e}:e:{},this.cwd=`cwd`in t?``:qa.cwd(),this.data={},this.history=[],this.messages=[],this.value,this.map,this.result,this.stored;let n=-1;for(;++n<Qa.length;){let e=Qa[n];e in t&&t[e]!==void 0&&t[e]!==null&&(this[e]=e===`history`?[...t[e]]:t[e])}let r;for(r in t)Qa.includes(r)||(this[r]=t[r])}get basename(){return typeof this.path==`string`?J.basename(this.path):void 0}set basename(e){to(e,`basename`),eo(e,`basename`),this.path=J.join(this.dirname||``,e)}get dirname(){return typeof this.path==`string`?J.dirname(this.path):void 0}set dirname(e){no(this.basename,`dirname`),this.path=J.join(e||``,this.basename)}get extname(){return typeof this.path==`string`?J.extname(this.path):void 0}set extname(e){if(eo(e,`extname`),no(this.dirname,`extname`),e){if(e.codePointAt(0)!==46)throw Error("`extname` must start with `.`");if(e.includes(`.`,1))throw Error("`extname` cannot contain multiple dots")}this.path=J.join(this.dirname,this.stem+(e||``))}get path(){return this.history[this.history.length-1]}set path(e){Ya(e)&&(e=Xa(e)),to(e,`path`),this.path!==e&&this.history.push(e)}get stem(){return typeof this.path==`string`?J.basename(this.path,this.extname):void 0}set stem(e){to(e,`stem`),eo(e,`stem`),this.path=J.join(this.dirname||``,e+(this.extname||``))}fail(e,t,n){let r=this.message(e,t,n);throw r.fatal=!0,r}info(e,t,n){let r=this.message(e,t,n);return r.fatal=void 0,r}message(e,t,n){let r=new We(e,t,n);return this.path&&(r.name=this.path+`:`+r.name,r.file=this.path),r.fatal=!1,this.messages.push(r),r}toString(e){return this.value===void 0?``:typeof this.value==`string`?this.value:new TextDecoder(e||void 0).decode(this.value)}};function eo(e,t){if(e&&e.includes(J.sep))throw Error("`"+t+"` cannot be a path: did not expect `"+J.sep+"`")}function to(e,t){if(!e)throw Error("`"+t+"` cannot be empty")}function no(e,t){if(!e)throw Error("Setting `"+t+"` requires `path` to be set too")}function ro(e){return!!(e&&typeof e==`object`&&`byteLength`in e&&`byteOffset`in e)}var io=(function(e){let t=this.constructor.prototype,n=t[e],r=function(){return n.apply(r,arguments)};return Object.setPrototypeOf(r,t),r}),ao=n(Ia(),1),oo={}.hasOwnProperty,so=new class e extends io{constructor(){super(`copy`),this.Compiler=void 0,this.Parser=void 0,this.attachers=[],this.compiler=void 0,this.freezeIndex=-1,this.frozen=void 0,this.namespace={},this.parser=void 0,this.transformers=Ra()}copy(){let t=new e,n=-1;for(;++n<this.attachers.length;){let e=this.attachers[n];t.use(...e)}return t.data((0,ao.default)(!0,{},this.namespace)),t}data(e,t){return typeof e==`string`?arguments.length===2?(uo(`data`,this.frozen),this.namespace[e]=t,this):oo.call(this.namespace,e)&&this.namespace[e]||void 0:e?(uo(`data`,this.frozen),this.namespace=e,this):this.namespace}freeze(){if(this.frozen)return this;let e=this;for(;++this.freezeIndex<this.attachers.length;){let[t,...n]=this.attachers[this.freezeIndex];if(n[0]===!1)continue;n[0]===!0&&(n[0]=void 0);let r=t.call(e,...n);typeof r==`function`&&this.transformers.use(r)}return this.frozen=!0,this.freezeIndex=1/0,this}parse(e){this.freeze();let t=mo(e),n=this.parser||this.Parser;return co(`parse`,n),n(String(t),t)}process(e,t){let n=this;return this.freeze(),co(`process`,this.parser||this.Parser),lo(`process`,this.compiler||this.Compiler),t?r(void 0,t):new Promise(r);function r(r,i){let a=mo(e),o=n.parse(a);n.run(o,a,function(e,t,r){if(e||!t||!r)return s(e);let i=t,a=n.stringify(i,r);go(a)?r.value=a:r.result=a,s(e,r)});function s(e,n){e||!n?i(e):r?r(n):t(void 0,n)}}}processSync(e){let t=!1,n;return this.freeze(),co(`processSync`,this.parser||this.Parser),lo(`processSync`,this.compiler||this.Compiler),this.process(e,r),po(`processSync`,`process`,t),n;function r(e,r){t=!0,Fa(e),n=r}}run(e,t,n){fo(e),this.freeze();let r=this.transformers;return!n&&typeof t==`function`&&(n=t,t=void 0),n?i(void 0,n):new Promise(i);function i(i,a){let o=mo(t);r.run(e,o,s);function s(t,r,o){let s=r||e;t?a(t):i?i(s):n(void 0,s,o)}}}runSync(e,t){let n=!1,r;return this.run(e,t,i),po(`runSync`,`run`,n),r;function i(e,t){Fa(e),r=t,n=!0}}stringify(e,t){this.freeze();let n=mo(t),r=this.compiler||this.Compiler;return lo(`stringify`,r),fo(e),r(e,n)}use(e,...t){let n=this.attachers,r=this.namespace;if(uo(`use`,this.frozen),e!=null){if(typeof e==`function`)s(e,t);else if(typeof e==`object`)Array.isArray(e)?o(e):a(e);else throw TypeError("Expected usable value, not `"+e+"`")}return this;function i(e){if(typeof e==`function`)s(e,[]);else if(typeof e==`object`){if(Array.isArray(e)){let[t,...n]=e;s(t,n)}else a(e)}else throw TypeError("Expected usable value, not `"+e+"`")}function a(e){if(!(`plugins`in e)&&!(`settings`in e))throw Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");o(e.plugins),e.settings&&(r.settings=(0,ao.default)(!0,r.settings,e.settings))}function o(e){let t=-1;if(e!=null){if(Array.isArray(e))for(;++t<e.length;){let n=e[t];i(n)}else throw TypeError("Expected a list of plugins, not `"+e+"`")}}function s(e,t){let r=-1,i=-1;for(;++r<n.length;)if(n[r][0]===e){i=r;break}if(i===-1)n.push([e,...t]);else if(t.length>0){let[r,...a]=t,o=n[i][1];La(o)&&La(r)&&(r=(0,ao.default)(!0,o,r)),n[i]=[e,r,...a]}}}}().freeze();function co(e,t){if(typeof t!=`function`)throw TypeError("Cannot `"+e+"` without `parser`")}function lo(e,t){if(typeof t!=`function`)throw TypeError("Cannot `"+e+"` without `compiler`")}function uo(e,t){if(t)throw Error("Cannot call `"+e+"` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.")}function fo(e){if(!La(e)||typeof e.type!=`string`)throw TypeError("Expected node, got `"+e+"`")}function po(e,t,n){if(!n)throw Error("`"+e+"` finished async. Use `"+t+"` instead")}function mo(e){return ho(e)?e:new $a(e)}function ho(e){return!!(e&&typeof e==`object`&&`message`in e&&`messages`in e)}function go(e){return typeof e==`string`||_o(e)}function _o(e){return!!(e&&typeof e==`object`&&`byteLength`in e&&`byteOffset`in e)}var Y=i(),vo=n(p(),1),yo=[],bo={allowDangerousHtml:!0},xo=/^(https?|ircs?|mailto|xmpp)$/i,So=[{from:`astPlugins`,id:`remove-buggy-html-in-markdown-parser`},{from:`allowDangerousHtml`,id:`remove-buggy-html-in-markdown-parser`},{from:`allowNode`,id:`replace-allownode-allowedtypes-and-disallowedtypes`,to:`allowElement`},{from:`allowedTypes`,id:`replace-allownode-allowedtypes-and-disallowedtypes`,to:`allowedElements`},{from:`className`,id:`remove-classname`},{from:`disallowedTypes`,id:`replace-allownode-allowedtypes-and-disallowedtypes`,to:`disallowedElements`},{from:`escapeHtml`,id:`remove-buggy-html-in-markdown-parser`},{from:`includeElementIndex`,id:`#remove-includeelementindex`},{from:`includeNodeIndex`,id:`change-includenodeindex-to-includeelementindex`},{from:`linkTarget`,id:`remove-linktarget`},{from:`plugins`,id:`change-plugins-to-remarkplugins`,to:`remarkPlugins`},{from:`rawSourcePos`,id:`#remove-rawsourcepos`},{from:`renderers`,id:`change-renderers-to-components`,to:`components`},{from:`source`,id:`change-source-to-children`,to:`children`},{from:`sourcePos`,id:`#remove-sourcepos`},{from:`transformImageUri`,id:`#add-urltransform`,to:`urlTransform`},{from:`transformLinkUri`,id:`#add-urltransform`,to:`urlTransform`}];function Co(e){let t=wo(e),n=To(e);return Eo(t.runSync(t.parse(n),n),e)}function wo(e){let t=e.rehypePlugins||yo,n=e.remarkPlugins||yo,r=e.remarkRehypeOptions?{...e.remarkRehypeOptions,...bo}:bo;return so().use(mi).use(n).use(Pa,r).use(t)}function To(e){let t=e.children||``,n=new $a;return typeof t==`string`?n.value=t:``+t,n}function Eo(e,t){let n=t.allowedElements,r=t.allowElement,i=t.components,a=t.disallowedElements,o=t.skipHtml,s=t.unwrapDisallowed,c=t.urlTransform||Do;for(let e of So)Object.hasOwn(t,e.from)&&``+e.from+(e.to?"use `"+e.to+"` instead":`remove it`)+e.id;return Sa(e,l),Qe(e,{Fragment:Y.Fragment,components:i,ignoreInvalidStyle:!0,jsx:Y.jsx,jsxs:Y.jsxs,passKeys:!0,passNode:!0});function l(e,t,i){if(e.type===`raw`&&i&&typeof t==`number`)return o?i.children.splice(t,1):i.children[t]={type:`text`,value:e.value},t;if(e.type===`element`){let t;for(t in xt)if(Object.hasOwn(xt,t)&&Object.hasOwn(e.properties,t)){let n=e.properties[t],r=xt[t];(r===null||r.includes(e.tagName))&&(e.properties[t]=c(String(n||``),t,e))}}if(e.type===`element`){let o=n?!n.includes(e.tagName):a?a.includes(e.tagName):!1;if(!o&&r&&typeof t==`number`&&(o=!r(e,t,i)),o&&i&&typeof t==`number`)return s&&e.children?i.children.splice(t,1,...e.children):i.children.splice(t,1),t}}}function Do(e){let t=e.indexOf(`:`),n=e.indexOf(`?`),r=e.indexOf(`#`),i=e.indexOf(`/`);return t===-1||i!==-1&&t>i||n!==-1&&t>n||r!==-1&&t>r||xo.test(e.slice(0,t))?e:``}function Oo(e,t){let n=String(e);if(typeof t!=`string`)throw TypeError(`Expected character`);let r=0,i=n.indexOf(t);for(;i!==-1;)r++,i=n.indexOf(t,i+t.length);return r}function ko(e){if(typeof e!=`string`)throw TypeError(`Expected a string`);return e.replace(/[|\\{}()[\]^$+*?.]/g,`\\$&`).replace(/-/g,`\\x2d`)}function Ao(e,t,n){let r=ua((n||{}).ignore||[]),i=jo(t),a=-1;for(;++a<i.length;)ba(e,o);function o(e,t,n){if(e.type===`text`&&typeof n==`number`)return s(e,t,n);if(r(e,n,t[t.length-1]))return ya}function s(e,t,n){let r=t[t.length-1],o=i[a][0],s=i[a][1],c=0,l=!1,u=[];o.lastIndex=0;let d=o.exec(e.value);for(;d;){let n=d.index,r={index:d.index,input:d.input,stack:[...t,e]},i=s(...d,r);if(typeof i==`string`&&(i=i.length>0?{type:`text`,value:i}:void 0),i!==!1){if(c!==n&&f({type:`text`,value:e.value.slice(c,n)}),Array.isArray(i))for(let e of i)f(e);else i&&f(i);c=n+d[0].length,l=!0}if(i===!1||d[0].length===0){let t=e.value.codePointAt(n)||0;o.lastIndex=n+(/[uv]/.test(o.flags)&&t>65535?2:1)}if(!o.global)break;d=o.exec(e.value)}return l?(c<e.value.length&&f({type:`text`,value:e.value.slice(c)}),r.children.splice(n,1,...u)):u=[e],n+u.length;function f(e){let t=u[u.length-1];t&&t.type===`text`&&e.type===`text`?t.value+=e.value:u.push(e)}}}function jo(e){if(!Array.isArray(e))throw TypeError(`Expected find and replace tuple or list of tuples`);let t=[],n=!e[0]||Array.isArray(e[0])?e:[e],r=-1;for(;++r<n.length;){let e=n[r];t.push([Mo(e[0]),No(e[1])])}return t}function Mo(e){return typeof e==`string`?new RegExp(ko(e),`g`):e}function No(e){return typeof e==`function`?e:function(){return e}}var Po=`phrasing`,Fo=[`autolink`,`link`,`image`,`label`];function Io(){return{transforms:[Wo],enter:{literalAutolink:Ro,literalAutolinkEmail:zo,literalAutolinkHttp:zo,literalAutolinkWww:zo},exit:{literalAutolink:Uo,literalAutolinkEmail:Ho,literalAutolinkHttp:Bo,literalAutolinkWww:Vo}}}function Lo(){return{unsafe:[{character:`@`,before:`[+\\-.\\w]`,after:`[\\-.\\w]`,inConstruct:Po,notInConstruct:Fo},{character:`.`,before:`[Ww]{3}`,inConstruct:Po,notInConstruct:Fo},{character:`:`,before:`[PSps]`,after:`\\/`,inConstruct:Po,notInConstruct:Fo}]}}function Ro(e){this.enter({type:`link`,title:null,url:``,children:[],position:void 0},e)}function zo(e){this.config.enter.autolinkProtocol.call(this,e)}function Bo(e){this.config.exit.autolinkProtocol.call(this,e)}function Vo(e){this.config.exit.data.call(this,e);let t=this.stack[this.stack.length-1];t.type,t.url=`http://`+this.sliceSerialize(e)}function Ho(e){this.config.exit.autolinkEmail.call(this,e)}function Uo(e){this.exit(e)}function Wo(e){Ao(e,[[/(?<![\da-z])(https?:\/\/|www(?=\.))([\w-]*\.[\w\-.]*)([^\t\n\r ]*)/gi,Go],[/(?<![\w+\-.@])xmpp:([\w+\-.]+)@([\w-]+(?:\.[\w-]+)+)(\/(?:[\w\-/]|\.(?=[\dA-Za-z]))*)?/g,Jo],[/(?<![\w+\-.@])mailto:([\w+\-.]+)@([\w-]+(?:\.[\w-]+)+)/g,qo],[/(?<![\w+\-.]|(?:^|[^\d@A-Za-z])(?:mailto|xmpp):)([\w+\-.]+)@([\w-]+(?:\.[\w-]+)+)/g,Ko]],{ignore:[`link`,`linkReference`]})}function Go(e,t,n,r,i){if(!Zo(i))return!1;let a=``;if(/^w/i.test(t)&&(n=t+n,t=``,a=`http://`),zt(n.charCodeAt(0))||!Yo(n))return!1;let o=Xo(n+r),s={type:`link`,title:null,url:a+t+o[0],children:[{type:`text`,value:t+o[0],position:void 0}],position:void 0};return o[1]?[s,{type:`text`,value:o[1],position:void 0}]:s}function Ko(e,t,n){return!/[\d\-_]$/.test(n)&&{type:`link`,title:null,url:`mailto:`+t+`@`+n,children:[{type:`text`,value:t+`@`+n,position:void 0}],position:void 0}}function qo(e,t,n){if(/[\d\-_]$/.test(n))return!1;let r=`mailto:`+t+`@`+n;return{type:`link`,title:null,url:r,children:[{type:`text`,value:r,position:void 0}],position:void 0}}function Jo(e,t,n,r,i){if(/[\d\-_]$/.test(n)||r&&(!/[A-Za-z]$/.test(r)||i.input.charAt(i.index+e.length)===`@`))return!1;let a=`xmpp:`+t+`@`+n+(r||``);return{type:`link`,title:null,url:a,children:[{type:`text`,value:a,position:void 0}],position:void 0}}function Yo(e){let t=e.split(`.`);return!(t.length<2||t[t.length-1]&&(/_/.test(t[t.length-1])||!/[\dA-Za-z]/.test(t[t.length-1]))||t[t.length-2]&&(/_/.test(t[t.length-2])||!/[\dA-Za-z]/.test(t[t.length-2])))}function Xo(e){let t=e.length;for(;t>0;){let n=e.charCodeAt(t-1);if(n===33||n===34||n===38||n===39||n===41||n===44||n===46||n===58||n===59||n===60||n===62||n===63||n===93||n===125)t--;else break}if(t===e.length)return[e,void 0];let n=e.slice(t);e=e.slice(0,t);let r=n.indexOf(`)`),i=Oo(e,`(`),a=Oo(e,`)`);for(;r!==-1&&i>a;)e+=n.slice(0,r+1),n=n.slice(r+1),r=n.indexOf(`)`),a++;return[e,n]}function Zo(e){let t=e.input.charCodeAt(e.index-1);return e.index===0||Bt(t)||zt(t)}ss.peek=os;function Qo(){this.buffer()}function $o(e){this.enter({type:`footnoteReference`,identifier:``,label:``},e)}function es(){this.buffer()}function ts(e){this.enter({type:`footnoteDefinition`,identifier:``,label:``,children:[]},e)}function ns(e){let t=this.resume(),n=this.stack[this.stack.length-1];n.type,n.identifier=z(this.sliceSerialize(e)).toLowerCase(),n.label=t}function rs(e){this.exit(e)}function is(e){let t=this.resume(),n=this.stack[this.stack.length-1];n.type,n.identifier=z(this.sliceSerialize(e)).toLowerCase(),n.label=t}function as(e){this.exit(e)}function os(){return`[`}function ss(e,t,n,r){let i=n.createTracker(r),a=i.move(`[^`),o=n.enter(`footnoteReference`),s=n.enter(`reference`);return a+=i.move(n.safe(n.associationId(e),{after:`]`,before:a})),s(),o(),a+=i.move(`]`),a}function cs(){return{enter:{gfmFootnoteCallString:Qo,gfmFootnoteCall:$o,gfmFootnoteDefinitionLabelString:es,gfmFootnoteDefinition:ts},exit:{gfmFootnoteCallString:ns,gfmFootnoteCall:rs,gfmFootnoteDefinitionLabelString:is,gfmFootnoteDefinition:as}}}function ls(e){let t=!1;return e&&e.firstLineBlank&&(t=!0),{handlers:{footnoteDefinition:n,footnoteReference:ss},unsafe:[{character:`[`,inConstruct:[`label`,`phrasing`,`reference`]}]};function n(e,n,r,i){let a=r.createTracker(i),o=a.move(`[^`),s=r.enter(`footnoteDefinition`),c=r.enter(`label`);return o+=a.move(r.safe(r.associationId(e),{before:o,after:`]`})),c(),o+=a.move(`]:`),e.children&&e.children.length>0&&(a.shift(4),o+=a.move((t?`
`:` `)+r.indentLines(r.containerFlow(e,a.current()),t?ds:us))),s(),o}}function us(e,t,n){return t===0?e:ds(e,t,n)}function ds(e,t,n){return(n?``:`    `)+e}var fs=[`autolink`,`destinationLiteral`,`destinationRaw`,`reference`,`titleQuote`,`titleApostrophe`];_s.attention=vs,_s.peek=ys;function ps(){return{canContainEols:[`delete`],enter:{strikethrough:hs},exit:{strikethrough:gs}}}function ms(){return{handlers:{delete:_s},unsafe:[{character:`~`,inConstruct:`phrasing`,notInConstruct:fs}]}}function hs(e){this.enter({type:`delete`,children:[],position:void 0},e)}function gs(e){this.exit(e)}function _s(e,t,n,r){let i=n.createTracker(r),a=n.stack.includes(`strikethrough`)?`~`:`~~`,o=n.enter(`strikethrough`),s=i.move(a);return s+=n.containerPhrasing(e,{...i.current(),before:s,after:`~`}),s+=i.move(a),o(),s}function vs(){return{construct:`strikethrough`,markers:[`~`],sizes:[2,1]}}function ys(){return`~`}function bs(e){return e.length}function xs(e,t){let n=t||{},r=(n.align||[]).concat(),i=n.stringLength||bs,a=[],o=[],s=[],c=[],l=0,u=-1;for(;++u<e.length;){let t=[],r=[],a=-1;for(e[u].length>l&&(l=e[u].length);++a<e[u].length;){let o=Ss(e[u][a]);if(n.alignDelimiters!==!1){let e=i(o);r[a]=e,(c[a]===void 0||e>c[a])&&(c[a]=e)}t.push(o)}o[u]=t,s[u]=r}let d=-1;if(typeof r==`object`&&`length`in r)for(;++d<l;)a[d]=Cs(r[d]);else{let e=Cs(r);for(;++d<l;)a[d]=e}d=-1;let f=[],p=[];for(;++d<l;){let e=a[d],t=``,r=``;e===99?(t=`:`,r=`:`):e===108?t=`:`:e===114&&(r=`:`);let i=n.alignDelimiters===!1?1:Math.max(1,c[d]-t.length-r.length),o=t+`-`.repeat(i)+r;n.alignDelimiters!==!1&&(i=t.length+i+r.length,i>c[d]&&(c[d]=i),p[d]=i),f[d]=o}o.splice(1,0,f),s.splice(1,0,p),u=-1;let m=[];for(;++u<o.length;){let e=o[u],t=s[u],r=n.fillRows===!1?Math.max(1,o[u===1?0:u].length):l;d=-1;let i=[];for(;++d<r;){let o=e[d]||``,s=``,l=``;if(n.alignDelimiters!==!1){let e=c[d]-(t[d]||0),n=a[d];if(n===114)s=` `.repeat(e);else if(n===99){let t=e/2;e%2?(s=` `.repeat(t+.5),l=` `.repeat(t-.5)):(s=` `.repeat(t),l=s)}else l=` `.repeat(e)}n.delimiterStart!==!1&&!d&&i.push(`|`),n.padding===!1||n.alignDelimiters===!1&&o===``||n.delimiterStart===!1&&!d||i.push(` `),n.alignDelimiters!==!1&&i.push(s),i.push(o),n.alignDelimiters!==!1&&i.push(l),n.padding!==!1&&i.push(` `),(n.delimiterEnd!==!1||d!==r-1)&&i.push(`|`)}m.push(n.delimiterEnd===!1?i.join(``).replace(/ +$/,``):i.join(``))}return m.join(`
`)}function Ss(e){return e==null?``:String(e)}function Cs(e){let t=typeof e==`string`?e.codePointAt(0):0;return t===67||t===99?99:t===76||t===108?108:t===82||t===114?114:0}var ws=ua([`break`,`delete`,`emphasis`,`footnote`,`footnoteReference`,`image`,`imageReference`,`inlineCode`,`inlineMath`,`link`,`linkReference`,`mdxJsxTextElement`,`mdxTextExpression`,`strong`,`text`,`textDirective`]);function Ts(e,t,n,r){let i=n.enter(`blockquote`),a=n.createTracker(r);a.move(`> `),a.shift(2);let o=n.indentLines(n.containerFlow(e,a.current()),Es);return i(),o}function Es(e,t,n){return`>`+(n?``:` `)+e}function Ds(e,t){return Os(e,t.inConstruct,!0)&&!Os(e,t.notInConstruct,!1)}function Os(e,t,n){if(typeof t==`string`&&(t=[t]),!t||t.length===0)return n;let r=-1;for(;++r<t.length;)if(e.includes(t[r]))return!0;return!1}function ks(e,t,n,r){let i=-1;for(;++i<n.unsafe.length;){let e=n.unsafe[i];if(e.character===`
`&&!e.before&&!e.after&&Ds(n.stack,e))return/[\t ]/.test(r.before)?``:` `}return`\\
`}function As(e,t){let n=String(e),r=n.indexOf(t),i=r,a=0,o=0;if(typeof t!=`string`)throw TypeError(`Expected substring`);for(;r!==-1;)r===i?++a>o&&(o=a):a=1,i=r+t.length,r=n.indexOf(t,i);return o}function js(e,t){return!(t.options.fences!==!1||!e.value||e.lang||!/[^\n\r ]/.test(e.value)||/^[\t ]*(?:[\n\r]|$)|(?:^|[\n\r])[\t ]*$/.test(e.value))}function Ms(e){let t=e.options.fence||"`";if(t!=="`"&&t!==`~`)throw Error("Cannot serialize code with `"+t+"` for `options.fence`, expected `` ` `` or `~`");return t}function Ns(e,t,n,r){let i=Ms(n),a=e.value||``;if(js(e,n)){let e=n.enter(`codeIndented`),t=n.indentLines(a,Ps);return e(),t}let o=n.createTracker(r),s=i.repeat(Math.max(As(a,i)+1,3)),c=n.enter(`codeFenced`),l=i==="`"?`GraveAccent`:`Tilde`,u=o.move(s);if(e.lang){let t=n.enter(`codeFencedLang${l}`);u+=o.move(n.safe(e.lang,{before:u,after:` `,encode:["`"],...o.current()})),t()}if(e.lang&&e.meta){let t=n.enter(`codeFencedMeta${l}`);u+=o.move(` `),u+=o.move(n.safe(e.meta,{before:u,after:`
`,encode:["`"],...o.current()})),t()}return u+=o.move(`
`),a&&(u+=o.move(a+`
`)),u+=o.move(s),c(),u}function Ps(e,t,n){return(n?``:`    `)+e}function Fs(e){let t=e.options.quote||`"`;if(t!==`"`&&t!==`'`)throw Error("Cannot serialize title with `"+t+"` for `options.quote`, expected `\"`, or `'`");return t}function Is(e,t,n,r){let i=Fs(n),a=i===`"`?`Quote`:`Apostrophe`,o=n.enter(`definition`),s=n.enter(`label`),c=n.createTracker(r),l=c.move(`[`);return l+=c.move(n.safe(n.associationId(e),{before:l,after:`]`,...c.current()})),l+=c.move(`]: `),s(),!e.url||/^<|[\0- \u007F]/.test(e.url)?(s=n.enter(`destinationLiteral`),l+=c.move(`<`),l+=c.move(n.safe(e.url,{before:l,after:`>`,...c.current()})),l+=c.move(`>`)):(s=n.enter(`destinationRaw`),l+=c.move(n.safe(e.url,{before:l,after:e.title?` `:`
`,...c.current()}))),s(),e.title&&(s=n.enter(`title${a}`),l+=c.move(` `+i),l+=c.move(n.safe(e.title,{before:l,after:i,...c.current()})),l+=c.move(i),s()),o(),l}function Ls(e){let t=e.options.emphasis||`*`;if(t!==`*`&&t!==`_`)throw Error("Cannot serialize emphasis with `"+t+"` for `options.emphasis`, expected `*`, or `_`");return t}function Rs(e){let t=e.codePointAt(0);return t===void 0?``:String.fromCodePoint(t)}function zs(e){let t=e.codePointAt(e.length-2);return t!==void 0&&t>65535?e.slice(-2):e.slice(-1)}function Bs(e){return`&#x`+e.toString(16).toUpperCase()+`;`}function Vs(e,t,n){let r=K(e),i=K(t);return r===void 0?i===void 0?n===`_`?{inside:!0,outside:!0}:{inside:!1,outside:!1}:i===1?{inside:!0,outside:!0}:{inside:!1,outside:!0}:r===1?i===void 0?{inside:!1,outside:!1}:i===1?{inside:!0,outside:!0}:{inside:!1,outside:!1}:i===void 0?{inside:!1,outside:!1}:i===1?{inside:!0,outside:!1}:{inside:!1,outside:!1}}function Hs(e){if(e.charCodeAt(0)!==60)return;let t=e.charCodeAt(1);if(t===33){let t=e.charCodeAt(2);return t===45?2:t===91?5:B(t)?4:void 0}if(t===63)return 3;let n=t===47,r=n?2:1,i=r,a=e.charCodeAt(i);if(!B(a))return;for(;a===45||V(a);)a=e.charCodeAt(++i);let o=e.slice(r,i).toLowerCase();return!n&&a!==47&&Zn.includes(o)?1:Xn.includes(o)?6:7}var Us=new Map([[`*`,!1],[`_`,!0]]);function Ws(e,t,n){let r=new Set;for(let i of e){let e=n.get(i);if(e&&i.attention&&t.some(e=>e.attention===i.attention))for(let t of e.tokens)r.add(t.attention)}let i=[];for(let t of e)t.attention&&r.delete(t.attention)&&i.push(t.attention);return i.reverse(),i}function Gs(e,t,n){let r=[],i=new Map,a=new Map,o=0;for(;o<e.length;){if(!e[o].attention){o++;continue}let s=e[o].value.charAt(0),c=Us.get(s),l=o+1;for(;l<e.length&&e[l].attention&&e[l].value.charAt(0)===s;)l++;let u=o?e[o-1].value:t,d=K(u.charCodeAt(u.length-1)),f=K((l<e.length?e[l].value:n).charCodeAt(0)),p=!f||f===2&&!!d,m=!d||d===2&&!!f,h={tokens:e.slice(o,l),markers:[],start:0,end:0,open:c?p&&(!!d||!m):p,close:c?m&&(!!f||!p):m,split:c!==void 0};for(let e of h.tokens){i.set(e,[...h.tokens]),a.set(e,h);let t=e.value.length;for(;t--;)h.markers.push(e)}h.end=h.markers.length,r.push(h),o=l}for(Js(r,i),o=-1;++o<e.length;){let t=i.get(e[o]);if(t)return{attention:Ws(e,t,a),index:o}}}function Ks(e,t){let n=e[t?0:e.length-1];if(!n||n.attention)return;let r=t?Rs(n.value):zs(n.value),i=Bs(r.codePointAt(0));if(t)n.value=i+n.value.slice(r.length);else{let e=n.value.slice(0,n.value.length-r.length),t=0;for(;e.charCodeAt(e.length-1-t)===92;)t++;t%2&&(e+=`\\`),n.value=e+i}}function qs(e,t,n,r,i){for(let a of n.attention){let o=t.get(a)||a.sequences[0];for(let s of a.sequences){if(s===o)continue;let c=new Map(t);c.set(a,s);let l=ec(e,c,r,i),u=Gs(l,r,i);if(!u||u.index>n.index)return{chosen:c,mistake:u,tokens:l}}}}function Js(e,t){let n=new Map;for(let r of e){let e=r.tokens[0].value.charAt(0),i=n.get(e);i||(i=[],n.set(e,i));let a=r.close?i.length:0;for(;a--&&r.start<r.end;){let e=i[a],n=e.end-e.start,o=r.end-r.start;if(r.split?(e.close||r.open)&&o%3&&!((n+o)%3):n!==e.markers.length||n!==o)continue;let s=r.split?n>1&&o>1?2:1:o,c=e.markers.slice(e.end-s,e.end),l=r.markers.slice(r.start,r.start+s),u=c[0],d=l[0];if(u===c[s-1]&&u.value.length===s&&d===l[s-1]&&d.value.length===s&&u.attention===d.attention)t.delete(u),t.delete(d);else{let e=[...new Set([...c,...l])];for(let n of e){let r=t.get(n);r&&r.push(...e)}}e.end-=s,r.start+=s,e.start===e.end&&i.splice(a,1),a=i.length}r.open&&r.start<r.end&&i.push(r)}}function Ys(e,t,n){if(t.length===0)throw Error("Cannot serialize `"+e+"` as attention without markers, expected one or more markers");if(n.length===0)throw Error("Cannot serialize `"+e+"` as attention without sizes, expected one or more sizes");for(let t of n)if(!Number.isSafeInteger(t)||t<1)throw Error("Cannot serialize `"+e+"` as attention with `"+t+"` as size, expected positive integer");let r=[];for(let i of t){if(i.length!==1)throw Error("Cannot serialize `"+e+"` as attention with `"+i+"` as marker, expected a single ascii character");if(!Rt(i.charCodeAt(0)))throw Error("Cannot serialize `"+e+"` as attention with `"+i+"` as marker, expected ascii punctuation");for(let e of n)r.push(i.repeat(e))}return r}function Xs(e,t,n){let r=t.indexStack,i=e.children||[],a=[],o=-1,s=n.before;r.push(-1);let c=t.createTracker(n);for(;++o<i.length;){let l=i[o],u;if(r[r.length-1]=o,o+1<i.length){let n=t.handle.handlers[i[o+1].type];n&&n.peek&&(n=n.peek),u=n?Rs(n(i[o+1],e,t,{before:``,after:``,...c.current()})):``}else u=n.after;let d=a[a.length-1];typeof d==`string`&&(s===`\r`||s===`
`)&&l.type===`html`&&Hs(l.value)!==7&&(a[a.length-1]=d.replace(/(\r?\n|\r)$/,` `),s=` `,c=t.createTracker(n),c.move(tc(a,n.before,n.after)));let f=t.handle.handlers[l.type];if(f&&f.attention){let e=Zs(l,f.attention,t,c);if(!e)continue;a.push(e),s=zs(e.sequences[0])}else{let n=t.handle(l,e,t,{...c.current(),after:u,before:s});if(!n)continue;c.move(n),a.push(n),s=zs(n)}}return r.pop(),a}function Zs(e,t,n,r){let{construct:i,markers:a,sizes:o}=t(e,n),s=Ys(e.type,a,o),c=s[0],l=n.enter(i),u=n.createTracker(r.current());u.move(c);let d=Xs(e,n,{...u.current(),before:c,after:c});if(l(),d.length!==0)return r.move(c),r.move(tc(d,c,c)),r.move(c),{children:d,sequences:s}}function Qs(e,t,n,r){let i=ec(e,t,n,r),a=Gs(i,n,r);for(;a;){let o=qs(e,t,a,n,r);if(!o)return;t=o.chosen,i=o.tokens,a=o.mistake}return i}function $s(e,t,n,r){let i=n,a=-1;for(;++a<e.length;){let o=e[a];if(typeof o==`string`){i=``;continue}let s=a===e.length-1?r:``,c=o.sequences.find(function(t){let r=t.charAt(0);return r!==i.charAt(0)&&r!==s.charAt(0)||e.length===1&&Us.has(r)&&t.length>n.length})||o.sequences[0];c!==o.sequences[0]&&t.set(o,c),$s(o.children,t,c,c),i=c}}function ec(e,t,n,r){let i=[],a,o=zs(n),s=-1;for(;++s<e.length;){let n=e[s];if(typeof n==`string`){let e={value:n,attention:void 0};a&&a===Rs(n)&&Ks([e],!0),a=void 0,i.push(e),e.value&&(o=zs(e.value));continue}let c=t.get(n)||n.sequences[0],l=c.charAt(0),u=e[s+1],d=o,f=Rs(u===void 0?r:typeof u==`string`?u:t.get(u)||u.sequences[0]),p=ec(n.children,t,c,c),m=p[0].value,h=Vs(d.charCodeAt(d.length-1),m.charCodeAt(0),l);h.inside&&Ks(p,!0);let g=zs(p[p.length-1].value),_=Vs(f.charCodeAt(0),g.charCodeAt(g.length-1),l);_.inside&&Ks(p,!1),h.outside&&d!==`
`&&d!==`\r`&&Ks(i,!1),_.outside&&(a=f),i.push({value:c,attention:n},...p,{value:c,attention:n}),o=c.charAt(c.length-1)}return i}function tc(e,t,n){let r=new Map;$s(e,r,t,n);let i=(r.size>0?Qs(e,r,t,n):void 0)||Qs(e,new Map,t,n)||ec(e,new Map,t,n),a=``;for(let e of i)a+=e.value;return a}nc.attention=rc,nc.peek=ic;function nc(e,t,n,r){let i=n.enter(`phrasing`),a=Zs(e,rc,n,n.createTracker(r)),o=a?tc([a],r.before,r.after):``;return i(),o}function rc(e,t){return{construct:`emphasis`,markers:Ls(t)===`*`?[`*`,`_`]:[`_`,`*`],sizes:[1]}}function ic(e,t,n){return n.options.emphasis||`*`}function ac(e,t){let n=!1;return Sa(e,function(e){if(`value`in e&&/\r?\n|\r/.test(e.value)||e.type===`break`)return n=!0,!1}),!!((!e.depth||e.depth<3)&&Ct(e)&&(t.options.setext||n))}function oc(e,t,n,r){let i=Math.max(Math.min(6,e.depth||1),1),a=n.createTracker(r);if(ac(e,n)){let t=n.enter(`headingSetext`),r=n.enter(`phrasing`),o=n.containerPhrasing(e,{...a.current(),before:`
`,after:`
`});return r(),t(),o+`
`+(i===1?`=`:`-`).repeat(o.length-(Math.max(o.lastIndexOf(`\r`),o.lastIndexOf(`
`))+1))}let o=`#`.repeat(i),s=n.enter(`headingAtx`),c=n.enter(`phrasing`);a.move(o+` `);let l=n.containerPhrasing(e,{before:`# `,after:`
`,...a.current()}),u=l.charCodeAt(0);return(u===9||u===32)&&(l=Bs(u)+l.slice(1)),l=l?o+` `+l:o,n.options.closeAtx&&(l+=` `+o),c(),s(),l}sc.peek=cc;function sc(e){return e.value||``}function cc(){return`<`}lc.peek=uc;function lc(e,t,n,r){let i=Fs(n),a=i===`"`?`Quote`:`Apostrophe`,o=n.enter(`image`),s=n.enter(`label`),c=n.createTracker(r),l=c.move(`![`);return l+=c.move(n.safe(e.alt,{before:l,after:`]`,...c.current()})),l+=c.move(`](`),s(),!e.url&&e.title||/^<|[\0- \u007F]/.test(e.url)?(s=n.enter(`destinationLiteral`),l+=c.move(`<`),l+=c.move(n.safe(e.url,{before:l,after:`>`,...c.current()})),l+=c.move(`>`)):(s=n.enter(`destinationRaw`),l+=c.move(n.safe(e.url,{before:l,after:e.title?` `:`)`,...c.current()}))),s(),e.title&&(s=n.enter(`title${a}`),l+=c.move(` `+i),l+=c.move(n.safe(e.title,{before:l,after:i,...c.current()})),l+=c.move(i),s()),l+=c.move(`)`),o(),l}function uc(){return`!`}dc.peek=fc;function dc(e,t,n,r){let i=e.referenceType,a=n.enter(`imageReference`),o=n.enter(`label`),s=n.createTracker(r),c=s.move(`![`),l=n.safe(e.alt,{before:c,after:`]`,...s.current()});c+=s.move(l+`][`),o();let u=n.stack;n.stack=u.filter(function(e){return e!==`phrasing`}),o=n.enter(`reference`);let d=n.safe(n.associationId(e),{before:c,after:`]`,...s.current()});return o(),n.stack=u,a(),i===`full`||!l||l!==d?c+=s.move(d+`]`):i===`shortcut`?c=c.slice(0,-1):c+=s.move(`]`),c}function fc(){return`!`}pc.peek=mc;function pc(e,t,n){let r=e.value||``,i="`",a=-1;for(;RegExp("(^|[^`])"+i+"([^`]|$)").test(r);)i+="`";for(/[^\n\r ]/.test(r)&&(/^[\n\r ]/.test(r)&&/[\n\r ]$/.test(r)||/^`|`$/.test(r))&&(r=` `+r+` `);++a<n.unsafe.length;){let e=n.unsafe[a],t=n.compilePattern(e);if(!e.atBreak)continue;let i;for(;i=t.exec(r);){let e=i.index;r.charCodeAt(e)===10&&r.charCodeAt(e-1)===13&&e--,r=r.slice(0,e)+` `+r.slice(i.index+1)}}return i+r+i}function mc(){return"`"}function hc(e,t){let n=Ct(e);return!(t.options.resourceLink||!e.url||e.title||!e.children||e.children.length!==1||e.children[0].type!==`text`||n!==e.url&&`mailto:`+n!==e.url||!/^[a-z][+\-.a-z]+:/i.test(e.url)||/[\0- <>\u007F]/.test(e.url))}gc.peek=_c;function gc(e,t,n,r){let i=Fs(n),a=i===`"`?`Quote`:`Apostrophe`,o=n.createTracker(r);if(hc(e,n)){let t=n.stack;n.stack=t.filter(function(e){return e!==`phrasing`});let r=n.enter(`autolink`),i=o.move(`<`);return i+=o.move(n.containerPhrasing(e,{before:i,after:`>`,...o.current()})),i+=o.move(`>`),r(),n.stack=t,i}let s=n.enter(`link`),c=n.enter(`label`),l=o.move(`[`),u=n.containerPhrasing(e,{before:l,after:`](`,...o.current()});l+=o.move(u),c(),l+=o.move(`](`);let d=/^<|[\0- \u007F]/.test(e.url),f=r.before.charAt(r.before.length-1),p=e.title||void 0;if(!p&&!d&&(f===`
`||f===`\r`)){let e=0;for(;e<u.length&&u.charCodeAt(e)!==93;)e+=u.charCodeAt(e)===92?2:1;u.charCodeAt(e+1)===58&&(p=``)}return!e.url&&typeof p==`string`||d?(c=n.enter(`destinationLiteral`),l+=o.move(`<`),l+=o.move(n.safe(e.url,{before:l,after:`>`,...o.current()})),l+=o.move(`>`)):(c=n.enter(`destinationRaw`),l+=o.move(n.safe(e.url,{before:l,after:typeof p==`string`?` `:`)`,...o.current()}))),c(),typeof p==`string`&&(c=n.enter(`title${a}`),l+=o.move(` `+i),l+=o.move(n.safe(p,{before:l,after:i,...o.current()})),l+=o.move(i),c()),l+=o.move(`)`),s(),l}function _c(e,t,n){return hc(e,n)?`<`:`[`}vc.peek=yc;function vc(e,t,n,r){let i=e.referenceType,a=n.enter(`linkReference`),o=n.enter(`label`),s=n.createTracker(r),c=s.move(`[`),l=n.containerPhrasing(e,{before:c,after:`]`,...s.current()});c+=s.move(l+`][`),o();let u=n.stack;n.stack=u.filter(function(e){return e!==`phrasing`}),o=n.enter(`reference`);let d=n.safe(n.associationId(e),{before:c,after:`]`,...s.current()});return o(),n.stack=u,a(),i===`full`||!l||l!==d?c+=s.move(d+`]`):i===`shortcut`?c=c.slice(0,-1):c+=s.move(`]`),c}function yc(){return`[`}function bc(e){let t=e.options.bullet||`*`;if(t!==`*`&&t!==`+`&&t!==`-`)throw Error("Cannot serialize items with `"+t+"` for `options.bullet`, expected `*`, `+`, or `-`");return t}function xc(e){let t=bc(e),n=e.options.bulletOther;if(!n)return t===`*`?`-`:`*`;if(n!==`*`&&n!==`+`&&n!==`-`)throw Error("Cannot serialize items with `"+n+"` for `options.bulletOther`, expected `*`, `+`, or `-`");if(n===t)throw Error("Expected `bullet` (`"+t+"`) and `bulletOther` (`"+n+"`) to be different");return n}function Sc(e){let t=e.options.bulletOrdered||`.`;if(t!==`.`&&t!==`)`)throw Error("Cannot serialize items with `"+t+"` for `options.bulletOrdered`, expected `.` or `)`");return t}function Cc(e){let t=e.options.rule||`*`;if(t!==`*`&&t!==`-`&&t!==`_`)throw Error("Cannot serialize rules with `"+t+"` for `options.rule`, expected `*`, `-`, or `_`");return t}function wc(e,t,n,r){let i=n.enter(`list`),a=n.bulletCurrent,o=e.ordered?Sc(n):bc(n),s=e.ordered?o===`.`?`)`:`.`:xc(n),c=t&&n.bulletLastUsed?o===n.bulletLastUsed:!1;if(!e.ordered){let t=e.children?e.children[0]:void 0;if(o!==`*`&&o!==`-`||!t||t.children&&t.children[0]||n.stack[n.stack.length-1]!==`list`||n.stack[n.stack.length-2]!==`listItem`||n.stack[n.stack.length-3]!==`list`||n.stack[n.stack.length-4]!==`listItem`||n.indexStack[n.indexStack.length-1]!==0||n.indexStack[n.indexStack.length-2]!==0||n.indexStack[n.indexStack.length-3]!==0||(c=!0),Cc(n)===o&&t){let t=-1;for(;++t<e.children.length;){let n=e.children[t];if(n&&n.type===`listItem`&&n.children&&n.children[0]&&n.children[0].type===`thematicBreak`){c=!0;break}}}}c&&(o=s),n.bulletCurrent=o;let l=n.containerFlow(e,r);return n.bulletLastUsed=o,n.bulletCurrent=a,i(),l}function Tc(e){let t=e.options.listItemIndent||`one`;if(t!==`tab`&&t!==`one`&&t!==`mixed`)throw Error("Cannot serialize items with `"+t+"` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`");return t}function Ec(e,t,n,r){let i=Tc(n),a=n.bulletCurrent||bc(n);t&&t.type===`list`&&t.ordered&&(a=(typeof t.start==`number`&&t.start>-1?t.start:1)+(n.options.incrementListMarker===!1?0:t.children.indexOf(e))+a);let o=a.length+1;(i===`tab`||i===`mixed`&&(t&&t.type===`list`&&t.spread||e.spread))&&(o=Math.ceil(o/4)*4);let s=n.createTracker(r);s.move(a+` `.repeat(o-a.length)),s.shift(o);let c=n.enter(`listItem`),l=n.indentLines(n.containerFlow(e,s.current()),u);return c(),l;function u(e,t,n){return t?(n?``:` `.repeat(o))+e:(n?a:a+` `.repeat(o-a.length))+e}}function Dc(e,t,n,r){let i=n.enter(`paragraph`),a=n.enter(`phrasing`),o=n.containerPhrasing(e,r);return a(),i(),o}function Oc(e,t,n,r){if(!e.children.some(function(e){return ws(e)}))return n.containerFlow(e,r);let i=n.enter(`phrasing`),a=n.containerPhrasing(e,r);return i(),a}function kc(e){let t=e.options.strong||`*`;if(t!==`*`&&t!==`_`)throw Error("Cannot serialize strong with `"+t+"` for `options.strong`, expected `*`, or `_`");return t}Ac.attention=jc,Ac.peek=Mc;function Ac(e,t,n,r){let i=n.enter(`phrasing`),a=Zs(e,jc,n,n.createTracker(r)),o=a?tc([a],r.before,r.after):``;return i(),o}function jc(e,t){return{construct:`strong`,markers:kc(t)===`*`?[`*`,`_`]:[`_`,`*`],sizes:[2]}}function Mc(e,t,n){return n.options.strong||`*`}function Nc(e,t,n,r){let i=t?t.children:[],a=n.indexStack[n.indexStack.length-1];return n.safe(e.value,{...r,afterNode:i[a+1],beforeNode:i[a-1]})}function Pc(e){let t=e.options.ruleRepetition||3;if(t<3)throw Error("Cannot serialize rules with repetition `"+t+"` for `options.ruleRepetition`, expected `3` or more");return t}function Fc(e,t,n){let r=(Cc(n)+(n.options.ruleSpaces?` `:``)).repeat(Pc(n));return n.options.ruleSpaces?r.slice(0,-1):r}var Ic={blockquote:Ts,break:ks,code:Ns,definition:Is,emphasis:nc,hardBreak:ks,heading:oc,html:sc,image:lc,imageReference:dc,inlineCode:pc,link:gc,linkReference:vc,list:wc,listItem:Ec,paragraph:Dc,root:Oc,strong:Ac,text:Nc,thematicBreak:Fc};function Lc(){return{enter:{table:Rc,tableData:Hc,tableHeader:Hc,tableRow:Bc},exit:{codeText:Uc,table:zc,tableData:Vc,tableHeader:Vc,tableRow:Vc}}}function Rc(e){let t=e._align;this.enter({type:`table`,align:t.map(function(e){return e===`none`?null:e}),children:[],position:void 0},e),this.data.inTable=!0}function zc(e){this.exit(e),this.data.inTable=void 0}function Bc(e){this.enter({type:`tableRow`,children:[],position:void 0},e)}function Vc(e){this.exit(e)}function Hc(e){this.enter({type:`tableCell`,children:[],position:void 0},e)}function Uc(e){let t=this.resume();this.data.inTable&&(t=t.replace(/\\([\\|])/g,Wc));let n=this.stack[this.stack.length-1];n.type,n.value=t,this.exit(e)}function Wc(e,t){return t===`|`?t:e}function Gc(e){let{tableCellPadding:t,tablePipeAlign:n,stringLength:r}=e||{},i=t?` `:`|`;return{handlers:{inlineCode:d,table:a,tableCell:s,tableRow:o},join:[Kc],unsafe:[{character:`\r`,inConstruct:`tableCell`},{character:`
`,inConstruct:`tableCell`},{atBreak:!0,character:`|`,after:`[	 :-]`},{character:`|`,inConstruct:`tableCell`},{atBreak:!0,character:`:`,after:`-`},{atBreak:!0,character:`-`,after:`[:|-]`}]};function a(e,t,n,r){let i=l(e,n,r),a=i[0];if(a){let t=e.align?e.align.length:0,n=-1;if(!t)for(;++n<i.length;)i[n].length>t&&(t=i[n].length);for(;a.length<t;)a.push(``)}return c(i,e.align)}function o(e,t,n,r){let i=c([u(e,n,r)]);return i.slice(0,i.indexOf(`
`))}function s(e,t,n,r){let a=n.enter(`tableCell`),o=n.enter(`phrasing`),s=n.containerPhrasing(e,{...r,before:i,after:i});return o(),a(),s}function c(e,i){return xs(e,{align:i,alignDelimiters:n,fillRows:!1,padding:t,stringLength:r})}function l(e,t,n){let{children:r}=e,i=-1,a=[],o=t.enter(`table`);for(;++i<r.length;)a[i]=u(r[i],t,n);return o(),a}function u(e,t,n){let{children:r}=e,i=-1,a=[],o=t.enter(`tableRow`);for(;++i<r.length;)a[i]=s(r[i],e,t,n);return o(),a}function d(e,t,n){let r=Ic.inlineCode(e,t,n);if(!n.stack.includes(`tableCell`))return r;let i=[],a=0,o=r.indexOf(`|`);for(;o!==-1;){let e=o;for(;e>a&&r.charCodeAt(e-1)===92;)e--;i.push(r.slice(a,o)),(o-e)%2==0&&i.push(`\\`),a=o,o=r.indexOf(`|`,o+1)}return i.push(r.slice(a)),i.join(``)}}function Kc(e,t,n,r){if(e.type===`table`&&n.type===`listItem`&&n.spread===!1&&(t.type===`definition`||t.type===`heading`&&qc(t,r)||t.type===`paragraph`||t.type===`table`))return 1}function qc(e,t){let n=!1;return Sa(e,function(e){if(e.type===`break`||`value`in e&&/\r?\n|\r/.test(e.value))return n=!0,!1}),!!((!e.depth||e.depth<3)&&Ct(e)&&(t.options.setext||n))}function Jc(){return{exit:{taskListCheckValueChecked:Xc,taskListCheckValueUnchecked:Xc,paragraph:Zc}}}function Yc(){return{handlers:{paragraph:Qc},join:[$c]}}function Xc(e){let t=this.stack[this.stack.length-2];t.type,t.checked=e.type===`taskListCheckValueChecked`}function Zc(e){let t=this.stack[this.stack.length-2];if(t&&t.type===`listItem`&&typeof t.checked==`boolean`){let e=this.stack[this.stack.length-1];e.type;let n=e.children[0];if(n&&n.type===`text`){let r=t.children,i=-1,a;for(;++i<r.length;){let e=r[i];if(e.type===`paragraph`){a=e;break}}a===e&&(n.value=n.value.slice(1),n.value.length===0?e.children.shift():e.position&&n.position&&typeof n.position.start.offset==`number`&&(n.position.start.column++,n.position.start.offset++,e.position.start={...n.position.start}))}}this.exit(e)}function Qc(e,t,n,r){if(!t||t.type!==`listItem`||el(t)!==e)return Ic.paragraph(e,t,n,r);let i=`[`+(t.checked?`x`:` `)+`] `,a=n.createTracker(r);return a.move(i),i+Ic.paragraph(e.children.length>0?e:{type:`paragraph`,children:[{type:`text`,value:` `}]},t,n,{...r,...a.current()})}function $c(e,t,n){if(e.type!==`definition`||n.type!==`listItem`)return;let r=el(n);if(r&&n.children.indexOf(e)<n.children.indexOf(r))return 0}function el(e){if(typeof e.checked==`boolean`)for(let t of e.children){if(t.type===`paragraph`)return t;if(t.type!==`definition`)return}}function tl(){return[Io(),cs(),ps(),Lc(),Jc()]}function nl(e){return{extensions:[Lo(),ls(e),ms(),Gc(e),Yc()]}}var rl={tokenize:hl,partial:!0},il={tokenize:gl,partial:!0},al={tokenize:_l,partial:!0},ol={tokenize:vl,partial:!0},sl={tokenize:yl,partial:!0},cl={name:`wwwAutolink`,tokenize:pl,previous:bl},ll={name:`protocolAutolink`,tokenize:ml,previous:xl},X={name:`emailAutolink`,tokenize:fl,previous:Sl},Z={};function ul(){return{text:Z}}for(var dl=48;dl<123;)Z[dl]=X,dl++,dl===58?dl=65:dl===91&&(dl=97);Z[43]=X,Z[45]=X,Z[46]=X,Z[95]=X,Z[72]=[X,ll],Z[104]=[X,ll],Z[87]=[X,cl],Z[119]=[X,cl];function fl(e,t,n){let r=this,i,a;return o;function o(t){return!Cl(t)||!Sl.call(r,r.previous)||wl(r.events)?n(t):(e.enter(`literalAutolink`),e.enter(`literalAutolinkEmail`),s(t))}function s(t){return Cl(t)?(e.consume(t),s):t===64?(e.consume(t),c):n(t)}function c(t){return t===46?e.check(sl,u,l)(t):t===45||t===95||V(t)?(a=!0,e.consume(t),c):u(t)}function l(t){return e.consume(t),i=!0,c}function u(o){return a&&i&&B(r.previous)?(e.exit(`literalAutolinkEmail`),e.exit(`literalAutolink`),t(o)):n(o)}}function pl(e,t,n){let r=this;return i;function i(t){return t!==87&&t!==119||!bl.call(r,r.previous)||wl(r.events)?n(t):(e.enter(`literalAutolink`),e.enter(`literalAutolinkWww`),e.check(rl,e.attempt(il,e.attempt(al,a),n),n)(t))}function a(n){return e.exit(`literalAutolinkWww`),e.exit(`literalAutolink`),t(n)}}function ml(e,t,n){let r=this,i=``,a=!1;return o;function o(t){return(t===72||t===104)&&xl.call(r,r.previous)&&!wl(r.events)?(e.enter(`literalAutolink`),e.enter(`literalAutolinkHttp`),i+=String.fromCodePoint(t),e.consume(t),s):n(t)}function s(t){if(B(t)&&i.length<5)return i+=String.fromCodePoint(t),e.consume(t),s;if(t===58){let n=i.toLowerCase();if(n===`http`||n===`https`)return e.consume(t),c}return n(t)}function c(t){return t===47?(e.consume(t),a?l:(a=!0,c)):n(t)}function l(t){return t===null||Ft(t)||U(t)||Bt(t)||zt(t)?n(t):e.attempt(il,e.attempt(al,u),n)(t)}function u(n){return e.exit(`literalAutolinkHttp`),e.exit(`literalAutolink`),t(n)}}function hl(e,t,n){let r=0;return i;function i(t){return(t===87||t===119)&&r<3?(r++,e.consume(t),i):t===46&&r===3?(e.consume(t),a):n(t)}function a(e){return e===null?n(e):t(e)}}function gl(e,t,n){let r,i,a;return o;function o(t){return t===46||t===95?e.check(ol,c,s)(t):t===null||U(t)||Bt(t)||t!==45&&zt(t)?c(t):(a=!0,e.consume(t),o)}function s(t){return t===95?r=!0:(i=r,r=void 0),e.consume(t),o}function c(e){return i||r||!a?n(e):t(e)}}function _l(e,t){let n=0,r=0;return i;function i(o){return o===40?(n++,e.consume(o),i):o===41&&r<n?a(o):o===33||o===34||o===38||o===39||o===41||o===42||o===44||o===46||o===58||o===59||o===60||o===63||o===93||o===95||o===126?e.check(ol,t,a)(o):o===null||U(o)||Bt(o)?t(o):(e.consume(o),i)}function a(t){return t===41&&r++,e.consume(t),i}}function vl(e,t,n){return r;function r(o){return o===33||o===34||o===39||o===41||o===42||o===44||o===46||o===58||o===59||o===63||o===95||o===126?(e.consume(o),r):o===38?(e.consume(o),a):o===93?(e.consume(o),i):o===60||o===null||U(o)||Bt(o)?t(o):n(o)}function i(e){return e===null||e===40||e===91||U(e)||Bt(e)?t(e):r(e)}function a(e){return B(e)?o(e):n(e)}function o(t){return t===59?(e.consume(t),r):B(t)?(e.consume(t),o):n(t)}}function yl(e,t,n){return r;function r(t){return e.consume(t),i}function i(e){return V(e)?n(e):t(e)}}function bl(e){return e===null||e===40||e===42||e===95||e===91||e===93||e===126||U(e)}function xl(e){return!B(e)}function Sl(e){return!(e===47||Cl(e))}function Cl(e){return e===43||e===45||e===46||e===95||V(e)}function wl(e){let t=e.length,n=!1;for(;t--;){let r=e[t][1];if((r.type===`labelLink`||r.type===`labelImage`)&&!r._balanced){n=!0;break}if(r._gfmAutolinkLiteralWalkedInto){n=!1;break}}return e.length>0&&!n&&(e[e.length-1][1]._gfmAutolinkLiteralWalkedInto=!0),n}var Tl={tokenize:Nl,partial:!0};function El(){return{document:{91:{name:`gfmFootnoteDefinition`,tokenize:Al,continuation:{tokenize:jl},exit:Ml}},text:{91:{name:`gfmFootnoteCall`,tokenize:kl},93:{name:`gfmPotentialFootnoteCall`,add:`after`,tokenize:Dl,resolveTo:Ol}}}}function Dl(e,t,n){let r=this,i=r.events.length,a=r.parser.gfmFootnotes||(r.parser.gfmFootnotes=[]),o;for(;i--;){let e=r.events[i][1];if(e.type===`labelImage`){o=e;break}if(e.type===`gfmFootnoteCall`||e.type===`labelLink`||e.type===`label`||e.type===`image`||e.type===`link`)break}return s;function s(i){if(!o||!o._balanced)return n(i);let s=z(r.sliceSerialize({start:o.end,end:r.now()}));return s.codePointAt(0)!==94||!a.includes(s.slice(1))?n(i):(e.enter(`gfmFootnoteCallLabelMarker`),e.consume(i),e.exit(`gfmFootnoteCallLabelMarker`),t(i))}}function Ol(e,t){let n=e.length;for(;n--;)if(e[n][1].type===`labelImage`&&e[n][0]===`enter`){e[n][1];break}e[n+1][1].type=`data`,e[n+3][1].type=`gfmFootnoteCallLabelMarker`;let r={type:`gfmFootnoteCall`,start:Object.assign({},e[n+3][1].start),end:Object.assign({},e[e.length-1][1].end)},i={type:`gfmFootnoteCallMarker`,start:Object.assign({},e[n+3][1].end),end:Object.assign({},e[n+3][1].end)};i.end.column++,i.end.offset++,i.end._bufferIndex++;let a={type:`gfmFootnoteCallString`,start:Object.assign({},i.end),end:Object.assign({},e[e.length-1][1].start)},o={type:`chunkString`,contentType:`string`,start:Object.assign({},a.start),end:Object.assign({},a.end)},s=[e[n+1],e[n+2],[`enter`,r,t],e[n+3],e[n+4],[`enter`,i,t],[`exit`,i,t],[`enter`,a,t],[`enter`,o,t],[`exit`,o,t],[`exit`,a,t],e[e.length-2],e[e.length-1],[`exit`,r,t]];return e.splice(n,e.length-n+1,...s),e}function kl(e,t,n){let r=this,i=r.parser.gfmFootnotes||(r.parser.gfmFootnotes=[]),a=0,o;return s;function s(t){return e.enter(`gfmFootnoteCall`),e.enter(`gfmFootnoteCallLabelMarker`),e.consume(t),e.exit(`gfmFootnoteCallLabelMarker`),c}function c(t){return t===94?(e.enter(`gfmFootnoteCallMarker`),e.consume(t),e.exit(`gfmFootnoteCallMarker`),e.enter(`gfmFootnoteCallString`),e.enter(`chunkString`).contentType=`string`,l):n(t)}function l(s){if(a>999||s===93&&!o||s===null||s===91||U(s))return n(s);if(s===93){e.exit(`chunkString`);let a=e.exit(`gfmFootnoteCallString`);return i.includes(z(r.sliceSerialize(a)))?(e.enter(`gfmFootnoteCallLabelMarker`),e.consume(s),e.exit(`gfmFootnoteCallLabelMarker`),e.exit(`gfmFootnoteCall`),t):n(s)}return U(s)||(o=!0),a++,e.consume(s),s===92?u:l}function u(t){return t===91||t===92||t===93?(e.consume(t),a++,l):l(t)}}function Al(e,t,n){let r=this,i=r.parser.gfmFootnotes||(r.parser.gfmFootnotes=[]),a,o=0,s;return c;function c(t){return e.enter(`gfmFootnoteDefinition`)._container=!0,e.enter(`gfmFootnoteDefinitionLabel`),e.enter(`gfmFootnoteDefinitionLabelMarker`),e.consume(t),e.exit(`gfmFootnoteDefinitionLabelMarker`),l}function l(t){return t===94?(e.enter(`gfmFootnoteDefinitionMarker`),e.consume(t),e.exit(`gfmFootnoteDefinitionMarker`),e.enter(`gfmFootnoteDefinitionLabelString`),e.enter(`chunkString`).contentType=`string`,u):n(t)}function u(t){if(o>999||t===93&&!s||t===null||t===91||U(t))return n(t);if(t===93){e.exit(`chunkString`);let n=e.exit(`gfmFootnoteDefinitionLabelString`);return a=z(r.sliceSerialize(n)),e.enter(`gfmFootnoteDefinitionLabelMarker`),e.consume(t),e.exit(`gfmFootnoteDefinitionLabelMarker`),e.exit(`gfmFootnoteDefinitionLabel`),f}return U(t)||(s=!0),o++,e.consume(t),t===92?d:u}function d(t){return t===91||t===92||t===93?(e.consume(t),o++,u):u(t)}function f(t){return t===58?(e.enter(`definitionMarker`),e.consume(t),e.exit(`definitionMarker`),i.includes(a)||i.push(a),G(e,p,`gfmFootnoteDefinitionWhitespace`)):n(t)}function p(e){return t(e)}}function jl(e,t,n){return e.check(on,t,e.attempt(Tl,t,n))}function Ml(e){e.exit(`gfmFootnoteDefinition`)}function Nl(e,t,n){let r=this;return G(e,i,`gfmFootnoteDefinitionIndent`,5);function i(e){let i=r.events[r.events.length-1];return i&&i[1].type===`gfmFootnoteDefinitionIndent`&&i[2].sliceSerialize(i[1],!0).length===4?t(e):n(e)}}function Pl(e){let t=(e||{}).singleTilde,n={name:`strikethrough`,tokenize:i,resolveAll:r};return t??=!0,{text:{126:n},insideSpan:{null:[n]},attentionMarkers:{null:[126]}};function r(e,t){let n=-1;for(;++n<e.length;)if(e[n][0]===`enter`&&e[n][1].type===`strikethroughSequenceTemporary`&&e[n][1]._close){let r=n;for(;r--;)if(e[r][0]===`exit`&&e[r][1].type===`strikethroughSequenceTemporary`&&e[r][1]._open&&e[n][1].end.offset-e[n][1].start.offset===e[r][1].end.offset-e[r][1].start.offset){e[n][1].type=`strikethroughSequence`,e[r][1].type=`strikethroughSequence`;let i={type:`strikethrough`,start:Object.assign({},e[r][1].start),end:Object.assign({},e[n][1].end)},a={type:`strikethroughText`,start:Object.assign({},e[r][1].end),end:Object.assign({},e[n][1].start)},o=[[`enter`,i,t],[`enter`,e[r][1],t],[`exit`,e[r][1],t],[`enter`,a,t]],s=t.parser.constructs.insideSpan.null;s&&L(o,o.length,0,Qt(s,e.slice(r+1,n),t)),L(o,o.length,0,[[`exit`,a,t],[`enter`,e[n][1],t],[`exit`,e[n][1],t],[`exit`,i,t]]),L(e,r-1,n-r+3,o),n=r+o.length-2;break}}for(n=-1;++n<e.length;)e[n][1].type===`strikethroughSequenceTemporary`&&(e[n][1].type=`data`);return e}function i(e,n,r){let i=this.previous,a=this.events,o=0;return s;function s(t){return i===126&&a[a.length-1][1].type!==`characterEscape`?r(t):(e.enter(`strikethroughSequenceTemporary`),c(t))}function c(a){let s=K(i);if(a===126)return o>1?r(a):(e.consume(a),o++,c);if(o<2&&!t)return r(a);let l=e.exit(`strikethroughSequenceTemporary`),u=K(a);return l._open=!u||u===2&&!!s,l._close=!s||s===2&&!!u,n(a)}}}var Fl=class{constructor(){this.map=[],this.index=new Map}add(e,t,n){Il(this,e,t,n)}consume(e){if(this.map.sort(function(e,t){return e[0]-t[0]}),this.map.length===0)return;let t=this.map.length,n=[];for(;t>0;)--t,n.push(e.slice(this.map[t][0]+this.map[t][1]),this.map[t][2]),e.length=this.map[t][0];n.push(e.slice()),e.length=0;let r=n.pop();for(;r;){for(let t of r)e.push(t);r=n.pop()}this.map.length=0,this.index.clear()}};function Il(e,t,n,r){if(n===0&&r.length===0)return;let i=e.index.get(t);if(i){i[1]+=n,i[2].push(...r);return}let a=[t,n,r];e.map.push(a),e.index.set(t,a)}function Ll(e,t){let n=!1,r=[];for(;t<e.length;){let i=e[t];if(n){if(i[0]===`enter`)i[1].type===`tableContent`&&r.push(e[t+1][1].type===`tableDelimiterMarker`?`left`:`none`);else if(i[1].type===`tableContent`){if(e[t-1][1].type===`tableDelimiterMarker`){let e=r.length-1;r[e]=r[e]===`left`?`center`:`right`}}else if(i[1].type===`tableDelimiterRow`)break}else i[0]===`enter`&&i[1].type===`tableDelimiterRow`&&(n=!0);t+=1}return r}function Rl(){return{flow:{null:{name:`table`,tokenize:zl,resolveAll:Bl}}}}function zl(e,t,n){let r=this,i=0,a=0,o;return s;function s(e){let t=r.events.length-1;for(;t>-1;){let{type:e}=r.events[t][1];if(e===`lineEnding`||e===`linePrefix`)t--;else break}let i=t>-1?r.events[t][1].type:null,a=i===`tableHead`||i===`tableRow`?S:c;return a===S&&r.parser.lazy[r.now().line]?n(e):a(e)}function c(t){return e.enter(`tableHead`),e.enter(`tableRow`),l(t)}function l(e){return e===124||(o=!0,a+=1),u(e)}function u(t){return t===null?n(t):H(t)?a>1?(a=0,r.interrupt=!0,e.exit(`tableRow`),e.enter(`lineEnding`),e.consume(t),e.exit(`lineEnding`),p):n(t):W(t)?G(e,u,`whitespace`)(t):(a+=1,o&&(o=!1,i+=1),t===124?(e.enter(`tableCellDivider`),e.consume(t),e.exit(`tableCellDivider`),o=!0,u):(e.enter(`data`),d(t)))}function d(t){return t===null||t===124||U(t)?(e.exit(`data`),u(t)):(e.consume(t),t===92?f:d)}function f(t){return t===92||t===124?(e.consume(t),d):d(t)}function p(t){return r.interrupt=!1,r.parser.lazy[r.now().line]?n(t):(e.enter(`tableDelimiterRow`),o=!1,W(t)?G(e,m,`linePrefix`,r.parser.constructs.disable.null.includes(`codeIndented`)?void 0:4)(t):m(t))}function m(t){return t===45||t===58?g(t):t===124?(o=!0,e.enter(`tableCellDivider`),e.consume(t),e.exit(`tableCellDivider`),h):x(t)}function h(t){return W(t)?G(e,g,`whitespace`)(t):g(t)}function g(t){return t===58?(a+=1,o=!0,e.enter(`tableDelimiterMarker`),e.consume(t),e.exit(`tableDelimiterMarker`),_):t===45?(a+=1,_(t)):t===null||H(t)?b(t):x(t)}function _(t){return t===45?(e.enter(`tableDelimiterFiller`),v(t)):x(t)}function v(t){return t===45?(e.consume(t),v):t===58?(o=!0,e.exit(`tableDelimiterFiller`),e.enter(`tableDelimiterMarker`),e.consume(t),e.exit(`tableDelimiterMarker`),y):(e.exit(`tableDelimiterFiller`),y(t))}function y(t){return W(t)?G(e,b,`whitespace`)(t):b(t)}function b(n){return n===124?m(n):n===null||H(n)?!o||i!==a?x(n):(e.exit(`tableDelimiterRow`),e.exit(`tableHead`),t(n)):x(n)}function x(e){return n(e)}function S(t){return e.enter(`tableRow`),C(t)}function C(n){return n===124?(e.enter(`tableCellDivider`),e.consume(n),e.exit(`tableCellDivider`),C):n===null||H(n)?(e.exit(`tableRow`),t(n)):W(n)?G(e,C,`whitespace`)(n):(e.enter(`data`),w(n))}function w(t){return t===null||t===124||U(t)?(e.exit(`data`),C(t)):(e.consume(t),t===92?T:w)}function T(t){return t===92||t===124?(e.consume(t),w):w(t)}}function Bl(e,t){let n=-1,r=!0,i=0,a=[0,0,0,0],o=[0,0,0,0],s=!1,c=0,l,u,d,f=new Fl;for(;++n<e.length;){let p=e[n],m=p[1];p[0]===`enter`?m.type===`tableHead`?(s=!1,c!==0&&(Hl(f,t,c,l,u),u=void 0,c=0),l={type:`table`,start:Object.assign({},m.start),end:Object.assign({},m.end)},f.add(n,0,[[`enter`,l,t]])):m.type===`tableRow`||m.type===`tableDelimiterRow`?(r=!0,d=void 0,a=[0,0,0,0],o=[0,n+1,0,0],s&&(s=!1,u={type:`tableBody`,start:Object.assign({},m.start),end:Object.assign({},m.end)},f.add(n,0,[[`enter`,u,t]])),i=m.type===`tableDelimiterRow`?2:u?3:1):i&&(m.type===`data`||m.type===`tableDelimiterMarker`||m.type===`tableDelimiterFiller`)?(r=!1,o[2]===0&&(a[1]!==0&&(o[0]=o[1],d=Vl(f,t,a,i,void 0,d),a=[0,0,0,0]),o[2]=n)):m.type===`tableCellDivider`&&(r?r=!1:(a[1]!==0&&(o[0]=o[1],d=Vl(f,t,a,i,void 0,d)),a=o,o=[a[1],n,0,0])):m.type===`tableHead`?(s=!0,c=n):m.type===`tableRow`||m.type===`tableDelimiterRow`?(c=n,a[1]===0?o[1]!==0&&(d=Vl(f,t,o,i,n,d)):(o[0]=o[1],d=Vl(f,t,a,i,n,d)),i=0):i&&(m.type===`data`||m.type===`tableDelimiterMarker`||m.type===`tableDelimiterFiller`)&&(o[3]=n)}for(c!==0&&Hl(f,t,c,l,u),f.consume(t.events),n=-1;++n<t.events.length;){let e=t.events[n];e[0]===`enter`&&e[1].type===`table`&&(e[1]._align=Ll(t.events,n))}return e}function Vl(e,t,n,r,i,a){let o=r===1?`tableHeader`:r===2?`tableDelimiter`:`tableData`;n[0]!==0&&(a.end=Object.assign({},Ul(t.events,n[0])),e.add(n[0],0,[[`exit`,a,t]]));let s=Ul(t.events,n[1]);if(a={type:o,start:Object.assign({},s),end:Object.assign({},s)},e.add(n[1],0,[[`enter`,a,t]]),n[2]!==0){let i=Ul(t.events,n[2]),a=Ul(t.events,n[3]),o={type:`tableContent`,start:Object.assign({},i),end:Object.assign({},a)};if(e.add(n[2],0,[[`enter`,o,t]]),r!==2){let r=t.events[n[2]],i=t.events[n[3]];if(r[1].end=Object.assign({},i[1].end),r[1].type=`chunkText`,r[1].contentType=`text`,n[3]>n[2]+1){let t=n[2]+1,r=n[3]-n[2]-1;e.add(t,r,[])}}e.add(n[3]+1,0,[[`exit`,o,t]])}return i!==void 0&&(a.end=Object.assign({},Ul(t.events,i)),e.add(i,0,[[`exit`,a,t]]),a=void 0),a}function Hl(e,t,n,r,i){let a=[],o=Ul(t.events,n);i&&(i.end=Object.assign({},o),a.push([`exit`,i,t])),r.end=Object.assign({},o),a.push([`exit`,r,t]),e.add(n+1,0,a)}function Ul(e,t){let n=e[t],r=n[0]===`enter`?`start`:`end`;return n[1][r]}var Wl={name:`tasklistCheck`,tokenize:Kl};function Gl(){return{text:{91:Wl}}}function Kl(e,t,n){let r=this;return i;function i(t){return r.previous!==null||!r._gfmTasklistFirstContentOfListItem?n(t):(e.enter(`taskListCheck`),e.enter(`taskListCheckMarker`),e.consume(t),e.exit(`taskListCheckMarker`),a)}function a(t){return U(t)?(e.enter(`taskListCheckValueUnchecked`),e.consume(t),e.exit(`taskListCheckValueUnchecked`),o):t===88||t===120?(e.enter(`taskListCheckValueChecked`),e.consume(t),e.exit(`taskListCheckValueChecked`),o):n(t)}function o(t){return t===93?(e.enter(`taskListCheckMarker`),e.consume(t),e.exit(`taskListCheckMarker`),e.exit(`taskListCheck`),s):n(t)}function s(r){return H(r)?t(r):W(r)?e.check({tokenize:ql},t,n)(r):n(r)}}function ql(e,t,n){return G(e,r,`whitespace`);function r(e){return e===null?n(e):t(e)}}function Jl(e){return At([ul(),El(),Pl(e),Rl(),Gl()])}var Yl={};function Xl(e){let t=this,n=e||Yl,r=t.data(),i=r.micromarkExtensions||=[],a=r.fromMarkdownExtensions||=[],o=r.toMarkdownExtensions||=[];i.push(Jl(n)),a.push(tl()),o.push(nl(n))}var Q=Object.entries(Object.assign({"./chapters/01-first-android-app.md":`# 1. Build your first Android app\r
\r
[Back to notes index](../README.md)\r
\r
| [Previous: Notes index](../README.md) | [Notes index](../README.md) | [Next: Java essentials for Android](02-java-for-android.md) |\r
|:--|:--:|--:|\r
\r
## What I am learning here\r
\r
An Android app is more than a screen. The project contains Java source code, XML resources, a manifest, and build configuration. Android Studio uses Gradle to combine these pieces into an installable app. The Android system then starts the app's entry activity when it is launched.\r
\r
In this first note, I connect a Java activity to an XML screen, display a message, and change that message when a button is tapped. This gives me a small example of how source code, a layout resource, and a user action work together.\r
\r
## Create a Java and XML project\r
\r
1. Open Android Studio and choose **New Project**.\r
2. Select a Views-based activity template, such as **Empty Views Activity**, when it is available. Confirm that the generated screen uses an XML layout.\r
3. Enter a project name such as \`StudyApp\` and choose a package name such as \`com.example.studyapp\`.\r
4. Select Java as the language if the template offers a language choice. Choose a minimum SDK suitable for the devices you want to support.\r
5. Finish creating the project and wait for Gradle sync to complete.\r
\r
Template names and choices can differ between Android Studio versions. Before following the examples below, check that the project has a Java activity and a file such as \`res/layout/activity_main.xml\`. If the template created another activity name or layout name, use those names consistently or rename the files and references together.\r
\r
## Find the first-screen files\r
\r
In the Project view, the important files for this example are:\r
\r
\`\`\`text\r
app/\r
└── src/main/\r
    ├── AndroidManifest.xml\r
    ├── java/com/example/studyapp/MainActivity.java\r
    └── res/\r
        ├── layout/activity_main.xml\r
        └── values/strings.xml\r
\`\`\`\r
\r
The manifest describes app components to Android. The Java file contains the activity code. The layout file describes the screen's views, and the strings file stores text shown to the user. Android Studio may group these files differently in its Android view, but their paths are under the app module's \`src/main\` source set.\r
\r
## Build a small screen in XML\r
\r
Place this layout in \`app/src/main/res/layout/activity_main.xml\`:\r
\r
\`\`\`xml\r
<?xml version="1.0" encoding="utf-8"?>\r
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"\r
    android:layout_width="match_parent"\r
    android:layout_height="match_parent"\r
    android:orientation="vertical"\r
    android:padding="24dp">\r
\r
    <TextView\r
        android:id="@+id/message"\r
        android:layout_width="match_parent"\r
        android:layout_height="wrap_content"\r
        android:text="@string/welcome_message"\r
        android:textSize="20sp" />\r
\r
    <Button\r
        android:id="@+id/change_message"\r
        android:layout_width="wrap_content"\r
        android:layout_height="wrap_content"\r
        android:layout_marginTop="16dp"\r
        android:text="@string/change_message" />\r
\r
</LinearLayout>\r
\`\`\`\r
\r
\`LinearLayout\` arranges its children in a row or a column. Here, \`vertical\` places the message above the button. \`match_parent\` uses the available parent size, while \`wrap_content\` uses the size needed by the view. The IDs let Java find these views. \`dp\` is used for layout dimensions and spacing; \`sp\` is used for text so the user's font-size setting is respected.\r
\r
Add the displayed text to \`app/src/main/res/values/strings.xml\`. Keep any other string entries already generated by the project.\r
\r
\`\`\`xml\r
<resources>\r
    <string name="app_name">StudyApp</string>\r
    <string name="welcome_message">Hello, Android!</string>\r
    <string name="change_message">Change message</string>\r
    <string name="updated_message">The button works.</string>\r
</resources>\r
\`\`\`\r
\r
The \`@string/name\` syntax points to a string resource. Keeping screen text in resources makes it easier to maintain and translate later.\r
\r
## Connect the layout to Java\r
\r
In \`MainActivity.java\`, replace the package name with the package used by your project. The \`R\` class is generated from resources during the build, so do not create or edit it manually.\r
\r
\`\`\`java\r
package com.example.studyapp;\r
\r
import android.app.Activity;\r
import android.os.Bundle;\r
import android.view.View;\r
import android.widget.Button;\r
import android.widget.TextView;\r
\r
public class MainActivity extends Activity {\r
    @Override\r
    protected void onCreate(Bundle savedInstanceState) {\r
        super.onCreate(savedInstanceState);\r
        setContentView(R.layout.activity_main);\r
\r
        TextView message = (TextView) findViewById(R.id.message);\r
        Button changeMessage = (Button) findViewById(R.id.change_message);\r
\r
        changeMessage.setOnClickListener(new View.OnClickListener() {\r
            @Override\r
            public void onClick(View view) {\r
                message.setText(R.string.updated_message);\r
            }\r
        });\r
    }\r
}\r
\`\`\`\r
\r
\`onCreate()\` is called while the activity is being created. \`setContentView()\` attaches the XML layout to this activity. \`findViewById()\` returns the views whose IDs were declared in XML. The click listener runs its \`onClick()\` method after the user taps the button.\r
\r
The cast on \`findViewById()\` keeps this example compatible with older Android API signatures. The ID must refer to the right view type: \`message\` is a \`TextView\`, and \`change_message\` is a \`Button\`.\r
\r
## Check the launcher activity\r
\r
Android reads \`AndroidManifest.xml\` to discover app components. A launcher activity has a \`MAIN\` action and a \`LAUNCHER\` category. The activity must also declare \`android:exported\` when it has an intent filter. Keep the manifest entries generated by Android Studio and check that the activity is declared only once. A minimal activity entry looks like this inside the existing \`<application>\` element:\r
\r
\`\`\`xml\r
<activity\r
    android:name=".MainActivity"\r
    android:exported="true">\r
    <intent-filter>\r
        <action android:name="android.intent.action.MAIN" />\r
        <category android:name="android.intent.category.LAUNCHER" />\r
    </intent-filter>\r
</activity>\r
\`\`\`\r
\r
If the generated manifest already contains this activity and filter, do not add a duplicate. The \`.MainActivity\` name is resolved relative to the app namespace configured for the module.\r
\r
## Build and run\r
\r
1. Let Android Studio finish syncing the project with Gradle.\r
2. Start an emulator from Device Manager, or connect an Android device with USB debugging enabled.\r
3. Select the app run configuration and the target device, then choose **Run**.\r
4. Wait for installation and launch. The screen should show **Hello, Android!**.\r
5. Tap **Change message**. The text should change to **The button works.**.\r
\r
Android Studio delegates compilation and packaging to Gradle. A successful build confirms that the Java source, XML resources, manifest, and build configuration can be combined. The debug app is installed on the selected device so I can check its behavior.\r
\r
## Common things to check\r
\r
| Symptom | What to check |\r
| --- | --- |\r
| \`R\` or a resource ID is unresolved | Fix XML errors first, confirm the resource file name and ID, then run a build again. \`R\` is generated by the build. |\r
| The app opens but the screen is blank or different | Confirm that \`setContentView()\` uses the intended layout and that the edited XML file belongs to the app module. |\r
| \`findViewById()\` returns \`null\` | Check that the view is in the layout attached by \`setContentView()\` and that the ID spelling matches. |\r
| Android Studio cannot launch the activity | Check the manifest activity name and launcher intent filter. Do not declare the same activity twice. |\r
| The package line or \`R\` import does not match | Use the Java package and generated resource package configured by this project. The project structure notes explain the namespace in more detail. |\r
\r
## Practice\r
\r
Add a second button named \`reset_message\`. Give it a string resource named \`reset_message\`, then set the message view back to \`@string/welcome_message\` when it is tapped. Keep the view text in \`strings.xml\` and give the new button a unique ID.\r
\r
When it works, I should be able to change the message and restore it without restarting the app.\r
\r
## Notes to remember\r
\r
- An activity is a screen entry point, and XML describes the views shown by that activity.\r
- \`setContentView()\` connects an activity to its layout resource.\r
- Resource IDs connect Java code to views declared in XML.\r
- The manifest tells Android which components belong to the app and which activity appears in the launcher.\r
- Gradle builds the source and resources into an app that can be installed and run.\r
\r
## References\r
\r
- [Create a project in Android Studio](https://developer.android.com/studio/projects/create-project)\r
- [Build and run your app in Android Studio](https://developer.android.com/build/building-studio)\r
- [Android build structure](https://developer.android.com/build/android-build-structure)\r
- [Intents and intent filters](https://developer.android.com/guide/components/intents-filters)\r
\r
`,"./chapters/02-java-for-android.md":`# 2. Java essentials for Android\r
\r
[Back to notes index](../README.md)\r
\r
| [Previous: Build your first Android app](01-first-android-app.md) | [Notes index](../README.md) | [Next: Project structure, Gradle, and resources](03-project-structure-and-resources.md) |\r
|:--|:--:|--:|\r
\r
## Why Java matters in these notes\r
\r
Java is the language used by the examples in this notebook. Android apps also use framework classes such as \`Activity\`, \`View\`, and \`Bundle\`. Learning the Java basics makes those APIs easier to read because their methods, types, and callbacks follow regular Java rules.\r
\r
This chapter records the language features I use most often in Android code. It is a reminder of how values, methods, objects, collections, and errors fit together, with small examples based on a study list.\r
\r
## Values and types\r
\r
A variable has a type, a name, and a value. Java has primitive types for simple values and reference types for objects.\r
\r
\`\`\`java\r
int completedCount = 3;\r
double progress = 0.75;\r
boolean isReady = true;\r
char firstLetter = 'A';\r
String topic = "Activities";\r
\`\`\`\r
\r
\`int\`, \`double\`, \`boolean\`, and \`char\` are primitives. \`String\` is a class, so \`topic\` holds a reference to a \`String\` object. A reference can also be \`null\`, which means it does not currently refer to an object.\r
\r
Use a name that explains the value. Use \`final\` when a local variable should not be assigned a different value after initialization:\r
\r
\`\`\`java\r
final int maximumAttempts = 3;\r
\`\`\`\r
\r
\`final\` on a reference prevents replacing the reference. If the referenced object is mutable, its contents can still change. Primitive variables and local variables have different defaulting rules from fields, so initialize local variables before reading them.\r
\r
## Conditions, loops, and methods\r
\r
An \`if\` statement chooses a path based on a boolean expression. A loop repeats work. A method names a unit of behavior and can accept parameters or return a result.\r
\r
\`\`\`java\r
static String statusLabel(int completed, int total) {\r
    if (total <= 0) {\r
        return "No topics yet";\r
    }\r
\r
    if (completed == total) {\r
        return "All topics reviewed";\r
    }\r
\r
    return completed + " of " + total + " reviewed";\r
}\r
\`\`\`\r
\r
This method has two \`int\` parameters and returns a \`String\`. The \`static\` keyword means it belongs to the class rather than a particular object. A method with no result uses \`void\`.\r
\r
A loop can process each element in a collection:\r
\r
\`\`\`java\r
for (String topic : topics) {\r
    System.out.println(topic);\r
}\r
\`\`\`\r
\r
In Android code, the same kind of loop can prepare values for a view or check a list. Keep UI work short because activity callbacks and click listeners normally run on the main thread. Longer work needs a background-work approach, covered later in these notes.\r
\r
## Classes, objects, and encapsulation\r
\r
A class defines the data and behavior its objects expose. A constructor sets up a new object. Encapsulation keeps fields private and exposes deliberate methods for reading or changing state.\r
\r
\`\`\`java\r
public class StudyItem {\r
    private final String title;\r
    private boolean reviewed;\r
\r
    public StudyItem(String title) {\r
        if (title == null || title.trim().isEmpty()) {\r
            throw new IllegalArgumentException("Title must not be empty");\r
        }\r
\r
        this.title = title.trim();\r
        this.reviewed = false;\r
    }\r
\r
    public String getTitle() {\r
        return title;\r
    }\r
\r
    public boolean isReviewed() {\r
        return reviewed;\r
    }\r
\r
    public void markReviewed() {\r
        reviewed = true;\r
    }\r
}\r
\`\`\`\r
\r
\`new StudyItem("Activities")\` calls the constructor and creates an object. \`this.title\` refers to the field on that object. \`title\` without \`this\` is the constructor parameter. The field is \`final\` because the item's title should not change after construction. The \`reviewed\` field can change through \`markReviewed()\`.\r
\r
The \`private\` access modifier limits direct access to a class. \`public\` methods form the part of the class that other code can use. This helps prevent unrelated code from leaving an object in an invalid state.\r
\r
## Interfaces, inheritance, and callbacks\r
\r
An interface describes behavior a class agrees to provide. A class can extend one class and implement one or more interfaces. Android uses inheritance in types such as activities, and interfaces for callbacks such as click handling.\r
\r
\`\`\`java\r
public class MainActivity extends Activity {\r
    // Activity behavior belongs here.\r
}\r
\`\`\`\r
\r
Here \`MainActivity\` is a kind of \`Activity\`, so it inherits activity behavior and can override lifecycle methods such as \`onCreate()\`. Use \`@Override\` so the compiler can check that a method really overrides a parent method.\r
\r
An interface callback can be implemented with an anonymous class:\r
\r
\`\`\`java\r
button.setOnClickListener(new View.OnClickListener() {\r
    @Override\r
    public void onClick(View view) {\r
        message.setText(R.string.updated_message);\r
    }\r
});\r
\`\`\`\r
\r
The view calls \`onClick()\` when the user taps the button. This is a common event pattern in Java-based Android screens.\r
\r
## Lists, generics, and equality\r
\r
Collections hold groups of objects. A \`List\` preserves order and can contain repeated values. \`ArrayList\` is a resizable list implementation. Generics describe the element type, so a \`List<String>\` accepts strings and returns strings when read. The following statements belong inside a method in a class that imports \`java.util.ArrayList\` and \`java.util.List\`.\r
\r
\`\`\`java\r
List<StudyItem> items = new ArrayList<>();\r
items.add(new StudyItem("Java basics"));\r
items.add(new StudyItem("Activities"));\r
\r
for (StudyItem item : items) {\r
    System.out.println(item.getTitle());\r
}\r
\`\`\`\r
\r
The variable uses the \`List\` interface while the object is an \`ArrayList\`. This keeps code flexible if the implementation changes later. \`Map<K, V>\` is useful when values are looked up by keys, while \`Set<E>\` stores unique elements. The RecyclerView chapter uses a list as the data source for rows.\r
\r
For objects such as strings, compare contents with \`.equals()\` rather than \`==\`:\r
\r
\`\`\`java\r
String selectedTab = "notes";\r
\r
if ("notes".equals(selectedTab)) {\r
    System.out.println("Show the notes tab");\r
}\r
\`\`\`\r
\r
\`==\` checks whether two references point to the same object. \`.equals()\` checks value equality for classes that implement it, including \`String\`. Putting the known non-null string first also avoids a null check for \`selectedTab\` in this comparison.\r
\r
## Null values and exceptions\r
\r
Java reference variables can be \`null\`. Calling a method through a null reference causes a \`NullPointerException\`. Check that a value exists before using it, or design a method so invalid values are rejected at the boundary.\r
\r
Exceptions report problems that interrupt the normal flow. Catch an exception when the current code can recover or show a useful message. Do not catch and ignore a broad exception because that hides the cause of a failure.\r
\r
\`\`\`java\r
String countText = "12";\r
\r
try {\r
    int count = Integer.parseInt(countText);\r
    System.out.println("Count: " + count);\r
} catch (NumberFormatException exception) {\r
    System.out.println("Enter a whole number");\r
}\r
\`\`\`\r
\r
\`NumberFormatException\` occurs when text is not a valid integer. Checked exceptions must be handled or declared by the method. Runtime exceptions often point to invalid assumptions, such as a null value or an incorrect index, and should usually be fixed at their source.\r
\r
## Practice: track reviewed topics\r
\r
Create a \`StudyItem\` class with a title and a reviewed flag. Add three items to an \`ArrayList<StudyItem>\`. Mark one item as reviewed, then loop through the list and print each title with either \`Reviewed\` or \`To review\`.\r
\r
Before moving on, check that:\r
\r
- the title cannot be empty\r
- the reviewed state changes through a method\r
- the list accepts \`StudyItem\` objects, not unrelated values\r
- the output uses the current state of each item\r
\r
## Notes to remember\r
\r
- A class defines a type, and \`new\` creates an object from that class.\r
- Keep fields private and expose methods that preserve valid state.\r
- Use interfaces to describe behavior and callbacks.\r
- Use generics to make collection element types clear.\r
- Use \`.equals()\` for comparing string contents.\r
- Check nullable references and handle exceptions where recovery is possible.\r
- Keep event callbacks short and move long-running work away from the main thread.\r
\r
## References\r
\r
- [Learn Java](https://dev.java/learn/)\r
- [Java collections framework](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Collection.html)\r
- [Java versions in Android builds](https://developer.android.com/build/jdks)\r
- [Android processes and threads](https://developer.android.com/guide/components/processes-and-threads)\r
\r
`,"./chapters/03-project-structure-and-resources.md":`# 3. Project structure, Gradle, and resources\r
\r
[Back to notes index](../README.md)\r
\r
| [Previous: Java essentials for Android](02-java-for-android.md) | [Notes index](../README.md) | [Next: Activities and the Android lifecycle](04-activities-and-lifecycle.md) |\r
|:--|:--:|--:|\r
\r
## How an Android project is arranged\r
\r
An Android Studio project is the whole build. It can contain one or more modules. A module is a part that Gradle builds, such as an installable app or a reusable library. In a simple project, the app module is usually named \`app\`.\r
\r
The project view may show a compact Android-specific layout, while the Project view shows the actual folders. The same files are present even when the IDE groups them differently.\r
\r
\`\`\`text\r
StudyApp/\r
├── gradle/\r
│   └── wrapper/\r
│       └── gradle-wrapper.properties\r
├── app/\r
│   ├── build.gradle\r
│   └── src/\r
│       ├── main/\r
│       │   ├── AndroidManifest.xml\r
│       │   ├── java/com/example/studyapp/\r
│       │   └── res/\r
│       ├── test/\r
│       └── androidTest/\r
├── build.gradle\r
├── gradlew\r
├── gradlew.bat\r
└── settings.gradle\r
\`\`\`\r
\r
Some projects use \`build.gradle.kts\` and \`settings.gradle.kts\` file names. Keep the generated file format when editing a project. Do not copy syntax from a different format into the build file.\r
\r
## What the main files do\r
\r
| File or folder | Purpose |\r
| --- | --- |\r
| \`settings.gradle\` | Names the build and includes its modules. |\r
| Root \`build.gradle\` | Declares build plugins and settings shared across modules. |\r
| \`gradle/wrapper/gradle-wrapper.properties\` | Selects the Gradle distribution used by the wrapper. |\r
| \`gradlew\` and \`gradlew.bat\` | Run the project's selected Gradle version on Unix-like systems and Windows. |\r
| \`app/build.gradle\` | Configures the app module, SDK levels, application ID, build types, and dependencies. |\r
| \`app/src/main/AndroidManifest.xml\` | Declares app components, permissions, and other package information. |\r
| \`app/src/main/java/\` | Holds Java source files for the main app. |\r
| \`app/src/main/res/\` | Holds compiled Android resources such as layouts, strings, images, and themes. |\r
| \`app/src/test/\` | Holds local tests that run on the development machine. |\r
| \`app/src/androidTest/\` | Holds tests that need an Android device or emulator. |\r
\r
The app module has its own build file because it can be configured and built separately from other modules. Dependency declarations also belong to the module that uses them.\r
\r
## Gradle and the Android build plugin\r
\r
Gradle is the build system. The Android Gradle Plugin adds Android-specific tasks, such as compiling resources, packaging an app, and creating build variants. Android Studio sync reads the build files and checks that the project and its dependencies can be configured. When I choose **Run**, Android Studio asks Gradle to build the selected variant before installing it on a device.\r
\r
The Gradle wrapper scripts let everyone use the Gradle version selected by the project. On Windows, a command can be run from the project root with the wrapper:\r
\r
\`\`\`text\r
gradlew.bat :app:tasks\r
\`\`\`\r
\r
This lists tasks for the \`app\` module. To build its debug APK, run:\r
\r
\`\`\`text\r
gradlew.bat :app:assembleDebug\r
\`\`\`\r
\r
The wrapper may need to download its configured Gradle distribution the first time it runs. Keep the wrapper files in version control so another checkout can use the same build setup.\r
\r
## SDK levels and app identity\r
\r
The app module build file contains settings with different jobs. They may have similar numbers, but they are not interchangeable.\r
\r
| Setting | What it controls |\r
| --- | --- |\r
| \`namespace\` | The package used for generated resource classes such as \`R\`. It should normally match the base package used by app code. |\r
| \`applicationId\` | The unique identity installed on a device and used by app stores. Keep it stable after publishing an app. |\r
| \`compileSdk\` | The Android API definitions available while compiling the source. It does not decide the minimum device version. |\r
| \`minSdk\` | The lowest Android API level allowed to install the app. |\r
| \`targetSdk\` | The Android behavior level the app opts into and has been tested against. Platform behavior and store requirements can depend on it. |\r
\r
For a new project, the namespace and application ID usually start with the same value. They serve different purposes, so changing one does not always mean the other should change. Use the SDK levels selected for the project and check current platform requirements before publishing.\r
\r
## Resource folders and names\r
\r
Resources are files that describe or provide content for the app. Keeping them outside Java source makes them easier to reuse and lets Android select alternatives for a device configuration, such as a language or screen density.\r
\r
| Resource folder | Common contents | Example reference |\r
| --- | --- | --- |\r
| \`res/layout/\` | XML view layouts | \`R.layout.activity_main\`, \`@layout/activity_main\` |\r
| \`res/values/\` | Strings, colors, dimensions, styles, and themes | \`R.string.app_name\`, \`@string/app_name\` |\r
| \`res/drawable/\` | Images and XML drawable definitions | \`R.drawable.logo\`, \`@drawable/logo\` |\r
| \`res/mipmap/\` | Launcher icon resources | \`R.mipmap.ic_launcher\` |\r
| \`res/menu/\` | Menu definitions | \`R.menu.main_menu\` |\r
| \`res/raw/\` | Files opened as raw resources | \`R.raw.sample_data\` |\r
\r
Resource directory and file names use lowercase letters, digits, and underscores. For example, \`welcome_message.xml\` is valid, while \`WelcomeMessage.xml\` is not a valid resource file name. Values resource XML files can contain several named values; layout and drawable resource names usually come from their file names.\r
\r
## Use a string resource\r
\r
Create or update \`app/src/main/res/values/strings.xml\`:\r
\r
\`\`\`xml\r
<?xml version="1.0" encoding="utf-8"?>\r
<resources>\r
    <string name="app_name">StudyApp</string>\r
    <string name="welcome_message">Welcome to my study notes</string>\r
</resources>\r
\`\`\`\r
\r
Use the resource from XML with \`@string/name\`:\r
\r
\`\`\`xml\r
<TextView\r
    android:layout_width="wrap_content"\r
    android:layout_height="wrap_content"\r
    android:text="@string/welcome_message" />\r
\`\`\`\r
\r
Use it from Java with the generated resource ID:\r
\r
\`\`\`java\r
titleView.setText(R.string.welcome_message);\r
\`\`\`\r
\r
Android build tools generate the \`R\` class from resources. \`R.string.welcome_message\` is a Java resource ID, while \`@string/welcome_message\` is the XML reference to the same resource. Never edit a generated \`R\` file. Fix the source resource or its name, then build again.\r
\r
## Build variants and generated files\r
\r
Android projects normally define debug and release build types. Debug builds are intended for local development. Release builds are configured for distribution and may have different signing and optimization settings. Build types and product flavors can combine into variants; release details are covered in the final development chapter.\r
\r
Generated files and build outputs are not source files. Android Studio and Gradle recreate them, so do not manually edit files inside \`build/\` or generated source directories. Make changes in \`src/main\`, resource folders, the manifest, or the module build file.\r
\r
## Common build and resource problems\r
\r
| Symptom | What to check |\r
| --- | --- |\r
| Gradle sync fails | Read the first reported error, check network access for required dependencies, and confirm the Gradle wrapper and Android Gradle Plugin versions are compatible. |\r
| A resource reference is red | Check the resource file name, resource type, XML syntax, and whether the file is under the app module's \`res/\` folder. |\r
| \`R\` cannot be resolved | Fix resource and manifest errors first, then sync or build again. Do not create an \`R\` class yourself. |\r
| The wrong app is installed | Check \`applicationId\`, since it identifies the installed app. |\r
| Java code imports the wrong \`R\` | Check the module \`namespace\`. Import that generated \`R\` class when the Java class is in a different package. |\r
| A resource works on one device but not another | Check configuration-specific resource folders and provide a default resource when one is needed. |\r
\r
## Practice: change the app label\r
\r
1. Find the app module's \`namespace\` and \`applicationId\` in its build file.\r
2. Open \`res/values/strings.xml\` and change the \`app_name\` value.\r
3. Confirm that the manifest's application label refers to \`@string/app_name\`.\r
4. Build and run the app, then check the name shown in the launcher and recent-apps screen.\r
5. Add a new layout string and reference it once from XML and once from Java.\r
\r
## Notes to remember\r
\r
- The project can contain multiple modules, and each module has its own build configuration.\r
- The wrapper scripts run the Gradle version selected by the project.\r
- \`namespace\`, \`applicationId\`, \`compileSdk\`, \`minSdk\`, and \`targetSdk\` have separate purposes.\r
- Resource names become generated IDs in \`R\`.\r
- Keep user-visible text in string resources instead of hardcoding it in every layout.\r
- Edit source files and resources, not generated output.\r
\r
## References\r
\r
- [Android build structure](https://developer.android.com/build/android-build-structure)\r
- [Configure your build](https://developer.android.com/build)\r
- [Configure the app module](https://developer.android.com/build/configure-app-module)\r
- [App resources overview for Views](https://developer.android.com/topic/architecture/views/resources/providing-resources-views)\r
- [Layout resources](https://developer.android.com/guide/topics/resources/layout-resource)\r
- [String resources](https://developer.android.com/guide/topics/resources/string-resource)\r
\r
`,"./chapters/04-activities-and-lifecycle.md":`# 4. Activities and the Android lifecycle\r
\r
[Back to notes index](../README.md)\r
\r
| [Previous: Project structure, Gradle, and resources](03-project-structure-and-resources.md) | [Notes index](../README.md) | [Next: XML layouts, views, themes, and View Binding](05-xml-layouts-and-viewbinding.md) |\r
|:--|:--:|--:|\r
\r
## Activity as a screen controller\r
\r
An \`Activity\` is an Android app component that provides a window for a user interface. The system creates and manages activity instances as the user opens, leaves, and returns to screens. An activity is declared in the manifest, and its lifecycle callbacks are the points where the app can respond to those changes.\r
\r
For a Java and XML screen, \`onCreate()\` is where I usually inflate the layout, find views, restore small saved state, and connect listeners. The activity should coordinate the screen. Data that needs to outlive an activity instance belongs in a suitable state holder or storage layer, covered in later notes.\r
\r
## The main lifecycle callbacks\r
\r
| Callback | What it tells me | Typical work |\r
| --- | --- | --- |\r
| \`onCreate()\` | A new activity instance is being created. | Set up the screen, initialize fields, and restore saved state if supplied. |\r
| \`onStart()\` | The activity is becoming visible. | Start work needed while the activity can be seen. |\r
| \`onResume()\` | The activity is in the foreground and ready for interaction. | Resume focused interactions such as a camera preview or an animation that should run only while active. |\r
| \`onPause()\` | The activity is losing focus. It may still be partly visible. | Pause work that should not continue while the user is interacting elsewhere. Keep this callback quick. |\r
| \`onStop()\` | The activity is no longer visible. | Release or reduce resources that are not needed while the screen is hidden. |\r
| \`onDestroy()\` | This activity instance is being removed. | Release remaining instance-owned resources when this callback occurs. Do not depend on it for saving important data. |\r
\r
\`onRestart()\` can occur when a stopped activity is coming back. It is followed by \`onStart()\` and \`onResume()\`. It is not one of the six main callbacks listed above, but it can be useful when reading lifecycle logs.\r
\r
## Common transitions\r
\r
The usual first launch sequence is:\r
\r
\`\`\`text\r
onCreate -> onStart -> onResume\r
\`\`\`\r
\r
When another screen or app fully covers the activity, it usually receives:\r
\r
\`\`\`text\r
onPause -> onStop\r
\`\`\`\r
\r
When the user returns to that stopped activity, it usually receives:\r
\r
\`\`\`text\r
onRestart -> onStart -> onResume\r
\`\`\`\r
\r
An interruption that only takes focus may call \`onPause()\` without \`onStop()\`. For example, multi-window or a temporary overlay can leave an activity visible but not in focus. The exact transitions depend on what is covering the activity and the device state, so lifecycle code should respond to the callback meaning rather than assume every transition is identical.\r
\r
When an activity finishes, it normally moves through the pause and stop states before destruction. A configuration change such as rotation can destroy the current instance and create a new one. The system may also terminate a stopped app process to reclaim memory. In that case, the app cannot rely on \`onDestroy()\` being called before the process disappears.\r
\r
## Observe callbacks with Logcat\r
\r
Logging each callback makes transitions easier to understand. Add the following pattern to an activity and replace the message for each callback you want to observe:\r
\r
\`\`\`java\r
private static final String TAG = "MainActivity";\r
\r
@Override\r
protected void onStart() {\r
    super.onStart();\r
    Log.d(TAG, "onStart");\r
}\r
\r
@Override\r
protected void onStop() {\r
    super.onStop();\r
    Log.d(TAG, "onStop");\r
}\r
\`\`\`\r
\r
Import \`android.util.Log\`, run the app, and watch Logcat while opening another app, returning, rotating the device, and finishing the activity. Each app action can trigger more than one callback, so read the log in order.\r
\r
## Restore a small piece of screen state\r
\r
The \`Bundle\` passed to \`onCreate()\` can contain state saved when Android recreates the activity. This is appropriate for small transient values needed to reconstruct the visible screen. It is not long-term storage for app data.\r
\r
\`\`\`java\r
package com.example.studyapp;\r
\r
import android.app.Activity;\r
import android.os.Bundle;\r
import android.view.View;\r
import android.widget.Button;\r
import android.widget.TextView;\r
\r
public class MainActivity extends Activity {\r
    private static final String STATE_TAP_COUNT = "tap_count";\r
\r
    private int tapCount;\r
    private TextView countLabel;\r
\r
    @Override\r
    protected void onCreate(Bundle savedInstanceState) {\r
        super.onCreate(savedInstanceState);\r
        setContentView(R.layout.activity_main);\r
\r
        countLabel = (TextView) findViewById(R.id.count_label);\r
        Button countButton = (Button) findViewById(R.id.count_button);\r
\r
        if (savedInstanceState != null) {\r
            tapCount = savedInstanceState.getInt(STATE_TAP_COUNT, 0);\r
        }\r
        updateCountLabel();\r
\r
        countButton.setOnClickListener(new View.OnClickListener() {\r
            @Override\r
            public void onClick(View view) {\r
                tapCount++;\r
                updateCountLabel();\r
            }\r
        });\r
    }\r
\r
    private void updateCountLabel() {\r
        countLabel.setText(getString(R.string.tap_count, tapCount));\r
    }\r
\r
    @Override\r
    protected void onSaveInstanceState(Bundle outState) {\r
        outState.putInt(STATE_TAP_COUNT, tapCount);\r
        super.onSaveInstanceState(outState);\r
    }\r
}\r
\`\`\`\r
\r
The corresponding views need the IDs \`count_label\` and \`count_button\`. Add the formatted string to \`res/values/strings.xml\`:\r
\r
\`\`\`xml\r
<string name="tap_count">Taps: %1$d</string>\r
\`\`\`\r
\r
\`getString()\` formats \`%1$d\` with the integer count. \`onSaveInstanceState()\` writes a small integer into the outgoing bundle. When Android recreates the activity with saved state, \`onCreate()\` reads it and redraws the label. View IDs also let Android restore standard view state, such as text entered into an identified \`EditText\`.\r
\r
## Choose storage by how long the data should live\r
\r
| Data example | Suitable place |\r
| --- | --- |\r
| A view reference or temporary animation handle | The current activity instance. Recreate it in \`onCreate()\`. |\r
| Screen data needed during rotation | A \`ViewModel\`, which is introduced in the architecture notes. |\r
| A small value needed if Android recreates the activity after process death | Saved instance state, such as \`onSaveInstanceState()\`. |\r
| User data that should remain after closing or restarting the app | Persistent storage, covered in the local data notes. |\r
\r
Saved instance state should stay small. Store a value or an identifier that lets the screen reload data. Do not put large objects, bitmaps, or a whole database result into the bundle.\r
\r
## Lifecycle mistakes I watch for\r
\r
- Saving important data only in \`onDestroy()\`. Android may end the process without calling it.\r
- Doing slow work in \`onPause()\`. A new activity waits for this callback to finish.\r
- Assuming \`onPause()\` always means the activity is fully hidden. \`onStop()\` marks that it is no longer visible.\r
- Keeping a reference to an old activity or view after configuration recreation.\r
- Treating rotation as a process restart. The activity can be recreated while the process remains alive.\r
- Saving large objects in a \`Bundle\` instead of saving a small key and loading the data from its source.\r
\r
## Practice: check activity recreation\r
\r
Use the tap counter above and follow this sequence:\r
\r
1. Run the screen and tap the button several times.\r
2. Rotate the emulator and confirm that the counter value remains.\r
3. Press Home, then return to the app and observe the lifecycle log.\r
4. Close the activity with Back and open it again. Note whether the screen starts with a new count.\r
\r
The rotation case tests saved transient state. The close-and-reopen case is different because finishing the activity ends that screen session. Long-term user data needs persistent storage instead.\r
\r
## Notes to remember\r
\r
- The activity lifecycle describes the state of one activity instance.\r
- The activity is visible between \`onStart()\` and \`onStop()\`, and ready for direct interaction between \`onResume()\` and \`onPause()\`.\r
- A configuration change can replace an activity instance.\r
- \`onSaveInstanceState()\` is for a small amount of transient UI state, not durable app data.\r
- Do short work in lifecycle callbacks and release resources at the point they are no longer needed.\r
\r
## References\r
\r
- [Introduction to activities](https://developer.android.com/guide/components/activities/intro-activities)\r
- [The activity lifecycle](https://developer.android.com/guide/components/activities/activity-lifecycle)\r
- [Save UI states for Views](https://developer.android.com/topic/libraries/architecture/views/saving-states-views)\r
\r
\r
`,"./chapters/05-xml-layouts-and-viewbinding.md":`# 5. XML layouts, views, themes, and View Binding\r
\r
[Back to notes index](../README.md)\r
\r
| [Previous: Activities and the Android lifecycle](04-activities-and-lifecycle.md) | [Notes index](../README.md) | [Next: Events, forms, and validation](06-events-forms-and-validation.md) |\r
|:--|:--:|--:|\r
\r
## Layouts describe a view hierarchy\r
\r
A view-based screen is a tree. A \`View\` draws part of the screen or receives interaction. A \`ViewGroup\` is a container that measures and positions child views. \`TextView\`, \`EditText\`, \`Button\`, and \`ImageView\` are common views. \`LinearLayout\`, \`FrameLayout\`, and \`ConstraintLayout\` are common containers.\r
\r
An XML layout has one root element. Its child elements form the rest of the hierarchy. XML keeps the screen structure separate from Java behavior, while the activity inflates the layout and connects events or data to it.\r
\r
\`\`\`text\r
LinearLayout\r
├── TextView\r
├── EditText\r
└── Button\r
\`\`\`\r
\r
The parent container controls how its children are laid out. Attributes beginning with \`layout_\` are interpreted by the parent, so a child can have different layout parameters under different parents.\r
\r
## Choosing a layout container\r
\r
| Container | Useful when | Things to remember |\r
| --- | --- | --- |\r
| \`LinearLayout\` | Items form one row or one column. | Set \`android:orientation\`. Avoid deep chains of nested layouts. |\r
| \`FrameLayout\` | One child fills an area, or children need to overlap. | Later children can draw above earlier children. |\r
| \`ConstraintLayout\` | Several views need flexible positions relative to the parent or other views. | Each view needs enough constraints to determine its position and size. |\r
\r
\`ConstraintLayout\` comes from AndroidX. Use it when the project has the matching dependency. For a short vertical screen, \`LinearLayout\` is often easier to read. The layout choice should keep the hierarchy clear and adapt to the available screen size.\r
\r
## Size, spacing, and text dimensions\r
\r
- \`match_parent\` asks a child to use the size available from its parent.\r
- \`wrap_content\` asks a child to use the size needed by its content.\r
- \`dp\` is a density-independent unit for layout size and spacing.\r
- \`sp\` is a scalable unit for text size and respects the user's font-size preference.\r
- Padding is inside a view's boundary. Margin is space around a child, set by its parent layout parameters.\r
\r
In \`ConstraintLayout\`, \`0dp\` means match the available space between constraints. In other containers, \`0dp\` can mean an actual zero dimension or be interpreted with layout-specific rules. Read the parent layout's behavior before copying dimensions.\r
\r
## A small XML screen\r
\r
This layout has a title, an input field, and a button. Text is referenced from resources instead of being fixed in the layout.\r
\r
\`\`\`xml\r
<?xml version="1.0" encoding="utf-8"?>\r
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"\r
    android:layout_width="match_parent"\r
    android:layout_height="match_parent"\r
    android:orientation="vertical"\r
    android:padding="24dp">\r
\r
    <TextView\r
        android:id="@+id/screen_title"\r
        style="@style/StudyApp.Heading"\r
        android:layout_width="match_parent"\r
        android:layout_height="wrap_content"\r
        android:text="@string/screen_title" />\r
\r
    <EditText\r
        android:id="@+id/topic_input"\r
        android:layout_width="match_parent"\r
        android:layout_height="wrap_content"\r
        android:layout_marginTop="16dp"\r
        android:hint="@string/topic_hint"\r
        android:inputType="textCapSentences" />\r
\r
    <Button\r
        android:id="@+id/save_topic"\r
        android:layout_width="wrap_content"\r
        android:layout_height="wrap_content"\r
        android:layout_marginTop="16dp"\r
        android:text="@string/save_topic" />\r
\r
</LinearLayout>\r
\`\`\`\r
\r
The \`@+id/name\` form creates an ID the first time it is used. Later references use \`@id/name\`. Names such as \`screen_title\` become Java fields such as \`screenTitle\` when View Binding is generated.\r
\r
The referenced strings belong in \`res/values/strings.xml\`:\r
\r
\`\`\`xml\r
<resources>\r
    <string name="screen_title">Topics I am studying</string>\r
    <string name="topic_hint">Enter a topic</string>\r
    <string name="save_topic">Save topic</string>\r
</resources>\r
\`\`\`\r
\r
## Styles and themes\r
\r
A style is a group of appearance attributes for an individual view. A theme is a group of attributes available across an app, an activity, or a view hierarchy. The app theme can provide shared colors, typography, and window settings. A view style can reuse a common text size or other view attributes.\r
\r
For example, this style can be placed in a \`res/values/styles.xml\` or an existing style resource file:\r
\r
\`\`\`xml\r
<resources>\r
    <style name="StudyApp.Heading">\r
        <item name="android:textSize">22sp</item>\r
        <item name="android:textStyle">bold</item>\r
    </style>\r
</resources>\r
\`\`\`\r
\r
The layout applies it with \`style="@style/StudyApp.Heading"\`. Keep the theme parent and existing theme setup generated by the project unless there is a reason to change them. Theme parents can depend on the UI libraries included by the app.\r
\r
Colors are easier to maintain when their roles are named in resources, such as a primary color, a surface color, and text on that surface. For light and dark appearances, the project can keep matching resource values under \`values/\` and \`values-night/\`. Avoid choosing a fixed text or background color that becomes unreadable in the other appearance. Full contrast and accessibility checks are in the accessibility notes.\r
\r
## View Binding\r
\r
View Binding generates a binding class for each XML layout in a module. The class contains references to views that have IDs. This replaces repeated \`findViewById()\` calls for those views and gives Java code direct fields.\r
\r
Enable View Binding in the app module build file. This example uses the Groovy syntax for \`app/build.gradle\`; match the syntax already used by the project:\r
\r
\`\`\`groovy\r
android {\r
    buildFeatures {\r
        viewBinding true\r
    }\r
}\r
\`\`\`\r
\r
For \`activity_main.xml\`, the generated class is \`ActivityMainBinding\`. A Java activity can inflate it and use its fields:\r
\r
\`\`\`java\r
package com.example.studyapp;\r
\r
import android.app.Activity;\r
import android.os.Bundle;\r
import android.view.View;\r
\r
import com.example.studyapp.databinding.ActivityMainBinding;\r
\r
public class MainActivity extends Activity {\r
    private ActivityMainBinding binding;\r
\r
    @Override\r
    protected void onCreate(Bundle savedInstanceState) {\r
        super.onCreate(savedInstanceState);\r
\r
        binding = ActivityMainBinding.inflate(getLayoutInflater());\r
        setContentView(binding.getRoot());\r
\r
        binding.saveTopic.setOnClickListener(new View.OnClickListener() {\r
            @Override\r
            public void onClick(View view) {\r
                String topic = binding.topicInput.getText().toString().trim();\r
                if (!topic.isEmpty()) {\r
                    binding.screenTitle.setText(topic);\r
                }\r
            }\r
        });\r
    }\r
}\r
\`\`\`\r
\r
The generated package in the import follows the module namespace. The generated class and field names come from the layout file and view IDs. When the XML or an ID changes, Gradle must rebuild the generated binding before the new field appears. If the binding class is unresolved, check that View Binding is enabled, the layout has no XML errors, and the ID spelling is correct.\r
\r
## Quick comparison\r
\r
| Access approach | What I use it for |\r
| --- | --- |\r
| \`findViewById()\` | A direct lookup in a layout when View Binding is not enabled. |\r
| View Binding | Typed references to identified views in an XML layout. It does not add expressions or business logic to XML. |\r
| Data Binding | A separate library with binding expressions and additional setup. It is not needed for the examples in these notes. |\r
\r
## Layout and theme checks\r
\r
- Make sure every view has both \`layout_width\` and \`layout_height\`.\r
- Give each view a clear ID when Java needs to read or update it.\r
- Keep string text in string resources and reuse styles for repeated appearance.\r
- Use \`dp\` for dimensions and \`sp\` for text.\r
- Check that the layout remains usable with longer text, larger system fonts, and a narrow screen.\r
- If a view appears in one layout variant but not another, account for that difference in code.\r
- Inspect the rendered hierarchy with Android Studio's Layout Inspector when spacing differs from expectations.\r
\r
## Practice: add a topic\r
\r
Use the XML screen and binding example to read the text entered in \`topic_input\`. When the button is tapped, show that topic in the heading. If the input is empty, leave the heading unchanged. Then switch the device appearance and check that the screen colors remain readable.\r
\r
This exercise connects an XML hierarchy, IDs, string resources, a style, generated binding fields, and a Java click listener.\r
\r
## Notes to remember\r
\r
- XML describes a view hierarchy. Java controls its behavior.\r
- The parent \`ViewGroup\` determines how each child is measured and positioned.\r
- A style is for view appearance. A theme provides attributes across a larger UI scope.\r
- View Binding generates Java references from layouts and IDs.\r
- Check the generated class name from the layout file name, not from the activity name.\r
- Test layouts with different text sizes and screen widths.\r
\r
## References\r
\r
- [Layouts in Views](https://developer.android.com/develop/ui/views/layout/declaring-layout)\r
- [View Binding](https://developer.android.com/topic/libraries/view-binding)\r
- [Styles and themes](https://developer.android.com/develop/ui/views/theming/themes)\r
- [Dark theme](https://developer.android.com/develop/ui/views/theming/darktheme)\r
\r
\r
`,"./chapters/06-events-forms-and-validation.md":`# 6. Events, forms, and validation\r
\r
[Back to notes index](../README.md)\r
\r
| [Previous: XML layouts, views, themes, and View Binding](05-xml-layouts-and-viewbinding.md) | [Notes index](../README.md) | [Next: Intents, fragments, and navigation](07-navigation-intents-and-fragments.md) |\r
|:--|:--:|--:|\r
\r
## Events connect an action to behavior\r
\r
An event is something that happens in the interface, such as a button tap, a text change, or a selection. A listener receives that event so Java code can respond. For a button action, \`setOnClickListener()\` is the usual choice:\r
\r
\`\`\`java\r
binding.saveButton.setOnClickListener(view -> saveEntry());\r
\`\`\`\r
\r
The lambda is shorthand for an implementation of \`View.OnClickListener\`. In a project using an older Java source level, write the listener as an anonymous class:\r
\r
\`\`\`java\r
binding.saveButton.setOnClickListener(new View.OnClickListener() {\r
    @Override\r
    public void onClick(View view) {\r
        saveEntry();\r
    }\r
});\r
\`\`\`\r
\r
Use the highest-level listener that describes the interaction. A click listener represents an action. A touch listener exposes lower-level touch events and is useful for gestures or custom touch behavior, but it should not replace a click listener for an ordinary button. Do not use keyboard key events to detect text typed into an \`EditText\`; the input method can be a software keyboard and does not behave like a physical key for every character.\r
\r
## Tell the keyboard what the field accepts\r
\r
\`android:inputType\` hints the kind of content a field accepts and helps the system choose an appropriate keyboard. It does not validate the value. A numeric keyboard makes number entry easier, but code must still handle empty or malformed input.\r
\r
\`android:imeOptions\` changes the action shown on the keyboard, such as Next or Done. It also does not validate input. Keep a visible button for the main action so it remains discoverable to touch, keyboard, and accessibility users.\r
\r
\`\`\`xml\r
<EditText\r
    android:id="@+id/topic_input"\r
    android:layout_width="match_parent"\r
    android:layout_height="wrap_content"\r
    android:hint="@string/topic_hint"\r
    android:inputType="textCapSentences"\r
    android:imeOptions="actionNext" />\r
\r
<EditText\r
    android:id="@+id/minutes_input"\r
    android:layout_width="match_parent"\r
    android:layout_height="wrap_content"\r
    android:hint="@string/minutes_hint"\r
    android:inputType="number"\r
    android:imeOptions="actionDone" />\r
\`\`\`\r
\r
Use \`textEmailAddress\`, \`phone\`, \`numberDecimal\`, or another suitable input type when it matches the data. The right choice improves entry, but never treat the keyboard layout as proof that a value is valid.\r
\r
## A small study entry form\r
\r
This screen records a topic and the number of minutes spent on it. Text is kept in string resources, and each field has a visible label. A hint can disappear while someone types, so it should not be the only label for important fields.\r
\r
\`\`\`xml\r
<?xml version="1.0" encoding="utf-8"?>\r
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"\r
    android:layout_width="match_parent"\r
    android:layout_height="match_parent"\r
    android:orientation="vertical"\r
    android:padding="24dp">\r
\r
    <TextView\r
        android:id="@+id/screen_title"\r
        android:layout_width="match_parent"\r
        android:layout_height="wrap_content"\r
        android:text="@string/study_entry_title"\r
        android:textSize="22sp"\r
        android:textStyle="bold" />\r
\r
    <TextView\r
        android:id="@+id/topic_label"\r
        android:layout_width="match_parent"\r
        android:layout_height="wrap_content"\r
        android:layout_marginTop="20dp"\r
        android:labelFor="@id/topic_input"\r
        android:text="@string/topic_label" />\r
\r
    <EditText\r
        android:id="@+id/topic_input"\r
        android:layout_width="match_parent"\r
        android:layout_height="wrap_content"\r
        android:hint="@string/topic_hint"\r
        android:inputType="textCapSentences"\r
        android:imeOptions="actionNext" />\r
\r
    <TextView\r
        android:id="@+id/minutes_label"\r
        android:layout_width="match_parent"\r
        android:layout_height="wrap_content"\r
        android:layout_marginTop="12dp"\r
        android:labelFor="@id/minutes_input"\r
        android:text="@string/minutes_label" />\r
\r
    <EditText\r
        android:id="@+id/minutes_input"\r
        android:layout_width="match_parent"\r
        android:layout_height="wrap_content"\r
        android:hint="@string/minutes_hint"\r
        android:inputType="number"\r
        android:imeOptions="actionDone" />\r
\r
    <Button\r
        android:id="@+id/save_button"\r
        android:layout_width="wrap_content"\r
        android:layout_height="wrap_content"\r
        android:layout_marginTop="16dp"\r
        android:text="@string/save_entry" />\r
\r
    <TextView\r
        android:id="@+id/save_status"\r
        android:layout_width="match_parent"\r
        android:layout_height="wrap_content"\r
        android:layout_marginTop="12dp"\r
        android:accessibilityLiveRegion="polite" />\r
\r
</LinearLayout>\r
\`\`\`\r
\r
The matching values in \`res/values/strings.xml\`:\r
\r
\`\`\`xml\r
<resources>\r
    <string name="study_entry_title">Record a study session</string>\r
    <string name="topic_label">Topic</string>\r
    <string name="topic_hint">For example, activity lifecycle</string>\r
    <string name="minutes_label">Minutes studied</string>\r
    <string name="minutes_hint">Enter a number from 1 to 600</string>\r
    <string name="save_entry">Save entry</string>\r
    <string name="topic_required">Enter a topic.</string>\r
    <string name="minutes_required">Enter the number of minutes.</string>\r
    <string name="minutes_invalid">Enter a whole number from 1 to 600.</string>\r
    <string name="entry_saved">Saved %1$s for %2$d minutes.</string>\r
</resources>\r
\`\`\`\r
\r
The \`android:labelFor\` attribute connects each visible label to its field for accessibility services. The status view announces a changed message politely, without interrupting the user.\r
\r
## Read and validate the values in Java\r
\r
With View Binding enabled as described in the layout notes, the generated \`ActivityMainBinding\` exposes the fields by their IDs. The click callback calls one method, which reads the current values, validates them, and only then updates the screen.\r
\r
\`\`\`java\r
package com.example.studyapp;\r
\r
import android.app.Activity;\r
import android.os.Bundle;\r
import android.text.TextUtils;\r
import android.view.View;\r
\r
import com.example.studyapp.databinding.ActivityMainBinding;\r
\r
public class MainActivity extends Activity {\r
    private ActivityMainBinding binding;\r
\r
    @Override\r
    protected void onCreate(Bundle savedInstanceState) {\r
        super.onCreate(savedInstanceState);\r
\r
        binding = ActivityMainBinding.inflate(getLayoutInflater());\r
        setContentView(binding.getRoot());\r
\r
        binding.saveButton.setOnClickListener(view -> saveEntry());\r
    }\r
\r
    private void saveEntry() {\r
        String topic = binding.topicInput.getText().toString().trim();\r
        String minutesText = binding.minutesInput.getText().toString().trim();\r
\r
        binding.topicInput.setError(null);\r
        binding.minutesInput.setError(null);\r
        binding.saveStatus.setText("");\r
\r
        if (TextUtils.isEmpty(topic)) {\r
            binding.topicInput.setError(getString(R.string.topic_required));\r
            binding.topicInput.requestFocus();\r
            return;\r
        }\r
\r
        if (TextUtils.isEmpty(minutesText)) {\r
            binding.minutesInput.setError(getString(R.string.minutes_required));\r
            binding.minutesInput.requestFocus();\r
            return;\r
        }\r
\r
        final int minutes;\r
        try {\r
            minutes = Integer.parseInt(minutesText);\r
        } catch (NumberFormatException exception) {\r
            binding.minutesInput.setError(getString(R.string.minutes_invalid));\r
            binding.minutesInput.requestFocus();\r
            return;\r
        }\r
\r
        if (minutes < 1 || minutes > 600) {\r
            binding.minutesInput.setError(getString(R.string.minutes_invalid));\r
            binding.minutesInput.requestFocus();\r
            return;\r
        }\r
\r
        binding.saveStatus.setText(\r
                getString(R.string.entry_saved, topic, minutes)\r
        );\r
    }\r
}\r
\`\`\`\r
\r
\`trim()\` removes leading and trailing whitespace, so a field containing only spaces counts as empty. \`setError()\` associates a message with the field, and \`requestFocus()\` moves focus to the value that needs attention. Each invalid case returns before the success state, so invalid data is never treated as saved.\r
\r
The \`try\` and \`catch\` around \`Integer.parseInt()\` matters even with a numeric keyboard. Text can arrive through paste, an accessibility service, or another input path. Parsing can fail, and handling \`NumberFormatException\` keeps the activity from crashing. A valid number can still be outside the allowed range, so the range check is separate.\r
\r
For form code that uses \`findViewById()\` rather than binding, the same rules apply. Read the field with \`editText.getText().toString().trim()\`, validate it, and only continue after it passes.\r
\r
## Decide when validation should run\r
\r
For a short form, validating after the user presses Save is often clear and predictable. It avoids showing an error while someone is still entering a value. After an invalid submission, show a short field-specific message and keep the entered values so they can correct the problem.\r
\r
\`TextWatcher\` observes changes to editable text. It can support immediate feedback, such as a character count, or enable a button when a field is nonempty. It runs as the text changes, so keep its work small. Avoid network requests or expensive processing on every keystroke. If live validation is needed, wait until the user has paused typing or validate after a field loses focus. Do not attach the same watcher repeatedly, since that can result in duplicate callbacks.\r
\r
\`\`\`java\r
binding.topicInput.addTextChangedListener(new android.text.TextWatcher() {\r
    @Override\r
    public void beforeTextChanged(CharSequence text, int start, int count, int after) {\r
        // No work needed before the text changes.\r
    }\r
\r
    @Override\r
    public void onTextChanged(CharSequence text, int start, int before, int count) {\r
        binding.saveButton.setEnabled(text.toString().trim().length() > 0);\r
    }\r
\r
    @Override\r
    public void afterTextChanged(android.text.Editable editable) {\r
        // Keep this empty when the check belongs in onTextChanged.\r
    }\r
});\r
\`\`\`\r
\r
If code changes the same field from inside a watcher, it can trigger another text change. Avoid that loop or remove the watcher while applying programmatic formatting.\r
\r
## Event and form checks\r
\r
- Use a click listener for a normal button action. Use touch events only when the interaction needs gesture-level details.\r
- Set \`inputType\` to help the user enter the expected kind of value, then validate in Java.\r
- Treat empty strings, whitespace, parsing failures, and range limits as separate checks.\r
- Use concise error text that says how to fix the field.\r
- Keep the entered values when showing an error, and do not report success until every required value passes.\r
- Move focus to the first invalid field and make sure the message is available to accessibility services.\r
- Keep click callbacks short. Move slow work away from the main thread and show a clear pending state if saving later involves a network request.\r
- Prevent repeated submission while an asynchronous save is already running, then restore the button when that operation finishes.\r
\r
## Practice: add a study entry\r
\r
Use the screen and \`saveEntry()\` example to record a topic and time spent. Try an empty topic, whitespace in the topic, a blank duration, text pasted into the number field, zero, a value above 600, and a valid entry. Confirm that invalid input shows a useful message, keeps the form values, and never displays the saved status. Then enable and test the keyboard Next and Done actions on an emulator or device.\r
\r
## Notes to remember\r
\r
- A listener connects a user action to Java behavior.\r
- \`inputType\` helps configure the keyboard but does not validate a value.\r
- Read editable text as a \`String\`, trim it, and check it before using it.\r
- Parsing and range checks solve different problems. Handle both.\r
- Show errors beside the field that needs correction and stop before success behavior.\r
- Use \`TextWatcher\` for lightweight feedback when it improves the interaction.\r
\r
## References\r
\r
- [Handle input events](https://developer.android.com/develop/ui/views/touch-and-input/input-events)\r
- [EditText reference](https://developer.android.com/reference/android/widget/EditText)\r
- [Specify input method types](https://developer.android.com/develop/ui/views/touch-and-input/keyboard-input/style)\r
- [Handle keyboard input](https://developer.android.com/develop/ui/views/touch-and-input/keyboard-input)\r
\r
`,"./chapters/07-navigation-intents-and-fragments.md":`# 7. Intents, fragments, and navigation\r
\r
[Back to notes index](../README.md)\r
\r
| [Previous: Events, forms, and validation](06-events-forms-and-validation.md) | [Notes index](../README.md) | [Next: Lists with RecyclerView and adapters](08-recyclerview-and-adapters.md) |\r
|:--|:--:|--:|\r
\r
## An Intent describes an action\r
\r
An \`Intent\` carries a request for another Android component to do something. It can name a component directly, describe an action for another app to handle, and carry small pieces of data in extras.\r
\r
| Intent type | How the target is chosen | Common use |\r
| --- | --- | --- |\r
| Explicit | The code names the exact component class. | Open a screen in the same app. |\r
| Implicit | Android finds an app that supports the requested action and data. | Share text or open a web link in another app. |\r
\r
For a screen inside my app, I use an explicit intent. Inside a click callback, the first activity creates the intent and sends the selected note's ID as an extra:\r
\r
\`\`\`java\r
import android.content.Intent;\r
\r
Intent intent = new Intent(this, NoteDetailActivity.class);\r
intent.putExtra(NoteDetailActivity.EXTRA_NOTE_ID, noteId);\r
startActivity(intent);\r
\`\`\`\r
\r
The destination reads the extra from its incoming intent:\r
\r
\`\`\`java\r
import android.os.Bundle;\r
\r
import androidx.fragment.app.FragmentActivity;\r
\r
public class NoteDetailActivity extends FragmentActivity {\r
    public static final String EXTRA_NOTE_ID = "com.example.studyapp.NOTE_ID";\r
\r
    @Override\r
    protected void onCreate(Bundle savedInstanceState) {\r
        super.onCreate(savedInstanceState);\r
        setContentView(R.layout.activity_note_detail);\r
\r
        long noteId = getIntent().getLongExtra(EXTRA_NOTE_ID, -1L);\r
        if (noteId == -1L) {\r
            finish();\r
            return;\r
        }\r
\r
        // Load the note identified by noteId.\r
    }\r
}\r
\`\`\`\r
\r
The activity layout can provide a simple destination view:\r
\r
\`\`\`xml\r
<?xml version="1.0" encoding="utf-8"?>\r
<TextView xmlns:android="http://schemas.android.com/apk/res/android"\r
    android:id="@+id/note_detail_title"\r
    android:layout_width="match_parent"\r
    android:layout_height="match_parent"\r
    android:gravity="center"\r
    android:padding="24dp"\r
    android:text="@string/note_detail_placeholder"\r
    android:textSize="20sp" />\r
\`\`\`\r
\r
An ID is usually a better value to pass than a whole database record. The destination can load the current record from the data layer. Extras are for small values needed to identify or initialize the destination, not for large objects or long-lived state.\r
\r
Declare the destination activity in \`AndroidManifest.xml\`. An activity used only inside the app can stay unavailable to other apps:\r
\r
\`\`\`xml\r
<activity xmlns:android="http://schemas.android.com/apk/res/android"\r
    android:name=".NoteDetailActivity"\r
    android:exported="false" />\r
\`\`\`\r
\r
An activity with an intent filter that should be launched from outside the app needs a deliberate \`android:exported\` value. On current Android targets, components with intent filters must declare this value. Exposing an activity means other apps can attempt to start it, so validate incoming actions and data as untrusted input.\r
\r
## Implicit intents use another app\r
\r
For example, an app can ask Android to share a short text value. Android shows a chooser with apps that can accept it:\r
\r
\`\`\`java\r
import android.content.Intent;\r
\r
Intent shareIntent = new Intent(Intent.ACTION_SEND);\r
shareIntent.setType("text/plain");\r
shareIntent.putExtra(Intent.EXTRA_TEXT, "I am reviewing Android intents.");\r
\r
Intent chooser = Intent.createChooser(shareIntent, getString(R.string.share_note));\r
startActivity(chooser);\r
\`\`\`\r
\r
An implicit intent names an action, MIME type, and sometimes a \`Uri\`. It does not name a specific app. The system matches it against apps that have declared compatible intent filters. Use \`Intent.createChooser()\` when the person should select the receiving app.\r
\r
When an activity receives an implicit intent, validate its action, data scheme, MIME type, and extras before using them. An intent filter describes what a component can receive. It is not a security boundary and does not make input trustworthy.\r
\r
## Get an activity result\r
\r
The Activity Result APIs register a callback for an operation such as selecting an image. The launcher can be a field on a \`ComponentActivity\` or \`Fragment\` subclass:\r
\r
\`\`\`java\r
import androidx.activity.result.ActivityResultLauncher;\r
import androidx.activity.result.contract.ActivityResultContracts;\r
\r
private final ActivityResultLauncher<String> selectImage =\r
        registerForActivityResult(\r
                new ActivityResultContracts.GetContent(),\r
                uri -> {\r
                    if (uri != null) {\r
                        // Read or display the selected image URI.\r
                    }\r
                }\r
        );\r
\`\`\`\r
\r
A button can launch the registered contract:\r
\r
\`\`\`java\r
binding.selectImageButton.setOnClickListener(view -> selectImage.launch("image/*"));\r
\`\`\`\r
\r
Register the callback every time the activity or fragment is created, in a stable order. Registering it only inside a click callback can lose a pending result if Android recreates the screen while another app is open. For the same reason, save any extra state needed to process the result separately from the callback. The Activity Result APIs replace the older \`startActivityForResult()\` and \`onActivityResult()\` pattern for new code.\r
\r
## An Activity hosts a screen, a Fragment is a reusable part\r
\r
An \`Activity\` is an app component that Android can launch. A \`Fragment\` represents part of a UI and its behavior inside a host, usually an activity. A fragment has its own lifecycle, but it depends on its host and cannot appear on its own.\r
\r
Fragments are useful when a screen needs reusable sections, a list and detail layout, or a navigation area that changes while the activity stays in place. A separate activity can be simpler for a distinct destination or a task with its own window behavior. I avoid adding fragments just to split a very small screen into more files.\r
\r
The fragment library is AndroidX. The app module needs the Fragment dependency, and the versions should follow the project's AndroidX setup. \`FragmentActivity\` is a host that provides \`getSupportFragmentManager()\`:\r
\r
\`\`\`java\r
import android.os.Bundle;\r
\r
import androidx.fragment.app.FragmentActivity;\r
\r
public class MainActivity extends FragmentActivity {\r
    @Override\r
    protected void onCreate(Bundle savedInstanceState) {\r
        super.onCreate(savedInstanceState);\r
        setContentView(R.layout.activity_main);\r
\r
        if (savedInstanceState == null) {\r
            getSupportFragmentManager()\r
                    .beginTransaction()\r
                    .setReorderingAllowed(true)\r
                    .replace(R.id.fragment_container, NoteListFragment.class, null)\r
                    .commit();\r
        }\r
    }\r
}\r
\`\`\`\r
\r
The \`savedInstanceState == null\` check prevents the app from adding a second initial fragment after a configuration change. The \`FragmentManager\` restores its fragments and back stack as the activity is recreated.\r
\r
The host layout supplies a container for the fragment:\r
\r
\`\`\`xml\r
<?xml version="1.0" encoding="utf-8"?>\r
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"\r
    android:id="@+id/fragment_container"\r
    android:layout_width="match_parent"\r
    android:layout_height="match_parent" />\r
\`\`\`\r
\r
The list fragment needs a layout containing the button looked up by \`R.id.open_detail\`:\r
\r
\`\`\`xml\r
<?xml version="1.0" encoding="utf-8"?>\r
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"\r
    android:layout_width="match_parent"\r
    android:layout_height="match_parent"\r
    android:gravity="center"\r
    android:orientation="vertical"\r
    android:padding="24dp">\r
\r
    <Button\r
        android:id="@+id/open_detail"\r
        android:layout_width="wrap_content"\r
        android:layout_height="wrap_content"\r
        android:text="@string/open_note" />\r
\r
</LinearLayout>\r
\`\`\`\r
\r
Add these values to \`res/values/strings.xml\`:\r
\r
\`\`\`xml\r
<resources>\r
    <string name="share_note">Share note</string>\r
    <string name="open_note">Open a saved note</string>\r
    <string name="note_detail_placeholder">Selected note details appear here</string>\r
</resources>\r
\`\`\`\r
\r
The fragment creates its view in \`onCreateView()\`. The fragment instance and its view have related but separate lifecycles. The view can be destroyed while the fragment remains on the back stack, so view references must not be used after \`onDestroyView()\`.\r
\r
\`\`\`java\r
import android.os.Bundle;\r
import android.view.LayoutInflater;\r
import android.view.View;\r
import android.view.ViewGroup;\r
import android.widget.Button;\r
\r
import androidx.annotation.NonNull;\r
import androidx.annotation.Nullable;\r
import androidx.fragment.app.Fragment;\r
\r
public class NoteListFragment extends Fragment {\r
    @Nullable\r
    @Override\r
    public View onCreateView(\r
            @NonNull LayoutInflater inflater,\r
            @Nullable ViewGroup container,\r
            @Nullable Bundle savedInstanceState\r
    ) {\r
        return inflater.inflate(R.layout.fragment_note_list, container, false);\r
    }\r
\r
    @Override\r
    public void onViewCreated(\r
            @NonNull View view,\r
            @Nullable Bundle savedInstanceState\r
    ) {\r
        super.onViewCreated(view, savedInstanceState);\r
        Button openDetail = view.findViewById(R.id.open_detail);\r
        openDetail.setOnClickListener(ignored -> openNoteDetail());\r
    }\r
\r
    private void openNoteDetail() {\r
        Bundle arguments = new Bundle();\r
        arguments.putLong(NoteDetailFragment.ARG_NOTE_ID, 42L);\r
\r
        getParentFragmentManager()\r
                .beginTransaction()\r
                .setReorderingAllowed(true)\r
                .replace(R.id.fragment_container, NoteDetailFragment.class, arguments)\r
                .addToBackStack(null)\r
                .commit();\r
    }\r
}\r
\`\`\`\r
\r
The details screen reads the argument when its fragment is created:\r
\r
\`\`\`java\r
import android.os.Bundle;\r
import android.view.View;\r
\r
import androidx.annotation.NonNull;\r
import androidx.annotation.Nullable;\r
import androidx.fragment.app.Fragment;\r
\r
public class NoteDetailFragment extends Fragment {\r
    public static final String ARG_NOTE_ID = "note_id";\r
\r
    public NoteDetailFragment() {\r
        super(R.layout.fragment_note_detail);\r
    }\r
\r
    @Override\r
    public void onViewCreated(\r
            @NonNull View view,\r
            @Nullable Bundle savedInstanceState\r
    ) {\r
        super.onViewCreated(view, savedInstanceState);\r
        long noteId = requireArguments().getLong(ARG_NOTE_ID, -1L);\r
\r
        // Load and display the note identified by noteId.\r
    }\r
}\r
\`\`\`\r
\r
Its \`fragment_note_detail.xml\` can start with the same simple placeholder view:\r
\r
\`\`\`xml\r
<?xml version="1.0" encoding="utf-8"?>\r
<TextView xmlns:android="http://schemas.android.com/apk/res/android"\r
    android:id="@+id/note_detail_content"\r
    android:layout_width="match_parent"\r
    android:layout_height="match_parent"\r
    android:gravity="center"\r
    android:padding="24dp"\r
    android:text="@string/note_detail_placeholder"\r
    android:textSize="20sp" />\r
\`\`\`\r
\r
Use a no-argument fragment constructor and pass initial values through a \`Bundle\`. The \`FragmentManager\` may recreate a fragment after process or configuration changes, so it must be able to instantiate it again. Avoid storing a direct reference to an activity or another fragment as a way to pass data.\r
\r
## Understand the FragmentManager back stack\r
\r
\`FragmentManager\` applies fragment changes in a \`FragmentTransaction\`. \`replace()\` removes the current fragment from the container and shows another one. \`commit()\` schedules the transaction on the main thread; it does not run the change synchronously.\r
\r
The initial list screen was committed without \`addToBackStack()\`, so it is the root. The detail screen was added with \`addToBackStack(null)\`, so Back reverses that transaction and returns to the list. If every screen is added to the back stack, Back can lead to an empty container or an unexpected path. Decide which destinations form the root of the flow.\r
\r
Use \`setReorderingAllowed(true)\` on transactions, particularly those on the back stack. Do not use \`commitNow()\` for a transaction that you also add to the back stack. Let the manager restore fragments rather than unconditionally creating new instances after recreation.\r
\r
For a small flow, \`FragmentManager\` transactions can be enough. A larger app with defined destinations, deep links, and back behavior may benefit from the AndroidX Navigation component. It keeps destinations and transitions in a navigation graph, and can work with activities and fragments. Either way, a navigation action should carry only the information the destination needs, such as a database ID.\r
\r
## Pass information without coupling screens\r
\r
Use fragment arguments for values needed when the destination first appears. To return a one-time result, such as a selected filter, the Fragment Result API lets one fragment send a \`Bundle\` through a \`FragmentManager\`:\r
\r
\`\`\`java\r
// In the receiving fragment, register while creating the fragment.\r
getParentFragmentManager().setFragmentResultListener(\r
        "selected_topic",\r
        this,\r
        (requestKey, result) -> {\r
            String topic = result.getString("topic");\r
            // Update this screen with the selected topic.\r
        }\r
);\r
\`\`\`\r
\r
\`\`\`java\r
// In the fragment that returns a selection.\r
Bundle result = new Bundle();\r
result.putString("topic", selectedTopic);\r
getParentFragmentManager().setFragmentResult("selected_topic", result);\r
\`\`\`\r
\r
The Fragment Result API is available in AndroidX Fragment 1.3.0 and later. The receiving listener runs when its lifecycle is at least \`STARTED\`. Use a shared \`ViewModel\` when two screens need to observe ongoing shared UI state. These approaches avoid keeping direct references between fragment instances. The next notes chapter covers \`ViewModel\` and \`LiveData\`.\r
\r
## Notes to remember\r
\r
- Use explicit intents for a known component in the same app and implicit intents for an action another app can handle.\r
- Validate incoming intent data, even when the destination belongs to the same app.\r
- Pass small IDs or values through extras and arguments. Load larger or persistent data from the app's data layer.\r
- Register Activity Result callbacks with the activity or fragment lifecycle and keep registration order stable.\r
- A fragment's view lifecycle can end before the fragment instance does.\r
- \`addToBackStack()\` makes a transaction reversible when the user presses Back.\r
- Use arguments, Fragment Results, or a shared \`ViewModel\` instead of direct fragment references.\r
\r
## References\r
\r
- [Intents and intent filters](https://developer.android.com/guide/components/intents-filters)\r
- [Get a result from an activity](https://developer.android.com/training/basics/intents/result)\r
- [Fragment manager](https://developer.android.com/guide/fragments/fragmentmanager)\r
- [Fragment transactions](https://developer.android.com/guide/fragments/transactions)\r
- [Communicate with fragments](https://developer.android.com/guide/fragments/communicate)\r
- [Navigation](https://developer.android.com/guide/navigation)\r
\r
`,"./chapters/08-recyclerview-and-adapters.md":`# 8. Lists with RecyclerView and adapters\r
\r
[Back to notes index](../README.md)\r
\r
| [Previous: Intents, fragments, and navigation](07-navigation-intents-and-fragments.md) | [Notes index](../README.md) | [Next: App architecture with ViewModel and LiveData](09-architecture-viewmodel-livedata.md) |\r
|:--|:--:|--:|\r
\r
## How RecyclerView displays a changing list\r
\r
\`RecyclerView\` displays a collection of items without creating a permanent view for every row. As a row moves off screen, its view can be reused for another item. This keeps scrolling lists more efficient than building a large fixed set of views.\r
\r
Four pieces work together:\r
\r
| Part | Responsibility |\r
| --- | --- |\r
| \`RecyclerView\` | The scrolling container that requests rows. |\r
| \`Adapter\` | Creates row holders and binds each row to an item. |\r
| \`ViewHolder\` | Holds references to the views in one row. |\r
| \`LayoutManager\` | Decides whether rows appear in a vertical list, horizontal list, or grid. |\r
\r
The usual sequence is: provide a layout manager, attach an adapter, and submit data. The adapter inflates a row when needed and fills it with the item for that position.\r
\r
Add AndroidX RecyclerView to the app module using the project's version catalog or dependency conventions. The artifact is \`androidx.recyclerview:recyclerview\`. Keep dependency versions in one place when the project uses a version catalog.\r
\r
## Model the rows as data\r
\r
This example keeps a few study notes in a small immutable Java class. Each item has a stable ID, a title, and a summary. A stable ID lets the adapter recognize the same note after the list changes.\r
\r
\`\`\`java\r
public final class StudyNote {\r
    private final long id;\r
    private final String title;\r
    private final String summary;\r
\r
    public StudyNote(long id, String title, String summary) {\r
        this.id = id;\r
        this.title = title;\r
        this.summary = summary;\r
    }\r
\r
    public long getId() {\r
        return id;\r
    }\r
\r
    public String getTitle() {\r
        return title;\r
    }\r
\r
    public String getSummary() {\r
        return summary;\r
    }\r
}\r
\`\`\`\r
\r
Keeping the fields final makes it harder to accidentally change data after submitting a list. When the title or summary needs to change, create a new \`StudyNote\` with the same ID and the new values.\r
\r
## Define the screen and one row\r
\r
The screen layout contains the list and an empty message. The empty message starts hidden and becomes visible when there are no items.\r
\r
\`\`\`xml\r
<?xml version="1.0" encoding="utf-8"?>\r
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"\r
    android:layout_width="match_parent"\r
    android:layout_height="match_parent">\r
\r
    <androidx.recyclerview.widget.RecyclerView\r
        android:id="@+id/notes_list"\r
        android:layout_width="match_parent"\r
        android:layout_height="match_parent"\r
        android:clipToPadding="false"\r
        android:padding="16dp" />\r
\r
    <TextView\r
        android:id="@+id/empty_message"\r
        android:layout_width="match_parent"\r
        android:layout_height="wrap_content"\r
        android:layout_gravity="center"\r
        android:gravity="center"\r
        android:padding="24dp"\r
        android:text="@string/no_study_notes"\r
        android:visibility="gone" />\r
\r
</FrameLayout>\r
\`\`\`\r
\r
Each row is a separate layout file, here named \`item_study_note.xml\`:\r
\r
\`\`\`xml\r
<?xml version="1.0" encoding="utf-8"?>\r
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"\r
    android:layout_width="match_parent"\r
    android:layout_height="wrap_content"\r
    android:orientation="vertical"\r
    android:padding="16dp">\r
\r
    <TextView\r
        android:id="@+id/note_title"\r
        android:layout_width="match_parent"\r
        android:layout_height="wrap_content"\r
        android:textSize="18sp"\r
        android:textStyle="bold" />\r
\r
    <TextView\r
        android:id="@+id/note_summary"\r
        android:layout_width="match_parent"\r
        android:layout_height="wrap_content"\r
        android:layout_marginTop="4dp" />\r
\r
</LinearLayout>\r
\`\`\`\r
\r
The matching string belongs in \`res/values/strings.xml\`:\r
\r
\`\`\`xml\r
<resources>\r
    <string name="no_study_notes">No study notes yet.</string>\r
</resources>\r
\`\`\`\r
\r
## Bind each StudyNote in an adapter\r
\r
\`onCreateViewHolder()\` inflates a row. \`onBindViewHolder()\` fills it with one item, and \`getItemCount()\` reports how many items are currently in the list. \`ListAdapter\` adds background diff calculation so the adapter can update only the rows that changed.\r
\r
\`\`\`java\r
import android.view.LayoutInflater;\r
import android.view.View;\r
import android.view.ViewGroup;\r
import android.widget.TextView;\r
\r
import androidx.annotation.NonNull;\r
import androidx.recyclerview.widget.DiffUtil;\r
import androidx.recyclerview.widget.ListAdapter;\r
import androidx.recyclerview.widget.RecyclerView;\r
\r
public class StudyNoteAdapter\r
        extends ListAdapter<StudyNote, StudyNoteAdapter.NoteViewHolder> {\r
\r
    public interface OnNoteClickListener {\r
        void onNoteClick(StudyNote note);\r
    }\r
\r
    private static final DiffUtil.ItemCallback<StudyNote> DIFF_CALLBACK =\r
            new DiffUtil.ItemCallback<StudyNote>() {\r
                @Override\r
                public boolean areItemsTheSame(\r
                        @NonNull StudyNote oldItem,\r
                        @NonNull StudyNote newItem\r
                ) {\r
                    return oldItem.getId() == newItem.getId();\r
                }\r
\r
                @Override\r
                public boolean areContentsTheSame(\r
                        @NonNull StudyNote oldItem,\r
                        @NonNull StudyNote newItem\r
                ) {\r
                    return oldItem.getTitle().equals(newItem.getTitle())\r
                            && oldItem.getSummary().equals(newItem.getSummary());\r
                }\r
            };\r
\r
    private final OnNoteClickListener clickListener;\r
\r
    public StudyNoteAdapter(OnNoteClickListener clickListener) {\r
        super(DIFF_CALLBACK);\r
        this.clickListener = clickListener;\r
    }\r
\r
    @NonNull\r
    @Override\r
    public NoteViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {\r
        View row = LayoutInflater.from(parent.getContext())\r
                .inflate(R.layout.item_study_note, parent, false);\r
        return new NoteViewHolder(row);\r
    }\r
\r
    @Override\r
    public void onBindViewHolder(@NonNull NoteViewHolder holder, int position) {\r
        StudyNote note = getItem(position);\r
        holder.title.setText(note.getTitle());\r
        holder.summary.setText(note.getSummary());\r
\r
        holder.itemView.setOnClickListener(view -> {\r
            int currentPosition = holder.getBindingAdapterPosition();\r
            if (currentPosition != RecyclerView.NO_POSITION) {\r
                clickListener.onNoteClick(getItem(currentPosition));\r
            }\r
        });\r
    }\r
\r
    static class NoteViewHolder extends RecyclerView.ViewHolder {\r
        private final TextView title;\r
        private final TextView summary;\r
\r
        NoteViewHolder(@NonNull View itemView) {\r
            super(itemView);\r
            title = itemView.findViewById(R.id.note_title);\r
            summary = itemView.findViewById(R.id.note_summary);\r
        }\r
    }\r
}\r
\`\`\`\r
\r
\`areItemsTheSame()\` compares identity, which is the note ID. \`areContentsTheSame()\` compares the values shown by this row. If the visible values change, the adapter rebinds the row. If another property is added to the row later, include it in the content comparison.\r
\r
The click callback asks the holder for its current adapter position when tapped. Positions can change after a list update, so code should check for \`RecyclerView.NO_POSITION\` before looking up an item. Passing the \`StudyNote\` to the listener keeps the screen from depending on a temporary position.\r
\r
## Attach the adapter and provide sample data\r
\r
The activity configures a \`LinearLayoutManager\`, creates the adapter, and submits a list. A \`GridLayoutManager\` can be used instead when the screen needs a grid.\r
\r
\`\`\`java\r
import android.app.Activity;\r
import android.content.Intent;\r
import android.os.Bundle;\r
import android.view.View;\r
import android.widget.TextView;\r
\r
import androidx.recyclerview.widget.LinearLayoutManager;\r
import androidx.recyclerview.widget.RecyclerView;\r
\r
import java.util.ArrayList;\r
import java.util.List;\r
\r
public class NotesActivity extends Activity {\r
    private StudyNoteAdapter adapter;\r
    private TextView emptyMessage;\r
\r
    @Override\r
    protected void onCreate(Bundle savedInstanceState) {\r
        super.onCreate(savedInstanceState);\r
        setContentView(R.layout.activity_notes);\r
\r
        RecyclerView notesList = findViewById(R.id.notes_list);\r
        emptyMessage = findViewById(R.id.empty_message);\r
\r
        adapter = new StudyNoteAdapter(note -> {\r
            Intent intent = new Intent(this, NoteDetailActivity.class);\r
            intent.putExtra(NoteDetailActivity.EXTRA_NOTE_ID, note.getId());\r
            startActivity(intent);\r
        });\r
\r
        notesList.setLayoutManager(new LinearLayoutManager(this));\r
        notesList.setAdapter(adapter);\r
        showNotes(createSampleNotes());\r
    }\r
\r
    private List<StudyNote> createSampleNotes() {\r
        List<StudyNote> notes = new ArrayList<>();\r
        notes.add(new StudyNote(1L, "Activity lifecycle", "Callbacks and saved state"));\r
        notes.add(new StudyNote(2L, "RecyclerView", "Adapters and view holders"));\r
        notes.add(new StudyNote(3L, "Intents", "Move between app screens"));\r
        return notes;\r
    }\r
\r
    private void showNotes(List<StudyNote> notes) {\r
        adapter.submitList(notes);\r
        emptyMessage.setVisibility(notes.isEmpty() ? View.VISIBLE : View.GONE);\r
    }\r
}\r
\`\`\`\r
\r
The \`activity_notes.xml\` file is the screen layout shown earlier. The example keeps data in memory so the list mechanics are visible. In an app, a repository or a \`ViewModel\` can provide the list; a later chapter connects persistent data and UI state.\r
\r
When the list changes, make a new list and call \`submitList()\` again:\r
\r
\`\`\`java\r
List<StudyNote> updatedNotes = new ArrayList<>(adapter.getCurrentList());\r
updatedNotes.add(new StudyNote(4L, "Activities", "Lifecycle and state"));\r
adapter.submitList(updatedNotes);\r
\`\`\`\r
\r
Do not modify the list instance after giving it to a \`ListAdapter\`. \`DiffUtil\` assumes submitted lists and their items remain unchanged while it compares them. Use a new list for each update. For a plain \`RecyclerView.Adapter\`, call the matching notification method after a data change, such as \`notifyItemInserted(position)\`. Avoid \`notifyDataSetChanged()\` for routine changes because it discards precise update information.\r
\r
## Choose a layout manager\r
\r
| Layout manager | Arrangement | Example |\r
| --- | --- | --- |\r
| \`LinearLayoutManager\` | One vertical or horizontal row of items. | Notes, messages, settings. |\r
| \`GridLayoutManager\` | A grid with a chosen number of columns. | Photos or tiles. |\r
| \`StaggeredGridLayoutManager\` | Grid rows can have different item heights. | Cards with uneven content. |\r
\r
\`\`\`java\r
notesList.setLayoutManager(new LinearLayoutManager(this));\r
\`\`\`\r
\r
For a horizontal row, pass \`RecyclerView.HORIZONTAL\` as the orientation. A grid can be set up with \`new GridLayoutManager(this, 2)\` for two columns. Pick a layout manager based on how the items should read and scroll.\r
\r
## Common list mistakes I check\r
\r
- Give every row field a value on every bind. A recycled row may contain text from a previous item.\r
- Keep database and network work out of \`onBindViewHolder()\`. Binding runs often while scrolling.\r
- Use a stable item ID for diff identity. Do not use the current row position as the identity.\r
- Avoid keeping a position captured long before a click. Ask the holder for its current position and check \`NO_POSITION\`.\r
- Submit a new list instead of mutating the list already in \`ListAdapter\`.\r
- Show an empty state when there are no items, and update it when the data changes.\r
- Prefer item-level updates from \`ListAdapter\` or precise adapter notifications over refreshing the whole list.\r
- Test long titles and summaries so row content remains readable at larger text sizes.\r
\r
## Practice: update the study list\r
\r
Run the screen with the three sample notes. Tap one row and check that the selected note ID reaches the detail screen. Add a fourth item by submitting a new list, then change the title of an item while keeping its ID. Confirm the right row changes without replacing the full list. Finally, submit an empty list and check the empty message.\r
\r
## Notes to remember\r
\r
- \`RecyclerView\` reuses row views as items move on and off screen.\r
- The adapter creates holders, binds data, and reports the item count.\r
- The layout manager controls the list or grid arrangement.\r
- \`ListAdapter\` and \`DiffUtil\` identify changed rows when new immutable lists are submitted.\r
- A row click should return the current item, not depend on a stale position.\r
- Keep row binding quick and complete so recycled views show the correct content.\r
\r
## References\r
\r
- [Create dynamic lists with RecyclerView](https://developer.android.com/develop/ui/views/layout/recyclerview)\r
- [Customize a dynamic list](https://developer.android.com/develop/ui/views/layout/recyclerview-custom)\r
- [ListAdapter reference](https://developer.android.com/reference/androidx/recyclerview/widget/ListAdapter)\r
- [DiffUtil reference](https://developer.android.com/reference/androidx/recyclerview/widget/DiffUtil)\r
\r
`,"./chapters/09-architecture-viewmodel-livedata.md":`# 9. App architecture with ViewModel and LiveData\r
\r
[Back to notes index](../README.md)\r
\r
| [Previous: Lists with RecyclerView and adapters](08-recyclerview-and-adapters.md) | [Notes index](../README.md) | [Next: Local data with Room and preferences](10-local-data-room-and-preferences.md) |\r
|:--|:--:|--:|\r
\r
## Keep screen state outside the Activity\r
\r
An activity or fragment is recreated during configuration changes such as a screen rotation. A field stored only in that activity instance is lost when the old instance is destroyed. A \`ViewModel\` holds screen-level state for as long as its \`ViewModelStoreOwner\` remains active, so a replacement activity can reconnect to the same state after rotation.\r
\r
| Where state lives | What it normally survives |\r
| --- | --- |\r
| Activity or fragment field | Only the current instance. |\r
| \`ViewModel\` | Configuration changes while its owner remains active. |\r
| Saved state | A small amount of UI state after system recreation. |\r
| Room or another persistent store | Activity recreation, process death, and later app launches. |\r
\r
A \`ViewModel\` is kept in memory. It does not replace a database and it does not survive process death by itself. For the difference between screen state and saved app data, I keep the important values in the right layer instead of putting everything into the ViewModel.\r
\r
The AndroidX Lifecycle libraries provide \`ViewModel\`, \`LiveData\`, \`MutableLiveData\`, and \`ViewModelProvider\`. The examples below use the Java APIs and the \`StudyNote\` model and \`StudyNoteAdapter\` from the previous chapter.\r
\r
The app module needs the AndroidX Lifecycle ViewModel and LiveData artifacts, following the versions and dependency conventions already used by the project.\r
\r
## Let state flow to the screen\r
\r
The screen sends user actions to its ViewModel. The ViewModel changes its state, and the screen observes that state and renders it. This keeps display code in the activity and state changes in one screen-level object.\r
\r
\`\`\`text\r
User action -> Activity method -> ViewModel state changes\r
                                      |\r
                                      v\r
Activity observes LiveData -> renders the current state\r
\`\`\`\r
\r
\`LiveData\` is lifecycle-aware. An observer receives updates while its owner is active, and the observer is removed when that lifecycle owner is destroyed. The screen does not need to manually subscribe and unsubscribe on every pause or resume.\r
\r
## Create a ViewModel that exposes read-only state\r
\r
The ViewModel keeps the mutable field private and exposes it as \`LiveData\`. UI code can observe the value without changing it directly. This example keeps a list in memory so the ownership and update flow are easy to see. Chapter 10 connects a screen to persistent storage.\r
\r
\`\`\`java\r
import androidx.lifecycle.LiveData;\r
import androidx.lifecycle.MutableLiveData;\r
import androidx.lifecycle.ViewModel;\r
\r
import java.util.ArrayList;\r
import java.util.Collections;\r
import java.util.List;\r
\r
public class NotesViewModel extends ViewModel {\r
    private final MutableLiveData<List<StudyNote>> notes =\r
            new MutableLiveData<>(Collections.emptyList());\r
    private long nextId = 1L;\r
\r
    public LiveData<List<StudyNote>> getNotes() {\r
        return notes;\r
    }\r
\r
    public void addNote(String title) {\r
        List<StudyNote> updated = new ArrayList<>(notes.getValue());\r
        updated.add(new StudyNote(\r
                nextId++,\r
                title,\r
                "Added during this session"\r
        ));\r
        notes.setValue(Collections.unmodifiableList(updated));\r
    }\r
}\r
\`\`\`\r
\r
\`setValue()\` updates LiveData on the main thread, which is appropriate for this button example. If a result arrives on a background thread, use \`postValue()\` to publish it back to observers. For a real list of notes, a repository should supply the records and assign persistent IDs. The in-memory counter is only for this small example.\r
\r
The ViewModel has no reference to the activity, fragment, view, or \`Context\`. Those objects have shorter lifetimes. Keeping them out of the ViewModel avoids retaining a screen after Android has destroyed it.\r
\r
## Get the ViewModel and observe its state\r
\r
Create or retrieve the ViewModel through \`ViewModelProvider\`. Use the activity as the owner when the state belongs to the whole activity. Observing with the activity also means the observer is tied to that activity instance.\r
\r
The screen layout from the previous chapter needs a title field and an Add button. They can sit above the existing list and empty state:\r
\r
\`\`\`xml\r
<?xml version="1.0" encoding="utf-8"?>\r
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"\r
    android:layout_width="match_parent"\r
    android:layout_height="match_parent"\r
    android:orientation="vertical"\r
    android:padding="16dp">\r
\r
    <EditText\r
        android:id="@+id/title_input"\r
        android:layout_width="match_parent"\r
        android:layout_height="wrap_content"\r
        android:hint="@string/note_title_hint"\r
        android:inputType="textCapSentences" />\r
\r
    <Button\r
        android:id="@+id/add_note"\r
        android:layout_width="wrap_content"\r
        android:layout_height="wrap_content"\r
        android:text="@string/add_note" />\r
\r
    <FrameLayout\r
        android:layout_width="match_parent"\r
        android:layout_height="0dp"\r
        android:layout_weight="1">\r
\r
        <androidx.recyclerview.widget.RecyclerView\r
            android:id="@+id/notes_list"\r
            android:layout_width="match_parent"\r
            android:layout_height="match_parent" />\r
\r
        <TextView\r
            android:id="@+id/empty_message"\r
            android:layout_width="match_parent"\r
            android:layout_height="wrap_content"\r
            android:layout_gravity="center"\r
            android:gravity="center"\r
            android:text="@string/no_study_notes"\r
            android:visibility="gone" />\r
\r
    </FrameLayout>\r
\r
</LinearLayout>\r
\`\`\`\r
\r
The updated values in \`res/values/strings.xml\` include the empty-state label from the previous chapter and the two new form labels:\r
\r
\`\`\`xml\r
<resources>\r
    <string name="no_study_notes">No study notes yet.</string>\r
    <string name="note_title_hint">Enter a study topic</string>\r
    <string name="add_note">Add note</string>\r
</resources>\r
\`\`\`\r
\r
\`\`\`java\r
import android.os.Bundle;\r
import android.view.View;\r
import android.widget.Button;\r
import android.widget.EditText;\r
import android.widget.TextView;\r
\r
import androidx.lifecycle.ViewModelProvider;\r
import androidx.fragment.app.FragmentActivity;\r
import androidx.recyclerview.widget.LinearLayoutManager;\r
import androidx.recyclerview.widget.RecyclerView;\r
\r
public class NotesActivity extends FragmentActivity {\r
    private NotesViewModel viewModel;\r
    private StudyNoteAdapter adapter;\r
    private EditText titleInput;\r
    private TextView emptyMessage;\r
\r
    @Override\r
    protected void onCreate(Bundle savedInstanceState) {\r
        super.onCreate(savedInstanceState);\r
        setContentView(R.layout.activity_notes);\r
\r
        RecyclerView notesList = findViewById(R.id.notes_list);\r
        titleInput = findViewById(R.id.title_input);\r
        emptyMessage = findViewById(R.id.empty_message);\r
        Button addButton = findViewById(R.id.add_note);\r
\r
        adapter = new StudyNoteAdapter(note -> {\r
            // Open the selected note using its ID.\r
        });\r
        notesList.setLayoutManager(new LinearLayoutManager(this));\r
        notesList.setAdapter(adapter);\r
\r
        viewModel = new ViewModelProvider(this).get(NotesViewModel.class);\r
        viewModel.getNotes().observe(this, notes -> {\r
            adapter.submitList(notes);\r
            emptyMessage.setVisibility(notes.isEmpty() ? View.VISIBLE : View.GONE);\r
        });\r
\r
        addButton.setOnClickListener(view -> {\r
            String title = titleInput.getText().toString().trim();\r
            if (!title.isEmpty()) {\r
                viewModel.addNote(title);\r
                titleInput.setText("");\r
            }\r
        });\r
    }\r
}\r
\`\`\`\r
\r
The screen sets its adapter before observing. When LiveData emits the current list or a changed list, the observer submits it to the \`ListAdapter\` and updates the empty state. Pressing Add changes the ViewModel, not the adapter directly. That keeps one place responsible for the current list.\r
\r
When Android recreates the activity after rotation, \`ViewModelProvider\` returns the same ViewModel instance for that activity's store. The new activity registers a new lifecycle-aware observer and receives the current value. When the activity is permanently finished, its ViewModel is cleared.\r
\r
## Observe from a Fragment's view lifecycle\r
\r
A fragment can stay on the back stack after its view has been destroyed. When observing state that updates fragment views, use \`getViewLifecycleOwner()\` rather than the fragment itself:\r
\r
\`\`\`java\r
viewModel.getNotes().observe(getViewLifecycleOwner(), notes -> {\r
    adapter.submitList(notes);\r
    emptyMessage.setVisibility(notes.isEmpty() ? View.VISIBLE : View.GONE);\r
});\r
\`\`\`\r
\r
Place this observer in \`onViewCreated()\`, after the fragment's views and adapter exist. The observer is removed with the fragment view, so it cannot try to update an old view after the fragment returns from the back stack.\r
\r
## Keep work in the appropriate layer\r
\r
The activity handles UI behavior: reading a field, reacting to a tap, showing a message, and navigating. The ViewModel owns screen state and decides how a user action changes that state. A repository coordinates data sources such as Room, a web service, or preferences. This separation makes each piece easier to understand and check.\r
\r
\`\`\`text\r
Activity or Fragment <-> ViewModel <-> Repository <-> Room or network\r
       UI events          screen state          app data\r
\`\`\`\r
\r
When a ViewModel needs a repository, give it that dependency through a \`ViewModelProvider.Factory\` or the project's dependency injection setup. The default provider in the example can create a ViewModel with a no-argument constructor. A constructor that requires a repository needs a factory that knows how to provide it.\r
\r
Keep resource lookups and view updates in the UI. A ViewModel should not call \`getString()\` using an activity context or hold a \`TextView\`. It can expose a state value or a message identifier, and the activity can decide how to display it.\r
\r
## Common state mistakes I check\r
\r
- A ViewModel survives configuration changes, but it is not permanent storage.\r
- A value set with \`setValue()\` must be changed on the main thread. Use \`postValue()\` from a background thread.\r
- Expose \`LiveData\` to the screen and keep \`MutableLiveData\` private to the ViewModel.\r
- Do not keep an activity, fragment, view, or UI \`Context\` in a ViewModel.\r
- A fragment that observes view data should use \`getViewLifecycleOwner()\`.\r
- Let the ViewModel own the state change, then let the observer render the new state.\r
- Use Room or another persistent data source when values must remain after process death or an app restart.\r
- Use a factory or dependency injection when a ViewModel needs constructor dependencies.\r
\r
## Practice: rotate the notes screen\r
\r
Run the list example from the previous chapter. Move the list and Add button logic into \`NotesViewModel\`, observe its \`LiveData\`, and add two notes. Rotate the device and confirm that the items remain without being added a second time. Then close and reopen the app. The in-memory list should be gone, which makes the difference between ViewModel state and persistent storage visible.\r
\r
## Notes to remember\r
\r
- The ViewModel owns screen state across configuration changes.\r
- LiveData notifies active lifecycle owners and removes observers when they are destroyed.\r
- The activity sends actions to the ViewModel and renders observed state.\r
- A Fragment should observe view state with its view lifecycle owner.\r
- Room or another persistent store is needed for data that must survive process death.\r
\r
## References\r
\r
- [ViewModel overview for Views](https://developer.android.com/topic/libraries/architecture/views/viewmodel)\r
- [LiveData overview](https://developer.android.com/topic/libraries/architecture/livedata)\r
- [Save UI states for Views](https://developer.android.com/topic/libraries/architecture/views/saving-states-views)\r
- [UI layer](https://developer.android.com/topic/architecture/ui-layer)\r
- [Android architecture recommendations for Views](https://developer.android.com/topic/architecture/views/recommendations-views)\r
\r
`,"./chapters/10-local-data-room-and-preferences.md":`# 10. Local data with Room and preferences\r
\r
[Back to notes index](../README.md)\r
\r
| [Previous: App architecture with ViewModel and LiveData](09-architecture-viewmodel-livedata.md) | [Notes index](../README.md) | [Next: Networking, REST APIs, and JSON](11-networking-and-rest-apis.md) |\r
|:--|:--:|--:|\r
\r
## Choose storage for the shape of the data\r
\r
Android offers different storage options for different kinds of information. Preferences are for a small set of values such as a theme choice. A database is a better fit for a collection of records that the app must search, sort, or update.\r
\r
| Storage | Use it for | Example |\r
| --- | --- | --- |\r
| Room | Structured records and queries across tables. | Study notes with titles, text, and dates. |\r
| Key-value preferences | A few independent settings. | Sort order or whether a hint was dismissed. |\r
| App-specific files | Documents or larger data that has its own file format. | An exported notes file. |\r
\r
Avoid placing a growing list of records in preferences. A key-value file does not provide table queries, relationships, or useful partial updates.\r
\r
## Room has entities, DAOs, and a database\r
\r
Room is a persistence layer built on SQLite. Its core parts have separate jobs:\r
\r
- An **entity** describes a database table and its columns.\r
- A **DAO** describes the reads and writes the app needs.\r
- A **database** declares the entities and provides access to their DAOs.\r
\r
Room checks SQL queries when the project compiles and generates the database implementation. The rest of the app calls a DAO rather than constructing SQL strings throughout the UI.\r
\r
### Keep the Java version in mind\r
\r
Room 3.0 requires Kotlin Symbol Processing and does not generate code for Java source files. These notes use Java, so the examples below use the current Room 2.x line with Java annotation processing. The dependency coordinates and package for Room 2 use \`androidx.room\`.\r
\r
In a Groovy \`app/build.gradle\`, add Room 2 dependencies using the same version in each line. The current Room 2 release shown in the Android migration notes is \`2.8.4\`:\r
\r
\`\`\`groovy\r
dependencies {\r
    def roomVersion = "2.8.4"\r
\r
    implementation "androidx.room:room-runtime:$roomVersion"\r
    annotationProcessor "androidx.room:room-compiler:$roomVersion"\r
    implementation "androidx.room:room-livedata:$roomVersion"\r
}\r
\`\`\`\r
\r
If the project uses a version catalog, put these same artifacts and one shared version in that catalog instead. The \`room-livedata\` artifact is needed for the observable DAO return type used in this example.\r
\r
## Define a study note entity\r
\r
Each \`StudyNoteEntity\` instance maps to one row in the \`study_notes\` table. The primary key is generated by SQLite when a row is inserted.\r
\r
\`\`\`java\r
import androidx.annotation.NonNull;\r
import androidx.room.Entity;\r
import androidx.room.PrimaryKey;\r
\r
@Entity(tableName = "study_notes")\r
public class StudyNoteEntity {\r
    @PrimaryKey(autoGenerate = true)\r
    public long id;\r
\r
    @NonNull\r
    public String title;\r
\r
    public String body;\r
\r
    public long createdAt;\r
}\r
\`\`\`\r
\r
Room uses the public fields as columns. A production entity can use private fields with getters and setters. Keep the persisted model focused on data. Screen-only labels or view references do not belong in a database row.\r
\r
## Put database operations in a DAO\r
\r
The DAO is an interface that Room implements. The SQL query uses a named table and sorts newer notes first. \`LiveData\` makes the query observable, so active screens get a new list when the table changes.\r
\r
\`\`\`java\r
import androidx.lifecycle.LiveData;\r
import androidx.room.Dao;\r
import androidx.room.Insert;\r
import androidx.room.Query;\r
\r
import java.util.List;\r
\r
@Dao\r
public interface StudyNoteDao {\r
    @Query("SELECT * FROM study_notes ORDER BY createdAt DESC")\r
    LiveData<List<StudyNoteEntity>> observeAll();\r
\r
    @Insert\r
    void insert(StudyNoteEntity note);\r
\r
    @Query("DELETE FROM study_notes WHERE id = :noteId")\r
    void deleteById(long noteId);\r
}\r
\`\`\`\r
\r
The \`:noteId\` parameter is bound by Room. It is not pasted into the SQL string, which avoids building a query from user-provided text. Room reports unknown tables, columns, or invalid queries during compilation.\r
\r
Room does not allow ordinary database queries to block the main thread. The observable \`LiveData\` query runs asynchronously through Room's integration. One-time writes such as \`insert()\` and \`deleteById()\` still need to be called on a background executor in this Java example.\r
\r
## Create the database once\r
\r
The database class names the entity and schema version, and exposes the DAO. Its implementation is generated by Room.\r
\r
\`\`\`java\r
import androidx.room.Database;\r
import androidx.room.RoomDatabase;\r
\r
@Database(entities = {StudyNoteEntity.class}, version = 1, exportSchema = true)\r
public abstract class StudyDatabase extends RoomDatabase {\r
    public abstract StudyNoteDao studyNoteDao();\r
}\r
\`\`\`\r
\r
Create one database instance for a single-process app. A \`RoomDatabase\` is expensive to create, so do not build a new one for each screen or query:\r
\r
\`\`\`java\r
import android.content.Context;\r
\r
import androidx.room.Room;\r
\r
public final class StudyDatabaseProvider {\r
    private static volatile StudyDatabase instance;\r
\r
    private StudyDatabaseProvider() {\r
    }\r
\r
    public static StudyDatabase get(Context context) {\r
        if (instance == null) {\r
            synchronized (StudyDatabaseProvider.class) {\r
                if (instance == null) {\r
                    instance = Room.databaseBuilder(\r
                            context.getApplicationContext(),\r
                            StudyDatabase.class,\r
                            "study-notes.db"\r
                    ).build();\r
                }\r
            }\r
        }\r
        return instance;\r
    }\r
}\r
\`\`\`\r
\r
Passing the application context avoids keeping an activity alive through the singleton. Apps that use multiple processes need a deliberate multi-instance strategy; this example assumes one process.\r
\r
## Keep the DAO behind a repository\r
\r
The repository gives the rest of the app one place to request notes or save a note. It forwards the observable list and dispatches writes to an executor.\r
\r
\`\`\`java\r
import android.content.Context;\r
\r
import androidx.lifecycle.LiveData;\r
\r
import java.util.List;\r
import java.util.concurrent.ExecutorService;\r
import java.util.concurrent.Executors;\r
\r
public class StudyNoteRepository {\r
    private final StudyNoteDao noteDao;\r
    private static final ExecutorService DATABASE_EXECUTOR =\r
            Executors.newSingleThreadExecutor();\r
\r
    public StudyNoteRepository(Context context) {\r
        noteDao = StudyDatabaseProvider.get(context).studyNoteDao();\r
    }\r
\r
    public LiveData<List<StudyNoteEntity>> observeNotes() {\r
        return noteDao.observeAll();\r
    }\r
\r
    public void save(StudyNoteEntity note) {\r
        DATABASE_EXECUTOR.execute(() -> noteDao.insert(note));\r
    }\r
\r
    public void delete(long noteId) {\r
        DATABASE_EXECUTOR.execute(() -> noteDao.deleteById(noteId));\r
    }\r
}\r
\`\`\`\r
\r
For a longer-lived app, the repository and executor should have app-level ownership rather than being created repeatedly for each activity. A dependency injection setup or an application-scoped provider can supply them. The ViewModel can receive this repository through the factory described in the architecture notes.\r
\r
The screen observes the database results through its ViewModel:\r
\r
\`\`\`java\r
viewModel.getNotes().observe(this, notes -> {\r
    adapter.submitList(notes);\r
    emptyMessage.setVisibility(notes.isEmpty() ? View.VISIBLE : View.GONE);\r
});\r
\`\`\`\r
\r
On a Save tap, the UI creates an entity from validated field values and calls a ViewModel method. The ViewModel delegates the write to the repository. Room emits the changed query result, and the active observer renders the updated list. This avoids directly changing the RecyclerView adapter before the write succeeds.\r
\r
## Update schemas with migrations\r
\r
The \`version\` in \`@Database\` describes the schema. When the table structure changes, increment the version and provide a migration that transforms existing data. For example, if version 2 adds a \`pinned\` integer column, a migration from version 1 can add it with a default value:\r
\r
\`\`\`java\r
import androidx.room.migration.Migration;\r
import androidx.sqlite.db.SupportSQLiteDatabase;\r
\r
static final Migration MIGRATION_1_2 = new Migration(1, 2) {\r
    @Override\r
    public void migrate(SupportSQLiteDatabase database) {\r
        database.execSQL(\r
                "ALTER TABLE study_notes "\r
                        + "ADD COLUMN pinned INTEGER NOT NULL DEFAULT 0"\r
        );\r
    }\r
};\r
\`\`\`\r
\r
Register the migration on the builder before \`build()\`:\r
\r
\`\`\`java\r
Room.databaseBuilder(context, StudyDatabase.class, "study-notes.db")\r
        .addMigrations(MIGRATION_1_2)\r
        .build();\r
\`\`\`\r
\r
The entity must also include the \`pinned\` field when the database version becomes 2. Migrations should be tested against an existing database. Destructive migration options delete old rows when the schema changes, so they can erase a person's saved notes.\r
\r
## Save a small setting with SharedPreferences\r
\r
For a small number of primitive settings, \`SharedPreferences\` reads and writes key-value pairs. This example remembers a compact-list preference:\r
\r
\`\`\`java\r
import android.content.Context;\r
import android.content.SharedPreferences;\r
\r
public final class StudySettings {\r
    private static final String FILE_NAME = "com.example.studyapp.SETTINGS";\r
    private static final String KEY_COMPACT_LIST = "compact_list";\r
\r
    private StudySettings() {\r
    }\r
\r
    public static boolean isCompactList(Context context) {\r
        SharedPreferences preferences = context.getSharedPreferences(\r
                FILE_NAME,\r
                Context.MODE_PRIVATE\r
        );\r
        return preferences.getBoolean(KEY_COMPACT_LIST, false);\r
    }\r
\r
    public static void setCompactList(Context context, boolean enabled) {\r
        SharedPreferences preferences = context.getSharedPreferences(\r
                FILE_NAME,\r
                Context.MODE_PRIVATE\r
        );\r
        preferences.edit()\r
                .putBoolean(KEY_COMPACT_LIST, enabled)\r
                .apply();\r
    }\r
}\r
\`\`\`\r
\r
\`apply()\` updates the in-memory preferences immediately and writes the change to disk asynchronously. \`commit()\` writes synchronously and returns whether it succeeded, so do not use it on the main thread where it can pause drawing. Preferences are private to the app when opened with \`Context.MODE_PRIVATE\`.\r
\r
Android now recommends DataStore over \`SharedPreferences\` for new preference storage because it offers asynchronous, consistent updates. The standard DataStore APIs use Kotlin coroutines and Flow. Java apps can use its RxJava integrations, which add dependencies. In a Java study app that does not already use RxJava, \`SharedPreferences\` is a simple option for a few non-sensitive settings, while DataStore is the newer option to evaluate when those dependencies fit the app. Neither storage choice should hold passwords or other secrets as plain text.\r
\r
## Notes to remember\r
\r
- Use Room for structured records and queries. Use preferences for a small set of settings.\r
- An entity maps to a table, a DAO describes operations, and a database provides the DAO.\r
- Room verifies SQL at compile time and does not allow database access on the UI thread.\r
- Keep one Room database instance per app process and send one-time writes to an executor.\r
- Expose observable query results through \`LiveData\` and let the screen observe them through its ViewModel.\r
- Increment the schema version and test migrations when the database structure changes.\r
- \`SharedPreferences.apply()\` writes asynchronously. \`commit()\` blocks until its disk write completes.\r
- Room 3.0 uses Kotlin Symbol Processing and does not generate Java code. The examples here use Room 2.x for Java.\r
\r
## Practice: keep study notes after restart\r
\r
Replace the in-memory note list from the previous chapter with \`StudyNoteEntity\`, \`StudyNoteDao\`, and the Room database. Save a note on a background executor and observe the database query through the screen's ViewModel. Close and reopen the app to confirm that the records remain. Then add the compact-list setting with \`SharedPreferences\`, force-stop the app, and confirm that the setting remains too.\r
\r
## References\r
\r
- [Save data in a local database using Room](https://developer.android.com/training/data-storage/room)\r
- [Define data using Room entities](https://developer.android.com/training/data-storage/room/defining-data)\r
- [Access data using Room DAOs](https://developer.android.com/training/data-storage/room/accessing-data)\r
- [Write asynchronous DAO queries](https://developer.android.com/training/data-storage/room/async-queries)\r
- [Migrate from Room 2.x to Room 3.0](https://developer.android.com/training/data-storage/room/migration-2-to-3)\r
- [Save simple data with SharedPreferences](https://developer.android.com/training/data-storage/shared-preferences)\r
- [DataStore](https://developer.android.com/topic/libraries/architecture/datastore)\r
\r
`,"./chapters/11-networking-and-rest-apis.md":`# 11. Networking, REST APIs, and JSON\r
\r
[Back to notes index](../README.md)\r
\r
| [Previous: Local data with Room and preferences](10-local-data-room-and-preferences.md) | [Notes index](../README.md) | [Next: Background work and notifications](12-background-work-and-notifications.md) |\r
|:--|:--:|--:|\r
\r
## An HTTP request and response\r
\r
A REST API exposes resources through URLs. An app sends an HTTP request, and the server replies with a status code, headers, and usually a body. The request method describes the kind of operation:\r
\r
| Method | Common meaning |\r
| --- | --- |\r
| \`GET\` | Read a resource. |\r
| \`POST\` | Create a resource or submit an operation. |\r
| \`PUT\` | Replace a resource. |\r
| \`PATCH\` | Change selected fields. |\r
| \`DELETE\` | Remove a resource. |\r
\r
The exact behavior still depends on the API's contract. Check the API documentation for required paths, headers, request fields, authentication, and response formats.\r
\r
HTTP status codes help classify the result. A \`2xx\` status means the request succeeded. \`200\` commonly carries a response body, \`201\` means a resource was created, and \`204\` means success with no response body. \`4xx\` usually means the request or its permissions need attention. \`5xx\` means the server failed while handling it. Check the code before treating a response body as success data.\r
\r
## Allow network access in the manifest\r
\r
Declare the \`INTERNET\` permission in \`AndroidManifest.xml\`, outside the \`<application>\` element:\r
\r
\`\`\`xml\r
<uses-permission xmlns:android="http://schemas.android.com/apk/res/android"\r
    android:name="android.permission.INTERNET" />\r
\`\`\`\r
\r
\`INTERNET\` is a normal permission granted at install time, so it does not need a runtime permission dialog. Add \`ACCESS_NETWORK_STATE\` only if the app needs to inspect connectivity. A connectivity check is only a hint because the network can change immediately after the check.\r
\r
Use HTTPS for API traffic so the connection is encrypted. Do not send passwords, access tokens, or personal details over cleartext HTTP. Do not place private API credentials directly in app source code; values bundled in an installed app can be extracted.\r
\r
## Read a JSON response with HttpURLConnection\r
\r
\`HttpURLConnection\` is part of Java and can make an HTTP request without an extra network library. The endpoint below is a placeholder. Replace it with an HTTPS endpoint and response contract that you control or are allowed to call.\r
\r
\`\`\`java\r
import java.io.BufferedReader;\r
import java.io.IOException;\r
import java.io.InputStream;\r
import java.io.InputStreamReader;\r
import java.net.HttpURLConnection;\r
import java.net.URL;\r
import java.nio.charset.StandardCharsets;\r
\r
public class PostApi {\r
    public String getPost(int postId) throws IOException {\r
        HttpURLConnection connection = null;\r
\r
        try {\r
            URL url = new URL("https://api.example.com/posts/" + postId);\r
            connection = (HttpURLConnection) url.openConnection();\r
            connection.setRequestMethod("GET");\r
            connection.setConnectTimeout(10_000);\r
            connection.setReadTimeout(10_000);\r
            connection.setRequestProperty("Accept", "application/json");\r
\r
            int statusCode = connection.getResponseCode();\r
            InputStream responseStream = statusCode >= 200 && statusCode < 300\r
                    ? connection.getInputStream()\r
                    : connection.getErrorStream();\r
\r
            StringBuilder responseBody = new StringBuilder();\r
            if (responseStream != null) {\r
                try (BufferedReader reader = new BufferedReader(\r
                        new InputStreamReader(responseStream, StandardCharsets.UTF_8)\r
                )) {\r
                    String line;\r
                    while ((line = reader.readLine()) != null) {\r
                        responseBody.append(line);\r
                    }\r
                }\r
            }\r
\r
            if (statusCode < 200 || statusCode >= 300) {\r
                throw new IOException("The request failed with HTTP " + statusCode);\r
            }\r
\r
            return responseBody.toString();\r
        } finally {\r
            if (connection != null) {\r
                connection.disconnect();\r
            }\r
        }\r
    }\r
}\r
\`\`\`\r
\r
The connect timeout limits how long the app waits to establish a connection. The read timeout limits how long it waits for data. The response stream is closed with try-with-resources, and \`disconnect()\` releases the connection. Error responses use \`getErrorStream()\`, so the code can read an error body instead of assuming every response is successful. This sample reports the status code in its exception. A real API layer can parse a documented error body for useful diagnostics. A missing body remains an empty string, allowing the status code to be handled first.\r
\r
For a \`204\` response, an API may have no body. Code that accepts such a response should branch on the status and avoid trying to parse an empty body as JSON.\r
\r
## Keep the request off the main thread\r
\r
Networking can wait on DNS, a server, or a weak connection. Running it on Android's main thread can freeze the screen and throw \`NetworkOnMainThreadException\`. Use a background executor for the request and post a display update to the main thread:\r
\r
\`\`\`java\r
import android.os.Handler;\r
import android.os.Looper;\r
\r
import org.json.JSONException;\r
import org.json.JSONObject;\r
\r
import java.io.IOException;\r
import java.util.concurrent.ExecutorService;\r
import java.util.concurrent.Executors;\r
\r
private final ExecutorService networkExecutor = Executors.newSingleThreadExecutor();\r
private final Handler mainHandler = new Handler(Looper.getMainLooper());\r
private final PostApi postApi = new PostApi();\r
\r
private void loadPost() {\r
    statusView.setText("Loading...");\r
\r
    networkExecutor.execute(() -> {\r
        try {\r
            String json = postApi.getPost(1);\r
            JSONObject post = new JSONObject(json);\r
            String title = post.optString("title", "Untitled post");\r
            mainHandler.post(() -> statusView.setText(title));\r
        } catch (IOException | JSONException exception) {\r
            mainHandler.post(() -> statusView.setText("Could not load the post."));\r
        }\r
    });\r
}\r
\`\`\`\r
\r
This small example assumes the screen stays open until the response arrives. In a screen that can be left while a request is running, put the request in a repository and expose the result through the ViewModel. Then the activity or fragment observes state with its lifecycle owner instead of a background callback keeping a view reference.\r
\r
Show a loading state while a request is running, a useful error state when it fails, and data only after a successful response. Do not show raw exception text to users. Keep enough detail in developer logs to diagnose an issue, but avoid logging passwords, tokens, or private response data.\r
\r
## Understand the JSON shape\r
\r
JSON has objects, arrays, strings, numbers, booleans, and \`null\`. An object uses named fields:\r
\r
\`\`\`json\r
{\r
  "id": 1,\r
  "title": "Activity lifecycle",\r
  "body": "Callbacks and saved state"\r
}\r
\`\`\`\r
\r
The \`JSONObject\` in the background example reads the \`title\` field. \`optString()\` returns a fallback when the field is missing. \`getString()\` is useful when the field is required, but it throws \`JSONException\` if the value is absent or has the wrong type. Validate required fields before using them.\r
\r
An array is an ordered list of values. Read each element with \`JSONArray\`:\r
\r
\`\`\`java\r
JSONArray posts = responseObject.getJSONArray("items");\r
List<String> titles = new ArrayList<>();\r
\r
for (int index = 0; index < posts.length(); index++) {\r
    JSONObject post = posts.getJSONObject(index);\r
    titles.add(post.optString("title", "Untitled post"));\r
}\r
\`\`\`\r
\r
Add imports for \`org.json.JSONArray\`, \`org.json.JSONObject\`, \`java.util.ArrayList\`, and \`java.util.List\` where this example is used. Android includes \`org.json\`, so this basic parser does not need another dependency. For a large API with many models, a typed client and serializer can reduce manual parsing, but they add libraries and setup.\r
\r
## Send JSON in a request\r
\r
A \`POST\` request usually sends a JSON body and declares its media type. \`Accept\` describes what the client can read. \`Content-Type\` describes what the request body contains.\r
\r
\`\`\`json\r
{\r
  "title": "Networking notes",\r
  "body": "Requests run outside the UI thread."\r
}\r
\`\`\`\r
\r
For an authenticated API, send the authorization header only over HTTPS and follow the service's token rules. Avoid placing tokens in URL query parameters because URLs can appear in logs. Use the HTTP method and idempotency rules documented by the service.\r
\r
## Decide whether a networking library helps\r
\r
\`HttpURLConnection\` is useful for understanding the request, response, status code, and stream handling. It also works for a small one-off request. A larger app can use an HTTP client such as OkHttp, or Retrofit when it needs typed API interfaces. These libraries add dependencies, so choose them when connection setup, cancellation, converters, or shared request behavior would otherwise be repeated.\r
\r
Regardless of the client, the screen should not own raw socket work. Keep the API call in a data layer, return a clear result or state, and let the ViewModel expose it to the UI. A local Room cache can keep previously loaded content available when the network is unavailable.\r
\r
## Network checks I keep\r
\r
- Use the \`INTERNET\` manifest permission and HTTPS endpoints.\r
- Set connect and read timeouts so requests do not wait forever.\r
- Run all network and response parsing work away from the main thread.\r
- Check the HTTP status code before parsing a success response.\r
- Handle empty bodies, missing JSON fields, malformed JSON, timeouts, and server failures.\r
- Close streams and disconnect \`HttpURLConnection\` in a \`finally\` block.\r
- Keep authentication tokens and personal data out of source URLs and logs.\r
- Show loading, success, and error states, and do not update a destroyed screen.\r
- Treat a connectivity check as temporary information, not proof that a request will succeed.\r
\r
## Practice: display a remote title\r
\r
Use an HTTPS test endpoint that returns one JSON object with \`id\` and \`title\`. Add the manifest permission, request one record on a background executor, and show its title only after receiving a successful HTTP status. Try a missing host, an invalid record ID, malformed JSON, and a response with no body. Confirm that each case leaves the screen responsive and produces a useful state.\r
\r
## Notes to remember\r
\r
- REST APIs use HTTP methods to describe operations on resources.\r
- The status code is part of the response and must be checked.\r
- JSON must match the API's shape; missing or mistyped fields need handling.\r
- Android network calls belong off the main thread.\r
- Use HTTPS, timeouts, clear error states, and safe handling of credentials.\r
- A repository and ViewModel keep network work separate from the screen.\r
\r
## References\r
\r
- [Connect to the network](https://developer.android.com/develop/connectivity/network-ops/connecting)\r
- [Networking overview](https://developer.android.com/develop/connectivity/network-ops)\r
- [HttpURLConnection reference](https://developer.android.com/reference/java/net/HttpURLConnection)\r
- [JSONObject reference](https://developer.android.com/reference/org/json/JSONObject)\r
\r
\r
`,"./chapters/12-background-work-and-notifications.md":`# 12. Background work and notifications\r
\r
[Back to notes index](../README.md)\r
\r
| [Previous: Networking, REST APIs, and JSON](11-networking-and-rest-apis.md) | [Notes index](../README.md) | [Next: Permissions, privacy, and device features](13-permissions-and-device-features.md) |\r
|:--|:--:|--:|\r
\r
## Pick the API based on how the work should behave\r
\r
Background work is work that should continue when the user is not looking at the screen. The right API depends on whether the work must be saved for later, must be visible while running, or must start at a precise time.\r
\r
| Need | Android API to consider | Timing behavior |\r
| --- | --- | --- |\r
| Deferrable work that should finish reliably, such as uploading saved notes. | WorkManager | Runs when constraints and system scheduling allow. |\r
| Ongoing work the user can notice and control, such as music playback or an active route. | Foreground service | Runs with a persistent notification and service-type rules. |\r
| An action tied to an exact clock time, such as a user-set alarm. | \`AlarmManager\` | Exact alarms have additional restrictions and should be reserved for time-critical features. |\r
\r
Use WorkManager for ordinary scheduled sync, retries, and work that should survive process restarts. It does not promise an exact start time. A foreground service is not a general-purpose way to keep every job alive; the work must be noticeable to the user and meet current service rules.\r
\r
## Define work with WorkManager\r
\r
WorkManager uses three main objects:\r
\r
- A \`Worker\` contains the operation.\r
- A \`WorkRequest\` describes when and under what constraints it can run.\r
- \`WorkManager\` schedules the request.\r
\r
Add the AndroidX WorkManager runtime using the project's dependency conventions. The Java examples use \`androidx.work:work-runtime\`.\r
\r
The notification examples use AndroidX Core's \`androidx.core:core\` artifact for \`NotificationCompat\` and \`NotificationManagerCompat\`.\r
\r
This worker represents uploading locally saved notes. \`doWork()\` already runs on a WorkManager background thread. It should return only after its work is done:\r
\r
\`\`\`java\r
import android.content.Context;\r
\r
import androidx.annotation.NonNull;\r
import androidx.work.Worker;\r
import androidx.work.WorkerParameters;\r
\r
import java.io.IOException;\r
\r
public class UploadNotesWorker extends Worker {\r
    public UploadNotesWorker(\r
            @NonNull Context context,\r
            @NonNull WorkerParameters workerParameters\r
    ) {\r
        super(context, workerParameters);\r
    }\r
\r
    @NonNull\r
    @Override\r
    public Result doWork() {\r
        try {\r
            // Read pending notes from local storage and upload them.\r
            uploadPendingNotes();\r
            return Result.success();\r
        } catch (IOException exception) {\r
            return Result.retry();\r
        }\r
    }\r
\r
    private void uploadPendingNotes() throws IOException {\r
        // Call the repository or API client from the data layer.\r
    }\r
}\r
\`\`\`\r
\r
\`Result.success()\` marks the work complete. \`Result.retry()\` asks WorkManager to try again using its backoff policy. \`Result.failure()\` marks a permanent failure. Do not start a new thread inside \`doWork()\` and return immediately, because the worker would finish before that thread's work has completed.\r
\r
Add a network constraint and enqueue unique work to avoid scheduling duplicate uploads:\r
\r
\`\`\`java\r
import android.content.Context;\r
\r
import androidx.work.Constraints;\r
import androidx.work.ExistingWorkPolicy;\r
import androidx.work.NetworkType;\r
import androidx.work.OneTimeWorkRequest;\r
import androidx.work.WorkManager;\r
\r
Constraints constraints = new Constraints.Builder()\r
        .setRequiredNetworkType(NetworkType.CONNECTED)\r
        .build();\r
\r
OneTimeWorkRequest uploadRequest =\r
        new OneTimeWorkRequest.Builder(UploadNotesWorker.class)\r
                .setConstraints(constraints)\r
                .build();\r
\r
WorkManager.getInstance(context).enqueueUniqueWork(\r
        "upload-study-notes",\r
        ExistingWorkPolicy.KEEP,\r
        uploadRequest\r
);\r
\`\`\`\r
\r
With \`KEEP\`, an unfinished request with the same name remains in the queue and a duplicate is ignored. Choose another \`ExistingWorkPolicy\` only when replacing or chaining the current work matches the feature.\r
\r
Periodic work is useful for recurring sync, not for a clock deadline. WorkManager's minimum repeat interval is 15 minutes, and actual run times depend on constraints and system scheduling:\r
\r
\`\`\`java\r
import androidx.work.ExistingPeriodicWorkPolicy;\r
import androidx.work.PeriodicWorkRequest;\r
import androidx.work.WorkManager;\r
\r
import java.util.concurrent.TimeUnit;\r
\r
PeriodicWorkRequest syncRequest = new PeriodicWorkRequest.Builder(\r
        UploadNotesWorker.class,\r
        6,\r
        TimeUnit.HOURS\r
).build();\r
\r
WorkManager.getInstance(context).enqueueUniquePeriodicWork(\r
        "periodic-study-note-sync",\r
        ExistingPeriodicWorkPolicy.KEEP,\r
        syncRequest\r
);\r
\`\`\`\r
\r
Input \`Data\` passed to a worker is intended for small values such as an ID or a mode. Keep large content in Room or files and pass a key that identifies it. Workers can be stopped if their constraints become unmet, so they should handle interruption and be safe to retry.\r
\r
## Know when foreground work is appropriate\r
\r
A foreground service is for work that is actively noticeable to the user, such as recording an exercise session, navigation, or media playback. It must display an ongoing notification. Starting one from the background is restricted, and current Android versions require a declared service type with matching permissions for the work it performs.\r
\r
On Android 14 and higher, foreground services must declare an appropriate type, such as \`location\`, \`mediaPlayback\`, or \`dataSync\`, and the corresponding permission rules apply. Android 15 adds further limits to some service types. Check the current requirements for the exact type before adding a service. Prefer WorkManager or a purpose-built API when the work is deferrable or a dedicated system API fits better.\r
\r
## Create a notification channel\r
\r
Android 8.0 (API 26) and higher require notifications to use a channel. A channel has a stable ID, a user-visible name, and an importance level. Users can change its behavior in system settings, and the app cannot later change the channel's importance after it has been created.\r
\r
\`\`\`java\r
import android.app.NotificationChannel;\r
import android.app.NotificationManager;\r
import android.content.Context;\r
import android.os.Build;\r
\r
public final class StudyNotifications {\r
    public static final String CHANNEL_ID = "study_reminders";\r
\r
    private StudyNotifications() {\r
    }\r
\r
    public static void createChannel(Context context) {\r
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {\r
            return;\r
        }\r
\r
        CharSequence name = "Study reminders";\r
        String description = "Reminders about saved study sessions";\r
        NotificationChannel channel = new NotificationChannel(\r
                CHANNEL_ID,\r
                name,\r
                NotificationManager.IMPORTANCE_DEFAULT\r
        );\r
        channel.setDescription(description);\r
\r
        NotificationManager manager = (NotificationManager)\r
                context.getSystemService(Context.NOTIFICATION_SERVICE);\r
        manager.createNotificationChannel(channel);\r
    }\r
}\r
\`\`\`\r
\r
Create the channel before posting a notification. Calling \`createChannel()\` more than once is safe because an existing channel is not recreated with different behavior. In a finished app, keep the channel name and description in string resources.\r
\r
## Request notification permission when needed\r
\r
Android 13 (API 33) and higher require the \`POST_NOTIFICATIONS\` runtime permission for ordinary notifications. Add it to the manifest and ask at a moment that makes sense for the feature, such as when the user turns on reminders. Do not prompt immediately on every app launch.\r
\r
\`\`\`xml\r
<uses-permission xmlns:android="http://schemas.android.com/apk/res/android"\r
    android:name="android.permission.POST_NOTIFICATIONS" />\r
\`\`\`\r
\r
Use the Activity Result API from the activity to request the permission:\r
\r
\`\`\`java\r
import android.Manifest;\r
import android.content.pm.PackageManager;\r
import android.os.Build;\r
\r
import androidx.activity.result.ActivityResultLauncher;\r
import androidx.activity.result.contract.ActivityResultContracts;\r
import androidx.core.content.ContextCompat;\r
\r
private final ActivityResultLauncher<String> notificationPermission =\r
        registerForActivityResult(\r
                new ActivityResultContracts.RequestPermission(),\r
                granted -> {\r
                    if (granted) {\r
                        StudyNotifications.showStudyReminder(this);\r
                    } else {\r
                        // Keep the feature usable without notifications.\r
                    }\r
                }\r
        );\r
\r
private void enableStudyReminders() {\r
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU) {\r
        StudyNotifications.showStudyReminder(this);\r
        return;\r
    }\r
\r
    if (ContextCompat.checkSelfPermission(\r
            this,\r
            Manifest.permission.POST_NOTIFICATIONS\r
    ) == PackageManager.PERMISSION_GRANTED) {\r
        StudyNotifications.showStudyReminder(this);\r
    } else {\r
        notificationPermission.launch(Manifest.permission.POST_NOTIFICATIONS);\r
    }\r
}\r
\`\`\`\r
\r
Register the launcher each time the activity is created, as with other Activity Result launchers. If permission is denied, respect the choice and keep other app features available. Foreground services still need their required notification even though they have a separate exemption from requesting \`POST_NOTIFICATIONS\` to start.\r
\r
## Build and post a notification\r
\r
AndroidX \`NotificationCompat\` builds notifications that work across Android versions. Add the method below to the \`StudyNotifications\` helper from the channel example.\r
\r
Add the following imports to \`StudyNotifications.java\`, then add this method inside the \`StudyNotifications\` class from the channel example:\r
\r
\`\`\`java\r
import android.app.PendingIntent;\r
import android.content.Intent;\r
\r
import androidx.core.app.NotificationCompat;\r
import androidx.core.app.NotificationManagerCompat;\r
\`\`\`\r
\r
\`\`\`java\r
public static void showStudyReminder(Context context) {\r
    Intent openApp = new Intent(context, MainActivity.class);\r
    PendingIntent contentIntent = PendingIntent.getActivity(\r
            context,\r
            0,\r
            openApp,\r
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE\r
    );\r
\r
    NotificationCompat.Builder notification =\r
            new NotificationCompat.Builder(context, CHANNEL_ID)\r
                    .setSmallIcon(android.R.drawable.ic_dialog_info)\r
                    .setContentTitle("Study reminder")\r
                    .setContentText("Review the notes you saved today.")\r
                    .setPriority(NotificationCompat.PRIORITY_DEFAULT)\r
                    .setContentIntent(contentIntent)\r
                    .setAutoCancel(true);\r
\r
    NotificationManagerCompat.from(context).notify(1001, notification.build());\r
}\r
\`\`\`\r
\r
The example uses a built-in icon so it can stand on its own. A finished app should replace it with an app-owned monochrome status-bar drawable. Call \`createChannel()\` before \`showStudyReminder()\`, and only post after the permission check on Android 13 and later. The channel ID in the builder must exactly match the ID used to create the channel.\r
\r
## Notes to remember\r
\r
- WorkManager schedules deferrable work that should survive app restarts and can retry.\r
- Constraints let work wait for conditions such as a network connection or charging.\r
- Unique work prevents duplicate jobs with the same purpose.\r
- WorkManager timing is approximate. Periodic work cannot repeat more often than every 15 minutes.\r
- Use a foreground service only for ongoing work that the user notices and expects to control.\r
- Android 8.0 and later require notification channels.\r
- Android 13 and later require runtime notification permission for ordinary notifications.\r
- Keep the user informed and handle denied permission without blocking unrelated features.\r
\r
## Practice: schedule a notes sync\r
\r
Add a worker that sends pending note changes to the API from Chapter 11. Require a connected network, enqueue it as unique work, and return retry when a temporary request failure occurs. Add a study reminder channel, request notification permission when the user enables reminders, and tap the notification to reopen the app. Test the flow with permission granted and denied.\r
\r
## References\r
\r
- [Getting started with WorkManager](https://developer.android.com/develop/background-work/background-tasks/persistent/getting-started)\r
- [Define work requests](https://developer.android.com/develop/background-work/background-tasks/persistent/getting-started/define-work)\r
- [Manage unique work](https://developer.android.com/develop/background-work/background-tasks/persistent/how-to/manage-work)\r
- [Foreground services overview](https://developer.android.com/develop/background-work/services/fgs)\r
- [Foreground service types](https://developer.android.com/develop/background-work/services/fgs/service-types)\r
- [Create and manage notification channels](https://developer.android.com/develop/ui/views/notifications/channels)\r
- [Notification runtime permission](https://developer.android.com/develop/ui/compose/notifications/notification-permission)\r
\r
`,"./chapters/13-permissions-and-device-features.md":`# 13. Permissions, privacy, and device features\r
\r
[Back to notes index](../README.md)\r
\r
| [Previous: Background work and notifications](12-background-work-and-notifications.md) | [Notes index](../README.md) | [Next: Accessibility and adaptive layouts](14-accessibility-and-adaptive-ui.md) |\r
|:--|:--:|--:|\r
\r
## Ask for access only when a feature needs it\r
\r
An Android permission protects access to a resource or user data. Declare only the permissions the app needs, and ask for runtime access when the user reaches the feature that needs it. A permission request should explain a clear action, such as taking a photo, rather than appear during general app startup.\r
\r
| Permission type | How it is granted | Example |\r
| --- | --- | --- |\r
| Normal | Granted by the system when declared. | \`INTERNET\` for network access. |\r
| Runtime | Requested while the app is in use. The user can deny or later revoke it. | \`CAMERA\`, microphone, or location. |\r
| Special access | Usually enabled through a specific system settings page. | Some all-files or battery settings access. |\r
\r
Declaring a permission and checking a device feature are related but separate. A permission gives access to a protected operation. A \`<uses-feature>\` declaration says whether the app needs a particular hardware or software capability to install or run.\r
\r
## Declare an optional camera capability\r
\r
If the camera is optional, mark the feature as optional so app stores do not exclude devices without a camera. The app can then check at runtime and keep its other features available:\r
\r
\`\`\`xml\r
<manifest xmlns:android="http://schemas.android.com/apk/res/android">\r
\r
    <uses-permission android:name="android.permission.CAMERA" />\r
    <uses-feature\r
        android:name="android.hardware.camera.any"\r
        android:required="false" />\r
\r
    <application />\r
\r
</manifest>\r
\`\`\`\r
\r
Before showing camera controls, ask \`PackageManager\` whether the capability exists:\r
\r
\`\`\`java\r
import android.content.pm.PackageManager;\r
\r
boolean hasCamera = getPackageManager().hasSystemFeature(\r
        PackageManager.FEATURE_CAMERA_ANY\r
);\r
\r
if (hasCamera) {\r
    showCameraButton();\r
} else {\r
    showPhotoSelectionOption();\r
}\r
\`\`\`\r
\r
If a hardware feature is essential to the app, set \`android:required="true"\` or omit the attribute, which defaults to required. If it is optional, check before using the hardware so the feature works correctly on different devices.\r
\r
## Request a runtime permission in context\r
\r
The usual permission flow has a few steps:\r
\r
1. Check the permission just before the protected operation.\r
2. If it is missing, explain why when the user needs more context.\r
3. Request the permission with an Activity Result contract.\r
4. Handle both grant and denial.\r
5. Recheck before later operations because access can be revoked.\r
\r
This Activity example requests camera access from the camera button. The rationale dialog should have a clear continue action and a cancel action that leaves the rest of the screen usable:\r
\r
\`\`\`java\r
import android.Manifest;\r
import android.content.pm.PackageManager;\r
\r
import androidx.activity.result.ActivityResultLauncher;\r
import androidx.activity.result.contract.ActivityResultContracts;\r
import androidx.core.app.ActivityCompat;\r
import androidx.core.content.ContextCompat;\r
\r
private final ActivityResultLauncher<String> cameraPermission =\r
        registerForActivityResult(\r
                new ActivityResultContracts.RequestPermission(),\r
                granted -> {\r
                    if (granted) {\r
                        openCameraFeature();\r
                    } else {\r
                        showCameraUnavailableMessage();\r
                    }\r
                }\r
        );\r
\r
private void onCameraButtonTap() {\r
    if (!getPackageManager().hasSystemFeature(PackageManager.FEATURE_CAMERA_ANY)) {\r
        showCameraUnavailableMessage();\r
        return;\r
    }\r
\r
    if (ContextCompat.checkSelfPermission(\r
            this,\r
            Manifest.permission.CAMERA\r
    ) == PackageManager.PERMISSION_GRANTED) {\r
        openCameraFeature();\r
    } else if (ActivityCompat.shouldShowRequestPermissionRationale(\r
            this,\r
            Manifest.permission.CAMERA\r
    )) {\r
        showCameraRationale(() -> cameraPermission.launch(Manifest.permission.CAMERA));\r
    } else {\r
        cameraPermission.launch(Manifest.permission.CAMERA);\r
    }\r
}\r
\`\`\`\r
\r
\`showCameraRationale()\` is a small UI method that explains why the camera button needs access and invokes its callback if the user chooses Continue. On a first request, Android may report that no rationale is needed. After a denial, the system may recommend showing one. Do not assume the exact number of prompts or the contents of permission groups.\r
\r
The callback handles denial without crashing or blocking the rest of the app. If a feature remains unavailable, say what is affected. Avoid repeatedly opening system settings to pressure someone after they decline.\r
\r
Android 11 (API 30) and higher can offer a one-time permission for location, camera, and microphone. The user can also revoke access in system settings. Check again when the feature is used and handle the protected operation failing.\r
\r
## Prefer system selection when it avoids broad access\r
\r
If the person only needs to attach one image, asking for access to the full media library is usually unnecessary. The Android Photo Picker lets them choose specific images or videos and grants access to those selected URIs. It does not require a broad media-library permission.\r
\r
The Photo Picker contract in AndroidX Activity 1.7.0 or later can request one image:\r
\r
\`\`\`java\r
import android.net.Uri;\r
\r
import androidx.activity.result.ActivityResultLauncher;\r
import androidx.activity.result.PickVisualMediaRequest;\r
import androidx.activity.result.contract.ActivityResultContracts;\r
\r
private final ActivityResultLauncher<PickVisualMediaRequest> pickImage =\r
        registerForActivityResult(\r
                new ActivityResultContracts.PickVisualMedia(),\r
                (Uri uri) -> {\r
                    if (uri != null) {\r
                        previewSelectedImage(uri);\r
                    }\r
                }\r
        );\r
\r
private void onChooseImageTap() {\r
    pickImage.launch(new PickVisualMediaRequest.Builder()\r
            .setMediaType(\r
                    ActivityResultContracts.PickVisualMedia.ImageOnly.INSTANCE\r
            )\r
            .build());\r
}\r
\`\`\`\r
\r
The callback can receive \`null\` when the person closes the picker without selecting anything. If an upload will continue after the app or device restarts, persist access to the returned URI as needed with \`ContentResolver.takePersistableUriPermission()\`. Do not request access to every photo for a feature that only needs a selected file.\r
\r
For taking a photo, the system camera app can also handle an image-capture intent. If the app directly controls the camera hardware through CameraX or Camera2, it needs the \`CAMERA\` runtime permission. A delegated system action can avoid requesting access the app itself does not use.\r
\r
## Location should match the feature\r
\r
Ask for foreground location only when a visible feature needs it. Coarse location may be enough for a nearby-city result. Use precise location only when the feature needs that accuracy. A user can grant approximate location when the app requests location access.\r
\r
Background location is a separate and more sensitive need. Request it only when continuous access is essential to a core feature, explain why, and follow the separate system flow for the Android version and target SDK. If the feature can work while the activity is visible, avoid background access.\r
\r
The same least-access approach applies to contacts, microphone, nearby devices, and files. A system picker or a single-purpose intent may provide the action without giving the app ongoing access to an entire data collection.\r
\r
## Handle privacy choices in the app\r
\r
- Request access only for the action the user chose. Do not collect extra data because it might be useful later.\r
- Explain which feature needs the permission and what data it uses.\r
- Keep the app usable when an optional permission is denied.\r
- Recheck access each time protected data or hardware is needed.\r
- Treat permission state as changeable. The user can revoke it, grant it once, or choose approximate location.\r
- Store only the information the feature needs, and use secure transport for data sent over a network.\r
- Check what permissions third-party libraries declare. A library's request appears to the user as the app's request.\r
- Test the screen with the feature granted, denied, revoked in settings, and unavailable on the device.\r
\r
## Practice: optional photo attachment\r
\r
Add an optional photo attachment to a study note. First check whether the device has a camera before showing the camera action. Use the Photo Picker for choosing an existing image, then handle cancellation and preview the returned URI. If the app also opens the camera hardware directly, request \`CAMERA\` only after the user taps that action. Test a device without a camera and test both granted and denied permission states.\r
\r
## Notes to remember\r
\r
- A permission protects an operation. A device feature check tells whether the hardware or capability exists.\r
- Normal permissions do not use a runtime prompt. Sensitive runtime permissions need a contextual request.\r
- Check access when using the feature, and handle revocation or denial.\r
- Use optional \`<uses-feature>\` declarations when hardware is not required for app installation.\r
- Use the Photo Picker for selected media instead of asking for access to the whole library.\r
- Request background location only when the core feature truly requires it.\r
- Give people a useful fallback when they deny an optional permission or lack the hardware.\r
\r
## References\r
\r
- [Request runtime permissions](https://developer.android.com/training/permissions/requesting)\r
- [App permissions best practices](https://developer.android.com/training/permissions/usage-notes)\r
- [Photo Picker](https://developer.android.com/training/data-storage/shared/photo-picker)\r
- [Access media files from shared storage](https://developer.android.com/training/data-storage/shared/media)\r
- [Background location](https://developer.android.com/develop/sensors-and-location/location/permissions/background)\r
- [Increase app availability across device types](https://developer.android.com/develop/adaptive-apps/guides/increase-availability)\r
- [PackageManager reference](https://developer.android.com/reference/android/content/pm/PackageManager)\r
\r
\r
`,"./chapters/14-accessibility-and-adaptive-ui.md":`# 14. Accessibility and adaptive layouts\r
\r
[Back to notes index](../README.md)\r
\r
| [Previous: Permissions and Android device features](13-permissions-and-device-features.md) | [Notes index](../README.md) | [Next: Debugging, testing, and release](15-debugging-testing-and-release.md) |\r
|:--|:--:|--:|\r
\r
Accessibility and adaptive design make an app easier to use with different abilities, input methods, font settings, and window sizes. These notes focus on Java and XML layouts built with Android Views.\r
\r
## 1. Accessibility is part of the interface\r
\r
An interface is not accessible just because its text is visible. A person may use TalkBack to hear and navigate the screen, a keyboard or D-pad to move between controls, Switch Access to select items, or a large font setting to read content. A good layout keeps its meaning and actions clear for each of these ways of using the app.\r
\r
Use standard Android controls when they fit the job. A \`Button\` already exposes button behavior to accessibility services. A clickable \`TextView\` may look similar, but it does not automatically provide the same role or interaction. Keep a visible label next to an icon when space allows, and do not communicate state with color alone.\r
\r
## 2. Give controls useful spoken names\r
\r
Text controls such as \`TextView\`, \`Button\`, and \`EditText\` already expose their text to screen readers. Add \`contentDescription\` when a graphic or icon-only control has meaning that is not present in visible text. Describe the action or purpose, not the widget type.\r
\r
\`\`\`xml\r
<!-- res/layout/activity_search.xml -->\r
<ImageButton\r
    android:id="@+id/searchButton"\r
    android:layout_width="48dp"\r
    android:layout_height="48dp"\r
    android:contentDescription="@string/search"\r
    android:src="@drawable/ic_search"\r
    android:background="?attr/selectableItemBackgroundBorderless" />\r
\`\`\`\r
\r
Put user-facing descriptions in string resources so they can be translated:\r
\r
\`\`\`xml\r
<!-- res/values/strings.xml -->\r
<resources>\r
    <string name="search">Search</string>\r
    <string name="search_notes">Search notes</string>\r
    <string name="email_address">Email address</string>\r
    <string name="email_hint">name@example.com</string>\r
    <string name="more_options">More options</string>\r
    <string name="notes_title">My notes</string>\r
    <string name="clear_search">Clear search</string>\r
    <string name="select_a_note">Select a note to read</string>\r
</resources>\r
\`\`\`\r
\r
Do not add a spoken label to decorative artwork. Mark it as unimportant for accessibility instead:\r
\r
\`\`\`xml\r
<ImageView\r
    android:layout_width="match_parent"\r
    android:layout_height="160dp"\r
    android:importantForAccessibility="no"\r
    android:src="@drawable/header_texture"\r
    android:contentDescription="@null" />\r
\`\`\`\r
\r
Avoid repeating nearby text. If a row already displays “Settings” beside a gear icon, a second spoken “Settings” description on the icon can make TalkBack announce the same information twice. In a repeated list, each actionable item needs enough unique text to tell it apart, such as the note title rather than the same generic word “Open.”\r
\r
Associate form labels with their fields. A hint can disappear when the user types, so it should not be the only label:\r
\r
\`\`\`xml\r
<TextView\r
    android:id="@+id/emailLabel"\r
    android:layout_width="wrap_content"\r
    android:layout_height="wrap_content"\r
    android:labelFor="@id/emailInput"\r
    android:text="@string/email_address" />\r
\r
<EditText\r
    android:id="@+id/emailInput"\r
    android:layout_width="match_parent"\r
    android:layout_height="wrap_content"\r
    android:inputType="textEmailAddress"\r
    android:hint="@string/email_hint" />\r
\`\`\`\r
\r
## 3. Make touch targets easy to reach\r
\r
Android recommends a focusable touch area of at least **48dp by 48dp** for each interactive control. The drawn icon can be smaller if padding provides the larger target. Give neighboring controls enough space so a tap does not activate the wrong one.\r
\r
\`\`\`xml\r
<ImageButton\r
    android:id="@+id/moreButton"\r
    android:layout_width="wrap_content"\r
    android:layout_height="wrap_content"\r
    android:minWidth="48dp"\r
    android:minHeight="48dp"\r
    android:padding="12dp"\r
    android:contentDescription="@string/more_options"\r
    android:src="@drawable/ic_more_vert" />\r
\`\`\`\r
\r
For a \`RecyclerView\` row, make the clickable row or its action controls large enough, not just the tiny icon inside it. Use \`dp\` for layout dimensions and \`sp\` for text sizes. Avoid fixed heights around text because large font settings can make the text clip or overlap.\r
\r
## 4. Keep reading and focus order clear\r
\r
TalkBack moves through accessible elements in a traversal order. Keyboard and D-pad input move through views with input focus. These are related but distinct focus systems. A sensible XML order, clear grouping, and standard controls usually produce a useful order without extra focus code.\r
\r
\`\`\`xml\r
<LinearLayout\r
    android:layout_width="match_parent"\r
    android:layout_height="wrap_content"\r
    android:orientation="vertical">\r
\r
    <TextView\r
        android:id="@+id/pageTitle"\r
        android:layout_width="wrap_content"\r
        android:layout_height="wrap_content"\r
        android:text="@string/notes_title" />\r
\r
    <EditText\r
        android:id="@+id/searchInput"\r
        android:layout_width="match_parent"\r
        android:layout_height="wrap_content"\r
        android:hint="@string/search_notes" />\r
\r
    <Button\r
        android:id="@+id/clearButton"\r
        android:layout_width="wrap_content"\r
        android:layout_height="wrap_content"\r
        android:text="@string/clear_search" />\r
</LinearLayout>\r
\`\`\`\r
\r
Use \`nextFocusForward\`, \`nextFocusUp\`, \`nextFocusDown\`, \`nextFocusLeft\`, or \`nextFocusRight\` only when the natural layout order does not match the intended navigation. Check that focus is visible and never trapped. Test that Tab, arrow keys, Enter, and D-pad center reach and activate the controls on devices that support them.\r
\r
## 5. Let text and contrast settings work\r
\r
Use \`sp\` for text so the system font-size setting can scale it. Prefer \`wrap_content\` for text containers, allow long labels to wrap, and check that dialogs and buttons still fit when the font is enlarged. Avoid placing essential text inside an image.\r
\r
Text should have clear contrast against its background. Color can reinforce a status, but include another cue such as a label, icon, or shape. For example, show “Error” with an error icon and message instead of relying only on a red border. Check screens with Android Accessibility Scanner and inspect them at larger font sizes and display sizes.\r
\r
## 6. Understand responsive and adaptive layouts\r
\r
**Responsive** layouts resize and reflow the same interface as the available space changes. **Adaptive** layouts choose a different arrangement when there is enough space for it. A notes app might show one list on a narrow window and place the list beside the selected note on a wider window.\r
\r
Use flexible dimensions such as \`match_parent\`, \`wrap_content\`, weights, and \`ConstraintLayout\` constraints rather than assuming a particular pixel resolution. Design for the app window, which can change on tablets, foldables, desktop windows, and split-screen mode. Do not assume that every device is a phone in portrait orientation.\r
\r
Android can select alternative XML files using resource directory qualifiers. For example, \`layout-w600dp\` is selected when the app window has at least 600dp of available width. The base layout remains the fallback for narrower windows. Use the same file name and keep important view IDs consistent so the same Activity can work with either layout.\r
\r
\`\`\`text\r
res/\r
  layout/\r
    activity_notes.xml\r
  layout-w600dp/\r
    activity_notes.xml\r
\`\`\`\r
\r
The narrow layout can show a single list:\r
\r
\`\`\`xml\r
<!-- res/layout/activity_notes.xml -->\r
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"\r
    android:layout_width="match_parent"\r
    android:layout_height="match_parent"\r
    android:orientation="vertical">\r
\r
    <TextView\r
        android:id="@+id/notesTitle"\r
        android:layout_width="match_parent"\r
        android:layout_height="wrap_content"\r
        android:text="@string/notes_title"\r
        android:textSize="24sp" />\r
\r
    <androidx.recyclerview.widget.RecyclerView\r
        android:id="@+id/notesList"\r
        android:layout_width="match_parent"\r
        android:layout_height="0dp"\r
        android:layout_weight="1" />\r
</LinearLayout>\r
\`\`\`\r
\r
The wide layout can keep the list visible beside a detail panel:\r
\r
\`\`\`xml\r
<!-- res/layout-w600dp/activity_notes.xml -->\r
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"\r
    android:layout_width="match_parent"\r
    android:layout_height="match_parent"\r
    android:orientation="horizontal">\r
\r
    <androidx.recyclerview.widget.RecyclerView\r
        android:id="@+id/notesList"\r
        android:layout_width="0dp"\r
        android:layout_height="match_parent"\r
        android:layout_weight="1" />\r
\r
    <FrameLayout\r
        android:id="@+id/noteDetailContainer"\r
        android:layout_width="0dp"\r
        android:layout_height="match_parent"\r
        android:layout_weight="2">\r
\r
        <TextView\r
            android:id="@+id/noteDetailPlaceholder"\r
            android:layout_width="match_parent"\r
            android:layout_height="match_parent"\r
            android:gravity="center"\r
            android:text="@string/select_a_note" />\r
    </FrameLayout>\r
</LinearLayout>\r
\`\`\`\r
\r
The example shows the layout choice, not the list selection behavior. Java code still needs to handle a selected note and update the detail panel. Since both resources use the same \`notesList\` ID, the Activity can find that view in either arrangement. The detail container exists only in the wide resource, so Java should check whether it is present before using it:\r
\r
\`\`\`java\r
FrameLayout detailContainer = findViewById(R.id.noteDetailContainer);\r
\r
if (detailContainer != null) {\r
    // A wide layout is active, so show the selected note here.\r
} else {\r
    // A narrow layout can open the selected note on a separate screen.\r
}\r
\`\`\`\r
\r
The \`sw600dp\` qualifier means the smallest width of the available app area is at least 600dp, regardless of current orientation. The \`w600dp\` qualifier means the current available width is at least 600dp, which can be more useful when an app window is resized. Pick the qualifier based on the layout decision, and test window resizing rather than relying only on device names.\r
\r
## 7. Check accessibility on a real screen\r
\r
Use this quick review while building each screen:\r
\r
1. Turn on TalkBack and move through the screen. Confirm every action has a clear name and state, and repeated rows can be distinguished.\r
2. Use keyboard or D-pad navigation. Confirm focus order follows the task and focus remains visible.\r
3. Increase font and display sizes. Confirm text wraps, controls remain reachable, and content does not overlap or disappear.\r
4. Inspect touch target sizes and text contrast with Accessibility Scanner, then correct the underlying layout or labels.\r
5. Resize the emulator or use split-screen. Confirm the layout changes when space allows and the current selection or typed text is retained.\r
\r
Automated checks can catch some issues, but manually using the screen with accessibility features enabled reveals confusing labels, order, and behavior that a static scan cannot judge.\r
\r
## 8. Key points\r
\r
- Keep visible text on text controls. Add a content description for meaningful icon-only controls and images.\r
- Hide purely decorative graphics from accessibility services.\r
- Aim for at least 48dp by 48dp of touch area and give nearby actions enough separation.\r
- Use standard Android controls and a logical focus order; test TalkBack and keyboard input.\r
- Use \`sp\` for text and let content grow when users enlarge fonts.\r
- Build around available window space. Provide an alternate layout when a wider arrangement helps.\r
- Keep shared view IDs stable across alternate layout resources and handle views that exist only in one variant.\r
\r
## References\r
\r
- [Make apps more accessible with Views](https://developer.android.com/guide/topics/ui/accessibility/views/apps-views)\r
- [Principles for improving app accessibility with Views](https://developer.android.com/guide/topics/ui/accessibility/views/principles-views)\r
- [Responsive and adaptive design with Views](https://developer.android.com/develop/ui/views/layout/responsive-adaptive-design-with-views)\r
- [Window size classes for Views](https://developer.android.com/develop/ui/views/layout/use-window-size-classes)\r
- [Input compatibility on large screens](https://developer.android.com/develop/ui/views/touch-and-input/input-compatibility-on-large-screens)\r
\r
---\r
\r
| [Previous: Permissions and Android device features](13-permissions-and-device-features.md) | [Notes index](../README.md) | [Next: Debugging, testing, and release](15-debugging-testing-and-release.md) |\r
|:--|:--:|--:|\r
\r
`,"./chapters/15-debugging-testing-and-release.md":`# 15. Testing, debugging, and release\r
\r
[Back to notes index](../README.md)\r
\r
| [Previous: Accessibility and adaptive layouts](14-accessibility-and-adaptive-ui.md) | [Notes index](../README.md) | [Next: All code samples](98-all-code-samples.md) |\r
|:--|:--:|--:|\r
\r
These notes cover ways to check Android app behavior, trace problems, and prepare a release build. The examples use Java, Android Views, Android Studio, and Gradle.\r
\r
## 1. Test behavior at the right level\r
\r
A local unit test runs on the computer's Java Virtual Machine. It is fast and fits logic that does not need a running Android device, such as formatting, validation, or calculations. Put these tests under \`app/src/test/java/\`.\r
\r
An instrumented test runs on an emulator or physical device. It can use Android framework classes and inspect actual UI behavior. Put these tests under \`app/src/androidTest/java/\`. Use this level for behavior that depends on an Activity, Android views, a database, or interaction between app components.\r
\r
Keep most checks small and focused. Add UI or end-to-end checks for important user paths, such as saving a note or recovering from an empty search. A test should state the expected behavior clearly and fail when that behavior changes unexpectedly.\r
\r
## 2. Write a local Java unit test\r
\r
For example, a small validator can reject a missing or blank note title without loading Android classes:\r
\r
\`\`\`java\r
// app/src/main/java/com/example/notes/NoteTitleValidator.java\r
package com.example.notes;\r
\r
public final class NoteTitleValidator {\r
    private NoteTitleValidator() {\r
    }\r
\r
    public static boolean isValid(String title) {\r
        return title != null && !title.trim().isEmpty();\r
    }\r
}\r
\`\`\`\r
\r
Test the behavior in \`app/src/test/java/com/example/notes/NoteTitleValidatorTest.java\`:\r
\r
\`\`\`java\r
package com.example.notes;\r
\r
import static org.junit.Assert.assertFalse;\r
import static org.junit.Assert.assertTrue;\r
\r
import org.junit.Test;\r
\r
public class NoteTitleValidatorTest {\r
    @Test\r
    public void isValid_returnsTrueForText() {\r
        assertTrue(NoteTitleValidator.isValid("Android notes"));\r
    }\r
\r
    @Test\r
    public void isValid_returnsFalseForBlankText() {\r
        assertFalse(NoteTitleValidator.isValid("   "));\r
    }\r
\r
    @Test\r
    public void isValid_returnsFalseForNull() {\r
        assertFalse(NoteTitleValidator.isValid(null));\r
    }\r
}\r
\`\`\`\r
\r
The test names describe the condition and expected result. Each test checks one behavior, which makes a failure easier to understand. Android Studio projects normally provide a JUnit dependency in the app module. If it is missing, add the JUnit version already used by the project to the app module's \`testImplementation\` dependencies.\r
\r
Run local tests from the project root:\r
\r
\`\`\`powershell\r
.\\gradlew.bat test\r
\`\`\`\r
\r
Gradle writes reports under the app module's \`build/reports/tests/\` folder. A green build means the tests passed, not that every possible behavior has been checked.\r
\r
## 3. Check a screen with an instrumented UI test\r
\r
Espresso can interact with visible Views and verify the result. Give important controls stable IDs in XML so a test can find them. For example, after a user taps \`saveButton\`, the app might show a confirmation message with the \`noteSavedMessage\` ID.\r
\r
\`\`\`java\r
// app/src/androidTest/java/com/example/notes/NoteSaveTest.java\r
package com.example.notes;\r
\r
import static androidx.test.espresso.Espresso.onView;\r
import static androidx.test.espresso.action.ViewActions.click;\r
import static androidx.test.espresso.assertion.ViewAssertions.matches;\r
import static androidx.test.espresso.matcher.ViewMatchers.isDisplayed;\r
import static androidx.test.espresso.matcher.ViewMatchers.withId;\r
\r
import androidx.test.ext.junit.rules.ActivityScenarioRule;\r
import androidx.test.ext.junit.runners.AndroidJUnit4;\r
\r
import org.junit.Rule;\r
import org.junit.Test;\r
import org.junit.runner.RunWith;\r
\r
@RunWith(AndroidJUnit4.class)\r
public class NoteSaveTest {\r
    @Rule\r
    public ActivityScenarioRule<MainActivity> activityRule =\r
            new ActivityScenarioRule<>(MainActivity.class);\r
\r
    @Test\r
    public void saveButton_showsConfirmation() {\r
        onView(withId(R.id.saveButton)).perform(click());\r
        onView(withId(R.id.noteSavedMessage)).check(matches(isDisplayed()));\r
    }\r
}\r
\`\`\`\r
\r
This example assumes the Activity starts with valid note content and displays the confirmation after saving. If saving needs input, fill the input fields in the test before tapping the button. A useful UI test checks what a user can observe, rather than reaching into private Activity fields.\r
\r
Run instrumented tests with an emulator or a connected device:\r
\r
\`\`\`powershell\r
.\\gradlew.bat connectedAndroidTest\r
\`\`\`\r
\r
Keep the emulator API level and device configuration relevant to the behavior being tested. A phone emulator does not replace checking a tablet layout, a different Android version, or a physical feature such as a camera.\r
\r
## 4. Use Logcat to understand runtime behavior\r
\r
Logcat displays messages from the app and Android system. Filter by the app process, tag, and severity to narrow down the output. Android's \`Log\` class provides levels such as \`d\` for debug, \`i\` for information, \`w\` for warning, and \`e\` for error.\r
\r
\`\`\`java\r
import android.util.Log;\r
\r
public final class NoteRepository {\r
    private static final String TAG = "NoteRepository";\r
\r
    public void saveNote(String title) {\r
        if (title == null || title.trim().isEmpty()) {\r
            Log.w(TAG, "Skipped saving a note with an empty title");\r
            return;\r
        }\r
\r
        // Save the note.\r
        Log.d(TAG, "Note saved");\r
    }\r
}\r
\`\`\`\r
\r
Use a short, consistent tag so related messages are easy to filter. Do not write passwords, access tokens, private note contents, or other sensitive user data to logs. Remove noisy debug logging before release, or keep it behind a debug-only check.\r
\r
When an app crashes, read the exception type and stack trace in Logcat. Start with the first stack-trace line that points to your app's code. The lines above it usually show the exception and message; the app frame shows where the failure occurred. Trace backward through the calls to find why the value or state was invalid.\r
\r
## 5. Debug with breakpoints\r
\r
Set a breakpoint on the line where the behavior first becomes incorrect, then run the app with **Debug**. When execution stops, inspect local variables and the call stack. Step over a line to continue in the current method, step into a method to follow its implementation, or step out to return to the caller. Add a watch for a value that changes over several steps.\r
\r
Breakpoints are useful when a log message tells you that something went wrong but not why. An exception breakpoint can stop execution when an exception is thrown, including cases where app code catches it later. Remove or disable temporary breakpoints after fixing the issue so later debugging sessions behave as expected.\r
\r
## 6. Check the release build separately\r
\r
An app can work in a debug build and fail in a release build. Release builds may shrink resources, optimize code, use different server settings, and omit debug-only behavior. Test a release candidate before sharing it broadly.\r
\r
R8 can shrink and optimize app code. Resource shrinking can remove unused resources. A Groovy Gradle build file can enable both in the release build type:\r
\r
\`\`\`groovy\r
android {\r
    buildTypes {\r
        release {\r
            minifyEnabled true\r
            shrinkResources true\r
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'),\r
                    'proguard-rules.pro'\r
        }\r
    }\r
}\r
\`\`\`\r
\r
When a library uses reflection, serialization, or other indirect references, verify that R8 keeps the classes and members the app needs. Add a keep rule only for code that actually requires it. Install and test the minified release build because a successful debug build does not check shrinker behavior.\r
\r
## 7. Sign and package a release\r
\r
Android packages must be signed. For a Google Play release, an Android App Bundle (\`.aab\`) is the usual upload artifact. With Play App Signing, the upload key signs the bundle you upload, and Google Play manages the app signing key used for delivered APKs. Keep the upload key and its password private, back them up securely, and never commit them to a public repository.\r
\r
In Android Studio, use **Build > Generate Signed Bundle / APK**, choose **Android App Bundle**, select or create the upload key, and build the release variant. Keep \`versionCode\` higher for each update and set the user-visible \`versionName\` appropriately. Install the generated build or distribute it through a private test track before a public release.\r
\r
## 8. Release readiness checklist\r
\r
Before sharing a release build, check the following:\r
\r
1. Run local unit tests and instrumented tests for the changed behavior.\r
2. Open the app on a clean install and on an upgrade from the previous version when stored data matters.\r
3. Check important screens on narrow and wide windows, with larger text, and with accessibility services enabled.\r
4. Test denied permissions, offline behavior, empty states, and failure messages where those paths apply.\r
5. Build and install the release variant. Verify the app still works after code and resource shrinking.\r
6. Confirm the app label, icon, package ID, version values, and required manifest entries.\r
7. Confirm the signing key is available to the release owner and no key material or secrets are in the repository.\r
8. Review logs, remove test data, and verify that user information is not exposed in messages or screenshots.\r
\r
## 9. Key points\r
\r
- Use local JVM tests for logic that does not need Android, and device tests for Android behavior and UI.\r
- Test observable behavior with stable view IDs and clear expected results.\r
- Use Logcat and the debugger together: logs narrow the problem, and breakpoints reveal the state at the failing line.\r
- Treat the release build as a separate build to verify, especially when R8 and resource shrinking are enabled.\r
- Protect signing keys and increase \`versionCode\` for every published update.\r
\r
## References\r
\r
- [Test apps on Android](https://developer.android.com/training/testing)\r
- [Testing strategies](https://developer.android.com/training/testing/fundamentals/strategies)\r
- [Build local unit tests](https://developer.android.com/training/testing/local-tests)\r
- [Automate UI tests](https://developer.android.com/training/testing/ui-tests)\r
- [Run tests from the command line](https://developer.android.com/studio/test/command-line)\r
- [View logs with Logcat](https://developer.android.com/studio/debug/logcat)\r
- [Debug your app](https://developer.android.com/studio/debug)\r
- [Configure R8](https://developer.android.com/build/shrink-code)\r
- [Sign your app](https://developer.android.com/studio/publish/app-signing)\r
- [Upload your app bundle to Play Console](https://developer.android.com/studio/publish/upload-bundle)\r
\r
---\r
\r
| [Previous: Accessibility and adaptive layouts](14-accessibility-and-adaptive-ui.md) | [Notes index](../README.md) | [Next: All code samples](98-all-code-samples.md) |\r
|:--|:--:|--:|\r
\r
\r
`,"./chapters/98-all-code-samples.md":`# 16. All code samples\r
\r
[Back to notes index](../README.md)\r
\r
| [Previous: Testing, debugging, and release](15-debugging-testing-and-release.md) | [Notes index](../README.md) | [Next: Complete Q&A](99-complete-q-and-a.md) |\r
|:--|:--:|--:|\r
\r
This chapter gathers the fenced examples from the topic notes in one place. Each example keeps its original language tag and is grouped by the chapter and section where I first recorded it. Read the linked section when you need its explanation or surrounding setup.\r
\r
The examples cover Java, XML, Gradle, JSON, and the command-line checks used across these notes. Some snippets are focused excerpts and rely on the resources, IDs, dependencies, or classes described in their source section.\r
\r
## Build your first Android app\r
\r
[Source chapter](./01-first-android-app.md)\r
\r
### Example 1: Find the first-screen files\r
\r
\`\`\`text\r
app/\r
└── src/main/\r
    ├── AndroidManifest.xml\r
    ├── java/com/example/studyapp/MainActivity.java\r
    └── res/\r
        ├── layout/activity_main.xml\r
        └── values/strings.xml\r
\`\`\`\r
\r
### Example 2: Build a small screen in XML\r
\r
\`\`\`xml\r
<?xml version="1.0" encoding="utf-8"?>\r
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"\r
    android:layout_width="match_parent"\r
    android:layout_height="match_parent"\r
    android:orientation="vertical"\r
    android:padding="24dp">\r
\r
    <TextView\r
        android:id="@+id/message"\r
        android:layout_width="match_parent"\r
        android:layout_height="wrap_content"\r
        android:text="@string/welcome_message"\r
        android:textSize="20sp" />\r
\r
    <Button\r
        android:id="@+id/change_message"\r
        android:layout_width="wrap_content"\r
        android:layout_height="wrap_content"\r
        android:layout_marginTop="16dp"\r
        android:text="@string/change_message" />\r
\r
</LinearLayout>\r
\`\`\`\r
\r
### Example 3: Build a small screen in XML\r
\r
\`\`\`xml\r
<resources>\r
    <string name="app_name">StudyApp</string>\r
    <string name="welcome_message">Hello, Android!</string>\r
    <string name="change_message">Change message</string>\r
    <string name="updated_message">The button works.</string>\r
</resources>\r
\`\`\`\r
\r
### Example 4: Connect the layout to Java\r
\r
\`\`\`java\r
package com.example.studyapp;\r
\r
import android.app.Activity;\r
import android.os.Bundle;\r
import android.view.View;\r
import android.widget.Button;\r
import android.widget.TextView;\r
\r
public class MainActivity extends Activity {\r
    @Override\r
    protected void onCreate(Bundle savedInstanceState) {\r
        super.onCreate(savedInstanceState);\r
        setContentView(R.layout.activity_main);\r
\r
        TextView message = (TextView) findViewById(R.id.message);\r
        Button changeMessage = (Button) findViewById(R.id.change_message);\r
\r
        changeMessage.setOnClickListener(new View.OnClickListener() {\r
            @Override\r
            public void onClick(View view) {\r
                message.setText(R.string.updated_message);\r
            }\r
        });\r
    }\r
}\r
\`\`\`\r
\r
### Example 5: Check the launcher activity\r
\r
\`\`\`xml\r
<activity\r
    android:name=".MainActivity"\r
    android:exported="true">\r
    <intent-filter>\r
        <action android:name="android.intent.action.MAIN" />\r
        <category android:name="android.intent.category.LAUNCHER" />\r
    </intent-filter>\r
</activity>\r
\`\`\`\r
\r
## Java essentials for Android\r
\r
[Source chapter](./02-java-for-android.md)\r
\r
### Example 1: Values and types\r
\r
\`\`\`java\r
int completedCount = 3;\r
double progress = 0.75;\r
boolean isReady = true;\r
char firstLetter = 'A';\r
String topic = "Activities";\r
\`\`\`\r
\r
### Example 2: Values and types\r
\r
\`\`\`java\r
final int maximumAttempts = 3;\r
\`\`\`\r
\r
### Example 3: Conditions, loops, and methods\r
\r
\`\`\`java\r
static String statusLabel(int completed, int total) {\r
    if (total <= 0) {\r
        return "No topics yet";\r
    }\r
\r
    if (completed == total) {\r
        return "All topics reviewed";\r
    }\r
\r
    return completed + " of " + total + " reviewed";\r
}\r
\`\`\`\r
\r
### Example 4: Conditions, loops, and methods\r
\r
\`\`\`java\r
for (String topic : topics) {\r
    System.out.println(topic);\r
}\r
\`\`\`\r
\r
### Example 5: Classes, objects, and encapsulation\r
\r
\`\`\`java\r
public class StudyItem {\r
    private final String title;\r
    private boolean reviewed;\r
\r
    public StudyItem(String title) {\r
        if (title == null || title.trim().isEmpty()) {\r
            throw new IllegalArgumentException("Title must not be empty");\r
        }\r
\r
        this.title = title.trim();\r
        this.reviewed = false;\r
    }\r
\r
    public String getTitle() {\r
        return title;\r
    }\r
\r
    public boolean isReviewed() {\r
        return reviewed;\r
    }\r
\r
    public void markReviewed() {\r
        reviewed = true;\r
    }\r
}\r
\`\`\`\r
\r
### Example 6: Interfaces, inheritance, and callbacks\r
\r
\`\`\`java\r
public class MainActivity extends Activity {\r
    // Activity behavior belongs here.\r
}\r
\`\`\`\r
\r
### Example 7: Interfaces, inheritance, and callbacks\r
\r
\`\`\`java\r
button.setOnClickListener(new View.OnClickListener() {\r
    @Override\r
    public void onClick(View view) {\r
        message.setText(R.string.updated_message);\r
    }\r
});\r
\`\`\`\r
\r
### Example 8: Lists, generics, and equality\r
\r
\`\`\`java\r
List<StudyItem> items = new ArrayList<>();\r
items.add(new StudyItem("Java basics"));\r
items.add(new StudyItem("Activities"));\r
\r
for (StudyItem item : items) {\r
    System.out.println(item.getTitle());\r
}\r
\`\`\`\r
\r
### Example 9: Lists, generics, and equality\r
\r
\`\`\`java\r
String selectedTab = "notes";\r
\r
if ("notes".equals(selectedTab)) {\r
    System.out.println("Show the notes tab");\r
}\r
\`\`\`\r
\r
### Example 10: Null values and exceptions\r
\r
\`\`\`java\r
String countText = "12";\r
\r
try {\r
    int count = Integer.parseInt(countText);\r
    System.out.println("Count: " + count);\r
} catch (NumberFormatException exception) {\r
    System.out.println("Enter a whole number");\r
}\r
\`\`\`\r
\r
## Project structure, Gradle, and resources\r
\r
[Source chapter](./03-project-structure-and-resources.md)\r
\r
### Example 1: How an Android project is arranged\r
\r
\`\`\`text\r
StudyApp/\r
├── gradle/\r
│   └── wrapper/\r
│       └── gradle-wrapper.properties\r
├── app/\r
│   ├── build.gradle\r
│   └── src/\r
│       ├── main/\r
│       │   ├── AndroidManifest.xml\r
│       │   ├── java/com/example/studyapp/\r
│       │   └── res/\r
│       ├── test/\r
│       └── androidTest/\r
├── build.gradle\r
├── gradlew\r
├── gradlew.bat\r
└── settings.gradle\r
\`\`\`\r
\r
### Example 2: Gradle and the Android build plugin\r
\r
\`\`\`text\r
gradlew.bat :app:tasks\r
\`\`\`\r
\r
### Example 3: Gradle and the Android build plugin\r
\r
\`\`\`text\r
gradlew.bat :app:assembleDebug\r
\`\`\`\r
\r
### Example 4: Use a string resource\r
\r
\`\`\`xml\r
<?xml version="1.0" encoding="utf-8"?>\r
<resources>\r
    <string name="app_name">StudyApp</string>\r
    <string name="welcome_message">Welcome to my study notes</string>\r
</resources>\r
\`\`\`\r
\r
### Example 5: Use a string resource\r
\r
\`\`\`xml\r
<TextView\r
    android:layout_width="wrap_content"\r
    android:layout_height="wrap_content"\r
    android:text="@string/welcome_message" />\r
\`\`\`\r
\r
### Example 6: Use a string resource\r
\r
\`\`\`java\r
titleView.setText(R.string.welcome_message);\r
\`\`\`\r
\r
## Activities and the Android lifecycle\r
\r
[Source chapter](./04-activities-and-lifecycle.md)\r
\r
### Example 1: Common transitions\r
\r
\`\`\`text\r
onCreate -> onStart -> onResume\r
\`\`\`\r
\r
### Example 2: Common transitions\r
\r
\`\`\`text\r
onPause -> onStop\r
\`\`\`\r
\r
### Example 3: Common transitions\r
\r
\`\`\`text\r
onRestart -> onStart -> onResume\r
\`\`\`\r
\r
### Example 4: Observe callbacks with Logcat\r
\r
\`\`\`java\r
private static final String TAG = "MainActivity";\r
\r
@Override\r
protected void onStart() {\r
    super.onStart();\r
    Log.d(TAG, "onStart");\r
}\r
\r
@Override\r
protected void onStop() {\r
    super.onStop();\r
    Log.d(TAG, "onStop");\r
}\r
\`\`\`\r
\r
### Example 5: Restore a small piece of screen state\r
\r
\`\`\`java\r
package com.example.studyapp;\r
\r
import android.app.Activity;\r
import android.os.Bundle;\r
import android.view.View;\r
import android.widget.Button;\r
import android.widget.TextView;\r
\r
public class MainActivity extends Activity {\r
    private static final String STATE_TAP_COUNT = "tap_count";\r
\r
    private int tapCount;\r
    private TextView countLabel;\r
\r
    @Override\r
    protected void onCreate(Bundle savedInstanceState) {\r
        super.onCreate(savedInstanceState);\r
        setContentView(R.layout.activity_main);\r
\r
        countLabel = (TextView) findViewById(R.id.count_label);\r
        Button countButton = (Button) findViewById(R.id.count_button);\r
\r
        if (savedInstanceState != null) {\r
            tapCount = savedInstanceState.getInt(STATE_TAP_COUNT, 0);\r
        }\r
        updateCountLabel();\r
\r
        countButton.setOnClickListener(new View.OnClickListener() {\r
            @Override\r
            public void onClick(View view) {\r
                tapCount++;\r
                updateCountLabel();\r
            }\r
        });\r
    }\r
\r
    private void updateCountLabel() {\r
        countLabel.setText(getString(R.string.tap_count, tapCount));\r
    }\r
\r
    @Override\r
    protected void onSaveInstanceState(Bundle outState) {\r
        outState.putInt(STATE_TAP_COUNT, tapCount);\r
        super.onSaveInstanceState(outState);\r
    }\r
}\r
\`\`\`\r
\r
### Example 6: Restore a small piece of screen state\r
\r
\`\`\`xml\r
<string name="tap_count">Taps: %1$d</string>\r
\`\`\`\r
\r
## XML layouts, views, themes, and View Binding\r
\r
[Source chapter](./05-xml-layouts-and-viewbinding.md)\r
\r
### Example 1: Layouts describe a view hierarchy\r
\r
\`\`\`text\r
LinearLayout\r
├── TextView\r
├── EditText\r
└── Button\r
\`\`\`\r
\r
### Example 2: A small XML screen\r
\r
\`\`\`xml\r
<?xml version="1.0" encoding="utf-8"?>\r
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"\r
    android:layout_width="match_parent"\r
    android:layout_height="match_parent"\r
    android:orientation="vertical"\r
    android:padding="24dp">\r
\r
    <TextView\r
        android:id="@+id/screen_title"\r
        style="@style/StudyApp.Heading"\r
        android:layout_width="match_parent"\r
        android:layout_height="wrap_content"\r
        android:text="@string/screen_title" />\r
\r
    <EditText\r
        android:id="@+id/topic_input"\r
        android:layout_width="match_parent"\r
        android:layout_height="wrap_content"\r
        android:layout_marginTop="16dp"\r
        android:hint="@string/topic_hint"\r
        android:inputType="textCapSentences" />\r
\r
    <Button\r
        android:id="@+id/save_topic"\r
        android:layout_width="wrap_content"\r
        android:layout_height="wrap_content"\r
        android:layout_marginTop="16dp"\r
        android:text="@string/save_topic" />\r
\r
</LinearLayout>\r
\`\`\`\r
\r
### Example 3: A small XML screen\r
\r
\`\`\`xml\r
<resources>\r
    <string name="screen_title">Topics I am studying</string>\r
    <string name="topic_hint">Enter a topic</string>\r
    <string name="save_topic">Save topic</string>\r
</resources>\r
\`\`\`\r
\r
### Example 4: Styles and themes\r
\r
\`\`\`xml\r
<resources>\r
    <style name="StudyApp.Heading">\r
        <item name="android:textSize">22sp</item>\r
        <item name="android:textStyle">bold</item>\r
    </style>\r
</resources>\r
\`\`\`\r
\r
### Example 5: View Binding\r
\r
\`\`\`groovy\r
android {\r
    buildFeatures {\r
        viewBinding true\r
    }\r
}\r
\`\`\`\r
\r
### Example 6: View Binding\r
\r
\`\`\`java\r
package com.example.studyapp;\r
\r
import android.app.Activity;\r
import android.os.Bundle;\r
import android.view.View;\r
\r
import com.example.studyapp.databinding.ActivityMainBinding;\r
\r
public class MainActivity extends Activity {\r
    private ActivityMainBinding binding;\r
\r
    @Override\r
    protected void onCreate(Bundle savedInstanceState) {\r
        super.onCreate(savedInstanceState);\r
\r
        binding = ActivityMainBinding.inflate(getLayoutInflater());\r
        setContentView(binding.getRoot());\r
\r
        binding.saveTopic.setOnClickListener(new View.OnClickListener() {\r
            @Override\r
            public void onClick(View view) {\r
                String topic = binding.topicInput.getText().toString().trim();\r
                if (!topic.isEmpty()) {\r
                    binding.screenTitle.setText(topic);\r
                }\r
            }\r
        });\r
    }\r
}\r
\`\`\`\r
\r
## Events, forms, and validation\r
\r
[Source chapter](./06-events-forms-and-validation.md)\r
\r
### Example 1: Events connect an action to behavior\r
\r
\`\`\`java\r
binding.saveButton.setOnClickListener(view -> saveEntry());\r
\`\`\`\r
\r
### Example 2: Events connect an action to behavior\r
\r
\`\`\`java\r
binding.saveButton.setOnClickListener(new View.OnClickListener() {\r
    @Override\r
    public void onClick(View view) {\r
        saveEntry();\r
    }\r
});\r
\`\`\`\r
\r
### Example 3: Tell the keyboard what the field accepts\r
\r
\`\`\`xml\r
<EditText\r
    android:id="@+id/topic_input"\r
    android:layout_width="match_parent"\r
    android:layout_height="wrap_content"\r
    android:hint="@string/topic_hint"\r
    android:inputType="textCapSentences"\r
    android:imeOptions="actionNext" />\r
\r
<EditText\r
    android:id="@+id/minutes_input"\r
    android:layout_width="match_parent"\r
    android:layout_height="wrap_content"\r
    android:hint="@string/minutes_hint"\r
    android:inputType="number"\r
    android:imeOptions="actionDone" />\r
\`\`\`\r
\r
### Example 4: A small study entry form\r
\r
\`\`\`xml\r
<?xml version="1.0" encoding="utf-8"?>\r
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"\r
    android:layout_width="match_parent"\r
    android:layout_height="match_parent"\r
    android:orientation="vertical"\r
    android:padding="24dp">\r
\r
    <TextView\r
        android:id="@+id/screen_title"\r
        android:layout_width="match_parent"\r
        android:layout_height="wrap_content"\r
        android:text="@string/study_entry_title"\r
        android:textSize="22sp"\r
        android:textStyle="bold" />\r
\r
    <TextView\r
        android:id="@+id/topic_label"\r
        android:layout_width="match_parent"\r
        android:layout_height="wrap_content"\r
        android:layout_marginTop="20dp"\r
        android:labelFor="@id/topic_input"\r
        android:text="@string/topic_label" />\r
\r
    <EditText\r
        android:id="@+id/topic_input"\r
        android:layout_width="match_parent"\r
        android:layout_height="wrap_content"\r
        android:hint="@string/topic_hint"\r
        android:inputType="textCapSentences"\r
        android:imeOptions="actionNext" />\r
\r
    <TextView\r
        android:id="@+id/minutes_label"\r
        android:layout_width="match_parent"\r
        android:layout_height="wrap_content"\r
        android:layout_marginTop="12dp"\r
        android:labelFor="@id/minutes_input"\r
        android:text="@string/minutes_label" />\r
\r
    <EditText\r
        android:id="@+id/minutes_input"\r
        android:layout_width="match_parent"\r
        android:layout_height="wrap_content"\r
        android:hint="@string/minutes_hint"\r
        android:inputType="number"\r
        android:imeOptions="actionDone" />\r
\r
    <Button\r
        android:id="@+id/save_button"\r
        android:layout_width="wrap_content"\r
        android:layout_height="wrap_content"\r
        android:layout_marginTop="16dp"\r
        android:text="@string/save_entry" />\r
\r
    <TextView\r
        android:id="@+id/save_status"\r
        android:layout_width="match_parent"\r
        android:layout_height="wrap_content"\r
        android:layout_marginTop="12dp"\r
        android:accessibilityLiveRegion="polite" />\r
\r
</LinearLayout>\r
\`\`\`\r
\r
### Example 5: A small study entry form\r
\r
\`\`\`xml\r
<resources>\r
    <string name="study_entry_title">Record a study session</string>\r
    <string name="topic_label">Topic</string>\r
    <string name="topic_hint">For example, activity lifecycle</string>\r
    <string name="minutes_label">Minutes studied</string>\r
    <string name="minutes_hint">Enter a number from 1 to 600</string>\r
    <string name="save_entry">Save entry</string>\r
    <string name="topic_required">Enter a topic.</string>\r
    <string name="minutes_required">Enter the number of minutes.</string>\r
    <string name="minutes_invalid">Enter a whole number from 1 to 600.</string>\r
    <string name="entry_saved">Saved %1$s for %2$d minutes.</string>\r
</resources>\r
\`\`\`\r
\r
### Example 6: Read and validate the values in Java\r
\r
\`\`\`java\r
package com.example.studyapp;\r
\r
import android.app.Activity;\r
import android.os.Bundle;\r
import android.text.TextUtils;\r
import android.view.View;\r
\r
import com.example.studyapp.databinding.ActivityMainBinding;\r
\r
public class MainActivity extends Activity {\r
    private ActivityMainBinding binding;\r
\r
    @Override\r
    protected void onCreate(Bundle savedInstanceState) {\r
        super.onCreate(savedInstanceState);\r
\r
        binding = ActivityMainBinding.inflate(getLayoutInflater());\r
        setContentView(binding.getRoot());\r
\r
        binding.saveButton.setOnClickListener(view -> saveEntry());\r
    }\r
\r
    private void saveEntry() {\r
        String topic = binding.topicInput.getText().toString().trim();\r
        String minutesText = binding.minutesInput.getText().toString().trim();\r
\r
        binding.topicInput.setError(null);\r
        binding.minutesInput.setError(null);\r
        binding.saveStatus.setText("");\r
\r
        if (TextUtils.isEmpty(topic)) {\r
            binding.topicInput.setError(getString(R.string.topic_required));\r
            binding.topicInput.requestFocus();\r
            return;\r
        }\r
\r
        if (TextUtils.isEmpty(minutesText)) {\r
            binding.minutesInput.setError(getString(R.string.minutes_required));\r
            binding.minutesInput.requestFocus();\r
            return;\r
        }\r
\r
        final int minutes;\r
        try {\r
            minutes = Integer.parseInt(minutesText);\r
        } catch (NumberFormatException exception) {\r
            binding.minutesInput.setError(getString(R.string.minutes_invalid));\r
            binding.minutesInput.requestFocus();\r
            return;\r
        }\r
\r
        if (minutes < 1 || minutes > 600) {\r
            binding.minutesInput.setError(getString(R.string.minutes_invalid));\r
            binding.minutesInput.requestFocus();\r
            return;\r
        }\r
\r
        binding.saveStatus.setText(\r
                getString(R.string.entry_saved, topic, minutes)\r
        );\r
    }\r
}\r
\`\`\`\r
\r
### Example 7: Decide when validation should run\r
\r
\`\`\`java\r
binding.topicInput.addTextChangedListener(new android.text.TextWatcher() {\r
    @Override\r
    public void beforeTextChanged(CharSequence text, int start, int count, int after) {\r
        // No work needed before the text changes.\r
    }\r
\r
    @Override\r
    public void onTextChanged(CharSequence text, int start, int before, int count) {\r
        binding.saveButton.setEnabled(text.toString().trim().length() > 0);\r
    }\r
\r
    @Override\r
    public void afterTextChanged(android.text.Editable editable) {\r
        // Keep this empty when the check belongs in onTextChanged.\r
    }\r
});\r
\`\`\`\r
\r
## Intents, fragments, and navigation\r
\r
[Source chapter](./07-navigation-intents-and-fragments.md)\r
\r
### Example 1: An Intent describes an action\r
\r
\`\`\`java\r
import android.content.Intent;\r
\r
Intent intent = new Intent(this, NoteDetailActivity.class);\r
intent.putExtra(NoteDetailActivity.EXTRA_NOTE_ID, noteId);\r
startActivity(intent);\r
\`\`\`\r
\r
### Example 2: An Intent describes an action\r
\r
\`\`\`java\r
import android.os.Bundle;\r
\r
import androidx.fragment.app.FragmentActivity;\r
\r
public class NoteDetailActivity extends FragmentActivity {\r
    public static final String EXTRA_NOTE_ID = "com.example.studyapp.NOTE_ID";\r
\r
    @Override\r
    protected void onCreate(Bundle savedInstanceState) {\r
        super.onCreate(savedInstanceState);\r
        setContentView(R.layout.activity_note_detail);\r
\r
        long noteId = getIntent().getLongExtra(EXTRA_NOTE_ID, -1L);\r
        if (noteId == -1L) {\r
            finish();\r
            return;\r
        }\r
\r
        // Load the note identified by noteId.\r
    }\r
}\r
\`\`\`\r
\r
### Example 3: An Intent describes an action\r
\r
\`\`\`xml\r
<?xml version="1.0" encoding="utf-8"?>\r
<TextView xmlns:android="http://schemas.android.com/apk/res/android"\r
    android:id="@+id/note_detail_title"\r
    android:layout_width="match_parent"\r
    android:layout_height="match_parent"\r
    android:gravity="center"\r
    android:padding="24dp"\r
    android:text="@string/note_detail_placeholder"\r
    android:textSize="20sp" />\r
\`\`\`\r
\r
### Example 4: An Intent describes an action\r
\r
\`\`\`xml\r
<activity xmlns:android="http://schemas.android.com/apk/res/android"\r
    android:name=".NoteDetailActivity"\r
    android:exported="false" />\r
\`\`\`\r
\r
### Example 5: Implicit intents use another app\r
\r
\`\`\`java\r
import android.content.Intent;\r
\r
Intent shareIntent = new Intent(Intent.ACTION_SEND);\r
shareIntent.setType("text/plain");\r
shareIntent.putExtra(Intent.EXTRA_TEXT, "I am reviewing Android intents.");\r
\r
Intent chooser = Intent.createChooser(shareIntent, getString(R.string.share_note));\r
startActivity(chooser);\r
\`\`\`\r
\r
### Example 6: Get an activity result\r
\r
\`\`\`java\r
import androidx.activity.result.ActivityResultLauncher;\r
import androidx.activity.result.contract.ActivityResultContracts;\r
\r
private final ActivityResultLauncher<String> selectImage =\r
        registerForActivityResult(\r
                new ActivityResultContracts.GetContent(),\r
                uri -> {\r
                    if (uri != null) {\r
                        // Read or display the selected image URI.\r
                    }\r
                }\r
        );\r
\`\`\`\r
\r
### Example 7: Get an activity result\r
\r
\`\`\`java\r
binding.selectImageButton.setOnClickListener(view -> selectImage.launch("image/*"));\r
\`\`\`\r
\r
### Example 8: An Activity hosts a screen, a Fragment is a reusable part\r
\r
\`\`\`java\r
import android.os.Bundle;\r
\r
import androidx.fragment.app.FragmentActivity;\r
\r
public class MainActivity extends FragmentActivity {\r
    @Override\r
    protected void onCreate(Bundle savedInstanceState) {\r
        super.onCreate(savedInstanceState);\r
        setContentView(R.layout.activity_main);\r
\r
        if (savedInstanceState == null) {\r
            getSupportFragmentManager()\r
                    .beginTransaction()\r
                    .setReorderingAllowed(true)\r
                    .replace(R.id.fragment_container, NoteListFragment.class, null)\r
                    .commit();\r
        }\r
    }\r
}\r
\`\`\`\r
\r
### Example 9: An Activity hosts a screen, a Fragment is a reusable part\r
\r
\`\`\`xml\r
<?xml version="1.0" encoding="utf-8"?>\r
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"\r
    android:id="@+id/fragment_container"\r
    android:layout_width="match_parent"\r
    android:layout_height="match_parent" />\r
\`\`\`\r
\r
### Example 10: An Activity hosts a screen, a Fragment is a reusable part\r
\r
\`\`\`xml\r
<?xml version="1.0" encoding="utf-8"?>\r
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"\r
    android:layout_width="match_parent"\r
    android:layout_height="match_parent"\r
    android:gravity="center"\r
    android:orientation="vertical"\r
    android:padding="24dp">\r
\r
    <Button\r
        android:id="@+id/open_detail"\r
        android:layout_width="wrap_content"\r
        android:layout_height="wrap_content"\r
        android:text="@string/open_note" />\r
\r
</LinearLayout>\r
\`\`\`\r
\r
### Example 11: An Activity hosts a screen, a Fragment is a reusable part\r
\r
\`\`\`xml\r
<resources>\r
    <string name="share_note">Share note</string>\r
    <string name="open_note">Open a saved note</string>\r
    <string name="note_detail_placeholder">Selected note details appear here</string>\r
</resources>\r
\`\`\`\r
\r
### Example 12: An Activity hosts a screen, a Fragment is a reusable part\r
\r
\`\`\`java\r
import android.os.Bundle;\r
import android.view.LayoutInflater;\r
import android.view.View;\r
import android.view.ViewGroup;\r
import android.widget.Button;\r
\r
import androidx.annotation.NonNull;\r
import androidx.annotation.Nullable;\r
import androidx.fragment.app.Fragment;\r
\r
public class NoteListFragment extends Fragment {\r
    @Nullable\r
    @Override\r
    public View onCreateView(\r
            @NonNull LayoutInflater inflater,\r
            @Nullable ViewGroup container,\r
            @Nullable Bundle savedInstanceState\r
    ) {\r
        return inflater.inflate(R.layout.fragment_note_list, container, false);\r
    }\r
\r
    @Override\r
    public void onViewCreated(\r
            @NonNull View view,\r
            @Nullable Bundle savedInstanceState\r
    ) {\r
        super.onViewCreated(view, savedInstanceState);\r
        Button openDetail = view.findViewById(R.id.open_detail);\r
        openDetail.setOnClickListener(ignored -> openNoteDetail());\r
    }\r
\r
    private void openNoteDetail() {\r
        Bundle arguments = new Bundle();\r
        arguments.putLong(NoteDetailFragment.ARG_NOTE_ID, 42L);\r
\r
        getParentFragmentManager()\r
                .beginTransaction()\r
                .setReorderingAllowed(true)\r
                .replace(R.id.fragment_container, NoteDetailFragment.class, arguments)\r
                .addToBackStack(null)\r
                .commit();\r
    }\r
}\r
\`\`\`\r
\r
### Example 13: An Activity hosts a screen, a Fragment is a reusable part\r
\r
\`\`\`java\r
import android.os.Bundle;\r
import android.view.View;\r
\r
import androidx.annotation.NonNull;\r
import androidx.annotation.Nullable;\r
import androidx.fragment.app.Fragment;\r
\r
public class NoteDetailFragment extends Fragment {\r
    public static final String ARG_NOTE_ID = "note_id";\r
\r
    public NoteDetailFragment() {\r
        super(R.layout.fragment_note_detail);\r
    }\r
\r
    @Override\r
    public void onViewCreated(\r
            @NonNull View view,\r
            @Nullable Bundle savedInstanceState\r
    ) {\r
        super.onViewCreated(view, savedInstanceState);\r
        long noteId = requireArguments().getLong(ARG_NOTE_ID, -1L);\r
\r
        // Load and display the note identified by noteId.\r
    }\r
}\r
\`\`\`\r
\r
### Example 14: An Activity hosts a screen, a Fragment is a reusable part\r
\r
\`\`\`xml\r
<?xml version="1.0" encoding="utf-8"?>\r
<TextView xmlns:android="http://schemas.android.com/apk/res/android"\r
    android:id="@+id/note_detail_content"\r
    android:layout_width="match_parent"\r
    android:layout_height="match_parent"\r
    android:gravity="center"\r
    android:padding="24dp"\r
    android:text="@string/note_detail_placeholder"\r
    android:textSize="20sp" />\r
\`\`\`\r
\r
### Example 15: Pass information without coupling screens\r
\r
\`\`\`java\r
// In the receiving fragment, register while creating the fragment.\r
getParentFragmentManager().setFragmentResultListener(\r
        "selected_topic",\r
        this,\r
        (requestKey, result) -> {\r
            String topic = result.getString("topic");\r
            // Update this screen with the selected topic.\r
        }\r
);\r
\`\`\`\r
\r
### Example 16: Pass information without coupling screens\r
\r
\`\`\`java\r
// In the fragment that returns a selection.\r
Bundle result = new Bundle();\r
result.putString("topic", selectedTopic);\r
getParentFragmentManager().setFragmentResult("selected_topic", result);\r
\`\`\`\r
\r
## Lists with RecyclerView and adapters\r
\r
[Source chapter](./08-recyclerview-and-adapters.md)\r
\r
### Example 1: Model the rows as data\r
\r
\`\`\`java\r
public final class StudyNote {\r
    private final long id;\r
    private final String title;\r
    private final String summary;\r
\r
    public StudyNote(long id, String title, String summary) {\r
        this.id = id;\r
        this.title = title;\r
        this.summary = summary;\r
    }\r
\r
    public long getId() {\r
        return id;\r
    }\r
\r
    public String getTitle() {\r
        return title;\r
    }\r
\r
    public String getSummary() {\r
        return summary;\r
    }\r
}\r
\`\`\`\r
\r
### Example 2: Define the screen and one row\r
\r
\`\`\`xml\r
<?xml version="1.0" encoding="utf-8"?>\r
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"\r
    android:layout_width="match_parent"\r
    android:layout_height="match_parent">\r
\r
    <androidx.recyclerview.widget.RecyclerView\r
        android:id="@+id/notes_list"\r
        android:layout_width="match_parent"\r
        android:layout_height="match_parent"\r
        android:clipToPadding="false"\r
        android:padding="16dp" />\r
\r
    <TextView\r
        android:id="@+id/empty_message"\r
        android:layout_width="match_parent"\r
        android:layout_height="wrap_content"\r
        android:layout_gravity="center"\r
        android:gravity="center"\r
        android:padding="24dp"\r
        android:text="@string/no_study_notes"\r
        android:visibility="gone" />\r
\r
</FrameLayout>\r
\`\`\`\r
\r
### Example 3: Define the screen and one row\r
\r
\`\`\`xml\r
<?xml version="1.0" encoding="utf-8"?>\r
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"\r
    android:layout_width="match_parent"\r
    android:layout_height="wrap_content"\r
    android:orientation="vertical"\r
    android:padding="16dp">\r
\r
    <TextView\r
        android:id="@+id/note_title"\r
        android:layout_width="match_parent"\r
        android:layout_height="wrap_content"\r
        android:textSize="18sp"\r
        android:textStyle="bold" />\r
\r
    <TextView\r
        android:id="@+id/note_summary"\r
        android:layout_width="match_parent"\r
        android:layout_height="wrap_content"\r
        android:layout_marginTop="4dp" />\r
\r
</LinearLayout>\r
\`\`\`\r
\r
### Example 4: Define the screen and one row\r
\r
\`\`\`xml\r
<resources>\r
    <string name="no_study_notes">No study notes yet.</string>\r
</resources>\r
\`\`\`\r
\r
### Example 5: Bind each StudyNote in an adapter\r
\r
\`\`\`java\r
import android.view.LayoutInflater;\r
import android.view.View;\r
import android.view.ViewGroup;\r
import android.widget.TextView;\r
\r
import androidx.annotation.NonNull;\r
import androidx.recyclerview.widget.DiffUtil;\r
import androidx.recyclerview.widget.ListAdapter;\r
import androidx.recyclerview.widget.RecyclerView;\r
\r
public class StudyNoteAdapter\r
        extends ListAdapter<StudyNote, StudyNoteAdapter.NoteViewHolder> {\r
\r
    public interface OnNoteClickListener {\r
        void onNoteClick(StudyNote note);\r
    }\r
\r
    private static final DiffUtil.ItemCallback<StudyNote> DIFF_CALLBACK =\r
            new DiffUtil.ItemCallback<StudyNote>() {\r
                @Override\r
                public boolean areItemsTheSame(\r
                        @NonNull StudyNote oldItem,\r
                        @NonNull StudyNote newItem\r
                ) {\r
                    return oldItem.getId() == newItem.getId();\r
                }\r
\r
                @Override\r
                public boolean areContentsTheSame(\r
                        @NonNull StudyNote oldItem,\r
                        @NonNull StudyNote newItem\r
                ) {\r
                    return oldItem.getTitle().equals(newItem.getTitle())\r
                            && oldItem.getSummary().equals(newItem.getSummary());\r
                }\r
            };\r
\r
    private final OnNoteClickListener clickListener;\r
\r
    public StudyNoteAdapter(OnNoteClickListener clickListener) {\r
        super(DIFF_CALLBACK);\r
        this.clickListener = clickListener;\r
    }\r
\r
    @NonNull\r
    @Override\r
    public NoteViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {\r
        View row = LayoutInflater.from(parent.getContext())\r
                .inflate(R.layout.item_study_note, parent, false);\r
        return new NoteViewHolder(row);\r
    }\r
\r
    @Override\r
    public void onBindViewHolder(@NonNull NoteViewHolder holder, int position) {\r
        StudyNote note = getItem(position);\r
        holder.title.setText(note.getTitle());\r
        holder.summary.setText(note.getSummary());\r
\r
        holder.itemView.setOnClickListener(view -> {\r
            int currentPosition = holder.getBindingAdapterPosition();\r
            if (currentPosition != RecyclerView.NO_POSITION) {\r
                clickListener.onNoteClick(getItem(currentPosition));\r
            }\r
        });\r
    }\r
\r
    static class NoteViewHolder extends RecyclerView.ViewHolder {\r
        private final TextView title;\r
        private final TextView summary;\r
\r
        NoteViewHolder(@NonNull View itemView) {\r
            super(itemView);\r
            title = itemView.findViewById(R.id.note_title);\r
            summary = itemView.findViewById(R.id.note_summary);\r
        }\r
    }\r
}\r
\`\`\`\r
\r
### Example 6: Attach the adapter and provide sample data\r
\r
\`\`\`java\r
import android.app.Activity;\r
import android.content.Intent;\r
import android.os.Bundle;\r
import android.view.View;\r
import android.widget.TextView;\r
\r
import androidx.recyclerview.widget.LinearLayoutManager;\r
import androidx.recyclerview.widget.RecyclerView;\r
\r
import java.util.ArrayList;\r
import java.util.List;\r
\r
public class NotesActivity extends Activity {\r
    private StudyNoteAdapter adapter;\r
    private TextView emptyMessage;\r
\r
    @Override\r
    protected void onCreate(Bundle savedInstanceState) {\r
        super.onCreate(savedInstanceState);\r
        setContentView(R.layout.activity_notes);\r
\r
        RecyclerView notesList = findViewById(R.id.notes_list);\r
        emptyMessage = findViewById(R.id.empty_message);\r
\r
        adapter = new StudyNoteAdapter(note -> {\r
            Intent intent = new Intent(this, NoteDetailActivity.class);\r
            intent.putExtra(NoteDetailActivity.EXTRA_NOTE_ID, note.getId());\r
            startActivity(intent);\r
        });\r
\r
        notesList.setLayoutManager(new LinearLayoutManager(this));\r
        notesList.setAdapter(adapter);\r
        showNotes(createSampleNotes());\r
    }\r
\r
    private List<StudyNote> createSampleNotes() {\r
        List<StudyNote> notes = new ArrayList<>();\r
        notes.add(new StudyNote(1L, "Activity lifecycle", "Callbacks and saved state"));\r
        notes.add(new StudyNote(2L, "RecyclerView", "Adapters and view holders"));\r
        notes.add(new StudyNote(3L, "Intents", "Move between app screens"));\r
        return notes;\r
    }\r
\r
    private void showNotes(List<StudyNote> notes) {\r
        adapter.submitList(notes);\r
        emptyMessage.setVisibility(notes.isEmpty() ? View.VISIBLE : View.GONE);\r
    }\r
}\r
\`\`\`\r
\r
### Example 7: Attach the adapter and provide sample data\r
\r
\`\`\`java\r
List<StudyNote> updatedNotes = new ArrayList<>(adapter.getCurrentList());\r
updatedNotes.add(new StudyNote(4L, "Activities", "Lifecycle and state"));\r
adapter.submitList(updatedNotes);\r
\`\`\`\r
\r
### Example 8: Choose a layout manager\r
\r
\`\`\`java\r
notesList.setLayoutManager(new LinearLayoutManager(this));\r
\`\`\`\r
\r
## App architecture with ViewModel and LiveData\r
\r
[Source chapter](./09-architecture-viewmodel-livedata.md)\r
\r
### Example 1: Let state flow to the screen\r
\r
\`\`\`text\r
User action -> Activity method -> ViewModel state changes\r
                                      |\r
                                      v\r
Activity observes LiveData -> renders the current state\r
\`\`\`\r
\r
### Example 2: Create a ViewModel that exposes read-only state\r
\r
\`\`\`java\r
import androidx.lifecycle.LiveData;\r
import androidx.lifecycle.MutableLiveData;\r
import androidx.lifecycle.ViewModel;\r
\r
import java.util.ArrayList;\r
import java.util.Collections;\r
import java.util.List;\r
\r
public class NotesViewModel extends ViewModel {\r
    private final MutableLiveData<List<StudyNote>> notes =\r
            new MutableLiveData<>(Collections.emptyList());\r
    private long nextId = 1L;\r
\r
    public LiveData<List<StudyNote>> getNotes() {\r
        return notes;\r
    }\r
\r
    public void addNote(String title) {\r
        List<StudyNote> updated = new ArrayList<>(notes.getValue());\r
        updated.add(new StudyNote(\r
                nextId++,\r
                title,\r
                "Added during this session"\r
        ));\r
        notes.setValue(Collections.unmodifiableList(updated));\r
    }\r
}\r
\`\`\`\r
\r
### Example 3: Get the ViewModel and observe its state\r
\r
\`\`\`xml\r
<?xml version="1.0" encoding="utf-8"?>\r
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"\r
    android:layout_width="match_parent"\r
    android:layout_height="match_parent"\r
    android:orientation="vertical"\r
    android:padding="16dp">\r
\r
    <EditText\r
        android:id="@+id/title_input"\r
        android:layout_width="match_parent"\r
        android:layout_height="wrap_content"\r
        android:hint="@string/note_title_hint"\r
        android:inputType="textCapSentences" />\r
\r
    <Button\r
        android:id="@+id/add_note"\r
        android:layout_width="wrap_content"\r
        android:layout_height="wrap_content"\r
        android:text="@string/add_note" />\r
\r
    <FrameLayout\r
        android:layout_width="match_parent"\r
        android:layout_height="0dp"\r
        android:layout_weight="1">\r
\r
        <androidx.recyclerview.widget.RecyclerView\r
            android:id="@+id/notes_list"\r
            android:layout_width="match_parent"\r
            android:layout_height="match_parent" />\r
\r
        <TextView\r
            android:id="@+id/empty_message"\r
            android:layout_width="match_parent"\r
            android:layout_height="wrap_content"\r
            android:layout_gravity="center"\r
            android:gravity="center"\r
            android:text="@string/no_study_notes"\r
            android:visibility="gone" />\r
\r
    </FrameLayout>\r
\r
</LinearLayout>\r
\`\`\`\r
\r
### Example 4: Get the ViewModel and observe its state\r
\r
\`\`\`xml\r
<resources>\r
    <string name="no_study_notes">No study notes yet.</string>\r
    <string name="note_title_hint">Enter a study topic</string>\r
    <string name="add_note">Add note</string>\r
</resources>\r
\`\`\`\r
\r
### Example 5: Get the ViewModel and observe its state\r
\r
\`\`\`java\r
import android.os.Bundle;\r
import android.view.View;\r
import android.widget.Button;\r
import android.widget.EditText;\r
import android.widget.TextView;\r
\r
import androidx.lifecycle.ViewModelProvider;\r
import androidx.fragment.app.FragmentActivity;\r
import androidx.recyclerview.widget.LinearLayoutManager;\r
import androidx.recyclerview.widget.RecyclerView;\r
\r
public class NotesActivity extends FragmentActivity {\r
    private NotesViewModel viewModel;\r
    private StudyNoteAdapter adapter;\r
    private EditText titleInput;\r
    private TextView emptyMessage;\r
\r
    @Override\r
    protected void onCreate(Bundle savedInstanceState) {\r
        super.onCreate(savedInstanceState);\r
        setContentView(R.layout.activity_notes);\r
\r
        RecyclerView notesList = findViewById(R.id.notes_list);\r
        titleInput = findViewById(R.id.title_input);\r
        emptyMessage = findViewById(R.id.empty_message);\r
        Button addButton = findViewById(R.id.add_note);\r
\r
        adapter = new StudyNoteAdapter(note -> {\r
            // Open the selected note using its ID.\r
        });\r
        notesList.setLayoutManager(new LinearLayoutManager(this));\r
        notesList.setAdapter(adapter);\r
\r
        viewModel = new ViewModelProvider(this).get(NotesViewModel.class);\r
        viewModel.getNotes().observe(this, notes -> {\r
            adapter.submitList(notes);\r
            emptyMessage.setVisibility(notes.isEmpty() ? View.VISIBLE : View.GONE);\r
        });\r
\r
        addButton.setOnClickListener(view -> {\r
            String title = titleInput.getText().toString().trim();\r
            if (!title.isEmpty()) {\r
                viewModel.addNote(title);\r
                titleInput.setText("");\r
            }\r
        });\r
    }\r
}\r
\`\`\`\r
\r
### Example 6: Observe from a Fragment's view lifecycle\r
\r
\`\`\`java\r
viewModel.getNotes().observe(getViewLifecycleOwner(), notes -> {\r
    adapter.submitList(notes);\r
    emptyMessage.setVisibility(notes.isEmpty() ? View.VISIBLE : View.GONE);\r
});\r
\`\`\`\r
\r
### Example 7: Keep work in the appropriate layer\r
\r
\`\`\`text\r
Activity or Fragment <-> ViewModel <-> Repository <-> Room or network\r
       UI events          screen state          app data\r
\`\`\`\r
\r
## Local data with Room and preferences\r
\r
[Source chapter](./10-local-data-room-and-preferences.md)\r
\r
### Example 1: Keep the Java version in mind\r
\r
\`\`\`groovy\r
dependencies {\r
    def roomVersion = "2.8.4"\r
\r
    implementation "androidx.room:room-runtime:$roomVersion"\r
    annotationProcessor "androidx.room:room-compiler:$roomVersion"\r
    implementation "androidx.room:room-livedata:$roomVersion"\r
}\r
\`\`\`\r
\r
### Example 2: Define a study note entity\r
\r
\`\`\`java\r
import androidx.annotation.NonNull;\r
import androidx.room.Entity;\r
import androidx.room.PrimaryKey;\r
\r
@Entity(tableName = "study_notes")\r
public class StudyNoteEntity {\r
    @PrimaryKey(autoGenerate = true)\r
    public long id;\r
\r
    @NonNull\r
    public String title;\r
\r
    public String body;\r
\r
    public long createdAt;\r
}\r
\`\`\`\r
\r
### Example 3: Put database operations in a DAO\r
\r
\`\`\`java\r
import androidx.lifecycle.LiveData;\r
import androidx.room.Dao;\r
import androidx.room.Insert;\r
import androidx.room.Query;\r
\r
import java.util.List;\r
\r
@Dao\r
public interface StudyNoteDao {\r
    @Query("SELECT * FROM study_notes ORDER BY createdAt DESC")\r
    LiveData<List<StudyNoteEntity>> observeAll();\r
\r
    @Insert\r
    void insert(StudyNoteEntity note);\r
\r
    @Query("DELETE FROM study_notes WHERE id = :noteId")\r
    void deleteById(long noteId);\r
}\r
\`\`\`\r
\r
### Example 4: Create the database once\r
\r
\`\`\`java\r
import androidx.room.Database;\r
import androidx.room.RoomDatabase;\r
\r
@Database(entities = {StudyNoteEntity.class}, version = 1, exportSchema = true)\r
public abstract class StudyDatabase extends RoomDatabase {\r
    public abstract StudyNoteDao studyNoteDao();\r
}\r
\`\`\`\r
\r
### Example 5: Create the database once\r
\r
\`\`\`java\r
import android.content.Context;\r
\r
import androidx.room.Room;\r
\r
public final class StudyDatabaseProvider {\r
    private static volatile StudyDatabase instance;\r
\r
    private StudyDatabaseProvider() {\r
    }\r
\r
    public static StudyDatabase get(Context context) {\r
        if (instance == null) {\r
            synchronized (StudyDatabaseProvider.class) {\r
                if (instance == null) {\r
                    instance = Room.databaseBuilder(\r
                            context.getApplicationContext(),\r
                            StudyDatabase.class,\r
                            "study-notes.db"\r
                    ).build();\r
                }\r
            }\r
        }\r
        return instance;\r
    }\r
}\r
\`\`\`\r
\r
### Example 6: Keep the DAO behind a repository\r
\r
\`\`\`java\r
import android.content.Context;\r
\r
import androidx.lifecycle.LiveData;\r
\r
import java.util.List;\r
import java.util.concurrent.ExecutorService;\r
import java.util.concurrent.Executors;\r
\r
public class StudyNoteRepository {\r
    private final StudyNoteDao noteDao;\r
    private static final ExecutorService DATABASE_EXECUTOR =\r
            Executors.newSingleThreadExecutor();\r
\r
    public StudyNoteRepository(Context context) {\r
        noteDao = StudyDatabaseProvider.get(context).studyNoteDao();\r
    }\r
\r
    public LiveData<List<StudyNoteEntity>> observeNotes() {\r
        return noteDao.observeAll();\r
    }\r
\r
    public void save(StudyNoteEntity note) {\r
        DATABASE_EXECUTOR.execute(() -> noteDao.insert(note));\r
    }\r
\r
    public void delete(long noteId) {\r
        DATABASE_EXECUTOR.execute(() -> noteDao.deleteById(noteId));\r
    }\r
}\r
\`\`\`\r
\r
### Example 7: Keep the DAO behind a repository\r
\r
\`\`\`java\r
viewModel.getNotes().observe(this, notes -> {\r
    adapter.submitList(notes);\r
    emptyMessage.setVisibility(notes.isEmpty() ? View.VISIBLE : View.GONE);\r
});\r
\`\`\`\r
\r
### Example 8: Update schemas with migrations\r
\r
\`\`\`java\r
import androidx.room.migration.Migration;\r
import androidx.sqlite.db.SupportSQLiteDatabase;\r
\r
static final Migration MIGRATION_1_2 = new Migration(1, 2) {\r
    @Override\r
    public void migrate(SupportSQLiteDatabase database) {\r
        database.execSQL(\r
                "ALTER TABLE study_notes "\r
                        + "ADD COLUMN pinned INTEGER NOT NULL DEFAULT 0"\r
        );\r
    }\r
};\r
\`\`\`\r
\r
### Example 9: Update schemas with migrations\r
\r
\`\`\`java\r
Room.databaseBuilder(context, StudyDatabase.class, "study-notes.db")\r
        .addMigrations(MIGRATION_1_2)\r
        .build();\r
\`\`\`\r
\r
### Example 10: Save a small setting with SharedPreferences\r
\r
\`\`\`java\r
import android.content.Context;\r
import android.content.SharedPreferences;\r
\r
public final class StudySettings {\r
    private static final String FILE_NAME = "com.example.studyapp.SETTINGS";\r
    private static final String KEY_COMPACT_LIST = "compact_list";\r
\r
    private StudySettings() {\r
    }\r
\r
    public static boolean isCompactList(Context context) {\r
        SharedPreferences preferences = context.getSharedPreferences(\r
                FILE_NAME,\r
                Context.MODE_PRIVATE\r
        );\r
        return preferences.getBoolean(KEY_COMPACT_LIST, false);\r
    }\r
\r
    public static void setCompactList(Context context, boolean enabled) {\r
        SharedPreferences preferences = context.getSharedPreferences(\r
                FILE_NAME,\r
                Context.MODE_PRIVATE\r
        );\r
        preferences.edit()\r
                .putBoolean(KEY_COMPACT_LIST, enabled)\r
                .apply();\r
    }\r
}\r
\`\`\`\r
\r
## Networking, REST APIs, and JSON\r
\r
[Source chapter](./11-networking-and-rest-apis.md)\r
\r
### Example 1: Allow network access in the manifest\r
\r
\`\`\`xml\r
<uses-permission xmlns:android="http://schemas.android.com/apk/res/android"\r
    android:name="android.permission.INTERNET" />\r
\`\`\`\r
\r
### Example 2: Read a JSON response with HttpURLConnection\r
\r
\`\`\`java\r
import java.io.BufferedReader;\r
import java.io.IOException;\r
import java.io.InputStream;\r
import java.io.InputStreamReader;\r
import java.net.HttpURLConnection;\r
import java.net.URL;\r
import java.nio.charset.StandardCharsets;\r
\r
public class PostApi {\r
    public String getPost(int postId) throws IOException {\r
        HttpURLConnection connection = null;\r
\r
        try {\r
            URL url = new URL("https://api.example.com/posts/" + postId);\r
            connection = (HttpURLConnection) url.openConnection();\r
            connection.setRequestMethod("GET");\r
            connection.setConnectTimeout(10_000);\r
            connection.setReadTimeout(10_000);\r
            connection.setRequestProperty("Accept", "application/json");\r
\r
            int statusCode = connection.getResponseCode();\r
            InputStream responseStream = statusCode >= 200 && statusCode < 300\r
                    ? connection.getInputStream()\r
                    : connection.getErrorStream();\r
\r
            StringBuilder responseBody = new StringBuilder();\r
            if (responseStream != null) {\r
                try (BufferedReader reader = new BufferedReader(\r
                        new InputStreamReader(responseStream, StandardCharsets.UTF_8)\r
                )) {\r
                    String line;\r
                    while ((line = reader.readLine()) != null) {\r
                        responseBody.append(line);\r
                    }\r
                }\r
            }\r
\r
            if (statusCode < 200 || statusCode >= 300) {\r
                throw new IOException("The request failed with HTTP " + statusCode);\r
            }\r
\r
            return responseBody.toString();\r
        } finally {\r
            if (connection != null) {\r
                connection.disconnect();\r
            }\r
        }\r
    }\r
}\r
\`\`\`\r
\r
### Example 3: Keep the request off the main thread\r
\r
\`\`\`java\r
import android.os.Handler;\r
import android.os.Looper;\r
\r
import org.json.JSONException;\r
import org.json.JSONObject;\r
\r
import java.io.IOException;\r
import java.util.concurrent.ExecutorService;\r
import java.util.concurrent.Executors;\r
\r
private final ExecutorService networkExecutor = Executors.newSingleThreadExecutor();\r
private final Handler mainHandler = new Handler(Looper.getMainLooper());\r
private final PostApi postApi = new PostApi();\r
\r
private void loadPost() {\r
    statusView.setText("Loading...");\r
\r
    networkExecutor.execute(() -> {\r
        try {\r
            String json = postApi.getPost(1);\r
            JSONObject post = new JSONObject(json);\r
            String title = post.optString("title", "Untitled post");\r
            mainHandler.post(() -> statusView.setText(title));\r
        } catch (IOException | JSONException exception) {\r
            mainHandler.post(() -> statusView.setText("Could not load the post."));\r
        }\r
    });\r
}\r
\`\`\`\r
\r
### Example 4: Understand the JSON shape\r
\r
\`\`\`json\r
{\r
  "id": 1,\r
  "title": "Activity lifecycle",\r
  "body": "Callbacks and saved state"\r
}\r
\`\`\`\r
\r
### Example 5: Understand the JSON shape\r
\r
\`\`\`java\r
JSONArray posts = responseObject.getJSONArray("items");\r
List<String> titles = new ArrayList<>();\r
\r
for (int index = 0; index < posts.length(); index++) {\r
    JSONObject post = posts.getJSONObject(index);\r
    titles.add(post.optString("title", "Untitled post"));\r
}\r
\`\`\`\r
\r
### Example 6: Send JSON in a request\r
\r
\`\`\`json\r
{\r
  "title": "Networking notes",\r
  "body": "Requests run outside the UI thread."\r
}\r
\`\`\`\r
\r
## Background work and notifications\r
\r
[Source chapter](./12-background-work-and-notifications.md)\r
\r
### Example 1: Define work with WorkManager\r
\r
\`\`\`java\r
import android.content.Context;\r
\r
import androidx.annotation.NonNull;\r
import androidx.work.Worker;\r
import androidx.work.WorkerParameters;\r
\r
import java.io.IOException;\r
\r
public class UploadNotesWorker extends Worker {\r
    public UploadNotesWorker(\r
            @NonNull Context context,\r
            @NonNull WorkerParameters workerParameters\r
    ) {\r
        super(context, workerParameters);\r
    }\r
\r
    @NonNull\r
    @Override\r
    public Result doWork() {\r
        try {\r
            // Read pending notes from local storage and upload them.\r
            uploadPendingNotes();\r
            return Result.success();\r
        } catch (IOException exception) {\r
            return Result.retry();\r
        }\r
    }\r
\r
    private void uploadPendingNotes() throws IOException {\r
        // Call the repository or API client from the data layer.\r
    }\r
}\r
\`\`\`\r
\r
### Example 2: Define work with WorkManager\r
\r
\`\`\`java\r
import android.content.Context;\r
\r
import androidx.work.Constraints;\r
import androidx.work.ExistingWorkPolicy;\r
import androidx.work.NetworkType;\r
import androidx.work.OneTimeWorkRequest;\r
import androidx.work.WorkManager;\r
\r
Constraints constraints = new Constraints.Builder()\r
        .setRequiredNetworkType(NetworkType.CONNECTED)\r
        .build();\r
\r
OneTimeWorkRequest uploadRequest =\r
        new OneTimeWorkRequest.Builder(UploadNotesWorker.class)\r
                .setConstraints(constraints)\r
                .build();\r
\r
WorkManager.getInstance(context).enqueueUniqueWork(\r
        "upload-study-notes",\r
        ExistingWorkPolicy.KEEP,\r
        uploadRequest\r
);\r
\`\`\`\r
\r
### Example 3: Define work with WorkManager\r
\r
\`\`\`java\r
import androidx.work.ExistingPeriodicWorkPolicy;\r
import androidx.work.PeriodicWorkRequest;\r
import androidx.work.WorkManager;\r
\r
import java.util.concurrent.TimeUnit;\r
\r
PeriodicWorkRequest syncRequest = new PeriodicWorkRequest.Builder(\r
        UploadNotesWorker.class,\r
        6,\r
        TimeUnit.HOURS\r
).build();\r
\r
WorkManager.getInstance(context).enqueueUniquePeriodicWork(\r
        "periodic-study-note-sync",\r
        ExistingPeriodicWorkPolicy.KEEP,\r
        syncRequest\r
);\r
\`\`\`\r
\r
### Example 4: Create a notification channel\r
\r
\`\`\`java\r
import android.app.NotificationChannel;\r
import android.app.NotificationManager;\r
import android.content.Context;\r
import android.os.Build;\r
\r
public final class StudyNotifications {\r
    public static final String CHANNEL_ID = "study_reminders";\r
\r
    private StudyNotifications() {\r
    }\r
\r
    public static void createChannel(Context context) {\r
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {\r
            return;\r
        }\r
\r
        CharSequence name = "Study reminders";\r
        String description = "Reminders about saved study sessions";\r
        NotificationChannel channel = new NotificationChannel(\r
                CHANNEL_ID,\r
                name,\r
                NotificationManager.IMPORTANCE_DEFAULT\r
        );\r
        channel.setDescription(description);\r
\r
        NotificationManager manager = (NotificationManager)\r
                context.getSystemService(Context.NOTIFICATION_SERVICE);\r
        manager.createNotificationChannel(channel);\r
    }\r
}\r
\`\`\`\r
\r
### Example 5: Request notification permission when needed\r
\r
\`\`\`xml\r
<uses-permission xmlns:android="http://schemas.android.com/apk/res/android"\r
    android:name="android.permission.POST_NOTIFICATIONS" />\r
\`\`\`\r
\r
### Example 6: Request notification permission when needed\r
\r
\`\`\`java\r
import android.Manifest;\r
import android.content.pm.PackageManager;\r
import android.os.Build;\r
\r
import androidx.activity.result.ActivityResultLauncher;\r
import androidx.activity.result.contract.ActivityResultContracts;\r
import androidx.core.content.ContextCompat;\r
\r
private final ActivityResultLauncher<String> notificationPermission =\r
        registerForActivityResult(\r
                new ActivityResultContracts.RequestPermission(),\r
                granted -> {\r
                    if (granted) {\r
                        StudyNotifications.showStudyReminder(this);\r
                    } else {\r
                        // Keep the feature usable without notifications.\r
                    }\r
                }\r
        );\r
\r
private void enableStudyReminders() {\r
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU) {\r
        StudyNotifications.showStudyReminder(this);\r
        return;\r
    }\r
\r
    if (ContextCompat.checkSelfPermission(\r
            this,\r
            Manifest.permission.POST_NOTIFICATIONS\r
    ) == PackageManager.PERMISSION_GRANTED) {\r
        StudyNotifications.showStudyReminder(this);\r
    } else {\r
        notificationPermission.launch(Manifest.permission.POST_NOTIFICATIONS);\r
    }\r
}\r
\`\`\`\r
\r
### Example 7: Build and post a notification\r
\r
\`\`\`java\r
import android.app.PendingIntent;\r
import android.content.Intent;\r
\r
import androidx.core.app.NotificationCompat;\r
import androidx.core.app.NotificationManagerCompat;\r
\`\`\`\r
\r
### Example 8: Build and post a notification\r
\r
\`\`\`java\r
public static void showStudyReminder(Context context) {\r
    Intent openApp = new Intent(context, MainActivity.class);\r
    PendingIntent contentIntent = PendingIntent.getActivity(\r
            context,\r
            0,\r
            openApp,\r
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE\r
    );\r
\r
    NotificationCompat.Builder notification =\r
            new NotificationCompat.Builder(context, CHANNEL_ID)\r
                    .setSmallIcon(android.R.drawable.ic_dialog_info)\r
                    .setContentTitle("Study reminder")\r
                    .setContentText("Review the notes you saved today.")\r
                    .setPriority(NotificationCompat.PRIORITY_DEFAULT)\r
                    .setContentIntent(contentIntent)\r
                    .setAutoCancel(true);\r
\r
    NotificationManagerCompat.from(context).notify(1001, notification.build());\r
}\r
\`\`\`\r
\r
## Permissions, privacy, and device features\r
\r
[Source chapter](./13-permissions-and-device-features.md)\r
\r
### Example 1: Declare an optional camera capability\r
\r
\`\`\`xml\r
<manifest xmlns:android="http://schemas.android.com/apk/res/android">\r
\r
    <uses-permission android:name="android.permission.CAMERA" />\r
    <uses-feature\r
        android:name="android.hardware.camera.any"\r
        android:required="false" />\r
\r
    <application />\r
\r
</manifest>\r
\`\`\`\r
\r
### Example 2: Declare an optional camera capability\r
\r
\`\`\`java\r
import android.content.pm.PackageManager;\r
\r
boolean hasCamera = getPackageManager().hasSystemFeature(\r
        PackageManager.FEATURE_CAMERA_ANY\r
);\r
\r
if (hasCamera) {\r
    showCameraButton();\r
} else {\r
    showPhotoSelectionOption();\r
}\r
\`\`\`\r
\r
### Example 3: Request a runtime permission in context\r
\r
\`\`\`java\r
import android.Manifest;\r
import android.content.pm.PackageManager;\r
\r
import androidx.activity.result.ActivityResultLauncher;\r
import androidx.activity.result.contract.ActivityResultContracts;\r
import androidx.core.app.ActivityCompat;\r
import androidx.core.content.ContextCompat;\r
\r
private final ActivityResultLauncher<String> cameraPermission =\r
        registerForActivityResult(\r
                new ActivityResultContracts.RequestPermission(),\r
                granted -> {\r
                    if (granted) {\r
                        openCameraFeature();\r
                    } else {\r
                        showCameraUnavailableMessage();\r
                    }\r
                }\r
        );\r
\r
private void onCameraButtonTap() {\r
    if (!getPackageManager().hasSystemFeature(PackageManager.FEATURE_CAMERA_ANY)) {\r
        showCameraUnavailableMessage();\r
        return;\r
    }\r
\r
    if (ContextCompat.checkSelfPermission(\r
            this,\r
            Manifest.permission.CAMERA\r
    ) == PackageManager.PERMISSION_GRANTED) {\r
        openCameraFeature();\r
    } else if (ActivityCompat.shouldShowRequestPermissionRationale(\r
            this,\r
            Manifest.permission.CAMERA\r
    )) {\r
        showCameraRationale(() -> cameraPermission.launch(Manifest.permission.CAMERA));\r
    } else {\r
        cameraPermission.launch(Manifest.permission.CAMERA);\r
    }\r
}\r
\`\`\`\r
\r
### Example 4: Prefer system selection when it avoids broad access\r
\r
\`\`\`java\r
import android.net.Uri;\r
\r
import androidx.activity.result.ActivityResultLauncher;\r
import androidx.activity.result.PickVisualMediaRequest;\r
import androidx.activity.result.contract.ActivityResultContracts;\r
\r
private final ActivityResultLauncher<PickVisualMediaRequest> pickImage =\r
        registerForActivityResult(\r
                new ActivityResultContracts.PickVisualMedia(),\r
                (Uri uri) -> {\r
                    if (uri != null) {\r
                        previewSelectedImage(uri);\r
                    }\r
                }\r
        );\r
\r
private void onChooseImageTap() {\r
    pickImage.launch(new PickVisualMediaRequest.Builder()\r
            .setMediaType(\r
                    ActivityResultContracts.PickVisualMedia.ImageOnly.INSTANCE\r
            )\r
            .build());\r
}\r
\`\`\`\r
\r
## Accessibility and adaptive layouts\r
\r
[Source chapter](./14-accessibility-and-adaptive-ui.md)\r
\r
### Example 1: 2. Give controls useful spoken names\r
\r
\`\`\`xml\r
<!-- res/layout/activity_search.xml -->\r
<ImageButton\r
    android:id="@+id/searchButton"\r
    android:layout_width="48dp"\r
    android:layout_height="48dp"\r
    android:contentDescription="@string/search"\r
    android:src="@drawable/ic_search"\r
    android:background="?attr/selectableItemBackgroundBorderless" />\r
\`\`\`\r
\r
### Example 2: 2. Give controls useful spoken names\r
\r
\`\`\`xml\r
<!-- res/values/strings.xml -->\r
<resources>\r
    <string name="search">Search</string>\r
    <string name="search_notes">Search notes</string>\r
    <string name="email_address">Email address</string>\r
    <string name="email_hint">name@example.com</string>\r
    <string name="more_options">More options</string>\r
    <string name="notes_title">My notes</string>\r
    <string name="clear_search">Clear search</string>\r
    <string name="select_a_note">Select a note to read</string>\r
</resources>\r
\`\`\`\r
\r
### Example 3: 2. Give controls useful spoken names\r
\r
\`\`\`xml\r
<ImageView\r
    android:layout_width="match_parent"\r
    android:layout_height="160dp"\r
    android:importantForAccessibility="no"\r
    android:src="@drawable/header_texture"\r
    android:contentDescription="@null" />\r
\`\`\`\r
\r
### Example 4: 2. Give controls useful spoken names\r
\r
\`\`\`xml\r
<TextView\r
    android:id="@+id/emailLabel"\r
    android:layout_width="wrap_content"\r
    android:layout_height="wrap_content"\r
    android:labelFor="@id/emailInput"\r
    android:text="@string/email_address" />\r
\r
<EditText\r
    android:id="@+id/emailInput"\r
    android:layout_width="match_parent"\r
    android:layout_height="wrap_content"\r
    android:inputType="textEmailAddress"\r
    android:hint="@string/email_hint" />\r
\`\`\`\r
\r
### Example 5: 3. Make touch targets easy to reach\r
\r
\`\`\`xml\r
<ImageButton\r
    android:id="@+id/moreButton"\r
    android:layout_width="wrap_content"\r
    android:layout_height="wrap_content"\r
    android:minWidth="48dp"\r
    android:minHeight="48dp"\r
    android:padding="12dp"\r
    android:contentDescription="@string/more_options"\r
    android:src="@drawable/ic_more_vert" />\r
\`\`\`\r
\r
### Example 6: 4. Keep reading and focus order clear\r
\r
\`\`\`xml\r
<LinearLayout\r
    android:layout_width="match_parent"\r
    android:layout_height="wrap_content"\r
    android:orientation="vertical">\r
\r
    <TextView\r
        android:id="@+id/pageTitle"\r
        android:layout_width="wrap_content"\r
        android:layout_height="wrap_content"\r
        android:text="@string/notes_title" />\r
\r
    <EditText\r
        android:id="@+id/searchInput"\r
        android:layout_width="match_parent"\r
        android:layout_height="wrap_content"\r
        android:hint="@string/search_notes" />\r
\r
    <Button\r
        android:id="@+id/clearButton"\r
        android:layout_width="wrap_content"\r
        android:layout_height="wrap_content"\r
        android:text="@string/clear_search" />\r
</LinearLayout>\r
\`\`\`\r
\r
### Example 7: 6. Understand responsive and adaptive layouts\r
\r
\`\`\`text\r
res/\r
  layout/\r
    activity_notes.xml\r
  layout-w600dp/\r
    activity_notes.xml\r
\`\`\`\r
\r
### Example 8: 6. Understand responsive and adaptive layouts\r
\r
\`\`\`xml\r
<!-- res/layout/activity_notes.xml -->\r
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"\r
    android:layout_width="match_parent"\r
    android:layout_height="match_parent"\r
    android:orientation="vertical">\r
\r
    <TextView\r
        android:id="@+id/notesTitle"\r
        android:layout_width="match_parent"\r
        android:layout_height="wrap_content"\r
        android:text="@string/notes_title"\r
        android:textSize="24sp" />\r
\r
    <androidx.recyclerview.widget.RecyclerView\r
        android:id="@+id/notesList"\r
        android:layout_width="match_parent"\r
        android:layout_height="0dp"\r
        android:layout_weight="1" />\r
</LinearLayout>\r
\`\`\`\r
\r
### Example 9: 6. Understand responsive and adaptive layouts\r
\r
\`\`\`xml\r
<!-- res/layout-w600dp/activity_notes.xml -->\r
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"\r
    android:layout_width="match_parent"\r
    android:layout_height="match_parent"\r
    android:orientation="horizontal">\r
\r
    <androidx.recyclerview.widget.RecyclerView\r
        android:id="@+id/notesList"\r
        android:layout_width="0dp"\r
        android:layout_height="match_parent"\r
        android:layout_weight="1" />\r
\r
    <FrameLayout\r
        android:id="@+id/noteDetailContainer"\r
        android:layout_width="0dp"\r
        android:layout_height="match_parent"\r
        android:layout_weight="2">\r
\r
        <TextView\r
            android:id="@+id/noteDetailPlaceholder"\r
            android:layout_width="match_parent"\r
            android:layout_height="match_parent"\r
            android:gravity="center"\r
            android:text="@string/select_a_note" />\r
    </FrameLayout>\r
</LinearLayout>\r
\`\`\`\r
\r
### Example 10: 6. Understand responsive and adaptive layouts\r
\r
\`\`\`java\r
FrameLayout detailContainer = findViewById(R.id.noteDetailContainer);\r
\r
if (detailContainer != null) {\r
    // A wide layout is active, so show the selected note here.\r
} else {\r
    // A narrow layout can open the selected note on a separate screen.\r
}\r
\`\`\`\r
\r
## Testing, debugging, and release\r
\r
[Source chapter](./15-debugging-testing-and-release.md)\r
\r
### Example 1: 2. Write a local Java unit test\r
\r
\`\`\`java\r
// app/src/main/java/com/example/notes/NoteTitleValidator.java\r
package com.example.notes;\r
\r
public final class NoteTitleValidator {\r
    private NoteTitleValidator() {\r
    }\r
\r
    public static boolean isValid(String title) {\r
        return title != null && !title.trim().isEmpty();\r
    }\r
}\r
\`\`\`\r
\r
### Example 2: 2. Write a local Java unit test\r
\r
\`\`\`java\r
package com.example.notes;\r
\r
import static org.junit.Assert.assertFalse;\r
import static org.junit.Assert.assertTrue;\r
\r
import org.junit.Test;\r
\r
public class NoteTitleValidatorTest {\r
    @Test\r
    public void isValid_returnsTrueForText() {\r
        assertTrue(NoteTitleValidator.isValid("Android notes"));\r
    }\r
\r
    @Test\r
    public void isValid_returnsFalseForBlankText() {\r
        assertFalse(NoteTitleValidator.isValid("   "));\r
    }\r
\r
    @Test\r
    public void isValid_returnsFalseForNull() {\r
        assertFalse(NoteTitleValidator.isValid(null));\r
    }\r
}\r
\`\`\`\r
\r
### Example 3: 2. Write a local Java unit test\r
\r
\`\`\`powershell\r
.\\gradlew.bat test\r
\`\`\`\r
\r
### Example 4: 3. Check a screen with an instrumented UI test\r
\r
\`\`\`java\r
// app/src/androidTest/java/com/example/notes/NoteSaveTest.java\r
package com.example.notes;\r
\r
import static androidx.test.espresso.Espresso.onView;\r
import static androidx.test.espresso.action.ViewActions.click;\r
import static androidx.test.espresso.assertion.ViewAssertions.matches;\r
import static androidx.test.espresso.matcher.ViewMatchers.isDisplayed;\r
import static androidx.test.espresso.matcher.ViewMatchers.withId;\r
\r
import androidx.test.ext.junit.rules.ActivityScenarioRule;\r
import androidx.test.ext.junit.runners.AndroidJUnit4;\r
\r
import org.junit.Rule;\r
import org.junit.Test;\r
import org.junit.runner.RunWith;\r
\r
@RunWith(AndroidJUnit4.class)\r
public class NoteSaveTest {\r
    @Rule\r
    public ActivityScenarioRule<MainActivity> activityRule =\r
            new ActivityScenarioRule<>(MainActivity.class);\r
\r
    @Test\r
    public void saveButton_showsConfirmation() {\r
        onView(withId(R.id.saveButton)).perform(click());\r
        onView(withId(R.id.noteSavedMessage)).check(matches(isDisplayed()));\r
    }\r
}\r
\`\`\`\r
\r
### Example 5: 3. Check a screen with an instrumented UI test\r
\r
\`\`\`powershell\r
.\\gradlew.bat connectedAndroidTest\r
\`\`\`\r
\r
### Example 6: 4. Use Logcat to understand runtime behavior\r
\r
\`\`\`java\r
import android.util.Log;\r
\r
public final class NoteRepository {\r
    private static final String TAG = "NoteRepository";\r
\r
    public void saveNote(String title) {\r
        if (title == null || title.trim().isEmpty()) {\r
            Log.w(TAG, "Skipped saving a note with an empty title");\r
            return;\r
        }\r
\r
        // Save the note.\r
        Log.d(TAG, "Note saved");\r
    }\r
}\r
\`\`\`\r
\r
### Example 7: 6. Check the release build separately\r
\r
\`\`\`groovy\r
android {\r
    buildTypes {\r
        release {\r
            minifyEnabled true\r
            shrinkResources true\r
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'),\r
                    'proguard-rules.pro'\r
        }\r
    }\r
}\r
\`\`\`\r
\r
---\r
\r
| [Previous: Testing, debugging, and release](15-debugging-testing-and-release.md) | [Notes index](../README.md) | [Next: Complete Q&A](99-complete-q-and-a.md) |\r
|:--|:--:|--:|\r
`,"./chapters/99-complete-q-and-a.md":`# 17. Complete Q&A\r
\r
[Back to notes index](../README.md)\r
\r
| [Previous: All code samples](98-all-code-samples.md) | [Notes index](../README.md) | [Next: Notes index](../README.md) |\r
|:--|:--:|--:|\r
\r
This chapter collects questions that come up while studying Android app development with Java and XML. Answers are kept short enough to review, with links to the topic notes when a deeper explanation or example is useful.\r
\r
## 1. First Android app\r
\r
[Related notes](01-first-android-app.md)\r
\r
### 1.1 What does Android Studio do?\r
\r
Android Studio is the IDE used to edit, build, run, and debug Android projects. It connects project code to the Android SDK, Gradle, emulators, and device tools.\r
\r
### 1.2 What is an Activity?\r
\r
An Activity is an Android app component that provides a window for a user-facing screen. It owns a lifecycle, receives system events, and can host a view hierarchy.\r
\r
### 1.3 What is the Android manifest for?\r
\r
\`AndroidManifest.xml\` identifies app components and declares app-level information such as permissions and supported device features. Android reads it when installing and launching the app.\r
\r
### 1.4 What is Gradle's role?\r
\r
Gradle builds the app by compiling Java, processing resources, resolving dependencies, and packaging the result. The Gradle wrapper keeps the project tied to a known Gradle version.\r
\r
### 1.5 What is the difference between an emulator and a physical device?\r
\r
Both can install and run the app. An emulator is useful for repeatable screen sizes and Android versions; a physical device helps verify real hardware, manufacturer behavior, and performance.\r
\r
### 1.6 What does a successful build prove?\r
\r
A successful build proves that the selected variant compiled and was packaged. It does not prove the app behaves correctly, so launch it and check the screen and important interactions as well.\r
\r
## 2. Java essentials\r
\r
[Related notes](02-java-for-android.md)\r
\r
### 2.1 What is the difference between a primitive and an object reference?\r
\r
A primitive such as \`int\` stores a simple value. A reference variable points to an object, or can be \`null\` when it points to no object.\r
\r
### 2.2 What is the difference between a class and an object?\r
\r
A class describes fields and behavior. An object is one instance of that class with its own state, created with \`new\` or by a framework.\r
\r
### 2.3 Why use encapsulation?\r
\r
Encapsulation keeps an object's state behind methods that can validate changes. It reduces accidental updates and makes the class's rules easier to understand.\r
\r
### 2.4 What is an interface useful for?\r
\r
An interface defines behavior that different classes can implement. Android listeners use this idea to let a view report an event without knowing all the work the app will do in response.\r
\r
### 2.5 When should \`equals()\` be used instead of \`==\`?\r
\r
For objects, \`==\` checks whether two references point to the same object. \`equals()\` checks logical equality when the class implements that comparison, as \`String\` does.\r
\r
### 2.6 How should Java code handle \`null\` and exceptions?\r
\r
Check whether a value may be absent before calling its methods, and validate input at the boundary where it enters the app. Catch exceptions where the app can recover or show a useful error, not just to hide a failure.\r
\r
## 3. Project structure and resources\r
\r
[Related notes](03-project-structure-and-resources.md)\r
\r
### 3.1 What is an app module?\r
\r
An app module contains the Android app's source, resources, manifest, and module-level build configuration. A project can contain other modules such as reusable libraries.\r
\r
### 3.2 What is the difference between \`namespace\` and \`applicationId\`?\r
\r
The \`namespace\` determines the package for generated code such as \`R\`. The \`applicationId\` identifies the installed app to Android and app stores. They often match, but they serve different purposes.\r
\r
### 3.3 What do \`minSdk\`, \`targetSdk\`, and \`compileSdk\` mean?\r
\r
\`minSdk\` is the oldest Android API level the app supports. \`targetSdk\` opts the app into behavior associated with a platform version. \`compileSdk\` selects the Android APIs available while compiling.\r
\r
### 3.4 Why put text in \`strings.xml\`?\r
\r
String resources separate user-facing text from Java and layouts. They support localization, reuse, and clearer accessibility labels.\r
\r
### 3.5 What is \`R\`?\r
\r
\`R\` is generated code that gives Java references to resources such as \`R.id.saveButton\` and \`R.string.app_name\`. Do not edit it by hand; fix resource names or XML errors that prevent it from generating.\r
\r
### 3.6 What is a build variant?\r
\r
A build variant combines a build type, such as \`debug\` or \`release\`, with a product flavor when the project defines flavors. Variants can use different settings or resources for development and distribution.\r
\r
## 4. Activities and lifecycle\r
\r
[Related notes](04-activities-and-lifecycle.md)\r
\r
### 4.1 What does the Activity lifecycle describe?\r
\r
It describes how an Activity is created, becomes visible and interactive, loses focus, stops, and may be destroyed. The system can trigger transitions when the user navigates or the device configuration changes.\r
\r
### 4.2 What is the usual order when an Activity first opens?\r
\r
The common sequence is \`onCreate()\`, \`onStart()\`, then \`onResume()\`. The Activity is ready for user interaction after \`onResume()\` completes.\r
\r
### 4.3 What happens during a rotation?\r
\r
By default, a configuration change such as rotation can destroy and recreate the Activity. UI state must be restored or stored outside the Activity if it needs to survive recreation.\r
\r
### 4.4 What belongs in \`onSaveInstanceState()\`?\r
\r
Small, temporary UI state that helps restore the current screen, such as a selected tab or text query, can go in the saved-state \`Bundle\`. Long-term app data belongs in persistent storage.\r
\r
### 4.5 Is \`onDestroy()\` guaranteed to run when the process ends?\r
\r
No. The system can kill an app process without calling \`onDestroy()\`. Save important state before the app reaches that point instead of treating destruction as a reliable save callback.\r
\r
### 4.6 Which Context should a ViewModel keep?\r
\r
An Activity or View Context should not be stored in a regular ViewModel because the ViewModel can outlive that screen and cause a memory leak. Use a repository or another lifecycle-appropriate owner for work that needs application-level access.\r
\r
## 5. XML layouts and View Binding\r
\r
[Related notes](05-xml-layouts-and-viewbinding.md)\r
\r
### 5.1 What is a View hierarchy?\r
\r
A layout is a tree of Views. Containers such as \`LinearLayout\` and \`ConstraintLayout\` position child Views, while widgets such as \`TextView\` and \`Button\` display content or accept input.\r
\r
### 5.2 When is \`ConstraintLayout\` useful?\r
\r
It positions Views through relationships to the parent or to other Views. It can express a flexible screen with fewer nested containers than a chain of layouts.\r
\r
### 5.3 What is the difference between \`dp\` and \`sp\`?\r
\r
Use \`dp\` for layout dimensions that should account for screen density. Use \`sp\` for text so the user's font-size setting can scale it.\r
\r
### 5.4 What does \`wrap_content\` mean?\r
\r
The View asks for enough space to display its content. It is often appropriate for text and buttons, while \`match_parent\` fills the available size in that dimension.\r
\r
### 5.5 What does View Binding provide?\r
\r
View Binding generates a binding class for each layout and gives typed references to its Views. It avoids repeated \`findViewById()\` calls and many invalid-ID casts.\r
\r
### 5.6 What is the difference between a style and a theme?\r
\r
A style describes attributes for a View or group of Views. A theme supplies attributes across an Activity or app, such as colors and default widget appearances.\r
\r
## 6. Events, forms, and validation\r
\r
[Related notes](06-events-forms-and-validation.md)\r
\r
### 6.1 What is an event listener?\r
\r
A listener is a callback that a View invokes when an event occurs, such as a click. The Activity or another controller can respond without the View containing the whole app workflow.\r
\r
### 6.2 What does \`inputType\` do on an \`EditText\`?\r
\r
It describes the expected input, such as email or a number, so Android can choose a suitable keyboard and input behavior. It does not replace validating the value in Java.\r
\r
### 6.3 Where should form validation happen?\r
\r
Validate close to the point where input enters the app and validate again before saving or submitting. The UI can show early feedback, while the data layer should still protect important rules.\r
\r
### 6.4 When should a form show an error?\r
\r
Show an error when the user submits invalid input, or after a field has been edited enough to make immediate feedback useful. Explain what needs to change and keep valid input intact.\r
\r
### 6.5 What is \`TextWatcher\` for?\r
\r
\`TextWatcher\` observes text changes while the user edits a field. It is useful for updating dependent UI, but expensive work should not run on every keystroke.\r
\r
### 6.6 How can an app avoid duplicate form submissions?\r
\r
Disable or otherwise guard the submit action while a request is in progress, then restore it when the operation completes. The server or data layer should also handle retries safely when duplicate operations would matter.\r
\r
## 7. Intents, fragments, and navigation\r
\r
[Related notes](07-navigation-intents-and-fragments.md)\r
\r
### 7.1 What does an Intent represent?\r
\r
An Intent describes an operation Android should perform, often opening an Activity. An explicit Intent names a target component; an implicit Intent describes an action that another app may handle.\r
\r
### 7.2 When is an implicit Intent useful?\r
\r
It is useful when asking another installed app to handle a standard action, such as viewing a web link or sharing text. Check that a handler is available when the app needs to avoid an unhandled launch.\r
\r
### 7.3 How should small values be passed between Activities?\r
\r
Add simple values to the Intent extras with a key, then read them in the destination Activity. Keep the data small and make the destination handle a missing or invalid extra.\r
\r
### 7.4 What is the difference between an Activity and a Fragment?\r
\r
An Activity is an Android component with a window and lifecycle. A Fragment is a reusable part of a screen hosted by an Activity or another Fragment, with its own view lifecycle.\r
\r
### 7.5 What does the Fragment back stack do?\r
\r
The \`FragmentManager\` can record fragment transactions so Back reverses an earlier navigation step. Add a transaction to the back stack only when that screen should be restored by Back.\r
\r
### 7.6 How should a Fragment access its View after \`onDestroyView()\`?\r
\r
It should not keep using the old View. Clear View Binding references in \`onDestroyView()\` and observe screen state with the Fragment's view lifecycle owner.\r
\r
## 8. RecyclerView and adapters\r
\r
[Related notes](08-recyclerview-and-adapters.md)\r
\r
### 8.1 Why use RecyclerView for a changing list?\r
\r
RecyclerView reuses item Views as they move on and off screen. This avoids creating a separate View for every row and supports large or changing collections more efficiently.\r
\r
### 8.2 What does a ViewHolder do?\r
\r
A ViewHolder keeps references to the Views in one row. The adapter binds the current data item into that holder as RecyclerView reuses it.\r
\r
### 8.3 What should \`onBindViewHolder()\` do?\r
\r
It should set all visible row state from the current item, including text, selected state, and visibility. Reset every state that can differ so reused rows do not show values from an earlier item.\r
\r
### 8.4 Why should a click listener use the current bound item?\r
\r
RecyclerView can move items after the listener is created. Read the current binding position when needed, check that it is valid, and pass the corresponding model or stable item ID to the screen callback.\r
\r
### 8.5 Which layout manager should a list use?\r
\r
Use \`LinearLayoutManager\` for a vertical or horizontal list, \`GridLayoutManager\` for a grid, and \`StaggeredGridLayoutManager\` when items have varying sizes. Choose based on the visual arrangement the screen needs.\r
\r
### 8.6 Why can \`notifyDataSetChanged()\` be a poor default?\r
\r
It tells RecyclerView that the entire list may have changed, so it cannot make precise updates or preserve all item animations. For small examples it can be acceptable; for regular updates, calculate and dispatch the changed items.\r
\r
## 9. ViewModel, LiveData, and app architecture\r
\r
[Related notes](09-architecture-viewmodel-livedata.md)\r
\r
### 9.1 What problem does a ViewModel solve?\r
\r
A ViewModel keeps screen state across Activity recreation, such as rotation. It separates that state from the Activity instance that draws the screen.\r
\r
### 9.2 What is LiveData?\r
\r
LiveData is an observable holder that can notify lifecycle-aware observers when its value changes. Observers tied to an Activity or Fragment lifecycle stop receiving updates when that owner is inactive.\r
\r
### 9.3 Why expose \`LiveData\` instead of \`MutableLiveData\`?\r
\r
The ViewModel can keep a mutable reference to update state while exposing a read-only \`LiveData\` reference to the UI. This keeps the UI from changing state outside the intended methods.\r
\r
### 9.4 What does a repository do?\r
\r
A repository provides a consistent place for the rest of the app to request data. It can decide whether data comes from Room, a network source, or another store without making the Activity manage those details.\r
\r
### 9.5 Should a ViewModel keep an Activity or Fragment?\r
\r
No. A ViewModel may outlive the screen instance, so retaining a screen Context can leak it. Keep screen-specific work in the screen and pass only the state or dependencies the ViewModel needs.\r
\r
### 9.6 What happens if an observer is attached to the wrong owner in a Fragment?\r
\r
Observing with the Fragment instead of its view lifecycle can keep view observers alive after \`onDestroyView()\`. Observe UI state with \`getViewLifecycleOwner()\` so the observer follows the current View.\r
\r
## 10. Room and local preferences\r
\r
[Related notes](10-local-data-room-and-preferences.md)\r
\r
### 10.1 What are the main Room pieces?\r
\r
An \`@Entity\` describes a table, a \`@Dao\` describes database operations, and an \`@Database\` class connects the database and its entities. Room generates the implementation and checks queries at compile time.\r
\r
### 10.2 What should a DAO contain?\r
\r
A DAO contains methods for queries and data changes, such as insert, update, delete, or observing rows. Keeping SQL in the DAO avoids scattering database statements through Activities.\r
\r
### 10.3 Why should database operations stay off the main thread?\r
\r
Database work can take long enough to block drawing and input. Run it on a background executor or through the asynchronous API chosen for the project, then publish the result to the UI.\r
\r
### 10.4 What is a Room migration?\r
\r
A migration describes how to change an existing database schema while preserving stored data. When adding or changing an entity, add and test the matching migration rather than assuming every user starts with an empty database.\r
\r
### 10.5 When are preferences appropriate?\r
\r
Preferences are suitable for small key-value settings, such as a selected display option. Use a database for structured, searchable records such as a collection of study notes.\r
\r
### 10.6 What is the difference between \`apply()\` and \`commit()\` in SharedPreferences?\r
\r
\`apply()\` updates the in-memory value immediately and writes it asynchronously. \`commit()\` writes synchronously and returns whether it succeeded, so calling it on the main thread can block the UI.\r
\r
## 11. Networking, REST, and JSON\r
\r
[Related notes](11-networking-and-rest-apis.md)\r
\r
### 11.1 What is a REST API?\r
\r
A REST-style API exposes resources through HTTP endpoints and uses methods such as GET to read or POST to submit data. The response commonly contains a status code, headers, and a body such as JSON.\r
\r
### 11.2 Does \`INTERNET\` need a runtime permission prompt?\r
\r
No. Declare \`android.permission.INTERNET\` in the manifest. It is a normal permission granted at install time, not a dangerous permission requested with a runtime dialog.\r
\r
### 11.3 Why must a network request not run on the main thread?\r
\r
Network response time is unpredictable. Blocking the main thread can freeze drawing and input, and Android may report an application-not-responding error. Use a background executor or an appropriate networking library.\r
\r
### 11.4 What should an HTTP client check before parsing the body?\r
\r
Check the status code and handle success and error responses intentionally. Configure connection and read timeouts, close streams and connections, and show a recoverable error when the request fails.\r
\r
### 11.5 What is JSON parsing?\r
\r
Parsing reads the JSON structure and converts its fields into values or model objects. Match the actual response shape and handle missing, null, or changed fields without crashing the screen.\r
\r
### 11.6 Where should networking code live?\r
\r
Keep HTTP details behind a data source or repository rather than inside an Activity. The UI can then display loading, success, and error state without managing sockets or response parsing.\r
\r
## 12. Background work and notifications\r
\r
[Related notes](12-background-work-and-notifications.md)\r
\r
### 12.1 When is WorkManager appropriate?\r
\r
Use WorkManager for deferrable work that should eventually run and may need constraints, retries, or persistence across app restarts. It is not meant to provide an exact run time.\r
\r
### 12.2 When is a foreground service appropriate?\r
\r
Use a foreground service for ongoing work that is noticeable to the user and must continue while the app is not in the foreground, such as a user-started recording or navigation session. Current Android versions impose service types, permission rules, and start restrictions, so check the platform requirements for the target SDK.\r
\r
### 12.3 When is an alarm appropriate?\r
\r
Use \`AlarmManager\` when work must be triggered around a particular clock time. Exact alarms are restricted for many apps, so request exact scheduling only when it is essential to the app's core function.\r
\r
### 12.4 Why does Android use notification channels?\r
\r
On Android 8.0 and later, notifications belong to a channel. Users can control channel behavior, and the app must create the channel before posting notifications through it.\r
\r
### 12.5 What is \`PendingIntent\` used for in a notification?\r
\r
A \`PendingIntent\` gives the system a token to perform an app action later, such as opening an Activity when a notification is tapped. Use the appropriate mutability flag and make the intent explicit when the action targets an app component.\r
\r
### 12.6 When should the app request notification permission?\r
\r
On Android versions that require it, request \`POST_NOTIFICATIONS\` at runtime when the user can understand the benefit. If permission is denied, the rest of the app should continue to work where possible.\r
\r
## 13. Permissions, privacy, and device features\r
\r
[Related notes](13-permissions-and-device-features.md)\r
\r
### 13.1 What is the difference between a normal and dangerous permission?\r
\r
A normal permission provides access Android considers low risk and is granted at install time. A dangerous permission protects more sensitive data or actions and requires a runtime decision on supported Android versions.\r
\r
### 13.2 When should a runtime permission be requested?\r
\r
Ask when the user starts a feature that needs the permission, and explain the purpose in context. Avoid requesting access at app launch before the user understands why it is needed.\r
\r
### 13.3 What should happen when a user denies permission?\r
\r
Keep the rest of the app usable and explain which feature is unavailable. If access can be requested again, let the user retry when appropriate; do not repeatedly interrupt after a clear refusal.\r
\r
### 13.4 How should an app handle optional hardware?\r
\r
Declare optional hardware with \`required="false"\` when the app can still work without it, then check for the feature before using it. Hide or disable the related action and provide a clear fallback.\r
\r
### 13.5 Why prefer Android's Photo Picker for selecting media?\r
\r
The Photo Picker lets the user choose specific media without granting broad access to the photo library. Request broader storage access only if the app's core feature truly needs it.\r
\r
### 13.6 What is approximate location?\r
\r
Approximate location gives a less precise location than precise access. If a feature can work with approximate location, support that choice instead of requiring a more precise permission than necessary.\r
\r
## 14. Accessibility and adaptive layouts\r
\r
[Related notes](14-accessibility-and-adaptive-ui.md)\r
\r
### 14.1 Which controls need a content description?\r
\r
Meaningful images and icon-only controls need a short description of their purpose. Text controls already expose their visible text, and decorative graphics should normally be hidden from accessibility services.\r
\r
### 14.2 What touch target size should an interactive View provide?\r
\r
Android recommends at least 48dp by 48dp of focusable touch area. The visible icon can be smaller if the View's minimum size and padding create a large enough target.\r
\r
### 14.3 Why use \`sp\` for text?\r
\r
\`sp\` respects the user's font-size preference. Fixed-height containers and text measured only in \`dp\` can clip content when a user enlarges text.\r
\r
### 14.4 What is the difference between input focus and accessibility focus?\r
\r
Input focus determines which View receives keyboard or D-pad input. Accessibility focus is the element a screen reader is currently exploring. They are separate states and should both lead to understandable navigation.\r
\r
### 14.5 What is the difference between responsive and adaptive layout?\r
\r
A responsive layout resizes or reflows as space changes. An adaptive layout selects a different arrangement when the available space supports it, such as placing a list and selected item side by side.\r
\r
### 14.6 When should \`layout-w600dp\` be used?\r
\r
Use it when an alternate layout should appear once the app window has at least 600dp of current available width. \`layout-sw600dp\` instead selects based on the smallest available width, regardless of current orientation.\r
\r
## 15. Testing, debugging, and release\r
\r
[Related notes](15-debugging-testing-and-release.md)\r
\r
### 15.1 What belongs in a local unit test?\r
\r
Test Java logic that does not require the Android framework, such as validation and formatting. These tests run on the local JVM and are usually quicker than device tests.\r
\r
### 15.2 When is an instrumented test needed?\r
\r
Use an instrumented test when the behavior needs Android or a real view hierarchy, such as clicking a button in an Activity or verifying an integration on an emulator.\r
\r
### 15.3 What is the first useful clue in a crash stack trace?\r
\r
Read the exception type and message, then find the first stack-trace frame that points into app code. That line identifies where the failure surfaced; inspect the preceding inputs and calls to find its cause.\r
\r
### 15.4 Why test a release build if the debug build works?\r
\r
Release configuration may enable code optimization, resource shrinking, and different settings. These can expose missing keep rules or assumptions that debug builds do not exercise.\r
\r
### 15.5 What is the difference between an upload key and an app signing key?\r
\r
The upload key signs the artifact sent to Google Play. With Play App Signing, Google Play uses the app signing key for APKs delivered to users. Keep private key files and passwords secure.\r
\r
### 15.6 What is an Android App Bundle?\r
\r
An Android App Bundle is a publishing format that contains compiled app code and resources. Google Play can use it to generate APKs suited to each device configuration.\r
\r
## Final review\r
\r
These questions revisit the ideas that connect the chapters: keep UI state with the right lifecycle owner, keep I/O off the main thread, ask for only the access a feature needs, and verify behavior on the kinds of screens and Android versions the app supports.\r
\r
---\r
\r
| [Previous: All code samples](98-all-code-samples.md) | [Notes index](../README.md) | [Next: Notes index](../README.md) |\r
|:--|:--:|--:|\r
\r
`})).map(([e,t])=>{let n=e.split(`/`).at(-1);return{content:t,fileName:n,number:Number(n.match(/^\d+/)?.[0]??0),slug:n.replace(/^\d+-/,``).replace(/\.md$/i,``),title:(t.match(/^#\s+(.+)$/m)?.[1]??n).replace(/^\d+\.\s*/,``)}}).sort((e,t)=>e.number-t.number),Zl=`/notes/android-notes`,Ql=new Map(Q.map(e=>[e.fileName,e]));function $l({href:e=``,children:t,...n}){let{node:r,...i}=n,[o,s]=e.split(`#`),c=o.split(`/`).at(-1),l=Ql.get(c),u=s?`#${s}`:``;if(/^README\.md$/i.test(c))return(0,vo.createElement)(a,{to:`${Zl}${u}`,...i},t);if(l)return(0,vo.createElement)(a,{to:`${Zl}/${l.slug}${u}`,...i},t);let d=/^(https?:|mailto:|tel:)/i.test(e);return(0,vo.createElement)(`a`,{href:e,target:d?`_blank`:void 0,rel:d?`noopener noreferrer`:void 0,...i},t)}var eu={a:$l},tu=`# Android Study Notes with Java and XML\r
\r
This repository is my personal set of Android study notes. I write here while learning and working with Android, so the ideas, explanations, code snippets, and questions I find useful stay together and are easy for me to revisit.\r
\r
The notes help me build and retain an understanding of Android's core concepts. I explain topics in my own words, record how important parts fit together, and keep Java and XML examples beside the concepts they illustrate. When a small practice example helps me understand something, I include it as part of my notes.\r
\r
## Scope\r
\r
These notes focus on core Android development with Java and XML. The sections group related subjects, from the first app and Android project structure through app components, layouts, data, networking, background work, testing, and release. Kotlin is not included because I have not studied it.\r
\r
## How these notes are organized\r
\r
- **Topic notes** collect explanations, terminology, APIs, and observations from my study and project work.\r
- **Code samples** gather the Java and XML snippets I want to find and review again.\r
- **Questions and answers** keep useful questions together with the explanations I have worked out.\r
\r
The first 15 chapters cover Android fundamentals through accessibility, testing, and release. Chapter 16 gathers the code examples from those topics, and Chapter 17 brings the main questions and answers together. Each topic chapter links to its neighboring chapters and back to this index.\r
\r
## Core topics\r
\r
1. [Build your first Android app](chapters/01-first-android-app.md)\r
2. [Java essentials for Android](chapters/02-java-for-android.md)\r
3. [Project structure, Gradle, and resources](chapters/03-project-structure-and-resources.md)\r
4. [App components, activities, and lifecycle](chapters/04-activities-and-lifecycle.md)\r
5. [XML layouts, views, themes, and View Binding](chapters/05-xml-layouts-and-viewbinding.md)\r
6. [Events, forms, and validation](chapters/06-events-forms-and-validation.md)\r
7. [Intents, fragments, and navigation](chapters/07-navigation-intents-and-fragments.md)\r
8. [Lists with RecyclerView and adapters](chapters/08-recyclerview-and-adapters.md)\r
9. [App architecture with ViewModel and LiveData](chapters/09-architecture-viewmodel-livedata.md)\r
10. [Local data with Room and preferences](chapters/10-local-data-room-and-preferences.md)\r
11. [Networking, REST APIs, and JSON](chapters/11-networking-and-rest-apis.md)\r
12. [Background work and notifications](chapters/12-background-work-and-notifications.md)\r
13. [Permissions, privacy, and device features](chapters/13-permissions-and-device-features.md)\r
14. [Accessibility and adaptive layouts](chapters/14-accessibility-and-adaptive-ui.md)\r
15. [Testing, debugging, and release](chapters/15-debugging-testing-and-release.md)\r
16. [All code samples](chapters/98-all-code-samples.md)\r
17. [Complete Q&A](chapters/99-complete-q-and-a.md)\r
\r
## Learning in practice\r
\r
I use these notes to revisit concepts and practical patterns from my Android study and work. Examples stay close to the topic they explain, while the code-samples and Q&A chapters make review easier.\r
\r
I refine explanations and examples as I test them in projects and build on what I have learned.\r
\r
## Links\r
\r
- Portfolio: https://www.ashishranjan.net\r
- GitHub: https://github.com/a2rp\r
- CodePen: https://codepen.io/ash1198\r
- LinkedIn: https://www.linkedin.com/in/aashishranjan\r
- Facebook: https://www.facebook.com/theash.ashish/\r
- YouTube: https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1\r
- Email: mailto:ash.ranjan09@gmail.com\r
\r
## Support\r
\r
- Support: https://a2rp-donation-page.netlify.app/\r
- Buy Me a Coffee: https://buymeacoffee.com/ashishranjan\r
- Patreon: https://www.patreon.com/ashishranjan\r
`,$={layout:`_layout_ex6og_1`,projectHeader:`_projectHeader_ex6og_10`,backLink:`_backLink_ex6og_27`,projectIdentity:`_projectIdentity_ex6og_41`,eyebrow:`_eyebrow_ex6og_44`,chapterCount:`_chapterCount_ex6og_71`,body:`_body_ex6og_83`,sidebar:`_sidebar_ex6og_94`,sidebarHeading:`_sidebarHeading_ex6og_107`,navigation:`_navigation_ex6og_126`,navLink:`_navLink_ex6og_141`,active:`_active_ex6og_164`,navNumber:`_navNumber_ex6og_166`,content:`_content_ex6og_177`,chapterHeading:`_chapterHeading_ex6og_180`,markdown:`_markdown_ex6og_203`,missingChapter:`_missingChapter_ex6og_238`,chapterNavigation:`_chapterNavigation_ex6og_249`,repositoryLink:`_repositoryLink_ex6og_276`},nu=`/notes/android-notes`,ru=f.find(({slug:e})=>e===`android-notes`);function iu(){let{chapterSlug:e}=o(),{pathname:n}=r(),i=(0,vo.useRef)(null),s=Q.findIndex(t=>t.slug===e),f=s>=0?Q[s]:null,p=e?f?.content:tu;return(0,vo.useEffect)(()=>{i.current?.querySelector(`[aria-current="page"]`)?.scrollIntoView({behavior:`smooth`,block:`nearest`})},[n]),(0,Y.jsxs)(`div`,{className:$.layout,children:[(0,Y.jsxs)(`header`,{className:$.projectHeader,children:[(0,Y.jsxs)(a,{className:$.backLink,to:`/notes`,children:[(0,Y.jsx)(c,{"aria-hidden":`true`}),` All notes`]}),(0,Y.jsxs)(`div`,{className:$.projectIdentity,children:[(0,Y.jsxs)(`span`,{className:$.eyebrow,children:[(0,Y.jsx)(l,{"aria-hidden":`true`}),` JAVA AND XML`]}),(0,Y.jsx)(`h1`,{children:`Android Notes`}),(0,Y.jsx)(`p`,{children:`Practical Android study notes, examples, and review questions.`})]}),(0,Y.jsxs)(`span`,{className:$.chapterCount,children:[Q.length,` chapters`]})]}),(0,Y.jsxs)(`div`,{className:$.body,children:[(0,Y.jsxs)(`aside`,{className:$.sidebar,children:[(0,Y.jsxs)(`div`,{className:$.sidebarHeading,children:[(0,Y.jsx)(`span`,{children:`CONTENTS`}),(0,Y.jsx)(`strong`,{children:`Android study guide`})]}),(0,Y.jsxs)(`nav`,{ref:i,className:$.navigation,"aria-label":`Android notes chapters`,children:[(0,Y.jsxs)(t,{to:nu,end:!0,className:({isActive:e})=>`${$.navLink} ${e?$.active:``}`,children:[(0,Y.jsx)(l,{"aria-hidden":`true`}),(0,Y.jsx)(`span`,{children:`Overview`})]}),Q.map(e=>(0,Y.jsxs)(t,{to:`${nu}/${e.slug}`,className:({isActive:e})=>`${$.navLink} ${e?$.active:``}`,children:[(0,Y.jsx)(`span`,{className:$.navNumber,children:String(e.number).padStart(2,`0`)}),(0,Y.jsx)(`span`,{children:e.title})]},e.slug))]})]}),(0,Y.jsxs)(`main`,{className:$.content,children:[f&&(0,Y.jsxs)(`div`,{className:$.chapterHeading,children:[(0,Y.jsxs)(`span`,{children:[(0,Y.jsx)(d,{"aria-hidden":`true`}),` CHAPTER `,String(f.number).padStart(2,`0`)]}),(0,Y.jsx)(`h2`,{children:f.title})]}),p?(0,Y.jsx)(`article`,{className:$.markdown,children:(0,Y.jsx)(Co,{remarkPlugins:[Xl],components:eu,children:p})}):(0,Y.jsxs)(`section`,{className:$.missingChapter,children:[(0,Y.jsx)(`span`,{children:`CHAPTER NOT FOUND`}),(0,Y.jsx)(`h2`,{children:`This Android notes chapter is unavailable.`}),(0,Y.jsxs)(a,{to:nu,children:[`Back to the Android notes index `,(0,Y.jsx)(u,{"aria-hidden":`true`})]})]}),f&&(0,Y.jsxs)(`nav`,{className:$.chapterNavigation,"aria-label":`Previous and next chapters`,children:[(0,Y.jsxs)(a,{to:s===0?nu:`${nu}/${Q[s-1].slug}`,children:[(0,Y.jsx)(c,{"aria-hidden":`true`}),(0,Y.jsx)(`span`,{children:s===0?`Notes index`:Q[s-1].title})]}),s<Q.length-1&&(0,Y.jsxs)(a,{to:`${nu}/${Q[s+1].slug}`,children:[(0,Y.jsx)(`span`,{children:Q[s+1].title}),(0,Y.jsx)(u,{"aria-hidden":`true`})]})]})]})]}),(0,Y.jsxs)(`a`,{className:$.repositoryLink,href:ru.repository,target:`_blank`,rel:`noopener noreferrer`,children:[`View Android Notes on GitHub `,(0,Y.jsx)(u,{"aria-hidden":`true`})]})]})}export{iu as default};
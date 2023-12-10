(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.17.0
 * @author George Michael Brower
 * @license MIT
 */class un{constructor(e,t,n,r,s="div"){this.parent=e,this.object=t,this.property=n,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement("div"),this.domElement.classList.add("controller"),this.domElement.classList.add(r),this.$name=document.createElement("div"),this.$name.classList.add("name"),un.nextNameID=un.nextNameID||0,this.$name.id="lil-gui-name-"+ ++un.nextNameID,this.$widget=document.createElement(s),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(n)}name(e){return this._name=e,this.$name.innerHTML=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled||(this._disabled=e,this.domElement.classList.toggle("disabled",e),this.$disable.toggleAttribute("disabled",e)),this}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){const t=this.parent.add(this.object,this.property,e);return t.name(this._name),this.destroy(),t}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.object[this.property]=e,this._callOnChange(),this.updateDisplay(),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}let rc=class extends un{constructor(e,t,n){super(e,t,n,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}};function Is(i){let e,t;return(e=i.match(/(#|0x)?([a-f0-9]{6})/i))?t=e[2]:(e=i.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?t=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=i.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(t=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),!!t&&"#"+t}const sc={isPrimitive:!0,match:i=>typeof i=="string",fromHexString:Is,toHexString:Is},$i={isPrimitive:!0,match:i=>typeof i=="number",fromHexString:i=>parseInt(i.substring(1),16),toHexString:i=>"#"+i.toString(16).padStart(6,0)},oc={isPrimitive:!1,match:Array.isArray,fromHexString(i,e,t=1){const n=$i.fromHexString(i);e[0]=(n>>16&255)/255*t,e[1]=(n>>8&255)/255*t,e[2]=(255&n)/255*t},toHexString:([i,e,t],n=1)=>$i.toHexString(i*(n=255/n)<<16^e*n<<8^t*n<<0)},ac={isPrimitive:!1,match:i=>Object(i)===i,fromHexString(i,e,t=1){const n=$i.fromHexString(i);e.r=(n>>16&255)/255*t,e.g=(n>>8&255)/255*t,e.b=(255&n)/255*t},toHexString:({r:i,g:e,b:t},n=1)=>$i.toHexString(i*(n=255/n)<<16^e*n<<8^t*n<<0)},lc=[sc,$i,oc,ac];class cc extends un{constructor(e,t,n,r){var s;super(e,t,n,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=(s=this.initialValue,lc.find(a=>a.match(s))),this._rgbScale=r,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const a=Is(this.$text.value);a&&this._setValueFromHexString(a)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const t=this._format.fromHexString(e);this.setValue(t)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class jr extends un{constructor(e,t,n){super(e,t,n,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",r=>{r.preventDefault(),this.getValue().call(this.object)}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class uc extends un{constructor(e,t,n,r,s,a){super(e,t,n,"number"),this._initInput(),this.min(r),this.max(s);const o=a!==void 0;this.step(o?a:this._getImplicitStep(),o),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,t=!0){return this._step=e,this._stepExplicit=t,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let t=(e-this._min)/(this._max-this._min);t=Math.max(0,Math.min(t,1)),this.$fill.style.width=100*t+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$disable=this.$input;const e=u=>{const h=parseFloat(this.$input.value);isNaN(h)||(this._snapClampSetValue(h+u),this.$input.value=this.getValue())};let t,n,r,s,a,o=!1;const l=u=>{if(o){const h=u.clientX-t,f=u.clientY-n;Math.abs(f)>5?(u.preventDefault(),this.$input.blur(),o=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(h)>5&&c()}if(!o){const h=u.clientY-r;a-=h*this._step*this._arrowKeyMultiplier(u),s+a>this._max?a=this._max-s:s+a<this._min&&(a=this._min-s),this._snapClampSetValue(s+a)}r=u.clientY},c=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",l),window.removeEventListener("mouseup",c)};this.$input.addEventListener("input",()=>{let u=parseFloat(this.$input.value);isNaN(u)||(this._stepExplicit&&(u=this._snap(u)),this.setValue(this._clamp(u)))}),this.$input.addEventListener("keydown",u=>{u.code==="Enter"&&this.$input.blur(),u.code==="ArrowUp"&&(u.preventDefault(),e(this._step*this._arrowKeyMultiplier(u))),u.code==="ArrowDown"&&(u.preventDefault(),e(this._step*this._arrowKeyMultiplier(u)*-1))}),this.$input.addEventListener("wheel",u=>{this._inputFocused&&(u.preventDefault(),e(this._step*this._normalizeMouseWheel(u)))},{passive:!1}),this.$input.addEventListener("mousedown",u=>{t=u.clientX,n=r=u.clientY,o=!0,s=this.getValue(),a=0,window.addEventListener("mousemove",l),window.addEventListener("mouseup",c)}),this.$input.addEventListener("focus",()=>{this._inputFocused=!0}),this.$input.addEventListener("blur",()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()})}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const e=f=>{const m=this.$slider.getBoundingClientRect();let v=(x=f,p=m.left,d=m.right,b=this._min,E=this._max,(x-p)/(d-p)*(E-b)+b);var x,p,d,b,E;this._snapClampSetValue(v)},t=f=>{e(f.clientX)},n=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",t),window.removeEventListener("mouseup",n)};let r,s,a=!1;const o=f=>{f.preventDefault(),this._setDraggingStyle(!0),e(f.touches[0].clientX),a=!1},l=f=>{if(a){const m=f.touches[0].clientX-r,v=f.touches[0].clientY-s;Math.abs(m)>Math.abs(v)?o(f):(window.removeEventListener("touchmove",l),window.removeEventListener("touchend",c))}else f.preventDefault(),e(f.touches[0].clientX)},c=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",l),window.removeEventListener("touchend",c)},u=this._callOnFinishChange.bind(this);let h;this.$slider.addEventListener("mousedown",f=>{this._setDraggingStyle(!0),e(f.clientX),window.addEventListener("mousemove",t),window.addEventListener("mouseup",n)}),this.$slider.addEventListener("touchstart",f=>{f.touches.length>1||(this._hasScrollBar?(r=f.touches[0].clientX,s=f.touches[0].clientY,a=!0):o(f),window.addEventListener("touchmove",l,{passive:!1}),window.addEventListener("touchend",c))},{passive:!1}),this.$slider.addEventListener("wheel",f=>{if(Math.abs(f.deltaX)<Math.abs(f.deltaY)&&this._hasScrollBar)return;f.preventDefault();const m=this._normalizeMouseWheel(f)*this._step;this._snapClampSetValue(this.getValue()+m),this.$input.value=this.getValue(),clearTimeout(h),h=setTimeout(u,400)},{passive:!1})}_setDraggingStyle(e,t="horizontal"){this.$slider&&this.$slider.classList.toggle("active",e),document.body.classList.toggle("lil-gui-dragging",e),document.body.classList.toggle("lil-gui-"+t,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:t,deltaY:n}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(t=0,n=-e.wheelDelta/120,n*=this._stepExplicit?1:10),t+-n}_arrowKeyMultiplier(e){let t=this._stepExplicit?1:10;return e.shiftKey?t*=10:e.altKey&&(t/=10),t}_snap(e){const t=Math.round(e/this._step)*this._step;return parseFloat(t.toPrecision(15))}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class hc extends un{constructor(e,t,n,r){super(e,t,n,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this._values=Array.isArray(r)?r:Object.values(r),this._names=Array.isArray(r)?r:Object.keys(r),this._names.forEach(s=>{const a=document.createElement("option");a.innerHTML=s,this.$select.appendChild(a)}),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.updateDisplay()}updateDisplay(){const e=this.getValue(),t=this._values.indexOf(e);return this.$select.selectedIndex=t,this.$display.innerHTML=t===-1?e:this._names[t],this}}class dc extends un{constructor(e,t,n){super(e,t,n,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",r=>{r.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}let vo=!1;class $s{constructor({parent:e,autoPlace:t=e===void 0,container:n,width:r,title:s="Controls",injectStyles:a=!0,touchStyles:o=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("div"),this.$title.classList.add("title"),this.$title.setAttribute("role","button"),this.$title.setAttribute("aria-expanded",!0),this.$title.setAttribute("tabindex",0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("keydown",l=>{l.code!=="Enter"&&l.code!=="Space"||(l.preventDefault(),this.$title.click())}),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(s),o&&this.domElement.classList.add("allow-touch-styles"),this.parent)return this.parent.children.push(this),this.parent.folders.push(this),void this.parent.$children.appendChild(this.domElement);this.domElement.classList.add("root"),!vo&&a&&(function(l){const c=document.createElement("style");c.innerHTML=l;const u=document.querySelector("head link[rel=stylesheet], head style");u?document.head.insertBefore(c,u):document.head.appendChild(c)}('.lil-gui{--background-color:#1f1f1f;--text-color:#ebebeb;--title-background-color:#111;--title-text-color:#ebebeb;--widget-color:#424242;--hover-color:#4f4f4f;--focus-color:#595959;--number-color:#2cc9ff;--string-color:#a2db3c;--font-size:11px;--input-font-size:11px;--font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;--font-family-mono:Menlo,Monaco,Consolas,"Droid Sans Mono",monospace;--padding:4px;--spacing:4px;--widget-height:20px;--name-width:45%;--slider-knob-width:2px;--slider-input-width:27%;--color-input-width:27%;--slider-input-min-width:45px;--color-input-min-width:45px;--folder-indent:7px;--widget-padding:0 0 0 3px;--widget-border-radius:2px;--checkbox-size:calc(var(--widget-height)*0.75);--scrollbar-width:5px;background-color:var(--background-color);color:var(--text-color);font-family:var(--font-family);font-size:var(--font-size);font-style:normal;font-weight:400;line-height:1;text-align:left;touch-action:manipulation;user-select:none;-webkit-user-select:none}.lil-gui,.lil-gui *{box-sizing:border-box;margin:0;padding:0}.lil-gui.root{display:flex;flex-direction:column;width:var(--width,245px)}.lil-gui.root>.title{background:var(--title-background-color);color:var(--title-text-color)}.lil-gui.root>.children{overflow-x:hidden;overflow-y:auto}.lil-gui.root>.children::-webkit-scrollbar{background:var(--background-color);height:var(--scrollbar-width);width:var(--scrollbar-width)}.lil-gui.root>.children::-webkit-scrollbar-thumb{background:var(--focus-color);border-radius:var(--scrollbar-width)}.lil-gui.force-touch-styles{--widget-height:28px;--padding:6px;--spacing:6px;--font-size:13px;--input-font-size:16px;--folder-indent:10px;--scrollbar-width:7px;--slider-input-min-width:50px;--color-input-min-width:65px}.lil-gui.autoPlace{max-height:100%;position:fixed;right:15px;top:0;z-index:1001}.lil-gui .controller{align-items:center;display:flex;margin:var(--spacing) 0;padding:0 var(--padding)}.lil-gui .controller.disabled{opacity:.5}.lil-gui .controller.disabled,.lil-gui .controller.disabled *{pointer-events:none!important}.lil-gui .controller>.name{flex-shrink:0;line-height:var(--widget-height);min-width:var(--name-width);padding-right:var(--spacing);white-space:pre}.lil-gui .controller .widget{align-items:center;display:flex;min-height:var(--widget-height);position:relative;width:100%}.lil-gui .controller.string input{color:var(--string-color)}.lil-gui .controller.boolean .widget{cursor:pointer}.lil-gui .controller.color .display{border-radius:var(--widget-border-radius);height:var(--widget-height);position:relative;width:100%}.lil-gui .controller.color input[type=color]{cursor:pointer;height:100%;opacity:0;width:100%}.lil-gui .controller.color input[type=text]{flex-shrink:0;font-family:var(--font-family-mono);margin-left:var(--spacing);min-width:var(--color-input-min-width);width:var(--color-input-width)}.lil-gui .controller.option select{max-width:100%;opacity:0;position:absolute;width:100%}.lil-gui .controller.option .display{background:var(--widget-color);border-radius:var(--widget-border-radius);height:var(--widget-height);line-height:var(--widget-height);max-width:100%;overflow:hidden;padding-left:.55em;padding-right:1.75em;pointer-events:none;position:relative;word-break:break-all}.lil-gui .controller.option .display.active{background:var(--focus-color)}.lil-gui .controller.option .display:after{bottom:0;content:"↕";font-family:lil-gui;padding-right:.375em;position:absolute;right:0;top:0}.lil-gui .controller.option .widget,.lil-gui .controller.option select{cursor:pointer}.lil-gui .controller.number input{color:var(--number-color)}.lil-gui .controller.number.hasSlider input{flex-shrink:0;margin-left:var(--spacing);min-width:var(--slider-input-min-width);width:var(--slider-input-width)}.lil-gui .controller.number .slider{background-color:var(--widget-color);border-radius:var(--widget-border-radius);cursor:ew-resize;height:var(--widget-height);overflow:hidden;padding-right:var(--slider-knob-width);touch-action:pan-y;width:100%}.lil-gui .controller.number .slider.active{background-color:var(--focus-color)}.lil-gui .controller.number .slider.active .fill{opacity:.95}.lil-gui .controller.number .fill{border-right:var(--slider-knob-width) solid var(--number-color);box-sizing:content-box;height:100%}.lil-gui-dragging .lil-gui{--hover-color:var(--widget-color)}.lil-gui-dragging *{cursor:ew-resize!important}.lil-gui-dragging.lil-gui-vertical *{cursor:ns-resize!important}.lil-gui .title{--title-height:calc(var(--widget-height) + var(--spacing)*1.25);-webkit-tap-highlight-color:transparent;text-decoration-skip:objects;cursor:pointer;font-weight:600;height:var(--title-height);line-height:calc(var(--title-height) - 4px);outline:none;padding:0 var(--padding)}.lil-gui .title:before{content:"▾";display:inline-block;font-family:lil-gui;padding-right:2px}.lil-gui .title:active{background:var(--title-background-color);opacity:.75}.lil-gui.root>.title:focus{text-decoration:none!important}.lil-gui.closed>.title:before{content:"▸"}.lil-gui.closed>.children{opacity:0;transform:translateY(-7px)}.lil-gui.closed:not(.transition)>.children{display:none}.lil-gui.transition>.children{overflow:hidden;pointer-events:none;transition-duration:.3s;transition-property:height,opacity,transform;transition-timing-function:cubic-bezier(.2,.6,.35,1)}.lil-gui .children:empty:before{content:"Empty";display:block;font-style:italic;height:var(--widget-height);line-height:var(--widget-height);margin:var(--spacing) 0;opacity:.5;padding:0 var(--padding)}.lil-gui.root>.children>.lil-gui>.title{border-width:0;border-bottom:1px solid var(--widget-color);border-left:0 solid var(--widget-color);border-right:0 solid var(--widget-color);border-top:1px solid var(--widget-color);transition:border-color .3s}.lil-gui.root>.children>.lil-gui.closed>.title{border-bottom-color:transparent}.lil-gui+.controller{border-top:1px solid var(--widget-color);margin-top:0;padding-top:var(--spacing)}.lil-gui .lil-gui .lil-gui>.title{border:none}.lil-gui .lil-gui .lil-gui>.children{border:none;border-left:2px solid var(--widget-color);margin-left:var(--folder-indent)}.lil-gui .lil-gui .controller{border:none}.lil-gui input{-webkit-tap-highlight-color:transparent;background:var(--widget-color);border:0;border-radius:var(--widget-border-radius);color:var(--text-color);font-family:var(--font-family);font-size:var(--input-font-size);height:var(--widget-height);outline:none;width:100%}.lil-gui input:disabled{opacity:1}.lil-gui input[type=number],.lil-gui input[type=text]{padding:var(--widget-padding)}.lil-gui input[type=number]:focus,.lil-gui input[type=text]:focus{background:var(--focus-color)}.lil-gui input::-webkit-inner-spin-button,.lil-gui input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.lil-gui input[type=number]{-moz-appearance:textfield}.lil-gui input[type=checkbox]{appearance:none;-webkit-appearance:none;border-radius:var(--widget-border-radius);cursor:pointer;height:var(--checkbox-size);text-align:center;width:var(--checkbox-size)}.lil-gui input[type=checkbox]:checked:before{content:"✓";font-family:lil-gui;font-size:var(--checkbox-size);line-height:var(--checkbox-size)}.lil-gui button{-webkit-tap-highlight-color:transparent;background:var(--widget-color);border:1px solid var(--widget-color);border-radius:var(--widget-border-radius);color:var(--text-color);cursor:pointer;font-family:var(--font-family);font-size:var(--font-size);height:var(--widget-height);line-height:calc(var(--widget-height) - 4px);outline:none;text-align:center;text-transform:none;width:100%}.lil-gui button:active{background:var(--focus-color)}@font-face{font-family:lil-gui;src:url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff")}@media (pointer:coarse){.lil-gui.allow-touch-styles{--widget-height:28px;--padding:6px;--spacing:6px;--font-size:13px;--input-font-size:16px;--folder-indent:10px;--scrollbar-width:7px;--slider-input-min-width:50px;--color-input-min-width:65px}}@media (hover:hover){.lil-gui .controller.color .display:hover:before{border:1px solid #fff9;border-radius:var(--widget-border-radius);bottom:0;content:" ";display:block;left:0;position:absolute;right:0;top:0}.lil-gui .controller.option .display.focus{background:var(--focus-color)}.lil-gui .controller.option .widget:hover .display{background:var(--hover-color)}.lil-gui .controller.number .slider:hover{background-color:var(--hover-color)}body:not(.lil-gui-dragging) .lil-gui .title:hover{background:var(--title-background-color);opacity:.85}.lil-gui .title:focus{text-decoration:underline var(--focus-color)}.lil-gui input:hover{background:var(--hover-color)}.lil-gui input:active{background:var(--focus-color)}.lil-gui input[type=checkbox]:focus{box-shadow:inset 0 0 0 1px var(--focus-color)}.lil-gui button:hover{background:var(--hover-color);border-color:var(--hover-color)}.lil-gui button:focus{border-color:var(--focus-color)}}'),vo=!0),n?n.appendChild(this.domElement):t&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),r&&this.domElement.style.setProperty("--width",r+"px"),this.domElement.addEventListener("keydown",l=>l.stopPropagation()),this.domElement.addEventListener("keyup",l=>l.stopPropagation())}add(e,t,n,r,s){if(Object(n)===n)return new hc(this,e,t,n);const a=e[t];switch(typeof a){case"number":return new uc(this,e,t,n,r,s);case"boolean":return new rc(this,e,t);case"string":return new dc(this,e,t);case"function":return new jr(this,e,t)}console.error(`gui.add failed
	property:`,t,`
	object:`,e,`
	value:`,a)}addColor(e,t,n=1){return new cc(this,e,t,n)}addFolder(e){return new $s({parent:this,title:e})}load(e,t=!0){return e.controllers&&this.controllers.forEach(n=>{n instanceof jr||n._name in e.controllers&&n.load(e.controllers[n._name])}),t&&e.folders&&this.folders.forEach(n=>{n._title in e.folders&&n.load(e.folders[n._title])}),this}save(e=!0){const t={controllers:{},folders:{}};return this.controllers.forEach(n=>{if(!(n instanceof jr)){if(n._name in t.controllers)throw new Error(`Cannot save GUI with duplicate property "${n._name}"`);t.controllers[n._name]=n.save()}}),e&&this.folders.forEach(n=>{if(n._title in t.folders)throw new Error(`Cannot save GUI with duplicate folder "${n._title}"`);t.folders[n._title]=n.save()}),t}open(e=!0){return this._closed=!e,this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._closed=!e,this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const t=this.$children.clientHeight;this.$children.style.height=t+"px",this.domElement.classList.add("transition");const n=s=>{s.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",n))};this.$children.addEventListener("transitionend",n);const r=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!e),requestAnimationFrame(()=>{this.$children.style.height=r+"px"})}),this}title(e){return this._title=e,this.$title.innerHTML=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(t=>t.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(t=>{e=e.concat(t.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(t=>{e=e.concat(t.foldersRecursive())}),e}}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const js="159",qt={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Ln={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},fc=0,xo=1,pc=2,ja=1,mc=2,vn=3,Bn=0,Ft=1,cn=2,Nn=0,yi=1,Eo=2,So=3,Mo=4,gc=5,jn=100,_c=101,vc=102,yo=103,bo=104,xc=200,Ec=201,Sc=202,Mc=203,Ns=204,Os=205,yc=206,bc=207,Tc=208,Ac=209,wc=210,Rc=211,Cc=212,Pc=213,Lc=214,Dc=0,Uc=1,Ic=2,Pr=3,Nc=4,Oc=5,Fc=6,Bc=7,Za=0,zc=1,Gc=2,On=0,Hc=1,kc=2,Vc=3,Wc=4,Xc=5,Ka=300,Ai=301,wi=302,Lr=303,Fs=304,zr=306,Bs=1e3,kt=1001,zs=1002,bt=1003,To=1004,Zr=1005,At=1006,Yc=1007,Ri=1008,Fn=1009,qc=1010,$c=1011,Zs=1012,Ja=1013,Un=1014,nn=1015,En=1016,Qa=1017,el=1018,Kn=1020,jc=1021,jt=1023,Zc=1024,Kc=1025,Jn=1026,Ci=1027,tl=1028,nl=1029,Jc=1030,il=1031,rl=1033,Kr=33776,Jr=33777,Qr=33778,es=33779,Ao=35840,wo=35841,Ro=35842,Co=35843,sl=36196,Po=37492,Lo=37496,Do=37808,Uo=37809,Io=37810,No=37811,Oo=37812,Fo=37813,Bo=37814,zo=37815,Go=37816,Ho=37817,ko=37818,Vo=37819,Wo=37820,Xo=37821,ts=36492,Yo=36494,qo=36495,Qc=36283,$o=36284,jo=36285,Zo=36286,ol=3e3,Qn=3001,eu=3200,tu=3201,nu=0,iu=1,Vt="",Tt="srgb",sn="srgb-linear",Ks="display-p3",Gr="display-p3-linear",Dr="linear",ct="srgb",Ur="rec709",Ir="p3",ri=7680,Ko=519,ru=512,su=513,ou=514,al=515,au=516,lu=517,cu=518,uu=519,Jo=35044,Qo="300 es",Gs=1035,Sn=2e3,Nr=2001;class Hn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Lt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let ea=1234567;const Vi=Math.PI/180,ji=180/Math.PI;function Ui(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Lt[i&255]+Lt[i>>8&255]+Lt[i>>16&255]+Lt[i>>24&255]+"-"+Lt[e&255]+Lt[e>>8&255]+"-"+Lt[e>>16&15|64]+Lt[e>>24&255]+"-"+Lt[t&63|128]+Lt[t>>8&255]+"-"+Lt[t>>16&255]+Lt[t>>24&255]+Lt[n&255]+Lt[n>>8&255]+Lt[n>>16&255]+Lt[n>>24&255]).toLowerCase()}function wt(i,e,t){return Math.max(e,Math.min(t,i))}function Js(i,e){return(i%e+e)%e}function hu(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function du(i,e,t){return i!==e?(t-i)/(e-i):0}function Wi(i,e,t){return(1-t)*i+t*e}function fu(i,e,t,n){return Wi(i,e,1-Math.exp(-t*n))}function pu(i,e=1){return e-Math.abs(Js(i,e*2)-e)}function mu(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function gu(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function _u(i,e){return i+Math.floor(Math.random()*(e-i+1))}function vu(i,e){return i+Math.random()*(e-i)}function xu(i){return i*(.5-Math.random())}function Eu(i){i!==void 0&&(ea=i);let e=ea+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Su(i){return i*Vi}function Mu(i){return i*ji}function Hs(i){return(i&i-1)===0&&i!==0}function yu(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Or(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function bu(i,e,t,n,r){const s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+n)/2),u=a((e+n)/2),h=s((e-n)/2),f=a((e-n)/2),m=s((n-e)/2),v=a((n-e)/2);switch(r){case"XYX":i.set(o*u,l*h,l*f,o*c);break;case"YZY":i.set(l*f,o*u,l*h,o*c);break;case"ZXZ":i.set(l*h,l*f,o*u,o*c);break;case"XZX":i.set(o*u,l*v,l*m,o*c);break;case"YXY":i.set(l*m,o*u,l*v,o*c);break;case"ZYZ":i.set(l*v,l*m,o*u,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Si(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function It(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const ks={DEG2RAD:Vi,RAD2DEG:ji,generateUUID:Ui,clamp:wt,euclideanModulo:Js,mapLinear:hu,inverseLerp:du,lerp:Wi,damp:fu,pingpong:pu,smoothstep:mu,smootherstep:gu,randInt:_u,randFloat:vu,randFloatSpread:xu,seededRandom:Eu,degToRad:Su,radToDeg:Mu,isPowerOfTwo:Hs,ceilPowerOfTwo:yu,floorPowerOfTwo:Or,setQuaternionFromProperEuler:bu,normalize:It,denormalize:Si};class Ve{constructor(e=0,t=0){Ve.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(wt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Qe{constructor(e,t,n,r,s,a,o,l,c){Qe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c)}set(e,t,n,r,s,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],h=n[7],f=n[2],m=n[5],v=n[8],x=r[0],p=r[3],d=r[6],b=r[1],E=r[4],C=r[7],w=r[2],N=r[5],I=r[8];return s[0]=a*x+o*b+l*w,s[3]=a*p+o*E+l*N,s[6]=a*d+o*C+l*I,s[1]=c*x+u*b+h*w,s[4]=c*p+u*E+h*N,s[7]=c*d+u*C+h*I,s[2]=f*x+m*b+v*w,s[5]=f*p+m*E+v*N,s[8]=f*d+m*C+v*I,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*s*u+n*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=u*a-o*c,f=o*l-u*s,m=c*s-a*l,v=t*h+n*f+r*m;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/v;return e[0]=h*x,e[1]=(r*c-u*n)*x,e[2]=(o*n-r*a)*x,e[3]=f*x,e[4]=(u*t-r*l)*x,e[5]=(r*s-o*t)*x,e[6]=m*x,e[7]=(n*l-c*t)*x,e[8]=(a*t-n*s)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(ns.makeScale(e,t)),this}rotate(e){return this.premultiply(ns.makeRotation(-e)),this}translate(e,t){return this.premultiply(ns.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ns=new Qe;function ll(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Fr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Tu(){const i=Fr("canvas");return i.style.display="block",i}const ta={};function Xi(i){i in ta||(ta[i]=!0,console.warn(i))}const na=new Qe().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),ia=new Qe().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),ir={[sn]:{transfer:Dr,primaries:Ur,toReference:i=>i,fromReference:i=>i},[Tt]:{transfer:ct,primaries:Ur,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Gr]:{transfer:Dr,primaries:Ir,toReference:i=>i.applyMatrix3(ia),fromReference:i=>i.applyMatrix3(na)},[Ks]:{transfer:ct,primaries:Ir,toReference:i=>i.convertSRGBToLinear().applyMatrix3(ia),fromReference:i=>i.applyMatrix3(na).convertLinearToSRGB()}},Au=new Set([sn,Gr]),st={enabled:!0,_workingColorSpace:sn,get legacyMode(){return console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),!this.enabled},set legacyMode(i){console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),this.enabled=!i},get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!Au.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=ir[e].toReference,r=ir[t].fromReference;return r(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return ir[i].primaries},getTransfer:function(i){return i===Vt?Dr:ir[i].transfer}};function bi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function is(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let si;class cl{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{si===void 0&&(si=Fr("canvas")),si.width=e.width,si.height=e.height;const n=si.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=si}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Fr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=bi(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(bi(t[n]/255)*255):t[n]=bi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let wu=0;class ul{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:wu++}),this.uuid=Ui(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(rs(r[a].image)):s.push(rs(r[a]))}else s=rs(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function rs(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?cl.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Ru=0;class Bt extends Hn{constructor(e=Bt.DEFAULT_IMAGE,t=Bt.DEFAULT_MAPPING,n=kt,r=kt,s=At,a=Ri,o=jt,l=Fn,c=Bt.DEFAULT_ANISOTROPY,u=Vt){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ru++}),this.uuid=Ui(),this.name="",this.source=new ul(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ve(0,0),this.repeat=new Ve(1,1),this.center=new Ve(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Qe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(Xi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===Qn?Tt:Vt),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ka)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Bs:e.x=e.x-Math.floor(e.x);break;case kt:e.x=e.x<0?0:1;break;case zs:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Bs:e.y=e.y-Math.floor(e.y);break;case kt:e.y=e.y<0?0:1;break;case zs:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Xi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Tt?Qn:ol}set encoding(e){Xi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Qn?Tt:Vt}}Bt.DEFAULT_IMAGE=null;Bt.DEFAULT_MAPPING=Ka;Bt.DEFAULT_ANISOTROPY=1;class Rt{constructor(e=0,t=0,n=0,r=1){Rt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const l=e.elements,c=l[0],u=l[4],h=l[8],f=l[1],m=l[5],v=l[9],x=l[2],p=l[6],d=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-x)<.01&&Math.abs(v-p)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+x)<.1&&Math.abs(v+p)<.1&&Math.abs(c+m+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(c+1)/2,C=(m+1)/2,w=(d+1)/2,N=(u+f)/4,I=(h+x)/4,k=(v+p)/4;return E>C&&E>w?E<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(E),r=N/n,s=I/n):C>w?C<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(C),n=N/r,s=k/r):w<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(w),n=I/s,r=k/s),this.set(n,r,s,t),this}let b=Math.sqrt((p-v)*(p-v)+(h-x)*(h-x)+(f-u)*(f-u));return Math.abs(b)<.001&&(b=1),this.x=(p-v)/b,this.y=(h-x)/b,this.z=(f-u)/b,this.w=Math.acos((c+m+d-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Cu extends Hn{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Rt(0,0,e,t),this.scissorTest=!1,this.viewport=new Rt(0,0,e,t);const r={width:e,height:t,depth:1};n.encoding!==void 0&&(Xi("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Qn?Tt:Vt),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:At,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new Bt(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new ul(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ti extends Cu{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class hl extends Bt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=bt,this.minFilter=bt,this.wrapR=kt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Pu extends Bt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=bt,this.minFilter=bt,this.wrapR=kt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class zn{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let l=n[r+0],c=n[r+1],u=n[r+2],h=n[r+3];const f=s[a+0],m=s[a+1],v=s[a+2],x=s[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(o===1){e[t+0]=f,e[t+1]=m,e[t+2]=v,e[t+3]=x;return}if(h!==x||l!==f||c!==m||u!==v){let p=1-o;const d=l*f+c*m+u*v+h*x,b=d>=0?1:-1,E=1-d*d;if(E>Number.EPSILON){const w=Math.sqrt(E),N=Math.atan2(w,d*b);p=Math.sin(p*N)/w,o=Math.sin(o*N)/w}const C=o*b;if(l=l*p+f*C,c=c*p+m*C,u=u*p+v*C,h=h*p+x*C,p===1-o){const w=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=w,c*=w,u*=w,h*=w}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,r,s,a){const o=n[r],l=n[r+1],c=n[r+2],u=n[r+3],h=s[a],f=s[a+1],m=s[a+2],v=s[a+3];return e[t]=o*v+u*h+l*m-c*f,e[t+1]=l*v+u*f+c*h-o*m,e[t+2]=c*v+u*m+o*f-l*h,e[t+3]=u*v-o*h-l*f-c*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t){const n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(r/2),h=o(s/2),f=l(n/2),m=l(r/2),v=l(s/2);switch(a){case"XYZ":this._x=f*u*h+c*m*v,this._y=c*m*h-f*u*v,this._z=c*u*v+f*m*h,this._w=c*u*h-f*m*v;break;case"YXZ":this._x=f*u*h+c*m*v,this._y=c*m*h-f*u*v,this._z=c*u*v-f*m*h,this._w=c*u*h+f*m*v;break;case"ZXY":this._x=f*u*h-c*m*v,this._y=c*m*h+f*u*v,this._z=c*u*v+f*m*h,this._w=c*u*h-f*m*v;break;case"ZYX":this._x=f*u*h-c*m*v,this._y=c*m*h+f*u*v,this._z=c*u*v-f*m*h,this._w=c*u*h+f*m*v;break;case"YZX":this._x=f*u*h+c*m*v,this._y=c*m*h+f*u*v,this._z=c*u*v-f*m*h,this._w=c*u*h-f*m*v;break;case"XZY":this._x=f*u*h-c*m*v,this._y=c*m*h-f*u*v,this._z=c*u*v+f*m*h,this._w=c*u*h+f*m*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t!==!1&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],h=t[10],f=n+o+h;if(f>0){const m=.5/Math.sqrt(f+1);this._w=.25/m,this._x=(u-l)*m,this._y=(s-c)*m,this._z=(a-r)*m}else if(n>o&&n>h){const m=2*Math.sqrt(1+n-o-h);this._w=(u-l)/m,this._x=.25*m,this._y=(r+a)/m,this._z=(s+c)/m}else if(o>h){const m=2*Math.sqrt(1+o-n-h);this._w=(s-c)/m,this._x=(r+a)/m,this._y=.25*m,this._z=(l+u)/m}else{const m=2*Math.sqrt(1+h-n-o);this._w=(a-r)/m,this._x=(s+c)/m,this._y=(l+u)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(wt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-n*c,this._z=s*u+a*c+n*l-r*o,this._w=a*u-n*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,r=this._y,s=this._z,a=this._w;let o=a*e._w+n*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=r,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const m=1-t;return this._w=m*a+t*this._w,this._x=m*n+t*this._x,this._y=m*r+t*this._y,this._z=m*s+t*this._z,this.normalize(),this._onChangeCallback(),this}const c=Math.sqrt(l),u=Math.atan2(c,o),h=Math.sin((1-t)*u)/c,f=Math.sin(t*u)/c;return this._w=a*h+this._w*f,this._x=n*h+this._x*f,this._y=r*h+this._y*f,this._z=s*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(r),n*Math.sin(s),n*Math.cos(s),t*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class G{constructor(e=0,t=0,n=0){G.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ra.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ra.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*n),u=2*(o*t-s*r),h=2*(s*n-a*t);return this.x=t+l*c+a*h-o*u,this.y=n+l*u+o*c-s*h,this.z=r+l*h+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-n*l,this.z=n*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ss.copy(this).projectOnVector(e),this.sub(ss)}reflect(e){return this.sub(ss.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(wt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ss=new G,ra=new zn;class Ji{constructor(e=new G(1/0,1/0,1/0),t=new G(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Kt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Kt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Kt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Kt):Kt.fromBufferAttribute(s,a),Kt.applyMatrix4(e.matrixWorld),this.expandByPoint(Kt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),rr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),rr.copy(n.boundingBox)),rr.applyMatrix4(e.matrixWorld),this.union(rr)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Kt),Kt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Bi),sr.subVectors(this.max,Bi),oi.subVectors(e.a,Bi),ai.subVectors(e.b,Bi),li.subVectors(e.c,Bi),Tn.subVectors(ai,oi),An.subVectors(li,ai),Wn.subVectors(oi,li);let t=[0,-Tn.z,Tn.y,0,-An.z,An.y,0,-Wn.z,Wn.y,Tn.z,0,-Tn.x,An.z,0,-An.x,Wn.z,0,-Wn.x,-Tn.y,Tn.x,0,-An.y,An.x,0,-Wn.y,Wn.x,0];return!os(t,oi,ai,li,sr)||(t=[1,0,0,0,1,0,0,0,1],!os(t,oi,ai,li,sr))?!1:(or.crossVectors(Tn,An),t=[or.x,or.y,or.z],os(t,oi,ai,li,sr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Kt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Kt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(dn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),dn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),dn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),dn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),dn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),dn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),dn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),dn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(dn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const dn=[new G,new G,new G,new G,new G,new G,new G,new G],Kt=new G,rr=new Ji,oi=new G,ai=new G,li=new G,Tn=new G,An=new G,Wn=new G,Bi=new G,sr=new G,or=new G,Xn=new G;function os(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){Xn.fromArray(i,s);const o=r.x*Math.abs(Xn.x)+r.y*Math.abs(Xn.y)+r.z*Math.abs(Xn.z),l=e.dot(Xn),c=t.dot(Xn),u=n.dot(Xn);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const Lu=new Ji,zi=new G,as=new G;class Qs{constructor(e=new G,t=-1){this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Lu.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;zi.subVectors(e,this.center);const t=zi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(zi,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(as.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(zi.copy(e.center).add(as)),this.expandByPoint(zi.copy(e.center).sub(as))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const fn=new G,ls=new G,ar=new G,wn=new G,cs=new G,lr=new G,us=new G;class dl{constructor(e=new G,t=new G(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,fn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=fn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(fn.copy(this.origin).addScaledVector(this.direction,t),fn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){ls.copy(e).add(t).multiplyScalar(.5),ar.copy(t).sub(e).normalize(),wn.copy(this.origin).sub(ls);const s=e.distanceTo(t)*.5,a=-this.direction.dot(ar),o=wn.dot(this.direction),l=-wn.dot(ar),c=wn.lengthSq(),u=Math.abs(1-a*a);let h,f,m,v;if(u>0)if(h=a*l-o,f=a*o-l,v=s*u,h>=0)if(f>=-v)if(f<=v){const x=1/u;h*=x,f*=x,m=h*(h+a*f+2*o)+f*(a*h+f+2*l)+c}else f=s,h=Math.max(0,-(a*f+o)),m=-h*h+f*(f+2*l)+c;else f=-s,h=Math.max(0,-(a*f+o)),m=-h*h+f*(f+2*l)+c;else f<=-v?(h=Math.max(0,-(-a*s+o)),f=h>0?-s:Math.min(Math.max(-s,-l),s),m=-h*h+f*(f+2*l)+c):f<=v?(h=0,f=Math.min(Math.max(-s,-l),s),m=f*(f+2*l)+c):(h=Math.max(0,-(a*s+o)),f=h>0?s:Math.min(Math.max(-s,-l),s),m=-h*h+f*(f+2*l)+c);else f=a>0?-s:s,h=Math.max(0,-(a*f+o)),m=-h*h+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(ls).addScaledVector(ar,f),m}intersectSphere(e,t){fn.subVectors(e.center,this.origin);const n=fn.dot(this.direction),r=fn.dot(fn)-n*n,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,r=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,r=(e.min.x-f.x)*c),u>=0?(s=(e.min.y-f.y)*u,a=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,a=(e.min.y-f.y)*u),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),h>=0?(o=(e.min.z-f.z)*h,l=(e.max.z-f.z)*h):(o=(e.max.z-f.z)*h,l=(e.min.z-f.z)*h),n>l||o>r)||((o>n||n!==n)&&(n=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,fn)!==null}intersectTriangle(e,t,n,r,s){cs.subVectors(t,e),lr.subVectors(n,e),us.crossVectors(cs,lr);let a=this.direction.dot(us),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;wn.subVectors(this.origin,e);const l=o*this.direction.dot(lr.crossVectors(wn,lr));if(l<0)return null;const c=o*this.direction.dot(cs.cross(wn));if(c<0||l+c>a)return null;const u=-o*wn.dot(us);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ct{constructor(e,t,n,r,s,a,o,l,c,u,h,f,m,v,x,p){Ct.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c,u,h,f,m,v,x,p)}set(e,t,n,r,s,a,o,l,c,u,h,f,m,v,x,p){const d=this.elements;return d[0]=e,d[4]=t,d[8]=n,d[12]=r,d[1]=s,d[5]=a,d[9]=o,d[13]=l,d[2]=c,d[6]=u,d[10]=h,d[14]=f,d[3]=m,d[7]=v,d[11]=x,d[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ct().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,r=1/ci.setFromMatrixColumn(e,0).length(),s=1/ci.setFromMatrixColumn(e,1).length(),a=1/ci.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const f=a*u,m=a*h,v=o*u,x=o*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=m+v*c,t[5]=f-x*c,t[9]=-o*l,t[2]=x-f*c,t[6]=v+m*c,t[10]=a*l}else if(e.order==="YXZ"){const f=l*u,m=l*h,v=c*u,x=c*h;t[0]=f+x*o,t[4]=v*o-m,t[8]=a*c,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=m*o-v,t[6]=x+f*o,t[10]=a*l}else if(e.order==="ZXY"){const f=l*u,m=l*h,v=c*u,x=c*h;t[0]=f-x*o,t[4]=-a*h,t[8]=v+m*o,t[1]=m+v*o,t[5]=a*u,t[9]=x-f*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const f=a*u,m=a*h,v=o*u,x=o*h;t[0]=l*u,t[4]=v*c-m,t[8]=f*c+x,t[1]=l*h,t[5]=x*c+f,t[9]=m*c-v,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const f=a*l,m=a*c,v=o*l,x=o*c;t[0]=l*u,t[4]=x-f*h,t[8]=v*h+m,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=m*h+v,t[10]=f-x*h}else if(e.order==="XZY"){const f=a*l,m=a*c,v=o*l,x=o*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=f*h+x,t[5]=a*u,t[9]=m*h-v,t[2]=v*h-m,t[6]=o*u,t[10]=x*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Du,e,Uu)}lookAt(e,t,n){const r=this.elements;return zt.subVectors(e,t),zt.lengthSq()===0&&(zt.z=1),zt.normalize(),Rn.crossVectors(n,zt),Rn.lengthSq()===0&&(Math.abs(n.z)===1?zt.x+=1e-4:zt.z+=1e-4,zt.normalize(),Rn.crossVectors(n,zt)),Rn.normalize(),cr.crossVectors(zt,Rn),r[0]=Rn.x,r[4]=cr.x,r[8]=zt.x,r[1]=Rn.y,r[5]=cr.y,r[9]=zt.y,r[2]=Rn.z,r[6]=cr.z,r[10]=zt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],h=n[5],f=n[9],m=n[13],v=n[2],x=n[6],p=n[10],d=n[14],b=n[3],E=n[7],C=n[11],w=n[15],N=r[0],I=r[4],k=r[8],M=r[12],P=r[1],j=r[5],J=r[9],oe=r[13],B=r[2],Y=r[6],te=r[10],Z=r[14],ce=r[3],Q=r[7],ne=r[11],he=r[15];return s[0]=a*N+o*P+l*B+c*ce,s[4]=a*I+o*j+l*Y+c*Q,s[8]=a*k+o*J+l*te+c*ne,s[12]=a*M+o*oe+l*Z+c*he,s[1]=u*N+h*P+f*B+m*ce,s[5]=u*I+h*j+f*Y+m*Q,s[9]=u*k+h*J+f*te+m*ne,s[13]=u*M+h*oe+f*Z+m*he,s[2]=v*N+x*P+p*B+d*ce,s[6]=v*I+x*j+p*Y+d*Q,s[10]=v*k+x*J+p*te+d*ne,s[14]=v*M+x*oe+p*Z+d*he,s[3]=b*N+E*P+C*B+w*ce,s[7]=b*I+E*j+C*Y+w*Q,s[11]=b*k+E*J+C*te+w*ne,s[15]=b*M+E*oe+C*Z+w*he,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],h=e[6],f=e[10],m=e[14],v=e[3],x=e[7],p=e[11],d=e[15];return v*(+s*l*h-r*c*h-s*o*f+n*c*f+r*o*m-n*l*m)+x*(+t*l*m-t*c*f+s*a*f-r*a*m+r*c*u-s*l*u)+p*(+t*c*h-t*o*m-s*a*h+n*a*m+s*o*u-n*c*u)+d*(-r*o*u-t*l*h+t*o*f+r*a*h-n*a*f+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=e[9],f=e[10],m=e[11],v=e[12],x=e[13],p=e[14],d=e[15],b=h*p*c-x*f*c+x*l*m-o*p*m-h*l*d+o*f*d,E=v*f*c-u*p*c-v*l*m+a*p*m+u*l*d-a*f*d,C=u*x*c-v*h*c+v*o*m-a*x*m-u*o*d+a*h*d,w=v*h*l-u*x*l-v*o*f+a*x*f+u*o*p-a*h*p,N=t*b+n*E+r*C+s*w;if(N===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const I=1/N;return e[0]=b*I,e[1]=(x*f*s-h*p*s-x*r*m+n*p*m+h*r*d-n*f*d)*I,e[2]=(o*p*s-x*l*s+x*r*c-n*p*c-o*r*d+n*l*d)*I,e[3]=(h*l*s-o*f*s-h*r*c+n*f*c+o*r*m-n*l*m)*I,e[4]=E*I,e[5]=(u*p*s-v*f*s+v*r*m-t*p*m-u*r*d+t*f*d)*I,e[6]=(v*l*s-a*p*s-v*r*c+t*p*c+a*r*d-t*l*d)*I,e[7]=(a*f*s-u*l*s+u*r*c-t*f*c-a*r*m+t*l*m)*I,e[8]=C*I,e[9]=(v*h*s-u*x*s-v*n*m+t*x*m+u*n*d-t*h*d)*I,e[10]=(a*x*s-v*o*s+v*n*c-t*x*c-a*n*d+t*o*d)*I,e[11]=(u*o*s-a*h*s-u*n*c+t*h*c+a*n*m-t*o*m)*I,e[12]=w*I,e[13]=(u*x*r-v*h*r+v*n*f-t*x*f-u*n*p+t*h*p)*I,e[14]=(v*o*r-a*x*r-v*n*l+t*x*l+a*n*p-t*o*p)*I,e[15]=(a*h*r-u*o*r+u*n*l-t*h*l-a*n*f+t*o*f)*I,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+n,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+n,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,h=o+o,f=s*c,m=s*u,v=s*h,x=a*u,p=a*h,d=o*h,b=l*c,E=l*u,C=l*h,w=n.x,N=n.y,I=n.z;return r[0]=(1-(x+d))*w,r[1]=(m+C)*w,r[2]=(v-E)*w,r[3]=0,r[4]=(m-C)*N,r[5]=(1-(f+d))*N,r[6]=(p+b)*N,r[7]=0,r[8]=(v+E)*I,r[9]=(p-b)*I,r[10]=(1-(f+x))*I,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;let s=ci.set(r[0],r[1],r[2]).length();const a=ci.set(r[4],r[5],r[6]).length(),o=ci.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Jt.copy(this);const c=1/s,u=1/a,h=1/o;return Jt.elements[0]*=c,Jt.elements[1]*=c,Jt.elements[2]*=c,Jt.elements[4]*=u,Jt.elements[5]*=u,Jt.elements[6]*=u,Jt.elements[8]*=h,Jt.elements[9]*=h,Jt.elements[10]*=h,t.setFromRotationMatrix(Jt),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,r,s,a,o=Sn){const l=this.elements,c=2*s/(t-e),u=2*s/(n-r),h=(t+e)/(t-e),f=(n+r)/(n-r);let m,v;if(o===Sn)m=-(a+s)/(a-s),v=-2*a*s/(a-s);else if(o===Nr)m=-a/(a-s),v=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=Sn){const l=this.elements,c=1/(t-e),u=1/(n-r),h=1/(a-s),f=(t+e)*c,m=(n+r)*u;let v,x;if(o===Sn)v=(a+s)*h,x=-2*h;else if(o===Nr)v=s*h,x=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=x,l[14]=-v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const ci=new G,Jt=new Ct,Du=new G(0,0,0),Uu=new G(1,1,1),Rn=new G,cr=new G,zt=new G,sa=new Ct,oa=new zn;class Hr{constructor(e=0,t=0,n=0,r=Hr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],h=r[2],f=r[6],m=r[10];switch(t){case"XYZ":this._y=Math.asin(wt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,m),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-wt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(wt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,m),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-wt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,m),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(wt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-wt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return sa.makeRotationFromQuaternion(e),this.setFromRotationMatrix(sa,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return oa.setFromEuler(this),this.setFromQuaternion(oa,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Hr.DEFAULT_ORDER="XYZ";class fl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Iu=0;const aa=new G,ui=new zn,pn=new Ct,ur=new G,Gi=new G,Nu=new G,Ou=new zn,la=new G(1,0,0),ca=new G(0,1,0),ua=new G(0,0,1),Fu={type:"added"},Bu={type:"removed"};class Wt extends Hn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Iu++}),this.uuid=Ui(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Wt.DEFAULT_UP.clone();const e=new G,t=new Hr,n=new zn,r=new G(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Ct},normalMatrix:{value:new Qe}}),this.matrix=new Ct,this.matrixWorld=new Ct,this.matrixAutoUpdate=Wt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Wt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new fl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ui.setFromAxisAngle(e,t),this.quaternion.multiply(ui),this}rotateOnWorldAxis(e,t){return ui.setFromAxisAngle(e,t),this.quaternion.premultiply(ui),this}rotateX(e){return this.rotateOnAxis(la,e)}rotateY(e){return this.rotateOnAxis(ca,e)}rotateZ(e){return this.rotateOnAxis(ua,e)}translateOnAxis(e,t){return aa.copy(e).applyQuaternion(this.quaternion),this.position.add(aa.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(la,e)}translateY(e){return this.translateOnAxis(ca,e)}translateZ(e){return this.translateOnAxis(ua,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(pn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ur.copy(e):ur.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Gi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?pn.lookAt(Gi,ur,this.up):pn.lookAt(ur,Gi,this.up),this.quaternion.setFromRotationMatrix(pn),r&&(pn.extractRotation(r.matrixWorld),ui.setFromRotationMatrix(pn),this.quaternion.premultiply(ui.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Fu)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Bu)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),pn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),pn.multiply(e.parent.matrixWorld)),e.applyMatrix4(pn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gi,e,Nu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gi,Ou,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++){const s=t[n];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++){const o=r[s];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),h=a(e.shapes),f=a(e.skeletons),m=a(e.animations),v=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),m.length>0&&(n.animations=m),v.length>0&&(n.nodes=v)}return n.object=r,n;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}Wt.DEFAULT_UP=new G(0,1,0);Wt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Wt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Qt=new G,mn=new G,hs=new G,gn=new G,hi=new G,di=new G,ha=new G,ds=new G,fs=new G,ps=new G;let hr=!1;class tn{constructor(e=new G,t=new G,n=new G){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Qt.subVectors(e,t),r.cross(Qt);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){Qt.subVectors(r,t),mn.subVectors(n,t),hs.subVectors(e,t);const a=Qt.dot(Qt),o=Qt.dot(mn),l=Qt.dot(hs),c=mn.dot(mn),u=mn.dot(hs),h=a*c-o*o;if(h===0)return s.set(-2,-1,-1);const f=1/h,m=(c*l-o*u)*f,v=(a*u-o*l)*f;return s.set(1-m-v,v,m)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,gn),gn.x>=0&&gn.y>=0&&gn.x+gn.y<=1}static getUV(e,t,n,r,s,a,o,l){return hr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),hr=!0),this.getInterpolation(e,t,n,r,s,a,o,l)}static getInterpolation(e,t,n,r,s,a,o,l){return this.getBarycoord(e,t,n,r,gn),l.setScalar(0),l.addScaledVector(s,gn.x),l.addScaledVector(a,gn.y),l.addScaledVector(o,gn.z),l}static isFrontFacing(e,t,n,r){return Qt.subVectors(n,t),mn.subVectors(e,t),Qt.cross(mn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Qt.subVectors(this.c,this.b),mn.subVectors(this.a,this.b),Qt.cross(mn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return tn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return tn.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,r,s){return hr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),hr=!0),tn.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}getInterpolation(e,t,n,r,s){return tn.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return tn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return tn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let a,o;hi.subVectors(r,n),di.subVectors(s,n),ds.subVectors(e,n);const l=hi.dot(ds),c=di.dot(ds);if(l<=0&&c<=0)return t.copy(n);fs.subVectors(e,r);const u=hi.dot(fs),h=di.dot(fs);if(u>=0&&h<=u)return t.copy(r);const f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(hi,a);ps.subVectors(e,s);const m=hi.dot(ps),v=di.dot(ps);if(v>=0&&m<=v)return t.copy(s);const x=m*c-l*v;if(x<=0&&c>=0&&v<=0)return o=c/(c-v),t.copy(n).addScaledVector(di,o);const p=u*v-m*h;if(p<=0&&h-u>=0&&m-v>=0)return ha.subVectors(s,r),o=(h-u)/(h-u+(m-v)),t.copy(r).addScaledVector(ha,o);const d=1/(p+x+f);return a=x*d,o=f*d,t.copy(n).addScaledVector(hi,a).addScaledVector(di,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const pl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Cn={h:0,s:0,l:0},dr={h:0,s:0,l:0};function ms(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class ot{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Tt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,st.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=st.workingColorSpace){return this.r=e,this.g=t,this.b=n,st.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=st.workingColorSpace){if(e=Js(e,1),t=wt(t,0,1),n=wt(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=ms(a,s,e+1/3),this.g=ms(a,s,e),this.b=ms(a,s,e-1/3)}return st.toWorkingColorSpace(this,r),this}setStyle(e,t=Tt){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Tt){const n=pl[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=bi(e.r),this.g=bi(e.g),this.b=bi(e.b),this}copyLinearToSRGB(e){return this.r=is(e.r),this.g=is(e.g),this.b=is(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Tt){return st.fromWorkingColorSpace(Dt.copy(this),e),Math.round(wt(Dt.r*255,0,255))*65536+Math.round(wt(Dt.g*255,0,255))*256+Math.round(wt(Dt.b*255,0,255))}getHexString(e=Tt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=st.workingColorSpace){st.fromWorkingColorSpace(Dt.copy(this),t);const n=Dt.r,r=Dt.g,s=Dt.b,a=Math.max(n,r,s),o=Math.min(n,r,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=u<=.5?h/(a+o):h/(2-a-o),a){case n:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-n)/h+2;break;case s:l=(n-r)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=st.workingColorSpace){return st.fromWorkingColorSpace(Dt.copy(this),t),e.r=Dt.r,e.g=Dt.g,e.b=Dt.b,e}getStyle(e=Tt){st.fromWorkingColorSpace(Dt.copy(this),e);const t=Dt.r,n=Dt.g,r=Dt.b;return e!==Tt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(Cn),this.setHSL(Cn.h+e,Cn.s+t,Cn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Cn),e.getHSL(dr);const n=Wi(Cn.h,dr.h,t),r=Wi(Cn.s,dr.s,t),s=Wi(Cn.l,dr.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Dt=new ot;ot.NAMES=pl;let zu=0;class kr extends Hn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:zu++}),this.uuid=Ui(),this.name="",this.type="Material",this.blending=yi,this.side=Bn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ns,this.blendDst=Os,this.blendEquation=jn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ot(0,0,0),this.blendAlpha=0,this.depthFunc=Pr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ko,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ri,this.stencilZFail=ri,this.stencilZPass=ri,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==yi&&(n.blending=this.blending),this.side!==Bn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ns&&(n.blendSrc=this.blendSrc),this.blendDst!==Os&&(n.blendDst=this.blendDst),this.blendEquation!==jn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Pr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ko&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ri&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ri&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ri&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class ml extends kr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ot(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Za,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const xn=Gu();function Gu(){const i=new ArrayBuffer(4),e=new Float32Array(i),t=new Uint32Array(i),n=new Uint32Array(512),r=new Uint32Array(512);for(let l=0;l<256;++l){const c=l-127;c<-27?(n[l]=0,n[l|256]=32768,r[l]=24,r[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,r[l]=-c-1,r[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,r[l]=13,r[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,r[l]=24,r[l|256]=24):(n[l]=31744,n[l|256]=64512,r[l]=13,r[l|256]=13)}const s=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,u=0;for(;!(c&8388608);)c<<=1,u-=8388608;c&=-8388609,u+=947912704,s[l]=c|u}for(let l=1024;l<2048;++l)s[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)a[l]=l<<23;a[31]=1199570944,a[32]=2147483648;for(let l=33;l<63;++l)a[l]=2147483648+(l-32<<23);a[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(o[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:r,mantissaTable:s,exponentTable:a,offsetTable:o}}function Hu(i){Math.abs(i)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),i=wt(i,-65504,65504),xn.floatView[0]=i;const e=xn.uint32View[0],t=e>>23&511;return xn.baseTable[t]+((e&8388607)>>xn.shiftTable[t])}function ku(i){const e=i>>10;return xn.uint32View[0]=xn.mantissaTable[xn.offsetTable[e]+(i&1023)]+xn.exponentTable[e],xn.floatView[0]}const da={toHalfFloat:Hu,fromHalfFloat:ku},_t=new G,fr=new Ve;class rn{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Jo,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=nn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn('THREE.BufferAttribute: "updateRange" is deprecated and removed in r169. Use "addUpdateRange()" instead.'),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)fr.fromBufferAttribute(this,t),fr.applyMatrix3(e),this.setXY(t,fr.x,fr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)_t.fromBufferAttribute(this,t),_t.applyMatrix3(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)_t.fromBufferAttribute(this,t),_t.applyMatrix4(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)_t.fromBufferAttribute(this,t),_t.applyNormalMatrix(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)_t.fromBufferAttribute(this,t),_t.transformDirection(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Si(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=It(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Si(t,this.array)),t}setX(e,t){return this.normalized&&(t=It(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Si(t,this.array)),t}setY(e,t){return this.normalized&&(t=It(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Si(t,this.array)),t}setZ(e,t){return this.normalized&&(t=It(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Si(t,this.array)),t}setW(e,t){return this.normalized&&(t=It(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=It(t,this.array),n=It(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=It(t,this.array),n=It(n,this.array),r=It(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=It(t,this.array),n=It(n,this.array),r=It(r,this.array),s=It(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Jo&&(e.usage=this.usage),e}}class gl extends rn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class _l extends rn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class ei extends rn{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Vu=0;const Yt=new Ct,gs=new Wt,fi=new G,Gt=new Ji,Hi=new Ji,Et=new G;class ni extends Hn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Vu++}),this.uuid=Ui(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ll(e)?_l:gl)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Qe().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Yt.makeRotationFromQuaternion(e),this.applyMatrix4(Yt),this}rotateX(e){return Yt.makeRotationX(e),this.applyMatrix4(Yt),this}rotateY(e){return Yt.makeRotationY(e),this.applyMatrix4(Yt),this}rotateZ(e){return Yt.makeRotationZ(e),this.applyMatrix4(Yt),this}translate(e,t,n){return Yt.makeTranslation(e,t,n),this.applyMatrix4(Yt),this}scale(e,t,n){return Yt.makeScale(e,t,n),this.applyMatrix4(Yt),this}lookAt(e){return gs.lookAt(e),gs.updateMatrix(),this.applyMatrix4(gs.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(fi).negate(),this.translate(fi.x,fi.y,fi.z),this}setFromPoints(e){const t=[];for(let n=0,r=e.length;n<r;n++){const s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new ei(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ji);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new G(-1/0,-1/0,-1/0),new G(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];Gt.setFromBufferAttribute(s),this.morphTargetsRelative?(Et.addVectors(this.boundingBox.min,Gt.min),this.boundingBox.expandByPoint(Et),Et.addVectors(this.boundingBox.max,Gt.max),this.boundingBox.expandByPoint(Et)):(this.boundingBox.expandByPoint(Gt.min),this.boundingBox.expandByPoint(Gt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Qs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new G,1/0);return}if(e){const n=this.boundingSphere.center;if(Gt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Hi.setFromBufferAttribute(o),this.morphTargetsRelative?(Et.addVectors(Gt.min,Hi.min),Gt.expandByPoint(Et),Et.addVectors(Gt.max,Hi.max),Gt.expandByPoint(Et)):(Gt.expandByPoint(Hi.min),Gt.expandByPoint(Hi.max))}Gt.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)Et.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Et));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Et.fromBufferAttribute(o,c),l&&(fi.fromBufferAttribute(e,c),Et.add(fi)),r=Math.max(r,n.distanceToSquared(Et))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,r=t.position.array,s=t.normal.array,a=t.uv.array,o=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new rn(new Float32Array(4*o),4));const l=this.getAttribute("tangent").array,c=[],u=[];for(let P=0;P<o;P++)c[P]=new G,u[P]=new G;const h=new G,f=new G,m=new G,v=new Ve,x=new Ve,p=new Ve,d=new G,b=new G;function E(P,j,J){h.fromArray(r,P*3),f.fromArray(r,j*3),m.fromArray(r,J*3),v.fromArray(a,P*2),x.fromArray(a,j*2),p.fromArray(a,J*2),f.sub(h),m.sub(h),x.sub(v),p.sub(v);const oe=1/(x.x*p.y-p.x*x.y);isFinite(oe)&&(d.copy(f).multiplyScalar(p.y).addScaledVector(m,-x.y).multiplyScalar(oe),b.copy(m).multiplyScalar(x.x).addScaledVector(f,-p.x).multiplyScalar(oe),c[P].add(d),c[j].add(d),c[J].add(d),u[P].add(b),u[j].add(b),u[J].add(b))}let C=this.groups;C.length===0&&(C=[{start:0,count:n.length}]);for(let P=0,j=C.length;P<j;++P){const J=C[P],oe=J.start,B=J.count;for(let Y=oe,te=oe+B;Y<te;Y+=3)E(n[Y+0],n[Y+1],n[Y+2])}const w=new G,N=new G,I=new G,k=new G;function M(P){I.fromArray(s,P*3),k.copy(I);const j=c[P];w.copy(j),w.sub(I.multiplyScalar(I.dot(j))).normalize(),N.crossVectors(k,j);const oe=N.dot(u[P])<0?-1:1;l[P*4]=w.x,l[P*4+1]=w.y,l[P*4+2]=w.z,l[P*4+3]=oe}for(let P=0,j=C.length;P<j;++P){const J=C[P],oe=J.start,B=J.count;for(let Y=oe,te=oe+B;Y<te;Y+=3)M(n[Y+0]),M(n[Y+1]),M(n[Y+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new rn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,m=n.count;f<m;f++)n.setXYZ(f,0,0,0);const r=new G,s=new G,a=new G,o=new G,l=new G,c=new G,u=new G,h=new G;if(e)for(let f=0,m=e.count;f<m;f+=3){const v=e.getX(f+0),x=e.getX(f+1),p=e.getX(f+2);r.fromBufferAttribute(t,v),s.fromBufferAttribute(t,x),a.fromBufferAttribute(t,p),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),o.fromBufferAttribute(n,v),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,p),o.add(u),l.add(u),c.add(u),n.setXYZ(v,o.x,o.y,o.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let f=0,m=t.count;f<m;f+=3)r.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Et.fromBufferAttribute(e,t),Et.normalize(),e.setXYZ(t,Et.x,Et.y,Et.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,h=o.normalized,f=new c.constructor(l.length*u);let m=0,v=0;for(let x=0,p=l.length;x<p;x++){o.isInterleavedBufferAttribute?m=l[x]*o.data.stride+o.offset:m=l[x]*u;for(let d=0;d<u;d++)f[v++]=c[m++]}return new rn(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new ni,n=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,n);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,h=c.length;u<h;u++){const f=c[u],m=e(f,n);l.push(m)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){const m=c[h];u.push(m.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],h=s[c];for(let f=0,m=h.length;f<m;f++)u.push(h[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const fa=new Ct,Yn=new dl,pr=new Qs,pa=new G,pi=new G,mi=new G,gi=new G,_s=new G,mr=new G,gr=new Ve,_r=new Ve,vr=new Ve,ma=new G,ga=new G,_a=new G,xr=new G,Er=new G;class Mn extends Wt{constructor(e=new ni,t=new ml){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){mr.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],h=s[l];u!==0&&(_s.fromBufferAttribute(h,e),a?mr.addScaledVector(_s,u):mr.addScaledVector(_s.sub(t),u))}t.add(mr)}return t}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),pr.copy(n.boundingSphere),pr.applyMatrix4(s),Yn.copy(e.ray).recast(e.near),!(pr.containsPoint(Yn.origin)===!1&&(Yn.intersectSphere(pr,pa)===null||Yn.origin.distanceToSquared(pa)>(e.far-e.near)**2))&&(fa.copy(s).invert(),Yn.copy(e.ray).applyMatrix4(fa),!(n.boundingBox!==null&&Yn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Yn)))}_computeIntersections(e,t,n){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,f=s.groups,m=s.drawRange;if(o!==null)if(Array.isArray(a))for(let v=0,x=f.length;v<x;v++){const p=f[v],d=a[p.materialIndex],b=Math.max(p.start,m.start),E=Math.min(o.count,Math.min(p.start+p.count,m.start+m.count));for(let C=b,w=E;C<w;C+=3){const N=o.getX(C),I=o.getX(C+1),k=o.getX(C+2);r=Sr(this,d,e,n,c,u,h,N,I,k),r&&(r.faceIndex=Math.floor(C/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const v=Math.max(0,m.start),x=Math.min(o.count,m.start+m.count);for(let p=v,d=x;p<d;p+=3){const b=o.getX(p),E=o.getX(p+1),C=o.getX(p+2);r=Sr(this,a,e,n,c,u,h,b,E,C),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let v=0,x=f.length;v<x;v++){const p=f[v],d=a[p.materialIndex],b=Math.max(p.start,m.start),E=Math.min(l.count,Math.min(p.start+p.count,m.start+m.count));for(let C=b,w=E;C<w;C+=3){const N=C,I=C+1,k=C+2;r=Sr(this,d,e,n,c,u,h,N,I,k),r&&(r.faceIndex=Math.floor(C/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const v=Math.max(0,m.start),x=Math.min(l.count,m.start+m.count);for(let p=v,d=x;p<d;p+=3){const b=p,E=p+1,C=p+2;r=Sr(this,a,e,n,c,u,h,b,E,C),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}}}function Wu(i,e,t,n,r,s,a,o){let l;if(e.side===Ft?l=n.intersectTriangle(a,s,r,!0,o):l=n.intersectTriangle(r,s,a,e.side===Bn,o),l===null)return null;Er.copy(o),Er.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Er);return c<t.near||c>t.far?null:{distance:c,point:Er.clone(),object:i}}function Sr(i,e,t,n,r,s,a,o,l,c){i.getVertexPosition(o,pi),i.getVertexPosition(l,mi),i.getVertexPosition(c,gi);const u=Wu(i,e,t,n,pi,mi,gi,xr);if(u){r&&(gr.fromBufferAttribute(r,o),_r.fromBufferAttribute(r,l),vr.fromBufferAttribute(r,c),u.uv=tn.getInterpolation(xr,pi,mi,gi,gr,_r,vr,new Ve)),s&&(gr.fromBufferAttribute(s,o),_r.fromBufferAttribute(s,l),vr.fromBufferAttribute(s,c),u.uv1=tn.getInterpolation(xr,pi,mi,gi,gr,_r,vr,new Ve),u.uv2=u.uv1),a&&(ma.fromBufferAttribute(a,o),ga.fromBufferAttribute(a,l),_a.fromBufferAttribute(a,c),u.normal=tn.getInterpolation(xr,pi,mi,gi,ma,ga,_a,new G),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new G,materialIndex:0};tn.getNormal(pi,mi,gi,h.normal),u.face=h}return u}class Qi extends ni{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],h=[];let f=0,m=0;v("z","y","x",-1,-1,n,t,e,a,s,0),v("z","y","x",1,-1,n,t,-e,a,s,1),v("x","z","y",1,1,e,n,t,r,a,2),v("x","z","y",1,-1,e,n,-t,r,a,3),v("x","y","z",1,-1,e,t,n,r,s,4),v("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new ei(c,3)),this.setAttribute("normal",new ei(u,3)),this.setAttribute("uv",new ei(h,2));function v(x,p,d,b,E,C,w,N,I,k,M){const P=C/I,j=w/k,J=C/2,oe=w/2,B=N/2,Y=I+1,te=k+1;let Z=0,ce=0;const Q=new G;for(let ne=0;ne<te;ne++){const he=ne*j-oe;for(let xe=0;xe<Y;xe++){const q=xe*P-J;Q[x]=q*b,Q[p]=he*E,Q[d]=B,c.push(Q.x,Q.y,Q.z),Q[x]=0,Q[p]=0,Q[d]=N>0?1:-1,u.push(Q.x,Q.y,Q.z),h.push(xe/I),h.push(1-ne/k),Z+=1}}for(let ne=0;ne<k;ne++)for(let he=0;he<I;he++){const xe=f+he+Y*ne,q=f+he+Y*(ne+1),ie=f+(he+1)+Y*(ne+1),Ee=f+(he+1)+Y*ne;l.push(xe,q,Ee),l.push(q,ie,Ee),ce+=6}o.addGroup(m,ce,M),m+=ce,f+=Z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qi(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Pi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function Nt(i){const e={};for(let t=0;t<i.length;t++){const n=Pi(i[t]);for(const r in n)e[r]=n[r]}return e}function Xu(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function vl(i){return i.getRenderTarget()===null?i.outputColorSpace:st.workingColorSpace}const Yu={clone:Pi,merge:Nt};var qu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,$u=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Gn extends kr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=qu,this.fragmentShader=$u,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Pi(e.uniforms),this.uniformsGroups=Xu(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class xl extends Wt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ct,this.projectionMatrix=new Ct,this.projectionMatrixInverse=new Ct,this.coordinateSystem=Sn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class $t extends xl{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ji*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Vi*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ji*2*Math.atan(Math.tan(Vi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Vi*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*n/c,r*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const _i=-90,vi=1;class ju extends Wt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new $t(_i,vi,e,t);r.layers=this.layers,this.add(r);const s=new $t(_i,vi,e,t);s.layers=this.layers,this.add(s);const a=new $t(_i,vi,e,t);a.layers=this.layers,this.add(a);const o=new $t(_i,vi,e,t);o.layers=this.layers,this.add(o);const l=new $t(_i,vi,e,t);l.layers=this.layers,this.add(l);const c=new $t(_i,vi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===Sn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Nr)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,s),e.setRenderTarget(n,1,r),e.render(t,a),e.setRenderTarget(n,2,r),e.render(t,o),e.setRenderTarget(n,3,r),e.render(t,l),e.setRenderTarget(n,4,r),e.render(t,c),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,r),e.render(t,u),e.setRenderTarget(h,f,m),e.xr.enabled=v,n.texture.needsPMREMUpdate=!0}}class El extends Bt{constructor(e,t,n,r,s,a,o,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:Ai,super(e,t,n,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Zu extends ti{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];t.encoding!==void 0&&(Xi("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Qn?Tt:Vt),this.texture=new El(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:At}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Qi(5,5,5),s=new Gn({name:"CubemapFromEquirect",uniforms:Pi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ft,blending:Nn});s.uniforms.tEquirect.value=t;const a=new Mn(r,s),o=t.minFilter;return t.minFilter===Ri&&(t.minFilter=At),new ju(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,r){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}}const vs=new G,Ku=new G,Ju=new Qe;class Dn{constructor(e=new G(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=vs.subVectors(n,t).cross(Ku.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(vs),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Ju.getNormalMatrix(e),r=this.coplanarPoint(vs).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const qn=new Qs,Mr=new G;class Sl{constructor(e=new Dn,t=new Dn,n=new Dn,r=new Dn,s=new Dn,a=new Dn){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Sn){const n=this.planes,r=e.elements,s=r[0],a=r[1],o=r[2],l=r[3],c=r[4],u=r[5],h=r[6],f=r[7],m=r[8],v=r[9],x=r[10],p=r[11],d=r[12],b=r[13],E=r[14],C=r[15];if(n[0].setComponents(l-s,f-c,p-m,C-d).normalize(),n[1].setComponents(l+s,f+c,p+m,C+d).normalize(),n[2].setComponents(l+a,f+u,p+v,C+b).normalize(),n[3].setComponents(l-a,f-u,p-v,C-b).normalize(),n[4].setComponents(l-o,f-h,p-x,C-E).normalize(),t===Sn)n[5].setComponents(l+o,f+h,p+x,C+E).normalize();else if(t===Nr)n[5].setComponents(o,h,x,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),qn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),qn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(qn)}intersectsSprite(e){return qn.center.set(0,0,0),qn.radius=.7071067811865476,qn.applyMatrix4(e.matrixWorld),this.intersectsSphere(qn)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(Mr.x=r.normal.x>0?e.max.x:e.min.x,Mr.y=r.normal.y>0?e.max.y:e.min.y,Mr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Mr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Ml(){let i=null,e=!1,t=null,n=null;function r(s,a){t(s,a),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function Qu(i,e){const t=e.isWebGL2,n=new WeakMap;function r(c,u){const h=c.array,f=c.usage,m=h.byteLength,v=i.createBuffer();i.bindBuffer(u,v),i.bufferData(u,h,f),c.onUploadCallback();let x;if(h instanceof Float32Array)x=i.FLOAT;else if(h instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)x=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else x=i.UNSIGNED_SHORT;else if(h instanceof Int16Array)x=i.SHORT;else if(h instanceof Uint32Array)x=i.UNSIGNED_INT;else if(h instanceof Int32Array)x=i.INT;else if(h instanceof Int8Array)x=i.BYTE;else if(h instanceof Uint8Array)x=i.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)x=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:v,type:x,bytesPerElement:h.BYTES_PER_ELEMENT,version:c.version,size:m}}function s(c,u,h){const f=u.array,m=u._updateRange,v=u.updateRanges;if(i.bindBuffer(h,c),m.count===-1&&v.length===0&&i.bufferSubData(h,0,f),v.length!==0){for(let x=0,p=v.length;x<p;x++){const d=v[x];t?i.bufferSubData(h,d.start*f.BYTES_PER_ELEMENT,f,d.start,d.count):i.bufferSubData(h,d.start*f.BYTES_PER_ELEMENT,f.subarray(d.start,d.start+d.count))}u.clearUpdateRanges()}m.count!==-1&&(t?i.bufferSubData(h,m.offset*f.BYTES_PER_ELEMENT,f,m.offset,m.count):i.bufferSubData(h,m.offset*f.BYTES_PER_ELEMENT,f.subarray(m.offset,m.offset+m.count)),m.count=-1),u.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=n.get(c);u&&(i.deleteBuffer(u.buffer),n.delete(c))}function l(c,u){if(c.isGLBufferAttribute){const f=n.get(c);(!f||f.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);if(h===void 0)n.set(c,r(c,u));else if(h.version<c.version){if(h.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(h.buffer,c,u),h.version=c.version}}return{get:a,remove:o,update:l}}class Vr extends ni{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(r),c=o+1,u=l+1,h=e/o,f=t/l,m=[],v=[],x=[],p=[];for(let d=0;d<u;d++){const b=d*f-a;for(let E=0;E<c;E++){const C=E*h-s;v.push(C,-b,0),x.push(0,0,1),p.push(E/o),p.push(1-d/l)}}for(let d=0;d<l;d++)for(let b=0;b<o;b++){const E=b+c*d,C=b+c*(d+1),w=b+1+c*(d+1),N=b+1+c*d;m.push(E,C,N),m.push(C,w,N)}this.setIndex(m),this.setAttribute("position",new ei(v,3)),this.setAttribute("normal",new ei(x,3)),this.setAttribute("uv",new ei(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vr(e.width,e.height,e.widthSegments,e.heightSegments)}}var eh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,th=`#ifdef USE_ALPHAHASH
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
#endif`,nh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ih=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,rh=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,sh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,oh=`#ifdef USE_AOMAP
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
#endif`,ah=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,lh=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
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
#endif`,ch=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,uh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,hh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,dh=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,fh=`#ifdef USE_IRIDESCENCE
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
#endif`,ph=`#ifdef USE_BUMPMAP
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
#endif`,mh=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
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
#endif`,gh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,_h=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,vh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,xh=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Eh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Sh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Mh=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,yh=`#define PI 3.141592653589793
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
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
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
} // validated`,bh=`#ifdef ENVMAP_TYPE_CUBE_UV
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
	#define cubeUV_v0 0.339
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_v1 0.276
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_v4 0.046
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_v5 0.016
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_v6 0.0038
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
#endif`,Th=`vec3 transformedNormal = objectNormal;
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
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Ah=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,wh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Rh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ch=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ph="gl_FragColor = linearToOutputTexel( gl_FragColor );",Lh=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,Dh=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Uh=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Ih=`#ifdef USE_ENVMAP
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
#endif`,Nh=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Oh=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Fh=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Bh=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,zh=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Gh=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Hh=`#ifdef USE_GRADIENTMAP
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
}`,kh=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Vh=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Wh=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Xh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Yh=`uniform bool receiveShadow;
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
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
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
#endif`,qh=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
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
	#endif
#endif`,$h=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,jh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Zh=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Kh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Jh=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
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
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
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
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
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
#endif`,Qh=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
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
		vec3 iridescenceF0;
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
		float v = 0.5 / ( gv + gl );
		return saturate(v);
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
	vec3 f0 = material.specularColor;
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
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
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
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
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
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
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
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,ed=`
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
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
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
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
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
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,td=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,nd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,id=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,rd=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,sd=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,od=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,ad=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ld=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,cd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,ud=`#if defined( USE_POINTS_UV )
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
#endif`,hd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,dd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,fd=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,pd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,md=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,gd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,_d=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
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
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,vd=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,xd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ed=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Sd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Md=`#ifdef USE_NORMALMAP
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
#endif`,yd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,bd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Td=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ad=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,wd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Rd=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Cd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Pd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ld=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Dd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ud=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Id=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Nd=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,Od=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
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
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Fd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
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
#endif`,Bd=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,zd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Gd=`#ifdef USE_SKINNING
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
#endif`,Hd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,kd=`#ifdef USE_SKINNING
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
#endif`,Vd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Wd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Xd=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Yd=`#ifndef saturate
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
vec3 OptimizedCineonToneMapping( vec3 color ) {
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,qd=`#ifdef USE_TRANSMISSION
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
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,$d=`#ifdef USE_TRANSMISSION
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
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,jd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Zd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Kd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Jd=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Qd=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ef=`uniform sampler2D t2D;
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
}`,tf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,nf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,sf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,of=`#include <common>
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
}`,af=`#if DEPTH_PACKING == 3200
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,lf=`#define DISTANCE
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
}`,cf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,uf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,hf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,df=`uniform float scale;
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
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ff=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,pf=`#include <common>
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
}`,mf=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,gf=`#define LAMBERT
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
}`,_f=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
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
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,vf=`#define MATCAP
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
}`,xf=`#define MATCAP
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,Ef=`#define NORMAL
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
}`,Sf=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Mf=`#define PHONG
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
}`,yf=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
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
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,bf=`#define STANDARD
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
}`,Tf=`#define STANDARD
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
#include <packing>
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
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
}`,Af=`#define TOON
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
}`,wf=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,Rf=`uniform float size;
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
}`,Cf=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,Pf=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
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
}`,Lf=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
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
}`,Df=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
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
}`,Uf=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,Je={alphahash_fragment:eh,alphahash_pars_fragment:th,alphamap_fragment:nh,alphamap_pars_fragment:ih,alphatest_fragment:rh,alphatest_pars_fragment:sh,aomap_fragment:oh,aomap_pars_fragment:ah,batching_pars_vertex:lh,batching_vertex:ch,begin_vertex:uh,beginnormal_vertex:hh,bsdfs:dh,iridescence_fragment:fh,bumpmap_pars_fragment:ph,clipping_planes_fragment:mh,clipping_planes_pars_fragment:gh,clipping_planes_pars_vertex:_h,clipping_planes_vertex:vh,color_fragment:xh,color_pars_fragment:Eh,color_pars_vertex:Sh,color_vertex:Mh,common:yh,cube_uv_reflection_fragment:bh,defaultnormal_vertex:Th,displacementmap_pars_vertex:Ah,displacementmap_vertex:wh,emissivemap_fragment:Rh,emissivemap_pars_fragment:Ch,colorspace_fragment:Ph,colorspace_pars_fragment:Lh,envmap_fragment:Dh,envmap_common_pars_fragment:Uh,envmap_pars_fragment:Ih,envmap_pars_vertex:Nh,envmap_physical_pars_fragment:qh,envmap_vertex:Oh,fog_vertex:Fh,fog_pars_vertex:Bh,fog_fragment:zh,fog_pars_fragment:Gh,gradientmap_pars_fragment:Hh,lightmap_fragment:kh,lightmap_pars_fragment:Vh,lights_lambert_fragment:Wh,lights_lambert_pars_fragment:Xh,lights_pars_begin:Yh,lights_toon_fragment:$h,lights_toon_pars_fragment:jh,lights_phong_fragment:Zh,lights_phong_pars_fragment:Kh,lights_physical_fragment:Jh,lights_physical_pars_fragment:Qh,lights_fragment_begin:ed,lights_fragment_maps:td,lights_fragment_end:nd,logdepthbuf_fragment:id,logdepthbuf_pars_fragment:rd,logdepthbuf_pars_vertex:sd,logdepthbuf_vertex:od,map_fragment:ad,map_pars_fragment:ld,map_particle_fragment:cd,map_particle_pars_fragment:ud,metalnessmap_fragment:hd,metalnessmap_pars_fragment:dd,morphcolor_vertex:fd,morphnormal_vertex:pd,morphtarget_pars_vertex:md,morphtarget_vertex:gd,normal_fragment_begin:_d,normal_fragment_maps:vd,normal_pars_fragment:xd,normal_pars_vertex:Ed,normal_vertex:Sd,normalmap_pars_fragment:Md,clearcoat_normal_fragment_begin:yd,clearcoat_normal_fragment_maps:bd,clearcoat_pars_fragment:Td,iridescence_pars_fragment:Ad,opaque_fragment:wd,packing:Rd,premultiplied_alpha_fragment:Cd,project_vertex:Pd,dithering_fragment:Ld,dithering_pars_fragment:Dd,roughnessmap_fragment:Ud,roughnessmap_pars_fragment:Id,shadowmap_pars_fragment:Nd,shadowmap_pars_vertex:Od,shadowmap_vertex:Fd,shadowmask_pars_fragment:Bd,skinbase_vertex:zd,skinning_pars_vertex:Gd,skinning_vertex:Hd,skinnormal_vertex:kd,specularmap_fragment:Vd,specularmap_pars_fragment:Wd,tonemapping_fragment:Xd,tonemapping_pars_fragment:Yd,transmission_fragment:qd,transmission_pars_fragment:$d,uv_pars_fragment:jd,uv_pars_vertex:Zd,uv_vertex:Kd,worldpos_vertex:Jd,background_vert:Qd,background_frag:ef,backgroundCube_vert:tf,backgroundCube_frag:nf,cube_vert:rf,cube_frag:sf,depth_vert:of,depth_frag:af,distanceRGBA_vert:lf,distanceRGBA_frag:cf,equirect_vert:uf,equirect_frag:hf,linedashed_vert:df,linedashed_frag:ff,meshbasic_vert:pf,meshbasic_frag:mf,meshlambert_vert:gf,meshlambert_frag:_f,meshmatcap_vert:vf,meshmatcap_frag:xf,meshnormal_vert:Ef,meshnormal_frag:Sf,meshphong_vert:Mf,meshphong_frag:yf,meshphysical_vert:bf,meshphysical_frag:Tf,meshtoon_vert:Af,meshtoon_frag:wf,points_vert:Rf,points_frag:Cf,shadow_vert:Pf,shadow_frag:Lf,sprite_vert:Df,sprite_frag:Uf},Ae={common:{diffuse:{value:new ot(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Qe},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Qe}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Qe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Qe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Qe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Qe},normalScale:{value:new Ve(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Qe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Qe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Qe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Qe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ot(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ot(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0},uvTransform:{value:new Qe}},sprite:{diffuse:{value:new ot(16777215)},opacity:{value:1},center:{value:new Ve(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Qe},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0}}},ln={basic:{uniforms:Nt([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.fog]),vertexShader:Je.meshbasic_vert,fragmentShader:Je.meshbasic_frag},lambert:{uniforms:Nt([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,Ae.lights,{emissive:{value:new ot(0)}}]),vertexShader:Je.meshlambert_vert,fragmentShader:Je.meshlambert_frag},phong:{uniforms:Nt([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,Ae.lights,{emissive:{value:new ot(0)},specular:{value:new ot(1118481)},shininess:{value:30}}]),vertexShader:Je.meshphong_vert,fragmentShader:Je.meshphong_frag},standard:{uniforms:Nt([Ae.common,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.roughnessmap,Ae.metalnessmap,Ae.fog,Ae.lights,{emissive:{value:new ot(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Je.meshphysical_vert,fragmentShader:Je.meshphysical_frag},toon:{uniforms:Nt([Ae.common,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.gradientmap,Ae.fog,Ae.lights,{emissive:{value:new ot(0)}}]),vertexShader:Je.meshtoon_vert,fragmentShader:Je.meshtoon_frag},matcap:{uniforms:Nt([Ae.common,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,{matcap:{value:null}}]),vertexShader:Je.meshmatcap_vert,fragmentShader:Je.meshmatcap_frag},points:{uniforms:Nt([Ae.points,Ae.fog]),vertexShader:Je.points_vert,fragmentShader:Je.points_frag},dashed:{uniforms:Nt([Ae.common,Ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Je.linedashed_vert,fragmentShader:Je.linedashed_frag},depth:{uniforms:Nt([Ae.common,Ae.displacementmap]),vertexShader:Je.depth_vert,fragmentShader:Je.depth_frag},normal:{uniforms:Nt([Ae.common,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,{opacity:{value:1}}]),vertexShader:Je.meshnormal_vert,fragmentShader:Je.meshnormal_frag},sprite:{uniforms:Nt([Ae.sprite,Ae.fog]),vertexShader:Je.sprite_vert,fragmentShader:Je.sprite_frag},background:{uniforms:{uvTransform:{value:new Qe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Je.background_vert,fragmentShader:Je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Je.backgroundCube_vert,fragmentShader:Je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Je.cube_vert,fragmentShader:Je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Je.equirect_vert,fragmentShader:Je.equirect_frag},distanceRGBA:{uniforms:Nt([Ae.common,Ae.displacementmap,{referencePosition:{value:new G},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Je.distanceRGBA_vert,fragmentShader:Je.distanceRGBA_frag},shadow:{uniforms:Nt([Ae.lights,Ae.fog,{color:{value:new ot(0)},opacity:{value:1}}]),vertexShader:Je.shadow_vert,fragmentShader:Je.shadow_frag}};ln.physical={uniforms:Nt([ln.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Qe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Qe},clearcoatNormalScale:{value:new Ve(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Qe},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Qe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Qe},sheen:{value:0},sheenColor:{value:new ot(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Qe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Qe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Qe},transmissionSamplerSize:{value:new Ve},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Qe},attenuationDistance:{value:0},attenuationColor:{value:new ot(0)},specularColor:{value:new ot(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Qe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Qe},anisotropyVector:{value:new Ve},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Qe}}]),vertexShader:Je.meshphysical_vert,fragmentShader:Je.meshphysical_frag};const yr={r:0,b:0,g:0};function If(i,e,t,n,r,s,a){const o=new ot(0);let l=s===!0?0:1,c,u,h=null,f=0,m=null;function v(p,d){let b=!1,E=d.isScene===!0?d.background:null;E&&E.isTexture&&(E=(d.backgroundBlurriness>0?t:e).get(E)),E===null?x(o,l):E&&E.isColor&&(x(E,1),b=!0);const C=i.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,a):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||b)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),E&&(E.isCubeTexture||E.mapping===zr)?(u===void 0&&(u=new Mn(new Qi(1,1,1),new Gn({name:"BackgroundCubeMaterial",uniforms:Pi(ln.backgroundCube.uniforms),vertexShader:ln.backgroundCube.vertexShader,fragmentShader:ln.backgroundCube.fragmentShader,side:Ft,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(w,N,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),u.material.uniforms.envMap.value=E,u.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=d.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,u.material.toneMapped=st.getTransfer(E.colorSpace)!==ct,(h!==E||f!==E.version||m!==i.toneMapping)&&(u.material.needsUpdate=!0,h=E,f=E.version,m=i.toneMapping),u.layers.enableAll(),p.unshift(u,u.geometry,u.material,0,0,null)):E&&E.isTexture&&(c===void 0&&(c=new Mn(new Vr(2,2),new Gn({name:"BackgroundMaterial",uniforms:Pi(ln.background.uniforms),vertexShader:ln.background.vertexShader,fragmentShader:ln.background.fragmentShader,side:Bn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=E,c.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,c.material.toneMapped=st.getTransfer(E.colorSpace)!==ct,E.matrixAutoUpdate===!0&&E.updateMatrix(),c.material.uniforms.uvTransform.value.copy(E.matrix),(h!==E||f!==E.version||m!==i.toneMapping)&&(c.material.needsUpdate=!0,h=E,f=E.version,m=i.toneMapping),c.layers.enableAll(),p.unshift(c,c.geometry,c.material,0,0,null))}function x(p,d){p.getRGB(yr,vl(i)),n.buffers.color.setClear(yr.r,yr.g,yr.b,d,a)}return{getClearColor:function(){return o},setClearColor:function(p,d=1){o.set(p),l=d,x(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(p){l=p,x(o,l)},render:v}}function Nf(i,e,t,n){const r=i.getParameter(i.MAX_VERTEX_ATTRIBS),s=n.isWebGL2?null:e.get("OES_vertex_array_object"),a=n.isWebGL2||s!==null,o={},l=p(null);let c=l,u=!1;function h(B,Y,te,Z,ce){let Q=!1;if(a){const ne=x(Z,te,Y);c!==ne&&(c=ne,m(c.object)),Q=d(B,Z,te,ce),Q&&b(B,Z,te,ce)}else{const ne=Y.wireframe===!0;(c.geometry!==Z.id||c.program!==te.id||c.wireframe!==ne)&&(c.geometry=Z.id,c.program=te.id,c.wireframe=ne,Q=!0)}ce!==null&&t.update(ce,i.ELEMENT_ARRAY_BUFFER),(Q||u)&&(u=!1,k(B,Y,te,Z),ce!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(ce).buffer))}function f(){return n.isWebGL2?i.createVertexArray():s.createVertexArrayOES()}function m(B){return n.isWebGL2?i.bindVertexArray(B):s.bindVertexArrayOES(B)}function v(B){return n.isWebGL2?i.deleteVertexArray(B):s.deleteVertexArrayOES(B)}function x(B,Y,te){const Z=te.wireframe===!0;let ce=o[B.id];ce===void 0&&(ce={},o[B.id]=ce);let Q=ce[Y.id];Q===void 0&&(Q={},ce[Y.id]=Q);let ne=Q[Z];return ne===void 0&&(ne=p(f()),Q[Z]=ne),ne}function p(B){const Y=[],te=[],Z=[];for(let ce=0;ce<r;ce++)Y[ce]=0,te[ce]=0,Z[ce]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:Y,enabledAttributes:te,attributeDivisors:Z,object:B,attributes:{},index:null}}function d(B,Y,te,Z){const ce=c.attributes,Q=Y.attributes;let ne=0;const he=te.getAttributes();for(const xe in he)if(he[xe].location>=0){const ie=ce[xe];let Ee=Q[xe];if(Ee===void 0&&(xe==="instanceMatrix"&&B.instanceMatrix&&(Ee=B.instanceMatrix),xe==="instanceColor"&&B.instanceColor&&(Ee=B.instanceColor)),ie===void 0||ie.attribute!==Ee||Ee&&ie.data!==Ee.data)return!0;ne++}return c.attributesNum!==ne||c.index!==Z}function b(B,Y,te,Z){const ce={},Q=Y.attributes;let ne=0;const he=te.getAttributes();for(const xe in he)if(he[xe].location>=0){let ie=Q[xe];ie===void 0&&(xe==="instanceMatrix"&&B.instanceMatrix&&(ie=B.instanceMatrix),xe==="instanceColor"&&B.instanceColor&&(ie=B.instanceColor));const Ee={};Ee.attribute=ie,ie&&ie.data&&(Ee.data=ie.data),ce[xe]=Ee,ne++}c.attributes=ce,c.attributesNum=ne,c.index=Z}function E(){const B=c.newAttributes;for(let Y=0,te=B.length;Y<te;Y++)B[Y]=0}function C(B){w(B,0)}function w(B,Y){const te=c.newAttributes,Z=c.enabledAttributes,ce=c.attributeDivisors;te[B]=1,Z[B]===0&&(i.enableVertexAttribArray(B),Z[B]=1),ce[B]!==Y&&((n.isWebGL2?i:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](B,Y),ce[B]=Y)}function N(){const B=c.newAttributes,Y=c.enabledAttributes;for(let te=0,Z=Y.length;te<Z;te++)Y[te]!==B[te]&&(i.disableVertexAttribArray(te),Y[te]=0)}function I(B,Y,te,Z,ce,Q,ne){ne===!0?i.vertexAttribIPointer(B,Y,te,ce,Q):i.vertexAttribPointer(B,Y,te,Z,ce,Q)}function k(B,Y,te,Z){if(n.isWebGL2===!1&&(B.isInstancedMesh||Z.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;E();const ce=Z.attributes,Q=te.getAttributes(),ne=Y.defaultAttributeValues;for(const he in Q){const xe=Q[he];if(xe.location>=0){let q=ce[he];if(q===void 0&&(he==="instanceMatrix"&&B.instanceMatrix&&(q=B.instanceMatrix),he==="instanceColor"&&B.instanceColor&&(q=B.instanceColor)),q!==void 0){const ie=q.normalized,Ee=q.itemSize,fe=t.get(q);if(fe===void 0)continue;const z=fe.buffer,ae=fe.type,we=fe.bytesPerElement,De=n.isWebGL2===!0&&(ae===i.INT||ae===i.UNSIGNED_INT||q.gpuType===Ja);if(q.isInterleavedBufferAttribute){const ze=q.data,H=ze.stride,ft=q.offset;if(ze.isInstancedInterleavedBuffer){for(let Ie=0;Ie<xe.locationSize;Ie++)w(xe.location+Ie,ze.meshPerAttribute);B.isInstancedMesh!==!0&&Z._maxInstanceCount===void 0&&(Z._maxInstanceCount=ze.meshPerAttribute*ze.count)}else for(let Ie=0;Ie<xe.locationSize;Ie++)C(xe.location+Ie);i.bindBuffer(i.ARRAY_BUFFER,z);for(let Ie=0;Ie<xe.locationSize;Ie++)I(xe.location+Ie,Ee/xe.locationSize,ae,ie,H*we,(ft+Ee/xe.locationSize*Ie)*we,De)}else{if(q.isInstancedBufferAttribute){for(let ze=0;ze<xe.locationSize;ze++)w(xe.location+ze,q.meshPerAttribute);B.isInstancedMesh!==!0&&Z._maxInstanceCount===void 0&&(Z._maxInstanceCount=q.meshPerAttribute*q.count)}else for(let ze=0;ze<xe.locationSize;ze++)C(xe.location+ze);i.bindBuffer(i.ARRAY_BUFFER,z);for(let ze=0;ze<xe.locationSize;ze++)I(xe.location+ze,Ee/xe.locationSize,ae,ie,Ee*we,Ee/xe.locationSize*ze*we,De)}}else if(ne!==void 0){const ie=ne[he];if(ie!==void 0)switch(ie.length){case 2:i.vertexAttrib2fv(xe.location,ie);break;case 3:i.vertexAttrib3fv(xe.location,ie);break;case 4:i.vertexAttrib4fv(xe.location,ie);break;default:i.vertexAttrib1fv(xe.location,ie)}}}}N()}function M(){J();for(const B in o){const Y=o[B];for(const te in Y){const Z=Y[te];for(const ce in Z)v(Z[ce].object),delete Z[ce];delete Y[te]}delete o[B]}}function P(B){if(o[B.id]===void 0)return;const Y=o[B.id];for(const te in Y){const Z=Y[te];for(const ce in Z)v(Z[ce].object),delete Z[ce];delete Y[te]}delete o[B.id]}function j(B){for(const Y in o){const te=o[Y];if(te[B.id]===void 0)continue;const Z=te[B.id];for(const ce in Z)v(Z[ce].object),delete Z[ce];delete te[B.id]}}function J(){oe(),u=!0,c!==l&&(c=l,m(c.object))}function oe(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:J,resetDefaultState:oe,dispose:M,releaseStatesOfGeometry:P,releaseStatesOfProgram:j,initAttributes:E,enableAttribute:C,disableUnusedAttributes:N}}function Of(i,e,t,n){const r=n.isWebGL2;let s;function a(u){s=u}function o(u,h){i.drawArrays(s,u,h),t.update(h,s,1)}function l(u,h,f){if(f===0)return;let m,v;if(r)m=i,v="drawArraysInstanced";else if(m=e.get("ANGLE_instanced_arrays"),v="drawArraysInstancedANGLE",m===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[v](s,u,h,f),t.update(h,s,f)}function c(u,h,f){if(f===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let v=0;v<f;v++)this.render(u[v],h[v]);else{m.multiDrawArraysWEBGL(s,u,0,h,0,f);let v=0;for(let x=0;x<f;x++)v+=h[x];t.update(v,s,1)}}this.setMode=a,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function Ff(i,e,t){let n;function r(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const I=e.get("EXT_texture_filter_anisotropic");n=i.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(I){if(I==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const l=s(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const c=a||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,h=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_TEXTURE_SIZE),v=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),x=i.getParameter(i.MAX_VERTEX_ATTRIBS),p=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),d=i.getParameter(i.MAX_VARYING_VECTORS),b=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),E=f>0,C=a||e.has("OES_texture_float"),w=E&&C,N=a?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:r,getMaxPrecision:s,precision:o,logarithmicDepthBuffer:u,maxTextures:h,maxVertexTextures:f,maxTextureSize:m,maxCubemapSize:v,maxAttributes:x,maxVertexUniforms:p,maxVaryings:d,maxFragmentUniforms:b,vertexTextures:E,floatFragmentTextures:C,floatVertexTextures:w,maxSamples:N}}function Bf(i){const e=this;let t=null,n=0,r=!1,s=!1;const a=new Dn,o=new Qe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const m=h.length!==0||f||n!==0||r;return r=f,n=h.length,m},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,f){t=u(h,f,0)},this.setState=function(h,f,m){const v=h.clippingPlanes,x=h.clipIntersection,p=h.clipShadows,d=i.get(h);if(!r||v===null||v.length===0||s&&!p)s?u(null):c();else{const b=s?0:n,E=b*4;let C=d.clippingState||null;l.value=C,C=u(v,f,E,m);for(let w=0;w!==E;++w)C[w]=t[w];d.clippingState=C,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,f,m,v){const x=h!==null?h.length:0;let p=null;if(x!==0){if(p=l.value,v!==!0||p===null){const d=m+x*4,b=f.matrixWorldInverse;o.getNormalMatrix(b),(p===null||p.length<d)&&(p=new Float32Array(d));for(let E=0,C=m;E!==x;++E,C+=4)a.copy(h[E]).applyMatrix4(b,o),a.normal.toArray(p,C),p[C+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,p}}function zf(i){let e=new WeakMap;function t(a,o){return o===Lr?a.mapping=Ai:o===Fs&&(a.mapping=wi),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Lr||o===Fs)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Zu(l.height/2);return c.fromEquirectangularTexture(i,a),e.set(a,c),a.addEventListener("dispose",r),t(c.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class Gf extends xl{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Mi=4,va=[.125,.215,.35,.446,.526,.582],Zn=20,xs=new Gf,xa=new ot;let Es=null,Ss=0,Ms=0;const $n=(1+Math.sqrt(5))/2,xi=1/$n,Ea=[new G(1,1,1),new G(-1,1,1),new G(1,1,-1),new G(-1,1,-1),new G(0,$n,xi),new G(0,$n,-xi),new G(xi,0,$n),new G(-xi,0,$n),new G($n,xi,0),new G(-$n,xi,0)];class Sa{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){Es=this._renderer.getRenderTarget(),Ss=this._renderer.getActiveCubeFace(),Ms=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ba(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ya(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Es,Ss,Ms),e.scissorTest=!1,br(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ai||e.mapping===wi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Es=this._renderer.getRenderTarget(),Ss=this._renderer.getActiveCubeFace(),Ms=this._renderer.getActiveMipmapLevel();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:At,minFilter:At,generateMipmaps:!1,type:En,format:jt,colorSpace:sn,depthBuffer:!1},r=Ma(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ma(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Hf(s)),this._blurMaterial=kf(s,e,t)}return r}_compileMaterial(e){const t=new Mn(this._lodPlanes[0],e);this._renderer.compile(t,xs)}_sceneToCubeUV(e,t,n,r){const o=new $t(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(xa),u.toneMapping=On,u.autoClear=!1;const m=new ml({name:"PMREM.Background",side:Ft,depthWrite:!1,depthTest:!1}),v=new Mn(new Qi,m);let x=!1;const p=e.background;p?p.isColor&&(m.color.copy(p),e.background=null,x=!0):(m.color.copy(xa),x=!0);for(let d=0;d<6;d++){const b=d%3;b===0?(o.up.set(0,l[d],0),o.lookAt(c[d],0,0)):b===1?(o.up.set(0,0,l[d]),o.lookAt(0,c[d],0)):(o.up.set(0,l[d],0),o.lookAt(0,0,c[d]));const E=this._cubeSize;br(r,b*E,d>2?E:0,E,E),u.setRenderTarget(r),x&&u.render(v,o),u.render(e,o)}v.geometry.dispose(),v.material.dispose(),u.toneMapping=f,u.autoClear=h,e.background=p}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===Ai||e.mapping===wi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=ba()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ya());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new Mn(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;br(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,xs)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Ea[(r-1)%Ea.length];this._blur(e,r-1,r,s,a)}t.autoClear=n}_blur(e,t,n,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,"latitudinal",s),this._halfBlur(a,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new Mn(this._lodPlanes[r],c),f=c.uniforms,m=this._sizeLods[n]-1,v=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*Zn-1),x=s/v,p=isFinite(s)?1+Math.floor(u*x):Zn;p>Zn&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Zn}`);const d=[];let b=0;for(let I=0;I<Zn;++I){const k=I/x,M=Math.exp(-k*k/2);d.push(M),I===0?b+=M:I<p&&(b+=2*M)}for(let I=0;I<d.length;I++)d[I]=d[I]/b;f.envMap.value=e.texture,f.samples.value=p,f.weights.value=d,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:E}=this;f.dTheta.value=v,f.mipInt.value=E-n;const C=this._sizeLods[r],w=3*C*(r>E-Mi?r-E+Mi:0),N=4*(this._cubeSize-C);br(t,w,N,3*C,2*C),l.setRenderTarget(t),l.render(h,xs)}}function Hf(i){const e=[],t=[],n=[];let r=i;const s=i-Mi+1+va.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);t.push(o);let l=1/o;a>i-Mi?l=va[a-i+Mi-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],m=6,v=6,x=3,p=2,d=1,b=new Float32Array(x*v*m),E=new Float32Array(p*v*m),C=new Float32Array(d*v*m);for(let N=0;N<m;N++){const I=N%3*2/3-1,k=N>2?0:-1,M=[I,k,0,I+2/3,k,0,I+2/3,k+1,0,I,k,0,I+2/3,k+1,0,I,k+1,0];b.set(M,x*v*N),E.set(f,p*v*N);const P=[N,N,N,N,N,N];C.set(P,d*v*N)}const w=new ni;w.setAttribute("position",new rn(b,x)),w.setAttribute("uv",new rn(E,p)),w.setAttribute("faceIndex",new rn(C,d)),e.push(w),r>Mi&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Ma(i,e,t){const n=new ti(i,e,t);return n.texture.mapping=zr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function br(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function kf(i,e,t){const n=new Float32Array(Zn),r=new G(0,1,0);return new Gn({name:"SphericalGaussianBlur",defines:{n:Zn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:eo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Nn,depthTest:!1,depthWrite:!1})}function ya(){return new Gn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:eo(),fragmentShader:`

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
		`,blending:Nn,depthTest:!1,depthWrite:!1})}function ba(){return new Gn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:eo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Nn,depthTest:!1,depthWrite:!1})}function eo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Vf(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===Lr||l===Fs,u=l===Ai||l===wi;if(c||u)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let h=e.get(o);return t===null&&(t=new Sa(i)),h=c?t.fromEquirectangular(o,h):t.fromCubemap(o,h),e.set(o,h),h.texture}else{if(e.has(o))return e.get(o).texture;{const h=o.image;if(c&&h&&h.height>0||u&&h&&r(h)){t===null&&(t=new Sa(i));const f=c?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,f),o.addEventListener("dispose",s),f.texture}else return null}}}return o}function r(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function Wf(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?t("EXT_color_buffer_float"):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const r=t(n);return r===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function Xf(i,e,t,n){const r={},s=new WeakMap;function a(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const v in f.attributes)e.remove(f.attributes[v]);for(const v in f.morphAttributes){const x=f.morphAttributes[v];for(let p=0,d=x.length;p<d;p++)e.remove(x[p])}f.removeEventListener("dispose",a),delete r[f.id];const m=s.get(f);m&&(e.remove(m),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(h,f){return r[f.id]===!0||(f.addEventListener("dispose",a),r[f.id]=!0,t.memory.geometries++),f}function l(h){const f=h.attributes;for(const v in f)e.update(f[v],i.ARRAY_BUFFER);const m=h.morphAttributes;for(const v in m){const x=m[v];for(let p=0,d=x.length;p<d;p++)e.update(x[p],i.ARRAY_BUFFER)}}function c(h){const f=[],m=h.index,v=h.attributes.position;let x=0;if(m!==null){const b=m.array;x=m.version;for(let E=0,C=b.length;E<C;E+=3){const w=b[E+0],N=b[E+1],I=b[E+2];f.push(w,N,N,I,I,w)}}else if(v!==void 0){const b=v.array;x=v.version;for(let E=0,C=b.length/3-1;E<C;E+=3){const w=E+0,N=E+1,I=E+2;f.push(w,N,N,I,I,w)}}else return;const p=new(ll(f)?_l:gl)(f,1);p.version=x;const d=s.get(h);d&&e.remove(d),s.set(h,p)}function u(h){const f=s.get(h);if(f){const m=h.index;m!==null&&f.version<m.version&&c(h)}else c(h);return s.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function Yf(i,e,t,n){const r=n.isWebGL2;let s;function a(m){s=m}let o,l;function c(m){o=m.type,l=m.bytesPerElement}function u(m,v){i.drawElements(s,v,o,m*l),t.update(v,s,1)}function h(m,v,x){if(x===0)return;let p,d;if(r)p=i,d="drawElementsInstanced";else if(p=e.get("ANGLE_instanced_arrays"),d="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[d](s,v,o,m*l,x),t.update(v,s,x)}function f(m,v,x){if(x===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let d=0;d<x;d++)this.render(m[d]/l,v[d]);else{p.multiDrawElementsWEBGL(s,v,0,o,m,0,x);let d=0;for(let b=0;b<x;b++)d+=v[b];t.update(d,s,1)}}this.setMode=a,this.setIndex=c,this.render=u,this.renderInstances=h,this.renderMultiDraw=f}function qf(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(s/3);break;case i.LINES:t.lines+=o*(s/2);break;case i.LINE_STRIP:t.lines+=o*(s-1);break;case i.LINE_LOOP:t.lines+=o*s;break;case i.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function $f(i,e){return i[0]-e[0]}function jf(i,e){return Math.abs(e[1])-Math.abs(i[1])}function Zf(i,e,t){const n={},r=new Float32Array(8),s=new WeakMap,a=new Rt,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,u,h){const f=c.morphTargetInfluences;if(e.isWebGL2===!0){const m=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,v=m!==void 0?m.length:0;let x=s.get(u);if(x===void 0||x.count!==v){let B=function(){J.dispose(),s.delete(u),u.removeEventListener("dispose",B)};x!==void 0&&x.texture.dispose();const b=u.morphAttributes.position!==void 0,E=u.morphAttributes.normal!==void 0,C=u.morphAttributes.color!==void 0,w=u.morphAttributes.position||[],N=u.morphAttributes.normal||[],I=u.morphAttributes.color||[];let k=0;b===!0&&(k=1),E===!0&&(k=2),C===!0&&(k=3);let M=u.attributes.position.count*k,P=1;M>e.maxTextureSize&&(P=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const j=new Float32Array(M*P*4*v),J=new hl(j,M,P,v);J.type=nn,J.needsUpdate=!0;const oe=k*4;for(let Y=0;Y<v;Y++){const te=w[Y],Z=N[Y],ce=I[Y],Q=M*P*4*Y;for(let ne=0;ne<te.count;ne++){const he=ne*oe;b===!0&&(a.fromBufferAttribute(te,ne),j[Q+he+0]=a.x,j[Q+he+1]=a.y,j[Q+he+2]=a.z,j[Q+he+3]=0),E===!0&&(a.fromBufferAttribute(Z,ne),j[Q+he+4]=a.x,j[Q+he+5]=a.y,j[Q+he+6]=a.z,j[Q+he+7]=0),C===!0&&(a.fromBufferAttribute(ce,ne),j[Q+he+8]=a.x,j[Q+he+9]=a.y,j[Q+he+10]=a.z,j[Q+he+11]=ce.itemSize===4?a.w:1)}}x={count:v,texture:J,size:new Ve(M,P)},s.set(u,x),u.addEventListener("dispose",B)}let p=0;for(let b=0;b<f.length;b++)p+=f[b];const d=u.morphTargetsRelative?1:1-p;h.getUniforms().setValue(i,"morphTargetBaseInfluence",d),h.getUniforms().setValue(i,"morphTargetInfluences",f),h.getUniforms().setValue(i,"morphTargetsTexture",x.texture,t),h.getUniforms().setValue(i,"morphTargetsTextureSize",x.size)}else{const m=f===void 0?0:f.length;let v=n[u.id];if(v===void 0||v.length!==m){v=[];for(let E=0;E<m;E++)v[E]=[E,0];n[u.id]=v}for(let E=0;E<m;E++){const C=v[E];C[0]=E,C[1]=f[E]}v.sort(jf);for(let E=0;E<8;E++)E<m&&v[E][1]?(o[E][0]=v[E][0],o[E][1]=v[E][1]):(o[E][0]=Number.MAX_SAFE_INTEGER,o[E][1]=0);o.sort($f);const x=u.morphAttributes.position,p=u.morphAttributes.normal;let d=0;for(let E=0;E<8;E++){const C=o[E],w=C[0],N=C[1];w!==Number.MAX_SAFE_INTEGER&&N?(x&&u.getAttribute("morphTarget"+E)!==x[w]&&u.setAttribute("morphTarget"+E,x[w]),p&&u.getAttribute("morphNormal"+E)!==p[w]&&u.setAttribute("morphNormal"+E,p[w]),r[E]=N,d+=N):(x&&u.hasAttribute("morphTarget"+E)===!0&&u.deleteAttribute("morphTarget"+E),p&&u.hasAttribute("morphNormal"+E)===!0&&u.deleteAttribute("morphNormal"+E),r[E]=0)}const b=u.morphTargetsRelative?1:1-d;h.getUniforms().setValue(i,"morphTargetBaseInfluence",b),h.getUniforms().setValue(i,"morphTargetInfluences",r)}}return{update:l}}function Kf(i,e,t,n){let r=new WeakMap;function s(l){const c=n.render.frame,u=l.geometry,h=e.get(l,u);if(r.get(h)!==c&&(e.update(h),r.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;r.get(f)!==c&&(f.update(),r.set(f,c))}return h}function a(){r=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:a}}class yl extends Bt{constructor(e,t,n,r,s,a,o,l,c,u){if(u=u!==void 0?u:Jn,u!==Jn&&u!==Ci)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Jn&&(n=Un),n===void 0&&u===Ci&&(n=Kn),super(null,r,s,a,o,l,u,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:bt,this.minFilter=l!==void 0?l:bt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const bl=new Bt,Tl=new yl(1,1);Tl.compareFunction=al;const Al=new hl,wl=new Pu,Rl=new El,Ta=[],Aa=[],wa=new Float32Array(16),Ra=new Float32Array(9),Ca=new Float32Array(4);function Ii(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=Ta[r];if(s===void 0&&(s=new Float32Array(r),Ta[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function vt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function xt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Wr(i,e){let t=Aa[e];t===void 0&&(t=new Int32Array(e),Aa[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Jf(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Qf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(vt(t,e))return;i.uniform2fv(this.addr,e),xt(t,e)}}function ep(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(vt(t,e))return;i.uniform3fv(this.addr,e),xt(t,e)}}function tp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(vt(t,e))return;i.uniform4fv(this.addr,e),xt(t,e)}}function np(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(vt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),xt(t,e)}else{if(vt(t,n))return;Ca.set(n),i.uniformMatrix2fv(this.addr,!1,Ca),xt(t,n)}}function ip(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(vt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),xt(t,e)}else{if(vt(t,n))return;Ra.set(n),i.uniformMatrix3fv(this.addr,!1,Ra),xt(t,n)}}function rp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(vt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),xt(t,e)}else{if(vt(t,n))return;wa.set(n),i.uniformMatrix4fv(this.addr,!1,wa),xt(t,n)}}function sp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function op(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(vt(t,e))return;i.uniform2iv(this.addr,e),xt(t,e)}}function ap(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(vt(t,e))return;i.uniform3iv(this.addr,e),xt(t,e)}}function lp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(vt(t,e))return;i.uniform4iv(this.addr,e),xt(t,e)}}function cp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function up(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(vt(t,e))return;i.uniform2uiv(this.addr,e),xt(t,e)}}function hp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(vt(t,e))return;i.uniform3uiv(this.addr,e),xt(t,e)}}function dp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(vt(t,e))return;i.uniform4uiv(this.addr,e),xt(t,e)}}function fp(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);const s=this.type===i.SAMPLER_2D_SHADOW?Tl:bl;t.setTexture2D(e||s,r)}function pp(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||wl,r)}function mp(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||Rl,r)}function gp(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||Al,r)}function _p(i){switch(i){case 5126:return Jf;case 35664:return Qf;case 35665:return ep;case 35666:return tp;case 35674:return np;case 35675:return ip;case 35676:return rp;case 5124:case 35670:return sp;case 35667:case 35671:return op;case 35668:case 35672:return ap;case 35669:case 35673:return lp;case 5125:return cp;case 36294:return up;case 36295:return hp;case 36296:return dp;case 35678:case 36198:case 36298:case 36306:case 35682:return fp;case 35679:case 36299:case 36307:return pp;case 35680:case 36300:case 36308:case 36293:return mp;case 36289:case 36303:case 36311:case 36292:return gp}}function vp(i,e){i.uniform1fv(this.addr,e)}function xp(i,e){const t=Ii(e,this.size,2);i.uniform2fv(this.addr,t)}function Ep(i,e){const t=Ii(e,this.size,3);i.uniform3fv(this.addr,t)}function Sp(i,e){const t=Ii(e,this.size,4);i.uniform4fv(this.addr,t)}function Mp(i,e){const t=Ii(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function yp(i,e){const t=Ii(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function bp(i,e){const t=Ii(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Tp(i,e){i.uniform1iv(this.addr,e)}function Ap(i,e){i.uniform2iv(this.addr,e)}function wp(i,e){i.uniform3iv(this.addr,e)}function Rp(i,e){i.uniform4iv(this.addr,e)}function Cp(i,e){i.uniform1uiv(this.addr,e)}function Pp(i,e){i.uniform2uiv(this.addr,e)}function Lp(i,e){i.uniform3uiv(this.addr,e)}function Dp(i,e){i.uniform4uiv(this.addr,e)}function Up(i,e,t){const n=this.cache,r=e.length,s=Wr(t,r);vt(n,s)||(i.uniform1iv(this.addr,s),xt(n,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||bl,s[a])}function Ip(i,e,t){const n=this.cache,r=e.length,s=Wr(t,r);vt(n,s)||(i.uniform1iv(this.addr,s),xt(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||wl,s[a])}function Np(i,e,t){const n=this.cache,r=e.length,s=Wr(t,r);vt(n,s)||(i.uniform1iv(this.addr,s),xt(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Rl,s[a])}function Op(i,e,t){const n=this.cache,r=e.length,s=Wr(t,r);vt(n,s)||(i.uniform1iv(this.addr,s),xt(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Al,s[a])}function Fp(i){switch(i){case 5126:return vp;case 35664:return xp;case 35665:return Ep;case 35666:return Sp;case 35674:return Mp;case 35675:return yp;case 35676:return bp;case 5124:case 35670:return Tp;case 35667:case 35671:return Ap;case 35668:case 35672:return wp;case 35669:case 35673:return Rp;case 5125:return Cp;case 36294:return Pp;case 36295:return Lp;case 36296:return Dp;case 35678:case 36198:case 36298:case 36306:case 35682:return Up;case 35679:case 36299:case 36307:return Ip;case 35680:case 36300:case 36308:case 36293:return Np;case 36289:case 36303:case 36311:case 36292:return Op}}class Bp{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=_p(t.type)}}class zp{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Fp(t.type)}}class Gp{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],n)}}}const ys=/(\w+)(\])?(\[|\.)?/g;function Pa(i,e){i.seq.push(e),i.map[e.id]=e}function Hp(i,e,t){const n=i.name,r=n.length;for(ys.lastIndex=0;;){const s=ys.exec(n),a=ys.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){Pa(t,c===void 0?new Bp(o,i,e):new zp(o,i,e));break}else{let h=t.map[o];h===void 0&&(h=new Gp(o),Pa(t,h)),t=h}}}class Cr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=e.getActiveUniform(t,r),a=e.getUniformLocation(t,s.name);Hp(s,a,this)}}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&n.push(a)}return n}}function La(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const kp=37297;let Vp=0;function Wp(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}function Xp(i){const e=st.getPrimaries(st.workingColorSpace),t=st.getPrimaries(i);let n;switch(e===t?n="":e===Ir&&t===Ur?n="LinearDisplayP3ToLinearSRGB":e===Ur&&t===Ir&&(n="LinearSRGBToLinearDisplayP3"),i){case sn:case Gr:return[n,"LinearTransferOETF"];case Tt:case Ks:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function Da(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=i.getShaderInfoLog(e).trim();if(n&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+Wp(i.getShaderSource(e),a)}else return r}function Yp(i,e){const t=Xp(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function qp(i,e){let t;switch(e){case Hc:t="Linear";break;case kc:t="Reinhard";break;case Vc:t="OptimizedCineon";break;case Wc:t="ACESFilmic";break;case Xc:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function $p(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(ki).join(`
`)}function jp(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Zp(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),a=s.name;let o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function ki(i){return i!==""}function Ua(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ia(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Kp=/^[ \t]*#include +<([\w\d./]+)>/gm;function Vs(i){return i.replace(Kp,Qp)}const Jp=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Qp(i,e){let t=Je[e];if(t===void 0){const n=Jp.get(e);if(n!==void 0)t=Je[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Vs(t)}const em=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Na(i){return i.replace(em,tm)}function tm(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Oa(i){let e="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function nm(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===ja?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===mc?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===vn&&(e="SHADOWMAP_TYPE_VSM"),e}function im(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Ai:case wi:e="ENVMAP_TYPE_CUBE";break;case zr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function rm(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case wi:e="ENVMAP_MODE_REFRACTION";break}return e}function sm(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Za:e="ENVMAP_BLENDING_MULTIPLY";break;case zc:e="ENVMAP_BLENDING_MIX";break;case Gc:e="ENVMAP_BLENDING_ADD";break}return e}function om(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function am(i,e,t,n){const r=i.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=nm(t),c=im(t),u=rm(t),h=sm(t),f=om(t),m=t.isWebGL2?"":$p(t),v=jp(s),x=r.createProgram();let p,d,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(ki).join(`
`),p.length>0&&(p+=`
`),d=[m,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(ki).join(`
`),d.length>0&&(d+=`
`)):(p=[Oa(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ki).join(`
`),d=[m,Oa(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==On?"#define TONE_MAPPING":"",t.toneMapping!==On?Je.tonemapping_pars_fragment:"",t.toneMapping!==On?qp("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Je.colorspace_pars_fragment,Yp("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ki).join(`
`)),a=Vs(a),a=Ua(a,t),a=Ia(a,t),o=Vs(o),o=Ua(o,t),o=Ia(o,t),a=Na(a),o=Na(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,p=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,d=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Qo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Qo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const E=b+p+a,C=b+d+o,w=La(r,r.VERTEX_SHADER,E),N=La(r,r.FRAGMENT_SHADER,C);r.attachShader(x,w),r.attachShader(x,N),t.index0AttributeName!==void 0?r.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function I(j){if(i.debug.checkShaderErrors){const J=r.getProgramInfoLog(x).trim(),oe=r.getShaderInfoLog(w).trim(),B=r.getShaderInfoLog(N).trim();let Y=!0,te=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(Y=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,x,w,N);else{const Z=Da(r,w,"vertex"),ce=Da(r,N,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Program Info Log: `+J+`
`+Z+`
`+ce)}else J!==""?console.warn("THREE.WebGLProgram: Program Info Log:",J):(oe===""||B==="")&&(te=!1);te&&(j.diagnostics={runnable:Y,programLog:J,vertexShader:{log:oe,prefix:p},fragmentShader:{log:B,prefix:d}})}r.deleteShader(w),r.deleteShader(N),k=new Cr(r,x),M=Zp(r,x)}let k;this.getUniforms=function(){return k===void 0&&I(this),k};let M;this.getAttributes=function(){return M===void 0&&I(this),M};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=r.getProgramParameter(x,kp)),P},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Vp++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=w,this.fragmentShader=N,this}let lm=0;class cm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new um(e),t.set(e,n)),n}}class um{constructor(e){this.id=lm++,this.code=e,this.usedTimes=0}}function hm(i,e,t,n,r,s,a){const o=new fl,l=new cm,c=[],u=r.isWebGL2,h=r.logarithmicDepthBuffer,f=r.vertexTextures;let m=r.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(M){return M===0?"uv":`uv${M}`}function p(M,P,j,J,oe){const B=J.fog,Y=oe.geometry,te=M.isMeshStandardMaterial?J.environment:null,Z=(M.isMeshStandardMaterial?t:e).get(M.envMap||te),ce=Z&&Z.mapping===zr?Z.image.height:null,Q=v[M.type];M.precision!==null&&(m=r.getMaxPrecision(M.precision),m!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",m,"instead."));const ne=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,he=ne!==void 0?ne.length:0;let xe=0;Y.morphAttributes.position!==void 0&&(xe=1),Y.morphAttributes.normal!==void 0&&(xe=2),Y.morphAttributes.color!==void 0&&(xe=3);let q,ie,Ee,fe;if(Q){const St=ln[Q];q=St.vertexShader,ie=St.fragmentShader}else q=M.vertexShader,ie=M.fragmentShader,l.update(M),Ee=l.getVertexShaderID(M),fe=l.getFragmentShaderID(M);const z=i.getRenderTarget(),ae=oe.isInstancedMesh===!0,we=oe.isBatchedMesh===!0,De=!!M.map,ze=!!M.matcap,H=!!Z,ft=!!M.aoMap,Ie=!!M.lightMap,Ye=!!M.bumpMap,ke=!!M.normalMap,at=!!M.displacementMap,qe=!!M.emissiveMap,We=!!M.metalnessMap,et=!!M.roughnessMap,pt=M.anisotropy>0,mt=M.clearcoat>0,R=M.iridescence>0,S=M.sheen>0,X=M.transmission>0,_e=pt&&!!M.anisotropyMap,de=mt&&!!M.clearcoatMap,ge=mt&&!!M.clearcoatNormalMap,Ne=mt&&!!M.clearcoatRoughnessMap,Se=R&&!!M.iridescenceMap,Re=R&&!!M.iridescenceThicknessMap,O=S&&!!M.sheenColorMap,pe=S&&!!M.sheenRoughnessMap,ee=!!M.specularMap,He=!!M.specularColorMap,Ue=!!M.specularIntensityMap,Le=X&&!!M.transmissionMap,Te=X&&!!M.thicknessMap,Pe=!!M.gradientMap,se=!!M.alphaMap,F=M.alphaTest>0,be=!!M.alphaHash,ue=!!M.extensions,K=!!Y.attributes.uv1,ve=!!Y.attributes.uv2,Be=!!Y.attributes.uv3;let Ze=On;return M.toneMapped&&(z===null||z.isXRRenderTarget===!0)&&(Ze=i.toneMapping),{isWebGL2:u,shaderID:Q,shaderType:M.type,shaderName:M.name,vertexShader:q,fragmentShader:ie,defines:M.defines,customVertexShaderID:Ee,customFragmentShaderID:fe,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:m,batching:we,instancing:ae,instancingColor:ae&&oe.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:z===null?i.outputColorSpace:z.isXRRenderTarget===!0?z.texture.colorSpace:sn,map:De,matcap:ze,envMap:H,envMapMode:H&&Z.mapping,envMapCubeUVHeight:ce,aoMap:ft,lightMap:Ie,bumpMap:Ye,normalMap:ke,displacementMap:f&&at,emissiveMap:qe,normalMapObjectSpace:ke&&M.normalMapType===iu,normalMapTangentSpace:ke&&M.normalMapType===nu,metalnessMap:We,roughnessMap:et,anisotropy:pt,anisotropyMap:_e,clearcoat:mt,clearcoatMap:de,clearcoatNormalMap:ge,clearcoatRoughnessMap:Ne,iridescence:R,iridescenceMap:Se,iridescenceThicknessMap:Re,sheen:S,sheenColorMap:O,sheenRoughnessMap:pe,specularMap:ee,specularColorMap:He,specularIntensityMap:Ue,transmission:X,transmissionMap:Le,thicknessMap:Te,gradientMap:Pe,opaque:M.transparent===!1&&M.blending===yi,alphaMap:se,alphaTest:F,alphaHash:be,combine:M.combine,mapUv:De&&x(M.map.channel),aoMapUv:ft&&x(M.aoMap.channel),lightMapUv:Ie&&x(M.lightMap.channel),bumpMapUv:Ye&&x(M.bumpMap.channel),normalMapUv:ke&&x(M.normalMap.channel),displacementMapUv:at&&x(M.displacementMap.channel),emissiveMapUv:qe&&x(M.emissiveMap.channel),metalnessMapUv:We&&x(M.metalnessMap.channel),roughnessMapUv:et&&x(M.roughnessMap.channel),anisotropyMapUv:_e&&x(M.anisotropyMap.channel),clearcoatMapUv:de&&x(M.clearcoatMap.channel),clearcoatNormalMapUv:ge&&x(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ne&&x(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Se&&x(M.iridescenceMap.channel),iridescenceThicknessMapUv:Re&&x(M.iridescenceThicknessMap.channel),sheenColorMapUv:O&&x(M.sheenColorMap.channel),sheenRoughnessMapUv:pe&&x(M.sheenRoughnessMap.channel),specularMapUv:ee&&x(M.specularMap.channel),specularColorMapUv:He&&x(M.specularColorMap.channel),specularIntensityMapUv:Ue&&x(M.specularIntensityMap.channel),transmissionMapUv:Le&&x(M.transmissionMap.channel),thicknessMapUv:Te&&x(M.thicknessMap.channel),alphaMapUv:se&&x(M.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(ke||pt),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,vertexUv1s:K,vertexUv2s:ve,vertexUv3s:Be,pointsUvs:oe.isPoints===!0&&!!Y.attributes.uv&&(De||se),fog:!!B,useFog:M.fog===!0,fogExp2:B&&B.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:oe.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:he,morphTextureStride:xe,numDirLights:P.directional.length,numPointLights:P.point.length,numSpotLights:P.spot.length,numSpotLightMaps:P.spotLightMap.length,numRectAreaLights:P.rectArea.length,numHemiLights:P.hemi.length,numDirLightShadows:P.directionalShadowMap.length,numPointLightShadows:P.pointShadowMap.length,numSpotLightShadows:P.spotShadowMap.length,numSpotLightShadowsWithMaps:P.numSpotLightShadowsWithMaps,numLightProbes:P.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&j.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ze,useLegacyLights:i._useLegacyLights,decodeVideoTexture:De&&M.map.isVideoTexture===!0&&st.getTransfer(M.map.colorSpace)===ct,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===cn,flipSided:M.side===Ft,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionDerivatives:ue&&M.extensions.derivatives===!0,extensionFragDepth:ue&&M.extensions.fragDepth===!0,extensionDrawBuffers:ue&&M.extensions.drawBuffers===!0,extensionShaderTextureLOD:ue&&M.extensions.shaderTextureLOD===!0,rendererExtensionFragDepth:u||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()}}function d(M){const P=[];if(M.shaderID?P.push(M.shaderID):(P.push(M.customVertexShaderID),P.push(M.customFragmentShaderID)),M.defines!==void 0)for(const j in M.defines)P.push(j),P.push(M.defines[j]);return M.isRawShaderMaterial===!1&&(b(P,M),E(P,M),P.push(i.outputColorSpace)),P.push(M.customProgramCacheKey),P.join()}function b(M,P){M.push(P.precision),M.push(P.outputColorSpace),M.push(P.envMapMode),M.push(P.envMapCubeUVHeight),M.push(P.mapUv),M.push(P.alphaMapUv),M.push(P.lightMapUv),M.push(P.aoMapUv),M.push(P.bumpMapUv),M.push(P.normalMapUv),M.push(P.displacementMapUv),M.push(P.emissiveMapUv),M.push(P.metalnessMapUv),M.push(P.roughnessMapUv),M.push(P.anisotropyMapUv),M.push(P.clearcoatMapUv),M.push(P.clearcoatNormalMapUv),M.push(P.clearcoatRoughnessMapUv),M.push(P.iridescenceMapUv),M.push(P.iridescenceThicknessMapUv),M.push(P.sheenColorMapUv),M.push(P.sheenRoughnessMapUv),M.push(P.specularMapUv),M.push(P.specularColorMapUv),M.push(P.specularIntensityMapUv),M.push(P.transmissionMapUv),M.push(P.thicknessMapUv),M.push(P.combine),M.push(P.fogExp2),M.push(P.sizeAttenuation),M.push(P.morphTargetsCount),M.push(P.morphAttributeCount),M.push(P.numDirLights),M.push(P.numPointLights),M.push(P.numSpotLights),M.push(P.numSpotLightMaps),M.push(P.numHemiLights),M.push(P.numRectAreaLights),M.push(P.numDirLightShadows),M.push(P.numPointLightShadows),M.push(P.numSpotLightShadows),M.push(P.numSpotLightShadowsWithMaps),M.push(P.numLightProbes),M.push(P.shadowMapType),M.push(P.toneMapping),M.push(P.numClippingPlanes),M.push(P.numClipIntersection),M.push(P.depthPacking)}function E(M,P){o.disableAll(),P.isWebGL2&&o.enable(0),P.supportsVertexTextures&&o.enable(1),P.instancing&&o.enable(2),P.instancingColor&&o.enable(3),P.matcap&&o.enable(4),P.envMap&&o.enable(5),P.normalMapObjectSpace&&o.enable(6),P.normalMapTangentSpace&&o.enable(7),P.clearcoat&&o.enable(8),P.iridescence&&o.enable(9),P.alphaTest&&o.enable(10),P.vertexColors&&o.enable(11),P.vertexAlphas&&o.enable(12),P.vertexUv1s&&o.enable(13),P.vertexUv2s&&o.enable(14),P.vertexUv3s&&o.enable(15),P.vertexTangents&&o.enable(16),P.anisotropy&&o.enable(17),P.alphaHash&&o.enable(18),P.batching&&o.enable(19),M.push(o.mask),o.disableAll(),P.fog&&o.enable(0),P.useFog&&o.enable(1),P.flatShading&&o.enable(2),P.logarithmicDepthBuffer&&o.enable(3),P.skinning&&o.enable(4),P.morphTargets&&o.enable(5),P.morphNormals&&o.enable(6),P.morphColors&&o.enable(7),P.premultipliedAlpha&&o.enable(8),P.shadowMapEnabled&&o.enable(9),P.useLegacyLights&&o.enable(10),P.doubleSided&&o.enable(11),P.flipSided&&o.enable(12),P.useDepthPacking&&o.enable(13),P.dithering&&o.enable(14),P.transmission&&o.enable(15),P.sheen&&o.enable(16),P.opaque&&o.enable(17),P.pointsUvs&&o.enable(18),P.decodeVideoTexture&&o.enable(19),M.push(o.mask)}function C(M){const P=v[M.type];let j;if(P){const J=ln[P];j=Yu.clone(J.uniforms)}else j=M.uniforms;return j}function w(M,P){let j;for(let J=0,oe=c.length;J<oe;J++){const B=c[J];if(B.cacheKey===P){j=B,++j.usedTimes;break}}return j===void 0&&(j=new am(i,P,M,s),c.push(j)),j}function N(M){if(--M.usedTimes===0){const P=c.indexOf(M);c[P]=c[c.length-1],c.pop(),M.destroy()}}function I(M){l.remove(M)}function k(){l.dispose()}return{getParameters:p,getProgramCacheKey:d,getUniforms:C,acquireProgram:w,releaseProgram:N,releaseShaderCache:I,programs:c,dispose:k}}function dm(){let i=new WeakMap;function e(s){let a=i.get(s);return a===void 0&&(a={},i.set(s,a)),a}function t(s){i.delete(s)}function n(s,a,o){i.get(s)[a]=o}function r(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:r}}function fm(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Fa(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Ba(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(h,f,m,v,x,p){let d=i[e];return d===void 0?(d={id:h.id,object:h,geometry:f,material:m,groupOrder:v,renderOrder:h.renderOrder,z:x,group:p},i[e]=d):(d.id=h.id,d.object=h,d.geometry=f,d.material=m,d.groupOrder=v,d.renderOrder=h.renderOrder,d.z=x,d.group=p),e++,d}function o(h,f,m,v,x,p){const d=a(h,f,m,v,x,p);m.transmission>0?n.push(d):m.transparent===!0?r.push(d):t.push(d)}function l(h,f,m,v,x,p){const d=a(h,f,m,v,x,p);m.transmission>0?n.unshift(d):m.transparent===!0?r.unshift(d):t.unshift(d)}function c(h,f){t.length>1&&t.sort(h||fm),n.length>1&&n.sort(f||Fa),r.length>1&&r.sort(f||Fa)}function u(){for(let h=e,f=i.length;h<f;h++){const m=i[h];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:o,unshift:l,finish:u,sort:c}}function pm(){let i=new WeakMap;function e(n,r){const s=i.get(n);let a;return s===void 0?(a=new Ba,i.set(n,[a])):r>=s.length?(a=new Ba,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function mm(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new G,color:new ot};break;case"SpotLight":t={position:new G,direction:new G,color:new ot,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new G,color:new ot,distance:0,decay:0};break;case"HemisphereLight":t={direction:new G,skyColor:new ot,groundColor:new ot};break;case"RectAreaLight":t={color:new ot,position:new G,halfWidth:new G,halfHeight:new G};break}return i[e.id]=t,t}}}function gm(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ve};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ve};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ve,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let _m=0;function vm(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function xm(i,e){const t=new mm,n=gm(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)r.probe.push(new G);const s=new G,a=new Ct,o=new Ct;function l(u,h){let f=0,m=0,v=0;for(let J=0;J<9;J++)r.probe[J].set(0,0,0);let x=0,p=0,d=0,b=0,E=0,C=0,w=0,N=0,I=0,k=0,M=0;u.sort(vm);const P=h===!0?Math.PI:1;for(let J=0,oe=u.length;J<oe;J++){const B=u[J],Y=B.color,te=B.intensity,Z=B.distance,ce=B.shadow&&B.shadow.map?B.shadow.map.texture:null;if(B.isAmbientLight)f+=Y.r*te*P,m+=Y.g*te*P,v+=Y.b*te*P;else if(B.isLightProbe){for(let Q=0;Q<9;Q++)r.probe[Q].addScaledVector(B.sh.coefficients[Q],te);M++}else if(B.isDirectionalLight){const Q=t.get(B);if(Q.color.copy(B.color).multiplyScalar(B.intensity*P),B.castShadow){const ne=B.shadow,he=n.get(B);he.shadowBias=ne.bias,he.shadowNormalBias=ne.normalBias,he.shadowRadius=ne.radius,he.shadowMapSize=ne.mapSize,r.directionalShadow[x]=he,r.directionalShadowMap[x]=ce,r.directionalShadowMatrix[x]=B.shadow.matrix,C++}r.directional[x]=Q,x++}else if(B.isSpotLight){const Q=t.get(B);Q.position.setFromMatrixPosition(B.matrixWorld),Q.color.copy(Y).multiplyScalar(te*P),Q.distance=Z,Q.coneCos=Math.cos(B.angle),Q.penumbraCos=Math.cos(B.angle*(1-B.penumbra)),Q.decay=B.decay,r.spot[d]=Q;const ne=B.shadow;if(B.map&&(r.spotLightMap[I]=B.map,I++,ne.updateMatrices(B),B.castShadow&&k++),r.spotLightMatrix[d]=ne.matrix,B.castShadow){const he=n.get(B);he.shadowBias=ne.bias,he.shadowNormalBias=ne.normalBias,he.shadowRadius=ne.radius,he.shadowMapSize=ne.mapSize,r.spotShadow[d]=he,r.spotShadowMap[d]=ce,N++}d++}else if(B.isRectAreaLight){const Q=t.get(B);Q.color.copy(Y).multiplyScalar(te),Q.halfWidth.set(B.width*.5,0,0),Q.halfHeight.set(0,B.height*.5,0),r.rectArea[b]=Q,b++}else if(B.isPointLight){const Q=t.get(B);if(Q.color.copy(B.color).multiplyScalar(B.intensity*P),Q.distance=B.distance,Q.decay=B.decay,B.castShadow){const ne=B.shadow,he=n.get(B);he.shadowBias=ne.bias,he.shadowNormalBias=ne.normalBias,he.shadowRadius=ne.radius,he.shadowMapSize=ne.mapSize,he.shadowCameraNear=ne.camera.near,he.shadowCameraFar=ne.camera.far,r.pointShadow[p]=he,r.pointShadowMap[p]=ce,r.pointShadowMatrix[p]=B.shadow.matrix,w++}r.point[p]=Q,p++}else if(B.isHemisphereLight){const Q=t.get(B);Q.skyColor.copy(B.color).multiplyScalar(te*P),Q.groundColor.copy(B.groundColor).multiplyScalar(te*P),r.hemi[E]=Q,E++}}b>0&&(e.isWebGL2||i.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=Ae.LTC_FLOAT_1,r.rectAreaLTC2=Ae.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=Ae.LTC_HALF_1,r.rectAreaLTC2=Ae.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=f,r.ambient[1]=m,r.ambient[2]=v;const j=r.hash;(j.directionalLength!==x||j.pointLength!==p||j.spotLength!==d||j.rectAreaLength!==b||j.hemiLength!==E||j.numDirectionalShadows!==C||j.numPointShadows!==w||j.numSpotShadows!==N||j.numSpotMaps!==I||j.numLightProbes!==M)&&(r.directional.length=x,r.spot.length=d,r.rectArea.length=b,r.point.length=p,r.hemi.length=E,r.directionalShadow.length=C,r.directionalShadowMap.length=C,r.pointShadow.length=w,r.pointShadowMap.length=w,r.spotShadow.length=N,r.spotShadowMap.length=N,r.directionalShadowMatrix.length=C,r.pointShadowMatrix.length=w,r.spotLightMatrix.length=N+I-k,r.spotLightMap.length=I,r.numSpotLightShadowsWithMaps=k,r.numLightProbes=M,j.directionalLength=x,j.pointLength=p,j.spotLength=d,j.rectAreaLength=b,j.hemiLength=E,j.numDirectionalShadows=C,j.numPointShadows=w,j.numSpotShadows=N,j.numSpotMaps=I,j.numLightProbes=M,r.version=_m++)}function c(u,h){let f=0,m=0,v=0,x=0,p=0;const d=h.matrixWorldInverse;for(let b=0,E=u.length;b<E;b++){const C=u[b];if(C.isDirectionalLight){const w=r.directional[f];w.direction.setFromMatrixPosition(C.matrixWorld),s.setFromMatrixPosition(C.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(d),f++}else if(C.isSpotLight){const w=r.spot[v];w.position.setFromMatrixPosition(C.matrixWorld),w.position.applyMatrix4(d),w.direction.setFromMatrixPosition(C.matrixWorld),s.setFromMatrixPosition(C.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(d),v++}else if(C.isRectAreaLight){const w=r.rectArea[x];w.position.setFromMatrixPosition(C.matrixWorld),w.position.applyMatrix4(d),o.identity(),a.copy(C.matrixWorld),a.premultiply(d),o.extractRotation(a),w.halfWidth.set(C.width*.5,0,0),w.halfHeight.set(0,C.height*.5,0),w.halfWidth.applyMatrix4(o),w.halfHeight.applyMatrix4(o),x++}else if(C.isPointLight){const w=r.point[m];w.position.setFromMatrixPosition(C.matrixWorld),w.position.applyMatrix4(d),m++}else if(C.isHemisphereLight){const w=r.hemi[p];w.direction.setFromMatrixPosition(C.matrixWorld),w.direction.transformDirection(d),p++}}}return{setup:l,setupView:c,state:r}}function za(i,e){const t=new xm(i,e),n=[],r=[];function s(){n.length=0,r.length=0}function a(h){n.push(h)}function o(h){r.push(h)}function l(h){t.setup(n,h)}function c(h){t.setupView(n,h)}return{init:s,state:{lightsArray:n,shadowsArray:r,lights:t},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function Em(i,e){let t=new WeakMap;function n(s,a=0){const o=t.get(s);let l;return o===void 0?(l=new za(i,e),t.set(s,[l])):a>=o.length?(l=new za(i,e),o.push(l)):l=o[a],l}function r(){t=new WeakMap}return{get:n,dispose:r}}class Sm extends kr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=eu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Mm extends kr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const ym=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,bm=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Tm(i,e,t){let n=new Sl;const r=new Ve,s=new Ve,a=new Rt,o=new Sm({depthPacking:tu}),l=new Mm,c={},u=t.maxTextureSize,h={[Bn]:Ft,[Ft]:Bn,[cn]:cn},f=new Gn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ve},radius:{value:4}},vertexShader:ym,fragmentShader:bm}),m=f.clone();m.defines.HORIZONTAL_PASS=1;const v=new ni;v.setAttribute("position",new rn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new Mn(v,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ja;let d=this.type;this.render=function(w,N,I){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||w.length===0)return;const k=i.getRenderTarget(),M=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),j=i.state;j.setBlending(Nn),j.buffers.color.setClear(1,1,1,1),j.buffers.depth.setTest(!0),j.setScissorTest(!1);const J=d!==vn&&this.type===vn,oe=d===vn&&this.type!==vn;for(let B=0,Y=w.length;B<Y;B++){const te=w[B],Z=te.shadow;if(Z===void 0){console.warn("THREE.WebGLShadowMap:",te,"has no shadow.");continue}if(Z.autoUpdate===!1&&Z.needsUpdate===!1)continue;r.copy(Z.mapSize);const ce=Z.getFrameExtents();if(r.multiply(ce),s.copy(Z.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/ce.x),r.x=s.x*ce.x,Z.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/ce.y),r.y=s.y*ce.y,Z.mapSize.y=s.y)),Z.map===null||J===!0||oe===!0){const ne=this.type!==vn?{minFilter:bt,magFilter:bt}:{};Z.map!==null&&Z.map.dispose(),Z.map=new ti(r.x,r.y,ne),Z.map.texture.name=te.name+".shadowMap",Z.camera.updateProjectionMatrix()}i.setRenderTarget(Z.map),i.clear();const Q=Z.getViewportCount();for(let ne=0;ne<Q;ne++){const he=Z.getViewport(ne);a.set(s.x*he.x,s.y*he.y,s.x*he.z,s.y*he.w),j.viewport(a),Z.updateMatrices(te,ne),n=Z.getFrustum(),C(N,I,Z.camera,te,this.type)}Z.isPointLightShadow!==!0&&this.type===vn&&b(Z,I),Z.needsUpdate=!1}d=this.type,p.needsUpdate=!1,i.setRenderTarget(k,M,P)};function b(w,N){const I=e.update(x);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,m.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,m.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new ti(r.x,r.y)),f.uniforms.shadow_pass.value=w.map.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(N,null,I,f,x,null),m.uniforms.shadow_pass.value=w.mapPass.texture,m.uniforms.resolution.value=w.mapSize,m.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(N,null,I,m,x,null)}function E(w,N,I,k){let M=null;const P=I.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(P!==void 0)M=P;else if(M=I.isPointLight===!0?l:o,i.localClippingEnabled&&N.clipShadows===!0&&Array.isArray(N.clippingPlanes)&&N.clippingPlanes.length!==0||N.displacementMap&&N.displacementScale!==0||N.alphaMap&&N.alphaTest>0||N.map&&N.alphaTest>0){const j=M.uuid,J=N.uuid;let oe=c[j];oe===void 0&&(oe={},c[j]=oe);let B=oe[J];B===void 0&&(B=M.clone(),oe[J]=B),M=B}if(M.visible=N.visible,M.wireframe=N.wireframe,k===vn?M.side=N.shadowSide!==null?N.shadowSide:N.side:M.side=N.shadowSide!==null?N.shadowSide:h[N.side],M.alphaMap=N.alphaMap,M.alphaTest=N.alphaTest,M.map=N.map,M.clipShadows=N.clipShadows,M.clippingPlanes=N.clippingPlanes,M.clipIntersection=N.clipIntersection,M.displacementMap=N.displacementMap,M.displacementScale=N.displacementScale,M.displacementBias=N.displacementBias,M.wireframeLinewidth=N.wireframeLinewidth,M.linewidth=N.linewidth,I.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const j=i.properties.get(M);j.light=I}return M}function C(w,N,I,k,M){if(w.visible===!1)return;if(w.layers.test(N.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&M===vn)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,w.matrixWorld);const J=e.update(w),oe=w.material;if(Array.isArray(oe)){const B=J.groups;for(let Y=0,te=B.length;Y<te;Y++){const Z=B[Y],ce=oe[Z.materialIndex];if(ce&&ce.visible){const Q=E(w,ce,k,M);w.onBeforeShadow(i,w,N,I,J,Q,Z),i.renderBufferDirect(I,null,J,Q,w,Z),w.onAfterShadow(i,w,N,I,J,Q,Z)}}}else if(oe.visible){const B=E(w,oe,k,M);w.onBeforeShadow(i,w,N,I,J,B,null),i.renderBufferDirect(I,null,J,B,w,null),w.onAfterShadow(i,w,N,I,J,B,null)}}const j=w.children;for(let J=0,oe=j.length;J<oe;J++)C(j[J],N,I,k,M)}}function Am(i,e,t){const n=t.isWebGL2;function r(){let F=!1;const be=new Rt;let ue=null;const K=new Rt(0,0,0,0);return{setMask:function(ve){ue!==ve&&!F&&(i.colorMask(ve,ve,ve,ve),ue=ve)},setLocked:function(ve){F=ve},setClear:function(ve,Be,Ze,gt,St){St===!0&&(ve*=gt,Be*=gt,Ze*=gt),be.set(ve,Be,Ze,gt),K.equals(be)===!1&&(i.clearColor(ve,Be,Ze,gt),K.copy(be))},reset:function(){F=!1,ue=null,K.set(-1,0,0,0)}}}function s(){let F=!1,be=null,ue=null,K=null;return{setTest:function(ve){ve?we(i.DEPTH_TEST):De(i.DEPTH_TEST)},setMask:function(ve){be!==ve&&!F&&(i.depthMask(ve),be=ve)},setFunc:function(ve){if(ue!==ve){switch(ve){case Dc:i.depthFunc(i.NEVER);break;case Uc:i.depthFunc(i.ALWAYS);break;case Ic:i.depthFunc(i.LESS);break;case Pr:i.depthFunc(i.LEQUAL);break;case Nc:i.depthFunc(i.EQUAL);break;case Oc:i.depthFunc(i.GEQUAL);break;case Fc:i.depthFunc(i.GREATER);break;case Bc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ue=ve}},setLocked:function(ve){F=ve},setClear:function(ve){K!==ve&&(i.clearDepth(ve),K=ve)},reset:function(){F=!1,be=null,ue=null,K=null}}}function a(){let F=!1,be=null,ue=null,K=null,ve=null,Be=null,Ze=null,gt=null,St=null;return{setTest:function(rt){F||(rt?we(i.STENCIL_TEST):De(i.STENCIL_TEST))},setMask:function(rt){be!==rt&&!F&&(i.stencilMask(rt),be=rt)},setFunc:function(rt,Mt,Xt){(ue!==rt||K!==Mt||ve!==Xt)&&(i.stencilFunc(rt,Mt,Xt),ue=rt,K=Mt,ve=Xt)},setOp:function(rt,Mt,Xt){(Be!==rt||Ze!==Mt||gt!==Xt)&&(i.stencilOp(rt,Mt,Xt),Be=rt,Ze=Mt,gt=Xt)},setLocked:function(rt){F=rt},setClear:function(rt){St!==rt&&(i.clearStencil(rt),St=rt)},reset:function(){F=!1,be=null,ue=null,K=null,ve=null,Be=null,Ze=null,gt=null,St=null}}}const o=new r,l=new s,c=new a,u=new WeakMap,h=new WeakMap;let f={},m={},v=new WeakMap,x=[],p=null,d=!1,b=null,E=null,C=null,w=null,N=null,I=null,k=null,M=new ot(0,0,0),P=0,j=!1,J=null,oe=null,B=null,Y=null,te=null;const Z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let ce=!1,Q=0;const ne=i.getParameter(i.VERSION);ne.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(ne)[1]),ce=Q>=1):ne.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(ne)[1]),ce=Q>=2);let he=null,xe={};const q=i.getParameter(i.SCISSOR_BOX),ie=i.getParameter(i.VIEWPORT),Ee=new Rt().fromArray(q),fe=new Rt().fromArray(ie);function z(F,be,ue,K){const ve=new Uint8Array(4),Be=i.createTexture();i.bindTexture(F,Be),i.texParameteri(F,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(F,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ze=0;Ze<ue;Ze++)n&&(F===i.TEXTURE_3D||F===i.TEXTURE_2D_ARRAY)?i.texImage3D(be,0,i.RGBA,1,1,K,0,i.RGBA,i.UNSIGNED_BYTE,ve):i.texImage2D(be+Ze,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ve);return Be}const ae={};ae[i.TEXTURE_2D]=z(i.TEXTURE_2D,i.TEXTURE_2D,1),ae[i.TEXTURE_CUBE_MAP]=z(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(ae[i.TEXTURE_2D_ARRAY]=z(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ae[i.TEXTURE_3D]=z(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),we(i.DEPTH_TEST),l.setFunc(Pr),qe(!1),We(xo),we(i.CULL_FACE),ke(Nn);function we(F){f[F]!==!0&&(i.enable(F),f[F]=!0)}function De(F){f[F]!==!1&&(i.disable(F),f[F]=!1)}function ze(F,be){return m[F]!==be?(i.bindFramebuffer(F,be),m[F]=be,n&&(F===i.DRAW_FRAMEBUFFER&&(m[i.FRAMEBUFFER]=be),F===i.FRAMEBUFFER&&(m[i.DRAW_FRAMEBUFFER]=be)),!0):!1}function H(F,be){let ue=x,K=!1;if(F)if(ue=v.get(be),ue===void 0&&(ue=[],v.set(be,ue)),F.isWebGLMultipleRenderTargets){const ve=F.texture;if(ue.length!==ve.length||ue[0]!==i.COLOR_ATTACHMENT0){for(let Be=0,Ze=ve.length;Be<Ze;Be++)ue[Be]=i.COLOR_ATTACHMENT0+Be;ue.length=ve.length,K=!0}}else ue[0]!==i.COLOR_ATTACHMENT0&&(ue[0]=i.COLOR_ATTACHMENT0,K=!0);else ue[0]!==i.BACK&&(ue[0]=i.BACK,K=!0);K&&(t.isWebGL2?i.drawBuffers(ue):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ue))}function ft(F){return p!==F?(i.useProgram(F),p=F,!0):!1}const Ie={[jn]:i.FUNC_ADD,[_c]:i.FUNC_SUBTRACT,[vc]:i.FUNC_REVERSE_SUBTRACT};if(n)Ie[yo]=i.MIN,Ie[bo]=i.MAX;else{const F=e.get("EXT_blend_minmax");F!==null&&(Ie[yo]=F.MIN_EXT,Ie[bo]=F.MAX_EXT)}const Ye={[xc]:i.ZERO,[Ec]:i.ONE,[Sc]:i.SRC_COLOR,[Ns]:i.SRC_ALPHA,[wc]:i.SRC_ALPHA_SATURATE,[Tc]:i.DST_COLOR,[yc]:i.DST_ALPHA,[Mc]:i.ONE_MINUS_SRC_COLOR,[Os]:i.ONE_MINUS_SRC_ALPHA,[Ac]:i.ONE_MINUS_DST_COLOR,[bc]:i.ONE_MINUS_DST_ALPHA,[Rc]:i.CONSTANT_COLOR,[Cc]:i.ONE_MINUS_CONSTANT_COLOR,[Pc]:i.CONSTANT_ALPHA,[Lc]:i.ONE_MINUS_CONSTANT_ALPHA};function ke(F,be,ue,K,ve,Be,Ze,gt,St,rt){if(F===Nn){d===!0&&(De(i.BLEND),d=!1);return}if(d===!1&&(we(i.BLEND),d=!0),F!==gc){if(F!==b||rt!==j){if((E!==jn||N!==jn)&&(i.blendEquation(i.FUNC_ADD),E=jn,N=jn),rt)switch(F){case yi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Eo:i.blendFunc(i.ONE,i.ONE);break;case So:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Mo:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case yi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Eo:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case So:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Mo:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}C=null,w=null,I=null,k=null,M.set(0,0,0),P=0,b=F,j=rt}return}ve=ve||be,Be=Be||ue,Ze=Ze||K,(be!==E||ve!==N)&&(i.blendEquationSeparate(Ie[be],Ie[ve]),E=be,N=ve),(ue!==C||K!==w||Be!==I||Ze!==k)&&(i.blendFuncSeparate(Ye[ue],Ye[K],Ye[Be],Ye[Ze]),C=ue,w=K,I=Be,k=Ze),(gt.equals(M)===!1||St!==P)&&(i.blendColor(gt.r,gt.g,gt.b,St),M.copy(gt),P=St),b=F,j=!1}function at(F,be){F.side===cn?De(i.CULL_FACE):we(i.CULL_FACE);let ue=F.side===Ft;be&&(ue=!ue),qe(ue),F.blending===yi&&F.transparent===!1?ke(Nn):ke(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),l.setFunc(F.depthFunc),l.setTest(F.depthTest),l.setMask(F.depthWrite),o.setMask(F.colorWrite);const K=F.stencilWrite;c.setTest(K),K&&(c.setMask(F.stencilWriteMask),c.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),c.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),pt(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?we(i.SAMPLE_ALPHA_TO_COVERAGE):De(i.SAMPLE_ALPHA_TO_COVERAGE)}function qe(F){J!==F&&(F?i.frontFace(i.CW):i.frontFace(i.CCW),J=F)}function We(F){F!==fc?(we(i.CULL_FACE),F!==oe&&(F===xo?i.cullFace(i.BACK):F===pc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):De(i.CULL_FACE),oe=F}function et(F){F!==B&&(ce&&i.lineWidth(F),B=F)}function pt(F,be,ue){F?(we(i.POLYGON_OFFSET_FILL),(Y!==be||te!==ue)&&(i.polygonOffset(be,ue),Y=be,te=ue)):De(i.POLYGON_OFFSET_FILL)}function mt(F){F?we(i.SCISSOR_TEST):De(i.SCISSOR_TEST)}function R(F){F===void 0&&(F=i.TEXTURE0+Z-1),he!==F&&(i.activeTexture(F),he=F)}function S(F,be,ue){ue===void 0&&(he===null?ue=i.TEXTURE0+Z-1:ue=he);let K=xe[ue];K===void 0&&(K={type:void 0,texture:void 0},xe[ue]=K),(K.type!==F||K.texture!==be)&&(he!==ue&&(i.activeTexture(ue),he=ue),i.bindTexture(F,be||ae[F]),K.type=F,K.texture=be)}function X(){const F=xe[he];F!==void 0&&F.type!==void 0&&(i.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function _e(){try{i.compressedTexImage2D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function de(){try{i.compressedTexImage3D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ge(){try{i.texSubImage2D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ne(){try{i.texSubImage3D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Se(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Re(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function O(){try{i.texStorage2D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function pe(){try{i.texStorage3D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ee(){try{i.texImage2D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function He(){try{i.texImage3D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ue(F){Ee.equals(F)===!1&&(i.scissor(F.x,F.y,F.z,F.w),Ee.copy(F))}function Le(F){fe.equals(F)===!1&&(i.viewport(F.x,F.y,F.z,F.w),fe.copy(F))}function Te(F,be){let ue=h.get(be);ue===void 0&&(ue=new WeakMap,h.set(be,ue));let K=ue.get(F);K===void 0&&(K=i.getUniformBlockIndex(be,F.name),ue.set(F,K))}function Pe(F,be){const K=h.get(be).get(F);u.get(be)!==K&&(i.uniformBlockBinding(be,K,F.__bindingPointIndex),u.set(be,K))}function se(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),f={},he=null,xe={},m={},v=new WeakMap,x=[],p=null,d=!1,b=null,E=null,C=null,w=null,N=null,I=null,k=null,M=new ot(0,0,0),P=0,j=!1,J=null,oe=null,B=null,Y=null,te=null,Ee.set(0,0,i.canvas.width,i.canvas.height),fe.set(0,0,i.canvas.width,i.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:we,disable:De,bindFramebuffer:ze,drawBuffers:H,useProgram:ft,setBlending:ke,setMaterial:at,setFlipSided:qe,setCullFace:We,setLineWidth:et,setPolygonOffset:pt,setScissorTest:mt,activeTexture:R,bindTexture:S,unbindTexture:X,compressedTexImage2D:_e,compressedTexImage3D:de,texImage2D:ee,texImage3D:He,updateUBOMapping:Te,uniformBlockBinding:Pe,texStorage2D:O,texStorage3D:pe,texSubImage2D:ge,texSubImage3D:Ne,compressedTexSubImage2D:Se,compressedTexSubImage3D:Re,scissor:Ue,viewport:Le,reset:se}}function wm(i,e,t,n,r,s,a){const o=r.isWebGL2,l=r.maxTextures,c=r.maxCubemapSize,u=r.maxTextureSize,h=r.maxSamples,f=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),v=new WeakMap;let x;const p=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function b(R,S){return d?new OffscreenCanvas(R,S):Fr("canvas")}function E(R,S,X,_e){let de=1;if((R.width>_e||R.height>_e)&&(de=_e/Math.max(R.width,R.height)),de<1||S===!0)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap){const ge=S?Or:Math.floor,Ne=ge(de*R.width),Se=ge(de*R.height);x===void 0&&(x=b(Ne,Se));const Re=X?b(Ne,Se):x;return Re.width=Ne,Re.height=Se,Re.getContext("2d").drawImage(R,0,0,Ne,Se),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+R.width+"x"+R.height+") to ("+Ne+"x"+Se+")."),Re}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+R.width+"x"+R.height+")."),R;return R}function C(R){return Hs(R.width)&&Hs(R.height)}function w(R){return o?!1:R.wrapS!==kt||R.wrapT!==kt||R.minFilter!==bt&&R.minFilter!==At}function N(R,S){return R.generateMipmaps&&S&&R.minFilter!==bt&&R.minFilter!==At}function I(R){i.generateMipmap(R)}function k(R,S,X,_e,de=!1){if(o===!1)return S;if(R!==null){if(i[R]!==void 0)return i[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let ge=S;if(S===i.RED&&(X===i.FLOAT&&(ge=i.R32F),X===i.HALF_FLOAT&&(ge=i.R16F),X===i.UNSIGNED_BYTE&&(ge=i.R8)),S===i.RED_INTEGER&&(X===i.UNSIGNED_BYTE&&(ge=i.R8UI),X===i.UNSIGNED_SHORT&&(ge=i.R16UI),X===i.UNSIGNED_INT&&(ge=i.R32UI),X===i.BYTE&&(ge=i.R8I),X===i.SHORT&&(ge=i.R16I),X===i.INT&&(ge=i.R32I)),S===i.RG&&(X===i.FLOAT&&(ge=i.RG32F),X===i.HALF_FLOAT&&(ge=i.RG16F),X===i.UNSIGNED_BYTE&&(ge=i.RG8)),S===i.RGBA){const Ne=de?Dr:st.getTransfer(_e);X===i.FLOAT&&(ge=i.RGBA32F),X===i.HALF_FLOAT&&(ge=i.RGBA16F),X===i.UNSIGNED_BYTE&&(ge=Ne===ct?i.SRGB8_ALPHA8:i.RGBA8),X===i.UNSIGNED_SHORT_4_4_4_4&&(ge=i.RGBA4),X===i.UNSIGNED_SHORT_5_5_5_1&&(ge=i.RGB5_A1)}return(ge===i.R16F||ge===i.R32F||ge===i.RG16F||ge===i.RG32F||ge===i.RGBA16F||ge===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ge}function M(R,S,X){return N(R,X)===!0||R.isFramebufferTexture&&R.minFilter!==bt&&R.minFilter!==At?Math.log2(Math.max(S.width,S.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?S.mipmaps.length:1}function P(R){return R===bt||R===To||R===Zr?i.NEAREST:i.LINEAR}function j(R){const S=R.target;S.removeEventListener("dispose",j),oe(S),S.isVideoTexture&&v.delete(S)}function J(R){const S=R.target;S.removeEventListener("dispose",J),Y(S)}function oe(R){const S=n.get(R);if(S.__webglInit===void 0)return;const X=R.source,_e=p.get(X);if(_e){const de=_e[S.__cacheKey];de.usedTimes--,de.usedTimes===0&&B(R),Object.keys(_e).length===0&&p.delete(X)}n.remove(R)}function B(R){const S=n.get(R);i.deleteTexture(S.__webglTexture);const X=R.source,_e=p.get(X);delete _e[S.__cacheKey],a.memory.textures--}function Y(R){const S=R.texture,X=n.get(R),_e=n.get(S);if(_e.__webglTexture!==void 0&&(i.deleteTexture(_e.__webglTexture),a.memory.textures--),R.depthTexture&&R.depthTexture.dispose(),R.isWebGLCubeRenderTarget)for(let de=0;de<6;de++){if(Array.isArray(X.__webglFramebuffer[de]))for(let ge=0;ge<X.__webglFramebuffer[de].length;ge++)i.deleteFramebuffer(X.__webglFramebuffer[de][ge]);else i.deleteFramebuffer(X.__webglFramebuffer[de]);X.__webglDepthbuffer&&i.deleteRenderbuffer(X.__webglDepthbuffer[de])}else{if(Array.isArray(X.__webglFramebuffer))for(let de=0;de<X.__webglFramebuffer.length;de++)i.deleteFramebuffer(X.__webglFramebuffer[de]);else i.deleteFramebuffer(X.__webglFramebuffer);if(X.__webglDepthbuffer&&i.deleteRenderbuffer(X.__webglDepthbuffer),X.__webglMultisampledFramebuffer&&i.deleteFramebuffer(X.__webglMultisampledFramebuffer),X.__webglColorRenderbuffer)for(let de=0;de<X.__webglColorRenderbuffer.length;de++)X.__webglColorRenderbuffer[de]&&i.deleteRenderbuffer(X.__webglColorRenderbuffer[de]);X.__webglDepthRenderbuffer&&i.deleteRenderbuffer(X.__webglDepthRenderbuffer)}if(R.isWebGLMultipleRenderTargets)for(let de=0,ge=S.length;de<ge;de++){const Ne=n.get(S[de]);Ne.__webglTexture&&(i.deleteTexture(Ne.__webglTexture),a.memory.textures--),n.remove(S[de])}n.remove(S),n.remove(R)}let te=0;function Z(){te=0}function ce(){const R=te;return R>=l&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+l),te+=1,R}function Q(R){const S=[];return S.push(R.wrapS),S.push(R.wrapT),S.push(R.wrapR||0),S.push(R.magFilter),S.push(R.minFilter),S.push(R.anisotropy),S.push(R.internalFormat),S.push(R.format),S.push(R.type),S.push(R.generateMipmaps),S.push(R.premultiplyAlpha),S.push(R.flipY),S.push(R.unpackAlignment),S.push(R.colorSpace),S.join()}function ne(R,S){const X=n.get(R);if(R.isVideoTexture&&pt(R),R.isRenderTargetTexture===!1&&R.version>0&&X.__version!==R.version){const _e=R.image;if(_e===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(_e.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{we(X,R,S);return}}t.bindTexture(i.TEXTURE_2D,X.__webglTexture,i.TEXTURE0+S)}function he(R,S){const X=n.get(R);if(R.version>0&&X.__version!==R.version){we(X,R,S);return}t.bindTexture(i.TEXTURE_2D_ARRAY,X.__webglTexture,i.TEXTURE0+S)}function xe(R,S){const X=n.get(R);if(R.version>0&&X.__version!==R.version){we(X,R,S);return}t.bindTexture(i.TEXTURE_3D,X.__webglTexture,i.TEXTURE0+S)}function q(R,S){const X=n.get(R);if(R.version>0&&X.__version!==R.version){De(X,R,S);return}t.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture,i.TEXTURE0+S)}const ie={[Bs]:i.REPEAT,[kt]:i.CLAMP_TO_EDGE,[zs]:i.MIRRORED_REPEAT},Ee={[bt]:i.NEAREST,[To]:i.NEAREST_MIPMAP_NEAREST,[Zr]:i.NEAREST_MIPMAP_LINEAR,[At]:i.LINEAR,[Yc]:i.LINEAR_MIPMAP_NEAREST,[Ri]:i.LINEAR_MIPMAP_LINEAR},fe={[ru]:i.NEVER,[uu]:i.ALWAYS,[su]:i.LESS,[al]:i.LEQUAL,[ou]:i.EQUAL,[cu]:i.GEQUAL,[au]:i.GREATER,[lu]:i.NOTEQUAL};function z(R,S,X){if(X?(i.texParameteri(R,i.TEXTURE_WRAP_S,ie[S.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,ie[S.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,ie[S.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,Ee[S.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,Ee[S.minFilter])):(i.texParameteri(R,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(R,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(S.wrapS!==kt||S.wrapT!==kt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(R,i.TEXTURE_MAG_FILTER,P(S.magFilter)),i.texParameteri(R,i.TEXTURE_MIN_FILTER,P(S.minFilter)),S.minFilter!==bt&&S.minFilter!==At&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),S.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,fe[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const _e=e.get("EXT_texture_filter_anisotropic");if(S.magFilter===bt||S.minFilter!==Zr&&S.minFilter!==Ri||S.type===nn&&e.has("OES_texture_float_linear")===!1||o===!1&&S.type===En&&e.has("OES_texture_half_float_linear")===!1)return;(S.anisotropy>1||n.get(S).__currentAnisotropy)&&(i.texParameterf(R,_e.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,r.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy)}}function ae(R,S){let X=!1;R.__webglInit===void 0&&(R.__webglInit=!0,S.addEventListener("dispose",j));const _e=S.source;let de=p.get(_e);de===void 0&&(de={},p.set(_e,de));const ge=Q(S);if(ge!==R.__cacheKey){de[ge]===void 0&&(de[ge]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,X=!0),de[ge].usedTimes++;const Ne=de[R.__cacheKey];Ne!==void 0&&(de[R.__cacheKey].usedTimes--,Ne.usedTimes===0&&B(S)),R.__cacheKey=ge,R.__webglTexture=de[ge].texture}return X}function we(R,S,X){let _e=i.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(_e=i.TEXTURE_2D_ARRAY),S.isData3DTexture&&(_e=i.TEXTURE_3D);const de=ae(R,S),ge=S.source;t.bindTexture(_e,R.__webglTexture,i.TEXTURE0+X);const Ne=n.get(ge);if(ge.version!==Ne.__version||de===!0){t.activeTexture(i.TEXTURE0+X);const Se=st.getPrimaries(st.workingColorSpace),Re=S.colorSpace===Vt?null:st.getPrimaries(S.colorSpace),O=S.colorSpace===Vt||Se===Re?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,O);const pe=w(S)&&C(S.image)===!1;let ee=E(S.image,pe,!1,u);ee=mt(S,ee);const He=C(ee)||o,Ue=s.convert(S.format,S.colorSpace);let Le=s.convert(S.type),Te=k(S.internalFormat,Ue,Le,S.colorSpace,S.isVideoTexture);z(_e,S,He);let Pe;const se=S.mipmaps,F=o&&S.isVideoTexture!==!0&&Te!==sl,be=Ne.__version===void 0||de===!0,ue=M(S,ee,He);if(S.isDepthTexture)Te=i.DEPTH_COMPONENT,o?S.type===nn?Te=i.DEPTH_COMPONENT32F:S.type===Un?Te=i.DEPTH_COMPONENT24:S.type===Kn?Te=i.DEPTH24_STENCIL8:Te=i.DEPTH_COMPONENT16:S.type===nn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),S.format===Jn&&Te===i.DEPTH_COMPONENT&&S.type!==Zs&&S.type!==Un&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),S.type=Un,Le=s.convert(S.type)),S.format===Ci&&Te===i.DEPTH_COMPONENT&&(Te=i.DEPTH_STENCIL,S.type!==Kn&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),S.type=Kn,Le=s.convert(S.type))),be&&(F?t.texStorage2D(i.TEXTURE_2D,1,Te,ee.width,ee.height):t.texImage2D(i.TEXTURE_2D,0,Te,ee.width,ee.height,0,Ue,Le,null));else if(S.isDataTexture)if(se.length>0&&He){F&&be&&t.texStorage2D(i.TEXTURE_2D,ue,Te,se[0].width,se[0].height);for(let K=0,ve=se.length;K<ve;K++)Pe=se[K],F?t.texSubImage2D(i.TEXTURE_2D,K,0,0,Pe.width,Pe.height,Ue,Le,Pe.data):t.texImage2D(i.TEXTURE_2D,K,Te,Pe.width,Pe.height,0,Ue,Le,Pe.data);S.generateMipmaps=!1}else F?(be&&t.texStorage2D(i.TEXTURE_2D,ue,Te,ee.width,ee.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,ee.width,ee.height,Ue,Le,ee.data)):t.texImage2D(i.TEXTURE_2D,0,Te,ee.width,ee.height,0,Ue,Le,ee.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){F&&be&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ue,Te,se[0].width,se[0].height,ee.depth);for(let K=0,ve=se.length;K<ve;K++)Pe=se[K],S.format!==jt?Ue!==null?F?t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,K,0,0,0,Pe.width,Pe.height,ee.depth,Ue,Pe.data,0,0):t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,K,Te,Pe.width,Pe.height,ee.depth,0,Pe.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):F?t.texSubImage3D(i.TEXTURE_2D_ARRAY,K,0,0,0,Pe.width,Pe.height,ee.depth,Ue,Le,Pe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,K,Te,Pe.width,Pe.height,ee.depth,0,Ue,Le,Pe.data)}else{F&&be&&t.texStorage2D(i.TEXTURE_2D,ue,Te,se[0].width,se[0].height);for(let K=0,ve=se.length;K<ve;K++)Pe=se[K],S.format!==jt?Ue!==null?F?t.compressedTexSubImage2D(i.TEXTURE_2D,K,0,0,Pe.width,Pe.height,Ue,Pe.data):t.compressedTexImage2D(i.TEXTURE_2D,K,Te,Pe.width,Pe.height,0,Pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):F?t.texSubImage2D(i.TEXTURE_2D,K,0,0,Pe.width,Pe.height,Ue,Le,Pe.data):t.texImage2D(i.TEXTURE_2D,K,Te,Pe.width,Pe.height,0,Ue,Le,Pe.data)}else if(S.isDataArrayTexture)F?(be&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ue,Te,ee.width,ee.height,ee.depth),t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ee.width,ee.height,ee.depth,Ue,Le,ee.data)):t.texImage3D(i.TEXTURE_2D_ARRAY,0,Te,ee.width,ee.height,ee.depth,0,Ue,Le,ee.data);else if(S.isData3DTexture)F?(be&&t.texStorage3D(i.TEXTURE_3D,ue,Te,ee.width,ee.height,ee.depth),t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ee.width,ee.height,ee.depth,Ue,Le,ee.data)):t.texImage3D(i.TEXTURE_3D,0,Te,ee.width,ee.height,ee.depth,0,Ue,Le,ee.data);else if(S.isFramebufferTexture){if(be)if(F)t.texStorage2D(i.TEXTURE_2D,ue,Te,ee.width,ee.height);else{let K=ee.width,ve=ee.height;for(let Be=0;Be<ue;Be++)t.texImage2D(i.TEXTURE_2D,Be,Te,K,ve,0,Ue,Le,null),K>>=1,ve>>=1}}else if(se.length>0&&He){F&&be&&t.texStorage2D(i.TEXTURE_2D,ue,Te,se[0].width,se[0].height);for(let K=0,ve=se.length;K<ve;K++)Pe=se[K],F?t.texSubImage2D(i.TEXTURE_2D,K,0,0,Ue,Le,Pe):t.texImage2D(i.TEXTURE_2D,K,Te,Ue,Le,Pe);S.generateMipmaps=!1}else F?(be&&t.texStorage2D(i.TEXTURE_2D,ue,Te,ee.width,ee.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,Ue,Le,ee)):t.texImage2D(i.TEXTURE_2D,0,Te,Ue,Le,ee);N(S,He)&&I(_e),Ne.__version=ge.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function De(R,S,X){if(S.image.length!==6)return;const _e=ae(R,S),de=S.source;t.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+X);const ge=n.get(de);if(de.version!==ge.__version||_e===!0){t.activeTexture(i.TEXTURE0+X);const Ne=st.getPrimaries(st.workingColorSpace),Se=S.colorSpace===Vt?null:st.getPrimaries(S.colorSpace),Re=S.colorSpace===Vt||Ne===Se?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Re);const O=S.isCompressedTexture||S.image[0].isCompressedTexture,pe=S.image[0]&&S.image[0].isDataTexture,ee=[];for(let K=0;K<6;K++)!O&&!pe?ee[K]=E(S.image[K],!1,!0,c):ee[K]=pe?S.image[K].image:S.image[K],ee[K]=mt(S,ee[K]);const He=ee[0],Ue=C(He)||o,Le=s.convert(S.format,S.colorSpace),Te=s.convert(S.type),Pe=k(S.internalFormat,Le,Te,S.colorSpace),se=o&&S.isVideoTexture!==!0,F=ge.__version===void 0||_e===!0;let be=M(S,He,Ue);z(i.TEXTURE_CUBE_MAP,S,Ue);let ue;if(O){se&&F&&t.texStorage2D(i.TEXTURE_CUBE_MAP,be,Pe,He.width,He.height);for(let K=0;K<6;K++){ue=ee[K].mipmaps;for(let ve=0;ve<ue.length;ve++){const Be=ue[ve];S.format!==jt?Le!==null?se?t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ve,0,0,Be.width,Be.height,Le,Be.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ve,Pe,Be.width,Be.height,0,Be.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):se?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ve,0,0,Be.width,Be.height,Le,Te,Be.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ve,Pe,Be.width,Be.height,0,Le,Te,Be.data)}}}else{ue=S.mipmaps,se&&F&&(ue.length>0&&be++,t.texStorage2D(i.TEXTURE_CUBE_MAP,be,Pe,ee[0].width,ee[0].height));for(let K=0;K<6;K++)if(pe){se?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,ee[K].width,ee[K].height,Le,Te,ee[K].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Pe,ee[K].width,ee[K].height,0,Le,Te,ee[K].data);for(let ve=0;ve<ue.length;ve++){const Ze=ue[ve].image[K].image;se?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ve+1,0,0,Ze.width,Ze.height,Le,Te,Ze.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ve+1,Pe,Ze.width,Ze.height,0,Le,Te,Ze.data)}}else{se?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Le,Te,ee[K]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Pe,Le,Te,ee[K]);for(let ve=0;ve<ue.length;ve++){const Be=ue[ve];se?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ve+1,0,0,Le,Te,Be.image[K]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ve+1,Pe,Le,Te,Be.image[K])}}}N(S,Ue)&&I(i.TEXTURE_CUBE_MAP),ge.__version=de.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function ze(R,S,X,_e,de,ge){const Ne=s.convert(X.format,X.colorSpace),Se=s.convert(X.type),Re=k(X.internalFormat,Ne,Se,X.colorSpace);if(!n.get(S).__hasExternalTextures){const pe=Math.max(1,S.width>>ge),ee=Math.max(1,S.height>>ge);de===i.TEXTURE_3D||de===i.TEXTURE_2D_ARRAY?t.texImage3D(de,ge,Re,pe,ee,S.depth,0,Ne,Se,null):t.texImage2D(de,ge,Re,pe,ee,0,Ne,Se,null)}t.bindFramebuffer(i.FRAMEBUFFER,R),et(S)?f.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,_e,de,n.get(X).__webglTexture,0,We(S)):(de===i.TEXTURE_2D||de>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&de<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,_e,de,n.get(X).__webglTexture,ge),t.bindFramebuffer(i.FRAMEBUFFER,null)}function H(R,S,X){if(i.bindRenderbuffer(i.RENDERBUFFER,R),S.depthBuffer&&!S.stencilBuffer){let _e=o===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(X||et(S)){const de=S.depthTexture;de&&de.isDepthTexture&&(de.type===nn?_e=i.DEPTH_COMPONENT32F:de.type===Un&&(_e=i.DEPTH_COMPONENT24));const ge=We(S);et(S)?f.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ge,_e,S.width,S.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,ge,_e,S.width,S.height)}else i.renderbufferStorage(i.RENDERBUFFER,_e,S.width,S.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,R)}else if(S.depthBuffer&&S.stencilBuffer){const _e=We(S);X&&et(S)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,_e,i.DEPTH24_STENCIL8,S.width,S.height):et(S)?f.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,_e,i.DEPTH24_STENCIL8,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,R)}else{const _e=S.isWebGLMultipleRenderTargets===!0?S.texture:[S.texture];for(let de=0;de<_e.length;de++){const ge=_e[de],Ne=s.convert(ge.format,ge.colorSpace),Se=s.convert(ge.type),Re=k(ge.internalFormat,Ne,Se,ge.colorSpace),O=We(S);X&&et(S)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,O,Re,S.width,S.height):et(S)?f.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,O,Re,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,Re,S.width,S.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ft(R,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,R),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(S.depthTexture).__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),ne(S.depthTexture,0);const _e=n.get(S.depthTexture).__webglTexture,de=We(S);if(S.depthTexture.format===Jn)et(S)?f.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,_e,0,de):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,_e,0);else if(S.depthTexture.format===Ci)et(S)?f.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,_e,0,de):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,_e,0);else throw new Error("Unknown depthTexture format")}function Ie(R){const S=n.get(R),X=R.isWebGLCubeRenderTarget===!0;if(R.depthTexture&&!S.__autoAllocateDepthBuffer){if(X)throw new Error("target.depthTexture not supported in Cube render targets");ft(S.__webglFramebuffer,R)}else if(X){S.__webglDepthbuffer=[];for(let _e=0;_e<6;_e++)t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[_e]),S.__webglDepthbuffer[_e]=i.createRenderbuffer(),H(S.__webglDepthbuffer[_e],R,!1)}else t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer=i.createRenderbuffer(),H(S.__webglDepthbuffer,R,!1);t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ye(R,S,X){const _e=n.get(R);S!==void 0&&ze(_e.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),X!==void 0&&Ie(R)}function ke(R){const S=R.texture,X=n.get(R),_e=n.get(S);R.addEventListener("dispose",J),R.isWebGLMultipleRenderTargets!==!0&&(_e.__webglTexture===void 0&&(_e.__webglTexture=i.createTexture()),_e.__version=S.version,a.memory.textures++);const de=R.isWebGLCubeRenderTarget===!0,ge=R.isWebGLMultipleRenderTargets===!0,Ne=C(R)||o;if(de){X.__webglFramebuffer=[];for(let Se=0;Se<6;Se++)if(o&&S.mipmaps&&S.mipmaps.length>0){X.__webglFramebuffer[Se]=[];for(let Re=0;Re<S.mipmaps.length;Re++)X.__webglFramebuffer[Se][Re]=i.createFramebuffer()}else X.__webglFramebuffer[Se]=i.createFramebuffer()}else{if(o&&S.mipmaps&&S.mipmaps.length>0){X.__webglFramebuffer=[];for(let Se=0;Se<S.mipmaps.length;Se++)X.__webglFramebuffer[Se]=i.createFramebuffer()}else X.__webglFramebuffer=i.createFramebuffer();if(ge)if(r.drawBuffers){const Se=R.texture;for(let Re=0,O=Se.length;Re<O;Re++){const pe=n.get(Se[Re]);pe.__webglTexture===void 0&&(pe.__webglTexture=i.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&R.samples>0&&et(R)===!1){const Se=ge?S:[S];X.__webglMultisampledFramebuffer=i.createFramebuffer(),X.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let Re=0;Re<Se.length;Re++){const O=Se[Re];X.__webglColorRenderbuffer[Re]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,X.__webglColorRenderbuffer[Re]);const pe=s.convert(O.format,O.colorSpace),ee=s.convert(O.type),He=k(O.internalFormat,pe,ee,O.colorSpace,R.isXRRenderTarget===!0),Ue=We(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ue,He,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Re,i.RENDERBUFFER,X.__webglColorRenderbuffer[Re])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(X.__webglDepthRenderbuffer=i.createRenderbuffer(),H(X.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(de){t.bindTexture(i.TEXTURE_CUBE_MAP,_e.__webglTexture),z(i.TEXTURE_CUBE_MAP,S,Ne);for(let Se=0;Se<6;Se++)if(o&&S.mipmaps&&S.mipmaps.length>0)for(let Re=0;Re<S.mipmaps.length;Re++)ze(X.__webglFramebuffer[Se][Re],R,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,Re);else ze(X.__webglFramebuffer[Se],R,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0);N(S,Ne)&&I(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ge){const Se=R.texture;for(let Re=0,O=Se.length;Re<O;Re++){const pe=Se[Re],ee=n.get(pe);t.bindTexture(i.TEXTURE_2D,ee.__webglTexture),z(i.TEXTURE_2D,pe,Ne),ze(X.__webglFramebuffer,R,pe,i.COLOR_ATTACHMENT0+Re,i.TEXTURE_2D,0),N(pe,Ne)&&I(i.TEXTURE_2D)}t.unbindTexture()}else{let Se=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(o?Se=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(Se,_e.__webglTexture),z(Se,S,Ne),o&&S.mipmaps&&S.mipmaps.length>0)for(let Re=0;Re<S.mipmaps.length;Re++)ze(X.__webglFramebuffer[Re],R,S,i.COLOR_ATTACHMENT0,Se,Re);else ze(X.__webglFramebuffer,R,S,i.COLOR_ATTACHMENT0,Se,0);N(S,Ne)&&I(Se),t.unbindTexture()}R.depthBuffer&&Ie(R)}function at(R){const S=C(R)||o,X=R.isWebGLMultipleRenderTargets===!0?R.texture:[R.texture];for(let _e=0,de=X.length;_e<de;_e++){const ge=X[_e];if(N(ge,S)){const Ne=R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,Se=n.get(ge).__webglTexture;t.bindTexture(Ne,Se),I(Ne),t.unbindTexture()}}}function qe(R){if(o&&R.samples>0&&et(R)===!1){const S=R.isWebGLMultipleRenderTargets?R.texture:[R.texture],X=R.width,_e=R.height;let de=i.COLOR_BUFFER_BIT;const ge=[],Ne=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Se=n.get(R),Re=R.isWebGLMultipleRenderTargets===!0;if(Re)for(let O=0;O<S.length;O++)t.bindFramebuffer(i.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+O,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Se.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+O,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Se.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Se.__webglFramebuffer);for(let O=0;O<S.length;O++){ge.push(i.COLOR_ATTACHMENT0+O),R.depthBuffer&&ge.push(Ne);const pe=Se.__ignoreDepthValues!==void 0?Se.__ignoreDepthValues:!1;if(pe===!1&&(R.depthBuffer&&(de|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&(de|=i.STENCIL_BUFFER_BIT)),Re&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Se.__webglColorRenderbuffer[O]),pe===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[Ne]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[Ne])),Re){const ee=n.get(S[O]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ee,0)}i.blitFramebuffer(0,0,X,_e,0,0,X,_e,de,i.NEAREST),m&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ge)}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Re)for(let O=0;O<S.length;O++){t.bindFramebuffer(i.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+O,i.RENDERBUFFER,Se.__webglColorRenderbuffer[O]);const pe=n.get(S[O]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Se.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+O,i.TEXTURE_2D,pe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Se.__webglMultisampledFramebuffer)}}function We(R){return Math.min(h,R.samples)}function et(R){const S=n.get(R);return o&&R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function pt(R){const S=a.render.frame;v.get(R)!==S&&(v.set(R,S),R.update())}function mt(R,S){const X=R.colorSpace,_e=R.format,de=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||R.format===Gs||X!==sn&&X!==Vt&&(st.getTransfer(X)===ct?o===!1?e.has("EXT_sRGB")===!0&&_e===jt?(R.format=Gs,R.minFilter=At,R.generateMipmaps=!1):S=cl.sRGBToLinear(S):(_e!==jt||de!==Fn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",X)),S}this.allocateTextureUnit=ce,this.resetTextureUnits=Z,this.setTexture2D=ne,this.setTexture2DArray=he,this.setTexture3D=xe,this.setTextureCube=q,this.rebindTextures=Ye,this.setupRenderTarget=ke,this.updateRenderTargetMipmap=at,this.updateMultisampleRenderTarget=qe,this.setupDepthRenderbuffer=Ie,this.setupFrameBufferTexture=ze,this.useMultisampledRTT=et}function Rm(i,e,t){const n=t.isWebGL2;function r(s,a=Vt){let o;const l=st.getTransfer(a);if(s===Fn)return i.UNSIGNED_BYTE;if(s===Qa)return i.UNSIGNED_SHORT_4_4_4_4;if(s===el)return i.UNSIGNED_SHORT_5_5_5_1;if(s===qc)return i.BYTE;if(s===$c)return i.SHORT;if(s===Zs)return i.UNSIGNED_SHORT;if(s===Ja)return i.INT;if(s===Un)return i.UNSIGNED_INT;if(s===nn)return i.FLOAT;if(s===En)return n?i.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(s===jc)return i.ALPHA;if(s===jt)return i.RGBA;if(s===Zc)return i.LUMINANCE;if(s===Kc)return i.LUMINANCE_ALPHA;if(s===Jn)return i.DEPTH_COMPONENT;if(s===Ci)return i.DEPTH_STENCIL;if(s===Gs)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(s===tl)return i.RED;if(s===nl)return i.RED_INTEGER;if(s===Jc)return i.RG;if(s===il)return i.RG_INTEGER;if(s===rl)return i.RGBA_INTEGER;if(s===Kr||s===Jr||s===Qr||s===es)if(l===ct)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(s===Kr)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Jr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Qr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===es)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(s===Kr)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Jr)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Qr)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===es)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Ao||s===wo||s===Ro||s===Co)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(s===Ao)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===wo)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Ro)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Co)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===sl)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===Po||s===Lo)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(s===Po)return l===ct?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(s===Lo)return l===ct?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Do||s===Uo||s===Io||s===No||s===Oo||s===Fo||s===Bo||s===zo||s===Go||s===Ho||s===ko||s===Vo||s===Wo||s===Xo)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(s===Do)return l===ct?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Uo)return l===ct?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Io)return l===ct?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===No)return l===ct?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Oo)return l===ct?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Fo)return l===ct?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Bo)return l===ct?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===zo)return l===ct?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Go)return l===ct?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Ho)return l===ct?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===ko)return l===ct?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Vo)return l===ct?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Wo)return l===ct?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Xo)return l===ct?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===ts||s===Yo||s===qo)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(s===ts)return l===ct?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Yo)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===qo)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===Qc||s===$o||s===jo||s===Zo)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(s===ts)return o.COMPRESSED_RED_RGTC1_EXT;if(s===$o)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===jo)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Zo)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Kn?n?i.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):i[s]!==void 0?i[s]:null}return{convert:r}}class Cm extends $t{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Tr extends Wt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Pm={type:"move"};class bs{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Tr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Tr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new G,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new G),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Tr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new G,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new G),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const x of e.hand.values()){const p=t.getJointPose(x,n),d=this._getHandJoint(c,x);p!==null&&(d.matrix.fromArray(p.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=p.radius),d.visible=p!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),m=.02,v=.005;c.inputState.pinching&&f>m+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=m-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Pm)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Tr;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Lm extends Hn{constructor(e,t){super();const n=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,h=null,f=null,m=null,v=null;const x=t.getContextAttributes();let p=null,d=null;const b=[],E=[],C=new Ve;let w=null;const N=new $t;N.layers.enable(1),N.viewport=new Rt;const I=new $t;I.layers.enable(2),I.viewport=new Rt;const k=[N,I],M=new Cm;M.layers.enable(1),M.layers.enable(2);let P=null,j=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let ie=b[q];return ie===void 0&&(ie=new bs,b[q]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function(q){let ie=b[q];return ie===void 0&&(ie=new bs,b[q]=ie),ie.getGripSpace()},this.getHand=function(q){let ie=b[q];return ie===void 0&&(ie=new bs,b[q]=ie),ie.getHandSpace()};function J(q){const ie=E.indexOf(q.inputSource);if(ie===-1)return;const Ee=b[ie];Ee!==void 0&&(Ee.update(q.inputSource,q.frame,c||a),Ee.dispatchEvent({type:q.type,data:q.inputSource}))}function oe(){r.removeEventListener("select",J),r.removeEventListener("selectstart",J),r.removeEventListener("selectend",J),r.removeEventListener("squeeze",J),r.removeEventListener("squeezestart",J),r.removeEventListener("squeezeend",J),r.removeEventListener("end",oe),r.removeEventListener("inputsourceschange",B);for(let q=0;q<b.length;q++){const ie=E[q];ie!==null&&(E[q]=null,b[q].disconnect(ie))}P=null,j=null,e.setRenderTarget(p),m=null,f=null,h=null,r=null,d=null,xe.stop(),n.isPresenting=!1,e.setPixelRatio(w),e.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){s=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){o=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return f!==null?f:m},this.getBinding=function(){return h},this.getFrame=function(){return v},this.getSession=function(){return r},this.setSession=async function(q){if(r=q,r!==null){if(p=e.getRenderTarget(),r.addEventListener("select",J),r.addEventListener("selectstart",J),r.addEventListener("selectend",J),r.addEventListener("squeeze",J),r.addEventListener("squeezestart",J),r.addEventListener("squeezeend",J),r.addEventListener("end",oe),r.addEventListener("inputsourceschange",B),x.xrCompatible!==!0&&await t.makeXRCompatible(),w=e.getPixelRatio(),e.getSize(C),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const ie={antialias:r.renderState.layers===void 0?x.antialias:!0,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,t,ie),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),d=new ti(m.framebufferWidth,m.framebufferHeight,{format:jt,type:Fn,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil})}else{let ie=null,Ee=null,fe=null;x.depth&&(fe=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ie=x.stencil?Ci:Jn,Ee=x.stencil?Kn:Un);const z={colorFormat:t.RGBA8,depthFormat:fe,scaleFactor:s};h=new XRWebGLBinding(r,t),f=h.createProjectionLayer(z),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),d=new ti(f.textureWidth,f.textureHeight,{format:jt,type:Fn,depthTexture:new yl(f.textureWidth,f.textureHeight,Ee,void 0,void 0,void 0,void 0,void 0,void 0,ie),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0});const ae=e.properties.get(d);ae.__ignoreDepthValues=f.ignoreDepthValues}d.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),xe.setContext(r),xe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function B(q){for(let ie=0;ie<q.removed.length;ie++){const Ee=q.removed[ie],fe=E.indexOf(Ee);fe>=0&&(E[fe]=null,b[fe].disconnect(Ee))}for(let ie=0;ie<q.added.length;ie++){const Ee=q.added[ie];let fe=E.indexOf(Ee);if(fe===-1){for(let ae=0;ae<b.length;ae++)if(ae>=E.length){E.push(Ee),fe=ae;break}else if(E[ae]===null){E[ae]=Ee,fe=ae;break}if(fe===-1)break}const z=b[fe];z&&z.connect(Ee)}}const Y=new G,te=new G;function Z(q,ie,Ee){Y.setFromMatrixPosition(ie.matrixWorld),te.setFromMatrixPosition(Ee.matrixWorld);const fe=Y.distanceTo(te),z=ie.projectionMatrix.elements,ae=Ee.projectionMatrix.elements,we=z[14]/(z[10]-1),De=z[14]/(z[10]+1),ze=(z[9]+1)/z[5],H=(z[9]-1)/z[5],ft=(z[8]-1)/z[0],Ie=(ae[8]+1)/ae[0],Ye=we*ft,ke=we*Ie,at=fe/(-ft+Ie),qe=at*-ft;ie.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(qe),q.translateZ(at),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert();const We=we+at,et=De+at,pt=Ye-qe,mt=ke+(fe-qe),R=ze*De/et*We,S=H*De/et*We;q.projectionMatrix.makePerspective(pt,mt,R,S,We,et),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}function ce(q,ie){ie===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(ie.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(r===null)return;M.near=I.near=N.near=q.near,M.far=I.far=N.far=q.far,(P!==M.near||j!==M.far)&&(r.updateRenderState({depthNear:M.near,depthFar:M.far}),P=M.near,j=M.far);const ie=q.parent,Ee=M.cameras;ce(M,ie);for(let fe=0;fe<Ee.length;fe++)ce(Ee[fe],ie);Ee.length===2?Z(M,N,I):M.projectionMatrix.copy(N.projectionMatrix),Q(q,M,ie)};function Q(q,ie,Ee){Ee===null?q.matrix.copy(ie.matrixWorld):(q.matrix.copy(Ee.matrixWorld),q.matrix.invert(),q.matrix.multiply(ie.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(ie.projectionMatrix),q.projectionMatrixInverse.copy(ie.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=ji*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(f===null&&m===null))return l},this.setFoveation=function(q){l=q,f!==null&&(f.fixedFoveation=q),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=q)};let ne=null;function he(q,ie){if(u=ie.getViewerPose(c||a),v=ie,u!==null){const Ee=u.views;m!==null&&(e.setRenderTargetFramebuffer(d,m.framebuffer),e.setRenderTarget(d));let fe=!1;Ee.length!==M.cameras.length&&(M.cameras.length=0,fe=!0);for(let z=0;z<Ee.length;z++){const ae=Ee[z];let we=null;if(m!==null)we=m.getViewport(ae);else{const ze=h.getViewSubImage(f,ae);we=ze.viewport,z===0&&(e.setRenderTargetTextures(d,ze.colorTexture,f.ignoreDepthValues?void 0:ze.depthStencilTexture),e.setRenderTarget(d))}let De=k[z];De===void 0&&(De=new $t,De.layers.enable(z),De.viewport=new Rt,k[z]=De),De.matrix.fromArray(ae.transform.matrix),De.matrix.decompose(De.position,De.quaternion,De.scale),De.projectionMatrix.fromArray(ae.projectionMatrix),De.projectionMatrixInverse.copy(De.projectionMatrix).invert(),De.viewport.set(we.x,we.y,we.width,we.height),z===0&&(M.matrix.copy(De.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),fe===!0&&M.cameras.push(De)}}for(let Ee=0;Ee<b.length;Ee++){const fe=E[Ee],z=b[Ee];fe!==null&&z!==void 0&&z.update(fe,ie,c||a)}ne&&ne(q,ie),ie.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ie}),v=null}const xe=new Ml;xe.setAnimationLoop(he),this.setAnimationLoop=function(q){ne=q},this.dispose=function(){}}}function Dm(i,e){function t(p,d){p.matrixAutoUpdate===!0&&p.updateMatrix(),d.value.copy(p.matrix)}function n(p,d){d.color.getRGB(p.fogColor.value,vl(i)),d.isFog?(p.fogNear.value=d.near,p.fogFar.value=d.far):d.isFogExp2&&(p.fogDensity.value=d.density)}function r(p,d,b,E,C){d.isMeshBasicMaterial||d.isMeshLambertMaterial?s(p,d):d.isMeshToonMaterial?(s(p,d),h(p,d)):d.isMeshPhongMaterial?(s(p,d),u(p,d)):d.isMeshStandardMaterial?(s(p,d),f(p,d),d.isMeshPhysicalMaterial&&m(p,d,C)):d.isMeshMatcapMaterial?(s(p,d),v(p,d)):d.isMeshDepthMaterial?s(p,d):d.isMeshDistanceMaterial?(s(p,d),x(p,d)):d.isMeshNormalMaterial?s(p,d):d.isLineBasicMaterial?(a(p,d),d.isLineDashedMaterial&&o(p,d)):d.isPointsMaterial?l(p,d,b,E):d.isSpriteMaterial?c(p,d):d.isShadowMaterial?(p.color.value.copy(d.color),p.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(p,d){p.opacity.value=d.opacity,d.color&&p.diffuse.value.copy(d.color),d.emissive&&p.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(p.map.value=d.map,t(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,t(d.alphaMap,p.alphaMapTransform)),d.bumpMap&&(p.bumpMap.value=d.bumpMap,t(d.bumpMap,p.bumpMapTransform),p.bumpScale.value=d.bumpScale,d.side===Ft&&(p.bumpScale.value*=-1)),d.normalMap&&(p.normalMap.value=d.normalMap,t(d.normalMap,p.normalMapTransform),p.normalScale.value.copy(d.normalScale),d.side===Ft&&p.normalScale.value.negate()),d.displacementMap&&(p.displacementMap.value=d.displacementMap,t(d.displacementMap,p.displacementMapTransform),p.displacementScale.value=d.displacementScale,p.displacementBias.value=d.displacementBias),d.emissiveMap&&(p.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,p.emissiveMapTransform)),d.specularMap&&(p.specularMap.value=d.specularMap,t(d.specularMap,p.specularMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest);const b=e.get(d).envMap;if(b&&(p.envMap.value=b,p.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=d.reflectivity,p.ior.value=d.ior,p.refractionRatio.value=d.refractionRatio),d.lightMap){p.lightMap.value=d.lightMap;const E=i._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=d.lightMapIntensity*E,t(d.lightMap,p.lightMapTransform)}d.aoMap&&(p.aoMap.value=d.aoMap,p.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,p.aoMapTransform))}function a(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,d.map&&(p.map.value=d.map,t(d.map,p.mapTransform))}function o(p,d){p.dashSize.value=d.dashSize,p.totalSize.value=d.dashSize+d.gapSize,p.scale.value=d.scale}function l(p,d,b,E){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.size.value=d.size*b,p.scale.value=E*.5,d.map&&(p.map.value=d.map,t(d.map,p.uvTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,t(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function c(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.rotation.value=d.rotation,d.map&&(p.map.value=d.map,t(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,t(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function u(p,d){p.specular.value.copy(d.specular),p.shininess.value=Math.max(d.shininess,1e-4)}function h(p,d){d.gradientMap&&(p.gradientMap.value=d.gradientMap)}function f(p,d){p.metalness.value=d.metalness,d.metalnessMap&&(p.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,p.metalnessMapTransform)),p.roughness.value=d.roughness,d.roughnessMap&&(p.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,p.roughnessMapTransform)),e.get(d).envMap&&(p.envMapIntensity.value=d.envMapIntensity)}function m(p,d,b){p.ior.value=d.ior,d.sheen>0&&(p.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),p.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(p.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,p.sheenColorMapTransform)),d.sheenRoughnessMap&&(p.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,p.sheenRoughnessMapTransform))),d.clearcoat>0&&(p.clearcoat.value=d.clearcoat,p.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(p.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,p.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(p.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Ft&&p.clearcoatNormalScale.value.negate())),d.iridescence>0&&(p.iridescence.value=d.iridescence,p.iridescenceIOR.value=d.iridescenceIOR,p.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(p.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,p.iridescenceMapTransform)),d.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),d.transmission>0&&(p.transmission.value=d.transmission,p.transmissionSamplerMap.value=b.texture,p.transmissionSamplerSize.value.set(b.width,b.height),d.transmissionMap&&(p.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,p.transmissionMapTransform)),p.thickness.value=d.thickness,d.thicknessMap&&(p.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=d.attenuationDistance,p.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(p.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(p.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=d.specularIntensity,p.specularColor.value.copy(d.specularColor),d.specularColorMap&&(p.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,p.specularColorMapTransform)),d.specularIntensityMap&&(p.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,p.specularIntensityMapTransform))}function v(p,d){d.matcap&&(p.matcap.value=d.matcap)}function x(p,d){const b=e.get(d).light;p.referencePosition.value.setFromMatrixPosition(b.matrixWorld),p.nearDistance.value=b.shadow.camera.near,p.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function Um(i,e,t,n){let r={},s={},a=[];const o=t.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(b,E){const C=E.program;n.uniformBlockBinding(b,C)}function c(b,E){let C=r[b.id];C===void 0&&(v(b),C=u(b),r[b.id]=C,b.addEventListener("dispose",p));const w=E.program;n.updateUBOMapping(b,w);const N=e.render.frame;s[b.id]!==N&&(f(b),s[b.id]=N)}function u(b){const E=h();b.__bindingPointIndex=E;const C=i.createBuffer(),w=b.__size,N=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,C),i.bufferData(i.UNIFORM_BUFFER,w,N),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,C),C}function h(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(b){const E=r[b.id],C=b.uniforms,w=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let N=0,I=C.length;N<I;N++){const k=C[N];if(m(k,N,w)===!0){const M=k.__offset,P=Array.isArray(k.value)?k.value:[k.value];let j=0;for(let J=0;J<P.length;J++){const oe=P[J],B=x(oe);typeof oe=="number"?(k.__data[0]=oe,i.bufferSubData(i.UNIFORM_BUFFER,M+j,k.__data)):oe.isMatrix3?(k.__data[0]=oe.elements[0],k.__data[1]=oe.elements[1],k.__data[2]=oe.elements[2],k.__data[3]=oe.elements[0],k.__data[4]=oe.elements[3],k.__data[5]=oe.elements[4],k.__data[6]=oe.elements[5],k.__data[7]=oe.elements[0],k.__data[8]=oe.elements[6],k.__data[9]=oe.elements[7],k.__data[10]=oe.elements[8],k.__data[11]=oe.elements[0]):(oe.toArray(k.__data,j),j+=B.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,M,k.__data)}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(b,E,C){const w=b.value;if(C[E]===void 0){if(typeof w=="number")C[E]=w;else{const N=Array.isArray(w)?w:[w],I=[];for(let k=0;k<N.length;k++)I.push(N[k].clone());C[E]=I}return!0}else if(typeof w=="number"){if(C[E]!==w)return C[E]=w,!0}else{const N=Array.isArray(C[E])?C[E]:[C[E]],I=Array.isArray(w)?w:[w];for(let k=0;k<N.length;k++){const M=N[k];if(M.equals(I[k])===!1)return M.copy(I[k]),!0}}return!1}function v(b){const E=b.uniforms;let C=0;const w=16;let N=0;for(let I=0,k=E.length;I<k;I++){const M=E[I],P={boundary:0,storage:0},j=Array.isArray(M.value)?M.value:[M.value];for(let J=0,oe=j.length;J<oe;J++){const B=j[J],Y=x(B);P.boundary+=Y.boundary,P.storage+=Y.storage}if(M.__data=new Float32Array(P.storage/Float32Array.BYTES_PER_ELEMENT),M.__offset=C,I>0){N=C%w;const J=w-N;N!==0&&J-P.boundary<0&&(C+=w-N,M.__offset=C)}C+=P.storage}return N=C%w,N>0&&(C+=w-N),b.__size=C,b.__cache={},this}function x(b){const E={boundary:0,storage:0};return typeof b=="number"?(E.boundary=4,E.storage=4):b.isVector2?(E.boundary=8,E.storage=8):b.isVector3||b.isColor?(E.boundary=16,E.storage=12):b.isVector4?(E.boundary=16,E.storage=16):b.isMatrix3?(E.boundary=48,E.storage=48):b.isMatrix4?(E.boundary=64,E.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),E}function p(b){const E=b.target;E.removeEventListener("dispose",p);const C=a.indexOf(E.__bindingPointIndex);a.splice(C,1),i.deleteBuffer(r[E.id]),delete r[E.id],delete s[E.id]}function d(){for(const b in r)i.deleteBuffer(r[b]);a=[],r={},s={}}return{bind:l,update:c,dispose:d}}class Cl{constructor(e={}){const{canvas:t=Tu(),context:n=null,depth:r=!0,stencil:s=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1}=e;this.isWebGLRenderer=!0;let f;n!==null?f=n.getContextAttributes().alpha:f=a;const m=new Uint32Array(4),v=new Int32Array(4);let x=null,p=null;const d=[],b=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Tt,this._useLegacyLights=!1,this.toneMapping=On,this.toneMappingExposure=1;const E=this;let C=!1,w=0,N=0,I=null,k=-1,M=null;const P=new Rt,j=new Rt;let J=null;const oe=new ot(0);let B=0,Y=t.width,te=t.height,Z=1,ce=null,Q=null;const ne=new Rt(0,0,Y,te),he=new Rt(0,0,Y,te);let xe=!1;const q=new Sl;let ie=!1,Ee=!1,fe=null;const z=new Ct,ae=new Ve,we=new G,De={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function ze(){return I===null?Z:1}let H=n;function ft(g,T){for(let A=0;A<g.length;A++){const L=g[A],U=t.getContext(L,T);if(U!==null)return U}return null}try{const g={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${js}`),t.addEventListener("webglcontextlost",se,!1),t.addEventListener("webglcontextrestored",F,!1),t.addEventListener("webglcontextcreationerror",be,!1),H===null){const T=["webgl2","webgl","experimental-webgl"];if(E.isWebGL1Renderer===!0&&T.shift(),H=ft(T,g),H===null)throw ft(T)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&H instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),H.getShaderPrecisionFormat===void 0&&(H.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(g){throw console.error("THREE.WebGLRenderer: "+g.message),g}let Ie,Ye,ke,at,qe,We,et,pt,mt,R,S,X,_e,de,ge,Ne,Se,Re,O,pe,ee,He,Ue,Le;function Te(){Ie=new Wf(H),Ye=new Ff(H,Ie,e),Ie.init(Ye),He=new Rm(H,Ie,Ye),ke=new Am(H,Ie,Ye),at=new qf(H),qe=new dm,We=new wm(H,Ie,ke,qe,Ye,He,at),et=new zf(E),pt=new Vf(E),mt=new Qu(H,Ye),Ue=new Nf(H,Ie,mt,Ye),R=new Xf(H,mt,at,Ue),S=new Kf(H,R,mt,at),O=new Zf(H,Ye,We),Ne=new Bf(qe),X=new hm(E,et,pt,Ie,Ye,Ue,Ne),_e=new Dm(E,qe),de=new pm,ge=new Em(Ie,Ye),Re=new If(E,et,pt,ke,S,f,l),Se=new Tm(E,S,Ye),Le=new Um(H,at,Ye,ke),pe=new Of(H,Ie,at,Ye),ee=new Yf(H,Ie,at,Ye),at.programs=X.programs,E.capabilities=Ye,E.extensions=Ie,E.properties=qe,E.renderLists=de,E.shadowMap=Se,E.state=ke,E.info=at}Te();const Pe=new Lm(E,H);this.xr=Pe,this.getContext=function(){return H},this.getContextAttributes=function(){return H.getContextAttributes()},this.forceContextLoss=function(){const g=Ie.get("WEBGL_lose_context");g&&g.loseContext()},this.forceContextRestore=function(){const g=Ie.get("WEBGL_lose_context");g&&g.restoreContext()},this.getPixelRatio=function(){return Z},this.setPixelRatio=function(g){g!==void 0&&(Z=g,this.setSize(Y,te,!1))},this.getSize=function(g){return g.set(Y,te)},this.setSize=function(g,T,A=!0){if(Pe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Y=g,te=T,t.width=Math.floor(g*Z),t.height=Math.floor(T*Z),A===!0&&(t.style.width=g+"px",t.style.height=T+"px"),this.setViewport(0,0,g,T)},this.getDrawingBufferSize=function(g){return g.set(Y*Z,te*Z).floor()},this.setDrawingBufferSize=function(g,T,A){Y=g,te=T,Z=A,t.width=Math.floor(g*A),t.height=Math.floor(T*A),this.setViewport(0,0,g,T)},this.getCurrentViewport=function(g){return g.copy(P)},this.getViewport=function(g){return g.copy(ne)},this.setViewport=function(g,T,A,L){g.isVector4?ne.set(g.x,g.y,g.z,g.w):ne.set(g,T,A,L),ke.viewport(P.copy(ne).multiplyScalar(Z).floor())},this.getScissor=function(g){return g.copy(he)},this.setScissor=function(g,T,A,L){g.isVector4?he.set(g.x,g.y,g.z,g.w):he.set(g,T,A,L),ke.scissor(j.copy(he).multiplyScalar(Z).floor())},this.getScissorTest=function(){return xe},this.setScissorTest=function(g){ke.setScissorTest(xe=g)},this.setOpaqueSort=function(g){ce=g},this.setTransparentSort=function(g){Q=g},this.getClearColor=function(g){return g.copy(Re.getClearColor())},this.setClearColor=function(){Re.setClearColor.apply(Re,arguments)},this.getClearAlpha=function(){return Re.getClearAlpha()},this.setClearAlpha=function(){Re.setClearAlpha.apply(Re,arguments)},this.clear=function(g=!0,T=!0,A=!0){let L=0;if(g){let U=!1;if(I!==null){const W=I.texture.format;U=W===rl||W===il||W===nl}if(U){const W=I.texture.type,V=W===Fn||W===Un||W===Zs||W===Kn||W===Qa||W===el,$=Re.getClearColor(),re=Re.getClearAlpha(),le=$.r,me=$.g,Me=$.b;V?(m[0]=le,m[1]=me,m[2]=Me,m[3]=re,H.clearBufferuiv(H.COLOR,0,m)):(v[0]=le,v[1]=me,v[2]=Me,v[3]=re,H.clearBufferiv(H.COLOR,0,v))}else L|=H.COLOR_BUFFER_BIT}T&&(L|=H.DEPTH_BUFFER_BIT),A&&(L|=H.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H.clear(L)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",se,!1),t.removeEventListener("webglcontextrestored",F,!1),t.removeEventListener("webglcontextcreationerror",be,!1),de.dispose(),ge.dispose(),qe.dispose(),et.dispose(),pt.dispose(),S.dispose(),Ue.dispose(),Le.dispose(),X.dispose(),Pe.dispose(),Pe.removeEventListener("sessionstart",St),Pe.removeEventListener("sessionend",rt),fe&&(fe.dispose(),fe=null),Mt.stop()};function se(g){g.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function F(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const g=at.autoReset,T=Se.enabled,A=Se.autoUpdate,L=Se.needsUpdate,U=Se.type;Te(),at.autoReset=g,Se.enabled=T,Se.autoUpdate=A,Se.needsUpdate=L,Se.type=U}function be(g){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",g.statusMessage)}function ue(g){const T=g.target;T.removeEventListener("dispose",ue),K(T)}function K(g){ve(g),qe.remove(g)}function ve(g){const T=qe.get(g).programs;T!==void 0&&(T.forEach(function(A){X.releaseProgram(A)}),g.isShaderMaterial&&X.releaseShaderCache(g))}this.renderBufferDirect=function(g,T,A,L,U,W){T===null&&(T=De);const V=U.isMesh&&U.matrixWorld.determinant()<0,$=_(g,T,A,L,U);ke.setMaterial(L,V);let re=A.index,le=1;if(L.wireframe===!0){if(re=R.getWireframeAttribute(A),re===void 0)return;le=2}const me=A.drawRange,Me=A.attributes.position;let ye=me.start*le,Ce=(me.start+me.count)*le;W!==null&&(ye=Math.max(ye,W.start*le),Ce=Math.min(Ce,(W.start+W.count)*le)),re!==null?(ye=Math.max(ye,0),Ce=Math.min(Ce,re.count)):Me!=null&&(ye=Math.max(ye,0),Ce=Math.min(Ce,Me.count));const Oe=Ce-ye;if(Oe<0||Oe===1/0)return;Ue.setup(U,L,$,A,re);let nt,Xe=pe;if(re!==null&&(nt=mt.get(re),Xe=ee,Xe.setIndex(nt)),U.isMesh)L.wireframe===!0?(ke.setLineWidth(L.wireframeLinewidth*ze()),Xe.setMode(H.LINES)):Xe.setMode(H.TRIANGLES);else if(U.isLine){let Ge=L.linewidth;Ge===void 0&&(Ge=1),ke.setLineWidth(Ge*ze()),U.isLineSegments?Xe.setMode(H.LINES):U.isLineLoop?Xe.setMode(H.LINE_LOOP):Xe.setMode(H.LINE_STRIP)}else U.isPoints?Xe.setMode(H.POINTS):U.isSprite&&Xe.setMode(H.TRIANGLES);if(U.isBatchedMesh)Xe.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else if(U.isInstancedMesh)Xe.renderInstances(ye,Oe,U.count);else if(A.isInstancedBufferGeometry){const Ge=A._maxInstanceCount!==void 0?A._maxInstanceCount:1/0,it=Math.min(A.instanceCount,Ge);Xe.renderInstances(ye,Oe,it)}else Xe.render(ye,Oe)};function Be(g,T,A){g.transparent===!0&&g.side===cn&&g.forceSinglePass===!1?(g.side=Ft,g.needsUpdate=!0,Ke(g,T,A),g.side=Bn,g.needsUpdate=!0,Ke(g,T,A),g.side=cn):Ke(g,T,A)}this.compile=function(g,T,A=null){A===null&&(A=g),p=ge.get(A),p.init(),b.push(p),A.traverseVisible(function(U){U.isLight&&U.layers.test(T.layers)&&(p.pushLight(U),U.castShadow&&p.pushShadow(U))}),g!==A&&g.traverseVisible(function(U){U.isLight&&U.layers.test(T.layers)&&(p.pushLight(U),U.castShadow&&p.pushShadow(U))}),p.setupLights(E._useLegacyLights);const L=new Set;return g.traverse(function(U){const W=U.material;if(W)if(Array.isArray(W))for(let V=0;V<W.length;V++){const $=W[V];Be($,A,U),L.add($)}else Be(W,A,U),L.add(W)}),b.pop(),p=null,L},this.compileAsync=function(g,T,A=null){const L=this.compile(g,T,A);return new Promise(U=>{function W(){if(L.forEach(function(V){qe.get(V).currentProgram.isReady()&&L.delete(V)}),L.size===0){U(g);return}setTimeout(W,10)}Ie.get("KHR_parallel_shader_compile")!==null?W():setTimeout(W,10)})};let Ze=null;function gt(g){Ze&&Ze(g)}function St(){Mt.stop()}function rt(){Mt.start()}const Mt=new Ml;Mt.setAnimationLoop(gt),typeof self<"u"&&Mt.setContext(self),this.setAnimationLoop=function(g){Ze=g,Pe.setAnimationLoop(g),g===null?Mt.stop():Mt.start()},Pe.addEventListener("sessionstart",St),Pe.addEventListener("sessionend",rt),this.render=function(g,T){if(T!==void 0&&T.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;g.matrixWorldAutoUpdate===!0&&g.updateMatrixWorld(),T.parent===null&&T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),Pe.enabled===!0&&Pe.isPresenting===!0&&(Pe.cameraAutoUpdate===!0&&Pe.updateCamera(T),T=Pe.getCamera()),g.isScene===!0&&g.onBeforeRender(E,g,T,I),p=ge.get(g,b.length),p.init(),b.push(p),z.multiplyMatrices(T.projectionMatrix,T.matrixWorldInverse),q.setFromProjectionMatrix(z),Ee=this.localClippingEnabled,ie=Ne.init(this.clippingPlanes,Ee),x=de.get(g,d.length),x.init(),d.push(x),Xt(g,T,0,E.sortObjects),x.finish(),E.sortObjects===!0&&x.sort(ce,Q),this.info.render.frame++,ie===!0&&Ne.beginShadows();const A=p.state.shadowsArray;if(Se.render(A,g,T),ie===!0&&Ne.endShadows(),this.info.autoReset===!0&&this.info.reset(),Re.render(x,g),p.setupLights(E._useLegacyLights),T.isArrayCamera){const L=T.cameras;for(let U=0,W=L.length;U<W;U++){const V=L[U];Vn(x,g,V,V.viewport)}}else Vn(x,g,T);I!==null&&(We.updateMultisampleRenderTarget(I),We.updateRenderTargetMipmap(I)),g.isScene===!0&&g.onAfterRender(E,g,T),Ue.resetDefaultState(),k=-1,M=null,b.pop(),b.length>0?p=b[b.length-1]:p=null,d.pop(),d.length>0?x=d[d.length-1]:x=null};function Xt(g,T,A,L){if(g.visible===!1)return;if(g.layers.test(T.layers)){if(g.isGroup)A=g.renderOrder;else if(g.isLOD)g.autoUpdate===!0&&g.update(T);else if(g.isLight)p.pushLight(g),g.castShadow&&p.pushShadow(g);else if(g.isSprite){if(!g.frustumCulled||q.intersectsSprite(g)){L&&we.setFromMatrixPosition(g.matrixWorld).applyMatrix4(z);const V=S.update(g),$=g.material;$.visible&&x.push(g,V,$,A,we.z,null)}}else if((g.isMesh||g.isLine||g.isPoints)&&(!g.frustumCulled||q.intersectsObject(g))){const V=S.update(g),$=g.material;if(L&&(g.boundingSphere!==void 0?(g.boundingSphere===null&&g.computeBoundingSphere(),we.copy(g.boundingSphere.center)):(V.boundingSphere===null&&V.computeBoundingSphere(),we.copy(V.boundingSphere.center)),we.applyMatrix4(g.matrixWorld).applyMatrix4(z)),Array.isArray($)){const re=V.groups;for(let le=0,me=re.length;le<me;le++){const Me=re[le],ye=$[Me.materialIndex];ye&&ye.visible&&x.push(g,V,ye,A,we.z,Me)}}else $.visible&&x.push(g,V,$,A,we.z,null)}}const W=g.children;for(let V=0,$=W.length;V<$;V++)Xt(W[V],T,A,L)}function Vn(g,T,A,L){const U=g.opaque,W=g.transmissive,V=g.transparent;p.setupLightsView(A),ie===!0&&Ne.setGlobalState(E.clippingPlanes,A),W.length>0&&$r(U,W,T,A),L&&ke.viewport(P.copy(L)),U.length>0&&on(U,T,A),W.length>0&&on(W,T,A),V.length>0&&on(V,T,A),ke.buffers.depth.setTest(!0),ke.buffers.depth.setMask(!0),ke.buffers.color.setMask(!0),ke.setPolygonOffset(!1)}function $r(g,T,A,L){if((A.isScene===!0?A.overrideMaterial:null)!==null)return;const W=Ye.isWebGL2;fe===null&&(fe=new ti(1,1,{generateMipmaps:!0,type:Ie.has("EXT_color_buffer_half_float")?En:Fn,minFilter:Ri,samples:W?4:0})),E.getDrawingBufferSize(ae),W?fe.setSize(ae.x,ae.y):fe.setSize(Or(ae.x),Or(ae.y));const V=E.getRenderTarget();E.setRenderTarget(fe),E.getClearColor(oe),B=E.getClearAlpha(),B<1&&E.setClearColor(16777215,.5),E.clear();const $=E.toneMapping;E.toneMapping=On,on(g,A,L),We.updateMultisampleRenderTarget(fe),We.updateRenderTargetMipmap(fe);let re=!1;for(let le=0,me=T.length;le<me;le++){const Me=T[le],ye=Me.object,Ce=Me.geometry,Oe=Me.material,nt=Me.group;if(Oe.side===cn&&ye.layers.test(L.layers)){const Xe=Oe.side;Oe.side=Ft,Oe.needsUpdate=!0,yn(ye,A,L,Ce,Oe,nt),Oe.side=Xe,Oe.needsUpdate=!0,re=!0}}re===!0&&(We.updateMultisampleRenderTarget(fe),We.updateRenderTargetMipmap(fe)),E.setRenderTarget(V),E.setClearColor(oe,B),E.toneMapping=$}function on(g,T,A){const L=T.isScene===!0?T.overrideMaterial:null;for(let U=0,W=g.length;U<W;U++){const V=g[U],$=V.object,re=V.geometry,le=L===null?V.material:L,me=V.group;$.layers.test(A.layers)&&yn($,T,A,re,le,me)}}function yn(g,T,A,L,U,W){g.onBeforeRender(E,T,A,L,U,W),g.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,g.matrixWorld),g.normalMatrix.getNormalMatrix(g.modelViewMatrix),U.onBeforeRender(E,T,A,L,g,W),U.transparent===!0&&U.side===cn&&U.forceSinglePass===!1?(U.side=Ft,U.needsUpdate=!0,E.renderBufferDirect(A,T,L,U,g,W),U.side=Bn,U.needsUpdate=!0,E.renderBufferDirect(A,T,L,U,g,W),U.side=cn):E.renderBufferDirect(A,T,L,U,g,W),g.onAfterRender(E,T,A,L,U,W)}function Ke(g,T,A){T.isScene!==!0&&(T=De);const L=qe.get(g),U=p.state.lights,W=p.state.shadowsArray,V=U.state.version,$=X.getParameters(g,U.state,W,T,A),re=X.getProgramCacheKey($);let le=L.programs;L.environment=g.isMeshStandardMaterial?T.environment:null,L.fog=T.fog,L.envMap=(g.isMeshStandardMaterial?pt:et).get(g.envMap||L.environment),le===void 0&&(g.addEventListener("dispose",ue),le=new Map,L.programs=le);let me=le.get(re);if(me!==void 0){if(L.currentProgram===me&&L.lightsStateVersion===V)return nr(g,$),me}else $.uniforms=X.getUniforms(g),g.onBuild(A,$,E),g.onBeforeCompile($,E),me=X.acquireProgram($,re),le.set(re,me),L.uniforms=$.uniforms;const Me=L.uniforms;return(!g.isShaderMaterial&&!g.isRawShaderMaterial||g.clipping===!0)&&(Me.clippingPlanes=Ne.uniform),nr(g,$),L.needsLights=D(g),L.lightsStateVersion=V,L.needsLights&&(Me.ambientLightColor.value=U.state.ambient,Me.lightProbe.value=U.state.probe,Me.directionalLights.value=U.state.directional,Me.directionalLightShadows.value=U.state.directionalShadow,Me.spotLights.value=U.state.spot,Me.spotLightShadows.value=U.state.spotShadow,Me.rectAreaLights.value=U.state.rectArea,Me.ltc_1.value=U.state.rectAreaLTC1,Me.ltc_2.value=U.state.rectAreaLTC2,Me.pointLights.value=U.state.point,Me.pointLightShadows.value=U.state.pointShadow,Me.hemisphereLights.value=U.state.hemi,Me.directionalShadowMap.value=U.state.directionalShadowMap,Me.directionalShadowMatrix.value=U.state.directionalShadowMatrix,Me.spotShadowMap.value=U.state.spotShadowMap,Me.spotLightMatrix.value=U.state.spotLightMatrix,Me.spotLightMap.value=U.state.spotLightMap,Me.pointShadowMap.value=U.state.pointShadowMap,Me.pointShadowMatrix.value=U.state.pointShadowMatrix),L.currentProgram=me,L.uniformsList=null,me}function Fi(g){if(g.uniformsList===null){const T=g.currentProgram.getUniforms();g.uniformsList=Cr.seqWithValue(T.seq,g.uniforms)}return g.uniformsList}function nr(g,T){const A=qe.get(g);A.outputColorSpace=T.outputColorSpace,A.batching=T.batching,A.instancing=T.instancing,A.instancingColor=T.instancingColor,A.skinning=T.skinning,A.morphTargets=T.morphTargets,A.morphNormals=T.morphNormals,A.morphColors=T.morphColors,A.morphTargetsCount=T.morphTargetsCount,A.numClippingPlanes=T.numClippingPlanes,A.numIntersection=T.numClipIntersection,A.vertexAlphas=T.vertexAlphas,A.vertexTangents=T.vertexTangents,A.toneMapping=T.toneMapping}function _(g,T,A,L,U){T.isScene!==!0&&(T=De),We.resetTextureUnits();const W=T.fog,V=L.isMeshStandardMaterial?T.environment:null,$=I===null?E.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:sn,re=(L.isMeshStandardMaterial?pt:et).get(L.envMap||V),le=L.vertexColors===!0&&!!A.attributes.color&&A.attributes.color.itemSize===4,me=!!A.attributes.tangent&&(!!L.normalMap||L.anisotropy>0),Me=!!A.morphAttributes.position,ye=!!A.morphAttributes.normal,Ce=!!A.morphAttributes.color;let Oe=On;L.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(Oe=E.toneMapping);const nt=A.morphAttributes.position||A.morphAttributes.normal||A.morphAttributes.color,Xe=nt!==void 0?nt.length:0,Ge=qe.get(L),it=p.state.lights;if(ie===!0&&(Ee===!0||g!==M)){const dt=g===M&&L.id===k;Ne.setState(L,g,dt)}let Fe=!1;L.version===Ge.__version?(Ge.needsLights&&Ge.lightsStateVersion!==it.state.version||Ge.outputColorSpace!==$||U.isBatchedMesh&&Ge.batching===!1||!U.isBatchedMesh&&Ge.batching===!0||U.isInstancedMesh&&Ge.instancing===!1||!U.isInstancedMesh&&Ge.instancing===!0||U.isSkinnedMesh&&Ge.skinning===!1||!U.isSkinnedMesh&&Ge.skinning===!0||U.isInstancedMesh&&Ge.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&Ge.instancingColor===!1&&U.instanceColor!==null||Ge.envMap!==re||L.fog===!0&&Ge.fog!==W||Ge.numClippingPlanes!==void 0&&(Ge.numClippingPlanes!==Ne.numPlanes||Ge.numIntersection!==Ne.numIntersection)||Ge.vertexAlphas!==le||Ge.vertexTangents!==me||Ge.morphTargets!==Me||Ge.morphNormals!==ye||Ge.morphColors!==Ce||Ge.toneMapping!==Oe||Ye.isWebGL2===!0&&Ge.morphTargetsCount!==Xe)&&(Fe=!0):(Fe=!0,Ge.__version=L.version);let lt=Ge.currentProgram;Fe===!0&&(lt=Ke(L,T,U));let Ut=!1,ht=!1,tt=!1;const $e=lt.getUniforms(),yt=Ge.uniforms;if(ke.useProgram(lt.program)&&(Ut=!0,ht=!0,tt=!0),L.id!==k&&(k=L.id,ht=!0),Ut||M!==g){$e.setValue(H,"projectionMatrix",g.projectionMatrix),$e.setValue(H,"viewMatrix",g.matrixWorldInverse);const dt=$e.map.cameraPosition;dt!==void 0&&dt.setValue(H,we.setFromMatrixPosition(g.matrixWorld)),Ye.logarithmicDepthBuffer&&$e.setValue(H,"logDepthBufFC",2/(Math.log(g.far+1)/Math.LN2)),(L.isMeshPhongMaterial||L.isMeshToonMaterial||L.isMeshLambertMaterial||L.isMeshBasicMaterial||L.isMeshStandardMaterial||L.isShaderMaterial)&&$e.setValue(H,"isOrthographic",g.isOrthographicCamera===!0),M!==g&&(M=g,ht=!0,tt=!0)}if(U.isSkinnedMesh){$e.setOptional(H,U,"bindMatrix"),$e.setOptional(H,U,"bindMatrixInverse");const dt=U.skeleton;dt&&(Ye.floatVertexTextures?(dt.boneTexture===null&&dt.computeBoneTexture(),$e.setValue(H,"boneTexture",dt.boneTexture,We)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}U.isBatchedMesh&&($e.setOptional(H,U,"batchingTexture"),$e.setValue(H,"batchingTexture",U._matricesTexture,We));const hn=A.morphAttributes;if((hn.position!==void 0||hn.normal!==void 0||hn.color!==void 0&&Ye.isWebGL2===!0)&&O.update(U,A,lt),(ht||Ge.receiveShadow!==U.receiveShadow)&&(Ge.receiveShadow=U.receiveShadow,$e.setValue(H,"receiveShadow",U.receiveShadow)),L.isMeshGouraudMaterial&&L.envMap!==null&&(yt.envMap.value=re,yt.flipEnvMap.value=re.isCubeTexture&&re.isRenderTargetTexture===!1?-1:1),ht&&($e.setValue(H,"toneMappingExposure",E.toneMappingExposure),Ge.needsLights&&y(yt,tt),W&&L.fog===!0&&_e.refreshFogUniforms(yt,W),_e.refreshMaterialUniforms(yt,L,Z,te,fe),Cr.upload(H,Fi(Ge),yt,We)),L.isShaderMaterial&&L.uniformsNeedUpdate===!0&&(Cr.upload(H,Fi(Ge),yt,We),L.uniformsNeedUpdate=!1),L.isSpriteMaterial&&$e.setValue(H,"center",U.center),$e.setValue(H,"modelViewMatrix",U.modelViewMatrix),$e.setValue(H,"normalMatrix",U.normalMatrix),$e.setValue(H,"modelMatrix",U.matrixWorld),L.isShaderMaterial||L.isRawShaderMaterial){const dt=L.uniformsGroups;for(let bn=0,ic=dt.length;bn<ic;bn++)if(Ye.isWebGL2){const _o=dt[bn];Le.update(_o,lt),Le.bind(_o,lt)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return lt}function y(g,T){g.ambientLightColor.needsUpdate=T,g.lightProbe.needsUpdate=T,g.directionalLights.needsUpdate=T,g.directionalLightShadows.needsUpdate=T,g.pointLights.needsUpdate=T,g.pointLightShadows.needsUpdate=T,g.spotLights.needsUpdate=T,g.spotLightShadows.needsUpdate=T,g.rectAreaLights.needsUpdate=T,g.hemisphereLights.needsUpdate=T}function D(g){return g.isMeshLambertMaterial||g.isMeshToonMaterial||g.isMeshPhongMaterial||g.isMeshStandardMaterial||g.isShadowMaterial||g.isShaderMaterial&&g.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return N},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(g,T,A){qe.get(g.texture).__webglTexture=T,qe.get(g.depthTexture).__webglTexture=A;const L=qe.get(g);L.__hasExternalTextures=!0,L.__hasExternalTextures&&(L.__autoAllocateDepthBuffer=A===void 0,L.__autoAllocateDepthBuffer||Ie.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),L.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(g,T){const A=qe.get(g);A.__webglFramebuffer=T,A.__useDefaultFramebuffer=T===void 0},this.setRenderTarget=function(g,T=0,A=0){I=g,w=T,N=A;let L=!0,U=null,W=!1,V=!1;if(g){const re=qe.get(g);re.__useDefaultFramebuffer!==void 0?(ke.bindFramebuffer(H.FRAMEBUFFER,null),L=!1):re.__webglFramebuffer===void 0?We.setupRenderTarget(g):re.__hasExternalTextures&&We.rebindTextures(g,qe.get(g.texture).__webglTexture,qe.get(g.depthTexture).__webglTexture);const le=g.texture;(le.isData3DTexture||le.isDataArrayTexture||le.isCompressedArrayTexture)&&(V=!0);const me=qe.get(g).__webglFramebuffer;g.isWebGLCubeRenderTarget?(Array.isArray(me[T])?U=me[T][A]:U=me[T],W=!0):Ye.isWebGL2&&g.samples>0&&We.useMultisampledRTT(g)===!1?U=qe.get(g).__webglMultisampledFramebuffer:Array.isArray(me)?U=me[A]:U=me,P.copy(g.viewport),j.copy(g.scissor),J=g.scissorTest}else P.copy(ne).multiplyScalar(Z).floor(),j.copy(he).multiplyScalar(Z).floor(),J=xe;if(ke.bindFramebuffer(H.FRAMEBUFFER,U)&&Ye.drawBuffers&&L&&ke.drawBuffers(g,U),ke.viewport(P),ke.scissor(j),ke.setScissorTest(J),W){const re=qe.get(g.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_CUBE_MAP_POSITIVE_X+T,re.__webglTexture,A)}else if(V){const re=qe.get(g.texture),le=T||0;H.framebufferTextureLayer(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,re.__webglTexture,A||0,le)}k=-1},this.readRenderTargetPixels=function(g,T,A,L,U,W,V){if(!(g&&g.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let $=qe.get(g).__webglFramebuffer;if(g.isWebGLCubeRenderTarget&&V!==void 0&&($=$[V]),$){ke.bindFramebuffer(H.FRAMEBUFFER,$);try{const re=g.texture,le=re.format,me=re.type;if(le!==jt&&He.convert(le)!==H.getParameter(H.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Me=me===En&&(Ie.has("EXT_color_buffer_half_float")||Ye.isWebGL2&&Ie.has("EXT_color_buffer_float"));if(me!==Fn&&He.convert(me)!==H.getParameter(H.IMPLEMENTATION_COLOR_READ_TYPE)&&!(me===nn&&(Ye.isWebGL2||Ie.has("OES_texture_float")||Ie.has("WEBGL_color_buffer_float")))&&!Me){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}T>=0&&T<=g.width-L&&A>=0&&A<=g.height-U&&H.readPixels(T,A,L,U,He.convert(le),He.convert(me),W)}finally{const re=I!==null?qe.get(I).__webglFramebuffer:null;ke.bindFramebuffer(H.FRAMEBUFFER,re)}}},this.copyFramebufferToTexture=function(g,T,A=0){const L=Math.pow(2,-A),U=Math.floor(T.image.width*L),W=Math.floor(T.image.height*L);We.setTexture2D(T,0),H.copyTexSubImage2D(H.TEXTURE_2D,A,0,0,g.x,g.y,U,W),ke.unbindTexture()},this.copyTextureToTexture=function(g,T,A,L=0){const U=T.image.width,W=T.image.height,V=He.convert(A.format),$=He.convert(A.type);We.setTexture2D(A,0),H.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,A.flipY),H.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),H.pixelStorei(H.UNPACK_ALIGNMENT,A.unpackAlignment),T.isDataTexture?H.texSubImage2D(H.TEXTURE_2D,L,g.x,g.y,U,W,V,$,T.image.data):T.isCompressedTexture?H.compressedTexSubImage2D(H.TEXTURE_2D,L,g.x,g.y,T.mipmaps[0].width,T.mipmaps[0].height,V,T.mipmaps[0].data):H.texSubImage2D(H.TEXTURE_2D,L,g.x,g.y,V,$,T.image),L===0&&A.generateMipmaps&&H.generateMipmap(H.TEXTURE_2D),ke.unbindTexture()},this.copyTextureToTexture3D=function(g,T,A,L,U=0){if(E.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const W=g.max.x-g.min.x+1,V=g.max.y-g.min.y+1,$=g.max.z-g.min.z+1,re=He.convert(L.format),le=He.convert(L.type);let me;if(L.isData3DTexture)We.setTexture3D(L,0),me=H.TEXTURE_3D;else if(L.isDataArrayTexture)We.setTexture2DArray(L,0),me=H.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}H.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,L.flipY),H.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),H.pixelStorei(H.UNPACK_ALIGNMENT,L.unpackAlignment);const Me=H.getParameter(H.UNPACK_ROW_LENGTH),ye=H.getParameter(H.UNPACK_IMAGE_HEIGHT),Ce=H.getParameter(H.UNPACK_SKIP_PIXELS),Oe=H.getParameter(H.UNPACK_SKIP_ROWS),nt=H.getParameter(H.UNPACK_SKIP_IMAGES),Xe=A.isCompressedTexture?A.mipmaps[0]:A.image;H.pixelStorei(H.UNPACK_ROW_LENGTH,Xe.width),H.pixelStorei(H.UNPACK_IMAGE_HEIGHT,Xe.height),H.pixelStorei(H.UNPACK_SKIP_PIXELS,g.min.x),H.pixelStorei(H.UNPACK_SKIP_ROWS,g.min.y),H.pixelStorei(H.UNPACK_SKIP_IMAGES,g.min.z),A.isDataTexture||A.isData3DTexture?H.texSubImage3D(me,U,T.x,T.y,T.z,W,V,$,re,le,Xe.data):A.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),H.compressedTexSubImage3D(me,U,T.x,T.y,T.z,W,V,$,re,Xe.data)):H.texSubImage3D(me,U,T.x,T.y,T.z,W,V,$,re,le,Xe),H.pixelStorei(H.UNPACK_ROW_LENGTH,Me),H.pixelStorei(H.UNPACK_IMAGE_HEIGHT,ye),H.pixelStorei(H.UNPACK_SKIP_PIXELS,Ce),H.pixelStorei(H.UNPACK_SKIP_ROWS,Oe),H.pixelStorei(H.UNPACK_SKIP_IMAGES,nt),U===0&&L.generateMipmaps&&H.generateMipmap(me),ke.unbindTexture()},this.initTexture=function(g){g.isCubeTexture?We.setTextureCube(g,0):g.isData3DTexture?We.setTexture3D(g,0):g.isDataArrayTexture||g.isCompressedArrayTexture?We.setTexture2DArray(g,0):We.setTexture2D(g,0),ke.unbindTexture()},this.resetState=function(){w=0,N=0,I=null,ke.reset(),Ue.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Sn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Ks?"display-p3":"srgb",t.unpackColorSpace=st.workingColorSpace===Gr?"display-p3":"srgb"}get physicallyCorrectLights(){return console.warn("THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),!this.useLegacyLights}set physicallyCorrectLights(e){console.warn("THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),this.useLegacyLights=!e}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Tt?Qn:ol}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Qn?Tt:sn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class Im extends Cl{}Im.prototype.isWebGL1Renderer=!0;class Nm extends Wt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class Om extends Bt{constructor(e=null,t=1,n=1,r,s,a,o,l,c=bt,u=bt,h,f){super(null,a,o,l,c,u,r,s,h,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ga={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class Fm{constructor(e,t,n){const r=this;let s=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){o++,s===!1&&r.onStart!==void 0&&r.onStart(u,a,o),s=!0},this.itemEnd=function(u){a++,r.onProgress!==void 0&&r.onProgress(u,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){const h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,f=c.length;h<f;h+=2){const m=c[h],v=c[h+1];if(m.global&&(m.lastIndex=0),m.test(u))return v}return null}}}const Bm=new Fm;class to{constructor(e){this.manager=e!==void 0?e:Bm,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}to.DEFAULT_MATERIAL_NAME="__DEFAULT";const _n={};class zm extends Error{constructor(e,t){super(e),this.response=t}}class Gm extends to{constructor(e){super(e)}load(e,t,n,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=Ga.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(_n[e]!==void 0){_n[e].push({onLoad:t,onProgress:n,onError:r});return}_n[e]=[],_n[e].push({onLoad:t,onProgress:n,onError:r});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=_n[e],h=c.body.getReader(),f=c.headers.get("Content-Length")||c.headers.get("X-File-Size"),m=f?parseInt(f):0,v=m!==0;let x=0;const p=new ReadableStream({start(d){b();function b(){h.read().then(({done:E,value:C})=>{if(E)d.close();else{x+=C.byteLength;const w=new ProgressEvent("progress",{lengthComputable:v,loaded:x,total:m});for(let N=0,I=u.length;N<I;N++){const k=u[N];k.onProgress&&k.onProgress(w)}d.enqueue(C),b()}})}}});return new Response(p)}else throw new zm(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return c.json();default:if(o===void 0)return c.text();{const h=/charset="?([^;"\s]*)"?/i.exec(o),f=h&&h[1]?h[1].toLowerCase():void 0,m=new TextDecoder(f);return c.arrayBuffer().then(v=>m.decode(v))}}}).then(c=>{Ga.add(e,c);const u=_n[e];delete _n[e];for(let h=0,f=u.length;h<f;h++){const m=u[h];m.onLoad&&m.onLoad(c)}}).catch(c=>{const u=_n[e];if(u===void 0)throw this.manager.itemError(e),c;delete _n[e];for(let h=0,f=u.length;h<f;h++){const m=u[h];m.onError&&m.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class Hm extends to{constructor(e){super(e)}load(e,t,n,r){const s=this,a=new Om,o=new Gm(this.manager);return o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setPath(this.path),o.setWithCredentials(s.withCredentials),o.load(e,function(l){let c;try{c=s.parse(l)}catch(u){if(r!==void 0)r(u);else{console.error(u);return}}c.image!==void 0?a.image=c.image:c.data!==void 0&&(a.image.width=c.width,a.image.height=c.height,a.image.data=c.data),a.wrapS=c.wrapS!==void 0?c.wrapS:kt,a.wrapT=c.wrapT!==void 0?c.wrapT:kt,a.magFilter=c.magFilter!==void 0?c.magFilter:At,a.minFilter=c.minFilter!==void 0?c.minFilter:At,a.anisotropy=c.anisotropy!==void 0?c.anisotropy:1,c.colorSpace!==void 0?a.colorSpace=c.colorSpace:c.encoding!==void 0&&(a.encoding=c.encoding),c.flipY!==void 0&&(a.flipY=c.flipY),c.format!==void 0&&(a.format=c.format),c.type!==void 0&&(a.type=c.type),c.mipmaps!==void 0&&(a.mipmaps=c.mipmaps,a.minFilter=Ri),c.mipmapCount===1&&(a.minFilter=At),c.generateMipmaps!==void 0&&(a.generateMipmaps=c.generateMipmaps),a.needsUpdate=!0,t&&t(a,c)},n,r),a}}class Ha{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(wt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:js}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=js);const ka={type:"change"},Ts={type:"start"},Va={type:"end"},Ar=new dl,Wa=new Dn,km=Math.cos(70*ks.DEG2RAD);class Vm extends Hn{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new G,this.cursor=new G,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:qt.ROTATE,MIDDLE:qt.DOLLY,RIGHT:qt.PAN},this.touches={ONE:Ln.ROTATE,TWO:Ln.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return o.phi},this.getAzimuthalAngle=function(){return o.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(O){O.addEventListener("keydown",S),this._domElementKeyEvents=O},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",S),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(ka),n.update(),s=r.NONE},this.update=function(){const O=new G,pe=new zn().setFromUnitVectors(e.up,new G(0,1,0)),ee=pe.clone().invert(),He=new G,Ue=new zn,Le=new G,Te=2*Math.PI;return function(se=null){const F=n.object.position;O.copy(F).sub(n.target),O.applyQuaternion(pe),o.setFromVector3(O),n.autoRotate&&s===r.NONE&&j(M(se)),n.enableDamping?(o.theta+=l.theta*n.dampingFactor,o.phi+=l.phi*n.dampingFactor):(o.theta+=l.theta,o.phi+=l.phi);let be=n.minAzimuthAngle,ue=n.maxAzimuthAngle;isFinite(be)&&isFinite(ue)&&(be<-Math.PI?be+=Te:be>Math.PI&&(be-=Te),ue<-Math.PI?ue+=Te:ue>Math.PI&&(ue-=Te),be<=ue?o.theta=Math.max(be,Math.min(ue,o.theta)):o.theta=o.theta>(be+ue)/2?Math.max(be,o.theta):Math.min(ue,o.theta)),o.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,o.phi)),o.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(u,n.dampingFactor):n.target.add(u),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor),n.zoomToCursor&&N||n.object.isOrthographicCamera?o.radius=Q(o.radius):o.radius=Q(o.radius*c),O.setFromSpherical(o),O.applyQuaternion(ee),F.copy(n.target).add(O),n.object.lookAt(n.target),n.enableDamping===!0?(l.theta*=1-n.dampingFactor,l.phi*=1-n.dampingFactor,u.multiplyScalar(1-n.dampingFactor)):(l.set(0,0,0),u.set(0,0,0));let K=!1;if(n.zoomToCursor&&N){let ve=null;if(n.object.isPerspectiveCamera){const Be=O.length();ve=Q(Be*c);const Ze=Be-ve;n.object.position.addScaledVector(C,Ze),n.object.updateMatrixWorld()}else if(n.object.isOrthographicCamera){const Be=new G(w.x,w.y,0);Be.unproject(n.object),n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/c)),n.object.updateProjectionMatrix(),K=!0;const Ze=new G(w.x,w.y,0);Ze.unproject(n.object),n.object.position.sub(Ze).add(Be),n.object.updateMatrixWorld(),ve=O.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;ve!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(ve).add(n.object.position):(Ar.origin.copy(n.object.position),Ar.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(Ar.direction))<km?e.lookAt(n.target):(Wa.setFromNormalAndCoplanarPoint(n.object.up,n.target),Ar.intersectPlane(Wa,n.target))))}else n.object.isOrthographicCamera&&(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/c)),n.object.updateProjectionMatrix(),K=!0);return c=1,N=!1,K||He.distanceToSquared(n.object.position)>a||8*(1-Ue.dot(n.object.quaternion))>a||Le.distanceToSquared(n.target)>0?(n.dispatchEvent(ka),He.copy(n.object.position),Ue.copy(n.object.quaternion),Le.copy(n.target),!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",de),n.domElement.removeEventListener("pointerdown",qe),n.domElement.removeEventListener("pointercancel",et),n.domElement.removeEventListener("wheel",R),n.domElement.removeEventListener("pointermove",We),n.domElement.removeEventListener("pointerup",et),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",S),n._domElementKeyEvents=null)};const n=this,r={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let s=r.NONE;const a=1e-6,o=new Ha,l=new Ha;let c=1;const u=new G,h=new Ve,f=new Ve,m=new Ve,v=new Ve,x=new Ve,p=new Ve,d=new Ve,b=new Ve,E=new Ve,C=new G,w=new Ve;let N=!1;const I=[],k={};function M(O){return O!==null?2*Math.PI/60*n.autoRotateSpeed*O:2*Math.PI/60/60*n.autoRotateSpeed}function P(){return Math.pow(.95,n.zoomSpeed)}function j(O){l.theta-=O}function J(O){l.phi-=O}const oe=function(){const O=new G;return function(ee,He){O.setFromMatrixColumn(He,0),O.multiplyScalar(-ee),u.add(O)}}(),B=function(){const O=new G;return function(ee,He){n.screenSpacePanning===!0?O.setFromMatrixColumn(He,1):(O.setFromMatrixColumn(He,0),O.crossVectors(n.object.up,O)),O.multiplyScalar(ee),u.add(O)}}(),Y=function(){const O=new G;return function(ee,He){const Ue=n.domElement;if(n.object.isPerspectiveCamera){const Le=n.object.position;O.copy(Le).sub(n.target);let Te=O.length();Te*=Math.tan(n.object.fov/2*Math.PI/180),oe(2*ee*Te/Ue.clientHeight,n.object.matrix),B(2*He*Te/Ue.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(oe(ee*(n.object.right-n.object.left)/n.object.zoom/Ue.clientWidth,n.object.matrix),B(He*(n.object.top-n.object.bottom)/n.object.zoom/Ue.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function te(O){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?c/=O:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function Z(O){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?c*=O:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function ce(O){if(!n.zoomToCursor)return;N=!0;const pe=n.domElement.getBoundingClientRect(),ee=O.clientX-pe.left,He=O.clientY-pe.top,Ue=pe.width,Le=pe.height;w.x=ee/Ue*2-1,w.y=-(He/Le)*2+1,C.set(w.x,w.y,1).unproject(n.object).sub(n.object.position).normalize()}function Q(O){return Math.max(n.minDistance,Math.min(n.maxDistance,O))}function ne(O){h.set(O.clientX,O.clientY)}function he(O){ce(O),d.set(O.clientX,O.clientY)}function xe(O){v.set(O.clientX,O.clientY)}function q(O){f.set(O.clientX,O.clientY),m.subVectors(f,h).multiplyScalar(n.rotateSpeed);const pe=n.domElement;j(2*Math.PI*m.x/pe.clientHeight),J(2*Math.PI*m.y/pe.clientHeight),h.copy(f),n.update()}function ie(O){b.set(O.clientX,O.clientY),E.subVectors(b,d),E.y>0?te(P()):E.y<0&&Z(P()),d.copy(b),n.update()}function Ee(O){x.set(O.clientX,O.clientY),p.subVectors(x,v).multiplyScalar(n.panSpeed),Y(p.x,p.y),v.copy(x),n.update()}function fe(O){ce(O),O.deltaY<0?Z(P()):O.deltaY>0&&te(P()),n.update()}function z(O){let pe=!1;switch(O.code){case n.keys.UP:O.ctrlKey||O.metaKey||O.shiftKey?J(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):Y(0,n.keyPanSpeed),pe=!0;break;case n.keys.BOTTOM:O.ctrlKey||O.metaKey||O.shiftKey?J(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):Y(0,-n.keyPanSpeed),pe=!0;break;case n.keys.LEFT:O.ctrlKey||O.metaKey||O.shiftKey?j(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):Y(n.keyPanSpeed,0),pe=!0;break;case n.keys.RIGHT:O.ctrlKey||O.metaKey||O.shiftKey?j(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):Y(-n.keyPanSpeed,0),pe=!0;break}pe&&(O.preventDefault(),n.update())}function ae(){if(I.length===1)h.set(I[0].pageX,I[0].pageY);else{const O=.5*(I[0].pageX+I[1].pageX),pe=.5*(I[0].pageY+I[1].pageY);h.set(O,pe)}}function we(){if(I.length===1)v.set(I[0].pageX,I[0].pageY);else{const O=.5*(I[0].pageX+I[1].pageX),pe=.5*(I[0].pageY+I[1].pageY);v.set(O,pe)}}function De(){const O=I[0].pageX-I[1].pageX,pe=I[0].pageY-I[1].pageY,ee=Math.sqrt(O*O+pe*pe);d.set(0,ee)}function ze(){n.enableZoom&&De(),n.enablePan&&we()}function H(){n.enableZoom&&De(),n.enableRotate&&ae()}function ft(O){if(I.length==1)f.set(O.pageX,O.pageY);else{const ee=Re(O),He=.5*(O.pageX+ee.x),Ue=.5*(O.pageY+ee.y);f.set(He,Ue)}m.subVectors(f,h).multiplyScalar(n.rotateSpeed);const pe=n.domElement;j(2*Math.PI*m.x/pe.clientHeight),J(2*Math.PI*m.y/pe.clientHeight),h.copy(f)}function Ie(O){if(I.length===1)x.set(O.pageX,O.pageY);else{const pe=Re(O),ee=.5*(O.pageX+pe.x),He=.5*(O.pageY+pe.y);x.set(ee,He)}p.subVectors(x,v).multiplyScalar(n.panSpeed),Y(p.x,p.y),v.copy(x)}function Ye(O){const pe=Re(O),ee=O.pageX-pe.x,He=O.pageY-pe.y,Ue=Math.sqrt(ee*ee+He*He);b.set(0,Ue),E.set(0,Math.pow(b.y/d.y,n.zoomSpeed)),te(E.y),d.copy(b)}function ke(O){n.enableZoom&&Ye(O),n.enablePan&&Ie(O)}function at(O){n.enableZoom&&Ye(O),n.enableRotate&&ft(O)}function qe(O){n.enabled!==!1&&(I.length===0&&(n.domElement.setPointerCapture(O.pointerId),n.domElement.addEventListener("pointermove",We),n.domElement.addEventListener("pointerup",et)),ge(O),O.pointerType==="touch"?X(O):pt(O))}function We(O){n.enabled!==!1&&(O.pointerType==="touch"?_e(O):mt(O))}function et(O){Ne(O),I.length===0&&(n.domElement.releasePointerCapture(O.pointerId),n.domElement.removeEventListener("pointermove",We),n.domElement.removeEventListener("pointerup",et)),n.dispatchEvent(Va),s=r.NONE}function pt(O){let pe;switch(O.button){case 0:pe=n.mouseButtons.LEFT;break;case 1:pe=n.mouseButtons.MIDDLE;break;case 2:pe=n.mouseButtons.RIGHT;break;default:pe=-1}switch(pe){case qt.DOLLY:if(n.enableZoom===!1)return;he(O),s=r.DOLLY;break;case qt.ROTATE:if(O.ctrlKey||O.metaKey||O.shiftKey){if(n.enablePan===!1)return;xe(O),s=r.PAN}else{if(n.enableRotate===!1)return;ne(O),s=r.ROTATE}break;case qt.PAN:if(O.ctrlKey||O.metaKey||O.shiftKey){if(n.enableRotate===!1)return;ne(O),s=r.ROTATE}else{if(n.enablePan===!1)return;xe(O),s=r.PAN}break;default:s=r.NONE}s!==r.NONE&&n.dispatchEvent(Ts)}function mt(O){switch(s){case r.ROTATE:if(n.enableRotate===!1)return;q(O);break;case r.DOLLY:if(n.enableZoom===!1)return;ie(O);break;case r.PAN:if(n.enablePan===!1)return;Ee(O);break}}function R(O){n.enabled===!1||n.enableZoom===!1||s!==r.NONE||(O.preventDefault(),n.dispatchEvent(Ts),fe(O),n.dispatchEvent(Va))}function S(O){n.enabled===!1||n.enablePan===!1||z(O)}function X(O){switch(Se(O),I.length){case 1:switch(n.touches.ONE){case Ln.ROTATE:if(n.enableRotate===!1)return;ae(),s=r.TOUCH_ROTATE;break;case Ln.PAN:if(n.enablePan===!1)return;we(),s=r.TOUCH_PAN;break;default:s=r.NONE}break;case 2:switch(n.touches.TWO){case Ln.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;ze(),s=r.TOUCH_DOLLY_PAN;break;case Ln.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;H(),s=r.TOUCH_DOLLY_ROTATE;break;default:s=r.NONE}break;default:s=r.NONE}s!==r.NONE&&n.dispatchEvent(Ts)}function _e(O){switch(Se(O),s){case r.TOUCH_ROTATE:if(n.enableRotate===!1)return;ft(O),n.update();break;case r.TOUCH_PAN:if(n.enablePan===!1)return;Ie(O),n.update();break;case r.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;ke(O),n.update();break;case r.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;at(O),n.update();break;default:s=r.NONE}}function de(O){n.enabled!==!1&&O.preventDefault()}function ge(O){I.push(O)}function Ne(O){delete k[O.pointerId];for(let pe=0;pe<I.length;pe++)if(I[pe].pointerId==O.pointerId){I.splice(pe,1);return}}function Se(O){let pe=k[O.pointerId];pe===void 0&&(pe=new Ve,k[O.pointerId]=pe),pe.set(O.pageX,O.pageY)}function Re(O){const pe=O.pointerId===I[0].pointerId?I[1]:I[0];return k[pe.pointerId]}n.domElement.addEventListener("contextmenu",de),n.domElement.addEventListener("pointerdown",qe),n.domElement.addEventListener("pointercancel",et),n.domElement.addEventListener("wheel",R,{passive:!1}),this.update()}}class Wm extends Vm{constructor(e,t){super(e,t),this.screenSpacePanning=!1,this.mouseButtons={LEFT:qt.PAN,MIDDLE:qt.DOLLY,RIGHT:qt.ROTATE},this.touches={ONE:Ln.PAN,TWO:Ln.DOLLY_ROTATE}}}const As={type:"change"},ws={type:"start"},Rs={type:"end"};class Xm extends Hn{constructor(e,t){super();const n=this,r={NONE:-1,ROTATE:0,ZOOM:1,PAN:2,TOUCH_ROTATE:3,TOUCH_ZOOM_PAN:4};this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.screen={left:0,top:0,width:0,height:0},this.rotateSpeed=1,this.zoomSpeed=1.2,this.panSpeed=.3,this.noRotate=!1,this.noZoom=!1,this.noPan=!1,this.staticMoving=!1,this.dynamicDampingFactor=.2,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.keys=["KeyA","KeyS","KeyD"],this.mouseButtons={LEFT:qt.ROTATE,MIDDLE:qt.DOLLY,RIGHT:qt.PAN},this.target=new G;const s=1e-6,a=new G;let o=1,l=r.NONE,c=r.NONE,u=0,h=0,f=0;const m=new G,v=new Ve,x=new Ve,p=new G,d=new Ve,b=new Ve,E=new Ve,C=new Ve,w=[],N={};this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.up0=this.object.up.clone(),this.zoom0=this.object.zoom,this.handleResize=function(){const z=n.domElement.getBoundingClientRect(),ae=n.domElement.ownerDocument.documentElement;n.screen.left=z.left+window.pageXOffset-ae.clientLeft,n.screen.top=z.top+window.pageYOffset-ae.clientTop,n.screen.width=z.width,n.screen.height=z.height};const I=function(){const z=new Ve;return function(we,De){return z.set((we-n.screen.left)/n.screen.width,(De-n.screen.top)/n.screen.height),z}}(),k=function(){const z=new Ve;return function(we,De){return z.set((we-n.screen.width*.5-n.screen.left)/(n.screen.width*.5),(n.screen.height+2*(n.screen.top-De))/n.screen.width),z}}();this.rotateCamera=function(){const z=new G,ae=new zn,we=new G,De=new G,ze=new G,H=new G;return function(){H.set(x.x-v.x,x.y-v.y,0);let Ie=H.length();Ie?(m.copy(n.object.position).sub(n.target),we.copy(m).normalize(),De.copy(n.object.up).normalize(),ze.crossVectors(De,we).normalize(),De.setLength(x.y-v.y),ze.setLength(x.x-v.x),H.copy(De.add(ze)),z.crossVectors(H,m).normalize(),Ie*=n.rotateSpeed,ae.setFromAxisAngle(z,Ie),m.applyQuaternion(ae),n.object.up.applyQuaternion(ae),p.copy(z),f=Ie):!n.staticMoving&&f&&(f*=Math.sqrt(1-n.dynamicDampingFactor),m.copy(n.object.position).sub(n.target),ae.setFromAxisAngle(p,f),m.applyQuaternion(ae),n.object.up.applyQuaternion(ae)),v.copy(x)}}(),this.zoomCamera=function(){let z;l===r.TOUCH_ZOOM_PAN?(z=u/h,u=h,n.object.isPerspectiveCamera?m.multiplyScalar(z):n.object.isOrthographicCamera?(n.object.zoom=ks.clamp(n.object.zoom/z,n.minZoom,n.maxZoom),o!==n.object.zoom&&n.object.updateProjectionMatrix()):console.warn("THREE.TrackballControls: Unsupported camera type")):(z=1+(b.y-d.y)*n.zoomSpeed,z!==1&&z>0&&(n.object.isPerspectiveCamera?m.multiplyScalar(z):n.object.isOrthographicCamera?(n.object.zoom=ks.clamp(n.object.zoom/z,n.minZoom,n.maxZoom),o!==n.object.zoom&&n.object.updateProjectionMatrix()):console.warn("THREE.TrackballControls: Unsupported camera type")),n.staticMoving?d.copy(b):d.y+=(b.y-d.y)*this.dynamicDampingFactor)},this.panCamera=function(){const z=new Ve,ae=new G,we=new G;return function(){if(z.copy(C).sub(E),z.lengthSq()){if(n.object.isOrthographicCamera){const ze=(n.object.right-n.object.left)/n.object.zoom/n.domElement.clientWidth,H=(n.object.top-n.object.bottom)/n.object.zoom/n.domElement.clientWidth;z.x*=ze,z.y*=H}z.multiplyScalar(m.length()*n.panSpeed),we.copy(m).cross(n.object.up).setLength(z.x),we.add(ae.copy(n.object.up).setLength(z.y)),n.object.position.add(we),n.target.add(we),n.staticMoving?E.copy(C):E.add(z.subVectors(C,E).multiplyScalar(n.dynamicDampingFactor))}}}(),this.checkDistances=function(){(!n.noZoom||!n.noPan)&&(m.lengthSq()>n.maxDistance*n.maxDistance&&(n.object.position.addVectors(n.target,m.setLength(n.maxDistance)),d.copy(b)),m.lengthSq()<n.minDistance*n.minDistance&&(n.object.position.addVectors(n.target,m.setLength(n.minDistance)),d.copy(b)))},this.update=function(){m.subVectors(n.object.position,n.target),n.noRotate||n.rotateCamera(),n.noZoom||n.zoomCamera(),n.noPan||n.panCamera(),n.object.position.addVectors(n.target,m),n.object.isPerspectiveCamera?(n.checkDistances(),n.object.lookAt(n.target),a.distanceToSquared(n.object.position)>s&&(n.dispatchEvent(As),a.copy(n.object.position))):n.object.isOrthographicCamera?(n.object.lookAt(n.target),(a.distanceToSquared(n.object.position)>s||o!==n.object.zoom)&&(n.dispatchEvent(As),a.copy(n.object.position),o=n.object.zoom)):console.warn("THREE.TrackballControls: Unsupported camera type")},this.reset=function(){l=r.NONE,c=r.NONE,n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.up.copy(n.up0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),m.subVectors(n.object.position,n.target),n.object.lookAt(n.target),n.dispatchEvent(As),a.copy(n.object.position),o=n.object.zoom};function M(z){n.enabled!==!1&&(w.length===0&&(n.domElement.setPointerCapture(z.pointerId),n.domElement.addEventListener("pointermove",P),n.domElement.addEventListener("pointerup",j)),q(z),z.pointerType==="touch"?Q(z):Y(z))}function P(z){n.enabled!==!1&&(z.pointerType==="touch"?ne(z):te(z))}function j(z){n.enabled!==!1&&(z.pointerType==="touch"?he(z):Z(),ie(z),w.length===0&&(n.domElement.releasePointerCapture(z.pointerId),n.domElement.removeEventListener("pointermove",P),n.domElement.removeEventListener("pointerup",j)))}function J(z){ie(z)}function oe(z){n.enabled!==!1&&(window.removeEventListener("keydown",oe),c===r.NONE&&(z.code===n.keys[r.ROTATE]&&!n.noRotate?c=r.ROTATE:z.code===n.keys[r.ZOOM]&&!n.noZoom?c=r.ZOOM:z.code===n.keys[r.PAN]&&!n.noPan&&(c=r.PAN)))}function B(){n.enabled!==!1&&(c=r.NONE,window.addEventListener("keydown",oe))}function Y(z){if(l===r.NONE)switch(z.button){case n.mouseButtons.LEFT:l=r.ROTATE;break;case n.mouseButtons.MIDDLE:l=r.ZOOM;break;case n.mouseButtons.RIGHT:l=r.PAN;break}const ae=c!==r.NONE?c:l;ae===r.ROTATE&&!n.noRotate?(x.copy(k(z.pageX,z.pageY)),v.copy(x)):ae===r.ZOOM&&!n.noZoom?(d.copy(I(z.pageX,z.pageY)),b.copy(d)):ae===r.PAN&&!n.noPan&&(E.copy(I(z.pageX,z.pageY)),C.copy(E)),n.dispatchEvent(ws)}function te(z){const ae=c!==r.NONE?c:l;ae===r.ROTATE&&!n.noRotate?(v.copy(x),x.copy(k(z.pageX,z.pageY))):ae===r.ZOOM&&!n.noZoom?b.copy(I(z.pageX,z.pageY)):ae===r.PAN&&!n.noPan&&C.copy(I(z.pageX,z.pageY))}function Z(){l=r.NONE,n.dispatchEvent(Rs)}function ce(z){if(n.enabled!==!1&&n.noZoom!==!0){switch(z.preventDefault(),z.deltaMode){case 2:d.y-=z.deltaY*.025;break;case 1:d.y-=z.deltaY*.01;break;default:d.y-=z.deltaY*25e-5;break}n.dispatchEvent(ws),n.dispatchEvent(Rs)}}function Q(z){switch(Ee(z),w.length){case 1:l=r.TOUCH_ROTATE,x.copy(k(w[0].pageX,w[0].pageY)),v.copy(x);break;default:l=r.TOUCH_ZOOM_PAN;const ae=w[0].pageX-w[1].pageX,we=w[0].pageY-w[1].pageY;h=u=Math.sqrt(ae*ae+we*we);const De=(w[0].pageX+w[1].pageX)/2,ze=(w[0].pageY+w[1].pageY)/2;E.copy(I(De,ze)),C.copy(E);break}n.dispatchEvent(ws)}function ne(z){switch(Ee(z),w.length){case 1:v.copy(x),x.copy(k(z.pageX,z.pageY));break;default:const ae=fe(z),we=z.pageX-ae.x,De=z.pageY-ae.y;h=Math.sqrt(we*we+De*De);const ze=(z.pageX+ae.x)/2,H=(z.pageY+ae.y)/2;C.copy(I(ze,H));break}}function he(z){switch(w.length){case 0:l=r.NONE;break;case 1:l=r.TOUCH_ROTATE,x.copy(k(z.pageX,z.pageY)),v.copy(x);break;case 2:l=r.TOUCH_ZOOM_PAN;for(let ae=0;ae<w.length;ae++)if(w[ae].pointerId!==z.pointerId){const we=N[w[ae].pointerId];x.copy(k(we.x,we.y)),v.copy(x);break}break}n.dispatchEvent(Rs)}function xe(z){n.enabled!==!1&&z.preventDefault()}function q(z){w.push(z)}function ie(z){delete N[z.pointerId];for(let ae=0;ae<w.length;ae++)if(w[ae].pointerId==z.pointerId){w.splice(ae,1);return}}function Ee(z){let ae=N[z.pointerId];ae===void 0&&(ae=new Ve,N[z.pointerId]=ae),ae.set(z.pageX,z.pageY)}function fe(z){const ae=z.pointerId===w[0].pointerId?w[1]:w[0];return N[ae.pointerId]}this.dispose=function(){n.domElement.removeEventListener("contextmenu",xe),n.domElement.removeEventListener("pointerdown",M),n.domElement.removeEventListener("pointercancel",J),n.domElement.removeEventListener("wheel",ce),n.domElement.removeEventListener("pointermove",P),n.domElement.removeEventListener("pointerup",j),window.removeEventListener("keydown",oe),window.removeEventListener("keyup",B)},this.domElement.addEventListener("contextmenu",xe),this.domElement.addEventListener("pointerdown",M),this.domElement.addEventListener("pointercancel",J),this.domElement.addEventListener("wheel",ce,{passive:!1}),window.addEventListener("keydown",oe),window.addEventListener("keyup",B),this.handleResize(),this.update()}}/*!
fflate - fast JavaScript compression/decompression
<https://101arrowz.github.io/fflate>
Licensed under MIT. https://github.com/101arrowz/fflate/blob/master/LICENSE
version 0.6.9
*/var Xa=function(i){return URL.createObjectURL(new Blob([i],{type:"text/javascript"}))};try{URL.revokeObjectURL(Xa(""))}catch{Xa=function(e){return"data:application/javascript;charset=UTF-8,"+encodeURI(e)}}var Zt=Uint8Array,In=Uint16Array,Ws=Uint32Array,Pl=new Zt([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Ll=new Zt([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Ym=new Zt([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Dl=function(i,e){for(var t=new In(31),n=0;n<31;++n)t[n]=e+=1<<i[n-1];for(var r=new Ws(t[30]),n=1;n<30;++n)for(var s=t[n];s<t[n+1];++s)r[s]=s-t[n]<<5|n;return[t,r]},Ul=Dl(Pl,2),Il=Ul[0],qm=Ul[1];Il[28]=258,qm[258]=28;var $m=Dl(Ll,0),jm=$m[0],Xs=new In(32768);for(var ut=0;ut<32768;++ut){var Pn=(ut&43690)>>>1|(ut&21845)<<1;Pn=(Pn&52428)>>>2|(Pn&13107)<<2,Pn=(Pn&61680)>>>4|(Pn&3855)<<4,Xs[ut]=((Pn&65280)>>>8|(Pn&255)<<8)>>>1}var Yi=function(i,e,t){for(var n=i.length,r=0,s=new In(e);r<n;++r)++s[i[r]-1];var a=new In(e);for(r=0;r<e;++r)a[r]=a[r-1]+s[r-1]<<1;var o;if(t){o=new In(1<<e);var l=15-e;for(r=0;r<n;++r)if(i[r])for(var c=r<<4|i[r],u=e-i[r],h=a[i[r]-1]++<<u,f=h|(1<<u)-1;h<=f;++h)o[Xs[h]>>>l]=c}else for(o=new In(n),r=0;r<n;++r)i[r]&&(o[r]=Xs[a[i[r]-1]++]>>>15-i[r]);return o},er=new Zt(288);for(var ut=0;ut<144;++ut)er[ut]=8;for(var ut=144;ut<256;++ut)er[ut]=9;for(var ut=256;ut<280;++ut)er[ut]=7;for(var ut=280;ut<288;++ut)er[ut]=8;var Nl=new Zt(32);for(var ut=0;ut<32;++ut)Nl[ut]=5;var Zm=Yi(er,9,1),Km=Yi(Nl,5,1),Cs=function(i){for(var e=i[0],t=1;t<i.length;++t)i[t]>e&&(e=i[t]);return e},en=function(i,e,t){var n=e/8|0;return(i[n]|i[n+1]<<8)>>(e&7)&t},Ps=function(i,e){var t=e/8|0;return(i[t]|i[t+1]<<8|i[t+2]<<16)>>(e&7)},Jm=function(i){return(i/8|0)+(i&7&&1)},Qm=function(i,e,t){(e==null||e<0)&&(e=0),(t==null||t>i.length)&&(t=i.length);var n=new(i instanceof In?In:i instanceof Ws?Ws:Zt)(t-e);return n.set(i.subarray(e,t)),n},eg=function(i,e,t){var n=i.length;if(!n||t&&!t.l&&n<5)return e||new Zt(0);var r=!e||t,s=!t||t.i;t||(t={}),e||(e=new Zt(n*3));var a=function(fe){var z=e.length;if(fe>z){var ae=new Zt(Math.max(z*2,fe));ae.set(e),e=ae}},o=t.f||0,l=t.p||0,c=t.b||0,u=t.l,h=t.d,f=t.m,m=t.n,v=n*8;do{if(!u){t.f=o=en(i,l,1);var x=en(i,l+1,3);if(l+=3,x)if(x==1)u=Zm,h=Km,f=9,m=5;else if(x==2){var E=en(i,l,31)+257,C=en(i,l+10,15)+4,w=E+en(i,l+5,31)+1;l+=14;for(var N=new Zt(w),I=new Zt(19),k=0;k<C;++k)I[Ym[k]]=en(i,l+k*3,7);l+=C*3;for(var M=Cs(I),P=(1<<M)-1,j=Yi(I,M,1),k=0;k<w;){var J=j[en(i,l,P)];l+=J&15;var p=J>>>4;if(p<16)N[k++]=p;else{var oe=0,B=0;for(p==16?(B=3+en(i,l,3),l+=2,oe=N[k-1]):p==17?(B=3+en(i,l,7),l+=3):p==18&&(B=11+en(i,l,127),l+=7);B--;)N[k++]=oe}}var Y=N.subarray(0,E),te=N.subarray(E);f=Cs(Y),m=Cs(te),u=Yi(Y,f,1),h=Yi(te,m,1)}else throw"invalid block type";else{var p=Jm(l)+4,d=i[p-4]|i[p-3]<<8,b=p+d;if(b>n){if(s)throw"unexpected EOF";break}r&&a(c+d),e.set(i.subarray(p,b),c),t.b=c+=d,t.p=l=b*8;continue}if(l>v){if(s)throw"unexpected EOF";break}}r&&a(c+131072);for(var Z=(1<<f)-1,ce=(1<<m)-1,Q=l;;Q=l){var oe=u[Ps(i,l)&Z],ne=oe>>>4;if(l+=oe&15,l>v){if(s)throw"unexpected EOF";break}if(!oe)throw"invalid length/literal";if(ne<256)e[c++]=ne;else if(ne==256){Q=l,u=null;break}else{var he=ne-254;if(ne>264){var k=ne-257,xe=Pl[k];he=en(i,l,(1<<xe)-1)+Il[k],l+=xe}var q=h[Ps(i,l)&ce],ie=q>>>4;if(!q)throw"invalid distance";l+=q&15;var te=jm[ie];if(ie>3){var xe=Ll[ie];te+=Ps(i,l)&(1<<xe)-1,l+=xe}if(l>v){if(s)throw"unexpected EOF";break}r&&a(c+131072);for(var Ee=c+he;c<Ee;c+=4)e[c]=e[c-te],e[c+1]=e[c+1-te],e[c+2]=e[c+2-te],e[c+3]=e[c+3-te];c=Ee}}t.l=u,t.p=Q,t.b=c,u&&(o=1,t.m=f,t.d=h,t.n=m)}while(!o);return c==e.length?e:Qm(e,0,c)},tg=new Zt(0),ng=function(i){if((i[0]&15)!=8||i[0]>>>4>7||(i[0]<<8|i[1])%31)throw"invalid zlib data";if(i[1]&32)throw"invalid zlib data: preset dictionaries not supported"};function wr(i,e){return eg((ng(i),i.subarray(2,-4)),e)}var ig=typeof TextDecoder<"u"&&new TextDecoder,rg=0;try{ig.decode(tg,{stream:!0}),rg=1}catch{}class sg extends Hm{constructor(e){super(e),this.type=En}parse(e){const M=Math.pow(2.7182818,2.2);function P(_,y){let D=0;for(let T=0;T<65536;++T)(T==0||_[T>>3]&1<<(T&7))&&(y[D++]=T);const g=D-1;for(;D<65536;)y[D++]=0;return g}function j(_){for(let y=0;y<16384;y++)_[y]={},_[y].len=0,_[y].lit=0,_[y].p=null}const J={l:0,c:0,lc:0};function oe(_,y,D,g,T){for(;D<_;)y=y<<8|He(g,T),D+=8;D-=_,J.l=y>>D&(1<<_)-1,J.c=y,J.lc=D}const B=new Array(59);function Y(_){for(let D=0;D<=58;++D)B[D]=0;for(let D=0;D<65537;++D)B[_[D]]+=1;let y=0;for(let D=58;D>0;--D){const g=y+B[D]>>1;B[D]=y,y=g}for(let D=0;D<65537;++D){const g=_[D];g>0&&(_[D]=g|B[g]++<<6)}}function te(_,y,D,g,T,A){const L=y;let U=0,W=0;for(;g<=T;g++){if(L.value-y.value>D)return!1;oe(6,U,W,_,L);const V=J.l;if(U=J.c,W=J.lc,A[g]=V,V==63){if(L.value-y.value>D)throw new Error("Something wrong with hufUnpackEncTable");oe(8,U,W,_,L);let $=J.l+6;if(U=J.c,W=J.lc,g+$>T+1)throw new Error("Something wrong with hufUnpackEncTable");for(;$--;)A[g++]=0;g--}else if(V>=59){let $=V-59+2;if(g+$>T+1)throw new Error("Something wrong with hufUnpackEncTable");for(;$--;)A[g++]=0;g--}}Y(A)}function Z(_){return _&63}function ce(_){return _>>6}function Q(_,y,D,g){for(;y<=D;y++){const T=ce(_[y]),A=Z(_[y]);if(T>>A)throw new Error("Invalid table entry");if(A>14){const L=g[T>>A-14];if(L.len)throw new Error("Invalid table entry");if(L.lit++,L.p){const U=L.p;L.p=new Array(L.lit);for(let W=0;W<L.lit-1;++W)L.p[W]=U[W]}else L.p=new Array(1);L.p[L.lit-1]=y}else if(A){let L=0;for(let U=1<<14-A;U>0;U--){const W=g[(T<<14-A)+L];if(W.len||W.p)throw new Error("Invalid table entry");W.len=A,W.lit=y,L++}}}return!0}const ne={c:0,lc:0};function he(_,y,D,g){_=_<<8|He(D,g),y+=8,ne.c=_,ne.lc=y}const xe={c:0,lc:0};function q(_,y,D,g,T,A,L,U,W){if(_==y){g<8&&(he(D,g,T,A),D=ne.c,g=ne.lc),g-=8;let V=D>>g;if(V=new Uint8Array([V])[0],U.value+V>W)return!1;const $=L[U.value-1];for(;V-- >0;)L[U.value++]=$}else if(U.value<W)L[U.value++]=_;else return!1;xe.c=D,xe.lc=g}function ie(_){return _&65535}function Ee(_){const y=ie(_);return y>32767?y-65536:y}const fe={a:0,b:0};function z(_,y){const D=Ee(_),T=Ee(y),A=D+(T&1)+(T>>1),L=A,U=A-T;fe.a=L,fe.b=U}function ae(_,y){const D=ie(_),g=ie(y),T=D-(g>>1)&65535,A=g+T-32768&65535;fe.a=A,fe.b=T}function we(_,y,D,g,T,A,L){const U=L<16384,W=D>T?T:D;let V=1,$,re;for(;V<=W;)V<<=1;for(V>>=1,$=V,V>>=1;V>=1;){re=0;const le=re+A*(T-$),me=A*V,Me=A*$,ye=g*V,Ce=g*$;let Oe,nt,Xe,Ge;for(;re<=le;re+=Me){let it=re;const Fe=re+g*(D-$);for(;it<=Fe;it+=Ce){const lt=it+ye,Ut=it+me,ht=Ut+ye;U?(z(_[it+y],_[Ut+y]),Oe=fe.a,Xe=fe.b,z(_[lt+y],_[ht+y]),nt=fe.a,Ge=fe.b,z(Oe,nt),_[it+y]=fe.a,_[lt+y]=fe.b,z(Xe,Ge),_[Ut+y]=fe.a,_[ht+y]=fe.b):(ae(_[it+y],_[Ut+y]),Oe=fe.a,Xe=fe.b,ae(_[lt+y],_[ht+y]),nt=fe.a,Ge=fe.b,ae(Oe,nt),_[it+y]=fe.a,_[lt+y]=fe.b,ae(Xe,Ge),_[Ut+y]=fe.a,_[ht+y]=fe.b)}if(D&V){const lt=it+me;U?z(_[it+y],_[lt+y]):ae(_[it+y],_[lt+y]),Oe=fe.a,_[lt+y]=fe.b,_[it+y]=Oe}}if(T&V){let it=re;const Fe=re+g*(D-$);for(;it<=Fe;it+=Ce){const lt=it+ye;U?z(_[it+y],_[lt+y]):ae(_[it+y],_[lt+y]),Oe=fe.a,_[lt+y]=fe.b,_[it+y]=Oe}}$=V,V>>=1}return re}function De(_,y,D,g,T,A,L,U,W){let V=0,$=0;const re=L,le=Math.trunc(g.value+(T+7)/8);for(;g.value<le;)for(he(V,$,D,g),V=ne.c,$=ne.lc;$>=14;){const Me=V>>$-14&16383,ye=y[Me];if(ye.len)$-=ye.len,q(ye.lit,A,V,$,D,g,U,W,re),V=xe.c,$=xe.lc;else{if(!ye.p)throw new Error("hufDecode issues");let Ce;for(Ce=0;Ce<ye.lit;Ce++){const Oe=Z(_[ye.p[Ce]]);for(;$<Oe&&g.value<le;)he(V,$,D,g),V=ne.c,$=ne.lc;if($>=Oe&&ce(_[ye.p[Ce]])==(V>>$-Oe&(1<<Oe)-1)){$-=Oe,q(ye.p[Ce],A,V,$,D,g,U,W,re),V=xe.c,$=xe.lc;break}}if(Ce==ye.lit)throw new Error("hufDecode issues")}}const me=8-T&7;for(V>>=me,$-=me;$>0;){const Me=y[V<<14-$&16383];if(Me.len)$-=Me.len,q(Me.lit,A,V,$,D,g,U,W,re),V=xe.c,$=xe.lc;else throw new Error("hufDecode issues")}return!0}function ze(_,y,D,g,T,A){const L={value:0},U=D.value,W=ee(y,D),V=ee(y,D);D.value+=4;const $=ee(y,D);if(D.value+=4,W<0||W>=65537||V<0||V>=65537)throw new Error("Something wrong with HUF_ENCSIZE");const re=new Array(65537),le=new Array(16384);j(le);const me=g-(D.value-U);if(te(_,D,me,W,V,re),$>8*(g-(D.value-U)))throw new Error("Something wrong with hufUncompress");Q(re,W,V,le),De(re,le,_,D,$,V,A,T,L)}function H(_,y,D){for(let g=0;g<D;++g)y[g]=_[y[g]]}function ft(_){for(let y=1;y<_.length;y++){const D=_[y-1]+_[y]-128;_[y]=D}}function Ie(_,y){let D=0,g=Math.floor((_.length+1)/2),T=0;const A=_.length-1;for(;!(T>A||(y[T++]=_[D++],T>A));)y[T++]=_[g++]}function Ye(_){let y=_.byteLength;const D=new Array;let g=0;const T=new DataView(_);for(;y>0;){const A=T.getInt8(g++);if(A<0){const L=-A;y-=L+1;for(let U=0;U<L;U++)D.push(T.getUint8(g++))}else{const L=A;y-=2;const U=T.getUint8(g++);for(let W=0;W<L+1;W++)D.push(U)}}return D}function ke(_,y,D,g,T,A){let L=new DataView(A.buffer);const U=D[_.idx[0]].width,W=D[_.idx[0]].height,V=3,$=Math.floor(U/8),re=Math.ceil(U/8),le=Math.ceil(W/8),me=U-(re-1)*8,Me=W-(le-1)*8,ye={value:0},Ce=new Array(V),Oe=new Array(V),nt=new Array(V),Xe=new Array(V),Ge=new Array(V);for(let Fe=0;Fe<V;++Fe)Ge[Fe]=y[_.idx[Fe]],Ce[Fe]=Fe<1?0:Ce[Fe-1]+re*le,Oe[Fe]=new Float32Array(64),nt[Fe]=new Uint16Array(64),Xe[Fe]=new Uint16Array(re*64);for(let Fe=0;Fe<le;++Fe){let lt=8;Fe==le-1&&(lt=Me);let Ut=8;for(let tt=0;tt<re;++tt){tt==re-1&&(Ut=me);for(let $e=0;$e<V;++$e)nt[$e].fill(0),nt[$e][0]=T[Ce[$e]++],at(ye,g,nt[$e]),qe(nt[$e],Oe[$e]),We(Oe[$e]);et(Oe);for(let $e=0;$e<V;++$e)pt(Oe[$e],Xe[$e],tt*64)}let ht=0;for(let tt=0;tt<V;++tt){const $e=D[_.idx[tt]].type;for(let yt=8*Fe;yt<8*Fe+lt;++yt){ht=Ge[tt][yt];for(let hn=0;hn<$;++hn){const dt=hn*64+(yt&7)*8;L.setUint16(ht+0*2*$e,Xe[tt][dt+0],!0),L.setUint16(ht+1*2*$e,Xe[tt][dt+1],!0),L.setUint16(ht+2*2*$e,Xe[tt][dt+2],!0),L.setUint16(ht+3*2*$e,Xe[tt][dt+3],!0),L.setUint16(ht+4*2*$e,Xe[tt][dt+4],!0),L.setUint16(ht+5*2*$e,Xe[tt][dt+5],!0),L.setUint16(ht+6*2*$e,Xe[tt][dt+6],!0),L.setUint16(ht+7*2*$e,Xe[tt][dt+7],!0),ht+=8*2*$e}}if($!=re)for(let yt=8*Fe;yt<8*Fe+lt;++yt){const hn=Ge[tt][yt]+8*$*2*$e,dt=$*64+(yt&7)*8;for(let bn=0;bn<Ut;++bn)L.setUint16(hn+bn*2*$e,Xe[tt][dt+bn],!0)}}}const it=new Uint16Array(U);L=new DataView(A.buffer);for(let Fe=0;Fe<V;++Fe){D[_.idx[Fe]].decoded=!0;const lt=D[_.idx[Fe]].type;if(D[Fe].type==2)for(let Ut=0;Ut<W;++Ut){const ht=Ge[Fe][Ut];for(let tt=0;tt<U;++tt)it[tt]=L.getUint16(ht+tt*2*lt,!0);for(let tt=0;tt<U;++tt)L.setFloat32(ht+tt*2*lt,se(it[tt]),!0)}}}function at(_,y,D){let g,T=1;for(;T<64;)g=y[_.value],g==65280?T=64:g>>8==255?T+=g&255:(D[T]=g,T++),_.value++}function qe(_,y){y[0]=se(_[0]),y[1]=se(_[1]),y[2]=se(_[5]),y[3]=se(_[6]),y[4]=se(_[14]),y[5]=se(_[15]),y[6]=se(_[27]),y[7]=se(_[28]),y[8]=se(_[2]),y[9]=se(_[4]),y[10]=se(_[7]),y[11]=se(_[13]),y[12]=se(_[16]),y[13]=se(_[26]),y[14]=se(_[29]),y[15]=se(_[42]),y[16]=se(_[3]),y[17]=se(_[8]),y[18]=se(_[12]),y[19]=se(_[17]),y[20]=se(_[25]),y[21]=se(_[30]),y[22]=se(_[41]),y[23]=se(_[43]),y[24]=se(_[9]),y[25]=se(_[11]),y[26]=se(_[18]),y[27]=se(_[24]),y[28]=se(_[31]),y[29]=se(_[40]),y[30]=se(_[44]),y[31]=se(_[53]),y[32]=se(_[10]),y[33]=se(_[19]),y[34]=se(_[23]),y[35]=se(_[32]),y[36]=se(_[39]),y[37]=se(_[45]),y[38]=se(_[52]),y[39]=se(_[54]),y[40]=se(_[20]),y[41]=se(_[22]),y[42]=se(_[33]),y[43]=se(_[38]),y[44]=se(_[46]),y[45]=se(_[51]),y[46]=se(_[55]),y[47]=se(_[60]),y[48]=se(_[21]),y[49]=se(_[34]),y[50]=se(_[37]),y[51]=se(_[47]),y[52]=se(_[50]),y[53]=se(_[56]),y[54]=se(_[59]),y[55]=se(_[61]),y[56]=se(_[35]),y[57]=se(_[36]),y[58]=se(_[48]),y[59]=se(_[49]),y[60]=se(_[57]),y[61]=se(_[58]),y[62]=se(_[62]),y[63]=se(_[63])}function We(_){const y=.5*Math.cos(.7853975),D=.5*Math.cos(3.14159/16),g=.5*Math.cos(3.14159/8),T=.5*Math.cos(3*3.14159/16),A=.5*Math.cos(5*3.14159/16),L=.5*Math.cos(3*3.14159/8),U=.5*Math.cos(7*3.14159/16),W=new Array(4),V=new Array(4),$=new Array(4),re=new Array(4);for(let le=0;le<8;++le){const me=le*8;W[0]=g*_[me+2],W[1]=L*_[me+2],W[2]=g*_[me+6],W[3]=L*_[me+6],V[0]=D*_[me+1]+T*_[me+3]+A*_[me+5]+U*_[me+7],V[1]=T*_[me+1]-U*_[me+3]-D*_[me+5]-A*_[me+7],V[2]=A*_[me+1]-D*_[me+3]+U*_[me+5]+T*_[me+7],V[3]=U*_[me+1]-A*_[me+3]+T*_[me+5]-D*_[me+7],$[0]=y*(_[me+0]+_[me+4]),$[3]=y*(_[me+0]-_[me+4]),$[1]=W[0]+W[3],$[2]=W[1]-W[2],re[0]=$[0]+$[1],re[1]=$[3]+$[2],re[2]=$[3]-$[2],re[3]=$[0]-$[1],_[me+0]=re[0]+V[0],_[me+1]=re[1]+V[1],_[me+2]=re[2]+V[2],_[me+3]=re[3]+V[3],_[me+4]=re[3]-V[3],_[me+5]=re[2]-V[2],_[me+6]=re[1]-V[1],_[me+7]=re[0]-V[0]}for(let le=0;le<8;++le)W[0]=g*_[16+le],W[1]=L*_[16+le],W[2]=g*_[48+le],W[3]=L*_[48+le],V[0]=D*_[8+le]+T*_[24+le]+A*_[40+le]+U*_[56+le],V[1]=T*_[8+le]-U*_[24+le]-D*_[40+le]-A*_[56+le],V[2]=A*_[8+le]-D*_[24+le]+U*_[40+le]+T*_[56+le],V[3]=U*_[8+le]-A*_[24+le]+T*_[40+le]-D*_[56+le],$[0]=y*(_[le]+_[32+le]),$[3]=y*(_[le]-_[32+le]),$[1]=W[0]+W[3],$[2]=W[1]-W[2],re[0]=$[0]+$[1],re[1]=$[3]+$[2],re[2]=$[3]-$[2],re[3]=$[0]-$[1],_[0+le]=re[0]+V[0],_[8+le]=re[1]+V[1],_[16+le]=re[2]+V[2],_[24+le]=re[3]+V[3],_[32+le]=re[3]-V[3],_[40+le]=re[2]-V[2],_[48+le]=re[1]-V[1],_[56+le]=re[0]-V[0]}function et(_){for(let y=0;y<64;++y){const D=_[0][y],g=_[1][y],T=_[2][y];_[0][y]=D+1.5747*T,_[1][y]=D-.1873*g-.4682*T,_[2][y]=D+1.8556*g}}function pt(_,y,D){for(let g=0;g<64;++g)y[D+g]=da.toHalfFloat(mt(_[g]))}function mt(_){return _<=1?Math.sign(_)*Math.pow(Math.abs(_),2.2):Math.sign(_)*Math.pow(M,Math.abs(_)-1)}function R(_){return new DataView(_.array.buffer,_.offset.value,_.size)}function S(_){const y=_.viewer.buffer.slice(_.offset.value,_.offset.value+_.size),D=new Uint8Array(Ye(y)),g=new Uint8Array(D.length);return ft(D),Ie(D,g),new DataView(g.buffer)}function X(_){const y=_.array.slice(_.offset.value,_.offset.value+_.size),D=wr(y),g=new Uint8Array(D.length);return ft(D),Ie(D,g),new DataView(g.buffer)}function _e(_){const y=_.viewer,D={value:_.offset.value},g=new Uint16Array(_.width*_.scanlineBlockSize*(_.channels*_.type)),T=new Uint8Array(8192);let A=0;const L=new Array(_.channels);for(let Me=0;Me<_.channels;Me++)L[Me]={},L[Me].start=A,L[Me].end=L[Me].start,L[Me].nx=_.width,L[Me].ny=_.lines,L[Me].size=_.type,A+=L[Me].nx*L[Me].ny*L[Me].size;const U=F(y,D),W=F(y,D);if(W>=8192)throw new Error("Something is wrong with PIZ_COMPRESSION BITMAP_SIZE");if(U<=W)for(let Me=0;Me<W-U+1;Me++)T[Me+U]=Ue(y,D);const V=new Uint16Array(65536),$=P(T,V),re=ee(y,D);ze(_.array,y,D,re,g,A);for(let Me=0;Me<_.channels;++Me){const ye=L[Me];for(let Ce=0;Ce<L[Me].size;++Ce)we(g,ye.start+Ce,ye.nx,ye.size,ye.ny,ye.nx*ye.size,$)}H(V,g,A);let le=0;const me=new Uint8Array(g.buffer.byteLength);for(let Me=0;Me<_.lines;Me++)for(let ye=0;ye<_.channels;ye++){const Ce=L[ye],Oe=Ce.nx*Ce.size,nt=new Uint8Array(g.buffer,Ce.end*2,Oe*2);me.set(nt,le),le+=Oe*2,Ce.end+=Oe}return new DataView(me.buffer)}function de(_){const y=_.array.slice(_.offset.value,_.offset.value+_.size),D=wr(y),g=_.lines*_.channels*_.width,T=_.type==1?new Uint16Array(g):new Uint32Array(g);let A=0,L=0;const U=new Array(4);for(let W=0;W<_.lines;W++)for(let V=0;V<_.channels;V++){let $=0;switch(_.type){case 1:U[0]=A,U[1]=U[0]+_.width,A=U[1]+_.width;for(let re=0;re<_.width;++re){const le=D[U[0]++]<<8|D[U[1]++];$+=le,T[L]=$,L++}break;case 2:U[0]=A,U[1]=U[0]+_.width,U[2]=U[1]+_.width,A=U[2]+_.width;for(let re=0;re<_.width;++re){const le=D[U[0]++]<<24|D[U[1]++]<<16|D[U[2]++]<<8;$+=le,T[L]=$,L++}break}}return new DataView(T.buffer)}function ge(_){const y=_.viewer,D={value:_.offset.value},g=new Uint8Array(_.width*_.lines*(_.channels*_.type*2)),T={version:Le(y,D),unknownUncompressedSize:Le(y,D),unknownCompressedSize:Le(y,D),acCompressedSize:Le(y,D),dcCompressedSize:Le(y,D),rleCompressedSize:Le(y,D),rleUncompressedSize:Le(y,D),rleRawSize:Le(y,D),totalAcUncompressedCount:Le(y,D),totalDcUncompressedCount:Le(y,D),acCompression:Le(y,D)};if(T.version<2)throw new Error("EXRLoader.parse: "+yn.compression+" version "+T.version+" is unsupported");const A=new Array;let L=F(y,D)-2;for(;L>0;){const ye=Ne(y.buffer,D),Ce=Ue(y,D),Oe=Ce>>2&3,nt=(Ce>>4)-1,Xe=new Int8Array([nt])[0],Ge=Ue(y,D);A.push({name:ye,index:Xe,type:Ge,compression:Oe}),L-=ye.length+3}const U=yn.channels,W=new Array(_.channels);for(let ye=0;ye<_.channels;++ye){const Ce=W[ye]={},Oe=U[ye];Ce.name=Oe.name,Ce.compression=0,Ce.decoded=!1,Ce.type=Oe.pixelType,Ce.pLinear=Oe.pLinear,Ce.width=_.width,Ce.height=_.lines}const V={idx:new Array(3)};for(let ye=0;ye<_.channels;++ye){const Ce=W[ye];for(let Oe=0;Oe<A.length;++Oe){const nt=A[Oe];Ce.name==nt.name&&(Ce.compression=nt.compression,nt.index>=0&&(V.idx[nt.index]=ye),Ce.offset=ye)}}let $,re,le;if(T.acCompressedSize>0)switch(T.acCompression){case 0:$=new Uint16Array(T.totalAcUncompressedCount),ze(_.array,y,D,T.acCompressedSize,$,T.totalAcUncompressedCount);break;case 1:const ye=_.array.slice(D.value,D.value+T.totalAcUncompressedCount),Ce=wr(ye);$=new Uint16Array(Ce.buffer),D.value+=T.totalAcUncompressedCount;break}if(T.dcCompressedSize>0){const ye={array:_.array,offset:D,size:T.dcCompressedSize};re=new Uint16Array(X(ye).buffer),D.value+=T.dcCompressedSize}if(T.rleRawSize>0){const ye=_.array.slice(D.value,D.value+T.rleCompressedSize),Ce=wr(ye);le=Ye(Ce.buffer),D.value+=T.rleCompressedSize}let me=0;const Me=new Array(W.length);for(let ye=0;ye<Me.length;++ye)Me[ye]=new Array;for(let ye=0;ye<_.lines;++ye)for(let Ce=0;Ce<W.length;++Ce)Me[Ce].push(me),me+=W[Ce].width*_.type*2;ke(V,Me,W,$,re,g);for(let ye=0;ye<W.length;++ye){const Ce=W[ye];if(!Ce.decoded)switch(Ce.compression){case 2:let Oe=0,nt=0;for(let Xe=0;Xe<_.lines;++Xe){let Ge=Me[ye][Oe];for(let it=0;it<Ce.width;++it){for(let Fe=0;Fe<2*Ce.type;++Fe)g[Ge++]=le[nt+Fe*Ce.width*Ce.height];nt++}Oe++}break;case 1:default:throw new Error("EXRLoader.parse: unsupported channel compression")}}return new DataView(g.buffer)}function Ne(_,y){const D=new Uint8Array(_);let g=0;for(;D[y.value+g]!=0;)g+=1;const T=new TextDecoder().decode(D.slice(y.value,y.value+g));return y.value=y.value+g+1,T}function Se(_,y,D){const g=new TextDecoder().decode(new Uint8Array(_).slice(y.value,y.value+D));return y.value=y.value+D,g}function Re(_,y){const D=pe(_,y),g=ee(_,y);return[D,g]}function O(_,y){const D=ee(_,y),g=ee(_,y);return[D,g]}function pe(_,y){const D=_.getInt32(y.value,!0);return y.value=y.value+4,D}function ee(_,y){const D=_.getUint32(y.value,!0);return y.value=y.value+4,D}function He(_,y){const D=_[y.value];return y.value=y.value+1,D}function Ue(_,y){const D=_.getUint8(y.value);return y.value=y.value+1,D}const Le=function(_,y){let D;return"getBigInt64"in DataView.prototype?D=Number(_.getBigInt64(y.value,!0)):D=_.getUint32(y.value+4,!0)+Number(_.getUint32(y.value,!0)<<32),y.value+=8,D};function Te(_,y){const D=_.getFloat32(y.value,!0);return y.value+=4,D}function Pe(_,y){return da.toHalfFloat(Te(_,y))}function se(_){const y=(_&31744)>>10,D=_&1023;return(_>>15?-1:1)*(y?y===31?D?NaN:1/0:Math.pow(2,y-15)*(1+D/1024):6103515625e-14*(D/1024))}function F(_,y){const D=_.getUint16(y.value,!0);return y.value+=2,D}function be(_,y){return se(F(_,y))}function ue(_,y,D,g){const T=D.value,A=[];for(;D.value<T+g-1;){const L=Ne(y,D),U=pe(_,D),W=Ue(_,D);D.value+=3;const V=pe(_,D),$=pe(_,D);A.push({name:L,pixelType:U,pLinear:W,xSampling:V,ySampling:$})}return D.value+=1,A}function K(_,y){const D=Te(_,y),g=Te(_,y),T=Te(_,y),A=Te(_,y),L=Te(_,y),U=Te(_,y),W=Te(_,y),V=Te(_,y);return{redX:D,redY:g,greenX:T,greenY:A,blueX:L,blueY:U,whiteX:W,whiteY:V}}function ve(_,y){const D=["NO_COMPRESSION","RLE_COMPRESSION","ZIPS_COMPRESSION","ZIP_COMPRESSION","PIZ_COMPRESSION","PXR24_COMPRESSION","B44_COMPRESSION","B44A_COMPRESSION","DWAA_COMPRESSION","DWAB_COMPRESSION"],g=Ue(_,y);return D[g]}function Be(_,y){const D=ee(_,y),g=ee(_,y),T=ee(_,y),A=ee(_,y);return{xMin:D,yMin:g,xMax:T,yMax:A}}function Ze(_,y){const D=["INCREASING_Y"],g=Ue(_,y);return D[g]}function gt(_,y){const D=Te(_,y),g=Te(_,y);return[D,g]}function St(_,y){const D=Te(_,y),g=Te(_,y),T=Te(_,y);return[D,g,T]}function rt(_,y,D,g,T){if(g==="string"||g==="stringvector"||g==="iccProfile")return Se(y,D,T);if(g==="chlist")return ue(_,y,D,T);if(g==="chromaticities")return K(_,D);if(g==="compression")return ve(_,D);if(g==="box2i")return Be(_,D);if(g==="lineOrder")return Ze(_,D);if(g==="float")return Te(_,D);if(g==="v2f")return gt(_,D);if(g==="v3f")return St(_,D);if(g==="int")return pe(_,D);if(g==="rational")return Re(_,D);if(g==="timecode")return O(_,D);if(g==="preview")return D.value+=T,"skipped";D.value+=T}function Mt(_,y,D){const g={};if(_.getUint32(0,!0)!=20000630)throw new Error("THREE.EXRLoader: Provided file doesn't appear to be in OpenEXR format.");g.version=_.getUint8(4);const T=_.getUint8(5);g.spec={singleTile:!!(T&2),longName:!!(T&4),deepFormat:!!(T&8),multiPart:!!(T&16)},D.value=8;let A=!0;for(;A;){const L=Ne(y,D);if(L==0)A=!1;else{const U=Ne(y,D),W=ee(_,D),V=rt(_,y,D,U,W);V===void 0?console.warn(`THREE.EXRLoader: Skipped unknown header attribute type '${U}'.`):g[L]=V}}if(T&-5)throw console.error("THREE.EXRHeader:",g),new Error("THREE.EXRLoader: Provided file is currently unsupported.");return g}function Xt(_,y,D,g,T){const A={size:0,viewer:y,array:D,offset:g,width:_.dataWindow.xMax-_.dataWindow.xMin+1,height:_.dataWindow.yMax-_.dataWindow.yMin+1,channels:_.channels.length,bytesPerLine:null,lines:null,inputSize:null,type:_.channels[0].pixelType,uncompress:null,getter:null,format:null,colorSpace:sn};switch(_.compression){case"NO_COMPRESSION":A.lines=1,A.uncompress=R;break;case"RLE_COMPRESSION":A.lines=1,A.uncompress=S;break;case"ZIPS_COMPRESSION":A.lines=1,A.uncompress=X;break;case"ZIP_COMPRESSION":A.lines=16,A.uncompress=X;break;case"PIZ_COMPRESSION":A.lines=32,A.uncompress=_e;break;case"PXR24_COMPRESSION":A.lines=16,A.uncompress=de;break;case"DWAA_COMPRESSION":A.lines=32,A.uncompress=ge;break;case"DWAB_COMPRESSION":A.lines=256,A.uncompress=ge;break;default:throw new Error("EXRLoader.parse: "+_.compression+" is unsupported")}if(A.scanlineBlockSize=A.lines,A.type==1)switch(T){case nn:A.getter=be,A.inputSize=2;break;case En:A.getter=F,A.inputSize=2;break}else if(A.type==2)switch(T){case nn:A.getter=Te,A.inputSize=4;break;case En:A.getter=Pe,A.inputSize=4}else throw new Error("EXRLoader.parse: unsupported pixelType "+A.type+" for "+_.compression+".");A.blockCount=(_.dataWindow.yMax+1)/A.scanlineBlockSize;for(let U=0;U<A.blockCount;U++)Le(y,g);A.outputChannels=A.channels==3?4:A.channels;const L=A.width*A.height*A.outputChannels;switch(T){case nn:A.byteArray=new Float32Array(L),A.channels<A.outputChannels&&A.byteArray.fill(1,0,L);break;case En:A.byteArray=new Uint16Array(L),A.channels<A.outputChannels&&A.byteArray.fill(15360,0,L);break;default:console.error("THREE.EXRLoader: unsupported type: ",T);break}return A.bytesPerLine=A.width*A.inputSize*A.channels,A.outputChannels==4?(A.format=jt,A.colorSpace=sn):(A.format=tl,A.colorSpace=Vt),A}const Vn=new DataView(e),$r=new Uint8Array(e),on={value:0},yn=Mt(Vn,e,on),Ke=Xt(yn,Vn,$r,on,this.type),Fi={value:0},nr={R:0,G:1,B:2,A:3,Y:0};for(let _=0;_<Ke.height/Ke.scanlineBlockSize;_++){const y=ee(Vn,on);Ke.size=ee(Vn,on),Ke.lines=y+Ke.scanlineBlockSize>Ke.height?Ke.height-y:Ke.scanlineBlockSize;const g=Ke.size<Ke.lines*Ke.bytesPerLine?Ke.uncompress(Ke):R(Ke);on.value+=Ke.size;for(let T=0;T<Ke.scanlineBlockSize;T++){const A=T+_*Ke.scanlineBlockSize;if(A>=Ke.height)break;for(let L=0;L<Ke.channels;L++){const U=nr[yn.channels[L].name];for(let W=0;W<Ke.width;W++){Fi.value=(T*(Ke.channels*Ke.width)+L*Ke.width+W)*Ke.inputSize;const V=(Ke.height-1-A)*(Ke.width*Ke.outputChannels)+W*Ke.outputChannels+U;Ke.byteArray[V]=Ke.getter(g,Fi)}}}}return{header:yn,width:Ke.width,height:Ke.height,data:Ke.byteArray,format:Ke.format,colorSpace:Ke.colorSpace,type:this.type}}setDataType(e){return this.type=e,this}load(e,t,n,r){function s(a,o){a.colorSpace=o.colorSpace,a.minFilter=At,a.magFilter=At,a.generateMipmaps=!1,a.flipY=!1,t&&t(a,o)}return super.load(e,s,n,r)}}function Pt(i){return(e,...t)=>og(i,e,t)}function Ni(i,e){return Pt(Ol(i,e).get)}const{apply:og,construct:R_,defineProperty:C_,get:P_,getOwnPropertyDescriptor:Ol,getPrototypeOf:no,has:L_,ownKeys:ag,set:D_,setPrototypeOf:U_}=Reflect,{iterator:tr,species:I_,toStringTag:lg,for:N_}=Symbol,cg=Object,{create:io,defineProperty:ug,freeze:O_,is:F_}=cg,hg=Array,dg=hg.prototype,Fl=dg[tr],fg=Pt(Fl),Bl=ArrayBuffer,pg=Bl.prototype;Ni(pg,"byteLength");const Ya=typeof SharedArrayBuffer<"u"?SharedArrayBuffer:null;Ya&&Ni(Ya.prototype,"byteLength");const zl=no(Uint8Array);zl.from;const Ot=zl.prototype;Ot[tr];Pt(Ot.keys);Pt(Ot.values);Pt(Ot.entries);Pt(Ot.set);Pt(Ot.reverse);Pt(Ot.fill);Pt(Ot.copyWithin);Pt(Ot.sort);Pt(Ot.slice);Pt(Ot.subarray);Ni(Ot,"buffer");Ni(Ot,"byteOffset");Ni(Ot,"length");Ni(Ot,lg);const mg=Uint16Array,ro=Uint32Array,gg=Float32Array,Zi=no([][tr]()),Gl=Pt(Zi.next),_g=Pt(function*(){}().next),vg=no(Zi),xg=DataView.prototype,Eg=Pt(xg.getUint16),so=WeakMap,Hl=so.prototype,kl=Pt(Hl.get),Sg=Pt(Hl.set),Vl=new so,Mg=io(null,{next:{value:function(){const e=kl(Vl,this);return Gl(e)}},[tr]:{value:function(){return this}}});function yg(i){if(i[tr]===Fl&&Zi.next===Gl)return i;const e=io(Mg);return Sg(Vl,e,fg(i)),e}const bg=new so,Tg=io(vg,{next:{value:function(){const e=kl(bg,this);return _g(e)},writable:!0,configurable:!0}});for(const i of ag(Zi))i!=="next"&&ug(Tg,i,Ol(Zi,i));const Ag=10,wg=1023,Wl=new Bl(4),Rg=new gg(Wl),Cg=new ro(Wl),oo=new ro(2048);for(let i=1;i<1024;++i){let e=i<<13,t=0;for(;!(e&8388608);)e<<=1,t-=8388608;e&=-8388609,t+=947912704,oo[i]=e|t}for(let i=1024;i<2048;++i)oo[i]=939524096+(i-1024<<13);const Oi=new ro(64);for(let i=1;i<31;++i)Oi[i]=i<<23;Oi[31]=1199570944;Oi[32]=2147483648;for(let i=33;i<63;++i)Oi[i]=2147483648+(i-32<<23);Oi[63]=3347054592;const Xl=new mg(64);for(let i=1;i<64;++i)i!==32&&(Xl[i]=1024);function Pg(i){const e=i>>Ag;return Cg[0]=oo[Xl[e]+(i&wg)]+Oi[e],Rg[0]}function Yl(i,e,...t){return Pg(Eg(i,e,...yg(t)))}function ql(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}var ao={exports:{}};function $l(i,e,t){const n=t&&t.debug||!1;n&&console.log("[xml-utils] getting "+e+" in "+i);const r=typeof i=="object"?i.outer:i,s=r.slice(0,r.indexOf(">")+1),a=['"',"'"];for(let o=0;o<a.length;o++){const l=a[o],c=e+"\\="+l+"([^"+l+"]*)"+l;n&&console.log("[xml-utils] pattern:",c);const h=new RegExp(c).exec(s);if(n&&console.log("[xml-utils] match:",h),h)return h[1]}}ao.exports=$l;ao.exports.default=$l;var Lg=ao.exports;const Ls=ql(Lg);var lo={exports:{}},co={exports:{}},uo={exports:{}};function jl(i,e,t){const r=new RegExp(e).exec(i.slice(t));return r?t+r.index:-1}uo.exports=jl;uo.exports.default=jl;var Dg=uo.exports,ho={exports:{}};function Zl(i,e,t){const r=new RegExp(e).exec(i.slice(t));return r?t+r.index+r[0].length-1:-1}ho.exports=Zl;ho.exports.default=Zl;var Ug=ho.exports,fo={exports:{}};function Kl(i,e){const t=new RegExp(e,"g"),n=i.match(t);return n?n.length:0}fo.exports=Kl;fo.exports.default=Kl;var Ig=fo.exports;const Ng=Dg,Ds=Ug,qa=Ig;function Jl(i,e,t){const n=t&&t.debug||!1,r=!(t&&typeof t.nested===!1),s=t&&t.startIndex||0;n&&console.log("[xml-utils] starting findTagByName with",e," and ",t);const a=Ng(i,`<${e}[ 
>/]`,s);if(n&&console.log("[xml-utils] start:",a),a===-1)return;const o=i.slice(a+e.length);let l=Ds(o,"^[^<]*[ /]>",0);const c=l!==-1&&o[l-1]==="/";if(n&&console.log("[xml-utils] selfClosing:",c),c===!1)if(r){let m=0,v=1,x=0;for(;(l=Ds(o,"[ /]"+e+">",m))!==-1;){const p=o.substring(m,l+1);if(v+=qa(p,"<"+e+`[ 
	>]`),x+=qa(p,"</"+e+">"),x>=v)break;m=l}}else l=Ds(o,"[ /]"+e+">",0);const u=a+e.length+l+1;if(n&&console.log("[xml-utils] end:",u),u===-1)return;const h=i.slice(a,u);let f;return c?f=null:f=h.slice(h.indexOf(">")+1,h.lastIndexOf("<")),{inner:f,outer:h,start:a,end:u}}co.exports=Jl;co.exports.default=Jl;var Og=co.exports;const Fg=Og;function Ql(i,e,t){const n=[],r=t&&t.debug||!1,s=t&&typeof t.nested=="boolean"?t.nested:!0;let a=t&&t.startIndex||0,o;for(;o=Fg(i,e,{debug:r,startIndex:a});)s?a=o.start+1+e.length:a=o.end,n.push(o);return r&&console.log("findTagsByName found",n.length,"tags"),n}lo.exports=Ql;lo.exports.default=Ql;var Bg=lo.exports;const zg=ql(Bg),qi={315:"Artist",258:"BitsPerSample",265:"CellLength",264:"CellWidth",320:"ColorMap",259:"Compression",33432:"Copyright",306:"DateTime",338:"ExtraSamples",266:"FillOrder",289:"FreeByteCounts",288:"FreeOffsets",291:"GrayResponseCurve",290:"GrayResponseUnit",316:"HostComputer",270:"ImageDescription",257:"ImageLength",256:"ImageWidth",271:"Make",281:"MaxSampleValue",280:"MinSampleValue",272:"Model",254:"NewSubfileType",274:"Orientation",262:"PhotometricInterpretation",284:"PlanarConfiguration",296:"ResolutionUnit",278:"RowsPerStrip",277:"SamplesPerPixel",305:"Software",279:"StripByteCounts",273:"StripOffsets",255:"SubfileType",263:"Threshholding",282:"XResolution",283:"YResolution",326:"BadFaxLines",327:"CleanFaxData",343:"ClipPath",328:"ConsecutiveBadFaxLines",433:"Decode",434:"DefaultImageColor",269:"DocumentName",336:"DotRange",321:"HalftoneHints",346:"Indexed",347:"JPEGTables",285:"PageName",297:"PageNumber",317:"Predictor",319:"PrimaryChromaticities",532:"ReferenceBlackWhite",339:"SampleFormat",340:"SMinSampleValue",341:"SMaxSampleValue",559:"StripRowCounts",330:"SubIFDs",292:"T4Options",293:"T6Options",325:"TileByteCounts",323:"TileLength",324:"TileOffsets",322:"TileWidth",301:"TransferFunction",318:"WhitePoint",344:"XClipPathUnits",286:"XPosition",529:"YCbCrCoefficients",531:"YCbCrPositioning",530:"YCbCrSubSampling",345:"YClipPathUnits",287:"YPosition",37378:"ApertureValue",40961:"ColorSpace",36868:"DateTimeDigitized",36867:"DateTimeOriginal",34665:"Exif IFD",36864:"ExifVersion",33434:"ExposureTime",41728:"FileSource",37385:"Flash",40960:"FlashpixVersion",33437:"FNumber",42016:"ImageUniqueID",37384:"LightSource",37500:"MakerNote",37377:"ShutterSpeedValue",37510:"UserComment",33723:"IPTC",34675:"ICC Profile",700:"XMP",42112:"GDAL_METADATA",42113:"GDAL_NODATA",34377:"Photoshop",33550:"ModelPixelScale",33922:"ModelTiepoint",34264:"ModelTransformation",34735:"GeoKeyDirectory",34736:"GeoDoubleParams",34737:"GeoAsciiParams",50674:"LercParameters"},an={};for(const i in qi)qi.hasOwnProperty(i)&&(an[qi[i]]=parseInt(i,10));const Gg=[an.BitsPerSample,an.ExtraSamples,an.SampleFormat,an.StripByteCounts,an.StripOffsets,an.StripRowCounts,an.TileByteCounts,an.TileOffsets,an.SubIFDs],Us={1:"BYTE",2:"ASCII",3:"SHORT",4:"LONG",5:"RATIONAL",6:"SBYTE",7:"UNDEFINED",8:"SSHORT",9:"SLONG",10:"SRATIONAL",11:"FLOAT",12:"DOUBLE",13:"IFD",16:"LONG8",17:"SLONG8",18:"IFD8"},je={};for(const i in Us)Us.hasOwnProperty(i)&&(je[Us[i]]=parseInt(i,10));const Ht={WhiteIsZero:0,BlackIsZero:1,RGB:2,Palette:3,TransparencyMask:4,CMYK:5,YCbCr:6,CIELab:8,ICCLab:9},Hg={Unspecified:0,Assocalpha:1,Unassalpha:2},B_={Version:0,AddCompression:1},z_={None:0,Deflate:1},kg={1024:"GTModelTypeGeoKey",1025:"GTRasterTypeGeoKey",1026:"GTCitationGeoKey",2048:"GeographicTypeGeoKey",2049:"GeogCitationGeoKey",2050:"GeogGeodeticDatumGeoKey",2051:"GeogPrimeMeridianGeoKey",2052:"GeogLinearUnitsGeoKey",2053:"GeogLinearUnitSizeGeoKey",2054:"GeogAngularUnitsGeoKey",2055:"GeogAngularUnitSizeGeoKey",2056:"GeogEllipsoidGeoKey",2057:"GeogSemiMajorAxisGeoKey",2058:"GeogSemiMinorAxisGeoKey",2059:"GeogInvFlatteningGeoKey",2060:"GeogAzimuthUnitsGeoKey",2061:"GeogPrimeMeridianLongGeoKey",2062:"GeogTOWGS84GeoKey",3072:"ProjectedCSTypeGeoKey",3073:"PCSCitationGeoKey",3074:"ProjectionGeoKey",3075:"ProjCoordTransGeoKey",3076:"ProjLinearUnitsGeoKey",3077:"ProjLinearUnitSizeGeoKey",3078:"ProjStdParallel1GeoKey",3079:"ProjStdParallel2GeoKey",3080:"ProjNatOriginLongGeoKey",3081:"ProjNatOriginLatGeoKey",3082:"ProjFalseEastingGeoKey",3083:"ProjFalseNorthingGeoKey",3084:"ProjFalseOriginLongGeoKey",3085:"ProjFalseOriginLatGeoKey",3086:"ProjFalseOriginEastingGeoKey",3087:"ProjFalseOriginNorthingGeoKey",3088:"ProjCenterLongGeoKey",3089:"ProjCenterLatGeoKey",3090:"ProjCenterEastingGeoKey",3091:"ProjCenterNorthingGeoKey",3092:"ProjScaleAtNatOriginGeoKey",3093:"ProjScaleAtCenterGeoKey",3094:"ProjAzimuthAngleGeoKey",3095:"ProjStraightVertPoleLongGeoKey",3096:"ProjRectifiedGridAngleGeoKey",4096:"VerticalCSTypeGeoKey",4097:"VerticalCitationGeoKey",4098:"VerticalDatumGeoKey",4099:"VerticalUnitsGeoKey"};function Vg(i,e){const{width:t,height:n}=i,r=new Uint8Array(t*n*3);let s;for(let a=0,o=0;a<i.length;++a,o+=3)s=256-i[a]/e*256,r[o]=s,r[o+1]=s,r[o+2]=s;return r}function Wg(i,e){const{width:t,height:n}=i,r=new Uint8Array(t*n*3);let s;for(let a=0,o=0;a<i.length;++a,o+=3)s=i[a]/e*256,r[o]=s,r[o+1]=s,r[o+2]=s;return r}function Xg(i,e){const{width:t,height:n}=i,r=new Uint8Array(t*n*3),s=e.length/3,a=e.length/3*2;for(let o=0,l=0;o<i.length;++o,l+=3){const c=i[o];r[l]=e[c]/65536*256,r[l+1]=e[c+s]/65536*256,r[l+2]=e[c+a]/65536*256}return r}function Yg(i){const{width:e,height:t}=i,n=new Uint8Array(e*t*3);for(let r=0,s=0;r<i.length;r+=4,s+=3){const a=i[r],o=i[r+1],l=i[r+2],c=i[r+3];n[s]=255*((255-a)/256)*((255-c)/256),n[s+1]=255*((255-o)/256)*((255-c)/256),n[s+2]=255*((255-l)/256)*((255-c)/256)}return n}function qg(i){const{width:e,height:t}=i,n=new Uint8ClampedArray(e*t*3);for(let r=0,s=0;r<i.length;r+=3,s+=3){const a=i[r],o=i[r+1],l=i[r+2];n[s]=a+1.402*(l-128),n[s+1]=a-.34414*(o-128)-.71414*(l-128),n[s+2]=a+1.772*(o-128)}return n}const $g=.95047,jg=1,Zg=1.08883;function Kg(i){const{width:e,height:t}=i,n=new Uint8Array(e*t*3);for(let r=0,s=0;r<i.length;r+=3,s+=3){const a=i[r+0],o=i[r+1]<<24>>24,l=i[r+2]<<24>>24;let c=(a+16)/116,u=o/500+c,h=c-l/200,f,m,v;u=$g*(u*u*u>.008856?u*u*u:(u-16/116)/7.787),c=jg*(c*c*c>.008856?c*c*c:(c-16/116)/7.787),h=Zg*(h*h*h>.008856?h*h*h:(h-16/116)/7.787),f=u*3.2406+c*-1.5372+h*-.4986,m=u*-.9689+c*1.8758+h*.0415,v=u*.0557+c*-.204+h*1.057,f=f>.0031308?1.055*f**(1/2.4)-.055:12.92*f,m=m>.0031308?1.055*m**(1/2.4)-.055:12.92*m,v=v>.0031308?1.055*v**(1/2.4)-.055:12.92*v,n[s]=Math.max(0,Math.min(1,f))*255,n[s+1]=Math.max(0,Math.min(1,m))*255,n[s+2]=Math.max(0,Math.min(1,v))*255}return n}const Jg="modulepreload",Qg=function(i){return"/"+i},$a={},ii=function(e,t,n){if(!t||t.length===0)return e();const r=document.getElementsByTagName("link");return Promise.all(t.map(s=>{if(s=Qg(s),s in $a)return;$a[s]=!0;const a=s.endsWith(".css"),o=a?'[rel="stylesheet"]':"";if(!!n)for(let u=r.length-1;u>=0;u--){const h=r[u];if(h.href===s&&(!a||h.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${s}"]${o}`))return;const c=document.createElement("link");if(c.rel=a?"stylesheet":Jg,a||(c.as="script",c.crossOrigin=""),c.href=s,document.head.appendChild(c),a)return new Promise((u,h)=>{c.addEventListener("load",u),c.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${s}`)))})})).then(()=>e()).catch(s=>{const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=s,window.dispatchEvent(a),!a.defaultPrevented)throw s})},ec=new Map;function kn(i,e){Array.isArray(i)||(i=[i]),i.forEach(t=>ec.set(t,e))}async function e_(i){const e=ec.get(i.Compression);if(!e)throw new Error(`Unknown compression method identifier: ${i.Compression}`);const t=await e();return new t(i)}kn([void 0,1],()=>ii(()=>import("./raw.16e259e8.js"),["raw.16e259e8.js","basedecoder.3573ccae.js"]).then(i=>i.default));kn(5,()=>ii(()=>import("./lzw.0b7c2117.js"),["lzw.0b7c2117.js","basedecoder.3573ccae.js"]).then(i=>i.default));kn(6,()=>{throw new Error("old style JPEG compression is not supported.")});kn(7,()=>ii(()=>import("./jpeg.0e827cca.js"),["jpeg.0e827cca.js","basedecoder.3573ccae.js"]).then(i=>i.default));kn([8,32946],()=>ii(()=>import("./deflate.07c88adb.js"),["deflate.07c88adb.js","pako.esm.bae9e474.js","basedecoder.3573ccae.js"]).then(i=>i.default));kn(32773,()=>ii(()=>import("./packbits.7447f594.js"),["packbits.7447f594.js","basedecoder.3573ccae.js"]).then(i=>i.default));kn(34887,()=>ii(()=>import("./lerc.0f3d4467.js"),["lerc.0f3d4467.js","pako.esm.bae9e474.js","basedecoder.3573ccae.js"]).then(i=>i.default));kn(50001,()=>ii(()=>import("./webimage.7f58dce1.js"),["webimage.7f58dce1.js","basedecoder.3573ccae.js"]).then(i=>i.default));function Xr(i,e,t,n=1){return new(Object.getPrototypeOf(i)).constructor(e*t*n)}function t_(i,e,t,n,r){const s=e/n,a=t/r;return i.map(o=>{const l=Xr(o,n,r);for(let c=0;c<r;++c){const u=Math.min(Math.round(a*c),t-1);for(let h=0;h<n;++h){const f=Math.min(Math.round(s*h),e-1),m=o[u*e+f];l[c*n+h]=m}}return l})}function Ti(i,e,t){return(1-t)*i+t*e}function n_(i,e,t,n,r){const s=e/n,a=t/r;return i.map(o=>{const l=Xr(o,n,r);for(let c=0;c<r;++c){const u=a*c,h=Math.floor(u),f=Math.min(Math.ceil(u),t-1);for(let m=0;m<n;++m){const v=s*m,x=v%1,p=Math.floor(v),d=Math.min(Math.ceil(v),e-1),b=o[h*e+p],E=o[h*e+d],C=o[f*e+p],w=o[f*e+d],N=Ti(Ti(b,E,x),Ti(C,w,x),u%1);l[c*n+m]=N}}return l})}function i_(i,e,t,n,r,s="nearest"){switch(s.toLowerCase()){case"nearest":return t_(i,e,t,n,r);case"bilinear":case"linear":return n_(i,e,t,n,r);default:throw new Error(`Unsupported resampling method: '${s}'`)}}function r_(i,e,t,n,r,s){const a=e/n,o=t/r,l=Xr(i,n,r,s);for(let c=0;c<r;++c){const u=Math.min(Math.round(o*c),t-1);for(let h=0;h<n;++h){const f=Math.min(Math.round(a*h),e-1);for(let m=0;m<s;++m){const v=i[u*e*s+f*s+m];l[c*n*s+h*s+m]=v}}}return l}function s_(i,e,t,n,r,s){const a=e/n,o=t/r,l=Xr(i,n,r,s);for(let c=0;c<r;++c){const u=o*c,h=Math.floor(u),f=Math.min(Math.ceil(u),t-1);for(let m=0;m<n;++m){const v=a*m,x=v%1,p=Math.floor(v),d=Math.min(Math.ceil(v),e-1);for(let b=0;b<s;++b){const E=i[h*e*s+p*s+b],C=i[h*e*s+d*s+b],w=i[f*e*s+p*s+b],N=i[f*e*s+d*s+b],I=Ti(Ti(E,C,x),Ti(w,N,x),u%1);l[c*n*s+m*s+b]=I}}}return l}function o_(i,e,t,n,r,s,a="nearest"){switch(a.toLowerCase()){case"nearest":return r_(i,e,t,n,r,s);case"bilinear":case"linear":return s_(i,e,t,n,r,s);default:throw new Error(`Unsupported resampling method: '${a}'`)}}function a_(i,e,t){let n=0;for(let r=e;r<t;++r)n+=i[r];return n}function Ys(i,e,t){switch(i){case 1:if(e<=8)return new Uint8Array(t);if(e<=16)return new Uint16Array(t);if(e<=32)return new Uint32Array(t);break;case 2:if(e===8)return new Int8Array(t);if(e===16)return new Int16Array(t);if(e===32)return new Int32Array(t);break;case 3:switch(e){case 16:case 32:return new Float32Array(t);case 64:return new Float64Array(t)}break}throw Error("Unsupported data format/bitsPerSample")}function l_(i,e){return(i===1||i===2)&&e<=32&&e%8===0?!1:!(i===3&&(e===16||e===32||e===64))}function c_(i,e,t,n,r,s,a){const o=new DataView(i),l=t===2?a*s:a*s*n,c=t===2?1:n,u=Ys(e,r,l),h=parseInt("1".repeat(r),2);if(e===1){let f;t===1?f=n*r:f=r;let m=s*f;m&7&&(m=m+7&-8);for(let v=0;v<a;++v){const x=v*m;for(let p=0;p<s;++p){const d=x+p*c*r;for(let b=0;b<c;++b){const E=d+b*r,C=(v*s+p)*c+b,w=Math.floor(E/8),N=E%8;if(N+r<=8)u[C]=o.getUint8(w)>>8-r-N&h;else if(N+r<=16)u[C]=o.getUint16(w)>>16-r-N&h;else if(N+r<=24){const I=o.getUint16(w)<<8|o.getUint8(w+2);u[C]=I>>24-r-N&h}else u[C]=o.getUint32(w)>>32-r-N&h}}}}return u.buffer}class u_{constructor(e,t,n,r,s,a){this.fileDirectory=e,this.geoKeys=t,this.dataView=n,this.littleEndian=r,this.tiles=s?{}:null,this.isTiled=!e.StripOffsets;const o=e.PlanarConfiguration;if(this.planarConfiguration=typeof o>"u"?1:o,this.planarConfiguration!==1&&this.planarConfiguration!==2)throw new Error("Invalid planar configuration.");this.source=a}getFileDirectory(){return this.fileDirectory}getGeoKeys(){return this.geoKeys}getWidth(){return this.fileDirectory.ImageWidth}getHeight(){return this.fileDirectory.ImageLength}getSamplesPerPixel(){return typeof this.fileDirectory.SamplesPerPixel<"u"?this.fileDirectory.SamplesPerPixel:1}getTileWidth(){return this.isTiled?this.fileDirectory.TileWidth:this.getWidth()}getTileHeight(){return this.isTiled?this.fileDirectory.TileLength:typeof this.fileDirectory.RowsPerStrip<"u"?Math.min(this.fileDirectory.RowsPerStrip,this.getHeight()):this.getHeight()}getBlockWidth(){return this.getTileWidth()}getBlockHeight(e){return this.isTiled||(e+1)*this.getTileHeight()<=this.getHeight()?this.getTileHeight():this.getHeight()-e*this.getTileHeight()}getBytesPerPixel(){let e=0;for(let t=0;t<this.fileDirectory.BitsPerSample.length;++t)e+=this.getSampleByteSize(t);return e}getSampleByteSize(e){if(e>=this.fileDirectory.BitsPerSample.length)throw new RangeError(`Sample index ${e} is out of range.`);return Math.ceil(this.fileDirectory.BitsPerSample[e]/8)}getReaderForSample(e){const t=this.fileDirectory.SampleFormat?this.fileDirectory.SampleFormat[e]:1,n=this.fileDirectory.BitsPerSample[e];switch(t){case 1:if(n<=8)return DataView.prototype.getUint8;if(n<=16)return DataView.prototype.getUint16;if(n<=32)return DataView.prototype.getUint32;break;case 2:if(n<=8)return DataView.prototype.getInt8;if(n<=16)return DataView.prototype.getInt16;if(n<=32)return DataView.prototype.getInt32;break;case 3:switch(n){case 16:return function(r,s){return Yl(this,r,s)};case 32:return DataView.prototype.getFloat32;case 64:return DataView.prototype.getFloat64}break}throw Error("Unsupported data format/bitsPerSample")}getSampleFormat(e=0){return this.fileDirectory.SampleFormat?this.fileDirectory.SampleFormat[e]:1}getBitsPerSample(e=0){return this.fileDirectory.BitsPerSample[e]}getArrayForSample(e,t){const n=this.getSampleFormat(e),r=this.getBitsPerSample(e);return Ys(n,r,t)}async getTileOrStrip(e,t,n,r,s){const a=Math.ceil(this.getWidth()/this.getTileWidth()),o=Math.ceil(this.getHeight()/this.getTileHeight());let l;const{tiles:c}=this;this.planarConfiguration===1?l=t*a+e:this.planarConfiguration===2&&(l=n*a*o+t*a+e);let u,h;this.isTiled?(u=this.fileDirectory.TileOffsets[l],h=this.fileDirectory.TileByteCounts[l]):(u=this.fileDirectory.StripOffsets[l],h=this.fileDirectory.StripByteCounts[l]);const f=(await this.source.fetch([{offset:u,length:h}],s))[0];let m;return c===null||!c[l]?(m=(async()=>{let v=await r.decode(this.fileDirectory,f);const x=this.getSampleFormat(),p=this.getBitsPerSample();return l_(x,p)&&(v=c_(v,x,this.planarConfiguration,this.getSamplesPerPixel(),p,this.getTileWidth(),this.getBlockHeight(t))),v})(),c!==null&&(c[l]=m)):m=c[l],{x:e,y:t,sample:n,data:await m}}async _readRaster(e,t,n,r,s,a,o,l,c){const u=this.getTileWidth(),h=this.getTileHeight(),f=this.getWidth(),m=this.getHeight(),v=Math.max(Math.floor(e[0]/u),0),x=Math.min(Math.ceil(e[2]/u),Math.ceil(f/u)),p=Math.max(Math.floor(e[1]/h),0),d=Math.min(Math.ceil(e[3]/h),Math.ceil(m/h)),b=e[2]-e[0];let E=this.getBytesPerPixel();const C=[],w=[];for(let k=0;k<t.length;++k)this.planarConfiguration===1?C.push(a_(this.fileDirectory.BitsPerSample,0,t[k])/8):C.push(0),w.push(this.getReaderForSample(t[k]));const N=[],{littleEndian:I}=this;for(let k=p;k<d;++k)for(let M=v;M<x;++M)for(let P=0;P<t.length;++P){const j=P,J=t[P];this.planarConfiguration===2&&(E=this.getSampleByteSize(P));const oe=this.getTileOrStrip(M,k,J,s,c).then(B=>{const Y=B.data,te=new DataView(Y),Z=this.getBlockHeight(B.y),ce=B.y*h,Q=B.x*u,ne=ce+Z,he=(B.x+1)*u,xe=w[j],q=Math.min(Z,Z-(ne-e[3]),m-ce),ie=Math.min(u,u-(he-e[2]),f-Q);for(let Ee=Math.max(0,e[1]-ce);Ee<q;++Ee)for(let fe=Math.max(0,e[0]-Q);fe<ie;++fe){const z=(Ee*u+fe)*E,ae=xe.call(te,z+C[j],I);let we;r?(we=(Ee+ce-e[1])*b*t.length+(fe+Q-e[0])*t.length+j,n[we]=ae):(we=(Ee+ce-e[1])*b+fe+Q-e[0],n[j][we]=ae)}});N.push(oe)}if(await Promise.all(N),a&&e[2]-e[0]!==a||o&&e[3]-e[1]!==o){let k;return r?k=o_(n,e[2]-e[0],e[3]-e[1],a,o,t.length,l):k=i_(n,e[2]-e[0],e[3]-e[1],a,o,l),k.width=a,k.height=o,k}return n.width=a||e[2]-e[0],n.height=o||e[3]-e[1],n}async readRasters({window:e,samples:t=[],interleave:n,pool:r=null,width:s,height:a,resampleMethod:o,fillValue:l,signal:c}={}){const u=e||[0,0,this.getWidth(),this.getHeight()];if(u[0]>u[2]||u[1]>u[3])throw new Error("Invalid subsets");const h=u[2]-u[0],f=u[3]-u[1],m=h*f,v=this.getSamplesPerPixel();if(!t||!t.length)for(let b=0;b<v;++b)t.push(b);else for(let b=0;b<t.length;++b)if(t[b]>=v)return Promise.reject(new RangeError(`Invalid sample index '${t[b]}'.`));let x;if(n){const b=this.fileDirectory.SampleFormat?Math.max.apply(null,this.fileDirectory.SampleFormat):1,E=Math.max.apply(null,this.fileDirectory.BitsPerSample);x=Ys(b,E,m*t.length),l&&x.fill(l)}else{x=[];for(let b=0;b<t.length;++b){const E=this.getArrayForSample(t[b],m);Array.isArray(l)&&b<l.length?E.fill(l[b]):l&&!Array.isArray(l)&&E.fill(l),x.push(E)}}const p=r||await e_(this.fileDirectory);return await this._readRaster(u,t,x,n,p,s,a,o,c)}async readRGB({window:e,interleave:t=!0,pool:n=null,width:r,height:s,resampleMethod:a,enableAlpha:o=!1,signal:l}={}){const c=e||[0,0,this.getWidth(),this.getHeight()];if(c[0]>c[2]||c[1]>c[3])throw new Error("Invalid subsets");const u=this.fileDirectory.PhotometricInterpretation;if(u===Ht.RGB){let d=[0,1,2];if(this.fileDirectory.ExtraSamples!==Hg.Unspecified&&o){d=[];for(let b=0;b<this.fileDirectory.BitsPerSample.length;b+=1)d.push(b)}return this.readRasters({window:e,interleave:t,samples:d,pool:n,width:r,height:s,resampleMethod:a,signal:l})}let h;switch(u){case Ht.WhiteIsZero:case Ht.BlackIsZero:case Ht.Palette:h=[0];break;case Ht.CMYK:h=[0,1,2,3];break;case Ht.YCbCr:case Ht.CIELab:h=[0,1,2];break;default:throw new Error("Invalid or unsupported photometric interpretation.")}const f={window:c,interleave:!0,samples:h,pool:n,width:r,height:s,resampleMethod:a,signal:l},{fileDirectory:m}=this,v=await this.readRasters(f),x=2**this.fileDirectory.BitsPerSample[0];let p;switch(u){case Ht.WhiteIsZero:p=Vg(v,x);break;case Ht.BlackIsZero:p=Wg(v,x);break;case Ht.Palette:p=Xg(v,m.ColorMap);break;case Ht.CMYK:p=Yg(v);break;case Ht.YCbCr:p=qg(v);break;case Ht.CIELab:p=Kg(v);break;default:throw new Error("Unsupported photometric interpretation.")}if(!t){const d=new Uint8Array(p.length/3),b=new Uint8Array(p.length/3),E=new Uint8Array(p.length/3);for(let C=0,w=0;C<p.length;C+=3,++w)d[w]=p[C],b[w]=p[C+1],E[w]=p[C+2];p=[d,b,E]}return p.width=v.width,p.height=v.height,p}getTiePoints(){if(!this.fileDirectory.ModelTiepoint)return[];const e=[];for(let t=0;t<this.fileDirectory.ModelTiepoint.length;t+=6)e.push({i:this.fileDirectory.ModelTiepoint[t],j:this.fileDirectory.ModelTiepoint[t+1],k:this.fileDirectory.ModelTiepoint[t+2],x:this.fileDirectory.ModelTiepoint[t+3],y:this.fileDirectory.ModelTiepoint[t+4],z:this.fileDirectory.ModelTiepoint[t+5]});return e}getGDALMetadata(e=null){const t={};if(!this.fileDirectory.GDAL_METADATA)return null;const n=this.fileDirectory.GDAL_METADATA;let r=zg(n,"Item");e===null?r=r.filter(s=>Ls(s,"sample")===void 0):r=r.filter(s=>Number(Ls(s,"sample"))===e);for(let s=0;s<r.length;++s){const a=r[s];t[Ls(a,"name")]=a.inner}return t}getGDALNoData(){if(!this.fileDirectory.GDAL_NODATA)return null;const e=this.fileDirectory.GDAL_NODATA;return Number(e.substring(0,e.length-1))}getOrigin(){const e=this.fileDirectory.ModelTiepoint,t=this.fileDirectory.ModelTransformation;if(e&&e.length===6)return[e[3],e[4],e[5]];if(t)return[t[3],t[7],t[11]];throw new Error("The image does not have an affine transformation.")}getResolution(e=null){const t=this.fileDirectory.ModelPixelScale,n=this.fileDirectory.ModelTransformation;if(t)return[t[0],-t[1],t[2]];if(n)return[n[0],n[5],n[10]];if(e){const[r,s,a]=e.getResolution();return[r*e.getWidth()/this.getWidth(),s*e.getHeight()/this.getHeight(),a*e.getWidth()/this.getWidth()]}throw new Error("The image does not have an affine transformation.")}pixelIsArea(){return this.geoKeys.GTRasterTypeGeoKey===1}getBoundingBox(){const e=this.getOrigin(),t=this.getResolution(),n=e[0],r=e[1],s=n+t[0]*this.getWidth(),a=r+t[1]*this.getHeight();return[Math.min(n,s),Math.min(r,a),Math.max(n,s),Math.max(r,a)]}}const h_=u_;class d_{constructor(e){this._dataView=new DataView(e)}get buffer(){return this._dataView.buffer}getUint64(e,t){const n=this.getUint32(e,t),r=this.getUint32(e+4,t);let s;if(t){if(s=n+2**32*r,!Number.isSafeInteger(s))throw new Error(`${s} exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues`);return s}if(s=2**32*n+r,!Number.isSafeInteger(s))throw new Error(`${s} exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues`);return s}getInt64(e,t){let n=0;const r=(this._dataView.getUint8(e+(t?7:0))&128)>0;let s=!0;for(let a=0;a<8;a++){let o=this._dataView.getUint8(e+(t?a:7-a));r&&(s?o!==0&&(o=~(o-1)&255,s=!1):o=~o&255),n+=o*256**a}return r&&(n=-n),n}getUint8(e,t){return this._dataView.getUint8(e,t)}getInt8(e,t){return this._dataView.getInt8(e,t)}getUint16(e,t){return this._dataView.getUint16(e,t)}getInt16(e,t){return this._dataView.getInt16(e,t)}getUint32(e,t){return this._dataView.getUint32(e,t)}getInt32(e,t){return this._dataView.getInt32(e,t)}getFloat16(e,t){return Yl(this._dataView,e,t)}getFloat32(e,t){return this._dataView.getFloat32(e,t)}getFloat64(e,t){return this._dataView.getFloat64(e,t)}}class f_{constructor(e,t,n,r){this._dataView=new DataView(e),this._sliceOffset=t,this._littleEndian=n,this._bigTiff=r}get sliceOffset(){return this._sliceOffset}get sliceTop(){return this._sliceOffset+this.buffer.byteLength}get littleEndian(){return this._littleEndian}get bigTiff(){return this._bigTiff}get buffer(){return this._dataView.buffer}covers(e,t){return this.sliceOffset<=e&&this.sliceTop>=e+t}readUint8(e){return this._dataView.getUint8(e-this._sliceOffset,this._littleEndian)}readInt8(e){return this._dataView.getInt8(e-this._sliceOffset,this._littleEndian)}readUint16(e){return this._dataView.getUint16(e-this._sliceOffset,this._littleEndian)}readInt16(e){return this._dataView.getInt16(e-this._sliceOffset,this._littleEndian)}readUint32(e){return this._dataView.getUint32(e-this._sliceOffset,this._littleEndian)}readInt32(e){return this._dataView.getInt32(e-this._sliceOffset,this._littleEndian)}readFloat32(e){return this._dataView.getFloat32(e-this._sliceOffset,this._littleEndian)}readFloat64(e){return this._dataView.getFloat64(e-this._sliceOffset,this._littleEndian)}readUint64(e){const t=this.readUint32(e),n=this.readUint32(e+4);let r;if(this._littleEndian){if(r=t+2**32*n,!Number.isSafeInteger(r))throw new Error(`${r} exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues`);return r}if(r=2**32*t+n,!Number.isSafeInteger(r))throw new Error(`${r} exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues`);return r}readInt64(e){let t=0;const n=(this._dataView.getUint8(e+(this._littleEndian?7:0))&128)>0;let r=!0;for(let s=0;s<8;s++){let a=this._dataView.getUint8(e+(this._littleEndian?s:7-s));n&&(r?a!==0&&(a=~(a-1)&255,r=!1):a=~a&255),t+=a*256**s}return n&&(t=-t),t}readOffset(e){return this._bigTiff?this.readUint64(e):this.readUint32(e)}}class p_{async fetch(e,t=void 0){return Promise.all(e.map(n=>this.fetchSlice(n,t)))}async fetchSlice(e){throw new Error(`fetching of slice ${e} not possible, not implemented`)}get fileSize(){return null}async close(){}}class po extends Error{constructor(e){super(e),Error.captureStackTrace&&Error.captureStackTrace(this,po),this.name="AbortError"}}class m_ extends p_{constructor(e){super(),this.arrayBuffer=e}fetchSlice(e,t){if(t&&t.aborted)throw new po("Request aborted");return this.arrayBuffer.slice(e.offset,e.offset+e.length)}}function g_(i){return new m_(i)}function qs(i){switch(i){case je.BYTE:case je.ASCII:case je.SBYTE:case je.UNDEFINED:return 1;case je.SHORT:case je.SSHORT:return 2;case je.LONG:case je.SLONG:case je.FLOAT:case je.IFD:return 4;case je.RATIONAL:case je.SRATIONAL:case je.DOUBLE:case je.LONG8:case je.SLONG8:case je.IFD8:return 8;default:throw new RangeError(`Invalid field type: ${i}`)}}function __(i){const e=i.GeoKeyDirectory;if(!e)return null;const t={};for(let n=4;n<=e[3]*4;n+=4){const r=kg[e[n]],s=e[n+1]?qi[e[n+1]]:null,a=e[n+2],o=e[n+3];let l=null;if(!s)l=o;else{if(l=i[s],typeof l>"u"||l===null)throw new Error(`Could not get value of geoKey '${r}'.`);typeof l=="string"?l=l.substring(o,o+a-1):l.subarray&&(l=l.subarray(o,o+a),a===1&&(l=l[0]))}t[r]=l}return t}function Ei(i,e,t,n){let r=null,s=null;const a=qs(e);switch(e){case je.BYTE:case je.ASCII:case je.UNDEFINED:r=new Uint8Array(t),s=i.readUint8;break;case je.SBYTE:r=new Int8Array(t),s=i.readInt8;break;case je.SHORT:r=new Uint16Array(t),s=i.readUint16;break;case je.SSHORT:r=new Int16Array(t),s=i.readInt16;break;case je.LONG:case je.IFD:r=new Uint32Array(t),s=i.readUint32;break;case je.SLONG:r=new Int32Array(t),s=i.readInt32;break;case je.LONG8:case je.IFD8:r=new Array(t),s=i.readUint64;break;case je.SLONG8:r=new Array(t),s=i.readInt64;break;case je.RATIONAL:r=new Uint32Array(t*2),s=i.readUint32;break;case je.SRATIONAL:r=new Int32Array(t*2),s=i.readInt32;break;case je.FLOAT:r=new Float32Array(t),s=i.readFloat32;break;case je.DOUBLE:r=new Float64Array(t),s=i.readFloat64;break;default:throw new RangeError(`Invalid field type: ${e}`)}if(e===je.RATIONAL||e===je.SRATIONAL)for(let o=0;o<t;o+=2)r[o]=s.call(i,n+o*a),r[o+1]=s.call(i,n+(o*a+4));else for(let o=0;o<t;++o)r[o]=s.call(i,n+o*a);return e===je.ASCII?new TextDecoder("utf-8").decode(r):r}class v_{constructor(e,t,n){this.fileDirectory=e,this.geoKeyDirectory=t,this.nextIFDByteOffset=n}}class Rr extends Error{constructor(e){super(`No image at index ${e}`),this.index=e}}class x_{async readRasters(e={}){const{window:t,width:n,height:r}=e;let{resX:s,resY:a,bbox:o}=e;const l=await this.getImage();let c=l;const u=await this.getImageCount(),h=l.getBoundingBox();if(t&&o)throw new Error('Both "bbox" and "window" passed.');if(n||r){if(t){const[v,x]=l.getOrigin(),[p,d]=l.getResolution();o=[v+t[0]*p,x+t[1]*d,v+t[2]*p,x+t[3]*d]}const m=o||h;if(n){if(s)throw new Error("Both width and resX passed");s=(m[2]-m[0])/n}if(r){if(a)throw new Error("Both width and resY passed");a=(m[3]-m[1])/r}}if(s||a){const m=[];for(let v=0;v<u;++v){const x=await this.getImage(v),{SubfileType:p,NewSubfileType:d}=x.fileDirectory;(v===0||p===2||d&1)&&m.push(x)}m.sort((v,x)=>v.getWidth()-x.getWidth());for(let v=0;v<m.length;++v){const x=m[v],p=(h[2]-h[0])/x.getWidth(),d=(h[3]-h[1])/x.getHeight();if(c=x,s&&s>p||a&&a>d)break}}let f=t;if(o){const[m,v]=l.getOrigin(),[x,p]=c.getResolution(l);f=[Math.round((o[0]-m)/x),Math.round((o[1]-v)/p),Math.round((o[2]-m)/x),Math.round((o[3]-v)/p)],f=[Math.min(f[0],f[2]),Math.min(f[1],f[3]),Math.max(f[0],f[2]),Math.max(f[1],f[3])]}return c.readRasters({...e,window:f})}}class mo extends x_{constructor(e,t,n,r,s={}){super(),this.source=e,this.littleEndian=t,this.bigTiff=n,this.firstIFDOffset=r,this.cache=s.cache||!1,this.ifdRequests=[],this.ghostValues=null}async getSlice(e,t){const n=this.bigTiff?4048:1024;return new f_((await this.source.fetch([{offset:e,length:typeof t<"u"?t:n}]))[0],e,this.littleEndian,this.bigTiff)}async parseFileDirectoryAt(e){const t=this.bigTiff?20:12,n=this.bigTiff?8:2;let r=await this.getSlice(e);const s=this.bigTiff?r.readUint64(e):r.readUint16(e),a=s*t+(this.bigTiff?16:6);r.covers(e,a)||(r=await this.getSlice(e,a));const o={};let l=e+(this.bigTiff?8:2);for(let h=0;h<s;l+=t,++h){const f=r.readUint16(l),m=r.readUint16(l+2),v=this.bigTiff?r.readUint64(l+4):r.readUint32(l+4);let x,p;const d=qs(m),b=l+(this.bigTiff?12:8);if(d*v<=(this.bigTiff?8:4))x=Ei(r,m,v,b);else{const E=r.readOffset(b),C=qs(m)*v;if(r.covers(E,C))x=Ei(r,m,v,E);else{const w=await this.getSlice(E,C);x=Ei(w,m,v,E)}}v===1&&Gg.indexOf(f)===-1&&!(m===je.RATIONAL||m===je.SRATIONAL)?p=x[0]:p=x,o[qi[f]]=p}const c=__(o),u=r.readOffset(e+n+t*s);return new v_(o,c,u)}async requestIFD(e){if(this.ifdRequests[e])return this.ifdRequests[e];if(e===0)return this.ifdRequests[e]=this.parseFileDirectoryAt(this.firstIFDOffset),this.ifdRequests[e];if(!this.ifdRequests[e-1])try{this.ifdRequests[e-1]=this.requestIFD(e-1)}catch(t){throw t instanceof Rr?new Rr(e):t}return this.ifdRequests[e]=(async()=>{const t=await this.ifdRequests[e-1];if(t.nextIFDByteOffset===0)throw new Rr(e);return this.parseFileDirectoryAt(t.nextIFDByteOffset)})(),this.ifdRequests[e]}async getImage(e=0){const t=await this.requestIFD(e);return new h_(t.fileDirectory,t.geoKeyDirectory,this.dataView,this.littleEndian,this.cache,this.source)}async getImageCount(){let e=0,t=!0;for(;t;)try{await this.requestIFD(e),++e}catch(n){if(n instanceof Rr)t=!1;else throw n}return e}async getGhostValues(){const e=this.bigTiff?16:8;if(this.ghostValues)return this.ghostValues;const t="GDAL_STRUCTURAL_METADATA_SIZE=",n=t.length+100;let r=await this.getSlice(e,n);if(t===Ei(r,je.ASCII,t.length,e)){const a=Ei(r,je.ASCII,n,e).split(`
`)[0],o=Number(a.split("=")[1].split(" ")[0])+a.length;o>n&&(r=await this.getSlice(e,o));const l=Ei(r,je.ASCII,o,e);this.ghostValues={},l.split(`
`).filter(c=>c.length>0).map(c=>c.split("=")).forEach(([c,u])=>{this.ghostValues[c]=u})}return this.ghostValues}static async fromSource(e,t,n){const r=(await e.fetch([{offset:0,length:1024}],n))[0],s=new d_(r),a=s.getUint16(0,0);let o;if(a===18761)o=!0;else if(a===19789)o=!1;else throw new TypeError("Invalid byte order value.");const l=s.getUint16(2,o);let c;if(l===42)c=!1;else if(l===43){if(c=!0,s.getUint16(4,o)!==8)throw new Error("Unsupported offset byte-size.")}else throw new TypeError("Invalid magic number.");const u=c?s.getUint64(8,o):s.getUint32(4,o);return new mo(e,o,c,u,t)}close(){return typeof this.source.close=="function"?this.source.close():!1}}async function E_(i,e){return mo.fromSource(g_(i),e)}const Br={width:window.innerWidth,height:window.innerHeight},Yr=document.createElement("canvas");document.body.appendChild(Yr);const go=new Nm;new sg().load("./starmap_random_2020_4k.exr",i=>{i.mapping=Lr,go.background=i});const Li=new $t(75,Br.width/Br.height,.1,1e5);Li.position.set(900,1700,2500);const Ki=new Wm(Li,Yr);Ki.enableDamping=!0;Ki.enableZoom=!1;Ki.maxDistance=2e4;const Di=new Xm(Li,Yr);Di.noPan=!0;Di.noRotate=!0;Di.noZoom=!1;Di.zoomSpeed=1.3;const qr=new Cl({canvas:Yr,alpha:!0});qr.setSize(Br.width,Br.height);qr.setPixelRatio(Math.min(window.devicePixelRatio,2));const tc=()=>{requestAnimationFrame(tc);const i=Ki.target;Ki.update(),Di.target.set(i.x,i.y,i.z),Di.update(),qr.render(go,Li)};tc();window.addEventListener("resize",()=>{Li.aspect=window.innerWidth/window.innerHeight,Li.updateProjectionMatrix(),qr.setSize(window.innerWidth,window.innerHeight)},!1);const nc={uMax:{value:0},uMin:{value:0},uMode:{value:0}},S_=`
        attribute float demY;
        varying vec3 fragNormal;
        varying vec3 fragPosition;
        varying vec3 vPosition;

        void main() {
            vec3 pos = position;
            pos.y += demY;
            vPosition = pos;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
`,M_=`
    varying vec3 fragPosition;
    varying vec3 vPosition;
    uniform float uMax; // SLDEMの最大値
    uniform float uMin; // SLDEMの最小値
    uniform int uMode;

    //法線ベクトルを求める関数
    vec3 getNormal ( vec3 position ) {
        vec3 dx = dFdx( position );
        vec3 dy = dFdy( position );
        return normalize( cross(dx, dy) );
    }

    void main() {
        if (uMode == 0) {
            // 陰影表示
            vec3 normal = getNormal(vPosition); // 法線ベクトルを取得
            vec3 lightPosition = vec3(500.0, 500.0, -1000.0); // 光源の位置

            // 光源からの方向ベクトルを計算
            vec3 lightDir = normalize(lightPosition - fragPosition); // フラグメント位置から光源までの方向ベクトル

            // 拡散反射の計算
            float diff = max(dot(normal, lightDir), 0.0); // 法線ベクトルと光源方向ベクトルの内積により拡散反射強度を計算

            // 拡散反射に基づく色の計算
            vec3 diffuseColor = vec3(1.0, 1.0, 1.0) * diff; // 拡散反射強度に応じて色を調整

    // 最終的な色をフラグメントの色として設定
    gl_FragColor = vec4(diffuseColor, 1.0); // 計算された色と透明度を設定
        } else if (uMode == 1) {
            // 標高による色彩変化
            // 色の設定
            vec3 lowColor = vec3(0.129,0.067,0.306);
            vec3 midColor = vec3(0.729,0.22,0.471);
            vec3 highColor = vec3(0.996,0.631,0.431);
            float normalizedHeight = (vPosition.y - uMin) / (uMax - uMin);
            float intensity = clamp(normalizedHeight, 0.0, 1.0);
            vec3 color;
            if (intensity < 0.5) {
                color = mix(lowColor, midColor, intensity * 2.0); // 低い部分から中間へ
            } else {
                color = mix(midColor, highColor, (intensity - 0.5) * 2.0); // 中間から高い部分へ
            }
            gl_FragColor = vec4(color, 1.0);
        } else if (uMode == 2) {
            // 傾斜量による色彩変化

            // 色の設定
            vec3 highColor = vec3(0.847,0.949,0.878);
            vec3 midColor = vec3(0.522,0.851,0.694);
            vec3 lowColor = vec3(0.204,0.518,0.647);

            vec3 normal = getNormal(vPosition); // 法線ベクトルを取得
            float intensity = abs(normal.y); // 垂直方向の強度（Y成分）

            vec3 color;
            if (intensity < 0.5) {
                color = mix(highColor, midColor, intensity * 2.0);
            } else {
                color = mix(midColor, lowColor, (intensity - 0.5) * 2.0);
            }

            gl_FragColor = vec4(color, 1.0);
        }
    }
`,y_=async i=>{const t=await(await fetch(i)).arrayBuffer(),r=await(await E_(t)).getImage(),a=(await r.readRasters())[0],o=r.getWidth(),l=r.getHeight(),c=r.getFileDirectory().ModelPixelScale[0],u=r.getFileDirectory().ModelPixelScale[1];return{raster:a,tiffWidth:o,tiffHeight:l,pixelWidth:c,pixelHeight:u}},b_=async i=>{const e=await y_(i),t=new Gn({vertexShader:S_,fragmentShader:M_,uniforms:nc,transparent:!0,side:cn}),n=e.raster.reduce((c,u)=>Math.min(c,u*.1),1/0),r=e.raster.reduce((c,u)=>Math.max(c,u*.1),-1/0);t.uniforms.uMax.value=r,t.uniforms.uMin.value=n;const s=new Vr(e.tiffWidth*5.922,e.tiffHeight*5.922,e.tiffWidth-1,e.tiffHeight-1),a=new Float32Array(e.raster.map(c=>c*.1));s.setAttribute("demY",new rn(a,1)),s.rotateX(-Math.PI/2),s.computeVertexNormals();const o=new Mn(s,t);s.name="dem",go.add(o);const l=document.getElementById("loading");l.style.display="none"};b_("./SLDEM2015.tif").catch(i=>{console.error("Error loading raster data:",i)});const T_=new $s,A_={mode:0};T_.add(A_,"mode",{Shading:0,Elevation:1,Slope:2}).onChange(function(i){nc.uMode.value=i});export{B_ as L,z_ as a,ql as g};

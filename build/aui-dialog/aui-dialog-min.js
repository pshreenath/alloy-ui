AUI.add("aui-dialog",function(r){var ad=r.Lang,x=r.Object,K=ad.isBoolean,E=ad.isArray,Q=ad.isObject,k=ad.toInt,M=r.config.doc,w="",n="bodyContent",W="boundingBox",aa="button",d="buttons",X="close",R="closethick",L="constrain2view",b="container",e="dd",S="default",Y="destroyOnClose",z="dialog",B=".",ab=5,m="dragInstance",p="draggable",h="footerContent",T="hd",J="height",H="icon",c="icons",u="io",y="loading",D="modal",ac="proxy",f="resizable",o="resizableInstance",G="stack",P="viewportRegion",g="width",s="resize:resize",O="resize:end",i=r.ClassNameManager.getClassName,C=i(z),j=i(z,aa),F=i(z,aa,b),U=i(z,aa,S),a=i(z,T),v=i(H,y),q=i(e),I=M.createTextNode(""),N='<button class="'+j+'"></button>',Z='<div class="'+F+'"></div>';var t=function(A){if(!r.DialogMask){r.DialogMask=new r.OverlayMask().render();}};r.mix(t,{NAME:z,ATTRS:{bodyContent:{value:I},buttons:{value:[],validator:E},close:{value:true},constrain2view:{value:false,validator:K},destroyOnClose:{value:false,validator:K},draggable:{lazyAdd:true,value:true,setter:function(A){return this._setDraggable(A);}},dragInstance:{value:null},modal:{lazyAdd:false,value:false,validator:K},resizable:{setter:function(A){return this._setResizable(A);},value:true},resizableInstance:{value:null},stack:{lazyAdd:true,value:true,setter:function(A){return this._setStack(A);},validator:K}}});t.prototype={initializer:function(af){var A=this;var ag=A.get(c);var ai=A.get(X);var ah=A.get(d);if(ah&&ah.length&&!A.get(h)){A.set(h,I);}if(ai){var ae={icon:R,id:R,handler:{fn:A.close,context:A}};if(ag){ag.push(ae);}A.set(c,ag);}A.addTarget(r.DialogManager);A.after("render",A._afterRenderer);},bindUI:function(){var A=this;A._bindLazyComponents();A.publish("close",{defaultFn:A._close});},destructor:function(){var A=this;var ae=A.get(W);r.Event.purgeElement(ae,true);r.DialogManager.remove(A);},alignToViewport:function(af,ae){var A=this;var ag=r.getDoc().get(P);A.move([ag.left+k(af),ag.top+k(ae)]);},close:function(){var A=this;A.fire("close");},_afterConstrain2viewChange:function(ae){var A=this;A._setConstrain2view(ae.newVal);},_afterDragStart:function(A){var am=this;var ai=am.get(L);if(!ai){var al=am.get(m);var ag=al.get("dragNode");var ah=ag.get(P);var af=ag.get("region");var ak=[0,0];var ae=al.deltaXY||ak;var aj=al.mouseXY||ak;al.plug(r.Plugin.DDConstrained,{constrain:{bottom:ah.bottom+(af.height-ae[1])-ab,left:ah.left-ae[0]+ab,right:ah.right+(af.right-aj[0])+ab,top:ah.top-ae[1]+ab}});}},_afterRenderer:function(ae){var A=this;A._initButtons();A.get(G);A.get(u);},_bindLazyComponents:function(){var A=this;var ae=A.get(W);ae.on("mouseenter",r.bind(A._initLazyComponents,A));},_close:function(){var A=this;if(A.get(Y)){A.destroy();}else{A.hide();}},_initButtons:function(){var A=this;var af=A.get(d);var ae=r.Node.create(Z);var ag=r.Node.create(N);r.each(af,function(aj,ai){var am=ag.clone();if(aj.isDefault){am.addClass(U);}if(aj.handler){var al=aj.handler;var ak=al.fn||al;var ah=al.context||A;am.on("click",ak,ah);}am.html(aj.text||w);ae.append(am);});if(af.length){A.set(h,ae);}},_initLazyComponents:function(){var A=this;if(!A.get(m)&&A.get(p)){A.get(p);}if(!A.get(o)&&A.get(f)){A.get(f);}},_setConstrain2view:function(ae){var A=this;var af=A.get(m);if(af){af.plug(r.Plugin.DDConstrained,{constrain2view:ae});}},_setDraggable:function(ah){var A=this;var af=A.get(W);var ag=function(){var ak=A.get(m);if(ak){ak.destroy();ak.unplug(r.Plugin.DDConstrained);}};r.DD.DDM.CSS_PREFIX=q;if(ah){var ai={node:af,handles:[B+a]};var ae=r.merge(ai,ah||{});if(ae.on){r.each(ae.on,function(al,ak){ae.on[ak]=r.bind(al,A);});}ag();var aj=new r.DD.Drag(ae);A.set(m,aj);aj.after("start",A._afterDragStart,A);A.after("constrain2viewChange",A._afterConstrain2viewChange,A);A._setConstrain2view(A.get("constrain2view"));}else{ag();}return ah;},_setResizable:function(ah){var A=this;var ai=A.get(o);var ag=function(){if(ai){ai.destroy();}};if(ah){var af=function(ak){var aj=ak.type;var al=ak.info;if((aj===O)||((aj===s)&&!ak.currentTarget.get(ac))){A.set(J,al.offsetHeight);A.set(g,al.offsetWidth);}};ag();var ae=new r.Resize(r.merge({handles:"r,br,b",minHeight:100,minWidth:200,constrain2view:true,node:A.get(W),proxy:true},ah||{}));ae.after("end",af);ae.after("resize",af);A.set(o,ae);return ah;}else{ag();}},_setStack:function(ae){var A=this;if(ae){r.DialogManager.register(A);}else{r.DialogManager.remove(A);}return ae;},_uiHandles:[]};r.Dialog=r.Base.build(z,r.Panel,[t,r.WidgetPosition,r.WidgetStack,r.WidgetPositionAlign,r.WidgetPositionConstrain]);var l=new r.OverlayManager({zIndexBase:1000});var V={};l._MODALS=V;l.after(["dialog:destroy","dialog:modalChange","dialog:render","dialog:visibleChange"],function(ae){var A=ae.target;if(A){var af=A.get("id");if(ae.type!=="dialog:destroy"&&A.get("visible")&&A.get("modal")){V[af]=true;r.DialogMask.show();}else{delete V[af];if(x.isEmpty(V)){r.DialogMask.hide();}}}});r.mix(l,{findByChild:function(A){return r.Widget.getByNode(r.one(A).ancestor(B+C,true));},closeByChild:function(A){return l.findByChild(A).close();},refreshByChild:function(ae){var A=l.findByChild(ae);if(A&&A.io){A.io.start();}}});r.DialogManager=l;},"@VERSION@",{skinnable:true,requires:["aui-panel","dd-constrain","aui-button-item","aui-overlay-manager","aui-overlay-mask","aui-io-plugin","aui-resize"]});
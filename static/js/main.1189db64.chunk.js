(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],[,,,,,,,,,,,,function(e,t,a){e.exports=a(22)},,,,,function(e,t,a){},function(e,t,a){},,function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(10),c=a.n(o),l=(a(17),a(18),a(1)),s=a.n(l),m=a(2),i=a(4),u=a(5),d=a(8),p=a(7),h=(a(20),function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).getImages=function(){var e=Object(m.a)(s.a.mark((function e(t,a){var n,r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(t.getImages(),{signal:a});case 3:return n=e.sent,e.next=6,n.json();case 6:return r=e.sent,e.abrupt("return",r);case 10:throw e.prev=10,e.t0=e.catch(0),e.t0;case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t,a){return e.apply(this,arguments)}}(),n.abortController=new AbortController,n._handleModalShow=function(e){e.preventDefault(),document.body.classList.add("bodyDisableScroll"),n.setState({isModalShown:!0,currentImageID:e.target.id})},n._handleModalHide=function(e){e.preventDefault(),document.body.classList.remove("bodyDisableScroll"),n.setState({isModalShown:!1})},n.state={images:[],isModalShown:!1,currentImageID:null},n}return Object(u.a)(a,[{key:"componentDidMount",value:function(){var e=this,t=this.props.urls;this.getImages(t,this.abortController.signal).then((function(t){return e.setState({images:t})})).catch((function(e){"AbortError"!==e.name&&console.error(e)}))}},{key:"componentWillUnmount",value:function(){this.abortController.abort()}},{key:"render",value:function(){var e=this.state,t=e.images,a=e.currentImageID,n=e.isModalShown;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"Gallery",onClick:this._handleModalShow},t.map((function(e){return r.a.createElement("img",{className:"Gallery_image",key:e.id,id:e.id,src:e.url,alt:"img from gallery"})}))),n?r.a.cloneElement(this.props.children,{id:a,_handleModalHide:this._handleModalHide}):null)}}]),a}(r.a.PureComponent)),f=a(6),g=a(11),v=a(3),b=(a(21),function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).getFullImageAndComment=function(){var e=Object(m.a)(s.a.mark((function e(t,a,n){var r,o;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(t,{signal:n});case 3:return r=e.sent,e.next=6,r.json();case 6:return o=e.sent,e.abrupt("return",o);case 10:throw e.prev=10,e.t0=e.catch(0),e.t0;case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t,a,n){return e.apply(this,arguments)}}(),n.postNewCommentToImage=function(){var e=Object(m.a)(s.a.mark((function e(t,a,n){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(a,{method:"POST",body:JSON.stringify(t),headers:{"Content-Type":"application/json"},signal:n});case 3:if(204!==e.sent.status){e.next=8;break}return e.abrupt("return",!0);case 8:throw new Error("BadResponseStatus");case 9:e.next=14;break;case 11:throw e.prev=11,e.t0=e.catch(0),e.t0;case 14:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(t,a,n){return e.apply(this,arguments)}}(),n.abortController=new AbortController,n._handleAddComment=function(){var e=Object(m.a)(s.a.mark((function e(t){var a,r,o,c,l,m,i;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),a=n.state,r=a.currentImageData,o=a.form,c=r.id,l=r.comments,m=n.props.urls,i={name:o.author,comment:o.commentText},n.postNewCommentToImage(i,m.postNewCommentToImage(c),n.abortController.signal).then((function(e){var t={text:o.commentText,id:o.author,date:Date.now()};n.setState({currentImageData:Object(v.a)(Object(v.a)({},r),{},{comments:[].concat(Object(g.a)(l),[t])}),form:{author:"",commentText:""}});var a=n.myRefCommentBlock.current;a.scrollTo(0,a.scrollHeight-a.offsetHeight)})).catch((function(e){"AbortError"!==e.name&&(n.setState({error:"Error: Bad server response. Try later"}),console.error(e))}));case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n._handleChangeInput=function(e){var t=e.target,a=t.name,r=t.value,o=n.state.form;n.setState({form:Object(v.a)(Object(v.a)({},o),{},Object(f.a)({},a,r)),error:""})},n.state={currentImageData:{},form:{author:"",commentText:""},error:""},n.myRefCommentBlock=r.a.createRef(),n}return Object(u.a)(a,[{key:"componentDidMount",value:function(){var e=this,t=this.props,a=t.id,n=t._handleModalHide,r=t.urls;window.addEventListener("keydown",(function e(t){27===t.keyCode&&(window.removeEventListener("keydown",e),n(t))})),this.getFullImageAndComment(r.getFullImageAndComment(a),this.abortController.signal).then((function(t){return e.setState({currentImageData:t})})).catch((function(e){"AbortError"!==e.name&&console.error(e)}))}},{key:"componentWillUnmount",value:function(){this.abortController.abort()}},{key:"_renderFullImage",value:function(){var e=this.state.currentImageData,t=e.id,a=e.url;return r.a.createElement("img",{className:"Modal_LargeImage",id:t,src:a,alt:"Large img"})}},{key:"_renderForm",value:function(){var e=this.state,t=e.form,a=e.error;return r.a.createElement("form",{className:"Modal_FormNewComment",name:"addComment",action:"",method:"",onSubmit:this._handleAddComment},r.a.createElement("input",{className:"Modal_FormNewComment_input",type:"text",name:"author",placeholder:"\u0412\u0430\u0448\u0435 \u0438\u043c\u044f",value:t.author,onChange:this._handleChangeInput,required:!0}),r.a.createElement("input",{className:"Modal_FormNewComment_input",type:"text",name:"commentText",placeholder:"\u0412\u0430\u0448 \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439",value:t.commentText,onChange:this._handleChangeInput,required:!0}),r.a.createElement("input",{className:"Modal_FormNewComment_input Modal_FormNewComment_submit",type:"submit",value:"\u041e\u0441\u0442\u0430\u0432\u0438\u0442\u044c \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439"}),""!==a?r.a.createElement("span",{className:"Modal_FormNewComment_error"},a):null)}},{key:"_renderComments",value:function(){var e=this.state.currentImageData.comments,t=void 0===e?[]:e;return r.a.createElement("section",{className:"Modal_Comments",ref:this.myRefCommentBlock},t.map((function(e){var t=e.id,a=e.text,n=e.date;return r.a.createElement("div",{key:n,id:t,className:"Modal_Comments_commentWrapper"},r.a.createElement("p",{className:"Modal_Comments_p Modal_Comments_date"},new Date(n).toLocaleDateString("ru-RU")),r.a.createElement("p",{className:"Modal_Comments_p"},a))})))}},{key:"render",value:function(){var e=this.props._handleModalHide;return r.a.createElement("div",{id:"ModalWindow",className:"Modal"},r.a.createElement("div",{className:"Modal_contentWrapper"},this._renderFullImage(),this._renderComments(),this._renderForm(),r.a.createElement("a",{href:"",title:"\u0417\u0430\u043a\u0440\u044b\u0442\u044c",className:"Modal_closeButton",onClick:e})),r.a.createElement("a",{href:"",className:"Modal_blurFullWindow",onClick:e}))}}]),a}(r.a.Component)),_={getImages:function(){return"https://boiling-refuge-66454.herokuapp.com/images"},getFullImageAndComment:function(e){return"https://boiling-refuge-66454.herokuapp.com/images/".concat(e)},postNewCommentToImage:function(e){return"https://boiling-refuge-66454.herokuapp.com/images/".concat(e,"/comments")}},w=function(e){return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App_header"},r.a.createElement("h1",{className:"App_header_h1"},"Test APP")),r.a.createElement("main",{className:"App_main"},r.a.createElement(h,{urls:_},r.a.createElement(b,{urls:_}))),r.a.createElement("footer",{className:"App_footer"},r.a.createElement("p",{className:"App_footer_p"},"\xa9 2018-2019")))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(w,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[12,1,2]]]);
//# sourceMappingURL=main.1189db64.chunk.js.map
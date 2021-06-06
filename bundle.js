(()=>{"use strict";window.constants={EMPTY_STRING:"",ONE_HUNDRED:100,MIN_ARRAY_INDEX:0},(()=>{const e="https://21.javascript.pages.academy/kekstagram/data",t="https://21.javascript.pages.academy/kekstagram",n=(n,o,r,s)=>{const c=new XMLHttpRequest;c.responseType="json",c.timeout=1e4,c.addEventListener("load",(()=>((e,t,n)=>{200===e.status?t(e.response):n(`Статус ответа: ${e.status} ${e.statusText}`)})(c,n,o))),c.addEventListener("error",(()=>(e=>e("Произошла ошибка соединения"))(o))),c.addEventListener("timeout",(()=>(e=>e("Запрос не успел выполниться за 10000 мс"))(o)));const i="POST"===r?t:e;c.open(r,i),c.send(s)};window.backend={get:(e,t)=>n(e,t,"GET"),post:(e,t,o)=>n(t,o,"POST",e)}})(),(()=>{const e=document.querySelector("main"),t=document.querySelector("#success").content,n=document.querySelector("#error").content,o=e=>{e.preventDefault(),document.querySelector(".success").remove()},r=e=>{e.preventDefault(),document.querySelector(".error").remove()},s=t=>{const n=e.querySelector(".success"),s=e.querySelector(".error");"Escape"===t.key&&n?o(t):"Escape"===t.key&&s&&r(t)},c=t=>{const n=e.querySelector(".success"),s=e.querySelector(".error");t.target===n?o(t):t.target===s&&r(t)};window.utilForm={showSuccessModal:()=>{(()=>{const n=t.cloneNode(!0);e.appendChild(n)})(),e.querySelector(".success__button").addEventListener("click",o),document.addEventListener("click",c),document.addEventListener("keydown",s)},showErrorModal:()=>{(()=>{const t=n.cloneNode(!0);e.appendChild(t)})(),e.querySelector(".error__button").addEventListener("click",r),document.addEventListener("click",c),document.addEventListener("keydown",s)}}})(),(()=>{let e;window.util={debounce:t=>{e&&window.clearTimeout(e),e=window.setTimeout((()=>{window.gallery.removePictures(),window.gallery.render(t)}),500)},getRandomNumber:(e,t)=>Math.floor(Math.random()*(t-e)+e),createNewElement:(e,t,n)=>{const o=document.createElement(e);return o.classList.add(t),n&&(o.textContent=n),o},cleanContent:e=>{e.innerHTML=window.constants.EMPTY_STRING},showErrorMessage:e=>{const t=document.createElement("div");t.classList.add("modal-error"),t.textContent=e,document.body.insertAdjacentElement("afterbegin",t),setTimeout((()=>{t.remove()}),3e3)}}})(),(()=>{const e=document.querySelector("#picture").content;window.picture={create:t=>{const n=e.cloneNode(!0);return n.querySelector(".picture").dataset.id=t.id,n.querySelector(".picture__img").src=t.url,n.querySelector(".picture__likes").textContent=t.likes,n.querySelector(".picture__comments").textContent=t.comments.length,n}}})(),(()=>{const e=document.querySelector("body"),t=e.querySelector(".big-picture"),n=t.querySelector("#picture-cancel"),o=t.querySelector(".social__comment-count"),r=t.querySelector(".social__comments"),s=t.querySelector(".comments-loader");let c,i=0;const d=e=>{const t=window.util.createNewElement("li","social__comment"),n=window.util.createNewElement("img","social__picture"),o=window.util.createNewElement("p","social__text",e.message);return n.src=e.avatar,n.alt=e.name,t.appendChild(n),t.appendChild(o),t},l=e=>{let n=i;for(i+5<e.length?i+=5:(i=e.length,s.classList.add("hidden")),t.querySelector("#comments-counter").textContent=i;n<i;n++)r.appendChild(d(e[n]))},a=()=>{l(c.comments)},u=()=>{t.classList.add("hidden"),e.classList.remove("modal-open")},m=e=>{const o="Escape"===e.key,r=t.classList.contains("hidden");o&&!r&&(e.preventDefault(),u(),n.removeEventListener("click",u),document.removeEventListener("keydown",m),s.removeEventListener("click",a))};window.bigPicture={show:d=>{c=d,i=0,(c=>{t.classList.remove("hidden"),e.classList.add("modal-open"),o.classList.remove("hidden"),s.classList.remove("hidden"),window.util.cleanContent(r),(e=>{t.querySelector(".big-picture__img img").src=e.url,t.querySelector(".likes-count").textContent=e.likes,t.querySelector(".comments-count").textContent=e.comments.length,t.querySelector(".social__caption").textContent=e.description})(c),l(c.comments),n.addEventListener("click",u),document.addEventListener("keydown",m),s.addEventListener("click",a)})(d)}}})(),(()=>{const e=document.querySelector(".pictures"),t=document.querySelector(".img-filters"),n=t.querySelectorAll(".img-filters__button"),o=t.querySelector("#filter-default"),r=t.querySelector("#filter-random"),s=t.querySelector("#filter-discussed");let c;const i=t=>{const n=document.createDocumentFragment();switch(t){case r:(e=>{let t=[];for(;t.length<10;){const n=window.util.getRandomNumber(window.constants.MIN_ARRAY_INDEX,c.length);let o=c[n];if(!t.includes(o)){t.push(o);const n=window.picture.create(o);e.appendChild(n)}}})(n);break;case s:(e=>{let t=[...c];for(let n=0;n<t.length;n++){t.sort(((e,t)=>t.comments.length-e.comments.length));const o=window.picture.create(t[n]);e.appendChild(o)}})(n);break;default:(e=>{for(let t=0;t<c.length;t++){const n=window.picture.create(c[t]);e.appendChild(n)}})(n)}e.appendChild(n)},d=e=>{e.classList.contains("img-filters__button--active")||((e=>{n.forEach((e=>e.classList.remove("img-filters__button--active"))),e.classList.add("img-filters__button--active")})(e),window.util.debounce(e))},l=()=>d(o),a=()=>d(r),u=()=>d(s),m=e=>{const t=e.target.closest(".picture");if(t){const e=t.dataset.id;window.bigPicture.show(c[e])}};window.gallery={activate:n=>{c=n,(()=>{for(let e=0;e<c.length;e++)c[e].id=e})(),i(),o.addEventListener("click",l),r.addEventListener("click",a),s.addEventListener("click",u),e.addEventListener("click",m),t.classList.remove("img-filters--inactive")},render:i,removePictures:()=>{e.querySelectorAll(".picture").forEach((e=>e.remove()))}}})(),(()=>{const e="none",t="chrome",n="sepia",o="marvin",r="phobos",s="heat",c="none",i="grayscale",d="sepia",l="invert",a="blur",u="brightness",m=document.querySelector(".img-upload__overlay"),w=m.querySelector(".img-upload__preview img"),v=m.querySelector(".effects"),p=m.querySelector(".effect-level"),y=p.querySelector(".effect-level__line"),g=p.querySelector(".effect-level__pin"),_=p.querySelector(".effect-level__depth");let h=c,E=100,L=453;const S=e=>{(e=>{const t=e.type;"click"===t?L=e.offsetX:"mousemove"===t&&(L+=e.movementX)})(e),E=100*L/453,E=E<0?0:E,E=E>100?100:E,g.style.left=`${E}%`,_.style.width=`${E}%`},f=()=>{E=100,g.style.left=`${E}%`,_.style.width=`${E}%`,L=453},q=e=>E*e/window.constants.ONE_HUNDRED,k=()=>{let m,v;switch("none"===h?p.classList.add("hidden"):p.classList.remove("hidden"),h){case e:m=`${c}`;break;case t:m=`${i}(${q(1)})`,v=t;break;case n:m=`${d}(${q(1)})`,v=n;break;case o:m=`${l}(${q(100)}%)`,v=o;break;case r:m=`${a}(${q(3)}px)`,v=r;break;case s:m=`${u}(${q(3)})`,v=s}w.style.filter=m,w.className=window.constants.EMPTY_STRING,v&&w.classList.add(`effects__preview--${v}`)},b=e=>{e.target!==g&&(S(e),k())},N=e=>{f(),h=e.target.value,k()},C=e=>{S(e),k()},$=()=>{document.removeEventListener("mousemove",C),document.removeEventListener("mouseup",$)},D=()=>{document.addEventListener("mousemove",C),document.addEventListener("mouseup",$)};window.filters={addListeners:()=>{g.addEventListener("mousedown",D),y.addEventListener("click",b),v.addEventListener("change",N)},reset:()=>{f(),h=c,document.querySelector("input#effect-none").checked=!0,k()}}})(),(()=>{const e=document.querySelector(".img-upload__overlay"),t=e.querySelector(".img-upload__preview img"),n=e.querySelector(".scale__control--smaller"),o=e.querySelector(".scale__control--bigger"),r=e.querySelector(".scale__control--value");let s=100;const c=()=>{r.value=`${s}%`,t.style.transform=`scale(${s/window.constants.ONE_HUNDRED})`},i=()=>{s<100&&(s+=25,c())},d=()=>{s>25&&(s-=25,c())};window.zoom={addListeners:()=>{o.addEventListener("click",i),n.addEventListener("click",d)},reset:()=>{s=100,c()}}})(),(()=>{const e=/^#[\w\d]{1,19}(\s|$)/,t="",n="Хэштег начинается с # и длинной не больше 19 символов",o="Хэштегов должно быть не больше 5",r=document.querySelector(".img-upload__form").querySelector(".text__hashtags");let s;const c=()=>{r.setCustomValidity(t),r.reportValidity()};window.hashtag={checkHashtag:()=>{let c,i=r.value.trim().split(" ");return r.value.trim()===window.constants.EMPTY_STRING?c=!0:i.length>5?s=o:c=(o=>{let r;return r=o.every((t=>e.test(t))),s=r?t:n,r})(i),c},addListeners:()=>{r.addEventListener("input",c)},showErrorMessage:()=>{r.setCustomValidity(s),r.reportValidity()}}})(),(()=>{const e=["gif","jpg","jpeg","png"],t=document.querySelector(".img-upload__start input[type=file]"),n=document.querySelector(".img-upload__preview img"),o=document.querySelectorAll(".effects__preview"),r=new FileReader,s=()=>{n.src=r.result,o.forEach((e=>{e.style.backgroundImage=`url(${r.result})`}))},c=()=>{const n=t.files[0],o=n.name.toLowerCase();e.some((e=>o.endsWith(e)))&&(r.addEventListener("load",s),r.readAsDataURL(n))};window.preview={addListener:()=>{t.addEventListener("change",c)}}})(),(()=>{const e=document.querySelector("body"),t=e.querySelector("#upload-select-image"),n=t.querySelector("#upload-file"),o=t.querySelector(".img-upload__overlay"),r=o.querySelector("#upload-cancel"),s=o.querySelector(".effect-level"),c=o.querySelector(".text__hashtags"),i=o.querySelector(".text__description"),d=e=>{const t="Escape"===e.key,n=c!==document.activeElement,o=i!==document.activeElement;t&&n&&o&&(e.preventDefault(),m())},l=e=>{e.preventDefault(),m()},a=e=>{e.preventDefault(),u()},u=()=>{w(),o.classList.remove("hidden"),e.classList.add("modal-open"),s.classList.add("hidden")},m=()=>{v(),o.classList.add("hidden"),e.classList.remove("modal-open"),window.filters.reset(),window.zoom.reset(),t.reset()},w=()=>{document.addEventListener("keydown",d),r.addEventListener("click",l)},v=()=>{document.removeEventListener("keydown",d),r.removeEventListener("click",l)},p=()=>{m(),window.utilForm.showSuccessModal()},y=()=>{m(),window.utilForm.showErrorModal()},g=e=>{e.preventDefault(),window.hashtag.checkHashtag()?window.backend.post(new FormData(t),p,y):window.hashtag.showErrorMessage()};window.form={activate:()=>{window.filters.addListeners(),window.zoom.addListeners(),window.hashtag.addListeners(),t.addEventListener("submit",g),n.addEventListener("change",a),window.preview.addListener()}}})(),(()=>{const e=window.gallery.activate,t=window.util.showErrorMessage;window.backend.get(e,t),window.form.activate()})()})();
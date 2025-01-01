(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/cohort-mag-4",headers:{authorization:"4d40a18a-d836-408e-9d5d-fa5f27bdb130","Content-Type":"application/json"}},t=function(e){return e.ok?e.json():Promise.reject("При выполнении запроса произошла ошибка: ".concat(e.status))},n=document.querySelector("#card-template").content.querySelector(".card"),r=function(e,t,r){var o=t.onDelete,c=t.onLike,a=t.onImageClick,u=n.cloneNode(!0),i=u.querySelector(".card__title"),l=u.querySelector(".card__image"),s=u.querySelector(".card__delete-button"),d=u.querySelector(".card__like-button"),p=u.querySelector(".card__like-counter");return i.textContent=e.name,p.textContent=e.likes.length,l.src=e.link,l.alt=e.name,e.owner._id===r?s.addEventListener("click",(function(){return o(u,e._id)})):s.remove(),d.addEventListener("click",(function(){return c(d,p,e._id)})),l.addEventListener("click",(function(){return a({src:e.link,alt:e.name,caption:e.name})})),e.likes.some((function(e){return e._id===r}))&&d.classList.add("card__like-button_is-active"),u},o=function(n,r,o){var c=n.classList.contains("card__like-button_is-active");(function(n,r){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:r?"DELETE":"PUT",headers:e.headers}).then(t)})(o,c).then((function(e){n.classList.toggle("card__like-button_is-active"),r.textContent=e.likes.length})).catch((function(e){return console.log("Не удалось изменить состояние лайка карточки ".concat(o,". ").concat(e))}))},c=function(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&i(t)}},a=function(e){e.target===e.currentTarget&&i(e.currentTarget)},u=function(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",c)},i=function(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",c)},l=function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));r.textContent="",r.classList.remove(n.errorClass),t.classList.remove(n.inputErrorClass)},s=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))},d=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){l(e,n,t)})),s(n,r,t)};function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var f=null,_=null,m=null,y={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"},v=document.querySelector(".places__list"),h=document.querySelector(".popup_type_edit"),S=document.querySelector(".popup_type_new-card"),b=document.querySelector(".popup_type_image"),q=document.querySelector(".popup_type_avatar"),g=document.querySelector(".popup_type_confirm"),C=[h,S,b,q,g],k=b.querySelector(".popup__image"),E=b.querySelector(".popup__caption"),L=document.querySelector(".profile__edit-button"),x=document.querySelector(".profile__add-button"),A=document.querySelector(".profile__image"),T=h.querySelector('.popup__form[name="edit-profile"]'),U=T.querySelector(".popup__input_type_name"),w=T.querySelector(".popup__input_type_description"),D=document.querySelector(".profile__title"),I=document.querySelector(".profile__description"),j=document.querySelector(".profile__image"),O=S.querySelector('.popup__form[name="new-place"]'),B=O.querySelector(".popup__input_type_card-name"),P=O.querySelector(".popup__input_type_url"),M=q.querySelector('.popup__form[name="edit-avatar"]'),N=M.querySelector(".popup__input_type_url"),J=g.querySelector('.popup__form[name="confirm"]'),H=function(e){k.src=e.src,k.alt=e.alt,E.textContent=e.caption,u(b)},V=function(e,t){_=e,m=t,u(g)},z=function(e,t){var n=e.querySelector(".popup__button");t?(n.dataset.originalText=n.textContent,n.textContent="Сохранение..."):(n.textContent=n.dataset.originalText,delete n.dataset.originalText)};T.addEventListener("submit",(function(n){var r;n.preventDefault(),z(h,!0),(r={name:U.value,about:w.value},fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify(r)}).then(t)).then((function(e){D.textContent=e.name,I.textContent=e.about})).catch((function(e){return console.log("Не удалось обновить профиль. ".concat(e))})).finally((function(){z(h,!1),i(h)}))})),O.addEventListener("submit",(function(n){var c;n.preventDefault(),z(S,!0),(c={name:B.value,link:P.value},fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify(c)}).then(t)).then((function(e){var t=r(e,{onDelete:V,onLike:o,onImageClick:H},f);v.prepend(t)})).catch((function(e){return console.error("Не удалось добавить карточку. ".concat(e))})).finally((function(){z(S,!1),i(S)}))})),M.addEventListener("submit",(function(n){var r;n.preventDefault(),z(q,!0),(r={avatar:N.value},fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify(r)}).then(t)).then((function(e){j.style.backgroundImage="url(".concat(e.avatar,")")})).catch((function(e){return console.log("Не удалось обновить аватар. ".concat(e))})).finally((function(){z(q,!1),i(q)}))})),J.addEventListener("submit",(function(n){var r,o;n.preventDefault(),r=_,function(n){return fetch("".concat(e.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:e.headers}).then(t)}(o=m).then((function(){return r.remove()})).catch((function(e){return console.log("Не удалось удалить карточку ".concat(o,". ").concat(e))})),i(g),_=null,m=null})),L.addEventListener("click",(function(){U.value=D.textContent,w.value=I.textContent,d(T,y),u(h)})),x.addEventListener("click",(function(){O.reset(),d(O,y),u(S)})),A.addEventListener("click",(function(){M.reset(),d(M,y),u(q)})),C.forEach((function(e){var t=e.querySelector(".popup__close");t&&t.addEventListener("click",(function(){return i(e)})),e.addEventListener("mousedown",a)})),Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then(t),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then(t)]).then((function(e){var t,n,c=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(u.push(r.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(t,n)||function(e,t){if(e){if("string"==typeof e)return p(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?p(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=c[0],u=c[1];f=a._id,D.textContent=a.name,I.textContent=a.about,j.style.backgroundImage="url(".concat(a.avatar,")"),u.forEach((function(e){var t=r(e,{onDelete:V,onLike:o,onImageClick:H},f);v.append(t)}))})).catch((function(e){return console.log("Не удалось обновить данные с сервера. ".concat(e))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);s(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?l(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));o.textContent=n,o.classList.add(r.errorClass),t.classList.add(r.inputErrorClass)}(e,t,t.validationMessage,n)}(e,o,t),s(n,r,t)}))}))}(t,e)}))}(y)})();
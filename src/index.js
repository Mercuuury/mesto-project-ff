import "./pages/index.css";

// Функции для работы с карточками
import { createCard, deleteCard, toggleLike } from "./components/card.js";
// Функции для работы с попапами (модальными окнами)
import {
  openPopup,
  closePopup,
  handleOverlayClick,
} from "./components/modal.js";
// Функции для работы с валидацией форм
import { clearValidation, enableValidation } from "./components/validation.js";
// Функции для работы с API
import {
  getUser,
  getCards,
  createCardOnServer,
  patchUser,
  patchUserAvatar,
} from "./components/api.js";

let userId = null; // Идентификатор пользователя
let cardElementToDelete = null; // Карточка, которую собираются удалить
let cardIdToDelete = null; // ID карточки, которую собираются удалить

// ------------------------------------------------------
// ------------------- Конфигурация ---------------------
// ------------------------------------------------------

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

// ------------------------------------------------------
// --------------------- DOM узлы -----------------------
// ------------------------------------------------------

// Контейнер для вставки карточек
const placesList = document.querySelector(".places__list");

// Попапы и их элементы
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupAddCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const popupEditAvatar = document.querySelector(".popup_type_avatar");
const popupConfirm = document.querySelector(".popup_type_confirm");

const popups = [
  popupEditProfile,
  popupAddCard,
  popupImage,
  popupEditAvatar,
  popupConfirm,
]; // || document.querySelectorAll('.popup')

const popupImageElement = popupImage.querySelector(".popup__image"); // Изображение <img> внутри попапа
const popupCaptionElement = popupImage.querySelector(".popup__caption");

// Кнопки для вызова попапов
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");
const buttonEditAvatar = document.querySelector(".profile__image");

// Форма редактирования профиля
const formEditProfile = popupEditProfile.querySelector(
  '.popup__form[name="edit-profile"]'
);
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const descriptionInput = formEditProfile.querySelector(
  ".popup__input_type_description"
);

// Данные профиля
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");

// Форма для добавления новых карточек
const formAddCard = popupAddCard.querySelector(
  '.popup__form[name="new-place"]'
);
const cardNameInput = formAddCard.querySelector(".popup__input_type_card-name");
const cardLinkInput = formAddCard.querySelector(".popup__input_type_url");

// Форма редактирования аватара
const formEditAvatar = popupEditAvatar.querySelector(
  '.popup__form[name="edit-avatar"]'
);
const avatarLinkInput = formEditAvatar.querySelector(".popup__input_type_url");

// Форма подтверждения
const formConfirm = popupConfirm.querySelector('.popup__form[name="confirm"]');

// ------------------------------------------------------
// ------------ Функции для работы с формами ------------
// ------------------------------------------------------

// Отправка формы редактирования профиля
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  setFormButtonLoader(popupEditProfile, true);

  // 1. Отправляем запрос на обновление профиля
  patchUser({
    name: nameInput.value,
    about: descriptionInput.value,
  })
    .then((userData) => {
      // 2. Обновляем значения элементов на странице
      profileName.textContent = userData.name;
      profileDescription.textContent = userData.about;
    })
    .catch((err) => console.log(`Не удалось обновить профиль. ${err}`))
    .finally(() => {
      // 3. Закрываем попап и сбрасываем форму
      setFormButtonLoader(popupEditProfile, false);
      closePopup(popupEditProfile);
    });
};

// Отправка формы добавления карточки
const handleAddCardFormSubmit = (evt) => {
  evt.preventDefault();
  setFormButtonLoader(popupAddCard, true);

  // 1. Отправляем запрос для создания карточки на сервере
  createCardOnServer({
    name: cardNameInput.value,
    link: cardLinkInput.value,
  })
    .then((card) => {
      // 2. Создаем карточку из темплейта
      const newCard = createCard(
        card,
        {
          onDelete: openConfirmPopup,
          onLike: toggleLike,
          onImageClick: openImagePopup,
        },
        userId
      );
      // 3. Добавляем карточку в начало списка
      placesList.prepend(newCard);
    })
    .catch((err) => console.error(`Не удалось добавить карточку. ${err}`))
    .finally(() => {
      // 4. Закрываем попап и сбрасываем форму
      setFormButtonLoader(popupAddCard, false);
      closePopup(popupAddCard);
    });
};

// Отправка формы редактирования аватара
const handleAvatarFormSubmit = (evt) => {
  evt.preventDefault();
  setFormButtonLoader(popupEditAvatar, true);

  // 1. Отправляем запрос на обновление профиля
  patchUserAvatar({
    avatar: avatarLinkInput.value,
  })
    .then((avatar) => {
      // 2. Обновляем URL аватара на странице
      profileAvatar.style.backgroundImage = `url(${avatar.avatar})`;
    })
    .catch((err) => console.log(`Не удалось обновить аватар. ${err}`))
    .finally(() => {
      // 3. Закрываем попап и сбрасываем форму
      setFormButtonLoader(popupEditAvatar, false);
      closePopup(popupEditAvatar);
    });
};

// Отправка формы подтверждения удаления карточки
const handleConfirmFormSubmit = (evt) => {
  evt.preventDefault();

  deleteCard(cardElementToDelete, cardIdToDelete);
  closePopup(popupConfirm);

  cardElementToDelete = null;
  cardIdToDelete = null;
};

// ------------------------------------------------------
// ------------------- Прочие функции  ------------------
// ------------------------------------------------------

// Функция для открытия попапа с изображением
const openImagePopup = (cardContent) => {
  popupImageElement.src = cardContent.src;
  popupImageElement.alt = cardContent.alt;
  popupCaptionElement.textContent = cardContent.caption;

  openPopup(popupImage);
};

// Функция для отрытия попапа подтверждения удаления карточки
const openConfirmPopup = (cardElement, cardId) => {
  cardElementToDelete = cardElement;
  cardIdToDelete = cardId;

  openPopup(popupConfirm);
};

// Функция для вывода карточек на страницу
const renderCards = (cards) => {
  cards.forEach((card) => {
    const newCard = createCard(
      card,
      {
        onDelete: openConfirmPopup,
        onLike: toggleLike,
        onImageClick: openImagePopup,
      },
      userId
    );
    placesList.append(newCard);
  });
};

// Функция для смены индикатора загрузки на кнопке
const setFormButtonLoader = (formElement, isLoading) => {
  const buttonElement = formElement.querySelector(".popup__button");

  if (isLoading) {
    buttonElement.dataset.originalText = buttonElement.textContent;
    buttonElement.textContent = "Сохранение...";
  } else {
    buttonElement.textContent = buttonElement.dataset.originalText;
    delete buttonElement.dataset.originalText;
  }
};

// ------------------------------------------------------
// ----------- Установка обработчиков событий  ----------
// ------------------------------------------------------

// Добавление обработчиков форм
formEditProfile.addEventListener("submit", handleProfileFormSubmit);
formAddCard.addEventListener("submit", handleAddCardFormSubmit);
formEditAvatar.addEventListener("submit", handleAvatarFormSubmit);
formConfirm.addEventListener("submit", handleConfirmFormSubmit);

// Обработчик кнопки редактирования профиля
buttonEditProfile.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;

  clearValidation(formEditProfile, validationConfig);
  openPopup(popupEditProfile);
});

// Обработчик кнопки добавления карточки
buttonAddCard.addEventListener("click", () => {
  formAddCard.reset();

  clearValidation(formAddCard, validationConfig);
  openPopup(popupAddCard);
});

// Обработчик кнопки редактирования аватара
buttonEditAvatar.addEventListener("click", () => {
  formEditAvatar.reset();

  clearValidation(formEditAvatar, validationConfig);
  openPopup(popupEditAvatar);
});

// Обработчики событий попапов
popups.forEach((popupElement) => {
  const closeButton = popupElement.querySelector(".popup__close");

  if (closeButton) {
    closeButton.addEventListener("click", () => closePopup(popupElement));
  }

  popupElement.addEventListener("mousedown", handleOverlayClick);
});

// Загрузка изначальных данных
Promise.all([getUser(), getCards()])
  .then(([userData, initialCards]) => {
    // Сохранение идентификатора пользователя
    userId = userData._id;

    // Обновление данных профиля
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;

    // Вывод начальных карточек
    renderCards(initialCards);
  })
  .catch((err) => console.log(`Не удалось обновить данные с сервера. ${err}`));

// Включение валидации форм
enableValidation(validationConfig);

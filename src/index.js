import "./pages/index.css";

import { initialCards } from "./components/cards.js";

import { createCard, deleteCard, toggleLike } from "./components/card.js";
import {
  openPopup,
  closePopup,
  handleOverlayClick,
} from "./components/modal.js";
import { clearValidation, enableValidation } from "./components/validation.js";

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

const popups = [popupEditProfile, popupAddCard, popupImage]; // || document.querySelectorAll('.popup')

const popupImageElement = popupImage.querySelector(".popup__image"); // Изображение <img> внутри попапа
const popupCaptionElement = popupImage.querySelector(".popup__caption");

// Кнопки попапов
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");

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

// Форма для добавления новых карточек
const formAddCard = popupAddCard.querySelector(
  '.popup__form[name="new-place"]'
);
const cardNameInput = formAddCard.querySelector(".popup__input_type_card-name");
const cardLinkInput = formAddCard.querySelector(".popup__input_type_url");

// ------------------------------------------------------
// ------------ Функции для работы с формами ------------
// ------------------------------------------------------

// Отправка формы редактирования профиля
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();

  // Обновляем значения элементов на странице
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  closePopup(popupEditProfile);
};

// Отправка формы добавления карточки
const handleAddCardFormSubmit = (evt) => {
  evt.preventDefault();

  // 1. Создаем новую карточку
  const newCard = createCard(
    {
      name: cardNameInput.value,
      link: cardLinkInput.value,
    },
    {
      onDelete: deleteCard,
      onLike: toggleLike,
      onImageClick: openImagePopup,
    }
  );

  // 2. Добавляем карточку в начало списка
  placesList.prepend(newCard);

  // 3. Закрываем попап и сбрасываем форму
  closePopup(popupAddCard);
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

// Функция для вывода карточек на страницу
const renderCards = (cards) => {
  cards.forEach((card) => {
    const newCard = createCard(
      {
        name: card.name,
        link: card.link,
      },
      {
        onDelete: deleteCard,
        onLike: toggleLike,
        onImageClick: openImagePopup,
      }
    );
    placesList.append(newCard);
  });
};

// ------------------------------------------------------
// ----------- Установка обработчиков событий  ----------
// ------------------------------------------------------

// Добавление обработчиков форм
formEditProfile.addEventListener("submit", handleProfileFormSubmit);
formAddCard.addEventListener("submit", handleAddCardFormSubmit);

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

// Обработчики событий попапов
popups.forEach((popupElement) => {
  const closeButton = popupElement.querySelector(".popup__close");

  if (closeButton) {
    closeButton.addEventListener("click", () => closePopup(popupElement));
  }

  popupElement.addEventListener("mousedown", handleOverlayClick);
});

// Вывод начальных карточек
renderCards(initialCards);

// Включение валидации форм
enableValidation(validationConfig);

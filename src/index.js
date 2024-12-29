import "./pages/index.css";

import { initialCards } from "./scripts/cards.js";

// Темплейт карточки
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

// DOM узлы
const placesList = document.querySelector(".places__list"); // Контейнер для вставки карточек

// Функция создания карточки
function createCard(cardContent, onDelete) {
  // 1. Клонируем темплейт
  const cardElement = cardTemplate.cloneNode(true);

  // 2. Выбираем нужные элементы внутри карточки
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  // 3. Заполняем карточку данными
  cardTitle.textContent = cardContent.name;
  cardImage.src = cardContent.link;
  cardImage.alt = cardContent.name;

  // 4. Вешаем обработчик для удаления карточки
  deleteButton.addEventListener("click", () => {
    onDelete(cardElement);
  });

  return cardElement;
}

// Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// Вывести карточки на страницу
initialCards.forEach((item) => {
  const newCard = createCard(item, deleteCard);
  placesList.append(newCard);
});

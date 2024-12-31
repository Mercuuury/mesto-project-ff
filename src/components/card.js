import { deleteCardFromServer, setLike } from "./api.js";

// Темплейт карточки
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

export const createCard = (
  cardContent,
  { onDelete, onLike, onImageClick },
  userId
) => {
  // 1. Клонируем темплейт
  const cardElement = cardTemplate.cloneNode(true);

  // 2. Выбираем нужные элементы внутри карточки
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardLikeCounter = cardElement.querySelector(".card__like-counter");

  // 3. Заполняем карточку данными
  cardTitle.textContent = cardContent.name;
  cardLikeCounter.textContent = cardContent.likes.length;
  cardImage.src = cardContent.link;
  cardImage.alt = cardContent.name;

  // 4. Вешаем обработчик для удаления карточки
  if (cardContent.owner._id === userId) {
    cardDeleteButton.addEventListener("click", () =>
      onDelete(cardElement, cardContent._id)
    );
  } else {
    cardDeleteButton.remove();
  }

  // 5. Вешаем обработчик для переключения лайка
  cardLikeButton.addEventListener("click", () =>
    onLike(cardLikeButton, cardLikeCounter, cardContent._id)
  );

  // 6. Вешаем обработчик нажатия на изображения
  cardImage.addEventListener("click", () =>
    onImageClick({
      src: cardContent.link,
      alt: cardContent.name,
      caption: cardContent.name,
    })
  );

  // 7. Обновляем состояние лайка
  if (cardContent.likes.some((like) => like._id === userId)) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  return cardElement;
};

// Функция удаления карточки
export const deleteCard = (cardElement, cardId) => {
  deleteCardFromServer(cardId)
    .then(() => cardElement.remove())
    .catch((err) =>
      console.log(`Не удалось удалить карточку ${cardId}. ${err}`)
    );
};

// Функция переключения кнопки лайка
export const toggleLike = (likeButtonElement, likeCounterElement, cardId) => {
  const isLiked = likeButtonElement.classList.contains(
    "card__like-button_is-active"
  );

  setLike(cardId, isLiked)
    .then((updatedCard) => {
      likeButtonElement.classList.toggle("card__like-button_is-active");
      likeCounterElement.textContent = updatedCard.likes.length;
    })
    .catch((err) =>
      console.log(
        `Не удалось изменить состояние лайка карточки ${cardId}. ${err}`
      )
    );
};

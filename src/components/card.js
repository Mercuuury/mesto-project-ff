// Темплейт карточки
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

export const createCard = (cardContent, { onDelete, onLike, onImageClick }) => {
  // 1. Клонируем темплейт
  const cardElement = cardTemplate.cloneNode(true);

  // 2. Выбираем нужные элементы внутри карточки
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");

  // 3. Заполняем карточку данными
  cardTitle.textContent = cardContent.name;
  cardImage.src = cardContent.link;
  cardImage.alt = cardContent.name;

  // 4. Вешаем обработчик для удаления карточки
  cardDeleteButton.addEventListener("click", () => onDelete(cardElement));

  // 5. Вешаем обработчик для переключения лайка
  cardLikeButton.addEventListener("click", () => onLike(cardLikeButton));

  // 6. Вешаем обработчик нажатия на изображения
  cardImage.addEventListener("click", () =>
    onImageClick({
      src: cardContent.link,
      alt: cardContent.name,
      caption: cardContent.name,
    })
  );

  return cardElement;
};

// Функция удаления карточки
export const deleteCard = (cardElement) => {
  cardElement.remove();
};

// Функция переключения кнопки лайка
export const toggleLike = (likeButtonElement) => {
  likeButtonElement.classList.toggle("card__like-button_is-active");
};

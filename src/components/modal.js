// Функция для закрытия модального окна c клавиатуры
const handleCloseByKeyboard = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");

    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
};

// Функция для закрытия по клику на оверлей
const handleOverlayClick = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
};

// Функция для открытия попапа
export const openPopup = (popupElement) => {
  popupElement.classList.add("popup_is-opened");

  document.addEventListener("keydown", handleCloseByKeyboard);
  popupElement.addEventListener("mousedown", handleOverlayClick);

  const popupCloseButtonElement = popupElement.querySelector(".popup__close");
  popupCloseButtonElement.addEventListener("click", () =>
    closePopup(popupElement)
  );
};

// Функция для закрытия попапа
export const closePopup = (popupElement) => {
  popupElement.classList.remove("popup_is-opened");

  document.removeEventListener("keydown", handleCloseByKeyboard);
  popupElement.removeEventListener("mousedown", handleOverlayClick);
};

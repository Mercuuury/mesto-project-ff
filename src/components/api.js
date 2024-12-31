const apiConfig = {
  baseUrl: "https://nomoreparties.co/v1/cohort-mag-4",
  headers: {
    authorization: "4d40a18a-d836-408e-9d5d-fa5f27bdb130",
    "Content-Type": "application/json",
  },
};

// Функция для обработки ответа API
const processResponse = (res) => {
  return res.ok
    ? res.json()
    : Promise.reject(`При выполнении запроса произошла ошибка: ${res.status}`);
};

// Функция для получения информации об авторизованном пользователе
export const getUser = () => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    headers: apiConfig.headers,
  }).then(processResponse);
};

// Функция для обновления информации о профиле пользователя
export const patchUser = (userData) => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify(userData),
  }).then(processResponse);
};

// Функция для обновления аватара пользователя
export const patchUserAvatar = (avatar) => {
  return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify(avatar),
  }).then(processResponse);
};

// Функция для получения карточек мест
export const getCards = () => {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    headers: apiConfig.headers,
  }).then(processResponse);
};

// Функция для отправки новой карточки на сервер
export const createCardOnServer = (cardData) => {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify(cardData),
  }).then(processResponse);
};

// Функция для удаления карточки с сервера
export const deleteCardFromServer = (cardId) => {
  return fetch(`${apiConfig.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  }).then(processResponse);
};

// Функция для обновления состояния лайка карточки
export const setLike = (cardId, isLiked) => {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: isLiked ? "DELETE" : "PUT",
    headers: apiConfig.headers,
  }).then(processResponse);
};

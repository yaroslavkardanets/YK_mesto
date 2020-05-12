// переменные profile
const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');

// переменные popup профиля
const popup = document.querySelector('.popup');
const formElement = document.querySelector('.popup__container');
const closeButton = document.querySelector('.popup__close-button');
const nameInput = document.querySelector('.popup__input_name');
const jobInput = document.querySelector('.popup__input_occupation');

// переменные popup карточки
const popupCards = document.querySelector('.popup_cards');
const cardsElement = document.querySelector('.popup__container_cards');
const closeButtonCards = document.querySelector('.popup__close-button_cards');
const placeInput = document.querySelector('.popup__input_cards_place');
const imageInput = document.querySelector('.popup__input_cards_image');

// переменные элементы карточек
const elements = document.querySelector('.elements');

// переменные popup просмотра фотографии
const popupImage = document.querySelector('.popup_image');
const closeImage = document.querySelector('.popup__close-button-image');
const previewImage = document.querySelector('.popup__preview');
const titleImage = document.querySelector('.popup__title-image');

// Открываем титульный popup профиля и присваиваиваем значения полям
function openPopup () {
  popup.classList.add('popup-opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileOccupation.textContent;
}

// Закрываем popup
function closePopup () {
  popup.classList.remove('popup-opened');
  popupCards.classList.remove('popup-opened');
  popupImage.classList.remove('popup-opened');
}

// Обработка титульного popup для отправки на сервер
function formSubmitHandler (evt) {
  evt.preventDefault(); 
  profileTitle.textContent = nameInput.value;
  profileOccupation.textContent = jobInput.value;
  closePopup();
}

// массив карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Собираем карточку
function cardItem (name, link) {
  const cardElement = document.querySelector('#card-element').content;
  const element = cardElement.cloneNode(true);
  element.querySelector('.element__title').textContent = name;
  element.querySelector('.element__image').src = link; 
  // активируем like
  element.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });
  // Удаляем карточку
  element.querySelector('.element__trash').addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  });
  // Просмотр фотографии
  element.querySelector('.element__image').addEventListener('click', function (evt) {
    previewImage.setAttribute('src', evt.target.src);
    titleImage.textContent = name;
    openPopupImage();
  });
  return element;
}

// Создаем массив карточек
function readyCards (ready) {
  ready.forEach(function (item) {
    elements.append(cardItem (item.name, item.link));
  })
}
readyCards(initialCards);

// Открываем фото
function openPopupImage () {
  popupImage.classList.add('popup-opened');
}

// Открываем попап создания карточки
function openPopupCards () {
  popupCards.classList.add('popup-opened');
  placeInput.value = '';
  imageInput.value = '';
}

// Добавляем карточки
function cardSubmitHandler (evt) {
  evt.preventDefault();
  elements.prepend(cardItem (placeInput.value, imageInput.value));
  placeInput.value = '';
  imageInput.value = '';
  closePopup();
}

// слушатели
cardsElement.addEventListener('submit', cardSubmitHandler);
editButton.addEventListener('click', openPopup);
addCardButton.addEventListener('click', openPopupCards);
closeButton.addEventListener('click', closePopup);
closeButtonCards.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
closeImage.addEventListener('click', closePopup);


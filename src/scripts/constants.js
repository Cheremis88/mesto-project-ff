const profileButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_edit');
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__description');
const profilePhoto = document.querySelector('.profile__image');
const profileForm = document.forms['edit-profile'];
const profileFormName = profileForm.elements.name;
const profileFormAbout = profileForm.elements.description;
const avatarPopup = document.querySelector('.popup_type_avatar');
const avatarForm = document.forms['edit-avatar'];
const avatarFormLink = avatarForm.elements.link;

const newCardButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardForm = document.forms['new-place'];
const newCardFormName = newCardForm.elements['place-name'];
const newCardFormLink = newCardForm.elements.link;
const deleteCardPopup = document.querySelector('.popup_type_delete-card');
const deleteCardForm = document.forms['delete-card'];

const imagePopup = document.querySelector('.popup_type_image');
const imageFull = document.querySelector('.popup__image');
const imageCaption = document.querySelector('.popup__caption');

const popups = document.querySelectorAll('.popup');
const cardList = document.querySelector('.places__list');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const requestConfig = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-2/',
  headers: {
    authorization: '1c72ad99-3ee9-41c8-bf1b-bf3b0845e8c9',
    'Content-Type': 'application/json'
  }
}

export {
  profileButton, profilePopup, profileName, profileAbout, profilePhoto,
  profileForm, profileFormName, profileFormAbout, newCardButton, newCardPopup,
  newCardForm, newCardFormName, newCardFormLink, imagePopup, imageFull,
  imageCaption, popups, cardList, validationConfig, requestConfig, avatarPopup,
  avatarForm, avatarFormLink, deleteCardPopup, deleteCardForm
};
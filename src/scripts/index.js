import '../pages/index.css';
import { openModal, closeModal, closeModalEsc, handleCheckClickModal } from './modal.js';
import { createCard, handleLikeCard, handleDeleteCard } from './card.js';
import { enableValidation, clearValidation } from './validation.js';

const profileButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_edit');
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__description');
const profilePhoto = document.querySelector('.profile__image');
const profileForm = document.forms['edit-profile'];
const profileFormName = profileForm.elements.name;
const profileFormAbout = profileForm.elements.description;

const newCardButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardForm = document.forms['new-place'];
const newCardFormName = newCardForm.elements['place-name'];
const newCardFormLink = newCardForm.elements.link;

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

function handlePrepareProfile() {
  clearValidation(profileForm, validationConfig);
  profileFormName.value = profileName.textContent;
  profileFormAbout.value = profileAbout.textContent;
  openModal(profilePopup);
}

/* function handleEditProfile(evt) {
  evt.preventDefault();
  profileName.textContent = profileFormName.value;
  profileAbout.textContent = profileFormAbout.value;
  closeModal(profilePopup);
} */

function handlePrepareCard() {
  clearValidation(newCardForm, validationConfig);
  newCardForm.reset();
  openModal(newCardPopup);
}

/* function handleAddNewCard(evt) {
  evt.preventDefault();
  const newCard = {
    name: newCardFormName.value,
    link: newCardFormLink.value,
    alt: newCardFormName.value
  };
  cardList.prepend(createCard(newCard, handleDeleteCard, handleOpenImage, handleLikeCard));
  closeModal(newCardPopup);
} */

function handleOpenImage(imageData) {
  imageFull.src = imageData.link;
  imageFull.alt = imageData.alt;
  imageCaption.textContent = imageData.name;
  openModal(imagePopup);
}

profileButton.addEventListener('click', handlePrepareProfile);
profileForm.addEventListener('submit', patchProfile);
newCardButton.addEventListener('click', handlePrepareCard);
newCardForm.addEventListener('submit', postCard);

popups.forEach(popup => {
  popup.addEventListener('click', handleCheckClickModal);
})

enableValidation(validationConfig);

 

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-2',
  headers: {
    authorization: '1c72ad99-3ee9-41c8-bf1b-bf3b0845e8c9',
    'Content-Type': 'application/json'
  }
}


function getProfile() {
  return fetch(config.baseUrl + '/users/me', {
    method: 'GET',
    headers: config.headers
  })
    .then(checkResponse);
}

function getCards() {
  return fetch(config.baseUrl + '/cards', {
    method: 'GET',
    headers: config.headers
  })
    .then(checkResponse);
}

function patchProfile(evt) {
  evt.preventDefault();

  fetch(config.baseUrl + '/users/me', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: profileFormName.value,
      about: profileFormAbout.value
    })
  })
    .then(checkResponse)
    .then(profile => {
      profileName.textContent = profile.name;
      profileAbout.textContent = profile.about;
    })
    .catch(err => console.log(err))
    .finally(() => closeModal(profilePopup));
}

function postCard(evt) {
  evt.preventDefault();

  fetch(config.baseUrl + '/cards', {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: newCardFormName.value,
      link: newCardFormLink.value
    })
  })
    .then(checkResponse)
    .then(newCard => {
      cardList.prepend(createCard(newCard, newCard.owner._id, handleDeleteCard, handleOpenImage, handleLikeCard));
    })
    .catch(err => console.log(err))
    .finally(() => closeModal(newCardPopup));
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject('Ошибка ' + res.status);
}



Promise.all([getProfile(), getCards()])
  .then(results => {
    const [profile, cards] = results;
    const {name, about, avatar, _id} = profile;
    profileName.textContent = name;
    profileAbout.textContent = about;
    profilePhoto.style.backgroundImage = `url(${avatar})`;
    
    cards.forEach(card => {
      cardList.append(createCard(card, _id, handleDeleteCard, handleOpenImage, handleLikeCard));
    });
  })
  .catch(err => console.log(err));


/* fetch(config.baseUrl + '/users', {
    method: 'GET',
    headers: config.headers
  })
    .then(checkResponse)
    .then(res => {
      let xx = res.filter(user => user.name !== 'Jacques Cousteau' || user.about !== 'Sailor, researcher')
      let yy = xx.map(item => new Object({name: item.name, about: item.about}))
      console.log(yy)
    }) */
import '../pages/index.css';
import { initialCards } from './cards.js';
import { openModal, closeModal, closeModalEsc } from './modal.js';
import { createCard, handleLikeCard, handleDeleteCard } from './card.js';


const profileButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_edit');
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__description');
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


function handlePrepareProfile() {
  profileFormName.value = profileName.textContent;
  profileFormAbout.value = profileAbout.textContent;
  openModal(profilePopup);
}

function handleEditProfile(evt) {
  evt.preventDefault();
  profileName.textContent = profileFormName.value;
  profileAbout.textContent = profileFormAbout.value;
  closeModal(profilePopup);
}

function handlePrepareCard() {
  newCardForm.reset();
  openModal(newCardPopup);
}

function handleAddNewCard(evt) {
  evt.preventDefault();
  const newCard = {
    name: newCardFormName.value,
    link: newCardFormLink.value,
    alt: newCardFormName.value
  };
  cardList.prepend(createCard(newCard, handleDeleteCard, handleOpenImage, handleLikeCard));
  closeModal(newCardPopup);
}

function handleOpenImage(imageData) {
  imageFull.src = imageData.link;
  imageFull.alt = imageData.name;
  imageCaption.textContent = imageData.name;
  openModal(imagePopup);
}

function handleCheckClickModal(evt) {
  if (evt.target.classList.contains('popup__close') ||
      evt.target === evt.currentTarget) {
        closeModal(evt.currentTarget);
      }
}

profileButton.addEventListener('click', handlePrepareProfile);
profileForm.addEventListener('submit', handleEditProfile);
newCardButton.addEventListener('click', handlePrepareCard);
newCardForm.addEventListener('submit', handleAddNewCard);


initialCards.forEach(card => {
  cardList.append(createCard(card, handleDeleteCard, handleOpenImage, handleLikeCard));
});

popups.forEach(popup => {
  popup.addEventListener('click', handleCheckClickModal);
})
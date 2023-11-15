import '../pages/index.css';
import { initialCards } from './cards.js';
import { openModal, closeModal } from './modal.js';
import { createCard, likeCard, deleteCard } from './card.js';

const profileButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_edit');
const profileForm = document.forms['edit-profile'];
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__description');

const newCardButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardForm = document.forms['new-place'];

const imagePopup = document.querySelector('.popup_type_image');
const imageFull = document.querySelector('.popup__image');
const imageCaption = document.querySelector('.popup__caption');

const cardList = document.querySelector('.places__list');

profileButton.addEventListener('click', editProfile);
newCardButton.addEventListener('click', prepareCard);

function editProfile() {
  profileForm.elements.name.value = profileName.textContent;
  profileForm.elements.description.value = profileAbout.textContent;
  profileForm.addEventListener('submit', submitProfile);
  openModal(profilePopup);
}

function submitProfile(evt) {
  evt.preventDefault();
  profileName.textContent = profileForm.elements.name.value;
  profileAbout.textContent = profileForm.elements.description.value;
  profileForm.removeEventListener('submit', submitProfile);
  closeModal(evt);
}

function prepareCard() {
  newCardForm.reset();  // Чтобы поля очищались не только по сабмиту, но и по любому закрытию окна, решил сбрасывать форму перед каждым открытием  
  newCardForm.addEventListener('submit', addNewCard);
  openModal(newCardPopup);
}

function addNewCard(evt) {
  evt.preventDefault();
  const newCard = {
    name: newCardForm.elements['place-name'].value,
    link: newCardForm.elements.link.value,
    alt: newCardForm.elements['place-name'].value
  };
  newCardForm.removeEventListener('submit', addNewCard);
  cardList.prepend(createCard(newCard, deleteCard, openImage, likeCard));
  closeModal(evt);
}

function openImage(imageData) {
  imageFull.src = imageData.link;
  imageFull.alt = imageData.name;
  imageCaption.textContent = imageData.name;
  openModal(imagePopup);
}

initialCards.forEach(item => {
  cardList.append(createCard(item, deleteCard, openImage, likeCard));
});
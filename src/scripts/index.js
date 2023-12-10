import '../pages/index.css';
import { openModal, closeModal, handleCheckClickModal } from './modal.js';
import { createCard, handleLikeCard } from './card.js';
import { enableValidation, clearValidation } from './validation.js';
import { 
  profileButton, profilePopup, profileName, profileAbout, profilePhoto,
  profileForm, profileFormName, profileFormAbout, newCardButton, newCardPopup,  // Как лучше оформлять большой блок импорта?
  newCardForm, newCardFormName, newCardFormLink, imagePopup, imageFull,
  imageCaption, popups, cardList, validationConfig, avatarPopup, avatarForm,
  avatarFormLink, deleteCardPopup, deleteCardForm
} from './constants.js';
import { getProfile, getCards, patchProfile, postCard, patchAvatar, deleteCard, getStudents } from './api.js';

let cardForDelete = [];  // Так как openModal принимает на вход только попап, то создаю глобальную переменную для переброса данных об удаляемой карточке в форму удаления

function renderProfile(profile) {
  profileName.textContent = profile.name;
  profileAbout.textContent = profile.about;
  profilePhoto.style.backgroundImage = `url(${profile.avatar})`;
}

function renderCards(cards, userId) {
  cards.forEach(card => {
    cardList.append(createCard(card, userId, handleOpenDeletePopup, handleOpenImage, handleLikeCard));
  });
}

function handlePrepareProfile() {
  clearValidation(profileForm, validationConfig);
  profileFormName.value = profileName.textContent;
  profileFormAbout.value = profileAbout.textContent;
  openModal(profilePopup);
}

function handleSaveProfile(evt) {
  evt.preventDefault();
  evt.submitter.textContent = 'Сохранение...';
  patchProfile(profileFormName.value, profileFormAbout.value)
    .then(profile => {
      profileName.textContent = profile.name;
      profileAbout.textContent = profile.about;
    })
    .catch(err => console.log(err))
    .finally(() => {
      closeModal(profilePopup);
      evt.submitter.textContent = 'Сохранить';
    });
}

function handlePrepareAvatar() {
  clearValidation(avatarPopup, validationConfig);
  avatarForm.reset();
  openModal(avatarPopup);
}

function handleChangeAvatar(evt) {
  evt.preventDefault();
  evt.submitter.textContent = 'Сохранение...';
  patchAvatar(avatarFormLink.value)
    .then(profile => {
      profilePhoto.style.backgroundImage = `url(${profile.avatar})`;
    })
    .catch(err => console.log(err))
    .finally(() => {
      closeModal(avatarPopup);
      evt.submitter.textContent = 'Сохранить';
    });
}

function handlePrepareCard() {
  clearValidation(newCardForm, validationConfig);
  newCardForm.reset();
  openModal(newCardPopup);
}

function handleAddCard(evt) {
  evt.preventDefault();
  evt.submitter.textContent = 'Сохранение...';
  postCard(newCardFormName.value, newCardFormLink.value)
    .then(newCard => {
      cardList.prepend(createCard(newCard, newCard.owner._id, handleOpenDeletePopup, handleOpenImage, handleLikeCard));
    })
    .catch(err => console.log(err))
    .finally(() => {
      closeModal(newCardPopup);
      evt.submitter.textContent = 'Сохранить';
    });
}

function handleOpenImage(imageData) {
  imageFull.src = imageData.link;
  imageFull.alt = imageData.alt;
  imageCaption.textContent = imageData.name;
  openModal(imagePopup);
}

function handleOpenDeletePopup(evt, cardId) {
  cardForDelete = [evt.target.closest('.card'), cardId];
  openModal(deleteCardPopup);
}

function handleDeleteCard(evt) {
  evt.preventDefault();
  evt.submitter.textContent = 'Удаление...';
  const [cardElement, cardId] = cardForDelete;
  deleteCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch(err => console.log(err))
    .finally(() => {
      closeModal(deleteCardPopup);
      evt.submitter.textContent = 'Да';
    });
}

Promise.all([getProfile(), getCards()])
  .then(results => {
    const [profile, cards] = results;
    renderProfile(profile);
    renderCards(cards, profile._id);
  })
  .catch(err => console.log(err));

profileButton.addEventListener('click', handlePrepareProfile);
profileForm.addEventListener('submit', handleSaveProfile);
profilePhoto.addEventListener('click', handlePrepareAvatar);
avatarForm.addEventListener('submit', handleChangeAvatar);
newCardButton.addEventListener('click', handlePrepareCard);
newCardForm.addEventListener('submit', handleAddCard);
deleteCardForm.addEventListener('submit', handleDeleteCard);

popups.forEach(popup => {
  popup.addEventListener('click', handleCheckClickModal);
})

enableValidation(validationConfig);

getStudents();
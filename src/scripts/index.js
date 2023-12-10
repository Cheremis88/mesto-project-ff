import '../pages/index.css';
import { openModal, closeModal, handleCheckClickModal } from './modal.js';
import { createCard, handleLikeCard, handleDeleteCard } from './card.js';
import { enableValidation, clearValidation } from './validation.js';
import { 
  profileButton, profilePopup, profileName, profileAbout, profilePhoto,
  profileForm, profileFormName, profileFormAbout, newCardButton, newCardPopup,  // Как лучше оформлять большие блоки импорта?
  newCardForm, newCardFormName, newCardFormLink, imagePopup, imageFull,
  imageCaption, popups, cardList, validationConfig
} from './constants.js';
import { getProfile, getCards, patchProfile, postCard, getStudents } from './api.js';



function renderProfile(profile) {
  profileName.textContent = profile.name;
  profileAbout.textContent = profile.about;
  profilePhoto.style.backgroundImage = `url(${profile.avatar})`;
}

function renderCards(cards, userId) {
  cards.forEach(card => {
    cardList.append(createCard(card, userId, handleDeleteCard, handleOpenImage, handleLikeCard));
  });
}

function handlePrepareProfile() {
  clearValidation(profileForm, validationConfig);
  profileFormName.value = profileName.textContent;
  profileFormAbout.value = profileAbout.textContent;
  openModal(profilePopup);
}

function handlePrepareCard() {
  clearValidation(newCardForm, validationConfig);
  newCardForm.reset();
  openModal(newCardPopup);
}

function handleOpenImage(imageData) {
  imageFull.src = imageData.link;
  imageFull.alt = imageData.alt;
  imageCaption.textContent = imageData.name;
  openModal(imagePopup);
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

function handleAddCard(evt) {
  evt.preventDefault();
  evt.submitter.textContent = 'Сохранение...';
  postCard(newCardFormName.value, newCardFormLink.value)
    .then(newCard => {
      cardList.prepend(createCard(newCard, newCard.owner._id, handleDeleteCard, handleOpenImage, handleLikeCard));
    })
    .catch(err => console.log(err))
    .finally(() => {
      closeModal(newCardPopup);
      evt.submitter.textContent = 'Сохранить';
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
newCardButton.addEventListener('click', handlePrepareCard);
newCardForm.addEventListener('submit', handleAddCard);

popups.forEach(popup => {
  popup.addEventListener('click', handleCheckClickModal);
})

enableValidation(validationConfig);

getStudents();
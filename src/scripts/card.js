function createCard (cardData, userId, deleteCallBack, openCallBack, likeCallBack) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);
  const image = cardElement.querySelector('.card__image');
  const title = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__like-count');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  image.src = cardData.link;
  image.alt = cardData.name;
  title.textContent = cardData.name;

  image.addEventListener('click', () => openCallBack(cardData));
  likeButton.addEventListener('click', evt => likeCallBack(evt, cardData._id, userId));
  deleteButton.addEventListener('click', evt => deleteCallBack(evt, cardData._id));

  if (userId !== cardData.owner._id) {
    deleteButton.remove();
  }
  
  setLikeState(likeButton, likeCount, cardData, userId);
  return cardElement;
}

function handleLikeCard(evt, cardId, userId) {
  const likeCount = evt.target.closest('.card').querySelector('.card__like-count');
  
  if (evt.target.classList.contains('card__like-button_is-active')) {
    deleteLike(cardId)
      .then(card => setLikeState(evt.target, likeCount, card, userId))
      .catch(err => console.log(err));
  } else {
    putLike(cardId)
      .then(card => setLikeState(evt.target, likeCount, card, userId))
      .catch(err => console.log(err));
  }
}

function setLikeState(likeButton, likeCount, card, userId) {
  if (card.likes.length > 0) {
    likeCount.classList.add('card__like-count_is-active');
  } else {
    likeCount.classList.remove('card__like-count_is-active');
  }

  if (card.likes.some(user => user._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  } else {
    likeButton.classList.remove('card__like-button_is-active');
  }

  likeCount.textContent = card.likes.length;
}

function handleDeleteCard(evt, cardId) {
  deleteCard(cardId)
    .then(() => {
      evt.target.closest('.card').remove();
    })
    .catch(err => console.log(err));
}

import { deleteCard, putLike, deleteLike } from "./api";
export { createCard, handleLikeCard, handleDeleteCard };
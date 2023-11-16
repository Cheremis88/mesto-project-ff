function createCard (cardData, deleteCallBack, openCallBack, likeCallBack) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.alt;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__image').addEventListener('click', () => {
    openCallBack(cardData);
  });
  cardElement.querySelector('.card__like-button').addEventListener('click', likeCallBack);
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCallBack);
  return cardElement;
}

function handleLikeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

function handleDeleteCard(evt) {
  evt.target.closest('.places__item').remove();
}

export { createCard, handleLikeCard, handleDeleteCard };
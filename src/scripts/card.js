function createCard (cardData, userId, deleteCallBack, openCallBack, likeCallBack) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__like-count').textContent = cardData.likes.length;
  cardElement.querySelector('.card__image').addEventListener('click', () => {
    openCallBack(cardData);
  });
  cardElement.querySelector('.card__like-button').addEventListener('click', likeCallBack);
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCallBack);

  if (cardData.likes.length > 0) {
    cardElement.querySelector('.card__like-count').classList.add('card__like-count_is-active');
  }
  if (userId !== cardData.owner._id) {
    cardElement.querySelector('.card__delete-button').remove();
  }
  if (cardData.likes.some(user => user._id === userId)) {
    cardElement.querySelector('.card__like-button').classList.toggle('card__like-button_is-active');
  };
  return cardElement;
}

function handleLikeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

function handleDeleteCard(evt) {
  evt.target.closest('.places__item').remove();
}

export { createCard, handleLikeCard, handleDeleteCard };
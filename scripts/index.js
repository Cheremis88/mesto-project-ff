const cardList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

for (let i = 0; i < initialCards.length; i++) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__image').src = initialCards[i].link;
  cardElement.querySelector('.card__title').textContent = initialCards[i].name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', () => cardElement.remove());
  cardList.append(cardElement);
}
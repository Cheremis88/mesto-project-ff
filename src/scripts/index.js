import '../pages/index.css';
import { initialCards } from './cards.js';
const cardList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function createElement (cardData, deleteCallBack) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.alt;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCallBack);
  return cardElement;
}

function deleteCard(evt) {
  evt.target.closest('.places__item').remove();
}

initialCards.forEach(item => {
  cardList.append(createElement(item, deleteCard));
});
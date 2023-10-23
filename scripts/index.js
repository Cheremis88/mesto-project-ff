
/* Долго не мог понять, зачем писать отдельные функции и как именно их писать. Надеюсь, что справился.
Но осталься вопрос: создавать отдельные функции и передавать колбек в виде аргумента - это эффективно
с точки зрения масштабности проекта и быстрой заменяемости? */


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


/* Первый код для истории

  for (let i = 0; i < initialCards.length; i++) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__image').src = initialCards[i].link;
  cardElement.querySelector('.card__image').alt = initialCards[i].alt;
  cardElement.querySelector('.card__title').textContent = initialCards[i].name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', () => cardElement.remove());
  cardList.append(cardElement);
} */
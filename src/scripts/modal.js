function openModal(popup) {
  popup.classList.add('popup_is-opened');
  popup.addEventListener('click', closeModal);
  document.addEventListener('keydown', closeModal);
}

function closeModal(evt) {
  if (evt.target.classList.contains('popup__close') ||
      evt.target === evt.currentTarget ||
      evt.key === 'Escape') {
        document.querySelector('.popup_is-opened').removeEventListener('click', closeModal);
        document.removeEventListener('keydown', closeModal);
        document.querySelector('.popup_is-opened').classList.remove('popup_is-opened');  
  }
}

export { openModal, closeModal };
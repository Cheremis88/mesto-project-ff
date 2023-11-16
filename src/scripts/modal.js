function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeModalEsc);
}

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalEsc);
}

function closeModalEsc(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    closeModal(popup);
  }
}

function handleCheckClickModal(evt) {
  if (evt.target.classList.contains('popup__close') ||
      evt.target === evt.currentTarget) {
        closeModal(evt.currentTarget);
      }
}


export { openModal, closeModal, closeModalEsc, handleCheckClickModal };
export { enableValidation, clearValidation };

function enableValidation(classes) {
  const formList = document.querySelectorAll(classes.formSelector);
  formList.forEach(form => {
    setInputEvents(form, classes);
  });
}

function clearValidation(form, classes) {
  const inputList = Array.from(form.querySelectorAll(classes.inputSelector));
  const button = form.querySelector(classes.submitButtonSelector);

  button.classList.add(classes.inactiveButtonClass);
  button.disabled = true;

  inputList.forEach(input => {
    hideError(form, input, classes);
  });
}

function setInputEvents(form, classes) {
  const inputList = Array.from(form.querySelectorAll(classes.inputSelector));
  const button = form.querySelector(classes.submitButtonSelector);
  inputList.forEach(input => {
    input.addEventListener('input', () => {
      checkInput(form, input, classes);
      setButtonState(inputList, button, classes);
    });
  });
}

function checkInput(form, input, classes) {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity('');
  }

  if (input.validity.valid) {
    hideError(form, input, classes);
  } else  {
    showError(form, input, input.validationMessage, classes);
  }
}

function hideError(form, input, classes) {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.remove(classes.inputErrorClass);
  error.classList.remove(classes.errorClass);
}

function showError(form, input, errorMessage, classes) {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.add(classes.inputErrorClass);
  error.classList.add(classes.errorClass);
  error.textContent = errorMessage;
}

function setButtonState(inputList, button, classes) {
  if (hasInvalidInput(inputList)) {
    button.classList.add(classes.inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(classes.inactiveButtonClass);
    button.disabled = false;
  }
}

function hasInvalidInput(inputList) {
  return inputList.some(input => !input.validity.valid);
}
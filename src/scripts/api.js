import { requestConfig } from "./constants";
export { getProfile, getCards, patchProfile, postCard, deleteCard };

function sendRequest(endPoint, options) {
  return fetch(requestConfig.baseUrl + endPoint, options)
    .then(checkResponse);
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject('Ошибка ' + res.status);
}

function getProfile() {
  return sendRequest('users/me', {
    method: 'GET',
    headers: requestConfig.headers
  });
}

function getCards() {
  return sendRequest('cards', {
    method: 'GET',
    headers: requestConfig.headers
  });
}

function patchProfile(name, about) {
  return sendRequest('users/me', {
    method: 'PATCH',
    headers: requestConfig.headers,
    body: JSON.stringify({
      name,
      about
    })
  });
}

function postCard(name, link) {
  return sendRequest('cards', {
    method: 'POST',
    headers: requestConfig.headers,
    body: JSON.stringify({
      name,
      link
    })
  });
}

function deleteCard(cardId) {
  return sendRequest('cards/' + cardId, {
    method: 'DELETE',
    headers: requestConfig.headers,
  });
}
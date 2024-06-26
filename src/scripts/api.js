import { requestConfig } from "./constants";
export { getProfile, getCards, patchProfile, postCard, deleteCard, putLike, deleteLike, patchAvatar };

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
    headers: requestConfig.headers
  });
}

function deleteLike(cardId) {
  return sendRequest('cards/likes/' + cardId, {
    method: 'DELETE',
    headers: requestConfig.headers
  });
}

function putLike(cardId) {
  return sendRequest('cards/likes/' + cardId, {
    method: 'PUT',
    headers: requestConfig.headers
  });
}

function patchAvatar(avatar) {
  return sendRequest('users/me/avatar', {
    method: 'PATCH',
    headers: requestConfig.headers,
    body: JSON.stringify({
      avatar
    })
  });
}
export function postUserLogIn(data) {
  return fetch('/users/login', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json'
    }
  }).then(res => res.json())
}

export function fetchUserData({ method = 'GET', id = '', data } = {}) {
  return fetch('/user/' + id, {
    method,
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json'
    }
  }).then(res => res.json())
}

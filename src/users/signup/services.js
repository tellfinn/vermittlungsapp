export function getUsers() {
  return fetchUsers()
}

export function postUser(data) {
  return fetchUsers({ method: 'POST', data })
}

export function patchUser(id, data) {
  return fetchUsers({ method: 'PATCH', id, data })
}

export function deleteUser(id) {
  return fetchUsers({ method: 'DELETE', id })
}

function fetchUsers({ method = 'GET', id = '', data } = {}) {
  return fetch('/users/register' + id, {
    method,
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json'
    }
  }).then(res => res.json())
}

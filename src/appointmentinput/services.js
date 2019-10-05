export function getLanguages() {
  return fetchLanguages()
}

export function postLanguage(data) {
  return fetchLanguages({ method: 'POST', data })
}

export function patchLanguage(id, data) {
  return fetchLanguages({ method: 'PATCH', id, data })
}

function fetchLanguages({ method = 'GET', id = '', data } = {}) {
  return fetch('/languages/' + id, {
    method,
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json'
    }
  }).then(res => res.json())
}

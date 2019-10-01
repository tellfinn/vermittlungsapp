export function getAppointments() {
  return fetchAppointments()
}

export function postAppointment(data) {
  return fetchAppointments({ method: 'POST', data })
}

export function patchAppointment(id, data) {
  return fetchAppointments({ method: 'PATCH', id, data })
}

function fetchAppointments({ method = 'GET', id = '', data } = {}) {
  return fetch('/appointments/' + id, {
    method,
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json'
    }
  }).then(res => res.json())
}

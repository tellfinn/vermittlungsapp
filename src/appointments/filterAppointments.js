export default function filterAppointments({
  appointments,
  interpreterLanguages,
  currentUser,
  requestAccepted,
  activeIndex,
  period,
  currentTimestamp
}) {
  let filteredAppointments = appointments
    .filter(
      appointment =>
        appointment.acceptedByInterpreter === requestAccepted &&
        (interpreterLanguages.includes(appointment.appointmentLanguage) ||
          appointment.sentBy === currentUser)
    )
    .filter(
      appointment =>
        appointment.showToInterpreter.length === 0 ||
        appointment.showToInterpreter === currentUser ||
        appointment.sentBy === currentUser
    )

  if (activeIndex === 0) {
    filteredAppointments = filteredAppointments.slice().sort((a, b) => {
      return new Date(a.appointmentDate) - new Date(b.appointmentDate)
    })
  } else if (activeIndex === 1) {
    filteredAppointments = filteredAppointments.slice().sort((a, b) => {
      return (
        new Date(a.appointmentDate).getHours() -
        new Date(b.appointmentDate).getHours()
      )
    })
  } else if (activeIndex === 2) {
    filteredAppointments = filteredAppointments.slice().sort((a, b) => {
      return a.clinic > b.clinic
    })
  }

  if (period === 'present') {
    filteredAppointments = filteredAppointments.filter(
      appointment => new Date(appointment.appointmentDate) >= currentTimestamp
    )
  } else if (period === 'past') {
    filteredAppointments = filteredAppointments.filter(
      appointment =>
        new Date(appointment.appointmentDate) < currentTimestamp &&
        appointment.acceptedByInterpreter === true
    )
  }

  return filteredAppointments
}

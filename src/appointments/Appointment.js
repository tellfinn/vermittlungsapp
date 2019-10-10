import React, { useState } from 'react'
import styled from 'styled-components/macro'
import AppointmentDetails from './AppointmentDetails'

export default function Appointment({
  appointmentDate,
  time,
  day,
  duration,
  clinic,
  station,
  appLanguage,
  extension,
  message,
  contact,
  handleAcceptClick
}) {
  const [showDetails, setShowDetails] = useState(false)

  const date = renderableDate(appointmentDate)
  time = renderableTime(appointmentDate)
  day = renderableDay(appointmentDate)
  duration =
    duration < 1
      ? duration * 60 + ' Min'
      : duration % 1 === 0
      ? duration + ' Std'
      : calculateDuration(duration)

  function calculateDuration(duration) {
    const rest = duration % 1
    const minutes = rest * 60
    const hours = Math.floor(duration)
    return hours + ' Std ' + minutes + ' Min'
  }

  return (
    <>
      <AppointmentStyled onClick={toggleAppointmentDetails}>
        <div>{date}</div>
        <div>{time}</div>
        <div>{clinic}</div>
        <div> {day} </div>
        <div>ca. {duration}</div>
        <div> {station} </div>
      </AppointmentStyled>
      {showDetails && (
        <AppointmentDetails
          date={date}
          time={time}
          duration={duration}
          language={appLanguage}
          extension={extension}
          message={message}
          clinic={clinic}
          contact={contact}
          station={station}
          handleBodyClick={hideAppointmentDetails}
          handleAcceptClick={handleAcceptClick}
        />
      )}
    </>
  )

  function renderableDate(appointmentDate) {
    const newdate = new Date(appointmentDate).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
    return newdate
  }

  function renderableDay(appointmentDate) {
    const weekdayName = new Date(appointmentDate).toLocaleString('de-DE', {
      weekday: 'long'
    })

    return weekdayName
  }

  function renderableTime(appointmentDate) {
    const timeString = new Date(appointmentDate).toLocaleString('de-DE', {
      hour: '2-digit',
      minute: '2-digit'
    })

    return timeString
  }

  function toggleAppointmentDetails() {
    setShowDetails(!showDetails)
  }

  function hideAppointmentDetails() {
    setShowDetails(false)
  }
}

const AppointmentStyled = styled.li`
  display: grid;
  grid-template-columns: 1fr 1.3fr 0.7fr;
  grid-template-rows: 2;
  grid-column-gap: 30px;
  height: 60px;
  padding: 10px;
  background-color: var(--greyish);
  align-items: space-between;
  text-align: justify;
`

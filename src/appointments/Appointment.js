import React, { useState } from 'react'
import styled from 'styled-components/macro'

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
  contact
}) {
  const [showDetails, setShowDetails] = useState(false)

  time = renderableTime(appointmentDate)
  day = renderableDay(appointmentDate)

  return (
    <>
      <AppointmentStyled onClick={toggleAppointmentDetails}>
        <div>{renderableDate(appointmentDate)}</div>
        <div>{time}</div>
        <div>{clinic}</div>
        <div> {day} </div>
        <div> ca. {duration} Std</div>
        <div> {station} </div>
      </AppointmentStyled>
      {showDetails && (
        <AppointmentDetails
          appointmentDate={appointmentDate}
          time={time}
          duration={duration}
          language={appLanguage}
          extension={extension}
          message={message}
          contact={contact}
        />
      )}
    </>
  )

  function AppointmentDetails({
    contact,
    extension,
    place,
    language,
    message
  }) {
    return (
      <AppointmentDetailsStyled onClick={hideAppointmentDetails}>
        <div>Sprache: {language}</div>
        <div>Ansprechpartner: {contact} </div>
        <div>Durchwahl: {extension} </div>
        <div>Ort: {place} </div>
        <div>Nachricht: {message} </div>
      </AppointmentDetailsStyled>
    )
  }
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
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 2;
  grid-column-gap: 30px;
  height: 60px;
  padding: 10px;
  background-color: var(--greyish);
  align-items: space-between;
  text-align: justify;
`

const AppointmentDetailsStyled = styled.div`
  display: grid;
  grid-gap: 10px;
  width: 100%;
  height: 100%;
  padding: 10px;
  background-color: var(--greyish);
  z-index: 99;
`

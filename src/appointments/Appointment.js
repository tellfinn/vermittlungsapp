import React, { useState } from 'react'
import styled from 'styled-components/macro'

export default function Appointment({
  appointmentDate,
  time,
  day,
  duration,
  clinic,
  station,
  appointmentDetails
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
        <AppointmentDetails appLanguage contact extension station message />
      )}
    </>
  )

  function AppointmentDetails({
    appLanguage,
    contact,
    extension,
    station,
    message
  }) {
    return (
      <AppointmentDetailsStyled onClick={hideAppointmentDetails}>
        <div>Sprache: {appLanguage}</div>
        <div>Ansprechpartner: {contact} </div>
        <div>Durchwahl: {extension} </div>
        <div>Ort: {station} </div>
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

const Container = styled.div`
  position: relative;
  perspective: 1000px;
  z-index: 1;
`
const AppointmentDetailsStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 5;
  grid-gap: 10px;
  width: 100%;
  height: 100%;
  padding: 10px;
  background-color: var(--greyish);
  transform-style: preserve-3d;
  transition: all 0.7s linear;
  z-index: 99;
`

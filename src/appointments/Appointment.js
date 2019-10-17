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
  handleAcceptClick,
  handleDeclineClick,
  handleEditClick,
  acceptedByInterpreter
}) {
  const [showDetails, setShowDetails] = useState(false)

  const date = boldText(renderableDate(appointmentDate))
  time = renderableTime(appointmentDate)
  day = renderableDay(appointmentDate)
  duration =
    duration < 1
      ? duration * 60 + ' Min'
      : duration % 1 === 0
      ? duration + ' Std'
      : calculateDuration(duration)

  return (
    <>
      <AppointmentStyled onClick={showAppointmentDetails}>
        {date}
        <div>{time}</div>
        <div>{clinic}</div>
        <div> {day} </div>
        <div style={{ letterSpacing: '-0.08em' }}>ca. {duration}</div>
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
          handleContainerClick={hideAppointmentDetails}
          handleAcceptClick={handleAcceptClick}
          handleDeclineClick={handleDeclineClick}
          acceptedByInterpreter={acceptedByInterpreter}
          handleEditClick={handleEditClick}
        />
      )}
    </>
  )

  function showAppointmentDetails() {
    setShowDetails(true)
  }

  function hideAppointmentDetails(event) {
    event.target.name !== 'unclickable' && setShowDetails(false)
  }

  function renderableDate(appointmentDate) {
    let newDate

    if (
      new Date(appointmentDate).setHours(0, 0, 0, 0) ===
      new Date().setHours(0, 0, 0, 0)
    ) {
      newDate = 'heute'
    } else {
      newDate = new Date(appointmentDate).toLocaleDateString('de-DE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
    }
    return newDate
  }

  function boldText(date) {
    let insertDate
    const boldStyle = {
      fontWeight: 'bolder',
      animation: 'blink-animation 1s infinite'
    }
    if (date === 'heute') {
      insertDate = <div style={boldStyle}> {date} </div>
    } else {
      insertDate = <div>{date}</div>
    }
    return insertDate
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

  function calculateDuration(duration) {
    const rest = duration % 1
    const minutes = rest * 60
    const hours = Math.floor(duration)
    return hours + ' Std ' + minutes + ' Min'
  }
}

const AppointmentStyled = styled.li`
  display: grid;
  grid-template-columns: 1fr 1.2fr 0.8fr;
  grid-template-rows: 2;
  grid-column-gap: 29px;
  min-height: 70px;
  padding: 10px;
  border: 5px solid #f0f0f0;
  box-shadow: 2px 2px 2px grey;
  background-color: var(--greyish);
  align-items: space-between;
  text-align: justify;
`

import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Swipeout from 'rc-swipeout'
import styled from 'styled-components/macro'
import AppointmentDetails from './AppointmentDetails'
import { ReactComponent as MoreIcon } from '../icons/arrow-down.svg'
//import NextButton from '../common/NextButton'

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
  handleDeleteClick,
  handleEditClick,
  acceptedByInterpreter
}) {
  const [showDetails, setShowDetails] = useState(false)

  const date = displayTodayBolder(renderableDate(appointmentDate))
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
      <AppointmentStyled>
        {date}
        <div>{time}</div>
        <div>{clinic}</div>
        <div> {day} </div>
        <div style={{ letterSpacing: '-0.08em' }}>ca. {duration}</div>
        <div> {station} </div>
        <ShowMoreBtnStyled onClick={showAppointmentDetails}>
          <MoreIconStyled />
        </ShowMoreBtnStyled>
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
          handleCloseClick={hideAppointmentDetails}
          handleAcceptClick={handleAcceptClick}
          handleDeclineClick={handleDeclineClick}
          acceptedByInterpreter={acceptedByInterpreter}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
        />
      )}
    </>
  )

  function showAppointmentDetails() {
    setShowDetails(true)
  }

  function hideAppointmentDetails() {
    setShowDetails(false)
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

  function displayTodayBolder(date) {
    let insertDate
    const boldStyle = {
      fontWeight: 'bolder'
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
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1.2fr 0.8fr;
  grid-template-rows: 2;
  grid-column-gap: 29px;
  min-height: 70px;
  width: 355px;
  padding: 10px;
  padding-bottom: 30px;
  border-bottom: 1px solid grey;
  align-items: space-between;
  text-align: justify;
`

const ShowMoreBtnStyled = styled.div`
  position: absolute;
  bottom: -10px;
  display: flex;
  justify-content: center;
  height: 40px;
  width: 100%;
`

const MoreIconStyled = styled(MoreIcon)`
  height: 40px;
  width: 40px;
`

/* border: 5px solid #f0f0f0;
  box-shadow: 2px 2px 2px grey;
  background-color: var(--greyish);*/

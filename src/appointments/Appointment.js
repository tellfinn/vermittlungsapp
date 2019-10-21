import React, { useState } from 'react'
import styled from 'styled-components/macro'
import AppointmentDetails from './AppointmentDetails'
import InfoBtn from './InfoBtn'
import SwipeToDismiss from 'react-swipe-to-dismiss'
import { ReactComponent as Arrow } from '../icons/chevron-circle-left.svg'

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
  acceptedByInterpreter,
  isSwiping
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
      <BackgroundContainer>
        {' '}
        ablehnen <ArrowStyled />
        <SwipeToDismiss
          onDismiss={handleDeclineClick}
          direction='left'
          distanceBeforeDismiss={parseInt(50)}>
          <AppointmentStyled>
            {date}
            <div>{time}</div>
            <div>{clinic}</div>
            <div> {day} </div>
            <div style={{ letterSpacing: '-0.08em' }}>ca. {duration}</div>
            <div> {station} </div>
            <InfoBtn
              handleInfobtnClick={showAppointmentDetails}
              infoType='more'
            />
          </AppointmentStyled>
        </SwipeToDismiss>
      </BackgroundContainer>

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
  position: absolute;
  display: grid;
  grid-template-columns: 1fr 1.2fr 0.8fr;
  grid-template-rows: 2;
  grid-column-gap: 29px;
  min-height: 70px;
  width: 355px;
  padding: 10px;
  padding-bottom: 40px;
  border-bottom: 1px solid grey;
  align-items: space-between;
  text-align: justify;
  background-color: var(--background-white);
  color: black;
  z-index: 5;
`

const BackgroundContainer = styled.div`
  position: relative;
  display: flex;
  height: 90px;
  width: 355px;
  margin: 20px 0;
  justify-content: end;
  align-items: end;
  background-color: var(--red);
  color: white;
  z-index: 1;
`

const ArrowStyled = styled(Arrow)`
  position: relative;
  bottom: 30px;
  right: 15px;
  fill: white;
  height: 40px;
  width: 40px;
`

//alternativ: &#8853;

/* border: 5px solid #f0f0f0;
  box-shadow: 2px 2px 2px grey;
  background-color: var(--greyish);*/

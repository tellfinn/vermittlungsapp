import React, { useState } from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import AppointmentDetails from './AppointmentDetails'
import InfoBtn from './InfoBtn'
import SwipeToDismiss from 'react-swipe-to-dismiss'
import { ReactComponent as Arrow } from '../icons/chevron-circle-left.svg'

Appointment.propTypes = {
  appointmentDate: PropTypes.string,
  time: PropTypes.string,
  day: PropTypes.object,
  duration: PropTypes.number,
  clinic: PropTypes.string,
  station: PropTypes.string,
  appLanguage: PropTypes.string,
  extension: PropTypes.number,
  message: PropTypes.string,
  contact: PropTypes.string,
  handleAcceptClick: PropTypes.func,
  handleDeclineClick: PropTypes.func,
  handleDeleteClick: PropTypes.func,
  handleEditClick: PropTypes.func,
  acceptedByInterpreter: PropTypes.bool
}

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
  ...props
}) {
  const [showDetails, setShowDetails] = useState(false)

  const date = displayTodayBold(renderableDate(appointmentDate))
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
        <SwipeToDismiss
          onDismiss={props.handleDeclineClick}
          direction='left'
          distanceBeforeDismiss={parseInt(50)}>
          <AppointmentStyled>
            {date}
            <ImportantData>{time}</ImportantData>
            <ImportantData>{clinic}</ImportantData>
            <div> {day} </div>
            <div style={{ letterSpacing: '-0.08em' }}>ca. {duration}</div>
            <div> {station} </div>
            <InfoBtn
              handleInfobtnClick={() => setShowDetails(true)}
              infoType='more'></InfoBtn>
            <DeclineInfoField>
              ablehnen <ArrowStyled />
            </DeclineInfoField>
          </AppointmentStyled>
        </SwipeToDismiss>
        <DeclineInfoField>
          ablehnen <ArrowStyled />
        </DeclineInfoField>
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
          handleCloseClick={() => setShowDetails(false)}
          handleAcceptClick={props.handleAcceptClick}
          handleDeclineClick={props.handleDeclineClick}
          acceptedByInterpreter={props.acceptedByInterpreter}
          handleEditClick={props.handleEditClick}
          handleDeleteClick={props.handleDeleteClick}
          languages={props.languages}
        />
      )}
    </>
  )

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

  function displayTodayBold(date) {
    let insertDate
    if (date === 'heute') {
      insertDate = <div style={{ fontWeight: 'bold' }}> {date} </div>
    } else {
      insertDate = <div style={{ fontWeight: 'bolder' }}>{date}</div>
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
  min-height: 75px;
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

const DeclineInfoField = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #ebecef;
`

const BackgroundContainer = styled.div`
  position: relative;
  display: flex;
  min-height: 100px;
  width: 355px;
  background-color: var(--red);
  z-index: 1;
`

const ArrowStyled = styled(Arrow)`
  height: 40px;
  width: 40px;
  fill: #ebecef;
  text-justify: end;
  align-self: end;
`

const ImportantData = styled.div`
  font-weight: bolder;
`

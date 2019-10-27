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
  appointmentLanguage: PropTypes.string,
  extension: PropTypes.number,
  message: PropTypes.string,
  contact: PropTypes.string,
  handleAcceptClick: PropTypes.func,
  handleDeclineClick: PropTypes.func,
  handleDeleteClick: PropTypes.func,
  acceptedByInterpreter: PropTypes.bool
}

export default function Appointment({ appointment, ...props }) {
  const [showDetails, setShowDetails] = useState(false)

  const rest = appointment.duration % 1
  const minutes = rest * 60
  const hours = Math.floor(appointment.duration)

  const date = displayTodayBold(renderableDate(appointment.appointmentDate))
  const time = renderableTime(appointment.appointmentDate)
  const day = renderableDay(appointment.appointmentDate)
  const duration =
    appointment.duration < 1
      ? appointment.duration * 60 + ' Min'
      : appointment.duration % 1 === 0
      ? appointment.duration + ' Std'
      : calculateDuration(appointment.duration)

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
            <ImportantData>{appointment.clinic}</ImportantData>
            <div> {day} </div>
            <div style={{ letterSpacing: '-0.08em' }}>ca. {duration}</div>
            <div> {appointment.station} </div>
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
          id={appointment._id}
          time={time}
          duration={duration}
          appointment={appointment}
          handleCloseClick={() => setShowDetails(false)}
          handleAcceptClick={props.handleAcceptClick}
          handleDeclineClick={props.handleDeclineClick}
          handleDeleteClick={props.handleDeleteClick}
          handlePostClick={props.handlePostClick}
          languages={props.languages}
          setAptState={props.setAptState}
          currentUser={props.currentUser}
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
    const convertedToDate = new Date(appointmentDate)
    const timeStringStartDate = convertedToDate.toLocaleString('de-DE', {
      hour: '2-digit',
      minute: '2-digit'
    })

    const endTimeWithHours = new Date(
      convertedToDate.setHours(convertedToDate.getHours() + hours)
    )
    const endTimeWithMinutes = endTimeWithHours.setMinutes(
      convertedToDate.getMinutes() + minutes
    )
    const timeStringEndDate = new Date(endTimeWithMinutes).toLocaleString(
      'de-DE',
      {
        hour: '2-digit',
        minute: '2-digit'
      }
    )

    return timeStringStartDate + '-' + timeStringEndDate
  }

  function calculateDuration() {
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

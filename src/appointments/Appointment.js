import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { ReactComponent as PhoneIcon } from '../icons/phone-fill.svg'

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
          contactNumber={getPhoneNumber}
        />
      )}
    </>
  )

  function AppointmentDetails({
    contact,
    extension,
    place,
    language,
    message,
    contactNumber
  }) {
    return (
      <AppointmentDetailsStyled onClick={hideAppointmentDetails}>
        <div>Sprache: {language}</div>
        <div>Ansprechpartner: {contact} </div>
        <div>
          Durchwahl: {extension}{' '}
          <a href={'tel:' + contactNumber}>
            <PhoneIconStyled />
          </a>
        </div>
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

  function getPhoneNumber(extension) {
    let phoneNumber
    if (clinic === 'UKE') {
      phoneNumber = '0407410'
    } else if (clinic === 'AKK') {
      phoneNumber = '04088908'
    } else if (clinic === 'PNZ') {
      phoneNumber = '0401818811'
    }

    return phoneNumber + extension
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
  position: absolute;
  top: 200px;
  left: auto;
  display: grid;
  padding: 10px;
  height: 350px;
  width: 95%;
  background-color: var(--greyish);
  border: 1px solid var(--blueish);
  transition: all 0.5 ease-in-out;
  margin-top: -1.5em;
  margin-bottom: 1.5em;
  z-index: 90;
`

const PhoneIconStyled = styled(PhoneIcon)`
  height: 20px;
  width: 20px;
`

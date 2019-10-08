import React from 'react'
import styled from 'styled-components/macro'

export default function Appointment({
  appointmentDate,
  time,
  day,
  duration,
  clinic,
  station
}) {
  time = renderableTime(appointmentDate)
  day = renderableDay(appointmentDate)

  return (
    <AppointmentStyled>
      <div>{renderableDate(appointmentDate)}</div>
      <div>{time}</div>
      <div>{clinic}</div>
      <div> {day} </div>
      <div> ca. {duration} Std</div>
      <div> {station} </div>
    </AppointmentStyled>
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
}

const AppointmentStyled = styled.li`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 30px;
  grid-template-rows: 2;
  height: 60px;
  padding: 10px;
  background-color: var(--greyish);
  align-items: space-between;
  text-align: justify;
`

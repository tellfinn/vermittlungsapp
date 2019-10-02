import React from 'react'
import styled from 'styled-components/macro'

export default function Appointment({
  date,
  time,
  day,
  duration,
  clinic,
  house
}) {
  time = renderableTime(date)
  day = renderableDay(date)

  return (
    <AppointmentStyled>
      <div>{renderableDate(date)}</div>
      <div>{time}</div>
      <div>{clinic}</div>
      <div> {day} </div>
      <div> ca. {duration} Std</div>
      <div> {house} </div>
    </AppointmentStyled>
  )

  function renderableDate(date) {
    const newdate = new Date(date).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
    return newdate
  }

  function renderableDay(date) {
    const weekdayName = new Date(date).toLocaleString('de-DE', {
      weekday: 'long'
    })

    return weekdayName
  }

  function renderableTime(date) {
    const timeString = new Date(date).toLocaleString('de-DE', {
      hour: '2-digit',
      minute: '2-digit'
    })

    return timeString
  }
}

const AppointmentStyled = styled.li`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 2;
  padding: 10px;
  height: 60px;
  align-items: space-around;
  text-align: justify;
  background-color: var(--greyish);
`

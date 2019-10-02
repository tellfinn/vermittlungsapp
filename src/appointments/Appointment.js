import React from 'react'
import styled from 'styled-components/macro'

export default function Appointment({ date, time, duration, clinic, house }) {
  return (
    <AppointmentStyled>
      <div>{stringifyDate(date)}</div>
      <div>{time}</div>
      <div>{clinic}</div>
      <div> {stringifyDay(date)} </div>
      <div> ca. {duration} Std</div>
      <div> {house} </div>
    </AppointmentStyled>
  )

  function stringifyDate(date) {
    const newdate = new Date(date).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
    return newdate
  }

  function stringifyDay(date) {
    const weekdayName = new Date(date).toLocaleString('de-DE', {
      weekday: 'long'
    })

    return weekdayName
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

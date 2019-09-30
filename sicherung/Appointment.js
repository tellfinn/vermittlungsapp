import React from 'react'
import styled from 'styled-components/macro'

export default function Appointment({
  date,
  time,
  day,
  duration,
  addressShortened
}) {
  // let day = date.getDay()
  return (
    <AppointmentStyled>
      <div>{date}</div>
      <div>{time}</div>
      <div>{addressShortened}</div>
      <div> {day} </div>
      <div> ca. {duration} Std</div>
    </AppointmentStyled>
  )
}

const AppointmentStyled = styled.li`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 2;
  padding: 20px;
  background-color: var(--slate-grey);
  text-align: justify;
`

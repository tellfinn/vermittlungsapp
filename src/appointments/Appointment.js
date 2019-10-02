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
  return (
    <AppointmentStyled>
      <div>{date}</div>
      <div>{time}</div>
      <div>{clinic}</div>
      <div> {day} </div>
      <div> ca. {duration} Std</div>
      <div> {house} </div>
    </AppointmentStyled>
  )
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

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
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  div {
    flex: 1 0 30%;
  }
  justify-content: space-between;
  background-color: #d9e0e7;
  padding: 15px;
  text-align: justify;
`

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
      <tr>
        <td>{date}</td>
        <td>{time}</td>
        <td>{addressShortened}</td>
      </tr>
      <tr>
        <td>{day}</td>
        <td>ca. {duration} Std</td>
      </tr>
    </AppointmentStyled>
  )
}

const AppointmentStyled = styled.tr`
  width: 100%;
  background-color: #f8f8f8;
  padding: 15px;
  text-align: left;
`

const Separator = styled.div`
  border-top: 1px solid hotpink;
`

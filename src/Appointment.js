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
      <div>
        {date} <br></br>
        {day}
      </div>
      <div>
        {time} <br></br>
        ca. {duration} Std
      </div>
      <div>{addressShortened}</div>
    </AppointmentStyled>
  )
}

const AppointmentStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #d9e0e7;
  padding: 15px;
  text-align: justify;
`

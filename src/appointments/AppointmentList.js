import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import Appointment from './Appointment'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { getAppointments, patchAppointment, postAppointment } from './services'

export default function AppointmentList() {
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    getAppointments().then(setAppointments)
  }, [])

  return (
    <AppointmentListStyled>
      {appointments.map(appointment => (
        <Appointment
          key={appointment._id}
          date={new Date(appointment.date).toString()}
          {...appointment}
        />
      ))}
    </AppointmentListStyled>
  )
}

const AppointmentListStyled = styled.ul`
  margin-left: -40px;
  display: grid;
  grid-row-gap: 10px;
  align-content: center;
  margin-bottom: 55px;
`

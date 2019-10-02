import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import Appointment from './Appointment'
import { getAppointments } from './services'

export default function AppointmentList() {
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    getAppointments().then(setAppointments)
  }, [])

  return <AppointmentListStyled>{sortByDate()}</AppointmentListStyled>

  function sortByDate() {
    const sortedAppointments = appointments.slice().sort((a, b) => {
      return new Date(a.date) - new Date(b.date)
    })
    return sortedAppointments.map(appointment => (
      <Appointment key={appointment._id} {...appointment} />
    ))
  }

  function sortByTime() {
    const sortedAppointments = appointments.slice().sort((a, b) => {
      return new Date(a.date).getHours() - new Date(b.date).getHours()
    })
    return sortedAppointments.map(appointment => (
      <Appointment key={appointment._id} {...appointment} />
    ))
  }

  function sortByClinic() {
    const sortedAppointments = appointments.slice().sort((a, b) => {
      return a.clinic > b.clinic
    })
    return sortedAppointments.map(appointment => (
      <Appointment key={appointment._id} {...appointment} />
    ))
  }
}

const AppointmentListStyled = styled.ul`
  margin-left: -40px;
  display: grid;
  grid-row-gap: 10px;
  align-content: center;
  margin-bottom: 55px;
`

import React from 'react'
import styled from 'styled-components/macro'
import Appointment from './Appointment'

export default function AppointmentList() {
  return (
    <AppointmentListStyled>
      <Appointment
        date='01.10.2019'
        day='Dienstag'
        time='10:00-11:00'
        duration='1'
        language='arabisch'
        addressShortened='UKE O10'
      />
      <Appointment
        date='01.10.2019'
        day='Dienstag'
        time='10:00-11:00'
        duration='1'
        language='arabisch'
        addressShortened='UKE O10'
      />
      <Appointment
        date='01.10.2019'
        day='Dienstag'
        time='10:00-11:00'
        duration='1'
        language='arabisch'
        addressShortened='UKE O10'
      />
    </AppointmentListStyled>
  )
}

const AppointmentListStyled = styled.ul`
  list-style: none;
  display: grid;
  grid-gap: 10px;
  align-content: center;
`

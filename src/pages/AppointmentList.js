import React from 'react'
import styled from 'styled-components/macro'

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
  margin-left: -40px;
  display: grid;
  grid-row-gap: 10px;
  align-content: center;
`

function Appointment({ date, time, day, duration, addressShortened }) {
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
  padding: 10px;
  height: 60px;
  align-items: space-around;
  text-align: justify;
  background-color: var(--greyish);
`

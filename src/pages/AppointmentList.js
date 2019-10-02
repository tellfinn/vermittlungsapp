import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import styled from 'styled-components/macro'
import { getAppointments, patchAppointment, postAppointment } from './services'
import { ReactComponent as CalendarIcon } from '../icons/calendar.svg'

export default function AppointmentList() {
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    getAppointments().then(setAppointments)
  }, [])

  return (
    <AppointmentPage>
      <AppointmentListStyled>
        {appointments.map(appointment => (
          <Appointment
            key={appointment._id}
            date={new Date(appointment.date).toString()}
            {...appointment}
          />
        ))}
      </AppointmentListStyled>
    </AppointmentPage>
  )
}

function Appointment({ date, time, day, duration, clinic, house }) {
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

/*
  const aptDate = new Date(Date(date))
  console.log(Date().toString())
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  }

  console.log(aptDate.toLocaleDateString('de-DE', options))*/

/* function ExportBar() {
  return (
    <ExportBarStyled>
      <CalendarBtnStyled>
        <CalenderTxtStyled> in Kalender exportieren </CalenderTxtStyled>
        <CalendarIconStyled />
      </CalendarBtnStyled>
    </ExportBarStyled>
  )
} */

const AppointmentPage = styled.div``

const AppointmentListStyled = styled.ul`
  margin-left: -40px;
  display: grid;
  grid-row-gap: 10px;
  align-content: center;
  margin-bottom: 55px;
`

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

/* const ExportBarStyled = styled.footer`
  position: fixed;
  bottom: 0;
  display: flex;
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.8),
    rgba(255, 255, 255, 1) 90%
  );
`

const CalendarBtnStyled = styled.button`
  position: relative;
  display: grid;
  height: 40px;
  width: 225px;
  border-radius: 5px;
  border: 0;
  background: var(--slate-grey);
  font-size: 16px;
  line-height: 2.7em;
`

const CalenderTxtStyled = styled.div`
  padding-left: 30px;
`

const CalendarIconStyled = styled(CalendarIcon)`
  position: absolute;
  top: 5px;
  left: 10px;
  height: 30px;
  width: 30px;
`

*/

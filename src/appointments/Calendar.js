import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import filterAppointments from './filterAppointments'
import moment from 'moment'
import styled from 'styled-components'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

export default function MyCalendar({ appointments }) {
  const events = appointments.map(appointment => ({
    title: appointment.clinic,
    start: new Date(appointment.date),
    end: createEndDate(appointment),
    allDay: false
  }))
  console.log(events)
  return (
    <Wrapper>
      <Calendar
        culture='de-DE'
        events={events}
        startAccessor='start'
        endAccessor='end'
        defaultDate={moment().toDate()}
        localizer={localizer}
      />
    </Wrapper>
  )

  function createEndDate(appointment) {
    const rest = appointment.duration % 1
    const minutes = rest * 60
    const hours = Math.floor(appointment.duration)
    const convertedToDate = new Date(appointment.date)
    const endTimeWithHours = convertedToDate.setHours(
      convertedToDate.getHours() + hours
    )
    return new Date(
      endTimeWithHours.setMinutes(convertedToDate.getMinutes() + minutes)
    )
  }
}

const Wrapper = styled.div`
  height: 400px;
`

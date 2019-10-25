import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import styled from 'styled-components'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

export default function MyCalendar({ appointments }) {
  const events = appointments.map(appointment => ({
    title: appointment.clinic,
    start: new Date(appointment.appointmentDate),
    end: new Date(appointment.endTimeWithMinutes),
    allDay: false
  }))

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
}

const Wrapper = styled.div`
  height: 400px;
`

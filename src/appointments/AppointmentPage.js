import React, { useEffect, useState } from 'react'
import { getAppointments } from './services'
import Page from '../common/Page'
import AppointmentList from './AppointmentList'
import Appointment from './Appointment'
import SortByBar from './SortByBar'

export default function AppointmentPage({ requestAccepted }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    getAppointments().then(setAppointments)
  }, [])

  function renderAppointmentList(index) {
    const appointmentList = {
      0: <AppointmentList>{sortAppointments('date')}</AppointmentList>,
      1: <AppointmentList>{sortAppointments('time')}</AppointmentList>,
      2: <AppointmentList>{sortAppointments('clinic')}</AppointmentList>
    }
    return appointmentList[index]
  }

  return (
    <Page>
      <SortByBar
        buttonTexts={['Datum', 'Uhrzeit', 'Ort']}
        handleClick={setActiveIndex}
      />
      {renderAppointmentList(activeIndex)}
    </Page>
  )

  function sortAppointments() {
    let sortedAppointments = appointments.filter(
      appointment => appointment.acceptedByInterpreter === requestAccepted
    )

    if (activeIndex === 0) {
      sortedAppointments = sortedAppointments.slice().sort((a, b) => {
        return new Date(a.appointmentDate) - new Date(b.appointmentDate)
      })
    } else if (activeIndex === 1) {
      sortedAppointments = sortedAppointments.slice().sort((a, b) => {
        return (
          new Date(a.appointmentDate).getHours() -
          new Date(b.appointmentDate).getHours()
        )
      })
    } else if (activeIndex === 2) {
      sortedAppointments = sortedAppointments.slice().sort((a, b) => {
        return a.clinic > b.clinic
      })
    }

    return sortedAppointments.map(appointment => (
      <Appointment
        handleAcceptClick={event => acceptAppointment(event)}
        key={appointment._id}
        {...appointment}
      />
    ))
  }

  function acceptAppointment(event, appointment) {
    event.stopPropagation()
    console.log('bin da')
    /* patchAppointment(appointment._id, {
      acceptedByInterpreter: true,
      openAppointment: false
    }).then(updatedAppointment => {
      const index = appointments.findIndex(
        appointment => appointment._id === updatedAppointment._id
      )
      setAppointments([
        ...appointment(0, index),
        {
          ...appointment,
          acceptedByInterpreter: updatedAppointment.acceptedByInterpreter
        },
        ...appointments.slice(index + 1)
      ])

      console.log(event.target.acceptedByInterpreter)
    })*/
  }
}

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

  let sortedAppointments = appointments.filter(
    appointment => appointment.acceptedByInterpreter === requestAccepted
  )

  function renderAppointmentList() {
    const appointmentList = [
      <AppointmentList>{sortAppointments('date')}</AppointmentList>,
      <AppointmentList>{sortAppointments('time')}</AppointmentList>,
      <AppointmentList>{sortAppointments('clinic')}</AppointmentList>
    ]

    return appointmentList[activeIndex]
  }

  return (
    <Page>
      <SortByBar
        buttonTexts={['Datum', 'Uhrzeit', 'Ort']}
        handleClick={setActiveIndex}
      />
      {renderAppointmentList()}
    </Page>
  )

  function sortAppointments({ sortByProp = 'date' }) {
    if (sortByProp === 'date') {
      sortedAppointments = sortedAppointments.slice().sort((a, b) => {
        return new Date(a.appointmentDate) - new Date(b.appointmentDate)
      })
    } else if (sortByProp === 'time') {
      sortedAppointments = sortedAppointments.slice().sort((a, b) => {
        return (
          new Date(a.appointmentDate).getHours() -
          new Date(b.appointmentDate).getHours()
        )
      })
    } else if (sortByProp === 'clinic') {
      sortedAppointments = sortedAppointments.slice().sort((a, b) => {
        return a.clinic > b.clinic
      })
    }

    return sortedAppointments.map(appointment => (
      <Appointment key={appointment._id} {...appointment} />
    ))
  }

  /*   function acceptAppointment(event, appointment) {
    event.stopPropagation()
    console.log(event.target.acceptedByInterpreter)
    patchAppointment(appointment._id, { acceptedByInterpreter: true }).then(
      updatedAppointment => {
        const index = appointments.findIndex(
          appointment => appointment._id === updatedAppointment._id
        )
        setAppointments([
          ...appointment.slice(0, index),
          {
            ...appointment,
            acceptedByInterpreter: updatedAppointment.acceptedByInterpreter
          },
          ...appointments.slice(index + 1)
        ])

        console.log(event.target.acceptedByInterpreter)
      }
    )
  }*/
}

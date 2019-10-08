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
    appointment => appointment.accepted === requestAccepted
  )

  function renderAppointmentList() {
    const appointmentList = {
      0: <AppointmentList>{sortAppointments('date')}</AppointmentList>,
      1: <AppointmentList>{sortAppointments('time')}</AppointmentList>,
      2: <AppointmentList>{sortAppointments('clinic')}</AppointmentList>
    }

    return appointmentList[activeIndex] || <section>keine Termine</section>
  }

  return (
    <Page>
      <SortByBar
        buttonTexts={['Datum', 'Uhrzeit', 'Ort']}
        handleSortClick={setActiveIndex}
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
}

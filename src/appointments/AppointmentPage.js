import React, { useEffect, useState } from 'react'
import { getAppointments } from './services'
import Page from '../common/Page'
import AppointmentList from './AppointmentList'
import Appointment from './Appointment'
import SortByBar from './SortByBar'

export default function AppointmentPage() {
  const [activeIndex, setActiveIndex] = useState(0)
  let [appointments, setAppointments] = useState([])

  useEffect(() => {
    getAppointments().then(setAppointments)
  }, [])

  function renderAppointmentList() {
    const appointmentList = {
      0: <AppointmentList>{renderAppointments('date')}</AppointmentList>,
      1: <AppointmentList>{renderAppointments('time')}</AppointmentList>,
      2: <AppointmentList>{renderAppointments('clinic')}</AppointmentList>
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

  function renderAppointments(sortByProp = 'date') {
    let sortedAppointments
    if (sortByProp === 'date') {
      sortedAppointments = appointments.slice().sort((a, b) => {
        return new Date(a.appointmentDate) - new Date(b.appointmentDate)
      })
    } else if (sortByProp === 'time') {
      sortedAppointments = appointments.slice().sort((a, b) => {
        return (
          new Date(a.appointmentDate).getHours() -
          new Date(b.appointmentDate).getHours()
        )
      })
    } else if (sortByProp === 'clinic') {
      sortedAppointments = appointments.slice().sort((a, b) => {
        return a.clinic > b.clinic
      })
    }

    return sortedAppointments.map(appointment => (
      <Appointment key={appointment._id} {...appointment} />
    ))
  }
}

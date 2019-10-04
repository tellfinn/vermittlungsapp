import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { getAppointments } from './services'
import Page from '../common/Page'
import AppointmentList from './AppointmentList'
import Appointment from './Appointment'
import SortByBar from './SortByBar'

export default function AppointmentPage() {
  let [appointments, setAppointments] = useState([])

  useEffect(() => {
    getAppointments().then(setAppointments)
  }, [])

  return (
    <Page>
      <SortByBar handleSortClick={handleSortBtnClick} />
      <AppointmentList>{renderAppointments('date')}</AppointmentList>
    </Page>
  )

  function handleSortBtnClick(sortBy) {
    console.log('bin da')
    return <AppointmentList>{renderAppointments(sortBy)}</AppointmentList>
  }

  function renderAppointments(sortByProp = 'date') {
    let sortedAppointments
    if (sortByProp === 'date') {
      sortedAppointments = appointments.slice().sort((a, b) => {
        return new Date(a.date) - new Date(b.date)
      })
    } else if (sortByProp === 'time') {
      sortedAppointments = appointments.slice().sort((a, b) => {
        return new Date(a.date).getHours() - new Date(b.date).getHours()
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

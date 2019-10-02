import React from 'react'
import Page from '../common/Page'
import AppointmentList from './AppointmentList'
import SortByBar from './SortByBar'

export default function AppointmentPage() {
  return (
    <Page>
      <SortByBar />
      <AppointmentList></AppointmentList>
    </Page>
  )
}

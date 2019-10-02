import React, { useEffect, useState } from 'react'
import GlobalStyles from './GlobalStyles'
import Header from './common/Header'
import AppointmentPage from './appointments/AppointmentPage'

function App() {
  return (
    <React.Fragment>
      <GlobalStyles></GlobalStyles>
      <Header />
      <AppointmentPage />
    </React.Fragment>
  )
}

export default App

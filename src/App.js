import React from 'react'
import GlobalStyles from './GlobalStyles'
import Header from './common/Header'
import AppointmentInputForm from './appointmentinput/AppointmentInputForm'
//import AppointmentPage from './appointments/AppointmentPage'

function App() {
  return (
    <React.Fragment>
      <GlobalStyles></GlobalStyles>
      <Header />
      <AppointmentInputForm />
    </React.Fragment>
  )
}

export default App

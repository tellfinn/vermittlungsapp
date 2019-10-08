import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import GlobalStyles from './GlobalStyles'
import Header from './common/Header'
import AppointmentInputForm from './appointmentinput/AppointmentInputForm'
import AppointmentPage from './appointments/AppointmentPage'

function App() {
  return (
    <Router>
      <GlobalStyles></GlobalStyles>
      <Header />
      <Switch>
        <Route
          path='/appointments'
          render={() => <AppointmentPage title='Terminübersicht' />}
        />
        <Route
          path='/appointments'
          render={() => <AppointmentPage title='Terminübersicht' />}
        />
        <Route
          path='/newAppointment'
          render={() => (
            <AppointmentInputForm title='Terminanfrage erstellen' />
          )}
        />
      </Switch>
    </Router>
  )
}

export default App

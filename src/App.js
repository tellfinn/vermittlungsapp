import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import GlobalStyles from './GlobalStyles'
import Header from './common/Header'
import AppointmentInputForm from './appointmentinput/AppointmentInputForm'
import AppointmentPage from './appointments/AppointmentPage'
import FollowUpForm from './appointmentinput/FollowUpForm'

function App() {
  return (
    <Router>
      <GlobalStyles></GlobalStyles>
      <Header />
      <Switch>
        <Route
          exact
          path='/'
          render={() => <AppointmentPage requestAccepted={null} />}
        />
        <Route
          path='/appointments'
          render={() => <AppointmentPage requestAccepted={true} />}
        />
        <Route
          path='/newAppointment'
          render={() => (
            <AppointmentInputForm title='Terminanfrage erstellen' />
          )}
        />
        <Route path='/followup' render={() => <FollowUpForm />} />
      </Switch>
    </Router>
  )
}

export default App

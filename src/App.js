import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import GlobalStyles from './GlobalStyles'
import Header from './common/Header'
import AppointmentInputForm from './appointmentinput/AppointmentInputForm'
import AppointmentPage from './appointments/AppointmentPage'
import SignUpForm from './users/signup/SignUpForm'
import LogIn from './users/login/LogInForm'
import { Redirect } from 'react-router-dom'

import { getLanguages } from '../src/appointmentinput/services'

function App() {
  const [languages, setLanguages] = useState([])
  // eslint-disable-next-line
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    getLanguages().then(setLanguages)
  }, [])

  const languageOptions = languages
    .map(language => ({ value: language.name, label: language.name }))
    .sort((a, b) => {
      return a.value > b.value
    })

  return (
    <Router>
      <GlobalStyles></GlobalStyles>
      <Header />
      <Switch>
        <Redirect exact from='/' to='/request' />
        <Route
          path='/request'
          render={() => (
            <AppointmentPage
              requestAccepted={null}
              period='present'
              languages={languageOptions}
            />
          )}
        />
        <Route
          path='/appointments'
          render={() => (
            <AppointmentPage
              requestAccepted={true}
              period='present'
              languages={languageOptions}
            />
          )}
        />
        <Route
          path='/pastappointments'
          render={() => (
            <AppointmentPage
              requestAccepted={true}
              period='past'
              languages={languageOptions}
            />
          )}
        />
        <Route
          path='/newAppointment'
          render={() => (
            <AppointmentInputForm
              title='Terminanfrage erstellen'
              setAppointments={setAppointments}
            />
          )}
        />
        <Route
          path='/signUp'
          render={() => <SignUpForm languages={languageOptions} />}
        />
        <Route path='/login' render={() => <LogIn />} />
      </Switch>
    </Router>
  )
}

export default App

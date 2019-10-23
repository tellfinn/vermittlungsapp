import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { getFromStorage, deleteFromStorage } from './users/utils'
import { getLanguages } from '../src/appointmentinput/services'
import GlobalStyles from './GlobalStyles'
import Header from './common/Header'
import AppointmentInputForm from './appointmentinput/AppointmentInputForm'
import AppointmentPage from './appointments/AppointmentPage'
import SignUpForm from './users/signup/SignUpForm'
import LogIn from './users/login/LogInForm'
import ProtectedRoute from './users/ProtectedRoute'

function App() {
  const [languages, setLanguages] = useState([])
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [token, setToken] = useState('')

  useEffect(() => {
    getLanguages().then(setLanguages)
  }, [])

  useEffect(() => {
    const obj = getFromStorage('Dolmetschervermittlung')

    if (obj && obj.token > 0) {
      fetch('/users/verify?token=' + token).then(res => {
        if (res) {
          setToken(obj)
          setLoggedIn(true)
          console.log('bin da')
        } else {
          setLoggedIn(false)
        }
      })
    } else {
      setLoggedIn(false)
    }
    console.log(isLoggedIn)
    // eslint-disable-next-line
  }, [])

  const languageOptions = languages
    .map(language => ({ value: language.name, label: language.name }))
    .sort((a, b) => {
      return a.value > b.value
    })

  return (
    <Router>
      <GlobalStyles></GlobalStyles>
      <Header handleLogoutClick={logout} isLoggedIn={isLoggedIn} />
      <Switch>
        {isLoggedIn === true ? (
          <Redirect exact from='/' to='/request' />
        ) : (
          <Redirect exact from='/' to='/login' />
        )}
        <ProtectedRoute
          path='/request'
          loggedIn={isLoggedIn}
          component={
            <AppointmentPage
              requestAccepted={null}
              period='present'
              languages={languageOptions}
            />
          }
        />

        <ProtectedRoute
          path='/appointments'
          loggedIn={isLoggedIn}
          component={
            <AppointmentPage
              requestAccepted={true}
              period='present'
              languages={languageOptions}
            />
          }
        />

        <ProtectedRoute
          path='/pastappointments'
          loggedIn={isLoggedIn}
          component={
            <AppointmentPage
              requestAccepted={true}
              period='past'
              languages={languageOptions}
            />
          }
        />

        <ProtectedRoute
          path='/newAppointment'
          loggedIn={isLoggedIn}
          component={<AppointmentInputForm title='Terminanfrage erstellen' />}
        />

        <ProtectedRoute
          path='/appointments'
          loggedIn={isLoggedIn}
          component={
            <AppointmentPage
              requestAccepted={true}
              period='present'
              languages={languageOptions}
            />
          }
        />

        <Route
          path='/signUp'
          render={() => <SignUpForm languages={languageOptions} />}
        />
        <Route
          path='/login'
          render={() => (
            <LogIn
              setLoggedIn={setLoggedIn}
              isLoggedIn={isLoggedIn}
              setToken={setToken}
              token={token}
            />
          )}
        />
      </Switch>
    </Router>
  )

  function logout() {
    const obj = getFromStorage('Dolmetschervermittlung')
    if (token && obj.token) {
      console.log(token)
      fetch('users/logout?token=' + token)
        .then(res => res.json())
        .then(json => {
          console.log('json', json) //console log if logout successfull
          if (json.success) {
            setToken('')
            deleteFromStorage('Dolmetschervermittlung')
            setLoggedIn(false)
          } else {
            setLoggedIn(false)
          }
        })
    } else {
      setLoggedIn(false)
    }
  }
}

export default App

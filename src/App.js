import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import { useLocation } from 'react-use'
import { getFromStorage, deleteFromStorage } from './users/utils'
import { getLanguages } from '../src/appointmentinput/services'
import GlobalStyles from './GlobalStyles'
import Header from './common/Header'
import AppointmentInputForm from './appointmentinput/AppointmentInputForm'
import AppointmentPage from './appointments/AppointmentPage'
import SignUpForm from './users/SignUpForm'
import LogIn from './users/LogInForm'
import ProtectedRoute from './users/ProtectedRoute'

function App() {
  let location = useLocation()

  const [title, setTitle] = useState('')
  const [languages, setLanguages] = useState([])
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [token, setToken] = useState('')
  const [currentUser, setCurrentUser] = useState('')
  const [interpreterLanguages, setInterpreterLanguages] = useState([])
  const [logoutIconBlack, setLogoutIconBlack] = useState(false)

  useEffect(() => {
    getLanguages().then(setLanguages)
  }, [])

  useEffect(() => {
    const titleArray = [
      { route: '/request', title: 'Terminanfragen' },
      { route: '/appointments', title: 'Terminübersicht' },
      { route: '/pastappointments', title: 'vergangene Termine' },
      { route: '/newAppointment', title: 'neuen Termin erstellen' },
      { route: '/signUp', title: 'registrieren' },
      { route: '/login', title: 'einloggen' },
      { route: '', title: 'ausloggen' }
    ]

    location.pathname === '/login' || location.pathname === '/signup'
      ? setLogoutIconBlack(false)
      : setLogoutIconBlack(true)

    try {
      setTitle(
        titleArray.find(item => {
          if (item.route === location.pathname) {
            return item
          }
        }).title
      )
    } catch {
      setTitle('')
    }
  }, [location])

  useEffect(() => {
    const session = getFromStorage('Dolmetschervermittlung')

    if (session && session.token > 0) {
      fetch('/users/verify?token=' + token).then(res => {
        if (res) {
          setToken(session)
          setLoggedIn(true)
        } else {
          setLoggedIn(false)
        }
      })
    } else {
      setLoggedIn(false)
    }
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
      <Header
        handleLogoutClick={logout}
        isLoggedIn={isLoggedIn}
        title={title}
        iconColor={logoutIconBlack}
      />
      <Switch>
        {isLoggedIn ? (
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
              currentUser={currentUser}
              interpreterLanguages={interpreterLanguages}
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
              currentUser={currentUser}
              interpreterLanguages={interpreterLanguages}
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
              currentUser={currentUser}
              interpreterLanguages={interpreterLanguages}
            />
          }
        />

        <ProtectedRoute
          path='/newAppointment'
          loggedIn={isLoggedIn}
          component={
            <AppointmentInputForm
              title='Terminanfrage erstellen'
              currentUser={currentUser}
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
              setCurrentUser={setCurrentUser}
              setInterpreterLanguages={setInterpreterLanguages}
            />
          )}
        />
      </Switch>
    </Router>
  )

  function logout() {
    const session = getFromStorage('Dolmetschervermittlung')
    if (token && session.token) {
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

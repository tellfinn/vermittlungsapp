import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { postUserLogIn } from './sevices'
import { setInStorage, getFromStorage } from '../utils'
import Page from '../../common/Page'

export default function LogInForm() {
  const [isLoading, setIsLoading] = useState(true)
  const [token, setToken] = useState('')
  const [logInError, setLogInError] = useState('')
  const [logInEmail, setLogInEmail] = useState('')
  const [logInPassword, setLogInPassword] = useState('')

  useEffect(() => {
    const obj = getFromStorage('Dolmetschervermittlung')
    if (obj && obj.token) {
      fetch('/users/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            setToken(obj)
            setIsLoading(false)
          } else {
            setIsLoading(false)
          }
        })
    } else {
      setIsLoading(false)
    }
  }, [])

  function onLogIn(event) {
    event.preventDefault()

    const LogInData = {
      email: logInEmail,
      password: logInPassword
    }

    postUserLogIn(LogInData).then(json => {
      console.log('json', json) ////console log if login successfull
      if (json.success) {
        setInStorage('Dolmetschervermittlung', { token: json.token })
        setLogInError(json.message)
        setIsLoading(false)
        setLogInPassword('')
        setLogInEmail('')
        setToken(json.token)
      } else {
        setLogInError(json.message)
        setIsLoading(false)
      }
    })
  }

  return (
    <Page>
      {isLoading ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : (
        <StyledLogInForm onSubmit={onLogIn}>
          <LabelStyled>
            <input
              type='email'
              placeholder='e-Mailadresse'
              value={logInEmail}
              onChange={onTextboxChangeLogInEmail}
            />
          </LabelStyled>
          <LabelStyled>
            <input
              type='password'
              placeholder='Passwort'
              value={logInPassword}
              onChange={onTextboxChangeLogInPassword}
            />
          </LabelStyled>
          <LogInButtonStyled type='submit'>einloggen</LogInButtonStyled>
        </StyledLogInForm>
      )}
      <button onClick={logout}>ausloggen</button>
    </Page>
  )

  function onTextboxChangeLogInEmail(event) {
    setLogInEmail(event.target.value)
  }

  function onTextboxChangeLogInPassword(event) {
    setLogInPassword(event.target.value)
  }

  function logout() {
    setIsLoading(true)
    const obj = getFromStorage('Dolmetschervermittlung')
    if (token && obj.token) {
      fetch('users/logout?token=' + token)
        .then(res => res.json())
        .then(json => {
          console.log('json', json) //console log if logout successfull
          if (json.success) {
            setToken('')
            setIsLoading(false)
          } else {
            setIsLoading(false)
          }
        })
    } else {
      setIsLoading(false)
    }
  }
}

const StyledLogInForm = styled.form`
  margin: 30px;
  display: grid;
  grid-template-rows: auto;
  grid-gap: 30px;
  justify-content: center;
`
const LabelStyled = styled.label`
  display: grid;
  height: 1.2em;
  > input {
    width: 295px;
    font-size: inherit;
  }
`

const LogInButtonStyled = styled.button`
  width: 200px;
  margin: auto;
`

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { fetchUserLogIn } from './sevices'
import { setInStorage, getFromStorage } from '../../common/utils'
import Page from '../../common/Page'

export default function LogInForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [token, setToken] = useState('')
  const [logInError, setLogInError] = useState('')
  const [logInEmail, setLogInEmail] = useState('')
  const [logInPassword, setLogInPassword] = useState('')

  useEffect(() => {
    const obj = getFromStorage('Dolmetschervermittlung')
    if (obj && obj.token) {
      fetch('/verify?token=' + token)
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

    fetchUserLogIn(LogInData).then(json => {
      console.log('json', json)
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
    const obj = getFromStorage('Dolmetschervermittlung')
    if (obj && obj.token) {
      setToken(obj)

      fetch('/logout?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            setToken('')
            setIsLoading(false)
            console.log('if')
          } else {
            setIsLoading(false)
            console.log('else1')
          }
        })
    } else {
      setIsLoading(false)
      console.log('else12')
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

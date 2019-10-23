import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { postUserLogIn } from './sevices'
import { Redirect } from 'react-router-dom'
import { setInStorage } from '../utils'
import Page from '../../common/Page'

LogInForm.propTypes = {
  setLoggedIn: PropTypes.func,
  isLoggedIn: PropTypes.bool
}

export default function LogInForm({ ...props }) {
  // eslint-disable-next-line
  const [logInError, setLogInError] = useState('')
  const [logInEmail, setLogInEmail] = useState('')
  const [logInPassword, setLogInPassword] = useState('')

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
        props.setLoggedIn(true)
        setLogInPassword('')
        setLogInEmail('')
        props.setToken(json.token)
      } else {
        setLogInError(json.message)
        props.setLoggedIn(false)
      }
    })
  }

  return (
    <Page>
      {props.isLoggedIn ? (
        <Redirect to='/' />
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
    </Page>
  )

  function onTextboxChangeLogInEmail(event) {
    setLogInEmail(event.target.value)
  }

  function onTextboxChangeLogInPassword(event) {
    setLogInPassword(event.target.value)
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

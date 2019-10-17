import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { postUser } from './services'

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(true)
  const [token, setToken] = useState('')
  const [signUpError, setSignUpError] = useState('')
  const [signInError, setSignInError] = useState('')
  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')
  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isInterpreter, setIsInterpreter] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [isLoading])

  function onSignUp(event) {
    event.preventDefault()

    const signUpData = {
      email: signUpEmail,
      password: signUpPassword,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      isInterpreter: isInterpreter
    }

    postUser(signUpData).then(json => {
      console.log('json', json)
      if (json.success) {
        setSignUpError(json.message)
        setIsLoading(false)
        setSignUpEmail('')
        setSignUpPassword('')
      } else {
        setSignUpError(json.message)
        setIsLoading(false)
      }
    })
  }

  return (
    <>
      {isLoading ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : (
        <StyledSignUpForm onSubmit={onSignUp}>
          <LabelStyled>
            <input
              type='text'
              placeholder='Vorname'
              onChange={onTextboxChangeFirstName}
            />
          </LabelStyled>
          <LabelStyled>
            <input
              type='text'
              placeholder='Nachname'
              onChange={onTextboxChangeLastName}
            />
          </LabelStyled>
          <label>
            <input
              type='checkbox'
              checked={isInterpreter}
              onChange={() => setIsInterpreter(!isInterpreter)}
            />{' '}
            ich bin Dolmetschende/r
          </label>

          <LabelStyled>
            <input
              type='number'
              placeholder='Telefonnummer'
              onChange={onTextboxChangePhoneNumber}
            />
          </LabelStyled>
          <LabelStyled>
            <input
              type='email'
              placeholder='e-Mailadresse'
              onChange={onTextboxChangeSignUpEmail}
            />
          </LabelStyled>
          <LabelStyled>
            <input
              type='password'
              placeholder='Passwort'
              onChange={onTextboxChangeSignUpPassword}
            />
          </LabelStyled>

          <Registerbutton type='submit'>Registrieren</Registerbutton>
        </StyledSignUpForm>
      )}
    </>
  )

  function onTextboxChangeSignInEmail(event) {
    setSignInEmail(event.target.value)
  }

  function onTextboxChangeSignUpEmail(event) {
    setSignUpEmail(event.target.value)
  }

  function onTextboxChangeSignInPassword(event) {
    setSignInPassword(event.target.value)
  }

  function onTextboxChangeSignUpPassword(event) {
    setSignUpPassword(event.target.value)
  }

  function onTextboxChangeFirstName(event) {
    setFirstName(event.target.value)
  }

  function onTextboxChangeLastName(event) {
    setLastName(event.target.value)
  }

  function onTextboxChangePhoneNumber(event) {
    setPhoneNumber(event.target.value)
  }
}

const StyledSignUpForm = styled.form`
  margin: 10px;
  margin-top: 50px;

  display: grid;
  grid-template-columns: 1;
  grid-gap: 30px;
  align-items: center;
`
const LabelStyled = styled.label`
  display: grid;
  height: 1.2em;
  > input {
    width: 100%;
    font-size: inherit;
  }
`

const Registerbutton = styled.button`
  width: 200px;
  margin: auto;
`

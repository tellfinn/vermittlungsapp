import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { postUser } from './services'
import LanguageOptions from '../../appointmentinput/LanguageOptions'
import { getLanguages } from '../../appointmentinput/services'
import Page from '../../common/Page.js'

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(true)
  const [languages, setLanguages] = useState([])
  const [selectedLanguages, setSelectedLanguages] = useState([])
  const [signUpError, setSignUpError] = useState('')
  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isInterpreter, setIsInterpreter] = useState(false)
  const [signUpRepeatPassword, setSignUpRepeatPassword] = useState('')

  const languageOptions = languages
    .map(language => ({ value: language.name, label: language.name }))
    .sort((a, b) => {
      return a.name > b.name
    })

  useEffect(() => {
    setIsLoading(false)
  }, [isLoading])

  useEffect(() => {
    getLanguages().then(setLanguages)
  }, [])

  function onSignUp(event) {
    event.preventDefault()

    let languages =
      selectedLanguages.length === 0
        ? ''
        : selectedLanguages[0].map(language => {
            return language.value
          })

    const signUpData = {
      email: signUpEmail,
      password: signUpPassword,
      repeatedPassword: signUpRepeatPassword,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      isInterpreter: isInterpreter,
      languages
    }

    postUser(signUpData).then(json => {
      console.log('json', json)
      if (json.success) {
        setSignUpError(json.message)
        setIsLoading(false)
        setSignUpEmail('')
        setSignUpPassword('')
        setFirstName('')
        setLastName('')
        setPhoneNumber('')
        setSelectedLanguages([])
        setSignUpRepeatPassword('')
      } else {
        setSignUpError(json.message)
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
        <StyledSignUpForm onSubmit={onSignUp}>
          <LabelStyled>
            <input
              type='text'
              placeholder='Vorname'
              value={firstName}
              onChange={onTextboxChangeFirstName}
            />
          </LabelStyled>
          <LabelStyled>
            <input
              type='text'
              placeholder='Nachname'
              value={lastName}
              onChange={onTextboxChangeLastName}
            />
          </LabelStyled>
          <label>
            <input
              type='checkbox'
              checked={isInterpreter}
              onChange={onInterpreterChange}
            />{' '}
            ich bin Dolmetschende/r
          </label>
          {isInterpreter && (
            <LanguageOptions
              name='Sprache'
              handleChange={handleLanguageChange}
              selectMultiple={true}
              defaultValue=''
              value={selectedLanguages.value}
              options={languageOptions}></LanguageOptions>
          )}
          <LabelStyled>
            <input
              type='number'
              placeholder='Telefonnummer'
              value={phoneNumber}
              onChange={onTextboxChangePhoneNumber}
            />
          </LabelStyled>
          <LabelStyled>
            <input
              type='email'
              placeholder='e-Mailadresse'
              value={signUpEmail}
              onChange={onTextboxChangeSignUpEmail}
            />
          </LabelStyled>
          <LabelStyled>
            <input
              type='password'
              placeholder='Passwort'
              value={signUpPassword}
              onChange={onTextboxChangeSignUpPassword}
            />
          </LabelStyled>
          <LabelStyled>
            <input
              type='password'
              placeholder='Passwort wiederholen'
              value={signUpRepeatPassword}
              onChange={onTextboxChangeSignUpRepeatPassword}
            />
          </LabelStyled>
          <Registerbutton type='submit'>Registrieren</Registerbutton>
        </StyledSignUpForm>
      )}
    </Page>
  )

  function handleLanguageChange(event) {
    setSelectedLanguages([event, ...selectedLanguages])
  }

  function onInterpreterChange() {
    setIsInterpreter(!isInterpreter)
  }

  function onTextboxChangeSignUpEmail(event) {
    setSignUpEmail(event.target.value)
  }

  function onTextboxChangeSignUpPassword(event) {
    setSignUpPassword(event.target.value)
  }

  function onTextboxChangeSignUpRepeatPassword(event) {
    setSignUpRepeatPassword(event.target.value)
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

const Registerbutton = styled.button`
  width: 200px;
  margin: auto;
`

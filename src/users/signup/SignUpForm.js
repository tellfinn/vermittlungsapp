import React, { useState } from 'react'
import styled from 'styled-components'
import { postUser } from '../services'
import Page from '../../common/Page.js'
import LanguageSelector from '../../appointmentinput/inputFields/LanguageSelector'
import NextButton from '../../common/NextButton'

export default function SignUpForm({ languages }) {
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(true)
  const [selectedLanguages, setSelectedLanguages] = useState([])
  // eslint-disable-next-line
  const [signUpError, setSignUpError] = useState('')
  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isInterpreter, setIsInterpreter] = useState(false)
  const [isSwornIn, setIsSwornIn] = useState(false)
  const [doesWrittenTranslations, setDoesWrittenTranslations] = useState(false)
  const [count, setCount] = useState(0)
  const [showElement, setShowElement] = useState(count)
  const [signUpRepeatPassword, setSignUpRepeatPassword] = useState('')

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
      isSwornIn: isSwornIn,
      writtenTranslations: doesWrittenTranslations,
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
        setDoesWrittenTranslations(false)
        setIsSwornIn(false)
      } else {
        setSignUpError(json.message)
        setIsLoading(false)
      }
    })
  }

  const isRegisterButtonVisible =
    isInterpreter === true
      ? count === 2
        ? true
        : false
      : count === 1
      ? true
      : false

  return (
    <Page>
      <StyledSignUpForm onSubmit={onSignUp}>
        <NextButton
          handleNextBtnClick={showPreviousElement}
          visibility={showElement > 0}
          iconName='previous'
        />
        <Placeholder>
          <Wrapper isVisible={showElement === 0}>
            <LabelStyled>
              <input
                type='text'
                placeholder='Vorname'
                value={firstName}
                onChange={event => setFirstName(event.target.value)}
              />
            </LabelStyled>
            <LabelStyled>
              <input
                type='text'
                placeholder='Nachname'
                value={lastName}
                onChange={event => setLastName(event.target.value)}
              />
            </LabelStyled>
            <label>
              <input
                type='checkbox'
                checked={isInterpreter}
                onChange={() => setIsInterpreter(!isInterpreter)}
              />{' '}
              ich bin Dolmetschende*r
            </label>
          </Wrapper>
          <Wrapper isVisible={showElement === 1}>
            <LabelStyled>
              <input
                type='number'
                placeholder='Telefonnummer'
                value={phoneNumber}
                onChange={event => setPhoneNumber(event.target.value)}
              />
            </LabelStyled>
            <LabelStyled>
              <input
                type='email'
                placeholder='e-Mailadresse'
                value={signUpEmail}
                onChange={event => setSignUpEmail(event.target.value)}
              />
            </LabelStyled>
            <LabelStyled>
              <input
                type='password'
                placeholder='Passwort'
                value={signUpPassword}
                onChange={event => setSignUpPassword(event.target.value)}
              />
            </LabelStyled>
            <LabelStyled>
              <input
                type='password'
                placeholder='Passwort wiederholen'
                value={signUpRepeatPassword}
                onChange={event => setSignUpRepeatPassword(event.target.value)}
              />
            </LabelStyled>
          </Wrapper>
          <Wrapper isVisible={showElement === 2}>
            {isInterpreter && (
              <>
                <LanguageSelector
                  name='Sprache'
                  handleChange={event =>
                    setSelectedLanguages([event, ...selectedLanguages])
                  }
                  selectMultiple={true}
                  defaultValue=''
                  value={selectedLanguages.value}
                  options={languages}
                />
                <label>
                  <input
                    type='checkbox'
                    checked={isSwornIn}
                    onChange={event => setIsSwornIn(!isSwornIn)}
                  />{' '}
                  vereidigt
                </label>
                <label>
                  <input
                    type='checkbox'
                    checked={doesWrittenTranslations}
                    onChange={() =>
                      setDoesWrittenTranslations(!doesWrittenTranslations)
                    }
                  />{' '}
                  ich mache auch schriftliche Übersetzungen
                </label>{' '}
              </>
            )}
          </Wrapper>
          <Registerbutton
            type='submit'
            registerBtnVisibility={isRegisterButtonVisible}>
            Registrieren
          </Registerbutton>
        </Placeholder>
        <NextButton
          iconName='next'
          handleNextBtnClick={showNextElement}
          visibility={
            isInterpreter === true ? showElement < 2 : showElement < 1
          }
        />
      </StyledSignUpForm>
    </Page>
  )

  function showNextElement() {
    setCount(count + 1)
    setShowElement(count + 1)
  }

  function showPreviousElement() {
    setCount(count => count - 1)
    setShowElement(count - 1)
  }
}

const Placeholder = styled.div`
  position: relative;
  display: grid;
  height: 420px;
  margin-top: 130px;
`

const Wrapper = styled.div`
  position: absolute;
  display: ${props => (props.isVisible ? 'grid' : 'none')};
  grid-row-gap: 40px;
  width: 100%;
  right: -360px;
  -webkit-animation: slide 0.5s forwards;
  -webkit-animation-delay: 0.1s;
  animation: slide 0.5s forwards;
  animation-delay: 0.1s;

  @-webkit-keyframes slide {
    100% {
      right: 0;
    }
  }

  @keyframes slide {
    100% {
      right: 0;
    }
  }
`

const StyledSignUpForm = styled.form`
  display: grid;
  overflow: hidden;
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
  position: absolute;
  bottom: 40px;
  left: calc(50% - 100px);
  width: 200px;
  margin: auto;
  ${props => (props.registerBtnVisibility === false ? 'display: none' : '')};
`

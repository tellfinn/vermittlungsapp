import React, { useState } from 'react'
import styled from 'styled-components/macro'
import Page from '../common/Page'
import LanguageOptions from './LanguageOptions'
import MyDatepicker from './Datepicker'
import { postAppointment } from '../appointments/services'
import { useHistory } from 'react-router-dom'
import SubmitButton from '../common/SubmitButton'
import NextButton from '../common/NextButton'

export default function AppointmentInputForm({ languages, setAppointments }) {
  let history = useHistory()
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [
    selectedAlternativeLanguage,
    setSelectedAlternativeLanguage
  ] = useState('')
  const [radioBtnValue, setRadioBtnValue] = useState('UKE')
  const [date, setDate] = useState(Date.now())
  const [message, setMessage] = useState('')
  const [favoritesChecked, setFavoritesChecked] = useState(false)
  const [writtenTranslationChecked, setWrittenTranslationChecked] = useState(
    false
  )
  const [swornInChecked, setSwornInChecked] = useState(false)
  const [count, setCount] = useState(0)
  const [showElement, setShowElement] = useState(count)

  function handleSubmit(event) {
    event.preventDefault()

    const form = event.target
    const formData = new FormData(form)
    const appLanguage = selectedLanguage.value
    const alternativeAppLanguage = selectedAlternativeLanguage.value
    let appointmentDate = new Date(date)
    let data = Object.fromEntries(formData)
    data = {
      ...data,
      appointmentDate,
      appLanguage,
      alternativeAppLanguage,
      acceptedByInterpreter: null,
      openAppointment: true
    }
    postAppointment(data)
      .then(setAppointments)
      .then(history.push('/request'))
  }

  function resetForm() {
    setSelectedLanguage('')
    setSelectedAlternativeLanguage('')
    setRadioBtnValue('UKE')
    setDate(Date.now())
    setCount(0)
    setShowElement(count)
  }

  function handleAbortClick(event) {
    event.preventDefault()
    resetForm()
  }

  return (
    <Page>
      <AppointmentInputFormStyled onSubmit={handleSubmit}>
        <NextButton
          handleNextBtnClick={showPreviousElement}
          visibility={showElement > 0}
          iconName='previous'
        />
        <Placeholder>
          <Wrapper isVisible={showElement === 0}>
            <LanguageOptions
              name='Sprache'
              handleChange={event => {
                setSelectedLanguage(event)
              }}
              options={languages}
              value={selectedLanguage}
            />
            <LanguageOptions
              name='Alternativsprache'
              options={languages}
              handleChange={event => setSelectedAlternativeLanguage(event)}
              value={selectedAlternativeLanguage}
            />
          </Wrapper>
          <Wrapper isVisible={showElement === 1}>
            <label>
              <input
                type='checkbox'
                name='favorites'
                checked={favoritesChecked}
                onChange={() => setFavoritesChecked(!favoritesChecked)}
              />{' '}
              nur an Favoriten
            </label>
            <label>
              <input
                type='checkbox'
                name='writtenTranslation'
                onChange={() =>
                  setWrittenTranslationChecked(!writtenTranslationChecked)
                }></input>{' '}
              schriftliche Übersetzung
            </label>
            <label>
              <input
                type='checkbox'
                name='swornIn'
                onChange={() =>
                  setSwornInChecked(!swornInChecked)
                }></input>{' '}
              vereidigt
            </label>
          </Wrapper>
          <Wrapper isVisible={showElement === 2}>
            <MyDatepicker
              name='date'
              date={date}
              onChange={value => setDate(value)}></MyDatepicker>

            <label>
              voraussichtliche Dauer:{' '}
              <input
                name='duration'
                type='number'
                min='0.25'
                step='0.25'
                lang='nb'
                placeholder='0.25 Std = 15 Min'></input>
            </label>
          </Wrapper>
          <Wrapper isVisible={showElement === 3}>
            <RadioBtnAreaStyled>
              <label>
                <input
                  type='radio'
                  name='clinic'
                  value='UKE'
                  checked={radioBtnValue === 'UKE'}
                  onChange={handleRadioChange}
                />
                UKE
              </label>
              <label>
                <input
                  type='radio'
                  name='clinic'
                  value='AKK'
                  checked={radioBtnValue === 'AKK'}
                  onChange={handleRadioChange}
                />
                AKK
              </label>
              <label>
                <input
                  type='radio'
                  name='clinic'
                  value='PNZ'
                  checked={radioBtnValue === 'PNZ'}
                  onChange={handleRadioChange}
                />
                PNZ
              </label>
            </RadioBtnAreaStyled>
            <label>
              <input
                type='text'
                name='station'
                placeholder='Station, Gebäude'></input>
            </label>
            <label>
              <input
                type='text'
                name='contact'
                placeholder='Ansprechpartner'></input>
            </label>
            <label>
              <input
                type='number'
                name='extension'
                placeholder='Durchwahl'></input>
            </label>
          </Wrapper>
          <Wrapper isVisible={showElement === 4}>
            <label>
              <MessageField
                placeholder='weitere Informationen'
                name='message'
                value={message}
                onChange={event => setMessage(event.value)}></MessageField>
            </label>
            <RadioBtnAreaStyled>
              <SubmitButton text='absenden' type='submit' />
              <SubmitButton text='verwerfen' handleClick={handleAbortClick} />
            </RadioBtnAreaStyled>
          </Wrapper>
        </Placeholder>
        <NextButton
          iconName='next'
          handleNextBtnClick={showNextElement}
          visibility={showElement < 4}
        />
      </AppointmentInputFormStyled>
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

  function handleRadioChange(event) {
    setRadioBtnValue(event.target.value)
  }
}

const AppointmentInputFormStyled = styled.form`
  display: grid;
  overflow: hidden;
`

const Placeholder = styled.div`
  position: relative;
  display: grid;
  grid-gap: 20px;
  height: 420px;
  margin-top: 130px;
`

const Wrapper = styled.div`
  position: absolute;
  display: ${props => (props.isVisible ? 'grid' : 'none')};
  grid-gap: 20px;
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

const RadioBtnAreaStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const MessageField = styled.textarea`
  min-height: 100px;
`

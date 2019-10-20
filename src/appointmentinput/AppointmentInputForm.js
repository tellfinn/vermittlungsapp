import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import Page from '../common/Page'
import LanguageOptions from './LanguageOptions'
import MyDatepicker from './Datepicker'
import { postAppointment } from '../appointments/services'
import SubmitButton from '../common/SubmitButton'
import { getLanguages } from './services'
import NextButton from '../common/NextButton'

export default function AppointmentInputForm() {
  const [languages, setLanguages] = useState([])
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

  useEffect(() => {
    getLanguages().then(setLanguages)
  }, [])

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
  }

  function handleAbortClick(event) {
    event.preventDefault()
    setLanguages([])
    setSelectedLanguage('')
    setSelectedAlternativeLanguage('')
    setRadioBtnValue('UKE')
    setDate(Date.now())
    setCount(0)
    setShowElement(count)
  }

  const languageOptions = languages
    .map(language => ({ value: language.name, label: language.name }))
    .sort((a, b) => {
      return a.name > b.name
    })

  const alternativeLanguageOptions = languageOptions

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
              handleChange={handleLanguageChange}
              options={languageOptions}
              value={selectedLanguage}
            />
            <LanguageOptions
              name='Alternativsprache'
              options={alternativeLanguageOptions}
              handleChange={handleAlternativeLanguageChange}
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
              onChange={handleDateChange}></MyDatepicker>

            <LabelStyled>
              voraussichtliche Dauer:{' '}
              <input
                name='duration'
                type='number'
                min='0.25'
                step='0.25'
                lang='nb'
                placeholder='0.25 Std = 15 Min'></input>
            </LabelStyled>
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
            <LabelStyled>
              <input
                type='text'
                name='station'
                placeholder='Station, Gebäude'></input>
            </LabelStyled>
            <LabelStyled>
              <input
                type='text'
                name='contact'
                placeholder='Ansprechpartner'></input>
            </LabelStyled>
            <LabelStyled>
              <input
                type='number'
                name='extension'
                placeholder='Durchwahl'></input>
            </LabelStyled>
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

  function handleLanguageChange(event) {
    setSelectedLanguage(event)
  }

  function handleAlternativeLanguageChange(event) {
    setSelectedAlternativeLanguage(event)
  }

  function handleDateChange(value) {
    setDate(value)
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

const LabelStyled = styled.label`
  > input {
    width: 100%;
    padding: 8px;
    border-radius: 3px;
    border: 1px solid #cccccc;
    font-size: 18px;
  }
`

const MessageField = styled.textarea`
  min-height: 100px;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #cccccc;
  padding: 8px;
  font-family: inherit;
  font-size: inherit;
  font-weight: lighter;
`

//event.setHours(01,20) - event2.setTime(event1.getTime())

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
    /*  setSelectedLanguage('')
    setSelectedAlternativeLanguage('')
    setDate(Date.now())*/
    form.reset()
  }

  function handleAbortClick(event) {
    event.preventDefault()
    const form = event.target
    form.reset()
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
        />
        <Placeholder>
          <Wrapper isVisible={showElement === 0}>
            <LanguageOptions
              name='Sprache'
              handleChange={handleLanguageChange}
              options={languageOptions}
            />
            <LanguageOptions
              name='Alternativsprache'
              options={alternativeLanguageOptions}
              handleChange={handleAlternativeLanguageChange}
            />
          </Wrapper>
          <Wrapper isVisible={showElement === 1}>
            <label>
              <input type='checkbox' name='favorites' /> nur an Favoriten
            </label>
            <label>
              <input type='checkbox' name='writtenTranslation'></input>{' '}
              schriftliche Übersetzung
            </label>
            <label>
              <input type='checkbox' name='swornIn'></input> vereidigt
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
                lang='nb'></input>
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
              Station, Gebäude:
              <input type='text' name='station'></input>
            </LabelStyled>
            <LabelStyled>
              Ansprechpartner:
              <input type='text' name='contact'></input>
            </LabelStyled>
            <LabelStyled>
              Durchwahl:
              <input type='number' name='extension'></input>
            </LabelStyled>
          </Wrapper>
          <Wrapper isVisible={showElement === 4}>
            <label>
              <MessageField
                type='textarea'
                placeholder='weitere Informationen'
                name='message'></MessageField>
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
  justify-content: center;
  overflow: hidden;
`

const Placeholder = styled.div`
  position: relative;
  display: grid;
  grid-gap: 20px;
  justify-content: center;
  align-items: auto;
  height: 420px;
  width: 355px;
  margin-top: 50px;
`

const Wrapper = styled.div`
  position: absolute;
  display: ${props => (props.isVisible ? 'grid' : 'none')};
  grid-gap: 20px;
  width: 100%;
  top: 120px;
  right: -360px;
  -webkit-animation: slide 0.5s forwards;
  -webkit-animation-delay: 0.3s;
  animation: slide 0.5s forwards;
  animation-delay: 0.3s;

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
  display: grid;
  grid-template-columns: 60% auto;

  > input {
    width: 100%;
  }
`

const MessageField = styled.input`
  display: grid;
  align-content: start;
  min-height: 100px;
  width: 100%;
  font-size: 1em;
`

//event.setHours(01,20) - event2.setTime(event1.getTime())

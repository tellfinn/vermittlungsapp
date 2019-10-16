import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import LanguageOptions from './LanguageOptions'
import MyDatepicker from './Datepicker'
import { postAppointment } from '../appointments/services'
import SubmitButton from '../common/SubmitButton'
import { getLanguages } from './services'

export default function FollowUpForm({
  aptLanguage,
  aptClinic,
  aptStation,
  aptDuration,
  aptContact,
  aptExtension,
  handleAbortClick
}) {
  const [languages, setLanguages] = useState([])
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [radioBtnValue, setRadioBtnValue] = useState(aptClinic)
  const [duration, setDuration] = useState(aptDuration)
  const [isInterpreterAvailable, setIsInterpreterAvailable] = useState(true)
  let [textInput, setTextInput] = useState('')
  const [date, setDate] = useState(Date.now())
  const [wrongLanguage, setWrongLanguage] = useState(false)

  const languageOptions = languages
    .map(language => ({ value: language.name, label: language.name }))
    .sort((a, b) => {
      return a.name > b.name
    })

  useEffect(() => {
    getLanguages().then(setLanguages)
  }, [])

  const appointmentLanguage = languageOptions.find(language => {
    return language.value === aptLanguage
  })

  useEffect(() => {
    setSelectedLanguage(appointmentLanguage)
  }, [])

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)
    const appLanguage =
      selectedLanguage === undefined
        ? appointmentLanguage.value
        : selectedLanguage.value
    let appointmentDate = new Date(date)
    let data = Object.fromEntries(formData)
    data = {
      ...data,
      appointmentDate,
      appLanguage,
      acceptedByInterpreter: isInterpreterAvailable,
      openAppointment: !isInterpreterAvailable
    }
    postAppointment(data)
    handleAbortClick()
  }

  return (
    <FollowUpFormFormStyled onSubmit={handleSubmit}>
      <label>
        <input
          type='checkbox'
          name='availability'
          checked={!wrongLanguage}
          onChange={() => setWrongLanguage(!wrongLanguage)}
        />{' '}
        Sprache korrekt
      </label>

      {wrongLanguage && (
        <LanguageOptions
          name='Sprache'
          handleChange={handleLanguageChange}
          options={languageOptions}
          value={selectedLanguage}
          defaultValue={appointmentLanguage}></LanguageOptions>
      )}

      <MyDatepicker
        name='date'
        date={date}
        onChange={handleDateChange}></MyDatepicker>

      <label>
        <input
          type='checkbox'
          name='availability'
          checked={isInterpreterAvailable}
          onChange={toggleAvailability}
        />{' '}
        bin verfügbar
      </label>

      <LabelStyled>
        voraussichtliche Dauer:{' '}
        <input
          name='duration'
          type='number'
          min='0.25'
          step='0.25'
          lang='nb'
          defaultValue={duration}
          onChange={setDuration}></input>
      </LabelStyled>
      <StyleArea>
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
      </StyleArea>

      <LabelStyled>
        Station, Gebäude:
        <input
          type='text'
          name='station'
          defaultValue={aptStation}
          onChange={event => setTextInput(event.target.value)}
        />
      </LabelStyled>
      <LabelStyled>
        Ansprechpartner:
        <input
          type='text'
          name='contact'
          defaultValue={aptContact}
          onChange={event => setTextInput(event.target.value)}
        />
      </LabelStyled>
      <LabelStyled>
        Durchwahl:
        <input
          type='number'
          name='extension'
          defaultValue={aptExtension}
          onChange={event => setTextInput(event.target.value)}
        />
      </LabelStyled>

      <label>
        <MessageField
          type='textarea'
          placeholder='weitere Informationen'
          name='message'></MessageField>
      </label>
      <StyleArea>
        <SubmitButton text='absenden' type='submit' />
        <SubmitButton text='verwerfen' handleClick={handleAbortClick} />
      </StyleArea>
    </FollowUpFormFormStyled>
  )

  function handleLanguageChange(event) {
    setSelectedLanguage(event)
  }

  function handleDateChange(value) {
    setDate(value)
  }

  function handleRadioChange(event) {
    setRadioBtnValue(event.target.value)
  }

  function toggleAvailability(event) {
    event.stopPropagation()
    setIsInterpreterAvailable(!isInterpreterAvailable)
  }
}

const FollowUpFormFormStyled = styled.form`
  position: absolute;
  top: 50px;
  display: grid;
  grid-gap: 20px;
  min-height: 90vh;
  max-width: 95%;
  padding: 10px;
  background-color: var(--greyish);
  z-index: 20;
`

const StyleArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const LabelStyled = styled.label`
  display: grid;
  grid-template-columns: 60% auto;
  height: 1.2em;
  > input {
    width: 100%;
  }
`

const MessageField = styled.input`
  height: 100px;
  width: 100%;
  font-size: 1em;
`

//event.setHours(01,20) - event2.setTime(event1.getTime())

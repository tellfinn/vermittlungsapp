import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import Page from '../common/Page'
import LanguageOptions from './LanguageOptions'
import MyDatepicker from './Datepicker'
import { postAppointment } from '../appointments/services'
import SubmitButton from '../common/SubmitButton'
import { getLanguages } from './services'

export default function AppointmentInputForm() {
  const [languages, setLanguages] = useState([])
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [
    selectedAlternativeLanguage,
    setSelectedAlternativeLanguage
  ] = useState('no language selected')
  const [radioBtnValue, setRadioBtnValue] = useState('UKE')
  const [date, setDate] = useState(Date.now())

  useEffect(() => {
    getLanguages().then(setLanguages)
  }, [])

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)
    const appLanguage = selectedLanguage[0].value
    const alternativeAppLanguage = selectedAlternativeLanguage[0].value
    let appointmentDate = new Date(date)
    let data = Object.fromEntries(formData)
    data = {
      ...data,
      appointmentDate,
      appLanguage,
      alternativeAppLanguage,
      acceptedByInterpreter: false,
      acceptedByOtherInterpreter: false
    }
    postAppointment(data)
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
        <LanguageOptions
          name='Sprache'
          handleChange={handleLanguageChange}
          options={languageOptions}></LanguageOptions>
        <LanguageOptions
          name='Alternativsprache'
          options={alternativeLanguageOptions}
          handleChange={handleAlternativeLanguageChange}></LanguageOptions>
        <label>
          <input type='checkbox' name='favorites' /> nur an Favoriten
        </label>
        <label>
          <input type='checkbox' name='writtenTranlation'></input> schriftliche
          Übersetzung
        </label>
        <label>
          <input type='checkbox' name='swornIn'></input> vereidigt
        </label>

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
        <label>
          <MessageField
            type='textarea'
            placeholder='weitere Informationen'
            name='message'></MessageField>
        </label>
        <StyleArea>
          <SubmitButton text='abschicken' type='submit' />
          <SubmitButton text='verwerfen' handleClick={handleAbortClick} />
        </StyleArea>
      </AppointmentInputFormStyled>
    </Page>
  )

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
  grid-gap: 20px;
  padding: 10px;
`

const StyleArea = styled.div`
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
  height: 100px;
  width: 100%;
  font-size: 1em;
`

//event.setHours(01,20) - event2.setTime(event1.getTime())

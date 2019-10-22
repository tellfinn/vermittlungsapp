import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import LanguageOptions from './LanguageOptions'
import MyDatepicker from './Datepicker'
import { postAppointment } from '../appointments/services'
import SubmitButton from '../common/SubmitButton'

EditForm.propTypes = {
  appointmentLanguage: PropTypes.string,
  aptClinic: PropTypes.string,
  aptStation: PropTypes.string,
  aptDuration: PropTypes.string,
  aptContact: PropTypes.string,
  aptExtension: PropTypes.number,
  handleAbortClick: PropTypes.func,
  languages: PropTypes.array,
  handleEditSubmit: PropTypes.func
}

export default function EditForm({ handleEditSubmit, languages, ...props }) {
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [radioBtnValue, setRadioBtnValue] = useState(props.aptClinic)
  const [duration, setDuration] = useState(props.aptDuration)
  const [isInterpreterAvailable, setIsInterpreterAvailable] = useState(true)
  // eslint-disable-next-line
  let [textInput, setTextInput] = useState('')
  const [date, setDate] = useState({})
  const [wrongLanguage, setWrongLanguage] = useState(false)

  let appointmentLanguage = languages.find(language => {
    return language.value === props.language
  })

  useEffect(() => {
    setSelectedLanguage(appointmentLanguage)
    // eslint-disable-next-line
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
      .then(props.handleAbortClick)
      .then(props.setAptState())
  }

  return (
    <EditFormStyled onSubmit={handleSubmit}>
      <label>
        <input
          type='checkbox'
          name='availability'
          checked={wrongLanguage}
          onChange={() => setWrongLanguage(!wrongLanguage)}
        />{' '}
        Sprache ändern
      </label>

      {wrongLanguage && (
        <LanguageOptions
          name='Sprache'
          handleChange={handleLanguageChange}
          options={languages}
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
          onChange={() => setIsInterpreterAvailable(!isInterpreterAvailable)}
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
          defaultValue={props.aptStation}
          onChange={event => setTextInput(event.target.value)}
        />
      </LabelStyled>
      <LabelStyled>
        Ansprechpartner:
        <input
          type='text'
          name='contact'
          defaultValue={props.aptContact}
          onChange={event => setTextInput(event.target.value)}
        />
      </LabelStyled>
      <LabelStyled>
        Durchwahl:
        <input
          type='number'
          name='extension'
          defaultValue={props.aptExtension}
          onChange={event => setTextInput(event.target.value)}
        />
      </LabelStyled>

      <label>
        <textarea placeholder='weitere Informationen' name='message'></textarea>
      </label>
      <StyleArea>
        <SubmitButton text='absenden' type='submit' />
        <SubmitButton text='verwerfen' handleClick={props.handleAbortClick} />
      </StyleArea>
    </EditFormStyled>
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
}

const EditFormStyled = styled.form`
  position: fixed;
  top: 50px;
  bottom: 10px;
  display: grid;
  grid-gap: 20px;
  margin: auto;
  outline: 1px solid white;
  max-width: 95%;
  padding: 10px;
  background-color: var(--background-white);
  box-shadow: var(--shadow);
  outline: 1px solid var(--darkblueish);
  overflow-y: scroll;
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
    padding: 5px;
  }
`

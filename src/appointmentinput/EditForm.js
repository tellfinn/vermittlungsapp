import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import LanguageSelector from './inputFields/LanguageSelector'
import MyDatepicker from './inputFields/Datepicker'
import Checkbox from './inputFields/Checkbox'
import NumberInput from './inputFields/NumberInput'
import TextInput from './inputFields/TextInput'
import RadioBtnArea from './inputFields/RadioBtnArea'
import MessageField from './inputFields/MessageField'
import SubmitButton from '../common/SubmitButton'

EditForm.propTypes = {
  appointmentLanguage: PropTypes.string,
  aptClinic: PropTypes.string,
  aptStation: PropTypes.string,
  aptDuration: PropTypes.number,
  aptContact: PropTypes.string,
  aptExtension: PropTypes.number,
  handleAbortClick: PropTypes.func,
  languages: PropTypes.array
}

export default function EditForm({
  isFollowUp = false,
  appointment,
  ...props
}) {
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [radioBtnValue, setRadioBtnValue] = useState(appointment.clinic)
  const [duration, setDuration] = useState(appointment.duration)
  const [isInterpreterAvailable, setIsInterpreterAvailable] = useState(true)
  // eslint-disable-next-line
  const [textInput, setTextInput] = useState('')
  const [date, setDate] = useState(new Date(appointment.appointmentDate))
  const [wrongLanguage, setWrongLanguage] = useState(false)
  const [message, setMessage] = useState(appointment.message)

  let appointmentLanguage = props.languages.find(language => {
    return language.value === appointment.appointmentLanguage
  })

  useEffect(() => {
    setSelectedLanguage(appointmentLanguage)
    // eslint-disable-next-line
  }, [])

  function handleSubmit(event) {
    event.preventDefault()

    const form = event.target
    const formData = new FormData(form)
    const appointmentLanguage =
      selectedLanguage === undefined
        ? appointment.appointmentLanguage.value
        : selectedLanguage.value
    let appointmentDate = new Date(date)
    const sentBy = isFollowUp
      ? appointment.sentBy
      : appointment.sentBy.length > 0
      ? appointment.sentBy
      : props.currentUser
    const showToInterpreter = isInterpreterAvailable ? props.currentUser : ''

    let data = Object.fromEntries(formData)

    data = {
      ...data,
      appointmentDate,
      appointmentLanguage,
      showToInterpreter,
      acceptedByInterpreter: isInterpreterAvailable,
      openAppointment: !isInterpreterAvailable,
      _id: props.id,
      sentBy
    }

    isFollowUp === true
      ? props
          .handleEditSubmit(data)
          .then(props.setAptState())
          .then(props.handleAbortClick())
      : props
          .handleEditSubmit(data._id, {
            ...data
          })
          .then(props.setAptState())
          .then(props.handleAbortClick())
  }

  return (
    <EditFormStyled onSubmit={handleSubmit}>
      <Checkbox
        name='wrongLanguage'
        checked={wrongLanguage}
        text=' Sprache ändern'
        onChange={() => setWrongLanguage(!wrongLanguage)}
      />
      {wrongLanguage && (
        <LanguageSelector
          name='Sprache'
          handleChange={event => setSelectedLanguage(event)}
          options={props.languages}
          value={selectedLanguage}
        />
      )}
      <MyDatepicker
        name='date'
        date={date}
        onChange={value => setDate(value)}></MyDatepicker>
      <Checkbox
        name='availability'
        checked={isInterpreterAvailable}
        text={isFollowUp === true ? ' bin verfügbar' : ' gleicher Dolmetscher'}
        onChange={() => setIsInterpreterAvailable(!isInterpreterAvailable)}
      />
      <LabelStyled>
        voraussichtliche Dauer:{' '}
        <NumberInput
          name='duration'
          min='0.25'
          step='0.25'
          defaultValue={duration}
          onChange={event => setDuration(event.target.value)}
        />
      </LabelStyled>
      <RadioBtnArea
        handleRadioChange={event => setRadioBtnValue(event.target.value)}
        radioBtnValue={radioBtnValue}
      />

      <LabelStyled>
        Station, Gebäude:
        <TextInput
          name='station'
          defaultValue={appointment.station}
          onChange={event => setTextInput(event.target.value)}
        />
      </LabelStyled>
      <LabelStyled>
        Ansprechpartner:
        <TextInput
          name='contact'
          defaultValue={appointment.contact}
          onChange={event => setTextInput(event.target.value)}
        />
      </LabelStyled>
      <LabelStyled>
        Durchwahl:
        <NumberInput
          name='extension'
          defaultValue={appointment.extension}
          onChange={event => setTextInput(event.target.value)}
        />
      </LabelStyled>
      <MessageField
        defaultValue={message}
        onChange={event => setMessage(event.target.value)}
      />
      <StyleArea>
        <SubmitButton text='absenden' type='submit' />
        <SubmitButton text='verwerfen' handleClick={props.handleAbortClick} />
      </StyleArea>
    </EditFormStyled>
  )
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

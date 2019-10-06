import React, { useState } from 'react'
import styled from 'styled-components/macro'
import Page from '../common/Page'
import LanguageOptions from './LanguageOptions'
import MyDatepicker from './Datepicker'
import SubmitButton from './SubmitButton'

export default function AppointmentInputForm() {
  const { checkboxValue, setCheckboxValue } = useState('UKE')

  function handleRadioChange(event) {
    setCheckboxValue(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)
    console.log(data)
    form.reset()
  }

  function handleAbortClick(event) {
    event.preventDefault()
    event.target.reset()
  }

  return (
    <Page>
      <AppointmentInputFormStyled onSubmit={handleSubmit}>
        <LanguageOptions name='Sprache'></LanguageOptions>
        <LanguageOptions name='Alternativsprache'></LanguageOptions>
        <label>
          <input type='checkbox' name='favorites' />
          nur an Favoriten
        </label>

        <MyDatepicker name='date'></MyDatepicker>

        <label>
          <input type='checkbox' name='immediately' />
          so schnell wie möglich
        </label>
        <label>
          voraussichtliche Dauer:{' '}
          <input
            name='duration'
            type='number'
            min='0.25'
            step='0.25'
            lang='nb'></input>
        </label>
        <label>
          Ansprechpartner:
          <input type='text' name='contact'></input>
        </label>
        <label>
          Durchwahl:
          <input type='number' name='extension'></input>
        </label>
        <label>
          Station, Gebäude:
          <input type='text' name='station'></input>
        </label>
        <CheckboxArea>
          <label>
            <input
              type='radio'
              name='clinic'
              value='UKE'
              checked={checkboxValue === 'UKE'}
              onChange={event => handleRadioChange}
            />
            UKE
          </label>
          <label>
            <input
              type='radio'
              name='clinic'
              value='AKK'
              checked={checkboxValue === 'AKK'}
              onChange={event => handleRadioChange}
            />
            AKK
          </label>
          <label>
            <input
              type='radio'
              name='clinic'
              value='PNZ'
              checked={checkboxValue === 'PNZ'}
              onChange={event => handleRadioChange}
            />
            PNZ
          </label>
        </CheckboxArea>
        <label>
          <MessageField
            type='textarea'
            placeholder='weitere Informationen'></MessageField>
        </label>
        <SubmitButton text='abschicken' type='submit' />
        <SubmitButton text='verwerfen' handleClick={handleAbortClick} />
      </AppointmentInputFormStyled>
    </Page>
  )
}

const AppointmentInputFormStyled = styled.form`
  display: grid;
  grid-gap: 20px;
  justify-content: space-evenly;
`

const CheckboxArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const MessageField = styled.input`
  height: 100px;
  width: 100%;
  font-size: 1em;
`

//event.setHours(01,20) - event2.setTime(event1.getTime())

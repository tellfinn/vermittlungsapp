import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import { postAppointment } from '../appointments/services'
import { getLanguages } from './services'
import { useHistory } from 'react-router-dom'
import Page from '../common/Page'
import LanguageSelector from './inputFields/LanguageSelector'
import RadioBtnArea from './inputFields/RadioBtnArea'
import Checkbox from './inputFields/Checkbox'
import TextInput from './inputFields/TextInput'
import MessageField from './inputFields/MessageField'
import MyDatepicker from './inputFields/Datepicker'
import NumberInput from './inputFields/NumberInput'
import SubmitButton from '../common/SubmitButton'
import NextButton from '../common/NextButton'

export default function AppointmentInputForm() {
  let history = useHistory()
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

  const languageOptions = languages
    .map(language => ({ value: language.name, label: language.name }))
    .sort((a, b) => {
      return a.value > b.value
    })

  function handleSubmit(event) {
    event.preventDefault()

    const form = event.target
    const formData = new FormData(form)
    const appointmentLanguage = selectedLanguage.value
    const alternativeLanguage = selectedAlternativeLanguage.value
    const toFavorites = favoritesChecked
    const toSwornIn = swornInChecked
    const writtenTranslation = writtenTranslationChecked
    let appointmentDate = new Date(date)
    let data = Object.fromEntries(formData)
    data = {
      ...data,
      appointmentDate,
      appointmentLanguage,
      toFavorites,
      writtenTranslation,
      toSwornIn,
      alternativeLanguage,
      acceptedByInterpreter: null,
      showToInterpreter: '',
      openAppointment: true
    }
    postAppointment(data).then(history.push('/request'))
  }

  function handleAbortClick(event) {
    event.preventDefault()
    history.push('/request')
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
            <LanguageSelector
              name='Sprache'
              handleChange={event => {
                setSelectedLanguage(event)
              }}
              options={languageOptions}
              value={selectedLanguage}
            />
            <LanguageSelector
              name='Alternativsprache'
              options={languageOptions}
              handleChange={event => setSelectedAlternativeLanguage(event)}
              value={selectedAlternativeLanguage}
            />
          </Wrapper>
          <Wrapper isVisible={showElement === 1}>
            <Checkbox
              name='favorites'
              checked={favoritesChecked}
              text=' nur an Favoriten'
              onChange={() => setFavoritesChecked(!favoritesChecked)}
            />

            <Checkbox
              name='writtenTranslation'
              text=' schriftliche Übersetzung'
              checked={writtenTranslationChecked}
              onChange={() =>
                setWrittenTranslationChecked(!writtenTranslationChecked)
              }
            />

            <Checkbox
              name='swornIn'
              text=' vereidigt'
              checked={swornInChecked}
              onChange={() => setSwornInChecked(!swornInChecked)}
            />
          </Wrapper>
          <Wrapper isVisible={showElement === 2}>
            <MyDatepicker
              name='date'
              date={date}
              onChange={value => setDate(value)}></MyDatepicker>

            <label>
              voraussichtliche Dauer:{' '}
              <NumberInput
                name='duration'
                min='0.25'
                step='0.25'
                placeholder='0.25 Std = 15 Min'
              />
            </label>
          </Wrapper>
          <Wrapper isVisible={showElement === 3}>
            <RadioBtnArea
              radioBtnValue={radioBtnValue}
              handleRadioChange={handleRadioChange}
            />

            <TextInput name='station' placeholder='Station, Gebäude' />

            <TextInput name='contact' placeholder='Ansprechpartner' />

            <NumberInput name='extension' placeholder='Durchwahl' />
          </Wrapper>
          <Wrapper isVisible={showElement === 4}>
            <label>
              <MessageField
                placeholder='weitere Informationen'
                name='message'
                value={message}
                onChange={event => setMessage(event.value)}></MessageField>
            </label>
            <SubmitBtnAreaStyled>
              <SubmitButton text='absenden' type='submit' />
              <SubmitButton text='verwerfen' handleClick={handleAbortClick} />
            </SubmitBtnAreaStyled>
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
  grid-gap: 10px;
  width: 100%;
`

const SubmitBtnAreaStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

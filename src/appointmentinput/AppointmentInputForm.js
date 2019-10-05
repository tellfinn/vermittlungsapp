import React from 'react'

import styled from 'styled-components/macro'
import LanguageOptions from './LanguageOptions'
import MyDatepicker from './Datepicker'
import Page from '../common/Page'

export default function AppointmentInputForm() {
  return (
    <Page>
      <AppointmentInputFormStyled>
        <LanguageOptions title='Sprache'></LanguageOptions>
        <LanguageOptions title='Alternativsprache'></LanguageOptions>
        <label>
          <input type='checkbox' />
          nur an Favoriten
        </label>
        <label>
          <MyDatepicker></MyDatepicker>
        </label>
        <label>
          <input type='checkbox' />
          so schnell wie möglich
        </label>
      </AppointmentInputFormStyled>
    </Page>
  )
}

const AppointmentInputFormStyled = styled.form`
  display: grid;
  grid-gap: 20px;
`

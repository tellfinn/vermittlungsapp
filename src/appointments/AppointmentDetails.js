import React from 'react'
import styled from 'styled-components/macro'
import { ReactComponent as PhoneIcon } from '../icons/phone-fill.svg'
import { ReactComponent as MailIcon } from '../icons/email.svg'
import SubmitButton from '../common/SubmitButton'

export default function AppointmentDetails({
  date,
  time,
  duration,
  contact,
  extension,
  clinic,
  station,
  language,
  message,
  handleAcceptClick,
  handleDeclineClick,
  handleContainerClick
}) {
  return (
    <ClickContainerStyled onClick={handleContainerClick}>
      <AppointmentDetailsStyled>
        <AppointmentDataStyled>
          <div>{date}</div>
          <div>{time} Uhr</div>
          <div>{clinic}</div>
          <div>{language}</div>
          <div style={{ letterSpacing: '-0.08em' }}> ca. {duration}</div>
          <div> {station} </div>
        </AppointmentDataStyled>
        <MoreDetailsStyled>
          <div>Ansprechpartner: </div>
          <div> {contact} </div>
          <div>Durchwahl: </div>
          <div> {extension}</div>
          <div>Details: </div>
          <div> {message} </div>
        </MoreDetailsStyled>
        <IconAreaStyled>
          <MailIconStyled />
          <PhoneIconStyled />
        </IconAreaStyled>
        <ButtonAreaStyled>
          <SubmitButton
            text='annehmen'
            handleClick={handleAcceptClick}></SubmitButton>
          <SubmitButton
            text='ablehnen'
            handleClick={handleDeclineClick}></SubmitButton>
        </ButtonAreaStyled>
      </AppointmentDetailsStyled>
    </ClickContainerStyled>
  )
}

const AppointmentDetailsStyled = styled.div`
  position: absolute;
  top: 150px;
  left: auto;
  display: grid;
  align-items: space-between;
  justify-content: center;
  text-align: justify;
  padding: 10px;
  min-height: 350px;
  width: 95%;
  background-color: var(--greyish);
  border: 1px solid var(--blueish);
  transition: all 0.5 ease-in-out;

  margin-bottom: 1.5em;
  z-index: 90;
`
const ClickContainerStyled = styled.div`
  position: absolute;
  top: 0;
  left: 10px;
  height: 100vh;
  width: 100vw;
  z-index: 80;
`

const AppointmentDataStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr 0.8fr;
  grid-template-rows: 2;
  grid-column-gap: 29px;
`

const MoreDetailsStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  margin: 50px 0;
  justify-content: space-between;
`

const ButtonAreaStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  margin: auto;
`

const IconAreaStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 40px;
  padding: 20px;
  margin-bottom: 40px;
  justify-items: end;
`

const PhoneIconStyled = styled(PhoneIcon)`
  height: 40px;
  width: 40px;
`

const MailIconStyled = styled(MailIcon)`
  height: 40px;
  width: 40px;
`

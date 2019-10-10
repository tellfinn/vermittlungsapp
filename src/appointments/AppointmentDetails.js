import React, { useEffect } from 'react'
import styled from 'styled-components/macro'
import { ReactComponent as PhoneIcon } from '../icons/phone-fill.svg'
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
  handleBodyClick
}) {
  useEffect(() => {
    document.body.addEventListener('click', handleBodyClick)
    return () => {
      document.body.removeEventListener('click', handleBodyClick)
    }
  })

  return (
    <AppointmentDetailsStyled>
      <AppointmentDataStyled>
        <div>{date}</div>
        <div>{time} Uhr</div>
        <div>{clinic}</div>
        <div>{language}</div>
        <div> ca. {duration}</div>
        <div> {station} </div>
      </AppointmentDataStyled>
      <MoreDetailsStyled>
        <div>Ansprechpartner: {contact} </div>
        <div>Durchwahl: {extension}</div>
        <div>Nachricht: {message} </div>
        <PhoneIconStyled />
      </MoreDetailsStyled>
      <ButtonAreaStyled>
        <SubmitButton
          text='annehmen'
          handleClick={handleAcceptClick}></SubmitButton>
        <SubmitButton
          text='ablehnen'
          handleClick={handleDeclineClick}></SubmitButton>
      </ButtonAreaStyled>
    </AppointmentDetailsStyled>
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
  height: 350px;
  width: 95%;
  background-color: var(--greyish);
  border: 1px solid var(--blueish);
  transition: all 0.5 ease-in-out;

  margin-bottom: 1.5em;
  z-index: 90;

  /* &:hover {
  transform: rotate(2deg);
}*/
`

const AppointmentDataStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.3fr 0.7fr;
  grid-template-rows: 2;
  grid-column-gap: 30px;
`

const MoreDetailsStyled = styled.div`
  display: grid;
  margin: 50px 0;
  justify-content: space-evenly;
`

const ButtonAreaStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  margin: auto;
`

const PhoneIconStyled = styled(PhoneIcon)`
  height: 20px;
  width: 20px;
`

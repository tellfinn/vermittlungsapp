import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { ReactComponent as PhoneIcon } from '../icons/phone-fill.svg'
import { ReactComponent as MailIcon } from '../icons/email.svg'
import SubmitButton from '../common/SubmitButton'
import EditAppointmentForm from '../appointmentinput/FollowUpForm'

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
  handleCloseClick,
  handleEditClick,
  handleDeleteClick,
  acceptedByInterpreter
}) {
  const [isFollowUpFormVisible, setIsFollowUpFormVisible] = useState(false)

  return (
    <ContainerStyled>
      <AppointmentDetailsStyled>
        <AppointmentDataStyled onClick={event => handleCloseClick(event)}>
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
        {acceptedByInterpreter ? (
          <ThreeButtonsAreaStyled>
            <ButtonStyled onClick={event => showFollowUpForm(event)}>
              Folgetermin mitteilen
            </ButtonStyled>
            <ButtonStyled onClick={handleDeclineClick}>
              Termin absagen
            </ButtonStyled>
            <DeleteButtonStyled onClick={handleDeleteClick}>
              Termin löschen
            </DeleteButtonStyled>
          </ThreeButtonsAreaStyled>
        ) : (
          <ButtonAreaStyled>
            <SubmitButton
              text='zusagen'
              handleClick={handleAcceptClick}></SubmitButton>
            <SubmitButton
              text='ablehnen'
              handleClick={handleDeclineClick}></SubmitButton>
          </ButtonAreaStyled>
        )}
      </AppointmentDetailsStyled>

      {isFollowUpFormVisible && (
        <EditAppointmentForm
          aptLanguage={language}
          aptClinic={clinic}
          newDate={Date.now()}
          aptStation={station}
          aptDuration={duration}
          aptContact={contact}
          aptExtension={extension}
          handleAbortClick={() => hideFollowUpForm()}
        />
      )}
    </ContainerStyled>
  )

  function showFollowUpForm(event) {
    event.stopPropagation()
    setIsFollowUpFormVisible(true)
  }

  function hideFollowUpForm() {
    setIsFollowUpFormVisible(false)
  }
}

const AppointmentDetailsStyled = styled.div`
  position: absolute;
  top: 45px;
  left: auto;
  display: grid;
  margin: 5px;
  padding: 10px;
  border: 5px solid #f0f0f0;
  outline: 2px solid white;
  box-shadow: 3px 3px 2px grey;
  background-color: var(--greyish);
  align-items: space-between;
  overflow-y: scroll;
  z-index: 10;
`
const ContainerStyled = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(179, 179, 179, 0.5);
  z-index: 5;
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

const ThreeButtonsAreaStyled = styled(ButtonAreaStyled)`
  grid-template-rows: 2;
`

const DeleteButtonStyled = styled.button`
  background-color: var(--red);
  grid-column-start: 1;
  grid-column-end: 3;
`

const ButtonStyled = styled.button`
  background-color: var(--darkblueish);
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

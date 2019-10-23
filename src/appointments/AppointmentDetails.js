import React, { useState } from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import { postAppointment, patchAppointment } from './services'
import { ReactComponent as PhoneIcon } from '../icons/phone-fill.svg'
import { ReactComponent as MailIcon } from '../icons/email.svg'
import SubmitButton from '../common/SubmitButton'
import EditForm from '../appointmentinput/EditForm'
import InfoBtn from './InfoBtn'

AppointmentDetails.propTypes = {
  date: PropTypes.object,
  time: PropTypes.string,
  duration: PropTypes.string,
  contact: PropTypes.string,
  extension: PropTypes.number,
  clinic: PropTypes.string,
  station: PropTypes.string,
  language: PropTypes.string,
  message: PropTypes.string,
  handleAcceptClick: PropTypes.func,
  handleDeclineClick: PropTypes.func,
  handleCloseClick: PropTypes.func,
  handleDeleteClick: PropTypes.func,
  acceptedByInterpreter: PropTypes.bool
}

export default function AppointmentDetails({ ...props }) {
  const [isFollowUpFormVisible, setIsFollowUpFormVisible] = useState(false)
  const [isEditFormVisible, setIsEditFormVisible] = useState(false)

  return (
    <>
      <AppointmentDetailsStyled>
        <InfoBtn
          handleInfobtnClick={event => props.handleCloseClick(event)}
          infoType='less'
        />
        <AppointmentDataStyled>
          <div>{props.date}</div>
          <div>{props.time} Uhr</div>
          <div>{props.clinic}</div>
          <div>{props.language}</div>
          <div style={{ letterSpacing: '-0.08em' }}> ca. {props.duration}</div>
          <div> {props.station} </div>
        </AppointmentDataStyled>
        <MoreDetailsStyled>
          <div>Ansprechpartner: </div>
          <div> {props.contact} </div>
          <div>Durchwahl: </div>
          <div> {props.extension}</div>
          <div>Details: </div>
          <div> {props.message} </div>
        </MoreDetailsStyled>

        <IconAreaStyled>
          <a href={'mailto:buero@vermittlung.de'}>
            <MailIconStyled />
          </a>
          <PhoneIconStyled />
        </IconAreaStyled>
        {props.acceptedByInterpreter ? (
          <ThreeButtonsAreaStyled>
            <ButtonStyled onClick={event => showFollowUpForm(event)}>
              Folgetermin mitteilen
            </ButtonStyled>
            <ButtonStyled onClick={props.handleDeclineClick}>
              absagen
            </ButtonStyled>
            <DeleteButtonStyled onClick={props.handleDeleteClick}>
              löschen
            </DeleteButtonStyled>
            <DeleteButtonStyled onClick={event => showEditForm(event)}>
              bearbeiten
            </DeleteButtonStyled>
          </ThreeButtonsAreaStyled>
        ) : (
          <ButtonAreaStyled>
            <SubmitButton
              text='zusagen'
              handleClick={props.handleAcceptClick}></SubmitButton>
            <SubmitButton
              text='ablehnen'
              handleClick={props.handleDeclineClick}></SubmitButton>
          </ButtonAreaStyled>
        )}
      </AppointmentDetailsStyled>

      {isFollowUpFormVisible && (
        <EditForm
          language={props.language}
          aptClinic={props.clinic}
          newDate={props.formdate}
          aptStation={props.station}
          aptDuration={props.formduration}
          aptContact={props.contact}
          aptExtension={props.extension}
          languages={props.languages}
          handleEditSubmit={postAppointment}
          handleAbortClick={() => hideFollowUpForm()}
          setAptState={props.setAptState}
          isFollowUp={true}
        />
      )}

      {isEditFormVisible && (
        <EditForm
          language={props.language}
          aptClinic={props.clinic}
          newDate={props.formdate}
          aptStation={props.station}
          aptDuration={props.formduration}
          aptContact={props.contact}
          aptExtension={props.extension}
          languages={props.languages}
          handleAbortClick={() => hideEditForm()}
          setAptState={props.setAptState}
          handleEditSubmit={patchAppointment}
          id={props.id}
        />
      )}
    </>
  )

  function showEditForm(event) {
    event.stopPropagation()
    setIsEditFormVisible(true)
  }

  function hideEditForm() {
    setIsEditFormVisible(false)
  }

  function showFollowUpForm(event) {
    event.stopPropagation()
    setIsFollowUpFormVisible(true)
  }

  function hideFollowUpForm() {
    setIsFollowUpFormVisible(false)
  }
}

const AppointmentDetailsStyled = styled.div`
  position: fixed;
  left: calc(50%-178px);
  top: -650px;
  display: grid;
  width: 95%;
  padding: 10px;
  padding-top: 30px;
  box-shadow: var(--shadow);
  background-color: var(--background-white);
  outline: 1px solid var(--blueish);
  align-items: space-between;
  overflow-y: scroll;
  z-index: 10;

  -webkit-animation: slide 0.5s forwards;
  animation: slide 0.5s forwards;

  @-webkit-keyframes slide {
    100% {
      top: 50px;
    }
  }

  @keyframes slide {
    100% {
      top: 50px;
    }
  }
`

const AppointmentDataStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr 0.8fr;
  grid-template-rows: 2;
  grid-column-gap: 29px;
  margin-top: 40px;
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

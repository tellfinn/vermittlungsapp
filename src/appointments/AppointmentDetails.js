import React, { useState } from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import { postAppointment, patchAppointment } from './services'
import ContactBar from './AppointmentDetailsContactBar'
import SettingsBar from './AppointmentDetailsSettingsBar'
import SubmitButton from '../common/SubmitButton'
import InfoBtn from './InfoBtn'
import EditForm from '../appointmentinput/EditForm'

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
  const [showSettings, setShowSettings] = useState(false)
  const [showContact, setShowContact] = useState(false)

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

        <IconAreaStyled positionIcons={props.acceptedByInterpreter}>
          {props.acceptedByInterpreter && (
            <SettingsBar
              toggleSettings={() => setShowSettings(!showSettings)}
              declineClick={props.handleDeclineClick}
              deleteClick={props.handleDeleteClick}
              editClick={event => showEditForm(event)}
              showSettings={showSettings}
            />
          )}

          <ContactBar
            toggleSettings={() => setShowContact(!showContact)}
            showContact={showContact}
          />
        </IconAreaStyled>

        {props.acceptedByInterpreter ? (
          <>
            <ButtonAreaStyled numberOfBtns={props.acceptedByInterpreter}>
              <ButtonStyled onClick={event => showFollowUpForm(event)}>
                Folgetermin mitteilen
              </ButtonStyled>
            </ButtonAreaStyled>
          </>
        ) : (
          <ButtonAreaStyled numberOfBtns={props.acceptedByInterpreter}>
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
          currentUser={props.currentUser}
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
          currentUser={props.currentUser}
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
  box-shadow: var(--shadow);
  background-color: var(--background-white);
  outline: 1px solid var(--blueish);
  padding: 10px;
  padding-top: 30px;
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
  ${props => (props.numberOfBtns ? '' : 'grid-template-columns: 1fr 0.8fr;')};
  display: grid;
  grid-gap: 25px;
  margin: auto;
`

const IconAreaStyled = styled.div`
  position: relative;
  bottom: 30px;
  height: 50px;
  width: 100%;

  display: grid;
  ${props => (props.positionIcons ? 'grid-template-columns: 1fr 1fr;' : '')};
`

const ButtonStyled = styled.button`
  background-color: var(--darkblueish);
`

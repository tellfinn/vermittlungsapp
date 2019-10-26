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

export default function AppointmentDetails({ appointment, ...props }) {
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
          <div>{appointment.clinic}</div>
          <div>{appointment.appointmentLanguage}</div>
          <div style={{ letterSpacing: '-0.08em' }}> ca. {props.duration}</div>
          <div> {appointment.station} </div>
        </AppointmentDataStyled>
        <MoreDetailsStyled>
          <div>Ansprechpartner: </div>
          <div> {appointment.contact} </div>
          <div>Durchwahl: </div>
          <div> {appointment.extension}</div>
          <div>Details: </div>
          <div> {appointment.message} </div>
        </MoreDetailsStyled>

        <IconAreaStyled positionIcons={appointment.acceptedByInterpreter}>
          {appointment.acceptedByInterpreter && (
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

        {appointment.acceptedByInterpreter ? (
          <>
            <ButtonAreaStyled forOneBtn={appointment.acceptedByInterpreter}>
              <ButtonStyled onClick={event => showFollowUpForm(event)}>
                Folgetermin mitteilen
              </ButtonStyled>
            </ButtonAreaStyled>
          </>
        ) : (
          <ButtonAreaStyled forOneBtn={appointment.acceptedByInterpreter}>
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
          appointment={appointment}
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
          appointment={appointment}
          /*       
          id={props.id}
        */
          newDate={props.formdate}
          languages={props.languages}
          handleAbortClick={() => hideEditForm()}
          setAptState={props.setAptState}
          handleEditSubmit={patchAppointment}
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
  grid-template-columns: 0.9fr 1.4fr 0.7fr;
  grid-template-rows: 2;
  grid-column-gap: 25px;
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
  ${props => (props.forOneBtn ? '' : 'grid-template-columns: 1fr 0.8fr;')};
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

import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  patchAppointment,
  deleteAppointment,
  getAppointments
} from './services'
import Page from '../common/Page'
import AppointmentList from './AppointmentList'
import Appointment from './Appointment'
import SortByBar from './SortByBar'

AppointmentPage.propTypes = {
  requestAccepted: PropTypes.bool,
  period: PropTypes.string,
  languages: PropTypes.array
}

export default function AppointmentPage({
  requestAccepted,
  period,
  languages,
  currentUser,
  interpreterLanguages
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    getAppointments().then(setAppointments)
  }, [])

  function renderAppointmentList(index) {
    const appointmentList = {
      0: <AppointmentList>{sortAppointments('date')}</AppointmentList>,
      1: <AppointmentList>{sortAppointments('time')}</AppointmentList>,
      2: <AppointmentList>{sortAppointments('clinic')}</AppointmentList>
    }
    return appointmentList[index]
  }

  const currentTimestamp = new Date().setHours(0, 0, 0, 0)

  return (
    <Page>
      <SortByBar
        buttonTexts={['Datum', 'Uhrzeit', 'Ort']}
        handleClick={index => setActiveIndex(index)}
        isActive={activeIndex}
      />
      {renderAppointmentList(activeIndex)}
    </Page>
  )

  function sortAppointments() {
    let sortedAppointments = appointments
      .filter(
        appointment =>
          appointment.acceptedByInterpreter === requestAccepted &&
          (interpreterLanguages.includes(appointment.appointmentLanguage) ||
            appointment.sentBy === currentUser)
      )
      .filter(
        appointment =>
          appointment.showToInterpreter.length === 0 ||
          appointment.showToInterpreter === currentUser ||
          appointment.sentBy === currentUser
      )

    if (activeIndex === 0) {
      sortedAppointments = sortedAppointments.slice().sort((a, b) => {
        return new Date(a.appointmentDate) - new Date(b.appointmentDate)
      })
    } else if (activeIndex === 1) {
      sortedAppointments = sortedAppointments.slice().sort((a, b) => {
        return (
          new Date(a.appointmentDate).getHours() -
          new Date(b.appointmentDate).getHours()
        )
      })
    } else if (activeIndex === 2) {
      sortedAppointments = sortedAppointments.slice().sort((a, b) => {
        return a.clinic > b.clinic
      })
    }

    if (period === 'present') {
      sortedAppointments = sortedAppointments.filter(
        appointment => new Date(appointment.appointmentDate) >= currentTimestamp
      )
    } else if (period === 'past') {
      sortedAppointments = sortedAppointments.filter(
        appointment =>
          new Date(appointment.appointmentDate) < currentTimestamp &&
          appointment.acceptedByInterpreter === true
      )
    }

    if (sortedAppointments.length === 0) {
      return <div>Keine Termine vorhanden</div>
    } else {
      return sortedAppointments.map(appointment => (
        <Appointment
          handleAcceptClick={() => acceptAppointment(appointment)}
          handleDeclineClick={() => declineAppointment(appointment)}
          handleDeleteClick={() => removeAppointment(appointment)}
          key={appointment._id}
          appointment={appointment}
          languages={languages}
          currentUser={currentUser}
          setAptState={() => setAptStateFromChild}
        />
      ))
    }
  }

  function acceptAppointment(appointment) {
    patchAppointment(appointment._id, {
      acceptedByInterpreter: true,
      showToInterpreter: currentUser,
      openAppointment: false
    }).then(updatedAppointment => {
      const index = appointments.findIndex(
        appointment => appointment._id === updatedAppointment._id
      )
      setAppointments([
        ...appointments.slice(0, index),
        {
          ...appointment,
          acceptedByInterpreter: updatedAppointment.acceptedByInterpreter
        },
        ...appointments.slice(index + 1)
      ])
    })
  }

  function declineAppointment(appointment) {
    patchAppointment(appointment._id, {
      acceptedByInterpreter: false,
      openAppointment: true
    }).then(updatedAppointment => {
      const index = appointments.findIndex(
        appointment => appointment._id === updatedAppointment._id
      )
      setAppointments([
        ...appointments.slice(0, index),
        {
          ...appointment,
          acceptedByInterpreter: updatedAppointment.acceptedByInterpreter
        },
        ...appointments.slice(index + 1)
      ])
    })
  }

  function removeAppointment(appointment) {
    deleteAppointment(appointment._id).then(deletedAppointment => {
      const index = appointments.findIndex(
        appointment => appointment._id === deletedAppointment._id
      )
      setAppointments([
        ...appointments.slice(0, index),
        ...appointments.slice(index + 1)
      ])
    })
  }

  function setAptStateFromChild() {
    getAppointments().then(setAppointments)
  }
}

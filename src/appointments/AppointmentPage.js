import React, { useEffect, useState } from 'react'
import { getAppointments, patchAppointment } from './services'
import Page from '../common/Page'
import AppointmentList from './AppointmentList'
import Appointment from './Appointment'
import SortByBar from './SortByBar'

export default function AppointmentPage({ requestAccepted, period }) {
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

  const timestamp = new Date().setHours(0, 0, 0, 0)

  return (
    <Page>
      <SortByBar
        buttonTexts={['Datum', 'Uhrzeit', 'Ort']}
        handleClick={setActiveIndex}
      />
      {renderAppointmentList(activeIndex)}
    </Page>
  )

  function sortAppointments() {
    let sortedAppointments = appointments.filter(
      appointment => appointment.acceptedByInterpreter === requestAccepted
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
        appointment => new Date(appointment.appointmentDate) >= timestamp
      )
    } else if (period === 'past') {
      sortedAppointments = sortedAppointments.filter(
        appointment =>
          new Date(appointment.appointmentDate) < timestamp &&
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
          handleFollowUpClick={() => console.log('folgetermin')}
          handleEditClick={() => console.log('edit')}
          key={appointment._id}
          {...appointment}
        />
      ))
    }
  }

  function acceptAppointment(appointment) {
    patchAppointment(appointment._id, {
      acceptedByInterpreter: true,
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

  function editAppointment(appointment, event, newAppointmentData) {
    event.preventDefault()
    patchAppointment(appointment._id, {
      ...appointment,
      newAppointmentData
    }).then(updatedAppointment => {
      const index = appointments.findIndex(
        appointment => appointment._id === updatedAppointment._id
      )
      setAppointments([
        ...appointments.slice(0, index),
        {
          ...appointment
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
}

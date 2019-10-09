import React from 'react'
import styled from 'styled-components/macro'

export default function AppointmentList({ children, handleAcceptClick }) {
  return <AppointmentListStyled>{children}</AppointmentListStyled>
}

const AppointmentListStyled = styled.ul`
  display: grid;
  grid-row-gap: 10px;
  margin-left: -40px;
  margin-bottom: 55px;
  align-content: center;
`

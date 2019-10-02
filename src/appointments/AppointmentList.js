import React from 'react'
import styled from 'styled-components/macro'

export default function AppointmentList({ children }) {
  return <AppointmentListStyled>{children}</AppointmentListStyled>
}

const AppointmentListStyled = styled.ul`
  margin-left: -40px;
  display: grid;
  grid-row-gap: 10px;
  align-content: center;
  margin-bottom: 55px;
`

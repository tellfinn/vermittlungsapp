import React from 'react'
import styled from 'styled-components/macro'
import AppointmentList from '../pages/AppointmentList'
import SortByBar from '../pages/SortByBar'

export default function Page() {
  return (
    <PageStyled>
      <SortByBar />
      <AppointmentList></AppointmentList>
    </PageStyled>
  )
}

const PageStyled = styled.main`
  margin: 10px;
  margin-top: 50px;
`

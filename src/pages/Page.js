import React from 'react'
import styled from 'styled-components/macro'
import AppointmentList from './AppointmentList'
import SortByBar from './SortByBar'

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
`

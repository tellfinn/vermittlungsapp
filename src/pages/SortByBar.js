import React from 'react'
import styled from 'styled-components'
import { ReactComponent as Arrow } from '../icons/arrow-down.svg'
import appointmentArray from '../server/data/appointments.json'

export default function SortByBar() {
  return (
    <SortByBarStyled>
      <SortBtnStyled onClick={sortByDate}>
        Datum
        <ArrowStyled />
      </SortBtnStyled>

      <SortBtnStyled onClick={sortByTime}>
        Uhrzeit
        <ArrowStyled />
      </SortBtnStyled>

      <SortBtnStyled onClick={sortByClinic}>
        Ort
        <ArrowStyled />
      </SortBtnStyled>
    </SortByBarStyled>
  )
}

function sortByDate() {
  console.log(
    appointmentArray.slice().sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
    })
  )
}

function sortByTime() {
  console.log(
    appointmentArray.slice().sort((a, b) => {
      return a.time > b.time
    })
  )
}

function sortByClinic() {
  console.log(
    appointmentArray.slice().sort((a, b) => {
      return a.clinic > b.clinic
    })
  )
}

const SortByBarStyled = styled.nav`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const SortBtnStyled = styled.button`
  height: 40px;
  width: 90px;
  background-color: var(--slate-grey);
  border: none;
  font-size: 16px;
  line-height: 2em;
`

const ArrowStyled = styled(Arrow)`
  width: 20px;
  height: 20px;
  padding-top: 10px;
`

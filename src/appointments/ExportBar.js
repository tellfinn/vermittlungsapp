import React from 'react'
import styled from 'styled-components/macro'
import { ReactComponent as CalendarIcon } from '../icons/calendar.svg'

export default function ExportBar() {
  return (
    <ExportBarStyled>
      <CalendarBtnStyled>
        <CalenderTxtStyled> in Kalender exportieren </CalenderTxtStyled>
        <CalendarIconStyled />
      </CalendarBtnStyled>
    </ExportBarStyled>
  )
}

const ExportBarStyled = styled.footer`
  position: fixed;
  bottom: 0;
  display: flex;
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.8),
    rgba(255, 255, 255, 1) 90%
  );
`

const CalendarBtnStyled = styled.button`
  position: relative;
  display: grid;
  height: 40px;
  width: 225px;
  border-radius: 5px;
  border: 0;
  background: var(--blueish);
  font-size: 16px;
  line-height: 2.7em;
`

const CalenderTxtStyled = styled.div`
  padding-left: 30px;
`

const CalendarIconStyled = styled(CalendarIcon)`
  position: absolute;
  top: 5px;
  left: 10px;
  height: 30px;
  width: 30px;
`

/*
  const aptDate = new Date(Date(date))
  console.log(Date().toString())
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  }

  console.log(aptDate.toLocaleDateString('de-DE', options))*/

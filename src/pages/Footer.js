import React from 'react'
import styled from 'styled-components/macro'
import { ReactComponent as CalendarIcon } from '../icons/calendar.svg'

export default function Footer() {
  return (
    <FooterStyled>
      <CalendarBtnStyled>
        <CalenderTxtStyled> in Kalender exportieren </CalenderTxtStyled>
        <CalendarIconStyled />
      </CalendarBtnStyled>
    </FooterStyled>
  )
}

const FooterStyled = styled.footer`
  position: fixed;
  bottom: 0;
  display: flex;
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: center;
  background-color: white;
`

const CalendarBtnStyled = styled.button`
  position: relative;
  display: grid;
  height: 40px;
  width: 225px;
  border-radius: 5px;
  border: 0;
  background: var(--slate-grey);
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

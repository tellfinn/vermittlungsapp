import React from 'react'
import styled from 'styled-components/macro'
import { ReactComponent as Arrow } from '../icons/arrow-down.svg'

export default function Footer() {
  return (
    <FooterStyled>
      <Arrow />
    </FooterStyled>
  )
}

const FooterStyled = styled.button`
  width: 100%;
  height: 55px;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  border: 0;
`

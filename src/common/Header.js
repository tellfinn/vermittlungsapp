import React, { useState } from 'react'
import styled from 'styled-components/macro'
import MyMenu from './Menu'
import { ReactComponent as Arrow } from '../icons/arrow-down.svg'

export default function Header() {
  let [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <HeaderStyled>
      <BtnArea onClick={() => setIsMenuOpen(!isMenuOpen)} isOpen={isMenuOpen}>
        <MyMenu
          handleMenuItemClick={() => setIsMenuOpen(!isMenuOpen)}
          isOpen={isMenuOpen}></MyMenu>
      </BtnArea>
      Titel
      <NotificationsBtnStyled>
        10
        <ArrowStyled />
      </NotificationsBtnStyled>
    </HeaderStyled>
  )
}

const HeaderStyled = styled.header`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  width: 100%;
  background-color: var(--darkblueish);
  font-size: 22px;
  font-weight: bold;
  color: white;
  z-index: 99;
`

const BtnArea = styled.div`
  height: 40px;
  width: 40px;
  justify-content: center;
  background-color: var(--greyish);
  border: 0;
  text-align: center;
`

const NotificationsBtnStyled = styled(BtnArea)`
  display: grid;
  grid-auto-rows: 2;
  height: 40px;
  width: 40px;
  padding-top: 0;
  background-color: var(--greyish);
  border: 0;
  text-align: center;
  color: red;
  font-weight: bold;
  font-size: 16px;
`

const ArrowStyled = styled(Arrow)`
  height: 18px;
  width: 30px;
`

import React, { useState } from 'react'
import styled from 'styled-components/macro'
import MyMenu from './Menu'
import { ReactComponent as LogoutIcon } from '../icons/exit.svg'
// import { ReactComponent as Arrow } from '../icons/arrow-down.svg'

export default function Header({ handleLogoutClick, isLoggedIn }) {
  let [isMenuOpen, setIsMenuOpen] = useState(false)
  const [title, setTitle] = useState('Terminanfragen')

  function handleTitleChange(event) {
    setIsMenuOpen(!isMenuOpen)
    setTitle(event.target.text)
  }

  const titleArray =
    isLoggedIn === true
      ? [
          { route: '/request', title: 'Terminanfragen' },
          { route: '/appointments', title: 'Terminübersicht' },
          { route: '/pastappointments', title: 'vergangene Termine' },
          { route: '/newAppointment', title: 'neuen Termin erstellen' },
          { route: '/login', title: 'einloggen' }
        ]
      : [
          { route: '/signUp', title: 'registrieren' },
          { route: '/login', title: 'einloggen' }
        ]

  return (
    <HeaderStyled>
      <BtnArea onClick={() => setIsMenuOpen(!isMenuOpen)} isOpen={isMenuOpen}>
        <MyMenu
          handleMenuItemClick={handleTitleChange}
          isOpen={isMenuOpen}
          menuItemTitles={titleArray}></MyMenu>
      </BtnArea>
      {title}
      <BtnArea onClick={handleLogoutClick}>
        <LogoutIconStyled />
      </BtnArea>
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
  color: white;
  font-size: 22px;
  font-weight: lighter;
  z-index: 99;
`

const BtnArea = styled.div`
  height: 40px;
  width: 40px;
  justify-content: center;
  align-items: center;
  background-color: var(--greyish);
  border: 0;
  text-align: center;
`

const LogoutIconStyled = styled(LogoutIcon)`
  height: 38px;
  width: 38px;
  margin-top: 1px;
`

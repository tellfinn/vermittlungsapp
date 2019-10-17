import React from 'react'
import styled from 'styled-components/macro'
import { slide as Menu } from 'react-burger-menu'
import { NavLink } from 'react-router-dom'

export default function MyMenu({ handleMenuItemClick, isOpen }) {
  return (
    <StyledMenu isOpen={isOpen}>
      <LinkStyled exact to='/' onClick={handleMenuItemClick}>
        neue Terminanfragen
      </LinkStyled>
      <LinkStyled to='/appointments' onClick={handleMenuItemClick}>
        Terminübersicht
      </LinkStyled>
      <LinkStyled to='/pastappointments' onClick={handleMenuItemClick}>
        vergangene Termine
      </LinkStyled>
      <LinkStyled to='/newAppointment' onClick={handleMenuItemClick}>
        neuen Termin erstellen
      </LinkStyled>
      <LinkStyled to='/signUp' onClick={handleMenuItemClick}>
        Registrieren
      </LinkStyled>
    </StyledMenu>
  )
}

const LinkStyled = styled(NavLink)`
  padding: 5px;
  font-size: 18px;
  font-weight: normal;
  display: flex;
  align-items: center;
  text-decoration: none;

  &:visited {
    color: black;
  }
`

const StyledMenu = styled(Menu)`
  display: grid;
  grid-gap: 20px;
  padding: 20px;
  position: fixed;
  left: 0;
  top: 40px;
  width: 60vw;
  z-index: 99;
  background-color: var(--greyish);
`

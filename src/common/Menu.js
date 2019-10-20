import React from 'react'
import styled from 'styled-components/macro'
import { slide as Menu } from 'react-burger-menu'
import { NavLink } from 'react-router-dom'

export default function MyMenu({
  handleMenuItemClick,
  isOpen,
  menuItemTitles
}) {
  return (
    <StyledMenu isOpen={isOpen}>
      {menuItemTitles.map((itemTitle, index) => (
        <LinkStyled
          to={itemTitle.route}
          onClick={handleMenuItemClick}
          key={index}>
          {itemTitle.title}
        </LinkStyled>
      ))}
    </StyledMenu>
  )
}

const LinkStyled = styled(NavLink)`
  padding: 5px;
  font-size: 18px;
  font-weight: normal;
  font-style: normal;
  display: flex;
  width: 200px;
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

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
    <StyledMenu isOpen={isOpen} disableAutoFocus width={'230px'}>
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
  padding: 10px;
  padding-left: 20px;
  font-size: 16px;
  font-weight: bolder;
  font-style: normal;
  text-align: justify;
  text-decoration: none;

  &:link,
  :visited {
    color: black;
  }
`

const StyledMenu = styled(Menu)`
  position: fixed;
  left: 0;
  top: 40px;
  background-color: var(--greyish);
`

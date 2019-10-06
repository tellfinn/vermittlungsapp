import React from 'react'
import styled from 'styled-components/macro'
import { ReactComponent as MenuIcon } from '../icons/menu.svg'
import { ReactComponent as Arrow } from '../icons/arrow-down.svg'

export default function Header() {
  return (
    <HeaderStyled>
      <HeaderBtnStyled>
        <MenuIconStyled />
      </HeaderBtnStyled>
      Titel
      <NotificationsBtnStyled>
        10
        <ArrowStyled />
      </NotificationsBtnStyled>
    </HeaderStyled>
  )
}

const HeaderStyled = styled.header`
  height: 40px;
  width: 100%;
  position: fixed;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--blueish);
  font-size: 22px;
  font-weight: bold;
  color: white;
`

const HeaderBtnStyled = styled.button`
  display: grid;
  text-align: center;
  padding-top: 0;
  height: 40px;
  width: 40px;
  background-color: var(--greyish);
  border: 0;
`

const NotificationsBtnStyled = styled(HeaderBtnStyled)`
  grid-auto-rows: 2;
  color: red;
  font-weight: bold;
  font-size: 16px;
`

const ArrowStyled = styled(Arrow)`
  height: 18px;
  width: 30px;
`

const MenuIconStyled = styled(MenuIcon)`
  height: 30px;
  width: 30px;
  margin: auto;
`

import React from 'react'
import styled from 'styled-components/macro'
import { ReactComponent as MenuBars } from '../icons/menu.svg'
import { ReactComponent as Arrow } from '../icons/arrow-down.svg'

export default function Header() {
  return (
    <HeaderStyled>
      <HeaderBtnStyled>
        <MenuBars />
      </HeaderBtnStyled>
      Titel
      <NewsBtnStyled>
        10
        <ArrowStyled />
      </NewsBtnStyled>
    </HeaderStyled>
  )
}

const HeaderStyled = styled.header`
  height: 50px;
  width: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--slate-grey);
  font-size: 22px;
  font-weight: bold;
  color: white;
`

const HeaderBtnStyled = styled.button`
  display: grid;
  justify-content: center;
  padding-top: 0;
  height: 50px;
  width: 50px;
  background-color: var(--greyish);
  border: 0;
`

const NewsBtnStyled = styled(HeaderBtnStyled)`
  grid-auto-rows: 2;
  padding: 8px;
  color: red;
  font-weight: bold;
  font-size: 18px;
`

const ArrowStyled = styled(Arrow)`
  height: 22px;
  width: 50px;
`

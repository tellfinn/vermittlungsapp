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
        <Arrow></Arrow>
      </NewsBtnStyled>
    </HeaderStyled>
  )
}

const HeaderStyled = styled.header`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--slate-grey);
  font-size: 23px;
  font-weight: bold;
  color: white;
`

const HeaderBtnStyled = styled.button`
  display: grid;
  justify-content: center;
  height: 60px;
  width: 60px;
  background-color: var(--greyish);
  border: 0;
`

const NewsBtnStyled = styled(HeaderBtnStyled)`
  grid-auto-rows: 2;
  padding: 10px;
  color: red;
  font-weight: bold;
  font-size: 18px;
`

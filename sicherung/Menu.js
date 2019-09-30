import React, { Component } from 'react'
import styled from 'styled-components'
import MenuBars from '../icons/menu.svg'

export default function Menu() {
  return (
    <HeaderBtnStyled>
      <MenuBars></MenuBars>
    </HeaderBtnStyled>
  )
}

const HeaderBtnStyled = styled.button`
  display: flex;
  justify-content: center;
  height: 60px;
  width: 60px;
  background-color: #d9e0e7;
  border: 0;
`

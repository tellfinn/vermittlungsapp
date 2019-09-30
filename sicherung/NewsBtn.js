import React from 'react'
import styled from 'styled-components'
import { ReactComponent as Arrow } from '../icons/arrow-down.svg'

export default function NewsBtn() {
  return (
    <NewsBtnStyled>
      10
      <Arrow></Arrow>
    </NewsBtnStyled>
  )
}

const NewsBtnStyled = styled.button`
  display: grid;
  grid: 2;
  padding: 10px;
  justify-content: center;
  height: 60px;
  width: 60px;
  background-color: #d9e0e7;
  border: 0;
  color: red;
  font-weight: bold;
  font-size: 18px;
`

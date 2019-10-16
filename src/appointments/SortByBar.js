import React from 'react'
import styled from 'styled-components'
import { ReactComponent as Arrow } from '../icons/arrow-down.svg'

export default function SortByBar({ buttonTexts, handleClick }) {
  return (
    <SortByBarStyled>
      {buttonTexts.map((text, index) => (
        <SortBtnStyled onClick={() => handleClick(index)} key={index}>
          {text}
          <ArrowStyled />
        </SortBtnStyled>
      ))}
    </SortByBarStyled>
  )
}

const SortByBarStyled = styled.nav`
  display: grid;
  grid-template-columns: 1fr 1.2fr 0.8fr;
  grid-gap: 10px;
  width: 100%;
`

const SortBtnStyled = styled.button`
  height: 40px;
  border: none;
  box-shadow: 2px 2px 2px grey;
  font-size: 16px;
  line-height: 2em;

  &:active {
    background-color: red;
    box-shadow: 0 0 0;
  }
`

const ArrowStyled = styled(Arrow)`
  width: 20px;
`

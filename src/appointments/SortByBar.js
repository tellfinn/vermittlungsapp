import React from 'react'
import styled from 'styled-components'
import { ReactComponent as Arrow } from '../icons/arrow-down.svg'

export default function SortByBar({ buttonTexts, handleSortClick }) {
  return (
    <SortByBarStyled>
      {buttonTexts.map((text, index) => (
        <SortBtnStyled onClick={() => handleSortClick(index)} key={index}>
          {text}
          <ArrowStyled />
        </SortBtnStyled>
      ))}
    </SortByBarStyled>
  )
}

const SortByBarStyled = styled.nav`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const SortBtnStyled = styled.button`
  height: 40px;
  width: 90px;
  background-color: var(--blueish);
  border: none;
  font-size: 16px;
  line-height: 2em;

  &:active {
    background-color: red;
  }
`

const ArrowStyled = styled(Arrow)`
  width: 20px;
  height: 20px;
  padding-top: 10px;
`

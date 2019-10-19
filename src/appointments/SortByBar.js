import React from 'react'
import styled from 'styled-components'
import { ReactComponent as Arrow } from '../icons/arrow-down.svg'

export default function SortByBar({ buttonTexts, handleClick, isActive }) {
  return (
    <SortByBarStyled>
      {buttonTexts.map((text, index) => (
        <SortBtnStyled
          onClick={() => handleClick(index)}
          key={index}
          active={isActive === index}>
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
  box-shadow: ${props => (props.active ? '0 0 0' : '2px 2px 2px grey')};
  background-color: ${props =>
    props.active ? 'var(--blueish)' : 'var(--darkblueish)'};
  font-size: 16px;
  line-height: 2em;
`

const ArrowStyled = styled(Arrow)`
  width: 20px;
`

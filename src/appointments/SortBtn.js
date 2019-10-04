import React from 'react'
import styled from 'styled-components'
import { ReactComponent as Arrow } from '../icons/arrow-down.svg'

export default function SortBtn({ handleClick, text, value }) {
  return (
    <SortBtnStyled onClick={handleClick} value={value}>
      {text}
      <ArrowStyled />
    </SortBtnStyled>
  )
}

const SortBtnStyled = styled.button`
  height: 40px;
  width: 90px;
  background-color: var(--slate-grey);
  border: none;
  font-size: 16px;
  line-height: 2em;
`

const ArrowStyled = styled(Arrow)`
  width: 20px;
  height: 20px;
  padding-top: 10px;
`

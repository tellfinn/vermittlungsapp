import React from 'react'
import styled from 'styled-components'
import { ReactComponent as Arrow } from '../icons/arrow-down.svg'

export default function SortByBar() {
  return (
    <SortByBarStyled>
      <SortBtnStyled>
        Datum
        <ArrowStyled />
      </SortBtnStyled>

      <SortBtnStyled>
        Uhrzeit
        <ArrowStyled />
      </SortBtnStyled>

      <SortBtnStyled>
        Ort
        <ArrowStyled />
      </SortBtnStyled>
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
  background-color: var(--slate-grey);
  border: none;
  font-size: 16px;
  vertical-align: middle;
`

const ArrowStyled = styled(Arrow)`
  width: 20px;
  height: 16px;
`

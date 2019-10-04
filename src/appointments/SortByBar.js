import React from 'react'
import styled from 'styled-components'
import SortBtn from './SortBtn'

export default function SortByBar({ handleSortClick }) {
  return (
    <SortByBarStyled>
      <SortBtn
        handleClick={() => handleSortClick('date')}
        value='date'
        text='Datum'
      />

      <SortBtn
        handleClick={() => handleSortClick('time')}
        value='time'
        text='Uhrzeit'
      />

      <SortBtn
        handleClick={() => handleSortClick('clinic')}
        value='clinic'
        text='Ort'
      />
    </SortByBarStyled>
  )
}

const SortByBarStyled = styled.nav`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

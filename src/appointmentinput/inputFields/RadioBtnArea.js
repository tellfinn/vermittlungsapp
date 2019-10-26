import React from 'react'
import styled from 'styled-components'

export default function({ handleRadioChange, radioBtnValue }) {
  return (
    <RadioBtnAreaStyled>
      <label>
        <input
          type='radio'
          name='clinic'
          value='UKE'
          checked={radioBtnValue === 'UKE'}
          onChange={handleRadioChange}
        />
        UKE
      </label>
      <label>
        <input
          type='radio'
          name='clinic'
          value='AKK'
          checked={radioBtnValue === 'AKK'}
          onChange={handleRadioChange}
        />
        AKK
      </label>
      <label>
        <input
          type='radio'
          name='clinic'
          value='PNZ'
          checked={radioBtnValue === 'PNZ'}
          onChange={handleRadioChange}
        />
        PNZ
      </label>
    </RadioBtnAreaStyled>
  )
}

const RadioBtnAreaStyled = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`

import React from 'react'
import styled from 'styled-components/macro'
import { ReactComponent as AcceptIcon } from '../icons/submit-icon.svg'
import { ReactComponent as AbortIcon } from '../icons/cancel.svg'

export default function SubmitButton({ text, handleClick }) {
  const btnColor =
    text === 'absenden'
      ? { backgroundColor: 'var(--green)' }
      : text === 'zusagen'
      ? { backgroundColor: 'var(--green)' }
      : { backgroundColor: 'var(--red)' }
  const Icon =
    text === 'absenden'
      ? AcceptIconStyled
      : text === 'zusagen'
      ? AcceptIconStyled
      : AbortIconStyled
  return (
    <SubmitBtnStyled style={btnColor} onClick={handleClick}>
      <Icon /> {text}
    </SubmitBtnStyled>
  )
}

const SubmitBtnStyled = styled.button`
  height: 54px;
  width: 140px;
`

const AcceptIconStyled = styled(AcceptIcon)`
  width: 20px;
  height: 20px;
  margin-right: 5px;
  fill: white;
`

const AbortIconStyled = styled(AbortIcon)`
  width: 20px;
  height: 20px;
  margin-right: 5px;
  fill: white;
`

import React from 'react'
import styled from 'styled-components/macro'
import { ReactComponent as AcceptIcon } from '../icons/submit-icon.svg'
import { ReactComponent as AbortIcon } from '../icons/cancel.svg'

export default function SubmitButton({ text, handleClick }) {
  const btnColor =
    text === ('abschicken' || 'annehmen')
      ? { backgroundColor: 'var(--green)' }
      : { backgroundColor: 'var(--red)' }
  const Icon = text === 'abschicken' ? AcceptIconStyled : AbortIconStyled
  return (
    <SubmitBtnStyled style={btnColor} onClick={handleClick}>
      <Icon /> {text}
    </SubmitBtnStyled>
  )
}

const SubmitBtnStyled = styled.button`
  display: flex;
  padding: 15px;
  justify-content: center;
  border-radius: 5px;
  color: white;
  font-size: inherit;
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

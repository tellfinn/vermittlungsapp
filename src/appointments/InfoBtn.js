import React from 'react'
import styled from 'styled-components/macro'
import { ReactComponent as MoreIcon } from '../icons/chevron-down.svg'
import { ReactComponent as LessIcon } from '../icons/chevron-up.svg'

export default function InfoBtn({ infoType, handleInfobtnClick }) {
  const infoBtn =
    infoType === 'more' ? (
      <MoreInfoBtnStyled onClick={handleInfobtnClick}>
        <MoreIconStyled />
      </MoreInfoBtnStyled>
    ) : (
      <LessInfoBtnStyled onClick={handleInfobtnClick}>
        <LessIconStyled />
      </LessInfoBtnStyled>
    )

  return infoBtn
}

const InfoBtnStyled = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  height: 50px;
  width: 100%;
  padding: 10px;
  font-size: 25px;
`

const MoreInfoBtnStyled = styled(InfoBtnStyled)`
  bottom: 5px;
`

const LessInfoBtnStyled = styled(InfoBtnStyled)`
  top: -15px;
`

const MoreIconStyled = styled(MoreIcon)`
  height: 30px;
  width: 30px;
`

const LessIconStyled = styled(LessIcon)`
  height: 40px;
  width: 40px;
`

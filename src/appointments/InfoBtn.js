import React from 'react'
import styled from 'styled-components/macro'
import { ReactComponent as MoreIcon } from '../icons/chevron-circle-down.svg'
import { ReactComponent as LessIcon } from '../icons/chevron-circle-up.svg'

export default function InfoBtn({ infoType, handleInfobtnClick }) {
  const infoBtn =
    infoType === 'more' ? (
      <MoreInfoBtnStyled>
        <MoreIconStyled onClick={handleInfobtnClick} />
      </MoreInfoBtnStyled>
    ) : (
      <LessInfoBtnStyled>
        <LessIconStyled onClick={handleInfobtnClick} />
      </LessInfoBtnStyled>
    )

  return infoBtn
}

const InfoBtnStyled = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${props => (props.infoType === 'more' ? '60px;' : '40px')};
  width: 100%;
  padding: 10px;
`

const MoreInfoBtnStyled = styled(InfoBtnStyled)`
  margin-top: 5px;
  bottom: 0;
`

const LessInfoBtnStyled = styled(InfoBtnStyled)`
  top: 0;
`

const MoreIconStyled = styled(MoreIcon)`
  fill: var(--darkblueish);
  height: 40px;
  width: 40px;
`

const LessIconStyled = styled(LessIcon)`
  fill: var(--darkblueish);
  height: 50px;
  width: 50px;
`

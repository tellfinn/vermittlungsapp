import React from 'react'
import styled from 'styled-components'
import { ReactComponent as NextIcon } from '../icons/chevron-right.svg'
import { ReactComponent as PreviousIcon } from '../icons/chevron-left.svg'

export default function NextButton({
  iconName,
  handleNextBtnClick,
  visibility
}) {
  const icon = iconName === 'next' ? <NextIconStyled /> : <PreviousIconStyled />
  return (
    <StyledNextButton
      onClick={handleNextBtnClick}
      isVisible={visibility}
      iconName={iconName}>
      {icon}
    </StyledNextButton>
  )
}

const NextIconStyled = styled(NextIcon)`
  height: 30px;
  width: 30px;
`

const PreviousIconStyled = styled(PreviousIcon)`
  height: 30px;
  width: 30px;
`

const StyledNextButton = styled.div`
  height: 40px;
  width: 40px;
  ${props => (props.isVisible ? '' : 'display: none')};
  position: fixed;
  left: calc(50% - 20px);
  ${props => (props.iconName === 'next' ? 'bottom: 100px;' : 'top:  100px')};
  z-index: 30;
`

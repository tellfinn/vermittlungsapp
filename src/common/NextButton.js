import React from 'react'
import styled from 'styled-components'
import { ReactComponent as NextIcon } from '../icons/chevron-right.svg'
import { ReactComponent as PreviousIcon } from '../icons/chevron-left.svg'
import { ReactComponent as MoreIcon } from '../icons/arrow-down.svg'

export default function NextButton({
  iconName,
  handleNextBtnClick,
  visibility
}) {
  const icon =
    iconName === 'next' ? (
      <NextIconStyled />
    ) : iconName === 'more' ? (
      <MoreIconStyled />
    ) : (
      <PreviousIconStyled />
    )
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

const MoreIconStyled = styled(MoreIcon)`
  height: 30px;
  width: 30px;
`

const StyledNextButton = styled.div`
  height: 40px;
  width: 40px;
  ${props => (props.isVisible ? '' : 'display: none')};
  position: ${props =>
    props.iconName === 'next'
      ? 'fixed'
      : props.iconName === 'previous'
      ? 'fixed'
      : 'absolute'};
  left: calc(50% - 20px);
  ${props =>
    props.iconName === 'next'
      ? 'bottom: 100px;'
      : props.iconName === 'previous'
      ? 'top:  100px'
      : 'bottom: 0'};
  z-index: 30;
`

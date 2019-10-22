import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { ReactComponent as NextIcon } from '../icons/chevron-circle-right.svg'
import { ReactComponent as PreviousIcon } from '../icons/chevron-circle-left.svg'

NextButton.propTypes = {
  iconName: PropTypes.string,
  handleNextBtnClick: PropTypes.func,
  visibility: PropTypes.bool
}

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
  fill: var(--darkblueish);
  height: 50px;
  width: 50px;
`

const PreviousIconStyled = styled(PreviousIcon)`
  fill: var(--darkblueish);
  height: 50px;
  width: 50px;
`

const StyledNextButton = styled.div`
  height: 50px;
  width: 50px;
  ${props => (props.isVisible ? '' : 'display: none')};
  position: fixed;
  left: calc(50% - 20px);
  ${props => (props.iconName === 'next' ? 'bottom: 100px;' : 'top:  100px')};
  ${props => (props.iconName === 'previous' ? 'z-index: 30;' : '')};
`

import React from 'react'
import styled from 'styled-components/macro'

import { ReactComponent as SettingsIcon } from '../icons/gears.svg'
import { ReactComponent as DeclineIcon } from '../icons/no.svg'
import { ReactComponent as EditIcon } from '../icons/edit.svg'
import { ReactComponent as TrashIcon } from '../icons/trash.svg'

export default function Settingsbar({
  toggleSettings,
  declineClick,
  deleteClick,
  editClick,
  showSettings
}) {
  return (
    <StyledSettingsBar>
      <BtnAreaStyled onClick={toggleSettings}>
        <SettingsIconStyled />
      </BtnAreaStyled>
      {showSettings && (
        <>
          <BtnAreaStyled onClick={deleteClick}>
            <TrashIconStyled />
          </BtnAreaStyled>
          <BtnAreaStyled onClick={editClick}>
            <EditIconStyled />
          </BtnAreaStyled>
          <BtnAreaStyled onClick={declineClick}>
            <DeclineIconStyled />
          </BtnAreaStyled>
        </>
      )}
    </StyledSettingsBar>
  )
}

const StyledSettingsBar = styled.div`
  position: absolute;
  left: 0;
  width: 150px;
  display: inline-flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
  z-index: 15;
`

const BtnAreaStyled = styled.div`
  height: 40px;
  width: 43px;
`

const SettingsIconStyled = styled(SettingsIcon)`
  align-self: end;
  height: 38px;
  width: 38px;
`

const EditIconStyled = styled(EditIcon)`
  height: 38px;
  width: 38px;
  fill: var(--red);
`

const TrashIconStyled = styled(TrashIcon)`
  height: 38px;
  width: 38px;
  fill: var(--red);
`

const DeclineIconStyled = styled(DeclineIcon)`
  height: 38px;
  width: 38px;
  fill: var(--red);
`

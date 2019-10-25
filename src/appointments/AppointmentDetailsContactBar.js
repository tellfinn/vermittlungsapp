import React from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import { ReactComponent as PhoneIcon } from '../icons/phone-fill.svg'
import { ReactComponent as MailIcon } from '../icons/email.svg'
import { ReactComponent as ContactIcon } from '../icons/contact.svg'

export default function Settingsbar({ toggleSettings, showContact }) {
  return (
    <StyledSettingsBar>
      {showContact && (
        <>
          <BtnAreaStyled>
            <a href={'mailto:buero@vermittlung.de'}>
              <MailIconStyled />
            </a>
          </BtnAreaStyled>
          <BtnAreaStyled>
            <PhoneIconStyled />
          </BtnAreaStyled>
        </>
      )}
      <BtnAreaStyled onClick={toggleSettings}>
        <ContactIconStyled />
      </BtnAreaStyled>
    </StyledSettingsBar>
  )
}

const StyledSettingsBar = styled.div`
  position: absolute;
  right: 0;
  display: inline-flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
  overflow-x: none;
  z-index: 15;
`

const BtnAreaStyled = styled.div`
  height: 40px;
  width: 43px;
`

const PhoneIconStyled = styled(PhoneIcon)`
  height: 40px;
  width: 40px;
`

const MailIconStyled = styled(MailIcon)`
  height: 40px;
  width: 40px;
`
const ContactIconStyled = styled(ContactIcon)`
  height: 40px;
  width: 40px;
`

import React from 'react'
import styled from 'styled-components'

export default function MessageField({ defaultValue, onChange }) {
  return (
    <MessageFieldStyled
      placeholder='weitere Informationen'
      name='message'
      defaultValue={defaultValue}
      onChange={onChange}
    />
  )
}

const MessageFieldStyled = styled.textarea`
  min-height: 100px;
`

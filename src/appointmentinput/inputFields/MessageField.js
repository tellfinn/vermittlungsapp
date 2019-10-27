import React, { useState } from 'react'
import styled from 'styled-components'

export default function MessageField() {
  const [message, setMessage] = useState('')

  return (
    <MessageFieldStyled
      placeholder='weitere Informationen'
      name='message'
      value={message}
      onChange={event => setMessage(event.value)}
    />
  )
}

const MessageFieldStyled = styled.textarea`
  min-height: 100px;
`

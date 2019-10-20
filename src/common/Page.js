import React from 'react'
import styled from 'styled-components/macro'

export default function Page({ children }) {
  return <PageStyled>{children}</PageStyled>
}

const PageStyled = styled.main`
  width: 100vw;
  padding: 10px;
  margin-top: 50px;
  overflow-x: hidden;
`

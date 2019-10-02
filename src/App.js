import React, { useEffect, useState } from 'react'
import GlobalStyles from './GlobalStyles'
import Header from './common/Header'
import Page from './common/Page'

function App() {
  return (
    <React.Fragment>
      <GlobalStyles></GlobalStyles>
      <Header />
      <Page />
    </React.Fragment>
  )
}

export default App

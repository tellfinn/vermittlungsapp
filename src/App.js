import React from 'react'
import GlobalStyles from './GlobalStyles'
import Header from './pages/Header'
import Page from './pages/Page'

function App() {
  return (
    <React.Fragment>
      <GlobalStyles></GlobalStyles>
      <Header></Header>
      <Page></Page>
    </React.Fragment>
  )
}

export default App

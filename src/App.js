import React from 'react'
import GlobalStyles from './GlobalStyles'
import Header from './pages/Header'
import Page from './pages/Page'
import Footer from './pages/Footer'

function App() {
  return (
    <React.Fragment>
      <GlobalStyles></GlobalStyles>
      <Header />
      <Page />
      <Footer />
    </React.Fragment>
  )
}

export default App

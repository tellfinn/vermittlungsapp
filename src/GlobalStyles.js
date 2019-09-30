import { createGlobalStyle } from 'styled-components/macro'

export default createGlobalStyle`

  * {
    box-sizing: border-box;
  }

  :root {
  --slate-grey: #6c8aa5;
  --greyish: #d9e0e7;
}

  
  body {
display: grid; 
margin: 0;
font-family: 'Lato', sans-serif;
  }
`

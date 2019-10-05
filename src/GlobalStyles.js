import { createGlobalStyle } from 'styled-components/macro'

export default createGlobalStyle`
scrollbar-width: none;
  * {
    box-sizing: border-box;
  }

  :root {
  --blueish: #216ba5;
  --greyish: #d9e0e7;
}

  
  body {
display: grid; 
grid-template-rows: 50px auto;
margin: 0;
font-family: 'Lato', sans-serif;
  }
`

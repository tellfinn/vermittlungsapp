import { createGlobalStyle } from 'styled-components/macro'

export default createGlobalStyle`
scrollbar-width: none;
  * {
    box-sizing: border-box;
  }

  :root {
  --blueish: #216ba5;
  --greyish: #d9e0e7;
  --green: #237726;
  --red: #963D3D;
}

  
  body {
display: grid; 
grid-template-rows: 50px auto;
margin: 0;
font-family: 'Lato', sans-serif;
  }

 
  .bm-burger-button {
  position: fixed;
  left: 0;
  top: 0;
  width: 40px;
  height: 30px;

}

.bm-burger-bars {
  margin: 3px;
  margin-top: 5px;
  background: #000000;
  border-radius: 3px
}

`

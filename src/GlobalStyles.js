import { createGlobalStyle } from 'styled-components/macro'

export default createGlobalStyle`
scrollbar-width: none;
  * {
    box-sizing: border-box;
  }

  :root {
  --blueish: #216ba5;
  --greyish: #e8e8e8;
  --green: #237726;
  --red: #963D3D;
}

  
  body {
display: flex; 
height: 100vh;
margin: 0;
background-color: #faf9fb;
font-family: Helvetica, sans-serif; 
  font-weight: 300;
  font-size: 18px;
  line-height: 1.4em;
  }

 
button {
  display: flex;
  padding: 15px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: var(--blueish);
  color: white;
  font-size: inherit;
 
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

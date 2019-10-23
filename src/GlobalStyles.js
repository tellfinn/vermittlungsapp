import { createGlobalStyle } from 'styled-components/macro'

export default createGlobalStyle`
scrollbar-width: none;
  * {
    box-sizing: border-box;
  }

  :root {
     --blueish: #007fed;
     --darkblueish: #216ba5;
     --greyish: #e6e6e6;
     --green: #237726;
     --red: #963D3D;
     --background-white:#faf9fb;
     --shadow: 2px 2px 2px grey;
}

  
  body {
display: flex; 
height: 100vh;
margin: 0;
background-color: var(--background-white);
font-family: Helvetica, sans-serif; 
  font-weight: 300;
  font-size: 18px;
  line-height: 1.4em;
  }

 
button {
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: var(--darkblueish);
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


.bm-item-list {
  background-color: var(--greyish);
  padding-top: 40px;
}


.rc-swipeout {
  overflow: hidden;
  position: relative;
}
.rc-swipeout-content {
  position: relative;
  background-color: #fff;
}
.rc-swipeout-cover {
  position: absolute;
  z-index: 2;
  background: transparent;
  height: 100%;
  width: 100%;
  top: 0;
  display: none;
}
.rc-swipeout .rc-swipeout-content,
.rc-swipeout .rc-swipeout-actions {
  -webkit-transition: all 250ms;
  transition: all 250ms;
}
.rc-swipeout-swiping .rc-swipeout-content {
  -webkit-transition: none;
  transition: none;
}
.rc-swipeout-actions {
  position: absolute;
  top: 0;
  bottom: 0;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  overflow: hidden;
  white-space: nowrap;
}
.rc-swipeout-actions-left {
  left: 0;
}
.rc-swipeout-actions-right {
  right: 0;
}
.rc-swipeout-btn {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
      -ms-flex-pack: center;
          justify-content: center;
  position: relative;
  overflow: hidden;
}
.rc-swipeout-btn-text {
  padding: 0 12px;
}

textarea {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #cccccc;
  padding: 8px;
  font-family: inherit;
  font-size: inherit;
  font-weight: lighter;
}

input[type="text"], input[type="email"], input[type="password"], input[type="number"] {
  width: 100%;
    padding: 8px;
    border-radius: 3px;
    border: 1px solid #cccccc;
    font-size: 18px;
}

`

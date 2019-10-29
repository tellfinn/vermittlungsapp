### UKE - Dolmetschervermittlungsapp
UKE - interpreter schedule app

This App is my final project for the neuefische web developer bootcamp in October 2019. It’s a work in progress and there will be a few features added. At the moment only covering the needs of one company - the interpreter service of the UKE in Hamburg.
Since a lot of interpreters can’t answer the phone while they are interpreting, this app should offer them the possibility to quickly see and accept or decline appointments. The user can create, edit, decline or accept appointments.


## Tech stack

MERN Stack:
* MongoDB
* Express.js
* React
* Node.js

# Additional dependencies
* bcrypt
* cors
* mongoose
* nodemon

* react-burger-menu
* react-datepicker
* react-router
* react-router-dom  
* react-select
* react-swipe-to-dismiss
* react-use
* styled-components



### Run on localhost

## Requirements
MongoDB running on localhost:27017


## Setup

```
git@github.com:tellfinn/vermittlungsapp.git


cd vermittlungsapp
npm install
```

## MongoDB
You will need a collection languages with each object having  a key „name“ with the name of language and if necessary an object „alternativeName“ with an array of alternative names.
e.g.: 
```
  {
"name": "kurdisch - kurmanci",
    "alternativeName": ["kurdisch", "kurmanci"]

  }
```



## Run the app in the development mode
You can run the app in development mode with

```
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser. Switch your browser viewport to iphone 6/7/8 as this app was designed for mobile devices 

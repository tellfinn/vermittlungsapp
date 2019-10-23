// tutorial: https://codedaily.io/tutorials/49/Create-a-ProtectedRoute-for-Logged-In-Users-with-Route-Redirect-and-a-Render-Prop-in-React-Router

import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default function ProtectedRoute({ component, loggedIn, path, ...rest }) {
  return (
    <Route
      path={path}
      {...rest}
      render={props => {
        return loggedIn ? (
          component
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: {
                prevLocation: path,
                error: 'Bitte loggen Sie sich ein.'
              }
            }}
          />
        )
      }}
    />
  )
}

import React, { useState, useEffect } from 'react'
import firebase from '@react-firebase/auth'
import { Route, Switch } from 'react-router-dom'

export default () => {
  const [authentication, setAuthState] = useState({
    authenticated: false,
    initializing: true,
  })

  useEffect(
    () =>
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          setAuthState({
            authenticated: true,
            initializing: false,
          })
        } else {
          setAuthState({
            authenticated: false,
            initializing: false,
          })
        }
      }),
    [setAuthState],
  )

  if (authentication.initializing) {
    return <div>Loading</div>
  }
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/login' component={Login} />
          <PrivateRoute
            path='/'
            component={Home}
            authenticated={authentication.authenticated}
          />
          <PrivateRoute
            path='/join'
            component={Join}
            authenticated={authentication.authenticated}
          />
          <PrivateRoute
            path='/create'
            component={Create}
            authenticated={authentication.authenticated}
          />
        </Switch>
      </div>
    </Router>
  )
}

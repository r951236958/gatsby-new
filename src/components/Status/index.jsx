import React, { useEffect, useState } from "react"
import { Link as RouterLink, navigate } from "gatsby"
import { getUser, isLoggedIn, logout } from "../../utils/auth"
import Typography from "@material-ui/core/Typography"
import { FirebaseAuthProvider } from "@react-firebase/auth"
import firebase from "gatsby-plugin-firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import Button from "@material-ui/core/Button"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import styled from "styled-components"

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  signInSuccessUrl: "/signedIn",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  // signInSuccessUrl: "/app/profile",
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
  // signInSuccessUrl: '/app/profile',
  callbacks: {
    //signInSuccessWithAuthResult: (result) => {
    //  setUser(result.user);
    //  navigate('/app/profile');
    //},
    // Called when the user has been successfully signed in.
    signInSuccessWithAuthResult: () => false,
  },
}

const StyledButton = styled(Button)({
  marginLeft: "auto",
})

const AuthStatus = styled(Grid)({
  float: "right",
})

const UserInfo = styled(Grid)({
  float: "left",
})

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false) // Local signed-in state.

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setIsSignedIn(!!user)
    })
    return () => unregisterAuthObserver() // Make sure we un-register Firebase observers when the component unmounts.
  }, [])

  return (
    <>
      {!isSignedIn ? (
        <div>
          <h1>My App</h1>
          <p>Please sign-in:</p>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      ) : (
        <div>
          <h1>My App</h1>
          <p>Welcome {firebase.auth().currentUser.displayName}! </p>
          <p>
            You're signed in{" "}
            <span role="img" aria-label="user-signin">
              🎉
            </span>{" "}
          </p>
          <Button
            color="secondary"
            variant="outlined"
            onClick={() => firebase.auth().signOut()}
          >
            Sign-out
          </Button>
        </div>
      )}
    </>
  )
}

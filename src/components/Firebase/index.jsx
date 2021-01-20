import React from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'gatsby-plugin-firebase'

const CLIENT_ID = process.env.FIREBASE_APP_ID

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/app/profile',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    //  firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    //  firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // Required to enable ID token credentials for this provider.
      clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
    },
    {
      provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      scopes: ['public_profile', 'email', 'user_likes', 'user_friends'],
    },
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      // Whether the display name should be displayed in Sign Up page.
      requireDisplayName: true,
      //signInMethod: getEmailSignInMethod(),
    },
    {
      provider: 'apple.com',
    },
    firebase.auth.AnonymousAuthProvider.PROVIDER_ID,
  ],
  // signInSuccessUrl: '/app/profile',
  callbacks: {
    //signInSuccessWithAuthResult: (result) => {
    //  setUser(result.user);
    //  navigate('/app/profile');
    //},
    // Called when the user has been successfully signed in.
    signInSuccessWithAuthResult: result => {
      setUser(result.user)
      navigate('/app/profile')
    },
  },
  // Terms of service url.
  tosUrl: 'https://www.google.com',
  // Privacy policy url.
  privacyPolicyUrl: 'https://www.google.com',
  credentialHelper:
    CLIENT_ID && CLIENT_ID != 'YOUR_OAUTH_CLIENT_ID'
      ? firebase.auth.CredentialHelper.GOOGLE_YOLO
      : firebase.auth.CredentialHelper.NONE,
}

function UserSignIn() {
  return (
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
  )
}

export default UserSignIn

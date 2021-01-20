import React from 'react';
import { navigate } from 'gatsby';
import View from './View';
import * as firebaseui from 'firebaseui';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { setUser, isLoggedIn } from '../utils/auth';
//import firebase from 'gatsby-plugin-firebase';
import firebase from 'firebase/app';
import SEO from './SEO';
import firebaseConfig from '../utils/firebaseConfig';

const Login = () => {
  const siteTitle = 'Log In';
  if (isLoggedIn()) {
    navigate(`/app/profile`);
  }

  const CLIENT_ID = process.env.GOOGLE_AUTH_CLIENT_ID;

  function getUiConfig(auth) {
    return {
      signInFlow: 'popup',
      signInSuccessUrl: '/app/profile',
      signInOptions: [
        {
          provider: auth.GoogleAuthProvider.PROVIDER_ID,
          // Required to enable ID token credentials for this provider.
          clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
        },
        {
          provider: auth.FacebookAuthProvider.PROVIDER_ID,
          scopes: [
            'public_profile',
            'email',
            'user_likes',
            'user_friends',
          ],
        },
        auth.TwitterAuthProvider.PROVIDER_ID,
        auth.GithubAuthProvider.PROVIDER_ID,
        {
          provider: auth.EmailAuthProvider.PROVIDER_ID,
          // Whether the display name should be displayed in Sign Up page.
          requireDisplayName: true,
          //signInMethod: getEmailSignInMethod(),
        },
        {
          provider: 'apple.com',
        },
        firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
      ],
      // signInSuccessUrl: '/app/profile',
      callbacks: {
        //signInSuccessWithAuthResult: (result) => {
        //  setUser(result.user);
        //  navigate('/app/profile');
        //},
        // Called when the user has been successfully signed in.
        signInSuccessWithAuthResult: function (
          result,
          authResult,
          redirectUrl,
        ) {
          setUser(result.user);
          navigate('/app/profile');
          if (authResult.user) {
            handleSignedInUser(authResult.user);
          }
          if (authResult.additionalUserInfo) {
            document.getElementById(
              'is-new-user',
            ).textContent = authResult.additionalUserInfo.isNewUser
              ? 'New User'
              : 'Existing User';
          }
          // Do not redirect.
          return false;
        },
      },
      // Terms of service url.
      tosUrl: 'https://www.google.com',
      // Privacy policy url.
      privacyPolicyUrl: 'https://www.google.com',
      credentialHelper:
        CLIENT_ID && CLIENT_ID != 'YOUR_OAUTH_CLIENT_ID'
          ? firebaseui.auth.CredentialHelper.GOOGLE_YOLO
          : firebaseui.auth.CredentialHelper.NONE,
    };
  }

  return (
    <View title={siteTitle}>
      <SEO title="Login" />
      <p>Please sign-in to access to the private route:</p>
      {firebase && (
        <StyledFirebaseAuth
          uiConfig={getUiConfig(firebase.auth)}
          firebaseAuth={firebase.auth()}
        />
      )}
    </View>
  );
};

export default Login;

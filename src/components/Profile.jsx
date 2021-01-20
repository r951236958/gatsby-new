import React, { useState } from 'react';
import View from './View';
import { isLoggedIn, getUser } from '../utils/auth';
import firebase from 'gatsby-plugin-firebase';
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd,
} from '@react-firebase/auth';
import { firebaseConfig } from '../utils/firebaseConfig';
import Highlight, { defaultProps } from 'prism-react-renderer';
import Prism from 'prismjs';
import PrismTheme from 'prismjs/themes/prism-okaidia.css';
import Icon from '@material-ui/core/Icon';
import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SEO from './SEO';

const LockIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
  </SvgIcon>
);

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  table: {
    minWidth: 650,
  },
}));

const Profile = () => {
  const siteTitle = 'User Profile';
  const classes = useStyles();
  const user = getUser();
  //const user = firebase.auth().currentUser;
  const { displayName, email, photoURL, emailVerified } = user;
  const accessToken = user.stsTokenManager.accessToken;

  return (
    <View title={siteTitle}>
      <SEO title="Profile" />
      <FirebaseAuthProvider firebase={firebase}>
        <Avatar alt="userPhoto" src={photoURL} />
        <>{user != null ? <p>User Logged In!!</p> : <p>No!!</p>}</>
        <div className={classes.root}>
          <List component="nav" aria-label="user profile">
            <ListItem button>
              <ListItemIcon>
                <LockIcon />
              </ListItemIcon>
              <ListItemText primary="Members only" />
            </ListItem>
          </List>
          <Divider />

          <List component="nav" aria-label="user profile">
            <MenuItem>
              <ListItemIcon>
                <Icon>account_box</Icon>
              </ListItemIcon>
              <Typography variant="inherit">{`${displayName}`}</Typography>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Icon>mail</Icon>
              </ListItemIcon>
              <Typography variant="inherit">{`${email}`}</Typography>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Icon>mark_email_read</Icon>
              </ListItemIcon>
              <Typography variant="inherit">{`${emailVerified}`}</Typography>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Icon>vpn_key</Icon>
              </ListItemIcon>
              <Typography variant="inherit">{`${accessToken}`}</Typography>
            </MenuItem>
          </List>
          <div>
            <FirebaseAuthConsumer>
              {({ isSignedIn, user, providerId }) => {
                return (
                  <Highlight
                    Prism={Prism}
                    theme={PrismTheme}
                    {...defaultProps}
                    code={JSON.stringify(
                      { isSignedIn, user, providerId },
                      null,
                      2,
                    )}
                    language="json"
                  >
                    {({
                      className,
                      style,
                      tokens,
                      getLineProps,
                      getTokenProps,
                    }) => (
                      <pre className={className} style={PrismTheme}>
                        {tokens.map((line, i) => (
                          <div {...getLineProps({ line, key: i })}>
                            {line.map((token, key) => (
                              <span
                                {...getTokenProps({ token, key })}
                              />
                            ))}
                          </div>
                        ))}
                      </pre>
                    )}
                  </Highlight>
                );
              }}
            </FirebaseAuthConsumer>
          </div>
        </div>
      </FirebaseAuthProvider>
    </View>
  );
};

export default Profile;

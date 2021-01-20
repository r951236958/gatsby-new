import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Link as RouterLink, navigate } from 'gatsby';
import { getUser, isLoggedIn, logout } from '../../utils/auth';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 375,
    textAlign: 'center',

    '& > *': {
      margin: theme.spacing(1),
    },
  },
  card: {
    justifyContent: 'center',
  },
  avatar: {
    margin: '0 auto',
  },
  button: {
    width: '100%',
  },
}));

export default function () {
  const classes = useStyles();
  const user = getUser();
  const { displayName, photoURL, email, emailVerified } = user;

  return (
    <div className={classes.root}>
      <List>
        <CardContent>
          <Avatar
            className={classes.avatar}
            alt="user-photo"
            src={photoURL}
          />
          <Typography variant="h5" component="h2" gutterBottom>
            {displayName}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            gutterBottom
          >
            {email}
          </Typography>
          <Button
            color="inherit"
            to="/app/profile"
            component={RouterLink}
            className={classes.button}
          >
            Profile
          </Button>
          <Divider />
          <Button
            color="inherit"
            href="/"
            className={classes.button}
            onClick={(event) => {
              event.preventDefault();
              logout(firebase).then(() => navigate(`/app/login`));
            }}
          >
            Logout
          </Button>
        </CardContent>
      </List>
    </div>
  );
}

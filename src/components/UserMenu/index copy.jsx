import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import ListItem from '@material-ui/core/ListItem';
import { Link as RouterLink, navigate } from 'gatsby';
import { getUser, isLoggedIn, logout } from '../../utils/auth';
import firebase from 'gatsby-plugin-firebase';
import menuItem from './menuItem';

const useStyles = makeStyles((theme) => ({
  menu: {
    maxWidth: 375,
    textAlign: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    margin: '0 auto',
  },
  button: {
    textAlign: 'center',
    width: '100%',
  },
}));

function MenuItemLink(props) {
  return <ListItem button component={RouterLink} {...props} />;
}
function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

function UserMenu() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const user = getUser();
  const { displayName, photoURL, email, emailVerified } = user;

  return (
    <div>
      <IconButton
        aria-label="open-menu"
        aria-controls="user-profile-menu"
        aria-haspopup="true"
        color="inherit"
        onClick={handleClick}
      >
        <Icon>account_circle</Icon>
      </IconButton>
      <Menu
        className={classes.menu}
        id="user-profile-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Card>
          <Avatar
            className={classes.avatar}
            alt="user-photo"
            src={photoURL}
          />
          <CardContent>
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
          </CardContent>

          <MenuItemLink color="inherit" to="/about">
            About
          </MenuItemLink>
          <MenuItemLink color="inherit" to="/app/profile">
            Profile
          </MenuItemLink>
          <ListItemLink
            color="inherit"
            href="/"
            onClick={(event) => {
              event.preventDefault();
              logout(firebase).then(() => navigate(`/app/login`));
            }}
          >
            Logout
          </ListItemLink>
        </Card>
      </Menu>
    </div>
  );
}

export default UserMenu;

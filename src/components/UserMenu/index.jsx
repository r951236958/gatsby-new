import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import ListItem from '@material-ui/core/ListItem';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { Link as RouterLink, navigate } from 'gatsby';
import { IconButton } from 'gatsby-theme-material-ui';
import firebase from 'gatsby-plugin-firebase';
import {
  getUser,
  isLoggedIn,
  logout,
  isSignedIn,
} from '../../utils/auth';

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

const options = [
  'Create a merge commit',
  'Squash and merge',
  'Rebase and merge',
];

function MenuItemLink(props) {
  return <ListItem button component={RouterLink} {...props} />;
}

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function SplitButton() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target)
    ) {
      return;
    }

    setOpen(false);
  };

  const { displayName, photoURL, email } = getUser();

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item xs={12}>
        <ButtonGroup
          variant="contained"
          color="primary"
          ref={anchorRef}
          aria-label="split button"
        >
          <IconButton
            aria-label="open-menu"
            aria-controls="user-profile-menu"
            aria-haspopup="true"
            color="inherit"
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            onClick={handleToggle}
          >
            <Icon>account_circle</Icon>
          </IconButton>
        </ButtonGroup>

        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom'
                    ? 'center top'
                    : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu">
                    <Avatar
                      className={classes.avatar}
                      alt="user-photo"
                      src={photoURL}
                    />
                    <Typography
                      variant="h5"
                      component="h2"
                      gutterBottom
                    >
                      {displayName}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      gutterBottom
                    >
                      {email}
                    </Typography>
                    <MenuItemLink color="inherit" to="/about">
                      About
                    </MenuItemLink>
                    <MenuItemLink color="inherit" to="/app/profile">
                      Profile
                    </MenuItemLink>
                  </MenuList>
                  <ListItemLink
                    color="inherit"
                    href="/"
                    onClick={(event) => {
                      event.preventDefault();
                      logout(firebase).then(() =>
                        navigate(`/app/login`),
                      );
                    }}
                  >
                    Logout
                  </ListItemLink>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Grid>
    </Grid>
  );
}

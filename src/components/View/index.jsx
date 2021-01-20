import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Status from '../Status';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
}));

const View = ({ title, children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container
        component="main"
        maxWidth="md"
        className={classes.main}
      >
        <Status />
        <Typography variant="h3" component="h2" gutterBottom>
          {title}
        </Typography>
        {children}
      </Container>
    </div>
  );
};

View.propTypes = {
  title: PropTypes.string.isRequired,
};

export default View;

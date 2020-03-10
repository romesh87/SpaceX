import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  title: {
    textAlign: 'center'
  }
}));

const LaunchDetails = props => {
  const classes = useStyles();

  return (
    <Paper elevation={2}>
      <Typography className={classes.title} variant='h3'>
        Title
      </Typography>
      <div>Images</div>
      <div>Description</div>
      <div>Links</div>
    </Paper>
  );
};

LaunchDetails.propTypes = {};

export default LaunchDetails;

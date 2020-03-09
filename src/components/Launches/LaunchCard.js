import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

import { Card, CardHeader, CardMedia, CardContent } from '@material-ui/core';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  launchCard: {
    maxWidth: '300px',
    height: '350px'
  },

  header: {
    textAlign: 'center'
  },

  missionPatch: {
    maxWidth: '100px',
    maxHeight: '100px',
    display: 'block',
    margin: 'auto'
  }
}));

const LaunchCard = props => {
  const launch = props.launch;

  const classes = useStyles();

  return (
    <Card className={classes.launchCard}>
      <CardHeader className={classes.header} title={launch.mission_name} />
      <img
        className={classes.missionPatch}
        src={launch.links.mission_patch_small}
        alt='mission_patch'
      />

      <CardContent>
        <p>{launch.rocket.rocket_name}</p>
        <p>
          <Moment>{launch.launch_date_utc}</Moment>
        </p>
        <p>{launch.launch_site.site_name_long}</p>
      </CardContent>
    </Card>
  );
};

LaunchCard.propTypes = {};

export default LaunchCard;

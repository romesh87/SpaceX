import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Divider
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  launchCard: {
    maxWidth: '300px',
    height: '400px'
  },

  header: {
    textAlign: 'center'
  },

  missionPatch: {
    marginTop: '10px',
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
      <CardHeader
        className={classes.header}
        title={launch.mission_name}
        titleTypographyProps={{ variant: 'h6' }}
      />
      <Divider />
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
      <Divider />
      <CardActions>
        <Button
          size='medium'
          color='secondary'
          variant='outlined'
          component={Link}
          to={`/launches/${launch.flight_number}`}
        >
          Details
        </Button>
      </CardActions>
    </Card>
  );
};

LaunchCard.propTypes = {};

export default LaunchCard;

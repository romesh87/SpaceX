import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Zoom from '@material-ui/core/Zoom';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/';

import Skeleton from '@material-ui/lab/Skeleton';

import LaunchCard from './LaunchCard';
import Pagination from '../Pagination';
import {
  getLaunches,
  setCurrentPage,
  loadFavourites
} from '../../actions/launch';

import * as config from '../../config/config';

const useStyles = makeStyles(theme => ({
  title: {
    textAlign: 'center',
    marginBottom: '15px'
  }
}));

const Launches = props => {
  const classes = useStyles();

  const launches = props.launch.launches;
  const launchesType = props.launch.launchesType;
  const loading = props.launch.loading;
  const currentPageNumber = props.launch.currentPageNumber;
  const resultsCount = props.launch.resultsCount;

  useEffect(() => {
    props.getLaunches(
      {
        limit: config.ITEMS_PER_PAGE,
        offset: (currentPageNumber - 1) * config.ITEMS_PER_PAGE
      },
      launchesType
    );
    // eslint-disable-next-line
  }, [currentPageNumber]);

  const pageChangeHandler = (event, value) => {
    props.setCurrentPage(+value);
  };

  if (loading)
    return (
      <Grid container spacing={2}>
        {Array.from({ length: config.ITEMS_PER_PAGE }).map((el, index) => (
          <Grid key={index} item sm={6} md={4}>
            <Skeleton variant='rect' height={400} />
          </Grid>
        ))}
      </Grid>
    );

  return (
    <Fragment>
      <Typography className={classes.title} variant='h5' color='primary'>
        {`${launchesType} launches`.toUpperCase()}
      </Typography>
      <Grid container spacing={2}>
        {launches &&
          launches.map(launch => (
            <Grid key={launch._id} item sm={6} md={4}>
              <Zoom in timeout={500}>
                <LaunchCard
                  launch={launch}
                  loadFavourites={props.loadFavourites}
                  auth={props.auth}
                  launchesType={launchesType}
                />
              </Zoom>
            </Grid>
          ))}
      </Grid>
      <Pagination
        page={currentPageNumber}
        count={1 + Math.floor(resultsCount / config.ITEMS_PER_PAGE)}
        onChange={pageChangeHandler}
      />
    </Fragment>
  );
};

Launches.propTypes = {
  getLaunches: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  loadFavourites: PropTypes.func.isRequired,
  launch: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    launch: state.launch,
    auth: state.auth
  };
};

export default connect(mapStateToProps, {
  getLaunches,
  setCurrentPage,
  loadFavourites
})(Launches);

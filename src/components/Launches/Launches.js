import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Zoom from '@material-ui/core/Zoom';

import Skeleton from '@material-ui/lab/Skeleton';

import LaunchCard from './LaunchCard';
import Pagination from '../Pagination';
import { getLaunches, setCurrentPage } from '../../actions/launch';

import * as config from '../../config/config';

const Launches = props => {
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
      <Grid container spacing={2}>
        {launches &&
          launches.map(launch => (
            <Grid key={launch._id} item sm={6} md={4}>
              <Zoom in timeout={500}>
                <LaunchCard launch={launch} />
              </Zoom>
            </Grid>
          ))}
      </Grid>
      <Pagination
        page={currentPageNumber}
        count={Math.floor(resultsCount / config.ITEMS_PER_PAGE)}
        onChange={pageChangeHandler}
      />
    </Fragment>
  );
};

Launches.propTypes = {
  getLaunches: PropTypes.func.isRequired,
  launch: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    launch: state.launch
  };
};

export default connect(mapStateToProps, { getLaunches, setCurrentPage })(
  Launches
);

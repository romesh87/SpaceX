import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Zoom } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import LaunchCard from './LaunchCard';
import Pagination from '../Pagination';
import { getLaunches, setCurrentPage } from '../../actions/launch';

const ITEMS_PER_PAGE = 6;

const Launches = props => {
  const launches = props.launch.launches;
  const loading = props.launch.loading;
  const currentPageNumber = props.launch.currentPageNumber;
  const resultsCount = props.launch.resultsCount;

  useEffect(() => {
    props.getLaunches(
      {
        limit: ITEMS_PER_PAGE,
        offset: (currentPageNumber - 1) * ITEMS_PER_PAGE
      },
      'past'
    );
  }, [currentPageNumber]);

  const pageChangeHandler = (event, value) => {
    props.setCurrentPage(+value);
  };

  return (
    <Fragment>
      <Grid container spacing={2}>
        {launches
          ? launches.map(launch => (
              <Grid key={launch._id} item sm={6} md={4}>
                <Zoom in timeout={500}>
                  <LaunchCard launch={launch} />
                </Zoom>
              </Grid>
            ))
          : Array.from(Array(ITEMS_PER_PAGE)).map((el, index) => (
              <Grid key={index} item sm={6} md={4}>
                <Skeleton variant='rect' height={400} />
              </Grid>
            ))}
      </Grid>
      <Pagination
        page={currentPageNumber}
        count={Math.floor(resultsCount / ITEMS_PER_PAGE)}
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

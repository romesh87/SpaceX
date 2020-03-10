import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Zoom } from '@material-ui/core';

import LaunchCard from './LaunchCard';
import Pagination from '../Pagination';
import { getLaunches, setCurrentPage } from '../../actions/launch';

const ITEMS_PER_PAGE = 6;

const Launches = props => {
  const launches = props.launch.launches;
  const loading = props.launch.loading;
  const currentPageNumber = props.launch.currentPageNumber;
  const resultsCount = props.launch.resultsCount;
  const currentPageResults = props.launch.currentPageResults;

  useEffect(() => {
    if (launches) {
      props.setCurrentPage(1, ITEMS_PER_PAGE);
    } else {
      props.getLaunches();
    }
  }, [launches]);

  const pageChangeHandler = (event, value) => {
    props.setCurrentPage(value, ITEMS_PER_PAGE);
  };

  return (
    <Fragment>
      <Grid container spacing={2}>
        {currentPageResults &&
          currentPageResults.map(launch => (
            <Grid key={launch.flight_number} item sm={6} md={4}>
              <Zoom in timeout={500}>
                <LaunchCard launch={launch} />
              </Zoom>
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

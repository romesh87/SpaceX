import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Zoom } from '@material-ui/core';

import LaunchCard from './LaunchCard';
import Pagination from '../Pagination';
import { getLaunches } from '../../actions/launch';

const ITEMS_PER_PAGE = 6;

const Launches = props => {
  const launches = props.launch.launches;

  const [pagesCount, setPagesCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    props.getLaunches({ limit: ITEMS_PER_PAGE, offset: 0 });
    setPagesCount(launches.length / 6);
  }, []);

  const pageChangeHandler = e => {
    console.log(e);
  };

  return (
    <Fragment>
      <Grid container spacing={2}>
        {launches &&
          launches.map(launch => (
            <Grid key={launch.flight_number} item sm={6} md={4}>
              <Zoom in timeout={500}>
                <LaunchCard launch={launch} />
              </Zoom>
            </Grid>
          ))}
      </Grid>
      <Pagination
        count={pagesCount}
        page={currentPage}
        onChange={e => pageChangeHandler(e)}
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

export default connect(mapStateToProps, { getLaunches })(Launches);

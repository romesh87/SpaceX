import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Zoom } from '@material-ui/core';

import LaunchCard from './LaunchCard';

const Launches = props => {
  return (
    <div>
      <Grid container spacing={2}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15].map(val => (
          <Grid key={val} item>
            <Zoom in timeout={500}>
              <div
                style={{
                  height: '200px',
                  width: '150px',
                  border: '1px solid #eee'
                }}
              >
                {`Item ${val}`}
              </div>
            </Zoom>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

Launches.propTypes = {};

export default Launches;

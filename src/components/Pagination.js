import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2)
  },

  paginationUl: {
    justifyContent: 'center'
  }
}));

const PaginationComponent = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Pagination
        count={props.count}
        page={props.page}
        onChange={props.onChange}
        color='secondary'
        classes={{
          ul: classes.paginationUl
        }}
      />
    </div>
  );
};

Pagination.propTypes = {
  count: PropTypes.number,
  page: PropTypes.number,
  onChange: PropTypes.func
};

export default PaginationComponent;

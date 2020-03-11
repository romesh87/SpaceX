import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles, fade } from '@material-ui/core';

import { toggleSideDrawer } from '../actions/UI';

const useStyles = makeStyles(theme => ({
  toolBar: {
    justifyContent: 'space-between'
  },
  searchBar: {
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0.5, 0.5, 6),
    minWidth: '150px'
  },
  input: {
    color: theme.palette.common.white
  },
  searchIcon: {
    height: '100%'
  }
}));

const NavBar = props => {
  const classes = useStyles();

  const menuClickedHandler = () => {
    props.toggleSideDrawer();
  };

  return (
    <div>
      <AppBar position='fixed'>
        <Toolbar className={classes.toolBar}>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='menu'
            className={classes.menu}
            onClick={menuClickedHandler}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.searchBar}>
            <SearchIcon />
            <InputBase className={classes.input} placeholder='Search..' />
          </div>
          <Button color='inherit'>Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

NavBar.propTypes = {
  toggleSideDrawer: PropTypes.func.isRequired
};

export default connect(null, { toggleSideDrawer })(NavBar);

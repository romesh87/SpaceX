import React from 'react';
import PropTypes from 'prop-types';

import { AppBar, Toolbar, IconButton, InputBase } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Menu as MenuIcon, Search as SearchIcon } from '@material-ui/icons';

import { makeStyles, fade } from '@material-ui/core';
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

  return (
    <div>
      <AppBar position='fixed'>
        <Toolbar className={classes.toolBar}>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='menu'
            className={classes.menu}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.searchBar}>
            <SearchIcon />
            <InputBase className={classes.input} />
          </div>

          <Button color='inherit'>Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

NavBar.propTypes = {};

export default NavBar;

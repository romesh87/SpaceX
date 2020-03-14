import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountIcon from '@material-ui/icons/AccountCircle';
import { makeStyles, fade } from '@material-ui/core';

import { toggleSideDrawer } from '../actions/UI';
import { signOut } from '../actions/auth';

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
  },
  accountIcon: {
    verticalAlign: 'middle'
  },
  userName: {
    verticalAlign: 'middle',
    marginRight: '5px',
    marginLeft: '2px'
  }
}));

const NavBar = props => {
  const classes = useStyles();

  const isAuthenticated = props.auth.isAuthenticated;
  const user = props.auth.user;

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
          {isAuthenticated ? (
            <div>
              <AccountIcon className={classes.accountIcon} />
              <span className={classes.userName}>
                {user.name && user.name.split(' ')[0]}
              </span>
              <Button color='inherit' onClick={() => props.signOut()}>
                Logout
              </Button>
            </div>
          ) : (
            <Button
              color='inherit'
              onClick={() => props.history.push('/signin')}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

NavBar.propTypes = {
  toggleSideDrawer: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(
  connect(mapStateToProps, { toggleSideDrawer, signOut })(NavBar)
);

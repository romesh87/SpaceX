import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core';

import { toggleSideDrawer } from '../actions/UI';
import { getLaunches, setLaunchesType } from '../actions/launch';

import * as config from '../config/config';

const useStyles = makeStyles(theme => ({
  list: {
    width: '220px'
  }
}));

const SideDrawer = props => {
  const classes = useStyles();

  const sideDrawerCloseHandler = () => {
    props.toggleSideDrawer();
  };

  const linkClickedHandler = type => {
    props.getLaunches(
      {
        limit: config.ITEMS_PER_PAGE,
        offset: 0
      },
      type
    );
    props.setLaunchesType(type);
    props.toggleSideDrawer();
  };

  return (
    <Drawer open={props.UI.sideDrawerVisible} onClose={sideDrawerCloseHandler}>
      <div
        className={classes.list}
        role='presentation'
        // onClick={toggleDrawer(side, false)}
        // onKeyDown={toggleDrawer(side, false)}
      >
        <List>
          <ListItem button>
            <ListItemText
              primary='All Launches'
              onClick={() => linkClickedHandler('all')}
            />
          </ListItem>
          <ListItem button>
            <ListItemText
              primary='Upcoming Launches'
              onClick={() => linkClickedHandler('upcoming')}
            />
          </ListItem>
          <ListItem button>
            <ListItemText
              primary='Past Launches'
              onClick={() => linkClickedHandler('past')}
            />
          </ListItem>
        </List>
        <Divider />
        <List>
          {['About Us'].map(text => (
            <ListItem button key={text}>
              {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

SideDrawer.propTypes = {
  UI: PropTypes.object.isRequired,
  toggleSideDrawer: PropTypes.func.isRequired,
  getLaunches: PropTypes.func.isRequired,
  setLaunchesType: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    UI: state.UI
  };
};

export default connect(mapStateToProps, {
  toggleSideDrawer,
  getLaunches,
  setLaunchesType
})(SideDrawer);

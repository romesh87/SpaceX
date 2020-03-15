import React, { useState } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import firebase from '../../firebase';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import FavIcon from '@material-ui/icons/Favorite';
import FavIconOutlined from '@material-ui/icons/FavoriteBorder';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  launchCard: {
    maxWidth: '300px',
    height: '400px'
  },

  header: {
    textAlign: 'center',
    height: '30px'
  },

  missionPatch: {
    marginTop: '10px',
    height: '100px',
    display: 'block',
    margin: 'auto'
  },

  cardActions: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}));

const LaunchCard = props => {
  const [isFavourite, setFavourite] = useState();
  const classes = useStyles();

  const launch = props.launch;

  if (props.auth.user) {
    firebase
      .firestore()
      .collection('users')
      .doc(props.auth.user.uid)
      .onSnapshot(function(doc) {
        const data = doc.data();
        if (data.favouriteLaunches.includes(launch._id)) {
          setFavourite(true);
        } else {
          setFavourite(false);
        }
      });
  }

  const toggleFavouriteHandler = async () => {
    try {
      const user = await firebase.auth().currentUser;
      const userInfo = await firebase
        .firestore()
        .collection('users')
        .where(firebase.firestore.FieldPath.documentId(), '==', user.uid)
        .get();

      const data = userInfo.docs[0].data();

      if (data.favouriteLaunches.includes(launch._id)) {
        // Remove favourite
        const arrayRemove = firebase.firestore.FieldValue.arrayRemove;

        await firebase
          .firestore()
          .collection('users')
          .doc(user.uid)
          .update({ favouriteLaunches: arrayRemove(launch._id) });
      } else {
        // Add favourite
        const arrayUnion = firebase.firestore.FieldValue.arrayUnion;

        await firebase
          .firestore()
          .collection('users')
          .doc(user.uid)
          .update({ favouriteLaunches: arrayUnion(launch._id) });
      }
    } catch (err) {
      console.error(err);
    }
  };

  let favouriteButton = null;
  if (props.auth.isAuthenticated /* && props.launchesType !== 'favourite' */) {
    if (isFavourite) {
      favouriteButton = (
        <IconButton
          edge='start'
          color='secondary'
          onClick={toggleFavouriteHandler}
        >
          <FavIcon />
        </IconButton>
      );
    } else {
      favouriteButton = (
        <IconButton
          edge='start'
          color='secondary'
          onClick={toggleFavouriteHandler}
        >
          <FavIconOutlined />
        </IconButton>
      );
    }
  }

  return (
    <Card className={classes.launchCard}>
      <CardHeader
        className={classes.header}
        title={launch.mission_name}
        titleTypographyProps={{ variant: 'h6' }}
      />
      <Divider />
      <img
        className={classes.missionPatch}
        src={
          launch.links.mission_patch_small
            ? launch.links.mission_patch_small
            : 'spacex.png'
        }
        alt='mission_patch'
      />
      <CardContent>
        <p>{launch.rocket.rocket_name}</p>
        <p>
          <Moment>{launch.launch_date_utc}</Moment>
        </p>
        <p>{launch.launch_site.site_name_long}</p>
      </CardContent>
      <Divider />
      <CardActions className={classes.cardActions}>
        <Button
          size='medium'
          color='secondary'
          variant='outlined'
          component={Link}
          to={`/launches/${launch.flight_number}`}
        >
          Details
        </Button>
        {favouriteButton}
      </CardActions>
    </Card>
  );
};

LaunchCard.propTypes = {
  launch: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  launchesType: PropTypes.string.isRequired,
  loadFavourites: PropTypes.func.isRequired
};

export default LaunchCard;

import React, { useEffect, Fragment } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import RedditIcon from '@material-ui/icons/Reddit';
import YoutubeIcon from '@material-ui/icons/YouTube';

import { makeStyles } from '@material-ui/core';
import { getLaunch } from '../actions/launch';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '20px'
  },
  gridItem: {
    height: '250px'
  },
  image: {
    height: '100%',
    width: '100%'
  },
  title: {
    textAlign: 'center',
    margin: '0 20px 20px 20px'
  },
  details: {
    margin: '20px 0',
    display: 'block',
    borderWidth: '1px'
  },
  links: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#eee',
    borderRadius: '3px'
  },
  divider: {
    margin: '20px 0'
  },
  status: {
    margin: '20px 0',
    textAlign: 'center',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#eee',
    padding: '10px'
  },
  statusSuccess: {
    color: 'green'
  },
  statusFail: {
    color: 'red'
  },
  statusUpcoming: {
    color: 'grey'
  }
}));

const LaunchDetails = props => {
  const classes = useStyles();

  const launch = props.launch.launch;
  const loading = props.launch.loading;

  useEffect(() => {
    console.log(props);
    props.getLaunch(props.match.params.id);
  }, []);

  if (loading) return <LinearProgress />;

  const status = {};
  if (launch) {
    if (launch.launch_success === true) {
      status.text = 'Success';
      status.class = 'statusSuccess';
    } else if (launch.launch_success === false) {
      status.text = 'Fail';
      status.class = 'statusSuccess';
    } else {
      status.text = 'Upcoming';
      status.class = 'statusUpcoming';
    }
  }

  //console.log(classes.statusSuccess);

  return (
    launch && (
      <Fragment>
        <Link component={RouterLink} variant='button' to='/' color='secondary'>
          Go Back
        </Link>
        <Paper className={classes.root} elevation={2}>
          <Typography className={classes.title} variant='h4' color='primary'>
            {launch.mission_name}
          </Typography>
          <Divider className={classes.divider} />
          <Grid container spacing={0}>
            {launch.links.flickr_images.slice(0, 4).map((image, index) => (
              <Grid className={classes.gridItem} item xs={6} sm={3}>
                <a href={image}>
                  <img
                    key={index}
                    className={classes.image}
                    src={image}
                    alt={`img ${index + 1}`}
                  />
                </a>
              </Grid>
            ))}
          </Grid>
          <div className={classes.details}>
            <Typography variant='body1'>{launch.details}</Typography>
          </div>
          <div className={classes.status}>
            <Typography variant='h6'>
              Status:{' '}
              <span className={classes[status.class]}>{status.text}</span>
            </Typography>
          </div>

          <div className={classes.links}>
            <IconButton
              edge='start'
              color='secondary'
              aria-label='reddit'
              onClick={() => {
                window.location.href = launch.links.reddit_launch;
              }}
              disabled={!launch.links.reddit_launch}
            >
              <RedditIcon fontSize='large' />
            </IconButton>
            <IconButton
              edge='start'
              color='secondary'
              aria-label='youtube'
              onClick={() => {
                window.location.href = launch.links.video_link;
              }}
              disabled={!launch.links.video_link}
            >
              <YoutubeIcon fontSize='large' />
            </IconButton>
            <Link href={launch.links.presskit} variant='overline'>
              Presskit
            </Link>
            <Link href={launch.links.article_link} variant='overline'>
              Article
            </Link>
            <Link href={launch.links.wikipedia} variant='overline'>
              Wikipedia
            </Link>
          </div>
        </Paper>
      </Fragment>
    )
  );
};

LaunchDetails.propTypes = {
  launch: PropTypes.object.isRequired,
  getLaunch: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    launch: state.launch
  };
};

export default connect(mapStateToProps, { getLaunch })(LaunchDetails);

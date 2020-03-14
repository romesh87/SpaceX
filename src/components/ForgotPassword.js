import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import firebase from '../firebase';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
// import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Alert from './Alert';
import { signIn } from '../actions/auth';
import { setAlert } from '../actions/alert';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const SignIn = props => {
  const classes = useStyles();

  const isAuthenticated = props.auth.isAuthenticated;

  const [formData, setFormData] = useState({
    email: ''
  });

  const { email } = formData;

  const onSubmitHandler = async e => {
    e.preventDefault();

    try {
      await firebase.auth().sendPasswordResetEmail(email);
      props.setAlert('success', `Password reset email sent to ${email}`);
      setTimeout(() => props.history.push('/'), 5000);
    } catch (err) {
      console.log(err);
      props.setAlert('error', err.message);
    }
  };

  if (isAuthenticated) return <Redirect to='/' />;

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Alert />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Enter your Email
        </Typography>
        <form className={classes.form} onSubmit={onSubmitHandler}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            value={formData.email}
            onChange={e =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
};

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(
  connect(mapStateToProps, { signIn, setAlert })(SignIn)
);

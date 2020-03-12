import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import MuiAlert from '@material-ui/lab/Alert';

const Alert = props => {
  return props.alert.alerts.map(alert => (
    <MuiAlert severity={alert.type}>{alert.msg}</MuiAlert>
  ));
};

Alert.propTypes = {
  alert: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  alert: state.alert
});

export default connect(mapStateToProps)(Alert);

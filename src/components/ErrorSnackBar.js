import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { connect } from 'react-redux';
import {hideGlobalError} from "../actions/errorSnackBarActions";

class ErrorSnackBar extends React.Component {
  state = {
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.props.dispatch(hideGlobalError());
  };

  render() {
    const {open, errorMessage} = this.props;
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={this.handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={
          <span id="message-id">{errorMessage}</span>
        }
        action={[
          <Button key="okay" color="secondary" size="small" onClick={this.handleClose}>
            Okay
          </Button>,
        ]}
      />
    )
  }
}

ErrorSnackBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
});

const mapStateToProps = state => {
  return {
    errorMessage: state.errorReducer.errorMessage,
    open: state.errorReducer.open
  }
};

export default withStyles(styles)(
  connect( mapStateToProps )(ErrorSnackBar)
);



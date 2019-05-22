import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import { connect } from 'react-redux';
import {hideGlobalError} from "../actions/errorSnackBarActions";
import LesserSnackbarContent from './LesserSnackbarContent'

class LesserSnackBar extends React.Component {
  state = {
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.props.dispatch(hideGlobalError());
  };

  render() {
    const {open, message, variant, classes} = this.props;
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={1000}
        onClose={this.handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}

      >
        <LesserSnackbarContent
          onClose={this.handleClose}
          variant={variant}
          message={message}
        />
      </Snackbar>
    )
  }
}

LesserSnackBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
});

const mapStateToProps = state => {
  return {
    message: state.lessSnackBarReducer.message,
    variant: state.lessSnackBarReducer.variant,
    open: state.lessSnackBarReducer.open
  }
};

export default withStyles(styles)(
  connect( mapStateToProps )(LesserSnackBar)
);



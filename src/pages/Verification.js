import React from 'react';
import PropTypes from 'prop-types';
import {verifyAccount} from "../api/auth";
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

const queryString = require('query-string');

class Verification extends React.Component {
  state = {
    success: false,
    loading: false,
    open: false,
  };

  componentDidMount() {
    const parsed = queryString.parse(window.location.search);
    const email = parsed.email;
    const verificationToken = parsed.verificationToken;

    console.log(parsed);
    if (email && verificationToken) {
      this.setState({loading: true});

      verifyAccount(email, verificationToken).then(
        response => {
          this.setState({loading: false});
          console.log(response)
          if (response.success) {
            this.setState({success: true});
          } else {
            this.setState({success: false});
          }
        }
      );
    }
  }

  render() {
    const {classes} = this.props;
    const {success, loading} = this.state;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <Paper className={classes.paper}>
        </Paper>
      </form>
    )
  }
}

Verification.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  container: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
  },
  paper: {
    padding: 40,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textField: {
    width: 300,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  }
});


export default withStyles(styles)(Verification);



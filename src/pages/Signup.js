import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import {signup} from "../api/auth";
import { Redirect } from "react-router-dom";
import {connect} from "react-redux";
import {saveUser} from "../actions/authActions";

class Signup extends React.Component {
  state = {
    email: '',
    password: '',
    name: '',
    showPassword: false,
    loading: false,
    open: false,
    errorMessage: '',
    signUpSuccess: false
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  handleChange = prop => event => {
    console.log("handleChange", prop);
    this.setState({[prop]: event.target.value});
  };

  handleClickShowPassword = () => {
    this.setState(state => ({showPassword: !state.showPassword}));
  };

  handleSubmit = event => {
    const {email, password, name} = this.state;
    event.preventDefault();
    this.setState({loading: true});

    // Normal User
    const roles = [{
      role: "USER"
    }];

    signup(email, password, name, roles).then(
      response => {
        this.setState({loading: false});
        if (response.token) {
          console.log('success', response.user);

          const {user, token} = response;
          this.props.dispatch(saveUser(user, token));
          this.setState({ signUpSuccess: true });

        } else {
          console.log('fail', response.error);
          this.setState({
            open: true,
            errorMessage: response.error
          });

        }
      }
    );
  };

  render() {
    const {classes} = this.props;
    const {loading, open, errorMessage, signUpSuccess} = this.state;

    if (signUpSuccess) return <Redirect to={"/"} />;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <Paper className={classes.paper}>
          <TextField
            id="standard-name"
            label="Email"
            className={classes.textField}
            value={this.state.email}
            onChange={this.handleChange('email')}
            margin="normal"
          />
          <FormControl className={classNames(classes.margin, classes.textField)}>
            <InputLabel htmlFor="adornment-password">Password</InputLabel>
            <Input
              id="adornment-password"
              type={this.state.showPassword ? 'text' : 'password'}
              value={this.state.password}
              onChange={this.handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword}
                  >
                    {this.state.showPassword ? <Visibility/> : <VisibilityOff/>}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <TextField
            id="standard-name"
            label="Name"
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleChange('name')}
            margin="normal"
          />

          <div className={classes.wrapper}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
              disabled={loading}
            >
              Sign Up
            </Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>

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
        </Paper>
      </form>
    )
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  container: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  buttonProgress: {
    color: theme.palette.primary,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
    marginTop: 30
  }
});

const mapStateToProps = state => {
  return {

  }
};

export default withStyles(styles)(
  connect( mapStateToProps )(Signup)
);

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import {login} from "../api/auth";
import { Redirect } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';


class AddExam extends React.Component {
  state = {
    email: '',
    password: '',
    name: '',
    showPassword: false,
    loading: false,
    open: false,
    errorMessage: '',
    redirectToReferrer: false
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
    const {email, password} = this.state;
    event.preventDefault();
    this.setState({loading: true});

    login(email, password).then(
      response => {
        this.setState({loading: false});
        if (response.token) {
          const {user, token} = response;
          // localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', JSON.stringify(token));
          this.props.login(user);
          this.setState({ redirectToReferrer: true });
        } else {
          console.log('fail', response);
          this.setState({
            open: true,
            errorMessage: 'Login Failed'
          });
        }
      }
    );
  };

  render() {
    const {classes} = this.props;
    const {loading, open, errorMessage, redirectToReferrer} = this.state;
    let { from } = this.props.location.state || { from: { pathname: "/" } };

    if (redirectToReferrer) return <Redirect to={from} />;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <Paper className={classes.paper} elevation={10}>
          <IconButton
            // aria-owns={isLoggedIn ? 'material-appbar' : undefined}
            aria-haspopup="true"
            onClick={this.onClickAdd}
            color="inherit"
            className={classes.add}
          >
              <AddIcon/>
          </IconButton>
        </Paper>
      </form>
    )
  }
}

AddExam.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  container: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 800,
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
  },
  link: {
    color: 'white',
    textDecoration: 'none'
  },
  button: {
    width: 100
  },
  add: {
    backgroundColor: theme.palette.secondary
  }
});


export default withStyles(styles)(AddExam);
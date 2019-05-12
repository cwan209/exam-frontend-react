import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Question from '../components/Question';

class AddExam extends React.Component {
  state ={
    loading: false,
    open: false,
    questions: []
  };

  onClickAdd = () => {
    this.setState({
      questions: [...this.state.questions, {}]
    });
  };

  render() {
    const {classes} = this.props;
    const {questions} = this.state;

    console.log('questions', questions);

    return (
      <form className={classes.container} noValidate autoComplete="off">

        <IconButton
          aria-haspopup="true"
          onClick={this.onClickAdd}
          color="inherit"
          className={classes.add}
        >
          <AddIcon/>
        </IconButton>

        {
          questions.map(
            question =>
              <Question/>
          )
        }
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
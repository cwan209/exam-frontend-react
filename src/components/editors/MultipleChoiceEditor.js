import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class MultipleChoiceEditor extends React.Component {
  state = {
    type: '',
    loading: false
  };

  handleChange = prop => event => {
    console.log("handleChange", prop);
    this.setState({[prop]: event.target.value});
  };

  render() {
    const {classes, question} = this.props;

    return (
        <div className={classes.questionType}>
          <p>{question.content}</p>
        </div>
    )
  }
}

MultipleChoiceEditor.propTypes = {
  classes: PropTypes.object.isRequired,
  question: PropTypes.object.isRequired,
};

const styles = theme => ({
  paper: {
    marginTop: 20,
    marginBottom: 20

  },
  button: {
    display: 'block',
    marginTop: theme.spacing.unit * 2,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  questionType: {
    textAlign: 'left'
  }
});


export default withStyles(styles)(MultipleChoiceEditor);
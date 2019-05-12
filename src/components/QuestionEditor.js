import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class QuestionEditor extends React.Component {
  state = {
    type: '',
    loading: false
  };

  handleChange = prop => event => {
    console.log("handleChange", prop);
    this.setState({[prop]: event.target.value});
  };

  render() {
    const {classes} = this.props;
    const types = [
      {name: 'Multiple Choice', value: 'mc'},
      {name: 'Multiple Answers', value: 'ma'},
      {name: 'True/False', value: 'tf'},
      {name: 'Matching', value: 'm'},
      {name: 'Short Answer', value: 'sa'},
      {name: 'Essay', value: 'e'}
    ];

    return (
      <Paper className={classes.paper} elevation={10}>
        {/*<p>Question</p>*/}
        <form autoComplete="off" >
          <div className={classes.questionType}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="demo-controlled-open-select">Question Type</InputLabel>
              <Select
                open={this.state.open}
                onClose={this.handleClose}
                onOpen={this.handleOpen}
                value={this.state.type}
                onChange={this.handleChange('type')}
                inputProps={{
                  name: 'age',
                  id: 'demo-controlled-open-select',
                }}
              >
                {
                  types.map(
                    type =>
                      <MenuItem value={type.value}>
                        <em>{type.name}</em>
                      </MenuItem>
                  )
                }
              </Select>
            </FormControl>
          </div>


        </form>

      </Paper>
    )
  }
}

QuestionEditor.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
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


export default withStyles(styles)(QuestionEditor);
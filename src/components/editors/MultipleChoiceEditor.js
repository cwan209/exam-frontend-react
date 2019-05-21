import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import {updateMultipleChoice} from "../../api/exam";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
const _ = require('lodash');


class MultipleChoiceEditor extends React.Component {
  state = {
    loading: false,
    question: {
      content: '',
      id: null,
      answer: 0,
      options: []
    },
  };

  componentDidMount() {
    const {question} = this.props;
    if (question) {
      this.setState({
        question: question,
      });
    }
  }

  handleChange = prop => event => {
    this.setState({
      question: {
        ...this.state.question,
        [prop]: event.target.value
      }
    })
  };

  handleChangeOption = index => event => {
    console.log('handleChangeOption', index,event.target.value)

    const newOptions = _.cloneDeep(this.state.question.options);
    newOptions[index].content = event.target.value;

    this.setState({
      question: {
        ...this.state.question,
        options: newOptions
      }
    })

  };


  onAnswerChange = prop => event => {

    const answer = parseInt(event.target.value);
    console.log('answer', answer)

    this.setState({
      question: {
        ...this.state.question,
        answer: answer
      }
    }, this.onContentChange);

  };

  onClickAddOption = () => {
    this.setState({
      question: {
        ...this.state.question,
        options: [...this.state.question.options, {content: ''}]
      }
    }, this.onContentChange);
  };


  onClickRemoveOption = index => {
    console.log('onClickRemoveOption', index)

    const newOptions = _.cloneDeep(this.state.question.options);
    newOptions.splice(index, 1);

    console.log(newOptions)

    this.setState({
      question: {
        ...this.state.question,
        options: newOptions
      }
    }, this.onContentChange);
  };

  onContentChange = () => {
    console.log(this.state.question);

    updateMultipleChoice(this.props.examId, this.state.question).then(
      response => {
        const {question} = response;
        if (question) {
          this.setState({
            question: question
          })
        }
      }
    ).catch(
      error => {
        console.log(error);
      }
    )
  };


  render() {
    const {classes} = this.props;
    const {content, answer, options} = this.state.question;

    return (
      <Paper className={classes.root} elevation={1}>
        <Typography variant="subtitle1" gutterBottom className={classes.questionType}>
          Multiple Choice
        </Typography>
        <TextField
          id="outlined-name"
          label="Question"
          className={classes.textField}
          value={content}
          onChange={this.handleChange('content')}
          margin="normal"
          variant="outlined"
          onBlur={this.onContentChange}
          fullWidth
          multiline
          rows={4}
        />
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Please provide your options</FormLabel>
          {
            options.map(
              (option, index) =>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                  className={classes.optionWrapper}
                >
                  <TextField
                    id="outlined-name"
                    label="option"
                    className={classes.option}
                    value={option.content}
                    onChange={this.handleChangeOption(index)}
                    margin="normal"
                    variant="outlined"
                    onBlur={this.onContentChange}
                    multiline
                    rows={2}
                  />

                  <IconButton
                    aria-haspopup="true"
                    onClick={() => this.onClickRemoveOption(index)}
                    color="secondary"
                    className={classes.remove}
                  >
                    <RemoveCircleIcon/>
                  </IconButton>

                </Grid>
            )
          }

          <IconButton
            aria-haspopup="true"
            onClick={this.onClickAddOption}
            color="inherit"
            className={classes.add}
          >
            <AddIcon/>
          </IconButton>

          {
            options.length > 1 &&
            <div>
              <FormLabel component="legend">Please provide the correct answer</FormLabel>
              <RadioGroup
              aria-label="Answer"
              name="Answer"
              className={classes.group}
              value={answer}
              onChange={this.onAnswerChange("answer")}
              >
                {
                  options.map(
                  (option, index) =>
                    <FormControlLabel value={index} control={<Radio />} label={option.content} key={index} />
                  )
                }
              </RadioGroup>
            </div>
          }
        </FormControl>
      </Paper>
    )
  }
}


MultipleChoiceEditor.propTypes = {
  classes: PropTypes.object.isRequired,
  question: PropTypes.object.isRequired,
};

const styles = theme => ({
  root: {
    marginTop: 20,
    marginBottom: 20,
    padding: 20,
    textAlign: 'left'
  },
  textField: {
  },
  questionType: {
  },
  formControl: {
    display: "block",
    marginTop: 20
  },
  option: {
    width: "90%"
  },
  optionWrapper: {
  }
});


export default withStyles(styles)(MultipleChoiceEditor);
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import {updateMultipleChoice, deleteMultipleChoice} from "../../api/exam";
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
import ClearIcon from '@material-ui/icons/Clear';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import {showLesserSnackBarError, showLesserSnackBarSuccess} from "../../actions/lesserSnackBarActions";
import {connect} from "react-redux";
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
    const newOptions = _.cloneDeep(this.state.question.options);
    newOptions.splice(index, 1);

    this.setState({
      question: {
        ...this.state.question,
        options: newOptions
      }
    }, this.onContentChange);
  };

  onContentChange = () => {
    updateMultipleChoice(this.props.examId, this.state.question).then(
      response => {
        const {question} = response;
        if (question) {
          this.setState({
            question: question
          })
        }
        this.props.dispatch(showLesserSnackBarSuccess('Success'));

      }
    ).catch(
      error => {
        this.props.dispatch(showLesserSnackBarError('Failed'));
        console.log(error);
      }
    )
  };

  deleteQuestion = () => {
    deleteMultipleChoice(this.props.examId, this.state.question).then(
      response => {
        this.props.deleteQuestion(this.props.index);
        this.props.dispatch(showLesserSnackBarSuccess('Success'));

      }
    ).catch(
      error => {
        this.props.dispatch(showLesserSnackBarError('Failed'));
        console.log(error);
      }
    )
  };

  render() {
    const {classes} = this.props;
    const {content, answer, options} = this.state.question;

    return (
      <Paper className={classes.root} elevation={1}>

        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          className={classes.titleWrapper}
        >
          <Typography variant="subtitle1" gutterBottom className={classes.questionType}>
            Multiple Choice
          </Typography>

          <IconButton
            aria-haspopup="true"
            onClick={this.deleteQuestion}
            color="secondary"
            className={classes.clear}
          >
            <ClearIcon/>
          </IconButton>

        </Grid>
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
            options && options.map(
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
            color="primary"
            className={classes.add}
          >
            <AddIcon/>
          </IconButton>

          {
           options && options.length > 1 &&
            <div>
              <FormLabel component="legend" className={classes.answerLabel}>Please provide the correct answer</FormLabel>
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
  },
  answerLabel: {
    marginTop: 20,
    marginBottom: 10
  },
  titleWrapper: {

  }
});

const mapStateToProps = state => {
  return {

  }
};

export default withStyles(styles)(
  connect( mapStateToProps )(MultipleChoiceEditor)
);
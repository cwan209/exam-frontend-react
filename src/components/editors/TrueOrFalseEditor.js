import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {updateTrueOrFalse} from "../../api/exam";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

class TrueOrFalseEditor extends React.Component {
  state = {
    loading: false,
    question: {
      content: '',
      id: null,
      answer: true
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
    console.log("handleChange", prop);
    this.setState({[prop]: event.target.value});

    this.setState({
      question: {
        ...this.state.question,
        [prop]: event.target.value
      }
    })
  };

  onContentChange = () => {
    const {question} = this.state;
    const {examId} = this.props;


    updateTrueOrFalse(examId, question).then(
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

  onAnswerChange = prop => event => {
    const {question} = this.state;
    const {examId} = this.props;

    const answer = event.target.value;
    console.log('answer', answer)

    this.setState({
      question: {
        ...this.state.question,
        answer: answer === "true"
      }
    }, () => {

      updateTrueOrFalse(examId, this.state.question).then(
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

    });


  };


  render() {
    const {classes} = this.props;
    const {content, answer} = this.state.question;

    console.log(this.state.question)

    return (
      <Paper className={classes.root} elevation={1}>
        <Typography variant="subtitle1" gutterBottom className={classes.questionType}>
          True Or False
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
          <FormLabel component="legend">Please provide the correct answer</FormLabel>
          <RadioGroup
            aria-label="Answer"
            name="Answer"
            className={classes.group}
            value={answer ? "true" : "false"}
            onChange={this.onAnswerChange('answer')}
          >
            <FormControlLabel value={"true"} control={<Radio />} label="True" />
            <FormControlLabel value={"false"} control={<Radio />} label="False" />
          </RadioGroup>
        </FormControl>
      </Paper>
    )
  }
}

TrueOrFalseEditor.propTypes = {
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
  }
});


export default withStyles(styles)(TrueOrFalseEditor);
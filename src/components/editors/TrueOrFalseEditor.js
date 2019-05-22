import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {deleteTrueOrFalse, updateTrueOrFalse} from "../../api/exam";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import {connect} from "react-redux";
import { showLesserSnackBarError, showLesserSnackBarSuccess } from "../../actions/lesserSnackBarActions";

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
    this.setState({
      question: {
        ...this.state.question,
        [prop]: event.target.value
      }
    })
  };

  onContentChange = () => {
    updateTrueOrFalse(this.props.examId, this.state.question).then(
      response => {
        const {question} = response;
        if (question) {
          this.setState({
            question: question
          })
        }
        this.props.dispatch(showLesserSnackBarSuccess('Success!'))
      }
    ).catch(
      error => {
        this.props.dispatch(showLesserSnackBarError('Failed!'));
        console.log(error);
      }
    )
  };

  onAnswerChange = prop => event => {

    const answer = event.target.value;

    this.setState({
      question: {
        ...this.state.question,
        answer: answer === "true"
      }
    }, this.onContentChange);
  };

  deleteQuestion = () => {
    deleteTrueOrFalse(this.props.examId, this.state.question).then(
      response => {
        this.props.deleteQuestion(this.props.index);
        this.props.dispatch(showLesserSnackBarSuccess('Success!'));
      }
  ).catch(
      error => {
        this.props.dispatch(showLesserSnackBarError('Failed!'));

        console.log(error);
      }
    )
  };

  render() {
    const {classes} = this.props;
    const {content, answer} = this.state.question;

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
            True Or False
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

const mapStateToProps = state => {
  return {

  }
};

export default withStyles(styles)(
  connect( mapStateToProps )(TrueOrFalseEditor)
);
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import {getExamById, addTrueOrFalse, addMultipleChoice} from "../api/exam";
import TrueOrFalseEditor from '../components/editors/TrueOrFalseEditor';
import MultipleChoiceEditor from '../components/editors/MultipleChoiceEditor';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
const _ = require('lodash');

class AddExam extends React.Component {
  state ={
    loading: false,
    type: '',
    title: '',
    questions: [],
  };

  componentDidMount() {
    const {examId} = this.props.location.state;

    this.setState({loading: true});

    getExamById(examId).then(
      response => {
        this.setState({loading: false});

        const {exam} = response;
        if (exam) {
          this.setState({
            title: exam.title,
            questions: exam.questions
          })
        }
      }
    ).catch(error => {
      this.setState({loading: false});

      console.error(error);
    });
  }

  onClickAddQuestion = () => {
    const {type} = this.state;
    const {examId} = this.props.location.state;

    if(!type) {
      alert('Please choose type');
      return;
    }

    switch (type) {

      case 'mc':
        addMultipleChoice(examId).then(
          response => {
            if (response.question) {
              this.setState({
                questions: [...this.state.questions, response.question]
              });
            }
          }
        ).catch(
          error => {
            console.log(error);
          }
        );
        break;

      case 'tf':
        addTrueOrFalse(examId).then(
          response => {
            if (response.question) {
              this.setState({
                questions: [...this.state.questions, response.question]
              });
            }
          }
        ).catch(
          error => {
            console.log(error);
          }
        );
        break;

      default:

    }
  };

  handleChange = prop => event => {
    this.setState({[prop]: event.target.value});
  };

  renderQuestion = (question, index) => {
    const {examId} = this.props.location.state;

    switch (question.type) {
      case 'mc':
        return <MultipleChoiceEditor
                  question={question}
                  key={question.id}
                  examId={examId}
                  deleteQuestion={this.deleteQuestion}
                  index={index}
                />;
      case 'tf':
        return <TrueOrFalseEditor
                  question={question}
                  key={question.id}
                  examId={examId}
                  deleteQuestion={this.deleteQuestion}
                  index={index}
                />;
      default:
    }
  };

  deleteQuestion = index => {
    const newQuestions = _.cloneDeep(this.state.questions);
    newQuestions.splice(index, 1);

    console.log('deleteQuestion', index, newQuestions);

    this.setState({
      questions: newQuestions
    }, () => {
      console.log('questions', this.state.questions)
    })

  };

  render() {
    const {classes} = this.props;
    const {questions, loading, title} = this.state;

    const types = [
      {name: 'Multiple Choice', value: 'mc'},
      {name: 'Multiple Answers', value: 'ma'},
      {name: 'True/False', value: 'tf'},
      {name: 'Matching', value: 'm'},
      {name: 'Short Answer', value: 'sa'},
      {name: 'Essay', value: 'e'}
    ];
    // console.log('questions', questions);

    return (
      loading
        ?
      <LinearProgress color={"secondary"} />
        :
      <form className={classes.container} noValidate autoComplete="off">
        <Typography component="h2" variant="display2" gutterBottom>
          {title}
        </Typography>
        {
          questions.map(
            (question, index) => {
              return this.renderQuestion(question, index)
            }
          )
        }

        <Grid
          container
          spacing={16}
          className={classes.questionType}
          alignItems={'center'}
          direction={'row'}
          justify={'flex-start'}
        >
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="demo-controlled-open-select">Question Type</InputLabel>
              <Select
                open={this.state.open}
                onClose={this.handleClose}
                onOpen={this.handleOpen}
                value={this.state.type}
                onChange={this.handleChange('type')}
                inputProps={{
                  name: 'type',
                  id: 'demo-controlled-open-select',
                }}
              >
                {
                  types.map(
                    (type, index) =>
                      <MenuItem key={index} value={type.value}>
                        <em>{type.name}</em>
                      </MenuItem>
                  )
                }
              </Select>
            </FormControl>
          </div>

          {/*Add button*/}
          <IconButton
            aria-haspopup="true"
            onClick={this.onClickAddQuestion}
            color="inherit"
            className={classes.add}
          >
            <AddIcon/>
          </IconButton>
        </Grid>

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
    paddingTop: 50
  },
  add: {
    backgroundColor: theme.palette.secondary,
    marginTop: 15
  },
  button: {
    display: 'block',
    marginTop: theme.spacing.unit * 2,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  questionType: {
    flexGrow: 1
  }
});


export default withStyles(styles)(AddExam);
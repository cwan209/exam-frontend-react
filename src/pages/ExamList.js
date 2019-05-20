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

class ExamList extends React.Component {
  state ={
    loading: false,
    type: '',
    title: '',
    questions: [],
  };

  componentDidMount() {

  }

  handleChange = prop => event => {
    this.setState({[prop]: event.target.value});
  };

  render() {
    const {classes} = this.props;
    const {exmas, loading} = this.state;

    return (
      loading
        ?
      <LinearProgress color={"secondary"} />
        :
      <div className={classes.container}>
        Haha

      </div>
    )
  }
}

ExamList.propTypes = {
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
  }
});


export default withStyles(styles)(ExamList);
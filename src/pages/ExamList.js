import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import {getExams} from "../api/exam";

class ExamList extends React.Component {
  state ={
    loading: false,
    exams: []
  };

  componentDidMount() {
    this.setState({loading: true});
    getExams().then(
      exams => {
        this.setState({
          loading: false,
          exams: exams
        });

      }
    ).catch(
      error => {
        this.setState({loading: false});

        console.log(error);
      }
    )
  }

  handleChange = prop => event => {
    this.setState({[prop]: event.target.value});
  };

  render() {
    const {classes} = this.props;
    const {exams, loading} = this.state;

    return (
      loading
        ?
      <LinearProgress color={"secondary"} />
        :
      <div className={classes.container}>
        {
          exams.map(
            exam =>
              <p>{exam.title}</p>
          )
        }

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
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withRouter } from "react-router";

class ExamCard extends React.Component {
  state = {
  };

  onClickEdit = () => {
    const {history, exam: {id}} = this.props;
    history.push({
      pathname: '/addExam',
      state: { examId: id }
    })
  };

  render() {
    const {classes, exam} = this.props;
    return (
      exam &&
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} variant={"h6"} color="textSecondary" gutterBottom>
            {exam.title}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={this.onClickEdit}>Edit</Button>
        </CardActions>
        <CardActions>
          <Button size="small">Publish</Button>
        </CardActions>
      </Card>
    )
  }
}

ExamCard.propTypes = {
  classes: PropTypes.object.isRequired,
  exam: PropTypes.object.isRequired,
};

const styles = theme => ({
  card: {
    minWidth: 275,
    marginTop: 20
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    // fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const mapStateToProps = state => {
  return {
    errorMessage: state.errorReducer.errorMessage,
    open: state.errorReducer.open
  }
};

export default withStyles(styles)(
  connect( mapStateToProps )(withRouter(ExamCard))
);



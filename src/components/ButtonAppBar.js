import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom";
import { fade } from '@material-ui/core/styles/colorManipulator';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import CallMissedOutgoing from '@material-ui/icons/CallMissedOutgoing';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import {connect} from "react-redux";
import {logout} from "../actions/authActions";
import {createNewExam} from "../api/exam";
import { withRouter } from "react-router";
import {showGlobalError} from "../actions/errorSnackBarActions";


class ButtonAppBar extends React.Component {
  state = {
    drawerOpen: false,
    dialogOpen: false,
    showDialogError: false,
    dialogError: '',
    examTitle: ''
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  onClickAddExam = () => {
    const {examTitle} = this.state;
    const {history} = this.props;

    if(examTitle.trim().length <= 0) {
      this.showDialogError('Please Provide a title');
    } else if(examTitle.length > 200) {
      this.showDialogError('Title should be less than 200');
    } else {
      this.hideDialogError();

      createNewExam(examTitle).then(
        response => {
          if (response.id) {
            this.handleDialogClose();

            history.push({
              pathname: '/addExam',
              state: { examId: response.id }
            })
          }
        }
      ).catch(error => {
        console.log(error);
        this.props.dispatch(showGlobalError('Create Exam failed'));
      });

    }
  };

  showDialogError = error => {
    this.setState({
      showDialogError: true,
      dialogError: error
    });
  };

  hideDialogError = () => {
    this.setState({
      showDialogError: false,
      dialogError: ''
    });
  };

  onClickLogout = () => {
    this.props.dispatch(logout());
  };

  handleDialogClose = () => {
    this.setState({ dialogOpen: false });
  };

  handleDialogOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleChange = prop => event => {
    this.setState({[prop]: event.target.value});
  };

  render() {
    const { classes, loggedIn } = this.props;
    const { showDialogError, dialogError } = this.state;

    const sideList = (
      <div className={classes.list}>
        {/*<List>*/}
          {/*{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (*/}
            {/*<ListItem button key={text}>*/}
              {/*<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>*/}
              {/*<ListItemText primary={text} />*/}
            {/*</ListItem>*/}
          {/*))}*/}
        {/*</List>*/}
        <Divider />
        <List>
            <ListItem button key={"logout"} onClick={this.onClickLogout}>
              <ListItemIcon><CallMissedOutgoing/></ListItemIcon>
              <ListItemText primary={"logout"} />
            </ListItem>
        </List>
      </div>
    );

    return (
      <div className={classes.root}>

        {/*bar*/}
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon/>
            </IconButton>
            <Typography variant="h6" color="inherit">
              <Link to={'/'} className={classes.link}>Examify</Link>
            </Typography>
            <div className={classes.grow}/>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon/>
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
            <IconButton
              aria-owns={loggedIn ? 'material-appbar' : undefined}
              aria-haspopup="true"
              onClick={this.handleDialogOpen}
              color="inherit"
            >
              {/*<Link className={classes.link} to={'/addExam'}>*/}
                <AddIcon/>
              {/*</Link>*/}
            </IconButton>
            {
              loggedIn ?
                <IconButton
                  aria-owns={loggedIn ? 'material-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.toggleDrawer('drawerOpen', true)}
                  color="inherit"
                >
                  <AccountCircle/>
                </IconButton>
                :
                <div>
                  <Button color="inherit">
                    <Link className={classes.link} to={'/login'}>
                      <AccountCircle/>
                    </Link>
                  </Button>
                </div>
            }
          </Toolbar>
        </AppBar>

        {/*modal*/}
        <Dialog
          open={this.state.dialogOpen}
          onClose={this.handleDialogClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            <DialogContentText>
              Please provide a title for your exam.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Exam Title"
              type="text"
              error={showDialogError}
              value={this.state.examTitle}
              onChange={this.handleChange('examTitle')}
              fullWidth
            />
            {
              showDialogError &&
              <DialogContentText className={classes.dialogError}>{dialogError}</DialogContentText>
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.onClickAddExam} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>

        {/*drawer*/}
        <Drawer anchor="right" open={this.state.drawerOpen} onClose={this.toggleDrawer('drawerOpen', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('drawerOpen', false)}
            onKeyDown={this.toggleDrawer('drawerOpen', false)}
          >
            {sideList}
          </div>
        </Drawer>
    </div>
    )
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  link: {
    color: 'white',
    textDecoration: 'none'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  list: {
    width: 250,
  },
  dialogError: {
    color: 'red'
  }
});

const mapStateToProps = state => {
  return {
    user: state.authReducer.user,
    loggedIn: state.authReducer.loggedIn
  };
};

export default withStyles(styles)(
  connect( mapStateToProps )(withRouter(ButtonAppBar))
);

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

class ButtonAppBar extends React.Component {
  state = {
    right: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  onClickAdd = () => {
  };

  render() {
    const { classes, isLoggedIn, logOut } = this.props;

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
            <ListItem button key={"logout"} onClick={logOut}>
              <ListItemIcon><CallMissedOutgoing/></ListItemIcon>
              <ListItemText primary={"logout"} />
            </ListItem>
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
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
              aria-owns={isLoggedIn ? 'material-appbar' : undefined}
              aria-haspopup="true"
              onClick={this.onClickAdd}
              color="inherit"
            >
              <Link className={classes.link} to={'/addExam'}>
                <AddIcon/>
              </Link>
            </IconButton>
            {
              isLoggedIn ?
                <IconButton
                  aria-owns={isLoggedIn ? 'material-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.toggleDrawer('right', true)}
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
                  {/*<Button color="inherit">*/}
                    {/*<Link className={classes.link} to={'/signup'}>Sign Up</Link>*/}
                  {/*</Button>*/}
                </div>
            }
          </Toolbar>
        </AppBar>
        <Drawer anchor="right" open={this.state.right} onClose={this.toggleDrawer('right', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('right', false)}
            onKeyDown={this.toggleDrawer('right', false)}
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
});

export default withStyles(styles)(ButtonAppBar);
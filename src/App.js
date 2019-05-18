import React, {Component} from 'react';
import './App.css';
import Header from './components/ButtonAppBar';
import {BrowserRouter as Router, Route, withRouter} from "react-router-dom";
import Signup from './pages/Signup';
import Login from './pages/Login';
import {MuiThemeProvider} from '@material-ui/core/styles';
import {theme} from './settings/theme';
import Verification from "./pages/Verification";
import AddExam from "./pages/AddExam";
import {getCurrentUser} from "./api/auth";
import {connect} from "react-redux";
import {saveUser} from "./actions/authActions";
import {PrivateRoute} from "./components/PrivateRouter";

class App extends React.Component {

  state = {
    loading: false
  };

  componentDidMount() {

    this.setState({loading: true});

    getCurrentUser().then(
      response => {
        this.setState({loading: false});

        const {user} = response;
        if (user) {
          this.props.dispatch(saveUser(user));
        } else {

        }
      }
    )
  }

  render() {

    return (
      <div className="App">
        <MuiThemeProvider theme={theme} >
          <Header/>
          {/*Router*/}
              <Route path={"/login"} render={(props) => (
                  <Login {...props} />
              )}/>
              <Route path={"/signup"} component={Signup}/>
              <Route path={"/verify"} component={Verification}/>
              <PrivateRoute path={"/addExam"} component={AddExam}/>
              {/*<Route exact path={"/"} component={Home}/>*/}
          {/*Router*/}

          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"/>
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
        </MuiThemeProvider>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {

  }
};

export default  withRouter(connect( mapStateToProps )(App));

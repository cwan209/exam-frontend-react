import React, {Component} from 'react';
import './App.css';
import Header from './components/ButtonAppBar';
import {Route} from "react-router-dom";
import Signup from './pages/Signup';
import Login from './pages/Login';
import {MuiThemeProvider} from '@material-ui/core/styles';
import {theme} from './settings/theme';
import Verification from "./pages/Verification";

class App extends React.Component {

  state = {
    user: null,
    isLoggedIn: false
  };

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('localStorage', user)
    if (user) {
      this.setState({
        user: user,
        isLoggedIn: true
      })
    }
  }

  login = user => {
    this.setState({
      isLoggedIn: true,
      user: user
    });
  };

  logOut = () => {
    localStorage.removeItem('token');
    this.setState({
      isLoggedIn: false,
      user: null
    });
  };

  render() {
    const {isLoggedIn, user} = this.state;
    console.log(isLoggedIn, user);
    return (
      <div className="App">
        <MuiThemeProvider theme={theme} >
          <Header isLoggedIn={isLoggedIn} logOut={this.logOut}/>

          <Route path={"/login"} render={(props) => (
              <Login {...props}
                 login={this.login}
              />
          )}/>

          <Route path={"/signup"} render={(props) => (
              <Signup {...props}
                     login={this.login}
              />
          )}/>

          <Route path={"/verify"} component={Verification}/>

          {/*<Route exact path={"/"} component={Home}/>*/}

          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"/>
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;

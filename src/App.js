import React, {Component} from 'react';
import './App.css';
import Header from './components/ButtonAppBar';
import {Route} from "react-router-dom";
import Signup from './pages/Signup';
import Login from './pages/Login';
import {MuiThemeProvider} from '@material-ui/core/styles';
import {theme} from './settings/theme';
import Verification from "./pages/Verification";

class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <Header/>
          <Route path={"/login"} component={Login}/>
          <Route path={"/signup"} component={Signup}/>
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

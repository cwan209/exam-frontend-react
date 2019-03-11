import React, {Component} from 'react';
import './App.css';
import ButtonAppBar from './components/ButtonAppBar';
import {Route} from "react-router-dom";
import Signup from './pages/Signup';
import {MuiThemeProvider} from '@material-ui/core/styles';
import {theme} from './settings/theme';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <ButtonAppBar/>
          {/*<Route path={"/login"} component={LoginPage}/>*/}
          <Route path={"/signup"} component={Signup}/>
          {/*<Route exact path={"/"} component={Home}/>*/}

          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"/>
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;

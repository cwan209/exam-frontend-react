import React, { Component } from 'react';
import './App.css';
import ButtonAppBar from './components/ButtonAppBar';
import { Route, Link } from "react-router-dom";
import LoginPage from './components/LoginPage';

class App extends Component {
  render() {
    return (
      <div className="App">

        <ButtonAppBar/>
        <Route path={"/login"} component={LoginPage}/>
        {/*<Route exact path={"/"} component={Home}/>*/}

        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>

      </div>
    );
  }
}

export default App;

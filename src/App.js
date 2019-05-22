import React from 'react';
import './App.css';
import Header from './components/ButtonAppBar';
import { Route, withRouter} from "react-router-dom";
import Signup from './pages/Signup';
import Login from './pages/Login';
import {MuiThemeProvider} from '@material-ui/core/styles';
import {theme} from './settings/theme';
import Verification from "./pages/Verification";
import AddExam from "./pages/ExamEditor";
import {getCurrentUser} from "./api/auth";
import {connect} from "react-redux";
import {saveUser} from "./actions/authActions";
import {PrivateRoute} from "./components/PrivateRouter";
import ErrorSnackBar from './components/ErrorSnackBar';
import LesserSnackBar from './components/LesserSnackBar';
import {showGlobalError} from "./actions/errorSnackBarActions";
import ExamList from "./pages/ExamList";


class App extends React.Component {

  state = {
    loading: false
  };

  componentDidMount() {

    this.setState({loading: true});

    if (localStorage.getItem("token")) {

      getCurrentUser().then(
        response => {
          this.setState({loading: false});

          const {user} = response;
          if (user) {
            this.props.dispatch(saveUser(user));
          }
        }
      ).catch(error => {
        console.log(error);
        this.props.dispatch(showGlobalError("Invalid token, please login again"));
        this.props.history.push('/login');
      })

    }

  }

  render() {

    return (
      <div className="App">
        <MuiThemeProvider theme={theme} >
          <Header/>

          <Route path={"/login"} render={(props) => (
              <Login {...props} />
          )}/>
          <Route path={"/signup"} component={Signup}/>
          <Route path={"/verify"} component={Verification}/>
          <PrivateRoute path={"/addExam"} component={AddExam}/>
          <PrivateRoute path={"/exams"} component={ExamList}/>
          {/*<Route exact path={"/"} component={Home}/>*/}
          <ErrorSnackBar/>
          <LesserSnackBar/>

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

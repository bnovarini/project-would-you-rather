import React, { Component, Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import LoadingBar from "react-redux-loading";
import Nav from "./Nav";
import LoginPage from "./LoginPage";
import Routing from "./Routing";
import { CssBaseline } from "@material-ui/core";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Router>
        <Fragment>
          <CssBaseline />
          <LoadingBar />
          <div className="App">
            {this.props.loading === true ? null : this.props.authedUser ===
              "" ? (
              <LoginPage />
            ) : (
              <div>
                <Nav
                  userName={this.props.userName}
                  dispatch={this.props.dispatch}
                />
                <Routing />
              </div>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  const user = users ? users[authedUser] : {};

  return {
    loading: authedUser === null,
    authedUser,
    userName: user ? users[authedUser].name : "",
  };
}

export default connect(mapStateToProps)(App);

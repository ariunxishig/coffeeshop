import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import css from "./style.module.css";

import Toolbar from "../../components/Toolbar";
import BurgerPage from "../BurgerPage";
import SideBar from "../../components/SideBar";
import { Route, Switch } from "react-router-dom";
import LoginPage from "../LoginPage";
import SignupPage from "../SignupPage";
import Logout from "../../components/Logout";
import * as actions from "../../redux/actions/loginActions";
import * as signupActions from "../../redux/actions/signupActions";

class App extends Component {
  state = {
    showSidebar: false
  };

  toggleSideBar = () => {
    this.setState(prevState => {
      return { showSidebar: !prevState.showSidebar };
    });
  };

  componentDidMount = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const expireDate = new Date(localStorage.getItem("expireDate"));
    // const refreshToken = localStorage.getItem("refreshToken");

    if (token) {
      if (expireDate > new Date()) {
        // Hugatsaa n duusaaagui token baina, avtomat login hiine
        this.props.autoLogin(token, userId);

        // Token huchingui bolohod uldej baigaa hugatsaag tootsoolj
        // Ter hugatsaanii daraa avtomataar logout hiine
        this.props.autoLogoutAfterMillisec(
          expireDate.getTime() - new Date().getTime()
        );
      } else {
        // Token hugatsaa n duussan bainaa, logout hiine
        this.props.logout();
      }
    }
  };

  render() {
    return (
      <div>
        <Toolbar toggleSideBar={this.toggleSideBar} />

        <SideBar
          showSidebar={this.state.showSidebar}
          toggleSideBar={this.toggleSideBar}
        />

        <main className={css.Content}>
        <Route path="/" component={BurgerPage} /> 
        {/* deedh muriig ustgeed doothig uncomment hiih */}
          {/* {this.props.userId ? (
            <Switch>
              <Route path="/logout" component={Logout} />
              <Route path="/" component={BurgerPage} />
            </Switch>
          ) : (
            <Switch>
              <Route path="/signup" component={SignupPage} />
              <Route path="/login" component={LoginPage} />
              <Redirect to="/login" />
            </Switch>
          )} */}
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.signupReducer.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    autoLogin: (token, userId) =>
      dispatch(actions.loginUserSuccess(token, userId)),
    logout: () => dispatch(signupActions.logout()),
    autoLogoutAfterMillisec: () =>
      dispatch(signupActions.autoLogoutAfterMillisec())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

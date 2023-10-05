import React, { Component, createRef } from "react";
import { getUser, fetchUsers } from "../services/action/action";
import { connect } from "react-redux";
import { USER_DATA } from "../services/api";
import axios from "axios";

class Form extends Component {
  formRef = createRef();
  usernameRef = createRef();

  componentDidMount = () => {
    this.focusUsername();
  };

  getInput = (id, value) => {
    this.props.handleUserInfo(id, value);
  };

  createUser = (user) => {
    axios({
      url: USER_DATA,
      method: "POST",
      data: user,
    })
      .then(() => {
        this.formReset();
        this.focusUsername();
        this.props.handleFetchUser();
      })
      .catch((err) => {});
  };

  formReset = () => {
    this.formRef.current.reset();
  };

  focusUsername = () => {
    this.usernameRef.current.focus();
  };

  render() {
    let { username, email, password } = this.props.user;

    return (
      <div>
        <form ref={this.formRef}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              ref={this.usernameRef}
              id="username"
              name="username"
              value={username}
              aria-describedby="alert"
              onChange={(e) => {
                this.getInput(e.target.id, e.target.value);
              }}
            />
            <div id="alert" className="form-text"></div>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={(e) => {
                this.getInput(e.target.id, e.target.value);
              }}
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text"></div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              autoComplete="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={(e) => {
                this.getInput(e.target.id, e.target.value);
              }}
            />
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              this.createUser(this.props.user);
            }}>
            Create
          </button>
        </form>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    handleUserInfo: (key, value) => {
      dispatch(getUser(key, value));
    },
    handleFetchUser: () => {
      dispatch(fetchUsers());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);

import React, { Component, createRef } from "react";
import { resetUser, getUser, fetchUsers } from "../services/action/action";
import { connect } from "react-redux";
import { USER_DATA } from "../services/api";
import { message } from "antd";
import axios from "axios";

class Form extends Component {
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
        this.focusUsername();
        this.props.handleResetForm();
        this.props.handleGetDataFromServer();
      })
      .catch((err) => {});
  };

  updateUser = (id, user) => {
    const api = USER_DATA + `/${id}`;
    axios({
      url: api,
      method: "PUT",
      data: user,
    })
      .then(() => {
        this.focusUsername();
        this.props.handleResetForm();
        this.props.handleGetDataFromServer();
      })
      .catch((err) => {
        throw new Error("Something bad happened.");
      });
  };

  focusUsername = () => {
    this.usernameRef.current.focus();
  };

  showMessage = (text) => {
    message.success(text);
  };

  render() {
    let { username, email, password, id } = this.props.user;

    console.log("isEdit: ", this.props.isEdit);
    return (
      <div>
        <form>
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

          <div style={{ display: "flex", flexDirection: "row" }}>
            <button
              disabled={this.props.isEdit ? true : false}
              type="button"
              className="btn btn-primary"
              style={{ marginRight: "16px" }}
              onClick={() => {
                this.createUser(this.props.user);
                this.showMessage("Success");
              }}>
              Create
            </button>
            <button
              disabled={this.props.isEdit ? false : true}
              type="button"
              className="btn btn-primary"
              onClick={() => {
                this.updateUser(id, this.props.user);
                this.showMessage("Update");
              }}>
              Update
            </button>
            <button
              type="button"
              style={{ marginLeft: "auto" }}
              className="btn btn-danger"
              onClick={() => {
                this.focusUsername();
                this.props.handleResetForm();
                this.showMessage("Reset");
              }}>
              Reset
            </button>
          </div>
        </form>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    isEdit: state.userReducer.isEdit,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    handleResetForm: () => {
      dispatch(resetUser());
    },
    handleUserInfo: (key, value) => {
      dispatch(getUser(key, value));
    },
    handleGetDataFromServer: () => {
      dispatch(fetchUsers());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);

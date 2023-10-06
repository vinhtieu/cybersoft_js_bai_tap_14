import React, { Component } from "react";
import { fetchUsers, setUser } from "../services/action/action";
import { connect } from "react-redux";
import { message } from "antd";
import { USER_DATA } from "../services/api";
import axios from "axios";

class Table extends Component {
  componentDidMount = () => {
    this.props.handleGetDataFromServer();
  };

  deleteUser = (id) => {
    const url = USER_DATA + `/${id}`;
    axios({
      url: url,
      method: "DELETE",
    })
      .then((res) => {
        this.props.handleGetDataFromServer();
      })
      .catch((error) => {
        throw new Error("Something bad happened.");
      });
  };

  editUser = (id) => {
    const user = this.props.userList.filter((item) => {
      return item.id === id;
    });

    this.props.handleSetUser(...user);
  };

  renderTableBody = (array) => {
    if (!array || array.length === 0) return;
    return array.map((item, index) => {
      return (
        <tr key={index}>
          <th scope="row">{item.id}</th>
          <td>{item.username}</td>
          <td>{item.email}</td>
          <td>{item.password}</td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => {
                this.deleteUser(item.id);
                message.error("Delete");
              }}>
              Del
            </button>
          </td>
          <td>
            <button
              className="btn btn-primary"
              onClick={() => {
                this.editUser(item.id);
              }}>
              Edit
            </button>
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="Id">#</th>
              <th>Username</th>
              <th>Email</th>
              <th>Password</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>{this.renderTableBody(this.props.userList)}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userList: state.userReducer.userList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSetUser: (user) => {
      dispatch(setUser(user));
    },

    handleGetDataFromServer: () => {
      dispatch(fetchUsers());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);

import React, { Component } from "react";
import { fetchUsers } from "../services/action/action";
import { connect } from "react-redux";

class Table extends Component {
  componentDidMount = () => {
    this.props.handleGetDataFromServer();
  };

  renderTableBody = (array) => {
    console.log("renderTableBody arg: ", array);
    if (!array || array.length === 0) return;
    return array.map((item, index) => {
      return (
        <tr key={index}>
          <th scope="row">{item.id}</th>
          <td>{item.username}</td>
          <td>{item.email}</td>
          <td>{item.password}</td>
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
    handleGetDataFromServer: () => {
      dispatch(fetchUsers());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);

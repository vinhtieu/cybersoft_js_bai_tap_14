import React, { Component } from "react";
import { getUsers } from "../services/action/action";
import { connect } from "react-redux";

class Table extends Component {
  componentDidMount = () => {
    console.log("userList: ", this.props.userList);
    this.props.handleGetDataFromServer();
  };

  renderTableBody = (array) => {
    console.log("array: ", array);
    const tableHtmls =
      array.map((item) => {
        return (
          <tr key={item.id}>
            <th scope="row">{item.id}</th>
            <td>{item.name}</td>
            <td>{item.account}</td>
            <td>{item.password}</td>
          </tr>
        );
      }) | [];

    return tableHtmls.join("");
  };

  render() {
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="Id">v#</th>
              <th scope="Name">Name</th>
              <th scope="Account">Account</th>
              <th scope="Password">Password</th>
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
    userList: state.userList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetDataFromServer: () => {
      dispatch(getUsers());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);

import React, { Component } from "react";
import { Table, Form } from "../components";

export default class UserManagement extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-8">
          <Table></Table>
        </div>
        <div className="col-4">
          <Form></Form>
        </div>
      </div>
    );
  }
}

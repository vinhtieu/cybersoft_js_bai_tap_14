import React, { Component } from "react";
import { Table, Form } from "../components";

export default class UserManagement extends Component {
  render() {
    return (
      <div className="container" style={{ paddingBlock: "32px" }}>
        <div className="row">
          <div className="row" style={{ marginBottom: "16px" }}>
            <Form></Form>
          </div>
          <div className="row">
            <Table></Table>
          </div>
        </div>
      </div>
    );
  }
}

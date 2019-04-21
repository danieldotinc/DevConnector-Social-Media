import React, { Component } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteEducationItem } from "../../state/actions/profileActions";

class Education extends Component {
  state = {};

  handleDelete = id => this.props.deleteEducationItem(id);

  render() {
    const education = this.props.education.map(exp => (
      <tr key={exp._id}>
        <td>{exp.degree}</td>
        <td>{exp.school}</td>
        <td>
          <Moment format="YYYY.MM.DD">{exp.from}</Moment>
          {" - "}
          {exp.to && <Moment format="YYYY.MM.DD">{exp.to}</Moment>}
          {!exp.to && "Now"}
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => this.handleDelete(exp._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Education Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Degree</th>
              <th>School</th>
              <th>Years</th>
              <th />
            </tr>
            {education}
          </thead>
        </table>
      </div>
    );
  }
}

export default connect(
  null,
  { deleteEducationItem }
)(Education);

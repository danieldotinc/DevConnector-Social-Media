import React, { Component } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteExperienceItem } from "../../state/actions/profileActions";

class Experience extends Component {
  state = {};

  handleDelete = id => this.props.deleteExperienceItem(id);

  render() {
    const experience = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.title}</td>
        <td>{exp.company}</td>
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
        <h4 className="mb-4">Experience Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Company</th>
              <th>Years</th>
              <th />
            </tr>
            {experience}
          </thead>
        </table>
      </div>
    );
  }
}

export default connect(
  null,
  { deleteExperienceItem }
)(Experience);

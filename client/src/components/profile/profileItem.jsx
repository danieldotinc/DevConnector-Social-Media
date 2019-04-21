import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class ProfileItem extends Component {
  state = {};
  render() {
    const { profile } = this.props;
    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img
              src={profile.user.avatar}
              alt={profile.user.name}
              className="rounded-circle"
            />
          </div>
          <div className="col-lg-8 col-md-4 col-8">
            <h3>{profile.user.name}</h3>
            <p>
              {profile.status}
              {profile.company && ` at ${profile.company}`}
            </p>
            <p>{profile.location}</p>
            <Link to={`/Profile/${profile.handle}`} className="btn btn-info">
              View Profile
            </Link>
          </div>
          <div className="col-md-2 d-none d-md-block">
            <h4 className="text-center">Skill Set</h4>
            <ul className="list-group">
              {profile.skills.slice(0, 4).map((skill, index) => (
                <li className="list-group-item" key={index + skill}>
                  <i className="fa fa-check pr-1" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;

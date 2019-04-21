import React, { Component } from "react";
import { Link } from "react-router-dom";

const ProfileActions = () => {
  return (
    <div className="btn-group mb-4" role="group">
      <Link to="/Edit-Profile" className="btn btn-light">
        <i className="fa fa-user-circle text-info mr-1" />
        Edit Profile
      </Link>
      <Link to="/Add-Experience" className="btn btn-light">
        <i className="fa fa-black-tie text-info mr-1" />
        Add Experience
      </Link>
      <Link to="/Add-Education" className="btn btn-light">
        <i className="fa fa-graduation-cap text-info mr-1" />
        Add Education
      </Link>
    </div>
  );
};

export default ProfileActions;

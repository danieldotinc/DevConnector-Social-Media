import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getProfileItem,
  deleteUserAccount
} from "../../state/actions/profileActions";
import { BeatLoader } from "react-spinners";
import ProfileActions from "./profileActions";
import auth from "../../services/authService";
import PropTypes from "prop-types";
import Experience from "./experience";
import Education from "./education";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getProfileItem();
  }

  handleDeleteAccount = () => {
    this.props.deleteUserAccount();
    window.location = "/Logout";
  };

  render() {
    const { profile, loading } = this.props;
    const user = auth.getCurrentUser();
    if (loading || !profile)
      return (
        <div className="centered">
          <BeatLoader sizeUnit={"px"} size={20} color={"#696969"} />
        </div>
      );
    if (!profile.user)
      return (
        <div className="container">
          <h6>Welcome {user.name}</h6>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/Create-Profile" className="btn btn-info">
            Ceate Profile
          </Link>
        </div>
      );
    return (
      <div className="container">
        <p>
          Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
        </p>
        <ProfileActions />
        <Experience experience={profile.experience} />
        <Education education={profile.education} />
        <div style={{ marginBottom: "60px" }}>
          <button className="btn btn-danger" onClick={this.handleDeleteAccount}>
            Delete My Account
          </button>
        </div>
        <div className="list-group m-3" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile.profile,
  loading: state.profile.loading
});

Dashboard.propTypes = {
  getProfileItem: PropTypes.func.isRequired,
  deleteUserAccount: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

export default connect(
  mapStateToProps,
  { getProfileItem, deleteUserAccount }
)(Dashboard);

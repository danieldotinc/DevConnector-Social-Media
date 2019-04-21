import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProfileItem } from "../../state/actions/profileActions";
import { BeatLoader } from "react-spinners";
import auth from "../../services/authService";
import PropTypes from "prop-types";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getProfileItem();
  }

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
        <h1>Dashboard of {user.name}</h1>
        <div className="list-group m-3">
          Experiences
          {profile.experience.map(e => (
            <div className="list-group-item m-2">
              <p>
                <span style={{ fontWeight: "600", fontSize: "16px" }}>
                  Title:
                </span>{" "}
                {e.title}
              </p>
              <p>
                <span style={{ fontWeight: "600", fontSize: "16px" }}>
                  Company:
                </span>{" "}
                {e.company}
              </p>
              <p>
                <span style={{ fontWeight: "600", fontSize: "16px" }}>
                  Location:
                </span>{" "}
                {e.location}
              </p>
            </div>
          ))}
        </div>
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
  profile: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

export default connect(
  mapStateToProps,
  { getProfileItem }
)(Dashboard);

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { BeatLoader } from "react-spinners";
import ProfileAbout from "./profileAbout";
import ProfileHeader from "./profileHeader";
import ProfileCreds from "./profileCreds";
import ProfileGithub from "./profileGithub";
import PropTypes from "prop-types";
import { getProfileItemByHandle } from "../../state/actions/profileActions";

class Profile extends Component {
  componentDidMount() {
    const { handle } = this.props.match.params;
    if (handle) this.props.getProfileItemByHandle(handle);
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.profile === null && this.props.loading)
  //     this.props.history.push("/Not-Found");
  // }

  render() {
    const { profile, loading } = this.props;
    if (loading || !profile)
      return (
        <div className="centered">
          <BeatLoader sizeUnit={"px"} size={20} color={"#696969"} />
        </div>
      );
    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-6">
                  <Link
                    className="btn btn-light mb-3 float-left"
                    to="/Profiles"
                  >
                    Back To Profiles
                  </Link>
                </div>
                <div className="col-md-6" />
              </div>
              <ProfileHeader profile={profile} />
              <ProfileAbout profile={profile} />
              <ProfileCreds
                education={profile.education}
                experience={profile.experience}
              />
              <ProfileGithub username={profile.githubUsername} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object,
  loading: PropTypes.bool,
  getProfileItemByHandle: PropTypes.func
};

const mapStateToProps = state => ({
  profile: state.profile.profile,
  loading: state.profile.loading
});

export default connect(
  mapStateToProps,
  { getProfileItemByHandle }
)(Profile);

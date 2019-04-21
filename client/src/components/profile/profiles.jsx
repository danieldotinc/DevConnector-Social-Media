import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { BeatLoader } from "react-spinners";
import ProfileItem from "./profileItem";
import { getProfileList } from "../../state/actions/profileActions";

class Profiles extends Component {
  state = {};
  componentDidMount() {
    this.props.getProfileList();
  }

  render() {
    const { loading, profiles } = this.props;
    if (loading || !profiles)
      return (
        <div className="centered">
          <BeatLoader sizeUnit={"px"} size={20} color={"#696969"} />
        </div>
      );
    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h4 className="display-4 text-center">Developer Profiles</h4>
              <p className="lead text-center">
                Browse and connect with developers
              </p>
              {profiles.map(profile => (
                <ProfileItem key={profile._id} profile={profile} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfileList: PropTypes.func.isRequired,
  profiles: PropTypes.array.isRequired,
  loading: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profiles: state.profile.profiles,
  loading: state.profile.loading
});

export default connect(
  mapStateToProps,
  { getProfileList }
)(Profiles);

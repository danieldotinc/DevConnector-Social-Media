import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  editProfileItem,
  getProfileItem
} from "../../state/actions/profileActions";
import PropTypes from "prop-types";
import { BeatLoader } from "react-spinners";
import Form from "../form/form";

class EditProfile extends Form {
  state = {
    displaySocialInputs: false,
    data: {
      _id: "",
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubUsername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: ""
    },
    errors: {}
  };

  componentDidMount() {
    this.props.getProfileItem();
  }

  componentWillReceiveProps(nextProps) {
    const { errors, profile: data, loading } = nextProps;
    if (errors) this.setState({ errors });
    if (data || !loading) {
      data.youtube = data.social.youtube;
      data.facebook = data.social.facebook;
      data.instagram = data.social.instagram;
      data.linkedin = data.social.linkedin;
      data.twitter = data.social.twitter;
      this.setState({ data });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { data } = this.state;
    const profile = {
      _id: data._id,
      handle: data.handle,
      status: data.status,
      company: data.company,
      website: data.website,
      location: data.location,
      skills: data.skills,
      githubUsername: data.githubUsername,
      bio: data.bio,
      social: {
        youtube: data.youtube,
        instagram: data.instagram,
        linkedin: data.linkedin,
        facebook: data.facebook,
        twitter: data.twitter
      }
    };

    Object.keys(profile).map(e => {
      if (!profile[e]) delete profile[e];
      if (typeof profile[e] == "object")
        Object.keys(profile[e]).map(m => {
          if (!profile[e][m]) delete profile[e][m];
        });
    });

    this.props.editProfileItem(profile, this.props.history);
  };

  render() {
    const { errors, displaySocialInputs } = this.state;
    const { profile, loading } = this.props;
    if (loading || !profile)
      return (
        <div className="centered">
          <BeatLoader sizeUnit={"px"} size={20} color={"#696969"} />
        </div>
      );
    const statusOptions = [
      { label: "* Select Professional Status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Student or Learning", value: "Student or Learning" },
      { label: "Instructer or Teacher", value: "Instructer or Teacher" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/Dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Profile</h1>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.handleSubmit}>
                {this.renderInput(
                  "handle",
                  "* Profile Handle",
                  errors.handle,
                  "A unique handle for your profile URL. Your full name, company name, nickname"
                )}
                {this.renderSelect(
                  "status",
                  statusOptions,
                  errors.status,
                  "Give us an idea of where you are at in your career"
                )}
                {this.renderInput(
                  "company",
                  "Company",
                  errors.company,
                  "Could be your comapny or one you work for"
                )}
                {this.renderInput(
                  "website",
                  "Website",
                  errors.website,
                  "Could be your own website or a company one"
                )}
                {this.renderInput(
                  "location",
                  "Location",
                  errors.location,
                  "City or city & state suggested (eg. Boston, MA)"
                )}
                {this.renderInput(
                  "skills",
                  "Skills",
                  errors.skills,
                  "Please use comma seperated values (eg. HTML,CSS,JavaScript,PHP)"
                )}
                {this.renderInput(
                  "githubUsername",
                  "Github Username",
                  errors.githubUsername,
                  "If you want your latest repos and a Github link, include your username"
                )}
                {this.renderTextarea("bio", "Short Bio", errors.bio)}
                <div className="mb-3">
                  <span
                    className="btn btn-light"
                    onClick={() =>
                      this.setState({
                        displaySocialInputs: !displaySocialInputs
                      })
                    }
                  >
                    Add Social Network Links
                  </span>
                  <span className="text-muted ml-2">Optional</span>
                </div>
                {displaySocialInputs && (
                  <div>
                    {this.renderInputGroup(
                      "twitter",
                      "Twitter Profile URL",
                      errors.twitter,
                      "fa fa-twitter"
                    )}
                    {this.renderInputGroup(
                      "youtube",
                      "Youtube Profile URL",
                      errors.youtube,
                      "fa fa-youtube"
                    )}
                    {this.renderInputGroup(
                      "facebook",
                      "Facebook Profile URL",
                      errors.facebook,
                      "fa fa-facebook"
                    )}
                    {this.renderInputGroup(
                      "linkedin",
                      "Linkedin Profile URL",
                      errors.linkedin,
                      "fa fa-linkedin"
                    )}
                    {this.renderInputGroup(
                      "instagram",
                      "Instagram Profile URL",
                      errors.instagram,
                      "fa fa-instagram"
                    )}
                  </div>
                )}
                {this.renderSubmit()}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditProfile.propTypes = {
  getProfileItem: PropTypes.func.isRequired,
  editProfileItem: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  loading: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile.profile,
  loading: state.profile.loading,
  errors: state.error.errors
});

export default connect(
  mapStateToProps,
  { getProfileItem, editProfileItem }
)(EditProfile);

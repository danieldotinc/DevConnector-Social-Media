import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getGithubRepos } from "../../state/actions/profileActions";
import { connect } from "react-redux";

class ProfileGithub extends Component {
  state = {
    clientId: "c727dba4616f6d93274d",
    clientSecret: "749a21e237b0866e1043469efc5b56f7fd797748",
    count: 5,
    sort: "created: asc",
    repos: []
  };

  componentDidMount() {
    this.props.getGithubRepos({ ...this.state, ...this.props });
  }

  componentWillReceiveProps(nextProps) {
    const { repos } = nextProps;
    if (repos && repos[0]) this.setState({ repos });
  }

  render() {
    const { repos } = this.state;
    return (
      <div ref="myRef">
        <hr />
        <h3 className="mb-4">Latest Github Repos</h3>
        {repos.map(repo => (
          <div key={repo.id} className="card card-body mb-2">
            <div className="row">
              <div className="col-md-6">
                <h4>
                  <Link
                    to={repo.html_url}
                    className="text-info"
                    target="_blank"
                  >
                    {repo.name}
                  </Link>
                </h4>
                <p>{repo.description}</p>
              </div>
              <div className="col-md-6">
                <span className="badge badge-info mr-1">
                  Stars: {repo.stargazers_count}
                </span>
                <span className="badge badge-secondary mr-1">
                  Watchers: {repo.watchers_count}
                </span>
                <span className="badge badge-success">
                  Forks: {repo.forks_count}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  repos: state.profile.repos
});

export default connect(
  mapStateToProps,
  { getGithubRepos }
)(ProfileGithub);

import React, { Component } from "react";
import { connect } from "react-redux";
import { Paper, Typography, Divider, Grid } from "@material-ui/core";

class Leaderblock extends Component {
  render() {
    const { name, avatarURL, questions, answers } = this.props.user;
    const numAnsweredQuestions = Object.keys(answers).length;
    const numCreatedQuestions = Object.keys(questions).length;

    return (
      <div>
        <Paper elevation={2} className="poll-container">
          <Typography variant="h5" component="h4">
            {this.props.position}
          </Typography>
          <Typography variant="h6" component="h4">
            {name}
          </Typography>
          <Divider light />
          <Grid
            container
            direction="row"
            alignContent="center"
            justify="space-around"
          >
            <Grid item className="poll-info-container">
              <img
                src={avatarURL}
                alt="User avatar"
                className="leader-avatar"
              />
            </Grid>
            <Grid item className="poll-info-container">
              <Typography variant="body1">Answered questions</Typography>
              <Typography variant="h6">{numAnsweredQuestions}</Typography>
              <Typography variant="body1">Created questions</Typography>
              <Typography variant="h6">{numCreatedQuestions}</Typography>
            </Grid>
            <Grid item className="poll-info-container">
              <Typography variant="h6">Score</Typography>
              <Typography variant="h4">
                {numAnsweredQuestions + numCreatedQuestions}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users }, { id }) {
  const user = users[id];

  return {
    user,
    authedUser,
  };
}

export default connect(mapStateToProps)(Leaderblock);

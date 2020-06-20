import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Button, Paper, Typography, Divider, Grid } from "@material-ui/core";

class Poll extends Component {
  render() {
    const { id, question, questionAuthor } = this.props;

    const { optionOne } = question;
    const { name, avatarURL } = questionAuthor;

    return (
      <div>
        <Paper elevation={2} className="poll-container">
          <Typography variant="h6" component="h4">{`${name} asks`}</Typography>
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
                className="question-avatar"
              />
            </Grid>
            <Grid item className="poll-info-container">
              <Typography variant="h6">Would you rather</Typography>
              <Typography variant="body1">{optionOne.text} or...</Typography>
              <Link to={`/questions/${id}`} className="link">
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  component="span"
                >
                  View Poll
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

function mapStateToProps({ users, questions }, { id }) {
  const question = questions[id];

  return {
    question: question,
    questionAuthor: users[question.author],
  };
}

export default withRouter(connect(mapStateToProps)(Poll));

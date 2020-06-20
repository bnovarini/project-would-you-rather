import React, { Component } from "react";
import { connect } from "react-redux";
import Poll from "./Poll";
import { Grid, Button } from "@material-ui/core";

class PollDashboard extends Component {
  state = {
    answered: false,
  };

  handleAnswered = (e, answer) => {
    e.preventDefault();
    this.setState(() => ({
      answered: answer,
    }));
  };

  render() {
    return (
      <div>
        <Grid container direction="column" alignContent="center" spacing={4}>
          <Grid item>
            <Grid container direction="row" alignContent="center" spacing={2}>
              <Grid item>
                <Button
                  variant={this.state.answered ? "outlined" : "contained"}
                  onClick={(e) => this.handleAnswered(e, false)}
                >
                  Unanswered Questions
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant={this.state.answered ? "contained" : "outlined"}
                  onClick={(e) => this.handleAnswered(e, true)}
                >
                  Answered Questions
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            {this.state.answered === true
              ? this.props.questionIds.map(
                  (id) =>
                    this.props.answered[id] != null && <Poll key={id} id={id} />
                )
              : this.props.questionIds.map(
                  (id) =>
                    this.props.answered[id] == null && <Poll key={id} id={id} />
                )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }) {
  return {
    authedUser,
    questionIds: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
    answered: users[authedUser].answers,
  };
}

export default connect(mapStateToProps)(PollDashboard);

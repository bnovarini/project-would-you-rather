import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddQuestionAnswer } from "../actions/shared";
import {
  Paper,
  Typography,
  Divider,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@material-ui/core";

class Question extends Component {
  state = {
    selectedOption: null,
  };

  handleOptionChange = (e) => {
    this.setState({
      selectedOption: e.target.value,
    });
  };

  handleAnswer = (e) => {
    e.preventDefault();

    const { dispatch, authedUser } = this.props;
    const { question_id } = this.props.match.params;

    dispatch(
      handleAddQuestionAnswer({
        qid: question_id,
        authedUser,
        answer: this.state.selectedOption,
      })
    );
  };

  render() {
    const { question, questionAuthor, authedUser } = this.props;

    //Handling question id not found
    if (Object.keys(question).length === 0) {
      return <p>This question doesn't exist</p>;
    }

    const { optionOne, optionTwo } = question;
    const { name, avatarURL } = questionAuthor;

    const answered =
      optionOne.votes.includes(authedUser) ||
      optionTwo.votes.includes(authedUser);

    const totalVotes = optionOne.votes.length + optionTwo.votes.length;

    return (
      <div>
        <Paper elevation={2} className="new-question-container">
          <Typography variant="h6" component="h4">
            {!answered ? `${name} asks` : `Asked by ${name}`}
          </Typography>
          <Divider light />
          <Grid
            container
            direction="row"
            alignContent="center"
            justify="space-between"
          >
            <Grid item className="question-info-container">
              <img
                src={avatarURL}
                alt="User avatar"
                className="question-avatar"
              />
            </Grid>
            <Grid item className="question-info-container">
              <Typography variant="h5">
                {!answered ? "Would you rather" : "Results"}
              </Typography>
              {!answered ? (
                <form onSubmit={this.handleAnswer}>
                  <RadioGroup name="option" onChange={this.handleOptionChange}>
                    <FormControlLabel
                      value="optionOne"
                      control={<Radio />}
                      label={optionOne.text}
                    />
                    <FormControlLabel
                      value="optionTwo"
                      control={<Radio />}
                      label={optionTwo.text}
                    />
                  </RadioGroup>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={this.state.selectedOption === null}
                  >
                    Submit
                  </Button>
                </form>
              ) : (
                <div>
                  <div
                    className={
                      optionOne.votes.includes(authedUser)
                        ? "answered-vote"
                        : "unanswered-vote"
                    }
                  >
                    <Typography variant="h6">
                      Would you rather {optionOne.text}
                    </Typography>
                    <Typography variant="body1">
                      {optionOne.votes.length} of {totalVotes} votes (
                      {(optionOne.votes.length / totalVotes) * 100}%)
                    </Typography>
                  </div>
                  <div
                    className={
                      optionTwo.votes.includes(authedUser)
                        ? "answered-vote"
                        : "unanswered-vote"
                    }
                  >
                    <Typography variant="h6">
                      Would you rather {optionTwo.text}
                    </Typography>
                    <Typography variant="body1">
                      {optionTwo.votes.length} of {totalVotes} votes (
                      {(optionTwo.votes.length / totalVotes) * 100}%)
                    </Typography>
                  </div>
                </div>
              )}
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, props) {
  const { question_id } = props.match.params;

  return {
    id: question_id,
    authedUser,
    question: !questions[question_id] ? {} : questions[question_id],
    questionAuthor: !questions[question_id]
      ? {}
      : users[questions[question_id].author],
  };
}

export default connect(mapStateToProps)(Question);

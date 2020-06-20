import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { handleAddQuestion } from "../actions/shared";
import {
  Paper,
  Typography,
  Divider,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";

class NewQuestion extends Component {
  state = {
    optionOneText: "",
    optionTwoText: "",
    toHome: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { optionOneText, optionTwoText } = this.state;
    const { dispatch, authedUser } = this.props;

    dispatch(
      handleAddQuestion({
        optionOneText: optionOneText,
        optionTwoText: optionTwoText,
        author: authedUser,
      })
    );

    this.setState({
      optionOneText: "",
      optionTwoText: "",
      toHome: true,
    });
  };

  handleOptionOneChange = (e) => {
    this.setState({
      optionOneText: e.target.value,
    });
  };

  handleOptionTwoChange = (e) => {
    this.setState({
      optionTwoText: e.target.value,
    });
  };

  render() {
    if (this.state.toHome === true) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <Paper elevation={2} className="new-question-container">
          <Typography variant="h4" component="h4">
            Create New Question
          </Typography>
          <Divider light />
          <Grid
            container
            direction="column"
            alignContent="flex-start"
            spacing={2}
          >
            <Grid item className="question-info-container">
              <Typography variant="h6">Would you rather...</Typography>
            </Grid>
          </Grid>
          <form onSubmit={this.handleSubmit}>
            <TextField
              variant="outlined"
              placeholder="Option one"
              fullWidth
              value={this.state.optionOneText}
              onChange={this.handleOptionOneChange}
            />
            <Typography variant="body1">or...</Typography>
            <TextField
              variant="outlined"
              placeholder="Option two"
              fullWidth
              value={this.state.optionTwoText}
              onChange={this.handleOptionTwoChange}
            />
            <br />
            <br />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              disabled={
                this.state.optionOneText === "" ||
                this.state.optionTwoText === ""
              }
            >
              Submit
            </Button>
          </form>
        </Paper>
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(NewQuestion);

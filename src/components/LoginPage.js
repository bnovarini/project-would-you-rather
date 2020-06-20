import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import {
  Paper,
  Typography,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  Button,
} from "@material-ui/core";

class LoginPage extends Component {
  state = {
    authedUser: "",
  };

  handleLogin = (e) => {
    e.preventDefault();

    this.props.dispatch(setAuthedUser(this.state.authedUser));
  };

  handleChange = (e) => {
    this.setState({ authedUser: e.target.value });
  };

  render() {
    return (
      <div>
        <Paper elevation={2} className="new-question-container">
          <Grid container direction="column" alignContent="stretch" spacing={4}>
            <Grid item>
              <Typography variant="h2">
                Welcome to the Would you Rather App
              </Typography>
            </Grid>
            <Grid item>
              <form onSubmit={this.handleLogin}>
                <InputLabel id="sign-in">Please sign in to continue</InputLabel>
                <Select
                  labelId="sign-in"
                  value={this.state.authedUser}
                  onChange={this.handleChange}
                  displayEmpty
                  fullWidth
                  variant="outlined"
                >
                  {Object.keys(this.props.users).map((id) => (
                    <MenuItem key={id} value={id}>
                      {id}
                    </MenuItem>
                  ))}
                </Select>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={this.state.authedUser === ""}
                >
                  Sign in
                </Button>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users,
  };
}

export default connect(mapStateToProps)(LoginPage);

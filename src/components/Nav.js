import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Button, Grid, Typography } from "@material-ui/core";
import { logOutAuthedUser } from "../actions/authedUser";

function handleLogout(e, dispatch) {
  e.preventDefault();
  dispatch(logOutAuthedUser());
}

function Nav(props) {
  return (
    <nav>
      <AppBar>
        <Toolbar>
          <Grid
            container
            alignContent="center"
            direction="row"
            justify="space-between"
          >
            <Grid item>
              <Grid container alignItems="center" direction="row" spacing={2}>
                <Grid item>
                  <NavLink
                    exact
                    to="/"
                    className="nav-link"
                    activeClassName="nav-link-active"
                  >
                    Home
                  </NavLink>
                </Grid>
                <Grid item>
                  <NavLink
                    to="/add"
                    className="nav-link"
                    activeClassName="nav-link-active"
                  >
                    New Question
                  </NavLink>
                </Grid>
                <Grid item>
                  <NavLink
                    to="/leaderboard"
                    className="nav-link"
                    activeClassName="nav-link-active"
                  >
                    Leaderboard
                  </NavLink>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container spacing={2}>
                <Grid item>
                  <Typography variant="body1">
                    Hello {props.userName}!
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    className="logout-btn"
                    onClick={(e) => handleLogout(e, props.dispatch)}
                  >
                    Log Out
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </nav>
  );
}

export default connect()(Nav);

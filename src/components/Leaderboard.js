import React, { Component } from "react";
import { connect } from "react-redux";
import Leaderblock from "./Leaderblock";
import { Grid } from "@material-ui/core";

class Leaderboard extends Component {
  render() {
    const { orderedIds } = this.props;
    let i = 0;

    return (
      <div>
        <Grid container direction="column" alignContent="center" spacing={2}>
          <Grid item>
            {orderedIds.map((id) => (
              <Leaderblock key={id} id={id} position={(i = i + 1)} />
            ))}
          </Grid>
        </Grid>
      </div>
    );
  }
}
function mapStateToProps({ authedUser, users }) {
  const scoresArray = Object.values(users).map(
    ({ id, answers, questions }) => ({
      [id]: Object.keys(answers).length + Object.keys(questions).length,
    })
  );

  //Used solution from https://stackoverflow.com/questions/4215737/convert-array-to-object
  const scoresObject = scoresArray.reduce(function (result, item) {
    var key = Object.keys(item)[0]; //first property: id
    result[key] = item[key];
    return result;
  }, {});

  return {
    authedUser,
    orderedIds: Object.keys(scoresObject).sort(
      (a, b) => scoresObject[b] - scoresObject[a]
    ),
  };
}

export default connect(mapStateToProps)(Leaderboard);

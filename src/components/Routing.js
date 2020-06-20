import React from "react";
import PollDashboard from "./PollDashboard";
import Leaderboard from "./Leaderboard";
import NewQuestion from "./NewQuestion";
import Question from "./Question";
import { Route } from "react-router-dom";
import { Container } from "@material-ui/core";

export default function Routing() {
  return (
    <div style={{ marginTop: "128px" }}>
      <Container>
        <Route exact path="/" component={PollDashboard} />
        <Route path="/add" component={NewQuestion} />
        <Route path="/leaderboard" component={Leaderboard} />
        <Route path="/questions/:question_id" component={Question} />
      </Container>
    </div>
  );
}

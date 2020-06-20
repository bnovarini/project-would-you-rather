import {
  _getUsers,
  _getQuestions,
  _saveQuestionAnswer,
  _saveQuestion,
} from "../utils/_DATA.js";
import { receiveUsers } from "./users";
import { receiveQuestions } from "./questions";
import { setAuthedUser } from "./authedUser";
import { showLoading, hideLoading } from "react-redux-loading";

export const ADD_QUESTION_ANSWER = "ADD_QUESTION_ANSWER";
export const ADD_QUESTION = "ADD_QUESTION";

//TODO change Auth to handle log in and log out
// const AUTHED_ID = "sarahedo";

export function handleInitialData(authedID = "") {
  return (dispatch) => {
    dispatch(showLoading());
    return Promise.all([_getUsers(), _getQuestions()]).then(
      ([users, questions]) => {
        dispatch(receiveUsers(users));
        dispatch(receiveQuestions(questions));
        dispatch(setAuthedUser(authedID));
        dispatch(hideLoading());
      }
    );
  };
}

function addQuestionAnswer({ qid, authedUser, answer }) {
  return {
    type: ADD_QUESTION_ANSWER,
    qid,
    authedUser,
    answer,
  };
}

export function handleAddQuestionAnswer(info) {
  return (dispatch) => {
    dispatch(showLoading());

    return _saveQuestionAnswer(info)
      .then(() => {
        dispatch(addQuestionAnswer(info));
      })
      .then(() => dispatch(hideLoading()))
      .catch((e) => {
        console.warn("Error in handleAddQuestionAnswer: ", e);
        alert("The was an error saving your answer. Try again.");
      });
  };
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function handleAddQuestion(question) {
  return (dispatch) => {
    dispatch(showLoading());

    return _saveQuestion(question)
      .then((formattedQuestion) => {
        dispatch(addQuestion(formattedQuestion));
      })
      .then(() => dispatch(hideLoading()))
      .catch((e) => {
        console.warn("Error in handleAddQuestion: ", e);
        alert("The was an error creating your question. Try again.");
      });
  };
}

// UserProfile.js
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import QuestionCard from "./QuestionCard";
import ViewAllQuestionCard from "./ViewAllQuestionCard";

const ViewAllQuestions = ({}) => {
  const { userId } = useParams();
  const [questions, setQuestions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/questions/all`)
      .then((response) => {
        setQuestions(response.data);

        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "60%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "5rem",
      }}
    >
      <Grid container spacing={2}>
        {questions.map((question, index) => (
          <Grid item xs={12} key={index}>
            <ViewAllQuestionCard question={question} userId={userId} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ViewAllQuestions;

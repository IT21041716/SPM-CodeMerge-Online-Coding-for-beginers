// QuestionCard.js
import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Link } from "react-router-dom";
import axios from "axios";
import Grid from "@mui/material/Grid";
const QuestionCard = ({ question }) => {
  const [open, setOpen] = useState(false);
  const [anser, setAnser] = useState([]);

  const handleClickOpen = (id) => {
    const apiUrl = `http://localhost:8080/answers/question/${id}`;

    // Make an HTTP GET request to the API
    axios
      .get(apiUrl)
      .then((response) => {
        // Handle the successful response here
        setAnser(response.data);
        console.log("Details:", anser);

        // You can use 'details' to display or manipulate the data as needed
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error("Error fetching details:", error);
      });
    setOpen(true);
  };
  const deleteQuestion = async (id) => {
    const url = `http://localhost:8080/questions/delete/${id}`;
    await axios
      .delete(url)

      .catch((er) => {
        console.log(`error deleting answer ${er}`);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            {question.title}
          </Typography>
          <Typography color="text.secondary">{question.content}</Typography>
          <Button
            onClick={() => handleClickOpen(question.id)}
            variant="outlined"
          >
            View Answers
          </Button>
          <Button
            onClick={() => deleteQuestion(question.id)}
            variant="outlined"
          >
            Delete
          </Button>
        </CardContent>
      </Card>
      <br />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Answers</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid container spacing={2}>
              {anser.map((ansers, index) => (
                <Grid item xs={12} key={index}>
                  <p>User : {ansers.user.firstName}</p>
                  <p>Anser : {ansers.content}</p>
                </Grid>
              ))}
            </Grid>
          </DialogContentText>
          {/* You can add your answer form or display answers here */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default QuestionCard;

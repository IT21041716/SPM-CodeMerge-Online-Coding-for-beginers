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
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import ForumIcon from "@mui/icons-material/Forum";
import axios from "axios";

const QuestionCard = ({ question }) => {
  const [open, setOpen] = useState(false);
  const [answers, setAnswers] = useState([]);

  const handleClickOpen = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/answers/question/${id}`);
      setAnswers(response.data);
      setOpen(true);
    } catch (error) {
      console.error("Error fetching answers:", error);
    }
  };

  const deleteQuestion = async (id) => {
    const url = `http://localhost:8080/questions/delete/${id}`;
    try {
      await axios.delete(url);
    } catch (error) {
      console.log(`Error deleting question ${error}`);
    }
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
          <Typography color="text.secondary" paragraph>
            {question.content}
          </Typography>
          <Button
            onClick={() => handleClickOpen(question.id)}
            variant="outlined"
            startIcon={<ForumIcon />}
          >
            View Answers
          </Button>
          <Button
            onClick={() => deleteQuestion(question.id)}
            variant="outlined"
            startIcon={<DeleteIcon />}
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
              {answers.map((ansers, index) => (
                <Grid item xs={12} key={index}>
                  <Typography variant="subtitle1">
                    <strong>User:</strong> {ansers.user.firstName}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Answer:</strong> {ansers.content}
                  </Typography>
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

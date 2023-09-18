// QuestionCard.js
import React, { useState } from "react";
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

const QuestionCard = ({ question }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
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
          <Button onClick={handleClickOpen} variant="outlined">
            View Answers
          </Button>
        </CardContent>
      </Card>
      <br />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Answers</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <p>{question.id}</p>
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

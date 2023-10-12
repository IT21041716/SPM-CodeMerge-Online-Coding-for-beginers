// QuestionCard.js
import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Input from "@mui/material/Input";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import AnswerIcon from "@mui/icons-material/Forum";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { CardMedia } from "@mui/material";

const QuestionCard = ({ question, userId }) => {
  const [open, setOpen] = useState(false);
  const [openAnswerBox, setOpenAnswerBox] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const params = useParams();
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleClickOpen = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8080/answers/question/${id}`
      );
      setAnswers(response.data);
      setLoading(false);
      setOpen(true);
    } catch (error) {
      console.error("Error fetching answers:", error);
      setLoading(false);
    }
  };

  const handleAddAnswerClickOpen = (question) => {
    setSelectedQuestion(question);
    setOpenAnswerBox(true);
  };

  const addAnswer = async () => {
    try {
      const response = await axios.post("http://localhost:8080/answers/post", {
        content: answer,
        question: selectedQuestion,
        user: await getUserById(),
      });
      setOpenAnswerBox(false);
    } catch (error) {
      console.error("Error adding answer:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setOpenAnswerBox(false);
  };

  const getUserById = async () => {
    try {
      const uid = params.userId;
      const response = await axios.get(`http://localhost:8080/user/${uid}`);
      return response.data;
    } catch (error) {
      console.log("Error fetching user:", error);
      return null;
    }
  };

  const deleteAnswer = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/answers/delete/${id}`);
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8080/answers/question/${question.id}`
      );
      setAnswers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error deleting answer:", error);
    }
  };

  const updateAnswer = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/answers/edit/${id}`,
        {
          content: answer,
          question: selectedQuestion,
          user: await getUserById(),
        }
      );
      setLoading(true);
      const answersResponse = await axios.get(
        `http://localhost:8080/answers/question/${question.id}`
      );
      setAnswers(answersResponse.data);
      setLoading(false);
    } catch (error) {
      console.error("Error updating answer:", error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Card sx={{ marginBottom: 2 }}>
        <CardContent>
          <Avatar sx={{ width: 100, height: 100, marginBottom: 2 }}>
            <CardMedia
              component="img"
              height="100"
              image={`../../../public/hirunaUploadsUserImages/${question.user.image}`}
              alt={question.user.firstName}
            />
          </Avatar>
          <Avatar sx={{ width: 100, height: 100, marginBottom: 2 }}>
            <CardMedia
              component="img"
              height="100"
              image={`../../../public/hirunaUploadsQuestion Images/${question.image}`}
              alt={question.user.firstName}
            />
          </Avatar>
          <Typography variant="h6" gutterBottom>
             {question.user.firstName} {question.user.lastName}
          </Typography>
          <Typography variant="h5" component="div" gutterBottom>
            {question.title}
          </Typography>
          <Typography color="text.secondary" paragraph>
            {question.content}
          </Typography>
          <Button
            variant="outlined"
            onClick={() => handleClickOpen(question.id)}
            startIcon={<AnswerIcon />}
          >
            View Answers
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleAddAnswerClickOpen(question)}
            startIcon={<AddIcon />}
          >
            Add Answer
          </Button>
        </CardContent>
      </Card>

      {/* Answers Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <div style={{ width: 400, padding: 16 }}>
          <DialogTitle>Answers</DialogTitle>
          <Grid container spacing={2}>
            {answers.map((ans, index) => (
              <Grid item xs={12} key={index}>
                <Avatar sx={{ width: 50, height: 50, marginBottom: 2 }}>
                  <CardMedia
                    component="img"
                    height="50"
                    image={`../../../public/hirunaUploadsUserImages/${ans.user.image}`}
                    alt={ans.user.firstName}
                  />
                </Avatar>
                <Typography variant="subtitle1">
                  <strong>User:</strong> {ans.user.firstName} {ans.user.lastName}
                </Typography>
                {ans.user.id !== params.userId && (
                  <Typography variant="body1">
                    <strong>Answer:</strong> {ans.content}
                  </Typography>
                )}
                {ans.user.id === params.userId && (
                  <Input
                    sx={{ width: "100%" }}
                    defaultValue={ans.content}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Answer"
                  />
                )}
                <div style={{ height: 12 }} />
                {ans.user.id === params.userId && (
                  <div style={{ display: "flex" }}>
                    <Button
                      variant="outlined"
                      onClick={() => updateAnswer(ans.id)}
                      startIcon={<SendIcon />}
                    >
                      Update
                    </Button>
                    <div style={{ width: 12 }} />
                    <Button
                      variant="outlined"
                      onClick={() => deleteAnswer(ans.id)}
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </Grid>
            ))}
          </Grid>
          <div style={{ display: "flex", height: 50, marginTop: 12 }}>
            <Button
              sx={{ flex: 1 }}
              variant="outlined"
              onClick={handleClose}
              startIcon={<CloseIcon />}
            >
              Close
            </Button>
          </div>
        </div>
      </Dialog>

      {/* Add Answer Dialog */}
      <Dialog open={openAnswerBox} onClose={handleClose}>
        <div style={{ width: 400, padding: 16 }}>
          <DialogTitle>Add Your Answer</DialogTitle>
          <Input
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Answer"
          />
          <div style={{ display: "flex", height: 50, marginTop: 12 }}>
            <Button
              sx={{ flex: 1 }}
              variant="outlined"
              onClick={handleClose}
              startIcon={<CloseIcon />}
            >
              Close
            </Button>
            <div style={{ width: 12 }} />
            <Button
              sx={{ flex: 1 }}
              variant="outlined"
              onClick={addAnswer}
              startIcon={<SendIcon />}
            >
              Add Answer
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default QuestionCard;

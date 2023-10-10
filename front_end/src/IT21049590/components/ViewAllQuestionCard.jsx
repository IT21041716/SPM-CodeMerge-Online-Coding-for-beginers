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
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { CircularProgress, Input } from "@mui/material";
const ViewAllQuestionCard = ({ question, userId }) => {
  const [open, setOpen] = useState(false);
  const [openAnswerBox, setOpenAnswerBox] = useState(false);
  const [anser, setAnser] = useState([]);
  const [load, setLoad] = useState(false);
  const [answer, setAnswer] = useState();
  const params = useParams();
  const [selectedQ, setSelectedQ] = useState();
  const handleClickOpen = (id) => {
    const apiUrl = `http://localhost:8080/answers/question/${id}`;

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

  const getUserById = () => {
    const uid = params.userId;
    return axios
      .get("http://localhost:8080/user/" + uid)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  };

  const handleAddAnserClickOpen = async (id, userId, question) => {
    setOpen(true);
  };

  const addAnswer = async () => {
    const user = await getUserById();
    const body = {
      content: answer,
      question: selectedQ,
      user,
    };
    const apiUrl = `http://localhost:8080/answers/post`;
    await axios
      .post(apiUrl, body)
      .then((response) => {
        setOpen(false);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error("Error fetching details:", error);
      });
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteQuestion = async (id) => {
    const url = `http://localhost:8080/answers/delete/${id}`;
    await axios
      .delete(url)
      .then(async (res) => {
        setLoad(true);
        const url = "http://localhost:8080/answers/question/" + question.id;
        await axios
          .get(url)
          .then((res) => {
            setAnser(res.data);
          })
          .catch((err) => {
            console.log(`error fetching answers ${err}`);
          });
        setLoad(false);
      })
      .catch((er) => {
        console.log(`error deleting answer ${er}`);
      });
  };

  const updateAnswer = async (id) => {
    const user = await getUserById();
    const body = {
      content: answer,
      question: selectedQ,
      user,
    };
    await axios
      .put(`http://localhost:8080/answers/edit/${id}`, body)
      .then(async (res) => {
        setLoad(true);
        const url = "http://localhost:8080/answers/question/" + question.id;
        await axios
          .get(url)
          .then((res) => {
            setAnser(res.data);
          })
          .catch((err) => {
            console.log(`error fetching answers ${err}`);
          });
        setLoad(false);
      })
      .catch((err) => {
        console.log(`error updting answer ${err}`);
      });
  };

  if (load) {
    return <CircularProgress />;
  }

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            <p>User : {question.user.firstName}</p>
          </Typography>
          <Typography variant="h5" component="div">
            {question.title}
          </Typography>
          <Typography color="text.secondary">{question.content}</Typography>
          <Button
            onClick={async () => {
              setLoad(true);
              const url =
                "http://localhost:8080/answers/question/" + question.id;
              await axios
                .get(url)
                .then((res) => {
                  setAnser(res.data);
                })
                .catch((err) => {
                  console.log(`error fetching answers ${err}`);
                });
              setLoad(false);
              setOpenAnswerBox(true);
            }}
            variant="outlined"
          >
            View Answers
          </Button>
          <Button
            onClick={() => {
              handleAddAnserClickOpen(question.id, userId, question);
              setSelectedQ(question);
            }}
            variant="outlined"
          >
            Add Answer
          </Button>
        </CardContent>
      </Card>
      <br />

      <Dialog
        open={open}
        onClose={() => {
          setOpenAnswerBox(false);
        }}
      >
        <div style={{ width: 400, padding: 16 }}>
          <DialogTitle>Add Your Answer</DialogTitle>
          {/* <DialogContent>
          <DialogContentText>
            
          </DialogContentText>
       
        </DialogContent> */}

          <div style={{ display: "flex", flexDirection: "column" }}>
            <Input
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
              placeholder="Answer"
            />
            <div style={{ display: "flex", height: 50, marginTop: 12 }}>
              <Button
                sx={{ flex: 1 }}
                variant="outlined"
                onClick={handleClose}
                color="primary"
              >
                Close
              </Button>
              <div style={{ width: 12 }} />
              <Button
                sx={{ flex: 1 }}
                variant="outlined"
                onClick={() => {
                  addAnswer();
                }}
                color="primary"
              >
                Add Answer
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
      <Dialog open={openAnswerBox} onClose={handleClose}>
        <div style={{ width: 600, padding: 16 }}>
          <h3>Answers</h3>
          {
            <Grid container spacing={2}>
              {anser.map((ansers, index) => (
                <Grid item xs={12} key={index}>
                  <p>User : {ansers.user.firstName}</p>
                  {ansers.user.id != params.userId && (
                    <p>Anser : {ansers.content}</p>
                  )}
                  {ansers.user.id == params.userId && (
                    <Input
                      sx={{ width: "100%" }}
                      defaultValue={ansers.content}
                      onChange={(e) => {
                        setAnswer(e.target.value);
                      }}
                      placeholder="Answer"
                    />
                  )}
                  <div style={{ height: 12 }} />
                  {ansers.user.id == params.userId && (
                    <div style={{ display: "flex" }}>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          updateAnswer(ansers.id);
                        }}
                      >
                        Update
                      </Button>
                      <div style={{ width: 12 }} />
                      <Button
                        variant="outlined"
                        onClick={() => {
                          deleteQuestion(ansers.id);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </Grid>
              ))}
            </Grid>
          }
          <div style={{ display: "flex", height: 50, marginTop: 12 }}>
            <Button
              sx={{ flex: 1 }}
              variant="outlined"
              onClick={() => {
                setOpenAnswerBox(false);
              }}
              color="primary"
            >
              Close
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ViewAllQuestionCard;

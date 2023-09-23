import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import axios from "axios";
import { Link, useParams } from "react-router-dom";

const AddQuestion = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [user, setUser] = useState("");
  const { userId } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:8080/user/${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`http://localhost:8080/questions/ask`, {
        title,
        content,
        user,
      })
      .then(() => {
        alert("Question added");
      })
      .catch((err) => {
        alert(err);
      });
  };
 
  return (
    <>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "40px auto",
          padding: "20px",
          backgroundColor: "#f5f5f5",
          borderRadius: "5px",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          id="title"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          sx={{ width: "100%", marginBottom: "20px" }}
        />
        <TextField
          id="description"
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          sx={{ width: "100%", marginBottom: "20px" }}
        />

        <br></br>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </div>
      </Box>
    </>
  );
};

export default AddQuestion;

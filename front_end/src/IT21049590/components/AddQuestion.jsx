import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import axios from "axios";
import { useParams } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const AddQuestion = ({ userId, onClose }) => {
  const [user, setUser] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

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
    const form = new FormData();
    form.append("title", title);
    form.append("content", content);
    form.append("image", image);
    form.append("userId", user.id);
    console.log("User", user.id);

    axios
      .post(`http://localhost:8080/questions/insert`, form)
      .then(() => {
        alert("Question added");
        onClose(); // Close the dialog
      })
      .catch((err) => {
        alert(err);
      });
  };
  const handleCatImg = (e) => {
    setImage(e.target.files[0]);
  };
  return (
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
      <div>
        <input
          accept="image/*"
          id="image"
          type="file"
          style={{ display: "none" }}
          onChange={(e) => {
            handleCatImg(e);
          }}
        />
        <label htmlFor="image">
          <Button
            variant="contained"
            component="span"
            startIcon={<CloudUploadIcon />}
          >
            Upload Image
          </Button>
        </label>
      </div>

      <br></br>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          startIcon={<SendIcon />}
        >
          Submit
        </Button>
      </div>

      {/* Optional: Add a button for additional functionality */}
      {/* <div style={{ marginTop: "20px" }}>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => {
            // Add your custom functionality here
          }}
        >
          Additional Action
        </Button>
      </div> */}
    </Box>
  );
};

export default AddQuestion;

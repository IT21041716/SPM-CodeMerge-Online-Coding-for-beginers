import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LockIcon from "@mui/icons-material/Lock";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const Signup = () => {
  // const [user, setUser] = useState({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   contactNo: "",
  //   image: "",
  //   password: "",
  // });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [image, setImage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("firstName", firstName);
    form.append("lastName", lastName);
    form.append("email", email);
    form.append("contactNo", contactNo);
    form.append("image", image);
    form.append("password", password);
    try {
      const response = await axios.post(
        "http://localhost:8080/user/insert",
        form
      );
      const data = response.data;
      if (data.id) {
        // Signup successful, you can navigate to the login page or perform other actions here.
        console.log("Signup successful");
      } else {
        setErrorMessage("An error occurred during signup.");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      setErrorMessage("An error occurred during signup.");
    }
  };

  // const handleChange = (e) => {
  //   setUser({
  //     ...user,
  //     [e.target.name]: e.target.value,
  //   });
  // };
  const handleCatImg = (e) => {
    setImage(e.target.files[0]);
  };
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          width: 600,
          padding: 3,
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
        }}
        noValidate
        autoComplete="off"
      >
        <h2>Signup</h2>
        {errorMessage && <p>{errorMessage}</p>}
        <TextField
          type="text"
          label="First Name"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          margin="normal"
          InputProps={{
            startAdornment: (
              <AccountCircleIcon color="primary" fontSize="small" />
            ),
          }}
        />
        <TextField
          type="text"
          label="Last Name"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
          margin="normal"
          InputProps={{
            startAdornment: (
              <AccountCircleIcon color="primary" fontSize="small" />
            ),
          }}
        />
        <TextField
          type="email"
          label="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          InputProps={{
            startAdornment: <EmailIcon color="primary" fontSize="small" />,
          }}
        />
        <TextField
          type="text"
          label="Contact No"
          name="contactNo"
          value={contactNo}
          onChange={(e) => setContactNo(e.target.value)}
          fullWidth
          margin="normal"
          InputProps={{
            startAdornment: <PhoneIcon color="primary" fontSize="small" />,
          }}
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
        <TextField
          type="password"
          label="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          InputProps={{
            startAdornment: <LockIcon color="primary" fontSize="small" />,
          }}
        />
        <Button variant="contained" color="primary" onClick={handleSignup}>
          Signup
        </Button>
      </Box>
    </Box>
  );
};

export default Signup;

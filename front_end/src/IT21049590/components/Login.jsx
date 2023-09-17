// Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate,  } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();


  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8080/user/login", {
        email,
        password,
      });
      const data = response.data;
      if (data.status) {
        // Login successful, you can navigate to the user's dashboard or perform other actions here.
        console.log("Login successful");
        navigate(`/userProfile/${response.data.id}`);
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("An error occurred while logging in.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;

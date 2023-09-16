// Signup.js
import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNo: '',
    image: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.post('/user/', user);
      const data = response.data;
      if (data.id) {
        // Signup successful, you can navigate to the login page or perform other actions here.
        console.log('Signup successful');
      } else {
        setErrorMessage('An error occurred during signup.');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      setErrorMessage('An error occurred during signup.');
    }
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2>Signup</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <input
        type="text"
        placeholder="First Name"
        name="firstName"
        value={user.firstName}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Last Name"
        name="lastName"
        value={user.lastName}
        onChange={handleChange}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={user.email}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Contact No"
        name="contactNo"
        value={user.contactNo}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Image"
        name="image"
        value={user.image}
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={user.password}
        onChange={handleChange}
      />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default Signup;

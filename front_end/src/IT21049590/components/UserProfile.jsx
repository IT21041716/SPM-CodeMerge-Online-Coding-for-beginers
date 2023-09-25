// UserProfile.js
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const UserProfile = ({}) => {
  const { userId } = useParams();
  const [user, setUser] = useState([]);
  const [isAddQuestionDialogOpen, setIsAddQuestionDialogOpen] = useState(false); // Manage dialog state

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/user/${userId}`)
      .then((response) => {
        setUser(response.data);

        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleUpdate = () => {
    // Navigate to an update page or component where the user can edit their details
    // You can pass the user object or user ID to the update page if needed
    navigate(`/updateUser/${userId}`);
  };

  const handleDelete = () => {
    // Send a request to delete the user's account
    axios
      .delete(`http://localhost:8080/user/${userId}`)
      .then(() => {
        // Redirect to a success page or perform any necessary actions
        alert("User Deleted");
      })
      .catch((error) => {
        console.log(error);
        // Handle error or display a message to the user
      });
  };
  const openAddQuestionDialog = () => {
    setIsAddQuestionDialogOpen(true);
  };

  // Function to close the Add Question dialog
  const closeAddQuestionDialog = () => {
    setIsAddQuestionDialogOpen(false);
  };

  return (
    <div>
      <h2>User Profile</h2>
      <p>First Name: {user.firstName}</p>
      <p>Last Name: {user.lastName}</p>
      <p>Email: {user.email}</p>
      <p>Contact No: {user.contactNo}</p>
      <p>Image: {user.image}</p>
      {/* You can display additional user details here */}
      <button onClick={handleUpdate}>Update</button>
      <button onClick={handleDelete}>Delete</button>
      <Link to={`/question/${userId}`}>
        <button>View Questions</button>
      </Link>
      <Link to={`/addQuestion/${userId}`}>
        <button>Add Questions</button>
      </Link>
      
      <Link to={`/viewAllQuestions/${userId}`}>
        <button>View All Questions</button>
      </Link>
    </div>
  );
};

export default UserProfile;

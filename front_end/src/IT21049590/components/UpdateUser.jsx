import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

const UpdateUser = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [updatedUser, setUpdatedUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the user's current details based on the userId
    axios
      .get(`http://localhost:8080/user/${userId}`)
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [userId]);

  const handleUpdate = () => {
    // Send a request to update the user's details
    axios
      .put(`http://localhost:8080/user/${userId}`, updatedUser)
      .then(() => {
        // Redirect to the user's profile page after updating
        navigate(`/userProfile/${userId}`);
      })
      .catch((error) => {
        console.log(error);
        // Handle error or display a message to the user
      });
  };

  const handleChange = (e) => {
    // Update the updatedUser state based on user input
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  return (
    <div>
      <h2>Update User Profile</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {Object.keys(user).map((key) => (
            <div key={key}>
              <p>{key}:</p>
              <input
                type="text"
                name={key}
                value={updatedUser[key] || ""}
                placeholder={`New ${key}`}
                onChange={handleChange}
              />
            </div>
          ))}
          <button type="button" onClick={handleUpdate}>
            Update
          </button>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import AddQuestion from "./AddQuestion";
import Avatar from "@mui/material/Avatar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import { CardMedia } from "@mui/material";
import "./UserProfile.css";
import Header from "../../IT21041716/scenes/staticPages/Header";

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState([]);
  const [isAddQuestionDialogOpen, setIsAddQuestionDialogOpen] = useState(false);

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
    navigate(`/updateUser/${userId}`);
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:8080/user/${userId}`)
      .then(() => {
        alert("User Deleted");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const openAddQuestionDialog = () => {
    setIsAddQuestionDialogOpen(true);
  };

  const closeAddQuestionDialog = () => {
    setIsAddQuestionDialogOpen(false);
  };

  return (
    <div style={{ backgroundColor: 'lightblue' }}>
      <Header/>
    <div className="user-profile-container">
      
      <div class="profile">
        <center>
          <Avatar sx={{ width: 100, height: 100, marginBottom: 2 }}>
            <CardMedia
              component="img"
              height="100"
              image={`../../../public/hirunaUploadsUserImages/${user.image}`}
              alt={user.firstName}
            />
          </Avatar>
        </center>

        <h2>
          {user.firstName} {user.lastName}
        </h2>
        <p>Email: {user.email}</p>

        <div className="user-actions">
          <Link to={`/question/${userId}`}>
            <Button variant="outlined" startIcon={<QuestionAnswerIcon />}>
              View Questions
            </Button>
          </Link>
          <Button
            variant="outlined"
            onClick={openAddQuestionDialog}
            startIcon={<PlaylistPlayIcon />}
          >
            Add Questions
          </Button>
          <Link to={`/viewAllQuestions/${userId}`}>
            <Button variant="outlined" startIcon={<PlaylistPlayIcon />}>
              View All Questions
            </Button>
          </Link>
        </div>
      </div>

      {/* AddQuestion Dialog */}
      <Dialog open={isAddQuestionDialogOpen} onClose={closeAddQuestionDialog}>
        <DialogTitle>Add Question</DialogTitle>
        <DialogContent>
          <AddQuestion userId={userId} onClose={closeAddQuestionDialog} />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAddQuestionDialog} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    </div>
  );
};

export default UserProfile;

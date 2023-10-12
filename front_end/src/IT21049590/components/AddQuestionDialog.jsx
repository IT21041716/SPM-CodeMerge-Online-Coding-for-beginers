import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';

const AddQuestionDialog = ({ open, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState("");


  const handleClose = () => {
    // Reset form values and close the dialog
    setTitle('');
    setContent('');
    onClose();
  };

  const handleSubmit = (e) => {
    
    onSubmit(title, content);

    // Reset form values and close the dialog
    setTitle('');
    setContent('');
    setImage();
    onClose();
  };
  

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ borderBottom: '1px solid #ccc' }}>
        <span style={{ marginRight: '8px' }}>Add a New Question</span>
        <AddIcon fontSize="small" color="primary" />
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          type="text"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          id="content"
          label="Content"
          type="text"
          fullWidth
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </DialogContent>
      
      <DialogActions>
        <Button
          onClick={handleClose}
          color="secondary"
          startIcon={<CancelIcon />}
        >
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" startIcon={<AddIcon />}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddQuestionDialog;

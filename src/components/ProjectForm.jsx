import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const ProjectForm = ({ open, onClose, onSubmit, initialProjectInfo }) => {
  const currentDate = new Date().toISOString().split('T')[0];

  const [projectInfo, setProjectInfo] = useState({
    projectName: '',
    duration: initialProjectInfo?.duration || '',
    owner: '',
    dateCreated: currentDate,
    lastViewed: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProjectInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
      lastViewed: new Date().toISOString().split('T')[0], // Update the lastViewed date whenever input changes
    }));
  };

  const handleSubmit = () => {
    onSubmit(projectInfo);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Enter Project Details</DialogTitle>
      <DialogContent>
        <TextField
          label="Project Name"
          name="projectName"
          value={projectInfo.projectName}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Duration"
          name="duration"
          value={projectInfo.duration} 
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Owner"
          name="owner"
          value={projectInfo.owner}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Date Created"
          name="dateCreated"
          type="date"
          value={projectInfo.dateCreated}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Last Viewed"
          name="lastViewed"
          value={projectInfo.lastViewed}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="inherit">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProjectForm;

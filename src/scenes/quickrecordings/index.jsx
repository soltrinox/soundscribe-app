import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import Header from "../../components/Header";
import TextToSpeech from "../../scenes/tts";
import SpeechToText from "../../scenes/stt";




const QuickRecordings = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    {
      field: "name",
      headerName: "Project Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "duration",
      headerName: "Duration",
      type: "text",
      flex: 1,
      headerAlign: "right",
      align: "right",
    },
    {
      field: "owner",
      headerName: "Owner",
      type: "text",
      flex: 1,
      headerAlign: "right",
      align: "right",
    },
    {
      field: "created",
      headerName: "Created",
      type: "text",
      headerAlign: "right",
      align: "right",
    },
    {
      field: "lastviewed",
      headerName: "Last Viewed",
      flex: 1,
      headerAlign: "center",
      align: "right",
  
    },
  ];
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [selectedComponent, setSelectedComponent] = useState("null"); // "tts" or "stt"

    const handleCreateProject = () => {
      setShowModal(true);
    };

    const handleComponentSelection = (component) => {
      setSelectedComponent(component);
      setShowModal(false);
  
       // Navigate to the selected component
      if (component === "tts") {
        navigate("/tts");
      } else if (component === "stt") {
        navigate("/stt");
      }
    };


  return (
      <Box m="20px">
        <Box m="20px">
        {/* Quick Recordings*/}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="Quick Recordings" />

          <Box>
            <Button
              onClick={handleCreateProject}
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "12px",
                padding: "10px 20px",
              }}
            >
              <AddReactionOutlinedIcon sx={{ mr: "10px" }} />
              Create Project
            </Button>
          </Box>
              
            <Dialog open={showModal} onClose={() => setShowModal(false)}>
              <DialogTitle sx={{alignItems: "center", textAlign: "center"}}>Please Select One</DialogTitle>
              <DialogContent>
                <Typography sx={{alignItems: "center", textAlign: "center"}} >
                  Choose a project to create:
                </Typography>
                <Button
                  onClick={() => handleComponentSelection("tts")}
                  sx={{ mt: 2, color: 'inherit' }}
                  variant="outlined"
                >
                  Text-to-Speech
                </Button>
                <Button
                  onClick={() => handleComponentSelection("stt")}
                  sx={{ mt: 2, ml: 2, color: 'inherit' }}
                  variant="outlined"
                >
                  Speech-to-Text
                </Button>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setShowModal(false)} color="inherit">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>

          {showModal && selectedComponent === "tts" && <TextToSpeech />}
          {showModal && selectedComponent === "stt" && <SpeechToText />}
        </Box>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
            marginBottom: "40px"
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows=""  columns={columns} />
      </Box>
    </Box>
  );
};

export default QuickRecordings;
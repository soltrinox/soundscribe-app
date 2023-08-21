import React, { useState, useEffect } from 'react';
import { Box, Button, useTheme } from "@mui/material";
import KeyboardVoiceOutlinedIcon from '@mui/icons-material/KeyboardVoiceOutlined';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined'; 
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import GetAppOutlinedIcon from '@mui/icons-material/GetAppOutlined';
import {Stack, TextField } from '@mui/material'
import { tokens } from "../../theme";
import Header from "../../components/Header";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import HighlightedText from "../../components/HighlightedText";
import ProjectForm from '../../components/ProjectForm';






const SpeechToText = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const startListening = () => SpeechRecognition.startListening({ continuous: true });
  const [audioUrl, setAudioUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [showProjectForm, setShowProjectForm] = useState(false);
  const [projectInfo, setProjectInfo] = useState(null); // Initialize with null or an empty object

  const handleDownloadClick = () => {
    setShowProjectForm(true);
  };

  const handleProjectFormSubmit = (newProjectInfo) => {
    setProjectInfo(newProjectInfo); // Store the project info in state
    setShowProjectForm(false); // Close the form after submission
  };


  const handleAudioUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAudioUrl(URL.createObjectURL(file));
    }
  };
  const removeUploadedAudio = () => {
    setAudioUrl(null);
    setIsPlaying(false);
    resetTranscript();
  };

  useEffect(() => {
    if (isPlaying && browserSupportsSpeechRecognition) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.onresult = (event) => {
        const currentResult = event.results[event.results.length - 1];
        if (currentResult.isFinal) {
          const newTranscript = transcript + ' ' + currentResult[0].transcript;
          SpeechRecognition.onResult({ results: [{ transcript: newTranscript }] });
        }
      };
      recognition.onend = () => {
        setIsPlaying(false);
      };
      recognition.start();
      return () => {
        recognition.stop();
      };
    }
  }, [isPlaying, browserSupportsSpeechRecognition, transcript]);

  
  

    if(!browserSupportsSpeechRecognition) {
      return <span>Your Browser Doesn't Support Speech Recognition</span>
    }

  return (
      <Box m="20px">
        <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="Speech To Text " />
          <h7>Your Microphone is:  { listening ? 'ON' : 'OFF'}</h7>
        </Box>
       
            <Box>
              {audioUrl && (
              <audio controls src={audioUrl}>
                Your browser does not support the audio element.
              </audio>
            )}
            
            <input
              type="file"
              accept="audio/*"
              onChange={handleAudioUpload}
              style={{ display: 'none' }} // Hide the input
              id="audio-upload-input"
            />
            <label htmlFor="audio-upload-input">
              <Button
                component="span" // Use a span as a wrapper for the label content
                sx={{
                  type: "submit",
                  backgroundColor: colors.blueAccent[700],
                  color: colors.grey[100],
                  fontSize: "12px",
                  padding: "10px 20px",
                  marginLeft: "660px",
                  alignContent: "center"
                }}
              >
                <CloudUploadOutlinedIcon sx={{ mr: "10px" }} />
                Upload Audio
              </Button>
              <Button
                onClick={removeUploadedAudio}
                sx={{
                  type: "submit",
                  backgroundColor: colors.blueAccent[700],
                  color: colors.grey[100],
                  fontSize: "12px",
                  padding: "10px 20px",
                  alignContent: "center",
                  position: "center",
                  marginLeft: "10px"
                
                }}
              >
                <DeleteOutlineOutlinedIcon sx={{  }} />
                  Remove Audio
              </Button>
            </label>
           
            </Box>
        </Box>
         
     
    
      <Stack autoComplete="off">
          {/* <TextField
            variant="outlined"
            label="Converted Audio"
            backgroundColor="colors.primary[400]"
            color="secondary"
            marginBottom= "20px"
            multiline
            rows={10}
            value={transcript}
          >
           
          </TextField> */}
          <HighlightedText text={transcript} />
        </Stack>

        

            <Button
              onClick={startListening}
              sx={{
                type: "submit",
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "12px",
                padding: "10px 20px",
                margin: "10px",
                alignContent: "center"
              }}
            >
              <KeyboardVoiceOutlinedIcon sx={{ mr: "10px" }} />
              Speak
            </Button>
            <Button
              onClick={SpeechRecognition.stopListening}
              sx={{
                type: "submit",
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "12px",
                padding: "10px 20px",
                margin: "10px",
                alignContent: "center"
              }}
            >
              <StopCircleOutlinedIcon sx={{ mr: "10px" }} />
              Stop
            </Button>
            <Button
              onClick={resetTranscript}
              sx={{
                type: "submit",
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "12px",
                padding: "10px 20px",
                margin: "10px",
                alignContent: "center"
              }}
            >
              <RestartAltOutlinedIcon sx={{ mr: "10px" }} />
              Undo
            </Button>
           
            <Button
                onClick={() => {
                  handleDownloadClick();
                  if (transcript) {
                    const blob = new Blob([transcript], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);

                   

                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    a.download = 'converted_audio.txt';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                  }
                }}
                disabled={!transcript}
                sx={{
                  type: "submit",
                  backgroundColor: colors.blueAccent[700],
                  color: colors.grey[100],
                  fontSize: "12px",
                  padding: "10px 20px",
                  margin: "10px",
                  alignContent: "center"
                }}
              >
                <GetAppOutlinedIcon sx={{ mr: "10px" }} />
                Download Text
          </Button>
          {showProjectForm && (
          <ProjectForm
              open={showProjectForm}
              onClose={() => setShowProjectForm(false)}
              onSubmit={handleProjectFormSubmit}
          />
      )}


            
            
    </Box>
  );
};

export default SpeechToText;
import React, { useState, useEffect } from "react";
import { Box, Button, useTheme, TextField, Stack, Dialog, DialogTitle, DialogContent, DialogActions, } from "@mui/material";
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import GetAppOutlinedIcon from '@mui/icons-material/GetAppOutlined';
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useSpeechSynthesis } from 'react-speech-kit';
import TTSHighlightedText from "../../components/TTSHighlightedText";
import ProjectForm from '../../components/ProjectForm';

const TextToSpeech = ({ onDownloadAudio }) => {
  const [inputText, setInputText] = useState('');
  const { speak, voices } = useSpeechSynthesis();
  const [voiceIndex, setVoiceIndex] = useState(null);
  const [rate, setRate] = useState(0.1);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [highlightSpeed, setHighlightSpeed] = useState(.35);
  const [audioBlob, setAudioBlob] = useState(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [projectInfo, setProjectInfo] = useState(null);

  // const [history, setHistory] = useState([{ inputText, voiceIndex, rate }]);
  // const [step, setStep] = useState(0);
  // const maxHistorySteps = 10; // Maximum number of steps to store in history

  // Function to update history and limit its size
  // const updateHistory = (newState) => {
  //   const newHistory = history.slice(0, step + 1);
  //   if (newHistory.length >= maxHistorySteps) {
  //     newHistory.shift(); // Remove oldest step to limit history size
  //   }
  //   newHistory.push(newState);
  //   setHistory(newHistory);
  //   setStep(newHistory.length - 1);
  // };
  
  const handleSpeak = async () => {
    if (inputText.length > 0) {
      setIsSpeaking(true);
  
      const utterance = new SpeechSynthesisUtterance(inputText);
      utterance.rate = rate;
      utterance.voice = voices[voiceIndex];
  
      // Create a Promise to track when speech synthesis is completed
      const speechPromise = new Promise((resolve) => {
        utterance.onend = resolve;
      });
  
      // Start speech synthesis
      speechSynthesis.speak(utterance);
  
      // Wait for speech synthesis to complete
      await speechPromise;
  
      // Calculate the duration of the audio (in seconds)
      const audioBlob = new Blob([utterance.audioBuffer], { type: 'audio/mpeg' });
      const sampleRate = 44100; // Common sample rate for audio
  
      // Calculate duration using formula: duration = size / (sampleRate * numChannels * bytesPerSample)
      const numChannels = 2; // Stereo audio
      const bytesPerSample = 2; // 16-bit audio
      const audioDuration = audioBlob.size / (sampleRate * numChannels * bytesPerSample);
  
      setHighlightedIndex(0);
      setAudioBlob(audioBlob);
  
      // Set the calculated audio duration in seconds
      setProjectInfo((prevInfo) => ({
        ...prevInfo,
        duration: audioDuration.toFixed(2), // Convert to string with 2 decimal places
      }));
    }
  };
  

  const handleDownloadAudio = () => {
    if (audioBlob) {
      setAudioBlob(audioBlob);
      setShowProjectForm(true);
      const url = URL.createObjectURL(audioBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "tts_audio.mpeg"; // Set the desired audio file name
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setProjectInfo((prevInfo) => ({
        ...prevInfo,
        duration: projectInfo.duration, // Update the duration value here
      }));
  

      onDownloadAudio({
        name: projectInfo.name,
        duration: projectInfo.duration,
        owner: projectInfo.owner,
        created: projectInfo.created,
        lastViewed: projectInfo.lastViewed,
      });
    }
  };

  

  const handleProjectFormSubmit = (newProjectInfo) => {
    setProjectInfo(newProjectInfo);
    setShowProjectForm(false);
  };

  const handleClear = () => {
    setInputText("");
    setIsSpeaking(false);
    setHighlightedIndex(-1);
    setAudioBlob(null);
  };

  useEffect(() => {
    if (isSpeaking) {
      const words = inputText.split(" ");
      let currentIndex = 0;

      const interval = setInterval(() => {
        if (currentIndex < words.length) {
          setHighlightedIndex(currentIndex);
          currentIndex++;
        } else {
          setIsSpeaking(false);
          clearInterval(interval);
          setHighlightedIndex(-1);
        }
      }, ( highlightSpeed / rate ) * 1000); // Delay based on speech rate

      return () => {
        clearInterval(interval);
      };
    }
  }, [isSpeaking, inputText, rate, highlightSpeed]);
    
  
  return (
      <Box m="20px">
        <Box m="20px">
          {/* All User */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="Text To Speech" />
          </Box>
        </Box>
        <Stack autoComplete="off">
        
        <TextField
          label="Type Here"
          variant="outlined"
          backgroundColor={colors.primary[400]}
          color="secondary"
          marginBottom="20px"
          multiline
          rows={1}
          required
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <TTSHighlightedText text={inputText} highlightedIndex={highlightedIndex} />
        </Stack>
      
        <Button
          onClick={handleSpeak}
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "12px",
            padding: "10px 20px",
            marginTop: "10px",
            align: "center"
          }}
        >
          <VolumeUpOutlinedIcon sx={{ mr: "10px" }} />
          Convert
        </Button>

            <select 
                style={{ width: '100px', margin: "10px" }}
                value={voiceIndex || ''}
                onChange={(e) => setVoiceIndex(e.target.value)}
            >
              <option value="">default</option>
              {voices.map((item, index) => (
               <option key={item.name} value={index}>
                {item.name}
               </option>
              ))}
            </select>

            <Button
              onClick={handleClear}
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "12px",
                padding: "10px 20px",
                marginTop: "10px",
                marginLeft: "475px",
                alignContent: "center",
              }}
            >
              <RestartAltOutlinedIcon sx={{ mr: "10px" }} />
                Undo
            </Button>

            <Button onClick={handleDownloadAudio} 
            sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "12px",
                padding: "10px 20px",
                marginTop: "10px",
                marginLeft: "10px",
                alignContent: "center",
              }}>
          <GetAppOutlinedIcon sx={{ mr: "10px" }} />
                Download Audio
        </Button>
        {showProjectForm && (
          <ProjectForm
              open={showProjectForm}
              onClose={() => setShowProjectForm(false)}
              onSubmit={handleProjectFormSubmit}
              initialProjectInfo={projectInfo}
          />
      )}
           
              
            <Box>
              <h6 style={{marginTop:"5px"}}>Speech Rate: {rate}</h6>
                <input 
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.01"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                />
            </Box>            
    </Box>
  );
};

export default TextToSpeech;

{/* <Button onClick={handleUndo} disabled={step === 0}
                      sx={{
                        backgroundColor: colors.blueAccent[700],
                        color: colors.grey[100],
                        fontSize: "12px",
                        padding: "10px 20px",
                        marginLeft: "560px",
                        align: "center"
                      }}
              >
                <UndoOutlined /> Undo
              </Button>
              <Button onClick={handleRedo} disabled={step === history.length - 1}
                      sx={{
                        backgroundColor: colors.blueAccent[700],
                        color: colors.grey[100],
                        fontSize: "12px",
                        padding: "10px 20px",
                        marginLeft: "10px",
                        align: "center"
                      }}
              >
                Redo <RedoOutlined />
              </Button> */}
            
import React, { useState, useEffect } from "react";
import { Box, Button, useTheme, TextField, Stack } from "@mui/material";
import { tokens } from "../theme";

const TTSHighlightedText = ({ text, highlightedIndex }) => {
  const [inputValue, setInputValue] = useState('');
  const [words, setWords] = useState([]);
  const highlightStyle = {
    backgroundImage: `linear-gradient(to right, purple, skyblue)`,
    padding: "2px",
    borderRadius: "3px",
    display: "inline-block", // Maintain inline layout
  };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  useEffect(() => {
    setWords(inputValue.split(" "));
  }, [inputValue]);

  


  return (
    <div style={{ marginTop: "10px", 
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "5px", 
    fontSize: "14px", 
    width: "100%", 
    marginBottom: "10px", 
    minHeight: "200px" }}>
      <textarea
        readOnly
        className="highlighted-textarea"
        style={{
          border: "none",
          background: "transparent",
          width: "100%",
          height: "100%",
          resize: "none",
          overflow: "auto",
        }}
      />
      <div className="highlighted-words">
        {text.split(" ").map((word, index) => (
          <span
            key={index}
            style={index === highlightedIndex ? highlightStyle : {}}
          >
            {word}{" "}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TTSHighlightedText;

import React from "react";
import Highlighter from "react-highlight-words";

const HighlightedText = ({ text }) => {
  const highlightStyle = {
    backgroundImage: `linear-gradient(to right, skyblue, blue)`, // Highlight color
    padding: "2px 4px",
    borderRadius: "4px",
    display: "inline-block",
    margin: "2px"
  };

  const transcriptContainerStyle = {
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
    width: "100%",
    height: "200px",
    overflow: "auto",
    fontSize: "14px",
  };

  return (
    <div className="transcript-text" style={transcriptContainerStyle}>
      <Highlighter
        searchWords={text.split(" ")} // Split text into words
        textToHighlight={text}
        highlightClassName="highlighted-text"
        unhighlightStyle={{ backgroundColor: "transparent" }}
        caseSensitive={false}
        autoEscape={true}
        highlightStyle={highlightStyle}
        className= "highlighted-text" 
      />
    </div>
  );
};

export default HighlightedText;

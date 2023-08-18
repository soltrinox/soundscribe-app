import { useState, useRef } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import OfflineBoltOutlinedIcon from '@mui/icons-material/OfflineBoltOutlined';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import RecordVoiceOverOutlinedIcon from '@mui/icons-material/RecordVoiceOverOutlined';
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";



const Item = ({ title, to, icon, selected, setSelected, onAudioFileSelect  }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      {title === "Import Audio" && (
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => onAudioFileSelect(e.target.files[0])}
          style={{ display: 'none' }}
        />
      )}
      <Link to={to} />
    </MenuItem>
  );
};



const handleAudioUpload = async (selectedAudioFile) => {
  if (selectedAudioFile) {
    try {
      // Assuming you want to upload the audio file to a server using a POST request
      const formData = new FormData();
      formData.append("audioFile", selectedAudioFile);

      // Replace 'YOUR_UPLOAD_API_URL' with the actual URL to upload the audio file
      const response = await fetch("YOUR_UPLOAD_API_URL", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Audio file uploaded successfully!");
        // Optionally, you can do something after successful upload
      } else {
        console.error("Failed to upload audio file");
        // Optionally, you can handle upload failures
      }
    } catch (error) {
      console.error("Error uploading audio file:", error);
      // Optionally, you can handle any errors that occur during upload
    } 
  }
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("RecentProjects");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
          borderRadius: "5px",
          marginTop: "15px",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
         
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Soundscribe
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>


          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
          <Item
              title="User"
              to="/user"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              WorkSpace
            </Typography>
            <Item
              title="Recent Projects"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            
            <Item
              title="Quick Recordings"
              icon={<OfflineBoltOutlinedIcon />}
              to="/quickrecordings"
              selected={selected}
              setSelected={setSelected}
            />
          
            <Item
              title="Downloaded"
              to="/downloaded"
              icon={<CloudDownloadOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Feature
            </Typography>
            <Item
              title="Text To Speech"
              to="/tts"
              icon={<ChatOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Speech To Text"
              to="/stt"
              icon={<RecordVoiceOverOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "70px 0 5px 20px" }}
            >
            </Typography>
            <Item
              title="Log Out"
              to="/logout"
              icon={<LogoutOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              onAudioFileSelect={handleAudioUpload}
              style={{ marginTop: '50px' }}
            />

            
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
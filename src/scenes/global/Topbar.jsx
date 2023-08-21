import { Box, IconButton, Menu, MenuItem, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]); 

  const [personAnchor, setPersonAnchor] = useState(null);

  const itemsToFilter = [
    { id: 1, project: "First Project" },
    { id: 2, project: "Second Project " },
    { id: 3, project: "Third Project" },
    // ... (other items)
  ];

  // Filter items based on the search query
  const filteredItems = itemsToFilter.filter(item =>
    item.project.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openPersonMenu = (event) => {
    setPersonAnchor(event.currentTarget);
  };

  const closePersonMenu = () => {
    setPersonAnchor(null);
  };

  

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
        position="relative"
      >
        
        <InputBase 
          sx={{ ml: 2, flex: 1 }} 
          placeholder="Search" 
          value={searchQuery} 
          onChange={(e) => {
            setSearchQuery(e.target.value);
            // Generate suggestions based on the input and set the suggestions state
            const filteredSuggestions = itemsToFilter.filter((item) =>
              item.project.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
          }}
        />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {suggestions.length > 0 && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-end"
          position="absolute"
          zIndex={1}
          top="100%"
          right={0}
          bg="white"
          border="1px solid #ccc"
          borderRadius="3px"
          boxShadow="0px 1px 2px rgba(0, 0, 0, 0.2)"
          mt={1}
        >
          <Menu>
            {suggestions.map((item) => (
              <MenuItem key={item.id} onClick={() => setSearchQuery(item.project)}>
                {item.project}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      )}
      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        
        <IconButton onClick={openPersonMenu}
                    display="flex"
                    position="right"
        >
          <PersonOutlinedIcon />
        </IconButton>
        <Menu
          anchorEl={personAnchor}
          open={Boolean(personAnchor)}
          onClose={closePersonMenu}
        >
         <MenuItem component={Link} to="/user">
            <AccountCircleOutlinedIcon sx={{ mr: 1 }} /> Profile
          </MenuItem>
          <MenuItem>
            <SettingsOutlinedIcon sx={{ mr: 1 }} /> Settings
          </MenuItem>
          <MenuItem component={Link} to="/logout">
            <LogoutOutlinedIcon sx={{ mr: 1 }} /> Logout
          </MenuItem>
          
        </Menu>

      </Box>
    </Box>
  );
};

export default Topbar;
import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./scenes/global/Sidebar";
import Topbar from "./scenes/global/Topbar";
import Pages from "./Pages"; // Import the Pages component
import Scenes from "./Scenes"; // Import the Scenes component
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import UserContext from './UserContext';
import { UserProvider } from './UserContext';

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [projectInfo, setProjectInfo] = useState(null);

  const handleDownloadAudio = (newProjectInfo) => {
    setProjectInfo(newProjectInfo);
  };

  const [user, setUser, unsetUser] = useState({
    id: null,
    isAdmin: null
  });

  const location = useLocation();

  // Check if the current path is any of the excluded paths
  const shouldRenderTopbarSidebar =
    !['/login', '/signup', '/logout'].includes(location.pathname);

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            {/* Conditionally render Sidebar and Topbar */}
            {shouldRenderTopbarSidebar && (
              <div className="sidebar-container">
                <Sidebar isSidebar={isSidebar} />
              </div>
            )}
            <main className="content">
              {shouldRenderTopbarSidebar && (
                <Topbar setIsSidebar={setIsSidebar} />
              )}
              <Routes>
                {/* Pages Routes */}
                <Route path="/login" element={<Pages.Login />} />
                <Route path="/signup" element={<Pages.SignUp />} />
                <Route path="/logout" element={<Pages.Logout />} />

                {/* Scenes Routes */}
                <Route path="/" element={<Scenes.RecentProjects />} />
                <Route path="/quickrecordings" element={<Scenes.QuickRecordings />} />
                <Route path="/downloaded" element={<Scenes.Downloaded projectInfo={projectInfo} />} />
                <Route path="/user" element={<Scenes.User />} />
                <Route path="/tts" element={<Scenes.TextToSpeech onDownloadAudio={handleDownloadAudio} />} />
                <Route path="/stt" element={<Scenes.SpeechToText />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </UserProvider>
  );
}

export default App;

import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";

// import { mockDataTeam } from "../../data/mockData";



const Downloaded = ({ projectInfo }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    {
      field: "name",
      headerName: "Project Name",
      type: "text",
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
      headerName: "Date Created",
      type: "date",
      headerAlign: "right",
      align: "right",
    },
    {
      field: "lastviewed",
      headerName: "Last Viewed",
      type: "date",
      flex: 1,
      headerAlign: "center",
      align: "right",
    },
  ];

  const rows = [];
  let idCounter = 1;

  // Iterate over each project in projectInfo and create rows
  for (const projectId in projectInfo) {
    if (projectInfo.hasOwnProperty(projectId)) {
      const project = projectInfo[projectId];
      rows.push({
        id: idCounter,
        ...project,
      });
      idCounter++;
    }
  }

  return (
      <Box m="20px">
        <Box m="20px">
        {/* Downloaded */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="Downloaded" />
            <Box>
            
          </Box>
        </Box>
      </Box>
      <Box
        m="20px 0 0 0"
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
        <DataGrid checkboxSelection rows={rows} columns={columns} />
      </Box>
    </Box>
  );
};

export default Downloaded;
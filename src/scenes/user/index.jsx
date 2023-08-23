import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";




const User = () => {
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

  return (
      <Box m="20px">
        <Box m="20px">
        {/* All User */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="All" />
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
        <DataGrid checkboxSelection rows=""  columns={columns} />
      </Box>
    </Box>
  );
};

export default User;
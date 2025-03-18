import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

export default function GridData({ users, headerItem }) {
  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        rows={users}
        columns={headerItem}
        rowHeight={120}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5, 10, 20, 50, 100]}

        sx={{
          "& .MuiDataGrid-columnHeadersInner": {
            backgroundColor: "#18529a !important",
            color: "white !important",
            fontSize: "1.5rem !important",
          },
          "& .MuiDataGrid-cell": {
            fontSize: "1.5rem !important",
          },
         
        }}
      />
    </Box>
  );
}

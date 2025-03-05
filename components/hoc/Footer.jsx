import { Box, Typography } from "@mui/material";
import React from "react";

export default function Footer() {
  return (
    <Box className="bg-[#18529a] h-16 w-full flex flex-col justify-center items-center">
      <Typography
        sx={{
          color: "#fff !important",

          textAlign: "center !important",
          fontWeight: "bold !important",
        }}
      >
        © 2023 3DTV Tech
      </Typography>
    </Box>
  );
}

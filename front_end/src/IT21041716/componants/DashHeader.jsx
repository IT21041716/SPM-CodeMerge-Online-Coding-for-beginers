import React from 'react'
import { Typography, Box, useTheme } from "@mui/material";


const DashHeader = ({ title, subtitle }) => {
    const theme = useTheme();

  return (
    <Box mb="30px">
    <Typography
      variant="h4"
      color= "#e0e0e0"
      fontWeight="bold"
      sx={{ m: "0 0 5px 0" }}
    >
      {title}
    </Typography>
    <Typography variant="h5" color= "#70d8bd" fontSize= '17px'>
      {subtitle}
    </Typography>
  </Box>
  )
}

export default DashHeader
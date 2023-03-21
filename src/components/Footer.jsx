import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ paddingTop: 5 }}>
      <Box
        sx={{
          bgcolor: "#0b0163",
          height: "10vh",
          bottom: 0,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, marginLeft: 5 }}
          color="#7567eb"
        >
          Guest Registration System 2023
        </Typography>
      </Box>
    </Box>
  );
}

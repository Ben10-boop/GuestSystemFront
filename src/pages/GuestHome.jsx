import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const GuestHome = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Box sx={{ height: "70vh" }}>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/forms/guestadd");
          }}
        >
          Submit Entrance form
        </Button>
      </Box>
    </Box>
  );
};

export default GuestHome;

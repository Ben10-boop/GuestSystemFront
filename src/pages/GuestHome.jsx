import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const GuestHome = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/forms/guestadd");
          }}
          sx={{
            margin: 10,
            padding: 5
          }}
        >
          Submit Entrance form
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/forms/endvisit");
          }}
          sx={{
            margin: 10,

          }}
        >
          End visit
        </Button>
      </Box>
    </Box>
  );
};

export default GuestHome;

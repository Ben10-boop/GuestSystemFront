import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Pages from "./pages/Pages";
import axios from "axios";
import { useUser } from "./hooks/UseUser";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Box } from "@mui/material";
//import { ErrorProvider } from "./context/ErrorProvider";

function App() {
const { getToken} = useUser();
const token = getToken();

  useEffect(() => {
     axios.defaults.headers.common["Authorization"] = `bearer ${token}`;
  }, [token]);

  return (
    <div className="App">
      {/* <ErrorProvider> */}
      <BrowserRouter>
        <Header/>
        <Box sx={{
          minHeight: "calc(100vh - 56px - 32px - 80px)"
        }}>
          <Pages />
        </Box>
        <Footer/>
      </BrowserRouter>
      {/* </ErrorProvider> */}
    </div>
  );
}

export default App;

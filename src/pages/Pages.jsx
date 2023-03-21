import Login from "./Login";
import Logout from "./Logout";
import Home from "./Home";
import { ProtectedPage } from "../components/ProtectedPage";
import { Route, Routes, useLocation } from "react-router-dom";
import Visitees from "./visitees/Visitees";
import AddVisitee from "./visitees/AddVisitee";
import EditVisitee from "./visitees/EditVisitee";

function Pages() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/logout"
        element={
          <ProtectedPage roles={["super", "regular"]}>
            <Logout />
          </ProtectedPage>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedPage roles={["super", "regular"]}>
            <Home />
          </ProtectedPage>
        }
      />
      <Route
        path="/visitees"
        element={
          <ProtectedPage roles={["super", "regular"]}>
            <Visitees />
          </ProtectedPage>
        }
      />
      <Route
        path="/visitees/add"
        element={
          <ProtectedPage roles={["super", "regular"]}>
            <AddVisitee />
          </ProtectedPage>
        }
      />
      <Route
        path="/visitees/:identifier"
        element={
          <ProtectedPage roles={["super", "regular"]}>
            <EditVisitee />
          </ProtectedPage>
        }
      />
    </Routes>
  );
}

export default Pages;

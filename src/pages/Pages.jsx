import Login from "./Login";
import Logout from "./Logout";
import Home from "./Home";
import { ProtectedPage } from "../components/ProtectedPage";
import { Route, Routes, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import { useError } from "../context/UseError";
import Visitees from "./visitees/Visitees";
import AddVisitee from "./visitees/AddVisitee";
import EditVisitee from "./visitees/EditVisitee";
import Admins from "./admins/Admins";
import AddAdmin from "./admins/AddAdmin";
import EditAdmin from "./admins/EditAdmin";

function Pages() {
  const { setError } = useError();
  const location = useLocation();
  useEffect(() => {
    setError(null);
  }, [location, setError]);

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
      <Route
        path="/admins"
        element={
          <ProtectedPage roles={["super"]}>
            <Admins />
          </ProtectedPage>
        }
      />
      <Route
        path="/admins/add"
        element={
          <ProtectedPage roles={["super"]}>
            <AddAdmin />
          </ProtectedPage>
        }
      />
      <Route
        path="/admins/:identifier"
        element={
          <ProtectedPage roles={["super"]}>
            <EditAdmin />
          </ProtectedPage>
        }
      />
    </Routes>
  );
}

export default Pages;

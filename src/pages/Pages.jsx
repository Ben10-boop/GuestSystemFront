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
import Documents from "./documents/Documents";
import AddDocument from "./documents/AddDocument";
import EditDocument from "./documents/EditDocument";
import Forms from "./forms/Forms";
import AddForm from "./forms/AddForm";
import EditForm from "./forms/EditForm";
import GuestHome from "./GuestHome";
import AddFormByGuest from "./forms/AddFormByGuest";
import EndVisit from "./forms/EndVisit";

function Pages() {
  const { setError } = useError();
  const location = useLocation();
  useEffect(() => {
    setError(null);
  }, [location, setError]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<GuestHome />} />
      <Route
        path="/logout"
        element={
          <ProtectedPage roles={["super", "regular"]}>
            <Logout />
          </ProtectedPage>
        }
      />
      <Route
        path="/home"
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
      <Route
        path="/documents"
        element={
          <ProtectedPage roles={["super"]}>
            <Documents />
          </ProtectedPage>
        }
      />
      <Route
        path="/documents/add"
        element={
          <ProtectedPage roles={["super"]}>
            <AddDocument />
          </ProtectedPage>
        }
      />
      <Route
        path="/documents/:identifier"
        element={
          <ProtectedPage roles={["super"]}>
            <EditDocument />
          </ProtectedPage>
        }
      />
      <Route
        path="/forms"
        element={
          <ProtectedPage roles={["super", "regular"]}>
            <Forms />
          </ProtectedPage>
        }
      />
      <Route
        path="/forms/add"
        element={
          <ProtectedPage roles={["super", "regular"]}>
            <AddForm />
          </ProtectedPage>
        }
      />
      <Route
        path="/forms/:identifier"
        element={
          <ProtectedPage roles={["super", "regular"]}>
            <EditForm />
          </ProtectedPage>
        }
      />
      <Route path="/forms/guestadd" element={<AddFormByGuest />} />
      <Route path="/forms/endvisit" element={<EndVisit />} />
    </Routes>
  );
}

export default Pages;

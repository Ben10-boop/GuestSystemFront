import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useUser } from "../hooks/UseUser";
import { useNavigate } from "react-router-dom";
import { Divider, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Stack } from "@mui/system";
import { useTranslation } from "react-i18next";
import LanguageSelect from "./LanguageSelect";

const drawerWidth = 240;

export default function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { getUser } = useUser();
  const { t } = useTranslation();
  const navigate = useNavigate();

  let links = [];
  const userRole =
    getUser()?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  if (!userRole) {
    links = [
      { key: "begin_visit", value: "forms/guestadd" },
      { key: "end_visit", value: "forms/endvisit" },
      { key: "home", value: "/" },
      { key: "admin_login", value: "/login" },
    ];
  } else if (["super"].includes(userRole)) {
    links = [
      { key: "main", value: "/home" },
      { key: "employees", value: "/visitees" },
      { key: "admins", value: "/admins" },
      { key: "documents", value: "/documents" },
      { key: "forms", value: "/forms" },
      { key: "logout", value: "/logout" },
    ];
  } else if (["regular"].includes(userRole)) {
    links = [
      { key: "main", value: "/home" },
      { key: "employees", value: "/visitees" },
      { key: "forms", value: "/forms" },
      { key: "logout", value: "/logout" },
    ];
  } else {
    links = [{ key: "logout", value: "/logout" }];
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        {t("menu")}
      </Typography>
      <Divider />
      <Stack>
        {links.map((link) => {
          return (
            <Button
              key={link.key}
              onClick={() => {
                navigate(link.value);
              }}
              color="inherit"
            >
              {t(`${link.key}`)}
            </Button>
          );
        })}
      </Stack>
    </Box>
  );

  const container = document.body;

  return (
    <Box sx={{ flexGrow: 1, paddingBottom: 5 }}>
      {/* need color #1565c0 */}
      <AppBar position="static" sx={{ backgroundColor: "#1565c0" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="div">
              {t("grs")}
            </Typography>
            <LanguageSelect />
          </Box>

          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          {links.map((link) => {
            return (
              <Button
                sx={{ display: { xs: "none", sm: "inline" } }}
                key={link.key}
                onClick={() => {
                  navigate(link.value);
                }}
                color="inherit"
              >
                {t(`${link.key}`)}
              </Button>
            );
          })}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

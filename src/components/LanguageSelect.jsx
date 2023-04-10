import React from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import {
  Button,
  Popover,
  List,
  ListItemButton,
  ListSubheader,
} from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";

const languageMap = {
  en: { label: "English", active: true },
  lt: { label: "Lietuvių", active: false },
};

const LanguageSelect = () => {
  const [menuAnchor, setMenuAnchor] = React.useState(null);
  const { t } = useTranslation();

  return (
    <div>
      <Button
        color="inherit"
        onClick={({ currentTarget }) => setMenuAnchor(currentTarget)}
      >
        {t("language")}
        <ArrowDropDown fontSize="small" />
      </Button>
      <Popover
        open={!!menuAnchor}
        anchorEl={menuAnchor}
        onClose={() => setMenuAnchor(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div>
          <List>
            <ListSubheader>{t("select_language")}</ListSubheader>
            {Object.keys(languageMap)?.map((item) => (
              <ListItemButton
                key={item}
                onClick={() => {
                  i18next.changeLanguage(item);
                  setMenuAnchor(null);
                }}
              >
                {languageMap[item].label}
              </ListItemButton>
            ))}
          </List>
        </div>
      </Popover>
    </div>
  );
};

export default LanguageSelect;

import { Button, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";


/* 
  * LanguageSwitcher
  * Component to switch language based on user button click
  * Accordingly whole app will be translated
*/
export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  
  return (
    /* Button to select 'EN' or 'AR' language */
    <Stack direction="row" gap={2} justifyContent="flex-end" m={2}>
      <Button
        variant={i18n.language === "en" ? "contained" : "outlined"}
        onClick={() => changeLanguage("en")}
        aria-label="English Language"
      >
        English
      </Button>
      <Button
        aria-label="Arabic Language"
        variant={i18n.language === "ar" ? "contained" : "outlined"}
        onClick={() => changeLanguage("ar")}
      >
        العربية
      </Button>
    </Stack>
  );
}


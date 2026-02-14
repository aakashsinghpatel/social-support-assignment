import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import AppRouter from "./routes/AppRouter";
import { useDispatch } from "react-redux";
import { loadAllStepsData } from "./utils/localStorage";
import { setApplicationData } from "./features/application/applicationSlice";
import LanguageSwitcher from "./components/languageSwitcher/LanguageSwitcher";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import "dayjs/locale/ar";
import "dayjs/locale/en";

import { useMemo, useEffect } from "react";
import ErrorBoundary from "./components/errorBoundry/ErrorBoundry";

function App() {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();

  const isRTL = i18n.language === "ar";
  /* useEffect-
   * To update store with localStorage data on app start
   */
  useEffect(() => {
    const localStorageData = loadAllStepsData();
    dispatch(setApplicationData(localStorageData));
  }, []);

  /* createTheme-
   * To handle LT & RTL theme
   * (Direction, alignment & position) base on language
   */
  const theme = useMemo(
    () =>
      createTheme({
        direction: isRTL ? "rtl" : "ltr",
      }),
    [isRTL],
  );

  /* createCache-
   * To handle LT & RTL theme
   * To align css changes based on language
   */
  const cache = useMemo(
    () =>
      createCache({
        key: isRTL ? "muirtl" : "muiltr",
        stylisPlugins: isRTL ? [rtlPlugin] : [],
      }),
    [isRTL],
  );

  /*
   * Update dir based on language
   */
  useEffect(() => {
    document.body.dir = isRTL ? "rtl" : "ltr";
  }, [isRTL]);

  return (
    <ErrorBoundary>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <LanguageSwitcher />
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale={i18n.language}
          >
            <AppRouter />
          </LocalizationProvider>
        </ThemeProvider>
      </CacheProvider>
    </ErrorBoundary>
  );
}

export default App;

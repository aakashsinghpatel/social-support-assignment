import { Box, Typography, Button, Container } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

/*
 * NotFound
 * Component to show when some unknow URL get hit
 * Fallback page for random URL
 */
export default function NotFound() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Container
      maxWidth="md"
      component="main"
      aria-labelledby="not-found-heading"
    >
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h1"
          id="not-found-heading"
          fontWeight="bold"
          color="primary"
        >
          {t("error.heading")}
        </Typography>

        <Typography variant="h5" mt={2}>
          {t("error.subHeading")}
        </Typography>

        <Typography variant="body1" color="text.secondary" mt={1}>
          {t("error.message")}
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{ mt: 4 }}
          onClick={() => navigate("/")}
        >
          {t("backToHome")}
        </Button>
      </Box>
    </Container>
  );
}

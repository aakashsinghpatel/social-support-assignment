import { Box, Typography, Container, Button } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

/*
 * Success
 * show the component on succesfull submition of all data to API
 *
 */
const Success = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  /*
  * Focus the heading on load page
  */
  useEffect(() => {
    headingRef?.current?.focus();
  });

  return (
    <Container maxWidth="sm" component="main" aria-labelledby="success-heading">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="80vh"
        textAlign="center"
      >
        <CheckCircleOutlineIcon
          aria-hidden="true"
          color="success"
          sx={{ fontSize: 80, mb: 2 }}
        />

        <Typography
          ref={headingRef}
          id="success-heading"
          variant="h4"
          component="h1"
          fontWeight={600}
          gutterBottom
          aria-label={t("success.heading")}
        >
          {t("success.heading")}
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={4}>
          {t("success.message")}
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{ mt: 4, background: "#2e7d32" }}
          onClick={() => navigate("/")}
        >
          {t("backToHome")}
        </Button>
      </Box>
    </Container>
  );
};

export default Success;

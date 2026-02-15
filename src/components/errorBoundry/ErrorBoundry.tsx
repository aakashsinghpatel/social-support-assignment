import { Box, Button, Container, Typography } from "@mui/material";
import React,{ type ReactNode }  from "react";
import { withTranslation, type WithTranslation, } from "react-i18next";

interface Props extends WithTranslation {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/* 
  *ErrorBoundary:Featured component 
  * To handle unhandled expection/Error occure 
  * anywhere in app.
 */
class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  /* 
  * getDerivedStateFromError
  * Return value if some unexpected errror occur in the app
  */
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  /* 
  * handleReload
  * To reaload the page
  */

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    const { t } = this.props;

    if (this.state.hasError) {
      return (
        <Container maxWidth="md" component="main">
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
            <Typography variant="h4" fontWeight="bold" color="primary">
              {t("error.boundry.heading")}
            </Typography>

            <Button
              variant="contained"
              size="large"
              sx={{ mt: 4 }}
              onClick={this.handleReload}
            >
              {t("error.boundry.btnText")}
            </Button>
          </Box>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default withTranslation()(ErrorBoundary);

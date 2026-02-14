import { lazy } from "react";
import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "../components/progressBar/ProgressBar";
import {
  selectApplicationCurrentStep,
  selectApplicationErrorMessage,
  selectApplicationLading,
} from "../features/application/applicaionSelector";
import {
  resetApplication,
  setCurrentApplicationStep,
  setErrorMessage,
  setLoading,
} from "../features/application/applicationSlice";
import { clearStorage } from "../utils/localStorage";
import Loader from "../components/loader/Loader";
import { ErrorAlert } from "../components/errorAlert/ErrorAlert";
import { useNavigate } from "react-router-dom";
import { submitData } from "../services/application.service";
import type { SituationDetails } from "../features/application/types";

const PersonalDetails = lazy(
  () => import("../components/form/PersonalDetails/PersonalDetails"),
);
const FamilyFinancialDetails = lazy(
  () =>
    import("../components/form/familyFinanceDetails/FamilyFinancialDetails"),
);
const SituationDetails = lazy(
  () => import("../components/form/situationDetails/SituationDetails"),
);

/*
 * ApplicationPage - Main page of application
 * This page have flow add control for all form (Personal, FamilyFinance & Situation)
 */
const ApplicationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  /* All reuired state selector */
  const currentStep = useSelector(selectApplicationCurrentStep);
  const isLoading = useSelector(selectApplicationLading);
  const errorMessage = useSelector(selectApplicationErrorMessage);

  /*
   * updateAplicationStep
   * Method to update step number to redux state move next and back
   */
  const updateAplicationStep = (step: number) => {
    dispatch(setCurrentApplicationStep(step));
  };

  /*
   * submitDetails
   * Method to send all form details to API
   * Handle succes and failure to move to success and error page respectively
   */
  const submitDetails = async () => {
    dispatch(setLoading(true));
    try {
      await submitData();
      dispatch(setLoading(false));
      dispatch(resetApplication());
      clearStorage();
      navigate("/success");
    } catch (err: any) {
      dispatch(setErrorMessage(err?.message));
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          px: { xs: 2, sm: 2 },
          py: { xs: 3, sm: 2 },
        }}
      >
        <ProgressBar activeStep={currentStep} isMobile={isMobile} />
        <Box mt={{ xs: 3, sm: 5 }}>
          {currentStep === 0 && (
            <PersonalDetails onNext={() => updateAplicationStep(1)} />
          )}
          {currentStep === 1 && (
            <FamilyFinancialDetails
              onNext={() => updateAplicationStep(2)}
              onBack={() => updateAplicationStep(0)}
            />
          )}
          {currentStep === 2 && (
            <SituationDetails
              onBack={() => updateAplicationStep(1)}
              onSubmitFinal={() =>
                submitDetails()
              }
            />
          )}
        </Box>
      </Container>
      <Loader loading={isLoading} />
      <ErrorAlert errorMessage={errorMessage}></ErrorAlert>
    </>
  );
};

export default ApplicationPage;

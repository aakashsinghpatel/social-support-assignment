import { lazy } from "react";
import { Box, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectApplicationCurrentStep } from "../features/application/applicaionSelector";
import {
  resetApplication,
  setCurrentApplicationStep,
  setErrorMessage,
  setLoading,
} from "../features/application/applicationSlice";
import { clearStorage } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";
import { submitData } from "../services/application.service";

/* Lazy loading and code splitting */
const PersonalDetails = lazy(
  () => import("../components/form/personalDetails/PersonalDetails"),
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
  /* All reuired state selector */
  const currentStep = useSelector(selectApplicationCurrentStep);
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
          px: { xs: 1, sm: 2 },
          py: { xs: 1, sm: 1 },
        }}
      >
        <Box mt={{ xs: 1, sm: 1 }}>
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
              onSubmitFinal={() => submitDetails()}
            />
          )}
        </Box>
      </Container>
    </>
  );
};

export default ApplicationPage;

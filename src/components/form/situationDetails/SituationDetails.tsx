import {
  Grid,
  TextField,
  Button,
  Box,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSituationDetailsSchema } from "../../../features/application/validationSchemas";
import { useDispatch, useSelector } from "react-redux";
import {
  saveSituationDetails,
  setErrorMessage,
} from "../../../features/application/applicationSlice";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { generateAIText } from "../../../services/openai";
import AIHelperModal from "../../aiHelperDialog/AIHelperModal";
import {
  selectFamilyFinanceDetails,
  selectSituationDetails,
} from "../../../features/application/applicaionSelector";
import { saveToStorage } from "../../../utils/localStorage";
import type { SituationDetailsType } from "../../../features/application/types";

type SituationDetailsProps = {
  onBack: () => void;
  onSubmitFinal: () => void;
};

type SituationFormFieldType =
  | "financialSituation"
  | "employmentCircumstances"
  | "reasonForApplying";

const SituationDetails = ({ onBack, onSubmitFinal }: SituationDetailsProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [loadingAI, setLoadingAI] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [aiModalLabel, setAiModalLabel] = useState("");
  const [open, setOpen] = useState(false);
  const [aiField, setAiField] =
    useState<SituationFormFieldType>("financialSituation");
  const situationData = useSelector(selectSituationDetails);
  const familyFinanceDetails = useSelector(selectFamilyFinanceDetails);

  /*
   * Created form with react-hook form and enbled custom validation with zod lib at form/control level
   */
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createSituationDetailsSchema(t)),
    defaultValues: situationData || {},
  });

  /*
   * Help to update form with data save locally
   */
  useEffect(() => {
    reset(situationData);
  }, [situationData, reset]);

  /*
   * handleAI: <Field name>
   * Make call to chat completion API based on field for which AI suggestion requested.
   * And open the AiSuggestion action Nodal
   */
  const handleAI = async (fieldName: SituationFormFieldType) => {
    try {
      setAiField(fieldName);
      setLoadingAI(true);
      let prompt = "";
      if (fieldName == "financialSituation") {
        setLoadingStep(1);
        setAiModalLabel(t("financialSituation"));
        prompt = `I am ${familyFinanceDetails.employmentStatus} with ${familyFinanceDetails.monthlyIncome} monthly income, 
        Help me describe my hardship.`;
      } else if (fieldName == "employmentCircumstances") {
        setLoadingStep(2);
        setAiModalLabel(t("employmentCircumstances"));
        prompt = `I am ${familyFinanceDetails.employmentStatus} with ${familyFinanceDetails.monthlyIncome} and ${familyFinanceDetails.dependents}, ${familyFinanceDetails.maritalStatus}, ${familyFinanceDetails.housingStatus}.Help me describe my employement circumstances.`;
      }
      if (fieldName == "reasonForApplying") {
        setLoadingStep(3);
        setAiModalLabel(t("reasonForApplying"));
        prompt = `I am ${familyFinanceDetails.employmentStatus} with ${familyFinanceDetails.monthlyIncome} and ${familyFinanceDetails.dependents}, ${familyFinanceDetails.maritalStatus}, ${familyFinanceDetails.housingStatus}.Help me describe reasion for apply govt finance assistance.`;
      }
      const suggestion = await generateAIText(prompt);
      setAiSuggestion(suggestion);
      setOpen(true);
    } catch (error: any) {
      dispatch(setErrorMessage(error?.message));
    } finally {
      setLoadingAI(false);
      setLoadingStep(0);
    }
  };

  /*
   * setSuggestionToField: AiSuggestion
   * Update the Field with AI suggested or user edited content, as per action(Accept/edit)
   * In ai suggestion modal
   */
  const setSuggestionToField = (text: string) => {
    setValue(aiField, text, { shouldValidate: true });
    setOpen(false);
  };

  /*
   * onSubmit;
   * Save Situation details to redux and localStorage
   * initiate api call for final submit of all deatails
   */
  const onSubmit = (situationDetails: SituationDetailsType) => {
    dispatch(saveSituationDetails(situationDetails));
    saveToStorage("situationDetails", situationDetails);
    onSubmitFinal();
  };

  return (
    <>
      <Box
        component="main"
        aria-labelledby="situation-details-heading"
        aria-hidden="false"
      >
        <Typography
          id="situation-details-heading"
          variant="h6"
          component="h4"
          gutterBottom
          sx={{
            py: { xs: 1 },
          }}
        >
          {t("situation")}
        </Typography>
        {/* Situation detail form */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2}>
            {/* Financial Situation Field*/}
            <Grid size={{ xs: 12 }}>
              <Controller
                name="financialSituation"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t("financialSituation")}
                    multiline
                    rows={4}
                    fullWidth
                    error={!!errors.financialSituation}
                    helperText={errors.financialSituation?.message as string}
                  />
                )}
              />
              {/* Button to ask for AI suggestion for filed */}
              <Button
                size="small"
                onClick={() => handleAI("financialSituation")}
                disabled={loadingAI}
              >
                {loadingAI && loadingStep == 1 ? (
                  <CircularProgress size={18} />
                ) : (
                  t("helpWrite")
                )}
              </Button>
            </Grid>

            {/* Employment Circumstances Field */}
            <Grid size={{ xs: 12 }}>
              <Controller
                name="employmentCircumstances"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t("employmentCircumstances")}
                    multiline
                    rows={4}
                    fullWidth
                    error={!!errors.employmentCircumstances}
                    helperText={
                      errors.employmentCircumstances?.message as string
                    }
                  />
                )}
              />
              {/* Button to ask for AI suggestion for filed */}
              <Button
                size="small"
                onClick={() => handleAI("employmentCircumstances")}
                disabled={loadingAI}
              >
                {loadingAI && loadingStep == 2 ? (
                  <CircularProgress size={18} />
                ) : (
                  t("helpWrite")
                )}
              </Button>
            </Grid>

            {/* Reason for Applying field*/}
            <Grid size={{ xs: 12 }}>
              <Controller
                name="reasonForApplying"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t("reasonForApplying")}
                    multiline
                    rows={4}
                    fullWidth
                    error={!!errors.reasonForApplying}
                    helperText={errors.reasonForApplying?.message as string}
                  />
                )}
              />
              {/* Button/link to ask for AI suggestion for filed */}
              <Button
                size="small"
                onClick={() => handleAI("reasonForApplying")}
                disabled={loadingAI}
              >
                {loadingAI && loadingStep == 3 ? (
                  <CircularProgress size={18} />
                ) : (
                  t("helpWrite")
                )}
              </Button>
            </Grid>
          </Grid>

          {/* Submit and Back button */}
          <Box mt={4} display="flex" justifyContent="space-between">
            <Button
              variant="outlined"
              onClick={onBack}
              fullWidth={isMobile}
              sx={{ mr: 2 }}
              aria-label="back"
            >
              {t("back")}
            </Button>

            <Button type="submit" variant="contained" fullWidth={isMobile}>
              {t("submit")}
            </Button>
          </Box>
        </form>
      </Box>
      {open ? (
        <AIHelperModal
          open={open}
          label={aiModalLabel}
          suggestion={aiSuggestion}
          onAccept={(text: string) => setSuggestionToField(text)}
          onClose={() => {
            setOpen(false);
          }}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default SituationDetails;

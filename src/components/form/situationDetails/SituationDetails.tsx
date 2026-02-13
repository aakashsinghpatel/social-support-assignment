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

const SituationDetails = ({ onBack, onSubmitFinal }: any) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [loadingAI, setLoadingAI] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [aiModalLable, setAiModalLable] = useState("");
  const [open, setOpen] = useState(false);
  const [aiField, setAiField] = useState("");
  const situationData = useSelector(selectSituationDetails);
  const familyFinanceDetails = useSelector(selectFamilyFinanceDetails);

 /* 
    * Help to update form with data save locally
  */
  useEffect(() => {
    reset(situationData);
  }, [situationData]);

  /* 
   * Created form with react-hook form and enbled custom valid with zod lib at control level
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
    * handleAI: <Field name>
    * Make call to chat completion API based on field for which AI suggestion requested.
    * And open the AiSuggestion action Nodal
  */
  const handleAI = async (fieldName: string) => {
    try {
      setAiField(fieldName);
      setLoadingAI(true);
      let suggestion = "";
      let prompt = `Please consider below details and return the response in object of {financialSituation:string,employmentCircumstances:string, employmentCircumstances:string};
        the details are ${JSON.stringify(familyFinanceDetails)}`;
      if (fieldName == "financialSituation") {
        setAiModalLable(t("financialSituation"));
        prompt = `I am ${familyFinanceDetails.employmentStatus} with ${familyFinanceDetails.monthlyIncome} monthly income, 
        Help me describe my hardship.`;
        suggestion = `Despite having a monthly income of 3000, I struggle with financial hardship due to various factors. The cost of living in my area is high, making it difficult to make ends meet with my current salary. I often find myself having to prioritize basic necessities such as rent, groceries, and utilities over other expenses. Additionally, unexpected expenses such as medical bills or car repairs can quickly deplete my limited funds, leaving me feeling financially strained. Despite working hard, it can be challenging to save for the future or afford luxuries such as travel or entertainment. Overall, my monthly income of 3000 is not enough to comfortably support myself and my family, leading to feelings of stress and anxiety about my financial situation.`;
      } else if (fieldName == "employmentCircumstances") {
        setAiModalLable(t("employmentCircumstances"));
        prompt = `I am ${familyFinanceDetails.employmentStatus} with ${familyFinanceDetails.monthlyIncome} and ${familyFinanceDetails.dependents}, ${familyFinanceDetails.maritalStatus}, ${familyFinanceDetails.housingStatus}.Help me describe my employement circumstances.`;
        suggestion = `I am a single homeowner with a stable job that provides me with a monthly salary of 3000 and 4. I am fortunate to have a new house, which I have worked hard to achieve through my employment. My job allows me to afford my mortgage and other living expenses comfortably. Overall, I am content with my employment circumstances and grateful for the opportunities that have allowed me to become a homeowner.`;
      }
      if (fieldName == "reasonForApplying") {
        setAiModalLable(t("reasonForApplying"));
        prompt = `I am ${familyFinanceDetails.employmentStatus} with ${familyFinanceDetails.monthlyIncome} and ${familyFinanceDetails.dependents}, ${familyFinanceDetails.maritalStatus}, ${familyFinanceDetails.housingStatus}.Help me describe reasion for apply govt finance assistance.`;
        suggestion = `I am facing financial hardship due to the high cost of living and my single income. I am struggling to make ends meet, especially with the added expenses of a new house. I believe that government financial assistance would provide much-needed support in helping me cover essential expenses and improve my overall financial stability.`;
      }
      // const suggestion = await generateAIText(prompt);
      setAiSuggestion(suggestion);
      setOpen(true);
    } catch (error: any) {
      dispatch(setErrorMessage(error?.message));
    } finally {
      setLoadingAI(false);
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
  const onSubmit = (situationDetails: any) => {
    dispatch(saveSituationDetails(situationDetails));
    saveToStorage("situationDetails", situationDetails);
    onSubmitFinal(situationDetails);
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
                {loadingAI ? <CircularProgress size={18} /> : t("helpWrite")}
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
                {t("helpWrite")}
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
                {t("helpWrite")}
              </Button>
            </Grid>
          </Grid>

          {/* Submit and Back button */}
          <Box mt={4} display="flex" justifyContent="space-between">
            <Button variant="outlined" onClick={onBack} fullWidth={isMobile} sx={{ mr:2}} aria-label="back">
              {t("back")}
            </Button>

            <Button type="submit" variant="contained" fullWidth={isMobile}>
              {t("submit")}
            </Button>
          </Box>
        </form>
      </Box>

      <AIHelperModal
        open={open}
        label={aiModalLable}
        suggestion={aiSuggestion}
        onAccept={(text: string) => setSuggestionToField(text)}
        onClose={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default SituationDetails;

import {
  Grid,
  TextField,
  Button,
  Box,
  MenuItem,
  useMediaQuery,
  useTheme,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFamilyFinanceDetailsSchema } from "../../../features/application/validationSchemas";
import { useDispatch, useSelector } from "react-redux";
import { saveFamilyFinanceDetails } from "../../../features/application/applicationSlice";
import { useTranslation } from "react-i18next";
import { selectFamilyFinanceDetails } from "../../../features/application/applicaionSelector";
import { useEffect } from "react";
import { saveToStorage } from "../../../utils/localStorage";
import type { FamilyFinanceDetailsType } from "../../../features/application/types";

type FamilyFinancialDetailsProps = {
  onNext: () => void;
  onBack: () => void;
};

const FamilyFinancialDetails = ({
  onNext,
  onBack,
}: FamilyFinancialDetailsProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const financialData = useSelector(selectFamilyFinanceDetails);

  /*
   * Created form with react-hook form and enbled custom validation with zod lib at form/control level
   */
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createFamilyFinanceDetailsSchema(t)),
    defaultValues: financialData || {},
  });

  /*
   * Help to update form with data save locally
   */
  useEffect(() => {
    reset(financialData);
  }, [financialData, reset]);

  /*
   * onSubmit
   * Method to save finaceDetail on click of next button to store and local storage
   */
  const onSubmit = (data: FamilyFinanceDetailsType) => {
    dispatch(saveFamilyFinanceDetails(data));
    saveToStorage("familyFinanceDetails", data);
    onNext();
  };

  /*
   * handleOnKeyDown: <event>
   * Dis-allow non number input to number field: Income etc.
   */
  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "-" ||
      e.key === "e" ||
      e.key === "+" ||
      e.key === "ArrowUp" ||
      e.key === "ArrowDown"
    ) {
      e.preventDefault();
    }
  };

  return (
    <Box
      component="main"
      aria-labelledby="family-financial-details-heading"
      aria-hidden="false"
    >
      <Typography
        id="family-financial-details-heading"
        variant="h6"
        component="h4"
        gutterBottom
        sx={{
          py: { xs: 1 },
        }}
      >
        {t("financialnfio")}
      </Typography>
      {/* Family and financial detail form */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={2}>
          {/* Marital Status */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="maritalStatus"
              control={control}
              defaultValue={financialData?.maritalStatus || ""}
              render={({ field }) => (
                <TextField
                  {...field} // provides value & onChange
                  select
                  label={t("maritalStatus")}
                  fullWidth
                  error={!!errors.maritalStatus}
                  helperText={errors.maritalStatus?.message as string}
                >
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value="single">{t("single")}</MenuItem>
                  <MenuItem value="married">{t("married")}</MenuItem>
                </TextField>
              )}
            />
          </Grid>

          {/* Dependents */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              type="number"
              label={t("dependents")}
              fullWidth
              onKeyDown={handleOnKeyDown}
              {...register("dependents", { valueAsNumber: true })}
              error={!!errors.dependents}
              helperText={errors.dependents?.message as string}
            />
          </Grid>

          {/* Employment Status */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="employmentStatus"
              control={control}
              defaultValue={financialData?.employmentStatus || ""}
              render={({ field }) => (
                <TextField
                  {...field} // provides value & onChange
                  select
                  label={t("employmentStatus")}
                  fullWidth
                  error={!!errors.employmentStatus}
                  helperText={errors.employmentStatus?.message as string}
                >
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value="employed">{t("employed")}</MenuItem>
                  <MenuItem value="unemployed">{t("unemployed")}</MenuItem>
                </TextField>
              )}
            />
          </Grid>

          {/* Monthly Income */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              type="number"
              label={t("monthlyIncome")}
              fullWidth
              onKeyDown={handleOnKeyDown}
              {...register("monthlyIncome", { valueAsNumber: true })}
              error={!!errors.monthlyIncome}
              helperText={errors.monthlyIncome?.message as string}
            />
          </Grid>

          {/* Housing Status */}
          <Grid size={12}>
            <TextField
              label={t("housingStatus")}
              fullWidth
              {...register("housingStatus")}
              error={!!errors.housingStatus}
              helperText={errors.housingStatus?.message as string}
            />
          </Grid>
        </Grid>

        {/* Next and Back button */}
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

          <Button
            type="submit"
            variant="contained"
            fullWidth={isMobile}
            aria-label="Next Step"
          >
            {t("next")}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default FamilyFinancialDetails;

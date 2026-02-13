import {
  Grid,
  TextField,
  Button,
  Box,
  useMediaQuery,
  useTheme,
  MenuItem,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import type { AppDispatch } from "../../../app/store";
import { createPersonalDetailsSchema } from "../../../features/application/validationSchemas";
import { savePersonalDetails } from "../../../features/application/applicationSlice";
import { selectPersonalDetails } from "../../../features/application/applicaionSelector";

import { useEffect } from "react";
import { saveToStorage } from "../../../utils/localStorage";
import type { PersonalDetails } from "../../../features/application/types";

type PersonalDetailsProps = {
  onNext: ()=>void;
}

const PersonalDetails = ({ onNext }: PersonalDetailsProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const personalData = useSelector(selectPersonalDetails);

  /* 
   * Created form with react-hook form and enbled custom valid with zod lib at control level
  */
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createPersonalDetailsSchema(t)),
    defaultValues: personalData,
  });

  /* 
   * Help to update form with data save locally
  */
  useEffect(() => {
    reset(personalData);
  }, [personalData,reset]);

  /* 
    * onSubmit
    * Method to save personal details on click of next button to store and local storage
  */
  const onSubmit = (data: PersonalDetails) => {
    const updateData:PersonalDetails = {
      ...data,
      dob: data.dob ? dayjs(data.dob).toISOString() : null,
    };
    saveToStorage("personalDetails", updateData);
    dispatch(savePersonalDetails(updateData));
    onNext();
  };

  return (
    <Box
      component="main"
      aria-labelledby="personal-details-heading"
      aria-hidden="false"
    >
      <Typography
        id="personal-details-heading"
        variant="h6"
        component="h4"
        gutterBottom
      >
        {t("personalinfo")}
      </Typography>
        {/* Personal Detail form */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={2} className="newcalss">
            {/* Name field */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label={t("name")}
              fullWidth
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message as string}
            />
          </Grid>
            {/* National ID field */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label={t("nationalId")}
              fullWidth
              {...register("nationalId")}
              error={!!errors.nationalId}
              helperText={errors.nationalId?.message as string}
            />
          </Grid>
            {/* Date of Birth Field */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="dob"
              control={control}
              render={({ field }) => (
                <DatePicker
                 sx={{
                    "& .MuiPickersInputBase-sectionsContainer": {
                      direction: "ltr",
                    },
                  }}
                  
                  label={t("dob")}
                  format="DD/MM/YYYY"
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(newValue) => field.onChange(newValue)}
                  maxDate={dayjs()}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.dob,
                      helperText: errors.dob?.message as string,
                    },
                  }}
                />
              )}
            />
          </Grid>
            {/* Gender Field */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="gender"
              control={control}
              defaultValue={personalData?.gender || ""}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label={t("gender")}
                  fullWidth
                  error={!!errors.gender}
                  helperText={errors.gender?.message as string}
                >
                  <MenuItem value="male">{t("male")}</MenuItem>
                  <MenuItem value="female">{t("female")}</MenuItem>
                  <MenuItem value="other">{t("other")}</MenuItem>
                </TextField>
              )}
            />
          </Grid>
            
            {/* Address Field */}
          <Grid size={{ xs: 12 }}>
            <TextField
              label={t("address")}
              multiline
              rows={2}
              fullWidth
              {...register("address")}
              error={!!errors.address}
              helperText={errors.address?.message as string}
            />
          </Grid>
            {/* City Field */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label={t("city")}
              fullWidth
              {...register("city")}
              error={!!errors.city}
              helperText={errors.city?.message as string}
            />
          </Grid>
            {/* State Field */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label={t("state")}
              fullWidth
              {...register("state")}
              error={!!errors.state}
              helperText={errors.state?.message as string}
            />
          </Grid>
            {/* Country Field */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label={t("country")}
              fullWidth
              {...register("country")}
              error={!!errors.country}
              helperText={errors.country?.message as string}
            />
          </Grid>
            {/* Phone field */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label={t("phone")}
              fullWidth
              {...register("phone")}
              error={!!errors.phone}
              helperText={errors.phone?.message as string}
            />
          </Grid>
            {/* Email Field */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label={t("email")}
              fullWidth
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message as string}
            />
          </Grid>
        </Grid>

        {/* Next Button*/}
        <Box mt={4} display="flex" justifyContent="flex-end">
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

export default PersonalDetails;

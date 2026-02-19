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
import type { PersonalDetailsType } from "../../../features/application/types";

type PersonalDetailsProps = {
  onNext: () => void;
};

const PersonalDetails = ({ onNext }: PersonalDetailsProps) => {
  const { t:translate } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const personalData = useSelector(selectPersonalDetails);

  /*
   * Created form with react-hook form and enbled custom validation with zod lib at form/control level
   */
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createPersonalDetailsSchema(translate)),
    defaultValues: personalData,
  });

  /*
   * Help to update form with data save locally
   */
  useEffect(() => {
    reset(personalData);
  }, [personalData, reset]);

  /*
   * onSubmit
   * Method to save personal details on click of next button to store and local storage
   */
  const onSubmit = (data: PersonalDetailsType) => {
    const updateData: PersonalDetailsType = {
      ...data,
      dob: data.dob ? dayjs(data.dob).toISOString() : null,
    };
    saveToStorage("personalDetails", updateData);
    dispatch(savePersonalDetails(updateData));
    onNext();
  };

  /* renderPersonalDetailsForm
   * Return Form UI
   */
  const renderPersonalDetailsForm = () => {
    {
      /* Personal Detail form */
    }
    return (
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={2} className="newcalss">
          {/* Name field */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label={translate("name")}
              fullWidth
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message as string}
            />
          </Grid>
          {/* National ID field */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label={translate("nationalId")}
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
                  label={translate("dob")}
                  format="DD/MM/YYYY"
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(newValue) => field.onChange(newValue)}
                  maxDate={dayjs()}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.dob,
                      helperText: errors.dob?.message as string,
                      inputProps: { "data-testid": "dob-input" },
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
                  label={translate("gender")}
                  fullWidth
                  error={!!errors.gender}
                  helperText={errors.gender?.message as string}
                >
                  <MenuItem value="male">{translate("male")}</MenuItem>
                  <MenuItem value="female">{translate("female")}</MenuItem>
                  <MenuItem value="other">{translate("other")}</MenuItem>
                </TextField>
              )}
            />
          </Grid>
          {/* Address Field */}
          <Grid size={{ xs: 12 }}>
            <TextField
              label={translate("address")}
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
              label={translate("city")}
              fullWidth
              {...register("city")}
              error={!!errors.city}
              helperText={errors.city?.message as string}
            />
          </Grid>
          {/* State Field */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label={translate("state")}
              fullWidth
              {...register("state")}
              error={!!errors.state}
              helperText={errors.state?.message as string}
            />
          </Grid>
          {/* Country Field */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label={translate("country")}
              fullWidth
              {...register("country")}
              error={!!errors.country}
              helperText={errors.country?.message as string}
            />
          </Grid>
          {/* Phone field */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label={translate("phone")}
              fullWidth
              {...register("phone")}
              error={!!errors.phone}
              helperText={errors.phone?.message as string}
            />
          </Grid>
          {/* Email Field */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label={translate("email")}
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
            {translate("next")}
          </Button>
        </Box>
      </form>
    );
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
        sx={{
          py: { xs: 1 },
        }}
      >
        {translate("personalinfo")}
      </Typography>
      {renderPersonalDetailsForm()}
    </Box>
  );
};

export default PersonalDetails;

import { createSlice } from "@reduxjs/toolkit";
import type { ApplicationState } from "./types";

/* Intial state of application state */
const initialState: ApplicationState = {
  personalDetails: {},
  familyFinanceDetails: {},
  situationDetails: {},
  currentStep: 0,
  loading: false,
  errorMessage: null,
};

/* Reducer of name 'application with all actions to update application state*/
const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    savePersonalDetails: (state: ApplicationState, action) => {
      state.personalDetails = action.payload;
    },
    saveFamilyFinanceDetails: (state: ApplicationState, action) => {
      state.familyFinanceDetails = action.payload;
    },
    saveSituationDetails: (state: ApplicationState, action) => {
      state.situationDetails = action.payload;
    },
    setCurrentApplicationStep: (state: ApplicationState, action) => {
      state.currentStep = action.payload;
    },
    setApplicationData: (state: ApplicationState, action) => {
      const { personalDetails, familyFinanceDetails, situationDetails } =
        action.payload;
      let step = 0;
      const [isPersonalDetails, isFinancialDetails,isSituationDetails] = [personalDetails && Object.keys(personalDetails).length>0, familyFinanceDetails && Object.keys(familyFinanceDetails).length>0, situationDetails && Object.keys(situationDetails).length>0];
      if (isPersonalDetails && isFinancialDetails && isSituationDetails) {
        step = 2;
      } else if (isPersonalDetails && isFinancialDetails) {
        step = 1;
      } else if (isPersonalDetails) {
        step = 0;
      }
      return { ...state, ...action.payload, currentStep: step };
    },
    setLoading: (state: ApplicationState, action) => {
      state.loading = action.payload;
    },
    setErrorMessage: (state: ApplicationState, action) => {
      state.errorMessage = action.payload;
    },
    resetApplication: () => initialState,
  },
});

export const {
  savePersonalDetails,
  saveFamilyFinanceDetails,
  saveSituationDetails,
  setCurrentApplicationStep,
  setApplicationData,
  setLoading,
  setErrorMessage,
  resetApplication,
} = applicationSlice.actions;

export default applicationSlice.reducer;

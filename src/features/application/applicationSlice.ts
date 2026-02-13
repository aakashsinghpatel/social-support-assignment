import { createSlice } from "@reduxjs/toolkit";
import type {
  ApplicationState,
  FamilyFinanceDetails,
  PersonalDetails,
  SituationDetails,
} from "./types";
import { hasData } from "../../utils/validation";


/* Intial state of application 
  * Initializing all state of application
*/

const initPersonalDetails: PersonalDetails = {
  name: "",
  nationalId: "",
  dob: "",
  gender: "",
  address: "",
  city: "",
  state: "",
  country: "",
  phone: "",
  email: "",
};

const initFamilyFinanceDetails: FamilyFinanceDetails = {
  maritalStatus: "",
  dependents: 0,
  employmentStatus: "",
  monthlyIncome: 0,
  housingStatus: "",
};

const initSituationDetails: SituationDetails = {
  financialSituation: "",
  employmentCircumstances: "",
  reasonForApplying: "",
};


const initialState: ApplicationState = {
  personalDetails: initPersonalDetails,
  familyFinanceDetails: initFamilyFinanceDetails,
  situationDetails: initSituationDetails,
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
      const [isPersonalDetails, isFinancialDetails, isSituationDetails] = [
        hasData(personalDetails),
        hasData(familyFinanceDetails),
        hasData(situationDetails),
      ];
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

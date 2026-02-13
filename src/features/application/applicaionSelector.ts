import type { RootState } from "../../app/store";


/* Selectors for all state values  */
const selectApplicationState = (State: RootState) => State.application;
const selectPersonalDetails = (state: RootState) =>
  state.application.personalDetails;
const selectFamilyFinanceDetails = (state: RootState) =>
  state.application.familyFinanceDetails;
const selectSituationDetails = (state: RootState) =>
  state.application.situationDetails;
const selectApplicationCurrentStep = (State: RootState) =>
  State.application.currentStep;
const selectApplicationLading = (State: RootState) => State.application.loading;
const selectApplicationErrorMessage = (State: RootState) =>
  State.application.errorMessage;

export {
  selectApplicationState,
  selectPersonalDetails,
  selectFamilyFinanceDetails,
  selectSituationDetails,
  selectApplicationCurrentStep,
  selectApplicationLading,
  selectApplicationErrorMessage,
};

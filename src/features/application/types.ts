
/* Type of applciation state */
export interface ApplicationState {
  personalDetails: any,
  familyFinanceDetails:any,
  situationDetails: any,
  currentStep: number;
  loading: boolean;
  errorMessage: String |null;
}

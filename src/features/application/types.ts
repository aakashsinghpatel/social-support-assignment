import type { Dayjs } from "dayjs";

/* Type of applciation state */
export interface ApplicationState {
  personalDetails: PersonalDetails;
  familyFinanceDetails: FamilyFinanceDetails;
  situationDetails: SituationDetails;
  currentStep: number;
  loading: boolean;
  errorMessage: string | null;
}

export interface PersonalDetails {
  name: string;
  nationalId: string;
  dob: string | number | Date | Dayjs | null;
  gender: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
}

export interface FamilyFinanceDetails {
  maritalStatus: string;
  dependents: number | null;
  employmentStatus: string;
  monthlyIncome: number;
  housingStatus: string;
}
export interface SituationDetails {
  financialSituation: string;
  employmentCircumstances: string;
  reasonForApplying: string;
}

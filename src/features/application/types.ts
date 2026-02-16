import type { Dayjs } from "dayjs";

/* Type of applciation state */
export interface ApplicationState {
  personalDetails: PersonalDetailsType;
  familyFinanceDetails: FamilyFinanceDetailsType;
  situationDetails: SituationDetailsType;
  currentStep: number;
  loading: boolean;
  errorMessage: string | null;
}

export interface PersonalDetailsType {
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

export interface FamilyFinanceDetailsType {
  maritalStatus: string;
  dependents: number | null;
  employmentStatus: string;
  monthlyIncome: number;
  housingStatus: string;
}
export interface SituationDetailsType {
  financialSituation: string;
  employmentCircumstances: string;
  reasonForApplying: string;
}

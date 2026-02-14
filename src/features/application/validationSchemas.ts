import dayjs from "dayjs";
import { z } from "zod";

/*
 * zod validation schema for personal details form fiels
 */
export const createPersonalDetailsSchema = (t: (k: string) => string) =>
  z.object({
    /*
     ** Name field validation
     * String, should be alphabetic and can contain space
     * minimum length 2 charater
     * max length character
     */
    name: z
      .string()
      .trim()
      .regex(/^[A-Za-z\s]+$/, t("validationError.personalInfo.name.invalid"))
      .min(2, t("validationError.personalInfo.name.min"))
      .max(100, t("validationError.personalInfo.name.max")),

    /*
     ** nationalId field validation
     * String
     * UAE national id validation
     * 15-ALphanumeric, start with 784-> 11 numbers -> end with 'Z'  character
     * minimum length 2 charater
     * max length character
     */
    nationalId: z
      .string()
      .trim()
      .regex(
        /^[784][0-9]\d{4}[0-9]\d{7}[Z]$/,
        t("validationError.personalInfo.nationalId.invalid"),
      ),

    /*
     ** dob field validation
     * It should be valida date
     * Date should not be of future
     * Age should be greater than 18
     */
    dob: z
      .any()
      .refine((value) => value && dayjs(value).isValid(), {
        message: t("validationError.personalInfo.dob.required"),
      })
      .refine((value) => !dayjs(value).isAfter(dayjs()), {
        message: t("validationError.personalInfo.dob.notFuture"),
      })
      .refine(
        (value) => {
          const age = dayjs().diff(dayjs(value), "year");
          return age >= 18;
        },
        {
          message: t("validationError.personalInfo.dob.validAge"),
        },
      ),
    /*
     ** Gender field validation
     * should be valid string value
     */
    gender: z
      .string()
      .trim()
      .refine(
        (val) => {
          return !!val;
        },
        { message: t("validationError.personalInfo.gender.invalid") },
      ),
    /* Address field validation
     * Any alphnumeric character expect special symbols
     * Min should be 1 character
     * Max of 255 charater
     */
    address: z
      .string()
      .trim()
      .regex(
        /^[0-9A-Za-z\s]+$/,
        t("validationError.personalInfo.address.invalid"),
      )
      .min(1, t("validationError.personalInfo.address.min"))
      .max(255, t("validationError.personalInfo.address.max")),
    /* city field validation
     * Any alphnumeric character expect special symbols
     * Min should be 1 character
     */
    city: z
      .string()
      .trim()
      .regex(/^[A-Za-z\s]+$/, t("validationError.personalInfo.city.invalid"))
      .min(1, t("validationError.personalInfo.city.min")),
    /* state field validation
     * Any alphnumeric character expect special symbols
     * Min should be 1 character
     */
    state: z
      .string()
      .trim()
      .regex(/^[A-Za-z\s]+$/, t("validationError.personalInfo.state.invalid"))
      .min(1, t("validationError.personalInfo.state.min")),
    /* country field validation
     * Any alphnumeric character expect special symbols
     * Min should be 1 character
     */
    country: z
      .string()
      .trim()
      .regex(/^[A-Za-z\s]+$/, t("validationError.personalInfo.country.invalid"))
      .min(1, t("validationError.personalInfo.country.min")),
    /* phone field validation
     * Valid UAT number
     * Start with either of(+971|971|0)(50|52|54|55|56|58) and followed by 7 numbers.
     */
    phone: z
      .string()
      .regex(
        /^(?:\+971|971|0)(50|52|54|55|56|58)\d{7}$/,
        t("validationError.personalInfo.phone.invalid"),
      ),
    /* eamil field validation
     * Valid email address
     */
    email: z
      .string()
      .trim()
      .email(t("validationError.personalInfo.email.invalid")),
  });

/*
 * zod validation schema for family finace details form fiels
 */
export const createFamilyFinanceDetailsSchema = (t: (key: string) => string) =>
  z.object({
    /* marital status field validation
     * should be non empty string value
     */
    maritalStatus: z
      .string()
      .trim()
      .refine((val) => !!val, {
        message: t("validationError.financialInfo.maritalStatus.required"),
      }),

    /* dependents field validation
     * should be valid number, with minimum 1
     */
    dependents: z.preprocess(
      (val) => {
        if (val === "" || val === undefined) return undefined;
        return Number(val);
      },
      z
        .number({ message: t("validationError.financialInfo.dependents.min") })
        .min(0, { message: t("validationError.financialInfo.dependents.min") }),
    ),
    /* employment status field validation
     * should be valid non-empty string
     */
    employmentStatus: z
      .string()
      .trim()
      .refine((val) => !!val, {
        message: t("validationError.financialInfo.employmentStatus.required"),
      }),
    /* Monthly income field validation
     *  should be valid number, with minimum 1
     */
    monthlyIncome: z.preprocess(
      (val) => {
        if (val === "" || val === undefined) return undefined;
        return Number(val);
      },
      z
        .number({
          message: t("validationError.financialInfo.monthlyIncome.min"),
        })
        .min(0, {
          message: t("validationError.financialInfo.monthlyIncome.min"),
        }),
    ),
    /* Housing status status field validation
     * should be valid non-empty string
     */
    housingStatus: z.string().refine((val) => !!val, {
      message: t("validationError.financialInfo.housingStatus.required"),
    }),
  });

/*
 * zod validation schema for Situation details form fiels
 */
export const createSituationDetailsSchema = (t: (k: string) => string) =>
  z.object({
    /* Financial situation field validation
     * String with minimum 10 character
     */
    financialSituation: z
      .string()
      .min(10, t("validationError.situationInfo.financialSituation.invalid")),
    /* Employment circumstances field validation
     * String with minimum 10 character
     */
    employmentCircumstances: z
      .string()
      .min(
        10,
        t("validationError.situationInfo.employmentCircumstances.invalid"),
      ),
    /* Reason for applying field validation
     * String with minimum 10 character
     */
    reasonForApplying: z
      .string()
      .min(10, t("validationError.situationInfo.reasonForApplying.invalid")),
  });

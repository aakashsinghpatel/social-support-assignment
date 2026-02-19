import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import SituationDetails from "./SituationDetails";
import applicationReducer from "../../../features/application/applicationSlice";
import { createSituationDetailsSchema } from "../../../features/application/validationSchemas";
import userEvent from "@testing-library/user-event";
import * as localStorageUtils from "../../../utils/localStorage";

// Mock the axios client
jest.mock("../../../utils/axiosClient", () => ({
  default: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

/*Helper Method
 * For providing store and localization to component during testing
 */
const renderWithStore = (component: React.ReactElement) => {
  const store = configureStore({
    reducer: {
      application: applicationReducer,
    },
  });

  return render(<Provider store={store}>{component}</Provider>);
};

/* Test Suites */
describe("SituationDetails - Validation + Submit", () => {
  const translate = (key: string) => key;
  const schema = createSituationDetailsSchema(translate);

  /* Zod Unit Testing */
  it("should validate correct data using Zod schema", () => {
    const validData = {
      financialSituation: "This is my financial situation",
      employmentCircumstances: "This is my employment circumstances",
      reasonForApplying: "This is my reason for applying",
    };

    const result = schema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  /* Unit test for empty field */
  it("should fail validation if reasonForApplying is empty", () => {
    const invalidData = {
      financialSituation: "This is my financial situation",
      employmentCircumstances: "This is my employment circumstances",
      reasonForApplying: "",
    };

    const result = schema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  /* Form Validation test for invalid field*/
  it("should show validation errors when submitting empty form", async () => {
    renderWithStore(
      <SituationDetails onBack={jest.fn()} onSubmitFinal={jest.fn()} />,
    );

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(
        screen.getByText(
          "validationError.situationInfo.reasonForApplying.invalid",
        ),
      ).toBeInTheDocument();
    });
  });

  /* Form next click test on form data filled & Validated */
  it("should submit valid form and call onNext", async () => {
    const mockSubmit = jest.fn();
    const mockBack = jest.fn();
    const mockSaveToStorage = jest
      .spyOn(localStorageUtils, "saveToStorage")
      .mockImplementation(jest.fn());
    const user = userEvent.setup();
    renderWithStore(
      <SituationDetails onBack={mockBack} onSubmitFinal={mockSubmit} />,
    );

    // add financialSituation
    fireEvent.change(screen.getByLabelText(/financialSituation/i), {
      target: { value: "This is my financial situation" },
    });

    // add employmentCircumstances
    fireEvent.change(screen.getByLabelText(/employmentCircumstances/i), {
      target: { value: "This is my employment circumstances" },
    });

    // Check for validation on partial form details submit
    await user.click(screen.getByRole("button", { name: /submit/i }));
    expect(
      await screen.findByText(
        /validationError.situationInfo.reasonForApplying.invalid/i,
      ),
    ).toBeInTheDocument();

    // add reasonForApplying
    fireEvent.change(screen.getByLabelText(/reasonForApplying/i), {
      target: { value: "This is my reason for applying" },
    });

    //  Submit the form (After filling all details)
    await user.click(screen.getByRole("button", { name: /submit/i }));

    // check validation on form submit with all details filled
    expect(screen.queryByText(/validationError/i)).toBeNull();

    // Check next button has clicked and data is saved to localStorage
    await waitFor(() => {
      expect(mockSaveToStorage).toHaveBeenCalledTimes(1);
      expect(mockSubmit).toHaveBeenCalledTimes(1);
    });
  });
});

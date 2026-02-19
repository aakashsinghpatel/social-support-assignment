import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import FamilyFinancialDetails from "./FamilyFinancialDetails";
import applicationReducer from "../../../features/application/applicationSlice";
import { createFamilyFinanceDetailsSchema } from "../../../features/application/validationSchemas";
import userEvent from "@testing-library/user-event";
import * as localStorageUtils from "../../../utils/localStorage";

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
describe("FamilyFinancialDetails - Validation + Submit", () => {
  const t = (key: string) => key;
  const schema = createFamilyFinanceDetailsSchema(t);

  /* Zod Unit Testing */
  it("should validate correct data using Zod schema", () => {
    const validData = {
      maritalStatus: "Married",
      dependents: 1,
      employmentStatus: "Employed",
      monthlyIncome: 10,
      housingStatus: "Self House",
    };

    const result = schema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should fail validation if housingStatus is empty", () => {
    const invalidData = {
      maritalStatus: "Married",
      dependents: 1,
      employmentStatus: "Employed",
      monthlyIncome: 10,
      housingStatus: "",
    };

    const result = schema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  /* Form Validation test */
  it("should show validation errors when submitting empty form", async () => {
    renderWithStore(
      <FamilyFinancialDetails onNext={jest.fn()} onBack={jest.fn()} />,
    );

    fireEvent.click(screen.getByRole("button", { name: /next/i }));

    await waitFor(() => {
      expect(
        screen.getByText(
          "validationError.financialInfo.employmentStatus.required",
        ),
      ).toBeInTheDocument();
    });
  });

  /* Form next click test on form data filled & Validated */
  it("should submit valid form and call onNext", async () => {
    const mockNext = jest.fn();
    const mockBack = jest.fn();
    const mockSaveToStorage = jest
      .spyOn(localStorageUtils, "saveToStorage")
      .mockImplementation(jest.fn());
    const user = userEvent.setup();
    renderWithStore(
      <FamilyFinancialDetails onNext={mockNext} onBack={mockBack} />,
    );

    // select Marital status
    await user.click(screen.getByLabelText(/maritalStatus/i));
    const listbox = screen.getByRole("listbox");
    await user.click(
      within(listbox).getByRole("option", { name: /^married$/i }),
    );

    // add dependents
    fireEvent.change(screen.getByLabelText(/dependents/i), {
      target: { value: 2 },
    });

    // select employmentStatus
    await user.click(screen.getByLabelText(/employmentStatus/i));
    const listbox2 = screen.getByRole("listbox");
    await user.click(
      within(listbox2).getByRole("option", { name: /^employed$/i }),
    );

    // add monthlyIncome
    fireEvent.change(screen.getByLabelText(/monthlyIncome/i), {
      target: { value: 5000 },
    });

    // Check for validation on partial form details submit
    await user.click(screen.getByRole("button", { name: /next/i }));
    expect(
      await screen.findByText(
        /validationError.financialInfo.housingStatus.required/i,
      ),
    ).toBeInTheDocument();

    // add housingStatus
    fireEvent.change(screen.getByLabelText(/housingStatus/i), {
      target: { value: "Self House" },
    });

    //  Submit the form (After filling all details)
    await user.click(screen.getByRole("button", { name: /next/i }));

    // check validation on form submit with all details filled
    expect(screen.queryByText(/validationError/i)).toBeNull();

    // Check next button has clicked and data is saved to localStorage
    await waitFor(() => {
      expect(mockSaveToStorage).toHaveBeenCalledTimes(1);
      expect(mockNext).toHaveBeenCalledTimes(1);
    });
  });
});

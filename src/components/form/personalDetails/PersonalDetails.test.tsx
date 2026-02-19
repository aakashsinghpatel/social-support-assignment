import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import PersonalDetails from "./PersonalDetails";
import applicationReducer from "../../../features/application/applicationSlice";
import { createPersonalDetailsSchema } from "../../../features/application/validationSchemas";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
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

  return render(
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {component}
      </LocalizationProvider>
    </Provider>,
  );
};

/* Test Suites */
describe("PersonalDetails - Validation + Submit", () => {
  const translate = (key: string) => key;
  const schema = createPersonalDetailsSchema(translate);

  /* Zod Unit Testing */
  it("should validate correct data using Zod schema", () => {
    const validData = {
      name: "John Doe",
      nationalId: "784123456789012",
      dob: dayjs().subtract(20, "year").toDate(),
      gender: "male",
      address: "Dubai Marina",
      city: "Dubai",
      state: "Dubai",
      country: "UAE",
      phone: "+971501234567",
      email: "test@test.com",
    };

    const result = schema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should fail validation if age < 18", () => {
    const invalidData = {
      name: "John Doe",
      nationalId: "784123456789012",
      dob: dayjs().subtract(10, "year").toDate(),
      gender: "male",
      address: "Dubai Marina",
      city: "Dubai",
      state: "Dubai",
      country: "UAE",
      phone: "+971501234567",
      email: "test@test.com",
    };

    const result = schema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  /* Form Validation test */
  it("should show validation errors when submitting empty form", async () => {
    renderWithStore(<PersonalDetails onNext={jest.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: /next/i }));
    await waitFor(() => {
      expect(
        screen.getByText("validationError.personalInfo.name.invalid"),
      ).toBeInTheDocument();
    });
  });

  /* Form next click test on form data filled & Validated */
  it("should submit valid form and call onNext", async () => {
    const mockNext = jest.fn();
    const mockSaveToStorage = jest
      .spyOn(localStorageUtils, "saveToStorage")
      .mockImplementation(jest.fn());
    const user = userEvent.setup();
    renderWithStore(<PersonalDetails onNext={mockNext} />);

    // Add name
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "John Doe" },
    });

    // add National ID
    fireEvent.change(screen.getByLabelText(/nationalId/i), {
      target: { value: "784123456789012" },
    });

    // Check for validation on partial form details submit
    await user.click(screen.getByRole("button", { name: /next/i }));
    expect(
      await screen.findByText(/validationError.personalInfo.city.invalid/i),
    ).toBeInTheDocument();

    // DOB Selection
    const dobInput = screen.getByTestId("dob-input");
    fireEvent.change(dobInput, {
      target: { value: dayjs().subtract(25, "year").format("DD/MM/YYYY") },
    });

    // Gender select
    await user.click(screen.getByLabelText(/gender/i));
    const listbox = screen.getByRole("listbox");
    await user.click(within(listbox).getByRole("option", { name: /^male$/i }));

    // add Address
    fireEvent.change(screen.getByLabelText(/address/i), {
      target: { value: "Dubai Marina" },
    });

    // Add City name
    fireEvent.change(screen.getByLabelText(/city/i), {
      target: { value: "Dubai" },
    });

    // Add state
    fireEvent.change(screen.getByLabelText(/state/i), {
      target: { value: "Dubai" },
    });

    // Add country
    fireEvent.change(screen.getByLabelText(/country/i), {
      target: { value: "UAE" },
    });

    //add phone
    fireEvent.change(screen.getByLabelText(/phone/i), {
      target: { value: "+971501234567" },
    });

    // add email
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@test.com" },
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

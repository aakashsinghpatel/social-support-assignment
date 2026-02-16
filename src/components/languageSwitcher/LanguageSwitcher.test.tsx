// LanguageSwitcher.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import LanguageSwitcher from "./LanguageSwitcher";

// Mock useTranslation hook
const mockChangeLanguage = jest.fn();

// Mock translation lib
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    i18n: {
      language: "en",
      changeLanguage: mockChangeLanguage,
    },
  }),
}));

// Test suite
describe("LanguageSwitcher", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test case for rendering buttons and their functionality
  test("renders English and Arabic buttons", () => {
    render(<LanguageSwitcher />);

    const englishBtn = screen.getByRole("button", {
      name: /English Language/i,
    });
    const arabicBtn = screen.getByRole("button", { name: /Arabic Language/i });

    expect(englishBtn).toBeInTheDocument();
    expect(arabicBtn).toBeInTheDocument();

    // English is active, Arabic is outlined
    expect(englishBtn).toHaveClass("MuiButton-contained");
    expect(arabicBtn).toHaveClass("MuiButton-outlined");
  });
  // Test case for click on english button
  test("clicking English button calls i18n.changeLanguage with 'en'", () => {
    render(<LanguageSwitcher />);
    const englishBtn = screen.getByRole("button", {
      name: /English Language/i,
    });

    fireEvent.click(englishBtn);
    expect(mockChangeLanguage).toHaveBeenCalledTimes(1);
    expect(mockChangeLanguage).toHaveBeenCalledWith("en");
  });
  // Test case for click on arabic button
  test("clicking Arabic button calls i18n.changeLanguage with 'ar'", () => {
    render(<LanguageSwitcher />);
    const arabicBtn = screen.getByRole("button", { name: /Arabic Language/i });

    fireEvent.click(arabicBtn);
    expect(mockChangeLanguage).toHaveBeenCalledTimes(1);
    expect(mockChangeLanguage).toHaveBeenCalledWith("ar");
  });
});

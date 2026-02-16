// ProgressBar.test.tsx
import { render, screen } from "@testing-library/react";
import ProgressBar from "./ProgressBar";

// Mock i18next translation HOC
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key, // simply return the key for testing
  }),
}));

// Test suits
describe("ProgressBar", () => {
  const steps = ["personalinfo", "financialnfio", "situation"];

  // Test case to check if all steps are rendered correctly
  it("renders all steps correctly", () => {
    render(<ProgressBar activeStep={0} />);

    steps.forEach((step) => {
      expect(screen.getByText(step)).toBeInTheDocument();
    });
  });

  // Test case to check if the active step is highlighted correctly
  it("highlights the active step correctly", () => {
    const activeStep = 1;
    render(<ProgressBar activeStep={activeStep} />);
    // test case to check the active step of mui
    const activeStepElement = screen.getByText(steps[activeStep]);
    expect(activeStepElement).toHaveClass("Mui-active");
  });

  // Test case to check if the component renders without crashing for the last step
  it("renders without crashing for the last step", () => {
    render(<ProgressBar activeStep={steps.length - 1} />);

    steps.forEach((step) => {
      expect(screen.getByText(step)).toBeInTheDocument();
    });
  });
});

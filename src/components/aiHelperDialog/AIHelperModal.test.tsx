// AIHelperModal.test.tsx
import { fireEvent, render, screen } from "@testing-library/react";
import AIHelperModal from "./AIHelperModal";

// Mock useTranslation
jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

// Test Suite for AIHelperModal component
describe("AIHelperModal", () => {
  const label = "AI Suggestion";
  const suggestion = "This is a suggested text";
  const mockOnAccept = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  //  Test case to check if modal renders with correct label and suggestion
  test("renders modal with label and suggestion", () => {
    render(
      <AIHelperModal
        open={true}
        label={label}
        suggestion={suggestion}
        onAccept={mockOnAccept}
        onClose={mockOnClose}
      />,
    );

    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByText(suggestion)).toBeInTheDocument();
    expect(screen.getByText("edit")).toBeInTheDocument();
    expect(screen.getByText("accept")).toBeInTheDocument();
    expect(screen.getByText("discard")).toBeInTheDocument();
  });
  //   Test case to check if onClose is called when discard button is clicked
  test("calls onClose when discard button is clicked", () => {
    render(
      <AIHelperModal
        open={true}
        label={label}
        suggestion={suggestion}
        onAccept={mockOnAccept}
        onClose={mockOnClose}
      />,
    );

    fireEvent.click(screen.getByText("discard"));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  // Test case to check if clicking edit makes the suggestion editable and updates the text field value
  test("clicking edit makes suggestion editable", () => {
    render(
      <AIHelperModal
        open={true}
        label={label}
        suggestion={suggestion}
        onAccept={mockOnAccept}
        onClose={mockOnClose}
      />,
    );

    fireEvent.click(screen.getByText("edit"));

    const textField = screen.getByDisplayValue(suggestion);
    expect(textField).toBeInTheDocument();

    fireEvent.change(textField, { target: { value: "Edited text" } });
    expect(screen.getByDisplayValue("Edited text")).toBeInTheDocument();
  });

  // Test case to check if onAccept is called with the correct text when accept button is clicked, both without editing and after editing
  test("clicking accept calls onAccept with edited text", () => {
    render(
      <AIHelperModal
        open={true}
        label={label}
        suggestion={suggestion}
        onAccept={mockOnAccept}
        onClose={mockOnClose}
      />,
    );

    // Accept without editing
    fireEvent.click(screen.getByText("accept"));
    expect(mockOnAccept).toHaveBeenCalledTimes(1);
    expect(mockOnAccept).toHaveBeenCalledWith(suggestion);

    // Accept after editing
    fireEvent.click(screen.getByText("edit"));
    const textField = screen.getByDisplayValue(suggestion);
    fireEvent.change(textField, { target: { value: "Updated text" } });
    fireEvent.click(screen.getByText("accept"));
    expect(mockOnAccept).toHaveBeenCalledWith("Updated text");
  });
});

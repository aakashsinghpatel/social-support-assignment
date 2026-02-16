import { render, screen } from "@testing-library/react";
import Loader from "./Loader";

// Test Suit
describe("Loader Component", () => {
  // Test case to check if the loader component renders without crashing
  test("shows spinner when loading is true", () => {
    render(<Loader loading={true} />);
    expect(screen.getByTestId("loader-backdrop")).toBeVisible();
  });

  // Test case to check if the loader component does not show spinner when loading is false
  test("does not show spinner when loading is false", () => {
    render(<Loader loading={false} />);

    expect(screen.queryByTestId("loader-backdrop")).not.toBeVisible();
  });
});

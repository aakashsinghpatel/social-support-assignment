import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { ErrorAlert } from "./ErrorAlert";

const mockStore = configureStore([]);
jest.mock("../../features/application/applicationSlice", () => ({
  setErrorMessage: jest.fn((msg) => ({
    type: "mock/setErrorMessage",
    payload: msg,
  })),
}));

// Test Suite
describe("ErrorAlert", () => {
  // Test case to check if alert renders when errorMessage is provided
  it("renders alert when errorMessage is provided", () => {
    const store = mockStore({}); // initial state
    render(
      <Provider store={store}>
        <ErrorAlert errorMessage="Test Error" />
      </Provider>,
    );

    expect(screen.getByText("Test Error")).toBeInTheDocument();
  });

  // Test case to check if alert does not render when errorMessage is null
  it("does not render alert when errorMessage is null", () => {
    const store = mockStore({}); // initial state
    render(
      <Provider store={store}>
        <ErrorAlert errorMessage={null} />
      </Provider>,
    );

    const alert = screen.queryByRole("alert");
    expect(alert).toBeNull();
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../../App";

test("renders learn react link", () => {
  render(<App />);
  const landingAvatar = screen.getByAltText(/Landing Page Avatar/i);
  expect(landingAvatar).toBeInTheDocument();

  const button = screen.getAllByText(/Clasificar/i);
  expect(button).toBeDefined();

});

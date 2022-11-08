import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../../App";

test("renders learn react link", () => {
  render(<App />);
  const logo = screen.getByAltText(/Alz Care Logo/i);
  expect(logo).toBeInTheDocument();

  const name = screen.getByAltText(/Alz Care Name/i);
  expect(name).toBeInTheDocument();
});

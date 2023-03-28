import React from "react";

import { render } from "@testing-library/react";

import Appointment from "components/Appointment";

//To skip a test, use xit or test.skip:


describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });

  it("does something it is supposed to do", () => {
    // ...
  });

  it("does something else it is supposed to do", () => {
    // ...
  });
});
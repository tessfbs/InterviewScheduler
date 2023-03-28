import React from "react";

import { render, cleanup } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

//To skip a test, use xit or test.skip:


it("renders without crashing", () => {
  render(<Application />);
});

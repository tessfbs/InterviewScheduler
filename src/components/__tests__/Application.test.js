import React from "react";

import { render, cleanup, fireEvent, waitForElement } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

//To skip a test, use xit or test.skip:


// it("renders without crashing", () => {
//   render(<Application />);
// });

// it("defaults to Monday and changes the schedule when a new day is selected", () => {
//   const { getByText } = render(<Application />);

//   return waitForElement(() => getByText("Monday"))
//     .then(() => {
//       fireEvent.click(getByText("Tuesday"));
//       expect(getByText("Leopold Silvers")).toBeInTheDocument();

//     });
// });

it("changes the schedule when a new day is selected", async () => {
  const { getByText } = render(<Application />);

  await waitForElement(() => getByText("Monday"));

  fireEvent.click(getByText("Tuesday"));

  expect(getByText("Leopold Silvers")).toBeInTheDocument();
});

